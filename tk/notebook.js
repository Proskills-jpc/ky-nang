/* TK · Nhật Bản Du Ký · tk/notebook.js · SỔ TAY: Tổng quan | Bí kíp | Cài đặt
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* =========================================================
   PHẦN 7 · SỔ TAY
   ========================================================= */
var nbOpen=false;
function openNb(){
  if(askOpen) closeAsk(true);
  if(tourI>=0 && TOUR[tourI] && TOUR[tourI].tap){ endTour(); setTimeout(function(){ toast('Giỏi lắm! Sổ tay luôn ở đây. Giờ bắt đầu từ điểm Lên đường nhé.',5000); },600); }
  if(nbOpen) return; nbOpen=true;
  var seenOld=S.d.seen||{}; S.d.nbDot=0; save(); updateNav();
  /* PS1.3.55: không thêm mục lịch sử; Back đóng Sổ tay qua PS.nav (intercept) */
  sheetBack('nbClose');
  var el=document.createElement('div'); el.className='nb'; el.id='nb'; el.setAttribute('role','dialog'); el.setAttribute('aria-label','Sổ tay');
  document.body.appendChild(el); document.body.style.overflow='hidden'; sheetDrag(el,function(){ closeNb(); });
  drawNb(seenOld);
  S.d.seen={dn:doneCount(), xp:xpTotal(), ins:insTotal(), sk:streak()}; save();
}
function closeNb(fromPop){
  var el=$('#nb'); if(el) el.remove(); $$('.sheetback').forEach(function(b){ b.remove(); }); nbOpen=false; document.body.style.overflow='';
  updateNav();
}
function drawNb(seenOld){
  var tab=S.d.nbTab||'tq';
  var h='<div class="nb__in"><div class="grab"></div><div class="nb__top"><h2>Sổ tay</h2><button class="nb__x" data-act="nbClose" aria-label="Đóng sổ tay">'+icon('close',20)+'</button></div>'+
    '<div class="tabs" role="tablist">'+[['tq','Tổng quan'],['kinh','Bí kíp'],['cd','Cài đặt']].map(function(t){ return '<button role="tab" aria-selected="'+(tab===t[0])+'" class="'+(tab===t[0]?'on':'')+'" data-act="nbTab" data-t="'+t[0]+'">'+t[1]+'</button>'; }).join('')+'</div>'+
    '<div id="nbBody">'+(tab==='tq'?nbOverview()+(DEMO_ON?'':PS.savedHTML(TK_ID)):(tab==='kinh'?nbKinh():nbSettings()))+'</div></div>';
  $('#nb').innerHTML=h;
  if(tab==='tq') animateTiles(seenOld||S.d.seen||{});
  if(tab==='cd') wireSettings();
}
function nbOverview(){
  var dn=doneCount(), xp=xpTotal(), ins=insTotal(), sk=streak();
  var days=[], mx=10, d=new Date(); d.setDate(d.getDate()-6);
  for(var i=0;i<7;i++){ var k=dkey(d), m=S.days[k]||0; days.push([k,m,d.getDay()]); if(m>mx) mx=m; d.setDate(d.getDate()+1); }
  var wd=['CN','T2','T3','T4','T5','T6','T7'];
  return '<div class="tiles">'+
    '<div class="tl dau" data-t="dn"><small>'+icon('seal',16)+' Con dấu</small><b><span data-n="'+dn+'">'+dn+'</span><span style="font-size:16px;color:var(--muted)">/'+TOTAL_ACTS+'</span></b></div>'+
    '<div class="tl xp" data-t="xp"><small>'+icon('star',16)+' XP</small><b data-n="'+xp+'">'+xp+'</b></div>'+
    '<div class="tl ins" data-t="ins"><small>'+icon('bulb',16)+' Insight</small><b data-n="'+ins+'">'+ins+'</b></div>'+
    '<div class="tl fire" data-t="sk"><small>'+icon('flame',16)+' Chuỗi ngày học</small><b data-n="'+sk+'">'+sk+'</b></div></div>'+
    '<div class="card" style="margin-top:12px"><h3 style="font-size:16px">Thời gian học 7 ngày qua</h3><p class="small muted" style="margin:2px 0 0">Tính bằng phút, chỉ đếm khi bạn đang học.</p>'+
    '<div class="chart">'+days.map(function(x,i){ var hgt=Math.max(4,Math.round(x[1]/mx*86)); return '<div><span>'+(x[1]?Math.round(x[1]):'')+'</span><i class="'+(i===6?'today':'')+'" style="height:'+hgt+'px;animation-delay:'+(i*.06)+'s"></i><span>'+(i===6?'Nay':wd[x[2]])+'</span></div>'; }).join('')+'</div></div>'+
    (goalText()?'<div class="card goalc"><small>Mục tiêu của bạn</small><p>'+esc(goalText())+'</p></div>':'')+
    '<p class="paceln">'+paceLine()+'</p>'+
    (S.demo?'':'<p class="small muted" style="text-align:center;margin:6px 0 0">Tổng XP mọi khóa Proskills: <b>'+PS.totals().xp+'</b></p>')+
    '<div class="btnrow" style="justify-content:center;margin-top:12px"><button class="btn btn--soft" data-act="rep">'+icon('scroll',18)+' Bản ghi chép, PDF và báo cáo</button></div>'+
    '<p class="ver">'+(S.savedAt?'Đã lưu lúc '+fmtTime(S.savedAt)+' · ':'')+'Phiên bản '+VERSION+' · '+esc(COURSE)+'</p>';
}
function animateTiles(old){
  var map={dn:old.dn||0, xp:old.xp||0, ins:old.ins||0, sk:old.sk||0};
  $$('#nbBody .tl').forEach(function(t){
    var k=t.getAttribute('data-t'), el=t.querySelector('[data-n]'), to=+el.getAttribute('data-n'), from=Math.min(map[k],to);
    if(to>from){ t.classList.add('glow'); if(!noMotion()){ var st=null; el.textContent=from; var f=function(ts){ if(!st) st=ts; var p=Math.min(1,(ts-st)/900); el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(f); }; requestAnimationFrame(f); } }
  });
}
function nbKinh(){
  var h='', pages=AIS.concat([FINAL]).filter(function(a){ return a.kinh && S.seals[a.n]; });
  if(S.seals[8]) h+='<div style="margin-bottom:12px">'+ticketHTML()+'<div class="btnrow"><button class="btn btn--sm" data-act="ticketSave">'+icon('download',16)+' Lưu vé thành ảnh</button></div></div>';
  h+='<h3 style="margin:2px 0 6px">Bí kíp đã nhận</h3>';
  h+= pages.length ? pages.map(kinhHTML).join('') : '<div class="card empty">Qua ải đầu tiên để nhận bí kíp đầu tiên.</div>';
  /* điều luật đã gặp */
  var laws=[];
  Object.keys(ACTS).forEach(function(id){ ACTS[id].steps.forEach(function(s,i){
    var x=firstX(id,i); if(!x) return;
    if(s.k==='branch' && x.solved) laws.push([s.law, ACTS[id].ai]);
    if(s.k==='flags' && x.f && x.f.length===s.segs.filter(function(g){return g.f;}).length) laws.push([s.law, ACTS[id].ai]);
  }); });
  h+='<h3 style="margin:18px 0 6px">Điều luật đã gặp</h3>';
  h+= laws.length ? laws.map(function(l){ return '<details class="lawd"><summary>'+icon('scroll',18)+'<span>'+esc(l[0].t)+'</span></summary>'+lawHTML(l[0])+'</details>'; }).join('') : '<div class="card empty">Chú Tanaka sẽ ghi vào đây mỗi điều luật bạn gặp trên đường.</div>';
  /* lời của bạn */
  var mine=[];
  Object.keys(ACTS).forEach(function(id){ ACTS[id].steps.forEach(function(s,i){
    if(s.k!=='write') return; var x=S.d['x.'+id+'.'+i]||{};
    s.fields.concat(s.opt?[s.opt]:[]).forEach(function(f){ if(x[f.key]) mine.push([f.label, x[f.key]]); });
  }); });
  h+='<h3 style="margin:18px 0 6px">Câu hộ thân của bạn</h3>';
  h+= mine.length ? mine.map(function(m){ return '<div class="card" style="margin-bottom:10px"><p class="small muted" style="margin:0 0 4px">'+esc(m[0])+'</p><p style="margin:0">'+esc(m[1])+'</p></div>'; }).join('') : '<div class="card empty">Những câu bạn tự viết sẽ được giữ ở đây.</div>';
  return h;
}
function wireSettings(){
  PS.wireSettings($('#nbBody'), { ctx:'module', mod:TK_ID,
    onChange:function(f){ if(f==='snd' && sndOn()){ ac(); sfx('ok'); } },
    afterReset:function(){ NOSAVE=1; location.reload(); } });
  var rt=$('#rmT'); if(rt) rt.addEventListener('change',function(){ remind().t=rt.value||'20:00'; save(); var g=$('#rmG'); if(g) g.href=gcalUrl(); });
  $$('#nb [data-sos]').forEach(function(el){ el.addEventListener('input',function(){ S.d.sos=S.d.sos||{}; S.d.sos[el.getAttribute('data-sos')]=el.value; save(); var c=$('#nb #sosCard'); if(c) c.outerHTML=sosCardHTML(); }); });
}
/* Sao lưu, khôi phục, xóa bài làm: dùng lõi Proskills (một tập tin cho mọi module) */
function toggleFull(){
  var d=document, el=d.documentElement;
  if(d.fullscreenElement||d.webkitFullscreenElement){ (d.exitFullscreen||d.webkitExitFullscreen).call(d); }
  else { var r=el.requestFullscreen||el.webkitRequestFullscreen; if(r) r.call(el); }
}

