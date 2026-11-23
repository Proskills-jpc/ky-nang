/* TK · Nhật Bản Du Ký · tk/game-entry.js · CỬA VÀO GAME ẢI 05 + KHỞI ĐỘNG MODULE (nạp sau cùng)
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* Ask at the entrance to stage 05. The game is loaded only after consent. */
(function(){
  'use strict';
  var baseRender=render,mode=null,loading=null,visit=0,focusBefore=null,overflowBefore=null;
  var release='TK15';
  /* kiểu của hộp mời vào game: nằm cuối tk.css */
  function isStreet(){return !!(S.onb&&S.gate&&aiOpen(5)&&((V.v==='ai'&&+V.n===5)||(V.v==='act'&&ACTS[V.id]&&ACTS[V.id].ai===5)));}
  function clearPrompt(){
    var p=document.getElementById('street-invite');if(p){p.remove();document.body.style.overflow=overflowBefore||'';overflowBefore=null;}
    if(APP)APP.inert=false;
    var n=document.getElementById('nav');if(n)n.inert=false;
    if(focusBefore&&focusBefore.isConnected){focusBefore.focus({preventScroll:true});focusBefore=null;}
  }
  function switchButton(){
    if(document.querySelector('[data-street-choice="invite"]'))return;
    var back=APP.querySelector('.wrap>.acthead')||APP.querySelector('.wrap>.aihero');if(!back)return;
    var b=document.createElement('button');b.type='button';b.className='street-mode-link';b.dataset.streetChoice='invite';b.innerHTML=icon('bike',15)+' Đổi cách học';
    back.insertAdjacentElement('beforebegin',b);
  }
  function prompt(error){
    clearPrompt();if(!isStreet())return;
    var el=document.createElement('div');el.className='street-invite';el.id='street-invite';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-labelledby','street-invite-title');el.setAttribute('aria-describedby','street-invite-desc');
    var busy=mode==='loading';
    el.innerHTML='<div class="street-invite-box"><div class="street-invite-art" aria-hidden="true">'+hau('cheer')+'<span>'+icon('bike',44)+'</span></div><small>CỬA ẢI 05 · PHỐ PHƯỜNG</small><h2 id="street-invite-title">Bạn muốn vào Game mode không?</h2><p id="street-invite-desc">'+(error?'Chưa mở được cảnh game. Bạn có thể thử lại hoặc tiếp tục học như hiện tại.':'Bước vào phố Nhật, chạm để di chuyển, gặp nhân vật và xử lý các tình huống trên đường.')+'</p><button class="btn street-invite-game" data-street-choice="game" '+(busy?'disabled':'')+'>'+(busy?'<span class="street-game-busy" aria-hidden="true"></span> Đang mở phố Nhật…':icon('next',18)+' '+(error?'Thử mở lại Game mode':'Vào Game mode'))+'</button><button class="btn street-invite-classic" data-street-choice="classic">Học như hiện tại</button><p class="street-invite-note">Hai cách học dùng chung bài làm và tiến độ.<br>Bạn có thể đổi cách học ngay trong ải.</p><span class="sr" role="status">'+(busy?'Đang tải cảnh game':'')+'</span></div>';
    focusBefore=document.activeElement;overflowBefore=document.body.style.overflow;document.body.style.overflow='hidden';document.body.appendChild(el);APP.inert=true;var n=document.getElementById('nav');if(n)n.inert=true;
    var button=el.querySelector('button:not([disabled])');if(button)button.focus({preventScroll:true});
  }
  function loadScript(file,globalName){
    if(window[globalName])return Promise.resolve();
    return new Promise(function(resolve,reject){
      var el=document.createElement('script'),timer=setTimeout(fail,20000);
      function fail(){clearTimeout(timer);el.remove();reject(new Error('Game resource unavailable'));}
      el.src='./game/'+file+'?v='+release;
      el.onload=function(){clearTimeout(timer);if(window[globalName])resolve();else fail();};el.onerror=fail;document.body.appendChild(el);
    });
  }
  function loadStyle(){
    var old=document.getElementById('street-game-style');if(old&&old.dataset.ready==='1')return Promise.resolve();
    return new Promise(function(resolve,reject){
      var el=document.createElement('link'),timer=setTimeout(fail,20000);
      function fail(){clearTimeout(timer);el.remove();reject(new Error('Game style unavailable'));}
      el.id='street-game-style';el.rel='stylesheet';el.href='./game/street-game.css?v='+release;
      el.onload=function(){clearTimeout(timer);el.dataset.ready='1';resolve();};el.onerror=fail;document.head.appendChild(el);
    });
  }
  function loadGame(){
    if(loading)return loading;
    loading=Promise.all([loadStyle(),loadScript('navigation.js','HP05Navigation').then(function(){return loadScript('street-game.js','HP05StreetGame');})]).catch(function(error){loading=null;throw error;});
    return loading;
  }
  function choose(choice){
    if(!isStreet()){clearPrompt();return;}
    if(choice==='classic'){
      var hadGame=window.HP05StreetGame&&window.HP05StreetGame.isActive();
      mode='classic';clearPrompt();if(window.HP05StreetGame)window.HP05StreetGame.stop();
      if(hadGame)render(false);else switchButton();return;
    }
    if(choice==='invite'){mode=null;prompt();return;}
    if(choice!=='game'||mode==='loading')return;
    mode='loading';prompt();var token=visit;
    loadGame().then(function(){
      if(token!==visit||!isStreet()||mode!=='loading')return;
      mode='game';clearPrompt();render(true);
    }).catch(function(){if(token===visit&&isStreet()&&mode==='loading'){mode=null;prompt(true);}});
  }
  render=function(enter){
    if(!isStreet()){
      if(mode!==null||document.getElementById('street-invite')){mode=null;visit++;clearPrompt();}
      if(window.HP05StreetGame)window.HP05StreetGame.stop();baseRender(enter);return;
    }
    if(mode==='game'&&window.HP05StreetGame){
      try{window.HP05StreetGame.render(enter);return;}
      catch(error){window.HP05StreetGame.stop();mode=null;baseRender(enter);switchButton();prompt(true);return;}
    }
    baseRender(enter);switchButton();
    if(mode===null||mode==='loading')prompt();
  };
  document.addEventListener('click',function(e){var t=e.target.closest('[data-street-choice]');if(!t)return;e.preventDefault();choose(t.dataset.streetChoice);});
  document.addEventListener('keydown',function(e){
    var dialog=document.getElementById('street-invite');if(!dialog)return;
    if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();choose('classic');return;}
    if(e.key==='Tab'){
      var buttons=Array.from(dialog.querySelectorAll('button:not([disabled])')),first=buttons[0],last=buttons[buttons.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  },true);
  window.HP05StreetEntry={choose:choose,invite:function(){choose('invite');},isStreet:isStreet,getMode:function(){return mode;},renderClassic:baseRender};
})();


/* khởi động (luôn ở cuối tệp nạp sau cùng) */
var TK_GO = PS.goParam();
NAV.start(location.pathname);   /* PS1.3.55: bỏ ?demo, ?go khỏi địa chỉ; đếm mục lịch sử cho nút ‹ */
if(TK_OK){
  if(ASK_DEMO) PS.demoAsk(function(ok){ if(ok) enterDemo(); else location.replace(location.pathname); });
  else if(WANT_DEMO && !S.demo) enterDemo();
  else if(!S.gate){
    /* lần đầu vào module sau khi qua cổng ở trang chủ: mở màn văn điệp như TK13 */
    S.onb=1; S.gate=1; S.d.firstRun=1; markDay(); save(true);
    gateIntro(function(){ render(true); toast('Chính xác! Ngộ Không mê đào tiên lắm. Lên đường thôi!'); });
  }
  else { S.onb=1; markDay(); markVisit();
    if(TK_GO && ACTS[TK_GO] && actOpen(TK_GO)){ var gv={v:'act', id:TK_GO}; NAV.go(gv); V=gv; } /* PS1.3.55 (ý 24): Học tiếp mở thẳng chặng */
    render(true); }
}
