(function(){
'use strict';
var PENDING_KEY='iam-hub-pending-view-v1';
var TASKS_KEY='iam-hub-individual-tasks-v1';
var MODAL_ID='task-action-confirm';
var individual={};
try{individual=JSON.parse(localStorage.getItem(TASKS_KEY)||'{}')||{};}catch(e){individual={};}
function save(){try{localStorage.setItem(TASKS_KEY,JSON.stringify(individual));}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;');}
function removeModal(){var m=document.getElementById(MODAL_ID);if(m)m.remove();}
function css(s){return window.CSS&&CSS.escape?CSS.escape(s):String(s).replace(/[^a-zA-Z0-9_-]/g,'\\$&');}
function stageName(i){return ['Estudar','Praticar','Recapitular','Validar'][i]||'Etapa';}
function stageIndex(line){var sec=line.closest('section');if(!sec)return null;var h=sec.querySelector('h2');var t=h?h.textContent.trim():'';return ['Estudar','Praticar','Recapitular','Validar'].indexOf(t);}
function taskId(line){var page=line.closest('.task-page');var anchor=page&&page.querySelector('[data-stage-page]');return anchor?anchor.getAttribute('data-stage-page'):null;}
function key(id,i,n){return id+'::'+i+'::'+n;}
function isDone(id,i,n){return !!individual[key(id,i,n)];}
function mark(id,i,n){individual[key(id,i,n)]=true;save();}
function decorate(){
  document.querySelectorAll('.learning-panel section').forEach(function(sec){
    var h=sec.querySelector('h2');if(!h)return;
    var i=['Estudar','Praticar','Recapitular','Validar'].indexOf(h.textContent.trim());if(i<0)return;
    var id=taskId(sec.querySelector('.detail-line'));if(!id)return;
    Array.from(sec.querySelectorAll('.detail-line')).forEach(function(line,n){
      var done=isDone(id,i,n);
      line.classList.toggle('individual-task-done',done);
      line.setAttribute('data-individual-task',key(id,i,n));
      if(done&&!line.querySelector('.individual-task-check')){
        var check=document.createElement('span');check.className='individual-task-check';check.textContent='✓';line.insertBefore(check,line.firstChild);
      }
    });
  });
}
function allDone(id,i){
  var page=document.querySelector('.task-page');if(!page)return false;
  var target=null;
  page.querySelectorAll('section').forEach(function(sec){var h=sec.querySelector('h2');if(h&&h.textContent.trim()===stageName(i))target=sec;});
  if(!target)return false;
  var lines=Array.from(target.querySelectorAll('.detail-line'));if(!lines.length)return false;
  return lines.every(function(_,n){return isDone(id,i,n);});
}
function stageButton(id,i){return document.querySelector('[data-stage-page="'+css(id)+'"][data-index="'+i+'"]');}
function maybeCompleteStage(id,i){
  if(!allDone(id,i))return;
  var b=stageButton(id,i);if(!b||b.disabled||b.classList.contains('complete'))return;
  b.click();
}
function openConfirm(id,i,n,line){
  removeModal();
  var modal=document.createElement('div');modal.id=MODAL_ID;modal.className='task-confirm-overlay';
  modal.innerHTML='<div class="task-confirm-dialog" role="dialog" aria-modal="true"><div class="eyebrow">CONFIRMAR ATIVIDADE</div><h2>Você concluiu esta atividade?</h2><p><strong>'+esc(stageName(i))+'</strong></p><p class="task-confirm-description">'+esc(line.textContent.trim())+'</p><div class="task-confirm-actions"><button type="button" class="secondary" id="task-confirm-cancel">Ainda não</button><button type="button" class="primary" id="task-confirm-ok">Sim, marcar como concluído</button></div></div>';
  document.body.appendChild(modal);
  document.getElementById('task-confirm-cancel').onclick=removeModal;
  document.getElementById('task-confirm-ok').onclick=function(){
    mark(id,i,n);removeModal();decorate();
    setTimeout(function(){maybeCompleteStage(id,i);},120);
  };
  modal.addEventListener('click',function(e){if(e.target===modal)removeModal();});
  var ok=document.getElementById('task-confirm-ok');if(ok)ok.focus();
}
(function(){
  if(document.getElementById('task-interaction-patch-style'))return;
  var s=document.createElement('style');s.id='task-interaction-patch-style';
  s.textContent='.task-confirm-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(3,7,18,.72);backdrop-filter:blur(5px)}.task-confirm-dialog{width:min(560px,100%);padding:28px;border:1px solid rgba(148,163,184,.18);border-radius:18px;background:#111827;box-shadow:0 24px 80px rgba(0,0,0,.42)}.task-confirm-dialog h2{margin:8px 0 12px}.task-confirm-dialog p{line-height:1.55}.task-confirm-description{padding:14px 16px;border-radius:12px;background:rgba(71,85,105,.22);color:#cbd5e1}.task-confirm-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:22px}.task-confirm-actions button{min-width:150px}.learning-panel .detail-line{cursor:pointer;transition:opacity .15s,transform .15s}.learning-panel .detail-line:hover{transform:translateX(2px)}.learning-panel .detail-line.individual-task-done{opacity:.58;text-decoration:line-through}.individual-task-check{display:inline-flex;width:20px;height:20px;align-items:center;justify-content:center;border-radius:50%;margin-right:8px;background:rgba(34,197,94,.18);color:#86efac;font-weight:700;text-decoration:none}@media(max-width:640px){.task-confirm-actions{flex-direction:column}.task-confirm-actions button{width:100%}}';
  document.head.appendChild(s);
})();
document.addEventListener('click',function(e){
  var line=e.target.closest&&e.target.closest('.learning-panel .detail-line');if(!line)return;
  var id=taskId(line),i=stageIndex(line);if(!id||i<0)return;
  var sec=line.closest('section');var lines=Array.from(sec.querySelectorAll('.detail-line'));var n=lines.indexOf(line);if(n<0)return;
  e.preventDefault();e.stopImmediatePropagation();
  if(isDone(id,i,n))return;
  openConfirm(id,i,n,line);
},true);
var observer=new MutationObserver(function(){decorate();});
function start(){decorate();observer.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
function handleNavigation(){var pending=null;try{pending=localStorage.getItem(PENDING_KEY);}catch(e){}if(!pending)return;try{localStorage.removeItem(PENDING_KEY);}catch(e){}setTimeout(function(){var b=document.querySelector('.nav-btn[data-view="'+pending+'"]');if(b)b.click();},180);}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.nav-btn[data-view]');if(!b)return;if(!b.closest('.task-page'))return;var view=b.getAttribute('data-view');try{localStorage.setItem(PENDING_KEY,view);}catch(err){}},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',handleNavigation);else handleNavigation();
})();
