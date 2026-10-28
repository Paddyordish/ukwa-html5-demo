'use strict';
(() => {
 const intro=document.querySelector('.intro');
 const audio=document.querySelector('#narration');
 const cues=[...document.querySelectorAll('[data-cue]')];
 const read=document.querySelector('#read');
 const replay=document.querySelector('#replay');
 const status=document.querySelector('#status');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let showAll=false,frame=0,complete=false,failed=false;
 const cueTimes=cues.map(node=>Number(node.dataset.cue));
 function sync(){
  const all=showAll||reduced.matches||complete;
  cues.forEach((node,i)=>node.classList.toggle('is-visible',all||audio.currentTime>=cueTimes[i]));
 }
 function stopFrame(){if(frame)cancelAnimationFrame(frame);frame=0;}
 function tick(){sync();frame=(!audio.paused&&!audio.ended)?requestAnimationFrame(tick):0;}
 function setStatus(text){if(status.textContent!==text)status.textContent=text;}
 async function play(){
  complete=false;sync();
  try{await audio.play();}catch(error){if(error.name==='AbortError'||failed)return;setStatus('Playback could not start. Use the audio player’s play button, or choose Show all text.');}
 }
 audio.addEventListener('play',()=>{failed=false;complete=false;intro.dataset.state='playing';setStatus(reduced.matches?'Narration playing. All text is visible.':'Narration playing. Text appears as it is spoken.');stopFrame();frame=requestAnimationFrame(tick);});
 audio.addEventListener('pause',()=>{stopFrame();sync();if(!audio.ended&&!failed){intro.dataset.state='paused';setStatus('Narration paused. Resume using the audio player.');}});
 audio.addEventListener('timeupdate',sync);
 audio.addEventListener('seeking',()=>{complete=false;sync();});
 audio.addEventListener('seeked',sync);
 audio.addEventListener('ended',()=>{stopFrame();complete=true;intro.dataset.state='complete';sync();setStatus('Introduction finished. You can replay it or continue through the course.');});
 audio.addEventListener('error',()=>{failed=true;stopFrame();showAll=true;sync();setStatus('Audio is unavailable. The full introduction text is visible.');});
 replay.addEventListener('click',()=>{stopFrame();complete=false;showAll=false;read.setAttribute('aria-pressed','false');read.textContent='Show all text';audio.currentTime=0;sync();play();});
 read.addEventListener('click',()=>{showAll=!showAll;read.setAttribute('aria-pressed',String(showAll));read.textContent=showAll?'Follow narration':'Show all text';sync();setStatus(showAll?'All introduction text is visible. Audio playback is optional.':reduced.matches?'Reduced motion is enabled; all text remains visible.':'Text now follows the narration’s playback position.');});
 function motionChange(){sync();if(reduced.matches)setStatus('Reduced motion is enabled. All text is visible; narration is optional.');}
 if(reduced.addEventListener)reduced.addEventListener('change',motionChange);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&!audio.paused)audio.pause();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!audio.paused)audio.pause();});
 window.addEventListener('pagehide',()=>{audio.pause();stopFrame();});
 intro.classList.add('is-enhanced');sync();motionChange();
})();
