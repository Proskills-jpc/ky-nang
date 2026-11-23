/* TK · Nhật Bản Du Ký · tk/extras.js · ÂM THANH · NHỊP HỌC · MỤC TIÊU · CHUYỂN CẢNH · THỐNG KÊ · CÀI ĐẶT · RƯƠNG KINH
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* =========================================================
   PHẦN 5d · ÂM THANH · ĐỌC TIẾNG NHẬT · DẠNG BÀI CÓ HÌNH
   ========================================================= */
/* Âm thanh tạo bằng Web Audio, thang ngũ cung, không cần tập tin */
var AC=null, AVOL=0.16;
function sndOn(){ return PS.soundOn(); }   /* công tắc âm thanh chung của Proskills */
function ac(){ if(!AC){ try{ AC=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ AC=null; } } if(AC && AC.state==='suspended') AC.resume(); return AC; }
window.addEventListener('pointerdown', function(){ if(sndOn()) ac(); }, {once:true, passive:true});
function tone(f,t0,dur,type,vol,attack){ var c=ac(); if(!c) return; var o=c.createOscillator(), g=c.createGain(); o.type=type||'sine'; o.frequency.setValueAtTime(f,c.currentTime+t0);
  g.gain.setValueAtTime(0.0001,c.currentTime+t0); g.gain.exponentialRampToValueAtTime((vol||1)*AVOL,c.currentTime+t0+(attack||0.01)); g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+t0+dur);
  o.connect(g); g.connect(c.destination); o.start(c.currentTime+t0); o.stop(c.currentTime+t0+dur+0.05); }
function noise(t0,dur,freq,vol,sweep){ var c=ac(); if(!c) return; var n=c.sampleRate*dur, b=c.createBuffer(1,n,c.sampleRate), d=b.getChannelData(0); for(var i=0;i<n;i++) d[i]=Math.random()*2-1;
  var s=c.createBufferSource(); s.buffer=b; var f=c.createBiquadFilter(); f.type='bandpass'; f.frequency.setValueAtTime(freq,c.currentTime+t0); if(sweep) f.frequency.exponentialRampToValueAtTime(sweep,c.currentTime+t0+dur); f.Q.value=0.9;
  var g=c.createGain(); g.gain.setValueAtTime((vol||1)*AVOL,c.currentTime+t0); g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+t0+dur);
  s.connect(f); f.connect(g); g.connect(c.destination); s.start(c.currentTime+t0); }
function sfx(k){
  if(!sndOn()) return; if(!ac()) return;
  if(k==='ok'){ tone(784,0,.18,'triangle',.9); tone(1047,.09,.35,'triangle',.8); }
  else if(k==='no'){ tone(196,0,.22,'sine',.9); tone(165,.08,.28,'sine',.6); }
  else if(k==='tap'){ tone(1319,0,.06,'sine',.35); }
  else if(k==='whoosh'){ noise(0,.32,500,.5,2400); }
  else if(k==='stamp'){ noise(0,.12,180,1.2,90); tone(70,0,.25,'sine',1.6); [220,330,415,523].forEach(function(f,i){ tone(f,.08,1.6-i*.2,'sine',.45-i*.08,.005); }); }
  else if(k==='badge'){ [523,587,659,784,880,1047].forEach(function(f,i){ tone(f,i*.09,.5,'sine',.7); tone(f*2,i*.09,.25,'sine',.12); }); }
  else if(k==='open'){ [392,523,659,784].forEach(function(f,i){ tone(f,i*.07,.4,'triangle',.6); }); noise(.25,.5,4000,.25,8000); }
}
/* Đọc tiếng Nhật bằng giọng có sẵn trong máy */
function jaVoice(){ try{ return speechSynthesis.getVoices().filter(function(v){ return /^ja/i.test(v.lang); })[0]||null; }catch(e){ return null; } }
function speak(t){
  if(!('speechSynthesis' in window)){ toast('Trình duyệt này chưa hỗ trợ đọc thành tiếng.'); return; }
  var u=new SpeechSynthesisUtterance(t); u.lang='ja-JP'; u.rate=.85; var v=jaVoice(); if(v) u.voice=v;
  else if(speechSynthesis.getVoices().length) toast('Máy bạn có thể chưa có giọng đọc tiếng Nhật. Thử cài thêm trong phần Cài đặt của máy.',5000);
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
if('speechSynthesis' in window){ try{ speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged=function(){}; }catch(e){} }
function spk(t){ return ('speechSynthesis' in window) ? '<button class="spk" data-act="speak" data-t="'+esc(t)+'" aria-label="Nghe đọc tiếng Nhật" title="Nghe đọc">'+icon('speaker',15)+'</button>' : ''; }

/* --- Xe nào cần bằng lái? --- */
var VEH=[
  {k:'bike', n:'Xe đạp thường', need:0, why:'Xe đạp thường không cần bằng lái. Nhớ luật: đi bên trái lòng đường, bật đèn, không dùng điện thoại, không đeo tai nghe khi đang đạp xe.'},
  {k:'assist', n:'Xe đạp trợ lực điện', need:0, why:'Có pin và mô tơ nhưng phải đạp mới chạy, mô tơ chỉ hỗ trợ. Không cần bằng lái.'},
  {k:'moped', n:'Xe có tay ga, có bàn đạp', need:1, why:'Nhìn giống xe đạp, nhưng tự chạy bằng ga không cần đạp nên thường được xếp là xe gắn máy: cần bằng lái, biển số, bảo hiểm bắt buộc.'},
  {k:'scooter', n:'Xe máy 50cc', need:1, why:'Xe máy cần bằng lái Nhật, biển số và bảo hiểm bắt buộc. Bằng lái Việt Nam không dùng trực tiếp được.'}
];
STEP.vehicles = {
  view:function(s,x){
    x.a=x.a||{};
    var h=sayHTML('tan','hi','Bốn chiếc xe này đều có ở Nhật. Chiếc nào phải có bằng lái mới được đi trên đường? Cháu chọn cho từng xe nhé.','say--tan')+'<div class="vgrid" id="vgrid">';
    VEH.forEach(function(v,i){
      var r=x.a[i]||{};
      h+='<div class="vcard'+(r.ok?' ok':'')+'"><div class="vimg">'+vehSVG(v.k)+'</div><b>'+esc(v.n)+'</b>'+
        (r.ok?'<div class="fb ok"><span class="verdict">'+(v.need?'Cần bằng lái.':'Không cần bằng.')+'</span> '+esc(v.why)+'</div>':
          '<div class="vbtns"><button class="btn btn--sm btn--soft" data-act="veh" data-i="'+i+'" data-v="1">Cần bằng lái</button><button class="btn btn--sm btn--soft" data-act="veh" data-i="'+i+'" data-v="0">Không cần</button></div>'+
          ((r.bad)?'<div class="fb no"><span class="verdict">Chưa đúng.</span> Nhìn kỹ: xe có tay ga không? Có phải đạp mới chạy không?</div>':''))+'</div>';
    });
    h+='</div>';
    var all=VEH.every(function(v,i){ return x.a[i]&&x.a[i].ok; });
    if(all) h+=srcLine('Luật Giao thông đường bộ Nhật Bản (道路交通法)');
    return h;
  },
  state:function(s,x){ x.a=x.a||{}; var f=VEH.findIndex(function(v,i){ return !(x.a[i]&&x.a[i].ok); }); return f<0?{ok:true}:{ok:false,msg:'Còn '+VEH.filter(function(v,i){ return !(x.a[i]&&x.a[i].ok); }).length+' xe chưa chọn đúng',q:'#vgrid'}; }
};
function vehAns(i,v){ var x=xs(CUR.id,CUR.i); x.a=x.a||{}; var r=x.a[i]=x.a[i]||{}; if(r.ok) return;
  if(+v===VEH[i].need){ r.ok=1; sfx('ok'); if(!r.bad) addXP('veh.'+CUR.id+'.'+i,3,true); } else { r.bad=1; sfx('no'); }
  save(); drawStep(); }

/* --- Biển báo nói gì? --- */
STEP.signs = {
  view:function(s,x){
    x.a=x.a||{};
    var h='<p class="hint">'+esc(s.intro)+'</p><div class="sgrid" id="sgrid">';
    s.items.forEach(function(it,i){
      var r=x.a[i]||{bad:[]};
      h+='<div class="scard'+(r.ok?' ok':'')+'"><div class="simg">'+signSVG(it.k)+'</div><div class="sbody"><div class="sjp"><b class="jp">'+it.jp+'</b> <small>'+esc(it.ro)+'</small> '+spk(it.jp)+'</div><div class="opts">'+
        it.o.map(function(o,j){ var cl=r.ok&&j===it.a?' good':(r.bad.indexOf(j)>=0?' bad':''); return '<button class="opt'+cl+'" data-act="sign" data-i="'+i+'" data-j="'+j+'" '+(r.ok?'disabled':'')+'><i>'+'ABC'[j]+'</i><span>'+esc(o)+'</span></button>'; }).join('')+'</div>'+
        (r.ok?'<div class="fb ok"><span class="verdict">Đúng rồi!</span> '+esc(it.why)+'</div>':(r.bad.length?'<div class="fb no"><span class="verdict">Chưa đúng.</span> Nhìn lại hình dáng và màu của biển nhé.</div>':''))+'</div></div>';
    });
    h+='</div>';
    if(s.items.every(function(it,i){ return x.a[i]&&x.a[i].ok; })) h+=srcLine(s.src);
    return h;
  },
  state:function(s,x){ x.a=x.a||{}; var n=s.items.filter(function(it,i){ return !(x.a[i]&&x.a[i].ok); }).length; return n?{ok:false,msg:'Còn '+n+' biển chưa đọc đúng',q:'#sgrid'}:{ok:true}; }
};
function signAns(i,j){ var s=CUR.s, x=xs(CUR.id,CUR.i); x.a=x.a||{}; var r=x.a[i]=x.a[i]||{bad:[]}; if(r.ok) return;
  if(j===s.items[i].a){ r.ok=1; sfx('ok'); if(!r.bad.length) addXP('sign.'+CUR.id+'.'+i,3,true); } else { if(r.bad.indexOf(j)<0) r.bad.push(j); sfx('no'); }
  save(); drawStep(); }

/* --- Cảnh có điểm chạm (phòng KTX) --- */
STEP.scene = {
  view:function(s,x){
    x.seen=x.seen||[];
    var h='<p class="hint">'+esc(s.intro)+'</p><div class="counter">'+icon('eye',18)+' Đã xem '+x.seen.length+'/'+s.spots.length+' góc</div><div class="smap" id="scene">'+roomSVG();
    s.spots.forEach(function(p){ var d=x.seen.indexOf(p.k)>=0; h+='<button class="pin'+(d?' ok':'')+'" style="left:'+p.x+'%;top:'+p.y+'%" data-act="scn" data-k="'+p.k+'" aria-label="'+esc(p.name)+'"><i>'+(d?icon('check',14,3):'')+'</i><span>'+esc(p.name)+'</span></button>'; });
    h+='</div>';
    if(x.seen.length) h+='<div class="found-list">'+x.seen.map(function(k,i){ var p=s.spots.filter(function(z){ return z.k===k; })[0]; return '<div><i style="background:var(--c)">'+(i+1)+'</i><span><b>'+esc(p.name)+'</b> · '+esc(p.why)+'</span></div>'; }).join('')+'</div>';
    if(x.seen.length===s.spots.length) h+=srcLine(s.src);
    return h;
  },
  state:function(s,x){ x.seen=x.seen||[]; var n=s.spots.length-x.seen.length; return n?{ok:false,msg:'Còn '+n+' góc chưa xem',q:'#scene'}:{ok:true}; }
};
function scnTap(k){ var s=CUR.s, x=xs(CUR.id,CUR.i); x.seen=x.seen||[]; if(x.seen.indexOf(k)>=0) return; x.seen.push(k); sfx('tap'); save(); drawStep();
  if(x.seen.length===s.spots.length){ var g=addXP('scn.'+CUR.id+'.'+CUR.i,8,true); if(g) pointToast(g,0,'Đã xem hết căn phòng!'); } }

/* =========================================================
   PHẦN 5e · SỔ TAY NỔI · NHỊP HỌC · THẮNG ẢI · NGHI THỨC CUỐI
   ========================================================= */
/* --- Tấm nổi (Sổ tay, Hỏi nhanh): nền mờ phía sau, vuốt xuống để đóng --- */
function sheetBack(closeAct){ var b=document.createElement('div'); b.className='sheetback'; b.setAttribute('data-act',closeAct); document.body.appendChild(b); return b; }
function sheetDrag(el, closeFn){
  var y0=null, dy=0;
  el.addEventListener('pointerdown', function(e){ if(window.innerWidth>=700) return; if(!e.target.closest('.grab,.nb__top')) return; if(e.target.closest('button,select,input')) return; y0=e.clientY; dy=0; el.style.transition='none'; });
  el.addEventListener('pointermove', function(e){ if(y0==null) return; dy=Math.max(0,e.clientY-y0); el.style.transform='translateY('+dy+'px)'; });
  var end=function(){ if(y0==null) return; y0=null; el.style.transition=''; if(dy>110) closeFn(); else el.style.transform=''; };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
}
/* --- Nhịp học --- */
function pace(){ return S.d.pace||1; }
function todayDone(){ var t=today(); return Object.keys(S.done).filter(function(id){ return ACTS[id] && !ACTS[id].warm && dkey(new Date(S.done[id]))===t; }).length; }
function paceRing(){
  var tgt=pace()*3, d=todayDone(), p=Math.min(1,d/tgt), C=2*Math.PI*20;
  return '<svg class="ring" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" stroke="rgba(47,75,216,.12)" stroke-width="3"/><circle cx="22" cy="22" r="20" fill="none" stroke="'+(p>=1?'#14A874':'#F4B63B')+'" stroke-width="3" stroke-linecap="round" stroke-dasharray="'+(C*p).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 22 22)"/></svg>';
}
function paceLine(){
  var tgt=pace()*3, d=todayDone(), left=TOTAL_ACTS-doneCount();
  var days=Math.ceil(left/tgt), end=new Date(); end.setDate(end.getDate()+Math.max(0,days-(d>=tgt?0:0)));
  return 'Hôm nay: <b>'+Math.min(d,tgt)+'/'+tgt+'</b> chặng theo nhịp '+pace()+' ải/ngày.'+(left>0?' Giữ nhịp này, bạn đến Phù Tang khoảng ngày <b>'+fmtDate(end)+'</b>.':' Bạn đã đến Phù Tang!');
}
function paceHTML(){
  return '<div class="card"><h3>Nhịp học</h3><p>Chọn số ải mỗi ngày. Vòng tròn quanh nút bản đồ sẽ đầy dần khi bạn đủ chỉ tiêu trong ngày.</p><div class="chips" style="margin-top:8px">'+
    [1,2,3].map(function(n){ return '<button class="chp'+(pace()===n?' sel':'')+'" data-act="pace" data-n="'+n+'">'+n+' ải/ngày'+(n===1?' (mặc định)':'')+'</button>'; }).join('')+'</div><p class="small" style="margin:10px 0 0">'+paceLine()+'</p></div>';
}
/* --- Khoảnh khắc thắng ải --- */
function petals(n){ var h=''; for(var i=0;i<(n||18);i++){ h+='<i class="petal" style="left:'+(Math.random()*100).toFixed(1)+'%;animation-delay:'+(Math.random()*1.6).toFixed(2)+'s;animation-duration:'+(3+Math.random()*2.5).toFixed(2)+'s;transform:scale('+(0.6+Math.random()*0.7).toFixed(2)+')"></i>'; } return '<div class="petals" aria-hidden="true">'+h+'</div>'; }
function victory(n){
  var a=aiOf(n); if(!a || !a.boss) return;
  var mood=a.boss==='yeu'?'deflated':'angry';
  var ov=document.createElement('div'); ov.className='ov vic'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true');
  ov.innerHTML=petals(22)+'<div class="ov__box"><div class="vic__boss"><div class="vic__av">'+av(a.boss,mood)+'</div><div class="vic__smoke"></div></div>'+
    '<p class="kicker">CỬA ẢI '+pad(n)+' · '+esc(a.vn)+'</p><h2>'+T('[Tên] đã thắng '+CHAR[a.boss].n+'!')+'</h2>'+
    '<p class="muted">Ba chặng đã xong. Rương bí kíp của ải đang chờ bạn.</p>'+
    '<button class="btn btn--gold btn--full invite" data-act="chest" data-n="'+n+'">Mở rương bí kíp</button></div>';
  $$('.ov').forEach(function(o){ o.remove(); });
  document.body.appendChild(ov); sfx('stamp'); setTimeout(function(){ sfx('badge'); },900);
}
/* --- Nghi thức nhận bí kíp trọn bộ (Phù Tang) --- */
var CER={i:0,lines:[]};
function ceremony(){
  var t=myKinh()||'Đi đến nơi, về đến chốn.';
  CER={i:0,lines:t.replace(/([.!?…])\s+/g,'$1\n').split('\n').filter(function(x){ return x.trim(); })};
  var ov=document.createElement('div'); ov.className='ov cer'; ov.id='cerOv'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true');
  ov.innerHTML='<div class="cer__wrap"><p class="cer__k">Trang bí kíp cuối cùng</p><div class="cer__scroll" data-act="cerTap"><div class="cer__rod"></div><div class="cer__paper" id="cerPaper"><p class="cer__hint">Chạm vào trang giấy</p></div><div class="cer__rod"></div></div><div id="cerEnd"></div></div>';
  $$('.ov').forEach(function(o){ o.remove(); });
  document.body.appendChild(ov); sfx('open');
}
function cerTap(){
  var p=$('#cerPaper'); if(!p || CER.done) return;
  if(CER.i===0) p.innerHTML='';
  if(CER.i<CER.lines.length){
    var el=document.createElement('p'); el.className='cer__line'; el.textContent=CER.lines[CER.i]; p.appendChild(el); CER.i++;
    tone(523+CER.i*60,0,.8,'sine',.5);
    if(CER.i<CER.lines.length){ var h=document.createElement('p'); h.className='cer__hint sm'; h.textContent='Chạm tiếp'; p.appendChild(h); setTimeout(function(){ var hs=$$('#cerPaper .cer__hint'); hs.slice(0,-1).forEach(function(x){ x.remove(); }); },10); }
    else {
      CER.done=1; $$('#cerPaper .cer__hint').forEach(function(x){ x.remove(); });
      setTimeout(function(){ var s=document.createElement('div'); s.className='cer__seal'; s.innerHTML=sealSVG('志',86); p.appendChild(s); sfx('stamp');
        $('#cerEnd').innerHTML='<p class="cer__by">'+esc(S.name)+' · '+fmtDate(Date.now())+'</p><button class="btn btn--gold btn--full invite" data-act="claim" data-n="8">Nhận vé hoàn thành</button>'; }, 900);
    }
  }
}

/* =========================================================
   PHẦN 5f · MỤC TIÊU CÁ NHÂN · CÁI GIÁ CỦA 3 MAN · PDF KHỔ A4
   ========================================================= */
var GOALS=[['nha','Tiết kiệm xây, sửa nhà cho bố mẹ'],['no','Trả nợ, đỡ đần gia đình'],['nghe','Học nghề, lên Kỹ năng đặc định'],['von','Có vốn làm ăn khi về nước'],['khac','Một mục tiêu khác']];
STEP.goal = {
  view:function(s,x){
    var g=S.goal||{};
    return sayHTML('hau','think',T('Trước khi lên đường, cho mình hỏi bạn một câu: Sau những năm tháng ở Nhật, [Tên] muốn mang về điều gì nhất? Mình sẽ nhớ mục tiêu này suốt hành trình.'))+
      '<div class="card" id="goalbox"><div class="formula">Viết thật ngắn gọn nhé: mục tiêu của tôi là…</div>'+
      '<textarea class="inp" id="goalT" placeholder="Viết 1–2 câu bằng lời của bạn.">'+esc(g.t||'')+'</textarea>'+
      '<p class="small" style="margin:8px 0 0;color:var(--ink-2)">'+icon('bulb',14)+' Nhìn lại điều bạn đã viết ở ga Nhìn Xa và ga Ước Mơ trong khóa Career Design nhé.</p>'+
      '<details class="tip"'+((S.goal||{}).k?' open':'')+'><summary>Gợi ý nhỏ</summary><p class="small muted" style="margin:6px 0">Chạm một gợi ý để chép vào ô, rồi sửa lại theo cách của bạn.</p><div class="chips">'+
        GOALS.filter(function(o){ return o[0]!=='khac'; }).map(function(o){ return '<button class="chp" data-act="goalk" data-k="'+o[0]+'">'+esc(o[1])+'</button>'; }).join('')+'</div></details></div>'+
      '<p class="small muted">Mình sẽ thỉnh thoảng "nhắc nhẹ" để bạn thấy mỗi lựa chọn ở các ngã rẽ sẽ ảnh hưởng đến mục tiêu của bạn như thế nào.</p>';
  },
  state:function(){ var g=S.goal||{}; return words(g.t)>=5 ? {ok:true} : {ok:false,msg:'Viết mục tiêu của bạn (1–2 câu)',q:'#goalbox'}; },
  wire:function(){ var t=$('#goalT'); if(!t) return; t.addEventListener('input',function(){ S.goal=S.goal||{}; S.goal.t=t.value; save(); drawBar(); }); }
};
function goalPick(k){
  var o=GOALS.filter(function(z){ return z[0]===k; })[0]; if(!o) return;
  var t=$('#goalT'); var cur=t?t.value.trim():'';
  S.goal=S.goal||{}; S.goal.k=k; S.goal.t = cur ? cur.replace(/[.;,\s]+$/,'')+'; '+o[1].toLowerCase() : o[1];
  save(); drawStep(); var t2=$('#goalT'); if(t2){ t2.focus(); t2.setSelectionRange(t2.value.length,t2.value.length); }
}
function goalText(){ var g=S.goal||{}; return (g.t||'').trim(); }
function goalHit(r){
  var g=goalText().replace(/[.!?…\s]+$/,''); if(!g) return '';
  var msg = r==null ? 'Mục tiêu "'+g+'" của [Tên] có thể chưa kịp bắt đầu đã dừng lại.' :
    (r>=2 ? 'Mục tiêu "'+g+'" của [Tên] có thể dừng lại giữa chừng.' : 'Mục tiêu "'+g+'" của [Tên] sẽ chậm lại, vì lòng tin rất khó lấy lại.');
  return '<div class="goalhit">'+icon('flame',16)+'<span>'+T(msg)+'</span></div>';
}
/* --- Cái giá của 3 man --- */
STEP.cost = {
  view:function(s,x){
    x.l=x.l||14; x.m=x.m||12; x.y=(x.y==null?3:x.y);
    var lost=x.l*x.m + 18*12*x.y, ratio=Math.round(lost/3);
    var bar=function(v,max,cl){ return '<i class="'+cl+'" style="width:'+Math.max(2,Math.min(100,v/max*100)).toFixed(1)+'%"></i>'; };
    var mx=Math.max(lost,3);
    var h=sayHTML('ho','sweet','"Chỉ là cái tài khoản em không dùng nữa thôi mà. 3 man tiền tươi đó!"')+
      '<div class="card cost" id="cost"><h3 style="font-size:17px;margin-bottom:6px">Cái giá thật của 3 man</h3><p class="small muted" style="margin:0 0 8px">Số liệu minh họa. Bạn kéo các thanh theo hoàn cảnh của mình.</p>'+
      '<label class="cost__r"><span>Lương thực lĩnh mỗi tháng ở Nhật</span><b>'+x.l+' man</b><input type="range" min="10" max="22" value="'+x.l+'" data-c="l"></label>'+
      '<label class="cost__r"><span>Số tháng hợp đồng còn lại nếu bị cho về nước</span><b>'+x.m+' tháng</b><input type="range" min="1" max="36" value="'+x.m+'" data-c="m"></label>'+
      '<label class="cost__r"><span>Số năm Kỹ năng đặc định có thể mất (ước 18 man/tháng)</span><b>'+x.y+' năm</b><input type="range" min="0" max="5" value="'+x.y+'" data-c="y"></label>'+
      '<div class="cost__bars"><div><span>Tiền bán tài khoản</span><div class="cbar">'+bar(3,mx,'sm')+'</div><b>3 man</b></div>'+
      '<div><span>Thu nhập có thể mất</span><div class="cbar">'+bar(lost,mx,'lg')+'</div><b class="neg">'+lost.toLocaleString('vi-VN')+' man</b></div></div>'+
      '<p class="cost__x">Gấp khoảng <b>'+ratio.toLocaleString('vi-VN')+' lần</b> số tiền Hồ Ly trả cho bạn.</p>'+goalHit(3)+'</div>';
    var r=x.q||{};
    h+='<div class="mcq" id="costq"><div class="mcq__q">Lương thực lĩnh 14 man, còn 12 tháng hợp đồng. Nếu bị cho về nước, riêng tiền lương bạn mất khoảng bao nhiêu?</div><div class="opts">'+
      ['Khoảng 17 man, vì chỉ mất một tháng lương','Khoảng 168 man','Khoảng 42 man, vì chỉ tính tiền tăng ca và thưởng'].map(function(o,j){ var cl=r.ok&&j===1?' good':((r.bad||[]).indexOf(j)>=0?' bad':''); return '<button class="opt'+cl+'" data-act="costq" data-j="'+j+'" '+(r.ok?'disabled':'')+'><i>'+'ABC'[j]+'</i><span>'+o+'</span></button>'; }).join('')+'</div>'+
      (r.ok?'<div class="fb ok"><span class="verdict">Đúng rồi!</span> 14 man × 12 tháng = 168 man, chưa kể tiền vé tự trả và cơ hội quay lại Nhật.</div>':((r.bad||[]).length?'<div class="fb no"><span class="verdict">Chưa đúng.</span> Nhân lương mỗi tháng với số tháng còn lại.</div>':''))+'</div>';
    return h;
  },
  state:function(s,x){ return (x.q&&x.q.ok)?{ok:true}:{ok:false,msg:'Trả lời câu hỏi tính toán',q:'#costq'}; },
  wire:function(s,x){ $$('#cost input[type=range]').forEach(function(el){ el.addEventListener('input',function(){ x[el.getAttribute('data-c')]=+el.value; save(); var y=window.scrollY, k=el.getAttribute('data-c'); drawStep(); window.scrollTo(0,y); var n=$('#cost input[data-c='+k+']'); if(n) n.focus(); }); }); }
};
function costAns(j){ var x=xs(CUR.id,CUR.i); x.q=x.q||{bad:[]}; if(x.q.ok) return; if(j===1){ x.q.ok=1; sfx('ok'); if(!x.q.bad.length) addXP('cost.'+CUR.id,10,true); } else { if(x.q.bad.indexOf(j)<0) x.q.bad.push(j); sfx('no'); } save(); drawStep(); }

/* --- PDF khổ A4: dựng trang A4 thật (794×1123 px), rồi chụp từng trang --- */
function a4Sections(){
  var top='<section class="rsec rsec--top"><small>BẢN GHI CHÉP · '+esc(COURSE)+'</small><h1>Nhật Bản Du Ký</h1>'+
    '<div class="rgrid"><div><small>Học viên</small><b>'+esc(S.name)+'</b></div><div><small>Lớp · Diện</small><b>'+esc(S.cls)+' · '+esc(S.path)+'</b></div><div><small>Thầy cô hướng dẫn</small><b>'+esc(teacher()?tName():'Chưa chọn')+'</b></div><div><small>Lên đường</small><b>'+fmtDate(S.created)+'</b></div></div>'+
    (goalText()?'<div class="rgoal"><small>Mục tiêu của tôi</small><p>'+esc(goalText())+'</p></div>':'')+
    '<div class="tiles rtiles"><div class="tl dau"><small>Con dấu</small><b>'+doneCount()+'<span>/'+TOTAL_ACTS+'</span></b></div><div class="tl xp"><small>XP</small><b>'+xpTotal()+'</b></div><div class="tl ins"><small>Insight</small><b>'+insTotal()+'</b></div><div class="tl fire"><small>Chuỗi ngày</small><b>'+streak()+'</b></div></div></section>';
  var out=[top]; AIS.forEach(function(a){ var h=repSection(a); if(h) out.push(h); }); var f=repSection(FINAL); if(f) out.push(f);
  if(S.seals[8]) out.push('<section class="rsec">'+ticketHTML()+'</section>');
  out.push(statsHTML());
  return out;
}
function buildA4(){
  var old=$('#a4'); if(old) old.remove();
  var box=document.createElement('div'); box.id='a4'; document.body.appendChild(box);
  var secs=a4Sections(), pages=[], pg=null, body=null, n=0;
  var head=function(){ return '<div class="a4h"><b>Nhật Bản Du Ký · '+esc(COURSE)+'</b><span>'+esc(S.name)+' · Lớp '+esc(S.cls)+'</span></div>'; };
  var newPage=function(){ n++; pg=document.createElement('div'); pg.className='a4page'; pg.innerHTML=head()+'<div class="a4b"></div><div class="a4f"><span>In ngày '+fmtDate(Date.now())+'</span><span>Trang '+n+'</span></div>'; box.appendChild(pg); body=pg.querySelector('.a4b'); pages.push(pg); };
  newPage();
  secs.forEach(function(html){
    var t=document.createElement('div'); t.innerHTML=html; var el=t.firstElementChild; body.appendChild(el);
    if(body.scrollHeight>body.clientHeight+1 && body.children.length>1){ body.removeChild(el); newPage(); body.appendChild(el); }
  });
  return pages;
}
function makePDF(){
  if(V.v!=='rep'){ go('rep'); }
  toast('Đang tạo PDF khổ A4, chờ chút nhé…',9000);
  var pages=buildA4();
  Promise.all([loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')]).then(function(){
    var pdf=new window.jspdf.jsPDF('p','mm','a4');
    var next=function(k){
      if(k>=pages.length){ pdf.save('HP05_DuKy_'+norm(S.name)+'.pdf'); toast('Đã tải PDF khổ A4.',5000); return; }
      window.html2canvas(pages[k],{scale:2,backgroundColor:'#ffffff',width:794,height:1123,windowWidth:794}).then(function(c){
        if(k>0) pdf.addPage(); pdf.addImage(c.toDataURL('image/jpeg',0.92),'JPEG',0,0,210,297); next(k+1);
      }).catch(function(){ printFallback(); });
    };
    next(0);
  }).catch(function(){ printFallback(); });
}
function printFallback(){
  toast('Không tải được công cụ PDF. Mình mở chế độ In: chọn "Lưu dưới dạng PDF", khổ A4 nhé.',6000);
  buildA4(); document.body.classList.add('printa4');
  setTimeout(function(){ window.print(); },700);
}
window.addEventListener('afterprint', function(){ document.body.classList.remove('printa4'); });

/* =========================================================
   PHẦN 5g · CHUYỂN CẢNH CÓ HAIKU · LÀM LẠI ĐỂ ÔN · THỐNG KÊ HỌC TẬP
   ========================================================= */
/* --- Màn chuyển cảnh khi vào ải --- */
function lmkSolo(n){
  var p=MPOS[n], a=aiOf(n);
  return '<svg viewBox="'+(p[0]-70)+' '+(p[1]-108)+' 140 136" aria-hidden="true">'+mapDefs()+lmk(n,a.col||'#2F4BD8')+'</svg>';
}
var TRN=null;
function aiTransition(n, cb){
  var a=aiOf(n); S.d.tr=S.d.tr||{}; var full=!S.d.tr[n] && !noMotion(); S.d.tr[n]=1; save();
  var code = n===0?'CHUẨN BỊ':(n===8?'ĐIỂM ĐÍCH':'CỬA ẢI '+pad(n));
  var el=document.createElement('div'); el.className='trn'+(full?' full':' short'); el.id='trn'; el.setAttribute('role','dialog'); el.setAttribute('aria-label',a.vn);
  el.innerHTML='<div class="trn__fog f1"></div><div class="trn__fog f2"></div>'+
    '<div class="trn__in"><div class="trn__art" style="--ac:'+(a.col||'#F4B63B')+'">'+lmkSolo(n)+'</div>'+
    '<p class="trn__code">'+code+'</p><h2 class="trn__name">'+esc(a.vn)+'</h2>'+
    (full && a.haiku ? '<div class="trn__hk">'+a.haiku.map(function(l,i){ return '<p style="animation-delay:'+(1.1+i*1.25)+'s">'+esc(l)+'</p>'; }).join('')+'</div><button class="btn btn--gold trn__go" data-act="trnSkip">Vào ải '+icon('next',16)+'</button>' : '')+
    '</div><button class="trn__skip" data-act="trnSkip">Bỏ qua '+icon('next',14)+'</button>';
  document.body.appendChild(el);
  if(full){ tone(98,0,1.2,'sine',1.4); noise(0,.9,300,.35,900); setTimeout(function(){ tone(73,0,1.4,'sine',1.2); },700); }
  TRN={cb:cb, t:full?null:setTimeout(endTransition,1100)};
  if(!full) el.addEventListener('click', function(e){ if(!e.target.closest('.trn__skip')) endTransition(); });
}
function endTransition(){
  if(!TRN) return; clearTimeout(TRN.t); var cb=TRN.cb; TRN=null;
  var el=$('#trn'); if(el){ el.classList.add('out'); setTimeout(function(){ el.remove(); }, noMotion()?0:380); }
  if(cb) cb();
}

/* --- Làm lại để ôn: giữ kết quả lần đầu --- */
function firstX(id,i){ var f=S.d['first.'+id]; return (f && f[i]) || S.d['x.'+id+'.'+i]; }
function redoAsk(id){
  var ov=document.createElement('div'); ov.className='ov'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true');
  ov.innerHTML='<div class="ov__box" style="text-align:left"><div style="display:flex;gap:10px;align-items:center"><div style="width:52px;flex:none">'+av('hau','think')+'</div><h2 style="font-size:20px;margin:0">Làm lại chặng này để ôn?</h2></div>'+
    '<p style="margin:12px 0 6px">Kết quả lần đầu và điểm bạn đã có <b>vẫn được giữ nguyên</b>. Những câu bạn đã viết sẽ hiện sẵn để bạn sửa thêm.</p>'+
    '<div class="btnrow" style="justify-content:flex-end"><button class="btn btn--soft" data-act="closeOv">Thôi</button><button class="btn" data-act="redoGo" data-id="'+id+'">Làm lại</button></div></div>';
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.remove(); });
  document.body.appendChild(ov);
}
function redoGo(id){
  var a=ACTS[id]; if(!a) return;
  if(!S.d['first.'+id]){ var snap={}; a.steps.forEach(function(s,i){ var x=S.d['x.'+id+'.'+i]; if(x) snap[i]=JSON.parse(JSON.stringify(x)); }); S.d['first.'+id]=snap; }
  a.steps.forEach(function(s,i){
    var k='x.'+id+'.'+i, x=S.d[k]||{};
    if(s.k==='write'){ var keep={}; s.fields.concat(s.opt?[s.opt]:[]).forEach(function(f){ if(x[f.key]) keep[f.key]=x[f.key]; }); S.d[k]=keep; }
    else if(s.k==='check'){ S.d[k]={c:x.c||[],luat:x.luat||''}; }
    else if(s.k==='sos'||s.k==='goal'){ /* giữ nguyên */ }
    else delete S.d[k];
  });
  S.d['st.'+id]={i:0,max:0}; save(true);
  $$('.ov').forEach(function(o){ o.remove(); });
  V.scroll=0; render(true); toast('Bắt đầu ôn lại. Kết quả lần đầu vẫn được giữ.',4000);
}

/* --- Thống kê học tập (cuối bản ghi chép và PDF) --- */
function markVisit(){ if(!S.gate) return; S.vis=S.vis||{}; var k=today(); if(!S.vis[k]){ S.vis[k]=1; save(); } }
document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible') markVisit(); });
function writtenWords(){
  var n=words(goalText());
  Object.keys(ACTS).forEach(function(id){ ACTS[id].steps.forEach(function(s,i){
    var x=S.d['x.'+id+'.'+i]||{};
    if(s.k==='write') s.fields.concat(s.opt?[s.opt]:[]).forEach(function(f){ n+=words(x[f.key]); });
    if(s.k==='check') n+=words(x.luat);
  }); });
  return n;
}
function statsHTML(){
  var dd=Object.keys(S.days).filter(function(k){ return S.days[k]>0; }).sort();
  var vis={}; Object.keys(S.vis||{}).forEach(function(k){ vis[k]=1; }); dd.forEach(function(k){ vis[k]=1; });
  var total=dd.reduce(function(s,k){ return s+S.days[k]; },0), dn=doneCount();
  var per=dd.map(function(k){ var p=k.split('-'); return p[2]+'.'+p[1]+': '+Math.round(S.days[k])+' phút'; }).join(' · ');
  return '<section class="rsec rstats"><small>Thống kê học tập</small><p>Số ngày có học: <b>'+dd.length+'</b> · Số ngày mở khóa học: <b>'+Object.keys(vis).length+'</b> · Tổng thời gian: <b>'+Math.round(total)+' phút</b>'+
    (dn?' · Trung bình mỗi chặng: <b>'+(total/dn).toFixed(1)+' phút</b>':'')+' · Tổng số chữ tự viết: <b>'+writtenWords()+'</b></p>'+
    (per?'<p>Thời gian từng ngày: '+per+'</p>':'')+'</section>';
}

/* =========================================================
   PHẦN 5h · TK13: Cài đặt gọn · 5 tầng chạm mở · giữ để toàn màn hình · mở màn văn điệp
   ========================================================= */
/* Thẻ Cài đặt chuẩn của Proskills + phần riêng của TK: nhịp học và lời nhắc, Túi cứu viện */
function nbSettings(){
  var r=remind();
  var pc='<p class="small">Số ải mỗi ngày. Vòng tròn quanh nút bản đồ đầy dần khi đủ chỉ tiêu.</p><div class="chips">'+[1,2,3].map(function(n){ return '<button class="chp'+(pace()===n?' sel':'')+'" data-act="pace" data-n="'+n+'">'+n+' ải/ngày</button>'; }).join('')+'</div>'+
    '<p class="small" id="paceLn" style="margin:8px 0 12px">'+paceLine()+'</p>'+
    '<p class="small"><b>Lời nhắc học</b></p><p class="small" style="margin:4px 0 8px">Giờ tự học giờ đặt chung ở trang chủ Proskills, nhắc cho mọi khóa học.</p>'+
    '<div class="btnrow"><a class="btn btn--sm" href="'+PS.url('index.html?lich=nhac')+'">'+icon('next',16)+' Đặt giờ tự học ở trang chủ</a></div>';
  var sos='<div class="form">'+SOS_FIELDS.map(function(f){ return '<label>'+esc(f[1])+'<input class="inp" data-sos="'+f[0]+'" maxlength="40" value="'+esc((S.d.sos||{})[f[0]]||'')+'"></label>'; }).join('')+'</div>'+sosCardHTML()+
    '<div class="btnrow"><button class="btn btn--sm" data-act="sosSave">'+icon('download',16)+' Lưu thẻ thành ảnh</button></div>';
  return PS.settingsHTML({ ctx:'module', mod:TK_ID, ver:VERSION,
    pace:{ status:pace()+' ải/ngày', body:pc },
    extra:[{ k:'sos', ic:'phone', title:'Túi cứu viện', status:(S.d.sos&&S.d.sos.hd)?'Đã điền':'Chưa điền', body:sos }] });
}
/* --- Năm tầng quy định: chạm để mở --- */
var LAYERS5=[
  ['Luật Nhật Bản','Luật chung của nước Nhật (lao động, dân sự, hình sự, giao thông), áp dụng cho mọi người đang ở Nhật.','Trộm cắp dù chỉ 100 yên, đánh bạc ăn tiền, vừa đạp xe vừa dùng điện thoại.','Bị cảnh sát điều tra, phạt tiền hoặc phạt tù, kèm theo thường là bị cho về nước.'],
  ['Luật cư trú cho người nước ngoài','Luật Quản lý xuất nhập cảnh: quy định bạn được ở Nhật bao lâu, được làm gì theo tư cách lưu trú (TTS, Ikusei Shuro, Kỹ năng đặc định).','Luôn mang thẻ cư trú; chỉ làm ở nơi đã đăng ký; khai báo địa chỉ trong 14 ngày.','Bị phạt, bị thu hồi tư cách lưu trú, có thể bị trục xuất và cấm nhập cảnh nhiều năm.'],
  ['Luật Việt Nam','Luật số 69/2020/QH14 về người lao động Việt Nam đi làm việc ở nước ngoài theo hợp đồng.','Đi qua doanh nghiệp có giấy phép, thực hiện đúng hợp đồng đã ký, không ở lại nước ngoài trái phép.','Có thể bị xử phạt hành chính, phải bồi thường theo hợp đồng, ảnh hưởng đến cơ hội đi làm việc lần sau.'],
  ['Quy định của Hiệp hội','Nội quy của đơn vị quản lý bạn tại Nhật (Hiệp hội, Nghiệp đoàn). Mỗi nơi có thể khác nhau.','Không nên cho vay mượn tiền, chơi hụi; mua điện thoại nên báo trước người chỉ đạo.','Bị nhắc nhở, lập biên bản; vi phạm nặng có thể bị dừng chương trình.'],
  ['Quy định của công ty và KTX','Nội quy nơi làm việc và hợp đồng thuê nhà ở ký túc xá.','Đúng giờ; không quay phim trong xưởng khi chưa được phép; không đưa người ngoài vào ở; giữ yên lặng sau 10 giờ tối.','Bị nhắc nhở, lập biên bản, mất lòng tin; có thể ảnh hưởng đến chỗ ở của cả nhóm.']
];
STEP.layers = {
  view:function(s,x){
    x.seen=x.seen||[];
    var h=sayHTML('tan','hi','Sang Nhật, cháu giữ <b>năm tầng quy định</b> cùng một lúc. Một việc làm sai có thể phạm nhiều tầng. Ví dụ bỏ trốn: phạm luật cư trú, phá hợp đồng với công ty, và vi phạm nghĩa vụ theo luật Việt Nam.','say--tan')+
      '<p class="hint">Chạm vào từng tầng để xem tầng đó quy định gì.</p><div class="counter">'+icon('eye',18)+' Đã xem '+x.seen.length+'/5 tầng</div><div class="layers" id="layers">';
    LAYERS5.forEach(function(l,i){
      var op=x.open===i, sn=x.seen.indexOf(i)>=0;
      h+='<div class="layer2'+(op?' open':'')+'" style="--lc:'+LAYER_COL[i]+'"><button class="layer2__h" data-act="layer" data-i="'+i+'" aria-expanded="'+op+'"><i>'+(sn?icon('check',14,3):(i+1))+'</i><span>'+esc(l[0])+'</span>'+icon('next',16)+'</button>'+
        (op?'<div class="layer2__b"><p><b>Là gì:</b> '+esc(l[1])+'</p><p><b>Ví dụ:</b> '+esc(l[2])+'</p><p><b>Vi phạm thì sao:</b> '+esc(l[3])+'</p></div>':'')+'</div>';
    });
    h+='</div>';
    if(x.seen.length>=5) h+='<div class="fix"><b>Bỏ túi nhanh</b><p>Từ 1/4/2027, chế độ Ikusei Shuro thay thế Thực tập sinh. Luật Nhật, luật cư trú và luật Việt Nam vẫn áp dụng như nhau. Chỗ nào quy định riêng của hai diện khác nhau, khóa học sẽ ghi rõ.</p></div>';
    return h;
  },
  state:function(s,x){ x.seen=x.seen||[]; var n=5-x.seen.length; return n>0?{ok:false,msg:'Còn '+n+' tầng chưa xem',q:'#layers'}:{ok:true}; }
};
function layerTap(i){ var x=xs(CUR.id,CUR.i); x.seen=x.seen||[]; x.open = x.open===i ? null : i; if(x.seen.indexOf(i)<0){ x.seen.push(i); sfx('tap'); if(x.seen.length===5){ var g=addXP('layers.'+CUR.id,8,true); if(g) pointToast(g,0,'Đã xem đủ 5 tầng!'); } } save(); drawStep(); }

/* --- Giữ thanh điều hướng ~2 giây để bật toàn màn hình --- */
(function(){
  var t=null, fired=false;
  var nav=document.getElementById('nav'); if(!nav) return;
  var start=function(e){ fired=false; nav.classList.add('holding'); t=setTimeout(function(){ fired=true; nav.classList.remove('holding');
      var fsOK=document.fullscreenEnabled||document.webkitFullscreenEnabled;
      if(fsOK){ toggleFull(); if(navigator.vibrate) navigator.vibrate(30); }
      else toast('iPhone chưa cho trang web bật toàn màn hình. Hãy thêm khóa học vào màn hình chính để học toàn màn hình nhé.',5500);
    },1800); };
  var stop=function(){ clearTimeout(t); nav.classList.remove('holding'); };
  nav.addEventListener('pointerdown',start); ['pointerup','pointerleave','pointercancel'].forEach(function(ev){ nav.addEventListener(ev,stop); });
  nav.addEventListener('click',function(e){ if(fired){ e.stopPropagation(); e.preventDefault(); fired=false; } },true);
  nav.addEventListener('contextmenu',function(e){ e.preventDefault(); });
})();

/* --- Mở màn văn điệp sau khi qua cổng --- */
function gateIntro(done){
  if(noMotion()){ done(); return; }
  var el=document.createElement('div'); el.className='gin'; el.id='gin';
  el.innerHTML='<div class="gin__scroll"><div class="gin__rod"></div><div class="gin__paper"><div class="gin__in">'+
    '<p class="gin__l l1 jp">通関文牒</p><p class="gin__l l2">Văn điệp thông quan</p><p class="gin__l l3">cấp cho người lữ hành</p><p class="gin__l l4"><b>'+esc(S.name)+'</b></p><p class="gin__l l5">từ JPC đến xứ Phù Tang</p>'+
    '<div class="gin__seal">'+sealSVG('通',78)+'</div></div></div><div class="gin__rod"></div></div>'+
    '<button class="trn__skip" data-act="ginSkip">Bỏ qua '+icon('next',14)+'</button>';
  document.body.appendChild(el);
  tone(196,0,1.6,'sine',1.2); [523,587,659].forEach(function(f,i){ tone(f,.9+i*.45,.7,'sine',.35); });
  var T1=setTimeout(function(){ sfx('stamp'); },3300);
  var T2=setTimeout(function(){ el.classList.add('out'); },4600);
  var fin=function(){ clearTimeout(T1); clearTimeout(T2); clearTimeout(T3); if(!el.parentNode) return; el.remove(); done(); curtain(); };
  var T3=setTimeout(fin,5200);
  GINF=fin;
}
var GINF=null;
function curtain(){
  if(noMotion()) return;
  var c=document.createElement('div'); c.className='curt';
  c.innerHTML='<span class="cl">'+hcloud()+hcloud()+'</span><span class="cr">'+hcloud()+hcloud()+'</span>';
  document.body.appendChild(c); sfx('whoosh');
  var h=$('.mhau'); if(h) h.classList.add('flyin');
  setTimeout(function(){ c.remove(); },1700);
}

/* =========================================================
   PHẦN 6 · RƯƠNG KINH
   ========================================================= */
function openChest(n){
  var a=aiOf(n); if(!a.kinh || !a.acts.every(actDone)) return;
  if(n===8 && !S.seals[8]){ ceremony(); return; }
  var got=!!S.seals[n];
  var ov=document.createElement('div'); ov.className='ov chest'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true');
  ov.innerHTML='<div class="ov__box"><div class="badgeBig">'+sealSVG(a.badge.k,110)+'</div>'+
    '<p class="kicker">Huy hiệu mới</p><h2>'+esc(a.badge.n)+'</h2><p class="muted">'+esc(a.badge.d)+'</p>'+kinhHTML(a)+
    '<button class="btn btn--gold btn--full" data-act="'+(got?'closeOv':'claim')+'" data-n="'+n+'">'+(got?'Đóng':(n===8?'Nhận vé hoàn thành':'Đóng dấu vào văn điệp'))+'</button></div>';
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.remove(); });
  document.body.appendChild(ov); sfx('open');
}
function kinhHTML(a){
  var k=a.kinh, col=a.col||'#C98A12';
  return '<div class="bk" style="--kc:'+col+'"><div class="bk__h"><span class="bk__seal">'+sealSVG(a.badge?a.badge.k:a.k,40)+'</span><div><small>'+(a.n===8?'BÍ KÍP TRỌN BỘ':'CỬA ẢI '+pad(a.n)+' · '+esc(a.vn))+'</small><h3>'+esc(k.t)+'</h3></div></div>'+
    '<ul>'+k.p.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>'+
    (a.n===8 && myKinh() ? '<div class="bk__mine"><small>Trang không chữ, bạn đã viết</small><p>"'+esc(myKinh())+'"</p></div>' : '')+
    '<div class="bk__prov"><span class="jp">'+k.jp+'</span> '+spk(k.jp)+'<small>'+esc(k.ro)+'</small><p>'+esc(k.vi)+'</p></div></div>';
}
function myKinh(){ var x=S.d['x.f3.1']||{}; return String(x.kinh||'').trim(); }
function ticketHTML(){
  var seals=AIS.map(function(a){ return '<div class="seal on">'+sealSVG(a.badge?a.badge.k:a.k,40)+'</div>'; }).join('');
  return '<div class="ticket" id="ticket"><div class="ticket__h"><small>VÉ HOÀN THÀNH · '+esc(COURSE)+'</small><b>Nhật Bản Du Ký</b></div><div class="ticket__b">'+
    '<div class="row2"><div><small>Người lữ hành</small><strong>'+esc(S.name)+'</strong></div><div><small>Lớp · Diện</small><strong>'+esc(S.cls)+' · '+esc(S.path)+'</strong></div></div>'+
    '<div class="row2" style="margin-top:6px"><div><small>Lên đường</small><strong>'+fmtDate(S.created)+'</strong></div><div><small>Đến Phù Tang</small><strong>'+fmtDate(S.seals[8]||Date.now())+'</strong></div></div>'+
    '<div class="seals">'+seals+'</div>'+
    (myKinh()?'<div class="ticket__q">"'+esc(myKinh())+'"</div>':'')+'</div></div>';
}
function openTicket(){
  var ov=document.createElement('div'); ov.className='ov'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true');
  ov.innerHTML='<div class="ov__box"><div style="width:120px;margin:0 auto">'+av('hau','cheer')+'</div><h2>Đi đến nơi, về đến chốn</h2><p class="muted">'+T('Chúc mừng [Tên] đã đến xứ Phù Tang!')+'</p>'+ticketHTML()+
    '<div class="btnrow" style="justify-content:center"><button class="btn" data-act="ticketSave">'+icon('download',18)+' Lưu vé thành ảnh</button><button class="btn btn--soft" data-act="closeOv">Đóng</button></div></div>';
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.remove(); });
  document.body.appendChild(ov);
}
function ticketSave(){
  var q=myKinh();
  drawPNG(900, q?720:600, function(g,W,H){
    var gr=g.createLinearGradient(0,0,W,H); gr.addColorStop(0,'#FFF9EA'); gr.addColorStop(1,'#FFEFC4'); g.fillStyle=gr; g.fillRect(0,0,W,H);
    g.fillStyle='#2F4BD8'; g.fillRect(0,0,W,150);
    g.fillStyle='#F4B63B'; g.font='700 24px "Be Vietnam Pro",sans-serif'; g.fillText('VÉ HOÀN THÀNH · '+COURSE,48,58);
    g.fillStyle='#fff'; g.font='800 46px "Be Vietnam Pro",sans-serif'; g.fillText('Nhật Bản Du Ký',48,118);
    g.fillStyle='#8A6A1F'; g.font='500 22px "Be Vietnam Pro",sans-serif'; g.fillText('Người lữ hành',48,206); g.fillText('Lớp · Diện',500,206);
    g.fillText('Lên đường',48,296); g.fillText('Đến Phù Tang',500,296);
    g.fillStyle='#18203F'; g.font='700 32px "Be Vietnam Pro",sans-serif'; g.fillText(String(S.name),48,246); g.fillText(S.cls+' · '+S.path,500,246);
    g.fillText(fmtDate(S.created),48,336); g.fillText(fmtDate(S.seals[8]||Date.now()),500,336);
    AIS.forEach(function(a,i){ var cx=90+i*120, cy=440; g.save(); g.translate(cx,cy); g.rotate(-0.14);
      g.strokeStyle='#C8372D'; g.lineWidth=5; g.beginPath(); g.arc(0,0,46,0,Math.PI*2); g.stroke(); g.lineWidth=2; g.beginPath(); g.arc(0,0,37,0,Math.PI*2); g.stroke();
      g.fillStyle='#C8372D'; g.font='800 40px "M PLUS Rounded 1c","Hiragino Sans",sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(a.badge.k,0,2); g.restore(); });
    g.textAlign='left'; g.textBaseline='alphabetic';
    if(q){ g.fillStyle='#5A3B00'; g.font='italic 500 25px "Be Vietnam Pro",sans-serif'; wrapText(g,'"'+q+'"',48,560,W-96,34); }
    g.fillStyle='#8A6A1F'; g.font='500 20px "Be Vietnam Pro",sans-serif'; g.fillText('Proskills · JPC · Đi đến nơi, về đến chốn',48,H-40);
  }, 'Ve-hoan-thanh_'+norm(S.name)+'.png');
}
function claim(n){
  if(!S.seals[n]){ S.seals[n]=Date.now(); if(n!==8) S.d.sealNew=n; }
  var g=addXP('chest.'+n,n===8?100:50,true); save(true); sfx('badge');
  $$('.ov').forEach(function(o){ o.remove(); });
  go('home'); window.scrollTo(0,0);
  if(n===8){ setTimeout(openTicket, noMotion()?50:600); if(g) setTimeout(function(){ pointToast(g,0,'Đã đến Phù Tang!'); }, 900); }
  else if(g) setTimeout(function(){ pointToast(g,0,'Văn điệp đã có dấu Ải '+n+'!'); }, 700);
  if(n===3 && !S.d.horen && !S.demo) setTimeout(openHoren, 2600);
}

