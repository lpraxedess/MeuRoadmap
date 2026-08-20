(function(){
'use strict';
var KEY='iam-career-hub-state-v9';
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{};}catch(e){return {};}}
function write(s){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
function esc(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');}
function update(){
 var hero=document.querySelector('.progress-hero');if(!hero)return;
 var s=read();s.english=s.english||{minutes:0,sessions:0};if(typeof s.english.days!=='number')s.english.days=Number(s.english.sessions||0);
 var old=document.querySelector('.progress-english-panel');if(old)old.remove();
 var panel=document.createElement('section');panel.className='panel english-panel progress-english-panel';
 panel.innerHTML='<div class="english-main"><div><h3>Inglês técnico</h3><p><b class="english-minutes">'+Number(s.english.minutes||0)+'</b> minutos · <b class="english-sessions">'+Number(s.english.sessions||0)+'</b> sessões</p></div><button class="primary" id="english60Patch">+ 60 min</button></div><div class="english-days"><span>Dias estudados</span><div><button class="english-day-minus" aria-label="Diminuir dias estudados">−</button><b class="english-day-value">'+Number(s.english.days||0)+'</b><button class="english-day-plus" aria-label="Aumentar dias estudados">+</button></div></div>';
 hero.parentNode.insertBefore(panel,hero.nextSibling);
 var add=panel.querySelector('#english60Patch');add.onclick=function(){s.english.minutes=Number(s.english.minutes||0)+60;s.english.sessions=Number(s.english.sessions||0)+1;s.english.days=Number(s.english.days||0)+1;write(s);update();};
 panel.querySelector('.english-day-minus').onclick=function(){s.english.days=Math.max(0,Number(s.english.days||0)-1);write(s);update();};
 panel.querySelector('.english-day-plus').onclick=function(){s.english.days=Number(s.english.days||0)+1;write(s);update();};
}
function init(){if(!document.getElementById('progress-ui-patch-style-v1')){var st=document.createElement('style');st.id='progress-ui-patch-style-v1';st.textContent='.progress-hero{margin-bottom:16px}.progress-english-panel{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:0}.progress-english-panel .english-main{display:flex;align-items:center;gap:22px;min-width:0}.progress-english-panel h3{margin:0 0 5px}.progress-english-panel p{margin:0;opacity:.72}.english-days{display:flex;align-items:center;gap:12px;white-space:nowrap}.english-days>span{opacity:.7;font-size:.9rem}.english-days>div{display:flex;align-items:center;gap:8px}.english-days button{width:32px;height:32px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:transparent;color:inherit;font-size:20px;cursor:pointer}.english-days b{min-width:28px;text-align:center}@media(max-width:700px){.progress-english-panel{align-items:stretch;flex-direction:column}.progress-english-panel .english-main{justify-content:space-between}.english-days{justify-content:space-between}}';document.head.appendChild(st);}update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
var app=document.getElementById('app');if(app)new MutationObserver(function(){clearTimeout(window.__progressPatchTimer);window.__progressPatchTimer=setTimeout(init,60);}).observe(app,{childList:true,subtree:true});
})();