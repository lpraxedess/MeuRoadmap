param([Parameter(Position=0)][string]$Comando='agora')

$ErrorActionPreference='Stop'
$Root = Split-Path -Parent $PSScriptRoot
$StatePath = Join-Path $Root 'docs\progresso\estado.json'
$PanelPath = Join-Path $Root 'docs\progresso\painel.md'

$Fases = @(
@{id=1;nome='Fundamentos de IAM';arquivo='01-Fundamentos\README.md'},
@{id=2;nome='Identidade e Diretorios';arquivo='02-Identidade-e-Diretorios\README.md'},
@{id=3;nome='Protocolos IAM';arquivo='03-Protocolos-IAM\README.md'},
@{id=4;nome='Authentication e Authorization';arquivo='04-Authentication-e-Authorization\README.md'},
@{id=5;nome='IGA';arquivo='05-IGA\README.md'},
@{id=6;nome='Access Management';arquivo='06-Access-Management\README.md'},
@{id=7;nome='PAM';arquivo='07-PAM\README.md'},
@{id=8;nome='Cloud IAM';arquivo='08-Cloud-IAM\README.md'},
@{id=9;nome='CIAM';arquivo='09-CIAM\README.md'},
@{id=10;nome='Zero Trust e ITDR';arquivo='10-Zero-Trust-e-ITDR\README.md'},
@{id=11;nome='Automacao e DevSecOps';arquivo='11-Automacao-e-DevSecOps\README.md'},
@{id=12;nome='Arquitetura IAM';arquivo='12-Arquitetura-IAM\README.md'}
)
$Etapas = @('ESTUDAR','PRATICAR','APLICAR','EXPLICAR','TESTAR')

function Load-State {
  if (!(Test-Path $StatePath)) { return [pscustomobject]@{fase=1;etapa=0;historico=@()} }
  return Get-Content $StatePath -Raw -Encoding UTF8 | ConvertFrom-Json
}
function Save-State($s) {
  $s | ConvertTo-Json -Depth 10 | Set-Content $StatePath -Encoding UTF8
}
function Show-Status {
  $s=Load-State
  $done=[math]::Min(60,(($s.fase-1)*5)+$s.etapa)
  $pct=[math]::Round(($done/60)*100)
  Write-Host ''
  Write-Host '+----------------------------------------------+' -ForegroundColor Cyan
  Write-Host '|                 MEUROADMAP                  |' -ForegroundColor Cyan
  Write-Host '+----------------------------------------------+' -ForegroundColor Cyan
  Write-Host (' Fase      : {0}/12 - {1}' -f $s.fase,$Fases[$s.fase-1].nome)
  $etapaNome = if($s.etapa -lt 5){$Etapas[$s.etapa]}else{'CONCLUIDA'}
  Write-Host (' Etapa     : {0}/5 - {1}' -f $s.etapa,$etapaNome)
  Write-Host (' Progresso : {0}% ({1}/60)' -f $pct,$done) -ForegroundColor Green
  Write-Host ''
}
function Show-Now {
  $s=Load-State
  if($s.fase -gt 12){ Write-Host 'ROADMAP CONCLUIDO' -ForegroundColor Green; return }
  $f=$Fases[$s.fase-1]
  $e=$Etapas[$s.etapa]
  $mens=@{
    ESTUDAR='Leia somente a secao ESTUDAR.'
    PRATICAR='Execute somente a pratica descrita na secao PRATICAR.'
    APLICAR='Resolva somente o cenario profissional da secao APLICAR.'
    EXPLICAR='Feche o material e explique o objetivo sem consultar.'
    TESTAR='Responda o teste sem consultar o material.'
  }[$e]
  Write-Host ''
  Write-Host '+----------------------------------------------+' -ForegroundColor DarkCyan
  Write-Host '| PROXIMA ACAO                                 |' -ForegroundColor Cyan
  Write-Host '+----------------------------------------------+' -ForegroundColor DarkCyan
  Write-Host "Fase   : $($f.id) - $($f.nome)"
  Write-Host "Etapa  : $e"
  Write-Host "Acao   : $mens" -ForegroundColor Yellow
  Write-Host "Arquivo: $($f.arquivo)"
  Write-Host ''
}
function Advance {
  $s=Load-State
  if($s.fase -gt 12){return}
  $stage=$Etapas[$s.etapa]
  if($stage -eq 'TESTAR'){
    $s.historico += "Fase $($s.fase): teste concluido em $(Get-Date -Format s)"
    if($s.fase -eq 12){$s.fase=13;$s.etapa=0}else{$s.fase++;$s.etapa=0}
  } else {$s.etapa++}
  Save-State $s
  Update-Panel $s
  Show-Now
}
function Update-Panel($s){
  $done=if($s.fase -gt 12){60}else{(($s.fase-1)*5)+$s.etapa}
  $pct=[math]::Round(($done/60)*100)
  $name=if($s.fase -gt 12){'CONCLUIDO'}else{$Fases[$s.fase-1].nome}
  @('# MeuRoadmap - Painel','',"**Progresso:** $pct% ($done/60)",'',"**Fase atual:** $name",'', 'Fluxo: **Estudar -> Praticar -> Aplicar -> Explicar -> Testar -> Avancar**','',"Atualizado: $(Get-Date -Format 'yyyy-MM-dd HH:mm')") | Set-Content $PanelPath -Encoding UTF8
}
function Verify {
  $errors=0
  foreach($f in $Fases){ if(!(Test-Path (Join-Path $Root $f.arquivo))){Write-Host "FALTA: $($f.arquivo)" -ForegroundColor Red;$errors++} }
  if(!(Test-Path $StatePath)){Write-Host 'FALTA: estado.json' -ForegroundColor Red;$errors++}
  if($errors -eq 0){Write-Host 'OK - Estrutura integra: 12 fases + controle central.' -ForegroundColor Green}else{Write-Host "FALHAS: $errors" -ForegroundColor Red}
}

switch($Comando.ToLower()){
 'agora' {Show-Now}
 'status' {Show-Status}
 'estudar' {Show-Now}
 'praticar' {Show-Now}
 'aplicar' {Show-Now}
 'explicar' {Show-Now}
 'testar' {Show-Now}
 'concluir' {Advance}
 'verificar' {Verify}
 'ajuda' {Write-Host 'Comandos: agora | estudar | praticar | aplicar | explicar | testar | concluir | status | verificar'}
 default {Write-Host 'Comando invalido. Use: ajuda' -ForegroundColor Red}
}
