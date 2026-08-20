(function () {
  'use strict';

  var KEY = 'iam-career-hub-state-v9';

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || 'null') || {};
    } catch (e) {
      return {};
    }
  }

  function countDone() {
    var done = read().done || {};
    return Object.keys(done).filter(function (key) {
      return done[key] === true;
    }).length;
  }

  function addSidebar() {
    var nav = document.querySelector('.sidebar nav');
    if (!nav) return;

    var old = nav.querySelector('[data-completed-nav]');
    if (old) old.remove();

    var button = document.createElement('button');
    button.className = 'nav-btn completed-nav';
    button.setAttribute('data-completed-nav', '1');
    button.innerHTML = 'Módulos concluídos <span class="completed-count">' + countDone() + '</span>';
    nav.appendChild(button);

    button.addEventListener('click', function (event) {
      event.preventDefault();
      var today = nav.querySelector('[data-view="today"]');
      if (today) today.click();

      setTimeout(function () {
        var completed = document.querySelector('.today-completed');
        if (completed) {
          completed.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    });
  }

  function enableRoadmap() {
    var button = document.querySelector('.nav-btn[data-view="roadmap"]');
    if (!button) return;
    button.disabled = false;
    button.style.pointerEvents = 'auto';
    button.style.cursor = 'pointer';
    button.style.opacity = '1';
  }

  function style() {
    if (document.getElementById('ui-fixes-v15-style')) return;

    var style = document.createElement('style');
    style.id = 'ui-fixes-v15-style';
    style.textContent =
      '.completed-nav{display:flex!important;justify-content:space-between;align-items:center}' +
      '.completed-count{opacity:.7;font-size:.75rem}' +
      '.nav-btn[data-view="roadmap"]{pointer-events:auto!important;cursor:pointer!important;opacity:1!important}';
    document.head.appendChild(style);
  }

  function init() {
    style();
    enableRoadmap();
    addSidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  var app = document.getElementById('app');
  if (app) {
    var observerTimer;
    new MutationObserver(function () {
      clearTimeout(observerTimer);
      observerTimer = setTimeout(init, 100);
    }).observe(app, { childList: true, subtree: true });
  }
})();
