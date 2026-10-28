const assert=require('node:assert/strict');
const {start}=require('./support.cjs');
(async()=>{const env=await start();try{
 // A native-style neighbour harness. This is deliberately not presented as the real LMS.
 const page=await env.browser.newPage({viewport:{width:1100,height:850},reducedMotion:'reduce'});await page.route(/https:\/\/fonts\./,r=>r.abort());
 await page.setContent(`<main style="margin:20px"><button id="before">Native block before activity</button><iframe title="Warehouse practice" src="${env.origin}/activity/embed-20261027-v8.html" style="display:block;width:943px;height:560px;border:0;margin:16px 0"></iframe><button id="after">Native block after activity</button></main>`);
 const frame=page.frameLocator('iframe');await frame.locator('.pin').first().waitFor();
 const outerHeight=await page.evaluate(()=>document.documentElement.scrollHeight),afterTop=(await page.locator('#after').boundingBox()).y;
 const bounds=()=>frame.locator('#scene').evaluate(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height];});const initial=await bounds();
 for(let i=0;i<6;i++){
  await frame.locator(`[data-hazard="${i}"]`).click();
  await frame.locator(`[data-answer="${[1,0,2,1,0,2][i]}"]`).click();
  assert.deepEqual(await bounds(),initial);
  assert.ok(await frame.locator('body').evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1&&document.documentElement.scrollWidth<=innerWidth+1));
  await frame.locator('#continue').focus();await page.keyboard.press('Tab');assert.equal(await frame.locator('#panel').evaluate(el=>el.contains(document.activeElement)),true,'Tab must stay inside the open dialog');
  await frame.locator('#continue').click();assert.deepEqual(await bounds(),initial);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight),outerHeight);assert.equal((await page.locator('#after').boundingBox()).y,afterTop);
 }
 await frame.locator('#recap').waitFor();await frame.locator('#restart').focus();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'after','Tab can leave after the modal closes');
 await frame.locator('#restart').click();assert.equal(await frame.locator('#count').textContent(),'0 of 6 reviewed');await page.screenshot({path:'work/v8-iframe-neighbours.png',fullPage:true});await page.close();
 console.log('PASS iframe: six dialogs keep scene/native neighbours fixed, modal traps focus, closing permits Tab back to native controls');
 // Browser-generated touch gestures, rather than synthetic pointer event listeners alone.
 const context=await env.browser.newContext({viewport:{width:399,height:800},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 const mobile=await context.newPage();await mobile.route(/https:\/\/fonts\./,r=>r.abort());
 await mobile.setContent(`<style>html,body{margin:0;touch-action:auto}main{margin:12px}iframe{display:block;width:375px;height:560px;border:0}</style><main><p style="margin:0;height:40px">Native course content</p><iframe title="Warehouse practice" src="${env.origin}/activity/embed-20261027-v8.html"></iframe><p style="height:1800px">More native course content</p></main>`);
 const inside=mobile.frameLocator('iframe');await inside.locator('.pin').first().waitFor();
 const imageRect=await inside.locator('#scene').boundingBox();const fixed=await inside.locator('#scene').evaluate(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height];});
 const cdp=await context.newCDPSession(mobile);
 async function drag(from,to){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:from.x,y:from.y}]});for(let i=1;i<=10;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:from.x+(to.x-from.x)*i/10,y:from.y+(to.y-from.y)*i/10}]});await mobile.waitForTimeout(20);}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(300);}
 const point={x:imageRect.x+imageRect.width*.55,y:imageRect.y+imageRect.height*.55};
 await drag(point,{x:point.x-100,y:point.y});assert.equal(await mobile.evaluate(()=>scrollX),0);assert.equal(await inside.locator('body').evaluate(()=>scrollX),0);assert.deepEqual(await inside.locator('#scene').evaluate(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height];}),fixed);
 const parentBefore=await mobile.evaluate(()=>scrollY);await drag(point,{x:point.x,y:point.y-110});
 const parentAfter=await mobile.evaluate(()=>scrollY);assert.ok(parentAfter>parentBefore,'Vertical gesture should scroll the surrounding course');assert.equal(await inside.locator('body').evaluate(()=>scrollY),0);assert.deepEqual(await inside.locator('#scene').evaluate(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height];}),fixed);
 assert.equal(await inside.locator('#panel').evaluate(el=>el.open),false,'A course pan must not activate a hazard');
 console.log(`PASS Chromium touch: sideways drag moves neither scene nor document; surrounding page scrolls ${parentAfter-parentBefore}px vertically while iframe scroll stays zero`);
 await context.close();
}finally{await env.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
