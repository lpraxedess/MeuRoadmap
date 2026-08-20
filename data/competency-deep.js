(function(){
'use strict';
var details=window.COMPETENCY_DETAILS;if(!details||!details.build)return;
var old=details.build;
var phaseGuides={
F01:{domain:'IAM Fundamentals',focus:['identity lifecycle','authentication','authorization','least privilege','cloud shared responsibility','network dependencies'],lab:'Construa um fluxo completo de identidade corporativa e identifique cada ponto de autenticação, autorização, sessão, logging e revogação.'},
F02:{domain:'Active Directory / Windows Identity',focus:['AD DS','DNS','Kerberos','LDAP','GPO','delegation','privileged accounts','service identities'],lab:'Use o domínio de laboratório para implementar uma mudança, provocar uma falha controlada de identidade e diagnosticá-la com ferramentas nativas.'},
F03:{domain:'Microsoft Entra ID',focus:['tenant','authentication methods','Conditional Access','Identity Protection','logs','device identity','RBAC'],lab:'Implemente uma política de acesso em modo controlado, teste um cenário permitido e um bloqueado e reconstrua o resultado pelos logs.'},
F04:{domain:'Hybrid Identity',focus:['Entra Connect','Cloud Sync','PHS','PTA','federation','source of authority','synchronization'],lab:'Desenhe e, quando o laboratório permitir, implemente AD → Entra. Introduza uma alteração ou erro de sincronização e diagnostique a origem.'},
F05:{domain:'Identity Protocols / Application Identity',focus:['SAML','OAuth 2.0','OIDC','SCIM','JWT','claims','trust','applications','service principals'],lab:'Integre uma aplicação de teste e documente o fluxo de identidade mensagem a mensagem, incluindo trust, claims, tokens e pontos de falha.'},
F06:{domain:'Identity Governance / Privileged Access',focus:['JML','Access Reviews','Entitlement Management','SoD','PIM','JIT','break-glass','PAM'],lab:'Modele um ciclo JML e um acesso privilegiado temporário. Inclua aprovação, expiração, auditoria e tratamento de exceção.'},
F07:{domain:'Azure Cloud IAM',focus:['Azure RBAC','Managed Identity','Key Vault','Policy','network security','logging','Defender'],lab:'Construa uma pequena arquitetura Azure com identidade humana e workload identity usando least privilege; valide acesso permitido e negado.'},
F08:{domain:'IAM Automation',focus:['PowerShell','REST','Microsoft Graph','permissions','Terraform','IAM as Code','change control'],lab:'Automatize uma tarefa IAM repetitiva com permissões mínimas, logging, tratamento de erro e execução reproduzível.'},
F09:{domain:'AWS IAM / Multi-cloud',focus:['IAM policies','roles','trust','STS','SCP','permission boundaries','Identity Center','federation','CloudTrail'],lab:'Crie um cenário multi-account com acesso federado e least privilege; use Access Analyzer/CloudTrail para validar e investigar.'},
F10:{domain:'Zero Trust / CIEM / Cloud Security',focus:['Verify Explicitly','Least Privilege','Assume Breach','workload identity','secrets','entitlements','identity attack paths'],lab:'Modele um caminho de ataque baseado em identidade e remova privilégios excessivos sem quebrar o requisito funcional.'},
F11:{domain:'IGA / PAM Ecosystem',focus:['IGA lifecycle','role mining','SoD','SailPoint','Saviynt','Okta','PAM','CyberArk','BeyondTrust'],lab:'Projete uma arquitetura enterprise separando IAM, IGA e PAM, definindo fontes, processos, integrações e controles.'},
F12:{domain:'IAM Architecture / Career',focus:['identity architecture','cloud architecture','portfolio','interview','technical communication'],lab:'Resolva um case de arquitetura IAM com requisitos de segurança, auditoria, disponibilidade e custo; apresente trade-offs e evidências.'}
};
var oldBuild=old;
details.build=function(task){
 var base=oldBuild(task)||{};var p=task&&task.phaseId;var g=phaseGuides[p]||phaseGuides.F01;var type=task&&task.type||'study';
 var name=task&&task.name||'esta competência';
 var study=base.study&&base.study.length?base.study.slice():[];
 var practice=base.practice&&base.practice.length?base.practice.slice():[];
 var validate=base.validate&&base.validate.length?base.validate.slice():[];
 var goal=base.goal||('Dominar '+name+' no contexto de '+g.domain+'.');
 if(study.length<3) study.push('Relacionar o tema a: '+g.focus.join(', ')+'.');
 study.push('Consultar documentação oficial e registrar um resumo próprio com fluxo, pré-requisitos, riscos e decisões.');
 if(practice.length<3) practice.push('Executar um cenário normal e um cenário de falha controlada.');
 practice.push('Registrar comandos, configuração, resultado esperado, resultado obtido e causa da diferença.');
 if(type==='lab') practice.push(g.lab);
 if(validate.length<2) validate.push('Explicar o fluxo ponta a ponta, as dependências e os principais modos de falha sem consultar o material.');
 validate.push('Responder: o que pode dar errado, como você provaria a causa e qual controle reduziria a recorrência?');
 return {goal:goal,study:study,practice:practice,validate:validate,evidence:(base.evidence||'Resumo próprio + resultado prático + validação')+' | Inclua evidência técnica sem segredos/PII.',pass:'Consegue executar a prática, diagnosticar pelo menos uma falha controlada, explicar a decisão técnica sem consulta e apresentar evidência reproduzível.',difficulty:(task&&task.type==='validate'?'Advanced':task&&task.type==='lab'?'Hands-on':'Core'),domain:g.domain,focus:g.focus};
};
})();
