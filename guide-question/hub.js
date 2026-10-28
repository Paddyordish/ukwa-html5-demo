// Authoring-only release gate. Learner activity has no network tracking or storage.
(()=>{
 const build='guide-question-20261028-v01',url=new URL('guide-question/guide-question-20261028-v01.html',location.href).href;
 const frame='<div style="container-type:inline-size;width:100%">\n  <iframe src="'+url+'" title="UKWA: Why safety matters — guide practice" width="100%" height="1120" style="display:block;width:100%;height:round(up,max(45rem,calc(78rem - 40cqw)),1px);border:0" loading="lazy"></iframe>\n</div>';
 document.querySelector('#guide-url').textContent=url;document.querySelector('#guide-embed').value=frame;
 let verified=false,checkGeneration=0;
 function ready(value,message){verified=value;document.querySelector('#guide-ready').textContent=message;const link=document.querySelector('#guide-open');link.setAttribute('aria-disabled',String(!value));if(value)link.href=url;else link.removeAttribute('href');document.querySelectorAll('[data-guide-copy]').forEach(b=>b.disabled=!value);}
 async function checkGuide(){const token=++checkGeneration;const button=document.querySelector('#guide-check');button.disabled=true;ready(false,'Awaiting publication — checking Pages and the exact guide URL.');try{
  const api='https://api.github.com/repos/Paddyordish/ukwa-html5-demo';const request=async path=>{const r=await fetch(api+path,{cache:'no-store',headers:{Accept:'application/vnd.github+json'}});if(!r.ok)throw Error('GitHub publication status could not be checked.');return r.json();};
  const [runs,head]=await Promise.all([request('/actions/runs?per_page=30'),request('/commits/main')]);const latest=runs.workflow_runs.find(r=>r.name==='pages build and deployment'&&r.head_branch==='main');
  if(!latest||latest.status!=='completed'||latest.conclusion!=='success'||latest.head_sha!==head.sha)throw Error('Waiting for a successful deployment of newest main.');
  const response=await fetch(url,{cache:'no-store'});if(response.status!==200||response.url!==url)throw Error('The exact guide URL is not available.');const html=new DOMParser().parseFromString(await response.text(),'text/html');if(html.querySelector('meta[name="ukwa-build"]')?.content!==build||!html.querySelector('#guide')||!html.querySelector('#narration'))throw Error('The guide URL returned a different build.');
  const media=['guide-question/assets/guide-expressions-v01.png','assets/audio/U01_Q01_Question_Female_UK_v01.mp3','assets/audio/U01_Q01_Correct_Female_UK_v01.mp3','assets/audio/U01_Q01_Retry_Female_UK_v01.mp3'];
  await Promise.all(media.map(async path=>{const target=new URL(path,location.href).href,r=await fetch(target,{method:'HEAD',cache:'no-store'});if(r.status!==200||r.url!==target)throw Error('Guide media has not finished publishing.');}));
  if(token!==checkGeneration)return;ready(true,'Ready — Pages deployment, exact '+build+' URL, character and all three narration files verified.');
 }catch(error){if(token===checkGeneration)ready(false,'Awaiting publication / unverified — '+error.message);}finally{if(token===checkGeneration)button.disabled=false;}}
 document.querySelector('#guide-check').onclick=checkGuide;document.querySelector('#refresh').addEventListener('click',checkGuide);document.querySelector('#guide-open').onclick=event=>{if(!verified)event.preventDefault();};
 document.querySelectorAll('[data-guide-copy]').forEach(button=>button.onclick=async()=>{if(!verified)return;const text=button.dataset.guideCopy==='url'?url:frame;try{await navigator.clipboard.writeText(text);document.querySelector('#message').textContent='Guide '+(button.dataset.guideCopy==='url'?'link':'embed code')+' copied.';}catch{const field=document.querySelector('#guide-embed');field.closest('details').open=true;field.value=text;field.focus();field.select();document.querySelector('#message').textContent='Select and copy the guide text shown.';}});
 checkGuide();
})();
