# 03 — Tokens e Claims

[← Authorization](02-Authorization.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo →](04-Sessoes.md)

> **Objetivo profissional:** interpretar o contexto carregado por tokens e entender como ele influencia decisões de acesso.

> [!IMPORTANT]
> Trabalhe sempre com tokens de laboratório ou dados sanitizados. Nunca cole credenciais, tokens reais ou segredos neste repositório.

---

## 🧭 Fluxo deste tópico

**Estudar → Inspecionar → Interpretar → Diagnosticar → Explicar → Validar → Registrar evidência → Próximo tópico**

---

## 🎯 O que dominar

- access token
- ID token
- claims
- `iss`, `sub`, `aud`, `exp`
- scopes
- validade e audiência
- diferença entre identidade e contexto transportado
- relação entre token e decisão de autorização

## 🧠 Você precisa conseguir

Ao terminar, você deve conseguir:

- explicar o que um token representa no fluxo de acesso;
- identificar issuer, subject, audience e expiration;
- diferenciar access token de ID token;
- interpretar scopes sem confundi-los com roles;
- explicar por que um token válido pode não conceder determinado acesso;
- diagnosticar uma rejeição de token seguindo evidências, não tentativa e erro.

---

## 🔍 1. Prática guiada — inspeção de JWT

Use um JWT **de laboratório** e analise seu conteúdo sem publicar o valor completo.

| Claim | O que representa | Minha interpretação |
|---|---|---|
| `iss` | emissor | |
| `sub` | sujeito/identidade | |
| `aud` | audiência pretendida | |
| `exp` | expiração | |
| `scope` | escopos concedidos | |

Depois responda:

1. Quem emitiu o token?
2. Para quem ele foi emitido?
3. Quem/qual identidade ele representa?
4. Quando deixa de ser válido?
5. Quais operações ou escopos ele indica?

### Evidência esperada

Registre apenas os claims e interpretações necessários. **Não registre o token bruto.**

---

## 🧩 2. Access token x ID token

Explique a diferença usando este raciocínio:

| Pergunta | Access token | ID token |
|---|---|---|
| Principal finalidade | acesso a recurso protegido | informação sobre autenticação do usuário |
| Consumidor típico | API/resource server | cliente da aplicação |
| Deve ser enviado à API como credencial de acesso? | depende do protocolo/arquitetura, mas é destinado ao recurso | não como substituto do access token |
| Relação com autorização | pode carregar contexto usado pela API | não é a credencial destinada a autorizar chamadas à API |

**Exercício:** explique essa diferença sem usar apenas as definições acima.

---

## 🔎 3. Diagnóstico — token rejeitado

Uma API recebe um token aparentemente válido, mas rejeita a chamada.

Investigue nesta ordem:

1. O token ainda está dentro de `exp`?
2. O `iss` corresponde ao emissor confiável?
3. O `aud` corresponde à API/recurso esperado?
4. A assinatura foi validada corretamente?
5. O token possui os `scope` necessários?
6. Existe alguma policy adicional?
7. Há diferença entre autenticação válida e autorização permitida?

### Regra de diagnóstico

**Não altere a policy antes de verificar o token e o contexto da requisição.**

Documente:

- sintoma;
- evidência observada;
- hipótese;
- causa;
- correção;
- validação posterior.

---

## 🏢 4. Cenário profissional

Uma API corporativa retorna `401` para uma chamada que deveria ser permitida.

Sua tarefa é determinar se o problema está relacionado a:

- token ausente ou malformado;
- assinatura inválida;
- emissor incorreto;
- audiência incorreta;
- token expirado;
- contexto insuficiente;
- ou uma decisão posterior de autorização.

### Resultado esperado

Produza uma pequena árvore de diagnóstico e indique quais evidências diferenciariam cada hipótese.

---

## 🎤 5. Pergunta de entrevista

> **Qual a diferença entre access token e ID token e por que uma API não deve tratar um ID token como access token?**

Responda sem consultar e dê um exemplo de uma aplicação corporativa.

---

## ✍️ 6. Minha explicação

Complete com suas próprias palavras:

> **Um token é...**
>
> **`iss`, `sub`, `aud` e `exp` representam...**
>
> **Access token e ID token diferem porque...**
>
> **Um token válido pode resultar em `Access Denied` quando...**
>
> **Ao receber um `401`, eu investigaria...**

---

## 📎 7. Minha evidência

- **JWT de laboratório analisado:** `a preencher`
- **Claims interpretados:** `a preencher`
- **Diagnóstico do token rejeitado:** `a preencher`
- **Árvore de diagnóstico:** `a preencher`
- **Explicação própria:** `a preencher`
- **Laboratório relacionado:** `a preencher`

> [!WARNING]
> Antes de registrar uma evidência, remova tokens, cookies, secrets, chaves e qualquer dado sensível.

---

## ✅ 8. Validação

Marque somente depois de executar a atividade correspondente:

- [ ] Estudei o conteúdo
- [ ] Identifiquei `iss`, `sub`, `aud` e `exp`
- [ ] Expliquei o papel de scopes
- [ ] Diferenciei access token e ID token
- [ ] Inspecionei um JWT de laboratório com segurança
- [ ] Diagnostiquei um token rejeitado
- [ ] Diferenciei falha de autenticação de falha de autorização
- [ ] Respondi à pergunta de entrevista sem consultar
- [ ] Escrevi minha explicação com minhas próprias palavras
- [ ] Registrei evidências sem expor segredos

---

## 🏁 Critério para avançar

Você pode seguir para **Sessões** quando conseguir explicar, sem consultar:

`Authentication → Token → Claims → Contexto → API → Authorization`

e identificar rapidamente se uma falha está relacionada à validade/audiência do token ou a uma decisão posterior de acesso.

---

## ▶️ Próximo passo

[← Authorization](02-Authorization.md) · [📚 Voltar ao índice](README.md) · [Próximo → Sessões](04-Sessoes.md)