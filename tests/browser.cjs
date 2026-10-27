/* npm install; npm run test:browser. Uses an isolated Chromium, never a user profile. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,headless:true});
 try{
  for(const width of [320,375,768,1024,1440]){
   const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce',hasTouch:width<800,isMobile:width<800});
   const page=await context.newPage();
   await page.route('https://fonts.**/*',route=>route.abort());
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(pathToFileURL(path.resolve('activity/index.html')).href);
   await page.locator('#warehouse').evaluate(img=>img.decode());
   assert.equal(await page.locator('.pin').count(),6);
   assert.ok(await page.locator('#panel').isHidden());
   const initial=await page.locator('#scene').boundingBox();
   assert.ok(Math.abs(initial.width/initial.height-1.6)<.01);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   const all=await page.locator('.pin').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height};}));
   for(let i=0;i<all.length;i++){assert.ok(all[i].w>=44&&all[i].h>=44);for(let j=i+1;j<all.length;j++)assert.ok(Math.hypot(all[i].x-all[j].x,all[i].y-all[j].y)>=44);}
   await page.mouse.move(initial.x+initial.width*.45,initial.y+initial.height*.6);
   await page.waitForFunction(()=>document.querySelector('#lens').classList.contains('on'));
   assert.equal(await page.locator('#lens').evaluate(n=>getComputedStyle(n).pointerEvents),'none');
   await page.mouse.move(1,1);await page.waitForFunction(()=>!document.querySelector('#lens').classList.contains('on'));
   await page.locator('.pin').first().focus();await page.keyboard.press('ArrowLeft');assert.equal(await page.evaluate(()=>document.activeElement.dataset.hazard),'5');await page.keyboard.press('Home');
   for(let i=0;i<6;i++){
    await page.locator(`[data-hazard="${i}"]`).click();
    const after=await page.locator('#scene').boundingBox();assert.equal(after.width,initial.width);assert.equal(after.height,initial.height);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'panel-title');
    assert.ok(await page.locator('#lens').evaluate(n=>!n.classList.contains('on')));
    const answer=[1,0,2,1,0,2][i];await page.locator(`[data-answer="${(answer+1)%3}"]`).click();await page.getByText('Reconsider your response').waitFor();
    await page.locator(`[data-answer="${answer}"]`).click();assert.equal(await page.locator('#count').textContent(),`${i+1} of 6 reviewed`);
    await page.locator('#continue').click();assert.equal(await page.evaluate(()=>document.activeElement.dataset.hazard),String(i));
   }
   await page.locator('#recap').waitFor();await page.locator('[data-hazard="0"]').click();await page.getByText('Safe response',{exact:true}).waitFor();await page.keyboard.press('Escape');await page.locator('#restart').click();assert.equal(await page.locator('#count').textContent(),'0 of 6 reviewed');
   // Touch timing and cancellation. Physical-device scroll testing is still required.
   await page.locator('#warehouse').dispatchEvent('pointerdown',{pointerType:'touch',clientX:initial.x+100,clientY:initial.y+100});
   await page.waitForFunction(()=>document.querySelector('#lens').classList.contains('on'));
   await page.locator('#warehouse').dispatchEvent('pointerup',{pointerType:'touch'});
   assert.ok(await page.locator('#lens').evaluate(n=>!n.classList.contains('on')));
   await page.locator('#warehouse').dispatchEvent('pointerdown',{pointerType:'touch',clientX:100,clientY:100});
   await page.locator('#warehouse').dispatchEvent('pointermove',{pointerType:'touch',clientX:100,clientY:130});
   await page.waitForTimeout(350);assert.ok(await page.locator('#lens').evaluate(n=>!n.classList.contains('on')));
   assert.match(await page.locator('#scene').evaluate(n=>getComputedStyle(n).touchAction),/pan-y/);
   await page.screenshot({path:`work/activity-${width}.png`,fullPage:true});assert.deepEqual(errors,[]);
   await context.close();console.log(`PASS ${width}px journey and layout`);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
