# 03 — RBAC na prática

[← Prática](README.md) · [🏠 Fase](../README.md) · [← Authorization](02-Fluxo-de-Authorization.md) · [→ Próximo](04-Quebra-de-Privilégios.md)

> **Objetivo:** modelar acesso por função sem conceder permissões diretamente a cada usuário.

## 🧭 Faça nesta ordem

**Modelar → Implementar → Testar → Revisar → Explicar**

### 1. Crie o cenário

Use uma empresa fictícia com pelo menos:

- 3 usuários
- 3 funções
- 3 recursos
- 6 permissões

| Usuário | Função | Recurso | Permissão |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### 2. Modele as roles

- [ ] Criei roles baseadas em função
- [ ] Associei permissões às roles
- [ ] Associei usuários às roles
- [ ] Evitei permissões diretas desnecessárias

### 3. Teste

- [ ] Usuário recebeu acesso esperado
- [ ] Usuário não recebeu acesso indevido
- [ ] Removi uma role e validei a perda do acesso

### 4. Revise

Escolha uma permissão e responda:

**Por que este usuário precisa dela?**
> 

**O que aconteceria se ela fosse removida?**
> 

### 5. Explique com suas palavras

> Explique RBAC para alguém que conhece sistemas, mas não conhece IAM.

**Minha explicação:**
> 

### 6. Definition of Done

- [ ] Modelei usuários, roles, recursos e permissões
- [ ] Testei concessão e remoção de acesso
- [ ] Evitei excesso de privilégio
- [ ] Tenho evidências
- [ ] Consigo explicar RBAC sem consultar

**Status:** [ ] Em progresso · [ ] Concluído

[← Prática](README.md) · [→ Próximo: Quebra de Privilégios](04-Quebra-de-Privilégios.md)