import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
function literal(text,pattern){const m=text.match(pattern);if(!m)throw Error('Source data not found');return vm.runInNewContext('('+m[1]+')',Object.create(null),{timeout:100});}
const ppeSource=read('ppe-check/source.html'),hazardSource=read('activity/app.js');
const data={
 ppe:literal(ppeSource,/const items=(\[[\s\S]*?\n\]);/),
 icons:literal(ppeSource,/const gearArtwork=(\{[\s\S]*?\n\});/),
 hazards:literal(hazardSource,/const hazards = (\[[\s\S]*?\n\]);/),
 intro:[
  {at:2.23,text:'Every warehouse contains potential hazards. Some are immediately obvious; others are easy to overlook during a busy shift.'},
  {at:11.13,text:'Before starting work, take a moment to consider your surroundings.'},
  {at:15.29,text:'Recognising hazards is the first step towards preventing accidents.'}
 ],
 question:{
  prompt:'Why does health and safety matter in a warehouse?',
  choices:['It protects people, helps everyone meet their responsibilities and reduces disruption to the business.','It is mainly about avoiding damage to goods and equipment.','It is mainly the responsibility of managers.'],
  correct:0,
  why:'Health and safety protects people, helps employers and employees meet their responsibilities, and reduces disruption and costs. Whatever your role, your choices can make a difference.',
  retry:'Think about the people working in the warehouse, the responsibilities we all share, and the effect an accident can have on the business. Have another go.'
 }
};
fs.mkdirSync(path.join(root,'inline/v01'),{recursive:true});
fs.writeFileSync(path.join(root,'inline/v01/source-data.js'),'window.UKWA_SOURCE = '+JSON.stringify(data,null,2)+';\n');
const assets=['assets/ppe-check/poster.png','activity/assets/warehouse.svg','guide-question/assets/guide-expressions-v01.png','shift-intro/assets/warehouse-hero.jpg','assets/audio/U00_Intro_Female_UK_v01.mp3','assets/audio/U01_Q01_Question_Female_UK_v01.mp3','assets/audio/U01_Q01_Correct_Female_UK_v01.mp3','assets/audio/U01_Q01_Retry_Female_UK_v01.mp3'];
const record={build:'ukwa-inline-20261113-v01',purpose:'Four on-page V2 activities; no popup or browser Back journey.',sourceData:'Existing approved PPE v01, hazard v11, guide v02 and introduction v02; artwork and narration unchanged.',assets:assets.map(p=>({path:p,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex')}))};
fs.writeFileSync(path.join(root,'inline/v01/source-record.json'),JSON.stringify(record,null,2)+'\n');
console.log('Built inline source data: '+data.ppe.length+' PPE checks, '+data.hazards.length+' hazards; '+assets.length+' unchanged assets.');
