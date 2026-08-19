# Fase 01 — Fundamentos de IAM

[← Início](../README.md) · [Painel](../docs/progresso/painel.md)

> **Objetivo:** construir o modelo mental necessário para entender identidade, contas, autenticação, autorização e acesso.

## Rota principal

Você só precisa seguir esta sequência:

1. **Estude:** [Conceitos](01-Fundamentos/01-Conceitos/README.md) — identidade, conta, Authentication, Authorization, modelos de acesso, least privilege, JML, entitlement, SoD e arquitetura.
2. **Pratique:** [Prática](03-Pratica/README.md) — transforme os conceitos em decisões.
3. **Aplique:** [Laboratórios](04-Laboratorios/README.md) — execute pelo menos um cenário.
4. **Explique:** registre sua explicação em [PROGRESSO](PROGRESSO.md) ou na evidência do exercício.
5. **Valide:** use `powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 validar` e responda sem consultar.

**Não é necessário abrir as outras áreas agora.** Elas são aprofundamento.

## 🎯 Validação final

1. Qual é a diferença entre identidade, conta, credencial e acesso?
2. Explique Authentication e Authorization em um fluxo corporativo.
3. Como você aplicaria least privilege sem impedir o trabalho do usuário?
4. Explique JML, entitlement e SoD usando um exemplo realista.
5. Diante de um acesso indevido, qual seria seu raciocínio de investigação?

## 🎯 Gate da fase

- [ ] Estudei o núcleo da fase sem tentar ler todo o repositório
- [ ] Executei a prática e pelo menos uma aplicação/laboratório
- [ ] Expliquei o modelo mental com minhas próprias palavras
- [ ] Resolvi a validação final sem consultar
- [ ] Registrei a evidência e consigo defender minhas decisões

## Aprofundamento opcional

- [02 Conhecimentos](02-Conhecimentos/README.md)
- [03 Prática](03-Pratica/README.md)
- [04 Laboratórios](04-Laboratorios/README.md)
- [05 Exercícios](05-Exercicios/README.md)
- [06 Troubleshooting](06-Troubleshooting/README.md)
- [07 Checklist](07-Checklist/README.md)
- [08 Revisão](08-Revisao/README.md)
- [09 Certificações](09-Certificacoes/README.md)

Use essas áreas somente quando o passo guiado pedir aprofundamento ou quando precisar corrigir uma lacuna.

### Controle

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 validar
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 concluir
```
