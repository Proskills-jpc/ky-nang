/* =========================================================
   TC01 · tc01/yard.js · Sân trước phòng tập (TC01.0.8)
   Khối dụng cụ rơi theo trọng lực (Matter.js 0.19, tải riêng khi cuộn tới sân). ES5.
   Chạm khối: nảy lên + 1 mẹo (YARD_TIPS trong content.js). Vuốt khối: kéo ném. Chạm chỗ trống: cuộn trang bình thường.
   Dùng: TCYard.mount(phầnTử, {tips, onTap}) · TCYard.unmount()
   ========================================================= */
var TCYard = (function () {
  var cur = null;
  var F = 'font-family="Be Vietnam Pro,sans-serif" font-weight="800"';
  function T(x, y, s, c, t, ls) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + s + '" fill="' + c + '" ' + F + (ls ? ' letter-spacing="' + ls + '"' : '') + '>' + t + '</text>'; }
  function kitList(Bd, Body) {
    return [
    { id: 'dumb', w: 124, h: 42, mk: function (x, y, o) {
        var bar = Bd.rectangle(x, y, 80, 14, o), a = Bd.rectangle(x - 47, y, 24, 42, { chamfer: { radius: 6 } }), b = Bd.rectangle(x + 47, y, 24, 42, { chamfer: { radius: 6 } });
        return Body.create({ parts: [bar, a, b], restitution: .4, friction: .4 }); },
      svg: '<rect x="20" y="14" width="84" height="14" rx="4" fill="#9AA59E"/>' + T(62, 24.5, 8.5, '#fff', 'REPS 20×2', 1) +
        '<rect x="0" y="0" width="24" height="42" rx="7" fill="#2A714D"/><rect x="100" y="0" width="24" height="42" rx="7" fill="#2A714D"/><path d="M8 8v26M116 8v26" stroke="#4A9E73" stroke-width="3" stroke-linecap="round"/>' },
    { id: 'plate', r: 38, svg: '<circle cx="38" cy="38" r="37" fill="#1F563B"/><circle cx="38" cy="38" r="28" fill="none" stroke="#2A714D" stroke-width="4"/><circle cx="38" cy="38" r="8" fill="#F4F7F5"/>' + T(38, 22, 9, '#F3E7CB', '5 KG', 1) + T(38, 62, 7, '#CFE4D7', 'WARM UP', 1.2) },
    { id: 'kb', w: 64, h: 76, ch: 24, svg: '<path d="M18 28V18a14 14 0 0 1 28 0v10" fill="none" stroke="#3E3218" stroke-width="7" stroke-linecap="round"/><circle cx="32" cy="48" r="28" fill="#3E3218"/>' + T(32, 53, 10, '#E6D3A8', 'CORE', 1) },
    { id: 'bottle', w: 42, h: 96, ch: 12, svg: '<rect x="12" y="0" width="18" height="12" rx="3" fill="#2B8A86"/><rect x="1" y="10" width="40" height="85" rx="12" fill="#E1F1F0" stroke="#2B8A86" stroke-width="2"/><path d="M2 46h38v37a11 11 0 0 1-11 11H13A11 11 0 0 1 2 83z" fill="#A9D6D3"/>' + T(21, 34, 12, '#2B8A86', '2 L') + T(21, 74, 7, '#1E6B68', 'DRINK', 1) },
    { id: 'oni', w: 86, h: 76, mk: function (x, y, o) { return Bd.fromVertices(x, y, [[{ x: 0, y: -38 }, { x: 43, y: 36 }, { x: -43, y: 36 }]], { chamfer: { radius: [14, 14, 14] }, restitution: .35, friction: .5 }); },
      svg: '<path d="M43 4Q50 4 54 11L82 60Q86 74 72 75H14Q0 74 4 60L32 11Q36 4 43 4Z" fill="#FFFFFF" stroke="#D9D2C3" stroke-width="2"/><rect x="28" y="50" width="30" height="25" rx="3" fill="#1D2A23"/><circle cx="34" cy="30" r="2" fill="#E6D3A8"/><circle cx="52" cy="36" r="2" fill="#E6D3A8"/>' },
    { id: 'bento', w: 100, h: 62, ch: 12, svg: '<rect x="1" y="1" width="98" height="60" rx="12" fill="#F1E2C0" stroke="#B8964F" stroke-width="2"/><path d="M50 8v46M54 31h38" stroke="#B8964F" stroke-width="2"/><circle cx="20" cy="22" r="7" fill="#fff"/><circle cx="32" cy="38" r="7" fill="#fff"/><circle cx="18" cy="44" r="6" fill="#fff"/><rect x="58" y="12" width="30" height="13" rx="5" fill="#E8A87C"/><circle cx="66" cy="44" r="6" fill="#9CCAB1"/><circle cx="80" cy="44" r="6" fill="#9CCAB1"/>' },
    { id: 'helm', w: 104, h: 52, mk: function (x, y, o) {
        var v = [], i; for (i = 0; i <= 10; i++) { var a = Math.PI + i / 10 * Math.PI; v.push({ x: 52 * Math.cos(a), y: 48 * Math.sin(a) + 24 }); }
        return Bd.fromVertices(x, y, [v], { restitution: .35, friction: .4 }); },
      svg: '<path d="M8 46a44 42 0 0 1 88 0z" fill="#F1E2C0" stroke="#B8964F" stroke-width="2"/><path d="M52 4v42M36 8q-8 14-8 38M68 8q8 14 8 38" stroke="#CDB68A" stroke-width="2" fill="none"/><rect x="0" y="43" width="104" height="9" rx="4.5" fill="#B8964F"/><rect x="44" y="18" width="16" height="10" rx="2.5" fill="#348A5F"/>' },
    { id: 'watch', r: 34, svg: '<rect x="28" y="-8" width="12" height="9" rx="2" fill="#2A714D"/><circle cx="34" cy="34" r="33" fill="#fff" stroke="#348A5F" stroke-width="4"/><path d="M34 34l9-11" stroke="#1F563B" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="34" r="3" fill="#1F563B"/>' + T(34, 56, 10, '#2A714D', '02:00') },
    { id: 'mat', w: 128, h: 34, ch: 17, svg: '<rect x="0" y="0" width="128" height="34" rx="17" fill="#CFE4D7"/><circle cx="111" cy="17" r="16" fill="#E9F3ED" stroke="#9CCAB1" stroke-width="2"/><path d="M111 17m-9 0a9 9 0 1 0 9-9" fill="none" stroke="#9CCAB1" stroke-width="2"/>' + T(52, 21.5, 9.5, '#2A714D', 'STRETCH', 1.6) },
    { id: 'radio', w: 92, h: 62, ch: 12, svg: '<path d="M64 6L80 -10" stroke="#7A6235" stroke-width="3" stroke-linecap="round"/><rect x="1" y="4" width="90" height="57" rx="12" fill="#E6D3A8" stroke="#B8964F" stroke-width="2"/><circle cx="26" cy="32" r="14" fill="#FAF5EA" stroke="#B8964F" stroke-width="2"/><circle cx="26" cy="32" r="4" fill="#B8964F"/><path d="M50 22h30M50 30h30M50 38h22" stroke="#7A6235" stroke-width="3" stroke-linecap="round"/>' + T(46, 54, 7, '#3E3218', 'RADIO TAISO', 1) },
    { id: 'aid', w: 76, h: 60, ch: 10, svg: '<rect x="26" y="-6" width="24" height="10" rx="3" fill="none" stroke="#9AA59E" stroke-width="3"/><rect x="1" y="1" width="74" height="58" rx="10" fill="#fff" stroke="#B9C4BC" stroke-width="2"/><path d="M38 16v26M25 29h26" stroke="#348A5F" stroke-width="9" stroke-linecap="round"/>' },
    { id: 'shin', r: 32, svg: '' }
    ];
  }
  function mount(yard, o) {
    unmount(); o = o || {};
    var M = window.Matter; if (!M || !yard) return;
    var Eng = M.Engine, Bd = M.Bodies, Body = M.Body, Comp = M.Composite, Q = M.Query, Con = M.Constraint;
    var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var tip = yard.querySelector('.yard__tip'), hint = yard.querySelector('.yard__hint');
    var engine = Eng.create(), items = [], drag = null, run = false, Wd = yard.clientWidth, Ht = yard.clientHeight, raf = 0, tt = 0, io = null, dead = false;
    engine.gravity.y = 1;
    Comp.add(engine.world, [Bd.rectangle(Wd / 2, Ht + 30, Wd * 3, 60, { isStatic: true }), Bd.rectangle(-30, Ht / 2 - 400, 60, Ht + 1600, { isStatic: true }),
      Bd.rectangle(Wd + 30, Ht / 2 - 400, 60, Ht + 1600, { isStatic: true }), Bd.rectangle(Wd / 2, -1200, Wd * 3, 60, { isStatic: true })]);
    kitList(Bd, Body).forEach(function (k, i) {
      var x = 50 + Math.random() * (Wd - 100), y = -80 - i * 70, op = { restitution: .45, friction: .35, frictionAir: .012, density: .0018 }, b;
      if (k.mk) b = k.mk(x, y, op);
      else if (k.r) b = Bd.circle(x, y, k.r, op);
      else { op.chamfer = { radius: k.ch || 8 }; b = Bd.rectangle(x, y, k.w, k.h, op); }
      var bw = k.r ? k.r * 2 : k.w, bh = k.r ? k.r * 2 : k.h;
      var off = { x: (b.bounds.min.x + b.bounds.max.x) / 2 - b.position.x, y: (b.bounds.min.y + b.bounds.max.y) / 2 - b.position.y };
      Body.setAngle(b, (Math.random() - .5) * 1.2);
      var el = document.createElement('div'); el.className = 'blk';
      el.innerHTML = k.id === 'shin' ? shin('cheer', 78).replace('<svg class="shin"', '<svg class="shin" style="margin:-7px"') :
        '<svg width="' + bw + '" height="' + bh + '" viewBox="0 0 ' + bw + ' ' + bh + '" aria-hidden="true">' + k.svg + '</svg>';
      yard.appendChild(el); Comp.add(engine.world, b);
      items.push({ id: k.id, b: b, el: el, w: bw, h: bh, off: off });
    });
    function draw() {
      for (var i = 0; i < items.length; i++) {
        var it = items[i], b = it.b, a = b.angle, c = Math.cos(a), s = Math.sin(a);
        var x = b.position.x + it.off.x * c - it.off.y * s, y = b.position.y + it.off.x * s + it.off.y * c;
        it.el.style.transform = it.el.style.webkitTransform = 'translate(' + (x - it.w / 2).toFixed(1) + 'px,' + (y - it.h / 2).toFixed(1) + 'px) rotate(' + a.toFixed(3) + 'rad)';
      }
    }
    function loop() { if (!run || dead) return; Eng.update(engine, 1000 / 60); draw(); raf = requestAnimationFrame(loop); }
    function start() { if (run || dead) return; run = true; raf = requestAnimationFrame(loop); }
    function stop() { run = false; if (raf) cancelAnimationFrame(raf); }
    function pt(e) { var r = yard.getBoundingClientRect(), p = e.touches ? (e.touches[0] || e.changedTouches[0]) : e; return { x: p.clientX - r.left, y: p.clientY - r.top }; }
    function hit(p) {
      var h = Q.point(items.map(function (it) { return it.b; }), p); if (h.length) return h[0];
      for (var i = 0; i < items.length; i++) { var bb = items[i].b.bounds; if (p.x > bb.min.x - 6 && p.x < bb.max.x + 6 && p.y > bb.min.y - 6 && p.y < bb.max.y + 6) return items[i].b; }
      return null;
    }
    function down(e) {
      if (e.target && e.target.tagName === 'BUTTON') return;
      var p = pt(e), b = hit(p); if (!b) return;
      if (e.cancelable) e.preventDefault();
      var c = Con.create({ pointA: { x: p.x, y: p.y }, bodyB: b, pointB: { x: p.x - b.position.x, y: p.y - b.position.y }, stiffness: .18, damping: .08, length: 0 });
      Comp.add(engine.world, c); drag = { b: b, c: c, p0: p, t0: Date.now(), moved: false }; start();
    }
    function move(e) { if (!drag) return; if (e.cancelable) e.preventDefault(); var p = pt(e); drag.c.pointA = { x: p.x, y: p.y }; if (Math.abs(p.x - drag.p0.x) + Math.abs(p.y - drag.p0.y) > 10) drag.moved = true; }
    function up() { if (!drag) return; Comp.remove(engine.world, drag.c); if (!drag.moved && Date.now() - drag.t0 < 350) pop(drag.b); drag = null; }
    function pop(b) {
      Body.setVelocity(b, { x: (Math.random() - .5) * 6, y: -13 - Math.random() * 4 }); Body.setAngularVelocity(b, (Math.random() - .5) * .35);
      var id = ''; for (var i = 0; i < items.length; i++) if (items[i].b === b) id = items[i].id;
      if (tip && o.tips && o.tips[id]) { tip.innerHTML = o.tips[id]; tip.className = 'yard__tip on'; if (hint) hint.style.opacity = 0; clearTimeout(tt); tt = setTimeout(function () { tip.className = 'yard__tip'; }, 2600); }
      if (o.onTap) o.onTap(id);
    }
    function toss() { items.forEach(function (it) { Body.setVelocity(it.b, { x: (Math.random() - .5) * 8, y: -12 - Math.random() * 7 }); Body.setAngularVelocity(it.b, (Math.random() - .5) * .3); }); start(); if (o.onTap) o.onTap('toss'); }
    function reset() { items.forEach(function (it, i) { Body.setPosition(it.b, { x: 50 + Math.random() * (Wd - 100), y: -80 - i * 60 }); Body.setVelocity(it.b, { x: 0, y: 0 }); Body.setAngle(it.b, (Math.random() - .5) * 1.2); }); start(); }
    var opt = { passive: false };
    yard.addEventListener('touchstart', down, opt); yard.addEventListener('touchmove', move, opt);
    yard.addEventListener('touchend', up); yard.addEventListener('touchcancel', up);
    yard.addEventListener('mousedown', down); window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
    var bT = yard.querySelector('[data-y="toss"]'), bR = yard.querySelector('[data-y="reset"]');
    if (bT) bT.onclick = toss; if (bR) bR.onclick = reset;
    draw();
    if (RM) { for (var n = 0; n < 600; n++) Eng.update(engine, 1000 / 60); draw(); }
    if ('IntersectionObserver' in window) { io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) start(); else stop(); }, { threshold: .05 }); io.observe(yard); }
    else start();
    cur = function () {
      dead = true; stop(); clearTimeout(tt); if (io) io.disconnect();
      window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up);
      items.forEach(function (it) { if (it.el.parentNode) it.el.parentNode.removeChild(it.el); });
      M.Engine.clear(engine);
    };
  }
  function unmount() { if (cur) { var f = cur; cur = null; f(); } }
  return { mount: mount, unmount: unmount };
})();
