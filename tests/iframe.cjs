/* Verify that the activity's state changes do not resize a native-block/iframe layout. */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
(async()=>{
 const server=http.createServer((req,res)=>{const file=path.resolve('.'+new URL(req.url,'http://local').pathname);if(!file.startsWith(process.cwd()+path.sep)){res.writeHead(403).end();return;}try{res.writeHead(200,{'Content-Type':'text/html'});res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1100,height:850},reducedMotion:'reduce'});await page.route(/https:\/\/fonts\./,r=>r.abort());
  await page.setContent(`<main style="margin:20px"><button id="before">Native block before activity</button><iframe title="Warehouse practice" src="${origin}/activity/embed-20261027.html" style="display:block;width:943px;height:530px;border:0;margin:16px 0"></iframe><button id="after">Native block after activity</button></main>`);
  const inner=page.frameLocator('iframe');await inner.locator('.pin').first().waitFor();
  const outerHeight=await page.evaluate(()=>document.documentElement.scrollHeight),afterTop=(await page.locator('#after').boundingBox()).y;
  for(let i=0;i<6;i++){
   await inner.locator(`[data-hazard="${i}"]`).click();
   await inner.locator(`[data-answer="${[1,0,2,1,0,2][i]}"]`).click();
   const fits=await inner.locator('body').evaluate(()=>({h:innerHeight,scroll:document.documentElement.scrollHeight}));assert.ok(fits.scroll<=fits.h+1);
   if(i===0){await inner.locator('#continue').focus();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'after');}
   await inner.locator('#continue').click();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight),outerHeight);assert.equal((await page.locator('#after').boundingBox()).y,afterTop);
  }
  await inner.locator('#recap').waitFor();await inner.locator('#restart').click();assert.equal(await inner.locator('#count').textContent(),'0 of 6 reviewed');
  await page.screenshot({path:'work/iframe-native-neighbours.png',fullPage:true});
  console.log('PASS embedded 943x530 iframe: six decisions and summary do not move native neighbours; no inner overflow; Tab exits to native control.');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
