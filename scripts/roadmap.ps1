param(
    [Parameter(Position=0)]
    [string]$Comando = "ajuda",

    [Parameter(Position=1)]
    [string]$Arquivo = "",

    [Parameter(Position=2)]
    [int]$Item = 0
)

$Root = Split-Path $PSScriptRoot -Parent
$EstadoPath = Join-Path $Root "docs\progresso\estado.json"
$AtualizarPath = Join-Path $Root "scripts\atualizar-progresso.ps1"

function Ler-Estado {
    if (-not (Test-Path $EstadoPath)) { return $null }
    Get-Content $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Atualizar-Painel {
    if (Test-Path $AtualizarPath) {
        powershell -NoProfile -ExecutionPolicy Bypass -File $AtualizarPath | Out-Null
    }
}

function Caminho-Relativo([string]$Path) {
    $Path.Substring($Root.Length).TrimStart('\')
}

function Obter-FaseAtual {
    $estado = Ler-Estado
    if (-not $estado) { return $null }
    $id = [int]$estado.faseAtual
    $estado.fases | Where-Object { [int]$_.id -eq $id } | Select-Object -First 1
}

function Eh-CabecalhoValidacao([string]$Linha) {
    return ($Linha -match '^##\s+.*Valida(c|ç)ão.*$')
}

function Obter-Validacao([string]$Caminho) {
    $linhas = @(Get-Content $Caminho -Encoding UTF8)
    $emValidacao = $false
    $itens = @()

    foreach ($linha in $linhas) {
        if (Eh-CabecalhoValidacao $linha) {
            $emValidacao = $true
            continue
        }

        if ($emValidacao -and $linha -match '^##\s+') { break }

        if ($emValidacao -and $linha -match '^\s*-\s*\[\s*(x|X| )\s*\]\s*(.*)$') {
            $itens += [PSCustomObject]@{
                Concluido = ($Matches[1] -match '^[xX]$')
                Texto = $Matches[2].Trim()
            }
        }
    }

    return ,$itens
}

function Obter-ArquivosDeEstudo($fase) {
    $diretorio = Join-Path $Root $fase.diretorio
    $ordem = @(
        "01-Conceitos",
        "02-Conhecimentos",
        "03-Pratica",
        "04-Laboratorios",
        "05-Exercicios",
        "06-Troubleshooting",
        "08-Revisao"
    )

    $resultado = @()
    foreach ($nomeArea in $ordem) {
        $area = Join-Path $diretorio $nomeArea
        if (-not (Test-Path $area)) { continue }

        $arquivos = Get-ChildItem $area -Filter "*.md" -File | Sort-Object Name
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
    return ,$resultado
}

function Mostrar-Ajuda {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "          MEUROADMAP - CONTROLE"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "status" -ForegroundColor Cyan
    Write-Host "estudar" -ForegroundColor Cyan
    Write-Host "concluir ARQUIVO ITEM" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Exemplo:"
    Write-Host ".\scripts\roadmap.ps1 concluir .\01-Fundamentos\01-Conceitos\01-Identidade.md 1"
    Write-Host ""
    Write-Host "O numero do item pertence somente a secao de validacao do arquivo."
    Write-Host ""
}

function Comando-Status {
    Atualizar-Painel
    $fase = Obter-FaseAtual
    if (-not $fase) {
        Write-Host "Estado do roadmap nao encontrado."
        return
    }

    $itens = @(Obter-ArquivosDeEstudo $fase)
    $total = 0
    $concluidos = 0
    foreach ($item in $itens) {
        $total += $item.Validacao.Count
        $concluidos += @($item.Validacao | Where-Object { $_.Concluido }).Count
    }

    $progresso = if ($total -gt 0) { [math]::Round(($concluidos / $total) * 100) } else { 0 }

    Write-Host ""
    Write-Host "========================================"
    Write-Host "             STATUS DO ROADMAP"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Fase atual : $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host "Progresso  : $progresso% ($concluidos/$total validacoes)"
    Write-Host "Painel     : docs\progresso\painel.md"
    Write-Host ""
}

function Comando-Estudar {
    $fase = Obter-FaseAtual
    if (-not $fase) {
        Write-Host "Estado do roadmap nao encontrado."
        return
    }

    $itens = @(Obter-ArquivosDeEstudo $fase)

    Write-Host ""
    Write-Host "========================================"
    Write-Host "             PROXIMO ESTUDO"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Fase: $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host ""

    foreach ($item in $itens) {
        $validacao = $item.Validacao
        $concluidos = @($validacao | Where-Object { $_.Concluido }).Count
        $total = $validacao.Count

        if ($concluidos -lt $total) {
            $numero = 0
            for ($i = 0; $i -lt $total; $i++) {
                if (-not $validacao[$i].Concluido) {
                    $numero = $i + 1
                    break
                }
            }

            $progresso = [math]::Round(($concluidos / $total) * 100)
            $relativo = Caminho-Relativo $item.Arquivo.FullName

            Write-Host "Area       : $($item.Area)"
            Write-Host "Topico     : $($item.Arquivo.BaseName)"
            Write-Host "Progresso  : $progresso% ($concluidos/$total)"
            Write-Host "Proximo    : $numero - $($validacao[$numero - 1].Texto)"
            Write-Host "Arquivo    : $relativo"
            Write-Host ""
            Write-Host "Fluxo: estudar -> praticar -> explicar -> validar -> concluir -> proximo"
            Write-Host ""
            return
        }
    }

    Write-Host "Todos os topicos com validacao foram concluidos."
    Write-Host ""
    Write-Host "Proximo passo: abra a validacao final da Fase 01."
    Write-Host "01-Fundamentos\08-Revisao\README.md"
    Write-Host ""
}

function Comando-Concluir {
    if ([string]::IsNullOrWhiteSpace($Arquivo)) {
        Write-Host "Informe o arquivo."
        return
    }
    if ($Item -lt 1) {
        Write-Host "Informe um numero de item valido."
        return
    }

    $caminho = $Arquivo
    if (-not [System.IO.Path]::IsPathRooted($caminho)) {
        $caminho = Join-Path $Root $caminho
    }

    if (-not (Test-Path $caminho)) {
        Write-Host "Arquivo nao encontrado: $Arquivo"
        return
    }

    $validacao = @(Obter-Validacao $caminho)
    if ($validacao.Count -eq 0) {
        Write-Host "O arquivo nao possui uma secao de validacao com itens."
        return
    }
    if ($Item -gt $validacao.Count) {
        Write-Host "Item invalido. O arquivo possui $($validacao.Count) itens de validacao."
        return
    }

    $scriptMarcar = Join-Path $Root "scripts\marcar-item.ps1"
    powershell -NoProfile -ExecutionPolicy Bypass -File $scriptMarcar -Arquivo $caminho -Item $Item
    Atualizar-Painel

    Write-Host ""
    Comando-Estudar
}

switch ($Comando.ToLower()) {
    "status"   { Comando-Status }
    "estudar"  { Comando-Estudar }
    "concluir" { Comando-Concluir }
    "ajuda"    { Mostrar-Ajuda }
    default     { Mostrar-Ajuda }
}
