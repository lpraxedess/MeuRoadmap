(function(){
'use strict';
function update(){
  document.querySelectorAll('.today-focus .focus-meta').forEach(function(el){
    var text=el.textContent||'';
    var m=text.match(/\d+/);
    el.textContent=m?(m[0]+' min'):text;
  });
  document.querySelectorAll('.today-grid .task').forEach(function(row){
    var small=row.querySelector('small');
    if(!small)return;
    var text=small.textContent||'';
    var pct=text.match(/(\d+)%\s*validado/);
    if(!pct)return;
    small.textContent=(text.match(/\d+/)||['0'])[0]+' min';
    var bar=row.querySelector('.today-task-progress');
    if(!bar){
      bar=document.createElement('div');
      bar.className='bar today-task-progress';
      bar.innerHTML='<i></i>';
      small.parentNode.appendChild(bar);
    }
    var i=bar.querySelector('i');
    if(i)i.style.width=pct[1]+'%';
  });
}
function init(){
  if(!document.getElementById('today-ui-patch-style')){
    var s=document.createElement('style');s.id='today-ui-patch-style';
    s.textContent='.today-focus .focus-meta{margin-bottom:10px}.today-focus>.bar{margin-top:4px;margin-bottom:18px}.today-grid .task{min-height:92px;padding:18px 20px;align-items:center;box-sizing:border-box}.today-grid .task>div:first-child{min-width:0;flex:1}.today-grid .task small{display:block;margin-top:7px}.today-task-progress{height:5px!important;margin-top:9px!important;width:min(260px,100%);overflow:hidden}.today-task-progress i{display:block;height:100%;transition:width .25s ease}.today-grid .task-actions{flex-shrink:0;margin-left:18px}.today-grid .panel{overflow:hidden}.today-grid .panel-head{margin-bottom:14px}';
    document.head.appendChild(s);
  }
  update();
}
var timer;function schedule(){clearTimeout(timer);timer=setTimeout(init,40)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
var app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
})();