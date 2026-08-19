# 03 — Protocolos IAM

**Missão:** escolher e diagnosticar os protocolos que transportam identidade, autenticação e autorização.

## 1. ESTUDAR

Domine SAML, OAuth 2.0, OpenID Connect, SCIM, LDAP, Kerberos, federation, SSO, JWT, tokens, claims e endpoints.

**Modelo mental:** `Identidade → Protocolo → Mensagem/Token → Serviço consumidor → Decisão`.

## 2. PRATICAR

Desenhe um fluxo SSO e um fluxo de provisioning. Identifique participantes, mensagens, tokens e confiança.

## 3. APLICAR

Um usuário não consegue entrar em uma aplicação federada. Investigue IdP, redirect/ACS, issuer, audience, assinatura, relógio, claims e logs.

## 4. EXPLICAR

Sem consultar, escolha entre SAML, OAuth 2.0, OIDC e SCIM para quatro necessidades diferentes e justifique.

## 5. TESTAR

1. Quando usar SAML, OAuth 2.0, OIDC e SCIM?
2. Qual a diferença entre autenticação e autorização em OAuth/OIDC?
3. Para que SCIM serve?
4. Como JWT participa de uma decisão de acesso?
5. Como investigar uma falha de SSO?
