(function(){'use strict';
const KEY='iam-career-hub-state-v11';
function stripMastery(){try{const raw=localStorage.getItem(KEY);if(!raw)return;const s=JSON.parse(raw);if(s&&s.mastery){delete s.mastery;localStorage.setItem(KEY,JSON.stringify(s));}}catch(e){}}
stripMastery();
function clean(){
 const root=document.getElementById('app');if(!root)return;
 root.querySelectorAll('input#score,button#validate').forEach(e=>e.remove());
 root.querySelectorAll('.today-exec,.task-page-side .panel').forEach(e=>{if(/domínio|valida/i.test(e.textContent||''))e.remove()});
 root.querySelectorAll('*').forEach(e=>{if(e.children.length===0&&/domínio/i.test(e.textContent||'')){const p=e.closest('.today-exec,.panel,.task-page-head,.task-page-side,.today-focus');if(p&&/domínio/i.test(p.textContent||''))p.querySelectorAll('*').forEach(x=>{if(x.children.length===0&&/domínio/i.test(x.textContent||''))x.remove()})}});
 const ta=root.querySelector('#evidenceText');const save=root.querySelector('#saveEvidence');
 if(ta&&!ta.dataset.integrated){ta.dataset.integrated='1';ta.classList.add('evidence-input');ta.placeholder='Descreva aqui a evidência produzida: o que você executou, resultado obtido, erro encontrado e como resolveu.';const box=document.createElement('div');box.className='evidence-integrated';ta.parentNode.insertBefore(box,ta);box.appendChild(ta);if(save)box.appendChild(save);const label=document.createElement('div');label.className='evidence-label';label.innerHTML='<strong>Evidência da execução</strong><span>Registre o resultado real desta etapa. O texto fica associado automaticamente à competência.</span>';box.insertBefore(label,ta);const status=document.createElement('div');status.className='evidence-status';status.textContent=ta.value.trim()?'Evidência registrada':'Aguardando evidência';box.appendChild(status);ta.addEventListener('input',()=>status.textContent=ta.value.trim()?'Pronto para salvar':'Aguardando evidência');}
}
new MutationObserver(clean).observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',clean);else clean();
})();
