# 04 — Authentication e Authorization

**Missão:** diagnosticar por que uma identidade foi ou não autorizada.

## 1. ESTUDAR

Domine identificação, Authentication, fatores, MFA, passkeys, tokens, claims, sessões, RBAC, ABAC, policies, contexto, PDP/PEP e decisões allow/deny.

**Modelo mental:** `Identificação → Authentication → Contexto/Claims → Policy → Authorization → Recurso`.

## 2. PRATICAR

Desenhe o fluxo `usuário → aplicação → IdP → fatores → token → policy → recurso` e marque os pontos onde uma falha pode ocorrer.

## 3. APLICAR

Um usuário informa a senha correta e recebe Access Denied. Separe falhas de Authentication de falhas de Authorization e indique quais logs/evidências investigaria.

## 4. EXPLICAR

Sem consultar, explique por que uma credencial válida não garante autorização.

## 5. TESTAR

1. Diferencie identificação, autenticação e autorização.
2. Por que MFA não é simplesmente duas senhas?
3. Como claims e contexto influenciam uma policy?
4. Como investigar um Access Denied?
5. Como reduzir risco de credenciais comprometidas?
