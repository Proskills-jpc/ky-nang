/* TK · Nhật Bản Du Ký · tk/art.js · HÌNH VẼ: nhân vật, minh họa, bản đồ (SVG vẽ gốc)
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* =========================================================
   PHẦN 1 · HÌNH VẼ (nhân vật hư cấu, vẽ gốc bằng SVG)
   ========================================================= */
var ART = {};
/* ---- Ngộ Không: hi · cheer · think · wow · worry · soi ---- */
function hau(mood){
  mood = mood||'hi';
  var eyes;
  if(mood==='cheer') eyes='<path d="M41 61q6-7 12 0M67 61q6-7 12 0" stroke="#2A1E14" stroke-width="3.6" fill="none" stroke-linecap="round"/>';
  else if(mood==='soi') eyes='<g class="blink"><circle cx="47" cy="60" r="6.8" fill="#FF8A1F"/><circle cx="73" cy="60" r="6.8" fill="#FF8A1F"/><circle cx="47" cy="60" r="3.4" fill="#FFE14D"/><circle cx="73" cy="60" r="3.4" fill="#FFE14D"/></g>'+
    '<g class="flame"><path d="M44 50q3-7 3-11 4 5 3 11z" fill="#FF8A1F"/><path d="M70 50q3-7 3-11 4 5 3 11z" fill="#FF8A1F"/></g>';
  else eyes='<g class="blink"><circle cx="47" cy="60" r="6.4" fill="#2A1E14"/><circle cx="73" cy="60" r="6.4" fill="#2A1E14"/>'+
    '<circle cx="47" cy="60" r="6.4" fill="none" stroke="#F4B63B" stroke-width="1.6"/><circle cx="73" cy="60" r="6.4" fill="none" stroke="#F4B63B" stroke-width="1.6"/>'+
    '<circle cx="49.2" cy="57.6" r="2" fill="#FFE9A8"/><circle cx="75.2" cy="57.6" r="2" fill="#FFE9A8"/></g>';
  var brow='';
  if(mood==='think') brow='<path d="M66 48q7-4 14 1" stroke="#7A4A22" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  if(mood==='worry') brow='<path d="M40 51q6-1 11-5M80 51q-6-1-11-5" stroke="#7A4A22" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  if(mood==='soi') brow='<path d="M39 49q8-4 15 0M66 49q8-4 15 0" stroke="#7A4A22" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  var mouth;
  if(mood==='wow') mouth='<ellipse cx="60" cy="82" rx="4.5" ry="5.5" fill="#7A2E1E"/>';
  else if(mood==='soi') mouth='<ellipse cx="60" cy="82" rx="3" ry="3.4" fill="#7A2E1E"/>';
  else if(mood==='think') mouth='<path d="M55 83q5 2 10-1" stroke="#7A2E1E" stroke-width="2.8" fill="none" stroke-linecap="round"/>';
  else if(mood==='worry') mouth='<path d="M51 84q4-3 9 0t9 0" stroke="#7A2E1E" stroke-width="2.8" fill="none" stroke-linecap="round"/>';
  else mouth='<path d="M50 79q10 10 20 0" stroke="#7A2E1E" stroke-width="3" fill="'+(mood==='cheer'?'#B5463A':'none')+'" stroke-linecap="round" stroke-linejoin="round"/>';
  var hand = mood==='soi' ? '<g class="paw"><path d="M120 34q-14-2-22 6" stroke="#B9773E" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="90" cy="42" rx="14" ry="7" fill="#C98545" transform="rotate(-14 90 42)"/><path d="M80 44l-3 4M85 46l-2 4M90 46l-1 4" stroke="#8E5A2B" stroke-width="2" stroke-linecap="round"/></g>' : '';
  return '<svg class="chr chr-hau m-'+mood+'" viewBox="0 0 120 120" aria-hidden="true">'+
    '<circle cx="22" cy="63" r="14" fill="#B9773E"/><circle cx="22" cy="63" r="8" fill="#F3CFA6"/>'+
    '<circle cx="98" cy="63" r="14" fill="#B9773E"/><circle cx="98" cy="63" r="8" fill="#F3CFA6"/>'+
    '<circle cx="60" cy="63" r="38" fill="#C98545"/>'+
    '<path d="M60 47c-6-8-27-6-27 10 0 6 2 10 5 13-3 4-4 8-4 11 0 12 12 18 26 18s26-6 26-18c0-3-1-7-4-11 3-3 5-7 5-13 0-16-21-18-27-10z" fill="#F6D7B0"/>'+
    '<path d="M25 45c11-13 59-13 70 0" stroke="#F4B63B" stroke-width="6.5" fill="none" stroke-linecap="round"/>'+
    '<path d="M25 45c11-13 59-13 70 0" stroke="#FFE08A" stroke-width="2" fill="none" stroke-linecap="round" transform="translate(0 -1.6)"/>'+
    '<circle cx="60" cy="35.6" r="4.2" fill="#D9473B" stroke="#FFE08A" stroke-width="1.2"/>'+
    eyes+brow+
    '<circle cx="56.5" cy="71" r="1.7" fill="#7A4A22"/><circle cx="63.5" cy="71" r="1.7" fill="#7A4A22"/>'+
    '<circle cx="38" cy="74" r="5" fill="#F2A08A" opacity=".55"/><circle cx="82" cy="74" r="5" fill="#F2A08A" opacity=".55"/>'+
    mouth+hand+'</svg>';
}
/* ---- Chú Tanaka: hi · serious · praise · worry (không râu) ---- */
function tanaka(mood){
  mood=mood||'hi';
  var brow = mood==='serious' ? '<path d="M41 61h12M67 61h12" stroke="#3B2A22" stroke-width="2.8" stroke-linecap="round"/>' :
    (mood==='worry' ? '<path d="M42 62q6-1 11-5M78 62q-6-1-11-5" stroke="#3B2A22" stroke-width="2.6" fill="none" stroke-linecap="round"/>' :
    '<path d="M42 62q6-3 11 0M67 62q6-3 11 0" stroke="#3B2A22" stroke-width="2.6" fill="none" stroke-linecap="round"/>');
  var eyes = mood==='praise' ? '<path d="M44 71q4-5 8 0M68 71q4-5 8 0" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>' :
    '<g class="blink"><circle cx="48" cy="70" r="3.6" fill="#2A2A2A"/><circle cx="72" cy="70" r="3.6" fill="#2A2A2A"/></g>';
  var mouth = mood==='serious' ? '<path d="M53 84h14" stroke="#6B3B2A" stroke-width="3" stroke-linecap="round"/>' :
    (mood==='worry' ? '<ellipse cx="60" cy="84" rx="3.4" ry="3" fill="#6B3B2A"/>' :
    (mood==='praise' ? '<path d="M50 80q10 11 20 0z" fill="#B5463A" stroke="#6B3B2A" stroke-width="2.4" stroke-linejoin="round"/>' :
    '<path d="M51 81q9 8 18 0" stroke="#6B3B2A" stroke-width="3" fill="none" stroke-linecap="round"/>'));
  var thumb = mood==='praise' ? '<g class="thumb"><rect x="89" y="96" width="16" height="15" rx="6" fill="#F7D5B5" stroke="#E2B48F" stroke-width="1.4"/><rect x="88" y="80" width="5" height="19" rx="2.5" fill="#F7D5B5" stroke="#E2B48F" stroke-width="1.2" transform="rotate(-14 90.5 98)"/><rect x="97" y="80" width="5" height="19" rx="2.5" fill="#F7D5B5" stroke="#E2B48F" stroke-width="1.2" transform="rotate(12 99.5 98)"/><path d="M90 103h12" stroke="#E2B48F" stroke-width="1.2"/></g>' : '';
  return '<svg class="chr chr-tan m-'+mood+'" viewBox="0 0 120 120" aria-hidden="true">'+
    '<path d="M24 120c2-18 18-26 36-26s34 8 36 26z" fill="#9DB8E8"/>'+
    '<path d="M60 94l-9 7 9 19 9-19z" fill="#23306B"/><path d="M42 98l18-4 18 4-6 9-12-6-12 6z" fill="#BFD1F1"/>'+
    '<circle cx="27" cy="68" r="7" fill="#EDC19C"/><circle cx="93" cy="68" r="7" fill="#EDC19C"/>'+
    '<circle cx="60" cy="66" r="33" fill="#F7D5B5"/>'+
    '<path d="M24 52Q60 10 96 52z" fill="#23306B"/>'+
    '<path d="M18 54q42-12 84 0q-42 10-84 0z" fill="#18214D"/>'+
    '<path d="M24 50q36-9 72 0" stroke="#F4B63B" stroke-width="2.2" fill="none"/>'+
    '<path d="M60 26l3.4 6.9 7.6 1.1-5.5 5.4 1.3 7.6L60 43.4 53.2 47l1.3-7.6-5.5-5.4 7.6-1.1z" fill="#F4B63B"/>'+
    brow+eyes+'<circle cx="43" cy="78" r="4.5" fill="#F2A08A" opacity=".45"/><circle cx="77" cy="78" r="4.5" fill="#F2A08A" opacity=".45"/>'+
    mouth+thumb+'</svg>';
}
/* ---- Hồ Ly Ba Mặt: sly · sweet · angry ---- */
function holy(mood){
  mood=mood||'sly';
  var eyes, mouth, extra='';
  if(mood==='sweet'){
    eyes='<path d="M38 62q8-8 16 0M66 62q8-8 16 0" stroke="#3A2316" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
    mouth='<path d="M52 89q8 7 16 0" stroke="#3A2316" stroke-width="2.8" fill="none" stroke-linecap="round"/>';
    extra='<circle cx="36" cy="74" r="5" fill="#F46B5E" opacity=".45"/><circle cx="84" cy="74" r="5" fill="#F46B5E" opacity=".45"/>';
  } else if(mood==='angry'){
    eyes='<path d="M38 56l16 6M82 56l-16 6" stroke="#8E1F12" stroke-width="4" stroke-linecap="round"/><g class="blink"><path d="M41 64l11 3-11 1z" fill="#3A2316"/><path d="M79 64l-11 3 11 1z" fill="#3A2316"/></g>';
    mouth='<path d="M48 88q12-8 24 0q-12 10-24 0z" fill="#3A2316"/><path d="M51 88l3 3 3-3 3 3 3-3 3 3 3-3" stroke="#fff" stroke-width="1.6" fill="none"/>';
    extra='<path d="M92 34l6 6M98 34l-6 6M95 31v12M89 37h12" stroke="#E2372B" stroke-width="2.6" stroke-linecap="round"/>';
  } else {
    eyes='<g class="blink"><path d="M38 60q8-6 16 2" stroke="#3A2316" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M66 62q8-8 16-2" stroke="#3A2316" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>'+
      '<path d="M44 52l10 4M76 52l-10 4" stroke="#B5531C" stroke-width="2.6" stroke-linecap="round"/>';
    mouth='<path d="M50 91q8 7 20-3" stroke="#3A2316" stroke-width="2.8" fill="none" stroke-linecap="round"/>';
    extra='<path d="M86 30l3 6 6 1-4.4 4 1 6-5.6-3-5.6 3 1-6-4.4-4 6-1z" fill="#FFE08A" class="twinkle"/>';
  }
  return '<svg class="chr chr-ho m-'+mood+'" viewBox="0 0 120 120" aria-hidden="true">'+
    '<g class="tail"><path d="M88 100q26-4 28-30q-10 10-22 8q-14 12-6 22z" fill="#E2752C"/><path d="M114 72q-6 8-14 8l4 6q10-4 10-14z" fill="#FFF3E6"/></g>'+
    '<path d="M24 18l18 26-20 6z" fill="#E2752C"/><path d="M96 18L78 44l20 6z" fill="#E2752C"/>'+
    '<path d="M28 27l9 15-10 3z" fill="#FFD9BF"/><path d="M92 27l-9 15 10 3z" fill="#FFD9BF"/>'+
    '<path d="M18 52Q60 14 102 52Q98 88 60 106Q22 88 18 52z" fill="#F08A3C"/>'+
    '<path d="M34 72Q60 60 86 72Q76 98 60 106Q44 98 34 72z" fill="#FFF3E6"/>'+
    eyes+'<ellipse cx="60" cy="82" rx="5" ry="3.6" fill="#3A2316"/>'+mouth+extra+'</svg>';
}
/* ---- Lão Đỏ Đen: smug · tempt · angry ---- */
function ngu(mood){
  mood=mood||'smug';
  var eyes, extra='';
  if(mood==='tempt'){
    eyes='<path d="M40 57h14" stroke="#F4B63B" stroke-width="3.2" stroke-linecap="round"/><g class="blink"><path d="M66 57q6-6 14-1" stroke="#F4B63B" stroke-width="3.2" fill="none" stroke-linecap="round"/></g><path d="M66 48l12 3" stroke="#F4B63B" stroke-width="2.4" stroke-linecap="round"/>';
    extra='<g class="coin"><circle cx="98" cy="96" r="12" fill="#F4B63B" stroke="#C98A12" stroke-width="2"/><text x="98" y="101" text-anchor="middle" font-size="13" font-weight="800" fill="#7A5300" font-family="sans-serif">¥</text></g>';
  } else if(mood==='angry'){
    eyes='<path d="M38 52l16 6M82 52l-16 6" stroke="#E2372B" stroke-width="4" stroke-linecap="round"/><g class="blink"><path d="M42 60h10M68 60h10" stroke="#FF5A4A" stroke-width="3.4" stroke-linecap="round"/></g>';
    extra='<g class="puff"><circle cx="40" cy="98" r="6" fill="#E3E6EE"/><circle cx="33" cy="92" r="4.5" fill="#E3E6EE"/><circle cx="80" cy="98" r="6" fill="#E3E6EE"/><circle cx="87" cy="92" r="4.5" fill="#E3E6EE"/></g>';
  } else {
    eyes='<g class="blink"><path d="M40 56q8-5 14 1M66 57q6-6 14-1" stroke="#F4B63B" stroke-width="3.2" fill="none" stroke-linecap="round"/></g>';
    extra='<rect x="84" y="88" width="20" height="26" rx="4" fill="#fff" stroke="#C8373D" stroke-width="2" transform="rotate(14 94 101)"/>'+
      '<text x="94" y="106" text-anchor="middle" font-size="13" font-weight="700" fill="#C8373D" font-family="sans-serif" transform="rotate(14 94 101)">A</text>';
  }
  return '<svg class="chr chr-ngu m-'+mood+'" viewBox="0 0 120 120" aria-hidden="true">'+
    '<path d="M30 40Q10 34 8 14q14 12 30 16z" fill="#F1E6CF"/><path d="M90 40q20-6 22-26-14 12-30 16z" fill="#F1E6CF"/>'+
    '<path d="M20 44q4-14 18-14l8 6 14-4 14 4 8-6q14 0 18 14l-8 4q2 30-32 48-34-18-32-48z" fill="#2C2730"/>'+
    '<path d="M12 46q-4 8 8 12l6-12zM108 46q4 8-8 12l-6-12z" fill="#2C2730"/>'+
    eyes+'<ellipse cx="60" cy="84" rx="20" ry="15" fill="'+(mood==='angry'?'#A82A30':'#C8373D')+'"/>'+
    '<ellipse cx="53" cy="82" rx="3.2" ry="4.4" fill="#5A1418"/><ellipse cx="67" cy="82" rx="3.2" ry="4.4" fill="#5A1418"/>'+
    '<g class="ring"><circle cx="60" cy="96" r="7" fill="none" stroke="#F4B63B" stroke-width="3.2"/></g>'+extra+'</svg>';
}
/* ---- Yêu "Chắc Không Sao": sly · whisper · deflated ---- */
function yeu(mood){
  mood=mood||'sly';
  if(mood==='deflated'){
    return '<svg class="chr chr-yeu m-deflated" viewBox="0 0 120 120" aria-hidden="true">'+
      '<path d="M60 70q-8 2-12-4" stroke="#7FA86A" stroke-width="4" fill="none" stroke-linecap="round"/>'+
      '<path d="M16 96c0-14 18-24 44-24s44 10 44 24c0 10-20 14-44 14S16 106 16 96z" fill="#A9C79A"/>'+
      '<path d="M40 86l8 8M48 86l-8 8M72 86l8 8M80 86l-8 8" stroke="#3E4D36" stroke-width="3" stroke-linecap="round"/>'+
      '<path d="M50 102q5-3 10 0t10 0" stroke="#3E4D36" stroke-width="2.6" fill="none" stroke-linecap="round"/>'+
      '<g class="sweat"><path d="M100 70q4 6 0 9q-4-3 0-9z" fill="#8FC3F0"/></g></svg>';
  }
  var eyes = mood==='whisper' ?
    '<ellipse cx="46" cy="66" rx="8" ry="7" fill="#fff"/><ellipse cx="74" cy="66" rx="8" ry="7" fill="#fff"/><g class="blink"><circle cx="42" cy="67" r="3.6" fill="#22301A"/><circle cx="70" cy="67" r="3.6" fill="#22301A"/></g><path d="M37 63h18M65 63h18" stroke="#5C9E3E" stroke-width="4.5" stroke-linecap="round"/>' :
    '<ellipse cx="46" cy="66" rx="8" ry="7" fill="#fff"/><ellipse cx="74" cy="66" rx="8" ry="7" fill="#fff"/><g class="blink"><circle cx="47" cy="68" r="3.6" fill="#22301A"/><circle cx="75" cy="68" r="3.6" fill="#22301A"/></g><path d="M37 63h18M65 63h18" stroke="#5C9E3E" stroke-width="4.5" stroke-linecap="round"/>';
  var mouth = mood==='whisper' ?
    '<ellipse cx="54" cy="86" rx="4" ry="3" fill="#22301A"/><ellipse cx="34" cy="86" rx="9" ry="7" fill="#7CBE52"/><g class="dots"><circle cx="16" cy="78" r="2.4" fill="#5C9E3E"/><circle cx="10" cy="72" r="2" fill="#5C9E3E"/><circle cx="5" cy="66" r="1.6" fill="#5C9E3E"/></g>' :
    '<path d="M46 86q14 8 28-2" stroke="#22301A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M57 88l3 6 3-5" fill="#fff" stroke="#22301A" stroke-width="1.4" stroke-linejoin="round"/>';
  return '<svg class="chr chr-yeu m-'+mood+'" viewBox="0 0 120 120" aria-hidden="true">'+
    '<path d="M60 14q4 6 0 12" stroke="#5C9E3E" stroke-width="4" fill="none" stroke-linecap="round"/>'+
    '<g class="body"><path d="M24 74c0-26 14-46 36-46s36 20 36 46c0 22-16 32-36 32S24 96 24 74z" fill="#8CCB5E"/>'+
    (mood==='whisper'?'':'<path d="M24 78q-14-2-16-14M96 78q14-2 16-14" stroke="#6FB04A" stroke-width="5" fill="none" stroke-linecap="round"/>')+
    eyes+mouth+'</g></svg>';
}
var CHAR = {
  hau:{n:'Ngộ Không', draw:hau, moods:['hi','cheer','think','wow','worry','soi']},
  tan:{n:'Chú Tanaka', draw:tanaka, moods:['hi','praise','serious','worry']},
  ho:{n:'Hồ Ly Ba Mặt', draw:holy, moods:['sly','sweet','angry']},
  ngu:{n:'Lão Đỏ Đen', draw:ngu, moods:['smug','tempt','angry']},
  yeu:{n:'Yêu "Chắc Không Sao"', draw:yeu, moods:['sly','whisper','deflated']}
};
function av(id,mood){ return CHAR[id].draw(mood); }

function cloudSVG(fill){
  fill = fill||'#fff';
  return '<svg viewBox="0 0 220 70" aria-hidden="true"><path d="M18 58c-10 0-14-12-6-18 2-12 16-16 24-8 6-14 28-18 38-4 10-14 34-12 40 4 8-8 24-6 28 6 12-4 26 4 24 16 10 2 12 16 0 18H18z" fill="'+fill+'" stroke="#DCE3FF" stroke-width="2"/>'+
    '<path d="M60 44q8-10 16 0q-6 6-12 2M128 42q8-9 16 0q-6 5-11 2" stroke="#C9D3FB" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>';
}
/* hoa văn mây cuộn (tường vân) cho văn điệp */
var CLOUDPAT = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Cg fill='none' stroke='%23FFE08A' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M20 60c0-10 12-14 18-8 4-10 20-10 24 0 8-4 16 2 14 10H20z'/%3E%3Cpath d='M34 52q6-7 12 0q-4 4-8 1'/%3E%3Cpath d='M90 125c0-9 11-12 16-7 4-9 18-9 22 0 7-3 14 2 12 9H90z'/%3E%3Cpath d='M103 118q5-6 10 0q-3 3-7 1'/%3E%3C/g%3E%3C/svg%3E\")";

/* bộ icon nét đều */
var IC = {
  map:'<path d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z"/><path d="M9 4v13M15 6.5v13"/>',
  book:'<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5.7 1.5 1.5z"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  next:'<path d="M9 5l7 7-7 7"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',
  lock:'<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  start:'<path d="M5 20c2-4 4-6 7-6s5 2 7 6"/><circle cx="12" cy="7" r="3.2"/><path d="M3 13c1.5-1 3-1 4.5 0M16.5 13c1.5-1 3-1 4.5 0"/>',
  gate:'<path d="M3 21V10l9-6 9 6v11"/><path d="M8 21v-7h8v7"/><path d="M3 10h18"/>',
  card:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2.2"/><path d="M6 16c.6-1.4 1.5-2 2.5-2s1.9.6 2.5 2M14 10h4M14 13.5h3"/>',
  house:'<path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M8 20v-5h8v5M8 15h8"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  bike:'<circle cx="6" cy="16" r="3.6"/><circle cx="18" cy="16" r="3.6"/><path d="M6 16l4-7h5l3 7M10 9l3 7h-7M14 6h3"/>',
  fox:'<path d="M4 4l4 6h8l4-6v8c0 4-4 8-8 8s-8-4-8-8z"/><path d="M9 13l1.5 1M15 13l-1.5 1M11 17h2"/>',
  dice:'<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  peak:'<path d="M3 20l6-10 4 6 3-4 5 8z"/><circle cx="17" cy="6" r="2.4"/>',
  seal:'<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/>',
  scroll:'<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7"/><path d="M6 4a2 2 0 0 0-2 2v1h4V6a2 2 0 0 0-2-2zM7 20a2 2 0 0 1-2-2V8"/><path d="M10 9h6M10 12.5h6M10 16h4"/>',
  eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/>',
  phone:'<path d="M6.5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z"/>',
  people:'<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2c2.2-.3 4.3 1.2 5 4.8"/>',
  building:'<path d="M4 20V6l8-3 8 3v14"/><path d="M9 20v-4h6v4M8 9h2M14 9h2M8 12.5h2M14 12.5h2"/>',
  siren:'<path d="M6 18v-5a6 6 0 0 1 12 0v5"/><path d="M4 18h16v2.5H4zM12 3v2M4.5 6l1.4 1.4M19.5 6l-1.4 1.4"/>',
  flame:'<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2.4 1.2-3.8 2.3-4.6.2 1.6 1 2.6 2.2 3C11 8.5 11 5.5 12 3z"/>',
  star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  download:'<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  upload:'<path d="M12 16V5M7 9.5l5-5 5 5M5 20h14"/>',
  expand:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  swipe:'<path d="M8 12h11M15 8l4 4-4 4M5 8v8"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  speaker:'<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  sound:'<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9.5a3.5 3.5 0 0 1 0 5"/>',
  mute:'<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
  shield:'<path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z"/><path d="M8.8 12.2l2.2 2.2 4.2-4.4"/>',
  redo:'<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6"/>',
  trash:'<path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13"/>',
  ask:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.6"/><circle cx="12" cy="17.2" r=".6" fill="currentColor"/>'
};
function icon(k,sz,sw){ sz=sz||22; return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(sw||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[k]||'')+'</svg>'; }

/* con dấu đỏ son trên văn điệp */
function sealSVG(k, sz){
  sz=sz||48; var fs = k.length>1 ? 30 : 44;
  return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-8 50 50)">'+
    '<circle cx="50" cy="50" r="44" fill="none" stroke="#C8372D" stroke-width="5"/><circle cx="50" cy="50" r="36" fill="none" stroke="#C8372D" stroke-width="2"/>'+
    '<text x="50" y="'+(k.length>1?60:65)+'" text-anchor="middle" font-family="M PLUS Rounded 1c, Hiragino Sans, sans-serif" font-weight="800" font-size="'+fs+'" fill="#C8372D">'+k+'</text></g></svg>';
}

/* =========================================================
   PHẦN 1b · HÌNH MINH HỌA (vẽ gốc bằng SVG)
   ========================================================= */
function wheel(cx,cy,r){ return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#23306B" stroke-width="4"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r-7)+'" fill="none" stroke="#C9D3FB" stroke-width="1.5"/><circle cx="'+cx+'" cy="'+cy+'" r="3" fill="#23306B"/>'; }
function bikeFrame(c,w){ c=c||'#2F4BD8'; w=w||4; return '<g stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M38 78L80 80L66 42L38 78M66 42L112 44L80 80M112 44L132 78"/><path d="M112 44L110 30L124 28"/></g><ellipse cx="64" cy="37" rx="11" ry="4" fill="#23306B"/><circle cx="80" cy="80" r="6" fill="none" stroke="#23306B" stroke-width="3"/><path d="M80 80l8 8M76 88h10" stroke="#23306B" stroke-width="3" stroke-linecap="round"/>'; }
function vehSVG(k){
  var h='<svg viewBox="0 0 170 110" aria-hidden="true">';
  if(k==='bike') h+=wheel(38,78,22)+wheel(132,78,22)+bikeFrame();
  else if(k==='assist') h+=wheel(38,78,22)+wheel(132,78,22)+bikeFrame()+
    '<rect x="86" y="50" width="14" height="30" rx="4" fill="#F4B63B" stroke="#C98A12" stroke-width="2" transform="rotate(-48 93 65)"/><path d="M95 58l-4 7h5l-4 7" stroke="#5A3B00" stroke-width="2" fill="none" stroke-linejoin="round"/>'+
    '<circle cx="80" cy="80" r="8" fill="#23306B"/>';
  else if(k==='moped') h+=wheel(38,78,22)+wheel(132,78,22)+bikeFrame('#23306B',5)+
    '<rect x="26" y="60" width="26" height="18" rx="4" fill="#4A5275"/><path d="M30 66h18M30 71h18" stroke="#8C93B0" stroke-width="1.5"/>'+
    '<rect x="118" y="25" width="10" height="7" rx="2" fill="#E8604F"/>'+
    '<rect x="8" y="40" width="22" height="15" rx="2" fill="#fff" stroke="#18203F" stroke-width="2"/><path d="M12 46h14M12 50h10" stroke="#18203F" stroke-width="1.5"/>'+
    '<circle cx="122" cy="46" r="4" fill="#FFE08A" stroke="#C98A12" stroke-width="1.5"/>';
  else if(k==='scooter') h+=wheel(42,84,17)+wheel(130,84,17)+
    '<path d="M28 80Q26 56 52 54L74 54Q78 70 94 70L116 70L112 40L120 40L126 72Q132 80 130 84" fill="#2F4BD8" stroke="#1D2F9E" stroke-width="2.5" stroke-linejoin="round"/>'+
    '<path d="M44 54Q46 44 66 46L72 54z" fill="#23306B"/><path d="M112 40l-2-12 14-2" stroke="#23306B" stroke-width="4" fill="none" stroke-linecap="round"/>'+
    '<rect x="122" y="24" width="9" height="6" rx="2" fill="#E8604F"/>'+
    '<rect x="10" y="58" width="22" height="15" rx="2" fill="#fff" stroke="#18203F" stroke-width="2"/><path d="M14 64h14M14 68h10" stroke="#18203F" stroke-width="1.5"/>'+
    '<circle cx="118" cy="48" r="4" fill="#FFE08A" stroke="#C98A12" stroke-width="1.5"/>';
  return h+'</svg>';
}
function vehRow(){
  return '<div class="vrow">'+[['assist','Xe đạp trợ lực','Pin trên khung, phải đạp mới chạy','ok'],['moped','Xe có ga, có bàn đạp','Tay ga, động cơ, biển số','no'],['scooter','Xe máy 50cc','Tay ga, biển số','no']].map(function(v){
    return '<div class="vcell"><div class="vimg">'+vehSVG(v[0])+'</div><b>'+v[1]+'</b><small>'+v[2]+'</small><span class="vtag '+v[3]+'">'+(v[3]==='ok'?'Không cần bằng':'Cần bằng lái')+'</span></div>'; }).join('')+'</div>';
}
function signSVG(k){
  var h='<svg viewBox="0 0 100 100" aria-hidden="true">';
  if(k==='tomare') h+='<path d="M8 14h84L50 90z" fill="#D7322A" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="M8 14h84L50 90z" fill="none" stroke="#D7322A" stroke-width="1.5" stroke-linejoin="round" transform="translate(0 0)"/><text x="50" y="41" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="M PLUS Rounded 1c,Hiragino Sans,sans-serif">止まれ</text>';
  else if(k==='hodo') h+='<circle cx="50" cy="50" r="44" fill="#1F5FB8" stroke="#fff" stroke-width="4"/><circle cx="50" cy="50" r="46" fill="none" stroke="#1F5FB8" stroke-width="1.5"/>'+
    '<g stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="34" cy="62" r="8"/><circle cx="58" cy="62" r="8"/><path d="M34 62l8-12h12l4 12M42 50l-2-5"/></g>'+
    '<circle cx="72" cy="30" r="4.5" fill="#fff"/><path d="M72 36v14M72 50l-5 12M72 50l5 12M65 42h14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>';
  else if(k==='kinshi') h+='<rect x="8" y="22" width="84" height="56" rx="5" fill="#fff" stroke="#D7322A" stroke-width="5"/><text x="50" y="56" text-anchor="middle" font-size="18" font-weight="800" fill="#D7322A" font-family="M PLUS Rounded 1c,Hiragino Sans,sans-serif">立入禁止</text><text x="50" y="70" text-anchor="middle" font-size="7" font-weight="700" fill="#18203F" font-family="sans-serif">KEEP OUT</text>';
  else if(k==='churin') h+='<circle cx="50" cy="44" r="34" fill="#fff" stroke="#D7322A" stroke-width="6"/><g stroke="#18203F" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="50" r="8"/><circle cx="64" cy="50" r="8"/><path d="M36 50l9-13h11l8 13M45 37l-2-5"/></g><path d="M26 20l48 48" stroke="#D7322A" stroke-width="6" stroke-linecap="round"/><rect x="20" y="82" width="60" height="15" rx="3" fill="#fff" stroke="#18203F" stroke-width="1.5"/><text x="50" y="93.5" text-anchor="middle" font-size="9.5" font-weight="800" fill="#D7322A" font-family="M PLUS Rounded 1c,Hiragino Sans,sans-serif">駐輪禁止</text>';
  return h+'</svg>';
}
function roomSVG(){
  return '<svg viewBox="0 0 360 230" class="smap__bg" preserveAspectRatio="none" aria-hidden="true">'+
    '<rect width="360" height="230" fill="#F7F3EA"/><rect y="150" width="360" height="80" fill="#E7D7BC"/>'+
    '<g stroke="#D6C29F" stroke-width="1.5"><path d="M0 170h360M0 190h360M0 210h360"/></g>'+
    '<rect x="0" y="120" width="72" height="110" fill="#CDBD9F"/><rect x="6" y="40" width="54" height="80" rx="3" fill="#B98A5A"/><circle cx="52" cy="82" r="3" fill="#F4B63B"/>'+
    '<path d="M10 170q8-6 18 0v6H10zM32 172q8-6 18 0v6H32z" fill="#2F4BD8"/>'+
    '<rect x="92" y="96" width="96" height="54" rx="4" fill="#fff" stroke="#C9C1B0" stroke-width="2"/><rect x="92" y="90" width="96" height="10" rx="3" fill="#DCD3C2"/>'+
    '<circle cx="118" cy="95" r="9" fill="#4A5275"/><circle cx="148" cy="95" r="9" fill="#4A5275"/><path d="M112 95h12M142 95h12" stroke="#FF8A1F" stroke-width="2"/>'+
    '<path d="M164 86q0-12 12-12t12 12z" fill="#E8604F"/><rect x="172" y="68" width="8" height="8" rx="2" fill="#4A5275"/>'+
    '<rect x="200" y="14" width="74" height="20" rx="5" fill="#fff" stroke="#C9C1B0" stroke-width="2"/><path d="M206 28h62" stroke="#C9C1B0" stroke-width="2"/>'+
    '<g stroke="#8FC3F0" stroke-width="2" stroke-linecap="round"><path d="M214 40v8M234 40v10M254 40v8"/></g>'+
    '<rect x="206" y="58" width="72" height="56" rx="3" fill="#D8ECFB" stroke="#B98A5A" stroke-width="4"/><path d="M242 58v56" stroke="#B98A5A" stroke-width="3"/>'+
    '<rect x="294" y="30" width="62" height="130" rx="3" fill="#E4F2FC" stroke="#B98A5A" stroke-width="4"/><path d="M300 54h50" stroke="#9AA6B8" stroke-width="2"/>'+
    '<path d="M310 54v10l-8 14h20l-8-14M334 54v10" stroke="#E8604F" stroke-width="2" fill="none"/><rect x="326" y="64" width="16" height="18" rx="2" fill="#F4B63B"/>'+
    '<g><rect x="232" y="168" width="22" height="30" rx="3" fill="#2F4BD8"/><rect x="258" y="168" width="22" height="30" rx="3" fill="#14A874"/><rect x="284" y="168" width="22" height="30" rx="3" fill="#F07A3E"/><path d="M232 172h22M258 172h22M284 172h22" stroke="rgba(255,255,255,.6)" stroke-width="2"/></g>'+
    '</svg>';
}
function spiralSVG(labels){
  var cx=150, cy=150, pts=[], path='';
  for(var t=0;t<=1.0001;t+=0.01){ var a=t*Math.PI*3.4 - Math.PI/2, r=128-t*104; var x=cx+r*Math.cos(a), y=cy+r*Math.sin(a); path+=(t===0?'M':'L')+x.toFixed(1)+' '+y.toFixed(1); }
  var n=labels.length, h='<svg viewBox="0 0 300 300" class="spiral" aria-hidden="true"><path d="'+path+'" fill="none" stroke="#E3E7F5" stroke-width="14" stroke-linecap="round"/><path d="'+path+'" fill="none" stroke="url(#sg)" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 9"/>'+
    '<defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4B63B"/><stop offset="1" stop-color="#C8373D"/></linearGradient></defs>';
  for(var i=0;i<n;i++){ var t=(i+0.5)/n, a=t*Math.PI*3.4 - Math.PI/2, r=128-t*104, x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
    var col=['#F4B63B','#F09A3A','#EA7A3E','#E25C42','#D24444','#B8323C'][i%6];
    h+='<g class="spn" style="animation-delay:'+(i*0.18)+'s"><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="15" fill="'+col+'" stroke="#fff" stroke-width="3"/><text x="'+x.toFixed(1)+'" y="'+(y+5).toFixed(1)+'" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="sans-serif">'+(i+1)+'</text></g>'; }
  return h+'</svg>';
}
function okReceipt(){
  return '<div class="okrec"><div class="okrec__h"><b>PHIẾU THU</b><small>Số 0125/PT</small></div>'+
    '<p><span>Đơn vị thu:</span> Công ty phái cử ABC (Giấy phép hoạt động dịch vụ số …)</p>'+
    '<p><span>Nội dung:</span> Tiền dịch vụ theo Hợp đồng số 123/HĐ</p>'+
    '<p><span>Hình thức:</span> Chuyển khoản vào tài khoản công ty</p>'+
    '<div class="okrec__seal">'+sealSVG('印',54)+'</div><div class="okrec__tag">Phiếu thu đúng: có tên, giấy phép, con dấu doanh nghiệp, khoản ghi theo hợp đồng.</div></div>';
}

/* =========================================================
   PHẦN 1d · HÌNH MINH HỌA BỔ SUNG (TK11)
   ========================================================= */
function illus(k){
  var s='<svg viewBox="0 0 64 64" aria-hidden="true">';
  if(k==='remit') s+='<rect x="8" y="22" width="30" height="32" rx="3" fill="#DCE3FF"/><path d="M6 24l17-12 17 12z" fill="#2F4BD8"/><rect x="18" y="38" width="10" height="16" fill="#2F4BD8"/><circle cx="46" cy="24" r="12" fill="#F4B63B"/><text x="46" y="29" text-anchor="middle" font-size="13" font-weight="800" fill="#5A3B00" font-family="sans-serif">¥</text><path d="M40 44h16l-5-5M56 44l-5 5" stroke="#14A874" stroke-width="3" fill="none" stroke-linecap="round"/>';
  if(k==='cash') s+='<rect x="10" y="16" width="40" height="22" rx="3" fill="#BFE6D3" stroke="#14A874" stroke-width="2"/><circle cx="30" cy="27" r="6" fill="none" stroke="#14A874" stroke-width="2"/><path d="M6 44q10-8 22-2h14q4 0 4 4t-4 4H26" stroke="#B9773E" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M6 44v12h20" stroke="#B9773E" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M50 12l6-6M54 18l7-2" stroke="#E8604F" stroke-width="2.4" stroke-linecap="round"/>';
  if(k==='tiktok') s+='<rect x="18" y="6" width="28" height="52" rx="6" fill="#18203F"/><rect x="21" y="12" width="22" height="38" rx="2" fill="#2C2730"/><path d="M34 20v14a5 5 0 1 1-4-5" stroke="#35D0E0" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M34 20q2 6 7 6" stroke="#FF4FA3" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="50" cy="14" r="8" fill="#F4B63B"/><text x="50" y="18" text-anchor="middle" font-size="10" font-weight="800" fill="#5A3B00" font-family="sans-serif">¥</text>';
  if(k==='iphone') s+='<rect x="12" y="8" width="26" height="48" rx="6" fill="#4A5275"/><rect x="15" y="14" width="20" height="34" rx="2" fill="#C9D3FB"/><path d="M36 30l14-8 10 10-14 14z" fill="#E8604F"/><circle cx="51" cy="28" r="2" fill="#fff"/><text x="47" y="41" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" font-family="sans-serif" transform="rotate(-30 47 38)">-50%</text>';
  if(k==='bank') s+='<path d="M6 24L32 8l26 16z" fill="#2F4BD8"/><rect x="10" y="24" width="44" height="4" fill="#1D2F9E"/><g fill="#DCE3FF"><rect x="13" y="30" width="6" height="18"/><rect x="25" y="30" width="6" height="18"/><rect x="37" y="30" width="6" height="18"/><rect x="47" y="30" width="5" height="18"/></g><rect x="8" y="48" width="48" height="6" fill="#1D2F9E"/><circle cx="50" cy="14" r="9" fill="#14A874"/><path d="M45.5 14l3 3 6-6" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  if(k==='quake') s+='<path d="M10 30L30 14l20 16v24H10z" fill="#F4E3C3" stroke="#8E5A2B" stroke-width="2"/><path d="M28 30l4 6-5 5 4 6" stroke="#E8604F" stroke-width="2.4" fill="none"/><path d="M4 58q6-5 12 0t12 0 12 0 12 0 12 0" stroke="#2F4BD8" stroke-width="2.4" fill="none"/><circle cx="52" cy="12" r="8" fill="#FFE08A" stroke="#C98A12"/><text x="52" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#7A5300" font-family="sans-serif">?</text>';
  if(k==='idcard') s+='<rect x="6" y="14" width="52" height="36" rx="4" fill="#EAF4FF" stroke="#9FB2E6" stroke-width="2"/><rect x="11" y="20" width="14" height="18" rx="2" fill="#C9D3FB"/><circle cx="18" cy="26" r="3.5" fill="#8C93B0"/><path d="M12 37q6-6 12 0" fill="#8C93B0"/><path d="M30 22h22M30 28h18M30 34h20M12 44h40" stroke="#9FB2E6" stroke-width="2"/>';
  if(k==='credit') s+='<rect x="6" y="16" width="52" height="32" rx="4" fill="#2F4BD8"/><rect x="6" y="22" width="52" height="6" fill="#1D2F9E"/><rect x="12" y="34" width="12" height="8" rx="1.5" fill="#F4B63B"/><path d="M30 38h22" stroke="#DCE3FF" stroke-width="2"/>';
  if(k==='broom') s+='<path d="M40 6L24 34" stroke="#8E5A2B" stroke-width="4" stroke-linecap="round"/><path d="M18 30l14 8-8 18q-10-2-16-10z" fill="#F4B63B" stroke="#C98A12" stroke-width="1.5"/><path d="M14 44l6 4M18 40l8 6" stroke="#C98A12" stroke-width="1.4"/><g fill="#8FC3F0"><circle cx="46" cy="44" r="3"/><circle cx="52" cy="36" r="2"/></g>';
  if(k==='coin') s+='<circle cx="26" cy="38" r="16" fill="#F4B63B" stroke="#C98A12" stroke-width="2"/><text x="26" y="44" text-anchor="middle" font-size="16" font-weight="800" fill="#7A5300" font-family="sans-serif">¥</text><circle cx="44" cy="22" r="12" fill="#FFE08A" stroke="#C98A12" stroke-width="2"/><path d="M38 22h12M44 16v12" stroke="#7A5300" stroke-width="2"/>';
  if(k==='clock') s='<svg viewBox="0 0 160 110" aria-hidden="true"><rect x="40" y="8" width="62" height="94" rx="8" fill="#DCE3FF" stroke="#4A5275" stroke-width="2.5"/><circle cx="71" cy="36" r="20" fill="#fff" stroke="#4A5275" stroke-width="2.5"/><path d="M71 36V22M71 36l11 6" stroke="#18203F" stroke-width="3" stroke-linecap="round"/><rect x="54" y="66" width="34" height="8" rx="2" fill="#18203F"/><rect x="62" y="48" width="18" height="24" rx="2" fill="#FFF7E3" stroke="#C98A12" transform="rotate(-8 71 60)"/><path d="M66 54h10M66 58h8" stroke="#C98A12" stroke-width="1.5" transform="rotate(-8 71 60)"/>'+
    '<rect x="112" y="20" width="36" height="74" rx="4" fill="#F7F3EA" stroke="#9AA6B8" stroke-width="2"/><g fill="#fff" stroke="#C9C1B0"><rect x="116" y="26" width="12" height="16"/><rect x="132" y="26" width="12" height="16"/><rect x="116" y="46" width="12" height="16"/><rect x="132" y="46" width="12" height="16"/><rect x="116" y="66" width="12" height="16"/></g>'+
    '<g transform="translate(16 40)"><circle r="14" fill="#FFE08A" stroke="#C98A12" stroke-width="2"/><text y="5" text-anchor="middle" font-size="12" font-weight="800" fill="#7A5300" font-family="sans-serif">5′</text></g>';
  return s+'</svg>';
}
function suitcaseSVG(items){
  var slots=[[44,52],[86,52],[128,52],[65,82],[107,82]];
  var h='<svg viewBox="0 0 180 120" class="suit" aria-hidden="true"><rect x="70" y="6" width="40" height="16" rx="6" fill="none" stroke="#8E5A2B" stroke-width="5"/><rect x="18" y="20" width="144" height="94" rx="12" fill="#C98A5A" stroke="#8E5A2B" stroke-width="3"/><path d="M18 46h144" stroke="#8E5A2B" stroke-width="2.5"/><rect x="84" y="40" width="12" height="12" rx="2" fill="#F4B63B" stroke="#8E5A2B"/>';
  items.forEach(function(it,i){ var p=slots[i]; if(!p) return; h+='<g transform="translate('+(p[0]-15)+' '+(p[1]-15)+')" class="'+(it.on?'sin':'soff')+'"><rect width="30" height="30" rx="7" fill="'+(it.on?'#FFFBF0':'#B07A4A')+'" stroke="'+(it.on?'#fff':'#8E5A2B')+'" stroke-width="2"/>'+(it.on?'<g transform="translate(3 3) scale(.375)">'+illus(it.k).replace(/^<svg[^>]*>|<\/svg>$/g,'')+'</g>':'<text x="15" y="20" text-anchor="middle" font-size="14" font-weight="800" fill="#8E5A2B" font-family="sans-serif">?</text>')+'</g>'; });
  return h+'</svg>';
}
function streetSVG(){
  var st=function(x,y){ return '<g transform="translate('+x+' '+y+')"><rect x="-30" y="22" width="76" height="6" fill="#9AA6B8"/><path d="M-30 30h76" stroke="#6B6B78" stroke-width="2" stroke-dasharray="4 3"/><rect x="-26" y="4" width="28" height="18" fill="#FFF7E3" stroke="#B98A5A"/><path d="M-30 5l16-10 16 10z" fill="#8E3A2B"/><rect x="-21" y="9" width="18" height="7" rx="1" fill="#2F4BD8"/><text x="-12" y="15" text-anchor="middle" font-size="6" font-weight="800" fill="#fff" font-family="sans-serif">駅</text>'+
      '<rect x="6" y="8" width="38" height="14" rx="5" fill="#14A874"/><rect x="6" y="15" width="38" height="3" fill="#fff"/><g fill="#DCF5EB"><rect x="10" y="10" width="7" height="4" rx="1"/><rect x="20" y="10" width="7" height="4" rx="1"/><rect x="30" y="10" width="7" height="4" rx="1"/></g></g>'; };
  var sp=function(x,y){ return '<g transform="translate('+x+' '+y+')"><rect x="-26" y="10" width="52" height="24" fill="#fff" stroke="#C9C1B0"/><rect x="-28" y="-2" width="56" height="10" rx="2" fill="#F07A3E"/><text x="0" y="6" text-anchor="middle" font-size="7" font-weight="800" fill="#fff" font-family="M PLUS Rounded 1c,sans-serif">スーパー</text>'+
      '<g>'+[0,1,2,3,4,5].map(function(i){ return '<rect x="'+(-26+i*8.7)+'" y="8" width="8.7" height="5" fill="'+(i%2?'#fff':'#E8604F')+'"/>'; }).join('')+'</g><rect x="-7" y="20" width="14" height="14" fill="#BFE0F5"/>'+
      '<g transform="translate(32 26)" stroke="#4A5275" stroke-width="1.6" fill="none"><path d="M-6-6h3l3 8h8l2-6h-12"/><circle cx="1" cy="5" r="1.6"/><circle cx="7" cy="5" r="1.6"/></g></g>'; };
  var fd=function(x,y){ var h='<g transform="translate('+x+' '+y+')">'; for(var i=0;i<4;i++){ h+='<rect x="-34" y="'+(6+i*8)+'" width="68" height="5" rx="2.5" fill="#B98A5A"/>'; for(var j=0;j<5;j++){ h+='<path d="M'+(-28+j*14)+' '+(6+i*8)+'q-4-6 0-8q4 2 0 8z" fill="#5E9A4A"/>'; } } return h+'<ellipse cx="22" cy="36" rx="7" ry="4" fill="#9B4F8E" transform="rotate(-20 22 36)"/></g>'; };
  var pk=function(x,y){ return '<g transform="translate('+x+' '+y+')"><path d="M-22 34v-14" stroke="#7A5A48" stroke-width="3"/><circle cx="-22" cy="12" r="12" fill="#8CC06F"/><circle cx="-14" cy="18" r="8" fill="#9ACB7E"/>'+
      '<path d="M2 34L10 8L18 34M28 34L20 8" stroke="#8E5A2B" stroke-width="2.4" fill="none"/><path d="M10 8h10" stroke="#8E5A2B" stroke-width="2.4"/><path d="M13 9v14M17 9v14" stroke="#9AA6B8" stroke-width="1"/><rect x="11" y="23" width="8" height="2.5" fill="#E8604F"/>'+
      '<rect x="-6" y="28" width="14" height="3" fill="#B98A5A"/><path d="M-5 31v4M7 31v4" stroke="#8E5A2B" stroke-width="1.5"/></g>'; };
  var bc=function(x,y){ return '<g transform="translate('+x+' '+y+')"><ellipse cx="0" cy="24" rx="40" ry="12" fill="#F2E2B8"/><path d="M-20 22q4-8 8 0zM-22 22h12" fill="#F4B6A8" stroke="#E08A78" stroke-width="1"/><path d="M6 26q4-7 8 0z" fill="#FFE0B8" stroke="#E0A878" stroke-width="1"/><path d="M18 14h10l-2 12h-6z" fill="#E8604F"/><path d="M19 14q4-6 8 0" stroke="#4A5275" stroke-width="1.2" fill="none"/></g>'; };
  var bw=function(x,y){ var h='<g transform="translate('+x+' '+y+')"><path d="M-40 30L30 12" stroke="#9AA6B8" stroke-width="8" stroke-linecap="round"/>'; [-30,-16,-2,12].forEach(function(t,i){ h+='<g transform="translate('+t+' '+(27-i*4)+')" fill="#C9CED8" stroke="#8C93B0" stroke-width="1"><path d="M0 0l-6 5M0 0l6 5M0 0v-7"/><circle r="2.4"/></g>'; });
      return h+'<rect x="30" y="-14" width="10" height="28" fill="#fff" stroke="#8C93B0"/><rect x="30" y="-6" width="10" height="5" fill="#E8604F"/><rect x="30" y="4" width="10" height="5" fill="#E8604F"/><path d="M28-14h14l-7-8z" fill="#E8604F"/><circle cx="35" cy="-17" r="2" fill="#FFE08A"/></g>'; };
  return '<svg viewBox="0 0 360 230" class="smap__bg" preserveAspectRatio="none" aria-hidden="true">'+
    '<rect width="360" height="230" fill="#EAF3E1"/>'+
    '<path d="M196 160Q250 140 300 156T360 146V230H170Q182 186 196 160Z" fill="#BFE0F0"/><path d="M196 160Q250 140 300 156T360 146" stroke="#F2E2B8" stroke-width="8" fill="none"/>'+
    '<path d="M0 118C80 108 140 126 200 110S300 92 360 96" stroke="#D9DEEA" stroke-width="18" fill="none"/><path d="M0 118C80 108 140 126 200 110S300 92 360 96" stroke="#fff" stroke-width="2" stroke-dasharray="8 8" fill="none"/>'+
    '<path d="M138 0C130 60 150 90 140 230" stroke="#D9DEEA" stroke-width="14" fill="none"/>'+
    st(58,72)+sp(158,64)+fd(274,58)+pk(108,158)+bc(216,184)+bw(298,160)+
    '</svg>';
}

/* =========================================================
   PHẦN 1c · BẢN ĐỒ DU KÝ · phong cách giấy cắt dán + thủy mặc
   Đất Việt (Tràng An) ở trên, vượt biển, xuống dần tới xứ Phù Tang.
   ========================================================= */
var MAPW=360, MAPH=1240;
var MPOS={0:[100,140],1:[262,226],2:[104,520],3:[258,618],4:[102,718],5:[258,818],6:[102,918],7:[258,1006],8:[170,1168]};
function mapDefs(){
  return '<defs>'+
   '<filter id="stk" x="-25%" y="-25%" width="150%" height="150%"><feMorphology in="SourceAlpha" operator="dilate" radius="2.6" result="d"/><feFlood flood-color="#FFFDF6"/><feComposite in2="d" operator="in" result="w"/>'+
     '<feGaussianBlur in="d" stdDeviation="2.4" result="b"/><feOffset in="b" dx="1.5" dy="3.5" result="o"/><feFlood flood-color="#3A2A10" flood-opacity=".3"/><feComposite in2="o" operator="in" result="sh"/>'+
     '<feMerge><feMergeNode in="sh"/><feMergeNode in="w"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'+
   '<filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .45 0 0 0 0 .36 0 0 0 0 .2 0 0 0 .09 0"/></filter>'+
   '<linearGradient id="ink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4E5D6C" stop-opacity=".55"/><stop offset="1" stop-color="#4E5D6C" stop-opacity="0"/></linearGradient>'+
   '<linearGradient id="inkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3F6B4C" stop-opacity=".5"/><stop offset="1" stop-color="#3F6B4C" stop-opacity="0"/></linearGradient>'+
   '<linearGradient id="inkf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7D8B97" stop-opacity=".38"/><stop offset=".75" stop-color="#7D8B97" stop-opacity=".06"/><stop offset="1" stop-color="#7D8B97" stop-opacity="0"/></linearGradient>'+
   '<linearGradient id="inkn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34414D" stop-opacity=".6"/><stop offset=".7" stop-color="#34414D" stop-opacity=".12"/><stop offset="1" stop-color="#34414D" stop-opacity="0"/></linearGradient>'+
   '<linearGradient id="inkgn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2F5A3E" stop-opacity=".62"/><stop offset=".7" stop-color="#2F5A3E" stop-opacity=".14"/><stop offset="1" stop-color="#2F5A3E" stop-opacity="0"/></linearGradient>'+
   '<radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#6B4A1E" stop-opacity="0"/><stop offset="1" stop-color="#6B4A1E" stop-opacity=".38"/></radialGradient>'+
   '<linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'+
   '<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A9CFD3"/><stop offset="1" stop-color="#7FB2BC"/></linearGradient>'+
   '<linearGradient id="fuji" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A6FA8"/><stop offset="1" stop-color="#8FA0C9"/></linearGradient>'+
     '</defs>';
}
function inkRange(x,y,w,h,peaks,grad,seed){
  /* dãy núi khép kín, chân núi thoải dần xuống, không cắt thẳng */
  var pts=[[x,y]], n=peaks, s=seed||1;
  for(var i=0;i<n;i++){ var px=x+w*(i+.5)/n, ph=h*(0.6+0.4*Math.abs(Math.sin((i+1)*s*1.7))); var vx=x+w*(i+1)/n;
    pts.push([px-w/(n*3.2), y-ph*.55],[px, y-ph],[px+w/(n*3.2), y-ph*.5]); if(i<n-1) pts.push([vx, y-ph*.32]); }
  pts.push([x+w,y]);
  var d='M'+pts[0][0]+' '+pts[0][1];
  for(var k=1;k<pts.length;k++){ var p=pts[k], q=pts[k-1]; d+=' Q'+((q[0]+p[0])/2).toFixed(1)+' '+(Math.min(q[1],p[1])-2).toFixed(1)+' '+p[0].toFixed(1)+' '+p[1].toFixed(1); }
  d+=' Q'+(x+w/2)+' '+(y+10)+' '+x+' '+y+'Z';
  return '<path d="'+d+'" fill="url(#'+grad+')"/><path d="'+d.replace(/Z$/,'')+'" fill="none" stroke="#3E4A55" stroke-opacity=".22" stroke-width="1.2"/>';
}
function birds(x,y,cls){ return '<g class="bird '+(cls||'')+'" transform="translate('+x+' '+y+')"><g fill="none" stroke="#3E4A55" stroke-width="1.6" stroke-linecap="round"><path d="M0 0q4-4 8 0q4-4 8 0"/><path d="M14 8q3-3 6 0q3-3 6 0"/><path d="M-10 10q3-3 6 0q3-3 6 0"/></g></g>'; }
function waves(){ var h='<g stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7">'; var rows=[[340,[20,110,200,290]],[366,[60,150,245,320]],[392,[30,100,215,300]],[418,[70,170,260,330]],[446,[25,120,210,305]]];
  rows.forEach(function(r){ r[1].forEach(function(x){ h+='<path class="wv" d="M'+x+' '+r[0]+'q5-4 10 0t10 0"/>'; }); }); return h+'</g>'; }
function star5(cx,cy,r,fill){ var p=''; for(var i=0;i<10;i++){ var a=-Math.PI/2+i*Math.PI/5, rr=i%2?r*.4:r; p+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(2)+' '+(cy+rr*Math.sin(a)).toFixed(2); } return '<path d="'+p+'Z" fill="'+fill+'"/>'; }
function bamboo(x,y,h){ var s=''; for(var i=0;i<3;i++){ var xx=x+i*6; s+='<path d="M'+xx+' '+y+'v-'+(h-i*6)+'" stroke="#5E8F4A" stroke-width="2.6" stroke-linecap="round"/>'; for(var k=1;k<4;k++){ var yy=y-k*(h/4)-i*2; s+='<path d="M'+xx+' '+yy+'q8-4 13 1q-8 3-13-1zM'+xx+' '+(yy+3)+'q-8-4-12 1q7 3 12-1z" fill="#7DB35F"/>'; } } return '<g>'+s+'</g>'; }
function sakura(x,y,s){ s=s||1; return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 22q2-14-6-24M0 10q6-8 14-10" stroke="#7A5A48" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
  '<circle cx="-8" cy="-6" r="9" fill="#F6BFD0"/><circle cx="4" cy="-10" r="10" fill="#F9CCDA"/><circle cx="15" cy="-3" r="8" fill="#F6BFD0"/><circle cx="-1" cy="2" r="7" fill="#FBD8E3"/>'+
  '<g fill="#E58AA8"><circle cx="-6" cy="-8" r="1.4"/><circle cx="6" cy="-12" r="1.4"/><circle cx="14" cy="-4" r="1.4"/><circle cx="0" cy="0" r="1.2"/></g></g>'; }
function pine(x,y){ return '<g transform="translate('+x+' '+y+')"><path d="M0 20v-8" stroke="#6B4A2E" stroke-width="3"/><path d="M-14 12h28l-14-12zM-11 4h22l-11-11zM-8-4h16l-8-10z" fill="#3E6B4E"/></g>'; }
function lmk(n,c){
  var x=MPOS[n][0], y=MPOS[n][1], g='<g filter="url(#stk)" transform="translate('+x+' '+(y-28)+') scale(.8)">';
  if(n===0){ /* Tràng An · Hoa Lư · cờ đỏ sao vàng */
    g+='<path d="M-64 28Q-62-24-46-40Q-34-52-28-24Q-24-6-16 28Z" fill="#5C8A66"/><path d="M-22 28Q-18-46-2-72Q16-50 20 28Z" fill="#3F6B4C"/><path d="M14 28Q20-20 36-38Q52-26 58 28Z" fill="#6E9A72"/>'+
      '<path d="M-44-34q6 10 2 30M-4-62q8 20 4 52M34-30q6 12 2 30" stroke="#2E5238" stroke-width="2" fill="none" opacity=".55"/>'+
      '<path d="M-68 22Q0 10 68 22V34H-68Z" fill="#8EC1CF"/><path d="M-50 27q8-3 16 0M10 26q8-3 16 0" stroke="#fff" stroke-width="1.4" fill="none"/>'+
      '<path d="M-8 22h22l-4 5h-14z" fill="#8E5A2B"/><path d="M2 22v-10" stroke="#8E5A2B" stroke-width="1.5"/><path d="M2 12l8 9h-8z" fill="#F4E3C3"/>'+
      '<g transform="translate(-40 6)"><rect x="-12" y="-4" width="24" height="18" fill="#C9B79A"/><path d="M-4 14v-9q4-5 8 0v9z" fill="#4A3A2A"/><path d="M-17-4h34l-5-7h-24z" fill="#8E3A2B"/><path d="M-12-11h24l-4-6h-16z" fill="#A9453A"/></g>'+
      '';
  }
  if(n===1){ /* Cổng làng + lũy tre */
    g+=bamboo(-62,28,52)+bamboo(44,28,56)+
      '<rect x="-34" y="-12" width="68" height="40" fill="#E8DCC4"/><path d="M-12 28v-20q12-14 24 0v20z" fill="#5B4632"/>'+
      '<path d="M-44-10Q0-24 44-10L38-20Q0-32-38-20Z" fill="#8E5A2B"/><path d="M-26-24Q0-34 26-24L20-34Q0-42-20-34Z" fill="#A86A36"/>'+
      '<g stroke="#6B4220" stroke-width="1"><path d="M-30-17l2-6M-18-20l1-6M-6-21v-6M6-21v-6M18-20l-1-6M30-17l-2-6"/></g>'+
      '<rect x="-12" y="-6" width="24" height="9" rx="1.5" fill="#F4E3C3" stroke="#8E5A2B"/><path d="M-7-1.5h14" stroke="#8E5A2B" stroke-width="1.4"/>';
  }
  if(n===2){ /* Torii treo tấm thẻ */
    g+='<rect x="-30" y="-36" width="8" height="64" fill="#D23B2B"/><rect x="22" y="-36" width="8" height="64" fill="#D23B2B"/>'+
      '<path d="M-44-46Q0-56 44-46L42-38Q0-47-42-38Z" fill="#2A2A2A"/><path d="M-40-38Q0-46 40-38V-33H-40Z" fill="#D23B2B"/><rect x="-36" y="-26" width="72" height="6" fill="#D23B2B"/><rect x="-3" y="-33" width="6" height="8" fill="#D23B2B"/>'+
      '<path d="M-6-20v6M6-20v6" stroke="#6B4A2E" stroke-width="1.2"/><rect x="-14" y="-14" width="28" height="20" rx="2.5" fill="#fff" stroke="'+c+'" stroke-width="2"/><rect x="-10" y="-10" width="9" height="11" rx="1.5" fill="#C9D3FB"/><path d="M1-8h9M1-4h7M1 0h8" stroke="'+c+'" stroke-width="1.4"/>'+
      '<rect x="-34" y="26" width="16" height="4" fill="#9AA6B8"/><rect x="18" y="26" width="16" height="4" fill="#9AA6B8"/>';
  }
  if(n===3){ /* Nhà mái tranh Shirakawa-go */
    g+='<path d="M-46 22L0-54L46 22Z" fill="#9A7B4F"/><g stroke="#7A5E38" stroke-width="1.2" opacity=".8"><path d="M-36 14L0-44M-24 18L0-30M36 14L0-44M24 18L0-30M-40 8h80M-30-6h60M-18-22h36"/></g>'+
      '<path d="M-46 22L0-54L46 22" fill="none" stroke="#5E4628" stroke-width="2.4"/>'+
      '<rect x="-32" y="6" width="64" height="24" fill="#F4EFE4"/><g stroke="#4A3A2A" stroke-width="2"><path d="M-32 6h64M-32 18h64M-16 6v24M0 6v24M16 6v24"/></g>'+
      '<rect x="-12" y="-14" width="10" height="9" fill="#FFE08A"/><rect x="2" y="-14" width="10" height="9" fill="#FFE08A"/><path d="M-44 20l-6 6M44 20l6 6" stroke="#fff" stroke-width="2" opacity=".8"/>';
  }
  if(n===4){ /* Lò rèn kiếm Seki */
    g+='<rect x="-36" y="-12" width="58" height="40" fill="#D9CBB6"/><path d="M-42-10h70l-12-16h-46z" fill="#3E3A44"/><rect x="10" y="-46" width="10" height="30" fill="#6B6B78"/>'+
      '<g class="smoke"><circle cx="15" cy="-54" r="6" fill="#E3E6EE"/><circle cx="21" cy="-64" r="5" fill="#E3E6EE"/><circle cx="16" cy="-74" r="4" fill="#E3E6EE"/></g>'+
      '<path d="M-24 28v-22h20v22z" fill="#2C2730"/><path d="M-21 26q7-12 14 0z" fill="#FF8A1F" class="glow"/>'+
      '<path d="M26 28h18l-3-8h-12z" fill="#4A5275"/><path d="M28 20h14v-4h-14z" fill="#6B6B78"/>'+
      '<g class="spark"><circle cx="33" cy="10" r="1.6" fill="#FFD54A"/><circle cx="38" cy="6" r="1.2" fill="#FFB020"/><circle cx="29" cy="5" r="1.2" fill="#FFD54A"/></g>'+
      '<g transform="translate(-6 -2) rotate(-18)"><path d="M0 0l30-2" stroke="#C9D3E6" stroke-width="3" stroke-linecap="round"/><path d="M-2-3v6" stroke="#8E5A2B" stroke-width="3"/><path d="M-10 0h8" stroke="#2C2730" stroke-width="3" stroke-linecap="round"/></g>';
  }
  if(n===5){ /* Phố có tháp Tokyo */
    g+='<g transform="translate(18 0)"><path d="M-14 28L-2-74h4L14 28z" fill="#E8533A"/><g fill="#fff"><path d="M-10 6h20l-1-6h-18zM-6-26h12l-1-6h-10zM-3-52h6l-.5-6h-5z"/></g><path d="M-14 28L0-16 14 28M-9 8L0-40 9 8" stroke="#B23A28" stroke-width="1" fill="none"/><rect x="-8" y="-20" width="16" height="5" fill="#C9D3E6"/></g>'+
      '<rect x="-52" y="-6" width="26" height="34" fill="#F4E3E9" stroke="#B9A0A8"/><rect x="-24" y="-18" width="22" height="46" fill="#FFF7E3" stroke="#B9A0A8"/>'+
      '<g fill="#8FB6E8"><rect x="-48" y="0" width="6" height="6"/><rect x="-36" y="0" width="6" height="6"/><rect x="-48" y="12" width="6" height="6"/><rect x="-20" y="-12" width="6" height="6"/><rect x="-10" y="-12" width="6" height="6"/><rect x="-20" y="2" width="6" height="6"/></g>'+
      '<path d="M40 28V2" stroke="#4A5275" stroke-width="2"/><rect x="36" y="-12" width="8" height="16" rx="2" fill="#2C2730"/><circle cx="40" cy="-8" r="2" fill="#E8604F"/><circle cx="40" cy="0" r="2" fill="#14A874"/>'+
      '<g stroke="#2F4BD8" stroke-width="1.6" fill="none"><circle cx="-44" cy="34" r="4"/><circle cx="-32" cy="34" r="4"/><path d="M-44 34l5-6h5l3 6"/></g>';
  }
  if(n===6){ /* Cổng đỏ nối dài · cáo đá */
    g+='<path d="M-50 28q-4-34 10-48q6-20 26-16q12-16 30-2q20 0 22 20q14 12 10 46z" fill="#3F6B45"/>';
    [[22,-30,.55],[10,-18,.72],[-4,-4,.9]].forEach(function(t){ var s=t[2]; g+='<g transform="translate('+t[0]+' '+t[1]+') scale('+s+')"><rect x="-22" y="-20" width="6" height="48" fill="#E23D2A"/><rect x="16" y="-20" width="6" height="48" fill="#E23D2A"/><path d="M-30-26Q0-32 30-26V-20H-30Z" fill="#2A2A2A"/><rect x="-24" y="-14" width="48" height="5" fill="#E23D2A"/></g>'; });
    g+='<circle cx="-5" cy="16" r="2.4" fill="#FFD54A" class="glow"/><circle cx="5" cy="16" r="2.4" fill="#FFD54A" class="glow"/>'+
      '<g transform="translate(-40 10)"><path d="M-8 18v-14q0-10 8-14l2-10 3 9q6 4 6 15v14z" fill="#E9E4DA"/><path d="M-6 0h14l-2 6h-10z" fill="#E23D2A"/><circle cx="2" cy="-12" r="1.2" fill="#2C2730"/></g>';
  }
  if(n===7){ /* Phố đèn neon Dōtonbori */
    g+='<rect x="-50" y="-30" width="30" height="58" fill="#2C2730"/><rect x="-18" y="-46" width="34" height="74" fill="#3A3442"/><rect x="18" y="-22" width="30" height="50" fill="#2C2730"/>'+
      '<g class="neon"><rect x="-46" y="-24" width="8" height="34" rx="2" fill="#FF4FA3"/><rect x="-12" y="-40" width="22" height="10" rx="2" fill="#35D0E0"/><rect x="-12" y="-24" width="22" height="10" rx="2" fill="#FFD54A"/><rect x="24" y="-16" width="18" height="18" rx="3" fill="#FF6B3D"/></g>'+
      '<g fill="#fff"><circle cx="29" cy="-11" r="1.6"/><circle cx="37" cy="-3" r="1.6"/><circle cx="33" cy="-7" r="1.6"/></g>'+
      '<path d="M-58 28h116v6h-116z" fill="#4C6E8A"/><path d="M-40 31h10M-6 31h14M26 31h10" stroke="#FFD54A" stroke-width="1.6" opacity=".7"/>'+
      '<g class="lantern"><ellipse cx="-30" cy="-36" rx="5" ry="7" fill="#E8604F"/><ellipse cx="34" cy="-30" rx="5" ry="7" fill="#E8604F"/></g>';
  }
  if(n===8){ /* Núi Phú Sĩ · mặt trời mọc */
    g+='<circle cx="26" cy="-46" r="22" fill="#E8533A"/><path d="M-66 28L-16-40Q0-52 16-40L66 28Z" fill="url(#fuji)"/><path d="M-16-40Q0-52 16-40L8-30L2-36L-4-28L-10-34Z" fill="#fff"/>'+
      '<path d="M-40 28q20-16 40 0q20-16 40 0" stroke="#fff" stroke-width="1.5" fill="none" opacity=".6"/>'+sakura(-56,10,.8)+sakura(54,14,.7);
  }
  return g+'</g>';
}
function fogSVG(n){ var x=MPOS[n][0], y=MPOS[n][1]-52;
  return '<g class="fog" transform="translate('+x+' '+y+') scale(.8)"><ellipse cx="0" cy="30" rx="96" ry="44" fill="#FBF8EF" opacity=".97"/><circle cx="-48" cy="2" r="36" fill="#FBF8EF"/><circle cx="0" cy="-20" r="44" fill="#FFFDF7"/><circle cx="50" cy="0" r="34" fill="#FBF8EF"/><circle cx="-14" cy="20" r="34" fill="#FFFDF7"/>'+
    '<g fill="none" stroke="#C9C2AE" stroke-width="2" stroke-linecap="round"><path d="M-58 8q12-16 26-2q-9 9-16 2q-2-5 2-6"/><path d="M10-18q14-16 28 0q-9 9-17 2q-2-5 2-6"/><path d="M-20 40q34 10 60-2"/></g></g>'; }
function segPath(a,b){ var A=MPOS[a],B=MPOS[b], my=(A[1]+B[1])/2; return 'M'+A[0]+' '+(A[1]+10)+' C'+A[0]+' '+my+' '+B[0]+' '+my+' '+B[0]+' '+(B[1]-76); }
function mapBg(){
  var h='<rect width="360" height="1240" fill="#E8D9B5"/><rect width="360" height="1240" filter="url(#paper)"/>'+
    /* Đất Việt: đồng lúa, thủy mặc */
    '<path d="M0 0H360V320Q270 300 180 316T0 312Z" fill="#DCE6C2" opacity=".85"/>'+
    inkRange(-30,250,260,120,4,'inkf',2)+inkRange(150,262,240,110,3,'inkf',5)+inkRange(-20,300,200,96,3,'inkg',3)+inkRange(190,306,190,86,3,'inkgn',7)+
    '<rect x="0" y="260" width="360" height="40" fill="url(#mist)"/>'+birds(40,70)+birds(250,120,'b2')+
    '<g stroke="#B9CE93" stroke-width="2" opacity=".9">'+[0,1,2,3,4].map(function(i){ return '<path d="M150 '+(272+i*8)+'h90"/>'; }).join('')+'</g>'+
    /* Biển */
    '<path d="M0 312Q90 296 180 314T360 306V486Q270 470 180 484T0 480Z" fill="url(#sea)"/>'+waves()+''+
    '<g class="boat"><path d="M150 404h44l-7 12h-30z" fill="#8E5A2B"/><path d="M172 404v-30l18 26z" fill="#FFF7E3" stroke="#B9A98A"/><path d="M168 404v-22l-14 20z" fill="#F4E3C3" stroke="#B9A98A"/></g>'+
    '<g class="shark s1"><path d="M70 372l12-20 6 20z" fill="#3E4A5A"/><path d="M60 374q18 4 34 0" stroke="#fff" stroke-width="1.6" fill="none"/></g>'+
    '<g class="shark s2"><path d="M268 432l11-18 6 18z" fill="#3E4A5A"/><path d="M258 434q16 4 32 0" stroke="#fff" stroke-width="1.6" fill="none"/></g>'+
    /* La bàn */
    '<g transform="translate(312 358)" opacity=".85"><circle r="22" fill="#F7EED6" stroke="#8E6A3A" stroke-width="1.5"/><path d="M0-20L5 0 0 20-5 0z" fill="#8E3A2B"/><path d="M-20 0L0 5 20 0 0-5z" fill="#4A5275"/><text y="-24" text-anchor="middle" font-size="9" font-weight="700" fill="#8E3A2B" class="mtxt">B</text></g>'+
    /* Phù Tang: núi thủy mặc, rừng thông, hoa anh đào */
    '<path d="M0 480Q120 464 240 484T360 476V1240H0Z" fill="#EEE6CC"/>'+
    inkRange(-40,640,170,140,3,'inkf',4)+inkRange(-30,690,140,100,2,'inkn',6)+inkRange(230,750,170,150,3,'inkf',8)+inkRange(250,800,140,100,2,'inkn',3)+
    inkRange(-40,950,170,140,3,'inkf',9)+inkRange(-30,1000,140,96,2,'inkn',2)+inkRange(220,1060,180,140,3,'inkf',5)+inkRange(250,1110,140,90,2,'inkn',7)+
    '<rect x="0" y="760" width="360" height="46" fill="url(#mist)"/><rect x="0" y="1010" width="360" height="46" fill="url(#mist)"/>'+birds(270,540,'b3')+birds(60,860,'b2')+
    pine(30,600)+pine(326,700)+pine(22,820)+pine(336,920)+pine(30,1040)+
    sakura(316,560,.9)+sakura(38,690,.8)+sakura(320,790,.85)+sakura(42,890,.8)+sakura(318,990,.85)+sakura(62,1090,.9)+pine(318,1100)+
    '<path d="M300 1200Q270 1150 300 1110Q320 1080 300 1050" stroke="#9CC5D2" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>'+
    /* Khung bản đồ */
    '<rect width="360" height="1240" fill="url(#vig)"/>'+
    '<g transform="translate(318 1150) rotate(-6)"><rect x="-22" y="-22" width="44" height="44" rx="4" fill="none" stroke="#B8322A" stroke-width="2.4"/><rect x="-18" y="-18" width="36" height="36" rx="2" fill="#B8322A" opacity=".9"/><g fill="#FFF3E6" font-size="14" font-weight="800" text-anchor="middle" font-family="M PLUS Rounded 1c,Hiragino Sans,sans-serif"><text x="8" y="-2">日</text><text x="8" y="14">本</text><text x="-8" y="-2">遊</text><text x="-8" y="14">記</text></g></g>'+
    '<rect x="6" y="6" width="348" height="1228" rx="14" fill="none" stroke="#6B4A22" stroke-width="3"/><rect x="12" y="12" width="336" height="1216" rx="10" fill="none" stroke="#8E6A3A" stroke-width=".8" stroke-dasharray="3 4"/>'+
    '<g transform="translate(180 30)"><path d="M-58-12h116l-8 12 8 12h-116l8-12z" fill="#8E3A2B"/><text y="5" text-anchor="middle" font-size="12" font-weight="800" fill="#FFF3D6" class="mtxt">ĐẤT VIỆT</text></g>'+
    '<g transform="translate(180 1218)"><path d="M-66-12h132l-8 12 8 12h-132l8-12z" fill="#8E3A2B"/><text y="5" text-anchor="middle" font-size="12" font-weight="800" fill="#FFF3D6" class="mtxt">XỨ PHÙ TANG</text></g>'+
    '<text x="180" y="338" text-anchor="middle" font-size="11" font-weight="800" fill="#2E5A70" class="mtxt" opacity=".85">VƯỢT BIỂN</text>';
  return h;
}
function mapHTML(){
  var cur = !startDone() ? 0 : (nextTarget()?nextTarget().n:8);
  var reached=function(n){ return n===0 || aiOpen(n); };
  var svg='<svg viewBox="0 0 '+MAPW+' '+MAPH+'" class="dmap__svg" aria-hidden="true">'+mapDefs()+mapBg();
  for(var n=0;n<8;n++){ var d=segPath(n,n+1), on=reached(n+1);
    svg+='<path d="'+d+'" stroke="#B9A27A" stroke-width="2.5" stroke-dasharray="2 8" fill="none" stroke-linecap="round" opacity=".7"/>'+(on?'<path d="'+d+'" stroke="#5A3E14" stroke-opacity=".25" stroke-width="6" fill="none" stroke-linecap="round" transform="translate(1 2)"/><path d="'+d+'" stroke="#F4B63B" stroke-width="4" fill="none" stroke-linecap="round" class="pathon"/>':''); }
  for(var k=0;k<=8;k++){ var a=aiOf(k); svg+=lmk(k, a.col||'#2F4BD8'); }
  for(var k2=1;k2<=8;k2++){ if(!reached(k2)) svg+=fogSVG(k2); }
  svg+='</svg>';
  var h='<div class="dmap" id="dmap">'+svg;
  for(var i=0;i<=8;i++){
    var a=aiOf(i), p=MPOS[i], open=reached(i)&&(i===0||BUILT[i]), sealed=i===0?startDone():!!S.seals[i];
    var code = i===0?'CHUẨN BỊ':(i===8?'ĐÍCH':'CỬA ẢI '+pad(i));
    var act=(open?'ai':'locked');
    h+='<button class="mhit" style="left:'+((p[0]-50)/MAPW*100)+'%;top:'+((p[1]-96)/MAPH*100)+'%;width:'+(100/MAPW*100)+'%;height:'+(82/MAPH*100)+'%" data-act="'+act+'" data-n="'+i+'" aria-label="'+esc(a.vn)+'"></button>';
    var cls='mnode'+(open?'':' lock')+(i===cur&&!sealed?' cur':'')+(sealed?' done':'');
    h+='<button class="'+cls+'" style="left:'+(p[0]/MAPW*100)+'%;top:'+(p[1]/MAPH*100)+'%;--nc:'+(a.col||'#2F4BD8')+';--nc2:'+shade(a.col||'#2F4BD8')+'" data-act="'+act+'" data-n="'+i+'">'+
      '<small>'+code+'</small><b>'+esc(i===0?'Lên đường':a.vn.replace('Ải ',''))+'</b>'+
      (sealed&&i>0?'<span class="mseal">'+sealSVG(a.badge?a.badge.k:a.k,30)+'</span>':'')+
      (!open?'<span class="mlock">'+icon('lock',12)+'</span>':'')+'</button>';
    if(open && !sealed && a.boss && i===cur){ h+='<span class="mboss" style="left:'+((p[0]+(p[0]<180?52:-52))/MAPW*100)+'%;top:'+((p[1]-62)/MAPH*100)+'%">'+av(a.boss)+'</span>'; }
  }
  var cp=MPOS[cur];
  h+='<span class="mhau" style="left:'+((cp[0]+(cp[0]<180?-72:72))/MAPW*100)+'%;top:'+((cp[1]-50)/MAPH*100)+'%">'+av('hau','cheer')+'<i>'+cloudSVG('#fff')+'</i></span>';
  return h+'</div>';
}
