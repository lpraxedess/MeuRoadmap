$Root = Split-Path $PSScriptRoot -Parent
$EstadoPath = Join-Path $Root "docs\progresso\estado.json"
$PainelPath = Join-Path $Root "docs\progresso\painel.md"

$estadoAtual = if (Test-Path $EstadoPath) { Get-Content $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json } else { $null }
$FaseAtual = if ($estadoAtual -and $estadoAtual.faseAtual) { [int]$estadoAtual.faseAtual } else { 1 }

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

function Get-Gate {
    param([string]$Readme)
    if (-not (Test-Path $Readme)) { return @() }
    $ativo = $false
    $itens = @()
    foreach ($linha in @(Get-Content $Readme -Encoding UTF8)) {
        $trim = ([string]$linha).Trim()
        if (-not $ativo -and $trim -match '^##\s+.*Gate da fase') { $ativo = $true; continue }
        if ($ativo -and $trim -match '^##\s+') { break }
        if ($ativo -and $trim -match '^[-*]\s*\[([ xX])\]\s*(.+)$') {
            $itens += [PSCustomObject]@{ Concluido=($matches[1] -ne ' '); Texto=$matches[2].Trim() }
        }
    }
    return @($itens)
}

function Get-ProgressoFase {
    param([hashtable]$Fase)
    $readme = Join-Path (Join-Path $Root $Fase.Diretorio) "README.md"
    $gate = @(Get-Gate $readme)
    $total = $gate.Count
    $concluidos = @($gate | Where-Object { $_.Concluido }).Count
    $percentual = if ($total -gt 0) { [math]::Round(($concluidos / $total) * 100) } else { 0 }
    return [PSCustomObject]@{ Total=$total; Concluidos=$concluidos; Percentual=$percentual }
}

if ($FaseAtual -lt 1 -or $FaseAtual -gt $fases.Count) { $FaseAtual = 1 }
$faseAtualObj = $fases[$FaseAtual - 1]
$progressoAtual = Get-ProgressoFase $faseAtualObj

$faseTabela = ""
$fasesEstado = @()
foreach ($fase in $fases) {
    $resultado = Get-ProgressoFase $fase
    if ($fase.Id -lt $FaseAtual) { $status = "CONCLUIDA" }
    elseif ($fase.Id -eq $FaseAtual) { $status = "EM_ANDAMENTO" }
    else { $status = "NAO_INICIADA" }
    $faseTabela += "| $($fase.Id.ToString('00')) | $($fase.Nome) | $status | $($resultado.Percentual)% |`r`n"
    $fasesEstado += [ordered]@{ id=$fase.Id; nome=$fase.Nome; diretorio=$fase.Diretorio; status=$status }
}

$proxima = if ($FaseAtual -lt $fases.Count) { $fases[$FaseAtual] } else { $null }
$proximaTexto = if ($proxima) { "Fase $($proxima.Id.ToString('00')) - $($proxima.Nome)" } else { "Roadmap concluido" }

$painel = @"
# Painel de Progresso — MeuRoadmap

[Início](../../README.md) · [Fase atual](../../$($faseAtualObj.Diretorio)/README.md)

## Agora

| | |
|---|---|
| **Fase** | $($faseAtualObj.Id.ToString('00')) — $($faseAtualObj.Nome) |
| **Progresso** | **$($progressoAtual.Percentual)%** ($($progressoAtual.Concluidos)/$($progressoAtual.Total) etapas) |
| **Próxima fase** | $proximaTexto |

## Roadmap

| # | Fase | Estado | Progresso |
|---:|---|---|---:|
$faseTabela
## Fluxo

**Estude → Pratique → Aplique → Explique → Valide → Próxima fase**

## Controle

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 estudar
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 validar
powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 concluir
```

> O conteúdo detalhado permanece disponível como aprofundamento. O progresso considera somente o **Gate da fase**.
"@

Set-Content -Path $PainelPath -Value $painel -Encoding UTF8

$estado = [ordered]@{ roadmap="MeuRoadmap"; faseAtual=$FaseAtual; fases=$fasesEstado }
$estado | ConvertTo-Json -Depth 8 | Set-Content -Path $EstadoPath -Encoding UTF8

Write-Host "Painel atualizado com sucesso."
Write-Host "Progresso da Fase $($FaseAtual.ToString('00')): $($progressoAtual.Percentual)% ($($progressoAtual.Concluidos)/$($progressoAtual.Total))"
