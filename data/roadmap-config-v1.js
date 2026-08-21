/* Canonical study-time configuration. Keeps runtime and roadmap aligned with the user's daily plan. */
(function(){
  'use strict';
  if(!window.ROADMAP) return;
  window.ROADMAP.career=Object.assign({},window.ROADMAP.career,{dailyStudyMinutes:180,dailyEnglishMinutes:60});
  window.ROADMAP.version='1.0.1';
})();
