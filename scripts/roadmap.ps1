param(
    [Parameter(Position=0)] [string]$Comando = "agora"
)

$Root = Split-Path $PSScriptRoot -Parent
$EstadoPath = Join-Path $Root "docs\progresso\estado.json"
$PainelPath = Join-Path $Root "docs\progresso\painel.md"
$VerificarPath = Join-Path $Root "scripts\verificar-roadmap.ps1"
try { [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new() } catch {}

function Ler-Estado {
    if (-not (Test-Path -LiteralPath $EstadoPath -PathType Leaf)) { throw "Estado do roadmap não encontrado: $EstadoPath" }
    return Get-Content -LiteralPath $EstadoPath -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Salvar-Estado($estado) {
    $json = $estado | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText($EstadoPath, $json, (New-Object System.Text.UTF8Encoding($false)))
}

function Fase-Atual($estado) {
    return @($estado.fases) | Where-Object { [int]$_.id -eq [int]$estado.faseAtual } | Select-Object -First 1
}

function Fase-Proxima($estado,$fase) {
    return @($estado.fases) | Where-Object { [int]$_.id -gt [int]$fase.id } | Sort-Object id | Select-Object -First 1
}

function Percentual($fase) {
    $passos = @($fase.passos)
    $done = @($passos | Where-Object { $_.feito }).Count
    if ($fase.testeConcluido) { $done++ }
    return [math]::Round(($done / 5) * 100)
}

function Atualizar-Painel($estado) {
    $fase = Fase-Atual $estado
    $linhas = @("# Painel do MeuRoadmap","","## Fase atual","","**$($fase.id.ToString('00')) — $($fase.nome)**","","**Progresso:** $(Percentual $fase)%","","### Etapas","")
    foreach($p in @($fase.passos)) { $mark = if($p.feito){'[x]'}else{'[ ]'}; $linhas += "- $mark $($p.nome)" }
    $mark = if($fase.testeConcluido){'[x]'}else{'[ ]'}
    $linhas += "- $mark Teste final da fase"
    $linhas += "","### Próxima ação",""
    $linhas += "`powershell -ExecutionPolicy Bypass -File .\scripts\roadmap.ps1 agora`","","### Trilha"
    foreach($f in @($estado.fases)) { $linhas += "- $($f.id.ToString('00')) — $($f.nome) — $(if([int]$f.id -lt [int]$estado.faseAtual){'CONCLUÍDA'}elseif([int]$f.id -eq [int]$estado.faseAtual){'ATUAL'}else{'BLOQUEADA'})" }
    [System.IO.File]::WriteAllLines($PainelPath, [string[]]$linhas, (New-Object System.Text.UTF8Encoding($false)))
}

function Avancar-Se-Necessario($estado) {
    $fase = Fase-Atual $estado
    if ((@($fase.passos) | Where-Object { -not $_.feito }).Count -eq 0 -and $fase.testeConcluido) {
        $fase.status = "CONCLUIDA"
        $proxima = Fase-Proxima $estado $fase
        if ($proxima) {
            $estado.faseAtual = [int]$proxima.id
            $proxima.status = "EM_ANDAMENTO"
            Salvar-Estado $estado
            Atualizar-Painel $estado
            return $true
        }
        Salvar-Estado $estado
        Atualizar-Painel $estado
    }
    return $false
}

function Mostrar-Agora {
    $estado = Ler-Estado; $fase = Fase-Atual $estado
    if ((Avancar-Se-Necessario $estado)) { $estado = Ler-Estado; $fase = Fase-Atual $estado }
    $pendente = @($fase.passos) | Where-Object { -not $_.feito } | Select-Object -First 1
    Write-Host ""; Write-Host "MEUROADMAP" -ForegroundColor Cyan
    Write-Host "Fase $($fase.id.ToString('00')) — $($fase.nome)"
    Write-Host "Progresso: $(Percentual $fase)%"; Write-Host ""
    if ($pendente) {
        $n = ([array]::IndexOf([object[]]@($fase.passos),$pendente)) + 1
        Write-Host "AGORA: $($pendente.nome)" -ForegroundColor Green
        Write-Host "Guia: $($fase.diretorio)\README.md"
        Write-Host "Quando terminar: concluir"
    } elseif (-not $fase.testeConcluido) {
        Write-Host "AGORA: TESTE FINAL" -ForegroundColor Yellow
        Write-Host "Execute: teste"
        Write-Host "Depois de responder sem consultar: aprovar"
    } else {
        Write-Host "Fase concluída." -ForegroundColor Green
    }
    Write-Host ""
}

function Concluir {
    $estado = Ler-Estado; $fase = Fase-Atual $estado
    $pendente = @($fase.passos) | Where-Object { -not $_.feito } | Select-Object -First 1
    if (-not $pendente) { Write-Host "Os 4 passos já foram concluídos. Execute 'teste'."; return }
    $pendente.feito = $true
    Salvar-Estado $estado; Atualizar-Painel $estado
    Write-Host "Etapa concluída: $($pendente.nome)" -ForegroundColor Green
    Mostrar-Agora
}

function Teste {
    $estado = Ler-Estado; $fase = Fase-Atual $estado
    if ((@($fase.passos) | Where-Object { -not $_.feito }).Count -gt 0) { Write-Host "Conclua as 4 etapas antes do teste." -ForegroundColor Yellow; Mostrar-Agora; return }
    Write-Host ""; Write-Host "TESTE FINAL — FASE $($fase.id.ToString('00'))" -ForegroundColor Cyan
    for($i=0;$i -lt @($fase.teste).Count;$i++){ Write-Host "$($i+1). $($fase.teste[$i])" }
    Write-Host ""; Write-Host "Responda sem consultar. Se passou, execute: aprovar" -ForegroundColor Yellow
}

function Aprovar {
    $estado = Ler-Estado; $fase = Fase-Atual $estado
    if ((@($fase.passos) | Where-Object { -not $_.feito }).Count -gt 0) { Write-Host "Ainda existem etapas pendentes." -ForegroundColor Yellow; Mostrar-Agora; return }
    if ($fase.testeConcluido) { Write-Host "Teste já aprovado."; return }
    $fase.testeConcluido = $true
    $fase.status = "CONCLUIDA"
    Salvar-Estado $estado; Atualizar-Painel $estado
    $proxima = Fase-Proxima $estado $fase
    if ($proxima) {
        $estado.faseAtual = [int]$proxima.id; $proxima.status = "EM_ANDAMENTO"
        Salvar-Estado $estado; Atualizar-Painel $estado
        Write-Host "FASE CONCLUÍDA — próxima fase liberada." -ForegroundColor Green
    } else { Write-Host "ROADMAP CONCLUÍDO." -ForegroundColor Green }
    Mostrar-Agora
}

function Status {
    $estado = Ler-Estado; $fase = Fase-Atual $estado; Atualizar-Painel $estado
    Write-Host ""; Write-Host "STATUS" -ForegroundColor Cyan
    Write-Host "Fase atual : $($fase.id.ToString('00')) — $($fase.nome)"
    Write-Host "Progresso  : $(Percentual $fase)%"
    Write-Host ""
    foreach($p in @($fase.passos)){ Write-Host "$(if($p.feito){'[x]'}else{'[ ]'}) $($p.nome)" }
    Write-Host "$(if($fase.testeConcluido){'[x]'}else{'[ ]'}) Teste final"
    Write-Host ""
}

function Ajuda {
    Write-Host "MEUROADMAP — comandos" -ForegroundColor Cyan
    Write-Host "agora     próximo passo"
    Write-Host "estudar   alias de agora"
    Write-Host "concluir  marca a etapa atual"
    Write-Host "teste     mostra as perguntas da fase"
    Write-Host "aprovar   conclui o teste e libera a próxima fase"
    Write-Host "status    mostra o progresso"
    Write-Host "verificar audita a estrutura"
}

switch($Comando.ToLower()){
    'agora' { Mostrar-Agora }
    'estudar' { Mostrar-Agora }
    'proximo' { Mostrar-Agora }
    'concluir' { Concluir }
    'teste' { Teste }
    'validar' { Teste }
    'aprovar' { Aprovar }
    'status' { Status }
    'verificar' { if(Test-Path $VerificarPath){ & powershell -NoProfile -ExecutionPolicy Bypass -File $VerificarPath }else{Write-Host 'Verificador não encontrado.'} }
    'ajuda' { Ajuda }
    default { Ajuda }
}
