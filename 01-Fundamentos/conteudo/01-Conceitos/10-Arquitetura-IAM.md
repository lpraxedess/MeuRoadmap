# 10 — Arquitetura básica de IAM

[← Voltar](09-SoD.md) · [🏠 Início](../../README.md)

> **Objetivo profissional:** conectar identidade, diretório, autenticação, aplicação e autorização em um fluxo único.

## 🎯 O que dominar

- Directory e Identity Store
- IdP e SP
- Federation e SSO
- provisioning e deprovisioning
- relação entre autenticação e autorização

## 🧠 Você precisa conseguir

- explicar a função de cada componente
- diferenciar IdP e SP
- explicar SSO e Federation
- mostrar onde provisioning e deprovisioning entram no ciclo
- explicar o fluxo de ponta a ponta

## 🛠️ Prática guiada

Desenhe uma arquitetura contendo:

**Usuário → dispositivo → IdP → Directory → aplicação → recurso → decisão de autorização**

Depois adicione o fluxo de provisionamento e remoção de acesso.

## 🏢 Cenário profissional

Uma empresa quer permitir que funcionários usem uma identidade corporativa para acessar várias aplicações SaaS sem criar uma senha diferente em cada aplicação.

**Tarefa:** desenhe a solução, identifique IdP, SP, Directory, Federation/SSO e explique como o acesso seria removido quando o funcionário sair.

## 🎤 Pergunta de entrevista

> Explique o fluxo de login de um usuário até uma aplicação usando IdP, Directory, SSO e autorização.

## ✍️ Minha explicação

> Explique o fluxo completo com suas próprias palavras. Se você não consegue desenhá-lo e narrá-lo, o conceito ainda não está consolidado.

## 📎 Evidência

Registre o diagrama e o cenário em `docs/evidencias/10-arquitetura-iam/`.

## ✅ Validação

- [ ] Estudei
- [ ] Desenhei a arquitetura
- [ ] Resolvi o cenário profissional
- [ ] Consigo explicar cada componente
- [ ] Respondi à pergunta sem consultar
- [ ] Registrei minha explicação
- [ ] Consigo explicar o fluxo de ponta a ponta

## 🏁 Fechamento do módulo

Depois deste tópico, faça a **Revisão da Fase 01** antes de considerar os fundamentos consolidados.

[← Voltar](09-SoD.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md)