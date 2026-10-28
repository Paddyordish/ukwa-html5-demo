const assert=require('node:assert/strict');const {start}=require('./support.cjs');
(async()=>{const env=await start();try{
 for(const scenario of ['running','failed','old-commit','wrong-build','missing-url','ready']){
 const page=await env.browser.newPage();await page.route('https://api.github.com/**',route=>{const url=route.request().url();const body=url.includes('/actions/')?{workflow_runs:[{name:'pages build and deployment',head_branch:'main',head_sha:scenario==='old-commit'?'old':'main-sha',status:scenario==='running'?'in_progress':'completed',conclusion:scenario==='failed'?'failure':'success'}]}:url.includes('/pulls')?[]:{sha:'main-sha'};return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(body)});});
 if(scenario==='wrong-build'||scenario==='missing-url')await page.route('**/activity/embed-20261028-v11.html',r=>r.fulfill({status:scenario==='missing-url'?404:200,contentType:'text/html',body:'<meta name="ukwa-build" content="old-build"><div id="scene"></div><p id="activity-status"></p>'}));
 await page.goto(env.origin+'/');await page.waitForFunction(()=>!document.querySelector('#refresh').disabled);
 const ready=scenario==='ready';assert.equal(await page.locator('#latest').getAttribute('aria-disabled'),String(!ready));assert.equal(await page.locator('[data-copy="url"]').isEnabled(),ready);assert.equal(await page.locator('[data-copy="embed"]').isEnabled(),ready);
 if(ready){assert.equal(await page.locator('#latest').getAttribute('href'),env.origin+'/activity/embed-20261028-v11.html');assert.match(await page.locator('#activity-ready').textContent(),/^Ready/);}
 else{assert.equal(await page.locator('#latest').getAttribute('href'),null);assert.match(await page.locator('#activity-ready').textContent(),/^Not ready/);}
 // Invalidate a previous success: no stale enabled link survives a failed recheck.
 if(ready){await page.route('**/activity/embed-20261028-v11.html',r=>r.fulfill({status:404,body:'Missing'}));await page.locator('#refresh').click();await page.waitForFunction(()=>!document.querySelector('#refresh').disabled);assert.equal(await page.locator('#latest').getAttribute('href'),null);assert.equal(await page.locator('[data-copy="url"]').isDisabled(),true);}
 await page.close();console.log('PASS publication gate: '+scenario);
 }
}finally{await env.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
