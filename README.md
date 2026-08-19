# IAM Career Hub

Hub pessoal de formação para a transição e evolução em **IAM → Cloud IAM → IAM Engineer**, com foco inicial em Microsoft Entra ID e expansão para IGA, PAM, CIEM, automação, AWS e arquitetura.

## Como usar

1. Abra o Hub.
2. Entre em **Today**.
3. Clique em **Continuar**.
4. Estude o assunto indicado.
5. Execute a prática/laboratório.
6. Valide o conhecimento.
7. Marque a competência como concluída.
8. O progresso e a próxima competência são recalculados automaticamente.

## Regra do roadmap

Experiência prévia, currículo ou laboratório antigo **não marcam competências automaticamente**. O objetivo é revalidar o conhecimento de forma objetiva e prática.

## Estrutura

- `index.html` — aplicação
- `app.js` — motor do Hub, progresso, Today e dependências
- `styles.css` — interface responsiva
- `data/roadmap.js` — fonte de verdade das competências
- `.github/workflows/pages.yml` — publicação no GitHub Pages

## Persistência

O progresso da primeira versão é salvo no navegador via `localStorage`. O Hub também permite exportar/importar o progresso em JSON.

## Trilha atual

Fundamentos → Active Directory → Entra ID → Hybrid Identity → Protocolos → Governance/PIM/PAM → Azure IAM → Automação → AWS IAM → CIEM/Zero Trust → Arquitetura → Certificações/Entrevistas.
