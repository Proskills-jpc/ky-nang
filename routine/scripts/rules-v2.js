/* ===== SECTION: rules-v2.js ===== */
/* M.Claude.3.3.32 · Luật rèn luyện v2 (chốt 15/11/2026, mục 10 tài liệu "Shin routine — Logic rèn luyện").
   Một nơi duy nhất tính: Lửa, ngày nghỉ, số ngày/lần của thẻ, bậc thẻ, thẻ duy trì.
   - Lửa: ngày có ghi đúng ngày ≥1 thẻ (kể cả "Chưa làm") +1; trọn mọi thẻ đang rèn +2.
     Thẻ khi gặp dịp ghi "Không gặp dịp" vẫn tính là trọn. Thẻ duy trì không tính vào "trọn".
     Ngày ghi bù không cộng Lửa (vẫn tính như ngày chưa ghi). Lửa không reset, thấp nhất là 0.
   - Ngày nghỉ: trong 7 ngày được nghỉ 1 ngày (không trừ Lửa, thẻ hằng ngày vẫn được tính ngày đó).
     Lỡ thêm ngày nào khi chưa qua 7 ngày kể từ ngày nghỉ: Lửa −1, thẻ không tính ngày đó.
   - Bậc: thẻ hằng ngày 7 · 14 · 21 ngày có làm (Đã làm/Một phần, cộng ngày nghỉ);
     thẻ khi gặp dịp 3 · 6 · 9 lần. Tự lên bậc, không ai xác nhận. Bậc không tự hạ.
   - Thẻ duy trì: 7 ngày chưa làm → Shin nhắc ('fade'); 14 ngày → mạng nhện ('web'). Cả thẻ khi gặp dịp.
   Dữ liệu thêm (không đổi 3 khóa lưu trữ): S.r2 {v,migrated}, S.r2act {ngày:[thẻ đang rèn]}. */
var R2C=null, R2_QUEUE=[], R2_FLUSH_T=null, R2_NOTICE=null;

function r2OnTime(d,id){
  var r=((S.review16||{})[d]||{})[id];
  if(r&&isFinite(r.createdAt))return dk(new Date(r.createdAt))===d;
  return !((S.bf||{})[d]||{})[id];
}
/* Thẻ đang rèn lúc này: trên tay, không tạm dừng, chưa Thành nếp. */
function r2TrainingNow(){return slotIds().filter(function(id){var u=H(id);return HMAP[id]&&u.status!=='pause'&&!u.master;}).sort();}
function r2LastMark(id){var last='';Object.keys(S.log||{}).forEach(function(d){if(S.log[d][id]&&d>last)last=d;});return last;}
/* Lưu ảnh chụp "thẻ đang rèn" theo ngày, chỉ khi có thay đổi. Ngày không mở app giữ nguyên tập thẻ của lần mở trước. */
function r2Snapshot(){
  if(!S||!S.habits)return;S.r2act=S.r2act||{};var t=dk(),cur=r2TrainingNow(),keys=Object.keys(S.r2act).filter(function(k){return k<=t;}).sort(),last=keys.length?S.r2act[keys[keys.length-1]]:null;
  if(!last||last.join('|')!==cur.join('|'))S.r2act[t]=cur;
}
function r2Calc(){
  if(R2C)return R2C;
  var t=dk(),snapKeys=Object.keys(S.r2act||{}).sort(),ids=Object.keys(S.habits||{}).filter(function(id){return HMAP[id]&&S.habits[id]&&validDate32(S.habits[id].since);}),first=null,lastMark={},tmemo={};
  ids.forEach(function(id){var s=H(id).since;if(!first||s<first)first=s;lastMark[id]=r2LastMark(id);});
  function inferred(d){return ids.filter(function(id){var u=H(id);if(d<u.since||(u.master&&u.master<d))return false;var live=S.slots.indexOf(id)>=0&&u.status!=='pause'&&u.status!=='keep';return live||(lastMark[id]&&d<=lastMark[id]);});}
  function trainingOn(d){
    if(tmemo[d])return tmemo[d];var list;
    if(d===t)list=r2TrainingNow();
    else{var k=null;for(var i=snapKeys.length-1;i>=0;i--){if(snapKeys[i]<=d){k=snapKeys[i];break;}}
      list=k?(S.r2act[k]||[]).filter(function(id){var u=H(id);return u&&HMAP[id]&&d>=u.since&&!(u.master&&u.master<d);}):inferred(d);}
    return (tmemo[d]=list);
  }
  var begin=first?(first>S.created?first:S.created):t,fire=0,free={},miss={},gain={},rec={},lastFree=null,guard=0;
  for(var d=begin;d<=t&&guard++<4000;d=addD(d,1)){
    var T=trainingOn(d),log=S.log[d]||{},has=false;
    for(var id in log){if(log[id]&&r2OnTime(d,id)){has=true;break;}}
    if(has){var full=T.length>0&&T.every(function(x){var m=log[x];return isDip(x)?(m==='y'||m==='x'):m==='y';});gain[d]=full?2:1;fire+=gain[d];rec[d]=true;}
    else if(d<t&&T.length){
      if(!lastFree||diffD(lastFree,d)>=7){free[d]=true;lastFree=d;gain[d]=0;}
      else{miss[d]=true;gain[d]=fire>0?-1:0;fire=Math.max(0,fire-1);}
    }
  }
  return (R2C={fire:fire,free:free,miss:miss,gain:gain,rec:rec,begin:begin,trainingOn:trainingOn,lastFree:lastFree,cnt:{}});
}
function r2Fire(){return S?r2Calc().fire:0;}
/* Số ngày (thẻ hằng ngày) hoặc số lần (thẻ khi gặp dịp) đã làm, kèm ngày chạm mỗi mốc bậc. */
function r2Info(id){
  var C=r2Calc();if(C.cnt[id])return C.cnt[id];
  var u=H(id),t=dk(),n=0,at={},dip=isDip(id),need=dip?LV_NEED_D:LV_NEED;
  if(!u)return {n:0,at:at};
  var days={};Object.keys(S.log||{}).forEach(function(d){var m=S.log[d][id];if(d<=t&&(m==='y'||m==='p'))days[d]=1;});
  if(!dip)Object.keys(C.free).forEach(function(d){if(d>=u.since&&!(S.log[d]||{})[id]&&C.trainingOn(d).indexOf(id)>=0)days[d]=1;});
  Object.keys(days).sort().forEach(function(d){n++;for(var k=1;k<=3;k++){if(n===need[k])at[k]=d;}});
  return (C.cnt[id]={n:n,at:at});
}
function r2Count(id){return r2Info(id).n;}
function r2LevelFor(id,n){return n>=needFor(id,2)?3:n>=needFor(id,1)?2:1;}
/* Đưa bậc thẻ khớp số ngày/lần. Trả danh sách thẻ vừa lên bậc hoặc vừa Thành nếp. */
function r2Sync(){
  var ups=[];if(!S||!S.habits)return ups;
  Object.keys(S.habits).forEach(function(id){
    var u=H(id);if(!HMAP[id]||!u)return;var info=r2Info(id),lv=r2LevelFor(id,info.n),old=u.lv||1;
    if(lv>old){u.lv=lv;u.lvSince=info.at[lv-1]||dk();ups.push({id:id,lv:lv,from:old});}
    if((u.lv||1)>=3&&info.n>=needFor(id,3)&&!u.master){u.master=info.at[3]||dk();ups.push({id:id,master:true});}
  });
  if(ups.length)R2C=null;return ups;
}
/* Thẻ duy trì: số ngày kể từ lần làm gần nhất (hoặc từ ngày Thành nếp nếu chưa làm lại). */
function r2LastDone(id){var u=H(id),last='';Object.keys(S.log||{}).forEach(function(d){var m=S.log[d][id];if(d<=dk()&&(m==='y'||m==='p')&&d>last)last=d;});if(u&&u.master&&u.master>last)last=u.master;return last;}
function r2IdleDays(id){var last=r2LastDone(id);return last?diffD(last,dk()):0;}
function r2KeepState(id){var n=r2IdleDays(id);return n>=14?'web':n>=7?'fade':'live';}
/* Cho đợt 2: Lửa tuần và số ngày có ghi trong tuần (T2–CN). */
function r2Week(ws){var C=r2Calc(),fire=0,days=0;for(var i=0;i<7;i++){var d=addD(ws,i);if(C.gain[d])fire+=C.gain[d];if(C.rec[d])days++;}return {fire:fire,days:days};}
function r2RecordedDays(){return Object.keys(r2Calc().rec).length;}

/* ---------- Mừng lên bậc: lần lượt từng thẻ, chờ đóng popup đang mở ---------- */
function r2Queue(ups){ups.forEach(function(a){R2_QUEUE.push(a);});clearTimeout(R2_FLUSH_T);R2_FLUSH_T=setTimeout(r2Flush,700);}
function r2Flush(){
  if(!R2_QUEUE.length||OV||(typeof NBOPEN!=='undefined'&&NBOPEN))return;
  var a=R2_QUEUE.shift();if(!H(a.id)){r2Flush();return;}
  if(a.master){masterShow(a.id);return;}
  fanfare();bigStamp(a.lv===3?'t':'f');
  if(a.lv===2){showTreeAward(a.id,a.stamp);return;}
  setTimeout(function(){if(!OV)offerTier(a.id);else r2Flush();},1100);
}
var r2CloseOv=closeOv;
closeOv=function(){var out=r2CloseOv.apply(this,arguments);if(R2_QUEUE.length){clearTimeout(R2_FLUSH_T);R2_FLUSH_T=setTimeout(r2Flush,420);}return out;};

/* ---------- Gắn vào luồng lưu, ghi nhận, hoàn tác, mở app ---------- */
var r2Save=save;
save=function(now){if(S&&!SAVE_BLOCK){R2C=null;r2Snapshot();}return r2Save(now);};

var r2WriteRecord=writeRecord;
writeRecord=function(id,d,m,note,why){
  var u=H(id),before=u?{lv:u.lv,lvSince:u.lvSince,master:u.master}:null,treeHad=!!(S.treeCards||{})[id],stamps=Object.keys(S.stampLetters||{});
  var out=r2WriteRecord(id,d,m,note,why);if(!out)return out;
  R2C=null;var ups=r2Sync();out.r2={before:before,treeHad:treeHad,stamps:stamps,ups:ups};
  if(ups.length){save(true);var fresh=Object.keys(S.stampLetters||{}).filter(function(k){return stamps.indexOf(k)<0;});ups.forEach(function(a){if(a.lv===2&&fresh.length)a.stamp=+fresh[0];});r2Queue(ups);}
  return out;
};
var r2Undo=undoRecord29;
undoRecord29=function(token){
  var old=RECORD_UNDO,ok=old&&String(old.token)===String(token)&&RECORD_VERSIONS[old.day+'|'+old.id]===old.token;r2Undo(token);
  if(!ok||!old.r2||!old.r2.ups||!old.r2.ups.length)return;
  var u=H(old.id),b=old.r2.before;if(u&&b){u.lv=b.lv;u.lvSince=b.lvSince;if(b.master===undefined)delete u.master;else u.master=b.master;}
  if(!old.r2.treeHad&&S.treeCards)delete S.treeCards[old.id];
  Object.keys(S.stampLetters||{}).forEach(function(k){if(old.r2.stamps.indexOf(k)<0&&!S.stampLetters[k].letter)delete S.stampLetters[k];});
  R2_QUEUE=R2_QUEUE.filter(function(a){return a.id!==old.id;});R2C=null;save(true);refreshAll();
};

/* Lần mở đầu tiên ở v2: tính lại bậc theo mốc mới, Lửa tính từ lịch sử; Shin báo thẻ nào đã lên bậc. */
function r2Migrate(){
  if(!S||LOAD_ISSUE32)return;var first=!S.r2;R2C=null;var ups=r2Sync();
  if(first){S.r2={v:2,migrated:dk()};if(ups.length&&!DEMO)R2_NOTICE=ups;} /* Demo mới dựng: chỉnh bậc lặng lẽ */
  else if(ups.length)r2Queue(ups);
}
function r2Notice(){
  var ups=R2_NOTICE;R2_NOTICE=null;if(!ups||!ups.length)return;if(OV){R2_NOTICE=ups;setTimeout(r2Notice,1200);return;}
  var by={};ups.forEach(function(a){var r=by[a.id]=by[a.id]||{id:a.id};if(a.master)r.master=true;if(a.lv)r.lv=Math.max(r.lv||0,a.lv);});
  var rows=Object.keys(by).map(function(id){var r=by[id],u=H(id);return '<li><b>'+esc(sname(id))+'</b> · '+(r.master?'Thành nếp':LV_NAME[u.lv])+' <small>('+r2Count(id)+' '+unitOf(id)+')</small></li>';}).join('');
  openMini('<h2 style="margin:4px 0 8px">Thẻ của bạn đã lên bậc</h2>'+say('shin','proud','Cách tính mới: thẻ tự lên bậc theo số ngày đã làm, không cần ai xác nhận.')+'<ul style="margin:12px 0;padding-left:20px;line-height:1.8">'+rows+'</ul><button class="btn btn--wide" data-act="close">Tiếp tục</button>');
  fanfare();
}
var r2Load=load;
load=function(){var out=r2Load.apply(this,arguments);r2Migrate();return out;};
var r2ApplyRestore=applyRestore32;
applyRestore32=function(){var out=r2ApplyRestore.apply(this,arguments);if(S){r2Migrate();save(true);render();if(R2_NOTICE)setTimeout(r2Notice,500);}return out;};
/* Ngày đổi khi app vẫn mở: ngày nghỉ hôm qua có thể cộng ngày cho thẻ. */
var R2_DAY=dk();
document.addEventListener('visibilitychange',function(){if(document.hidden||!S||SAVE_BLOCK)return;if(R2_DAY!==dk()){R2_DAY=dk();R2C=null;var ups=r2Sync();if(ups.length){save(true);r2Queue(ups);}refreshAll();}});

/* ===== SECTION: rules-v2-ui (M.Claude.3.3.32 · đợt 2 giao diện) ===== */
/* 1) Trang Hôm nay: thẻ duy trì nằm dưới thẻ đang rèn, kèm "làm gần nhất"; chạm là ghi. */
function r2KeepLine(id){var d=dk(),m=mark(d,id);if(m)return RECORD_LABEL[m]+' hôm nay';var last=r2LastDone(id),n=r2IdleDays(id),u=H(id);if(!last)return 'Chưa làm lại';if(last===(u&&u.master)&&!((S.log[last]||{})[id]))return 'Thành nếp '+(n?n+' ngày trước':'hôm nay');return 'Làm gần nhất: '+(n?n+' ngày trước':'hôm nay');}
function r2KeepToday(){
  var all=keepIds();if(!all.length)return '';var d=dk();
  var list=all.slice().sort(function(a,b){var ma=mark(d,a)?1:0,mb=mark(d,b)?1:0;return ma-mb||r2IdleDays(b)-r2IdleDays(a);}),shown=list.slice(0,3);
  var VT={fade:['Shin nhắc','fade'],web:['Mạng nhện','web']};
  return '<section class="keep31" data-flow-type aria-label="Thẻ đang duy trì"><div class="keep31-head"><h2>Đang duy trì</h2>'+(all.length>shown.length?'<button class="flow-link" data-act="keeps">Xem tất cả · '+all.length+'</button>':'')+'</div>'+
    shown.map(function(id){var st=mark(d,id)?'live':r2KeepState(id),tag=VT[st];return '<button class="keep31-row'+(mark(d,id)?' is-done':'')+(st==='web'?' is-web':'')+'" data-act="note" data-v="'+id+'|'+d+'" aria-label="Ghi nhận '+esc(sname(id))+'">'+emblem(id,36)+'<span class="keep31-text"><b>'+esc(sname(id))+'</b><small>'+esc(r2KeepLine(id))+'</small></span>'+(tag?'<span class="keep31-tag '+tag[1]+'">'+(st==='web'?webIcon():'')+tag[0]+'</span>':'')+'<span class="keep31-plus" aria-hidden="true">'+mi(mark(d,id)?'edit':'add')+'</span></button>';}).join('')+'</section>';
}
var r2Today=vToday;
vToday=function(){var h=r2Today(),k=r2KeepToday();if(!k)return h;var i=h.lastIndexOf('</div>');return i<0?h+k:h.slice(0,i)+k+h.slice(i);};

/* 2) Thẻ tuần: dòng "Lửa tuần · y/7 ngày có ghi" và đánh dấu rõ ngày nghỉ, ngày lỡ. */
function r2WeekDays(ws){var C=r2Calc(),t=dk(),out=[];for(var i=0;i<7;i++){var d=addD(ws,i),k=d>t?'future':C.rec[d]?(C.gain[d]===2?'full':'rec'):C.free[d]?'rest':C.miss[d]?'miss':d===t?'today':'none';out.push({d:d,k:k});}return out;}
function r2Sign(n){return n>0?'+'+n:n<0?'−'+Math.abs(n):'0';}
function r2WeekFire(ws){
  var w=r2Week(ws),days=r2WeekDays(ws),label={full:'+2',rec:'+1',rest:'Nghỉ',miss:'Lỡ',today:'Hôm nay',future:'',none:''},miss=days.filter(function(x){return x.k==='miss';}).length;
  return '<div class="wkfire31" data-flow-type><p>'+mi('local_fire_department')+'<b>Lửa tuần: '+r2Sign(w.fire)+'</b><span>· '+w.days+'/7 ngày có ghi</span></p><div class="wkfire31-days">'+days.map(function(x,i){return '<span class="'+x.k+'" title="'+dm(x.d)+'"><i>'+label[x.k]+'</i><small>'+WDS[i]+'</small></span>';}).join('')+'</div>'+(miss?'<small class="wkfire31-note">Ngày “Lỡ”: bạn chưa ghi. Hãy sẵn sàng kể lý do khi trình thẻ.</small>':'')+'</div>';
}
var r2DrawWeek=drawWeek;
drawWeek=function(){r2DrawWeek();var shin=OV&&$('.wkshin',OV);if(shin&&!$('.wkfire31',OV))shin.insertAdjacentHTML('afterend',r2WeekFire(WK));};

/* 3) Shin hỏi khi mở app: tối đa 1 lần mỗi ngày, ở lần mở đầu tiên; không hỏi nếu mọi thẻ đã ghi hôm nay. */
function r2AskPick(){
  var d=dk(),keeps=keepIds().filter(function(id){return !mark(d,id)&&r2IdleDays(id)>=7;}).sort(function(a,b){return r2IdleDays(b)-r2IdleDays(a);});
  if(keeps.length)return {id:keeps[0],keep:true};
  var train=r2TrainingNow().filter(function(id){return !mark(d,id)&&!flowDraft(d,id);}).sort(function(a,b){return (needFor(a,H(a).lv)-r2Count(a))-(needFor(b,H(b).lv)-r2Count(b));});
  return train.length?{id:train[0],keep:false}:null;
}
function r2Ask(){
  if(!S||LOAD_ISSUE32||!S.name||OV||R2_NOTICE||location.hash==='#checkin')return;
  S.r2=S.r2||{v:2};if(S.r2.ask===dk())return;
  var d=dk();if(!handList().concat(keepIds()).some(function(id){return !mark(d,id);}))return;
  var p=r2AskPick();if(!p)return;S.r2.ask=d;save(true);
  var id=p.id,name='<b>'+esc(S.name)+'</b>',left=needFor(id,H(id).lv)-r2Count(id),q;
  if(p.keep)q='“'+esc(sname(id))+'” đã '+r2IdleDays(id)+' ngày chưa làm. Hôm nay '+name+' làm lại chưa?';
  else q='Hôm nay '+name+' đã làm “'+esc(sname(id))+'” chưa?'+(left>0&&left<=3?' Còn '+left+' '+unitOf(id)+' nữa là lên bậc '+esc(LV_NAME[Math.min(3,(H(id).lv||1)+1)]||'')+'.':'');
  openMini('<div class="ask31">'+say('shin',p.keep?'worry':'hi',q)+'<div class="stack" style="margin-top:14px"><button class="btn btn--wide" data-act="r2AskYes" data-v="'+id+'">Rồi, ghi luôn</button><button class="btn btn--ghost btn--wide" data-act="r2AskNo" data-v="'+id+'">Chưa</button></div></div>');
}
function r2AskTip(id){var dip=id&&HMAP[id]&&isDip(id),pool=(typeof GROWTH_TIPS!=='undefined'?GROWTH_TIPS:[]).filter(function(t){return (t[0]==='b1'||t[0]==='b4')&&(dip||t[1].indexOf('gặp dịp')<0);});return pool.length?pool[Math.floor(Math.random()*pool.length)][1]:'Làm phiên bản nhỏ nhất cũng được tính.';}
document.addEventListener('click',function(e){var b=e.target.closest('[data-act=r2AskYes],[data-act=r2AskNo]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var id=b.dataset.v;closeOv(true);
  if(b.dataset.act==='r2AskYes'){if(H(id))openNote(id,dk());}else{PG=0;render();window.scrollTo(0,0);toast('<b>Shin nhắn:</b> '+esc(r2AskTip(id)),6000);}},true);
document.addEventListener('visibilitychange',function(){if(!document.hidden&&S&&!SAVE_BLOCK)setTimeout(r2Ask,600);});

/* ===== SECTION: rules-v2-text (M.Claude.3.3.32 · đợt 3 chữ) ===== */
/* Gợi ý ghi chú khi Đã làm / Một phần: hướng về ích lợi trước, gợi ý “làm gì, ở đâu” cũ xếp sau (Xem thêm). */
var R2_BEN_DEFAULT=['Mình tiến bộ thêm một chút','Mình thấy vui với bản thân','Gần hơn với người mình muốn trở thành'];
var r2NoteHints=noteHints34;
noteHints34=function(id,status){var E=r2NoteHints(id,status);if(status==='n'||status==='x')return E;var ben=(HMAP[id]&&HMAP[id].ben)||R2_BEN_DEFAULT,old=(E&&E.o)||[];return {q:'Hôm nay thói quen này giúp bạn điều gì?',o:ben.concat(old.filter(function(o){return ben.indexOf(o)<0;}))};};
