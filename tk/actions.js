/* TK · Nhật Bản Du Ký · tk/actions.js · THAO TÁC: một bộ nghe click cho cả module
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* =========================================================
   PHẦN 8 · THAO TÁC
   ========================================================= */
document.addEventListener('click', function(e){
  var t=e.target.closest('[data-act]'); if(!t) return;
  var a=t.getAttribute('data-act'), n=+t.getAttribute('data-n'), i=+t.getAttribute('data-i'), j=+t.getAttribute('data-j');
  if(a!=='nb' && a!=='nbTab' && a!=='nbClose' && nbOpen && !t.closest('#nb')) closeNb(true);
  if(askOpen && !t.closest('#ask') && a!=='ask') closeAsk(true);
  switch(a){
    case 'psHome': save(true); PS.home(); break;
    case 'home': if(nbOpen) closeNb(true); V.scroll=0; go('home'); break;
    case 'ai': go('ai',{n:n}); break;
    case 'open': go('act',{id:t.getAttribute('data-id')}); break;
    case 'locked': toast(!BUILT[n] ? 'Ải này đang được xây dựng, sẽ mở ở bản sau.' : (!startDone() ? 'Hoàn thành điểm Lên đường để mở ải này.' : 'Qua '+aiOf(n-1).vn+' và nhận con dấu để mở ải này.')); break;
    case 'lockedAct': toast('Xong chặng trước để mở chặng này nhé.'); break;
    case 'nextStep': nextStep(); break;
    case 'prevStep': prevStep(); break;
    case 'need': if(t.classList.contains('need')) gotoNeed(t.getAttribute('data-q')); break;
    case 'carPrev': carMove(-1); break;
    case 'carNext': carMove(1); break;
    case 'cls': clsPick(i,j); break;
    case 'tf': var x=xs(CUR.id,CUR.i); x.a=x.a||{}; x.a[i]=t.getAttribute('data-v')==='1'; sfx(x.a[i]===CUR.s.items[i].a?'ok':'no'); save(); drawStep(); break;
    case 'speak': speak(t.getAttribute('data-t')); break;
    case 'pace': S.d.pace=n; save(true); updateNav();
      if($('#nbBody .ps-set')){ $$('#nbBody [data-act="pace"]').forEach(function(b){ b.classList.toggle('sel', +b.getAttribute('data-n')===n); }); var pl=$('#paceLn'); if(pl) pl.innerHTML=paceLine(); var pst=$('.ps-srow[data-k="pace"] .ps-srow__st'); if(pst) pst.textContent=pace()+' ải/ngày'; }
      else drawNb(S.d.seen); break;
    case 'cerTap': cerTap(); break;
    case 'veh': vehAns(i,t.getAttribute('data-v')); break;
    case 'sign': signAns(i,j); break;
    case 'scn': scnTap(t.getAttribute('data-k')); break;
    case 'mood': var cid=t.getAttribute('data-c'), ms=CHAR[cid].moods, mi=(+t.getAttribute('data-m')+1)%ms.length; t.setAttribute('data-m',mi); t.innerHTML=av(cid,ms[mi]); sfx('tap'); break;
    case 'soi': xs(CUR.id,CUR.i).soi=1; save(); drawStep(); break;
    case 'pick': branchPick(i); break;
    case 'retry': branchRetry(); break;
    case 'seg': segTap(i); break;
    case 'sw': swAnswer(t.getAttribute('data-v')); break;
    case 'swNext': swNext(); break;
    case 'chip': chipTap(i,j); break;
    case 'sitCheck': sitCheck(i); break;
    case 'rcf': rcTap(t.getAttribute('data-k')); break;
    case 'ord': ordTap(i); break;
    case 'tikOpen': tikOpen(t.getAttribute('data-u')); return;
    case 'mcq': mcqPick(i,j); break;
    case 'exp': expTap(t.getAttribute('data-k')); break;
    case 'spot': spotOpen(t.getAttribute('data-k')); break;
    case 'spa': spotAns(j); break;
    case 'vwatched': vWatched(); break;
    case 'vans': vAns(j); break;
    case 'vnext': vNext(); break;
    case 'cq': calcAns(j); break;
    case 'chk': chkTap(i); break;
    case 'chkSee': xs(CUR.id,CUR.i).seen=1; save(); drawStep(); break;
    case 'sosSave': sosSave(); break;
    case 'ticket': openTicket(); break;
    case 'ticketSave': ticketSave(); break;
    case 'ask': if(askOpen) closeAsk(); else openAsk(); break;
    case 'askClose': closeAsk(); break;
    case 'askCh': askCh=t.getAttribute('data-k')||null; drawAskBody(); $('#ask').scrollTo(0,0); break;
    case 'askGo': closeAsk(true); go('ai',{n:n}); break;
    case 'demoExit': exitDemo(); break;
    case 'rep': if(nbOpen) closeNb(true); $$('.ov').forEach(function(o){ o.remove(); }); go('rep'); break;
    case 'pdf': makePDF(); break;
    case 'printA4': buildA4(); document.body.classList.add('printa4'); setTimeout(function(){ window.print(); },300); break;
    case 'goalk': goalPick(t.getAttribute('data-k')); break;
    case 'layer': layerTap(i); break;
    case 'ginSkip': if(GINF) GINF(); break;
    case 'dlgOpen': S.d.dlgOpen=+t.getAttribute('data-n'); render(false); break;
    case 'trnSkip': endTransition(); break;
    case 'redoAsk': redoAsk(t.getAttribute('data-id')); break;
    case 'redoGo': redoGo(t.getAttribute('data-id')); break;
    case 'costq': costAns(j); break;
    case 'rptOpen': if(V.v!=='rep') go('rep'); openReport(true,false); break;
    case 'rptPdf': RPT.done.pdf=1; drawReport(); makePDF(); break;
    case 'rptVd': RPT.done.vd=1; drawReport(); vdPNG(); break;
    case 'rptTeams': rptTeams(); break;
    case 'rptClose': $$('.ov').forEach(function(o){ o.remove(); }); break;
    case 'print': window.print(); break;
    case 'brag': brag(); break;
    case 'tourNext': tourI++; showTour(); break;
    case 'tourSkip': endTour(); break;
    case 'rmDay': var r=remind(), k=r.d.indexOf(i); if(k>=0){ if(r.d.length>1) r.d.splice(k,1); } else r.d.push(i); r.d.sort(); save(); t.classList.toggle('sel', r.d.indexOf(i)>=0); var gg=$('#rmG'); if(gg) gg.href=gcalUrl(); break;
    case 'rmIcs': rmIcs(); break;
    case 'doNow': var did=t.getAttribute('data-id'), st=stOf(did); st.i=i; save(); go('act',{id:did}); break;
    case 'chest': openChest(n); break;
    case 'claim': claim(n); break;
    case 'closeOv': $$('.ov').forEach(function(o){ o.remove(); }); break;
    case 'nb': S.d.nbTab='cd'; openNb(); break; /* PS1.3.25: nút Sổ tay mở thẻ Cài đặt trước */
    case 'nbClose': closeNb(); break;
    case 'nbTab': S.d.nbTab=t.getAttribute('data-t'); save(); drawNb(S.d.seen); break;
    case 'full': toggleFull(); break;
  }
});
document.addEventListener('keydown', function(e){
  if(e.key==='Escape'){ if($('.ov')) $$('.ov').forEach(function(o){ o.remove(); }); else if(askOpen) closeAsk(); else if(nbOpen) closeNb(); else if(tourI>=0) endTour(); }
  if((e.key==='Enter'||e.key===' ') && e.target && e.target.getAttribute && e.target.getAttribute('role')==='button' && e.target.hasAttribute('data-act')){ e.preventDefault(); e.target.click(); }
});
document.addEventListener('pointerdown', function(e){ if($('#toast').classList.contains('show') && !e.target.closest('#toast')) hideToast(); });

