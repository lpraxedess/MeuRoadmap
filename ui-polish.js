(function(){'use strict';
function fix(){document.querySelectorAll('.nav-btn').forEach(function(b){if((b.getAttribute('data-view')||'')==='progress')b.textContent='Progresso';});document.querySelectorAll('.top .eyebrow').forEach(function(e){if(e.textContent.trim()==='PROGRESS')e.textContent='PROGRESSO';});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();
new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true});
})();
