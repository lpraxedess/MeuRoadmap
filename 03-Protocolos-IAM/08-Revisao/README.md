# Fase 03 · Revisão e Validação

> **Objetivo:** descobrir o que você realmente domina antes de avançar para a Fase 04.

[← Voltar para a Fase 03](../README.md) · [← Roadmap](../../README.md) · [Checklist →](../07-Checklist/README.md)

---

## Como fazer

1. Faça a revisão **sem consultar** o material.
2. Escreva respostas curtas com suas próprias palavras.
3. Marque onde teve dificuldade.
4. Refaça apenas o que falhou.
5. Execute novamente um laboratório ou troubleshooting relacionado.
6. Volte ao checklist e atualize seu domínio.

---

## 01 · Perguntas essenciais

### SAML

**Explique o fluxo de autenticação SAML do usuário até a aplicação.**

> 

**Quais são os papéis de IdP e SP?**

> 

### OAuth 2.0

**Qual problema o OAuth 2.0 resolve?**

> 

**Quando você usaria Client Credentials?**

> 

### OIDC

**O que o OIDC adiciona ao OAuth 2.0?**

> 

**Qual a função do ID Token?**

> 

### Tokens

**Explique `iss`, `sub`, `aud`, `exp` e `scope`.**

> 

### HTTP

**Qual a diferença prática entre `401` e `403`?**

> 

---

## 02 · Cenário corporativo

Uma empresa possui:

- colaboradores internos;
- aplicações SaaS;
- um IdP central;
- APIs internas;
- aplicações legadas que utilizam SAML;
- novas aplicações que utilizam OIDC.

### Sua tarefa

Desenhe ou descreva uma arquitetura mostrando:

`Usuário → IdP → Aplicação → Token/Assertion → API → Recurso`

Explique onde entram:

- autenticação;
- autorização;
- SAML;
- OAuth 2.0;
- OIDC;
- tokens;
- claims;
- scopes;
- políticas.

**Minha solução:**

> 

---

## 03 · Troubleshooting final

### Incidente

O usuário consegue autenticar no IdP, mas a aplicação retorna `403`.

### Resolva sem consultar

**Hipótese inicial:**

> 

**Evidências que eu coletaria:**

> 

**O que verificaria no token/assertion:**

> 

**Possíveis causas:**

> 

**Correção:**

> 

**Como validaria:**

> 

---

## 04 · Laboratório de recuperação

Escolha o assunto em que você teve maior dificuldade e refaça um laboratório relacionado.

**Assunto escolhido:**

> 

**O que estava errado:**

> 

**O que fiz para corrigir:**

> 

**O que aprendi:**

> 

---

## 05 · Autoavaliação

| Capacidade | Status |
|---|---|
| Explicar SAML | [ ] |
| Explicar OAuth 2.0 | [ ] |
| Explicar OIDC | [ ] |
| Interpretar tokens | [ ] |
| Diferenciar 401/403 | [ ] |
| Desenhar fluxo IAM | [ ] |
| Investigar falhas | [ ] |
| Explicar cenário corporativo | [ ] |

### Minha maior lacuna

> 

### O que vou revisar

> 

---

## 06 · Resultado

### 🟢 DOMÍNIO

- [ ] Respondi sem consultar.
- [ ] Resolvi o cenário corporativo.
- [ ] Resolvi o troubleshooting.
- [ ] Refiz o laboratório necessário.
- [ ] Registrei minha principal lacuna.
- [ ] Atualizei o checklist.

**Decisão:** pronto para avançar para a próxima fase.

### 🟡 REVISAR

Se algum ponto essencial falhou, volte ao módulo correspondente, pratique e repita esta revisão.

### 🔴 NÃO DOMINADO

Não avance por completar documentos. Avance quando conseguir **explicar + aplicar + diagnosticar**.

---

## Registro

**Data da revisão:**  

> 

**Resultado:**  

> 

**Próxima revisão:**  

> 

[← Voltar para a Fase 03](../README.md) · [Checklist →](../07-Checklist/README.md)