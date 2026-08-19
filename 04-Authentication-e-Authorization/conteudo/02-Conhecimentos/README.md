# 02 — Conhecimentos de Authentication & Authorization

[← Fase 04](../README.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo → Prática](../03-Pratica/README.md)

> **Objetivo:** transformar os conceitos em um modelo técnico coerente antes de implementar ou diagnosticar.

> [!IMPORTANT]
> Esta etapa responde **como os mecanismos funcionam**. A anterior respondeu **o que são**; a próxima exige **aplicação**.

---

## 🧭 Trilha

`01 AuthN → 02 Tokens/Sessões → 03 AuthZ → 04 Decisão → 05 Segurança → Validação`

## 🔁 Método

**Estude → conecte ao fluxo → explique sem consultar → registre dúvidas → valide → avance.**

---

## 01 — Mecanismos de autenticação

- [ ] Senha e política de senha
- [ ] MFA e autenticação adaptativa
- [ ] OTP e fatores de autenticação
- [ ] Certificados e autenticação baseada em chave
- [ ] Passkeys / WebAuthn
- [ ] Passwordless

| Mecanismo | O que prova | Risco reduzido | Limitação |
|---|---|---|---|
| Senha | | | |
| OTP | | | |
| Certificado | | | |
| Passkey | | | |

**Minha explicação:**

> Explique fator, método e política de autenticação.

---

## 02 — Tokens e sessões

- [ ] Access token
- [ ] Refresh token
- [ ] ID token
- [ ] Sessão
- [ ] Expiração e renovação
- [ ] Revogação
- [ ] Cookies e armazenamento

`Authentication → emissão de contexto → access/session → recurso → expiração/renovação → encerramento`

**Exercício:** explique por que autenticar novamente e renovar um token não são necessariamente a mesma operação.

**Minha explicação:**

> Registre o fluxo e o que ocorre quando cada elemento expira.

---

## 03 — Autorização

- [ ] Permission
- [ ] Role
- [ ] Policy
- [ ] Scope
- [ ] Claim
- [ ] ACL
- [ ] RBAC
- [ ] ABAC
- [ ] Policy-Based Access Control

`Subject + Action + Resource + Context → Policy Evaluation → Allow/Deny`

| Termo | Representa | Exemplo próprio |
|---|---|---|
| Permission | | |
| Role | | |
| Policy | | |
| Scope | | |
| Claim | | |
| ACL | | |

**Minha explicação:**

> Explique por que role, permission, scope e claim não são sinônimos.

---

## 04 — Decisão de acesso

- [ ] Subject
- [ ] Resource
- [ ] Action
- [ ] Contexto
- [ ] Policy evaluation
- [ ] Allow / Deny
- [ ] Default deny
- [ ] Least privilege

**Cenário:** um usuário solicita `aprovar pagamento` no recurso `pedido 123`.

| Elemento | Minha resposta |
|---|---|
| Subject | |
| Action | |
| Resource | |
| Contexto | |
| Policies aplicáveis | |
| Condições | |
| Resultado esperado | |
| Evidência da decisão | |

**Minha resposta:**

> Explique a decisão passo a passo, sem pular diretamente para a permissão.

---

## 05 — Segurança e falhas comuns

| Ameaça | Onde atua | Controle | Evidência |
|---|---|---|---|
| Credential stuffing | | | |
| Brute force | | | |
| Phishing | | | |
| Session hijacking | | | |
| Token theft | | | |
| Privilege escalation | | | |
| Excessive permissions | | | |
| Broken access control | | | |

**Exercício:** escolha duas ameaças e explique **prevenção + detecção + contenção** para cada uma.

**Minha explicação:**

> Registre o raciocínio, não apenas a definição.

---

## 🔗 Integração dos conhecimentos

```text
Identidade
   ↓
Authentication
   ↓
Token / Sessão / Contexto
   ↓
Subject + Action + Resource
   ↓
Policy Evaluation
   ↓
Authorization
   ↓
Allow / Deny
   ↓
Recurso + Logs
```

Explique onde uma falha de AuthN, uma falha de AuthZ e um abuso de privilégio aparecem nesse fluxo.

## 🎯 Definition of Done

- [ ] Explico mecanismos de autenticação e trade-offs
- [ ] Explico access token, refresh token, ID token e sessão
- [ ] Explico expiração, renovação e revogação
- [ ] Diferencio permission, role, policy, scope e claim
- [ ] Explico RBAC, ABAC e policy-based access control
- [ ] Modelo decisão com subject, action, resource e contexto
- [ ] Relaciono ameaças a controles e evidências
- [ ] Reconstruo o fluxo completo sem consultar
- [ ] Registrei minhas explicações próprias
- [ ] Tenho evidência para os pontos que ainda preciso praticar

## 📝 Registro de estudo

**O que aprendi:**

> 

**O que ainda confundo:**

> 

**O que preciso praticar:**

> 

**Evidência / laboratório relacionado:**

> 

**Data da revisão:**

> 

> [!TIP]
> Ao terminar, vá para **Prática** e aplique o fluxo em cenários reais.

## ▶️ Próximo passo

[← Conceitos](../01-Conceitos/README.md) · [🧪 Prática](../03-Pratica/README.md) · [🏠 Fase 04](../README.md)
