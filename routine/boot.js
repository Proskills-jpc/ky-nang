/* Production bootstrap: load only the release storage. No automatic Demo.
   PS1.3.25: chưa có hồ sơ Proskills thì trang đang chuyển về trang chủ (PS_STOP), không dựng Shin. */
if(!window.PS_STOP){
load(); save(); KPI_LAST=kpiValues();
new MutationObserver(function(){animateKPIs();}).observe(document.body,{childList:true,subtree:true});
if('scrollRestoration' in history) history.scrollRestoration='manual';
render(); window.scrollTo(0,0); if(!DEMO)splashBoot();else document.documentElement.classList.remove('growth-starting');
if(R2_NOTICE)setTimeout(r2Notice,DEMO||location.hash==='#checkin'?500:800); /* v2: Shin báo thẻ đã lên bậc ở lần mở đầu */
else setTimeout(r2Ask,DEMO?700:900); /* v2 đợt 2: Shin hỏi khi mở app, 1 lần mỗi ngày */
scheduleCheckin36();
function hashCI(){ if(S.name && location.hash==='#checkin'){ try{ history.replaceState(null,'',location.pathname+location.search); }catch(e){} setTimeout(function(){ openCI(dk()); },350); } }
hashCI(); window.addEventListener('hashchange',hashCI);
if('speechSynthesis' in window){ try{ speechSynthesis.getVoices(); }catch(e){} }
if(document.readyState==='complete')startSW32();else window.addEventListener('load',startSW32,{once:true});
}
