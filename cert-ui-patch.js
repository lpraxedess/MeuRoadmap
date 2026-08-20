(function(){
'use strict';
var app=document.getElementById('app');
function dedupe(){var sections=app.querySelectorAll('.cert-section'),seen={};for(var i=sections.length-1;i>=0;i--){var cards=sections[i].querySelectorAll('.cert-card');for(var j=0;j<cards.length;j++){var h=cards[j].querySelector('h3');if(!h)continue;var name=h.textContent.trim();if(seen[name])cards[j].remove();else seen[name]=true;}}}
new MutationObserver(function(){dedupe();}).observe(app,{childList:true,subtree:true});
})();
