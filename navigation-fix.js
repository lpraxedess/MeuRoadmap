(function(){
'use strict';
var NAV_VERSION='iam-hub-navigation-v7';
function go(view){
  try{
    localStorage.setItem('iam-view',view);
    localStorage.setItem('iam-nav-version',NAV_VERSION);
  }catch(e){}
  window.location.reload();
}
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.nav-btn[data-view]');
  if(!b)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  go(b.getAttribute('data-view'));
},true);
})();
