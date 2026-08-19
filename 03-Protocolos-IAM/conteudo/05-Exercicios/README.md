# Fase 03 · Exercícios — Protocolos IAM

> **Objetivo:** provar que você consegue raciocinar sobre protocolos IAM sem depender de respostas prontas.

[← Voltar para a Fase 03](../README.md) · [← Voltar ao Roadmap](../../README.md) · [← Laboratórios](../04-Laboratorios/README.md)

---

## Como usar

**Tente sozinho → registre a resposta → consulte → corrija → explique novamente.**

O exercício só vale como concluído quando você consegue justificar a resposta com suas próprias palavras.

---

## Exercício 01 · Escolha o protocolo

### Cenário

Uma empresa possui uma aplicação corporativa que precisa oferecer SSO para funcionários usando um provedor de identidade central.

- [ ] Escolhi SAML, OAuth 2.0 ou OIDC.
- [ ] Justifiquei minha escolha.
- [ ] Identifiquei os participantes do fluxo.
- [ ] Desenhei o fluxo.

**Minha resposta:**

> 

**Após estudar:**

> 

---

## Exercício 02 · OAuth 2.0

Uma aplicação precisa acessar uma API em nome de um usuário autenticado.

Explique:

- [ ] Quem é o Client.
- [ ] Quem é o Resource Owner.
- [ ] Quem é o Authorization Server.
- [ ] Quem é o Resource Server.
- [ ] Qual é a função do access token.
- [ ] Por que o client secret não deve ser tratado como senha do usuário.

**Minha explicação:**

> 

---

## Exercício 03 · OIDC

Uma aplicação precisa autenticar um usuário e descobrir sua identidade.

- [ ] Expliquei por que OAuth 2.0 sozinho não resolve autenticação de usuário.
- [ ] Expliquei o papel do ID Token.
- [ ] Diferenciei ID Token e Access Token.
- [ ] Expliquei o papel do UserInfo Endpoint.
- [ ] Desenhei o fluxo Authorization Code.

**Minha explicação:**

> 

---

## Exercício 04 · SAML troubleshooting

Um usuário consegue chegar ao IdP, mas a aplicação retorna erro após o login.

Investigue como um analista IAM:

- [ ] Verifiquei issuer.
- [ ] Verifiquei audience.
- [ ] Verifiquei validade temporal.
- [ ] Verifiquei assinatura.
- [ ] Verifiquei ACS URL.
- [ ] Verifiquei atributos/claims esperados.
- [ ] Identifiquei a causa raiz.

**Causa encontrada:**

> 

**Correção:**

> 

---

## Exercício 05 · Cenário corporativo

Uma empresa está migrando aplicações legadas para uma arquitetura moderna de identidade.

Existem:

- aplicações web corporativas;
- APIs;
- usuários internos;
- aplicações SaaS;
- um IdP central.

Projete uma estratégia de protocolos.

- [ ] Classifiquei cada tipo de aplicação.
- [ ] Escolhi o protocolo adequado para cada cenário.
- [ ] Justifiquei cada escolha.
- [ ] Desenhei a arquitetura.
- [ ] Identifiquei riscos.
- [ ] Expliquei como eu validaria a implementação.

**Minha arquitetura:**

> 

---

## Desafio final · Explique sem consultar

Responda de memória:

1. Qual a diferença entre SAML, OAuth 2.0 e OIDC?
2. O que um access token representa?
3. O que um ID Token representa?
4. Quem valida o token?
5. Qual problema SSO resolve?
6. Qual problema federation resolve?
7. Quando uma API deve usar OAuth 2.0?

- [ ] Respondi sem consultar.
- [ ] Corrigi meus erros.
- [ ] Reescrevi as respostas com minhas palavras.
- [ ] Consigo explicar verbalmente sem roteiro.

---

## Registro de aprendizagem

| Campo | Registro |
|---|---|
| Maior dificuldade |  |
| Conceito que confundi |  |
| Erro mais importante |  |
| O que finalmente entendi |  |
| O que preciso revisar |  |

## Definition of Done

- [ ] 5 exercícios concluídos.
- [ ] Desafio final concluído.
- [ ] Respostas revisadas.
- [ ] Consigo explicar os protocolos sem consultar.
- [ ] Registrei meus principais erros e aprendizados.

### Próximo passo

[Checklist →](../07-Checklist/README.md) · [Troubleshooting →](../06-Troubleshooting/README.md)