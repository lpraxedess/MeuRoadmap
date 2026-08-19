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
    Write-Host "MEUROADMAP"
    Write-Host ""
    Write-Host "Comandos:"
    Write-Host ""
    Write-Host "status"
    Write-Host "estudar"
    Write-Host "concluir ARQUIVO ITEM"
    Write-Host ""
    Write-Host "Exemplo:"
    Write-Host ".\scripts\roadmap.ps1 concluir .\01-Fundamentos\01-Conceitos\README.md 1"
    Write-Host ""
}

function Obter-FaseAtual {
    $estado = Ler-Estado
    $id = [int]$estado.faseAtual

    return $estado.fases |
        Where-Object { [int]$_.id -eq $id } |
        Select-Object -First 1
}

function Obter-Checklist {
    param(
        [string]$Caminho
    )

    $linhas = Get-Content $Caminho -Encoding UTF8

    $resultado = @()
    $numero = 0

    foreach ($linha in $linhas) {

        if ($linha -match '^\s*-\s*\[\s*(x|X| )\s*\]\s*(.*)$') {

            $numero++

            $marcador = $Matches[1]
            $texto = $Matches[2]

            $concluido = $false

            if ($marcador -eq "x" -or $marcador -eq "X") {
                $concluido = $true
            }

            $resultado += [PSCustomObject]@{
                Numero = $numero
                Concluido = $concluido
                Texto = $texto
            }
        }
    }

    return $resultado
}

function Comando-Status {

    Atualizar-Painel

    $fase = Obter-FaseAtual

    Write-Host ""
    Write-Host "Status do MeuRoadmap"
    Write-Host "===================="
    Write-Host ""
    Write-Host "Fase atual:"
    Write-Host "$($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host ""
    Write-Host "Status:"
    Write-Host $fase.status
    Write-Host ""
    Write-Host "Dashboard:"
    Write-Host "docs\progresso\painel.md"
    Write-Host ""
}

function Comando-Estudar {

    $fase = Obter-FaseAtual

    $diretorio = Join-Path $Root $fase.diretorio

    $areas = Get-ChildItem $diretorio -Directory |
        Sort-Object Name

    Write-Host ""
    Write-Host "===================================="
    Write-Host " PROXIMO ESTUDO"
    Write-Host "===================================="
    Write-Host ""

    Write-Host "Fase:"
    Write-Host "$($fase.id.ToString('00')) - $($fase.nome)"
    Write-Host ""

    foreach ($area in $areas) {

        $readme = Join-Path $area.FullName "README.md"

        if (-not (Test-Path $readme)) {
            continue
        }

        $linhas = Get-Content $readme -Encoding UTF8

        $total = 0
        $concluidos = 0
        $proximoNumero = 0
        $proximoTexto = ""

        foreach ($linha in $linhas) {

            if ($linha -match '^\s*-\s*\[\s*[xX ]\s*\]\s*(.*)$') {

                $total++

                $texto = $Matches[1]

                if ($linha -match '^\s*-\s*\[\s*[xX]\s*\]') {

                    $concluidos++

                }
                elseif ($proximoNumero -eq 0) {

                    $proximoNumero = $total
                    $proximoTexto = $texto

                }
            }
        }

        if ($total -eq 0) {
            continue
        }

        $progresso = [math]::Floor(
            ($concluidos / $total) * 100
        )

        if ($concluidos -lt $total) {

            Write-Host "Area:"
            Write-Host $area.Name
            Write-Host ""

            Write-Host "Progresso da area:"
            Write-Host "$progresso%"
            Write-Host ""

            Write-Host "Proximo item:"
            Write-Host "$proximoNumero - $proximoTexto"
            Write-Host ""

            Write-Host "Arquivo:"
            Write-Host (
                $readme.Substring($Root.Length).TrimStart('\')
            )
            Write-Host ""

            return
        }
    }

    Write-Host "Todos os itens da fase atual foram concluidos."
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

    $scriptMarcar = Join-Path $Root "scripts\marcar-item.ps1"

    powershell `
        -ExecutionPolicy Bypass `
        -File $scriptMarcar `
        -Arquivo $Arquivo `
        -Item $Item

    Atualizar-Painel
}

switch ($Comando.ToLower()) {

    "status" {
        Comando-Status
    }

    "estudar" {
        Comando-Estudar
    }

    "concluir" {
        Comando-Concluir
    }

    "ajuda" {
        Mostrar-Ajuda
    }

    default {
        Mostrar-Ajuda
    }
}