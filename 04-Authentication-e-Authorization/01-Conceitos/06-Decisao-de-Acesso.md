# 06 — Decisão de Acesso

[← Controle de Acesso](05-Controle-de-Acesso.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo →](07-Seguranca.md)

> **Objetivo profissional:** diagnosticar uma decisão de acesso ponta a ponta usando evidências antes de alterar permissões.

> [!IMPORTANT]
> **Regra operacional:** não conceda acesso para "testar" a hipótese. Primeiro localize a etapa que produz a decisão.

---

## 🧭 Fluxo deste tópico

**Reproduzir → Delimitar → Coletar evidências → Localizar a falha → Corrigir → Validar → Registrar → Avançar**

## 🧠 Modelo mental

`Identidade → Authentication → Token/Contexto → Policy → Authorization → Recurso → Resultado`

| Etapa | Pergunta | Evidência típica |
|---|---|---|
| Identidade | Quem solicita? | ID, grupo, atributos |
| Authentication | A identidade foi autenticada? | evento AuthN, método, MFA |
| Token/Contexto | Qual contexto chegou? | `iss`, `aud`, `exp`, scopes/claims |
| Policy | Qual regra deveria valer? | policy, role, condição |
| Authorization | A regra permite a ação? | decisão `Allow/Deny`, motivo |
| Recurso | O recurso recebeu a requisição? | logs da API/serviço |

## 🔎 1. Classifique primeiro

Antes de corrigir, diferencie:

- **401** → investigue autenticação, credencial, token ou validação de identidade/contexto.
- **403** → autenticação pode ter ocorrido, mas o acesso foi negado por autorização/policy ou regra equivalente.

> O código HTTP orienta a investigação; não substitui a análise dos logs e da arquitetura.

## 🛠️ 2. Prática guiada — Access Denied

Cenário: um usuário acessa a aplicação normalmente, mas uma única ação retorna `403`.

Preencha:

| Passo | Pergunta | Minha evidência |
|---|---|---|
| 1 | Qual usuário/subject? | |
| 2 | Qual recurso e ação? | |
| 3 | A autenticação foi concluída? | |
| 4 | O token/contexto é válido e destinado ao recurso? | |
| 5 | Qual role/claim/scope/policy deveria participar? | |
| 6 | Existe `Deny` ou condição não satisfeita? | |
| 7 | Onde a decisão foi produzida? | |
| 8 | Qual correção mínima resolve? | |
| 9 | Como comprovar que não ampliou privilégio? | |

### Regra de investigação

`Sintoma → Evidência → Hipótese → Teste seguro → Causa → Correção mínima → Revalidação`

## 🧪 3. Desafio — três hipóteses

Considere que o usuário possui a role aparentemente correta. Investigue três hipóteses diferentes:

1. policy exige um atributo que o usuário não possui;
2. token não contém o scope/claim esperado;
3. existe uma regra de `Deny` ou condição contextual.

Para cada uma, registre **qual evidência confirmaria e qual evidência descartaria** a hipótese.

## 🏢 4. Cenário profissional

Chamado recebido:

> "O usuário está autenticando normalmente, mas não consegue aprovar pagamentos. Preciso que você dê acesso imediatamente."

Produza:

`Sintoma → Impacto → Evidências → Causa → Correção → Risco residual → Validação`

A correção deve ser a menor alteração capaz de atender ao requisito legítimo.

## 🎤 5. Pergunta de entrevista

> **Como você investigaria um Access Denied sem simplesmente adicionar permissões?**

Responda usando o fluxo completo e cite pelo menos três evidências concretas.

## ✍️ 6. Minha explicação

> **Uma decisão de acesso começa por...**
>
> **Eu separo AuthN de AuthZ porque...**
>
> **Diante de um 403 eu verificaria...**
>
> **Antes de alterar uma permissão eu preciso provar...**
>
> **Minha correção mínima seria...**

## 📎 7. Minha evidência

- **Matriz de investigação:** `a preencher`
- **Hipóteses testadas:** `a preencher`
- **Logs/evidências sanitizados:** `a preencher`
- **Diagnóstico final:** `a preencher`
- **Correção e validação:** `a preencher`
- **Explicação própria:** `a preencher`

> [!WARNING]
> Nunca registre tokens, cookies, session IDs, secrets ou dados pessoais reais.

## ✅ 8. Validação

- [ ] Reproduzi ou modelei um caso de acesso negado
- [ ] Diferenciei 401 e 403 no contexto do cenário
- [ ] Segui o fluxo completo de decisão
- [ ] Identifiquei pelo menos três hipóteses
- [ ] Usei evidências para confirmar/descartar hipóteses
- [ ] Evitei conceder privilégio como teste
- [ ] Defini uma correção mínima
- [ ] Validei o resultado após a correção
- [ ] Respondi à entrevista sem consultar
- [ ] Registrei evidências sanitizadas
- [ ] Escrevi minha explicação própria

## 🏁 Critério para avançar

Avance quando conseguir reconstruir uma decisão usando:

`Subject → Authentication → Token/Contexto → Policy → Authorization → Resource → Result`

e apontar **onde**, **por que** e **com qual evidência** o acesso foi permitido ou negado.

## ▶️ Próximo passo

[← Controle de Acesso](05-Controle-de-Acesso.md) · [📚 Índice de Conceitos](README.md) · [Próximo → Segurança](07-Seguranca.md)
