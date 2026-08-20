const fs=require('fs');
const vm=require('vm');
const files=['data/roadmap.js','data/learning.js','data/resources.js','data/competency-details.js','data/competency-deep.js','data/career-audit.js','data/career-audit-extension.js','data/certifications.js','data/roadmap-extension.js','data/roadmap-v2.js','data/certification-extension.js'];
const ctx={window:{},console};vm.createContext(ctx);for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const R=ctx.window.ROADMAP,C=ctx.window.CERTIFICATIONS;if(!R?.phases?.length)throw Error('ROADMAP vazio');if(!C?.tracks?.length)throw Error('CERTIFICATIONS vazio');
const ids=new Map(),names=new Set();for(let pi=0;pi<R.phases.length;pi++){const p=R.phases[pi];if(!p.id||!p.name||!Array.isArray(p.tasks))throw Error(`Fase inválida: ${p.id||pi}`);for(const t of p.tasks){if(!t.id||ids.has(t.id))throw Error(`ID duplicado: ${t.id}`);if(!t.name||names.has(t.name))throw Error(`Competência duplicada/sem nome: ${t.name||t.id}`);if(!Number.isFinite(Number(t.mins))||Number(t.mins)<=0)throw Error(`${t.id}: mins inválido`);if(!Array.isArray(t.pre))throw Error(`${t.id}: pre deve ser array`);if(!t.evidence)throw Error(`${t.id}: evidência ausente`);ids.set(t.id,t);names.add(t.name);}}
for(const [id,t] of ids)for(const pre of t.pre)if(!ids.has(pre))throw Error(`${id}: pré-requisito inexistente ${pre}`);
const visiting=new Set(),visited=new Set();function dfs(id){if(visiting.has(id))throw Error(`Ciclo de pré-requisitos em ${id}`);if(visited.has(id))return;visiting.add(id);for(const p of ids.get(id).pre)dfs(p);visiting.delete(id);visited.add(id);}for(const id of ids.keys())dfs(id);
for(const p of R.phases)if(!Array.isArray(p.mastery)||p.mastery.length<4)throw Error(`${p.id}: mastery incompleto`);
console.log(`OK: ${R.phases.length} fases, ${ids.size} competências, ${C.tracks.length} certificações, grafo de pré-requisitos acíclico.`);
