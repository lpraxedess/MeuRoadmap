param(
    [Parameter(Position=0)] [string]$Comando = "ajuda",
    [Parameter(Position=1)] [string]$Arquivo = "",
    [Parameter(Position=2)] [int]$Item = 0
)

$Root = Split-Path $PSScriptRoot -Parent
$EstadoPath = Join-Path $Root "docs\progresso\estado.json"
$AtualizarPath = Join-Path $Root "scripts\atualizar-progresso.ps1"
$VerificarPath = Join-Path $Root "scripts\verificar-roadmap.ps1"
try { [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new() } catch {}

function Ler-Estado {
    if (-not (Test-Path -LiteralPath $EstadoPath -PathType Leaf)) { return $null }
    return Get-Content -LiteralPath $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Atualizar-Painel {
    if (Test-Path -LiteralPath $AtualizarPath -PathType Leaf) {
        & powershell -NoProfile -ExecutionPolicy Bypass -File $AtualizarPath | Out-Null
    }
}

function Caminho-Relativo([string]$Path) {
    if ([string]::IsNullOrWhiteSpace($Path)) { return "" }
    $fullPath = [System.IO.Path]::GetFullPath($Path)
    $rootPath = [System.IO.Path]::GetFullPath($Root).TrimEnd('\')
    if ($fullPath.Equals($rootPath, [System.StringComparison]::OrdinalIgnoreCase)) { return "." }
    if ($fullPath.StartsWith($rootPath + '\', [System.StringComparison]::OrdinalIgnoreCase)) {
        return $fullPath.Substring($rootPath.Length + 1)
    }
    return $fullPath
}

function Obter-FaseAtual {
    $estado = Ler-Estado
    if (-not $estado) { return $null }
    return @($estado.fases) | Where-Object { [int]$_.id -eq [int]$estado.faseAtual } | Select-Object -First 1
}

function Normalizar-Texto([string]$Texto) {
    if ($null -eq $Texto) { return "" }
    $normalizado = $Texto.Normalize([Text.NormalizationForm]::FormD)
    return [regex]::Replace($normalizado, '\p{Mn}', '').ToLowerInvariant()
}

function Obter-Validacao([string]$Caminho) {
    if ([string]::IsNullOrWhiteSpace($Caminho)) { return @() }
    if (-not (Test-Path -LiteralPath $Caminho -PathType Leaf)) { return @() }

    $linhas = @(Get-Content -LiteralPath $Caminho -Encoding UTF8)
    $emValidacao = $false
    $itens = @()

    foreach ($linha in $linhas) {
        $trim = ([string]$linha).Trim()
        $normalizado = Normalizar-Texto $trim

        if (-not $emValidacao -and $normalizado -match '^##\s+.*validac') {
            $emValidacao = $true
            continue
        }

        if ($emValidacao -and $trim -match '^##\s+' ) { break }
        if (-not $emValidacao) { continue }

        if ($trim -match '^[-*]\s*\[([ xX])\]\s*(.*)$') {
            $itens += [PSCustomObject]@{
                Concluido = ($matches[1] -ne ' ')
                Texto = $matches[2].Trim()
            }
        }
    }

    return @($itens)
}

function Obter-ArquivosDeEstudo($fase) {
    if (-not $fase) { return @() }
    $diretorio = Join-Path $Root ([string]$fase.diretorio)
    if (-not (Test-Path -LiteralPath $diretorio -PathType Container)) { return @() }

    $ordem = @(
        "01-Conceitos", "02-Conhecimentos", "03-Pratica", "04-Laboratorios",
        "05-Exercicios", "06-Troubleshooting", "07-Checklist", "08-Revisao", "09-Certificacoes"
    )
    $resultado = @()

    foreach ($nomeArea in $ordem) {
        $areaPath = Join-Path $diretorio $nomeArea
        if (-not (Test-Path -LiteralPath $areaPath -PathType Container)) { continue }

        $arquivos = @(Get-ChildItem -LiteralPath $areaPath -Filter "*.md" -File -Recurse | Where-Object { $_.Name -ne "README.md" } | Sort-Object FullName)
        foreach ($arquivo in $arquivos) {
            $validacao = @(Obter-Validacao $arquivo.FullName)
            if ($validacao.Count -gt 0) {
                $resultado += [PSCustomObject]@{
                    Area = $nomeArea
                    Arquivo = $arquivo
                    Validacao = $validacao
                }
            }
        }
    }
    return @($resultado)
}

function Mostrar-Ajuda {
    Write-Host ""
    Write-Host "MEUROADMAP - CONTROLE" -ForegroundColor Cyan
    Write-Host "status | estudar | concluir ARQUIVO ITEM | verificar"
    Write-Host "Fluxo: estudar -> praticar -> explicar -> validar -> concluir -> avancar"
    Write-Host ""
}

function Comando-Status {
    $fase = Obter-FaseAtual
    if (-not $fase) { Write-Host "Estado do roadmap nao encontrado."; return }
    $itens = @(Obter-ArquivosDeEstudo $fase)
    $total = 0; $concluidos = 0
    foreach ($item in $itens) {
        $validacoes = @($item.Validacao)
        $total += $validacoes.Count
        $concluidos += @($validacoes | Where-Object { $_.Concluido }).Count
    }
    $p = if ($total -gt 0) { [math]::Round(($concluidos / $total) * 100) } else { 0 }
    Atualizar-Painel
    Write-Host ""
    Write-Host "STATUS DO ROADMAP" -ForegroundColor Cyan
    Write-Host "Fase atual : $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host "Progresso  : $p% ($concluidos/$total validacoes)"
    Write-Host "Painel     : docs\progresso\painel.md"
    Write-Host ""
}

function Comando-Estudar {
    $fase = Obter-FaseAtual
    if (-not $fase) { Write-Host "Estado do roadmap nao encontrado."; return }
    $itens = @(Obter-ArquivosDeEstudo $fase)
    foreach ($item in $itens) {
        $v = @($item.Validacao)
        for ($i = 0; $i -lt $v.Count; $i++) {
            if (-not $v[$i].Concluido) {
                $done = @($v | Where-Object { $_.Concluido }).Count
                $p = if ($v.Count -gt 0) { [math]::Round(($done / $v.Count) * 100) } else { 0 }
                Write-Host ""
                Write-Host "PROXIMO ESTUDO" -ForegroundColor Cyan
                Write-Host "Fase      : $($fase.id.ToString('00')) - $($fase.nome)"
                Write-Host "Area      : $($item.Area)"
                Write-Host "Topico    : $($item.Arquivo.BaseName)"
                Write-Host "Progresso : $p%"
                Write-Host "Validacao : $($i + 1) - $($v[$i].Texto)"
                Write-Host "Arquivo   : $(Caminho-Relativo $item.Arquivo.FullName)"
                Write-Host ""
                return
            }
        }
    }
    $estado = Ler-Estado
    $proxima = @($estado.fases) | Where-Object { [int]$_.id -gt [int]$fase.id } | Sort-Object id | Select-Object -First 1
    Write-Host ""
    Write-Host "FASE CONCLUIDA" -ForegroundColor Green
    if ($proxima) {
        Write-Host "Proximo passo: Fase $($proxima.id.ToString('00')) - $($proxima.nome)"
        Write-Host "Arquivo: $($proxima.diretorio)\README.md"
    } else { Write-Host "Todas as fases cadastradas foram concluidas." }
    Write-Host ""
}

function Comando-Concluir {
    if ([string]::IsNullOrWhiteSpace($Arquivo)) { Write-Host "Informe o arquivo."; return }
    if ($Item -lt 1) { Write-Host "Informe um numero de item valido."; return }
    $caminho = $Arquivo
    if (-not [System.IO.Path]::IsPathRooted($caminho)) { $caminho = Join-Path $Root $caminho }
    $caminho = [System.IO.Path]::GetFullPath($caminho)
    if (-not (Test-Path -LiteralPath $caminho -PathType Leaf)) { Write-Host "Arquivo nao encontrado: $Arquivo"; return }
    $v = @(Obter-Validacao $caminho)
    if ($v.Count -eq 0) { Write-Host "O arquivo nao possui uma secao de validacao com itens."; return }
    if ($Item -gt $v.Count) { Write-Host "Item invalido. O arquivo possui $($v.Count) itens."; return }
    $marcar = Join-Path $Root "scripts\marcar-item.ps1"
    if (-not (Test-Path -LiteralPath $marcar -PathType Leaf)) { Write-Host "Script marcar-item.ps1 nao encontrado."; return }
    & powershell -NoProfile -ExecutionPolicy Bypass -File $marcar -Arquivo $caminho -Item $Item
    if ($LASTEXITCODE -ne 0) { return }
    Atualizar-Painel
    Comando-Estudar
}

function Comando-Verificar {
    if (Test-Path -LiteralPath $VerificarPath -PathType Leaf) { & powershell -NoProfile -ExecutionPolicy Bypass -File $VerificarPath }
    else { Write-Host "Script de verificacao nao encontrado." }
}

switch ($Comando.ToLower()) {
    "status" { Comando-Status }
    "estudar" { Comando-Estudar }
    "concluir" { Comando-Concluir }
    "verificar" { Comando-Verificar }
    "ajuda" { Mostrar-Ajuda }
    default { Mostrar-Ajuda }
}
