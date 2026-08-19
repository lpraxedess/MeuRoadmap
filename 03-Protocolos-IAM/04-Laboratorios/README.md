# Fase 03 · Laboratórios — Protocolos IAM

> **Objetivo:** transformar SAML, OAuth 2.0 e OIDC em habilidade operacional, com implementação, validação e troubleshooting.

[← Voltar para a Fase 03](../README.md) · [← Voltar ao Roadmap](../../README.md) · [← Prática](../03-Pratica/README.md)

---

## Como usar

**Estudar → Implementar → Testar → Quebrar → Diagnosticar → Documentar → Concluir**

Não marque um laboratório como concluído apenas porque ele funcionou uma vez. Você deve conseguir explicar o fluxo, reproduzir o ambiente e diagnosticar pelo menos uma falha.

---

## Lab 01 · OIDC / OAuth 2.0

**Missão:** implementar um fluxo Authorization Code e observar os tokens envolvidos.

### Preparação

- [ ] Identifiquei Client, Authorization Server e Resource Server.
- [ ] Defini redirect URI.
- [ ] Defini scopes.
- [ ] Documentei pré-requisitos e arquitetura.

### Execução

- [ ] Executei o login.
- [ ] Capturei o fluxo de autorização.
- [ ] Obtive o authorization code.
- [ ] Troquei o code por tokens.
- [ ] Validei o acesso ao recurso protegido.

### Teste de falha

- [ ] Expirei ou invalidei um token.
- [ ] Observei a resposta de erro.
- [ ] Expliquei a causa.
- [ ] Corrigi e validei novamente.

**Minha explicação:**

> Explique o fluxo completo com suas palavras.

**Evidências:** `docs/evidencias/`

---

## Lab 02 · SAML SSO

**Missão:** simular um cenário corporativo de Single Sign-On entre IdP e Service Provider.

### Preparação

- [ ] Identifiquei IdP e SP.
- [ ] Documentei metadata e endpoints.
- [ ] Registrei certificados utilizados.
- [ ] Desenhei a arquitetura.

### Execução

- [ ] Iniciei o fluxo de login.
- [ ] Observei SAML Request.
- [ ] Observei SAML Response.
- [ ] Identifiquei a Assertion.
- [ ] Validei o acesso ao SP.

### Teste de falha

- [ ] Testei assertion inválida ou expirada.
- [ ] Identifiquei a evidência do erro.
- [ ] Corrigi a configuração.
- [ ] Revalidei o SSO.

**Minha explicação:**

> Explique o que acontece entre o primeiro acesso e a aplicação liberar o usuário.

**Evidências:** `docs/evidencias/`

---

## Lab 03 · Comparação e troubleshooting

**Missão:** usar evidências para escolher e diagnosticar protocolos.

Crie três cenários:

1. Aplicação corporativa com SSO.
2. API protegida por token.
3. Aplicação que precisa autenticar o usuário e obter identidade.

Para cada cenário:

- [ ] Escolhi o protocolo adequado.
- [ ] Justifiquei a escolha.
- [ ] Desenhei o fluxo.
- [ ] Listei os componentes envolvidos.
- [ ] Criei uma falha proposital.
- [ ] Diagnostiquei a causa raiz.
- [ ] Documentei a solução.

**Minha explicação:**

> Quando você escolheria SAML, OAuth 2.0 ou OIDC e por quê?

**Evidências:** `docs/evidencias/`

---

## Registro do laboratório

| Campo | Preencher |
|---|---|
| Data |  |
| Ambiente |  |
| Objetivo |  |
| Resultado |  |
| Erro encontrado |  |
| Causa raiz |  |
| Solução |  |
| Evidência |  |
| O que aprendi |  |

---

## Definition of Done

- [ ] Executei os 3 laboratórios.
- [ ] Consigo reproduzir pelo menos um fluxo do zero.
- [ ] Consigo explicar os protocolos sem consultar material.
- [ ] Provoquei e diagnostiquei falhas.
- [ ] Documentei arquitetura, execução e resultado.
- [ ] Registrei minhas explicações com minhas palavras.

### Próximo passo

[Exercícios →](../05-Exercicios/README.md) · [Troubleshooting →](../06-Troubleshooting/README.md)