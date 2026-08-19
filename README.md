# MeuRoadmap

## IAM — trilha profissional

Roadmap direto para desenvolver conhecimento prático em **Identity and Access Management (IAM)**, do fundamento à arquitetura.

> **Regra:** uma fase por vez. Em cada fase: **Estude → Pratique → Aplique → Explique → Teste → Avance**.

---

## 1. Como estudar

Não existe uma árvore de dezenas de pastas nem uma lista infinita de documentos.

Para cada fase, siga sempre o mesmo ciclo:

| Etapa | Pergunta que você precisa responder |
|---|---|
| **Estude** | O que preciso entender? |
| **Pratique** | Consigo usar o conceito? |
| **Aplique** | Consigo resolver um problema real? |
| **Explique** | Consigo explicar sem consultar? |
| **Teste** | Consigo responder e justificar minhas decisões? |
| **Avance** | Demonstrei domínio suficiente para seguir? |

**Não avance por tempo ou quantidade de páginas. Avance quando conseguir demonstrar o resultado da fase.**

---

## 2. Roadmap

### Fundamentos

**01 — Fundamentos de IAM**  
Identidade, conta, credencial, autenticação, autorização, acesso, privilégio, JML e princípios básicos de IAM.

**02 — Identidade e Diretórios**  
Diretórios, Active Directory, LDAP, objetos, grupos, atributos, DNS, Kerberos, sincronização e federação.

### Controle de identidade e acesso

**03 — Protocolos IAM**  
SAML, OAuth 2.0, OpenID Connect, SCIM, LDAP, Kerberos, JWT, SSO e federação.

**04 — Authentication e Authorization**  
Autenticação, autorização, sessões, tokens, políticas, decisões de acesso e investigação de falhas.

**05 — IGA**  
Identity Governance and Administration, ciclo de vida, joiner/mover/leaver, entitlement, access review, SoD e governança.

**06 — Access Management**  
RBAC, ABAC, políticas, grupos, permissões, least privilege e controle de acesso.

**07 — PAM**  
Privileged Access Management, contas privilegiadas, elevação, JIT/JEA, cofres, sessões e auditoria.

### Ambientes modernos

**08 — Cloud IAM**  
Identidades cloud, roles, policies, workloads, federation, service identities e controle de privilégios.

**09 — CIAM**  
Customer Identity and Access Management, identidade de clientes, registro, login, consentimento, MFA e experiência segura.

**10 — Zero Trust e ITDR**  
Zero Trust, sinais de identidade, risco, detecção, investigação e resposta a ameaças relacionadas à identidade.

### Engenharia e arquitetura

**11 — Automação e DevSecOps**  
IAM como código, APIs, provisioning, pipelines, secrets, automação, testes e controles de segurança.

**12 — Arquitetura IAM**  
Integração de diretórios, IdP, IGA, PAM, CIAM, cloud, aplicações, protocolos, governança e desenho de uma arquitetura corporativa.

---

## 3. Critério de conclusão

Uma fase está concluída somente quando você consegue:

- explicar os conceitos principais sem decorar definições;
- executar a prática proposta;
- resolver um cenário profissional;
- justificar suas decisões de acesso ou segurança;
- explicar como o tema se relaciona com as fases anteriores;
- responder perguntas de entrevista sobre o assunto.

Se não conseguir, **volte ao ponto que falhou e repita o ciclo**.

---

## 4. Resultado esperado

Ao finalizar o roadmap, você deverá conseguir analisar uma arquitetura IAM corporativa e raciocinar sobre:

```text
Identidade
   ↓
Diretório / IdP
   ↓
Autenticação
   ↓
Autorização
   ↓
Acesso
   ↓
Governança
   ↓
Privilégio
   ↓
Detecção e resposta
   ↓
Automação
   ↓
Arquitetura
```

O objetivo não é memorizar produtos ou definições isoladas. É **entender o problema, escolher o controle adequado, implementar ou investigar e explicar a decisão**.

---

## 5. Ordem obrigatória

```text
01 Fundamentos
      ↓
02 Identidade e Diretórios
      ↓
03 Protocolos IAM
      ↓
04 Authentication e Authorization
      ↓
05 IGA
      ↓
06 Access Management
      ↓
07 PAM
      ↓
08 Cloud IAM
      ↓
09 CIAM
      ↓
10 Zero Trust e ITDR
      ↓
11 Automação e DevSecOps
      ↓
12 Arquitetura IAM
```

**Comece pela Fase 01. Não crie uma estrutura paralela de estudos. Este README é a fonte única do roadmap.**
