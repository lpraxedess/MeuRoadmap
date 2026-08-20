(function(){
'use strict';
var KEY='iam-career-hub-state-v9';
function readState(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{};}catch(e){return {};}}
function update(){
  var focus=document.querySelector('.today-focus');
  if(!focus)return;
  var meta=focus.querySelector('.focus-meta');
  var pct=meta&&((meta.textContent||'').match(/(\d+)%\s*validado/)||[])[1];
  var grid=document.querySelector('.today-grid');
  var progressPanel=grid&&grid.querySelectorAll('.panel')[1];
  var num=progressPanel&&progressPanel.querySelector('.big-number');
  var careerBar=progressPanel&&progressPanel.querySelector('.bar');
  var title=focus.querySelector('.focus-title');
  var box=focus.querySelector('.today-focus-progress-box');
  if(!box){box=document.createElement('div');box.className='today-focus-progress-box';}
  box.innerHTML='<div class="today-focus-progress-label"><span>Progresso da competência</span><b>'+(pct||'0')+'%</b></div><div class="bar today-focus-progress"><i style="width:'+(pct||0)+'%"></i></div>';
  if(title&&title.parentNode)title.parentNode.insertBefore(box,title.nextSibling);
  if(meta)meta.remove();
  if(progressPanel)progressPanel.remove();
  if(grid){grid.querySelectorAll('.task').forEach(function(row){var small=row.querySelector('small');if(!small)return;var m=(small.textContent||'').match(/(\d+)%\s*validado/);if(!m)return;small.textContent='';var bar=row.querySelector('.today-task-progress');if(!bar){bar=document.createElement('div');bar.className='bar today-task-progress';bar.innerHTML='<i></i>';small.parentNode.appendChild(bar);}bar.querySelector('i').style.width=m[1]+'%';});}
  renderCompleted();
}
function renderCompleted(){var grid=document.querySelector('.today-grid');if(!grid||!window.ROADMAP)return;var old=document.querySelector('.today-completed');if(old)old.remove();var st=readState(),done=st.done||{},items=[];(window.ROADMAP.phases||[]).forEach(function(p){(p.tasks||[]).forEach(function(t){if(done[t.id])items.push({t:t,p:p});});});if(!items.length)return;var sec=document.createElement('section');sec.className='today-completed panel';var html='<div class="panel-head"><div><h3>Módulos concluídos</h3><small>Você pode revisar qualquer módulo já finalizado.</small></div><span>'+items.length+'</span></div><div class="today-completed-list">';items.forEach(function(x){html+='<div class="task done"><div><b>✓ '+esc(x.t.name)+'</b><small>'+x.t.mins+' min · concluído</small></div><div class="task-actions"><button class="icon-btn" data-page-task="'+esc(x.t.id)+'">Revisar</button></div></div>';});html+='</div>';sec.innerHTML=html;grid.parentNode.insertBefore(sec,grid.nextSibling);}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;');}
function init(){if(!document.getElementById('today-ui-patch-style-v6')){var s=document.createElement('style');s.id='today-ui-patch-style-v6';s.textContent='.today-focus-progress-box{margin:10px 0 16px}.today-focus-progress-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:.82rem}.today-focus-progress-label span{opacity:.7}.today-focus-progress-label b{font-size:1rem}.today-focus-progress{height:5px!important;margin:0!important;width:100%;overflow:hidden}.today-focus-progress i{display:block;height:100%;transition:width .25s ease}.today-grid{grid-template-columns:1fr!important}.today-grid .task{min-height:92px;padding:18px 20px;align-items:center;box-sizing:border-box}.today-grid .task>div:first-child{min-width:0;flex:1}.today-grid .task small{display:block;margin-top:7px}.today-task-progress{height:5px!important;margin-top:9px!important;width:min(260px,100%);overflow:hidden}.today-task-progress i{display:block;height:100%;transition:width .25s ease}.today-grid .task-actions{flex-shrink:0;margin-left:18px}.today-grid .panel{overflow:hidden}.today-completed{margin-top:18px}.today-completed-list{display:grid;gap:8px}.today-completed .task{margin-top:8px}.today-completed .task small{opacity:.7}.today-completed .panel-head>span{font-weight:700;opacity:.7}@media(max-width:760px){.today-completed .task{padding:15px}}';document.head.appendChild(s);}update();}
var timer;function schedule(){clearTimeout(timer);timer=setTimeout(init,50)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();var app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
})();
