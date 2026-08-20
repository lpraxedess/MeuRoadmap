(function(){
'use strict';
var KEY='iam-career-hub-state-v8';
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{};}catch(e){return {};}}
function write(s){localStorage.setItem(KEY,JSON.stringify(s));}
function taskById(id){var phases=(window.ROADMAP&&window.ROADMAP.phases)||[];for(var i=0;i<phases.length;i++){var tasks=phases[i].tasks||[];for(var j=0;j<tasks.length;j++)if(tasks[j].id===id)return tasks[j];}return null;}
function stages(t){if(t.type==='lab')return ['Estudar','Executar','Troubleshoot','Evidenciar'];if(t.type==='validate')return ['Resolver cenário','Explicar sem consulta','Registrar validação'];return ['Estudar','Praticar','Recapitular','Validar'];}
function requiresEvidence(t){return t&&(t.type==='lab'||t.type==='validate');}
function normalize(){var s=read(),changed=false;s.stageDone=s.stageDone&&typeof s.stageDone==='object'?s.stageDone:{};s.done=s.done&&typeof s.done==='object'?s.done:{};s.evidence=s.evidence&&typeof s.evidence==='object'?s.evidence:{};s.english=s.english&&typeof s.english==='object'?s.english:{minutes:0,sessions:0};s.history=Array.isArray(s.history)?s.history:[];var phases=(window.ROADMAP&&window.ROADMAP.phases)||[];for(var i=0;i<phases.length;i++){var tasks=phases[i].tasks||[];for(var j=0;j<tasks.length;j++){var t=tasks[j],a=s.stageDone[t.id]||[],done=s.done[t.id];if(done&&requiresEvidence(t)&&!String(s.evidence[t.id]||'').trim()){delete s.done[t.id];var n=stages(t).length;a[n-1]=false;s.stageDone[t.id]=a;changed=true;}}}if(changed)write(s);}
function evidenceFor(id){return String(read().evidence&&read().evidence[id]||'').trim();}
function guardStage(e){var el=e.target&&e.target.closest?e.target.closest('[data-stage]'):null;if(!el)return;var id=el.getAttribute('data-stage'),index=Number(el.getAttribute('data-index')),t=taskById(id);if(!t||!requiresEvidence(t))return;var last=stages(t).length-1;if(index===last&&!evidenceFor(id)){e.preventDefault();e.stopImmediatePropagation();alert('Registre a evidência da competência antes de concluir a última etapa.');var box=document.getElementById('evidenceText');if(box)box.focus();}}
function validState(s){if(!s||typeof s!=='object')return false;if(s.stageDone!=null&&typeof s.stageDone!=='object')return false;if(s.done!=null&&typeof s.done!=='object')return false;if(s.evidence!=null&&typeof s.evidence!=='object')return false;if(s.english!=null&&typeof s.english!=='object')return false;if(s.history!=null&&!Array.isArray(s.history))return false;return true;}
function guardImport(e){var input=e.target;if(!input||input.id!=='file'||!input.files||!input.files[0])return;e.stopImmediatePropagation();var file=input.files[0],reader=new FileReader();reader.onload=function(){try{var imported=JSON.parse(reader.result);if(!validState(imported))throw new Error('schema');localStorage.setItem(KEY,JSON.stringify(imported));location.reload();}catch(err){alert('Arquivo de progresso inválido ou incompatível.');input.value='';}};reader.readAsText(file);}
document.addEventListener('click',guardStage,true);
document.addEventListener('change',guardImport,true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',normalize);else normalize();
})();
