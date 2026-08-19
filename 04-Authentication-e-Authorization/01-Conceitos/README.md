# 01 — Conceitos de Authentication & Authorization

[← Fase 04](../README.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md)

> **7 tópicos fundamentais**, organizados como uma única sequência de aprendizagem. Cada tópico exige estudo, aplicação, explicação, evidência e validação.

> [!IMPORTANT]
> **Critério de avanço:** leitura não é domínio. Avance somente quando conseguir reproduzir o raciocínio sem consultar.

---

## 🧭 Trilha integrada

`01 Authentication → 02 Authorization → 03 Tokens → 04 Sessões → 05 Controle → 06 Decisão → 07 Segurança → Validação`

| # | Tópico | Pergunta central | Ação |
|---:|---|---|---|
| **01** | Authentication | **Quem é você e como prova isso?** | [▶️ Começar](01-Authentication.md) |
| **02** | Authorization | **O que você pode fazer?** | [Abrir](02-Authorization.md) |
| **03** | Tokens e Claims | **Qual contexto foi transportado?** | [Abrir](03-Tokens-e-Claims.md) |
| **04** | Sessões | **Por quanto tempo o acesso permanece válido?** | [Abrir](04-Sessoes.md) |
| **05** | Controle de Acesso | **Qual mecanismo representa a regra?** | [Abrir](05-Controle-de-Acesso.md) |
| **06** | Decisão de Acesso | **Por que foi permitido ou negado?** | [Abrir](06-Decisao-de-Acesso.md) |
| **07** | Segurança | **Como reduzir probabilidade e impacto?** | [Abrir](07-Seguranca.md) |

## 🔁 Método único de estudo

**Estudar → Praticar → Resolver cenário → Explicar → Validar → Registrar evidência → Próximo**

Todos os tópicos seguem esse ciclo. Isso transforma o diretório em uma trilha, não em uma coleção de páginas.

## 🧩 Conexão entre os tópicos

```text
Identidade
    ↓
Authentication
    ↓
Token / Claims / Contexto
    ↓
Sessão
    ↓
Controle de Acesso
    ↓
Policy + Authorization
    ↓
Allow / Deny
    ↓
Recurso
    ↓
Segurança + Monitoramento
```

Use esse fluxo como mapa mental para interpretar os cenários dos sete tópicos.

## ⚙️ Controle pelo terminal

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
```

Para concluir uma validação específica:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 concluir ".\04-Authentication-e-Authorization\01-Conceitos\01-Authentication.md" 1
```

> [!NOTE]
> O número usado em `concluir` corresponde somente aos itens da seção **Validação** do arquivo informado.

## 🏁 Definition of Done do módulo

Considere **Conceitos concluído** somente quando:

- [ ] Os 7 tópicos foram validados individualmente
- [ ] Consigo explicar Authentication x Authorization sem consultar
- [ ] Consigo interpretar token, claims e sessão
- [ ] Consigo escolher um mecanismo de controle de acesso para um cenário
- [ ] Consigo investigar um `401` ou `403` seguindo evidências
- [ ] Consigo relacionar ameaça → impacto → controle
- [ ] Consigo explicar o fluxo completo:

`Identidade → Authentication → Token/Contexto → Sessão → Policy → Authorization → Recurso → Segurança`

## ▶️ Navegação

[← Fase 04](../README.md) · [🏠 Início](../../README.md) · [▶️ Começar Authentication](01-Authentication.md) · [📚 Próximo módulo: Conhecimentos](../02-Conhecimentos/README.md)
