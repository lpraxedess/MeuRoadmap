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
    return Get-Content $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Atualizar-Painel {
    if (Test-Path $AtualizarPath) {
        powershell -ExecutionPolicy Bypass -File $AtualizarPath
    }
}

function Mostrar-Ajuda {
    Write-Host ""
    Write-Host "MEUROADMAP - CONTROLE DE ESTUDO"
    Write-Host ""
    Write-Host "Comandos:"
    Write-Host "  status"
    Write-Host "  estudar"
    Write-Host "  concluir ARQUIVO ITEM"
    Write-Host ""
    Write-Host "Exemplo:"
    Write-Host ".\scripts\roadmap.ps1 concluir .\01-Fundamentos\01-Conceitos\01-Identidade.md 1"
    Write-Host ""
}

function Obter-FaseAtual {
    $estado = Ler-Estado
    $id = [int]$estado.faseAtual
    return $estado.fases | Where-Object { [int]$_.id -eq $id } | Select-Object -First 1
}

function Obter-Validacao {
    param([string]$Caminho)

    $linhas = Get-Content $Caminho -Encoding UTF8
    $emValidacao = $false
    $itens = @()

    foreach ($linha in $linhas) {
        if ($linha -match '^##\s+Validação') {
            $emValidacao = $true
            continue
        }

        if ($emValidacao -and $linha -match '^##\s+') {
            break
        }

        if ($emValidacao -and $linha -match '^\s*-\s*\[\s*(x|X| )\s*\]\s*(.*)$') {
            $itens += [PSCustomObject]@{
                Concluido = ($Matches[1] -match 'x|X')
                Texto = $Matches[2]
            }
        }
    }

    return $itens
}

function Comando-Status {
    Atualizar-Painel
    $fase = Obter-FaseAtual

    Write-Host ""
    Write-Host "========================================"
    Write-Host "          STATUS DO MEUROADMAP"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Fase atual: $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host "Status: $($fase.status)"
    Write-Host ""
    Write-Host "Painel: docs\progresso\painel.md"
    Write-Host ""
}

function Comando-Estudar {
    $fase = Obter-FaseAtual
    $diretorio = Join-Path $Root $fase.diretorio
    $conceitos = Join-Path $diretorio "01-Conceitos"

    Write-Host ""
    Write-Host "========================================"
    Write-Host "             PROXIMO ESTUDO"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Fase: $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host ""

    if (Test-Path $conceitos) {
        $topicos = Get-ChildItem $conceitos -Filter "*.md" -File |
            Where-Object { $_.Name -ne "README.md" } |
            Sort-Object Name

        foreach ($topico in $topicos) {
            $validacao = @(Obter-Validacao $topico.FullName)

            if ($validacao.Count -eq 0) { continue }

            $concluidos = @($validacao | Where-Object { $_.Concluido }).Count
            $total = $validacao.Count
            $progresso = [math]::Floor(($concluidos / $total) * 100)

            if ($concluidos -lt $total) {
                Write-Host "Topico: $($topico.BaseName)"
                Write-Host "Progresso: $progresso%"
                Write-Host ""
                Write-Host "Arquivo:"
                Write-Host ($topico.FullName.Substring($Root.Length).TrimStart('\'))
                Write-Host ""
                Write-Host "Fluxo: estudar -> praticar -> explicar -> validar -> concluir"
                Write-Host ""
                Write-Host "Abra o arquivo acima para continuar."
                Write-Host ""
                return
            }
        }
    }

    Write-Host "Nenhum tópico pendente em Conceitos."
    Write-Host "Próximo módulo: 02 - Conhecimentos"
    Write-Host ""
}

function Comando-Concluir {
    if ([string]::IsNullOrWhiteSpace($Arquivo)) {
        Write-Host "Informe o arquivo."
        return
    }

    if ($Item -lt 1) {
        Write-Host "Informe o numero do item."
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

    $scriptMarcar = Join-Path $Root "scripts\marcar-item.ps1"

    powershell -ExecutionPolicy Bypass -File $scriptMarcar -Arquivo $caminho -Item $Item
    Atualizar-Painel
}

switch ($Comando.ToLower()) {
    "status"   { Comando-Status }
    "estudar"  { Comando-Estudar }
    "concluir" { Comando-Concluir }
    "ajuda"    { Mostrar-Ajuda }
    default     { Mostrar-Ajuda }
}
