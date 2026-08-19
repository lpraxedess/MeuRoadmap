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
    Get-Content $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Atualizar-Painel {
    if (Test-Path $AtualizarPath) {
        powershell -ExecutionPolicy Bypass -File $AtualizarPath
    }
}

function Caminho-Relativo([string]$Path) {
    $Path.Substring($Root.Length).TrimStart('\')
}

function Obter-FaseAtual {
    $estado = Ler-Estado
    $id = [int]$estado.faseAtual
    $estado.fases | Where-Object { [int]$_.id -eq $id } | Select-Object -First 1
}

function Obter-Validacao([string]$Caminho) {
    $linhas = Get-Content $Caminho -Encoding UTF8
    $emValidacao = $false
    $itens = @()

    foreach ($linha in $linhas) {
        if ($linha -match '^##\s+Validação') {
            $emValidacao = $true
            continue
        }
        if ($emValidacao -and $linha -match '^##\s+') { break }
        if ($emValidacao -and $linha -match '^\s*-\s*\[\s*(x|X| )\s*\]\s*(.*)$') {
            $itens += [PSCustomObject]@{
                Concluido = ($Matches[1] -match 'x|X')
                Texto = $Matches[2]
            }
        }
    }
    return $itens
}

function Mostrar-Ajuda {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "          MEUROADMAP - CONTROLE"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "status"
    Write-Host "estudar"
    Write-Host "concluir ARQUIVO ITEM"
    Write-Host ""
    Write-Host "Exemplo:"
    Write-Host ".\scripts\roadmap.ps1 concluir .\01-Fundamentos\01-Conceitos\01-Identidade.md 1"
    Write-Host ""
}

function Comando-Status {
    Atualizar-Painel
    $fase = Obter-FaseAtual
    Write-Host ""
    Write-Host "========================================"
    Write-Host "             STATUS DO ROADMAP"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Fase atual : $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host "Status     : $($fase.status)"
    Write-Host "Painel     : docs\progresso\painel.md"
    Write-Host ""
}

function Comando-Estudar {
    $fase = Obter-FaseAtual
    $diretorio = Join-Path $Root $fase.diretorio
    $ordem = @(
        "01-Conceitos",
        "02-Conhecimentos",
        "03-Pratica",
        "04-Laboratorios",
        "06-Troubleshooting",
        "08-Revisao"
    )

    Write-Host ""
    Write-Host "========================================"
    Write-Host "             PROXIMO ESTUDO"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Fase: $($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host ""

    foreach ($nomeArea in $ordem) {
        $area = Join-Path $diretorio $nomeArea
        if (-not (Test-Path $area)) { continue }

        $arquivos = Get-ChildItem $area -Filter "*.md" -File |
            Sort-Object Name

        foreach ($arquivoAtual in $arquivos) {
            $validacao = @(Obter-Validacao $arquivoAtual.FullName)
            if ($validacao.Count -eq 0) { continue }

            $concluidos = @($validacao | Where-Object { $_.Concluido }).Count
            $total = $validacao.Count
            $progresso = [math]::Floor(($concluidos / $total) * 100)

            if ($concluidos -lt $total) {
                $numero = 0
                for ($i = 0; $i -lt $validacao.Count; $i++) {
                    if (-not $validacao[$i].Concluido) {
                        $numero = $i + 1
                        break
                    }
                }

                Write-Host "Área     : $nomeArea"
                Write-Host "Tópico   : $($arquivoAtual.BaseName)"
                Write-Host "Progresso: $progresso%"
                Write-Host "Item     : $numero - $($validacao[$numero - 1].Texto)"
                Write-Host "Arquivo  : $(Caminho-Relativo $arquivoAtual.FullName)"
                Write-Host ""
                Write-Host "Fluxo: estudar -> praticar -> explicar -> validar -> concluir -> próximo"
                Write-Host ""
                return
            }
        }
    }

    Write-Host "Nenhum item pendente nos módulos principais."
    Write-Host "Abra a validação da fase para conferir o Definition of Done."
    Write-Host ""
}

function Comando-Concluir {
    if ([string]::IsNullOrWhiteSpace($Arquivo)) {
        Write-Host "Informe o arquivo."
        return
    }
    if ($Item -lt 1) {
        Write-Host "Informe um número de item válido."
        return
    }

    $caminho = $Arquivo
    if (-not [System.IO.Path]::IsPathRooted($caminho)) {
        $caminho = Join-Path $Root $caminho
    }

    if (-not (Test-Path $caminho)) {
        Write-Host "Arquivo não encontrado: $Arquivo"
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
