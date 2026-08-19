$Root = Split-Path $PSScriptRoot -Parent
$EstadoPath = Join-Path $Root "docs\progresso\estado.json"
$estado = Get-Content -LiteralPath $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json
$falhas = @(); $ok = 0
function Check($cond,$msg){ if($cond){$script:ok++}else{$script:falhas += $msg} }
Check (Test-Path (Join-Path $Root "README.md")) "README.md ausente"
Check (Test-Path $EstadoPath) "estado.json ausente"
Check (Test-Path (Join-Path $Root "scripts\roadmap.ps1")) "roadmap.ps1 ausente"
Check (@($estado.fases).Count -eq 12) "Estado deve possuir exatamente 12 fases"
foreach($fase in @($estado.fases)){
    $dir = Join-Path $Root $fase.diretorio
    Check (Test-Path $dir) "Fase $($fase.id) sem diretorio: $($fase.diretorio)"
    Check (Test-Path (Join-Path $dir "README.md")) "Fase $($fase.id) sem README.md"
    Check (Test-Path (Join-Path $dir "conteudo")) "Fase $($fase.id) sem conteudo"
    Check (@($fase.passos).Count -eq 4) "Fase $($fase.id) deve possuir 4 etapas"
    Check (@($fase.teste).Count -eq 5) "Fase $($fase.id) deve possuir 5 perguntas"
}
Write-Host ""; Write-Host "========================================" -ForegroundColor Cyan; Write-Host "       AUDITORIA DO MEUROADMAP" -ForegroundColor Cyan; Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verificacoes OK: $ok"; Write-Host "Falhas:          $($falhas.Count)"
if($falhas.Count -gt 0){ $falhas | ForEach-Object { Write-Host "[FALHA] $_" -ForegroundColor Red }; exit 1 }
Write-Host "Estrutura guiada: 12 fases × 4 etapas + teste final." -ForegroundColor Green
exit 0
