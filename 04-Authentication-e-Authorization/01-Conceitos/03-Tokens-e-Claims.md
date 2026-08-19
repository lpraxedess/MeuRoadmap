# 03 — Tokens e Claims

[← Voltar](02-Authorization.md) · [🏠 Início](../../README.md) · [Próximo →](04-Sessoes.md)

> **Objetivo profissional:** interpretar o contexto carregado por tokens e entender como ele influencia decisões de acesso.

## 🎯 O que dominar

- access token
- ID token
- claims
- `iss`, `sub`, `aud`, `exp`
- scopes
- validade e audiência do token
- diferença entre identidade e contexto transportado

## 🧠 Você precisa conseguir

- explicar o que um token representa
- identificar issuer, subject, audience e expiration
- diferenciar access token de ID token
- explicar por que um token válido pode não conceder determinado acesso

## 🛠️ Prática guiada

Pegue um JWT de laboratório e identifique, sem expor nenhum segredo:

| Claim | Minha interpretação |
|---|---|
| `iss` | |
| `sub` | |
| `aud` | |
| `exp` | |
| `scope` | |

## 🏢 Cenário profissional

Uma API recebe um token aparentemente válido, mas rejeita a chamada. Investigue primeiro issuer, audience, expiração, scopes e policy antes de alterar a aplicação.

## 🎤 Pergunta de entrevista

> Qual a diferença entre access token e ID token?

## ✍️ Minha explicação

> Explique com suas palavras o que um token carrega e como uma API pode utilizá-lo.

## 📎 Evidência

> Registre um exemplo sanitizado ou a saída de seu laboratório.

## ✅ Validação

- [ ] Estudei o conteúdo
- [ ] Identifiquei os claims principais
- [ ] Diferenciei access token e ID token
- [ ] Interpretei um token de laboratório
- [ ] Resolvi o cenário de token rejeitado
- [ ] Respondi à pergunta sem consultar
- [ ] Registrei minha explicação

## ▶️ Próximo passo

[← Authorization](02-Authorization.md) · [Próximo → Sessões](04-Sessoes.md)