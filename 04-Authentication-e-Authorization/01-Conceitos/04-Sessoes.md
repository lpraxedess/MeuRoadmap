# 04 — Sessões

[← Voltar](03-Tokens-e-Claims.md) · [🏠 Início](../../README.md) · [Próximo →](05-Controle-de-Acesso.md)

> **Objetivo profissional:** entender o estado de uma autenticação e os riscos envolvidos em sua manutenção.

## 🎯 O que dominar

- sessão
- cookie de sessão
- expiração
- logout
- revogação
- session hijacking
- relação entre sessão e token

## 🧠 Você precisa conseguir

- diferenciar sessão de token
- explicar por que uma sessão expira
- explicar logout x revogação
- identificar riscos de sequestro de sessão

## 🛠️ Prática guiada

Desenhe o ciclo `login → criação da sessão → uso → renovação → expiração/logout` e marque onde uma sessão poderia ser comprometida.

## 🏢 Cenário profissional

Um usuário encerra a sessão em um computador compartilhado, mas outro usuário consegue reutilizar o acesso. Liste hipóteses e evidências que você investigaria.

## 🎤 Pergunta de entrevista

> Logout sempre invalida imediatamente todo acesso já emitido? Explique o que precisa ser considerado.

## ✍️ Minha explicação

> Explique com suas palavras a diferença entre sessão, token, expiração e revogação.

## 📎 Evidência

> Registre seu diagrama ou laboratório.

## ✅ Validação

- [ ] Estudei o conteúdo
- [ ] Diferenciei sessão e token
- [ ] Expliquei expiração e logout
- [ ] Expliquei revogação
- [ ] Analisei um cenário de session hijacking
- [ ] Respondi à pergunta sem consultar
- [ ] Registrei minha explicação

## ▶️ Próximo passo

[← Tokens e Claims](03-Tokens-e-Claims.md) · [Próximo → Controle de Acesso](05-Controle-de-Acesso.md)