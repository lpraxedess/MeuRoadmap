# 03 — Prática de Authentication & Authorization

[← Conhecimentos](../02-Conhecimentos/README.md) · [🏠 Fase 04](../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo → Laboratórios](../04-Laboratorios/README.md)

> **Objetivo:** transformar AuthN/AuthZ em capacidade prática por meio de execução, falha controlada, diagnóstico e evidência.

> [!IMPORTANT]
> Não marque um exercício por ter seguido um tutorial. O critério é conseguir **reproduzir, quebrar, diagnosticar, corrigir e explicar**.

---

## 🧭 Fluxo

**Entender → Executar → Quebrar → Diagnosticar → Corrigir → Validar → Explicar → Registrar**

## 01 — Fluxo de autenticação

**Cenário:** um usuário acessa uma aplicação protegida.

### Execute

- [ ] Desenhei `usuário → aplicação → IdP → Authentication → sessão → recurso`
- [ ] Identifiquei onde a credencial/fator é apresentado
- [ ] Identifiquei onde ocorre a decisão de AuthN
- [ ] Identifiquei o contexto emitido após autenticação
- [ ] Expliquei como a sessão termina ou expira

**Evidência:**

> 

**Minha explicação:**

> 

## 02 — Fluxo de autorização

**Cenário:** usuário autenticado tenta executar uma ação em um recurso.

| Elemento | Minha definição |
|---|---|
| Subject | |
| Action | |
| Resource | |
| Contexto | |
| Permission | |
| Policy | |
| Resultado | |
| Evidência | |

- [ ] Modelei o fluxo completo
- [ ] Justifiquei Allow ou Deny
- [ ] Expliquei o motivo da decisão

## 03 — RBAC na prática

Crie um modelo corporativo pequeno:

| Usuário | Role | Recurso | Permissão |
|---|---|---|---|
| Ana | Analista | Sistema X | leitura |
| Bruno | Gestor | Sistema X | leitura/escrita |
| Carlos | Admin | Sistema X | administração |

- [ ] Criei pelo menos 3 usuários
- [ ] Criei pelo menos 3 roles
- [ ] Associei permissões às roles
- [ ] Testei acessos permitidos
- [ ] Testei acesso negado
- [ ] Expliquei cada resultado
- [ ] Verifiquei se houve privilégio excessivo

**Evidência:**

> 

## 04 — Quebre e corrija o controle de acesso

Crie uma falha **controlada e reversível** em ambiente de estudo.

- [ ] Concedi uma permissão excessiva
- [ ] Reproduzi o acesso indevido
- [ ] Coletei evidências antes da correção
- [ ] Identifiquei a causa
- [ ] Apliquei Least Privilege
- [ ] Repeti o teste
- [ ] Comprovei que o acesso indevido foi removido
- [ ] Comprovei que o acesso legítimo permaneceu

**Impacto potencial:**

> 

**Antes → Depois:**

> 

## 05 — Troubleshooting de AuthN/AuthZ

**Cenário:** o usuário autentica normalmente, mas recebe `Access Denied` ao executar uma ação.

Investigue sem conceder permissões como tentativa:

`Identidade → Authentication → Token/Sessão → Role/Permission → Policy → Resource → Logs`

| Campo | Registro |
|---|---|
| Sintoma | |
| Hipótese 1 | |
| Evidência | |
| Hipótese 2 | |
| Evidência | |
| Causa raiz | |
| Correção mínima | |
| Validação | |

- [ ] Separei AuthN de AuthZ
- [ ] Testei hipóteses com evidências
- [ ] Evitei alteração de privilégio para diagnóstico
- [ ] Validei a correção

## 06 — Desafio integrado

Resolva sem consultar os módulos anteriores:

> Um usuário autenticado tenta aprovar um pagamento e recebe `403`. O usuário possui uma role de gestor, mas a aprovação só é permitida durante horário comercial e para valores abaixo de um limite.

Produza:

1. **Subject**
2. **Action**
3. **Resource**
4. **Claims/atributos/contexto necessários**
5. **Policy esperada**
6. **Possíveis causas do `403`**
7. **Evidências a coletar**
8. **Correção mínima**
9. **Como validar sem ampliar privilégio**

**Minha solução:**

> 

## 🎯 Definition of Done

- [ ] Executei um fluxo completo de autenticação
- [ ] Modelei uma decisão de autorização
- [ ] Implementei ou simulei RBAC
- [ ] Criei e corrigi uma falha controlada de privilégio
- [ ] Resolvi um cenário de Access Denied por evidências
- [ ] Resolvi o desafio integrado sem consultar
- [ ] Registrei evidências sanitizadas
- [ ] Consigo explicar todo o processo sem roteiro

> [!WARNING]
> Nunca registre credenciais, tokens, cookies, secrets, dados pessoais ou logs sensíveis reais.

## 📎 Evidências

- **Código:**
- **Diagramas:**
- **Screenshots:**
- **Logs sanitizados:**
- **Configurações:**
- **Anotações:**

## 📝 Registro final

**O que consegui fazer sozinho:**

> 

**Onde tive dificuldade:**

> 

**O que preciso repetir:**

> 

## ▶️ Próximo passo

[← Conhecimentos](../02-Conhecimentos/README.md) · [🖥️ Laboratórios](../04-Laboratorios/README.md) · [🏠 Fase 04](../README.md)
