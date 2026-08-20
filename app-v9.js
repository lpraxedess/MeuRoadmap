(function(){
'use strict';

const KEY='iam-career-hub-state-v10';
const MIGRATION='iam-career-hub-migrations-v2';
const data=window.ROADMAP||{career:{target:'IAM Analyst / IAM Engineer'},phases:[]};
const learning=window.LEARNING||{};
const certs=window.CERTIFICATIONS||{};
const app=document.getElementById('app');

const fresh=()=>({done:{},activityDone:{},evidence:{},english:{minutes:0,sessions:0},history:[],started:new Date().toISOString()});
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key=(id,s,i)=>`${id}|${s}|${i}`;
const routeHash=()=>location.hash.replace(/^#/,'')||'today';

function normalize(s){
  s.done=s.done&&typeof s.done==='object'?s.done:{};
  s.activityDone=s.activityDone&&typeof s.activityDone==='object'?s.activityDone:{};
  s.evidence=s.evidence&&typeof s.evidence==='object'?s.evidence:{};
  s.english=s.english&&typeof s.english==='object'?s.english:{minutes:0,sessions:0};
  s.english.minutes=Number(s.english.minutes)||0;
  s.english.sessions=Number(s.english.sessions)||0;
  s.history=Array.isArray(s.history)?s.history:[];
  return s;
}

function rawLoad(){
  let s=fresh();
  try{const raw=JSON.parse(localStorage.getItem(KEY)||'{}');if(raw&&typeof raw==='object')s=Object.assign(s,raw);}catch(e){console.warn('Estado inválido; usando estado novo.',e);}
  return normalize(s);
}

function taskList(){
  const out=[];
  (data.phases||[]).forEach(p=>(p.tasks||[]).forEach(t=>out.push({id:t.id,name:t.name,type:t.type||'knowledge',mins:Number(t.mins)||60,pre:t.pre||[],phaseId:p.id,phase:p.name,goal:t.goal||''})));
  return out;
}
const get=id=>taskList().find(t=>t.id===id);

function detail(t){
  const l=learning.enrich?learning.enrich(t):{};
  return {
    goal:l.goal||'Dominar a competência.',
    study:Array.isArray(l.study)&&l.study.length?l.study:['Estudar documentação oficial.'],
    practice:Array.isArray(l.practice)&&l.practice.length?l.practice:['Executar a prática.'],
    validate:Array.isArray(l.validate)&&l.validate.length?l.validate:['Explicar sem consulta e resolver um cenário.'],
    evidence:l.evidence||'Registrar evidência objetiva.'
  };
}

function stages(t){
  const d=detail(t);
  if(t.type==='lab')return[
    {n:'Estudar',items:d.study},{n:'Executar',items:d.practice},
    {n:'Troubleshoot',items:['Provocar um erro controlado.','Diagnosticar a causa e corrigir.']},
    {n:'Evidenciar',items:[d.evidence]}
  ];
  if(t.type==='validate')return[
    {n:'Resolver',items:['Resolver o cenário sem tutorial.']},
    {n:'Explicar',items:['Explicar sem consulta e justificar a decisão.']},
    {n:'Registrar',items:[d.evidence]}
  ];
  return[
    {n:'Estudar',items:d.study},{n:'Praticar',items:d.practice},
    {n:'Recapitular',items:['Explicar os conceitos sem consultar.','Reconstruir o fluxo ou arquitetura.','Listar erros e correções.','Explicar onde isso é usado em produção.']},
    {n:'Validar',items:d.validate}
  ];
}

function cleanupLegacyMarks(s){
  let migrations={};
  try{migrations=JSON.parse(localStorage.getItem(MIGRATION)||'{}')||{};}catch(e){}
  if(migrations.activity_labels_v1)return;
  const targets=new Set([
    'Estudar documentação oficial e conceitos fundamentais.',
    'Produzir resumo próprio com fluxo, riscos e controles.'
  ]);
  taskList().forEach(t=>stages(t).forEach((stage,si)=>stage.items.forEach((item,i)=>{
    if(targets.has(String(item).trim()))delete s.activityDone[key(t.id,si,i)];
  })));
  migrations.activity_labels_v1=true;
  try{localStorage.setItem(MIGRATION,JSON.stringify(migrations));}catch(e){}
}

function load(){const s=rawLoad();cleanupLegacyMarks(s);return s;}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(normalize(s)));return true;}catch(e){console.error('Falha ao salvar progresso',e);return false;}}
function transact(mutator,after){const s=load();mutator(s);save(s);state=load();after();}
let state=load();

function isDone(t,s,i){return state.activityDone[key(t.id,s,i)]===true;}
function taskPct(t){let done=0,total=0;stages(t).forEach((st,si)=>st.items.forEach((_,i)=>{total++;if(isDone(t,si,i))done++;}));return total?Math.round(done*100/total):0;}
function complete(t){return taskPct(t)===100;}
function ready(t){return (t.pre||[]).every(id=>!!state.done[id]);}
function sync(t,s){if(complete(t)){if(!s.done[t.id])s.history.push({id:t.id,at:new Date().toISOString()});s.done[t.id]={at:s.done[t.id]?.at||new Date().toISOString()};}else delete s.done[t.id];}
function nextTask(){const a=taskList();return a.find(t=>!complete(t)&&!state.done[t.id]&&ready(t))||a.find(t=>!complete(t)&&!state.done[t.id])||null;}
function bar(v){return `<div class="bar"><i style="width:${Math.max(0,Math.min(100,v))}%"></i></div>`;}

function navigate(route,{replace=false}={}){
  const target='#'+route.replace(/^#/,'');
  if(location.hash===target){renderRoute(route);return;}
  const url=location.pathname+location.search+target;
  if(replace)history.replaceState({route},'',url);else history.pushState({route},'',url);
  renderRoute(route);
}

function nav(){return '<nav>'+[['today','Today'],['roadmap','Roadmap'],['progress','Progress'],['certs','Certificações'],['labs','Labs'],['settings','Config']].map(x=>`<button type="button" data-view="${x[0]}">${x[1]}</button>`).join('')+'</nav>';}
function shell(content){app.innerHTML=`<div class="app-shell"><aside class="sidebar"><div class="brand"><strong>IAM</strong><span>CAREER HUB</span></div><div class="career-chip"><span>OBJETIVO</span><b>${esc(data.career.target)}</b><small>Cloud IAM</small></div>${nav()}<div class="sidebar-foot"><span>3h conteúdo</span><span>1h inglês</span></div></aside><main>${content}</main></div>`;bindNav();}
function head(k,t,s){return `<header class="top"><div><div class="eyebrow">${esc(k)}</div><h1>${esc(t)}</h1><p>${esc(s||'')}</p></div></header>`;}

function renderToday(){
  state=load();
  const t=nextTask();
  let focus='';
  if(t){
    const pct=taskPct(t);
    focus=`<section class="today-focus"><span class="focus-label">${esc(t.phase)}</span><h2>${esc(t.name)}</h2><p>${t.mins} min · ${pct}% concluído</p><div class="today-exec"><span>Execução ${pct}%</span><span>${t.type==='lab'?'Laboratório':t.type==='validate'?'Validação':'Guiado'}</span></div><button type="button" class="primary" data-task="${esc(t.id)}">Continuar →</button></section>`;
  }else focus='<section class="today-focus"><h2>Trilha concluída</h2><p>Revise evidências e avance para a próxima meta.</p></section>';
  let next2=null;
  if(t){const a=taskList(),ix=a.findIndex(x=>x.id===t.id);for(let i=ix+1;i<a.length;i++){if(!state.done[a[i].id]&&ready(a[i])){next2=a[i];break;}}}
  shell(head('TODAY',t?'Faça agora':'Tudo concluído','Uma ação por vez.')+focus+(next2?`<section class="today-next"><span>PRÓXIMO</span><b>${esc(next2.name)}</b></section>`:'')+'<section class="today-routine"><span>3h conteúdo</span><span>1h inglês</span></section>');
  bindActions();
}

function renderRoadmap(){
  state=load();let h='';
  (data.phases||[]).forEach(p=>{
    const d=(p.tasks||[]).filter(t=>state.done[t.id]).length,v=Math.round(d*100/((p.tasks||[]).length||1));
    h+=`<details class="phase-card"><summary><div><b>${esc(p.id)} · ${esc(p.name)}</b><small>${d}/${p.tasks.length}</small></div><strong>${v}%</strong></summary>${bar(v)}<div class="phase-tasks">${(p.tasks||[]).map(t=>`<div class="task ${state.done[t.id]?'done':''}"><div><b>${esc(t.name)}</b><small>${t.mins||60} min · ${state.done[t.id]?'concluído':ready(t)?taskPct(t)+'%':'bloqueado'}</small></div><button type="button" data-task="${esc(t.id)}">Abrir</button></div>`).join('')}</div></details>`;
  });
  shell(head('ROADMAP','Seu caminho','Básico → intermediário → avançado.')+'<section class="roadmap-list">'+h+'</section>');bindActions();
}

function renderProgress(){
  state=load();const a=taskList(),d=a.filter(t=>state.done[t.id]).length,v=Math.round(d*100/(a.length||1));
  const domains=(data.phases||[]).map(p=>{const n=(p.tasks||[]).filter(t=>state.done[t.id]).length,x=Math.round(n*100/((p.tasks||[]).length||1));return `<div class="domain"><div><span>${esc(p.name)}</span><b>${x}%</b></div>${bar(x)}</div>`;}).join('');
  shell(head('PROGRESS','Progresso','Competências concluídas.')+`<section class="progress-hero"><div class="big-number">${v}%</div>${bar(v)}<span>${d} de ${a.length} competências</span></section><section class="domain-list">${domains}</section><section class="panel english-panel"><div><h3>Inglês técnico</h3><p>${state.english.sessions} sessões · ${state.english.minutes} min</p></div><button type="button" class="primary" id="english60">+ 60 min</button></section>`);bindActions();
}

function renderCerts(){
  const all=certs.tracks||[];let h='<section class="cert-path panel"><div class="eyebrow">ORDEM</div><h2>SC-900 → AZ-900 → SC-300 → AZ-104 conforme vaga → AWS SAA → AWS Security</h2><p>Certificação acompanha a prática.</p></section>';
  ['Básico','Intermediário','Avançado'].forEach(level=>{const list=all.filter(c=>((c.level==='Fundamental'||c.level==='Foundational')?'Básico':(c.level==='Associate'||c.level==='Professional')?'Intermediário':'Avançado')===level);if(list.length)h+=`<section class="cert-section"><h2>${level}</h2><div class="cert-grid">${list.map(c=>`<article class="cert-card"><h3>${esc(c.name)}</h3><small>${esc(c.provider||'')}</small><p>${esc(c.why||'')}</p></article>`).join('')}</div></section>`;});
  shell(head('CERTIFICAÇÕES','Trilha de certificações','Prioridade IAM e Cloud.')+h);
}
function renderLabs(){shell(head('LABS','Laboratórios','Prática que gera evidência.')+'<section class="content-grid"><div class="panel"><h3>Existentes</h3><div class="evidence"><b>Cloud Security</b><span>Azure · Entra ID · RBAC · VNet · NSG · VM</span></div><div class="evidence"><b>On-Premises</b><span>AD · DNS · DHCP · GPO · Wazuh · Suricata</span></div></div><div class="panel"><h3>Próximos</h3>'+['Hybrid Identity','Enterprise SSO','PIM + Governance','Graph Automation','Entra → AWS Federation','IAM Architecture'].map(x=>`<div class="evidence"><b>${x}</b></div>`).join('')+'</div></section>');}
function renderSettings(){shell(head('CONFIG','Configurações','Dados e rotina.')+'<section class="panel settings"><div class="setting"><span>Objetivo</span><b>'+esc(data.career.target)+'</b></div><div class="setting"><span>Rotina</span><b>3h conteúdo + 1h inglês</b></div><div class="actions"><button type="button" class="secondary" id="export">Exportar</button><button type="button" class="secondary" id="import">Importar</button><button type="button" class="danger" id="reset">Resetar</button><input id="file" type="file" accept="application/json" hidden></div></section>');bindActions();}

function renderTask(id){
  state=load();const t=get(id);if(!t){navigate('today',{replace:true});return;}
  const ss=stages(t),d=detail(t);
  const html=`<div class="task-page"><div class="back-row"><button type="button" class="secondary" id="back">← Today</button><span>${esc(t.phase)}</span></div><div class="task-page-head"><div class="eyebrow">${esc(t.id)}</div><h1>${esc(t.name)}</h1><p>${t.mins} min · ${taskPct(t)}% · ${ready(t)?'disponível':'bloqueada'}</p></div><div class="task-page-grid"><article class="panel learning-panel"><section><h2>Objetivo</h2><p>${esc(d.goal)}</p></section>${ss.map((st,s)=>`<section><h2>${esc(st.n)}</h2>${st.items.map((x,i)=>{const done=isDone(t,s,i);return `<button type="button" class="detail-line activity-toggle ${done?'individual-task-done':''}" data-activity="${esc(key(t.id,s,i))}" aria-pressed="${done}"><span class="check">${done?'✓':'○'}</span><span>${esc(x)}</span></button>`;}).join('')}</section>`).join('')}<section><h2>Evidência</h2><p>${esc(d.evidence)}</p></section></article><aside class="task-page-side"><div class="panel"><h2>Execução</h2>${ss.map((st,s)=>{const n=st.items.length,dn=st.items.filter((_,i)=>isDone(t,s,i)).length,p=n?Math.round(dn*100/n):0;return `<div class="stage ${p===100?'complete':''}"><b>${esc(st.n)}</b><small>${p}%</small></div>`;}).join('')}</div><div class="panel"><label class="evidence-input"><span>Nota / evidência</span><textarea id="evidenceText" rows="5" placeholder="Comando, resultado ou link.">${esc(state.evidence[t.id]||'')}</textarea><button type="button" class="secondary" id="saveEvidence">Salvar</button></label></div></aside></div></div>`;
  shell(html);bindTask(id);
}

function bindTask(id){
  const back=document.getElementById('back');
  if(back)back.onclick=()=>navigate('today',{replace:true});
  document.querySelectorAll('[data-activity]').forEach(x=>x.onclick=()=>{
    const k=x.getAttribute('data-activity');
    transact(s=>{s.activityDone[k]=s.activityDone[k]!==true;sync(get(id),s);},()=>renderTask(id));
  });
  const saveEvidence=document.getElementById('saveEvidence');
  if(saveEvidence)saveEvidence.onclick=()=>{const text=document.getElementById('evidenceText').value;transact(s=>{s.evidence[id]=text;},()=>renderTask(id));};
}

function bindActions(){
  document.querySelectorAll('[data-task]').forEach(x=>x.onclick=()=>navigate('task/'+encodeURIComponent(x.getAttribute('data-task'))));
  const e=document.getElementById('english60');if(e)e.onclick=()=>transact(s=>{s.english.minutes+=60;s.english.sessions++;},renderProgress);
  const r=document.getElementById('reset');if(r)r.onclick=()=>{if(confirm('Resetar todo o progresso?')){state=fresh();save(state);navigate('today',{replace:true});}};
  const ex=document.getElementById('export');if(ex)ex.onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(load(),null,2)],{type:'application/json'}));a.download='iam-career-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
  const im=document.getElementById('import');if(im)im.onclick=()=>document.getElementById('file').click();
  const f=document.getElementById('file');if(f)f.onchange=()=>{const reader=new FileReader();reader.onload=()=>{try{const incoming=normalize(JSON.parse(reader.result));save(incoming);state=load();navigate('today',{replace:true});}catch(e){alert('Arquivo inválido.');}};if(f.files[0])reader.readAsText(f.files[0]);};
}
function bindNav(){document.querySelectorAll('[data-view]').forEach(x=>x.onclick=()=>navigate(x.getAttribute('data-view')));}
function renderRoute(route){state=load();const r=route||'today';if(r.startsWith('task/'))renderTask(decodeURIComponent(r.slice(5)));else if(r==='roadmap')renderRoadmap();else if(r==='progress')renderProgress();else if(r==='certs')renderCerts();else if(r==='labs')renderLabs();else if(r==='settings')renderSettings();else renderToday();}

window.addEventListener('popstate',()=>renderRoute(routeHash()));
window.addEventListener('hashchange',()=>renderRoute(routeHash()));
window.addEventListener('storage',e=>{if(e.key===KEY){state=load();renderRoute(routeHash());}});
window.addEventListener('pageshow',()=>{state=load();renderRoute(routeHash());});
if(!history.state)history.replaceState({route:routeHash()},'',location.href);
renderRoute(routeHash());
})();
