/* npm install; npm run test:browser. An isolated browser, never a user's profile. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path'),fs=require('node:fs'),http=require('node:http');
(async()=>{
 const server=http.createServer((req,res)=>{const file=path.resolve('.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!file.startsWith(process.cwd()+path.sep)){res.writeHead(403).end();return;}try{const type=file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.svg')?'image/svg+xml':file.endsWith('.png')?'image/png':'text/html';res.writeHead(200,{'Content-Type':type});res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,headless:true});
 const results=[];fs.mkdirSync('work',{recursive:true});
 try{
  for(const [width,height] of [[943,530],[1024,560],[768,560],[375,600],[320,560],[943,480]]){
   const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<600,isMobile:width<600});
   const page=await context.newPage();
   await page.route(/https:\/\/fonts\./,route=>route.abort());
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(origin+'/activity/index.html');
   await page.locator('#warehouse').evaluate(img=>img.decode());
   const assertFits=async stage=>{
    const metrics=await page.evaluate(()=>({height:innerHeight,doc:document.documentElement.scrollHeight,width:innerWidth,docWidth:document.documentElement.scrollWidth,panel:document.querySelector('#panel').hidden?null:{client:document.querySelector('#panel').clientHeight,scroll:document.querySelector('#panel').scrollHeight}}));
    assert.ok(metrics.doc<=metrics.height+1,`${width}x${height} ${stage}: document overflow ${JSON.stringify(metrics)}`);
    assert.ok(metrics.docWidth<=metrics.width+1,`${stage}: horizontal overflow`);
    if(metrics.panel)assert.ok(metrics.panel.scroll<=metrics.panel.client+1,`${width}x${height} ${stage}: panel overflow ${JSON.stringify(metrics)}`);
    for(const selector of ['.back','.choice','#retry','#continue','#restart']){
     for(const el of await page.locator(selector).all())if(await el.isVisible()){
      const r=await el.boundingBox();assert.ok(r.y>=0&&r.y+r.height<=height+1,`${width}x${height} ${stage}: unreachable ${selector} ${JSON.stringify(r)}`);
     }
    }
   };
   assert.equal(await page.locator('.pin').count(),6);await assertFits('explore');
   const initial=await page.locator('#scene').boundingBox();assert.ok(Math.abs(initial.width/initial.height-1.6)<.01);
   const all=await page.locator('.pin').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height};}));
   for(let i=0;i<all.length;i++){assert.ok(all[i].w>=44&&all[i].h>=44);for(let j=i+1;j<all.length;j++)assert.ok(Math.hypot(all[i].x-all[j].x,all[i].y-all[j].y)>=44);}
   await page.mouse.move(initial.x+initial.width*.45,initial.y+initial.height*.6);await page.waitForFunction(()=>document.querySelector('#lens').classList.contains('on'));
   assert.equal(await page.locator('#lens').evaluate(n=>getComputedStyle(n).pointerEvents),'none');
   await page.mouse.move(1,1);await page.waitForFunction(()=>!document.querySelector('#lens').classList.contains('on'));
   await page.locator('.pin').first().focus();await page.keyboard.press('ArrowLeft');assert.equal(await page.evaluate(()=>document.activeElement.dataset.hazard),'5');await page.keyboard.press('Home');
   for(let i=0;i<6;i++){
    await page.locator(`[data-hazard="${i}"]`).click();await assertFits(`hazard ${i+1} choices`);
    const after=await page.locator('#scene').evaluate(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}));assert.equal(after.width,initial.width);assert.equal(after.height,initial.height);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'panel-title');
    assert.ok(await page.locator('#lens').evaluate(n=>!n.classList.contains('on')));
    if(i===0)await page.screenshot({path:`work/choices-${width}x${height}.png`,fullPage:true});
    const answer=[1,0,2,1,0,2][i];await page.locator(`[data-answer="${(answer+1)%3}"]`).click();await page.getByText('Reconsider your response',{exact:true}).waitFor();await assertFits(`hazard ${i+1} retry`);
    assert.ok(await page.locator('.choices').isHidden());await page.locator('#retry').click();
    await page.locator(`[data-answer="${answer}"]`).click();await assertFits(`hazard ${i+1} correct`);
    assert.equal(await page.locator('#count').textContent(),`${i+1} of 6 reviewed`);
    if(i===0)await page.screenshot({path:`work/feedback-${width}x${height}.png`,fullPage:true});
    await page.locator('#continue').click();
    if(i<5)assert.equal(await page.evaluate(()=>document.activeElement.dataset.hazard),String(i));
   }
   await page.locator('#recap').waitFor();await assertFits('summary');assert.equal(await page.evaluate(()=>document.activeElement.id),'recap-title');
   await page.locator('#restart').click();assert.equal(await page.locator('#count').textContent(),'0 of 6 reviewed');
   // Revisit counts once; Escape returns without adding document height.
   await page.locator('[data-hazard="0"]').click();await page.locator('[data-answer="1"]').click();await page.locator('#continue').click();await page.locator('[data-hazard="0"]').click();await page.getByText('Safe response',{exact:true}).waitFor();assert.equal(await page.locator('#count').textContent(),'1 of 6 reviewed');await page.keyboard.press('Escape');
   // Synthetic touch checks; actual finger scroll/pinch needs a physical-device check.
   await page.locator('#warehouse').dispatchEvent('pointerdown',{pointerType:'touch',clientX:initial.x+100,clientY:initial.y+100});
   await page.waitForFunction(()=>document.querySelector('#lens').classList.contains('on'));await page.locator('#warehouse').dispatchEvent('pointerup',{pointerType:'touch'});
   assert.ok(await page.locator('#lens').evaluate(n=>!n.classList.contains('on')));
   await page.locator('#warehouse').dispatchEvent('pointerdown',{pointerType:'touch',clientX:100,clientY:100});await page.locator('#warehouse').dispatchEvent('pointermove',{pointerType:'touch',clientX:100,clientY:130});await page.waitForTimeout(350);
   assert.ok(await page.locator('#lens').evaluate(n=>!n.classList.contains('on')));assert.match(await page.locator('#scene').evaluate(n=>getComputedStyle(n).touchAction),/pan-y/);
   await page.screenshot({path:`work/activity-${width}x${height}.png`,fullPage:true});assert.deepEqual(errors,[]);
   await context.close();results.push({width,height,journey:'passed',documentOverflow:false,panelOverflow:false});console.log(`PASS ${width}x${height}: all six decisions/retries/feedback, summary/reset, fixed height, keyboard and lens/touch`);
  }
  // Portable version must carry the same build and fit the screenshot-sized LMS frame.
  const page=await browser.newPage({viewport:{width:943,height:530}});await page.route(/https:\/\/fonts\./,r=>r.abort());await page.goto(origin+'/activity/embed-20261027.html');assert.equal(await page.locator('meta[name="ukwa-build"]').getAttribute('content'),'embed-20261027-v5');await page.locator('[data-hazard="0"]').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1));await page.close();
  fs.writeFileSync('work/browser-results.json',JSON.stringify(results,null,2));
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
