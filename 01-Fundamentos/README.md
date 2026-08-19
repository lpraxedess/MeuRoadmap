# 01 — Fundamentos de IAM

**Missão:** construir o modelo mental que sustenta todo o restante do IAM.

## 1. ESTUDAR

Domine o essencial: identidade digital; sujeito/principal; conta; credencial; autenticação; autorização; fatores e MFA; tokens e sessões; least privilege; JML (Joiner, Mover, Leaver); entitlement; Separation of Duties (SoD).

**Modelo mental:** `Identidade → Conta/Credencial → Authentication → Contexto/Token → Policy → Authorization → Recurso → Evidência`.

## 2. PRATICAR

Crie uma matriz com cinco casos contendo: identidade, tipo, conta, recurso, permissão e justificativa de negócio. Em cada caso, remova tudo que não for necessário.

## 3. APLICAR

Cenário: um colaborador mudou de área e ainda possui acessos antigos. Identifique identidade, contas, entitlements, risco, política aplicável e evidências necessárias para corrigir o acesso.

## 4. EXPLICAR

Sem consultar, explique: **qual a diferença entre identidade, conta, credencial, Authentication e Authorization?**

## 5. TESTAR

1. Como identidade, conta, credencial e acesso se relacionam?
2. Como Authentication e Authorization se relacionam?
3. Como aplicar least privilege sem bloquear o negócio?
4. Como JML, entitlement e SoD reduzem risco?
5. Como investigar um acesso indevido?

**Avance somente se conseguir responder as cinco com raciocínio próprio.**
