# 07 — Segurança de Authentication e Authorization

[← Decisão de Acesso](06-Decisao-de-Acesso.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo → Conceitos](README.md)

> **Objetivo profissional:** reconhecer ameaças de identidade e acesso, priorizar o risco e selecionar controles que reduzam probabilidade e impacto.

> [!IMPORTANT]
> Não trate um controle isoladamente. Pense em **prevenção → detecção → contenção → recuperação**.

---

## 🧭 Fluxo deste tópico

**Identificar ameaça → Estimar impacto → Selecionar controles → Definir evidência → Validar → Registrar → Fechar Conceitos**

## 🎯 O que dominar

- credential stuffing
- brute force
- phishing
- token theft
- session hijacking
- privilege escalation
- broken access control
- MFA e resistência a phishing
- least privilege
- detecção e resposta a abuso de identidade

## 🧠 Mapa rápido

| Ameaça | Alvo principal | Controle prioritário | Evidência |
|---|---|---|---|
| Credential stuffing | credenciais reutilizadas | MFA + detecção de login anômalo | eventos de autenticação |
| Brute force | mecanismo de autenticação | rate limiting + detecção | tentativas/alertas |
| Phishing | fator/credencial | MFA resistente a phishing + treinamento | autenticações/alertas |
| Token theft | token/contexto | proteção, expiração/rotação conforme arquitetura | uso do token |
| Session hijacking | sessão/cookie | TLS + proteção de cookie + rotação | sessões/logs |
| Privilege escalation | autorização | least privilege + revisão de privilégios | mudanças de acesso |
| Broken access control | policy/authorization | testes de autorização + deny-by-default | decisões de acesso |

> [!TIP]
> O controle correto depende da arquitetura. A tabela é um ponto de partida para raciocínio, não uma receita universal.

## 🛠️ 1. Prática guiada — matriz de risco

Escolha três ameaças e preencha:

| Ameaça | Vetor | Ativo afetado | Impacto | Prevenção | Detecção | Contenção | Evidência |
|---|---|---|---|---|---|---|---|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

Depois priorize as três pelo risco operacional.

## 🏢 2. Cenário profissional — conta privilegiada comprometida

Uma conta administrativa foi comprometida. O atacante conseguiu autenticar, mas não deveria conseguir executar determinadas ações.

Analise em sequência:

1. qual fator/credencial foi comprometido;
2. quais sessões/tokens podem estar ativos;
3. quais privilégios a identidade possui;
4. quais ações deveriam ser negadas;
5. quais sinais indicariam abuso;
6. como conter o incidente;
7. como recuperar e validar o acesso legítimo.

### Resultado esperado

`Comprometimento → Exposição → Controles existentes → Lacuna → Contenção → Correção → Evidência de recuperação`

## 🔬 3. Exercício — defesa em camadas

Para cada ameaça escolhida, identifique pelo menos:

- **1 controle preventivo**;
- **1 controle de detecção**;
- **1 ação de contenção**;
- **1 evidência que comprovaria a eficácia**.

Explique por que remover apenas um controle não deve derrubar toda a proteção.

## 🎤 4. Pergunta de entrevista

> **Como MFA e least privilege reduzem riscos diferentes?**

Responda comparando **probabilidade de comprometimento** e **impacto após comprometimento**.

## ✍️ 5. Minha explicação

> **Credential stuffing é...**
>
> **Token theft é perigoso porque...**
>
> **MFA reduz...**
>
> **Least privilege reduz...**
>
> **Depois de um comprometimento eu priorizaria...**

## 📎 6. Minha evidência

- **Matriz de ameaças:** `a preencher`
- **Análise de risco:** `a preencher`
- **Cenário de conta comprometida:** `a preencher`
- **Controles preventivos/detectivos:** `a preencher`
- **Resposta de entrevista:** `a preencher`
- **Explicação própria:** `a preencher`

> [!WARNING]
> Não registre credenciais, tokens, cookies, chaves, dados pessoais ou detalhes internos sensíveis.

## ✅ 7. Validação

- [ ] Expliquei as principais ameaças
- [ ] Relacionei ameaça, vetor e impacto
- [ ] Escolhi controles preventivos
- [ ] Escolhi controles de detecção
- [ ] Defini uma estratégia de contenção
- [ ] Analisei o comprometimento de uma conta privilegiada
- [ ] Expliquei MFA x least privilege
- [ ] Priorizei riscos por impacto operacional
- [ ] Respondi à entrevista sem consultar
- [ ] Registrei evidências sanitizadas
- [ ] Escrevi minha explicação própria

## 🏁 Fechamento de Conceitos

Os 7 tópicos de Conceitos estão concluídos quando você consegue conectar:

`Identidade → Authentication → Token → Sessão → Controle de Acesso → Decisão → Segurança`

Faça a validação final do módulo antes de avançar para **Conhecimentos**.

## ▶️ Próximo passo

[← Decisão de Acesso](06-Decisao-de-Acesso.md) · [🏠 Índice de Conceitos](README.md) · [📚 Próximo módulo: Conhecimentos](../02-Conhecimentos/README.md)
