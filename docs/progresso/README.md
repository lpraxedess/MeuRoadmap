# Progresso do MeuRoadmap

O progresso agora é medido **por fase**, não por quantidade de páginas.

## Fluxo

**Estude → Pratique → Aplique → Explique → Valide → Próxima fase**

Cada fase possui um **Gate de 5 etapas**. As áreas internas continuam disponíveis para aprofundamento, mas não são uma fila obrigatória.

## Controle

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
```

Mostra somente o próximo passo.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 validar
```

Mostra as perguntas da validação final.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 concluir
```

Marca automaticamente o próximo item pendente do Gate. Ao concluir os 5 itens, a próxima fase é ativada automaticamente.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 status
```

Mostra somente o progresso da fase atual.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 verificar
```

Audita estrutura, Gates e validações das 12 fases.

## Evidência

Uma evidência deve demonstrar aplicação real: anotação própria, laboratório, exercício, troubleshooting, projeto, documentação, comando executado ou resultado obtido.

**Não é necessário preencher todas as áreas internas para avançar.** Aprofundamento é acionado quando surgir uma lacuna ou quando o passo guiado pedir.
