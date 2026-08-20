(function(){
'use strict';
var KEY='iam-career-hub-state-v9';
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{};}catch(e){return {};}}
function write(s){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
function removeDuplicateEnglish(){
 document.querySelectorAll('section,article,div').forEach(function(el){
  if(el.classList.contains('progress-english-panel'))return;
  var t=(el.textContent||'').trim();
  if(t.indexOf('Inglês técnico')!==-1 && t.length<500){
   var parent=el.parentElement;
   if(parent && parent.classList.contains('progress-english-panel'))return;
   if(el.querySelector && el.querySelector('.english-days'))return;
   el.remove();
  }
 });
}
function update(){
 var hero=document.querySelector('.progress-hero');if(!hero)return;
 removeDuplicateEnglish();
 var s=read();s.english=s.english||{minutes:0,sessions:0,days:0};
 if(typeof s.english.days!=='number')s.english.days=0;
 var old=document.querySelector('.progress-english-panel');if(old)old.remove();
 var panel=document.createElement('section');panel.className='panel english-panel progress-english-panel';
 panel.innerHTML='<div class="english-days"><span>Dias estudados</span><div><button class="english-day-minus" aria-label="Diminuir dias estudados">−</button><b class="english-day-value">'+Number(s.english.days||0)+'</b><button class="english-day-plus" aria-label="Aumentar dias estudados">+</button></div></div>';
 hero.parentNode.insertBefore(panel,hero.nextSibling);
 panel.querySelector('.english-day-minus').onclick=function(e){e.preventDefault();e.stopPropagation();s.english.days=Math.max(0,Number(s.english.days||0)-1);write(s);update();};
 panel.querySelector('.english-day-plus').onclick=function(e){e.preventDefault();e.stopPropagation();s.english.days=Number(s.english.days||0)+1;write(s);update();};
}
function init(){
 if(!document.getElementById('progress-ui-patch-style-v2')){var st=document.createElement('style');st.id='progress-ui-patch-style-v2';st.textContent='.progress-english-panel{display:flex;align-items:center;justify-content:flex-start;margin:0 0 16px;padding:14px 18px}.progress-english-panel .english-days{display:flex;align-items:center;gap:12px}.english-days>span{opacity:.7;font-size:.9rem}.english-days>div{display:flex;align-items:center;gap:8px}.english-days button{width:32px;height:32px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:transparent;color:inherit;font-size:20px;cursor:pointer}.english-days b{min-width:28px;text-align:center}@media(max-width:700px){.progress-english-panel{align-items:stretch}}';document.head.appendChild(st);}
 update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
var app=document.getElementById('app');if(app)new MutationObserver(function(){clearTimeout(window.__progressPatchTimer);window.__progressPatchTimer=setTimeout(init,80);}).observe(app,{childList:true,subtree:true});
})();