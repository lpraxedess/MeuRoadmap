(function(){'use strict';
var KEY='iam-career-hub-state-v9';
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}}
function isToday(){return !!document.querySelector('.today-focus') || /TODAY|Seu próximo passo/.test(document.body.innerText||'');}
function compact(){
  if(!isToday())return;
  var f=document.querySelector('.today-focus');
  if(f){
    var meta=f.querySelector('.focus-meta');
    if(meta)meta.style.display='none';
    var p=f.querySelector('.bar'); if(p)p.style.display='none';
    var a=f.querySelector('.focus-actions'); if(a)a.style.marginTop='14px';
  }
  document.querySelectorAll('.today-grid .panel').forEach(function(p){
    if(p.querySelector('.mini-stats'))p.querySelector('.mini-stats').style.display='none';
  });
}
function style(){
 if(document.getElementById('ui-final-v1'))return;
 var s=document.createElement('style');s.id='ui-final-v1';s.textContent=`
:root{color-scheme:dark!important;--bg:#080b12;--panel:#0f141d;--panel2:#121925;--text:#e7edf7;--muted:#8d99aa;--line:#202a38;--accent:#7aa2ff}
html,body{background:#080b12!important;color:#e7edf7!important}
body,.app-shell,main,.sidebar,.panel,.phase-card,.today-focus,.task-page,.task-page-side{background-color:#080b12!important;color:#e7edf7!important}
.panel,.phase-card,.today-focus,.task-page-side .panel{background:#0f141d!important;border-color:#202a38!important}
.sidebar{background:#090d14!important;border-right:1px solid #202a38!important}
button{color:#e7edf7!important}.nav-btn{background:transparent!important}.nav-btn:hover,.nav-btn.active{background:#151d2a!important}
.muted,.top p,.task small,.panel small{color:#8d99aa!important}
.today-focus{padding:22px!important}.today-focus h2{font-size:1.35rem!important;margin-bottom:4px!important}
.today-grid{gap:14px!important}.today-grid .panel{padding:16px!important}.today-grid .panel h3{margin-bottom:3px!important}
.today-grid .task{padding:11px 0!important}
.today-focus-progress-box,.today-career-progress,.today-task-progress{display:none!important}
.today-focus .focus-meta,.today-focus>.bar,.today-grid .mini-stats{display:none!important}
`;
 document.head.appendChild(s);
}
function repair(){style();compact();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair);else repair();
var app=document.getElementById('app');if(app)new MutationObserver(function(){clearTimeout(window.__uiFinal);window.__uiFinal=setTimeout(repair,30);}).observe(app,{childList:true,subtree:true});
window.addEventListener('pageshow',repair);window.addEventListener('popstate',function(){setTimeout(repair,20);});
})();
