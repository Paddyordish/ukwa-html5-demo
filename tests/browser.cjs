const assert=require('node:assert/strict'),fs=require('node:fs');
const {start,snapshot}=require('./support.cjs');
const answers=[1,0,2,1,0,2];
const features=[[362,285],[706,717],[936,612],[1112,482],[550,576],[420,790]];
const close=(a,b,label)=>assert.ok(Math.abs(a-b)<.06,`${label}: ${a} != ${b}`);
(async()=>{
 const env=await start();fs.mkdirSync('work',{recursive:true});const results=[];
 try{
  for(const [width,height] of (process.env.UKWA_TEST_VIEWPORTS?JSON.parse(process.env.UKWA_TEST_VIEWPORTS):[[943,530],[1024,560],[768,560],[375,560],[320,560],[943,1600]])){
   const context=await env.browser.newContext({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<600,isMobile:width<600});
   const page=await context.newPage();page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(/https:\/\/fonts\./,r=>r.abort());await page.goto(env.origin+'/activity/index.html');await page.locator('#warehouse').evaluate(i=>i.decode());
   assert.equal(await page.locator('.pin').first().evaluate(el=>getComputedStyle(el).transitionDuration),'0s','reduced motion removes marker transitions');
   const initial=await snapshot(page);close(initial.scene.width/initial.scene.height,1.6,'scene ratio');assert.ok(initial.scene.y<=53);assert.ok(initial.scene.height<=480.1);
   async function stable(stage){
    const now=await snapshot(page);
    assert.equal(now.scroll.x,0,`${stage}: focus/pointer scrolled document sideways`);assert.equal(now.scroll.y,0,`${stage}: document scrolled vertically`);
    assert.ok(now.scrollWidth<=now.clientWidth+1,`${stage}: horizontal document overflow`);assert.ok(now.scrollHeight<=height+1,`${stage}: vertical document overflow`);
    for(const key of ['scene','image'])for(const part of ['x','y','width','height'])close(now[key][part],initial[key][part],`${width}x${height} ${stage} ${key}.${part}`);
    now.markers.forEach((r,i)=>{for(const part of ['x','y','width','height'])close(r[part],initial.markers[i][part],`${stage} marker ${i}.${part}`);});
    const popup=page.locator('#panel');if(await popup.isVisible()){
     const data=await popup.evaluate(el=>{const r=el.getBoundingClientRect(),a=document.querySelector('.activity').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,clientH:el.clientHeight,scrollH:el.scrollHeight,clientW:el.clientWidth,scrollW:el.scrollWidth,frame:{x:a.x,y:a.y,w:a.width,h:a.height},modal:el.matches(':modal')};});
     assert.ok(data.modal,`${stage}: dialog is not modal`);assert.ok(data.scrollH<=data.clientH+1,`${width}x${height} ${stage}: popup needs normal scrolling ${JSON.stringify(data)}`);assert.ok(data.scrollW<=data.clientW+1);
     assert.ok(data.x>=data.frame.x&&data.y>=data.frame.y&&data.x+data.w<=data.frame.x+data.frame.w+1&&data.y+data.h<=data.frame.y+data.frame.h+1,`${stage}: dialog leaves activity frame`);
     for(const control of await popup.locator('button').all())if(await control.isVisible()){const r=await control.boundingBox();assert.ok(r.x>=data.x&&r.y>=data.y&&r.x+r.width<=data.x+data.w+1&&r.y+r.height<=data.y+data.h+1,`${stage}: clipped dialog control`);}
    }
   }
   await stable('initial');
   for(let i=0;i<6;i++){const pin=initial.markers[i],world=features[i];assert.ok(pin.width>=44&&pin.height>=44);assert.ok(Math.abs((pin.x+pin.width/2-initial.scene.x)/initial.scene.width*1440-parseFloat(await page.locator(`[data-hazard="${i}"]`).evaluate(el=>el.style.getPropertyValue('--x')))*14.4)<.1,'marker registration exceeds browser subpixel rounding');assert.ok(Math.hypot((pin.x+22-initial.scene.x)/initial.scene.width*1440-world[0],(pin.y+22-initial.scene.y)/initial.scene.height*900-world[1])<10);}
   // Glass is directly centred on the pointer except for geometric edge clamping.
   for(const [nx,ny] of [[.5,.5],[.2,.3],[.001,.001],[.999,.999],[.001,.999],[.999,.001]]){
    const x=initial.scene.x+initial.scene.width*nx,y=initial.scene.y+initial.scene.height*ny;
    await page.mouse.move(x,y);
    const glass=await page.locator('#lens').evaluate(el=>{const r=el.getBoundingClientRect(),style=getComputedStyle(el);return {x:r.x,y:r.y,w:r.width,h:r.height,bg:style.backgroundPosition.split(' ').map(parseFloat),origin:style.backgroundOrigin,events:style.pointerEvents,on:el.classList.contains('on')};});
    assert.ok(glass.on);assert.equal(glass.events,'none');assert.equal(glass.origin,'border-box');const radius=glass.w/2;
    close(glass.x+radius,Math.max(initial.scene.x+radius,Math.min(x,initial.scene.x+initial.scene.width-radius)),'lens centre x');close(glass.y+radius,Math.max(initial.scene.y+radius,Math.min(y,initial.scene.y+initial.scene.height-radius)),'lens centre y');
    close((radius-glass.bg[0])/3,x-initial.scene.x,'sample centre x');close((radius-glass.bg[1])/3,y-initial.scene.y,'sample centre y');await stable('lens movement');
   }
   if(width===943)await page.screenshot({path:'work/v8-lens-edge.png'});
   const empty={x:initial.scene.x+initial.scene.width*.9,y:initial.scene.y+initial.scene.height*.12};await page.mouse.click(empty.x,empty.y);assert.equal(await page.locator('#panel').evaluate(el=>el.open),false);assert.equal(await page.locator('.pin.near').count(),0);
   // A hazard inside the 3× glass but outside the 26px inspection-point radius is not selected.
   if(width>=768){const p=initial.markers[0];await page.mouse.click(p.x+22+28,p.y+22);assert.equal(await page.locator('#panel').evaluate(el=>el.open),false);assert.equal(await page.locator('.pin.near').count(),0);}
   await page.locator('.pin').first().focus();await page.keyboard.press('ArrowLeft');assert.equal(await page.evaluate(()=>document.activeElement.dataset.hazard),'5');await page.keyboard.press('Home');await page.keyboard.press('Enter');await stable('keyboard opens');await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.dataset.hazard),'0');
   for(let i=0;i<6;i++){
    const p=initial.markers[i],x=p.x+22+24,y=p.y+22; // outside the direct 44px target, inside point-based activation.
    await page.mouse.move(x,y);assert.equal(await page.locator('.pin.near').count(),1);assert.equal(await page.locator('.pin.near').getAttribute('data-hazard'),String(i));assert.equal(await page.locator('#lens-label').textContent(),'Inspect');assert.equal(await page.locator('#lens').evaluate(el=>el.classList.contains('available')),true);
    if(width<600)await page.touchscreen.tap(x,y);else await page.mouse.click(x,y);
    assert.equal(await page.locator('#panel-title').textContent(),['Climbing the racking','Spillage in the aisle','Unstable stacked boxes','Blocked emergency exit','Damaged racking upright','Discarded packing strap'][i]);assert.equal(await page.evaluate(()=>document.activeElement.id),'panel-title');await stable(`area ${i+1} choices`);
    assert.equal(await page.locator('#scene').isVisible(),true);assert.equal(await page.locator('#lens').evaluate(el=>el.classList.contains('on')),false);
    const crop=await page.locator('.inspection svg').evaluate(el=>el.viewBox.baseVal&&{x:el.viewBox.baseVal.x,y:el.viewBox.baseVal.y,w:el.viewBox.baseVal.width,h:el.viewBox.baseVal.height});assert.ok(features[i][0]>=crop.x&&features[i][0]<=crop.x+crop.w&&features[i][1]>=crop.y&&features[i][1]<=crop.y+crop.h);
    // Native focus containment includes both Tab directions.
    await page.getByRole('button',{name:'Close hazard dialog'}).focus();await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.dataset.answer),'2',await page.evaluate(()=>JSON.stringify({active:document.activeElement.outerHTML,open:document.querySelector('#panel').open}))); await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.className),'back');
    await page.locator(`[data-answer="${(answers[i]+1)%3}"]`).click();await stable(`area ${i+1} incorrect`);assert.equal(await page.locator('#count').textContent(),`${i} of 6 reviewed`);await page.locator('#retry').click();await stable(`area ${i+1} retry`);await page.locator(`[data-answer="${answers[i]}"]`).click();await stable(`area ${i+1} correct`);assert.equal(await page.locator('.feedback.retry').count(),0);assert.equal(await page.locator('#continue').count(),1);assert.equal(await page.locator('#count').textContent(),`${i+1} of 6 reviewed`);
    if(i===0){await page.screenshot({path:`work/v8-feedback-${width}x${height}.png`});}
    await page.locator('#continue').click();assert.equal(await page.evaluate(()=>document.activeElement.dataset.hazard),String(i));await stable(`area ${i+1} return`);await page.mouse.move(p.x+22,p.y+22);assert.equal(await page.locator('#lens-label').textContent(),'Reviewed — inspect again');assert.ok(await page.locator('#lens').evaluate(el=>el.classList.contains('reviewed')));
    // Close button and Escape both return to the selected marker, without adding progress.
    await page.locator(`[data-hazard="${i}"]`).click();await page.getByRole('button',{name:'Close hazard dialog'}).click();assert.equal(await page.evaluate(()=>document.activeElement.dataset.hazard),String(i));await stable(`area ${i+1} close`);
   }
   await page.locator('#recap').waitFor();await stable('recap');await page.screenshot({path:`work/v8-recap-${width}x${height}.png`});await page.locator('#restart').click();await stable('restart');assert.equal(await page.locator('#count').textContent(),'0 of 6 reviewed');
   await page.locator('[data-hazard="0"]').click();await page.keyboard.press('Escape');await stable('Escape');
   const point={x:initial.scene.x+initial.scene.width*.5,y:initial.scene.y+initial.scene.height*.5};await page.locator('#warehouse').dispatchEvent('pointerdown',{pointerType:'touch',clientX:point.x,clientY:point.y});await page.waitForFunction(()=>document.querySelector('#lens').classList.contains('on'));await page.locator('#warehouse').dispatchEvent('pointerup',{pointerType:'touch'});assert.equal(await page.locator('#lens').evaluate(el=>el.classList.contains('on')),false);
   await page.locator('#warehouse').dispatchEvent('pointerdown',{pointerType:'touch',clientX:point.x,clientY:point.y});await page.locator('#warehouse').dispatchEvent('pointermove',{pointerType:'touch',clientX:point.x,clientY:point.y+30});await page.waitForTimeout(350);assert.equal(await page.locator('#lens').evaluate(el=>el.classList.contains('on')),false);await stable('touch cancel');
   await page.screenshot({path:`work/v8-scene-${width}x${height}.png`});assert.deepEqual(errors,[]);await context.close();results.push({width,height,allSix:'passed',sceneStationary:true,documentOverflow:false,popupOverflow:false,centredLens:true,focusTrap:true,pointActivation:true});console.log(`PASS ${width}x${height}: stationary scene, 6 dialogs/retries, lens centre/edges, activation/empty clicks, keyboard trap, recap/reset`);
  }
  // Accessibility exception: only the dialog scrolls, and every control remains reachable.
  for(const [width,height,font] of [[320,560,'200%'],[375,360,'100%']]){
   const page=await env.browser.newPage({viewport:{width,height},reducedMotion:'reduce'});await page.route(/https:\/\/fonts\./,r=>r.abort());await page.goto(env.origin+'/activity/index.html');await page.addStyleTag({content:`:root{font-size:${font}!important}`});const before=await snapshot(page);await page.locator('[data-hazard="0"]').click();assert.ok(await page.locator('#panel').evaluate(el=>el.scrollHeight>el.clientHeight));
   for(const button of await page.locator('#panel button').all()){await button.scrollIntoViewIfNeeded();const r=await button.boundingBox();assert.ok(r.y>=0&&r.y+r.height<=height+1);}
   const after=await snapshot(page);for(const key of ['x','y','width','height'])close(after.scene[key],before.scene[key],'accessibility scene');assert.equal(after.scroll.x,0);assert.equal(after.scroll.y,0);assert.ok(after.scrollWidth<=after.clientWidth+1);await page.keyboard.press('Escape');await page.close();console.log(`PASS popup scrolling fallback ${width}x${height}, text ${font}`);
  }
  // All portable routes and the hub refer to this release rather than stale split assets.
  for(const file of ['preview.html','activity/embed-20261027.html','activity/embed-20261027-v7.html','activity/embed-20261027-v8.html']){const p=await env.browser.newPage({viewport:{width:943,height:560}});await p.route(/https:\/\/fonts\./,r=>r.abort());await p.goto(env.origin+'/'+file);assert.equal(await p.locator('meta[name="ukwa-build"]').getAttribute('content'),'embed-20261027-v8');await p.locator('[data-hazard="0"]').click();assert.ok(await p.locator('#panel').evaluate(el=>el.matches(':modal')));await p.close();}
  const hub=await env.browser.newPage();await hub.route('https://api.github.com/**',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify(r.request().url().includes('/actions/')?{workflow_runs:[]}:r.request().url().includes('/pulls')?[]:{sha:'test'})}));await hub.goto(env.origin+'/');await hub.waitForTimeout(100);assert.match(await hub.locator('#activity-url').textContent(),/embed-20261027-v8\.html$/);assert.match(await hub.locator('#embed-code').inputValue(),/height="560"/);assert.match(await hub.locator('#latest').getAttribute('href'),/embed-20261027-v8\.html/);await hub.close();
  fs.writeFileSync('work/v8-browser-results.json',JSON.stringify(results,null,2));console.log('PASS portable routes and hub release links');
 }finally{await env.close();}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
