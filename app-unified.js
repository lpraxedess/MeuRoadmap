(() => {
  'use strict';

  const STORAGE_KEY = 'cyber-hub-v4';
  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  const DEFAULT_STATE = { topics: {}, sessions: [], labs: {}, certs: {} };
  let state = loadState();

  const phases = [
    { n: '01', name: 'Fundamentos', level: 'Fundamental / Básico', desc: 'Base técnica para toda a carreira.', domains: ['fundamentals', 'crypto'] },
    { n: '02', name: 'Infraestrutura & Cloud', level: 'Básico / Intermediário', desc: 'Infraestrutura, redes, cloud e endpoints.', domains: ['cloud', 'network', 'endpoint'] },
    { n: '03', name: 'Identidade & Acesso', level: 'Intermediário', desc: 'IAM, IGA e PAM.', domains: ['iam', 'iga', 'pam'] },
    { n: '04', name: 'Defesa & Operações', level: 'Intermediário / Avançado', desc: 'SOC, resposta, vulnerabilidades, aplicações e dados.', domains: ['soc', 'ir', 'vuln', 'appsec', 'data'] },
    { n: '05', name: 'Governança & Arquitetura', level: 'Avançado / Especialista', desc: 'GRC, arquitetura, resiliência, IA e ofensiva.', domains: ['grc', 'architecture', 'resilience', 'ai', 'offensive'] }
  ];

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('cyber-hub-v3') || localStorage.getItem('cyber-hub-v2');
      const parsed = raw ? JSON.parse(raw) : {};
      return {
        ...DEFAULT_STATE,
        ...parsed,
        topics: parsed.topics && typeof parsed.topics === 'object' ? parsed.topics : {},
        labs: parsed.labs && typeof parsed.labs === 'object' ? parsed.labs : {}
      };
    } catch (_) {
      return { ...DEFAULT_STATE };
    }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function allTopics() {
    return (Array.isArray(window.DOMAINS) ? window.DOMAINS : []).flatMap((d) =>
      (d.topics || []).map((name, index) => ({ id: `${d.id}-${index}`, name, domain: d.id, index }))
    );
  }

  function getDomain(id) {
    return (window.DOMAINS || []).find((item) => item.id === id);
  }

  function getTopic(id) {
    return allTopics().find((item) => item.id === id);
  }

  function topicProgress(id) {
    const checks = state.topics[id]?.check || {};
    return Math.round(Object.values(checks).filter(Boolean).length / 6 * 100);
  }

  function domainProgress(domain) {
    const topics = domain?.topics || [];
    if (!topics.length) return 0;
    return Math.round(topics.reduce((sum, _, index) => sum + topicProgress(`${domain.id}-${index}`), 0) / topics.length);
  }

  function phaseTopics(phase) {
    return phase.domains.flatMap((id) => {
      const d = getDomain(id);
      return d ? d.topics.map((name, index) => ({ id: `${id}-${index}`, name, domain: id, index })) : [];
    });
  }

  function phaseProgress(phase) {
    const domains = phase.domains.map(getDomain).filter(Boolean);
    if (!domains.length) return 0;
    return Math.round(domains.reduce((sum, d) => sum + domainProgress(d), 0) / domains.length);
  }

  function careerProgress() {
    const domains = window.DOMAINS || [];
    if (!domains.length) return 0;
    return Math.round(domains.reduce((sum, d) => sum + domainProgress(d), 0) / domains.length);
  }

  function currentPhase() {
    return phases.find((phase) => phaseProgress(phase) < 100) || phases[phases.length - 1];
  }

  function nextTopic() {
    return phaseTopics(currentPhase()).find((topic) => topicProgress(topic.id) < 100) || null;
  }

  function levelFor(phase, topic) {
    const list = phaseTopics(phase);
    const position = Math.max(0, list.findIndex((item) => item.id === topic.id));
    if (phase.n === '01') return 'Fundamental';
    if (position < Math.ceil(list.length * 0.35)) return 'Básico';
    if (position < Math.ceil(list.length * 0.8)) return 'Intermediário';
    return 'Avançado';
  }

  function bar(value) { return `<div class="bar"><i style="width:${Math.max(0, Math.min(100, value))}%"></i></div>`; }
  function icon(domain) { return `<span class="icon ${esc(domain?.color || '')}">${esc(domain?.icon || '•')}</span>`; }

  function navigate(route) {
    const target = route.startsWith('#') ? route : `#${route}`;
    if (location.hash === target) render(); else location.hash = target;
  }

  function navigation(active) {
    return `<aside>
      <div class="logo">CYBER<span>HUB</span></div>
      <div class="profile"><small>OBJETIVO PROFISSIONAL</small><b>Cloud · IAM · Security · GRC</b></div>
      <button class="nav ${active === 'dashboard' ? 'active' : ''}" data-go="dashboard">Dashboard</button>
      <button class="nav ${active === 'labs' ? 'active' : ''}" data-go="labs">Laboratórios</button>
      <button class="nav ${active === 'certs' ? 'active' : ''}" data-go="certs">Certificações</button>
      <div class="side-foot">AUTO SAVE · PROGRESSO LOCAL</div>
    </aside>`;
  }

  function shell({ title, sub = '', body, active = 'dashboard', bind }) {
    document.body.innerHTML = `${navigation(active)}<main>
      <header class="top"><div class="page-nav"><button class="back" id="back">← Voltar</button><div><span class="kicker">CYBERSECURITY STUDY HUB</span><h1>${esc(title)}</h1><p>${esc(sub)}</p></div></div></header>
      ${body}
    </main>`;

    $('#back').onclick = () => {
      if (document.referrer && history.length > 1) history.back();
      else navigate('dashboard');
    };
    document.querySelectorAll('[data-go]').forEach((button) => button.onclick = () => navigate(button.dataset.go));
    if (typeof bind === 'function') bind();
  }

  function renderDashboard() {
    const phase = currentPhase();
    const next = nextTopic();
    const progress = careerProgress();

    shell({
      title: 'Dashboard',
      sub: 'Seu mapa completo de conhecimento e acompanhamento profissional.',
      body: `<section class="career-overview">
        <div class="career-main"><span class="kicker">PROGRESSO DA CARREIRA</span><strong>${progress}%</strong>${bar(progress)}<p>O progresso é salvo automaticamente neste navegador.</p></div>
        <div class="current-module"><span class="kicker">MÓDULO ATUAL</span><b>Fase ${phase.n} · ${esc(phase.name)}</b><span>${esc(phase.level)}</span>${bar(phaseProgress(phase))}<strong>${phaseProgress(phase)}%</strong>${next ? `<button class="primary" data-topic="${next.id}">Continuar no próximo conteúdo →</button>` : ''}</div>
      </section>
      <section class="section-head"><div><span class="kicker">MAPA COMPLETO</span><h2>Seu caminho</h2><p>Fases, áreas e todos os conhecimentos disponíveis. Clique em qualquer conteúdo para estudar.</p></div></section>
      <section class="knowledge-map">${phases.map(renderPhase).join('')}</section>`,
      bind: bindTopicButtons
    });
  }

  function renderPhase(phase) {
    return `<article class="map-phase"><div class="map-phase-head"><span>${phase.n}</span><div><span class="kicker">FASE ${phase.n}</span><h2>${esc(phase.name)}</h2><p>${esc(phase.level)} · ${esc(phase.desc)}</p></div><strong>${phaseProgress(phase)}%</strong></div>
      ${phase.domains.map((id) => {
        const d = getDomain(id);
        if (!d) return '';
        return `<div class="map-domain"><div class="map-domain-title">${icon(d)}<div><b>${esc(d.name)}</b><small>${domainProgress(d)}%</small></div></div>
          <div class="knowledge-items">${(d.topics || []).map((name, index) => {
            const topic = { id: `${id}-${index}`, name, domain: id, index };
            const progress = topicProgress(topic.id);
            return `<button class="knowledge-item" data-topic="${topic.id}"><span class="topic-number">${String(index + 1).padStart(2, '0')}</span><b>${esc(name)}</b><small>${levelFor(phase, topic)} · ${progress}%</small>${bar(progress)}</button>`;
          }).join('')}</div></div>`;
      }).join('')}
    </article>`;
  }

  function bindTopicButtons() {
    document.querySelectorAll('[data-topic]').forEach((button) => button.onclick = () => navigate(`topic/${button.dataset.topic}`));
  }

  function renderTopic(id) {
    const topic = getTopic(id);
    if (!topic) return navigate('dashboard');
    const domain = getDomain(topic.domain);
    const phase = phases.find((item) => item.domains.includes(topic.domain)) || phases[0];
    const saved = state.topics[id] || {};
    const checks = ['Conceito e terminologia', 'Documentação oficial / arquitetura', 'Implementação prática', 'Troubleshooting controlado', 'Registrar evidência objetiva', 'Explicar sem consulta'];

    shell({
      title: topic.name,
      sub: `Fase ${phase.n} · ${domain?.name || 'Área'} · ${levelFor(phase, topic)} · ${topicProgress(id)}%`,
      body: `<div class="topic-detail"><div class="panel"><span class="kicker">ESTUDO DESTE CONTEÚDO</span><h2>Estudar → Praticar → Evidenciar → Validar</h2>
        <div class="checklist">${checks.map((label, index) => `<label><input type="checkbox" data-check="${index}" ${saved.check?.[index] ? 'checked' : ''}>${label}</label>`).join('')}</div>
        <div class="progress-live" id="topic-progress"><strong>${topicProgress(id)}%</strong> concluído</div>
        <textarea id="note" placeholder="Notas, comandos, evidências, links…">${esc(saved.note || '')}</textarea>
        <button class="primary" id="save">Salvar estudo</button></div>
        <div class="panel"><span class="kicker">CONTEXTO</span><div class="plain-row">Fase ${phase.n} · ${esc(phase.name)}</div><div class="plain-row">Nível: ${levelFor(phase, topic)}</div><div class="plain-row">Área: ${esc(domain?.name || '')}</div><span class="kicker gap">CERTIFICAÇÕES RELACIONADAS</span>${(domain?.certs || []).map((cert) => `<div class="cert-chip">${esc(cert)}</div>`).join('') || '<div class="plain-row">Sem certificação direta.</div>'}</div></div>`,
      bind: () => {
        const inputs = [...document.querySelectorAll('[data-check]')];
        const sync = () => {
          const item = state.topics[id] || {};
          item.check = item.check || {};
          inputs.forEach((input, index) => item.check[index] = input.checked);
          state.topics[id] = item;
          saveState();
          $('#topic-progress').innerHTML = `<strong>${topicProgress(id)}%</strong> concluído`;
        };
        inputs.forEach((input) => input.onchange = sync);
        $('#save').onclick = () => {
          const item = state.topics[id] || {};
          item.note = $('#note').value;
          state.topics[id] = item;
          saveState();
          $('#save').textContent = 'Salvo ✓';
          setTimeout(() => { if ($('#save')) $('#save').textContent = 'Salvar estudo'; }, 1200);
        };
      }
    });
  }

  function renderLabs() {
    const domains = Array.isArray(window.DOMAINS) ? window.DOMAINS : [];
    shell({
      title: 'Laboratórios',
      sub: 'Prática concreta e acompanhamento independente.',
      active: 'labs',
      body: `<section class="lab-grid">${domains.map((domain) => {
        const labs = window.SPECIALS?.[domain.id]?.labs || [`Lab introdutório de ${domain.name}`, `Cenário prático de ${domain.name}`];
        return `<div class="panel"><span class="kicker">${esc(domain.name)}</span>${labs.map((name, index) => {
          const id = `${domain.id}-lab-${index}`;
          const done = !!state.labs[id];
          return `<button class="lab-row ${done ? 'done' : ''}" data-lab="${id}"><span>${done ? '✓' : '○'}</span>${esc(name)}</button>`;
        }).join('')}</div>`;
      }).join('')}</section>`,
      bind: () => document.querySelectorAll('[data-lab]').forEach((button) => button.onclick = () => {
        state.labs[button.dataset.lab] = !state.labs[button.dataset.lab];
        saveState();
        renderLabs();
      })
    });
  }

  function renderCerts() {
    const certs = Array.isArray(window.CERTS) ? window.CERTS : [];
    shell({
      title: 'Certificações',
      sub: 'Certificações relacionadas ao conhecimento do mapa.',
      active: 'certs',
      body: `<section class="cert-grid">${certs.map((cert) => {
        const domain = getDomain(cert.domain);
        const progress = domain ? domainProgress(domain) : 0;
        return `<article class="cert-card panel"><div class="cert-top"><b>${esc(cert.name)}</b><span>${esc(cert.level || '')}</span></div><h2>${esc(cert.title)}</h2><p>${esc(cert.provider || '')}</p>${bar(progress)}<div class="cert-foot"><span>Conhecimentos relacionados</span><strong>${progress}%</strong></div></article>`;
      }).join('')}</section>`
    });
  }

  function render() {
    const route = location.hash.replace(/^#/, '') || 'dashboard';
    if (route === 'labs') return renderLabs();
    if (route === 'certs') return renderCerts();
    if (route.startsWith('topic/')) return renderTopic(route.slice(6));
    return renderDashboard();
  }

  function boot() {
    if (!Array.isArray(window.DOMAINS) || !window.DOMAINS.length) {
      document.body.innerHTML = '<main style="margin:0;padding:40px;font-family:system-ui;color:#e8edf5;background:#080b12;min-height:100vh"><h1>Cybersecurity Study Hub</h1><p>Não foi possível carregar os dados do roadmap. Recarregue a página.</p></main>';
      return;
    }
    render();
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('error', (event) => console.error('CyberHub:', event.error || event.message));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
