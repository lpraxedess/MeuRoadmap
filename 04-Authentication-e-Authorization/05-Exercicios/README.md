# 05 — Exercícios de Authentication & Authorization

[← Laboratórios](../04-Laboratorios/README.md) · [🏠 Fase 04](../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo → Troubleshooting](../06-Troubleshooting/README.md)

> **Objetivo:** testar retenção e raciocínio. Resolva primeiro sem consultar os módulos.

## 🧭 Regra

**Responder → Justificar → Consultar → Corrigir → Repetir sem consulta**

## 01 — Authentication

> Diferencie identificação, Authentication e Authorization. Explique onde cada etapa ocorre em uma aplicação corporativa.

**Resposta:**

> 

**Correção após consulta:**

> 

## 02 — MFA

> Por que duas senhas não constituem MFA forte? Compare conhecimento, posse e inerência.

**Resposta:**

> 

## 03 — Authorization

> Um usuário está autenticado, possui a role correta, mas recebe `403`. Liste uma sequência técnica de investigação sem simplesmente conceder mais permissões.

**Resposta:**

> 

## 04 — RBAC × ABAC

> Quando RBAC é suficiente e quando atributos/contexto tornam ABAC mais adequado? Dê um cenário corporativo para cada um.

**Resposta:**

> 

## 05 — Token e sessão

> Explique a diferença entre identidade autenticada, token/contexto e sessão. Cite pelo menos dois riscos associados ao comprometimento desses artefatos.

**Resposta:**

> 

## 🎯 Desafio integrado

Um gestor autenticado tenta aprovar um pagamento. A role permite aprovação, porém a policy exige horário comercial e valor abaixo de um limite.

Sem consultar:

- [ ] Modelei Subject, Action e Resource
- [ ] Listei claims/atributos necessários
- [ ] Escrevi a policy esperada
- [ ] Listei causas possíveis para `403`
- [ ] Defini evidências para cada hipótese
- [ ] Defini a correção mínima
- [ ] Defini como validar a correção

**Minha solução:**

> 

## 🏁 Definition of Done

- [ ] Resolvi os 5 exercícios sem consulta na primeira tentativa
- [ ] Corrigi minhas respostas com base no material
- [ ] Repeti os itens errados sem consulta
- [ ] Resolvi o desafio integrado
- [ ] Registrei os gaps para a etapa de Troubleshooting

[← Laboratórios](../04-Laboratorios/README.md) · [→ Troubleshooting](../06-Troubleshooting/README.md) · [🏠 Fase 04](../README.md)
