# Fase 03 · Troubleshooting — Protocolos IAM

> **Objetivo:** aprender a diagnosticar falhas de autenticação e integração seguindo evidências, não tentativa e erro.

[← Voltar para a Fase 03](../README.md) · [← Voltar ao Roadmap](../../README.md) · [← Exercícios](../05-Exercicios/README.md)

---

## Método de investigação

Use sempre esta sequência:

**Sintoma → hipótese → evidência → teste → causa raiz → correção → validação → registro**

Não pule diretamente para a solução.

---

## Incidente 01 · SAML — Login retorna erro

### Sintoma

O usuário autentica no IdP, mas a aplicação rejeita a resposta SAML.

### Investigue

- [ ] Confirmei o horário do sistema.
- [ ] Verifiquei `Issuer`.
- [ ] Verifiquei `Audience`.
- [ ] Verifiquei `Recipient`.
- [ ] Verifiquei `ACS URL`.
- [ ] Verifiquei validade de `NotBefore` e `NotOnOrAfter`.
- [ ] Verifiquei assinatura.
- [ ] Verifiquei NameID e atributos.
- [ ] Comparei a configuração do IdP com a do SP.

**Minha hipótese inicial:**

> 

**Evidências:**

> 

**Causa raiz:**

> 

**Correção:**

> 

---

## Incidente 02 · OIDC — Redirect URI inválida

### Sintoma

O usuário inicia o login, mas o Authorization Server rejeita a requisição por causa da redirect URI.

### Investigue

- [ ] Identifiquei a `redirect_uri` enviada.
- [ ] Comparei com a URI cadastrada no client.
- [ ] Verifiquei diferenças de protocolo (`http`/`https`).
- [ ] Verifiquei domínio, porta e caminho.
- [ ] Verifiquei se existe wildcard indevido.
- [ ] Expliquei por que validação exata reduz risco de ataque.

**Hipótese:**

> 

**Evidência:**

> 

**Causa raiz:**

> 

**Correção:**

> 

---

## Incidente 03 · OAuth 2.0 — API retorna 401

### Sintoma

O cliente recebeu um token, mas a API responde `401 Unauthorized`.

### Investigue

- [ ] Confirmei se o token foi enviado.
- [ ] Verifiquei o esquema `Bearer`.
- [ ] Verifiquei expiração.
- [ ] Verifiquei issuer.
- [ ] Verifiquei audience.
- [ ] Verifiquei assinatura.
- [ ] Verifiquei scopes.
- [ ] Diferenciei falha de autenticação de falha de autorização.

**Minha hipótese:**

> 

**Evidências:**

> 

**Causa raiz:**

> 

**Correção:**

> 

---

## Incidente 04 · OAuth 2.0 — API retorna 403

### Sintoma

O token é aceito, mas a operação solicitada é recusada.

### Investigue

- [ ] Confirmei que o token é válido.
- [ ] Analisei scopes/permissions.
- [ ] Verifiquei policy da API.
- [ ] Verifiquei role/entitlement do usuário quando aplicável.
- [ ] Expliquei por que `401` e `403` representam problemas diferentes.

**Causa raiz:**

> 

**Correção:**

> 

---

## Incidente 05 · Discovery / JWKS

### Sintoma

Uma aplicação deixou de validar tokens depois de uma alteração no ambiente do IdP.

### Investigue

- [ ] Verifiquei o issuer.
- [ ] Verifiquei o endpoint de discovery.
- [ ] Verifiquei o JWKS URI.
- [ ] Verifiquei se a chave usada para assinatura está publicada.
- [ ] Verifiquei rotação de chaves.
- [ ] Verifiquei cache de chaves.
- [ ] Avaliei se a aplicação está confiando no issuer correto.

**Hipótese:**

> 

**Evidências:**

> 

**Causa raiz:**

> 

---

## Registro de incidente real

Use este modelo quando encontrar um problema durante um laboratório.

| Campo | Registro |
|---|---|
| Data |  |
| Sistema |  |
| Sintoma |  |
| Hipótese |  |
| Evidências |  |
| Testes realizados |  |
| Causa raiz |  |
| Correção |  |
| Validação |  |
| Lição aprendida |  |

---

## Definition of Done

- [ ] Resolvi os 5 incidentes.
- [ ] Em cada incidente, registrei hipótese e evidência.
- [ ] Consigo diferenciar falhas de AuthN e AuthZ.
- [ ] Consigo investigar SAML sem seguir um roteiro pronto.
- [ ] Consigo investigar OAuth/OIDC usando os dados do fluxo.
- [ ] Registrei pelo menos um troubleshooting real de laboratório.

### Próximo passo

[Checklist →](../07-Checklist/README.md) · [Revisão →](../08-Revisao/README.md)