/* =========================================================
   MODULE MẪU · cách một module gắn vào lõi Proskills
   Sao chép thư mục này khi làm module mới. 6 việc bắt buộc:
   1. PS.guard(ID) đầu tiên: thiếu hồ sơ hoặc chưa qua cổng thì về trang chủ.
   2. Bài làm: PS.load(ID) / PS.save(ID, S). Không tự đặt khóa lưu trữ khác ngoài "ps.mod.<ID>.*".
   3. Mỗi lần lưu: PS.report(ID, {xp, ins, done, total, days}) để trang chủ tính tổng.
   4. Tên, lớp, thầy cô: luôn đọc PS.profile(), PS.given(), PS.teacher() (không lưu bản riêng).
   5. Sổ tay 3 thẻ: Tổng quan | thẻ riêng của module | Cài đặt = PS.settingsHTML(...) + PS.wireSettings(...).
   6. Nghe sự kiện "ps:change": beforeBackup → lưu ngay; tôn trọng window.PS_NOSAVE.
   7. Demo giáo viên (nếu có): mật khẩu chung PS_CONFIG.DEMO_PASS qua PS.demoParam/PS.checkDemo/PS.demoAsk, lưu ps.demo.<ID> (xem AGENTS.md mục 3.9).
   ========================================================= */
(function (W, D) {
  'use strict';
  var PS = W.PS, ID = 'mau', MOD = PS.mod(ID), esc = PS.esc, icon = PS.icon;
  if (!PS.guard(ID)) return;

  /* ---------- dữ liệu bài học (module thật tách ra file content/*.js) ---------- */
  var ACTS = [
    { id: 'a1', t: 'Hoạt động 1 · Khởi động', xp: 10 },
    { id: 'a2', t: 'Hoạt động 2 · Luyện tập', xp: 15 },
    { id: 'a3', t: 'Hoạt động 3 · Vận dụng', xp: 20, ins: 1 }
  ];

  /* ---------- trạng thái ---------- */
  function blank() { return { v: 1, done: {}, xp: {}, ins: {}, days: {}, d: {} }; }
  var S = PS.load(ID) || blank();
  var saveT = null;
  function xpTotal() { var t = 0; for (var k in S.xp) t += S.xp[k]; return t; }
  function insTotal() { var t = 0; for (var k in S.ins) t += S.ins[k]; return t; }
  function doneCount() { return Object.keys(S.done).length; }
  function save(now) {
    clearTimeout(saveT);
    var w = function () { if (W.PS_NOSAVE) return; PS.save(ID, S); PS.report(ID, { xp: xpTotal(), ins: insTotal(), done: doneCount(), total: ACTS.length, days: S.days, ver: MOD.ver }); };
    if (now) w(); else saveT = setTimeout(w, 250);
  }
  W.addEventListener('ps:change', function (e) { var f = e.detail && e.detail.field; if (f === 'beforeBackup' || f === 'beforeRestore') save(true); if (f === 'profile' || f === 'teacher') render(); });
  W.addEventListener('pagehide', function () { save(true); });
  D.addEventListener('visibilitychange', function () { if (D.visibilityState === 'hidden') save(true); });

  /* thời gian học: chỉ đếm khi màn hình mở và có thao tác trong 60 giây gần nhất */
  var lastAct = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { W.addEventListener(ev, function () { lastAct = Date.now(); }, { passive: true }); });
  setInterval(function () {
    if (D.visibilityState !== 'visible' || Date.now() - lastAct > 60000) return;
    var k = PS.today(); S.days[k] = Math.round(((S.days[k] || 0) + 0.25) * 100) / 100; save();
  }, 15000);
  function markDay() { var k = PS.today(); if (!S.days[k]) { S.days[k] = 0.25; save(); } }

  /* ---------- giao diện ---------- */
  var APP = D.getElementById('app'), nbOpen = false;
  /* PS1.3.55 (ý 25): thanh trên chung · ‹ về một cấp | tên màn | Sổ tay. Module nhiều cấp: xem PS.nav trong core.js (cd02/engine.js là ví dụ đầy đủ). */
  function bar() { return PS.navHTML({ back: 'Proskills', title: MOD.code + ' · ' + MOD.title }); }
  var NAV = PS.nav({ mod: ID, tag: 'mau', get: function () { return { v: 'home' }; }, parent: function () { return null; }, depth: function () { return 0; },
    ser: function (v) { return { v: v.v }; }, de: function () { return { v: 'home' }; }, show: function () { render(); },
    intercept: function () { if (nbOpen) { closeNb(); return 1; } return 0; }, beforeLeave: function () { save(true); } });
  NAV.start(W.location.pathname);
  function render() {
    APP.innerHTML = bar() + '<div class="wrap"><h1>Chào <b class="nm">' + esc(PS.given()) + '</b>!</h1><p class="lead">Đây là module mẫu để kiểm tra khung Proskills. Hoàn thành hoạt động để thấy điểm cộng lên trang chủ.</p>' +
      ACTS.map(function (a, i) {
        var dn = !!S.done[a.id];
        return '<div class="act' + (dn ? ' done' : '') + '"><span class="act__n">' + (dn ? icon('check', 18, 3) : (i + 1)) + '</span><b>' + esc(a.t) + '</b><button type="button" class="ps-btn ps-btn--sm' + (dn ? ' ps-btn--soft' : '') + '" data-act="do" data-i="' + i + '"' + (dn ? ' disabled' : '') + '>' + (dn ? 'Đã xong' : 'Hoàn thành') + '</button></div>';
      }).join('') + '<p class="ps-small">' + esc(PS.cfg.APP) + ' ' + esc(PS.cfg.APP_VER) + ' · Module mẫu ' + esc(MOD.ver) + '</p></div>';
  }
  function doAct(i) {
    var a = ACTS[i]; if (S.done[a.id]) return;
    S.done[a.id] = Date.now(); S.xp[a.id] = a.xp; if (a.ins) S.ins[a.id] = a.ins; markDay(); save(true);
    PS.toast('<b>+' + a.xp + ' XP</b>' + (a.ins ? ' · +' + a.ins + ' Insight' : '') + ' · Giỏi lắm, ' + esc(PS.given()) + '!');
    render();
  }

  /* ---------- Sổ tay 3 thẻ ---------- */
  var TAB = 'tq';
  function nbOverview() {
    return '<div class="tiles"><div class="tl">' + icon('check', 16) + '<b>' + doneCount() + '/' + ACTS.length + '</b><small>Hoạt động</small></div><div class="tl">' + icon('star', 16) + '<b>' + xpTotal() + '</b><small>XP module</small></div><div class="tl">' + icon('bulb', 16) + '<b>' + insTotal() + '</b><small>Insight</small></div><div class="tl">' + icon('flame', 16) + '<b>' + PS.streak() + '</b><small>Chuỗi ngày (chung)</small></div></div>' +
      '<p class="ps-small">Tổng XP của mọi khóa: <b>' + PS.totals().xp + '</b> (xem ở trang chính).</p>';
  }
  function nbOwn() { return '<p class="ps-small">Thẻ riêng của module (ví dụ: Bí kíp ở TK, Hồ sơ Career ở CD). Module tự quyết nội dung thẻ này.</p>'; }
  function nbSettings() {
    return PS.settingsHTML({
      ctx: 'module', mod: ID, ver: MOD.ver,
      pace: { status: '1 hoạt động/ngày', body: '<p class="ps-small">Phần nhịp học và lời nhắc do module tự làm (ví dụ: số ải mỗi ngày, giờ nhắc).</p>' },
      extra: [{ k: 'own', ic: 'gift', title: 'Mục riêng của module', status: 'Ví dụ', body: '<p class="ps-small">Ví dụ: Túi cứu viện ở TK. Mục riêng luôn nằm sau Âm thanh, trước Sao lưu.</p>' }]
    });
  }
  function drawNb() {
    var el = D.getElementById('nb'); if (!el) return;
    el.innerHTML = '<div class="nb__in"><div class="nb__top"><h2>Sổ tay</h2><button type="button" class="nb__x" data-act="nbClose" aria-label="Đóng sổ tay">' + icon('close', 20) + '</button></div>' +
      '<div class="tabs" role="tablist">' + [['tq', 'Tổng quan'], ['own', 'Thẻ riêng'], ['cd', 'Cài đặt']].map(function (t) { return '<button type="button" role="tab" aria-selected="' + (TAB === t[0]) + '" class="' + (TAB === t[0] ? 'on' : '') + '" data-act="tab" data-t="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      '<div id="nbBody">' + (TAB === 'tq' ? nbOverview() : (TAB === 'own' ? nbOwn() : nbSettings())) + '</div></div>';
    if (TAB === 'cd') PS.wireSettings(D.getElementById('nbBody'), { ctx: 'module', mod: ID, onChange: function () { render(); } });
  }
  function openNb() { if (nbOpen) return; nbOpen = true; var el = D.createElement('div'); el.id = 'nb'; el.className = 'nb'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Sổ tay'); D.body.appendChild(el); D.body.classList.add('ps-lock'); drawNb(); }
  function closeNb() { var el = D.getElementById('nb'); if (el) el.parentNode.removeChild(el); nbOpen = false; D.body.classList.remove('ps-lock'); render(); }

  D.addEventListener('click', function (e) {
    var b = PS.closest(e.target, '[data-act]'); if (!b) return;
    var a = b.getAttribute('data-act');
    if (a === 'home') { save(true); PS.home(); }
    else if (a === 'do') doAct(+b.getAttribute('data-i'));
    else if (a === 'nb') openNb();
    else if (a === 'nbClose') closeNb();
    else if (a === 'tab') { TAB = b.getAttribute('data-t'); drawNb(); }
  });
  markDay(); render(); save(true);
})(window, document);
