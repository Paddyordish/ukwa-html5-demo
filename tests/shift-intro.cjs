const {chromium:pw}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
const server=http.createServer((req,res)=>{const u=new URL(req.url,'http://local');let file=path.resolve(root,'.'+decodeURIComponent(u.pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.mp3':'audio/mpeg','.jpg':'image/jpeg','.png':'image/png'})[ext]||'text/plain');const bytes=fs.readFileSync(file);res.setHeader('Accept-Ranges','bytes');const range=req.headers.range;if(range){const m=/bytes=(\d+)-(\d*)/.exec(range);const start=Number(m[1]),end=m[2]?Math.min(Number(m[2]),bytes.length-1):bytes.length-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${bytes.length}`,'Content-Length':end-start+1});res.end(bytes.subarray(start,end+1));}else{res.setHeader('Content-Length',bytes.length);res.end(bytes);}}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const options={headless:true};if(process.env.CHROMIUM_PATH)options.executablePath=process.env.CHROMIUM_PATH;if(process.env.CHROMIUM_ARGS)options.args=JSON.parse(process.env.CHROMIUM_ARGS);const browser=await pw.launch(options);
const context=await browser.newContext();
const base='http://127.0.0.1:'+server.address().port;const screenshots=path.join(root,'work','shift-intro');fs.mkdirSync(screenshots,{recursive:true});
try{
for(const [width,height] of [[1240,900],[943,850],[600,850],[375,900],[320,900]]){
 const page=await context.newPage();await page.setViewportSize({width,height});await page.route(/https:\/\/fonts\./,r=>r.abort());const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/shift-intro/intro-20261028-v02.html');await page.locator('.hero-image').evaluate(img=>img.decode());
 await page.waitForFunction(()=>document.querySelector('#narration').readyState>=1);
 assert.equal(await page.locator('.cue.is-visible').count(),1,'Only heading initially');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
 assert(await page.locator('.hero').evaluate(n=>n.scrollHeight<=n.clientHeight+1),'No clipped hero copy');
 await page.locator('#replay').click();await page.waitForFunction(()=>!document.querySelector('#narration').paused);
 await page.waitForFunction(()=>document.querySelector('#narration').readyState>=3);await page.evaluate(()=>{const a=document.querySelector('#narration');a.pause();a.currentTime=2.5;});await page.waitForFunction(()=>document.querySelectorAll('.cue.is-visible').length===2);
 const t=await page.locator('#narration').evaluate(a=>a.currentTime);await page.waitForTimeout(200);assert.equal(await page.locator('#narration').evaluate(a=>a.currentTime),t,'Pause holds position');
 await page.locator('#narration').evaluate(a=>a.currentTime=11.5);await page.waitForFunction(()=>document.querySelectorAll('.cue.is-visible').length===3);
 await page.locator('#narration').evaluate(a=>a.currentTime=15.6);await page.waitForFunction(()=>document.querySelectorAll('.cue.is-visible').length===4);
 await page.waitForTimeout(750);await page.screenshot({path:path.join(screenshots,'intro-'+width+'.png'),fullPage:true});
 await page.locator('#narration').evaluate(a=>a.currentTime=1);await page.waitForFunction(()=>document.querySelectorAll('.cue.is-visible').length===1);
 await page.locator('#read').click();assert.equal(await page.locator('.cue.is-visible').count(),4);assert.equal(await page.locator('#read').getAttribute('aria-pressed'),'true');
 await page.locator('#read').click();assert.equal(await page.locator('.cue.is-visible').count(),1);
 await page.locator('#narration').evaluate(a=>{a.currentTime=19.4;return a.play();});await page.waitForFunction(()=>document.querySelector('.intro').dataset.state==='complete');assert.equal(await page.locator('.cue.is-visible').count(),4);
 await page.locator('#replay').click();await page.waitForFunction(()=>document.querySelector('#narration').currentTime<1);assert.equal(await page.locator('.cue.is-visible').count(),1);await page.locator('#narration').evaluate(a=>a.pause());
 await page.locator('#replay').focus();await page.keyboard.press('Enter');await page.waitForFunction(()=>!document.querySelector('#narration').paused);await page.keyboard.press('Escape');assert(await page.locator('#narration').evaluate(a=>a.paused));
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('paused'));await page.locator('#narration').evaluate(a=>{a.src='/missing-narration.mp3';a.load();});await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('unavailable'));assert.equal(await page.locator('.cue.is-visible').count(),4);assert.match(await page.locator('#status').textContent(),/unavailable/);
 assert.deepEqual(errors,[]);console.log('PASS '+width+'px: layout, media play, paragraph cues, pause/seek, read mode, end, replay, keyboard and audio error.');await page.close();
}
const reduced=await context.newPage();await reduced.setViewportSize({width:943,height:850});await reduced.emulateMedia({reducedMotion:'reduce'});await reduced.route(/https:\/\/fonts\./,r=>r.abort());await reduced.goto(base+'/shift-intro/');assert.equal(await reduced.locator('.cue.is-visible').count(),4);assert.equal(await reduced.locator('.cue').first().evaluate(n=>getComputedStyle(n).transitionDuration),'0s');await reduced.close();console.log('PASS reduced motion: full text without animation.');
const nojsContext=await browser.newContext({javaScriptEnabled:false});const nojs=await nojsContext.newPage();await nojs.route(/https:\/\/fonts\./,r=>r.abort());await nojs.goto(base+'/shift-intro/');assert.equal(await nojs.locator('.cue').count(),4);assert.equal(await nojs.locator('.cue').last().evaluate(n=>getComputedStyle(n).opacity),'1');await nojs.close();console.log('PASS no-JavaScript: all text visible and native audio retained.');
}finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e.stack);process.exitCode=1});

