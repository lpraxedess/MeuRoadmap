# MeuRoadmap

> **Minha bússola pessoal para me profissionalizar em IAM.**

> [!IMPORTANT]
> O roadmap não é uma lista para ler. Cada etapa só avança quando eu consigo **estudar → praticar → explicar → validar → concluir**.

---

## 🧭 Agora

| | |
|---|---|
| **Fase** | **01 — Fundamentos de IAM** |
| **Área** | **01 — Conceitos** |
| **Fluxo** | Estudar → Praticar → Explicar → Validar → Concluir |
| **Próximo passo** | Abrir o tópico atual |

### ▶️ [CONTINUAR DE ONDE PAREI](./01-Fundamentos/01-Conceitos/01-Identidade.md)

---

## 🗺️ Minha trilha

| # | Fase | Estado | Entrada |
|---:|---|---|---|
| **01** | Fundamentos de IAM | 🟢 **EM ANDAMENTO** | [Abrir fase](./01-Fundamentos/README.md) |
| **02** | Identidade e Diretórios | 🔒 Bloqueada | [Abrir](./02-Identidade-e-Diretorios/README.md) |
| **03** | Protocolos IAM | 🔒 Bloqueada | [Abrir](./03-Protocolos-IAM/README.md) |
| **04** | Authentication e Authorization | 🔒 Bloqueada | [Abrir](./04-Authentication-e-Authorization/README.md) |
| **05** | IGA | 🔒 Bloqueada | [Abrir](./05-IGA/README.md) |
| **06** | Access Management | 🔒 Bloqueada | [Abrir](./06-Access-Management/README.md) |
| **07** | PAM | 🔒 Bloqueada | [Abrir](./07-PAM/README.md) |
| **08** | Cloud IAM | 🔒 Bloqueada | [Abrir](./08-Cloud-IAM/README.md) |
| **09** | CIAM | 🔒 Bloqueada | [Abrir](./09-CIAM/README.md) |
| **10** | Zero Trust e ITDR | 🔒 Bloqueada | [Abrir](./10-Zero-Trust-e-ITDR/README.md) |
| **11** | Automação e DevSecOps | 🔒 Bloqueada | [Abrir](./11-Automacao-e-DevSecOps/README.md) |
| **12** | Arquitetura IAM | 🔒 Bloqueada | [Abrir](./12-Arquitetura-IAM/README.md) |

---

## 🎯 Como usar

**1. Escolha o próximo item** → **2. Estude** → **3. Faça a prática** → **4. Escreva com suas palavras** → **5. Marque a validação** → **6. Vá para o próximo**.

Cada tópico possui navegação **← Voltar · 🏠 Início · Próximo →**, portanto não é necessário voltar manualmente pela árvore do repositório.

> [!TIP]
> Se eu não consigo explicar sem consultar, o item ainda não está concluído.

---

## 🧩 Trilhas complementares

| Área | Objetivo | Acesso |
|---|---|---|
| 🔬 Labs | Construir experiência prática | [Abrir](./13-Labs/README.md) |
| 🎓 Certificações | Validar conhecimento no momento certo | [Abrir](./14-Certificacoes/README.md) |
| 💼 Projetos | Transformar estudo em portfólio | [Abrir](./15-Projetos/README.md) |
| 🎤 Entrevistas | Preparar-me para o mercado | [Abrir](./16-Entrevistas/README.md) |

---

## 📊 Meu acompanhamento

- [📈 Painel de progresso](./docs/progresso/painel.md)
- [📝 Registro de estudos](./docs/progresso/registro-estudos.md)
- [🔄 Revisões](./docs/revisoes/README.md)
- [🏃 Sprints](./docs/sprints/README.md)
- [💼 Career Log](./career-log.md)

---

## ⚙️ Controle pelo terminal

### Descobrir o próximo item

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
```

### Ver progresso

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 status
```

### Concluir uma validação

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 concluir ".\01-Fundamentos\01-Conceitos\01-Identidade.md" 1
```

> [!NOTE]
> O número usado em `concluir` corresponde **somente aos itens da seção `Validação` daquele arquivo**. Isso evita marcar acidentalmente outro checklist do documento.

---

<details>
<summary>📌 Regra de conclusão</summary>

Um tópico só está concluído quando:

- [ ] estudei o conteúdo
- [ ] fiz a prática
- [ ] consigo explicar sem consultar
- [ ] registrei minha explicação
- [ ] consigo aplicar o conceito em um cenário profissional

</details>

---

### 🧭 Navegação rápida

[🏠 Início](./README.md) · [▶️ Fase 01](./01-Fundamentos/README.md) · [📈 Painel](./docs/progresso/painel.md)
