param(
    [Parameter(Mandatory=$true)]
    [string]$Arquivo,

    [Parameter(Mandatory=$true)]
    [int]$Item
)

if (-not (Test-Path $Arquivo)) {
    Write-Host "Arquivo nao encontrado:"
    Write-Host $Arquivo
    exit 1
}

if ($Item -lt 1) {
    Write-Host "O numero do item deve ser maior que zero."
    exit 1
}

$linhas = Get-Content $Arquivo -Encoding UTF8

$contador = 0
$alterado = $false

for ($i = 0; $i -lt $linhas.Count; $i++) {

    if ($linhas[$i] -match '^\s*-\s*\[\s*[xX ]\s*\]\s*(.*)$') {

        $contador++

        if ($contador -eq $Item) {

            if ($linhas[$i] -match '^\s*-\s*\[\s*[xX]\s*\]') {
                Write-Host "Item ja estava concluido."
                Write-Host "Item: $Item"
                Write-Host "Arquivo: $Arquivo"
                exit 0
            }

            $linhas[$i] = $linhas[$i] -replace '(\[\s*) (\s*\])', '$1x$2'

            if ($linhas[$i] -notmatch '\[x\]') {
                $linhas[$i] = $linhas[$i] -replace '\[\s*\]', '[x]'
            }

            $alterado = $true
            break
        }
    }
}

if (-not $alterado) {
    Write-Host "Item nao encontrado."
    Write-Host "Itens disponiveis: $contador"
    exit 1
}

[System.IO.File]::WriteAllText(
    (Resolve-Path $Arquivo).Path,
    ($linhas -join [Environment]::NewLine),
    (New-Object System.Text.UTF8Encoding($false))
)

Write-Host "Item concluido com sucesso."
Write-Host "Item: $Item"
Write-Host "Arquivo: $Arquivo"
