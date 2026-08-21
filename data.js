const DOMAINS=[
{id:'fundamentals',name:'Fundamentos de TI',icon:'◈',color:'slate',topics:['Sistemas Operacionais','Redes TCP/IP','Virtualização','PowerShell / Bash','Python / APIs','Fundamentos de Segurança']},
{id:'cloud',name:'Cloud & Infraestrutura',icon:'☁',color:'blue',topics:['Cloud Fundamentals','Azure','Compute','Storage','Networking','Governance','Hybrid Infrastructure','IaC']},
{id:'iam',name:'IAM',icon:'◉',color:'violet',topics:['Authentication','Authorization','RBAC / ABAC','MFA / Passwordless','SSO / Federation','SAML / OAuth / OIDC','Microsoft Entra ID','Active Directory','Hybrid Identity','Workload Identity','Identity Security'],certs:['SC-300','Okta Certified Professional']},
{id:'iga',name:'IGA',icon:'◇',color:'purple',topics:['Identity Lifecycle','Joiner / Mover / Leaver','Provisioning','Access Requests','Access Reviews','Access Certification','Entitlement Management','Segregation of Duties'],certs:['SailPoint IdentityNow']},
{id:'pam',name:'PAM',icon:'▣',color:'red',topics:['Privileged Accounts','PIM','JIT / JEA','Credential Vaulting','Privileged Sessions','CyberArk','BeyondTrust'],certs:['CyberArk']},
{id:'endpoint',name:'Endpoint & Device',icon:'▤',color:'cyan',topics:['Intune','MDM / MAM','Device Identity','Compliance','Autopilot','Defender for Endpoint'],certs:['MD-102']},
{id:'soc',name:'Security Operations',icon:'⌁',color:'amber',topics:['SOC Fundamentals','SIEM','Microsoft Sentinel','Splunk','KQL','SOAR','EDR / XDR','Detection Engineering','Threat Hunting','MITRE ATT&CK'],certs:['SC-200']},
{id:'network',name:'Network & Cloud Security',icon:'⌁',color:'orange',topics:['Firewall / NGFW','IDS / IPS','VPN','Segmentation','Cloud IAM','CSPM / CNAPP','Container Security','Terraform / Bicep'],certs:['CCNA','CCSP']},
{id:'ir',name:'Incident Response & Forensics',icon:'⚡',color:'rose',topics:['Incident Response','Triage','Containment','Recovery','Windows / Linux Forensics','Disk / Memory Forensics','Malware Analysis']},
{id:'vuln',name:'Vulnerability & Exposure',icon:'△',color:'yellow',topics:['Asset Inventory','Vulnerability Management','CVE / CVSS','Patch Management','Attack Surface','CIS Benchmarks','Hardening']},
{id:'appsec',name:'AppSec & DevSecOps',icon:'⌘',color:'green',topics:['Secure SDLC','OWASP Top 10','API Security','SAST / DAST','SCA','Secrets Scanning','CI/CD Security','SBOM','Supply Chain Security'],certs:['CSSLP']},
{id:'data',name:'Data Security & Privacy',icon:'▦',color:'teal',topics:['Classification','Discovery','Encryption','DLP','Information Protection','Insider Risk','eDiscovery','Retention','LGPD / GDPR','Microsoft Purview'],certs:['SC-400']},
{id:'crypto',name:'Cryptography & PKI',icon:'◇',color:'indigo',topics:['Hashing','Symmetric / Asymmetric Crypto','Digital Signatures','TLS','PKI','Certificates','HSM','Key Management','Secrets Management'],certs:['CCSP']},
{id:'grc',name:'GRC',icon:'◆',color:'gold',topics:['Governance','Risk Assessment','Risk Treatment','Security Controls','NIST CSF 2.0','ISO 27001','NIST 800-53','CIS Controls','Audit','LGPD / GDPR / SOX','Third-Party Risk','Security Metrics'],certs:['CISA','CISM','CRISC']},
{id:'architecture',name:'Security Architecture',icon:'⬡',color:'blue',topics:['Security Architecture','Zero Trust','Identity Architecture','Cloud Security Architecture','Hybrid Architecture','Network Security Architecture','Data Security Architecture','Threat Modeling','Security Strategy'],certs:['SC-100','CCSP']},
{id:'resilience',name:'Resilience & Continuidade',icon:'◒',color:'green',topics:['Business Continuity','BIA','BCP','DRP','RTO / RPO','Backup','Disaster Recovery','Crisis Management']},
{id:'ai',name:'AI Security',icon:'✦',color:'pink',topics:['AI Fundamentals','LLM Security','Prompt Injection','Model Security','AI Data Security','AI Threat Modeling','AI Governance']},
{id:'offensive',name:'Offensive Security',icon:'⌖',color:'red',topics:['Reconnaissance','OSINT','Enumeration','AD Attacks','Web Security','Network Testing','Exploitation','Red Team','CTF / Labs'],certs:['eJPT','OSCP']}
];
const CERTS=[
{id:'az900',name:'AZ-900',title:'Azure Fundamentals',domain:'cloud',provider:'Microsoft',level:'Fundamental'},
{id:'az104',name:'AZ-104',title:'Azure Administrator Associate',domain:'cloud',provider:'Microsoft',level:'Intermediate'},
{id:'sc300',name:'SC-300',title:'Identity and Access Administrator Associate',domain:'iam',provider:'Microsoft',level:'Intermediate'},
{id:'md102',name:'MD-102',title:'Endpoint Administrator Associate',domain:'endpoint',provider:'Microsoft',level:'Intermediate'},
{id:'sc200',name:'SC-200',title:'Security Operations Analyst Associate',domain:'soc',provider:'Microsoft',level:'Intermediate'},
{id:'sc400',name:'SC-400',title:'Information Protection and Compliance Administrator',domain:'data',provider:'Microsoft',level:'Intermediate'},
{id:'sc100',name:'SC-100',title:'Cybersecurity Architect Expert',domain:'architecture',provider:'Microsoft',level:'Advanced'},
{id:'ccna',name:'CCNA',title:'Networking',domain:'network',provider:'Cisco',level:'Intermediate'},
{id:'ccsp',name:'CCSP',title:'Cloud Security Professional',domain:'network',provider:'ISC2',level:'Advanced'},
{id:'cisa',name:'CISA',title:'Information Systems Auditor',domain:'grc',provider:'ISACA',level:'Advanced'},
{id:'cism',name:'CISM',title:'Information Security Manager',domain:'grc',provider:'ISACA',level:'Advanced'},
{id:'crisc',name:'CRISC',title:'Risk and Information Systems Control',domain:'grc',provider:'ISACA',level:'Advanced'},
{id:'okta',name:'Okta Professional',title:'Identity & Access Management',domain:'iam',provider:'Okta',level:'Intermediate'},
{id:'sailpoint',name:'SailPoint IdentityNow',title:'Identity Governance',domain:'iga',provider:'SailPoint',level:'Intermediate'},
{id:'cyberark',name:'CyberArk',title:'Privileged Access Management',domain:'pam',provider:'CyberArk',level:'Advanced'},
{id:'oscp',name:'OSCP',title:'Offensive Security',domain:'offensive',provider:'OffSec',level:'Advanced'}
];
const SPECIALS={iam:{labs:['Criar tenant Entra e ciclo de usuários','Configurar MFA + Conditional Access','Implementar SSO SAML e OIDC','AD DS + Entra Connect','RBAC + PIM + JIT','Criar workload identity e testar Graph']},iga:{labs:['Joiner/Mover/Leaver','Provisionamento automático','Access Review','Entitlement Management','SoD matrix']},pam:{labs:['Entra PIM','JIT activation','Vault workflow','Privileged session','Break-glass account']}};
const ROADMAP_META={start:{title:'Ponto de partida'}};

// Expose the data explicitly for the runtime. Top-level const/let declarations are not window properties in browsers.
window.DOMAINS=DOMAINS;
window.CERTS=CERTS;
window.SPECIALS=SPECIALS;
window.ROADMAP_META=ROADMAP_META;
