const assert=require('node:assert/strict');const {start,snapshot}=require('./support.cjs');
(async()=>{const env=await start();try{for(const [width,height,font] of [[943,686,100],[375,560,100],[320,560,100],[320,560,200]]){
 const page=await env.browser.newPage({viewport:{width,height},reducedMotion:'reduce'});await page.route(/https:\/\/fonts\./,r=>r.abort());await page.goto(env.origin+'/activity/index.html');if(font!==100)await page.addStyleTag({content:':root{font-size:'+font+'%!important}'});const initial=await snapshot(page);
 const headerBounds=()=>page.locator('.toolbar').evaluate(el=>[el,...el.querySelectorAll('img,.progress,#count,#completion,progress')].map(e=>{const r=e.getBoundingClientRect();return [r.x,r.y,r.width,r.height];}));const header=await headerBounds();
 async function stable(){assert.deepEqual((await snapshot(page)).scene,initial.scene);assert.deepEqual(await headerBounds(),header);assert.ok(await page.locator('body').evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1));}
 assert.equal(await page.locator('#completion').getAttribute('aria-live'),'polite');
 for(let i=0;i<6;i++){
 await page.locator(`[data-hazard="${i}"]`).focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#count').textContent(),`${i+1} of 6 explored`);assert.equal(await page.locator('#completion').textContent(),'');await stable();
 // Opening the final popup must not announce completion, even after incorrect feedback.
 if(i===5){await page.locator('[data-answer="0"]').click();assert.ok(await page.locator('.feedback.retry').count());assert.equal(await page.locator('#completion').textContent(),'');}
 await page.keyboard.press('Escape');assert.equal(await page.locator('#completion').textContent(),i===5?'Activity complete ✓':'');await stable();
 if(i===0){await page.keyboard.press('Space');assert.equal(await page.locator('#count').textContent(),'1 of 6 explored');assert.equal(await page.locator('.choice').count(),3);await page.getByRole('button',{name:'Close hazard dialog'}).click();await stable();}
 }
 await page.locator('#find-one').focus();await page.mouse.move(width-1,height-1);await page.screenshot({path:`work/v9-complete-${width}-${font}.png`});
 assert.ok(await page.locator('#completion').evaluate(el=>el.scrollWidth<=el.clientWidth+1&&el.scrollHeight<=el.clientHeight+1),'completion text clipped');assert.equal(await page.locator('#progress').getAttribute('max'),'6');assert.equal(await page.locator('#progress').evaluate(e=>e.value),6);
 // Continued exploration still permits unanswered practice decisions after completion.
 await page.locator('[data-hazard="1"]').click();assert.equal(await page.locator('.choice').count(),3);await page.locator('[data-answer="0"]').click();await page.locator('#continue').click();assert.equal(await page.locator('#count').textContent(),'6 of 6 explored');assert.equal(await page.locator('#completion').textContent(),'Activity complete ✓');await stable();
 await page.locator('#restart').click();assert.equal(await page.locator('#count').textContent(),'0 of 6 explored');assert.equal(await page.locator('#completion').textContent(),'');assert.equal(await page.locator('#progress').evaluate(e=>e.value),0);await stable();
 await page.locator('[data-hazard="1"]').click();assert.equal(await page.locator('.choice').count(),3);await page.keyboard.press('Escape');assert.equal(await page.locator('#count').textContent(),'1 of 6 explored');await stable();
 await page.locator('#restart').click();await page.locator('#find-one').focus();await page.keyboard.press('Tab');await page.mouse.move(width-1,height-1);await page.screenshot({path:`work/v9-completion-reset-${width}-${font}.png`});await page.close();console.log(`PASS completion ${width}x${height}, text ${font}%: six openings without correct answers, distinct count, deferred polite confirmation, continued practice, restart, stable header/scene and no document overflow`);
 }}finally{await env.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
