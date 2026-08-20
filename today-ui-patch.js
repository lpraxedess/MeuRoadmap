(function(){
'use strict';
var KEY='iam-career-hub-state-v9';
function readState(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{};}catch(e){return {};}}
function update(){
  document.querySelectorAll('.today-focus .focus-meta').forEach(function(el){
    var text=el.textContent||'';var pct=text.match(/(\d+)%\s*validado/);
    if(pct){el.textContent='';var bar=el.parentNode.querySelector('.today-focus-progress');if(!bar){bar=document.createElement('div');bar.className='bar today-focus-progress';bar.innerHTML='<i></i>';el.parentNode.appendChild(bar);}var i=bar.querySelector('i');if(i)i.style.width=pct[1]+'%';}
  });
  document.querySelectorAll('.today-focus>.bar').forEach(function(el){if(!el.classList.contains('today-focus-progress'))el.remove();});
  document.querySelectorAll('.today-grid .task').forEach(function(row){
    var small=row.querySelector('small');if(!small)return;
    var text=small.textContent||'';var pct=text.match(/(\d+)%\s*validado/);if(!pct)return;
    small.textContent='';
    var bar=row.querySelector('.today-task-progress');
    if(!bar){bar=document.createElement('div');bar.className='bar today-task-progress';bar.innerHTML='<i></i>';small.parentNode.appendChild(bar);}
    var i=bar.querySelector('i');if(i)i.style.width=pct[1]+'%';
  });
  unifyProgress();
  renderCompleted();
}
function unifyProgress(){
  var focus=document.querySelector('.today-focus');var grid=document.querySelector('.today-grid');if(!focus||!grid)return;
  var panels=grid.querySelectorAll('.panel');if(panels.length<2)return;
  var progress=panels[1];
  var old=focus.querySelector('.today-overall-progress');if(old)old.remove();
  var num=progress.querySelector('.big-number');var bar=progress.querySelector('.bar');
  var box=document.createElement('div');box.className='today-overall-progress';
  box.innerHTML='<div class="today-overall-label"><span>Progresso da carreira</span><b>'+(num?num.textContent.trim():'0%')+'</b></div>';
  if(bar)box.appendChild(bar.cloneNode(true));
  var label=focus.querySelector('.focus-label');
  if(label)focus.insertBefore(box,label);else focus.insertBefore(box,focus.firstChild);
  progress.remove();
}
function renderCompleted(){
  var grid=document.querySelector('.today-grid');if(!grid||!window.ROADMAP)return;
  var old=document.querySelector('.today-completed');if(old)old.remove();
  var st=readState(),done=st.done||{},items=[];
  (window.ROADMAP.phases||[]).forEach(function(p){(p.tasks||[]).forEach(function(t){if(done[t.id])items.push({t:t,p:p});});});
  if(!items.length)return;
  var sec=document.createElement('section');sec.className='today-completed panel';
  var html='<div class="panel-head"><div><h3>Módulos concluídos</h3><small>Você pode revisar qualquer módulo já finalizado.</small></div><span>'+items.length+'</span></div><div class="today-completed-list">';
  items.forEach(function(x){html+='<div class="task done"><div><b>✓ '+esc(x.t.name)+'</b><small>'+x.t.mins+' min · concluído</small></div><div class="task-actions"><button class="icon-btn" data-page-task="'+esc(x.t.id)+'">Revisar</button></div></div>';});
  html+='</div>';sec.innerHTML=html;grid.parentNode.insertBefore(sec,grid.nextSibling);
}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;');}
function init(){
  if(!document.getElementById('today-ui-patch-style-v4')){
    var s=document.createElement('style');s.id='today-ui-patch-style-v4';
    s.textContent='.today-focus .focus-meta{margin-bottom:8px;min-height:5px}.today-focus-progress{height:5px!important;margin:0 0 18px!important;width:100%;overflow:hidden}.today-grid{grid-template-columns:1fr!important}.today-grid .task{min-height:92px;padding:18px 20px;align-items:center;box-sizing:border-box}.today-grid .task>div:first-child{min-width:0;flex:1}.today-grid .task small{display:block;margin-top:7px}.today-task-progress{height:5px!important;margin-top:9px!important;width:min(260px,100%);overflow:hidden}.today-task-progress i,.today-focus-progress i{display:block;height:100%;transition:width .25s ease}.today-grid .task-actions{flex-shrink:0;margin-left:18px}.today-grid .panel{overflow:hidden}.today-grid .panel-head{margin-bottom:14px}.today-overall-progress{margin:0 0 20px;padding:0 0 16px;border-bottom:1px solid rgba(255,255,255,.08)}.today-overall-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.today-overall-label span{font-size:.82rem;opacity:.7}.today-overall-label b{font-size:1rem}.today-overall-progress .bar{margin:0!important}.today-completed{margin-top:18px}.today-completed .task{margin-top:8px}.today-completed .task small{opacity:.7}.today-completed-list{display:grid;gap:8px}.today-completed .panel-head>span{font-weight:700;opacity:.7}@media(max-width:760px){.today-overall-progress{margin-bottom:14px}.today-completed .task{padding:15px}}';
    document.head.appendChild(s);
  }
  update();
}
var timer;function schedule(){clearTimeout(timer);timer=setTimeout(init,50)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
var app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
})();
