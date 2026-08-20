(function(){
'use strict';

/* UX fixes kept outside the data model: navigation must always leave a real #today state. */
const STATE_KEY='iam-career-hub-state-v10';
const MIGRATION_KEY='iam-career-hub-ux-migration-v1';

function normalizeToday(){
  if(location.hash.slice(1)!=='today') history.replaceState(null,'',location.pathname+'#today');
}

/* app-v8 previously rendered Today while leaving #task/<id> in the URL.
   Clicking Continue for the same task then did nothing because the hash did not change. */
document.addEventListener('click',function(e){
  const back=e.target.closest && e.target.closest('#back');
  if(back){
    setTimeout(function(){ normalizeToday(); },0);
  }
},false);

/* One-time cleanup of two legacy checklist entries that could arrive pre-checked
   from the previous task-state migration. From this point they are ordinary toggles. */
function cleanupLegacyChecks(){
  if(localStorage.getItem(MIGRATION_KEY)==='1') return;
  try{
    const raw=JSON.parse(localStorage.getItem(STATE_KEY)||'{}');
    const done=raw.activityDone||{};
    Object.keys(done).forEach(function(k){
      const parts=k.split('|');
      if(parts.length!==3) return;
      const s=Number(parts[1]), i=Number(parts[2]);
      if(s===0 && (i===0 || i===1)) delete done[k];
    });
    raw.activityDone=done;
    localStorage.setItem(STATE_KEY,JSON.stringify(raw));
    localStorage.setItem(MIGRATION_KEY,'1');
  }catch(e){}
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',cleanupLegacyChecks,{once:true});
else cleanupLegacyChecks();
})();
