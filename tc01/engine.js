/* =========================================================
   TC01 · Huấn luyện thể chất · tc01/engine.js
   Trạng thái, gắn lõi Proskills, điều hướng, các dạng hoạt động, Sổ tay, demo.
   Chữ nằm ở content.js, hình ở art.js. ES5: var, function, nối chuỗi.
   Màn hình: join (làm thẻ hội viên) · home (phòng tập) · khu · bai · act.
   Khu đang mở: Sàn tập (BAI), Bếp dinh dưỡng (BAI_BEP), Góc nghề (BAI_NGHE), Phòng y tế (BAI_YTE, từ TC01.1.1; đủ 6 bài từ TC01.1.2), Phòng test (BAI_TEST, từ TC01.1.3; đủ 6 bài từ TC01.1.4), Radio Taiso Deck (BAI_RT, TC01.1.5) + Buổi tập 10 phút (màn 's10', S.s10). Dữ liệu Bếp của học viên ở S.food (meal, calc, commit).
   ========================================================= */
(function (W, D) {
  'use strict';
  var PS = W.PS, ID = 'tc01', MOD = PS.mod(ID) || { code: 'TC01', title: 'Huấn luyện thể chất', ver: TC_VER }, esc = PS.esc;
  var DQ = PS.demoParam(), DEMO_KEY = 'ps.demo.' + ID, IS_DEMO = false;
  if (!DQ.on && !PS.guard(ID)) return;
  var RM = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var APP = D.getElementById('app');

  /* ---------- tiện ích ---------- */
  function $(s, r) { return (r || D).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }
  function ic(k, sz, sw) { return TC_ICONS[k] ? tcIcon(k, sz, sw) : PS.icon(k, sz, sw); }
  function today() { return PS.today ? PS.today() : new Date().toISOString().slice(0, 10); }
  function dmy(t) { var d = new Date(t || Date.now()); return (d.getDate() < 10 ? '0' : '') + d.getDate() + '/' + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '/' + d.getFullYear(); }
  function words(s) { s = String(s || '').replace(/^\s+|\s+$/g, ''); if (!s) return 0; var cj = s.match(/[\u3040-\u30ff\u4e00-\u9fff]/g); return s.split(/\s+/).length + (cj ? Math.floor(cj.length / 3) : 0); }
  function given() { return PS.given(); }
  function fill(s) { return String(s).replace(/\[Tên\]/g, esc(given())); }
  function seedShuffle(arr, seed) { var a = arr.slice(), x = 0, i; for (i = 0; i < seed.length; i++) x = (x * 31 + seed.charCodeAt(i)) % 9973; for (i = a.length - 1; i > 0; i--) { x = (x * 7 + 13) % 9973; var j = x % (i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fmtT(s) { s = Math.max(0, Math.round(s)); var m = Math.floor(s / 60), r = s % 60; return m ? m + ' phút ' + (r ? r + ' giây' : '') : r + ' giây'; }
  function fmtClock(ms) { var s = Math.floor(ms / 1000), m = Math.floor(s / 60); s = s % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }

  /* ---------- trạng thái ---------- */
  function blank() { return { v: 1, created: Date.now(), done: {}, xp: {}, ins: {}, days: {}, mem: null, log: {}, refl: {}, plan: null, d: {}, food: {}, nghe: {}, yte: {}, kc: {}, test: {}, ft: { h: [] }, radio: {}, s10: { h: [] } }; }
  function demoState() {
    var s = blank(), m = DEMO.mem; s.demo = 1; s.mem = { job: m.job, g: m.g, sex: m.sex, inj: m.inj, goal: m.goal, h: m.h, w: m.w, at: Date.now() - 20 * 864e5 };
    DEMO.done.concat(DEMO.bepDone || []).forEach(function (id, i) { var a = actById(id); s.done[id] = Date.now() - (12 - i) * 864e5; s.xp[id] = a ? a.xp : 10; });
    var F = DEMO.food || {}, cs = F.calc, cm = F.commit;
    if (F.meal) s.food.meal = { sang: F.meal.sang.slice(), trua: F.meal.trua.slice(), toi: F.meal.toi.slice(), skip: {}, d: today() };
    if (cs) { var cr = calcRes(cs); s.food.calc = { h: cs.h, w: cs.w, age: cs.age, sex: cs.sex, lv: cs.lv, bmi: cr.bmi, bmr: cr.bmr, tdee: cr.tdee, water: cr.water, at: Date.now() - 3 * 864e5 }; }
    if (F.shift) s.food.shift = { s: F.shift.s, l: F.shift.l, pre: F.shift.pre, at: Date.now() - 864e5 };
    if (DEMO.nghe) s.nghe = JSON.parse(JSON.stringify(DEMO.nghe));
    if (DEMO.yte) s.yte = JSON.parse(JSON.stringify(DEMO.yte));
    if (DEMO.test) s.test = JSON.parse(JSON.stringify(DEMO.test));
    if (DEMO.radio) { var DR = DEMO.radio; s.radio = { beat: DR.beat, fl: JSON.parse(JSON.stringify(DR.fl)), self: { c: DR.self.c.slice(), need: DR.self.need.slice(), at: Date.now() - 864e5 } };
      var s7t = new Date(); s7t.setHours(8, 0, 0, 0); s7t = new Date(s7t.getTime() - DR.s7.ago * 864e5); s.radio.s7 = { slot: DR.s7.slot, txt: DR.s7.txt, at: s7t.getTime(), days: {} }; DR.s7.done.forEach(function (d) { s.radio.s7.days[dayKeyFrom(s7t, d)] = 1; }); }
    if (DEMO.s10) s.s10 = { h: DEMO.s10.map(function (e) { return { d: Date.now() - e.ago * 864e5, m: e.m, sec: e.sec, f: e.f, full: e.sec >= 600 ? 1 : 0 }; }) };
    if (DEMO.ft) s.ft = { h: DEMO.ft.map(function (e) { return { d: Date.now() - e.ago * 864e5, a: e.a, lv: e.lv, r: e.r, f: e.f }; }) };
    if (cm) { var st = new Date(); st.setHours(8, 0, 0, 0); st = new Date(st.getTime() - cm.ago * 864e5); s.food.commit = { h: cm.h, txt: cm.txt, at: st.getTime(), days: {} }; cm.done.forEach(function (d) { s.food.commit.days[dayKeyFrom(st, d)] = 1; }); }
    for (var k in DEMO.log) if (DEMO.log.hasOwnProperty(k)) s.log[k] = DEMO.log[k].map(function (e, i) { return { d: Date.now() - (5 - i) * 864e5, n: e.n, f: e.f }; });
    for (var r in DEMO.refl) if (DEMO.refl.hasOwnProperty(r)) { s.refl[r] = DEMO.refl[r]; s.ins[r] = 1; }
    return s;
  }
  var S;
  function rawGet(k) { try { return JSON.parse(W.localStorage.getItem(k)); } catch (e) { return null; } }
  function rawSet(k, v) { try { W.localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function loadState() {
    if (IS_DEMO) { S = rawGet(DEMO_KEY) || demoState(); S.demo = 1; return; }
    S = PS.load(ID) || blank();
    if (!S.done) S = blank();
    if (!S.food) S.food = {};
    if (!S.nghe) S.nghe = {};
    if (!S.yte) S.yte = {};
    if (!S.kc) S.kc = {};
    if (!S.test) S.test = {};
    if (!S.ft) S.ft = { h: [] };
    if (!S.radio) S.radio = {};
    if (!S.s10 || !S.s10.h) S.s10 = { h: [] };
  }
  function xpTotal() { var t = 0; for (var k in S.xp) if (S.xp.hasOwnProperty(k)) t += S.xp[k]; return t; }
  function insTotal() { var t = 0; for (var k in S.ins) if (S.ins.hasOwnProperty(k)) t += S.ins[k]; return t; }
  function doneCount() { var n = 0; ALLACTS.forEach(function (a) { if (S.done[a.id]) n++; }); return n; }
  function tryCount() { var n = 0; for (var k in S.log) if (S.log.hasOwnProperty(k)) S.log[k].forEach(function (e) { if (!e.t) n++; }); return n; }
  var saveT = null;
  /* PS1.3.55 (ý 24): hoạt động kế tiếp cho nút Học tiếp ở trang chủ = hoạt động chưa làm đầu tiên của "Gợi ý hôm nay" */
  function nextInfo() {
    if (!S.mem) return null;
    var b = nextBai(), a = null; if (!b) return null;
    b.acts.forEach(function (x) { if (!a && !S.done[x.id]) a = x; });
    return a ? { t: khuById(b.khu).t + ' · ' + b.t, go: a.id } : null;
  }
  function save(now) {
    clearTimeout(saveT);
    var w = function () {
      if (W.PS_NOSAVE) return;
      if (IS_DEMO) { rawSet(DEMO_KEY, S); return; }
      PS.save(ID, S);
      PS.report(ID, { xp: xpTotal(), ins: insTotal(), done: doneCount(), total: ALLACTS.length, days: S.days, ver: TC_VER,
        extra: { next: nextInfo(), job: S.mem ? S.mem.job : '', group: S.mem ? S.mem.g : '', goal: S.mem ? S.mem.goal : '', tries: tryCount(), plan: S.plan || null, food: foodSum(), nghe: ngheSum(), yte: yteSum(), test: testSum(), radio: radioSum(), s10: s10Sum() } });
    };
    if (now) w(); else saveT = setTimeout(w, 250);
  }
  W.addEventListener('ps:change', function (e) { var f = e.detail && e.detail.field; if (f === 'beforeBackup' || f === 'beforeRestore') save(true); if (f === 'profile' || f === 'teacher') render(); });
  W.addEventListener('pagehide', function () { save(true); });
  D.addEventListener('visibilitychange', function () { if (D.visibilityState === 'hidden') { save(true); if (T && T.fl && T.fl.run) { flPause(); render(); } if ((T && T.rf && T.rf.run) || (T && T.rb && T.rb.st === 1) || (QS && QS.run)) { rtPauseAll(); render(); } } });
  var lastAct = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { W.addEventListener(ev, function () { lastAct = Date.now(); }, { passive: true }); });
  setInterval(function () {
    if (!S || IS_DEMO || D.visibilityState !== 'visible' || Date.now() - lastAct > 60000) return;
    var k = today(); S.days[k] = Math.round(((S.days[k] || 0) + 0.25) * 100) / 100; save();
  }, 15000);
  function markDay() { if (IS_DEMO) return; var k = today(); if (!S.days[k]) { S.days[k] = 0.25; save(); } }

  /* ---------- dữ liệu ---------- */
  BAI.forEach(function (b) { b.khu = 'san'; });
  BAI_BEP.forEach(function (b) { b.khu = 'bep'; });
  BAI_NGHE.forEach(function (b) { b.khu = 'nghe'; });
  BAI_YTE.forEach(function (b) { b.khu = 'yte'; });
  BAI_TEST.forEach(function (b) { b.khu = 'test'; });
  BAI_RT.forEach(function (b) { b.khu = 'radio'; });
  var ALLBAI = BAI.concat(BAI_BEP, BAI_NGHE, BAI_YTE, BAI_TEST, BAI_RT), ALLACTS = [], ACT = {}, BAI_BY = {};
  ALLBAI.forEach(function (b) { BAI_BY[b.id] = b; b.acts.forEach(function (a) { a.bai = b.id; ALLACTS.push(a); ACT[a.id] = a; }); });
  function actById(id) { return ACT[id]; }
  function baisOf(k) { return k === 'bep' ? BAI_BEP : (k === 'nghe' ? BAI_NGHE : (k === 'yte' ? BAI_YTE : (k === 'test' ? BAI_TEST : (k === 'radio' ? BAI_RT : BAI)))); }
  function baiDone(b) { if (b.soon || !b.acts.length) return false; for (var i = 0; i < b.acts.length; i++) if (!S.done[b.acts[i].id]) return false; return true; }
  function baiN(b) { var n = 0; b.acts.forEach(function (a) { if (S.done[a.id]) n++; }); return n; }
  function baiCount(k) { var n = 0; baisOf(k || 'san').forEach(function (b) { if (baiDone(b)) n++; }); return n; }
  function curKhu() {
    if (V.v === 'khu') return V.id;
    if (V.v === 'bai') return BAI_BY[V.id] ? BAI_BY[V.id].khu : '';
    if (V.v === 'act') { var a = actById(V.a); return a ? BAI_BY[a.bai].khu : ''; }
    return '';
  }
  function jobOf(s) { for (var i = 0; i < JOBS.length; i++) if (JOBS[i].s === s) return JOBS[i]; return null; }
  function grp() { return S.mem && GROUPS[S.mem.g] ? S.mem.g : ''; }
  function grpName(g) { return GROUPS[g] ? GROUPS[g].n : 'Chưa chọn'; }
  function jobName() { if (!S.mem) return ''; var j = jobOf(S.mem.job); return j ? (j.s === 'khac' ? 'Nghề khác' : j.n) : ''; }
  function cdJob() {
    var sm = PS.summary('cd01'), k = sm && sm.extra ? (sm.extra.jobKey || sm.extra.main || '') : '';
    return jobOf(k) && k !== 'khac' ? k : '';
  }
  function sexKey() { return S.mem && S.mem.sex === 'nu' ? 'nu' : 'nam'; }
  function best(ex) { var l = S.log[ex] || [], b = 0; l.forEach(function (e) { if (e.n > b) b = e.n; }); return b; }
  function nextBai(k) { var L = baisOf(k || 'san'); for (var i = 0; i < L.length; i++) if (!L[i].soon && !baiDone(L[i])) return L[i]; return null; }

  /* ---------- điều hướng ---------- */
  var V = { v: 'home' }, J = null;
  function go(v) { /* PS1.3.55: lõi PS.nav tự quyết thêm hay thay mục lịch sử theo cấp màn hình */
    stopTimer(); NAV.go(v); V = v;
    render(true);
  }
  /* PS1.3.55 (ý 25): nút ‹ và Back Android cùng "về một cấp" */
  function parentOf(v) {
    var a, b;
    if (v.v === 'act' && (a = actById(v.a))) return { v: 'bai', id: a.bai };
    if (v.v === 'bai' && (b = BAI_BY[v.id])) return { v: 'khu', id: b.khu };
    if (v.v === 'khu' || v.v === 's10') return { v: 'home' };
    if (v.v === 'join') return (v.step || 0) > 1 ? { v: 'join', step: v.step - 1 } : (S.mem ? { v: 'home' } : ((v.step || 0) === 1 ? { v: 'join', step: 0 } : null));
    return null;
  }
  function depthOf(v) { return v.v === 'act' ? 3 : (v.v === 'bai' ? 2 : (v.v === 'khu' || v.v === 's10' ? 1 : (v.v === 'join' ? (v.step || 0) : 0))); }
  var NAV = PS.nav({ mod: ID, tag: 'tc', get: function () { return V; }, parent: parentOf, depth: depthOf,
    ser: function (v) { var o = {}; for (var k in v) if (v.hasOwnProperty(k)) o[k] = v[k]; return o; },
    de: function (h) { var v = {}; for (var k in h) if (h.hasOwnProperty(k) && k !== 'tc' && k !== 'd' && k !== 'y' && k !== 'fh') v[k] = h[k]; return v.v ? v : null; },
    show: function (v, y) { stopTimer(); V = v; render(false); W.scrollTo(0, y || 0); },
    intercept: function () { if (nbOpen) { closeNb(); return 1; } return 0; },
    beforeLeave: function () { save(true); } });

  /* ---------- khung chung ---------- */
  function topnav() { /* PS1.3.55 (ý 25): ‹ về một cấp | tên màn | Sổ tay */
    var bk = 'Proskills', t = 'Huấn luyện thể chất', a, b;
    if (V.v === 'khu') { bk = 'Sơ đồ phòng tập'; t = khuById(V.id).t; }
    else if (V.v === 's10') { bk = 'Sơ đồ phòng tập'; t = S10_TXT.btn; }
    else if (V.v === 'bai' && (b = BAI_BY[V.id])) { bk = khuById(b.khu).t; t = b.t; }
    else if (V.v === 'act' && (a = actById(V.a))) { b = BAI_BY[a.bai]; bk = b.t; t = (b.acts.indexOf(a) + 1) + '/' + b.acts.length; }
    return PS.navHTML({ back: bk, title: t });
  }
  function demoStrip() { return IS_DEMO ? '<div class="demo-strip"><span>Bản demo giáo viên · học viên giả định</span><button type="button" data-act="demoExit">Thoát demo</button></div>' : ''; }
  function shinSays(mood, html, sz, cls) { return '<div class="shinbox' + (cls ? ' ' + cls : '') + '">' + shin(mood, sz || 58, 'bob') + '<div class="shinbox__b"><b>HLV Shin</b>' + html + '</div></div>'; }
  function back(label, act, extra) { return '<button type="button" class="backl" data-act="' + act + '"' + (extra || '') + '>' + ic('arrowL', 15, 2.4) + esc(label) + '</button>'; }
  function render(top) {
    if (!S.mem && V.v !== 'join') { V = { v: 'join', step: 0 }; J = J || {}; }
    var h = '';
    if (W.TCYard) TCYard.unmount();
    SHIN_OUTFIT = curKhu() === 'bep' ? 'apron' : (curKhu() === 'nghe' ? 'helmet' : (curKhu() === 'yte' ? 'aid' : ''));
    if (V.v === 'join') h = viewJoin();
    else if (V.v === 'khu') h = viewKhu();
    else if (V.v === 'bai') h = viewBai();
    else if (V.v === 'act') h = viewAct();
    else if (V.v === 's10') h = viewS10();
    else h = viewHome();
    APP.innerHTML = (V.v === 'join' ? '' : topnav()) + '<div class="wrap enter' + (IS_DEMO ? ' wrap--demo' : '') + '">' + h + '</div>' + demoStrip();
    var kids = $$('.wrap.enter > *'); kids.forEach(function (el, i) { el.style.setProperty('--i', Math.min(i, 8)); });
    if (top) W.scrollTo(0, 0);
    afterRender();
    if (V.v === 'home') mountYard();
  }
  function afterRender() {
    if (V.v === 'act') { var a = actById(V.a); if (a && a.k === 'try' && V.step === 1) drawCounter(); if (a && a.k === 'ft' && T.ft) { if (T.ft.st === 1) drawCounter(); if (T.ft.st === 2) ftDrawRest(); } }
  }

  /* =========================================================
     LÀM THẺ HỘI VIÊN (lần đầu)
     ========================================================= */
  function viewJoin() {
    J = J || {}; var st = V.step || 0, h = '';
    var bar = '<div class="stepbar stepbar--join">' + [1, 2, 3, 4].map(function (i) { return '<i class="' + (i < st ? 'on' : (i === st ? 'cur' : '')) + '"></i>'; }).join('') + '</div>';
    if (st === 0) {
      return '<div class="intro intro--gym">' + storefront() + '<span class="kicker">TC01 · Huấn luyện thể chất</span>' +
        shinSays('hi', fill(TXT.joinHi)) + shinSays('encourage', TXT.joinHi2) +
        '<button type="button" class="btn btn--go btn--w" data-act="jEnter">' + ic('card', 18) + 'Vào phòng tập</button>' +
        (S.mem ? '' : '<button type="button" class="link" data-act="psHome">Về trang chính Proskills</button>') + '</div>';
    }
    h = (S.mem ? back('Sơ đồ phòng tập', 'home') : '') + '<div class="reg"><span class="reg__clip" aria-hidden="true"></span><small>SHIN FITNESS CENTER · RECEPTION</small><b>' + (S.mem ? 'Sửa thẻ hội viên' : 'Phiếu đăng ký hội viên') + '</b><span class="reg__st">Bước ' + st + '/4</span>' + bar + '</div>';
    if (st === 1) {
      if (!J.job && J.cd === undefined) { J.cd = cdJob(); if (J.cd) J.job = J.cd; }
      h += '<div class="card"><p class="q">' + esc(TXT.jobQ) + '</p><p class="qsub">' + esc(TXT.jobSub) + '</p>' +
        (J.cd ? '<div class="note note--cd">' + ic('stamp', 16) + '<span>' + TXT.fromCd.replace('[Nghề]', esc(jobOf(J.cd).n)) + '</span></div>' : '') +
        '<div class="jobs">' + JOBS.map(function (j) {
          var g = GROUPS[j.g];
          return '<button type="button" class="job' + (J.job === j.s ? ' on' : '') + '" data-act="jJob" data-s="' + j.s + '"><b>' + esc(j.n) + '</b>' + (g ? '<small>' + ic(g.ic, 13) + esc(g.n) + (j.two ? ' + việc làm thêm' : '') + '</small>' : '<small>Chọn nơi làm ở bước sau</small>') + '</button>';
        }).join('') + '</div>' +
        (J.job && jobOf(J.job).note ? '<p class="qsub" style="margin-top:10px">' + esc(jobOf(J.job).note) + '</p>' : '') + '</div>' +
        '<button type="button" class="btn btn--w" data-act="jNext"' + (J.job ? '' : ' disabled') + '>Tiếp</button>';
      return h;
    }
    if (st === 2) {
      var j = jobOf(J.job), two = j && j.two;
      if (!two && j && j.g) J.g = j.g;
      if (!two && j && j.g) { h += '<div class="card"><p class="q">Nơi làm việc của nghề ' + esc(j.n) + '</p><div class="grps">' + grpBtn('g')(j.g) + '</div><p class="qsub" style="margin:10px 0 0">Không đúng với công việc của bạn? Quay lại chọn “Nghề khác” rồi chọn nơi làm.</p></div>'; }
      else h += '<div class="card">' + (two ? '<p class="q">' + esc(TXT.partQ) + '</p><p class="qsub">Giờ học của bạn thuộc nhóm Văn phòng. Shin thêm nhóm việc làm thêm.</p>' : (j && j.g ? '' : '<p class="q">' + esc(TXT.whereQ) + '</p><p class="qsub">Chọn nơi giống nhất.</p>')) +
        (two ? '<div class="grps">' + ['dv', 'chuyen'].map(grpBtn('g2')).join('') + '<button type="button" class="grp' + (J.g2 === 'none' ? ' on' : '') + '" data-act="jG2" data-g="none"><span class="grp__ic">' + PS.icon('close', 20) + '</span><b>' + esc(TXT.partNo) + '</b></button></div>' :
          (j && j.g ? '' : '<div class="grps">' + GROUP_ORDER.map(grpBtn('g')).join('') + '</div>')) + '</div>';
      if (two) J.g = 'vp';
      var ready = two ? !!J.g2 : !!J.g;
      if (ready) h += grpResult();
      h += '<button type="button" class="btn btn--w" data-act="jNext"' + (ready ? '' : ' disabled') + '>Tiếp</button>';
      return h;
    }
    if (st === 3) {
      h += '<div class="card"><p class="q">' + esc(TXT.sexQ) + '</p><div class="opts opts--2">' +
        [['nam', 'Mốc nam'], ['nu', 'Mốc nữ']].map(function (o) { return '<button type="button" class="opt' + (J.sex === o[0] ? ' on' : '') + '" data-act="jSex" data-v="' + o[0] + '"><span class="dot">' + (J.sex === o[0] ? PS.icon('check', 13, 3) : '') + '</span>' + o[1] + '</button>'; }).join('') + '</div></div>' +
        '<div class="card"><p class="q">' + esc(TXT.injQ) + '</p><div class="opts opts--2">' +
        [[0, 'Không'], [1, 'Có']].map(function (o) { return '<button type="button" class="opt' + (J.inj === o[0] ? ' on' : '') + '" data-act="jInj" data-v="' + o[0] + '"><span class="dot">' + (J.inj === o[0] ? PS.icon('check', 13, 3) : '') + '</span>' + o[1] + '</button>'; }).join('') + '</div>' +
        (J.inj === 1 ? shinSays('encourage', TXT.injYes, 46) : (J.inj === 0 ? shinSays('cheer', TXT.injNo, 46) : '')) +
        '<p class="ps-small" style="margin:8px 0 0">' + esc(TXT.injNote) + '</p></div>' +
        '<button type="button" class="btn btn--w" data-act="jNext"' + (J.sex && J.inj !== undefined ? '' : ' disabled') + '>Tiếp</button>';
      return h;
    }
    if (st === 4) {
      var okGoal = words(J.goal) >= 3;
      h += '<div class="card"><p class="q">' + esc(TXT.goalQ) + '</p><p class="qsub">' + esc(TXT.goalSub) + '</p>' +
        '<textarea class="inp ta" id="jGoal" rows="3" maxlength="160" placeholder="Ví dụ: Chống đẩy được 20 cái liên tục">' + esc(J.goal || '') + '</textarea>' +
        '<div class="chips chips--tips">' + TXT.goalTips.map(function (t, i) { return '<button type="button" class="chip chip--tip" data-act="jTip" data-i="' + i + '">' + esc(t) + '</button>'; }).join('') + '</div></div>' +
        '<details class="card fold"' + (J.h || J.w ? ' open' : '') + '><summary>' + esc(TXT.bodyQ) + '</summary><div class="body2"><label>Chiều cao (cm)<input class="inp" id="jH" inputmode="numeric" maxlength="3" value="' + esc(J.h || '') + '"></label><label>Cân nặng (kg)<input class="inp" id="jW" inputmode="decimal" maxlength="5" value="' + esc(J.w || '') + '"></label></div><div id="jBmi">' + bmiHTML(J.h, J.w) + '</div><p class="ps-small">' + esc(TXT.bodyNote) + '</p></details>' +
        '<button type="button" class="btn btn--go btn--w" data-act="jDone" id="jDoneBtn"' + (okGoal ? '' : ' disabled') + '>' + ic('card', 18) + (S.mem ? 'Lưu thẻ hội viên' : 'Nhận thẻ hội viên') + '</button>';
      return h;
    }
    return h;
  }
  function grpBtn(field) {
    return function (g) { var G = GROUPS[g], on = J[field] === g; return '<button type="button" class="grp' + (on ? ' on' : '') + '" data-act="' + (field === 'g' ? 'jG' : 'jG2') + '" data-g="' + g + '"><span class="grp__ic">' + ic(G.ic, 22) + '</span><b>' + esc(G.n) + '</b><small>' + esc(G.d) + '</small></button>'; };
  }
  function grpResult() {
    var G = GROUPS[J.g], txt = TXT.grpSay.replace('[Nhóm]', esc(G.n) + (J.g2 && GROUPS[J.g2] ? ' + ' + esc(GROUPS[J.g2].n) : ''));
    return shinSays('cheer', txt, 50);
  }
  function bmi(h, w) { h = parseFloat(h); w = parseFloat(String(w).replace(',', '.')); if (!(h >= 120 && h <= 220 && w >= 30 && w <= 200)) return 0; return Math.round(w / ((h / 100) * (h / 100)) * 10) / 10; }
  function bmiHTML(h, w) {
    var b = bmi(h, w); if (!b) return '';
    var lab = b < 18.5 ? 'Gầy' : (b < 23 ? 'Bình thường' : (b < 25 ? 'Thừa cân' : 'Béo phì'));
    return '<div class="bmi"><b>' + b + '</b><span>BMI · ' + lab + '</span></div>';
  }
  function finishJoin() {
    var old = S.mem || {};
    S.mem = { job: J.job, g: J.g, g2: J.g2 && J.g2 !== 'none' ? J.g2 : '', sex: J.sex, inj: J.inj ? 1 : 0, goal: String(J.goal || '').replace(/^\s+|\s+$/g, ''), h: bmi(J.h, J.w) ? +J.h : 0, w: bmi(J.h, J.w) ? +String(J.w).replace(',', '.') : 0, at: old.at || Date.now() };
    markDay(); save(true);
  }

  /* ---------- thẻ hội viên (TC01.0.7): thẻ nhựa phòng gym, mặt trước thông tin, mặt sau thẻ đục lỗ ---------- */
  var TIERS = [[0, 'STARTER'], [6, 'REGULAR'], [18, 'ATHLETE'], [36, 'CHAMPION']];
  var PUNCH = [['san', 'FLOOR'], ['bep', 'KITCHEN'], ['nghe', 'WORK'], ['yte', 'AID'], ['test', 'TEST'], ['radio', 'DECK']];
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function stampTotal() { var n = 0; PUNCH.forEach(function (x) { n += baiCount(x[0]); }); return n; }
  function tier() { var n = stampTotal(), t = TIERS[0][1]; TIERS.forEach(function (x) { if (n >= x[0]) t = x[1]; }); return t; }
  function memNo() {
    var c = ('0000' + String(PS.profile().cls || '').replace(/\D/g, '')).slice(-4), d = new Date((S.mem && S.mem.at) || Date.now());
    return c + ' · ' + pad2(d.getDate()) + pad2(d.getMonth() + 1);
  }
  function punchRow(k, lab, fresh) {
    return '<span class="prow"><span>' + lab + '</span>' + baisOf(k).map(function (b) { return '<i class="' + (baiDone(b) ? 'on' : '') + (fresh === b.id ? ' new' : '') + '" title="' + esc(b.t) + '"></i>'; }).join('') + '</span>';
  }
  var HOOK = '<svg class="hang__hook" viewBox="0 0 150 44" aria-hidden="true"><path d="M30 5h90" stroke="#C9D3CC" stroke-width="4" stroke-linecap="round"/><circle cx="75" cy="6" r="5" fill="#9AA59E"/>' +
    '<path d="M71 8L69 36M79 8L81 36" stroke="#2A714D" stroke-width="5" stroke-linecap="round"/><rect x="67" y="33" width="16" height="12" rx="3" fill="#C9D3CC" stroke="#9AA59E" stroke-width="1.5"/></svg>';
  /* hoa văn nhẹ góc dưới phải: tạ đơn nằm xéo + đĩa tạ */
  var MC_PAT = '<svg width="190" height="150" viewBox="0 0 190 150"><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" transform="rotate(-28 95 75)"><rect x="18" y="52" width="22" height="50" rx="7"/><rect x="40" y="62" width="12" height="30" rx="4"/><path d="M52 77h86"/><rect x="138" y="62" width="12" height="30" rx="4"/><rect x="150" y="52" width="22" height="50" rx="7"/></g><circle cx="150" cy="128" r="30" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="150" cy="128" r="8" fill="none" stroke="currentColor" stroke-width="5"/></svg>';
  var PT_IC = {
    fl: '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z" fill="#E8743B"/></svg>',
    st: '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="#D9A514"/></svg>',
    bu: '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" fill="#7A55D3"/><rect x="8.5" y="18.5" width="7" height="3" rx="1.5" fill="#7A55D3"/></svg>',
    tm: '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13.5" r="8" fill="#348A5F"/><path d="M12 13.5V9.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M10 2.5h4" stroke="#348A5F" stroke-width="2.4" stroke-linecap="round"/></svg>'
  };
  function cardFront() {
    var p = PS.profile(), m = S.mem || {}, t = tier(), nm = p.name || (IS_DEMO ? 'Học viên demo' : given());
    var info = [p.cls, grpName(m.g) + (m.g2 && GROUPS[m.g2] ? ' + ' + GROUPS[m.g2].n : ''), jobName()].filter(function (x) { return x && x !== '—'; }).join(' · ');
    return '<span class="mc__f"><span class="mc__slot"></span><span class="mc__pat" aria-hidden="true">' + MC_PAT + '</span><span class="mc__shine"></span>' +
      '<span class="mc__top"><span class="mc__logo">' + PS.icon('dumbbell', 15, 2.6) + '</span><span class="mc__brand"><b>SHIN FITNESS</b><small>CENTER</small></span>' +
      '<span class="mc__tier"><small>MEMBER</small><span>' + t + '</span></span></span>' +
      '<span class="mc__name"><b>' + esc(nm.toUpperCase()) + '</b><small>' + esc(info) + '</small></span>' +
      '<span class="mc__bot"><span class="mc__no"><small>MEMBER NO.</small><b>' + memNo() + '</b><span>SINCE ' + esc(dmy(m.at)) + '</span></span><span class="mc__code">TC01</span></span></span>';
  }
  function cardBack() {
    var m = S.mem || {};
    return '<span class="mc__b"><span class="mc__mag"></span><span class="mc__bin"><span class="punch"><span class="punch__h">PUNCH CARD</span>' +
      PUNCH.map(function (x) { return punchRow(x[0], x[1]); }).join('') + '</span>' +
      '<span class="mc__side"><small>MỤC TIÊU</small><span class="mc__goal">' + esc(m.goal || 'Chưa viết') + '</span>' +
      '<span class="mc__pts"><span title="Chuỗi ngày">' + PT_IC.fl + (IS_DEMO ? 5 : PS.streak()) + '</span><span title="XP">' + PT_IC.st + xpTotal() + '</span><span title="Insight">' + PT_IC.bu + insTotal() + '</span><span title="Buổi tập 10 phút">' + PT_IC.tm + S.s10.h.length + '</span></span></span></span>' +
      '<span class="mc__sig">' + SHIN_SIG + 'HLV SHIN</span></span>';
  }
  /* big: thẻ trong Sổ tay (không móc); still: thẻ ở cảnh trao thẻ (không lật) */
  function memCard(big, still) {
    var t = tier();
    return '<div class="hang' + (big ? ' hang--big' : '') + '">' + (big || still ? '' : HOOK) +
      '<div class="mcw"><div class="mc' + (t === 'CHAMPION' ? ' mc--gold' : '') + '"' + (still ? '' : ' role="button" tabindex="0" data-act="flipCard" aria-label="Thẻ hội viên, chạm để lật"') + '>' +
      cardFront() + (still ? '' : cardBack()) + '</div></div>' + (still ? '' : '<p class="mc__hint">Chạm thẻ để lật · mặt sau là thẻ đục lỗ</p>') + '</div>';
  }
  function flipCard(el) {
    var w = PS.closest(el, '.mcw'); el.className = el.className.indexOf(' flip') > -1 ? el.className.replace(' flip', '') : el.className + ' flip';
    sfx('flip');
    if (w && !RM) { w.className = 'mcw'; void w.offsetWidth; w.className = 'mcw swing'; }
  }

  /* ---------- cửa phòng tập (lần đầu vào) ---------- */
  function storefront() {
    var bl = '', i, n = 13;
    for (i = 0; i < n; i++) bl += '<i style="left:' + (i / (n - 1) * 100).toFixed(1) + '%;top:-3px"></i><i style="left:' + (i / (n - 1) * 100).toFixed(1) + '%;bottom:-3px"></i>';
    return '<div class="sf"><div class="sign"><span class="sign__bulbs" aria-hidden="true">' + bl + '</span><span class="sign__s">SHIN</span>' +
      '<span class="sign__f">' + PS.icon('dumbbell', 15, 2.4) + 'FITNESS CENTER' + PS.icon('dumbbell', 15, 2.4) + '</span><span class="sign__e">TC01 · OPEN 24/7</span></div>' +
      '<div class="awn" aria-hidden="true"></div><div class="door"><span class="cnt" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span></span>' +
      '<span class="n8" aria-hidden="true">♪</span><span class="n8 n8b" aria-hidden="true">♪</span><span class="door__mat"></span><span class="door__radio"></span>' +
      '<button type="button" class="door__shin" data-act="shinTap" aria-label="HLV Shin đang tập Radio Taiso">' + shin('cheer', 128, 'taiso') + '</button></div></div>';
  }

  /* ---------- quầy lễ tân: Shin trao thẻ ---------- */
  function handover(done) {
    var ov = D.createElement('div'), fin = false;
    ov.className = 'hov' + (RM ? ' hov--rm' : ''); ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Nhận thẻ hội viên');
    ov.innerHTML = '<div class="hov__in"><div class="desk"><span class="desk__logo">SHIN FITNESS CENTER · RECEPTION</span><span class="desk__shin">' + shin('cheer', 108, 'bob') + '</span>' +
      '<span class="desk__top"></span><span class="desk__front"><b>WELCOME</b></span><div class="desk__card">' + memCard(false, true) + '</div></div>' +
      '<div class="hov__say">' + shinSays('party', fill(TXT.cardSay), 48) + '<button type="button" class="btn btn--go btn--w" id="hovGo">' + PS.icon('check', 18, 2.6) + esc(TXT.cardGo) + '</button></div></div>';
    D.body.appendChild(ov); D.body.classList.add('ps-lock');
    function close() { if (fin) return; fin = true; sfx('whistle'); D.body.classList.remove('ps-lock'); if (ov.parentNode) ov.parentNode.removeChild(ov); if (done) done(); }
    $('#hovGo', ov).onclick = close;
    setTimeout(function () { ov.className += ' play'; if (!RM) { sfx('slide'); setTimeout(function () { sfx('ting'); }, 1650); } else sfx('ting'); }, 60);
  }

  /* ---------- âm thanh TC01 (tự soạn bằng WebAudio, theo công tắc chung PS.soundOn) ---------- */
  var AC = null;
  function actx() { var C = W.AudioContext || W.webkitAudioContext; if (!C) return null; if (!AC) AC = new C(); if (AC.state === 'suspended' && AC.resume) AC.resume(); return AC; }
  function tone(c, f, t0, dur, type, vol, f2) {
    var o = c.createOscillator(), g = c.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol || 0.1, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.02); return o;
  }
  function noise(c, t0, dur, vol, f1, f2, q) {
    var len = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0), i;
    for (i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = buf; f.type = 'bandpass'; f.Q.value = q || 1.2;
    f.frequency.setValueAtTime(f1, t0); if (f2) f.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.25); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(t0); s.stop(t0 + dur + 0.02);
  }
  function sfx(k) {
    if (!PS.soundOn()) return;
    try {
      var c = actx(); if (!c) return; var t = c.currentTime + 0.01;
      if (k === 'door') { tone(c, 1318, t, 0.7, 'sine', 0.09); tone(c, 2636, t, 0.25, 'sine', 0.02); tone(c, 988, t + 0.32, 0.9, 'sine', 0.09); tone(c, 1976, t + 0.32, 0.3, 'sine', 0.02); }
      else if (k === 'whistle') { var o = tone(c, 2350, t, 0.32, 'sine', 0.05); var l = c.createOscillator(), lg = c.createGain(); l.frequency.value = 28; lg.gain.value = 90; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + 0.34); noise(c, t, 0.3, 0.02, 2400, 0, 3); }
      else if (k === 'pen') { noise(c, t, 0.05, 0.05, 2600, 0, 2); tone(c, 700, t, 0.06, 'triangle', 0.03); }
      else if (k === 'slide') noise(c, t, 0.45, 0.06, 500, 2400, 0.9);
      else if (k === 'ting') { tone(c, 1568, t, 0.5, 'triangle', 0.07); tone(c, 2093, t + 0.08, 0.6, 'sine', 0.05); }
      else if (k === 'flip') noise(c, t, 0.14, 0.05, 1200, 3200, 1);
      else if (k === 'pop') { tone(c, 420 + Math.random() * 220, t, 0.16, 'sine', 0.07, 900); }
      else if (k === 'toss') { noise(c, t, 0.35, 0.05, 400, 1800, 0.8); tone(c, 520, t + 0.05, 0.2, 'sine', 0.04, 1100); }
      else if (k === 'punch') { tone(c, 170, t, 0.12, 'sine', 0.16, 55); noise(c, t, 0.05, 0.08, 3000, 0, 1.5); noise(c, t + 0.05, 0.06, 0.03, 5000, 0, 2); }
    } catch (e) {}
  }

  /* =========================================================
     TRANG CHỦ: SƠ ĐỒ PHÒNG TẬP
     ========================================================= */
  function viewHome() {
    var hi = TXT.homeHi[new Date().getDate() % TXT.homeHi.length], cand = [];
    ['san', 'radio', 'bep', 'nghe', 'yte', 'test'].forEach(function (k) { var x = nextBai(k); if (x) cand.push(x); });
    var nb = cand.length ? cand[new Date().getDate() % cand.length] : null;
    return shinSays('hi', fill(hi) + (S.mem && S.mem.inj ? '<br><span class="warn-s">' + esc(TXT.injHome) + '</span>' : '')) +
      memCard() +
      (nb ? '<button type="button" class="btn btn--go btn--w glow" data-act="bai" data-id="' + nb.id + '">Gợi ý hôm nay: ' + esc(nb.t) + '</button>' : '<button type="button" class="btn btn--go btn--w" data-act="khu" data-id="san">Ôn lại Sàn tập</button>') +
      s10Btn() +
      '<h2 class="sec-h">Sơ đồ phòng tập</h2><p class="sec-sub">Chọn phòng nào tập trước cũng được</p>' +
      building(nb ? nb.khu : '') + yardHTML() +
      '<p class="foot">Proskills · TC01 Huấn luyện thể chất · ' + esc(TC_VER) + '<br>Bài làm tự lưu trên trình duyệt của máy này</p>';
  }

  /* ---------- tòa nhà Shin Fitness Center (TC01.0.8) ---------- */
  function room(id, wide, today) {
    var lobby = id === 'lobby', k = lobby ? LOBBY : khuById(id), w = TC_ROOM_W[id], ready = !lobby && k.ready, L = ready ? baisOf(id) : [], n = ready ? baiCount(id) : 0;
    var lights = ready ? '<span class="rm__lights" aria-hidden="true">' + L.map(function (b) { return '<i class="' + (baiDone(b) ? 'on' : '') + '"></i>'; }).join('') + '</span>' : '';
    return '<button type="button" class="rm' + (wide ? ' rm--w' : '') + (id === 'radio' ? ' rm--deck' : '') + (!lobby && !ready ? ' rm--soon' : '') + '" ' + (lobby ? 'data-act="lobby"' : 'data-act="khu" data-id="' + id + '"') +
      ' aria-label="' + esc(k.t + (ready ? ', ' + n + ' trên ' + L.length + ' bài' : (lobby ? ', thẻ hội viên' : ', sắp mở'))) + '">' +
      '<svg class="rm__in" viewBox="0 0 ' + w + ' 118" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' + TC_ROOM[id](w) + '</svg>' +
      (ready ? '<span class="rm__dim" style="opacity:' + (0.22 * (1 - n / L.length)).toFixed(2) + '"></span>' + lights : '') +
      (!lobby && !ready ? (id === 'radio' ? '<span class="rm__tape"><b>COMING SOON · COMING SOON · COMING SOON · COMING SOON</b></span>' : '<span class="rm__shut"><b>COMING SOON</b></span>') : '') +
      '<span class="rm__pl"><i' + (k.col ? ' style="background:' + k.col[0] + '"' : '') + '>' + esc(k.no) + '</i><span>' + esc(k.short) + '</span></span>' +
      (today ? '<span class="rm__today">' + shin('hi', 20) + 'Hôm nay</span>' : '') +
      '<span class="rm__vn">' + esc(k.t) + (ready ? '<small>' + n + '/' + L.length + '</small>' : '') + '</span></button>';
  }
  function building(todayKhu) {
    var fl = ['', '3F', '2F', '1F'];
    return '<div class="bld"><div class="bld__sign"><b>SHIN FITNESS</b><small>CENTER</small></div><div class="bld__body">' +
      FLOORS.map(function (f, i) { return '<div class="fl">' + (fl[i] ? '<span class="fl__n" aria-hidden="true">' + fl[i] + '</span>' : '') + f.map(function (id) { return room(id, id === 'san', id === todayKhu); }).join('') + '</div>'; }).join('') +
      '</div><div class="bld__ground"></div></div>';
  }
  function yardHTML() {
    return '<div class="yard" id="yard"><div class="yard__bar"><button type="button" data-y="reset">' + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6"/><path d="M4 4v4h4"/></svg>Xếp lại</button><button type="button" class="go" data-y="toss">Tung lên</button></div>' +
      '<p class="yard__hint">Chạm hoặc vuốt các khối</p><p class="yard__tip" aria-live="polite"></p><span class="yard__floor"></span></div>';
  }
  var MATTER = 0; /* 0 chưa tải, 1 đang tải, 2 xong */
  function mountYard() {
    var el = $('#yard'); if (!el || !W.TCYard) return;
    function go2() { if (!$('#yard') || V.v !== 'home') return; TCYard.mount($('#yard'), { tips: YARD_TIPS, onTap: function (id) { sfx(id === 'toss' ? 'toss' : 'pop'); } }); }
    function load() {
      if (W.Matter) { MATTER = 2; go2(); return; }
      if (MATTER === 1) return; MATTER = 1;
      var sc = D.createElement('script'); sc.src = 'matter-0.19.0.min.js?v=' + TC_VER; sc.onload = function () { MATTER = 2; go2(); }; sc.onerror = function () { MATTER = 0; };
      D.body.appendChild(sc);
    }
    if ('IntersectionObserver' in W) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: '200px' }); io.observe(el); }
    else load();
  }

  /* ---------- khu ---------- */
  function khuById(id) { for (var i = 0; i < KHU.length; i++) if (KHU[i].id === id) return KHU[i]; return KHU[0]; }
  function zoneHead(k, extra) {
    var c = k.col || ['#3E9A6B', '#2A714D'];
    return '<header class="zh"><div class="zh__no" style="background:linear-gradient(160deg,' + c[0] + ',' + c[1] + ')"><small>ROOM</small><b>' + esc(k.no) + '</b><span class="zh__pic">' + ic(k.ic, 24, 2.2) + '</span></div>' +
      '<div class="zh__tx"><span class="zh__lab" style="color:' + c[1] + '">' + esc(k.en) + '</span><h1>' + esc(k.t) + '</h1><p>' + esc(k.sub) + '</p>' + (extra || '<div class="zh__bar"><i style="width:0"></i></div><div class="zh__meta"><b>Sắp mở</b><span>Shin đang chuẩn bị</span></div>') + '</div>' +
      '<span class="zh__sc" style="left:6px;top:6px"></span><span class="zh__sc" style="left:6px;bottom:6px"></span><span class="zh__sc" style="right:6px;bottom:6px"></span>' +
      '<span class="zh__open' + (k.ready ? '' : ' cl') + '" aria-hidden="true"><span>' + (k.ready ? 'OPEN' : 'CLOSED') + '</span></span></header>';
  }
  function viewKhu() {
    var k = khuById(V.id);
    if (!k.ready) return zoneHead(k) + shinSays('think', TXT.khuSoon) + '<button type="button" class="btn btn--soft btn--w" data-act="home">Về sơ đồ phòng tập</button>';
    var L = baisOf(k.id), n = baiCount(k.id);
    return zoneHead(k, '<div class="zh__bar"><i style="width:' + Math.round(n / L.length * 100) + '%;background:' + (k.col ? k.col[0] : '') + '"></i></div><div class="zh__meta"><b>' + n + '/' + L.length + ' bài xong</b><span>Chọn bài nào trước cũng được</span></div>') +
      (k.id === 'bep' ? shinSays('hi', esc(BEP_TXT.khuSay)) + commitCard() : '') +
      (k.id === 'nghe' ? shinSays('hi', esc(NGHE_TXT.khuSay)) : '') +
      (k.id === 'yte' ? shinSays('hi', esc(YTE_TXT.khuSay)) : '') +
      (k.id === 'test' ? shinSays('hi', esc(TEST_TXT.khuSay)) : '') +
      (k.id === 'radio' ? shinSays('hi', esc(RT_TXT.khuSay)) + s7Card() : '') +
      '<div class="bais">' + L.map(function (b) {
        var dn = baiDone(b), nd = baiN(b);
        if (b.soon) return '<button type="button" class="bai bai--soon" data-act="baiSoon"><span class="bai__ic">' + ic(b.ic, 24) + '</span><span class="bai__tx"><b>' + esc(b.t) + '</b><small>' + esc(b.sub) + '</small><span class="bai__meta"><span class="badge badge--soon">Sắp mở</span></span></span></button>';
        return '<button type="button" class="bai' + (dn ? ' bai--done' : '') + '" data-act="bai" data-id="' + b.id + '"><span class="bai__ic">' + ic(b.ic, 24) + '</span><span class="bai__tx"><b>' + esc(b.t) + '</b><small>' + esc(b.sub) + '</small>' +
          '<span class="bai__meta"><span>' + ic('timer', 13) + b.min + ' phút</span><span class="pips">' + b.acts.map(function (a) { return '<i class="' + (S.done[a.id] ? 'on' : '') + '"></i>'; }).join('') + '</span>' + (dn ? '<span class="badge badge--ok">Đã đục lỗ</span>' : (nd ? '<span class="badge">' + nd + '/' + b.acts.length + '</span>' : '')) + '</span></span></button>';
      }).join('') + '</div>';
  }

  /* ---------- bài ---------- */
  function viewBai() {
    var b = BAI_BY[V.id], g = grp(), G = GROUPS[g];
    if (!b || b.soon) { V = { v: 'home' }; return viewHome(); }
    var K = khuById(b.khu);
    return '<header class="bh"><span class="bh__ic">' + ic(b.ic, 30) + '</span><div><span class="ah__lab">' + esc(K.t) + ' · ' + b.min + ' phút</span><h1>' + esc(b.t) + '</h1><p>' + esc(b.sub) + '</p></div></header>' +
      (G && b.gtip[g] ? '<div class="gtip"><span class="gtip__ic">' + ic(G.ic, 20) + '</span><div><small>Với nhóm ' + esc(G.n) + '</small>' + esc(b.gtip[g]) + '</div></div>' : '') +
      (S.mem && S.mem.g2 && b.gtip[S.mem.g2] ? '<div class="gtip"><span class="gtip__ic">' + ic(GROUPS[S.mem.g2].ic, 20) + '</span><div><small>Khi làm thêm · ' + esc(GROUPS[S.mem.g2].n) + '</small>' + esc(b.gtip[S.mem.g2]) + '</div></div>' : '') +
      '<div class="acts">' + b.acts.map(function (a, i) {
        var dn = !!S.done[a.id];
        return '<button type="button" class="act' + (dn ? ' act--done' : '') + '" data-act="act" data-id="' + a.id + '"><span class="act__n">' + (dn ? PS.icon('check', 18, 3) : (i + 1)) + '</span><span><b>' + esc(a.t) + '</b><small>' + esc(a.kl || KIND[a.k]) + ' · ' + a.min + ' phút · +' + a.xp + ' XP</small></span>' + (dn ? '<span class="badge badge--ok">Xong</span>' : '') + '</button>';
      }).join('') + '</div>' +
      (baiDone(b) ? '<div class="stampbox">' + ic('stamp', 20) + '<span>Bài này đã đục lỗ trên thẻ hội viên. ' + (b.khu === 'san' ? 'Tập lại' : 'Làm lại') + ' lúc nào cũng được.</span></div>' : '') +
      rtSug(b);
  }
  /* Gợi ý thẻ Shin Routine của bài (PS1.3.26, RT_BAI trong content.js) */
  function rtSug(b) {
    var r = RT_BAI[b.id];
    if (!r || S.demo || !PS.routineSugHTML) return '';
    return PS.routineSugHTML(r.ids, { from: ID, sub: esc(r.sub) });
  }
  var KIND = { how: 'Xem cách làm', spot: 'Tìm điểm chưa đúng', 'try': 'Tập thử', order: 'Xếp thứ tự', pick: 'Chọn cách đúng', plan: 'Lên lịch',
    plate: 'Xếp đĩa', meal: 'Bữa của bạn', write: 'Viết ra', calc: 'Máy tính', hilo: 'Cao hay thấp', day: 'Tìm việc chưa ổn', commit: 'Cam kết',
    body: 'Bản đồ cơ thể', ladder: 'Tự định vị', story: 'Senpai kể', flow: 'Tập theo Shin', ca: 'Một ca của mình', habit: 'Chọn thói quen', week: 'Lịch tập tuần',
    match: 'Ghép cặp', sim: 'Ca trực', basket: 'Giỏ konbini', label: 'Đọc nhãn', shift: 'Giờ ăn theo ca', bento: 'Xếp hộp cơm', date: 'Đọc hạn dùng', tf: 'Đúng hay sai', quiz: 'Test thử', redo: 'Ôn câu sai', ft: 'Tự test', board: 'Bảng thành tích',
    beat: 'Bắt nhịp', rtq: 'Thẻ nhanh', rflow: 'Tập theo nhịp', rself: 'Tự chấm', sang7: 'Hẹn tập' };

  /* =========================================================
     HOẠT ĐỘNG
     ========================================================= */
  var T = {}; /* trạng thái tạm của hoạt động đang làm */
  function newT(a) {
    var t = { a: a.id, ex: 0, fr: 0, seen: {}, round: 0, found: {}, miss: 0, ord: [], pick: -1, tryEx: a.k === 'try' ? defaultTryEx(a) : null, n: 0, t0: 0, el: 0, run: false, feel: -1, txt: S.refl[a.id] || '',
      plan: S.plan ? JSON.parse(JSON.stringify(S.plan)) : { k: '', days: [], slot: -1, txt: '' }, sel: -1, placed: {}, wrong: '', mtab: 0, meal: null, mres: false, hp: {}, okTap: {}, hab: -1, own: '', c: null,
      ms: -1, mm: {}, mw: -1, mlast: -1, bk: {}, lk: {}, lw: '', lseen: {}, sh: null, bt: {}, bw: null,
      bz: (S.nghe && S.nghe.body) ? S.nghe.body.slice() : [], bres: false, lad: {}, lres: false,
      fl: { i: -1, run: false, rem: -1, end: 0, feel: -1 }, cs: [], cres: false, sch: -1, hb: -1, hown: '', wk: { days: [], slot: -1 }, sm: { i: -1, pick: -1, tried: {}, first: 0, met: 60 },
      rb: { st: 0, n: 0, hits: {}, taps: 0 }, rq: { i: 0, pick: -1, tried: {}, first: 0 }, rf: { st: 0, tp: 1, mi: 0, g: 0, run: false, feel: -1 }, rs: { c: [-1, -1, -1], need: {} }, s7: { slot: -1 } };
    var NG = S.nghe || {};
    if (a.k === 'ca' && NG.ca && NG.ca.g === grp()) { t.cs = NG.ca.sel.slice(); t.cres = true; t.sch = NG.ca.sch; }
    var HB0 = a.hl ? (S.yte || {}).habit : NG.habit;
    if (a.k === 'habit' && HB0) { t.txt = HB0.txt; t.hb = -2; }
    if (a.k === 'week' && NG.week) { t.wk = { days: NG.week.days.slice(), slot: NG.week.slot }; t.txt = NG.week.txt; }
    if (a.k === 'ladder' && S.nghe && S.nghe.lad) { var ol = S.nghe.lad; for (var lk0 in ol) if (ol.hasOwnProperty(lk0)) t.lad[lk0] = ol[lk0]; }
    if (a.k === 'meal') { var m = S.food.meal; t.meal = m ? { sang: m.sang.slice(), trua: m.trua.slice(), toi: m.toi.slice(), skip: JSON.parse(JSON.stringify(m.skip || {})) } : { sang: [], trua: [], toi: [], skip: {} }; }
    if (a.k === 'calc') {
      var c = S.food.calc || {}, mm = S.mem || {}, by = parseInt(PS.profile().by, 10), age = by > 1900 ? new Date().getFullYear() - by : '';
      t.c = { h: c.h || mm.h || '', w: c.w || mm.w || '', age: c.age || age, sex: c.sex || mm.sex || '', lv: c.lv >= 0 ? c.lv : -1 };
    }
    if (a.k === 'shift' && S.food.shift) t.sh = { s: S.food.shift.s, l: S.food.shift.l, pre: S.food.shift.pre };
    if (a.k === 'bento' && S.food.bento) { var ob = S.food.bento; for (var bk in ob) if (ob.hasOwnProperty(bk)) t.bt[bk] = ob[bk]; }
    if (a.k === 'basket' && S.food.konbini) S.food.konbini.sel.forEach(function (i) { t.bk[i] = 1; });
    if (a.k === 'commit' && S.food.commit) { var cm = S.food.commit; t.txt = cm.txt; t.hab = HABITS.length; t.own = cm.h; HABITS.forEach(function (x, i) { if (x.t === cm.h) { t.hab = i; t.own = ''; } }); }
    if (a.k === 'rself' && S.radio.self) { t.rs.c = S.radio.self.c.slice(); S.radio.self.need.forEach(function (m) { t.rs.need[m] = 1; }); }
    if (a.k === 'sang7' && S.radio.s7) { t.s7.slot = S.radio.s7.slot; t.txt = S.radio.s7.txt; }
    if (t.hb === -2) { var HL = habList(a); t.hb = HL.length; t.hown = HB0.h; HL.forEach(function (x, i) { if (x.t === HB0.h) { t.hb = i; t.hown = ''; } }); }
    return t;
  }
  function openAct(id) { var a = actById(id); T = newT(a); go({ v: 'act', a: id, b: a.bai, step: 0 }); }
  function defaultTryEx(a) { var L = exOf(a); if (L.indexOf('kneepush') >= 0 && sexKey() === 'nu') return 'kneepush'; return L[0]; }
  function actHead(a) {
    var b = BAI_BY[a.bai];
    return '<div class="ah"><span class="ah__lab">' + esc(khuById(b.khu).t) + ' · ' + esc(a.kl || KIND[a.k]) + '</span><h1>' + esc(a.t) + '</h1></div>' +
      (S.done[a.id] ? '<div class="redo">' + PS.icon('check', 16, 3) + 'Bạn đã làm xong. Làm lại thoải mái, không mất điểm.</div>' : '');
  }
  function viewAct() {
    var a = actById(V.a); if (!a) { V = { v: 'home' }; return viewHome(); }
    if (T.a !== a.id) T = newT(a);
    var h = actHead(a);
    if (a.k === 'how') h += viewHow(a);
    else if (a.k === 'spot') h += viewSpot(a);
    else if (a.k === 'try') h += viewTry(a);
    else if (a.k === 'order') h += viewOrder(a);
    else if (a.k === 'pick') h += viewPick(a);
    else if (a.k === 'plan') h += viewPlan(a);
    else if (a.k === 'plate') h += viewPlate(a);
    else if (a.k === 'meal') h += viewMeal(a);
    else if (a.k === 'write') h += viewWrite(a);
    else if (a.k === 'calc') h += viewCalc(a);
    else if (a.k === 'hilo') h += viewHilo(a);
    else if (a.k === 'day') h += viewDay(a);
    else if (a.k === 'commit') h += viewCommit(a);
    else if (a.k === 'match') h += viewMatch(a);
    else if (a.k === 'basket') h += viewBasket(a);
    else if (a.k === 'label') h += viewLabel(a);
    else if (a.k === 'shift') h += viewShift(a);
    else if (a.k === 'bento') h += viewBento(a);
    else if (a.k === 'date') h += viewDate(a);
    else if (a.k === 'body') h += viewBody(a);
    else if (a.k === 'ladder') h += viewLadder(a);
    else if (a.k === 'story') h += viewStory(a);
    else if (a.k === 'flow') h += viewFlow(a);
    else if (a.k === 'ca') h += viewCa(a);
    else if (a.k === 'habit') h += viewHabit(a);
    else if (a.k === 'week') h += viewWeek(a);
    else if (a.k === 'sim') h += viewSim(a);
    else if (a.k === 'quiz') h += viewQuiz(a);
    else if (a.k === 'tf') h += viewTf(a);
    else if (a.k === 'redo') h += viewRedo(a);
    else if (a.k === 'ft') h += viewFt(a);
    else if (a.k === 'board') h += viewBoard(a);
    else if (a.k === 'beat') h += viewBeat(a);
    else if (a.k === 'rtq') h += viewRtq(a);
    else if (a.k === 'rflow') h += viewRflow(a);
    else if (a.k === 'rself') h += viewRself(a);
    else if (a.k === 'sang7') h += viewSang7(a);
    return h;
  }

  /* ---------- xem cách làm ---------- */
  function frameFig(fr, w) {
    var m = '';
    if (fr.g) m += figGuide([fr.g[0], fr.g[1]], [fr.g[2], fr.g[3]], 1);
    if (fr.a) m += figArrow(fr.a[0], fr.a[1]);
    if (fr.arc) fr.arc.forEach(function (c) { m += figArc(c[0], c[1], c[2]); });
    if (fr.mk) m = TC_MARK[fr.mk] + m;
    return fig(fr.p, { marks: m, w: w, label: fr.t, under: fr.mu ? TC_MARK[fr.mu] : '' });
  }
  function viewHow(a) {
    var XL = exOf(a), exId = XL[T.ex], E = EX[exId], n = E.frames.length, fr = E.frames[T.fr];
    T.seen[exId + T.fr] = 1;
    var allSeen = true; for (var i = 0; i < n; i++) if (!T.seen[exId + i]) allSeen = false;
    if (allSeen) T.seen[exId] = 1;
    var anyDone = false; XL.forEach(function (x) { if (T.seen[x]) anyDone = true; });
    return (a.exBy ? '<p class="qsub">' + ic(GROUPS[grp() || 'xuong'].ic, 14) + ' ' + esc(grpFill(NGHE2_TXT.n6Intro)) + '</p>' : '') + (XL.length > 1 ? '<div class="extabs" role="tablist">' + XL.map(function (x, i) { return '<button type="button" role="tab" class="extab' + (i === T.ex ? ' on' : '') + '" data-act="howEx" data-i="' + i + '">' + esc(EX[x].s || EX[x].n) + (T.seen[x] ? PS.icon('check', 13, 3) : '') + '</button>'; }).join('') + '</div>' : '') +
      '<div class="card howc"><div class="howc__top"><b>' + esc(E.n) + '</b><small>' + esc(E.who) + '</small></div>' +
      '<div class="figbox">' + frameFig(fr) + '<span class="figbox__n">' + (T.fr + 1) + '/' + n + '</span></div>' +
      '<p class="howc__t"><b>Bước ' + (T.fr + 1) + '.</b> ' + esc(fr.t) + '</p>' +
      '<div class="howc__nav"><button type="button" class="btn btn--soft btn--sm" data-act="howFr" data-d="-1"' + (T.fr ? '' : ' disabled') + '>' + PS.icon('back', 16) + 'Trước</button>' +
      '<span class="dots">' + E.frames.map(function (f, i) { return '<i class="' + (i === T.fr ? 'on' : (T.seen[exId + i] ? 'seen' : '')) + '"></i>'; }).join('') + '</span>' +
      '<button type="button" class="btn btn--sm" data-act="howFr" data-d="1"' + (T.fr < n - 1 ? '' : ' disabled') + '>Tiếp' + PS.icon('next', 16) + '</button></div></div>' +
      '<div class="card keys"><b class="keys__h">' + ic('stamp', 16) + 'Ba điểm chính</b><ul>' + E.keys.map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('') + '</ul>' +
      (/^rt\d/.test(exId) ? vidBtn() : '<a class="ytbtn" href="' + esc(E.yt ? 'https://www.youtube.com/watch?v=' + E.yt : TC_YT) + '" target="_blank" rel="noopener">' + ic('play', 18) + '<span><b>Xem video của thầy cô GDTC</b><small>' + (E.yt ? 'Mở đúng video động tác' : 'Mở kênh video động tác của khóa') + '</small></span>' + PS.icon('ext', 16) + '</a>') + '</div>' +
      (a.more ? '<p class="morenote">' + esc(a.more) + '</p>' : '') +
      '<button type="button" class="btn btn--go btn--w" data-act="finish"' + (anyDone ? '' : ' disabled') + '>' + (anyDone ? 'Mình xem xong rồi' : 'Xem hết các bước để hoàn thành') + '</button>';
  }

  /* ---------- tìm điểm chưa đúng ---------- */
  function viewSpot(a) {
    var R = a.rounds[T.round], nF = 0, i; for (i = 0; i < R.hs.length; i++) if (T.found[T.round + '.' + i]) nF++;
    var all = nF === R.hs.length, hint = T.miss >= 2 && !all, show = T.miss >= 4 && !all;
    var ov = R.hs.map(function (s, i) { var f = T.found[T.round + '.' + i]; return '<g class="hs' + (f ? ' hs--f' : '') + (hint ? ' hs--hint' : '') + (show ? ' hs--show' : '') + '"><circle cx="' + s.x + '" cy="' + s.y + '" r="' + (s.r + 6) + '" fill="transparent" data-act="hs" data-i="' + i + '"/>' + (f || show ? '<circle class="hs__ring" cx="' + s.x + '" cy="' + s.y + '" r="' + s.r + '"/><text x="' + (s.x + s.r - 2) + '" y="' + (s.y - s.r + 2) + '" class="hs__n">' + (i + 1) + '</text>' : '') + '</g>'; }).join('');
    var svg = (R.art ? '<svg class="fig fig--art" viewBox="0 0 240 180" role="img" aria-label="' + esc(R.q) + '">' + TC_ART[R.art]() + '</svg>' : fig(R.p, { label: R.q, marks: R.mk ? TC_MARK[R.mk] : '' })).replace('</svg>', '<rect x="0" y="0" width="240" height="180" fill="transparent" data-act="hsMiss" style="pointer-events:all" class="hs-bg"/>' + ov + '</svg>');
    /* đưa nền bấm trượt xuống dưới các điểm */
    return (a.rounds.length > 1 ? '<div class="stepbar">' + a.rounds.map(function (r, j) { return '<i class="' + (j < T.round ? 'on' : (j === T.round ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' : '') +
      '<div class="card"><p class="q">' + esc(R.q) + '</p><p class="qsub">Tìm được ' + nF + '/' + R.hs.length + (T.miss ? ' · chạm trượt ' + T.miss + ' lần' : '') + '</p>' +
      '<div class="figbox figbox--spot no">' + svg + '</div>' +
      (hint && !show ? '<p class="hintl">' + ic('bulb', 15) + 'Gợi ý: các chỗ cần tìm đang nhấp nháy nhẹ.</p>' : '') +
      '<ol class="found">' + R.hs.map(function (s, i) { var f = T.found[T.round + '.' + i] || show; return f ? '<li><b>' + esc(s.t) + '</b><small>' + esc(s.why) + '</small></li>' : '<li class="q-empty">…</li>'; }).join('') + '</ol></div>' +
      (all || show ? (T.round < a.rounds.length - 1 ? '<button type="button" class="btn btn--w" data-act="spotNext">Hình tiếp theo</button>' : '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>') :
        (T.miss >= 3 ? '<button type="button" class="link" data-act="spotShow">Xem đáp án</button>' : ''));
  }

  /* ---------- tập thử cùng Shin ---------- */
  var TIMER = null;
  function stopTimer() { if (TIMER) { clearInterval(TIMER); TIMER = null; } if (T && T.run) { T.el += Date.now() - T.t0; T.run = false; } if (T && T.fl && T.fl.run) flPause(); rtPauseAll(); }
  function viewTry(a) {
    var exId = T.tryEx, E = EX[exId], M = MOC[exId] || {}, timeMode = M.u === 's', st = V.step || 0;
    var bar = '<div class="stepbar">' + [0, 1, 2, 3].map(function (i) { return '<i class="' + (i < st ? 'on' : (i === st ? 'cur' : '')) + '"></i>'; }).join('') + '</div>';
    if (st === 0) {
      return bar + '<div class="card"><p class="q">Hôm nay bạn tập động tác nào?</p><div class="chips">' + exOf(a).map(function (x) { return '<button type="button" class="chip' + (x === exId ? ' on' : '') + '" data-act="tryEx" data-x="' + x + '">' + esc(EX[x].s || EX[x].n) + '</button>'; }).join('') + '</div>' +
        '<div class="mini">' + frameFig(E.frames[0], 150) + '<ul>' + E.keys.map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('') + '</ul></div>' +
        (best(exId) ? '<p class="qsub">Kỷ lục của bạn: <b>' + (timeMode ? fmtT(best(exId)) : best(exId) + ' cái') + '</b></p>' : '') + '</div>' +
        (S.mem && S.mem.inj ? shinSays('encourage', esc(TXT.injHome), 46) : '') +
        shinSays('think', 'Bạn đã khởi động chưa? Cơ ấm rồi mới tập nhé.', 46) +
        '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="act" data-id="' + (BAI_BY[a.bai].khu === 'nghe' ? 'n2a' : 'b1a') + '">Chưa, xem khởi động</button><button type="button" class="btn" data-act="tryGo">Rồi, bắt đầu</button></div>';
    }
    if (st === 1) {
      return bar + '<div class="card cnt"><p class="q">' + esc(E.n) + '</p>' +
        (timeMode ? '<p class="qsub">Bấm Bắt đầu rồi vào tư thế. Hết sức hoặc sai tư thế thì bấm Dừng.</p><div class="clock" id="cClock">' + fmtClock(T.el) + '</div>' +
          '<div class="btnrow"><button type="button" class="btn btn--go" data-act="tStart" id="cStart">' + (T.run ? 'Dừng' : (T.el ? 'Tiếp tục' : 'Bắt đầu')) + '</button><button type="button" class="btn btn--soft" data-act="tReset">Làm lại</button></div>' :
          '<p class="qsub">Mỗi lần làm xong một cái, chạm vào nút tròn. Hoặc nhập số ở dưới.</p><button type="button" class="tap" data-act="tap" id="cTap"><b id="cN">' + T.n + '</b><small>chạm +1</small></button>' +
          '<div class="btnrow btnrow--c"><button type="button" class="btn btn--soft btn--sm" data-act="tapMinus">Bớt 1</button><label class="numin">Nhập số<input class="inp" id="cNin" inputmode="numeric" maxlength="3" value=""></label></div>') +
        '</div><button type="button" class="btn btn--w" data-act="tryDone" id="cDone">Xong hiệp này</button>';
    }
    if (st === 2) {
      var n = timeMode ? Math.round(T.el / 1000) : T.n, mk = M[sexKey()], pr = T.isPr;
      var ladder = '';
      if (mk) {
        var mx = mk[2] * 1.25, pos = Math.min(100, n / mx * 100);
        var vf = function (v) { return timeMode ? fmtT(v) : v + ' cái'; };
        ladder = '<div class="moc"><div class="moc__bar"><i style="width:' + pos + '%"></i>' + mk.map(function (v, i) { return '<span class="moc__m moc__m--' + i + '" style="left:' + (v / mx * 100) + '%"></span>'; }).join('') + '</div>' +
          '<div class="moc__leg">' + mk.map(function (v, i) { return '<span class="moc__l moc__l--' + i + '"><i></i>' + MOC_LAB[i] + ' <b>' + vf(v) + '</b></span>'; }).join('') + '</div><p class="ps-small">Mốc của lớp GDTC (' + esc(M.src) + ', ' + (sexKey() === 'nu' ? 'nữ' : 'nam') + '). Chỉ để tham khảo: so với chính mình là chính.</p></div>';
      } else if (M.note) ladder = '<p class="ps-small">' + esc(M.note) + '</p>';
      var feels = ['Nhẹ nhàng', 'Vừa sức', 'Hơi quá sức', 'Thấy đau'], say = ['easySay', 'okSay', 'hardSay', 'painStop'];
      return bar + '<div class="card res"><span class="ah__lab">Kết quả</span><div class="res__n">' + (timeMode ? fmtT(n) : n + ' <small>cái</small>') + '</div>' + (pr ? '<span class="prtag">' + PS.icon('star', 14) + esc(TXT.pr) + '</span>' : '') + ladder + '</div>' +
        '<div class="card"><p class="q">Bạn thấy thế nào?</p><div class="chips">' + feels.map(function (f, i) { return '<button type="button" class="chip' + (T.feel === i ? ' on' : '') + (i === 3 ? ' chip--pain' : '') + '" data-act="feel" data-i="' + i + '">' + f + '</button>'; }).join('') + '</div>' +
        (T.feel >= 0 ? shinSays(T.feel === 3 ? 'sad' : (T.feel === 2 ? 'think' : 'cheer'), esc(TXT[say[T.feel]]), 46) : '') + '</div>' +
        '<button type="button" class="btn btn--w" data-act="tryNext"' + (T.feel >= 0 ? '' : ' disabled') + '>Tiếp</button>';
    }
    return bar + writeBox(TXT.reflQ, TXT.reflSub, E.keys.map(function (k) { return 'Lần tới mình sẽ chú ý: ' + k.charAt(0).toLowerCase() + k.slice(1) + '.'; })) +
      '<button type="button" class="btn btn--go btn--w" data-act="finish" id="wDone"' + (words(T.txt) >= 3 ? '' : ' disabled') + '>Lưu và hoàn thành</button>';
  }
  function writeBox(q, sub, tips) {
    var w = words(T.txt);
    return '<div class="card"><p class="q">' + esc(q) + '</p><p class="qsub">' + esc(sub) + '</p><textarea class="inp ta" id="wTxt" rows="3" maxlength="300">' + esc(T.txt || '') + '</textarea>' +
      '<div class="counter" id="wCnt">' + w + ' chữ' + (w >= 10 ? (T.txt === T.tipUsed ? ' · sửa thành lời của bạn để được Insight' : ' · +1 Insight') : '') + '</div>' +
      (tips && tips.length ? '<div class="chips chips--tips">' + tips.map(function (t, i) { return '<button type="button" class="chip chip--tip" data-act="wTip" data-t="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>' : '') + '</div>';
  }
  function drawCounter() {
    var a = actById(V.a), M = MOC[T.tryEx] || {};
    if (M.u === 's' && T.run && !TIMER) {
      TIMER = setInterval(function () { var el = $('#cClock'); if (!el) { stopTimer(); return; } el.textContent = fmtClock(T.el + Date.now() - T.t0); }, 250);
    }
  }
  function tick() { if (!PS.soundOn() || RM) return; try { var C = W.AudioContext || W.webkitAudioContext; if (!C) return; var c = tick.c || (tick.c = new C()), o = c.createOscillator(), g = c.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(0.08, c.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12); o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.13); } catch (e) {} }

  /* ---------- xếp thứ tự ---------- */
  function viewOrder(a) {
    var items = seedShuffle(a.items.map(function (t, i) { return i; }), a.id), full = T.ord.length === a.items.length;
    var ok = full && T.ord.join() === a.items.map(function (t, i) { return i; }).join();
    return '<div class="card"><p class="q">' + esc(a.q) + '</p><p class="qsub">' + esc(a.sub) + '</p><div class="ordl">' + items.map(function (i) {
      var pos = T.ord.indexOf(i);
      return '<button type="button" class="ordi' + (pos >= 0 ? ' on' : '') + (full ? (ok ? ' ok' : ' no') : '') + '" data-act="ord" data-i="' + i + '"' + (full ? ' disabled' : '') + '><span class="ordi__n">' + (pos >= 0 ? pos + 1 : '') + '</span>' + esc(a.items[i]) + '</button>';
    }).join('') + '</div></div>' +
      (full ? (ok ? '<div class="fb fb--ok"><b>Đúng rồi!</b> ' + esc(a.ok) + '</div><button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' :
        '<div class="fb fb--no"><b>Thử lại nhé.</b> ' + esc(a.hint) + '</div><button type="button" class="btn btn--w" data-act="ordReset">Thử xếp lại</button>') :
        (T.ord.length ? '<button type="button" class="link" data-act="ordReset">Xếp lại từ đầu</button>' : ''));
  }

  /* ---------- chọn cách đúng ---------- */
  function pickOv(a) { if (!a.rounds) return null; var o = (a.byJob && a.byJob[jobS()]) || (a.byGroup && a.byGroup[grp()]); return o && !o.rounds ? o : null; }
  function pickRounds(a) {
    if (a.rounds) { var ov = pickOv(a); if (!ov) return a.rounds; var R = a.rounds.slice(); R[R.length - 1] = ov; return R; }
    if (a.byGroup) { var G = a.byGroup[grp()] || a.byGroup.xuong; if (G.rounds) return G.rounds; } return null; }
  function pickData(a) { var RR = pickRounds(a); if (RR) return RR[T.round]; if (a.byGroup) return a.byGroup[grp()] || a.byGroup.xuong; return a; }
  function viewPick(a) {
    var R = pickData(a), ord = seedShuffle(R.opts.map(function (o, i) { return i; }), a.id + 'p' + T.round + (a.byGroup ? grp() : '')), P = T.pick, chosen = P >= 0 ? R.opts[P] : null;
    var RR = pickRounds(a), last = !RR || T.round >= RR.length - 1, OV = pickOv(a), isOv = OV && R === OV, G = a.byGroup && (!a.rounds || isOv) ? GROUPS[grp()] || GROUPS.xuong : null;
    var JB = isOv && a.byJob && a.byJob[jobS()] ? jobOf(jobS()) : null;
    return (RR ? '<div class="stepbar">' + RR.map(function (r, j) { return '<i class="' + (j < T.round ? 'on' : (j === T.round ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' : '') +
      (a.kg && T.round === 0 ? kgCard() : '') + '<div class="card">' + (JB ? '<p class="qsub">' + ic('helmet', 14) + ' Tình huống của nghề ' + esc(JB.n) + '</p>' : (G ? '<p class="qsub">' + ic(G.ic, 14) + ' Tình huống của nhóm ' + esc(G.n) + '</p>' : '')) + '<p class="q">' + esc(R.q.replace('[KG]', kgLine())) + '</p><div class="opts">' + ord.map(function (i) {
      var o = R.opts[i], on = P === i;
      return '<button type="button" class="opt' + (on ? (o.ok ? ' opt--ok' : ' opt--no') : '') + '" data-act="pick" data-i="' + i + '"' + (chosen && chosen.ok ? ' disabled' : '') + '><span class="dot">' + (on ? PS.icon(o.ok ? 'check' : 'close', 13, 3) : '') + '</span>' + esc(o.t) + '</button>';
    }).join('') + '</div></div>' +
      (chosen ? (chosen.ok ? '<div class="fb fb--ok">' + esc(chosen.why) + '</div>' + (last ? (a.scale ? thangCard() : '') + (a.end ? shinSays('think', esc(a.end), 46) : '') + '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '<button type="button" class="btn btn--w" data-act="pickNext">Câu tiếp theo</button>') :
        '<div class="fb fb--no"><b>Thử lại nhé.</b> ' + esc(chosen.why) + '</div><p class="qsub" style="text-align:center">Thử chọn lại một cách khác.</p>') : '');
  }

  /* ---------- lịch tập của mình ---------- */
  function viewPlan(a) {
    var P = T.plan, sug = best('pushup') > 15 ? 'B' : 'A', okDays = P.days.length >= 3, okTxt = words(P.txt) >= 4;
    return '<div class="card"><p class="q">Chọn kế hoạch hợp sức bạn</p><p class="qsub">Shin gợi ý: <b>Kế hoạch ' + sug + '</b>' + (best('pushup') ? ' (kỷ lục chống đẩy của bạn: ' + best('pushup') + ' cái)' : '') + '.</p>' +
      ['A', 'B'].map(function (k) { var L = PLANS[k]; return '<button type="button" class="plan' + (P.k === k ? ' on' : '') + '" data-act="planK" data-k="' + k + '"><b>' + esc(L.n) + '</b><small>' + esc(L.who) + ' · ' + esc(L.d) + '</small>' + (P.k === k ? '<ul>' + L.body.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') + '</button>'; }).join('') +
      '<p class="ps-small">' + esc(PLAN_TIP) + '</p></div>' +
      (P.k ? '<div class="card"><p class="q">Bạn tập vào những ngày nào?</p><p class="qsub">Chọn ít nhất 3 ngày' + (PLANS[P.k].days === 4 ? ' (kế hoạch A nên chọn 4)' : '') + '.</p><div class="chips chips--days">' + DAYS7.map(function (d, i) { return '<button type="button" class="chip' + (P.days.indexOf(i) >= 0 ? ' on' : '') + '" data-act="planD" data-i="' + i + '">' + d + '</button>'; }).join('') + '</div>' +
        '<p class="q" style="margin-top:14px">Giờ nào?</p><div class="chips">' + SLOTS.map(function (s, i) { return '<button type="button" class="chip' + (P.slot === i ? ' on' : '') + '" data-act="planS" data-i="' + i + '">' + s + '</button>'; }).join('') + '</div></div>' : '') +
      (P.k && okDays && P.slot >= 0 ? '<div class="card"><p class="q">' + esc(PLAN_Q) + '</p><textarea class="inp ta" id="pTxt" rows="2" maxlength="200">' + esc(P.txt || '') + '</textarea><div class="chips chips--tips">' + PLAN_TIPS.map(function (t) { return '<button type="button" class="chip chip--tip" data-act="pTip" data-t="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div></div>' +
        '<button type="button" class="btn btn--go btn--w" data-act="finish" id="pDone"' + (okTxt ? '' : ' disabled') + '>Lưu lịch tập</button>' : '');
  }
  function planLine(P) { if (!P || !P.k) return ''; return PLANS[P.k].n + ' · ' + P.days.map(function (i) { return DAYS7[i]; }).join(', ') + ' · ' + (SLOTS[P.slot] || ''); }

  /* ---------- hoàn thành ---------- */
  function finishAct() {
    var a = actById(V.a), first = !S.done[a.id], b = BAI_BY[a.bai], wasDone = baiDone(b), ins = 0;
    if (a.k === 'try') {
      var M = MOC[T.tryEx] || {}, n = M.u === 's' ? Math.round(T.el / 1000) : T.n;
      S.refl[a.id] = T.txt; if (words(T.txt) >= 10 && T.txt !== T.tipUsed) ins = 1;
    }
    if (a.k === 'write') { S.refl[a.id] = T.txt; if (words(T.txt) >= 10 && T.txt !== T.tipUsed) ins = 1; }
    if (a.k === 'commit') {
      var hab = T.hab < HABITS.length ? HABITS[T.hab].t : String(T.own || '').replace(/^\s+|\s+$/g, ''), oc = S.food.commit, I0 = commitInfo(), keep = oc && oc.h === hab && I0 && I0.di < COMMIT_DAYS;
      S.food.commit = { h: hab, txt: T.txt, at: keep ? oc.at : Date.now(), days: keep ? oc.days : {} };
      if (words(T.txt) >= 10 && T.txt !== T.tipUsed) ins = 1;
    }
    if (a.k === 'meal') S.food.meal = { sang: T.meal.sang.slice(), trua: T.meal.trua.slice(), toi: T.meal.toi.slice(), skip: T.meal.skip, d: today() };
    if (a.k === 'calc') { var cr = calcRes(T.c); if (cr) { S.food.calc = { h: +T.c.h, w: num(T.c.w), age: +T.c.age, sex: T.c.sex, lv: T.c.lv, bmi: cr.bmi, bmr: cr.bmr, tdee: cr.tdee, water: cr.water, at: Date.now() }; if (S.mem) { S.mem.h = +T.c.h; S.mem.w = num(T.c.w); } } }
    if (a.k === 'body') S.nghe.body = T.bz.slice();
    if (a.k === 'ladder') { S.nghe.lad = {}; for (var lk1 in T.lad) if (T.lad.hasOwnProperty(lk1)) S.nghe.lad[lk1] = T.lad[lk1]; }
    if (a.k === 'story') { S.refl[a.id] = T.txt; if (words(T.txt) >= 10 && T.txt !== T.tipUsed) ins = 1; }
    if (a.k === 'flow') { S.nghe.fl = S.nghe.fl || {}; S.nghe.fl[a.id] = (S.nghe.fl[a.id] || 0) + 1; }
    if (a.k === 'ca') S.nghe.ca = { g: grp(), sel: T.cs.slice(), sch: T.sch };
    if (a.k === 'sim') { S.yte.sim = S.yte.sim || {}; S.yte.sim[a.id] = { f: T.sm.first, n: a.steps.length, at: Date.now() }; }
    if (a.k === 'habit') { (a.hl ? S.yte : S.nghe).habit = { h: habName(), txt: T.txt, at: Date.now() }; S.refl[a.id] = T.txt; if (words(T.txt) >= 10 && T.txt !== T.tipUsed) ins = 1; }
    if (a.k === 'week') { S.nghe.week = { days: T.wk.days.slice().sort(), slot: T.wk.slot, txt: T.txt, at: Date.now() }; if (words(T.txt) >= 10 && T.txt !== T.tipUsed) ins = 1; }
    if (a.k === 'shift' && T.sh) S.food.shift = { s: T.sh.s, l: T.sh.l, pre: T.sh.pre, at: Date.now() };
    if (a.k === 'bento') { S.food.bento = {}; for (var bk2 in T.bt) if (T.bt.hasOwnProperty(bk2)) S.food.bento[bk2] = T.bt[bk2]; }
    if (a.k === 'basket') { var BS = bkSum(a, T.bk), sel = []; for (var bi in T.bk) if (T.bk.hasOwnProperty(bi) && T.bk[bi]) sel.push(+bi); S.food.konbini = { sel: sel, t: BS.t, at: Date.now() }; }
    if (a.k === 'plan') { S.plan = { k: T.plan.k, days: T.plan.days.slice().sort(), slot: T.plan.slot, txt: T.plan.txt, at: Date.now() }; if (words(T.plan.txt) >= 10 && T.plan.txt !== T.tipUsed) ins = 1; }
    if (a.k === 'beat') S.radio.beat = Math.max(S.radio.beat || 0, T.rb.n || 0);
    if (a.k === 'rflow') { S.radio.fl = S.radio.fl || {}; S.radio.fl[a.id] = (S.radio.fl[a.id] || 0) + 1; }
    if (a.k === 'rself') { var nd = []; for (var nk in T.rs.need) if (T.rs.need.hasOwnProperty(nk) && T.rs.need[nk]) nd.push(+nk); S.radio.self = { c: T.rs.c.slice(), need: nd.sort(function (x, y) { return x - y; }), at: Date.now() }; }
    if (a.k === 'sang7') { var o7 = S.radio.s7; S.radio.s7 = { slot: T.s7.slot, txt: T.txt, at: o7 ? o7.at : Date.now(), days: o7 ? o7.days : {} }; S.refl[a.id] = T.txt; if (words(T.txt) >= 10 && T.txt !== T.tipUsed) ins = 1; }
    if (ins) S.ins[a.id] = 1;
    if (first) { S.done[a.id] = Date.now(); S.xp[a.id] = a.xp; }
    markDay(); save(true);
    var msg = first ? '<b>+' + a.xp + ' XP</b>' + (ins ? ' · +1 Insight' : '') + ' · Giỏi lắm, <b>' + esc(given()) + '</b>!' : (b.khu !== 'san' ? 'Đã lưu. Làm lại là cách nhớ lâu nhất!' : 'Đã lưu. Tập lại là cách nhớ lâu nhất!');
    var nxA = null; b.acts.forEach(function (x) { if (!nxA && x.id !== a.id && !S.done[x.id]) nxA = x; });
    if (!(!wasDone && baiDone(b)) && nxA) { /* PS1.3.55 (ý 25): cuối hoạt động có Tiếp theo + Về bài */
      go({ v: 'bai', id: b.id });
      PS.dialog({ title: first ? 'Xong hoạt động!' : 'Đã lưu', html: '<p>' + msg + '</p>', buttons: [
        { t: 'Tiếp theo: ' + esc(nxA.t), cls: 'ps-btn--go', fn: function () { setTimeout(function () { openAct(nxA.id); }, 0); return true; } },
        { t: 'Về ' + esc(b.t), cls: 'ps-btn--soft' }] });
      return;
    }
    PS.toast(msg);
    if (!wasDone && baiDone(b)) {
      go({ v: 'bai', id: b.id }, true);
      var lab = ''; PUNCH.forEach(function (x) { if (x[0] === b.khu) lab = x[1]; });
      PS.dialog({ title: 'Đục lỗ thẻ hội viên!', html: '<div class="stampdlg">' + shin('party', 90, 'hop') + '<div class="punchdlg">' + punchRow(b.khu, lab, b.id) + '</div><p>' + TXT.baiDone.replace('[Bài]', esc(b.t)) + '</p><p class="ps-small">' + esc(khuById(b.khu).t) + ' · ' + baiCount(b.khu) + '/' + baisOf(b.khu).length + ' lỗ · hạng ' + tier() + '</p></div>', buttons: [{ t: 'Tuyệt!', cls: 'ps-btn--go' }] });
      setTimeout(function () { sfx('punch'); }, RM ? 0 : 520);
    } else go({ v: 'bai', id: b.id }, true);
  }

  /* =========================================================
     BẾP DINH DƯỠNG: tiện ích, các dạng hoạt động mới
     plate (xếp đĩa) · meal (bữa hôm qua) · write (viết ra) · calc (máy tính) · hilo (cao hay thấp) · day (tìm việc chưa ổn) · commit (cam kết 21 ngày)
     ========================================================= */
  function num(v) { return parseFloat(String(v == null ? '' : v).replace(',', '.')) || 0; }
  function fmtK(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function fmtL(n) { return String(n).replace('.', ','); }
  function dayKeyFrom(st, i) { var d = new Date(st.getFullYear(), st.getMonth(), st.getDate() + i); return PS.dkey(d); }
  var BMI_LAB = ['Gầy', 'Bình thường', 'Thừa cân', 'Béo phì'];
  function calcRes(c) {
    if (!c) return null;
    var h = num(c.h), w = num(c.w), age = num(c.age);
    if (!(h >= 120 && h <= 220 && w >= 30 && w <= 200 && age >= 15 && age <= 70) || !(c.lv >= 0) || !c.sex) return null;
    var b = Math.round(w / (h * h / 1e4) * 10) / 10;
    var bmr = c.sex === 'nu' ? 9.247 * w + 3.098 * h - 4.330 * age + 447.593 : 13.397 * w + 4.799 * h - 5.677 * age + 88.362;
    return { bmi: b, li: b < 18.5 ? 0 : (b < 23 ? 1 : (b < 25 ? 2 : 3)), bmr: Math.round(bmr / 10) * 10, tdee: Math.round(bmr * ACT_LV[c.lv].f / 10) * 10, water: Math.round(w * 0.04 * 10) / 10 };
  }
  function foodByT(t) { for (var i = 0; i < MEAL_FOODS.length; i++) if (MEAL_FOODS[i].t === t) return MEAL_FOODS[i]; return null; }
  var ZN = { tb: 'tinh bột', dam: 'đạm', rau: 'rau', qs: 'trái cây, sữa' };
  function mealReport(M) {
    var lines = [], gaps = [], anyQs = false, warn = [], bad = 0;
    MEALS.forEach(function (ml) {
      var k = ml[0], nm = ml[1].toLowerCase(), g = {};
      if (M.skip[k]) { lines.push(MEAL_TXT.skipped.replace('[Bữa]', nm)); gaps.push({ k: k, nm: nm, skip: 1 }); bad++; return; }
      M[k].forEach(function (t) { var f = foodByT(t); if (!f) return; f.g.forEach(function (x) { g[x] = 1; }); if (f.w && warn.indexOf(t) < 0) warn.push(t); });
      if (g.qs) anyQs = true;
      var miss = ['tb', 'dam', 'rau'].filter(function (x) { return !g[x]; });
      if (miss.length) { lines.push(MEAL_TXT.miss.replace('[Bữa]', nm).replace('[Nhóm]', miss.map(function (x) { return ZN[x]; }).join(', '))); gaps.push({ k: k, nm: nm, miss: miss }); bad++; }
      else lines.push(MEAL_TXT.good.replace('[Bữa]', nm));
    });
    if (!anyQs) { lines.push(MEAL_TXT.noQs); gaps.push({ qs: 1 }); bad++; }
    if (warn.length) { lines.push(MEAL_TXT.warn.replace('[Món]', warn.map(function (t) { return t.toLowerCase(); }).join(', '))); }
    return { lines: lines, gaps: gaps, warn: warn, good: !bad };
  }
  function mealGroups(M, k) { var g = {}; M[k].forEach(function (t) { var f = foodByT(t); if (f) f.g.forEach(function (x) { g[x] = 1; }); }); return g; }
  function commitInfo() {
    var c = S.food && S.food.commit; if (!c) return null;
    var st = new Date(c.at); st = new Date(st.getFullYear(), st.getMonth(), st.getDate());
    var now = new Date(); now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var di = Math.round((now.getTime() - st.getTime()) / 864e5), n = 0, k;
    for (k in c.days) if (c.days.hasOwnProperty(k)) n++;
    return { c: c, st: st, di: di, n: Math.min(n, COMMIT_DAYS), todayOn: !!c.days[today()] };
  }
  function foodSum() {
    var f = S.food || {}, o = {}, I = commitInfo();
    if (f.meal) o.meal = mealReport(f.meal).lines.join(' ');
    if (f.calc) o.calc = { bmi: f.calc.bmi, tdee: f.calc.tdee, water: f.calc.water };
    if (I) o.commit = { h: I.c.h, txt: I.c.txt, days: I.n, start: PS.dkey(I.st) };
    if (f.shift) o.shift = hh(f.shift.s) + '–' + hh(f.shift.s + f.shift.l);
    if (f.bento) o.bento = bentoLine(f.bento);
    if (f.konbini) o.konbini = f.konbini.t;
    return o;
  }
  function commitCard() {
    var I = commitInfo(); if (!I) return '';
    var dots = '', i;
    for (i = 0; i < COMMIT_DAYS; i++) { var k = dayKeyFrom(I.st, i); dots += '<i class="' + (I.c.days[k] ? 'on' : (i < I.di ? 'miss' : (i === I.di ? 'cur' : ''))) + '" title="Ngày ' + (i + 1) + '"></i>'; }
    var over = I.di >= COMMIT_DAYS;
    return '<section class="cmt" aria-label="' + esc(BEP_TXT.commitCard) + '"><div class="cmt__top">' + ic('cal', 18) + '<b>' + esc(BEP_TXT.commitCard) + '</b><span>' + I.n + '/' + COMMIT_DAYS + ' ngày' + (over ? '' : ' · hôm nay ngày ' + (I.di + 1)) + '</span></div>' +
      '<p class="cmt__h">' + esc(I.c.h) + '</p><p class="cmt__t">' + esc(I.c.txt) + '</p><div class="cmt__dots">' + dots + '</div>' +
      (over ? '<p class="cmt__ok">' + (I.n >= 15 ? esc(BEP_TXT.commitEnd) : 'Hết 21 ngày: bạn giữ được ' + I.n + ' ngày. Bắt đầu vòng mới ở bài Lỗi ăn uống hay gặp nhé.') + '</p>' :
        (I.todayOn ? '<p class="cmt__ok">' + PS.icon('check', 15, 3) + esc(BEP_TXT.commitToday) + '</p>' : '<button type="button" class="btn btn--go btn--sm btn--w" data-act="cmtTick">' + PS.icon('check', 16, 3) + esc(BEP_TXT.commitBtn) + '</button>')) + '</section>';
  }
  function nbFood() {
    var f = S.food || {}, c = f.calc, h = '<div class="nbsec"><h3>Bếp của mình</h3>';
    if (c) h += '<ul class="kv"><li><span>BMI (tham khảo)</span><b>' + fmtL(c.bmi) + ' · ' + BMI_LAB[c.bmi < 18.5 ? 0 : (c.bmi < 23 ? 1 : (c.bmi < 25 ? 2 : 3))] + '</b></li><li><span>Năng lượng cả ngày</span><b>khoảng ' + fmtK(c.tdee) + ' kcal</b></li><li><span>Nước mỗi ngày</span><b>khoảng ' + fmtL(c.water) + ' lít</b></li></ul><p class="ps-small">Tính ngày ' + esc(dmy(c.at)) + '. Chỉ để tham khảo, so với chính mình.</p>';
    else h += '<p class="ps-small">Chưa tính. Làm ở Bếp › Năng lượng của mình.</p>';
    if (f.meal) h += '<p class="ps-small" style="margin-top:8px"><b>Bữa bạn ghi lại:</b> ' + esc(mealReport(f.meal).lines.join(' ')) + '</p>';
    if (f.shift) { var sp2 = shiftPlan(f.shift.s, f.shift.l); h += '<p class="ps-small" style="margin-top:8px"><b>Giờ ăn theo ca (' + hh(f.shift.s) + '–' + hh(f.shift.s + f.shift.l) + '):</b> ' + esc(sp2.map(function (p) { return hh(p.t) + ' ' + p.n.toLowerCase(); }).join(' · ')) + '</p>'; }
    if (f.bento) h += '<p class="ps-small"><b>Hộp cơm mang đi:</b> ' + esc(bentoLine(f.bento)) + '</p>';
    return h + '</div>' + commitCard();
  }

  /* ---------- xếp đĩa ---------- */
  function plateSVG(cnt, tot) {
    var Z = { rau: { d: 'M110 22A70 70 0 0 0 110 162Z', x: 72, y: 92, c: '#BFE0CB', n: 'Rau' }, tb: { d: 'M110 92L110 22A70 70 0 0 1 180 92Z', x: 141, y: 62, c: '#EADAB2', n: 'Tinh bột' },
      dam: { d: 'M110 92L180 92A70 70 0 0 1 110 162Z', x: 141, y: 126, c: '#F0C9BB', n: 'Đạm' } };
    function op(k) { return (0.28 + 0.72 * ((cnt[k] || 0) / (tot[k] || 1))).toFixed(2); }
    var h = '<svg class="plate" viewBox="0 0 260 184" role="img" aria-label="Đĩa ăn bốn nhóm"><circle cx="110" cy="92" r="84" fill="#fff" stroke="#DCE5DF" stroke-width="2"/><circle cx="110" cy="92" r="74" fill="#F7FAF8" stroke="#E6EEE9"/>';
    ['rau', 'tb', 'dam'].forEach(function (k) { var z = Z[k]; h += '<path d="' + z.d + '" fill="' + z.c + '" fill-opacity="' + op(k) + '" stroke="#fff" stroke-width="3" data-act="plZone" data-z="' + k + '" style="cursor:pointer"/>' +
      '<text x="' + z.x + '" y="' + z.y + '" text-anchor="middle" class="plate__t">' + z.n + '</text><text x="' + z.x + '" y="' + (z.y + 16) + '" text-anchor="middle" class="plate__n">' + (cnt[k] || 0) + '/' + tot[k] + '</text>'; });
    h += '<circle cx="222" cy="50" r="31" fill="#fff" stroke="#DCE5DF" stroke-width="2"/><circle cx="222" cy="50" r="25" fill="#F4D7B5" fill-opacity="' + op('qs') + '" data-act="plZone" data-z="qs" style="cursor:pointer"/>' +
      '<text x="222" y="46" text-anchor="middle" class="plate__t plate__t--s">Trái cây,</text><text x="222" y="58" text-anchor="middle" class="plate__t plate__t--s">sữa ' + (cnt.qs || 0) + '/' + tot.qs + '</text></svg>';
    return h;
  }
  function viewPlate(a) {
    var tot = {}, cnt = {}, names = {}, nP = 0;
    a.items.forEach(function (it, i) { tot[it.z] = (tot[it.z] || 0) + 1; if (T.placed[i]) { cnt[it.z] = (cnt[it.z] || 0) + 1; (names[it.z] = names[it.z] || []).push(it.t); nP++; } });
    var all = nP === a.items.length, ord = seedShuffle(a.items.map(function (x, i) { return i; }), a.id);
    return '<div class="card"><p class="q">' + esc(a.q) + '</p><p class="qsub">' + esc(a.sub) + '</p>' +
      (all ? '' : '<p class="pfl">' + (T.sel >= 0 ? 'Đã chọn <b>' + esc(a.items[T.sel].t) + '</b>. Giờ chạm nhóm của món này.' : 'Món ăn · đã xếp ' + nP + '/' + a.items.length) + '</p><div class="chips pfood">' +
        ord.filter(function (i) { return !T.placed[i]; }).map(function (i) { return '<button type="button" class="chip' + (T.sel === i ? ' on' : '') + '" data-act="plFood" data-i="' + i + '">' + esc(a.items[i].t) + '</button>'; }).join('') + '</div>') +
      (T.wrong ? '<div class="fb fb--no">' + esc(T.wrong) + '</div>' : '') +
      '<div class="platebox">' + plateSVG(cnt, tot) + '</div>' +
      '<div class="pzs">' + PLATE_Z.map(function (z) { return '<button type="button" class="pz pz--' + z.k + (T.sel >= 0 ? ' pz--ready' : '') + '" data-act="plZone" data-z="' + z.k + '"' + (all ? ' disabled' : '') + '><b>' + esc(z.n) + '</b><small>' + esc(names[z.k] ? names[z.k].join(', ') : z.d) + '</small></button>'; }).join('') + '</div></div>' +
      (all ? shinSays('cheer', esc(BEP_TXT.plateDone), 50) + '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '');
  }

  /* ---------- bữa hôm qua ---------- */
  function mealAnswered(k) { return !!(T.meal.skip[k] || T.meal[k].length); }
  function viewMeal(a) {
    var M = T.meal;
    if (T.mres) {
      var R = mealReport(M), cols = ['tb', 'dam', 'rau', 'qs'], cl = ['Tinh bột', 'Đạm', 'Rau', 'Quả, sữa'];
      return '<div class="card"><p class="q">Bữa hôm qua của bạn</p><table class="mtab"><thead><tr><th></th>' + cl.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' +
        MEALS.map(function (ml) {
          if (M.skip[ml[0]]) return '<tr><th>' + ml[1] + '</th><td colspan="4" class="mtab__skip">Bỏ bữa</td></tr>';
          var g = mealGroups(M, ml[0]);
          return '<tr><th>' + ml[1] + '</th>' + cols.map(function (c) { return '<td><i class="' + (g[c] ? 'on' : '') + '" aria-label="' + (g[c] ? 'Có' : 'Chưa có') + '"></i></td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>' +
        shinSays(R.good ? 'cheer' : 'encourage', (R.good ? esc(MEAL_TXT.allGood) + '<br>' : '') + R.lines.map(esc).join('<br>') + '<br><small class="ps-small">' + esc(MEAL_TXT.none) + '</small>', 50) +
        '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="mBack">Sửa lại</button><button type="button" class="btn btn--go" data-act="finish">Hoàn thành</button></div>';
    }
    var k = MEALS[T.mtab][0], allA = mealAnswered('sang') && mealAnswered('trua') && mealAnswered('toi');
    return '<div class="card"><p class="q">' + esc(MEAL_TXT.q) + '</p><p class="qsub">' + esc(MEAL_TXT.sub) + '</p>' +
      '<div class="mtabs" role="tablist">' + MEALS.map(function (ml, i) { return '<button type="button" role="tab" class="mtabs__b' + (i === T.mtab ? ' on' : '') + '" data-act="mTab" data-i="' + i + '">' + ml[1] + (mealAnswered(ml[0]) ? PS.icon('check', 13, 3) : '') + '</button>'; }).join('') + '</div>' +
      '<div class="chips mfood">' + MEAL_FOODS.map(function (f) { var on = M[k].indexOf(f.t) >= 0; return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-act="mFood" data-t="' + esc(f.t) + '">' + esc(f.t) + '</button>'; }).join('') +
      '<button type="button" class="chip chip--skip' + (M.skip[k] ? ' on' : '') + '" data-act="mSkip">' + esc(MEAL_TXT.skip) + '</button></div></div>' +
      (allA ? '<button type="button" class="btn btn--w" data-act="mSee">' + esc(MEAL_TXT.see) + '</button>' :
        '<button type="button" class="btn btn--w" data-act="mNext"' + (mealAnswered(k) && T.mtab < 2 ? '' : ' disabled') + '>' + (T.mtab < 2 ? 'Bữa tiếp theo' : 'Chọn đủ 3 bữa để xem') + '</button>');
  }

  /* ---------- viết ra ---------- */
  function writeTips(a) {
    var tips = [], f = a.dyn ? null : S.food.meal;
    if (a.dyn === 'nghe') tips = ngheTips();
    if (a.dyn === 'ft') tips = ftTips();
    if (f) {
      var R = mealReport(f);
      R.gaps.forEach(function (g) {
        if (g.skip && g.k === 'sang') tips.push('Sáng mai mình sẽ dậy sớm 10 phút để ăn sáng');
        else if (g.skip) tips.push('Mai mình sẽ không bỏ bữa ' + g.nm + ', ăn ít cũng được');
        else if (g.miss && g.miss.indexOf('dam') >= 0) tips.push('Bữa ' + g.nm + ' mai mình sẽ ăn thêm một quả trứng hoặc đậu phụ');
        else if (g.miss && g.miss.indexOf('rau') >= 0) tips.push('Bữa ' + g.nm + ' mai mình sẽ thêm một đĩa rau luộc');
        else if (g.miss && g.miss.indexOf('tb') >= 0) tips.push('Bữa ' + g.nm + ' mai mình sẽ ăn đủ cơm hoặc bánh mì');
        else if (g.qs) tips.push('Mai mình sẽ ăn một quả chuối hoặc hộp sữa chua');
      });
      if (R.warn.indexOf('Nước ngọt, trà sữa') >= 0) tips.push('Mai mình sẽ uống nước lọc thay cho nước ngọt, trà sữa');
      else if (R.warn.indexOf('Mì gói') >= 0) tips.push('Mai mình sẽ ăn cơm có rau thay cho mì gói');
    }
    a.tips.forEach(function (t) { if (tips.indexOf(t) < 0) tips.push(t); });
    return tips.slice(0, 3);
  }
  function viewWrite(a) {
    return shinSays('encourage', esc(a.say), 50) + writeBox(a.q, a.sub, writeTips(a)) +
      '<button type="button" class="btn btn--go btn--w" data-act="finish" id="wDone"' + (words(T.txt) >= 3 ? '' : ' disabled') + '>Lưu và hoàn thành</button>';
  }

  /* ---------- máy tính ---------- */
  function calcResHTML() {
    var r = calcRes(T.c);
    if (!r) return '<p class="ps-small calc__wait">Nhập đủ số và chọn mức vận động, Shin tính ngay.</p>';
    return '<div class="ctiles"><div class="ct"><small>BMI</small><b>' + fmtL(r.bmi) + '</b><span>' + BMI_LAB[r.li] + '</span></div>' +
      '<div class="ct"><small>Năng lượng khi nghỉ</small><b>' + fmtK(r.bmr) + '</b><span>kcal/ngày</span></div>' +
      '<div class="ct ct--main"><small>Năng lượng cả ngày</small><b>' + fmtK(r.tdee) + '</b><span>kcal/ngày, theo mức vận động</span></div>' +
      '<div class="ct ct--water"><small>' + ic('drop', 13) + ' Nước</small><b>' + fmtL(r.water) + '</b><span>lít/ngày (cân nặng × 0,04)</span></div></div>' +
      shinSays(r.li === 1 ? 'cheer' : 'encourage', esc(BEP_TXT.bmiSay[r.li]), 46) +
      '<ul class="calc__notes"><li>' + esc(BEP_TXT.bmiNote) + '</li><li>' + esc(BEP_TXT.waterNote) + '</li><li><b>' + esc(BEP_TXT.calcNote) + '</b></li></ul>' +
      '<p class="ps-small">Công thức BMR, mức vận động, ngưỡng BMI: Sổ quản lý học tập GDTC. Số làm tròn, chỉ để tham khảo.</p>';
  }
  function viewCalc(a) {
    var c = T.c;
    return '<div class="card"><p class="q">' + esc(BEP_TXT.calcQ) + '</p><p class="qsub">' + esc(BEP_TXT.calcSub) + '</p>' +
      '<div class="calc3"><label>Chiều cao (cm)<input class="inp" id="cH" inputmode="numeric" maxlength="3" value="' + esc(c.h) + '"></label><label>Cân nặng (kg)<input class="inp" id="cW" inputmode="decimal" maxlength="5" value="' + esc(c.w) + '"></label><label>Tuổi<input class="inp" id="cA" inputmode="numeric" maxlength="2" value="' + esc(c.age) + '"></label></div>' +
      '<p class="qsub" style="margin:10px 0 6px">Công thức tính khác nhau cho nam và nữ</p><div class="chips">' + [['nam', 'Nam'], ['nu', 'Nữ']].map(function (o) { return '<button type="button" class="chip' + (c.sex === o[0] ? ' on' : '') + '" data-act="cSex" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div></div>' +
      '<div class="card"><p class="q">' + esc(BEP_TXT.calcLv) + '</p><div class="opts">' + ACT_LV.map(function (L, i) { var on = c.lv === i; return '<button type="button" class="opt' + (on ? ' on' : '') + '" data-act="cLv" data-i="' + i + '"><span class="dot">' + (on ? PS.icon('check', 13, 3) : '') + '</span>' + esc(L.n) + '</button>'; }).join('') + '</div></div>' +
      '<div class="card" id="cRes">' + calcResHTML() + '</div>' +
      '<button type="button" class="btn btn--go btn--w" data-act="finish" id="cDoneB"' + (calcRes(c) ? '' : ' disabled') + '>Lưu kết quả</button>';
  }
  function syncCalc() {
    if (!T.c) return;
    var h = $('#cH'), w = $('#cW'), ag = $('#cA');
    if (h) T.c.h = h.value.replace(/[^\d]/g, ''); if (w) T.c.w = w.value.replace(/[^\d.,]/g, ''); if (ag) T.c.age = ag.value.replace(/[^\d]/g, '');
    var r = $('#cRes'); if (r) r.innerHTML = calcResHTML();
    var d = $('#cDoneB'); if (d) d.disabled = !calcRes(T.c);
  }

  /* ---------- cao hay thấp ---------- */
  function viewHilo(a) {
    var P = a.pairs[T.round], flip = seedShuffle([0, 1], a.id + T.round)[0] === 1, o = flip ? [[P.b, 0], [P.a, 1]] : [[P.a, 1], [P.b, 0]];
    var st = T.hp[T.round] || {}, solved = !!st.ok, tried = false, last = T.round >= a.pairs.length - 1;
    o.forEach(function (x, i) { if (st[i] && !x[1]) tried = true; });
    return '<div class="stepbar">' + a.pairs.map(function (r, j) { return '<i class="' + (j < T.round ? 'on' : (j === T.round ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
      '<div class="card"><p class="q">' + esc(BEP_TXT.hiloQ) + '</p><p class="qsub">Cặp ' + (T.round + 1) + '/' + a.pairs.length + '</p><div class="hilo">' +
      o.map(function (x, i) { var ch = st[i]; return '<button type="button" class="hl' + (ch ? (x[1] ? ' hl--ok' : ' hl--no') : '') + (solved ? ' hl--show' : '') + '" data-act="hilo" data-i="' + i + '" data-hi="' + x[1] + '"' + (solved || ch ? ' disabled' : '') + '><b>' + esc(x[0][0]) + '</b><small>100 g</small>' + (solved || ch ? '<span class="hl__k">' + fmtK(x[0][1]) + ' kcal</span>' : '') + '</button>'; }).join('<span class="hilo__vs">hay</span>') + '</div></div>' +
      (solved ? '<div class="fb fb--ok"><b>Đúng rồi!</b> ' + esc(P.why) + '</div>' + (last ? shinSays('think', esc(BEP_TXT.hiloEnd), 46) + '<p class="ps-small">' + esc(BEP_TXT.hiloSrc) + '</p><button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '<button type="button" class="btn btn--w" data-act="hiloNext">Cặp tiếp theo</button>') :
        (tried ? '<div class="fb fb--no"><b>Thử lại nhé.</b> Món này nhẹ hơn. Chạm món còn lại.</div>' : ''));
  }

  /* ---------- tìm việc chưa ổn trong một ngày ---------- */
  function viewDay(a) {
    var nErr = 0, nF = 0; a.items.forEach(function (it, i) { if (it.err) { nErr++; if (T.found[i]) nF++; } });
    var all = nF === nErr, hint = T.miss >= 2 && !all, show = T.miss >= 4 && !all;
    return '<div class="card"><p class="qsub">' + esc(BEP_TXT.dayIntro) + '</p><p class="q">Tìm được ' + nF + '/' + nErr + ' việc chưa ổn</p><ol class="dayl">' +
      a.items.map(function (it, i) {
        var f = T.found[i] || (show && it.err), okT = T.okTap[i] && !it.err;
        return '<li><button type="button" class="dl' + (f ? ' dl--err' : '') + (okT ? ' dl--ok' : '') + (hint && it.err && !f ? ' dl--hint' : '') + '" data-act="dayTap" data-i="' + i + '"' + (f || okT ? ' aria-pressed="true"' : '') + '><span class="dl__h">' + esc(it.h) + '</span><span class="dl__b"><span class="dl__t">' + esc(it.t) + '</span>' +
          (f ? '<span class="dl__n">' + PS.icon('close', 13, 3) + esc(it.n) + '</span><small>' + esc(it.why) + '</small>' : '') + (okT ? '<small class="dl__ok">' + esc(BEP_TXT.dayOk + it.ok) + '</small>' : '') + '</span></button></li>';
      }).join('') + '</ol>' + (hint && !show ? '<p class="hintl">' + ic('bulb', 15) + esc(BEP_TXT.dayHint) + '</p>' : '') + '</div>' +
      (all || show ? '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : (T.miss >= 3 ? '<button type="button" class="link" data-act="dayShow">Xem đáp án</button>' : ''));
  }

  /* ---------- cam kết 21 ngày ---------- */
  function viewCommit(a) {
    var own = T.hab === HABITS.length, tip = T.hab >= 0 && !own ? [HABITS[T.hab].tip] : ['Khi …, mình sẽ …'];
    if (own) tip = [];
    return commitCard() + shinSays('encourage', esc(BEP_TXT.commitSay), 50) +
      '<div class="card"><p class="q">' + esc(BEP_TXT.commitQ) + '</p><div class="opts">' + HABITS.map(function (x, i) { var on = T.hab === i; return '<button type="button" class="opt' + (on ? ' on' : '') + '" data-act="cHab" data-i="' + i + '"><span class="dot">' + (on ? PS.icon('check', 13, 3) : '') + '</span>' + esc(x.t) + '</button>'; }).join('') +
      '<button type="button" class="opt' + (own ? ' on' : '') + '" data-act="cHab" data-i="' + HABITS.length + '"><span class="dot">' + (own ? PS.icon('check', 13, 3) : '') + '</span>' + esc(BEP_TXT.commitOwn) + '</button></div>' +
      (S.food.commit && T.hab >= 0 && (T.hab < HABITS.length ? HABITS[T.hab].t : T.own) !== S.food.commit.h ? '<p class="qsub" style="margin:10px 0 0">Chọn thói quen khác sẽ bắt đầu lại 21 ngày.</p>' : '') +
      (own ? '<input class="inp" id="cOwn" maxlength="80" placeholder="Ví dụ: Ăn chậm, không xem điện thoại khi ăn" value="' + esc(T.own) + '" style="margin-top:10px">' : '') + '</div>' +
      (T.hab >= 0 ? writeBox(BEP_TXT.commitW, BEP_TXT.commitSub, T.hab < HABITS.length ? tip : []) +
        '<button type="button" class="btn btn--go btn--w" data-act="finish" id="wDone"' + (words(T.txt) >= 3 ? '' : ' disabled') + '>' + ic('cal', 18) + 'Bắt đầu 21 ngày</button>' +
        '<p class="ps-small" style="text-align:center">Mỗi ngày làm được, chạm “' + esc(BEP_TXT.commitBtn) + '” ở khu Bếp hoặc Sổ tay.</p>' : '');
  }

  /* =========================================================
     BẾP ĐỢT 2 (TC01.0.4): match (ghép cặp) · basket (giỏ konbini) · label (đọc nhãn) · shift (giờ ăn theo ca) · bento (hộp cơm) · date (hạn dùng)
     ========================================================= */
  function idxs(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function zName(k) { for (var i = 0; i < PLATE_Z.length; i++) if (PLATE_Z[i].k === k) return PLATE_Z[i].n; return k; }
  function jpName(x) { var rd = x.k ? x.k + (x.r ? ' · ' + x.r : '') : (x.r || ''); return '<span class="jp">' + esc(x.j) + '</span>' + (rd ? '<small class="jpr">' + esc(rd) + '</small>' : ''); }

  /* ---------- ghép cặp món Việt – món Nhật ---------- */
  function viewMatch(a) {
    var n = a.pairs.length, nd = 0, i; for (i = 0; i < n; i++) if (T.mm[i]) nd++;
    var all = nd === n, L = seedShuffle(idxs(n), a.id + 'v'), R = seedShuffle(idxs(n), a.id + 'j'), last = T.mlast >= 0 ? a.pairs[T.mlast] : null;
    return '<div class="card"><p class="q">' + esc(a.q) + '</p><p class="qsub">' + esc(a.sub) + ' Đã ghép ' + nd + '/' + n + '.</p><div class="mt"><div class="mt__col">' +
      L.map(function (i) { var d = T.mm[i]; return '<button type="button" class="mt__b' + (d ? ' mt__b--ok' : '') + (T.ms === i ? ' on' : '') + '" data-act="mtV" data-i="' + i + '"' + (d ? ' disabled' : '') + '><b>' + esc(a.pairs[i].v) + '</b></button>'; }).join('') +
      '</div><div class="mt__col">' +
      R.map(function (i) { var d = T.mm[i]; return '<button type="button" class="mt__b mt__b--j' + (d ? ' mt__b--ok' : '') + (T.mw === i ? ' mt__b--no' : '') + (T.ms >= 0 && !d ? ' mt__b--ready' : '') + '" data-act="mtJ" data-i="' + i + '"' + (d ? ' disabled' : '') + '>' + jpName(a.pairs[i]) + '</button>'; }).join('') +
      '</div></div>' + (T.ms >= 0 ? '<p class="pfl">' + (a.sel ? TK(a.sel) : BEP2_TXT.matchSel).replace('[Món]', '<b>' + esc(a.pairs[T.ms].v) + '</b>') + '</p>' : '') + '</div>' +
      (T.mw >= 0 ? '<div class="fb fb--no">' + esc(a.no ? TK(a.no) : BEP2_TXT.matchNo) + '</div>' : (last ? '<div class="fb fb--ok"><b>Đúng rồi!</b> ' + esc(last.v) + ' ≈ <span class="jp">' + esc(last.j) + '</span>. ' + esc(last.why) + '</div>' : '')) +
      (all ? shinSays('cheer', esc(a.end ? TK(a.end) : BEP2_TXT.matchEnd), 50) + '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '');
  }

  /* ---------- giỏ konbini ---------- */
  function bkSum(a, sel) {
    var t = 0, g = {}, w = [], names = [];
    a.items.forEach(function (it, i) { if (sel[i]) { t += it.p; names.push(it.v); it.g.forEach(function (x) { g[x] = 1; }); if (it.w) w.push(it.w); } });
    var miss = ['tb', 'dam', 'rau'].filter(function (x) { return !g[x]; });
    return { t: t, g: g, w: w, names: names, miss: miss, ok: !miss.length && t > 0 && t <= a.budget };
  }
  function viewBasket(a) {
    var B = bkSum(a, T.bk), over = B.t - a.budget, pct = Math.min(100, Math.round(B.t / a.budget * 100));
    var msg = '';
    if (over > 0) msg = '<div class="fb fb--no"><b>Thử lại nhé.</b> ' + esc(BEP2_TXT.bkOver.replace('[N]', over)) + '</div>';
    else if (B.t && B.miss.length) msg = '<p class="pfl bk__need">' + esc(BEP2_TXT.bkNeed.replace('[Nhóm]', B.miss.map(function (k) { return ZN[k]; }).join(', '))) + '</p>';
    return '<div class="card"><p class="q">' + esc(a.q) + '</p><p class="qsub">' + esc(a.sub) + '</p>' +
      '<div class="bk__top"><div class="bk__bar' + (over > 0 ? ' bk__bar--over' : '') + '"><i style="width:' + pct + '%"></i></div>' +
      '<div class="bk__sum"><span>' + esc(BEP2_TXT.bkTotal) + ' <b>' + fmtK(B.t) + ' yên</b></span><span>' + (over > 0 ? '' : esc(BEP2_TXT.bkLeft) + ' <b>' + fmtK(a.budget - B.t) + ' yên</b>') + '</span></div>' +
      '<div class="bk__g">' + ['tb', 'dam', 'rau'].map(function (k) { return '<span class="bk__p' + (B.g[k] ? ' on' : '') + '">' + (B.g[k] ? PS.icon('check', 12, 3) : '') + esc(zName(k)) + '</span>'; }).join('') + '</div></div>' +
      '<div class="bk">' + a.items.map(function (it, i) { var on = !!T.bk[i]; return '<button type="button" class="bk__i' + (on ? ' on' : '') + '" data-act="bkI" data-i="' + i + '" aria-pressed="' + on + '"><span class="bk__j jp">' + esc(it.j) + '</span>' + (it.k ? '<small class="jpr">' + esc(it.k) + '</small>' : '') + '<b>' + esc(it.v) + '</b><span class="bk__pr">' + it.p + ' yên</span>' + (on ? '<span class="bk__ck">' + PS.icon('check', 12, 3) + '</span>' : '') + '</button>'; }).join('') + '</div></div>' +
      msg + (B.ok ? shinSays('cheer', esc(BEP2_TXT.bkDone.replace('[N]', fmtK(a.budget - B.t))) + (B.w.length ? '<br><small>' + esc(B.w.join(' ')) + '</small>' : ''), 50) +
        '<div class="card bk__money">' + ic('bowl', 18) + '<p>' + esc(BEP2_TXT.bkMoney.replace('[T]', fmtK(B.t)).replace('[D]', a.days).replace('[M]', fmtK(B.t * a.days))) + '</p></div>' +
        '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '');
  }

  /* ---------- đọc nhãn 栄養成分表示 ---------- */
  function viewLabel(a) {
    var R = a.rounds[T.round], okK = String(R.ok), solved = !!T.lk[T.round], last = T.round >= a.rounds.length - 1;
    function row(key, j, rd, n, v, cls) {
      var isOk = solved && key === okK, isW = !solved && T.lw === key, seen = T.lseen[key];
      return '<button type="button" class="lb__r' + (cls ? ' ' + cls : '') + (isOk ? ' lb__r--ok' : '') + (isW ? ' lb__r--no' : '') + '" data-act="lbR" data-k="' + key + '"' + (solved ? ' disabled' : '') + '><span class="lb__j"><span class="jp">' + esc(j) + '</span>' + (rd ? '<small class="jpr">' + esc(rd) + '</small>' : '') + (seen ? '<small class="lb__v">' + esc(v) + '</small>' : '') + '</span>' + (n ? '<span class="lb__n">' + esc(n) + '</span>' : '') + '</button>';
    }
    var wv = '';
    if (!solved && T.lw !== '') wv = T.lw === 'p' ? a.perV : a.rows[+T.lw].v;
    return '<div class="stepbar">' + a.rounds.map(function (r, j) { return '<i class="' + (j < T.round ? 'on' : (j === T.round ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
      '<div class="card"><p class="q">' + esc(R.q) + '</p><p class="qsub">Nhãn trên ' + esc(a.prodV) + ' <span class="jp">' + esc(a.prod) + '</span></p>' +
      '<div class="lb"><div class="lb__h"><span class="jp">栄養成分表示</span><small class="jpr">えいようせいぶんひょうじ · ' + esc(BEP2_TXT.lbHead) + '</small></div>' +
      row('p', a.per, '', '', a.perV, 'lb__r--per') + a.rows.map(function (r, i) { return row(String(i), r.j, r.r, r.n, r.v); }).join('') + '</div>' +
      '<p class="ps-small">' + esc(BEP2_TXT.lbSrc) + '</p></div>' +
      (solved ? '<div class="fb fb--ok"><b>Đúng rồi!</b> ' + esc(R.why) + '</div>' + (last ? shinSays('cheer', esc(BEP2_TXT.lbEnd), 48) + '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '<button type="button" class="btn btn--w" data-act="lbNext">Câu tiếp theo</button>') :
        (wv ? '<div class="fb fb--no"><b>Thử lại nhé.</b> ' + esc(BEP2_TXT.lbNo.replace('Thử lại nhé. ', '')) + '<b>' + esc(wv) + '</b>.</div>' : ''));
  }

  /* ---------- giờ ăn theo ca ---------- */
  function hh(x) { x = ((x % 24) + 24) % 24; var h = Math.floor(x), m = Math.round((x - h) * 60); return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m; }
  function mod24(x) { return ((x % 24) + 24) % 24; }
  function shiftPlan(s, l) {
    var out = [], e = s + l, eh = mod24(e);
    out.push({ t: s - 1, n: BEP2_TXT.shBefore, d: BEP2_TXT.shBeforeD, main: 1 });
    if (l >= 5) {
      var mid = s + Math.round(l / 2), mh = mod24(mid), main = l >= 8 && ((mh >= 11 && mh <= 14) || (mh >= 17 && mh <= 20));
      out.push({ t: mid, n: main ? BEP2_TXT.shMidMain : BEP2_TXT.shMidLight, d: BEP2_TXT.shMidD, main: main ? 1 : 0 });
    }
    if (eh >= 17 && eh <= 20) out.push({ t: e + 0.5, n: BEP2_TXT.shAfterMain, d: BEP2_TXT.shAfterDM, main: 1 });
    else if (eh >= 21 || eh <= 9) out.push({ t: e + 0.5, n: BEP2_TXT.shAfterLight, d: BEP2_TXT.shAfterD, main: 0 });
    else out.push({ t: e + 0.5, n: 'Sau ca: ăn nhẹ nếu đói', d: 'Bữa tối vẫn ăn đủ, đúng giờ.', main: 0 });
    return out;
  }
  function shiftBar(s, l, plan) {
    var segs = [], e = s + l;
    if (e <= 24) segs.push([s, l]); else { segs.push([s, 24 - s]); segs.push([0, e - 24]); }
    return '<div class="sh__bar" aria-hidden="true">' + segs.map(function (g) { return '<i class="sh__ca" style="left:' + (g[0] / 24 * 100) + '%;width:' + (g[1] / 24 * 100) + '%"></i>'; }).join('') +
      plan.map(function (p) { return '<b class="sh__m' + (p.main ? '' : ' sh__m--l') + '" style="left:' + (mod24(p.t) / 24 * 100) + '%"></b>'; }).join('') + '</div>' +
      '<div class="sh__ax"><span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span></div>';
  }
  function viewShift(a) {
    var H = T.sh, plan = H ? shiftPlan(H.s, H.l) : null;
    return '<div class="card"><p class="q">' + esc(BEP2_TXT.shQ) + '</p><p class="qsub">' + esc(BEP2_TXT.shSub) + '</p><div class="chips">' +
      SHIFTS.map(function (x, i) { return '<button type="button" class="chip' + (H && H.pre === i ? ' on' : '') + '" data-act="shPre" data-i="' + i + '">' + esc(x.n) + ' <small>' + hh(x.s).slice(0, 2) + '–' + hh(x.s + x.l).slice(0, 2) + 'h</small></button>'; }).join('') + '</div>' +
      (H ? '<div class="sh__st"><div><small>Bắt đầu</small><span class="sh__ctl"><button type="button" class="sh__pm" data-act="shS" data-d="-1" aria-label="Sớm hơn 1 giờ">−</button><b>' + hh(H.s) + '</b><button type="button" class="sh__pm" data-act="shS" data-d="1" aria-label="Muộn hơn 1 giờ">+</button></span></div>' +
        '<div><small>Số giờ</small><span class="sh__ctl"><button type="button" class="sh__pm" data-act="shL" data-d="-1" aria-label="Bớt 1 giờ">−</button><b>' + H.l + ' giờ</b><button type="button" class="sh__pm" data-act="shL" data-d="1" aria-label="Thêm 1 giờ">+</button></span></div></div>' +
        '<p class="ps-small sh__end">Kết thúc lúc <b>' + hh(H.s + H.l) + '</b>' + (H.s + H.l > 24 ? ' (sáng hôm sau)' : '') + '</p>' : '') + '</div>' +
      (H ? '<div class="card"><p class="q">Giờ ăn của bạn</p>' + shiftBar(H.s, H.l, plan) +
        '<ol class="sh__l">' + plan.map(function (p) { return '<li class="' + (p.main ? '' : 'lt') + '"><span class="sh__t">' + hh(p.t) + '</span><span><b>' + esc(p.n) + '</b><small>' + esc(p.d) + '</small></span></li>'; }).join('') +
        '<li class="wt"><span class="sh__t">' + ic('drop', 16) + '</span><span><b>' + esc(BEP2_TXT.shWater) + '</b>' + (H.l < 5 ? '<small>' + esc(BEP2_TXT.shShort) + '</small>' : '') + '</span></li></ol></div>' +
        shinSays('think', esc(BEP2_TXT.shSay), 46) + '<button type="button" class="btn btn--go btn--w" data-act="finish">Lưu giờ ăn của mình</button>' : '');
  }

  /* ---------- hộp cơm mang đi ---------- */
  function bentoBox(a) {
    return '<div class="bento">' + a.slots.map(function (s) { var i = T.bt[s.k], has = i >= 0; return '<div class="bento__c bento__c--' + s.k + (has ? ' on' : '') + '"><small>' + esc(s.n) + '</small>' + (has ? '<b>' + esc(s.opts[i].t) + '</b>' : '<b class="bento__e">…</b>') + '</div>'; }).join('') + '</div>';
  }
  function viewBento(a) {
    var nOk = 0; a.slots.forEach(function (s) { if (T.bt[s.k] >= 0) nOk++; });
    var all = nOk === a.slots.length, g = grp(), gt = BAI_BY.d5 && BAI_BY.d5.gtip ? BAI_BY.d5.gtip[g] : '';
    return '<div class="card"><p class="q">' + esc(a.q) + '</p><p class="qsub">' + esc(a.sub) + '</p>' + bentoBox(a) + '</div>' +
      a.slots.map(function (s) {
        var ord = seedShuffle(idxs(s.opts.length), a.id + s.k), bw = T.bw && T.bw.k === s.k ? T.bw.i : -1;
        return '<div class="card bt__s"><p class="bt__q"><i class="bt__dot bt__dot--' + s.k + '"></i>' + esc(s.n) + (T.bt[s.k] >= 0 ? '<span class="bt__ok">' + PS.icon('check', 14, 3) + '</span>' : '') + '</p><div class="chips">' +
          ord.map(function (i) { var o = s.opts[i]; return '<button type="button" class="chip' + (T.bt[s.k] === i ? ' on' : '') + (bw === i ? ' chip--no' : '') + '" data-act="btO" data-k="' + s.k + '" data-i="' + i + '">' + esc(o.t) + '</button>'; }).join('') + '</div>' +
          (bw >= 0 ? '<div class="fb fb--no"><b>Thử lại nhé.</b> ' + esc(s.opts[bw].no) + '</div>' : '') + '</div>';
      }).join('') +
      (all ? shinSays('cheer', esc(BEP2_TXT.btEnd), 50) + '<div class="card"><ol class="bt__safe">' + a.safe.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' +
        (gt && GROUPS[g] ? '<div class="gtip"><span class="gtip__ic">' + ic(GROUPS[g].ic, 20) + '</span><div><small>Với nhóm ' + esc(GROUPS[g].n) + '</small>' + esc(gt) + '</div></div>' : '') + '</div>' +
        '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '');
  }
  function bentoLine(b) { var a = actById('d5c'); if (!b || !a) return ''; var L = []; a.slots.forEach(function (s) { if (b[s.k] >= 0 && s.opts[b[s.k]]) L.push(s.opts[b[s.k]].t); }); return L.join(', '); }

  /* ---------- hạn dùng 消費期限 / 賞味期限 ---------- */
  function viewDate(a) {
    var it = a.items[T.round], L = DATE_LAB[it.lab], P = T.pick, solved = P >= 0 && (P === it.ok), last = T.round >= a.items.length - 1;
    var hint = it.note ? BEP2_TXT.dtHint.note : BEP2_TXT.dtHint[it.lab];
    return '<div class="card dt__intro"><p class="q">' + esc(BEP2_TXT.dtIntro) + '</p><div class="dt2">' +
      ['shohi', 'shomi'].map(function (k) { var D = DATE_LAB[k]; return '<div class="dt2__b dt2__b--' + k + '"><span class="jp">' + esc(D.j) + '</span><small class="jpr">' + esc(D.k) + '</small><b>' + esc(D.n) + '</b><small>' + esc(D.d) + '</small></div>'; }).join('') +
      '</div><p class="ps-small">' + esc(BEP2_TXT.dtFmt) + '</p></div>' +
      '<div class="stepbar">' + a.items.map(function (r, j) { return '<i class="' + (j < T.round ? 'on' : (j === T.round ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
      '<div class="card"><p class="qsub">' + ic('cal', 14) + ' ' + esc(BEP2_TXT.dtToday) + ' <b>' + esc(a.todayV) + '</b> (<span class="jp">' + esc(a.today) + '</span>)</p>' +
      '<div class="pk"><div class="pk__n">' + jpName(it) + '<b>' + esc(it.v) + '</b></div><div class="pk__lab"><span class="jp">' + esc(L.j) + '</span><b class="pk__d">' + esc(it.d) + '</b></div>' +
      (it.note ? '<p class="pk__note">' + ic('alert', 14) + esc(it.note) + '</p>' : '') + '</div>' +
      '<div class="dt__btns">' + [[1, BEP2_TXT.dtYes], [0, BEP2_TXT.dtNo]].map(function (o) { var on = P === o[0]; return '<button type="button" class="opt' + (on ? (o[0] === it.ok ? ' opt--ok' : ' opt--no') : '') + '" data-act="dtP" data-v="' + o[0] + '"' + (solved ? ' disabled' : '') + '><span class="dot">' + (on ? PS.icon(o[0] === it.ok ? 'check' : 'close', 13, 3) : '') + '</span>' + esc(o[1]) + '</button>'; }).join('') + '</div></div>' +
      (solved ? '<div class="fb fb--ok"><b>Đúng rồi!</b> ' + esc(it.why) + '</div>' + (last ? shinSays('think', esc(BEP2_TXT.dtEnd), 46) + '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '<button type="button" class="btn btn--w" data-act="dtNext">Món tiếp theo</button>') :
        (P >= 0 ? '<div class="fb fb--no"><b>Thử lại nhé.</b> ' + esc(hint) + '</div>' : ''));
  }

  /* =========================================================
     GÓC NGHỀ (TC01.0.5): body (bản đồ cơ thể) · ladder (tự định vị 4 nhóm cơ) · story (Senpai kể + hỏi dồn "vì sao" + viết)
     Dữ liệu học viên ở S.nghe (body, lad). Câu riêng nghề: tra mã nghề trước, không có thì tra nhóm.
     ========================================================= */
  function jobS() { return S.mem && S.mem.job ? S.mem.job : ''; }
  function byJG(M) { return M[jobS()] || M[grp()] || M.xuong; }
  function zoneOf(k) { for (var i = 0; i < BODY_Z.length; i++) if (BODY_Z[i].k === k) return BODY_Z[i]; return null; }
  function ladOf(k) { for (var i = 0; i < LAD_G.length; i++) if (LAD_G[i].k === k) return LAD_G[i]; return null; }
  function jobOrGrpName() { var j = jobOf(jobS()); return BODY_NEED[jobS()] && j ? 'nghề ' + j.n : 'nhóm ' + grpName(grp()); }

  /* ---------- bản đồ cơ thể ---------- */
  function viewBody(a) {
    var sel = T.bz, need = byJG(BODY_NEED), nk = need.map(function (x) { return x[0]; }), res = T.bres, hit = 0;
    sel.forEach(function (k) { if (nk.indexOf(k) >= 0) hit++; });
    var ov = '';
    BODY_Z.forEach(function (z) {
      var on = sel.indexOf(z.k) >= 0, nd = res && nk.indexOf(z.k) >= 0;
      z.pts.forEach(function (p) { ov += '<g class="bz' + (on ? ' bz--on' : '') + (nd ? ' bz--need' : '') + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="9.5" data-act="bdZ" data-k="' + z.k + '"/></g>'; });
    });
    var svg = fig('jjClose', { label: NGHE_TXT.bodyQ, ground: false }).replace('viewBox="0 0 240 180"', 'viewBox="66 2 108 174"').replace('</svg>', ov + '</svg>');
    return '<div class="card"><p class="q">' + esc(NGHE_TXT.bodyQ) + '</p><p class="qsub">' + esc(NGHE_TXT.bodySub) + ' Đã chọn ' + sel.length + '/3.</p>' +
      '<div class="bdwrap"><div class="figbox figbox--body">' + svg + '</div><div class="bdl">' +
      BODY_Z.map(function (z) { var on = sel.indexOf(z.k) >= 0, nd = res && nk.indexOf(z.k) >= 0; return '<button type="button" class="chip bdc' + (on ? ' on' : '') + (nd ? ' bdc--need' : '') + '" data-act="bdZ" data-k="' + z.k + '">' + esc(z.n) + '</button>'; }).join('') +
      '</div></div></div>' +
      (res ? '<div class="card"><p class="q">' + esc(NGHE_TXT.bodyRes) + '</p><p class="qsub">Theo ' + esc(jobOrGrpName()) + '. ' + esc(NGHE_TXT.bodyMatch.replace('[N]', hit)) + '</p><ol class="found">' +
          need.map(function (x) { var z = zoneOf(x[0]); return '<li' + (sel.indexOf(x[0]) >= 0 ? ' class="hit"' : '') + '><b>' + esc(z.n) + '</b><small>' + esc(x[1]) + '</small></li>'; }).join('') + '</ol></div>' +
          shinSays('encourage', esc(NGHE_TXT.bodyEnd), 50) + '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' :
        '<button type="button" class="btn btn--go btn--w" data-act="bdSee"' + (sel.length === 3 ? '' : ' disabled') + '>' + esc(NGHE_TXT.bodySee) + '</button>');
  }

  /* ---------- tự định vị 4 nhóm cơ ---------- */
  function recTxt(ex) { var b = best(ex); if (!b) return ''; return MOC[ex] && MOC[ex].u === 's' ? fmtT(b) : b + ' cái'; }
  function viewLadder(a) {
    var L = T.lad, all = true; LAD_G.forEach(function (g) { if (!(L[g.k] >= 0)) all = false; });
    var need = byJG(LAD_NEED), out = '';
    if (T.lres) {
      var gaps = need.filter(function (k) { return L[k] <= 1; });
      out = '<div class="card"><p class="q">' + esc(NGHE_TXT.ladNeed) + '</p><p class="qsub">Theo ' + esc(jobOrGrpName()) + '.</p><ul class="kv">' +
        need.map(function (k) { var g = ladOf(k); return '<li><span>' + esc(g.n) + ' · ' + esc(g.d.toLowerCase()) + '</span><b>' + esc(NGHE_TXT.ladLv[L[k]]) + '</b></li>'; }).join('') + '</ul>' +
        (gaps.length ? gaps.map(function (k) { var g = ladOf(k), B = BAI_BY[g.bai]; return '<button type="button" class="gapb" data-act="bai" data-id="' + g.bai + '">' + ic(B.ic, 18) + '<span>' + esc(NGHE_TXT.ladGap.replace('[Nhóm]', g.n).replace('[Bài]', B.t)) + '</span>' + PS.icon('next', 16) + '</button>'; }).join('') : '<p class="cmt__ok">' + PS.icon('check', 15, 3) + esc(NGHE_TXT.ladOk) + '</p>') + '</div>' +
        '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>';
    }
    return '<div class="card"><p class="q">' + esc(NGHE_TXT.ladQ) + '</p><p class="qsub">' + esc(NGHE_TXT.ladSub) + '</p>' +
      LAD_G.map(function (g) { var r = recTxt(g.ex);
        return '<div class="lad"><div class="lad__h"><b>' + esc(g.n) + '</b><small>' + esc(g.d) + (r ? ' · ' + esc(NGHE_TXT.ladRec) + esc(r) + ' (' + esc(EX[g.ex].n) + ')' : '') + '</small></div><div class="lad__s" role="radiogroup" aria-label="' + esc(g.n) + '">' +
          NGHE_TXT.ladLv.map(function (t, i) { var on = L[g.k] === i; return '<button type="button" role="radio" aria-checked="' + on + '" class="lad__b lad__b--' + i + (on ? ' on' : '') + '" data-act="ladP" data-k="' + g.k + '" data-v="' + i + '"><i></i>' + esc(t) + '</button>'; }).join('') + '</div></div>';
      }).join('') + '</div>' +
      (T.lres ? out : '<button type="button" class="btn btn--go btn--w" data-act="ladSee"' + (all ? '' : ' disabled') + '>' + esc(NGHE_TXT.ladSee) + '</button>');
  }
  function ngheTips() {
    var tips = [], L = (S.nghe && S.nghe.lad) || {}, need = byJG(LAD_NEED), bz = byJG(BODY_NEED);
    need.forEach(function (k) { var g = ladOf(k); if (L[k] <= 1 || !(L[k] >= 0)) tips.push('Trước khi bay mình cần khỏe thêm ' + g.n.toLowerCase() + ', vì nghề mình phải ' + g.d.toLowerCase()); });
    if (bz[0]) { var z = zoneOf(bz[0][0]); tips.push('Mình sẽ giữ ' + z.n.toLowerCase() + ' bằng cách làm đúng tư thế và tập đều mỗi tuần'); }
    return tips;
  }

  /* ---------- Senpai kể + hỏi dồn "vì sao" + viết ---------- */
  function viewStory(a) {
    var R = a.rounds, done = T.round >= R.length, h = '<div class="card story"><span class="story__lab">' + ic('pen', 14) + esc(NGHE_TXT.storyLab) + '</span>' +
      a.story.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>';
    if (!done) {
      var Q = R[T.round], ord = seedShuffle(Q.opts.map(function (o, i) { return i; }), a.id + 's' + T.round), P = T.pick, ch = P >= 0 ? Q.opts[P] : null;
      h += '<div class="stepbar">' + R.map(function (r, j) { return '<i class="' + (j < T.round ? 'on' : (j === T.round ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
        '<div class="card"><p class="qsub">Câu hỏi ' + (T.round + 1) + '/' + R.length + ' · Hỏi tiếp “vì sao”</p><p class="q">' + esc(Q.q) + '</p><div class="opts">' + ord.map(function (i) {
          var o = Q.opts[i], on = P === i;
          return '<button type="button" class="opt' + (on ? (o.ok ? ' opt--ok' : ' opt--no') : '') + '" data-act="pick" data-i="' + i + '"' + (ch && ch.ok ? ' disabled' : '') + '><span class="dot">' + (on ? PS.icon(o.ok ? 'check' : 'close', 13, 3) : '') + '</span>' + esc(o.t) + '</button>';
        }).join('') + '</div></div>' +
        (ch ? (ch.ok ? '<div class="fb fb--ok">' + esc(ch.why) + '</div><button type="button" class="btn btn--w" data-act="pickNext">' + (T.round < R.length - 1 ? 'Câu tiếp theo' : 'Viết ra') + '</button>' :
          '<div class="fb fb--no"><b>Thử lại nhé.</b> ' + esc(ch.why) + '</div><p class="qsub" style="text-align:center">Thử chọn lại một cách khác.</p>') : '');
      return h;
    }
    return h + shinSays('think', esc(a.end), 48) + writeBox(a.w ? TK(a.w) : NGHE_TXT.storyW, NGHE_TXT.storySub, a.tips) +
      '<button type="button" class="btn btn--go btn--w" data-act="finish" id="wDone"' + (words(T.txt) >= 3 ? '' : ' disabled') + '>Lưu và hoàn thành</button>';
  }
  function kgInfo() {
    var m = S.mem || {}, w = num(m.w), nu = m.sex === 'nu';
    if (!(w >= 30)) return null;
    return { w: w, kg: Math.round(w * (nu ? 0.24 : 0.4)), nu: nu };
  }
  function kgCard() {
    var K = kgInfo();
    return '<div class="card kgc"><div class="kgc__top">' + ic('arm', 20) + '<b>' + esc(NGHE_TXT.kgCard) + '</b></div>' +
      (K ? '<p class="kgc__n">khoảng <b>' + K.kg + ' kg</b><small>(cân nặng ' + fmtL(K.w) + ' kg, mốc ' + (K.nu ? 'nữ' : 'nam') + ')</small></p>' : '<p class="ps-small">' + esc(NGHE_TXT.kgNo) + '</p>') +
      '<p class="ps-small">' + esc(NGHE_TXT.kgNam) + ' ' + esc(NGHE_TXT.kgNu) + '</p><p class="kgc__rule">' + esc(NGHE_TXT.kgRule) + '</p><p class="ps-small kgc__src">' + esc(NGHE_TXT.kgSrc) + '</p></div>';
  }
  function kgLine() { var K = kgInfo(); return K ? 'Mức tham khảo của bạn khoảng ' + K.kg + ' kg.' : 'Mức tham khảo: nam khoảng 40% cân nặng.'; }
  function ngheSum() { var n = S.nghe || {}, fl = 0, k; for (k in (n.fl || {})) if (n.fl.hasOwnProperty(k)) fl += n.fl[k];
    return { body: n.body || [], lad: n.lad || null, flow: fl, school: n.ca && n.ca.sch >= 0 ? SCHOOL_DAY[n.ca.sch][0] : '', habit: n.habit ? n.habit.h : '', week: n.week ? weekLine(n.week) : '' }; }

  /* =========================================================
     GÓC NGHỀ ĐỢT 2 (TC01.0.6): flow (tập theo Shin, đếm giờ) · ca (một ca của nhóm + ngày học 8–17 giờ) · habit (chọn 1 thói quen) · week (lịch bài bổ trợ)
     Lưu ở S.nghe: fl {id: số lần}, ca {g, sel, sch}, habit {h, txt, at}, week {days, slot, txt, at}
     ========================================================= */
  function exOf(a) {
    if (!a.exBy) return a.ex;
    return (a.exBy[grp()] || a.exBy.xuong).map(function (x) { return x === 'pushup' && sexKey() === 'nu' ? 'kneepush' : x; });
  }
  function capFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function grpFill(s) { return String(s).replace('[Nhóm]', grpName(grp() || 'xuong')); }

  /* ---------- tập theo Shin, đếm giờ ---------- */
  var FLT = null;
  function flStop() { if (FLT) { clearInterval(FLT); FLT = null; } }
  function flPause() { var F = T.fl; if (F && F.run) { F.rem = Math.max(0, F.end - Date.now()); F.run = false; } flStop(); }
  function flRun() {
    var a = actById(V.a), F = T.fl; if (!a || !F) return;
    F.end = Date.now() + (F.rem >= 0 ? F.rem : a.sec * 1000); F.rem = -1; F.run = true; flStop();
    FLT = setInterval(function () {
      var A = actById(V.a); if (!A || A.k !== 'flow' || !T.fl || !T.fl.run) { flStop(); return; }
      var left = Math.max(0, T.fl.end - Date.now()), c = $('#flClock'), b = $('#flBar');
      if (c) c.textContent = Math.ceil(left / 1000);
      if (b) b.style.width = (100 - left / (A.sec * 1000) * 100) + '%';
      if (left <= 0) flNext();
    }, 200);
  }
  function flNext() {
    var a = actById(V.a), F = T.fl, n = EX[a.fx].frames.length;
    F.i++; F.rem = -1; tick();
    if (F.i >= n) { F.run = false; flStop(); render(true); return; }
    flRun(); render();
  }
  function viewFlow(a) {
    var E = EX[a.fx], F = T.fl, n = E.frames.length, tot = n * a.sec;
    if (F.i < 0) {
      return '<div class="card"><p class="q">' + esc(E.n) + '</p><p class="qsub">' + n + ' động tác · mỗi động tác ' + a.sec + ' giây · khoảng ' + esc(fmtT(tot)) + '</p><ol class="fll">' +
        E.frames.map(function (fr, i) { return '<li><span class="fll__f">' + frameFig(fr, 74) + '</span><span><b>' + (i + 1) + '. ' + esc(fr.c || fr.t) + '</b><small>' + esc(capFirst(fr.t.replace(/^[^:]{1,24}:\s*/, ''))) + '</small></span></li>'; }).join('') + '</ol></div>' +
        shinSays('hi', esc(NGHE2_TXT.flIntro) + (a.fx === 'preshift' ? '<br><small>' + esc(NGHE2_TXT.flJp) + '</small>' : ''), 50) +
        '<button type="button" class="btn btn--go btn--w" data-act="flStart">' + ic('play', 18) + esc(NGHE2_TXT.flStart) + '</button>';
    }
    if (F.i >= n) {
      return '<div class="card cnt">' + shin('party', 96, 'hop') + '<p class="q">' + esc(NGHE2_TXT.flDone) + '</p><div class="chips" style="justify-content:center">' +
        NGHE2_TXT.flFeel.map(function (f, i) { return '<button type="button" class="chip' + (F.feel === i ? ' on' : '') + (i === 2 ? ' chip--pain' : '') + '" data-act="flFeel" data-i="' + i + '">' + esc(f) + '</button>'; }).join('') + '</div></div>' +
        (F.feel >= 0 ? shinSays(F.feel === 2 ? 'sad' : (F.feel === 1 ? 'think' : 'cheer'), esc(NGHE2_TXT.flSay[F.feel]), 46) : '') +
        '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="flAgain">Tập lại</button><button type="button" class="btn btn--go" data-act="finish"' + (F.feel >= 0 ? '' : ' disabled') + '>Hoàn thành</button></div>';
    }
    var fr = E.frames[F.i], left = F.run ? Math.max(0, F.end - Date.now()) : (F.rem >= 0 ? F.rem : a.sec * 1000);
    return '<div class="stepbar">' + E.frames.map(function (x, j) { return '<i class="' + (j < F.i ? 'on' : (j === F.i ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
      '<div class="card cnt flc"><span class="ah__lab">Động tác ' + (F.i + 1) + '/' + n + '</span><p class="q">' + esc(fr.c || '') + '</p>' +
      '<div class="figbox">' + frameFig(fr) + '</div>' +
      '<div class="flc__t"><b id="flClock">' + Math.ceil(left / 1000) + '</b><small>giây</small></div><div class="flbar"><i id="flBar" style="width:' + (100 - left / (a.sec * 1000) * 100) + '%"></i></div>' +
      '<p class="howc__t">' + esc(fr.t) + '</p></div>' +
      shinSays('encourage', esc(NGHE2_TXT.flCheer[F.i % NGHE2_TXT.flCheer.length]), 42) +
      '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="flPause">' + esc(F.run ? NGHE2_TXT.flPause : NGHE2_TXT.flGo) + '</button><button type="button" class="btn" data-act="flSkip">' + esc(NGHE2_TXT.flSkip) + PS.icon('next', 16) + '</button></div>';
  }

  /* ---------- một ca của nhóm mình + ngày học ở trường ---------- */
  function viewCa(a) {
    var g = grp() || 'xuong', C = CA_DAY[g], sel = T.cs, res = T.cres, hit = 0, G = GROUPS[g];
    sel.forEach(function (i) { if (C.hot[i]) hit++; });
    var rows = '';
    CA_H.forEach(function (h, i) {
      if (h === 13) rows += '<li class="car car--lunch"><span class="car__t">12:00</span><span>' + esc(NGHE2_TXT.caLunch) + '</span></li>';
      var on = sel.indexOf(i) >= 0, hot = res && C.hot[i];
      rows += '<li><button type="button" class="car' + (on ? ' on' : '') + (hot ? ' car--hot' : '') + '" data-act="caS" data-i="' + i + '"' + (res ? ' disabled' : '') + '><span class="car__t">' + (h < 10 ? '0' : '') + h + ':00</span><span><b>' + esc(C.s[i]) + '</b>' +
        (hot ? '<small>' + esc(C.hot[i][0]) + '</small><small class="car__tip">' + ic('bulb', 13) + esc(C.hot[i][1]) + '</small>' : '') + '</span>' +
        (hot ? '<span class="badge">' + esc(NGHE2_TXT.caHot) + '</span>' : (on ? '<span class="car__ck">' + PS.icon('check', 14, 3) + '</span>' : '')) + '</button></li>';
    });
    var h = '<div class="card"><p class="qsub">' + ic(G.ic, 14) + ' Nhóm ' + esc(G.n) + '</p><p class="q">' + esc(grpFill(NGHE2_TXT.caQ)) + '</p><p class="qsub">' + esc(NGHE2_TXT.caSub) + ' Đã chọn ' + sel.length + '/2.</p><ol class="cal">' + rows + '</ol>' +
      (res ? '<p class="cmt__ok">' + esc(NGHE2_TXT.caMatch.replace('[N]', hit)) + '</p><p class="ps-small">' + esc(NGHE2_TXT.caNote) + '</p>' : '') + '</div>';
    if (!res) return h + '<button type="button" class="btn btn--go btn--w" data-act="caSee"' + (sel.length === 2 ? '' : ' disabled') + '>' + esc(NGHE2_TXT.caSee) + '</button>';
    h += '<div class="card"><p class="q">' + esc(NGHE2_TXT.schQ) + '</p><div class="chips">' + SCHOOL_DAY.map(function (x, i) { return '<button type="button" class="chip' + (T.sch === i ? ' on' : '') + '" data-act="caSch" data-i="' + i + '">' + esc(x[0]) + ' <small>' + esc(x[1]) + '</small></button>'; }).join('') + '</div></div>';
    if (T.sch >= 0) h += shinSays('think', esc(NGHE2_TXT.schSay.replace('[Tiết]', SCHOOL_DAY[T.sch][0].toLowerCase())), 46);
    return h + '<button type="button" class="btn btn--go btn--w" data-act="finish"' + (T.sch >= 0 ? '' : ' disabled') + '>Hoàn thành</button>';
  }

  /* ---------- chọn 1 thói quen ---------- */
  function habList(a) { a = a || actById(V.a); var H = a && a.hl ? YHABITS : NHABITS, g = grp() || 'xuong'; return H.all.concat([H[g]]); }
  function viewHabit(a) {
    var L = habList(), own = T.hb === L.length;
    return shinSays('encourage', esc(NGHE2_TXT.habSay), 50) +
      '<div class="card"><p class="q">' + esc(NGHE2_TXT.habQ) + '</p><div class="opts">' + L.map(function (x, i) { var on = T.hb === i; return '<button type="button" class="opt' + (on ? ' on' : '') + '" data-act="hbO" data-i="' + i + '"><span class="dot">' + (on ? PS.icon('check', 13, 3) : '') + '</span>' + esc(x.t) + '</button>'; }).join('') +
      '<button type="button" class="opt' + (own ? ' on' : '') + '" data-act="hbO" data-i="' + L.length + '"><span class="dot">' + (own ? PS.icon('check', 13, 3) : '') + '</span>' + esc(NGHE2_TXT.habOwn) + '</button></div>' +
      (own ? '<input class="inp" id="hbOwn" maxlength="80" placeholder="Ví dụ: Ngồi học thẳng lưng, hai chân chạm sàn" value="' + esc(T.hown) + '" style="margin-top:10px">' : '') + '</div>' +
      (T.hb >= 0 ? writeBox(NGHE2_TXT.habW, NGHE2_TXT.habSub, own ? [] : [L[T.hb].tip]) +
        '<button type="button" class="btn btn--go btn--w" data-act="finish" id="wDone"' + (words(T.txt) >= 3 ? '' : ' disabled') + '>Lưu thói quen của mình</button>' : '');
  }
  function habName() { var L = habList(); return T.hb < L.length ? L[T.hb].t : String(T.hown || '').replace(/^\s+|\s+$/g, ''); }

  /* ---------- lịch tập bài bổ trợ ---------- */
  function setLine(x) { if (MOC[x] && MOC[x].u === 's') return NGHE2_TXT.wkHold; return sexKey() === 'nu' ? NGHE2_TXT.wkNu : NGHE2_TXT.wkNam; }
  function viewWeek(a) {
    var W6 = exOf(actById('n6a')), K = T.wk, okD = K.days.length >= 2, okS = K.slot >= 0;
    return '<div class="card"><p class="q">' + esc(NGHE2_TXT.wkQ) + '</p><p class="qsub">' + ic(GROUPS[grp() || 'xuong'].ic, 14) + ' Nhóm ' + esc(grpName(grp() || 'xuong')) + '</p><ul class="kv">' +
      W6.map(function (x) { return '<li><span>' + esc(EX[x].n) + '</span><b>' + esc(setLine(x)) + '</b></li>'; }).join('') + '</ul>' +
      '<a class="ytbtn" href="' + esc(TC_YT) + '" target="_blank" rel="noopener">' + ic('play', 18) + '<span><b>Xem video của thầy cô GDTC</b><small>Mở kênh video động tác của khóa</small></span>' + PS.icon('ext', 16) + '</a>' +
      '<p class="ps-small" style="margin:10px 0 0">' + esc(NGHE2_TXT.wkKtn) + '</p></div>' +
      '<div class="card"><p class="q">' + esc(NGHE2_TXT.wkDays) + '</p><p class="qsub">' + esc(NGHE2_TXT.wkDaysSub) + (S.plan && S.plan.days ? '<br>' + esc(NGHE2_TXT.wkSan) + '<b>' + esc(S.plan.days.map(function (i) { return DAYS7[i]; }).join(', ')) + '</b>' : '') + '</p>' +
      '<div class="chips chips--days">' + DAYS7.map(function (d, i) { return '<button type="button" class="chip' + (K.days.indexOf(i) >= 0 ? ' on' : '') + '" data-act="wkD" data-i="' + i + '">' + d + '</button>'; }).join('') + '</div>' +
      '<p class="q" style="margin-top:14px">' + esc(NGHE2_TXT.wkSlot) + '</p><div class="chips">' + SLOTS.map(function (s, i) { return '<button type="button" class="chip' + (K.slot === i ? ' on' : '') + '" data-act="wkS" data-i="' + i + '">' + s + '</button>'; }).join('') + '</div></div>' +
      (okD && okS ? writeBox(NGHE2_TXT.wkW, NGHE2_TXT.wkSub, NGHE2_TXT.wkTips) + '<button type="button" class="btn btn--go btn--w" data-act="finish" id="wDone"' + (words(T.txt) >= 3 ? '' : ' disabled') + '>Lưu lịch bổ trợ</button>' : '');
  }
  function weekLine(w) { if (!w || !w.days) return ''; return w.days.map(function (i) { return DAYS7[i]; }).join(', ') + ' · ' + (SLOTS[w.slot] || ''); }


  /* =========================================================
     PHÒNG Y TẾ (TC01.1.1): sim "Ca trực" (rẽ nhánh: mỗi lựa chọn có chuyện xảy ra tiếp riêng; chọn chưa đúng thì xem hậu quả rồi quay lại chọn)
     T.sm = { i: -1 chưa bắt đầu | 0..n-1 tình huống | n xong, pick, tried {i.j: 1}, first (số lần đúng ngay), met (đồng hồ An toàn 10–100) }
     Lưu ở S.yte.sim[id] = { f, n, at } · Thẻ khẩn cấp ở S.kc (chỉ trên máy, không gửi báo cáo)
     ========================================================= */
  function TK(k) { return (RT_TXT[k] != null && BAI_BY[V.b] && BAI_BY[V.b].khu === 'radio' ? RT_TXT[k] : (YTE_TXT[k] != null ? YTE_TXT[k] : NGHE_TXT[k])) || ''; }
  function smMeter(v) {
    var lv = v < 40 ? 0 : (v < 70 ? 1 : 2);
    return '<div class="smm smm--' + lv + '"><span class="smm__l">' + ic('heart', 14) + esc(YTE_TXT.meter) + '</span><span class="smm__bar"><i style="width:' + v + '%"></i></span><b>' + esc(YTE_TXT.meterLv[lv]) + '</b></div>';
  }
  function smScene(a) {
    var c = a.scene || {};
    return '<div class="sms"><span class="sms__tag">' + PS.icon('bell', 12) + esc(YTE_TXT.simLab) + '</span><span class="sms__p">' + ic(c.ic || 'cross', 15) + esc(c.place || '') + '</span>' +
      (c.time ? '<span class="sms__t">' + esc(c.time) + '</span>' : '') + (c.tag ? '<span class="sms__x">' + esc(c.tag) + '</span>' : '') + '</div>';
  }
  function viewSim(a) {
    var M = T.sm, n = a.steps.length;
    if (M.i < 0) {
      return '<div class="card smc">' + smScene(a) + shinSays('hi', fill(a.intro), 56) +
        '<p class="qsub" style="text-align:center;margin:8px 0 0">' + esc(YTE_TXT.simSteps.replace('[N]', n)) + '</p></div>' +
        '<button type="button" class="btn btn--go btn--w" data-act="smGo">' + ic('play', 18) + esc(YTE_TXT.simStart) + '</button>' +
        '<p class="ps-small" style="text-align:center">' + esc(YTE_TXT.note) + '</p>';
    }
    var bar = '<div class="stepbar">' + a.steps.map(function (s, j) { return '<i class="' + (j < M.i ? 'on' : (j === M.i ? 'cur' : '')) + '"></i>'; }).join('') + '</div>';
    if (M.i >= n) {
      var all = M.first === n;
      return '<div class="card smd">' + shin('party', 84, 'hop') + '<p class="q">' + esc(YTE_TXT.first.replace('[N]', M.first).replace('[T]', n)) + '</p>' + smMeter(M.met) + '</div>' +
        shinSays(all ? 'cheer' : 'encourage', esc(all ? YTE_TXT.firstAll : YTE_TXT.firstSome), 48) +
        '<div class="card smf"><b class="smf__h">' + ic('cross', 18) + esc(YTE_TXT.fileH) + '</b><ol>' + a.steps.map(function (s) { var k = ''; s.opts.forEach(function (o) { if (o.ok) k = o.key || o.t; }); return '<li>' + esc(k) + '</li>'; }).join('') + '</ol>' +
        '<p class="smf__end">' + esc(a.end) + '</p></div>' +
        '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>';
    }
    var S0 = a.steps[M.i], ord = seedShuffle(S0.opts.map(function (o, i) { return i; }), a.id + 'm' + M.i), P = M.pick, ch = P >= 0 ? S0.opts[P] : null;
    var h = bar + '<div class="card smc">' + smScene(a) + smMeter(M.met) + '<p class="sm__say">' + esc(S0.say) + '</p></div>' +
      '<div class="card"><p class="qsub">Tình huống ' + (M.i + 1) + '/' + n + '</p><p class="q">' + esc(S0.q) + '</p><div class="opts">' + ord.map(function (i) {
        var o = S0.opts[i], on = P === i, tr = !on && M.tried[M.i + '.' + i];
        return '<button type="button" class="opt' + (on ? (o.ok ? ' opt--ok' : ' opt--no') : '') + (tr ? ' opt--tried' : '') + '" data-act="smPick" data-i="' + i + '"' + (ch ? ' disabled' : '') + '><span class="dot">' + (on || tr ? PS.icon(o.ok ? 'check' : 'close', 13, 3) : '') + '</span>' + esc(o.t) + '</button>';
      }).join('') + '</div></div>';
    if (!ch) return h;
    var last = M.i >= n - 1;
    return h + '<div class="card smr smr--' + (ch.ok ? 'ok' : 'no') + '" id="smRes"><span class="smr__h">' + esc(ch.ok ? YTE_TXT.resOk : YTE_TXT.resNo) + '</span><p class="smr__t">' + esc(ch.res) + '</p>' +
      '<div class="fb ' + (ch.ok ? 'fb--ok"><b>Đúng rồi!</b> ' : 'fb--no"><b>Thử lại nhé.</b> ') + esc(ch.why) + '</div></div>' +
      (ch.ok ? '<button type="button" class="btn btn--go btn--w" data-act="smNext">' + esc(last ? YTE_TXT.toFile : YTE_TXT.next) + '</button>' :
        '<button type="button" class="btn btn--w" data-act="smBack">' + ic('arrowL', 15, 2.4) + esc(YTE_TXT.retry) + '</button>');
  }
  function smPick(i) {
    var a = actById(V.a), M = T.sm, o = a.steps[M.i].opts[i], k = M.i + '.' + i, firstTry = true, kk;
    for (kk in M.tried) if (M.tried.hasOwnProperty(kk) && kk.indexOf(M.i + '.') === 0) firstTry = false;
    M.pick = i;
    if (o.ok) { if (firstTry) M.first++; M.met = Math.min(100, M.met + (firstTry ? 10 : 4)); sfx('ting'); }
    else { if (!M.tried[k]) M.met = Math.max(10, M.met - 15); M.tried[k] = 1; sfx('pop'); }
    render();
    var el = $('#smRes'); if (el && el.scrollIntoView) { try { el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); } catch (er) { el.scrollIntoView(false); } }
  }
  function yteSum() {
    var y = S.yte || {}, sim = y.sim || {}, o = {}, k;
    for (k in sim) if (sim.hasOwnProperty(k)) o[k] = sim[k].f + '/' + sim[k].n;
    return { sim: o, bai: baiCount('yte'), habit: y.habit ? y.habit.h : '' };
  }
  function nbYte() {
    var y = S.yte || {}, sim = y.sim || {}, L = [], h = '<div class="nbsec"><h3>' + esc(YTE_TXT.nbH) + '</h3>';
    BAI_YTE.forEach(function (b) { b.acts.forEach(function (a) { if (a.k === 'sim' && sim[a.id]) L.push('<li><span>' + esc(b.t) + '</span><b>' + sim[a.id].f + '/' + sim[a.id].n + ' đúng ngay</b></li>'); }); });
    var hb = y.habit ? '<p class="ps-small" style="margin-top:8px">' + esc(YTE_TXT.nbHab) + ' <b>' + esc(y.habit.h) + '</b></p>' : '';
    if (!L.length) return h + '<p class="ps-small">' + esc(YTE_TXT.nbNone) + '</p>' + hb + '</div>';
    return h + '<p class="ps-small">' + esc(YTE_TXT.nbFiles) + '</p><ul class="kv">' + L.join('') + '</ul>' + hb + '</div>';
  }
  function thangCard() {
    return '<div class="card thang"><b class="thang__h">' + ic('gauge', 18) + esc(THANG.h) + '</b><p class="ps-small">' + esc(THANG.sub) + '</p><ol>' +
      THANG.lv.map(function (L, i) { return '<li class="thang__i thang__i--' + (i + 1) + '"><span class="thang__n">' + (i + 1) + '</span><span><b>' + esc(L.t) + '</b><small>' + esc(L.e) + '</small><span class="thang__d">' + esc(L.d) + '</span></span></li>'; }).join('') + '</ol></div>';
  }
  function nbKc() {
    var c = S.kc || {};
    return '<div class="kc"><div class="kc__h">' + ic('cross', 22, 2.4) + '<div><b>' + esc(KC.h) + '</b><small>' + esc(KC.sub) + '</small></div></div>' +
      KC.nums.map(function (x) { return '<div class="kc__n"><span class="kc__no">' + esc(x.n) + '</span><span><b>' + esc(x.v) + '</b> <span class="jp">' + esc(x.j) + '</span><small>' + esc(x.d) + '</small></span></div>'; }).join('') + '</div>' +
      '<div class="nbsec"><h3>' + esc(KC.sayH) + '</h3><p class="ps-small">' + esc(KC.saySub) + '</p><ul class="kcs">' +
      KC.say.map(function (x) { return '<li><span class="jp">' + esc(x.j) + '</span><small class="kana">' + esc(x.k + ' · ' + x.r) + '</small><span>' + esc(x.v) + '</span></li>'; }).join('') + '</ul></div>' +
      '<div class="nbsec"><h3>' + esc(KC.myH) + '</h3>' + KC.fields.map(function (f) {
        return '<label class="kcf"><span>' + esc(f.l) + '</span><textarea class="inp' + (f.big ? ' kcf__big' : '') + '" rows="' + (f.big ? 2 : 1) + '" maxlength="160" data-kc="' + f.k + '" placeholder="' + esc(f.ph) + '">' + esc(c[f.k] || '') + '</textarea></label>';
      }).join('') + '<p class="ps-small" id="kcMsg">' + esc(KC.note) + '</p></div>' + thangCard();
  }

  /* =========================================================
     PHÒNG TEST (TC01.1.3): tf (Đúng hay sai, phản hồi ngay) · quiz (test thử như đề lớp GDTC, chấm khi nộp) · redo (ôn câu đã sai)
     Ngân hàng QB.dd / QB.sk, câu Đúng/Sai QTF.dd / QTF.sk (content.js). o[0] là đáp án đúng, xáo khi hiện.
     T.qz = { st: 0 giới thiệu | 1 làm bài | 2 kết quả, L [{id, ord}], i, ans {chỉ số câu: chỉ số đáp án}, sc, pr, miss }
     T.tq = { L [id], i, pick (-1 | 0 Sai | 1 Đúng), ok }   T.rd = { st, L [{id, ord}], i, pick, tried {}, first, n }
     Lưu S.test = { q: {id hoạt động: {b tốt nhất, l lần cuối, n số câu, k số lần, at}}, w: {mã câu: 1} câu cần ôn, tf: {id: {b, n}} }
     ========================================================= */
  var QBY = {}, TFY = {};
  ['dd', 'sk'].forEach(function (k) { QB[k].forEach(function (q) { q.bk = k; QBY[q.id] = q; }); QTF[k].forEach(function (q) { TFY[q.id] = q; }); });
  function shuf(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function qItem(q) { return { id: q.id, ord: shuf(q.o.map(function (x, i) { return i; })) }; }
  function qDraw(a) {
    var L = a.bank === 'mix' ? shuf(shuf(QB.dd).slice(0, a.n / 2).concat(shuf(QB.sk).slice(0, a.n / 2))) : shuf(QB[a.bank]).slice(0, a.n);
    return L.map(qItem);
  }
  function TT() { if (!S.test) S.test = {}; var t = S.test; if (!t.q) t.q = {}; if (!t.w) t.w = {}; if (!t.tf) t.tf = {}; return t; }
  function wrongIds() { var w = TT().w, L = [], k; for (k in w) if (w.hasOwnProperty(k) && QBY[k]) L.push(k); return L; }
  function srcBtn(q) {
    var b = BAI_BY[q.s]; if (!b || b.soon) return '';
    return '<button type="button" class="qsrc" data-act="bai" data-id="' + b.id + '">' + ic(b.ic, 14) + '<span>' + esc(TEST_TXT.revGo) + ' ' + esc(khuById(b.khu).t) + ' › ' + esc(b.t) + '</span></button>';
  }
  function tFill(s, o) { s = String(s); for (var k in o) if (o.hasOwnProperty(k)) s = s.split('[' + k + ']').join(o[k]); return s; }

  /* ---------- quiz: test thử ---------- */
  function viewQuiz(a) {
    if (!T.qz) T.qz = { st: 0, L: [], i: 0, ans: {}, sc: 0, pr: false, miss: false };
    var Q = T.qz, R = TT().q[a.id], X = TEST_TXT;
    if (Q.st === 0) {
      return '<div class="card qzin"><span class="qzin__ic">' + ic(BAI_BY[a.bai].ic, 30) + '</span><p class="q">' + esc(a.t) + '</p>' +
        '<p class="qsub">' + esc(tFill(X.qzInfo, { N: a.n })) + '</p><p class="qzin__mark">' + PS.icon('star', 14) + esc(tFill(X.qzMark, { P: a.pass, N: a.n })) + '</p>' +
        (R ? '<ul class="kv qzin__kv"><li><span>' + esc(X.qzLast) + '</span><b>' + R.l + '/' + R.n + '</b></li><li><span>' + esc(X.qzBest) + '</span><b>' + R.b + '/' + R.n + (R.b >= a.pass ? ' · ' + esc(X.pass) : '') + '</b></li><li><span>' + esc(X.qzTries) + '</span><b>' + R.k + '</b></li></ul>' : '') + '</div>' +
        shinSays('think', esc(X.qzSay), 48) +
        '<button type="button" class="btn btn--go btn--w" data-act="qzGo">' + ic('play', 18) + esc(X.qzStart) + '</button>';
    }
    if (Q.st === 2) return quizResult(a);
    var n = Q.L.length, it = Q.L[Q.i], q = QBY[it.id], P = Q.ans[Q.i], nA = 0, k;
    for (k in Q.ans) if (Q.ans.hasOwnProperty(k)) nA++;
    var last = Q.i >= n - 1, all = nA >= n;
    return '<div class="qzhd"><b>Câu ' + (Q.i + 1) + '/' + n + '</b><span>Đã chọn ' + nA + '/' + n + '</span></div><div class="qzbar"><i style="width:' + Math.round(nA / n * 100) + '%"></i></div>' +
      '<div class="card"><p class="q">' + esc(q.q) + '</p><div class="opts">' + it.ord.map(function (oi) {
        return '<button type="button" class="opt opt--q' + (P === oi ? ' on' : '') + '" data-act="qzPick" data-i="' + oi + '" aria-pressed="' + (P === oi) + '"><span class="dot"><i></i></span>' + esc(q.o[oi]) + '</button>';
      }).join('') + '</div></div>' +
      '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="qzMove" data-d="-1"' + (Q.i ? '' : ' disabled') + '>' + PS.icon('back', 16) + esc(X.qzPrev) + '</button>' +
      (last ? '<button type="button" class="btn btn--go" data-act="qzSubmit">' + esc(X.qzSubmit) + '</button>' : '<button type="button" class="btn" data-act="qzMove" data-d="1"' + (P >= 0 ? '' : ' disabled') + '>' + esc(X.qzNext) + PS.icon('next', 16) + '</button>') + '</div>' +
      '<div class="qzgrid" aria-label="Chọn câu">' + Q.L.map(function (x, j) { var on = Q.ans[j] >= 0; return '<button type="button" class="' + (on ? 'on' : (Q.miss ? 'miss' : '')) + (j === Q.i ? ' cur' : '') + '" data-act="qzJump" data-i="' + j + '" aria-label="Câu ' + (j + 1) + '">' + (j + 1) + '</button>'; }).join('') + '</div>' +
      '<p class="qsub qzleft">' + esc(all ? tFill(X.qzAll, { N: n }) : tFill(X.qzLeft, { N: n - nA })) + '</p>' +
      (all && !last ? '<button type="button" class="btn btn--go btn--w" data-act="qzSubmit">' + esc(X.qzSubmit) + '</button>' : '');
  }
  function quizSubmit() {
    var a = actById(V.a), Q = T.qz, n = Q.L.length, nA = 0, k;
    for (k in Q.ans) if (Q.ans.hasOwnProperty(k)) nA++;
    if (nA < n) { Q.miss = true; for (var j = 0; j < n; j++) if (!(Q.ans[j] >= 0)) { Q.i = j; break; } render(true); PS.toast(tFill(TEST_TXT.qzLeft, { N: n - nA }), 2600); return; }
    var sc = 0, t = TT();
    Q.L.forEach(function (it, j) { if (Q.ans[j] === 0) { sc++; delete t.w[it.id]; } else t.w[it.id] = 1; });
    var R = t.q[a.id] || { b: 0, l: 0, n: n, k: 0 };
    Q.pr = R.k > 0 && sc > R.b;
    t.q[a.id] = { b: Math.max(R.b, sc), l: sc, n: n, k: R.k + 1, at: Date.now() };
    Q.sc = sc; Q.st = 2; markDay(); save(true);
    sfx(sc >= a.pass ? 'ting' : 'pop');
    render(true);
  }
  function quizResult(a) {
    var Q = T.qz, X = TEST_TXT, n = Q.L.length, ok = Q.sc >= a.pass, W = [];
    Q.L.forEach(function (it, j) { if (Q.ans[j] !== 0) W.push({ q: QBY[it.id], p: Q.ans[j] }); });
    var mk = '<div class="qmark"><div class="qmark__bar"><i style="width:' + Math.round(Q.sc / n * 100) + '%"></i><span style="left:' + (a.pass / n * 100) + '%"></span></div><p class="ps-small">' + esc(tFill(X.qzMark, { P: a.pass, N: n })) + '</p></div>';
    return '<div class="card res qres">' + shin(ok ? 'party' : 'encourage', 76, 'hop') + '<span class="ah__lab">Kết quả</span><div class="res__n">' + Q.sc + '<small>/' + n + '</small></div>' +
      '<span class="qpass' + (ok ? ' qpass--ok' : '') + '">' + PS.icon(ok ? 'check' : 'info', 14, 2.6) + esc(ok ? X.pass : X.fail) + '</span>' + (Q.pr ? ' <span class="prtag">' + PS.icon('star', 14) + esc(TXT.pr) + '</span>' : '') + mk + '</div>' +
      shinSays(ok ? 'cheer' : 'encourage', esc(!W.length ? X.allSay : (ok ? X.passSay : X.failSay)), 46) +
      (W.length ? '<div class="card qrev"><b class="qrev__h">' + PS.icon('bulb', 16) + esc(X.revH) + ' (' + W.length + ')</b><ol>' + W.map(function (w) {
        return '<li><p class="qrev__q">' + esc(w.q.q) + '</p><p class="qrev__you">' + esc(X.revYou) + ' ' + esc(w.q.o[w.p]) + '</p><p class="qrev__ok">' + esc(X.revOk) + ' <b>' + esc(w.q.o[0]) + '</b></p><p class="qrev__why">' + esc(w.q.why) + '</p>' + srcBtn(w.q) + '</li>';
      }).join('') + '</ol></div>' : '') +
      '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="qzAgain">' + esc(X.again) + '</button><button type="button" class="btn btn--go" data-act="finish">Hoàn thành</button></div>';
  }

  /* ---------- tf: Đúng hay sai ---------- */
  function viewTf(a) {
    if (!T.tq) T.tq = { L: shuf(QTF[a.bank]).slice(0, a.n).map(function (x) { return x.id; }), i: 0, pick: -1, ok: 0 };
    var Q = T.tq, X = TEST_TXT, n = Q.L.length;
    if (Q.i >= n) {
      var R = TT().tf[a.id];
      return '<div class="card res qres">' + shin(Q.ok >= n - 2 ? 'party' : 'cheer', 76, 'hop') + '<span class="ah__lab">Kết quả</span><div class="res__n">' + Q.ok + '<small>/' + n + '</small></div>' +
        '<p class="qsub">' + esc(tFill(X.tfRes, { N: Q.ok, T: n })) + (R ? ' · Tốt nhất ' + R.b + '/' + R.n : '') + '</p></div>' +
        shinSays('think', esc(X.tfSay), 46) +
        '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="tfAgain">' + esc(X.tfAgain) + '</button><button type="button" class="btn btn--go" data-act="finish">Hoàn thành</button></div>';
    }
    var q = TFY[Q.L[Q.i]], P = Q.pick, done = P >= 0, right = done && P === q.v;
    return '<div class="stepbar">' + Q.L.map(function (x, j) { return '<i class="' + (j < Q.i ? 'on' : (j === Q.i ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
      '<div class="card tfc' + (done ? (right ? ' tfc--ok' : ' tfc--no') : '') + '"><span class="qsub">Câu ' + (Q.i + 1) + '/' + n + ' · ' + esc(X.tfQ) + '</span><p class="tfc__t">' + esc(q.t) + '</p></div>' +
      '<div class="tfb">' + [[1, X.tfYes, 'check'], [0, X.tfNo, 'close']].map(function (b) {
        var cls = done ? (b[0] === q.v ? ' tfb__b--ok' : (b[0] === P ? ' tfb__b--no' : ' tfb__b--off')) : '';
        return '<button type="button" class="tfb__b tfb__b--' + (b[0] ? 'y' : 'n') + cls + '" data-act="tfPick" data-v="' + b[0] + '"' + (done ? ' disabled' : '') + '>' + PS.icon(b[2], 22, 3) + '<b>' + esc(b[1]) + '</b></button>';
      }).join('') + '</div>' +
      (done ? '<div class="fb ' + (right ? 'fb--ok"><b>Đúng rồi!</b> ' : 'fb--no"><b>Thử lại nhé.</b> ' + esc(tFill(X.tfIs, { V: q.v ? 'đúng' : 'sai' })) + ' ') + esc(q.why) + '</div>' +
        '<button type="button" class="btn btn--w' + (Q.i >= n - 1 ? ' btn--go' : '') + '" data-act="tfNext">' + esc(Q.i >= n - 1 ? X.tfEnd : X.tfNext) + '</button>' : '');
  }
  function tfEnd(a) { var Q = T.tq, t = TT(), R = t.tf[a.id]; t.tf[a.id] = { b: Math.max(R ? R.b : 0, Q.ok), n: Q.L.length, at: Date.now() }; markDay(); save(true); }

  /* ---------- redo: ôn câu đã sai ---------- */
  function viewRedo(a) {
    if (!T.rd) T.rd = { st: 0, L: [], i: 0, pick: -1, tried: {}, first: 0, n: 0 };
    var M = T.rd, X = TEST_TXT, W = wrongIds();
    if (M.st === 0) {
      return '<div class="card qzin"><span class="qzin__ic">' + ic('stamp', 30) + '</span><p class="q">' + esc(a.t) + '</p>' +
        (W.length ? '<p class="qsub">' + esc(tFill(X.rdHave, { N: W.length })) + '</p>' : '') + '</div>' +
        (W.length ? '<button type="button" class="btn btn--go btn--w" data-act="rdGo" data-m="w">' + ic('play', 18) + esc(X.rdGo) + '</button>' +
          '<button type="button" class="link" data-act="rdGo" data-m="r">' + esc(X.rdRand) + '</button>' :
          shinSays('think', esc(X.rdNone), 46) + '<button type="button" class="btn btn--go btn--w" data-act="rdGo" data-m="r">' + ic('play', 18) + esc(X.rdRand) + '</button>');
    }
    var n = M.L.length;
    if (M.i >= n) {
      var left = wrongIds().length;
      return '<div class="card res qres">' + shin('party', 76, 'hop') + '<span class="ah__lab">Kết quả</span><div class="res__n">' + M.first + '<small>/' + n + '</small></div>' +
        '<p class="qsub">' + esc(tFill(X.rdEnd, { N: n, F: M.first })) + '</p></div>' +
        shinSays(left ? 'encourage' : 'cheer', esc(left ? tFill(X.rdLeft, { N: left }) : X.rdClear), 46) +
        '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>';
    }
    var it = M.L[M.i], q = QBY[it.id], P = M.pick, ch = P >= 0, ok = ch && P === 0;
    return '<div class="stepbar">' + M.L.map(function (x, j) { return '<i class="' + (j < M.i ? 'on' : (j === M.i ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
      '<div class="card"><p class="qsub">Câu ' + (M.i + 1) + '/' + n + '</p><p class="q">' + esc(q.q) + '</p><div class="opts">' + it.ord.map(function (oi) {
        var on = P === oi, tr = !on && M.tried[M.i + '.' + oi];
        return '<button type="button" class="opt' + (on ? (oi === 0 ? ' opt--ok' : ' opt--no') : '') + (tr ? ' opt--tried' : '') + '" data-act="rdPick" data-i="' + oi + '"' + (ok ? ' disabled' : '') + '><span class="dot">' + (on || tr ? PS.icon(oi === 0 ? 'check' : 'close', 13, 3) : '') + '</span>' + esc(q.o[oi]) + '</button>';
      }).join('') + '</div></div>' +
      (ch ? (ok ? '<div class="fb fb--ok"><b>Đúng rồi!</b> ' + esc(q.why) + '</div>' + srcBtn(q) + '<button type="button" class="btn btn--w' + (M.i >= n - 1 ? ' btn--go' : '') + '" data-act="rdNext">' + esc(M.i >= n - 1 ? TEST_TXT.tfEnd : TEST_TXT.tfNext) + '</button>' :
        '<div class="fb fb--no"><b>Thử lại nhé.</b> ' + esc(X.rdRetry) + '</div>') : '');
  }
  function rdPick(i) {
    var M = T.rd, it = M.L[M.i], t = TT(), firstTry = true, k;
    for (k in M.tried) if (M.tried.hasOwnProperty(k) && k.indexOf(M.i + '.') === 0) firstTry = false;
    M.pick = i;
    if (i === 0) { if (firstTry) { M.first++; delete t.w[it.id]; save(); } sfx('ting'); }
    else { M.tried[M.i + '.' + i] = 1; t.w[it.id] = 1; save(); sfx('pop'); }
    render();
  }
  function testSum() {
    var t = S.test || {}, q = t.q || {}, o = {}, k;
    for (k in q) if (q.hasOwnProperty(k)) o[k] = q[k].b + '/' + q[k].n + ' · ' + q[k].k + ' lần';
    return { best: o, wrong: wrongIds().length, bai: baiCount('test'), ft: ftSum() };
  }
  function nbTest() {
    var t = S.test || {}, q = t.q || {}, tf = t.tf || {}, L = [], h = '<div class="nbsec"><h3>' + esc(TEST_TXT.nbH) + '</h3>';
    BAI_TEST.forEach(function (b) { b.acts.forEach(function (a) {
      if (a.k === 'quiz' && q[a.id]) L.push('<li><span>' + esc(a.t) + '</span><b>' + q[a.id].b + '/' + q[a.id].n + (q[a.id].b >= a.pass ? ' · Đạt' : '') + '</b></li>');
      if (a.k === 'tf' && tf[a.id]) L.push('<li><span>' + esc(b.t.replace('Test thử ', '')) + ' · Đúng hay sai</span><b>' + tf[a.id].b + '/' + tf[a.id].n + '</b></li>');
    }); });
    var w = wrongIds().length;
    if (!L.length) return h + '<p class="ps-small">' + esc(TEST_TXT.nbNone) + '</p></div>';
    return h + '<ul class="kv">' + L.join('') + '<li><span>' + esc(TEST_TXT.nbWrong) + '</span><b>' + w + '</b></li></ul></div>';
  }


  /* =========================================================
     TỰ TEST THỂ LỰC (TC01.1.4): ft (một buổi test nhiều bài) · board (thẻ thành tích)
     FT, FT_TXT ở content.js. T.ft = { st: 0 giới thiệu | 1 đang làm bài i | 2 kết quả bài i, nghỉ | 3 tổng kết, i, r {khóa: số | -1 bỏ qua}, rs (giờ bắt đầu nghỉ), feel, rec (đã lưu) }
     Lưu S.ft = { h: [{ d, a: id hoạt động, lv, r {khóa: số}, f }] } (tối đa 40 buổi). Mỗi số cũng ghi vào S.log[ex] (t: 1) để Kỷ lục cá nhân cập nhật.
     ========================================================= */
  function FTS() { if (!S.ft) S.ft = { h: [] }; if (!S.ft.h) S.ft.h = []; return S.ft; }
  function ftEx(k) { var f = FT[k], e = f.ex; return e && typeof e === 'object' ? e[sexKey()] : e; }
  function ftName(k) { var f = FT[k]; return sexKey() === 'nu' && f.nuN ? f.nuN : f.n; }
  function ftFmt(k, v) { return FT[k].u === 's' ? fmtT(v) : v + ' cái'; }
  function ftGoal(k) { var f = FT[k]; if (f.dat) return f.dat[sexKey()]; var M = MOC[ftEx(k)]; return M && M[sexKey()] ? M[sexKey()][1] : 0; }
  function ftHist(k) { var L = []; FTS().h.forEach(function (e) { if (e.r && e.r[k] > 0) L.push(e.r[k]); }); return L; }
  function ftBest(k) { var b = 0; ftHist(k).forEach(function (v) { if (v > b) b = v; }); return b; }
  function ftMark(k, v) {
    var g = ftGoal(k), f = FT[k];
    if (!g || !(v > 0)) return '';
    if (f.lad) { var mk = MOC[ftEx(k)][sexKey()], lv = v >= mk[2] ? 2 : (v >= mk[1] ? 1 : 0); return '<span class="qpass' + (lv ? ' qpass--ok' : '') + '">' + esc(MOC_LAB[lv]) + '</span>'; }
    return v >= g ? '<span class="qpass qpass--ok">' + PS.icon('check', 13, 2.6) + esc(FT_TXT.dat) + '</span>' : '<span class="qpass">' + esc(tFill(FT_TXT.near, { N: f.u === 's' ? fmtT(g - v) : (g - v) + ' cái' })) + '</span>';
  }
  function ftLadder(k, v) {
    var f = FT[k], ex = ftEx(k), M = MOC[ex] || {}, sx = sexKey() === 'nu' ? 'nữ' : 'nam';
    if (f.lad && M[sexKey()]) {
      var mk = M[sexKey()], mx = mk[2] * 1.25, pos = Math.min(100, v / mx * 100);
      return '<div class="moc"><div class="moc__bar"><i style="width:' + pos + '%"></i>' + mk.map(function (x, i) { return '<span class="moc__m moc__m--' + i + '" style="left:' + (x / mx * 100) + '%"></span>'; }).join('') + '</div>' +
        '<div class="moc__leg">' + mk.map(function (x, i) { return '<span class="moc__l moc__l--' + i + '"><i></i>' + MOC_LAB[i] + ' <b>' + ftFmt(k, x) + '</b></span>'; }).join('') + '</div></div>';
    }
    var g = ftGoal(k); if (!g) return '';
    var mx2 = g * 1.25, p2 = Math.min(100, v / mx2 * 100);
    return '<div class="moc"><div class="moc__bar"><i style="width:' + p2 + '%"></i><span class="moc__m moc__m--2" style="left:' + (g / mx2 * 100) + '%"></span></div>' +
      '<div class="moc__leg"><span class="moc__l moc__l--2"><i></i>Mốc Đạt <b>' + ftFmt(k, g) + '</b></span></div></div>';
  }
  function ftSrc(a) { var sx = sexKey() === 'nu' ? 'nữ' : 'nam'; return tFill(a.lv === 'sb' ? FT_TXT.ladSrc : FT_TXT.inSrc, { S: sx }); }
  function ftFig(k, w) { var ex = ftEx(k); return ex && EX[ex] ? frameFig(EX[ex].frames[0], w) : '<span class="ft__noimg">' + ic(BAI_BY.t4.ic, 34) + '</span>'; }
  function viewFt(a) {
    if (!T.ft) T.ft = { st: 0, i: 0, r: {}, rs: 0, feel: -1, rec: -1 };
    var F = T.ft, X = FT_TXT, n = a.items.length;
    var bar = '<div class="stepbar">' + a.items.map(function (x, j) { return '<i class="' + (F.st === 3 || j < F.i || (j === F.i && F.st === 2) ? 'on' : (j === F.i && F.st ? 'cur' : '')) + '"></i>'; }).join('') + '</div>';
    if (F.st === 0) {
      return '<div class="card qzin"><span class="qzin__ic">' + ic(BAI_BY[a.bai].ic, 30) + '</span><p class="q">' + esc(a.t) + '</p>' +
        '<ul class="ftl">' + a.items.map(function (k, j) { var b = ftBest(k), g = ftGoal(k); return '<li><span class="ftl__n">' + (j + 1) + '</span><span class="ftl__t"><b>' + esc(ftName(k)) + '</b><small>' + (FT[k].lad ? 'Thang Yếu · Trung bình · Tốt' : 'Mốc Đạt ' + ftFmt(k, g)) + (b ? ' · Tốt nhất ' + ftFmt(k, b) : '') + '</small></span></li>'; }).join('') + '</ul>' +
        '<p class="ps-small">' + esc(ftSrc(a)) + '</p>' + (a.note ? '<p class="ps-small">' + esc(a.note) + '</p>' : '') + '</div>' +
        (S.mem && S.mem.inj ? shinSays('encourage', esc(TXT.injHome), 46) : '') +
        shinSays('think', esc(X.inSay), 46) +
        '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="act" data-id="b1a">' + esc(X.warm) + '</button><button type="button" class="btn btn--go" data-act="ftGo">' + esc(X.go) + '</button></div>';
    }
    if (F.st === 3) return bar + ftSummary(a);
    var k = a.items[F.i], f = FT[k], ex = ftEx(k), E = ex ? EX[ex] : null, tm = f.u === 's';
    var head = '<div class="qzhd"><b>Bài ' + (F.i + 1) + '/' + n + ' · ' + esc(ftName(k)) + '</b><span>' + (f.lad ? '' : 'Mốc Đạt ' + ftFmt(k, ftGoal(k))) + '</span></div>';
    if (F.st === 1) {
      return bar + head + '<div class="card"><div class="mini">' + ftFig(k, 140) + (E ? '<ul>' + E.keys.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '<p class="ps-small">' + esc(f.how) + '</p>') + '</div></div>' +
        '<div class="card cnt">' +
        (tm ? '<p class="qsub">' + esc(X.sec) + '</p><div class="clock" id="cClock">' + fmtClock(T.el) + '</div>' +
          '<div class="btnrow"><button type="button" class="btn btn--go" data-act="tStart" id="cStart">' + (T.run ? 'Dừng' : (T.el ? 'Tiếp tục' : 'Bắt đầu')) + '</button><button type="button" class="btn btn--soft" data-act="tReset">Làm lại</button></div>' :
          '<p class="qsub">' + esc(X.rep) + '</p><button type="button" class="tap" data-act="tap" id="cTap"><b id="cN">' + T.n + '</b><small>chạm +1</small></button>' +
          '<div class="btnrow btnrow--c"><button type="button" class="btn btn--soft btn--sm" data-act="tapMinus">Bớt 1</button><label class="numin">Nhập số<input class="inp" id="cNin" inputmode="numeric" maxlength="3" value=""></label></div>') +
        '</div><button type="button" class="btn btn--w" data-act="ftDone">' + esc(X.sDone) + '</button><button type="button" class="link" data-act="ftSkip">' + esc(X.sSkip) + '</button>';
    }
    var v = F.r[k], H = ftHist(k), prev = H.length ? H[H.length - 1] : 0, lastItem = F.i >= n - 1;
    return bar + head + '<div class="card res"><span class="ah__lab">Kết quả</span>' +
      (v > 0 ? '<div class="res__n">' + (tm ? fmtT(v) : v + ' <small>cái</small>') + '</div>' + ftMark(k, v) + (prev && v > prev ? ' <span class="prtag">' + PS.icon('star', 14) + esc(FT_TXT.bdUp) + '</span>' : '') + ftLadder(k, v) +
        (prev ? '<p class="ps-small">' + esc(X.last) + ': <b>' + ftFmt(k, prev) + '</b></p>' : '') : '<div class="res__n res__n--sm">' + esc(X.skip) + '</div>') + '</div>' +
      (lastItem ? '' : '<div class="card ftrest"><span class="ftrest__ic">' + ic('timer', 22) + '</span><div><p class="qsub">' + esc(X.rest) + '</p><div class="clock clock--sm" id="rClock">02:00</div></div></div>') +
      '<button type="button" class="btn btn--w' + (lastItem ? ' btn--go' : '') + '" data-act="ftNext">' + esc(lastItem ? X.toEnd : X.restGo + ': ' + ftName(a.items[F.i + 1])) + '</button>';
  }
  function ftSummary(a) {
    var F = T.ft, X = FT_TXT, feels = ['Nhẹ nhàng', 'Vừa sức', 'Hơi quá sức', 'Thấy đau'], say = ['easySay', 'okSay', 'hardSay', 'painStop'];
    var rows = a.items.map(function (k) {
      var v = F.r[k], H = ftHist(k), prev = H.length > 1 ? H[H.length - 2] : 0;
      return '<tr><th>' + esc(ftName(k)) + '</th><td><b>' + (v > 0 ? ftFmt(k, v) : '—') + '</b>' + (v > 0 && prev ? '<small class="' + (v > prev ? 'up' : (v < prev ? 'dn' : '')) + '">' + (v > prev ? '+' : (v < prev ? '−' : '±')) + (FT[k].u === 's' ? fmtT(Math.abs(v - prev)) : Math.abs(v - prev)) + '</small>' : '') + '</td><td>' + (v > 0 ? ftMark(k, v) : '') + '</td></tr>';
    }).join('');
    return '<div class="card res qres">' + shin('cheer', 70, 'hop') + '<span class="ah__lab">' + esc(X.sumH) + '</span><table class="fts">' + rows + '</table><p class="ps-small">' + esc(ftSrc(a)) + '</p></div>' +
      '<div class="card"><p class="q">' + esc(X.feelQ) + '</p><div class="chips">' + feels.map(function (f, i) { return '<button type="button" class="chip' + (F.feel === i ? ' on' : '') + (i === 3 ? ' chip--pain' : '') + '" data-act="ftFeel" data-i="' + i + '">' + f + '</button>'; }).join('') + '</div>' +
      (F.feel >= 0 ? shinSays(F.feel === 3 ? 'sad' : (F.feel === 2 ? 'think' : 'cheer'), esc(TXT[say[F.feel]]), 46) : '') + '</div>' +
      shinSays('think', esc(X.sumSay), 46) +
      '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="ftAgain">' + esc(X.again) + '</button><button type="button" class="btn btn--go" data-act="finish"' + (F.feel >= 0 ? '' : ' disabled') + '>Hoàn thành</button></div>';
  }
  function ftRecord(a) {
    var F = T.ft, r = {}, any = false, now = Date.now();
    a.items.forEach(function (k) { if (F.r[k] > 0) { r[k] = F.r[k]; any = true; var ex = ftEx(k); if (ex) { (S.log[ex] = S.log[ex] || []).push({ d: now, n: F.r[k], f: -1, t: 1 }); if (S.log[ex].length > 60) S.log[ex].shift(); } } });
    if (!any) return;
    var h = FTS().h; h.push({ d: now, a: a.id, lv: a.lv, r: r, f: -1 }); if (h.length > 40) h.shift();
    F.rec = h.length - 1; markDay(); save(true);
  }
  function ftDrawRest() {
    if (TIMER || !T.ft || T.ft.st !== 2) return;
    var el0 = $('#rClock'); if (!el0) return;
    var up = function () { var el = $('#rClock'); if (!el || !T.ft || T.ft.st !== 2) { stopTimer(); return; } var left = Math.max(0, 120 - Math.floor((Date.now() - T.ft.rs) / 1000)); el.textContent = fmtClock(left * 1000); if (!left) { el.className += ' clock--ok'; stopTimer(); } };
    up(); TIMER = setInterval(up, 500);
  }
  /* các khóa đã có kết quả, theo thứ tự FT */
  function ftKeys() { var L = []; for (var k in FT) if (FT.hasOwnProperty(k) && ftHist(k).length) L.push(k); return L; }
  function ftCard() {
    var p = PS.profile(), nm = p.name || (IS_DEMO ? 'Học viên demo' : given()), K = ftKeys(), h = FTS().h, g = S.refl.t6b;
    return '<div class="ach"><div class="ach__top"><span class="mc__logo">' + PS.icon('dumbbell', 15, 2.6) + '</span><span class="ach__br"><b>SHIN FITNESS</b><small>CENTER · 302 TEST LAB</small></span><span class="ach__dt">' + esc(dmy(h.length ? h[h.length - 1].d : Date.now())) + '</span></div>' +
      '<div class="ach__nm"><small>' + esc(FT_TXT.bdH).toUpperCase() + '</small><b>' + esc(nm.toUpperCase()) + '</b><span>' + esc([p.cls, sexKey() === 'nu' ? 'Mốc nữ' : 'Mốc nam', FT_TXT.bdTests + ' ' + h.length].filter(function (x) { return x; }).join(' · ')) + '</span></div>' +
      '<div class="ach__t">' + K.map(function (k) {
        var H = ftHist(k), v = H[H.length - 1], pv = H.length > 1 ? H[H.length - 2] : 0, f = FT[k], gl = ftGoal(k), chip = '';
        if (f.lad) { var mk = MOC[ftEx(k)][sexKey()], lv = v >= mk[2] ? 2 : (v >= mk[1] ? 1 : 0); chip = '<span class="qpass' + (lv ? ' qpass--ok' : '') + '">' + esc(MOC_LAB[lv]) + '</span>'; }
        else if (gl && v >= gl) chip = '<span class="qpass qpass--ok">' + PS.icon('check', 12, 2.6) + 'Đạt mốc</span>';
        var sub = [pv ? 'Lần trước ' + ftFmt(k, pv) : 'Lần đầu', f.lad ? '' : 'Mốc Đạt ' + ftFmt(k, gl)].filter(function (x) { return x; }).join(' · ');
        return '<div class="ach__r"><div class="ach__h"><b>' + esc(ftName(k)) + '</b><span class="ach__v">' + ftFmt(k, v) + (pv && v !== pv ? '<small class="' + (v > pv ? 'up' : 'dn') + '">' + (v > pv ? '▲' : '▼') + '</small>' : '') + '</span></div>' +
          '<div class="ach__s"><span>' + esc(sub) + '</span>' + chip + '</div></div>';
      }).join('') + '</div>' +
      (g ? '<div class="ach__goal"><small>' + esc(FT_TXT.bdGoal) + '</small><span>' + esc(g) + '</span></div>' : '') +
      '<div class="ach__sig">' + SHIN_SIG + 'HLV SHIN</div></div>';
  }
  function viewBoard(a) {
    if (!ftKeys().length) return shinSays('think', esc(FT_TXT.bdNone), 50) +
      '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="act" data-id="t5a">Test sức bền</button><button type="button" class="btn btn--go" data-act="act" data-id="t4b">Test Cơ bản</button></div>';
    return shinSays('cheer', fill(FT_TXT.bdSay), 48) + ftCard() + '<p class="ps-small ach__shot">' + PS.icon('info', 14) + ' ' + esc(FT_TXT.bdShot) + '</p>' +
      '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>';
  }
  function ftTips() {
    var L = [];
    ftKeys().forEach(function (k) {
      var H = ftHist(k), v = H[H.length - 1], g = ftGoal(k), f = FT[k];
      if (L.length >= 2 || !g || v >= g) return;
      L.push(f.u === 's' ? 'Lần tới mình sẽ ' + ftName(k).toLowerCase() + ' lâu hơn 10 giây' : 'Lần tới mình sẽ ' + ftName(k).toLowerCase() + ' thêm 3 cái, giữ đúng tư thế');
    });
    return L;
  }
  function ftSum() {
    var o = {}, h = FTS().h;
    ftKeys().forEach(function (k) { var H = ftHist(k); o[k] = H[H.length - 1] + (FT[k].u === 's' ? 's' : '') + (ftGoal(k) && H[H.length - 1] >= ftGoal(k) && !FT[k].lad ? ' Đạt' : ''); });
    return { last: o, n: h.length, at: h.length ? h[h.length - 1].d : 0, goal: S.refl.t6b || '' };
  }
  function nbFt() {
    var K = ftKeys(), h = '<div class="nbsec"><h3>' + esc(FT_TXT.nbH) + '</h3>';
    if (!K.length) return h + '<p class="ps-small">' + esc(FT_TXT.nbNone) + '</p></div>';
    return h + '<ul class="kv">' + K.map(function (k) { var H = ftHist(k), v = H[H.length - 1]; return '<li><span>' + esc(ftName(k)) + '</span><b>' + ftFmt(k, v) + (!FT[k].lad && v >= ftGoal(k) ? ' · Đạt' : '') + '</b></li>'; }).join('') + '</ul>' +
      (S.refl.t6b ? '<p class="ps-small"><b>' + esc(FT_TXT.bdGoal) + ':</b> ' + esc(S.refl.t6b) + '</p>' : '') + '</div>';
  }


  /* =========================================================
     RADIO TAISO DECK (TC01.1.5): beat (bắt nhịp) · rtq (thẻ nhanh) · rflow (tập theo nhịp) · rself (tự chấm) · sang7 (hẹn 7 buổi)
     Máy đếm nhịp dùng chung (MT). Tiếng đếm vẫn kêu khi máy bật "giảm chuyển động" (đây là âm thanh, không phải chuyển động).
     ========================================================= */
  var MT = null;
  function mtStop() { if (MT) { clearTimeout(MT.tm); MT = null; } }
  function mtStart(ms, cb, k0) {
    mtStop(); k0 = k0 || 0;
    MT = { t0: Date.now() - k0 * ms, ms: ms, k: k0, cb: cb };
    mtStep();
  }
  function mtStep() { var m = MT; if (!m) return; var k = m.k; m.k++; m.tm = setTimeout(mtStep, Math.max(0, m.t0 + m.k * m.ms - Date.now())); m.cb(k); }
  function beep(hi) {
    if (!PS.soundOn()) return;
    try {
      var C = W.AudioContext || W.webkitAudioContext; if (!C) return;
      var c = beep.c || (beep.c = new C()); if (c.state === 'suspended' && c.resume) c.resume();
      var o = c.createOscillator(), g = c.createGain(); o.frequency.value = hi ? 1320 : 880;
      g.gain.setValueAtTime(hi ? 0.12 : 0.08, c.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.09);
      o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.1);
    } catch (e) {}
  }
  function rtPauseAll() { if (T && T.rf && T.rf.run) rfPause(); if (T && T.rb && T.rb.st === 1) { mtStop(); T.rb = { st: 0, n: 0, hits: {}, taps: 0 }; } if (QS && QS.run) qPause(); }
  function rtName(m) { return RT[m - 1].n; }
  function rtFigs(ex, ms) {
    var E = EX[ex], f0 = E.frames[0], f1 = E.frames[1] || f0;
    if (RM) return '<div class="tgs">' + frameFig(f0) + frameFig(f1) + '</div>';
    return '<div class="tg" style="--tgd:' + (ms || 3000) + 'ms">' + frameFig(f0).replace('class="fig', 'class="fig tg1') + frameFig(f1).replace('class="fig', 'class="fig tg2') + '</div>';
  }
  function vidBtn() { return '<a class="ytbtn" href="' + esc(TC_RADIO) + '" target="_blank" rel="noopener">' + ic('play', 18) + '<span><b>' + esc(RT_TXT.vidBtn) + '</b><small>' + esc(RT_TXT.vidSub) + '</small></span>' + PS.icon('ext', 16) + '</a>'; }

  /* ---------- bắt nhịp 1–8 ---------- */
  var BT_MS = 750, BT_L = 8, BT_N = 16;
  function viewBeat(a) {
    var B = T.rb;
    if (B.st === 0) {
      return '<div class="card cnt"><div class="bt bt--idle"><span class="bt__n">1</span><span class="bt__jp">いち</span></div><p class="q">' + esc(RT_TXT.btIntro) + '</p><p class="qsub">' + ic('play', 13) + ' ' + esc(RT_TXT.btSound) + '</p>' +
        (S.radio.beat ? '<p class="ps-small">Kỷ lục của bạn: <b>' + S.radio.beat + '/' + BT_N + '</b> nhịp đúng</p>' : '') + '</div>' +
        '<button type="button" class="btn btn--go btn--w" data-act="btGo">' + ic('play', 18) + esc(RT_TXT.btGo) + '</button>';
    }
    if (B.st === 1) {
      return '<div class="card cnt"><p class="ah__lab" id="btPh">' + esc(RT_TXT.btListen) + '</p>' +
        '<button type="button" class="bt" id="btTap" data-act="btTap" aria-label="Chạm theo nhịp"><span class="bt__n" id="btN">1</span><span class="bt__jp" id="btJp">いち</span></button>' +
        '<p class="bt__fb" id="btFb" aria-live="polite">&nbsp;</p><p class="qsub" id="btSc">Đúng nhịp: 0/' + BT_N + '</p></div>';
    }
    var lv = B.n >= 12 ? 2 : (B.n >= 8 ? 1 : 0);
    return '<div class="card cnt">' + shin(lv === 2 ? 'party' : (lv ? 'cheer' : 'encourage'), 90, 'hop') + '<p class="q">Đúng nhịp ' + B.n + '/' + BT_N + '</p>' +
      '<div class="btbar"><i style="width:' + Math.round(B.n / BT_N * 100) + '%"></i></div>' +
      (B.n >= (S.radio.beat || 0) && B.n ? '<p class="ps-small"><b>' + esc(TXT.pr) + '</b></p>' : '') + '</div>' +
      shinSays(lv === 2 ? 'cheer' : 'think', esc(RT_TXT.btRes[lv]), 46) +
      '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="btGo">Chơi lại</button><button type="button" class="btn btn--go" data-act="finish">Hoàn thành</button></div>';
  }
  function btStart() {
    T.rb = { st: 1, n: 0, hits: {}, taps: 0, t0: 0 }; render();
    mtStart(BT_MS, function (k) {
      var B = T.rb; if (!B || B.st !== 1 || V.v !== 'act') { mtStop(); return; }
      if (k === 0) B.t0 = MT.t0;
      if (k >= BT_L + BT_N) { mtStop(); B.st = 2; S.radio.beat = Math.max(S.radio.beat || 0, B.n); save(); render(); return; }
      var c = k % 8, n = $('#btN'), j = $('#btJp'), ph = $('#btPh'), bt = $('#btTap');
      beep(c === 0);
      if (n) n.textContent = c + 1; if (j) j.textContent = RT_COUNT[c];
      if (ph && k === BT_L) ph.textContent = RT_TXT.btTap;
      if (bt && !RM) { bt.className = 'bt' + (k >= BT_L ? ' bt--go' : '') ; void bt.offsetWidth; bt.className = 'bt pulse' + (k >= BT_L ? ' bt--go' : ''); }
    });
  }
  function btTap() {
    var B = T.rb; if (!B || B.st !== 1 || !MT) return;
    var now = Date.now(), idx = Math.round((now - B.t0) / BT_MS), fb = $('#btFb'), sc = $('#btSc');
    if (idx < BT_L) { if (fb) { fb.textContent = 'Nghe trước đã nhé'; fb.className = 'bt__fb'; } return; }
    var off = Math.abs(now - (B.t0 + idx * BT_MS)), hit = idx < BT_L + BT_N && off <= 170 && !B.hits[idx];
    if (hit) { B.hits[idx] = 1; B.n++; }
    if (fb) { fb.textContent = hit ? RT_TXT.btHit : RT_TXT.btMiss; fb.className = 'bt__fb ' + (hit ? 'ok' : 'no'); }
    if (sc) sc.textContent = 'Đúng nhịp: ' + B.n + '/' + BT_N;
  }

  /* ---------- thẻ nhanh: hình này là động tác nào / động tác tiếp theo ---------- */
  function rtqRounds(a) { return a.mv.map(function (m, i) { return i % 2 ? { t: 'next', m: m, from: a.mv[i - 1] } : { t: 'pic', m: m }; }); }
  function rtqOpts(a, i) {
    var R = rtqRounds(a)[i], ok = rtName(R.m), seen = {}, cand = [];
    seen[ok] = 1;
    RT.forEach(function (r) { if (!seen[r.n]) { seen[r.n] = 1; cand.push(r.n); } });
    cand = seedShuffle(cand, a.id + 'q' + i);
    var lg = null, other = null;
    cand.forEach(function (n) { if (!lg && n.length >= ok.length) lg = n; });
    lg = lg || cand[0];
    cand.forEach(function (n) { if (!other && n !== lg) other = n; });
    return seedShuffle([ok, lg, other], a.id + 'o' + i);
  }
  function rtJp(n) { for (var i = 0; i < RT.length; i++) if (RT[i].n === n) return RT[i].j; return ''; }
  function viewRtq(a) {
    var RR = rtqRounds(a), Rq = T.rq, R = RR[Rq.i], ok = rtName(R.m), O = rtqOpts(a, Rq.i), P = Rq.pick, right = P >= 0 && O[P] === ok, last = Rq.i >= RR.length - 1;
    var top = R.t === 'pic' ? '<div class="figbox figbox--sm">' + frameFig(EX[RT[R.m - 1].id].frames[1]) + '</div><p class="q">' + esc(RT_TXT.qPic) + '</p>' :
      '<p class="q">' + esc(RT_TXT.qNext.replace('[Đ]', rtName(R.from))) + '</p>';
    return '<div class="stepbar">' + RR.map(function (r, j) { return '<i class="' + (j < Rq.i ? 'on' : (j === Rq.i ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
      '<div class="card">' + top + '<div class="opts">' + O.map(function (n, i) {
        var on = P === i, tr = Rq.tried[i];
        return '<button type="button" class="opt' + (on ? (n === ok ? ' opt--ok' : ' opt--no') : (tr ? ' opt--tried' : '')) + '" data-act="rqPick" data-i="' + i + '"' + (right || tr ? ' disabled' : '') + '><span class="dot">' + (on ? PS.icon(n === ok ? 'check' : 'close', 13, 3) : '') + '</span><span>' + esc(n) + '<small class="jpr">' + esc(rtJp(n)) + '</small></span></button>';
      }).join('') + '</div></div>' +
      (P >= 0 ? (right ? '<div class="fb fb--ok"><b>' + esc(RT_TXT.qOk) + '</b> ' + esc((R.m) + '. ' + ok + ': ' + RT[R.m - 1].cue + '.') + '</div>' +
        (last ? shinSays('cheer', esc(RT_TXT.qEnd), 46) + '<button type="button" class="btn btn--go btn--w" data-act="finish">Hoàn thành</button>' : '<button type="button" class="btn btn--w" data-act="rqNext">Câu tiếp theo</button>') :
        '<div class="fb fb--no"><b>' + esc(RT_TXT.qNo) + '</b> Xem lại hình và thứ tự, rồi chọn lại.</div>') : '');
  }

  /* ---------- tập theo nhịp (Shin đếm 1–8, hình đổi theo nhịp) ---------- */
  function rfPlan(a) { var st = [], t = 0; a.mv.forEach(function (m) { st.push(t); t += RT[m - 1].n8 * 8; }); return { st: st, tot: t }; }
  function rfMs() { return RT_TEMPO[T.rf.tp].ms; }
  function rfPause() { var F = T.rf; if (MT) F.g = MT.k - 1; F.run = false; mtStop(); }
  function rfRun(g0) {
    var a = actById(V.a), F = T.rf, PL = rfPlan(a); F.run = true;
    mtStart(rfMs(), function (g) {
      var A = actById(V.a); if (!A || A.k !== 'rflow' || !T.rf || !T.rf.run) { mtStop(); return; }
      T.rf.g = g;
      if (g >= PL.tot) { mtStop(); T.rf.run = false; T.rf.st = 2; tick(); render(true); return; }
      var mi = 0; PL.st.forEach(function (s, i) { if (g >= s) mi = i; });
      var lb = g - PL.st[mi], c = lb % 8, m = A.mv[mi];
      beep(c === 0);
      if (mi !== T.rf.mi || !$('#rfCnt')) { T.rf.mi = mi; render(); }
      var n = $('#rfCnt'), j = $('#rfJp'), s = $('#rfSet');
      if (n) n.textContent = c + 1; if (j) j.textContent = RT_COUNT[c];
      if (s) s.textContent = RT_TXT.flSet.replace('[n]', Math.floor(lb / 8) + 1).replace('[m]', RT[m - 1].n8);
    }, g0 || 0);
  }
  function viewRflow(a) {
    var F = T.rf, PL = rfPlan(a), n = a.mv.length;
    if (F.st === 0) {
      return '<div class="card"><p class="q">' + n + ' động tác · Shin đếm nhịp 1–8</p><p class="qsub">' + esc(RT_TXT.flNote) + '</p><ol class="fll">' +
        a.mv.map(function (m) { var r = RT[m - 1]; return '<li><span class="fll__f">' + frameFig(EX[r.id].frames[1], 74) + '</span><span><b>' + m + '. ' + esc(r.n) + '</b><small>' + esc(r.cue) + ' · ' + r.n8 + ' lần 8 nhịp</small></span></li>'; }).join('') + '</ol>' +
        '<p class="q" style="margin-top:12px">' + esc(RT_TXT.flTempo) + '</p><div class="chips">' + RT_TEMPO.map(function (t, i) { return '<button type="button" class="chip' + (F.tp === i ? ' on' : '') + '" data-act="rfTp" data-i="' + i + '">' + esc(t.n) + '</button>'; }).join('') + '</div></div>' +
        shinSays('hi', esc(RT_TXT.flIntro) + '<br><small>' + esc(RT_TXT.mirror) + '</small>' + (a.mv.indexOf(11) >= 0 && S.mem && S.mem.inj ? '<br><span class="warn-s">' + esc(EX.rt11.keys[2]) + '</span>' : ''), 50) +
        '<button type="button" class="btn btn--go btn--w" data-act="rfStart">' + ic('play', 18) + esc(RT_TXT.flStart) + '</button>' + vidBtn();
    }
    if (F.st === 2) {
      return '<div class="card cnt">' + shin('party', 96, 'hop') + '<p class="q">' + esc(RT_TXT.flDone) + '</p><div class="chips" style="justify-content:center">' +
        RT_TXT.flFeel.map(function (f, i) { return '<button type="button" class="chip' + (F.feel === i ? ' on' : '') + (i === 2 ? ' chip--pain' : '') + '" data-act="rfFeel" data-i="' + i + '">' + esc(f) + '</button>'; }).join('') + '</div></div>' +
        (F.feel >= 0 ? shinSays(F.feel === 2 ? 'sad' : (F.feel === 1 ? 'think' : 'cheer'), esc(RT_TXT.flSay[F.feel]), 46) : '') +
        (F.feel === 0 ? vidBtn() : '') +
        '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="rfAgain">Tập lại</button><button type="button" class="btn btn--go" data-act="finish"' + (F.feel >= 0 ? '' : ' disabled') + '>Hoàn thành</button></div>';
    }
    var mi = F.mi, m = a.mv[mi], r = RT[m - 1], lb = Math.max(0, F.g - PL.st[mi]), c = lb % 8;
    return '<div class="stepbar">' + a.mv.map(function (x, j) { return '<i class="' + (j < mi ? 'on' : (j === mi ? 'cur' : '')) + '"></i>'; }).join('') + '</div>' +
      '<div class="card cnt flc rfc"><span class="ah__lab">Động tác ' + m + '/13' + (n < 13 ? ' · ' + (mi + 1) + '/' + n + ' trong cụm' : '') + '</span><p class="q">' + esc(r.n) + '</p><p class="rfc__jp">' + esc(r.j) + '</p>' +
      '<div class="figbox">' + rtFigs(r.id, rfMs() * 4) + '</div>' +
      '<div class="rfc__c"><b id="rfCnt">' + (c + 1) + '</b><span id="rfJp">' + RT_COUNT[c] + '</span><small id="rfSet">' + esc(RT_TXT.flSet.replace('[n]', Math.floor(lb / 8) + 1).replace('[m]', r.n8)) + '</small></div>' +
      '<p class="howc__t">' + esc(r.cue) + '.</p></div>' +
      shinSays('encourage', esc(RT_TXT.flCheer[mi % RT_TXT.flCheer.length]), 42) +
      '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="rfPause">' + esc(F.run ? NGHE2_TXT.flPause : NGHE2_TXT.flGo) + '</button><button type="button" class="btn" data-act="rfSkip">' + esc(NGHE2_TXT.flSkip) + PS.icon('next', 16) + '</button></div>';
  }

  /* ---------- tập theo nhạc, tự chấm 3 tiêu chí (Bảng 3.3) ---------- */
  function rsLevel(c) { var lv = 2; c.forEach(function (v, i) { if (i === 2 && v === 3) return; if (v >= 0 && v < lv) lv = v; }); return lv; }
  function viewRself(a) {
    var R = T.rs, all = R.c[0] >= 0 && R.c[1] >= 0 && R.c[2] >= 0;
    return '<div class="card"><p class="q">' + esc(RT_TXT.sfQ) + '</p>' + vidBtn() + '<p class="ps-small">' + esc(RT_TXT.sfMark) + '</p></div>' +
      RT_TXT.sfC.map(function (cName, ci) {
        var L = RT_TXT.sfLv.slice(); if (ci === 2) L.push(RT_TXT.sfLv3);
        return '<div class="card"><p class="q">' + (ci + 1) + '. ' + esc(cName) + '</p><div class="chips">' + L.map(function (l, li) { return '<button type="button" class="chip' + (R.c[ci] === li ? ' on' : '') + '" data-act="rsC" data-c="' + ci + '" data-i="' + li + '">' + esc(l) + '</button>'; }).join('') + '</div></div>';
      }).join('') +
      '<div class="card"><p class="q">' + esc(RT_TXT.sfNeed) + '</p><div class="chips chips--sm">' + RT.map(function (r, i) { return i === 11 ? '' : '<button type="button" class="chip' + (R.need[i + 1] ? ' on' : '') + '" data-act="rsNeed" data-i="' + (i + 1) + '">' + (i + 1) + '. ' + esc(r.n) + '</button>'; }).join('') + '</div></div>' +
      (all ? shinSays(rsLevel(R.c) === 2 ? 'cheer' : 'think', esc(RT_TXT.sfSay[rsLevel(R.c)]), 46) + '<button type="button" class="btn btn--go btn--w" data-act="finish">Lưu tự chấm</button>' :
        '<p class="ps-small" style="text-align:center">Chọn đủ 3 tiêu chí để lưu.</p>');
  }

  /* ---------- hẹn 7 buổi Radio Taiso ---------- */
  function viewSang7(a) {
    var X = T.s7;
    return '<div class="card"><p class="q">' + esc(RT_TXT.s7Q) + '</p><div class="chips">' + RT_TXT.s7Slots.map(function (s, i) { return '<button type="button" class="chip' + (X.slot === i ? ' on' : '') + '" data-act="s7Slot" data-i="' + i + '">' + esc(s) + '</button>'; }).join('') + '</div></div>' +
      (X.slot >= 0 ? writeBox(RT_TXT.s7W, RT_TXT.s7Sub, RT_TXT.s7Tips) + '<button type="button" class="btn btn--go btn--w" data-act="finish" id="wDone"' + (words(T.txt) >= 3 ? '' : ' disabled') + '>Lưu lời hẹn</button>' : '');
  }
  function s7Info() {
    var X = S.radio && S.radio.s7; if (!X) return null;
    var n = 0; for (var k in X.days) if (X.days.hasOwnProperty(k)) n++;
    return { n: n, td: !!X.days[today()], x: X };
  }
  function s7Card() {
    var I = s7Info(); if (!I) return '';
    var dots = ''; for (var i = 0; i < 7; i++) dots += '<i class="' + (i < I.n ? 'on' : '') + '"></i>';
    return '<div class="card s7"><div class="s7__h">' + ic('radio', 18) + '<b>' + esc(RT_TXT.s7H) + '</b><span>' + Math.min(I.n, 7) + '/7' + (I.n > 7 ? ' · ' + I.n + ' buổi' : '') + '</span></div>' +
      '<div class="s7__d">' + dots + '</div><p class="goal">' + esc(I.x.txt) + '</p>' +
      (I.n >= 7 ? '<p class="ps-small">' + esc(RT_TXT.s7Full) + '</p>' : '') +
      (I.td ? '<p class="s7__ok">' + PS.icon('check', 15, 3) + esc(RT_TXT.s7Done) + '</p>' : '<button type="button" class="btn btn--go btn--w btn--sm" data-act="s7Tick">' + esc(RT_TXT.s7Btn) + '</button>') + '</div>';
  }
  function radioSum() {
    var R = S.radio || {}, fl = 0, k, I = s7Info();
    for (k in (R.fl || {})) if (R.fl.hasOwnProperty(k)) fl += R.fl[k];
    return { bai: baiCount('radio'), beat: R.beat || 0, fl: fl,
      self: R.self ? RT_TXT.sfC.map(function (c, i) { var v = R.self.c[i]; return c + ': ' + (v === 3 ? RT_TXT.sfLv3 : RT_TXT.sfLv[v]); }) : null,
      need: R.self ? R.self.need.map(function (m) { return m + '. ' + rtName(m); }) : [], s7: I ? { n: I.n, txt: I.x.txt } : null };
  }
  function nbRadio() {
    var R = radioSum(), h = '<div class="nbsec"><h3>' + esc(RT_TXT.nbH) + '</h3>';
    if (!R.bai && !R.beat && !R.fl && !R.self && !R.s7) return h + '<p class="ps-small">Chưa làm. Vào Radio Taiso › Radio Taiso là gì?</p></div>';
    h += '<ul class="kv"><li><span>Bài đã đục lỗ</span><b>' + R.bai + '/' + BAI_RT.length + '</b></li>' + (R.beat ? '<li><span>Bắt nhịp tốt nhất</span><b>' + R.beat + '/' + BT_N + '</b></li>' : '') +
      (R.fl ? '<li><span>Tập theo nhịp</span><b>' + R.fl + ' lần</b></li>' : '') + (R.s7 ? '<li><span>' + esc(RT_TXT.s7H) + '</span><b>' + R.s7.n + ' buổi</b></li>' : '') + '</ul>';
    if (R.self) h += '<p class="ps-small"><b>Tự chấm:</b> ' + esc(R.self.join(' · ')) + '</p>' + (R.need.length ? '<p class="ps-small"><b>Cần tập thêm:</b> ' + esc(R.need.join(', ')) + '</p>' : '');
    return h + '</div>';
  }

  /* =========================================================
     BUỔI TẬP 10 PHÚT CÙNG SHIN (TC01.1.5): màn riêng V.v = 's10'
     ========================================================= */
  var QS = null, QST = null;
  function qMenu(id) { for (var i = 0; i < S10_MENU.length; i++) if (S10_MENU[i].id === id) return S10_MENU[i]; return S10_MENU[0]; }
  function qEx(x) { return x === 'pushup' && sexKey() === 'nu' ? 'kneepush' : x; }
  function qSegs(m) {
    var L = [], M = qMenu(m), main = M.main.map(qEx);
    EX[S10.warm].frames.forEach(function (fr, i) { L.push({ ph: 'warm', ex: S10.warm, fi: i, sec: S10.wSec }); });
    main.forEach(function (x, i) { L.push({ ph: 'main', ex: x, sec: S10.work }); L.push({ ph: 'rest', next: main[i + 1] || '', sec: S10.rest }); });
    EX[S10.cool].frames.forEach(function (fr, i) { L.push({ ph: 'cool', ex: S10.cool, fi: i, sec: S10.wSec }); });
    return L;
  }
  function qNew() { QS = { st: 0, m: '', segs: [], i: 0, run: false, end: 0, rem: -1, act: 0, last: 0, feel: -1, full: 0, ls: -1 }; }
  function qStop() { if (QST) { clearInterval(QST); QST = null; } }
  function qPause() { if (!QS || !QS.run) return; QS.rem = Math.max(0, QS.end - Date.now()); QS.act += Date.now() - QS.last; QS.run = false; qStop(); }
  function qRun() {
    var sg = QS.segs[QS.i]; QS.end = Date.now() + (QS.rem >= 0 ? QS.rem : sg.sec * 1000); QS.rem = -1; QS.run = true; QS.last = Date.now(); qStop();
    QST = setInterval(function () {
      if (!QS || !QS.run || V.v !== 's10') { qStop(); return; }
      var now = Date.now(), left = Math.max(0, QS.end - now), s = QS.segs[QS.i], c = $('#qClock'), b = $('#qBar'), sec = Math.ceil(left / 1000);
      QS.act += now - QS.last; QS.last = now;
      if (c) c.textContent = sec; if (b) b.style.width = (100 - left / (s.sec * 1000) * 100) + '%';
      if (sec <= 3 && sec > 0 && sec !== QS.ls) { QS.ls = sec; beep(false); }
      if (left <= 0) qNext();
    }, 250);
  }
  function qNext() {
    QS.i++; QS.rem = -1; QS.ls = -1; beep(true);
    if (QS.i >= QS.segs.length) { QS.run = false; qStop(); QS.full = 1; QS.st = 3; render(true); return; }
    qRun(); render();
  }
  function qEnd() { qPause(); QS.st = 3; QS.full = 0; render(true); }
  function s10Week() { var d = new Date(), wd = (d.getDay() + 6) % 7, st = new Date(d.getFullYear(), d.getMonth(), d.getDate() - wd).getTime(), n = 0; (S.s10.h || []).forEach(function (e) { if (e.d >= st) n++; }); return n; }
  function s10Btn() {
    var n = (S.s10.h || []).length;
    return '<button type="button" class="s10b" data-act="s10">' + '<span class="s10b__ic">' + ic('timer', 24) + '</span><span class="s10b__tx"><b>' + esc(S10_TXT.btn) + '</b><small>' + esc(S10_TXT.btnSub) + (n ? ' · ' + esc(S10_TXT.week) + ': ' + s10Week() + ' buổi' : '') + '</small></span>' + PS.icon('next', 18) + '</button>';
  }
  function viewS10() {
    if (!QS) qNew();
    var h = '<div class="ah"><span class="ah__lab">SHIN FITNESS CENTER · 10 phút</span><h1>' + esc(S10_TXT.btn) + '</h1></div>';
    if (QS.st === 0) {
      return h + shinSays('hi', esc(S10_TXT.hi) + (S.mem && S.mem.inj ? '<br><span class="warn-s">' + esc(S10_TXT.inj) + '</span>' : '')) +
        '<div class="s10m">' + S10_MENU.map(function (M) {
          return '<button type="button" class="s10m__b" data-act="qMenu" data-id="' + M.id + '"><span class="s10m__ic">' + ic(M.ic, 26) + '</span><span><b>' + esc(M.n) + '</b><small>' + esc(M.d) + '</small><span class="s10m__ex">' + M.main.map(function (x) { return esc(EX[qEx(x)].s || EX[qEx(x)].n); }).join(' · ') + '</span></span></button>';
        }).join('') + '</div>' + (S.s10.h.length ? '<p class="ps-small" style="text-align:center">Bạn đã tập ' + S.s10.h.length + ' buổi · ' + esc(S10_TXT.week) + ': ' + s10Week() + ' buổi</p>' : '');
    }
    var M = qMenu(QS.m);
    if (QS.st === 1) {
      return h + '<div class="card"><p class="q">' + ic(M.ic, 18) + ' ' + esc(M.n) + '</p><ol class="s10p">' + S10_TXT.plan.map(function (p, i) { return '<li><b>' + esc(p) + '</b><small>' + esc(S10_TXT.planD[i]) + '</small>' + (i === 1 ? '<span>' + M.main.map(function (x) { return esc(EX[qEx(x)].n); }).join(' · ') + '</span>' : '') + '</li>'; }).join('') + '</ol></div>' +
        shinSays('hi', esc(NGHE2_TXT.flIntro), 48) +
        '<button type="button" class="btn btn--go btn--w" data-act="qStart">' + ic('play', 18) + esc(S10_TXT.start) + '</button><button type="button" class="link" data-act="qBack">Chọn bài khác</button>';
    }
    if (QS.st === 3) {
      var mins = Math.max(1, Math.round(QS.act / 60000));
      return h + '<div class="card cnt">' + shin('party', 96, 'hop') + '<p class="q">' + esc(QS.full ? S10_TXT.done : S10_TXT.doneShort) + '</p><p class="qsub">' + esc(M.n) + ' · khoảng ' + mins + ' phút</p><div class="chips" style="justify-content:center">' +
        S10_TXT.feel.map(function (f, i) { return '<button type="button" class="chip' + (QS.feel === i ? ' on' : '') + (i === 3 ? ' chip--pain' : '') + '" data-act="qFeel" data-i="' + i + '">' + esc(f) + '</button>'; }).join('') + '</div></div>' +
        (QS.feel >= 0 ? shinSays(QS.feel === 3 ? 'sad' : (QS.feel === 2 ? 'think' : 'cheer'), esc(S10_TXT.say[QS.feel]), 46) : '') +
        '<button type="button" class="btn btn--go btn--w" data-act="qSave"' + (QS.feel >= 0 ? '' : ' disabled') + '>' + esc(S10_TXT.save) + '</button>';
    }
    var sg = QS.segs[QS.i], left = QS.run ? Math.max(0, QS.end - Date.now()) : (QS.rem >= 0 ? QS.rem : sg.sec * 1000), body = '', lab = S10_TXT.ph[sg.ph];
    var cnt = 0, pos = 0; QS.segs.forEach(function (x, j) { if (x.ph === sg.ph) { cnt++; if (j <= QS.i) pos++; } });
    if (sg.ph === 'rest') {
      var nx = sg.next ? EX[sg.next] : null;
      body = '<p class="q">' + esc(lab) + '</p><p class="qsub">' + esc(S10_TXT.restNext) + esc(nx ? nx.n : S10_TXT.ph.cool) + '</p><div class="figbox figbox--sm">' + (nx ? frameFig(nx.frames[0]) : frameFig(EX[S10.cool].frames[0])) + '</div>';
    } else if (sg.ph === 'main') {
      var E = EX[sg.ex];
      body = '<p class="q">' + esc(E.n) + '</p><div class="figbox">' + rtFigs(sg.ex, 3000) + '</div><p class="howc__t">' + esc(E.keys[0]) + '. ' + esc(S10_TXT.work) + '</p>';
    } else {
      var fr = EX[sg.ex].frames[sg.fi];
      body = '<p class="q">' + esc(fr.c || fr.t) + '</p><div class="figbox">' + frameFig(fr) + '</div><p class="howc__t">' + esc(fr.t) + '</p>';
    }
    var done = 0; for (var j = 0; j < QS.i; j++) done += QS.segs[j].sec;
    return h + '<div class="qtop"><span>' + esc(M.n) + '</span><b>' + fmtClock(done * 1000) + ' / 10:00</b></div><div class="qph">' + ['warm', 'main', 'cool'].map(function (p) { return '<i class="' + (sg.ph === p || (p === 'main' && sg.ph === 'rest') ? 'cur' : '') + '">' + esc(S10_TXT.ph[p]) + '</i>'; }).join('') + '</div>' +
      '<div class="card cnt flc' + (sg.ph === 'rest' ? ' qrest' : '') + '"><span class="ah__lab">' + esc(lab) + (sg.ph === 'rest' ? '' : ' ' + pos + '/' + cnt) + '</span>' + body +
      '<div class="flc__t"><b id="qClock">' + Math.ceil(left / 1000) + '</b><small>giây</small></div><div class="flbar"><i id="qBar" style="width:' + (100 - left / (sg.sec * 1000) * 100) + '%"></i></div></div>' +
      '<div class="btnrow"><button type="button" class="btn btn--soft" data-act="qPause">' + esc(QS.run ? S10_TXT.pause : S10_TXT.go) + '</button><button type="button" class="btn" data-act="qSkip">' + esc(S10_TXT.skip) + PS.icon('next', 16) + '</button></div>' +
      '<div class="qfoot"><button type="button" class="link" data-act="qEnd">' + esc(S10_TXT.stop) + '</button><button type="button" class="link link--pain" data-act="qPain">' + esc(S10_TXT.pain) + '</button></div>';
  }
  function qSave() {
    var n = S.s10.h.push({ d: Date.now(), m: QS.m, sec: Math.round(QS.act / 1000), f: QS.feel, full: QS.full });
    markDay(); save(true); sfx('punch');
    PS.toast(S10_TXT.toast.replace('[n]', n), 2600);
    QS = null; go({ v: 'home' }, true);
  }
  function s10Sum() {
    var H = S.s10.h || [], sec = 0, pain = 0;
    H.forEach(function (e) { sec += e.sec || 0; if (e.f === 3) pain++; });
    return { n: H.length, min: Math.round(sec / 60), wk: s10Week(), pain: pain,
      last: H.slice(-5).map(function (e) { return { d: dmy(e.d), m: qMenu(e.m).n, min: Math.round((e.sec || 0) / 60), f: S10_TXT.feel[e.f] || '' }; }) };
  }
  function nbS10() {
    var X = s10Sum(), h = '<div class="nbsec"><h3>' + esc(S10_TXT.nbH) + '</h3>';
    if (!X.n) return h + '<p class="ps-small">' + esc(S10_TXT.nbNone) + '</p></div>';
    return h + '<ul class="kv"><li><span>Số buổi</span><b>' + X.n + '</b></li><li><span>Tổng thời gian</span><b>' + X.min + ' phút</b></li><li><span>' + esc(S10_TXT.week) + '</span><b>' + X.wk + ' buổi</b></li></ul>' +
      '<ul class="notes">' + X.last.slice().reverse().map(function (e) { return '<li><small>' + esc(e.d) + ' · ' + e.min + ' phút</small>' + esc(e.m) + ' · ' + esc(e.f) + '</li>'; }).join('') + '</ul></div>';
  }

  /* =========================================================
     SỔ TAY: Tổng quan | Thẻ hội viên | Khẩn cấp | Cài đặt
     ========================================================= */
  var nbOpen = false, TAB = 'tq';
  function nbOverview() {
    var m = S.mem || {};
    var CI = commitInfo();
    return '<div class="tiles"><div class="tl">' + ic('stamp', 16) + '<b>' + baiCount('san') + '/' + BAI.length + '</b><small>Dấu Sàn tập</small></div><div class="tl">' + ic('bowl', 16) + '<b>' + baiCount('bep') + '/' + BAI_BEP.length + '</b><small>Dấu Bếp dinh dưỡng</small></div>' +
      '<div class="tl">' + ic('helmet', 16) + '<b>' + baiCount('nghe') + '/' + BAI_NGHE.length + '</b><small>Dấu Góc nghề</small></div>' +
      '<div class="tl">' + ic('cross', 16) + '<b>' + baiCount('yte') + '/' + BAI_YTE.length + '</b><small>Dấu Phòng y tế</small></div>' +
      '<div class="tl">' + ic('gauge', 16) + '<b>' + baiCount('test') + '/' + BAI_TEST.length + '</b><small>Dấu Phòng test</small></div><div class="tl">' + ic('radio', 16) + '<b>' + baiCount('radio') + '/' + BAI_RT.length + '</b><small>Dấu Radio Taiso</small></div><div class="tl">' + ic('timer', 16) + '<b>' + S.s10.h.length + '</b><small>Buổi tập 10 phút</small></div><div class="tl">' + PS.icon('bulb', 16) + '<b>' + wrongIds().length + '</b><small>Câu cần ôn</small></div>' +
      '<div class="tl">' + PS.icon('check', 16) + '<b>' + doneCount() + '/' + ALLACTS.length + '</b><small>Hoạt động</small></div><div class="tl">' + ic('cal', 16) + '<b>' + (CI ? CI.n + '/' + COMMIT_DAYS : '—') + '</b><small>Ngày giữ cam kết</small></div>' +
      '<div class="tl tl--xp">' + PS.icon('star', 16) + '<b>' + xpTotal() + '</b><small>XP</small></div><div class="tl tl--ins">' + PS.icon('bulb', 16) + '<b>' + insTotal() + '</b><small>Insight</small></div>' +
      '<div class="tl tl--fire">' + PS.icon('flame', 16) + '<b>' + (IS_DEMO ? 5 : PS.streak()) + '</b><small>Chuỗi ngày (chung)</small></div><div class="tl">' + ic('timer', 16) + '<b>' + tryCount() + '</b><small>Lần tập thử</small></div></div>' +
      '<div class="nbsec"><h3>Mục tiêu của bạn</h3><p class="goal">' + esc(m.goal || 'Chưa viết') + '</p><button type="button" class="btn btn--soft btn--sm" data-act="editMem">' + ic('pen', 15) + 'Sửa thẻ hội viên</button></div>' +
      '<p class="ps-small">Tổng XP của mọi khóa: <b>' + PS.totals().xp + '</b> (xem ở trang chính).</p>';
  }
  function nbCard() {
    var m = S.mem || {}, rec = [], k;
    for (k in EX) if (EX.hasOwnProperty(k) && best(k)) rec.push('<li><span>' + esc(EX[k].n) + '</span><b>' + (MOC[k] && MOC[k].u === 's' ? fmtT(best(k)) : best(k) + ' cái') + '</b></li>');
    var notes = []; ALLACTS.forEach(function (a) { if (S.refl[a.id]) notes.push('<li><small>' + esc(BAI_BY[a.bai].t) + '</small>' + esc(S.refl[a.id]) + '</li>'); });
    return memCard(true) +
      '<div class="nbsec"><h3>Thông tin tập luyện</h3><ul class="kv"><li><span>Nghề</span><b>' + esc(jobName()) + '</b></li><li><span>Nhóm</span><b>' + esc(grpName(m.g)) + (m.g2 && GROUPS[m.g2] ? ' + ' + esc(GROUPS[m.g2].n) : '') + '</b></li><li><span>Mốc thể lực</span><b>' + (m.sex === 'nu' ? 'Nữ' : 'Nam') + '</b></li>' +
      (bmi(m.h, m.w) ? '<li><span>BMI (tham khảo)</span><b>' + bmi(m.h, m.w) + '</b></li>' : '') + '<li><span>Chấn thương cũ</span><b>' + (m.inj ? 'Có · tập nhẹ, hỏi thầy cô' : 'Không') + '</b></li></ul>' +
      '<button type="button" class="btn btn--soft btn--sm" data-act="editMem">' + ic('pen', 15) + 'Sửa thẻ hội viên</button></div>' +
      '<div class="nbsec"><h3>Lịch tập của mình</h3>' + (S.plan ? '<p><b>' + esc(planLine(S.plan)) + '</b></p><p class="goal">' + esc(S.plan.txt) + '</p>' : '<p class="ps-small">Chưa có. Làm ở Sàn tập › Giãn cơ và lịch tập.</p>') + '</div>' +
      '<div class="nbsec"><h3>Kỷ lục cá nhân</h3>' + (rec.length ? '<ul class="kv">' + rec.join('') + '</ul>' : '<p class="ps-small">Chưa có. Tập thử ở các bài của Sàn tập nhé.</p>') + '</div>' +
      nbS10() + nbRadio() + nbFood() + nbNghe() + nbYte() + nbTest() + nbFt() +
      (notes.length ? '<div class="nbsec"><h3>Ghi chú của bạn</h3><ul class="notes">' + notes.join('') + '</ul></div>' : '');
  }
  function nbNghe() {
    var n = S.nghe || {}, h = '<div class="nbsec"><h3>Góc nghề của mình</h3>';
    var NS = ngheSum();
    if (!n.body && !n.lad && !NS.flow && !n.ca && !n.habit && !n.week) return h + '<p class="ps-small">Chưa làm. Vào Góc nghề › Cơ thể của nghề mình.</p></div>';
    if (n.body && n.body.length) h += '<p class="ps-small"><b>Chỗ bạn nghĩ nghề mình dùng nhiều:</b> ' + esc(n.body.map(function (k) { var z = zoneOf(k); return z ? z.n.toLowerCase() : k; }).join(', ')) + '</p>';
    if (n.lad) h += '<ul class="kv">' + LAD_G.map(function (g) { return n.lad[g.k] >= 0 ? '<li><span>' + esc(g.n) + '</span><b>' + esc(NGHE_TXT.ladLv[n.lad[g.k]]) + '</b></li>' : ''; }).join('') + '</ul>';
    var L2 = [];
    if (NS.flow) L2.push('<li><span>Tập theo Shin</span><b>' + NS.flow + ' lần</b></li>');
    if (NS.school) L2.push('<li><span>Tiết ngồi lâu nhất</span><b>' + esc(NS.school) + '</b></li>');
    if (NS.week) L2.push('<li><span>Lịch bài bổ trợ</span><b>' + esc(NS.week) + '</b></li>');
    if (L2.length) h += '<ul class="kv">' + L2.join('') + '</ul>';
    if (n.habit) h += '<p class="ps-small"><b>Thói quen chống mỏi:</b> ' + esc(n.habit.h) + '</p><p class="goal">' + esc(n.habit.txt) + '</p>';
    return h + '</div>';
  }
  function nbSettings() { return PS.settingsHTML({ ctx: 'module', mod: ID, ver: TC_VER }); }
  function drawNb() {
    var el = $('#nb'); if (!el) return;
    el.innerHTML = '<div class="nb__in"><div class="nb__top"><h2>Sổ tay</h2><button type="button" class="nb__x" data-act="nbClose" aria-label="Đóng sổ tay">' + PS.icon('close', 20) + '</button></div>' +
      '<div class="tabs tabs--4" role="tablist">' + [['tq', 'Tổng quan'], ['the', 'Thẻ hội viên'], ['kc', 'Khẩn cấp'], ['cd', 'Cài đặt']].map(function (t) { return '<button type="button" role="tab" aria-selected="' + (TAB === t[0]) + '" class="' + (TAB === t[0] ? 'on' : '') + '" data-act="tab" data-t="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      '<div id="nbBody">' + (TAB === 'tq' ? nbOverview() + (S.demo ? '' : PS.savedHTML(ID)) : (TAB === 'the' ? nbCard() : (TAB === 'kc' ? nbKc() : nbSettings()))) + '</div></div>';
    if (TAB === 'cd') PS.wireSettings($('#nbBody'), { ctx: 'module', mod: ID, onChange: function () { render(); } });
  }
  function openNb() { if (nbOpen) return; nbOpen = true; var el = D.createElement('div'); el.id = 'nb'; el.className = 'nb'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Sổ tay'); D.body.appendChild(el); D.body.classList.add('ps-lock'); drawNb(); }
  function closeNb() { var el = $('#nb'); if (el) el.parentNode.removeChild(el); nbOpen = false; D.body.classList.remove('ps-lock'); render(); }

  /* =========================================================
     SỰ KIỆN
     ========================================================= */
  D.addEventListener('keydown', function (e) {
    var k = e.key || e.keyCode; if (k !== 'Enter' && k !== ' ' && k !== 13 && k !== 32) return;
    var b = e.target && e.target.getAttribute && e.target.getAttribute('data-act') === 'flipCard' ? e.target : null; if (!b) return;
    e.preventDefault(); flipCard(b);
  });
  (function () {
    var onTap = function (e) { var b = PS.closest(e.target, '[data-act="btTap"]'); if (!b) return; if (e.cancelable) e.preventDefault(); btTap(); };
    if (W.PointerEvent) D.addEventListener('pointerdown', onTap); else { D.addEventListener('touchstart', onTap, { passive: false }); D.addEventListener('mousedown', onTap); }
  })();
  D.addEventListener('click', function (e) {
    var b = PS.closest(e.target, '[data-act]'); if (!b) return;
    var a = b.getAttribute('data-act'), id = b.getAttribute('data-id');
    if (a === 'psHome') { save(true); PS.home(); return; }
    if (a === 'home') { if (nbOpen) closeNb(); go({ v: 'home' }); return; }
    if (a === 'nb') { TAB = 'cd'; openNb(); return; } /* PS1.3.25: nút Sổ tay mở thẻ Cài đặt trước */
    if (a === 'lobby') { TAB = 'the'; sfx('door'); openNb(); return; }
    if (a === 'nbClose') { closeNb(); return; }
    if (a === 'tab') { TAB = b.getAttribute('data-t'); drawNb(); return; }
    if (a === 'editMem') { if (nbOpen) closeNb(); var m = S.mem || {}; J = { job: m.job, g: m.g, g2: m.g2 || (m.job === 'du-hoc' ? 'none' : ''), sex: m.sex, inj: m.inj, goal: m.goal, h: m.h || '', w: m.w || '', cd: '' }; go({ v: 'join', step: 1 }); return; }
    if (a === 'demoExit') { W.PS_NOSAVE = true; clearTimeout(saveT); try { W.localStorage.removeItem(DEMO_KEY); } catch (er) {} W.location.href = PS.url(ID + '/index.html'); return; }
    if (a === 'khu') { go({ v: 'khu', id: id }); return; }
    if (a === 'bai') { go({ v: 'bai', id: id }); return; }
    if (a === 'act') { openAct(id); return; }
    if (a === 'baiSoon') { PS.toast('Bài này Shin đang chuẩn bị. Sắp mở nhé!', 2000); return; }
    if (a === 'cmtTick') { var CC = S.food.commit; if (CC) { CC.days[today()] = 1; markDay(); save(true); tick(); PS.toast('Giỏi lắm! Thêm một ngày giữ lời hẹn.'); } if (nbOpen) drawNb(); else render(); return; }
    /* làm thẻ hội viên */
    if (a === 'jEnter') { sfx('door'); go({ v: 'join', step: 1 }); return; }
    if (a === 'shinTap') { sfx('whistle'); var sv = b.querySelector('.shin'); if (sv && !RM) { sv.className.baseVal = 'shin a-taiso a-jump'; setTimeout(function () { sv.className.baseVal = 'shin a-taiso'; }, 700); } return; }
    if (a === 'flipCard') { flipCard(b); return; }
    if (a === 'jNext') { sfx('pen'); var st = V.step || 0; if (st === 1) { var jj = jobOf(J.job); if (jj && jj.g && !jj.two) { J.g = jj.g; J.g2 = ''; } } go({ v: 'join', step: st + 1 }); return; }
    if (a === 'jJob') { J.job = b.getAttribute('data-s'); var jb = jobOf(J.job); if (jb.g && !jb.two) { J.g = jb.g; J.g2 = ''; } else if (jb.two) { J.g = 'vp'; } else { J.g = ''; J.g2 = ''; } render(); return; }
    if (a === 'jG') { J.g = b.getAttribute('data-g'); render(); return; }
    if (a === 'jG2') { J.g2 = b.getAttribute('data-g'); render(); return; }
    if (a === 'jSex') { J.sex = b.getAttribute('data-v'); render(); return; }
    if (a === 'jInj') { J.inj = +b.getAttribute('data-v'); render(); return; }
    if (a === 'jTip') { var gt = $('#jGoal'); J.goal = TXT.goalTips[+b.getAttribute('data-i')]; if (gt) gt.value = J.goal; syncJoin(); return; }
    if (a === 'jDone') { syncJoin(); if (words(J.goal) < 3) return; var isNew = !S.mem; finishJoin(); if (isNew) handover(function () { go({ v: 'home' }, true); }); else { go({ v: 'home' }, true); PS.toast('Đã cập nhật thẻ hội viên.'); } return; }
    /* hoạt động */
    if (a === 'finish') {
      syncWrite();
      var fa = actById(V.a);
      if (fa && fa.k === 'rself' && (T.rs.c[0] < 0 || T.rs.c[1] < 0 || T.rs.c[2] < 0)) { PS.toast('Chọn đủ 3 tiêu chí nhé.'); return; }
      if (fa && fa.k === 'sang7' && (T.s7.slot < 0 || words(T.txt) < 3)) { PS.toast('Chọn lúc tập và viết lời hẹn nhé.'); return; }
      if (fa && fa.k === 'calc') { syncCalc(); if (!calcRes(T.c)) { PS.toast('Nhập đủ chiều cao, cân nặng, tuổi, giới tính và mức vận động nhé.'); return; } }
      if (fa && fa.k === 'commit' && T.hab >= HABITS.length && words(T.own) < 2) { PS.toast('Viết tên thói quen của bạn nhé.'); return; }
      if (fa && fa.k === 'habit' && T.hb >= habList().length && words(T.hown) < 2) { PS.toast('Viết tên thói quen của bạn nhé.'); return; }
      finishAct(); return;
    }
    if (a === 'pickNext') { T.round++; T.pick = -1; render(true); return; }
    if (a === 'smGo') { T.sm.i = 0; sfx('whistle'); render(true); return; }
    if (a === 'smPick') { smPick(+b.getAttribute('data-i')); return; }
    if (a === 'smBack') { T.sm.pick = -1; render(); return; }
    if (a === 'smNext') { T.sm.i++; T.sm.pick = -1; render(true); return; }
    /* Phòng test */
    if (a === 'qzGo' || a === 'qzAgain') { T.qz = { st: 1, L: qDraw(actById(V.a)), i: 0, ans: {}, sc: 0, pr: false, miss: false }; sfx('whistle'); render(true); return; }
    if (a === 'qzPick') { T.qz.ans[T.qz.i] = +b.getAttribute('data-i'); sfx('pop'); render(); return; }
    if (a === 'qzMove') { T.qz.i = Math.max(0, Math.min(T.qz.L.length - 1, T.qz.i + +b.getAttribute('data-d'))); render(true); return; }
    if (a === 'qzJump') { T.qz.i = +b.getAttribute('data-i'); render(true); return; }
    if (a === 'qzSubmit') { quizSubmit(); return; }
    if (a === 'tfPick') { var tq = T.tq, tv = +b.getAttribute('data-v'); tq.pick = tv; if (tv === TFY[tq.L[tq.i]].v) { tq.ok++; sfx('ting'); } else sfx('pop'); render(); return; }
    if (a === 'tfNext') { T.tq.i++; T.tq.pick = -1; if (T.tq.i >= T.tq.L.length) tfEnd(actById(V.a)); render(true); return; }
    if (a === 'tfAgain') { T.tq = null; render(true); return; }
    if (a === 'rdGo') { var rw = b.getAttribute('data-m') === 'w' ? shuf(wrongIds()).map(function (x) { return QBY[x]; }) : shuf(QB.dd.concat(QB.sk)); T.rd = { st: 1, L: rw.slice(0, 10).map(qItem), i: 0, pick: -1, tried: {}, first: 0, n: 0 }; sfx('whistle'); render(true); return; }
    if (a === 'rdPick') { rdPick(+b.getAttribute('data-i')); return; }
    if (a === 'rdNext') { T.rd.i++; T.rd.pick = -1; render(true); return; }
    if (a === 'plFood') { T.sel = +b.getAttribute('data-i'); T.wrong = ''; render(); return; }
    if (a === 'plZone') {
      var pa = actById(V.a); if (T.sel < 0) { PS.toast('Chạm một món trước, rồi chạm nhóm nhé.', 1800); return; }
      var it = pa.items[T.sel];
      if (it.z === b.getAttribute('data-z')) { T.placed[T.sel] = 1; T.sel = -1; T.wrong = ''; tick(); } else { T.wrong = BEP_TXT.plateWrong + (it.h || BEP_TXT.plateHint); }
      render(); return;
    }
    if (a === 'mTab') { T.mtab = +b.getAttribute('data-i'); render(); return; }
    if (a === 'mFood') { var mk = MEALS[T.mtab][0], ft = b.getAttribute('data-t'), L = T.meal[mk], fp = L.indexOf(ft); if (fp >= 0) L.splice(fp, 1); else L.push(ft); T.meal.skip[mk] = 0; render(); return; }
    if (a === 'mSkip') { var sk = MEALS[T.mtab][0]; T.meal.skip[sk] = T.meal.skip[sk] ? 0 : 1; if (T.meal.skip[sk]) T.meal[sk] = []; render(); return; }
    if (a === 'mNext') { T.mtab = Math.min(2, T.mtab + 1); render(); return; }
    if (a === 'mSee') { T.mres = true; render(true); return; }
    if (a === 'mBack') { T.mres = false; render(true); return; }
    if (a === 'hilo') { var hr = T.hp[T.round] = T.hp[T.round] || {}; hr[b.getAttribute('data-i')] = 1; if (b.getAttribute('data-hi') === '1') { hr.ok = 1; tick(); } render(); return; }
    if (a === 'hiloNext') { T.round++; render(true); return; }
    if (a === 'dayTap') { var di2 = +b.getAttribute('data-i'), dit = actById(V.a).items[di2]; if (dit.err) { if (!T.found[di2]) { T.found[di2] = 1; tick(); } } else if (!T.okTap[di2]) { T.okTap[di2] = 1; T.miss++; } render(); return; }
    if (a === 'dayShow') { T.miss = 99; render(); return; }
    if (a === 'cHab') { T.hab = +b.getAttribute('data-i'); render(); return; }
    if (a === 'cSex') { syncCalc(); T.c.sex = b.getAttribute('data-v'); render(); return; }
    if (a === 'cLv') { syncCalc(); T.c.lv = +b.getAttribute('data-i'); render(); return; }
    /* Góc nghề */
    if (a === 'bdZ') { var bzk = b.getAttribute('data-k'), bzp = T.bz.indexOf(bzk); if (bzp >= 0) T.bz.splice(bzp, 1); else if (T.bz.length >= 3) { PS.toast('Chọn tối đa 3 chỗ. Chạm lại một chỗ để bỏ chọn.', 2000); return; } else { T.bz.push(bzk); tick(); } T.bres = false; render(); return; }
    if (a === 'bdSee') { T.bres = true; render(); return; }
    if (a === 'ladP') { T.lad[b.getAttribute('data-k')] = +b.getAttribute('data-v'); T.lres = false; render(); return; }
    if (a === 'ladSee') { T.lres = true; render(); return; }
    /* Radio Taiso Deck + buổi 10 phút (TC01.1.5) */
    if (a === 'btGo') { btStart(); return; }
    if (a === 'rqPick') { var qi = +b.getAttribute('data-i'), qa = actById(V.a), qo = rtqOpts(qa, T.rq.i), qr = rtqRounds(qa)[T.rq.i]; T.rq.pick = qi; if (qo[qi] === rtName(qr.m)) { var tn = 0; for (var tk in T.rq.tried) if (T.rq.tried.hasOwnProperty(tk)) tn++; if (!tn) T.rq.first++; } else T.rq.tried[qi] = 1; render(); return; }
    if (a === 'rqNext') { T.rq.i++; T.rq.pick = -1; T.rq.tried = {}; render(true); return; }
    if (a === 'rfTp') { T.rf.tp = +b.getAttribute('data-i'); render(); return; }
    if (a === 'rfStart') { T.rf = { st: 1, tp: T.rf.tp, mi: 0, g: 0, run: true, feel: -1 }; render(true); rfRun(0); return; }
    if (a === 'rfPause') { if (T.rf.run) rfPause(); else rfRun(T.rf.g); render(); return; }
    if (a === 'rfSkip') { var fa2 = actById(V.a), PL2 = rfPlan(fa2), nx = T.rf.mi + 1 < fa2.mv.length ? PL2.st[T.rf.mi + 1] : PL2.tot, wr = T.rf.run; mtStop(); T.rf.run = false;
      if (nx >= PL2.tot) { T.rf.st = 2; tick(); render(true); } else { T.rf.mi++; T.rf.g = nx; T.rf.run = wr; render(); if (wr) rfRun(nx); } return; }
    if (a === 'rfAgain') { T.rf = { st: 0, tp: T.rf.tp, mi: 0, g: 0, run: false, feel: -1 }; render(true); return; }
    if (a === 'rfFeel') { T.rf.feel = +b.getAttribute('data-i'); render(); return; }
    if (a === 'rsC') { T.rs.c[+b.getAttribute('data-c')] = +b.getAttribute('data-i'); render(); return; }
    if (a === 'rsNeed') { var rn = +b.getAttribute('data-i'); T.rs.need[rn] = T.rs.need[rn] ? 0 : 1; render(); return; }
    if (a === 's7Slot') { syncWrite(); T.s7.slot = +b.getAttribute('data-i'); render(); return; }
    if (a === 's7Tick') { var X7 = S.radio.s7; if (X7) { X7.days[today()] = 1; markDay(); save(true); tick(); PS.toast(RT_TXT.s7Toast); } if (nbOpen) drawNb(); else render(); return; }
    if (a === 's10') { if (!QS || QS.st !== 2) qNew(); go({ v: 's10' }); return; }
    if (a === 'qMenu') { QS.m = id; QS.st = 1; sfx('slide'); render(true); return; }
    if (a === 'qBack') { QS.st = 0; render(true); return; }
    if (a === 'qStart') { QS.segs = qSegs(QS.m); QS.i = 0; QS.st = 2; QS.act = 0; QS.rem = -1; beep(true); qRun(); render(true); return; }
    if (a === 'qPause') { if (QS.run) qPause(); else qRun(); render(); return; }
    if (a === 'qSkip') { if (QS.run) QS.act += Date.now() - QS.last; qStop(); qNext(); return; }
    if (a === 'qEnd') { qEnd(); return; }
    if (a === 'qPain') { qEnd(); QS.feel = 3; render(); return; }
    if (a === 'qFeel') { QS.feel = +b.getAttribute('data-i'); render(); return; }
    if (a === 'qSave') { if (QS.feel >= 0) qSave(); return; }
    if (a === 'flStart') { T.fl = { i: 0, run: false, rem: -1, end: 0, feel: -1 }; flRun(); render(true); return; }
    if (a === 'flPause') { if (T.fl.run) flPause(); else flRun(); render(); return; }
    if (a === 'flSkip') { flStop(); flNext(); return; }
    if (a === 'flAgain') { T.fl = { i: -1, run: false, rem: -1, end: 0, feel: -1 }; render(true); return; }
    if (a === 'flFeel') { T.fl.feel = +b.getAttribute('data-i'); render(); return; }
    if (a === 'caS') { var ci = +b.getAttribute('data-i'), cp = T.cs.indexOf(ci); if (cp >= 0) T.cs.splice(cp, 1); else if (T.cs.length >= 2) { PS.toast('Chọn 2 mốc giờ thôi. Chạm lại một mốc để bỏ chọn.', 2000); return; } else { T.cs.push(ci); tick(); } render(); return; }
    if (a === 'caSee') { T.cres = true; render(); return; }
    if (a === 'caSch') { T.sch = +b.getAttribute('data-i'); tick(); render(); return; }
    if (a === 'hbO') { T.hb = +b.getAttribute('data-i'); render(); return; }
    if (a === 'wkD') { var wd = +b.getAttribute('data-i'), wp = T.wk.days.indexOf(wd); if (wp >= 0) T.wk.days.splice(wp, 1); else T.wk.days.push(wd); syncWrite(); render(); return; }
    if (a === 'wkS') { T.wk.slot = +b.getAttribute('data-i'); syncWrite(); render(); return; }
    /* Bếp đợt 2 */
    if (a === 'mtV') { T.ms = +b.getAttribute('data-i'); T.mw = -1; render(); return; }
    if (a === 'mtJ') { var mj = +b.getAttribute('data-i'); if (T.ms < 0) { PS.toast('Chạm một món Việt trước nhé.', 1800); return; } if (mj === T.ms) { T.mm[mj] = 1; T.mlast = mj; T.ms = -1; T.mw = -1; tick(); } else { T.mw = mj; T.mlast = -1; } render(); return; }
    if (a === 'bkI') { var bki = +b.getAttribute('data-i'); T.bk[bki] = T.bk[bki] ? 0 : 1; if (T.bk[bki]) tick(); render(); return; }
    if (a === 'lbR') { var lk = b.getAttribute('data-k'), LR = actById(V.a).rounds[T.round]; T.lseen[lk] = 1; if (lk === String(LR.ok)) { T.lk[T.round] = 1; T.lw = ''; tick(); } else T.lw = lk; render(); return; }
    if (a === 'lbNext') { T.round++; T.lw = ''; render(true); return; }
    if (a === 'shPre') { var sp = SHIFTS[+b.getAttribute('data-i')]; T.sh = { s: sp.s, l: sp.l, pre: +b.getAttribute('data-i') }; render(); return; }
    if (a === 'shS') { T.sh.s = (T.sh.s + (+b.getAttribute('data-d')) + 24) % 24; T.sh.pre = -1; render(); return; }
    if (a === 'shL') { T.sh.l = Math.max(3, Math.min(12, T.sh.l + (+b.getAttribute('data-d')))); T.sh.pre = -1; render(); return; }
    if (a === 'btO') { var bsk = b.getAttribute('data-k'), bsi = +b.getAttribute('data-i'), BA = actById(V.a), SL = null; BA.slots.forEach(function (x) { if (x.k === bsk) SL = x; });
      if (SL.opts[bsi].no) { T.bw = { k: bsk, i: bsi }; delete T.bt[bsk]; } else { T.bt[bsk] = bsi; if (T.bw && T.bw.k === bsk) T.bw = null; tick(); } render(); return; }
    if (a === 'dtP') { T.pick = +b.getAttribute('data-v'); if (T.pick === actById(V.a).items[T.round].ok) tick(); render(); return; }
    if (a === 'dtNext') { T.round++; T.pick = -1; render(true); return; }
    if (a === 'howEx') { T.ex = +b.getAttribute('data-i'); T.fr = 0; render(); return; }
    if (a === 'howFr') { T.fr = Math.max(0, T.fr + (+b.getAttribute('data-d'))); render(); return; }
    if (a === 'hs') { var ac = actById(V.a), k2 = T.round + '.' + b.getAttribute('data-i'); if (!T.found[k2]) { T.found[k2] = 1; tick(); } render(); return; }
    if (a === 'hsMiss') { T.miss++; PS.toast('Chưa phải chỗ này. Thử lại nhé.', 1600); render(); return; }
    if (a === 'spotNext') { T.round++; T.miss = 0; render(true); return; }
    if (a === 'spotShow') { T.miss = 4; render(); return; }
    if (a === 'ftGo' || a === 'ftAgain') { stopTimer(); T.ft = { st: 1, i: 0, r: {}, rs: 0, feel: -1, rec: -1 }; T.n = 0; T.el = 0; T.run = false; T.tryEx = ftEx(actById(V.a).items[0]) || null; sfx('whistle'); render(true); return; }
    if (a === 'ftDone' || a === 'ftSkip') {
      stopTimer(); var fa = actById(V.a), fk = fa.items[T.ft.i], fv = -1, fin = $('#cNin');
      if (a === 'ftDone') {
        if (fin && fin.value) T.n = Math.max(0, Math.min(999, parseInt(fin.value, 10) || 0));
        fv = FT[fk].u === 's' ? Math.round(T.el / 1000) : T.n;
        if (fv <= 0) { PS.toast(FT[fk].u === 's' ? 'Bấm Bắt đầu và giữ nhịp trước đã nhé. Không làm được thì chọn Bỏ qua.' : 'Bạn chưa đếm cái nào. Chạm nút tròn mỗi lần làm xong nhé.'); return; }
      }
      T.ft.r[fk] = fv; T.ft.st = 2; T.ft.rs = Date.now();
      if (T.ft.i >= fa.items.length - 1) { var anyR = false; fa.items.forEach(function (x) { if (T.ft.r[x] > 0) anyR = true; }); if (!anyR) { T.ft.st = 1; PS.toast(FT_TXT.noData, 3000); render(); return; } }
      sfx(fv > 0 ? 'ting' : 'pop'); render(true); return;
    }
    if (a === 'ftNext') {
      stopTimer(); var na = actById(V.a);
      if (T.ft.i >= na.items.length - 1) { T.ft.st = 3; ftRecord(na); }
      else { T.ft.i++; T.ft.st = 1; T.n = 0; T.el = 0; T.run = false; T.tryEx = ftEx(na.items[T.ft.i]) || null; }
      render(true); return;
    }
    if (a === 'ftFeel') { T.ft.feel = +b.getAttribute('data-i'); var fh = FTS().h; if (T.ft.rec >= 0 && fh[T.ft.rec]) fh[T.ft.rec].f = T.ft.feel; save(); render(); return; }
    if (a === 'tryEx') { T.tryEx = b.getAttribute('data-x'); render(); return; }
    if (a === 'tryGo') { T.n = 0; T.el = 0; T.run = false; V.step = 1; render(); return; }
    if (a === 'tap') { T.n++; tick(); var cn = $('#cN'); if (cn) { cn.textContent = T.n; cn.parentNode.classList.remove('bump'); void cn.offsetWidth; cn.parentNode.classList.add('bump'); } var ni = $('#cNin'); if (ni) ni.value = ''; return; }
    if (a === 'tapMinus') { T.n = Math.max(0, T.n - 1); var cm = $('#cN'); if (cm) cm.textContent = T.n; return; }
    if (a === 'tStart') { if (T.run) { stopTimer(); } else { T.t0 = Date.now(); T.run = true; } render(); return; }
    if (a === 'tReset') { stopTimer(); T.el = 0; render(); return; }
    if (a === 'tryDone') {
      stopTimer(); var M = MOC[T.tryEx] || {}, ninp = $('#cNin');
      if (ninp && ninp.value) T.n = Math.max(0, Math.min(999, parseInt(ninp.value, 10) || 0));
      var n = M.u === 's' ? Math.round(T.el / 1000) : T.n;
      if (n <= 0) { PS.toast(M.u === 's' ? 'Bấm Bắt đầu và giữ tư thế trước đã nhé.' : 'Bạn chưa đếm cái nào. Chạm nút tròn mỗi lần làm xong nhé.'); return; }
      T.isPr = best(T.tryEx) > 0 && n > best(T.tryEx); (S.log[T.tryEx] = S.log[T.tryEx] || []).push({ d: Date.now(), n: n, f: -1 }); if (S.log[T.tryEx].length > 60) S.log[T.tryEx].shift();
      save(); V.step = 2; render(true); return;
    }
    if (a === 'feel') { T.feel = +b.getAttribute('data-i'); var l = S.log[T.tryEx]; if (l && l.length) l[l.length - 1].f = T.feel; save(); render(); return; }
    if (a === 'tryNext') { V.step = 3; render(true); return; }
    if (a === 'wTip') { var ta = $('#wTxt'); T.txt = b.getAttribute('data-t'); T.tipUsed = T.txt; if (ta) { ta.value = T.txt; ta.focus(); } syncWrite(); return; }
    if (a === 'ord') { var i = +b.getAttribute('data-i'); if (T.ord.indexOf(i) < 0) T.ord.push(i); render(); return; }
    if (a === 'ordReset') { T.ord = []; render(); return; }
    if (a === 'pick') { T.pick = +b.getAttribute('data-i'); render(); return; }
    if (a === 'planK') { T.plan.k = b.getAttribute('data-k'); render(); return; }
    if (a === 'planD') { var di = +b.getAttribute('data-i'), p = T.plan.days.indexOf(di); if (p >= 0) T.plan.days.splice(p, 1); else T.plan.days.push(di); render(); return; }
    if (a === 'planS') { T.plan.slot = +b.getAttribute('data-i'); render(); return; }
    if (a === 'pTip') { var pt = $('#pTxt'); T.plan.txt = b.getAttribute('data-t'); T.tipUsed = T.plan.txt; if (pt) pt.value = T.plan.txt; syncWrite(); return; }
  });
  D.addEventListener('input', function (e) {
    var t = e.target;
    if (t.id === 'jGoal' || t.id === 'jH' || t.id === 'jW') syncJoin();
    if (t.id === 'wTxt' || t.id === 'pTxt') syncWrite();
    if (t.id === 'cH' || t.id === 'cW' || t.id === 'cA') syncCalc();
    if (t.id === 'cOwn') T.own = t.value;
    if (t.id === 'hbOwn') T.hown = t.value;
    var kc = t.getAttribute && t.getAttribute('data-kc');
    if (kc && !IS_DEMO) { S.kc[kc] = t.value; save(); var km = $('#kcMsg'); if (km) km.textContent = KC.saved; }
  });
  function syncJoin() {
    var g = $('#jGoal'), h = $('#jH'), w = $('#jW');
    if (g) J.goal = g.value; if (h) J.h = h.value.replace(/[^\d]/g, ''); if (w) J.w = w.value.replace(/[^\d.,]/g, '');
    var bt = $('#jDoneBtn'); if (bt) bt.disabled = words(J.goal) < 3;
    var bm = $('#jBmi'); if (bm) bm.innerHTML = bmiHTML(J.h, J.w);
  }
  function syncWrite() {
    var ta = $('#wTxt'); if (ta) { T.txt = ta.value; var w = words(T.txt), c = $('#wCnt'); if (c) c.textContent = w + ' chữ' + (w >= 10 ? (T.txt === T.tipUsed ? ' · sửa thành lời của bạn để được Insight' : ' · +1 Insight') : ''); var d = $('#wDone'); if (d) d.disabled = w < 3; }
    var pt = $('#pTxt'); if (pt) { T.plan.txt = pt.value; var pd = $('#pDone'); if (pd) pd.disabled = words(T.plan.txt) < 4; }
  }

  /* ---------- khởi động ---------- */
  var GO = PS.goParam();
  function start() {
    loadState();
    if (!S.mem) { V = { v: 'join', step: 0 }; J = {}; } else V = { v: 'home' };
    NAV.start(W.location.pathname); /* PS1.3.55: bỏ ?demo, ?go khỏi địa chỉ; đếm mục lịch sử cho nút ‹ */
    var ga = S.mem && GO ? actById(GO) : null, gb = S.mem && GO ? BAI_BY[GO] : null;
    if (ga && BAI_BY[ga.bai] && !BAI_BY[ga.bai].soon) { T = newT(ga); NAV.go({ v: 'act', a: ga.id, b: ga.bai, step: 0 }); V = { v: 'act', a: ga.id, b: ga.bai, step: 0 }; }
    else if (gb && !gb.soon) { NAV.go({ v: 'bai', id: gb.id }); V = { v: 'bai', id: gb.id }; }
    markDay(); render(true); save(true);
    if (IS_DEMO) PS.toast('Bản demo giáo viên · học viên giả định đã làm 2 bài Sàn tập, 1 bài Bếp.', 4200);
  }
  if (DQ.on) {
    if (PS.checkDemo(DQ.val)) { IS_DEMO = true; start(); }
    else PS.demoAsk(function (ok) { if (ok) { IS_DEMO = true; start(); } else { if (PS.needProfile() || !PS.isUnlocked(ID)) PS.guard(ID); else start(); } });
  } else start();
})(window, document);
