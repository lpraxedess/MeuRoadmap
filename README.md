# MeuRoadmap — IAM

> **Uma trilha. Uma ação por vez. Sem navegar por dezenas de pastas.**

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 agora
```

O terminal sempre mostra **uma única próxima ação**.

### Fluxo

**Estudar → Praticar → Aplicar → Explicar → Testar → Avançar**

Você não precisa decidir o que estudar, qual arquivo abrir ou qual checklist marcar. O script controla a sequência.

## Mapa

| # | Fase | Resultado |
|---:|---|---|
| 01 | Fundamentos de IAM | raciocinar sobre identidade e acesso |
| 02 | Identidade e Diretórios | entender diretórios e identidades corporativas |
| 03 | Protocolos IAM | explicar SSO, federation e provisioning |
| 04 | Authentication e Authorization | investigar decisões de acesso |
| 05 | IGA | governar ciclo de vida e acessos |
| 06 | Access Management | projetar permissões mínimas |
| 07 | PAM | controlar privilégios |
| 08 | Cloud IAM | proteger identidades e workloads cloud |
| 09 | CIAM | proteger identidades de clientes |
| 10 | Zero Trust e ITDR | detectar e responder a risco de identidade |
| 11 | Automação e DevSecOps | automatizar IAM com controle |
| 12 | Arquitetura IAM | integrar tudo em uma arquitetura |

## Comandos

```text
agora       mostra a próxima ação
estudar     abre o núcleo da fase atual
praticar    mostra a prática da fase atual
aplicar     mostra o cenário profissional
explicar    mostra o que você precisa explicar sem consulta
testar      executa o teste da fase
concluir    registra a etapa atual e avança
status      mostra o progresso
verificar   audita a estrutura e o estado
ajuda       mostra os comandos
```

### Regra de avanço

Uma fase só termina quando as cinco etapas forem concluídas. Ao terminar o teste, o script avança automaticamente para a próxima fase.

**Não há checklist duplicado, subtrilhas obrigatórias ou nove diretórios por fase.** O aprofundamento fica dentro do próprio documento da fase.
