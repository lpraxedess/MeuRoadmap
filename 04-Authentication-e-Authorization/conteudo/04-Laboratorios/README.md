# 04 — Laboratórios de Authentication & Authorization

[← Prática](../03-Pratica/README.md) · [🏠 Fase 04](../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo → Exercícios](../05-Exercicios/README.md)

> **Objetivo:** sair da explicação e comprovar capacidade técnica em ambientes reproduzíveis.

> [!IMPORTANT]
> Todo laboratório deve terminar com **resultado verificável + evidência sanitizada + diagnóstico de pelo menos uma falha**.

## 🧭 Trilha

| Lab | Foco | Entrega |
|---:|---|---|
| **01** | Authentication | fluxo, fatores, sessão e evidências |
| **02** | Authorization | RBAC/policy e decisão Allow/Deny |
| **03** | Troubleshooting | reproduzir `403`, investigar e corrigir |

## 🧪 Lab 01 — Authentication ponta a ponta

### Objetivo
Reproduzir o fluxo `usuário → aplicação → IdP → fator → contexto → sessão`.

### Faça

- [ ] Defini ambiente e pré-requisitos
- [ ] Implementei/simulei autenticação
- [ ] Testei credencial/fator válido
- [ ] Testei falha de autenticação
- [ ] Observei logs/eventos
- [ ] Validei criação e encerramento da sessão
- [ ] Documentei o fluxo

**Evidência:**

> 

## 🔐 Lab 02 — Authorization e RBAC

### Objetivo
Construir uma decisão de acesso baseada em identidade, role, permission e policy.

### Faça

- [ ] Criei sujeitos e roles
- [ ] Modelei permissions
- [ ] Defini resource + action
- [ ] Testei Allow
- [ ] Testei Deny
- [ ] Alterei uma permission e observei o impacto
- [ ] Registrei a decisão e suas evidências

**Evidência:**

> 

## 🔎 Lab 03 — Access Denied

### Cenário
Usuário autentica, mas recebe `403` ao acessar um recurso.

### Investigação

`Identidade → AuthN → Token/Sessão → Role → Permission → Policy → Resource → Logs`

- [ ] Reproduzi o erro
- [ ] Coletei evidências antes de alterar configuração
- [ ] Formulei hipóteses
- [ ] Identifiquei a causa raiz
- [ ] Apliquei a menor correção necessária
- [ ] Reproduzi o fluxo após a correção
- [ ] Confirmei que não criei privilégio excessivo

**Causa raiz:**

> 

**Correção:**

> 

**Validação:**

> 

## 📁 Padrão de cada laboratório

Cada laboratório deve conter, quando aplicável:

- objetivo
- arquitetura/fluxo
- pré-requisitos
- implementação
- testes positivos e negativos
- troubleshooting
- resultado
- evidências sanitizadas
- lições aprendidas

> [!WARNING]
> Nunca versionar credenciais, secrets, tokens, cookies, dados pessoais ou logs sensíveis reais.

## 🏁 Definition of Done

- [ ] Executei os 3 laboratórios
- [ ] Consigo reproduzir o ambiente do zero
- [ ] Documentei implementação e validação
- [ ] Testei sucesso e falha
- [ ] Resolvi pelo menos um erro de acesso
- [ ] Registrei evidências sanitizadas
- [ ] Consigo explicar o que fiz sem seguir o README

[← Prática](../03-Pratica/README.md) · [→ Exercícios](../05-Exercicios/README.md) · [🏠 Fase 04](../README.md)
