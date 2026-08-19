# 06 — Decisão de Acesso

[← Voltar](05-Controle-de-Acesso.md) · [🏠 Início](../../README.md) · [Próximo →](07-Seguranca.md)

> **Objetivo profissional:** diagnosticar uma decisão de acesso ponta a ponta.

## 🎯 Modelo mental

`Identidade → Authentication → Token/Contexto → Policy → Authorization → Recurso`

## 🧠 Você precisa conseguir

- explicar cada etapa do fluxo
- identificar onde uma falha pode ocorrer
- separar problema de autenticação de problema de autorização
- apontar quais evidências sustentam sua hipótese

## 🛠️ Prática guiada

Monte uma tabela para um acesso negado:

| Etapa | O que verificar | Evidência |
|---|---|---|
| Identidade | | |
| Authentication | | |
| Token/Contexto | | |
| Policy | | |
| Authorization | | |
| Recurso | | |

## 🏢 Cenário profissional

Um usuário acessa a aplicação normalmente, mas uma única ação retorna `403`. Construa uma sequência de investigação que evite conceder privilégios antes de descobrir a causa.

## 🎤 Pergunta de entrevista

> Como você investigaria um Access Denied sem simplesmente adicionar permissões?

## ✍️ Minha explicação

> Explique seu método de investigação.

## 📎 Evidência

> Registre a matriz, logs ou caso de laboratório.

## ✅ Validação

- [ ] Expliquei o fluxo completo
- [ ] Diferenciei falha de AuthN e AuthZ
- [ ] Montei uma sequência de investigação
- [ ] Resolvi o cenário de 403
- [ ] Usei evidências antes de propor alteração
- [ ] Respondi à pergunta sem consultar
- [ ] Registrei minha explicação

## ▶️ Próximo passo

[← Controle de Acesso](05-Controle-de-Acesso.md) · [Próximo → Segurança](07-Seguranca.md)