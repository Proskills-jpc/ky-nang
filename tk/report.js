/* TK · Nhật Bản Du Ký · tk/report.js · HỎI NHANH · DEMO GIÁO VIÊN · BÁO CÁO THẦY CÔ · PDF
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* =========================================================
   PHẦN 5c · HỎI NHANH · DEMO · BÁO CÁO · PDF · AI · HƯỚNG DẪN · NHẮC HỌC
   ========================================================= */

/* ---------- Hỏi nhanh Chú Tanaka ---------- */
var askOpen=false, askCh=null, askQ='';
function openAsk(ch){
  if(nbOpen) closeNb(true);
  askCh=ch||null; askQ='';
  if(!askOpen){ askOpen=true;
    sheetBack('askClose'); var el=document.createElement('div'); el.className='nb'; el.id='ask'; el.setAttribute('role','dialog'); el.setAttribute('aria-label','Hỏi nhanh Chú Tanaka'); document.body.appendChild(el); document.body.style.overflow='hidden'; sheetDrag(el,function(){ closeAsk(); }); }
  drawAsk(); updateNav();
}
function closeAsk(fromPop){ var el=$('#ask'); if(el) el.remove(); $$('.sheetback').forEach(function(b){ b.remove(); }); askOpen=false; document.body.style.overflow=''; updateNav(); }
function qaHit(q,s){ var n=norm(q.q+' '+q.a); return norm(s).length<2 || s.split(/\s+/).every(function(w){ return n.indexOf(norm(w))>=0; }); }
function drawAsk(){
  var h='<div class="nb__in"><div class="grab"></div><div class="nb__top"><div style="display:flex;gap:10px;align-items:center"><div style="width:48px">'+av('tan','')+'</div><div><h2 style="font-size:20px">Hỏi nhanh Chú Tanaka</h2><p class="small muted" style="margin:0">'+QA.length+' câu hỏi học viên hay hỏi nhất</p></div></div><button class="nb__x" data-act="askClose" aria-label="Đóng">'+icon('close',20)+'</button></div>'+
    '<div class="qsearch">'+icon('search',18)+'<input class="inp" id="askIn" placeholder="Gõ để tìm, ví dụ: xe đạp, thẻ cư trú, Nenkin" value="'+esc(askQ)+'" autocomplete="off"></div><div id="askBody"></div></div>';
  $('#ask').innerHTML=h; drawAskBody();
  var inp=$('#askIn'); inp.addEventListener('input',function(){ askQ=inp.value; drawAskBody(); });
}
function qaItem(q){
  var a=aiOf(q.ai), open=aiOpen(q.ai);
  return '<details class="qa"><summary><span>'+esc(q.q)+'</span>'+icon('next',16)+'</summary><div class="qa__a"><p>'+esc(q.a)+'</p>'+
    (q.s?'<div class="src">'+icon('scroll',15)+'<span>Căn cứ: '+esc(q.s)+'</span></div>':'')+
    (open?'<button class="chip chip--go" data-act="askGo" data-n="'+q.ai+'">Xem lại ở '+esc(a.vn)+' '+icon('next',12)+'</button>':'<span class="chip chip--lock">'+icon('lock',12)+' Học ở '+esc(a.vn)+'</span>')+'</div></details>';
}
function drawAskBody(){
  var b=$('#askBody'), h='';
  if(askQ.trim().length>=2){
    var hits=QA.filter(function(q){ return qaHit(q,askQ); });
    h='<p class="small muted">'+hits.length+' kết quả cho "'+esc(askQ)+'"</p>'+(hits.length?hits.map(qaItem).join(''):'<div class="card empty">Chưa có câu này. Hỏi người hướng dẫn, Hiệp hội hoặc Esuhai nhé.</div>');
  } else if(askCh){
    var ch=QA_CH.filter(function(c){ return c.k===askCh; })[0];
    h='<button class="back" data-act="askCh" data-k="">'+icon('back',18)+' Tất cả chủ đề</button><h3 style="margin:0 0 10px">'+esc(ch.t)+'</h3>'+QA.filter(function(q){ return q.c===askCh; }).map(qaItem).join('');
  } else {
    h='<div class="qch">'+QA_CH.map(function(c){ var n=QA.filter(function(q){ return q.c===c.k; }).length; return '<button class="qch__i" data-act="askCh" data-k="'+c.k+'"><span class="ic">'+icon(c.ic,22)+'</span><b>'+esc(c.t)+'</b><small>'+n+' câu hỏi</small></button>'; }).join('')+'</div>'+
      '<div class="note" style="margin-top:14px"><b>Khẩn cấp:</b> cảnh sát 110 · cấp cứu, cứu hỏa 119 · OTIT tiếng Việt 0120-250-168</div>';
  }
  b.innerHTML=h;
}

/* ---------- Bản demo cho giáo viên ---------- */
function solveStep(id,i,s){
  var x={};
  switch(s.k){
    case 'cast': x={cur:4,max:4}; break;
    case 'classify': x.a={}; s.items.forEach(function(it,k){ x.a[k]={ok:1,bad:[]}; }); break;
    case 'tf': x.a={}; s.items.forEach(function(it,k){ x.a[k]=it.a; }); break;
    case 'branch': var r=s.opts.findIndex(function(o){ return o.ok; }); x={pick:r,solved:1,tried:(i%2?[ (r+1)%3 ]:[]),fixSeen:1}; break;
    case 'flags': x.f=[]; s.segs.forEach(function(g,k){ if(g.f) x.f.push(k); }); x.c=[]; break;
    case 'swipe': x={q:[],ok:s.cards.map(function(c,k){ return k; }),shown:null}; break;
    case 'sits': x.r={}; s.sits.forEach(function(st,k){ x.r[k]={sel:st.must.length?st.must.slice():[st.good[0]],ok:1}; }); break;
    case 'order': x={mix:s.items.map(function(t,k){ return k; }).reverse(),seq:s.items.map(function(t,k){ return k; })}; break;
    case 'rcard': x.seen=RC_FIELDS.map(function(f){ return f.k; }); break;
    case 'explore': x.seen=s.items.filter(function(it){ return !it.sub; }).map(function(it){ return it.k; }); break;
    case 'street': x={done:{},bad:{},cur:s.spots[s.spots.length-1].k}; s.spots.forEach(function(p){ x.done[p.k]=1; }); break;
    case 'tikme': x.a={}; s.qs.forEach(function(q,k){ x.a[k]={ok:1,bad:[]}; }); S.d.tik=S.d.tik||{}; S.d.tik[s.url]={o:Date.now()-86400000}; break;
    case 'video': x={seg:s.segs.length-1,w:{},a:{}}; s.segs.forEach(function(g,k){ x.w[k]=1; x.a[k]={ok:1,bad:k===1?[1]:[]}; }); break;
    case 'calc': x={m:6,slid:1,q:{ok:1,bad:[]}}; break;
    case 'check': x={c:[0],seen:1,luat:'Chỉ chơi sau khi học xong, tắt máy trước 23 giờ, không nạp quá 1.000 yên mỗi tháng.'}; break;
    case 'sos': x={saved:1}; break;
    case 'goal': break;
    case 'cost': x={l:14,m:12,y:3,q:{ok:1,bad:[]}}; break;
    case 'vehicles': x.a={0:{ok:1},1:{ok:1},2:{ok:1},3:{ok:1}}; break;
    case 'signs': x.a={}; s.items.forEach(function(it,k){ x.a[k]={ok:1,bad:[]}; }); break;
    case 'scene': x.seen=s.spots.map(function(p){ return p.k; }); break;
    case 'write': s.fields.concat(s.opt?[s.opt]:[]).forEach(function(f){ x[f.key]=DEMO_TXT[f.key]||'Em sẽ hỏi người hướng dẫn trước, làm đúng quy định và báo cáo sớm khi có chuyện.'; }); break;
  }
  return x;
}
var DEMO_TXT={
  bua:'Em từ chối ngay, không đưa gì đứng tên mình, và nhắn cho người hướng dẫn ở công ty biết.',
  tuchoi:'Tớ quý cậu lắm, nhưng thứ gì đứng tên tớ thì tớ không đưa ai được. Mình cùng hỏi chị Hiệp hội xem có cách nào khác giúp cậu nhé.',
  cong:'Em không đóng đồng nào, báo thầy cô và tự kiểm tra giấy phép doanh nghiệp trên trang DOLAB.',
  bome:'Con biết chú muốn giúp, nhưng con chỉ đóng tiền cho công ty có giấy phép, có hợp đồng và phiếu thu thôi ạ.',
  bua2:'Em kiểm tra ví nhỏ có đủ thẻ cư trú, thẻ bảo hiểm và thẻ ngân hàng.',
  tiktok:'Em sẽ chia sẻ món ăn tự nấu và cảnh mùa thu gần KTX, không quay trong xưởng, không bật kiếm tiền.',
  phong:'Chia lịch dọn dẹp mỗi tuần, giữ yên lặng sau 22 giờ, ai dùng đồ của người khác phải hỏi trước.',
  mauthuan:'Mình nói chuyện một chút được không? Mình hơi khó chịu khi đồ bị dời chỗ. Cậu thấy mình nên làm thế nào?',
  xuong:'Em ghi lại sự việc, hỏi người hướng dẫn trước, nếu đúng là vi phạm thì báo Hiệp hội hoặc Esuhai.',
  bannat:'Em hỏi chuyện bạn, đi cùng bạn đến gặp người hướng dẫn, không nói là mình không biết.',
  pho:'Em không cười theo, kéo bạn ra và nhắc nhẹ là người ta không vui đâu.',
  pho2:'Ở Việt Nam em hay đi xe trên vỉa hè. Sang Nhật em sẽ đi dưới lòng đường bên trái và không đeo tai nghe.',
  gianhu:'Giá như lúc đó Minh nghe lời Thảo, đi cùng bạn đến gặp thầy cô ngay hôm đó.',
  gianhu2:'Em sẽ không bao giờ phải nói "giá như mình đã từ chối ván bài đầu tiên".',
  kinh:'Không bao giờ cho mượn thẻ, tài khoản, điện thoại. Nghi ngờ thì hỏi người hướng dẫn trước. Đi đến nơi, về đến chốn để bố mẹ yên lòng.',
  tang:'Tặng mẹ, vì mẹ đã vay tiền cho em đi học mà chưa từng than một câu.'
};
function buildDemo(){
  var s=blank(); s.demo=1; s.prof={name:'Nguyễn Văn An', by:String(new Date().getFullYear()-20), cls:'E696', path:'Ikusei Shuro', teacher:(TEACHERS[0]||[])[1]||''}; s.onb=1; s.gate=1;
  s.created=Date.now()-20*86400000;
  S=s;
  var t=s.created;
  Object.keys(ACTS).forEach(function(id){
    var a=ACTS[id]; s.d['st.'+id]={i:a.steps.length-1,max:a.steps.length-1};
    a.steps.forEach(function(st,i){ s.d['x.'+id+'.'+i]=solveStep(id,i,st); s.xp['step.'+id+'.'+i]=5; });
    t+=40*60000; s.done[id]=t; s.xp['done.'+id]=a.warm?10:20;
  });
  [1,2,3,4,5,6,7].forEach(function(n,k){ s.seals[n]=s.created+(k+1)*2*86400000; s.xp['chest.'+n]=50; });
  s.seals[8]=Date.now()-3600000; s.xp['chest.8']=100;
  s.ins={'w.a63.tuchoi':5,'w.a43.bannat':5,'w.f3.tang':5};
  for(var k=0;k<7;k++){ var d=new Date(); d.setDate(d.getDate()-k); s.days[dkey(d)]=[18,25,12,30,22,15,20][k]; }
  s.d.sos={hd:'Chị Tanaka 090-1234-5678',hh:'Hiệp hội Aichi 052-000-0000',es:'Esuhai Japan'};
  s.d.tour=1; s.d.tip1=1; s.d.horen=1; s.goal={k:'nha',t:'Để dành 500 triệu xây lại nhà cho bố mẹ, và lên Kỹ năng đặc định.'};
  return s;
}
function enterDemo(){
  NOSAVE=0; if(!S.demo && S.gate) save(true);          /* giữ bài thật ở ps.mod.tk */
  S=buildDemo(); DEMO_ON=true; save(true); V={v:'home'}; render(true);
  toast('Đã mở bản demo cho giáo viên: một học viên giả định đã hoàn thành khóa.',5000);
}
function exitDemo(){ NOSAVE=1; try{ localStorage.removeItem(DEMO_KEY); }catch(e){} location.replace(location.pathname); }
function demoBar(){
  var b=$('#demoBar');
  if(S.demo){ if(!b){ b=document.createElement('div'); b.id='demoBar'; b.className='demobar noprint'; b.innerHTML='<span>Demo giáo viên</span><button data-act="demoExit">Thoát demo</button>'; document.body.appendChild(b); } }
  else if(b) b.remove();
}

/* ---------- Hō-Ren-Sō giữa đường + báo cáo thầy cô ---------- */
/* Thầy cô: danh sách chung ở config.js; hồ sơ lưu theo email (PS.profile().teacher) */
var TEACHERS=PS.teachers();
function teacherEmail(){ return String((S.demo ? (S.prof||{}).teacher : PS.profile().teacher) || '').toLowerCase(); }
function teacher(){ var e=teacherEmail(); if(!e) return null; for(var i=0;i<TEACHERS.length;i++){ if(String(TEACHERS[i][1]).toLowerCase()===e) return TEACHERS[i]; } return null; }
function tName(){ var t=teacher(); return t ? t[0] : 'thầy cô'; }
function tPron(){ var t=teacher(); return t ? (t[0].indexOf('Thầy')===0?'thầy':'cô') : 'thầy cô'; }
function teacherSelect(id){ var e=teacherEmail(); return '<select class="inp" id="'+id+'"><option value="">Chọn thầy cô hướng dẫn lớp bạn</option>'+TEACHERS.map(function(x){ return '<option value="'+esc(x[1])+'"'+(String(x[1]).toLowerCase()===e?' selected':'')+'>'+esc(x[0])+'</option>'; }).join('')+'</select>'; }
function setTeacher(v){ if(v===''||v==null) return; if(S.demo){ S.prof=S.prof||{}; S.prof.teacher=v; save(true); } else PS.setProfile({teacher:v}); }
function passedList(){ return AIS.filter(function(a){ return S.seals[a.n]; }); }
function reportMsg(withPdf){
  var p=passedList(), pr=tPron();
  return 'Em chào '+tName()+'. Em là '+S.name+', lớp '+S.cls+'.\n'+
    'Em báo cáo tiến độ '+COURSE+' (Nhật Bản Du Ký): em đã qua '+p.length+'/7 cửa ải'+(p.length?' ('+p.map(function(a){ return a.vn.replace('Ải ',''); }).join(', ')+')':'')+', hoàn thành '+doneCount()+'/'+TOTAL_ACTS+' chặng.'+
    (S.seals[8]?' Em đã đến xứ Phù Tang và hoàn thành khóa học.':'')+
    '\nEm gửi kèm ảnh văn điệp'+(withPdf?' và file PDF bài làm':'')+' để '+pr+' theo dõi kết quả của em.'+
    '\nEm cảm ơn '+pr+' ạ!';
}
function copyText(t, ok){
  var done=function(){ toast(ok||'Đã sao chép.',5000); };
  if(navigator.clipboard && window.isSecureContext){ navigator.clipboard.writeText(t).then(done,function(){ fallbackCopy(t); done(); }); }
  else { fallbackCopy(t); done(); }
}
function fallbackCopy(t){ var a=document.createElement('textarea'); a.value=t; a.style.position='fixed'; a.style.opacity='0'; document.body.appendChild(a); a.select(); try{ document.execCommand('copy'); }catch(e){} a.remove(); }
function teamsURL(email,msg){ return 'https://teams.microsoft.com/l/chat/0/0?users='+encodeURIComponent(email)+'&message='+encodeURIComponent(msg); }
var RPT={pdf:false,mid:false,done:{}};
function openReport(withPdf, mid){
  RPT={pdf:!!withPdf,mid:!!mid,done:{}};
  $$('.ov').forEach(function(o){ o.remove(); });
  var ov=document.createElement('div'); ov.className='ov'; ov.id='rptOv'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true');
  document.body.appendChild(ov); drawReport();
}
function drawReport(){
  var ov=$('#rptOv'); if(!ov) return; var t=teacher();
  var head = RPT.mid ?
    '<div style="display:flex;gap:10px;align-items:center"><div style="width:56px;flex:none">'+av('hau','cheer')+'</div><h2 style="font-size:21px;margin:0">Đi được nửa đường rồi!</h2></div>'+
    '<p style="margin:10px 0 6px">'+T('[Tên] đã qua 3 cửa ải.')+' Ở Nhật, người ta làm việc theo Hō-Ren-Sō: <b>Báo cáo</b> (Hōkoku), <b>Liên lạc</b> (Renraku), <b>Thảo luận</b> (Sōdan). Mình tập ngay bây giờ: báo cáo tiến độ cho thầy cô nhé.</p>'
    : '<h2 style="font-size:21px">Báo cáo thầy cô</h2><p class="small" style="color:var(--ink-2)">Làm lần lượt từng bước. Khóa học không tự gửi được: bạn đính kèm tập tin rồi bấm gửi trong Teams.</p>';
  var step=function(n,k,lbl,act,dis){ var ok=RPT.done[k]; return '<div class="rstep'+(ok?' ok':'')+'"><i>'+(ok?icon('check',14,3):n)+'</i><span>'+lbl+'</span><button class="btn btn--sm'+(ok?' btn--soft':'')+'" data-act="'+act+'" '+(dis?'disabled':'')+'>'+(ok?'Làm lại':'Làm')+'</button></div>'; };
  var n=1, h='<div class="ov__box" style="text-align:left">'+head+
    '<div class="form" style="margin:8px 0 10px"><label>Thầy cô hướng dẫn lớp bạn'+teacherSelect('rptT')+'</label></div>'+
    (t?sayHTML('hau','hi',esc(t[2])):'')+
    '<div class="rsteps">'+
      (RPT.pdf?step(n++,'pdf','Tải file PDF bài làm','rptPdf',false):'')+
      step(n++,'vd','Tải ảnh văn điệp của bạn','rptVd',false)+
      step(n++,'tm','Mở Teams với tin nhắn soạn sẵn, đính kèm '+(RPT.pdf?'PDF và ':'')+'ảnh văn điệp rồi gửi','rptTeams',!t)+
    '</div>'+
    '<p class="small muted" style="margin:8px 0 0">Nếu Teams chưa điền sẵn tin nhắn, bạn chỉ cần dán: tin nhắn đã được chép sẵn.</p>'+
    '<div class="btnrow" style="justify-content:flex-end"><button class="btn btn--link" data-act="rptClose">'+(RPT.done.tm?'Xong':'Để sau')+'</button></div></div>';
  ov.innerHTML=h;
  var sel=$('#rptT'); if(sel) sel.addEventListener('change',function(){ setTeacher(sel.value); drawReport(); });
}
function rptTeams(){
  var t=teacher(); if(!t){ toast('Bạn chọn thầy cô trước nhé.'); return; }
  var msg=reportMsg(RPT.pdf); fallbackCopy(msg);
  RPT.done.tm=1; if(RPT.mid) S.d.horen=1; save(true); drawReport();
  window.open(teamsURL(t[1],msg),'_blank');
}
function openHoren(){ openReport(false,true); }
function vdPNG(){
  var seals=AIS.map(function(a){ return [a, !!S.seals[a.n]]; });
  drawPNG(900,620,function(g,W,H){
    var gr=g.createLinearGradient(0,0,W,H); gr.addColorStop(0,'#3653E6'); gr.addColorStop(1,'#1F309A'); g.fillStyle=gr; g.fillRect(0,0,W,430);
    g.fillStyle='#F4B63B'; g.font='700 30px "Be Vietnam Pro",sans-serif'; g.fillText('Văn điệp thông quan',50,72);
    g.fillStyle='rgba(255,255,255,.75)'; g.font='500 20px "M PLUS Rounded 1c","Be Vietnam Pro",sans-serif'; g.fillText('通関文牒 · '+COURSE,50,104);
    g.fillStyle='#fff'; g.font='800 46px "Be Vietnam Pro",sans-serif'; g.fillText('JPC',50,180); g.textAlign='right'; g.fillText('Phù Tang',W-50,180); g.textAlign='left';
    g.setLineDash([10,10]); g.strokeStyle='#F4B63B'; g.lineWidth=3; g.beginPath(); g.moveTo(170,166); g.lineTo(W-290,166); g.stroke(); g.setLineDash([]);
    g.fillStyle='rgba(255,255,255,.72)'; g.font='500 20px "Be Vietnam Pro",sans-serif'; g.fillText('Người lữ hành',50,240); g.fillText('Lớp · Diện',520,240);
    g.fillStyle='#fff'; g.font='700 30px "Be Vietnam Pro",sans-serif'; g.fillText(String(S.name),50,280); g.fillText(S.cls+' · '+S.path,520,280);
    g.fillStyle='rgba(255,255,255,.72)'; g.font='500 20px "Be Vietnam Pro",sans-serif'; g.fillText('Lên đường '+fmtDate(S.created)+'   ·   '+passedList().length+'/7 cửa ải   ·   '+doneCount()+'/'+TOTAL_ACTS+' chặng',50,350);
    g.fillStyle='#FFF7E3'; g.fillRect(0,430,W,H-430);
    seals.forEach(function(s,i){ var cx=95+i*118, cy=525; g.save(); g.translate(cx,cy);
      if(s[1]){ g.rotate(-0.14); g.strokeStyle='#C8372D'; g.lineWidth=5; g.beginPath(); g.arc(0,0,46,0,Math.PI*2); g.stroke(); g.lineWidth=2; g.beginPath(); g.arc(0,0,37,0,Math.PI*2); g.stroke(); g.fillStyle='#C8372D'; g.font='800 40px "M PLUS Rounded 1c","Hiragino Sans",sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s[0].badge.k,0,2); }
      else { g.setLineDash([6,6]); g.strokeStyle='#E1C27A'; g.lineWidth=2; g.beginPath(); g.arc(0,0,44,0,Math.PI*2); g.stroke(); g.setLineDash([]); g.fillStyle='#B99545'; g.font='600 24px "Be Vietnam Pro",sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(String(s[0].n),0,2); }
      g.restore(); });
  }, 'Van-diep_'+norm(S.name)+'.png');
}

/* ---------- Bản ghi chép (để in và xuất PDF) ---------- */
function repSection(a){
  if(!a.acts || !a.acts.some(actDone)) return '';
  var h='<section class="rsec"><div class="rsec__h"><span class="kseal'+(a.k.length>1?' k2':'')+'" style="width:44px;height:44px;border-radius:12px;box-shadow:none"><span style="font-size:'+(a.k.length>1?14:20)+'px">'+a.k+'</span></span><div><small>'+(a.n===8?'ĐIỂM ĐÍCH':'CỬA ẢI '+pad(a.n))+'</small><b>'+esc(a.vn)+'</b></div>'+(S.seals[a.n]?'<span class="rsec__seal">'+sealSVG(a.badge.k,40)+'</span>':'')+'</div>';
  var choices=[], writes=[];
  a.acts.forEach(function(id){ ACTS[id].steps.forEach(function(s,i){
    var x=S.d['x.'+id+'.'+i], fx=firstX(id,i); if(!x && !fx) return; x=x||{}; fx=fx||{};
    if(s.k==='branch' && fx.solved) choices.push([s.title, (fx.tried||[]).length]);
    if(s.k==='video' && fx.a) s.segs.forEach(function(g,k){ if(g.q && fx.a[k] && fx.a[k].ok) choices.push([g.lbl,(fx.a[k].bad||[]).length]); });
    if(s.k==='write') s.fields.concat(s.opt?[s.opt]:[]).forEach(function(f){ if(x[f.key]) writes.push([f.label,x[f.key]]); });
    if(s.k==='check' && x.luat) writes.push(['Luật chơi game của tôi',x.luat]);
  }); });
  if(choices.length) h+='<div class="rsec__t">Ngã rẽ</div><ul class="rsec__l">'+choices.map(function(c){ return '<li><span>'+esc(c[0])+'</span><b class="'+(c[1]?'re':'ok')+'">'+(c[1]?'Chọn lại '+c[1]+' lần':'Đúng ngay')+'</b></li>'; }).join('')+'</ul>';
  if(writes.length) h+='<div class="rsec__t">Lời của bạn</div>'+writes.map(function(w){ return '<div class="rsec__w"><small>'+esc(w[0])+'</small><p>'+esc(w[1])+'</p></div>'; }).join('');
  if(a.kinh && S.seals[a.n]) h+='<div class="rsec__t">'+esc(a.kinh.t)+'</div><ul class="rsec__k">'+a.kinh.p.map(function(p){ return '<li>'+esc(p)+'</li>'; }).join('')+'</ul>';
  return h+'</section>';
}
function vRep(){
  var h='<div class="wrap rep" id="report">'+
    (goalText()?'':'')+'<div class="noprint repbar"><button class="btn" data-act="pdf">'+icon('download',18)+' Tải PDF</button><button class="btn btn--soft" data-act="rptOpen">Tải PDF và báo cáo thầy cô</button>'+(S.seals[8]?'<button class="btn btn--soft" data-act="brag">Ảnh khoe vé</button>':'')+'<button class="btn btn--link" data-act="printA4">In khổ A4 bằng trình duyệt</button></div>'+
    '<section class="rsec rsec--top"><small>BẢN GHI CHÉP · '+esc(COURSE)+'</small><h1 style="font-size:28px;margin:4px 0 10px">Nhật Bản Du Ký</h1>'+
    '<div class="rgrid"><div><small>Học viên</small><b>'+esc(S.name)+'</b></div><div><small>Lớp · Diện</small><b>'+esc(S.cls)+' · '+esc(S.path)+'</b></div><div><small>Thầy cô hướng dẫn</small><b>'+esc(teacher()?tName():'Chưa điền')+'</b></div><div><small>Lên đường</small><b>'+fmtDate(S.created)+'</b></div></div>'+
    (goalText()?'<div class="rgoal"><small>Mục tiêu của tôi</small><p>'+esc(goalText())+'</p></div>':'')+'<div class="tiles rtiles" style="margin-top:12px"><div class="tl dau"><small>Con dấu</small><b>'+doneCount()+'<span style="font-size:14px;color:var(--muted)">/'+TOTAL_ACTS+'</span></b></div><div class="tl xp"><small>XP</small><b>'+xpTotal()+'</b></div><div class="tl ins"><small>Insight</small><b>'+insTotal()+'</b></div><div class="tl fire"><small>Chuỗi ngày</small><b>'+streak()+'</b></div></div></section>'+
    AIS.map(repSection).join('')+repSection(FINAL)+
    (S.seals[8]?'<section class="rsec">'+ticketHTML()+'</section>':'')+statsHTML()+
    '<p class="ver">In lúc '+fmtTime(Date.now())+' ngày '+fmtDate(Date.now())+' · Phiên bản '+VERSION+'</p></div>';
  return h;
}
function loadScript(u){ return new Promise(function(res,rej){ if(document.querySelector('script[src="'+u+'"]')){ res(); return; } var s=document.createElement('script'); s.src=u; s.onload=res; s.onerror=rej; document.head.appendChild(s); setTimeout(function(){ rej('timeout'); },9000); }); }
function loadScript2(){}
/* ---------- Ảnh khoe vé 1080×1350 (không có cam kết, không tuổi) ---------- */
function brag(){
  if(!S.seals[8]){ toast('Về đến Phù Tang rồi mới có ảnh khoe vé nhé.'); return; }
  var img=new Image();
  img.onload=function(){ drawPNG(1080,1350,function(g,W,H){
    var gr=g.createLinearGradient(0,0,W,H); gr.addColorStop(0,'#3653E6'); gr.addColorStop(1,'#1F309A'); g.fillStyle=gr; g.fillRect(0,0,W,H);
    g.strokeStyle='rgba(244,182,59,.7)'; g.lineWidth=4; roundRect(g,40,40,W-80,H-80,40); g.stroke();
    g.drawImage(img,W/2-150,110,300,300);
    g.textAlign='center'; g.fillStyle='#F4B63B'; g.font='700 40px "Be Vietnam Pro",sans-serif'; g.fillText('Mình đã về đến Phù Tang!',W/2,470);
    g.fillStyle='#fff'; g.font='800 84px "Be Vietnam Pro",sans-serif'; g.fillText('Nhật Bản',W/2,580); g.fillText('Du Ký',W/2,680);
    g.font='500 36px "Be Vietnam Pro",sans-serif'; g.fillStyle='rgba(255,255,255,.85)'; g.fillText(String(S.name),W/2,760);
    g.fillStyle='#FFF7E3'; roundRect(g,90,820,W-180,220,30); g.fill();
    AIS.forEach(function(a,i){ var cx=165+i*125, cy=930; g.save(); g.translate(cx,cy); g.rotate(-0.14); g.strokeStyle='#C8372D'; g.lineWidth=5; g.beginPath(); g.arc(0,0,50,0,Math.PI*2); g.stroke(); g.lineWidth=2; g.beginPath(); g.arc(0,0,40,0,Math.PI*2); g.stroke(); g.fillStyle='#C8372D'; g.font='800 44px "M PLUS Rounded 1c","Hiragino Sans",sans-serif'; g.textBaseline='middle'; g.fillText(a.badge.k,0,2); g.restore(); });
    g.textBaseline='alphabetic'; g.fillStyle='#fff'; g.font='italic 600 46px "Be Vietnam Pro",sans-serif'; g.fillText('Đi đến nơi, về đến chốn.',W/2,1140);
    g.font='500 30px "Be Vietnam Pro",sans-serif'; g.fillStyle='rgba(255,255,255,.75)'; g.fillText(COURSE+' · Proskills · JPC',W/2,1250);
  }, 'Khoe-ve_'+norm(S.name)+'.png'); };
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(hau('cheer').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" '));
}

/* ---------- Hướng dẫn lần đầu (~90 giây) ---------- */
var TOUR=[
  {q:'.vdx', t:'Đây là văn điệp thông quan. Qua mỗi ải, văn điệp có thêm một con dấu đỏ.'},
  {q:'.dmap', t:'Bản đồ du ký: từ Đất Việt vượt biển sang xứ Phù Tang. Mây mù che những ải chưa tới, đi đến đâu mây tan đến đó.'},
  {q:'#psnav', t:'Nút dấu hỏi là "Hỏi nhanh Chú Tanaka": tra cứu những câu học viên hay hỏi, bất cứ lúc nào.'},
  {q:'#psnav', t:'Giờ bạn thử nhé: bấm vào nút Sổ tay (hình quyển sách) để xem điểm và bài làm của mình.', tap:1}
];
var tourI=-1;
function startTour(){ if(S.d.tour || S.demo) return; tourI=0; window.scrollTo(0,0); showTour(); }
function showTour(){
  $$('.tour-hl').forEach(function(e){ e.classList.remove('tour-hl'); });
  var b=$('#tourBox'); if(b) b.remove();
  if(tourI<0 || tourI>=TOUR.length){ endTour(); return; }
  var st=TOUR[tourI], el=$(st.q);
  if(el){ el.classList.add('tour-hl'); if(st.q!=='#psnav') el.scrollIntoView({behavior:noMotion()?'auto':'smooth',block:'center'}); else el.classList.remove('psnav--hide'); }
  b=document.createElement('div'); b.id='tourBox'; b.className='tourbox';
  b.innerHTML='<div class="tourbox__c"><div style="width:44px;flex:none">'+av('hau',st.tap?'think':'hi')+'</div><p>'+esc(st.t)+'</p></div><div class="tourbox__b"><span class="small muted">'+(tourI+1)+'/'+TOUR.length+'</span><span>'+
    '<button class="btn btn--link" data-act="tourSkip">Bỏ qua</button>'+(st.tap?'':'<button class="btn btn--sm" data-act="tourNext">Đã hiểu</button>')+'</span></div>';
  document.body.appendChild(b);
}
function endTour(){ tourI=-1; $$('.tour-hl').forEach(function(e){ e.classList.remove('tour-hl'); }); var b=$('#tourBox'); if(b) b.remove(); S.d.tour=1; save(); }

/* ---------- Lời nhắc học: lịch điện thoại / Google Calendar ---------- */
var DAYS=[['MO','T2'],['TU','T3'],['WE','T4'],['TH','T5'],['FR','T6'],['SA','T7'],['SU','CN']];
function remind(){ S.d.remind=S.d.remind||{t:'20:00',d:[0,2,4]}; return S.d.remind; }
function remindHTML(){
  var r=remind();
  return '<div class="card"><h3>Lời nhắc học</h3><p>Chọn giờ và ngày, rồi thêm vào lịch điện thoại để được nhắc.</p>'+
    '<div class="form" style="margin-top:6px"><label>Giờ học<input class="inp" type="time" id="rmT" value="'+esc(r.t)+'"></label></div>'+
    '<div class="chips" style="margin:10px 0">'+DAYS.map(function(d,i){ return '<button class="chp'+(r.d.indexOf(i)>=0?' sel':'')+'" data-act="rmDay" data-i="'+i+'">'+d[1]+'</button>'; }).join('')+'</div>'+
    '<div class="btnrow"><button class="btn btn--sm" data-act="rmIcs">Thêm vào lịch điện thoại</button><a class="btn btn--sm btn--soft" id="rmG" target="_blank" rel="noopener" href="'+gcalUrl()+'">Thêm vào Google Calendar</a></div></div>';
}
function rmStart(){ var r=remind(), now=new Date(), hm=r.t.split(':'); var d=new Date(now.getFullYear(),now.getMonth(),now.getDate(),+hm[0],+hm[1]);
  var js=[1,2,3,4,5,6,0]; for(var k=0;k<8;k++){ var dd=new Date(d); dd.setDate(d.getDate()+k); if(r.d.some(function(i){ return js[i]===dd.getDay(); }) && dd>now) return dd; } return d; }
function icsDate(d){ return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'T'+pad(d.getHours())+pad(d.getMinutes())+'00'; }
function rrule(){ var r=remind(); return 'FREQ=WEEKLY;BYDAY='+(r.d.length?r.d:[0]).map(function(i){ return DAYS[i][0]; }).join(','); }
function gcalUrl(){ var s=rmStart(), e=new Date(s.getTime()+20*60000);
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Học HP05 · Nhật Bản Du Ký')+'&dates='+icsDate(s)+'/'+icsDate(e)+'&recur='+encodeURIComponent('RRULE:'+rrule())+'&details='+encodeURIComponent('Mở khóa học và đi tiếp một chặng.'); }
function rmIcs(){
  var s=rmStart();
  var ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Proskills//HP05//VI','BEGIN:VEVENT','UID:nbdk-hp05-'+Date.now()+'@proskills','DTSTAMP:'+icsDate(new Date()),'DTSTART:'+icsDate(s),'DURATION:PT20M','RRULE:'+rrule(),'SUMMARY:Học HP05 · Nhật Bản Du Ký','DESCRIPTION:Mở khóa học và đi tiếp một chặng.','BEGIN:VALARM','TRIGGER:-PT5M','ACTION:DISPLAY','DESCRIPTION:Đến giờ học rồi!','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
  var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'})); a.download='Nhac-hoc-HP05.ics'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },500);
  toast('Mở tập tin vừa tải để thêm lời nhắc vào lịch.',5000);
}

/* ---------- Việc có thể làm thêm (ở Phù Tang) ---------- */
function todoList(){
  var L=[];
  AIS.forEach(function(a){ if(a.warm && !actDone(a.warm) && aiOpen(a.n)) L.push({t:'Khởi động 30 giây · '+a.vn, id:a.warm, i:0}); });
  return L;
}
function todoHTML(){
  var L=todoList();
  return '<div class="sec"><h2 style="font-size:20px">Việc có thể làm thêm</h2><p>'+(L.length?'Không bắt buộc, nhưng giúp bạn ôn lại nhanh.':'Bạn đã làm đủ mọi phần. Tuyệt vời!')+'</p></div>'+
    (L.length?'<div class="todo">'+L.map(function(t){ return '<div><span>'+esc(t.t)+'</span><button class="btn btn--sm btn--soft" data-act="doNow" data-id="'+t.id+'" data-i="'+t.i+'">Làm ngay</button></div>'; }).join('')+'</div>':'')+
    '<div style="margin-top:14px"><button class="btn btn--full" data-act="rep">'+icon('scroll',18)+' Bản ghi chép, PDF và báo cáo thầy cô</button></div>';
}

