(function(){
'use strict';const C=window.UKWAInline,q=C.S.question;let phase='question',cursor=0,page=0,good=false;
const spoken={correct:C.audio('U01_Q01_Correct_Female_UK_v01.mp3'),retry:C.audio('U01_Q01_Retry_Female_UK_v01.mp3')};
const options=q.choices.map((text,index)=>({text,index}));
function render(){const feedback=phase==='feedback',pose=feedback?(good?'pleased':'thoughtful'):'neutral';const sh=C.shell(feedback?(good?'People. Responsibilities. Business.':'Have another go'):'Why safety matters',null,C.narrow()?C.portrait(pose,true):C.logo(),[feedback?C.btn('Play feedback narration','▶',()=>{C.stopAll();C.play(good?spoken.correct:spoken.retry);}):null,C.btn('Read the question again','↻',()=>{C.stopAll();phase='question';page=0;render();C.focus();})]);let box;
if(feedback)box=C.feedback(good?q.why:q.retry,page,good?'You have it':'Think again',good,()=>{C.stopAll();phase=good?'complete':'choices';render();C.focus();},p=>{page=p;render();C.focus();});
else if(phase==='complete'){box=C.el('section',{class:'card'});box.append(C.el('p',{class:'scenario',text:'Question complete. Continue with the lesson below.'}),C.btn('Try the question again','Try again',()=>{phase='question';render();C.focus();},'primary'));}
else{box=C.el('section',{class:'card question-card'});if(!C.tiny()||phase==='question')box.append(C.el('h2',{text:q.prompt,tabindex:'-1'}));if(C.tiny()&&phase==='question')box.append(C.btn('Choose your response','Choose your response →',()=>{phase='choices';render();C.focus();},'primary'));else box.append(C.choicePanel(options,cursor,i=>{cursor=i;render();},i=>{good=i===q.correct;phase='feedback';page=0;render();C.focus();}));}
if(!C.narrow()&&!C.tiny()){const layout=C.el('div',{class:'layout'}),guide=C.el('div',{class:'guide'});guide.append(C.portrait(pose),C.el('p',{class:'guide-caption',text:'Your warehouse guide'}));layout.append(guide,box);sh.main.append(layout);}else sh.main.append(box);}
C.register('question',{render});})();
