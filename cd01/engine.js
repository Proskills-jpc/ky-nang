/* CD01 · Career Design 1 · cd01/engine.js · BỘ MÁY: trạng thái, gắn lõi Proskills, điều hướng, các dạng bước, Sổ tay, demo.
   Luồng theo TK: Sơ đồ tuyến → trang ga (lời Shin, khởi động, chặng, ô Bản Career Design) → trang chặng (mỗi bước một màn).
   Giao diện theo CD49. Chữ nằm ở content.js. ES5. */
(function (W, D) {
  'use strict';
  var PS = W.PS, ID = CD_ID, esc = PS.esc;
  var DEMO_KEY = 'ps.demo.' + ID;
  var DQ = PS.demoParam();
  var WANT_DEMO = DQ.on && PS.checkDemo(DQ.val);
  var ASK_DEMO = DQ.on && !WANT_DEMO;
  var DEMO_ON = WANT_DEMO || (!ASK_DEMO && !!PS.get(DEMO_KEY, null));
  var OK = DEMO_ON || ASK_DEMO || PS.guard(ID);
  if (!OK) return;

  /* =========================================================
     1. TRẠNG THÁI
     ========================================================= */
  function blank() { return { v: 1, intro: 0, created: Date.now(), d: {}, done: {}, xp: {}, ins: {}, days: {}, seen: {}, chest: {}, bak: {} }; }
  function normalize(s) { var b = blank(); for (var k in b) if (s[k] === undefined) s[k] = b[k]; return s; }
  function load() {
    var s = null;
    try { s = (DEMO_ON && !WANT_DEMO) ? PS.get(DEMO_KEY, null) : PS.load(ID); } catch (e) {}
    return (s && typeof s === 'object') ? normalize(s) : blank();
  }
  var S = load();
  var NOSAVE = ASK_DEMO ? 1 : 0, saveT = null;
  function prof() { return S.demo ? (S.prof || {}) : PS.profile(); }
  function given() { var n = String(prof().name || '').trim().split(/\s+/); return n[n.length - 1] || 'bạn'; }
  function T(s) { return String(s == null ? '' : s).replace(/\[Tên\]/g, '<b class="nm">' + esc(given()) + '</b>').replace(/\[Nghề\]/g, '<b>' + esc(jobName()) + '</b>').replace(/\[Diện\]/g, '<b>' + esc(VISA[visaKey()].n) + '</b>').replace(/\[Nơi\]/g, esc(JP().place)).replace(/\[Năm5\]/g, String(y5())); }
  function y5() { return +S.d['a81.y'] || (new Date().getFullYear() + 5); } /* năm nhận thư "mình 5 năm sau" */
  function P(s) { var j = g('a33.main') ? jobName() : ''; return String(s == null ? '' : s).replace(/\[Nghề\]/g, j).replace(/\[Nơi\]/g, JP().place).replace(/\s+$/, ''); } /* chữ thường, không thẻ */
  function Q(x) { return T(esc(x)); } /* chữ thường có [Tên] [Nghề] [Diện] */
  function jobName() { var v = S.d['a33.main']; if (!v) return 'bạn chọn'; if (v === 'khac') return S.d['a33.maino'] || 'bạn chọn'; for (var i = 0; i < INDS.length; i++) if (INDS[i].s === v) return INDS[i].n; return 'bạn chọn'; }
  /* cá nhân hóa theo nghề: ngành Tikme của nghề chính; "Nghề khác" thì lấy ngành gần nhất (a42.near) */
  function jobKey() { var m = S.d['a33.main']; if (m && INDP[m]) return m; if (m === 'khac') { var n = S.d['a42.near']; if (n && INDP[n]) return n; } return null; }
  function JP() { return INDP[jobKey()] || INDP.gen; }
  function jobSig() { var m = S.d['a33.main'] || ''; return m === 'khac' ? 'khac:' + String(S.d['a33.maino'] || '').replace(/^\s+|\s+$/g, '').toLowerCase() : m; }
  function a42Stale() { return !!S.done.a42 && !!S.d['a42.for'] && S.d['a42.for'] !== jobSig(); }
  function RD() { var a = READY.slice(), r = JP().r3; if (r) a[3] = r; return a; } /* thẻ sẵn sàng, thẻ số 4 theo nghề */
  function riaN() { return +S.d['a31.n'] === 60 ? 60 : 30; }
  function rq() { return RQ_ALL.slice(0, riaN()); }
  function visaKey() { var v = S.d['a44.path']; if (v && VISA[v]) return v; var p = prof().path || ''; for (var i = 0; i < VISA_ORDER.length; i++) if (VISA[VISA_ORDER[i]].p === p) return VISA_ORDER[i]; return 'na'; }
  function g(k) { return S.d[k]; }
  function ga(k) { var v = S.d[k]; return (v && v.push) ? v : []; }
  function sumObj(o) { var t = 0; for (var k in o) if (o.hasOwnProperty(k)) t += (+o[k] || 0); return t; }
  function xpTotal() { return sumObj(S.xp); }
  function insTotal() { return sumObj(S.ins); }
  function doneMain() { var n = 0; ORDER.forEach(function (a) { if (S.done[a]) n++; }); return n; }
  function nextInfo() { /* PS1.3.55 (ý 24): hoạt động kế tiếp cho nút Học tiếp ở trang chủ */
    var n = nextAct() || nextFin(); if (!n || !ACTS[n]) return null;
    return { t: stShort(stById(ACTS[n].st)) + ' · ' + ACTS[n].t, go: n };
  }
  function goView(c) {
    if (!c || !ACTS[c] || !(actOpen(c) || S.done[c])) { var st = c ? stById(c) : null; return st && (stOpen(st) || stDone(st)) ? { v: 'st', st: st.id } : null; }
    var k = S.d[c + '.st'];
    return { v: 'act', id: c, step: !S.done[c] && typeof k === 'number' && k < ACTS[c].steps.length ? k : 0 };
  }
  function extra() {
    var R = riaRes();
    return { next: nextInfo(), goal: g('x1.goal') || '', now: g('x1.now') || '', me: g('a13.me') || '', hope: ga('a13.hope'), first: g('a13.first') || '',
      like: ga('a21.sel'), good: ga('a22.sel'), value: ga('a23.rank'), ria: R.full ? R.code.join('') : '',
      main: g('a33.main') || '', mainName: g('a33.main') ? indName(g('a33.main'), 'a33.main') : '', b: g('a33.b') || '', bName: g('a33.b') ? indName(g('a33.b'), 'a33.b') : '', why: g('a33.why') || '',
      visa: g('a44.path') || '', tl: g('a44.tl') || {}, jobKey: jobKey() || '', jobHist: ga('a42.hist').length, day: g('a42.day') || '', worry: worryText(g('a43.top')), ready: rdCount('r'), goWhy: g('a43.why') || '',
      senpai: g('a51.who') || '', turn: g('a51.turn') || '', learn: g('a51.learn') || '', bring: g('a51.bring') || '', guide: g('a53.guide') || '', qs: [g('a53.q1') || '', g('a53.q2') || ''],
      clear: g('w6.clear'), jp1: g('a62.jp1') || '', do1: ga('a62.do1'), p1: g('a62.p1') || '', jp2: g('a62.jp2') || '', work: ga('a62.work'),
      save: g('a62.save'), joy: ga('a62.joy'), p2: g('a62.p2') || '', gapNeed: gapNeed(), habits: [habitText(1), habitText(2)], iv: g('a63.iv') || '', ivn: +g('a63.ivn') || 0,
      week: [scPick('a71.s1', 'job'), scPick('a71.s2', 'worry')], prep: ga('a71.prep'), note: g('a71.note') || '', hard: ga('a72.sel'), due: g('a72.dl') || '', with: whoText(), ifNo: g('a72.if') || '', res: g('a72.res') || '', resT: g('a72.rest') || '',
      thin: g('a80.thin'), now2: g('a81.now') || '', help8: ga('a81.help'), letter: g('a81.letter') || '', motto: g('a81.motto') || '', sealAt: g('a81.seal') || 0,
      far: farText(), endAt: S.d['f8.end'] || 0 };
  }
  function save(now) {
    clearTimeout(saveT);
    if (NOSAVE || W.PS_NOSAVE) return;
    var w = function () {
      if (NOSAVE || W.PS_NOSAVE) return;
      try {
        if (S.demo) { S.savedAt = Date.now(); PS.set(DEMO_KEY, S); return; }
        PS.save(ID, S);
        PS.report(ID, { xp: xpTotal(), ins: insTotal(), done: doneMain(), total: CD_TOTAL, days: S.days, ver: CD_VER, extra: extra() });
      } catch (e) {}
    };
    if (now) w(); else saveT = setTimeout(w, 300);
  }
  W.addEventListener('ps:change', function (e) {
    var f = e.detail && e.detail.field;
    if (f === 'beforeBackup' || f === 'beforeRestore') save(true);
    if ((f === 'profile' || f === 'teacher') && !nbOpen) render(false);
  });
  W.addEventListener('pagehide', function () { save(true); });
  D.addEventListener('visibilitychange', function () { if (D.visibilityState === 'hidden') save(true); });

  /* thời gian học: chỉ đếm khi màn hình mở và có thao tác trong 60 giây gần nhất */
  var lastAct = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { W.addEventListener(ev, function () { lastAct = Date.now(); }, { passive: true }); });
  setInterval(function () {
    if (D.visibilityState !== 'visible' || Date.now() - lastAct > 60000 || S.demo) return;
    var k = PS.today(); S.days[k] = Math.round(((S.days[k] || 0) + 0.25) * 100) / 100; save();
  }, 15000);
  function markDay() { if (S.demo) return; var k = PS.today(); if (!S.days[k]) { S.days[k] = 0.25; save(); } }

  /* =========================================================
     2. GA, CHẶNG, MỞ KHÓA
     ========================================================= */
  var ALLST = [START].concat(STATIONS);
  function stById(id) { for (var i = 0; i < ALLST.length; i++) if (ALLST[i].id === id) return ALLST[i]; return id === FINAL.id ? FINAL : null; }
  function stReady(st) { return st === START || !!st.ready; }
  function stDone(st) { return stReady(st) && st.acts.every(function (a) { return !!S.done[a]; }); }
  function stIndex(st) { return ALLST.indexOf(st); }
  function stOpen(st) { if (st === FINAL) return allMain(); var i = stIndex(st); return i === 0 || (stReady(st) && stDone(ALLST[i - 1])); }
  function nextAct() { for (var i = 0; i < ORDER.length; i++) if (!S.done[ORDER[i]]) return ORDER[i]; return null; }
  function allMain() { return !nextAct(); } /* đủ 18 chặng: mở Ga Ước Mơ */
  function nextFin() { if (!allMain()) return null; for (var i = 0; i < FIN_ORDER.length; i++) if (!S.done[FIN_ORDER[i]]) return FIN_ORDER[i]; return null; }
  function finDone() { return !!S.done.a82; }
  function actOpen(id) {
    var a = ACTS[id]; if (!a) return false;
    if (a.warm) return stOpen(stById(a.st));
    var f = FIN_ORDER.indexOf(id);
    if (f >= 0) { if (!allMain()) return false; for (var k = 0; k < f; k++) if (!S.done[FIN_ORDER[k]]) return false; return true; }
    var i = ORDER.indexOf(id); if (i < 0) return false;
    for (var j = 0; j < i; j++) if (!S.done[ORDER[j]]) return false;
    return true;
  }
  function curStation() {
    var n = nextAct(); if (n) return stById(ACTS[n].st);
    for (var i = 0; i < ALLST.length; i++) if (!stDone(ALLST[i])) return ALLST[i];
    return FINAL;
  }
  function gaDoneCount() { var k = 0; STATIONS.forEach(function (st) { if (stDone(st)) k++; }); return k; }
  function stampCount() { var k = 0; ALLST.forEach(function (st) { if (stDone(st)) k++; }); return k; }
  function shinStage() { var k = gaDoneCount(); return k >= 5 ? 3 : (k >= 3 ? 2 : (k >= 1 ? 1 : 0)); }
  W.shinCracks = function () { var k = 0; ['x1', 'a11', 'a13'].forEach(function (a) { if (S.done[a]) k++; }); return k; };
  function shinNow(mood, sz, anim) { return shin(mood, sz, shinStage(), anim); }
  function shinSays(mood, html, sz, cls) {
    return '<div class="shinbox' + (cls ? ' ' + cls : '') + '">' + shinNow(mood, sz || 60, 'bob') + '<div class="shinbox__b"><b>' + esc(SHIN_NAMES[shinStage()]) + '</b>' + html + '</div></div>';
  }
  function stLabel(st) { return st === START ? 'Sân ga' : 'Ga ' + (st.n < 10 ? '0' : '') + st.n; }
  function actLabel(id) {
    var a = ACTS[id], st = stById(a.st);
    if (a.warm) return stLabel(st) + ' · Khởi động';
    if (st === START) return 'Sân ga · Xuất phát';
    return stLabel(st) + ' · Chặng ' + (st.acts.indexOf(id) + 1);
  }
  function stMins(st) { var m = 0; (st.acts || []).forEach(function (a) { if (ACTS[a]) m += ACTS[a].mins; }); return m; }
  function tint(hex) { /* màu nhạt cho nhãn ga, không dùng color-mix để chạy trên máy cũ */
    var h = hex.replace('#', ''), r = parseInt(h.substr(0, 2), 16), gg = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    function m(c) { return Math.round(c * 0.12 + 255 * 0.88); }
    return 'rgb(' + m(r) + ',' + m(gg) + ',' + m(b) + ')';
  }

  /* ---------- RIASEC, ngành ---------- */
  function riaRes() {
    var a = ga('a31.rq'), u = {}, n = 0;
    RIA_ORDER.forEach(function (k) { u[k] = 0; });
    rq().forEach(function (q, i) { if (a[i] === 1 || a[i] === 0) { n++; if (a[i] === 1) u[q[0]]++; } });
    var sorted = RIA_ORDER.slice().sort(function (x, y) { return (u[y] - u[x]) || (RIA_ORDER.indexOf(x) - RIA_ORDER.indexOf(y)); });
    return { u: u, sorted: sorted, code: sorted.slice(0, 3), n: n, full: n >= riaN(), max: riaN() / 6 };
  }
  function indOf(v) { for (var i = 0; i < INDS.length; i++) if (INDS[i].s === v) return INDS[i]; return null; }
  function indName(v, key) {
    if (v === 'khac') return g(key + 'o') || 'Nghề khác';
    if (v === 'none') return 'Chưa nghĩ ra';
    var x = indOf(v); return x ? x.n : '';
  }

  /* =========================================================
     3. BẢN CAREER DESIGN
     ========================================================= */
  var NOW_LBL = {}; ACTS.x1.steps[1].opts.forEach(function (o) { NOW_LBL[o.v] = o.t; });
  function cardFilled(n) { var st = stById(CARDS[n - 1].st); return !!st && stReady(st) && stDone(st); }
  function tagsHTML(a) { return a.length ? '<div class="tags">' + a.map(function (h) { return '<span>' + esc(h) + '</span>'; }).join('') + '</div>' : ''; }
  function cardBody(n) {
    if (n === 1) return '<p>' + esc(g('x1.goal') || '') + '</p>' + (g('x1.now') ? '<small class="lbl">Lúc lên tàu: ' + esc(NOW_LBL[g('x1.now')] || '') + (g('a81.now') ? ' → Về đích: ' + esc(NOW_LBL[g('a81.now')] || '') : '') + '</small>' : '');
    if (n === 2) return '<p>' + esc(g('a13.me') || '') + '</p>' + tagsHTML(ga('a13.hope')) +
      (g('a13.first') ? '<p><small class="lbl">Việc nhỏ đầu tiên</small>' + esc(g('a13.first')) + '</p>' : '');
    if (n === 3) return '<small class="lbl">Thích</small>' + tagsHTML(ga('a21.sel')) + '<small class="lbl">Giỏi</small>' + tagsHTML(ga('a22.sel')) +
      '<small class="lbl">Coi trọng</small>' + tagsHTML(ga('a23.rank')) + (g('a23.inter') ? '<p>' + esc(g('a23.inter')) + '</p>' : '');
    if (n === 4) {
      var R = riaRes();
      return (R.full ? '<p><small class="lbl">Nhóm sở thích RIASEC · ' + riaN() + ' câu</small><b>' + R.code.join('-') + '</b> · ' + esc(R.code.map(function (k) { return RIA[k].n; }).join(', ')) + '</p>' : '') +
        '<p><small class="lbl">Nghề chính</small><b>' + esc(indName(g('a33.main'), 'a33.main')) + '</b></p>' +
        '<p><small class="lbl">Phương án 2</small>' + esc(indName(g('a33.b'), 'a33.b')) + '</p>' + (g('a33.why') ? '<p>' + esc(g('a33.why')) + '</p>' : '');
    }
    if (n === 5) {
      var tls = tlItems().filter(function (x) { return x.y !== 'done' && x.y !== 'u'; }).slice(0, 4);
      return '<p><small class="lbl">Nghề</small><b>' + esc(jobName()) + '</b>' + (g('a42.like') ? ' · ' + esc(g('a42.like')) : '') + '</p>' +
        (a42Stale() ? '<p class="stale">' + PS.icon('info', 13) + 'Chặng Nghề của tôi đang viết về nghề cũ. Làm lại ở Ga 4 nhé.</p>' : '') +
        '<p><small class="lbl">Lộ trình · ' + esc(VISA[visaKey()].n) + '</small></p>' + tagsHTML(tls.map(function (x) { return x.lab + ' · ' + x.t; })) +
        (worryText(g('a43.top')) ? '<p><small class="lbl">Điều tôi còn lo nhất</small>' + esc(worryText(g('a43.top'))) + '</p>' : '') +
        '<small class="lbl">Sẵn sàng ' + rdCount('r') + '/' + RD().length + ' điều đời sống ở Nhật</small>';
    }
    if (n === 6) {
      var qs = [g('a53.q1'), g('a53.q2')].filter(function (x) { return x; });
      return '<p><small class="lbl">Senpai tôi học theo</small><b>' + esc(g('a51.who') || '') + '</b>' + (g('a51.turn') ? ' · ' + esc(g('a51.turn')) : '') + '</p>' +
        (g('a51.learn') ? '<p>' + esc(g('a51.learn')) + '</p>' : '') +
        (g('a51.bring') ? '<p><small class="lbl">Ngoài tiền, tôi muốn mang về</small>' + esc(own(FIELD['a51.bring'], g('a51.bring'))) + '</p>' : '') +
        '<p><small class="lbl">Người dẫn đường</small>' + esc(g('a53.guide') || '') + '</p>' +
        (qs.length ? '<small class="lbl">Câu tôi sẽ hỏi</small><ul class="cdq">' + qs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '');
    }
    if (n === 7) {
      var hb = [habitText(1), habitText(2)].filter(function (x) { return x; }), sv = g('a62.save'), nd = gapNeed(), cl = g('w6.clear');
      var lvC = function (k) { var v = g('a62.jp' + k); return v && v !== 'u' ? v : ''; };
      return '<p><small class="lbl">Chặng 1 · Ở JPC</small>' + (lvC(1) ? '<b>Tiếng Nhật ' + esc(lvC(1)) + '</b>' : '') + '</p>' + (g('a62.p1') ? '' : tagsHTML(ga('a62.do1'))) +
        (g('a62.p1') ? '<p>' + esc(g('a62.p1')) + '</p>' : '') +
        '<p><small class="lbl">Chặng 2 · Ở Nhật</small>' + (lvC(2) ? '<b>Tiếng Nhật ' + esc(lvC(2)) + '</b>' : '') + '</p>' + (g('a62.p2') ? '' : tagsHTML(ga('a62.work'))) +
        (g('a62.p2') ? '<p>' + esc(g('a62.p2')) + '</p>' : '') +
        (sv != null && sv !== 'u' ? '<p><small class="lbl">Để dành mỗi năm · số tự đặt, tham khảo</small>Khoảng <b>' + esc(sv) + ' triệu</b></p>' : '') +
        (hb.length ? '<small class="lbl">Thói quen bắt đầu từ tuần này</small><ul class="cdq">' + hb.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
        '<small class="lbl">' + (nd ? 'Còn ' + nd + ' điều cần rèn' : 'Đo khoảng cách xong') + (cl != null && cl !== '' ? ' · lúc vào ga, kế hoạch rõ ' + esc(cl) + '/10 phần' : '') + '</small>';
    }
    if (n === 8) {
      var r7 = [[DAYN[1], scPick('a71.s1', 'job')], [DAYN[3], scPick('a71.s2', 'worry')]].filter(function (x) { return x[1]; }), sel7 = ga('a72.sel'), rs = g('a72.res'), rl = '', dl7 = g('a72.dl'), wh = whoText();
      RES7.forEach(function (x) { if (x[0] === rs) rl = x[1]; });
      return '<small class="lbl">Tuần đầu ở Nhật · tôi đã tập dượt</small><ul class="cdq">' + r7.map(function (x) { return '<li><b>' + esc(x[0]) + ':</b> ' + esc(x[1]) + '</li>'; }).join('') + '</ul>' +
        (ga('a71.prep').length ? '<small class="lbl">Tôi chuẩn bị từ bây giờ</small>' + tagsHTML(ga('a71.prep')) : '') +
        (g('a71.note') ? '<p class="cdnote">“' + esc(g('a71.note')) + '”</p>' : '') +
        '<p><small class="lbl">Việc khó tôi nhận · vùng học hỏi</small></p><ul class="cdq">' + sel7.map(function (t) { return '<li><b>' + esc(t) + '</b></li>'; }).join('') + '</ul>' +
        (dlOK(dl7) || wh ? '<small class="lbl">' + (dlOK(dl7) ? 'Hạn chót ' + esc(fmtDl(dl7)) : '') + (wh ? (dlOK(dl7) ? ' · ' : '') + 'Cùng biết: ' + esc(wh) : '') + '</small>' : '') +
        (g('a72.if') ? '<p>' + esc(g('a72.if')) + '</p>' : '') +
        (rl ? '<p><small class="lbl">Kết quả</small><b>' + esc(rl) + '</b>' + (g('a72.rest') ? ' · ' + esc(g('a72.rest')) : '') + '</p>' : (sel7.length ? '<small class="lbl">Đang làm · hết hạn, kể Shin nghe nhé</small>' : ''));
    }
    return '';
  }
  /* ô Bản Career Design kiểu BIỂN TÊN GA NHẬT (駅名標) + CON DẤU GA (駅スタンプ) · PS1.3.15
     opt: force (xem trước khi đóng dấu) · pop (trong hộp hoàn thành ga: không dấu nhỏ, có loa đọc) */
  function stShort(st) { return st === START ? 'Sân ga' : st.vn; }
  var STAMP_N = 0;
  function ekiStamp(st, t, sz) { /* con dấu ga: 2 vòng tròn, chữ Hán của ga, chữ cong CAREER DESIGN, ngày */
    var k = st.k, id = 'ekA' + (++STAMP_N), fs = k.length > 2 ? 21 : (k.length > 1 ? 27 : 36), d = '';
    if (t && +t > 1e12) { var dt = new Date(+t); d = pad2(dt.getDate()) + '.' + pad2(dt.getMonth() + 1) + '.' + String(dt.getFullYear()).slice(2); }
    return '<svg class="ekst" viewBox="0 0 100 100" width="' + (sz || 74) + '" height="' + (sz || 74) + '" aria-hidden="true"><defs><path id="' + id + '" d="M17 52a33 33 0 0 1 66 0"/></defs>' +
      '<circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="50" cy="50" r="39.5" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
      '<text font-size="8.6" font-weight="700" letter-spacing="1.6" fill="currentColor"><textPath href="#' + id + '" xlink:href="#' + id + '" startOffset="50%" text-anchor="middle">CAREER DESIGN</textPath></text>' +
      '<text x="50" y="' + (k.length > 2 ? 60 : 62) + '" text-anchor="middle" font-size="' + fs + '" font-weight="700" fill="currentColor" font-family="Noto Sans JP,Hiragino Sans,Yu Gothic,sans-serif">' + esc(k) + '</text>' +
      '<path d="M30 70h40" stroke="currentColor" stroke-width="1.2"/>' +
      '<text x="50" y="81" text-anchor="middle" font-size="8.4" font-weight="700" letter-spacing=".6" fill="currentColor">' + (d || 'CD01') + '</text>' +
      '<circle cx="21" cy="62" r="1.8" fill="currentColor"/><circle cx="79" cy="62" r="1.8" fill="currentColor"/></svg>';
  }
  function cdCard(n, isNew, opt) {
    opt = opt || {};
    var c = CARDS[n - 1], st = stById(c.st), f = opt.force || cardFilled(n), i = ALLST.indexOf(st), pv = i > 0 ? ALLST[i - 1] : null, nx = ALLST[i + 1] || FINAL;
    var cur = !f && curStation() === st, wrd = st.word || { kana: st.kana };
    return '<div class="eki' + (f ? '' : ' eki--empty') + (cur ? ' eki--cur' : '') + (isNew ? ' eki--new' : '') + '">' +
      '<div class="eki__sign"><span class="eki__no"><small>Ô</small>' + n + '</span>' +
      '<span class="eki__k jp">' + esc(st.k) + '</span><span class="eki__nm"><small class="jp">' + esc(st.kana) + '</small><b>' + esc(stShort(st)) + '</b></span>' +
      (opt.pop ? '<button type="button" class="say-btn eki__say" data-act="speak" data-t="' + esc(wrd.kana) + '" aria-label="Nghe đọc ' + esc(st.k) + '">' + PS.icon('sound', 16) + '</button>' : '') + '</div>' +
      '<div class="eki__band"><span>' + (pv ? '‹ ' + esc(stShort(pv)) : '') + '</span><em>' + esc(st.ro.split(' · ')[0]) + '</em><span>' + esc(stShort(nx)) + ' ›</span></div>' +
      '<div class="eki__body">' + (f && !opt.pop && !opt.force ? '<span class="eki__stamp">' + ekiStamp(st, S.chest[st.id], 62) + '</span>' : '') + '<h4>' + esc(c.t) + '</h4>' +
      (f ? cardBody(n) : '<p class="eki__wait">' + PS.icon('lock', 14) + (cur ? 'Ga tiếp theo của bạn. Xong ga là ô này có chữ.' : 'Điền ở ' + esc(st.vn) + '.') + '</p>') + '</div></div>';
  }
  /* thẻ tuyến đầu tab Bản Career Design: tên, ga đích, 8 ô trên đường ray */
  function cdRouteHTML() {
    var p = prof(), cs = curStation(), k = cardCount(), main = g('a33.main');
    return '<div class="cdroute"><div class="cdroute__hd"><div><small>Bản Career Design của</small><b>' + esc(p.name || 'bạn') + '</b></div><span class="cdroute__n"><b>' + k + '</b>/8 ô</span></div>' +
      '<div class="cdroute__rail">' + CARDS.map(function (c) { var st = stById(c.st), f = cardFilled(c.n), cur = !f && cs === st; return '<span class="rn' + (f ? ' on' : '') + (cur ? ' cur' : '') + '"><i>' + (f ? PS.icon('check', 11, 3.4) : c.n) + '</i><small class="jp">' + esc(st.k.charAt(0)) + '</small></span>'; }).join('') + '</div>' +
      '<div class="cdroute__ft"><span>' + (main ? 'Ga đích · <b>' + esc(jobName()) + '</b>' : 'Ga đích · chọn ở Ga Tính Cách') + '</span><span class="jp">夢 ›</span></div></div>';
  }
  function cardCount() { var k = 0; for (var i = 1; i <= 8; i++) if (cardFilled(i)) k++; return k; }

  /* =========================================================
     4. GIAO DIỆN CHUNG
     ========================================================= */
  var APP = D.getElementById('app');
  var V = { v: 'home' }, nbOpen = false, NBTAB = 'tq';
  /* tiến độ hôm nay: số chặng xong của ga đang học từ đầu ngày; xong cả ga thì vòng xanh */
  function dayRing() {
    var k = PS.today(), cs;
    if (S.d['day.k'] !== k || !stById(S.d['day.st'])) { cs = curStation(); S.d['day.k'] = k; S.d['day.st'] = cs ? cs.id : 's0'; save(); }
    var st = stById(S.d['day.st']), acts = (st && st.acts) || [], nd = 0;
    acts.forEach(function (a) { if (S.done[a]) nd++; });
    var f = acts.length ? nd / acts.length : 0, full = f >= 1, C = 2 * Math.PI * 18.5;
    return { st: st, nd: nd, n: acts.length, full: full,
      svg: '<svg class="tn-ring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" class="tn-ring__bg"/>' +
        (f > 0 ? '<circle cx="20" cy="20" r="18.5" fill="none" class="tn-ring__v' + (full ? ' ok' : '') + '" stroke-dasharray="' + (C * f).toFixed(1) + ' ' + C.toFixed(1) + '" transform="rotate(-90 20 20)"/>' : '') + '</svg>' };
  }
  /* PS1.3.55 (ý 25): thanh trên chung · ‹ về một cấp | tên màn | Sổ tay */
  function topnav() {
    var bk = 'Proskills', t = 'Career Design 1', st, a;
    if (V.v === 'st' && (st = stById(V.st))) { bk = 'Sơ đồ tuyến'; t = st === START ? 'Sân ga' : stLabel(st) + ' · ' + st.vn; }
    else if (V.v === 'act' && (a = ACTS[V.id])) { st = stById(a.st); bk = stShort(st); t = a.warm ? 'Khởi động' : (st === START ? 'Xuất phát' : (st.acts.indexOf(V.id) + 1) + '/' + st.acts.length); }
    return PS.navHTML({ back: bk, title: t });
  }
  function demoStrip() { return S.demo ? '<div class="demo-strip"><span>Bản demo giáo viên · học viên giả định</span><button type="button" data-act="demoExit">Thoát demo</button></div>' : ''; }
  var QUIET = false;
  function render(top) {
    tmKill(); if (HOLD) { clearInterval(HOLD.h); HOLD = null; }
    if (V.v === 'intro') { APP.innerHTML = '<div class="wrap enter">' + viewIntro() + '</div>'; stagger(); return; }
    var h = V.v === 'st' ? viewStation() : (V.v === 'act' ? viewAct() : viewHome());
    APP.innerHTML = topnav() + '<div class="wrap' + (QUIET ? '' : ' enter') + (S.demo ? ' wrap--demo' : '') + '">' + h + '</div>' + demoStrip();
    stagger();
    if (top !== false) W.scrollTo(0, 0);
    if (V.v === 'home') homeFx();
    if (tourI >= 0) { if (V.v === 'home') showTour(true); else endTour(); }
  }
  /* ---------- hiệu ứng trang chủ: tàu chạy tới chỗ đang học rồi lắc lư, thanh vàng chạy, vé nghiêng khi chạm, ga hiện dần ---------- */
  var RM = false; try { RM = !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) {}
  function homeFx() {
    var tr = D.getElementById('tkTrain'), bar = D.getElementById('tkBar'), tk = D.getElementById('ticket');
    if (tr && bar) {
      var go2 = function () { tr.style.left = tr.getAttribute('data-x') + '%'; bar.style.width = bar.getAttribute('data-w') + '%'; };
      if (RM || QUIET) { tr.style.transition = bar.style.transition = 'none'; go2(); if (!RM) { tr.className += ' rock'; bar.className = 'shim'; } } else { setTimeout(go2, 120); setTimeout(function () { tr.className += ' rock'; bar.className = 'shim'; }, 1650); }
    }
    if (tk && !RM) {
      var press = function (x, y) { var r = tk.getBoundingClientRect(), px = (x - r.left) / r.width - 0.5, py = (y - r.top) / r.height - 0.5; tk.style.transform = 'perspective(800px) rotateX(' + (-py * 7).toFixed(2) + 'deg) rotateY(' + (px * 7).toFixed(2) + 'deg) scale(.985)'; };
      var up = function () { tk.style.transform = ''; };
      tk.addEventListener('touchstart', function (e) { var t = e.touches && e.touches[0]; if (t) press(t.clientX, t.clientY); }, { passive: true });
      tk.addEventListener('mousedown', function (e) { press(e.clientX, e.clientY); });
      ['touchend', 'touchcancel', 'mouseup', 'mouseleave'].forEach(function (ev) { tk.addEventListener(ev, up, { passive: true }); });
    }
    var route = APP.querySelector('.route'); if (!route) return;
    var stops = route.querySelectorAll('.rv');
    if (RM || QUIET || !('IntersectionObserver' in W)) return;
    route.className += ' rvon';
    var io = new W.IntersectionObserver(function (ents) {
      var k = 0;
      ents.forEach(function (en) { if (en.isIntersecting) { var el = en.target; el.style.transitionDelay = (k++ * 0.09) + 's'; el.className += ' in'; io.unobserve(el); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    for (var i = 0; i < stops.length; i++) io.observe(stops[i]);
  }
  function stagger() { var w = APP.querySelector('.enter'); if (!w) return; var c = w.children; for (var i = 0; i < c.length; i++) c[i].style.setProperty('--i', Math.min(i, 8)); }
  function go(v) {
    NAV.go(v);
    V = v; render(true);
  }
  function stepState() { NAV.save(0); }
  /* PS1.3.55: nút ‹ và Back Android cùng "về một cấp" (lõi PS.nav) */
  function parentOf(v) { if (v.v === 'act' && ACTS[v.id]) return { v: 'st', st: ACTS[v.id].st }; if (v.v === 'st') return { v: 'home' }; return null; }
  function viewOf(h) {
    if (h.v === 'act' && ACTS[h.id] && (actOpen(h.id) || S.done[h.id])) return { v: 'act', id: h.id, step: Math.min(h.step || 0, ACTS[h.id].steps.length - 1), ret: h.ret || undefined };
    if (h.v === 'st' && stById(h.st)) return { v: 'st', st: h.st };
    if (h.v === 'home') return { v: 'home' };
    return null;
  }
  var NAV = PS.nav({ mod: ID, tag: 'cd', get: function () { return V; }, parent: parentOf,
    depth: function (v) { return v.v === 'act' ? 2 : (v.v === 'st' ? 1 : 0); },
    ser: function (v) { return { v: v.v, st: v.st || null, id: v.id || null, step: v.step || 0, ret: v.ret || null }; },
    de: viewOf,
    show: function (v, y) { V = v; QUIET = true; render(false); QUIET = false; W.scrollTo(0, y || 0); },
    intercept: function () { if (D.getElementById('cdov')) { closeOv(); return 1; } if (nbOpen) { closeNb(); return 1; } return V.v === 'intro' ? 2 : 0; },
    beforeLeave: function () { save(true); } });

  /* ---------- màn mở đầu ---------- */
  /* Lần đầu mở CD01: Shin in vé hành trình (máy in, âm thanh), rồi mới lời chào. Chạm "In vé" để có âm thanh trên điện thoại. */
  function viewIntro() {
    return '<div class="intro intro--prt">' + shinNow('hi', 92, 'bob') +
      '<span class="kicker">' + esc(TXT.introKicker) + '</span><h2 class="h1">Thiết kế <em>hành trình nghề nghiệp</em> của bạn</h2>' +
      '<div class="prt" id="prt"><div class="prt__mc"><i class="prt__led"></i><span class="prt__nm">PROSKILLS · <span class="jp">乗車券</span></span><i class="prt__slot"></i></div>' +
      '<div class="prt__out" id="prtOut"><div class="prt__tk">' + printTicket() + '</div></div></div>' +
      '<div id="prtMsg">' + shinSays('hi', T(TXT.printAsk)) + '<p class="prt__go"><button type="button" class="btn btn--go btn--w" data-act="introPrint">' + cdIcon('ticket', 20) + esc(TXT.printBtn) + '</button></p></div></div>';
  }
  function printTicket() {
    var p = prof(), created = new Date(S.created || Date.now());
    var row = function (i, lab, v) { return '<div class="tkr" style="--d:' + i + '"><small>' + lab + '</small><b>' + esc(v) + '</b></div>'; };
    return '<section class="ticket ticket--prt" aria-label="Vé hành trình"><div class="ticket__body">' +
      '<div class="ticket__lab"><span>Vé hành trình</span><span>CD01</span></div>' +
      '<div class="ticket__route"><div><small>しゅっぱつ</small><b>JPC</b></div><div></div><div class="r"><small>ゆめ</small><b>Ước Mơ</b></div></div>' +
      '<div class="ticket__track"><span class="ticket__train" style="left:8%">' + trainSvg() + '</span></div>' +
      '<div class="ticket__grid">' + row(1, 'Hành khách', p.name || '—') + row(2, 'Lớp', p.cls || '—') + row(3, 'Diện', p.path || 'Chưa rõ') +
      row(4, 'Ngày lên tàu', PS.fmtDate ? PS.fmtDate(created) : created.toLocaleDateString('vi-VN')) + '</div></div>' +
      '<div class="ticket__stub"><span>ID <b style="font-size:14px">' + esc(p.sid || '—') + '</b></span><span>Con dấu <b>' + stampCount() + '</b>/8</span></div></section>';
  }
  function introPrint() {
    var pr = D.getElementById('prt'), out = D.getElementById('prtOut'), msg = D.getElementById('prtMsg');
    if (!pr || !out || pr.className.indexOf('go') > -1) return;
    var tk = out.firstChild, hgt = tk ? tk.offsetHeight : 260, dur = RM ? 0 : 1900;
    var done = function () {
      if (V.v !== 'intro') return;
      out.style.height = 'auto'; pr.className += ' done';
      msg.innerHTML = shinSays('cheer', T(TXT.intro)) + '<p class="prt__go"><button type="button" class="btn btn--w" data-act="introGo">' + esc(TXT.introBtn) + '</button></p>';
      msg.className = 'prt__msg';
      try { var b = msg.querySelector('.btn'); if (b && b.scrollIntoView) b.scrollIntoView(RM ? false : { behavior: 'smooth', block: 'end' }); } catch (e) {}
    };
    msg.innerHTML = shinSays('hi', T(TXT.printing));
    pr.className += ' go';
    if (RM) { out.style.height = 'auto'; sfx('ting'); done(); return; }
    sfx('print', dur / 1000);
    out.style.height = hgt + 'px';
    for (var i = 1; i <= 4; i++) (function (i) { setTimeout(function () { sfx('ting', 0.55 + i * 0.08); }, dur + 120 + i * 150); })(i);
    setTimeout(function () { sfx('ting', 1.1); }, dur + 900);
    setTimeout(done, dur + 1100);
  }

  /* ---------- trang chủ module: vé + Bản Career Design + sơ đồ tuyến ---------- */
  function viewHome() {
    var nm = nextAct(), nx = nm || nextFin(), p = prof(), stp = stampCount(), pct = Math.round(doneMain() / CD_TOTAL * 100);
    var hi = nm ? TXT.homeHi[new Date().getDate() % TXT.homeHi.length] : (nx ? TXT.homeWait : TXT.homeDone);
    var created = new Date(S.created || Date.now());
    var cta;
    if (nx) cta = '<button type="button" class="btn btn--go btn--w glow" data-act="open" data-id="' + nx + '">' + (doneMain() ? 'Đi tiếp: ' : 'Bắt đầu: ') + esc(ACTS[nx].t) + '</button>';
    else cta = '<button type="button" class="btn btn--go btn--w" data-act="open8">' + esc(TXT.sheetBtn) + '</button>';
    var trainX = 8 + Math.min(84, pct * 0.84);
    return (dueOver() ? '<div class="follow">' + shinSays('surprise', 'Việc khó “<b>' + esc(ga('a72.sel')[0] || '') + '</b>” đến hạn rồi. Bạn làm thế nào, kể Shin nghe nhé.') + '<button type="button" class="btn btn--go btn--w btn--sm" data-act="res7">Kể Shin nghe · +' + CD_XP_WARM + ' XP</button></div>' : shinSays(nm ? 'hi' : 'cheer', T(hi))) +
      '<section class="ticket" id="ticket" aria-label="Vé hành trình"><span class="ticket__shine" aria-hidden="true"></span><div class="ticket__body">' +
      '<div class="ticket__lab"><span>Vé hành trình</span><span>CD01</span></div>' +
      '<div class="ticket__route"><div><small>しゅっぱつ</small><b>JPC</b></div><div></div><div class="r"><small>ゆめ</small><b>Ước Mơ</b></div></div>' +
      '<div class="ticket__track"><span class="ticket__train" id="tkTrain" data-x="' + trainX + '" style="left:8%">' + trainSvg() + '</span></div>' +
      '<div class="ticket__grid"><div><small>Hành khách</small><b>' + esc(p.name || '—') + '</b></div><div><small>Lớp</small><b>' + esc(p.cls || '—') + '</b></div>' +
      '<div><small>Diện</small><b>' + esc(p.path || 'Chưa rõ') + '</b></div><div><small>Ngày lên tàu</small><b>' + esc(PS.fmtDate ? PS.fmtDate(created) : created.toLocaleDateString('vi-VN')) + '</b></div></div>' +
      '<div class="ticket__bar"><i id="tkBar" data-w="' + pct + '" style="width:0"></i></div><div class="ticket__meta"><span>' + doneMain() + '/' + CD_TOTAL + ' chặng · ' + cardCount() + '/8 ô</span>' +
      '<span class="ticket__pts" aria-label="Điểm"><span title="Chuỗi ngày">' + PS.icon('flame', 13) + (S.demo ? 5 : PS.streak()) + '</span><span title="XP">' + PS.icon('star', 13) + xpTotal() + '</span><span title="Insight">' + PS.icon('bulb', 13) + insTotal() + '</span></span></div>' + cta + '</div>' +
      '<div class="ticket__stub"><span>ID <b style="font-size:14px">' + esc(p.sid || '—') + '</b></span>' + (finDone() ? '<span class="ticket__end">' + PS.icon('check', 15, 3) + 'Về đích <b>' + esc(dmy(S.d['f8.end'] || S.done.a82)) + '</b></span>' : '<span>Con dấu <b>' + stp + '</b>/8</span>') + '</div></section>' +
      '<section class="cdmini"><div class="cdmini__top">' + cdIcon('ticket', 22) + '<b>Bản Career Design của tôi</b><small>' + cardCount() + '/8 ô</small></div>' +
      '<div class="cdmini__dots">' + CARDS.map(function (c) { return '<i class="' + (cardFilled(c.n) ? 'on' : '') + '">' + c.n + '</i>'; }).join('') + '</div>' +
      '<button type="button" class="btn btn--soft btn--w btn--sm" data-act="nbcd">Xem Bản Career Design</button></section>' +
      '<h2 class="sec-h">Sơ đồ tuyến Career Design</h2><p class="sec-sub">Đi lần lượt từng ga · chạm vào ga để vào</p>' +
      '<div class="route">' + ALLST.map(stopHTML).join('') + stopHTML(FINAL) + '</div>' +
      '<p class="foot">Proskills · Career Design 01 · ' + esc(CD_VER) + '<br>Bài làm tự lưu trên trình duyệt của máy này</p>';
  }
  function trainSvg() {
    return '<svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true"><rect x="2" y="3" width="28" height="14" rx="6" fill="#fff"/><rect x="6" y="6" width="7" height="5" rx="1.5" style="fill:var(--c)"/><rect x="15" y="6" width="7" height="5" rx="1.5" style="fill:var(--c)"/><circle cx="9" cy="18.5" r="2.5" fill="#FFC93C"/><circle cx="23" cy="18.5" r="2.5" fill="#FFC93C"/><rect x="25" y="7" width="3" height="3" rx="1" fill="#FFC93C"/></svg>';
  }
  function stopHTML(st) {
    var isFinal = st === FINAL, ready = stReady(st), dn = ready && stDone(st), open = ready && stOpen(st);
    var cur = curStation() === st && open && !dn;
    var acts = st.acts || [], nd = acts.filter(function (a) { return !!S.done[a]; }).length;
    var cls = 'stop rv' + (cur ? ' stop--cur' : '') + ((!open && !dn) ? ' stop--lock' : '');
    var badge;
    if (dn) badge = '<span class="badge badge--ok">' + (isFinal ? 'Về đích' : 'Đã qua') + '</span>';
    else if (cur) badge = '<span class="badge">' + (nd ? nd + '/' + acts.length + ' chặng' : 'Tiếp theo') + '</span>';
    else if (!isFinal && !ready) badge = '<span class="badge badge--soon">Đang xây</span>';
    else badge = '';
    var meta = (isFinal && !open && !dn) ? '' : '<div class="stop__meta"><span>' + acts.length + ' chặng · ' + (stMins(st) || '~15') + ' phút</span><span class="pips">' + acts.map(function (a) { return '<i class="' + (S.done[a] ? 'on' : '') + '"></i>'; }).join('') + '</span>' + badge + '</div>';
    var ic = (!open && !dn) ? PS.icon('lock', 22) : cdIcon(st.ic, 26);
    var tag = (open || dn) ? 'button type="button" data-act="station" data-st="' + st.id + '"' : 'div';
    return '<' + tag + ' class="' + cls + '" style="--lc:' + st.lc + ';--lt:' + tint(st.lc) + '"><span class="stop__ic">' + ic + '</span><span><span class="stop__lab">' + esc(stLabel(st).toUpperCase()) + '</span><b>' + esc(st.vn) + '</b><p>' + esc(st.sub) + '</p>' + meta + '</span></' + (tag === 'div' ? 'div' : 'button') + '>';
  }

  /* ---------- trang ga ---------- */
  function viewStation() {
    var st = stById(V.st), acts = st.acts, nd = acts.filter(function (a) { return !!S.done[a]; }).length;
    var first = !S.seen[st.id];
    if (first) { S.seen[st.id] = 1; V.showIntro = 1; save(); } /* lần đầu: lời Shin mở sẵn, giữ mở suốt lượt này */
    var h = '<section class="banner"><div class="banner__top"><div class="kanji' + (st.k.length > 2 ? ' k3' : '') + ' jp">' + esc(st.k) + '</div><div>' +
      '<div class="banner__lab">' + esc(stLabel(st).toUpperCase()) + '</div><h1>' + esc(st.vn) + '</h1>' +
      (KW[st.n] && st !== START ? '<div class="banner__ro"><button type="button" class="kwchip" data-act="kw" data-n="' + st.n + '"><span class="jp">' + esc(KW[st.n].w) + '</span>' + esc(KW[st.n].m) + ' <i aria-hidden="true">›</i></button></div></div></div>' :
      '<div class="banner__ro"><span class="jp">' + esc(st.kana) + '</span><span>' + esc(st.ro) + '</span><button type="button" class="say-btn" data-act="speak" data-t="' + esc(st.kana) + '" aria-label="Nghe đọc">' + PS.icon('sound', 16) + '</button></div></div></div>') +
      '<div class="banner__bar"><i style="width:' + Math.round(nd / acts.length * 100) + '%"></i></div><div class="banner__meta"><span>' + nd + '/' + acts.length + ' chặng xong</span><span>' + stMins(st) + ' phút</span></div></section>';
    h += (first || V.showIntro) ? shinSays('hi', T(st.intro)) : '<button type="button" class="shinmini" data-act="showIntro">' + shinNow('hi', 34) + '<span><b>' + esc(SHIN_NAMES[shinStage()]) + '</b> · Xem lời Shin</span></button>';
    if (st.warm) {
      var wd = !!S.done[st.warm];
      h += '<button type="button" class="warm' + (wd ? ' warm--done' : '') + '" data-act="open" data-id="' + st.warm + '"><span class="warm__ic">' + (wd ? PS.icon('check', 20, 3) : PS.icon('clock', 20)) + '</span><span><b>' + esc(TXT.warmT) + ' · ' + esc(ACTS[st.warm].t.replace('Khởi động · ', '')) + '</b><small>' + (wd ? 'Đã xong · +' + CD_XP_WARM + ' XP' : esc(TXT.warmSub)) + '</small></span></button>';
    }
    h += '<div class="acts">' + acts.map(function (id, i) {
      var a = ACTS[id], dn = !!S.done[id], op = actOpen(id), nx = op && !dn && nextAct() === id;
      if (!op && !dn) return '<div class="act act--lock"><span class="act__n">' + PS.icon('lock', 18) + '</span><span><b>Chặng ' + (i + 1) + ' · ???</b><small>Xong chặng trước để mở</small></span></div>';
      var bk = !!S.bak[id], stl = id === 'a42' && a42Stale();
      var tagx = nx ? '<span class="chip-go">Tiếp theo ' + PS.icon('next', 13, 2.6) + '</span>' : (bk ? '<span class="badge badge--soon">Đang làm lại</span>' : (stl ? '<span class="badge badge--warn">Cần làm lại theo nghề mới</span>' : (dn ? '<span class="badge badge--ok">Xong</span>' : '')));
      return '<button type="button" class="act' + (nx ? ' act--next' : '') + (dn ? ' act--done' : '') + '" data-act="' + (dn ? 'actMenu' : 'open') + '" data-id="' + id + '"><span class="act__n">' + (dn && !bk ? PS.icon('check', 20, 3) : (i + 1)) + '</span><span><b>' + (st === START ? '' : 'Chặng ' + (i + 1) + ' · ') + esc(a.t) + '</b><small>' + esc(a.d) + '</small>' +
        '<span class="act__meta">' + PS.icon('clock', 13) + a.mins + ' phút' + tagx + '</span></span></button>' +
        (bk ? '<p class="restore"><button type="button" class="link" data-act="actRestore" data-id="' + id + '">Khôi phục bài cũ</button></p>' : '');
    }).join('') + '</div>';
    if (st === FINAL) return h + finChests();
    var cn = st.card, cdn = stDone(st);
    if (st.id === 's7' && S.done.a72 && ga('a72.sel').length) { var rs7 = '', dl8 = g('a72.dl'); RES7.forEach(function (x) { if (x[0] === g('a72.res')) rs7 = x[1]; });
      h += '<button type="button" class="chest' + (dueOver() ? ' chest--due' : '') + '" data-act="res7"><span class="chest__ic" style="background:#FDECEA;color:#B43A2E">' + cdIcon('flag', 22) + '</span><span><b>Kết quả việc khó</b><small>' + (rs7 ? esc(rs7) + ' · chạm để sửa' : (dlOK(dl8) ? 'Hạn ' + esc(fmtDl(dl8)) + ' · làm xong thì kể Shin nghe' : 'Làm xong thì kể Shin nghe')) + '</small></span></button>'; }
    if (st.report && cdn) h += '<button type="button" class="chest" data-act="report"><span class="chest__ic" style="background:var(--c-t);color:var(--c-d)">' + PS.icon('people', 22) + '</span><span><b>' + esc(TXT.reportT) + '</b><small>' + (g('rep.mid') ? 'Đã gửi · chạm để gửi lại' : 'Gửi thầy cô 4 ô đầu của bạn') + '</small></span></button>';
    h += '<button type="button" class="chest' + (cdn ? '' : ' chest--lock') + '"' + (cdn ? ' data-act="chest" data-st="' + st.id + '"' : ' disabled') + '><span class="chest__ic">' + (cdn ? cdIcon('ticket', 24) : PS.icon('lock', 22)) + '</span><span><b>Ô số ' + cn + ' · ' + esc(CARDS[cn - 1].t) + '</b><small>' + (cdn ? 'Đã điền · chạm để xem' : 'Xong ' + acts.length + ' chặng để điền ô này') + '</small></span></button>';
    return h;
  }

  /* =========================================================
     5. TRANG CHẶNG VÀ CÁC DẠNG BƯỚC
     ========================================================= */
  function viewAct() {
    var id = V.id, a = ACTS[id], steps = a.steps, i = V.step, s = steps[i], last = i === steps.length - 1;
    var miss = check(s);
    var h = '<header class="ah"><div class="ah__lab">' + esc(actLabel(id)) + '</div><h1>' + esc(a.t) + '</h1><div class="stepbar" aria-label="Bước ' + (i + 1) + '/' + steps.length + '">' +
      steps.map(function (x, j) { return '<i class="' + (j < i ? 'on' : (j === i ? 'cur' : '')) + '"></i>'; }).join('') + '</div></header>';
    if (V.ret) h += '<div class="retbar">' + PS.icon('info', 16) + '<span>' + esc(GATE_TXT.fixing) + '</span><button type="button" class="btn btn--sm btn--go" data-act="gateBack">' + esc(GATE_TXT.back) + '</button></div>';
    else if (S.bak[id] && i === 0) h += '<div class="redo">' + PS.icon('info', 16) + esc(TXT.redoNew) + '</div>';
    else if (S.done[id] && i === 0) h += '<div class="redo">' + PS.icon('check', 16, 3) + esc(TXT.redo) + '</div>';
    h += '<div id="stepBody">' + (STEP[s.k] ? STEP[s.k](s, id) : '') + '</div>';
    h += '<div class="sbar"><button type="button" class="sbar__st' + (miss ? ' miss' : '') + '" id="sbarSt"' + (miss ? ' data-act="showMiss"' : '') + '>' + (miss ? esc(miss) : 'Sẵn sàng!') + '</button>' +
      '<button type="button" class="btn" id="sbarGo" data-act="' + (last ? 'finish' : 'next') + '"' + (miss ? ' disabled' : '') + '>' + (last ? esc(a.btn || (a.warm ? 'Xong' : TXT.stampBtn)) : 'Tiếp tục') + '</button></div>';
    if (i > 0) h += '<p class="prevlink"><button type="button" class="link" data-act="prev">Xem lại bước trước</button></p>';
    return h;
  }
  function refreshBar() {
    var s = ACTS[V.id].steps[V.step], miss = check(s), st = D.getElementById('sbarSt'), gb = D.getElementById('sbarGo');
    if (!st || !gb) return;
    st.className = 'sbar__st' + (miss ? ' miss' : ''); st.textContent = miss || 'Sẵn sàng!';
    if (miss) st.setAttribute('data-act', 'showMiss'); else st.removeAttribute('data-act');
    gb.disabled = !!miss;
  }
  function check(s) { return CHECK[s.k] ? CHECK[s.k](s) : ''; }
  function redrawStep() { var b = D.getElementById('stepBody'); if (!b) return; var s = ACTS[V.id].steps[V.step]; b.innerHTML = STEP[s.k](s, V.id); refreshBar(); }

  /* ----- tiện ích viết ----- */
  var FIELD = {};
  for (var aid in ACTS) if (ACTS.hasOwnProperty(aid)) ACTS[aid].steps.forEach(function (st) { (st.fields || []).forEach(function (f) { FIELD[f.key] = f; }); });
  function words(t) { t = String(t || '').replace(/^\s+|\s+$/g, ''); return t ? t.split(/\s+/).length : 0; }
  function own(f, v) { v = String(v || ''); if (f.starter && v.indexOf(f.starter) === 0) v = v.slice(f.starter.length); return v.replace(/^\s+|\s+$/g, ''); }
  function fieldOK(f) { return own(f, g(f.key)).length >= (f.min || 1); }
  function autoSame(f) { var a = S.d[f.key + '~']; return !!a && a === g(f.key); } /* câu gợi ý chưa sửa thì chưa tính Insight */
  function insOf(f) { return !f.noIns && !autoSame(f) && words(own(f, g(f.key))) >= CD_INS_WORDS ? CD_INS_FIELD : 0; }
  function insHTML(f) {
    f = FIELD[f.key] || f; if (f.noIns) return '';
    var w = words(own(f, g(f.key))), full = w >= CD_INS_WORDS;
    if (autoSame(f)) return '<span class="ins" data-ins="' + esc(f.key) + '">' + PS.icon('bulb', 13) + 'Sửa thành lời của bạn để +' + CD_INS_FIELD + ' Insight</span>';
    return '<span class="ins' + (full ? ' full' : '') + '" data-ins="' + esc(f.key) + '">' + PS.icon('bulb', 13) + (full ? '+' + CD_INS_FIELD + ' Insight' : w + '/' + CD_INS_WORDS + ' từ để +' + CD_INS_FIELD + ' Insight') + '</span>';
  }
  function fieldHTML(f, i) {
    var v = g(f.key); if (v == null || v === '') v = f.starter || '';
    return '<label class="field">' + (f.tag ? '<span class="field__tag t' + (i || 0) + '">' + esc(f.tag) + '</span>' : '') + '<span class="field__l">' + Q(f.l) + '</span>' +
      '<textarea class="ta" rows="' + (f.rows || 3) + '" data-k="' + esc(f.key) + '" placeholder="' + esc(phOf(f.ph)) + '" maxlength="600">' + esc(v) + '</textarea>' + insHTML(f) + '</label>';
  }
  function phOf(ph) { /* ví dụ theo nghề: '@wow' '@like' '@worry' '@dayph' */
    ph = ph || ''; if (ph.charAt(0) !== '@') return P(ph);
    if (ph === '@who') { var so = storyList()[0]; return 'Ví dụ: ' + (so[2] === 'f' ? 'chị ' : 'anh ') + so[1] + ', ngành ' + (so[6] || indName(jobKey(), '')).toLowerCase(); }
    if (ph === '@lx') return 'Ví dụ: Gửi mình 5 năm sau, mong là giờ bạn đã ' + dream8() + '. Mình hứa…';
    if (ph === '@iv') return J6() ? J6().ivx : 'Ví dụ: Em chọn nghề ' + jobName().toLowerCase() + ' vì em khéo tay. 5 năm sau, em muốn là thợ chính, kèm được người mới.';
    var J = JP(); if (ph === '@dayph') return 'Ví dụ: ' + J.day[0].replace(/^[^,]*,\s*/, '').split('. ')[0];
    return (J.ph && J.ph[ph.slice(1)]) || '';
  }
  function tipsHTML(t) {
    if (t === '@plan' || t === '@letter') { var pt = t === '@plan' ? planTips() : letterTips(); return '<details class="tips" open><summary>' + PS.icon('bulb', 15) + 'Gợi ý nhỏ · chạm để dùng rồi sửa theo ý bạn</summary><ul class="tipuse">' +
      pt.map(function (x) { return '<li><button type="button" data-act="useTip" data-k="' + x[0] + '" data-v="' + esc(x[1]) + '">' + esc(x[1]) + '</button></li>'; }).join('') + '</ul></details>'; }
    if (t === '@day') t = JP().day; if (t === '@ivt') t = (J6() || IV6_GEN).ivt; return t && t.length ? '<details class="tips"><summary>' + PS.icon('bulb', 15) + 'Gợi ý nhỏ</summary><ul>' + t.map(function (x) { return '<li>' + Q(x) + '</li>'; }).join('') + '</ul></details>' : ''; }
  function chipsHTML(s) {
    var sel = ga(s.key), max = s.max || 99, full = sel.length >= max;
    function chip(o) { var on = sel.indexOf(o) >= 0; return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-act="chip" data-k="' + esc(s.key) + '" data-v="' + esc(o) + '"' + (!on && full ? ' disabled' : '') + ' aria-pressed="' + on + '">' + esc(o) + '</button>'; }
    var base = [], h = '';
    if (s.groups) { s.groups.forEach(function (gr) { base = base.concat(gr[1]); h += '<p class="grp">' + esc(gr[0]) + '</p><div class="chips">' + gr[1].map(chip).join('') + '</div>'; }); }
    else base = s.opts.slice();
    var extraSel = sel.filter(function (x) { return base.indexOf(x) < 0; });
    if (!s.groups) h = '<div class="chips">' + base.map(chip).join('');
    else h += '<div class="chips" style="margin-top:10px">';
    h += extraSel.map(chip).join('') + (s.own && !full ? '<button type="button" class="chip chip--own" data-act="ownOpen" data-k="' + esc(s.key) + '">+ ' + esc(s.own) + '</button>' : '') + '</div>';
    if (V.ownOpen === s.key) h += '<div class="ownrow"><input class="inp" id="ownIn" maxlength="60" placeholder="Viết ngắn gọn" data-ownk="' + esc(s.key) + '"><button type="button" class="btn btn--sm" data-act="ownAdd" data-k="' + esc(s.key) + '">Thêm</button></div>';
    h += '<p class="counter">Đã chọn ' + sel.length + (s.max ? '/' + s.max : '') + (s.min && sel.length < s.min ? ' · cần ít nhất ' + s.min : '') + '</p>';
    return h;
  }
  function optBtn(key, v, t, on, extra) { return '<button type="button" class="opt' + (on ? ' on' : '') + '" data-act="pick" data-k="' + esc(key) + '" data-v="' + esc(v) + '" aria-pressed="' + on + '">' + (extra || '<span class="dot">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span>') + '<span>' + esc(t) + '</span></button>'; }

  function ytBox(yt, start, url, title, id) { /* video YouTube: bấm mới tải (nhẹ máy), có link dự phòng */
    var played = !!g(id + '.vid');
    return '<div class="vid">' + (played ? '<iframe src="https://www.youtube-nocookie.com/embed/' + yt + '?start=' + (start || 0) + '&rel=0&playsinline=1' + (V.autoplay ? '&autoplay=1' : '') + '" title="' + esc(title) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'
      : '<button type="button" class="vid__poster" data-act="vplay"><span><span class="vid__play">' + cdIcon('play', 28, 2.4) + '</span>Bấm để xem video</span></button>') +
      '</div><a class="vlink" href="' + esc(url) + '" target="_blank" rel="noopener">' + cdIcon('ext', 15) + 'Không xem được? Mở trên YouTube</a>';
  }
  var STEP = {
    say: function (s) {
      var h = shinSays(s.mood || 'hi', T(s.t));
      if (s.rules) h += '<div class="rules">' + s.rules.map(function (r) { return '<div class="rule"><span class="ri">' + PS.icon(r[0], 18) + '</span><span><b>' + esc(r[1]) + '</b><small>' + esc(r[2]) + '</small></span></div>'; }).join('') + '</div>';
      if (s.card) h += cdCardPreview(s.card);
      return h;
    },
    pick: function (s) {
      var v = g(s.key), rep = '';
      var h = '<div class="card"><p class="q">' + Q(s.q) + '</p>' + (s.sub ? '<p class="qsub">' + Q(s.sub) + '</p>' : '') + '<div class="opts' + (s.scale ? ' scale' : '') + '">' +
        s.opts.map(function (o, i) { if (v === o.v) rep = o.rep; return optBtn(s.key, o.v, o.t, v === o.v, s.scale ? '<span class="lv">' + (i + 1) + '</span>' : null); }).join('') + '</div></div>';
      if (rep) h += shinSays('encourage', esc(rep));
      return h;
    },
    multi: function (s) { return '<div class="card"><p class="q">' + Q(s.q) + '</p>' + (s.sub ? '<p class="qsub">' + Q(s.sub) + '</p>' : '') + chipsHTML(s) + '</div>'; },
    video: function (s, id) {
      var played = !!g(id + '.vid');
      var h = '<div class="card"><p class="q">' + esc(s.title) + '</p><p class="qsub">' + esc(s.hint) + '</p><div class="vid">' +
        (played ? '<iframe src="https://www.youtube-nocookie.com/embed/' + s.yt + '?start=' + (s.start || 0) + '&rel=0&playsinline=1' + (V.autoplay ? '&autoplay=1' : '') + '" title="' + esc(s.title) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'
          : '<button type="button" class="vid__poster" data-act="vplay"><span><span class="vid__play">' + cdIcon('play', 28, 2.4) + '</span>Bấm để xem video</span></button>') +
        '</div><a class="vlink" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + cdIcon('ext', 15) + 'Không xem được? Mở trên YouTube</a></div>';
      h += '<div class="card"><p class="q">' + Q(s.q) + '</p>' + (s.sub ? '<p class="qsub">' + Q(s.sub) + '</p>' : '') + chipsHTML(s) + '</div>';
      return h;
    },
    write: function (s) {
      var sum = '';
      if (s.twin && s.from) {
        var tg = g(s.from) || {}, near = [], far = [];
        for (var it in tg) if (tg.hasOwnProperty(it)) { if (tg[it] === 'g') near.push(it); else if (tg[it] === 'x') far.push(it); }
        sum = '<div class="twinsum">' + (near.length ? '<p><b class="tg">Lại gần</b>' + esc(near.join(' · ')) + '</p>' : '') + (far.length ? '<p><b class="tx">Ra xa</b>' + esc(far.join(' · ')) + '</p>' : '') + '</div>';
        if (!near.length && !far.length) sum = '';
      }
      if (s.show && ga(s.show).length) sum += '<div class="guessd"><small class="lbl">Lúc nãy bạn đoán</small>' + tagsHTML(ga(s.show)) + '</div>';
      if (s.real && JP().real.length) sum += '<div class="guessd guessd--real"><small class="lbl">Ngành ' + esc(indName(jobKey(), '')) + ' thực tế · theo Tikme, tham khảo</small>' + tagsHTML(JP().real) + '</div>';
      return '<div class="card"><p class="q">' + Q(s.q) + '</p>' + (s.sub ? '<p class="qsub">' + Q(s.sub) + '</p>' : '') + sum +
        '<div class="' + (s.twin ? 'twin' : '') + '">' + s.fields.map(function (f, i) { return fieldHTML(f, s.twin ? i : null); }).join('') + '</div>' + tipsHTML(s.tips) + '</div>';
    },
    dil: function (s) {
      var v = g(s.key);
      function side(k) { var o = s[k], on = v === k; return '<button type="button" class="side' + (on ? ' on' : '') + '" data-act="pick" data-k="' + esc(s.key) + '" data-v="' + k + '" aria-pressed="' + on + '"><span class="tick">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span><b>' + esc(o.t) + '</b><span class="gl"><span class="g"><em>Được</em>' + esc(o.get) + '</span><span class="l"><em>Mất</em>' + esc(o.lose) + '</span></span></button>'; }
      var h = '<div class="card"><span class="noscore">' + PS.icon('info', 14) + esc(TXT.noScore) + '</span><p class="q">' + Q(s.q) + '</p><div class="dil">' + side('a') + side('b') +
        '<div class="dil__more">' + optBtn(s.key, 'm', 'Tùy hôm', v === 'm') + optBtn(s.key, 'o', 'Mình làm khác', v === 'o') + '</div></div>';
      if (v === 'o') h += '<label class="field"><span class="field__l">Bạn thường làm gì?</span><input class="inp" data-k="' + esc(s.key) + 'o" maxlength="120" placeholder="Viết ngắn gọn" value="' + esc(g(s.key + 'o') || '') + '"></label>';
      h += '</div>';
      if (v) {
        var sp = s.senpai;
        h += '<div class="senpai"><div class="senpai__h"><span class="senpai__av">' + PS.icon('people', 15) + '</span><span><b>Senpai kể</b><small>' + esc(sp.who) + '</small></span>' + (sp.draft ? '<span class="draft">' + esc(TXT.senpaiDraft) + '</span>' : '') + '</div><p>' + esc(sp.t) + '</p></div>';
        if (s.calc) {
          var m = +g('a11.mins') || 15;
          h += '<div class="calc"><label for="calcR">Mỗi ngày <b id="calcM">' + m + '</b> phút cho việc bạn muốn giỏi</label><input id="calcR" type="range" min="5" max="60" step="5" value="' + m + '" data-calc="a11.mins"><div class="calc__out">1 năm ≈ <b id="calcH">' + Math.round(m * 365 / 60) + '</b> giờ</div></div>';
        }
      }
      return h;
    },
    recap: function (s) {
      var dil = ACTS.a11.steps.filter(function (x) { return x.k === 'dil'; });
      function chosen(k) { var d = null; dil.forEach(function (x) { if (x.key === k) d = x; }); var v = g(k); if (!d || !v) return '—'; if (v === 'm') return 'Tùy hôm'; if (v === 'o') return g(k + 'o') || 'Làm khác'; return d[v].t; }
      var cur = g(s.key);
      function row(k, lab, txt) { var on = cur === k; return '<button type="button" class="opt opt--rc' + (on ? ' on' : '') + '" data-act="pick" data-k="' + esc(s.key) + '" data-v="' + esc(k) + '" aria-pressed="' + on + '"><span class="dot">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span><span><small>' + esc(lab) + '</small>' + esc(txt) + '</span></button>'; }
      return '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + esc(s.sub || '') + '</p><div class="opts">' +
        s.from.map(function (k, i) { return row(k, s.labels[i], chosen(k)); }).join('') + row('keep', 'Hoặc', s.keepT) + '</div>' +
        s.fields.map(function (f) { return fieldHTML(f); }).join('') + tipsHTML(s.tips) + '</div>';
    },
    age: function (s) {
      var by = parseInt(prof().by, 10), y = new Date().getFullYear(), y5 = y + 5, age5 = by > 1900 ? y5 - by : 0, v = g(s.key);
      var h = '<div class="age"><span class="age__n">' + (age5 || '?') + '</span><p>' + (age5 ? 'Năm <b>' + y5 + '</b>, bạn <b>' + age5 + ' tuổi</b>.' : '5 năm nữa là năm <b>' + y5 + '</b>.') + '</p></div>' +
        '<div class="card"><p class="q">' + Q(s.q) + '</p><div class="opts">' + s.opts.map(function (o) { return optBtn(s.key, o.v, o.t, v === o.v); }).join('') + '</div></div>';
      if (v) h += shinSays('think', esc(s.rep));
      return h;
    },
    tag: function (s) {
      var items = ga(s.from), tg = g(s.key) || {};
      var h = '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p>' +
        (ga(s.hope).length ? '<div class="hopes">' + ga(s.hope).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>' : '') +
        items.map(function (it, i) {
          return '<div class="tagrow" data-row="' + i + '"><b>' + esc(it) + '</b><div class="seg">' + s.opts.map(function (o) {
            var on = tg[it] === o[0];
            return '<button type="button" class="' + o[0] + (on ? ' on' : '') + '" data-act="tag" data-k="' + esc(s.key) + '" data-i="' + i + '" data-v="' + o[0] + '" aria-pressed="' + on + '">' + esc(o[1]) + '</button>';
          }).join('') + '</div></div>';
        }).join('') + '</div>';
      return h;
    }
  };
  STEP.riamode = function (s) {
    var v = +g(s.key) || 0;
    return shinSays('think', T(s.t)) + '<div class="card"><p class="q">Bạn chọn bản nào?</p><div class="opts">' +
      s.opts.map(function (o) { var on = v === o.v; return '<button type="button" class="opt opt--rc' + (on ? ' on' : '') + '" data-act="riaMode" data-v="' + o.v + '" aria-pressed="' + on + '"><span class="dot">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span><span><b>' + esc(o.t) + (o.rec ? ' <em class="rec">Khuyên dùng</em>' : '') + '</b><small>' + esc(o.d) + '</small></span></button>'; }).join('') + '</div></div>';
  };
  STEP.ria = function (s) {
    var RQX = rq(), a = ga(s.key), n = RQX.length, idx = V.riaI;
    if (typeof idx !== 'number') { idx = 0; while (idx < n && (a[idx] === 1 || a[idx] === 0)) idx++; }
    var done = 0; for (var i = 0; i < n; i++) if (a[i] === 1 || a[i] === 0) done++;
    if (idx >= n) return '<div class="card riadone">' + shinNow('party', 70) + '<p class="q">Xong ' + n + ' câu!</p><p class="qsub">Bấm Tiếp tục để xem kết quả.</p><button type="button" class="link" data-act="riaGo" data-i="' + (n - 1) + '">Xem lại câu cuối</button></div>';
    var cur = a[idx];
    return '<div class="card ria"><div class="ria__top"><span>Câu ' + (idx + 1) + '/' + n + '</span><span class="ria__bar"><i style="width:' + Math.round(done / n * 100) + '%"></i></span></div>' +
      '<p class="ria__q">' + esc(s.q) + '</p><p class="ria__s">' + esc(RQX[idx][1]) + '</p>' +
      '<div class="ria__btns"><button type="button" class="btn btn--soft' + (cur === 0 ? ' on' : '') + '" data-act="riaAns" data-i="' + idx + '" data-v="0">Không hẳn</button><button type="button" class="btn' + (cur === 1 ? ' on' : '') + '" data-act="riaAns" data-i="' + idx + '" data-v="1">Thích</button></div>' +
      (idx > 0 ? '<button type="button" class="link" data-act="riaGo" data-i="' + (idx - 1) + '">‹ Câu trước</button>' : '') + '</div>';
  };
  STEP.riares = function () {
    var R = riaRes(), top = RIA[R.code[0]];
    return '<div class="card"><p class="q">3 nhóm nổi bật của bạn</p><p class="qsub">' + (riaN() === 60 ? 'Bản đầy đủ · 60 câu' : 'Bản nhanh · 30 câu') + '</p><div class="riacode">' + R.code.map(function (k) { return '<span style="background:' + RIA[k].c + '">' + k + '<small>' + esc(RIA[k].n) + '</small></span>'; }).join('') + '</div>' +
      '<div class="riabars">' + R.sorted.map(function (k) { return '<div class="rb"><b>' + esc(RIA[k].n) + '</b><span><i style="width:' + Math.round(R.u[k] / R.max * 100) + '%;background:' + RIA[k].c + '"></i></span><small>' + R.u[k] + '/' + R.max + '</small></div>'; }).join('') + '</div>' +
      '<div class="riatop"><b>' + esc(top.n) + '</b><p>' + esc(top.d) + '</p><p><small class="lbl">Hay gặp ở</small>' + esc(top.env) + '</p></div></div>' +
      shinSays('think', 'Đây là <b>gợi ý</b>, không phải nhãn dán. Bạn thấy đúng với mình chỗ nào?') +
      (riaN() === 30 ? '<button type="button" class="morebtn" data-act="riaMore">' + cdIcon('plus', 16, 2.4) + '<span><b>Làm thêm 30 câu</b><small>Lên bản đầy đủ 60 câu, kết quả rõ hơn</small></span></button>' : '');
  };
  function tikUrl(s) {
    if (s.dyn === 'job') { var m = jobKey(); return TIKME + '/nganh-nghe' + (m ? '/' + m : ''); }
    if (s.dyn === 'visa') return TIKME + VISA[visaKey()].u;
    if (s.dyn === 'story') return TIKME + STORY_LIST;
    return s.url;
  }
  STEP.tik = function (s) {
    var op = !!g(s.key), tx = s.t, bt = s.btn;
    if (s.dyn === 'job' && g('a33.main') === 'khac') { tx = jobKey() ? s.tNear : s.tNone; bt = jobKey() ? 'Xem ngành ' + indName(jobKey(), '') + ' trên Tikme' : 'Xem 17 ngành trên Tikme'; }
    if (s.dyn === 'story') return shinSays('hi', T(tx)) + '<div class="card tik">' + storyCards(s.key) +
      '<a class="btn btn--soft btn--w" style="margin-top:14px" href="' + esc(tikUrl(s)) + '" target="_blank" rel="noopener" data-act="tikOpen" data-k="' + esc(s.key) + '">' + cdIcon('ext', 17) + '<span>' + Q(bt) + '</span></a>' +
      (op ? '<p class="tik__ok">' + PS.icon('check', 16, 3) + 'Đã mở Tikme. Đọc xong thì quay lại đây.</p>' : '<p class="qsub" style="margin:10px 0 0">Chạm một chuyện để mở trên Tikme</p>') + tipsHTML(s.tips) + '</div>';
    return shinSays('hi', T(tx)) + '<div class="card tik"><a class="btn btn--go btn--w" href="' + esc(tikUrl(s)) + '" target="_blank" rel="noopener" data-act="tikOpen" data-k="' + esc(s.key) + '">' + cdIcon('ext', 18) + '<span>' + Q(bt) + '</span></a>' +
      (op ? '<p class="tik__ok">' + PS.icon('check', 16, 3) + 'Đã mở Tikme. Làm xong thì quay lại đây.</p>' : '<p class="qsub" style="margin:10px 0 0">tikme.com · mở ở thẻ mới</p>') +
      (s.more ? '<a class="vlink" href="' + esc(TIKME + s.more.u) + '" target="_blank" rel="noopener">' + cdIcon('ext', 15) + esc(s.more.t) + '</a>' : '') + tipsHTML(s.tips) + '</div>';
  };
  function storyList() { /* chuyện gợi ý theo ngành; dưới 2 chuyện thì thêm STORY_GEN (ưu tiên khác giới) */
    var out = (STORY_IND[jobKey()] || []).slice(), have = {}, i;
    out.forEach(function (x) { have[x[0]] = 1; });
    var gen = STORY_GEN.slice();
    if (out.length && out[0][2] === 'm') gen.reverse();
    for (i = 0; i < gen.length && out.length < 2; i++) if (!have[gen[i][0]]) { out.push(gen[i]); have[gen[i][0]] = 1; }
    return out;
  }
  function storyCards(key) {
    var so = storyList(), own = STORY_IND[jobKey()] ? 1 : 0;
    return '<p class="grp" style="margin-top:0">' + (own ? 'Anh chị đi trước ngành ' + esc(indName(jobKey(), '')) : 'Anh chị đi trước nên đọc') + '</p>' +
      so.map(function (x) {
        var sub = (x[6] ? 'Ngành ' + x[6] + ' · ' : '') + (x[4] ? x[4] + ' · ' : '') + x[3];
        return '<a class="tikcard story" href="' + esc(TIKME + '/cau-chuyen-thanh-cong/' + x[0]) + '" target="_blank" rel="noopener" data-act="tikOpen" data-k="' + esc(key) + '">' +
          '<span class="tikcard__lg story__av story__av--' + x[2] + '" aria-hidden="true">' + esc(x[1].split(' ').pop().charAt(0)) + '</span>' +
          '<span class="tikcard__tx"><b>' + esc(x[1]) + '</b><small>' + esc(sub) + '</small>' + (x[5] ? '<em class="story__v">' + cdIcon('play', 12, 2.6) + 'Có video</em>' : '') + '</span><span class="tikcard__go">' + cdIcon('ext', 17) + '</span></a>';
      }).join('');
  }
  STEP.inds = function (s) {
    var v = g(s.key), sel = s.multi ? ga(s.key) : [], ex = s.exclude ? g(s.exclude) : null;
    function on(x) { return s.multi ? sel.indexOf(x) >= 0 : v === x; }
    var list = INDS.filter(function (x) { return x.s !== ex; });
    var full = s.multi && sel.length >= s.max;
    var h = '<div class="card"><p class="q">' + Q(s.q) + '</p>' + (s.sub ? '<p class="qsub">' + Q(s.sub) + '</p>' : '') + '<div class="inds">' +
      list.map(function (x) { var o = on(x.s); return '<button type="button" class="ind' + (o ? ' on' : '') + '" data-act="ind" data-k="' + esc(s.key) + '" data-v="' + x.s + '" aria-pressed="' + o + '"' + (full && !o ? ' disabled' : '') + '><b>' + esc(x.n) + '</b><small>' + esc(x.d) + '</small></button>'; }).join('') +
      (s.other ? '<button type="button" class="ind ind--o' + (on('khac') ? ' on' : '') + '" data-act="ind" data-k="' + esc(s.key) + '" data-v="khac"><b>Nghề khác</b><small>Ngoài 17 ngành</small></button>' : '') +
      (s.none ? '<button type="button" class="ind ind--o' + (on('none') ? ' on' : '') + '" data-act="ind" data-k="' + esc(s.key) + '" data-v="none"><b>' + esc(s.none) + '</b><small>Để sau cũng được</small></button>' : '') + '</div>';
    if (s.multi) h += '<p class="counter">Đã chọn ' + sel.length + '/' + s.max + '</p>';
    if (!s.multi && v === 'khac') h += '<label class="field"><span class="field__l">Nghề bạn muốn</span><input class="inp" data-k="' + esc(s.key) + 'o" maxlength="80" placeholder="Ví dụ: thiết kế đồ họa" value="' + esc(g(s.key + 'o') || '') + '"></label>';
    if (!s.multi && v && indOf(v)) h += tikCard(TIKME + '/nganh-nghe/' + v, 'Ngành ' + indOf(v).n, 'Xem công việc, lộ trình trên Tikme');
    return h + '</div>';
  };
  function tikCard(u, title, sub, key) {
    return '<a class="tikcard" href="' + esc(u) + '" target="_blank" rel="noopener"' + (key ? ' data-act="tikOpen" data-k="' + esc(key) + '"' : '') + '><span class="tikcard__lg" aria-hidden="true">T</span><span class="tikcard__tx"><small>' + esc(sub) + '</small><b>' + esc(title) + '</b></span><span class="tikcard__go">' + cdIcon('ext', 17) + '</span></a>';
  }
  /* a42 bước 1: đoán một ngày làm nghề (việc gợi ý theo nghề). Nghề khác: chọn ngành gần nhất trước */
  STEP.jobguess = function (s) {
    var h = '';
    if (g('a33.main') === 'khac') {
      if (!g('a42.near')) {
        return shinSays('think', 'Nghề <b>' + esc(jobName()) + '</b> chưa có trang riêng trên Tikme. Ngành nào trong 17 ngành gần nhất với nghề của bạn?') +
          '<div class="card"><p class="q">Ngành gần nhất</p><p class="qsub">Đi Nhật theo các diện lao động chỉ có một số ngành. Chưa chắc thì hỏi thầy cô nhé.</p><div class="inds">' +
          INDS.map(function (x) { return '<button type="button" class="ind" data-act="pick" data-k="a42.near" data-v="' + x.s + '"><b>' + esc(x.n) + '</b><small>' + esc(x.d) + '</small></button>'; }).join('') +
          '<button type="button" class="ind ind--o" data-act="pick" data-k="a42.near" data-v="none"><b>Không có ngành gần</b><small>Đoán theo nghề của bạn</small></button></div></div>';
      }
      h += '<p class="nearline">' + (jobKey() ? 'Ngành gần nhất: <b>' + esc(indName(jobKey(), '')) + '</b>' : 'Không chọn ngành gần') + ' · <button type="button" class="link" data-act="nearReset">Đổi</button></p>';
    }
    if (s.dl && DAYJOB[jobKey()]) return h + dayLine(s);
    var x = {}; for (var k in s) if (s.hasOwnProperty(k)) x[k] = s[k];
    x.opts = JP().chips;
    return h + STEP.multi(x);
  };
  /* "Một ngày của bạn TTS ngành [Nghề]" (PS1.3.15): dòng thời gian 9 mốc, tìm 3 việc lạc sang ngành khác. Chạm việc thật: "Việc này có thật". Không phạt. */
  function dlX(s) { var x = g(s.dl), jk = jobKey(); if (!x || typeof x !== 'object' || (x.k && x.k !== jk)) { x = { f: [], r: [], k: jk }; S.d[s.dl] = x; } /* đổi ngành thì tìm lại */ x.f = x.f || []; x.r = x.r || []; return x; }
  function dayLine(s) {
    var D8 = DAYJOB[jobKey()], x = dlX(s), n = x.f.length, who = D8.who || 'TTS', lvN = ['', 'dễ', 'vừa', 'khó'];
    var h = '<div class="card dayl"><div class="dayl__hd"><span class="dayl__ic" aria-hidden="true">' + cdIcon('ticket', 20) + '</span><div><small>' + esc(D8.where) + ' ở tỉnh ' + esc(D8.pref) + ' · minh họa</small>' +
      '<p class="q">Một ngày của bạn ' + (D8.who ? esc(indName(jobKey(), '')) : esc(who) + ' ngành ' + esc(indName(jobKey(), ''))) + '</p></div></div>' +
      '<p class="qsub">Có <b>3 việc lạc</b> sang ngành khác. Chạm để tìm nhé!</p>' +
      '<div class="dayl__cnt" id="dlCnt"><span class="dayl__dots">' + [0, 1, 2].map(function (j) { return '<i class="' + (j < n ? 'on' : '') + '">' + (j < n ? j + 1 : '') + '</i>'; }).join('') + '</span><b>Đã tìm ' + n + '/3</b></div><ol class="dline">' +
      D8.items.map(function (it, i) {
        var bad = it[2] === 0, fi = x.f.indexOf(i), ri = x.r.indexOf(i), st = bad && fi >= 0 ? ' dlt--x' : (!bad && ri >= 0 ? ' dlt--ok' : '');
        var mk = bad && fi >= 0 ? '<span class="dlt__n">' + (fi + 1) + '</span>' : (!bad && ri >= 0 ? '<span class="dlt__n dlt__n--ok">' + PS.icon('check', 12, 3) + '</span>' : '<span class="dlt__n dlt__n--o"></span>');
        var note = bad && fi >= 0 ? '<span class="dlt__note dlt__note--x">Việc này của ngành <b>' + esc(indName(it[3], '')) + '</b> · mức ' + lvN[it[4]] + '</span>' : (!bad && ri >= 0 ? '<span class="dlt__note">Việc này có thật: ' + esc(it[2]) + '</span>' : '');
        return '<li class="dlt' + st + '"><button type="button" data-act="dlTap" data-i="' + i + '"' + (st ? ' aria-pressed="true"' : '') + '><time>' + esc(it[0]) + '</time>' + mk + '<span class="dlt__t"><b>' + esc(it[1]) + '</b>' + note + '</span></button></li>';
      }).join('') + '</ol></div>';
    if (n >= 3) h += shinSays('cheer', T('Đủ 3 việc lạc nghề rồi, [Tên]! Giờ xem Tikme để biết một ngày [Nghề] thật nhé.'));
    else if (x.r.length >= 4) h += shinSays('think', 'Gợi ý: việc lạc nghề thường cần nơi làm, đồ nghề khác hẳn. Thử hỏi: việc này có diễn ra ở ' + esc(D8.where.toLowerCase()) + ' không?');
    return h;
  }
  function dlTap(i) {
    var s = ACTS[V.id].steps[V.step], x = dlX(s), it = DAYJOB[jobKey()].items[i];
    if (it[2] === 0) { if (x.f.indexOf(i) < 0) { x.f.push(i); sound(x.f.length >= 3 ? 'badge' : 'arrive'); } }
    else if (x.r.indexOf(i) < 0) { x.r.push(i); sound('tap'); }
    save(); var y = W.pageYOffset; redrawStep(); W.scrollTo(0, y);
    if (x.f.length >= 3 && it[2] === 0) { var sb = D.querySelector('#stepBody .shinbox'); if (sb) sb.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'nearest' }); }
  }
  /* a33 bước 1 (PS1.3.15): video chia 3 đoạn · mỗi đoạn: xem → chọn ý chạm bạn nhất (ý nào cũng đúng) → 1 dòng "Ở bạn…" */
  function vsX() { var x = g('a33.vs'); if (!x || typeof x !== 'object') { x = { seg: 0, w: [] }; S.d['a33.vs'] = x; } if (!x.w) x.w = []; return x; }
  function mmss(t) { return Math.floor(t / 60) + ':' + (t % 60 < 10 ? '0' : '') + (t % 60); }
  function vsMiss(s, i) { var sg = s.segs[i], x = vsX(); if (!x.w[i]) return 'xem'; var p = g(sg.key); if (p == null || p === '') return 'chon'; return fieldOK(s.fields[i]) ? '' : 'viet'; }
  STEP.vseg = function (s) {
    var x = vsX(), i = Math.min(x.seg || 0, s.segs.length - 1), sg = s.segs[i], w = !!x.w[i], last = s.segs.length - 1;
    var h = '<div class="card vsg"><p class="q">' + esc(s.title) + '</p><p class="qsub">' + esc(s.hint) + '</p><div class="vsegs" role="tablist">' +
      s.segs.map(function (z, j) {
        var ok = !vsMiss(s, j), open = j <= i || x.w[j] || (j > 0 && !vsMiss(s, j - 1));
        return '<button type="button" role="tab" class="vseg' + (j === i ? ' cur' : '') + (ok ? ' ok' : '') + '"' + (open ? ' data-act="vsgo" data-i="' + j + '"' : ' disabled') + ' aria-selected="' + (j === i) + '"><i>' + (ok ? PS.icon('check', 12, 3) : (j + 1)) + '</i><span>' + esc(z.tab || z.lbl) + '</span></button>';
      }).join('') + '</div>' +
      '<div class="vcard" id="vcard"><div class="vcard__h"><b>Đoạn ' + (i + 1) + ' · ' + esc(sg.lbl) + '</b><span>' + mmss(sg.s) + ' → ' + mmss(sg.e) + '</span></div><div class="vid">' +
      (V.vsp === i ? '<iframe src="https://www.youtube-nocookie.com/embed/' + s.yt + '?start=' + sg.s + '&end=' + sg.e + '&rel=0&playsinline=1' + (V.autoplay ? '&autoplay=1' : '') + '" title="' + esc(s.title) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'
        : '<button type="button" class="vid__poster" data-act="vsplay"><span><span class="vid__play">' + cdIcon('play', 28, 2.4) + '</span>Xem đoạn ' + (i + 1) + ' · ' + (sg.e - sg.s) + ' giây</span></button>') +
      '</div><div class="vcard__ft"><a class="vlink" href="' + esc(s.url) + '&t=' + sg.s + 's" target="_blank" rel="noopener">' + cdIcon('ext', 15) + 'Mở trên YouTube từ ' + mmss(sg.s) + '</a>' +
      (w ? '<span class="vseen">' + PS.icon('check', 13, 3) + 'Đã xem</span>' : '<button type="button" class="btn btn--sm" data-act="vsdone">Mình xem xong rồi</button>') + '</div></div></div>';
    if (w) {
      var p = g(sg.key), f = s.fields[i], fl = {}; for (var k in f) if (f.hasOwnProperty(k)) fl[k] = f[k];
      if (p === 'n') fl.l = f.lN;
      h += '<div class="card" id="vsq"><p class="q">Ý nào chạm bạn nhất?</p><p class="qsub">Ý nào cũng đúng. Chọn ý gần với bạn.</p><div class="opts">' +
        sg.opts.map(function (o, j) { return optBtn(sg.key, String(j), o, p === String(j)); }).join('') + optBtn(sg.key, 'n', s.none, p === 'n') + '</div>' +
        (p != null && p !== '' ? fieldHTML(fl) : '') + '</div>';
      if (i < last && !vsMiss(s, i)) h += vsNextHTML(s, i);
    }
    return h;
  };
  function vsNextHTML(s, i) { return '<button type="button" class="btn btn--soft btn--w" data-act="vsnext">Xem đoạn ' + (i + 2) + ' · ' + esc(s.segs[i + 1].lbl) + ' ' + PS.icon('next', 17) + '</button>'; }
  function vsNextSync() { /* gõ chữ xong thì hiện / ẩn nút "Xem đoạn tiếp" mà không vẽ lại cả bước */
    var s = ACTS[V.id] && ACTS[V.id].steps[V.step]; if (!s || s.k !== 'vseg') return;
    var i = Math.min(vsX().seg || 0, s.segs.length - 1), btn = D.querySelector('#stepBody [data-act="vsnext"]'), q = D.getElementById('vsq'), ok = i < s.segs.length - 1 && !vsMiss(s, i);
    if (ok && !btn && q) { var t = D.createElement('div'); t.innerHTML = vsNextHTML(s, i); q.parentNode.insertBefore(t.firstChild, q.nextSibling); }
    else if (!ok && btn) btn.parentNode.removeChild(btn);
  }
  STEP.cmp = function (s) {
    var R = riaRes(), t = ga('a32.t'), v = g(s.key);
    var h = '<div class="card"><p class="q">So hai kết quả</p><div class="cmp"><div><small class="lbl">RIASEC của bạn</small>' +
      R.code.map(function (k) { return '<span class="rk" style="background:' + RIA[k].c + '">' + k + '</span>'; }).join('') + '<p>' + esc(R.code.map(function (k) { return RIA[k].n; }).join(' · ')) + '</p></div>' +
      '<div><small class="lbl">Tikme gợi ý</small>' + t.map(function (x) {
        var d = indOf(x), m = d ? d.r.split('').filter(function (k) { return R.code.indexOf(k) >= 0; }) : [];
        return '<p class="cmpi"><b>' + esc(d ? d.n : x) + '</b>' + (d ? '<small>Thường cần: ' + esc(d.r.split('').map(function (k) { return RIA[k].n; }).join(', ')) + (m.length ? ' · <em>gần bạn</em>' : '') + '</small>' : '') + '</p>';
      }).join('') + '</div></div><p class="ps-small">“Thường cần” do khóa học ước lượng, chỉ để tham khảo.</p></div>';
    h += '<div class="card"><p class="q">' + Q(s.q) + '</p><div class="opts">' + s.opts.map(function (o) { return optBtn(s.key, o.v, o.t, v === o.v); }).join('') + '</div></div>';
    if (v) h += shinSays('encourage', esc(s.rep));
    return h;
  };
  STEP.venn = function (s) {
    function lst(k) { return ga(k).slice(0, 4).map(esc).join(' · ') || '—'; }
    return '<div class="card"><svg class="venn" viewBox="0 0 300 210" role="img" aria-label="Ba vòng tròn">' +
      '<circle cx="112" cy="82" r="68" fill="#E0567F" fill-opacity=".16" stroke="#E0567F" stroke-width="2"/>' +
      '<circle cx="188" cy="82" r="68" style="fill:var(--c);stroke:var(--c)" fill-opacity=".14" stroke-width="2"/>' +
      '<circle cx="150" cy="140" r="68" fill="#F2A20F" fill-opacity=".16" stroke="#F2A20F" stroke-width="2"/>' +
      '<text x="78" y="62" text-anchor="middle" font-size="14" font-weight="700" fill="#B83260">Thích</text>' +
      '<text x="222" y="62" text-anchor="middle" font-size="14" font-weight="700" style="fill:var(--c-d)">Giỏi</text>' +
      '<text x="150" y="190" text-anchor="middle" font-size="14" font-weight="700" fill="#9A6400">Coi trọng</text>' +
      '<circle cx="150" cy="104" r="17" fill="#fff" stroke="#18203F" stroke-width="1.5"/><text x="150" y="110" text-anchor="middle" font-size="16" font-weight="800" fill="#18203F">?</text></svg>' +
      '<div class="vl"><p><i style="background:#E0567F"></i><b>Thích</b>' + lst('a21.sel') + '</p><p><i style="background:var(--c)"></i><b>Giỏi</b>' + lst('a22.sel') + '</p><p><i style="background:#F2A20F"></i><b>Coi trọng</b>' + lst('a23.rank') + '</p></div></div>' +
      '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p>' + s.fields.map(function (f) { return fieldHTML(f); }).join('') + '</div>';
  };
  /* ---------- Ga 4 ---------- */
  function senpaiHTML(sp) {
    return '<div class="senpai"><div class="senpai__h"><span class="senpai__av">' + PS.icon('people', 15) + '</span><span><b>Senpai kể</b><small>' + esc(sp.who) + '</small></span>' + (sp.draft ? '<span class="draft">' + esc(TXT.senpaiDraft) + '</span>' : '') + '</div><p>' + esc(sp.t) + '</p></div>';
  }
  function guessItem(s) { /* khởi động Ga 4 theo nghề */
    if (s.slot == null) return s;
    var J = JP(), o;
    if (s.slot === 0) o = { q: 'Tuần đầu ở [Nơi], người mới thường làm gì?', opts: ['Làm việc chính ngay', J.firstOpt, 'Ngồi học lý thuyết cả tuần', 'Mỗi nơi một khác'], fact: J.first,
      senpai: { who: 'Senpai khóa trước', t: 'Tuần đầu mình chỉ làm việc nhỏ và ghi lại từng bước. Nhờ vậy tháng sau học việc chính nhanh hơn.' } };
    else o = GUESS[(GUESS_GRP[J.grp] || GUESS_GRP.gen)[s.slot - 1]];
    return { k: 'guess', key: s.key, q: o.q, opts: o.opts, fact: o.fact, senpai: { who: o.senpai.who, t: o.senpai.t, draft: 1 } };
  }
  STEP.guess = function (s) { /* Đoán thử → xem thực tế: không đúng sai */
    s = guessItem(s);
    var v = g(s.key), vs = v == null ? '' : String(v);
    var h = '<div class="card"><span class="noscore">' + PS.icon('info', 14) + 'Đoán thử · không có đúng sai</span><p class="q">' + Q(s.q) + '</p><div class="opts">' +
      s.opts.map(function (o, i) { return optBtn(s.key, String(i), o, vs === String(i)); }).join('') + '</div></div>';
    if (vs !== '') h += '<div class="fact"><b>' + PS.icon('bulb', 15) + (s.src ? 'Thực tế' : 'Thực tế thường là') + '</b><p>' + esc(s.fact) + '</p>' + (s.src ? '<small>' + esc(s.src) + '</small>' : '') + '</div>' + (s.senpai ? senpaiHTML(s.senpai) : '');
    return h;
  };
  STEP.visa = function (s) {
    var v = g(s.key), p = prof().path;
    var h = '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + (p ? ' Hồ sơ của bạn: <b>' + esc(p) + '</b>.' : '') + '</p><div class="opts">' +
      VISA_ORDER.map(function (k) { return optBtn(s.key, k, VISA[k].n, v === k); }).join('') + '</div></div>';
    if (v && VISA[v]) {
      var x = VISA[v];
      h += '<div class="card visa"><p class="q">' + esc(x.n) + (v === 'na' ? ' · ba diện thường gặp' : '') + '</p><ul>' + x.f.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
        '<p class="visa__note">' + PS.icon('info', 14) + '<span>' + esc(x.note) + '</span></p><p class="ps-small">' + esc(VISA_SRC) + '</p></div>';
    }
    return h;
  };
  function tlYears() { var y = new Date().getFullYear(), a = [['done', 'Đã xong']]; for (var i = 0; i <= 8; i++) a.push([String(y + i), String(y + i)]); a.push(['u', 'Chưa biết']); return a; }
  function mileLbl(m) { return m[0] === 'next' && MILE_NEXT[visaKey()] ? MILE_NEXT[visaKey()] : P(m[1]); }
  var OWNS = [['own', 'a44.ownt'], ['own2', 'a44.own2t'], ['own3', 'a44.own3t']];
  function mSelect(key, id, tl) { /* tháng: không bắt buộc, chỉ hiện khi đã chọn năm */
    var y = tl[id]; if (!y || y === 'done' || y === 'u') return '';
    var cur = tl[id + '_m'] || '', h = '<select class="sel sel--m' + (cur ? ' on' : '') + '" data-tl="' + id + '_m" data-tk="' + esc(key) + '" aria-label="Tháng (không bắt buộc)"><option value="">Tháng</option>';
    for (var i = 1; i <= 12; i++) h += '<option value="' + i + '"' + (cur === String(i) ? ' selected' : '') + '>Th ' + i + '</option>';
    return h + '</select>';
  }
  function ownCount() { var n = 1, tl = g('a44.tl') || {}; OWNS.forEach(function (o, i) { if (String(g(o[1]) || '').replace(/\s/g, '') || tl[o[0]]) n = Math.max(n, i + 1); }); return Math.min(3, Math.max(n, V.ownN || 1)); }
  function tlSelect(key, id, cur) {
    return '<select class="sel' + (cur ? ' on' : '') + '" data-tl="' + id + '" data-tk="' + esc(key) + '" aria-label="Chọn năm"><option value="">Chọn…</option>' +
      tlYears().map(function (o) { return '<option value="' + o[0] + '"' + (cur === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>';
  }
  STEP.tl = function (s) {
    var tl = g(s.key) || {};
    return '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p><p class="road">' + PS.icon('bulb', 14) + '<span>' + esc(VISA[visaKey()].road) + '</span></p>' +
      MILES.map(function (m, i) { return '<div class="tlrow' + (tl[m[0]] ? ' on' : '') + '" data-row="' + i + '"><b>' + esc(mileLbl(m)) + '</b><span class="tlsel">' + mSelect(s.key, m[0], tl) + tlSelect(s.key, m[0], tl[m[0]]) + '</span></div>'; }).join('') +
      '<p class="grp">Mốc riêng của bạn · không bắt buộc</p>' +
      OWNS.slice(0, ownCount()).map(function (o, i) { return '<div class="tlrow tlrow--own"><input class="inp" data-k="' + o[1] + '" maxlength="60" placeholder="Mốc riêng ' + (i + 1) + '" value="' + esc(g(o[1]) || '') + '"><span class="tlsel">' + mSelect(s.key, o[0], tl) + tlSelect(s.key, o[0], tl[o[0]]) + '</span></div>'; }).join('') +
      (ownCount() < 3 ? '<button type="button" class="link addown" data-act="ownMore">+ Thêm mốc riêng</button>' : '') + '</div>';
  };
  function tlItems() { /* các mốc đã chọn, xếp theo thời gian */
    var tl = g('a44.tl') || {}, out = [];
    function lab(y, m) { return y === 'done' ? 'Đã xong' : (y === 'u' ? 'Chưa biết' : (m ? m + '/' + y : y)); }
    MILES.forEach(function (m, i) { if (tl[m[0]]) out.push({ y: tl[m[0]], m: +tl[m[0] + '_m'] || 0, t: mileLbl(m), i: i }); });
    OWNS.forEach(function (o, j) { var ot = String(g(o[1]) || '').replace(/^\s+|\s+$/g, ''); if (ot && tl[o[0]]) out.push({ y: tl[o[0]], m: +tl[o[0] + '_m'] || 0, t: ot, i: 90 + j }); });
    function rk(x) { return x.y === 'done' ? 0 : (x.y === 'u' ? 9999999 : +x.y * 100 + x.m); }
    out.sort(function (a, b) { return (rk(a) - rk(b)) || (a.i - b.i); });
    out.forEach(function (x) { x.lab = lab(x.y, x.m); });
    return out;
  }
  function tlGroups() { var gs = [], last = null; tlItems().forEach(function (x) { if (!last || last.lab !== x.lab) { last = { y: x.y, lab: x.lab, t: [] }; gs.push(last); } last.t.push(x.t); }); return gs; }
  STEP.tlview = function (s) {
    var gs = tlGroups(), nu = 0;
    gs.forEach(function (gr) { if (gr.y === 'u') nu = gr.t.length; });
    var h = '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">Diện: <b>' + esc(VISA[visaKey()].n) + '</b></p><ol class="tlv">' +
      gs.map(function (gr) { return '<li class="' + (gr.y === 'done' ? 'dn' : (gr.y === 'u' ? 'uk' : '')) + '"><span class="tlv__y">' + esc(gr.lab) + '</span><span class="tlv__t">' + gr.t.map(esc).join('<br>') + '</span></li>'; }).join('') + '</ol></div>';
    h += shinSays('think', nu >= 3 ? 'Còn ' + nu + ' mốc chưa biết. Hỏi thầy cô hoặc xem lại Tikme nhé.' : 'Lộ trình này do bạn vẽ. Sau này đổi cũng được.');
    return h + '<div class="card">' + s.fields.map(function (f) { return fieldHTML(f); }).join('') + tipsHTML(s.tips) + '</div>';
  };
  function rdMap() { return g('a43.r') || {}; }
  function rdCount(v) { var r = rdMap(), n = 0; RD().forEach(function (x, i) { if (r[i] === v) n++; }); return n; }
  STEP.swipe = function (s) {
    var READY = RD(), r = rdMap(), n = READY.length, idx = V.swI, done = 0, i;
    for (i = 0; i < n; i++) if (r[i]) done++;
    if (typeof idx !== 'number') { idx = 0; while (idx < n && r[idx]) idx++; }
    if (idx >= n) {
      var col = function (v, lb) { var a = []; READY.forEach(function (x, j) { if (r[j] === v) a.push('<button type="button" class="link" data-act="swGo" data-i="' + j + '">' + esc(x[0]) + '</button>'); }); return '<div class="rdcol rd-' + v + '"><b>' + lb + ' · ' + a.length + '</b>' + (a.join('') || '<small>—</small>') + '</div>'; };
      return '<div class="card"><p class="q">Bạn đã xem hết ' + n + ' thẻ</p><p class="qsub">Chạm một điều để chọn lại.</p>' + READY_OPTS.map(function (o) { return col(o[0], o[1]); }).join('') + '</div>' +
        shinSays('encourage', rdCount('w') + rdCount('u') ? 'Còn lo là bình thường. Biết trước để chuẩn bị, vậy là tốt rồi.' : 'Bạn thấy mình sẵn sàng hết. Ga 7, mình cùng thử xem nhé.');
    }
    var cur = r[idx];
    return '<div class="card swwrap"><div class="ria__top"><span>Thẻ ' + (idx + 1) + '/' + n + '</span><span class="ria__bar"><i style="width:' + Math.round(done / n * 100) + '%"></i></span></div>' +
      '<div class="swc" data-i="' + idx + '"><small>' + Q(s.q) + '</small><b>' + esc(READY[idx][0]) + '</b></div>' +
      '<div class="swbtns">' + READY_OPTS.map(function (o) { return '<button type="button" class="swb swb--' + o[0] + (cur === o[0] ? ' on' : '') + '" data-act="swp" data-i="' + idx + '" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>' +
      (idx > 0 ? '<button type="button" class="link" data-act="swGo" data-i="' + (idx - 1) + '">‹ Thẻ trước</button>' : '') + '</div>';
  };
  function worryText(v) {
    if (v == null || v === '') return '';
    if (v === 'job') return g('a42.worry') || '';
    if (v === 'o') return g('a43.topo') || '';
    var READY = RD(); return READY[+v] ? READY[+v][0] : '';
  }
  STEP.worry = function (s) {
    var READY = RD(), r = rdMap(), v = g(s.key), list = [];
    READY.forEach(function (x, i) { if (r[i] === 'w' || r[i] === 'u') list.push(String(i)); });
    var allOk = !list.length;
    if (allOk) READY.forEach(function (x, i) { list.push(String(i)); });
    var jw = String(g('a42.worry') || '').replace(/^\s+|\s+$/g, '');
    var h = '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + (allOk ? 'Bạn sẵn sàng cả 8 điều. Chọn điều muốn chuẩn bị kỹ hơn.' : Q(s.sub)) + '</p><div class="opts">' +
      list.map(function (i) { return optBtn(s.key, i, READY[+i][0], v === i); }).join('') +
      (jw ? optBtn(s.key, 'job', jw + ' (bạn ghi ở chặng 1)', v === 'job') : '') +
      optBtn(s.key, 'o', 'Điều khác', v === 'o') + '</div>';
    if (v === 'o') h += '<label class="field"><span class="field__l">Điều bạn lo</span><input class="inp" data-k="a43.topo" maxlength="120" placeholder="Viết ngắn gọn" value="' + esc(g('a43.topo') || '') + '"></label>';
    h += '</div>';
    if (v && v !== 'job' && v !== 'o' && READY[+v]) h += senpaiHTML({ who: READY[+v][1], draft: 1, t: READY[+v][2] });
    else if (v) h += shinSays('think', 'Shin ghi lại rồi. Đến Ga 7, mình cùng tìm cách chuẩn bị nhé.');
    return h;
  };
  /* ---------- Ga 5 ---------- */
  STEP.comic = function (s) { /* truyện tranh: mở từng khung */
    if (!g(s.key)) S.d[s.key] = 1;
    var n = Math.min(s.fr.length, +g(s.key) || 1), more = n < s.fr.length;
    return '<div class="card comic"><p class="q">' + Q(s.q) + '</p><p class="comic__who">' + esc(THUY.who) + '</p>' +
      s.fr.slice(0, n).map(function (fi) {
        var f = THUY.frames[fi];
        return '<figure class="comic__p"><div class="comic__art">' + cdScene(f.art) + '<span class="comic__n">' + (fi + 1) + '/' + THUY.frames.length + '</span></div><figcaption><b>' + esc(f.y) + '</b>' +
          f.t.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</figcaption></figure>';
      }).join('') +
      (more ? '<button type="button" class="btn btn--soft btn--w" data-act="cmNext">Xem tiếp ' + PS.icon('next', 15, 2.6) + '</button><p class="qsub" style="margin:8px 0 0;text-align:center">' + Q(s.sub) + '</p>' : '') + '</div>';
  };
  STEP.persp = function (s) { /* góc nhìn của bạn → lời chị Thúy (Tikme) → điều muốn mang về */
    var h = STEP.multi(s);
    if (!ga(s.key).length) return h;
    return h + shinSays('think', 'Mỗi ý là một góc nhìn. Còn chị Thúy nói:') +
      '<figure class="quote quote--sp"><p>' + esc(THUY.quote) + '</p><small>' + esc(THUY.qsrc) + '</small></figure>' +
      tikCard(TIKME + THUY.url, 'Đọc trọn chuyện chị Thúy', 'Tikme · Câu chuyện Đổi đời') +
      '<div class="card" style="margin-top:14px"><p class="q">Nghe chị Thúy chia sẻ</p>' + ytBox(THUY.ytId, 0, THUY.yt, 'Nghe chị Trần Thị Thúy chia sẻ', 'a51') + '</div>' +
      '<div class="card" style="margin-top:14px">' + s.fields.map(function (f) { return fieldHTML(f); }).join('') + '</div>';
  };
  function minhAns(i) {
    var a = MINH.qs[i].a, J = JP(), G = MINH.grp[J.grp] || MINH.grp.gen;
    if (a === '@hard') return G.hard;
    if (a === '@prep') return G.prep;
    if (a === '@day') return String(J.day[1] || J.day[0]).replace(/mình/g, 'anh');
    return a;
  }
  function msgT(html) { return '<div class="msg msg--t"><span class="msg__av" aria-hidden="true">M</span><div class="msg__b">' + html + '</div></div>'; }
  STEP.chat = function (s) { /* trò chuyện với anh Minh (nhân vật giả định) */
    var asked = ga(s.key), left = [], i;
    for (i = 0; i < MINH.qs.length; i++) if (asked.indexOf(i) < 0) left.push(i);
    var h = '<div class="card chatcard"><div class="chat__h"><span class="msg__av">M</span><span><b>Anh Minh</b><small>Senpai năm 3 ở Nhật · nhân vật giả định</small></span><span class="draft">' + esc(TXT.senpaiDraft) + '</span></div><div class="chat">' +
      msgT(Q(g('a33.main') ? MINH.hi : MINH.hiGen));
    asked.forEach(function (k) {
      h += '<div class="msg msg--u"><div class="msg__b">' + esc(MINH.qs[k].q) + '</div></div>';
      h += V.typing === k ? '<div class="msg msg--t"><span class="msg__av" aria-hidden="true">M</span><div class="msg__b typing" aria-label="Anh Minh đang trả lời"><i></i><i></i><i></i></div></div>' : msgT(esc(minhAns(k)));
    });
    h += '</div></div>';
    if (left.length) h += '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p><div class="qchips">' +
      left.map(function (k) { return '<button type="button" class="qchip" data-act="chatAsk" data-v="' + k + '"' + (V.typing != null ? ' disabled' : '') + '>' + esc(MINH.qs[k].q) + '</button>'; }).join('') +
      '</div><p class="counter">Đã hỏi ' + asked.length + (asked.length < s.min ? ' · cần ít nhất ' + s.min : '') + '</p></div>';
    else h += shinSays('cheer', 'Bạn hỏi hết rồi! Bấm Tiếp tục nhé.');
    return h;
  };
  STEP.chatpick = function (s) {
    var asked = ga('a53.ask'), v = g(s.key);
    var h = '<div class="card"><span class="noscore">' + PS.icon('info', 14) + esc(TXT.noScore) + '</span><p class="q">' + Q(s.q) + '</p><div class="opts">' +
      asked.map(function (k) { return optBtn(s.key, String(k), MINH.qs[k].q, v === String(k)); }).join('') + '</div></div>';
    if (v) h += shinSays('think', esc(MINH.note));
    return h;
  };
  /* ---------- Ga 6 ---------- */
  function trim(x) { return String(x == null ? '' : x).replace(/^\s+|\s+$/g, ''); }
  function low1(x) { x = String(x); return x.charAt(0).toLowerCase() + x.slice(1); }
  function grpKey() { return JP().grp || 'gen'; }
  function J6() { return IND6[jobKey()] || null; } /* Ga 6 theo từng nghề; null = không có nghề → dùng nhóm */
  function j6Senpai(k) { var J = J6(), x = (J && J[k]) || IV6_GEN[k]; return { who: x[0], t: x[1], draft: 1 }; }
  function lvNoteTxt() { /* ghi chú trình độ: theo nghề (nếu có) rồi theo diện */
    var J = J6(), vk = visaKey(), n = J && J.note;
    if (n && typeof n === 'object') n = n[vk];
    return n || PLAN.lvNote[vk] || '';
  }
  function planOpts(d) { /* gợi ý theo TỪNG NGHỀ đứng trước (IND6), rồi gợi ý chung; không có nghề thì theo nhóm */
    var gk = grpKey(), J = J6(), a;
    if (d === 'work') a = J ? J.work.concat(PLAN.workC) : (PLAN.workG[gk] || PLAN.workG.gen).concat(PLAN.work);
    else a = J ? J.jpc.concat(PLAN.jpc) : (PLAN.jpcG[gk] || PLAN.jpcG.gen).concat(PLAN.jpc);
    return a.filter(function (x) { return !(x === '@next' && gk === 'ks'); }).map(function (x) { return x === '@next' ? (MILE_NEXT[visaKey()] || 'Lên Kỹ năng đặc định 1') : P(x); });
  }
  function lvName(n) { var v = g('a62.jp' + n), L = PLAN['lv' + n], i; if (!v || v === 'u') return ''; for (i = 0; i < L.length; i++) if (L[i][0] === v) return L[i][1]; return v; }
  function planTips() {
    var t1 = [], t2 = [], sv = g('a62.save');
    if (lvName(1)) t1.push('đạt ' + lvName(1) + ' trước khi bay');
    ga('a62.do1').slice(0, 2).forEach(function (x) { t1.push(low1(x)); });
    if (lvName(2)) t2.push(g('a62.jp2') === 'N4' ? 'giữ vững N4' : 'lên ' + lvName(2));
    ga('a62.work').slice(0, 2).forEach(function (x) { t2.push(low1(x)); });
    if (sv != null && sv !== 'u' && +sv > 0) t2.push('để dành khoảng ' + sv + ' triệu mỗi năm');
    function join(a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' và ' + a[a.length - 1] : (a[0] || '…'); }
    return [['a62.p1', 'Ở JPC, mình sẽ ' + join(t1) + '.'], ['a62.p2', 'Ở Nhật, mình sẽ ' + join(t2) + '.']];
  }
  function gapList() { /* điều nghề cần: theo từng nghề (IND6.gap; không có nghề thì theo nhóm) + điều vất vả riêng (INDP.r3) + điều chung */
    var J = J6(), gk = GAP_JOB[jobKey()] || grpKey(), out = J ? J.gap.slice() : (GAP_GRP[gk] || GAP_GRP.gen).slice(), r = JP().r3;
    if (r) out.push(['Quen với: ' + low1(r[0]), 'hỏi 1 anh chị đi trước cách họ đã quen']);
    return out.concat(GAP_COMMON);
  }
  function gapNeed() { var m = g('a63.gap') || {}, n = 0; gapList().forEach(function (x) { if (m[x[0]] === 'n' || m[x[0]] === 'p') n++; }); return n; }
  function habitWhen(i) { var w = g('a63.h' + i + 'w'); if (w == null || w === '') return ''; return w === 'o' ? trim(g('a63.h' + i + 'wo')) : (HABIT_WHEN[+w] || ''); }
  function habitText(i) { var w = habitWhen(i), d = trim(g('a63.h' + i + 'd')).replace(/\.$/, ''); return w && d ? 'Khi ' + w + ', tôi sẽ ' + d + '.' : ''; }
  function formulaHTML(i) { var t = habitText(i); return t ? PS.icon('check', 14, 3) + '<span>' + esc(t) + '</span>' : '<span class="muted">Chọn “Khi…”, rồi viết “tôi sẽ…”</span>'; }
  function slOut(c, v) {
    if (v == null || v === '') return '<span class="sl__hint">Kéo để chọn</span>';
    if (v === 'u') return '<b>Chưa tính được</b>';
    v = +v;
    if (c.unit === 'part') return '<b>' + v + '</b> / 10 phần';
    return '<b>' + v + '</b> triệu/năm <small>≈ ' + String(Math.round(v / 12 * 10) / 10).replace('.', ',') + ' triệu/tháng</small>';
  }
  STEP.slide = function (s) { /* thanh trượt: khởi động Ga 6 (rõ mấy phần) và để dành mỗi năm */
    var c = s.sl, v = g(c.key), has = v != null && v !== '', num = (has && v !== 'u') ? +v : c.def;
    var h = '<div class="card"><p class="q">' + Q(s.q) + '</p>' + (s.sub ? '<p class="qsub">' + Q(s.sub) + '</p>' : '') +
      '<div class="sl' + (has ? ' on' : '') + '" id="slBox"><div class="sl__out" id="slOut">' + slOut(c, has ? v : null) + '</div>' +
      '<input type="range" class="sl__r" min="' + c.min + '" max="' + c.max + '" step="' + c.step + '" value="' + num + '" data-sl="' + esc(c.key) + '" aria-label="' + esc(P(s.q)) + '">' +
      '<div class="sl__lh"><span>' + esc(c.lo) + '</span><span>' + esc(c.hi) + '</span></div></div>' +
      (c.skip ? '<button type="button" class="chip chip--sm' + (v === 'u' ? ' on' : '') + '" id="slSkip" data-act="pick" data-k="' + esc(c.key) + '" data-v="u">' + esc(c.skip) + '</button>' : '') +
      (s.note ? '<p class="slnote">' + PS.icon('info', 14) + '<span>' + esc(s.note) + '</span></p>' + tikCard(TIKME + '/nganh-nghe' + (jobKey() ? '/' + jobKey() : ''), 'Ngành ' + (jobKey() ? indName(jobKey(), '') : 'nghề') + ' trên Tikme', 'Xem số tham khảo') : '') + '</div>';
    if (s.senpai) h += '<div id="slSp"' + (has ? '' : ' hidden') + '>' + senpaiHTML(typeof s.senpai === 'string' ? j6Senpai(s.senpai.slice(1)) : s.senpai) + '</div>';
    if (s.opts) h += '<div class="card"><p class="q">' + Q(s.cq) + '</p><p class="qsub">' + Q(s.csub) + '</p>' + chipsHTML(s) + '</div>';
    return h;
  };
  function slSet(t) {
    var k = t.getAttribute('data-sl'), st = ACTS[V.id].steps[V.step], c = st.sl, first = g(k) == null || g(k) === '';
    S.d[k] = +t.value; save();
    var o = D.getElementById('slOut'), sp = D.getElementById('slSp'), bx = D.getElementById('slBox'), sk = D.getElementById('slSkip');
    if (o) o.innerHTML = slOut(c, S.d[k]);
    if (bx) bx.className = 'sl on'; if (sk) sk.className = 'chip chip--sm';
    if (sp && sp.hasAttribute('hidden')) sp.removeAttribute('hidden');
    if (first) sound('tap');
    refreshBar();
  }
  STEP.bridge = function (s) { /* cây cầu mốc: lấy các mốc ở a44, chia 2 chặng theo mốc bay sang Nhật */
    var all = tlItems(), y0 = new Date().getFullYear(), fly = null, c1 = [], c2 = [], dn = [], uk = [];
    function rk(x) { return +x.y * 100 + (x.m || 12); }
    all.forEach(function (x) { if (x.i === 2 && /^\d+$/.test(x.y)) fly = x; });
    var cut = fly ? rk(fly) : (y0 + 1) * 100 + 12;
    all.forEach(function (x) { if (x.y === 'done') dn.push(x.t); else if (x.y === 'u') uk.push(x.t); else if (rk(x) <= cut) c1.push(x); else c2.push(x); });
    function list(a, start) { return a.length ? '<ol class="br__ol" start="' + (start + 1) + '">' + a.map(function (x) { return '<li><b>' + esc(x.lab) + '</b>' + esc(x.t) + '</li>'; }).join('') + '</ol>' : '<p class="ps-small">Chưa có mốc. Phần sau bạn tự đặt nhé.</p>'; }
    return '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p>' + cdBridge(c1.length, c2.length) +
      '<div class="br"><div class="br__seg"><small class="lbl">Chặng 1 · Ở JPC</small>' + list(c1, 0) + '</div><div class="br__seg br__seg--2"><small class="lbl">Chặng 2 · Ở Nhật</small>' + list(c2, c1.length) + '</div></div>' +
      (dn.length ? '<p class="ps-small"><b>Đã xong:</b> ' + esc(dn.join(' · ')) + '</p>' : '') + (uk.length ? '<p class="ps-small"><b>Chưa biết:</b> ' + esc(uk.join(' · ')) + '</p>' : '') + '</div>' +
      shinSays('think', 'Mỗi chặng là một nhịp cầu. Giờ mình lên kế hoạch cho từng nhịp nhé.') +
      '<p class="ps-small" style="text-align:center">Muốn sửa mốc? Vào Ga 4 › Lộ trình của tôi › Xem và sửa.</p>';
  };
  STEP.plan = function (s) { /* trình độ tiếng Nhật + việc muốn làm được (gợi ý theo nghề) */
    var L = s.lv, v = g(L.key), rp = '', note = L.note ? lvNoteTxt() : '', J = J6();
    var h = '<div class="card"><p class="q">' + Q(L.q) + '</p>' + (note ? '<p class="qsub">' + esc(note) + ' Tham khảo.</p>' : '') + '<div class="lvrow">' +
      PLAN[L.opts].map(function (o) { var on = v === o[0]; if (on) rp = o[2]; return '<button type="button" class="lvb' + (on ? ' on' : '') + (o[0] === 'u' ? ' lvb--u' : '') + '" data-act="pick" data-k="' + esc(L.key) + '" data-v="' + esc(o[0]) + '" aria-pressed="' + on + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>' +
      (rp ? '<p class="lvrep">' + PS.icon('bulb', 14) + '<span>' + esc(rp) + '</span></p>' + (L.note && J && J.lvs ? '<p class="lvrep lvrep--job">' + PS.icon('compass', 14) + '<span><b>Nghề ' + esc(jobName()) + ':</b> ' + esc(J.lvs) + '</span></p>' : '') : '') + '</div>';
    var x = {}; for (var k in s) if (s.hasOwnProperty(k)) x[k] = s[k];
    x.opts = planOpts(s.dyn);
    return h + STEP.multi(x);
  };
  STEP.gap = function (s) { /* nghề cần − bạn đã có = việc cần rèn. Không đúng sai */
    var L = gapList(), m = g(s.key) || {}, left = 0, nh = 0;
    L.forEach(function (x) { if (!m[x[0]]) left++; else if (m[x[0]] === 'h') nh++; });
    var h = '<div class="gapeq" aria-label="Nghề cần trừ bạn đã có bằng việc cần rèn"><span>Nghề cần</span><i>−</i><span>Bạn đã có</span><i>=</i><span class="gapeq__r">Việc cần rèn</span></div>' +
      '<div class="card"><span class="noscore">' + PS.icon('info', 14) + esc(TXT.noScore) + '</span><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p>' +
      L.map(function (x, i) {
        return '<div class="tagrow" data-row="' + i + '"><b>' + esc(x[0]) + '</b><div class="seg">' + GAP_OPTS.map(function (o) {
          var on = m[x[0]] === o[0];
          return '<button type="button" class="' + o[0] + (on ? ' on' : '') + '" data-act="gapSet" data-i="' + i + '" data-v="' + o[0] + '" aria-pressed="' + on + '">' + esc(o[1]) + '</button>';
        }).join('') + '</div></div>';
      }).join('') + '</div>';
    if (!left) h += shinSays('think', nh === L.length ? 'Bạn thấy mình có đủ cả. Bước sau, chọn 2 điều muốn giữ vững nhé.' : 'Còn <b>' + (L.length - nh) + '</b> điều cần rèn. Đây là việc cần làm, không phải điểm trừ.');
    return h + tikCard(TIKME + '/nganh-nghe' + (jobKey() ? '/' + jobKey() : ''), 'Nghề ' + jobName() + ' cần gì? Xem thêm trên Tikme', 'Tikme · tham khảo');
  };
  STEP.habit = function (s) { /* 2 công thức “Khi… tôi sẽ…”, việc nhỏ gợi ý từ điều còn thiếu */
    var L = gapList(), m = g('a63.gap') || {}, need = [], i, h;
    L.forEach(function (x) { if (m[x[0]] === 'n' || m[x[0]] === 'p') need.push(x); });
    if (!need.length) need = L.slice(0, 4);
    h = '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p><p class="grp" style="margin-top:4px">Việc nhỏ gợi ý · chạm để dùng</p><div class="chips">' +
      need.slice(0, 6).map(function (x) { return '<button type="button" class="chip chip--sug" data-act="habFill" data-v="' + esc(x[1]) + '">+ ' + esc(x[1]) + '</button>'; }).join('') + '</div></div>';
    for (i = 1; i <= 2; i++) {
      var wk = 'a63.h' + i + 'w', w = g(wk);
      h += '<div class="card habit" data-hab="' + i + '"><p class="habit__n">Thói quen ' + i + '</p><p class="habit__l">Khi…</p><div class="chips chips--sm">' +
        HABIT_WHEN.map(function (x, j) { var on = w === String(j); return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-act="pick" data-k="' + wk + '" data-v="' + j + '" aria-pressed="' + on + '">' + esc(x) + '</button>'; }).join('') +
        '<button type="button" class="chip chip--own' + (w === 'o' ? ' on' : '') + '" data-act="pick" data-k="' + wk + '" data-v="o">Lúc khác</button></div>' +
        (w === 'o' ? '<input class="inp" data-k="' + wk + 'o" maxlength="60" placeholder="Ví dụ: tan ca làm thêm" value="' + esc(g(wk + 'o') || '') + '" style="margin-top:8px">' : '') +
        '<p class="habit__l">…tôi sẽ</p><input class="inp" data-k="a63.h' + i + 'd" maxlength="100" placeholder="Ví dụ: ' + esc(need[i - 1] ? need[i - 1][1] : 'học 10 từ mới') + '" value="' + esc(g('a63.h' + i + 'd') || '') + '">' +
        '<p class="formula" id="fm' + i + '">' + formulaHTML(i) + '</p></div>';
    }
    return h + rtSug();
  };
  /* Gợi ý thẻ Shin Routine (PS1.3.26): điều chung còn thiếu trước, rồi theo nhóm nghề; học viên tự mở Shin để chọn */
  function rtSug() {
    if (S.demo || !PS.routineSugHTML) return '';
    var m = g('a63.gap') || {}, ids = [];
    GAP_COMMON.forEach(function (x, i) { if ((m[x[0]] === 'n' || m[x[0]] === 'p') && RT_GAP[i]) ids.push(RT_GAP[i]); });
    ids = ids.concat(RT_GRP[grpKey()] || RT_GRP.gen);
    return PS.routineSugHTML(ids, { from: ID, sub: Q(jobKey() ? RT_TXT.sub : RT_TXT.subNoJob) });
  }
  function habFill(v) {
    var k = !trim(g('a63.h1d')) ? 'a63.h1d' : (!trim(g('a63.h2d')) ? 'a63.h2d' : null);
    if (!k) { PS.toast('Hai ô “tôi sẽ…” đã có chữ. Xóa một ô để dùng gợi ý này.'); return; }
    S.d[k] = v; save(); sound('tap'); var y = W.pageYOffset; redrawStep(); W.scrollTo(0, y);
  }
  function ivEst() {
    var n = words(g('a63.iv')), sec = Math.round(n / IV.wps);
    if (!n) return '';
    return PS.icon('clock', 14) + '<span>Khoảng <b>' + n + '</b> từ · đọc to chừng <b>' + sec + '</b> giây (ước lượng). ' +
      (sec < 40 ? 'Hơi ngắn, thêm 1–2 câu nhé.' : (sec > 75 ? 'Hơi dài, thử bớt một ý nhé.' : 'Vừa đẹp cho 60 giây.')) + '</span>';
  }
  var TMC = 326.7, TM = null; /* đồng hồ 60 giây: chu vi vòng r=52 */
  STEP.iv = function (s) { /* trả lời phỏng vấn 60 giây: viết, rồi tập nói to có đồng hồ */
    var f = s.fields[0], n = +g('a63.ivn') || 0, hints = [];
    [['a33.why', 'Vì sao chọn nghề'], ['a13.me', '5 năm sau'], ['a51.bring', 'Muốn mang về']].forEach(function (x) { var t = trim(g(x[0])); if (t) hints.push([x[1], t.length > 110 ? t.slice(0, 108) + '…' : t]); });
    var h = '<div class="card ivq"><span class="ivq__lab">' + PS.icon('people', 14) + 'Câu hỏi phỏng vấn</span><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p>' +
      (hints.length ? '<div class="guessd"><small class="lbl">Ý bạn đã viết ở các ga trước</small><ul class="ivh">' + hints.map(function (x) { return '<li><b>' + esc(x[0]) + '</b>' + esc(x[1]) + '</li>'; }).join('') + '</ul></div>' : '') +
      fieldHTML(f) + '<p class="ivest" id="ivEst">' + ivEst() + '</p>' + tipsHTML(s.tips) + '</div>';
    if (J6() && J6().ivq) h += '<div class="card ivmore"><small class="lbl">' + Q(IV.more) + '</small><p class="ivmore__q">“' + esc(J6().ivq[0]) + '”</p><p class="ivmore__h">' + PS.icon('bulb', 14) + '<span>' + esc(J6().ivq[1]) + '</span></p></div>';
    h += '<div class="card tm"><div class="tm__ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="tm__bg"/><circle cx="60" cy="60" r="52" class="tm__fg" id="tmFg" stroke-dasharray="' + TMC + '" stroke-dashoffset="0" transform="rotate(-90 60 60)"/></svg>' +
      '<span class="tm__c"><b id="tmN">' + IV.secs + '</b><small>giây</small></span></div><div class="tm__r"><p class="q">Tập nói to 60 giây</p><p class="qsub">Đọc bài của bạn như đang phỏng vấn. Không bắt buộc, nhưng nên thử.</p>' +
      '<button type="button" class="btn btn--sm" id="tmBtn" data-act="tmGo">' + (n ? 'Tập lại' : 'Bắt đầu') + '</button></div></div>' +
      '<p class="tm__msg" id="tmMsg" aria-live="polite">' + (n ? PS.icon('check', 14, 3) + 'Đã tập nói ' + n + ' lần' : '') + '</p>';
    return h;
  };
  function tmKill() { if (TM) { clearInterval(TM.h); TM = null; } }
  function tmGo() {
    if (TM) { tmEnd(false); return; }
    var fg = D.getElementById('tmFg'), b = D.getElementById('tmBtn'), m = D.getElementById('tmMsg');
    if (fg) fg.style.strokeDashoffset = '0'; if (b) b.textContent = 'Dừng'; if (m) m.innerHTML = '';
    TM = { t0: Date.now(), h: setInterval(tmTick, 200) }; sound('tap');
  }
  function tmTick() {
    var n = D.getElementById('tmN'), fg = D.getElementById('tmFg');
    if (!TM) return; if (!n) { tmKill(); return; }
    var el = (Date.now() - TM.t0) / 1000, left = Math.max(0, IV.secs - el);
    n.textContent = Math.ceil(left); if (fg) fg.style.strokeDashoffset = String(Math.min(TMC, TMC * el / IV.secs));
    if (left <= 0) tmEnd(true);
  }
  function tmEnd(full) {
    if (!TM) return;
    var el = Math.round((Date.now() - TM.t0) / 1000); tmKill();
    if (full || el >= 10) { S.d['a63.ivn'] = (+g('a63.ivn') || 0) + 1; save(); }
    sound(full ? 'badge' : 'tap');
    var b = D.getElementById('tmBtn'), m = D.getElementById('tmMsg'), n = D.getElementById('tmN'), cnt = +g('a63.ivn') || 0;
    if (b) b.textContent = 'Tập lại'; if (n && !full) n.textContent = IV.secs;
    if (m) m.innerHTML = PS.icon('check', 14, 3) + esc(full ? IV.done : IV.stop.replace('[s]', el)) + (cnt ? ' · Đã tập ' + cnt + ' lần' : '');
  }
  /* ---------- Ga 7 · Thử thách (theo từng nghề: IND7; điều lo nhất: WORRY7) ---------- */
  var DAYN = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'], WDAY = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  function J7() { return IND7[jobKey()] || IND7.gen; }
  function jobArt() { return J7().sc.art || ART7[grpKey()] || 'factory'; }
  function sc7(slot) { /* tình huống đã chuẩn hóa: tt, who, msg, opts, sp, prep, art */
    var x, o = { tt: '', who: '', msg: '', opts: [], sp: null, prep: [], art: '' };
    if (slot === 'job') {
      x = J7().sc; o.tt = x.tt; o.who = x.who; o.msg = x.msg; o.opts = x.opts; o.sp = { who: x.sp[0], t: x.sp[1], draft: 1 }; o.prep = J7().prep; o.art = jobArt();
      return o;
    }
    var v = g('a43.top'), RDx = RD(), w = trim(worryText(v));
    if (v === 'job' || v === 'o' || !RDx[+v] || v == null || v === '') {
      x = WORRY7_OWN; o.tt = w || 'Điều bạn lo'; o.msg = x.msg.replace('[W]', w || 'điều bạn lo');
    } else {
      x = WORRY7[+v]; o.tt = RDx[+v][0]; o.msg = x.msg.replace('[R3]', low1(RDx[3][0]));
    }
    o.who = x.who; o.opts = x.opts; o.prep = x.prep; o.art = x.art === '@job' ? jobArt() : x.art;
    o.sp = x.sp === '@r3' ? { who: RDx[3][1], t: RDx[3][2], draft: 1 } : { who: x.sp[0], t: x.sp[1], draft: 1 };
    return o;
  }
  function scPick(key, slot) { /* lựa chọn của học viên ở một ngày (cho ô 8, báo cáo) */
    var x = sc7(slot), v = g(key);
    if (v == null || v === '') return '';
    var t = v === 'o' ? trim(g(key + 'o')) : (x.opts[+v] ? x.opts[+v].t : '');
    return x.tt + ' → ' + t;
  }
  function weekHTML(cur) {
    var mk = [1, 3], keys = { 1: 'a71.s1', 3: 'a71.s2' };
    return '<div class="wk" aria-label="Tuần đầu ở Nhật">' + WEEK7.map(function (d, i) {
      var m = mk.indexOf(i) >= 0, ok = m && g(keys[i]) != null && g(keys[i]) !== '' && i !== cur;
      return '<span class="wk__d' + (i === cur ? ' cur' : '') + (m ? ' mk' : '') + (ok ? ' ok' : '') + '"><small>' + d + '</small><b>' + (ok ? PS.icon('check', 14, 3) : (i + 1)) + '</b></span>';
    }).join('') + '</div>';
  }
  STEP.week = function (s) {
    var a = sc7('job'), b = sc7('worry');
    return shinSays('think', T(s.t)) + weekHTML(-1) +
      '<div class="card"><span class="noscore">' + PS.icon('info', 14) + esc(TXT.noScore) + '</span>' +
      '<div class="wkplan"><p><b>' + DAYN[1] + '</b><span>Chuyện của nghề ' + esc(jobName()) + '</span><small>' + esc(a.tt) + '</small></p>' +
      '<p><b>' + DAYN[3] + '</b><span>Điều bạn lo nhất ở Ga 4</span><small>' + esc(b.tt) + '</small></p></div>' +
      '<p class="qsub" style="margin:10px 0 0">Mỗi ngày có 3 cách. Cách nào cũng có được, có mất.</p></div>';
  };
  STEP.sc = function (s) {
    var x = sc7(s.slot), v = g(s.key), vs = v == null ? '' : String(v);
    var h = weekHTML(s.day) + '<div class="card sc"><div class="sc__art">' + cdWork(x.art) + '<span class="sc__day">' + DAYN[s.day] + ' · Ngày ' + (s.day + 1) + '</span></div>' +
      '<p class="sc__tt">' + esc(x.tt) + '</p>' +
      '<div class="msg msg--t sc__msg"><span class="msg__av" aria-hidden="true">' + cdIcon('chat', 15) + '</span><div class="msg__b">' + (x.who ? '<small>' + esc(x.who) + '</small>' : '') + esc(P(x.msg)) + '</div></div>' +
      '<p class="q" style="margin-top:14px">Bạn sẽ làm gì?</p><div class="dil">' +
      x.opts.map(function (o, i) {
        var on = vs === String(i);
        return '<button type="button" class="side' + (on ? ' on' : '') + '" data-act="pick" data-k="' + esc(s.key) + '" data-v="' + i + '" aria-pressed="' + on + '"><span class="tick">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span><b>' + esc(o.t) + '</b><span class="gl"><span class="g"><em>Được</em>' + esc(o.get) + '</span><span class="l"><em>Mất</em>' + esc(o.lose) + '</span></span></button>';
      }).join('') + optBtn(s.key, 'o', 'Mình làm khác', vs === 'o') + '</div>';
    if (vs === 'o') h += '<label class="field"><span class="field__l">Bạn sẽ làm gì?</span><input class="inp" data-k="' + esc(s.key) + 'o" maxlength="120" placeholder="Viết ngắn gọn" value="' + esc(g(s.key + 'o') || '') + '"></label>';
    h += '</div>';
    if (vs !== '' && vs !== 'o' && x.opts[+vs]) h += '<div class="fact"><b>' + PS.icon('bulb', 15) + 'Điều có thể xảy ra</b><p>' + esc(x.opts[+vs].may) + '</p></div>' + senpaiHTML(x.sp);
    else if (vs === 'o') h += shinSays('think', 'Cách của bạn cũng là một cách. Nghe Senpai kể thêm nhé.') + senpaiHTML(x.sp);
    return h;
  };
  function prepOpts() { var out = []; sc7('job').prep.concat(sc7('worry').prep).forEach(function (x) { if (out.indexOf(x) < 0) out.push(x); }); return out; }
  STEP.prep7 = function (s) {
    var x = {}; for (var k in s) if (s.hasOwnProperty(k)) x[k] = s[k];
    x.opts = prepOpts();
    var r = [scPick('a71.s1', 'job'), scPick('a71.s2', 'worry')];
    return '<div class="guessd"><small class="lbl">2 ngày vừa rồi, bạn chọn</small><ul class="cdq">' + r.map(function (t, i) { return t ? '<li><b>' + DAYN[i ? 3 : 1] + ':</b> ' + esc(t) + '</li>' : ''; }).join('') + '</ul></div>' +
      STEP.multi(x) + '<div class="card">' + s.fields.map(function (f) { return fieldHTML(f); }).join('') + tipsHTML(s.tips) + '</div>';
  };
  function hardPool() { /* thẻ việc lấy từ chính hành trình của học viên */
    var out = [];
    function add(t) { t = trim(t); if (t && out.indexOf(t) < 0) out.push(t); }
    ga('a71.prep').forEach(add);
    if (trim(g('a53.q1')) || trim(g('a53.guide'))) add(HARD_LINK.guide);
    if (trim(g('a63.iv'))) add(HARD_LINK.iv);
    J7().hard.forEach(add); HARD_COMMON.forEach(add); ga('a72.own').forEach(add);
    return out;
  }
  function zMap() { return g('a72.z') || {}; }
  STEP.zones = function (s) {
    return shinSays('think', T(s.t)) + '<div class="card"><div class="zones__w">' + cdZones() + '</div><div class="zleg">' +
      ZONES.map(function (z) { return '<p class="z-' + z[0] + '"><i></i><b>' + esc(z[1]) + '</b><span>' + esc(z[2]) + '</span></p>'; }).join('') + '</div></div>' +
      shinSays('encourage', 'Làm được việc ở vùng học hỏi, vùng an toàn của bạn rộng thêm.');
  };
  STEP.zsort = function (s) {
    var L = hardPool(), m = zMap(), left = 0, nh = 0;
    L.forEach(function (t) { if (!m[t]) left++; else if (m[t] === 'h') nh++; });
    var own = ga('a72.own'), h = '<div class="card"><span class="noscore">' + PS.icon('info', 14) + esc(TXT.noScore) + '</span><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p>' +
      L.map(function (t, i) {
        return '<div class="tagrow" data-row="' + i + '"><b>' + esc(t) + '</b><div class="seg seg--z">' + ZONES.map(function (z) {
          var on = m[t] === z[0];
          return '<button type="button" class="z-' + z[0] + (on ? ' on' : '') + '" data-act="zSet" data-i="' + i + '" data-v="' + z[0] + '" aria-pressed="' + on + '">' + esc(z[1]) + '</button>';
        }).join('') + '</div></div>';
      }).join('') +
      (own.length < 2 ? (V.ownOpen === 'a72.own' ? '<div class="ownrow"><input class="inp" id="ownIn" maxlength="70" placeholder="Việc khó bạn tự nghĩ ra" data-ownk="a72.own"><button type="button" class="btn btn--sm" data-act="ownAdd" data-k="a72.own">Thêm</button></div>'
        : '<button type="button" class="chip chip--own" data-act="ownOpen" data-k="a72.own" style="margin-top:6px">+ Việc khó khác của bạn</button>') : '') + '</div>';
    if (!left) h += shinSays('think', nh ? 'Vùng học hỏi của bạn có <b>' + nh + '</b> việc. Bước sau, bạn nhận một việc nhé.' : 'Chưa có việc ở vùng học hỏi. Bước sau, chọn việc gần vùng đó nhất nhé.');
    return h;
  }
  function hardList() { var L = hardPool(), m = zMap(), a = L.filter(function (t) { return m[t] === 'h'; }); if (!a.length) a = L.filter(function (t) { return m[t] !== 'a'; }); if (!a.length) a = L; ga('a72.sel').forEach(function (t) { if (a.indexOf(t) < 0) a.push(t); }); return a; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function isoDay(off) { var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + off); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function dlOK(s) { return /^\d{4}-\d{2}-\d{2}$/.test(String(s || '')); }
  function fmtDl(s) { if (!dlOK(s)) return ''; var p = s.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]); return WDAY[d.getDay()] + ', ' + p[2] + '/' + p[1] + '/' + p[0]; }
  function whoText() { var v = g('a72.who'); if (v == null || v === '') return ''; if (v === 'o') return trim(g('a72.whoo')); if (v === '0' && trim(g('a53.guide'))) return 'Người dẫn đường của bạn'; return WHO7[+v] || ''; }
  function dueOver() { var dl = g('a72.dl'); return !!S.done.a72 && dlOK(dl) && !g('a72.res') && isoDay(0) >= dl; }
  STEP.hard = function (s) {
    var x = {}; for (var k in s) if (s.hasOwnProperty(k)) x[k] = s[k];
    var L = hardPool(), m = zMap(), nh = L.filter(function (t) { return m[t] === 'h'; }).length;
    x.opts = hardList();
    var due = g('a72.due'), dl = g('a72.dl'), who = g('a72.who'), gd = trim(g('a53.guide'));
    var h = (nh ? '' : shinSays('think', 'Vùng học hỏi đang trống. Chọn việc bạn thấy gần vùng đó nhất nhé.')) +
      '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p>' + chipsHTML(x) + '</div>' +
      '<div class="card" data-blk="due"><p class="q">Hạn chót của bạn</p><div class="lvrow">' +
      DUE7.map(function (d) { var on = due === d[0]; return '<button type="button" class="lvb' + (on ? ' on' : '') + '" data-act="dueSet" data-v="' + d[0] + '" aria-pressed="' + on + '">' + esc(d[1]) + '</button>'; }).join('') + '</div>' +
      (due === 'd' ? '<input type="date" class="inp" data-k="a72.dl" min="' + isoDay(1) + '" max="' + isoDay(30) + '" value="' + esc(dlOK(dl) ? dl : '') + '" style="margin-top:10px">' : '') +
      (dlOK(dl) && due ? '<p class="lvrep">' + PS.icon('clock', 14) + '<span>Hạn chót: <b>' + esc(fmtDl(dl)) + '</b>. Hết hạn, Shin sẽ hỏi bạn.</span></p>' : '') + '</div>' +
      '<div class="card" data-blk="who"><p class="q">Ai cùng biết việc này?</p><p class="qsub">Có người biết, bạn dễ giữ lời hơn.</p><div class="opts">' +
      WHO7.map(function (t, i) { if (i === 0 && !gd) return ''; return optBtn('a72.who', String(i), t + (i === 0 ? ' · ' + (gd.length > 34 ? gd.slice(0, 32) + '…' : gd) : ''), who === String(i)); }).join('') +
      optBtn('a72.who', 'o', 'Người khác', who === 'o') + '</div>' +
      (who === 'o' ? '<input class="inp" data-k="a72.whoo" maxlength="60" placeholder="Ví dụ: chị họ ở Osaka" value="' + esc(g('a72.whoo') || '') + '" style="margin-top:8px">' : '') + '</div>';
    return h;
  };
  /* kết quả việc khó sau hạn chót: không phán xét, +10 XP lần đầu */
  function resOv() {
    var v = V.res7 != null ? V.res7 : (g('a72.res') || ''), r = null;
    RES7.forEach(function (x) { if (x[0] === v) r = x; });
    var h = '<h2>Việc khó của bạn</h2><ul class="cdq" style="text-align:left">' + ga('a72.sel').map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      (dlOK(g('a72.dl')) ? '<p class="ps-small">Hạn chót: ' + esc(fmtDl(g('a72.dl'))) + '</p>' : '') +
      '<div class="opts" style="margin:12px 0">' + RES7.map(function (x) { var on = v === x[0]; return '<button type="button" class="opt' + (on ? ' on' : '') + '" data-act="res7v" data-v="' + x[0] + '" aria-pressed="' + on + '"><span class="dot">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span><span>' + esc(x[1]) + '</span></button>'; }).join('') + '</div>' +
      (r ? shinSays('think', esc(r[2])) : '') +
      '<textarea class="ta" id="res7t" rows="3" maxlength="300" placeholder="Kể ngắn: bạn đã làm gì, thấy sao?">' + esc(V.res7t != null ? V.res7t : (g('a72.rest') || '')) + '</textarea>' +
      '<button type="button" class="btn btn--w" data-act="res7save"' + (v ? '' : ' disabled') + ' style="margin-top:12px">Lưu kết quả</button><button type="button" class="link" data-act="ovClose">Để sau</button>';
    ov(h, null);
  }
  function resSave() {
    var v = V.res7 != null ? V.res7 : g('a72.res'), ta = D.getElementById('res7t'); if (!v) return;
    var first = !S.xp.a72r;
    S.d['a72.res'] = v; S.d['a72.rest'] = ta ? trim(ta.value) : ''; S.d['a72.resAt'] = Date.now();
    if (first) S.xp.a72r = CD_XP_WARM;
    V.res7 = null; V.res7t = null; markDay(); save(true); closeOv(); sound(first ? 'badge' : 'tap');
    PS.toast(first ? 'Shin ghi lại rồi · <b>+' + CD_XP_WARM + ' XP</b>' : 'Đã lưu kết quả.'); render(false);
  }
  /* ---------- Ga Ước Mơ (FINAL) · cổng soát vé (a80), lời hứa (a81), Bản Career Design 1 trang (a82) · theo từng nghề: IND8 ---------- */
  function dmy(t) { if (!t) return ''; var d = new Date(+t); return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear(); }
  function nd(x) { return trim(x).replace(/[.!。]+$/, ''); }
  function J8() { return IND8[jobKey()] || IND8.gen; }
  var FPOS = {}; /* ô viết → [chặng, bước]: nút Bổ sung mở đúng chỗ */
  for (var fa in ACTS) if (ACTS.hasOwnProperty(fa)) ACTS[fa].steps.forEach(function (st, i) { (st.fields || []).forEach(function (f) { if (!FPOS[f.key]) FPOS[f.key] = [fa, i]; }); });
  function weakList() { /* ô sơ sài: [số ô, mã ô viết, tên ngắn, lý do] · chỉ gợi ý, không chặn */
    var out = [];
    CARDS.forEach(function (c) {
      (GATE8[c.n] || []).forEach(function (x) {
        var f = FIELD[x[0]]; if (!f) return;
        if (autoSame(f)) out.push([c.n, x[0], x[1], GATE_TXT.tip]);
        else if (words(own(f, g(x[0]))) < x[2]) out.push([c.n, x[0], x[1], GATE_TXT.short]);
      });
    });
    return out;
  }
  function weakCards() { var a = []; weakList().forEach(function (x) { if (a.indexOf(x[0]) < 0) a.push(x[0]); }); return a; }
  function cardNames(a) { var t = a.map(function (n, i) { return (i ? 'ô ' : 'Ô ') + n; }); return t.length > 1 ? t.slice(0, -1).join(', ') + ' và ' + t[t.length - 1] : (t[0] || ''); }
  STEP.gate = function () {
    var wl = weakList(), wc = weakCards(), anim = !RM && !V.scanned; V.scanned = 1;
    var h = shinSays('hi', T(GATE_TXT.t)) +
      '<div class="gate' + (anim ? ' gate--scan' : '') + '"><div class="gate__hd"><span>Máy soát vé</span><span class="jp">改札</span></div><div class="gate__slots">' +
      CARDS.map(function (c, i) {
        var th = wc.indexOf(c.n) >= 0;
        return '<div class="gslot' + (th ? ' gslot--thin' : '') + '" style="--d:' + i + '"><b>' + c.n + '</b><span>' + esc(c.t) + '</span><i>' + (th ? PS.icon('edit', 14, 2.4) : PS.icon('check', 14, 3)) + '</i></div>';
      }).join('') + '</div><span class="gate__beam" aria-hidden="true"></span></div><div class="gate__res">';
    if (wl.length) {
      h += shinSays('think', esc(GATE_TXT.thin.replace('[Ô]', cardNames(wc)))) + '<div class="card">' +
        wl.map(function (x) {
          return '<div class="thinrow"><span class="thinrow__n">' + x[0] + '</span><span class="thinrow__t"><b>' + esc(CARDS[x[0] - 1].t) + '</b><small>“' + esc(x[2]) + '” ' + esc(x[3]) + '</small></span>' +
            '<button type="button" class="btn btn--sm btn--soft" data-act="gateFix" data-k="' + esc(x[1]) + '">Bổ sung</button></div>';
        }).join('') + '<p class="qsub" style="margin:10px 0 0">' + GATE_TXT.keep + '</p></div>';
    } else h += shinSays('cheer', T(GATE_TXT.ok));
    return h + '</div>';
  };
  /* nhìn lại: lúc lên tàu → bây giờ */
  STEP.now8 = function (s) {
    var v = g(s.key), a = g('x1.now'), h = '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p><div class="opts scale">' +
      ACTS.x1.steps[1].opts.map(function (o, i) { return optBtn(s.key, o.v, o.t, v === o.v, '<span class="lv">' + (i + 1) + '</span>'); }).join('') + '</div></div>';
    if (!v) return h;
    var pa = a ? (+a - 1) / 3 * 100 : null, pb = (+v - 1) / 3 * 100, lo = pa == null ? pb : Math.min(pa, pb), d = a ? (+v) - (+a) : 0;
    function edge(x) { return x <= 0 ? ' eL' : (x >= 100 ? ' eR' : ''); }
    h += '<div class="card now8"><p class="q" style="margin-bottom:42px">Lúc lên tàu → bây giờ</p><div class="now8__rail"><span class="now8__seg' + (d < 0 ? ' back' : '') + '" style="left:' + lo + '%;width:' + Math.abs((pa == null ? pb : pa) - pb) + '%"></span>' +
      [1, 2, 3, 4].map(function (n) { return '<i style="left:' + ((n - 1) / 3 * 100) + '%"></i>'; }).join('') +
      (pa != null ? '<span class="now8__pin now8__pin--a' + edge(pa) + '" style="left:' + pa + '%"><small>Lên tàu</small></span>' : '') +
      '<span class="now8__pin now8__pin--b' + edge(pb) + '" style="left:' + pb + '%"><small>Bây giờ</small></span></div>' +
      '<div class="now8__lab"><span>1 · Chưa nghĩ nhiều</span><span>4 · Khá rõ</span></div></div>';
    h += shinSays(d < 0 ? 'think' : 'encourage', esc(!a ? NOW8.same : (d > 0 ? NOW8.up.replace('[D]', d) : (d === 0 ? NOW8.same : NOW8.down))));
    h += '<div class="card"><p class="q">' + esc(s.hq) + '</p><p class="qsub">' + esc(s.hsub) + '</p>' + chipsHTML({ key: s.hkey, opts: NOW8.help, max: s.max, min: 1, own: s.own }) + '</div>';
    return h;
  };
  function dream8() { /* 5 năm sau theo nghề (IND6.ivx), không có thì lấy câu ô số 2 */
    var J = J6(), m = /5 năm sau, em muốn (.*)$/.exec(J ? J.ivx : ''), t = m ? nd(m[1]) : '';
    if (!t) { t = meOwn(); t = t ? 'là người ' + nd(t) : 'vững nghề ' + jobShort(); }
    return t;
  }
  function jobShort() { return jobName().split(' · ')[0].toLowerCase(); }
  function meOwn() { var f = FIELD['a13.me'], v = String(g('a13.me') || ''); return v.indexOf(f.starter) === 0 ? trim(own(f, v)) : ''; }
  function letterTips() { /* thư gợi ý ghép từ bài của học viên; câu nào thiếu dữ liệu thì bỏ */
    var wf = FIELD['a43.why'], wv = String(g('a43.why') || ''), why = wv.indexOf(wf.starter) === 0 ? nd(own(wf, wv)) : '', hb = habitText(1) || habitText(2), me = nd(meOwn());
    var map = { '[Me]': me ? me + '.' : '', '[Hard]': ga('a72.sel')[0] || '', '[Habit]': hb ? '“' + nd(hb) + '”.' : '', '[Why]': why ? why + '.' : '', '[Dream]': dream8(), '[Note]': nd(g('a71.note')), '[Nghề]': jobShort() };
    var out = [];
    LETTER8.forEach(function (t) {
      var ok = true, r = t;
      for (var k in map) if (map.hasOwnProperty(k) && r.indexOf(k) >= 0) { if (!map[k]) ok = false; r = r.split(k).join(map[k]); }
      if (ok) out.push(['a81.letter', r]);
    });
    if (!out.length) out.push(['a81.letter', 'Gửi mình 5 năm sau, mong là giờ bạn đã ' + dream8() + '. Mình hứa đi đến cùng.']);
    return out;
  }
  /* đóng dấu lời hứa: nhấn giữ 1,8 giây */
  var HOLD = null, HOLD_MS = 1800, HOLD_C = 339.3;
  STEP.seal8 = function (s) {
    var sealed = !!g(s.key), p = prof(), lt = trim(g('a81.letter')), mo = trim(g('a81.motto'));
    var h = (sealed ? '' : shinSays('think', esc(V.resealed ? SEAL8.redo : SEAL8.hint))) +
      '<div class="letter' + (sealed ? ' letter--sealed' : '') + '"><p class="letter__to">Gửi mình năm ' + y5() + '</p><p class="letter__t">' + esc(lt) + '</p>' + (mo ? '<p class="letter__m">“' + esc(mo) + '”</p>' : '') +
      '<div class="letter__f"><span>' + esc(p.name || '') + '</span><span>' + esc(dmy(g(s.key) || Date.now())) + '</span></div>' + (sealed ? '<span class="letter__stamp jp" aria-hidden="true">約束</span>' : '') + '</div>';
    if (sealed) return h + shinSays('touched', esc(SEAL8.done));
    return h + '<div class="hold"><button type="button" class="hold__b" id="holdB" aria-label="Nhấn giữ để đóng dấu lời hứa"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="hold__bg" cx="60" cy="60" r="54"/>' +
      '<circle class="hold__fg" id="holdFg" cx="60" cy="60" r="54" style="stroke-dasharray:' + HOLD_C + ';stroke-dashoffset:' + HOLD_C + '"/></svg><span class="jp">約束</span></button><p class="hold__t">Nhấn giữ 2 giây</p></div>';
  };
  function holdStart() {
    if (HOLD || g('a81.seal')) return;
    var fg = D.getElementById('holdFg'), b = D.getElementById('holdB'); if (!fg) return;
    HOLD = { t0: Date.now(), h: setInterval(function () {
      if (!HOLD) return;
      var k = Math.min(1, (Date.now() - HOLD.t0) / HOLD_MS); fg.style.strokeDashoffset = (HOLD_C * (1 - k)).toFixed(1);
      if (k >= 1) holdEnd(true);
    }, 30) };
    if (b) b.className += ' on';
  }
  function holdEnd(ok) {
    if (!HOLD) return; clearInterval(HOLD.h); HOLD = null;
    var b = D.getElementById('holdB'), fg = D.getElementById('holdFg');
    if (b) b.className = b.className.replace(/\s*on\b/g, '');
    if (!ok) { if (fg) fg.style.strokeDashoffset = HOLD_C; return; }
    S.d['a81.seal'] = Date.now(); if (!S.d['a81.y']) S.d['a81.y'] = new Date().getFullYear() + 5;
    V.resealed = 0; save(true); sound('stamp');
    try { if (W.navigator.vibrate) W.navigator.vibrate(40); } catch (e) {}
    var y = W.pageYOffset; redrawStep(); W.scrollTo(0, y);
  }
  function isHoldEv(e) { return !!(e && e.target && e.target.nodeType === 1 && PS.closest(e.target, '#holdB')); }
  D.addEventListener('touchstart', function (e) { if (isHoldEv(e)) { e.preventDefault(); holdStart(); } }, { passive: false });
  D.addEventListener('mousedown', function (e) { if (isHoldEv(e)) holdStart(); });
  ['touchend', 'touchcancel', 'mouseup'].forEach(function (ev) { D.addEventListener(ev, function () { if (HOLD) holdEnd(false); }); });
  D.addEventListener('keydown', function (e) { if (e.target && e.target.id === 'holdB' && (e.key === ' ' || e.key === 'Enter' || e.keyCode === 32 || e.keyCode === 13)) { e.preventDefault(); if (!e.repeat) holdStart(); } });
  D.addEventListener('keyup', function (e) { if (HOLD && e.target && e.target.id === 'holdB') holdEnd(false); });

  /* Bản Career Design 1 trang: 8 ô + câu trả lời phỏng vấn + lời hứa làm chữ ký */
  function sheetHTML() {
    var p = prof(), sa = g('a81.seal'), mo = trim(g('a81.motto')), lt = trim(g('a81.letter')), iv = trim(g('a63.iv'));
    return '<div class="cd1p" id="cd1p"><div class="cd1p__hd"><div><small>Proskills · Career Design 01</small><h2>Bản Career Design của tôi</h2></div><span class="cd1p__k jp" aria-hidden="true">夢</span></div>' +
      '<div class="cd1p__who"><div><small>Họ tên</small><b>' + esc(p.name || '—') + '</b></div><div><small>Lớp</small><b>' + esc(p.cls || '—') + '</b></div>' +
      '<div><small>Nghề chính</small><b>' + esc(jobName()) + '</b></div><div><small>Diện</small><b>' + esc(VISA[visaKey()].n) + '</b></div>' +
      '<div><small>Mã học viên</small><b>' + esc(p.sid || '—') + '</b></div><div><small>Ngày về đích</small><b>' + esc(dmy(S.d['f8.end'] || Date.now())) + '</b></div></div>' +
      '<div class="cd1p__grid">' + CARDS.map(function (c) { return '<section class="cd1p__c"><span class="cd1p__n">' + c.n + '</span><h4>' + esc(c.t) + '</h4>' + cardBody(c.n) + '</section>'; }).join('') + '</div>' +
      (iv ? '<section class="cd1p__iv"><h4>Câu trả lời phỏng vấn 60 giây</h4><p>' + esc(iv) + '</p></section>' : '') +
      '<section class="cd1p__sign"><h4>Lời hứa với mình năm ' + y5() + '</h4>' + (mo ? '<p class="cd1p__motto">“' + esc(mo) + '”</p>' : '') + (lt ? '<p class="cd1p__letter">' + esc(lt) + '</p>' : '') +
      '<div class="cd1p__sig"><span><small>' + (sa ? 'Đã đóng dấu ' + esc(dmy(sa)) : 'Chưa đóng dấu') + '</small><b>' + esc(p.name || '') + '</b></span>' + (sa ? '<span class="cd1p__stamp jp" aria-hidden="true">約束</span>' : '') + '</div></section>' +
      '<p class="cd1p__ft">Proskills · Khoa Kỹ năng JPC · ' + esc(CD_VER) + '</p></div>';
  }
  STEP.sheet8 = function () {
    return shinSays('cheer', T('Đây là Bản Career Design của [Tên]: 8 ô, câu trả lời phỏng vấn và lời hứa của bạn.')) + sheetHTML() +
      '<div class="savebtns"><button type="button" class="btn btn--go" data-act="img8">' + PS.icon('save', 18) + 'Lưu ảnh</button><button type="button" class="btn btn--soft" data-act="print8">' + PS.icon('upload', 18) + 'In / Lưu PDF</button></div>' +
      '<p class="ps-small savehint">Lưu ảnh để gửi thầy cô. Muốn có file PDF: chọn In, rồi chọn Lưu PDF.</p>';
  };
  function reportEndMsg() {
    var p = prof(), t = S.demo ? { pron: 'cô' } : (PS.teacher() || { pron: 'thầy cô' }), R = riaRes(), hb = [habitText(1), habitText(2)].filter(function (x) { return x; });
    var tl = tlItems().filter(function (x) { return x.y !== 'done' && x.y !== 'u'; })[0], rs = '', wr = worryText(g('a43.top'));
    RES7.forEach(function (x) { if (x[0] === g('a72.res')) rs = x[1]; });
    return ['Em chào ' + t.pron + ' ạ. Em là ' + (p.name || '') + ', lớp ' + (p.cls || '') + '. Em đã về đích Career Design 01.',
      '1. Mục tiêu: ' + nd(g('x1.goal')) + '.',
      '2. ' + nd(g('a13.me')) + '.',
      '3. Thích: ' + ga('a21.sel').join(', ') + '. Giỏi: ' + ga('a22.sel').join(', ') + '. Coi trọng: ' + ga('a23.rank').join(', ') + '.',
      '4. RIASEC: ' + (R.full ? R.code.join('-') : '—') + '. Nghề chính: ' + indName(g('a33.main'), 'a33.main') + '. Phương án 2: ' + indName(g('a33.b'), 'a33.b') + '.',
      '5. Diện: ' + VISA[visaKey()].n + (tl ? '. Mốc gần nhất: ' + tl.lab + ' · ' + tl.t : '') + (wr ? '. Còn lo: ' + nd(wr) : '') + '.',
      '6. Senpai học theo: ' + nd(g('a51.who')) + '. Người dẫn đường: ' + nd(g('a53.guide')) + '.',
      '7. ' + nd(g('a62.p1')) + '. ' + nd(g('a62.p2')) + '.' + (hb.length ? ' Thói quen: ' + hb.join(' ') : ''),
      '8. Việc khó: ' + ga('a72.sel').join('; ') + (dlOK(g('a72.dl')) ? ' (hạn ' + fmtDl(g('a72.dl')) + ')' : '') + '. ' + (rs ? 'Kết quả: ' + rs : 'Đang làm') + '.',
      'Lời hứa của em: ' + nd(g('a81.motto')) + '.',
      'Rõ nghề lúc lên tàu: ' + (NOW_LBL[g('x1.now')] || '—') + '. Bây giờ: ' + (NOW_LBL[g('a81.now')] || '—') + '.',
      'Em cảm ơn ' + t.pron + ' ạ.'].join('\n');
  }
  STEP.send8 = function () {
    var t = S.demo ? null : PS.teacher(), msg = reportEndMsg(), sent = g('rep.end');
    var h = shinSays('hi', esc(TXT.reportEndSub)) + '<div class="card">';
    if (S.demo) h += '<p class="ps-small" style="margin-top:0">Bản demo: không gửi thật.</p>';
    else if (!t) h += '<div class="ps-form"><label>Thầy cô hướng dẫn' + PS.teacherSelect('id="repT8"') + '</label></div>';
    else h += '<p class="qsub" style="margin-top:0">Gửi tới <b>' + esc(t.name) + '</b> qua Teams. Gửi kèm ảnh Bản Career Design nhé.</p>';
    h += '<textarea class="ta repmsg" id="repMsg" data-rk="rep.end" rows="8" readonly>' + esc(msg) + '</textarea><div class="repbtns"><button type="button" class="btn btn--soft" data-act="repCopy">Chép tin nhắn</button>' +
      (t ? '<a class="btn" data-act="repTeams" data-k="rep.end" target="_blank" rel="noopener" href="https://teams.microsoft.com/l/chat/0/0?users=' + encodeURIComponent(t.email) + '&message=' + encodeURIComponent(msg) + '">Mở Teams</a>' : '') + '</div>' +
      (sent ? '<p class="tik__ok">' + PS.icon('check', 16, 3) + 'Đã gửi ngày ' + esc(dmy(sent)) + '. Gửi lại lúc nào cũng được.</p>' : '<p class="qsub" style="margin:10px 0 0">Chưa gửi được thì để sau. Bản này luôn ở Ga Ước Mơ.</p>') + '</div>';
    return h;
  };
  function farText() { var v = g('a82.far'); if (v == null || v === '') return ''; if (v === 'o') return trim(g('a82.faro')); if (v === 'u') return 'Chưa biết'; return J8().far[+v] || ''; }
  STEP.next8 = function (s) {
    var v = g(s.key), vs = v == null ? '' : String(v), J = J8(), jk = jobKey(), vi = VISA[visaKey()];
    var h = shinSays('hi', T('Đọc thêm trên Tikme để hiểu nghề [Nghề] sâu hơn nhé. Giờ bạn đọc sẽ thấy khác lúc đầu.')) + '<div class="card tik">' +
      (jk ? tikCard(TIKME + '/nganh-nghe/' + jk, 'Ngành ' + indName(jk, ''), 'Đọc lại trang ngành, giờ bạn đã có kế hoạch', 'a82.tik') : tikCard(TIKME + '/nganh-nghe', '17 ngành trên Tikme', 'Xem ngành gần với nghề của bạn', 'a82.tik')) +
      (vi.u ? tikCard(TIKME + vi.u, 'Diện ' + vi.n, 'Điều kiện và lộ trình của diện bạn đi', 'a82.tik') : '') + '<div style="margin-top:16px">' + storyCards('a82.tik') + '</div></div>' +
      '<div class="card"><p class="q">' + Q(s.q) + '</p><p class="qsub">' + Q(s.sub) + '</p><div class="opts">' +
      J.far.map(function (t, i) { return optBtn(s.key, String(i), t, vs === String(i)); }).join('') + optBtn(s.key, 'o', 'Hướng khác', vs === 'o') + optBtn(s.key, 'u', 'Chưa biết, để CD02 tính tiếp', vs === 'u') + '</div>' +
      (vs === 'o' ? '<input class="inp" data-k="a82.faro" maxlength="80" placeholder="Hướng bạn nghĩ tới" value="' + esc(g('a82.faro') || '') + '" style="margin-top:8px">' : '') + '</div>';
    if (vs !== '') h += senpaiHTML({ who: J.sp[0], t: J.sp[1], draft: 1 }) +
      '<div class="cd02"><span class="cd02__ic">' + PS.icon('rail', 22) + '</span><span><b>Hẹn gặp ở Career Design 02</b><small>Nhìn xa hơn: 5–10 năm sau. CD02 dùng tiếp bài bạn làm ở đây.</small></span></div>';
    return h;
  };
  /* vé hoàn thành (lần đầu về đích, hoặc mở lại ở trang Ga Ước Mơ) */
  function finaleOv(again) {
    var p = prof(), mo = trim(g('a81.motto')), cf = '', cols = ['#FFC93C', CV('--c'), '#E0567F', '#22A05E', '#7A55D3', '#F07F1E'];
    if (!RM) for (var i = 0; i < 18; i++) cf += '<i style="left:' + ((i * 37) % 100) + '%;background:' + cols[i % cols.length] + ';--d:' + ((i % 6) * 0.18).toFixed(2) + 's;--r:' + ((i * 47) % 360) + 'deg"></i>';
    var h = '<div class="fin">' + (cf ? '<div class="confetti" aria-hidden="true">' + cf + '</div>' : '') +
      goldHTML() +
      '<div class="fin__shin">' + shinNow('party', 84, 'hop') + '</div><h2>Về đích rồi!</h2><p>' + T(TXT.finThanks) + '</p>' +
      (again ? '' : '<div class="gain"><span class="gx">' + PS.icon('star', 15) + xpTotal() + ' XP</span><span class="gi">' + PS.icon('bulb', 15) + insTotal() + ' Insight</span></div>') +
      '<button type="button" class="btn btn--go btn--w" data-act="open8" style="margin-bottom:10px">' + esc(TXT.sheetBtn) + '</button>' +
      '<button type="button" class="btn btn--soft btn--w" data-act="ovNext">' + (again ? 'Đóng' : 'Về sơ đồ tuyến') + '</button></div>';
    if (!again) sound('badge');
    ov(h, function () { if (!again) go({ v: 'home' }); });
  }
  function goldHTML() { /* vé hoàn thành vàng: dùng ở màn về đích và đầu tab Bản Career Design */
    var p = prof(), mo = trim(g('a81.motto'));
    return '<div class="gold"><div class="gold__hd"><span>Vé hoàn thành</span><span class="jp">修了乗車券</span></div>' +
      '<div class="gold__route"><div><small class="jp">しゅっぱつ</small><b>JPC</b></div><span class="gold__line" aria-hidden="true"></span><div class="r"><small class="jp">ゆめ</small><b>Ước Mơ</b></div></div>' +
      '<div class="gold__grid"><div><small>Hành khách</small><b>' + esc(p.name || '—') + '</b></div><div><small>Ga đích</small><b>' + esc(jobName()) + '</b></div>' +
      '<div><small>Lớp</small><b>' + esc(p.cls || '—') + '</b></div><div><small>Ngày về đích</small><b>' + esc(dmy(S.d['f8.end'] || Date.now())) + '</b></div></div>' +
      '<div class="gold__stamps">' + STAMP8.map(function (k, j) { return '<span class="jp' + (k.length > 2 ? ' k3' : '') + '" style="--d:' + j + '">' + esc(k) + '</span>'; }).join('') + '</div>' +
      (mo ? '<p class="gold__motto">“' + esc(mo) + '”</p>' : '') + '</div>';
  }
  function finChests() {
    var dn = finDone();
    return '<button type="button" class="chest' + (dn ? '' : ' chest--lock') + '"' + (dn ? ' data-act="finale"' : ' disabled') + '><span class="chest__ic">' + (dn ? cdIcon('ticket', 24) : PS.icon('lock', 22)) + '</span><span><b>Vé hoàn thành</b><small>' +
      (dn ? 'Về đích ' + esc(dmy(S.d['f8.end'] || S.done.a82)) + ' · chạm để xem' : 'Đi hết 3 chặng để nhận vé') + '</small></span></button>' +
      (S.done.a81 ? '<button type="button" class="chest" data-act="open8"><span class="chest__ic" style="background:var(--c-t);color:var(--c-d)">' + PS.icon('book', 22) + '</span><span><b>' + esc(TXT.sheetBtn) + '</b><small>Lưu ảnh, in, gửi thầy cô</small></span></button>' : '');
  }
  function open8() { closeOv(); if (nbOpen) { var nb = D.getElementById('nb'); if (nb) nb.parentNode.removeChild(nb); nbOpen = false; D.body.classList.remove('ps-lock'); } if (S.done.a82 || actOpen('a82')) go({ v: 'act', id: 'a82', step: 0 }); else go({ v: 'st', st: 's8' }); }

  /* lưu ảnh: vẽ Bản Career Design lên canvas (không cần thư viện, chạy cả khi mất mạng) */
  function domLines(html) {
    var box = D.createElement('div'), out = [], cur = '';
    box.innerHTML = html;
    function flush(k) { cur = cur.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); if (cur && cur !== '•') out.push({ t: cur, k: k || '' }); cur = ''; }
    function walk(n) {
      for (var c = n.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) { cur += c.nodeValue; continue; }
        if (c.nodeType !== 1) continue;
        var tg = String(c.tagName).toUpperCase(), cl = String(c.className && c.className.baseVal != null ? c.className.baseVal : (c.className || ''));
        if (tg === 'SVG') continue;
        if (tg === 'SMALL' && /\blbl\b/.test(cl)) { flush(); cur = c.textContent; flush('lbl'); continue; }
        if (/\btags\b/.test(cl)) { flush(); var a = []; for (var s = c.firstChild; s; s = s.nextSibling) a.push(s.textContent); cur = a.join(' · '); flush('tag'); continue; }
        if (tg === 'LI') { flush(); cur = '• '; walk(c); flush('li'); continue; }
        if (tg === 'P' || tg === 'UL' || tg === 'DIV') { flush(); walk(c); flush(); continue; }
        walk(c);
      }
    }
    walk(box); flush(); return out;
  }
  function sheetImg() {
    var cv = D.createElement('canvas'), cx = cv.getContext ? cv.getContext('2d') : null;
    if (!cx) { PS.toast('Máy chưa lưu ảnh được. Bạn chụp màn hình nhé.'); return; }
    var Wd = 1080, PAD = 56, IN = Wd - PAD * 2, FF = '"Be Vietnam Pro","Segoe UI",Roboto,Arial,sans-serif', JF = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
    var p = prof(), y = 0, draw = false, HS = [], si = 0, sa = g('a81.seal');
    function font(w, sz, f) { cx.font = w + ' ' + sz + 'px ' + (f || FF); }
    function wrap(t, mw) { var ws = String(t).split(/\s+/), L = [], c = ''; for (var i = 0; i < ws.length; i++) { var tt = c ? c + ' ' + ws[i] : ws[i]; if (c && cx.measureText(tt).width > mw) { L.push(c); c = ws[i]; } else c = tt; } if (c) L.push(c); return L; }
    function txt(t, x, mw, lh, col) { wrap(t, mw).forEach(function (ln) { if (draw) { cx.fillStyle = col; cx.fillText(ln, x, y); } y += lh; }); }
    function rr(x, yy, w, h, r, fill, stroke) {
      if (!draw) return; cx.beginPath(); cx.moveTo(x + r, yy); cx.arcTo(x + w, yy, x + w, yy + h, r); cx.arcTo(x + w, yy + h, x, yy + h, r); cx.arcTo(x, yy + h, x, yy, r); cx.arcTo(x, yy, x + w, yy, r); cx.closePath();
      if (fill) { cx.fillStyle = fill; cx.fill(); } if (stroke) { cx.strokeStyle = stroke; cx.lineWidth = 2; cx.stroke(); }
    }
    function lines(L, x, mw) {
      L.forEach(function (ln) {
        if (ln.k === 'lbl') { y += 6; font('600', 23); txt(ln.t, x, mw, 32, '#7A82A3'); }
        else if (ln.k === 'tag') { font('600', 26); txt(ln.t, x, mw, 38, CV('--c-d')); }
        else { font('400', 27); txt(ln.t, x, mw, 40, '#18203F'); }
      });
    }
    function section(n, title, L, extra) {
      var y0 = y, i = si++; rr(PAD, y0, IN, HS[i] || 0, 26, '#FFFFFF', '#E3E7F5');
      y += 26;
      if (n) { rr(PAD + 24, y, 50, 50, 14, CV('--c')); if (draw) { font('800', 26); cx.fillStyle = '#fff'; cx.textAlign = 'center'; cx.fillText(String(n), PAD + 49, y + 10); cx.textAlign = 'left'; } }
      var x = PAD + (n ? 94 : 28), mw = IN - (n ? 94 : 28) - 28;
      font('800', 30); txt(title, x, mw, 42, '#18203F'); y += 2;
      lines(L, x, mw); if (extra) extra(x, mw);
      y += 24; if (!draw) HS[i] = y - y0; y += 18;
    }
    function layout() {
      y = 0; si = 0; cx.textBaseline = 'top';
      if (draw) { cx.fillStyle = '#F4F6FE'; cx.fillRect(0, 0, Wd, cv.height); var gr = cx.createLinearGradient(0, 0, Wd, 300); gr.addColorStop(0, CV('--c-l')); gr.addColorStop(1, CV('--c-d')); cx.fillStyle = gr; cx.fillRect(0, 0, Wd, 292); font('700', 150, JF); cx.fillStyle = 'rgba(255,255,255,.16)'; cx.fillText('夢', Wd - PAD - 150, 70); }
      y = 54; font('700', 25); txt('PROSKILLS · CAREER DESIGN 01', PAD, IN, 44, '#FFE08A');
      font('800', 54); txt('Bản Career Design của tôi', PAD, IN - 120, 70, '#FFFFFF');
      font('600', 28); txt((p.name || '') + (p.cls ? ' · Lớp ' + p.cls : '') + (p.sid ? ' · ' + p.sid : ''), PAD, IN - 120, 40, 'rgba(255,255,255,.92)');
      y = 322;
      section(0, 'Ga đích: ' + jobName(), [{ t: 'Diện ' + VISA[visaKey()].n + ' · Về đích ' + dmy(S.d['f8.end'] || Date.now()), k: 'lbl' }]);
      CARDS.forEach(function (c) { section(c.n, c.t, domLines(cardBody(c.n))); });
      var iv = trim(g('a63.iv')); if (iv) section(0, 'Câu trả lời phỏng vấn 60 giây', [{ t: iv }]);
      var mo = trim(g('a81.motto')), lt = trim(g('a81.letter')), L = [];
      if (lt) L.push({ t: lt });
      section(0, 'Lời hứa với mình năm ' + y5(), L, function (x, mw) {
        if (mo) { y += 8; font('700', 32); txt('“' + mo + '”', x, mw - 150, 44, CV('--c-d')); }
        y += 14; font('600', 23); txt(sa ? 'Đã đóng dấu ' + dmy(sa) : 'Chưa đóng dấu', x, mw, 32, '#7A82A3');
        font('800', 34); var ys = y; txt(p.name || '', x, mw - 150, 46, '#18203F');
        if (sa && draw) { var cxp = PAD + IN - 110, cyp = ys - 20; cx.save(); cx.translate(cxp, cyp); cx.rotate(-0.24); cx.beginPath(); cx.arc(0, 0, 62, 0, Math.PI * 2); cx.strokeStyle = '#D2372C'; cx.lineWidth = 6; cx.stroke(); font('700', 38, JF); cx.fillStyle = '#D2372C'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('約束', 0, 2); cx.restore(); cx.textAlign = 'left'; cx.textBaseline = 'top'; }
      });
      font('500', 22); txt('Proskills · Khoa Kỹ năng JPC · ' + CD_VER, PAD, IN, 34, '#7A82A3');
      return y + PAD;
    }
    function run() {
      try {
        cv.width = Wd; cv.height = 100; draw = false; var H = layout();
        cv.width = Wd; cv.height = Math.ceil(H); draw = true; layout();
        var url = cv.toDataURL('image/png'), nm = String(p.name || 'hoc-vien');
        if (nm.normalize) nm = nm.normalize('NFD').replace(/[̀-ͯ]/g, '');
        nm = nm.replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
        S.d['a82.saved'] = S.d['a82.saved'] || Date.now(); save();
        ov('<h2>Ảnh Bản Career Design</h2><p class="ps-small">Giữ ngón tay lên ảnh để lưu, hoặc bấm Tải ảnh.</p><div class="imgbox"><img src="' + url + '" alt="Bản Career Design của ' + esc(p.name || '') + '"></div>' +
          '<a class="btn btn--w" href="' + url + '" download="CareerDesign-' + esc(nm || 'CD01') + '.png">' + PS.icon('save', 18) + 'Tải ảnh</a><button type="button" class="link" data-act="ovClose">Đóng</button>');
      } catch (e) { PS.toast('Chưa tạo được ảnh. Bạn chụp màn hình hoặc chọn In nhé.'); }
    }
    PS.toast('Đang tạo ảnh…');
    if (D.fonts && D.fonts.ready && D.fonts.ready.then) D.fonts.ready.then(run, run); else run();
  }

  function cdCardPreview(n) { return '<div style="margin-top:12px">' + cdCardForce(n) + '</div>'; }
  function cdCardForce(n) { return cdCard(n, true, { force: 1 }); } /* xem trước ô trước khi đóng dấu */
  var CHECK = {
    say: function () { return ''; },
    pick: function (s) { return g(s.key) ? '' : 'Chọn một mức gần với bạn'; },
    age: function (s) { return g(s.key) ? '' : 'Chọn một ý'; },
    multi: function (s) { var n = ga(s.key).length; return n >= (s.min || 1) ? '' : (s.min > 1 ? 'Chọn thêm ' + (s.min - n) + ' ý' : 'Chọn ít nhất 1 ý'); },
    video: function (s) { return ga(s.key).length >= (s.min || 1) ? '' : 'Chọn điều bạn để ý'; },
    vseg: function (s) { for (var i = 0; i < s.segs.length; i++) { var m = vsMiss(s, i); if (m) return (m === 'xem' ? 'Xem đoạn ' : (m === 'chon' ? 'Chọn ý ở đoạn ' : 'Viết 1 dòng ở đoạn ')) + (i + 1); } return ''; },
    write: function (s) { var n = 0; s.fields.forEach(function (f) { if (!fieldOK(f)) n++; }); return n ? 'Còn ' + n + ' ô cần viết' : ''; },
    dil: function (s) { var v = g(s.key); if (!v) return 'Chọn điều bạn hay làm'; if (v === 'o' && String(g(s.key + 'o') || '').replace(/\s/g, '').length < 4) return 'Viết điều bạn hay làm'; return ''; },
    recap: function (s) { if (!g(s.key)) return 'Chọn một tình huống hoặc giữ như hiện tại'; var n = 0; s.fields.forEach(function (f) { if (!fieldOK(f)) n++; }); return n ? 'Viết vì sao bạn chọn' : ''; },
    tag: function (s) { var items = ga(s.from), tg = g(s.key) || {}, n = 0; items.forEach(function (it) { if (!tg[it]) n++; }); return n ? 'Còn ' + n + ' việc chưa xếp' : ''; },
    riamode: function (s) { return g(s.key) ? '' : 'Chọn một bản'; },
    jobguess: function (s) { if (g('a33.main') === 'khac' && !g('a42.near')) return 'Chọn ngành gần nhất'; if (s.dl && DAYJOB[jobKey()]) { var nf = dlX(s).f.length; return nf >= 3 ? '' : 'Tìm thêm ' + (3 - nf) + ' việc lạc nghề'; } return CHECK.multi(s); },
    ria: function (s) { var a = ga(s.key), N = riaN(), n = 0; for (var i = 0; i < N; i++) if (a[i] === 1 || a[i] === 0) n++; return n >= N ? '' : 'Còn ' + (N - n) + ' câu'; },
    riares: function () { return ''; },
    tik: function (s) { return g(s.key) ? '' : 'Mở Tikme trước nhé'; },
    inds: function (s) { if (s.multi) return ga(s.key).length ? '' : 'Chọn ít nhất 1 ngành'; var v = g(s.key); if (!v) return 'Chọn một nghề'; if (v === 'khac' && String(g(s.key + 'o') || '').replace(/\s/g, '').length < 2) return 'Viết tên nghề bạn muốn'; return ''; },
    cmp: function (s) { return g(s.key) ? '' : 'Chọn một ý'; },
    venn: function (s) { return fieldOK(s.fields[0]) ? '' : 'Viết nghề bạn nghĩ tới'; },
    guess: function (s) { var v = g(s.key); return (v == null || v === '') ? 'Đoán một ý' : ''; },
    visa: function (s) { return g(s.key) ? '' : 'Chọn một diện'; },
    tl: function (s) { var tl = g(s.key) || {}, n = 0; MILES.forEach(function (m) { if (!tl[m[0]]) n++; }); return n ? 'Còn ' + n + ' mốc chưa chọn năm' : ''; },
    tlview: function (s) { return fieldOK(s.fields[0]) ? '' : 'Viết cách bạn bắt đầu'; },
    swipe: function (s) { var r = g(s.key) || {}, n = 0; RD().forEach(function (x, i) { if (!r[i]) n++; }); return n ? 'Còn ' + n + ' thẻ' : ''; },
    comic: function (s) { return (+g(s.key) || 1) >= s.fr.length ? '' : 'Xem hết ' + s.fr.length + ' khung'; },
    persp: function (s) { var n = ga(s.key).length; if (n < (s.min || 1)) return 'Chọn ít nhất 1 ý'; return fieldOK(s.fields[0]) ? '' : 'Viết điều bạn muốn mang về'; },
    chat: function (s) { var n = ga(s.key).length; return n >= s.min ? '' : 'Hỏi thêm ' + (s.min - n) + ' câu'; },
    chatpick: function (s) { return g(s.key) ? '' : 'Chọn một câu'; },
    slide: function (s) { var v = g(s.sl.key); if (v == null || v === '') return 'Kéo thanh trượt để chọn'; return s.opts ? CHECK.multi(s) : ''; },
    bridge: function () { return ''; },
    plan: function (s) { return g(s.lv.key) ? CHECK.multi(s) : 'Chọn trình độ tiếng Nhật'; },
    gap: function (s) { var m = g(s.key) || {}, n = 0; gapList().forEach(function (x) { if (!m[x[0]]) n++; }); return n ? 'Còn ' + n + ' điều chưa chọn' : ''; },
    habit: function () { for (var i = 1; i <= 2; i++) { var w = g('a63.h' + i + 'w'); if (w == null || w === '') return 'Chọn “Khi…” cho thói quen ' + i; if (w === 'o' && trim(g('a63.h' + i + 'wo')).length < 3) return 'Viết lúc nào cho thói quen ' + i; if (trim(g('a63.h' + i + 'd')).length < 4) return 'Viết “tôi sẽ…” cho thói quen ' + i; } return ''; },
    iv: function (s) { return fieldOK(s.fields[0]) ? '' : 'Viết câu trả lời của bạn'; },
    week: function () { return ''; },
    zones: function () { return ''; },
    sc: function (s) { var v = g(s.key); if (v == null || v === '') return 'Chọn cách bạn sẽ làm'; if (v === 'o' && trim(g(s.key + 'o')).length < 4) return 'Viết cách bạn sẽ làm'; return ''; },
    prep7: function (s) { var n = ga(s.key).length; if (n < 1) return 'Chọn ít nhất 1 việc'; return fieldOK(s.fields[0]) ? '' : 'Viết một câu nhắn cho mình'; },
    zsort: function () { var m = zMap(), n = 0; hardPool().forEach(function (t) { if (!m[t]) n++; }); return n ? 'Còn ' + n + ' việc chưa xếp' : ''; },
    hard: function (s) { if (!ga(s.key).length) return 'Chọn 1 việc khó'; var d = g('a72.due'); if (!d) return 'Chọn hạn chót'; if (!dlOK(g('a72.dl')) || (d === 'd' && !S.done.a72 && g('a72.dl') < isoDay(1))) return 'Chọn ngày hạn chót'; var w = g('a72.who'); if (w == null || w === '') return 'Chọn ai cùng biết'; if (w === 'o' && trim(g('a72.whoo')).length < 2) return 'Viết tên người cùng biết'; return ''; },
    gate: function () { return ''; },
    now8: function (s) { if (!g(s.key)) return 'Chọn một mức gần với bạn'; return ga(s.hkey).length ? '' : 'Chọn điều giúp bạn nhiều nhất'; },
    seal8: function (s) { if (trim(g('a81.letter')).length < 10) return 'Quay lại viết thư trước nhé'; return g(s.key) ? '' : 'Nhấn giữ con dấu để đóng dấu'; },
    sheet8: function () { return ''; },
    send8: function () { return ''; },
    next8: function (s) { var v = g(s.key); if (v == null || v === '') return 'Chọn một hướng'; if (v === 'o' && trim(g('a82.faro')).length < 3) return 'Viết hướng bạn nghĩ tới'; return ''; },
    worry: function (s) { var v = g(s.key); if (!v) return 'Chọn một điều'; if (v === 'o' && String(g('a43.topo') || '').replace(/\s/g, '').length < 4) return 'Viết điều bạn lo'; return ''; }
  };
  function showMiss() {
    var body = D.getElementById('stepBody'); if (!body) return;
    var el = null, s = ACTS[V.id].steps[V.step];
    if (s.k === 'persp' && ga(s.key).length < (s.min || 1)) el = body.querySelector('.chips');
    else if (s.k === 'plan') el = body.querySelector(g(s.lv.key) ? '.chips' : '.lvrow');
    else if (s.k === 'slide') { var sv0 = g(s.sl.key); el = body.querySelector(sv0 == null || sv0 === '' ? '.sl' : '.chips'); }
    else if (s.k === 'gap') { var gm = g(s.key) || {}; gapList().forEach(function (x, i) { if (!el && !gm[x[0]]) el = body.querySelector('[data-row="' + i + '"]'); }); }
    else if (s.k === 'habit') { var hm = CHECK.habit(), hi2 = hm.charAt(hm.length - 1); el = body.querySelector('[data-hab="' + hi2 + '"]'); }
    else if (s.k === 'write' || s.k === 'recap' || s.k === 'venn' || s.k === 'tlview' || s.k === 'persp' || s.k === 'iv') { (s.fields || []).forEach(function (f) { if (!el && !fieldOK(f)) el = body.querySelector('[data-k="' + f.key + '"]'); }); if (s.k === 'recap' && !g(s.key)) el = body.querySelector('.opts'); }
    else if (s.k === 'tag') { var tg = g(s.key) || {}; ga(s.from).forEach(function (it, i) { if (!el && !tg[it]) el = body.querySelector('[data-row="' + i + '"]'); }); }
    else if (s.k === 'dil' && g(s.key) === 'o') el = body.querySelector('[data-k="' + s.key + 'o"]');
    else if (s.k === 'tl') { var tl0 = g(s.key) || {}; MILES.forEach(function (m, i) { if (!el && !tl0[m[0]]) el = body.querySelector('[data-row="' + i + '"]'); }); }
    else if (s.k === 'worry' && g(s.key) === 'o') el = body.querySelector('[data-k="a43.topo"]');
    else if (s.k === 'jobguess' && g('a33.main') === 'khac' && !g('a42.near')) el = body.querySelector('.inds');
    else if (s.k === 'jobguess' && s.dl && DAYJOB[jobKey()]) el = body.querySelector('.dline');
    else if (s.k === 'vseg') { var vx = vsX(), vi = Math.min(vx.seg || 0, s.segs.length - 1), vm = vsMiss(s, vi); el = vm === 'xem' ? body.querySelector('#vcard') : (vm === 'chon' ? body.querySelector('#vsq .opts') : (vm === 'viet' ? body.querySelector('#vsq textarea') : body.querySelector('[data-act="vsnext"]'))); }
    else if (s.k === 'sc') el = body.querySelector(g(s.key) === 'o' ? '[data-k="' + s.key + 'o"]' : '.dil');
    else if (s.k === 'prep7') el = ga(s.key).length ? body.querySelector('[data-k="a71.note"]') : body.querySelector('.chips');
    else if (s.k === 'zsort') { var zm = zMap(); hardPool().forEach(function (t, i) { if (!el && !zm[t]) el = body.querySelector('[data-row="' + i + '"]'); }); }
    else if (s.k === 'hard') { var hm7 = CHECK.hard(s); el = /việc khó/.test(hm7) ? body.querySelector('.chips') : (/hạn chót/.test(hm7) ? body.querySelector('[data-blk="due"]') : body.querySelector('[data-blk="who"]')); }
    else if (s.k === 'now8') el = body.querySelector(g(s.key) ? '.chips' : '.opts');
    else if (s.k === 'seal8') el = body.querySelector('.hold') || body.querySelector('.letter');
    else if (s.k === 'next8') el = body.querySelector(g(s.key) === 'o' ? '[data-k="a82.faro"]' : '.opts');
    if (!el) el = body.querySelector('.card') || body;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('need', 'pulse'); setTimeout(function () { el.classList.remove('pulse'); }, 2600);
    if (el.focus && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) el.focus();
  }

  /* =========================================================
     6. HOÀN THÀNH CHẶNG · ĐÓNG DẤU · Ô BẢN CAREER DESIGN
     ========================================================= */
  function insForAct(id) { var t = 0; ACTS[id].steps.forEach(function (s) { (s.fields || []).forEach(function (f) { t += insOf(f); }); }); return t; }
  function finish() {
    var id = V.id, a = ACTS[id], st = stById(a.st), first = !S.done[id], stageBefore = shinStage();
    var xp = 0, insOld = S.ins[id] || 0, insNew = insForAct(id);
    if (first) { S.done[id] = Date.now(); xp = a.warm ? CD_XP_WARM : CD_XP_ACT; S.xp[id] = xp; }
    S.ins[id] = Math.max(insOld, insNew);
    var gainIns = S.ins[id] - insOld;
    S.d[id + '.st'] = 0; if (S.bak[id]) delete S.bak[id]; if (id === 'a42') S.d['a42.for'] = jobSig();
    if (id === 'a33') { var vsS = ACTS.a33.steps[0]; if (vsS.k === 'vseg') S.d['a33.signs'] = vsS.segs.filter(function (z) { var p = g(z.key); return p != null && p !== '' && p !== 'n'; }).map(function (z) { return z.lbl; }); }
    if (id === 'a80') S.d['a80.thin'] = weakCards().length;
    if (id === 'a82' && !S.d['f8.end']) S.d['f8.end'] = Date.now();
    markDay(); save(true);
    var ret = V.ret;
    var stNowDone = stDone(st), newChest = stNowDone && !S.chest[st.id];
    sound(first ? 'stamp' : 'tap');
    var kan = st === START ? '出発' : st.k;
    /* PS1.3.55 (ý 25): cuối chặng có Tiếp theo + Về ga (trừ khi mở hộp hoàn thành ga, sửa bài cho vé, Ga Ước Mơ) */
    var nxA = null; if (!ret && !newChest && st !== FINAL) { st.acts.forEach(function (x) { if (!nxA && x !== id && !S.done[x] && actOpen(x)) nxA = x; }); nxA = nxA || nextAct() || nextFin(); }
    var endBtn = nxA ? '<div class="ps-endnav"><button type="button" class="btn btn--go btn--w" data-act="ovAct" data-id="' + nxA + '">Tiếp theo: ' + esc((ACTS[nxA].st !== st.id ? stShort(stById(ACTS[nxA].st)) + ' · ' : '') + ACTS[nxA].t) + PS.icon('next', 16, 2.6) + '</button>' +
      '<button type="button" class="btn btn--soft btn--w" data-act="ovNext">Về ' + esc(stShort(st)) + '</button></div>' : '<button type="button" class="btn btn--w" data-act="ovNext">Tiếp tục</button>';
    ov('<div class="stamp jp">' + esc(kan) + '</div><h2>' + (first ? 'Đã đóng dấu!' : 'Đã lưu lại') + '</h2><p>' + esc(a.t) + '</p>' +
      ((xp || gainIns) ? '<div class="gain">' + (xp ? '<span class="gx">' + PS.icon('star', 15) + '+' + xp + ' XP</span>' : '') + (gainIns ? '<span class="gi">' + PS.icon('bulb', 15) + '+' + gainIns + ' Insight</span>' : '') + '</div>' : '<p class="ps-small">Bài làm lại không cộng thêm XP.</p>') +
      endBtn, function () {
        if (ret) { go({ v: 'act', id: ret, step: 0 }); return; }
        if (st === FINAL) { /* Ga Ước Mơ: đi liền một mạch, chặng cuối mở vé hoàn thành */
          if (id === 'a82' && !S.chest.s8) { S.chest.s8 = Date.now(); save(true); finaleOv(); return; }
          var nf = nextFin(); if (first && nf) { openAct(nf); return; }
          go({ v: 'st', st: st.id }); return;
        }
        if (newChest) { S.chest[st.id] = Date.now(); save(true); chestOv(st, stageBefore); }
        else go({ v: 'st', st: st.id });
      });
  }
  function chestOv(st, stageBefore, again) { /* hộp hoàn thành ga: con dấu ga lớn + biển tên ga (đồng bộ tab Bản Career Design) */
    var stg = shinStage(), grew = !again && stg > stageBefore;
    var h = '<div class="ekipop"><div class="ekipop__st' + (again ? '' : ' thump') + '">' + ekiStamp(st, S.chest[st.id], 118) + '</div>' +
      '<span class="ekipop__chip">' + (again ? 'Con dấu ga' : (st === START ? 'Con dấu đầu tiên' : 'Con dấu ga mới')) + ' · ' + stampCount() + '/8</span>' +
      '<h2>' + (st === START ? 'Vé đã in!' : 'Hoàn thành ' + esc(st.vn) + '!') + '</h2>' +
      (st.done ? '<p class="ekipop__sub">' + esc(st.done) + '</p>' : '') +
      (grew ? '<div class="evolve evolve--sm">' + shin('cheer', 48, stageBefore) + '<span class="arrow">' + PS.icon('next', 18) + '</span>' + shin('party', 66, stg, 'hop') + '<b>' + (stageBefore === 0 ? 'Shin đã nở rồi!' : 'Shin đã lớn thêm!') + '</b></div>' : '') +
      cdCard(st.card, !again, { pop: 1 }) +
      (st.report ? '<button type="button" class="btn btn--w" data-act="report" style="margin-bottom:10px">' + esc(TXT.reportT) + '</button>' : '') +
      '<button type="button" class="btn ' + (st.report ? 'btn--soft' : 'btn--go') + ' btn--w" data-act="ovNext">' + (again ? 'Đóng' : 'Về sơ đồ tuyến') + '</button></div>';
    if (!again) sound('badge');
    ov(h, function () { if (!again) go({ v: 'home' }); });
  }
  /* ---------- báo cáo tiến độ (sau Ga 3) ---------- */
  function reportMsg() {
    var p = prof(), t = S.demo ? { pron: 'cô' } : (PS.teacher() || { pron: 'thầy cô' }), R = riaRes();
    return 'Em chào ' + t.pron + ' ạ. Em là ' + (p.name || '') + ', lớp ' + (p.cls || '') + '. Em đã xong 3 ga đầu Career Design 01.\n' +
      '1. Mục tiêu: ' + (g('x1.goal') || '') + '\n' +
      '2. ' + (g('a13.me') || '') + '\n' +
      '3. Thích: ' + ga('a21.sel').join(', ') + '. Giỏi: ' + ga('a22.sel').join(', ') + '. Coi trọng: ' + ga('a23.rank').join(', ') + '.\n' +
      '4. RIASEC: ' + (R.full ? R.code.join('-') : '') + '. Nghề chính: ' + indName(g('a33.main'), 'a33.main') + '. Phương án 2: ' + indName(g('a33.b'), 'a33.b') + '.\n' +
      'Em cảm ơn ' + t.pron + ' ạ.';
  }
  function reportOv(after) {
    var t = S.demo ? null : PS.teacher(), msg = reportMsg();
    var h = '<h2>' + esc(TXT.reportT) + '</h2><p>' + esc(TXT.reportSub) + '</p>';
    if (S.demo) h += '<p class="ps-small">Bản demo: không gửi thật.</p>';
    else if (!t) h += '<div class="ps-form" style="text-align:left"><label>Thầy cô hướng dẫn' + PS.teacherSelect('id="repT"') + '</label></div>';
    else h += '<p>Gửi tới <b>' + esc(t.name) + '</b> qua Teams.</p>';
    h += '<textarea class="ta repmsg" id="repMsg" rows="7" readonly>' + esc(msg) + '</textarea>' +
      '<div class="repbtns"><button type="button" class="btn btn--soft" data-act="repCopy">Chép tin nhắn</button>' +
      (t ? '<a class="btn" data-act="repTeams" target="_blank" rel="noopener" href="https://teams.microsoft.com/l/chat/0/0?users=' + encodeURIComponent(t.email) + '&message=' + encodeURIComponent(msg) + '">Mở Teams</a>' : '') + '</div>' +
      '<button type="button" class="link" data-act="ovNext">Để sau</button>';
    ov(h, after || null);
    var sel = D.getElementById('repT');
    if (sel) sel.addEventListener('change', function () { if (sel.value) { PS.setProfile({ teacher: sel.value }); reportOv(after); } });
  }
  function copyMsg() {
    var ta = D.getElementById('repMsg'); if (!ta) return;
    var rk = ta.getAttribute('data-rk') || 'rep.mid';
    var ok = function () { S.d[rk] = rk === 'rep.mid' ? (S.d[rk] || Date.now()) : Date.now(); save(true); PS.toast('Đã chép. Dán vào Teams hoặc Zalo gửi thầy cô nhé.'); if (rk !== 'rep.mid' && V.v === 'act') { var yr = W.pageYOffset; redrawStep(); W.scrollTo(0, yr); } };
    try { if (W.navigator.clipboard && W.isSecureContext) { W.navigator.clipboard.writeText(ta.value).then(ok, function () { ta.removeAttribute('readonly'); ta.select(); D.execCommand('copy'); ok(); }); return; } } catch (e) {}
    try { ta.removeAttribute('readonly'); ta.select(); D.execCommand('copy'); ta.setAttribute('readonly', ''); ok(); } catch (e2) { PS.toast('Chưa chép được. Bạn giữ ngón tay lên tin nhắn để chép nhé.'); }
  }
  var OVCB = null;
  function ov(html, cb) {
    closeOv(); OVCB = cb || null;
    var el = D.createElement('div'); el.className = 'ov'; el.id = 'cdov'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = '<div class="ov__box">' + html + '</div>'; D.body.appendChild(el); D.body.classList.add('ps-lock');
    var b = el.querySelector('.btn'); if (b) setTimeout(function () { try { b.focus({ preventScroll: true }); } catch (e) {} var bx = el.querySelector('.ov__box'); if (bx) bx.scrollTop = 0; }, 60); /* hộp dài: luôn mở từ đầu (thấy con dấu) */
  }
  function closeOv(run) { var el = D.getElementById('cdov'); if (el) el.parentNode.removeChild(el); if (!nbOpen) D.body.classList.remove('ps-lock'); var cb = OVCB; OVCB = null; if (run && cb) cb(); }

  /* ---------- Thẻ Từ khóa của ga (nội dung bản CD49) ---------- */
  /* màu chủ đạo đọc từ CSS (để Lưu ảnh dùng đúng màu đang chọn) */
  function CV(n) { try { var v = W.getComputedStyle(D.documentElement).getPropertyValue(n).replace(/^\s+|\s+$/g, ''); if (v) return v; } catch (e) {} return { '--c': '#2C5BC4', '--c-d': '#2149A6', '--c-l': '#4472D6' }[n] || '#2C5BC4'; }
  function sayBtn(t, lab, sm) { return '<button type="button" class="kw__say' + (sm ? ' sm' : '') + '" data-act="speak" data-t="' + esc(t) + '" aria-label="' + esc(lab) + '">' + PS.icon('sound', sm ? 15 : 20) + '</button>'; }
  function kwCard(n) {
    var k = KW[n]; if (!k) return;
    sound('tap');
    ov('<div class="kw"><small class="kw__tag">Từ khóa của ' + (n === 8 ? 'Ga Ước Mơ' : 'ga ' + (n < 10 ? '0' : '') + n) + '</small>' +
      '<div class="kw__w"><span class="jp" lang="ja">' + esc(k.w) + '</span>' + sayBtn(k.r, 'Nghe phát âm') + '</div>' +
      '<p class="kw__r"><span class="jp" lang="ja">' + esc(k.r) + '</span> · ' + esc(k.ro) + '</p><p class="kw__m">' + esc(k.m) + '</p>' +
      '<div class="kw__sym"><svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">' + k.sym.svg + '</svg><div><small>Biểu tượng của ga</small><b>' + esc(k.sym.t) + '</b><p>' + esc(k.sym.d) + '</p></div></div>' +
      '<div class="kw__ex"><p class="jp" lang="ja">' + esc(k.ex[0]) + ' ' + sayBtn(k.ex[0], 'Nghe câu ví dụ', 1) + '</p><p class="kw__ro">' + esc(k.ex[1]) + '</p><p>' + esc(k.ex[2]) + '</p></div>' +
      '<div class="kw__ins"><small>Bài học Oden</small><ul>' + k.oden.map(function (x) { return '<li><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></li>'; }).join('') + '</ul></div>' +
      '<div class="kw__act"><small>Hành động ngay</small><p><b>' + esc(k.act[0]) + '</b></p><p class="jp" lang="ja">' + esc(k.act[1]) + ' ' + sayBtn(k.act[1], 'Nghe', 1) + '</p><p class="kw__ro">' + esc(k.act[2]) + ' · ' + esc(k.act[3]) + '</p></div>' +
      '<div class="kw__hk"><small>Shin gửi bạn</small><p class="jp" lang="ja">' + k.hk.map(esc).join('<br>') + ' ' + sayBtn(k.hk.join('、'), 'Nghe bài haiku', 1) + '</p><p class="kw__ro">' + esc(k.hro) + '</p><p class="kw__vn">' + esc(k.hvn).replace(/ \/ /g, '<br>') + '</p></div>' +
      '<p class="kw__ok"><button type="button" class="btn" data-act="ovClose">Đã hiểu</button></p></div>');
    var box = D.querySelector('#cdov .ov__box'); if (box) { box.className += ' ov__box--kw'; box.scrollTop = 0; setTimeout(function () { box.scrollTop = 0; }, 120); }
  }

  /* ---------- Màn hình tàu vào ga (lần đầu vào mỗi ga, như CD49; tàu là tàu trên Vé hành trình) ---------- */
  function arrTrain() { /* tàu của Vé hành trình, vẽ chi tiết: thân bo liền, mũi thuôn, kính phản sáng, sọc vàng, bánh xoay */
    var w = [40, 62, 138, 160].map(function (x) {
      return '<g class="wh"><circle cx="' + x + '" cy="72" r="7.2" fill="#FFC93C" stroke="#E2A41E" stroke-width="1.4"/><path d="M' + (x - 4.6) + ' 72h9.2M' + x + ' 67.4v9.2" stroke="#E2A41E" stroke-width="1.3" stroke-linecap="round"/><circle cx="' + x + '" cy="72" r="2.2" fill="#fff"/></g>';
    }).join('');
    var win = [24, 54, 84].map(function (x) {
      return '<rect x="' + x + '" y="25" width="23" height="13" rx="4.5" style="fill:var(--c)"/><path d="M' + (x + 4) + ' 36.5l6-10h4.5l-6 10z" fill="#fff" opacity=".28"/>';
    }).join('');
    return '<svg class="arr__tr" viewBox="0 0 200 84" aria-hidden="true"><defs>' +
      '<linearGradient id="arrB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".75" stop-color="#F1F4FA"/><stop offset="1" stop-color="#E1E7F2"/></linearGradient>' +
      '<radialGradient id="arrL"><stop offset="0" stop-color="#FFF3B8" stop-opacity=".9"/><stop offset="1" stop-color="#FFF3B8" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="arrC"><path d="M26 16H148C171 16 187 30 193 50C195 57 191 62 184 62H26C15 62 8 55 8 44V34C8 24 16 16 26 16Z"/></clipPath></defs>' +
      '<path d="M66 15.5h12" stroke="#B9C3D8" stroke-width="3" stroke-linecap="round"/><path d="M64 15l8-8 8 8M68 7h8" fill="none" stroke="#8D97B0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M18 62H186C186 66 183 68.5 179 68.5H25C21 68.5 18 66 18 62Z" fill="#2B3553"/>' +
      '<rect x="31" y="64.5" width="40" height="5" rx="2.5" fill="#3A4466"/><rect x="129" y="64.5" width="40" height="5" rx="2.5" fill="#3A4466"/>' + w +
      '<path d="M26 16H148C171 16 187 30 193 50C195 57 191 62 184 62H26C15 62 8 55 8 44V34C8 24 16 16 26 16Z" fill="url(#arrB)" stroke="#C9D2E4" stroke-width="1"/>' +
      '<g clip-path="url(#arrC)"><rect x="0" y="45" width="200" height="6.5" fill="#FFC93C"/><rect x="0" y="51.5" width="200" height="2.6" style="fill:var(--c)"/></g>' +
      '<path d="M30 19.5H146" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>' + win +
      '<rect x="118" y="22" width="16" height="21" rx="3.5" fill="none" stroke="#C9D2E4" stroke-width="1.1"/><rect x="121.5" y="25" width="9" height="8" rx="2.5" style="fill:var(--c)" opacity=".85"/>' +
      '<path d="M148 25C162 25 174 31 181 41H156C151.5 41 148 38.5 148 35Z" style="fill:var(--c-d)"/><path d="M155 39l7-12h4l-7 12z" fill="#fff" opacity=".25"/>' +
      '<circle cx="187" cy="53.5" r="9" fill="url(#arrL)"/><ellipse cx="187" cy="53.5" rx="3.2" ry="2.2" fill="#FFF6CF"/>' +
      '<ellipse cx="11.5" cy="50" rx="1.6" ry="2.2" fill="#F06A5A"/></svg>';
  }
  function arrRail() {
    return '<svg class="arr__rail" width="100%" height="34" aria-hidden="true"><defs>' +
      '<pattern id="arrS" width="22" height="34" patternUnits="userSpaceOnUse"><rect x="5" y="10.5" width="12" height="4" rx="2" fill="#fff" fill-opacity=".32"/></pattern>' +
      '<pattern id="arrT" width="9" height="34" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="25" r="1.5" fill="#FFC93C" fill-opacity=".85"/></pattern></defs>' +
      '<rect x="0" y="0" width="100%" height="34" fill="url(#arrS)"/><rect x="0" y="19" width="100%" height="15" rx="0" fill="#fff" fill-opacity=".08"/>' +
      '<rect x="0" y="0" width="100%" height="34" fill="url(#arrT)"/><line x1="0" y1="8" x2="100%" y2="8" stroke="#fff" stroke-opacity=".9" stroke-width="3" stroke-linecap="round"/></svg>';
  }
  function arriveOv(st) {
    var n = st.n, a1 = ARRIVE[n] || '';
    closeOv();
    var el = D.createElement('div'); el.className = 'ov ov--arr'; el.id = 'cdov'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Tàu vào ga');
    el.innerHTML = '<div class="arr"><div class="arr__sign"><i class="arr__post arr__post--l"></i><i class="arr__post arr__post--r"></i><div class="arr__board">' +
      '<small>' + (st === FINAL ? 'Ga cuối' : 'Ga ' + (n < 10 ? '0' : '') + n + ' · Ga mới') + '</small><b>' + esc(st.vn) + '</b><span class="jp">' + esc(st.kana) + '</span></div></div>' +
      '<div class="arr__track">' + arrRail() + '<span class="arr__trw"><span class="arr__sp"><i></i><i></i><i></i></span>' + arrTrain() + '</span></div>' +
      '<div class="arr__talk">' + (a1 ? '<div class="arr__m arr__m1">' + shinSays('hi', esc(a1), 50) + '</div>' : '') + '</div>' +
      '<div class="arr__go"><button type="button" class="btn btn--go btn--w" data-act="arrGo">Vào ga thôi!</button></div></div>';
    D.body.appendChild(el); D.body.classList.add('ps-lock');
    sfx(RM ? 'chime' : 'train');
  }
  function openStation(stx) {
    var firstArr = stx !== START && !S.seen['arr.' + stx.id] && !S.done[stx.acts[0]];
    if (firstArr) { S.seen['arr.' + stx.id] = 1; save(); }
    go({ v: 'st', st: stx.id });
    if (firstArr) arriveOv(stx);
  }

  /* âm thanh nhẹ (Web Audio), theo công tắc chung */
  var AC = null;
  function sound(k) {
    if (!PS.soundOn() || S.demo) return;
    try {
      AC = AC || new (W.AudioContext || W.webkitAudioContext)();
      var seq = { stamp: [220, 330, 523], badge: [392, 523, 659, 784], tap: [520], arrive: [784, 659] }[k] || [440], t0 = AC.currentTime;
      seq.forEach(function (f, i) {
        var o = AC.createOscillator(), gn = AC.createGain(); o.type = 'sine'; o.frequency.value = f;
        gn.gain.setValueAtTime(0.0001, t0 + i * 0.09); gn.gain.exponentialRampToValueAtTime(0.16, t0 + i * 0.09 + 0.02); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.09 + 0.28);
        o.connect(gn); gn.connect(AC.destination); o.start(t0 + i * 0.09); o.stop(t0 + i * 0.09 + 0.3);
      });
    } catch (e) {}
  }
  /* ---------- âm thanh tự soạn (Web Audio, không cần tệp): máy in vé, "ting", tàu vào ga ----------
     Theo công tắc chung PS.soundOn(). Bản demo cũng phát để thầy cô nghe thử. */
  function actx() {
    try { AC = AC || new (W.AudioContext || W.webkitAudioContext)(); if (AC.state === 'suspended' && AC.resume) AC.resume(); return AC; } catch (e) { return null; }
  }
  var NOISE = null;
  function noise(c) {
    if (NOISE) return NOISE;
    var n = Math.floor(c.sampleRate * 1.5), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return (NOISE = b);
  }
  function env(c, t, a, peak, dec, vol) { /* gain: lên trong a giây, giữ peak, tắt dần trong dec giây */
    var gn = c.createGain(); gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(vol, t + a);
    gn.gain.setValueAtTime(vol, t + a + peak); gn.gain.exponentialRampToValueAtTime(0.0001, t + a + peak + dec); gn.connect(c.destination); return gn;
  }
  function nz(c, t, dur, vol, type, f, q, a) { /* tiếng xì / tiếng tách bằng tiếng ồn có lọc */
    var src = c.createBufferSource(), fl = c.createBiquadFilter(); src.buffer = noise(c); fl.type = type; fl.frequency.value = f; if (q) fl.Q.value = q;
    src.connect(fl); fl.connect(env(c, t, a || 0.004, 0, Math.max(0.01, dur), vol));
    src.start(t, Math.random() * 0.8); src.stop(t + (a || 0.004) + dur + 0.05); return fl;
  }
  function tone(c, t, f, dur, vol, type, f2) {
    var o = c.createOscillator(); o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    o.connect(env(c, t, 0.006, 0, dur, vol)); o.start(t); o.stop(t + dur + 0.05);
  }
  function bell(c, t, f, dur, vol) { tone(c, t, f, dur, vol); tone(c, t, f * 2.76, dur * 0.45, vol * 0.18); tone(c, t, f * 5.4, dur * 0.2, vol * 0.06); }
  function sfx(k, arg) {
    if (!PS.soundOn()) return;
    var c = actx(); if (!c) return;
    try {
      var t0 = c.currentTime + 0.03, i, t;
      if (k === 'ting') { bell(c, t0, 1568 * (arg || 1), 0.9, 0.11); return; }
      if (k === 'print') { /* máy in vé: mô-tơ rì rì + kim in lách tách + xoẹt xé vé */
        var dur = arg || 1.9, o = c.createOscillator(), lp = c.createBiquadFilter();
        o.type = 'sawtooth'; o.frequency.value = 74; lp.type = 'lowpass'; lp.frequency.value = 380; o.connect(lp); lp.connect(env(c, t0, 0.08, dur - 0.2, 0.15, 0.035)); o.start(t0); o.stop(t0 + dur + 0.1);
        for (t = t0 + 0.05; t < t0 + dur - 0.1; t += 0.042 + Math.random() * 0.012) nz(c, t, 0.018, 0.05 + Math.random() * 0.03, 'bandpass', 2600 + Math.random() * 900, 1.4);
        nz(c, t0 + dur - 0.05, 0.11, 0.09, 'highpass', 1800, 0, 0.02);
        return;
      }
      if (k === 'train' || k === 'chime') {
        var tc = t0;
        if (k === 'train') { /* bánh xe chậm dần (tàu chạy 0,35–1,85 giây), xì phanh, rồi chuông ga */
          var st = t0 + 0.35, gap = 0.1, vol = 0.16, r = c.createBufferSource(), rl = c.createBiquadFilter();
          r.buffer = noise(c); rl.type = 'lowpass'; rl.frequency.value = 220; r.connect(rl); rl.connect(env(c, st, 0.08, 0.6, 1.0, 0.07)); r.start(st); r.stop(st + 1.8);
          for (t = st; t < st + 1.45; t += gap * 2.2) {
            nz(c, t, 0.05, vol, 'lowpass', 900, 0.7); tone(c, t, 115, 0.07, vol * 0.5);
            nz(c, t + gap * 0.55, 0.05, vol * 0.8, 'lowpass', 820, 0.7); tone(c, t + gap * 0.55, 105, 0.07, vol * 0.4);
            gap *= 1.17; vol *= 0.93;
          }
          tone(c, st + 1.05, 2350, 0.5, 0.012, 'sine', 2050);
          nz(c, st + 1.55, 0.95, 0.07, 'highpass', 2600, 0, 0.06);
          nz(c, st + 1.6, 0.6, 0.035, 'bandpass', 5200, 0.8, 0.05);
          tc = st + 2.25;
        }
        var mel = [1047, 1319, 1568, 1319, 1760, 1568]; /* chuông ga tự soạn: Đô Mi Son Mi La Son */
        for (i = 0; i < mel.length; i++) bell(c, tc + i * 0.19, mel[i], i === mel.length - 1 ? 1.1 : 0.55, 0.075);
      }
    } catch (e) {}
  }

  /* ---------- hướng dẫn học lần đầu (kiểu TK): Vé → Bản Career Design → Sơ đồ tuyến → chạm thử Sổ tay ---------- */
  var TOUR = [['#ticket', TXT.tour1], ['.cdmini', TXT.tour2], ['.route .stop', TXT.tour3], ['.psnav__nb', TXT.tour4, 1]], tourI = -1;
  function startTour(force) { if ((S.d.tour || S.demo) && !force) return; if (V.v !== 'home') return; tourI = 0; showTour(); }
  function showTour(again) {
    var old = D.querySelectorAll('.tour-hl'), i;
    for (i = 0; i < old.length; i++) old[i].classList.remove('tour-hl');
    var b = D.getElementById('tourBox'); if (b) b.parentNode.removeChild(b);
    if (tourI < 0 || tourI >= TOUR.length) { endTour(); return; }
    var stp = TOUR[tourI], el = D.querySelector(stp[0]), nav = D.getElementById('psnav');
    if (el) {
      el.classList.add('tour-hl');
      if (stp[2]) { if (nav) { nav.classList.remove('psnav--hide'); nav.style.zIndex = 97; } }
      else if (!again) { try { el.scrollIntoView(RM ? true : { behavior: 'smooth', block: stp[0] === '.route .stop' ? 'start' : 'center' }); } catch (e) { el.scrollIntoView(true); } }
    }
    b = D.createElement('div'); b.id = 'tourBox'; b.className = 'tourbox' + (stp[2] ? ' tourbox--tap' : ''); b.setAttribute('role', 'dialog'); b.setAttribute('aria-live', 'polite');
    b.innerHTML = '<div class="tourbox__c">' + shinNow(stp[2] ? 'surprise' : 'hi', 44) + '<p>' + T(esc(stp[1])) + '</p></div><div class="tourbox__b"><span>' + (tourI + 1) + '/' + TOUR.length + '</span><span>' +
      '<button type="button" class="link" data-act="tourSkip">Bỏ qua</button>' + (stp[2] ? '' : '<button type="button" class="btn btn--sm" data-act="tourNext">Đã hiểu</button>') + '</span></div>';
    D.body.appendChild(b);
  }
  function endTour() {
    var was = tourI >= 0; tourI = -1; var pn = D.getElementById('psnav'); if (pn) pn.style.zIndex = '';
    var old = D.querySelectorAll('.tour-hl'); for (var i = 0; i < old.length; i++) old[i].classList.remove('tour-hl');
    var b = D.getElementById('tourBox'); if (b) b.parentNode.removeChild(b);
    if (was) { S.d.tour = 1; save(); }
  }

  function speak(t) {
    try { if (!W.speechSynthesis) { PS.toast('Máy chưa hỗ trợ đọc tiếng Nhật'); return; } var u = new W.SpeechSynthesisUtterance(t); u.lang = 'ja-JP'; u.rate = 0.85; W.speechSynthesis.cancel(); W.speechSynthesis.speak(u); } catch (e) {}
  }

  /* =========================================================
     7. SỔ TAY: Tổng quan | Bản Career Design | Cài đặt
     ========================================================= */
  function nbOverview() {
    var mins = 0; for (var k in S.days) if (S.days.hasOwnProperty(k)) mins += S.days[k];
    return '<div class="tiles"><div class="tl">' + cdIcon('ticket', 18) + '<b>' + stampCount() + '/8</b><small>Con dấu</small></div><div class="tl x">' + PS.icon('star', 18) + '<b>' + xpTotal() + '</b><small>XP khóa này</small></div>' +
      '<div class="tl i">' + PS.icon('bulb', 18) + '<b>' + insTotal() + '</b><small>Insight</small></div><div class="tl f">' + PS.icon('flame', 18) + '<b>' + (S.demo ? 5 : PS.streak()) + '</b><small>Chuỗi ngày (chung)</small></div></div>' +
      '<div class="goalbox"><small>MỤC TIÊU CỦA BẠN</small><p>' + esc(g('x1.goal') || 'Bạn sẽ viết mục tiêu ở Sân ga Xuất phát.') + '</p></div>' +
      '<p class="ps-small">Đã học khoảng <b>' + Math.round(mins) + ' phút</b> · ' + doneMain() + '/' + CD_TOTAL + ' chặng.' + (S.demo ? '' : ' Tổng XP mọi khóa: <b>' + PS.totals().xp + '</b> (xem ở trang chính).') + '</p>' +
      '<p class="nb-again"><button type="button" class="link" data-act="tourAgain">' + esc(TXT.tourAgain) + '</button><button type="button" class="link" data-act="introAgain">' + esc(TXT.printAgain) + '</button></p>';
  }
  function nbCD() {
    return (finDone() ? '<div class="nbgold">' + goldHTML() + '</div>' : cdRouteHTML()) +
      '<p class="ps-small nbcd__lead">' + (finDone() ? 'Bạn đã về đích. Đây là 8 ô và 8 con dấu ga của bạn.' : 'Mỗi ga điền thêm một ô và đóng một con dấu. Đến <b>Ga Ước Mơ</b>, bạn nhận bản 1 trang để lưu ảnh, gửi thầy cô.') + '</p>' +
      (S.done.a81 ? '<button type="button" class="btn btn--go btn--w btn--sm" data-act="open8" style="margin:2px 0 8px">' + esc(TXT.sheetBtn) + '</button>' : '') + CARDS.map(function (c) { return cdCard(c.n); }).join('');
  }
  function nbSettings() {
    if (S.demo) return '<p class="ps-small">Đang mở bản demo giáo viên. Thông tin và bài làm ở đây là của học viên giả định.</p><button type="button" class="btn btn--soft btn--w" data-act="demoExit">Thoát demo</button>';
    return PS.settingsHTML({ ctx: 'module', mod: ID, ver: CD_VER,
      pace: { status: '1 ga mỗi ngày', body: '<p class="ps-small">Mỗi ga khoảng 10–15 phút. Đi đều mỗi ngày một ga là vừa đẹp. Bài làm tự lưu, bạn có thể dừng giữa chừng.</p>' } });
  }
  function drawNb() {
    var el = D.getElementById('nb'); if (!el) return;
    el.innerHTML = '<div class="nb__in"><div class="nb__top"><h2>Sổ tay</h2><button type="button" class="nb__x" data-act="nbClose" aria-label="Đóng sổ tay">' + PS.icon('close', 20) + '</button></div>' +
      '<div class="tabs" role="tablist">' + [['tq', 'Tổng quan'], ['cd', 'Bản Career Design'], ['set', 'Cài đặt']].map(function (t) { return '<button type="button" role="tab" aria-selected="' + (NBTAB === t[0]) + '" class="' + (NBTAB === t[0] ? 'on' : '') + '" data-act="tab" data-t="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      '<div id="nbBody">' + (NBTAB === 'tq' ? nbOverview() + (S.demo ? '' : PS.savedHTML(ID)) : (NBTAB === 'cd' ? nbCD() : nbSettings())) + '</div></div>';
    if (NBTAB === 'set' && !S.demo) PS.wireSettings(D.getElementById('nbBody'), { ctx: 'module', mod: ID, onChange: function () { } });
  }
  function openNb(tab) {
    if (tourI >= 0 && TOUR[tourI] && TOUR[tourI][2]) { endTour(); setTimeout(function () { PS.toast(esc(TXT.tourDone), 5000); }, 600); }
    NBTAB = tab || NBTAB; if (!nbOpen) { nbOpen = true; var el = D.createElement('div'); el.id = 'nb'; el.className = 'nb'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Sổ tay'); D.body.appendChild(el); D.body.classList.add('ps-lock'); } drawNb(); }
  function closeNb() { var el = D.getElementById('nb'); if (el) el.parentNode.removeChild(el); nbOpen = false; D.body.classList.remove('ps-lock'); QUIET = true; render(false); QUIET = false; }

  /* =========================================================
     8. DEMO GIÁO VIÊN
     ========================================================= */
  function enterDemo() {
    var s = JSON.parse(JSON.stringify(DEMO_DATA)); s = normalize(s);
    s.demo = 1; s.created = Date.now() - 3 * 864e5;
    S = s;
    S.d['a72.dl'] = isoDay(-1);
    for (var id in S.done) if (S.done.hasOwnProperty(id) && ACTS[id]) { S.xp[id] = ACTS[id].warm ? CD_XP_WARM : CD_XP_ACT; S.ins[id] = insForAct(id); }
    ALLST.forEach(function (st) { if (stDone(st)) { S.chest[st.id] = 1; S.seen[st.id] = 1; } });
    NOSAVE = 0; save(true); V = { v: 'home' }; render(true);
    PS.toast('<b>Bản demo giáo viên</b> · học viên giả định đã xong đến Ga Thử Thách. Ga Ước Mơ đang chờ.');
  }
  function exitDemo() { NOSAVE = 1; clearTimeout(saveT); try { PS.set(DEMO_KEY, null); } catch (e) {} W.location.replace(W.location.pathname); }

  /* =========================================================
     9. SỰ KIỆN
     ========================================================= */
  /* ---------- chặng đã xong: Xem và sửa / Làm lại từ đầu (giữ bài cũ đến khi đóng dấu lại) ---------- */
  function actMenu(id) {
    var a = ACTS[id], bk = !!S.bak[id];
    if (!a) return;
    if (bk) { go({ v: 'act', id: id, step: typeof S.d[id + '.st'] === 'number' ? Math.min(S.d[id + '.st'], a.steps.length - 1) : 0 }); return; }
    ov('<h2>' + esc(a.t) + '</h2>' + (id === 'a42' && a42Stale() ? '<p class="ps-small">Bạn đã đổi nghề chính. Làm lại chặng này để viết theo nghề <b>' + esc(jobName()) + '</b>.</p>' : '<p class="ps-small">Bạn đã xong chặng này.</p>') +
      '<div class="sheet"><button type="button" class="sheetbtn" data-act="actView" data-id="' + id + '">' + PS.icon('book', 18) + '<span><b>Xem và sửa</b><small>Giữ bài cũ, sửa từng chỗ</small></span></button>' +
      '<button type="button" class="sheetbtn" data-act="actReset" data-id="' + id + '">' + cdIcon('redo', 18) + '<span><b>Làm lại từ đầu</b><small>Xóa bài chặng này, làm lại</small></span></button></div>' +
      '<button type="button" class="link" data-act="ovClose">Đóng</button>');
  }
  function backupLine() { return S.demo ? '' : '<p class="ps-small">Muốn giữ chắc bản cũ, bạn <button type="button" class="link link--in" data-act="backupNow">tải sao lưu</button> trước nhé.</p>'; }
  function resetAsk(id) {
    ov('<h2>Làm lại từ đầu?</h2><p>Bài cũ của chặng <b>' + esc(ACTS[id].t) + '</b> được giữ tạm. Đóng dấu lại thì bài mới thay bài cũ. Bỏ dở thì vẫn khôi phục được.</p>' + backupLine() +
      '<button type="button" class="btn btn--w" data-act="actResetGo" data-id="' + id + '">Làm lại từ đầu</button><button type="button" class="link" data-act="ovClose">Thôi, giữ bài cũ</button>');
  }
  function actKeys(id) { var out = []; for (var k in S.d) if (S.d.hasOwnProperty(k) && k.indexOf(id + '.') === 0 && k !== id + '.hist') out.push(k); return out; }
  function resetDo(id) {
    var keep = S.bak[id] || {}, fresh = !S.bak[id];
    actKeys(id).forEach(function (k) { if (fresh) keep[k] = S.d[k]; delete S.d[k]; });
    S.bak[id] = keep; save(true); closeOv(); go({ v: 'act', id: id, step: 0 });
  }
  function restoreDo(id) {
    var bk = S.bak[id]; if (!bk) return;
    actKeys(id).forEach(function (k) { delete S.d[k]; });
    for (var k in bk) if (bk.hasOwnProperty(k)) S.d[k] = bk[k];
    delete S.bak[id]; save(true); PS.toast('Đã khôi phục bài cũ.'); render(false);
  }
  /* ---------- đổi nghề chính khi Ga 4 đã viết theo nghề cũ ---------- */
  function sigName(sig) { if (!sig) return ''; if (sig.indexOf('khac:') === 0) return sig.slice(5) || 'Nghề khác'; var x = indOf(sig); return x ? x.n : sig; }
  function mainAsk(v) {
    var f = g('a42.for'); if (!S.done.a42 || !f || v === g('a33.main')) return false;
    if (v === 'khac' ? f.indexOf('khac:') === 0 : v === f) return false;
    var nw = v === 'khac' ? 'nghề khác' : indOf(v).n;
    ov('<h2>Đổi nghề chính?</h2><p>Chặng <b>Nghề của tôi</b> ở Ga 4 đang viết về <b>' + esc(sigName(f)) + '</b>. Đổi sang <b>' + esc(nw) + '</b> thì bạn làm lại chặng đó theo nghề mới.</p>' +
      '<p class="ps-small">Bài cũ được lưu vào lịch sử, không mất.</p>' + backupLine() +
      '<button type="button" class="btn btn--w" data-act="mainChange" data-v="' + esc(v) + '">Đổi sang ' + esc(nw) + '</button><button type="button" class="link" data-act="ovClose">Giữ ' + esc(sigName(f)) + '</button>');
    return true;
  }
  function mainChange(v) {
    var h = ga('a42.hist').slice();
    h.push({ job: sigName(g('a42.for')), guess: ga('a42.guess'), dl: g('a42.dl') || null, wow: g('a42.wow') || '', like: g('a42.like') || '', worry: g('a42.worry') || '', day: g('a42.day') || '', at: Date.now() });
    S.d['a42.hist'] = h; S.d['a33.main'] = v; save(true); closeOv();
    var y = W.pageYOffset; redrawStep(); W.scrollTo(0, y);
    if (v === 'khac') { var oi = D.querySelector('[data-k="a33.maino"]'); if (oi) oi.focus(); }
    PS.toast('Đã đổi nghề chính. Ga 4 sẽ nhắc bạn làm lại chặng Nghề của tôi.');
  }
  function openAct(id) {
    if (!actOpen(id) && !S.done[id]) return;
    var st = S.d[id + '.st'];
    go({ v: 'act', id: id, step: (!S.done[id] && typeof st === 'number' && st < ACTS[id].steps.length) ? st : 0 });
  }
  function toggleArr(k, v, max) {
    var a = ga(k).slice(), i = a.indexOf(v);
    if (i >= 0) a.splice(i, 1); else { if (max && a.length >= max) return; a.push(v); }
    S.d[k] = a;
  }
  D.addEventListener('click', function (e) {
    var b = PS.closest(e.target, '[data-act]'); if (!b || b.disabled) return;
    var a = b.getAttribute('data-act'), k = b.getAttribute('data-k'), v = b.getAttribute('data-v');
    if (a === 'psHome') { save(true); PS.home(); }
    else if (a === 'home') { closeOv(); if (nbOpen) closeNb(); go({ v: 'home' }); }
    else if (a === 'station') { var stx = stById(b.getAttribute('data-st')); if (stx && (stOpen(stx) || stDone(stx))) openStation(stx); }
    else if (a === 'kw') kwCard(+b.getAttribute('data-n'));
    else if (a === 'arrGo') { closeOv(); sound('tap'); }
    else if (a === 'showIntro') { V.showIntro = 1; render(false); }
    else if (a === 'open') openAct(b.getAttribute('data-id'));
    else if (a === 'actMenu') actMenu(b.getAttribute('data-id'));
    else if (a === 'actView') { closeOv(); go({ v: 'act', id: b.getAttribute('data-id'), step: 0 }); }
    else if (a === 'actReset') resetAsk(b.getAttribute('data-id'));
    else if (a === 'actResetGo') resetDo(b.getAttribute('data-id'));
    else if (a === 'actRestore') restoreDo(b.getAttribute('data-id'));
    else if (a === 'ovClose') closeOv();
    else if (a === 'backupNow') { if (!S.demo) PS.backup(); }
    else if (a === 'mainChange') mainChange(v);
    else if (a === 'riaMode') { S.d['a31.n'] = +v; save(); sound('tap'); V.riaI = null; var y7 = W.pageYOffset; redrawStep(); W.scrollTo(0, y7); }
    else if (a === 'riaMore') { S.d['a31.n'] = 60; save(true); V.step = 1; V.riaI = 30; stepState(); render(true); }
    else if (a === 'dlTap') dlTap(+b.getAttribute('data-i'));
    else if (a === 'nearReset') { delete S.d['a42.near']; save(); redrawStep(); }
    else if (a === 'ownMore') { V.ownN = Math.min(3, ownCount() + 1); var y8 = W.pageYOffset; redrawStep(); W.scrollTo(0, y8); var ins2 = D.querySelectorAll('.tlrow--own .inp'); if (ins2.length) ins2[ins2.length - 1].focus(); }
    else if (a === 'introGo') { var rp = !!V.replay; S.intro = 1; save(true); go({ v: 'home' }); setTimeout(function () { if (V.v === 'home' && tourI < 0) startTour(rp); }, RM ? 300 : 1700); }
    else if (a === 'introPrint') introPrint();
    else if (a === 'introAgain') { if (nbOpen) closeNb(); V = { v: 'intro' }; render(true); V.replay = 1; }
    else if (a === 'tourAgain') { if (nbOpen) closeNb(); go({ v: 'home' }); setTimeout(function () { startTour(true); }, 400); }
    else if (a === 'tourNext') { tourI++; showTour(); }
    else if (a === 'tourSkip') endTour();
    else if (a === 'next') { V.step++; S.d[V.id + '.st'] = V.step; V.ownOpen = null; V.riaI = null; V.swI = null; V.ownN = null; V.typing = null; save(); stepState(); render(true); }
    else if (a === 'prev') { if (V.step > 0) { V.step--; V.ownOpen = null; stepState(); render(true); } }
    else if (a === 'finish') finish();
    else if (a === 'showMiss') showMiss();
    else if (a === 'pick') {
      S.d[k] = v; save(); sound('tap');
      var y = W.pageYOffset; redrawStep(); W.scrollTo(0, y);
      var rep = D.querySelector('#stepBody .senpai, #stepBody .shinbox'); if (rep && rep.getBoundingClientRect().bottom > W.innerHeight) rep.scrollIntoView({ behavior: 'smooth', block: 'end' });
      if (v === 'o') { var oi = D.querySelector('[data-k="' + k + 'o"]'); if (oi) oi.focus(); }
    }
    else if (a === 'chip') {
      var stp = ACTS[V.id].steps[V.step]; toggleArr(k, v, stp.max); save();
      var y2 = W.pageYOffset; redrawStep(); W.scrollTo(0, y2);
    }
    else if (a === 'ownOpen') { V.ownOpen = k; var y3 = W.pageYOffset; redrawStep(); W.scrollTo(0, y3); var oi2 = D.getElementById('ownIn'); if (oi2) oi2.focus(); }
    else if (a === 'ownAdd') addOwn(k);
    else if (a === 'tag') {
      var stp2 = ACTS[V.id].steps[V.step], it = ga(stp2.from)[+b.getAttribute('data-i')], tg = g(k) || {};
      tg[it] = v; S.d[k] = tg; save(); var y4 = W.pageYOffset; redrawStep(); W.scrollTo(0, y4);
    }
    else if (a === 'riaAns') {
      var NQ = riaN(), ri = +b.getAttribute('data-i'), arr = ga('a31.rq').slice(); while (arr.length < NQ) arr.push(null);
      arr[ri] = +v; S.d['a31.rq'] = arr; save(); sound('tap');
      var nxI = ri + 1; while (nxI < NQ && (arr[nxI] === 1 || arr[nxI] === 0)) nxI++;
      V.riaI = nxI; redrawStep();
    }
    else if (a === 'cmNext') { var stc = ACTS[V.id].steps[V.step]; S.d[stc.key] = Math.min(stc.fr.length, (+g(stc.key) || 0) + 1); save(); sound('tap'); var yc = W.pageYOffset; redrawStep(); W.scrollTo(0, yc); var lp = D.querySelectorAll('#stepBody .comic__p'); if (lp.length && !RM) lp[lp.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    else if (a === 'chatAsk') chatAsk(+v);
    else if (a === 'gapSet') { var gl = gapList()[+b.getAttribute('data-i')], gm2 = {}, go2 = g('a63.gap') || {}; for (var gx in go2) if (go2.hasOwnProperty(gx)) gm2[gx] = go2[gx]; if (gl) { gm2[gl[0]] = v; S.d['a63.gap'] = gm2; save(); sound('tap'); var yg = W.pageYOffset; redrawStep(); W.scrollTo(0, yg); } }
    else if (a === 'habFill') habFill(v);
    else if (a === 'zSet') { var zt = hardPool()[+b.getAttribute('data-i')], zo = zMap(), zn = {}; for (var zx in zo) if (zo.hasOwnProperty(zx)) zn[zx] = zo[zx]; if (zt) { zn[zt] = v; S.d['a72.z'] = zn; save(); sound('tap'); var yz = W.pageYOffset; redrawStep(); W.scrollTo(0, yz); } }
    else if (a === 'dueSet') { S.d['a72.due'] = v; if (v !== 'd') S.d['a72.dl'] = isoDay(+v); else if (!dlOK(g('a72.dl')) || g('a72.dl') < isoDay(1)) delete S.d['a72.dl']; save(); sound('tap'); var yd = W.pageYOffset; redrawStep(); W.scrollTo(0, yd); }
    else if (a === 'res7') { V.res7 = null; V.res7t = null; resOv(); }
    else if (a === 'res7v') { var rt = D.getElementById('res7t'); V.res7t = rt ? rt.value : null; V.res7 = v; sound('tap'); resOv(); }
    else if (a === 'res7save') resSave();
    else if (a === 'useTip') { S.d[k] = v; S.d[k + '~'] = v; if (k === 'a81.letter' && S.d['a81.seal']) { delete S.d['a81.seal']; V.resealed = 1; } save(); sound('tap'); var yt = W.pageYOffset; redrawStep(); W.scrollTo(0, yt); var ta = D.querySelector('[data-k="' + k + '"]'); if (ta) ta.classList.add('pulse'); }
    else if (a === 'tmGo') tmGo();
    else if (a === 'riaGo') { V.riaI = +b.getAttribute('data-i'); redrawStep(); }
    else if (a === 'swp') swAns(+b.getAttribute('data-i'), v);
    else if (a === 'swGo') { V.swI = +b.getAttribute('data-i'); redrawStep(); }
    else if (a === 'tikOpen') { S.d[k] = Date.now(); save(true); setTimeout(redrawStep, 400); }
    else if (a === 'ind') {
      var stp3 = ACTS[V.id].steps[V.step];
      if (k === 'a33.main' && !stp3.multi && mainAsk(v)) return;
      if (stp3.multi) toggleArr(k, v, stp3.max); else S.d[k] = v;
      save(); var y6 = W.pageYOffset; redrawStep(); W.scrollTo(0, y6);
      if (v === 'khac') { var oi3 = D.querySelector('[data-k="' + k + 'o"]'); if (oi3) oi3.focus(); }
    }
    else if (a === 'report') reportOv(D.getElementById('cdov') ? OVCB : null);
    else if (a === 'repCopy') copyMsg();
    else if (a === 'repTeams') { S.d[k || 'rep.mid'] = Date.now(); save(true); if (k && V.v === 'act') setTimeout(function () { var yr = W.pageYOffset; redrawStep(); W.scrollTo(0, yr); }, 400); }
    else if (a === 'vsplay' || a === 'vsdone' || a === 'vsnext' || a === 'vsgo') {
      var vx2 = vsX(), vs2 = ACTS[V.id].steps[V.step];
      if (a === 'vsplay') { V.vsp = vx2.seg || 0; V.autoplay = 1; }
      else if (a === 'vsdone') { vx2.w[vx2.seg || 0] = 1; sound('tap'); }
      else { vx2.seg = a === 'vsnext' ? Math.min((vx2.seg || 0) + 1, vs2.segs.length - 1) : +b.getAttribute('data-i'); V.vsp = -1; sound('tap'); }
      save(); var y9 = W.pageYOffset; redrawStep(); V.autoplay = 0;
      if (a === 'vsdone') { var q9 = D.getElementById('vsq'); W.scrollTo(0, y9); if (q9) q9.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); }
      else if (a === 'vsplay') W.scrollTo(0, y9);
      else { var c9 = D.getElementById('vcard'); if (c9) c9.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }
    }
    else if (a === 'vplay') { S.d[V.id + '.vid'] = 1; V.autoplay = 1; save(); var y5 = W.pageYOffset; redrawStep(); W.scrollTo(0, y5); V.autoplay = 0; }
    else if (a === 'speak') speak(b.getAttribute('data-t'));
    else if (a === 'ovNext') closeOv(true);
    else if (a === 'ovAct') { var oa = b.getAttribute('data-id'); closeOv(); go({ v: 'st', st: ACTS[oa].st }); openAct(oa); }
    else if (a === 'chest') { var sc = stById(b.getAttribute('data-st')); chestOv(sc, shinStage(), true); }
    else if (a === 'nb') openNb('set'); /* PS1.3.25: nút Sổ tay mở thẻ Cài đặt trước (có nút về trang chính) */
    else if (a === 'nbcd') openNb('cd');
    else if (a === 'nbClose') closeNb();
    else if (a === 'tab') { NBTAB = b.getAttribute('data-t'); drawNb(); }
    else if (a === 'demoExit') exitDemo();
    else if (a === 'gateFix') { var fp = FPOS[k]; if (fp) { closeOv(); go({ v: 'act', id: fp[0], step: fp[1], ret: 'a80' }); var fe = D.querySelector('#stepBody [data-k="' + k + '"]'); if (fe) { fe.scrollIntoView({ block: 'center' }); fe.classList.add('pulse'); } } }
    else if (a === 'gateBack') { var gid = V.id; if (S.done[gid]) S.ins[gid] = Math.max(S.ins[gid] || 0, insForAct(gid)); save(true); go({ v: 'act', id: 'a80', step: 0 }); }
    else if (a === 'open8') open8();
    else if (a === 'finale') finaleOv(true);
    else if (a === 'img8') sheetImg();
    else if (a === 'print8') { S.d['a82.saved'] = S.d['a82.saved'] || Date.now(); save(); setTimeout(function () { try { W.print(); } catch (e) { PS.toast('Máy chưa in được. Bạn dùng Lưu ảnh nhé.'); } }, 60); }
  });
  function chatAsk(i) {
    var arr = ga('a53.ask').slice(); if (arr.indexOf(i) >= 0 || V.typing != null) return;
    arr.push(i); S.d['a53.ask'] = arr; save(); sound('tap');
    V.typing = RM ? null : i; redrawStep(); chatScroll();
    if (!RM) setTimeout(function () { V.typing = null; if (V.v === 'act' && V.id === 'a53') { redrawStep(); chatScroll(); } }, 900);
  }
  function chatScroll() { var c = D.querySelector('#stepBody .chat'); if (!c) return; var last = c.lastChild; if (last && last.scrollIntoView) last.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'nearest' }); }
  function swAns(i, v) {
    var r = {}, o = g('a43.r') || {}; for (var x in o) if (o.hasOwnProperty(x)) r[x] = o[x];
    r[i] = v; S.d['a43.r'] = r; save(); sound('tap');
    var nx = i + 1; while (nx < READY.length && r[nx]) nx++;
    if (nx >= READY.length) { nx = 0; while (nx < READY.length && r[nx]) nx++; }
    V.swI = nx; redrawStep();
  }
  function addOwn(k) {
    var inp = D.getElementById('ownIn'); if (!inp) return;
    var t = String(inp.value || '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    if (t.length < 2) { inp.classList.add('need'); inp.focus(); return; }
    var stp = ACTS[V.id].steps[V.step], arr = ga(k).slice();
    if (arr.indexOf(t) < 0) { if (stp.max && arr.length >= stp.max) { PS.toast('Bạn đã chọn đủ ' + stp.max + ' điều. Bỏ bớt một điều để thêm.'); return; } arr.push(t); }
    S.d[k] = arr; V.ownOpen = null; save(); var y = W.pageYOffset; redrawStep(); W.scrollTo(0, y);
  }
  D.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.keyCode === 13) && e.target && e.target.id === 'ownIn') { e.preventDefault(); addOwn(e.target.getAttribute('data-ownk')); }
    if ((e.key === 'Escape' || e.keyCode === 27) && D.getElementById('cdov')) closeOv(true);
  });
  function tlSet(t) {
    var id = t.getAttribute('data-tl'), k = t.getAttribute('data-tk'), o = g(k) || {}, r = {};
    for (var x in o) if (o.hasOwnProperty(x)) r[x] = o[x];
    if (t.value) r[id] = t.value; else delete r[id];
    var isM = /_m$/.test(id);
    if (!isM && !/^\d+$/.test(t.value || '')) delete r[id + '_m'];
    S.d[k] = r; save();
    if (!isM) { var y9 = W.pageYOffset; redrawStep(); W.scrollTo(0, y9); return; }
    t.className = 'sel' + (t.value ? ' on' : ''); var row = PS.closest(t, '.tlrow'); if (row) { if (t.value) row.classList.add('on'); else row.classList.remove('on'); row.classList.remove('need'); }
    refreshBar();
  }
  D.addEventListener('change', function (e) { var t = e.target; if (t && t.id === 'repT8') { if (t.value) { PS.setProfile({ teacher: t.value }); redrawStep(); } return; } if (t && t.getAttribute && t.getAttribute('data-k') === 'a72.dl') { S.d['a72.dl'] = t.value; save(); var yq = W.pageYOffset; redrawStep(); W.scrollTo(0, yq); } else if (t && t.getAttribute && t.getAttribute('data-tl')) tlSet(t); else if (t && t.getAttribute && t.getAttribute('data-sl')) slSet(t); });
  D.addEventListener('input', function (e) {
    var t = e.target; if (!t || !t.getAttribute) return;
    if (t.getAttribute('data-tl')) { tlSet(t); return; }
    if (t.getAttribute('data-sl')) { slSet(t); return; }
    var k = t.getAttribute('data-k'), c = t.getAttribute('data-calc');
    if (c) { var m = +t.value; S.d[c] = m; var cm = D.getElementById('calcM'), ch = D.getElementById('calcH'); if (cm) cm.textContent = m; if (ch) ch.textContent = Math.round(m * 365 / 60); save(); return; }
    if (!k || V.v !== 'act') return;
    S.d[k] = t.value; t.classList.remove('need');
    if ((k === 'a81.letter' || k === 'a81.motto') && S.d['a81.seal']) { delete S.d['a81.seal']; V.resealed = 1; }
    save();
    if (/^a63\.h[12]/.test(k)) { var fm = D.getElementById('fm' + k.charAt(5)); if (fm) fm.innerHTML = formulaHTML(+k.charAt(5)); }
    if (k === 'a63.iv') { var ie = D.getElementById('ivEst'); if (ie) ie.innerHTML = ivEst(); }

    var ins = D.querySelector('[data-ins="' + k + '"]');
    if (ins) { var tmp = D.createElement('div'); tmp.innerHTML = insHTML({ key: k }); ins.parentNode.replaceChild(tmp.firstChild, ins); }
    refreshBar();
    if (/^a33\.l\d$/.test(k)) vsNextSync();
  });
  D.addEventListener('focusin', function (e) {
    var t = e.target; if (!t || t.tagName !== 'TEXTAREA') return;
    setTimeout(function () { try { var n = t.value.length; t.setSelectionRange(n, n); } catch (er) {} }, 0);
  });

  /* thanh trên ẩn khi cuộn xuống, hiện khi cuộn lên: làm chung ở core.js (PS1.3.55) */

  /* =========================================================
     10. KHỞI ĐỘNG
     ========================================================= */
  try { W.localStorage.removeItem('ps.mod.' + ID + '.pat'); } catch (e) {} /* bỏ chế độ xem thử hoa văn (PS1.3.14) */
  var GO = PS.goParam();
  NAV.start(W.location.pathname); /* PS1.3.55: bỏ ?demo, ?go khỏi địa chỉ; đếm mục lịch sử cho nút ‹ */
  if (ASK_DEMO) PS.demoAsk(function (ok) { if (ok) { NOSAVE = 0; enterDemo(); } else W.location.replace(W.location.pathname); });
  else if (WANT_DEMO) enterDemo();
  else {
    markDay();
    if (!S.intro && !S.demo) { V = { v: 'intro' }; render(true); PS.toast(TXT.gateToast); }
    else { var gv = goView(GO); if (gv) { NAV.go(gv); V = gv; } render(true); if (!S.d.tour && !S.demo) setTimeout(function () { if (V.v === 'home' && tourI < 0 && !nbOpen && !D.getElementById('cdov')) startTour(); }, RM ? 300 : 1700); }
    save(true);
  }
})(window, document);
