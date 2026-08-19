$Root = Split-Path $PSScriptRoot -Parent
$EstadoPath = Join-Path $Root "docs\progresso\estado.json"
$estado = Get-Content $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json
$etapas = @("01-Conceitos","02-Conhecimentos","03-Pratica","04-Laboratorios","05-Exercicios","06-Troubleshooting","07-Checklist","08-Revisao","09-Certificacoes")
$falhas = @(); $ok = 0

function Check($cond,$msg){ if($cond){$script:ok++}else{$script:falhas += $msg} }

Check (Test-Path (Join-Path $Root "README.md")) "README.md ausente"
Check (Test-Path (Join-Path $Root "docs\progresso\estado.json")) "docs/progresso/estado.json ausente"
Check (Test-Path (Join-Path $Root "docs\progresso\painel.md")) "painel.md ausente"
Check (Test-Path (Join-Path $Root "scripts\roadmap.ps1")) "scripts/roadmap.ps1 ausente"

foreach($fase in $estado.fases){
    $dir = Join-Path $Root $fase.diretorio
    Check (Test-Path $dir) "Fase $($fase.id.ToString('00')) sem diretorio: $($fase.diretorio)"
    Check (Test-Path (Join-Path $dir "README.md")) "Fase $($fase.id.ToString('00')) sem README.md"
    foreach($etapa in $etapas){
        $area = Join-Path $dir $etapa
        Check (Test-Path $area) "Fase $($fase.id.ToString('00')) sem etapa: $etapa"
        if(Test-Path $area){ Check (Test-Path (Join-Path $area "README.md")) "Fase $($fase.id.ToString('00'))/$etapa sem README.md" }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "       VERIFICACAO DO MEUROADMAP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verificacoes OK: $ok"
Write-Host "Falhas:          $($falhas.Count)"
if($falhas.Count -gt 0){ Write-Host ""; $falhas | ForEach-Object { Write-Host "[FALHA] $_" -ForegroundColor Red }; exit 1 }
Write-Host "Estrutura das 12 fases e 9 etapas validada." -ForegroundColor Green
Write-Host ""
exit 0
