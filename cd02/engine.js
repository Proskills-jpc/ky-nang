/* CD02 · Career Design 2 · Hải Đồ La Bàn · cd02/engine.js · BỘ MÁY: trạng thái, gắn lõi Proskills, hải đồ, bến, chặng, các dạng bước, Sổ tay, demo.
   Luồng: Hải đồ (Sổ Thuyền Trưởng + bản đồ sương mù) → trang bến (lời Shin, ≤3 chặng, con dấu) → trang chặng (mỗi bước một màn).
   Không tuyến tính: Vòng Khám phá (b1, b2) đi thứ tự tùy ý; Vòng Thiết kế lần lượt; Vòng Ra khơi (b5, b6) tùy ý; 8 đảo ghé tự do sau khi nhận thuyền.
   Cảng Khởi Hành (GOAL_PORT, f1–f2) mở khi đủ 7 con dấu bến (PS1.3.42: thêm Bến 6 Phòng Tuyển Dụng, Ngọn Hải Đăng thành Bến 7); xong f2 → S.fin, Bằng Thuyền Trưởng Vững Vàng, mở trang phục Thuyền trưởng trong Tủ đồ của Shin.
   Chữ ở content.js, hình ở art.js. ES5. */
(function (W, D) {
  'use strict';
  var PS = W.PS, ID = CD2_ID, esc = PS.esc;
  var DEMO_KEY = 'ps.demo.' + ID;
  var DQ = PS.demoParam();
  var WANT_DEMO = DQ.on && PS.checkDemo(DQ.val);
  var ASK_DEMO = DQ.on && !WANT_DEMO;
  var DEMO_ON = WANT_DEMO || (!ASK_DEMO && !!PS.get(DEMO_KEY, null));
  var OK = DEMO_ON || ASK_DEMO || PS.guard(ID);
  if (!OK) return;
  var RM = false; try { RM = !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) {}

  /* =========================================================
     1. TRẠNG THÁI
     ========================================================= */
  function blank() { return { v: 2, intro: 0, created: Date.now(), d: {}, done: {}, xp: {}, ins: {}, days: {}, seen: {}, cards: {}, isl: {}, stamp: {}, bak: {}, btl: {}, shipSeen: {} }; }
  function normalize(s) { var b = blank(); for (var k in b) if (s[k] === undefined) s[k] = b[k]; return s; }
  /* PS1.3.42: bài làm bản cũ → bản 2 (Ngọn Hải Đăng b61, b62 → b71, b72; con dấu b6 → b7; chặng gộp b13, b43, b53 bỏ dấu xong riêng) */
  function migrate(s) {
    if ((+s.v || 1) >= 2) return s;
    var d = s.d || {}, nd = {}, k;
    for (k in d) if (d.hasOwnProperty(k)) nd[k.indexOf('b61.') === 0 ? 'b71.' + k.slice(4) : (k.indexOf('b62.') === 0 ? 'b72.' + k.slice(4) : k)] = d[k];
    s.d = nd;
    ['done', 'xp', 'ins', 'bak'].forEach(function (f) { var o = s[f]; if (!o) return; ['b13', 'b43', 'b53'].forEach(function (x) { delete o[x]; });
      if (f === 'bak') { delete o.b61; delete o.b62; return; } if (o.b62 !== undefined) { o.b72 = o.b62; delete o.b62; } if (o.b61 !== undefined) { o.b71 = o.b61; delete o.b61; } });
    ['stamp', 'seen'].forEach(function (f) { var o = s[f]; if (o && o.b6 !== undefined) { o.b7 = o.b6; delete o.b6; } });
    s.v = 2; return s;
  }
  function load() {
    var s = null;
    try { s = (DEMO_ON && !WANT_DEMO) ? PS.get(DEMO_KEY, null) : PS.load(ID); } catch (e) {}
    if (s && typeof s === 'object' && !s.shipSeen) { s.shipSeen = {}; var sk; for (sk in (s.stamp || {})) if (s.stamp.hasOwnProperty(sk)) s.shipSeen[sk] = 1; if (s.fin) s.shipSeen.fin = 1; } /* PS1.3.57: bến đã có dấu từ trước coi như đã xem thuyền */
    return (s && typeof s === 'object') ? normalize(migrate(s)) : blank();
  }
  var S = load();
  var NOSAVE = ASK_DEMO ? 1 : 0, saveT = null;
  function prof() { return S.demo ? (S.prof || {}) : PS.profile(); }
  function given() { var n = String(prof().name || '').replace(/^\s+|\s+$/g, '').split(/\s+/); return n[n.length - 1] || 'bạn'; }
  function g(k) { return S.d[k]; }
  function trim(x) { return String(x == null ? '' : x).replace(/^\s+|\s+$/g, ''); }
  function sumObj(o) { var t = 0; for (var k in o) if (o.hasOwnProperty(k)) t += (+o[k] || 0); return t; }
  function xpTotal() { return sumObj(S.xp); }
  function insTotal() { return sumObj(S.ins); }
  function doneMain() { var n = 0; ORDER.forEach(function (a) { if (S.done[a]) n++; }); return n; }
  function cnt(o) { var n = 0; for (var k in o) if (o.hasOwnProperty(k) && o[k]) n++; return n; }

  /* CD01 (nếu đã học): nghề, hướng 5 năm, thư gửi mình 5 năm sau */
  function cd1() { if (S.demo) return S.cd1 || {}; try { var s = PS.summary('cd01'); return (s && s.extra) || {}; } catch (e) { return {}; } }
  function indName(k) { for (var i = 0; i < INDS2.length; i++) if (INDS2[i][0] === k) return INDS2[i][1]; return ''; }
  function jobKey() { var x = g('x1.job'); if (x && x !== 'u') return indName(x) ? x : ''; var c = cd1(); if (c.jobKey && indName(c.jobKey)) return c.jobKey; if (c.main && indName(c.main)) return c.main; return ''; }
  function jobName() { var x = g('x1.job'); if (x === 'u') return 'bạn chọn'; if (x && indName(x)) return indName(x); var c = cd1(); return c.mainName || indName(jobKey()) || 'bạn chọn'; }
  function hasCd1() { var c = cd1(); return !!(c.main || c.jobKey || c.goal); }
  /* PS1.3.41: trạng thái CD01 · 'done' xong khóa · 'part' làm dở · 'none' chưa học */
  function cd1State() {
    if (S.demo) return S.cd1 ? 'done' : 'none';
    var s = null; try { s = PS.summary('cd01'); } catch (e) {}
    if (!s) return 'none';
    var x = s.extra || {};
    if (x.endAt || (s.total && s.done >= s.total)) return 'done';
    return (s.done > 0 || hasCd1()) ? 'part' : 'none';
  }
  function cd1Done() { var s = null; try { s = PS.summary('cd01'); } catch (e) {} return s ? [s.done || 0, s.total || 0] : [0, 0]; }
  function arr(v) { return v && v.push ? v.filter(function (x) { return trim(x); }) : (trim(v) ? [trim(v)] : []); }
  function cut1(t, n) { t = trim(t); n = n || 150; return t.length > n ? t.slice(0, n - 1) + '…' : t; }
  /* bài CD01 dùng lại ở CD02; nếu chưa có thì lấy câu trả lời nhanh ở Xuất phát (x1.me, x1.val, x1.good) */
  function c1Val(k) {
    var c = cd1();
    switch (k) {
      case 'main': return c.mainName || '';
      case 'me': return (trim(c.me) || trim(g('x1.me'))).replace(/^5 năm sau,? mình muốn là người\s*/i, '');
      case 'value': return arr(c.value).join(', ') || arr(g('x1.val')).join(', ');
      case 'good': return arr(c.good).join(', ') || arr(g('x1.good')).join(', ');
      case 'like': return arr(c.like).join(', ');
      case 'far': return trim(c.far);
      case 'p2': return trim(c.p2);
      case 'jp2': return trim(c.jp2);
      case 'work': return arr(c.work).join(' · ');
      case 'senpai': return trim(c.senpai);
      case 'learn': return trim(c.learn);
      case 'qs': return arr(c.qs).join(' · ');
      case 'worry': return trim(c.worry);
      case 'b': return trim(c.bName);
      case 'first': return trim(c.first);
      case 'guide': return trim(c.guide);
      case 'habits': return arr(c.habits).join(' ');
      case 'motto': return trim(c.motto);
      case 'letter': return trim(c.letter);
      case 'iv': return trim(c.iv);
    }
    return '';
  }
  function c1HTML(keys) {
    var rows = keys.map(function (k) { var t = c1Val(k); return t ? '<div><small>' + esc(C1_LAB[k] || '') + '</small><b>' + esc(cut1(t)) + '</b></div>' : ''; }).join('');
    return rows ? '<div class="c1"><span class="c1__tag">' + PS.icon('book', 13) + 'Từ CD01</span>' + rows + '</div>' : '';
  }

  function isleOf(id) { for (var i = 0; i < ISLES.length; i++) if (ISLES[i].id === id) return ISLES[i]; return null; }
  function spOf(id) { for (var i = 0; i < SENPAI.length; i++) if (SENPAI[i].id === id) return SENPAI[i]; return null; }
  function benOf(id) { if (id === PORT.id) return PORT; if (id === GOAL_PORT.id) return GOAL_PORT; for (var i = 0; i < BEN.length; i++) if (BEN[i].id === id) return BEN[i]; return null; }
  function fogOpen() { return cnt(S.isl); }
  function fogPct() { return Math.round((1 - fogOpen() / ISLES.length) * 100); }
  function cardN() { return cnt(S.cards); }
  function stampN() { return cnt(S.stamp); }
  function shipLv() { var n = 0; BEN.forEach(function (b) { if (S.stamp[b.id]) n++; }); return n; }
  /* PS1.3.52: món trên thuyền = bến đã có dấu (+ fin khi nhận bằng); cấp 0–8 */
  function shipP() { var P = {}; BEN.forEach(function (b) { if (S.stamp[b.id]) P[b.id] = 1; }); if (S.fin) P.fin = 1; return P; }
  function shipCap() { return shipLv() + (S.fin ? 1 : 0); }
  function shipUpHTML(b, anim, noCap) { /* popup con dấu / bằng: thuyền cũ → món mới hiện dần, lấp lánh */
    var f = flag(), P = shipP(), k = b === GOAL_PORT ? 'fin' : b.id, it = SHIP_ITEM[k], w = 180, nw = shipSVG2(P, f.s, f.c, w), h, Q = {}, x;
    if (!it) return nw + '<p class="shipcap">' + esc(SHIP_PORT) + '</p>';
    if (anim && P[k]) { for (x in P) { if (x !== k) Q[x] = 1; } h = '<div class="shipup">' + shipSVG2(Q, f.s, f.c, w) + '<div class="shipup__new">' + nw + '</div>' + shipSpk(k) + '</div>'; }
    else h = nw;
    if (noCap) return h;
    return h + '<p class="shipcap">' + (anim ? 'Thuyền vừa có thêm: ' : 'Món của bến này: ') + '<b>' + esc(it[0]) + '</b><small>' + esc(it[1]) + '</small></p>';
  }
  function shipSec() { /* Sổ Thuyền Trưởng: thuyền cấp x/8, món chưa có vẽ mờ */
    var f = flag(), P = shipP(), li = BEN.concat([GOAL_PORT]).map(function (b) {
      var k = b === GOAL_PORT ? 'fin' : b.id, on = !!P[k];
      return '<li class="' + (on ? 'on' : '') + '">' + (on ? PS.icon('check', 13, 2.6) : '<i></i>') + '<span><small>' + esc(b === GOAL_PORT ? b.n : benLabel(b)) + '</small>' + esc(SHIP_ITEM[k][0]) + '</span></li>';
    }).join('');
    return '<div class="lbk__sl"><b>Thuyền của bạn</b><span>cấp ' + shipCap() + ' / 8</span></div><div class="lbk__ship">' + shipSVG2(P, f.s, f.c, 260, 1) + '</div><ul class="shipls">' + li + '</ul>';
  }
  function flag() { var f = g('x1.flag') || {}; return { s: f.s || 'compass', c: flagCol(f.c || '#D97757') }; }

  /* chữ có chỗ chèn */
  function lean() { /* bên nghiêng rõ nhất ở la bàn */
    var v = g('b31.v') || [], best = -1, bi = -1;
    PAIRS.forEach(function (p, i) { var x = v[i] == null ? 5 : +v[i], d = Math.abs(x - 5); if (d > best) { best = d; bi = i; } });
    if (bi < 0 || best === 0) return 'ở giữa';
    var x2 = v[bi] == null ? 5 : +v[bi];
    return x2 < 5 ? PAIRS[bi][0] : PAIRS[bi][1];
  }
  function windTxt(k) { var i = g(k); return i == null || i === '' ? 'điều đó' : WINDS[+i]; }
  /* PS1.3.45: b32 hai vòng tròn. Học viên tự viết 2–3 điều (b32.w0..w2), đặt vào vòng trong (in: mình tác động được) hay vòng ngoài (out: khó tác động); b32.a0..a2 là cách ứng phó. */
  function windList() { var Z = g('b32.z') || {}, L = []; [0, 1, 2].forEach(function (i) { var t = trim(g('b32.w' + i)); if (t.length >= 3) L.push({ i: i, t: t, z: Z[i] || '', a: trim(g('b32.a' + i)) }); }); return L; }
  function gioTxt() { var L = windList(), o = null; L.forEach(function (w) { if (!o && w.z === 'out') o = w; }); o = o || L[0]; if (o) return o.t; return g('b32.h') != null ? windTxt('b32.h') : 'gia đình cần bạn về'; }
  /* PS1.3.45: nhóm sở thích RIASEC từ CD01 (chỉ khi đã làm trắc nghiệm). Gợi ý tham khảo. */
  function ria() { var r = String(cd1().ria || '').toUpperCase().replace(/[^RIASEC]/g, ''); return r ? r.split('').slice(0, 3) : []; }
  function riaIsles() { var R = ria(), out = []; R.slice(0, 2).forEach(function (k) { (RIA_ISLE[k] || []).forEach(function (id) { if (out.indexOf(id) < 0 && out.length < 3) out.push(id); }); }); return out; }
  function riaNote() { var R = ria(); return R.length ? '<p class="ria-note">' + PS.icon('spark', 14) + '<span>Nhóm sở thích của bạn ở CD01: <b>' + esc(R.join('-')) + '</b> (' + esc(R.map(function (k) { return RIA_N[k]; }).join(', ')) + '). Nhãn “Hợp sở thích” chỉ là gợi ý tham khảo.</span></p>' : ''; }
  function T(s) {
    var is = isleOf(g('b13.isl'));
    return String(s == null ? '' : s).replace(/\[Tên\]/g, '<b class="nm">' + esc(given()) + '</b>').replace(/\[Nghề\]/g, '<b>' + esc(jobName()) + '</b>')
      .replace(/\[Đảo\]/g, '<b>' + esc(is ? is.n : 'bạn chọn') + '</b>').replace(/\[Lệch\]/g, esc(lean())).replace(/\[Gió\]/g, esc(gioTxt())).replace(/\[Gió2\]/g, esc(windTxt('b32.c')))
      .replace(/\[Nghiêng\]/g, esc(leanName()));
  }
  function Q(x) { return T(esc(x)); }

  function extra() {
    var tags = g('b12.t') || {}, cur = [];
    ISLES.forEach(function (is) { if (tags[is.id] === 'cur') cur.push(is.n); });
    var bs = null; BASE5.forEach(function (b) { if (b.id === g('b22.base')) bs = b.n; });
    return { job: jobKey(), jobName: jobName(), flag: flag(), motto: g('x1.motto') || '', goal: g('x1.goal') || '',
      open1: { n: g('x1.n') || '', sure: g('x1.sure') == null ? '' : +g('x1.sure'), now: g('x1.now') || '' },
      fog: fogPct(), isles: fogOpen(), cards: cardN(), curious: cur, isl: (isleOf(g('b13.isl')) || {}).n || '', islWhy: g('b13.why') || '',
      books: [g('b21.b1') || '', g('b21.b2') || ''], take: g('b21.take') || '', base: bs || '', baseAct: g('b22.act') || '', askSenpai: g('b23.q') || '',
      compass: g('b31.v') || [], lean: lean(), leanWhy: g('b31.why') || '', windHard: gioTxt(), adapt: g('b32.hard') || '', can: g('b32.can') || '', winds: windList(), common: g('b22.sel') || [], needA: needSum(), needNote: g('b41.nd') || '',
      work: g('b33.work') || '', success: sucList(), life30: g('b33.life') || '', stamps: stampN(),
      voy: VOY.map(function (x) { var is = voyIsle(x[0]); return { l: x[1], isl: is ? is.n : '', name: g(x[0] + '.name') || '', jl: g(x[0] + '.jl') || '', m: msList(x[0]), g: g(x[0] + '.g') || {}, score: voyScore(x[0]) }; }),
      trio: g('b43.see') || '', leanVoy: leanLetter(), leanFeel: g('b51.feel') || '', leanWhy5: g('b51.why') || '',
      block: (blk() || {}).t || '', blockRoot: g('b52.w3') == null ? '' : WHY3[+g('b52.w3')], ways: waysSel(), firstStep: g('b52.first') || '',
      trial: trialTxt(), trialStart: g('b53.start') || '', trialDays: cnt(g('b53.tk') || {}), trialLearn: g('b53.learn') || '',
      ring: g('b71.r') || {}, guide: ringName(g('b71.key')), ask: g('b71.ask') || '', met: g('b71.met') || '', ria: ria().join(''), work6: g('b72.w') || {}, learnH: g('b72.h') || '', learnHow: g('b72.how') || '',
      open2: { n: g('f1.n') || '', sure: g('f1.sure') == null ? '' : +g('f1.sure') }, change: g('f1.change') || '', ps: g('f1.ps') || '', fin: S.fin || 0,
      peer: g('b23.who') || '', ad: adSum(), iv: ivSum(), plan3: p3Sum(), clip: clipSum(), db: dbSum(), rt: { id: rtTrialId(), st: rtState(rtTrialId()), dn: rtDays(rtTrialId()) }, cross: crossSum(), tourWhy: g('b72.why') || '', hard: hardSum(), lesson: { t: lessonTitle(), m: [g('b73.m1') || '', g('b73.m2') || '', g('b73.m3') || ''] }, proto: protoSum(), shore: shoreSum(), chest: chestSum(), btl: btlN(), fut: futSum(),
      next: nextInfo(), cd1: cd1State(), carry: (g('x1.carry') || []).map(function (k) { return C1_LAB[k]; }), quick: { me: g('x1.me') || '', val: g('x1.val') || [], good: g('x1.good') || [] } };
  }
  function nextInfo() { var n = nextAct(); if (!n || !ACTS[n]) return null; return { t: navName(benOf(ACTS[n].st)) + ' · ' + ACTS[n].t, go: n }; } /* PS1.3.55 (ý 24) */
  function save(now) {
    clearTimeout(saveT);
    if (NOSAVE || W.PS_NOSAVE) return;
    var w = function () {
      if (NOSAVE || W.PS_NOSAVE) return;
      try {
        if (S.demo) { S.savedAt = Date.now(); PS.set(DEMO_KEY, S); return; }
        PS.save(ID, S);
        PS.report(ID, { xp: xpTotal(), ins: insTotal(), done: doneMain(), total: CD2_TOTAL, days: S.days, ver: CD2_VER, extra: extra() });
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
  var lastAct = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { W.addEventListener(ev, function () { lastAct = Date.now(); }, { passive: true }); });
  setInterval(function () {
    if (D.visibilityState !== 'visible' || Date.now() - lastAct > 60000 || S.demo) return;
    var k = PS.today(); S.days[k] = Math.round(((S.days[k] || 0) + 0.25) * 100) / 100; save();
  }, 15000);
  function markDay() { if (S.demo) return; var k = PS.today(); if (!S.days[k]) { S.days[k] = 0.25; save(); } }

  /* =========================================================
     2. BẾN, VÒNG, MỞ KHÓA
     ========================================================= */
  function benDone(b) { return !!b && b.acts.length > 0 && b.acts.every(function (a) { return !!S.done[a]; }); }
  function portDone() { return !!S.done.x1; }
  function benOpen(b) {
    if (b === PORT) return true;
    if (!portDone() || !b.ready) return false;
    if (b.r === 1) return true;
    if (b.id === 'b3') return benDone(benOf('b1')) && benDone(benOf('b2'));
    if (b.id === 'b4') return benDone(benOf('b3'));
    if (b.r === 3) return benDone(benOf('b4'));
    if (b === GOAL_PORT) return allBen();
    return false;
  }
  function allBen() { return BEN.every(function (x) { return !!S.stamp[x.id]; }); }
  function finDone() { return !!S.fin; }
  function lockMsg(b) {
    if (!portDone()) return SHIN_TALK.lockP;
    if (!b.ready) return SHIN_TALK.soon;
    if (b.id === 'b3') return SHIN_TALK.lockR2;
    if (b.id === 'b4') return SHIN_TALK.lockR2b;
    if (b === GOAL_PORT) return SHIN_TALK.lockFin6;
    return SHIN_TALK.lockR3;
  }
  function actOpen(id) { var a = ACTS[id]; if (!a) return false; var b = benOf(a.st); if (!benOpen(b)) return false; return true; }
  function nextAct() {
    if (!S.done.x1) return 'x1';
    var cand = [];
    BEN.concat([GOAL_PORT]).forEach(function (b) { if (benOpen(b)) b.acts.forEach(function (a) { if (!S.done[a]) cand.push(a); }); });
    /* ưu tiên bến đang dở */
    for (var i = 0; i < cand.length; i++) { var b = benOf(ACTS[cand[i]].st); if (b.acts.some(function (a) { return !!S.done[a]; })) return cand[i]; }
    return cand[0] || null;
  }
  function benLabel(b) { return b === PORT ? 'Xuất phát' : (b === GOAL_PORT ? 'Vững tay về đích' : 'Bến ' + b.id.slice(1)); }

  /* =========================================================
     3. GIAO DIỆN CHUNG
     ========================================================= */
  var APP = D.getElementById('app');
  var V = { v: 'home' }, nbOpen = false, NBTAB = 'cd', QUIET = false, mapMode = 'ben', openR = {};
  /* PS1.3.55 (ý 25): thanh trên chung · ‹ về một cấp | tên màn | Sổ tay */
  function navName(b) { return b === PORT || b === GOAL_PORT ? b.n : benLabel(b); }
  function topnav() {
    var bk = 'Proskills', t = 'Career Design 2', b, a;
    if (V.v === 'ben' && (b = benOf(V.st))) { bk = 'Hải đồ'; t = b === PORT || b === GOAL_PORT ? b.n : benLabel(b) + ' · ' + b.n; }
    else if (V.v === 'act' && (a = ACTS[V.id])) { b = benOf(a.st); bk = navName(b); t = (b.acts.indexOf(V.id) + 1) + '/' + b.acts.length; }
    else if (V.v === 'isle' && isleOf(V.id)) { bk = 'Hải đồ'; t = isleOf(V.id).n; }
    else if (V.v === 'sp' && spOf(V.id)) { bk = V.from && isleOf(V.from) ? isleOf(V.from).n : 'Hải đồ'; t = 'Chuyện Senpai'; }
    return PS.navHTML({ back: bk, title: t });
  }
  function demoStrip() { return S.demo ? '<div class="demo-strip"><span>Bản demo giáo viên · học viên giả định</span><button type="button" data-act="demoExit">Thoát demo</button></div>' : ''; }
  function shinSays(mood, html, sz) { return '<div class="say">' + shin2(mood, sz || 64) + '<div class="say__b">' + html + '</div></div>'; }
  function render(top) {
    var h;
    if (V.v === 'intro') { APP.innerHTML = '<div class="wrap enter">' + viewIntro() + '</div>'; stagger(); return; }
    if (V.v === 'ben') h = viewBen(); else if (V.v === 'act') h = viewAct(); else if (V.v === 'isle') h = viewIsle(); else if (V.v === 'sp') h = viewSp(); else h = viewHome();
    APP.innerHTML = topnav() + '<div class="wrap' + (QUIET ? '' : ' enter') + (S.demo ? ' wrap--demo' : '') + '">' + h + '</div>' + demoStrip();
    stagger();
    if (top !== false) W.scrollTo(0, 0);
    if (V.v === 'act') afterStep();
  }
  function stagger() { var w = APP.querySelector('.enter'); if (!w) return; var c = w.children; for (var i = 0; i < c.length; i++) c[i].style.setProperty('--i', Math.min(i, 8)); }
  function go(v) {
    NAV.go(v);
    var pv = V; V = v; placeIn(pv, v); render(true); delete V.fx; placeOut(pv, v);
  }
  /* PS1.3.43: ra/vào bến, phòng. Vào từ Hải đồ, đảo, thẻ Senpai (không tính khi quay về từ chặng): cảng → chuông thuyền; phòng (room: 1) → chuông cửa + cửa trượt mở trên banner. Ra Hải đồ → tiếng nhẹ đi xuống. Không tiếng sóng. */
  function placeIn(pv, v) {
    if (v.v !== 'ben' || pv.v === 'ben' || pv.v === 'act' || pv.v === 'intro') return;
    var b = benOf(v.st); if (!b) return;
    if (b.room) { if (!rmOn()) v.fx = 'room'; sfx('door'); } else sfx('bell');
  }
  function placeOut(pv, v) { if (pv.v === 'ben' && v.v === 'home') { var b = benOf(pv.st); sfx(b && b.room ? 'shut' : 'out'); } }
  function rmOn() { try { return W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  /* PS1.3.55: nút ‹ và Back Android cùng "về một cấp" (lõi PS.nav) */
  function parentOf(v) {
    if (v.v === 'act' && ACTS[v.id]) return { v: 'ben', st: ACTS[v.id].st };
    if (v.v === 'sp') return v.from && isleOf(v.from) ? { v: 'isle', id: v.from } : { v: 'home' };
    if (v.v === 'ben' || v.v === 'isle') return { v: 'home' };
    return null;
  }
  function viewOf(h) {
    if (h.v === 'act' && ACTS[h.id] && (actOpen(h.id) || S.done[h.id])) return { v: 'act', id: h.id, step: Math.min(h.step || 0, ACTS[h.id].steps.length - 1) };
    if (h.v === 'ben' && benOf(h.st)) return { v: 'ben', st: h.st };
    if (h.v === 'isle' && isleOf(h.id)) return { v: 'isle', id: h.id };
    if (h.v === 'sp' && spOf(h.id)) return { v: 'sp', id: h.id, from: h.from || null };
    if (h.v === 'home') return { v: 'home' };
    return null;
  }
  var NAV = PS.nav({ mod: ID, tag: 'cd2', get: function () { return V; }, parent: parentOf,
    depth: function (v) { return v.v === 'act' ? 2 : (v.v === 'sp' ? (v.from ? 2 : 1) : (v.v === 'ben' || v.v === 'isle' ? 1 : 0)); },
    ser: function (v) { return { v: v.v, st: v.st || null, id: v.id || null, step: v.step || 0, from: v.from || null }; },
    de: viewOf,
    show: function (v, y) { var pv0 = V; V = v; QUIET = true; render(false); QUIET = false; if (pv0.v === 'ben') placeOut(pv0, V); W.scrollTo(0, y || 0); },
    intercept: function () { if (D.getElementById('cdov')) { closeOv(); return 1; } if (nbOpen) { closeNb(); return 1; } return V.v === 'intro' ? 2 : 0; },
    beforeLeave: function () { save(true); } });

  /* ---------- âm thanh nhỏ (tự soạn, theo công tắc chung) ---------- */
  var AC = null;
  function ac() { AC = AC || new (W.AudioContext || W.webkitAudioContext)(); if (AC.state === 'suspended' && AC.resume) AC.resume(); return AC; }
  function tone(f, t0, dur, vol, type, f2) { /* một nốt: lên nhanh, tắt dần */
    var C = AC, o = C.createOscillator(), gn = C.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + dur * .8);
    gn.gain.setValueAtTime(.0001, t0); gn.gain.exponentialRampToValueAtTime(vol, t0 + .012); gn.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    o.connect(gn); gn.connect(C.destination); o.start(t0); o.stop(t0 + dur + .05);
  }
  function bell(f, t0, dur, vol) { tone(f, t0, dur, vol); tone(f * 2.01, t0, dur * .55, vol * .32); tone(f * 2.76, t0, dur * .3, vol * .14); } /* chuông nhỏ: nốt gốc + 2 bội âm lệch */
  function sfx(k) {
    if (!PS.soundOn()) return;
    try {
      var t = ac().currentTime + .02;
      if (k === 'bell') { bell(784, t, 1.3, .05); bell(784, t + .32, 1.1, .035); return; } /* vào cảng, bến ngoài trời: chuông thuyền 2 tiếng */
      if (k === 'door') { tone(1150, t, .05, .02, 'triangle'); bell(659, t + .06, .9, .045); bell(523, t + .42, 1.1, .042); return; } /* vào phòng: tiếng cửa + chuông pin-pon */
      if (k === 'out') { bell(659, t, .8, .03); bell(523, t + .16, .9, .022); return; } /* rời bến: 2 nốt nhẹ đi xuống */
      if (k === 'pop') { tone(420, t, .07, .07, 'sine', 980); tone(1400, t + .05, .05, .02, 'triangle'); return; } /* PS1.3.51: bật nút chai, mở rương */
      if (k === 'shut') { tone(160, t, .12, .05, 'sine', 90); tone(900, t + .01, .04, .012, 'triangle'); return; } /* rời phòng: cửa khép */
      var f = { ting: [880, 1320, .25], flip: [520, 760, .18], horn: [196, 220, .6], stamp: [180, 120, .2], card: [660, 990, .22] }[k] || [600, 800, .2];
      tone(f[0], t, f[2], k === 'horn' ? .05 : .12, k === 'horn' ? 'sawtooth' : 'sine', f[1]);
    } catch (e) {}
  }

  /* =========================================================
     4. MÀN MỞ ĐẦU, HẢI ĐỒ
     ========================================================= */
  function viewIntro() {
    return '<div class="intro">' + '<div class="intro__sea">' + shipSVG2({}, 'compass', '#D97757', 190) + '</div>' +
      '<span class="kicker">Career Design 02</span><h1 class="h1">Hải Đồ <em>La Bàn</em></h1>' +
      shinSays('welcome', T(SHIN_TALK.homeNew)) +
      '<p class="intro__sub">Sau 3 năm ở Nhật, mình sẽ đi đâu tiếp? Có rất nhiều hướng. Có những hướng bạn chưa từng nghe tới.</p>' +
      '<button type="button" class="btn btn--go btn--w" data-act="introGo">' + cdIc('anchor', 20) + 'Tới Cảng 3 Năm</button></div>';
  }
  function dmy(t) { var d = new Date(t); return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2); }
  function bookHTML(big, ship) { /* Sổ Thuyền Trưởng (PS1.3.40: bỏ chuỗi ngày, XP, Insight, % sương cho thoáng; các số này vẫn ở Sổ tay. PS1.3.39: sổ bìa da bò, giấy kẻ dòng, ảnh cờ dán băng keo, con dấu kiểu hộ chiếu) */
    var p = prof(), f = flag(), created = new Date(S.created || Date.now()), jn = jobName() === 'bạn chọn' ? 'Chưa chọn' : jobName();
    var st = [PORT].concat(BEN).map(function (b, i) { return '<span class="lbk__st" title="' + esc(b.n) + '">' + (S.stamp[b.id] ? stampHTML(b, 62) : stampEmpty(i + 1, 62)) + '</span>'; }).join('') +
      '<span class="lbk__st lbk__st--fin" title="Đảo Kho Báu">' + (finDone() ? stampHTML(GOAL_PORT, 62) : '<small>+ Đảo<br>Kho Báu</small>') + '</span>';
    return '<section class="lbk" aria-label="Sổ Thuyền Trưởng"><div class="lbk__cover"></div><div class="lbk__page"><i class="lbk__rib"></i><span class="lbk__ring" aria-hidden="true">' + new Array(10).join('<i></i>') + '</span>' +
      '<div class="lbk__hd"><b>Sổ Thuyền Trưởng</b><span>Nº 02</span></div>' +
      '<div class="lbk__mid"><div class="polar"><span class="tape"></span><div class="polar__img">' + flagSVG(f.s, f.c, 74, 1) + '</div><small>cờ của tôi</small></div>' +
      '<div class="lbk__who"><small>Thuyền trưởng</small><div class="lbk__nm">' + esc(p.name || '—') + '</div>' +
      '<div class="fld"><span>Nghề</span><i></i><b>' + esc(jn) + '</b></div><div class="fld"><span>Cảng nhà</span><i></i><b>Cảng 3 Năm</b></div></div></div>' +
      (g('x1.motto') ? '<p class="lbk__motto">“' + esc(g('x1.motto')) + '”<svg width="150" height="8" viewBox="0 0 150 8" aria-hidden="true"><path d="M2 5q12-5 24 0t24 0 24 0 24 0 24 0 24 0" fill="none" stroke="#D97757" stroke-width="1.8" stroke-linecap="round"/></svg></p>' : '') +
      '<div class="lbk__sl"><b>Con dấu các bến</b><span>' + stampN() + ' / ' + (BEN.length + 1) + '</span></div><div class="lbk__stamps">' + st + '</div>' + (portDone() ? btlRow() : '') +
      (ship ? shipSec() : '') + /* PS1.3.52 */
      '<div class="lbk__ft"><span class="lbk__s">' + cdIc('card', 15) + 'Thẻ Senpai <b>' + cardN() + '/' + SENPAI.length + '</b></span></div>' +
      (big ? '<p class="lbk__date">Nhận thuyền ' + esc(PS.fmtDate ? PS.fmtDate(created) : created.toLocaleDateString('vi-VN')) + '</p>' : '') + '</div></section>';
  }
  function isleLab(n, x, y) { /* PS1.3.40: tên dài xuống 2 dòng */
    var w = n.split(' '), a = n, b = '';
    if (n.length > 12 && w.length > 1) { var best = 99, k; for (k = 1; k < w.length; k++) { var l1 = w.slice(0, k).join(' '), d = Math.abs(l1.length - (n.length - l1.length - 1)); if (d < best) { best = d; a = l1.replace(/,$/, ''); b = w.slice(k).join(' '); } } }
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" class="mp-t">' + esc(a) + (b ? '<tspan x="' + x + '" dy="12">' + esc(b) + '</tspan>' : '') + '</text>';
  }
  function zoneArt() { /* PS1.3.40: 3 vùng ở mặt Đảo: Việt Nam (trái) · Cả hai nơi (giữa) · Nhật Bản (phải) */
    return '<g class="mp-zone"><rect x="12" y="12" width="109" height="' + (MH - 24) + '" fill="' + CD2_COL.peach + '" opacity=".45"/><rect x="239" y="12" width="109" height="' + (MH - 24) + '" fill="' + CD2_COL.sage + '" opacity=".55"/><rect x="121" y="12" width="118" height="' + (MH - 24) + '" fill="' + CD2_COL.lav + '" opacity=".3"/>' +
      '<path d="M121 40V' + (MH - 20) + 'M239 40V' + (MH - 20) + '" stroke="#141413" stroke-width="1" stroke-dasharray="1 5" stroke-linecap="round" opacity=".6"/>' +
      '<text x="67" y="33" text-anchor="middle" class="mp-z">VIỆT NAM</text><text x="180" y="33" text-anchor="middle" class="mp-z">CẢ HAI NƠI</text><text x="293" y="33" text-anchor="middle" class="mp-z">NHẬT BẢN</text></g>';
  }
  /* PS1.3.44: hải đồ cao hơn (viewBox 360×510, toạ độ y dữ liệu × MK), nhãn to hơn; mặt Đảo chỉ giữ Cảng 3 Năm; thuyền tránh nhãn. */
  var MH = 510, MK = 1.085;
  function MY(y) { return Math.round(y * MK); }
  function shipSpot(at) { /* chọn chỗ đặt thuyền (58×47): không đè nhãn tên (ưu tiên số 1), ít đè hình bến nhất */
    var L = [], I = [], ax = at.x, ay = MY(at.y);
    BEN.forEach(function (b) { var tw = Math.round(b.n.length * 7 + 24), y = MY(b.y); L.push([b.x - tw / 2 - 3, y - 4, tw + 6, 27]); I.push([b.x - 24, y - 42, 48, 40]); });
    L.push([PORT.x - 51, MY(PORT.y) + 16, 102, 27]); I.push([PORT.x - 30, MY(PORT.y) - 36, 60, 54]); I.push([316, MY(146) - 22, 40, 44]);
    var C = at === PORT ? [[52, -28], [-52, -28], [58, 14], [-58, 14]] : [at.ship || [44, -30], [-44, -30], [50, 12], [-50, 12], [0, -64], [0, 46], [64, -10], [-64, -10], [56, -40], [-56, -40]];
    function ov(x, y, r) { var w = Math.min(x + 29, r[0] + r[2]) - Math.max(x - 29, r[0]), h = Math.min(y + 23, r[1] + r[3]) - Math.max(y - 24, r[1]); return w > 0 && h > 0 ? w * h : 0; }
    var best = null, bs = 1e9;
    for (var k = 0; k < C.length; k++) {
      var x = ax + C[k][0], y = ay + C[k][1], sc = k; /* k: giữ thứ tự ưu tiên khi bằng điểm */
      if (x - 29 < 14 || x + 29 > 346 || y - 24 < 14 || y + 23 > MH - 14) sc += 1e6;
      L.forEach(function (r) { sc += ov(x, y, r) * 100; });
      I.forEach(function (r) { sc += ov(x, y, r); });
      if (sc < bs) { bs = sc; best = [x, y]; }
    }
    return best;
  }
  function mapSVG() { /* PS1.3.39: hải đồ giấy, biển xanh xám nhạt, nét mực, đảo tô theo phía, sương tô chấm */
    var h = '<svg class="chart" viewBox="0 0 360 ' + MH + '" role="img" aria-label="Hải đồ: Cảng 3 Năm ở giữa, 7 bến, 8 đảo">', t = '', i;
    h += '<rect x="1" y="1" width="358" height="' + (MH - 2) + '" rx="16" fill="#DCE6EC"/><rect x="7" y="7" width="346" height="' + (MH - 14) + '" rx="10" fill="none" stroke="#2B2A27" stroke-width="1.4"/><rect x="11" y="11" width="338" height="' + (MH - 22) + '" rx="8" fill="none" stroke="#2B2A27" stroke-width=".6"/>';
    for (i = 1; i < 17; i++) t += 'M' + (7 + i * 20.6) + ' 7v4M' + (7 + i * 20.6) + ' ' + (MH - 11) + 'v4';
    for (i = 1; i < Math.floor((MH - 14) / 20); i++) t += 'M7 ' + (7 + i * 20) + 'h4M349 ' + (7 + i * 20) + 'h4';
    h += '<path d="' + t + '" stroke="#2B2A27" stroke-width=".8"/><g><path d="M44 ' + MY(110) + 'L316 ' + MY(360) + 'M316 ' + MY(110) + 'L44 ' + MY(360) + 'M180 ' + MY(30) + 'V' + MY(440) + 'M24 ' + MY(232) + 'H336" stroke="#2B2A27" stroke-width=".6" opacity=".25" stroke-dasharray="2 5"/>';
    [[40, 128], [250, 96], [130, 186], [280, 262], [60, 300], [210, 356], [150, 452], [282, 440], [30, 440], [120, 96]].forEach(function (q) { h += aWave(q[0], MY(q[1]), 2, 12, .45); });
    h += '<g class="mp-rose">' + roseArt(334, MY(146), .8) + seaFun(40, MY(446)) + '</g></g>';
    /* đường hải trình nét đứt: cảng → các bến */
    var nx = nextAct(), nb = nx ? ACTS[nx].st : '', py = MY(PORT.y);
    h += '<g class="mp-rt">';
    BEN.forEach(function (b) {
      var op = benOpen(b), dn = benDone(b), cur = nb === b.id, by = MY(b.y), cx = (PORT.x + b.x) / 2 + (b.x < 180 ? -12 : 12), cy = (py + by) / 2;
      h += '<path d="M' + PORT.x + ' ' + py + 'Q' + cx + ' ' + cy + ' ' + b.x + ' ' + by + '" fill="none" stroke="' + (!op ? '#A8A49A' : (cur ? '#C15F3C' : '#2B2A27')) + '" stroke-width="' + (cur ? 2.4 : 1.5) + '" stroke-dasharray="' + (op || dn ? '5 5' : '2 5') + '" stroke-linecap="round"/>';
    });
    h += '</g>';
    /* đảo (PS1.3.40: chỉ hiện ở mặt Đảo) */
    h += '<g class="mp-isles">' + zoneArt();
    ISLES.forEach(function (is0) {
      var on = !!S.isl[is0.id], is = { id: is0.id, side: is0.side, n: is0.n, x: is0.x, y: MY(is0.y) };
      h += '<g class="mp-isle" data-act="isle" data-id="' + is.id + '" role="button" aria-label="' + esc(is.n) + (on ? '' : ' (còn sương)') + '"><rect x="' + (is.x - 40) + '" y="' + (is.y - 28) + '" width="80" height="74" fill="transparent"/>' +
        (on ? '<g>' + isleArt(is) + '</g>' : fogArt(is.x, is.y - 1)) +
        isleLab(on ? is.n : '? ? ?', is.x, is.y + 36) + '</g>';
    });
    h += '</g>';
    /* cảng (PS1.3.44: luôn hiện, kể cả ở mặt Đảo) */
    h += '<g class="mp-ben mp-port" data-act="ben" data-st="p0" role="button" aria-label="Cảng 3 Năm"><g transform="translate(' + (PORT.x - 30) + ' ' + (py - 36) + ')">' + CD2_MINI.port() + '</g>' +
      '<g class="mp-lab"><rect x="' + (PORT.x - 48) + '" y="' + (py + 19) + '" width="96" height="23" rx="11.5" fill="#2B2A27"/><text x="' + PORT.x + '" y="' + (py + 34.5) + '" text-anchor="middle" class="mp-tn w">Cảng 3 Năm</text></g></g>';
    /* bến */
    BEN.forEach(function (b) {
      var op = benOpen(b), dn = benDone(b), cur = nb === b.id && !dn, tw = Math.round(b.n.length * 7 + 24), x = b.x, y = MY(b.y);
      h += '<g class="mp-ben' + (op ? '' : ' lock') + (dn ? ' done' : '') + (cur ? ' cur' : '') + '" data-act="ben" data-st="' + b.id + '" role="button" aria-label="' + esc(b.n) + '"><rect x="' + (x - 34) + '" y="' + (y - 44) + '" width="68" height="66" fill="transparent"/>' +
        '<g transform="translate(' + (x - 24) + ' ' + (y - 42) + ') scale(.8)"' + (op || dn ? '' : ' opacity=".42"') + '><g>' + CD2_MINI[CD2_PLACE[b.id]]() + '</g></g>' +
        '<g class="mp-lab"><rect x="' + (x - tw / 2) + '" y="' + (y - 2) + '" width="' + tw + '" height="23" rx="11.5" fill="' + (cur ? '#C15F3C' : (op || dn ? '#fff' : '#F3F1EA')) + '" stroke="' + (cur ? '#C15F3C' : (op || dn ? '#2B2A27' : '#B8B2A3')) + '" stroke-width="1.2"/>' +
        '<text x="' + x + '" y="' + (y + 13.6) + '" text-anchor="middle" class="mp-tn' + (cur ? ' w' : (op || dn ? '' : ' off')) + '">' + esc(b.n) + '</text>';
      if (dn) h += '<g transform="translate(' + (x + tw / 2 - 3) + ' ' + (y - 2) + ')"><circle r="7.5" fill="#2B2A27"/><path d="M-3.4 0l2.2 2.4 4.4-4.6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></g>';
      else if (!op) h += '<g transform="translate(' + (x + tw / 2 - 3) + ' ' + (y - 2) + ')"><circle r="7.5" fill="#fff" stroke="#B8B2A3" stroke-width="1.2"/><path d="M-3 -.5h6v4.2h-6zM-1.8 -.5v-1.6a1.8 1.8 0 0 1 3.6 0v1.6" fill="none" stroke="#8C8577" stroke-width="1.1" stroke-linejoin="round"/></g>';
      h += '</g></g>';
    });
    /* thuyền ở bến đang học */
    h = hand(h); /* PS1.3.40: nét bút sổ tay cho cả hải đồ (trừ thuyền có Shin) */
    var at = nx ? benOf(ACTS[nx].st) : PORT; if (at === GOAL_PORT || at.x == null) at = PORT; var sp = shipSpot(at), sx = sp[0], sy = sp[1], f = flag();
    h += '<g class="mp-ship" transform="translate(' + (sx - 36) + ' ' + (sy - 20) + ')">' + shipSVG2(shipP(), f.s, f.c, 70).replace('<svg class="ship"', '<svg class="ship" x="0" y="0" height="47"') + '</g>'; /* PS1.3.52 */
    return h + '</svg>';
  }
  function trialLive() { var st = g('b53.start'); if (!st) return false; var p = st.split('-'), d0 = new Date(+p[0], +p[1] - 1, +p[2]); return Date.now() - d0.getTime() < 16 * 864e5; }
  function bottleQ() { var L = SENPAI.filter(function (s) { return !!s.q; }), k = Math.floor(Date.now() / 864e5) % L.length; return L[k]; }
  function viewHome() {
    var nx = nextAct(), hi;
    if (!portDone()) hi = SHIN_TALK.homeNew; else if (nx) hi = SHIN_TALK.home[new Date().getDate() % SHIN_TALK.home.length]; else hi = finDone() ? SHIN_TALK.homeFin : SHIN_TALK.homeWait;
    var cta = nx ? '<button type="button" class="btn btn--go btn--w glow" data-act="open" data-id="' + nx + '">' + (doneMain() ? 'Đi tiếp: ' : 'Bắt đầu: ') + esc(ACTS[nx].t) + '</button>' : (finDone() ? '<button type="button" class="btn btn--go btn--w" data-act="certOv">' + cdIc('flag', 20) + 'Xem Bằng Thuyền Trưởng Vững Vàng</button>' : '');
    /* PS1.3.49: bỏ thẻ Thử nhỏ 2 tuần ở trang chủ khóa (thầy góp ý 2) */
    var bq = bottleQ(), ownIs = portDone();
    return shinSays(nx ? 'hi' : 'cheer', T(hi)) + bookHTML() + '<div class="cta">' + cta + '</div>' + shoreHome() +
      '<div class="maphd"><h2 class="sec-h">Hải đồ La Bàn</h2><div class="seg" role="group" aria-label="Mặt hải đồ">' +
      '<button type="button" class="seg__b' + (mapMode === 'ben' ? ' on' : '') + '" data-act="mapMode" data-v="ben" aria-pressed="' + (mapMode === 'ben') + '">' + cdIc('anchor', 15) + 'Bến</button>' +
      '<button type="button" class="seg__b' + (mapMode === 'isl' ? ' on' : '') + '" data-act="mapMode" data-v="isl" aria-pressed="' + (mapMode === 'isl') + '">' + cdIc('compass', 15) + 'Đảo <small>' + fogOpen() + '/8</small></button></div></div>' +
      '<p class="sec-sub" id="mapSub">' + mapSub(ownIs) + '</p>' +
      '<div class="chartbox' + (mapMode === 'isl' ? ' isl-on' : '') + '" id="chartbox">' + mapSVG() + '<div class="fogbar"><span>' + esc(SHIN_TALK.fogT) + ' <b>' + (100 - fogPct()) + '%</b> · ' + fogOpen() + '/8 đảo</span><i><b style="width:' + (100 - fogPct()) + '%"></b></i></div></div>' +
      '<h2 class="sec-h">Các bến</h2><p class="sec-sub">Chọn một giai đoạn để xem các bến</p>' +
      [1, 2, 3, 4].map(rndHTML).join('') +
      (bq ? '<button type="button" class="bottle" data-act="sp" data-id="' + bq.id + '"><span class="bottle__ic">' + cdIc('bottle', 22) + '</span><span><small>' + esc(SHIN_TALK.bottle) + '</small><q>' + esc(bq.q) + '</q><b>' + esc(bq.n) + (bq.jl ? ' · ' + esc(bq.jl) : '') + '</b></span></button>' : '') +
      '<p class="foot">Proskills · Career Design 02 · Hải Đồ La Bàn · ' + esc(CD2_VER) + '<br>Bài làm tự lưu trên trình duyệt của máy này</p>';
  }
  function mapSub(ownIs) { return !ownIs ? 'Nhận thuyền ở Cảng 3 Năm để ra khơi' : (mapMode === 'isl' ? 'Chạm đảo để xem hướng đi' : 'Chạm bến để học · bật mặt Đảo để xem 8 hướng đi'); }
  function rndHTML(r) { /* PS1.3.40: mỗi vòng là một hàng gấp, mặc định đóng */
    var L = r === 4 ? [GOAL_PORT] : BEN.filter(function (b) { return b.r === r; }), nxa = nextAct(), here = false, nd = 0;
    L.forEach(function (b) { if (b === GOAL_PORT ? finDone() : benDone(b)) nd++; if (nxa && ACTS[nxa].st === b.id) here = true; });
    var p = ROUNDS[r].split(' · '), on = !!openR[r];
    return '<div class="rgrp' + (on ? ' on' : '') + '" id="rg' + r + '"><button type="button" class="rgrp__h" data-act="rnd" data-v="' + r + '" aria-expanded="' + on + '"><i style="background:' + roundBg(r) + '"></i>' +
      '<span class="rgrp__t"><b>' + esc(p[0]) + '</b><small>' + esc(p[1] || '') + '</small></span>' + (here ? '<em>Đang đi</em>' : '') +
      '<span class="rgrp__n">' + (r === 4 ? (nd ? 'Đã xong' : '') : nd + '/' + L.length) + '</span>' + PS.icon('next', 16) + '</button>' +
      '<div class="rgrp__b"><div class="bens">' + L.map(benCard).join('') + '</div></div></div>';
  }
  function benCard(b) { /* PS1.3.39: thẻ hàng ngang, ô tranh nơi chốn theo tông vòng */
    var isG = b === GOAL_PORT, op = benOpen(b), dn = isG ? finDone() : benDone(b), nd = b.acts.filter(function (a) { return !!S.done[a]; }).length, nxa = nextAct(), nx = !dn && nxa && ACTS[nxa].st === b.id;
    var mins = b.acts.reduce(function (t, a) { return t + ACTS[a].mins; }, 0);
    var badge = dn ? '<span class="badge badge--ok">' + PS.icon('check', 12, 3) + (isG ? 'Đã nhận bằng' : 'Có dấu') + '</span>' : (op ? '<span class="badge">' + (nd ? nd + '/' + b.acts.length + ' chặng' : 'Mở') + '</span>' : '<span class="badge badge--soon">' + PS.icon('lock', 12) + (b.ready ? 'Chưa mở' : 'Sắp mở') + '</span>');
    var tag = op || dn ? 'button type="button" data-act="ben" data-st="' + b.id + '"' : 'button type="button" data-act="lockMsg" data-st="' + b.id + '"';
    if (isG && !op && !dn) tag = 'button type="button" data-act="lockMsg" data-st="fin"';
    return '<' + tag + ' class="bcard' + (op || dn ? '' : ' bcard--lock') + (dn ? ' bcard--done' : '') + (nx ? ' bcard--next' : '') + '"><span class="bcard__ic" style="background:' + roundBg(b.r) + '">' + miniArt(CD2_PLACE[b.id], 58) + '</span>' +
      '<span class="bcard__b"><b>' + esc(b.n) + '</b><small>' + esc(b.sub) + '</small><span class="bcard__m"><small>' + (isG && !op && !dn ? 'Đủ ' + BEN.length + ' con dấu để mở' : b.acts.length + ' chặng') + '</small>' + badge + '</span></span></button>';
  }

  /* ---------- trang bến ---------- */
  function viewBen() {
    var b = benOf(V.st), first = !S.seen[b.id];
    if (first) { S.seen[b.id] = 1; V.showIntro = 1; save(); }
    var nd = b.acts.filter(function (a) { return !!S.done[a]; }).length;
    var h = '<section class="bnr' + (V.fx === 'room' ? ' bnr--door' : '') + '"><div class="bnr__art">' + sceneSVG(CD2_PLACE[b.id], roundBg(b.r), 150, b.id === 'b6' ? ivWho().id : null) + (V.fx === 'room' ? '<i class="bnr__dr" aria-hidden="true"><b></b><b></b></i>' : '') + '</div><div class="bnr__b"><div class="bnr__lab">' + esc(benLabel(b)) + (b.r ? ' · ' + esc(ROUNDS[b.r].split(' · ')[0]) : '') + '</div><h1>' + esc(b.n) + '</h1>' + (b.sub ? '<p>' + esc(b.sub) + '</p>' : '') +
      '<div class="bnr__bar"><span>' + nd + '/' + b.acts.length + ' chặng</span><i><b style="width:' + Math.round(nd / b.acts.length * 100) + '%"></b></i></div></div></section>';
    h += (first || V.showIntro) ? benIntro(b, first) : '<button type="button" class="shinmini" data-act="showIntro">' + shin2('hi', 34) + '<span class="shinmini__t"><b>Bến này để làm gì?</b></span><i class="shinmini__i">' + PS.icon('info', 20) + '</i></button>';
    h += '<div class="acts">' + b.acts.map(function (id, i) {
      var a = ACTS[id], dn = !!S.done[id], nx = !dn && nextAct() === id, bk = !!S.bak[id];
      return '<button type="button" class="act' + (nx ? ' act--next' : '') + (dn ? ' act--done' : '') + '" data-act="' + (dn ? 'actMenu' : 'open') + '" data-id="' + id + '"><span class="act__n">' + (dn && !bk ? PS.icon('check', 20, 3) : (i + 1)) + '</span><span><b>' + (b === PORT ? '' : 'Chặng ' + (i + 1) + ' · ') + esc(a.t) + '</b><small>' + esc(a.d) + '</small>' +
        (nx || bk || dn ? '<span class="act__meta">' + (nx ? '<span class="chip-go">Tiếp theo ' + PS.icon('next', 13, 2.6) + '</span>' : (bk ? '<span class="badge badge--soon">Đang làm lại</span>' : '<span class="badge badge--ok">Xong</span>')) + '</span>' : '') + '</span></button>' +
        (bk ? '<p class="restore"><button type="button" class="link" data-act="actRestore" data-id="' + id + '">Khôi phục bài cũ</button></p>' : '');
    }).join('') + '</div>';
    if (b === GOAL_PORT) return h + '<button type="button" class="stampbox' + (finDone() ? ' on' : '') + '" data-act="' + (finDone() ? 'certOv' : 'noop') + '"><span class="stampbox__ic">' + (finDone() ? stampHTML(b) : PS.icon('lock', 22)) + '</span><span><b>Bằng Thuyền Trưởng Vững Vàng</b><small>' + (finDone() ? 'Chạm để xem bằng' : 'Xong 2 chặng để nhận bằng') + '</small></span></button>' + (finDone() ? futCard() : '');
    var dnB = b === PORT ? portDone() : benDone(b);
    h += (dnB ? '<button type="button" class="stampbox on" data-act="stampAgain" data-st="' + b.id + '">' : '<div class="stampbox">') + '<span class="stampbox__ic">' + (dnB ? stampHTML(b) : PS.icon('lock', 22)) + '</span><span><b>' + esc(SHIN_TALK.stampT) + ' · ' + esc(b.n) + '</b><small>' + (dnB ? 'Chạm để xem lại con dấu' : 'Xong ' + b.acts.length + ' chặng để nhận dấu') + '</small></span>' + (dnB ? '<span class="stampbox__go">' + PS.icon('next', 16, 2.4) + '</span></button>' : '</div>');
    if (dnB) { var nxB = nextBen(); if (nxB && nxB !== b) h += '<button type="button" class="btn btn--go btn--w benext" data-act="ovBen" data-st="' + nxB.id + '">Đi tiếp: ' + esc(nxB === GOAL_PORT ? nxB.n : benLabel(nxB) + ' · ' + nxB.n) + PS.icon('next', 16, 2.6) + '</button>'; } /* PS1.3.49 (thầy góp ý 3, 4) */
    return h;
  }
  function benIntro(b, first) { /* PS1.3.45 (thầy góp ý 29): lần đầu vào bến, Shin nói bến này để nghĩ gì, làm gì, mang về gì; sau đó mở lại bằng nút (i) */
    var W3 = b.why || [], R = [['bulb', 'Nghĩ về'], ['edit', 'Làm'], ['gift', 'Mang về']];
    return '<div class="bintro"><div class="bintro__hd">' + shin2('hi', 56) + '<p>' + T(b.intro) + '</p></div>' +
      (W3.length ? '<ul class="bintro__l">' + R.map(function (r, i) { return W3[i] ? '<li><span class="bintro__ic">' + PS.icon(r[0], 17) + '</span><span><small>' + r[1] + '</small>' + esc(W3[i]) + '</span></li>' : ''; }).join('') + '</ul>' : '') +
      (first ? '' : '<button type="button" class="link bintro__x" data-act="hideIntro">Thu gọn</button>') + '</div>';
  }
  function nextBen() { var n = null; BEN.forEach(function (x) { if (!n && benOpen(x) && !S.stamp[x.id]) n = x; }); return n || (allBen() && !finDone() ? GOAL_PORT : null); }
  function stampHTML(b, w) { /* con dấu kiểu hộ chiếu, có ngày đóng */
    var isG = b === GOAL_PORT, i = b === PORT ? 0 : (isG ? BEN.length + 1 : BEN.indexOf(b) + 1), t = isG ? S.fin : S.stamp[b.id];
    return stampArt(i, b.ic, b === PORT ? 'CẢNG' : (isG ? 'ĐÍCH' : 'BẾN ' + i), t > 1e9 ? dmy(t) : '', w || 60);
  }

  /* ---------- trang đảo, thẻ Senpai ---------- */
  function revealIsle(id, quiet) { if (!id || S.isl[id] || !portDone()) return false; S.isl[id] = Date.now(); save(); if (!quiet) PS.toast(cdIc('compass', 16) + ' Đảo mới: <b>' + esc(isleOf(id).n) + '</b>'); return true; }
  function collect(id, quiet) {
    if (!id || S.cards[id]) return false;
    S.cards[id] = Date.now(); S.xp['card.' + id] = CD2_XP_CARD; save(); sfx('card');
    var sp = spOf(id); if (sp) revealIsle(sp.isl, true);
    if (!quiet) PS.toast(cdIc('card', 16) + ' <b>' + esc(SHIN_TALK.cardNew) + '</b> · ' + esc(sp.n) + ' · +' + CD2_XP_CARD + ' XP');
    return true;
  }
  function viewIsle() {
    var is = isleOf(V.id);
    if (portDone()) revealIsle(is.id, true);
    var h = '<section class="bnr"><div class="bnr__art">' + sceneSVG('isle', '#DCE6EC', 150, is) + '</div><div class="bnr__b"><div class="bnr__lab">' + esc(ISLE_SIDE[is.side]) + '</div><h1>' + esc(is.n) + '</h1><p>' + esc(is.sub) + '</p></div></section>';
    if (!portDone()) h += shinSays('wink', 'Nhận thuyền ở Cảng 3 Năm trước, rồi mình ghé đảo này nhé!');
    h += isleInfo(is) + pathHTML(is, 1);
    h += '<h2 class="sec-h">Anh chị đã đi hướng này</h2><p class="sec-sub">Chạm thẻ để đọc chuyện</p><div class="spgrid">' + is.who.map(function (id) { return spCard(spOf(id)); }).join('') + '</div>';
    if (is.who.length < 3) h += '<p class="ps-small note">Đảo này còn ít chuyện công khai. Bạn biết anh chị nào đi hướng này? Kể thầy cô nghe nhé.</p>';
    return h;
  }
  function isleInfo(is) {
    return '<div class="isinfo"><p>' + esc(is.what) + '</p><div class="isinfo__g"><div><b>' + cdIc('tool', 16) + 'Cần gì</b><ul>' + is.need.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
      '<div><b>' + PS.icon('star', 16) + 'Được gì</b><p>' + esc(is.gain) + '</p></div><div><b>' + cdIc('wave', 16) + 'Thách thức</b><p>' + esc(is.cost) + '</p></div></div></div>';
  }
  function pathHTML(is, open) { /* PS1.3.42: Các bước thường gặp (Lộ trình thật) */
    var P = ISLE_PATH[is.id]; if (!P) return '';
    return '<details class="path"' + (open ? ' open' : '') + '><summary>' + cdIc('stairs', 16) + 'Các bước thường gặp</summary><ol>' + P.L.map(function (x) { return '<li><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></li>'; }).join('') + '</ol>' +
      (P.ik ? '<p class="path__ik">' + esc(IKUSEI.t) + ' <a href="' + esc(IKUSEI.src[1]) + '" target="_blank" rel="noopener">Nguồn</a></p>' : '') +
      '<p class="path__ft">Đường hay gặp, không phải điều kiện đầy đủ. Điều kiện đổi theo ngành và theo năm.</p>' +
      P.src.map(function (x) { return '<a class="srclink" href="' + esc(x[1]) + '" target="_blank" rel="noopener">' + cdIc('link', 15) + esc(x[0]) + '</a>'; }).join('') + '</details>';
  }
  function spCard(sp, sel) {
    var got = !!S.cards[sp.id];
    return '<button type="button" class="spc' + (got ? ' got' : '') + (sel ? ' on' : '') + '" data-act="sp" data-id="' + sp.id + '">' + spAv(sp) + '<span class="spc__b"><b>' + esc(sp.n) + '</b>' +
      '<small>' + esc(sp.job) + (sp.jl ? ' · ' + esc(sp.jl) : '') + '</small><em>' + esc(sp.tag) + '</em></span>' + (got ? '<span class="spc__ok">' + PS.icon('check', 14, 3) + '</span>' : '') + '</button>';
  }
  function tikCopy(u) { return ''; /* PS1.3.56 (thầy góp ý 1): bỏ nút Sao chép link, chỉ giữ “Đọc bài gốc trên Tikme” */
    return /tikme\.com/.test(u || '') ? '<p class="tikcp"><button type="button" class="link" data-act="copyLink" data-v="' + esc(u) + '">' + cdIc('doc', 13) + 'Sao chép link</button><span>Trang Tikme chưa mở được thì thử lại sau nhé.</span></p>' : '';
  }
  function copyTxt(t) {
    function done() { PS.toast('Đã sao chép link. Dán vào trình duyệt để mở lúc khác.'); }
    function old() { var ta = D.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.top = '-200px'; D.body.appendChild(ta); ta.select(); try { D.execCommand('copy'); done(); } catch (e) { PS.toast(esc(t)); } D.body.removeChild(ta); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, old); else old();
  }
  function spAv(sp, w) { return '<span class="spc__art">' + spArt(sp, 'thumb', w || 56) + '</span>'; } /* PS1.3.48: hình thẻ Senpai thay chữ viết tắt */
  function initials(n) { if (/^Ba anh em/.test(n)) return 'TDH'; var p = n.split(' '); return (p[p.length - 2] ? p[p.length - 2].charAt(0) : '') + p[p.length - 1].charAt(0); }
  function spBody(sp) {
    var is = isleOf(sp.isl);
    return '<div class="sp"><figure class="sp__bn">' + spArt(sp, 'banner') + '<figcaption><span>Khởi đầu</span><span>Hôm nay</span></figcaption></figure><div class="sp__top"><div><b>' + esc(sp.n) + '</b><small>' + esc([sp.job, sp.jl, sp.jp].filter(Boolean).join(' · ')) + '</small>' +
      '<button type="button" class="islechip" data-act="isle" data-id="' + is.id + '">' + cdIc(is.ic, 14) + esc(is.n) + '</button></div></div>' +
      '<ol class="frames"><li><small>Khởi đầu</small>' + esc(sp.kd) + '</li><li><small>Bước ngoặt</small>' + esc(sp.bn) + '</li><li><small>Hôm nay</small>' + esc(sp.nay) + '</li></ol>' +
      (sp.q ? '<blockquote class="quote">“' + esc(sp.q) + '”<cite>' + esc(sp.qBy || sp.n) + '</cite></blockquote>' : '') +
      (clipOf(sp.id) ? '<h3 class="qs">Nghe ' + esc(sp.a.toLowerCase().indexOf('ba anh') === 0 ? sp.a : sp.a.split(' ')[0].toLowerCase() + ' ' + sp.a.split(' ').slice(1).join(' ')) + ' kể</h3>' + clipHTML(clipOf(sp.id)) : '') +
      '<a class="srclink" href="' + esc(sp.url) + '" target="_blank" rel="noopener">' + cdIc('link', 15) + 'Đọc bài gốc trên ' + esc(sp.src) + '</a>' +
      tikCopy(sp.url) +
      '<p class="ps-small">Khóa học tóm tắt từ bài đã đăng. Câu trong ngoặc kép là nguyên văn.</p></div>';
  }

  /* ---------- PS1.3.47 (bản 3 · đợt 4) clip MyRoad: ảnh bìa → chạm mới nhúng YouTube (cần mạng), 3 ý chính, “ý nào chạm bạn” (không bắt buộc) ---------- */
  function clipGrp() { var gr = adGrp(); return gr === 'sx' || gr === 'xd' ? 'kt' : 'dv'; }
  function clipAt(w) { var m = CLIP_AT[w]; return m ? m[clipGrp()] : ''; }
  function clipOf(spId) { for (var k in CLIPS) if (CLIPS.hasOwnProperty(k) && CLIPS[k].sp === spId) return k; return ''; }
  function clipURL(c, embed) { return embed ? 'https://www.youtube-nocookie.com/embed/' + c.yt + '?start=' + c.at + '&autoplay=1&playsinline=1&rel=0' : 'https://www.youtube.com/watch?v=' + c.yt + '&t=' + c.at + 's'; }
  var PLAY_IC = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  function clipHTML(id, o) {
    var c = CLIPS[id]; if (!c) return ''; o = o || {};
    var pk = o.w ? g('clip.' + o.w) : null, seen = !!g('clipv.' + id);
    var ideas = o.w ? '<p class="clip__q">Ý nào chạm bạn nhất? <small>(không bắt buộc)</small></p><div class="clip__ids">' + c.ideas.map(function (t, i) {
      var on = pk != null && +pk === i; return '<button type="button" class="clip__id' + (on ? ' on' : '') + '" data-act="clipIdea" data-k="' + o.w + '" data-v="' + i + '" aria-pressed="' + on + '"><span>' + (i + 1) + '</span>' + esc(t) + '</button>'; }).join('') + '</div>'
      : '<ol class="clip__il">' + c.ideas.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol>';
    return '<div class="clip" data-clip="' + id + '"><div class="clip__v"><button type="button" class="clip__play" data-act="clipPlay" data-id="' + id + '" style="background-image:url(https://i.ytimg.com/vi/' + c.yt + '/hqdefault.jpg)" aria-label="Xem clip ' + esc(c.n) + ', đoạn ' + c.seg + '">' +
      '<span class="clip__btn">' + PLAY_IC + '</span><span class="clip__seg">' + (seen ? PS.icon('check', 12, 3) + 'Đã xem · ' : 'Đoạn đáng xem · ') + c.seg + '</span></button></div>' +
      '<div class="clip__b"><b>' + esc(c.n) + '</b><small>' + esc(c.role) + '</small>' + ideas +
      '<p class="clip__ft"><a href="' + esc(clipURL(c)) + '" target="_blank" rel="noopener">' + cdIc('link', 13) + 'Mở trên YouTube</a><span>Cần mạng · ' + esc(c.len) + ' · ' + esc(CLIP_SRC) + '</span></p></div></div>';
  }
  function clipBlock(w, title) { var id = clipAt(w); if (!id) return ''; return (title ? '<h3 class="qs">' + esc(title) + '</h3>' : '') + clipHTML(id, { w: w }); }
  function clipOther(w) { /* nhóm ngành kia: mở trong lớp phủ, để ai cũng xem được */
    var m = CLIP_AT[w]; if (!m || m.kt === m.dv) return ''; var o = m[clipGrp() === 'kt' ? 'dv' : 'kt'], c = CLIPS[o];
    return '<button type="button" class="link clip__oth" data-act="clipOv" data-id="' + o + '">Xem thêm clip nhóm ngành khác: ' + esc(c.n) + '</button>';
  }
  function clipSum() { var o = {}; for (var w in CLIP_AT) if (CLIP_AT.hasOwnProperty(w)) { var id = clipAt(w), pk = g('clip.' + w); if (g('clipv.' + id) || pk != null) o[w] = { who: CLIPS[id].n, seen: !!g('clipv.' + id), idea: pk != null ? CLIPS[id].ideas[+pk] : '' }; } return o; }

  /* ---------- PS1.3.47 · nối Shin routine (một chiều: CD02 gợi ý, học viên tự đặt thẻ trong Shin) ---------- */
  function rtSum() { if (S.demo) return {}; try { var s = PS.summary('routine'); return (s && s.extra) || {}; } catch (e) { return {}; } }
  function rtTrialId() { if (g('b73.pk') && PROTO_RT[g('b73.pk')]) return PROTO_RT[g('b73.pk')]; var t = g('b53.try'); return (t && t !== 'o' && TRIAL_RT[t]) || TRIAL_RT_DEF; }
  function rtDays(id) { var x = rtSum(); return x.dn && x.dn[id] != null ? +x.dn[id] : null; }
  function rtState(id) { var x = rtSum(); return (x.mine && x.mine[id]) || ''; }
  function rtSugHTML(ids, title, sub, max) {
    if (S.demo) { var lib = PS.routineLib(); return '<div class="ps-rt ps-rt--demo"><div class="ps-rt__hd"><img class="ps-rt__shin" src="' + esc(PS.url('routine/icon-192.png')) + '" width="40" height="40" alt=""><div><b>' + esc(title) + '</b><small>' + sub + '</small></div></div><div class="ps-rt__l">' +
      ids.slice(0, max || 2).map(function (id) { return '<span class="ps-rt__it"><span class="ps-rt__mk" aria-hidden="true"></span><span class="ps-rt__n"><b>' + esc(lib[id] || id) + '</b></span><span class="ps-rt__go">Rèn thẻ này' + PS.icon('next', 14) + '</span></span>'; }).join('') +
      '</div><p class="ps-rt__ft">Bản demo: học viên chạm thẻ để mở Shin routine và đặt công thức.</p></div>'; }
    return PS.routineSugHTML ? PS.routineSugHTML(ids, { from: ID, title: title, sub: sub, max: max || 2 }) : '';
  }
  function viewSp() {
    var sp = spOf(V.id); collect(sp.id);
    return spBody(sp);
  }

  /* =========================================================
     5. TRANG CHẶNG VÀ CÁC DẠNG BƯỚC
     ========================================================= */
  function viewAct() {
    var id = V.id, a = ACTS[id], steps = a.steps, i = V.step, s = steps[i], last = i === steps.length - 1;
    var miss = check(s), b = benOf(a.st);
    var h = '<header class="ah"><div class="ah__lab">' + esc(benLabel(b)) + ' · ' + esc(b.n) + '</div><h1>' + esc(a.t) + '</h1><div class="stepbar" aria-label="Bước ' + (i + 1) + '/' + steps.length + '">' +
      steps.map(function (x, j) { return '<i class="' + (j < i ? 'on' : (j === i ? 'cur' : '')) + '"></i>'; }).join('') + '</div></header>';
    if (S.bak[id] && i === 0) h += '<div class="redo redo--new">' + PS.icon('info', 16) + esc(SHIN_TALK.redoNew) + '</div>';
    else if (S.done[id] && i === 0) h += '<div class="redo">' + PS.icon('check', 16, 3) + esc(SHIN_TALK.redo) + '</div>';
    h += '<div id="stepBody">' + stepHTML(s, id) + '</div>';
    h += '<div class="sbar"><button type="button" class="sbar__st' + (miss ? ' miss' : '') + '" id="sbarSt">' + (miss ? esc(miss) : 'Sẵn sàng!') + '</button>' +
      '<button type="button" class="btn" id="sbarGo" data-act="' + (last ? 'finish' : 'next') + '"' + (miss ? ' disabled' : '') + '>' + (last ? esc(a.btn || 'Đóng dấu chặng') : 'Tiếp tục') + '</button></div>';
    if (i > 0) h += '<p class="prevlink"><button type="button" class="link" data-act="prev">Xem lại bước trước</button></p>';
    return h;
  }
  function stepHTML(s, id) { return (s.c1 ? c1HTML(s.c1) : '') + (STEP[s.k] ? STEP[s.k](s, id) : '') + (s.shore ? shoreCard(s.shore) : ''); }
  function check(s) { return CHECK[s.k] ? CHECK[s.k](s) : ''; }
  function refreshBar() {
    if (V.v !== 'act' || !ACTS[V.id]) return;
    var s = ACTS[V.id].steps[V.step], miss = check(s), st = D.getElementById('sbarSt'), gb = D.getElementById('sbarGo');
    if (!st || !gb) return;
    st.className = 'sbar__st' + (miss ? ' miss' : ''); st.textContent = miss || 'Sẵn sàng!'; gb.disabled = !!miss;
  }
  function redrawStep() { var b = D.getElementById('stepBody'); if (!b) return; var s = ACTS[V.id].steps[V.step]; b.innerHTML = stepHTML(s, V.id); refreshBar(); afterStep(); }
  function afterStep() { /* thanh trượt: cập nhật la bàn ngay khi kéo */
    var sl = APP.querySelectorAll('input[type=range][data-pair]');
    for (var i = 0; i < sl.length; i++) sl[i].addEventListener('input', onSlide);
    var sel = D.getElementById('repT');
    if (sel) sel.addEventListener('change', function () { if (sel.value) { PS.setProfile({ teacher: sel.value }); redrawStep(); } });
  }
  function words(t) { t = trim(t); return t ? t.split(/\s+/).length : 0; }
  function insOf(key) { return words(g(key)) >= CD2_INS_WORDS ? CD2_INS_FIELD : 0; }
  function tipsHTML(key, tips) { /* PS1.3.41: thầy chốt ẩn hết chip gợi ý ở CD02, chỉ giữ ví dụ mờ ở vài câu khó (ph trong content.js) */
    if (!W.CD2_TIPS_ON || !tips || !tips.length) return '';
    return '<div class="tips"><small>Chạm để dùng gợi ý, rồi sửa theo ý bạn</small>' + tips.map(function (t) { return '<button type="button" class="tip" data-act="tip" data-k="' + esc(key) + '" data-v="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>';
  }
  function areaHTML(key, ph, rows, max) {
    var v = g(key) || '';
    return '<textarea class="ta ps-sel" data-k="' + esc(key) + '" rows="' + (rows || 3) + '" maxlength="' + (max || 400) + '" placeholder="' + esc(ph || '') + '">' + esc(v) + '</textarea>' +
      '<div class="insline" data-ins="' + esc(key) + '">' + insTxt(key) + '</div>';
  }
  function insTxt(key) { return insOf(key) ? PS.icon('bulb', 14) + ' +' + CD2_INS_FIELD + ' Insight' : ''; } /* PS1.3.41: bỏ dòng nhắc dưới ô, chỉ hiện khi đã được điểm */
  function opt(key, v, t, on, act) { return '<button type="button" class="opt' + (on ? ' on' : '') + '" data-act="' + (act || 'pick') + '" data-k="' + esc(key) + '" data-v="' + esc(v) + '" aria-pressed="' + on + '"><span class="dot">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span><span>' + esc(t) + '</span></button>'; }
  function qh(t, sub) { return '<h2 class="q">' + T(esc(t)) + '</h2>' + (sub ? '<p class="qsub">' + T(esc(sub)) + '</p>' : ''); }

  var STEP = {}, CHECK = {};
  STEP.say = function (s) { return shinSays(s.mood || 'hi', '<p>' + Q(s.t) + '</p>' + (s.t2 ? '<p>' + Q(s.t2) + '</p>' : ''), 76); };
  STEP.write = function (s) { return qh(s.q, s.sub) + areaHTML(s.key, s.ph, 3) + tipsHTML(s.key, s.tips); };
  CHECK.write = function (s) { return trim(g(s.key)).length >= (s.min || 6) ? '' : 'Viết vài chữ nhé'; };

  /* ----- Xuất phát ----- */
  STEP.from = function () { /* PS1.3.41: mang bài CD01 lên thuyền; chưa xong CD01 thì khuyên học CD01 trước */
    var st = cd1State(), h = '';
    if (st === 'done') {
      var CR = g('x1.carry') || [], avail = C1_CARRY.filter(function (k) { return !!c1Val(k); });
      h += shinSays('moved', '<p>Shin còn giữ bài CD01 của bạn. Chọn 3 điều bạn muốn mang theo lên thuyền nhé.</p>', 64) +
        '<div class="carry">' + avail.map(function (k) { var on = CR.indexOf(k) > -1;
          return '<button type="button" class="cry' + (on ? ' on' : '') + '" data-act="carry" data-v="' + k + '" aria-pressed="' + on + '"><span class="cry__ck">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span><small>' + esc(C1_LAB[k]) + '</small><b>' + esc(cut1(c1Val(k), 110)) + '</b></button>'; }).join('') + '</div>';
      if (!jobKey() || g('x1.job')) h += jobPick();
      else h += '<button type="button" class="link" data-act="pick" data-k="x1.job" data-v="' + esc(jobKey()) + '">Đổi nghề khác</button>';
      return h;
    }
    if (!g('x1.skip')) {
      var dn = cd1Done();
      return shinSays('think', '<p>' + (st === 'part' ? 'Bạn đang học dở CD01 (' + dn[0] + '/' + dn[1] + ' chặng).' : 'Bạn chưa học CD01.') + ' Học xong CD01 trước, CD02 sẽ dùng lại bài của bạn và học liền mạch hơn.</p>', 64) +
        '<div class="c1go"><a class="btn btn--w" href="../cd01/">' + PS.icon('book', 18) + 'Sang học CD01</a>' +
        '<button type="button" class="btn btn--soft btn--w" data-act="pick" data-k="x1.skip" data-v="1">Vẫn vào CD02</button></div>';
    }
    var c = cd1(), V2 = g('x1.val') || [], G2 = g('x1.good') || [];
    h += shinSays('hi', '<p>Vậy bạn trả lời nhanh mấy câu này nhé. CD02 sẽ dùng lại.</p>', 60);
    if (!jobKey() || g('x1.job')) h += jobPick();
    if (!trim(c.me)) h += qh('5 năm sau, bạn muốn là người thế nào?') + '<input class="inp ps-sel" data-k="x1.me" maxlength="80" value="' + esc(g('x1.me') || '') + '">';
    if (!arr(c.value).length) h += qh('Điều gì quan trọng nhất với bạn?') + '<div class="chips">' + C1_VALS.map(function (t) { return '<button type="button" class="chip' + (V2.indexOf(t) > -1 ? ' on' : '') + '" data-act="multi2" data-k="x1.val" data-v="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>';
    if (!arr(c.good).length) h += qh('Bạn mạnh ở điểm nào?') + '<div class="chips">' + C1_GOOD.map(function (t) { return '<button type="button" class="chip' + (G2.indexOf(t) > -1 ? ' on' : '') + '" data-act="multi2" data-k="x1.good" data-v="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>';
    return h;
  };
  function jobPick() {
    var v = g('x1.job') || '';
    return qh('Nghề bạn định làm ở Nhật') + '<div class="chips">' + INDS2.map(function (x) { return '<button type="button" class="chip' + (v === x[0] ? ' on' : '') + '" data-act="pick" data-k="x1.job" data-v="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') +
      '<button type="button" class="chip' + (v === 'u' ? ' on' : '') + '" data-act="pick" data-k="x1.job" data-v="u">Chưa biết</button></div>';
  }
  CHECK.from = function () {
    var job = jobKey() || g('x1.job') === 'u', c = cd1();
    if (cd1State() === 'done') { var n = C1_CARRY.filter(function (k) { return !!c1Val(k); }).length, cr = (g('x1.carry') || []).length;
      if (cr < Math.min(3, n)) return 'Chọn ' + Math.min(3, n) + ' điều mang theo (' + cr + ')'; return job ? '' : 'Chọn nghề của bạn'; }
    if (!g('x1.skip')) return 'Chọn học CD01 trước hoặc vào CD02';
    if (!job) return 'Chọn nghề của bạn';
    if (!trim(c.me) && trim(g('x1.me')).length < 4) return 'Viết bạn muốn là người thế nào';
    if (!arr(c.value).length && !(g('x1.val') || []).length) return 'Chọn điều quan trọng nhất';
    if (!arr(c.good).length && !(g('x1.good') || []).length) return 'Chọn điểm mạnh';
    return '';
  };
  STEP.flag = function (s) {
    var f = g('x1.flag') || {};
    return qh(s.q) + '<div class="flagbox">' + flagMast(f.s || 'compass', f.c || '#0F9F98') + '</div>' +
      '<h3 class="qs">Biểu tượng</h3><div class="symgrid">' + (W.PSAvatar ? '<button type="button" class="sym sym--av' + (f.s === 'av' ? ' on' : '') + '" data-act="flagSym" data-v="av" aria-label="Ảnh đại diện của tôi"><svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">' + flagSym('av') + '</svg><small>Ảnh của tôi</small></button>' : '') + FLAG_SYM.map(function (x) { return '<button type="button" class="sym' + (f.s === x[0] ? ' on' : '') + '" data-act="flagSym" data-v="' + x[0] + '" aria-label="' + esc(x[1]) + '"><svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">' + flagSym(x[0], '#141413') + '</svg><small>' + esc(x[1]) + '</small></button>'; }).join('') + '</div>' +
      (f.s === 'av' ? '<p class="avnote">Cờ dùng ảnh đại diện của bạn. Đổi ảnh thì cờ đổi theo. <button type="button" class="link" data-act="avPick">Đổi ảnh đại diện</button></p>' : '') +
      '<h3 class="qs">Màu cờ</h3><div class="colrow">' + FLAG_COL.map(function (x) { return '<button type="button" class="col' + (flagCol(f.c) === x[0] ? ' on' : '') + '" data-act="flagCol" data-v="' + x[0] + '" style="background:' + x[0] + '" aria-label="' + esc(x[1]) + '"></button>'; }).join('') + '</div>' +
      '<h3 class="qs">Khẩu hiệu của thủy thủ đoàn</h3><input class="inp ps-sel" data-k="x1.motto" maxlength="40" value="' + esc(g('x1.motto') || '') + '" placeholder="Ví dụ: Đi chậm mà chắc">' + tipsHTML('x1.motto', MOTTO_TIPS);
  };
  CHECK.flag = function () { var f = g('x1.flag') || {}; if (!f.s) return 'Chọn biểu tượng'; if (!f.c) return 'Chọn màu cờ'; return trim(g('x1.motto')).length >= 3 ? '' : 'Viết khẩu hiệu'; };
  STEP.open1 = function (s) {
    var n = g('x1.n') || '', su = g('x1.sure') == null ? 5 : +g('x1.sure');
    return qh(s.q) + '<div class="chips">' + OPEN_N.map(function (x) { return '<button type="button" class="chip' + (n === x[0] ? ' on' : '') + '" data-act="pick" data-k="x1.n" data-v="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' +
      qh(s.q2) + '<div class="slide1"><input type="range" min="0" max="10" step="1" value="' + su + '" data-k="x1.sure" aria-label="Rõ mấy phần"><div class="slide1__l"><span>Chưa rõ gì</span><b id="sureOut">' + su + '/10</b><span>Rất rõ</span></div></div>' +
      qh(s.q3) + areaHTML('x1.now', s.ph, 2) + '<p class="ps-small">Cuối khóa Shin hỏi lại 2 câu này.</p>';
  };
  CHECK.open1 = function () { if (!g('x1.n')) return 'Chọn số hướng'; return trim(g('x1.now')).length >= 3 ? '' : 'Viết điều bạn nghĩ'; };
  STEP.card = function (s) { return shinSays('proud', '<p>' + Q(s.t) + '</p>', 64) + bookHTML(1) + '<div class="shipwrap">' + shipSVG2(shipP(), flag().s, flag().c, 230) + '<p class="shipcap"><small>' + esc(SHIP_PORT) + '</small></p></div>'; };

  /* ----- Bến 1 ----- */
  function shuffled(a, seed) { var r = a.slice(), x = seed || 7; for (var i = r.length - 1; i > 0; i--) { x = (x * 9301 + 49297) % 233280; var j = Math.floor(x / 233280 * (i + 1)); var t = r[i]; r[i] = r[j]; r[j] = t; } return r; }
  STEP.flip = function () {
    var G = g('b11.g') || {};
    return '<div class="flips">' + FLIP.map(function (id, k) {
      var sp = spOf(id), gv = G[id], is = isleOf(sp.isl);
      if (!gv) return '<div class="flip"><div class="flip__front"><span class="spc__av">' + esc(initials(sp.n)) + '</span><div><b>' + esc(sp.n) + '</b><small>' + esc([sp.job, sp.jl].filter(Boolean).join(' · ')) + '</small></div></div>' +
        '<p class="flip__kd">' + esc(sp.kd) + '</p><p class="flip__q">Sau 3 năm, ' + esc(sp.a.toLowerCase()) + ' đi hướng nào?</p><div class="flip__opts">' +
        shuffled(FLIP_OPTS[id], k + 3).map(function (iid) { var x = isleOf(iid); return '<button type="button" class="isbtn" data-act="flipGuess" data-id="' + id + '" data-v="' + iid + '">' + cdIc(x.ic, 16) + esc(x.n) + '</button>'; }).join('') + '</div></div>';
      var hit = gv === sp.isl;
      return '<div class="flip flip--open"><div class="flip__front">' + spAv(sp) + '<div><b>' + esc(sp.n) + '</b><small>' + esc([sp.job, sp.jl].filter(Boolean).join(' · ')) + '</small></div></div>' +
        '<div class="flip__res"><span class="tagres' + (hit ? ' hit' : '') + '">' + (hit ? 'Bạn đoán trúng!' : 'Bất ngờ chưa?') + '</span><small>Bạn đoán: ' + esc(isleOf(gv).n) + '</small></div>' +
        '<p class="flip__isle">' + cdIc(is.ic, 16) + '<b>' + esc(is.n) + '</b></p><p class="flip__nay">' + esc(sp.nay) + '</p>' +
        '<button type="button" class="link" data-act="sp" data-id="' + sp.id + '">Đọc trọn chuyện</button></div>';
    }).join('') + '</div>';
  };
  CHECK.flip = function () { var G = g('b11.g') || {}, n = 0; FLIP.forEach(function (id) { if (G[id]) n++; }); return n >= FLIP.length ? '' : 'Lật đủ ' + FLIP.length + ' thẻ (' + n + '/' + FLIP.length + ')'; };
  STEP.flipsum = function () {
    var G = g('b11.g') || {}, hit = 0; FLIP.forEach(function (id) { if (G[id] === spOf(id).isl) hit++; });
    var sur = FLIP.length - hit;
    return shinSays(sur >= 3 ? 'wow' : 'cheer', '<p>Bạn đoán trúng <b>' + hit + '/' + FLIP.length + '</b>. Có <b>' + sur + '</b> hướng đi làm bạn bất ngờ.</p><p>' + (sur >= 3 ? 'Nghĩa là còn nhiều hướng bạn chưa biết. Mình đi tiếp nhé!' : 'Bạn đoán giỏi ghê! Đi tiếp để xem kỹ hơn nhé.') + '</p>', 76) +
      '<div class="fogmini"><b>' + fogOpen() + '/8</b><span>đảo đã hiện trên hải đồ</span></div>' +
      '<p class="ps-small">Thẻ Senpai đã cất vào Sổ tay.</p>';
  };
  STEP.isles = function () {
    var tg = g('b12.t') || {}, op = V.isOpen || '', RI = riaIsles();
    return riaNote() + '<div class="isles">' + ISLES.map(function (is) {
      var t = tg[is.id], open = op === is.id, lab = ''; TAG3.forEach(function (x) { if (x[0] === t) lab = x[1]; });
      return '<div class="isl' + (open ? ' open' : '') + (t ? ' tagged' : '') + '"><button type="button" class="isl__h" data-act="isOpen" data-id="' + is.id + '" aria-expanded="' + open + '"><span class="isl__ic">' + cdIc(is.ic, 20) + '</span><span><b>' + esc(is.n) + '</b><small>' + esc(is.sub) + '</small>' + (RI.indexOf(is.id) > -1 ? '<em class="ria-tag">Hợp sở thích của bạn</em>' : '') + '</span>' +
        (t ? '<span class="badge badge--ok">' + esc(lab) + '</span>' : '<span class="badge">Chạm xem</span>') + '</button>' +
        (open ? '<div class="isl__b"><small class="side">' + esc(ISLE_SIDE[is.side]) + '</small>' + isleInfo(is) + pathHTML(is, 0) + '<p class="who"><small>Đã có người đi:</small> ' + is.who.map(function (id) { var sp = spOf(id); return '<button type="button" class="whochip" data-act="sp" data-id="' + id + '">' + esc(sp.a) + '</button>'; }).join('') + '</p>' +
          '<p class="qs">Bạn thấy hướng này…</p><div class="tag3">' + TAG3.map(function (x) { return '<button type="button" class="tag' + (t === x[0] ? ' on' : '') + '" data-act="isTag" data-id="' + is.id + '" data-v="' + x[0] + '">' + PS.icon(x[2], 15) + esc(x[1]) + '</button>'; }).join('') + '</div></div>' : '') + '</div>';
    }).join('') + '</div>';
  };
  CHECK.isles = function () { var tg = g('b12.t') || {}, n = 0; ISLES.forEach(function (is) { if (tg[is.id]) n++; }); return n >= ISLES.length ? '' : 'Gắn nhãn đủ 8 hướng (' + n + '/8)'; };
  STEP.pickisle = function (s) {
    var tg = g('b12.t') || {}, v = g(s.key), RI = riaIsles();
    var L = ISLES.slice().sort(function (a, b) { var r = { cur: 0, 'new': 1, no: 2 }; return (r[tg[a.id]] == null ? 3 : r[tg[a.id]]) - (r[tg[b.id]] == null ? 3 : r[tg[b.id]]); });
    return qh(s.q, s.sub) + '<div class="opts">' + L.map(function (is) { var lab = ''; TAG3.forEach(function (x) { if (x[0] === tg[is.id]) lab = ' · ' + x[1]; }); return opt(s.key, is.id, is.n + lab + (RI.indexOf(is.id) > -1 ? ' · Hợp sở thích' : ''), v === is.id); }).join('') + '</div>';
  };
  CHECK.pickisle = function (s) { return g(s.key) ? '' : 'Chọn một hướng'; };

  /* ----- Bến 2 ----- */
  function bookList(same) {
    var jk = jobKey(), mine = g('b21.b1'), cur = g('b13.isl');
    var L = SENPAI.filter(function (sp) { return same ? (jk && sp.ind === jk) : (!jk || sp.ind !== jk) && sp.id !== mine; });
    if (same && !L.length) return null;
    if (!same) { var R = ria().slice(0, 2), rk = function (sp) { for (var i = 0; i < R.length; i++) if ((RIA_SP[R[i]] || []).slice(0, 2).indexOf(sp.id) > -1) return i; return 9; };
      L.sort(function (a, b) { return (rk(a) - rk(b)) || ((cur && a.isl === cur ? 0 : 1) - (cur && b.isl === cur ? 0 : 1)); }); }
    return L;
  }
  STEP.book = function (s) {
    var key = 'b21.b' + s.n, fk = 'b21.fr' + s.n, v = g(key), L = bookList(!!s.same), h = qh(s.q);
    if (s.same && !L) { L = SENPAI.filter(function (sp) { return sp.id !== g('b21.b2'); }); h += '<p class="qsub">Khóa chưa có chuyện cùng nghề ' + esc(jobName()) + '. Bạn chọn người bạn thấy gần mình nhé.</p>'; }
    var R = s.same ? [] : ria().slice(0, 2), rf = function (sp) { for (var i = 0; i < R.length; i++) if ((RIA_SP[R[i]] || []).slice(0, 2).indexOf(sp.id) > -1) return R[i]; return ''; }; /* chỉ 2 nhóm đầu, mỗi nhóm 2 người: tối đa 4 nhãn */
    if (!v) return h + (R.length ? riaNote() : '') + '<div class="spgrid">' + L.slice(0, 8).map(function (sp) { var rr = rf(sp); return '<button type="button" class="spc" data-act="book" data-k="' + key + '" data-v="' + sp.id + '">' + spAv(sp) + '<span class="spc__b"><b>' + esc(sp.n) + '</b><small>' + esc(sp.job) + (sp.jl ? ' · ' + esc(sp.jl) : '') + '</small><em>' + esc(sp.tag) + '</em>' + (rr ? '<i class="ria-tag">Hợp sở thích ' + rr + '</i>' : '') + '</span></button>'; }).join('') + '</div>';
    var sp = spOf(v), fr = g(fk);
    return h + spBody(sp) + '<h3 class="qs">Đoạn nào làm bạn nhớ nhất?</h3><div class="chips">' + [['kd', 'Khởi đầu'], ['bn', 'Bước ngoặt'], ['nay', 'Hôm nay']].map(function (x) { return '<button type="button" class="chip' + (fr === x[0] ? ' on' : '') + '" data-act="pick" data-k="' + fk + '" data-v="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' +
      '<button type="button" class="link" data-act="bookRe" data-k="' + key + '">Chọn người khác</button>';
  };
  CHECK.book = function (s) { if (!g('b21.b' + s.n)) return 'Chọn một người'; return g('b21.fr' + s.n) ? '' : 'Chọn một đoạn'; };
  function fWho(fid) { var L = []; SENPAI.forEach(function (sp) { if (sp.f.indexOf(fid) > -1) L.push(sp); }); return L; }
  STEP.clip = function (s) { return shinSays(s.mood || 'hi', '<p>' + Q(CLIP_SAY[s.w] || '') + '</p>', 60) + clipBlock(s.w) + clipOther(s.w); };
  STEP.common = function () { /* PS1.3.45 (thầy góp ý 12): chọn 2–3 điều bạn thấy ở anh chị → xem những anh chị CÓ KỂ về điều đó. Không đếm, không so phần trăm. */
    var sel = g('b22.sel') || [], h = qh('Bạn thấy các anh chị có điểm chung nào?', 'Chọn 2–3 điều.') + '<div class="chips chips--cmn">' + CD2_F.map(function (f) {
      var on = sel.indexOf(f[0]) > -1; return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-act="cmnSel" data-v="' + f[0] + '" aria-pressed="' + on + '">' + (on ? PS.icon('check', 13, 3) : '') + esc(f[1]) + '</button>'; }).join('') + '</div>';
    if (sel.length >= 2) {
      h += shinSays('think', '<p>Đây là những anh chị <b>có kể</b> về điều bạn chọn. Chạm tên để đọc chuyện.</p>', 52) + '<div class="cmnwho">' + sel.map(function (fid) {
        var f = null; CD2_F.forEach(function (x) { if (x[0] === fid) f = x; }); if (!f) return '';
        var L = fWho(fid); L.sort(function (a, b) { return (S.cards[a.id] ? 0 : 1) - (S.cards[b.id] ? 0 : 1); });
        return '<div class="cmnwho__r"><b>' + esc(f[1]) + '</b><p class="who">' + L.slice(0, 5).map(function (sp) { return '<button type="button" class="whochip" data-act="sp" data-id="' + sp.id + '">' + esc(sp.a) + '</button>'; }).join('') + '</p></div>';
      }).join('') + '</div><p class="ps-small">Bài viết không kể không có nghĩa là người đó không có điều này.</p>';
    }
    return h;
  };
  CHECK.common = function () { var n = (g('b22.sel') || []).length; return n >= 2 ? '' : 'Chọn ít nhất 2 điều (' + n + '/2)'; };
  STEP.base = function () {
    var v = g('b22.base'), a = g('b22.act'), bs = null; BASE5.forEach(function (b) { if (b.id === v) bs = b; });
    var h = '<div class="aha"><span>' + cdIc('anchor', 26) + '</span><div><b>Hướng nào cũng bắt đầu từ 3 năm ở Nhật</b><p>8 hướng khác nhau, nhưng ai cũng xây cùng một nền trong 3 năm đầu.</p></div></div>' +
      qh('Nền nào bạn muốn bắt đầu xây ngay ở JPC?') + '<div class="base5">' + BASE5.map(function (b) { return '<button type="button" class="b5' + (v === b.id ? ' on' : '') + '" data-act="pick" data-k="b22.base" data-v="' + b.id + '"><span>' + cdIc(b.ic, 22) + '</span><b>' + esc(b.n) + '</b><small>' + esc(b.d) + '</small></button>'; }).join('') + '</div>';
    if (bs) {
      h += qh('Một việc nhỏ bạn làm từ tuần này') + '<div class="chips">' + bs.act.map(function (t) { return '<button type="button" class="chip' + (a === t ? ' on' : '') + '" data-act="pick" data-k="b22.act" data-v="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>';
      if (!S.demo && PS.routineSugHTML) h += PS.routineSugHTML(bs.rt, { from: ID, sub: esc('Rèn thành thói quen mỗi ngày với Shin Routine') });
    }
    return h;
  };
  CHECK.base = function () { if (!g('b22.base')) return 'Chọn một nền'; return g('b22.act') ? '' : 'Chọn một việc nhỏ'; };
  /* PS1.3.42: Phỏng vấn anh chị đi trước · chọn 1 trong 3 nhân vật ghép (PEERS), hỏi 3 câu */
  function peerOf(id) { for (var i = 0; i < PEERS.length; i++) if (PEERS[i].id === id) return PEERS[i]; return null; }
  function peer() { return peerOf(g('b23.who')) || ((g('b23.ask') || []).length ? PEERS[0] : null); }
  STEP.chat = function () {
    var p = peer();
    if (!p) return qh('Bạn là phóng viên nhỏ của lớp. Chọn 1 anh chị để phỏng vấn') + '<div class="peers">' + PEERS.map(function (x) {
      return '<button type="button" class="peer" data-act="peer" data-v="' + x.id + '"><span class="msg__av">' + esc(x.av) + '</span><span><b>' + esc(x.n) + '</b><small>' + esc(x.role) + '</small></span>' + PS.icon('next', 16) + '</button>'; }).join('') + '</div>' +
      '<p class="ps-small">' + esc(PEER_NOTE) + '</p>';
    var asked = g('b23.ask') || [];
    var h = '<div class="peerhd"><span class="msg__av">' + esc(p.av) + '</span><div><b>' + esc(p.n) + '</b><small>' + esc(p.role) + '</small></div><button type="button" class="link" data-act="peerRe">Đổi người</button></div>' +
      '<div class="chat"><div class="msg"><span class="msg__av">' + esc(p.av) + '</span><div class="msg__b">' + Q(p.hi) + '</div></div>';
    asked.forEach(function (i) { var x = p.qa[i]; if (!x) return; h += '<div class="msg msg--me"><div class="msg__b">' + esc(x[0]) + '</div></div><div class="msg"><span class="msg__av">' + esc(p.av) + '</span><div class="msg__b">' + esc(x[1]) + '</div></div>'; });
    h += '</div>' + (asked.length < p.qa.length ? '<p class="qsub">' + (asked.length < 3 ? 'Chọn câu hỏi (' + asked.length + '/3)' : 'Hỏi thêm nếu bạn muốn') + '</p>' : '') +
      '<div class="chips chips--ask">' + p.qa.map(function (x, i) { return asked.indexOf(i) > -1 ? '' : '<button type="button" class="chip" data-act="ask" data-v="' + i + '">' + esc(x[0]) + '</button>'; }).join('') + '</div>';
    if (asked.length >= 3) h += '<h3 class="qs">Đọc chuyện thật cùng hướng</h3><div class="alt">' + p.read.map(function (id) { var sp = spOf(id); return '<button type="button" class="altc" data-act="sp" data-id="' + id + '"><b>' + esc(sp.a) + '</b><span>' + esc(sp.tag) + '</span></button>'; }).join('') + '</div>';
    return h + '<p class="ps-small">' + esc(PEER_NOTE) + '</p>';
  };
  CHECK.chat = function () { if (!peer()) return 'Chọn một anh chị'; var n = (g('b23.ask') || []).length; return n >= 3 ? '' : 'Hỏi ít nhất 3 câu (' + n + '/3)'; };

  /* ----- Bến 3 ----- */
  function pv() { var v = g('b31.v'); if (!v || !v.push) { v = [5, 5, 5, 5, 5, 5]; } return v; }
  STEP.pairs = function () {
    var v = pv();
    return '<div class="cmpbox" id="cmpBox">' + compassSVG(v, 340) + '</div><div class="pairs">' + PAIRS.map(function (p, i) {
      return '<div class="pair"><div class="pair__l"><span class="' + (v[i] < 5 ? 'on' : '') + '">' + esc(p[0]) + '</span><span class="' + (v[i] > 5 ? 'on' : '') + '">' + esc(p[1]) + '</span></div>' +
        '<input type="range" min="0" max="10" step="1" value="' + v[i] + '" data-pair="' + i + '" aria-label="' + esc(p[0] + ' hay ' + p[1]) + '"></div>';
    }).join('') + '</div>';
  };
  function onSlide(e) {
    var t = e.target, i = +t.getAttribute('data-pair'), v = pv().slice(); v[i] = +t.value; S.d['b31.v'] = v; save();
    var box = D.getElementById('cmpBox'); if (box) box.innerHTML = compassSVG(v, 340);
    var lab = t.parentNode.querySelectorAll('.pair__l span'); if (lab.length === 2) { lab[0].className = v[i] < 5 ? 'on' : ''; lab[1].className = v[i] > 5 ? 'on' : ''; }
  }
  function cut2(t, n) { t = trim(t); return t.length > n ? t.slice(0, n - 1) + '…' : t; }
  function zoneHTML() { /* 2 vòng tròn: ngoài = mình lo nhưng khó tác động, trong = mình tác động được */
    var L = windList(), pill = function (w) { return '<span class="z2__p">' + esc(cut2(w.t, 28)) + '</span>'; };
    return '<div class="z2"><div class="z2__out"><small>Mình quan tâm nhưng khó thay đổi được</small><div class="z2__ps">' + L.filter(function (w) { return w.z === 'out'; }).map(pill).join('') + '</div>' +
      '<div class="z2__in"><small>Mình giải quyết được</small><div class="z2__ps">' + L.filter(function (w) { return w.z === 'in'; }).map(pill).join('') + '</div></div></div></div>';
  }
  STEP.winds = function () { /* PS1.3.45 (thầy góp ý 18): tự viết 2–3 điều có thể làm đổi kế hoạch, rồi đặt vào 2 vòng tròn */
    var Z = g('b32.z') || {}, ex = [WINDS[0], WINDS[2], WINDS[3]];
    var h = qh('Điều gì có thể làm kế hoạch của bạn thay đổi?', 'Viết ít nhất 2 điều.') + '<div class="wlist">' + [0, 1, 2].map(function (i) {
      var t = trim(g('b32.w' + i)), ok = t.length >= 3;
      return '<div class="wrow' + (Z[i] && ok ? ' set' : '') + '"><input class="inp ps-sel" data-k="b32.w' + i + '" maxlength="60" value="' + esc(g('b32.w' + i) || '') + '" placeholder="Ví dụ: ' + esc(ex[i]) + (i === 2 ? ' (không bắt buộc)' : '') + '">' +
        '<div class="seg2"><button type="button" class="' + (Z[i] === 'in' ? 'on' : '') + '" data-act="wz" data-id="' + i + '" data-v="in">Mình giải quyết được</button><button type="button" class="' + (Z[i] === 'out' ? 'on' : '') + '" data-act="wz" data-id="' + i + '" data-v="out">Ngoài khả năng</button></div></div>';
    }).join('') + '</div>';
    return h + zoneHTML();
  };
  CHECK.winds = function () { var L = windList(); if (L.length < 2) return 'Viết ít nhất 2 điều (' + L.length + '/2)'; var n = 0; L.forEach(function (w) { if (w.z) n++; }); return n >= L.length ? '' : 'Đặt mỗi điều vào một vòng (' + n + '/' + L.length + ')'; };
  STEP.winds2 = function () {
    var L = windList(), h = zoneHTML() + shinSays('think', '<p>Điều mình giải quyết được: chuẩn bị cách làm. Điều ngoài khả năng: vẫn có một phần nhỏ mình làm được.</p>', 52);
    L.forEach(function (w) {
      h += '<div class="wans wans--' + w.z + '"><span class="wans__z">' + (w.z === 'in' ? 'Mình giải quyết được' : 'Ngoài khả năng') + '</span>' +
        qh(w.z === 'in' ? 'Nếu “' + w.t + '” xảy ra, mình sẽ…' : 'Với “' + w.t + '”, phần nhỏ nào mình vẫn làm được?') +
        areaHTML('b32.a' + w.i, w.z === 'in' ? 'Ví dụ: nói chuyện thẳng thắn với gia đình, hỏi anh chị đã gặp chuyện này.' : 'Ví dụ: để dành một khoản phòng thân, học thêm một kỹ năng mang về được.', 2, 200) + '</div>';
    });
    return h;
  };
  CHECK.winds2 = function () { var L = windList(), miss = ''; L.forEach(function (w) { if (!miss && trim(g('b32.a' + w.i)).length < 5) miss = 'Viết cách ứng phó cho “' + cut2(w.t, 18) + '”'; }); return miss; };
  function age() { var by = +prof().by || 0, y = new Date().getFullYear(); return by > 1950 && by < y ? y - by : 0; }
  STEP.life = function () {
    var a = age(), h = shinSays('think', '<p>Hồi ở trường, thầy của Shin hay vẽ một đường đời lên bảng. Shin nhớ mãi, kể bạn nghe nhé.</p>', 68);
    h += '<div class="life">' + LIFE.map(function (x) { var cur = a >= x[0] && a < x[1]; return '<div class="life__r' + (cur ? ' cur' : '') + '"><b>' + x[0] + '–' + x[1] + '</b><span>' + esc(x[2]) + '</span>' + (cur ? '<em>Bạn đang ở đây</em>' : '') + '</div>'; }).join('') + '</div>' +
      '<div class="tnote"><b>Thầy bảo:</b> đi Nhật 3–5 năm là “lấy ngắn nuôi dài”. Mấy năm ngắn ở Nhật để nuôi cả sự nghiệp dài phía sau.</div>';
    if (a) h += '<p class="qsub">Năm nay bạn khoảng <b>' + a + '</b> tuổi. Xong 3 năm ở Nhật, bạn khoảng <b>' + (a + 4) + '</b>. 10 năm nữa, bạn khoảng <b>' + (a + 10) + '</b>.</p>';
    /* PS1.3.44 (thầy góp ý 19): các anh chị vận dụng điều thầy dặn, không đặt Senpai “đi khác đường thầy vẽ” */
    h += '<h3 class="qs">Các anh chị vận dụng điều thầy dặn thế nào?</h3><div class="alt">' +
      '<button type="button" class="altc" data-act="sp" data-id="sy"><b>Anh Sỹ · Chọn một nghề, làm liên tục</b><span>8 năm gắn bó một công ty, lên Kỹ năng đặc định 2.</span></button>' +
      '<button type="button" class="altc" data-act="sp" data-id="thao"><b>Chị Thu Thảo · Lấy ngắn nuôi dài</b><span>3 năm ở Nhật học làm bánh Nhật, về nước mở tiệm bánh.</span></button>' +
      '<button type="button" class="altc" data-act="sp" data-id="huan"><b>Anh Huân · Đi theo nhịp của mình</b><span>30 tuổi mới sang Nhật, bền bỉ học đến N1.</span></button></div>' +
      '<p class="ps-small">Đường đời để tham khảo. Mỗi người vận dụng theo nhịp của mình.</p>';
    return h;
  };
  STEP.compass = function () {
    return shinSays('proud', '<p>La bàn của <b class="nm">' + esc(given()) + '</b> đã chỉnh xong!</p>', 64) + '<div class="cmpbox">' + compassSVG(pv(), 340) + '</div>' +
      '<div class="cmpsum"><div><small>Nghiêng rõ nhất</small><b>' + esc(lean()) + '</b></div>' + (sucList().length ? '<div class="cmpsum__suc"><small>Thành công là</small>' + sucRope(0) + '</div>' : '<div><small>Thành công là</small><b>' + esc(sucTxt() || '…') + '</b></div>') + '<div><small>10 năm nữa sống tốt là</small><b>' + esc(trim(g('b33.life')).replace(/^(Ở tuổi 30|10 năm nữa), một cuộc sống tốt với mình là\s*/, '') || '…') + '</b></div></div>' +
      '';
  };

  /* ----- Bến 4 · Phòng Hải Đồ ----- */
  function voyOf(v) { for (var i = 0; i < VOY.length; i++) if (VOY[i][0] === v) return VOY[i]; return null; }
  function voyIsle(v) { var id = g(v + '.isl'); if (!id) return null; if (id === 'o') return { id: 'o', n: trim(g(v + '.islo')) || 'Đảo riêng', ic: 'compass', sub: '' }; return isleOf(id); }
  function msList(v) { var L = []; ['1', '3', '5'].forEach(function (y) { var t = trim(g(v + '.m' + y)); if (t) L.push('Năm ' + y + ': ' + t); }); return L; }
  function gOf(v) { var G = g(v + '.g'); return (G && typeof G === 'object') ? G : {}; }
  function wOf() { var w = g('b51.w'); return (w && typeof w === 'object') ? w : { like: 2, conf: 2, fit: 2 }; }
  function voyScore(v) { var G = gOf(v), W2 = wOf(), t = 0, m = 0; METERS.forEach(function (x) { var w = +W2[x[0]] || 2; t += (+G[x[0]] || 0) * w; m += 5 * w; }); return m ? Math.round(t / m * 100) : 0; }
  function voyTitle(v) { var x = voyOf(v), nm = trim(g(v + '.name')); return 'Kế hoạch ' + x[1] + (nm ? ' · ' + nm : ''); }
  function leanVoy() { var v = g('b51.lean'); return voyOf(v) ? v : ''; }
  function leanLetter() { var v = leanVoy(); return v ? voyOf(v)[1] : (g('b51.lean') === 'u' ? 'Chưa nghiêng' : ''); }
  function leanName() { var v = leanVoy(); if (v) return voyTitle(v); var is = isleOf(g('b13.isl')); return is ? 'hướng ' + is.n : 'kế hoạch bạn chọn'; }
  function leanIsle() { var v = leanVoy(); return v ? voyIsle(v) : (isleOf(g('b13.isl')) || null); }
  var gaugeN = 0;
  function gaugeSVG(n) { /* PS1.3.56 (góp ý 4): phần tô chuyển dần từ màu 1 tới màu của mức đang chọn */
    n = +n || 0; var L = 144.5, th = Math.PI * (1 - n / 5), nx = 60 + 34 * Math.cos(th), ny = 58 - 34 * Math.sin(th), gid = 'cdg' + (++gaugeN), gr = '', k, xt = 60 - 46 * Math.cos(Math.PI * n / 5), xs;
    if (n) { gr = '<defs><linearGradient id="' + gid + '" gradientUnits="userSpaceOnUse" x1="9" y1="0" x2="' + (xt + 5).toFixed(1) + '" y2="0"><stop offset="0" stop-color="' + METER_COL[0] + '"/>';
      for (k = 2; k <= n; k++) { xs = 60 - 46 * Math.cos(Math.PI * (k - .5) / 5); gr += '<stop offset="' + (k === n ? 1 : Math.max(0, Math.min(1, (xs - 9) / (xt - 4)))).toFixed(3) + '" stop-color="' + METER_COL[k - 1] + '"/>'; }
      if (n === 1) gr += '<stop offset="1" stop-color="' + METER_COL[0] + '"/>';
      gr += '</linearGradient></defs>'; }
    return '<svg class="gauge" viewBox="0 0 120 66" aria-hidden="true">' + gr + '<path d="M14 58A46 46 0 0 1 106 58" fill="none" stroke="#EEECE4" stroke-width="10" stroke-linecap="round"/>' +
      (n ? '<path d="M14 58A46 46 0 0 1 106 58" fill="none" stroke="url(#' + gid + ')" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + (L * n / 5).toFixed(1) + ' 200"/>' : '') +
      '<path d="M60 58L' + nx.toFixed(1) + ' ' + ny.toFixed(1) + '" stroke="#141413" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="58" r="5" fill="#141413"/></svg>';
  }
  function voyCard(v, sm) {
    var x = voyOf(v), is = voyIsle(v), G = gOf(v), ms = msList(v), jl = g(v + '.jl'), lean = leanVoy() === v;
    if (!is) return '<div class="voyc voyc--empty"><span class="voyc__l">' + x[1] + '</span><b>' + esc(x[2]) + '</b><small>Chưa vẽ</small></div>';
    return '<div class="voyc' + (lean ? ' voyc--lean' : '') + '"><div class="voyc__h"><span class="voyc__l">' + x[1] + '</span><div><small>' + esc(x[2]) + '</small><b>' + esc(trim(g(v + '.name')) || is.n) + '</b></div>' + (planK(v) ? '<span class="voyc__ic">' + planArt(planK(v), 46) + '</span>' : '') + '</div>' +
      '<p class="voyc__is">' + cdIc(is.ic, 15) + esc(is.n) + (jl ? ' · ' + esc(jl === 'x' ? 'Tiếng Nhật vừa đủ' : jl) : '') + '</p>' +
      (sm ? '' : '<ol class="voyc__ms">' + ms.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol>') +
      '<div class="voyc__g">' + METERS.map(function (m) { var n = +G[m[0]] || 0; return '<span><small>' + esc(m[3] || m[1]) + '</small><i><b style="width:' + (n * 20) + '%;background:' + (n ? METER_COL[n - 1] : 'none') + '"></b></i></span>'; }).join('') + '</div>' +
      (lean ? '<em class="voyc__tag">Đang nghiêng về</em>' : '') + '</div>';
  }
  function planK(v) { var k = g(v + '.ic'); return k && PLAN_ART[k] ? k : ''; }
  function planLab(k) { var t = ''; PLAN_IC.forEach(function (gr) { gr[1].forEach(function (x) { if (x[0] === k) t = x[1]; }); }); return t; }
  function planPicker(v) {
    var cur = planK(v), x = voyOf(v);
    ov('<h2>Chọn hình cho kế hoạch ' + x[1] + '</h2>' + PLAN_IC.map(function (gr) {
      return '<h3 class="qs">' + esc(gr[0]) + '</h3><div class="dbp dbp--5">' + gr[1].map(function (it) { var on = cur === it[0];
        return '<button type="button" class="dbp__b' + (on ? ' on' : '') + '" data-act="planIc" data-k="' + v + '" data-v="' + it[0] + '" aria-pressed="' + on + '">' + planArt(it[0], 42) + '<span>' + esc(it[1]) + '</span></button>'; }).join('') + '</div>';
    }).join(''));
  }
  function voyHead(v) {
    var x = voyOf(v);
    return '<div class="vhd"><div class="vhd__abc">' + VOY.map(function (y) { var cur = y[0] === v, ok = !cur && voyIsle(y[0]);
        return '<span class="' + (cur ? 'cur' : (ok ? 'ok' : '')) + '">' + (ok ? PS.icon('check', 12, 3) : '') + y[1] + '</span>'; }).join('<i></i>') + '</div>' +
      '<div class="vhd__m"><span class="vhd__l">' + x[1] + '</span><div><small>Kế hoạch ' + x[1] + '</small><b>' + esc(x[2]) + '</b><p>' + Q(x[3]) + '</p></div>' + (planK(v) ? '<span class="vhd__ic">' + planArt(planK(v), 52) + '</span>' : '') + '</div></div>';
  }
  STEP.voy = function (s) {
    var v = s.v, x = voyOf(v), id = g(v + '.isl') || '', is = voyIsle(v), c = cd1(), h = s.say ? shinSays('wink', '<p>' + Q(s.say) + '</p>', 52) : '';
    h += voyHead(v); /* PS1.3.56 (góp ý 6): băng giải thích kế hoạch nổi bật hơn */
    if (v === 'b41') {
      if (trim(g('x1.now'))) h += '<div class="from"><div><small>Lúc nhận thuyền, bạn viết</small><b>' + esc(g('x1.now')) + '</b></div></div>';
    } else {
      h += '<div class="voymini">' + VOY.filter(function (y) { return y[0] < v; }).map(function (y) { var i2 = voyIsle(y[0]); return '<span>' + y[1] + ' · ' + esc(i2 ? i2.n : '…') + '</span>'; }).join('') + '</div>';
    }
    h += qh('Kế hoạch ' + x[1] + ' đi hướng nào?') + '<div class="isgrid">' + ISLES.map(function (it) {
      return '<button type="button" class="isbtn' + (id === it.id ? ' on' : '') + '" data-act="pick" data-k="' + v + '.isl" data-v="' + it.id + '">' + cdIc(it.ic, 16) + esc(it.n) + '</button>';
    }).join('') + '<button type="button" class="isbtn' + (id === 'o' ? ' on' : '') + '" data-act="pick" data-k="' + v + '.isl" data-v="o">' + cdIc('compass', 16) + 'Hướng khác</button></div>';
    if (id === 'o') h += '<input class="inp ps-sel" data-k="' + v + '.islo" maxlength="40" value="' + esc(g(v + '.islo') || '') + '" placeholder="Tên hướng đi của bạn, ví dụ: làm hướng dẫn viên du lịch">';
    if (is && id !== 'o') h += '<p class="qsub voysub">' + esc(is.sub) + '</p>';
    h += qh('Đặt tên cho kế hoạch ' + x[1]) + '<input class="inp ps-sel" data-k="' + v + '.name" maxlength="40" value="' + esc(g(v + '.name') || '') + '" placeholder="Ví dụ: Thợ hàn giỏi ở Osaka">' +
      tipsHTML(v + '.name', is && id !== 'o' ? [is.sub, 'Con đường của riêng ' + given()] : ['Con đường của riêng ' + given()]);
    var pk = planK(v); /* PS1.3.57 (góp ý 7): chọn hình biểu tượng cho kế hoạch */
    h += qh('Chọn hình cho kế hoạch ' + x[1]) + '<button type="button" class="plpick' + (pk ? ' on' : '') + '" data-act="planPicker" data-k="' + v + '">' +
      (pk ? planArt(pk, 58, '#FBEFE8') + '<span><b>' + esc(planLab(pk)) + '</b><small>Chạm để đổi hình</small></span>' : '<span class="plpick__e">+</span><span><b>Chạm để chọn hình</b><small>Hình đi cùng kế hoạch trong Sổ tay và phiếu</small></span>') + '</button>';
    return h;
  };
  CHECK.voy = function (s) { var id = g(s.v + '.isl'); if (!id) return 'Chọn một hướng'; if (id === 'o' && trim(g(s.v + '.islo')).length < 3) return 'Viết tên hướng đi'; if (trim(g(s.v + '.name')).length < 3) return 'Đặt tên cho kế hoạch'; return planK(s.v) ? '' : 'Chọn hình cho kế hoạch'; };
  function needOf(v) { var M = g(v + '.nh'); return (M && typeof M === 'object') ? M : {}; }
  function needSum() { var is = voyIsle('b41'), M = needOf('b41'), o = { co: [], thieu: [] }; if (is && is.need) is.need.forEach(function (t, i) { if (M[i] === 'co') o.co.push(t); if (M[i] === 'thieu') o.thieu.push(t); }); return o; }
  STEP.need = function (s) { /* PS1.3.45 (thầy góp ý 3): thuận lợi và thách thức của chính bạn với kế hoạch A */
    var v = s.v, is = voyIsle(v), M = needOf(v), h = '';
    if (is && is.need) {
      h += qh('Hướng “' + is.n + '” cần những điều này. Bạn đã có chưa?', 'Đã có là thuận lợi, còn thiếu là thách thức.') + '<div class="needs">' + is.need.map(function (t, i) {
        return '<div class="wind' + (M[i] ? ' set' : '') + '"><b>' + esc(t) + '</b><div class="seg2"><button type="button" class="' + (M[i] === 'co' ? 'on' : '') + '" data-act="need" data-k="' + v + '" data-id="' + i + '" data-v="co">Mình đã có</button><button type="button" class="' + (M[i] === 'thieu' ? 'on' : '') + '" data-act="need" data-k="' + v + '" data-id="' + i + '" data-v="thieu">Còn thiếu</button></div></div>'; }).join('') + '</div>';
      h += '<p class="ps-small">Điều còn thiếu sẽ chuyển sang Kế hoạch 3 năm ở Phòng Tuyển Dụng.</p>';
    }
    return h + qh('Thêm một dòng: điều gì ở bạn giúp, hoặc làm khó, kế hoạch A?') + areaHTML(v + '.nd', 'Ví dụ: mình khéo tay, nhưng ngại nói tiếng Nhật.', 2, 160);
  };
  CHECK.need = function (s) { var is = voyIsle(s.v), M = needOf(s.v), n = 0; if (is && is.need) { is.need.forEach(function (t, i) { if (M[i]) n++; }); if (n < is.need.length) return 'Chạm đủ ' + is.need.length + ' điều (' + n + '/' + is.need.length + ')'; } return trim(g(s.v + '.nd')).length >= 5 ? '' : 'Viết thêm một dòng'; };
  STEP.tline = function (s) {
    var v = s.v, x = voyOf(v), is = voyIsle(v), a = age(), base = a ? a + 4 : 0, h = '';
    h += qh(s.short ? 'Kế hoạch ' + x[1] + ': 5 năm sau, bạn đang làm gì?' : 'Kế hoạch ' + x[1] + ': 5 năm sau khi xong 3 năm ở Nhật', v === 'b41' ? 'Viết 3 mốc, mỗi mốc một dòng ngắn.' : '');
    h += '<div class="tl5"><div class="tl5__s">' + cdIc('anchor', 18) + '<span><b>Xong 3 năm ở Nhật</b>' + (base ? '<small>khoảng ' + base + ' tuổi</small>' : '') + '</span></div>' +
      (s.short ? ['5'] : ['1', '3', '5']).map(function (y) {
        return '<label class="tl5__r"><span class="tl5__y">Năm ' + y + (base ? '<small>~' + (base + (+y)) + ' tuổi</small>' : '') + '</span><input class="inp ps-sel" data-k="' + v + '.m' + y + '" maxlength="60" value="' + esc(g(v + '.m' + y) || '') + '" placeholder="Mốc năm ' + y + '"></label>';
      }).join('') + '<div class="tl5__e">' + cdIc('flag', 18) + '<b>' + esc(is ? is.n : '') + '</b></div></div>';
    var tips = W.CD2_TIPS_ON ? (MS_TIPS[is ? is.id : 'o'] || MS_TIPS.o) : [];
    if (tips.length) h += '<div class="tips"><small>Chạm gợi ý để điền vào mốc còn trống, rồi sửa theo ý bạn</small>' + tips.map(function (t) { return '<button type="button" class="tip" data-act="msTip" data-k="' + v + '" data-v="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>';
    var jl = g(v + '.jl') || '';
    h += qh('Kế hoạch này cần tiếng Nhật tới đâu?') + '<div class="chips">' + JL_OPTS.map(function (o) { return '<button type="button" class="chip' + (jl === o[0] ? ' on' : '') + '" data-act="pick" data-k="' + v + '.jl" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>';
    return h;
  };
  CHECK.tline = function (s) { if (s.short) { if (trim(g(s.v + '.m5')).length < 3) return 'Viết mốc năm 5'; return g(s.v + '.jl') ? '' : 'Chọn mức tiếng Nhật'; } var n = 0; ['1', '3', '5'].forEach(function (y) { if (trim(g(s.v + '.m' + y)).length >= 3) n++; }); if (n < 2) return 'Viết ít nhất 2 mốc (' + n + '/2)'; return g(s.v + '.jl') ? '' : 'Chọn mức tiếng Nhật'; };
  function metersHTML(v, first) {
    var G = gOf(v);
    return '<div class="meters">' + METERS.map(function (m) { /* PS1.3.41: câu giải thích chỉ hiện ở kế hoạch A */
      var n = +G[m[0]] || 0;
      return '<div class="meter"><div class="meter__g">' + gaugeSVG(n) + '<b>' + (n || '–') + '</b></div><div class="meter__b"><b>' + esc(m[1]) + '</b>' + (first ? '<small>' + esc(m[2]) + '</small>' : '') +
        (first && m[0] === 'fit' && g('b31.v') ? '<small class="meter__hint">La bàn của bạn nghiêng về “' + esc(lean()) + '”</small>' : '') +
        '<div class="meter__n">' + [1, 2, 3, 4, 5].map(function (k) { return '<button type="button" class="mn' + k + (n === k ? ' on' : '') + '" data-act="meter" data-k="' + v + '" data-id="' + m[0] + '" data-v="' + k + '" aria-label="' + esc(m[1]) + ' ' + k + '">' + k + '</button>'; }).join('') + '</div></div></div>';
    }).join('') + '</div>';
  }
  STEP.meters = function (s) { /* PS1.3.42: vs = chấm nhiều kế hoạch trên một màn (B và C), trio = đặt 3 kế hoạch cạnh nhau */
    var L = s.vs || [s.v], h = L.map(function (v) { var first = v === 'b41'; return qh('Tự chấm kế hoạch ' + voyOf(v)[1], first ? 'Chạm từ 1 đến 5, theo cảm nhận.' : '') + metersHTML(v, first); }).join('');
    if (s.trio) { var ok = VOY.every(function (x) { var G = gOf(x[0]), n = 0; METERS.forEach(function (m) { if (G[m[0]]) n++; }); return n >= METERS.length; });
      return h + (ok ? STEP.trio() : ''); }
    return h + voyCard(s.v);
  };
  CHECK.meters = function (s) { var L = s.vs || [s.v], miss = ''; L.forEach(function (v) { if (miss) return; var G = gOf(v), n = 0; METERS.forEach(function (m) { if (G[m[0]]) n++; }); if (n < METERS.length) miss = 'Chấm đủ ' + METERS.length + ' đồng hồ kế hoạch ' + voyOf(v)[1] + ' (' + n + '/' + METERS.length + ')'; }); return miss; };
  STEP.trio = function () {
    return shinSays('wow', '<p>Đây là 3 kế hoạch của <b class="nm">' + esc(given()) + '</b>. Bạn có nhiều đường hơn bạn nghĩ!</p>' +
      '<div class="trio3">' + VOY.map(function (x) { var k = planK(x[0]); return '<span>' + (k ? planArt(k, 44) : '<i class="trio3__e"></i>') + '<b>' + x[1] + '</b></span>'; }).join('') + '</div>', 60) + /* PS1.3.57 (góp ý 7) */
      '<div class="trio">' + VOY.map(function (x) { return voyCard(x[0]); }).join('') + '</div><p class="ps-small">Vuốt ngang để xem cả 3. Chưa cần chọn.</p>';
  };

  /* ----- Bến 5 · Vịnh Ngã Rẽ ----- */
  STEP.weigh = function () {
    var W2 = wOf(), best = '', bs = -1, tie = false;
    VOY.forEach(function (x) { var sc = voyScore(x[0]); if (sc > bs) { bs = sc; best = x[0]; tie = false; } else if (sc === bs) tie = true; });
    var h = qh('Với bạn, điều nào nặng, điều nào nhẹ?') + '<div class="wts">' + METERS.map(function (m) {
      var w = String(W2[m[0]] || 2);
      return '<div class="wt"><b>' + esc(m[1]) + '</b><div class="seg3">' + WEIGHT.map(function (o) { return '<button type="button" class="' + (w === o[0] ? 'on' : '') + '" data-act="wt" data-id="' + m[0] + '" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div></div>';
    }).join('') + '</div>';
    h += '<h3 class="qs">Kết quả cân</h3><div class="scale">' + VOY.map(function (x) {
      var sc = voyScore(x[0]), is = voyIsle(x[0]);
      return '<div class="scale__r' + (x[0] === best && !tie ? ' top' : '') + '"><span class="voyc__l">' + x[1] + '</span>' + (planK(x[0]) ? '<span class="scale__ic">' + planArt(planK(x[0]), 34) + '</span>' : '') + '<div><b>' + esc(trim(g(x[0] + '.name')) || (is ? is.n : '')) + '</b><i><em style="width:' + sc + '%"></em></i></div><strong>' + sc + '</strong></div>';
    }).join('') + '</div>';
    h += shinSays('think', '<p>' + (tie ? 'Có kế hoạch đang bằng điểm nhau. Thử đổi nặng nhẹ xem sao.' : 'Theo cân của bạn, <b>kế hoạch ' + voyOf(best)[1] + '</b> đang nặng ký nhất.') + '</p>', 52);
    return h;
  };
  STEP.leanpick = function () {
    var v = g('b51.lean') || '', f = g('b51.feel') || '';
    var h = qh('Lúc này, bạn nghiêng về kế hoạch nào?') + '<div class="opts">' + VOY.map(function (x) { var is = voyIsle(x[0]); return opt('b51.lean', x[0], voyTitle(x[0]) + (is ? ' (' + is.n + ')' : ''), v === x[0]); }).join('') +
      opt('b51.lean', 'u', 'Mình chưa nghiêng về kế hoạch nào', v === 'u') + '</div>';
    h += qh('Kết quả cân có giống cảm giác của bạn không?') + '<div class="seg3">' + FEEL3.map(function (o) { return '<button type="button" class="' + (f === o[0] ? 'on' : '') + '" data-act="pick" data-k="b51.feel" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>';
    if (f === 'diff') h += '<p class="qsub fb">Khác cũng tốt. Có thể bạn coi trọng điều mà bàn cân chưa có.</p>';
    if (f === 'unsure') h += '<p class="qsub fb">Phân vân là bình thường.</p>';
    return h;
  };
  CHECK.leanpick = function () { if (!g('b51.lean')) return 'Chọn kế hoạch bạn nghiêng'; return g('b51.feel') ? '' : 'Chọn giống hay khác'; };
  function blk() { var id = g('b52.b'); for (var i = 0; i < BLOCKS.length; i++) if (BLOCKS[i].id === id) return BLOCKS[i]; return null; }
  function stormHTML(b) { return '<div class="storm"><span>' + cdIc(b.ic, 22) + '</span><div><small>Dựa trên chuyện đã từng xảy ra</small><b>' + esc(b.t) + '</b><p>' + esc(b.ctx) + '</p></div></div>'; }
  STEP.block = function () {
    var v = g('b52.b') || '';
    return shinSays('worry', '<p>Các anh chị đi trước cũng từng bị chặn đường. Chọn một tình huống để tập gỡ nhé.</p>', 64) +
      '<div class="blocks">' + BLOCKS.map(function (b) { return '<button type="button" class="blk' + (v === b.id ? ' on' : '') + '" data-act="blk" data-v="' + b.id + '"><span>' + cdIc(b.ic, 22) + '</span><b>' + esc(b.t) + '</b></button>'; }).join('') + '</div>' +
      (blk() ? stormHTML(blk()) : '');
  };
  CHECK.block = function () { return g('b52.b') ? '' : 'Chọn một tình huống'; };
  function chipRow(key, list, useIdx) { var v = g(key); return '<div class="chips">' + list.map(function (t, i) { var val = useIdx ? String(i) : t; return '<button type="button" class="chip' + (String(v) === val ? ' on' : '') + '" data-act="pick" data-k="' + key + '" data-v="' + esc(val) + '">' + esc(t) + '</button>'; }).join('') + '</div>'; }
  STEP.why3 = function () {
    var b = blk(); if (!b) return '';
    var h = stormHTML(b) + '<div class="why3"><div class="why3__r"><span>1</span><div>' + qh('Vì sao chuyện này xảy ra?') + chipRow('b52.w1', b.w1) + '</div></div>';
    if (g('b52.w1')) h += '<div class="why3__r"><span>2</span><div>' + qh('Vì sao lại như vậy?') + chipRow('b52.w2', b.w2) + '</div></div>';
    if (g('b52.w2')) h += '<div class="why3__r"><span>3</span><div>' + qh('Gốc rễ nằm ở đâu?') + chipRow('b52.w3', WHY3, 1) + '</div></div>';
    h += '</div>';
    if (g('b52.w3') != null && g('b52.w3') !== '') h += shinSays(+g('b52.w3') === 3 ? 'comfort' : 'cheer', +g('b52.w3') === 3 ? '<p>Hoàn cảnh khó đổi. Nhưng cách mình chuẩn bị thì đổi được.</p>' : '<p>Gốc rễ ở chỗ mình chạm tới được. Vậy là có cách gỡ!</p>', 52);
    return h;
  };
  CHECK.why3 = function () { if (!g('b52.w1')) return 'Trả lời tầng 1'; if (!g('b52.w2')) return 'Trả lời tầng 2'; return g('b52.w3') != null && g('b52.w3') !== '' ? '' : 'Trả lời tầng 3'; };
  function waysSel() { var L = (g('b52.ws') || []).slice(), o = trim(g('b52.own')); if (o.length >= 4) L.push(o); return L; }
  STEP.ways = function () {
    var b = blk(); if (!b) return '';
    var sel = g('b52.ws') || [], all = waysSel(), f = g('b52.first') || '';
    var h = qh('Nghĩ nhiều cách gỡ', 'Chọn 2 đến 3 cách. Có cách riêng thì viết thêm.') + '<div class="opts">' + b.ways.map(function (t) { return opt('b52.ws', t, t, sel.indexOf(t) > -1, 'way'); }).join('') + '</div>' +
      '<input class="inp ps-sel inp--gap" data-k="b52.own" maxlength="80" value="' + esc(g('b52.own') || '') + '" placeholder="Cách của riêng bạn (không bắt buộc)">';
    if (all.length >= 2) h += qh('Bước nhỏ đầu tiên bạn sẽ làm') + '<div class="chips">' + all.map(function (t) { return '<button type="button" class="chip' + (f === t ? ' on' : '') + '" data-act="pick" data-k="b52.first" data-v="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>';
    return h;
  };
  CHECK.ways = function () { var n = waysSel().length; if (n < 2) return 'Chọn ít nhất 2 cách (' + n + '/2)'; var f = g('b52.first'); return f && waysSel().indexOf(f) > -1 ? '' : 'Chọn bước nhỏ đầu tiên'; };
  STEP.real = function () {
    var b = blk(); if (!b) return '';
    var h = shinSays('cheer', '<p>Đây là điều các anh chị đã làm khi gặp chuyện giống vậy.</p>', 56) + '<div class="reals">' + b.sp.map(function (id) {
      var sp = spOf(id); collect(id, true);
      return '<div class="real"><div class="flip__front">' + spAv(sp) + '<div><b>' + esc(sp.n) + '</b><small>' + esc([sp.job, sp.jl].filter(Boolean).join(' · ')) + '</small></div></div>' +
        '<ol class="frames"><li><small>Bước ngoặt</small>' + esc(sp.bn) + '</li><li><small>Hôm nay</small>' + esc(sp.nay) + '</li></ol>' + (sp.q ? '<q class="flip__qt">' + esc(sp.q) + '</q>' : '') +
        '<button type="button" class="link" data-act="sp" data-id="' + id + '">Đọc trọn chuyện</button></div>';
    }).join('') + '</div>';
    h += '<div class="aha aha--soft"><span>' + cdIc('compass', 24) + '</span><div><b>Bước nhỏ của bạn</b><p>' + esc(g('b52.first') || '') + '</p></div></div><p class="ps-small">Anh chị cũng gỡ từng bước nhỏ, như bạn.</p>';
    h += clipBlock('b52', 'Nghe anh chị kể lúc bị chặn đường') + clipOther('b52');
    if (b.rt) h += rtSugHTML(b.rt, 'Rèn bước nhỏ cùng Shin', 'Công thức gợi ý: ' + esc(b.rtf), 2);
    return h;
  };
  function trialTxt() { var t = g('b53.try'); if (t === 'o') return trim(g('b53.tryo')); return t || ''; }
  function trialOpts() { var is = leanIsle(), L = []; if (is && TRY_ISLE[is.id]) L.push(TRY_ISLE[is.id].replace('[Nghề]', jobName())); return L.concat(TRIALS); }
  STEP.trial = function () {
    var t = g('b53.try') || '', is = leanIsle();
    var h = shinSays('curious', '<p>Năm 1 bắt đầu từ bây giờ. Chọn một việc nhỏ để thử trong 2 tuần ở JPC.</p>', 52) + qh('Việc nhỏ bạn thử trong 2 tuần', is ? 'Cho kế hoạch bạn nghiêng: ' + leanName() + ' · ' + is.n : '') + '<div class="opts">' + trialOpts().map(function (x) { return opt('b53.try', x, x, t === x); }).join('') + opt('b53.try', 'o', 'Việc khác, mình tự viết', t === 'o') + '</div>';
    if (t === 'o') h += '<input class="inp ps-sel inp--gap" data-k="b53.tryo" maxlength="80" value="' + esc(g('b53.tryo') || '') + '" placeholder="Ví dụ: mỗi tối xem 1 video về nghề phiên dịch">';
    h += qh('Bắt đầu khi nào?') + '<div class="seg3">' + WHEN3.map(function (o) { return '<button type="button" class="' + (g('b53.when') === o[0] ? 'on' : '') + '" data-act="pick" data-k="b53.when" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>';
    h += qh('Làm cùng ai?') + '<div class="chips">' + WITH3.map(function (o) { return '<button type="button" class="chip' + (g('b53.with') === o[0] ? ' on' : '') + '" data-act="pick" data-k="b53.with" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>';
    if (trialTxt() && g('b53.when')) h += '<h3 class="qs">Thẻ thử nhỏ của bạn</h3>' + trialCard(1) + rtSugHTML([rtTrialId()], 'Mang sang Shin routine', 'Đặt thành thẻ để Shin nhắc bạn mỗi ngày. 14 ngày ghi nhận là xong thử nhỏ.', 1);
    return h;
  };
  CHECK.trial = function () { var t = g('b53.try'); if (!t) return 'Chọn một việc nhỏ'; if (t === 'o' && trim(g('b53.tryo')).length < 4) return 'Viết việc bạn muốn thử'; if (!g('b53.when')) return 'Chọn ngày bắt đầu'; return g('b53.with') ? '' : 'Chọn làm cùng ai'; };
  function dayKey(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function trialStart() {
    var st = g('b53.start'); if (st) return st;
    var d = new Date(), w = g('b53.when');
    if (w === '1') d.setDate(d.getDate() + 1); else if (w === '7') { var add = (8 - d.getDay()) % 7 || 7; d.setDate(d.getDate() + add); }
    return dayKey(d);
  }
  function trialCard(preview) {
    var t = trialTxt(); if (!t) return '';
    var st = trialStart(), p = st.split('-'), d0 = new Date(+p[0], +p[1] - 1, +p[2]), tk = g('b53.tk') || {}, today = dayKey(new Date()), n = 0, canTick = false, dots = '';
    for (var i = 0; i < 14; i++) { var d = new Date(d0.getTime()); d.setDate(d0.getDate() + i); var k = dayKey(d), on = !!tk[k]; if (on) n++; if (k === today) canTick = true; dots += '<i class="' + (on ? 'on' : '') + (k === today ? ' now' : '') + '" title="' + k + '"></i>'; }
    var wl = ''; WITH3.forEach(function (o) { if (o[0] === g('b53.with')) wl = o[1]; });
    var rid = rtTrialId(), rst = rtState(rid), rdn = rtDays(rid), rln = (rst === 'active' || rst === 'keep' || rst === 'master') ? '<p class="trialc__rt">' + PS.icon('check', 13, 3) + 'Shin routine: ' + esc(PS.routineLib()[rid] || '') + (rdn != null ? ' · ' + rdn + '/14 ngày ghi nhận' : '') + '</p>' : '';
    return '<div class="trialc"><div class="trialc__h">' + cdIc('compass', 18) + '<b>Thử nhỏ 2 tuần</b><span>' + n + '/14</span></div><p>' + esc(t) + '</p><small>Bắt đầu ' + esc(p[2] + '/' + p[1]) + (wl ? ' · ' + esc(wl) : '') + '</small><div class="trialc__d">' + dots + '</div>' + (preview ? '' : rln) +
      (preview ? '' : (canTick ? (tk[today] ? '<p class="trialc__ok">' + PS.icon('check', 15, 3) + 'Hôm nay đã làm. Giỏi lắm!</p>' : '<button type="button" class="btn btn--soft btn--sm" data-act="trTick">Hôm nay mình đã làm</button>') : '')) + '</div>';
  }

  /* ----- Bến 6 · Phòng Tuyển Dụng (PS1.3.42; từ PS1.3.46: tin dạng tờ báo theo nhóm ngành, phỏng vấn theo tin, dòng thời gian dọc) ----- */
  function curIsle() { var is = leanIsle(); return is && is.id !== 'o' ? is.id : (g('b13.isl') || ''); }
  function adKindDef() { var i = curIsle(); if (i === 'lap') return 'plan'; if (i === 'len' || i === 're' || i === 'gio') return 'jp'; return 'vn'; }
  function adKind() { return g('b61.kind') || adKindDef(); }
  function adOf(id) { var L = ADS.concat(PLANS); for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i]; return null; }
  function isPlan(a) { return !!a && !!a.L; }
  function grpOfJob(jk) { for (var i = 0; i < AD_GRP.length; i++) if (AD_GRP[i][2].indexOf(jk) > -1) return AD_GRP[i][0]; return ''; }
  function adGrpDef() { return grpOfJob(jobKey()) || 'sx'; }
  function adGrp() { return g('b61.grp') || adGrpDef(); }
  function grpName(id) { for (var i = 0; i < AD_GRP.length; i++) if (AD_GRP[i][0] === id) return AD_GRP[i][1]; return ''; }
  function rgName(id) { for (var i = 0; i < AD_RG.length; i++) if (AD_RG[i][0] === id) return AD_RG[i][1]; return ''; }
  function planFit(a) { var jk = jobKey(); return jk && a.g.indexOf(jk) > -1 ? 2 : 0; }
  function adList(k) {
    if (k === 'plan') { var P = PLANS.map(function (a, i) { return [a, i]; }); P.sort(function (x, y) { return (planFit(y[0]) - planFit(x[0])) || (x[1] - y[1]); }); return P.map(function (x) { return x[0]; }); }
    var gr = adGrp(), L = [], G = [];
    ADS.forEach(function (a) { if (a.k !== k) return; if (a.gr === gr) L.push(a); else if (a.gr === 'all') G.push(a); });
    return L.slice(0, 2).concat(G.slice(0, 1));
  }
  function curAd() { var a = adOf(g('b61.ad')); if (!a) return null; if (adKind() === 'plan' ? !isPlan(a) : (isPlan(a) || a.k !== adKind())) return null; return a; }
  function adTk() { var c = g('b61.t'); return (c && typeof c === 'object') ? c : {}; }
  function adOp() { var c = g('b61.op'); return (c && typeof c === 'object') ? c : {}; }
  function opN(a) { var O = adOp(), n = 0; a.req.forEach(function (r, i) { if (O[i]) n++; }); return n; }
  STEP.adpick = function () {
    var k = adKind(), cur = g('b61.ad'), def = adKindDef();
    var h = qh('Bạn muốn đọc loại nào?') + '<div class="seg3 seg3--ic">' + AD_KIND.map(function (x) { return '<button type="button" class="' + (k === x[0] ? 'on' : '') + '" data-act="adKind" data-v="' + x[0] + '">' + cdIc(x[2], 16) + esc(x[1]) + '</button>'; }).join('') + '</div>' +
      (leanIsle() || g('b13.isl') ? '<p class="qsub">Shin chọn sẵn theo hướng bạn nghiêng: <b>' + esc(AD_KIND.filter(function (x) { return x[0] === def; })[0][1]) + '</b>. Đổi thoải mái.</p>' : '');
    if (k !== 'plan') {
      var gr = adGrp(), gd = adGrpDef();
      h += qh('Nhóm ngành', jobKey() ? 'Shin chọn theo nghề của bạn. Muốn xem ngành khác thì chạm đổi.' : '') + '<div class="chips chips--grp">' + AD_GRP.map(function (x) { return '<button type="button" class="chip' + (gr === x[0] ? ' on' : '') + '" data-act="adGrp" data-v="' + x[0] + '">' + esc(x[1]) + (jobKey() && x[0] === gd ? ' ·  nghề bạn' : '') + '</button>'; }).join('') + '</div>' +
        (k === 'jp' && AD_NOTE[gr] ? '<p class="adnote">' + PS.icon('bulb', 15) + esc(AD_NOTE[gr]) + '</p>' : '');
    }
    h += qh(k === 'plan' ? 'Chọn một kế hoạch để đọc' : 'Chọn 1 trong 3 tin') + '<div class="adlist">' + adList(k).map(function (a) {
      var on = cur === a.id;
      if (isPlan(a)) return '<button type="button" class="adi' + (on ? ' on' : '') + '" data-act="adPick" data-v="' + a.id + '"><span class="adi__ic">' + cdIc('shop', 20) + '</span><span><b>' + esc(a.n) + '</b><small>' + esc(a.who) + '</small>' + (planFit(a) ? '<em>Gần nghề của bạn</em>' : '') + '</span>' + (on ? '<span class="adi__ok">' + PS.icon('check', 14, 3) + '</span>' : '') + '</button>';
      return '<button type="button" class="adi adi--np' + (on ? ' on' : '') + '" data-act="adPick" data-v="' + a.id + '"><span class="adi__ic">' + cdIc('doc', 20) + '</span><span><b>' + esc(a.vt) + '</b><small>' + esc(a.co) + ' · ' + esc(a.at) + '</small><span class="adi__lu">' + esc(a.lu) + '</span>' +
        (a.gr === 'all' ? '<em class="adi__all">Mọi ngành</em>' : '') + '</span>' + (on ? '<span class="adi__ok">' + PS.icon('check', 14, 3) + '</span>' : '') + '</button>';
    }).join('') + '</div>';
    return h;
  };
  CHECK.adpick = function () { return curAd() ? '' : 'Chọn một tin để đọc'; };
  function planMark() { var c = g('b61.pm'); return (c && typeof c === 'object') ? c : {}; }
  function newsHTML(a, live) {
    var T = adTk(), O = adOp();
    return '<div class="np"><div class="np__mast"><span lang="ja">求人</span><b>Tin tuyển dụng</b><small>3 năm sau · tin giả định</small></div>' +
      '<div class="np__co">' + esc(a.co) + ' <em>(tên giả định)</em></div><h3 class="np__vt">' + esc(a.vt) + '</h3>' +
      '<dl class="np__tb"><div><dt>Ngành</dt><dd>' + esc(a.ng) + '</dd></div><div><dt>Nơi làm</dt><dd>' + esc(a.at) + '</dd></div><div><dt>Lương</dt><dd><b>' + esc(a.lu) + '</b> <small>tham khảo</small></dd></div></dl>' +
      '<p class="np__job">' + esc(a.job) + '</p><div class="np__rqh">Yêu cầu</div>' +
      (live ? '<p class="np__hint">Tick điều <b>3 năm sau bạn sẽ có</b>. Chạm “Vì sao?” để xem nhà tuyển dụng nghĩ gì.</p>' : '') +
      '<ul class="np__rq">' + a.req.map(function (r, i) {
        var on = !!T[i], op = !!O[i];
        return '<li class="rq' + (on ? ' on' : '') + (op ? ' op' : '') + '">' +
          (live ? '<button type="button" class="rq__tk" data-act="adTick" data-id="' + i + '" aria-pressed="' + (on ? 'true' : 'false') + '" aria-label="Sau 3 năm mình sẽ có">' + (on ? PS.icon('check', 14, 3.2) : '') + '</button>' : '<span class="rq__tk">' + (on ? PS.icon('check', 14, 3.2) : '') + '</span>') +
          '<div class="rq__b"><small>' + esc(rgName(r[0])) + '</small><span>' + esc(r[1]) + '</span>' +
          (live ? '<button type="button" class="rq__why" data-act="adWhy" data-id="' + i + '">' + (op ? 'Thu lại' : 'Vì sao?') + '</button>' : '') +
          (op && live ? '<p class="rq__wy">' + PS.icon('bulb', 14) + esc(r[2]) + '</p>' : '') + '</div></li>';
      }).join('') + '</ul><p class="np__src">' + esc(AD_SRC) + (a.k === 'jp' ? ' ' + esc(AD_SRC_JP) : '') + '</p></div>';
  }
  STEP.adread = function () {
    var a = curAd(); if (!a) return '';
    if (isPlan(a)) return planHTML(a);
    var h = newsHTML(a, true), n = opN(a);
    if (n >= 3) {
      var T = adTk(), cy = 0; a.req.forEach(function (r, i) { if (T[i]) cy++; });
      h += shinSays(cy >= a.req.length ? 'cheer' : 'think', '<p>Bạn tick <b>' + cy + '/' + a.req.length + '</b>. ' + (cy < a.req.length ? 'Cả 5 điều sẽ có mặt trên dòng thời gian ở chặng <b>Kế hoạch 3 năm</b>, để bạn biết làm gì trước.' : 'Giỏi lắm! Chặng sau, bạn xếp xem mỗi điều sẽ có vào năm nào.') + '</p>', 56);
    }
    return h;
  };
  function planHTML(a) {
    var M = planMark(), n = 0, P = g('b61.prep') || [];
    PLAN_ROW.forEach(function (r) { if (M[r[0]]) n++; });
    var h = '<div class="ad ad--plan"><div class="ad__h"><small>Kế hoạch 1 trang · nhân vật của khóa</small><b>' + esc(a.n) + '</b><span>' + esc(a.who) + '</span></div>' +
      '<p class="ad__hint">Mỗi dòng rõ, mơ hồ hay còn thiếu?</p><div class="pl">' + PLAN_ROW.map(function (r) {
        var v = M[r[0]] || '';
        return '<div class="pl__r' + (v ? ' set' : '') + '"><small>' + esc(r[1]) + '</small><p>' + esc(a.L[r[0]]) + '</p><div class="seg3">' + PLAN_MARK.map(function (o) { return '<button type="button" class="' + (v === o[0] ? 'on' : '') + '" data-act="pmark" data-id="' + r[0] + '" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div></div>';
      }).join('') + '</div><p class="ad__src">Số tiền không ghi, vì mỗi nơi mỗi khác.</p></div>';
    if (n >= PLAN_ROW.length) {
      var iv = g('b61.inv') || '';
      h += qh('Nếu là người góp vốn, bạn có góp không?') + '<div class="seg3">' + PLAN_INV.map(function (o) { return '<button type="button" class="' + (iv === o[0] ? 'on' : '') + '" data-act="pick" data-k="b61.inv" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>';
      if (iv) h += qh('Nếu đi hướng này, 3 năm ở Nhật bạn cần chuẩn bị gì?', 'Chọn 1 đến 3 điều') + '<div class="chips">' + PLAN_PREP.map(function (t) { return '<button type="button" class="chip' + (P.indexOf(t) > -1 ? ' on' : '') + '" data-act="prep" data-v="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>' +
        '<h3 class="qs">Anh chị thật đã bắt đầu thế nào</h3><div class="alt">' + PLAN_SP.map(function (x) { return '<button type="button" class="altc" data-act="sp" data-id="' + x[0] + '"><b>' + esc(spOf(x[0]).a) + '</b><span>' + esc(x[1]) + '</span></button>'; }).join('') + '</div>';
    }
    return h;
  }
  CHECK.adread = function () {
    var a = curAd(); if (!a) return 'Quay lại chọn một tin';
    if (isPlan(a)) { var M = planMark(), n = 0; PLAN_ROW.forEach(function (r) { if (M[r[0]]) n++; }); if (n < PLAN_ROW.length) return 'Chấm đủ 5 dòng (' + n + '/5)'; if (!g('b61.inv')) return 'Chọn có góp vốn không'; return (g('b61.prep') || []).length ? '' : 'Chọn điều cần chuẩn bị'; }
    var k = opN(a); return k >= 3 ? '' : 'Mở ít nhất 3 lý do “Vì sao?” (' + k + '/3)';
  };
  /* phỏng vấn 3 năm sau: bám tin đã chọn (1 câu chung + 2 câu theo yêu cầu); kế hoạch kinh doanh hoặc chưa chọn tin thì chọn như bản 2 */
  function adNews() { var a = curAd(); return a && !isPlan(a) ? a : null; }
  function ivById(id) { for (var j = 0; j < IV_WHO.length; j++) if (IV_WHO[j].id === id) return IV_WHO[j]; return null; }
  function ivWhoDef() { var a = curAd(); if (a && isPlan(a)) return ivById('kh'); var i = curIsle(); for (var j = 0; j < IV_WHO.length; j++) if (IV_WHO[j].isl.indexOf(i) > -1) return IV_WHO[j]; return IV_WHO[2]; }
  function ivWho() { var a = adNews(); if (a) return ivById(a.iv) || IV_WHO[2]; return ivById(g('b62.who')) || ivWhoDef(); }
  function rqDef(a) { var T = adTk(), o = []; a.req.forEach(function (r, i) { if (!T[i]) o.push(i); }); a.req.forEach(function (r, i) { if (T[i]) o.push(i); }); return o.slice(0, 2); }
  function ivRq(a) { var q = g('b62.rq'); return q && q.length === 2 && q[0] < a.req.length && q[1] < a.req.length ? q : rqDef(a); }
  function ivQs() {
    var a = adNews(); if (a) return ['whyjob'].concat(ivRq(a).map(function (i) { return a.id + '_' + i; }));
    var q = g('b62.q'); return q && q.length === 3 && !/_/.test(q.join('')) ? q : ivWho().q.slice();
  }
  function qOf(id) {
    var m = /^([a-z0-9]+)_(\d)$/.exec(id || '');
    if (m) { var a = adOf(m[1]), r = a && a.req ? a.req[+m[2]] : null; if (r) { var T = IV_RQ[r[0]]; return { id: id, jp: T.jp, vi: T.vi.replace('{r}', r[1]), ev: r[1], more: T.more, rq: 1 }; } }
    for (var i = 0; i < IV_Q.length; i++) if (IV_Q[i].id === id) return IV_Q[i]; return IV_Q[0];
  }
  STEP.ivset = function () {
    var w = ivWho(), a = adNews();
    var h = shinSays('wink', '<p>Giờ là 3 năm sau. ' + (a ? 'Bạn đi phỏng vấn đúng công việc vừa chọn.' : 'Bạn đi phỏng vấn nhé.') + ' Không có đúng sai, cứ trả lời như bạn của 3 năm sau.</p>', 60) +
      (c1Val('iv') ? '<p class="qsub">Đó là câu bạn trả lời để sang Nhật. Giờ bạn đã có 3 năm kinh nghiệm.</p>' : '');
    if (a) {
      var R = ivRq(a);
      h += '<div class="ivjob">' + ivAv(w.id, 46) + '<div><small>Người phỏng vấn</small><b>' + esc(w.n) + '</b><span>Tuyển: ' + esc(a.vt) + ' · ' + esc(a.co) + '</span></div></div>' +
        qh('Câu 1 · câu chung') + '<p class="ivq1">' + esc(qOf('whyjob').vi) + '</p>' +
        qh('Câu 2 và 3 · chọn 2 yêu cầu bạn muốn được hỏi', 'Shin chọn sẵn điều bạn chưa tick. Chạm để đổi.') +
        '<div class="opts">' + a.req.map(function (r, i) { var on = R.indexOf(i) > -1; return '<button type="button" class="opt' + (on ? ' on' : '') + '" data-act="ivRq" data-v="' + i + '"><span class="dot">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span><span><small class="opt__sub">' + esc(rgName(r[0])) + (adTk()[i] ? ' · bạn đã tick' : '') + '</small>' + esc(r[1]) + '</span></button>'; }).join('') + '</div>';
      return h;
    }
    if (!curAd()) h += '<p class="adnote">' + PS.icon('bulb', 15) + 'Làm chặng “Đọc tin tuyển dụng” trước thì câu hỏi sẽ bám đúng công việc bạn chọn.</p>';
    var qs = ivQs(), def = ivWhoDef();
    h += qh('Ai phỏng vấn bạn?') + '<div class="opts">' + IV_WHO.map(function (x) {
      return '<button type="button" class="opt opt--iv' + (w.id === x.id ? ' on' : '') + '" data-act="ivWho" data-v="' + x.id + '"><span class="dot">' + (w.id === x.id ? PS.icon('check', 13, 3.2) : '') + '</span>' + ivAv(x.id, 46) + '<span><b>' + esc(x.n) + '</b>' + (x.id === def.id ? ' <em class="opt__tag">Hợp hướng bạn nghiêng</em>' : '') + '<small class="opt__sub">' + esc(x.ctx) + '</small></span></button>';
    }).join('') + '</div>';
    h += qh('3 câu bạn sẽ được hỏi', 'Shin chọn sẵn, chạm để đổi') + '<div class="chips chips--ask">' + IV_Q.filter(function (q) { return q.id !== 'whyjob'; }).map(function (q) { var on = qs.indexOf(q.id) > -1; return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-act="ivQ" data-v="' + q.id + '">' + esc(q.vi) + '</button>'; }).join('') + '</div>';
    return h;
  };
  CHECK.ivset = function () { var a = adNews(); if (a) { var q = g('b62.rq'); var n = q && q.length != null ? q.length : 2; return n === 2 ? '' : 'Chọn đủ 2 yêu cầu (' + n + '/2)'; } var n2 = ivQs().length; return n2 === 3 ? '' : 'Chọn đủ 3 câu (' + n2 + '/3)'; };
  STEP.iva = function (s) {
    var q = qOf(ivQs()[s.n]), w = ivWho(), K = 'b62.' + q.id, ev = g(K + '.ev') || '', sy = g(K + '.say') || '';
    var ph = s.n === 0 ? (q.id === 'whyjob' ? 'Ví dụ: 3 năm làm QC, mình thích tìm ra lỗi' : 'Ví dụ: mình đề xuất xếp lại chỗ để dụng cụ') : '';
    var h = '<div class="ivq"><div class="ivq__room">' + ivRoom(w.id) + '</div><div class="ivq__h">' + ivAv(w.id, 38) + '<b>' + esc(w.n) + '</b><small>Câu ' + (s.n + 1) + '/3</small></div>' +
      '<p class="ivq__jp" lang="ja">' + esc(q.jp) + '</p><p class="ivq__vi">' + esc(q.vi) + '</p>' +
      '<button type="button" class="btn btn--soft btn--sm" data-act="ivSpeak" data-v="' + esc(q.jp) + '">' + cdIc('speech', 16) + 'Nghe câu hỏi</button></div>';
    h += '<div class="ivbox">' + IV_BOX.map(function (b, i) {
      return '<label><small>' + (i + 1) + ' · ' + esc(b[1]) + '</small><input class="inp ps-sel" data-k="' + K + '.' + b[0] + '" maxlength="120" value="' + esc(g(K + '.' + b[0]) || '') + '"' + (i === 0 && ph ? ' placeholder="' + esc(ph) + '"' : '') + '></label>';
    }).join('') + '</div>';
    h += qh('Có bằng chứng thật chưa?') + '<div class="seg3">' + IV_EV.map(function (o) { return '<button type="button" class="' + (ev === o[0] ? 'on' : '') + '" data-act="pick" data-k="' + K + '.ev" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>' +
      qh('Nói được câu này bằng tiếng Nhật chưa?') + '<div class="seg3">' + IV_SAY.map(function (o) { return '<button type="button" class="' + (sy === o[0] ? 'on' : '') + '" data-act="pick" data-k="' + K + '.say" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>';
    if (ev) h += '<div class="chat chat--iv"><div class="msg"><span class="msg__av msg__av--iv">' + ivAv(w.id, 34) + '</span><div class="msg__b"><small>Người phỏng vấn hay hỏi thêm</small>' + esc(q.more) + '</div></div></div>' +
      (ev !== 'co' ? '<p class="ivev">' + cdIc('card', 15) + (q.rq ? 'Điều này nằm trên dòng thời gian ở chặng sau: ' : 'Thêm vào thẻ bằng chứng còn thiếu: ') + '<b>' + esc(q.ev) + '</b></p>' : '');
    return h;
  };
  CHECK.iva = function (s) {
    var q = qOf(ivQs()[s.n]), K = 'b62.' + q.id, n = 0;
    IV_BOX.forEach(function (b) { if (trim(g(K + '.' + b[0])).length >= 3) n++; });
    if (n < 2) return 'Viết ít nhất 2 ô (' + n + '/2)';
    if (!g(K + '.ev')) return 'Chọn có bằng chứng chưa';
    return g(K + '.say') ? '' : 'Chọn nói được tiếng Nhật chưa';
  };
  function evList() { /* mọi điều cần có: kế hoạch A (còn thiếu), mọi yêu cầu của tin (có cờ have = đã tick), kế hoạch kinh doanh, phỏng vấn, điều tự thêm */
    var L = [], seen = {}, add = function (t, src, have) { t = trim(t); if (!t || seen[t]) return; seen[t] = 1; L.push({ t: t, src: src, have: !!have }); };
    var a = curAd();
    if (a && !isPlan(a)) { var T = adTk(); a.req.forEach(function (r, i) { add(r[1], 'Tin tuyển dụng', T[i]); }); }
    if (a && isPlan(a)) (g('b61.prep') || []).forEach(function (t) { add(t, 'Kế hoạch kinh doanh'); });
    needSum().thieu.forEach(function (t) { add(t, 'Kế hoạch A'); });
    if (g('b62.q') || S.done.b62) ivQs().forEach(function (id) { var ev = g('b62.' + id + '.ev'); if (ev === 'se' || ev === 'chua') add(qOf(id).ev, 'Phỏng vấn'); });
    (g('b63.own') || []).forEach(function (t) { add(t, 'Bạn thêm'); });
    return L.slice(0, 12);
  }
  STEP.ivend = function () {
    var L = evList().filter(function (x) { return !x.have; });
    return shinSays(L.length ? 'proud' : 'cheer', '<p>' + (L.length ? 'Xong buổi phỏng vấn! Đây là <b>những điều bạn cần chuẩn bị thêm</b>. Chặng sau, bạn xếp chúng lên dòng thời gian từ JPC tới lúc ứng tuyển.' : 'Xong buổi phỏng vấn! Bạn thấy mình đủ bằng chứng. Chặng sau, bạn xếp xem mỗi điều sẽ có vào lúc nào.') + '</p>', 60) +
      (L.length ? '<div class="evc"><div class="evc__h">' + cdIc('card', 18) + '<b>Cần chuẩn bị thêm</b><span>' + L.length + '</span></div><ul>' + L.map(function (x) { return '<li><span>' + esc(x.t) + '</span><small>' + esc(x.src) + '</small></li>'; }).join('') + '</ul></div>' : '') +
      '<p class="ps-small">Tập nói 3 câu trả lời với bạn cùng lớp, mỗi câu khoảng 60 giây.</p>' + clipBlock('b62', 'Anh chị cũng từng trượt phỏng vấn');
  };
  function p3Map() { var m = g('b63.y'); return (m && typeof m === 'object') ? m : {}; }
  function p3Year(y) { var M = p3Map(), out = []; evList().forEach(function (x) { if (M[x.t] === y) out.push(x.t); }); return out; }
  function yLab(y) { for (var i = 0; i < PLAN3_Y.length; i++) if (PLAN3_Y[i][0] === y) return PLAN3_Y[i][1]; return ''; }
  var P3SEL = -1; /* điều đang chọn để đặt lên dòng thời gian (không lưu) */
  STEP.plan3 = function () {
    var L = evList(), M = p3Map();
    if (P3SEL >= L.length) P3SEL = -1;
    var free = [], sel = P3SEL > -1 ? L[P3SEL] : null;
    L.forEach(function (x, i) { if (!M[x.t]) free.push(i); });
    var h = shinSays('think', '<p>Chạm một điều, rồi chạm <b>mốc thời gian</b>. Việc làm được ngay ở JPC thì đặt vào “Bây giờ”.</p>', 56);
    h += '<div class="p3tray">' + (sel ? '<p class="p3tray__s">Đang chọn: <b>' + esc(sel.t) + '</b>. Chạm một mốc bên dưới' + (M[sel.t] ? ', hoặc <button type="button" class="link" data-act="p3out">bỏ khỏi dòng thời gian</button>' : '') + '.</p>' : '') +
      (free.length ? '<div class="p3c-w">' + free.map(function (i) { var x = L[i]; return '<button type="button" class="p3c' + (P3SEL === i ? ' on' : '') + (x.have ? ' have' : '') + '" data-act="p3sel" data-id="' + i + '">' + (x.have ? PS.icon('check', 12, 3.2) : '') + '<span>' + esc(x.t) + '</span><small>' + esc(x.src) + '</small></button>'; }).join('') + '</div>'
        : '<p class="p3tray__ok">' + PS.icon('check', 14, 3) + (L.length ? 'Đã xếp hết. Chạm một điều trên dòng thời gian nếu muốn đổi mốc.' : 'Chưa có điều nào. Thêm một điều bên dưới nhé.') + '</p>') + '</div>';
    h += '<div class="p3add"><input class="inp ps-sel" id="p3New" maxlength="60" placeholder="' + (L.length ? 'Thêm một điều khác (không bắt buộc)' : 'Ví dụ: đậu N3 trong năm đầu') + '"><button type="button" class="btn btn--soft btn--sm" data-act="p3add">Thêm</button></div>';
    h += '<ol class="ptl' + (sel ? ' ptl--arm' : '') + '">' + PLAN3_Y.map(function (o) {
      var its = []; L.forEach(function (x, i) { if (M[x.t] === o[0]) its.push(i); });
      return '<li class="ptl__n ptl__n--' + o[0] + '"><button type="button" class="ptl__dot" data-act="p3put" data-v="' + o[0] + '"><b>' + esc(o[1]) + '</b><small>' + esc(o[2]) + '</small></button><div class="ptl__it">' +
        (its.length ? its.map(function (i) { var x = L[i]; return '<button type="button" class="ptl__x' + (P3SEL === i ? ' on' : '') + (x.have ? ' have' : '') + '" data-act="p3sel" data-id="' + i + '">' + esc(x.t) + '</button>'; }).join('') : (sel ? '<span class="ptl__e">Chạm để đặt vào đây</span>' : '')) + '</div></li>';
    }).join('') + '</ol>';
    return h;
  };
  CHECK.plan3 = function () {
    var L = evList(), M = p3Map(), n = 0, need = Math.min(4, L.length);
    if (!L.length) return 'Thêm ít nhất 1 điều';
    L.forEach(function (x) { if (M[x.t]) n++; });
    return n >= need ? '' : 'Xếp ít nhất ' + need + ' điều lên dòng thời gian (' + n + '/' + need + ')';
  };
  function adSum() { var a = curAd(); if (!a) return {}; if (isPlan(a)) return { kind: adKind(), n: a.n, plan: 1, mark: planMark(), inv: g('b61.inv') || '', prep: g('b61.prep') || [] };
    var T = adTk(), o = { kind: adKind(), grp: a.gr, n: a.vt, co: a.co, lu: a.lu, plan: 0, have: [], need: [] }; a.req.forEach(function (r, i) { (T[i] ? o.have : o.need).push(r[1]); }); o.y = o.need; o.x = []; return o; }
  function ivSum() { if (!g('b62.q') && !S.done.b62) return {}; return { who: ivWho().n, q: ivQs().map(function (id) { var K = 'b62.' + id; return { q: qOf(id).vi, ev: g(K + '.ev') || '', say: g(K + '.say') || '', do: g(K + '.do') || '', res: g(K + '.res') || '', learn: g(K + '.learn') || '' }; }) }; }
  function p3Sum() { var o = {}; PLAN3_Y.forEach(function (y) { o['y' + y[0]] = p3Year(y[0]); }); return o; }
  function p3Any(p) { var n = 0; PLAN3_Y.forEach(function (y) { n += (p['y' + y[0]] || []).length; }); return n; }
  function speakJa(t) {
    if (!PS.soundOn()) { PS.toast('Bật âm thanh ở Sổ tay › Cài đặt để nghe nhé.'); return; }
    try {
      var ss = W.speechSynthesis; if (!ss || !W.SpeechSynthesisUtterance) { PS.toast('Máy này chưa đọc được tiếng Nhật. Nhờ bạn đọc giúp nhé.'); return; }
      ss.cancel(); var u = new W.SpeechSynthesisUtterance(t); u.lang = 'ja-JP'; u.rate = 0.9;
      var vs = ss.getVoices ? ss.getVoices() : []; for (var i = 0; i < vs.length; i++) if (/^ja/i.test(vs[i].lang)) { u.voice = vs[i]; break; }
      ss.speak(u);
    } catch (e) {}
  }

  /* ----- Bến 7 · Ngọn Hải Đăng (PS1.3.42: trước là Bến 6) ----- */
  var RING_SH = { fam: 'Gia đình', ban: 'Bạn lớp', gv: 'Thầy cô', sp: 'Senpai', boss: 'Cấp trên', dn: 'Đồng nghiệp', cd: 'Bạn cùng cty', tc: 'Nghiệp đoàn' };
  function ringName(id) { for (var i = 0; i < RING_P.length; i++) if (RING_P[i][0] === id) return RING_P[i][1]; return ''; }
  function ringSVG() {
    var R = g('b71.r') || {}, h = '<svg class="ring" viewBox="0 0 300 300" aria-hidden="true">', rr = { 1: 52, 2: 92, 3: 132 };
    h += '<circle cx="150" cy="150" r="132" fill="#FAF9F5" stroke="#B9B3A3" stroke-dasharray="4 5"/><circle cx="150" cy="150" r="92" fill="#F0EEE6" stroke="#C9C2AF"/><circle cx="150" cy="150" r="52" fill="#F6E6DD" stroke="#EBCBB9"/>';
    h += '<text x="150" y="26" text-anchor="middle" class="ring__t">Chưa quen</text><text x="150" y="66" text-anchor="middle" class="ring__t">Quen sơ</text><text x="150" y="106" text-anchor="middle" class="ring__t">Thân thiết</text>';
    h += '<circle cx="150" cy="150" r="22" fill="#C15F3C"/><text x="150" y="155" text-anchor="middle" class="ring__me">Bạn</text>';
    RING_P.forEach(function (p, i) {
      var l = R[p[0]]; if (!l) return;
      var an = -Math.PI / 2 + 0.5 + (i / (RING_P.length - 1)) * (Math.PI * 2 - 1), x = 150 + Math.cos(an) * rr[l], y = 150 + Math.sin(an) * rr[l], key = g('b71.key') === p[0];
      h += '<g><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (key ? 9 : 7) + '" fill="' + (key ? '#D97757' : '#fff') + '" stroke="#141413" stroke-width="2"/><text x="' + x.toFixed(1) + '" y="' + (y + 20).toFixed(1) + '" text-anchor="middle" class="ring__n">' + esc(RING_SH[p[0]]) + '</text></g>';
    });
    return h + '</svg>';
  }
  STEP.ring = function () {
    var R = g('b71.r') || {}, n = 0; RING_P.forEach(function (p) { if (R[p[0]]) n++; });
    var h = '<div class="ringbox">' + ringSVG() + '</div><p class="qsub">Mỗi người đang ở vòng nào với bạn?</p><div class="rings">' + RING_P.map(function (p) {
      return '<div class="wind' + (R[p[0]] ? ' set' : '') + '"><b>' + cdIc(p[2], 16) + esc(p[1]) + '</b><div class="seg3">' + RING_L.map(function (o) { return '<button type="button" class="' + (R[p[0]] === o[0] ? 'on' : '') + '" data-act="ring" data-id="' + p[0] + '" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div></div>';
    }).join('') + '</div>';
    if (n >= RING_P.length) {
      h += qh('Ai giúp được nhiều nhất cho kế hoạch bạn nghiêng?', leanVoy() ? leanName() : '') + '<div class="chips">' + RING_P.map(function (p) { return '<button type="button" class="chip' + (g('b71.key') === p[0] ? ' on' : '') + '" data-act="pick" data-k="b71.key" data-v="' + p[0] + '">' + esc(p[1]) + '</button>'; }).join('') + '</div>';
      h += '<h3 class="qs">Người giúp trong chuyện thật</h3><div class="alt">' + RING_STORY.map(function (x) { return '<button type="button" class="altc" data-act="sp" data-id="' + x[0] + '"><b>' + esc(spOf(x[0]).a) + '</b><span>' + esc(x[1]) + '</span></button>'; }).join('') + '</div>';
    }
    return h;
  };
  CHECK.ring = function () { var R = g('b71.r') || {}, n = 0; RING_P.forEach(function (p) { if (R[p[0]]) n++; }); if (n < RING_P.length) return 'Xếp đủ 8 người (' + n + '/8)'; return g('b71.key') ? '' : 'Chọn người giúp nhiều nhất'; };
  function askList() { var qs = MSG_Q.slice(), q0 = trim(g('b23.q')); if (q0 && qs.indexOf(q0) < 0) qs.unshift(q0); return qs; }
  function askWho() { var k = g('b71.key'); return k ? ringName(k) : 'người giúp bạn'; }
  STEP.askprep = function () { /* PS1.3.45 (thầy góp ý 29b): bỏ soạn tin nhắn. Chuẩn bị câu hỏi rồi gặp trực tiếp; quay lại ghi lời khuyên (không bắt buộc) */
    var pick = g('b71.aq') || [];
    var h = qh('Bạn sẽ hỏi ' + askWho() + ' điều gì?', 'Chọn 1–2 câu gợi ý, rồi sửa theo cách nói của bạn.') +
      '<div class="chips chips--ask">' + askList().map(function (q) { var on = pick.indexOf(q) > -1; return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-act="askQ" data-v="' + esc(q) + '" aria-pressed="' + on + '">' + esc(q) + '</button>'; }).join('') + '</div>' +
      '<h3 class="qs">Câu hỏi của bạn</h3>' + areaHTML('b71.ask', 'Chạm câu gợi ý ở trên, hoặc tự viết.', 3, 300);
    if (trim(g('b71.ask')).length >= 10) h += '<div class="meetc">' + shin2('wink', 48) + '<div><b>Gặp trực tiếp nhé!</b><p>' + esc(ASK_TIP) + '</p></div></div>' +
      '<h3 class="qs">Mình đã gặp ai, họ khuyên gì</h3>' + areaHTML('b71.met', 'Ghi sau khi gặp. Chưa gặp thì để trống, ghi sau cũng được.', 3, 400);
    return h;
  };
  CHECK.askprep = function () { return trim(g('b71.ask')).length >= 10 ? '' : 'Viết câu hỏi của bạn'; };
  STEP.work = function () {
    var P = g('b72.w') || {};
    return '<div class="works">' + WORKS.map(function (w, i) {
      var v = P[i];
      return '<div class="work"><b class="work__t">' + cdIc(w.ic, 18) + esc(w.t) + '</b><div class="opts">' + w.opts.map(function (o, j) {
        return '<button type="button" class="opt' + (String(v) === String(j) ? ' on' : '') + '" data-act="work" data-id="' + i + '" data-v="' + j + '"><span class="dot">' + (String(v) === String(j) ? PS.icon('check', 13, 3.2) : '') + '</span><span>' + esc(o[0]) + '</span></button>';
      }).join('') + '</div>' + (v != null ? '<div class="workfb"><p><b>Được:</b> ' + esc(w.opts[+v][1]) + '</p><p><b>Lưu ý:</b> ' + esc(w.opts[+v][2]) + '</p></div>' : '') + '</div>';
    }).join('') + '</div><h3 class="qs">Senpai học từ công việc</h3><div class="alt">' + WORK_STORY.map(function (x) { return '<button type="button" class="altc" data-act="sp" data-id="' + x[0] + '"><b>' + esc(spOf(x[0]).a) + '</b><span>' + esc(x[1]) + '</span></button>'; }).join('') + '</div>';
  };
  CHECK.work = function () { var P = g('b72.w') || {}, n = 0; WORKS.forEach(function (w, i) { if (P[i] != null) n++; }); return n >= WORKS.length ? '' : 'Chọn cách cho cả 3 tình huống (' + n + '/3)'; };
  STEP.habit = function () {
    var v = g('b72.h') || '', i = LEARN_H.indexOf(v), rt = i < 0 ? ['horenso', 'memo'] : (i === 1 || i === 2 ? ['memo', 'xinloi'] : ['horenso', 'som']);
    var h = qh('Cách học bạn muốn tập ngay từ bây giờ') + '<div class="opts">' + LEARN_H.map(function (t) { return opt('b72.h', t, t, v === t); }).join('') + '</div>';
    if (v && !S.demo && PS.routineSugHTML) h += PS.routineSugHTML(rt, { from: ID, sub: esc('Tập thành thói quen ở JPC với Shin Routine') });
    return h;
  };
  CHECK.habit = function () { return g('b72.h') ? '' : 'Chọn một cách học'; };


  /* =========================================================
     PS1.3.50 · CD02.3.6 · BẢN 4 ĐỢT 2
     ========================================================= */
  function ddmm(k) { if (!k) return ''; var p = String(k).split('-'); return p.length === 3 ? p[2] + '/' + p[1] : ''; }
  function dayAdd(n) { var d = new Date(); d.setDate(d.getDate() + (+n || 0)); return dayKey(d); }
  function obj(k) { var o = g(k); return (o && typeof o === 'object' && !(o instanceof Array)) ? o : {}; }

  /* ----- b33 · Dây ảnh: thành công về nghề nghiệp ----- */
  var sucI = -1;
  function sucLab(k) { var t = ''; SUCC_GRP.forEach(function (gr) { gr[1].forEach(function (x) { if (x[0] === k) t = x[1]; }); }); return t; }
  function sucCells() { var a = g('b33.sc'); return (a && a.length === SUCC_N) ? a : ['', '', '']; }
  function sucName(i) { var k = sucCells()[i]; if (!k) return ''; return k === 'o' ? trim(g('b33.sco' + i)) : sucLab(k); }
  function sucList() { var o = []; sucCells().forEach(function (k, i) { if (k && sucName(i)) o.push({ k: k, t: sucName(i), w: trim(g('b33.scw' + i)) }); }); return o; }
  function sucTxt() { var L = sucList(); return L.length ? L.map(function (x) { return x.t; }).join(', ') : cutWork(); }
  function cutWork() { var t = trim(g('b33.work')); return t.indexOf('Với mình, đi làm là để') === 0 ? trim(t.slice(22)) : t; } /* bài cũ trước PS1.3.50 */
  function polaroid(i, edit) {
    var k = sucCells()[i], rot = [-4, 2.5, -2][i], inner;
    if (k) inner = '<span class="pol__img">' + (k === 'o' ? '<span class="pol__own">' + cdIc('flag', 26) + '</span>' : dreamSticker(k, 58)) + '</span><span class="pol__cap">' + esc(sucName(i) || 'Ý khác') + '</span>';
    else inner = '<span class="pol__img pol__img--e"><i>+</i></span><span class="pol__cap pol__cap--e">' + (edit ? 'Chạm để chọn' : '') + '</span>';
    return '<' + (edit ? 'button type="button" data-act="sucCell" data-v="' + i + '" aria-label="Ảnh ' + (i + 1) + '"' : 'div') + ' class="pol' + (k ? ' on' : '') + '" style="transform:rotate(' + rot + 'deg)"><span class="pol__pin"></span>' + inner + '</' + (edit ? 'button' : 'div') + '>';
  }
  function sucRope(edit) { return '<div class="rope"><svg class="rope__l" viewBox="0 0 360 40" preserveAspectRatio="none" aria-hidden="true"><path d="M-4 8Q180 46 364 8" fill="none" stroke="#9C7A55" stroke-width="2.4" stroke-dasharray="1 4" stroke-linecap="round"/><path d="M-4 8Q180 46 364 8" fill="none" stroke="#9C7A55" stroke-width="1.2"/></svg><div class="rope__ps' + (edit ? '' : ' rope__ps--' + sucList().length) + '">' + [0, 1, 2].filter(function (i) { return edit || sucCells()[i]; }).map(function (i) { return polaroid(i, edit); }).join('') + '</div></div>'; }
  STEP.success = function () {
    var a = sucCells(), h = qh('Với bạn, thành công về nghề nghiệp là gì?', 'Kẹp 1–3 tấm ảnh lên dây. Không có đúng sai.') + sucRope(1);
    var rows = '';
    a.forEach(function (k, i) { if (!k) return;
      rows += '<div class="polw"><b>' + (i + 1) + ' · ' + esc(sucName(i) || 'Ý khác') + '</b>' + (k === 'o' ? '<input class="inp ps-sel" data-k="b33.sco' + i + '" maxlength="40" value="' + esc(g('b33.sco' + i) || '') + '" placeholder="Đặt tên cho ảnh này">' : '') +
        '<input class="inp ps-sel" data-k="b33.scw' + i + '" maxlength="120" value="' + esc(g('b33.scw' + i) || '') + '" placeholder="Vì sao hình này là thành công với bạn?"></div>'; });
    if (rows) h += '<h3 class="qs">Vì sao?</h3>' + rows;
    return h;
  };
  CHECK.success = function () {
    var a = sucCells(), n = 0, miss = '';
    a.forEach(function (k, i) { if (!k || miss) return; n++; if (k === 'o' && trim(g('b33.sco' + i)).length < 2) miss = 'Đặt tên cho ảnh ' + (i + 1); else if (trim(g('b33.scw' + i)).length < 4) miss = 'Viết vì sao cho ảnh ' + (i + 1); });
    if (!n) return 'Kẹp ít nhất 1 tấm ảnh'; return miss;
  };
  function sucPicker(i) {
    sucI = i; var cur = sucCells()[i], used = sucCells();
    var h = '<h2>Chọn ảnh ' + (i + 1) + '</h2>' + SUCC_GRP.map(function (gr) {
      return '<h3 class="qs">' + esc(gr[0]) + '</h3><div class="dbp dbp--3">' + gr[1].map(function (x) { var on = cur === x[0], dis = !on && used.indexOf(x[0]) > -1;
        return '<button type="button" class="dbp__b' + (on ? ' on' : '') + (dis ? ' dis' : '') + '" data-act="sucPick" data-v="' + x[0] + '" aria-pressed="' + on + '"' + (dis ? ' disabled' : '') + '>' + dreamSticker(x[0], 44) + '<span>' + esc(x[1]) + '</span></button>'; }).join('') + '</div>';
    }).join('') + '<h3 class="qs">Không thấy hình hợp?</h3><div class="dbp"><button type="button" class="dbp__b' + (cur === 'o' ? ' on' : '') + '" data-act="sucPick" data-v="o">' + '<span class="pol__own pol__own--s">' + cdIc('flag', 22) + '</span><span>Ý khác, mình tự đặt tên</span></button></div>' +
      '<div class="repbtns">' + (cur ? '<button type="button" class="btn btn--soft" data-act="sucClear">Bỏ ảnh này</button>' : '') + '<button type="button" class="btn" data-act="ovClose">Đóng</button></div>';
    ov(h);
  }
  function sucPick(k) {
    if (sucI < 0) return; var a = sucCells().slice(); a[sucI] = k; S.d['b33.sc'] = a; save(); sfx('ting'); closeOv(); sucI = -1; if (V.v === 'act') keepY(redrawStep);
  }
  function sucClear() { if (sucI < 0) return; var a = sucCells().slice(); a[sucI] = ''; S.d['b33.sc'] = a; delete S.d['b33.sco' + sucI]; delete S.d['b33.scw' + sucI]; sucI = -1; save(); closeOv(); if (V.v === 'act') keepY(redrawStep); }

  /* ----- b53 · Đứng giữa ngã rẽ (PS1.3.56: 4 ngã rẽ, “đổi ý” bằng lựa chọn, không tiền) ----- */
  function crossSide(n) { var v = g('b53x.c' + n); return v === 'a' || v === 'b' ? v : ''; }
  function whyLab(k) { var t = ''; CROSS_WHY.forEach(function (o) { if (o[0] === k) t = o[1]; }); return t; }
  function tagChips(L, cls) { return L.map(function (t) { return '<span class="xtag' + (cls ? ' ' + cls : '') + '">' + esc(CROSS_TAG[t]) + '</span>'; }).join(''); }
  STEP.cross = function (s) {
    var c = CROSS[s.n], sd = crossSide(s.n), h = (c.real ? '<p class="xr__real">' + cdIc('bottle', 14) + 'Dựa trên chuyện đã từng xảy ra</p>' : '') + qh(c.t, 'Ngã rẽ ' + (s.n + 1) + '/' + CROSS.length + ' · chạm bên bạn chọn');
    h += '<div class="xr">' + ['a', 'b'].map(function (x) { var o = c[x], on = sd === x;
      return '<button type="button" class="xr__c' + (on ? ' on' : (sd ? ' off' : '')) + '" data-act="crossPick" data-id="' + s.n + '" data-v="' + x + '" aria-pressed="' + on + '">' + dreamSticker(o.ic, 46) + '<b>' + esc(o.n) + '</b><small>' + esc(o.d) + '</small><span class="xr__g">' + tagChips(o.g) + '</span></button>';
    }).join('<span class="xr__or">hay</span>') + '</div>';
    if (sd) {
      var other = c[sd === 'a' ? 'b' : 'a'], r = g('b53x.r' + s.n) || '';
      h += '<div class="xr__lost"><small>Bạn vừa đánh đổi</small><div>' + tagChips(other.g, 'xtag--lost') + '</div></div>' +
        '<div class="xr__lv"><b>' + esc(CROSS_WHY_Q) + '</b><p>Bên kia: ' + esc(other.n) + '</p><div class="chips xr__why">' + CROSS_WHY.map(function (o) {
          return '<button type="button" class="chip' + (r === o[0] ? ' on' : '') + (o[0] === 'x' ? ' chip--x' : '') + '" data-act="crossWhy" data-id="' + s.n + '" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div></div>';
    }
    return h;
  };
  CHECK.cross = function (s) { if (!crossSide(s.n)) return 'Chọn một bên'; return g('b53x.r' + s.n) ? '' : 'Chọn điều có thể làm bạn đổi ý'; };
  function crossTally() {
    var keep = {}, lose = {}, n = 0;
    CROSS.forEach(function (c, i) { var sd = crossSide(i); if (!sd) return; n++; c[sd].g.forEach(function (t) { keep[t] = (keep[t] || 0) + 1; }); c[sd === 'a' ? 'b' : 'a'].g.forEach(function (t) { lose[t] = (lose[t] || 0) + 1; }); });
    var top = function (o, not) { var m = 0, L = []; for (var t in o) if (o.hasOwnProperty(t) && o[t] > m) m = o[t]; for (var t2 in o) if (o.hasOwnProperty(t2) && o[t2] === m && (!not || !not[t2] || not[t2] < o[t2])) L.push(t2); return L; };
    var kk = top(keep, lose), ll = top(lose, keep); ll = ll.filter(function (t) { return kk.indexOf(t) < 0; });
    return { n: n, keep: kk, lose: ll, K: keep, L: lose };
  }
  function leanPole() { var v = g('b31.v') || [], best = 0, bi = -1; PAIRS.forEach(function (p, i) { var x = v[i] == null ? 5 : +v[i], d = Math.abs(x - 5); if (d > best) { best = d; bi = i; } }); if (bi < 0) return null; return { id: PAIRS[bi][2], side: (+v[bi] < 5 ? 0 : 1), t: (+v[bi] < 5 ? PAIRS[bi][0] : PAIRS[bi][1]) }; }
  function crossCmp(T) {
    if (!g('b31.v')) return '';
    var lp = leanPole(); if (!lp) return '';
    var tg = ''; for (var t in CROSS_CMP) if (CROSS_CMP.hasOwnProperty(t) && CROSS_CMP[t][0] === lp.id && CROSS_CMP[t][1] === lp.side) tg = t;
    var kp = T.keep.map(function (t) { return CROSS_TAG[t]; }).join(', ');
    if (tg && (T.K[tg] || 0) > 0 && (T.K[tg] || 0) >= (T.L[tg] || 0)) return 'La bàn của bạn nghiêng về <b>' + esc(lp.t) + '</b>, và khi chọn thật bạn cũng giữ nó. Bạn khá hiểu mình đấy!';
    return 'Ở Xưởng La Bàn, bạn nói coi trọng <b>' + esc(lp.t) + '</b>. Khi chọn thật, bạn hay giữ <b>' + esc(kp || '…') + '</b>. Bạn nghĩ sao?';
  }
  STEP.crosssum = function () {
    var T = crossTally(), W2 = crossWhyN(), rows = CROSS.map(function (c, i) { var sd = crossSide(i); if (!sd) return ''; var r = g('b53x.r' + i);
      return '<li><b>' + esc(c[sd].n) + '</b><small>' + (r === 'x' ? 'Rất chắc, không đổi' : 'Đổi ý nếu bên kia: ' + esc(lowF(whyLab(r) || '…'))) + '</small></li>'; }).join('');
    var h = shinSays('think', '<p>Khi phải chọn, <b class="nm">' + esc(given()) + '</b> hay giữ <b>' + esc(T.keep.map(function (t) { return CROSS_TAG[t]; }).join(', ') || '…') + '</b>' + (T.lose.length ? ' và hay buông <b>' + esc(T.lose.map(function (t) { return CROSS_TAG[t]; }).join(', ')) + '</b>' : '') + '.</p>', 64);
    h += '<div class="xsum"><div><small>Bạn hay giữ</small>' + tagChips(T.keep) + '</div><div><small>Bạn hay buông</small>' + (T.lose.length ? tagChips(T.lose, 'xtag--lost') : '<span class="ps-small">Không rõ bên nào</span>') + '</div></div>';
    h += '<div class="xsum"><div><small>Bạn chắc chắn</small><b class="xsum__n">' + W2.sure + '/' + T.n + '</b><span class="ps-small">ngã rẽ</span></div><div><small>Điều hay làm bạn đổi ý</small>' + (W2.top ? '<span class="xtag xtag--why">' + esc(W2.top) + '</span>' : '<span class="ps-small">Bạn rất chắc ở mọi ngã rẽ</span>') + '</div></div>';
    h += '<ol class="xlist">' + rows + '</ol>';
    var cm = crossCmp(T); if (cm) h += '<div class="tnote">' + cm + '</div>';
    return h;
  };
  function lowF(t) { return t ? t.charAt(0).toLowerCase() + t.slice(1) : t; }
  function crossWhyN() { var C = {}, sure = 0, top = '', m = 0, k; CROSS.forEach(function (c, i) { var r = g('b53x.r' + i); if (!crossSide(i) || !r) return; if (r === 'x') sure++; else C[r] = (C[r] || 0) + 1; });
    for (k in C) if (C.hasOwnProperty(k) && C[k] > m) { m = C[k]; top = whyLab(k); } return { sure: sure, top: top }; }
  function crossSum() { var T = crossTally(), W2 = crossWhyN(); return { keep: T.keep.map(function (t) { return CROSS_TAG[t]; }), lose: T.lose.map(function (t) { return CROSS_TAG[t]; }), pick: CROSS.map(function (c, i) { var sd = crossSide(i); return sd ? c[sd].n : ''; }), why: CROSS.map(function (c, i) { return whyLab(g('b53x.r' + i)); }), sure: W2.sure, whyTop: W2.top, me: g('b53n.me') || '' }; }

  /* ----- b72 · Đi một vòng chỗ làm ----- */
  var tourOpen = -1, tourWrong = {};
  function tourGrp() { return clipGrp() === 'kt' ? 'kt' : 'dv'; }
  function tourOf() { return TOUR[tourGrp()]; }
  function tourRes() { return obj('b72.t'); }
  function tourN() { var R = tourRes(), n = 0; tourOf().spots.forEach(function (x, i) { if (R[i]) n++; }); return n; }
  STEP.tour = function () {
    var T = tourOf(), R = tourRes(), n = tourN();
    var h = qh('Đi một vòng ' + T.n.toLowerCase(), 'Chạm từng dấu “?” và đoán: tại sao người Nhật làm vậy?') +
      '<div class="tour"><div class="tour__sc">' + tourArt(tourGrp()) + T.spots.map(function (p, i) { var d = !!R[i], o = tourOpen === i;
        return '<button type="button" class="tour__p' + (d ? ' done' : '') + (o ? ' cur' : '') + '" style="left:' + (p.x / 3.6) + '%;top:' + (p.y / 2.2) + '%" data-act="tourSpot" data-v="' + i + '" aria-label="' + esc(p.t) + '">' + (d ? PS.icon('check', 13, 3) : '?') + '</button>'; }).join('') + '</div>' +
      '<p class="tour__n">' + n + '/' + T.spots.length + ' chỗ đã hỏi “Tại sao?”</p></div>';
    if (tourOpen > -1) {
      var p = T.spots[tourOpen], r = R[tourOpen], W2 = tourWrong[tourOpen] || {}, ord = tourOpen % 2 ? [1, 0] : [0, 1];
      h += '<div class="tourp" id="tourP"><b class="tourp__t">' + esc(p.t) + '</b><p class="tourp__q">' + esc(p.q) + '</p>';
      if (!r) h += '<div class="opts">' + ord.map(function (j) { var bad = !!W2[j]; return '<button type="button" class="opt' + (bad ? ' bad' : '') + '" data-act="tourAns" data-v="' + j + '"' + (bad ? ' disabled' : '') + '><span class="dot"></span><span>' + esc(p.o[j]) + '</span></button>'; }).join('') +
        '<button type="button" class="opt opt--dk" data-act="tourAns" data-v="dk"><span class="dot"></span><span>' + esc(TOUR_DK) + '</span></button></div>' + (W2[1] ? '<p class="fb fb--no">Thử lại nhé.</p>' : '');
      else h += (r === 'ok' ? '<p class="fb fb--ok">' + PS.icon('check', 14, 3) + 'Đúng rồi!</p>' : '<p class="fb">Không sao, giờ mình biết rồi.</p>') +
        '<div class="tourp__les"><p><b>Vì:</b> ' + esc(p.les) + '</p><p><b>Ở JPC, KTX:</b> ' + esc(p.jpc) + '</p></div>' +
        (n < T.spots.length ? '<button type="button" class="btn btn--soft btn--sm" data-act="tourNext">Chỗ tiếp theo</button>' : '');
      h += '</div>';
    }
    return h;
  };
  CHECK.tour = function () { var n = tourN(), m = tourOf().spots.length; return n >= m ? '' : 'Hỏi “Tại sao?” đủ ' + m + ' chỗ (' + n + '/' + m + ')'; };

  /* ----- b72 · Được giao việc khó ----- */
  function hardRes() { return obj('b72.hd'); }
  STEP.hard = function () {
    var R = hardRes(), h = qh('Cấp trên giao việc khó', 'Đọc tin nhắn, chọn cách bạn trả lời. Cách nào cũng có cái được và cái phải chịu.') + '<div class="chat2"><div class="chat2__hd"><span class="chat2__av">田</span><b>' + esc(HARD_BOSS) + '</b></div>';
    for (var i = 0; i < HARD.length; i++) {
      var m = HARD[i], r = R[i];
      h += '<div class="chat2__in"><p>' + esc(m.m) + '</p><small lang="ja">' + esc(m.jp) + '</small><button type="button" class="chat2__sp" data-act="ivSpeak" data-v="' + esc(m.jp) + '" aria-label="Nghe tiếng Nhật">' + PS.icon('sound', 14) + '</button></div>';
      if (r == null) { h += '<div class="seg3 seg3--hard">' + m.r.map(function (o, j) { return '<button type="button" data-act="hardPick" data-id="' + i + '" data-v="' + j + '">' + esc(o[0]) + '</button>'; }).join('') + '</div>'; break; }
      var o = m.r[+r];
      h += '<div class="chat2__out"><p>' + esc(o[0]) + '</p></div><div class="hardfb"><p><b>Được:</b> ' + esc(o[1]) + '</p><p><b>Phải chịu:</b> ' + esc(o[2]) + '</p><p class="hardfb__g">' + cdIc('stairs', 14) + 'Cơ hội trong việc này: ' + esc(m.gain) + '</p>' +
        '<button type="button" class="link" data-act="hardRe" data-id="' + i + '">Chọn lại</button></div>';
    }
    h += '</div>';
    if (cnt(R) >= HARD.length || Object.keys(R).length >= HARD.length) h += '<div class="tnote">' + HARD_NOTE + '</div>' + shinSays('focused', '<p>' + esc(HARD_SHIN) + '</p>', 56);
    return h;
  };
  CHECK.hard = function () { var R = hardRes(), n = 0; HARD.forEach(function (x, i) { if (R[i] != null) n++; }); return n >= HARD.length ? '' : 'Trả lời đủ ' + HARD.length + ' tin nhắn (' + n + '/' + HARD.length + ')'; };
  function hardSum() { var R = hardRes(), o = []; HARD.forEach(function (m, i) { if (R[i] != null) o.push(m.r[+R[i]][0]); }); return o; }

  /* ----- b73 · Bài học từ trải nghiệm ----- */
  function mkOf(id) { for (var i = 0; i < MISTAKES.length; i++) if (MISTAKES[i][0] === id) return MISTAKES[i]; return null; }
  function lessonTitle() { var k = g('b73.mk'); if (k === 'o') return trim(g('b73.mko')) || 'Chuyện của mình'; var m = mkOf(k); return m ? m[1] : ''; }
  STEP.lesson = function () {
    var k = g('b73.mk') || '', m = mkOf(k);
    var h = qh('Bài học từ trải nghiệm', 'Chọn một lần sai bạn từng gặp, hoặc kể chuyện của bạn.') + '<div class="chips chips--mk">' + MISTAKES.map(function (x) { var on = k === x[0]; return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-act="pick" data-k="b73.mk" data-v="' + x[0] + '" aria-pressed="' + on + '">' + esc(x[1]) + '</button>'; }).join('') +
      '<button type="button" class="chip' + (k === 'o' ? ' on' : '') + '" data-act="pick" data-k="b73.mk" data-v="o">Chuyện khác của mình</button></div>';
    if (k) {
      if (k === 'o') h += '<input class="inp ps-sel inp--gap" data-k="b73.mko" maxlength="60" value="' + esc(g('b73.mko') || '') + '" placeholder="Gọi tên lần sai đó trong vài chữ">';
      h += MISTAKE_Q.map(function (q, i) { return '<h3 class="qs">' + (i + 1) + '. ' + esc(q) + '</h3>' + areaHTML('b73.m' + (i + 1), m ? 'Ví dụ: ' + m[2][i] : '', 2, 200); }).join('');
    }
    return h;
  };
  CHECK.lesson = function () { var k = g('b73.mk'); if (!k) return 'Chọn một lần sai'; if (k === 'o' && trim(g('b73.mko')).length < 3) return 'Gọi tên chuyện của bạn'; for (var i = 1; i <= 3; i++) if (trim(g('b73.m' + i)).length < 5) return 'Viết dòng ' + i + ' nhé'; return ''; };

  /* ----- b73 · Thử để biết (mẫu thử) ----- */
  function protoSrcs() {
    var L = [], seen = {}, add = function (lab, t) { t = trim(t); if (t && !seen[t]) { seen[t] = 1; L.push([lab ? lab + ': ' + t : t, t]); } };
    var is = isleOf(g('b13.isl')); if (is) add('Hướng bạn quan tâm', is.n);
    if (voyIsle('b41')) add('Kế hoạch A', g('b41.name'));
    if (voyIsle('b43')) add('Kế hoạch C', g('b43.name'));
    sucList().forEach(function (x) { add('Thành công với bạn', x.t); });
    return L.slice(0, 6);
  }
  function protoSrc() { var s = g('b73.src'); return s === 'o' ? trim(g('b73.srco')) : (s || ''); }
  function protoK() { for (var i = 0; i < PROTO_K.length; i++) if (PROTO_K[i][0] === g('b73.pk')) return PROTO_K[i]; return null; }
  STEP.proto = function () {
    var src = g('b73.src') || '', L = protoSrcs(), K = protoK();
    var h = shinSays('curious', '<p>Bạn đã viết mình thích, mình hợp nhiều điều. Nhưng chưa thử thật thì chưa chắc. <b>Mình thử làm một việc nhỏ hướng đến mục tiêu nhé!</b></p>', 56) +
      '<div class="prule">' + PROTO_RULE.map(function (r) { return '<span><b>' + esc(r[0]) + '</b><small>' + esc(r[1]) + '</small></span>'; }).join('') + '</div>' +
      qh('Bạn muốn thử điều gì?') + '<div class="opts">' + L.map(function (t) { return opt('b73.src', t[1], t[0], src === t[1]); }).join('') + opt('b73.src', 'o', 'Điều khác, mình tự viết', src === 'o') + '</div>';
    if (src === 'o') h += '<input class="inp ps-sel inp--gap" data-k="b73.srco" maxlength="60" value="' + esc(g('b73.srco') || '') + '" placeholder="Ví dụ: làm phiên dịch">';
    if (protoSrc()) {
      h += '<div class="pbelief">Mình tin mình thích hoặc hợp với <b>' + esc(protoSrc()) + '</b>, nhưng chưa thử thật.</div>';
      h += qh('Thử bằng cách nào?') + '<div class="pkind">' + PROTO_K.map(function (x) { var on = g('b73.pk') === x[0]; return '<button type="button" class="pkind__b' + (on ? ' on' : '') + '" data-act="pick" data-k="b73.pk" data-v="' + x[0] + '" aria-pressed="' + on + '">' + cdIc(x[3], 20) + '<b>' + esc(x[1]) + '</b><small>' + esc(x[2]) + '</small></button>'; }).join('') + '</div>';
      if (K) h += '<ul class="pex">' + K[4].map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
        '<h3 class="qs">Việc thử nhỏ của bạn: mình sẽ…</h3>' + areaHTML('b73.pw', 'Ví dụ: ' + K[4][0].replace(/^[^:]*:\s*/, ''), 2, 200) +
        '<h3 class="qs">Thử xong, mình muốn biết…</h3><input class="inp ps-sel" data-k="b73.pq" maxlength="100" value="' + esc(g('b73.pq') || '') + '" placeholder="Ví dụ: mình có kiên nhẫn giải thích cho người khác không?">';
    }
    return h;
  };
  CHECK.proto = function () { if (!protoSrc()) return g('b73.src') === 'o' ? 'Viết điều bạn muốn thử' : 'Chọn điều bạn muốn thử'; if (!g('b73.pk')) return 'Chọn cách thử'; if (trim(g('b73.pw')).length < 8) return 'Viết việc thử nhỏ của bạn'; return trim(g('b73.pq')).length >= 6 ? '' : 'Viết điều bạn muốn biết'; };
  function likeFace(n, on, act) { return '<button type="button" class="lk' + (on ? ' on' : '') + '" data-act="' + act + '" data-v="' + n + '" aria-pressed="' + on + '"><b>' + n + '</b><small>' + esc(LIKE5[n]) + '</small></button>'; }
  STEP.proto2 = function () {
    var pg = +g('b73.pg') || 0, K = protoK();
    var h = qh('Trước khi thử, bạn đoán mình sẽ thích mức nào?', '1 là không thích, 5 là rất thích.') + '<div class="lks">' + [1, 2, 3, 4, 5].map(function (n) { return likeFace(n, pg === n, 'pg'); }).join('') + '</div>' +
      qh('Bạn làm xong khi nào?', 'Việc thử nhỏ nên xong trong 2 tuần.') + '<div class="seg3">' + PROTO_WHEN.map(function (o) { var on = g('b73.pd') === o[0]; return '<button type="button" class="' + (on ? 'on' : '') + '" data-act="protoWhen" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>';
    if (pg && g('b73.pdl')) h += '<h3 class="qs">Thẻ việc thử nhỏ của bạn</h3>' + protoCard(1) + (K ? rtSugHTML([PROTO_RT[K[0]]], 'Mang sang Shin routine', 'Việc thử nhỏ là việc lặp lại mỗi ngày? Đặt thành thẻ để Shin nhắc bạn.', 1) : '');
    return h;
  };
  CHECK.proto2 = function () { if (!g('b73.pg')) return 'Đoán mức thích của bạn'; return g('b73.pdl') ? '' : 'Chọn lúc làm xong'; };
  function protoCard(preview) {
    var K = protoK(); if (!K || !trim(g('b73.pw'))) return '';
    var real = +g('b73.real') || 0;
    return '<div class="protoc"><div class="protoc__h">' + cdIc(K[3], 18) + '<b>Việc thử nhỏ · ' + esc(K[1]) + '</b><span>' + (g('b73.pdl') ? 'Hạn ' + esc(ddmm(g('b73.pdl'))) : '') + '</span></div>' +
      '<p class="protoc__b">' + esc(protoSrc()) + '</p><p>' + esc(trim(g('b73.pw'))) + '</p>' + (trim(g('b73.pq')) ? '<p class="protoc__q">Mình muốn biết: ' + esc(trim(g('b73.pq'))) + '</p>' : '') +
      '<div class="protoc__m"><span>Đoán: <b>' + (+g('b73.pg') || '–') + '/5</b></span><span>Thử thật: <b>' + (real ? real + '/5' : '…') + '</b></span></div>' +
      (real && trim(g('b73.surp')) ? '<p class="protoc__s">Điều bất ngờ: ' + esc(trim(g('b73.surp'))) + '</p>' : '') +
      (preview ? '' : '<button type="button" class="btn btn--soft btn--sm" data-act="shoreOv" data-id="s7c">' + (real ? 'Sửa kết quả thử' : 'Thử xong rồi? Chấm thật') + '</button>') + '</div>';
  }
  function protoSum() { var K = protoK(); return { src: protoSrc(), k: K ? K[1] : '', w: trim(g('b73.pw')), q: trim(g('b73.pq')), guess: +g('b73.pg') || 0, real: +g('b73.real') || 0, surp: trim(g('b73.surp')), due: g('b73.pdl') || '' }; }

  /* ----- Nhiệm vụ lên bờ ----- */
  function shoreOf(id) { for (var i = 0; i < SHORE.length; i++) if (SHORE[i].id === id) return SHORE[i]; return null; }
  function shoreSel() { return obj('shore.sel'); }
  function shoreSt(id) { return obj('shore.st')[id] || 'chua'; }
  function shoreStName(st) { for (var i = 0; i < SHORE_ST.length; i++) if (SHORE_ST[i][0] === st) return SHORE_ST[i][1]; return ''; }
  function shoreIds() { var Sl = shoreSel(), L = []; SHORE.forEach(function (x) { if (Sl[x.id]) L.push(x.id); }); return L; }
  function shoreCard(id) {
    var x = shoreOf(id); if (!x) return ''; var on = !!shoreSel()[id];
    return '<div class="shore"><div class="shore__h">' + cdIc('anchor', 16) + '<b>' + esc(SHORE_T) + '</b><small>làm ngoài ứng dụng</small></div><p class="shore__t">' + cdIc(x.ic, 18) + '<span>' + esc(x.t) + '</span></p>' +
      '<button type="button" class="shore__b' + (on ? ' on' : '') + '" data-act="shoreSel" data-id="' + id + '" aria-pressed="' + on + '">' + (on ? PS.icon('check', 14, 3) + 'Đã thêm vào Việc trên bờ' : '+ Mình sẽ làm việc này') + '</button>' +
      '<small class="shore__f">Cuối khóa, bạn chọn ít nhất ' + SHORE_MIN + ' việc trên bờ để làm thật.</small></div>';
  }
  function shoreRow(x, edit) {
    var Sl = shoreSel(), on = !!Sl[x.id], st = shoreSt(x.id), due = Sl[x.id], late = on && st !== 'da' && due && due <= dayKey(new Date());
    if (edit) return '<div class="shr' + (on ? ' on' : '') + '"><button type="button" class="shr__ck" data-act="shoreSel" data-id="' + x.id + '" aria-pressed="' + on + '"><span class="dot">' + (on ? PS.icon('check', 13, 3.2) : '') + '</span>' + cdIc(x.ic, 18) + '<span>' + esc(x.t) + '</span></button>' +
      (on ? '<div class="shr__w"><small>Hạn ' + esc(ddmm(due)) + '</small>' + SHORE_WHEN.map(function (o) { var o2 = dayAdd(o[0]) === due; return '<button type="button" class="chip chip--s' + (o2 ? ' on' : '') + '" data-act="shoreWhen" data-id="' + x.id + '" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>' : '') + '</div>';
    return '<button type="button" class="shl shl--' + st + (late ? ' late' : '') + '" data-act="shoreOv" data-id="' + x.id + '">' + cdIc(x.ic, 18) + '<span class="shl__t">' + esc(x.t) + '<small>' + (late ? 'Tới hạn ' : 'Hạn ') + esc(ddmm(due)) + ' · ' + esc(shoreStName(st)) + '</small></span><span class="shl__st">' + (st === 'da' ? PS.icon('check', 15, 3) : PS.icon('next', 14)) + '</span></button>';
  }
  function shoreList() { var L = shoreIds(); if (!L.length) return ''; var dn = L.filter(function (id) { return shoreSt(id) === 'da'; }).length;
    return '<div class="shlist"><div class="shlist__h">' + cdIc('anchor', 16) + '<b>Việc trên bờ của tôi</b><span>' + dn + '/' + L.length + ' đã làm</span></div>' + L.map(function (id) { return shoreRow(shoreOf(id), 0); }).join('') + '</div>'; }
  STEP.shore = function () {
    var n = shoreIds().length;
    return shinSays('cheer', '<p>' + esc(SHORE_SAY) + '</p><p>Chọn ít nhất ' + SHORE_MIN + ' việc bạn sẽ làm thật, rồi đặt hạn.</p>', 56) + qh('Việc trên bờ của tôi', 'Đã chọn ' + n + ' việc') +
      '<div class="shrs">' + SHORE.map(function (x) { return shoreRow(x, 1); }).join('') + '</div><p class="ps-small">Làm xong, mở Sổ Thuyền Trưởng hoặc trang hải đồ để đánh dấu và ghi điều học được.</p>';
  };
  CHECK.shore = function () { var n = shoreIds().length; return n >= SHORE_MIN ? '' : 'Chọn ít nhất ' + SHORE_MIN + ' việc (' + n + '/' + SHORE_MIN + ')'; };
  function shoreOv(id) {
    var x = shoreOf(id); if (!x) return; var st = shoreSt(id), due = shoreSel()[id];
    var h = '<h2>' + esc(SHORE_T) + '</h2><p class="shore__t">' + cdIc(x.ic, 18) + '<span>' + esc(x.t) + '</span></p>' + (due ? '<p class="ps-small">Hạn ' + esc(ddmm(due)) + '</p>' : '') +
      '<div class="seg3">' + SHORE_ST.map(function (o) { return '<button type="button" class="' + (st === o[0] ? 'on' : '') + '" data-act="shoreSt" data-id="' + id + '" data-v="' + o[0] + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>' +
      '<label class="db__lab">Mình học được gì? <small>(một dòng)</small><input type="text" class="ta db__in ps-sel" data-k="shore.l.' + id + '" maxlength="120" value="' + esc(g('shore.l.' + id) || '') + '" placeholder="Ví dụ: anh ấy nói năm đầu khó nhất là nghe tiếng địa phương"></label>';
    if (id === 's7c' && protoK()) h += '<h3 class="qs">Thử thật rồi, bạn thích mức nào?</h3><div class="lks">' + [1, 2, 3, 4, 5].map(function (n) { return likeFace(n, +g('b73.real') === n, 'protoReal'); }).join('') + '</div>' +
      '<p class="ps-small">Lúc trước bạn đoán: ' + (+g('b73.pg') || '–') + '/5</p><label class="db__lab">Điều bất ngờ<input type="text" class="ta db__in ps-sel" data-k="b73.surp" maxlength="120" value="' + esc(g('b73.surp') || '') + '" placeholder="Ví dụ: dạy người khác khó hơn mình nghĩ, nhưng vui"></label>';
    h += '<div class="repbtns"><button type="button" class="btn" data-act="shoreDone" data-id="' + id + '">Lưu</button></div>';
    ov(h);
  }
  function shoreDone(id) {
    var ok = shoreSt(id) === 'da' && trim(g('shore.l.' + id)).length >= 6, had = !!S.xp['shore.' + id];
    if (ok && !had) { S.xp['shore.' + id] = SHORE_XP; markDay(); PS.toast('<b>Lên bờ thành công!</b> +' + SHORE_XP + ' XP'); sfx('ting'); }
    else if (shoreSt(id) === 'da' && !ok) PS.toast('Ghi một dòng điều bạn học được để nhận +' + SHORE_XP + ' XP nhé.');
    save(true); closeOv();
    if (nbOpen) drawNb(); else if (V.v === 'act') keepY(redrawStep); else { QUIET = true; render(false); QUIET = false; }
  }
  function shoreHome() {
    var L = shoreIds(); if (!L.length) return ''; var today = dayKey(new Date()), soon = dayAdd(1);
    var due = L.filter(function (id) { return shoreSt(id) !== 'da' && shoreSel()[id] <= soon; });
    var dn = L.filter(function (id) { return shoreSt(id) === 'da'; }).length;
    if (dn >= L.length) return '';
    return '<div class="shhome"><div class="shlist__h">' + cdIc('anchor', 16) + '<b>Việc trên bờ</b><span>' + dn + '/' + L.length + ' đã làm</span></div>' +
      (due.length ? due.slice(0, 2).map(function (id) { return shoreRow(shoreOf(id), 0); }).join('') : '<p class="ps-small">Chưa tới hạn việc nào. Làm sớm cũng tốt!</p>') + '</div>';
  }
  function shoreSum() { var Sl = shoreSel(); return shoreIds().map(function (id) { return { id: id, t: shoreOf(id).t, due: Sl[id], st: shoreSt(id), l: trim(g('shore.l.' + id)) }; }); }

  /* ----- Cảng Khởi Hành ----- */
  function nLabel(n) { for (var i = 0; i < OPEN_N.length; i++) if (OPEN_N[i][0] === n) return OPEN_N[i][1]; return '—'; }
  STEP.open2 = function () {
    var n = g('f1.n') || '', su = g('f1.sure') == null ? 5 : +g('f1.sure');
    var h = qh('Bây giờ, theo bạn, sau 3 năm ở Nhật người ta có thể đi mấy hướng?') + '<div class="chips">' + OPEN_N.map(function (x) { return '<button type="button" class="chip' + (n === x[0] ? ' on' : '') + '" data-act="pick" data-k="f1.n" data-v="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' +
      qh('Hướng đi sau 3 năm của bạn giờ đã rõ mấy phần?') + '<div class="slide1"><input type="range" min="0" max="10" step="1" value="' + su + '" data-k="f1.sure" aria-label="Rõ mấy phần"><div class="slide1__l"><span>Chưa rõ gì</span><b id="sureOut">' + su + '/10</b><span>Rất rõ</span></div></div>';
    if (n) h += '<div class="cmp2"><div><small>Lúc nhận thuyền</small><b>' + esc(nLabel(g('x1.n'))) + '</b><span>Rõ ' + (g('x1.sure') == null ? 5 : +g('x1.sure')) + '/10</span></div><div class="cmp2__ar">' + PS.icon('next', 20, 2.6) + '</div><div class="now"><small>Bây giờ</small><b>' + esc(nLabel(n)) + '</b><span id="sureOut2">Rõ ' + su + '/10</span></div></div>' +
      '<p class="ps-small">Bạn đã thấy ' + fogOpen() + '/8 đảo và gặp ' + cardN() + ' Senpai.</p>';
    return h;
  };
  CHECK.open2 = function () { return g('f1.n') ? '' : 'Chọn số hướng'; };
  STEP.ps = function () { /* PS1.3.41: viết tái bút cho thư CD01 */
    var lt = c1Val('letter');
    return (lt ? '<div class="c1 c1--letter"><span class="c1__tag">' + PS.icon('book', 13) + 'Từ CD01</span><div><small>Thư bạn gửi mình 5 năm sau</small><q>' + esc(cut1(lt, 260)) + '</q></div></div>' + qh('Viết thêm một dòng tái bút cho lá thư đó')
      : qh('Viết một câu gửi mình 5 năm sau')) + areaHTML('f1.ps', 'Tái bút: ', 3, 300);
  };
  CHECK.ps = function () { return trim(g('f1.ps')).replace(/^Tái bút:\s*/, '').length >= 6 ? '' : 'Viết vài chữ nhé'; };
  function sheetData() { /* PS1.3.45 (thầy góp ý 2): mỗi mục gắn mã bến [tiêu đề, dòng, mã bến], xếp theo thứ tự bến; thêm b12, b21, b23, b32, thuận lợi/thách thức kế hoạch A, câu hỏi b71 */
    var p = prof(), f = flag(), bs = null, wl = ''; BASE5.forEach(function (b) { if (b.id === g('b22.base')) bs = b; }); WITH3.forEach(function (o) { if (o[0] === g('b53.with')) wl = o[1]; });
    var L = [], add = function (t, lines, b) { lines = lines.filter(function (x) { return trim(x); }); if (lines.length) L.push([t, lines, b]); };
    var cut = function (t, pre) { t = trim(t); return t.indexOf(pre) === 0 ? trim(t.slice(pre.length)) : t; };
    var c1L = ['main', 'me', 'value'].map(function (k) { var t = c1Val(k); return t ? C1_LAB[k] + ': ' + t : ''; });
    add('Từ CD01', c1L, 'p0');
    add('Điểm xuất phát', [trim(g('x1.now')) ? 'Lúc nhận thuyền, tôi nghĩ: ' + trim(g('x1.now')) : '', trim(g('x1.goal')) ? 'Mục tiêu khóa: ' + trim(g('x1.goal')) : ''], 'p0');
    var isC = isleOf(g('b13.isl'));
    add('Hướng tôi quan tâm nhất', [isC ? isC.n + (trim(g('b13.why')) ? '. Vì: ' + trim(g('b13.why')) : '') : ''], 'b1');
    add('Điều tôi mang theo từ chuyện anh chị', [trim(g('b21.take'))], 'b2');
    add('Nền tôi xây ở JPC', [(bs ? bs.n + ': ' : '') + (g('b22.act') || '')], 'b2');
    add('Câu tôi muốn hỏi anh chị đi trước', [trim(g('b23.q'))], 'b2');
    if (g('b31.v') || g('b33.work') || sucList().length) add('Điều tôi coi trọng', ['Nghiêng rõ nhất: ' + lean(), sucList().length ? SUCC_T + ': ' + sucList().map(function (x) { return x.t + (x.w ? ' (' + x.w + ')' : ''); }).join('; ') : 'Đi làm là để: ' + (cut(g('b33.work'), 'Với mình, đi làm là để') || '…'), '10 năm nữa sống tốt là: ' + (cut(cut(g('b33.life'), 'Ở tuổi 30, một cuộc sống tốt với mình là'), '10 năm nữa, một cuộc sống tốt với mình là') || '…')], 'b3');
    var WL = windList();
    if (WL.length) add('Điều có thể làm đổi kế hoạch', WL.map(function (w) { return w.t + ' (' + (w.z === 'in' ? 'mình giải quyết được' : 'ngoài khả năng') + ')' + (w.a ? ': ' + w.a : ''); }), 'b3');
    else if (g('b32.h') != null) add('Điều có thể làm đổi kế hoạch', [windTxt('b32.h') + (trim(g('b32.hard')) ? ': ' + trim(g('b32.hard')) : '')], 'b3');
    var NS = needSum();
    VOY.forEach(function (x) { var is = voyIsle(x[0]); if (!is) return; var ex = [];
      if (x[0] === 'b41') { if (NS.co.length) ex.push('Thuận lợi: ' + NS.co.join('; ')); if (NS.thieu.length) ex.push('Thách thức: ' + NS.thieu.join('; ')); if (trim(g('b41.nd'))) ex.push(trim(g('b41.nd'))); }
      add(voyTitle(x[0]) + (leanVoy() === x[0] ? '  ★ đang nghiêng' : ''), [is.n + (g(x[0] + '.jl') ? ' · Tiếng Nhật: ' + (g(x[0] + '.jl') === 'x' ? 'vừa đủ' : g(x[0] + '.jl')) : '') + ' · Cân: ' + voyScore(x[0]) + '/100'].concat(msList(x[0])).concat(ex), 'b4'); var lst = L[L.length - 1]; if (lst && lst[2] === 'b4' && !lst[3]) lst[3] = x[0]; });
    if (blk()) add('Khi đường bị chặn', [blk().t + '. Bước đầu: ' + (g('b52.first') || '…')], 'b5');
    var CS = crossSum(); if (S.done.b53 || CS.keep.length) add('Khi đứng giữa ngã rẽ', ['Tôi hay giữ: ' + (CS.keep.join(', ') || '…') + (CS.lose.length ? '. Hay buông: ' + CS.lose.join(', ') : '') + (CS.whyTop ? '. Dễ đổi ý khi: ' + lowF(CS.whyTop) : ''), trim(g('b53n.me'))], 'b5');
    var ad = curAd(), ps = p3Sum();
    if (ad) add(isPlan(ad) ? 'Kế hoạch kinh doanh tôi đã đọc' : 'Tin tuyển dụng 3 năm sau', [(isPlan(ad) ? ad.n : ad.vt + ' · ' + ad.lu + ' (tham khảo)') + (g('b61.why') ? '. Cần chuẩn bị: ' + trim(g('b61.why')) : '')], 'b6');
    if (S.d['b62.q'] || S.done.b62) add('Phỏng vấn 3 năm sau', [ivWho().n + ' · ' + ivQs().map(function (id) { var q = qOf(id); return q.rq ? 'Hỏi về: ' + q.ev : q.vi; }).join(' · ')], 'b6');
    if (p3Any(ps)) add('Kế hoạch 3 năm ở Nhật', PLAN3_Y.filter(function (y) { return ps['y' + y[0]].length; }).map(function (y) { return y[1] + ': ' + ps['y' + y[0]].join('; '); }), 'b6');
    if (trialTxt() && !g('b73.pk')) { var rI = rtTrialId(), rS = rtState(rI), rD = rtDays(rI); add('Thử nhỏ 2 tuần', [trialTxt() + (wl ? ' (' + wl + ')' : ''), (rS === 'active' || rS === 'keep' || rS === 'master') ? 'Rèn cùng Shin routine: ' + (PS.routineLib()[rI] || '') + (rD != null ? ', ' + rD + '/14 ngày ghi nhận' : '') : ''], 'b6'); }
    if (g('b71.key')) add('Người giúp tôi', [ringName(g('b71.key')) + (trim(g('b71.ask')) ? '. Tôi sẽ hỏi: ' + trim(g('b71.ask')).replace(/\s*\n\s*/g, ' ') : ''), trim(g('b71.met')) ? 'Đã gặp, lời khuyên: ' + trim(g('b71.met')) : ''], 'b7');
    if (trim(g('b72.why')) || hardSum().length) add('Học từ công việc', [trim(g('b72.why')) ? 'Câu “Tại sao?” tôi sẽ hỏi: ' + trim(g('b72.why')) : '', hardSum().length ? 'Khi được giao việc khó, tôi chọn: ' + hardSum().join(' · ') : ''], 'b7');
    else if (g('b72.h')) add('Cách tôi học từ công việc', [g('b72.h') + (trim(g('b72.how')) ? ' · ' + trim(g('b72.how')) : '')], 'b7');
    if (lessonTitle()) add('Bài học từ trải nghiệm', [lessonTitle(), trim(g('b73.m2')) ? 'Tôi rút ra: ' + trim(g('b73.m2')) : '', trim(g('b73.m3')) ? 'Lần sau: ' + trim(g('b73.m3')) : ''], 'b7');
    var PR = protoSum(); if (PR.w) add('Việc thử nhỏ “Thử để biết”', [PR.k + ': ' + PR.w + (PR.src ? ' (' + PR.src + ')' : ''), 'Đoán thích ' + PR.guess + '/5' + (PR.real ? ', thử thật ' + PR.real + '/5' + (PR.surp ? '. Bất ngờ: ' + PR.surp : '') : (PR.due ? ', hạn ' + ddmm(PR.due) : ''))], 'b7');
    if (g('f1.n') || S.done.f1) add('Độ mở', ['Lúc nhận thuyền: ' + nLabel(g('x1.n')) + ', rõ ' + (g('x1.sure') == null ? 5 : g('x1.sure')) + '/10. Bây giờ: ' + nLabel(g('f1.n')) + ', rõ ' + (g('f1.sure') == null ? 5 : g('f1.sure')) + '/10.', trim(g('f1.change')), trim(g('f1.ps'))], 'fin');
    if (chestSel().length) add(CHEST_MY, chestSum().map(function (x) { return x.n + (x.w ? ': ' + x.w : ''); }), 'fin'); /* PS1.3.51 */
    if (dbN()) add(DREAM_T, [dbSum().join(' · ')], 'fin'); /* PS1.3.48 */
    if (shoreIds().length) add('Việc trên bờ của tôi', shoreSum().map(function (x) { return x.t + ' (hạn ' + ddmm(x.due) + ', ' + shoreStName(x.st).toLowerCase() + ')' + (x.l ? ': ' + x.l : ''); }), 'fin');
    return { p: p, f: f, L: L };
  }
  STEP.sheet = function () {
    var D2 = sheetData(), p = D2.p;
    var h = shinSays('proud', '<p>Đây là <b>Hướng đi của tôi</b>: cả khóa trên một trang. Lưu ảnh hoặc in ra nhé.</p>', 60) +
      '<div class="sheet" id="sheet"><div class="sheet__h"><div class="sheet__flag">' + flagSVG(D2.f.s, D2.f.c, 64, 0) + '</div><div><small>PROSKILLS · CAREER DESIGN 02</small><b>Hướng đi của tôi</b><span>' + esc((p.name || '') + (p.cls ? ' · Lớp ' + p.cls : '')) + '</span>' +
      (g('x1.motto') ? '<em>“' + esc(g('x1.motto')) + '”</em>' : '') + '</div></div>' + chestStrip() + '<div class="sheet__cmp">' + compassSVG(pv(), 330) + '</div>' +
      (dbN() ? '<div class="sheet__db"><b>' + esc(DREAM_T) + '</b>' + dbBoard(0) + '</div>' : '') +
      D2.L.filter(function (sec) { return sec[0] !== DREAM_T && sec[0] !== CHEST_MY; }).map(function (sec) { var bn = benOf(sec[2]); return '<div class="sheet__s' + (sec[3] && planK(sec[3]) ? ' sheet__s--pl' : '') + '">' + (sec[3] && planK(sec[3]) ? '<span class="sheet__pl">' + planArt(planK(sec[3]), 48) + '</span>' : '') + '<b>' + (bn ? '<i class="sheet__ic" title="' + esc(bn.n) + '">' + cdIc(bn.ic, 14) + '</i>' : '') + esc(sec[0]) + '</b>' + sec[1].map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>'; }).join('') +
      '<p class="sheet__ft">Proskills · Khoa Kỹ năng JPC · ' + esc(CD2_VER) + '</p></div>' +
      '<div class="repbtns"><button type="button" class="btn" data-act="sheetImg">' + PS.icon('save', 18) + 'Lưu ảnh</button><button type="button" class="btn btn--soft" data-act="sheetPrint">In / PDF</button></div>';
    return h;
  };
  function reportMsg() {
    var p = prof(), t = S.demo ? null : PS.teacher(), D2 = sheetData();
    return ['Em chào ' + (t ? t.pron + ' ' + t.name : 'thầy cô') + '. Em là ' + (p.name || '') + (p.cls ? ', lớp ' + p.cls : '') + (p.sid ? ' (' + p.sid + ')' : '') + '. Em đã xong CD02 · Hải Đồ La Bàn.'].concat(D2.L.map(function (sec) { return '- ' + sec[0] + ': ' + sec[1].join('; '); })).concat(futSum() ? ['- ' + FUT.t + ': “' + futSum().t + '” (ký: ' + futSum().sig + '; đồng ý cho thầy cô dùng ẩn tên: ' + (futSum().ok ? 'có' : 'không') + ')'] : []).concat(['Em cảm ơn ' + (t ? t.pron : 'thầy cô') + ' ạ.']).join('\n');
  }
  STEP.send = function () {
    var t = S.demo ? null : PS.teacher(), msg = reportMsg(), sent = g('rep.end');
    var h = shinSays('hi', '<p>Gửi bản này cho thầy cô nhé. Thầy cô sẽ biết bạn đang nghĩ gì để giúp bạn đúng lúc.</p>', 60);
    if (S.demo) h += '<p class="ps-small">Bản demo: không gửi thật.</p>';
    else if (!t) h += '<div class="ps-form"><label>Thầy cô hướng dẫn' + PS.teacherSelect('id="repT"') + '</label></div>';
    else h += '<p class="qsub">Gửi tới <b>' + esc(t.name) + '</b> qua Teams. Gửi kèm ảnh Hướng đi của tôi nhé.</p>';
    h += '<textarea class="ta repmsg" id="repMsg" rows="8" readonly>' + esc(msg) + '</textarea><div class="repbtns"><button type="button" class="btn btn--soft" data-act="copyMsg" data-k="rep.end">Chép tin nhắn</button>' +
      (t ? '<a class="btn" data-act="repTeams" target="_blank" rel="noopener" href="https://teams.microsoft.com/l/chat/0/0?users=' + encodeURIComponent(t.email) + '&message=' + encodeURIComponent(msg) + '">Mở Teams</a>' : '') + '</div>' +
      (sent ? '<p class="trialc__ok">' + PS.icon('check', 16, 3) + 'Đã gửi. Gửi lại lúc nào cũng được.</p>' : '<p class="ps-small">Chưa gửi được thì để sau. Bản này luôn ở Đảo Khởi Hành.</p>');
    return h;
  };
  function certHTML() {
    var p = prof(), f = flag(), d = new Date(S.fin || Date.now());
    return '<div class="cert"><div class="cert__in"><small>Proskills · Career Design 02</small><h2>Bằng Thuyền Trưởng Vững Vàng</h2><div class="cert__flag">' + flagSVG(f.s, f.c, 90, 1) + '</div>' +
      '<p>Trao cho</p><b class="cert__nm">' + esc(p.name || given()) + '</b><p>đã ghé đủ ' + BEN.length + ' bến, vẽ 3 kế hoạch 5 năm và biết điều mình coi trọng.</p>' +
      (g('x1.motto') ? '<em>“' + esc(g('x1.motto')) + '”</em>' : '') + '<div class="cert__ft"><span>' + esc(PS.fmtDate ? PS.fmtDate(d) : d.toLocaleDateString('vi-VN')) + '</span>' + stampHTML(GOAL_PORT) + '</div></div></div>';
  }
  STEP.cert = function () {
    return certHTML() + '<div class="shipwrap">' + shipSVG2(shipP(), flag().s, flag().c, 230) + '</div>' +
      shinSays('cheer', '<p>Shin tặng bạn trang phục <b>Thuyền trưởng</b> trong Tủ đồ của Shin (Shin Routine › Sổ tay › Cài đặt).</p><p>Nhớ nhé: hướng nào cũng bắt đầu từ 3 năm ở Nhật. Giữ vững 3 năm đó, nhiều cửa sẽ mở ra.</p>', 64) +
      '<a class="srclink" href="' + esc(TIKME_HOME) + '" target="_blank" rel="noopener">' + cdIc('link', 15) + 'Đọc thêm chuyện thật trên Tikme</a>' + tikCopy(TIKME_HOME);
  };


  /* ----- PS1.3.48 (bản 3 · đợt 5) Bảng ước mơ 10 năm nữa: lưới 3×3, ô giữa là cờ của bạn; Shin dán sẵn tối đa 4 ô từ bài đã làm ----- */
  var dbI = -1;
  function dbLab(k) { var t = ''; DREAM_GRP.forEach(function (gr) { gr[1].forEach(function (x) { if (x[0] === k) t = x[1]; }); }); return t + (k === 'jl' ? ' ' + dbJl() : ''); }
  function dbJl() { var j = g('b41.jl'); return j && j !== 'x' ? j : 'N2'; }
  function dbCells() { var a = g('f2.db'); return a && a.length === 9 ? a : null; }
  function dbN() { var a = dbCells(), n = 0; if (a) a.forEach(function (k, i) { if (k && i !== 4) n++; }); return n; }
  function dbSum() { var a = dbCells(); if (!a) return []; var o = []; a.forEach(function (k, i) { if (k && i !== 4) o.push(trim(g('f2.dbt' + i)) || dbLab(k)); }); return o; }
  function dbInit() {
    if (dbCells()) return;
    var a = ['', '', '', '', '', '', '', '', ''], sug = [], add = function (k) { if (k && sug.indexOf(k) < 0 && sug.length < 4) sug.push(k); };
    var isA = voyIsle('b41'); if (isA && isA.id !== 'o') { add(DREAM_ISLE[isA.id]); add(DREAM_SIDE[isA.side]); }
    add(DREAM_GRPJOB[adGrp()]);
    var vv = c1Val('value') || ''; DREAM_VAL.forEach(function (x) { if (vv.indexOf(x[0]) > -1) add(x[1]); });
    if (g('b41.jl') && g('b41.jl') !== 'x') add('jl');
    var slots = [0, 2, 6, 8], used = [];
    sug.forEach(function (k, i) { a[slots[i]] = k; S.d['f2.dbt' + slots[i]] = dbLab(k); used.push(slots[i]); });
    S.d['f2.db'] = a; S.d['f2.dbs'] = used; save();
  }
  function dbBoard(edit) {
    var a = dbCells() || ['', '', '', '', '', '', '', '', ''], sg = g('f2.dbs') || [], f = flag();
    return '<div class="db' + (edit ? ' db--edit' : '') + '">' + a.map(function (k, i) {
      if (i === 4) return '<div class="db__c db__c--me">' + flagSVG(f.s, f.c, 58, 1) + '<b>Tôi</b><small>10 năm nữa</small></div>';
      var su = k && sg.indexOf(i) > -1, inner = k ? dreamSticker(k, 50, dbJl()) + '<span>' + esc(trim(g('f2.dbt' + i)) || dbLab(k)) + '</span>' : (edit ? '<i>+</i><span>Chạm để dán</span>' : '');
      var cls = 'db__c' + (k ? ' on' : '') + (su ? ' sug' : '');
      return edit ? '<button type="button" class="' + cls + '" data-act="dbCell" data-v="' + i + '" aria-label="Ô ' + (i + 1) + '">' + inner + (su ? '<em>Shin gợi ý</em>' : '') + '</button>' : '<div class="' + cls + '">' + inner + '</div>';
    }).join('') + '</div>';
  }
  STEP.dream = function () {
    dbInit();
    var n = dbN(), sg = (g('f2.dbs') || []).length;
    return shinSays('wink', '<p>10 năm nữa, bạn mong cuộc sống của mình có gì? Chạm từng ô để dán hình.</p>' + (sg ? '<p>Shin dán sẵn ' + sg + ' ô theo bài bạn đã làm. Giữ hay đổi tùy bạn.</p>' : ''), 60) +
      qh(DREAM_T, 'Dán ít nhất ' + DREAM_MIN + ' ô. Không có đúng sai.') + dbBoard(1) + '<p class="db__n" id="dbN">' + n + '/8 ô</p>';
  };
  CHECK.dream = function () { var n = dbN(); return n >= DREAM_MIN ? '' : 'Dán ít nhất ' + DREAM_MIN + ' ô (' + n + '/' + DREAM_MIN + ')'; };
  function dbPicker(i) {
    dbI = i; var a = dbCells(), cur = a[i];
    var h = '<h2>Chọn hình cho ô này</h2>' + DREAM_GRP.map(function (gr) {
      return '<h3 class="qs">' + esc(gr[0]) + '</h3><div class="dbp">' + gr[1].map(function (x) { var on = cur === x[0];
        return '<button type="button" class="dbp__b' + (on ? ' on' : '') + '" data-act="dbPick" data-v="' + x[0] + '" aria-pressed="' + on + '">' + dreamSticker(x[0], 44, dbJl()) + '<span>' + esc(dbLab(x[0])) + '</span></button>'; }).join('') + '</div>';
    }).join('') +
      '<label class="db__lab">Ghi một dòng cho ô này <small>(không bắt buộc)</small><input type="text" class="ta db__in" id="dbIn" data-k="f2.dbt' + i + '" maxlength="40" value="' + esc(g('f2.dbt' + i) || '') + '" placeholder="Ví dụ: Nhà 2 tầng cho bố mẹ"></label>' +
      '<div class="repbtns">' + (cur ? '<button type="button" class="btn btn--soft" data-act="dbClear">Bỏ hình ô này</button>' : '') + '<button type="button" class="btn" data-act="dbDone">Xong</button></div>';
    ov(h);
  }
  function dbPick(k) {
    var a = dbCells(); if (!a || dbI < 0) return; var old = a[dbI], t = trim(g('f2.dbt' + dbI));
    a[dbI] = k; S.d['f2.db'] = a;
    if (!t || (old && t === dbLab(old))) S.d['f2.dbt' + dbI] = dbLab(k);
    var sg = g('f2.dbs') || [], p = sg.indexOf(dbI); if (p > -1 && old !== k) { sg.splice(p, 1); S.d['f2.dbs'] = sg; }
    save(); sfx('ting');
    var box = D.getElementById('cdov'); if (!box) return;
    var bs = box.querySelectorAll('.dbp__b'); for (var j = 0; j < bs.length; j++) { var on = bs[j].getAttribute('data-v') === k; bs[j].className = 'dbp__b' + (on ? ' on' : ''); bs[j].setAttribute('aria-pressed', on); }
    var inp = D.getElementById('dbIn'); if (inp) inp.value = S.d['f2.dbt' + dbI] || '';
    var lb = box.querySelector('.db__lab'); if (lb && lb.scrollIntoView) { try { lb.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { lb.scrollIntoView(false); } }
  }
  function dbClose(clear) {
    if (clear && dbI > -1) { var a = dbCells(); a[dbI] = ''; S.d['f2.db'] = a; delete S.d['f2.dbt' + dbI]; var sg = g('f2.dbs') || [], p = sg.indexOf(dbI); if (p > -1) { sg.splice(p, 1); S.d['f2.dbs'] = sg; } }
    dbI = -1; save(); closeOv(); if (V.v === 'act') keepY(redrawStep);
  }
  /* ảnh Bảng ước mơ cho ảnh lưu (SVG thuần, vẽ vào canvas) */
  function dbSVG() {
    var a = dbCells(); if (!a) return ''; var f = flag(), T = 300, s = '';
    function wrap(t) { t = String(t || ''); var ws = t.split(' '), L = [''], i; for (i = 0; i < ws.length; i++) { var c = L[L.length - 1]; if ((c + ' ' + ws[i]).length > 17 && c) { if (L.length === 2) { L[1] += '…'; break; } L.push(ws[i]); } else L[L.length - 1] = c ? c + ' ' + ws[i] : ws[i]; } return L; }
    a.forEach(function (k, i) {
      var x = (i % 3) * T, y = Math.floor(i / 3) * T;
      s += '<rect x="' + (x + 8) + '" y="' + (y + 8) + '" width="' + (T - 16) + '" height="' + (T - 16) + '" rx="26" fill="' + (i === 4 ? '#FBEDE5' : '#FFFFFF') + '" stroke="' + (i === 4 ? '#D97757' : '#E6E1D6') + '" stroke-width="3"/>';
      if (i === 4) { s += flagSVG(f.s, f.c, 170, 1).replace('<svg ', '<svg x="' + (x + 65) + '" y="' + (y + 62) + '" height="91" ') + '<text x="' + (x + 150) + '" y="' + (y + 200) + '" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="700" fill="#141413">Tôi</text><text x="' + (x + 150) + '" y="' + (y + 236) + '" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#6F6E69">10 năm nữa</text>'; return; }
      if (!k) return;
      s += '<g transform="translate(' + (x + 150) + ' ' + (y + 118) + ') scale(4.4)">' + hand(propArt(k, dbJl())) + '</g>';
      wrap(trim(g('f2.dbt' + i)) || dbLab(k)).forEach(function (ln, j) { s += '<text x="' + (x + 150) + '' + '" y="' + (y + 226 + j * 30) + '" text-anchor="middle" font-family="sans-serif" font-size="25" font-weight="600" fill="#141413">' + esc(ln) + '</text>'; });
    });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" width="900" height="900">' + s + '</svg>';
  }


  /* ----- PS1.3.51 (bản 4 · đợt 3) Rương kho báu (f1) · Thư trong chai (7 bến) · Thư gửi thuyền trưởng tương lai ----- */
  var chestFx = 0, chestView = '';
  function chestOf(id) { for (var i = 0; i < CHEST.length; i++) if (CHEST[i][0] === id) return CHEST[i]; return null; }
  function chestSel() { return (g('f1.tr') || []).filter(function (id) { return !!chestOf(id); }); }
  function chestSum() { return chestSel().map(function (id) { var c = chestOf(id); return { id: id, n: c[2], w: trim(g('f1.trw.' + id)) }; }); }
  function chestLines(id) { /* bài của học viên ở bến đó, lấy từ bản Hướng đi */
    var o = [], L = sheetData().L;
    L.forEach(function (sec) { if (sec[2] === id && o.length < 3 && sec[0] !== DREAM_T && sec[0] !== CHEST_MY) o.push('<li><b>' + esc(sec[0]) + '</b>' + esc(cut1(sec[1].join(' · '), 120)) + '</li>'); });
    return o.length ? o.join('') : '<li>' + esc('Bạn chưa ghi gì ở bến này. Quay lại bến để làm thêm cũng được.') + '</li>';
  }
  function chestCard(id) {
    var c = chestOf(id), b = benOf(id), on = chestSel().indexOf(id) > -1;
    return '<div class="trc" id="trc"><div class="trc__h">' + dreamSticker(c[1], 44) + '<span><b>' + esc(c[2]) + '</b><small>' + esc(c[3]) + (b ? ' · ' + esc(b.n) : '') + '</small></span></div>' +
      '<p class="trc__s">' + cdIc('doc', 13) + 'Bạn đã làm ở bến này</p><ul class="trc__l">' + chestLines(id) + '</ul>' +
      '<button type="button" class="trc__pick' + (on ? ' on' : '') + '" data-act="chestPick" data-v="' + id + '" aria-pressed="' + on + '">' + (on ? PS.icon('check', 15, 3) + 'Món quý của bạn · chạm để bỏ chọn' : PS.icon('star', 15) + 'Chọn là món quý nhất') + '</button></div>';
  }
  STEP.chest = function () {
    var sel = chestSel(), fx = chestFx, h;
    if (!g('f1.tro')) return shinSays('wink', '<p>' + esc(SHIN_TALK.chestHi) + '</p>', 60) +
      '<div class="chest"><button type="button" class="chest__btn" data-act="chestOpen" aria-label="Mở rương kho báu">' + chestArt(0) + '<span class="btn btn--go">' + cdIc('key', 18) + 'Mở rương</span></button></div>';
    chestFx = 0;
    h = qh(CHEST_T, 'Chạm từng món để xem lại bài của bạn. Chọn 1–' + CHEST_MAX + ' món quý nhất.') +
      '<div class="chest chest--open' + (fx && !RM ? ' chest--fx' : '') + '">' + chestArt(1) + '</div>' +
      '<div class="tri' + (fx && !RM ? ' tri--fx' : '') + '">' + CHEST.map(function (c, i) {
        var on = sel.indexOf(c[0]) > -1, cur = chestView === c[0];
        return '<button type="button" class="tri__b' + (on ? ' on' : '') + (cur ? ' cur' : '') + '" data-act="chestView" data-v="' + c[0] + '" aria-pressed="' + cur + '"' + (fx ? ' style="animation-delay:' + (0.45 + i * 0.08).toFixed(2) + 's"' : '') + '>' +
          dreamSticker(c[1], 44) + '<span>' + esc(c[2]) + '</span>' + (on ? '<em>' + PS.icon('star', 11) + '</em>' : '') + '</button>'; }).join('') + '</div>';
    if (chestView) h += chestCard(chestView);
    if (sel.length) h += '<h3 class="qs">Món quý nhất của bạn (' + sel.length + '/' + CHEST_MAX + ')</h3>' + sel.map(function (id) { var c = chestOf(id);
      return '<label class="trw"><span class="trw__h">' + dreamSticker(c[1], 30) + '<b>' + esc(c[2]) + '</b></span><small>' + esc(CHEST_Q) + '</small>' +
        '<input type="text" class="ta trw__in ps-sel" data-k="f1.trw.' + id + '" maxlength="120" value="' + esc(g('f1.trw.' + id) || '') + '" placeholder="' + esc(CHEST_PH) + '"></label>'; }).join('');
    else h += '<p class="ps-small trc__hint">Chưa chọn món nào. Chạm một món, rồi bấm “Chọn là món quý nhất”.</p>';
    if (trim(g('f1.change'))) h += '<div class="c1"><span class="c1__tag">' + PS.icon('book', 13) + 'Bài cũ</span><div><small>Bạn đã viết: mình khác đi điều gì</small><q>' + esc(cut1(g('f1.change'), 200)) + '</q></div></div>';
    return h;
  };
  CHECK.chest = function () {
    if (!g('f1.tro')) return 'Mở rương nhé';
    var sel = chestSel(); if (!sel.length) return 'Chọn ít nhất 1 món quý';
    for (var i = 0; i < sel.length; i++) if (trim(g('f1.trw.' + sel[i])).length < 4) return 'Viết 1 dòng cho mỗi món';
    return '';
  };
  function chestPick(id) {
    var A = chestSel().slice(), i = A.indexOf(id);
    if (i > -1) A.splice(i, 1); else { if (A.length >= CHEST_MAX) { PS.toast('Chọn tối đa ' + CHEST_MAX + ' món. Bỏ một món trước nhé.'); return; } A.push(id); sfx('ting'); }
    S.d['f1.tr'] = A; save(); keepY(redrawStep);
  }
  function chestStrip(w) { /* dải món quý ở đầu Hướng đi */
    var L = chestSum(); if (!L.length) return '';
    return '<div class="sheet__tr"><b>' + esc(CHEST_MY) + '</b><div class="sheet__tri">' + L.map(function (x) { var c = chestOf(x.id);
      return '<div>' + dreamSticker(c[1], w || 40) + '<span><b>' + esc(x.n) + '</b>' + (x.w ? esc(x.w) : '') + '</span></div>'; }).join('') + '</div></div>';
  }
  function trSVG() { /* ảnh lưu: dải món quý */
    var L = chestSum(); if (!L.length) return ''; var s = '';
    L.forEach(function (x, i) { var c = chestOf(x.id), cx = 450 + (i - (L.length - 1) / 2) * 280;
      s += '<rect x="' + (cx - 72) + '" y="8" width="144" height="144" rx="30" fill="#FFFFFF" stroke="#E6E1D6" stroke-width="3"/><g transform="translate(' + cx + ' 80) scale(3.4)">' + hand(propArt(c[1])) + '</g>' +
        '<text x="' + cx + '" y="190" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="700" fill="#141413">' + esc(x.n) + '</text>'; });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 210" width="900" height="210">' + s + '</svg>';
  }

  /* Thư trong chai: vớt sau con dấu mỗi bến (S.btl[mã bến] = lúc mở thư) */
  function btlOf(bid) { var id = BOTTLE[bid]; return id ? spOf(id) : null; }
  function btlN() { var n = 0; BEN.forEach(function (b) { if (S.btl[b.id]) n++; }); return n; }
  function lowA(sp) { var a = sp.a || sp.n; return a.charAt(0).toLowerCase() + a.slice(1); }
  function btlCard(b) {
    var sp = btlOf(b.id); if (!sp) return ''; var got = !!S.btl[b.id];
    return '<button type="button" class="btlc' + (got ? ' got' : '') + '" data-act="btlOpen" data-st="' + b.id + '"><span class="btlc__ic">' + bottleArt(52, 1) + '</span><span class="btlc__t"><b>' + esc(got ? SHIN_TALK.btlAgain : SHIN_TALK.btlNew) + '</b><small>' + esc(got ? sp.a + ' · ' + sp.jl : SHIN_TALK.btlTap) + '</small></span>' + PS.icon('next', 16, 2.4) + '</button>';
  }
  function btlRow() { /* Sổ Thuyền Trưởng: 7 chai, chai của bến đã có dấu thì mở được */
    return '<div class="lbk__sl"><b>' + esc(BOTTLE_T) + '</b><span>' + btlN() + ' / ' + BEN.length + '</span></div><div class="lbk__btl">' + BEN.map(function (b, i) {
      var st = !!S.stamp[b.id], got = !!S.btl[b.id];
      return st ? '<button type="button" class="lbtl' + (got ? ' got' : ' new') + '" data-act="btlOpen" data-st="' + b.id + '" aria-label="' + esc(BOTTLE_T + ' ' + b.n) + '">' + cdIc('bottle', 20) + '<small>' + (i + 1) + '</small></button>'
        : '<span class="lbtl lbtl--no" title="' + esc(b.n) + '">' + cdIc('bottle', 20) + '<small>' + (i + 1) + '</small></span>'; }).join('') + '</div>';
  }
  function btlOv(bid) {
    var sp = btlOf(bid), b = benOf(bid); if (!sp || !b || !S.stamp[bid]) return;
    var first = !S.btl[bid]; if (first) { S.btl[bid] = Date.now(); save(); }
    sfx('pop');
    var nx = nextBen(); if (nx === b) nx = null;
    ov('<div class="btlov' + (RM ? '' : ' btlov--fx') + '"><div class="btlov__fx">' + bottleArt(104, 1) + '</div>' +
      '<div class="letter"><div class="letter__in"><small>' + cdIc('bottle', 14) + esc(BOTTLE_T) + ' · ' + esc(b.n) + '</small><q>' + esc(sp.q) + '</q><b>' + esc(sp.n) + ' · ' + esc(sp.jl) + '</b><span>' + esc(sp.tag) + '</span></div></div>' +
      '<p class="btlov__n">Bạn đã vớt ' + btlN() + '/' + BEN.length + ' chai · xem lại ở Sổ Thuyền Trưởng</p>' +
      '<button type="button" class="btn btn--soft btn--w" data-act="btlSp" data-id="' + sp.id + '">' + cdIc('card', 18) + 'Đọc chuyện của ' + esc(lowA(sp)) + '</button>' +
      (nx && !nbOpen ? '<button type="button" class="btn btn--go btn--w" data-act="ovBen" data-st="' + nx.id + '">Tiếp theo: ' + esc(nx === GOAL_PORT ? nx.n : benLabel(nx) + ' · ' + nx.n) + PS.icon('next', 16, 2.6) + '</button>' : '') +
      '<button type="button" class="link" data-act="ovClose">Đóng</button></div>');
  }

  /* Thư gửi thuyền trưởng tương lai: sau khi nhận bằng. Khóa fut.t, fut.sig, fut.ok, fut.at */
  function futSig() { var s = g('fut.sig'); return s === 'anon' ? FUT.anon : (prof().name ? given() : FUT.anon); }
  function futAsk() {
    return '<div class="futask"><span class="futask__ic">' + bottleArt(58, 1) + '</span><p>' + esc(FUT.ask) + '</p></div>' +
      '<button type="button" class="btn btn--go btn--w" data-act="futWrite">' + cdIc('edit', 18) + 'Có, mình viết thư</button><button type="button" class="btn btn--soft btn--w stampov__home" data-act="ovHome">Để sau</button>';
  }
  function futCard() {
    var at = g('fut.at');
    return '<button type="button" class="stampbox futcard' + (at ? ' on' : '') + '" data-act="futWrite"><span class="stampbox__ic">' + bottleArt(52, 1) + '</span><span><b>' + esc(FUT.t) + '</b><small>' + (at ? 'Đã thả chai ngày ' + dmy(at) + ' · chạm để xem, sửa' : 'Viết vài dòng cho thuyền trưởng khóa sau') + '</small></span><span class="stampbox__go">' + PS.icon('next', 16, 2.4) + '</span></button>';
  }
  function futOv() {
    var t = g('fut.t') || '', an = g('fut.sig') === 'anon', ok = !!g('fut.ok'), nm = prof().name ? given() : '';
    ov('<div class="futov"><h2>' + esc(FUT.t) + '</h2>' + shinSays('wink', '<p>' + esc(SHIN_TALK.futHi) + '</p>', 52) +
      '<label class="futov__l"><span>' + esc(FUT.q) + '</span><textarea class="ta ps-sel" data-k="fut.t" rows="5" maxlength="' + FUT.max + '" placeholder="' + esc(FUT.ph) + '">' + esc(t) + '</textarea></label><p class="futov__n" id="futN">' + t.length + '/' + FUT.max + '</p>' +
      '<p class="futov__s">Ký tên</p><div class="chips">' + (nm ? '<button type="button" class="chip' + (an ? '' : ' on') + '" data-act="futSig" data-v="me">' + esc(nm) + '</button>' : '') +
      '<button type="button" class="chip' + (an || !nm ? ' on' : '') + '" data-act="futSig" data-v="anon">' + esc(FUT.anon) + '</button></div>' +
      '<label class="futov__ok"><input type="checkbox" data-act="futOk"' + (ok ? ' checked' : '') + '><span>' + esc(FUT.ok) + '</span></label>' +
      '<button type="button" class="btn btn--go btn--w" data-act="futSend">' + cdIc('bottle', 18) + (g('fut.at') ? 'Thả chai lần nữa' : 'Bỏ thư vào chai, thả xuống biển') + '</button>' +
      '<button type="button" class="link" data-act="ovClose">Để sau</button></div>');
  }
  function futSend() {
    if (trim(g('fut.t')).length < 10) { PS.toast('Viết vài câu cho thuyền trưởng đó nhé.'); return; }
    if (!g('fut.sig')) S.d['fut.sig'] = prof().name ? 'me' : 'anon';
    S.d['fut.at'] = Date.now(); save(true); sfx('pop');
    ov('<div class="futdrop' + (RM ? '' : ' futdrop--fx') + '"><div class="futdrop__sea">' + dropArt() + '</div><p class="futdrop__t">' + T(esc(FUT.end)) + '</p>' +
      '<div class="futdrop__q"><q>' + esc(g('fut.t')) + '</q><b>' + esc(futSig()) + '</b></div>' +
      '<button type="button" class="btn btn--w" data-act="ovHome">Về hải đồ</button></div>');
    if (!RM) setTimeout(function () { sfx('out'); }, 1300);
  }
  function futSum() { return g('fut.at') ? { t: trim(g('fut.t')), sig: futSig(), ok: g('fut.ok') ? 1 : 0, at: g('fut.at') } : null; }

  /* ----- ảnh và in Hải trình của tôi ----- */
  function sheetImg() {
    var D2 = sheetData(), p = D2.p, cv = D.createElement('canvas'), cx = cv.getContext('2d'), Wd = 1080, PAD = 64, IN = Wd - PAD * 2, y = 0, draw = false, dbImg = null, trImg = null, plImg = {};
    function font(w, s) { cx.font = w + ' ' + s + 'px "Be Vietnam Pro", system-ui, sans-serif'; }
    function txt(t, x, mw, lh, col) {
      var ws = String(t).split(' '), line = '';
      for (var i = 0; i < ws.length; i++) { var tt = line ? line + ' ' + ws[i] : ws[i]; if (cx.measureText(tt).width > mw && line) { if (draw) { cx.fillStyle = col; cx.fillText(line, x, y); } y += lh; line = ws[i]; } else line = tt; }
      if (line) { if (draw) { cx.fillStyle = col; cx.fillText(line, x, y); } y += lh; }
    }
    function layout(cmpImg) {
      y = 0; cx.textBaseline = 'top';
      if (draw) { cx.fillStyle = '#FAF9F5'; cx.fillRect(0, 0, Wd, cv.height); var gr = cx.createLinearGradient(0, 0, Wd, 260); gr.addColorStop(0, '#D97757'); gr.addColorStop(1, '#B5532F'); cx.fillStyle = gr; cx.fillRect(0, 0, Wd, 260); }
      y = 52; font('700', 24); txt('PROSKILLS · CAREER DESIGN 02 · HẢI ĐỒ LA BÀN', PAD, IN, 40, '#FBE3D6');
      font('800', 56); txt('Hướng đi của tôi', PAD, IN, 72, '#FFFFFF');
      font('600', 28); txt((p.name || '') + (p.cls ? ' · Lớp ' + p.cls : '') + (p.sid ? ' · ' + p.sid : ''), PAD, IN, 40, 'rgba(255,255,255,.92)');
      y = 290;
      if (trImg) { font('800', 30); txt(CHEST_MY, PAD, IN, 46, '#141413'); if (draw) cx.drawImage(trImg, PAD, y, IN, IN * 210 / 900); y += IN * 210 / 900 + 10; font('400', 27); chestSum().forEach(function (x) { if (x.w) txt(x.n + ': ' + x.w, PAD, IN, 38, '#3D3D3A'); }); y += 24; } /* PS1.3.51 */
      if (cmpImg) { if (draw) cx.drawImage(cmpImg, Wd / 2 - 216, y, 432, 360); y += 376; }
      if (dbImg) { y += 6; font('800', 30); txt(DREAM_T, PAD, IN, 46, '#141413'); if (draw) cx.drawImage(dbImg, PAD + 26, y, IN - 52, IN - 52); y += IN - 52 + 26; } /* PS1.3.48 */
      if (g('x1.motto')) { font('700', 32); txt('“' + g('x1.motto') + '”', PAD, IN, 44, '#B5532F'); y += 10; }
      D2.L.forEach(function (sec) {
        if (dbImg && sec[0] === DREAM_T) return;
        if (trImg && sec[0] === CHEST_MY) return;
        var y0 = y; if (draw) { cx.fillStyle = '#FFFFFF'; cx.fillRect(PAD, y0, IN, sec.h || 0); cx.fillStyle = '#D97757'; cx.fillRect(PAD, y0, 8, sec.h || 0); }
        var pim = sec[3] && plImg[sec[3]]; if (pim && draw) cx.drawImage(pim, PAD + IN - 104, y0 + 18, 80, 80); /* PS1.3.57: hình kế hoạch */
        y += 22; font('800', 30); txt(sec[0], PAD + 32, IN - (pim ? 150 : 60), 42, '#141413');
        font('400', 27); sec[1].forEach(function (t) { txt(t, PAD + 32, IN - (pim ? 150 : 60), 38, '#3D3D3A'); });
        if (pim && y < y0 + 104) y = y0 + 104;
        y += 20; if (!draw) sec.h = y - y0; y += 18;
      });
      font('500', 22); txt('Proskills · Khoa Kỹ năng JPC · ' + CD2_VER, PAD, IN, 34, '#6F6E69');
      return y + PAD;
    }
    function run(img) {
      try {
        cv.width = Wd; cv.height = 100; draw = false; var H = layout(img); cv.width = Wd; cv.height = Math.ceil(H); draw = true; layout(img);
        var url = cv.toDataURL('image/png'), nm = String(p.name || 'hoc-vien');
        if (nm.normalize) nm = nm.normalize('NFD').replace(/[̀-ͯ]/g, '');
        nm = nm.replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
        S.d['f2.img'] = S.d['f2.img'] || Date.now(); save();
        ov('<h2>Ảnh Hướng đi của tôi</h2><p class="ps-small">Giữ ngón tay lên ảnh để lưu, hoặc bấm Tải ảnh.</p><div class="imgbox"><img src="' + url + '" alt="Hướng đi của ' + esc(p.name || '') + '"></div>' +
          '<a class="btn btn--w" href="' + url + '" download="HaiTrinh-' + esc(nm || 'CD02') + '.png">' + PS.icon('save', 18) + 'Tải ảnh</a>');
      } catch (e) { PS.toast('Chưa tạo được ảnh. Bạn chụp màn hình hoặc chọn In nhé.'); }
    }
    PS.toast('Đang tạo ảnh…');
    function ld(svg, cb) { /* PS1.3.51: nạp lần lượt các hình SVG (la bàn, kho báu, Bảng ước mơ) vào canvas */
      if (!svg) { cb(null); return; }
      var im = new Image(), dn = false, f = function (ok) { if (dn) return; dn = true; cb(ok ? im : null); };
      im.onload = function () { f(true); }; im.onerror = function () { f(false); };
      try { im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); } catch (e) { f(false); return; }
      setTimeout(function () { f(false); }, 1500);
    }
    var go2 = function () {
      try {
        ld(compassSVG(pv(), 432).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" height="360" '), function (ci) {
          ld(chestSel().length ? trSVG() : '', function (ti) { trImg = ti;
            ld(dbN() ? dbSVG() : '', function (di) { dbImg = di;
              var pq = VOY.map(function (x) { return x[0]; }).filter(function (v) { return planK(v); }), nx2 = function (i) { /* PS1.3.57: nạp hình 3 kế hoạch */
                if (i >= pq.length) { run(ci); return; }
                ld(planArt(planK(pq[i]), 160, '#FBEFE8').replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '), function (im) { if (im) plImg[pq[i]] = im; nx2(i + 1); }); };
              nx2(0); }); });
        });
      } catch (e) { run(null); }
    };
    if (D.fonts && D.fonts.ready && D.fonts.ready.then) D.fonts.ready.then(go2, go2); else go2();
  }
  function copyText(rk) {
    var ta = D.getElementById('repMsg'); if (!ta) return;
    var ok = function () { if (rk) { S.d[rk] = Date.now(); save(true); } PS.toast('Đã chép. Dán vào Zalo, Messenger hoặc Teams nhé.'); };
    try { if (W.navigator.clipboard && W.isSecureContext) { W.navigator.clipboard.writeText(ta.value).then(ok, function () { fb(); }); return; } } catch (e) {}
    fb();
    function fb() { var ro = ta.hasAttribute('readonly'); try { ta.removeAttribute('readonly'); ta.select(); D.execCommand('copy'); if (ro) ta.setAttribute('readonly', ''); ok(); } catch (e2) { PS.toast('Chưa chép được. Giữ ngón tay lên tin nhắn để chép nhé.'); } }
  }

  /* ---------- hoàn thành chặng ---------- */
  function finishAct() {
    var id = V.id, a = ACTS[id], first = !S.done[id];
    S.done[id] = S.done[id] || Date.now(); if (S.bak[id]) delete S.bak[id];
    S.xp[id] = CD2_XP_ACT;
    var ins = 0; a.steps.forEach(function (s) { if (s.k === 'write') ins += insOf(s.key); if (s.k === 'open1') ins += insOf('x1.now'); if (s.k === 'ps') ins += insOf('f1.ps'); if (s.k === 'chest') chestSel().forEach(function (c) { ins += insOf('f1.trw.' + c); }); });
    S.ins[id] = ins;
    markDay();
    var b = benOf(a.st), stampNew = false, finNew = false;
    if (b !== GOAL_PORT && (b === PORT ? portDone() : benDone(b)) && !S.stamp[b.id]) { S.stamp[b.id] = Date.now(); stampNew = true; }
    if (b === GOAL_PORT && benDone(b) && !S.fin) { S.fin = Date.now(); finNew = true; }
    if (id === 'x1') S.intro = 1;
    if (id === 'b63' && !cnt(g('b53.tk') || {})) { delete S.d['b53.start']; S.d['b53.start'] = trialStart(); }
    save(true);
    if (finNew) { sfx('horn'); setTimeout(function () { sfx('stamp'); }, 380); go({ v: 'home' }); certOv(1, '+' + CD2_XP_ACT + ' XP' + (ins ? ' · +' + ins + ' Insight' : '')); return; } /* PS1.3.53: điểm hiện trong popup bằng, bỏ thông báo che nút */
    if (stampNew) { sfx('horn'); setTimeout(function () { sfx('stamp'); }, 380); }
    else sfx('ting');
    var ptx = '+' + CD2_XP_ACT + ' XP' + (ins ? ' · +' + ins + ' Insight' : '');
    if (stampNew) { go({ v: 'ben', st: b.id }); showStamp(b, 0, ptx); return; } /* PS1.3.49: điểm hiện trong popup, không để thông báo che nút */
    go({ v: 'ben', st: b.id }); doneOv(b, id, ptx); /* PS1.3.55 (ý 25): cuối chặng có Tiếp theo + Về bến */
  }
  function nextIn(b, id) { var n = null; b.acts.forEach(function (x) { if (!n && x !== id && !S.done[x] && actOpen(x)) n = x; }); return n || nextAct(); }
  function doneOv(b, id, ptx) {
    var nx = nextIn(b, id), nb = nx ? benOf(ACTS[nx].st) : null;
    ov('<div class="stampov donev"><h2>' + esc(SHIN_TALK.doneAct) + '</h2><p class="stampov__pts">' + ptx + '</p>' +
      shinSays('cheer', '<p>Bạn vừa xong <b>' + esc(ACTS[id].t) + '</b>.</p>', 56) + '<div class="ps-endnav">' +
      (nx ? '<button type="button" class="btn btn--go btn--w" data-act="ovAct" data-id="' + nx + '">Tiếp theo: ' + esc((nb !== b ? navName(nb) + ' · ' : '') + ACTS[nx].t) + PS.icon('next', 16, 2.6) + '</button>' : '') +
      '<button type="button" class="btn btn--soft btn--w" data-act="ovClose">Về ' + esc(navName(b)) + '</button></div></div>');
  }
  function resumeStep(id) { var st = S.d[id + '.st']; return !S.done[id] && typeof st === 'number' && st > 0 && st < ACTS[id].steps.length ? st : 0; }
  /* PS1.3.55 (ý 24): trang chủ Proskills mở thẳng hoạt động bằng ?go=<mã chặng | mã bến> */
  function goView(c) {
    if (!c) return null;
    if (ACTS[c] && (actOpen(c) || S.done[c])) return { v: 'act', id: c, step: resumeStep(c) };
    var b = benOf(c); if (b && (benOpen(b) || benDone(b))) return { v: 'ben', st: b.id };
    return null;
  }
  function certOv(first, pts) {
    var ask = first && !g('fut.at'); /* PS1.3.51: hỏi viết Thư gửi thuyền trưởng tương lai */
    ov('<div class="stampov">' + certHTML() + (pts ? '<p class="stampov__pts">' + pts + '</p>' : '') + shinSays('cheer', first ? '<p>Chúc mừng thuyền trưởng <b class="nm">' + esc(given()) + '</b>! Trang phục Thuyền trưởng đã có trong Tủ đồ của Shin.</p>' : '<p>Hải đồ vẫn mở. Ghé đảo, đọc thêm Senpai lúc nào cũng được.</p>', 56) +
      (ask ? futAsk() : '<button type="button" class="btn btn--go btn--w" data-act="ovHome">Về hải đồ</button>' + (g('fut.at') ? '' : '<button type="button" class="link" data-act="futWrite">' + esc(FUT.t) + '</button>')) +
      '</div>'); /* PS1.3.57 (góp ý 12): thuyền đủ 8 món hiện ở popup riêng sau khi đóng bằng */
  }
  function showStamp(b, again, pts) { /* PS1.3.45 (góp ý 14) · PS1.3.49 (góp ý 3, 4, 13): nút đi tiếp lên trên thuyền, đủ 3 dòng, xem lại được */
    var add = [], cap = 3; sheetData().L.forEach(function (sec) { if (sec[2] === b.id && add.length < cap) add.push('<li><b>' + esc(sec[0]) + '</b>' + esc(cut1(sec[1].join(' · '), 96)) + '</li>'); });
    var nx = nextBen(); if (nx === b) nx = null;
    ov('<div class="stampov">' + stampHTML(b) + '<h2>Con dấu ' + esc(b.n) + '</h2>' + (pts ? '<p class="stampov__pts">' + pts + '</p>' : '') +
      shinSays('cheer', '<p>' + (again ? 'Bạn đã xong' : 'Bạn vừa xong') + ' <b>' + esc(b.n) + '</b>. Giờ ' + esc(b.aim || 'bạn đã đi thêm một bến') + '.</p>' + (b === PORT && !again ? '<p>Bến 1 và Bến 2 đều mở, đi bến nào trước cũng được.</p>' : ''), 56) +
      (add.length ? '<div class="stampadd"><small>' + cdIc('doc', 14) + (again ? 'Bạn đã thêm vào Hướng đi của tôi' : 'Bạn vừa thêm vào Hướng đi của tôi') + '</small><ul>' + add.join('') + '</ul></div>' : '') +
      (b !== PORT ? btlCard(b) : '') + /* PS1.3.51: Thư trong chai */
      (nx ? '<button type="button" class="btn btn--go btn--w" data-act="ovBen" data-st="' + nx.id + '">Tiếp theo: ' + esc(nx === GOAL_PORT ? nx.n : benLabel(nx) + ' · ' + nx.n) + PS.icon('next', 16, 2.6) + '</button><button type="button" class="btn btn--soft btn--w stampov__home" data-act="ovHome">Về hải đồ</button>' :
        '<button type="button" class="btn btn--go btn--w" data-act="ovHome">Về hải đồ</button>') +
      '</div>'); /* PS1.3.57 (góp ý 12): bỏ thuyền khỏi popup con dấu; thuyền nâng cấp hiện ở popup riêng khi bấm Tiếp theo */
  }

  /* PS1.3.57 (góp ý 12): popup “Chúc mừng {Tên}, thuyền của bạn vừa được nâng cấp” (kiểu Thư trong chai).
     Hiện 1 lần mỗi bến, khi bấm Tiếp theo / Đi tiếp / chạm bến mới trên hải đồ. Bấm “Về hải đồ” thì bỏ qua (coi như đã xem).
     Cuối khóa (fin): hiện sau khi đóng popup Bằng. S.shipSeen[mã] = lúc xem. */
  function shipPend() { var r = null; BEN.forEach(function (b) { if (!r && S.stamp[b.id] && SHIP_ITEM[b.id] && !S.shipSeen[b.id]) r = b; }); if (!r && S.fin && !S.shipSeen.fin) r = GOAL_PORT; return r; }
  function shipSkip() { BEN.forEach(function (b) { if (S.stamp[b.id] && !S.shipSeen[b.id]) S.shipSeen[b.id] = Date.now(); }); save(); }
  function shipGate(after) { var pb = shipPend(); if (!pb) return false; shipOv(pb, after); return true; }
  function shipOv(b, after) {
    var k = b === GOAL_PORT ? 'fin' : b.id, it = SHIP_ITEM[k]; if (!it) return;
    S.shipSeen[k] = Date.now(); save(); sfx('pop');
    var nb = after && after.st ? benOf(after.st) : null;
    var btn = nb ? '<button type="button" class="btn btn--go btn--w" data-act="ovBen" data-st="' + nb.id + '">Vào ' + esc(nb === GOAL_PORT ? nb.n : benLabel(nb) + ' · ' + nb.n) + PS.icon('next', 16, 2.6) + '</button>'
      : '<button type="button" class="btn btn--go btn--w" data-act="' + (after && after.home ? 'ovHome' : 'ovClose') + '">' + (after && after.home ? 'Về hải đồ' : 'Tiếp tục') + '</button>';
    ov('<div class="shipov' + (RM ? '' : ' shipov--fx') + '"><p class="shipov__k">' + cdIc('anchor', 14) + 'Thuyền cấp ' + shipCap() + ' / 8</p>' +
      '<h2>Chúc mừng <b class="nm">' + esc(given()) + '</b>, thuyền của bạn vừa được nâng cấp!</h2>' +
      '<div class="shipov__sea">' + shipUpHTML(b, true, 1) + '</div>' +
      '<div class="letter shipov__it"><div class="letter__in"><small>' + cdIc('flag', 14) + 'Thuyền vừa có thêm</small><b>' + esc(it[0]) + '</b><span>' + esc(it[1]) + '</span></div></div>' +
      btn + '</div>');
  }
  /* PS1.3.57 (góp ý 2): đổi ảnh đại diện ngay trong CD02 (cùng bảng chọn với Cài đặt trang chủ, lưu PS.prefs().av) */
  function avOv() {
    if (!W.PSAvatar || !PSAvatar.body) return;
    ov('<div class="avov"><h2>Ảnh đại diện</h2>' + PSAvatar.body() + '</div>');
    var box = D.getElementById('cdov');
    if (box) box.addEventListener('click', function (e) { var bt = PS.closest(e.target, '[data-av]'); if (!bt) return; PS.setPref('av', bt.getAttribute('data-av')); sfx('ting'); closeOv(); if (V.v === 'act') keepY(redrawStep); else render(false); PS.toast('Đã đổi ảnh đại diện.'); });
  }
  /* ---------- lớp phủ ---------- */
  function ov(html) { closeOv(); var el = D.createElement('div'); el.id = 'cdov'; el.className = 'cdov'; el.setAttribute('role', 'dialog'); el.innerHTML = '<div class="cdov__box"><button type="button" class="cdov__x" data-act="ovClose" aria-label="Đóng">' + PS.icon('close', 20) + '</button>' + html + '</div>'; D.body.appendChild(el); D.body.classList.add('ps-lock'); }
  function closeOv() { var el = D.getElementById('cdov'); if (el) el.parentNode.removeChild(el); if (!nbOpen) D.body.classList.remove('ps-lock'); }

  /* =========================================================
     6. SỔ TAY: Tổng quan | Hải trình | Cài đặt
     ========================================================= */
  function nbOverview() {
    var tg = g('b12.t') || {}, cur = ISLES.filter(function (is) { return tg[is.id] === 'cur'; });
    return '<div class="tiles"><div class="tl">' + PS.icon('check', 16) + '<b>' + doneMain() + '/' + ORDER.length + '</b><small>Chặng đã xong</small></div><div class="tl">' + PS.icon('star', 16) + '<b>' + xpTotal() + '</b><small>XP</small></div>' +
      '<div class="tl">' + PS.icon('bulb', 16) + '<b>' + insTotal() + '</b><small>Insight</small></div><div class="tl">' + PS.icon('flame', 16) + '<b>' + (S.demo ? 5 : PS.streak()) + '</b><small>Chuỗi ngày</small></div>' +
      '<div class="tl">' + cdIc('compass', 16) + '<b>' + (100 - fogPct()) + '%</b><small>Đảo đã khám phá</small></div><div class="tl">' + cdIc('card', 16) + '<b>' + cardN() + '/' + SENPAI.length + '</b><small>Thẻ Senpai</small></div></div>' +
      (g('x1.goal') ? '<div class="nbbox"><small>Mục tiêu khóa của bạn</small><p>' + esc(g('x1.goal')) + '</p></div>' : '') +
      (cur.length ? '<div class="nbbox"><small>Đảo bạn quan tâm</small><p>' + cur.map(function (is) { return esc(is.n); }).join(' · ') + '</p></div>' : '') +
      '<p class="ps-small">Tổng XP của mọi khóa: <b>' + PS.totals().xp + '</b> (xem ở trang chính Proskills).</p>';
  }
  function nbLog() {
    var h = bookHTML(1, 1);
    if (g('b31.v')) h += '<div class="nbbox"><small>La bàn của tôi</small><div class="cmpbox">' + compassSVG(pv(), 320) + '</div><p>Nghiêng rõ nhất: <b>' + esc(lean()) + '</b></p></div>';
    if (g('b22.base')) { var bs = null; BASE5.forEach(function (b) { if (b.id === g('b22.base')) bs = b; }); h += '<div class="nbbox"><small>Nền tôi xây từ bây giờ</small><p><b>' + esc(bs.n) + '</b> · ' + esc(g('b22.act') || '') + '</p></div>'; }
    if (g('b23.q')) h += '<div class="nbbox"><small>Câu tôi muốn hỏi Senpai</small><p>' + esc(g('b23.q')) + '</p></div>';
    if (g('b41.isl')) h += '<h3 class="qs">3 kế hoạch 5 năm</h3><div class="trio">' + VOY.map(function (x) { return voyCard(x[0]); }).join('') + '</div>';
    var p3 = p3Sum(); if (p3Any(p3)) h += '<div class="nbbox"><small>Kế hoạch 3 năm ở Nhật</small><ol class="ptl ptl--mini">' + PLAN3_Y.map(function (o) { var it = p3['y' + o[0]]; return '<li class="ptl__n ptl__n--' + o[0] + '"><span class="ptl__dot"><b>' + esc(o[1]) + '</b></span><div class="ptl__it">' + (it.length ? it.map(function (t) { return '<span class="ptl__x">' + esc(t) + '</span>'; }).join('') : '') + '</div></li>'; }).join('') + '</ol></div>';
    if (trialTxt() && S.done.b63 && !g('b73.pk')) h += '<div class="nbbox nbbox--plain">' + trialCard() + '</div>';
    if (shoreIds().length) h += '<div class="nbbox nbbox--plain">' + shoreList() + '</div>';
    if (protoK() && S.done.b73) h += '<div class="nbbox nbbox--plain">' + protoCard() + '</div>';
    if (sucList().length) h += '<div class="nbbox"><small>' + esc(SUCC_T) + '</small>' + sucRope(0) + '</div>';
    if (crossSum().keep.length) h += '<div class="nbbox"><small>Khi đứng giữa ngã rẽ</small><p>Tôi hay giữ <b>' + esc(crossSum().keep.join(', ')) + '</b>' + (crossSum().lose.length ? ', hay buông ' + esc(crossSum().lose.join(', ')) : '') + '.</p>' + (trim(g('b53n.me')) ? '<p>' + esc(g('b53n.me')) + '</p>' : '') + '</div>';
    if (g('b52.first')) h += '<div class="nbbox"><small>Khi đường bị chặn</small><p>' + esc((blk() || {}).t || '') + '. Bước đầu: <b>' + esc(g('b52.first')) + '</b></p></div>';
    if (windList().length) h += '<div class="nbbox"><small>Điều có thể làm đổi kế hoạch</small>' + zoneHTML() + '</div>';
    if (g('b71.key')) h += '<div class="nbbox"><small>Người giúp tôi</small><div class="ringbox">' + ringSVG() + '</div>' + (trim(g('b71.ask')) ? '<p>Câu tôi sẽ hỏi: ' + esc(g('b71.ask')) + '</p>' : '') + (S.done.b71 ? (trim(g('b71.met')) ? '<p>Đã gặp: ' + esc(g('b71.met')) + '</p>' : '<button type="button" class="link" data-act="goAsk">Gặp rồi? Ghi lại lời khuyên</button>') : '') + '<p>Người giúp nhiều nhất: <b>' + esc(ringName(g('b71.key'))) + '</b></p></div>';
    if (trim(g('b72.why'))) h += '<div class="nbbox"><small>Câu “Tại sao?” tôi sẽ hỏi</small><p>' + esc(g('b72.why')) + '</p></div>';
    if (lessonTitle()) h += '<div class="nbbox"><small>Bài học từ trải nghiệm</small><p><b>' + esc(lessonTitle()) + '</b></p><p>' + esc(trim(g('b73.m2'))) + '</p>' + (trim(g('b73.m3')) ? '<p>Lần sau: ' + esc(trim(g('b73.m3'))) + '</p>' : '') + '</div>';
    if (g('b72.h') && !trim(g('b72.why'))) h += '<div class="nbbox"><small>Cách tôi học từ công việc</small><p><b>' + esc(g('b72.h')) + '</b>' + (g('b72.how') ? ' · ' + esc(g('b72.how')) : '') + '</p></div>';
    if (chestSel().length) h += '<div class="nbbox"><small>' + esc(CHEST_MY) + '</small>' + chestStrip(36).replace('<b>' + esc(CHEST_MY) + '</b>', '') + '</div>'; /* PS1.3.51 */
    if (dbN()) h += '<div class="nbbox"><small>' + esc(DREAM_T) + '</small>' + dbBoard(0) + '</div>';
    if (futSum()) h += '<div class="nbbox"><small>' + esc(FUT.t) + '</small><q class="nbq">' + esc(futSum().t) + '</q><p>' + esc(futSum().sig) + ' · thả chai ' + dmy(futSum().at) + '</p><button type="button" class="link" data-act="futWrite">Xem, sửa thư</button></div>';
    if (finDone()) h += '<button type="button" class="btn btn--go btn--w nbcert" data-act="certOv">' + cdIc('flag', 18) + 'Bằng Thuyền Trưởng Vững Vàng</button>';
    return h;
  }
  function nbCards() { /* PS1.3.39: tab riêng cho bộ thẻ Senpai sưu tầm */
    var h = '<p class="nbsub">Đọc xong một chuyện là có một thẻ.</p>';
    h += '<h3 class="qs">Đã gặp (' + cardN() + '/' + SENPAI.length + ')</h3><div class="spgrid spgrid--nb">' + SENPAI.map(function (sp) {
      var got = !!S.cards[sp.id];
      return got ? spCard(sp) : '<div class="spc spc--no"><span class="spc__av">?</span><span class="spc__b"><b>Chưa gặp</b><small>' + esc(isleOf(sp.isl).n) + '</small></span></div>';
    }).join('') + '</div>';
    return h;
  }
  function nbSettings() {
    if (S.demo) return '<p class="ps-small">Đang mở bản demo giáo viên. Thông tin và bài làm ở đây là của học viên giả định.</p><button type="button" class="btn btn--soft btn--w" data-act="demoExit">Thoát demo</button>';
    return PS.settingsHTML({ ctx: 'module', mod: ID, ver: CD2_VER });
  }
  function drawNb() {
    var el = D.getElementById('nb'); if (!el) return;
    el.innerHTML = '<div class="nb__in"><div class="nb__cover"><div class="nb__top"><div><h2>Sổ Thuyền Trưởng</h2><small>' + esc(prof().name || 'Thuyền trưởng') + ' · Sổ tay CD02</small></div><button type="button" class="nb__x" data-act="nbClose" aria-label="Đóng sổ tay">' + PS.icon('close', 20) + '</button></div>' +
      '<div class="tabs" role="tablist">' + [['tq', 'Tổng quan'], ['ht', 'Bài làm'], ['sp', 'Thẻ Senpai'], ['cd', 'Cài đặt']].map(function (t) { return '<button type="button" role="tab" aria-selected="' + (NBTAB === t[0]) + '" class="' + (NBTAB === t[0] ? 'on' : '') + '" data-act="tab" data-t="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      '</div><div id="nbBody" class="nb__body">' + (NBTAB === 'tq' ? nbOverview() + (S.demo ? '' : PS.savedHTML(ID)) : (NBTAB === 'ht' ? nbLog() : (NBTAB === 'sp' ? nbCards() : nbSettings()))) + '</div></div>';
    if (NBTAB === 'cd' && !S.demo) PS.wireSettings(D.getElementById('nbBody'), { ctx: 'module', mod: ID, onChange: function () { drawNb(); } });
  }
  function openNb(tab) { NBTAB = tab || 'cd'; if (nbOpen) { drawNb(); return; } nbOpen = true; var el = D.createElement('div'); el.id = 'nb'; el.className = 'nb'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Sổ tay'); D.body.appendChild(el); D.body.classList.add('ps-lock'); drawNb(); }
  function closeNb() { var el = D.getElementById('nb'); if (el) el.parentNode.removeChild(el); nbOpen = false; D.body.classList.remove('ps-lock'); QUIET = true; render(false); QUIET = false; }

  /* =========================================================
     7. DEMO GIÁO VIÊN: học viên giả định đã xong Xuất phát + Bến 1–3 (từ PS1.3.38)
     ========================================================= */
  function enterDemo() {
    var s = blank(); s.demo = 1; s.intro = 1; s.created = Date.now() - 2 * 864e5;
    s.prof = { name: 'Nguyễn Minh An', by: new Date().getFullYear() - 20, sid: 'HV-DEMO', cls: 'Lớp demo', path: 'Thực tập sinh' };
    s.cd1 = { main: 'co-khi', jobKey: 'co-khi', mainName: 'Cơ khí', bName: 'Ô tô', far: 'Tổ trưởng, kèm người mới', letter: 'Gửi mình 5 năm sau: mong là giờ bạn đã đọc bản vẽ không cần hỏi ai.',
      me: '5 năm sau, mình muốn là người có nghề vững, lo được cho ba mẹ', value: ['Gia đình', 'Học hỏi, phát triển', 'Thu nhập tốt'], good: ['Kiên nhẫn', 'Khéo tay', 'Cẩn thận, tỉ mỉ'], like: ['Sửa chữa đồ đạc', 'Lắp ráp, tháo lắp'],
      jp2: 'N3', work: ['Đậu Ginou Kentei cơ khí cấp 3', 'Đứng máy CNC'], p2: 'Ở Nhật, mình sẽ đậu thi tay nghề, lên N3', senpai: 'Anh Hoài, cơ khí', learn: 'Mình muốn học theo cách anh tự học sau giờ làm',
      qs: ['Tháng đầu làm cơ khí, điều gì khó nhất?'], worry: 'Tiếng Nhật chưa đủ để hiểu cấp trên', first: 'Tắt điện thoại lúc 23 giờ', guide: 'Anh họ đang làm ở Nhật', habits: ['Khi về phòng, tôi sẽ ôn 10 từ mới.'], motto: 'Chậm mà chắc, đi là tới.', ria: 'RCS', endAt: Date.now() - 5 * 864e5 };
    s.d = { 'x1.flag': { s: 'whale', c: '#6E9E94' }, 'x1.motto': 'Đi chậm mà chắc', 'x1.n': '2', 'x1.sure': 6, 'x1.now': 'Mình sẽ về Việt Nam làm cho công ty Nhật.', 'x1.goal': 'Mình muốn biết thêm các hướng đi sau 3 năm.', 'x1.carry': ['me', 'value', 'far'] };
    var t0 = Date.now() - 864e5, d = s.d;
    /* PS1.3.38: học viên giả định đã xong Xuất phát + Bến 1–3, để thầy cô thử ngay Bến 4–6 và Cảng Khởi Hành */
    d['b11.g'] = { thuy: 'cau', lich: 'len', linh: 're', hoi: 'cau', sy: 'len', mai: 'chu' };
    d['b12.t'] = { len: 'cur', re: 'new', hoc: 'no', gio: 'new', chu: 'cur', lap: 'no', cau: 'cur', que: 'new' };
    d['b13.isl'] = 'cau'; d['b13.why'] = 'Mình muốn về gần nhà mà vẫn dùng tiếng Nhật.';
    d['b21.b1'] = 'hoai'; d['b21.fr1'] = 'bn'; d['b21.b2'] = 'thuy'; d['b21.fr2'] = 'nay'; d['b21.take'] = 'Mình thấy tiếng Nhật giỏi thì có thêm lựa chọn.';
    d['b22.sel'] = ['jp', 'learn', 'rel']; d['b22.base'] = 'jp'; d['b22.act'] = 'Mỗi ngày 10 từ mới';
    d['b23.who'] = 'hanh'; d['b23.ask'] = [0, 2, 4]; d['b23.q'] = 'Anh chị chuẩn bị gì từ năm đầu để về có việc tốt?';
    d['b31.v'] = [3, 5, 4, 3, 4, 7]; d['b31.why'] = 'Vì ba mẹ mình lớn tuổi rồi.';
    d['b32.w0'] = 'Ba mẹ cần mình về sớm'; d['b32.w1'] = 'Tiếng Nhật chưa lên N2'; d['b32.z'] = { 0: 'out', 1: 'in' }; d['b32.a0'] = 'Mình gửi tiền đều và gọi về mỗi tuần, nói rõ kế hoạch với ba mẹ.'; d['b32.a1'] = 'Mình học 15 phút mỗi tối, thi lại kỳ sau.';
    d['b33.sc'] = ['gear', 'family', '']; d['b33.scw0'] = 'Làm ra sản phẩm không ai chê'; d['b33.scw1'] = 'Đi làm mà vẫn gần ba mẹ'; d['b33.life'] = '10 năm nữa, một cuộc sống tốt với mình là gần ba mẹ';
    ['b11', 'b12', 'b21', 'b22', 'b23', 'b31', 'b32', 'b33'].forEach(function (a) { s.done[a] = t0; s.xp[a] = CD2_XP_ACT; });
    s.done.x1 = t0; s.xp.x1 = CD2_XP_ACT; s.stamp = { p0: t0, b1: t0, b2: t0, b3: t0 }; s.seen = { p0: 1, b1: 1, b2: 1, b3: 1 };
    ['thuy', 'lich', 'linh', 'hoi', 'sy', 'mai', 'hoai'].forEach(function (id) { s.cards[id] = t0; s.xp['card.' + id] = CD2_XP_CARD; });
    ISLES.forEach(function (is) { s.isl[is.id] = t0; });
    S = s; NOSAVE = 0; save(true); V = { v: 'home' }; render(true);
    PS.toast('<b>Bản demo giáo viên</b> · học viên giả định đã xong Bến 1–3. Bến 4 Phòng Hải Đồ đang mở.');
  }
  function exitDemo() { NOSAVE = 1; clearTimeout(saveT); try { PS.set(DEMO_KEY, null); } catch (e) {} W.location.replace(W.location.pathname); }

  /* =========================================================
     8. SỰ KIỆN
     ========================================================= */
  D.addEventListener('click', function (e) {
    var b = PS.closest(e.target, '[data-act]'); if (!b) return;
    var a = b.getAttribute('data-act'), id = b.getAttribute('data-id'), k = b.getAttribute('data-k'), v = b.getAttribute('data-v');
    if (a === 'home') go({ v: 'home' });
    else if (a === 'psHome') { save(true); PS.home(); }
    else if (a === 'introGo') { S.intro = 1; save(true); go({ v: 'act', id: 'x1', step: 0 }); }
    else if (a === 'ben') { var bn = benOf(b.getAttribute('data-st')); if (bn && !benDone(bn) && benOpen(bn) && shipGate({ st: bn.id })) return; if (bn && (benOpen(bn) || benDone(bn))) go({ v: 'ben', st: bn.id }); else if (bn) PS.toast(esc(lockMsg(bn))); }
    else if (a === 'lockMsg') { var bl = benOf(b.getAttribute('data-st')); PS.toast(esc(bl ? lockMsg(bl) : SHIN_TALK.lockFin)); }
    else if (a === 'open') { if (actOpen(id) || S.done[id]) go({ v: 'act', id: id, step: 0 }); else PS.toast(esc(lockMsg(benOf(ACTS[id].st)))); }
    else if (a === 'isle') { if (D.getElementById('cdov')) closeOv(); go({ v: 'isle', id: id }); }
    else if (a === 'mapMode') { mapMode = v === 'isl' ? 'isl' : 'ben'; var cbx = D.getElementById('chartbox'); if (cbx) cbx.className = 'chartbox' + (mapMode === 'isl' ? ' isl-on' : ''); [].forEach.call(APP.querySelectorAll('.seg__b'), function (x) { var o = x.getAttribute('data-v') === mapMode; x.className = 'seg__b' + (o ? ' on' : ''); x.setAttribute('aria-pressed', o); }); var ms = D.getElementById('mapSub'); if (ms) ms.innerHTML = esc(mapSub(portDone())); }
    else if (a === 'rnd') { var rg = D.getElementById('rg' + v); openR[v] = !openR[v]; if (rg) { rg.className = 'rgrp' + (openR[v] ? ' on' : ''); b.setAttribute('aria-expanded', !!openR[v]); } }
    else if (a === 'dbCell') { var di = +v; if (!dbCells()) dbInit(); dbPicker(di); }
    else if (a === 'dbPick') dbPick(v);
    else if (a === 'dbDone') dbClose(false);
    else if (a === 'chestOpen') { if (!g('f1.tro')) { S.d['f1.tro'] = Date.now(); chestFx = 1; save(); sfx('pop'); setTimeout(function () { sfx('ting'); }, 420); } keepY(redrawStep); } /* PS1.3.51 */
    else if (a === 'chestView') { chestView = chestView === v ? '' : v; keepY(redrawStep); var tc = D.getElementById('trc'); if (tc && tc.scrollIntoView && chestView) { try { tc.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'nearest' }); } catch (e1) {} } }
    else if (a === 'chestPick') chestPick(v);
    else if (a === 'btlOpen') btlOv(b.getAttribute('data-st'));
    else if (a === 'btlSp') { closeOv(); if (nbOpen) closeNb(); go({ v: 'sp', id: id, from: null }); }
    else if (a === 'futWrite') futOv();
    else if (a === 'futSig') { S.d['fut.sig'] = v === 'anon' ? 'anon' : 'me'; save(); [].forEach.call(D.querySelectorAll('[data-act="futSig"]'), function (x) { x.className = 'chip' + (x.getAttribute('data-v') === S.d['fut.sig'] ? ' on' : ''); }); }
    else if (a === 'futOk') { S.d['fut.ok'] = b.checked ? 1 : 0; save(); }
    else if (a === 'futSend') futSend();
    else if (a === 'dbClear') dbClose(true);
    else if (a === 'clipPlay') { var cc = CLIPS[id], cv = PS.closest(b, '.clip__v'); if (!cc || !cv) return; S.d['clipv.' + id] = 1; save();
      cv.innerHTML = '<iframe class="clip__if" src="' + clipURL(cc, 1) + '" title="' + esc(cc.n) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'; }
    else if (a === 'clipIdea') { var ck = 'clip.' + k, cur = g(ck), nv = (cur != null && String(cur) === v) ? null : +v; if (nv == null) delete S.d[ck]; else S.d[ck] = nv; save();
      var bx = PS.closest(b, '.clip__ids'); if (bx) { var bs = bx.querySelectorAll('.clip__id'); for (var ci = 0; ci < bs.length; ci++) { var onc = nv != null && +bs[ci].getAttribute('data-v') === nv; bs[ci].className = 'clip__id' + (onc ? ' on' : ''); bs[ci].setAttribute('aria-pressed', onc ? 'true' : 'false'); } }
      if (nv != null) PS.toast('Đã ghi vào bài làm của bạn.'); }
    else if (a === 'clipOv') { ov('<div class="sp">' + clipHTML(id) + '</div>'); }
    else if (a === 'sp') { if (V.v === 'act') { ov(spBody(spOf(id))); collect(id, true); } else go({ v: 'sp', id: id, from: V.v === 'isle' ? V.id : null }); }
    else if (a === 'showIntro') { V.showIntro = 1; QUIET = true; render(false); QUIET = false; }
    else if (a === 'next') { var s0 = ACTS[V.id].steps[V.step]; if (check(s0)) return; if (s0.k === 'open1' && g('x1.sure') == null) S.d['x1.sure'] = 5; if (s0.k === 'open2' && g('f1.sure') == null) S.d['f1.sure'] = 5; if (s0.k === 'weigh') S.d['b51.w'] = wOf(); if (s0.k === 'ivset') { S.d['b62.who'] = ivWho().id; if (adNews()) S.d['b62.rq'] = ivRq(adNews()); S.d['b62.q'] = ivQs(); } V.step++; S.d[V.id + '.st'] = V.step; save(); NAV.save(0); render(true); }
    else if (a === 'prev') { if (V.step > 0) { V.step--; render(true); } }
    else if (a === 'finish') { var s1 = ACTS[V.id].steps[V.step]; if (check(s1)) return; finishAct(); }
    else if (a === 'pick') { S.d[k] = v; if (k === 'x1.job' && v !== 'u') { /* đổi nghề: sách cùng nghề chọn lại */ } save(); redrawStep(); }
    else if (a === 'tip') { var ta = APP.querySelector('[data-k="' + k + '"]'); if (ta) { ta.value = v; S.d[k] = v; save(); updIns(k); refreshBar(); try { ta.focus(); } catch (er) {} } }
    else if (a === 'msTip') { var slot = null, dup = false; ['1', '3', '5'].forEach(function (y) { if (trim(g(k + '.m' + y)) === v) dup = true; }); if (dup) { PS.toast('Gợi ý này đã có trong một mốc.'); return; } ['1', '3', '5'].forEach(function (y) { if (!slot && trim(g(k + '.m' + y)).length < 3) slot = y; }); if (!slot) { PS.toast('3 mốc đã có chữ. Sửa trực tiếp trong ô nhé.'); return; } S.d[k + '.m' + slot] = v; save(); keepY(redrawStep); }
    else if (a === 'meter') { var G2 = gOf(k); G2[id] = +v; S.d[k + '.g'] = G2; save(); sfx('flip'); keepY(redrawStep); }
    else if (a === 'wt') { var W3 = wOf(); W3[id] = +v; S.d['b51.w'] = W3; save(); keepY(redrawStep); }
    else if (a === 'blk') { if (g('b52.b') !== v) { ['b52.w1', 'b52.w2', 'b52.w3', 'b52.ws', 'b52.own', 'b52.first'].forEach(function (x) { delete S.d[x]; }); } S.d['b52.b'] = v; save(); keepY(redrawStep); }
    else if (a === 'way') { var L2 = (g('b52.ws') || []).slice(), ix = L2.indexOf(v); if (ix > -1) L2.splice(ix, 1); else { if (L2.length >= 3) { PS.toast('Chọn tối đa 3 cách. Bỏ một cách trước nhé.'); return; } L2.push(v); } S.d['b52.ws'] = L2; if (g('b52.first') && waysSel().indexOf(g('b52.first')) < 0) delete S.d['b52.first']; save(); keepY(redrawStep); }
    else if (a === 'trTick') { var TK = g('b53.tk') || {}; TK[dayKey(new Date())] = 1; S.d['b53.tk'] = TK; markDay(); save(true); sfx('ting'); PS.toast('Thêm một ngày thử nhỏ. Giỏi lắm!'); if (nbOpen) drawNb(); else { QUIET = true; render(false); QUIET = false; } }
    else if (a === 'ring') { var RR = g('b71.r') || {}; RR[id] = v; S.d['b71.r'] = RR; save(); keepY(redrawStep); }
    else if (a === 'askQ') { var AQ = (g('b71.aq') || []).slice(), aqi = AQ.indexOf(v), was = AQ.join('\n'); if (aqi > -1) AQ.splice(aqi, 1); else { if (AQ.length >= 2) { PS.toast('Chọn tối đa 2 câu. Bỏ một câu trước nhé.'); return; } AQ.push(v); }
      S.d['b71.aq'] = AQ; if (!trim(g('b71.ask')) || trim(g('b71.ask')) === was) S.d['b71.ask'] = AQ.join('\n'); save(); keepY(redrawStep); }
    else if (a === 'need') { var NM = needOf(k); NM[id] = v; S.d[k + '.nh'] = NM; save(); keepY(redrawStep); }
    else if (a === 'wz') { var WZ = g('b32.z') || {}; WZ[id] = v; S.d['b32.z'] = WZ; save(); sfx('flip'); keepY(redrawStep); }
    else if (a === 'cmnSel') { var CS = (g('b22.sel') || []).slice(), csi = CS.indexOf(v); if (csi > -1) CS.splice(csi, 1); else { if (CS.length >= 3) { PS.toast('Chọn tối đa 3 điều. Bỏ một điều trước nhé.'); return; } CS.push(v); } S.d['b22.sel'] = CS; save(); keepY(redrawStep); }
    else if (a === 'hideIntro') { V.showIntro = 0; QUIET = true; render(false); QUIET = false; }
    else if (a === 'ovBen') { closeOv(); var ob = benOf(b.getAttribute('data-st')); if (ob && shipGate({ st: ob.id })) return; if (ob) go({ v: 'ben', st: ob.id }); }
    else if (a === 'copyMsg') copyText(k);
    else if (a === 'repTeams') { S.d['rep.end'] = Date.now(); save(true); setTimeout(function () { if (V.v === 'act') keepY(redrawStep); }, 400); }
    else if (a === 'work') { var P2 = g('b72.w') || {}; P2[id] = +v; S.d['b72.w'] = P2; save(); keepY(redrawStep); }
    else if (a === 'sheetImg') sheetImg();
    else if (a === 'sheetPrint') { S.d['f2.print'] = Date.now(); save(); D.body.classList.add('printing'); setTimeout(function () { try { W.print(); } catch (er) {} setTimeout(function () { D.body.classList.remove('printing'); }, 500); }, 60); }
    else if (a === 'certOv') certOv(0);
    else if (a === 'copyLink') copyTxt(v);
    else if (a === 'stampAgain') { var sbn = benOf(b.getAttribute('data-st')); if (sbn) showStamp(sbn, 1); }
    else if (a === 'goAsk') { if (nbOpen) closeNb(); var ix2 = 0; ACTS.b71.steps.forEach(function (x, n) { if (x.k === 'askprep') ix2 = n; }); go({ v: 'act', id: 'b71', step: ix2 }); }
    else if (a === 'sucCell') sucPicker(+v);
    else if (a === 'sucPick') sucPick(v);
    else if (a === 'sucClear') sucClear();
    else if (a === 'crossPick') { var cn = +id; if (crossSide(cn) !== v) delete S.d['b53x.r' + cn]; S.d['b53x.c' + cn] = v; save(); sfx('flip'); keepY(redrawStep); }
    else if (a === 'crossWhy') { S.d['b53x.r' + id] = v; save(); sfx('ting'); keepY(redrawStep); }
    else if (a === 'tourSpot') { tourOpen = +v; keepY(redrawStep); var tp = D.getElementById('tourP'); if (tp && tp.scrollIntoView) { try { tp.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'nearest' }); } catch (e2) { tp.scrollIntoView(false); } } }
    else if (a === 'tourAns') { var TR = tourRes(), ti = tourOpen; if (ti < 0) return; if (v === 'dk') TR[ti] = 'dk'; else if (+v === 0) { TR[ti] = 'ok'; sfx('ting'); } else { var TW = tourWrong[ti] || {}; TW[1] = 1; tourWrong[ti] = TW; keepY(redrawStep); return; } S.d['b72.t'] = TR; save(); keepY(redrawStep); }
    else if (a === 'tourNext') { var TR2 = tourRes(), nx2 = -1; tourOf().spots.forEach(function (x, i) { if (nx2 < 0 && !TR2[i]) nx2 = i; }); tourOpen = nx2; keepY(redrawStep); }
    else if (a === 'hardPick') { var HR = hardRes(); HR[id] = +v; S.d['b72.hd'] = HR; save(); sfx('flip'); keepY(redrawStep); }
    else if (a === 'hardRe') { var HR2 = hardRes(); for (var hk in HR2) if (HR2.hasOwnProperty(hk) && +hk >= +id) delete HR2[hk]; S.d['b72.hd'] = HR2; save(); keepY(redrawStep); }
    else if (a === 'pg') { S.d['b73.pg'] = +v; save(); keepY(redrawStep); }
    else if (a === 'protoWhen') { S.d['b73.pd'] = v; S.d['b73.pdl'] = dayAdd(v); save(); keepY(redrawStep); }
    else if (a === 'protoReal') { S.d['b73.real'] = +v; save(); var lb2 = PS.closest(b, '.lks'); if (lb2) { var lbs = lb2.querySelectorAll('.lk'); for (var li = 0; li < lbs.length; li++) { var lon = lbs[li].getAttribute('data-v') === v; lbs[li].className = 'lk' + (lon ? ' on' : ''); lbs[li].setAttribute('aria-pressed', lon); } } }
    else if (a === 'shoreSel') { var SL = shoreSel(); if (SL[id]) delete SL[id]; else SL[id] = (id === 's7c' && g('b73.pdl')) || dayAdd(7); S.d['shore.sel'] = SL; save(); sfx('ting'); keepY(redrawStep); }
    else if (a === 'shoreWhen') { var SL2 = shoreSel(); SL2[id] = dayAdd(v); S.d['shore.sel'] = SL2; save(); keepY(redrawStep); }
    else if (a === 'shoreOv') shoreOv(id);
    else if (a === 'shoreSt') { var ST = obj('shore.st'); ST[id] = v; S.d['shore.st'] = ST; save(); var sg3 = PS.closest(b, '.seg3'); if (sg3) { var sbs = sg3.querySelectorAll('button'); for (var si = 0; si < sbs.length; si++) sbs[si].className = sbs[si].getAttribute('data-v') === v ? 'on' : ''; } }
    else if (a === 'shoreDone') shoreDone(id);
    else if (a === 'noop') {}
    else if (a === 'avPick') avOv(); /* PS1.3.57 (góp ý 2) */
    else if (a === 'planPicker') planPicker(k);
    else if (a === 'planIc') { S.d[k + '.ic'] = v; save(); sfx('ting'); closeOv(); if (V.v === 'act') keepY(redrawStep); }
    else if (a === 'flagSym' || a === 'flagCol') { var f = g('x1.flag') || {}; if (a === 'flagSym') f.s = v; else f.c = v; S.d['x1.flag'] = { s: f.s, c: f.c }; save(); redrawStep(); }
    else if (a === 'flipGuess') { var G = g('b11.g') || {}; G[id] = v; S.d['b11.g'] = G; save(); sfx('flip'); collect(id, true); redrawStep(); }
    else if (a === 'isOpen') { V.isOpen = V.isOpen === id ? '' : id; var o = g('b12.o') || {}; o[id] = 1; S.d['b12.o'] = o; revealIsle(id, true); save(); redrawStep(); }
    else if (a === 'isTag') { var tg = g('b12.t') || {}; tg[id] = v; S.d['b12.t'] = tg; revealIsle(id, true); var nx = null; ISLES.forEach(function (is) { if (!nx && !tg[is.id]) nx = is.id; }); V.isOpen = nx || ''; if (nx) revealIsle(nx, true); save(); redrawStep(); }
    else if (a === 'book') { S.d[k] = v; collect(v, true); save(); redrawStep(); W.scrollTo(0, 0); }
    else if (a === 'bookRe') { delete S.d[k]; delete S.d[k.replace('.b', '.fr')]; save(); redrawStep(); }
    else if (a === 'peer') { S.d['b23.who'] = v; S.d['b23.ask'] = []; save(); sfx('ting'); redrawStep(); }
    else if (a === 'peerRe') { delete S.d['b23.who']; S.d['b23.ask'] = []; save(); redrawStep(); }
    else if (a === 'adKind') { if (adKind() !== v) { delete S.d['b61.ad']; } S.d['b61.kind'] = v; save(); keepY(redrawStep); }
    else if (a === 'adGrp') { if (adGrp() !== v) { var CA = curAd(); if (CA && !isPlan(CA) && CA.gr !== 'all') delete S.d['b61.ad']; } S.d['b61.grp'] = v; save(); keepY(redrawStep); }
    else if (a === 'adPick') { if (g('b61.ad') !== v) { ['b61.c', 'b61.t', 'b61.op', 'b61.pm', 'b61.inv', 'b61.prep', 'b62.rq'].forEach(function (x) { delete S.d[x]; }); } S.d['b61.ad'] = v; if (!g('b61.kind')) S.d['b61.kind'] = adKind(); save(); sfx('flip'); keepY(redrawStep); }
    else if (a === 'adTick') { var TK = adTk(), OP = adOp(); TK[id] = TK[id] ? 0 : 1; if (TK[id]) OP[id] = 1; S.d['b61.t'] = TK; S.d['b61.op'] = OP; save(); if (TK[id]) sfx('flip'); keepY(redrawStep); }
    else if (a === 'adWhy') { var OP2 = adOp(); OP2[id] = OP2[id] ? 0 : 1; S.d['b61.op'] = OP2; save(); keepY(redrawStep); }
    else if (a === 'pmark') { var PM = planMark(); PM[id] = v; S.d['b61.pm'] = PM; save(); keepY(redrawStep); }
    else if (a === 'prep') { var PP = (g('b61.prep') || []).slice(), pi = PP.indexOf(v); if (pi > -1) PP.splice(pi, 1); else { if (PP.length >= 3) { PS.toast('Chọn tối đa 3 điều.'); return; } PP.push(v); } S.d['b61.prep'] = PP; save(); keepY(redrawStep); }
    else if (a === 'ivWho') { var W4 = null; IV_WHO.forEach(function (x) { if (x.id === v) W4 = x; }); if (W4) { S.d['b62.who'] = v; S.d['b62.q'] = W4.q.slice(); save(); keepY(redrawStep); } }
    else if (a === 'ivQ') { var IQ = ivQs(), qi = IQ.indexOf(v); if (qi > -1) IQ.splice(qi, 1); else { if (IQ.length >= 3) { PS.toast('Chọn 3 câu. Bỏ một câu trước nhé.'); return; } IQ.push(v); } S.d['b62.q'] = IQ; if (!g('b62.who')) S.d['b62.who'] = ivWho().id; save(); keepY(redrawStep); }
    else if (a === 'ivRq') { var AN = adNews(); if (AN) { var RQ = ivRq(AN).slice(), ri = RQ.indexOf(+v); if (ri > -1) RQ.splice(ri, 1); else { if (RQ.length >= 2) { PS.toast('Chọn 2 yêu cầu. Bỏ một cái trước nhé.'); return; } RQ.push(+v); } S.d['b62.rq'] = RQ; save(); keepY(redrawStep); } }
    else if (a === 'ivSpeak') speakJa(v);
    else if (a === 'yr') { var EL = evList(), it = EL[+id]; if (it) { var YM = p3Map(); YM[it.t] = YM[it.t] === v ? '' : v; S.d['b63.y'] = YM; save(); keepY(redrawStep); } }
    else if (a === 'p3sel') { P3SEL = P3SEL === +id ? -1 : +id; keepY(redrawStep); }
    else if (a === 'p3put') { var EL2 = evList(), it2 = EL2[P3SEL]; if (!it2) { PS.toast('Chạm một điều trước, rồi chạm mốc thời gian.'); return; } var YM2 = p3Map(); YM2[it2.t] = v; S.d['b63.y'] = YM2; P3SEL = -1; save(); sfx('flip'); keepY(redrawStep); }
    else if (a === 'p3out') { var EL3 = evList(), it3 = EL3[P3SEL]; if (it3) { var YM3 = p3Map(); delete YM3[it3.t]; S.d['b63.y'] = YM3; } P3SEL = -1; save(); keepY(redrawStep); }
    else if (a === 'p3add') { var inp = D.getElementById('p3New'), tv = inp ? trim(inp.value) : ''; if (tv.length < 3) { PS.toast('Viết vài chữ rồi bấm Thêm nhé.'); return; } var OW = (g('b63.own') || []).slice(); if (OW.indexOf(tv) < 0) OW.push(tv); S.d['b63.own'] = OW; save(); keepY(redrawStep); }
    else if (a === 'ask') { var L = (g('b23.ask') || []).slice(); if (L.indexOf(+v) < 0) L.push(+v); S.d['b23.ask'] = L; save(); redrawStep(); }
    else if (a === 'nb') openNb('cd');
    else if (a === 'nbClose') closeNb();
    else if (a === 'tab') { NBTAB = b.getAttribute('data-t'); drawNb(); }
    else if (a === 'ovClose') closeOv();
    else if (a === 'ovAct') { closeOv(); if (ACTS[id] && (actOpen(id) || S.done[id])) go({ v: 'act', id: id, step: resumeStep(id) }); }
    else if (a === 'ovHome') { closeOv(); var sp0 = shipPend(); if (sp0 === GOAL_PORT) { shipOv(GOAL_PORT, { home: 1 }); return; } if (sp0) shipSkip(); go({ v: 'home' }); }
    else if (a === 'demoExit') exitDemo();
    else if (a === 'actMenu') actMenu(id);
    else if (a === 'actView') { closeOv(); go({ v: 'act', id: id, step: 0 }); }
    else if (a === 'actReset') resetAsk(id);
    else if (a === 'actResetGo') resetDo(id);
    else if (a === 'actRestore') restoreDo(id);
    else if (a === 'carry') { var CR = (g('x1.carry') || []).slice(), ci = CR.indexOf(v); if (ci > -1) CR.splice(ci, 1); else { if (CR.length >= 3) { PS.toast('Chọn tối đa 3 điều. Bỏ một điều trước nhé.'); return; } CR.push(v); } S.d['x1.carry'] = CR; save(); keepY(redrawStep); }
    else if (a === 'multi2') { var M2 = (g(k) || []).slice(), mi = M2.indexOf(v); if (mi > -1) M2.splice(mi, 1); else { if (M2.length >= 2) { PS.toast('Chọn tối đa 2 điều.'); return; } M2.push(v); } S.d[k] = M2; save(); keepY(redrawStep); }
  });
  /* ---------- PS1.3.41: chặng đã xong → Xem và sửa / Làm lại từ đầu (giữ bài cũ đến khi đóng dấu lại), theo CD01 ---------- */
  function actMenu(id) {
    var a = ACTS[id]; if (!a) return;
    if (S.bak[id]) { go({ v: 'act', id: id, step: 0 }); return; }
    ov('<h2>' + esc(a.t) + '</h2><p class="ps-small">Bạn đã xong chặng này.</p><div class="amenu">' +
      '<button type="button" class="sheetbtn" data-act="actView" data-id="' + id + '">' + PS.icon('book', 18) + '<span><b>Xem và sửa</b><small>Giữ bài cũ, sửa từng chỗ</small></span></button>' +
      '<button type="button" class="sheetbtn" data-act="actReset" data-id="' + id + '">' + cdIc('turn', 18) + '<span><b>Làm lại từ đầu</b><small>Làm lại chặng này, bài cũ giữ tạm</small></span></button></div>' +
      '<button type="button" class="link" data-act="ovClose">Đóng</button>');
  }
  function resetAsk(id) {
    ov('<h2>Làm lại từ đầu?</h2><p>Bài cũ của chặng <b>' + esc(ACTS[id].t) + '</b> được giữ tạm. Đóng dấu lại thì bài mới thay bài cũ. Bỏ dở thì vẫn khôi phục được.</p>' +
      '<button type="button" class="btn btn--w" data-act="actResetGo" data-id="' + id + '">Làm lại từ đầu</button><button type="button" class="link" data-act="ovClose">Thôi, giữ bài cũ</button>');
  }
  var ACT_KEYS = { b12: ['b12.', 'b13.'], b42: ['b42.', 'b43.'], b63: ['b63.', 'b53.'], b53: ['b53n.', 'b53x.'] }; /* PS1.3.50: b53 mới dùng khóa b53n.* (b53.* là thử nhỏ cũ) */ /* PS1.3.42: chặng gộp giữ khóa cũ */
  function actKeys(id) { var P = ACT_KEYS[id] || [id + '.'], out = []; for (var k in S.d) if (S.d.hasOwnProperty(k) && P.some(function (p) { return k.indexOf(p) === 0; })) out.push(k); return out; }
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
  function updIns(k) { var el = APP.querySelector('[data-ins="' + k + '"]'); if (el) el.innerHTML = insTxt(k); }
  D.addEventListener('input', function (e) {
    var t = e.target, k = t.getAttribute && t.getAttribute('data-k'); if (!k) return;
    if (t.type === 'range') { S.d[k] = +t.value; if (0 && /^b53n\.p\d$/.test(k)) { var xn = +k.slice(6), xo = D.getElementById('xrOut' + xn), xs = crossSide(xn); if (xo && xs) xo.textContent = lvFmt(CROSS[xn][xs].lv, t.value); save(); return; } var o = D.getElementById('sureOut'); if (o) o.textContent = t.value + '/10'; var o2 = D.getElementById('sureOut2'); if (o2) o2.textContent = 'Rõ ' + t.value + '/10'; save(); return; }
    S.d[k] = t.value; save(); updIns(k); refreshBar();
    if (k === 'fut.t') { var fn = D.getElementById('futN'); if (fn) fn.textContent = t.value.length + '/' + FUT.max; }
    if (/^b32\.w\d$/.test(k)) { var zb = APP.querySelector('.z2'); if (zb) { var tmp = D.createElement('div'); tmp.innerHTML = zoneHTML(); zb.parentNode.replaceChild(tmp.firstChild, zb); } }
  });
  function keepY(fn) { var y = W.pageYOffset || 0; fn(); W.scrollTo(0, y); }

  /* thanh trên ẩn khi cuộn xuống, hiện khi cuộn lên: làm chung ở core.js (PS1.3.55) */

  /* =========================================================
     9. KHỞI ĐỘNG
     ========================================================= */
  var GO = PS.goParam();
  NAV.start(W.location.pathname); /* PS1.3.55: bỏ ?demo, ?go khỏi địa chỉ; đếm mục lịch sử cho nút ‹ */
  if (ASK_DEMO) PS.demoAsk(function (ok) { if (ok) { NOSAVE = 0; enterDemo(); } else W.location.replace(W.location.pathname); });
  else if (WANT_DEMO) enterDemo();
  else {
    markDay();
    if (!S.intro && !S.demo) V = { v: 'intro' };
    else { var gv = goView(GO); if (gv) { NAV.go(gv); V = gv; } }
    render(true); save(true);
  }
})(window, document);
