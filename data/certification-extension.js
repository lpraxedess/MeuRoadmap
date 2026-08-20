(function(){
'use strict';
var c=window.CERTIFICATIONS;
if(!c||!c.tracks)return;
function has(id){for(var i=0;i<c.tracks.length;i++)if(c.tracks[i].id===id)return true;return false;}
if(!has('C22'))c.tracks.push({id:'C22',name:'Microsoft SC-500',provider:'Microsoft',level:'Associate',priority:'low',type:'cloud-security',status:'specialization-later',why:'Nova trilha de Cloud and AI Security Engineer; útil para ampliar segurança cloud, mas não é uma certificação central de IAM.',gate:['F07-05','F07-07','F10-01','F10-03'],after:['C03'],blocks:[]});
if(!has('C23'))c.tracks.push({id:'C23',name:'CompTIA Security+',provider:'CompTIA',level:'Professional',priority:'low',type:'security-foundation',status:'optional-background',why:'Certificação ampla de segurança. Para seu perfil atual não é prioritária, mas permanece como referência de mercado e pode ser útil se uma vaga exigir explicitamente.',gate:['F01-01','F01-05','F01-07'],after:[],blocks:[]});
if(!has('C24'))c.tracks.push({id:'C24',name:'AWS Certified Security – Specialty (SCS-C03)',provider:'AWS',level:'Specialty',priority:'high',type:'cloud-security-iam',status:'advanced',why:'Especialização AWS avançada em segurança, incluindo domínio explícito de Identity and Access Management.',gate:['F09-05','F09-06','F09-08','F09-09','F10-12','F10-15'],after:['C06'],blocks:[]});
c.order=['C01','C02','C03','C04','C05','C06','C08','C09','C10'];
c.optional=['C11','C12','C22','C23'];
c.specializations=['C07','C13','C14','C15','C16','C17','C18','C19','C20','C21'];
c.advanced=['C08','C09','C10','C24'];
c.levels={
'Fundamentos':{label:'Básico',description:'Construir linguagem de segurança, cloud e identidade.'},
'Core':{label:'Intermediário — IAM Core',description:'Consolidar Microsoft Identity e atingir o primeiro marco profissional de IAM.'},
'Cloud':{label:'Intermediário — Cloud',description:'Expandir IAM para Azure, AWS, arquitetura e automação.'},
'Advanced':{label:'Avançado',description:'Especialização em cloud security, Zero Trust, arquitetura e segurança enterprise.'},
'Specialization':{label:'Especializações',description:'IGA, PAM e plataformas de fornecedores; fazer conforme objetivo profissional e mercado.'}
};
c.pathway=[
{id:'P01',level:'Fundamentos',title:'Base',certs:['C01','C02'],rule:'Concluir SC-900 e AZ-900 sem prolongar desnecessariamente esta fase.'},
{id:'P02',level:'Core',title:'IAM Core — prioridade máxima',certs:['C03'],rule:'SC-300 é o principal marco inicial e deve ser acompanhado de laboratório real.'},
{id:'P03',level:'Cloud',title:'Cloud + Automation',certs:['C11','C06'],rule:'AZ-104 é condicional à vaga; Terraform acompanha a automação IAM.'},
{id:'P04',level:'Cloud',title:'AWS Identity',certs:['C04','C05'],rule:'Cloud Practitioner é nivelamento; SAA prepara arquitetura AWS para IAM.'},
{id:'P05',level:'Advanced',title:'Security + Architecture',certs:['C24','C09'],rule:'SCS-C03 e SC-100 somente depois de competência demonstrável em IAM, cloud e Zero Trust.'},
{id:'P06',level:'Senior',title:'Longo prazo',certs:['C10'],rule:'CISSP representa maturidade sênior e arquitetura; não é requisito para entrar em IAM.'},
{id:'P07',level:'Specialization',title:'IGA / PAM / Vendors',certs:['C07','C13','C14','C15','C16','C17','C18','C19','C20','C21'],rule:'Escolher conforme vaga, plataforma do empregador ou direção profissional; não perseguir todas.'}
];
c.currentStatus={next:'C01',primary:'C03',conditional:['C11','C12'],advanced:['C24','C09'],longTerm:['C10'],specialization:'P07'};
c.rules.current2026=['AZ-500 não deve ser usado como objetivo futuro: o exame será desativado em 31/08/2026.','SC-500 é a nova trilha Cloud and AI Security Engineer e é complementar, não central, para IAM.','SC-300 continua sendo o principal marco de identidade para este perfil.','SCS-C03 é a certificação AWS avançada de segurança e inclui IAM como domínio próprio.','Certificação só libera o checkpoint quando a competência prática e a evidência estiverem concluídas.'];
})();