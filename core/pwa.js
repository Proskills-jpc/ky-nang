/* =========================================================
   PROSKILLS · CÀI ỨNG DỤNG VÀ CẬP NHẬT (pwa.js)
   Một ứng dụng Proskills cho mọi module: service worker đặt ở thư mục gốc.
   Nút có thuộc tính data-pwa="install" ở bất kỳ trang nào sẽ mở hướng dẫn cài.
   Phỏng theo bộ PWA của TK13, viết lại kiểu ES5.
   ========================================================= */
(function (W, D) {
  'use strict';
  if (!W.PS) return;
  var PS = W.PS, APP = PS.cfg.APP || 'Proskills';
  var deferred = null, installedNow = false, reg = null, reloading = false, later = false;
  var mq = W.matchMedia ? W.matchMedia('(display-mode: standalone)') : null;
  function standalone() { return (mq && mq.matches) || W.navigator.standalone === true; }
  function installed() { return standalone() || installedNow; }
  function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function isAndroid() { return /Android/i.test(navigator.userAgent); }
  PS.standalone = standalone;

  function refresh() {
    D.documentElement.classList.toggle('ps-installed', installed());
    Array.prototype.forEach.call(D.querySelectorAll('[data-pwa="install"] [data-pwa-label]'), function (l) {
      var t = installed() ? (standalone() ? 'Đang dùng ứng dụng' : 'Đã cài ứng dụng') : 'Cài ứng dụng';
      if (l.textContent !== t) l.textContent = t;
    });
  }
  PS.pwaRefresh = refresh;
  function steps() {
    if (isIOS()) return '<ol class="ps-steps"><li>Mở link bằng <b>Safari</b>.</li><li>Chạm nút <b>Chia sẻ</b> (ô vuông có mũi tên lên), chọn <b>Thêm vào MH chính</b>.</li><li>Nếu thấy <b>Mở dưới dạng ứng dụng web</b>, hãy bật. Chạm <b>Thêm</b>.</li><li>Mở biểu tượng <b>' + APP + '</b> trên màn hình chính.</li></ol>';
    if (isAndroid()) return '<ol class="ps-steps"><li>Mở link bằng <b>Chrome</b>.</li><li>Chạm dấu <b>⋮</b> → <b>Cài đặt ứng dụng</b> hoặc <b>Thêm vào màn hình chính</b>.</li><li>Xác nhận, rồi mở biểu tượng <b>' + APP + '</b>.</li></ol>';
    return '<ol class="ps-steps"><li>Mở link bằng <b>Chrome</b> hoặc <b>Edge</b>.</li><li>Chọn biểu tượng cài đặt ở thanh địa chỉ, hoặc tìm mục cài trang này thành ứng dụng trong menu.</li><li>Trên điện thoại: Chrome (Android) hoặc Safari (iPhone).</li></ol>';
  }
  function help() {
    var file = location.protocol === 'file:';
    var html;
    if (installed()) html = '<p>' + (standalone() ? 'Bạn đang học trong ứng dụng ' + APP + '.' : 'Ứng dụng đã được cài. Mở biểu tượng ' + APP + ' trên máy để học.') + '</p>';
    else if (file) html = '<p>Để cài ứng dụng, hãy mở <b>đường link website</b> thầy cô gửi. Tệp mở trực tiếp trên máy chưa cài được.</p>';
    else html = '<p>Cài ' + APP + ' lên màn hình chính để mở nhanh, học cả khi mất mạng và giữ bài làm ổn định hơn.</p>' + steps() +
      '<p class="ps-small">Đã học trên trình duyệt trước đó? Vào Cài đặt → Tải sao lưu, rồi Khôi phục trong ứng dụng. Trên iPhone, ứng dụng và Safari lưu bài riêng.</p>';
    var btns = [];
    if (deferred && !installed()) btns.push({ t: 'Cài trên máy này', cls: 'ps-btn--go', fn: function () { native(); } });
    btns.push({ t: deferred && !installed() ? 'Để sau' : 'Đã hiểu', cls: 'ps-btn--soft' });
    PS.dialog({ icon: 'phone', title: installed() ? 'Ứng dụng ' + APP : 'Cài ứng dụng ' + APP, html: html + '<p class="ps-small">Video và bài đọc ở website khác vẫn cần mạng.</p>', buttons: btns });
  }
  PS.installHelp = help;
  function native() {
    var ev = deferred; if (!ev) { help(); return; }
    deferred = null;
    try {
      ev.prompt();
      if (ev.userChoice && ev.userChoice.then) ev.userChoice.then(function (c) { if (c && c.outcome === 'accepted') installedNow = true; refresh(); });
    } catch (e) { help(); }
  }
  /* PS1.3.54 · Cập nhật:
     - Mở app mà chưa làm gì (trang chủ: chưa gõ, chưa mở tấm nào; trong khóa: chưa chạm) → tự cập nhật, không hỏi.
     - Đang làm bài → thẻ "Proskills có bản mới" (Cập nhật ngay / Để sau). Bài làm được lưu trước khi cập nhật.
     - Quay lại app (từ nền) → kiểm tra bản mới, tối đa 1 lần / 30 phút.
     - Sau khi cập nhật: báo nhỏ "Đã cập nhật Proskills <phiên bản>". */
  var HUB = !!D.querySelector('main.hub'), busy = false, lastCheck = Date.now();
  function markBusy(e) { if (!HUB || e.type !== 'pointerdown') busy = true; }
  ['pointerdown', 'keydown', 'input'].forEach(function (n) { D.addEventListener(n, markBusy, true); });
  function idle() { return !busy && !D.querySelector('.sheet,.ps-ov,#nb,.ov'); }
  function showUpdate() {
    if (!reg || !reg.waiting || reloading) return;
    if (idle()) { startUpdate(); return; }
    if (later || D.getElementById('ps-update')) return;
    var el = D.createElement('div'); el.id = 'ps-update'; el.className = 'ps-upd'; el.setAttribute('role', 'status');
    el.innerHTML = '<div class="ps-upd__h"><img src="' + PS.url('icons/app-192.png') + '" width="36" height="36" alt=""><b>' + APP + ' có bản mới</b></div>' +
      '<div class="ps-upd__b"><button type="button" class="ps-btn ps-btn--go" data-pwa="update">Cập nhật ngay</button><button type="button" class="ps-btn ps-btn--soft" data-pwa="later">Để sau</button></div>' +
      '<p class="ps-upd__n">Bài làm được lưu trước khi cập nhật.</p>';
    D.body.appendChild(el);
  }
  function startUpdate() {
    if (!reg || !reg.waiting) return;
    PS.fire('beforeBackup'); /* module lưu bài ngay */
    reloading = true; reg.waiting.postMessage({ type: 'ACTIVATE_UPDATE' });
    var b = D.querySelector('[data-pwa="update"]'); if (b) { b.disabled = true; b.textContent = 'Đang cập nhật…'; }
  }
  function watch(r) {
    reg = r; if (r.waiting) showUpdate();
    r.addEventListener('updatefound', function () {
      var w = r.installing; if (!w) return;
      w.addEventListener('statechange', function () { if (w.state === 'installed' && navigator.serviceWorker.controller) showUpdate(); });
    });
  }
  D.addEventListener('visibilitychange', function () {
    if (D.hidden || !reg) return;
    busy = false; /* quay lại app = như vừa mở */
    if (reg.waiting) { showUpdate(); return; }
    if (Date.now() - lastCheck > 30 * 60000) { lastCheck = Date.now(); try { reg.update()['catch'](function () {}); } catch (e) {} }
  });
  (function () {
    var k = 'ps.lastVer', v = PS.cfg.APP_VER, old = null;
    try { old = W.localStorage.getItem(k); W.localStorage.setItem(k, v); } catch (e) {}
    if (old && old !== v) setTimeout(function () { PS.toast('Đã cập nhật ' + APP + ' ' + PS.esc(v) + '.', 2600); }, 900);
  })();

  /* PS1.3.54 · Học được khi không có internet: tải sẵn mọi khóa về máy (chạy ngầm, mỗi phiên bản một lần).
     Tải trang khóa + tệp có ?v= trong trang + tệp nạp riêng (OFFLINE_EXTRA: hình, phông, game). Ghi ps.offline. */
  var OFFLINE_EXTRA = {
    cd02: ['fonts/Lora-Variable.ttf', 'fonts/Lora-Italic-Variable.ttf'],
    tk: ['game/street.webp', 'game/street-game.js', 'game/navigation.js', 'game/street-game.css'],
    tc01: ['matter-0.19.0.min.js']
  };
  var warming = false;
  PS.warmAll = function (force) {
    var sw = navigator.serviceWorker, c = navigator.connection, ver = PS.cfg.APP_VER;
    if (warming) return;
    if (!sw || !sw.controller || !W.fetch || !W.URL) { if (force) PS.toast('Hãy mở ứng dụng khi có internet để tải về máy.'); return; }
    if (!force && c && (c.saveData || /2g/.test(c.effectiveType || ''))) return;
    var o = PS.get('ps.offline', null) || {};
    if (!force && o.v === ver && o.ok) return;
    var ids = PS.modules().filter(function (m) { return m.kind !== 'routine' && m.state === 'ready'; }).map(function (m) { return m.id; });
    var st = { v: ver, total: ids.length, n: 0, ok: 0, run: 1, bad: 0 };
    warming = true; PS.set('ps.offline', st); if (PS.offRefresh) PS.offRefresh();
    function get(u) { return W.fetch(u).then(function (r) { if (!r || !r.ok) st.bad++; }, function () { st.bad++; }); }
    function one(i) {
      if (i >= ids.length) {
        st.run = 0; st.ok = st.bad ? 0 : 1; st.at = Date.now(); warming = false; PS.set('ps.offline', st); if (PS.offRefresh) PS.offRefresh();
        if (force) PS.toast(st.ok ? 'Đã tải xong. Bạn học được khi không có internet.' : 'Chưa tải đủ. Thử lại khi có internet nhé.');
        return;
      }
      var page = new W.URL(PS.url(ids[i] + '/index.html'), location.href).href;
      W.fetch(page).then(function (r) { if (!r || !r.ok) throw 0; return r.text(); }).then(function (html) {
        var re = /(?:src|href)="([^"]+\?v=[^"]+)"/g, m, list = [];
        while ((m = re.exec(html))) list.push(new W.URL(m[1], page).href);
        (OFFLINE_EXTRA[ids[i]] || []).forEach(function (p) { list.push(new W.URL(p, page).href); });
        function f(k) { if (k >= list.length) { st.n++; PS.set('ps.offline', st); if (PS.offRefresh) PS.offRefresh(); one(i + 1); return; } get(list[k]).then(function () { f(k + 1); }); }
        f(0);
      })['catch'](function () { st.bad++; st.n++; one(i + 1); });
    }
    one(0);
  };
  function register() {
    if (!('serviceWorker' in navigator) || !W.isSecureContext || location.protocol === 'file:') return;
    try { navigator.serviceWorker.register(PS.url('sw.js'), { scope: PS.url('') }).then(watch)['catch'](function () {}); } catch (e) {}
  }
  W.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; refresh(); });
  W.addEventListener('appinstalled', function () { installedNow = true; deferred = null; refresh(); });
  if (mq && mq.addListener) mq.addListener(refresh);
  if ('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('controllerchange', function () { if (reloading) { W.location.reload(); return; } if (HUB) setTimeout(function () { PS.warmAll(false); }, 2500); });
  D.addEventListener('click', function (e) {
    var b = PS.closest(e.target, '[data-pwa]'); if (!b) return;
    var a = b.getAttribute('data-pwa');
    if (a === 'install') { e.preventDefault(); if (deferred && !installed()) native(); else help(); }
    else if (a === 'update') { e.preventDefault(); startUpdate(); }
    else if (a === 'later') { e.preventDefault(); later = true; var el = D.getElementById('ps-update'); if (el) el.parentNode.removeChild(el); }
  });
  /* PS1.3.34 · dùng như app thật: chặn phóng to bằng hai ngón (iPhone bỏ qua user-scalable=no), chặn menu nhấn giữ trên màn hình cảm ứng.
     Ô nhập vẫn dùng menu chọn chữ bình thường. */
  function isField(t) { return t && t.closest && t.closest('input,textarea,select,[contenteditable],.ps-sel'); }
  function stop(e) { if (e.cancelable) e.preventDefault(); }
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (n) { D.addEventListener(n, stop, { passive: false }); });
  D.addEventListener('touchmove', function (e) { if (e.touches && e.touches.length > 1) stop(e); }, { passive: false });
  D.addEventListener('contextmenu', function (e) {
    var coarse = W.matchMedia && W.matchMedia('(pointer: coarse)').matches;
    if (coarse && !isField(e.target)) e.preventDefault();
  });

  /* MutationObserver giữ nhãn nút luôn đúng khi module vẽ lại */
  if (W.MutationObserver) { var t = null; new MutationObserver(function () { clearTimeout(t); t = setTimeout(refresh, 60); }).observe(D.documentElement, { childList: true, subtree: true }); }
  refresh();
  if (D.readyState === 'complete') register(); else W.addEventListener('load', register);
})(window, document);
