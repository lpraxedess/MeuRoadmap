(()=>{'use strict';
// Navigation fix: every internal destination gets a real hash-history entry.
document.addEventListener('click',e=>{
  const topic=e.target.closest?.('[data-topic]');
  if(topic){
    const id=topic.getAttribute('data-topic');
    if(id){e.preventDefault();e.stopImmediatePropagation();location.hash='topic/'+encodeURIComponent(id);return;}
  }
  const phase=e.target.closest?.('[data-phase]');
  if(phase){
    e.preventDefault();e.stopImmediatePropagation();
    const id=phase.getAttribute('data-phase');
    if(id) location.hash='phase/'+encodeURIComponent(id);
  }
},{capture:true});
})();
