# 01 — Conceitos de Authentication & Authorization

[← Fase 04](../README.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md)

> **7 tópicos fundamentais.** Faça um por vez. Cada página tem estudo, prática, cenário profissional, pergunta de entrevista, explicação própria e validação.

> [!TIP]
> Não marque um item porque leu. Marque quando conseguir **explicar, aplicar e validar**.

---

## 🧭 Trilha

| # | Tópico | Foco | Ação |
|---:|---|---|---|
| **01** | Authentication | identidade, fatores e MFA | [▶️ Começar](01-Authentication.md) |
| **02** | Authorization | permissions, roles e policies | [Abrir](02-Authorization.md) |
| **03** | Tokens e Claims | contexto e tokens | [Abrir](03-Tokens-e-Claims.md) |
| **04** | Sessões | estado, expiração e revogação | [Abrir](04-Sessoes.md) |
| **05** | Controle de Acesso | RBAC, ABAC e contexto | [Abrir](05-Controle-de-Acesso.md) |
| **06** | Decisão de Acesso | investigação ponta a ponta | [Abrir](06-Decisao-de-Acesso.md) |
| **07** | Segurança | ameaças e controles | [Abrir](07-Seguranca.md) |

---

## 🔁 Padrão de estudo

**Estudar → Praticar → Explicar → Validar → Registrar evidência → Próximo**

Cada tópico segue o mesmo formato para que você não precise descobrir como estudar de novo a cada página.

## ⚙️ Controle pelo terminal

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
```

Para concluir uma validação específica:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 concluir ".\04-Authentication-e-Authorization\01-Conceitos\01-Authentication.md" 1
```

> [!IMPORTANT]
> O número usado em `concluir` conta somente os itens da seção **Validação** do arquivo informado.

## 🏁 Critério do módulo

O módulo está concluído quando os 7 tópicos estiverem validados e você conseguir explicar o fluxo completo:

`Identidade → Authentication → Token/Contexto → Policy → Authorization → Recurso`

### 🧭 Navegação

[← Fase 04](../README.md) · [🏠 Início](../../README.md) · [▶️ Primeiro tópico](01-Authentication.md) · [📚 Próximo módulo](../02-Conhecimentos/README.md)