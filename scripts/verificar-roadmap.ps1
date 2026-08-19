$Root = Split-Path $PSScriptRoot -Parent
$EstadoPath = Join-Path $Root "docs\progresso\estado.json"
$estado = Get-Content $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json
$etapas = @("01-Conceitos","02-Conhecimentos","03-Pratica","04-Laboratorios","05-Exercicios","06-Troubleshooting","07-Checklist","08-Revisao","09-Certificacoes")
$falhas = @(); $ok = 0

function Check($cond,$msg){ if($cond){$script:ok++}else{$script:falhas += $msg} }

function Get-GateItens($arquivo){
    if(-not (Test-Path $arquivo)){ return @() }
    $ativo=$false; $itens=@()
    foreach($linha in @(Get-Content $arquivo -Encoding UTF8)){
        $trim=([string]$linha).Trim()
        if(-not $ativo -and $trim -match '^##\s+.*Gate da fase'){ $ativo=$true; continue }
        if($ativo -and $trim -match '^##\s+'){ break }
        if($ativo -and $trim -match '^[-*]\s*\[[ xX]\]\s+.+$'){ $itens += $trim }
    }
    return @($itens)
}

function Get-Perguntas($arquivo){
    if(-not (Test-Path $arquivo)){ return @() }
    $ativo=$false; $itens=@()
    foreach($linha in @(Get-Content $arquivo -Encoding UTF8)){
        $trim=([string]$linha).Trim()
        if(-not $ativo -and $trim -match '^##\s+.*Validação final'){ $ativo=$true; continue }
        if($ativo -and $trim -match '^##\s+'){ break }
        if($ativo -and $trim -match '^\d+[.)]\s+.+$'){ $itens += $trim }
    }
    return @($itens)
}

Check (Test-Path (Join-Path $Root "README.md")) "README.md ausente"
Check (Test-Path (Join-Path $Root "docs\progresso\estado.json")) "docs/progresso/estado.json ausente"
Check (Test-Path (Join-Path $Root "docs\progresso\painel.md")) "painel.md ausente"
Check (Test-Path (Join-Path $Root "scripts\roadmap.ps1")) "scripts/roadmap.ps1 ausente"
Check (Test-Path (Join-Path $Root "scripts\marcar-item.ps1")) "scripts/marcar-item.ps1 ausente"

foreach($fase in $estado.fases){
    $dir = Join-Path $Root $fase.diretorio
    $readme = Join-Path $dir "README.md"
    Check (Test-Path $dir) "Fase $($fase.id.ToString('00')) sem diretorio: $($fase.diretorio)"
    Check (Test-Path $readme) "Fase $($fase.id.ToString('00')) sem README.md"
    if(Test-Path $readme){
        $gate = @(Get-GateItens $readme)
        $perguntas = @(Get-Perguntas $readme)
        Check ($gate.Count -eq 5) "Fase $($fase.id.ToString('00')) deve possuir exatamente 5 itens no Gate da fase; encontrou $($gate.Count)"
        Check ($perguntas.Count -eq 5) "Fase $($fase.id.ToString('00')) deve possuir exatamente 5 perguntas na Validação final; encontrou $($perguntas.Count)"
    }
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
Write-Host "Estrutura, modo guiado e gates das 12 fases validados." -ForegroundColor Green
Write-Host ""
exit 0
