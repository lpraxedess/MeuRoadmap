# 01 — Authentication

[← Conceitos](README.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo →](02-Authorization.md)

> **Objetivo profissional:** entender como uma identidade prova quem é, avaliar a força da autenticação e diagnosticar falhas de acesso relacionadas a credenciais e fatores.

---

## 🧭 Onde estou

**Fase 04 → Conceitos → 01 Authentication**

**Fluxo:** Estudar → Praticar → Explicar → Validar → Registrar → Próximo

> [!TIP]
> Não avance porque terminou a leitura. Avance quando conseguir explicar o assunto com suas próprias palavras e resolver o cenário sem consultar o material.

---

## 🎯 O que dominar

- identificação × autenticação × autorização
- fatores de autenticação
- senha, OTP, certificado e biometria
- MFA
- passwordless e passkeys
- autenticação forte e autenticação adaptativa
- risco de credenciais comprometidas
- evidências úteis para diagnosticar uma falha de autenticação

---

## 🧠 Resultado esperado

Ao terminar este tópico, você deve conseguir:

- explicar Authentication em uma frase própria;
- diferenciar identificação, autenticação e autorização;
- explicar os três fatores clássicos e dar exemplos;
- explicar por que MFA não significa simplesmente usar duas senhas;
- explicar o que acontece quando uma credencial é comprometida;
- identificar evidências relevantes em uma tentativa de autenticação;
- explicar como uma política de risco pode bloquear uma autenticação mesmo com a senha correta.

---

## 📚 Estudo

Estude nesta ordem:

1. **Identificação** — quem está tentando acessar.
2. **Autenticação** — como essa identidade prova que é quem afirma ser.
3. **Fatores** — conhecimento, posse e inerência.
4. **MFA** — combinação de fatores independentes.
5. **Passwordless / Passkeys** — autenticação sem depender de senha tradicional.
6. **Risco** — contexto, dispositivo, localização, comportamento e sinais de comprometimento.
7. **Evidências** — logs, eventos, método utilizado, resultado e política aplicada.

### Pergunta de controle

> Se alguém possui a senha correta, por que ainda pode ser bloqueado?

Não consulte a resposta antes de tentar explicar.

---

## 🛠️ Prática guiada

Desenhe o fluxo:

`Usuário → Aplicação → IdP → Fator(es) → Política/Risco → Autenticação → Sessão`

No seu diagrama, identifique:

- onde a identidade é apresentada;
- onde a prova é realizada;
- onde MFA entra;
- onde uma política pode bloquear a tentativa;
- quais eventos seriam registrados;
- em que ponto uma sessão pode ser criada.

### Entrega

Registre o diagrama em uma ferramenta de sua preferência e coloque o caminho ou link em **Evidência**.

---

## 🏢 Cenário profissional

Um colaborador informa a senha correta, mas o acesso é bloqueado por uma política de risco.

Investigue como se fosse um incidente real:

1. Qual foi o método de autenticação?
2. O segundo fator foi solicitado ou bloqueado antes dele?
3. O dispositivo era confiável?
4. Houve mudança incomum de localização ou comportamento?
5. A conta apresentou tentativas anteriores suspeitas?
6. Qual política tomou a decisão?
7. Qual evidência comprova a causa?

**Resultado esperado:** explicar a causa provável sem confundir autenticação com autorização.

---

## 🎤 Pergunta de entrevista

> Qual a diferença entre autenticação e autorização? Dê um exemplo em uma aplicação corporativa.

**Regra:** responda sem consultar o material. Depois compare sua resposta com o que estudou e registre os pontos que faltaram.

---

## ✍️ Minha explicação

**Authentication é:**

> Escreva com suas próprias palavras.

**MFA é:**

> Escreva com suas próprias palavras.

**Uma autenticação pode ser bloqueada mesmo com a senha correta porque:**

> Escreva com suas próprias palavras.

---

## 📎 Evidência

- **Diagrama:** `cole aqui`
- **Laboratório:** `cole aqui`
- **Anotação:** `cole aqui`
- **Erro que tive:** `registre aqui`
- **O que aprendi com o erro:** `registre aqui`

---

## ✅ Validação

Marque somente depois de executar cada ação.

- [ ] Estudei identificação × autenticação × autorização
- [ ] Expliquei os três fatores clássicos
- [ ] Expliquei MFA sem consultar
- [ ] Expliquei passwordless / passkeys em nível conceitual
- [ ] Desenhei o fluxo de autenticação
- [ ] Identifiquei pontos de falha no fluxo
- [ ] Resolvi o cenário profissional
- [ ] Respondi à pergunta de entrevista sem consultar
- [ ] Registrei minha explicação com minhas palavras
- [ ] Registrei pelo menos uma evidência

### 🏁 Critério para avançar

Você pode seguir para **Authorization** quando conseguir explicar o fluxo abaixo sem consultar:

`Identidade → Authentication → Fatores → Política/Risco → Sessão`

---

## ▶️ Próximo passo

**Concluído?**

[← Voltar para Conceitos](README.md) · [Próximo → Authorization](02-Authorization.md)

[🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md)

### Terminal

Para atualizar o progresso pelo terminal:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
```

Para marcar uma validação pelo número do item:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 concluir ".\04-Authentication-e-Authorization\01-Conceitos\01-Authentication.md" 1
```

> [!IMPORTANT]
> O comando `concluir` considera os itens da seção **Validação**. Marque primeiro o que realmente executou; o progresso deve refletir seu domínio real.
