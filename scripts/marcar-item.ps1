param(
    [Parameter(Mandatory=$true)]
    [string]$Arquivo,

    [Parameter(Mandatory=$true)]
    [int]$Item
)

if (-not (Test-Path -LiteralPath $Arquivo -PathType Leaf)) {
    Write-Host "Arquivo nao encontrado:"
    Write-Host $Arquivo
    exit 1
}

if ($Item -lt 1) {
    Write-Host "O numero do item deve ser maior que zero."
    exit 1
}

$linhas = @(Get-Content -LiteralPath $Arquivo -Encoding UTF8)
$emValidacao = $false
$contador = 0
$indiceAlvo = -1

foreach ($indice in 0..($linhas.Count - 1)) {
    $linha = [string]$linhas[$indice]

    if ($linha -match '^##[ \t]+') {
        if ($emValidacao) { break }
        if ($linha -match '(?i)(Validação|Validacao|Definition[ \t]+of[ \t]+Done)') {
            $emValidacao = $true
        }
        continue
    }

    if ($emValidacao -and $linha -match '^[ \t]*-[ \t]*\[[ \t]*(x|X| )[ \t]*\][ \t]*(.*)$') {
        $contador++
        if ($contador -eq $Item) {
            $indiceAlvo = $indice
            break
        }
    }
}

if ($contador -eq 0) {
    Write-Host "Nenhum item de validacao encontrado no arquivo."
    exit 1
}

if ($indiceAlvo -lt 0) {
    Write-Host "Item nao encontrado."
    Write-Host "Itens disponiveis: $contador"
    exit 1
}

if ($linhas[$indiceAlvo] -match '^\s*-\s*\[\s*[xX]\s*\]') {
    Write-Host "Item ja estava concluido."
    Write-Host "Item: $Item"
    Write-Host "Arquivo: $Arquivo"
    exit 0
}

$linhas[$indiceAlvo] = $linhas[$indiceAlvo] -replace '\[\s*\]', '[x]'

[System.IO.File]::WriteAllText(
    (Resolve-Path -LiteralPath $Arquivo).Path,
    ($linhas -join [Environment]::NewLine),
    (New-Object System.Text.UTF8Encoding($false))
)

Write-Host "Item concluido com sucesso."
Write-Host "Item: $Item"
Write-Host "Arquivo: $Arquivo"
