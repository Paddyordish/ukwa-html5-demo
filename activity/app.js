'use strict';
const hazards = [
 {title:'Racking is not a ladder.',name:'Climbing the racking',x:25.1,y:31.7,detail:'A worker is using the storage racking to reach stock. A slip could cause a serious fall.',question:'What is the safest response?',choices:['Hold the racking steady while they finish.','Ask them to stop; arrange suitable access equipment with the supervisor.','Suggest climbing a little more slowly.'],correct:1,why:'Racking is designed for storage, not access. Stop the unsafe task and arrange suitable access equipment through the supervisor. Only use equipment you are trained and authorised to use.',retry:'Holding the rack or climbing more carefully does not remove the fall risk. Choose a response that stops the unsafe method.',takeaway:'Never climb racking. Stop and arrange suitable access equipment.'},
 {title:'A spill changes the next step.',name:'Spillage in the aisle',x:49,y:79.6,detail:'Liquid has spread across a walking route. The container’s contents are not known.',question:'What should happen first?',choices:['Keep people clear and report it; follow the site spill procedure.','Wipe it up immediately with whatever is nearby.','Step around it and carry on working.'],correct:0,why:'Keep others away and report the spill. Follow the site procedure; identify the substance before clean-up. Only clean it if trained and equipped to do so.',retry:'Walking past leaves the risk for someone else. An unknown liquid also needs assessment before clean-up.',takeaway:'Keep people clear. Report the spill and follow the site procedure.'},
 {title:'One box can bring down the rest.',name:'Unstable stacked boxes',x:65,y:68,detail:'The boxes lean and overhang the stack below. They could fall into the aisle.',question:'How would you make this safer?',choices:['Pull out the bottom box to straighten the stack.','Catch the top box if it starts to fall.','Keep clear and report the unstable load for safe restacking.'],correct:2,why:'Keep people clear of the falling-load area and report it. Arrange safe restacking by trained people using suitable equipment. Do not pull at the load or try to catch falling boxes.',retry:'Touching the unstable load could bring it down. Keep clear and arrange a controlled response.',takeaway:'Keep clear of unstable loads. Report and arrange safe restacking.'},
{"title": "A clear exit needs a clear route.", "name": "Blocked emergency exit", "x": 77.2, "y": 53.5, "detail": "A small pallet of cartons obstructs the emergency exit at the back of the warehouse.", "question": "What is the safest response?", "choices": ["Leave it until the next shift.", "Report it immediately and arrange for the escape route to be cleared safely.", "Assume another exit will be enough."], "correct": 1, "why": "Emergency escape routes must remain available. Report the obstruction immediately and follow site procedures to have it removed safely.", "retry": "An alternative exit does not make an obstructed escape route acceptable.", "takeaway": "Keep emergency exits and their approaches clear."},
{"title": "Small damage can signal a bigger risk.", "name": "Damaged racking upright", "x": 38.2, "y": 64, "detail": "An upright near floor level is bent and cracked. Stock remains above it.", "question": "What should you do?", "choices": ["Report the damage immediately and keep clear under the site procedure.", "Straighten it with a tool.", "Carry on if the stock looks stable."], "correct": 0, "why": "Report suspected racking damage immediately. Keep people clear as required by site procedures and have authorised people assess it. Do not repair or continue using damaged racking yourself.", "retry": "Appearance alone cannot establish that damaged racking is safe. Do not try to straighten it.", "takeaway": "Report racking damage. Keep clear and arrange an authorised assessment."},
{"title": "A small loop can catch a foot.", "name": "Discarded packing strap", "x": 29.2, "y": 87.8, "detail": "A loose loop of packing strap lies across the edge of a walking route.", "question": "How should you respond?", "choices": ["Kick it under the shelving.", "Step over it and leave it.", "Remove it safely if safe to do so, using the designated waste procedure."], "correct": 2, "why": "Discarded strapping is a trip hazard. If safe to do so, remove it using site housekeeping and waste procedures; otherwise keep people clear and report it.", "retry": "Moving the strap out of sight or stepping over it leaves the hazard for someone else.", "takeaway": "Keep routes clear of packaging and dispose of strapping safely."}
];

const crops = [ [265,185,230,280], [600,650,215,155], [850,500,180,220], [1020,288,215,245], [495,520,120,120], [355,750,140,100] ];
const panel=document.querySelector('#panel'), scene=document.querySelector('#scene'), lens=document.querySelector('#lens');
const workspace=document.querySelector('#workspace');
document.documentElement.style.setProperty('--scene-image', `url("${document.querySelector('#warehouse').src}")`);
let current=null;
const answered=new Set(),explored=new Set();
let activityComplete=false;
const markers=document.querySelector('#markers');
markers.innerHTML=hazards.map((h,i)=>`<button type="button" class="pin" style="--x:${h.x}%;--y:${h.y}%" data-hazard="${i}" aria-label="Area ${i+1}: ${h.name}" aria-controls="panel" aria-expanded="false" aria-describedby="keyboard-help"></button>`).join('');
const pins=[...markers.querySelectorAll('.pin')];
function progress(){
 document.querySelector('#count').textContent=`${explored.size} of ${hazards.length} explored`;
 document.querySelector('#progress').value=explored.size;
 pins.forEach((p,i)=>{p.classList.toggle('reviewed',explored.has(i));p.setAttribute('aria-label',`Area ${i+1}: ${hazards[i].name}${explored.has(i)?', explored':''}`);});
 const completion=document.querySelector('#completion'),message=activityComplete?'Activity complete ✓':'';
 if(completion.textContent!==message)completion.textContent=message;
 document.querySelector('#find-one').disabled=explored.size===hazards.length;
 document.querySelector('#scene-frame').inert=current!==null;
}
function select(i){
 clearHint();cancelTouch();hideLens();const wasExplored=explored.has(i);current=i;explored.add(i);progress();
 const h=hazards[i];
 pins.forEach((p,j)=>p.setAttribute('aria-expanded',String(i===j)));
 document.querySelector('#scene-frame').inert=true;
 panel.hidden=false;workspace.classList.add('inspecting');
 panel.innerHTML=`<div class="panel-top"><button class="back" type="button" aria-label="Close hazard dialog">× Close</button><span class="eyebrow">Area ${i+1} of ${hazards.length}${wasExplored?' · Explored':''}</span></div><div class="panel-content"><div class="hazard-summary"><div class="inspection"><svg viewBox="${crops[i].join(' ')}" role="img" aria-label="Close-up: ${h.name}" preserveAspectRatio="xMidYMid meet"><image href="${document.querySelector('#warehouse').src}" width="1440" height="900"/></svg></div><h2 id="panel-title" tabindex="-1">${h.name}</h2><p class="description" id="hazard-description">${h.detail}</p></div><div class="decision"><h3 id="response-question">${h.question}</h3><div class="choices">${h.choices.map((c,j)=>`<button class="choice" type="button" data-answer="${j}"><span class="choice-letter" aria-hidden="true">${String.fromCharCode(65+j)}</span><span class="choice-label">${c}</span></button>`).join('')}</div><div id="feedback" role="status" aria-live="polite" hidden></div></div></div>`;
 panel.querySelector('.back').onclick=back;
 panel.querySelectorAll('.choice').forEach(b=>b.onclick=()=>answer(Number(b.dataset.answer)));
 if(answered.has(i))showCorrect(h);
 panel.showModal();
 panel.querySelector('h2').focus({preventScroll:true});
}
function back(){
 if(current===null)return;
 const last=current;current=null;
 document.querySelector('#scene-frame').inert=false;
 if(panel.open)panel.close();panel.hidden=true;workspace.classList.remove('inspecting');
 pins.forEach(p=>p.setAttribute('aria-expanded','false'));
 if(explored.size===hazards.length)activityComplete=true;
 progress();
 pins[last].focus({preventScroll:true});
}
function showFeedback(title,message,correct){
 panel.querySelector('.choices').hidden=true;
 panel.querySelector('#response-question').hidden=true;
 const feedback=panel.querySelector('#feedback');feedback.hidden=false;
 feedback.innerHTML=`<div class="feedback ${correct?'':'retry'}"><h3 tabindex="-1" id="feedback-title">${title}</h3><p>${message}</p><button type="button" class="primary" id="${correct?'continue':'retry'}">${correct?'Continue →':'Choose again →'}</button></div>`;
 panel.querySelector(correct?'#continue':'#retry').onclick=correct?back:()=>{
  feedback.hidden=true;panel.querySelector('.choices').hidden=false;panel.querySelector('#response-question').hidden=false;
  panel.querySelector('.choice').focus({preventScroll:true});
 };
}
function showCorrect(h){showFeedback('Safe response',h.why,true);}
function answer(j){
 if(current===null||answered.has(current))return;
 const h=hazards[current];
 if(j===h.correct){answered.add(current);showCorrect(h);}
 else showFeedback('Reconsider your response',h.retry,false);
 panel.querySelector('#feedback-title').focus({preventScroll:true});
}
let hintTimer=0;
function clearHint(){clearTimeout(hintTimer);pins.forEach(p=>p.classList.remove('hint'));}
document.querySelector('#find-one').onclick=()=>{
 clearHint();const i=hazards.findIndex((_,i)=>!explored.has(i));
 if(i<0)return;
 pins[i].classList.add('hint');
 document.querySelector('#hint-status').textContent=`Hint: ${hazards[i].name}. An inspection area is briefly outlined in the warehouse. Keyboard users can Tab to each inspection area.`;
 hintTimer=setTimeout(clearHint,2600);
};
function reset(){
 clearHint();document.querySelector('#hint-status').textContent='';
 if(current!==null)back();answered.clear();explored.clear();activityComplete=false;progress();hideLens();
 pins[0].focus({preventScroll:true});
}
document.querySelector('#restart').onclick=reset;
pins.forEach((p,i)=>{
 p.onclick=e=>{if(e.detail===0){select(i);return;}if(suppressSceneClick)return;const r=scene.getBoundingClientRect(),hit=hazardAt({x:e.clientX-r.left,y:e.clientY-r.top});if(hit!==null)select(hit);};
 p.onkeydown=e=>{
  const directions=['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'];
  if(directions.includes(e.key)){e.preventDefault();pins[(i+(directions.indexOf(e.key)<2?1:pins.length-1))%pins.length].focus({preventScroll:true});}
  if(e.key==='Home'||e.key==='End'){e.preventDefault();pins[e.key==='Home'?0:pins.length-1].focus({preventScroll:true});}
 };
 p.addEventListener('focus',()=>{if(current===null)inspectMarker(i);});
});
// Keep Tab in the popup even at native-dialog/browser-chrome focus boundaries.
panel.addEventListener('keydown',e=>{
 if(e.key!=='Tab')return;
 const controls=[...panel.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')].filter(el=>el.getClientRects().length);
 const first=controls[0],last=controls[controls.length-1];
 if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus({preventScroll:true});}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus({preventScroll:true});}
});
panel.addEventListener('cancel',e=>{e.preventDefault();back();});
panel.addEventListener('close',()=>{if(!panel.open&&current!==null)back();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.open){cancelTouch();hideLens();}});
// Geometry is local to the stationary image. Only the glass and its background move.
function paint(point){
 const r=scene.getBoundingClientRect();
 const preferred=Math.max(120,Math.min(180,document.querySelector('#scene-frame').clientWidth*.22));
 lens.style.inlineSize=`${Math.min(preferred,r.width*.95,r.height*.95)}px`;
 const radius=lens.getBoundingClientRect().width/2;
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const sx=clamp(point.x,0,r.width),sy=clamp(point.y,0,r.height);
 const cx=clamp(sx,radius,r.width-radius),cy=clamp(sy,radius,r.height-radius);
 lens.style.left=`${cx}px`;lens.style.top=`${cy}px`;
 const zoom=3;
 lens.style.backgroundSize=`${r.width*zoom}px ${r.height*zoom}px`;
 // Keep the point under the pointer at the lens centre even when its circle is clamped.
 lens.style.backgroundPosition=`${radius-sx*zoom}px ${radius-sy*zoom}px`;
 const active=hazardAt({x:sx,y:sy});
 const done=active!==null&&explored.has(active);
 lens.classList.toggle('available',active!==null);lens.classList.toggle('reviewed',done);
 const label=document.querySelector('#lens-label');
 label.hidden=active===null;
 if(active!==null){
  label.textContent=done?'Explored — inspect again':'Inspect';
  const w=label.offsetWidth,h=label.offsetHeight,gap=7;
  const below=cy+radius+gap;
  const top=below+h<=r.height?below:cy-radius-gap-h;
  label.style.left=`${clamp(cx-w/2,4,r.width-w-4)}px`;
  label.style.top=`${Math.max(2,top)}px`;
 }
 pins.forEach((p,i)=>p.classList.toggle('near',i===active));
}
function moveLens(clientX,clientY){
 if(current!==null)return;
 const r=scene.getBoundingClientRect();
 lens.classList.add('on');
 paint({x:clientX-r.left,y:clientY-r.top});
}
function hideLens(){lens.classList.remove('on','available','reviewed');document.querySelector('#lens-label').hidden=true;pins.forEach(p=>p.classList.remove('near'));}
function inspectMarker(i){const r=scene.getBoundingClientRect();moveLens(r.left+r.width*hazards[i].x/100,r.top+r.height*hazards[i].y/100);}
scene.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')moveLens(e.clientX,e.clientY);});
scene.addEventListener('pointermove',e=>{
 if(e.pointerType!=='touch'){moveLens(e.clientX,e.clientY);return;}
 if(touchStart&&Math.hypot(e.clientX-touchStart.x,e.clientY-touchStart.y)>10){suppressSceneClick=true;cancelTouch();}
});
scene.addEventListener('pointerleave',()=>{cancelTouch();hideLens();});
// A still hold inspects. Any movement cancels; never prevent the browser's scroll/pinch gesture.
let touchTimer=0,touchStart=null,suppressSceneClick=false;
function cancelTouch(){clearTimeout(touchTimer);touchTimer=0;touchStart=null;hideLens();}
scene.addEventListener('pointerdown',e=>{
 suppressSceneClick=false;
 if(e.pointerType!=='touch'||current!==null)return;
 cancelTouch();touchStart={x:e.clientX,y:e.clientY};
 touchTimer=setTimeout(()=>{if(touchStart)moveLens(touchStart.x,touchStart.y);},320);
});
scene.addEventListener('pointerup',e=>{if(e.pointerType==='touch')cancelTouch();});
scene.addEventListener('pointercancel',()=>{suppressSceneClick=true;cancelTouch();});
scene.addEventListener('contextmenu',e=>{if(touchStart)e.preventDefault();});
scene.addEventListener('focusout',e=>{if(!scene.contains(e.relatedTarget))hideLens();});
window.addEventListener('resize',()=>{cancelTouch();hideLens();});
window.addEventListener('blur',cancelTouch);
// Only the inspection point selects an area; seeing a hazard elsewhere in the lens does not.
function hazardAt(point){
 const r=scene.getBoundingClientRect();let nearest=null,best=26*26;
 hazards.forEach((h,i)=>{const distance=(point.x-r.width*h.x/100)**2+(point.y-r.height*h.y/100)**2;if(distance<best){best=distance;nearest=i;}});
 return nearest;
}
scene.addEventListener('click',e=>{
 if(e.target.closest('.pin'))return;
 if(suppressSceneClick){suppressSceneClick=false;return;}
 if(current!==null)return;
 const r=scene.getBoundingClientRect(),i=hazardAt({x:e.clientX-r.left,y:e.clientY-r.top});
 if(i!==null)select(i);
});
// Container units keep the image proportionate without JS updates during activity states.
if(!CSS.supports('width','1cqw')){
 const frame=document.querySelector('#scene-frame');
 const fit=()=>{const box=frame.getBoundingClientRect(),width=Math.min(box.width,box.height*1.6);scene.style.width=`${width}px`;scene.style.height=`${width/1.6}px`;};
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(fit).observe(frame);
 window.addEventListener('resize',fit);fit();
}
progress();
