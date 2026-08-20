(function(){
'use strict';
var r=window.ROADMAP;
if(!r||!r.phases)return;
function phase(id){for(var i=0;i<r.phases.length;i++)if(r.phases[i].id===id)return r.phases[i];return null;}
function has(id){for(var i=0;i<r.phases.length;i++){var ts=r.phases[i].tasks||[];for(var j=0;j<ts.length;j++)if(ts[j].id===id)return true;}return false;}
var f03=phase('F03');
if(f03&&!has('F03-11'))f03.tasks.push(
{id:'F03-11',name:'Global Secure Access: identidade, acesso à rede e Zero Trust',type:'study',mins:75,pre:['F03-04','F03-08']},
{id:'F03-12',name:'Defender for Cloud Apps: app discovery, sessão e controles de acesso',type:'study',mins:75,pre:['F03-04','F03-06']},
{id:'F03-13',name:'Validação: desenhar política de acesso baseada em usuário, dispositivo, risco e aplicação',type:'validate',mins:60,pre:['F03-11','F03-12']}
);
var f05=phase('F05');
if(f05&&!has('F05-12'))f05.tasks.push(
{id:'F05-12',name:'JWT: header, payload, signature, claims e validação',type:'study',mins:75,pre:['F05-03','F05-04']},
{id:'F05-13',name:'OAuth security: PKCE, state, nonce, redirect URI, scopes e consent',type:'study',mins:90,pre:['F05-03','F05-04']},
{id:'F05-14',name:'SAML security: issuer, audience, ACS, signature, replay e clock skew',type:'study',mins:90,pre:['F05-02']},
{id:'F05-15',name:'SCIM troubleshooting: provisioning, deprovisioning, PATCH e lifecycle',type:'lab',mins:90,pre:['F05-10']}
);
var f06=phase('F06');
if(f06&&!has('F06-10'))f06.tasks.push(
{id:'F06-10',name:'Lifecycle Workflows e automação de Joiner/Mover/Leaver',type:'study',mins:75,pre:['F06-01','F06-03']},
{id:'F06-11',name:'Privileged Identity: role design, eligible access, approval e audit trail',type:'lab',mins:120,pre:['F06-05','F06-07']},
{id:'F06-12',name:'Validação: responder a uma solicitação de acesso privilegiado sob auditoria',type:'validate',mins:60,pre:['F06-10','F06-11']}
);
var f08=phase('F08');
if(f08&&!has('F08-11'))f08.tasks.push(
{id:'F08-11',name:'Git e CI/CD para IAM as Code',type:'study',mins:60,pre:['F08-08']},
{id:'F08-12',name:'Secrets e credenciais em automação: managed identity, Key Vault e rotação',type:'study',mins:75,pre:['F07-04','F08-05']},
{id:'F08-13',name:'Validação: revisar uma mudança IAM como pull request',type:'validate',mins:60,pre:['F08-09','F08-11','F08-12']}
);
var f09=phase('F09');
if(f09&&!has('F09-12'))f09.tasks.push(
{id:'F09-12',name:'AWS Identity Center: permission sets, assignments e federation',type:'lab',mins:120,pre:['F09-07','F09-08']},
{id:'F09-13',name:'AWS IAM Access Analyzer: external access e unused permissions',type:'lab',mins:90,pre:['F09-05']},
{id:'F09-14',name:'Validação: analisar uma policy AWS com excesso de privilégio',type:'validate',mins:60,pre:['F09-05','F09-06','F09-13']}
);
var f10=phase('F10');
if(f10&&!has('F10-12'))f10.tasks.push(
{id:'F10-12',name:'CIEM: entitlement graph, excesso de privilégio e identidade cloud',type:'study',mins:75,pre:['F09-05','F10-02']},
{id:'F10-13',name:'Identity Threat Detection: sign-in, audit, token e privilege signals',type:'study',mins:90,pre:['F03-06','F06-07']},
{id:'F10-14',name:'Zero Trust: identity, device, application, network e data como sinais',type:'study',mins:90,pre:['F10-01','F03-11']},
{id:'F10-15',name:'Validação: desenhar controles Zero Trust para um cenário híbrido',type:'validate',mins:75,pre:['F10-12','F10-13','F10-14']}
);
if(!has('F11-01'))r.phases.push({id:'F11',name:'IGA, PAM e Ecossistema de Identidade',goal:'Expandir o domínio Microsoft para os modelos e plataformas encontrados em ambientes enterprise de IAM.',tasks:[
{id:'F11-01',name:'IGA: lifecycle, access request, catalog e certification campaigns',type:'study',mins:75,pre:['F06-02','F06-03']},
{id:'F11-02',name:'Role Mining, birthright access e entitlement model',type:'study',mins:75,pre:['F11-01']},
{id:'F11-03',name:'SoD: policy, toxic combinations e exceções',type:'study',mins:60,pre:['F06-04']},
{id:'F11-04',name:'SailPoint: arquitetura e conceitos essenciais',type:'study',mins:60,pre:['F11-01']},
{id:'F11-05',name:'Saviynt: arquitetura e conceitos essenciais',type:'study',mins:60,pre:['F11-01']},
{id:'F11-06',name:'Okta: Universal Directory, applications e lifecycle',type:'study',mins:75,pre:['F05-07']},
{id:'F11-07',name:'PAM: vault, rotation, JIT/JEA e session management',type:'study',mins:90,pre:['F06-08']},
{id:'F11-08',name:'CyberArk e BeyondTrust: modelos e componentes',type:'study',mins:60,pre:['F11-07']},
{id:'F11-09',name:'Lab: desenhar IGA + PAM para ambiente enterprise',type:'lab',mins:120,pre:['F11-02','F11-03','F11-07']},
{id:'F11-10',name:'Validação: explicar quando usar IAM, IGA e PAM',type:'validate',mins:45,pre:['F11-09']}
]});
if(!has('F12-01'))r.phases.push({id:'F12',name:'Arquitetura, Portfólio e Prontidão Profissional',goal:'Transformar conhecimento em evidência profissional e capacidade de atuar como IAM Engineer.',tasks:[
{id:'F12-01',name:'IAM architecture: identity plane, resource plane e trust boundaries',type:'study',mins:75,pre:['F10-01','F10-02']},
{id:'F12-02',name:'Cloud IAM architecture: human, workload e machine identity',type:'study',mins:90,pre:['F10-02','F10-03']},
{id:'F12-03',name:'Multi-cloud federation e identity architecture',type:'study',mins:90,pre:['F09-08','F12-02']},
{id:'F12-04',name:'Break-glass, privileged paths, logging e detection',type:'study',mins:75,pre:['F06-07','F10-01']},
{id:'F12-05',name:'Lab: arquitetura IAM enterprise ponta a ponta',type:'lab',mins:180,pre:['F11-09','F12-03','F12-04']},
{id:'F12-06',name:'Portfólio: documentar Hybrid Identity + Entra',type:'lab',mins:120,pre:['F04-06']},
{id:'F12-07',name:'Portfólio: documentar SSO + Governance + PIM',type:'lab',mins:150,pre:['F05-11','F06-09']},
{id:'F12-08',name:'Portfólio: documentar Graph automation + Terraform',type:'lab',mins:150,pre:['F08-10']},
{id:'F12-09',name:'Portfólio: documentar Entra → AWS federation',type:'lab',mins:120,pre:['F09-11']},
{id:'F12-10',name:'Validação: entrevista técnica IAM Engineer',type:'validate',mins:60,pre:['F12-05','F12-06','F12-07','F12-08','F12-09']}
]});
})();