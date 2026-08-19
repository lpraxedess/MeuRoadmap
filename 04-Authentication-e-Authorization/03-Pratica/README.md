# Authentication e Authorization — Prática

[← Voltar para a fase](../README.md) · [← Conhecimentos](../02-Conhecimentos/README.md) · [→ Próxima etapa: Laboratórios](../04-Laboratorios/README.md)

> **Objetivo:** transformar AuthN/AuthZ em capacidade prática. Não marque um exercício como concluído apenas porque conseguiu seguir um tutorial.

## 🧭 Fluxo

**Entender → Executar → Quebrar → Diagnosticar → Corrigir → Explicar → Registrar evidência**

---

## 01 — Fluxo de autenticação

**Cenário:** um usuário acessa uma aplicação protegida.

### Faça

- [ ] Desenhe o fluxo `usuário → aplicação → IdP → autenticação → sessão → aplicação`
- [ ] Identifique onde a credencial é apresentada
- [ ] Identifique onde ocorre a decisão de autenticação
- [ ] Explique o que acontece após autenticar
- [ ] Explique como a sessão é encerrada

### Evidência

> Link para diagrama, captura ou arquivo.

### Minha explicação

> Explique o fluxo sem consultar material.

---

## 02 — Fluxo de autorização

**Cenário:** usuário autenticado tenta acessar um recurso.

### Faça

- [ ] Defina o subject
- [ ] Defina o resource
- [ ] Defina a action
- [ ] Defina as permissions necessárias
- [ ] Defina a policy
- [ ] Determine o resultado: Allow ou Deny
- [ ] Justifique a decisão

### Evidência

> Registre o cenário e o resultado.

---

## 03 — RBAC na prática

Crie um pequeno modelo corporativo:

| Usuário | Role | Recurso | Permissão |
|---|---|---|---|
| Ana | Analista | Sistema X | leitura |
| Bruno | Gestor | Sistema X | leitura/escrita |
| Carlos | Admin | Sistema X | administração |

### Faça

- [ ] Crie pelo menos 3 usuários
- [ ] Crie pelo menos 3 roles
- [ ] Associe permissões às roles
- [ ] Teste acessos permitidos
- [ ] Teste acesso negado
- [ ] Explique o resultado

---

## 04 — Quebre o controle de acesso

Crie deliberadamente uma falha e depois corrija.

- [ ] Conceder permissão excessiva
- [ ] Testar o acesso indevido
- [ ] Identificar a causa
- [ ] Aplicar Least Privilege
- [ ] Repetir o teste
- [ ] Registrar antes/depois

**Pergunta:** qual seria o impacto dessa falha em uma empresa?

> Resposta:

---

## 05 — Troubleshooting de AuthN/AuthZ

Simule um usuário que:

1. consegue autenticar;
2. recebe `Access Denied` ao acessar um recurso.

Investigue na ordem:

- [ ] Identidade
- [ ] Autenticação
- [ ] Sessão/token
- [ ] Role
- [ ] Permission
- [ ] Policy
- [ ] Resource
- [ ] Logs

### Resultado

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

---

## 🎯 Definition of Done

- [ ] Executei um fluxo completo de autenticação
- [ ] Modelei uma decisão de autorização
- [ ] Implementei ou simulei RBAC
- [ ] Criei e corrigi uma falha de privilégio
- [ ] Resolvi um cenário de Access Denied
- [ ] Registrei evidências
- [ ] Consigo explicar tudo sem seguir um roteiro

## 📎 Evidências

- **Código:**
- **Diagramas:**
- **Screenshots:**
- **Logs:**
- **Configurações:**
- **Anotações:**

## 📝 Registro final

**O que consegui fazer sozinho:**

> 

**Onde tive dificuldade:**

> 

**O que preciso repetir:**

> 

[← Voltar para a fase](../README.md) · [→ Ir para Laboratórios](../04-Laboratorios/README.md)