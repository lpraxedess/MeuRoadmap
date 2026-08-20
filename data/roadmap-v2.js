/* MeuRoadmap v2 — camada de personalização e execução. Mantém a progressão básico → avançado e adiciona fast-track por domínio, critérios de domínio, portfolio e rotina de 4h/dia. */
(function(){
  'use strict';
  var R=window.ROADMAP;
  if(!R)return;
  R.version='2.0.0';
  R.career=Object.assign({},R.career,{
    target:'IAM Analyst / IAM Pleno / IAM Engineer / Cloud IAM / Entra ID',
    longTerm:'IAM técnico + Cloud Identity + IGA/PAM + Multi-cloud + Architecture',
    primaryEcosystem:'Microsoft Identity / Entra ID',
    secondaryEcosystems:['AWS IAM','IGA','PAM','Okta','SailPoint/Saviynt','CyberArk/BeyondTrust'],
    dailyStudyMinutes:180,
    dailyEnglishMinutes:60,
    weeklyStudyHours:20,
    progression:'basic-to-advanced',
    employmentTrack:true
  });
  R.execution={
    daily:{technical:['60m teoria/documentação','90m laboratório/prática','30m revisão + evidência'],english:['20m leitura técnica','20m listening','10m vocabulário IAM','10m produção técnica']},
    rule:'Conhecer → Explicar → Executar → Quebrar → Troubleshoot → Documentar → Validar',
    completion:'Uma tarefa só é considerada dominada quando a validação independente é concluída e existe evidência reproduzível.',
    fastTrack:{description:'Fundamentos continuam obrigatórios, mas conhecimento prévio reduz profundidade inicial; não remove a etapa de revisão.',levels:{0:'estudo completo + lab guiado',1:'estudo + lab',2:'revisão objetiva + lab',3:'troubleshooting + arquitetura',4:'desafio sem tutorial + defesa técnica'}},
    evidence:['resumo próprio','lab reproduzível','troubleshooting','diagrama quando aplicável','README/portfolio','validação sem consulta']
  };
  R.career.gates=[
    {id:'analyst',name:'IAM Analyst Ready',requires:['F01','F02','F03','F04','F05','F06']},
    {id:'pleno',name:'IAM Pleno Ready',requires:['F01','F02','F03','F04','F05','F06','F07','F08','F09']},
    {id:'engineer',name:'IAM Engineer Ready',requires:['F01','F02','F03','F04','F05','F06','F07','F08','F09','F10','F11','F12','F13']}
  ];
  R.career.certificationOrder=[
    {order:1,id:'SC-900',priority:'fast-track',reason:'nivelamento Microsoft Security/Identity'},
    {order:2,id:'AZ-900',priority:'fast-track',reason:'nivelamento Azure'},
    {order:3,id:'SC-300',priority:'primary',reason:'certificação central para Microsoft Identity/IAM'},
    {order:4,id:'AWS Cloud Practitioner',priority:'secondary',reason:'vocabulário cloud AWS'},
    {order:5,id:'AWS Solutions Architect Associate',priority:'recommended',reason:'fundação arquitetural cloud'},
    {order:6,id:'AWS Security Specialty',priority:'advanced',reason:'especialização cloud security/IAM'},
    {order:7,id:'AZ-104',priority:'conditional',reason:'fazer se vagas-alvo exigirem Azure Administration'}
  ];
  R.career.portfolioRules={minimumProjects:6,requiredEvidence:['Hybrid Identity','SAML/OIDC','PIM/IGA','IAM Automation','Azure IAM','AWS Federation'],rule:'Não publicar apenas screenshots; cada projeto deve conter objetivo, arquitetura, implementação, teste, falha deliberada, troubleshooting, controles e resultado.'};
  var phaseLevels={F01:'foundation',F02:'foundation',F03:'intermediate',F04:'intermediate',F05:'intermediate',F06:'intermediate',F07:'intermediate',F08:'advanced',F09:'advanced',F10:'advanced',F11:'advanced',F12:'professional',F13:'professional'};
  var phaseGoals={
    F01:'Construir/revisar os fundamentos sem pressupor conhecimento prévio.',
    F02:'Revalidar Windows/AD profundamente e transformar experiência operacional em conhecimento explicável.',
    F03:'Dominar Entra ID core e controles de autenticação/autorização.',
    F04:'Dominar identidade híbrida AD ↔ Entra.',
    F05:'Dominar protocolos e application identity.',
    F06:'Dominar governança, privilégio e ciclo de vida.',
    F07:'Dominar Azure IAM e o contexto cloud necessário.',
    F08:'Automatizar IAM com PowerShell, Graph, Python e IaC.',
    F09:'Dominar AWS IAM e federation/multi-cloud.',
    F10:'Conectar IAM a Zero Trust, CIEM, threat modeling e cloud attack paths.',
    F11:'Projetar arquiteturas IAM corporativas.',
    F12:'Certificar e validar conhecimento técnico em entrevistas.',
    F13:'Converter competência em portfolio e empregabilidade contínua.'
  };
  (R.phases||[]).forEach(function(p){
    p.level=phaseLevels[p.id]||'advanced';
    p.goal=phaseGoals[p.id]||p.goal;
    p.mastery=['Conhecer','Explicar','Executar','Troubleshoot','Validar'];
    (p.tasks||[]).forEach(function(t){
      t.progression=p.level;
      t.completion=['Estudar o conceito e a documentação oficial','Executar o cenário prático sem copiar cegamente','Criar uma falha deliberada quando aplicável','Investigar e registrar causa/impacto/correção','Validar sem consulta'];
      t.evidence=t.evidence||'README + evidência prática + troubleshooting + validação.';
      t.reviewRequired=true;
    });
  });
  /* Reforços que estavam sub-representados no roadmap original. */
  function phase(id){return (R.phases||[]).find(function(p){return p.id===id;});}
  function add(p,t){if(p&&!p.tasks.some(function(x){return x.id===t.id;}))p.tasks.push(t);}
  var f01=phase('F01'),f08=phase('F08'),f11=phase('F11');
  add(f01,{id:'F01-11',name:'DNS, TCP/IP, TLS e PKI para identidade',type:'study',mins:90,pre:['F01-08'],progression:'foundation',reviewRequired:true,evidence:'Mapa de fluxo + análise de um login/SSO incluindo DNS e TLS.'});
  add(f08,{id:'F08-11',name:'Python básico aplicado a IAM',type:'study',mins:90,pre:['F08-03'],progression:'advanced',reviewRequired:true,evidence:'Script pequeno que consuma JSON/API e gere relatório.'});
  add(f08,{id:'F08-12',name:'Troubleshooting Microsoft Graph: 401, 403, consent e scopes',type:'lab',mins:120,pre:['F08-05'],progression:'advanced',reviewRequired:true,evidence:'README com quatro falhas reproduzidas e diagnóstico.'});
  add(f11,{id:'F11-10',name:'Architecture review: trade-offs, riscos, custo e operação',type:'validate',mins:90,pre:['F11-08'],progression:'advanced',reviewRequired:true,evidence:'Architecture Decision Record com pelo menos cinco decisões justificadas.'});
  var f13={id:'F13',name:'Portfolio, Job Readiness e Carreira',goal:'Transformar competência técnica em evidência profissional e prontidão para vagas.',level:'professional',mastery:['Conhecer','Executar','Documentar','Defender','Aplicar no mercado'],tasks:[
    {id:'F13-01',name:'Mapear competências atuais para IAM Analyst/Pleno/Engineer',type:'validate',mins:60,pre:['F01-10'],evidence:'Matriz de competências com nível atual e lacunas.'},
    {id:'F13-02',name:'Projeto de portfolio: Hybrid Identity',type:'lab',mins:180,pre:['F04-06'],evidence:'README + arquitetura + implementação + troubleshooting.'},
    {id:'F13-03',name:'Projeto de portfolio: SAML/OIDC + Application Identity',type:'lab',mins:180,pre:['F05-11'],evidence:'Fluxos, claims/tokens, configuração e falhas deliberadas.'},
    {id:'F13-04',name:'Projeto de portfolio: PIM/IGA + Access Review',type:'lab',mins:180,pre:['F06-09'],evidence:'JML + matriz de acesso + revisão + privilégio temporário.'},
    {id:'F13-05',name:'Projeto de portfolio: IAM Automation',type:'lab',mins:180,pre:['F08-10'],evidence:'PowerShell/Graph + relatório + controles + logs.'},
    {id:'F13-06',name:'Projeto de portfolio: Azure IAM',type:'lab',mins:180,pre:['F07-10'],evidence:'Arquitetura + RBAC + Managed Identity + Key Vault + logs.'},
    {id:'F13-07',name:'Projeto de portfolio: Entra → AWS Federation',type:'lab',mins:180,pre:['F09-11'],evidence:'Federation + trust + least privilege + troubleshooting.'},
    {id:'F13-08',name:'Entrevista técnica simulada completa',type:'validate',mins:90,pre:['F12-10','F11-09'],evidence:'Gravação/anotações + perguntas erradas + plano de revisão.'},
    {id:'F13-09',name:'Currículo e LinkedIn orientados a IAM',type:'validate',mins:60,pre:['F13-01'],evidence:'Versão final com competências comprováveis e palavras-chave IAM.'},
    {id:'F13-10',name:'Revisão mensal de mercado e ajuste do roadmap',type:'validate',mins:45,pre:['F13-09'],evidence:'Relatório mensal de vagas, gaps e prioridades.'}
  ]};
  if(!phase('F13'))R.phases.push(f13);
  /* Regra de revisão: fundamentos nunca desaparecem; voltam em ciclos espaçados. */
  R.review={intervals:[1,3,7,14,30,60],unit:'days',trigger:'revisar após validação e repetir em intervalos crescentes',format:'explicar sem consulta + uma questão de troubleshooting + uma decisão técnica'};
  R.weeklyPlan={days:['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],technical:'3h/dia útil',english:'1h/dia',weekend:'usar para laboratório longo, portfolio e revisão; descanso é permitido e não quebra o progresso'};
})();
