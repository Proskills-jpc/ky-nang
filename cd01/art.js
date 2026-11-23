/* CD01 · cd01/art.js · HÌNH: Shin (giữ nguyên nét vẽ từ Career Design CD49, 4 giai đoạn lớn dần theo số ga đã qua) + biểu tượng ga.
   ES5, biến toàn cục. shinCracks() do engine.js định nghĩa (số vết nứt trên vỏ trứng ở Sân ga/Ga 1). */
function shinEyes(m,x1,x2,y,r){
  var K="#2A2118";
  function arc(x){ return 'M'+(x-r)+' '+(y+1)+'q'+r+' '+(-r*1.5)+' '+(2*r)+' 0'; }
  function eye(x,R,ox,oy,pr){ return '<circle cx="'+x+'" cy="'+y+'" r="'+R+'" fill="#fff" stroke="'+K+'" stroke-width="1.2"/><circle cx="'+(x+ox)+'" cy="'+(y+oy)+'" r="'+(R*(pr||.6))+'" fill="'+K+'"/><circle cx="'+(x+ox-R*.22)+'" cy="'+(y+oy-R*.25)+'" r="'+(R*.22)+'" fill="#fff"/>'; }
  if(m==="cheer"||m==="party"||m==="touched") return '<path d="'+arc(x1)+arc(x2)+'" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>'+(m==="touched"?'<path d="M'+(x2+r+1)+' '+(y+3)+'q2 4 0 6q-2-2 0-6z" fill="#7FC4FF"/><path d="M'+(x1-r-1)+' '+(y+3)+'q2 4 0 6q-2-2 0-6z" fill="#7FC4FF"/>':'');
  if(m==="encourage") return '<path d="'+arc(x1)+'" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>'+eye(x2,r,0,.3);
  if(m==="surprise") return eye(x1,r*1.3,0,0,.34)+eye(x2,r*1.3,0,0,.34)+'<path d="M'+(x1-r)+' '+(y-r*2)+'q'+r+' -3 '+(2*r)+' 0M'+(x2-r)+' '+(y-r*2)+'q'+r+' -3 '+(2*r)+' 0" stroke="'+K+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  if(m==="sad") return eye(x1,r,0,1.4)+eye(x2,r,0,1.4)+'<path d="M'+(x1-r)+' '+(y-r-1)+'l'+(2*r)+' -2.5M'+(x2+r)+' '+(y-r-1)+'l'+(-2*r)+' -2.5" stroke="'+K+'" stroke-width="1.8" stroke-linecap="round"/><path d="M'+(x2+2)+' '+(y+r+2)+'q2.4 4.5 0 7q-2.4-2.5 0-7z" fill="#7FC4FF"/>';
  if(m==="pout") return eye(x1,r,1.3,.3)+eye(x2,r,1.3,.3)+'<path d="M'+(x1-r)+' '+(y-r-3)+'l'+(2*r)+' 2.6M'+(x2+r)+' '+(y-r-3)+'l'+(-2*r)+' 2.6" stroke="'+K+'" stroke-width="2" stroke-linecap="round"/>';
  var R=m==="miss"?r*1.18:r, ox=m==="think"?1.2:0, oy=m==="think"?-1.4:.4;
  return eye(x1,R,ox,oy)+eye(x2,R,ox,oy);
}
function shinCap(x,y,rot,sc){ return '<g transform="translate('+x+' '+y+') rotate('+rot+') scale('+(sc||1)+')"><path d="M-13 0L13 0L10-11Q0-15-10-11Z" fill="#1F3A8A"/><rect x="-13" y="-3.4" width="26" height="3.6" fill="#F2C230"/><ellipse cx="3" cy="1.6" rx="15" ry="3.2" fill="#13203B"/><circle cx="0" cy="-7.6" r="2.6" fill="#F2C230"/></g>'; }
function shin(mood,sz,stg,anim){
  sz=sz||64; mood=mood||"hi"; stg=stg||0; var b="", ex="";
  var beakOpen = mood==="cheer"||mood==="party"||mood==="surprise"||mood==="encourage";
  if(stg===0){
    var cr=shinCracks();
    b='<ellipse cx="50" cy="60" rx="28" ry="33" fill="#FFF4D6" stroke="#E3C98F" stroke-width="2.5"/><circle cx="36" cy="74" r="3" fill="#F3D9A0"/><circle cx="64" cy="70" r="2.4" fill="#F3D9A0"/><circle cx="60" cy="84" r="2" fill="#F3D9A0"/>'+
      (cr>0?'<path d="M30 46l6 4 5-5 6 5" stroke="#C9A35E" stroke-width="2" fill="none" stroke-linejoin="round"/>':'')+(cr>1?'<path d="M56 44l5 5 5-3 5 5" stroke="#C9A35E" stroke-width="2" fill="none" stroke-linejoin="round"/>':'')+(cr>2?'<path d="M38 88l4-5 5 4 4-5" stroke="#C9A35E" stroke-width="2" fill="none"/>':'')+
      shinEyes(mood,42,58,58,4.2)+'<circle cx="35" cy="66" r="3.4" fill="#F7A1B5" opacity=".6"/><circle cx="65" cy="66" r="3.4" fill="#F7A1B5" opacity=".6"/>'+
      (beakOpen?'<path d="M46 66q4 5 8 0z" fill="#FF9F1C"/>':'<path d="M47 66q3 2 6 0" stroke="#2A2118" stroke-width="1.8" fill="none" stroke-linecap="round"/>')+shinCap(50,29,-10,.9);
  } else if(stg===1){
    b='<g class="sw sw-l"><ellipse cx="22" cy="64" rx="7" ry="12" fill="#FFC93C" stroke="#E8B92E" stroke-width="1.5" transform="rotate(25 22 64)"/></g><g class="sw sw-r"><ellipse cx="78" cy="64" rx="7" ry="12" fill="#FFC93C" stroke="#E8B92E" stroke-width="1.5" transform="rotate(-25 78 64)"/></g>'+
      '<circle cx="50" cy="60" r="29" fill="#FFD84D" stroke="#E8B92E" stroke-width="2"/><ellipse cx="50" cy="70" rx="17" ry="13" fill="#FFE98A"/>'+
      '<path d="M42 89l-3 5M42 89l0 5M42 89l3 5M58 89l-3 5M58 89l0 5M58 89l3 5" stroke="#FF9F1C" stroke-width="2.2" stroke-linecap="round"/>'+
      shinEyes(mood,41,59,55,4.4)+'<circle cx="34" cy="63" r="3.6" fill="#FF9FB0" opacity=".6"/><circle cx="66" cy="63" r="3.6" fill="#FF9FB0" opacity=".6"/>'+
      (beakOpen?'<path d="M45 61h10l-5 4z" fill="#FF9F1C"/><path d="M46 66h8l-4 4z" fill="#F07F1E"/>':'<path d="M45 62h10l-5 6z" fill="#FF9F1C" stroke="#E07B10" stroke-width="1"/>')+
      '<path d="M48 31q2-6 5-1M52 31q3-5 5 0" stroke="#E8B92E" stroke-width="2" fill="none" stroke-linecap="round"/>'+shinCap(50,34,-9,.85);
  } else if(stg===2){
    b='<g class="sw sw-l"><path d="M28 56Q4 38 6 64Q14 70 30 68Z" fill="#E09A3A" stroke="#B87420" stroke-width="1.5"/><path d="M12 56l6 4M10 62l7 3" stroke="#B87420" stroke-width="1.3"/></g><g class="sw sw-r"><path d="M72 56Q96 38 94 64Q86 70 70 68Z" fill="#E09A3A" stroke="#B87420" stroke-width="1.5"/><path d="M88 56l-6 4M90 62l-7 3" stroke="#B87420" stroke-width="1.3"/></g>'+
      '<ellipse cx="50" cy="62" rx="25" ry="28" fill="#F5B04C" stroke="#C8862A" stroke-width="2"/><ellipse cx="50" cy="72" rx="14" ry="13" fill="#FFE2A8"/>'+
      '<path d="M42 89l-3 6M42 89l3 6M58 89l-3 6M58 89l3 6" stroke="#F2A20F" stroke-width="2.4" stroke-linecap="round"/>'+
      shinEyes(mood,42,58,55,4.3)+'<circle cx="35" cy="63" r="3.4" fill="#FF9FB0" opacity=".55"/><circle cx="65" cy="63" r="3.4" fill="#FF9FB0" opacity=".55"/>'+
      (beakOpen?'<path d="M45 61h11l-4 4z" fill="#F2A20F"/><path d="M46 66h8l-3 3z" fill="#D9850A"/>':'<path d="M45 61h11q-1 5-6 7z" fill="#F2A20F" stroke="#C47A0A" stroke-width="1"/>')+
      '<path d="M46 34q2-7 6-2M51 33q4-6 7-1" stroke="#C8862A" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+shinCap(50,36,-8,.85);
  } else {
    b='<g class="sw sw-l"><path d="M32 60Q4 30 2 66Q12 66 16 74Q22 66 32 72Z" fill="#5A361F" stroke="#3E2414" stroke-width="1.5"/><path d="M8 58l8 6M6 66l9 3M12 72l7-2" stroke="#3E2414" stroke-width="1.3"/></g><g class="sw sw-r"><path d="M68 60Q96 30 98 66Q88 66 84 74Q78 66 68 72Z" fill="#5A361F" stroke="#3E2414" stroke-width="1.5"/><path d="M92 58l-8 6M94 66l-9 3M88 72l-7-2" stroke="#3E2414" stroke-width="1.3"/></g>'+
      '<ellipse cx="50" cy="68" rx="20" ry="24" fill="#6B4226" stroke="#3E2414" stroke-width="2"/><path d="M42 90l8 6 8-6" fill="#fff" stroke="#E5E5E5" stroke-width="1"/>'+
      '<circle cx="50" cy="44" r="18" fill="#FFFFFF" stroke="#DADADA" stroke-width="2"/>'+
      '<path d="M44 92l-2 5M47 92l1 5M53 92l-1 5M56 92l2 5" stroke="#F2B21B" stroke-width="2.4" stroke-linecap="round"/>'+
      shinEyes(mood,43,57,42,3.8)+(mood==="hi"||mood==="think"?'<path d="M39 36l7 2M61 36l-7 2" stroke="#2A2118" stroke-width="1.8" stroke-linecap="round"/>':'')+
      (beakOpen?'<path d="M45 48h12q3 2 0 5h-12z" fill="#F2B21B"/><path d="M46 54h9l-3 3z" fill="#D9960A"/>':'<path d="M45 47h12q5 2 1 8q-2-3-13-3z" fill="#F2B21B" stroke="#C48A0A" stroke-width="1"/>')+shinCap(50,28,-8,.8);
  }
  if(mood==="think") ex='<text x="84" y="22" font-size="20" font-weight="700" fill="#1D5FD1" font-family="Be Vietnam Pro,sans-serif">?</text>';
  if(mood==="party") ex='<rect x="8" y="10" width="5" height="9" rx="1.5" fill="#F2B21B" transform="rotate(-20 10 14)"/><rect x="86" y="8" width="5" height="9" rx="1.5" fill="#E0567F" transform="rotate(25 88 12)"/><circle cx="92" cy="34" r="3" fill="#22A05E"/><circle cx="6" cy="36" r="3" fill="#7A55D3"/>';
  if(mood==="hi") ex='<path d="M86 22l4-6M90 30l7-2M82 15v-6" stroke="#F2B21B" stroke-width="2.5" stroke-linecap="round"/>';
  if(mood==="surprise") ex='<text x="82" y="26" font-size="24" font-weight="800" fill="#E0453A" font-family="Be Vietnam Pro,sans-serif">!</text><path d="M14 22l-5-5M12 32l-7-1" stroke="#E0453A" stroke-width="2.4" stroke-linecap="round"/>';
  if(mood==="touched") ex='<path class="hrt h1" d="M84 26c-2-3-7-1-5 3l5 5 5-5c2-4-3-6-5-3z" fill="#FF6F9C"/><path class="hrt h2" d="M14 34c-1.6-2.4-5.6-.8-4 2.4l4 4 4-4c1.6-3.2-2.4-4.8-4-2.4z" fill="#FF9CBA"/>';
  if(mood==="encourage") ex='<path d="M84 18l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#22A05E"/><path d="M14 26l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#F2B21B"/>';
  if(mood==="pout") ex='<path d="M80 14l4 4M88 12l-2 6M92 20l-6 1M84 24l2-3" stroke="#E0453A" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="22" cy="70" rx="5" ry="3" fill="#FF9FB0" opacity=".8"/><ellipse cx="78" cy="70" rx="5" ry="3" fill="#FF9FB0" opacity=".8"/>';
  if(mood==="sad") ex='<path d="M10 14h16a5 5 0 0 0-5-6 6 6 0 0 0-11 2 3 3 0 0 0 0 4z" fill="#C9D3E6"/><path d="M14 18l-1 4M19 18l-1 4M24 18l-1 4" stroke="#7FA4D8" stroke-width="1.6" stroke-linecap="round"/>';
  return '<svg class="shin st'+stg+(anim?" a-"+anim:"")+'" width="'+sz+'" height="'+sz+'" viewBox="0 0 100 100" aria-hidden="true">'+b+ex+'</svg>';
}
/* Biểu tượng nét (24×24), cùng kiểu với PS.icon của lõi */
var CD_ICONS = {
  mount: '<path d="M3 19l6.5-10 4 6 2.5-3.5L21 19z"/><circle cx="17" cy="6" r="2"/>',
  heart: '<circle cx="9" cy="8" r="3.4"/><path d="M3.5 19c.6-3.4 2.8-5.4 5.5-5.4 1.2 0 2.3.4 3.2 1.1"/><path d="M17.5 20.5l-3.2-3.1a2 2 0 012.9-2.8l.3.3.3-.3a2 2 0 012.9 2.8z"/>',
  tool: '<path d="M14.5 6.5a4 4 0 00-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 005.3-5.3l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  chat: '<path d="M4 5h11a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 3.5V15H4a2 2 0 01-2-2V7a2 2 0 012-2z"/><path d="M19 9h1a2 2 0 012 2v5a2 2 0 01-2 2h-1v2.5L16 18h-3"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  play: '<path d="M8 5.5v13l11-6.5z"/>',
  ext: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  map: '<path d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z"/><path d="M9 4v13M15 6.5v13"/>',
  arrowL: '<path d="M15 5l-7 7 7 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  redo: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4v4.6h4.6"/>',
  ticket: '<path d="M3 8a2 2 0 002-2h14a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H5a2 2 0 00-2-2v-2a2 2 0 000-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
  seed: '<path d="M12 20v-7"/><path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M12 15c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/>'
};
function cdIcon(k, sz, sw) {
  var p = CD_ICONS[k]; if (!p) return PS.icon(k, sz, sw);
  sz = sz || 20;
  return '<svg class="ps-ic" width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
}
/* Cảnh truyện tranh Ga 5 (chuyện chị Thúy): home · snow · office. Hình phẳng, 320×150. Nhân vật vẽ nửa người, không vẽ bàn tay. */
function cdGirl(x, y, c, hat) { /* x,y = tâm mặt; c = màu áo; hat = mũ tốt nghiệp */
  function P(d) { return d.replace(/X([-+]?\d+(?:\.\d+)?)/g, function (m, n) { return String(x + (+n)); }).replace(/Y([-+]?\d+(?:\.\d+)?)/g, function (m, n) { return String(y + (+n)); }); }
  var H = '#3A2A22', K = '#F8D7BF';
  return '<g>' +
    '<path d="' + P('MX-13 Y-1 CX-15 Y14 X-13 Y27 X-8 Y31 LX8 Y31 CX13 Y27 X15 Y14 X13 Y-1 Z') + '" fill="' + H + '"/>' +
    '<path d="' + P('MX-21 Y46 CX-21 Y28 X-12 Y20 X0 Y20 CX12 Y20 X21 Y28 X21 Y46 Z') + '" fill="' + c + '"/>' +
    '<path d="' + P('MX-4 Y8 LX4 Y8 LX4 Y19 QX0 Y23 X-4 Y19 Z') + '" fill="#EDC2A3"/>' +
    '<path d="' + P('MX-6 Y20 LX0 Y27 LX6 Y20') + '" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" opacity=".9"/>' +
    '<ellipse cx="' + x + '" cy="' + y + '" rx="10.5" ry="11.6" fill="' + K + '"/>' +
    '<path d="' + P('MX-11.2 Y1 CX-11.5 Y-11 X-4 Y-13.6 X1 Y-13.2 CX8 Y-13 X12 Y-8 X11.2 Y2 CX9 Y-4 X4 Y-6.5 X-1 Y-6 CX-5 Y-5 X-8.5 Y-3 X-11.2 Y1 Z') + '" fill="' + H + '"/>' +
    '<path d="' + P('MX-11 Y0 CX-12.5 Y8 X-12 Y16 X-10 Y22 LX-8 Y8 Z') + '" fill="' + H + '"/>' +
    '<path d="' + P('MX11 Y0 CX12.5 Y8 X12 Y16 X10 Y22 LX8 Y8 Z') + '" fill="' + H + '"/>' +
    '<path d="' + P('MX-6.4 Y-1.4 QX-4.2 Y-2.6 X-2.2 Y-1.6 MX2.2 Y-1.6 QX4.2 Y-2.6 X6.4 Y-1.4') + '" stroke="' + H + '" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="' + (x - 4.2) + '" cy="' + (y + 2.4) + '" rx="1.35" ry="1.8" fill="#2A2118"/><ellipse cx="' + (x + 4.2) + '" cy="' + (y + 2.4) + '" rx="1.35" ry="1.8" fill="#2A2118"/>' +
    '<circle cx="' + (x - 3.8) + '" cy="' + (y + 1.8) + '" r=".5" fill="#fff"/><circle cx="' + (x + 4.6) + '" cy="' + (y + 1.8) + '" r=".5" fill="#fff"/>' +
    '<circle cx="' + (x - 6.6) + '" cy="' + (y + 6.4) + '" r="2" fill="#F29C9C" opacity=".35"/><circle cx="' + (x + 6.6) + '" cy="' + (y + 6.4) + '" r="2" fill="#F29C9C" opacity=".35"/>' +
    '<path d="' + P('MX-2.4 Y7 QX0 Y9 X2.4 Y7') + '" stroke="#B85A4E" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    (hat ? '<path d="' + P('MX-16 Y-12 LX0 Y-19 LX16 Y-12 LX0 Y-5 Z') + '" fill="#1F2A4D"/><path d="' + P('MX-9 Y-9 LX-9 Y-5 QX0 Y-1 X9 Y-5 LX9 Y-9 LX0 Y-5 Z') + '" fill="#2B3966"/><path d="' + P('MX0 Y-12 LX13 Y-9 LX13 Y0') + '" stroke="#F2C230" stroke-width="1.3" fill="none"/><circle cx="' + (x + 13) + '" cy="' + (y + 1) + '" r="1.6" fill="#F2C230"/>' : '') +
    '</g>';
}
function cdScene(k) {
  var o = '<svg class="scene" viewBox="0 0 320 150" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">', b = '';
  if (k === 'home') {
    b = '<rect width="320" height="150" fill="#EAF2FF"/><circle cx="64" cy="30" r="15" fill="#FFD84D" opacity=".9"/>' +
      '<path d="M0 108Q60 74 132 100T320 92V150H0z" fill="#BFE3C8"/>' +
      '<rect x="214" y="80" width="54" height="38" rx="3" fill="#fff" stroke="#D6DDEE"/><path d="M206 82L241 58L276 82z" fill="#E0567F"/><rect x="234" y="96" width="14" height="22" rx="2" fill="#F2A20F"/><rect x="252" y="90" width="10" height="9" rx="1.5" fill="#BFD3F5"/>' +
      '<path d="M0 126Q90 104 180 122T320 116V150H0z" fill="#9ED3AE"/>' +
      cdGirl(150, 92, '#2C5BC4', 1) +
      '<path d="M182 44Q222 18 270 30" stroke="#9AA8CC" stroke-width="2" stroke-dasharray="4 5" fill="none"/>' +
      '<g transform="translate(270 22) rotate(8)"><path d="M0 6h26l6-4h4l-3 6 3 6h-4l-6-4H0z" fill="#2C5BC4"/><path d="M10 6l6-9h4l-2 9zM10 10l6 9h4l-2-9z" fill="#4472D6"/></g>';
  } else if (k === 'snow') {
    b = '<rect width="320" height="150" fill="#24427F"/><circle cx="40" cy="28" r="12" fill="#FFF4D6"/><circle cx="45" cy="25" r="11" fill="#24427F"/>' +
      '<g fill="#fff" opacity=".85"><circle cx="90" cy="20" r="2"/><circle cx="130" cy="40" r="1.6"/><circle cx="170" cy="16" r="2"/><circle cx="305" cy="22" r="2"/><circle cx="150" cy="70" r="1.5"/><circle cx="20" cy="66" r="1.8"/><circle cx="110" cy="62" r="1.5"/><circle cx="308" cy="74" r="1.6"/></g>' +
      '<path d="M18 128V80l24-14v14l24-14v14l24-14v62z" fill="#DCE6F7"/><rect x="74" y="46" width="10" height="30" fill="#C2CFE8"/>' +
      '<g transform="translate(36 98)"><path d="M0 8q14-12 30 0q-16 12-30 0z" fill="#FF8A7A"/><path d="M30 8l8-6v12z" fill="#FF8A7A"/><circle cx="7" cy="6" r="1.6" fill="#24427F"/></g>' +
      '<rect x="172" y="34" width="128" height="94" rx="6" fill="#FFE9A8"/>' +
      '<g transform="translate(270 44)"><path d="M0 26V8M-7 8h14l-7-8z" stroke="#7A5530" stroke-width="2" fill="#FFC93C" stroke-linejoin="round"/><circle cx="0" cy="12" r="10" fill="#FFF3C4" opacity=".55"/></g>' +
      cdGirl(222, 82, '#E0567F', 0) +
      '<rect x="176" y="112" width="120" height="16" fill="#B9874E"/><path d="M204 112l18-5 18 5z" fill="#fff" stroke="#C9D3E6" stroke-width="1"/><path d="M222 107v5" stroke="#C9D3E6"/>' +
      '<rect x="172" y="34" width="128" height="94" rx="6" fill="none" stroke="#F2C230" stroke-width="3"/>' +
      '<path d="M0 132Q80 122 160 132T320 130V150H0z" fill="#fff"/>';
  } else {
    b = '<rect width="320" height="150" fill="#F3F7FF"/><rect x="0" y="122" width="320" height="28" fill="#E1E8F7"/>' +
      '<rect x="22" y="30" width="56" height="40" rx="4" fill="#fff" stroke="#D6DDEE"/><path d="M30 60l10-12 8 8 6-6 16 10z" fill="#BFE3C8"/>' +
      cdGirl(104, 80, '#22A05E', 0) +
      '<path d="M84 112l6-22h38l-6 22z" fill="#5B6B95"/><path d="M104 101l2-6" stroke="#9AA8CC" stroke-width="2" stroke-linecap="round"/>' +
      '<rect x="44" y="112" width="130" height="15" rx="3" fill="#B9874E"/><path d="M54 127v20M164 127v20" stroke="#9C6E3B" stroke-width="5"/>' +
      '<g font-family="Be Vietnam Pro,Arial,sans-serif" font-weight="800" text-anchor="middle">' +
      '<rect x="198" y="22" width="48" height="30" rx="12" fill="#fff" stroke="#2C5BC4" stroke-width="2"/><path d="M212 52l-4 9 12-9z" fill="#fff" stroke="#2C5BC4" stroke-width="2" stroke-linejoin="round"/><text x="222" y="42" font-size="14" fill="#2C5BC4">VN</text>' +
      '<rect x="262" y="48" width="48" height="30" rx="12" fill="#fff" stroke="#E0453A" stroke-width="2"/><path d="M296 78l4 9-12-9z" fill="#fff" stroke="#E0453A" stroke-width="2" stroke-linejoin="round"/><text x="286" y="68" font-size="14" fill="#E0453A">JP</text></g>' +
      '<path d="M248 36q14 0 20 10" stroke="#7A8AB8" stroke-width="2" fill="none"/><path d="M264 42l5 5 1-7" stroke="#7A8AB8" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M258 66q-12 0-18-10" stroke="#7A8AB8" stroke-width="2" fill="none"/><path d="M244 60l-5-5-1 7" stroke="#7A8AB8" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<rect x="212" y="98" width="74" height="20" rx="6" fill="#FFF8E6" stroke="#F2C230"/><text x="249" y="112" font-size="10" font-weight="700" text-anchor="middle" fill="#9A6400" font-family="Be Vietnam Pro,Arial,sans-serif">Giám đốc</text>';
  }
  return o + b + '</svg>';
}
/* Ga 6 · cây cầu mốc: nhịp 1 = ở JPC, trụ giữa = bay sang Nhật, nhịp 2 = ở Nhật. n1, n2 = số mốc mỗi nhịp (cờ đánh số). 320×140, hình phẳng. */
function cdBridge(n1, n2) {
  var C = '#2C5BC4', D2 = '#2149A6', Y = '#FFC93C', o = '';
  function flags(n, x0, x1, start, col) {
    var s = '', k = Math.min(n, 6), i, x;
    for (i = 0; i < k; i++) {
      x = k === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * i / (k - 1);
      s += '<g class="bflag" style="--d:' + (i * 0.08 + (start ? 0.35 : 0)) + 's"><path d="M' + x + ' 62V38" stroke="#5B6B95" stroke-width="1.6"/><path d="M' + x + ' 38h15l-4 5.5 4 5.5h-15z" fill="' + col + '"/>' +
        '<text x="' + (x + 6.5) + '" y="46.6" font-size="8.5" font-weight="800" text-anchor="middle" fill="#fff" font-family="Be Vietnam Pro,Arial,sans-serif">' + (start + i + 1) + '</text></g>';
    }
    return s;
  }
  o += '<svg class="bridge" viewBox="0 0 320 140" role="img" aria-label="Cây cầu hai chặng: ở JPC và ở Nhật">' +
    '<defs><linearGradient id="bsky" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#EEF3FF"/><stop offset="1" stop-color="#FFF1D6"/></linearGradient></defs>' +
    '<rect width="320" height="140" rx="16" fill="url(#bsky)"/><circle cx="292" cy="30" r="15" fill="' + Y + '" opacity=".85"/>' +
    '<path d="M0 108Q80 100 160 108T320 106V140H0z" fill="#CFE0FF"/><path d="M0 120Q90 112 170 120T320 118V140H0z" fill="#B7CFFA"/>' +
    '<path d="M0 66h34v74H0z" fill="#9ED3AE"/><path d="M286 66h34v74h-34z" fill="#9ED3AE"/>' +
    '<path d="M34 64Q97 118 160 64" fill="none" stroke="' + C + '" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M160 64Q223 118 286 64" fill="none" stroke="' + D2 + '" stroke-width="5" stroke-linecap="round"/>' +
    '<rect x="154" y="64" width="12" height="56" rx="3" fill="#5B6B95"/>' +
    '<rect x="30" y="60" width="260" height="6" rx="3" fill="#18203F"/>' +
    '<g transform="translate(148 14)"><path d="M0 9h17l5-4h3l-2 4 2 4h-3l-5-4H0z" fill="' + D2 + '"/><path d="M7 9l4-7h3l-1 7zM7 9l4 7h3l-1-7z" fill="#4472D6"/></g>' +
    '<g font-family="Be Vietnam Pro,Arial,sans-serif" font-weight="800" text-anchor="middle">' +
    '<text x="17" y="88" font-size="10" fill="#1E6B3C">JPC</text><text x="303" y="88" font-size="10" fill="#1E6B3C">Nhật</text>' +
    '<text x="97" y="132" font-size="9.5" fill="' + D2 + '">Chặng 1 · Ở JPC</text><text x="223" y="132" font-size="9.5" fill="' + D2 + '">Chặng 2 · Ở Nhật</text></g>' +
    flags(n1, 52, 142, 0, C) + flags(n2, 178, 268, n1, D2) + '</svg>';
  return o;
}
/* Ga 7 · nhân vật nam nửa người (cùng kiểu cdGirl, không vẽ bàn tay). hat: 'helmet' mũ bảo hộ · 'net' mũ lưới vệ sinh · 'cap' mũ vải */
function cdBoy(x, y, c, hat) {
  function P(d) { return d.replace(/X([-+]?\d+(?:\.\d+)?)/g, function (m, n) { return String(x + (+n)); }).replace(/Y([-+]?\d+(?:\.\d+)?)/g, function (m, n) { return String(y + (+n)); }); }
  var H = '#2E241E', K = '#F3CDB0';
  var hb = hat === 'helmet' ? '<path d="' + P('MX-13 Y-3 CX-13 Y-15 X-6 Y-19 X0 Y-19 CX6 Y-19 X13 Y-15 X13 Y-3 Z') + '" fill="#FFC93C"/><rect x="' + (x - 15) + '" y="' + (y - 4) + '" width="30" height="3.4" rx="1.7" fill="#E5A50A"/><path d="' + P('MX0 Y-19 LX0 Y-5') + '" stroke="#E5A50A" stroke-width="2"/>'
    : (hat === 'net' ? '<path d="' + P('MX-12.5 Y-1 CX-14 Y-14 X-5 Y-18 X0 Y-18 CX5 Y-18 X14 Y-14 X12.5 Y-1 CX6 Y-5 X-6 Y-5 X-12.5 Y-1 Z') + '" fill="#fff" stroke="#D6DDEE" stroke-width="1"/>'
    : (hat === 'cap' ? '<path d="' + P('MX-12 Y-4 CX-12 Y-14 X-5 Y-17 X0 Y-17 CX5 Y-17 X12 Y-14 X12 Y-4 Z') + '" fill="' + c + '"/><path d="' + P('MX4 Y-5 LX19 Y-3') + '" stroke="' + c + '" stroke-width="3" stroke-linecap="round"/>' : ''));
  return '<g>' +
    '<path d="' + P('MX-21 Y46 CX-21 Y28 X-12 Y20 X0 Y20 CX12 Y20 X21 Y28 X21 Y46 Z') + '" fill="' + c + '"/>' +
    '<path d="' + P('MX-4 Y8 LX4 Y8 LX4 Y19 QX0 Y23 X-4 Y19 Z') + '" fill="#E7BB9A"/>' +
    '<path d="' + P('MX-6 Y20 LX0 Y26 LX6 Y20') + '" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" opacity=".85"/>' +
    '<ellipse cx="' + x + '" cy="' + y + '" rx="10.5" ry="11.6" fill="' + K + '"/>' +
    (hat ? '' : '<path d="' + P('MX-11 Y0 CX-12 Y-10 X-5 Y-14 X1 Y-13 CX8 Y-13 X12 Y-8 X11 Y0 CX9 Y-5 X6 Y-6 X2 Y-5 CX-2 Y-7 X-7 Y-5 X-11 Y0 Z') + '" fill="' + H + '"/>') +
    '<path d="' + P('MX-6.4 Y-1.2 LX-2.4 Y-1.8 MX2.4 Y-1.8 LX6.4 Y-1.2') + '" stroke="' + H + '" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="' + (x - 4.2) + '" cy="' + (y + 2.4) + '" rx="1.35" ry="1.8" fill="#2A2118"/><ellipse cx="' + (x + 4.2) + '" cy="' + (y + 2.4) + '" rx="1.35" ry="1.8" fill="#2A2118"/>' +
    '<circle cx="' + (x - 3.8) + '" cy="' + (y + 1.8) + '" r=".5" fill="#fff"/><circle cx="' + (x + 4.6) + '" cy="' + (y + 1.8) + '" r=".5" fill="#fff"/>' +
    '<path d="' + P('MX-2.4 Y7 QX0 Y8.6 X2.4 Y7') + '" stroke="#A9554A" stroke-width="1.2" fill="none" stroke-linecap="round"/>' + hb + '</g>';
}
/* Ga 7 · cảnh tuần đầu ở Nhật, 320×130, hình phẳng: factory site farm care shop food clean office dorm */
function cdWork(k) {
  var o = '<svg class="scene" viewBox="0 0 320 130" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">', b = '';
  var F = 'font-family="Be Vietnam Pro,Arial,sans-serif" font-weight="800"';
  if (k === 'site') {
    b = '<rect width="320" height="130" fill="#DCEBFF"/><circle cx="280" cy="26" r="14" fill="#FFD84D"/>' +
      '<path d="M210 120V18M210 18h86M210 30l86-12M296 18v22" stroke="#E5A50A" stroke-width="4" fill="none"/><path d="M286 40v14" stroke="#5B6B95" stroke-width="2"/><rect x="280" y="54" width="12" height="9" fill="#5B6B95"/>' +
      '<g stroke="#9AA8CC" stroke-width="3"><path d="M20 120V48M62 120V48M104 120V48M20 70h84M20 96h84M20 48h84"/></g><rect x="14" y="44" width="96" height="6" fill="#B9874E"/>' +
      '<rect x="0" y="112" width="320" height="18" fill="#C9B79A"/>' + cdBoy(160, 70, '#F07F1E', 'helmet') +
      '<rect x="146" y="98" width="28" height="4" fill="#E8F06A" opacity=".9"/>';
  } else if (k === 'farm') {
    b = '<rect width="320" height="130" fill="#FFF1D6"/><circle cx="50" cy="30" r="14" fill="#FFC93C"/>' +
      '<path d="M190 112V60Q250 14 312 60v52z" fill="#fff" fill-opacity=".7" stroke="#BFD3F5" stroke-width="2"/><path d="M220 112V44M251 112V36M282 112V44" stroke="#D3E0F6" stroke-width="2"/>' +
      '<rect x="0" y="104" width="320" height="26" fill="#B98A5A"/><g fill="#3FA85E">' +
      '<circle cx="18" cy="104" r="8"/><circle cx="48" cy="104" r="8"/><circle cx="78" cy="104" r="8"/><circle cx="208" cy="104" r="8"/><circle cx="240" cy="104" r="8"/><circle cx="272" cy="104" r="8"/><circle cx="304" cy="104" r="8"/></g>' +
      cdGirl(140, 66, '#22A05E', 0) + '<ellipse cx="140" cy="56" rx="22" ry="5" fill="#E8C26A"/><path d="M128 56q12-17 24 0z" fill="#F2D27E"/><path d="M128.5 53.5h23" stroke="#C0392B" stroke-width="2.4"/>';
  } else if (k === 'care') {
    b = '<rect width="320" height="130" fill="#FFF4F0"/><rect x="214" y="18" width="78" height="54" rx="6" fill="#DFF0FF" stroke="#F3D6CC" stroke-width="3"/><path d="M253 18v54M214 45h78" stroke="#F3D6CC" stroke-width="3"/>' +
      '<rect x="0" y="108" width="320" height="22" fill="#F3E2D6"/>' + cdGirl(110, 66, '#E0567F', 0) +
      '<rect x="62" y="104" width="160" height="10" rx="4" fill="#C99A6B"/><ellipse cx="190" cy="100" rx="16" ry="5" fill="#fff" stroke="#E3C9B5"/><path d="M178 98q12 8 24 0" fill="#F2C230"/>' +
      '<rect x="40" y="88" width="10" height="16" rx="3" fill="#BFD3F5"/><circle cx="45" cy="82" r="6" fill="#FF9FB0"/><path d="M45 88v-6" stroke="#3FA85E" stroke-width="2"/>';
  } else if (k === 'shop') {
    b = '<rect width="320" height="130" fill="#FFF8EC"/><rect x="0" y="0" width="320" height="34" fill="#E0453A"/>' +
      '<g fill="#fff" opacity=".9"><rect x="40" y="0" width="3" height="34"/><rect x="120" y="0" width="3" height="34"/><rect x="200" y="0" width="3" height="34"/><rect x="280" y="0" width="3" height="34"/></g>' +
      '<g><ellipse cx="26" cy="54" rx="10" ry="13" fill="#FF8A5B"/><ellipse cx="294" cy="54" rx="10" ry="13" fill="#FF8A5B"/></g>' +
      cdGirl(160, 70, '#18203F', 0) + '<path d="M150 98h20v18h-20z" fill="#fff"/>' +
      '<rect x="0" y="110" width="320" height="20" fill="#B9874E"/><ellipse cx="248" cy="108" rx="18" ry="5" fill="#fff" stroke="#E3C9B5"/><ellipse cx="80" cy="108" rx="14" ry="4" fill="#fff" stroke="#E3C9B5"/>';
  } else if (k === 'food') {
    b = '<rect width="320" height="130" fill="#F2F8FF"/><rect x="0" y="0" width="320" height="10" fill="#DCE8F7"/>' +
      cdBoy(150, 58, '#9CC3F0', 'net') +
      '<rect x="0" y="108" width="320" height="10" rx="4" fill="#8E9BBF"/><g fill="#C9D3E6"><circle cx="10" cy="124" r="5"/><circle cx="90" cy="124" r="5"/><circle cx="170" cy="124" r="5"/><circle cx="250" cy="124" r="5"/><circle cx="310" cy="124" r="5"/></g>' +
      '<g fill="#7FB0E8"><path d="M30 104q12-8 24 0q-12 8-24 0z"/><path d="M54 104l6-4v8z"/><path d="M230 104q12-8 24 0q-12 8-24 0z"/><path d="M254 104l6-4v8z"/></g>' +
      '<rect x="270" y="24" width="38" height="24" rx="4" fill="#fff" stroke="#BFD3F5"/><text x="289" y="40" font-size="10" text-anchor="middle" fill="#2C5BC4" ' + F + '>5°C</text>';
  } else if (k === 'clean') {
    b = '<rect width="320" height="130" fill="#EEF3FF"/><path d="M0 100L80 70H240L320 100z" fill="#DCE3F2"/><rect x="80" y="20" width="160" height="50" fill="#F8FAFF" stroke="#D6DDEE"/>' +
      '<path d="M100 20v50M140 20v50M180 20v50M220 20v50" stroke="#E3E7F5"/><rect x="0" y="100" width="320" height="30" fill="#CFD8EC"/><path d="M30 112h60M200 118h80" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>' +
      cdBoy(150, 64, '#22A05E', 'cap') + '<path d="M228 72v40" stroke="#7A5530" stroke-width="3"/><path d="M216 112h24l-4 10h-16z" fill="#2C5BC4"/><rect x="250" y="96" width="22" height="20" rx="3" fill="#FFC93C"/>';
  } else if (k === 'office') {
    b = '<rect width="320" height="130" fill="#F3F7FF"/><rect x="200" y="16" width="100" height="58" rx="4" fill="#fff" stroke="#D6DDEE" stroke-width="2"/>' +
      '<path d="M214 62l18-16 16 10 18-22 18 14" stroke="#2C5BC4" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      cdBoy(110, 66, '#2B3966', 0) + '<rect x="40" y="108" width="190" height="10" rx="3" fill="#B9874E"/><rect x="150" y="80" width="56" height="30" rx="3" fill="#18203F"/><rect x="154" y="84" width="48" height="22" fill="#7FB0E8"/>' +
      '<rect x="0" y="118" width="320" height="12" fill="#E1E8F7"/>';
  } else if (k === 'dorm') {
    b = '<rect width="320" height="130" fill="#2B3B6B"/><rect x="214" y="16" width="80" height="56" rx="6" fill="#1B2A55" stroke="#F2C230" stroke-width="3"/><circle cx="262" cy="38" r="10" fill="#FFF4D6"/><circle cx="267" cy="35" r="9" fill="#1B2A55"/>' +
      '<g fill="#fff" opacity=".8"><circle cx="230" cy="30" r="1.4"/><circle cx="282" cy="58" r="1.4"/><circle cx="240" cy="60" r="1.2"/></g>' +
      '<rect x="18" y="38" width="70" height="80" rx="4" fill="#3E5390"/><rect x="22" y="58" width="62" height="10" rx="3" fill="#E9EEF9"/><rect x="22" y="96" width="62" height="10" rx="3" fill="#E9EEF9"/>' +
      '<rect x="0" y="112" width="320" height="18" fill="#22305A"/>' + cdGirl(160, 66, '#7A55D3', 0) +
      '<rect x="184" y="104" width="44" height="6" rx="2" fill="#8A6A4A"/><rect x="198" y="84" width="13" height="20" rx="3" fill="#18203F"/><rect x="200" y="87" width="9" height="14" rx="1.5" fill="#BFE3FF"/><circle cx="204.5" cy="94" r="12" fill="#BFE3FF" opacity=".22"/>';
  } else {
    b = '<rect width="320" height="130" fill="#EEF3FF"/><rect x="0" y="108" width="320" height="22" fill="#DCE3F2"/>' +
      '<rect x="196" y="28" width="104" height="80" rx="6" fill="#C9D3E6"/><rect x="208" y="40" width="44" height="28" rx="3" fill="#18203F"/><rect x="211" y="43" width="38" height="22" fill="#7FB0E8"/>' +
      '<circle cx="276" cy="46" r="6" fill="#E0453A"/><circle cx="276" cy="64" r="6" fill="#22A05E"/><rect x="208" y="78" width="80" height="8" rx="3" fill="#9AA8CC"/>' +
      '<rect x="28" y="52" width="56" height="22" rx="4" fill="#fff" stroke="#22A05E" stroke-width="2"/><text x="56" y="68" font-size="12" text-anchor="middle" fill="#1E6B3C" ' + F + '>5S</text>' +
      cdBoy(130, 66, '#2C5BC4', 'cap');
  }
  return o + b + '</svg>';
}
/* Ga 7 · ba vùng: an toàn (trong) · học hỏi (giữa) · quá sức (ngoài). 300×190 */
function cdZones() {
  var F = 'font-family="Be Vietnam Pro,Arial,sans-serif" font-weight="800" text-anchor="middle"';
  return '<svg class="zones" viewBox="0 0 300 190" role="img" aria-label="Ba vùng: an toàn, học hỏi, quá sức">' +
    '<circle cx="150" cy="95" r="90" fill="#FDECEA" stroke="#E58A80" stroke-width="2" stroke-dasharray="5 5"/>' +
    '<circle cx="150" cy="95" r="62" fill="#FFF4D6" stroke="#E5A50A" stroke-width="2.5"/>' +
    '<circle cx="150" cy="95" r="32" fill="#E3F5EA" stroke="#1E9E5A" stroke-width="2.5"/>' +
    '<text x="150" y="99" font-size="11" fill="#1E6B3C" ' + F + '>An toàn</text>' +
    '<text x="150" y="52" font-size="11.5" fill="#9A6400" ' + F + '>Học hỏi</text>' +
    '<text x="150" y="22" font-size="11" fill="#B43A2E" ' + F + '>Quá sức</text>' +
    '<g class="zarrow"><path d="M182 118l26 18" stroke="#2C5BC4" stroke-width="2.4" stroke-linecap="round"/><path d="M200 138l9-1-2-9" stroke="#2C5BC4" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
}
