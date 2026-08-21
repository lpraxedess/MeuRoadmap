(()=>{'use strict';
const phases=[
 {n:'01',name:'Fundamentos de TI, Redes e Segurança',level:'Entrada',desc:'Construa a base antes de especializar. Não é necessário fazer todas as certificações desta fase.',certs:[
  ['ISC2 CC','Certified in Cybersecurity','ISC2','Entry','Vendor-neutral','Base de segurança','Nenhum'],
  ['Security+','CompTIA Security+','CompTIA','Entry','Vendor-neutral','Fundamentos amplos de cybersecurity','Conhecimento básico de redes e sistemas recomendado'],
  ['SC-900','Security, Compliance, and Identity Fundamentals','Microsoft','Fundamental','Microsoft','Visão geral de segurança, compliance e identidade no ecossistema Microsoft','Nenhum'],
  ['AZ-900','Azure Fundamentals','Microsoft','Fundamental','Cloud','Fundamentos de cloud e Azure','Nenhum'],
  ['AWS Cloud Practitioner','AWS Certified Cloud Practitioner','AWS','Foundational','Cloud','Fundamentos de cloud e serviços AWS','Nenhum'],
  ['Network+','CompTIA Network+','CompTIA','Entry','Networking','Base vendor-neutral de redes','Conhecimento de redes recomendado'],
  ['CCNA','Cisco Certified Network Associate','Cisco','Associate','Networking','Redes práticas para infraestrutura e segurança','Nenhum pré-requisito formal']
 ]},
 {n:'02',name:'Sistemas, Cloud, Administração e Identidade',level:'Básico → Intermediário',desc:'Transforme fundamentos em capacidade operacional. Escolha uma cloud principal e aprenda IAM de forma profunda.',certs:[
  ['AZ-104','Azure Administrator Associate','Microsoft','Intermediate','Azure','Administração prática de Azure','Fundamentos de Azure, redes e sistemas'],
  ['AWS SAA','AWS Certified Solutions Architect – Associate','AWS','Associate','AWS','Arquitetura e serviços AWS','Conhecimento de AWS e redes recomendado'],
  ['SC-300','Identity and Access Administrator Associate','Microsoft','Intermediate','IAM','Entra ID, autenticação, autorização e governança de identidade','Azure/Microsoft 365 e AD DS recomendados'],
  ['MD-102','Endpoint Administrator Associate','Microsoft','Intermediate','Endpoint','Gestão moderna de endpoints e Intune','Windows, Microsoft 365 e Intune recomendados'],
  ['Okta Professional','Okta Certified Professional','Okta','Professional','IAM','SSO, lifecycle e administração de identidade','Nenhum pré-requisito formal'],
  ['GCP ACE','Associate Cloud Engineer','Google Cloud','Associate','Cloud','Alternativa para quem precisa de GCP','Fundamentos de cloud recomendados']
 ]},
 {n:'03',name:'Security Operations e Defesa',level:'Intermediário',desc:'Aprenda a detectar, investigar e responder. O objetivo é produzir evidências técnicas, não apenas consumir cursos.',certs:[
  ['SC-200','Security Operations Analyst Associate','Microsoft','Intermediate','SOC','Sentinel, Defender, KQL, hunting e resposta','Experiência prática em segurança e Microsoft recomendada'],
  ['CySA+','CompTIA Cybersecurity Analyst','CompTIA','Intermediate','Blue Team','Detecção, análise de vulnerabilidades e resposta','Security+ ou experiência equivalente recomendada'],
  ['BTL1','Blue Team Level 1','Security Blue Team','Practical','Blue Team','Validação prática de SOC e investigação','Fundamentos de redes e segurança recomendados'],
  ['SC-400','Information Protection and Compliance Administrator','Microsoft','Intermediate','Data Security','Purview, proteção de informação e compliance','Microsoft 365 e segurança/compliance recomendados']
 ]},
 {n:'04',name:'Cloud Security, GRC, AppSec e Arquitetura',level:'Avançado',desc:'Aqui entram certificações que fazem sentido depois de experiência real. Algumas possuem requisitos formais de experiência.',certs:[
  ['AWS Security Specialty','AWS Certified Security – Specialty','AWS','Specialty','Cloud Security','IAM, proteção de dados, logging, detecção e resposta em AWS','Experiência prática em AWS recomendada'],
  ['CCSP','Certified Cloud Security Professional','ISC2','Advanced','Cloud Security','Cloud security vendor-neutral','Requisitos de experiência profissional; verificar regra atual da ISC2'],
  ['SC-100','Cybersecurity Architect Expert','Microsoft','Expert','Architecture','Zero Trust, arquitetura e estratégia de segurança','Experiência sólida em segurança e Microsoft recomendada'],
  ['CISA','Certified Information Systems Auditor','ISACA','Advanced','GRC','Auditoria, assurance e controles','Experiência profissional exigida para certificação'],
  ['CISM','Certified Information Security Manager','ISACA','Advanced','GRC','Governança, risco, programa de segurança e incidentes','Experiência profissional exigida para certificação'],
  ['CRISC','Certified in Risk and Information Systems Control','ISACA','Advanced','GRC','Risco, controles e monitoramento','Experiência profissional exigida para certificação'],
  ['CSSLP','Certified Secure Software Lifecycle Professional','ISC2','Advanced','AppSec','Segurança no ciclo de vida do software','Experiência profissional exigida; verificar regra atual da ISC2']
 ]},
 {n:'05',name:'Especialização Ofensiva e Liderança Técnica',level:'Especialista',desc:'Escolha uma especialização de profundidade. Não tente obter todas as credenciais: alinhe a escolha ao cargo desejado.',certs:[
  ['OSCP','Offensive Security Certified Professional','OffSec','Advanced','Offensive Security','Pentest prático, exploração e Active Directory','Redes, Linux, Windows, web e metodologia de pentest'],
  ['CISSP','Certified Information Systems Security Professional','ISC2','Advanced','Security Leadership','Visão ampla para arquitetura, gestão e liderança','Experiência profissional exigida; verificar regra atual da ISC2'],
  ['GCIH','GIAC Certified Incident Handler','GIAC','Advanced','Incident Response','Resposta a incidentes e técnicas de ataque','Experiência prática recomendada']
 ]}
];
const tracks=[
 ['Core Security','Redes → Linux/Windows → Security+ → SOC/Blue Team','Base comum para praticamente qualquer função de segurança.'],
 ['Cloud Security','Cloud Practitioner → AZ-900/AWS → administração → IAM → Cloud Security','Escolha AWS ou Azure como primeira cloud; depois amplie para multicloud.'],
 ['IAM / PAM','AD → Entra/SSO → SC-300/Okta → IGA → PAM','Trilha especialmente forte para identidade, acesso privilegiado e Zero Trust.'],
 ['SOC / Blue Team','Networking → SIEM → KQL/Sigma → EDR → IR → hunting','Foque investigação e evidência: alerta → hipótese → dados → conclusão → relatório.'],
 ['AppSec / DevSecOps','HTTP/API → OWASP → Git → CI/CD → SAST/SCA/DAST → SBOM','Integre segurança ao ciclo de desenvolvimento em vez de tratá-la como etapa final.'],
 ['GRC / Risk','NIST CSF → CIS Controls → ISO 27001 → risco → auditoria → métricas','Aprenda a traduzir risco técnico em impacto, controle, evidência e decisão.'],
 ['Offensive Security','Linux → redes → web → AD → exploração → reporting','Use somente ambientes autorizados e transforme cada exercício em relatório técnico.'],
 ['AI Security','Python → ML/LLM basics → prompt injection → data/model security → AI governance','Inclua segurança de IA como competência transversal, não como substituto dos fundamentos.']
];
function esc(s){return String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]))}
function render(){if(location.hash!=='#certs')return;const root=document.querySelector('.cert-roadmap');if(!root||root.dataset.enhanced==='1')return;root.dataset.enhanced='1';const done=JSON.parse(localStorage.getItem('cyber-hub-v6')||'{"certs":{}}').certs||{};root.innerHTML=phases.map(p=>`<article class="cert-phase enhanced-phase"><header><span>FASE ${p.n}</span><h2>${esc(p.name)}</h2><small>${esc(p.level)}</small></header><p>${esc(p.desc)}</p><div class="cert-track" tabindex="0" aria-label="Certificações da Fase ${p.n}">${p.certs.map(c=>{const d=!!done[c[0]];return `<article class="cert-node ${d?'done':''}"><div class="cert-node-top"><b>${esc(c[0])}</b><span>${d?'CONCLUÍDA':'META'}</span></div><h3>${esc(c[1])}</h3><p><b>${esc(c[2])}</b> · ${esc(c[4])}</p><p>${esc(c[5])}</p><div class="cert-line"><span class="cert-link-item">${esc(c[3])}</span><span class="cert-link-item">${esc(c[4])}</span></div><p class="cert-prereq"><b>Base:</b> ${esc(c[6])}</p><button class="primary cert-done enhanced-done" data-enhanced-cert="${esc(c[0])}">${d?'Marcar como pendente':'Marcar como concluída'}</button></article>`}).join('')}</div></article>`).join('');root.querySelectorAll('[data-enhanced-cert]').forEach(b=>b.onclick=()=>{const s=JSON.parse(localStorage.getItem('cyber-hub-v6')||'{"topics":{},"certs":{}}');s.certs=s.certs||{};s.certs[b.dataset.enhancedCert]=!s.certs[b.dataset.enhancedCert];localStorage.setItem('cyber-hub-v6',JSON.stringify(s));render()});
 const total=phases.reduce((n,p)=>n+p.certs.length,0),completed=Object.values(done).filter(Boolean).length,pct=Math.round(completed/total*100);const summary=document.querySelector('.cert-summary');if(summary)summary.innerHTML=`<div><span class="kicker">PROGRESSO DO ROADMAP</span><strong>${pct}%</strong><div class="bar"><i style="width:${pct}%"></i></div><p>${completed}/${total} marcos marcados. Não é necessário concluir todas as certificações.</p></div><div><span class="kicker">COMO USAR</span><p><b>Fundamentos primeiro.</b> Em seguida escolha uma cloud e uma especialização. Certificação é evidência de conhecimento; projetos, documentação e experiência demonstram capacidade profissional.</p></div>`;
}
function dashboard(){if(location.hash&&location.hash!=='#dashboard'&&location.hash!=='')return;const map=document.querySelector('.knowledge-map');if(!map||document.querySelector('.strategy-panel'))return;const section=document.createElement('section');section.className='strategy-panel';section.innerHTML=`<div class="section-head"><div><span class="kicker">ESTRATÉGIA 2026</span><h2>Como estudar sem se perder</h2><p>Use o conteúdo como uma sequência de competências. Certificações são checkpoints, não o objetivo final.</p></div></div><div class="track-grid">${tracks.map(t=>`<article><span class="kicker">TRILHA</span><h3>${esc(t[0])}</h3><p>${esc(t[1])}</p><small>${esc(t[2])}</small></article>`).join('')}</div><div class="evidence-grid"><article><b>1. Aprender</b><span>Leia documentação, conceitos e modelos mentais.</span></article><article><b>2. Praticar</b><span>Implemente, configure, analise e resolva problemas em ambiente autorizado.</span></article><article><b>3. Evidenciar</b><span>Produza diagramas, consultas, scripts, relatórios e decisões técnicas.</span></article><article><b>4. Validar</b><span>Teste se consegue explicar e repetir o processo sem tutorial.</span></article></div>`;map.parentNode.insertBefore(section,map.nextSibling)}
function tick(){render();dashboard()}window.addEventListener('hashchange',()=>setTimeout(tick,20));new MutationObserver(()=>setTimeout(tick,0)).observe(document.body,{childList:true,subtree:true});setTimeout(tick,80);setInterval(tick,800);
})();
