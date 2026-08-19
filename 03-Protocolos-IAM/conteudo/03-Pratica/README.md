# Fase 03 · Prática — Protocolos IAM

> **Objetivo:** sair da teoria e provar que você consegue implementar, testar e diagnosticar protocolos de IAM.

[← Voltar para a Fase 03](../README.md) · [← Voltar ao Roadmap](../../README.md)

---

## Como usar

1. Leia o objetivo.
2. Tente executar sem copiar uma solução pronta.
3. Registre resultado, erros e evidências.
4. Marque `[x]` somente quando conseguir repetir sozinho.
5. Escreva em **Minha explicação** o que você entendeu com suas palavras.
6. Avance para o próximo exercício.

> **Regra:** concluído = executar + explicar + apresentar evidência.

---

## Exercício 01 · Fluxo de autenticação

**Objetivo:** visualizar o caminho do usuário até o recurso.

- [ ] Desenhei usuário → cliente → IdP → aplicação → recurso.
- [ ] Identifiquei onde ocorre Authentication.
- [ ] Identifiquei onde ocorre Authorization.
- [ ] Expliquei o fluxo sem consultar material.

**Minha explicação:**

> Escreva aqui, com suas palavras, como o fluxo funciona.

**Evidência:** `docs/evidencias/`

---

## Exercício 02 · OIDC / OAuth 2.0

**Objetivo:** entender autenticação e autorização delegada na prática.

- [ ] Identifiquei Client, Resource Owner, Authorization Server e Resource Server.
- [ ] Identifiquei Access Token e ID Token.
- [ ] Executei um fluxo Authorization Code.
- [ ] Expliquei por que OAuth 2.0 não é, sozinho, um protocolo de autenticação.

**Minha explicação:**

> Registre aqui a diferença entre OAuth 2.0 e OpenID Connect.

**Evidência:** `docs/evidencias/`

---

## Exercício 03 · SAML SSO

**Objetivo:** compreender um login federado baseado em SAML.

- [ ] Identifiquei IdP e SP.
- [ ] Identifiquei SAML Request e SAML Response.
- [ ] Identifiquei Assertion.
- [ ] Desenhei o fluxo completo.
- [ ] Expliquei o que acontece quando a assertion é inválida ou expira.

**Minha explicação:**

> Explique o fluxo SAML como se estivesse ensinando outra pessoa.

**Evidência:** `docs/evidencias/`

---

## Exercício 04 · Troubleshooting de protocolo

**Objetivo:** diagnosticar um erro usando evidências, não tentativa e erro.

Escolha um cenário: token expirado, audience incorreta, redirect URI inválida, assinatura SAML inválida ou scope insuficiente.

- [ ] Registrei o sintoma.
- [ ] Formulei uma hipótese.
- [ ] Coletei evidências.
- [ ] Identifiquei a causa raiz.
- [ ] Corrigi o problema.
- [ ] Validei novamente o fluxo.

**Minha explicação:**

> O que causou o problema e como você descobriu?

**Evidência:** `docs/evidencias/`

---

## Exercício 05 · Comparação de protocolos

Preencha sem copiar e depois justifique suas escolhas.

| Critério | SAML | OAuth 2.0 | OIDC |
|---|---|---|---|
| Finalidade |  |  |  |
| Principal uso |  |  |  |
| Token / Assertion |  |  |  |
| Autenticação |  |  |  |
| Autorização |  |  |  |
| Cenário corporativo |  |  |  |

- [ ] Preenchi sem copiar.
- [ ] Revisei meus erros.
- [ ] Consigo justificar quando usar cada protocolo.

**Minha explicação:**

> Qual protocolo você escolheria em cada cenário e por quê?

---

## Definition of Done

A prática está pronta quando:

- [ ] Consigo executar os fluxos principais sem tutorial.
- [ ] Consigo explicar SAML, OAuth 2.0 e OIDC.
- [ ] Consigo diferenciar Authentication de Authorization.
- [ ] Consigo diagnosticar pelo menos um erro de protocolo.
- [ ] Tenho evidências documentadas.
- [ ] Consigo explicar minhas decisões com minhas próprias palavras.

**Próximo passo:** [Laboratórios →](../04-Laboratorios/README.md)