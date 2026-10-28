const assert=require('node:assert/strict'),fs=require('node:fs');
const {start,snapshot}=require('./support.cjs');
(async()=>{const env=await start();fs.mkdirSync('work',{recursive:true});try{
 const page=await env.browser.newPage({viewport:{width:1920,height:1450},reducedMotion:'reduce'});await page.route(/https:\/\/fonts\./,r=>r.abort());
 const rows=[];
 for(const width of [320,375,599,600,768,943,1024,1240,1440,1920]){
 await page.setContent(`<style>html,body{margin:0;background:white}.embed{width:${width}px;container-type:inline-size}iframe{display:block;width:100%;height:max(42rem,round(up,calc(62.5cqw + 6rem),1px));border:0}</style><div class="embed"><iframe title="Warehouse practice" src="${env.origin}/activity/embed-20261028-v11.html"></iframe></div>`);
 const frame=page.frames().find(f=>f.url().includes('/activity/'));await frame.locator('.pin').first().waitFor();
 const before=await snapshot(frame),expectedWidth=width,height=Math.max(672,Math.ceil(width*.625+96));
 assert.ok(Math.abs((await page.locator('iframe').boundingBox()).height-height)<.1);
 assert.ok(Math.abs(before.scene.width-expectedWidth)<.1,JSON.stringify({width,height,expectedWidth,before}));assert.ok(Math.abs(before.scene.height-expectedWidth*.625)<.1);
 assert.equal(await frame.locator('.workspace').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(255, 255, 255)');
 const targets=before.markers;for(const r of targets)assert.ok(r.x>=before.scene.x&&r.y>=before.scene.y&&r.x+r.width<=before.scene.x+before.scene.width&&r.y+r.height<=before.scene.y+before.scene.height,'inspection button outside scene');
 await frame.locator('#find-one').click();assert.equal(await frame.locator('.pin.hint').count(),1);const hint=await frame.locator('.pin.hint').boundingBox();assert.ok(hint);await frame.locator('[data-hazard="0"]').focus();await page.keyboard.press('Enter');assert.equal(await frame.locator('.pin.hint').count(),0);await page.keyboard.press('Escape');
 for(let i=0;i<6;i++){await frame.locator(`[data-hazard="${i}"]`).focus();await page.keyboard.press('Enter');assert.deepEqual((await snapshot(frame)).scene,before.scene);assert.ok(await frame.locator('#panel').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&e.scrollWidth<=e.clientWidth+1),'normal popup overflow');await page.keyboard.press('Escape');assert.deepEqual((await snapshot(frame)).scene,before.scene);}
 assert.ok(before.scrollWidth<=before.clientWidth+1&&before.scrollHeight<=height+1);rows.push({width,frameHeight:height,scene:before.scene});
 if([375,943,1440,1920].includes(width)){await frame.locator('#restart').focus();await page.mouse.move(1919,1449);await page.screenshot({path:`work/v11-fit-${width}.png`});}
 }
 // Resize the existing iframe without reloading: image, buttons and sampling share local coordinates.
 for(const width of [943,375,1024]){
 await page.locator('.embed').evaluate((el,w)=>el.style.width=w+'px',width);
 const frame=page.frames().find(f=>f.url().includes('/activity/'));await page.waitForTimeout(80);const before=await snapshot(frame);assert.ok(Math.abs(before.scene.width-width)<.1);
 const p=before.markers[4];await page.mouse.move(p.x+22,p.y+22);assert.equal(await frame.locator('.pin.near').getAttribute('data-hazard'),'4');
 const sample=await frame.locator('#lens').evaluate(el=>{const r=el.getBoundingClientRect();return {radius:r.width/2,bg:getComputedStyle(el).backgroundPosition.split(' ').map(parseFloat)};});assert.ok(Math.abs((sample.radius-sample.bg[0])/3-(p.x+22-before.scene.x))<.1);assert.ok(Math.abs((sample.radius-sample.bg[1])/3-(p.y+22-before.scene.y))<.1);
 await frame.locator('[data-hazard="4"]').click();await page.keyboard.press('Escape');assert.deepEqual((await snapshot(frame)).scene,before.scene);
 }
 fs.writeFileSync('work/v11-fit-results.json',JSON.stringify(rows,null,2));console.log('PASS responsive iframe formula at 320/375/599/600/768/943/1024/1240/1440/1920px: full proportional artwork, white spare space, six aligned targets/dialogs, stable bounds and no normal overflow');await page.close();
}finally{await env.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
