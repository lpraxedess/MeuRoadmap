# Fase 01 — Fundamentos de IAM

[← Roadmap](../README.md) · [Painel](../docs/progresso/painel.md)

> **Missão:** construir o modelo mental de IAM e usá-lo para explicar quem pode acessar o quê, por quê e sob quais controles.

## Rota única

### 1. Estude
Leia somente o **núcleo** indicado pelo terminal. Os detalhes estão em [`conteudo/`](conteudo/).

### 2. Pratique
Resolva um cenário de identidade, conta, autenticação, autorização e privilégio.

### 3. Aplique
Modele uma situação corporativa real: identidade → conta → acesso → recurso → risco → controle.

### 4. Explique
Explique o assunto em 5 minutos, sem copiar o material.

### 5. Teste
Responda sem consultar:

1. Qual a diferença entre identidade, conta, credencial e acesso?
2. Como Authentication e Authorization se relacionam?
3. Como aplicar least privilege sem bloquear o negócio?
4. Como JML, entitlement e SoD reduzem risco?
5. Como você investigaria um acesso indevido?

## Gate de conclusão

- [ ] Estudei o núcleo
- [ ] Fiz a prática
- [ ] Apliquei em um cenário profissional
- [ ] Expliquei sem consultar
- [ ] Passei no teste e registrei a evidência

> **Não avance por quantidade de páginas. Avance porque consegue demonstrar domínio.**

## Biblioteca

Todo o conteúdo anterior foi preservado em [`conteudo/`](conteudo/) e pode ser usado para aprofundamento ou correção de lacunas.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 agora
```
