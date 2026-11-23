/* =========================================================
   PROSKILLS · LỊCH HỌC + NHẮC TỰ HỌC (hub/lich.js) · PS1.3.14
   - Lịch trên lớp: T2–T6 × 6 ca, mỗi ô một môn (Kỹ năng · Kiến thức nghề · Thể chất) + cơ sở.
   - Nhắc tự học e-learning: một giờ chung cho mọi khóa.
   - Xuất lịch điện thoại (.ics, lặp hằng tuần đến ngày kết thúc, nhắc trước 15 phút) và Google Calendar.
   Lưu trong ps.settings (PS.prefs) nên đi theo bản sao lưu. ES5.
   ========================================================= */
(function (W, D) {
  'use strict';
  var PS = W.PS, esc = PS.esc, icon = PS.icon;
  var noMotion = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CA = [['1-2', '08:00', '09:30'], ['3-4', '10:00', '11:30'], ['5-6', '13:15', '14:45'], ['7-8', '15:15', '16:45'], ['9-10', '17:45', '19:15'], ['11-12', '19:45', '21:15']];
  var DAYN = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  var DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  var BYD = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  var MON = {
    kn: { n: 'Kỹ năng', s: 'KN', c: '#348A5F', t: '#E6F1EA' }, /* PS1.3.54: xanh lá như lịch (trước #2C5BC4) */
    ng: { n: 'Kiến thức nghề', s: 'Nghề', c: '#7E68B0', t: '#EEEAF7' }, /* PS1.3.54: tím dịu (trước #0F8F88), dễ phân biệt với xanh lá */
    tc: { n: 'Thể chất', s: 'TC', c: '#E0703A', t: '#FDEBE1' }
  };
  var MKEYS = ['kn', 'ng', 'tc'];
  var PLACE = { ac: ['Âu Cơ', 'Âu Cơ'], ab1: ['Ấp Bắc 1', 'ẤB 1'], ab2: ['Ấp Bắc 2', 'ẤB 2'] };
  var PKEYS = ['ac', 'ab1', 'ab2'];
  var ODEN = 'https://oden.vn/';
  var SEL = -1; /* ngày đang xem trên dải tuần (0 = T2) */

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function wd(d) { return (d.getDay() + 6) % 7; } /* 0 = T2 … 6 = CN */
  function hm(s) { var a = s.split(':'); return (+a[0]) * 60 + (+a[1]); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }

  function lich() { var l = PS.prefs().lich; return (l && l.s) ? l : { s: {}, end: '', last: {} }; }
  function saveLich(l) { PS.setPref('lich', l); }
  function nhac() { return PS.prefs().nhac || null; }
  function endDate() { var l = lich(); if (l.end && /^\d{4}-\d{2}-\d{2}$/.test(l.end)) return l.end; var d = new Date(); d.setMonth(d.getMonth() + 3); return ymd(d); }
  function count() { var n = 0, s = lich().s; for (var k in s) if (s.hasOwnProperty(k)) n++; return n; }
  function sig() { var l = lich(), n = nhac(); return JSON.stringify([l.s, endDate(), n]); }
  function exported() { return !!PS.prefs().lichExp && PS.prefs().lichExp === sig(); }
  function dayList(d) {
    var s = lich().s, out = [];
    for (var c = 0; c < CA.length; c++) { var x = s[d + '-' + c]; if (x && MON[x.m]) out.push({ c: c, m: x.m, p: x.p }); }
    return out;
  }

  /* ---------------- thẻ ở trang chủ ---------------- */
  function status(it, isToday) {
    if (!isToday) return '';
    var now = new Date(), m = now.getHours() * 60 + now.getMinutes(), a = hm(CA[it.c][1]), b = hm(CA[it.c][2]);
    if (m >= b) return '<span class="lc-st lc-st--done">Đã xong</span>';
    if (m >= a) return '<span class="lc-st lc-st--on">Đang học</span>';
    var left = a - m;
    if (left <= 120) return '<span class="lc-st lc-st--soon">Còn ' + (left >= 60 ? Math.floor(left / 60) + ' giờ ' + (left % 60 ? left % 60 + ' phút' : '') : left + ' phút') + '</span>';
    return '';
  }
  function defaultDay() {
    var t = wd(new Date());
    if (t < 5 && dayList(t).length) return t;
    for (var k = 1; k <= 7; k++) { var d = (t + k) % 7; if (d < 5 && dayList(d).length) return d; }
    return t < 5 ? t : 0;
  }
  function cardHTML() {
    var n = count(), nh = nhac();
    var odenA = '<a class="lc-oden" href="' + ODEN + '" target="_blank" rel="noopener">' + icon('ext', 15) + '<span>Xem lịch học trên <b>oden.vn</b></span></a>';
    var nhacRow = '<button type="button" class="lc-nhac" data-act="lcOpen" data-to="nhac">' + icon('bell', 17) + '<span>' +
      (nh ? 'Tự học <b>' + esc(nh.t) + '</b> · ' + esc(daysTxt(nh.d)) : 'Đặt giờ tự học mỗi ngày') + '</span>' + icon('next', 15) + '</button>';
    if (!n) {
      return '<section class="lc lc--empty" style="--i:1"><div class="lc-hd"><span class="lc-ic">' + icon('calendar', 22) + '</span><div><b>LỊCH HỌC</b>' +
        '<p>Lưu lịch Kỹ năng, Kiến thức nghề, Thể chất. Proskills nhắc bạn đi học.</p></div></div>' +
        '<button type="button" class="ps-btn lc-wide" data-act="lcOpen">' + icon('calendar', 18) + ' Đặt lịch học</button>' + nhacRow + odenA + '</section>';
    }
    if (SEL < 0) SEL = defaultDay();
    var t = wd(new Date());
    var strip = '<div class="lc-week" role="tablist">' + [0, 1, 2, 3, 4].map(function (d) {
      var L = dayList(d);
      return '<button type="button" role="tab" aria-selected="' + (d === SEL) + '" class="lc-day' + (d === SEL ? ' is-sel' : '') + (d === t ? ' is-today' : '') + '" data-act="lcDay" data-d="' + d + '"><small>' + DAYS[d] + '</small>' +
        '<span class="lc-dots">' + (L.length ? L.map(function (x) { return '<i style="background:' + MON[x.m].c + '"></i>'; }).join('') : '<i class="lc-dot0"></i>') + '</span></button>';
    }).join('') + '</div>';
    var L = dayList(SEL), isT = SEL === t;
    var head = isT ? 'Hôm nay · ' + DAYN[SEL] : DAYN[SEL] + (SEL > t || t > 4 ? ' tới' : '');
    var list = L.length ? L.map(function (x) {
      var m = MON[x.m];
      return '<div class="lc-it" style="--lc:' + m.c + ';--lt:' + m.t + '"><span class="lc-tm"><b>' + CA[x.c][1] + '</b><small>' + CA[x.c][2] + '</small></span>' +
        '<span class="lc-tx"><b>' + esc(m.n) + '</b><small>Tiết ' + CA[x.c][0] + ' · ' + esc(PLACE[x.p] ? PLACE[x.p][0] : '') + '</small></span>' + status(x, isT) + '</div>';
    }).join('') : '<p class="lc-none">' + (isT ? 'Hôm nay bạn không có lịch học trên lớp.' : 'Không có lịch học trên lớp.') + '</p>';
    var exp = exported() ? '' : '<button type="button" class="lc-exp" data-act="lcExport">' + icon('phone', 16) + (PS.prefs().lichExp ? 'Lịch đã đổi · cập nhật lịch điện thoại' : 'Thêm vào lịch điện thoại để được nhắc') + '</button>';
    return '<section class="lc" style="--i:1"><div class="lc-top"><b>' + icon('calendar', 18) + ' LỊCH HỌC</b><button type="button" class="lc-edit" data-act="lcOpen">' + icon('edit', 15) + ' Sửa</button></div>' +
      strip + '<p class="lc-dh">' + head + '</p><div class="lc-list">' + list + '</div>' + exp + nhacRow + odenA + '</section>';
  }
  function daysTxt(d) {
    d = (d || []).slice().sort();
    if (d.length === 7) return 'mỗi ngày';
    if (d.join(',') === '0,1,2,3,4') return 'T2–T6';
    return d.map(function (i) { return DAYS[i]; }).join(', ');
  }

  /* ---------------- tấm Lịch của tôi ---------------- */
  function gridHTML() {
    var s = lich().s;
    var h = '<div class="lg" role="grid"><span class="lg-c lg-h"></span>' + [0, 1, 2, 3, 4].map(function (d) { return '<span class="lg-c lg-h">' + DAYS[d] + '</span>'; }).join('');
    for (var c = 0; c < CA.length; c++) {
      h += '<span class="lg-c lg-ca"><b>' + CA[c][0] + '</b><small>' + CA[c][1] + '</small></span>';
      for (var d = 0; d < 5; d++) {
        var x = s[d + '-' + c], m = x && MON[x.m];
        h += '<button type="button" class="lg-c lg-cell' + (m ? ' is-on' : '') + '"' + (m ? ' style="--lc:' + m.c + ';--lt:' + m.t + '"' : '') + ' data-act="lcCell" data-k="' + d + '-' + c + '" aria-label="' + DAYN[d] + ', tiết ' + CA[c][0] + (m ? ', ' + m.n : ', trống') + '">' +
          (m ? '<b>' + esc(m.s) + '</b><small>' + esc(PLACE[x.p] ? PLACE[x.p][1] : '') + '</small>' : '<i>+</i>') + '</button>';
      }
    }
    return h + '</div>';
  }
  function legend() { return '<div class="lg-leg">' + MKEYS.map(function (k) { return '<span><i style="background:' + MON[k].c + '"></i>' + MON[k].s + ' = ' + MON[k].n + '</span>'; }).join('') + '</div>'; }
  function nhacHTML() {
    var n = nhac() || { t: '20:30', d: [0, 1, 2, 3, 4, 5, 6] }, on = !!nhac();
    return '<div class="ps-form"><label>Giờ tự học<input class="ps-inp" type="time" id="lcNt" value="' + esc(n.t) + '"></label></div>' +
      '<div class="lc-chips">' + DAYS.map(function (x, i) { return '<button type="button" class="lc-chip' + (n.d.indexOf(i) >= 0 ? ' is-sel' : '') + '" data-act="lcNd" data-i="' + i + '">' + x + '</button>'; }).join('') + '</div>' +
      (on ? '<p class="ps-small">Đang nhắc ' + esc(n.t) + ' · ' + esc(daysTxt(n.d)) + '. <button type="button" class="ps-link" data-act="lcNoff">Tắt nhắc tự học</button></p>' : '<p class="ps-small">Chọn giờ và ngày, rồi bấm Lưu. Một lời nhắc dùng cho mọi khóa học.</p>') +
      '<button type="button" class="ps-btn ps-btn--sm ps-btn--soft" data-act="lcNsave">' + icon('check', 16) + (on ? ' Cập nhật giờ tự học' : ' Lưu giờ tự học') + '</button>';
  }
  function gLinks() {
    var g = groups(), n = nhac(), out = [];
    g.forEach(function (x) { out.push('<a class="lc-glink" target="_blank" rel="noopener" href="' + gcal(x) + '">' + icon('ext', 14) + esc(MON[x.m].n) + ' · ' + x.d.map(function (i) { return DAYS[i]; }).join(', ') + ' · ' + CA[x.c][1] + '</a>'); });
    if (n) out.push('<a class="lc-glink" target="_blank" rel="noopener" href="' + gcal({ study: 1 }) + '">' + icon('ext', 14) + 'Tự học e-learning · ' + esc(daysTxt(n.d)) + ' · ' + esc(n.t) + '</a>');
    return out.join('');
  }
  function sheetBody() {
    var n = count();
    return '<section class="lc-sec" id="lcSecLich"><h3>1. Lịch trên lớp</h3><p class="ps-small">Chạm vào ô để chọn môn và cơ sở. Chạm lại để đổi hoặc xóa.</p>' + gridHTML() + legend() +
      '<div class="ps-form" style="margin-top:12px"><label>Lịch lặp hằng tuần đến ngày<input class="ps-inp" type="date" id="lcEnd" value="' + esc(endDate()) + '"></label></div>' +
      '<p class="ps-small">Mặc định 3 tháng. Hết khóa học thì lịch tự dừng, không nhắc mãi.</p></section>' +
      '<section class="lc-sec" id="lcSecNhac"><h3>2. Giờ tự học e-learning</h3>' + nhacHTML() + '</section>' +
      '<section class="lc-sec"><h3>3. Thêm vào lịch điện thoại</h3>' +
      ((n || nhac()) ? '<p class="ps-small">Điện thoại nhắc trước giờ học trên lớp 15 phút, và đúng giờ tự học.</p>' +
        '<button type="button" class="ps-btn lc-wide" data-act="lcExport">' + icon('phone', 18) + ' Thêm vào lịch điện thoại</button>' +
        '<p class="ps-small lc-howto"><b>iPhone:</b> chọn <i>Thêm tất cả</i>. <b>Android:</b> mở tệp vừa tải bằng ứng dụng Lịch. Khi đổi lịch, hãy xóa lịch cũ trên điện thoại rồi thêm lại.</p>' +
        '<details class="lc-det"><summary>Hoặc thêm từng môn vào Google Calendar</summary>' + gLinks() + '</details>'
        : '<p class="ps-small">Đặt lịch trên lớp hoặc giờ tự học trước nhé.</p>') + '</section>' +
      '<a class="lc-oden lc-oden--big" href="' + ODEN + '" target="_blank" rel="noopener">' + icon('ext', 16) + '<span>Xem lịch học trên <b>oden.vn</b></span></a>' +
      '<button type="button" class="ps-btn lc-wide" data-act="lcClose" style="margin-top:16px">Xong</button>';
  }
  var onClose = null;
  function open(to, cb) {
    onClose = cb || null;
    var ov = D.createElement('div'); ov.className = 'sheet sheet--lc'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Lịch học của tôi');
    ov.innerHTML = '<div class="sheet__in"><div class="sheet__top"><h2>Lịch học của tôi</h2><button type="button" class="sheet__x" data-act="lcClose" aria-label="Đóng">' + icon('close', 20) + '</button></div><div id="lcBody">' + sheetBody() + '</div></div>';
    D.body.appendChild(ov); D.body.classList.add('ps-lock');
    if (W.PSSheetPush) W.PSSheetPush(); /* PS1.3.34: nút Back đóng tấm */
    wire();
    if (to === 'nhac') setTimeout(function () { var e = D.getElementById('lcSecNhac'); if (e) e.scrollIntoView({ behavior: noMotion ? 'auto' : 'smooth', block: 'start' }); }, 120);
  }
  function redraw() { var b = D.getElementById('lcBody'); if (!b) return; var y = b.parentNode.parentNode.scrollTop; b.innerHTML = sheetBody(); b.parentNode.parentNode.scrollTop = y; wire(); }
  function wire() {
    var e = D.getElementById('lcEnd');
    if (e) e.addEventListener('change', function () { var l = lich(); if (/^\d{4}-\d{2}-\d{2}$/.test(e.value)) { l.end = e.value; saveLich(l); } });
  }
  function close(fromBack) {
    var s = D.querySelector('.sheet--lc'); if (s) s.parentNode.removeChild(s); D.body.classList.remove('ps-lock');
    if (fromBack !== true && W.PSSheetDone) W.PSSheetDone();
    var cb = onClose; onClose = null; if (cb) cb();
    /* lần đầu đặt lịch: hỏi thêm vào lịch điện thoại */
    if ((count() || nhac()) && !PS.prefs().lichExp && !PS.prefs().lichAsked) {
      PS.setPref('lichAsked', 1);
      setTimeout(function () {
        PS.dialog({ icon: 'bell', title: 'Thêm vào lịch điện thoại?', html: '<p>Điện thoại sẽ nhắc bạn trước giờ học trên lớp 15 phút' + (nhac() ? ' và đúng giờ tự học' : '') + '.</p>',
          buttons: [{ t: 'Thêm vào lịch', cls: 'ps-btn--go', fn: function () { exportIcs(); return true; } }, { t: 'Để sau', cls: 'ps-btn--soft' }] });
      }, 300);
    }
  }
  function cellDlg(k) {
    var p = k.split('-'), d = +p[0], c = +p[1], l = lich(), cur = l.s[k] || null;
    var selM = cur ? cur.m : '', selP = cur ? cur.p : '';
    function body() {
      return '<p class="ps-small" style="margin-top:0">Môn học</p><div class="lc-chips">' + MKEYS.map(function (m) { return '<button type="button" class="lc-chip lc-chip--m' + (selM === m ? ' is-sel' : '') + '" style="--lc:' + MON[m].c + '" data-m="' + m + '">' + MON[m].n + '</button>'; }).join('') + '</div>' +
        '<p class="ps-small">Cơ sở</p><div class="lc-chips">' + PKEYS.map(function (x) { return '<button type="button" class="lc-chip' + (selP === x ? ' is-sel' : '') + '" data-p="' + x + '">' + PLACE[x][0] + '</button>'; }).join('') + '</div>';
    }
    var btns = [{ t: 'Lưu', cls: 'ps-btn--go', fn: function (ov) {
      if (!selM) { var w = ov.querySelector('.lc-warn'); if (w) w.textContent = 'Chọn môn học nhé.'; return false; }
      var L = lich(); L.last = L.last || {}; L.s[k] = { m: selM, p: selP || 'ac' }; L.last[selM] = selP || 'ac'; saveLich(L); SEL = d; redraw(); return true;
    } }];
    if (cur) btns.push({ t: 'Xóa ô này', cls: 'ps-btn--soft', fn: function () { var L = lich(); delete L.s[k]; saveLich(L); redraw(); return true; } });
    btns.push({ t: 'Hủy', cls: 'ps-btn--soft' });
    PS.dialog({ title: DAYN[d] + ' · Tiết ' + CA[c][0], html: '<p class="lc-dlg-t">' + CA[c][1] + '–' + CA[c][2] + '</p><div class="lc-dlg">' + body() + '</div><p class="lc-warn" role="alert"></p>', buttons: btns,
      onOpen: function (ov) {
        ov.querySelector('.lc-dlg').addEventListener('click', function (e) {
          var b = PS.closest(e.target, '[data-m],[data-p]'); if (!b) return;
          if (b.getAttribute('data-m')) { selM = b.getAttribute('data-m'); if (!selP) selP = (lich().last || {})[selM] || 'ac'; }
          else selP = b.getAttribute('data-p');
          ov.querySelector('.lc-dlg').innerHTML = body(); var w = ov.querySelector('.lc-warn'); if (w) w.textContent = '';
        });
      } });
  }

  /* ---------------- xuất lịch ---------------- */
  function groups() {
    var s = lich().s, g = {}, out = [];
    for (var k in s) if (s.hasOwnProperty(k) && MON[s[k].m]) {
      var p = k.split('-'), key = s[k].m + '|' + p[1] + '|' + s[k].p;
      if (!g[key]) { g[key] = { m: s[k].m, c: +p[1], p: s[k].p, d: [] }; out.push(g[key]); }
      g[key].d.push(+p[0]);
    }
    out.forEach(function (x) { x.d.sort(); });
    out.sort(function (a, b) { return a.c - b.c || a.d[0] - b.d[0]; });
    return out;
  }
  function firstDate(days, t) {
    var now = new Date(), base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (var k = 0; k < 8; k++) { var d = addDays(base, k); if (days.indexOf(wd(d)) >= 0) { var a = t.split(':'); d.setHours(+a[0], +a[1], 0, 0); if (d > now || k > 0) return d; } }
    return base;
  }
  function icsT(d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00'; }
  function until() { return endDate().replace(/-/g, '') + 'T235959'; }
  function ev(x) {
    if (x.study) { var n = nhac(), s0 = firstDate(n.d, n.t);
      return { uid: 'ps-tuhoc', s: s0, e: new Date(s0.getTime() + 20 * 60000), rr: 'FREQ=WEEKLY;BYDAY=' + n.d.map(function (i) { return BYD[i]; }).join(',') + ';UNTIL=' + until(),
        sum: 'Tự học e-learning · Proskills', loc: '', desc: 'Mở Proskills và học tiếp một chặng.', al: 'PT0M' }; }
    var s = firstDate(x.d, CA[x.c][1]), e = new Date(s.getTime()); var b = CA[x.c][2].split(':'); e.setHours(+b[0], +b[1], 0, 0);
    return { uid: 'ps-' + x.m + '-' + x.c + '-' + x.p, s: s, e: e, rr: 'FREQ=WEEKLY;BYDAY=' + x.d.map(function (i) { return BYD[i]; }).join(',') + ';UNTIL=' + until(),
      sum: MON[x.m].n + ' · Tiết ' + CA[x.c][0], loc: 'Cơ sở ' + PLACE[x.p][0], desc: 'Lịch học trên lớp (Proskills). Đến sớm 10 phút nhé.', al: '-PT15M' };
  }
  /* gấp dòng dài quá 75 byte (chuẩn iCalendar), không cắt giữa ký tự tiếng Việt */
  function fold(line) {
    var out = '', cur = '', n = 0;
    for (var i = 0; i < line.length; i++) {
      var ch = line.charAt(i), c = line.charCodeAt(i), b = c < 128 ? 1 : (c < 2048 ? 2 : 3);
      if (n + b > (out ? 74 : 75)) { out += (out ? '\r\n ' : '') + cur; cur = ''; n = 0; }
      cur += ch; n += b;
    }
    return out ? out + '\r\n ' + cur : cur;
  }
  function utc(d) { return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z'; }
  function txt(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }
  function buildIcs() {
    var L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Proskills//Lich hoc//VI', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Lịch học Proskills'];
    var list = groups().map(ev); if (nhac()) list.push(ev({ study: 1 }));
    var st = utc(new Date());
    list.forEach(function (x) {
      L.push('BEGIN:VEVENT', 'UID:' + x.uid + '@proskills', 'DTSTAMP:' + st, 'DTSTART:' + icsT(x.s), 'DTEND:' + icsT(x.e), 'RRULE:' + x.rr, 'SUMMARY:' + txt(x.sum));
      if (x.loc) L.push('LOCATION:' + txt(x.loc));
      L.push('DESCRIPTION:' + txt(x.desc), 'BEGIN:VALARM', 'TRIGGER:' + x.al, 'ACTION:DISPLAY', 'DESCRIPTION:' + txt(x.sum), 'END:VALARM', 'END:VEVENT');
    });
    L.push('END:VCALENDAR');
    return L.map(fold).join('\r\n');
  }
  function exportIcs() {
    if (!count() && !nhac()) { PS.toast('Đặt lịch học hoặc giờ tự học trước nhé.'); return; }
    var ics = buildIcs(), ua = W.navigator.userAgent || '';
    var ios = /iPad|iPhone|iPod/.test(ua) || (W.navigator.platform === 'MacIntel' && W.navigator.maxTouchPoints > 1);
    if (ios) { W.location.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics); }
    else PS.download('Lich-hoc-Proskills.ics', ics, 'text/calendar');
    PS.setPref('lichExp', sig());
    PS.toast(ios ? 'Chọn <b>Thêm tất cả</b> để lưu vào lịch iPhone.' : 'Mở tệp vừa tải bằng ứng dụng <b>Lịch</b> để thêm lời nhắc.', 6000);
    redraw(); if (W.PSHubRender) W.PSHubRender();
  }
  function gcal(x) {
    var e = ev(x);
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&ctz=Asia%2FHo_Chi_Minh&text=' + encodeURIComponent(e.sum) + '&dates=' + icsT(e.s) + '/' + icsT(e.e) +
      '&recur=' + encodeURIComponent('RRULE:' + e.rr) + (e.loc ? '&location=' + encodeURIComponent(e.loc) : '') + '&details=' + encodeURIComponent(e.desc);
  }

  /* ---------------- sự kiện ---------------- */
  var ND = null; /* ngày đang chọn ở phần tự học (chưa lưu) */
  D.addEventListener('click', function (e) {
    var b = PS.closest(e.target, '[data-act]'); if (!b) return;
    var a = b.getAttribute('data-act');
    if (a.indexOf('lc') !== 0) return;
    if (a === 'lcOpen') open(b.getAttribute('data-to'), W.PSHubRender);
    else if (a === 'lcClose') close();
    else if (a === 'lcDay') { SEL = +b.getAttribute('data-d'); if (W.PSHubRender) W.PSHubRender(); }
    else if (a === 'lcCell') cellDlg(b.getAttribute('data-k'));
    else if (a === 'lcExport') exportIcs();
    else if (a === 'lcNd') {
      var i = +b.getAttribute('data-i'); if (!ND) ND = (nhac() || { d: [0, 1, 2, 3, 4, 5, 6] }).d.slice();
      var k = ND.indexOf(i); if (k >= 0) { if (ND.length > 1) ND.splice(k, 1); } else ND.push(i); ND.sort();
      Array.prototype.forEach.call(D.querySelectorAll('[data-act="lcNd"]'), function (x) { x.classList.toggle('is-sel', ND.indexOf(+x.getAttribute('data-i')) >= 0); });
    }
    else if (a === 'lcNsave') {
      var t = (D.getElementById('lcNt') || {}).value || '20:30';
      PS.setPref('nhac', { t: t, d: ND || (nhac() || { d: [0, 1, 2, 3, 4, 5, 6] }).d }); ND = null;
      PS.toast('Đã lưu giờ tự học <b>' + esc(t) + '</b>.'); redraw();
    }
    else if (a === 'lcNoff') { PS.setPref('nhac', null); ND = null; PS.toast('Đã tắt nhắc tự học. Nhớ xóa sự kiện cũ trên lịch điện thoại nếu đã thêm.', 5000); redraw(); }
  });
  D.addEventListener('keydown', function (e) { if ((e.key === 'Escape' || e.keyCode === 27) && D.querySelector('.sheet--lc') && !D.querySelector('.ps-ov')) close(); });

  W.PSLich = { cardHTML: cardHTML, open: open, close: close, buildIcs: buildIcs, count: count };
})(window, document);
