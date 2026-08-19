# 04 — Sessões

[← Tokens e Claims](03-Tokens-e-Claims.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo →](05-Controle-de-Acesso.md)

> **Objetivo profissional:** entender como o estado de uma autenticação é mantido, renovado e encerrado, e reconhecer os riscos envolvidos.

> [!IMPORTANT]
> Sessão, token e autorização são conceitos relacionados, mas não equivalentes. O objetivo é conseguir seguir o ciclo completo e localizar onde o acesso pode permanecer válido.

---

## 🧭 Fluxo deste tópico

**Estudar → Modelar ciclo → Analisar risco → Diagnosticar → Explicar → Validar → Registrar evidência → Próximo tópico**

---

## 🎯 O que dominar

- sessão e estado autenticado
- cookie de sessão
- expiração e timeout
- logout
- revogação
- renovação de sessão/tokens
- session hijacking
- relação entre sessão e token
- proteção de cookies e transporte

## 🧠 Você precisa conseguir

Ao terminar, você deve conseguir:

- diferenciar sessão de token;
- explicar por que uma sessão expira;
- diferenciar logout, expiração e revogação;
- explicar o que acontece quando um token continua válido após o logout;
- identificar riscos de session hijacking;
- apontar controles para reduzir roubo e reutilização de sessão.

---

## 🔄 1. Prática guiada — ciclo de vida

Desenhe este fluxo e anote o estado em cada etapa:

`Login → Autenticação → Criação da sessão → Uso → Renovação → Logout/Expiração → Encerramento`

Para cada etapa, responda:

| Etapa | O que existe? | Quem valida? | Quando pode falhar? |
|---|---|---|---|
| Login | | | |
| Criação | | | |
| Uso | | | |
| Renovação | | | |
| Logout | | | |
| Expiração | | | |

### Pergunta-chave

**Depois do logout, qual credencial ou estado ainda poderia permitir acesso?**

Essa pergunta conecta sessão, tokens e revogação.

---

## 🛡️ 2. Controles de segurança

Relacione o risco ao controle:

| Risco | Controle a investigar |
|---|---|
| Roubo de cookie | `Secure`, `HttpOnly`, `SameSite`, proteção do navegador |
| Session hijacking | TLS, rotação, expiração, detecção de anomalias |
| Sessão abandonada | timeout/idle timeout |
| Token ainda válido | expiração, revogação quando suportada, rotação |
| Fixação de sessão | regeneração do identificador após autenticação |

Não memorize apenas a tabela: explique **por que** cada controle reduz o risco.

---

## 🔎 3. Diagnóstico — acesso após logout

Um usuário encerra a sessão em um computador compartilhado, mas outra pessoa consegue reutilizar o acesso.

Investigue nesta ordem:

1. O logout realmente encerrou o estado no servidor?
2. O cookie/credencial continuou disponível no navegador?
3. Existe token ainda válido?
4. O token foi revogado ou apenas removido da interface?
5. Existe cache ou sessão persistente?
6. Houve reutilização de cookie/token por outra origem?
7. Existem logs para reconstruir a sequência?

### Resultado esperado

Documente:

- sintoma;
- hipóteses;
- evidências necessárias;
- causa provável;
- correção;
- validação pós-correção.

**Não conclua que "logout = revogação de tudo" sem verificar a arquitetura.**

---

## 🏢 4. Cenário profissional

O suporte informa:

> "O usuário fez logout, mas a aplicação continuou permitindo acesso até algum tempo depois."

Sua tarefa é determinar se o comportamento está relacionado a:

- sessão no servidor;
- cookie do navegador;
- access token ainda válido;
- refresh token;
- cache;
- ausência de revogação;
- ou implementação incorreta do logout.

### Evidência mínima

Produza uma linha do tempo com:

`evento → credencial/estado → validade → decisão → resultado`

---

## 🎤 5. Pergunta de entrevista

> **Logout sempre invalida imediatamente todo acesso já emitido?**

Responda considerando sessão, access token, refresh token, expiração e mecanismos de revogação.

---

## ✍️ 6. Minha explicação

Complete com suas próprias palavras:

> **Uma sessão é...**
>
> **Um token é diferente de uma sessão porque...**
>
> **Logout significa...**
>
> **Revogação significa...**
>
> **Uma sessão pode ser comprometida quando...**
>
> **Para reduzir esse risco eu aplicaria...**

---

## 📎 7. Minha evidência

- **Diagrama do ciclo:** `a preencher`
- **Linha do tempo do incidente:** `a preencher`
- **Controles analisados:** `a preencher`
- **Diagnóstico do cenário:** `a preencher`
- **Explicação própria:** `a preencher`
- **Laboratório relacionado:** `a preencher`

> [!WARNING]
> Nunca registre cookies, tokens, session IDs ou outros segredos reais como evidência.

---

## ✅ 8. Validação

Marque somente depois de executar a atividade correspondente:

- [ ] Estudei o conteúdo
- [ ] Diferenciei sessão e token
- [ ] Modelei o ciclo de vida de uma sessão
- [ ] Expliquei expiração, logout e revogação
- [ ] Expliquei o que pode permanecer válido após logout
- [ ] Analisei riscos de session hijacking
- [ ] Relacionei riscos a controles de segurança
- [ ] Resolvi o cenário de acesso após logout
- [ ] Respondi à pergunta de entrevista sem consultar
- [ ] Escrevi minha explicação com minhas próprias palavras
- [ ] Registrei evidências sem expor segredos

---

## 🏁 Critério para avançar

Você pode seguir para **Controle de Acesso** quando conseguir explicar, sem consultar:

`Login → Sessão → Credencial/Token → Uso → Renovação → Logout/Expiração → Encerramento`

e identificar qual estado ou credencial ainda poderia manter o acesso após o logout.

---

## ▶️ Próximo passo

[← Tokens e Claims](03-Tokens-e-Claims.md) · [📚 Voltar ao índice](README.md) · [Próximo → Controle de Acesso](05-Controle-de-Acesso.md)