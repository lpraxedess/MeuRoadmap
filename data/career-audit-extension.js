(function(){
'use strict';
var a=window.CAREER_AUDIT;
if(!a)return;
a.version='3.1.0';
a.competencyMatrix=[
{id:'M01',area:'Active Directory / Windows Identity',level:'strong-professional',importance:'critical',priority:'review',action:'Usar troubleshooting, Kerberos, LDAP, delegation, trusts e arquitetura em vez de repetir fundamentos básicos.'},
{id:'M02',area:'SOC / Security Operations',level:'strong-professional',importance:'high',priority:'leverage',action:'Converter experiência com Wazuh, Sophos, Suricata, TheHive e investigação em Identity Security e incident response.'},
{id:'M03',area:'Microsoft Entra Core',level:'intermediate-practical',importance:'critical',priority:'high',action:'Aprofundar autenticação, Conditional Access, Identity Protection, logs, GSA e Defender for Cloud Apps.'},
{id:'M04',area:'Identity Protocols',level:'foundation-gap',importance:'critical',priority:'critical',action:'Dominar SAML, OAuth 2.0, OIDC, SCIM, JWT e WS-Federation com fluxo, segurança e troubleshooting.'},
{id:'M05',area:'Application / Workload Identity',level:'foundation-gap',importance:'critical',priority:'critical',action:'Dominar App Registration, Enterprise Application, Service Principal, Managed Identity, consent, permissions e tokens.'},
{id:'M06',area:'Hybrid Identity',level:'foundation-gap-to-practical',importance:'critical',priority:'high',action:'Executar AD → Entra Connect/Cloud Sync, PHS/PTA/Federation e troubleshooting de sincronização.'},
{id:'M07',area:'IGA / Identity Governance',level:'practical-exposure',importance:'high',priority:'high',action:'Aprofundar JML, Access Reviews, Entitlement Management, SoD, role mining e certification.'},
{id:'M08',area:'Privileged Access / PAM',level:'foundation-gap',importance:'high',priority:'high',action:'Dominar PIM, JIT, break-glass, JEA e depois conceitos de CyberArk/BeyondTrust.'},
{id:'M09',area:'IAM Automation',level:'foundation-gap',importance:'critical',priority:'high',action:'Evoluir PowerShell para automação, Microsoft Graph, REST, Git/CI-CD e Terraform IAM as Code.'},
{id:'M10',area:'Azure IAM',level:'intermediate-lab',importance:'critical',priority:'high',action:'Conectar Entra a RBAC, Managed Identity, Key Vault, Policy, Monitor, networking e governance.'},
{id:'M11',area:'AWS IAM / Federation',level:'foundation-gap',importance:'high',priority:'medium',action:'Aprender IAM policies, roles, trust, STS, SCP, permission boundaries, Identity Center e federation.'},
{id:'M12',area:'Cloud IAM / CIEM / Zero Trust',level:'foundation-gap',importance:'high',priority:'medium',action:'Projetar controles para human, workload e machine identity e analisar excesso de privilégios cloud.'},
{id:'M13',area:'IAM Architecture',level:'initial',importance:'critical',priority:'future',action:'Construir casos de arquitetura híbrida, multi-cloud, federation, governance, PAM e Zero Trust.'},
{id:'M14',area:'Technical English',level:'foundation-gap',importance:'medium',priority:'continuous',action:'Aplicar inglês em documentação, termos IAM, leitura de logs e explicações técnicas durante toda a trilha.'}
];
a.executionRules=[
'Cada competência crítica deve ter pelo menos um laboratório reproduzível e um cenário de troubleshooting.',
'Conhecimento profissional prévio é validado por cenário prático; não deve ser repetido como conteúdo introdutório.',
'Uma certificação só deve ser marcada como pronta quando os gates de competência e a evidência correspondente estiverem concluídos.',
'Protocolos e application identity têm prioridade antes de especializações de fornecedor.',
'PowerShell/Graph/Terraform devem evoluir em paralelo ao IAM Core.',
'Azure e Microsoft Entra vêm antes de AWS avançado; AWS SAA prepara a arquitetura necessária para AWS IAM.',
'IGA e PAM entram depois dos fundamentos de lifecycle, authorization, governance e privileged access.',
'Arquitetura é avaliada por trade-offs, threat model, least privilege, operação, auditoria e recuperação.'
];
a.qualityGates={study:['explicar sem consulta','executar exercício','registrar evidência'],lab:['ambiente reproduzível','resultado esperado','falha controlada','diagnóstico','correção','evidência sem segredos'],architecture:['requisitos','trust boundaries','identities','flows','controls','logging','failure modes','trade-offs'],portfolio:['README','diagrama','passos reproduzíveis','evidências','lições aprendidas','sem PII/segredos']};
})();