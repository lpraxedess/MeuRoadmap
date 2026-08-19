# 04 — Quebra de Privilégios

[← Prática](README.md) · [🏠 Fase](../README.md) · [← RBAC](03-RBAC.md) · [→ Próximo](05-Troubleshooting.md)

> **Objetivo:** aprender a encontrar excesso de acesso e aplicar Least Privilege.

## 🧭 Faça nesta ordem

**Conceder demais → Explorar → Identificar → Reduzir → Validar**

### 1. Monte o cenário inseguro

Crie um usuário com mais permissões do que sua função exige.

**Função:**
> 

**Acesso legítimo:**
> 

**Acesso excessivo:**
> 

### 2. Demonstre o problema

- [ ] Reproduzi o acesso excessivo
- [ ] Registrei a evidência
- [ ] Identifiquei o risco

### 3. Corrija

- [ ] Removi permissões desnecessárias
- [ ] Mantive somente o acesso necessário
- [ ] Reexecutei o teste
- [ ] Confirmei que o acesso indevido foi bloqueado

### 4. Explique

**Qual era o privilégio excessivo?**
> 

**Por que ele era desnecessário?**
> 

**Como a correção reduz o risco?**
> 

### 5. Definition of Done

- [ ] Criei um cenário de excesso de privilégio
- [ ] Consegui reproduzir o problema
- [ ] Corrigi a causa
- [ ] Validei o resultado
- [ ] Tenho evidência antes/depois
- [ ] Consigo explicar Least Privilege sem consultar

**Status:** [ ] Em progresso · [ ] Concluído

[← Prática](README.md) · [→ Próximo: Troubleshooting](05-Troubleshooting.md)