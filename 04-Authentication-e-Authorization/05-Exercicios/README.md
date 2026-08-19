# 🧠 Exercícios — Authentication e Authorization

> **Objetivo:** verificar se você consegue raciocinar sobre identidade, autenticação e autorização sem depender de respostas prontas.

[← Voltar para a fase](../README.md) · [↑ Início](../../README.md) · [→ Troubleshooting](../06-Troubleshooting/README.md)

## 🧭 Como usar

**Tente sozinho → registre sua resposta → consulte → corrija → explique novamente.**

Não marque um exercício como concluído apenas porque encontrou a resposta correta.

---

## 01 — AuthN ou AuthZ?

Para cada cenário, determine se o problema está em **Authentication**, **Authorization** ou em ambos.

- [ ] Usuário informa senha incorreta.
- [ ] Usuário autentica, mas recebe `Access Denied`.
- [ ] Token expirado impede o acesso.
- [ ] Usuário autenticado não possui a role necessária.
- [ ] MFA falha.

**Minha explicação:**
> 

**Resultado / correção:**
> 

- [ ] Consigo justificar cada resposta.

---

## 02 — RBAC

Modele uma aplicação com três funções: **Usuário**, **Analista** e **Administrador**.

Defina:

- [ ] usuários
- [ ] roles
- [ ] recursos
- [ ] permissões
- [ ] acessos permitidos
- [ ] acessos negados

**Minha explicação:**
> 

**Evidência:**
> 

- [ ] Consigo explicar por que cada acesso existe.

---

## 03 — Least Privilege

Um usuário recebeu permissões administrativas porque precisava executar apenas uma operação específica.

Resolva:

- [ ] Identifique o excesso de privilégio.
- [ ] Defina a permissão mínima necessária.
- [ ] Explique o risco do acesso atual.
- [ ] Proponha uma forma de acesso temporário quando aplicável.

**Minha decisão:**
> 

**Justificativa:**
> 

- [ ] Consigo defender minha decisão tecnicamente.

---

## 04 — Access Denied

Um usuário consegue autenticar normalmente, mas não consegue acessar um recurso.

Investigue na ordem que considerar adequada:

- [ ] identidade
- [ ] autenticação
- [ ] role
- [ ] policy
- [ ] permission
- [ ] entitlement
- [ ] recurso

**Hipótese inicial:**
> 

**Evidências:**
> 

**Causa raiz:**
> 

**Correção:**
> 

- [ ] Resolvi sem copiar uma solução pronta.

---

## 05 — Cenário corporativo

Uma empresa possui um sistema financeiro com usuários comuns, aprovadores e administradores.

Projete uma solução que contenha:

- [ ] Authentication
- [ ] MFA
- [ ] RBAC
- [ ] Least Privilege
- [ ] separação de funções
- [ ] fluxo de acesso permitido
- [ ] fluxo de acesso negado

**Arquitetura / desenho:**
> 

**Minha explicação:**
> 

**Evidência:**
> 

- [ ] Consigo explicar toda a solução sem consultar material.

---

## 🏆 Desafio final

Crie um cenário próprio de IAM e demonstre **AuthN → identidade → AuthZ → decisão de acesso → recurso**.

- [ ] Cenário definido
- [ ] Fluxo desenhado
- [ ] Implementação ou simulação realizada
- [ ] Caso permitido testado
- [ ] Caso negado testado
- [ ] Falha provocada e diagnosticada
- [ ] Evidências registradas
- [ ] Explicação escrita com minhas palavras

**O que aprendi:**
> 

**O que ainda preciso estudar:**
> 

---

## 🏁 Definition of Done

- [ ] Completei os 5 exercícios.
- [ ] Completei o desafio final.
- [ ] Consigo diferenciar AuthN e AuthZ sem consultar.
- [ ] Consigo modelar RBAC.
- [ ] Consigo justificar Least Privilege.
- [ ] Consigo investigar um `Access Denied`.
- [ ] Registrei evidências e observações próprias.

### Próximo passo

Quando tudo estiver marcado, avance para **[Troubleshooting →](../06-Troubleshooting/README.md)**.

[← Voltar para a fase](../README.md) · [→ Troubleshooting](../06-Troubleshooting/README.md)