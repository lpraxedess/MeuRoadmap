$path = Join-Path $PSScriptRoot "roadmap.ps1"

$text = Get-Content $path -Raw -Encoding UTF8

$inicio = $text.IndexOf("function Comando-Estudar {")

if ($inicio -lt 0) {
    Write-Host "Funcao Comando-Estudar nao encontrada."
    exit 1
}

$fim = $text.IndexOf("function Comando-Concluir {", $inicio)

if ($fim -lt 0) {
    Write-Host "Funcao Comando-Concluir nao encontrada."
    exit 1
}

$novaFuncao = @'
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
'@

$novoTexto = $text.Substring(0, $inicio) +
            $novaFuncao +
            "`r`n" +
            $text.Substring($fim)

[System.IO.File]::WriteAllText(
    $path,
    $novoTexto,
    (New-Object System.Text.UTF8Encoding($false))
)

Write-Host "Comando estudar corrigido."
