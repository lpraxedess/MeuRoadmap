(function(){
'use strict';

var PENDING_KEY='iam-hub-pending-view-v1';
var MODAL_ID='task-action-confirm';

function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

function removeModal(){var m=document.getElementById(MODAL_ID);if(m)m.remove();}

function openConfirm(taskId,index,label,description){
  removeModal();
  var modal=document.createElement('div');
  modal.id=MODAL_ID;
  modal.className='task-confirm-overlay';
  modal.innerHTML='<div class="task-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="task-confirm-title">'
    +'<div class="eyebrow">CONFIRMAR ETAPA</div>'
    +'<h2 id="task-confirm-title">Você concluiu esta atividade?</h2>'
    +'<p><strong>'+esc(label)+'</strong></p>'
    +'<p class="task-confirm-description">'+esc(description)+'</p>'
    +'<div class="task-confirm-actions"><button type="button" class="secondary" id="task-confirm-cancel">Ainda não</button><button type="button" class="primary" id="task-confirm-ok">Sim, marcar como concluído</button></div>'
    +'</div>';
  document.body.appendChild(modal);
  document.getElementById('task-confirm-cancel').onclick=removeModal;
  document.getElementById('task-confirm-ok').onclick=function(){
    var btn=document.querySelector('[data-stage-page="'+CSS.escape(taskId)+'"][data-index="'+index+'"]');
    if(btn && !btn.disabled && !btn.classList.contains('complete')) btn.click();
    removeModal();
  };
  modal.addEventListener('click',function(e){if(e.target===modal)removeModal();});
  var ok=document.getElementById('task-confirm-ok');if(ok)ok.focus();
}

function sectionStage(el){
  var section=el.closest('section');
  if(!section)return null;
  var h=section.querySelector('h2');
  var title=h?h.textContent.trim():'';
  if(title==='Estudar')return 0;
  if(title==='Praticar')return 1;
  if(title==='Validar')return 3;
  return null;
}

document.addEventListener('click',function(e){
  var line=e.target.closest&&e.target.closest('.learning-panel .detail-line');
  if(line){
    var page=line.closest('.task-page');
    var id=page&&page.querySelector('[data-stage-page]')&&page.querySelector('[data-stage-page]').getAttribute('data-stage-page');
    var index=sectionStage(line);
    if(id && index!==null){
      e.preventDefault();
      e.stopPropagation();
      var label=index===0?'Estudar':index===1?'Praticar':'Validar';
      openConfirm(id,index,label,line.textContent.trim());
      return;
    }
  }
},true);

function handleNavigation(){
  var pending=null;try{pending=localStorage.getItem(PENDING_KEY);}catch(e){}
  if(!pending)return;
  try{localStorage.removeItem(PENDING_KEY);}catch(e){}
  setTimeout(function(){
    var btn=document.querySelector('.nav-btn[data-view="'+pending+'"]');
    if(btn)btn.click();
  },180);
}

document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.nav-btn[data-view]');
  if(!b)return;
  var view=b.getAttribute('data-view');
  var onTask=!!b.closest('.task-page');
  if(!onTask)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  try{localStorage.setItem(PENDING_KEY,view);}catch(err){}
  window.location.reload();
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',handleNavigation);else handleNavigation();
})();
