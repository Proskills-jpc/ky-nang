/* =========================================================
   PROSKILLS · ẢNH ĐẠI DIỆN (hub/avatar.js) · PS1.3.36
   - 12 hình vẽ tự làm (SVG phẳng, nền tròn màu nhạt) hoặc chữ cái + màu.
   - Lưu ở PS.prefs().av: 'i:<mã hình>' hoặc 'c:<số màu>' (mặc định chữ cái màu vàng như trước).
   - PSAvatar.html(size)    → ảnh đại diện (dùng ở thanh trên trang chủ)
   - PSAvatar.rowHTML()      → mục "Ảnh đại diện" trong Cài đặt trang chủ (opts.extra của PS.settingsHTML)
   - PSAvatar.wire(rootEl)   → gắn chạm chọn; đổi xong gọi PS.setPref('av', …) → sự kiện ps:change 'av'
   Thêm hình mới: thêm một dòng vào AV (giữ mã cũ, vì học viên đã chọn theo mã). ES5.
   ========================================================= */
(function (W) {
  'use strict';
  var K = '#2B2A33';
  function eyes(x1, x2, y, r) { return '<circle cx="' + x1 + '" cy="' + y + '" r="' + r + '" fill="' + K + '"/><circle cx="' + x2 + '" cy="' + y + '" r="' + r + '" fill="' + K + '"/><circle cx="' + (x1 + r * .35) + '" cy="' + (y - r * .4) + '" r="' + (r * .38) + '" fill="#fff"/><circle cx="' + (x2 + r * .35) + '" cy="' + (y - r * .4) + '" r="' + (r * .38) + '" fill="#fff"/>'; }
  function blush(x1, x2, y, c) { return '<ellipse cx="' + x1 + '" cy="' + y + '" rx="4.6" ry="2.8" fill="' + (c || '#FF8FA3') + '" opacity=".55"/><ellipse cx="' + x2 + '" cy="' + y + '" rx="4.6" ry="2.8" fill="' + (c || '#FF8FA3') + '" opacity=".55"/>'; }
  function smile(x, y, w) { return '<path d="M' + (x - w) + ' ' + y + 'q' + w + ' ' + (w * .9) + ' ' + (2 * w) + ' 0" stroke="' + K + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>'; }

  /* [mã, tên, màu nền, hình (hệ 96×96)] */
  var AV = [
    ['cao', 'Cáo', '#FFE4CF',
      '<path d="M22 30L30 62H66L74 30L58 42H38Z" fill="#EE8436"/>' +
      '<path d="M24 28l12 16-11 4z" fill="#EE8436"/><path d="M72 28L60 44l11 4z" fill="#EE8436"/>' +
      '<path d="M27 33l7 9-6 2z" fill="#5B3A2A" opacity=".55"/><path d="M69 33l-7 9 6 2z" fill="#5B3A2A" opacity=".55"/>' +
      '<path d="M22 50Q24 74 48 80Q72 74 74 50Q64 40 48 40Q32 40 22 50Z" fill="#F29646"/>' +
      '<path d="M28 58Q36 54 48 64Q60 54 68 58Q66 76 48 80Q30 76 28 58Z" fill="#FFF6EC"/>' +
      eyes(38, 58, 55, 3.6) + '<path d="M44.5 64h7l-3.5 3.6z" fill="' + K + '"/>' + smile(45, 69, 3) + blush(31, 65, 62)],
    ['gautruc', 'Gấu trúc', '#DDF2E6',
      '<circle cx="26" cy="32" r="10" fill="#33343D"/><circle cx="70" cy="32" r="10" fill="#33343D"/>' +
      '<ellipse cx="48" cy="54" rx="29" ry="26" fill="#fff"/>' +
      '<ellipse cx="36.5" cy="52" rx="7.5" ry="9.5" fill="#33343D" transform="rotate(28 36.5 52)"/><ellipse cx="59.5" cy="52" rx="7.5" ry="9.5" fill="#33343D" transform="rotate(-28 59.5 52)"/>' +
      '<circle cx="37.5" cy="51" r="3" fill="#fff"/><circle cx="58.5" cy="51" r="3" fill="#fff"/><circle cx="38" cy="51.5" r="1.6" fill="' + K + '"/><circle cx="58" cy="51.5" r="1.6" fill="' + K + '"/>' +
      '<ellipse cx="48" cy="63" rx="4.2" ry="3" fill="#33343D"/>' + smile(45, 68, 3) + blush(29, 67, 64) +
      '<path d="M66 20q6-6 10 0q-4 2-10 0z" fill="#58B47E"/><path d="M71 20l-2-6" stroke="#3E9463" stroke-width="2" stroke-linecap="round"/>'],
    ['cavoi', 'Cá voi', '#D7E8FF',
      '<path d="M48 18v10M42 22l6 6 6-6" stroke="#7FB6F2" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M16 58Q16 34 46 34Q74 34 76 54L86 44Q90 56 82 64Q76 76 50 76Q16 76 16 58Z" fill="#4D86D6"/>' +
      '<path d="M20 62Q30 72 52 72Q70 72 77 63Q66 66 48 66Q30 66 20 62Z" fill="#CFE3FF"/>' +
      eyes(32, 54, 52, 3.4) + smile(40, 58, 3.2) + blush(26, 62, 59, '#FF9FB6') +
      '<path d="M10 82q8-5 16 0t16 0t16 0t16 0t16 0" stroke="#9CC6F5" stroke-width="3" fill="none" stroke-linecap="round"/>'],
    ['cu', 'Cú', '#EDE3FF',
      '<path d="M24 30l10 10M72 30L62 40" stroke="#7A5440" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M22 46Q22 26 48 26Q74 26 74 46V66Q74 82 48 82Q22 82 22 66Z" fill="#9C6E52"/>' +
      '<ellipse cx="48" cy="70" rx="15" ry="11" fill="#E8CDB0"/>' +
      '<path d="M40 68l2.5 2.5 2.5-2.5M51 68l2.5 2.5 2.5-2.5M45.5 74l2.5 2.5 2.5-2.5" stroke="#B48A6A" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M22 56q-6 8 0 18M74 56q6 8 0 18" stroke="#7A5440" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<circle cx="37" cy="44" r="10" fill="#FFF7EA"/><circle cx="59" cy="44" r="10" fill="#FFF7EA"/>' + eyes(37, 59, 44, 4.6) +
      '<path d="M44.5 51h7l-3.5 5z" fill="#F2A33A"/>'],
    ['ech', 'Ếch', '#E6F6CC',
      '<circle cx="33" cy="34" r="11" fill="#5DB54A"/><circle cx="63" cy="34" r="11" fill="#5DB54A"/>' +
      '<ellipse cx="48" cy="58" rx="31" ry="22" fill="#6CC456"/>' +
      '<circle cx="33" cy="33" r="7" fill="#fff"/><circle cx="63" cy="33" r="7" fill="#fff"/>' + eyes(34, 64, 33.5, 3.6) +
      '<path d="M32 58q16 13 32 0" stroke="' + K + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M44 63q4 6 8 0z" fill="#F07C8E"/>' + blush(26, 70, 55, '#FF8B8B') +
      '<circle cx="44" cy="47" r="1.3" fill="#3E8E35"/><circle cx="52" cy="47" r="1.3" fill="#3E8E35"/>'],
    ['bachtuoc', 'Bạch tuộc', '#FFE1EA',
      '<path d="M26 60q-6 10-14 10M36 64q-4 12-12 16M48 66v16M60 64q4 12 12 16M70 60q6 10 14 10" stroke="#EE7A9B" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M20 52Q20 18 48 18Q76 18 76 52Q76 66 48 66Q20 66 20 52Z" fill="#F28AA8"/>' +
      '<ellipse cx="38" cy="28" rx="6" ry="3.5" fill="#fff" opacity=".45" transform="rotate(-25 38 28)"/>' +
      eyes(38, 58, 46, 3.6) + smile(45, 54, 3) + blush(30, 66, 53, '#E0506F') +
      '<circle cx="62" cy="30" r="2" fill="#FFC2D3"/><circle cx="68" cy="38" r="1.4" fill="#FFC2D3"/>'],
    ['phusi', 'Núi Phú Sĩ', '#D8ECFF',
      '<circle cx="68" cy="28" r="10" fill="#F26A5A"/>' +
      '<path d="M8 76L38 34Q48 30 58 34L88 76Z" fill="#5876B4"/>' +
      '<path d="M30 45L38 34Q48 30 58 34L66 45L60 50L54 45L48 51L42 45L36 50Z" fill="#fff"/>' +
      '<path d="M22 30q6-4 12 0M14 40q5-3 10 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>' +
      '<rect x="0" y="74" width="96" height="22" fill="#7BC27F"/><path d="M0 76q12-5 24 0t24 0t24 0t24 0" fill="#8ED092"/>'],
    ['tenlua', 'Tên lửa', '#2F3A6E',
      '<circle cx="20" cy="22" r="1.8" fill="#FFE59A"/><circle cx="76" cy="16" r="1.4" fill="#fff"/><circle cx="80" cy="60" r="1.8" fill="#FFE59A"/><circle cx="16" cy="66" r="1.3" fill="#fff"/>' +
      '<path d="M70 32l1.6 3.6 3.6 1.6-3.6 1.6-1.6 3.6-1.6-3.6-3.6-1.6 3.6-1.6z" fill="#FFE59A"/>' +
      '<g transform="rotate(35 48 48)"><path d="M40 70q8 18 16 0z" fill="#FFB547"/><path d="M43 70q5 11 10 0z" fill="#FFE59A"/>' +
      '<path d="M38 56L28 70H40ZM58 56L68 70H56Z" fill="#E8574A"/>' +
      '<path d="M48 14Q62 28 60 56L58 70H38L36 56Q34 28 48 14Z" fill="#F4F6FB"/>' +
      '<path d="M48 14Q55 20 58 30H38Q41 20 48 14Z" fill="#E8574A"/>' +
      '<circle cx="48" cy="44" r="7" fill="#7FC4F4" stroke="#C9D4E8" stroke-width="3"/><path d="M45 41a4 4 0 0 1 4-2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>'],
    ['xuongrong', 'Xương rồng', '#FFF0C8',
      '<path d="M30 52q-10 0-10-10v-6q0-4 4-4t4 4v6q0 2 2 2" fill="none" stroke="#4FA36B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M66 46q10 0 10-10v-4q0-4-4-4t-4 4v4q0 2-2 2" fill="none" stroke="#4FA36B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<rect x="32" y="22" width="32" height="46" rx="16" fill="#5BB176"/>' +
      '<path d="M40 30v4M56 30v4M48 26v4M38 60v3M58 60v3" stroke="#3E8656" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="48" cy="18" r="5" fill="#F27BA0"/><circle cx="48" cy="18" r="2" fill="#FFD6E2"/>' +
      eyes(42, 54, 44, 2.8) + smile(45.5, 50, 2.5) + blush(37, 59, 49) +
      '<path d="M28 66H68L64 86H32Z" fill="#D9774A"/><rect x="26" y="64" width="44" height="8" rx="3" fill="#E58A5C"/>'],
    ['comnam', 'Cơm nắm', '#FFE7DE',
      '<path d="M48 16Q56 16 72 46Q84 70 72 76Q48 84 24 76Q12 70 24 46Q40 16 48 16Z" fill="#fff"/>' +
      '<path d="M30 60H66V80Q48 84 30 80Z" fill="#2F3D38"/><path d="M34 64h4M58 64h4" stroke="#47584F" stroke-width="2" stroke-linecap="round"/>' +
      eyes(40, 56, 46, 3.2) + smile(45, 52, 3) + blush(33, 63, 52) +
      '<circle cx="36" cy="30" r="1.6" fill="#EDEDED"/><circle cx="60" cy="36" r="1.4" fill="#EDEDED"/>'],
    ['tainghe', 'Âm nhạc', '#E7E1FF',
      '<path d="M22 56V48Q22 22 48 22Q74 22 74 48V56" stroke="#6B5BD2" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<rect x="14" y="50" width="18" height="26" rx="8" fill="#7C6CE0"/><rect x="64" y="50" width="18" height="26" rx="8" fill="#7C6CE0"/>' +
      '<rect x="19" y="55" width="8" height="16" rx="4" fill="#B3A8F5"/><rect x="69" y="55" width="8" height="16" rx="4" fill="#B3A8F5"/>' +
      '<path d="M44 66V44l14-4v20" stroke="#F06C9B" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<ellipse cx="40.5" cy="66" rx="4.6" ry="3.6" fill="#F06C9B"/><ellipse cx="54.5" cy="60" rx="4.6" ry="3.6" fill="#F06C9B"/>'],
    ['bongda', 'Bóng đá', '#D5F2EC',
      '<path d="M14 40h12M10 50h14M16 60h10" stroke="#7CCAB8" stroke-width="3.4" stroke-linecap="round"/>' +
      '<defs><clipPath id="avball"><circle cx="54" cy="50" r="26"/></clipPath></defs><circle cx="54" cy="50" r="26" fill="#fff"/>' +
      '<g clip-path="url(#avball)" fill="#33343D"><path d="M54.0 41.5L62.1 47.4L59.0 56.9L49.0 56.9L45.9 47.4Z"/><path d="M54.0 34.5L45.9 28.6L49.0 19.1L59.0 19.1L62.1 28.6ZM68.7 45.2L71.8 35.7L81.8 35.7L84.9 45.2L76.8 51.1ZM63.1 62.5L73.1 62.5L76.2 72.0L68.1 77.9L60.0 72.0ZM44.9 62.5L48.0 72.0L39.9 77.9L31.8 72.0L34.9 62.5ZM39.3 45.2L31.2 51.1L23.1 45.2L26.2 35.7L36.2 35.7Z"/>' +
      '<path d="M54 41.5V34.5M62.1 47.4L68.7 45.2M59 56.9L63.1 62.5M49 56.9L44.9 62.5M45.9 47.4L39.3 45.2M62.1 28.6L71.8 35.7M76.8 51.1L73.1 62.5M60 72H48M34.9 62.5L31.2 51.1M36.2 35.7L45.9 28.6" stroke="#33343D" stroke-width="2"/></g>' +
      '<circle cx="54" cy="50" r="25" fill="none" stroke="#C9E4DE" stroke-width="2"/>']
  ];
  /* màu cho kiểu chữ cái: [nền, chữ] — màu đầu tiên giữ đúng màu cũ */
  var COLS = [['#FFE08F', '#6A4A00'], ['#CFE2FF', '#1F4FA8'], ['#CDEFD9', '#1D6B40'], ['#FFD6DF', '#A3264A'], ['#E4DBFF', '#5136B0'], ['#FFDCC2', '#9A4B12'], ['#CDEFF0', '#126C70'], ['#E5E7EC', '#3D4350']];
  var MAP = {}; AV.forEach(function (a) { MAP[a[0]] = a; });
  function esc(s) { return W.PS ? PS.esc(s) : String(s); }
  function cur() {
    var v = String((W.PS && PS.prefs().av) || 'c:0'), k = v.slice(2);
    if (v.charAt(0) === 'i' && MAP[k]) return { t: 'i', k: k };
    var n = +k; return { t: 'c', k: (n >= 0 && n < COLS.length) ? n : 0 };
  }
  function letter() {
    var p = (W.PS && PS.profile()) || {}, w = String(p.name || '').trim().split(/\s+/);
    return (w[w.length - 1] || '?').charAt(0).toUpperCase();
  }
  function iconSVG(k, sz) {
    var a = MAP[k]; if (!a) return '';
    return '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 96 96" aria-hidden="true"><defs><clipPath id="avc-' + k + '"><circle cx="48" cy="48" r="48"/></clipPath></defs>' +
      '<g clip-path="url(#avc-' + k + ')"><rect width="96" height="96" fill="' + a[2] + '"/>' + a[3] + '</g></svg>';
  }
  function html(sz) {
    var c = cur(); sz = sz || 40;
    if (c.t === 'i') return '<span class="ps-av ps-av--i" style="width:' + sz + 'px;height:' + sz + 'px">' + iconSVG(c.k, sz) + '</span>';
    var col = COLS[c.k];
    return '<span class="ps-av" style="width:' + sz + 'px;height:' + sz + 'px;background:' + col[0] + ';color:' + col[1] + ';font-size:' + Math.round(sz * .44) + 'px">' + esc(letter()) + '</span>';
  }
  function status() { var c = cur(); return c.t === 'i' ? esc(MAP[c.k][1]) : 'Chữ cái'; }
  function body() {
    var c = cur(), L = esc(letter());
    return '<p class="ps-small">Chọn một hình bạn thích, hoặc dùng chữ cái đầu tên với màu bạn chọn.</p>' +
      '<div class="avp" role="radiogroup" aria-label="Hình đại diện">' + AV.map(function (a) {
        var on = c.t === 'i' && c.k === a[0];
        return '<button type="button" class="avp__b' + (on ? ' on' : '') + '" data-av="i:' + a[0] + '" role="radio" aria-checked="' + on + '" aria-label="' + esc(a[1]) + '">' + iconSVG(a[0], 52) + '</button>';
      }).join('') + '</div>' +
      '<p class="avp__h">Chữ cái và màu</p><div class="avp avp--c" role="radiogroup" aria-label="Chữ cái và màu">' + COLS.map(function (col, i) {
        var on = c.t === 'c' && c.k === i;
        return '<button type="button" class="avp__b avp__l' + (on ? ' on' : '') + '" data-av="c:' + i + '" role="radio" aria-checked="' + on + '" aria-label="Chữ cái, màu ' + (i + 1) + '" style="background:' + col[0] + ';color:' + col[1] + '">' + L + '</button>';
      }).join('') + '</div>';
  }
  function rowHTML() { return { k: 'av', ic: 'smile', title: 'Ảnh đại diện', status: status(), body: body() }; }
  function wire(root) {
    if (!root || root.__avWired) return; root.__avWired = 1;
    root.addEventListener('click', function (e) {
      var b = PS.closest(e.target, '[data-av]'); if (!b || !root.contains(b)) return;
      PS.setPref('av', b.getAttribute('data-av'));
      var row = root.querySelector('.ps-srow[data-k="av"]');
      if (row) { row.querySelector('.ps-srow__b').innerHTML = body(); row.querySelector('.ps-srow__st').innerHTML = status(); }
      var top = document.querySelector('.hbar__av'); if (top) top.innerHTML = html(40);
      PS.toast('Đã đổi ảnh đại diện.');
    });
  }
  W.PSAvatar = { html: html, rowHTML: rowHTML, wire: wire, list: AV, icon: iconSVG, cur: cur, cols: COLS, letter: letter, map: MAP, body: body }; /* PS1.3.57: cur/cols/letter/map/body cho cờ CD02 */
})(window);
