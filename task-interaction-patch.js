(function(){
'use strict';
var PENDING_KEY='iam-hub-pending-view-v1';
var MODAL_ID='task-action-confirm';

(function(){
  if(document.getElementById('task-interaction-patch-style'))return;
  var s=document.createElement('style');s.id='task-interaction-patch-style';
  s.textContent='.task-confirm-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(3,7,18,.72);backdrop-filter:blur(5px)}.task-confirm-dialog{width:min(560px,100%);padding:28px;border:1px solid rgba(148,163,184,.18);border-radius:18px;background:#111827;box-shadow:0 24px 80px rgba(0,0,0,.42)}.task-confirm-dialog h2{margin:8px 0 12px}.task-confirm-dialog p{line-height:1.55}.task-confirm-description{padding:14px 16px;border-radius:12px;background:rgba(71,85,105,.22);color:#cbd5e1}.task-confirm-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:22px}.task-confirm-actions button{min-width:150px}@media(max-width:640px){.task-confirm-actions{flex-direction:column}.task-confirm-actions button{width:100%}}';
  document.head.appendChild(s);
})();

function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;');}
function removeModal(){var m=document.getElementById(MODAL_ID);if(m)m.remove();}

function getTaskButton(taskId,index){
  return document.querySelector('[data-stage-page="'+CSS.escape(taskId)+'"][data-index="'+index+'"]');
}

function getTaskState(taskId,index){
  var btn=getTaskButton(taskId,index);
  return !!(btn&&(btn.classList.contains('complete')||btn.getAttribute('aria-pressed')==='true'||btn.getAttribute('data-complete')==='true'));
}

function countTaskLines(section){
  return section?section.querySelectorAll('.detail-line').length:0;
}

function openConfirm(taskId,index,description){
  removeModal();
  var stageName=['Estudar','Praticar','Recapitular','Validar'][index]||'Etapa';
  var modal=document.createElement('div');modal.id=MODAL_ID;modal.className='task-confirm-overlay';
  modal.innerHTML='<div class="task-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="task-confirm-title"><div class="eyebrow">CONFIRMAR ATIVIDADE</div><h2 id="task-confirm-title">Você concluiu esta atividade?</h2><p><strong>'+esc(stageName)+'</strong></p><p class="task-confirm-description">'+esc(description)+'</p><div class="task-confirm-actions"><button type="button" class="secondary" id="task-confirm-cancel">Ainda não</button><button type="button" class="primary" id="task-confirm-ok">Sim, marcar como concluído</button></div></div>';
  document.body.appendChild(modal);
  document.getElementById('task-confirm-cancel').onclick=removeModal;
  document.getElementById('task-confirm-ok').onclick=function(){
    var btn=getTaskButton(taskId,index);
    if(btn&&!getTaskState(taskId,index))btn.click();
    removeModal();
    setTimeout(function(){refreshStageCompletion(taskId,index);},80);
  };
  modal.addEventListener('click',function(e){if(e.target===modal)removeModal();});
  var ok=document.getElementById('task-confirm-ok');if(ok)ok.focus();
}

function sectionStage(el){
  var section=el.closest('section');if(!section)return null;
  var h=section.querySelector('h2');var title=h?h.textContent.trim():'';
  if(title==='Estudar')return 0;
  if(title==='Praticar')return 1;
  if(title==='Recapitular')return 2;
  if(title==='Validar')return 3;
  return null;
}

/*
 * Cada linha é uma tarefa independente.
 * A etapa só é considerada concluída quando TODAS as linhas daquela seção
 * tiverem sido concluídas. Uma tarefa individual jamais conclui a etapa inteira.
 */
function refreshStageCompletion(taskId,index){
  var btn=getTaskButton(taskId,index);if(!btn)return;
  var page=btn.closest('.task-page');if(!page)return;
  var sections=page.querySelectorAll('section');
  var target=null;
  sections.forEach(function(section){if(sectionStage(section)===index)target=section;});
  if(!target)return;
  var lines=Array.from(target.querySelectorAll('.detail-line'));
  if(!lines.length)return;
  var done=lines.every(function(line){return line.classList.contains('task-complete')||line.getAttribute('data-complete')==='true'||line.querySelector('.task-check.complete,.complete');});
  if(done&&!getTaskState(taskId,index))btn.click();
}

document.addEventListener('click',function(e){
  var line=e.target.closest&&e.target.closest('.learning-panel .detail-line');
  if(!line)return;
  var page=line.closest('.task-page');
  var anchor=page&&page.querySelector('[data-stage-page]');
  var id=anchor&&anchor.getAttribute('data-stage-page');
  var index=sectionStage(line);
  if(!id||index===null)return;
  e.preventDefault();e.stopPropagation();
  openConfirm(id,index,line.textContent.trim());
},true);

function handleNavigation(){
  var pending=null;try{pending=localStorage.getItem(PENDING_KEY);}catch(e){}
  if(!pending)return;
  try{localStorage.removeItem(PENDING_KEY);}catch(e){}
  setTimeout(function(){var btn=document.querySelector('.nav-btn[data-view="'+pending+'"]');if(btn)btn.click();},180);
}

document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.nav-btn[data-view]');if(!b)return;
  var view=b.getAttribute('data-view');if(!b.closest('.task-page'))return;
  e.preventDefault();e.stopImmediatePropagation();
  try{localStorage.setItem(PENDING_KEY,view);}catch(err){}
  window.location.reload();
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',handleNavigation);else handleNavigation();
})();
