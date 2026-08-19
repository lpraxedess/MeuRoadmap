$arquivo = Join-Path $PSScriptRoot "..\01-Fundamentos\01-Conceitos\README.md"
$arquivo = (Resolve-Path $arquivo).Path

$texto = Get-Content $arquivo -Raw -Encoding UTF8

$bytes = [System.Text.Encoding]::GetEncoding(28591).GetBytes($texto)
$corrigido = [System.Text.Encoding]::UTF8.GetString($bytes)

[System.IO.File]::WriteAllText(
    $arquivo,
    $corrigido,
    (New-Object System.Text.UTF8Encoding($false))
)

Write-Host "Encoding corrigido."
Write-Host $arquivo
