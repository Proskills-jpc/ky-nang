/* TK · Nhật Bản Du Ký · tk/engine.js · BỘ MÁY: trạng thái bài làm, gắn lõi Proskills, điểm, mở khóa, điều hướng, màn hình
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* =========================================================
   PHẦN 3 · DỮ LIỆU HỌC VIÊN (lưu trong trình duyệt)
   ========================================================= */
/* Proskills: bài làm lưu ở ps.mod.tk (PS.load/PS.save); demo giáo viên ở ps.demo.tk.
   Họ tên, năm sinh, lớp, diện, thầy cô: chỉ đọc từ hồ sơ chung PS.profile() (nhập ở trang chủ). */
var TK_ID = 'tk';
var DEMO_KEY = 'ps.demo.' + TK_ID;
/* Demo giáo viên: link tk/?demo rồi nhập mật khẩu chung (config.js · DEMO_PASS) */
var DEMO_Q = PS.demoParam();
var WANT_DEMO = DEMO_Q.on && PS.checkDemo(DEMO_Q.val);
var ASK_DEMO = DEMO_Q.on && !WANT_DEMO;
var DEMO_ON = WANT_DEMO || (!ASK_DEMO && !!PS.get(DEMO_KEY, null));
var TK_OK = DEMO_ON || ASK_DEMO || PS.guard(TK_ID);   /* thiếu hồ sơ hoặc chưa qua cổng: về trang chủ */
var APP = document.getElementById('app');
var PROF_KEYS = ['name','by','sid','cls','path'];
function profOf(o){ return o.demo ? (o.prof||{}) : PS.profile(); }
/* S.name, S.by, S.cls, S.path… là thuộc tính chỉ đọc lấy từ hồ sơ chung (không lưu vào bài làm) */
function attachProf(o){
  PROF_KEYS.forEach(function(k){
    Object.defineProperty(o, k, { configurable:true, enumerable:false,
      get:function(){ return profOf(o)[k]||''; },
      set:function(v){ if(o.demo){ o.prof=o.prof||{}; o.prof[k]=v; } } });
  });
  return o;
}
function blank(){ return attachProf({v:1, gate:0, onb:0, created:Date.now(), d:{}, done:{}, xp:{}, ins:{}, days:{}, seals:{}, ver:VERSION, savedAt:0}); }
function load(){
  try{ var s = (DEMO_ON && !WANT_DEMO) ? PS.get(DEMO_KEY, null) : PS.load(TK_ID); if(s && typeof s==='object') return normalize(s); }catch(e){}
  return blank();
}
function normalize(s){ var b=blank(); for(var k in b){ if(s[k]===undefined) s[k]=b[k]; } s.ver=VERSION; return attachProf(s); }
var S = load();
var saveT=null, NOSAVE=(TK_OK && !ASK_DEMO)?0:1;
function save(now){
  clearTimeout(saveT); if(NOSAVE || window.PS_NOSAVE) return;
  var w=function(){ if(NOSAVE || window.PS_NOSAVE) return; try{
    if(S.demo){ S.savedAt=Date.now(); PS.set(DEMO_KEY, S); return; }
    PS.save(TK_ID, S);
    PS.report(TK_ID, {xp:xpTotal(), ins:insTotal(), done:doneCount(), total:TOTAL_ACTS, days:S.days, ver:VERSION, extra:{next:nextInfo()}});
  }catch(e){} };
  if(now) w(); else saveT=setTimeout(w, 250);
}
/* lõi Proskills báo trước khi sao lưu/khôi phục; hồ sơ đổi thì vẽ lại tên, lớp */
window.addEventListener('ps:change', function(e){
  var f=e.detail && e.detail.field;
  if(f==='beforeBackup' || f==='beforeRestore') save(true);
  if(f==='profile' && TK_OK && (V.v==='home' || V.v==='rep')) render(false);
});
document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden') save(true); });
window.addEventListener('pagehide', function(){ save(true); });

/* ---------- tiện ích ---------- */
function $(q,r){ return (r||document).querySelector(q); }
function $$(q,r){ return Array.prototype.slice.call((r||document).querySelectorAll(q)); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function given(){ var n=String(S.name||'').trim().split(/\s+/); return n[n.length-1]||'bạn'; }
function T(s){ return esc(s).replace(/\[Tên\]/g, '<b class="nm">'+esc(given())+'</b>'); }
function pad(n){ return (n<10?'0':'')+n; }
function today(){ var d=new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function dkey(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function fmtDate(t){ var d=new Date(t||Date.now()); return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'+d.getFullYear(); }
function fmtTime(t){ var d=new Date(t); return pad(d.getHours())+':'+pad(d.getMinutes()); }
function words(s){ s=String(s||'').trim(); return s ? s.split(/\s+/).length : 0; }
function norm(s){ return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]/g,''); }
function noMotion(){ return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }
function aiOf(n){ return n===0 ? START : (n===8 ? FINAL : AIS[n-1]); }

/* ---------- điểm thưởng ---------- */
function xpTotal(){ var t=0; for(var k in S.xp) t+=S.xp[k]; return t; }
function insTotal(){ var t=0; for(var k in S.ins) t+=S.ins[k]; return t; }
function doneCount(){ return Object.keys(S.done).filter(function(id){ return ACTS[id] && !ACTS[id].warm; }).length; }
function warmCount(){ return Object.keys(S.done).filter(function(id){ return ACTS[id] && ACTS[id].warm; }).length; }
function addXP(key,n,silent){ if(S.xp[key]!=null) return 0; S.xp[key]=n; S.d.nbDot=1; save(); if(!silent) pointToast(n,0); updateNav(); return n; }
function setIns(key,n){ var old=S.ins[key]||0; if(n<=old) return 0; S.ins[key]=n; S.d.nbDot=1; save(); updateNav(); return n-old; }
function streak(){
  if(!S.demo) return PS.streak();   /* Proskills: chuỗi ngày tính chung mọi module */
  var d=new Date(), n=0;
  if(!S.days[dkey(d)]) d.setDate(d.getDate()-1);
  while(S.days[dkey(d)]){ n++; d.setDate(d.getDate()-1); }
  return n;
}
/* thời gian học: chỉ đếm khi màn hình mở và có thao tác trong 60 giây gần nhất */
var lastAct=Date.now();
['pointerdown','keydown','scroll','touchstart'].forEach(function(ev){ window.addEventListener(ev,function(){ lastAct=Date.now(); },{passive:true}); });
setInterval(function(){
  if(document.visibilityState!=='visible' || Date.now()-lastAct>60000 || !S.gate) return;
  var k=today(); S.days[k]=Math.round(((S.days[k]||0)+0.25)*100)/100; save();
},15000);
function markDay(){ var k=today(); if(!S.days[k]) { S.days[k]=0.25; save(); } }

/* ---------- trạng thái mở khóa ---------- */
function actDone(id){ return !!S.done[id]; }
function startDone(){ return START.acts.every(actDone); }
function aiDone(n){ var a=aiOf(n); return !!(a.acts && a.acts.every(actDone)); }
function sealed(n){ return aiDone(n) && !!S.seals[n]; }
function aiOpen(n){
  if(n===0) return true;
  if(!BUILT[n] || !startDone()) return false;
  if(n===1) return true;
  if(n===8) return AIS.every(function(a){ return sealed(a.n); });
  return sealed(n-1);                 /* các ải khác: qua ải trước mới mở */
}
function actOpen(id){
  var a=ACTS[id], ai=aiOf(a.ai);
  if(a.warm) return aiOpen(a.ai);
  var i=ai.acts.indexOf(id);
  return aiOpen(a.ai) && (i===0 || actDone(ai.acts[i-1]));
}
function nextTarget(){
  if(!startDone()) { var id=START.acts.filter(function(x){return !actDone(x);})[0]; return {label:'Bắt đầu: Lên đường', act:'ai', n:0}; }
  var LIST=AIS.concat([FINAL]); for(var i=0;i<LIST.length;i++){ var a=LIST[i]; if(BUILT[a.n] && aiOpen(a.n) && !sealed(a.n)) return {label:(anyDone(a.n)?'Đi tiếp: ':'Vào ')+a.vn, act:'ai', n:a.n}; }
  return null;
}
function anyDone(n){ var a=aiOf(n); return a.acts && a.acts.some(actDone); }

/* ---------- điều hướng ---------- */
var V = {v:'home'};
function go(v, opt){
  var nv={v:v}; for(var k in (opt||{})) nv[k]=opt[k];
  var from=V.v; NAV.go(nv); V=nv; if(v==='act') sfx('whoosh');
  if(v!=='ai' && v!=='act'){ S.d._aivMark=null; S.d.dlgOpen=null; }
  if(v==='ai' && from!=='act' && S.gate && S.onb){ aiTransition(nv.n, function(){ render(true); }); return; }
  render(true);
}
/* PS1.3.55 (ý 25): nút ‹ và Back Android cùng "về một cấp" (lõi PS.nav) */
function navParent(v){ if(v.v==='act' && ACTS[v.id]) return {v:'ai', n:ACTS[v.id].ai}; if(v.v==='ai' || v.v==='rep') return {v:'home'}; return null; }
var NAV = PS.nav({ mod: TK_ID, tag: 'tk', get: function(){ return V; }, parent: navParent,
  depth: function(v){ return v.v==='act' ? 2 : ((v.v==='ai' || v.v==='rep') ? 1 : 0); },
  ser: function(v){ return {v:v.v, n:(v.n==null?null:v.n), id:v.id||null}; },
  de: function(h){
    if(h.v==='act' && ACTS[h.id] && actOpen(h.id)) return {v:'act', id:h.id};
    if(h.v==='ai' && h.n!=null && (+h.n===0 || aiOpen(+h.n))) return {v:'ai', n:+h.n};
    if(h.v==='rep') return {v:'rep'};
    if(h.v==='home') return {v:'home'};
    return null; },
  show: function(v, y){ V=v; if(v.v!=='ai' && v.v!=='act'){ S.d._aivMark=null; S.d.dlgOpen=null; } render(false); window.scrollTo(0, y||0); },
  intercept: function(){ if(nbOpen){ closeNb(true); return 1; } if(askOpen){ closeAsk(true); return 1; } return 0; },
  beforeLeave: function(){ save(true); } });
/* PS1.3.55 (ý 24): hoạt động kế tiếp cho nút Học tiếp ở trang chủ */
function nextInfo(){
  var L=[START].concat(AIS,[FINAL]);
  for(var i=0;i<L.length;i++){ var a=L[i]; if(!a.acts || (a.n && (!BUILT[a.n] || !aiOpen(a.n)))) continue;
    for(var j=0;j<a.acts.length;j++){ var id=a.acts[j]; if(ACTS[id] && !ACTS[id].warm && !actDone(id) && actOpen(id)) return {t:a.vn+' · '+ACTS[id].t, go:id}; } }
  return null;
}

/* ---------- thông báo ---------- */
var toastT=null;
function toast(html, ms){
  var t=$('#toast'); t.innerHTML=html; t.classList.add('show');
  clearTimeout(toastT); toastT=setTimeout(hideToast, ms||4000);
}
function hideToast(){ $('#toast').classList.remove('show'); }
window.addEventListener('scroll', function(){ if($('#toast').classList.contains('show') && Date.now()-toastShownAt>800) hideToast(); }, {passive:true});
var toastShownAt=0;
function pointToast(xp, ins, msg){
  var h=(msg?esc(msg)+' ':'')+(xp?'<span class="pt xp">+'+xp+' XP</span>':'')+(ins?'<span class="pt ins">+'+ins+' Insight</span>':'');
  toastShownAt=Date.now(); toast(h, 4000);
}

/* ---------- thanh điều hướng nổi ---------- */
/* PS1.3.55 (ý 25): thanh trên chung · ‹ về một cấp | tên màn | Hỏi nhanh + Sổ tay */
function updateNav(){
  var on=!!(S.gate && S.onb), bk='Proskills', t='Nhật Bản Du Ký', a, ai;
  if(V.v==='ai'){ ai=aiOf(V.n); bk='Bản đồ'; t=ai?ai.vn:''; }
  else if(V.v==='act' && (a=ACTS[V.id])){ ai=aiOf(a.ai); bk=ai.vn; t=a.warm?'Khởi động':(ai.acts.indexOf(V.id)+1)+'/'+ai.acts.length; }
  else if(V.v==='rep'){ bk='Bản đồ'; t='Bản ghi chép'; }
  var tl=document.getElementById('psnav'), hid=tl && tl.classList.contains('tour-hl');
  $('#nav').innerHTML = on ? PS.navHTML({back:bk, title:t, dot:S.d.nbDot, extra:'<button type="button" class="psnav__x'+(askOpen?' on':'')+'" data-act="ask" aria-label="Hỏi nhanh Chú Tanaka" title="Hỏi nhanh Chú Tanaka">'+icon('ask',22)+'</button>'}) : '';
  document.body.classList.toggle('tk-nav', on);
  if(hid && $('#psnav')) $('#psnav').classList.add('tour-hl');
}

/* ---------- khung chung ---------- */
function sayHTML(who, mood, text, cls){
  return '<div class="say say--'+who+' '+(cls||'')+'"><div class="say__av">'+av(who,mood)+'</div><div class="say__b"><b class="who">'+esc(CHAR[who].n)+'</b>'+text+'</div></div>';
}
function foot(){ return '<footer class="foot">'+esc(COURSE)+' · Bài làm tự lưu trên trình duyệt thiết bị này</footer>'; }

/* =========================================================
   PHẦN 4 · CÁC MÀN HÌNH
   ========================================================= */
function render(enter){
  updateNav();
  if(!TK_OK) return;
  var h='';
  if(V.v==='ai') h=vAi(V.n);
  else if(V.v==='act') h=vAct(V.id);
  else if(V.v==='rep') h=vRep();
  else h=vHome();
  APP.innerHTML=h;
  after(enter);
}
function after(enter){
  var w=APP.firstElementChild;
  if(enter && w && !noMotion()){
    w.classList.add('enter');
    $$(':scope > *', w).forEach(function(el,i){ el.style.setProperty('--i', Math.min(i,8)); });
    setTimeout(function(){ if(w) w.classList.remove('enter'); }, 1600);
  }
  if(enter) window.scrollTo(0, V.scroll||0);
  if(V.v==='act') wireAct();
  if(V.v==='home' && S.onb && S.gate){ afterHome(); if(!S.d.tour && !S.demo) setTimeout(function(){ if(V.v==='home' && tourI<0) startTour(); },1800); }
  demoBar();
}

/* ---------- 1–2. Khởi đầu và câu hỏi qua cổng: trang chủ Proskills làm (PS.guard). ---------- */

/* ---------- 3. Trang chủ: văn điệp + bản đồ ---------- */
function vanDiep(){
  var n=doneCount(), pct=Math.min(1,n/TOTAL_ACTS), nseal=AIS.filter(function(a){ return S.seals[a.n]; }).length;
  var nx=nextTarget();
  var seals=AIS.map(function(a){
    var on=!!S.seals[a.n];
    return '<div class="seal'+(on?' on':'')+(S.d.sealNew===a.n?' drop':'')+'" title="'+esc(a.vn)+'">'+(on?sealSVG(a.badge?a.badge.k:a.k,44):'<span>'+a.n+'</span>')+'</div>';
  }).join('');
  var cta = S.seals[8] ? '<div class="vdx__done">'+sealSVG('到',34)+'<span>Đã đến Phù Tang ngày '+fmtDate(S.seals[8])+'</span></div><button class="btn btn--full" data-act="ticket">Xem vé hoàn thành</button>'
    : (nx?'<button class="btn btn--full invite" data-act="ai" data-n="'+nx.n+'">'+esc(nx.label)+'</button>':'');
  return '<section class="vdx" aria-label="Văn điệp thông quan"><div class="vdx__rod"></div><div class="vdx__paper">'+
    '<div class="vdx__side jp">通関文牒</div><div class="vdx__main">'+
      '<div class="vdx__top"><div><div class="vdx__title">Văn điệp thông quan</div><div class="vdx__sub">'+esc(COURSE)+'</div></div>'+
      '<button class="vdx__nb" data-act="nb" aria-label="Mở Sổ tay" title="Sổ tay">'+icon('book',20)+'</button></div>'+
      '<div class="vdx__route"><div><small class="jp">しゅっぱつ</small><b>JPC</b></div><div class="vdx__line"><span class="mini" style="left:'+(6+pct*84)+'%">'+av('hau','cheer')+'</span></div><div style="text-align:right"><small class="jp">ふそう</small><b>Phù Tang</b></div></div>'+
      '<div class="vdx__f"><span>Người lữ hành</span><b>'+esc(S.name)+'</b></div>'+
      '<div class="vdx__f2"><div class="vdx__f"><span>Lớp</span><b>'+esc(S.cls)+'</b></div><div class="vdx__f"><span>Diện</span><b>'+esc(S.path||'Chưa rõ')+'</b></div></div>'+
      '<div class="vdx__st"><span>Lên đường '+fmtDate(S.created)+'</span><b>Con dấu '+nseal+'/7</b></div>'+
      '<div class="seals">'+seals+'</div>'+
      '<div class="vdx__cta">'+cta+'</div>'+
    '</div></div><div class="vdx__rod"></div></section>';
}
function nodeHTML(a, kind){
  var n=a.n, code, st, chip, meta='', act='', lock=false, dots='';
  {
    code = n===0 ? 'CHUẨN BỊ' : (n===8 ? 'ĐÍCH' : 'CỬA ẢI '+pad(n));
    var built = n===0 || BUILT[n];
    if(!built){ lock=true; chip='<span class="chip chip--lock">Sắp mở</span>'; }
    else if(!aiOpen(n)){ lock=true; chip='<span class="chip chip--lock">'+icon('lock',13)+' Chưa mở</span>'; }
    else {
      var acts=a.acts, dn=acts.filter(actDone).length;
      dots='<span class="dots">'+acts.map(function(x){ return '<i class="'+(actDone(x)?'on':'')+'"></i>'; }).join('')+'</span>';
      var mins=acts.reduce(function(s,x){ return s+ACTS[x].mins; },0);
      meta='<span>'+acts.length+' chặng · '+mins+' phút '+dots+'</span>';
      var full = n===0 ? startDone() : (aiDone(n) && S.seals[n]);
      chip = full ? '<span class="chip chip--ok">'+icon('check',13)+' Đã qua</span>' : (dn ? '<span class="chip chip--go">Đang đi</span>' : '<span class="chip chip--y">Mở cửa</span>');
      act='data-act="ai" data-n="'+n+'"';
    }
  }
  if(!meta) meta='<span>'+(n===8?'Vé hoàn thành và lời cam kết':'3 chặng')+'</span>';
  var tint=a.col, nxc=nextTarget(), isCur=!lock && ((n===0&&!startDone())||(nxc&&nxc.n===n&&startDone()));
  return '<button class="node'+(lock?' lock':'')+(isCur?' cur':'')+'" style="--nc:'+tint+';--nc2:'+shade(tint)+'" '+(lock?'data-act="locked" data-n="'+n+'"':act)+' data-node="'+n+'">'+
    '<span class="tile" style="background:linear-gradient(150deg,'+tint+','+shade(tint)+')">'+icon(a.ic,28)+'</span>'+
    '<span><span class="node__code" style="background:'+tint+'1F;color:'+shade(tint)+'">'+code+'</span><h3>'+esc(a.vn)+'</h3>'+
    '<span class="node__d" style="display:block">'+esc(a.d)+'</span><span class="node__m">'+meta+chip+'</span></span></button>';
}
function hcloud(){ return '<svg viewBox="0 0 120 50" aria-hidden="true"><path d="M14 42c-9 0-12-10-5-15 1-9 12-12 18-6 5-11 22-13 29-2 8-9 25-6 27 7 10-2 19 6 15 16z" fill="#fff"/><path d="M44 30q6-8 12 0q-5 4-9 1M78 30q6-7 12 0q-4 4-8 1" stroke="#C9D3FB" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'; }
function shade(hex){ var c=parseInt(hex.slice(1),16), r=(c>>16)&255, g=(c>>8)&255, b=c&255; var f=.72; return '#'+[r,g,b].map(function(x){ return pad2(Math.round(x*f).toString(16)); }).join(''); }
function pad2(s){ return s.length<2?'0'+s:s; }
function homeLine(){
  if(!anyDone(0)) return T('[Tên] ơi, đoàn lữ hành đang chờ ở điểm Lên đường. Mình đi thôi!');
  if(!startDone()) return T('Còn một chặng nữa ở điểm Lên đường là xong phần chuẩn bị đó [Tên]!');
  var nx=nextTarget();
  if(nx){ var a=aiOf(nx.n); if(aiDone(nx.n)) return T('Bạn đã xong cả 3 chặng của '+a.vn+'. Mở rương bí kíp để đóng dấu văn điệp nhé [Tên]!'); return T((anyDone(nx.n)?'Mình đang ở ':'Cửa ')+a.vn+(anyDone(nx.n)?'. Đi tiếp thôi [Tên]!':' mở rồi. Đi thôi [Tên]!')); }
  return T('[Tên] đã đến Phù Tang! Đi đến nơi, về đến chốn nhé. Vé hoàn thành ở ngay trên văn điệp.');
}
function vHome(){
  var h='<div class="wrap">'+vanDiep()+
    '<div class="pwa-install-inline"><button type="button" class="pwa-install-chip" data-pwa="install">'+icon('download',16)+'<span data-pwa-label>Cài ứng dụng</span></button><span>Mở nhanh từ màn hình chính</span></div>'+
    sayHTML('hau', startDone()?'cheer':'hi', homeLine())+
    '<div class="sec"><h2>Bản đồ du ký</h2><p>Từ Đất Việt vượt biển đến xứ Phù Tang. Mây mù sẽ tan dần trên hành trình bạn đi. Chạm vào một ải trên hành trình để bước vào.</p></div>'+
    mapHTML()+
    '<details class="maplist"><summary>'+icon('map',16)+' Xem dạng danh sách</summary><div class="map">'+nodeHTML(START)+AIS.map(function(a){ return nodeHTML(a); }).join('')+nodeHTML(FINAL)+'</div></details>'+
    foot()+'</div>';
  return h;
}
function afterHome(){
  var nx=nextTarget(); var cur = !startDone() ? '0' : (nx ? String(nx.n) : '');
  if(S.d.sealNew){ setTimeout(function(){ delete S.d.sealNew; save(); }, 1500); }
}

/* ---------- 4. Trang ải ---------- */
function vAi(n){
  var a=aiOf(n);
  if(!aiOpen(n) || !a.acts){ V={v:'home'}; return vHome(); }
  var acts=a.acts, dn=acts.filter(actDone).length, mins=acts.reduce(function(s,x){ return s+ACTS[x].mins; },0);
  var code = n===0 ? 'ĐIỂM XUẤT PHÁT' : (n===8 ? 'ĐIỂM ĐÍCH' : 'CỬA ẢI '+pad(n));
  var h='<div class="wrap">'+
    '<section class="aihero"><span class="hc hc1">'+hcloud()+'</span><span class="hc hc2">'+hcloud()+'</span>'+
      '<div class="aihero__row"><div class="kseal'+(a.k.length>1?' k2':'')+'" style="--ac:'+a.col+'"><span>'+a.k+'</span></div>'+
      '<div><div class="aihero__code">'+code+'</div><h1>'+esc(a.vn)+'</h1><div class="aihero__ro"><span class="jp">'+a.kana+'</span>'+esc(a.ro)+' '+spk(a.k)+'</div></div></div>'+
      '<div class="meter"><i style="width:'+Math.round(dn/acts.length*100)+'%"></i></div>'+
      '<div class="aihero__meta"><span>'+dn+'/'+acts.length+' chặng xong</span><span>'+mins+' phút</span></div>'+
    '</section>';
  S.d.aiv=S.d.aiv||{}; var vis=S.d.aiv[n]||0, mini = vis>=1 && S.d.dlgOpen!==n;
  var beat=acts.every(actDone), bm=beat?(a.boss==='yeu'?'deflated':'angry'):'sly';
  if(mini){
    h+='<button class="dlg__mini" data-act="dlgOpen" data-n="'+n+'"><span class="dlg__av">'+(a.boss?av(a.boss,bm):av('hau','hi'))+'</span><span>'+(a.boss?'<b>'+esc(CHAR[a.boss].n)+'</b> '+(beat?'đã bị đánh bại':'đang chờ'):'<b>Ngộ Không</b> có lời nhắn')+' · Xem lời thoại</span>'+icon('next',16)+'</button>';
  } else {
    h+='<div class="dlg'+(beat?' beat':'')+'">'+
      (a.bossLine?'<div class="dlg__r foe"><span class="dlg__av">'+av(a.boss,bm)+'</span><div class="dlg__b"><small>'+(beat?'Đã bị đánh bại!':'Yêu quái của ải')+'</small><b class="dlg__n">'+esc(CHAR[a.boss].n)+'</b><p>'+esc(a.bossLine)+'</p></div></div>':'')+
      '<div class="dlg__r hau"><div class="dlg__b"><b class="dlg__n">Ngộ Không</b><p>'+T(a.intro||'')+'</p></div><span class="dlg__av">'+av('hau', dn===acts.length?'cheer':'hi')+'</span></div></div>';
  }
  if(!S.d._aivMark || S.d._aivMark!==n){ S.d.aiv[n]=vis+1; S.d._aivMark=n; save(); }
  h+='<div class="steps">';
  if(a.warm){
    var w=ACTS[a.warm], wd=actDone(a.warm);
    h+='<button class="stp warm'+(wd?' done':'')+'" data-act="open" data-id="'+a.warm+'"><span class="stp__n">'+(wd?icon('check',20):icon('flame',20))+'</span><span><b>'+esc(w.t)+'</b><small>'+esc(w.d)+' · không bắt buộc</small></span>'+(wd?'<span class="chip chip--ok">Xong</span>':'')+'</button>';
  }
  var nextId=acts.filter(function(id){ return actOpen(id)&&!actDone(id); })[0];
  acts.forEach(function(id,i){
    var x=ACTS[id], op=actOpen(id), d=actDone(id), nx=id===nextId;
    h+='<button class="stp'+(d?' done':'')+(op?'':' lock')+(nx?' next':'')+'" '+(op?'data-act="open" data-id="'+id+'"':'data-act="lockedAct"')+'>'+
      '<span class="stp__n">'+(d?icon('check',20):(op?(i+1):icon('lock',18)))+'</span>'+
      '<span><b>Chặng '+(i+1)+(op?' · '+esc(x.t):' · ???')+'</b><small>'+(op?esc(x.d)+' · '+x.mins+' phút':'Xong chặng '+i+' để mở')+'</small></span>'+
      (d?'<span class="chip chip--ok">Xong</span>':(nx?'<span class="chip chip--nx">Tiếp theo '+icon('next',13)+'</span>':(op?'<span class="chip chip--go">'+icon('next',13)+'</span>':'')))+'</button>';
  });
  if(a.kinh){
    var all=acts.every(actDone), got=!!S.seals[n];
    h+='<button class="stp chest'+(all?'':' lock')+'" data-act="'+(all?'chest':'lockedAct')+'" data-n="'+n+'"><span class="stp__n">'+icon('scroll',20)+'</span>'+
      '<span><b>'+(got?'Đã nhận: '+esc(a.badge.n):(all?(n===8?'Nhận vé hoàn thành!':'Mở rương bí kíp!'):(n===8?'Vé hoàn thành':'Rương bí kíp của ải')))+'</b><small>'+(got?esc(a.badge.d):(all?(n===8?'Nhận bí kíp trọn bộ và vé hoàn thành':'Nhận bí kíp, huy hiệu và đóng dấu văn điệp'):'Xong 3 chặng để mở'))+'</small></span>'+(all&&!got?'<span class="chip chip--y">Mới</span>':'')+'</button>';
  }
  h+='</div>';
  if(n===8) h+=todoHTML();
  var nxa=nextTarget();
  if(n===0 && startDone() && nxa) h+='<div style="margin-top:16px"><button class="btn btn--full invite" data-act="ai" data-n="'+nxa.n+'">'+esc(nxa.label)+'</button></div>';
  h+=foot()+'</div>';
  return h;
}

/* ---------- 5. Trang chặng ---------- */
function stOf(id){ var k='st.'+id; if(!S.d[k]) S.d[k]={i:0,max:0}; return S.d[k]; }
function xs(id,i){ var k='x.'+id+'.'+i; if(!S.d[k]) S.d[k]={}; return S.d[k]; }
function vAct(id){
  var a=ACTS[id]; if(!a || !actOpen(id)){ V={v:'home'}; return vHome(); }
  var ai=aiOf(a.ai), st=stOf(id), idx=ai.acts.indexOf(id);
  var lbl = a.warm ? (a.ai?'CỬA ẢI '+pad(a.ai)+' · ':'')+'KHỞI ĐỘNG' : (a.ai===0?'CHUẨN BỊ':(a.ai===8?'PHÙ TANG':'CỬA ẢI '+pad(a.ai)))+' · CHẶNG '+(idx+1);
  var prog=a.steps.map(function(s,i){ return '<i class="'+(i<st.i?'on':(i===st.i?'cur':''))+'"></i>'; }).join('');
  return '<div class="wrap">'+
    '<header class="acthead"><small>'+lbl+'</small><h1>'+esc(a.t)+'</h1>'+(a.steps.length>1?'<div class="prog" aria-label="Bước '+(st.i+1)+' trên '+a.steps.length+'">'+prog+'</div>':'')+'</header>'+
    (actDone(id)?'<div class="redo"><span>'+icon('check',16,3)+' Bạn đã hoàn thành chặng này.</span><button class="btn btn--sm btn--soft" data-act="redoAsk" data-id="'+id+'">'+icon('redo',15)+' Làm lại để ôn</button></div>':'')+
    '<div class="stepbox" id="stepbox"></div>'+
    '<div class="sbar" id="sbar"></div>'+
    (st.i>0?'<div style="text-align:center;margin-top:10px"><button class="btn btn--link" data-act="prevStep">Xem lại bước trước</button></div>':'')+
    foot()+'</div>';
}
var CUR=null;   /* {id, i, kind} */
function wireAct(){
  var a=ACTS[V.id]; if(!a) return;
  var st=stOf(V.id);
  CUR={id:V.id, i:st.i, s:a.steps[st.i]};
  drawStep();
  if(!S.d.tip1){ S.d.tip1=1; save(); setTimeout(function(){ toast('Mẹo: chạm vào dòng trạng thái ở cuối trang để đến ngay phần còn thiếu.', 6000); }, 900); }
}
function drawStep(){
  var r=STEP[CUR.s.k].view(CUR.s, xs(CUR.id,CUR.i));
  $('#stepbox').innerHTML=r;
  if(STEP[CUR.s.k].wire) STEP[CUR.s.k].wire(CUR.s, xs(CUR.id,CUR.i));
  drawBar();
}
function drawBar(){
  var a=ACTS[CUR.id], last=CUR.i===a.steps.length-1, x=xs(CUR.id,CUR.i);
  var r=STEP[CUR.s.k].state(CUR.s, x);
  var lbl = last ? 'Hoàn thành' : 'Tiếp tục';
  $('#sbar').innerHTML='<button class="sbar__s '+(r.ok?'ready':'need')+'" data-act="need" data-q="'+esc(r.q||'')+'">'+(r.ok?(last?'Sẵn sàng hoàn thành':'Sẵn sàng'):esc(r.msg||'Chưa xong'))+'</button>'+
    '<button class="btn" data-act="nextStep" '+(r.ok?'':'disabled')+'>'+lbl+'</button>';
}
function nextStep(){
  var a=ACTS[CUR.id], st=stOf(CUR.id);
  var r=STEP[CUR.s.k].state(CUR.s, xs(CUR.id,CUR.i)); if(!r.ok) return;
  addXP('step.'+CUR.id+'.'+CUR.i, CUR.s.k==='say'?2:5, true);
  if(CUR.i < a.steps.length-1){
    st.i++; st.max=Math.max(st.max,st.i); save();
    V.scroll=0; render(true);
  } else finishAct();
}
function prevStep(){ var st=stOf(CUR.id); if(st.i>0){ st.i--; save(); V.scroll=0; render(true); } }
function finishAct(){
  var id=CUR.id, a=ACTS[id], first=!S.done[id];
  if(first){ S.done[id]=Date.now(); }
  var gx=addXP('done.'+id, a.warm?10:20, true);
  save(true);
  stampFx(a.warm?'早':'済'); sfx('stamp');
  var ai=aiOf(a.ai);
  var msg = a.warm ? 'Khởi động xong!' : 'Xong chặng!';
  setTimeout(function(){
    go('ai',{n:a.ai});
    var tot=0; for(var k in S.xp){ if(k.split('.')[1]===id) tot+=S.xp[k]; }
    if(first) pointToast(tot,0,msg); else toast('Ôn xong chặng này! Kết quả lần đầu vẫn được giữ.',4000); 
    var nx=null; (ai.acts||[]).forEach(function(x){ if(!nx && x!==id && !actDone(x) && actOpen(x) && !ACTS[x].warm) nx=x; });
    if(nx) setTimeout(function(){ if(V.v==='ai' && !nbOpen && !askOpen) endNav(ai, nx); }, first?900:300); /* PS1.3.55 (ý 25): Tiếp theo + Về ải */
    if(first && !a.warm && ai.acts.every(actDone) && ai.kinh && a.ai>=1 && a.ai<=7) setTimeout(function(){ if(!S.seals[a.ai] && V.v==='ai') victory(a.ai); }, 1400);
    if(first && a.ai===8 && ai.acts.every(actDone)) setTimeout(function(){ if(!S.seals[8] && V.v==='ai') toast('Bạn đã đi hết hành trình. Chạm "Nhận vé hoàn thành" để mở trang bí kíp cuối cùng.',6000); }, 1400);
    if(first && a.ai===0 && startDone()) setTimeout(function(){ if(V.v==='ai') toast('Xong phần Lên đường! Ải 1 · Cổng Làng đã mở cửa.'); }, 4300);
  }, noMotion()?50:950);
}
function endNav(ai, nx){
  PS.dialog({ title:'Chặng tiếp theo', html:'<p><b>'+esc(ACTS[nx].t)+'</b></p>', buttons:[
    {t:'Tiếp theo '+icon('next',16), cls:'ps-btn--go', fn:function(){ setTimeout(function(){ go('act',{id:nx}); },0); return true; }},
    {t:'Về '+esc(ai.vn), cls:'ps-btn--soft'}] });
}
function stampFx(k){
  if(noMotion()) return;
  var d=document.createElement('div'); d.className='stampov'; d.innerHTML='<div>'+sealSVG(k,150)+'</div>';
  document.body.appendChild(d); setTimeout(function(){ d.remove(); }, 1500);
}
function gotoNeed(q){
  var el = q ? $(q) : null; if(!el) el=$('#stepbox');
  el.scrollIntoView({behavior:noMotion()?'auto':'smooth', block:'center'});
  el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
}

