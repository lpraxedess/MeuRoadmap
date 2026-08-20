# IAM Career Hub

Roadmap pessoal para desenvolvimento profissional em **IAM / Cloud IAM / IAM Engineering**, com progressão por dependências, prática, validação, evidências, certificações e portfólio.

## Objetivo

Transformar estudo em competência demonstrável. Uma competência não deve ser tratada apenas como conteúdo lido: a trilha combina estudo, prática, troubleshooting, validação e evidência.

## Arquitetura

Aplicação web estática, sem backend:

```text
index.html
├── data/roadmap.js
├── data/learning.js
├── data/resources.js
├── data/competency-details.js
├── data/career-audit.js
├── data/certifications.js
├── data/roadmap-extension.js
├── app-v5.js
├── certification-ui-v2.js
└── integrity.js
```

- `data/*`: fonte de dados e regras de conteúdo.
- `app-v5.js`: aplicação principal e renderização.
- `certification-ui-v2.js`: renderização das certificações a partir de `data/certifications.js`.
- `integrity.js`: validação do estado local, importação e requisito de evidência para competências práticas.
- `styles.css` / `stage.css`: interface.
- `.github/workflows/pages.yml`: validação e deploy no GitHub Pages.

## Estado local

O progresso é armazenado no `localStorage` usando a chave `iam-career-hub-state-v8`.

O formato contém, entre outros campos:

```text
stageDone
 done
evidence
english
history
started
```

Não há dados de autenticação, tokens ou segredos no armazenamento.

## Regra de conclusão

- Tarefas comuns: todas as etapas precisam ser concluídas.
- `lab`: a etapa final exige evidência registrada.
- `validate`: a etapa final exige evidência registrada.
- Dependências (`pre`) precisam estar concluídas antes de uma competência ser liberada.

## Desenvolvimento

Não é necessário framework ou build step. Abra `index.html` em um servidor estático local para testar a aplicação.

Exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## CI/CD

O workflow valida a sintaxe JavaScript, a integridade básica dos dados e publica o site no GitHub Pages.

## Princípios de manutenção

1. `data/certifications.js` é a fonte de verdade das certificações.
2. Não adicionar lógica de negócio nova em arquivos de correção temporária.
3. Não reintroduzir versões antigas de `app.js` ou mecanismos paralelos de navegação.
4. Alterações no modelo de estado devem preservar compatibilidade ou definir migração explícita.
5. Competências práticas devem continuar exigindo evidência.
