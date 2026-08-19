# 01 — Conceitos de IAM

[← Fase 01](../README.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md)

> **10 tópicos fundamentais.** Faça um por vez. Não pule a prática nem a validação.

> [!TIP]
> Abra um tópico, estude, pratique, escreva sua explicação e só então marque os itens de `Validação`.

---

## 🧭 Trilha

| # | Tópico | Domínio | Ação |
|---:|---|---|---|
| **01** | Identidade | identidade, principal, sujeito, atributos | [▶️ Começar](01-Identidade.md) |
| **02** | Conta e Credencial | conta, segredo, token, credencial | [Abrir](02-Conta-e-Credencial.md) |
| **03** | Authentication | fatores, MFA, OTP, certificado | [Abrir](03-Authentication.md) |
| **04** | Authorization | permission, privilege, role, policy | [Abrir](04-Authorization.md) |
| **05** | Modelos de Acesso | DAC, MAC, RBAC, ABAC, PBAC, ReBAC | [Abrir](05-Modelos-de-Acesso.md) |
| **06** | Least Privilege | mínimo privilégio, JIT, escalation | [Abrir](06-Least-Privilege.md) |
| **07** | JML | Joiner, Mover, Leaver | [Abrir](07-JML.md) |
| **08** | Entitlement | direito de acesso e governança | [Abrir](08-Entitlement.md) |
| **09** | SoD | segregação de funções e conflitos | [Abrir](09-SoD.md) |
| **10** | Arquitetura IAM | IdP, SP, Directory, SSO, Federation | [Abrir](10-Arquitetura-IAM.md) |

---

## 🔁 O padrão de cada tópico

| Etapa | O que fazer |
|---|---|
| **1. Estudar** | Ler e compreender o conteúdo. |
| **2. Praticar** | Fazer a atividade proposta. |
| **3. Explicar** | Escrever `Minha explicação` com suas palavras. |
| **4. Validar** | Conferir cada item sem depender de resposta pronta. |
| **5. Concluir** | Marcar a validação no arquivo. |
| **6. Avançar** | Usar `Próximo →`. |

## ⚙️ Controle local

Para descobrir automaticamente onde continuar:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
```

Para marcar uma validação específica:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 concluir ".\01-Fundamentos\01-Conceitos\01-Identidade.md" 1
```

> [!IMPORTANT]
> O número do comando `concluir` conta apenas os itens da seção **Validação** daquele arquivo.

---

## 🏁 Critério do módulo

O módulo só termina quando os 10 tópicos estiverem validados e a revisão final da fase estiver concluída.

---

### 🧭 Navegação

[← Fase 01](../README.md) · [🏠 Início](../../README.md) · [▶️ Primeiro tópico](01-Identidade.md) · [📈 Painel](../../docs/progresso/painel.md)
