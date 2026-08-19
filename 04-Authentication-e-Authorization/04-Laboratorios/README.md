# Authentication e Authorization — Laboratórios

> **Objetivo:** transformar AuthN e AuthZ em capacidade prática de implementação e diagnóstico.

[← Voltar para a fase](../README.md) · [↑ Início](../../README.md)

## Fluxo

**Estudar → Implementar → Validar → Quebrar → Diagnosticar → Documentar → Concluir**

Não avance enquanto não conseguir reproduzir o laboratório sem copiar o passo a passo.

---

## 🧪 Lab 01 — Authentication

**Foco:** provar que uma identidade consegue autenticar em um serviço e entender o fluxo de credenciais, fatores e sessão.

- [ ] Entendi o cenário e a arquitetura.
- [ ] Configurei o ambiente.
- [ ] Implementei o fluxo de autenticação.
- [ ] Testei sucesso e falha de autenticação.
- [ ] Registrei evidências.
- [ ] Expliquei o fluxo com minhas palavras.
- [ ] Registrei uma observação pessoal.

**Evidência:** `04-Laboratorios/Lab-01/`

---

## 🔐 Lab 02 — Authorization / RBAC

**Foco:** separar autenticação de autorização e controlar acesso por roles/permissões.

- [ ] Modelei usuários, roles, recursos e permissões.
- [ ] Implementei pelo menos três níveis de acesso.
- [ ] Validei acesso permitido.
- [ ] Validei acesso negado.
- [ ] Testei alteração de role/permissão.
- [ ] Registrei evidências.
- [ ] Expliquei AuthZ com minhas palavras.
- [ ] Registrei uma observação pessoal.

**Evidência:** `04-Laboratorios/Lab-02/`

---

## 🔗 Lab 03 — AuthN + AuthZ integrado

**Foco:** reproduzir um cenário próximo de uma aplicação corporativa.

**Fluxo-alvo:**

`Usuário → Authentication → Identidade → Role/Policy → Authorization → Recurso`

- [ ] Modelei a arquitetura.
- [ ] Implementei Authentication.
- [ ] Implementei Authorization.
- [ ] Testei usuário autorizado.
- [ ] Testei usuário autenticado sem autorização.
- [ ] Testei falha de autenticação.
- [ ] Registrei evidências.
- [ ] Expliquei o fluxo completo com minhas palavras.
- [ ] Registrei uma observação pessoal.

**Evidência:** `04-Laboratorios/Lab-03/`

---

## 🧩 Troubleshooting obrigatório

Para pelo menos um laboratório, provoque uma falha e resolva sem consultar a solução.

1. **Sintoma:** o que aconteceu?
2. **Hipótese:** o que poderia estar causando?
3. **Evidência:** o que foi verificado?
4. **Causa:** qual era o problema?
5. **Correção:** o que foi alterado?
6. **Validação:** como foi comprovada a correção?

---

## 📝 Minha observação

> Escreva aqui, com suas próprias palavras, o que você aprendeu nos laboratórios e quais pontos ainda geram dúvida.

---

## ✅ Definition of Done

A etapa está concluída quando:

- [ ] Os 3 laboratórios foram executados.
- [ ] Consigo reproduzir os fluxos sem copiar.
- [ ] Consigo explicar AuthN vs AuthZ.
- [ ] Testei cenários de sucesso e falha.
- [ ] Resolvi pelo menos um problema real.
- [ ] Registrei evidências.
- [ ] Escrevi minhas próprias observações.

### Próximo passo

Quando tudo estiver marcado, volte para a fase e avance para **Exercícios → Troubleshooting → Revisão**.

[← Voltar para a fase](../README.md)