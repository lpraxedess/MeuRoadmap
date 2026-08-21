const DOMAINS=[
{id:'fundamentals',name:'Fundamentos de TI',icon:'◈',color:'slate',topics:['Sistemas Operacionais','Redes TCP/IP','Virtualização','PowerShell / Bash','Python / APIs','Fundamentos de Segurança']},
{id:'cloud',name:'Cloud & Infraestrutura',icon:'☁',color:'blue',topics:['Cloud Fundamentals','Azure','Compute','Storage','Networking','Governance','Hybrid Infrastructure','IaC']},
{id:'iam',name:'IAM',icon:'◉',color:'violet',topics:['Authentication','Authorization','RBAC / ABAC','MFA / Passwordless','SSO / Federation','SAML / OAuth / OIDC','Microsoft Entra ID','Active Directory','Hybrid Identity','Workload Identity','Identity Security'],certs:['SC-300','Okta Certified Professional']},
{id:'iga',name:'IGA',icon:'◇',color:'purple',topics:['Identity Lifecycle','Joiner / Mover / Leaver','Provisioning','Access Requests','Access Reviews','Access Certification','Entitlement Management','Segregation of Duties'],certs:['SailPoint Identity Security Professional']},
{id:'pam',name:'PAM',icon:'▣',color:'red',topics:['Privileged Accounts','PIM','JIT / JEA','Credential Vaulting','Privileged Sessions','CyberArk','BeyondTrust'],certs:['CyberArk Defender - PAM']},
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
{id:'offensive',name:'Offensive Security',icon:'⌖',color:'red',topics:['Reconnaissance','OSINT','Enumeration','AD Attacks','Web Security','Network Testing','Exploitation','Red Team','CTF / Labs'],certs:['OSCP']}
];
const CERTS=[
{id:'cc',name:'CC',title:'Certified in Cybersecurity',domain:'fundamentals',provider:'ISC2',level:'Entry-level',type:'Certification'},
{id:'az900',name:'AZ-900',title:'Azure Fundamentals',domain:'cloud',provider:'Microsoft',level:'Fundamental',type:'Certification'},
{id:'az104',name:'AZ-104',title:'Azure Administrator Associate',domain:'cloud',provider:'Microsoft',level:'Intermediate',type:'Certification'},
{id:'sc300',name:'SC-300',title:'Identity and Access Administrator Associate',domain:'iam',provider:'Microsoft',level:'Intermediate',type:'Certification'},
{id:'md102',name:'MD-102',title:'Endpoint Administrator Associate',domain:'endpoint',provider:'Microsoft',level:'Intermediate',type:'Certification'},
{id:'sc200',name:'SC-200',title:'Security Operations Analyst Associate',domain:'soc',provider:'Microsoft',level:'Intermediate',type:'Certification'},
{id:'sc400',name:'SC-400',title:'Information Protection and Compliance Administrator',domain:'data',provider:'Microsoft',level:'Intermediate',type:'Certification'},
{id:'sc100',name:'SC-100',title:'Cybersecurity Architect Expert',domain:'architecture',provider:'Microsoft',level:'Expert',type:'Certification'},
{id:'ccna',name:'CCNA',title:'Cisco Certified Network Associate',domain:'network',provider:'Cisco',level:'Associate',type:'Certification'},
{id:'ccsp',name:'CCSP',title:'Certified Cloud Security Professional',domain:'cloud',provider:'ISC2',level:'Advanced',type:'Certification'},
{id:'cisa',name:'CISA',title:'Certified Information Systems Auditor',domain:'grc',provider:'ISACA',level:'Advanced',type:'Certification'},
{id:'cism',name:'CISM',title:'Certified Information Security Manager',domain:'grc',provider:'ISACA',level:'Advanced',type:'Certification'},
{id:'crisc',name:'CRISC',title:'Certified in Risk and Information Systems Control',domain:'grc',provider:'ISACA',level:'Advanced',type:'Certification'},
{id:'okta',name:'Okta Certified Professional',title:'Okta Certified Professional',domain:'iam',provider:'Okta',level:'Professional',type:'Certification'},
{id:'sailpoint',name:'SailPoint Identity Security Professional',title:'Identity Security Professional',domain:'iga',provider:'SailPoint',level:'Knowledge Credential',type:'Credential'},
{id:'cyberark',name:'CyberArk Defender - PAM',title:'Defender - PAM',domain:'pam',provider:'CyberArk',level:'Intermediate / Advanced',type:'Certification'},
{id:'csslp',name:'CSSLP',title:'Certified Secure Software Lifecycle Professional',domain:'appsec',provider:'ISC2',level:'Advanced',type:'Certification'},
{id:'oscp',name:'OSCP',title:'Offensive Security Certified Professional',domain:'offensive',provider:'OffSec',level:'Advanced',type:'Certification'}
];
const ROADMAP_META={start:{title:'Ponto de partida'}};
window.DOMAINS=DOMAINS;
window.CERTS=CERTS;
window.ROADMAP_META=ROADMAP_META;
