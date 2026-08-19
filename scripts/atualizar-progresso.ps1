$Root = Split-Path $PSScriptRoot -Parent

$FaseAtual = 1

$fases = @(
@{ Id=1; Nome="Fundamentos de IAM"; Diretorio="01-Fundamentos" },
@{ Id=2; Nome="Identidade e Diretorios"; Diretorio="02-Identidade-e-Diretorios" },
@{ Id=3; Nome="Protocolos IAM"; Diretorio="03-Protocolos-IAM" },
@{ Id=4; Nome="Authentication e Authorization"; Diretorio="04-Authentication-e-Authorization" },
@{ Id=5; Nome="IGA"; Diretorio="05-IGA" },
@{ Id=6; Nome="Access Management"; Diretorio="06-Access-Management" },
@{ Id=7; Nome="PAM"; Diretorio="07-PAM" },
@{ Id=8; Nome="Cloud IAM"; Diretorio="08-Cloud-IAM" },
@{ Id=9; Nome="CIAM"; Diretorio="09-CIAM" },
@{ Id=10; Nome="Zero Trust e ITDR"; Diretorio="10-Zero-Trust-e-ITDR" },
@{ Id=11; Nome="Automacao e DevSecOps"; Diretorio="11-Automacao-e-DevSecOps" },
@{ Id=12; Nome="Arquitetura IAM"; Diretorio="12-Arquitetura-IAM" }
)

function Get-Percentual {
param(
[string]$Diretorio
)

if (-not (Test-Path $Diretorio)) {
    return 0
}


$arquivos = Get-ChildItem $Diretorio -Filter "README.md" -Recurse


$total = 0
$concluidos = 0


foreach ($arquivo in $arquivos) {
    $linhas = @(Get-Content $arquivo.FullName -Encoding UTF8)


    foreach ($linha in $linhas) {
        if ($linha.StartsWith("- [ ]") -or $linha.StartsWith("- [x]")) {
            $total++


            if ($linha.StartsWith("- [x]")) {
                $concluidos++
            }
        }
    }
}


if ($total -eq 0) {
    return 0
}


return [math]::Round(($concluidos / $total) * 100)

}

$faseAtualObj = $fases[$FaseAtual - 1]

$faseAtualPath = Join-Path $Root $faseAtualObj.Diretorio

$progressoAtual = Get-Percentual $faseAtualPath

$areas = @(
@{ Nome="Conceitos"; Diretorio="01-Conceitos" },
@{ Nome="Conhecimentos"; Diretorio="02-Conhecimentos" },
@{ Nome="Pratica"; Diretorio="03-Pratica" },
@{ Nome="Laboratorios"; Diretorio="04-Laboratorios" },
@{ Nome="Exercicios"; Diretorio="05-Exercicios" },
@{ Nome="Troubleshooting"; Diretorio="06-Troubleshooting" },
@{ Nome="Checklist"; Diretorio="07-Checklist" },
@{ Nome="Revisao"; Diretorio="08-Revisao" },
@{ Nome="Certificacoes"; Diretorio="09-Certificacoes" }
)

$areaTabela = ""

foreach ($area in $areas) {
$path = Join-Path $faseAtualPath $area.Diretorio
$percentual = Get-Percentual $path

$areaTabela += "| $($area.Nome) | $percentual% |`r`n"

}

$faseTabela = ""

foreach ($fase in $fases) {
$path = Join-Path $Root $fase.Diretorio
$percentual = Get-Percentual $path

if ($fase.Id -lt $FaseAtual) {
    $status = "CONCLUIDA"
}
elseif ($fase.Id -eq $FaseAtual) {
    $status = "EM_ANDAMENTO"
}
else {
    $status = "BLOQUEADA"
}


$faseTabela += "| $($fase.Id.ToString("00")) | $($fase.Nome) | $status | $percentual% |`r`n"

}

if ($FaseAtual -lt $fases.Count) {
$proxima = $fases[$FaseAtual]
$proximaTexto = "Fase $($proxima.Id.ToString("00")) - $($proxima.Nome)"
}
else {
$proximaTexto = "Roadmap concluido"
}

$painel = @"

Painel de Progresso - MeuRoadmap
Estado atual
Item	Status
Fase atual	Fase $($faseAtualObj.Id.ToString("00")) - $($faseAtualObj.Nome)
Status	EM_ANDAMENTO
Progresso	$progressoAtual%
Proxima fase	$proximaTexto
Progresso da Fase Atual
Area	Progresso
$areaTabela	
Fases
Fase	Area	Status	Progresso
$faseTabela			
Navegacao

Fase atual

Registro de Estudos

Revisoes

Sprints
"@

$saida = Join-Path $Root "docs\progresso\painel.md"

Set-Content -Path $saida -Value $painel -Encoding UTF8

Write-Host "Painel atualizado com sucesso."
Write-Host "Progresso da Fase 01: $progressoAtual%"