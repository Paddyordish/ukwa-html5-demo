'use strict';
const root=document.querySelector('#guide'),audio=document.querySelector('#narration');
const form=document.querySelector('#question-form'),feedback=document.querySelector('#feedback');
const playButton=document.querySelector('#play'),replayButton=document.querySelector('#replay'),muteButton=document.querySelector('#mute'),status=document.querySelector('#audio-status');
const tracks={
 question:{src:'../assets/audio/U01_Q01_Question_Female_UK_v01.mp3',duration:6.191,label:'Question',pose:'neutral',note:'Let’s think about safety.'},
 correct:{src:'../assets/audio/U01_Q01_Correct_Female_UK_v01.mp3',duration:13.479,label:'Correct feedback',pose:'pleased',note:'Every role makes a difference.',title:'That’s right.',copy:'Health and safety protects people, helps employers and employees meet their responsibilities, and reduces disruption and costs. Whatever your role, your choices can make a difference.'},
 retry:{src:'../assets/audio/U01_Q01_Retry_Female_UK_v01.mp3',duration:10.841,label:'Retry feedback',pose:'thoughtful',note:'Take a moment. Have another go.',title:'There’s more to it than that.',copy:'Think about the people working in the warehouse, the responsibilities we all share, and the effect an accident can have on the business. Have another go.'}
};
let stage='question',generation=0,failed=false,started=false;
const time=n=>`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`;
function clock(){document.querySelector('#audio-time').textContent=`${time(audio.currentTime||0)} / ${time(Number.isFinite(audio.duration)?audio.duration:tracks[stage].duration)}`;}
function controls(){
 playButton.textContent=!audio.paused&&!audio.ended?'Pause narration':started&&!audio.ended&&!failed?'Resume narration':stage==='question'?'Play question':'Play feedback';
 muteButton.setAttribute('aria-pressed',String(audio.muted));muteButton.textContent=audio.muted?'Unmute':'Mute';clock();
}
function report(text){const message=text+(audio.muted&&!/muted/i.test(text)?' · Muted':'');if(status.textContent!==message)status.textContent=message;controls();}
function stop(){generation++;audio.pause();try{audio.currentTime=0;}catch{}started=false;}
async function startClip(restart=false){
 const token=++generation;if(failed)audio.load();if(restart){audio.pause();try{audio.currentTime=0;}catch{}}
 failed=false;started=true;report('Starting '+tracks[stage].label.toLowerCase()+'…');
 try{await audio.play();if(token!==generation)return;report('Playing '+tracks[stage].label.toLowerCase()+'.');}
 catch(error){if(token!==generation||error.name==='AbortError')return;failed=true;started=false;report('Audio unavailable. The full text is shown. Replay to try again.');}
}
function setStage(next,autoplay=false){
 stop();stage=next;root.dataset.stage=stage;failed=false;
 const track=tracks[stage];audio.src=track.src;audio.load();
 form.hidden=stage!=='question';feedback.hidden=stage==='question';
 document.querySelectorAll('.pose').forEach(el=>el.classList.toggle('active',el.classList.contains(track.pose)));
 document.querySelector('#portrait').setAttribute('aria-label',`The opening warehouse guide, ${track.pose==='pleased'?'pleased and smiling':track.pose==='thoughtful'?'thoughtful and encouraging':'attentive and neutral'}`);
 document.querySelector('#pose-note').textContent=track.note;
 if(stage==='question'){form.reset();document.querySelector('#submit-answer').disabled=true;report('Question ready. Read and answer, or play the narration.');}
 else{document.querySelector('#feedback-label').textContent=stage==='correct'?'Practice complete ✓':'Have another go';document.querySelector('#feedback-title').textContent=track.title;document.querySelector('#feedback-copy').textContent=track.copy;document.querySelector('#try-again').hidden=stage!=='retry';document.querySelector('#practise-again').hidden=stage!=='correct';document.querySelector('#feedback-title').focus({preventScroll:true});report(track.label+' ready. The full text is shown.');}
 if(autoplay)startClip();
}
form.addEventListener('change',()=>{document.querySelector('#submit-answer').disabled=!form.querySelector('input:checked');});
form.addEventListener('submit',event=>{event.preventDefault();const choice=form.querySelector('input:checked');if(choice)setStage(choice.value==='a'?'correct':'retry',true);});
function retry(){setStage('question');form.querySelector('input').focus({preventScroll:true});}
document.querySelector('#try-again').onclick=retry;document.querySelector('#practise-again').onclick=retry;
playButton.onclick=()=>{if(!audio.paused&&!audio.ended){generation++;audio.pause();report(tracks[stage].label+' paused.');}else startClip(audio.ended||failed);};
replayButton.onclick=()=>startClip(true);
muteButton.onclick=()=>{audio.muted=!audio.muted;report(audio.muted?'Narration muted.':'Narration unmuted.');};
audio.addEventListener('loadedmetadata',clock);audio.addEventListener('timeupdate',clock);
audio.addEventListener('ended',()=>{started=false;report(tracks[stage].label+' finished. Replay to listen again.');});
audio.addEventListener('error',()=>{if(!audio.error)return;failed=true;started=false;report('Audio unavailable. The full text is shown. Replay to try again.');});
function pauseOnExit(){generation++;if(!audio.paused){audio.pause();report('Narration paused. Resume when you are ready.');}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseOnExit();});window.addEventListener('pagehide',pauseOnExit);window.addEventListener('blur',pauseOnExit);
document.addEventListener('keydown',event=>{if(event.key==='Escape')pauseOnExit();});
controls();
