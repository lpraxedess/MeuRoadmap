# 05 — Troubleshooting de Access Denied

[← Prática](README.md) · [🏠 Fase](../README.md) · [← Least Privilege](04-Quebra-de-Privilégios.md) · [→ Laboratórios](../04-Laboratorios/README.md)

> **Objetivo:** desenvolver um método repetível para investigar falhas de acesso.

## 🧭 Método

**Sintoma → Hipótese → Evidência → Teste → Causa raiz → Correção → Validação**

### 1. Cenário

> Um usuário autentica corretamente, mas recebe **Access Denied** ao acessar um recurso.

### 2. Investigue sem chutar

- [ ] Confirmei a identidade
- [ ] Confirmei a autenticação
- [ ] Identifiquei o recurso
- [ ] Identifiquei a ação solicitada
- [ ] Verifiquei role/grupo
- [ ] Verifiquei permission/entitlement
- [ ] Verifiquei policy/ACL
- [ ] Verifiquei contexto ou condições
- [ ] Consultei logs/evidências

### 3. Registre o diagnóstico

**Sintoma:**
> 

**Hipótese inicial:**
> 

**Evidência encontrada:**
> 

**Causa raiz:**
> 

**Correção:**
> 

**Resultado após correção:**
> 

### 4. Definition of Done

- [ ] Investiguei sem depender de tentativa aleatória
- [ ] Coletei evidências
- [ ] Encontrei a causa raiz
- [ ] Corrigi o problema
- [ ] Validei o acesso após a correção
- [ ] Documentei o caso
- [ ] Consigo repetir o método em outro cenário

**Status:** [ ] Em progresso · [ ] Concluído

[← Prática](README.md) · [→ Laboratórios](../04-Laboratorios/README.md)