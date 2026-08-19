$Root = Split-Path $PSScriptRoot -Parent
$EstadoPath = Join-Path $Root "docs\progresso\estado.json"
$PainelPath = Join-Path $Root "docs\progresso\painel.md"

$FaseAtual = 1

$fases = @(
    @{ Id=1; Nome="Fundamentos de IAM"; Diretorio="01-Fundamentos" },
    @{ Id=2; Nome="Identidade e Diretorios"; Diretorio="02-Identidade-e-Diretorios" },
    @{ Id=3; Nome="Protocolos IAM"; Diretorio="03-Protocolos-IAM" },
    @{ Id=4; Nome="Authentication e Authorization"; Diretorio="04-Authentication-e-Authorization" },
    @{ Id=5; Nome="IGA"; Diretorio="05-IGA" },
    @{ Id=6; Nome="Access Management"; Diretorio="06-Access-Management" },
    @{ Id=7; Nome="PAM"; Diretorio="07-PAM" },
    @{ Id=8; Nome="Cloud IAM"; Diretorio="08-Cloud-IAM" },
    @{ Id=9; Nome="CIAM"; Diretorio="09-CIAM" },
    @{ Id=10; Nome="Zero Trust e ITDR"; Diretorio="10-Zero-Trust-e-ITDR" },
    @{ Id=11; Nome="Automacao e DevSecOps"; Diretorio="11-Automacao-e-DevSecOps" },
    @{ Id=12; Nome="Arquitetura IAM"; Diretorio="12-Arquitetura-IAM" }
)

$areas = @(
    @{ Nome="Conceitos"; Diretorio="01-Conceitos" },
    @{ Nome="Conhecimentos"; Diretorio="02-Conhecimentos" },
    @{ Nome="Pratica"; Diretorio="03-Pratica" },
    @{ Nome="Laboratorios"; Diretorio="04-Laboratorios" },
    @{ Nome="Exercicios"; Diretorio="05-Exercicios" },
    @{ Nome="Troubleshooting"; Diretorio="06-Troubleshooting" },
    @{ Nome="Checklist"; Diretorio="07-Checklist" },
    @{ Nome="Revisao"; Diretorio="08-Revisao" },
    @{ Nome="Certificacoes"; Diretorio="09-Certificacoes" }
)

function Eh-CabecalhoValidacao([string]$Linha) {
    return ($Linha -match '^##\s+.*Valida(c|ç)ão.*$')
}

function Get-Validacao {
    param([string]$Arquivo)

    $linhas = @(Get-Content $Arquivo -Encoding UTF8)
    $emValidacao = $false
    $total = 0
    $concluidos = 0

    foreach ($linha in $linhas) {
        if (Eh-CabecalhoValidacao $linha) {
            $emValidacao = $true
            continue
        }

        if ($emValidacao -and $linha -match '^##\s+') { break }

        if ($emValidacao -and $linha -match '^\s*-\s*\[\s*(x|X| )\s*\]\s+') {
            $total++
            if ($Matches[1] -match '^[xX]$') { $concluidos++ }
        }
    }

    [PSCustomObject]@{
        Total = $total
        Concluidos = $concluidos
    }
}

function Get-Progresso {
    param([string]$Diretorio)

    if (-not (Test-Path $Diretorio)) {
        return [PSCustomObject]@{ Total=0; Concluidos=0; Percentual=0 }
    }

    $total = 0
    $concluidos = 0

    Get-ChildItem $Diretorio -Filter "*.md" -Recurse -File | ForEach-Object {
        $resultado = Get-Validacao $_.FullName
        $total += $resultado.Total
        $concluidos += $resultado.Concluidos
    }

    $percentual = if ($total -gt 0) { [math]::Round(($concluidos / $total) * 100) } else { 0 }

    [PSCustomObject]@{
        Total = $total
        Concluidos = $concluidos
        Percentual = $percentual
    }
}

$faseAtualObj = $fases[$FaseAtual - 1]
$faseAtualPath = Join-Path $Root $faseAtualObj.Diretorio
$progressoAtual = Get-Progresso $faseAtualPath

$areaTabela = ""
$areasEstado = @{}

foreach ($area in $areas) {
    $path = Join-Path $faseAtualPath $area.Diretorio
    $resultado = Get-Progresso $path
    $areaTabela += "| $($area.Nome) | $($resultado.Concluidos)/$($resultado.Total) | $($resultado.Percentual)% |`r`n"
    $areasEstado[$area.Diretorio] = $resultado.Percentual
}

$faseTabela = ""
$fasesEstado = @()

foreach ($fase in $fases) {
    $path = Join-Path $Root $fase.Diretorio
    $resultado = Get-Progresso $path

    if ($fase.Id -lt $FaseAtual) { $status = "CONCLUIDA" }
    elseif ($fase.Id -eq $FaseAtual) { $status = "EM_ANDAMENTO" }
    else { $status = "BLOQUEADA" }

    $faseTabela += "| $($fase.Id.ToString('00')) | $($fase.Nome) | $status | $($resultado.Percentual)% |`r`n"

    $fasesEstado += [ordered]@{
        id = $fase.Id
        nome = $fase.Nome
        diretorio = $fase.Diretorio
        status = $status
        progresso = $resultado.Percentual
    }
}

$proxima = if ($FaseAtual -lt $fases.Count) { $fases[$FaseAtual] } else { $null }
$proximaTexto = if ($proxima) { "Fase $($proxima.Id.ToString('00')) - $($proxima.Nome)" } else { "Roadmap concluido" }

$painel = @"
# 📈 Painel de Progresso — MeuRoadmap

[🏠 Início](../../README.md) · [▶️ Fase atual](../../01-Fundamentos/README.md)

## 🧭 Agora

| | |
|---|---|
| **Fase** | $($faseAtualObj.Id.ToString('00')) — $($faseAtualObj.Nome) |
| **Progresso** | **$($progressoAtual.Percentual)%** ($($progressoAtual.Concluidos)/$($progressoAtual.Total) validações) |
| **Próxima fase** | $proximaTexto |

## 📚 Fase atual

| Área | Concluído | Progresso |
|---|---:|---:|
$areaTabela
## 🗺️ Roadmap

| # | Fase | Estado | Progresso |
|---:|---|---|---:|
$faseTabela
## 🔁 Fluxo

**Estudar → Praticar → Explicar → Validar → Concluir → Próximo**

## ⚙️ Controle local

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 status
```

> [!IMPORTANT]
> O progresso é calculado pelas caixas de seleção existentes nas seções `Validação` dos módulos. Checklists de orientação não entram na conta.
"@

Set-Content -Path $PainelPath -Value $painel -Encoding UTF8

$estado = [ordered]@{
    roadmap = "MeuRoadmap"
    faseAtual = $FaseAtual
    fases = $fasesEstado
}

$estado | ConvertTo-Json -Depth 8 | Set-Content -Path $EstadoPath -Encoding UTF8

Write-Host "Painel atualizado com sucesso."
Write-Host "Progresso da Fase $($FaseAtual.ToString('00')): $($progressoAtual.Percentual)% ($($progressoAtual.Concluidos)/$($progressoAtual.Total))"
