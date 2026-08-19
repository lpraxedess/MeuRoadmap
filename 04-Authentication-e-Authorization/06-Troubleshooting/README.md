# 🔧 Troubleshooting — Authentication e Authorization

[← Voltar para a fase](../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [← Exercícios](../05-Exercicios/README.md) · [→ Revisão](../08-Revisao/README.md)

> **Objetivo:** aprender a investigar problemas de acesso de forma sistemática, separando falhas de Authentication de falhas de Authorization.

## 🧭 Método obrigatório

**Sintoma → Hipótese → Evidência → Teste → Causa raiz → Correção → Validação → Registro**

Não registre apenas a solução. O objetivo é conseguir explicar **como você chegou à causa**.

---

## 🚨 Cenário 01 — Falha de Authentication

**Situação:** o usuário não consegue autenticar.

Investigue:

- [ ] Identidade existe?
- [ ] Conta está ativa?
- [ ] Credencial está válida?
- [ ] Fator/MFA está funcionando?
- [ ] Há erro no IdP ou serviço?
- [ ] Há problema de rede/TLS?
- [ ] O horário está correto?

**Minha hipótese:**
> 

**Evidência encontrada:**
> 

**Causa raiz:**
> 

**Correção:**
> 

**Validação:**
> 

---

## 🚫 Cenário 02 — Access Denied

**Situação:** o usuário autentica, mas recebe acesso negado.

Investigue na ordem:

`Identity → Role → Policy → Permission → Resource`

- [ ] Authentication foi concluída?
- [ ] Identidade correta?
- [ ] Role correta?
- [ ] Policy aplicável?
- [ ] Permission concedida?
- [ ] Resource correto?
- [ ] Existe uma regra explícita de Deny?

**Minha hipótese:**
> 

**Evidência encontrada:**
> 

**Causa raiz:**
> 

**Correção:**
> 

**Validação:**
> 

---

## 🔐 Cenário 03 — Excesso de privilégio

**Situação:** um usuário possui mais acesso do que precisa.

- [ ] Listei os acessos atuais.
- [ ] Identifiquei o acesso necessário.
- [ ] Identifiquei o excesso.
- [ ] Removi o excesso.
- [ ] Validei que o trabalho continua funcionando.
- [ ] Registrei o princípio de Least Privilege aplicado.

**O que estava errado:**
> 

**O que deveria existir:**
> 

**Minha justificativa:**
> 

---

## 🧪 Desafio — provoque uma falha

Escolha um laboratório anterior e provoque **intencionalmente** um erro de acesso.

- [ ] Criei uma condição de falha.
- [ ] Observei o sintoma.
- [ ] Investiguei sem consultar a solução.
- [ ] Encontrei a causa raiz.
- [ ] Corrigi o problema.
- [ ] Repeti o teste e validei a correção.

### Registro

**Sintoma:**
> 

**Hipótese:**
> 

**Evidência:**
> 

**Causa raiz:**
> 

**Correção:**
> 

**Validação:**
> 

**O que aprendi:**
> 

---

## 🧠 Regra de decisão rápida

| Sintoma | Primeiro investigar |
|---|---|
| Não consegue entrar | **Authentication** |
| Entra, mas recebe Access Denied | **Authorization** |
| Acesso funciona, mas é excessivo | **Least Privilege / Authorization** |
| Acesso mudou após mudança de função | **Role / Policy / Lifecycle** |

---

## 📝 Meu registro pessoal

**O que consigo diagnosticar sozinho:**
> 

**Onde ainda travo:**
> 

**O que preciso revisar:**
> 

---

## ✅ Definition of Done

- [ ] Resolvi uma falha de Authentication.
- [ ] Resolvi uma falha de Authorization.
- [ ] Investiguei um Access Denied.
- [ ] Corrigi um excesso de privilégio.
- [ ] Provoquei e resolvi uma falha intencional.
- [ ] Registrei evidências e causa raiz.
- [ ] Consigo explicar meu processo de diagnóstico sem consultar material.

**Concluído?** Avance para [🔄 Revisão →](../08-Revisao/README.md)

[← Voltar para a fase](../README.md) · [← Exercícios](../05-Exercicios/README.md) · [→ Revisão](../08-Revisao/README.md)