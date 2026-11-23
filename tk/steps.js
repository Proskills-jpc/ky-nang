/* TK · Nhật Bản Du Ký · tk/steps.js · CÁC DẠNG BÀI (view, state, wire)
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* =========================================================
   PHẦN 5 · CÁC DẠNG BÀI
   mỗi dạng có: view (vẽ), state (đã đủ chưa), wire (gắn thao tác)
   ========================================================= */
function lawHTML(L,mood){
  var by=L.by||'tan';
  return '<div class="law"'+(by==='hau'?' style="border-left-color:var(--c)"':'')+'><div class="law__h"><div class="av">'+av(by, mood||(by==='tan'?'serious':'think'))+'</div><div><small'+(by==='hau'?' style="color:var(--c)"':'')+'>'+(by==='tan'?'Chú Tanaka giải thích':'Ngộ Không ghi chú')+'</small><b>'+esc(L.t)+'</b></div></div>'+
    (L.img==='veh'?vehRow():(L.img==='rec'?okReceipt():''))+'<ul>'+L.p.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>'+srcLine(L.src)+'</div>';
}
function ladderHTML(hit){
  var h='<div class="ladder"><div class="ladder__t">'+(hit==null?'Thang hậu quả · càng lên cao càng nặng':'Bạn đang ở nấc này trên thang hậu quả')+'</div>';
  for(var i=LADDER.length-1;i>=0;i--){
    var c = hit==null ? '' : (i===hit ? ' hit' : (i<hit?' pass':''));
    h+='<div class="rung'+c+'"><i>'+(i+1)+'</i><span>'+esc(LADDER[i])+'</span></div>';
  }
  return h+'</div>';
}
function revealHTML(s,ok){ if((s.foe||'ho')!=='ho' || !s.from) return ''; return '<div class="reveal"><div class="av">'+av('ho',ok?'angry':'sly')+'</div><span>"'+esc(s.from)+'" chính là một lốt của Hồ Ly Ba Mặt.</span></div>'; }
function fixHTML(t){ return '<div class="fix"><b>Nếu lỡ rồi thì sao?</b><p>'+esc(t)+'</p></div>'; }
function srcLine(t){ if(!t) return ''; return '<div class="src">'+icon('scroll',15)+'<span>Căn cứ: '+esc(t)+'</span></div>'; }

var STEP = {};

/* --- lời nhân vật --- */
STEP.say = {
  view:function(s){ return sayHTML(s.who, s.mood, T(s.text), s.who==='tan'?'say--tan':'')+(s.src?srcLine(s.src):''); },
  state:function(){ return {ok:true}; }
};

/* --- gặp nhân vật (băng chuyền) --- */
STEP.cast = {
  view:function(s,x){
    var cards=CAST.map(function(c,i){ var ch=CHAR[c.id];
      return '<article class="ccard" data-i="'+i+'"><button class="av avbtn" data-act="mood" data-c="'+c.id+'" data-m="0" aria-label="Đổi biểu cảm">'+av(c.id)+'</button><small style="background:'+c.bg+';color:'+c.fg+'">'+esc(c.role)+'</small><h3>'+esc(ch.n)+'</h3><p>'+esc(c.d)+'</p></article>'; }).join('');
    var dots=CAST.map(function(c,i){ return '<i class="'+(i===(x.cur||0)?'on':'')+'"></i>'; }).join('');
    return '<p class="hint">Vuốt sang để gặp đủ 5 nhân vật.</p><div class="car" id="car">'+cards+'</div>'+
      '<div class="cnav"><button data-act="carPrev" aria-label="Nhân vật trước">'+icon('back',18)+'</button><span class="dots" id="carDots">'+dots+'</span><button data-act="carNext" aria-label="Nhân vật sau">'+icon('next',18)+'</button></div>'+
      '<p class="small muted" style="text-align:center">Chạm vào từng nhân vật để xem các biểu cảm. '+esc(s.note)+'</p>';
  },
  state:function(s,x){ var m=x.max||0; return m>=CAST.length-1 ? {ok:true} : {ok:false, msg:'Đã gặp '+(m+1)+'/5 nhân vật', q:'#car'}; },
  wire:function(s,x){
    var car=$('#car'); if(!car) return;
    var upd=function(){
      var w=car.firstElementChild.getBoundingClientRect().width+12;
      var i=Math.max(0,Math.min(CAST.length-1, Math.round(car.scrollLeft/w)));
      if(car.scrollLeft+car.clientWidth >= car.scrollWidth-4) i=CAST.length-1;
      if(i!==x.cur){ x.cur=i; x.max=Math.max(x.max||0,i); save(); $$('#carDots i').forEach(function(d,j){ d.classList.toggle('on', j===i); }); drawBar(); }
    };
    car.addEventListener('scroll', function(){ clearTimeout(car._t); car._t=setTimeout(upd,60); }, {passive:true});
    if(x.cur){ var w=car.firstElementChild.getBoundingClientRect().width+12; car.scrollLeft=x.cur*w; }
  }
};
function carMove(d){ var car=$('#car'); if(!car) return; var w=car.firstElementChild.getBoundingClientRect().width+12; car.scrollBy({left:d*w, behavior:noMotion()?'auto':'smooth'}); }

/* --- giữ bài làm an toàn --- */
function safeList(){
  return '<ul style="margin:6px 0 0;padding-left:20px">'+
    '<li>Dùng một máy và một trình duyệt (Chrome, Safari…) suốt khóa.</li>'+
    '<li>Không mở khóa học trong Zalo hay Messenger, không dùng tab ẩn danh.</li>'+
    '<li>Thêm ứng dụng Proskills vào màn hình chính ngay hôm nay. Trên iPhone, bài làm trong biểu tượng và trong Safari lưu riêng nhau.</li>'+
    '<li>Sau mỗi ải, vào Sổ tay › Cài đặt để tải tập tin sao lưu.</li></ul>';
}
STEP.safe = {
  view:function(){ return '<div class="card"><h3>Giữ bài làm an toàn</h3><p class="hint" style="margin-top:4px">Bài làm của bạn lưu ngay trên máy này, không cần tài khoản.</p>'+safeList()+'</div>'+
    sayHTML('hau','cheer',T('Xong rồi! [Tên] bấm "Hoàn thành" để nhận con dấu đầu tiên nhé.')); },
  state:function(){ return {ok:true}; }
};

/* --- năm tầng quy định --- */
var LAYER_COL=['#172263','#1F2F8F','#2840BA','#3753D6','#5470E3'];
STEP.layers = {
  view:function(){
    var L=[['Luật Nhật Bản','lao động, dân sự, hình sự: áp dụng cho mọi người'],['Luật cư trú cho người nước ngoài','khác nhau theo từng diện: TTS, Ikusei Shuro, Kỹ năng đặc định'],['Luật Việt Nam','cho người lao động đi làm việc ở nước ngoài'],['Quy định của Hiệp hội','đơn vị quản lý bạn tại Nhật'],['Quy định của công ty và KTX','nơi bạn làm việc và nơi bạn ở']];
    return sayHTML('tan','hi', 'Sang Nhật, cháu giữ <b>năm tầng quy định</b> cùng một lúc. Một việc làm sai có thể phạm nhiều tầng. Ví dụ bỏ trốn: phạm luật cư trú, phá hợp đồng với công ty, và vi phạm nghĩa vụ theo luật Việt Nam.', 'say--tan')+
      '<div class="layers">'+L.map(function(l,i){ return '<div class="layer" style="background:'+LAYER_COL[i]+'"><i>'+(i+1)+'</i><span>'+esc(l[0])+'<br><span style="font-weight:400;font-size:13px;opacity:.85">'+esc(l[1])+'</span></span></div>'; }).join('')+'</div>'+
      '<div class="fix"><b>Bỏ túi nhanh</b><p>Từ 1/4/2027, chế độ Ikusei Shuro thay thế Thực tập sinh. Luật Nhật, luật cư trú và luật Việt Nam vẫn áp dụng như nhau. Chỗ nào quy định riêng của hai diện khác nhau, khóa học sẽ ghi rõ.</p></div>'+
      '';
  },
  state:function(){ return {ok:true}; }
};

/* --- phân loại vào tầng --- */
STEP.classify = {
  view:function(s,x){
    x.a=x.a||{};
    var h='<p class="hint">'+esc(s.intro)+'</p>';
    s.items.forEach(function(it,i){
      var r=x.a[i]||{};
      h+='<div class="cls" id="cls'+i+'"><div class="cls__q">'+esc(it.t)+'</div><div class="chips">'+
        s.cats.map(function(c,j){
          if(r.ok && j!==it.a) return '';
          var cl = r.ok && j===it.a ? ' right' : ((r.bad||[]).indexOf(j)>=0 ? ' wrong' : '');
          return '<button class="chp'+cl+'" data-act="cls" data-i="'+i+'" data-j="'+j+'" '+(r.ok?'disabled':'')+'>'+esc(c)+'</button>';
        }).join('')+'</div>'+
        (r.ok ? '<div class="fb ok"><span class="verdict">Đúng rồi!</span> '+esc(it.why)+'</div>' : ((r.bad||[]).length ? '<div class="fb no"><span class="verdict">Thử lại nhé.</span> Ai đặt ra quy định này?</div>' : ''))+
        '</div>';
    });
    return h;
  },
  state:function(s,x){ x.a=x.a||{}; var left=s.items.filter(function(it,i){ return !(x.a[i]&&x.a[i].ok); }).length;
    if(!left) return {ok:true};
    var first=s.items.findIndex(function(it,i){ return !(x.a[i]&&x.a[i].ok); });
    return {ok:false, msg:'Còn '+left+' quy định chưa xếp', q:'#cls'+first}; }
};
function clsPick(i,j){
  var s=CUR.s, x=xs(CUR.id,CUR.i); x.a=x.a||{}; var r=x.a[i]=x.a[i]||{bad:[]};
  if(r.ok) return;
  if(j===s.items[i].a){ r.ok=1; sfx('ok'); if(!r.bad.length) addXP('cls.'+CUR.id+'.'+i, 2, true); }
  else { if(r.bad.indexOf(j)<0) r.bad.push(j); sfx('no'); }
  save(); drawStep();
}

/* --- thang hậu quả --- */
STEP.ladder = {
  view:function(){
    return '<h3>Thang hậu quả</h3><p class="hint" style="margin-top:4px">Ở mỗi ải, khi bạn chọn sai, Chú Tanaka sẽ chỉ ra bạn có thể bị nhắc nhở hay xử phạt mức độ nào trên thang này.</p>'+
      ladderHTML(null)+

      sayHTML('hau','cheer',T('Nhưng [Tên] đừng lo. Biết trước chiếc "thang hậu quả" này là để bạn tránh không bao giờ phải bước lên nó.'));
  },
  state:function(){ return {ok:true}; }
};

/* --- đúng/sai nhanh --- */
STEP.tf = {
  view:function(s,x){
    x.a=x.a||{};
    return s.items.map(function(it,i){
      var v=x.a[i];
      return '<div class="tf" id="tf'+i+'"><div class="tf__q">'+esc(it.t)+'</div>'+
        (v==null ? '<div class="tf__b"><button class="btn btn--soft" data-act="tf" data-i="'+i+'" data-v="1">Đúng</button><button class="btn btn--soft" data-act="tf" data-i="'+i+'" data-v="0">Sai</button></div>'
         : '<div class="out '+((v===it.a)?'out--good':'out--bad')+'"><p><span class="verdict">'+(v===it.a?'Đúng rồi!':'Chưa đúng.')+'</span> Câu này '+(it.a?'đúng':'sai')+'. '+esc(it.why)+'</p></div>')+
        '</div>';
    }).join('');
  },
  state:function(s,x){ x.a=x.a||{}; var left=s.items.filter(function(it,i){ return x.a[i]==null; }).length;
    return left ? {ok:false, msg:'Còn '+left+' câu', q:'#tf'+s.items.findIndex(function(it,i){ return x.a[i]==null; })} : {ok:true}; }
};

/* --- ngã rẽ --- */
STEP.branch = {
  view:function(s,x){
    x.tried=x.tried||[];
    var L='ABC';
    var h='<h3>'+esc(s.title)+'</h3>'+(s.img?'<div class="bimg">'+illus(s.img)+'</div>':'')+(s.real?'<span class="real">Dựa trên chuyện đã từng xảy ra</span>':'')+'<p class="ctx">'+T(s.ctx)+'</p>'+
      (s.msgs && s.msgs.length ? '<div class="phone"><div class="phone__top"><div class="pav">'+esc(s.from.split(' ').pop().charAt(0))+'</div><div><b>'+esc(s.from)+'</b><small>'+esc(s.sub)+'</small></div></div>'+
      s.msgs.map(function(m){ return '<div class="bub">'+T(m)+'</div>'; }).join('')+'</div>' : '')+
      (s.whisper ? (x.solved ? sayHTML('yeu','deflated', '<span>"'+T(s.whisper)+'"</span><br><b style="font-style:normal;color:#3F7A22">Xì… Yêu xẹp lép rồi!</b>') : sayHTML('yeu','whisper', '<span>"'+T(s.whisper)+'"</span>')) : '');
    if(!x.solved){
      h+= x.soi ? sayHTML('hau','soi','<b>Hỏa nhãn soi thấy:</b><ul class="soi__ul">'+s.flags.map(function(f){ return '<li>'+esc(f)+'</li>'; }).join('')+'</ul>','say--soi')
               : '<button class="soi" data-act="soi">'+icon('eye',20)+'<span>Soi bằng hỏa nhãn: xem dấu hiệu đáng ngờ</span></button>';
    }
    h+='<p class="hint" style="margin-top:4px"><b>Bạn sẽ làm gì?</b></p><div class="opts" id="opts">';
    s.opts.forEach(function(o,i){
      var cls = x.pick===i ? (o.ok?' good':' bad') : (x.tried.indexOf(i)>=0 ? ' bad' : (x.solved&&o.ok?' good':''));
      var dis = x.solved || x.pick!=null || x.tried.indexOf(i)>=0;
      h+='<button class="opt'+cls+'" data-act="pick" data-i="'+i+'" '+(dis?'disabled':'')+'><i>'+L[i]+'</i><span>'+esc(o.t)+'</span></button>';
    });
    h+='</div>';
    if(x.pick!=null){
      var o=s.opts[x.pick];
      if(o.ok){
        h+='<div class="out out--good" id="outc"><div class="out__t">'+icon('check',20)+' '+esc(o.out.t)+'</div><p>'+T(o.out.p)+'</p>'+revealHTML(s,1)+'</div>'+lawHTML(s.law,'praise')+(x.fixSeen?'':fixHTML(s.fix));
      } else {
        h+='<div class="out out--bad" id="outc"><div class="out__t">'+esc(o.out.t)+'</div><p>'+T(o.out.p)+'</p>'+revealHTML(s,0)+goalHit(o.out.r)+'</div>'+(o.out.r!=null?ladderHTML(o.out.r):'')+fixHTML(s.fix)+
          '<button class="btn btn--gold btn--full invite retrybtn" data-act="retry">'+icon('redo',18)+' Thử chọn lại</button>';
      }
    }
    return h;
  },
  state:function(s,x){
    if(x.solved) return {ok:true};
    if(x.pick!=null) return {ok:false, msg:'Bấm "Thử chọn lại" để chọn lối khác', q:'[data-act=retry]'};
    return {ok:false, msg:'Chọn một lối đi', q:'#opts'};
  }
};
function branchPick(i){
  var s=CUR.s, x=xs(CUR.id,CUR.i); if(x.solved||x.pick!=null) return;
  x.tried=x.tried||[]; x.pick=i;
  if(s.opts[i].ok){
    x.solved=1; sfx('ok');
    var g=addXP('br.'+CUR.id+'.'+CUR.i, x.tried.length?10:20, true);
    pointToast(g,0, x.tried.length?'Đúng rồi!':'Đúng ngay lần đầu!');
  } else { x.tried.push(i); sfx('no'); }
  save(); drawStep();
  setTimeout(function(){ var o=$('#outc'); if(o) o.scrollIntoView({behavior:noMotion()?'auto':'smooth', block:'start'}); }, 60);
}
function branchRetry(){
  var x=xs(CUR.id,CUR.i); x.pick=null; x.fixSeen=1; save(); drawStep();
  setTimeout(function(){ var o=$('#opts'); if(o) o.scrollIntoView({behavior:noMotion()?'auto':'smooth', block:'center'}); }, 60);
}

/* --- hỏa nhãn: tìm dấu hiệu trong bài đăng --- */
STEP.flags = {
  view:function(s,x){
    x.f=x.f||[]; x.c=x.c||[];
    var total=s.segs.filter(function(g){ return g.f; }).length;
    var h='<p class="hint">'+esc(s.intro)+'</p>'+
      '<div class="counter" id="flagCount">'+icon('eye',18)+' Đã soi ra <span class="dots">'+s.segs.filter(function(g){return g.f;}).map(function(g,k){ return '<i class="'+(k<x.f.length?'on':'')+'"></i>'; }).join('')+'</span> '+x.f.length+'/'+total+'</div>'+
      (x.msg?'<p class="small" style="margin:6px 0 0;color:var(--ink-2)">'+esc(x.msg)+'</p>':'')+
      (s.doc ? '<div class="receipt" id="post"><h4>GIẤY BIÊN NHẬN</h4><div class="post__t">' : '<div class="post" id="post"><div class="post__h"><div class="pav">VL</div><div><b>'+esc(s.from)+'</b><small>'+esc(s.sub)+'</small></div></div><div class="post__t">')+
      s.segs.map(function(g,i){
        var c = x.f.indexOf(i)>=0 ? ' found' : (x.c.indexOf(i)>=0 ? ' calm' : '');
        return '<span role="button" tabindex="0" class="seg'+c+'" data-act="seg" data-i="'+i+'">'+esc(g.t.trim())+'</span> ';
      }).join('')+'</div></div>';
    if(x.f.length){
      h+='<div class="found-list">'+x.f.map(function(i,k){ return '<div><i>'+(k+1)+'</i><span><b>'+esc(s.segs[i].t.trim())+'</b> · '+esc(s.segs[i].why)+'</span></div>'; }).join('')+'</div>';
    }
    if(x.f.length===total) h+=lawHTML(s.law);
    return h;
  },
  state:function(s,x){ x.f=x.f||[]; var total=s.segs.filter(function(g){ return g.f; }).length;
    return x.f.length>=total ? {ok:true} : {ok:false, msg:'Còn '+(total-x.f.length)+' dấu hiệu chưa soi ra', q:'#post'}; }
};
function segTap(i){
  var s=CUR.s, x=xs(CUR.id,CUR.i); x.f=x.f||[]; x.c=x.c||[];
  if(s.segs[i].f){ if(x.f.indexOf(i)<0){ x.f.push(i); x.msg=''; sfx('ok'); } }
  else { if(x.c.indexOf(i)<0) x.c.push(i); sfx('tap'); x.msg='Câu "'+s.segs[i].t.trim()+'" nghe bình thường. Tìm tiếp nhé.'; }
  var total=s.segs.filter(function(g){ return g.f; }).length;
  save(); drawStep();
  if(x.f.length===total){ var g=addXP('fl.'+CUR.id+'.'+CUR.i, 15, true); if(g) pointToast(g,0,'Soi ra đủ '+total+' dấu hiệu!'); }
}

/* --- bẫy hay an toàn --- */
STEP.swipe = {
  view:function(s,x){
    if(!x.q){ x.q=s.cards.map(function(c,i){ return i; }); x.ok=[]; x.shown=null; }
    var nOK=x.ok.length, N=s.cards.length, LB=s.labels||{trap:'Bẫy',safe:'An toàn'};
    var h='<p class="hint">'+esc(s.intro)+'</p><div class="counter">'+icon('check',18)+' Đúng '+nOK+'/'+N+'</div>';
    if(x.shown!=null){
      var c=s.cards[x.shown], right=x.last===c.a;
      h+=(s.suitcase?suitHTML(s,x):'')+'<div class="dcard">'+(c.ic?'<span class="dic">'+illus(c.ic)+'</span>':'')+'<small>'+(s.labels?(c.a==='trap'?'Việc không nên làm':'Việc nên làm'):(c.a==='trap'?'Đây là bẫy':'Đây là việc an toàn'))+'</small>'+esc(c.t)+'</div>'+
        '<div class="out '+(right?'out--good':'out--bad')+'"><p><span class="verdict">'+(right?'Đúng rồi!':'Thử lại nhé.')+'</span> '+esc(c.why)+(right?'':' Thẻ này sẽ quay lại sau.')+'</p></div>'+
        '<button class="btn btn--soft btn--full" data-act="swNext" id="swNext">'+(x.q.length?'Thẻ tiếp theo':'Xem kết quả')+'</button>';
    } else if(x.q.length){
      var cc=s.cards[x.q[0]];
      h+=(s.suitcase?suitHTML(s,x):'')+'<div class="deck" id="deck"><div class="dcard" id="dcard">'+(cc.ic?'<span class="dic">'+illus(cc.ic)+'</span>':'')+'<small>Việc '+(N-x.q.length+1)+' / '+N+'</small>'+esc(cc.t)+'</div></div>'+
        '<div class="swbtns"><button class="btn trap" data-act="sw" data-v="trap">'+esc(LB.trap)+'</button><button class="btn safe" data-act="sw" data-v="safe">'+esc(LB.safe)+'</button></div>'+
        '<p class="swhint">Quẹt trái: '+esc(LB.trap.toLowerCase())+' · quẹt phải: '+esc(LB.safe.toLowerCase())+'</p>';
    } else {
      h+=(s.suitcase?suitHTML(s,x):'')+'<div class="out out--good"><div class="out__t">'+icon('check',20)+' Bạn phân loại đúng cả '+N+' việc</div><p>'+(s.labels?'Bạn đã biết rõ việc nào nên và không nên làm.':'Nhớ nhé: việc an toàn luôn có giấy tờ, có hóa đơn, không cần giấu ai.')+'</p></div>'+srcLine(s.src);
    }
    return h;
  },
  state:function(s,x){ if(!x.q) return {ok:false,msg:'Còn '+s.cards.length+' thẻ',q:'#deck'}; return (x.ok.length>=s.cards.length && x.shown==null) ? {ok:true} : {ok:false, msg: x.shown!=null?'Bấm "'+(x.q.length?'Thẻ tiếp theo':'Xem kết quả')+'"':'Còn '+(s.cards.length-x.ok.length)+' thẻ chưa đúng', q: x.shown!=null?'#swNext':'#deck'}; },
  wire:function(s,x){
    var c=$('#dcard'); if(!c) return;
    var sx=0, dx=0, on=false;
    c.addEventListener('pointerdown', function(e){ on=true; sx=e.clientX; dx=0; c.classList.add('dragging'); try{ c.setPointerCapture(e.pointerId); }catch(er){} });
    c.addEventListener('pointermove', function(e){ if(!on) return; dx=e.clientX-sx; c.style.transform='translateX('+dx+'px) rotate('+(dx/18)+'deg)'; c.style.borderColor = dx<-30?'var(--no)':(dx>30?'var(--ok)':''); });
    var end=function(){ if(!on) return; on=false; c.classList.remove('dragging');
      if(Math.abs(dx)>80){ c.style.transform='translateX('+(dx>0?400:-400)+'px) rotate('+(dx/10)+'deg)'; c.style.opacity='0'; setTimeout(function(){ swAnswer(dx>0?'safe':'trap'); }, noMotion()?0:220); }
      else { c.style.transform=''; c.style.borderColor=''; } };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
  }
};
function suitHTML(s,x){ var it=s.cards.map(function(c,i){ return c.it?{k:c.it,on:(x.ok||[]).indexOf(i)>=0}:null; }).filter(Boolean); var n=it.filter(function(z){ return z.on; }).length; return '<div class="suitbox">'+suitcaseSVG(it)+'<p>Hành lý trước ngày về: <b>'+n+'/'+it.length+'</b> việc đã xong</p></div>'; }
function swAnswer(v){
  var s=CUR.s, x=xs(CUR.id,CUR.i); if(x.shown!=null || !x.q.length) return;
  var i=x.q.shift(); x.last=v; x.shown=i;
  if(s.cards[i].a===v){ if(x.ok.indexOf(i)<0) x.ok.push(i); sfx('ok'); } else { x.q.push(i); sfx('no'); }
  save(); drawStep();
}
function swNext(){
  var s=CUR.s, x=xs(CUR.id,CUR.i); x.shown=null; save(); drawStep();
  if(!x.q.length){ var g=addXP('sw.'+CUR.id+'.'+CUR.i, 10, true); if(g) pointToast(g,0,'Phân loại xong!'); }
}

/* --- bản đồ cứu viện --- */
STEP.channels = {
  view:function(){
    var C=[
      ['people','Người hướng dẫn ở công ty','Việc hằng ngày ở xưởng, ở KTX. Người gần bạn nhất.'],
      ['building','Hiệp hội (đơn vị quản lý)','Khi cần tư vấn thêm, hoặc công ty chưa giải quyết được.'],
      ['people','Esuhai tại Nhật','Anh chị Esuhai nói tiếng Việt, đồng hành cùng bạn suốt chương trình.'],
      ['phone','OTIT 0120-250-168 · tiếng Việt, miễn phí','Thứ Hai đến Thứ Sáu 11:00–19:00, Thứ Bảy 9:00–17:00. Bị đánh, bị đe dọa, bị ép về nước: nghe hướng dẫn xong bấm phím 1.'],
      ['siren','Cảnh sát 110 · Cứu thương, cứu hỏa 119','Khi có nguy hiểm trước mắt.','em'],
      ['siren','Cảnh sát tư vấn #9110','Khi cần hỏi cảnh sát nhưng chưa khẩn cấp.']
    ];
    return sayHTML('hau','hi',T('Trong truyện, mỗi khi gặp yêu quái quá mạnh, Ngộ Không biết đi cầu cứu đúng người. [Tên] cũng cần biết gọi ai.'))+
      '<div class="dial"><div class="dial__top"><span>9:41</span><b>Danh bạ cứu viện</b><span>'+icon('phone',14)+'</span></div><div class="dial__sos"><div><b>110</b><small>Cảnh sát</small></div><div><b>119</b><small>Cứu thương · cứu hỏa</small></div></div><div class="chan">'+C.map(function(c){ return '<div class="'+(c[3]||'')+'"><span class="ic">'+icon(c[0],20)+'</span><span><b>'+esc(c[1])+'</b><small>'+esc(c[2])+'</small></span></div>'; }).join('')+'</div></div>'+
      '<div class="fix"><b>Bỏ túi nhanh</b><p>Thường thì báo từng bước, bắt đầu từ người gần mình nhất. Nhưng khi bị bạo lực, đe dọa hay bị giữ giấy tờ, bạn được gọi thẳng cảnh sát hoặc OTIT. Luật cấm công ty, Hiệp hội xử lý bất lợi với bạn vì đã tố cáo vi phạm.</p></div>'+
      '<p class="small muted">Khi chế độ Ikusei Shuro bắt đầu (4/2027), tên tổ chức và số điện thoại có thể thay đổi. Esuhai sẽ cập nhật cho bạn.</p>'+
      srcLine(L_TTKN+', Điều 49 (quyền tố cáo) · '+SRC_SOTAY+', mục 13–14');
  },
  state:function(){ return {ok:true}; }
};

/* --- chọn người liên hệ theo tình huống --- */
STEP.sits = {
  view:function(s,x){
    x.r=x.r||{};
    var h='<p class="hint">'+esc(s.intro)+'</p>';
    s.sits.forEach(function(st,i){
      var r=x.r[i]=x.r[i]||{sel:[]};
      h+='<div class="sit" id="sit'+i+'"><div class="sit__q">'+(i+1)+'. '+esc(st.t)+'</div><div class="chips">'+
        s.chips.map(function(c,j){ if(r.ok && r.sel.indexOf(j)<0) return ''; return '<button class="chp'+(r.sel.indexOf(j)>=0?' sel':'')+'" data-act="chip" data-i="'+i+'" data-j="'+j+'" '+(r.ok?'disabled':'')+' aria-pressed="'+(r.sel.indexOf(j)>=0)+'">'+esc(c)+'</button>'; }).join('')+'</div>'+
        (r.ok ? '<div class="fb ok"><span class="verdict">Đúng rồi!</span> '+esc(st.why)+'</div>' :
          (r.fb ? '<div class="fb no"><span class="verdict">Thử lại nhé.</span> '+esc(r.fb)+'</div>' : '')+
          '<div style="margin-top:10px"><button class="btn btn--sm" data-act="sitCheck" data-i="'+i+'" '+(r.sel.length?'':'disabled')+'>Kiểm tra</button></div>')+
        '</div>';
    });
    return h;
  },
  state:function(s,x){ x.r=x.r||{}; var first=-1, left=0; s.sits.forEach(function(st,i){ if(!(x.r[i]&&x.r[i].ok)){ left++; if(first<0) first=i; } });
    return left ? {ok:false, msg:'Còn '+left+' tình huống', q:'#sit'+first} : {ok:true}; }
};
function chipTap(i,j){ var x=xs(CUR.id,CUR.i); var r=x.r[i]; if(r.ok) return; var k=r.sel.indexOf(j); if(k>=0) r.sel.splice(k,1); else r.sel.push(j); r.fb=''; save(); drawStep(); }
function sitCheck(i){
  var s=CUR.s, x=xs(CUR.id,CUR.i), st=s.sits[i], r=x.r[i];
  var bad=r.sel.filter(function(j){ return st.bad.indexOf(j)>=0; });
  var good=r.sel.some(function(j){ return st.good.indexOf(j)>=0; });
  var must=st.must.every(function(j){ return r.sel.indexOf(j)>=0; });
  if(!bad.length && good && must){ r.ok=1; r.fb=''; sfx('ok'); if(!r.tries) addXP('sit.'+CUR.id+'.'+i, 5, true); }
  else {
    r.tries=(r.tries||0)+1; sfx('no');
    r.fb = bad.length ? '"'+s.chips[bad[0]]+'" chưa phải lựa chọn tốt trong tình huống này.' : (!must ? 'Tình huống này có nguy hiểm trước mắt. Bạn cần gọi ngay một số khẩn cấp.' : 'Chọn thêm người có thể giúp bạn.');
  }
  save(); drawStep();
}

/* --- viết --- */
STEP.write = {
  view:function(s,x){
    var h='<p class="hint">'+esc(s.intro)+'</p>';
    s.fields.forEach(function(f){
      h+='<div class="wfield card" id="wf_'+f.key+'"><div class="formula">'+esc(f.label)+'</div><textarea class="inp" data-w="'+f.key+'" placeholder="'+esc(f.ph)+'">'+esc(x[f.key]||'')+'</textarea><div class="wc" id="wc_'+f.key+'"></div></div>';
    });
    if(s.opt){ var o=s.opt;
      h+='<div class="wfield card" id="wf_'+o.key+'"><div class="formula">'+esc(o.label)+'</div><textarea class="inp" data-w="'+o.key+'" placeholder="'+esc(o.ph)+'">'+esc(x[o.key]||'')+'</textarea><div class="wc" id="wc_'+o.key+'"></div></div>';
    }
    return h;
  },
  state:function(s,x){
    var all=s.fields.concat(s.opt?[s.opt]:[]);
    var miss=all.filter(function(f){ return words(x[f.key])<(f.min||4); });
    return miss.length ? {ok:false, msg:'Còn '+miss.length+' câu chưa viết', q:'#wf_'+miss[0].key} : {ok:true};
  },
  wire:function(s,x){
    var upd=function(key){ var n=words(x[key]); var el=$('#wc_'+key); if(el) el.textContent = n>8 ? (n>=20?'Đã đủ 20 chữ · +5 Insight':n+'/20 chữ để +5 Insight') : ''; };
    $$('textarea[data-w]').forEach(function(t){
      var key=t.getAttribute('data-w'); upd(key);
      t.addEventListener('input', function(){
        x[key]=t.value; save(); upd(key); drawBar();
        if(words(t.value)>=20){ var g=setIns('w.'+CUR.id+'.'+key,5); if(g) pointToast(0,g); }
      });
      t.addEventListener('focus', function(){ setTimeout(function(){ var r=t.getBoundingClientRect(), vh=(window.visualViewport?visualViewport.height:innerHeight); if(r.bottom>vh-20) window.scrollBy({top:r.bottom-vh+40, behavior:'smooth'}); }, 350); });
    });
  }
};

/* --- đọc thẻ cư trú (minh họa) --- */
var RC_FIELDS = [
  {k:'ten', lbl:'Họ tên, ảnh', why:'Thẻ mang tên và ảnh của bạn. Cho người khác mượn là phạm luật, vì thẻ có thể bị dùng làm giấy tờ giả.'},
  {k:'tc', lbl:'Tư cách lưu trú', why:'Ghi diện của bạn. Diện quyết định bạn được làm gì ở Nhật.'},
  {k:'han', lbl:'Thời hạn lưu trú', why:'Ngày cuối cùng bạn được ở Nhật, trừ khi đã gia hạn. Ở quá ngày này là cư trú bất hợp pháp.'},
  {k:'lam', lbl:'Hạn chế làm việc', why:'Đây là lý do bạn không được làm thêm, không bật kiếm tiền trên mạng, không buôn bán.'},
  {k:'hl', lbl:'Thẻ có hiệu lực đến', why:'Thẻ có ngày hết hiệu lực riêng. Nhớ để ý khi gia hạn.'},
  {k:'dc', lbl:'Địa chỉ (mặt sau)', why:'Trong 14 ngày sau khi có chỗ ở, phải khai báo địa chỉ ở tòa hành chính. Địa chỉ được ghi ở mặt sau thẻ. Bạn chỉ sống ở nơi công ty chỉ định.'}
];
function rcVal(k){
  var p=S.path||'';
  var tc = p==='Ikusei Shuro' ? 'Ikusei Shuro 育成就労' : (p==='Kỹ năng đặc định' ? 'Kỹ năng đặc định 特定技能' : 'Thực tập kỹ năng 技能実習');
  var lam = (p==='Ikusei Shuro'||p==='Kỹ năng đặc định') ? 'Chỉ làm đúng công việc được cho phép' : 'Không được làm việc khác ngoài thực tập kỹ năng';
  var cy=new Date().getFullYear();
  return {ten:esc(String(S.name||'').toUpperCase()), tc:tc, han:'xx/xx/'+(cy+1), lam:lam, hl:'xx/xx/'+(cy+1), dc:'(chưa ghi)'}[k];
}
STEP.rcard = {
  view:function(s,x){
    x.seen=x.seen||[];
    var btn=function(f,cls){ var i=RC_FIELDS.indexOf(f); return '<button class="rcf'+(x.seen.indexOf(f.k)>=0?' on':'')+(cls||'')+'" data-act="rcf" data-k="'+f.k+'"><small>'+esc(f.lbl)+'</small>'+(f.k==='ten'?rcVal('ten'):esc(rcVal(f.k)))+'</button>'; };
    var F=function(k){ return RC_FIELDS.filter(function(f){ return f.k===k; })[0]; };
    var h='<p class="hint">'+esc(s.intro)+'</p>'+
      '<div class="rc rc--real" id="rcard"><div class="rc__h"><b>在留カード <small>RESIDENCE CARD</small></b><span>No. AB12345678CD</span></div>'+
      '<div class="rc__g"><div class="rc__f">'+btn(F('ten'))+btn(F('tc'))+btn(F('han'))+btn(F('lam'))+btn(F('hl'))+'</div>'+
      '<button class="rc__ph'+(x.seen.indexOf('ten')>=0?' on':'')+'" data-act="rcf" data-k="ten" aria-label="Ảnh"><svg viewBox="0 0 60 72"><rect width="60" height="72" rx="4" fill="#DCE3FF"/><circle cx="30" cy="28" r="13" fill="#8C93B0"/><path d="M8 72q4-24 22-24t22 24z" fill="#8C93B0"/></svg></button></div>'+
      '</div><div class="rc rc--real rc--back"><div class="rc__h"><b>Mặt sau</b><span>住居地記載欄 · 資格外活動許可欄</span></div>'+btn(F('dc'))+'<div class="rc__perm"><small>Ô xin phép hoạt động ngoài tư cách</small><span>(TTS thường để trống)</span></div></div>'+
      '<p class="rc__note">Hình minh họa để học, không phải mẫu thẻ thật.</p>';
    if(x.seen.length){
      h+='<div class="found-list">'+x.seen.map(function(k,i){ var f=F(k); return '<div><i style="background:var(--ok)">'+(i+1)+'</i><span><b>'+esc(f.lbl)+'</b> · '+esc(f.why)+'</span></div>'; }).join('')+'</div>';
    }
    if(x.seen.length===RC_FIELDS.length) h+=srcLine(L_XNC+' · '+SRC_SOTAY+', mục 10 · '+SOTAY24);
    return h;
  },
  state:function(s,x){ x.seen=x.seen||[]; var l=RC_FIELDS.length-x.seen.length; return l ? {ok:false,msg:'Còn '+l+' ô chưa đọc',q:'#rcard'} : {ok:true}; }
};
function rcTap(k){ var x=xs(CUR.id,CUR.i); x.seen=x.seen||[]; if(x.seen.indexOf(k)<0){ x.seen.push(k); sfx('tap'); save(); drawStep(); if(x.seen.length===RC_FIELDS.length){ var g=addXP('rc.'+CUR.id+'.'+CUR.i,10,true); if(g) pointToast(g,0,'Đọc xong thẻ bài!'); } } }

/* --- sắp thứ tự --- */
STEP.order = {
  view:function(s,x){
    if(!x.mix){ var m=s.items.map(function(t,i){ return i; }); for(var i=m.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=m[i]; m[i]=m[j]; m[j]=t; } if(m.join()===s.items.map(function(t,i){return i;}).join()) m.reverse(); x.mix=m; x.seq=[]; }
    var done=x.seq.length===s.items.length;
    var h='<p class="hint">'+esc(s.intro)+'</p><div class="ord" id="ord">';
    x.mix.forEach(function(i){
      var pos=x.seq.indexOf(i);
      h+='<button class="ordi'+(pos>=0?(done?' ok':' on'):'')+'" data-act="ord" data-i="'+i+'" '+(pos>=0||done?'disabled':'')+'><i>'+(pos>=0?pos+1:'')+'</i><span>'+esc(s.items[i])+'</span></button>';
    });
    h+='</div>';
    if(x.msg && !done) h+='<div class="out out--bad"><p><span class="verdict">Chưa đúng thứ tự.</span> '+esc(x.msg)+'</p></div>';
    if(done) h+=(s.spiral?'<div class="spwrap">'+spiralSVG(s.items)+'<ol class="splist">'+s.items.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ol></div>':'')+'<div class="out out--good"><div class="out__t">'+icon('check',20)+' Đúng thứ tự</div><p>'+esc(s.done)+'</p></div>'+srcLine(s.src);
    return h;
  },
  state:function(s,x){ return (x.seq && x.seq.length===s.items.length) ? {ok:true} : {ok:false,msg:'Sắp xếp đủ '+s.items.length+' việc',q:'#ord'}; }
};
function ordTap(i){
  var s=CUR.s, x=xs(CUR.id,CUR.i);
  if(i===x.seq.length){ x.seq.push(i); x.msg=''; sfx(x.seq.length===s.items.length?'ok':'tap'); if(x.seq.length===s.items.length){ var g=addXP('ord.'+CUR.id+'.'+CUR.i,10,true); if(g) pointToast(g,0,'Đúng thứ tự!'); } }
  else { x.tries=(x.tries||0)+1; sfx('no'); x.msg='"'+s.items[i]+'" chưa phải bước số '+(x.seq.length+1)+'. Thử lại từ đầu nhé.'; x.seq=[]; }
  save(); drawStep();
}

/* --- mốc 20 tuổi (cá nhân hóa theo năm sinh) --- */
STEP.age = {
  view:function(){
    var by=parseInt(S.by,10), cy=new Date().getFullYear(), y20=by+20;
    var line = (by && y20>cy) ?
      T('[Tên] sinh năm ')+by+'. Ở Nhật, phải đến năm <b>'+y20+'</b> cháu mới đủ 20 tuổi. Từ giờ đến lúc đó, không hút thuốc (kể cả thuốc lá điện tử), không uống rượu bia, kể cả trong các buổi liên hoan.' :
      T('[Tên] đã đủ 20 tuổi theo luật Nhật. Nhưng nhớ: chỉ hút thuốc ở khu vực cho phép, không uống rượu rồi đi xe đạp, và đừng rủ bạn chưa đủ 20 tuổi cùng uống.');
    return sayHTML('tan','', line, 'say--tan')+
      (by?'<div class="agecard"><b>'+(y20>cy?y20:'20+')+'</b><span>'+(y20>cy?'Năm bạn đủ 20 tuổi theo luật Nhật':'Bạn đã qua mốc 20 tuổi')+'</span></div>':'')+
      lawHTML({t:'Ở Nhật: đủ 20 tuổi mới được hút thuốc, uống rượu.', p:[
        'Tuổi trưởng thành ở Nhật là 18, nhưng hút thuốc và uống rượu vẫn phải đủ 20 tuổi.',
        'Đã có TTS 18 tuổi bị nhắc nhở, phải viết cam kết vì hút thuốc. Có nhóm uống rượu cùng bạn chưa đủ tuổi, suýt phải gọi cấp cứu.',
        'Hút thuốc trong nhà vệ sinh, trong giờ làm, nhất là ở xưởng thực phẩm, có thể bị cho nghỉ việc ngay.'],
        src:'Luật cấm người dưới 20 tuổi hút thuốc và Luật cấm người dưới 20 tuổi uống rượu của Nhật Bản'});
  },
  state:function(){ return {ok:true}; }
};

/* --- đọc bài Tikme rồi trả lời --- */
STEP.tikme = {
  view:function(s,x){
    x.a=x.a||{};
    var t=(S.d.tik||{})[s.url];
    var h='<p class="hint">'+esc(s.intro)+'</p>'+
      '<div class="tik" id="tikCard"><small>'+esc(s.cat)+' · '+s.mins+' phút đọc</small><b>'+esc(s.title)+'</b>'+
      '<div class="btnrow"><a class="btn btn--sm'+(t?' btn--soft':' invite')+'" href="'+esc(s.url)+'" target="_blank" rel="noopener" data-act="tikOpen" data-u="'+esc(s.url)+'">'+(t?'Mở lại bài đọc':'Mở bài đọc')+'</a>'+
      (t?'<span class="chip chip--ok">'+icon('check',13)+' Đã mở lúc '+fmtTime(t.o)+'</span>':'<span class="small muted">Mở xong, quay lại tab này</span>')+'</div></div>';
    s.qs.forEach(function(q,i){
      var r=x.a[i]||{};
      h+='<div class="mcq'+(t?'':' lock')+'" id="mcq'+i+'"><div class="mcq__q">'+(i+1)+'. '+esc(q.t)+'</div><div class="opts">'+
        q.o.map(function(o,j){
          var cl = r.ok && j===q.a ? ' good' : ((r.bad||[]).indexOf(j)>=0 ? ' bad' : '');
          return '<button class="opt'+cl+'" data-act="mcq" data-i="'+i+'" data-j="'+j+'" '+((!t||r.ok)?'disabled':'')+'><i>'+'ABC'[j]+'</i><span>'+esc(o)+'</span></button>';
        }).join('')+'</div>'+
        (r.ok?'<div class="fb ok"><span class="verdict">Đúng rồi!</span> '+esc(q.why)+'</div>':((r.bad||[]).length?'<div class="fb no"><span class="verdict">Chưa đúng.</span> Xem lại bài viết rồi chọn lại nhé.</div>':''))+'</div>';
    });
    var all=s.qs.every(function(q,i){ return x.a[i]&&x.a[i].ok; });
    if(all) h+=sayHTML('tan','',esc(s.after),'say--tan')+srcLine(s.src);
    return h;
  },
  state:function(s,x){
    x.a=x.a||{};
    if(!(S.d.tik||{})[s.url]) return {ok:false,msg:'Mở bài đọc trên Tikme',q:'#tikCard'};
    var f=s.qs.findIndex(function(q,i){ return !(x.a[i]&&x.a[i].ok); });
    return f<0 ? {ok:true} : {ok:false,msg:'Còn câu '+(f+1)+' chưa đúng',q:'#mcq'+f};
  }
};
function tikOpen(u){ S.d.tik=S.d.tik||{}; if(!S.d.tik[u]) S.d.tik[u]={o:Date.now()}; S.d.tikAway={u:u,t:Date.now()}; save(true); setTimeout(function(){ if(CUR) drawStep(); },300); }
document.addEventListener('visibilitychange', function(){
  if(document.visibilityState!=='visible' || !S.d || !S.d.tikAway) return;
  var a=S.d.tikAway; delete S.d.tikAway; save();
  if(Date.now()-a.t>40000){ var g=addXP('tik.'+a.u,10,true); pointToast(g,0,'Chào mừng quay lại! Trả lời câu hỏi bên dưới nhé.'); }
  else toast('Bạn quay lại hơi nhanh. Đọc kỹ mục được gợi ý rồi trả lời nhé.');
});
function mcqPick(i,j){
  var s=CUR.s, x=xs(CUR.id,CUR.i); x.a=x.a||{}; var r=x.a[i]=x.a[i]||{bad:[]};
  if(r.ok) return;
  if(j===s.qs[i].a){ r.ok=1; sfx('ok'); if(!r.bad.length) addXP('mcq.'+CUR.id+'.'+i,5,true); } else { if(r.bad.indexOf(j)<0) r.bad.push(j); sfx('no'); }
  save(); drawStep();
}

/* --- khám phá phiếu lương --- */
STEP.explore = {
  view:function(s,x){
    x.seen=x.seen||[];
    var must=s.items.filter(function(it){ return !it.sub; });
    var h='<p class="hint">'+esc(s.intro)+'</p><div class="pslip" id="pslip"><div class="pslip__h"><b>給与明細</b><span>Phiếu lương · bản mẫu</span></div>';
    s.items.forEach(function(it){
      var on=x.seen.indexOf(it.k)>=0, neg=it.val.charAt(0)==='−';
      if(it.sub) h+='<div class="psr'+(it.tot?' tot':'')+'"><span><b class="jp">'+it.jp+'</b> '+esc(it.lbl)+'</span><span class="'+(neg?'neg':'')+'">'+esc(it.val)+'¥</span></div>';
      else h+='<button class="psr tap'+(on?' on':'')+'" data-act="exp" data-k="'+it.k+'"><span><i></i><b class="jp">'+it.jp+'</b> '+esc(it.lbl)+'</span><span class="'+(neg?'neg':'')+'">'+esc(it.val)+'¥</span></button>';
    });
    h+='</div>';
    if(x.seen.length){
      h+='<div class="found-list">'+x.seen.map(function(k,i){ var it=s.items.filter(function(z){ return z.k===k; })[0]; return '<div><i style="background:var(--c)">'+(i+1)+'</i><span><b>'+esc(it.lbl)+'</b> · '+esc(it.why)+'</span></div>'; }).join('')+'</div>';
    }
    if(x.seen.length>=must.length) h+='<div class="out out--good"><p>'+esc(s.done)+'</p></div>'+srcLine(s.src);
    return h;
  },
  state:function(s,x){ x.seen=x.seen||[]; var n=s.items.filter(function(it){ return !it.sub; }).length-x.seen.length; return n>0?{ok:false,msg:'Còn '+n+' dòng chưa đọc',q:'#pslip'}:{ok:true}; }
};
function expTap(k){ var s=CUR.s, x=xs(CUR.id,CUR.i); x.seen=x.seen||[]; if(x.seen.indexOf(k)>=0) return; x.seen.push(k); sfx('tap'); save(); drawStep();
  var n=s.items.filter(function(it){ return !it.sub; }).length; if(x.seen.length===n){ var g=addXP('exp.'+CUR.id+'.'+CUR.i,10,true); if(g) pointToast(g,0,'Đọc xong phiếu lương!'); } }

/* --- bản đồ phố --- */
STEP.street = {
  view:function(s,x){
    x.done=x.done||{}; x.bad=x.bad||{};
    var nd=Object.keys(x.done).length;
    var h='<p class="hint">'+esc(s.intro)+'</p><div class="counter">'+icon('map',18)+' Đã đi '+nd+'/'+s.spots.length+' điểm</div>'+
      '<div class="smap" id="smap">'+streetSVG();
    s.spots.forEach(function(p){
      var d=x.done[p.k], c=x.cur===p.k;
      h+='<button class="pin'+(d?' ok':'')+(c?' cur':'')+'" style="left:'+p.x+'%;top:'+p.y+'%" data-act="spot" data-k="'+p.k+'" aria-label="'+esc(p.name)+'"><i>'+(d?icon('check',14,3):'')+'</i><span>'+esc(p.name)+'</span></button>';
    });
    h+='</div>';
    if(x.cur){
      var p=s.spots.filter(function(z){ return z.k===x.cur; })[0], d=x.done[p.k], bad=x.bad[p.k]||[];
      h+='<div class="mcq spotq" id="spotq"><div class="spotq__h"><b class="jp">'+p.jp+'</b> '+esc(p.name)+'</div><div class="mcq__q">'+esc(p.q)+'</div><div class="opts">'+
        p.o.map(function(o,j){ var cl=d&&j===p.a?' good':(bad.indexOf(j)>=0?' bad':''); return '<button class="opt'+cl+'" data-act="spa" data-j="'+j+'" '+(d?'disabled':'')+'><i>'+'ABC'[j]+'</i><span>'+esc(o)+'</span></button>'; }).join('')+'</div>'+
        (d?'<div class="fb ok"><span class="verdict">Đúng rồi!</span> '+esc(p.why)+'</div>'+srcLine(p.src):(bad.length?'<div class="fb no"><span class="verdict">Thử lại nhé.</span> Yêu "Chắc Không Sao" vừa thắng một ván. Chọn lại đi!</div>':''))+
        (d && nd<s.spots.length?'<p class="small muted" style="margin:8px 0 0">Chạm vào một điểm khác trên bản đồ để đi tiếp.</p>':'')+'</div>';
    } else h+='<p class="small muted" style="text-align:center">Chạm vào một điểm trên bản đồ để bắt đầu.</p>';
    return h;
  },
  state:function(s,x){ x.done=x.done||{}; var n=s.spots.length-Object.keys(x.done).length; return n?{ok:false,msg:'Còn '+n+' điểm chưa đi',q:'#smap'}:{ok:true}; }
};
function spotOpen(k){ var x=xs(CUR.id,CUR.i); x.cur=k; save(); drawStep(); setTimeout(function(){ var q=$('#spotq'); if(q) q.scrollIntoView({behavior:noMotion()?'auto':'smooth',block:'nearest'}); },60); }
function spotAns(j){
  var s=CUR.s, x=xs(CUR.id,CUR.i), p=s.spots.filter(function(z){ return z.k===x.cur; })[0];
  x.done=x.done||{}; x.bad=x.bad||{};
  if(x.done[p.k]) return;
  if(j===p.a){ x.done[p.k]=1; sfx('ok'); if(!(x.bad[p.k]||[]).length) addXP('spot.'+CUR.id+'.'+p.k,3,true);
    if(Object.keys(x.done).length===s.spots.length){ var g=addXP('street.'+CUR.id,10,true); if(g) pointToast(g,0,'Đi hết sáu góc phố!'); } }
  else { x.bad[p.k]=x.bad[p.k]||[]; if(x.bad[p.k].indexOf(j)<0) x.bad[p.k].push(j); sfx('no'); }
  save(); drawStep();
}

/* --- thẻ luật đứng riêng --- */
STEP.law = { view:function(s){ return lawHTML(s.law); }, state:function(){ return {ok:true}; } };

/* --- Phòng chiếu Kōban: xem, dừng, chọn --- */
function mmss(t){ return Math.floor(t/60)+':'+pad(t%60); }
STEP.video = {
  view:function(s,x){
    x.seg=x.seg||0; x.w=x.w||{}; x.a=x.a||{};
    var h=sayHTML('tan','',esc(s.intro),'say--tan')+'<p class="small muted" style="margin:0 0 4px">'+esc(s.who)+'</p>';
    h+='<div class="vsegs">'+s.segs.map(function(g,i){ var st = i<x.seg ? 'ok' : (i===x.seg?'cur':''); return '<span class="vseg '+st+'">'+(i<x.seg?icon('check',12,3):(i+1))+'</span>'; }).join('')+'</div>';
    var g=s.segs[x.seg], i=x.seg, watched=x.w[i], r=x.a[i]||{};
    var url='https://www.youtube.com/watch?v='+s.vid+'&t='+g.s+'s';
    h+='<div class="vcard" id="vcard"><div class="vcard__h"><b>'+esc(g.lbl)+'</b><span>'+mmss(g.s)+' → '+(g.e>=990?'hết':mmss(g.e))+'</span></div>'+
      '<div class="vframe"><iframe src="https://www.youtube-nocookie.com/embed/'+s.vid+'?start='+g.s+'&end='+g.e+'&cc_load_policy=1&cc_lang_pref=vi&hl=vi&rel=0&playsinline=1" title="'+esc(s.title)+'" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>'+
      '<div class="btnrow" style="justify-content:space-between"><a class="btn btn--link" href="'+url+'" target="_blank" rel="noopener">Không xem được? Mở trên YouTube từ '+mmss(g.s)+'</a>'+
      (watched?'<span class="chip chip--ok">'+icon('check',13)+' Đã xem</span>':'<button class="btn btn--sm" data-act="vwatched">Mình đã xem xong đoạn này</button>')+'</div></div>';
    if(watched && g.q){
      h+='<div class="mcq" id="vq"><div class="mcq__q">'+esc(g.q)+'</div><div class="opts">'+
        g.o.map(function(o,j){ var cl=r.ok&&j===g.a?' good':((r.bad||[]).indexOf(j)>=0?' bad':''); return '<button class="opt'+cl+'" data-act="vans" data-j="'+j+'" '+(r.ok?'disabled':'')+'><i>'+'ABC'[j]+'</i><span>'+esc(o)+'</span></button>'; }).join('')+'</div>'+
        (r.ok?'<div class="fb ok"><span class="verdict">Đúng rồi!</span> '+esc(g.why)+'</div>':((r.bad||[]).length?'<div class="fb no"><span class="verdict">Chưa phải lựa chọn an toàn.</span> Nghĩ thêm một chút rồi chọn lại nhé.</div>':''))+'</div>';
      if(r.ok) h+='<button class="btn btn--soft btn--full" data-act="vnext">Xem đoạn tiếp theo '+icon('next',18)+'</button>';
    }
    if(watched && !g.q) h+='<div class="out out--good"><div class="out__t">'+icon('check',20)+' Bạn đã xem hết phim</div><p>Phim kết thúc bằng những câu "もしもあの時…" (giá như lúc đó…). Ở chặng sau, bạn sẽ sắp lại vòng xoáy và viết câu "giá như" của mình.</p></div>'+'<div class="src">'+icon('scroll',15)+'<span>Phim: '+esc(s.src)+'</span></div>';
    return h;
  },
  state:function(s,x){
    x.seg=x.seg||0; x.w=x.w||{}; x.a=x.a||{};
    var last=s.segs.length-1;
    if(x.seg<last) return {ok:false, msg:'Đang ở đoạn '+(x.seg+1)+'/'+s.segs.length, q: x.w[x.seg]?(x.a[x.seg]&&x.a[x.seg].ok?'[data-act=vnext]':'#vq'):'#vcard'};
    return x.w[last] ? {ok:true} : {ok:false, msg:'Xem nốt đoạn cuối', q:'#vcard'};
  }
};
function vWatched(){ var x=xs(CUR.id,CUR.i); x.w=x.w||{}; x.w[x.seg]=1; save(); drawStep(); setTimeout(function(){ var q=$('#vq'); if(q) q.scrollIntoView({behavior:noMotion()?'auto':'smooth',block:'center'}); },60); }
function vAns(j){ var s=CUR.s, x=xs(CUR.id,CUR.i), g=s.segs[x.seg]; x.a=x.a||{}; var r=x.a[x.seg]=x.a[x.seg]||{bad:[]}; if(r.ok) return;
  if(j===g.a){ r.ok=1; sfx('ok'); var gx=addXP('vid.'+CUR.id+'.'+x.seg, r.bad.length?5:10, true); pointToast(gx,0,r.bad.length?'Đúng rồi!':'Chọn đúng ngay!'); } else { if(r.bad.indexOf(j)<0) r.bad.push(j); sfx('no'); }
  save(); drawStep(); }
function vNext(){ var x=xs(CUR.id,CUR.i); x.seg++; save(); drawStep(); setTimeout(function(){ var c=$('#vcard'); if(c) c.scrollIntoView({behavior:noMotion()?'auto':'smooth',block:'start'}); },60); }

/* --- bài toán vay nóng --- */
STEP.calc = {
  view:function(s,x){
    var m=x.m||1, paid=3*m;
    var bars=''; for(var i=1;i<=12;i++){ bars+='<i class="'+(i<=m?'on':'')+'" style="height:'+(8+i*6)+'px"></i>'; }
    var h=sayHTML('ngu','tempt', '"Cần tiền gấp hả? Vay 15 man đi, tháng chỉ 3 man tiền lãi thôi."')+
      '<div class="card calc" id="calc"><p class="small muted" style="margin:0 0 6px"><span class="real">Dựa trên chuyện đã từng xảy ra</span> Vay 15 man, bị trừ ngay tiền lãi tháng đầu nên chỉ cầm về 12 man.</p>'+
      '<div class="calc__row"><span>Tiền thực cầm về</span><b>12 man</b></div>'+
      '<div class="calc__row"><span>Số tháng chưa trả được gốc</span><b>'+m+' tháng</b></div>'+
      '<input type="range" min="1" max="12" value="'+m+'" class="calc__r" id="calcR" aria-label="Số tháng">'+
      '<div class="calc__bars">'+bars+'</div>'+
      '<div class="calc__row big"><span>Tổng tiền lãi phải trả</span><b class="'+(paid>=12?'neg':'')+'">'+paid+' man</b></div>'+
      '<div class="calc__row"><span>Nợ gốc vẫn còn nguyên</span><b class="neg">15 man</b></div>'+
      (paid>=12?'<p class="small" style="margin:6px 0 0;color:#B23A28;font-weight:600">Chỉ sau '+Math.min(m,4)+' tháng, tiền lãi đã bằng toàn bộ số tiền bạn cầm về, mà nợ gốc vẫn nguyên.</p>':'<p class="small muted" style="margin:6px 0 0">Kéo thanh trượt để xem chuyện gì xảy ra theo thời gian.</p>')+'</div>';
    var r=x.q||{};
    h+='<div class="mcq" id="calcq"><div class="mcq__q">Lãi 3 man mỗi tháng trên khoản vay 15 man là bao nhiêu phần trăm một năm?</div><div class="opts">'+
      ['Khoảng 20% một năm','Khoảng 60% một năm','Khoảng 240% một năm'].map(function(o,j){ var cl=r.ok&&j===2?' good':((r.bad||[]).indexOf(j)>=0?' bad':''); return '<button class="opt'+cl+'" data-act="cq" data-j="'+j+'" '+(r.ok||!x.slid?'disabled':'')+'><i>'+'ABC'[j]+'</i><span>'+o+'</span></button>'; }).join('')+'</div>'+
      (!x.slid?'<p class="small muted" style="margin:8px 0 0">Kéo thanh trượt trước để mở câu hỏi.</p>':'')+
      (r.ok?'<div class="fb ok"><span class="verdict">Đúng rồi!</span> 3 man mỗi tháng là 20%/tháng, tức 240%/năm. Ở Nhật, lãi suất cho vay bị giới hạn khoảng 15 đến 20% một năm. Cho vay như vậy là cho vay nặng lãi bất hợp pháp.</div>':((r.bad||[]).length?'<div class="fb no"><span class="verdict">Chưa đúng.</span> Lấy 3 chia 15, rồi nhân 12 tháng.</div>':''))+'</div>';
    if(r.ok) h+=lawHTML({t:'Vay nóng là cái bẫy của Lão Đỏ Đen.', p:[
      'Lãi suất cho vay ở Nhật bị luật giới hạn khoảng 15 đến 20% một năm. Vượt mức đó là cho vay nặng lãi bất hợp pháp.',
      'Năm 2026, một TTS nghiện game, nghỉ làm, vay nóng 15 man rồi không trả nổi, bị thu cả thẻ ngân hàng, phải bán máy tính, cuối cùng phải về nước.',
      'Bị đòi nợ, đe dọa: báo cảnh sát, Hiệp hội, Esuhai. Đừng vay chỗ mới để đắp chỗ cũ, đừng cầm cố giấy tờ.'],
      src:'Luật hạn chế lãi suất Nhật Bản (利息制限法), Điều 1 · Luật Xuất vốn (出資法)'});
    return h;
  },
  state:function(s,x){ return (x.q&&x.q.ok)?{ok:true}:{ok:false,msg:x.slid?'Trả lời câu hỏi lãi suất':'Kéo thanh trượt số tháng',q:x.slid?'#calcq':'#calc'}; },
  wire:function(s,x){ var r=$('#calcR'); if(!r) return; r.addEventListener('input',function(){ x.m=+r.value; x.slid=1; save(); var y=window.scrollY; drawStep(); window.scrollTo(0,y); var r2=$('#calcR'); if(r2) r2.focus(); }); }
};
function calcAns(j){ var x=xs(CUR.id,CUR.i); x.q=x.q||{bad:[]}; if(x.q.ok) return; if(j===2){ x.q.ok=1; sfx('ok'); if(!x.q.bad.length) addXP('calc.'+CUR.id,10,true); } else { if(x.q.bad.indexOf(j)<0) x.q.bad.push(j); sfx('no'); } save(); drawStep(); }

/* --- tự đo mức chơi game (riêng tư, không đúng sai) --- */
var GAMECHK=['Tôi thường chơi game quá giờ ngủ mình định.','Tôi từng đi học hoặc đi làm muộn vì thức khuya chơi game.','Tôi thấy bứt rứt, khó chịu khi không được chơi.','Tôi từng nạp tiền vào game nhiều hơn mình định.','Tôi bỏ bữa, bỏ giờ tự học để chơi.','Tôi từng nói với người khác là mình chơi ít hơn thực tế.'];
STEP.check = {
  view:function(s,x){
    x.c=x.c||[];
    var n=x.c.length, band = n<=1 ? ['ok','Bạn đang làm chủ','Giữ thói quen này. Giải trí là để nạp năng lượng cho việc chính.'] : (n<=3 ? ['mid','Cần đặt giới hạn','Bạn nên đặt giờ chơi rõ ràng và nhờ một người bạn nhắc.'] : ['hi','Nên nói chuyện với ai đó','Hãy chia sẻ với thầy cô hoặc người thân. Tự điều chỉnh sớm thì mọi thứ còn dễ.']);
    var h=sayHTML('hau','hi',T('Chơi game không có gì sai, [Tên] ạ. Điều quan trọng là mình làm chủ game hay game làm chủ mình. Phần này chỉ mình bạn thấy, không có đúng hay sai.'))+
      '<div class="card" id="chk"><h3 style="font-size:16px;margin-bottom:8px">Tự đo: đánh dấu những câu đúng với bạn</h3>'+
      GAMECHK.map(function(t,i){ var on=x.c.indexOf(i)>=0; return '<button class="chkr'+(on?' on':'')+'" data-act="chk" data-i="'+i+'" aria-pressed="'+on+'"><i>'+(on?icon('check',14,3):'')+'</i><span>'+esc(t)+'</span></button>'; }).join('')+
      (x.seen?'<div class="band band--'+band[0]+'"><b>'+band[1]+'</b><span>'+band[2]+'</span></div>':'<button class="btn btn--sm btn--soft" data-act="chkSee" style="margin-top:8px">Xem kết quả</button>')+'</div>';
    if(x.seen){
      h+='<div class="wfield card" id="wf_luat"><div class="formula">Luật chơi game của tôi ở Nhật là…</div><textarea class="inp" data-w="luat" placeholder="Ví dụ: Chỉ chơi sau khi học xong, tắt máy trước 23 giờ, không nạp quá 1.000 yên một tháng.">'+esc(x.luat||'')+'</textarea><div class="wc" id="wc_luat"></div></div>'+
        '<p class="small muted">Năm 2026 đã có nhiều ca nghiện game dẫn đến bỏ học, nghỉ làm, vay nợ và phải về nước. Quản lý bản thân là kỹ năng sống còn khi xa nhà.</p>';
    }
    return h;
  },
  state:function(s,x){ if(!x.seen) return {ok:false,msg:'Tự đo rồi bấm "Xem kết quả"',q:'#chk'}; return words(x.luat)>=4?{ok:true}:{ok:false,msg:'Viết luật chơi game của bạn',q:'#wf_luat'}; },
  wire:function(s,x){ var t=$('textarea[data-w=luat]'); if(!t) return; t.addEventListener('input',function(){ x.luat=t.value; save(); drawBar(); if(words(t.value)>=20){ var g=setIns('w.'+CUR.id+'.luat',5); if(g) pointToast(0,g); } }); }
};
function chkTap(i){ var x=xs(CUR.id,CUR.i); x.c=x.c||[]; var k=x.c.indexOf(i); if(k>=0) x.c.splice(k,1); else x.c.push(i); save(); drawStep(); }

/* --- Túi cứu viện: thẻ cá nhân lưu thành ảnh --- */
var SOS_FIX=[['110','Cảnh sát (khẩn cấp)'],['119','Cứu thương, cứu hỏa'],['#9110','Cảnh sát tư vấn (không khẩn cấp)'],['0120-250-168','OTIT, tiếng Việt, miễn phí · khẩn cấp bấm 1']];
var SOS_FIELDS=[['hd','Người hướng dẫn ở công ty'],['hh','Hiệp hội'],['es','Esuhai tại Nhật']];
STEP.sos = {
  view:function(s,x){
    S.d.sos=S.d.sos||{};
    var h=sayHTML('hau','cheer',T('Mình làm cho [Tên] một tấm thẻ cứu viện, gọn như một trang sổ tay. Điền số bạn đã biết, chưa biết thì để trống, sau này sửa trong Sổ tay › Cài đặt.'))+
      '<div class="card form" id="sosform" style="margin-top:0">'+SOS_FIELDS.map(function(f){ return '<label>'+esc(f[1])+'<input class="inp" data-sos="'+f[0]+'" maxlength="40" value="'+esc(S.d.sos[f[0]]||'')+'" placeholder="Tên hoặc số điện thoại"></label>'; }).join('')+'</div>'+
      sosCardHTML()+
      '<div class="btnrow" style="justify-content:center"><button class="btn" data-act="sosSave">'+icon('download',18)+' Lưu thẻ thành ảnh</button></div>'+
      '<p class="small muted" style="text-align:center">Đặt ảnh làm hình nền khóa màn hình hoặc lưu vào album để mở được cả khi không có mạng.</p>';
    return h;
  },
  state:function(s,x){ return x.saved?{ok:true}:{ok:false,msg:'Lưu thẻ cứu viện thành ảnh',q:'[data-act=sosSave]'}; },
  wire:function(s,x){ $$('[data-sos]').forEach(function(el){ el.addEventListener('input',function(){ S.d.sos[el.getAttribute('data-sos')]=el.value; save(); var c=$('#sosCard'); if(c) c.outerHTML=sosCardHTML(); }); }); }
};
function sosCardHTML(){
  var d=S.d.sos||{};
  return '<div class="sos" id="sosCard"><div class="sos__h"><b>Túi cứu viện</b><span>'+esc(S.name)+'</span></div>'+
    SOS_FIX.map(function(r){ return '<div class="sos__r"><b>'+r[0]+'</b><span>'+esc(r[1])+'</span></div>'; }).join('')+
    SOS_FIELDS.map(function(f){ return '<div class="sos__r mine"><b>'+esc(d[f[0]]||'…')+'</b><span>'+esc(f[1])+'</span></div>'; }).join('')+
    '<div class="sos__f">Thường thì báo từng bước. Bị bạo lực, đe dọa, bị giữ giấy tờ: gọi thẳng 110 hoặc OTIT.</div></div>';
}
function sosSave(){
  var x=CUR?xs(CUR.id,CUR.i):{};
  var rows=SOS_FIX.map(function(r){ return [r[0],r[1],0]; }).concat(SOS_FIELDS.map(function(f){ return [(S.d.sos||{})[f[0]]||'…',f[1],1]; }));
  drawPNG(720, 160+rows.length*92+120, function(g,W,H){
    g.fillStyle='#2F4BD8'; g.fillRect(0,0,W,130);
    g.fillStyle='#F4B63B'; g.font='700 40px "Be Vietnam Pro",sans-serif'; g.fillText('Túi cứu viện',40,62);
    g.fillStyle='#fff'; g.font='500 26px "Be Vietnam Pro",sans-serif'; g.fillText(String(S.name||''),40,104);
    rows.forEach(function(r,i){ var y=160+i*92; g.fillStyle=r[2]?'#FFF5DC':'#ECF0FF'; roundRect(g,30,y,W-60,78,16); g.fill();
      if(r[2]){ g.fillStyle='#4A5275'; g.font='500 21px "Be Vietnam Pro",sans-serif'; g.fillText(r[1],54,y+28);
        g.fillStyle='#18203F'; g.font='800 28px "Be Vietnam Pro",sans-serif'; g.fillText(String(r[0]),54,y+64); }
      else { g.fillStyle='#18203F'; g.font='800 34px "Be Vietnam Pro",sans-serif'; g.fillText(String(r[0]),54,y+50);
        g.fillStyle='#4A5275'; g.font='500 22px "Be Vietnam Pro",sans-serif'; wrapText(g,r[1],300,y+34,W-340,28); } });
    g.fillStyle='#4A5275'; g.font='500 21px "Be Vietnam Pro",sans-serif';
    wrapText(g,'Bị bạo lực, đe dọa, bị giữ giấy tờ: gọi thẳng 110 hoặc OTIT. · '+COURSE,40,H-80,W-80,28);
  }, 'Tui-cuu-vien_'+norm(S.name)+'.png');
  if(CUR && ACTS[CUR.id].steps[CUR.i].k==='sos'){ x.saved=1; save(); var g2=addXP('sos',10,true); if(g2) pointToast(g2,0,'Đã lưu thẻ cứu viện!'); drawBar(); }
}
function roundRect(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
function wrapText(g,t,x,y,mw,lh){ var w=String(t).split(' '), line=''; for(var i=0;i<w.length;i++){ var tt=line+w[i]+' '; if(g.measureText(tt).width>mw && line){ g.fillText(line,x,y); line=w[i]+' '; y+=lh; } else line=tt; } g.fillText(line,x,y); return y; }
function drawPNG(W,H,paint,name){
  var c=document.createElement('canvas'); c.width=W; c.height=H; var g=c.getContext('2d');
  g.fillStyle='#fff'; g.fillRect(0,0,W,H); paint(g,W,H);
  try{ var a=document.createElement('a'); a.href=c.toDataURL('image/png'); a.download=name; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); },400); }catch(e){ toast('Máy này chưa cho lưu ảnh. Bạn chụp màn hình thẻ nhé.'); }
}

