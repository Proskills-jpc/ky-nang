/* CD02 · cd02/art.js · HÌNH VẼ: biểu tượng, cờ, con thuyền, đảo, la bàn, hải đồ, 8 cảnh bến, con dấu, Shin thuyền trưởng.
   Hình tự vẽ của khóa. Từ PS1.3.39 (CD02.1.1): nét mực đen kiểu sổ tay, tô chấm, một màu nhấn cam đất, 4 tông nhạt theo vòng. ES5. */

/* biểu tượng nét (24×24, stroke currentColor) */
var CD2_IC = {
  anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M8 11h8"/><path d="M4.5 13.5c.6 4 3.8 6.5 7.5 6.5s6.9-2.5 7.5-6.5"/><path d="M3 15l1.5-1.5L6 15M18 15l1.5-1.5L21 15"/>',
  scope: '<path d="M3 15.5 15 6l2.5 3.2-12 9.5z"/><path d="M14.2 6.6 16 5l3.5 4.4-1.8 1.5"/><path d="M9 16.5 7 21M11 15l3 6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/>',
  map: '<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
  wave: '<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M7 10c0-3 2.5-5.5 5.5-5.5S18 7 18 9.5"/>',
  light: '<path d="M9 21h6M10 21l.8-11h2.4l.8 11"/><path d="M9.5 10h5l-.6-3h-3.8z"/><path d="M12 4.5V3M7 6 5.5 5M17 6l1.5-1"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 3.5 2 3.5H5"/>',
  stairs: '<path d="M3 20h5v-5h5v-5h5V5h3"/>',
  cycle: '<path d="M20 11a8 8 0 0 0-14.3-4.6"/><path d="M5 3v4h4"/><path d="M4 13a8 8 0 0 0 14.3 4.6"/><path d="M19 21v-4h-4"/>', /* PS1.3.49: về rồi lại sang Nhật */
  turn: '<path d="M6 20V11a5 5 0 0 1 5-5h7"/><path d="m15 3 3 3-3 3"/>',
  cap: '<path d="M2 9.5 12 5l10 4.5L12 14z"/><path d="M6 11.5V16c1.8 1.6 3.8 2.3 6 2.3s4.2-.7 6-2.3v-4.5"/><path d="M21 10v5"/>',
  wind: '<path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 14h15a3 3 0 1 1-3 3"/><path d="M3 19h6"/>',
  speech: '<path d="M4 5h16v10H9l-5 4z"/><path d="M8.5 9h7M8.5 12h4"/>',
  shop: '<path d="M4 10v10h16V10"/><path d="M3 10 5 4h14l2 6c0 1.4-1.1 2.3-2.4 2.3S16.2 11.4 16.2 10c0 1.4-1.1 2.3-2.4 2.3s-2.4-.9-2.4-2.3c0 1.4-1.1 2.3-2.4 2.3S6.6 11.4 6.6 10c0 1.4-1.1 2.3-2.4 2.3"/><path d="M10 20v-5h4v5"/>',
  bridge: '<path d="M2 17h20"/><path d="M4 17V9M20 17V9"/><path d="M4 9c4 0 6 4 8 4s4-4 8-4"/><path d="M8 17v-4M12 17v-4M16 17v-4"/>',
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
  tool: '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2c-.5-.8-1.5-1.3-2.8-1.3-1.6 0-2.7.8-2.7 2 0 2.8 5.6 1.5 5.6 4.3 0 1.2-1.2 2-2.9 2-1.4 0-2.5-.6-3-1.5M12 6.5v11"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.6-3 2.7-5 5.5-5s4.9 2 5.5 5"/><circle cx="16.5" cy="9" r="2.4"/><path d="M15.5 14.2c2.5 0 4.3 1.8 5 4.8"/>',
  ship: '<path d="M3 15h18l-2.5 4.5h-13z"/><path d="M12 3v12"/><path d="M12 4 18 12h-6"/><path d="M11 6 6 12h5"/>',
  card: '<rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="12" cy="10" r="3"/><path d="M8 17c.7-1.7 2.2-2.6 4-2.6s3.3.9 4 2.6"/>',
  bottle: '<path d="M10 3h4v3.5l2 3V20a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9.5l2-3z"/><path d="M8 13h8"/>',
  arrowL: '<path d="M15 5 8 12l7 7"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 12h7M9 16h5"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
};
CD2_IC.key = '<circle cx="7.5" cy="15.5" r="4"/><path d="M10.5 12.5l9-9M15.5 7.5l3 3M18 5l2 2"/>'; /* PS1.3.51 */
function cdIc(k, sz, sw) {
  sz = sz || 20; sw = sw || 2;
  if (!CD2_IC[k]) return PS.icon(k, sz, sw);
  return '<svg class="ps-ic" width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + CD2_IC[k] + '</svg>';
}


/* ---------- bảng màu chung của hình (đổi ở đây là đổi cả khóa) ---------- */
var CD2_COL = {
  ink: '#141413', clay: '#D97757', clayB: '#C15F3C', clayD: '#B5532F', navy: '#2B3A55',
  peach: '#EBCBB9', lav: '#CBCAD9', sage: '#BCD3CB', khaki: '#DDDAD0', sea: '#DCE6EC', paper: '#FFFDF8', kraft: '#D4A27F'
};
/* tông nền tranh theo vòng: 1 Khám phá · 2 Thiết kế · 3 Ra khơi · cảng */
function roundBg(r) { return r === 1 ? CD2_COL.peach : (r === 2 ? CD2_COL.lav : (r === 3 ? CD2_COL.sage : CD2_COL.khaki)); }
/* tông đảo theo phía: Ở Nhật · Về Việt Nam · Cả hai */
function sideBg(side) { return side === 'jp' ? CD2_COL.sage : (side === 'vn' ? CD2_COL.peach : CD2_COL.lav); }

/* Mẫu tô chấm: chèn một lần vào trang (dùng chung cho mọi hình) */
(function () {
  try {
    var d = document.createElement('div');
    d.innerHTML = '<svg width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>' +
      '<pattern id="cd2dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".75" fill="#141413"/><circle cx="3" cy="3" r=".75" fill="#141413"/></pattern>' +
      '<pattern id="cd2dotsL" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1.2" cy="1.2" r=".7" fill="#141413" opacity=".55"/><circle cx="3.7" cy="3.7" r=".7" fill="#141413" opacity=".55"/></pattern>' +
      '</defs></svg>';
    document.body.appendChild(d.firstChild);
  } catch (e) {}
})();

/* ---------- nét vẽ cơ bản ---------- */
function aP(d, f, w, x) { return '<path d="' + d + '" fill="' + (f || 'none') + '" stroke="#141413" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (x || '') + '/>'; }
function aC(cx, cy, r, f, w) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (f || 'none') + '" stroke="#141413" stroke-width="' + (w || 2) + '"/>'; }
function aR(x, y, w, h, f, sw, rx) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + (f || 'none') + '" stroke="#141413" stroke-width="' + (sw || 2) + '" stroke-linejoin="round"/>'; }
function aWave(x, y, n, s, o) { var d = 'M' + x + ' ' + y; for (var i = 0; i < n; i++) d += 'q' + s / 2 + ' ' + (-s / 3) + ' ' + s + ' 0'; return '<path d="' + d + '" fill="none" stroke="#141413" stroke-width="1.6" stroke-linecap="round" opacity="' + (o || 1) + '"/>'; }
function aGull(x, y, k) { k = k || 1; return '<path d="M' + x + ' ' + y + 'q' + 4 * k + ' ' + (-5 * k) + ' ' + 8 * k + ' 0q' + 4 * k + ' ' + (-5 * k) + ' ' + 8 * k + ' 0" fill="none" stroke="#141413" stroke-width="1.6" stroke-linecap="round"/>'; }
function aDots(d, o, light) { return '<path d="' + d + '" fill="url(#' + (light ? 'cd2dotsL' : 'cd2dots') + ')" opacity="' + (o == null ? 1 : o) + '"/>'; }

/* ---------- nét bút sổ tay (PS1.3.40, bổ sung 19/11) ----------
   Thay bộ lọc cd2rough (làm nét gãy bậc thang, nặng máy yếu). hand(svg) uốn mỗi đoạn thẳng của path/rect/line
   thành đường cong rất nhẹ như tay kéo bút; điểm đầu cuối giữ nguyên nên các hình vẫn khép kín.
   Tính một lần khi vẽ (có bộ nhớ đệm), không tốn gì khi cuộn. Không dùng cho flagSVG, compassSVG, Shin, chữ. */
var HAND_C = {}, HAND_N = 0;
function hF(v) { return Math.round(v * 100) / 100; }
function hRand(a, b, c, d) { var x = Math.sin(a * 12.9898 + b * 78.233 + c * 37.719 + d * 4.581) * 43758.5453; return x - Math.floor(x); }
function hSeg(x0, y0, x1, y1) {
  var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy);
  if (L < 5) return 'L' + hF(x1) + ' ' + hF(y1);
  var sw = x0 > x1 || (x0 === x1 && y0 > y1), ax = sw ? x1 : x0, ay = sw ? y1 : y0, bx = sw ? x0 : x1, by = sw ? y0 : y1;
  var r = hRand(ax, ay, bx, by), r2 = hRand(by, bx, ay, ax);
  var amp = Math.min(Math.max(L * .02, .3), 1.4) * (r < .5 ? -1 : 1) * (.55 + .45 * r2);
  var nx = -(by - ay) / L, ny = (bx - ax) / L, t = .4 + .2 * r2;
  return 'Q' + hF(ax + (bx - ax) * t + nx * amp * 2) + ' ' + hF(ay + (by - ay) * t + ny * amp * 2) + ' ' + hF(x1) + ' ' + hF(y1);
}
function handD(d) {
  var tk = String(d).match(/[A-Za-z]|-?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g); if (!tk) return d;
  var i = 0, o = '', cmd = '', x = 0, y = 0, sx = 0, sy = 0, qx = null, qy = 0, cx = null, cy = 0;
  function need(k) { if (i + k > tk.length) throw 1; for (var j = i; j < i + k; j++) if (/[A-Za-z]/.test(tk[j])) throw 1; }
  function n() { return +tk[i++]; }
  try {
    while (i < tk.length) {
      if (/[A-Za-z]/.test(tk[i])) cmd = tk[i++]; else if (!cmd) return d;
      var rel = cmd >= 'a', C = cmd.toUpperCase(), ox = rel ? x : 0, oy = rel ? y : 0, nq = null, nc = null, a, b, c1, c2, e, f;
      if (C === 'Z') { if (Math.abs(x - sx) + Math.abs(y - sy) > .01) o += hSeg(x, y, sx, sy); o += 'Z'; x = sx; y = sy; qx = cx = null; continue; }
      if (C === 'M') { need(2); x = ox + n(); y = oy + n(); sx = x; sy = y; o += 'M' + hF(x) + ' ' + hF(y); cmd = rel ? 'l' : 'L'; }
      else if (C === 'L') { need(2); a = ox + n(); b = oy + n(); o += hSeg(x, y, a, b); x = a; y = b; }
      else if (C === 'H') { need(1); a = ox + n(); o += hSeg(x, y, a, y); x = a; }
      else if (C === 'V') { need(1); b = oy + n(); o += hSeg(x, y, x, b); y = b; }
      else if (C === 'C') { need(6); c1 = ox + n(); c2 = oy + n(); a = ox + n(); b = oy + n(); e = ox + n(); f = oy + n(); o += 'C' + [c1, c2, a, b, e, f].map(hF).join(' '); nc = [a, b]; x = e; y = f; }
      else if (C === 'S') { need(4); c1 = cx != null ? 2 * x - cx : x; c2 = cx != null ? 2 * y - cy : y; a = ox + n(); b = oy + n(); e = ox + n(); f = oy + n(); o += 'C' + [c1, c2, a, b, e, f].map(hF).join(' '); nc = [a, b]; x = e; y = f; }
      else if (C === 'Q') { need(4); a = ox + n(); b = oy + n(); e = ox + n(); f = oy + n(); o += 'Q' + [a, b, e, f].map(hF).join(' '); nq = [a, b]; x = e; y = f; }
      else if (C === 'T') { need(2); a = qx != null ? 2 * x - qx : x; b = qx != null ? 2 * y - qy : y; e = ox + n(); f = oy + n(); o += 'Q' + [a, b, e, f].map(hF).join(' '); nq = [a, b]; x = e; y = f; }
      else if (C === 'A') { need(7); a = n(); b = n(); c1 = n(); c2 = n(); var fs = n(); e = ox + n(); f = oy + n(); o += 'A' + [a, b, c1, c2, fs, hF(e), hF(f)].join(' '); x = e; y = f; }
      else return d;
      if (nc) { cx = nc[0]; cy = nc[1]; } else cx = null;
      if (nq) { qx = nq[0]; qy = nq[1]; } else qx = null;
    }
  } catch (er) { return d; }
  return o;
}
function hAttr(t, k) { var m = new RegExp('\\s' + k + '="([^"]*)"').exec(t); return m ? m[1] : null; }
function hStrip(t, ks) { ks.forEach(function (k) { t = t.replace(new RegExp('\\s' + k + '="[^"]*"'), ''); }); return t; }
function hand(svg) {
  svg = String(svg || ''); if (HAND_C[svg]) return HAND_C[svg];
  var out = svg.replace(/<rect\b([^>]*?)\/>/g, function (m, at) {
    var st = hAttr(at, 'stroke'); if (!st || st === 'none') return m;
    var x = +(hAttr(at, 'x') || 0), y = +(hAttr(at, 'y') || 0), w = +hAttr(at, 'width'), h = +hAttr(at, 'height'), r = +(hAttr(at, 'rx') || 0);
    if (!(w > 0 && h > 0)) return m; r = Math.min(r, w / 2, h / 2);
    var d = r > 0 ? 'M' + (x + r) + ' ' + y + 'H' + (x + w - r) + 'A' + r + ' ' + r + ' 0 0 1 ' + (x + w) + ' ' + (y + r) + 'V' + (y + h - r) + 'A' + r + ' ' + r + ' 0 0 1 ' + (x + w - r) + ' ' + (y + h) + 'H' + (x + r) + 'A' + r + ' ' + r + ' 0 0 1 ' + x + ' ' + (y + h - r) + 'V' + (y + r) + 'A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + y + 'Z'
      : 'M' + x + ' ' + y + 'H' + (x + w) + 'V' + (y + h) + 'H' + x + 'Z';
    return '<path d="' + d + '"' + hStrip(at, ['x', 'y', 'width', 'height', 'rx', 'ry']) + '/>';
  }).replace(/<line\b([^>]*?)\/>/g, function (m, at) {
    return '<path d="M' + hAttr(at, 'x1') + ' ' + hAttr(at, 'y1') + 'L' + hAttr(at, 'x2') + ' ' + hAttr(at, 'y2') + '"' + hStrip(at, ['x1', 'y1', 'x2', 'y2']) + '/>';
  }).replace(/(<path\b[^>]*?\sd=")([^"]*)"/g, function (m, a, d) { return a + handD(d) + '"'; });
  if (++HAND_N > 400) { HAND_C = {}; HAND_N = 0; }
  HAND_C[svg] = out; return out;
}

/* Shin thuyền trưởng: gà lớn (core/shin.js), mũ thuyền trưởng + khăn cam đất */
function shinRecolor(s) { return String(s || '').replace(/#0F9F98/g, '#D97757').replace(/#0B6F6A/g, '#B5532F'); }
function shin2(mood, sz, cls) {
  var s = W_PSShin() ? shinRecolor(W_PSShin().svg(mood || 'hi', { stg: 3, fit: 'captain', cls: cls || '' })) : '';
  return '<span class="shin" style="width:' + (sz || 64) + 'px">' + s + '</span>';
}
function W_PSShin() { return window.PSShin || null; }

/* ---------- cờ: 6 tông dịu (PS1.3.39). Cờ cũ màu tươi tự đổi sang tông dịu gần nhất ---------- */
var FLAG_OLD = { '#0F9F98': '#6E9E94', '#2C5BC4': '#5E7FA8', '#E8574A': '#D97757', '#F2B21B': '#D9A84E', '#7A55D3': '#8C82B4', '#2A2118': '#3D3D3A' };
function flagCol(c) { return FLAG_OLD[c] || c || '#D97757'; }
function flagInk(c) { return c === '#D9A84E' ? '#141413' : '#fff'; }
/* biểu tượng trên cờ (vẽ trong hệ 40×40, tâm 20,20) */
/* PS1.3.57 (góp ý 2): biểu tượng 'av' = ảnh đại diện của học viên (hub/avatar.js), vẽ trong khung 40×40.
   Đọc ảnh lúc vẽ nên đổi ảnh ở trang chủ hay trong CD02 thì cờ, thuyền, phiếu đổi theo. clipPath có id riêng mỗi lần vẽ. */
var AVN = 0;
function avSym() {
  var A = window.PSAvatar; if (!A || !A.cur) return '';
  var c = A.cur(), id = 'cdav' + (++AVN), a;
  if (c.t === 'i' && A.map && (a = A.map[c.k])) return '<circle cx="20" cy="20" r="19.6" fill="#fff"/><g transform="translate(1.2 1.2) scale(.3917)"><defs><clipPath id="' + id + '"><circle cx="48" cy="48" r="48"/></clipPath></defs><g clip-path="url(#' + id + ')"><rect width="96" height="96" fill="' + a[2] + '"/>' + a[3] + '</g></g>';
  var col = (A.cols && A.cols[c.k]) || ['#FFE08F', '#6A4A00'], L = String(A.letter ? A.letter() : '?').replace(/[<>&"]/g, '');
  return '<circle cx="20" cy="20" r="19.6" fill="#fff"/><circle cx="20" cy="20" r="18" fill="' + col[0] + '"/><text x="20" y="26.6" text-anchor="middle" font-family="Be Vietnam Pro,sans-serif" font-weight="800" font-size="18" fill="' + col[1] + '">' + L + '</text>';
}
function flagSym(k, c) {
  c = c || '#fff';
  if (k === 'av') { var av = avSym(); if (av) return '<g transform="translate(20 20) scale(1.16) translate(-20 -20)">' + av + '</g>'; k = 'compass'; }
  switch (k) {
    case 'compass': return '<circle cx="20" cy="20" r="10" fill="none" stroke="' + c + '" stroke-width="2.4"/><path d="M20 9l3 11h-6z" fill="' + c + '"/><path d="M20 31l-3-11h6z" fill="' + c + '" opacity=".55"/>';
    case 'star': return '<path d="M20 8l3.4 7.4 8 .9-6 5.4 1.7 8-7.1-4.1-7.1 4.1 1.7-8-6-5.4 8-.9z" fill="' + c + '"/>';
    case 'sun': return '<circle cx="20" cy="20" r="6.5" fill="' + c + '"/><path d="M20 7v4M20 29v4M7 20h4M29 20h4M10.8 10.8l2.8 2.8M26.4 26.4l2.8 2.8M10.8 29.2l2.8-2.8M26.4 13.6l2.8-2.8" stroke="' + c + '" stroke-width="2.4" stroke-linecap="round"/>';
    case 'whale': return '<path d="M8 22c0-6 5-9 11-9 6.5 0 10 3.5 11 6l3-3-1 7c-1.5 4-6 6-12 6-7 0-12-2-12-7z" fill="' + c + '"/><circle cx="14" cy="20" r="1.4" fill="#141413"/><path d="M18 12q1-4 4-4M18 12q-1-3-3-4" stroke="' + c + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
    case 'wing': return '<path d="M7 24c6-1 10-6 12-13 1 6-1 10-4 13 4-1 8-4 10-9 1 7-4 13-12 14-3 .3-5-1-6-5z" fill="' + c + '"/>';
    case 'flame': return '<path d="M20 7c1 5 7 7 7 14a7 7 0 0 1-14 0c0-4 2-6 4-8 0 3 1 4 3 5-1-4 0-8 0-11z" fill="' + c + '"/>';
    case 'sakura': var p = ''; for (var i = 0; i < 5; i++) p += '<ellipse cx="20" cy="12.5" rx="4.2" ry="6.4" fill="' + c + '" transform="rotate(' + (i * 72) + ' 20 20)"/>'; return p + '<circle cx="20" cy="20" r="2.6" fill="#D9A84E"/>';
    case 'leaf': return '<path d="M10 30c0-13 8-20 21-21-1 13-8 21-21 21z" fill="' + c + '"/><path d="M11 29 25 15" stroke="#141413" stroke-opacity=".25" stroke-width="1.6" stroke-linecap="round"/>';
  }
  return '';
}
/* lá cờ: nền màu học viên chọn, đuôi xẻ, biểu tượng trắng (không dùng mẫu chung: còn dùng để xuất ảnh) */
function flagSVG(sym, col, w, wave) {
  col = flagCol(col); w = w || 120;
  var path = wave ? 'M4 6Q30 0 56 6T108 6L96 30 108 54Q82 48 56 54T4 54Z' : 'M4 6H108L96 30 108 54H4Z';
  return '<svg class="flag" viewBox="0 0 112 60" width="' + w + '" aria-hidden="true"><path d="' + path + '" fill="' + col + '" stroke="#141413" stroke-width="2" stroke-linejoin="round"/>' +
    '<g transform="translate(30 10)">' + flagSym(sym || 'compass', flagInk(col)) + '</g></svg>';
}
/* cờ trên cột (xem trước khi thiết kế) */
function flagMast(sym, col) {
  col = flagCol(col);
  return '<svg class="mast" viewBox="0 0 150 150" aria-hidden="true"><path d="M22 140V14" stroke="#141413" stroke-width="3.4" stroke-linecap="round"/><circle cx="22" cy="12" r="5" fill="#fff" stroke="#141413" stroke-width="1.8"/>' +
    '<g class="flagwave" transform="translate(24 18)"><path d="M0 4Q30 -2 56 4T110 4L98 30 110 56Q82 50 56 56T0 56Z" fill="' + col + '" stroke="#141413" stroke-width="2" stroke-linejoin="round"/>' +
    '<g transform="translate(30 10)">' + flagSym(sym || 'compass', flagInk(col)) + '</g></g>' +
    '<path d="M6 140h60" stroke="#141413" stroke-width="2.4" stroke-linecap="round"/><path d="M10 146q6-4 12 0t12 0 12 0" fill="none" stroke="#141413" stroke-width="1.4" stroke-linecap="round" opacity=".5"/></svg>';
}

/* ---------- con thuyền (PS1.3.40): thuyền buồm kiểu Nhật, vẽ vector tô màu cùng kiểu Shin (viền nâu đậm, màu phẳng ấm).
   Một kiểu xuyên suốt; huy hiệu giữa buồm = biểu tượng cờ, cờ đuôi nheo = màu cờ. lv giữ để tương thích. Không dùng hand(). ---------- */
function shipSVG(lv, sym, col, w) {
  col = flagCol(col);
  var o = '#4A2C17', wood = '#C98A4B', dk = '#7A4B2A', h = '', i;
  var hull = 'M5 47Q14 56 21 67H96L101 56H112L110 64Q106 82 92 87H33Q17 83 5 47Z';
  h += '<path d="M0 86q7-4 14 0t14 0 14 0 14 0 14 0 14 0 14 0 14 0 8 0V96H0Z" fill="#CFE3EC"/>';
  h += '<path d="M56 6L9 50M56 6L104 55" stroke="' + o + '" stroke-width="1" opacity=".55"/>';
  h += '<rect x="54.4" y="3" width="3.2" height="66" rx="1.2" fill="' + dk + '" stroke="' + o + '" stroke-width="1.4"/>';
  h += '<path d="M31 15H81Q84.5 37 81 59H31Q34.5 37 31 15Z" fill="#FFF8EC"/><path d="M75 15H81Q84.5 37 81 59H75Q78.5 37 75 15Z" fill="#EFE1C6"/>';
  var sl = ''; for (i = 0; i < 6; i++) { var x = 38.2 + i * 7.15; sl += 'M' + x.toFixed(1) + ' 16Q' + (x + 1.6).toFixed(1) + ' 37 ' + x.toFixed(1) + ' 58'; }
  h += '<path d="' + sl + '" fill="none" stroke="#DCC9A6" stroke-width="1.3"/>';
  h += '<path d="M31 15H81Q84.5 37 81 59H31Q34.5 37 31 15Z" fill="none" stroke="' + o + '" stroke-width="2" stroke-linejoin="round"/>';
  h += '<rect x="25" y="12" width="62" height="4" rx="2" fill="' + dk + '" stroke="' + o + '" stroke-width="1.4"/><rect x="29" y="57.5" width="54" height="3.2" rx="1.6" fill="' + dk + '" stroke="' + o + '" stroke-width="1.3"/>';
  h += '<path d="M32 60L24 67M80 60L92 64" stroke="' + o + '" stroke-width="1" opacity=".7"/>';
  h += '<circle cx="56" cy="36" r="12" fill="#fff" stroke="' + o + '" stroke-width="1.6"/><circle cx="56" cy="36" r="9.6" fill="none" stroke="' + col + '" stroke-width="1.3"/><g transform="translate(46.5 26.5) scale(.475)">' + flagSym(sym || 'compass', col) + '</g>';
  h += '<path d="M57.6 3h15l-3.5 3.5L72.6 10H57.6" fill="' + col + '" stroke="' + o + '" stroke-width="1.4" stroke-linejoin="round"/>';
  h += '<path d="' + hull + '" fill="' + wood + '"/>';
  h += '<path d="M22 77H105Q103 83 92 87H33Q26 84 22 77Z" fill="#A86A35"/>';
  h += '<path d="M8 51Q15 59 21 67H96L101 56H112L111 61H103L98 72H18Q12 62 8 51Z" fill="' + dk + '"/>';
  h += '<path d="M19 77H105M26 82.5H100" stroke="#8A5530" stroke-width="1.2" stroke-linecap="round"/>';
  h += '<path d="' + hull + '" fill="none" stroke="' + o + '" stroke-width="2.2" stroke-linejoin="round"/>';
  h += '<path d="M5 47L1.5 39" stroke="' + o + '" stroke-width="2.6" stroke-linecap="round"/>';
  h += '<path d="M86 67V60H98V67" fill="#F3D9A0" stroke="' + o + '" stroke-width="1.5" stroke-linejoin="round"/><rect x="89.5" y="61.5" width="5" height="3.6" rx=".6" fill="#7FB3CC" stroke="' + o + '" stroke-width="1"/>' +
    '<path d="M83.5 61L92 56 100.5 61Z" fill="#E8574A" stroke="' + o + '" stroke-width="1.5" stroke-linejoin="round"/>';
  h += '<path d="M110 64L115 66 113 80 106 83" fill="' + dk + '" stroke="' + o + '" stroke-width="1.4" stroke-linejoin="round"/>';
  h += '<path d="M20 90q6-3 12 0t12 0M72 91q6-3 12 0t12 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>';
  h += '<g transform="translate(16 46) scale(.2)">' + (W_PSShin() ? W_PSShin().svg('still', { stg: 3, fit: 'none' }).replace(/^<svg[^>]*>|<\/svg>$/g, '') : '') + '</g>';
  return '<svg class="ship" viewBox="0 0 120 96" width="' + (w || 120) + '" aria-hidden="true">' + h + '</svg>';
}

/* ---------- la bàn của học viên: 6 trục, chấm theo giá trị 0–10 (không dùng mẫu chung: còn xuất ảnh) ---------- */
/* PS1.3.44: la bàn to hơn, mỗi đầu trục có tên; đầu bạn nghiêng về in đậm cam đất + chấm mức (1–5). */
function compassSVG(vals, w) {
  var cx = 200, cy = 165, R = 76, h = '', pts = [], n = PAIRS.length, labs = '', LH = 16;
  function esc2(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function lines(t) { var w = t.split(' '); if (t.length <= 11 || w.length < 2) return [t]; var best = 99, a = t, b = ''; for (var k = 1; k < w.length; k++) { var l1 = w.slice(0, k).join(' '), d = Math.abs(l1.length - (t.length - l1.length - 1)); if (d < best) { best = d; a = l1; b = w.slice(k).join(' '); } } return [a, b]; }
  function lab(t, ang, on, lv) {
    var dx = Math.cos(ang), dy = Math.sin(ang), x = cx + dx * (R + 12), y = cy + dy * (R + 12), L = lines(t), rows = L.length + (on ? 1 : 0), hh = (rows - 1) * LH, anc, y0;
    if (Math.abs(dx) < .2) anc = 'middle'; else { anc = dx > 0 ? 'start' : 'end'; if (Math.abs(dy) > .8) x += dx * 8; }
    if (dy > .8) y0 = y + 14;                 /* dưới: chữ chạy xuống */
    else if (dy < -.8) y0 = y - hh - 5;       /* trên: chữ chạy lên */
    else y0 = y + (dy > .3 ? 6 : (dy < -.3 ? -6 : 0)) - hh / 2 + 5; /* ngang, chếch: canh giữa, đẩy nhẹ ra xa trục ngang */
    var s = '<text x="' + x.toFixed(1) + '" y="' + y0.toFixed(1) + '" text-anchor="' + anc + '" font-family="Be Vietnam Pro, Arial, sans-serif" font-size="14" font-weight="' + (on ? 600 : 400) + '" fill="' + (on ? '#9E4A2C' : '#6F6E69') + '">';
    L.forEach(function (l, i) { s += '<tspan x="' + x.toFixed(1) + '"' + (i ? ' dy="' + LH + '"' : '') + '>' + esc2(l) + '</tspan>'; });
    if (on) { var d = ''; for (var k = 1; k <= 5; k++) d += k <= lv ? '●' : '○'; s += '<tspan x="' + x.toFixed(1) + '" dy="' + LH + '" font-size="10.5" letter-spacing="1.5" fill="#C15F3C">' + d + '</tspan>'; }
    return s + '</text>';
  }
  h += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R + 4) + '" fill="#FFFDF8" stroke="#2B2A27" stroke-width="1.6"/><circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="#C9C2AF" stroke-dasharray="3 4"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R / 2) + '" fill="none" stroke="#E3DCCB"/>';
  var anyOn = false; for (var q = 0; q < n; q++) { if (vals && vals[q] != null && +vals[q] !== 5) anyOn = true; }
  for (var i = 0; i < n; i++) {
    var ang = (i / n) * Math.PI - Math.PI / 2, dx = Math.cos(ang), dy = Math.sin(ang);
    h += '<path d="M' + (cx - dx * R).toFixed(1) + ' ' + (cy - dy * R).toFixed(1) + 'L' + (cx + dx * R).toFixed(1) + ' ' + (cy + dy * R).toFixed(1) + '" stroke="#C9C2AF" stroke-width="1.1"/>';
    var v = vals && vals[i] != null ? +vals[i] : 5, t = (v - 5) / 5, lv = Math.round(Math.abs(v - 5));
    pts.push([cx + dx * R * t, cy + dy * R * t, v]);
    if (!anyOn || v > 5) labs += lab(PAIRS[i][1], ang, v > 5, lv); /* PS1.3.49: chỉ hiện ý học viên nghiêng về (thầy góp ý 11) */
    if (!anyOn || v < 5) labs += lab(PAIRS[i][0], ang + Math.PI, v < 5, lv);
  }
  var d = ''; pts.forEach(function (p, i) { d += (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); });
  h += '<path d="' + d + 'Z" fill="rgba(217,119,87,.22)" stroke="#B5532F" stroke-width="2" stroke-linejoin="round"/>';
  pts.forEach(function (p) { h += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (p[2] === 5 ? 3.5 : 5) + '" fill="' + (p[2] === 5 ? '#C9C2AF' : '#C15F3C') + '" stroke="#fff" stroke-width="2"/>'; });
  h += '<circle cx="' + cx + '" cy="' + cy + '" r="3.5" fill="#2B2A27"/>' + labs;
  return '<svg class="cmp" viewBox="0 0 400 330" width="' + (w || 340) + '" aria-hidden="true">' + h + '</svg>';
}

/* ---------- đảo (vẽ quanh 0,0): nền theo phía, bờ nét đứt, núi, cây ---------- */
/* PS1.3.40: mỗi đảo một công trình riêng theo con đường + dấu hiệu phía (Nhật: núi đỉnh tuyết · Việt Nam: cây dừa).
   Vẽ quanh 0,0; k = tỉ lệ (hải đồ 1.1, trang đảo 2.6). Nét cong nhẹ nhờ hand() ở mapSVG / sceneSVG. */
function isleDraw(is, k) {
  k = k || 1.1; var s = k > 1.5 ? .58 : 1, id = is && is.id, side = is && is.side;
  function P(d, f, w) { return aP(d, f, (w || 1.6) * s); }
  function R(x, y, w, h, f, sw) { return aR(x, y, w, h, f || '#fff', (sw || 1.5) * s, .6); }
  function T(x, y, t) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="8" font-weight="700" fill="#141413" font-family="sans-serif">' + t + '</text>'; }
  var G = 'M-31 7q-2-9 8-12 7-6 22-5 16-2 25 4 9 4 5 12-2 5-12 5h-38q-9 0-10-4z';
  var h = '<path d="' + G + '" transform="scale(1.14 1.3)" fill="none" stroke="#141413" stroke-width="' + (.9 * s) + '" stroke-dasharray="2 3" opacity=".5"/>' + P(G, sideBg(side), 1.8) +
    '<path d="M-22 9q22 4 42-2l3 4q-21 6-44 2z" fill="url(#cd2dots)" opacity=".5"/>';
  var side0 = { len: -1, re: -1, cau: -1, lap: 1, que: -1 }[id];
  if (side === 'jp') { var mx = side0 < 0 ? -30 : 10; h += P('M' + mx + ' -2l10-17 10 17', '#fff', 1.4) + '<path d="M' + (mx + 6) + ' -12.2l4-6.8 4 6.8-2-1.2-2 1.6-2-1.6z" fill="#141413" opacity=".8"/>'; }
  if (side === 'vn') { var px = side0 < 0 ? -25 : 25; h += P('M' + px + ' -1q1-10-2-18', 'none', 1.5) + P('M' + (px - 2) + ' -19q-7-3-10 2M' + (px - 2) + ' -19q7-4 10 1M' + (px - 2) + ' -19q-1-7 5-9M' + (px - 2) + ' -19q-5-6-9-5', 'none', 1.3); }
  if (id === 'len') { /* xưởng + bậc thang đi lên */
    h += R(-14, -15, 17, 13) + P('M-14 -15l4.2-5v5l4.2-5v5l4.2-5v5l4.2-5v5', '#fff', 1.4) + R(-8, -8, 5, 6, '#F6E6DD', 1.2) +
      P('M5 -2h5v-5h5v-5h5v-5', 'none', 1.6) + P('M14 -22l3.5-4 3.5 4M17.5 -26v7', 'none', 1.5);
  } else if (id === 're') { /* biển chỉ đường hai nhánh, hai mái nhà khác nhau */
    h += P('M0 -1V-27', 'none', 1.7) + P('M-1 -26h-12l-3.5 3 3.5 3h12z', '#fff', 1.4) + P('M1 -19h12l3.5 3-3.5 3H1z', '#F6E6DD', 1.4) +
      P('M0 0q-7 2-15 2M0 0q7 2 15 2', 'none', 1.1) + P('M-22 -2v-5l3-3 3 3v5z', '#fff', 1.2) + P('M17 -2v-5h6v5z', '#fff', 1.2) + P('M16 -7l4-3 4 3', 'none', 1.2);
  } else if (id === 'hoc') { /* trường có tháp chuông, chồng sách */
    h += R(-14, -13, 26, 11) + P('M-16 -13L-1 -21 14 -13', '#fff', 1.5) + R(-4, -29, 6, 7) + P('M-5 -29l4-4 4 4', '#fff', 1.3) + '<circle cx="-1" cy="-25.5" r="1.3" fill="#141413"/>' +
      R(-3, -8, 4, 6, '#F6E6DD', 1.1) + R(-11, -10, 4, 3.5, '#fff', 1) + R(5, -10, 4, 3.5, '#fff', 1) + R(15, -4, 9, 2.6, '#F6E6DD', 1.1) + R(16, -6.6, 8, 2.6, '#fff', 1.1) + R(15.5, -9.2, 8, 2.6, '#F6E6DD', 1.1);
  } else if (id === 'gio') { /* bến nhỏ + mũi tên đi rồi về */
    h += P('M-22 -3h18M-19 -3v4M-11 -3v4M-5 -3v4', 'none', 1.5) + P('M-20 -6h12l-2 3h-8z', '#fff', 1.2) + P('M-14 -6v-10', 'none', 1.2) + P('M-13 -15l5 3.5-5 1.5z', '#F6E6DD', 1) +
      P('M2.5 -25A8.5 8.5 0 0 1 18.5 -25', 'none', 1.7) + P('M15.2 -26.6L18.5 -25 19.6 -28.6', 'none', 1.6) + P('M18.5 -18A8.5 8.5 0 0 1 2.5 -18', 'none', 1.7) + P('M5.8 -16.4L2.5 -18 1.4 -14.4', 'none', 1.6);
  } else if (id === 'chu') { /* bảng chữ あ + bong bóng lời Ă */
    h += R(-19, -24, 19, 14) + P('M-17 -10l-2 8M-2 -10l2 8', 'none', 1.3) + T(-9.5, -14, 'あ') +
      P('M4 -27h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-4 4v-4h-2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', '#F6E6DD', 1.4) + T(11, -18, 'Ă');
  } else if (id === 'cau') { /* văn phòng nhiều tầng nối cầu */
    h += R(-12, -29, 14, 27) + P('M-9 -25h3M-3 -25h3M-9 -20h3M-3 -20h3M-9 -15h3M-3 -15h3M-9 -10h3M-3 -10h3', 'none', 1.5) + R(-7, -6, 4, 4, '#F6E6DD', 1) +
      P('M2 -8q9-9 19 0', 'none', 1.5) + P('M2 -6h20', 'none', 1.6) + P('M8 -6v4M15 -6v4', 'none', 1.3);
  } else if (id === 'lap') { /* cửa hàng mái hiên sọc, biển hiệu */
    h += R(-15, -12, 26, 10) + P('M-17 -12l2.4-6h26l2.4 6z', '#F6E6DD', 1.4) + P('M-10 -18l-1 6M-3.5 -18v6M3 -18v6M9 -18l1 6', 'none', 1.2) +
      R(-9, -27, 14, 6) + P('M-7 -21v3M3 -21v3', 'none', 1.1) + R(-4, -9, 5, 7, '#fff', 1.2) + R(4, -9, 5, 4, '#fff', 1);
  } else if (id === 'que') { /* nhà có khói bếp, ruộng lúa, hàng rào */
    h += R(-12, -12, 17, 10) + P('M-14.5 -12L-3.5 -21 7.5 -12', '#fff', 1.5) + P('M2 -17.5v-6h3v3.5', '#fff', 1.2) + P('M3.5 -26q-2-2 0-4t0-4', 'none', 1) + R(-6, -8, 4, 6, '#F6E6DD', 1.1) +
      P('M10 -3l1.5-5M14 -3l1.5-5M18 -3l1.5-5', 'none', 1.2) + P('M11.5 -8l-1.6-2M11.5 -8l1.6-2M15.5 -8l-1.6-2M15.5 -8l1.6-2M19.5 -8l-1.6-2M19.5 -8l1.6-2', 'none', .9) +
      P('M-21 -2v-6M-18 -2v-6M-22 -6h7', 'none', 1.1);
  }
  return '<g transform="scale(' + k + ')">' + h + '</g>';
}
function isleShape(side, k) { return isleDraw({ side: side }, k); }
function isleArt(is) { return '<g transform="translate(' + is.x + ' ' + is.y + ')">' + isleDraw(is) + '</g>'; }
/* mây sương tô chấm che đảo chưa mở */
function fogArt(x, y) {
  var d = 'M-34 10c-8-10 4-20 14-14 2-12 20-16 26-4 10-8 26-2 22 10 10 0 12 12 0 14h-56c-10 0-12-4-6-6z';
  return '<g transform="translate(' + x + ' ' + y + ')"><g class="fog"><g transform="scale(1.18 1.45)"><path d="' + d + '" fill="#F3F0E7" stroke="#8C8577" stroke-width="1.2" stroke-dasharray="3 3" stroke-linejoin="round"/><path d="' + d + '" fill="url(#cd2dotsL)"/></g></g></g>';
}
/* hoa gió */
function roseArt(x, y, k) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + (k || .8) + ')">' + aC(0, 0, 13, '#fff', 1.4) + aP('M0-20L4 0 0 20-4 0z', '#fff', 1.3) +
    '<path d="M0-20L4 0H-4z" fill="#D97757" stroke="#141413" stroke-width="1.3" stroke-linejoin="round"/>' + aP('M-20 0L0 3 20 0 0-3z', '#fff', 1.1) +
    '<text y="-25" text-anchor="middle" font-family="Lora,Georgia,serif" font-size="10" font-weight="700" fill="#141413">B</text></g>';
}
/* cá voi hiền */
function seaFun(x, y) {
  return '<g transform="translate(' + (x || 94) + ' ' + (y || 444) + ') scale(.6)">' + aP('M0 0q6-14 26-12 18 2 20 14-14 8-34 6-10-2-12-8zM46 2q6-8 12-6-2 6-6 8 4 2 6 8-6 0-12-6', '#fff', 1.8) +
    aC(10, -4, 1, '#141413', 1) + aP('M18-14q-2-6 2-10M22-14q2-6 6-8', 'none', 1.4) + '</g>';
}

/* ---------- thuyền buồm nhỏ dùng trong cảnh ---------- */
function aBoat(x, y, k, fc) {
  k = k || 1; fc = fc || '#fff';
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')">' + aP('M-26 0h52l-8 12h-36z', '#fff', 2) + '<path d="M-24 4h48l-6 8h-36z" fill="url(#cd2dots)" opacity=".45"/>' +
    aP('M0 0V-46') + aP('M2-44c10 8 16 22 18 40H2z', '#fff', 2) + aP('M-2-38c-8 8-14 20-14 34h14z', '#fff', 2) + aP('M0-46l12 4-12 4', fc, 1.8) + '</g>';
}

/* ---------- biểu tượng nơi chốn nhỏ (60×56) cho hải đồ, thẻ bến ---------- */
var CD2_MINI = {
  port: function () { return aP('M8 40h44v5H8z', '#fff', 1.8) + aP('M14 45v8M30 45v8M46 45v8', 'none', 1.8) + aP('M36 40V10h16M36 18l8-8M48 10v10', 'none', 1.8) + aR(44, 20, 8, 6, '#fff', 1.4) + aR(14, 30, 12, 10, '#fff', 1.6) + aP('M12 30l2-6h10l2 6', 'none', 1.4); },
  scope: function () { return aP('M18 52l6-34M42 52l-6-34M20 42h20M22 30h16', 'none', 1.8) + aR(20, 15, 20, 4, '#fff', 1.6) + aP('M18 15l12-11 12 11z', '#fff', 1.8) + '<g transform="rotate(-16 40 12)">' + aR(38, 9, 14, 4, '#D97757', 1.4, 1) + '</g>'; },
  people: function () { return aP('M4 36h40v5H4z', '#fff', 1.8) + aP('M10 41v10M26 41v10M40 41v10', 'none', 1.8) + aP('M12 36V18', 'none', 1.8) + aR(8, 10, 8, 8, '#F6E6DD', 1.5, 1) + '<g transform="translate(46 44) scale(.42)">' + aP('M-26 0h52l-8 12h-36z', '#fff', 3) + aP('M0 0V-46', 'none', 3) + aP('M2-44c10 8 16 22 18 40H2z', '#fff', 3) + aP('M0-46l12 4-12 4', '#D97757', 3) + '</g>'; },
  compass: function () { return aP('M8 26L30 10l22 16', '#fff', 1.8) + aR(12, 25, 36, 24, '#fff', 1.8) + aC(30, 35, 7, '#fff', 1.6) + aP('M30 35l2-5-2 1-2-1z', '#D97757', 1.2) + aR(16, 37, 7, 12, '#fff', 1.4); },
  map: function () { return aR(10, 16, 40, 30, '#fff', 1.8, 3) + aP('M10 16l20-10 20 10', '#fff', 1.8) + aP('M16 40q8-14 16-6t14-10', 'none', 1.6) + '<path d="M16 40q10-2 22 2" fill="none" stroke="#D97757" stroke-width="1.8" stroke-dasharray="3 3"/>'; },
  wave: function () { return aP('M30 52V20', 'none', 1.8) + aP('M18 20h16l4 4-4 4H18z', '#fff', 1.5) + aP('M42 32H26l-4 4 4 4h16z', '#fff', 1.5) + aP('M32 12h12l3 3-3 3H32z', '#D97757', 1.4) + aP('M6 50q4-4 8 0t8 0M38 50q4-4 8 0t8 0', 'none', 1.5) + aP('M22 52q8-8 16 0', '#fff', 1.6); },
  light: function () { return '<path d="M34 14L58 6v16z" fill="#FFF3D9"/>' + aP('M22 52l3-34h10l3 34z', '#fff', 1.8) + '<path d="M23.6 40h12.8l.8 6H22.8z" fill="#D97757"/>' + aP('M23 40h14M22.6 46h14.8', 'none', 1.3) + aR(23, 10, 14, 8, '#FDEFE7', 1.6) + aP('M22 10q8-9 16 0z', '#fff', 1.6) + aC(30, 14, 1.8, '#D97757', 1); },
  office: function () { /* PS1.3.42: Phòng Tuyển Dụng · nhà cảng 2 tầng, bảng tin dán giấy (hình nhỏ ở hải đồ, thẻ bến; banner vẽ lại ở PS1.3.43) */ return aP('M8 24L28 10l20 14', '#fff', 1.8) + aR(12, 23, 32, 28, '#fff', 1.8) + aR(17, 28, 8, 7, '#FDEFE7', 1.3) + aR(31, 28, 8, 7, '#FDEFE7', 1.3) + aR(24, 39, 8, 12, '#fff', 1.4) +
    aP('M48 51V34M58 51V34', 'none', 1.6) + aR(45, 26, 16, 12, '#fff', 1.6, 1) + aR(47.5, 28.5, 5, 4, '#D97757', 1) + aP('M54 29h5M54 32h4M48 35h10', 'none', 1); },
  flag: function () { return aP('M8 44h40l-6 7H14z', '#fff', 1.8) + aP('M22 44V8M36 44V12', 'none', 1.6) + aP('M14 38q8 2 16 0l-1-12q-7 2-14 0z', '#fff', 1.5) + aP('M28 40q8 2 16 0l-1-14q-7 2-14 0z', '#fff', 1.5) + aP('M36 12l9 3-9 3', '#D97757', 1.3); }
};
/* mã nơi chốn theo bến */
var CD2_PLACE = { p0: 'port', b1: 'scope', b2: 'people', b3: 'compass', b4: 'map', b5: 'wave', b6: 'office', b7: 'light', fin: 'flag' }; /* PS1.3.42: b6 Phòng Tuyển Dụng, b7 Ngọn Hải Đăng */
function miniArt(k, w) { return '<svg class="mini" viewBox="0 0 60 56" width="' + (w || 60) + '" aria-hidden="true"><g>' + hand(CD2_MINI[k] ? CD2_MINI[k]() : '') + '</g></svg>'; }

/* ---------- người phỏng vấn (PS1.3.43): tượng bán thân nét mực, khung 80×80, vai chạm đáy khung ----------
   ivPerson(mã) với mã trong IV_WHO (xuong, hr, vn, gv, kh) · ivAv(mã, w) ảnh tròn · ivRoom(mã) phòng phỏng vấn (360×132).
   Nhân vật vẽ chung, không phải người thật. Nét thẳng nhỏ nên không qua hand() (trừ khi nằm trong banner). */
var IV_SKIN = '#FCE6D8', IV_BG = { xuong: '#DCE6EC', hr: '#EBCBB9', vn: '#BCD3CB', gv: '#CBCAD9', kh: '#DDDAD0' };
function ivFace(cx, cy, gl) {
  var s = '<circle cx="' + (cx - 5) + '" cy="' + cy + '" r="1.5" fill="#141413"/><circle cx="' + (cx + 5) + '" cy="' + cy + '" r="1.5" fill="#141413"/>' +
    '<circle cx="' + (cx - 8.5) + '" cy="' + (cy + 4.5) + '" r="2.2" fill="#F2B9A0" opacity=".75"/><circle cx="' + (cx + 8.5) + '" cy="' + (cy + 4.5) + '" r="2.2" fill="#F2B9A0" opacity=".75"/>' +
    aP('M' + (cx - 3.5) + ' ' + (cy + 6) + 'q3.5 2.8 7 0', 'none', 1.5);
  if (gl === 'r') s += aC(cx - 5, cy, 3.8, 'none', 1.3) + aC(cx + 5, cy, 3.8, 'none', 1.3) + aP('M' + (cx - 1.2) + ' ' + cy + 'h2.4', 'none', 1.3);
  if (gl === 's') s += aR(cx - 9, cy - 3, 7.6, 6, 'none', 1.3, 1.5) + aR(cx + 1.4, cy - 3, 7.6, 6, 'none', 1.3, 1.5) + aP('M' + (cx - 1.4) + ' ' + cy + 'h2.8', 'none', 1.3);
  return s;
}
function ivHead(hairBack, hairFront, gl, extra) { /* tai, cổ, mặt, tóc */
  return (hairBack || '') + aC(27, 39, 2.8, IV_SKIN, 1.6) + aC(53, 39, 2.8, IV_SKIN, 1.6) + aR(35, 48, 10, 11, IV_SKIN, 1.8, 2) +
    aC(40, 37, 13, IV_SKIN, 2) + ivFace(40, 38, gl) + (hairFront || '') + (extra || '');
}
function ivBody(fill, inner) { return aP('M6 82q2-22 34-24q32 2 34 24z', fill, 2) + (inner || ''); }
var IV_ART = {
  xuong: function () { /* trưởng xưởng: áo đồng phục xanh xám, mũ công nhân */
    return ivBody('#DCE6EC', aP('M31 59l9 9 9-9', '#fff', 1.6) + aP('M40 68v14', 'none', 1.4) + aR(48, 66, 10, 6, '#D97757', 1.2, 1) + aP('M22 70v12M58 70v12', 'none', 1.2, ' opacity=".5"')) +
      ivHead('', aP('M26.5 33q1-15 13.5-15t13.5 15z', '#2B3A55', 2) + aP('M25 33h30q-2 3.5-6 3.5H31q-4 0-6-3.5z', '#2B3A55', 1.8) + aC(40, 25.5, 2.2, '#D97757', 1.1), '');
  },
  hr: function () { /* nhân sự công ty ở Nhật: tóc ngắn ngang vai, vest xanh than, thẻ tên */
    return aP('M24 44q-3-23 16-24q19 1 16 24q0 7-4 9H28q-4-2-4-9z', '#141413', 2) +
      ivBody('#2B3A55', aP('M33 59l7 12 7-12z', '#fff', 1.6) + aP('M33 59l-4 11 6 5M47 59l4 11-6 5', 'none', 1.4, ' stroke="#fff" opacity=".7"') +
        '<path d="M33.5 60q6.5 16 13 0" fill="none" stroke="#D97757" stroke-width="1.4"/>' + aR(36.5, 71, 7, 9, '#fff', 1.3, 1)) +
      ivHead('', aP('M27 37q2-13 13-13t13 13q-6-6-13-6.5Q33 31 27 37z', '#141413', 1.6), '');
  },
  vn: function () { /* giám đốc người Nhật (trước) và chị nhân sự (sau) */
    var hrw = aP('M25 47q-3-25 15-26q18 1 15 26l1 12H24z', '#141413', 2) +
      ivBody('#EBCBB9', aP('M33 59l7 11 7-11z', '#fff', 1.6)) + ivHead('', aP('M27 37q1-13 13-13t13 13q-9-8-20-3z', '#141413', 1.6), '');
    var dir = ivBody('#2B3A55', aP('M33 59l7 12 7-12z', '#fff', 1.6) + aP('M38.5 61h3l1 3-2.5 11-2.5-11z', '#D97757', 1.2)) +
      ivHead('', aP('M27 36q-1-13 13-13q14 0 13 13q-3-7-9-8q-7 5-17 8z', '#BDBAB0', 1.8), 's');
    return '<g transform="translate(24 6) scale(.78)">' + hrw + '</g><g transform="translate(-10 8) scale(.92)">' + dir + '</g>';
  },
  gv: function () { /* thầy cô tuyển sinh: tóc búi, kính tròn, áo len */
    return ivBody('#CBCAD9', aP('M33 59l7 9 7-9', '#fff', 1.6) + aP('M40 68v14', 'none', 1.3) + aC(37, 73, 1.2, '#141413', 1) + aC(43, 73, 1.2, '#141413', 1) + aC(52, 66, 2.2, '#D97757', 1.1)) +
      aC(40, 21, 6.5, '#6B564B', 1.8) + ivHead('', aP('M27 38q-1-14 13-14t13 14q-4-8-13-8t-13 8z', '#6B564B', 1.6), 'r');
  },
  kh: function () { /* giám đốc xưởng Nhật (khách): áo khoác xanh rêu, tóc ngắn, ria */
    return ivBody('#BCD3CB', aP('M31 59l9 8 9-8', '#fff', 1.6) + aP('M40 67v15', 'none', 1.6) + aR(23, 66, 10, 7, '#fff', 1.2, 1) + aP('M25 69.5h6', 'none', 1)) +
      ivHead('', aP('M27 35q0-14 13-14t13 14q-2-4-5-5l-2 3-3-3.5-3 3.5-3-3.5-2 3q-5 1-8 5.5z', '#141413', 1.8) + aP('M33 33.5l4-1M43 32.5l4 1', 'none', 1.8) + aP('M36 42.4q4-2.2 8 0', 'none', 2), '');
  }
};
function ivPerson(id) { return (IV_ART[id] || IV_ART.hr)(); }
var IV_N = 0;
function ivAv(id, w) {
  var k = 'cd2iv' + (++IV_N);
  return '<svg class="ivav" viewBox="0 0 80 80" width="' + (w || 40) + '" height="' + (w || 40) + '" aria-hidden="true"><defs><clipPath id="' + k + '"><circle cx="40" cy="40" r="38.5"/></clipPath></defs>' +
    '<circle cx="40" cy="40" r="38.5" fill="' + (IV_BG[id] || '#EBCBB9') + '"/><g clip-path="url(#' + k + ')">' + ivPerson(id) + '</g><circle cx="40" cy="40" r="38.5" fill="none" stroke="#141413" stroke-width="2"/></svg>';
}
function ivRoom(id) { /* phòng phỏng vấn nhỏ ở đầu mỗi câu hỏi: cửa sổ nhìn biển, lịch +3 năm, người phỏng vấn sau bàn */
  var env = aR(16, 14, 92, 64, '#DCE6EC', 2, 3) + aP('M62 14v64M16 50h92', 'none', 1.6) + aC(36, 30, 6, '#D97757', 1.4) + aWave(20, 62, 3, 12, .8) + aWave(66, 66, 3, 12, .8) +
    aR(124, 18, 30, 34, '#fff', 1.8, 2) + aR(124, 18, 30, 9, '#D97757', 1.8, 2) + '<text x="139" y="44" text-anchor="middle" font-family="Lora,Georgia,serif" font-size="12" font-weight="700" fill="#141413">+3</text>' +
    aR(196, 22, 68, 80, '#D4A27F', 2, 8);
  var desk = aP('M150 98h200v7H150z', '#fff', 2) + aR(158, 105, 184, 27, '#FFFDF8', 2) + aDots('M160 107h180v6H160z', .35, 1) +
    aP('M268 98l3-9h30l3 9z', '#fff', 1.6) + '<text x="286" y="96" text-anchor="middle" font-family="Be Vietnam Pro,system-ui,sans-serif" font-size="7" font-weight="700" fill="#141413">面接</text>' +
    aR(170, 92, 26, 6, '#fff', 1.4, 1) + aR(174, 88, 22, 4, '#fff', 1.2, 1) + aP('M322 98v-10h10v10M332 90q5 0 5 4t-5 4', '#fff', 1.6);
  return '<svg class="ivroom" viewBox="0 0 360 132" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="360" height="132" fill="#F3EFE6"/>' +
    hand(env) + '<g transform="translate(180 4) scale(1.25)">' + ivPerson(id) + '</g>' + hand(desk) + '</svg>';
}

/* ---------- 8 cảnh banner (360×150, nền tông vòng) ---------- */
function aSea(y0, o) { return aWave(14, y0, 6, 16, o) + aWave(150, y0 + 10, 7, 16, o) + aWave(40, y0 + 20, 8, 14, o) + aWave(230, y0 + 24, 6, 14, o); }
var CD2_SCN = {
  port: function () { /* Cảng 3 Năm: cầu tàu, cần cẩu, thùng hàng, thuyền neo */
    return aC(306, 40, 17, '#D97757', 1.8) + aP('M0 112H360', 'none', 1.4, ' opacity=".5"') +
      aP('M8 98h196v8H8z', '#fff') + aP('M20 106v24M60 106v26M100 106v24M140 106v26M180 106v24', 'none', 2.2) + aDots('M10 100h192v5H10z', 1, 1) +
      aP('M42 98v-6h10v6M40 92h14', '#fff', 1.8) +
      aR(76, 72, 26, 26, '#fff') + aR(102, 80, 22, 18, '#fff') + aR(84, 52, 22, 20, '#fff') + aDots('M78 74h22v22H78z', .7, 1) + aP('M76 85h26M102 89h22M84 62h22', 'none', 1.4) +
      aP('M150 98V28M150 28h64M150 40l18-12M162 98l-12-30M138 98l12-30') + aP('M206 28v30', 'none', 1.4) + aR(196, 58, 20, 16, '#fff', 1.8) + aDots('M198 66h16v6h-16z', .5) +
      aP('M170 84h26v14', 'none', 1.8) + aR(166, 76, 34, 12, '#fff', 1.8, 2) + '<text x="183" y="85.5" text-anchor="middle" font-family="Lora,Georgia,serif" font-size="8" font-weight="700" fill="#141413">3 NĂM</text>' +
      aBoat(270, 108, .95, '#D97757') + aSea(124, .9) + aGull(250, 30) + aGull(232, 44, .8);
  },
  scope: function () { /* Đài Vọng Biển: tháp gỗ trên vách đá, ống nhòm, sương ngoài khơi */
    var fog = function (x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-40 10c-6-12 8-20 18-14 4-12 22-14 28-2 10-6 24 0 22 12 8 2 8 12-2 14h-62c-10 0-12-8-4-10z" fill="#fff" stroke="#141413" stroke-width="1.6" stroke-linejoin="round"/><path d="M-30 12c4 3 50 3 58 0v8h-58z" fill="url(#cd2dotsL)"/></g>'; };
    return '<g transform="translate(0 12) scale(1 .93)">' + aP('M190 68q20-10 40 0M250 62q14-8 26 0M296 70q16-10 30 0', 'none', 1.6, ' opacity=".45"') + fog(232, 58, .9) + fog(310, 40, .75) + fog(206, 30, .6) +
      aWave(160, 126, 5, 16, .9) + aWave(190, 140, 7, 14, .9) + aWave(250, 116, 5, 14, .8) +
      aP('M0 150V102q24-14 48-12q30-6 54 2q22 2 36 14l12 44z', '#fff') + aDots('M60 110q30-4 66 8l10 32H70z', .5) +
      aP('M46 96L58 34M108 98L94 34M51 74h52M54 56h44M52 74l46-18M100 74L54 56', 'none', 2) + aR(50, 28, 52, 7, '#fff', 2) +
      aP('M46 28L76 8l30 20z', '#fff') + aDots('M58 26l18-12 18 12z', 1, 1) + aP('M76 8V0', 'none', 1.8) + aP('M76 0l12 3-12 4', '#D97757', 1.6) +
      '<g transform="rotate(-14 98 22)">' + aR(92, 16, 34, 7, '#fff', 1.8, 2) + aR(124, 14, 6, 11, '#D97757', 1.8, 1) + '</g>' + aP('M96 23l-4 5M100 23l4 5', 'none', 1.6) +
      aGull(170, 24) + aGull(150, 36, .8) + '</g>';
  },
  people: function () { /* Bến Senpai: cầu gỗ, đèn lồng, ghế, bảng chuyện, thuyền neo */
    var lamp = function (x) { return aP('M' + x + ' 98V58', 'none', 2.2) + aP('M' + (x - 6) + ' 58h12', 'none', 2) + aR(x - 6, 44, 12, 14, '#FBE3D6', 1.8, 2) + aC(x, 51, 2.6, '#D97757', 1.2) + aP('M' + (x - 4) + ' 44l4-5 4 5', '#fff', 1.6); };
    return aP('M0 98h236v8H0z', '#fff') + aP('M16 106v26M56 106v26M96 106v26M136 106v26M176 106v26M216 106v26', 'none', 2.2) + aDots('M2 100h232v5H2z', 1, 1) +
      lamp(26) + lamp(150) + aP('M60 98v-12M92 98v-12M56 86h40M58 80h36', '#fff', 2) +
      aP('M176 98V62M214 98V62', 'none', 2) + aR(170, 50, 50, 30, '#fff', 2, 3) + aR(176, 55, 16, 11, '#EBCBB9', 1.4) + aR(196, 56, 18, 9, '#fff', 1.4) + aR(184, 68, 22, 8, '#fff', 1.4) + aC(184, 55, 1.6, '#D97757', 1) + aC(205, 56, 1.6, '#141413', 1) +
      aBoat(276, 116, .8, '#D97757') + aBoat(330, 110, .62) + aBoat(250, 140, .5) + aP('M236 104q14 6 20 12', 'none', 1.2, ' opacity=".7"') +
      aSea(132, .8) + aGull(110, 30) + aGull(300, 26, .9) + aGull(320, 40, .7);
  },
  compass: function () { /* Xưởng La Bàn: xưởng mái nhọn, la bàn lớn, bàn đồ nghề */
    return aP('M0 122h292q10 0 16 8', 'none', 1.8) + aWave(300, 128, 3, 16, .9) + aWave(316, 140, 2, 16, .9) + aDots('M0 124h290l8 26H0z', .25, 1) +
      aP('M114 62L186 20l72 42', '#fff', 2.2) + aDots('M140 50l46-26 46 26z', .6, 1) + aR(124, 60, 124, 62, '#fff', 2.2) +
      aR(222, 20, 12, 22, '#fff', 2) + aP('M228 16q-6-6 0-10t0-10M236 14q6-6 0-10', 'none', 1.5, ' opacity=".7"') +
      aC(186, 82, 21, '#fff', 2.2) + aC(186, 82, 15, 'none', 1.2) + aP('M186 64v4M186 96v4M168 82h4M200 82h4', 'none', 1.6) + aP('M186 82l5-12-5 2-5-2z', '#D97757', 1.6) + aP('M186 82l5 12-5-2-5 2z', '#fff', 1.6) +
      aR(134, 86, 22, 36, '#fff', 2) + aC(151, 105, 1.4, '#141413', 1) + aR(212, 92, 26, 18, '#fff', 2) + aP('M225 92v18M212 101h26', 'none', 1.4) +
      aP('M30 122V96M96 122V96', 'none', 2.2) + aP('M22 96h82', 'none', 2.6) + aDots('M24 98h78v4H24z', 1, 1) +
      aP('M38 96l6-14 6 2-4 12M44 82l10-2', '#fff', 1.8) + aR(62, 88, 30, 8, '#fff', 1.6, 1) + aP('M66 88v3M70 88v4M74 88v3M78 88v4M82 88v3M86 88v4', 'none', 1.1) +
      aP('M8 122l4-6 4 6M262 122l3-5 3 5M282 122l4-6 4 6', 'none', 1.4) + aGull(290, 30) + aGull(60, 38, .8);
  },
  map: function () { /* Phòng Hải Đồ: bàn trải hải đồ 3 tuyến, cửa sổ nhìn biển, đèn treo */
    return aR(214, 14, 112, 66, '#fff', 2.2, 4) + aP('M270 14v66M214 46h112', 'none', 1.6) + aC(298, 34, 7, '#D97757', 1.4) + aWave(220, 68, 3, 14, .8) + aWave(276, 66, 3, 14, .8) +
      aP('M14 54h110M14 54v-26M124 54v-26M14 28h110', 'none', 1.8) + aC(30, 40, 9, '#fff', 1.8) + aC(50, 42, 8, '#fff', 1.8) + aC(68, 40, 9, '#fff', 1.8) + aC(88, 42, 7, '#fff', 1.8) + aC(106, 41, 8, '#fff', 1.8) +
      aP('M170 0v18', 'none', 1.6) + aP('M156 30l14-12 14 12z', '#fff', 2) + '<path d="M160 30h20l12 30h-44z" fill="#FFF3D9" opacity=".8"/>' +
      aP('M18 104h324l-16 16H34z', '#fff', 2.2) + aP('M40 120v28M320 120v28', 'none', 2.4) +
      aP('M70 102l10-26h196l-8 26z', '#FFFDF6', 2) + aDots('M84 80h186l-4 8H82z', .35, 1) +
      '<path d="M100 96q30-26 64-16t70-6" fill="none" stroke="#D97757" stroke-width="2.2" stroke-dasharray="5 4" stroke-linecap="round"/>' +
      '<path d="M100 96q50-4 90-2t60 0" fill="none" stroke="#141413" stroke-width="1.6" stroke-dasharray="4 4" stroke-linecap="round"/>' +
      '<path d="M100 96q40 6 70 4" fill="none" stroke="#141413" stroke-width="1.6" stroke-dasharray="4 4" stroke-linecap="round" opacity=".6"/>' + aC(100, 96, 3, '#141413', 1) +
      '<text x="238" y="76" font-family="Lora,Georgia,serif" font-size="10" font-weight="700" fill="#141413">A</text><text x="254" y="98" font-family="Lora,Georgia,serif" font-size="10" font-weight="700" fill="#141413">B</text><text x="174" y="104" font-family="Lora,Georgia,serif" font-size="10" font-weight="700" fill="#141413">C</text>' +
      aP('M206 86l14 16M206 86l-6 18', 'none', 1.6) + aC(206, 86, 2, '#fff', 1.4) +
      aR(292, 82, 20, 22, '#fff', 1.8, 3) + aP('M296 82v-14M302 82v-18M308 82v-12', 'none', 2) + aC(296, 67, 2, '#fff', 1.4) + aC(302, 63, 2, '#fff', 1.4) + aC(308, 69, 2, '#fff', 1.4);
  },
  wave: function () { /* Vịnh Ngã Rẽ: vịnh chia 3 luồng, cột biển chỉ đường */
    return aP('M0 18q20 10 22 40t-6 60q-4 18 8 32H0z', '#fff') + aDots('M2 40q14 10 12 40t0 50H2z', .4) +
      aP('M360 12q-28 14-26 46t8 56q4 22-6 36h24z', '#fff') + aDots('M358 34q-14 14-12 40t4 50h8z', .4) +
      aP('M122 78q8-14 22-10 10-8 18 2 8 4 4 12-22 8-44-4z', '#fff', 2) + aDots('M126 80q20 8 40 0v4q-20 6-40-2z', 1, 1) +
      aP('M206 66q10-12 22-6 12-2 14 10-20 8-36-4z', '#fff', 2) +
      '<path d="M180 146q-2-40-50-70T64 22" fill="none" stroke="#141413" stroke-width="1.6" stroke-dasharray="4 5" stroke-linecap="round"/>' +
      '<path d="M180 146q4-50 0-78t4-56" fill="none" stroke="#D97757" stroke-width="2.2" stroke-dasharray="5 5" stroke-linecap="round"/>' +
      '<path d="M180 146q10-40 60-62t60-60" fill="none" stroke="#141413" stroke-width="1.6" stroke-dasharray="4 5" stroke-linecap="round"/>' +
      aP('M144 74V40', 'none', 2.2) + aP('M128 40h26l6 5-6 5h-26z', '#fff', 1.8) + aP('M160 52h-26l-6 5 6 5h26z', '#fff', 1.8) + aP('M146 30h20l5 4-5 4h-20z', '#D97757', 1.6) +
      aWave(40, 120, 3, 14) + aWave(240, 128, 4, 14) + aWave(70, 96, 2, 12, .7) + aWave(268, 100, 3, 12, .7) + aWave(196, 30, 3, 12, .6) +
      '<g transform="translate(250 50)">' + aP('M-6 6h12l-2 6h-8z', '#fff', 1.6) + aP('M0 6V-6', 'none', 1.6) + aC(0, -8, 3, '#D97757', 1.4) + '</g>' +
      '<g transform="translate(180 140) scale(.42)">' + aBoat(0, 0, 1, '#D97757') + '</g>';
  },
  light: function () { /* Ngọn Hải Đăng: tháp sọc cam đất trên đảo đá, chùm sáng */
    return '<path d="M226 30L360 0v56z" fill="#FFF3D9" opacity=".95"/><path d="M214 30L60 6v46z" fill="#FFF3D9" opacity=".8"/>' +
      aP('M150 150q10-30 40-36 30-12 62-2 30 6 40 38z', '#fff', 2.2) + aDots('M214 118q30-4 54 4l18 28h-60z', .45) +
      aP('M204 116l8-80h20l8 80z', '#fff', 2.2) + '<path d="M210 96h24l1.6 12h-27.2z" fill="#D97757"/><path d="M212.6 66h18.8l1.4 12h-21.6z" fill="#D97757"/>' + aP('M209 96h26M210.4 108h23.4M212 66h20M211 78h22', 'none', 1.6) +
      aR(208, 30, 28, 6, '#fff', 2) + aR(212, 16, 20, 14, '#FDEFE7', 2) + aP('M222 16v14', 'none', 1.4) + aC(222, 23, 3.4, '#D97757', 1.4) + aP('M210 16q12-14 24 0z', '#fff', 2) + aP('M222 4v-4', 'none', 1.6) +
      aR(218, 96, 8, 12, '#fff', 1.6, 3) + aBoat(70, 116, .7) + aSea(122, .9) + aGull(120, 60) + aGull(300, 80, .8);
  },
  office: function (who) { /* PS1.3.43 · Phòng Tuyển Dụng vẽ lại: bên trong phòng, cửa sổ nhìn biển, bảng tin tuyển dụng tô 3 màu, lịch +3 năm, người phỏng vấn sau bàn, ghế ứng viên */
    var note = function (x, y, w, h, hl, f) { return aR(x, y, w, h, f || '#fff', 1.5, 1) + '<path d="M' + (x + 4) + ' ' + (y + 7) + 'h' + (w - 10) + '" stroke="' + hl + '" stroke-width="4" stroke-linecap="round" opacity=".9"/>' + aP('M' + (x + 4) + ' ' + (y + 7) + 'h' + (w - 10) + 'M' + (x + 4) + ' ' + (y + 12) + 'h' + (w - 8) + 'M' + (x + 4) + ' ' + (y + 17) + 'h' + (w - 12), 'none', 1) + aC(x + w / 2, y + 1, 1.8, '#D97757', 1); };
    return aP('M0 128h360', 'none', 1.6) + aDots('M0 130h360v20H0z', .3, 1) +
      aR(14, 16, 90, 68, '#DCE6EC', 2.2, 3) + aP('M59 16v68M14 52h90', 'none', 1.8) + aC(32, 32, 7, '#D97757', 1.5) + aWave(18, 70, 3, 12, .85) + aWave(64, 74, 3, 12, .85) +
      '<g transform="translate(84 66) scale(.32)">' + aBoat(0, 0, 1) + '</g>' + aGull(70, 28, .7) +
      aR(116, 12, 92, 70, '#fff', 2.2, 3) + aR(140, 6, 44, 11, '#D97757', 1.6, 2) + '<text x="162" y="14.6" text-anchor="middle" font-family="Be Vietnam Pro,system-ui,sans-serif" font-size="7.5" font-weight="700" fill="#fff">求人</text>' +
      note(122, 24, 26, 22, '#BCD8CF') + note(152, 22, 26, 24, '#F3DFAE', '#FFFDF8') + note(182, 26, 22, 20, '#DEDBD3') + note(130, 52, 30, 22, '#F3DFAE') + note(166, 52, 32, 22, '#BCD8CF', '#FFFDF8') +
      aR(220, 16, 30, 34, '#fff', 1.8, 2) + aR(220, 16, 30, 9, '#D97757', 1.8, 2) + aP('M227 13v6M243 13v6', 'none', 1.6) + '<text x="235" y="42" text-anchor="middle" font-family="Lora,Georgia,serif" font-size="12" font-weight="700" fill="#141413">+3</text>' +
      aP('M114 128l3-17h18l3 17z', '#EBCBB9', 1.8) + aP('M126 111q-12-14-4-28M126 111q10-12 18-22M126 111q-2-16 6-30', 'none', 1.8) + aP('M122 83q-6 2-6 8 6 0 6-8zM144 89q2 6-4 9 -2-6 4-9zM132 81q6 2 4 8-5-2-4-8z', '#BCD3CB', 1.4) +
      aR(262, 34, 54, 64, '#D4A27F', 2, 8) +
      '<g transform="translate(251 19) scale(.95)">' + ivPerson(who || 'hr') + '</g>' +
      aP('M226 96h128v7H226z', '#fff', 2.2) + aR(232, 103, 116, 25, '#FFFDF8', 2) + aDots('M234 105h112v6H234z', .35, 1) +
      aP('M296 96l3-9h28l3 9z', '#fff', 1.6) + '<text x="313" y="94" text-anchor="middle" font-family="Be Vietnam Pro,system-ui,sans-serif" font-size="7" font-weight="700" fill="#141413">面接</text>' +
      aR(240, 90, 24, 6, '#fff', 1.4, 1) + aR(244, 86, 20, 4, '#fff', 1.2, 1) + aP('M336 96v-9h9v9M345 89q5 0 5 3.5t-5 3.5', '#fff', 1.6) +
      aP('M178 104h30v5h-30zM180 104V74q0-4 4-4h3q3 0 3 4v30M182 109l-2 19M204 109l2 19M190 109v19', '#fff', 2) + aDots('M182 76h6v26h-6z', .4, 1);
  },
  flag: function () { /* Cảng Khởi Hành: thuyền buồm lớn, cờ dây, mặt trời mọc */
    var bunt = '', i; for (i = 0; i < 7; i++) { var x = 8 + i * 18; bunt += aP('M' + x + ' ' + (14 + i * 2.2) + 'l9 14 9-12', i % 2 ? '#fff' : '#D97757', 1.4); }
    return '<path d="M200 112a64 64 0 0 1 128 0z" fill="#D97757" opacity=".22"/>' + aP('M200 112a64 64 0 0 1 128 0', 'none', 1.6) +
      aP('M0 12q70 16 140 14', 'none', 1.6) + bunt + aP('M0 112h360', 'none', 1.4, ' opacity=".5"') +
      aP('M0 96h46v10H0z', '#fff') + aP('M12 106v26M36 106v26', 'none', 2.2) +
      /* PS1.3.48: rương kho báu trên cầu tàu (kho báu = hướng đi bạn tự vẽ: tấm hải đồ cuộn trong rương) */
      aP('M10 96V84h28v12z', '#EED3B8', 1.8) + aP('M10 84q0-10 14-10t14 10z', '#D97757', 1.8) + aP('M10 86h28M22 84v6h4v-6', 'none', 1.4) + aP('M16 74q2-6 8-4l6-2q4 0 4 4', '#FFFDF8', 1.4) +
      '<path d="M44 72l2 4 4 1-4 1-2 4-2-4-4-1 4-1z" fill="#D9A84E"/><path d="M4 70l1.4 2.6 2.6.9-2.6.9L4 77l-1.4-2.6L0 73.5l2.6-.9z" fill="#D9A84E"/>' +
      '<g transform="translate(176 112)">' + aP('M-80 0h150l-18 22H-64z', '#fff', 2.4) + aDots('M-76 6h138l-12 14H-62z', .4) + aP('M-60 8h4M-40 8h4M-20 8h4M0 8h4M20 8h4M40 8h4', 'none', 2) +
      aP('M-30 0V-86M24 0V-96') + aP('M-54-8q24 6 48 0l-2-30q-22 6-44 0z', '#fff', 2) + aP('M-50-46q20 5 40 0l-2-26q-18 5-36 0z', '#fff', 2) +
      aP('M0-8q24 6 50 0l-2-34q-22 6-46 0z', '#fff', 2) + aP('M4-52q20 5 40 0l-2-30q-18 5-36 0z', '#fff', 2) + aDots('M2-40q22 5 44 0v30q-22 6-44 0z', .5, 1) +
      aP('M24-96l18 5-18 5', '#D97757', 1.8) + aP('M-30-86l14 4-14 4', '#fff', 1.6) + aP('M70 0l30-26', 'none', 1.8) + '</g>' +
      aSea(126, .9) + aGull(300, 22) + aGull(320, 34, .8) + aGull(150, 18, .7);
  },
  isle: function (is) { /* trang đảo: đảo lớn giữa biển, bảng tên có biểu tượng đảo */
    return aSea(120, .8) + aWave(30, 92, 3, 14, .6) + aWave(270, 88, 3, 14, .6) + aGull(80, 34) + aGull(270, 28, .8) +
      '<g transform="translate(180 104)">' + isleDraw(is, 2.6) + '</g>' +
      aBoat(300, 132, .5, '#D97757');
  }
};
function sceneSVG(k, bg, h, arg) {
  h = h || 150;
  return '<svg class="scene" viewBox="0 0 360 ' + h + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="360" height="' + h + '" fill="' + bg + '"/><g>' + hand(CD2_SCN[k] ? CD2_SCN[k](arg) : '') + '</g></svg>';
}

/* ---------- con dấu kiểu hộ chiếu: 3 hình, mực cam đất hoặc xanh than, xoay nhẹ, có ngày ---------- */
function stampArt(i, ic, lab, date, w) {
  var col = i % 3 === 1 ? '#2B3A55' : '#B5532F', sh = ['c', 'r', 'o'][i % 3], rot = [-8, 6, -4, 9, -6, 5, -10, 7][i % 8], s = '';
  if (sh === 'c') s = '<circle cx="33" cy="31" r="24" fill="none" stroke="' + col + '" stroke-width="2.4"/><circle cx="33" cy="31" r="19" fill="none" stroke="' + col + '" stroke-width="1"/>';
  else if (sh === 'r') s = '<rect x="7" y="9" width="52" height="44" rx="5" fill="none" stroke="' + col + '" stroke-width="2.4"/><rect x="11" y="13" width="44" height="36" rx="3" fill="none" stroke="' + col + '" stroke-width="1"/>';
  else s = '<path d="M22 7h22l15 15v18L44 55H22L7 40V22z" fill="none" stroke="' + col + '" stroke-width="2.4"/>';
  return '<svg class="stamp" viewBox="0 0 66 62" width="' + (w || 66) + '" aria-hidden="true"><g transform="rotate(' + rot + ' 33 31)" opacity=".88">' + s +
    '<text x="33" y="22" text-anchor="middle" font-family="Be Vietnam Pro,system-ui,sans-serif" font-size="7.5" font-weight="700" letter-spacing="1" fill="' + col + '">' + lab + '</text>' +
    '<g transform="translate(25 24) scale(.68)" color="' + col + '"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + (CD2_IC[ic] || '') + '</g></g>' +
    '<text x="33" y="49" text-anchor="middle" font-family="Lora,Georgia,serif" font-style="italic" font-size="7.5" fill="' + col + '">' + (date || '') + '</text></g></svg>';
}
function stampEmpty(n, w) {
  return '<svg class="stamp" viewBox="0 0 66 62" width="' + (w || 66) + '" aria-hidden="true"><circle cx="33" cy="31" r="23" fill="none" stroke="#C9C2AF" stroke-width="1.5" stroke-dasharray="3 4"/>' +
    '<text x="33" y="36" text-anchor="middle" font-family="Lora,Georgia,serif" font-style="italic" font-size="13" fill="#A8A08C">' + n + '</text></svg>';
}

/* ---------- PS1.3.48 (bản 3 · đợt 5) đồ vật nhỏ · cảnh nơi làm việc của 26 thẻ Senpai · sticker Bảng ước mơ ----------
   CD2_PROP[k](arg): đồ vật vẽ quanh 0,0 trong khung −16..16 (dùng cho huy hiệu thẻ Senpai, banner thẻ, sticker Bảng ước mơ).
   CD2_SPSC[k](): cảnh nơi làm việc trong khung 100×100, mặt đất y 84 (vẽ nơi làm việc, đồ vật; không vẽ mặt người thật).
   spArt(sp, 'thumb' | 'banner'): ghép cảnh + đồ vật theo SP_ART trong content.js; nền theo phía của đảo (sideBg).
   dreamSticker(k, w, arg): một sticker vuông. Tất cả qua hand() cho nét tay mượt. */
var A_CL = '#D97757', A_LT = '#FDEFE7', A_KR = '#EED3B8', A_SG = '#CFE0D3', A_SK = '#DCE6EC', A_YL = '#F6DDA4';
function aK(d, w) { return '<path d="' + d + '" fill="none" stroke="#D97757" stroke-width="' + (w || 1.6) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
function aT(x, y, t, sz, col, fam, wt) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="' + (fam || 'Lora,Georgia,serif') + '" font-size="' + sz + '" font-weight="' + (wt || 700) + '" fill="' + (col || '#141413') + '">' + t + '</text>'; }
function aDot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 1.2) + '" fill="' + (c || '#141413') + '"/>'; }
function aGear(cx, cy, r, n, f, w) {
  var d = '', i, a0, R = r, ri = r * .78, st = Math.PI * 2 / n;
  for (i = 0; i < n; i++) {
    a0 = i * st;
    var p = [[ri, a0], [R, a0 + st * .18], [R, a0 + st * .48], [ri, a0 + st * .66]];
    p.forEach(function (q, j) { d += (i === 0 && j === 0 ? 'M' : 'L') + hF(cx + q[0] * Math.cos(q[1])) + ' ' + hF(cy + q[0] * Math.sin(q[1])); });
  }
  return aP(d + 'Z', f || '#fff', w || 1.6) + aC(cx, cy, r * .3, A_CL, (w || 1.6) * .85);
}
function aPerson(x, y, k, f) { /* người dáng chung, không mặt */ k = k || 1; return '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')">' + aC(0, -12, 5, '#fff', 1.6) + aP('M-8 8q0-13 8-13t8 13z', f || '#fff', 1.6) + '</g>'; }

var CD2_PROP = {
  box: function () { return aP('M-13 -6l4-6h18l4 6z', '#F6E3CF', 1.5) + aR(-13, -6, 26, 19, A_KR, 1.6, 1) + aP('M-3 -6v7h6v-7', '#fff', 1.2) + aP('M-9 8h6', 'none', 1.2); },
  cal8: function () { return aR(-12, -10, 24, 24, '#fff', 1.6, 3) + aR(-12, -10, 24, 7, A_CL, 1.6, 2) + aP('M-6 -14v6M6 -14v6', 'none', 1.8) + aT(0, 11.5, '8', 13, '#141413') ; },
  medal: function () { return aP('M-10 -16h7l5 9-4 5zM10 -16h-7l-5 9 4 5z', A_CL, 1.3) + aC(0, 5, 9, A_YL, 1.6) + aP('M0 0l1.6 3.4 3.6.4-2.7 2.4.8 3.6L0 8l-3.3 1.8.8-3.6-2.7-2.4 3.6-.4z', '#fff', 1); },
  noodle: function () { return aP('M3 -16l9 13M7 -17l8 12', 'none', 1.6) + aP('M-14 -2h28q-1 14-14 14t-14-14z', '#fff', 1.6) + aP('M-10 -2q2.5-5 5 0t5 0t5 0t5 0', 'none', 1.2) + aK('M-9 5h18', 1.4); },
  fish: function () { return aP('M-15 0q8-11 21-4l7-6v20l-7-6q-13 7-21-4z', '#fff', 1.6) + aP('M-3 -6q3-6 7-3', A_CL, 1.3) + aP('M1 -4q2 4 0 8', 'none', 1.1) + aDot(-8, -1.5, 1.3); },
  torch: function () { return '<g transform="rotate(-38)">' + aR(-15, -3.5, 20, 7, '#fff', 1.6, 2) + aR(5, -2.5, 9, 5, A_CL, 1.3, 1) + aP('M-10 -3.5v7M-6 -3.5v7', 'none', 1) + '</g>' + aK('M13 -12l5-5M15 -8h6M10 -15v-6M17 -12.5l3 1', 1.5); },
  book: function () { return aP('M-15 -10q7.5-4 15 0q7.5-4 15 0v21q-7.5-4-15 0q-7.5-4-15 0z', '#fff', 1.6) + aP('M0 -10v21', 'none', 1.3) + aP('M-11 -4h7M-11 0h7M-11 4h5M4 -4h7M4 0h7', 'none', 1.1) + aK('M7 -11v7l2-2 2 2v-7', 1.2); },
  chip: function () { return aP('M-5 -9v-5M0 -9v-5M5 -9v-5M-5 9v5M0 9v5M5 9v5M-9 -5h-5M-9 0h-5M-9 5h-5M9 -5h5M9 0h5M9 5h5', 'none', 1.4) + aR(-9, -9, 18, 18, '#fff', 1.6, 2) + aR(-4, -4, 8, 8, A_CL, 1.2, 1); },
  brush: function () { return aR(-15, -14, 22, 9, A_CL, 1.6, 3) + aP('M7 -10h5v9H-2v5', 'none', 1.6) + aR(-4.5, 4, 5, 11, '#fff', 1.6, 1.5) + aK('M-12 -1q2 4 0 7', 1.3); },
  mold: function () { return aP('M-4 -16h8v4l3.5 4v20q0 2-2 2h-11q-2 0-2-2v-20l3.5-4z', '#fff', 1.6) + aR(-7.5, -1, 15, 8, A_CL, 1.2, 1) + aP('M-5 -12h10', 'none', 1.1); },
  print: function () { return aP('M-6 3h20l-2 12H-6z', '#fff', 1.5) + aC(-6, -4, 8, '#fff', 1.6) + aC(-6, -4, 3, A_CL, 1.2) + aK('M0 8h8M0 11h5', 1.2); },
  gear: function () { return aGear(0, 0, 14, 8); },
  gear3: function () { return aGear(-6, -5, 9.5, 7) + aGear(8, 3, 7, 6) + aGear(-3, 10, 5.5, 6); },
  helmet: function () { return aP('M-14 5q0-16 14-16t14 16z', A_YL, 1.6) + aP('M-17 5h34v5h-34z', '#fff', 1.6) + aP('M-3 -11v7h6v-7', '#fff', 1.2); },
  leaf: function () { return aP('M-12 14h24', 'none', 1.6) + aP('M0 14V-3', 'none', 1.6) + aP('M0 3q-13-1-13-14q13 0 13 14z', A_SG, 1.4) + aP('M0 -2q11-1 13-13q-13 0-13 13z', A_SG, 1.4) + aK('M-6 -5l4 4', 1.1); },
  calc: function () { return aR(-10, -15, 20, 30, '#fff', 1.6, 3) + aR(-6.5, -11, 13, 7, A_LT, 1.2, 1) + aDot(-4, 1, 1.5) + aDot(0, 1, 1.5) + aDot(4, 1, 1.5) + aDot(-4, 6, 1.5) + aDot(0, 6, 1.5) + aDot(4, 6, 1.5, A_CL) + aDot(-4, 11, 1.5) + aDot(0, 11, 1.5) + aDot(4, 11, 1.5, A_CL); },
  bread: function () { return aP('M-15 7q-2-15 15-15t15 15v4h-30z', A_KR, 1.6) + aP('M-7 -4l3 6M-1 -6l3 6M5 -4l3 6', 'none', 1.2); },
  cup: function () { return aP('M2 -10l7-8', 'none', 1.7) + aP('M-9 -10h18l-2.5 24h-13z', '#fff', 1.6) + aP('M-8.2 -2h16.4l-1 8h-14.4z', A_CL, 1.2) + aP('M-11 -10h22', 'none', 1.8); },
  cart: function () { return aR(-14, -5, 25, 13, '#fff', 1.6, 2) + aP('M-16 -5l4-9h22l4 9z', A_CL, 1.4) + aP('M-9 -14l-1 9M0 -14v9M9 -14l1 9', 'none', 1) + aC(-7, 11, 3.6, '#fff', 1.5) + aC(6, 11, 3.6, '#fff', 1.5) + aP('M11 1h6', 'none', 1.7); },
  basket: function () { return aC(-5, -6, 4.5, A_CL, 1.3) + aC(4, -7, 4, A_SG, 1.3) + aP('M-9 -3q9-17 18 0', 'none', 1.6) + aP('M-14 -3h28l-4 17h-20z', '#fff', 1.6) + aP('M-11 3h22M-9 9h18', 'none', 1.1); },
  cap: function () { return aP('M-9 0v8q9 6 18 0v-8', '#fff', 1.6) + aP('M-17 -4l17-8 17 8-17 8z', '#fff', 1.6) + aP('M13 -2v10', 'none', 1.3) + aC(13, 10, 1.9, A_CL, 1); },
  heart: function () { return aP('M0 13C-10 6-15 0-13.5-6.5C-12-13-3.5-13.5 0-7C3.5-13.5 12-13 13.5-6.5C15 0 10 6 0 13z', A_CL, 1.6); },
  clip: function () { return aR(-11, -12, 22, 27, '#fff', 1.6, 2) + aR(-5, -15, 10, 6, A_CL, 1.3, 1) + aK('M-7 -3l2 2 3-4M-7 5l2 2 3-4', 1.4) + aP('M0 -3h6M0 5h6', 'none', 1.2); },
  fuji: function () { return aC(9, -9, 4.5, A_CL, 1.3) + aP('M-17 12l11-16q6-6 12 0l11 16z', '#fff', 1.6) + aP('M-6 -4q6-6 12 0l-2.5 3-3.5-2-3.5 2z', A_SK, 1.2); },
  homevn: function () { return aP('M13 13V-4M13 -4q-6-1-8 3M13 -4q5-3 8 1M13 -4q-3-5-8-5M13 -4q4-5 8-4', 'none', 1.3) + aR(-14, -1, 22, 14, '#fff', 1.6) + aP('M-17 -1l6-9h16l6 9z', A_CL, 1.5) + aR(-6, 4, 6, 9, A_LT, 1.2); },
  plane: function () { return aK('M-15 10q15-12 30 0', 1.2) + aP('M-15 -1q0-4 6-4h17q7 0 8 4q-1 3-8 3h-17q-6 0-6-3z', '#fff', 1.6) + aP('M-1 -1l-7 10h5l8-10z', A_CL, 1.3) + aP('M-13 -4l-3-8h4l5 7', '#fff', 1.3) + aDot(4, -2, 1) + aDot(8, -2, 1) + aDot(0, -2, 1); },
  city: function () { return aR(-15, -4, 10, 18, '#fff', 1.5) + aR(-5, -14, 11, 28, A_SK, 1.6) + aR(6, 0, 10, 14, '#fff', 1.5) + aDot(-11, 1) + aDot(-11, 6) + aDot(-2, -9) + aDot(3, -9) + aDot(-2, -3) + aDot(3, -3) + aDot(-2, 3) + aDot(3, 3, 1.2, A_CL) + aDot(9, 5) + aDot(13, 5) + aP('M-17 14h34', 'none', 1.5); },
  family: function () { return aPerson(-9, 2, .85) + aPerson(9, 1, .9, A_LT) + aPerson(0, 8, .6, A_CL); },
  friends: function () { return aPerson(-7, 4, .95) + aPerson(8, 4, .95, A_SG) + aK('M-1 -16q1-3 3 0', 1.4); },
  laptop: function () { return aR(-12, -12, 24, 16, '#fff', 1.6, 2) + aP('M-16 4h32l-2.5 6h-27z', '#fff', 1.6) + aK('M-7 -6h8M-7 -2h12', 1.4); },
  board: function () { return aP('M-10 8l-3 8M10 8l3 8', 'none', 1.5) + aR(-15, -13, 30, 21, '#7E9A8E', 1.6, 2) + aT(-4, 2, 'あ', 11, '#fff', 'Noto Sans JP,sans-serif', 500) + aT(7, 2, 'A', 9, '#fff', 'Lora,Georgia,serif', 700); },
  shop: function () { return aR(-13, -2, 26, 15, '#fff', 1.6) + aP('M-16 -2l3-10h26l3 10z', '#fff', 1.5) + aP('M-10 -12l-1.5 10M-3.5 -12l-.5 10M3.5 -12l.5 10M10 -12l1.5 10', A_CL, 1.1) + aR(-9, 3, 8, 6, A_LT, 1.1) + aR(3, 3, 6, 10, '#fff', 1.2); },
  office: function () { return aR(-11, -10, 22, 24, '#fff', 1.6) + aP('M0 -10v-7', 'none', 1.4) + aP('M0 -17h8l-2 2.5 2 2.5H0', A_CL, 1.1) + aDot(-5, -5) + aDot(0, -5) + aDot(5, -5) + aDot(-5, 1) + aDot(0, 1) + aDot(5, 1) + aR(-3, 7, 6, 7, A_LT, 1.1); },
  talk: function () { return aP('M-16 -12h17v12h-9l-5 4v-4h-3z', '#fff', 1.5) + aT(-7.5, -2.5, 'A', 8.5, '#141413') + aP('M-1 -3h17v12h-3v4l-5-4h-9z', A_CL, 1.5) + aT(7.5, 6.5, 'あ', 8.5, '#fff', 'Noto Sans JP,sans-serif', 500); },
  jl: function (lv) { return aR(-15, -10, 30, 22, '#fff', 1.6, 4) + aP('M-15 -3h30', 'none', 1.1) + aT(0, -4.5, 'JLPT', 5.5, '#141413', 'Be Vietnam Pro,sans-serif', 700) + aT(0, 9.5, lv || 'N2', 11, '#B5532F'); },
  cert: function () { return aR(-14, -12, 28, 21, '#fff', 1.6, 1) + aP('M-9 -6h18M-9 -2h12', 'none', 1.1) + aP('M4 9l-2 7 4-2 4 2-2-7', A_CL, 1.1) + aC(6, 6, 5, A_YL, 1.3); },
  piggy: function () { return aC(1, -14, 3, A_YL, 1.3) + aP('M-14 2q0-11 13-11q10 0 13 7h3v7h-3q-2 4-6 5v4h-4v-3h-6v3h-4v-5q-6-3-6-7z', A_LT, 1.6) + aP('M-4 -8q-1-5 3-6', 'none', 1.3) + aP('M-3 -6h6', 'none', 1.5) + aDot(7, -1, 1.1); },
  car: function () { return aP('M-16 6v-6q0-2 3-2l4-7h15l5 7q5 0 5 3v5z', '#fff', 1.6) + aP('M-8 -2l3-5h7v5zM5 -2v-5h3l4 5z', A_SK, 1.2) + aC(-9, 7, 3.8, '#fff', 1.5) + aC(9, 7, 3.8, '#fff', 1.5) + aK('M-16 2h4', 1.4); },
  shoe: function () { return aP('M-15 9v-8q0-3 3-3h5q4 6 12 7l7 1q3 1 3 3v0z', '#fff', 1.6) + aP('M-16 9h32v4h-32z', A_CL, 1.4) + aP('M-4 0l2-2M-1 2l2-2', 'none', 1.1) + aK('M-17 -6h-4M-16 -10h-6', 1.3); },
  suitcase: function () { return aP('M-5 -10v-4h10v4', 'none', 1.6) + aR(-12, -10, 24, 22, '#fff', 1.6, 3) + aP('M-6 -10v22M6 -10v22', A_CL, 1.4) + aC(-6, 14, 1.6, '#fff', 1.1) + aC(6, 14, 1.6, '#fff', 1.1); },
  sun: function () { return aK('M0 -16v-3M0 16v3M-16 0h-3M16 0h3M-11 -11l-2-2M11 -11l2-2M-11 11l-2 2M11 11l2 2', 1.6) + aC(0, 0, 10, A_YL, 1.6) + aP('M-4 2q4 4 8 0', 'none', 1.3); },
  care: function () { return aP('M-6 15V-4q0-7 6-7t6 7', 'none', 1.8) + aP('M-11 15h10', 'none', 1.6) + aP('M8 -2C3-5 1-8 2-11C3-14 6-14 8-11C10-14 13-14 14-11C15-8 13-5 8-2z', A_CL, 1.3); },
  /* PS1.3.50: hình cho dây ảnh “thành công về nghề nghiệp” (b33) */
  key: function () { return aC(-8, -6, 7.5, A_YL, 1.6) + aC(-8, -6, 2.6, '#fff', 1.2) + aP('M-2.5 -1l15 15M7 9l3-3M10.5 12.5l3-3', 'none', 1.8); },
  up: function () { return aP('M-15 14h8v-7h8v-7h8v-7h6', 'none', 1.6) + aR(-15, 7, 8, 7, A_LT, 1.2) + aR(-7, 0, 8, 14, A_LT, 1.2) + aR(1, -7, 8, 21, A_LT, 1.2) + aK('M3 -12l7-7M5 -19h5v5', 1.8); },
  clock: function () { return aC(0, 1, 13, '#fff', 1.6) + aP('M0 -6v7l5 4', 'none', 1.7) + aP('M-10 -14l-4 3M10 -14l4 3', 'none', 1.6) + aDot(0, 1, 1.4) + aK('M-9 1h2M7 1h2M0 9v2', 1.3); }
};
function propArt(k, arg) { return CD2_PROP[k] ? CD2_PROP[k](arg) : ''; }

/* ---------- PS1.3.51 (bản 4 · đợt 3) 8 món trong Rương kho báu · sticker mới Bảng ước mơ (Sở thích, niềm vui) ---------- */
var A_PK = '#F5D3DA', A_GL = '#E6F0EF';
CD2_PROP.anchor = function () { return aC(0, -12, 3.2, A_YL, 1.6) + aP('M0 -8.8V13', 'none', 1.9) + aP('M-7 -4h14', 'none', 1.9) + aP('M-12 3q1 10 12 10t12-10', 'none', 1.9) + aP('M-15 6l3-3 3 3M9 6l3-3 3 3', 'none', 1.6); };
CD2_PROP.scope = function () { return '<g transform="rotate(-28)">' + aR(-16, -3.5, 9, 7, '#fff', 1.5, 1.5) + aR(-7, -4.5, 10, 9, A_CL, 1.6, 1.5) + aR(3, -6, 12, 12, '#fff', 1.6, 2) + aP('M7 -6v12', 'none', 1.1) + '</g>' + aP('M-4 6l-5 9M-4 6l3 9', 'none', 1.4) + aK('M13 -15l2-3M16 -11h3', 1.3); };
CD2_PROP.storybk = function () { return '<g transform="translate(-2 3) scale(.82)">' + CD2_PROP.book() + '</g>' + aP('M3 -17h13v9h-6l-4 3.5V-8h-3z', A_CL, 1.3) + aDot(6.5, -12.5, .9, '#fff') + aDot(9.5, -12.5, .9, '#fff') + aDot(12.5, -12.5, .9, '#fff'); };
CD2_PROP.compass = function () { return aC(0, 0, 14, '#fff', 1.6) + aC(0, 0, 10.5, 'none', 1) + aP('M0 -9.5l3.6 9.5h-7.2z', A_CL, 1.2) + aP('M0 9.5l3.6-9.5h-7.2z', '#fff', 1.2) + aDot(0, 0, 1.5) + aP('M0 -14v2.5M0 14v-2.5M-14 0h2.5M14 0h-2.5', 'none', 1.2); };
CD2_PROP.chart = function () { return aP('M-15 -9l9-3 12 3 9-3v21l-9 3-12-3-9 3z', '#fff', 1.6) + aP('M-6 -12v21M6 -9v21', 'none', 1.1) + aP('M-11 6q3-7 8-4t8-5', 'none', 1.2, ' stroke-dasharray="2 2.4"') + aK('M7 -9l4 4M11 -9l-4 4', 1.6); };
CD2_PROP.vest = function () { return aP('M-5 -14l-9 5v20q0 4 4 4h6V-1zM5 -14l9 5v20q0 4-4 4H4V-1z', A_CL, 1.6) + aP('M-5 -14q5 7 10 0', 'none', 1.4) + aP('M-14 2h10M4 2h10M-14 8h10M4 8h10', 'none', 1.1) + aR(-5, 0, 3, 4, '#fff', 1, .5) + aR(2, 0, 3, 4, '#fff', 1, .5); };
CD2_PROP.lantern = function () { return aP('M0 -18v-0M-3 -16q3-4 6 0', 'none', 1.5) + aR(-8, -14, 16, 4, '#fff', 1.5, 1.5) + aP('M-7 -10q-3 9 0 18h14q3-9 0-18z', A_YL, 1.6) + aP('M0 -5q-3.5 4.5 0 9q3.5-4.5 0-9z', A_CL, 1.1) + aP('M-3 -10v18M3 -10v18', 'none', .8) + aR(-8, 8, 16, 4, '#fff', 1.5, 1.5) + aK('M-14 -4h-3M14 -4h3M-12 -11l-2-2M12 -11l2-2', 1.3); };
CD2_PROP.palette = function () { return aP('M2 -14C-10 -14 -15 -6 -15 1C-15 9 -9 14 -2 14C2 14 3 11 1 8C-1 5 2 3 5 3H10C14 3 15 0 15 -3C15 -10 9 -14 2 -14z', '#fff', 1.6) + aC(-9, 0, 2.4, A_CL, 1) + aC(-5, -8, 2.4, A_YL, 1) + aC(3, -9, 2.4, A_SG, 1) + aC(9, -4, 2.4, A_SK, 1); };
CD2_PROP.ball = function () { return aC(0, 1, 13, '#fff', 1.6) + aP('M0 -4.5l5.2 3.8-2 6.1h-6.4l-2-6.1z', '#2B2A27', 1) + aP('M0 -4.5V-12M5.2 -.7l7.4-2.4M3.2 5.4l4.6 6.3M-3.2 5.4l-4.6 6.3M-5.2 -.7l-7.4-2.4', 'none', 1.1) + aK('M-17 -8h-3M-16 -12h-4', 1.3); };
CD2_PROP.tent = function () { return aP('M-16 12l16-24 16 24z', A_SG, 1.6) + aP('M0 -12l-6 24h12z', '#fff', 1.3) + aP('M-18 12h36', 'none', 1.6) + aP('M0 -12l-3-4M0 -12l3-4', 'none', 1.3) + aK('M11 -14l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2-1.5-1.4 2-.3z', 1); };
CD2_PROP.pan = function () { return aP('M7 -1l10-6', 'none', 2.4) + aC(-3, 2, 11, '#fff', 1.6) + aP('M-10 1q0-6 6-6q5-1 7 3q3 4-1 7q-3 4-8 2q-5-1-4-6z', '#fff', 1.1) + aC(-3, 1.5, 3, A_YL, 1.1) + aK('M-9 -12q-2-3 0-5M-3 -12q-2-3 0-5', 1.2); };
CD2_PROP.guitar = function () { return '<g transform="rotate(35)">' + aP('M0 -3C-5 -3 -6 0 -5 3C-9 4 -9 14 0 14C9 14 9 4 5 3C6 0 5 -3 0 -3z', A_KR, 1.6) + aR(-1.6, -17, 3.2, 15, '#fff', 1.3, 1) + aR(-2.6, -21, 5.2, 4.5, A_CL, 1.2, 1) + aC(0, 6, 2.3, '#2B2A27', 1) + aP('M0 -16V12', 'none', .6) + aP('M-3 10h6', 'none', 1.2) + '</g>'; };
CD2_PROP.camera = function () { return aR(-15, -8, 30, 21, '#fff', 1.6, 3) + aP('M-6 -8l2.5-4.5h7L6 -8', '#fff', 1.5) + aC(0, 2.5, 7, A_SK, 1.6) + aC(0, 2.5, 3.4, '#fff', 1.2) + aDot(10.5, -3.5, 1.5, A_CL) + aP('M-12 -4h4', 'none', 1.2); };
CD2_PROP.pet = function () { return aP('M-11 -3l-2-12 9 6zM11 -3l2-12-9 6z', A_LT, 1.5) + aC(0, 3, 11.5, '#fff', 1.6) + aDot(-4.5, 1, 1.5) + aDot(4.5, 1, 1.5) + aP('M-1.6 5h3.2L0 7z', A_CL, 1) + aP('M0 7q-1.5 2.5-4 1.5M0 7q1.5 2.5 4 1.5', 'none', 1) + aP('M-7 6h-8M-7 8.5l-7 2.5M7 6h8M7 8.5l7 2.5', 'none', .9); };
CD2_PROP.coffee = function () { return aP('M-13 -3h20v7q0 9-10 9t-10-9z', '#fff', 1.6) + aP('M7 0q6 0 6 4t-6 4', 'none', 1.5) + aP('M-16 13q12 4 26 0', 'none', 1.5) + aP('M-6 2c-2-2-4 0-2 2l2 2 2-2c2-2 0-4-2-2z', A_CL, .9) + aK('M-8 -8q-2-3 0-6M-2 -8q-2-3 0-6', 1.2); };
CD2_PROP.moto = function () { return aC(-10, 8, 5.5, '#fff', 1.6) + aC(11, 8, 5.5, '#fff', 1.6) + aP('M-10 8l6-9h9l6 9', 'none', 1.6) + aP('M-4 -1q2-5 7-5h4l2 5z', A_CL, 1.4) + aP('M-12 -3h7', 'none', 2.2) + aP('M11 8L8 -6l4-3h3', 'none', 1.6) + aK('M-18 12h-3M-17 8h-4', 1.2); };
CD2_PROP.sakura = function () { var h = aP('M-16 15q7-3 11-9', 'none', 1.6), i; for (i = 0; i < 5; i++) h += '<g transform="translate(2 -1) rotate(' + (i * 72) + ')">' + aP('M0 0C-6 -3 -6 -10 -2.4 -12L0 -10L2.4 -12C6 -10 6 -3 0 0z', A_PK, 1.2) + '</g>'; return h + aC(2, -1, 2.2, A_CL, 1) + aK('M-13 -10l1.5 1.5M-9 -14l1 1.8', 1.2); };
CD2_PROP.firework = function () { var h = '', i, a, x1, y1, x2, y2; for (i = 0; i < 10; i++) { a = i * Math.PI / 5; x1 = hF(-2 + Math.cos(a) * 4); y1 = hF(-3 + Math.sin(a) * 4); x2 = hF(-2 + Math.cos(a) * 12); y2 = hF(-3 + Math.sin(a) * 12);
  h += i % 2 ? aK('M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2, 1.5) : aP('M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2, 'none', 1.4); h += aDot(hF(-2 + Math.cos(a) * 14.5), hF(-3 + Math.sin(a) * 14.5), 1, i % 2 ? A_CL : '#141413'); }
  return h + aK('M12 15v-5M10 12l2-2 2 2', 1.2) + aDot(13, 6, 1.1, A_CL); };
CD2_PROP.gym = function () { return aP('M-5 0h10', 'none', 2.6) + aR(-16, -6, 5, 12, '#fff', 1.6, 1.5) + aR(-11, -10, 6, 20, A_CL, 1.6, 1.5) + aR(5, -10, 6, 20, A_CL, 1.6, 1.5) + aR(11, -6, 5, 12, '#fff', 1.6, 1.5); };
CD2_PROP.vlog = function () { return aR(-10, -15, 18, 30, '#fff', 1.6, 3) + aR(-7, -11, 12, 18, A_SK, 1.1, 1) + aP('M-3 -6v8l6-4z', A_CL, 1.1) + aDot(-1, 11, 1.3) + aDot(3, -9, 1.2, A_CL) + aK('M11 -8q3 3 0 6M13.5 -11q6 6 0 12', 1.3); };
CD2_PROP.concert = function () { return aP('M-1 -3l8 15', 'none', 2.6) + aC(-4, -8, 6, '#fff', 1.6) + aP('M-9 -10h10M-10 -7h12M-9 -4h10', 'none', .9) + aK('M8 -15v8M8 -15l6-1.5v8', 1.4) + aC(6.4, -7, 1.9, A_CL, 1) + aC(12.4, -8.5, 1.9, A_CL, 1) + aK('M-14 6l-3 2M-14 11h-3', 1.2); };
CD2_PROP.apt = function () { return aR(-14, -15, 28, 29, '#fff', 1.6, 2) + aR(-11, -12, 22, 15, A_SK, 1.2, 1) + aC(5, -7, 2.6, A_YL, 1) + aP('M-11 3l6-7 4 4 3-3 9 6', '#fff', 1.1) + aP('M0 -12v15', 'none', 1) + aP('M-14 7h28M-10 7v7M-4 7v7M2 7v7M8 7v7', 'none', 1.1); };
CD2_PROP.rings = function () { return aC(-5, 4, 8.5, 'none', 2.2) + aC(6, 4, 8.5, 'none', 2.2) + aP('M-8.5 -8l1.6-3h3.8l1.6 3-3.5 4z', A_SK, 1.2) + aK('M10 -12l1-3M14 -9l3-1M13 -13l2-2', 1.3); };
CD2_PROP.elearn = function () { return aR(-12, -12, 24, 16, '#fff', 1.6, 2) + aP('M-16 4h32l-2.5 6h-27z', '#fff', 1.6) + aP('M-6 -6l6-3 6 3-6 3z', A_CL, 1.1) + aP('M-3 -4.5v3q3 2 6 0v-3', 'none', 1.1) + aP('M6 -6v4', 'none', 1); };
CD2_PROP.eshop = function () { return aR(-13, -15, 16, 28, '#fff', 1.6, 3) + aP('M-10 -10h10M-10 -6h7', 'none', 1.1) + aDot(-5, 10, 1.2) + aP('M0 -1h14l-1.5 14H1.5z', A_CL, 1.5) + aP('M4 -1v-3q3-4.5 6 0v3', 'none', 1.4); };

/* Rương kho báu (f1): nắp là nhóm .chest__lid để CSS bật lên; vầng sáng .chest__glow hiện khi mở */
function chestArt(open) {
  var h = '<g class="chest__glow">' + aK('M60 30V12M40 34l-8-12M80 34l8-12M26 44l-12-6M94 44l12-6', 2) + '<circle cx="60" cy="46" r="26" fill="#F6DDA4" opacity=".55"/></g>';
  h += aR(14, 48, 92, 42, A_KR, 2, 4) + aP('M30 48v42M90 48v42', 'none', 2) + aP('M14 66h92', 'none', 1.4) + aR(26, 48, 8, 42, A_CL, 1.6, 1) + aR(86, 48, 8, 42, A_CL, 1.6, 1);
  h += (open ? '<g transform="translate(46 40) scale(.8)">' + CD2_PROP.compass() + '</g><g transform="translate(74 42) scale(.7)">' + CD2_PROP.key() + '</g>' : '');
  h += '<g class="chest__lid">' + aP('M14 48V36q0-16 46-16t46 16v12z', '#E7B98F', 2) + aP('M30 22.5V48M90 22.5V48', A_CL, 6.5) + aP('M14 48h92', 'none', 2) + '</g>';
  h += aR(52, 44, 16, 16, A_YL, 1.8, 3) + aC(60, 51, 2.2, '#141413', 1) + aP('M60 53v3', 'none', 1.6);
  return '<svg class="chest__art' + (open ? ' on' : '') + '" viewBox="0 0 120 100" width="150" height="125" aria-hidden="true">' + hand(h) + '</svg>';
}
/* chai thủy tinh có thư cuộn bên trong; nút bần là nhóm .btl__cork */
function bottleArt(w, sea) {
  var h = (sea ? '<path d="M4 86q10-6 20 0t20 0 20 0 20 0 20 0" fill="none" stroke="#9DB7C4" stroke-width="2" stroke-linecap="round"/>' : '') +
    '<g class="btl__body"><g transform="rotate(-16 50 50)">' + aP('M43 18h14v11l7 9v40q0 5-5 5H41q-5 0-5-5V38l7-9z', A_GL, 2) + aP('M39 46q11 4 22 0', 'none', 1, ' stroke-opacity=".5"') +
    aR(43, 48, 14, 24, '#FFF7E6', 1.4, 3) + aP('M46 55h8M46 60h8M46 65h5', 'none', 1) + aP('M43 52q7-3 14 0', A_CL, 1.2) +
    '<g class="btl__cork">' + aR(44, 9, 12, 10, A_KR, 1.8, 2) + aP('M47 12v4M51 11v6', 'none', 1) + '</g></g></g>';
  return '<svg class="btl" viewBox="0 0 100 100" width="' + (w || 64) + '" height="' + (w || 64) + '" aria-hidden="true">' + hand(h) + '</svg>';
}
/* thả chai: thư cuộn vào chai, đóng nút, chai rơi xuống biển rồi trôi về chân trời */
function dropArt() {
  var h = '<rect width="320" height="170" fill="#EEF3F5"/><circle cx="252" cy="92" r="20" fill="#F6DDA4"/><rect y="92" width="320" height="78" fill="#DCE6EC"/>' +
    '<path d="M0 92h320" stroke="#9DB7C4" stroke-width="1.6"/>' +
    '<path d="M18 122q10-5 20 0t20 0M120 140q10-5 20 0t20 0M230 128q10-5 20 0t20 0M70 156q10-5 20 0t20 0" fill="none" stroke="#9DB7C4" stroke-width="1.6" stroke-linecap="round"/>';
  h += '<g class="fd__b"><g class="fd__bi">' + '<g transform="translate(104 76) rotate(-90 50 50) scale(.9)">' +
    aP('M43 18h14v11l7 9v40q0 5-5 5H41q-5 0-5-5V38l7-9z', A_GL, 2) + aR(43, 48, 14, 24, '#FFF7E6', 1.4, 3) + aP('M46 55h8M46 60h8', 'none', 1) +
    '<g class="fd__cork">' + aR(44, 9, 12, 10, A_KR, 1.8, 2) + '</g></g></g></g>';
  h += '<g class="fd__let">' + aR(116, 24, 26, 30, '#FFF7E6', 1.6, 3) + aP('M121 32h16M121 38h16M121 44h10', 'none', 1.1) + '</g>';
  return '<svg class="fdrop" viewBox="0 0 320 170" width="100%" aria-hidden="true">' + hand(h) + '</svg>';
}

/* cảnh nơi làm việc 100×100, mặt đất y 84 */
var CD2_SPSC = {
  pack: function () { return aP('M10 84V42l12-10v10l12-10v10l12-10v10l12-10v10l12-10v52', '#fff') + aDots('M12 46h56v14H12z', .45, 1) +
    aR(4, 64, 92, 7, '#fff', 1.8, 3.5) + aC(12, 67.5, 1.8, '#fff', 1.2) + aC(50, 67.5, 1.8, '#fff', 1.2) + aC(88, 67.5, 1.8, '#fff', 1.2) + aP('M14 71v13M50 71v13M86 71v13', 'none', 1.8) +
    '<g transform="translate(24 55) scale(.7)">' + CD2_PROP.box() + '</g><g transform="translate(52 52) scale(.85)">' + CD2_PROP.box() + '</g><g transform="translate(78 57) scale(.55)">' + CD2_PROP.box() + '</g>'; },
  weld: function () { return aP('M86 84V18h-32M86 28l-12-10M60 18v20', 'none', 1.8) + aP('M57 38h6l-3 5z', '#fff', 1.4) +
    aP('M6 56h88l-8 28H14z', '#fff') + aP('M10 64h80', 'none', 1.3) + aC(28, 72, 3, A_SK, 1.4) + aC(44, 72, 3, A_SK, 1.4) + aC(60, 72, 3, A_SK, 1.4) + aDots('M16 76h68l-2 7H18z', .5, 1) +
    aR(18, 44, 22, 12, '#fff', 1.6) + aP('M24 44v-8h8v8', '#fff', 1.4) + aK('M72 52l5-5M75 56h6M70 49v-6M78 51l3 1', 1.5); },
  office: function () { return aR(10, 16, 38, 30, A_SK, 1.6, 2) + aP('M29 16v30M10 31h38', 'none', 1.3) + aP('M12 44l8-8 6 5 8-9 12 12', 'none', 1.2) +
    aP('M4 64h92', 'none', 2) + aP('M10 64v20M90 64v20', 'none', 1.8) + aR(56, 34, 30, 21, '#fff', 1.7, 2) + aP('M71 55v5M64 62h14', 'none', 1.6) + aK('M61 41h14M61 46h9', 1.5) +
    aR(16, 56, 18, 8, '#fff', 1.4, 1) + aR(18, 52, 15, 4, A_LT, 1.2, 1) + aP('M42 56h7v8h-7z', '#fff', 1.4) + aP('M49 58q3 0 3 2.5t-3 2.5', 'none', 1.2); },
  talk: function () { return aP('M10 64h80', 'none', 2) + aP('M16 64v20M84 64v20', 'none', 1.8) +
    aP('M4 84V62q0-4 4-4h0v26M96 84V62q0-4-4-4v26', 'none', 1.6) + aR(42, 56, 16, 8, '#fff', 1.4, 1) + aP('M45 59h10', 'none', 1) +
    '<g transform="translate(42 32) scale(1.65)">' + CD2_PROP.talk() + '</g>'; },
  cross: function () { return aP('M0 84q30-14 60-6t40 2', '#fff', 1.6) + aDots('M10 82q20-8 40-6v8H10z', .35, 1) + aP('M44 84V24', 'none', 2.2) + aC(44, 22, 2.5, A_CL, 1.3) +
    aP('M46 34h30l7 6-7 6H46z', '#fff', 1.6) + aT(62, 43, 'NHẬT', 7.5, '#141413', 'Be Vietnam Pro,sans-serif', 700) +
    aP('M42 52H8l-7 6 7 6h34z', A_CL, 1.6) + aT(23, 61, 'VIỆT NAM', 7, '#fff', 'Be Vietnam Pro,sans-serif', 700) +
    '<g transform="translate(72 70) scale(.62)">' + CD2_PROP.suitcase() + '</g>'; },
  resto: function () { return aP('M6 16h88', 'none', 1.8) + aP('M10 16v20h18V16zM54 16v20h18V16z', '#fff', 1.4) + aP('M32 16v20h18V16zM76 16v20h18V16z', A_CL, 1.4) +
    aR(4, 62, 92, 8, '#fff', 1.8, 1) + aP('M8 70v14M92 70v14', 'none', 1.8) + aDots('M8 72h84v12H8z', .35, 1) +
    '<g transform="translate(34 50) scale(.95)">' + CD2_PROP.noodle() + '</g>' + aP('M58 62q0-10 10-10h4q10 0 10 10z', '#fff', 1.6) + aP('M70 52v-3', 'none', 1.6) + aK('M30 38q-3-4 0-8M38 38q-3-4 0-8', 1.3); },
  uni: function () { return aP('M10 34L50 14l40 20z', '#fff', 1.8) + aR(14, 34, 72, 6, '#fff', 1.6) + aP('M22 40v34M36 40v34M50 40v34M64 40v34M78 40v34', 'none', 2) +
    aR(12, 74, 76, 5, '#fff', 1.6) + aR(6, 79, 88, 5, '#fff', 1.6) + aC(50, 26, 3.5, A_CL, 1.3) + aDots('M24 42h10v30H24zM52 42h10v30H52z', .3, 1); },
  class: function () { return aR(8, 12, 60, 38, '#7E9A8E', 1.8, 2) + aR(5, 50, 66, 3, '#fff', 1.4) +
    '<text x="17" y="32" font-family="Noto Sans JP,sans-serif" font-size="13" fill="#fff">あいう</text>' + '<path d="M18 40h36" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>' +
    aP('M60 62h36v4H60z', '#fff', 1.6) + aP('M64 66v18M92 66v18', 'none', 1.8) + aR(66, 54, 18, 4, A_CL, 1.2, 1) + aR(68, 50, 15, 4, '#fff', 1.2, 1) + aP('M74 30l14 30', 'none', 1.5); },
  online: function () { return aR(18, 18, 64, 42, '#fff', 1.8, 3) + aP('M8 60h84l-4 10H12z', '#fff', 1.8) + aR(24, 24, 32, 22, '#7E9A8E', 1.4, 1) +
    '<text x="29" y="39" font-family="Noto Sans JP,sans-serif" font-size="10" fill="#fff">あい</text>' + aR(60, 24, 16, 12, A_LT, 1.2, 1) + aR(60, 39, 16, 12, A_SK, 1.2, 1) + aK('M26 52h20', 1.4) +
    aP('M84 84v-8q0-4 4-4t4 4v8', 'none', 1.5) + aP('M88 72q-6-6-4-14q6 4 4 14zM88 72q6-4 8-12q-8 2-8 12z', A_SG, 1.3); },
  code: function () { return aR(14, 16, 52, 36, '#fff', 1.8, 3) + aP('M40 52v8M30 60h20', 'none', 1.7) + aT(40, 39, '&lt;/&gt;', 14, '#B5532F', 'Be Vietnam Pro,sans-serif', 700) +
    aP('M4 66h92', 'none', 2) + aP('M10 66v18M90 66v18', 'none', 1.8) + aR(20, 61, 40, 5, '#fff', 1.3, 1) + aP('M72 66v-9h9v9', '#fff', 1.4) + aP('M81 59q3 0 3 2.5t-3 2.5', 'none', 1.2) +
    aP('M84 52v-10M84 46q-6-2-8-8q7 0 8 8zM84 44q4-6 9-6q-1 6-9 6z', A_SG, 1.2); },
  cnc: function () { return '<g transform="translate(20 26)">' + aGear(0, 0, 11, 8, '#fff', 1.4) + '</g><g transform="translate(38 32)">' + aGear(0, 0, 7, 6, '#fff', 1.3) + '</g>' +
    aR(8, 40, 66, 44, '#fff', 1.8, 3) + aR(14, 48, 36, 26, A_SK, 1.5, 2) + aC(26, 61, 6, '#fff', 1.4) + aP('M32 61h12', 'none', 2) + aK('M44 58l3-3M44 64l3 3', 1.3) +
    aR(56, 48, 12, 18, '#fff', 1.3, 1) + aDot(59.5, 52, 1.4, A_CL) + aDot(64.5, 52, 1.4) + aDot(59.5, 57, 1.4) + aDot(64.5, 57, 1.4) + aDot(62, 62, 1.4) + aP('M4 84h92', 'none', 1.6) +
    '<g transform="translate(86 72) rotate(30) scale(.75)">' + aP('M-3 -14a6 6 0 1 0 6 0v4h-6z', '#fff', 1.6) + aR(-2.5, -5, 5, 18, '#fff', 1.5, 2) + '</g>'; },
  company: function () { return aR(28, 14, 44, 70, '#fff', 1.8, 1) + aR(34, 6, 32, 8, A_CL, 1.5, 1) + aDots('M30 16h12v66H30z', .35, 1) +
    aR(36, 22, 8, 7, A_SK, 1.1) + aR(46, 22, 8, 7, A_SK, 1.1) + aR(56, 22, 8, 7, A_SK, 1.1) + aR(36, 34, 8, 7, A_SK, 1.1) + aR(46, 34, 8, 7, A_SK, 1.1) + aR(56, 34, 8, 7, A_SK, 1.1) +
    aR(36, 46, 8, 7, A_SK, 1.1) + aR(46, 46, 8, 7, A_LT, 1.1) + aR(56, 46, 8, 7, A_SK, 1.1) + aR(43, 66, 14, 18, A_LT, 1.4) + aP('M50 66v18', 'none', 1.1) +
    aP('M14 84V70M14 72q-8-2-8-10q0-8 8-8t8 8q0 8-8 10z', A_SG, 1.4) + aP('M86 84V68M86 70q-7-2-7-9q0-7 7-7t7 7q0 7-7 9z', A_SG, 1.4) + aP('M2 84h96', 'none', 1.6); },
  bakery: function () { return aR(12, 34, 76, 50, '#fff', 1.8) + aP('M8 34l4-14h76l4 14z', '#fff', 1.6) + aP('M20 20l-2 14M30 20l-1 14M40 20v14M50 20v14M60 20v14M70 20l1 14M80 20l2 14', 'none', 1.1) +
    aP('M8 34l4-14h8l-2 14zM28 34l1-14h11v14zM50 34V20h10v14zM70 34l1-14h9l4 14z', A_CL, 1.1) +
    aR(18, 44, 38, 28, A_SK, 1.5, 1) + aP('M18 62h38', 'none', 1.2) + '<g transform="translate(29 54) scale(.45)">' + CD2_PROP.bread() + '</g>' +
    aP('M42 62v-6q0-3 3-3h4q3 0 3 3v6z', A_LT, 1.2) + aK('M47 53v-3', 1.2) + aR(64, 48, 18, 36, A_LT, 1.5, 1) + aDot(78, 66, 1.5) + aP('M4 84h92', 'none', 1.6); },
  build: function () { return aP('M78 84V12M60 12h36M78 20l12-8M66 12v20', 'none', 1.8) + aR(61, 32, 10, 7, '#fff', 1.4) + aP('M74 84l4-8 4 8', 'none', 1.4) +
    aR(10, 34, 46, 50, '#fff', 1.8) + aP('M10 50h46M10 67h46M25 34v50M41 34v50', 'none', 1.4) + aP('M10 34l15 16M25 50l16-16M41 34l15 16M10 67l15-17M41 67l15-17', 'none', 1, ' opacity=".7"') +
    aP('M2 84h96', 'none', 1.6) + '<g transform="translate(86 74) scale(.6)">' + CD2_PROP.helmet() + '</g>'; },
  farm: function () { return aC(84, 18, 7, A_YL, 1.5) + aP('M8 62q0-34 42-34t42 34z', A_SK, 1.8) + aP('M29 62q0-30 21-34M71 62q0-30-21-34M50 28v34M12 48h76', 'none', 1.2) + aP('M8 62h84', 'none', 1.8) +
    aP('M4 74h92M4 84h92', 'none', 1.3) + [12, 26, 40, 54, 68, 82].map(function (x, i) { return '<g transform="translate(' + x + ' ' + (i % 2 ? 72 : 82) + ') scale(.42)">' + CD2_PROP.leaf() + '</g>'; }).join(''); },
  care: function () { return aR(6, 16, 34, 28, A_SK, 1.6, 2) + aP('M23 16v28M6 30h34', 'none', 1.2) +
    aP('M44 84V58q0-8 8-8h20q8 0 8 8v26', '#fff', 1.8) + aR(38, 62, 48, 12, A_LT, 1.6, 4) + aP('M48 74v10M76 74v10', 'none', 1.6) +
    aP('M12 64h20v4H12z', '#fff', 1.4) + aP('M16 68v16M28 68v16', 'none', 1.5) + aP('M17 64v-5h7v5', '#fff', 1.2) + aK('M25 58q-2-3 0-6', 1.2) +
    '<g transform="translate(62 32) scale(.9)">' + CD2_PROP.heart() + '</g>' + aP('M2 84h96', 'none', 1.6); },
  home: function () { return aC(18, 18, 7, A_YL, 1.5) + aR(14, 46, 50, 38, '#fff', 1.8) + aP('M6 46l12-16h42l12 16z', A_CL, 1.7) + aP('M18 30l2 16M30 30v16M42 30v16M54 30l-1 16', 'none', 1, ' opacity=".6"') +
    aR(34, 60, 12, 24, A_LT, 1.5) + aR(20, 56, 9, 9, A_SK, 1.3) + aR(51, 56, 9, 9, A_SK, 1.3) +
    aP('M84 84V30M84 30q-10-2-14 6M84 30q9-5 14 1M84 30q-5-9-13-8M84 30q6-9 13-7', 'none', 1.5) + aP('M70 84v-8h28v8M70 79h28', 'none', 1.2) + aP('M2 84h96', 'none', 1.6); },
  chart: function () { return aR(14, 12, 58, 44, '#fff', 1.8, 2) + aP('M24 48h40', 'none', 1.3) + aR(26, 38, 7, 10, A_SK, 1.2) + aR(37, 32, 7, 16, A_SK, 1.2) + aR(48, 26, 7, 22, A_CL, 1.2) +
    aK('M24 34l12-8 10 4 16-12M58 18h4v4', 1.6) + aP('M28 56l-6 28M58 56l6 28M43 56v28', 'none', 1.6) +
    aP('M74 84V66h20v18', '#fff', 1.6) + aR(78, 58, 12, 8, A_LT, 1.2, 1) + aP('M2 84h96', 'none', 1.6); },
  plane: function () { return aP('M-4 84q4-12 26-12q20 0 26 12z', A_LT, 1.6) + aP('M56 84q6-12 22-12q18 0 26 12z', A_SG, 1.6) +
    '<path d="M14 66Q50 0 86 66" fill="none" stroke="#141413" stroke-width="1.3" stroke-dasharray="3 4" stroke-linecap="round"/>' +
    '<g transform="translate(50 30) scale(1.15)">' + CD2_PROP.plane() + '</g>' + aP('M14 72V58M14 58q-6-1-8 3M14 58q5-3 8 0', 'none', 1.3) + aP('M76 72l6-9 6 9', '#fff', 1.3) +
    aT(16, 96, 'VN', 6.5, '#141413', 'Be Vietnam Pro,sans-serif', 700) + aT(84, 96, 'NHẬT', 6.5, '#141413', 'Be Vietnam Pro,sans-serif', 700); }
};

/* ảnh thẻ Senpai: thumb = vuông 100×100 + huy hiệu đồ vật; banner = mở rộng 2 bên (khởi đầu → hôm nay) */
function spArtOf(sp) { var a = (typeof SP_ART !== 'undefined' && SP_ART[sp.id]) || ['office', 'book']; return { sc: a[0], pr: a[1] }; }
function spArt(sp, mode, w) {
  var a = spArtOf(sp), is = null, i; for (i = 0; i < ISLES.length; i++) if (ISLES[i].id === sp.isl) is = ISLES[i];
  var bg = sideBg(is ? is.side : 'both'), core = CD2_SPSC[a.sc] ? CD2_SPSC[a.sc]() : '';
  if (mode === 'banner') {
    var side = is && is.side === 'jp' ? '<g transform="translate(176 70) scale(1.5)">' + CD2_PROP.fuji() + '</g>' : (is && is.side === 'vn' ? '<g transform="translate(176 66) scale(1.5)">' + CD2_PROP.homevn() + '</g>' : '<g transform="translate(176 56) scale(1.3)">' + CD2_PROP.plane() + '</g>');
    var inner = aP('M-130 84H230', 'none', 1.4, ' opacity=".55"') + aGull(-40, 22) + aGull(-24, 32, .8) + aGull(130, 18, .8) +
      aC(-80, 56, 24, '#fff', 1.6) + '<g transform="translate(-80 56) scale(1.15)">' + propArt(a.pr) + '</g>' +
      '<path d="M-50 50Q-30 30 -8 44" fill="none" stroke="#D97757" stroke-width="1.8" stroke-dasharray="3 4" stroke-linecap="round"/>' + aK('M-13 38l5 6-7 2', 1.8) +
      core + side;
    return '<svg class="spart spart--bn" viewBox="-130 0 360 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect x="-130" width="360" height="100" fill="' + bg + '"/><g>' + hand(inner) + '</g></svg>';
  }
  var th = core + aC(82, 16, 14, '#fff', 1.4) + '<g transform="translate(82 16) scale(.62)">' + propArt(a.pr) + '</g>';
  return '<svg class="spart" viewBox="0 0 100 100" width="' + (w || 56) + '" height="' + (w || 56) + '" aria-hidden="true"><rect width="100" height="100" fill="' + bg + '"/><g>' + hand(th) + '</g></svg>';
}

/* sticker Bảng ước mơ: nền vuông màu nhạt, đồ vật ở giữa */
function dreamSticker(k, w, arg, bg) {
  return '<svg class="dsk" viewBox="-24 -24 48 48" width="' + (w || 48) + '" height="' + (w || 48) + '" aria-hidden="true">' + (bg ? '<rect x="-24" y="-24" width="48" height="48" rx="10" fill="' + bg + '"/>' : '') + '<g>' + hand(propArt(k, arg)) + '</g></svg>';
}

/* =========================================================
   PS1.3.50 · cảnh “Đi một vòng chỗ làm” (b72), hệ 360×220. Điểm “?” do engine đặt (TOUR trong content.js).
   ========================================================= */
/* PS1.3.57 (góp ý 14): người trong cảnh “Đi một vòng chỗ làm”, vẽ tô màu (chân ở x, y; cao ~86 × k).
   o.hat: chef | cap | helmet · o.top màu áo · o.apron màu tạp dề · o.vest áo phản quang · o.pants · o.mask khẩu trang · o.pose: note (tay phải cầm sổ) | wash (rửa tay, hướng trái) | hold (hai tay cầm sổ) */
function tourMan(x, y, k, o) {
  var SK = '#F4CFA6', HR = '#3B2A20', h = '', TC = o.top || '#fff';
  function arm(d) { return aS(d, '#141413', 6.6) + aS(d, TC, 3.8); }
  h += aR(-7.5, -24, 6, 24, o.pants || '#4E5866', 1.4, 2) + aR(1.5, -24, 6, 24, o.pants || '#4E5866', 1.4, 2);
  h += aP('M-10 0q0-4 5-4h4v4zM10 0q0-4-5-4h-4v4z', '#2B2A27', 1.2);
  /* tay sau (trái) */
  h += aP('M-12 -24v-21q0-10 12-10t12 10v21z', o.top || '#fff', 1.5);
  if (o.apron) h += aP('M-8.5 -43h17v20h-17z', o.apron, 1.3) + aP('M-6 -43l-2.5-9M6 -43l2.5-9', 'none', 1.1);
  if (o.vest) h += aP('M-12 -24v-21q0-10 6-10l3 31zM12 -24v-21q0-10-6-10l-3 31z', '#F28C38', 1.3) + aS('M-11 -36h7M11 -36h-7', '#F6F1E4', 2.2);
  if (!o.apron && !o.vest) h += aDot(0, -44, 1) + aDot(0, -38, 1) + aDot(0, -32, 1);
  /* cổ, đầu */
  h += aR(-3, -59, 6, 5, SK, 1.2, 1) + aC(0, -66, 9.5, SK, 1.5);
  h += aP('M-9.5 -67q0-11.5 9.5-11.5t9.5 11.5q-3-5.5-9.5-5.5t-9.5 5.5z', HR, 1.3);
  h += aDot(-3.4, -66, 1.2) + aDot(3.4, -66, 1.2) + '<ellipse cx="-6.3" cy="-62.4" rx="2" ry="1.2" fill="#F2A08C" opacity=".6"/><ellipse cx="6.3" cy="-62.4" rx="2" ry="1.2" fill="#F2A08C" opacity=".6"/>';
  if (o.mask) h += aP('M-7 -63h14v5q-7 3.5-14 0z', '#fff', 1.2) + aP('M-7 -62l-3-2M7 -62l3-2', 'none', .9);
  else h += aP('M-2.8 -61.4q2.8 2.2 5.6 0', 'none', 1.2);
  if (o.hat === 'chef') h += aR(-8.5, -79, 17, 5, '#fff', 1.4, 1) + aP('M-8.5 -79q-7 0-7-6.5t7-5.5q1.5-6.5 8.5-6.5t8.5 6.5q7-1 7 5.5t-7 6.5z', '#fff', 1.4);
  if (o.hat === 'cap') h += aP('M-10 -68q0-12.5 10-12.5t10 12.5z', o.capc || A_CL, 1.4) + aP('M-10 -68h20', 'none', 1.4);
  if (o.hat === 'helmet') h += aP('M-11 -68q0-14 11-14t11 14z', '#F2C94C', 1.5) + aP('M-13.5 -68h27', 'none', 2.2) + aP('M0 -82v6', 'none', 1.2);
  /* tay trước */
  if (o.pose === 'note') h += arm('M-10 -48q-4 10-2 22') + aC(-12, -25, 2.6, SK, 1.2) + arm('M10 -48q5 8 7 14') + aR(12, -46, 13, 17, '#fff', 1.3, 1.5) + aP('M14.5 -41h8M14.5 -37h8M14.5 -33h5', 'none', .9) + aC(14, -33, 2.6, SK, 1.2);
  if (o.pose === 'hold') h += arm('M-10 -48q-3 8 2 12M10 -48q3 8-2 12') + aR(-7, -42, 14, 11, '#fff', 1.3, 1.5) + aP('M-4.5 -38h9M-4.5 -34.5h6', 'none', .9) + aC(-6, -35, 2.4, SK, 1.1) + aC(6, -35, 2.4, SK, 1.1);
  if (o.pose === 'wash') h += arm('M-8 -46q-11 0-19-4') + aC(-28, -50, 2.8, SK, 1.2) + aC(-25, -53, 2.6, SK, 1.2) + aK('M-30 -44q-1 2 0 3.5M-26 -43q-1 2 0 3.5', 1.2);
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')">' + h + '</g>';
}
function tourArt(k) {
  var Y = '#F2C94C', h = '';
  h += '<rect x="0" y="0" width="360" height="152" fill="#F7F1E6"/><rect x="0" y="152" width="360" height="68" fill="#ECE5D8"/>' + aP('M0 152h360', 'none', 1.4);
  /* bảng đầu ca (chung) */
  h += aR(262, 14, 78, 64, '#fff', 1.6, 3) + aP('M270 30h62M270 42h40M270 52h50M270 62h30', 'none', 1.1) + aT(301, 25, '朝礼', 9, '#B5532F', 'Noto Sans JP,sans-serif', 700) + aP('M276 78l-6 22M326 78l6 22', 'none', 1.5);
  if (k === 'dv') {
    /* tranh rửa tay + bồn rửa */
    h += aR(30, 26, 48, 62, '#fff', 1.6, 2) + aT(54, 38, '手洗い', 8, '#141413', 'Noto Sans JP,sans-serif', 700);
    for (var i = 0; i < 4; i++) { var cx = 41 + (i % 2) * 26, cy = 52 + Math.floor(i / 2) * 20; h += aC(cx, cy, 7, A_SK, 1.1) + aT(cx, cy + 3, String(i + 1), 7, '#141413'); }
    h += aP('M20 104h70v10q0 8-8 8H28q-8 0-8-8z', '#fff', 1.6) + aP('M52 104v-10q0-4 6-4h6', 'none', 1.6);
    /* kệ hộp có nhãn ngày */
    h += aP('M112 44h80M112 82h80', 'none', 1.6);
    [118, 142, 166].forEach(function (x, j) { h += aR(x, 22 + (j % 2) * 2, 20, 22 - (j % 2) * 2, A_LT, 1.3, 2) + aR(x + 3, 30, 14, 7, '#fff', .9) + aP('M' + (x + 5) + ' 33.5h10', 'none', .7); });
    [122, 152].forEach(function (x) { h += aR(x, 60, 24, 22, A_SG, 1.3, 2) + aR(x + 4, 66, 16, 7, '#fff', .9) + aP('M' + (x + 6) + ' 69.5h12', 'none', .7); });
    /* xe đẩy */
    h += aR(262, 120, 70, 8, '#fff', 1.5, 2) + aR(262, 150, 70, 8, '#fff', 1.5, 2) + aP('M266 128v40M328 128v40', 'none', 1.6) + aC(270, 176, 5, '#fff', 1.4) + aC(324, 176, 5, '#fff', 1.4);
    [268, 284, 300, 316].forEach(function (x, j) { h += aR(x, 110, 12, 10, [A_CL, A_YL, A_SG, A_SK][j], 1.1, 2) + aR(x, 140, 12, 10, [A_CL, A_YL, A_SG, A_SK][j], 1.1, 2); });
    h += tourMan(108, 172, 1.2, { hat: 'cap', top: '#fff', apron: A_SG, pants: '#6B7480', mask: 1, pose: 'wash' }); /* bạn mới rửa tay */
    h += tourMan(212, 176, 1.2, { hat: 'chef', top: '#fff', apron: A_KR, pants: '#4E5866', pose: 'note' }); /* Senpai bếp cầm sổ */
  } else {
    /* bảng dụng cụ có vẽ bóng: mỗi món có bóng vẽ sẵn, món còn thiếu chỉ còn bóng */
    var SH = '#E2D5BF';
    h += aR(26, 16, 78, 86, '#FFF6EA', 1.6, 2);
    h += '<path d="M32 23h22v9H46v32h-6V32h-8z" fill="' + SH + '"/>' + aP('M34 25h18v6h-6v31h-4V31h-8z', '#7E8C96', 1.3);
    h += '<path d="M60 22a7 7 0 1 1 10 0v42h-10z" fill="' + SH + '"/>' + aP('M62 24a5 5 0 1 1 6 0v38h-6z', '#9AA8B0', 1.3) + aP('M63 20h4', 'none', 1.2);
    h += '<path d="M80 22h14v18h-4v24h-6V40h-4z" fill="' + SH + '"/>' + aR(82, 24, 10, 14, '#C9573E', 1.3, 2) + aP('M87 38v24', 'none', 2);
    h += '<path d="M34 74h62v14H34z" fill="' + SH + '"/>' + '<path d="M36 76h58v10H36z" fill="none" stroke="#B5532F" stroke-width="1.2" stroke-dasharray="3 3"/>';
    /* máy + mẫu đạt / không đạt */
    h += aR(196, 72, 60, 80, '#E5ECEF', 1.6, 3) + aR(204, 82, 24, 16, '#fff', 1.2, 2) + aC(242, 90, 5, A_CL, 1.2) + aP('M204 112h44', 'none', 1.2) + aR(212, 118, 30, 22, A_SK, 1.2, 2);
    h += aR(226, 100, 30, 18, '#fff', 1.2, 2);
    h += aC(234, 109, 4, A_SG, 1) + aC(248, 109, 4, '#F4C7BC', 1) + aT(234, 124, 'OK', 6, '#2B8A86', 'Be Vietnam Pro,sans-serif', 700) + aT(248, 124, 'NG', 6, '#C9573E', 'Be Vietnam Pro,sans-serif', 700);
    /* senpai cầm sổ */
    h += tourMan(108, 188, 1.02, { hat: 'helmet', top: A_SK, vest: 1, pants: '#4E5866', pose: 'hold' }); /* bạn mới */
    h += tourMan(146, 178, 1.2, { hat: 'helmet', top: '#7E97A8', pants: '#3F4A57', pose: 'note' }); /* Senpai cầm sổ */
  }
  /* vạch vàng dưới sàn */
  h += '<path d="M0 182h360v6H0zM0 206h360v6H0z" fill="' + Y + '"/>';
  for (var x = 6; x < 360; x += 22) h += '<path d="M' + x + ' 182l6 6M' + x + ' 206l6 6" stroke="#141413" stroke-width="1" opacity=".35"/>';
  return '<svg class="tour__svg" viewBox="0 0 360 220" width="100%" aria-hidden="true">' + hand(h) + '</svg>';
}

/* ---------- PS1.3.52 (bản 4 · đợt 4): thuyền nâng cấp theo bến đã xong, nét mảnh. Thay shipSVG ở mọi nơi (shipSVG cũ giữ lại, không còn gọi). ---------- */
/* PS1.3.52 · thuyền nâng cấp theo bến (nét mảnh). P = {b1..b7, fin: 1}. */
function shipSVG2(P, sym, col, w, ghost) { /* ghost = 1: món chưa có vẽ mờ (Sổ Thuyền Trưởng) */
  P = P || {}; col = flagCol(col);
  function on(k) { return P[k] || ghost; }
  function g0(k) { return P[k] ? '' : '<g class="shg" opacity=".22">'; }
  function g1(k) { return P[k] ? '' : '</g>'; }
  var o = '#5A3A22', sw = 1.4, wood = '#DDA66C', wd = '#B98250', sail = '#FFF9EE', sl = '#E6D8BC', h = '';
  function sk(d, c, wd2, ex) { return '<path d="' + d + '" fill="none" stroke="' + (c || o) + '" stroke-width="' + (wd2 || sw) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex || '') + '/>'; }
  function fl(d, f, wd2) { return '<path d="' + d + '" fill="' + f + '" stroke="' + o + '" stroke-width="' + (wd2 || sw) + '" stroke-linejoin="round"/>'; }
  function man(x, y, shirt, band) { /* thủy thủ nhỏ, chân ở (x, y) */
    return '<g>' + sk('M' + (x - 1.6) + ' ' + y + 'l.6-5M' + (x + 1.6) + ' ' + y + 'l-.6-5', o, 1) +
      fl('M' + (x - 3.2) + ' ' + (y - 4.6) + 'q0-6 3.2-6.4q3.2 .4 3.2 6.4z', shirt, 1) +
      '<circle cx="' + x + '" cy="' + (y - 13.6) + '" r="3.1" fill="#F4CFA6" stroke="' + o + '" stroke-width="1"/>' +
      fl('M' + (x - 3.1) + ' ' + (y - 14.4) + 'q3.1-3.4 6.2 0z', band, .9) + sk('M' + (x + 3) + ' ' + (y - 14.6) + 'l2 1.4', band, 1.1) + '</g>';
  }
  /* biển */
  var mx = 82, mtop = P.b1 ? 4 : 10;
  /* dây buồm (sau buồm) */
  h += sk('M' + mx + ' ' + mtop + 'L18 60M' + mx + ' ' + mtop + 'L' + (P.b4 ? 157 : 148) + ' ' + (P.b4 ? 51 : 56), o, .6, ' opacity=".55"');
  /* cột phụ + buồm phụ (Bến 6) */
  if (on('b6')) {
    h += g0('b6');
    h += fl('M31.4 58V26h1.8v32z', wd, .9);
    h += fl('M20 30H44Q46 42 44 54H20Q22 42 20 30Z', sail);
    h += sk('M24 31q1 11.5 0 22M28 31q1 11.5 0 22M32.3 31q1 11.5 0 22M36.6 31q1 11.5 0 22M40.6 31q1 11.5 0 22', sl, .9);
    h += fl('M20 30H44Q46 42 44 54H20Q22 42 20 30Z', 'none');
    h += fl('M18 28.6h28v2.2H18z', wd, .9);
    h += g1('b6');
  }
  /* cột chính */
  h += fl('M' + (mx - 1.1) + ' 72V' + mtop + 'h2.2v' + (72 - mtop) + 'z', wd, 1);
  /* chòi canh + ống nhòm (Bến 1) */
  if (on('b1')) {
    h += g0('b1');
    h += fl('M74.5 9h15l-1.8 6.6H76.3z', wood, 1) + sk('M75.6 11.8h12.8M79.5 9.4v5.8M84.5 9.4v5.8', o, .6);
    h += fl('M88.4 8.8l9.6-4.2 1.1 2.4-9.6 4.2z', '#7E8C96', .9) + fl('M97.6 3.6l2.6-1.1 1.5 3.4-2.6 1.1z', '#5E6E78', .8) + '<circle cx="101.4" cy="4" r="1.1" fill="#BFD6E2"/>';
    h += g1('b1');
  }
  /* buồm chính */
  var sx0 = 58, sx1 = 106, sy0 = 18, sy1 = 66;
  h += fl('M' + sx0 + ' ' + sy0 + 'H' + sx1 + 'Q' + (sx1 + 4) + ' 42 ' + sx1 + ' ' + sy1 + 'H' + sx0 + 'Q' + (sx0 + 4) + ' 42 ' + sx0 + ' ' + sy0 + 'Z', sail);
  var st = ''; for (var i = 1; i < 8; i++) { var x = sx0 + i * 6; st += 'M' + x + ' ' + (sy0 + 1) + 'Q' + (x + 3.4) + ' 42 ' + x + ' ' + (sy1 - 1); }
  h += sk(st, sl, .9);
  if (on('fin')) h += g0('fin') + sk('M' + (sx0 + 2) + ' ' + (sy0 + 2) + 'H' + (sx1 - 2) + 'M' + (sx0 + 2) + ' ' + (sy1 - 2) + 'H' + (sx1 - 2), '#D9A84E', 1.6) + g1('fin');
  h += fl('M' + sx0 + ' ' + sy0 + 'H' + sx1 + 'Q' + (sx1 + 4) + ' 42 ' + sx1 + ' ' + sy1 + 'H' + sx0 + 'Q' + (sx0 + 4) + ' 42 ' + sx0 + ' ' + sy0 + 'Z', 'none');
  h += fl('M54 16.4h56v2.6H54z', wd, 1) + fl('M56 65h52v2.4H56z', wd, 1);
  h += '<circle cx="84" cy="41" r="10.5" fill="#fff" stroke="' + o + '" stroke-width="1"/><circle cx="84" cy="41" r="8.4" fill="none" stroke="' + col + '" stroke-width="1"/><g transform="translate(75.8 32.8) scale(.41)">' + flagSym(sym || 'compass', col) + '</g>';
  /* buồm mũi (Bến 4) */
  if (on('b4')) {
    h += g0('b4');
    h += sk('M140 58L158 50.5', o, 1.4);
    h += fl('M100 15Q118 38 154 51.6Q130 58 112 64Q108 40 100 15Z', sail);
    h += sk('M107 30Q115 46 133 55M104 22Q113 40 144 53', sl, .9);
    h += fl('M100 15Q118 38 154 51.6Q130 58 112 64Q108 40 100 15Z', 'none');
    h += g1('b4');
  }
  /* cờ đầu cột */
  if (P.fin) h += '<path d="M' + (mx + 1) + ' ' + (mtop + 1) + 'q10 1 16 4t18 2l-4 2 4 2q-12 2-18-1t-16-3z" fill="' + col + '" stroke="' + o + '" stroke-width=".9" stroke-linejoin="round"/>';
  else h += '<path d="M' + (mx + 1) + ' ' + (mtop + 1) + 'h11l-2.6 2.6 2.6 2.6H' + (mx + 1) + 'z" fill="' + col + '" stroke="' + o + '" stroke-width=".9" stroke-linejoin="round"/>';
  /* xuồng dự phòng (Bến 5): treo ở đuôi */
  if (on('b5')) {
    h += g0('b5');
    h += sk('M18 60Q10 54 6 60', o, 1.1) + sk('M7 60v8M13 59v8', o, .6);
    h += fl('M1 67.5h17q-1.4 5-4.6 5.6H5.4Q2 72.6 1 67.5z', '#C9D9C2', .9) + sk('M3 69.6h13', o, .5);
    h += g1('b5');
  }
  /* thân thuyền */
  var hull = 'M16 60Q19 79 33 90H122Q141 80 151 52Q148 51 145 53Q132 66 100 70Q60 74 40 68Q26 64 16 60Z';
  h += '<path d="' + hull + '" fill="' + wood + '"/>';
  h += '<path d="M24 80Q62 85 133 78Q129 86 122 90H33Q27 86 24 80Z" fill="' + wd + '"/>';
  h += sk('M19 69Q62 79 140 69M21.5 75Q64 83 137 74', '#A9733F', .8);
  h += sk('M17.6 64Q60 77 146 57', o, .8);
  /* họng pháo bên hông */
  var G = [[46, 73.4], [72, 73.7], [98, 71.9], [121, 69.1]];
  for (var g = 0; g < G.length; g++) {
    var gx = G[g][0], gy = G[g][1];
    h += '<rect x="' + (gx - 3.6) + '" y="' + (gy - 2.7) + '" width="7.2" height="5.4" rx="1" fill="#3B2414" stroke="' + o + '" stroke-width="1"/>';
    h += '<rect x="' + (gx - 4.6) + '" y="' + (gy - 3.7) + '" width="9.2" height="1.4" rx=".5" fill="' + wd + '" stroke="' + o + '" stroke-width=".6"/>';
    h += '<circle cx="' + gx + '" cy="' + (gy + .3) + '" r="2" fill="#4E5A62" stroke="#22292E" stroke-width=".8"/><circle cx="' + gx + '" cy="' + (gy + .3) + '" r=".9" fill="#14181B"/>';
  }
  h += '<path d="' + hull + '" fill="none" stroke="' + o + '" stroke-width="1.9" stroke-linejoin="round"/>';
  h += sk('M151 52l3-5', o, 1.6);
  /* phao cứu sinh (Bến 5) */
  if (on('b5')) h += g0('b5') + '<g><circle cx="62" cy="79" r="4.6" fill="#fff" stroke="' + o + '" stroke-width=".9"/><circle cx="62" cy="79" r="2.2" fill="' + wood + '" stroke="' + o + '" stroke-width=".8"/>' +
    sk('M58 77.2l2 .8M66 77.2l-2 .8M60.4 83.2l.8-1.8M63.6 83.2l-.8-1.8', '#E2574C', 1.6) + '</g>' + g1('b5');
  /* lầu đuôi */
  h += fl('M18 61.5V53.5h15v9.2', '#F2DDB2', 1) + fl('M16 54l9.5-5 9.5 5z', '#C9573E', 1) + '<rect x="21.5" y="56" width="4.6" height="3.4" rx=".6" fill="#9CC3D5" stroke="' + o + '" stroke-width=".7"/>';
  /* bánh lái (Bến 3) */
  if (on('b3')) {
    h += g0('b3');
    var wx = 39, wy = 58.4; h += sk('M' + wx + ' ' + (wy + 2) + 'v7', o, 1);
    h += '<circle cx="' + wx + '" cy="' + wy + '" r="4.4" fill="none" stroke="' + o + '" stroke-width="1.1"/><circle cx="' + wx + '" cy="' + wy + '" r="1.2" fill="' + wd + '" stroke="' + o + '" stroke-width=".7"/>';
    h += sk('M' + wx + ' ' + (wy - 6) + 'v12M' + (wx - 6) + ' ' + wy + 'h12M' + (wx - 4.2) + ' ' + (wy - 4.2) + 'l8.4 8.4M' + (wx + 4.2) + ' ' + (wy - 4.2) + 'l-8.4 8.4', o, .8);
    h += g1('b3');
  }
  /* rương hành trang (Bến 6) · rương báu (về đích) */
  if (on('b6')) h += g0('b6') + fl('M110 61h10v6.4h-10z', '#C08A55', .9) + sk('M110 63.6h10M115 61v6.4', o, .6) + g1('b6');
  if (on('fin')) h += g0('fin') + fl('M90 62.4h11v6h-11z', '#A0522D', .9) + fl('M90 62.4q5.5-4.6 11 0z', '#C26A3A', .9) + sk('M90 64.4h11', '#D9A84E', 1.2) + '<circle cx="95.5" cy="65.4" r=".9" fill="#D9A84E"/>' + sk('M93 58.6l.6-1.4M96 57.8v-1.6M99 58.6l-.6-1.4', '#D9A84E', .8) + g1('fin');
  /* thủy thủ */
  if (on('b2')) h += g0('b2') + man(126, 64.6, '#6E9E94', '#D97757') + g1('b2');
  if (on('b7')) h += g0('b7') + man(70, 69.4, '#5E7FA8', '#D9A84E') + g1('b7');
  /* đèn lồng mũi (Bến 7) */
  if (on('b7')) h += g0('b7') + '<circle cx="149" cy="60" r="6" fill="#FFD98A" opacity=".45"/>' + sk('M150.6 52.6V56', o, .7) + fl('M147.4 56.2h6.4l-.8 6.4h-4.8z', '#F4B44A', .9) + sk('M147.6 58.6h6', o, .5) + g1('b7');
  h += '<path d="M4 88q6-2.6 12 0t12 0 12 0 12 0 12 0 12 0 12 0 12 0 12 0 12 0 12 0 12 0Q158 88 155 96Q151 104 138 104H22Q9 104 5 96Q2 89 4 88Z" fill="#D7E7EE" opacity=".92"/>'; /* PS1.3.52: vệt nước bo tròn, không lộ khung */
  h += sk('M8 96q6-2.4 12 0t12 0M86 99q6-2.4 12 0t12 0M128 94q5-2 10 0', '#fff', 1.4);
  /* Shin ở lầu đuôi */
  h += '<g transform="translate(44 46.4) scale(.15)">' + (W_PSShin() ? W_PSShin().svg('still', { stg: 3, fit: 'none' }).replace(/^<svg[^>]*>|<\/svg>$/g, '') : '') + '</g>';
  return '<svg class="ship" viewBox="0 0 160 108" width="' + (w || 160) + '" aria-hidden="true">' + h + '</svg>';
}
/* vị trí món mới trên thuyền (toạ độ viewBox 160×120) để đặt lấp lánh */
var SHIP_AT = { b1: [92, 8], b2: [126, 52], b3: [39, 58], b4: [128, 42], b5: [10, 66], b6: [32, 40], b7: [149, 58], fin: [100, 22] };
function shipSpk(k) {
  var p = SHIP_AT[k] || [80, 40], x = p[0] / 1.6, y = p[1] / 1.08, o = [[0, 0, 0], [-9, 7, 1], [8, -6, 2]], h = '';
  o.forEach(function (d) { h += '<i class="shipup__sp shipup__sp--' + d[2] + '" style="left:' + (x + d[0]).toFixed(1) + '%;top:' + (y + d[1]).toFixed(1) + '%"></i>'; });
  return h;
}

/* =========================================================
   PS1.3.57 (góp ý 7): 15 hình biểu tượng kế hoạch A/B/C (vẽ mới, khung −24..24, nét sổ tay qua hand()).
   Mã → hàm. Danh sách, nhóm và tên ở PLAN_IC (content.js). Thêm hình: thêm hàm ở đây + 1 dòng PLAN_IC.
   ========================================================= */
var A_RED = '#E35D4F', A_SKIN = '#F4CFA6';
function aS(d, col, w) { return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
var PLAN_ART = {
  p_tool: function () { return aC(5, -5, 8, A_SG, 1.6) + aP('M5 -16v3M5 3v3M-6 -5h3M13 -5h3M-2.8 -12.8l2.1 2.1M10.7 .7l2.1 2.1M-2.8 2.8l2.1-2.1M10.7 -10.7l2.1-2.1', 'none', 2.2) + aC(5, -5, 3, '#fff', 1.4) +
      aP('M-16 16l10-10', 'none', 4.4) + aS('M-16 16l10-10', '#fff', 1.4) + aP('M-8 9a6.5 6.5 0 0 1-1-8.5l3.2 3.2 3-1-1-3-3.2-3.2a6.5 6.5 0 0 1 8.5 8.5z', A_CL, 1.5); },
  p_chef: function () { return aP('M-15 7h30q-2 11-15 11t-15-11z', A_YL, 1.6) + aK('M-6 5.5q-2-2 0-4M0 5.5q-2-2 0-4M6 5.5q-2-2 0-4', 1.3) +
      aP('M-9 -7q-7 0-7-6.5q0-6 7-5q1-6.5 9-6.5t9 6.5q7-1 7 5q0 6.5-7 6.5z', '#fff', 1.6) + aR(-9, -8, 18, 5, '#fff', 1.6, 1) + aP('M-4 -16q1-3 4-3', 'none', 1.1); },
  p_care: function () { return aP('M0 -2q-11-6.5-11-13.5q0-6 6-6q4 0 5 4q1-4 5-4q6 0 6 6q0 7-11 13.5z', A_CL, 1.6) +
      aP('M-19 5q0 12 19 12t19-12q-4-2.5-8.5 .5q-4 3-10.5 3t-10.5-3q-4.5-3-8.5-.5z', A_SKIN, 1.6) + aP('M-9 9q2 2 4 2M5 11q2 0 4-2', 'none', 1.1); },
  p_team: function () { return aC(-11, -1, 4, '#fff', 1.5) + aP('M-17 14q0-9 6-9t6 9z', A_SK, 1.5) + aC(11, -1, 4, '#fff', 1.5) + aP('M5 14q0-9 6-9t6 9z', A_SG, 1.5) +
      aC(0, -7, 4.6, '#fff', 1.6) + aP('M-7.5 14q0-15 7.5-15t7.5 15z', A_CL, 1.6) + aP('M0 -23.5l1.5 3 3.3.4-2.4 2.2.6 3.2L0 -16.2l-3 1.5.6-3.2-2.4-2.2 3.3-.4z', A_YL, 1.1); },
  p_desk: function () { return aR(-18, -16, 28, 19, A_SK, 1.6, 2) + aR(-15, -13, 22, 13, '#fff', 1.1, 1) + aK('M-12 -9h10M-12 -5.5h15M-12 -2h7', 1.2) +
      aP('M-7 3l-1.5 8h9l-1.5-8', '#fff', 1.4) + aP('M-20 11h40', 'none', 1.8) + aP('M12 3h7v6q0 2-2 2h-3q-2 0-2-2z', A_CL, 1.3) + aP('M19 4.5q3 0 3 2t-3 2', 'none', 1.2) + aK('M14.5 0q-1-2 0-4M17 0q-1-2 0-4', 1); },
  p_book: function () { return aR(-15, 6, 30, 8, A_SG, 1.6, 1.5) + aR(-13, -2, 27, 8, A_CL, 1.6, 1.5) + aR(-16, -10, 28, 8, A_YL, 1.6, 1.5) +
      aP('M-12 10h22M-9 2h18M-13 -6h4', 'none', 1) + aT(1, -3.6, 'N2', 6.5, '#141413', 'Be Vietnam Pro,sans-serif', 800) + aP('M7 -10v-9l2.5 2 2.5-2v9', '#fff', 1.2); },
  p_grad: function () { return aP('M-10 -3v8q10 6 20 0v-8', '#fff', 1.6) + aP('M-19 -8l19-8 19 8-19 8z', '#3A3936', 1.6) + aP('M15 -6v9', 'none', 1.3) + aC(15, 4.5, 1.8, A_CL, 1) +
      aR(-13, 9, 26, 8, '#fff', 1.5, 4) + aS('M-1 9v8', '#D97757', 2.6); },
  p_talk: function () { return aP('M-14 -19h18q4 0 4 4v8q0 4-4 4h-10l-6 5v-5h-2q-4 0-4-4v-8q0-4 4-4z', '#fff', 1.6) + aT(-5, -8.5, 'あ', 9.5, '#141413', 'Noto Sans JP,sans-serif', 700) +
      aP('M2 -1h14q4 0 4 4v7q0 4-4 4h-2v5l-6-5h-6q-4 0-4-4v-7q0-4 4-4z', A_SK, 1.6) + aT(9, 9, 'A', 8.5, '#141413', 'Be Vietnam Pro,sans-serif', 800) + aK('M-17 6q3 6 10 6M19 -14q-2-5-8-6', 1.2); },
  p_stair: function () { return aP('M-19 17h10v-8h10v-8h10v-8h8v24z', A_KR, 1.6) + aP('M-14 17v-4M-4 9v-4M6 1v-4', 'none', 1) +
      aP('M12 -23l2 4.2 4.6.5-3.4 3.1.9 4.5-4.1-2.3-4.1 2.3.9-4.5-3.4-3.1 4.6-.5z', A_YL, 1.2) + aC(-14, 5, 3, '#fff', 1.3) + aP('M-17 13q0-5 3-5t3 5', A_CL, 1.2); },
  p_seed: function () { return aR(-11, 3, 22, 4, A_CL, 1.6, 1) + aP('M-9 7h18l-2.5 11h-13z', A_CL, 1.6) + aP('M0 3v-13', 'none', 1.8) +
      aP('M0 -5q-11 1-12-8q10-1 12 8z', A_SG, 1.5) + aP('M0 -9q10 0 11-10q-10-1-11 10z', A_SG, 1.5) + aK('M-7 -9l4 2M6 -15l-3 3', 1); },
  p_jp: function () { return aC(13, -15, 5, A_RED, 1.3) + aR(-17, -5, 10, 21, A_SK, 1.5, 1) + aR(-6, -13, 12, 29, '#fff', 1.5, 1) + aR(8, -1, 9, 17, A_SG, 1.5, 1) +
      aP('M-3 -9h2M2 -9h2M-3 -4h2M2 -4h2M-3 1h2M2 1h2M-3 6h2M2 6h2M-14 0h4M-14 5h4M11 4h3M11 9h3', 'none', 1.4) + aP('M-20 16h40', 'none', 1.8); },
  p_vn: function () { return aP('M-18 0l12-11 12 11z', A_CL, 1.6) + aR(-15, 0, 18, 15, A_YL, 1.6) + aR(-9, 5, 6, 10, '#fff', 1.3) + aR(-1, 4, 3.5, 3.5, '#fff', 1) +
      aP('M14 15q-1-11 2-18', 'none', 1.8) + aS('M16 -3q-7-3-10 2M16 -3q7-4 9 2M16 -3q-2-6-7-7M16 -3q4-6 8-5', '#5E8C61', 1.8) + aP('M-20 15h40', 'none', 1.8); },
  p_work: function () { return aP('M-17 16v-17l7-7v7l7-7v7l7-7v7h13v17z', A_KR, 1.6) + aR(-12, 6, 6, 10, '#fff', 1.3) + aR(1, 5, 9, 6, A_SK, 1.2) +
      aP('M10 -7v-7h4v5', '#fff', 1.4) + aK('M12 -16q-2-3 1-5', 1.2) + aP('M-20 16h40', 'none', 1.8) + aP('M-3 -14v-9l6 2.5-6 2.5', A_CL, 1.2); },
  p_bridge: function () { return aP('M-20 5h7v12h-7z', A_SG, 1.4) + aP('M13 5h7v12h-7z', A_SK, 1.4) + aP('M-13 5q13-16 26 0', 'none', 2) + aP('M-13 5h26', 'none', 1.8) +
      aP('M-6.5 5v-5M0 5v-7M6.5 5v-5', 'none', 1.2) + aK('M-10 13q2.5-2 5 0t5 0 5 0 5 0', 1.3) + aT(-16.5, 1, 'VN', 5.5, '#141413', 'Be Vietnam Pro,sans-serif', 800) + aT(16.5, 1, 'JP', 5.5, '#141413', 'Be Vietnam Pro,sans-serif', 800); },
  p_home: function () { return aP('M-20 -1l20-16 20 16', 'none', 2.2) + aP('M-15 -5v21h30v-21', 'none', 1.2) +
      aC(-7, 0, 3.8, '#fff', 1.4) + aP('M-12.5 16q0-10 5.5-10t5.5 10z', A_CL, 1.4) + aC(7, 0, 3.8, '#fff', 1.4) + aP('M1.5 16q0-10 5.5-10t5.5 10z', A_SK, 1.4) +
      aC(0, 7, 2.8, '#fff', 1.3) + aP('M-4 16q0-6 4-6t4 6z', A_YL, 1.3); }
};
function planArt(k, w, bg) {
  var f = PLAN_ART[k]; if (!f) return '';
  return '<svg class="dsk plic" viewBox="-24 -24 48 48" width="' + (w || 48) + '" height="' + (w || 48) + '" aria-hidden="true">' + (bg ? '<rect x="-24" y="-24" width="48" height="48" rx="12" fill="' + bg + '"/>' : '') + '<g>' + hand(f()) + '</g></svg>';
}
