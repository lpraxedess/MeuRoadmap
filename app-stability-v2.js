(function(){
  'use strict';

  var STATE_KEY='iam-career-hub-state-v9';
  var TASK_KEY='iam-hub-individual-tasks-v10';

  function read(key){try{return JSON.parse(localStorage.getItem(key)||'null')||{};}catch(e){return {};}}
  function roadmap(){return window.ROADMAP||{};}
  function tasks(){var out=[];(roadmap().phases||[]).forEach(function(p){(p.tasks||[]).forEach(function(t){out.push({task:t,phase:p});});});return out;}
  function find(id){var a=tasks();for(var i=0;i<a.length;i++)if(a[i].task.id===id)return a[i];return null;}
  function lens(t){
    var l=window.LEARNING&&window.LEARNING.enrich?window.LEARNING.enrich(t):{};
    if(t.type==='lab')return [1,1,1,1];
    if(t.type==='validate')return [1,1,1];
    return [(l.study||[]).length||1,(l.practice||[]).length||1,(l.recap||[]).length||4,(l.validate||[]).length||1];
  }
  function progress(id){
    var d=read(TASK_KEY),f=find(id),a=f?lens(f.task):[],n=0,total=0;
    a.forEach(function(c,s){total+=c;for(var i=0;i<c;i++)if(d[id+'|'+s+'|'+i]===true)n++;});
    return total?Math.round(n*100/total):0;
  }
  function careerProgress(){
    var d=read(TASK_KEY),n=0,total=0;
    tasks().forEach(function(x){lens(x.task).forEach(function(c,s){total+=c;for(var i=0;i<c;i++)if(d[x.task.id+'|'+s+'|'+i]===true)n++;});});
    return total?Math.round(n*100/total):0;
  }
  function escapeHtml(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

  function injectStyle(){
    if(document.getElementById('app-stability-v2-style'))return;
    var s=document.createElement('style');s.id='app-stability-v2-style';s.textContent=''+
      '.sidebar-foot{display:flex!important;justify-content:space-between;gap:8px}'+
      '.today-stability{margin:0 0 16px;padding:12px 14px;border:1px solid rgba(255,255,255,.09);border-radius:12px;background:rgba(255,255,255,.025)}'+
      '.today-stability-head{display:flex;justify-content:space-between;gap:12px;margin-bottom:8px;font-size:.82rem}'+
      '.today-stability-head span{opacity:.65}'+
      '.today-stability-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}'+
      '.today-stability-grid div{display:flex;flex-direction:column;gap:3px}'+
      '.today-stability-grid b{font-size:.74rem}.today-stability-grid small{font-size:.7rem;opacity:.7;line-height:1.35}'+
      '.today-stability .bar{height:5px!important;margin-top:8px}.today-stability .bar i{display:block;height:100%}'+
      '.today-stability-actions{margin-top:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:.72rem;opacity:.75}'+
      '@media(max-width:760px){.today-stability-grid{grid-template-columns:1fr}}';
    document.head.appendChild(s);
  }

  function fixRoutine(){
    document.querySelectorAll('.sidebar-foot').forEach(function(el){
      el.innerHTML='<span>3h estudo</span><span>1h inglês</span>';
    });
    document.querySelectorAll('.settings .setting').forEach(function(el){
      var label=el.querySelector('span'),value=el.querySelector('b');
      if(label&&value&&label.textContent.trim()==='Rotina')value.textContent='3h estudo + 1h inglês';
    });
  }

  function cleanDuplicates(){
    var ids={};
    ['today-career-progress','today-resilience-progress','roadmap-execution-panel','today-resilience-style'].forEach(function(id){
      var nodes=document.querySelectorAll('#'+id);for(var i=1;i<nodes.length;i++)nodes[i].remove();
    });
    document.querySelectorAll('.today-career-progress').forEach(function(n){var k='today-career';if(ids[k])n.remove();else ids[k]=true;});
  }

  function ensureToday(){
    var focus=document.querySelector('.today-focus');
    if(!focus)return;
    var button=focus.querySelector('[data-page-task]');
    var id=button&&button.getAttribute('data-page-task');
    var f=id?find(id):null;
    if(!f)return;

    var pct=progress(id),career=careerProgress();
    var existing=document.getElementById('today-stability');
    if(!existing){
      existing=document.createElement('div');existing.id='today-stability';existing.className='today-stability';
      var anchor=focus.querySelector('.focus-actions')||focus.querySelector('h2');
      if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(existing,anchor.nextSibling);else focus.appendChild(existing);
    }
    existing.innerHTML='<div class="today-stability-head"><strong>Execução da competência</strong><span>3h técnicas + 1h inglês</span></div>'+
      '<div class="today-stability-grid">'+
      '<div><b>Progresso</b><small>'+pct+'% das etapas concluídas</small></div>'+
      '<div><b>Critério</b><small>Conhecer → Executar → Troubleshoot → Validar</small></div>'+
      '<div><b>Carreira</b><small>'+career+'% do percurso validado</small></div>'+
      '</div><div class="bar"><i style="width:'+pct+'%"></i></div>'+
      '<div class="today-stability-actions"><span>Não avance apenas por leitura: produza evidência.</span><span>'+escapeHtml(f.phase.name||'')+'</span></div>';

    fixRoutine();
    cleanDuplicates();
  }

  function run(){
    injectStyle();
    fixRoutine();
    if(document.querySelector('.today-focus'))ensureToday();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  var app=document.getElementById('app');
  if(app){var timer;new MutationObserver(function(){clearTimeout(timer);timer=setTimeout(run,100);}).observe(app,{childList:true,subtree:true});}
  window.addEventListener('storage',function(e){if(e.key===TASK_KEY||e.key===STATE_KEY)setTimeout(run,50);});
})();
