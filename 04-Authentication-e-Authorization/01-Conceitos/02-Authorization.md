# 02 — Authorization

[← Authentication](01-Authentication.md) · [🏠 Início](../../README.md) · [📈 Painel](../../docs/progresso/painel.md) · [Próximo →](03-Tokens-e-Claims.md)

> **Objetivo profissional:** raciocinar sobre decisões de acesso: quem pode fazer o quê, em qual recurso e sob quais condições.

> [!IMPORTANT]
> Não avance apenas porque leu. Este tópico só está concluído quando você conseguir **modelar, explicar e defender** uma decisão de autorização sem consultar o material.

---

## 🧭 Fluxo deste tópico

**Estudar → Modelar → Resolver cenário → Explicar → Validar → Registrar evidência → Próximo tópico**

---

## 🎯 O que dominar

- `subject` / identidade que solicita acesso
- `resource` / recurso protegido
- `action` / operação solicitada
- `permission` / permissão concedida
- `privilege` / capacidade de executar uma ação
- `role` / conjunto lógico de permissões
- `policy` / regra que determina acesso
- `Allow` x `Deny`
- contexto e condições da decisão
- least privilege

## 🧠 Você precisa conseguir

Ao terminar, você deve conseguir:

- explicar por que autenticar **não significa** ter acesso;
- identificar subject, resource, action e policy em um cenário real;
- diferenciar permission, privilege e role;
- explicar como uma policy participa da decisão;
- justificar tecnicamente um `Allow` ou `Deny`;
- explicar como aplicar least privilege sem quebrar a operação.

---

## 🛠️ 1. Prática guiada — matriz de acesso

Crie uma aplicação fictícia com:

- 3 usuários;
- 3 recursos;
- pelo menos 4 ações;
- 3 perfis/roles;
- permissões diferentes para cada perfil.

Monte uma matriz semelhante a:

| Usuário | Role | Recurso | Ação | Resultado | Justificativa |
|---|---|---|---|---|---|
| Ana | Analista | Relatório | Ler | Allow | função exige leitura |
| Ana | Analista | Pagamento | Aprovar | Deny | não possui privilégio |
| Bruno | Financeiro | Pagamento | Aprovar | Allow | função exige aprovação |

Depois explique **por que cada decisão acontece**.

### Evidência esperada

Registre a matriz, o cenário e sua justificativa em uma anotação própria.

---

## 🔎 2. Desafio — Access Denied

Um usuário autenticado acessa o sistema financeiro, mas recebe `Access Denied` ao tentar aprovar pagamentos.

Investigue nesta ordem:

1. Quem é o subject?
2. Qual resource está sendo acessado?
3. Qual action foi solicitada?
4. Qual role o usuário possui?
5. Qual permission essa role deveria fornecer?
6. Qual policy está sendo aplicada?
7. Existe alguma condição contextual?
8. Existe algum `Deny` explícito?
9. O acesso viola least privilege ou está simplesmente ausente?

**Não altere permissões antes de identificar a causa.**

---

## 🏢 3. Cenário profissional

Imagine que você trabalha no time de IAM e recebe o chamado:

> "O usuário está autenticando normalmente, mas não consegue aprovar pagamentos. Preciso que você dê acesso imediatamente."

Sua tarefa é produzir um diagnóstico técnico antes de conceder qualquer privilégio.

### Resultado esperado

Documente:

- sintoma;
- hipótese inicial;
- evidências necessárias;
- causa provável;
- correção;
- risco da correção;
- validação após a correção.

---

## 🎤 4. Pergunta de entrevista

> **Um usuário autenticou com sucesso e ainda assim recebeu `Access Denied`. O que isso significa?**

Responda sem consultar o material e use um exemplo corporativo.

---

## ✍️ 5. Minha explicação

Escreva com suas próprias palavras:

> **Authorization é...**
>
> **Uma decisão de acesso considera...**
>
> **Authentication e Authorization são diferentes porque...**
>
> **Least privilege significa...**
>
> **No cenário de Access Denied, eu investigaria...**

Não copie definições. O objetivo é verificar se você realmente consegue explicar o conceito.

---

## 📎 6. Minha evidência

Registre aqui o resultado do que você produziu:

- **Matriz de acesso:** `a preencher`
- **Cenário Access Denied:** `a preencher`
- **Explicação própria:** `a preencher`
- **Diagrama/anotação:** `a preencher`
- **Laboratório relacionado:** `a preencher`

---

## ✅ 7. Validação

Marque somente depois de executar a atividade correspondente:

- [ ] Estudei o conteúdo
- [ ] Diferenciei Authentication e Authorization
- [ ] Identifiquei subject, resource, action e policy
- [ ] Diferenciei permission, privilege e role
- [ ] Modelei uma matriz de acesso
- [ ] Resolvi o cenário de `Access Denied`
- [ ] Justifiquei uma decisão `Allow` e uma decisão `Deny`
- [ ] Expliquei least privilege aplicado à autorização
- [ ] Respondi à pergunta de entrevista sem consultar
- [ ] Escrevi minha explicação com minhas próprias palavras
- [ ] Registrei as evidências

> [!TIP]
> O terminal pode marcar a validação para você. O conteúdo escrito nesta página continua sendo sua evidência de aprendizagem.

---

## 🏁 Critério para avançar

Você pode seguir para **Tokens e Claims** quando conseguir, sem consultar:

`Subject → Resource → Action → Policy → Decision → Access`

e explicar por que uma decisão foi permitida ou negada.

---

## ▶️ Próximo passo

[← Authentication](01-Authentication.md) · [📚 Voltar ao índice](README.md) · [Próximo → Tokens e Claims](03-Tokens-e-Claims.md)