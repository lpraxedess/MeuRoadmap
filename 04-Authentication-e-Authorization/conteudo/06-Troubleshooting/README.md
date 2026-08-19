# 06 — Troubleshooting de Authentication & Authorization

[← Exercícios](../05-Exercicios/README.md) · [🏠 Fase 04](../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo → Checklist](../07-Checklist/README.md)

> **Objetivo:** diagnosticar falhas de acesso por evidência, não por tentativa e erro.

## 🔎 Ordem de investigação

`Identidade → AuthN → Token/Sessão → Role → Permission → Policy → Resource → Logs`

> [!IMPORTANT]
> Primeiro reproduza e colete evidências. Só depois altere configuração.

## 🧰 Registro de incidente

### 01 — Identificação

**Sintoma:**

> 

**Usuário/subject sanitizado:**

> 

**Recurso + ação:**

> 

### 02 — Hipóteses

| # | Hipótese | Evidência esperada | Resultado |
|---:|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### 03 — Diagnóstico

**Causa raiz:**

> 

**Evidência decisiva:**

> 

### 04 — Correção

**Menor alteração necessária:**

> 

**Risco da alteração:**

> 

### 05 — Validação

- [ ] Reproduzi o erro antes da correção
- [ ] Apliquei somente a correção necessária
- [ ] O acesso legítimo funciona
- [ ] O acesso indevido continua bloqueado
- [ ] Registrei evidência pós-correção

## 🎯 Cenários obrigatórios

### Cenário A — Autentica, mas recebe 403

- [ ] Separei Authentication de Authorization
- [ ] Verifiquei token/sessão
- [ ] Verifiquei role/permission
- [ ] Verifiquei policy
- [ ] Verifiquei recurso/ação
- [ ] Consultei logs/eventos

### Cenário B — MFA bloqueia acesso

- [ ] Verifiquei método/fator
- [ ] Verifiquei política de autenticação
- [ ] Verifiquei sinais de risco
- [ ] Identifiquei evidência do bloqueio

### Cenário C — Acesso funciona para um usuário e não para outro

- [ ] Comparei identidade/atributos
- [ ] Comparei roles
- [ ] Comparei permissions
- [ ] Comparei contexto/policy
- [ ] Identifiquei a diferença causal

## 🧠 Lição aprendida

> 

## 🏁 Definition of Done

- [ ] Registrei pelo menos 3 incidentes/cenários
- [ ] Cada diagnóstico possui evidência
- [ ] Evitei conceder privilégios como método de investigação
- [ ] Validei correções com testes positivos e negativos
- [ ] Consigo explicar minha linha de raciocínio

> [!WARNING]
> Não registre tokens, cookies, secrets, credenciais ou dados pessoais reais.

[← Exercícios](../05-Exercicios/README.md) · [→ Checklist](../07-Checklist/README.md) · [🏠 Fase 04](../README.md)
