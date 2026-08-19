# 02 — Authorization

[← Voltar](01-Authentication.md) · [🏠 Início](../../README.md) · [Próximo →](03-Tokens-e-Claims.md)

> **Objetivo profissional:** raciocinar sobre decisões de acesso: quem pode fazer o quê, em qual recurso e sob quais condições.

## 🎯 O que dominar

- permission
- privilege
- role
- policy
- resource
- action
- Allow x Deny
- least privilege

## 🧠 Você precisa conseguir

- explicar por que autenticar não significa ter acesso
- identificar subject, resource, action e policy
- diferenciar permission, privilege e role
- justificar uma decisão Allow ou Deny

## 🛠️ Prática guiada

Modele uma aplicação com 3 usuários, 3 recursos e pelo menos 4 ações. Defina uma role para cada perfil e registre quais combinações devem ser permitidas ou negadas.

## 🏢 Cenário profissional

Um usuário autenticado acessa o sistema financeiro, mas recebe `Access Denied` ao tentar aprovar pagamentos. Determine quais elementos da decisão precisam ser investigados antes de alterar permissões.

## 🎤 Pergunta de entrevista

> Um usuário autenticou com sucesso e ainda assim recebeu Access Denied. O que isso significa?

## ✍️ Minha explicação

> Explique com suas palavras como uma decisão de autorização acontece.

## 📎 Evidência

> Registre sua matriz de acesso ou cenário resolvido.

## ✅ Validação

- [ ] Estudei o conteúdo
- [ ] Diferenciei permission, privilege, role e policy
- [ ] Modelei uma decisão de acesso
- [ ] Resolvi o cenário de Access Denied
- [ ] Expliquei least privilege aplicado à autorização
- [ ] Respondi à pergunta sem consultar
- [ ] Registrei minha explicação

## ▶️ Próximo passo

[← Authentication](01-Authentication.md) · [Próximo → Tokens e Claims](03-Tokens-e-Claims.md)