(function(){
'use strict';
var r=window.ROADMAP;
if(!r||!r.phases)return;
function has(id){for(var i=0;i<r.phases.length;i++){var ts=r.phases[i].tasks||[];for(var j=0;j<ts.length;j++)if(ts[j].id===id)return true;}return false;}
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