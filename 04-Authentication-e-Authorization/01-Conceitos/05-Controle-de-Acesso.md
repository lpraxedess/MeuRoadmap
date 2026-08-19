# 05 — Controle de Acesso

[← Sessões](04-Sessoes.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo →](06-Decisao-de-Acesso.md)

> **Objetivo profissional:** escolher, aplicar e justificar mecanismos de controle de acesso de acordo com o recurso, o contexto e o risco.

> [!IMPORTANT]
> Não escolha um modelo apenas pelo nome. Comece pelo cenário, identifique os atributos necessários e então determine qual mecanismo representa melhor a regra de acesso.

---

## 🧭 Fluxo deste tópico

**Entender o modelo → Ler o cenário → Identificar regras → Escolher mecanismo → Justificar trade-offs → Validar → Registrar evidência**

---

## 🎯 O que dominar

- RBAC — Role-Based Access Control
- ABAC — Attribute-Based Access Control
- policy-based access
- claims-based access
- scope-based access
- context-aware access
- role explosion
- separação entre modelo e política de autorização

## 🧠 Você precisa conseguir

Ao terminar, você deve conseguir:

- explicar o princípio de cada modelo;
- transformar uma regra de negócio em uma decisão de acesso;
- escolher um mecanismo para um cenário concreto;
- explicar vantagens e limitações;
- reconhecer quando RBAC está ficando excessivamente amplo;
- identificar quando atributos, claims, scopes ou contexto são necessários;
- justificar uma escolha tecnicamente.

---

## 🧩 1. Mapa mental dos modelos

| Modelo | Pergunta principal | Exemplo |
|---|---|---|
| **RBAC** | Qual é a role do usuário? | `Analista → relatório` |
| **ABAC** | Quais atributos satisfazem a regra? | `departamento=Financeiro` |
| **Policy-based** | Qual política deve ser satisfeita? | `permitir se regra X` |
| **Claims-based** | Quais claims carregam o contexto? | `department=Finance` |
| **Scope-based** | Quais scopes foram concedidos? | `orders.read` |
| **Context-aware** | Em qual contexto a requisição ocorre? | dispositivo + localização + risco |

> [!TIP]
> Um sistema real pode combinar mecanismos. O objetivo é reconhecer qual dimensão está determinando a decisão.

---

## 🔎 2. Método para escolher o modelo

Antes de escolher RBAC, ABAC ou outro mecanismo, responda:

1. **Quem** está solicitando acesso?
2. **O quê** está sendo acessado?
3. **Qual ação** está sendo executada?
4. **Quais atributos** precisam ser considerados?
5. **Qual contexto** altera a decisão?
6. **Qual risco** precisa ser controlado?
7. **A regra é estável ou muda frequentemente?**

Depois escreva a regra no formato:

`Sujeito + Ação + Recurso + Condições → Permit/Deny`

Exemplo:

`Analista + read + relatório financeiro + departamento=Financeiro → Permit`

---

## 🧪 3. Prática guiada — dois cenários

### Cenário A — sistema interno

Sistema corporativo com funções relativamente estáveis:

- Analista consulta relatórios;
- Gestor aprova solicitações;
- Auditor consulta registros;
- Administrador gerencia configurações.

**Tarefa:** escolha o mecanismo predominante e justifique.

### Cenário B — API contextual

Uma API possui regras baseadas em:

- departamento;
- localização;
- sensibilidade do recurso;
- dispositivo;
- nível de risco;
- operação solicitada.

**Tarefa:** escolha o mecanismo predominante e explique por que uma simples role pode não representar toda a regra.

### Compare

| Critério | Cenário A | Cenário B |
|---|---|---|
| Regra predominante | | |
| Modelo escolhido | | |
| Atributos necessários | | |
| Complexidade | | |
| Principal risco | | |
| Justificativa | | |

---

## 🏢 4. Cenário profissional — role explosion

Uma empresa possui centenas de roles quase idênticas. Cada novo departamento gera novas combinações de roles.

Investigue:

- quais roles realmente diferem;
- quais permissões são comuns;
- quais regras dependem de atributos;
- onde existe sobreposição;
- quais roles concedem privilégios excessivos;
- quais grupos ou políticas poderiam simplificar o desenho.

### Resultado esperado

Produza uma proposta contendo:

`Problema → Evidência → Causa → Modelo atual → Simplificação → Risco residual → Validação`

> [!WARNING]
> Adicionar roles indefinidamente para representar cada exceção pode transformar o controle de acesso em uma matriz difícil de administrar e auditar.

---

## 🧠 5. Teste de decisão

Para cada regra, indique o mecanismo mais adequado e explique o motivo:

1. `Todo gerente pode aprovar solicitações.`
2. `Usuário pode acessar somente registros do próprio departamento.`
3. `Aplicação pode ler pedidos apenas quando o scope correto foi concedido.`
4. `Acesso administrativo exige dispositivo confiável e baixo risco.`
5. `Usuário pode consultar um recurso se uma política específica for satisfeita.`

Não basta escrever o nome do modelo: **escreva a característica da regra que levou à escolha.**

---

## 🎤 6. Pergunta de entrevista

> **Quando RBAC é suficiente e quando você precisaria de atributos ou contexto?**

Estruture sua resposta em:

`cenário → regra → limitação do RBAC → mecanismo complementar → trade-off`

---

## ✍️ 7. Minha explicação

Complete sem copiar a definição do material:

> **RBAC é adequado quando...**
>
> **ABAC é útil quando...**
>
> **Claims/scopes ajudam a...**
>
> **Contexto passa a ser importante quando...**
>
> **Role explosion acontece quando...**
>
> **Eu escolheria um modelo avaliando...**

---

## 📎 8. Minha evidência

- **Tabela de comparação:** `a preencher`
- **Decisões dos cenários:** `a preencher`
- **Análise de role explosion:** `a preencher`
- **Teste de decisão:** `a preencher`
- **Resposta de entrevista:** `a preencher`
- **Explicação própria:** `a preencher`

> [!WARNING]
> Não registre dados reais de usuários, tokens, claims sensíveis ou informações internas da empresa como evidência.

---

## ✅ 9. Validação

Marque somente depois de executar a atividade correspondente:

- [ ] Expliquei RBAC sem consultar
- [ ] Expliquei ABAC sem consultar
- [ ] Diferenciei policy, claims e scopes
- [ ] Expliquei quando contexto influencia a decisão
- [ ] Transformei regras em `Sujeito + Ação + Recurso + Condições → Permit/Deny`
- [ ] Comparei os dois cenários
- [ ] Analisei role explosion
- [ ] Resolvi o teste de decisão
- [ ] Expliquei os trade-offs
- [ ] Respondi à pergunta de entrevista sem consultar
- [ ] Registrei minha explicação e evidências

---

## 🏁 Critério para avançar

Você pode seguir para **Decisão de Acesso** quando conseguir olhar para uma regra e identificar:

`Sujeito → Ação → Recurso → Condições → Política → Permit/Deny`

e justificar por que o mecanismo escolhido representa melhor aquela regra.

---

## ▶️ Próximo passo

[← Sessões](04-Sessoes.md) · [📚 Índice de Conceitos](README.md) · [Próximo → Decisão de Acesso](06-Decisao-de-Acesso.md)