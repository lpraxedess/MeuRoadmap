# 07 — JML

[← Voltar](06-Least-Privilege.md) · [🏠 Início](../../README.md) · [Próximo →](08-Entitlement.md)

> **Objetivo profissional:** entender como eventos do ciclo de vida alteram automaticamente identidade e acesso.

## 🎯 O que dominar

- Joiner, Mover e Leaver
- Rehire e Contractor
- Service Account e Machine Identity
- provisioning e deprovisioning
- eventos que disparam mudanças de acesso

## 🧠 Você precisa conseguir

- explicar JML de ponta a ponta
- identificar o evento que dispara cada mudança
- determinar acessos que entram e saem
- identificar riscos de contas órfãs e acesso residual

## 🛠️ Prática guiada

Modele: **contratação → acesso inicial → mudança de função → remoção do acesso antigo → desligamento**.

Para cada etapa registre: evento, fonte da informação, aprovação, acesso concedido, acesso removido e evidência.

## 🏢 Cenário profissional

Um colaborador muda do Financeiro para TI. O RH atualiza o cargo, mas o acesso ao ERP financeiro permanece ativo.

**Tarefa:** explique onde o processo falhou, qual deveria ser o comportamento esperado e como automatizaria a correção.

## 🎤 Pergunta de entrevista

> Como você desenharia um processo JML para evitar acesso residual após uma movimentação interna?

## ✍️ Minha explicação

> Explique JML com um exemplo de empresa usando suas próprias palavras.

## 📎 Evidência

Registre o fluxo e o cenário em `docs/evidencias/07-jml/`.

## ✅ Validação

- [ ] Estudei
- [ ] Modelei o fluxo JML
- [x] Já consigo explicar JML
- [ ] Resolvi o cenário profissional
- [ ] Registrei minha explicação neste novo formato
- [ ] Consigo identificar riscos de lifecycle

## ▶️ Próximo passo

Depois de validar JML, avance para **Entitlement**.

[← Voltar](06-Least-Privilege.md) · [🏠 Início](../../README.md) · [Próximo →](08-Entitlement.md)