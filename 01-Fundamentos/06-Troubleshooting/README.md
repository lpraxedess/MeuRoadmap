# 06 — Troubleshooting

[← Exercícios](../05-Exercicios/README.md) · [🏠 Início](../../README.md) · [Próximo → Validação](../08-Revisao/README.md)

> **Objetivo:** investigar sintomas de identidade e acesso até encontrar a causa raiz.

## 🧭 Método profissional

**Sintoma → Hipótese → Evidência → Teste → Causa raiz → Correção → Validação → Registro**

Não pule diretamente para a solução. Primeiro prove a causa.

## 🔎 Cenário 01 — Usuário não acessa uma aplicação

**Investigue:** identidade, conta, grupo, role, policy, permission, AuthN e AuthZ.

**Pergunta-chave:** em qual ponto do caminho o acesso está falhando?

- [ ] Listei hipóteses
- [ ] Coletei evidências
- [ ] Testei hipóteses
- [ ] Encontrei causa raiz
- [ ] Corrigi e validei

## 🔎 Cenário 02 — Authentication funciona, mas Access Denied

**Investigue:** AuthZ, entitlement, ACL, role e policy.

**Pergunta-chave:** a identidade foi reconhecida, mas qual regra está negando o acesso?

- [ ] Listei hipóteses
- [ ] Coletei evidências
- [ ] Testei hipóteses
- [ ] Encontrei causa raiz
- [ ] Corrigi e validei

## 🔎 Cenário 03 — Usuário desligado ainda possui acesso

**Investigue:** lifecycle, provisioning, deprovisioning, conta, grupos e aplicações.

**Pergunta-chave:** em qual etapa do Leaver o acesso deixou de ser removido?

- [ ] Listei hipóteses
- [ ] Coletei evidências
- [ ] Testei hipóteses
- [ ] Encontrei causa raiz
- [ ] Corrigi e validei

## 🔎 Cenário 04 — Service account com privilégio excessivo

**Investigue:** ownership, permissions, credential, least privilege e privilege escalation.

**Pergunta-chave:** quais permissões são realmente necessárias para o serviço funcionar?

- [ ] Listei hipóteses
- [ ] Coletei evidências
- [ ] Testei hipóteses
- [ ] Encontrei causa raiz
- [ ] Corrigi e validei

## 📝 Registro do incidente

```text
Sintoma:
Impacto:
Hipóteses:
Evidências coletadas:
Testes realizados:
Causa raiz:
Correção:
Validação:
Lição aprendida:
```

## ✍️ Minha explicação

> Explique como você raciocinou, quais evidências foram decisivas e o que faria diferente em um incidente real.

## 🎯 Definition of Done

- [ ] Cenário 01
- [ ] Cenário 02
- [ ] Cenário 03
- [ ] Cenário 04
- [ ] Registrei causa raiz e evidências
- [ ] Consigo explicar meu método de diagnóstico

### Navegação

[← Exercícios](../05-Exercicios/README.md) · [🏠 Início](../../README.md) · [Próximo → Validação](../08-Revisao/README.md)
