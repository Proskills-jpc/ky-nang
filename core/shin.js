/* =========================================================
   PROSKILLS · GÀ SHIN DÙNG CHUNG (core/shin.js) · PS1.3.36
   Shin là chú gà lớn dần như ở CD01: 0 Trứng → 1 Gà con → 2 Gà choai → 3 Gà lớn (nét vẽ theo cd01/art.js).
   - PSShin.svg(mood, o)   o = { stg: 0–3, fit: mã trang phục, cls: lớp thêm cho thẻ svg }
       Khung 120×124 (giống mèo Shin cũ để các chỗ đặt hình trong Shin Routine giữ nguyên);
       nhóm gốc <g class="bob">, mắt <g class="blink">, cánh vẫy <g class="wave">, đuôi <g class="tail">.
   - Biểu cảm: hi · still · cheer · think · curious · wow · worry · sleep · yawn · moved · comfort · proud ·
       focused · determined · waiting · pout · wink · welcome (+ tên cũ: party, touched, encourage, surprise, sad, miss).
   - Trang phục PSShin.FITS (mở dần theo giai đoạn). Học viên chọn ở Shin Routine › Sổ tay › Cài đặt › Tủ đồ của Shin.
   - Giai đoạn theo số ngày đã ghi nhận ở Shin Routine: PSShin.stageOf(ngày) (STAGE_DAYS).
   - PSShin.look() = { stg, fit, days } đọc từ PS.summary('routine') và PS.prefs().shinFit.
   ES5, không phụ thuộc thư viện. CD01 và TC01 vẫn dùng hình Shin riêng của khóa (cùng nét vẽ).
   ========================================================= */
(function (W) {
  'use strict';
  var K = '#2A2118';
  var STAGE_DAYS = [0, 3, 14, 30];            /* ngày ghi nhận để lên: Gà con 3 · Gà choai 14 · Gà lớn 30 */
  var STAGE_NAME = ['Trứng', 'Gà con', 'Gà choai', 'Gà lớn'];
  /* thông số từng giai đoạn (hệ 100×100 như CD01):
     e mắt [x1, x2, y, r] · b mỏ [x, y, cỡ] · c má [x1, x2, y] · top đỉnh đầu [x, y, nửa bề ngang đầu ở trán]
     n cổ [x, y, nửa bề ngang] · wl/wr gốc cánh trái/phải · f chân */
  var ST = [
    { bd: 34, e: [42, 58, 58, 4.2], b: [50, 66, .8], c: [35, 65, 67], top: [50, 28, 20], n: null, wl: null, wr: null },
    { bd: 38, e: [41, 59, 55, 4.4], b: [50, 62, 1], c: [34, 66, 63], top: [50, 32, 22], n: [50, 77, 19], wl: [27, 60], wr: [73, 60] },
    { bd: 39, e: [42, 58, 55, 4.3], b: [50, 62, 1], c: [35, 65, 63], top: [50, 35, 20], n: [50, 75, 17], wl: [29, 58], wr: [71, 58] },
    { bd: 30, e: [43, 57, 42, 3.8], b: [50, 48, .95], c: [37, 63, 49], top: [50, 27, 15], n: [50, 60, 14], wl: [33, 62], wr: [67, 62] }
  ];
  /* trang phục: [mã, tên, giai đoạn mở, mô tả ngắn] */
  var FITS = [
    ['coach', 'Khăn HLV', 0, 'Khăn xanh, huy hiệu vàng'],
    ['cap', 'Mũ JPC', 0, 'Mũ lưỡi trai của lớp'],
    ['none', 'Tự nhiên', 0, 'Không mặc gì thêm'],
    ['winter', 'Mùa đông Nhật', 1, 'Mũ len, khăn len đỏ'],
    ['bow', 'Nơ lịch sự', 1, 'Nơ đỏ cho ngày phỏng vấn'],
    ['sport', 'Thể thao', 2, 'Băng đô, còi như HLV TC01'],
    ['work', 'Đi làm', 2, 'Mũ bảo hộ, áo phản quang'],
    ['grad', 'Tốt nghiệp', 3, 'Mũ tốt nghiệp ở Ga Ước Mơ'],
    ['captain', 'Thuyền trưởng', 0, 'Mũ thuyền trưởng từ CD02', 'cd02'] /* PS1.3.38: mở khi nhận Bằng Thuyền Trưởng (CD02 › Cảng Khởi Hành) */
  ];
  var FITMAP = {}; FITS.forEach(function (f) { FITMAP[f[0]] = f; });
  /* trang phục có phần tử thứ 5 = mã khóa: chỉ mặc được khi khóa đó báo extra.fin (học xong). Khóa tự gọi svg(..., {fit}) thì luôn vẽ được. */
  function earned(f) { if (!f || !f[4]) return true; try { var x = (W.PS.summary(f[4]) || {}).extra || {}; return !!x.fin; } catch (e) { return false; } }
  var ALIAS = { party: 'cheer', touched: 'moved', encourage: 'wink', surprise: 'wow', sad: 'worry', miss: 'hi' };

  function P(n) { return Math.round(n * 10) / 10; }
  /* ---------- mắt ---------- */
  function eye(x, y, R, ox, oy, pr) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + R + '" fill="#fff" stroke="' + K + '" stroke-width="1.2"/>' +
      '<circle cx="' + P(x + ox) + '" cy="' + P(y + oy) + '" r="' + P(R * (pr || .6)) + '" fill="' + K + '"/>' +
      '<circle cx="' + P(x + ox - R * .22) + '" cy="' + P(y + oy - R * .25) + '" r="' + P(R * .22) + '" fill="#fff"/>';
  }
  function arcUp(x, y, r) { return 'M' + P(x - r) + ' ' + P(y + 1) + 'q' + r + ' ' + P(-r * 1.5) + ' ' + P(2 * r) + ' 0'; }
  function arcDn(x, y, r) { return 'M' + P(x - r) + ' ' + y + 'q' + r + ' ' + P(r * 1.2) + ' ' + P(2 * r) + ' 0'; }
  function line(d, w) { return '<path d="' + d + '" stroke="' + K + '" stroke-width="' + (w || 2.4) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function brows(x1, x2, y, r, kind) {
    var a = P(y - r - 2.6), L = P(x1 - r), R = P(x2 + r);
    if (kind === 'worry') return line('M' + L + ' ' + P(a + 1.6) + 'L' + P(x1 + r) + ' ' + P(a - 1.4) + 'M' + R + ' ' + P(a + 1.6) + 'L' + P(x2 - r) + ' ' + P(a - 1.4), 1.8);
    if (kind === 'angry') return line('M' + L + ' ' + P(a - 1.6) + 'L' + P(x1 + r) + ' ' + P(a + 1.2) + 'M' + R + ' ' + P(a - 1.6) + 'L' + P(x2 - r) + ' ' + P(a + 1.2), 2);
    if (kind === 'flat') return line('M' + L + ' ' + a + 'h' + P(2 * r) + 'M' + P(x2 - r) + ' ' + a + 'h' + P(2 * r), 2);
    if (kind === 'lift') return line('M' + L + ' ' + P(a - 2.4) + 'q' + r + ' -2.4 ' + P(2 * r) + ' 0', 1.8) + line('M' + P(x2 - r) + ' ' + a + 'h' + P(2 * r), 1.8);
    return '';
  }
  function eyes(m, s) {
    var x1 = s.e[0], x2 = s.e[1], y = s.e[2], r = s.e[3];
    switch (m) {
      case 'cheer': case 'welcome': return line(arcUp(x1, y, r) + arcUp(x2, y, r), 2.6);
      case 'wink': return line(arcUp(x1, y, r), 2.6) + '<g class="blink">' + eye(x2, y, r, 0, .3) + '</g>';
      case 'think': return '<g class="blink">' + eye(x1, y, r, 1.3, -1.5) + eye(x2, y, r, 1.3, -1.5) + '</g>';
      case 'curious': return '<g class="blink">' + eye(x1, y, r * 1.12, .8, -.4, .62) + eye(x2, y, r * 1.12, .8, -.4, .62) + '</g>' + brows(x1, x2, y, r, 'lift');
      case 'wow': return eye(x1, y, r * 1.3, 0, 0, .34) + eye(x2, y, r * 1.3, 0, 0, .34) + line('M' + P(x1 - r) + ' ' + P(y - r * 2.2) + 'q' + r + ' -3 ' + P(2 * r) + ' 0M' + P(x2 - r) + ' ' + P(y - r * 2.2) + 'q' + r + ' -3 ' + P(2 * r) + ' 0', 1.6);
      case 'worry': case 'waiting': return '<g class="blink">' + eye(x1, y, r, m === 'waiting' ? -1.4 : 0, 1.2) + eye(x2, y, r, m === 'waiting' ? -1.4 : 0, 1.2) + '</g>' + brows(x1, x2, y, r, 'worry');
      case 'sleep': return line(arcDn(x1, y, r) + arcDn(x2, y, r), 2.4);
      case 'yawn': return line('M' + P(x1 - r) + ' ' + P(y - 2) + 'l' + P(2 * r) + ' 2l' + P(-2 * r) + ' 2M' + P(x2 + r) + ' ' + P(y - 2) + 'l' + P(-2 * r) + ' 2l' + P(2 * r) + ' 2', 2.2);
      case 'moved': return eye(x1, y, r * 1.18, 0, .2, .66) + eye(x2, y, r * 1.18, 0, .2, .66) + '<circle cx="' + P(x1 - r * .3) + '" cy="' + P(y + r * .45) + '" r="' + P(r * .18) + '" fill="#fff"/><circle cx="' + P(x2 - r * .3) + '" cy="' + P(y + r * .45) + '" r="' + P(r * .18) + '" fill="#fff"/>' +
        '<path d="M' + P(x1 - r - 1) + ' ' + P(y + r + 1) + 'q2 4 0 6q-2-2 0-6z" fill="#7FC4FF"/>';
      case 'comfort': return '<g class="blink">' + eye(x1, y, r, 0, .5) + eye(x2, y, r, 0, .5) + '</g>' + brows(x1, x2, y, r, 'worry');
      case 'proud': return '<g class="blink">' + eye(x1, y, r * 1.05, 0, 0, .72) + eye(x2, y, r * 1.05, 0, 0, .72) + '</g>' +
        '<path d="M' + x1 + ' ' + P(y - r * .55) + 'l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="#fff"/><path d="M' + x2 + ' ' + P(y - r * .55) + 'l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="#fff"/>';
      case 'focused': return '<g class="blink">' + eye(x1, y, r, 0, 1.4) + eye(x2, y, r, 0, 1.4) + '</g>' + brows(x1, x2, y, r, 'flat');
      case 'determined': return '<g class="blink">' + eye(x1, y, r, 0, .3) + eye(x2, y, r, 0, .3) + '</g>' + brows(x1, x2, y, r, 'angry');
      case 'pout': return '<g class="blink">' + eye(x1, y, r, 1.3, .6) + eye(x2, y, r, 1.3, .6) + '</g>' + brows(x1, x2, y, r, 'angry');
      default: return '<g class="blink">' + eye(x1, y, r, 0, .4) + eye(x2, y, r, 0, .4) + '</g>';
    }
  }
  /* ---------- mỏ ---------- */
  function beak(m, s) {
    var x = s.b[0], y = s.b[1], k = s.b[2], t = 'translate(' + x + ' ' + y + ') scale(' + k + ')';
    var open = { cheer: 1, welcome: 1, wow: 1, moved: 1, determined: 1 }, g;
    if (m === 'yawn') g = '<path d="M-5.5-1h11l-5.5 3z" fill="#FF9F1C"/><ellipse cx="0" cy="5" rx="4.4" ry="4.6" fill="#B9473A"/><path d="M-4 9.2h8l-4 3z" fill="#E07B10"/>';
    else if (m === 'wow') g = '<path d="M-5.5-1h11l-5.5 3z" fill="#FF9F1C"/><ellipse cx="0" cy="4.2" rx="2.8" ry="3" fill="#B9473A"/><path d="M-3.6 6.6h7.2l-3.6 2.6z" fill="#E07B10"/>';
    else if (m === 'pout') g = '<path d="M-4-1h8l-4 4.5z" fill="#FF9F1C" stroke="#E07B10" stroke-width="1"/>';
    else if (open[m]) g = '<path d="M-5.5-1h11l-5.5 4z" fill="#FF9F1C"/><path d="M-4.4 4h8.8l-4.4 4z" fill="#E07B10"/><path d="M-3.4 3.3h6.8" stroke="#B9473A" stroke-width="1.4"/>';
    else g = '<path d="M-5.5-1h11l-5.5 6z" fill="#FF9F1C" stroke="#E07B10" stroke-width="1"/>';
    return '<g transform="' + t + '">' + g + '</g>';
  }
  function cheeks(m, s) {
    var o = m === 'pout' ? .95 : (m === 'moved' || m === 'cheer' || m === 'welcome' || m === 'proud' ? .7 : .5), rx = m === 'pout' ? 4.6 : 3.6;
    return '<ellipse cx="' + s.c[0] + '" cy="' + s.c[2] + '" rx="' + rx + '" ry="' + P(rx * .8) + '" fill="#FF9FB0" opacity="' + o + '"/><ellipse cx="' + s.c[1] + '" cy="' + s.c[2] + '" rx="' + rx + '" ry="' + P(rx * .8) + '" fill="#FF9FB0" opacity="' + o + '"/>';
  }
  /* ---------- cánh: góc xoay theo biểu cảm (độ; âm = giơ lên) ---------- */
  var WING = {
    hi: [0, -62, 'wave'], welcome: [-50, -50], cheer: [-58, -58], determined: [0, -78], think: [0, -96], curious: [0, -40],
    proud: [22, 22], comfort: [0, -34], moved: [-14, -14], focused: [0, -20], worry: [10, 10], waiting: [14, 0], pout: [20, 20], wink: [0, -30]
  };
  function wingPath(stg, side) {
    var d, col, ln;
    if (stg === 1) { col = '#FFC93C'; ln = '#E8B92E'; d = side < 0 ? '<ellipse cx="22" cy="64" rx="7" ry="12" fill="' + col + '" stroke="' + ln + '" stroke-width="1.5" transform="rotate(25 22 64)"/>' : '<ellipse cx="78" cy="64" rx="7" ry="12" fill="' + col + '" stroke="' + ln + '" stroke-width="1.5" transform="rotate(-25 78 64)"/>'; }
    else if (stg === 2) d = side < 0 ? '<path d="M28 56Q4 38 6 64Q14 70 30 68Z" fill="#E09A3A" stroke="#B87420" stroke-width="1.5"/><path d="M12 56l6 4M10 62l7 3" stroke="#B87420" stroke-width="1.3"/>' : '<path d="M72 56Q96 38 94 64Q86 70 70 68Z" fill="#E09A3A" stroke="#B87420" stroke-width="1.5"/><path d="M88 56l-6 4M90 62l-7 3" stroke="#B87420" stroke-width="1.3"/>';
    else d = side < 0 ? '<path d="M34 60Q8 40 8 68Q16 70 19 76Q25 69 34 73Z" fill="#7A4B2A" stroke="#4A2C17" stroke-width="1.5"/><path d="M14 62l8 5M13 69l8 2" stroke="#4A2C17" stroke-width="1.3"/>' : '<path d="M66 60Q92 40 92 68Q84 70 81 76Q75 69 66 73Z" fill="#7A4B2A" stroke="#4A2C17" stroke-width="1.5"/><path d="M86 62l-8 5M87 69l-8 2" stroke="#4A2C17" stroke-width="1.3"/>';
    return d;
  }
  function wing(m, s, stg, side) {
    var piv = side < 0 ? s.wl : s.wr; if (!piv) return '';
    var w = WING[m] || [0, 0], a = side < 0 ? -w[0] : w[1], cls = (side > 0 && w[2]) ? w[2] : '';
    var sc = stg === 3 ? ' translate(' + piv[0] + ' ' + piv[1] + ') scale(.82) translate(' + (-piv[0]) + ' ' + (-piv[1]) + ')' : '';
    var g = '<g transform="rotate(' + a + ' ' + piv[0] + ' ' + piv[1] + ')' + sc + '">' + wingPath(stg, side) + '</g>';
    return cls ? '<g class="' + cls + '">' + g + '</g>' : g;
  }
  /* ---------- thân từng giai đoạn ---------- */
  function body(stg, days) {
    if (stg === 0) {
      var cr = Math.max(0, Math.min(2, days || 0));
      return '<ellipse cx="50" cy="60" rx="28" ry="33" fill="#FFF4D6" stroke="#E3C98F" stroke-width="2.5"/><circle cx="36" cy="76" r="3" fill="#F3D9A0"/><circle cx="66" cy="72" r="2.4" fill="#F3D9A0"/><circle cx="60" cy="86" r="2" fill="#F3D9A0"/>' +
        (cr > 0 ? '<path d="M24 70l6 3 4-5 5 4" stroke="#C9A35E" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>' : '') +
        (cr > 1 ? '<path d="M62 82l5-4 4 4 5-5" stroke="#C9A35E" stroke-width="2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>' : '');
    }
    if (stg === 1) return '<circle cx="50" cy="60" r="29" fill="#FFD84D" stroke="#E8B92E" stroke-width="2"/><ellipse cx="50" cy="71" rx="17" ry="12" fill="#FFE98A"/>' +
      '<path d="M42 89l-3 5M42 89l0 5M42 89l3 5M58 89l-3 5M58 89l0 5M58 89l3 5" stroke="#FF9F1C" stroke-width="2.2" stroke-linecap="round"/>';
    if (stg === 2) return '<g class="tail"><path d="M70 74q14-2 18-14q-8 2-12 0q4 6-6 10z" fill="#D88A2E" stroke="#B87420" stroke-width="1.3" stroke-linejoin="round"/></g>' +
      '<ellipse cx="50" cy="62" rx="25" ry="28" fill="#F5B04C" stroke="#C8862A" stroke-width="2"/><ellipse cx="50" cy="73" rx="14" ry="12" fill="#FFE2A8"/>' +
      '<path d="M42 89l-3 6M42 89l3 6M58 89l-3 6M58 89l3 6" stroke="#F2A20F" stroke-width="2.4" stroke-linecap="round"/>';
    return '<g class="tail"><path d="M64 70Q78 46 90 44Q84 58 88 70Q80 64 72 78Z" fill="#2F6E5B" stroke="#1F4A3D" stroke-width="1.4" stroke-linejoin="round"/><path d="M66 74Q82 58 94 60Q86 70 90 80Q80 74 70 82Z" fill="#7A4B2A" stroke="#4A2C17" stroke-width="1.4" stroke-linejoin="round"/></g>' +
      '<ellipse cx="50" cy="70" rx="21" ry="23" fill="#8A5530" stroke="#4A2C17" stroke-width="2"/><path d="M38 66Q50 60 62 66Q60 86 50 88Q40 86 38 66Z" fill="#B57A45"/>' +
      '<path d="M44 92l-2 5M47 92l1 5M53 92l-1 5M56 92l2 5" stroke="#F2B21B" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle cx="50" cy="44" r="18" fill="#FFFFFF" stroke="#DADADA" stroke-width="2"/>';
  }
  function topBits(stg, hat) {
    if (stg === 1) return hat ? '' : '<path d="M48 32q2-6 5-1M52 32q3-5 5 0" stroke="#E8B92E" stroke-width="2" fill="none" stroke-linecap="round"/>';
    if (stg === 2) return hat ? '' : '<path d="M46 35q2-7 6-2M51 34q4-6 7-1" stroke="#C8862A" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (stg === 3) return (hat ? '' : '<path d="M41 30q-1-7 5-6q1-6 7-4q4-4 7 1q4 2 1 7z" fill="#E8574A" stroke="#C23B2F" stroke-width="1.2" stroke-linejoin="round"/>') +
      '<path d="M48 55q-2 6 2 8q4-2 2-8z" fill="#E8574A"/>';
    return '';
  }
  /* ---------- trang phục ---------- */
  function capAt(x, y, rot, sc) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + sc + ')"><path d="M-13 0L13 0L10-11Q0-15-10-11Z" fill="#1F3A8A"/><rect x="-13" y="-3.4" width="26" height="3.6" fill="#F2C230"/><ellipse cx="3" cy="1.6" rx="15" ry="3.2" fill="#13203B"/><circle cx="0" cy="-7.6" r="2.6" fill="#F2C230"/></g>'; }
  function band(s, col, dark, knot) {
    var x = s.top[0], y = s.bd, w = s.top[2] + 3;
    return '<path d="M' + (x - w) + ' ' + (y + 3) + 'Q' + x + ' ' + (y - 7) + ' ' + (x + w) + ' ' + (y + 3) + 'L' + (x + w - 1) + ' ' + (y + 8) + 'Q' + x + ' ' + (y - 2) + ' ' + (x - w + 1) + ' ' + (y + 8) + 'Z" fill="' + col + '"/>' +
      '<path d="M' + (x - w) + ' ' + (y + 3) + 'Q' + x + ' ' + (y - 7) + ' ' + (x + w) + ' ' + (y + 3) + '" stroke="' + dark + '" stroke-width="1" fill="none"/>' +
      (knot ? '<path d="M' + (x + w - 1) + ' ' + (y + 5) + 'l9 -5l-2 8zM' + (x + w - 1) + ' ' + (y + 6) + 'l7 6l-8 0z" fill="' + col + '"/>' : '');
  }
  function beanie(s) {
    var x = s.top[0], y = s.top[1], w = s.top[2] + 2;
    return '<path d="M' + (x - w) + ' ' + (y + 9) + 'Q' + (x - w) + ' ' + (y - 13) + ' ' + x + ' ' + (y - 13) + 'Q' + (x + w) + ' ' + (y - 13) + ' ' + (x + w) + ' ' + (y + 9) + 'Z" fill="#E8574A"/>' +
      '<path d="M' + (x - 8) + ' ' + (y - 9) + 'v15M' + x + ' ' + (y - 12) + 'v18M' + (x + 8) + ' ' + (y - 9) + 'v15" stroke="#C9443A" stroke-width="1.6" stroke-linecap="round"/>' +
      '<rect x="' + (x - w - 2) + '" y="' + (y + 5) + '" width="' + (2 * w + 4) + '" height="7" rx="3.5" fill="#F4F1EA" stroke="#D9D3C4" stroke-width="1"/>' +
      '<circle cx="' + x + '" cy="' + (y - 15) + '" r="5" fill="#F4F1EA" stroke="#D9D3C4" stroke-width="1"/>';
  }
  function helmet(s) {
    var x = s.top[0], y = s.top[1], w = s.top[2] + 4;
    return '<path d="M' + (x - w + 2) + ' ' + (y + 10) + 'Q' + (x - w + 2) + ' ' + (y - 13) + ' ' + x + ' ' + (y - 14) + 'Q' + (x + w - 2) + ' ' + (y - 13) + ' ' + (x + w - 2) + ' ' + (y + 10) + 'Z" fill="#F6C343" stroke="#C99A1F" stroke-width="1.5"/>' +
      '<path d="M' + x + ' ' + (y - 14) + 'v24" stroke="#E0AE2E" stroke-width="3"/><path d="M' + (x - w - 3) + ' ' + (y + 10) + 'h' + (2 * w + 6) + '" stroke="#C99A1F" stroke-width="4" stroke-linecap="round"/>' +
      '<rect x="' + (x - 5) + '" y="' + (y - 4) + '" width="10" height="6" rx="1.5" fill="#2265C5"/>';
  }
  function grad(s) {
    var x = s.top[0], y = s.top[1] + 2;
    return '<path d="M' + (x - 11) + ' ' + (y - 2) + 'v6q11 5 22 0v-6z" fill="#23304F"/><path d="M' + (x - 22) + ' ' + (y - 6) + 'L' + x + ' ' + (y - 14) + 'L' + (x + 22) + ' ' + (y - 6) + 'L' + x + ' ' + (y + 2) + 'Z" fill="#2E3D63" stroke="#1A243C" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<path d="M' + x + ' ' + (y - 6) + 'L' + (x + 17) + ' ' + (y - 2) + 'v10" stroke="#F2C230" stroke-width="1.6" fill="none"/><circle cx="' + (x + 17) + '" cy="' + (y + 10) + '" r="2.4" fill="#F2C230"/>';
  }
  function scarf(s, col, dark, stripe) {
    var x = s.n[0], y = s.n[1], w = s.n[2];
    return '<path d="M' + (x - w) + ' ' + (y - 4) + 'Q' + x + ' ' + (y + 4) + ' ' + (x + w) + ' ' + (y - 4) + 'L' + (x + w - 1) + ' ' + (y + 3) + 'Q' + x + ' ' + (y + 11) + ' ' + (x - w + 1) + ' ' + (y + 3) + 'Z" fill="' + col + '" stroke="' + dark + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M' + (x + w * .45) + ' ' + (y + 3) + 'l' + P(w * .35) + ' 13l-7 -1z" fill="' + col + '" stroke="' + dark + '" stroke-width="1.4" stroke-linejoin="round"/>' +
      (stripe ? '<path d="M' + (x - w * .5) + ' ' + (y + 1) + 'l2 5M' + x + ' ' + (y + 2) + 'l1 5M' + (x + w * .5) + ' ' + (y + 1) + 'l0 5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>' : '');
  }
  function medal(s) { return '<circle cx="' + s.n[0] + '" cy="' + (s.n[1] + 7) + '" r="3.6" fill="#F4B63B" stroke="' + K + '" stroke-width="1.3"/>'; }
  function bow(s) {
    var x = s.n[0], y = s.n[1] + 2;
    return '<path d="M' + x + ' ' + y + 'l-9-5v10zM' + x + ' ' + y + 'l9-5v10z" fill="#E8574A" stroke="#B5352B" stroke-width="1.3" stroke-linejoin="round"/><circle cx="' + x + '" cy="' + y + '" r="2.6" fill="#C23B2F"/>';
  }
  function whistle(s) {
    var x = s.n[0], y = s.n[1];
    return '<path d="M' + (x - s.n[2] + 4) + ' ' + (y - 4) + 'Q' + x + ' ' + (y + 8) + ' ' + (x + s.n[2] - 4) + ' ' + (y - 4) + '" stroke="#2A714D" stroke-width="1.8" fill="none"/><rect x="' + (x - 4) + '" y="' + (y + 3) + '" width="10" height="6" rx="3" fill="#C9D3E6" stroke="#7A86A3" stroke-width="1"/><circle cx="' + (x - 2) + '" cy="' + (y + 6) + '" r="1.3" fill="#7A86A3"/>';
  }
  function captainHat(s) { /* mũ thuyền trưởng: thân trắng, vành xanh đậm, lưỡi trai đen, huy hiệu mỏ neo */
    var x = s.top[0], y = s.top[1], w = s.top[2] + 5;
    return '<path d="M' + (x - w + 3) + ' ' + (y + 4) + 'Q' + (x - w - 2) + ' ' + (y - 12) + ' ' + x + ' ' + (y - 13) + 'Q' + (x + w + 2) + ' ' + (y - 12) + ' ' + (x + w - 3) + ' ' + (y + 4) + 'Z" fill="#FBFAF6" stroke="#2A2118" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<rect x="' + (x - w + 2) + '" y="' + (y + 1) + '" width="' + (2 * w - 4) + '" height="6" rx="2" fill="#174A63"/>' +
      '<path d="M' + (x - w + 4) + ' ' + (y + 7) + 'Q' + x + ' ' + (y + 14) + ' ' + (x + w - 4) + ' ' + (y + 7) + 'Z" fill="#1E2A33"/>' +
      '<g transform="translate(' + x + ' ' + (y - 5) + ')"><circle r="4.2" fill="#F2C230"/><path d="M0-2.6v5M-2 1.2q2 2.2 4 0M-1.4-1h2.8" stroke="#174A63" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>';
  }
  function vest(stg) {
    if (stg === 3) return '<path d="M33 64Q50 58 67 64L66 84Q50 92 34 84Z" fill="#FF9A3C" opacity=".95"/><path d="M34 74Q50 79 66 74" stroke="#F4F1EA" stroke-width="3" fill="none"/>';
    if (stg === 2) return '<path d="M30 70Q50 64 70 70L68 84Q50 92 32 84Z" fill="#FF9A3C" opacity=".95"/><path d="M31 78Q50 84 69 78" stroke="#F4F1EA" stroke-width="3" fill="none"/>';
    return '';
  }
  function hatOf(fit) { return { cap: 1, winter: 1, sport: 1, work: 1, grad: 1, captain: 1 }[fit] ? 1 : 0; }
  function outfitBack(fit, s, stg) { return fit === 'work' ? vest(stg) : ''; }
  function outfitNeck(fit, s) {
    if (!s.n) return '';
    if (fit === 'coach') return scarf(s, '#2A74DB', K) + medal(s);
    if (fit === 'winter') return scarf(s, '#E8574A', '#B5352B', 1);
    if (fit === 'bow') return bow(s);
    if (fit === 'sport') return whistle(s);
    if (fit === 'captain') return scarf(s, '#0F9F98', '#0B6F6A', 1);
    return '';
  }
  function outfitHead(fit, s, stg) {
    if (fit === 'cap' || (fit === 'coach' && stg === 0)) return capAt(s.top[0], s.top[1] + 2, -9, stg === 3 ? .8 : .9);
    if (fit === 'winter') return beanie(s);
    if (fit === 'sport') return band(s, '#E8574A', '#B5352B', 1);
    if (fit === 'work') return helmet(s);
    if (fit === 'grad') return grad(s);
    if (fit === 'captain') return captainHat(s);
    return '';
  }
  /* ---------- đồ vật kèm biểu cảm ---------- */
  function extra(m, stg) {
    var T = function (x, y, t, sz, c) { return '<text x="' + x + '" y="' + y + '" font-size="' + sz + '" font-weight="800" fill="' + c + '" font-family="Nunito,Be Vietnam Pro,sans-serif">' + t + '</text>'; };
    var spark = function (x, y, k, c) { return '<path d="M' + x + ' ' + (y - 6 * k) + 'l' + (1.6 * k) + ' ' + (4.4 * k) + ' ' + (4.4 * k) + ' ' + (1.6 * k) + '-' + (4.4 * k) + ' ' + (1.6 * k) + '-' + (1.6 * k) + ' ' + (4.4 * k) + '-' + (1.6 * k) + '-' + (4.4 * k) + '-' + (4.4 * k) + '-' + (1.6 * k) + ' ' + (4.4 * k) + '-' + (1.6 * k) + 'z" fill="' + c + '"/>'; };
    var heart = function (x, y, k, c) { return '<path d="M' + x + ' ' + (y + 5 * k) + 'l-5-5c-3-3.6 2-7.6 5-3.4 3-4.2 8-.2 5 3.4z" transform="translate(' + P(x - x * k) + ' ' + P(y - y * k) + ') scale(' + k + ')" fill="' + c + '"/>'; };
    switch (m) {
      case 'hi': return '<path d="M88 16l4-6M92 24l7-2M84 10V4" stroke="#F2B21B" stroke-width="2.5" stroke-linecap="round"/>';
      case 'cheer': case 'welcome': return spark(12, 20, 1.1, '#F2B21B') + spark(90, 14, .9, '#F2B21B') + '<rect x="6" y="36" width="4" height="8" rx="1.5" fill="#E0567F" transform="rotate(-20 8 40)"/><circle cx="94" cy="34" r="2.6" fill="#22A05E"/>';
      case 'think': return T(84, 18, '?', 20, '#1D5FD1');
      case 'curious': return '<g transform="translate(' + (stg === 3 ? 82 : 86) + ' ' + (stg === 3 ? 50 : 62) + ')"><circle r="8" fill="#DDF1FA" fill-opacity=".8" stroke="#5A4A3A" stroke-width="2.6"/><path d="M-5.6 5.6l-6 6.4" stroke="#5A4A3A" stroke-width="3.4" stroke-linecap="round"/></g>';
      case 'wow': return T(84, 22, '!', 24, '#E0453A') + '<path d="M14 18l-5-5M12 28l-7-1" stroke="#E0453A" stroke-width="2.4" stroke-linecap="round"/>';
      case 'worry': return '<path d="M84 22q4 7 0 10q-4-3 0-10z" fill="#8FD0E8" stroke="#4A9BBE" stroke-width="1.2"/>';
      case 'waiting': return '<g transform="translate(88 16)"><circle r="8" fill="#fff" stroke="#7A86A3" stroke-width="2"/><path d="M0-4.5V0l3 2" stroke="#2A2118" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>';
      case 'sleep': return T(80, 22, 'z', 15, '#2A74DB') + T(90, 12, 'z', 11, '#2A74DB');
      case 'yawn': return T(84, 20, 'z', 15, '#2A74DB') + '<path d="M30 48q-2 3.4 0 5.4q2-2 0-5.4z" fill="#8FD0E8"/>';
      case 'moved': return heart(88, 16, 1, '#E0567F') + heart(12, 26, .7, '#FF9CBA');
      case 'comfort': return heart(90, 40, .8, '#F29A9A');
      case 'proud': return spark(12, 20, 1, '#F2B21B') + spark(90, 16, .8, '#F2B21B');
      case 'focused': return '<g transform="translate(50 ' + (stg === 3 ? 82 : 84) + ')"><path d="M-14-6h28v14h-28z" fill="#D9E5F7" stroke="#2A2118" stroke-width="1.6"/><path d="M0-6v14M-10-2h7M3-2h7M-10 2h7M3 2h7" stroke="#7A93BF" stroke-width="1.2"/></g>';
      case 'determined': return '<path d="M86 12l-4 8h5l-3 8" stroke="#F2B21B" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      case 'pout': return '<path d="M82 12l4 4M90 10l-2 6M94 18l-6 1" stroke="#E0453A" stroke-width="2.4" stroke-linecap="round"/>';
      case 'wink': return spark(88, 18, .9, '#22A05E') + spark(12, 24, .6, '#F2B21B');
    }
    return '';
  }

  /* ---------- vẽ ---------- */
  function svg(mood, o) {
    o = o || {}; var m = ALIAS[mood] || mood || 'hi';
    var stg = Math.max(0, Math.min(3, +o.stg || 0)), s = ST[stg], fit = FITMAP[o.fit] ? o.fit : 'coach';
    if (FITMAP[fit][2] > stg) fit = 'coach';
    var hat = hatOf(fit) || (fit === 'coach' && stg === 0);
    var inner = wing(m, s, stg, -1) + wing(m, s, stg, 1) + body(stg, o.days) + outfitBack(fit, s, stg) + outfitNeck(fit, s) +
      topBits(stg, hat) + eyes(m, s) + cheeks(m, s) + beak(m, s) + outfitHead(fit, s, stg) + extra(m, stg);
    return '<svg class="psshin st' + stg + (o.cls ? ' ' + o.cls : '') + '" viewBox="0 0 120 124" aria-hidden="true"><g' + (m === 'still' ? '' : ' class="bob"') + '><g transform="translate(-1 3) scale(1.18)">' + inner + '</g></g></svg>';
  }
  function stageOf(days) { days = +days || 0; var g = 0; for (var i = 1; i < STAGE_DAYS.length; i++) if (days >= STAGE_DAYS[i]) g = i; return g; }
  function look() {
    var PS = W.PS, days = 0, fit = 'coach';
    try { var x = (PS.summary('routine') || {}).extra || {}; days = +x.recDays || 0; fit = PS.prefs().shinFit || 'coach'; } catch (e) {}
    if (W.DEMO) days = 40; /* demo giáo viên ở Shin Routine: Shin đã lớn, trang phục chỉ thử tạm */
    if (W.PS_SHIN_FIT_TMP) fit = W.PS_SHIN_FIT_TMP;
    var stg = stageOf(days);
    if (!FITMAP[fit] || FITMAP[fit][2] > stg || (!W.DEMO && !earned(FITMAP[fit]))) fit = 'coach';
    return { stg: stg, fit: fit, days: days };
  }
  W.PSShin = { svg: svg, look: look, stageOf: stageOf, earned: earned, FITS: FITS, STAGE_DAYS: STAGE_DAYS, STAGE_NAME: STAGE_NAME,
    now: function (mood, cls) { var l = look(); return svg(mood, { stg: l.stg, fit: l.fit, days: l.days, cls: cls }); } };
})(window);
