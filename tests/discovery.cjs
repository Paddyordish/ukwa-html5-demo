const assert=require('node:assert/strict');
const {start,snapshot}=require('./support.cjs');
(async()=>{const env=await start();try{
 for(const width of [943,375,320]){
 const context=await env.browser.newContext({viewport:{width,height:560},hasTouch:true});const page=await context.newPage();await page.route(/https:\/\/fonts\./,r=>r.abort());await page.goto(env.origin+'/activity/index.html');const initial=await snapshot(page);
 assert.equal(await page.locator('.pin').evaluateAll(ps=>ps.every(p=>!p.textContent.trim()&&getComputedStyle(p).backgroundColor==='rgba(0, 0, 0, 0)'&&getComputedStyle(p).borderWidth==='0px'&&getComputedStyle(p).outlineStyle==='none')),true);
 await page.locator('#find-one').click();assert.equal(await page.locator('.pin.hint').count(),1);await page.waitForTimeout(2800);assert.equal(await page.locator('.pin.hint').count(),0);
 // Every point has at most one nearest region, even where two 26px discs overlap.
 const arbitration=await page.evaluate(()=>{const r=scene.getBoundingClientRect();let overlaps=0;for(let y=0;y<r.height;y+=2)for(let x=0;x<r.width;x+=2){const hits=hazards.map((h,i)=>({i,d:Math.hypot(x-r.width*h.x/100,y-r.height*h.y/100)})).filter(h=>h.d<26).sort((a,b)=>a.d-b.d||a.i-b.i);const active=hazardAt({x,y});if(hits.length>1)overlaps++;if(active!==(hits[0]?.i??null))throw Error('incorrect nearest region');}return overlaps;});if(width===320){assert.ok(arbitration>0);
 const overlap=await page.evaluate(()=>{const r=scene.getBoundingClientRect();for(let y=0;y<r.height;y++)for(let x=0;x<r.width;x++){if(hazards.filter(h=>Math.hypot(x-r.width*h.x/100,y-r.height*h.y/100)<26).length>1){const i=hazardAt({x,y});return {x:x+r.left,y:y+r.top,i,name:hazards[i].name};}}});
 await page.mouse.move(overlap.x,overlap.y);assert.equal(await page.locator('.pin.near').getAttribute('data-hazard'),String(overlap.i));await page.mouse.click(overlap.x,overlap.y);assert.equal(await page.locator('#panel-title').textContent(),overlap.name);await page.keyboard.press('Escape');
 }
 for(let i=0;i<6;i++){
 const pin=initial.markers[i],x=pin.x+22,y=pin.y+22;
 await page.mouse.move(x,y);assert.equal(await page.locator('#lens').evaluate(el=>getComputedStyle(el).borderTopColor),'rgb(177, 0, 35)');assert.equal(await page.locator('#lens-label').textContent(),'Inspect');
 const label=await page.locator('#lens-label').boundingBox(),glass=await page.locator('#lens').boundingBox();assert.ok(label.y+label.height<=glass.y||label.y>=glass.y+glass.height,'label overlaps detail');assert.ok(label.x>=initial.scene.x&&label.x+label.width<=initial.scene.x+initial.scene.width+1);
 await page.touchscreen.tap(x,y);assert.ok(await page.locator('#panel').evaluate(el=>el.open));await page.keyboard.press('Escape');
 await page.locator(`[data-hazard="${i}"]`).focus();await page.keyboard.press('Space');assert.ok(await page.locator('#panel').evaluate(el=>el.open));await page.keyboard.press('Escape');
 assert.equal(await page.locator(`[data-hazard="${i}"]`).evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
 }
 // Still hold works on the invisible button itself, and movement cancels activation.
 const p=initial.markers[0],button=page.locator('[data-hazard="0"]');await button.dispatchEvent('pointerdown',{pointerType:'touch',clientX:p.x+22,clientY:p.y+22});await page.waitForTimeout(350);assert.ok(await page.locator('#lens').evaluate(el=>el.classList.contains('on')));await button.dispatchEvent('pointermove',{pointerType:'touch',clientX:p.x+60,clientY:p.y+22});await button.dispatchEvent('click',{detail:1,clientX:p.x+22,clientY:p.y+22});assert.equal(await page.locator('#panel').evaluate(el=>el.open),false);
 await button.focus();await page.keyboard.press('Enter');await page.locator('[data-answer="1"]').click();await page.locator('#continue').click();await page.locator('#find-one').click();assert.equal(await page.locator('.pin.hint').getAttribute('data-hazard'),'1');await page.locator('[data-hazard="1"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.pin.hint').count(),0);await page.keyboard.press('Escape');
 await page.mouse.move(initial.scene.x+initial.scene.width*.9,initial.scene.y+20);await page.screenshot({path:`work/v8-discovery-${width}.png`});
 const after=await snapshot(page);assert.deepEqual(after.scene,initial.scene);await context.close();console.log(`PASS discovery ${width}: no markers, timed hint, nearest-region arbitration (${arbitration} overlapping samples), rim/label, touch taps/hold/cancel and keyboard Space/focus`);
 }
}finally{await env.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
