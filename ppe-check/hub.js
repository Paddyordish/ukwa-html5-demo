(() => {
'use strict';
const repo='Paddyordish/ukwa-html5-demo', api='https://api.github.com/repos/'+repo;
const url=new URL('ppe-check/ppe-check-20261113-v01.html',location.href).href;
const code=url;
const $=s=>document.querySelector(s); let ready=false;
$('#ppe-url').textContent=url;$('#ppe-embed').value=code;
function setReady(ok,text){ready=ok;$('#ppe-ready').textContent=text;$('#ppe-open').setAttribute('aria-disabled',String(!ok));if(ok)$('#ppe-open').href=url;else $('#ppe-open').removeAttribute('href');document.querySelectorAll('[data-ppe-copy]').forEach(b=>b.disabled=!ok);}
async function get(path){const res=await fetch(api+path,{cache:'no-store',headers:{Accept:'application/vnd.github+json'}});if(!res.ok)throw Error('GitHub status '+res.status);return res.json();}
async function check(){const b=$('#ppe-check');b.disabled=true;setReady(false,'Not ready — checking deployment and exact PPE release.');try{const [runs,head]=await Promise.all([get('/actions/runs?per_page=30'),get('/commits/main')]);const run=runs.workflow_runs.find(r=>r.name==='pages build and deployment'&&r.head_branch==='main');if(!run||run.status!=='completed'||run.conclusion!=='success'||run.head_sha!==head.sha)throw Error('waiting for a successful Pages deployment of the newest main commit');const response=await fetch(url,{cache:'no-store'});if(response.status!==200||response.url!==url)throw Error('exact release unavailable or redirected');const doc=new DOMParser().parseFromString(await response.text(),'text/html');if(doc.querySelector('meta[name="ukwa-build"]')?.content!=='ppe-check-20261113-v01'||!doc.querySelector('#kit')||!doc.querySelector('#panel')||!doc.querySelector('#launcher'))throw Error('different build returned');setReady(true,'Ready — successful Pages deployment and exact PPE game URL/build verified.');}catch(e){setReady(false,'Awaiting publication — '+e.message+'.');}finally{b.disabled=false;}}
$('#ppe-open').addEventListener('click',e=>{if(!ready)e.preventDefault();});$('#ppe-check').addEventListener('click',check);
document.querySelectorAll('[data-ppe-copy]').forEach(b=>b.addEventListener('click',async()=>{if(!ready)return;const text=b.dataset.ppeCopy==='url'?url:code;try{await navigator.clipboard.writeText(text);$('#message').textContent='PPE '+(b.dataset.ppeCopy==='url'?'link':'embed code')+' copied.';}catch(e){const field=$('#ppe-embed');field.closest('details').open=true;field.value=text;field.focus();field.select();$('#message').textContent='The PPE text is selected for you to copy.';}}));check();
})();
