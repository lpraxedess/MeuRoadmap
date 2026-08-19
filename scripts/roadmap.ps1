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

function Salvar-Estado($estado) {
    $estado | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $EstadoPath -Encoding UTF8
}

function Atualizar-Painel {
    if (Test-Path -LiteralPath $AtualizarPath -PathType Leaf) {
        & powershell -NoProfile -ExecutionPolicy Bypass -File $AtualizarPath | Out-Null
    }
}

function Caminho-Relativo([string]$Path) {
    if ([string]::IsNullOrWhiteSpace($Path)) { return "" }
    $full = [System.IO.Path]::GetFullPath($Path)
    $root = [System.IO.Path]::GetFullPath($Root).TrimEnd('\')
    if ($full.Equals($root, [System.StringComparison]::OrdinalIgnoreCase)) { return "." }
    if ($full.StartsWith($root + '\', [System.StringComparison]::OrdinalIgnoreCase)) { return $full.Substring($root.Length + 1) }
    return $full
}

function Obter-FaseAtual {
    $estado = Ler-Estado
    if (-not $estado) { return $null }
    return @($estado.fases) | Where-Object { [int]$_.id -eq [int]$estado.faseAtual } | Select-Object -First 1
}

function Obter-ProximaFase($fase) {
    $estado = Ler-Estado
    if (-not $estado -or -not $fase) { return $null }
    return @($estado.fases) | Where-Object { [int]$_.id -gt [int]$fase.id } | Sort-Object id | Select-Object -First 1
}

function Obter-ReadmeFase($fase) {
    if (-not $fase) { return $null }
    $path = Join-Path (Join-Path $Root ([string]$fase.diretorio)) "README.md"
    if (Test-Path -LiteralPath $path -PathType Leaf) { return Get-Item -LiteralPath $path }
    return $null
}

function Obter-ValidacaoFase($fase) {
    $readme = Obter-ReadmeFase $fase
    if (-not $readme) { return @() }
    $linhas = @(Get-Content -LiteralPath $readme.FullName -Encoding UTF8)
    $ativo = $false
    $itens = @()
    foreach ($linha in $linhas) {
        $trim = ([string]$linha).Trim()
        if (-not $ativo -and $trim -match '^##\s+.*Gate da fase') { $ativo = $true; continue }
        if ($ativo -and $trim -match '^##\s+') { break }
        if ($ativo -and $trim -match '^[-*]\s*\[([ xX])\]\s*(.+)$') {
            $itens += [PSCustomObject]@{ Concluido = ($matches[1] -ne ' '); Texto = $matches[2].Trim() }
        }
    }
    return @($itens)
}

function Obter-ValidacaoFinal($fase) {
    $readme = Obter-ReadmeFase $fase
    if (-not $readme) { return @() }
    $linhas = @(Get-Content -LiteralPath $readme.FullName -Encoding UTF8)
    $ativo = $false
    $perguntas = @()
    foreach ($linha in $linhas) {
        $trim = ([string]$linha).Trim()
        if (-not $ativo -and $trim -match '^##\s+.*Validação final') { $ativo = $true; continue }
        if ($ativo -and $trim -match '^##\s+') { break }
        if ($ativo -and $trim -match '^(\d+)[.)]\s+(.+)$') { $perguntas += $matches[2].Trim() }
    }
    return @($perguntas)
}

function Avancar-Se-Concluida($fase) {
    $estado = Ler-Estado
    if (-not $estado) { return $false }
    $v = @(Obter-ValidacaoFase $fase)
    if ($v.Count -eq 0 -or @($v | Where-Object { -not $_.Concluido }).Count -gt 0) { return $false }
    $proxima = Obter-ProximaFase $fase
    if (-not $proxima) { return $false }
    $estado.faseAtual = [int]$proxima.id
    foreach ($f in @($estado.fases)) {
        if ([int]$f.id -lt [int]$proxima.id) { $f.status = "CONCLUIDA" }
        elseif ([int]$f.id -eq [int]$proxima.id) { $f.status = "EM_ANDAMENTO" }
        else { $f.status = "NAO_INICIADA" }
    }
    Salvar-Estado $estado
    return $true
}

function Mostrar-Ajuda {
    Write-Host ""
    Write-Host "MEUROADMAP - MODO GUIADO" -ForegroundColor Cyan
    Write-Host "estudar | validar | concluir | status | verificar | ajuda"
    Write-Host "Fluxo: Estude -> Pratique -> Aplique -> Explique -> Valide -> Proxima fase"
    Write-Host ""
}

function Comando-Status {
    $fase = Obter-FaseAtual
    if (-not $fase) { Write-Host "Estado do roadmap nao encontrado."; return }
    $v = @(Obter-ValidacaoFase $fase)
    $total = $v.Count; $done = @($v | Where-Object { $_.Concluido }).Count
    $p = if ($total -gt 0) { [math]::Round(($done / $total) * 100) } else { 0 }
    Atualizar-Painel
    Write-Host ""
    Write-Host "STATUS DO ROADMAP" -ForegroundColor Cyan
    Write-Host "Fase atual : $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host "Progresso  : $p% ($done/$total etapas da fase)"
    $pendente = $v | Where-Object { -not $_.Concluido } | Select-Object -First 1
    if ($pendente) { Write-Host "Pendente   : $($pendente.Texto)" }
    Write-Host "Painel     : docs\progresso\painel.md"
    Write-Host ""
}

function Comando-Estudar {
    $fase = Obter-FaseAtual
    if (-not $fase) { Write-Host "Estado do roadmap nao encontrado."; return }
    $readme = Obter-ReadmeFase $fase
    $v = @(Obter-ValidacaoFase $fase)
    $pendente = $v | Where-Object { -not $_.Concluido } | Select-Object -First 1
    if (-not $pendente) {
        $proxima = Obter-ProximaFase $fase
        Write-Host ""
        Write-Host "FASE CONCLUIDA" -ForegroundColor Green
        if ($proxima) { Write-Host "Proximo passo: Fase $($proxima.id.ToString('00')) - $($proxima.nome)"; Write-Host "Arquivo: $($proxima.diretorio)\README.md" }
        else { Write-Host "Todas as fases cadastradas foram concluidas." }
        Write-Host ""; return
    }
    $indice = [array]::IndexOf([object[]]$v, $pendente) + 1
    Write-Host ""
    Write-Host "PROXIMO PASSO" -ForegroundColor Cyan
    Write-Host "Fase      : $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host "Etapa     : $indice/$($v.Count)"
    Write-Host "Acao      : $($pendente.Texto)"
    Write-Host "Guia      : $(Caminho-Relativo $readme.FullName)"
    Write-Host ""
    switch -Regex ($pendente.Texto) {
        '^Estude' { Write-Host "Abra o Guia da fase e estude somente a secao 'Rota principal'." }
        '^Execute' { Write-Host "Abra a pratica/laboratorio indicado no Guia e produza uma evidencia." }
        '^Aplique' { Write-Host "Resolva o cenario profissional do Guia sem consultar a resposta." }
        '^Explique' { Write-Host "Registre uma explicacao curta com suas proprias palavras." }
        '^Passe|^Resolvi' { Write-Host "Execute 'validar' e responda as perguntas sem consultar." }
    }
    Write-Host ""
}

function Comando-Validar {
    $fase = Obter-FaseAtual
    if (-not $fase) { Write-Host "Estado do roadmap nao encontrado."; return }
    $perguntas = @(Obter-ValidacaoFinal $fase)
    Write-Host ""
    Write-Host "VALIDACAO FINAL - FASE $($fase.id.ToString('00'))" -ForegroundColor Cyan
    if ($perguntas.Count -eq 0) { Write-Host "A fase nao possui perguntas de validacao."; return }
    for ($i = 0; $i -lt $perguntas.Count; $i++) { Write-Host "$($i + 1). $($perguntas[$i])" }
    Write-Host ""
    Write-Host "Responda sem consultar. Depois marque a etapa final do Gate." -ForegroundColor Yellow
}

function Comando-Concluir {
    $fase = Obter-FaseAtual
    if (-not $fase) { Write-Host "Estado do roadmap nao encontrado."; return }
    $readme = Obter-ReadmeFase $fase
    $v = @(Obter-ValidacaoFase $fase)
    if ($v.Count -eq 0) { Write-Host "A fase nao possui Gate da fase configurado."; return }

    if ([string]::IsNullOrWhiteSpace($Arquivo)) {
        $pendente = $v | Where-Object { -not $_.Concluido } | Select-Object -First 1
        if (-not $pendente) { Comando-Estudar; return }
        $Item = [array]::IndexOf([object[]]$v, $pendente) + 1
    } else {
        $caminho = $Arquivo
        if (-not [System.IO.Path]::IsPathRooted($caminho)) { $caminho = Join-Path $Root $caminho }
        $caminho = [System.IO.Path]::GetFullPath($caminho)
        if (-not (Test-Path -LiteralPath $caminho -PathType Leaf)) { Write-Host "Arquivo nao encontrado: $Arquivo"; return }
        if (-not $caminho.Equals($readme.FullName, [System.StringComparison]::OrdinalIgnoreCase)) {
            Write-Host "O controle usa o Gate da fase. Execute 'concluir' sem argumentos." -ForegroundColor Yellow; return
        }
        if ($Item -lt 1) { Write-Host "Informe o numero da etapa."; return }
    }

    if ($Item -gt $v.Count) { Write-Host "Etapa invalida. A fase possui $($v.Count) etapas."; return }
    $marcar = Join-Path $Root "scripts\marcar-item.ps1"
    if (-not (Test-Path -LiteralPath $marcar -PathType Leaf)) { Write-Host "Script marcar-item.ps1 nao encontrado."; return }
    & powershell -NoProfile -ExecutionPolicy Bypass -File $marcar -Arquivo $readme.FullName -Item $Item
    if ($LASTEXITCODE -ne 0) { return }

    if (Avancar-Se-Concluida $fase) {
        Atualizar-Painel
        Write-Host ""
        Write-Host "FASE CONCLUIDA — AVANCO AUTOMATICO" -ForegroundColor Green
        Comando-Estudar
    } else {
        Atualizar-Painel
        Comando-Estudar
    }
}

function Comando-Verificar {
    if (Test-Path -LiteralPath $VerificarPath -PathType Leaf) { & powershell -NoProfile -ExecutionPolicy Bypass -File $VerificarPath }
    else { Write-Host "Script de verificacao nao encontrado." }
}

switch ($Comando.ToLower()) {
    "status" { Comando-Status }
    "estudar" { Comando-Estudar }
    "proximo" { Comando-Estudar }
    "validar" { Comando-Validar }
    "concluir" { Comando-Concluir }
    "verificar" { Comando-Verificar }
    "ajuda" { Mostrar-Ajuda }
    default { Mostrar-Ajuda }
}
