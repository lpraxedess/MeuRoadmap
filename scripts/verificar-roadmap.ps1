$Root=Split-Path $PSScriptRoot -Parent
$EstadoPath=Join-Path $Root "docs\progresso\estado.json"
$estado=Get-Content $EstadoPath -Raw -Encoding UTF8|ConvertFrom-Json
$falhas=@();$ok=0
function Check($c,$m){if($c){$script:ok++}else{$script:falhas+=$m}}
Check(Test-Path(Join-Path $Root "README.md")) "README.md ausente"
Check(Test-Path $EstadoPath) "estado.json ausente"
Check(Test-Path(Join-Path $Root "scripts\roadmap.ps1")) "roadmap.ps1 ausente"
Check(@($estado.fases).Count -eq 12) "Estado deve possuir 12 fases"
foreach($f in @($estado.fases)){$d=Join-Path $Root $f.diretorio;Check(Test-Path $d) "Fase $($f.id) sem diretorio";Check(Test-Path(Join-Path $d "README.md")) "Fase $($f.id) sem README";Check(Test-Path(Join-Path $d "conteudo")) "Fase $($f.id) sem conteudo";Check(@($f.passos).Count -eq 4) "Fase $($f.id) deve possuir 4 etapas";Check(@($f.teste).Count -eq 5) "Fase $($f.id) deve possuir 5 perguntas"}
Write-Host "";Write-Host "========================================" -ForegroundColor Cyan;Write-Host "       AUDITORIA DO MEUROADMAP" -ForegroundColor Cyan;Write-Host "========================================" -ForegroundColor Cyan;Write-Host "Verificacoes OK: $ok";Write-Host "Falhas:          $($falhas.Count)";if($falhas.Count){$falhas|%{Write-Host "[FALHA] $_" -ForegroundColor Red};exit 1};Write-Host "Estrutura guiada: 12 fases x 4 etapas + teste final." -ForegroundColor Green;exit 0
