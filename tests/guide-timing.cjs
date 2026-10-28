const assert=require('node:assert/strict'),fs=require('node:fs');const {start}=require('./support.cjs');
(async()=>{const env=await start();fs.mkdirSync('work/guide-timing',{recursive:true});const results=[];try{
 for(const version of (process.env.UKWA_TIMING_VERSIONS||'v01,v02').split(','))for(const outcome of ['correct','retry'])for(const width of [943,375]){
 const page=await env.browser.newPage({viewport:{width,height:width===943?871:1098},reducedMotion:'reduce',hasTouch:width<651});page.setDefaultTimeout(15000);await page.route(/https:\/\/fonts\./,r=>r.abort());const requests=[];await page.route('**/*.mp3',async route=>{requests.push(route.request().url());await new Promise(resolve=>setTimeout(resolve,700));const response=await route.fetch();await route.fulfill({response});});
 await page.goto(env.origin+`/guide-question/guide-question-20261028-${version}.html`);
 if(version==='v02')await page.waitForFunction(()=>[...document.querySelectorAll('audio')].every(a=>a.readyState>=4&&a.buffered.length&&a.buffered.end(a.buffered.length-1)>=a.duration-.1));
 await page.evaluate(()=>{
  const context=new AudioContext(),analyser=context.createAnalyser();analyser.fftSize=1024;analyser.connect(context.destination);for(const a of document.querySelectorAll('audio'))context.createMediaElementSource(a).connect(analyser);
  window.measure={start:null,playing:null,signal:null,visual:null};const measure=window.measure;
  for(const a of document.querySelectorAll('audio'))a.addEventListener('playing',()=>{if(measure.start!==null&&measure.playing===null)measure.playing=performance.now()-measure.start;});
  new MutationObserver(()=>{if(measure.start!==null&&measure.visual===null&&document.querySelector('#guide').dataset.stage!=='question')measure.visual=performance.now()-measure.start;}).observe(document.querySelector('#guide'),{attributes:true,attributeFilter:['data-stage']});
  document.querySelector('form').addEventListener('submit',()=>{measure.start=performance.now();context.resume();const data=new Float32Array(analyser.fftSize);function sample(){analyser.getFloatTimeDomainData(data);let sum=0;for(const x of data)sum+=x*x;if(Math.sqrt(sum/data.length)>Math.pow(10,-50/20)&&measure.signal===null)measure.signal=performance.now()-measure.start;if(measure.signal===null&&performance.now()-measure.start<12000)requestAnimationFrame(sample);}requestAnimationFrame(sample);},{capture:true});
 });
 await page.locator(`input[value="${outcome==='correct'?'a':'b'}"]`).check();const before=requests.length;await page.locator('#submit-answer').click();await page.waitForFunction(()=>window.measure.signal!==null);const measured=await page.evaluate(()=>window.measure);const added=requests.length-before;
 assert.ok(measured.visual<300,'Feedback must appear without waiting for audio');
 if(version==='v02'){assert.equal(added,0,'Warm feedback must not fetch/reload on submit');assert.ok(measured.playing<300,JSON.stringify(measured));assert.ok(measured.signal<500,JSON.stringify(measured));assert.equal(await page.locator('audio').evaluateAll(as=>as.filter(a=>!a.paused).length),1);}
 else assert.ok(measured.playing>=600,'Baseline must include the injected cold request delay');
 const row={version,outcome,width,networkDelayMs:700,submitToPlayingMs:Math.round(measured.playing),submitToSignalMs:Math.round(measured.signal),submitToVisualMs:Math.round(measured.visual),newRequestsOnSubmit:added};results.push(row);console.log('PASS timing '+JSON.stringify(row));await page.close();
 }
 fs.writeFileSync('work/guide-timing/results.json',JSON.stringify(results,null,2));
}finally{await env.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
