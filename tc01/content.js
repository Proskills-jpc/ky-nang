/* =========================================================
   TC01 · Huấn luyện thể chất · tc01/content.js · CHỮ VÀ NỘI DUNG (sửa ở đây)
   Học viên học trên ĐIỆN THOẠI: câu ngắn, một ý một câu. Lời Shin ≤ 2 câu.
   Nguồn nội dung: Sổ quản lý học tập GDTC v10.1, chương trình GDTC TTS/Kỹ sư, tiêu chí đo lường theo nghề (KTN),
   Sổ tay sức khỏe 2.0. Kỹ thuật động tác do GV GDTC duyệt lại. Mốc thể lực: bảng thành tích Sổ quản lý v10.1.
   ========================================================= */
var TC_VER = 'TC01.1.7';

/* ---------- Gợi ý thẻ Shin Routine theo bài (PS1.3.26) ----------
   Bài có trong RT_BAI thì cuối trang bài hiện khối "Rèn mỗi ngày cùng Shin" (mã thẻ: PS_CONFIG.ROUTINE_LIB).
   sub: lời dẫn ngắn. Học viên tự mở Shin Routine để đặt công thức. */
var RT_BAI = {
  b6: { ids: ['vandong', 'ngu'], sub: 'Lịch tập chỉ có ích khi bạn tập đều. Rèn thẻ Vận động mỗi ngày cùng Shin.' },
  d4: { ids: ['anuong', 'ngu'], sub: 'Cam kết 21 ngày dễ giữ hơn khi bạn đóng dấu mỗi ngày trong Shin Routine.' },
  n4: { ids: ['vandong', 'ngu'], sub: 'Thói quen chống mỏi cần làm mỗi ngày. Shin nhắc và đếm cùng bạn.' },
  n5: { ids: ['horenso'], sub: 'Thấy nguy hiểm thì báo ngay. Rèn thói quen báo cáo từ bây giờ.' },
  n6: { ids: ['vandong'], sub: 'Bài bổ trợ có tác dụng khi tập đều. Đóng dấu mỗi ngày tập trong Shin Routine.' }
};
var TC_YT = 'https://www.youtube.com/@THECHAT_SUCKHOE/shorts'; /* kênh video động tác của thầy cô GDTC */
var TC_RADIO = 'https://www.youtube.com/watch?v=0xfDmrcI7OI';

/* ---------- 5 nhóm môi trường làm việc ---------- */
var GROUPS = {
  xuong:  { n: 'Nhà xưởng',  jp: '工場', kana: 'こうじょう', ic: 'gear',   d: 'Đứng máy cả ca, tiếng ồn, nóng, bụi, nhấc chi tiết.' },
  chuyen: { n: 'Dây chuyền', jp: 'ライン', kana: 'らいん',     ic: 'line',   d: 'Đứng hoặc ngồi một chỗ, lặp một động tác, có nơi lạnh ẩm.' },
  troi:   { n: 'Ngoài trời', jp: '屋外', kana: 'おくがい',   ic: 'sun',    d: 'Nắng nóng, rét, mang vác, cúi, đào, làm trên cao.' },
  dv:     { n: 'Dịch vụ',    jp: 'サービス', kana: 'さーびす', ic: 'tray',  d: 'Đi lại cả ngày, đỡ người, bưng bê, cúi lau.' },
  vp:     { n: 'Văn phòng',  jp: 'オフィス', kana: 'おふぃす', ic: 'desk',  d: 'Ngồi lâu, cổ vai gáy, mỏi mắt, ít vận động.' }
};
var GROUP_ORDER = ['xuong', 'chuyen', 'troi', 'dv', 'vp'];

/* ---------- nghề → nhóm (s trùng mã ngành của CD01 để tự gợi ý) ---------- */
var JOBS = [
  { s: 'co-khi', n: 'Cơ khí', g: 'xuong' },
  { s: 'han', n: 'Hàn', g: 'xuong' },
  { s: 'o-to', n: 'Ô tô', g: 'xuong' },
  { s: 'duc-nhua', n: 'Đúc nhựa', g: 'xuong' },
  { s: 'son', n: 'Sơn', g: 'xuong', note: 'Sơn công trình, sơn nhà: chọn nhóm Ngoài trời.' },
  { s: 'in-an', n: 'In ấn', g: 'xuong' },
  { s: 'thuc-pham', n: 'Thực phẩm', g: 'chuyen' },
  { s: 'thuy-san', n: 'Thủy sản', g: 'chuyen' },
  { s: 'dong-goi-cong-nghiep', n: 'Đóng gói công nghiệp', g: 'chuyen' },
  { s: 'dien-tu', n: 'Điện tử', g: 'chuyen' },
  { s: 'may-mac', n: 'May mặc', g: 'chuyen' },
  { s: 'xay-dung', n: 'Xây dựng', g: 'troi' },
  { s: 'nong-nghiep', n: 'Nông nghiệp', g: 'troi' },
  { s: 'dieu-duong', n: 'Kaigo · Chăm sóc', g: 'dv' },
  { s: 'nha-hang', n: 'Nhà hàng · Khách sạn', g: 'dv' },
  { s: 've-sinh-toa-nha', n: 'Vệ sinh tòa nhà', g: 'dv' },
  { s: 'ky-su', n: 'Kỹ sư công nghệ', g: 'vp' },
  { s: 'du-hoc', n: 'Du học sinh', g: 'vp', two: 1 },
  { s: 'khac', n: 'Nghề khác hoặc chưa biết', g: '' }
];

/* ---------- 6 khu của phòng tập ---------- */
/* Phòng tập Shin Fitness Center (TC01.0.8): no = số phòng, en = tên tiếng Anh (short: bản ngắn trên tòa nhà), col = 2 màu dải trái bảng tên phòng */
var KHU = [
  { id: 'san',   t: 'Sàn tập',        no: '101', en: 'WORKOUT FLOOR',     short: 'WORKOUT FLOOR', col: ['#3E9A6B', '#2A714D'], ic: 'dumbbell', sub: 'Động tác đúng kỹ thuật, tự tập ở nhà', ready: 1 },
  { id: 'radio', t: 'Radio Taiso',    no: 'R',   en: 'RADIO TAISO DECK',  short: 'RADIO TAISO DECK', col: ['#C9A45A', '#9C7C38'], ic: 'radio', sub: '13 động tác buổi sáng của người Nhật', ready: 1 },
  { id: 'bep',   t: 'Bếp dinh dưỡng', no: '201', en: 'NUTRITION KITCHEN', short: 'KITCHEN', col: ['#D08A60', '#A9623E'], ic: 'bowl', sub: 'Ăn vậy đủ chưa? Món Việt, món Nhật', ready: 1 },
  { id: 'nghe',  t: 'Góc nghề',       no: '202', en: 'WORK-FIT CORNER',   short: 'WORK-FIT', col: ['#5E88A8', '#406A89'], ic: 'helmet', sub: 'Thân thể cho nghề, nâng vật đúng, an toàn', ready: 1 },
  { id: 'yte',   t: 'Phòng y tế',     no: '301', en: 'FIRST AID ROOM',    short: 'FIRST AID', col: ['#3A9C97', '#24736F'], ic: 'cross', sub: 'Choáng, say nắng, cảm lạnh, đau lưng', ready: 1 },
  { id: 'test',  t: 'Phòng test',     no: '302', en: 'TEST LAB',          short: 'TEST LAB', col: ['#8C7BB0', '#66568A'], ic: 'gauge', sub: 'Test thử lý thuyết, tự test thể lực', ready: 1 }
];
/* tầng của tòa nhà (từ trên xuống); 'lobby' = quầy lễ tân, mở Sổ tay › Thẻ hội viên */
var FLOORS = [['radio'], ['yte', 'test'], ['bep', 'nghe'], ['san', 'lobby']];
var LOBBY = { no: 'G', short: 'LOBBY', t: 'Lễ tân' };
/* sân trước phòng tập: chạm khối, Shin kể 1 mẹo (câu ngắn lấy từ bài đã duyệt) */
var YARD_TIPS = {
  dumb: 'Làm đúng 5 cái tốt hơn làm sai 15 cái.',
  plate: 'Làm ấm khớp và tim trước khi tập.',
  kb: 'Siết bụng, lưng thẳng khi nâng.',
  bottle: 'Nước mỗi ngày: cân nặng (kg) × 0,04 lít.',
  oni: 'Ăn đủ bữa trước ca làm.',
  bento: 'Cơm hộp mang đi: giữ mát, ăn sớm.',
  helm: 'Thấy nặng quá sức: nhờ người, dùng xe đẩy.',
  watch: 'Giãn cơ 2 phút giữa ca.',
  mat: 'Làm 5 động tác khởi động trước ca.',
  radio: 'Radio Taiso có 13 động tác. Thuộc rồi, tập ở đâu cũng được.',
  aid: 'Sắp ngất: ngồi hoặc nằm xuống ngay, kê chân cao.',
  shin: 'Chạm khối nào, Shin kể một mẹo cho bạn.'
};

/* ---------- lời Shin ---------- */
var TXT = {
  joinHi: 'Chào <b class="nm">[Tên]</b>! Shin đang khởi động nè. Vào tập cùng Shin nhé!',
  joinHi2: 'Trước hết, ghé quầy lễ tân làm thẻ hội viên nhé. Mất khoảng 2 phút.',
  jobQ: 'Bạn sẽ làm nghề gì ở Nhật?',
  jobSub: 'Shin dùng để gợi ý bài tập hợp nơi làm việc của bạn. Đổi lại được bất cứ lúc nào.',
  fromCd: 'Ở Career Design 01, Ga đích của bạn là <b>[Nghề]</b>. Shin chọn sẵn nhé.',
  whereQ: 'Bạn sẽ làm việc chủ yếu ở đâu?',
  partQ: 'Bạn có làm thêm không? Làm ở đâu?',
  partNo: 'Chưa làm thêm',
  grpSay: 'Nhóm của bạn là <b>[Nhóm]</b>. Mỗi bài, Shin sẽ nói thêm điều nhóm bạn cần chú ý.',
  sexQ: 'Bảng mốc thể lực của lớp chia theo nam và nữ. Bạn xem mốc nào?',
  injQ: 'Bạn có chấn thương cũ, vừa mổ, hoặc đang điều trị bệnh không?',
  injYes: 'Cảm ơn bạn đã cho Shin biết. Báo thầy cô GDTC trước khi tập. Tập nhẹ, thấy đau là dừng.',
  injNo: 'Tốt quá! Vẫn nhớ: thấy đau là dừng nhé.',
  injNote: 'Shin không hỏi chi tiết bệnh. Câu trả lời chỉ lưu trên máy của bạn.',
  goalQ: 'Mục tiêu sức khỏe của bạn trước khi sang Nhật là gì?',
  goalSub: 'Viết một điều cụ thể, đo được.',
  goalTips: ['Chống đẩy được 20 cái liên tục', 'Plank được 1 phút', 'Ngủ trước 23 giờ mỗi ngày', 'Đủ sức làm ca 8 tiếng không mệt lả'],
  bodyQ: 'Thêm chiều cao, cân nặng (không bắt buộc)',
  bodyNote: 'Chỉ số BMI chỉ để tham khảo. Thầy cô GDTC sẽ đo lại trên lớp.',
  cardSay: 'Thẻ của <b class="nm">[Tên]</b> đây! Xong mỗi bài, Shin đục một lỗ trên thẻ.',
  cardGo: 'Đeo thẻ, vào tập',
  homeHi: [
    'Hôm nay tập gì nào, <b class="nm">[Tên]</b>? Chọn một bài 5 phút thôi cũng được.',
    'Làm đúng 5 cái tốt hơn làm sai 15 cái. Mình tập chậm mà chắc nhé.',
    'Tập đều mỗi ngày một chút. Sức khỏe là hành lý quan trọng nhất khi sang Nhật.',
    'Nhớ khởi động trước khi tập nha. Cơ thể ấm lên thì ít chấn thương.'
  ],
  injHome: 'Bạn có chấn thương cũ: tập nhẹ, thấy đau là dừng, hỏi thầy cô GDTC trước nhé.',
  khuSoon: 'Khu này đang xây. Shin mở sớm nhé!',
  baiDone: 'Xong bài <b>[Bài]</b>! Shin đục một lỗ trên thẻ hội viên cho bạn.',
  painStop: 'Dừng bài này hôm nay nhé. Đau kéo dài hoặc đau nhói thì báo thầy cô GDTC.',
  hardSay: 'Lần sau giảm số lần, giữ đúng tư thế trước đã. Tăng dần 1–2 cái mỗi 2 ngày.',
  okSay: 'Vừa sức là đúng nhịp rồi. Ghi lại để lần sau so với chính mình nhé.',
  easySay: 'Nhẹ nhàng à? Lần sau thử thêm 1–2 cái, hoặc thêm một hiệp.',
  pr: 'Kỷ lục mới của bạn!',
  reflQ: 'Lần tới tập bài này, bạn sẽ chú ý điều gì?',
  reflSub: 'Viết một câu cho chính bạn. Viết từ 10 chữ trở lên được thêm Insight.'
};

/* ---------- động tác ----------
   frames: các khoảnh khắc chính (p = tên tư thế trong art.js, t = lời hướng dẫn, g = đường gióng [x1,y1,x2,y2], a = mũi tên)
   keys: 3 điểm chính · s: tên ngắn cho nút chọn (không bắt buộc) · yt: link video riêng (để trống thì mở kênh video của thầy cô GDTC) */
var EX = {
  pushup: { n: 'Chống đẩy cơ bản', who: 'Nam · mốc giữa kỳ', yt: '',
    frames: [
      { p: 'pushUp', t: 'Hai tay chống ngay dưới vai, rộng hơn vai một chút. Thân thẳng từ đầu đến gót.', g: [42, 160, 186, 107] },
      { p: 'pushDown', t: 'Hít vào, hạ người đến khi ngực gần chạm sàn. Khuỷu tay chếch về sau.', a: [[150, 90], [150, 126]] },
      { p: 'pushUp', t: 'Thở ra, đẩy người lên. Thân vẫn thẳng một đường.', a: [[200, 150], [200, 112]] }
    ],
    keys: ['Siết bụng, siết mông', 'Mắt nhìn sàn, phía trước tay', 'Không võng hông, không chổng mông'] },
  kneepush: { n: 'Chống đẩy khuỵu gối', who: 'Nữ · người mới tập', yt: '',
    frames: [
      { p: 'kneeUp', t: 'Hai gối chạm sàn, tay chống ngay dưới vai. Thân thẳng từ đầu đến gối.', g: [92, 165, 190, 112] },
      { p: 'kneeDown', t: 'Hít vào, hạ ngực xuống gần sàn. Hông đi cùng thân.', a: [[150, 100], [150, 134]] },
      { p: 'kneeUp', t: 'Thở ra, đẩy lên. Làm chậm, đều nhịp.', a: [[204, 156], [204, 122]] }
    ],
    keys: ['Thân thẳng từ đầu đến gối', 'Lót khăn dưới gối cho êm', 'Làm đúng 5 cái tốt hơn làm sai 15 cái'] },
  plank: { n: 'Plank', who: 'Giữ thân bằng cẳng tay', yt: '',
    frames: [
      { p: 'plank', t: 'Khuỷu tay ngay dưới vai, cẳng tay đặt trên sàn.', a: [[174, 118], [174, 150]] },
      { p: 'plank', t: 'Siết bụng, siết mông. Thân thẳng từ đầu đến gót.', g: [40, 160, 192, 132] },
      { p: 'plank', t: 'Thở đều, không nín thở. Bấm giờ, giữ đến khi còn giữ đúng tư thế.' }
    ],
    keys: ['Khuỷu tay ngay dưới vai', 'Thân thẳng một đường', 'Thở đều, không nín thở'] },
  legraise: { n: 'Gập bụng nâng chân', who: 'Bụng dưới', yt: '',
    frames: [
      { p: 'legDown', t: 'Nằm ngửa, tay xuôi theo người. Lưng dưới áp sát sàn.' },
      { p: 'legUp', t: 'Thở ra, nâng hai chân thẳng lên đến khi vuông góc với sàn.', a: [[50, 140], [96, 92]] },
      { p: 'legDown', t: 'Hít vào, hạ chân thật chậm. Gót gần chạm sàn thì nâng lên tiếp.', a: [[86, 80], [44, 132]] }
    ],
    keys: ['Lưng dưới luôn áp sàn', 'Hạ chân chậm, không thả rơi', 'Chân thẳng, mũi chân duỗi'] },
  superman: { n: 'Superman (lưng)', who: 'Lưng dưới', yt: '',
    frames: [
      { p: 'supRest', t: 'Nằm sấp, hai tay duỗi thẳng qua đầu, hai chân duỗi thẳng.' },
      { p: 'supUp', t: 'Siết bụng, siết lưng dưới. Nâng tay, ngực và chân khỏi sàn. Giữ 1–2 giây.', a: [[200, 158], [200, 128]] },
      { p: 'supRest', t: 'Hạ xuống chậm. Mắt nhìn sàn, cổ thẳng theo lưng.' }
    ],
    keys: ['Nâng chậm, không giật', 'Cổ thẳng theo lưng', 'Giữ 1–2 giây rồi hạ'] },
  lift: { n: 'Nâng vật đúng cách', who: 'Lưng, chân, hông', yt: '',
    frames: [
      { p: 'liftLow', mk: 'boxLow', t: 'Đứng sát vật, hai chân rộng bằng vai. Hạ hông xuống, giữ lưng thẳng.', g: [96, 128, 127, 91] },
      { p: 'liftUp', mk: 'boxUp', t: 'Ôm vật sát bụng. Đứng lên bằng sức chân, không giật lưng.', a: [[96, 150], [96, 108]] },
      { p: 'liftUp', mk: 'boxUp', t: 'Muốn đổi hướng thì bước cả bàn chân theo. Không vặn lưng khi đang ôm vật.', arc: [[126, 156, 12]] }
    ],
    keys: ['Lưng thẳng, hạ hông bằng chân', 'Ôm vật sát người', 'Đổi hướng bằng bước chân, không vặn lưng'] },
  squat: { n: 'Squat', who: 'Chân, hông', yt: '',
    frames: [
      { p: 'standArms', t: 'Chân rộng bằng vai, mũi chân hơi mở ra. Tay đưa ra trước.' },
      { p: 'squatDown', t: 'Đẩy hông ra sau như ngồi xuống ghế. Hạ đến khi đùi gần song song sàn.', g: [76, 140, 148, 54] },
      { p: 'standArms', t: 'Dồn lực ở gót và đùi, đứng thẳng lên.', a: [[90, 130], [90, 92]] }
    ],
    keys: ['Lưng thẳng, ngực mở', 'Gối hướng theo mũi chân', 'Gót luôn chạm sàn'] },
  lunge: { n: 'Bước lunge', who: 'Chân, hông, thăng bằng', yt: '',
    frames: [
      { p: 'stand', t: 'Đứng thẳng, tay thả lỏng hoặc chống hông.' },
      { p: 'lungeDown', t: 'Bước một chân ra sau. Hạ người đến khi hai gối gập khoảng 90 độ.', g: [113, 50, 113, 160] },
      { p: 'stand', t: 'Đẩy bằng gót chân trước, về tư thế đứng. Đổi chân.' }
    ],
    keys: ['Thân thẳng, không đổ về trước', 'Gối trước không vượt xa mũi chân', 'Gối sau gần sàn, không đập xuống'] },
  jj: { n: 'Jumping jack', who: 'Tim mạch', yt: '',
    frames: [
      { p: 'jjClose', t: 'Đứng thẳng, hai chân khép, tay thả xuôi.' },
      { p: 'jjOpen', t: 'Bật nhảy, dang chân rộng hơn vai, hai tay đưa lên cao.' },
      { p: 'jjClose', t: 'Bật về khép chân, hạ tay. Lặp lại đều nhịp.' }
    ],
    keys: ['Tiếp đất nhẹ bằng nửa trước bàn chân', 'Gối hơi chùng khi tiếp đất', 'Thở đều, không nín thở'] },
  kneehigh: { n: 'Nâng cao đùi', who: 'Tim mạch · test đầu vào', yt: '',
    frames: [
      { p: 'kneeHigh', t: 'Chạy tại chỗ, nâng đùi lên ngang hông.', g: [100, 86, 176, 86] },
      { p: 'kneeHigh', t: 'Tay đánh theo nhịp, ngược với chân.' },
      { p: 'kneeHigh', t: 'Thân thẳng, không ngả ra sau. Nhanh dần.' }
    ],
    keys: ['Đùi lên ngang hông', 'Thân thẳng', 'Tay đánh theo nhịp'] },
  /* khởi động và giãn cơ: thẻ hình, không có mốc */
  warm: { n: 'Chuỗi khởi động 10 phút', who: 'Làm trước mọi buổi tập', yt: '',
    frames: [
      { p: 'armSide', t: 'Xoay cổ tay, khuỷu tay, khớp vai. Mỗi khớp 8 nhịp, xoay cả hai chiều.', arc: [[50, 42, 9], [190, 42, 9]] },
      { p: 'sideBend', t: 'Xoay cổ, vặn mình, nghiêng lườn. Mỗi bên 8 nhịp.' },
      { p: 'stand', t: 'Xoay gối, xoay cổ chân. Mỗi bên 8 nhịp.', arc: [[121, 132, 10], [126, 163, 7]] },
      { p: 'kneeHigh', t: 'Nâng cao đùi tại chỗ khoảng 30 giây.' },
      { p: 'jjOpen', t: 'Chạy tại chỗ hoặc bật nhảy, nhanh dần khoảng 1 phút.' }
    ],
    keys: ['Khởi động 10–15 phút trước khi tập', 'Khớp trước, tim mạch sau; nhẹ rồi mạnh dần', 'Người ấm lên, hơi ra mồ hôi là đủ'] },
  stretch: { n: 'Giãn cơ sau tập', who: 'Làm sau mọi buổi tập', yt: '',
    frames: [
      { p: 'armCross', t: 'Kéo dãn vai: kéo tay ngang ngực, giữ 15–30 giây. Đổi bên.' },
      { p: 'triceps', t: 'Kéo dãn tay sau: gập tay qua đầu, tay kia đẩy nhẹ khuỷu. Đổi bên.' },
      { p: 'sideBend', t: 'Nghiêng lườn: một tay lên cao, nghiêng người sang bên. Đổi bên.' }
    ],
    keys: ['Giữ 15–30 giây mỗi bên', 'Căng nhẹ là đủ, không đau', 'Thở đều, không nhún giật'] },
  /* Góc nghề đợt 2 (TC01.0.8): khởi động trước ca, giãn giữa ca (dùng cho dạng flow: c = lời ngắn khi tập theo Shin) */
  preshift: { n: 'Khởi động trước ca', who: 'Khoảng 3 phút · đứng tại chỗ, không cần dụng cụ', yt: '',
    frames: [
      { p: 'neckSide', c: 'Cổ: nghiêng, cúi, ngửa', t: 'Cổ: nghiêng đầu sang trái, sang phải, rồi cúi xuống, ngửa nhẹ. Mỗi hướng 4 nhịp.' },
      { p: 'handsShoulder', c: 'Vai: xoay khuỷu tay', t: 'Vai: đặt các ngón tay lên vai, xoay khuỷu tay ra trước 8 vòng, ra sau 8 vòng.', arc: [[78, 52, 9], [162, 52, 9]] },
      { p: 'standArms', c: 'Cổ tay: xoay, nắm – xòe', t: 'Cổ tay: duỗi tay ra trước, xoay cổ tay hai chiều. Rồi nắm chặt, xòe bàn tay 10 lần.', arc: [[184, 39, 9]] },
      { p: 'handsHip', c: 'Hông: xoay vòng', t: 'Hông: chống tay vào hông, xoay hông thành vòng tròn. Mỗi chiều 8 vòng.', arc: [[120, 100, 13]] },
      { p: 'stand', c: 'Gối, cổ chân: xoay nhẹ', t: 'Gối, cổ chân: hơi chùng gối, xoay gối nhẹ. Rồi nhấc từng chân, xoay cổ chân. Mỗi bên 8 nhịp.', arc: [[121, 132, 10], [126, 163, 7]] }
    ],
    keys: ['Đi từ trên xuống: cổ, vai, cổ tay, hông, gối – cổ chân', 'Xoay chậm, đều, không giật mạnh', 'Làm trước giờ vào ca và sau giờ nghỉ trưa'] },
  midstretch: { n: 'Giãn 2 phút giữa ca', who: 'Đứng tại chỗ · làm trong giờ nghỉ', yt: '',
    frames: [
      { p: 'neckSide', c: 'Cổ: nghiêng, giữ 10 giây', t: 'Cổ: nghiêng đầu sang một bên, giữ 10 giây. Đổi bên.' },
      { p: 'armCross', c: 'Vai: kéo tay ngang ngực', t: 'Vai: kéo một tay ngang ngực, giữ 10 giây. Đổi bên.' },
      { p: 'wristPull', c: 'Cổ tay: kéo ngón tay về', t: 'Cổ tay: duỗi tay ra trước, tay kia kéo nhẹ các ngón tay về phía mình. Giữ 10 giây, đổi tay.', a: [[192, 30], [178, 44]] },
      { p: 'handsBack', c: 'Lưng: chống tay, ưỡn nhẹ', t: 'Lưng: hai tay chống sau thắt lưng, ưỡn nhẹ người ra sau. Giữ 5 giây, làm 3 lần.' },
      { p: 'tiptoe', c: 'Bắp chân: kiễng gót', t: 'Bắp chân: kiễng gót lên rồi hạ xuống chậm, 15 lần. Đang ngồi thì nhấc mũi chân lên xuống.', a: [[96, 166], [96, 140]] }
    ],
    keys: ['Căng nhẹ là đủ, không đau', 'Thở đều, không nín thở', 'Đứng hay ngồi đều làm được'] },
  backcare: { n: 'Ba động tác nhẹ cho cổ, vai, lưng', s: 'Cổ, vai, lưng', who: 'Đứng hoặc ngồi · khi mỏi thường, không đau nhói', yt: '',
    frames: [
      { p: 'neckSide', c: 'Cổ: nghiêng, giữ 10–15 giây', t: 'Cổ: ngồi hoặc đứng thẳng, nghiêng đầu sang một bên, giữ 10–15 giây. Đổi bên. Không xoay vòng mạnh.' },
      { p: 'handsShoulder', c: 'Vai: xoay khuỷu tay ra sau', t: 'Vai: đặt các ngón tay lên vai, xoay khuỷu tay chậm ra sau 8 vòng, mở rộng ngực.', arc: [[78, 52, 9], [162, 52, 9]] },
      { p: 'handsBack', c: 'Lưng: chống tay, ưỡn nhẹ', t: 'Lưng: hai tay chống sau thắt lưng, ưỡn nhẹ người ra sau, giữ 5 giây. Làm 3 lần.' }
    ],
    keys: ['Chậm, căng nhẹ là đủ, thở đều', 'Đau nhói, tê lan xuống tay chân: dừng lại', 'Làm trong giờ nghỉ và trước khi ngủ'] },
  /* bài bổ trợ lớp Kiến thức nghề (không dụng cụ) */
  dip: { n: 'Hít đất ngược trên ghế', s: 'Hít đất ngược', who: 'Tay sau, vai · cần 1 ghế chắc', yt: '',
    frames: [
      { p: 'dipUp', mu: 'chair', t: 'Ngồi mép ghế, hai tay chống mép ghế sát hông. Trượt mông ra khỏi ghế, chân duỗi về trước.' },
      { p: 'dipDown', mu: 'chair', t: 'Hít vào, gập khuỷu tay, hạ người xuống đến khi khuỷu gần vuông góc.', a: [[126, 96], [126, 124]] },
      { p: 'dipUp', mu: 'chair', t: 'Thở ra, đẩy tay thẳng lên. Lưng đi sát mép ghế.', a: [[126, 124], [126, 96]] }
    ],
    keys: ['Ghế chắc, kê sát tường cho khỏi trượt', 'Khuỷu tay chĩa ra sau, không bè ra hai bên', 'Hạ vừa sức, thấy đau vai thì dừng'] },
  crunch: { n: 'Gập bụng trên', who: 'Bụng trên', yt: '',
    frames: [
      { p: 'crunchDown', t: 'Nằm ngửa, co gối, bàn chân đặt trên sàn. Hai tay chéo trước ngực.' },
      { p: 'crunchUp', t: 'Thở ra, siết bụng, nâng đầu và vai khỏi sàn. Lưng dưới vẫn áp sàn.', a: [[184, 160], [184, 134]] },
      { p: 'crunchDown', t: 'Hít vào, hạ xuống chậm. Vai vừa chạm sàn thì lên tiếp.' }
    ],
    keys: ['Siết bụng để nâng, không dùng tay kéo cổ', 'Lưng dưới luôn áp sàn', 'Lên xuống chậm, thở đều'] },
  sidelunge: { n: 'Bước ngang (side lunge)', s: 'Bước ngang', who: 'Chân, hông, đùi trong', yt: '',
    frames: [
      { p: 'wideStand', t: 'Đứng chân rộng khoảng gấp đôi vai, mũi chân hơi mở. Tay chắp trước ngực.' },
      { p: 'sideLunge', t: 'Dồn người sang một bên: gập gối bên đó, đẩy hông ra sau. Chân kia duỗi thẳng.', a: [[126, 102], [96, 102]] },
      { p: 'wideStand', t: 'Đạp gót đẩy người về giữa. Đổi bên. Mỗi bên tính 1 cái.' }
    ],
    keys: ['Gối gập hướng theo mũi chân', 'Lưng thẳng, ngực mở', 'Hai bàn chân luôn chạm sàn'] },
  hinge: { n: 'Gập hông lưng thẳng', s: 'Gập hông', who: 'Lưng, mông, sau đùi · nền của nâng vật đúng', yt: '',
    frames: [
      { p: 'hingeUp', t: 'Đứng chân rộng bằng vai, tay chéo trước ngực. Gối hơi chùng.' },
      { p: 'hingeDown', t: 'Đẩy hông ra sau, thân đổ về trước. Thấy căng sau đùi là đủ. Lưng luôn thẳng.', g: [92, 94, 154, 50] },
      { p: 'hingeUp', t: 'Siết mông, đẩy hông về trước để đứng thẳng lên.', a: [[84, 92], [104, 92]] }
    ],
    keys: ['Lưng thẳng từ đầu đến hông', 'Hông đẩy ra sau, không cúi gập lưng', 'Gối hơi chùng, không ngồi xuống'] }
};

/* ---------- mốc thể lực của lớp (Sổ quản lý học tập GDTC v10.1) ----------
   [Yếu, Trung bình, Tốt]; u: 'rep' đếm số lần · 's' giây giữ liên tục. Tham khảo, so với chính mình là chính. */
var MOC = {
  pushup:   { u: 'rep', nam: [20, 35, 40], src: 'Hít đất cơ bản · giữa kỳ' },
  kneepush: { u: 'rep', nu: [20, 30, 35], src: 'Hít đất khuỵu gối · giữa kỳ' },
  plank:    { u: 's', nam: [120, 150, 180], nu: [90, 120, 150], src: 'Plank · giữa kỳ' },
  legraise: { u: 'rep', nam: [30, 40, 50], nu: [20, 30, 40], src: 'Gập bụng nâng chân · cuối kỳ' },
  superman: { u: 'rep', nam: [30, 40, 50], nu: [20, 30, 40], src: 'Lưng bụng (superman) · cuối kỳ' },
  squat:    { u: 'rep', note: 'Trên lớp, squat tính theo set: 15 cái + giữ 10 giây = 1 set. Mốc giữa kỳ: nam 3 · 4 · 5 set, nữ 2 · 3 · 4 set.' },
  lunge:    { u: 'rep' },
  jj:       { u: 's', nam: [60, 90, 105], nu: [50, 60, 75], src: 'Jumping jack · giữa kỳ' },
  kneehigh: { u: 's', nam: [45, 60, 70], nu: [30, 45, 60], src: 'Nâng cao đùi · đầu vào' },
  /* bài bổ trợ lớp Kiến thức nghề: chưa có mốc lớp, ghi yêu cầu số lần */
  dip:       { u: 'rep', note: 'Lớp Kiến thức nghề: nam 20 cái × 2 hiệp, nữ 15 cái × 2 hiệp.' },
  crunch:    { u: 'rep', note: 'Lớp Kiến thức nghề: nam 20 cái × 2 hiệp, nữ 15 cái × 2 hiệp.' },
  sidelunge: { u: 'rep', note: 'Lớp Kiến thức nghề: nam 20 cái × 2 hiệp, nữ 15 cái × 2 hiệp (mỗi bên tính 1 cái).' },
  hinge:     { u: 'rep', note: 'Lớp Kiến thức nghề: nam 20 cái × 2 hiệp, nữ 15 cái × 2 hiệp.' }
};
var MOC_LAB = ['Yếu', 'Trung bình', 'Tốt'];

/* ---------- 6 bài của Sàn tập ----------
   Mỗi bài tối đa 3 hoạt động, 3–5 phút. Hoạt động: how (xem cách làm) · spot (tìm điểm chưa đúng) · try (tập thử cùng Shin)
   · order (xếp thứ tự) · pick (chọn cách làm đúng) · plan (lịch tập của mình). gtip: một câu riêng cho từng nhóm. */
var BAI = [
  { id: 'b1', t: 'Khởi động đúng cách', ic: 'warm', sub: 'Làm ấm khớp và tim trước khi tập', min: 10,
    acts: [
      { id: 'b1a', k: 'how', t: 'Xem chuỗi khởi động', min: 3, xp: 10, ex: ['warm'] },
      { id: 'b1b', k: 'order', t: 'Xếp chuỗi khởi động', min: 3, xp: 10,
        q: 'Xếp 5 việc khởi động theo thứ tự đúng.', sub: 'Chạm lần lượt từ việc làm trước đến việc làm sau.',
        items: ['Xoay cổ tay, khuỷu tay, vai', 'Xoay cổ, vặn mình', 'Xoay gối, cổ chân', 'Nâng cao đùi tại chỗ', 'Chạy tại chỗ, nhanh dần'],
        hint: 'Gợi ý: khớp trước, tim mạch sau. Khớp đi từ trên xuống dưới.',
        ok: 'Khớp ấm trước, tim tăng nhịp dần. Cơ thể sẵn sàng mà không bị sốc.' },
      { id: 'b1c', k: 'pick', t: 'Trễ giờ thì sao?', min: 2, xp: 10,
        q: 'Hôm nay bạn chỉ còn 15 phút để tập. Bạn làm gì?',
        opts: [
          { t: 'Bỏ khởi động, vào tập luôn cho kịp giờ', why: 'Cơ còn lạnh mà tập mạnh ngay thì dễ chấn thương.' },
          { t: 'Khởi động 5 phút, tập 10 phút nhẹ hơn mọi ngày', ok: 1, why: 'Đúng rồi! Tập ít mà an toàn vẫn hơn tập nhiều rồi chấn thương.' },
          { t: 'Tập thật nhanh, thật mạnh để bù lại thời gian đã mất', why: 'Vội và quá sức là lúc dễ sai tư thế, dễ đau nhất.' }
        ] }
    ],
    gtip: {
      xuong: 'Đứng máy cả ca dễ cứng vai, cổ tay. Khởi động khớp thật kỹ.',
      chuyen: 'Lặp một động tác cả ca. Khởi động kỹ cổ tay, vai gáy, cổ chân.',
      troi: 'Mùa đông ở Nhật rất lạnh. Cơ lạnh dễ chấn thương, nên khởi động lâu hơn.',
      dv: 'Đi lại, cúi, bưng bê cả ngày. Khởi động kỹ lưng, hông, gối.',
      vp: 'Ngồi lâu làm cơ cứng lại. Khởi động giúp vai gáy, hông linh hoạt hơn.' } },

  { id: 'b2', t: 'Ngực – Vai – Tay', ic: 'arm', sub: 'Chống đẩy cơ bản, chống đẩy khuỵu gối', min: 12,
    acts: [
      { id: 'b2a', k: 'how', t: 'Xem cách làm', min: 4, xp: 10, ex: ['pushup', 'kneepush'],
        more: 'Nâng cao: chống đẩy tay chạm gối (test cuối kỳ). Xem cách làm trong video của thầy cô GDTC.' },
      { id: 'b2b', k: 'spot', t: 'Tìm điểm chưa đúng', min: 3, xp: 10,
        rounds: [{ p: 'pushWrong', q: 'Bạn này chống đẩy chưa đúng ở 3 chỗ. Chạm vào từng chỗ.',
          hs: [
            { x: 132, y: 152, r: 20, t: 'Hông võng xuống', why: 'Lực dồn vào thắt lưng, dễ đau lưng.' },
            { x: 178, y: 132, r: 15, t: 'Cúi gằm đầu', why: 'Cổ bị gập, không thẳng theo lưng.' },
            { x: 197, y: 162, r: 15, t: 'Tay đặt quá xa phía trước', why: 'Tay phải ở ngay dưới vai thì mới đẩy khỏe.' }
          ] }] },
      { id: 'b2c', k: 'try', t: 'Tập thử cùng Shin', min: 4, xp: 15, ex: ['pushup', 'kneepush'] }
    ],
    gtip: {
      xuong: 'Nhấc chi tiết, chỉnh máy, cầm dụng cụ cả ca cần vai và tay khỏe.',
      chuyen: 'Tay làm liên tục cả ca. Vai, tay khỏe thì đỡ mỏi, làm đều tay hơn.',
      troi: 'Vác vật liệu, kéo ống, cầm cuốc xẻng cần tay, vai, ngực khỏe.',
      dv: 'Đỡ người, bưng khay, đẩy xe cần tay và vai khỏe.',
      vp: 'Ngồi lâu dễ gù vai. Tập ngực, vai giúp dáng thẳng hơn.' } },

  { id: 'b3', t: 'Bụng – Lưng', ic: 'core', sub: 'Plank, gập bụng nâng chân, superman', min: 12,
    acts: [
      { id: 'b3a', k: 'how', t: 'Xem cách làm', min: 4, xp: 10, ex: ['plank', 'legraise', 'superman'] },
      { id: 'b3b', k: 'spot', t: 'Tìm điểm chưa đúng', min: 3, xp: 10,
        rounds: [
          { p: 'plankSag', q: 'Plank này chưa đúng ở 2 chỗ. Chạm vào từng chỗ.',
            hs: [
              { x: 126, y: 156, r: 20, t: 'Hông võng xuống', why: 'Bụng không siết, lưng dưới chịu hết lực.' },
              { x: 186, y: 152, r: 15, t: 'Cúi đầu sát sàn', why: 'Mắt nhìn sàn nhưng cổ phải thẳng theo lưng.' }
            ] },
          { p: 'plankHigh', q: 'Còn plank này? Chạm vào chỗ chưa đúng.',
            hs: [{ x: 136, y: 98, r: 22, t: 'Mông chổng cao', why: 'Trông dễ hơn nhưng bụng gần như không phải làm việc.' }] },
          { p: 'legWrong', q: 'Gập bụng nâng chân: chạm vào chỗ chưa đúng.',
            hs: [{ x: 134, y: 150, r: 20, t: 'Lưng dưới cong lên khỏi sàn', why: 'Dễ đau lưng. Hạ chân ít thôi, giữ lưng áp sàn.' }] }
        ] },
      { id: 'b3c', k: 'try', t: 'Tập thử cùng Shin', min: 4, xp: 15, ex: ['plank', 'legraise', 'superman'] }
    ],
    gtip: {
      xuong: 'Bụng, lưng khỏe giữ thân vững khi đứng máy và cúi nhấc đồ.',
      chuyen: 'Đứng hoặc ngồi một chỗ lâu dễ mỏi lưng. Bụng, lưng khỏe giúp giữ dáng.',
      troi: 'Cúi, đào, vác nhiều giờ. Bụng và lưng khỏe giúp đỡ cho cột sống.',
      dv: 'Cúi lau, đỡ người, bưng bê cần bụng và lưng khỏe để đỡ đau lưng.',
      vp: 'Ngồi lâu dễ đau lưng dưới. Bụng, lưng khỏe giúp ngồi thẳng lâu hơn.' } },

  { id: 'b4', t: 'Chân – Hông', ic: 'leg', sub: 'Squat, bước lunge', min: 12,
    acts: [
      { id: 'b4a', k: 'how', t: 'Xem cách làm', min: 4, xp: 10, ex: ['squat', 'lunge'],
        more: 'Nâng cao: ôm bình nước trước ngực khi squat (test cuối kỳ dùng tạ 20 kg trên lớp).' },
      { id: 'b4b', k: 'spot', t: 'Tìm điểm chưa đúng', min: 3, xp: 10,
        rounds: [
          { p: 'squatWrong', q: 'Squat này chưa đúng ở 3 chỗ. Chạm vào từng chỗ.',
            hs: [
              { x: 118, y: 92, r: 22, t: 'Lưng gù', why: 'Lưng phải thẳng, ngực mở thì cột sống mới an toàn.' },
              { x: 116, y: 160, r: 14, t: 'Nhón gót', why: 'Gót phải chạm sàn để đứng vững.' },
              { x: 150, y: 136, r: 15, t: 'Gối đẩy quá xa ra trước', why: 'Đẩy hông ra sau trước, gối sẽ đỡ bị ép.' }
            ] },
          { p: 'lungeWrong', q: 'Bước lunge này: chạm vào 2 chỗ chưa đúng.',
            hs: [
              { x: 156, y: 108, r: 20, t: 'Thân đổ về trước', why: 'Giữ thân thẳng thì lực dồn đều hai chân.' },
              { x: 176, y: 132, r: 15, t: 'Gối trước vượt xa mũi chân', why: 'Gối chịu lực quá nhiều, dễ đau gối.' }
            ] }
        ] },
      { id: 'b4c', k: 'try', t: 'Tập thử cùng Shin', min: 4, xp: 15, ex: ['squat', 'lunge'] }
    ],
    gtip: {
      xuong: 'Đứng máy 8 tiếng mỗi ngày. Chân khỏe thì cuối ca vẫn còn sức.',
      chuyen: 'Đứng một chỗ cả ca dễ mỏi, đau chân. Chân, hông khỏe giúp đứng vững lâu hơn.',
      troi: 'Ngồi xổm, đứng lên, leo giàn, vác đồ đi lại. Chân, hông là gốc sức của bạn.',
      dv: 'Đi lại cả ngày, ngồi xuống đỡ người. Squat đúng cũng là cách nâng đồ đúng.',
      vp: 'Ngồi nhiều thì chân, hông ít vận động. Vài phút squat giữa giờ rất có ích.' } },

  { id: 'b5', t: 'Tim mạch', ic: 'heart', sub: 'Jumping jack, nâng cao đùi', min: 10,
    acts: [
      { id: 'b5a', k: 'how', t: 'Xem cách làm', min: 3, xp: 10, ex: ['jj', 'kneehigh'] },
      { id: 'b5b', k: 'spot', t: 'Tìm điểm chưa đúng', min: 2, xp: 10,
        rounds: [{ p: 'kneeLow', q: 'Nâng cao đùi chưa đúng ở 2 chỗ. Chạm vào từng chỗ.',
          hs: [
            { x: 150, y: 104, r: 18, t: 'Đùi thấp, chưa ngang hông', why: 'Đùi lên ngang hông thì tim mới làm việc đủ.' },
            { x: 108, y: 54, r: 20, t: 'Ngả người ra sau', why: 'Thân thẳng giúp giữ thăng bằng, đỡ mỏi lưng.' }
          ] }] },
      { id: 'b5c', k: 'try', t: 'Tập thử cùng Shin', min: 4, xp: 15, ex: ['jj', 'kneehigh'] }
    ],
    gtip: {
      xuong: 'Tim phổi khỏe giúp bạn bền sức qua ca dài, cả khi tăng ca.',
      chuyen: 'Làm theo nhịp máy cả ca cần sức bền. Tập tim mạch giúp bạn bền sức.',
      troi: 'Làm ngoài trời, vận động nhiều cả ngày. Sức bền tốt giúp bạn trụ đến cuối ca.',
      dv: 'Đi lại, chạy việc cả ngày cần sức bền. Tập đều giúp đỡ hụt hơi.',
      vp: 'Ít vận động cả ngày. 10 phút tim mạch giúp cơ thể tỉnh táo hơn.' } },

  { id: 'b6', t: 'Giãn cơ và lịch tập', ic: 'stretch', sub: 'Thả lỏng sau tập, lên lịch tập ở nhà', min: 10,
    acts: [
      { id: 'b6a', k: 'how', t: 'Xem cách giãn cơ', min: 3, xp: 10, ex: ['stretch'] },
      { id: 'b6b', k: 'pick', t: 'Giãn cơ thế nào?', min: 2, xp: 10,
        q: 'Sau buổi tập, bạn giãn cơ thế nào là đúng?',
        opts: [
          { t: 'Kéo thật mạnh, nhún liên tục để cơ mau giãn ra hơn', why: 'Nhún giật dễ làm cơ bị căng quá, đau thêm.' },
          { t: 'Bỏ qua, vì tập xong là đã xong buổi', why: 'Không giãn cơ thì hôm sau cơ dễ đau, cứng hơn.' },
          { t: 'Giữ mỗi động tác 15–30 giây, căng nhẹ, thở đều', ok: 1, why: 'Đúng rồi! Căng nhẹ, giữ đủ lâu là cơ thả lỏng tốt nhất.' }
        ] },
      { id: 'b6c', k: 'plan', t: 'Lịch tập của mình', min: 4, xp: 15 }
    ],
    gtip: {
      xuong: 'Sau ca đứng máy, giãn chân, lưng giúp cơ thả lỏng.',
      chuyen: 'Lặp một động tác cả ca: giãn cổ tay, vai gáy cuối ca và sau khi tập.',
      troi: 'Sau ngày làm nặng, giãn cơ giúp cơ thể hồi lại cho ngày mai.',
      dv: 'Đi lại, cúi cả ngày: giãn lưng, chân trước khi ngủ.',
      vp: 'Ngồi lâu: cứ 1 giờ đứng dậy giãn vai, cổ 1–2 phút.' } }
];

/* ---------- lịch tập ở nhà (Sổ quản lý học tập GDTC · hướng dẫn tập tại nhà) ---------- */
var PLANS = {
  A: { n: 'Kế hoạch A · Mới bắt đầu', who: 'Chưa chống đẩy cơ bản được', d: '4 buổi/tuần · 40 phút/buổi (10 phút khởi động, 30 phút bài chính)', days: 4,
    body: ['Chống đẩy (nữ khuỵu gối): tối thiểu 5 cái', 'Nghỉ 15–60 giây · Plank tối thiểu 30 giây', 'Nghỉ 15–60 giây · Squat tối thiểu 20 cái', 'Nghỉ 1–3 phút, uống ngụm nước · lặp vòng 2'] },
  B: { n: 'Kế hoạch B · Thể chất tốt', who: 'Chống đẩy cơ bản trên 15 cái', d: '3 buổi/tuần · 60 phút/buổi (10–15 phút khởi động, 45 phút bài chính)', days: 3,
    body: ['Chống đẩy cơ bản 8–20 cái · nghỉ 30 giây · khuỵu gối 18–40 cái', 'Plank 60–90 giây', 'Squat 30–60 cái', 'Nghỉ 2–3 phút, bổ sung nước · lặp đến khi hết sức'] }
};
var PLAN_TIP = 'Cứ 2 ngày, tăng thêm 1–2 cái. Ghi vào sổ để so với chính mình.';
var DAYS7 = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
var SLOTS = ['Sáng sớm', 'Trưa, chiều', 'Tối'];
var PLAN_Q = 'Viết lời hẹn với chính mình: “Khi …, mình sẽ …”';
var PLAN_TIPS = ['Khi về đến phòng, mình sẽ thay đồ và khởi động ngay', 'Khi chuông báo thức reo, mình sẽ tập 10 phút trước khi rửa mặt'];

/* =========================================================
   BẾP DINH DƯỠNG (khu 'bep') · đợt 1: d1, d2, d4 (TC01.0.3) · đợt 2: d3, d5, d6 (TC01.0.4)
   Nguồn: Sổ quản lý học tập GDTC v10.1 (BMI ngưỡng 23, BMR, TDEE 5 nhóm, bảng calo /100 g, 2–2,5 L nước/ngày),
   Sổ tay sức khỏe 2.0 (giờ ăn, nhóm chất, nước, tình huống bỏ bữa, cà phê lúc đói, mệt khi làm ca).
   Rào chắn: không thực đơn giảm cân, không mục tiêu calo; số liệu chỉ để tham khảo, so với chính mình.
   ========================================================= */
var PLATE_Z = [
  { k: 'tb',  n: 'Tinh bột',      d: 'Cho năng lượng' },
  { k: 'dam', n: 'Đạm',           d: 'Nuôi cơ, giúp phục hồi' },
  { k: 'rau', n: 'Rau',           d: 'Vitamin, chất xơ' },
  { k: 'qs',  n: 'Trái cây, sữa', d: 'Vitamin, khoáng chất' }
];
/* món ăn trong ngày (bài Bữa hôm qua): g = nhóm có trong món · w = món nên ăn ít */
var MEAL_FOODS = [
  { t: 'Cơm', g: ['tb'] }, { t: 'Bánh mì không', g: ['tb'] }, { t: 'Xôi', g: ['tb'] }, { t: 'Cháo trắng', g: ['tb'] },
  { t: 'Phở, bún có thịt', g: ['tb', 'dam'] }, { t: 'Bánh mì kẹp thịt, trứng', g: ['tb', 'dam'] }, { t: 'Mì gói', g: ['tb'], w: 1 },
  { t: 'Thịt', g: ['dam'] }, { t: 'Cá', g: ['dam'] }, { t: 'Trứng', g: ['dam'] }, { t: 'Đậu phụ', g: ['dam'] },
  { t: 'Rau luộc, rau xào', g: ['rau'] }, { t: 'Canh rau', g: ['rau'] },
  { t: 'Trái cây', g: ['qs'] }, { t: 'Sữa, sữa chua', g: ['qs'] },
  { t: 'Nước ngọt, trà sữa', g: [], w: 1 }, { t: 'Bánh ngọt, snack', g: [], w: 1 }
];
var MEALS = [['sang', 'Sáng'], ['trua', 'Trưa'], ['toi', 'Tối']];
var MEAL_TXT = {
  q: 'Hôm qua bạn đã ăn gì?', sub: 'Chạm từng bữa, chọn các món đã ăn. Không ăn bữa nào thì chọn “Mình bỏ bữa này”.',
  skip: 'Mình bỏ bữa này', see: 'Xem bữa của mình', none: 'Shin không chấm điểm. Biết bữa nào thiếu gì là bước đầu.',
  good: 'Bữa [Bữa] đủ tinh bột, đạm, rau.', miss: 'Bữa [Bữa] thiếu [Nhóm].', skipped: 'Bữa [Bữa]: bạn bỏ bữa.',
  noQs: 'Cả ngày chưa có trái cây hoặc sữa.', warn: 'Có [Món]: nhiều năng lượng nhưng ít chất. Thỉnh thoảng thôi nhé.',
  allGood: 'Một ngày ăn đủ nhóm. Giữ nhịp này nhé!'
};
var COMMIT_DAYS = 21;
var HABITS = [
  { t: 'Ăn sáng trước khi đến lớp', tip: 'Khi chuông báo thức reo, mình sẽ dậy sớm 10 phút để ăn sáng' },
  { t: 'Bữa chính nào cũng có rau', tip: 'Khi mua cơm phần, mình sẽ chọn thêm một món rau' },
  { t: 'Thay nước ngọt bằng nước lọc', tip: 'Khi thấy khát, mình sẽ uống nước lọc trong bình trước' },
  { t: 'Mang bình nước theo mỗi ngày', tip: 'Khi soạn cặp buổi tối, mình sẽ đổ đầy bình nước' },
  { t: 'Ăn nhẹ trước ca làm thêm', tip: 'Khi tan học, mình sẽ ăn một cơm nắm hoặc quả chuối trước khi đi làm' },
  { t: 'Ăn tối trước giờ ngủ ít nhất 3 tiếng', tip: 'Khi có ca làm thêm buổi tối, mình sẽ ăn tối trước ca' }
];
/* máy tính: hệ số vận động (Sổ quản lý v10.1) */
var ACT_LV = [
  { n: 'Ít hoặc không vận động', f: 1.2 },
  { n: 'Vận động 1–3 lần/tuần', f: 1.375 },
  { n: 'Vận động 3–5 lần/tuần', f: 1.55 },
  { n: 'Vận động 6–7 lần/tuần', f: 1.725 },
  { n: 'Vận động nặng hơn 7 lần/tuần', f: 1.9 }
];
var BEP_TXT = {
  khuSay: 'Ở Bếp, Shin không bắt bạn ăn kiêng. Ăn đủ từ hôm nay là giữ sức cho 3–5 năm ở Nhật và cả nghề sau này.',
  plateDone: 'Đĩa đủ 4 nhóm rồi! Bữa chính nào cũng nhìn đĩa: có đủ tinh bột, đạm, rau chưa? Trái cây, sữa thì trong ngày.',
  plateWrong: 'Thử lại nhé. ',
  plateHint: 'Món này thuộc nhóm khác. Nghĩ xem nó cho cơ thể điều gì.',
  calcQ: 'Nhập số của bạn', calcSub: 'Shin lấy sẵn số ở thẻ hội viên. Sửa nếu đã thay đổi.',
  calcLv: 'Một tuần của bạn giống mức nào nhất?',
  calcNote: 'Các con số chỉ để bạn hiểu cơ thể mình, không phải để ăn kiêng. Muốn tăng hoặc giảm cân, hỏi thầy cô GDTC hoặc nhân viên y tế.',
  bmiNote: 'BMI không phân biệt cơ và mỡ. Người tập nhiều có thể có BMI cao hơn.',
  bmiSay: ['Hơi nhẹ cân so với chiều cao. Ăn đủ 3 bữa, thêm đạm; hỏi thầy cô GDTC cách tăng cân an toàn.',
    'Trong khoảng bình thường. Giữ nhịp ăn đủ, tập đều nhé.',
    'Cao hơn khoảng bình thường một chút. Đừng nhịn ăn: hỏi thầy cô GDTC cách điều chỉnh an toàn.',
    'Cao hơn khoảng bình thường. Đừng nhịn ăn: hỏi thầy cô GDTC hoặc nhân viên y tế cách điều chỉnh an toàn.'],
  waterNote: 'Ngày nóng, ca nặng, giờ tập: uống thêm. Uống từng ngụm, chia đều trong ngày.',
  hiloQ: 'Cùng 100 g, món nào nhiều năng lượng hơn?', hiloSrc: 'Số liệu: bảng calo cơ bản, Sổ quản lý học tập GDTC (trên 100 g, tham khảo).',
  hiloEnd: 'Món chiên, món ngọt đậm năng lượng hơn nhiều. Không cấm, chỉ cần biết để chọn cho hợp.',
  dayIntro: 'Đây là một ngày của một bạn học viên (nhân vật minh họa). Có 4 việc ăn uống chưa ổn. Chạm vào từng việc.',
  dayOk: 'Việc này ổn: ', dayHint: 'Gợi ý: các việc chưa ổn đang nhấp nháy nhẹ.',
  commitSay: 'Biết rồi thì phải làm được. Chọn một thói quen thôi, làm đủ 21 ngày.',
  commitQ: 'Bạn chọn thói quen nào?', commitOwn: 'Thói quen khác của mình',
  commitW: 'Viết lời hẹn với chính mình: “Khi …, mình sẽ …”', commitSub: 'Viết từ 10 chữ trở lên được thêm Insight.',
  commitCard: 'Cam kết 21 ngày', commitBtn: 'Hôm nay mình đã làm được', commitToday: 'Hôm nay đã đánh dấu. Mai gặp lại nhé!',
  commitEnd: 'Đủ 21 ngày rồi! Thói quen này đang thành của bạn.'
};

/* ---------- Bếp đợt 2 (TC01.0.4): d3, d5, d6 ---------- */
var BEP2_TXT = {
  matchSel: 'Đã chọn [Món]. Giờ chạm món Nhật hợp với nó.', matchNo: 'Thử lại nhé. Hai món này chưa giống nhau. Nghĩ xem món Việt được làm thế nào.',
  matchEnd: 'Ở Nhật vẫn có món quen. Biết tên món bằng tiếng Nhật là tự chọn được bữa đủ chất.',
  bkTotal: 'Trong giỏ', bkLeft: 'Còn', bkOver: 'Vượt [N] yên. Bỏ bớt một món nhé.', bkNeed: 'Giỏ còn thiếu: [Nhóm].',
  bkDone: 'Đủ tinh bột, đạm, rau, còn dư [N] yên.', bkMoney: 'Mỗi ngày làm việc một bữa như vậy: [T] yên × [D] ngày = [M] yên một tháng (giá minh họa). Tự nấu ở ký túc xá thường đỡ tốn hơn, giữ tiền cho mục tiêu của bạn.',
  lbHead: 'Nhãn thành phần dinh dưỡng', lbNo: 'Thử lại nhé. Dòng bạn chạm là: ', lbEnd: 'Đọc được 3 dòng này là chọn món ở Nhật tự tin hơn: năng lượng, đạm, muối.',
  lbSrc: 'Nhãn và số liệu minh họa. Thứ tự các dòng theo cách ghi nhãn phổ biến ở Nhật.',
  shQ: 'Ca làm hoặc lịch học của bạn', shSub: 'Chọn một mẫu gần nhất, rồi chỉnh giờ bắt đầu, số giờ cho đúng.',
  shSay: 'Ăn cùng giờ mỗi ngày giúp cơ thể quen nhịp. Lịch này để tham khảo, sửa cho hợp ca thật của bạn.',
  shBefore: 'Trước ca: bữa chính', shBeforeD: 'Ăn trước giờ vào ca 1–2 tiếng, đủ tinh bột, đạm, rau.',
  shMidMain: 'Giữa ca: bữa chính', shMidLight: 'Giữa ca: bữa nhẹ', shMidD: 'Ăn vào giờ nghỉ. Mang sẵn hộp cơm hoặc cơm nắm, trái cây.',
  shAfterMain: 'Sau ca: bữa chính', shAfterLight: 'Sau ca: bữa nhẹ, dễ tiêu', shAfterD: 'Về muộn hoặc sắp đi ngủ thì ăn nhẹ: cháo, cơm ít với rau, trứng.', shAfterDM: 'Ăn đủ bữa, rồi nghỉ ngơi.',
  shWater: 'Mỗi giờ nghỉ: vài ngụm nước', shShort: 'Ca ngắn: ăn trước ca là đủ, mang theo nước.',
  btSel: 'Hộp cơm của bạn', btEnd: 'Hộp cơm đủ nhóm rồi! Ba điều để mang đi an toàn:',
  dtIntro: 'Hai loại hạn trên bao bì ở Nhật', dtToday: 'Hôm nay là', dtFmt: 'Ngày ghi theo năm.tháng.ngày: 26.11.15 là 15/11/2026.',
  dtYes: 'Ăn được', dtNo: 'Không ăn',
  dtHint: { shohi: 'Gợi ý: 消費期限 là hạn an toàn. So với ngày hôm nay.', shomi: 'Gợi ý: 賞味期限 là hạn ngon nhất, không phải hạn an toàn.', note: 'Gợi ý: đọc kỹ dòng về cách cất giữ.' },
  dtEnd: 'Hạn chỉ đúng khi chưa mở và cất đúng cách. Không chắc thì đừng ăn.'
};
var DATE_LAB = {
  shohi: { j: '消費期限', k: 'しょうひきげん', n: 'Hạn an toàn', d: 'Đồ nhanh hỏng: cơm hộp, bánh mì kẹp, thịt cá tươi. Qua ngày là không ăn.' },
  shomi: { j: '賞味期限', k: 'しょうみきげん', n: 'Hạn ngon nhất', d: 'Đồ để lâu: mì ly, snack, đồ hộp. Qua ngày một chút, chưa mở, vẫn ăn được.' }
};
/* giờ ăn theo ca: s giờ bắt đầu (0–23), l số giờ */
var SHIFTS = [
  { n: 'Ngày học ở trường', s: 8, l: 9 },
  { n: 'Ca ngày', s: 8, l: 9 },
  { n: 'Ca sớm', s: 6, l: 9 },
  { n: 'Ca chiều', s: 14, l: 9 },
  { n: 'Ca đêm', s: 22, l: 9 },
  { n: 'Làm thêm buổi tối', s: 18, l: 4 }
];

var BAI_BEP = [
  { id: 'd1', t: 'Đĩa cơm của mình', ic: 'bowl', sub: 'Ăn vậy đủ chưa? Bốn nhóm trong một ngày', min: 10,
    acts: [
      { id: 'd1a', k: 'plate', t: 'Xếp đĩa đủ nhóm', min: 3, xp: 10,
        q: 'Xếp 12 món vào đúng nhóm.', sub: 'Chạm một món, rồi chạm nhóm của món đó trên đĩa.',
        items: [
          { t: 'Cơm trắng', z: 'tb' }, { t: 'Bánh mì', z: 'tb' }, { t: 'Khoai lang', z: 'tb', h: 'Khoai lang nhiều tinh bột, ăn thay cơm được.' },
          { t: 'Trứng', z: 'dam' }, { t: 'Cá thu', z: 'dam' }, { t: 'Đậu phụ', z: 'dam', h: 'Đậu phụ làm từ đậu nành: đạm từ thực vật.' },
          { t: 'Rau muống', z: 'rau' }, { t: 'Cải bắp', z: 'rau' }, { t: 'Cà rốt', z: 'rau', h: 'Cà rốt là củ dùng làm rau, nhiều vitamin.' },
          { t: 'Chuối', z: 'qs' }, { t: 'Cam', z: 'qs' }, { t: 'Sữa chua', z: 'qs', h: 'Sữa chua thuộc nhóm sữa.' }
        ] },
      { id: 'd1b', k: 'meal', t: 'Bữa hôm qua của bạn', min: 4, xp: 10 },
      { id: 'd1c', k: 'write', t: 'Bữa mai mình thêm…', min: 3, xp: 15,
        say: 'Chỉ cần thêm một món là bữa ăn đã khác. Viết ra để mai nhớ làm nhé.',
        q: 'Bữa mai, bạn sẽ thêm hoặc đổi món gì?', sub: 'Viết cụ thể: bữa nào, món gì. Từ 10 chữ trở lên được thêm Insight.',
        tips: ['Bữa sáng mai mình sẽ ăn thêm một quả trứng', 'Bữa trưa mai mình sẽ chọn thêm một đĩa rau luộc', 'Mai mình sẽ ăn một quả chuối thay cho ly trà sữa'] }
    ],
    gtip: {
      xuong: 'Đứng máy cả ca tốn sức. Bữa trưa đủ tinh bột, đạm thì chiều không bị đuối.',
      chuyen: 'Làm theo ca, giờ ăn hay bị lệch. Mang theo bữa đủ nhóm thì không phải ăn vội.',
      troi: 'Làm ngoài trời tốn rất nhiều sức. Bữa chính cần đủ cơm, đạm, rau.',
      dv: 'Đi lại, đỡ người cả ngày. Ăn đủ bữa để không bị choáng giữa ca.',
      vp: 'Ngồi nhiều, ít vận động. Thêm rau, bớt đồ chiên và nước ngọt.' } },

  { id: 'd2', t: 'Năng lượng của mình', ic: 'drop', sub: 'BMI, năng lượng cần mỗi ngày, lượng nước', min: 10,
    acts: [
      { id: 'd2a', k: 'calc', t: 'Máy tính của mình', min: 4, xp: 10 },
      { id: 'd2b', k: 'hilo', t: 'Món nào đậm năng lượng hơn?', min: 3, xp: 10,
        pairs: [
          { a: ['Mì gói (vắt khô)', 435], b: ['Bún', 110], why: 'Mì gói đã chiên qua dầu nên đậm năng lượng, lại ít đạm, ít rau.' },
          { a: ['Khoai tây chiên', 525], b: ['Khoai tây luộc', 92], why: 'Cùng là khoai tây, chiên dầu thì năng lượng gấp hơn 5 lần.' },
          { a: ['Đậu phộng', 573], b: ['Đậu phụ', 95], why: 'Đậu phộng nhiều chất béo, rất đậm năng lượng: một nắm nhỏ là đủ.' },
          { a: ['Sữa đặc có đường', 336], b: ['Sữa tươi', 74], why: 'Sữa đặc phần lớn là đường. Cà phê sữa đặc mỗi ngày là nạp khá nhiều đường.' },
          { a: ['Bánh sô-cô-la', 449], b: ['Bánh mì', 249], why: 'Bánh ngọt thêm đường và bơ nên đậm năng lượng hơn bánh mì.' }
        ] },
      { id: 'd2c', k: 'pick', t: 'Ca làm của mình cần gì?', min: 2, xp: 10,
        byGroup: {
          xuong: { q: 'Xưởng nóng, bạn đổ nhiều mồ hôi. Uống nước thế nào là đúng?',
            opts: [
              { t: 'Uống từng ngụm, đều đặn mỗi giờ, cả khi chưa khát', ok: 1, why: 'Đúng rồi! Chờ khát mới uống là cơ thể đã thiếu nước rồi.' },
              { t: 'Chờ đến giờ nghỉ trưa, uống một lần thật nhiều cho đã khát', why: 'Uống dồn một lúc khó hấp thu, cả buổi sáng vẫn thiếu nước.' },
              { t: 'Uống nước ngọt có ga thật lạnh cho mát và đỡ mệt', why: 'Nước ngọt nhiều đường, không bù nước tốt bằng nước lọc.' }
            ] },
          chuyen: { q: 'Bạn làm ca đêm ở dây chuyền, từ 22 giờ đến 7 giờ sáng. Ăn thế nào?',
            opts: [
              { t: 'Ăn bữa chính trước ca, giữa ca ăn nhẹ, về nhà không ăn quá no', ok: 1, why: 'Đúng rồi! Có năng lượng suốt ca, về nhà vẫn ngủ được.' },
              { t: 'Nhịn cả ca cho tỉnh, về phòng ăn một bữa thật no rồi ngủ luôn', why: 'Nhịn lâu dễ choáng giữa ca; ăn no rồi ngủ ngay dễ khó tiêu.' },
              { t: 'Uống cà phê, nước tăng lực suốt ca để thay cho bữa ăn', why: 'Chất kích thích không thay được bữa ăn, còn làm khó ngủ hơn.' }
            ] },
          troi: { q: 'Mùa hè ở Nhật có ngày trên 35 độ. Làm ngoài trời cả ngày, bạn chuẩn bị gì?',
            opts: [
              { t: 'Nhiều nước, thêm đồ bù muối khoáng, nghỉ uống theo giờ', ok: 1, why: 'Đúng rồi! Mồ hôi mất cả nước lẫn muối, nên bù cả hai.' },
              { t: 'Chỉ mang một chai nước nhỏ cho đỡ phải đi vệ sinh nhiều', why: 'Thiếu nước khi trời nóng rất dễ say nắng, choáng.' },
              { t: 'Mang nước ngọt có ga thật lạnh, khát thì uống một hơi cho đã', why: 'Nước ngọt nhiều đường; uống một hơi lớn cũng khó hấp thu.' }
            ] },
          dv: { q: 'Ca nhà hàng bận, giờ ăn trưa bị lùi đến 15 giờ. Bạn làm gì?',
            opts: [
              { t: 'Ăn nhẹ trước ca (cơm nắm, chuối), đến giờ nghỉ thì ăn bữa đủ', ok: 1, why: 'Đúng rồi! Có bữa nhẹ lót dạ thì không bị đói cồn cào, choáng.' },
              { t: 'Nhịn luôn bữa trưa cho kịp việc, tối về nhà ăn bù gấp đôi cho đủ', why: 'Nhịn lâu dễ choáng khi bưng bê; ăn bù không bù được lúc thiếu sức.' },
              { t: 'Ăn vặt bánh kẹo, uống nước ngọt suốt ca cho đỡ đói', why: 'Đồ ngọt cho no nhanh rồi đói nhanh, lại thiếu đạm và rau.' }
            ] },
          vp: { q: 'Bạn ngồi học, ngồi làm việc gần cả ngày. Bữa trưa nên thế nào?',
            opts: [
              { t: 'Đủ bốn nhóm, nhiều rau, bớt đồ chiên, uống nước lọc', ok: 1, why: 'Đúng rồi! Ít vận động thì càng cần bữa ăn đủ chất, ít dầu mỡ.' },
              { t: 'Bỏ bữa trưa vì ngồi một chỗ thì không tốn sức gì', why: 'Não cũng cần năng lượng. Bỏ bữa dễ mệt, khó tập trung.' },
              { t: 'Ăn mì gói, uống trà sữa cho nhanh để tiết kiệm thời gian', why: 'Nhanh nhưng ít chất, nhiều đường và dầu mỡ.' }
            ] }
        } }
    ],
    gtip: {
      xuong: 'Xưởng nóng, đổ nhiều mồ hôi: uống nước đều suốt ca.',
      chuyen: 'Có nơi lạnh, ẩm, có ca đêm. Cơ thể vẫn cần đủ nước và năng lượng.',
      troi: 'Ngoài trời mùa hè rất nóng. Bạn cần nhiều nước hơn, có cả muối khoáng.',
      dv: 'Đi lại cả ngày tốn sức hơn bạn nghĩ. Luôn mang nước theo.',
      vp: 'Ngồi nhiều thì cần ít năng lượng hơn. Ăn đủ chất, bớt ăn vặt.' } },

  { id: 'd3', t: 'Món Việt, món Nhật', ic: 'swap', sub: 'Món quen ở Nhật, giỏ konbini, đọc nhãn', min: 11,
    acts: [
      { id: 'd3a', k: 'match', t: 'Món nào giống món nào?', min: 3, xp: 10,
        q: 'Ghép món Việt với món Nhật gần giống.', sub: 'Chạm một món Việt, rồi chạm món Nhật hợp với nó.',
        pairs: [
          { v: 'Cơm nắm', j: 'おにぎり', r: 'onigiri', why: 'Có ở mọi konbini. Thêm trứng, rau là thành bữa nhẹ đủ chất.' },
          { v: 'Cháo trắng', j: 'お粥', k: 'おかゆ', r: 'okayu', why: 'Người Nhật hay ăn khi mệt, khi ốm. Dễ tiêu.' },
          { v: 'Canh rau', j: '味噌汁', k: 'みそしる', r: 'misoshiru', why: 'Canh tương miso với rong biển, đậu phụ, rau. Khá mặn: mỗi bữa một bát là vừa.' },
          { v: 'Chả giò', j: '春巻き', k: 'はるまき', r: 'harumaki', why: 'Cũng chiên dầu như chả giò. Ăn kèm rau cho cân bằng.' },
          { v: 'Gà chiên', j: '唐揚げ', k: 'からあげ', r: 'karaage', why: 'Món chiên rất hay gặp trong cơm hộp. Ngon nhưng nhiều dầu.' },
          { v: 'Thịt kho', j: '豚の角煮', k: 'ぶたのかくに', r: 'buta no kakuni', why: 'Thịt ba chỉ kho ngọt, khá giống thịt kho. Nhiều mỡ: ăn vừa phải.' }
        ] },
      { id: 'd3b', k: 'basket', t: 'Giỏ konbini 600 yên', min: 4, xp: 10, budget: 600, days: 22,
        q: 'Chọn bữa trưa ở konbini: đủ tinh bột, đạm, rau, không quá 600 yên.', sub: 'Chạm để bỏ vào giỏ, chạm lần nữa để bỏ ra. Giá minh họa.',
        items: [
          { j: 'おにぎり', v: 'Cơm nắm cá hồi', p: 150, g: ['tb'] },
          { j: '菓子パン', k: 'かしパン', v: 'Bánh mì ngọt', p: 160, g: ['tb'], w: 'Bánh mì ngọt nhiều đường, bơ: no nhanh, đói nhanh.' },
          { j: 'カップラーメン', v: 'Mì ly', p: 220, g: ['tb'], w: 'Mì ly nhiều dầu, muối, ít đạm và rau.' },
          { j: 'ゆで卵', k: 'ゆでたまご', v: 'Trứng luộc', p: 90, g: ['dam'] },
          { j: 'サラダチキン', v: 'Ức gà luộc', p: 250, g: ['dam'] },
          { j: '唐揚げ', k: 'からあげ', v: 'Gà chiên', p: 250, g: ['dam'], w: 'Gà chiên ngon nhưng nhiều dầu.' },
          { j: 'サラダ', v: 'Rau trộn', p: 250, g: ['rau'] },
          { j: 'ほうれん草のおひたし', k: 'ほうれんそうのおひたし', v: 'Rau bina luộc', p: 180, g: ['rau'] },
          { j: 'バナナ', v: 'Chuối', p: 120, g: ['qs'] },
          { j: '牛乳', k: 'ぎゅうにゅう', v: 'Sữa tươi', p: 130, g: ['qs'] },
          { j: 'エナジードリンク', v: 'Nước tăng lực', p: 210, g: [], w: 'Nước tăng lực nhiều đường, caffeine, không thay được bữa ăn.' },
          { j: 'お茶', k: 'おちゃ', v: 'Trà xanh chai', p: 140, g: [] }
        ] },
      { id: 'd3c', k: 'label', t: 'Đọc nhãn dinh dưỡng', min: 3, xp: 10,
        prod: 'おにぎり（鮭）', prodV: 'Cơm nắm cá hồi', per: '1個（110g）当たり', perV: 'Các số tính cho 1 cái (110 g)',
        rows: [
          { j: 'エネルギー', r: 'enerugī', v: 'Năng lượng', n: '180kcal' },
          { j: 'たんぱく質', r: 'tanpakushitsu', v: 'Đạm', n: '4.5g' },
          { j: '脂質', r: 'shishitsu', v: 'Chất béo', n: '1.5g' },
          { j: '炭水化物', r: 'tansuikabutsu', v: 'Tinh bột, đường', n: '38.0g' },
          { j: '食塩相当量', r: 'shokuen sōtōryō', v: 'Muối', n: '1.1g' }
        ],
        rounds: [
          { q: 'Chạm dòng cho biết năng lượng.', ok: 0, why: 'エネルギー là năng lượng, tính bằng kcal. Có nhãn ghi 熱量 (netsuryō), cùng nghĩa.' },
          { q: 'Chạm dòng cho biết lượng đạm.', ok: 1, why: 'たんぱく質 là đạm. Làm việc nặng, tập nhiều thì cần đủ đạm.' },
          { q: 'Chạm dòng cho biết lượng muối.', ok: 4, why: '食塩相当量 là lượng muối. Mì ly, canh miso thường khá mặn.' },
          { q: 'Các con số tính cho bao nhiêu? Chạm dòng đó.', ok: 'p', why: '1個当たり là “tính cho 1 cái”. Ăn 2 cái thì nhân đôi các số.' }
        ] }
    ],
    gtip: {
      xuong: 'Tăng ca hay mua đồ ở konbini. Chọn cơm nắm, trứng, rau; bớt mì ly.',
      chuyen: 'Làm xưởng thực phẩm, bạn sẽ gặp nhiều nhãn tiếng Nhật. Tập đọc từ bây giờ.',
      troi: 'Làm ngoài trời cần bữa trưa chắc bụng. Cơm nắm, trứng, rau dễ mua ở konbini.',
      dv: 'Nhà hàng, khách sạn, kaigo: biết tên món Nhật giúp bạn làm việc, trò chuyện dễ hơn.',
      vp: 'Ngồi nhiều thì xem dòng エネルギー trên nhãn, bớt đồ chiên, đồ ngọt.' } },


  { id: 'd4', t: 'Lỗi ăn uống hay gặp', ic: 'alert', sub: 'Bỏ bữa sáng, mì gói, nước ngọt, nhịn ăn', min: 12,
    acts: [
      { id: 'd4a', k: 'day', t: 'Một ngày của bạn cùng lớp', min: 4, xp: 10,
        items: [
          { h: '05:45', t: 'Thức dậy, uống một ly nước.', ok: 'Uống nước sau khi ngủ dậy là thói quen tốt.' },
          { h: '07:30', t: 'Không kịp ăn sáng. Mua ly cà phê sữa đá, uống trên đường đến trường.', err: 1,
            n: 'Bỏ bữa sáng, uống cà phê lúc bụng đói', why: 'Bụng rỗng gặp cà phê dễ cồn cào, đau bụng. Thiếu bữa sáng thì giờ học khó tập trung.' },
          { h: '08:00', t: 'Vào học tiếng Nhật. Mang theo bình nước, uống từng ngụm.', ok: 'Uống từng ngụm, chia đều trong ngày là đúng.' },
          { h: '11:30', t: 'Ăn trưa: cơm, cá kho, rau luộc, canh.', ok: 'Đủ tinh bột, đạm, rau. Bữa trưa tốt.' },
          { h: '16:45', t: 'Tan giờ thể chất, uống liền một lon nước tăng lực cho đỡ mệt.', err: 1,
            n: 'Dùng nước tăng lực thay nước lọc', why: 'Nước tăng lực nhiều đường và caffeine. Sau giờ tập, nước lọc là đủ.' },
          { h: '17:30', t: 'Đi làm thêm đến 22 giờ. Không ăn tối vì sợ mập.', err: 1,
            n: 'Nhịn ăn tối vì sợ mập', why: 'Nhịn ăn làm thiếu năng lượng, dễ choáng khi làm việc. Muốn giữ dáng thì ăn đủ và vận động đều.' },
          { h: '22:30', t: 'Về phòng đói quá. Nấu hai gói mì, ăn xong đi ngủ ngay.', err: 1,
            n: 'Ăn mì gói thay bữa, ăn xong ngủ ngay', why: 'Mì gói chủ yếu là tinh bột và dầu, ít đạm, ít rau. Ăn no sát giờ ngủ dễ khó tiêu.' },
          { h: '22:55', t: 'Đánh răng, đi ngủ.', ok: 'Ngủ trước 23 giờ giúp cơ thể hồi sức.' }
        ] },
      { id: 'd4b', k: 'pick', t: 'Đổi món', min: 4, xp: 10,
        rounds: [
          { q: 'Không kịp ăn sáng. Cách nào hợp nhất?',
            opts: [
              { t: 'Mua ổ bánh mì trứng hoặc hộp sữa, ăn trước giờ học', ok: 1, why: 'Đúng rồi! Có chút tinh bột và đạm lót dạ; cà phê để sau bữa ăn.' },
              { t: 'Uống cà phê thật đậm cho tỉnh, trưa ăn bù thật nhiều vào', why: 'Bụng rỗng gặp cà phê đậm dễ đau bụng. Ăn bù không bù được buổi sáng thiếu sức.' },
              { t: 'Nhịn đến trưa, quen dần thì cơ thể sẽ hết thấy đói', why: 'Cơ thể không quen được việc thiếu năng lượng. Bạn chỉ mệt và khó tập trung hơn.' }
            ] },
          { q: 'Tập xong thấy mệt và khát. Uống gì?',
            opts: [
              { t: 'Nước lọc, uống từng ngụm', ok: 1, why: 'Đúng rồi! Sau giờ tập thông thường, nước lọc bù nước tốt nhất.' },
              { t: 'Một lon nước tăng lực cho tỉnh người, đỡ mệt nhanh hơn', why: 'Nhiều đường và caffeine. Mệt thì cần nghỉ, nước lọc và bữa ăn.' },
              { t: 'Một ly trà sữa trân châu thật lớn cho đã khát', why: 'Trà sữa nhiều đường, no bụng mà ít chất. Để làm món thưởng thỉnh thoảng thôi.' }
            ] },
          { q: 'Bạn muốn giữ dáng. Cách nào đúng?',
            opts: [
              { t: 'Ăn đủ 3 bữa, bớt đồ chiên, nước ngọt, vận động đều', ok: 1, why: 'Đúng rồi! Giữ dáng bền là ăn đủ, chọn món tốt và tập đều.' },
              { t: 'Bỏ bữa tối, chỉ uống nước cho nhẹ bụng', why: 'Nhịn ăn dễ choáng, mệt, rồi lại ăn bù nhiều hơn. Cần giảm cân thì hỏi thầy cô hoặc nhân viên y tế.' },
              { t: 'Uống trà giảm cân mua trên mạng, quảng cáo giảm 5 kg một tuần', why: 'Sản phẩm không rõ nguồn gốc có thể hại sức khỏe. Không có cách giảm cân an toàn nhanh như vậy.' }
            ] },
          { q: 'Đi làm thêm về muộn, rất đói. Bạn làm gì?',
            opts: [
              { t: 'Ăn nhẹ trước ca; về ăn ít cơm với rau, trứng', ok: 1, why: 'Đúng rồi! Có bữa nhẹ trước ca thì về không đói cồn cào, bữa muộn cũng nhẹ hơn.' },
              { t: 'Nấu luôn hai gói mì cho nhanh, ăn thật no rồi lên giường ngủ', why: 'Mì gói ít chất; ăn no sát giờ ngủ dễ khó tiêu, khó ngủ.' },
              { t: 'Nhịn đến sáng mai, ngủ sớm rồi sẽ quên đói thôi', why: 'Đói lâu dễ mất ngủ, sáng dậy mệt và dễ choáng.' }
            ] }
        ] },
      { id: 'd4c', k: 'commit', t: 'Cam kết 21 ngày', min: 3, xp: 15 }
    ],
    gtip: {
      xuong: 'Tăng ca dễ bỏ bữa, ăn mì gói. Chuẩn bị sẵn bữa nhẹ mang theo.',
      chuyen: 'Ca đêm dễ dùng cà phê, nước tăng lực để thức. Ăn nhẹ giữa ca tốt hơn.',
      troi: 'Trời nóng dễ uống nhiều nước ngọt lạnh. Nước lọc, nước bù khoáng tốt hơn.',
      dv: 'Giờ ăn hay bị lùi. Ăn nhẹ trước ca để không đói cồn cào.',
      vp: 'Ngồi học lâu dễ ăn vặt, uống trà sữa. Để bình nước lọc ngay trên bàn.' } },

  { id: 'd5', t: 'Ăn theo ca và nghề', ic: 'timer', sub: 'Ca đêm, đứng lâu, nắng nóng, hộp cơm mang đi', min: 12,
    acts: [
      { id: 'd5a', k: 'pick', t: 'Tình huống của nhóm mình', min: 4, xp: 10,
        byGroup: {
          xuong: { rounds: [
            { q: 'Ca 8–17 giờ, đứng máy cả ca, có tăng ca đến 19 giờ. Buổi chiều ăn thế nào?',
              opts: [
                { t: 'Ăn nhẹ trước giờ tăng ca (cơm nắm, chuối), về ăn tối đủ bữa', ok: 1, why: 'Đúng rồi! Có chút năng lượng thì hai giờ tăng ca không bị đuối, tay vẫn chắc.' },
                { t: 'Nhịn đến khi về phòng rồi ăn một bữa thật no cho bù lại cả buổi', why: 'Đói lâu khi đứng máy dễ choáng, dễ sơ suất. Ăn bù không bù được lúc thiếu sức.' },
                { t: 'Uống một lon nước tăng lực để làm tiếp cho hết giờ', why: 'Nước tăng lực chỉ làm tỉnh một lúc. Cơ thể vẫn thiếu năng lượng.' }
              ] },
            { q: 'Sau bữa trưa bạn hay buồn ngủ, đứng máy chiều rất mệt. Vì sao, và nên làm gì?',
              opts: [
                { t: 'Ăn vừa no, đủ cơm, đạm, rau; không ăn quá no', ok: 1, why: 'Đúng rồi! Ăn quá no làm người nặng nề, buồn ngủ. Vừa đủ thì chiều vẫn tỉnh.' },
                { t: 'Ăn thật nhiều cơm cho có sức làm hết cả buổi chiều', why: 'Ăn quá no làm người nặng nề, buồn ngủ hơn.' },
                { t: 'Bỏ bữa trưa, ăn bánh ngọt và cà phê sữa cho tỉnh táo', why: 'Đồ ngọt cho tỉnh một lúc rồi mệt nhanh, lại thiếu đạm, rau.' }
              ] } ] },
          chuyen: { rounds: [
            { q: 'Xưởng chế biến thực phẩm lạnh suốt ca. Bạn thấy ít khát. Nên làm gì?',
              opts: [
                { t: 'Vẫn uống nước đều trong giờ nghỉ, uống nước ấm cũng được', ok: 1, why: 'Đúng rồi! Trời lạnh vẫn mất nước qua hơi thở, qua đi vệ sinh. Ít khát không có nghĩa là đủ nước.' },
                { t: 'Làm nơi lạnh không đổ mồ hôi nên cả ca không cần uống nước', why: 'Cơ thể vẫn mất nước dù không thấy mồ hôi.' },
                { t: 'Uống thật nhiều cà phê nóng cho người ấm và tỉnh', why: 'Cà phê nhiều làm đi vệ sinh nhiều hơn, khó ngủ sau ca.' }
              ] },
            { q: 'Tuần này ca ngày, tuần sau ca đêm. Giữ sức thế nào?',
              opts: [
                { t: 'Giữ đủ 3 bữa theo giờ của ca, ngủ đủ giờ dù ngủ ban ngày', ok: 1, why: 'Đúng rồi! Ăn, ngủ theo nhịp của ca giúp cơ thể quen nhanh hơn.' },
                { t: 'Đói lúc nào ăn lúc đó, ăn vặt khi buồn ngủ để giữ tỉnh táo', why: 'Ăn vặt liên tục làm bữa chính lộn xộn, dễ thiếu chất.' },
                { t: 'Ca đêm về là ngủ luôn, bỏ bữa, chiều dậy ăn bù', why: 'Bỏ bữa rồi ăn bù dễ đau dạ dày, mệt khi vào ca.' }
              ] } ] },
          troi: { rounds: [
            { q: '6 giờ sáng đã ra công trường. Ăn sáng thế nào?',
              opts: [
                { t: 'Ăn sáng trước khi đi: cơm nắm, trứng, chuối; mang thêm nước', ok: 1, why: 'Đúng rồi! Việc nặng từ sáng sớm cần năng lượng ngay.' },
                { t: 'Không kịp ăn sáng, đến giờ nghỉ trưa thì ăn bù một bữa thật no', why: 'Làm nặng cả buổi sáng khi bụng rỗng dễ choáng, dễ tai nạn.' },
                { t: 'Uống một lon cà phê rồi đi làm luôn', why: 'Cà phê lúc đói dễ cồn cào, không cho bạn sức làm việc.' }
              ] },
            { q: 'Mùa đông ở Nhật, làm ngoài trời rét. Bạn chú ý gì?',
              opts: [
                { t: 'Vẫn ăn đủ bữa, uống nước ấm; cơ thể cần năng lượng để giữ ấm', ok: 1, why: 'Đúng rồi! Trời lạnh cơ thể tốn năng lượng để giữ ấm, vẫn cần nước.' },
                { t: 'Trời lạnh, người không thấy khát nên cả ngày không cần uống nước lọc', why: 'Cơ thể vẫn mất nước khi làm việc nặng, cả khi trời lạnh.' },
                { t: 'Uống rượu cho ấm người trước khi ra công trường', why: 'Rượu bia làm phản xạ chậm, rất nguy hiểm khi làm việc. Không bao giờ uống trước ca.' }
              ] } ] },
          dv: { rounds: [
            { q: 'Ca sớm kaigo bắt đầu 7 giờ, phải đỡ người, đẩy xe lăn. Ăn gì trước ca?',
              opts: [
                { t: 'Ăn nhẹ có tinh bột và đạm: cơm nắm, trứng, sữa', ok: 1, why: 'Đúng rồi! Đỡ người cần sức. Bữa nhẹ đủ chất giúp bạn vững tay.' },
                { t: 'Nhịn đến giờ nghỉ cho nhẹ người, đỡ người dễ hơn', why: 'Đói khi làm việc nặng dễ choáng, nguy hiểm cho cả bạn và người được chăm sóc.' },
                { t: 'Uống một ly cà phê sữa đá lớn thay bữa sáng', why: 'Cà phê không thay được bữa ăn, lúc đói còn dễ cồn cào.' }
              ] },
            { q: 'Ca đêm kaigo, 2 giờ sáng thấy đói và buồn ngủ. Ăn gì?',
              opts: [
                { t: 'Bữa nhẹ dễ tiêu: cơm nắm, súp, sữa chua', ok: 1, why: 'Đúng rồi! Ăn nhẹ giữa đêm đỡ đói mà không nặng bụng.' },
                { t: 'Mì ly cay thật to với một lon nước tăng lực cho tỉnh hẳn', why: 'Mì cay, nhiều dầu giữa đêm dễ khó tiêu. Nước tăng lực làm khó ngủ sau ca.' },
                { t: 'Bánh kẹo ngọt suốt đêm cho đỡ buồn ngủ', why: 'Đồ ngọt cho tỉnh một lúc rồi mệt hơn, lại thiếu chất.' }
              ] } ] },
          vp: { rounds: [
            { q: 'Ngồi máy tính cả ngày, chiều hay buồn ngủ, thèm đồ ngọt. Nên làm gì?',
              opts: [
                { t: 'Đứng dậy đi lại vài phút, uống nước, ăn trái cây', ok: 1, why: 'Đúng rồi! Vận động nhẹ và uống nước giúp tỉnh lại, không thêm nhiều đường.' },
                { t: 'Ăn một gói snack và một ly trà sữa cho tỉnh táo', why: 'Đồ ngọt cho tỉnh một lúc rồi mệt hơn. Ngồi nhiều lại càng nên bớt.' },
                { t: 'Uống hai lon nước tăng lực mỗi chiều cho dễ tập trung', why: 'Nhiều đường, caffeine, tối khó ngủ, sáng lại mệt.' }
              ] },
            { q: 'Bạn làm thêm ca đêm ở konbini, 22 giờ đến 6 giờ sáng. Ăn thế nào?',
              opts: [
                { t: 'Ăn tối trước ca, giữa ca ăn nhẹ, về ăn nhẹ rồi ngủ', ok: 1, why: 'Đúng rồi! Có năng lượng suốt ca, về vẫn ngủ ngon.' },
                { t: 'Nhịn suốt ca vì bận, sáng về ăn thật no rồi ngủ ngay', why: 'Đói lâu dễ choáng; ăn no rồi ngủ ngay dễ khó tiêu.' },
                { t: 'Uống cà phê, nước tăng lực suốt ca thay bữa ăn', why: 'Chất kích thích không thay được bữa ăn, còn làm khó ngủ.' }
              ] } ] }
        } },
      { id: 'd5b', k: 'shift', t: 'Giờ ăn theo ca của mình', min: 4, xp: 10 },
      { id: 'd5c', k: 'bento', t: 'Hộp cơm mang đi', min: 4, xp: 15,
        q: 'Xếp hộp cơm mang đi cho ca của bạn.', sub: 'Mỗi ngăn chọn một món. Món chưa hợp mang đi, Shin sẽ nói vì sao.',
        slots: [
          { k: 'tb', n: 'Ngăn cơm', opts: [{ t: 'Cơm trắng' }, { t: 'Cơm nắm' }, { t: 'Khoai lang luộc' },
            { t: 'Mì gói nấu sẵn', no: 'Mì nấu sẵn để vài giờ bị nở, nhão, lại ít chất. Chọn món khác nhé.' }] },
          { k: 'dam', n: 'Ngăn đạm', opts: [{ t: 'Trứng luộc chín' }, { t: 'Thịt kho' }, { t: 'Cá chiên' },
            { t: 'Gỏi cá sống', no: 'Đồ sống để nhiều giờ rất dễ hỏng, dễ ngộ độc. Mang đi thì nấu chín.' },
            { t: 'Trứng lòng đào', no: 'Trứng chưa chín kỹ để lâu dễ hỏng. Mang đi thì luộc chín hẳn.' }] },
          { k: 'rau', n: 'Ngăn rau', opts: [{ t: 'Rau luộc để ráo nước' }, { t: 'Cà rốt, bông cải luộc' }, { t: 'Rau xào' },
            { t: 'Rau sống trộn sẵn nước sốt', no: 'Rau trộn sẵn nước sốt để lâu dễ úng, dễ hỏng. Chọn rau luộc để ráo.' }] },
          { k: 'qs', n: 'Kèm theo', opts: [{ t: 'Một quả chuối' }, { t: 'Một quả quýt' }, { t: 'Hộp sữa (để túi giữ lạnh)' },
            { t: 'Hai lon nước tăng lực', no: 'Nước tăng lực nhiều đường, caffeine. Mang bình nước lọc thay nhé.' }] }
        ],
        safe: ['Nấu chín kỹ, để nguội rồi mới đậy nắp.', 'Để nơi mát hoặc túi giữ lạnh, tránh nắng, tránh gần máy nóng.', 'Ăn trong buổi. Thấy mùi, vị lạ thì bỏ, đừng tiếc.'] }
    ],
    gtip: {
      xuong: 'Đứng máy cả ca: ăn đủ bữa trước ca, giờ nghỉ nhớ uống nước.',
      chuyen: 'Đổi ca thường xuyên: giữ giờ ăn theo ca, đừng ăn vặt thay bữa.',
      troi: 'Hộp cơm để ngoài nắng rất dễ hỏng. Dùng túi giữ lạnh, để chỗ râm.',
      dv: 'Ca kaigo sớm, ca đêm: luôn có bữa nhẹ lót dạ trước ca.',
      vp: 'Ngồi học, ngồi làm lâu: ăn đúng giờ, không ăn vặt liên tục.' } },

  { id: 'd6', t: 'An toàn thực phẩm ở ký túc xá', ic: 'fridge', sub: 'Tủ lạnh chung, hạn dùng, đau bụng sau ăn', min: 12,
    acts: [
      { id: 'd6a', k: 'spot', t: 'Tủ lạnh chung', min: 3, xp: 10,
        rounds: [
          { art: 'fridge', q: 'Tủ lạnh chung ở ký túc xá. Chạm 3 chỗ chưa ổn.',
            hs: [
              { x: 96, y: 46, r: 20, t: 'Thịt sống không bọc, để ngăn trên', why: 'Nước thịt sống dễ nhỏ xuống đồ chín bên dưới. Bọc kín, để ngăn dưới cùng.' },
              { x: 89, y: 92, r: 20, t: 'Hộp đồ ăn không tên, không ngày', why: 'Tủ chung cần ghi tên, ngày cất. Không biết để bao lâu thì đừng ăn.' },
              { x: 151, y: 132, r: 17, t: 'Bát canh không đậy', why: 'Đồ ăn không đậy dễ nhiễm mùi, nhiễm khuẩn. Đậy nắp hoặc bọc màng.' }
            ] }
        ] },
      { id: 'd6b', k: 'date', t: 'Hạn dùng: còn ăn được không?', min: 4, xp: 10,
        today: '26.11.15', todayV: '15/11/2026',
        items: [
          { j: 'お弁当', k: 'おべんとう', v: 'Cơm hộp', lab: 'shohi', d: '26.11.14', ok: 0, why: '消費期限 đã qua 1 ngày. Đây là hạn an toàn: qua ngày là không ăn.' },
          { j: 'カップラーメン', v: 'Mì ly', lab: 'shomi', d: '26.11.10', ok: 1, why: '賞味期限 là hạn ngon nhất. Chưa mở, cất đúng cách thì qua vài ngày vẫn ăn được. Đừng để quá lâu.' },
          { j: 'サンドイッチ', v: 'Bánh mì kẹp', lab: 'shohi', d: '26.11.15', ok: 1, why: 'Hôm nay là ngày cuối. Ăn trong hôm nay, nhớ để tủ lạnh.' },
          { j: '刺身', k: 'さしみ', v: 'Cá sống thái lát', lab: 'shohi', d: '26.11.16', note: 'Để ngoài tủ lạnh từ sáng đến tối', ok: 0, why: 'Còn hạn nhưng để ngoài tủ lạnh cả ngày. Hạn dùng chỉ đúng khi cất đúng cách.' },
          { j: 'ポテトチップス', v: 'Khoai tây chiên lát', lab: 'shomi', d: '27.03.20', ok: 1, why: 'Còn hạn lâu, chưa mở: ăn được. Nhưng đừng ăn thay bữa nhé.' }
        ] },
      { id: 'd6c', k: 'pick', t: 'Đau bụng sau ăn: làm gì?', min: 4, xp: 10,
        end: 'Không khỏe thì báo sớm, nói rõ. Đó là giữ an toàn cho mình và cho người làm cùng.',
        rounds: [
          { q: 'Tối qua bạn ăn hộp cơm để từ hôm kia. Sáng nay đau bụng, đi ngoài 2 lần. Việc đầu tiên?',
            opts: [
              { t: 'Uống nước từng ngụm, nghỉ, báo ngay thầy cô hoặc quản lý ký túc xá', ok: 1, why: 'Đúng rồi! Đi ngoài nhiều dễ mất nước. Báo sớm để được hướng dẫn, đưa đi khám nếu cần.' },
              { t: 'Cố đi học như thường, chờ cơn đau tự hết, không cần nói với ai cho khỏi phiền', why: 'Cố chịu một mình dễ nặng thêm. Báo sớm là để được giúp kịp.' },
              { t: 'Xin bạn cùng phòng mấy viên thuốc đau bụng để uống', why: 'Thuốc của người khác có thể không hợp với bạn. Hỏi nhân viên y tế hoặc dược sĩ.' }
            ] },
          { q: 'Ở Nhật, bạn đau bụng sau bữa ăn, không đi làm nổi. Báo cho ai?',
            opts: [
              { t: 'Người phụ trách ở công ty hoặc nghiệp đoàn, rồi đi khám theo hướng dẫn', ok: 1, why: 'Đúng rồi! Họ sắp xếp công việc, chỉ chỗ khám, giúp làm thủ tục bảo hiểm.' },
              { t: 'Chỉ nhắn cho gia đình ở Việt Nam biết, không báo công ty cho khỏi phiền ai', why: 'Gia đình ở xa không giúp kịp. Tự nghỉ không báo còn làm mất lòng tin.' },
              { t: 'Không báo ai, nằm ở phòng đến khi khỏi thì đi làm lại', why: 'Tự nghỉ không báo làm mọi người lo, mất lòng tin. Bệnh nặng thêm không ai biết.' }
            ] },
          { q: 'Dấu hiệu nào cần đi khám ngay, không chờ?',
            opts: [
              { t: 'Sốt cao, nôn liên tục, không uống được nước, đi ngoài ra máu', ok: 1, why: 'Đúng rồi! Gặp những dấu hiệu này thì đi khám ngay. Nhiều người ăn cùng món cùng bị cũng phải báo ngay.' },
              { t: 'Đau bụng nhẹ một lúc, nghỉ ngơi, uống nước ấm thì thấy đỡ dần', why: 'Đỡ dần thì theo dõi, vẫn báo người phụ trách. Đây chưa phải dấu hiệu phải đi khám ngay.' },
              { t: 'Thấy no, hơi đầy bụng sau một bữa ăn quá nhiều', why: 'Đầy bụng vì ăn nhiều thường tự hết. Lần sau ăn vừa đủ nhé.' }
            ] },
          { q: 'Nhắn cho người phụ trách thế nào là rõ nhất?',
            opts: [
              { t: '“Em đau bụng, đi ngoài 3 lần từ 6 giờ sáng. Tối qua em ăn cơm hộp để 2 ngày. Em xin nghỉ để đi khám ạ.”', ok: 1, why: 'Đúng rồi! Rõ bị gì, từ lúc nào, nghi do đâu, cần gì. Đó là Hō-Ren-Sō: báo cáo, liên lạc, bàn bạc.' },
              { t: '“Dạ em xin lỗi đã làm phiền ạ, hôm nay trong người em không được khỏe lắm, chắc em xin nghỉ một hôm, mai em đi làm lại ạ.”', why: 'Lễ phép nhưng chưa rõ: bị gì, từ khi nào, đã ăn gì. Người nghe chưa biết giúp bạn thế nào.' },
              { t: '“Em bị đau bụng ạ.”', why: 'Ngắn quá. Người nghe chưa biết bạn nặng hay nhẹ, có cần đi khám không.' }
            ] }
        ] }
    ],
    gtip: {
      xuong: 'Ký túc xá công ty thường dùng tủ lạnh chung. Ghi tên, ngày lên hộp.',
      chuyen: 'Làm xưởng thực phẩm, vệ sinh an toàn là việc hằng ngày. Ở phòng cũng vậy.',
      troi: 'Mùa hè đồ ăn hỏng rất nhanh. Về phòng là cất tủ lạnh ngay.',
      dv: 'Kaigo, nhà hàng: đau bụng có thể lây cho người khác. Báo ngay, đừng cố làm.',
      vp: 'Sống chung phòng: giữ tủ lạnh sạch là tôn trọng người cùng phòng.' } }
];

/* =========================================================
   GÓC NGHỀ (khu 'nghe') · TC01.0.5 đợt 1: n1, n3, n5 · TC01.0.8 đợt 2: n2, n4, n6 (đủ 6 bài)
   Nguồn: bài giảng lớp Kiến thức nghề (cơ khí, thực phẩm & nông nghiệp, vệ sinh tòa nhà, đóng gói – in ấn, may mặc),
   tiêu chí đo lường nhóm nghề (phần tư thế làm việc), casestudy Koka (gộp, ẩn danh),
   職場における腰痛予防対策指針 (Bộ Y tế, Lao động và Phúc lợi Nhật Bản, 2013) cho mức nâng tham khảo.
   Ranh giới: Góc nghề = phòng ngừa khi làm việc. Đã đau, ốm → Phòng y tế.
   Câu riêng theo nghề: BODY_NEED, LAD_NEED và pick.byJob dùng mã nghề (JOBS[].s); không có thì theo nhóm.
   ========================================================= */
var NGHE_TXT = {
  khuSay: 'Ở Góc nghề, Shin đội mũ bảo hộ. Giữ thân thể lành lặn là giữ được việc làm, giữ được chữ tín với công ty.',
  bodyQ: 'Ca làm của nghề bạn dùng chỗ nào nhiều nhất?', bodySub: 'Chạm 3 chỗ trên hình hoặc ở danh sách. Không có đúng sai: Shin muốn biết bạn nghĩ gì.',
  bodySee: 'Xem nghề mình hay mỏi ở đâu', bodyRes: 'Nghề của bạn hay mỏi, hay gặp vấn đề ở:', bodyMatch: 'Bạn đoán trúng [N]/3 chỗ.',
  bodyEnd: 'Biết chỗ nào làm việc nhiều thì tập cho chỗ đó khỏe trước khi bay. Đó là chuẩn bị cho nghề.',
  ladQ: 'Bạn tự xếp mình ở mức nào?', ladSub: 'Thật lòng thôi, không ai chấm điểm. Có kỷ lục ở Sàn tập thì Shin hiện ra để bạn so.',
  ladLv: ['Còn yếu', 'Tạm được', 'Khá', 'Vững'], ladSee: 'Xem nghề mình cần gì',
  ladNeed: 'Nghề của bạn cần nhất:', ladGap: 'Ưu tiên tập: [Nhóm]. Mở bài [Bài] ở Sàn tập.', ladOk: 'Nhóm cơ nghề bạn cần đã khá. Giữ nhịp tập nhé!',
  ladRec: 'Kỷ lục của bạn: ',
  kgCard: 'Mức nâng tham khảo của bạn', kgNo: 'Nhập cân nặng ở thẻ hội viên để Shin tính mức của bạn.',
  kgNam: 'Nam: khoảng 40% cân nặng.', kgNu: 'Nữ: khoảng 60% mức của nam (khoảng 24% cân nặng).',
  kgSrc: 'Nguồn: 職場における腰痛予防対策指針, Bộ Y tế, Lao động và Phúc lợi Nhật Bản (2013). Mức làm bằng tay, không có máy hỗ trợ.',
  kgRule: 'Thấy nặng quá sức thì nhờ người, dùng xe đẩy (台車). Đó là làm đúng, không phải yếu.',
  storyLab: 'Dựa trên chuyện đã từng xảy ra', storyW: 'Nếu là anh T., mình sẽ…', storySub: 'Viết từ 10 chữ trở lên được thêm Insight.',
  kwSel: 'Đã chọn [Món]. Giờ chạm chữ Nhật hợp với nó.', kwNo: 'Thử lại nhé. Đọc cách đọc nhỏ bên dưới rồi chọn lại.',
  kwEnd: 'Ở nhiều chỗ làm tại Nhật, người ta chỉ tay vào chỗ cần kiểm tra rồi nói to 「ヨシ！」. Thử làm một lần trước khi rời bàn học hôm nay.'
};
/* bản đồ cơ thể: tọa độ trên hình đứng thẳng nhìn trước (jjClose, hệ 240×180) */
var BODY_Z = [
  { k: 'mat', n: 'Mắt, tai', pts: [[120, 21]] },
  { k: 'co', n: 'Cổ, vai', pts: [[120, 41]] },
  { k: 'tay', n: 'Cổ tay, bàn tay', pts: [[101, 96], [139, 96]] },
  { k: 'lung', n: 'Lưng dưới', pts: [[120, 74]] },
  { k: 'goi', n: 'Đầu gối', pts: [[113, 125], [127, 125]] },
  { k: 'chan', n: 'Bắp chân, bàn chân', pts: [[113, 152], [127, 152]] }
];
var BODY_NEED = {
  xuong: [['lung', 'Nhấc chi tiết, cúi đặt hàng: sai tư thế lâu ngày dễ đau lưng.'], ['tay', 'Cầm dụng cụ, chi tiết cả ca: cổ tay dễ mỏi, dễ trầy vì cạnh sắc.'], ['mat', 'Phôi bắn, ánh hàn, tiếng ồn: cần kính, nút tai bảo hộ.']],
  chuyen: [['tay', 'Một động tác lặp cả ca: cổ tay dễ đau, dễ viêm gân.'], ['chan', 'Đứng 8–10 tiếng: bắp chân căng, mỏi.'], ['co', 'Cúi nhìn băng chuyền lâu: cổ, vai gáy dễ mỏi.']],
  troi: [['lung', 'Mang vác, cúi, đào: lưng chịu sức nặng nhiều nhất.'], ['goi', 'Ngồi xổm, lên xuống giàn: đầu gối làm việc nhiều.'], ['co', 'Vác vật trên vai, ngửa cổ làm trên cao: cổ vai dễ mỏi.']],
  dv: [['lung', 'Đỡ người, cúi lau, bưng bê: lưng dưới dễ đau.'], ['goi', 'Cúi, quỳ lau sàn, lên xuống cầu thang: gối làm việc nhiều.'], ['chan', 'Đi lại, đứng cả ngày: bắp chân, bàn chân mỏi.']],
  vp: [['co', 'Nhìn màn hình lâu: cổ, vai gáy mỏi.'], ['mat', 'Nhìn màn hình nhiều giờ: mắt khô, mỏi.'], ['lung', 'Ngồi lâu, ít đứng dậy: lưng dưới dễ đau.']],
  'dieu-duong': [['lung', 'Đỡ người từ giường sang xe lăn: lưng dưới chịu nhiều nhất.'], ['tay', 'Đỡ, nâng, đẩy xe lăn: cổ tay, cánh tay làm việc nhiều.'], ['chan', 'Đi lại cả ca, có ca đêm: chân mỏi.']],
  'xay-dung': [['lung', 'Mang vác vật liệu, cúi buộc thép: lưng chịu nhiều nhất.'], ['co', 'Vác vật trên vai, ngửa cổ làm trên cao: cổ vai dễ mỏi.'], ['chan', 'Đi lại trên công trường: bàn chân cần giày bảo hộ đúng chuẩn.']],
  'thuc-pham': [['chan', 'Đứng 8–10 tiếng: bắp chân căng, mỏi.'], ['tay', 'Trộn, khuấy, múc lặp lại: cổ tay dễ đau.'], ['lung', 'Bưng bột, gạo, nồi lớn: lưng dễ đau nếu sai tư thế.']],
  'o-to': [['lung', 'Bưng lốp, cúi vào khoang máy: lưng chịu nhiều.'], ['tay', 'Siết ốc, cầm dụng cụ cả ca: cổ tay dễ mỏi.'], ['co', 'Ngửa cổ làm dưới gầm xe: cổ, vai gáy mỏi.']],
  'may-mac': [['lung', 'Ngồi hoặc đứng lâu: lưng dưới dễ đau.'], ['co', 'Cúi nhìn đường may lâu: cổ, vai gáy mỏi.'], ['tay', 'Cắt, may, ủi lặp lại: cổ tay dễ đau.']],
  've-sinh-toa-nha': [['tay', 'Lau chùi lặp lại, chạm chất tẩy rửa: cổ tay, da tay dễ tổn thương.'], ['lung', 'Cúi lau, xách xô nước: lưng dưới dễ đau.'], ['goi', 'Quỳ lau, lên xuống cầu thang: gối làm việc nhiều.']]
};
/* thang tự định vị 4 nhóm cơ */
var LAD_G = [
  { k: 'nvt', n: 'Ngực – vai – tay', d: 'Bưng, đẩy, nâng', ex: 'pushup', bai: 'b2' },
  { k: 'bl', n: 'Bụng – lưng', d: 'Giữ lưng thẳng khi cúi, khi xoay', ex: 'plank', bai: 'b3' },
  { k: 'ch', n: 'Chân – hông', d: 'Đứng lâu, ngồi xuống đứng lên', ex: 'squat', bai: 'b4' },
  { k: 'tm', n: 'Sức bền', d: 'Làm hết ca không đuối', ex: 'jj', bai: 'b5' }
];
var LAD_NEED = { xuong: ['nvt', 'ch'], chuyen: ['ch', 'bl'], troi: ['nvt', 'bl'], dv: ['bl', 'ch'], vp: ['bl', 'tm'],
  'dieu-duong': ['bl', 'ch'], 'xay-dung': ['nvt', 'bl'], 'thuc-pham': ['ch', 'nvt'], 'o-to': ['nvt', 'bl'], 've-sinh-toa-nha': ['bl', 'ch'] };

/* ---------- Góc nghề đợt 2 (TC01.0.8): n2, n4, n6 ----------
   flow: tập theo Shin, đếm giờ từng động tác (EX[fx].frames, sec giây mỗi động tác)
   ca: một ca 8 giờ của nhóm (CA_DAY) + ngày học ở trường 8–17 giờ (SCHOOL_DAY, lịch tiết JPC)
   habit: chọn 1 thói quen (NHABITS) · week: lịch tập bài bổ trợ (N6_SET) */
var NGHE2_TXT = {
  flIntro: 'Đứng chỗ rộng, cách bàn ghế một sải tay. Shin đếm giờ, bạn làm theo hình.',
  flJp: 'Nhiều chỗ làm ở Nhật cho cả nhóm tập thể dục trước giờ làm. Bài này để bạn tự làm thêm, ở đâu cũng được.',
  flStart: 'Bắt đầu cùng Shin', flPause: 'Tạm dừng', flGo: 'Tiếp tục', flSkip: 'Động tác tiếp',
  flCheer: ['Nhẹ nhàng thôi, thở đều.', 'Tốt lắm, giữ nhịp nhé.', 'Chậm và đều, đừng giật.', 'Căng nhẹ là đủ.', 'Sắp xong rồi!'],
  flDone: 'Xong rồi! Người bạn thấy thế nào?',
  flFeel: ['Người ấm hơn', 'Như cũ', 'Có chỗ bị đau'],
  flSay: ['Đúng vậy. Khớp ấm, cơ mềm thì vào việc an toàn hơn.', 'Lần sau làm chậm hơn, xoay rộng hơn một chút nhé.', 'Dừng động tác làm đau. Đau không đỡ thì báo thầy cô hoặc người phụ trách.'],
  caQ: 'Một ca 8 giờ của nhóm [Nhóm]. Giờ nào bạn nghĩ hay mỏi nhất?', caSub: 'Chạm 2 mốc giờ. Không có đúng sai.',
  caSee: 'Xem giờ hay mỏi', caMatch: 'Bạn đoán trúng [N]/2.', caHot: 'Hay mỏi', caLunch: 'Nghỉ trưa',
  caNote: 'Lịch minh họa một ca ngày. Mỗi công ty có giờ làm, giờ nghỉ riêng.',
  schQ: 'Ngày học ở trường của bạn cũng từ 8 đến 17 giờ. Tiết nào bạn ngồi lâu, mỏi nhất?',
  schSay: 'Giờ ra chơi sau [Tiết], đứng dậy làm bài Giãn 2 phút. Tập từ bây giờ, sang Nhật đã thành thói quen.',
  habQ: 'Chọn 1 việc nhỏ bạn sẽ làm mỗi ngày', habOwn: 'Mình tự đặt thói quen khác',
  habSay: 'Một việc nhỏ làm mỗi ngày có ích hơn mười việc lớn làm một lần. Bắt đầu ngay ở trường hôm nay.',
  habW: 'Viết lời hẹn: “Khi …, mình sẽ …”', habSub: 'Gắn với một việc bạn làm mỗi ngày ở trường. Từ 10 chữ trở lên được thêm Insight.',
  n6Intro: 'Bài của nhóm [Nhóm]: mỗi nhóm cơ một động tác (ngực – vai – tay · bụng – lưng · chân – hông).',
  wkQ: '3 động tác bổ trợ của bạn', wkNam: '20 cái × 2 hiệp', wkNu: '15 cái × 2 hiệp', wkHold: 'giữ theo sức × 2 hiệp',
  wkKtn: 'Ở lớp Kiến thức nghề, mỗi tuần bạn quay video 3 động tác bổ trợ để nộp thầy cô. Tập trước từ bây giờ.',
  wkDays: 'Tuần này bạn tập bổ trợ vào ngày nào?', wkDaysSub: 'Chọn 2–3 ngày, xen ngày nghỉ để cơ hồi lại.', wkSan: 'Lịch Sàn tập của bạn: ',
  wkSlot: 'Giờ nào?', wkW: 'Viết lời hẹn: “Khi …, mình sẽ …”', wkSub: 'Viết cụ thể ngày, giờ, chỗ tập. Từ 10 chữ trở lên được thêm Insight.',
  wkTips: ['Khi học xong buổi chiều thứ Ba và thứ Năm, mình sẽ tập 3 động tác bổ trợ trước khi tắm']
};
/* một ca ngày 8–17 giờ, nghỉ trưa 12–13 giờ (minh họa). slots: 8, 9, 10, 11, 13, 14, 15, 16 giờ. hot[chỉ số] = [vì sao mỏi, mẹo] */
var CA_H = [8, 9, 10, 11, 13, 14, 15, 16];
var CA_DAY = {
  xuong: { s: ['Họp đầu ca, kiểm tra máy', 'Đứng máy, đưa chi tiết vào máy', 'Đứng máy, nhấc chi tiết ra kiểm tra', 'Đứng máy liền 3 tiếng', 'Vào ca chiều sau bữa trưa', 'Đứng máy, chỉnh máy', 'Xếp chi tiết vào thùng, lặp lại', 'Dọn máy, 5S cuối ca'],
    hot: { 3: ['Đứng một chỗ 3 tiếng: bắp chân, lưng dưới bắt đầu mỏi.', 'Lúc máy dừng hoặc giờ nghỉ: kiễng gót 15 lần, chống tay ưỡn nhẹ.'],
      6: ['Cuối chiều, cổ tay và vai mỏi vì lặp lại.', 'Giờ nghỉ: giãn cổ tay, kéo tay ngang ngực.'] } },
  chuyen: { s: ['Họp đầu ca, rửa tay, mặc đồ bảo hộ', 'Đứng dây chuyền, xếp hàng vào khay', 'Lặp một động tác theo nhịp băng chuyền', 'Đứng một chỗ trong xưởng lạnh', 'Vào ca chiều sau bữa trưa', 'Đứng dây chuyền, kiểm hàng', 'Cổ tay lặp động tác cả buổi', 'Vệ sinh dây chuyền cuối ca'],
    hot: { 3: ['Đứng một chỗ 3 tiếng trong xưởng lạnh: bắp chân căng, tay lạnh cứng.', 'Giờ nghỉ: kiễng gót, nắm – xòe bàn tay cho ấm.'],
      6: ['Cổ tay đã lặp một động tác rất nhiều lần.', 'Giờ nghỉ: giãn cổ tay, xoay vai 1 phút.'] } },
  troi: { s: ['Họp đầu ca, tập thể dục, kiểm tra đồ bảo hộ', 'Mang vác vật liệu', 'Cúi buộc, đào, lắp đặt', 'Làm trên giàn, ngửa cổ', 'Vào ca chiều, trời nắng nhất', 'Mang vác, cúi làm dưới nắng', 'Lắp đặt, dọn vật liệu', 'Dọn công trường, kiểm tra cuối ngày'],
    hot: { 2: ['Cúi lâu một tư thế: lưng dưới mỏi nhiều nhất.', 'Xong một đoạn việc: đứng thẳng, chống tay sau lưng, ưỡn nhẹ.'],
      5: ['Đầu giờ chiều nắng nóng: mỏi nhanh, dễ mất nước.', 'Uống nước theo giờ, nghỉ trong bóng râm theo lịch của đội.'] } },
  dv: { s: ['Họp đầu ca, nghe giao việc', 'Đi lại, đỡ người hoặc bưng bê', 'Cúi lau, dọn phòng', 'Phục vụ giờ ăn trưa', 'Vào ca chiều sau bữa trưa', 'Đi lại, chạy việc cả buổi', 'Đã đứng, đi lại 6 tiếng', 'Ghi sổ, bàn giao ca'],
    hot: { 2: ['Cúi lau, cúi dọn nhiều lần: lưng dưới và gối mỏi.', 'Hạ hông thay vì cúi gập lưng. Xong mỗi phòng, đứng thẳng ưỡn nhẹ.'],
      6: ['Đi lại, đứng cả ngày: bắp chân, bàn chân mỏi.', 'Giờ nghỉ: kiễng gót, xoay cổ chân. Tối về gác chân cao.'] } },
  vp: { s: ['Họp đầu ngày, xem việc', 'Ngồi máy tính', 'Ngồi máy tính, gõ phím liên tục', 'Ngồi 3 tiếng gần như không đứng dậy', 'Sau bữa trưa, dễ buồn ngủ', 'Họp, ngồi máy tính', 'Nhìn màn hình cả buổi chiều', 'Gửi báo cáo cuối ngày'],
    hot: { 3: ['Ngồi lâu không đứng dậy: lưng dưới, cổ vai mỏi.', 'Cứ 1 giờ đứng dậy 1–2 phút: đi lấy nước, giãn vai.'],
      6: ['Nhìn màn hình nhiều giờ: mắt khô, cổ mỏi.', 'Nhìn ra xa 20 giây, chớp mắt. Kéo màn hình ngang tầm mắt.'] } }
};
/* ngày học ở trường 8–17 giờ (lịch tiết JPC, thứ Hai – thứ Sáu) */
var SCHOOL_DAY = [['Tiết 1–2', '8:00–9:30'], ['Tiết 3–4', '10:00–11:30'], ['Tiết 5–6', '13:15–14:45'], ['Tiết 7–8', '15:15–16:45']];
/* thói quen chống mỏi: 3 chung + 1 theo nhóm */
var NHABITS = {
  all: [
    { t: 'Cứ 1 giờ, đứng dậy hoặc đổi tư thế 1–2 phút', tip: 'Khi hết một tiết học, mình sẽ đứng dậy giãn vai 1 phút trước khi ngồi lại' },
    { t: 'Giờ nghỉ: giãn cổ tay, xoay vai 1 phút', tip: 'Khi chuông giờ nghỉ reo, mình sẽ giãn cổ tay và xoay vai trước khi ra ngoài' },
    { t: 'Tối về: gác chân cao 10 phút, giãn bắp chân', tip: 'Khi tắm xong buổi tối, mình sẽ gác chân lên tường 10 phút rồi giãn bắp chân' }
  ],
  xuong: { t: 'Đứng lâu: đổi chân trụ, kiễng gót lúc máy dừng', tip: 'Khi đứng một chỗ quá 30 phút, mình sẽ đổi chân trụ và kiễng gót 10 lần lúc nghỉ tay' },
  chuyen: { t: 'Lặp động tác: nắm – xòe bàn tay mỗi giờ nghỉ', tip: 'Khi chuông giờ nghỉ reo, mình sẽ nắm – xòe bàn tay 10 lần rồi giãn cổ tay' },
  troi: { t: 'Cúi làm lâu: đứng thẳng ưỡn nhẹ sau mỗi đoạn việc', tip: 'Khi xong một đoạn việc, mình sẽ đứng thẳng, chống tay sau lưng, ưỡn nhẹ 3 lần' },
  dv: { t: 'Cúi lau: hạ hông, không cúi gập lưng', tip: 'Khi lau dọn phòng ở hay lớp học, mình sẽ hạ hông, một gối chạm sàn thay vì cúi gập lưng' },
  vp: { t: 'Ngồi máy tính: nhìn xa 20 giây mỗi giờ', tip: 'Khi làm xong một việc trên điện thoại hay máy tính, mình sẽ nhìn ra xa 20 giây và đứng dậy' }
};
/* bài bổ trợ theo nhóm: [ngực – vai – tay, bụng – lưng, chân – hông]; nữ: pushup → kneepush (engine tự đổi) */
var N6_SET = {
  xuong: ['dip', 'plank', 'squat'],
  chuyen: ['pushup', 'superman', 'sidelunge'],
  troi: ['pushup', 'superman', 'hinge'],
  dv: ['dip', 'crunch', 'sidelunge'],
  vp: ['dip', 'superman', 'squat']
};

var BAI_NGHE = [
  { id: 'n1', t: 'Cơ thể của nghề mình', ic: 'core', sub: 'Nghề mình dùng chỗ nào nhiều? Mình đang ở mức nào?', min: 11,
    acts: [
      { id: 'n1a', k: 'body', t: 'Bản đồ cơ thể', min: 3, xp: 10 },
      { id: 'n1b', k: 'ladder', t: 'Mình đang ở mức nào?', min: 4, xp: 10 },
      { id: 'n1c', k: 'write', t: 'Trước khi bay, mình cần…', min: 4, xp: 15, dyn: 'nghe',
        say: 'Nghề nào cũng cần thân thể khỏe. Biết mình thiếu gì thì mới tập đúng chỗ.',
        q: 'Trước khi bay, bạn cần khỏe thêm ở đâu? Vì sao?', sub: 'Viết cụ thể: chỗ nào, vì nghề mình phải làm gì. Từ 10 chữ trở lên được thêm Insight.',
        tips: ['Trước khi bay mình cần khỏe thêm chân và hông, vì nghề mình phải đứng cả ca'] }
    ],
    gtip: {
      xuong: 'Nhà xưởng cần tay, vai khỏe để nhấc chi tiết, và chân vững để đứng máy cả ca.',
      chuyen: 'Dây chuyền cần chân bền để đứng lâu, cổ tay dẻo để làm một động tác cả ngày.',
      troi: 'Ngoài trời cần lưng, vai khỏe để mang vác, và sức bền khi trời nóng hoặc rét.',
      dv: 'Dịch vụ cần bụng, lưng vững để đỡ người, bưng bê mà không đau lưng.',
      vp: 'Văn phòng ít vận động: cần lưng khỏe và thói quen đứng dậy giữa giờ.' } },

  { id: 'n2', t: 'Khởi động trước ca', ic: 'warm', sub: '5 động tác, 3 phút trước khi vào việc', min: 9,
    acts: [
      { id: 'n2a', k: 'how', t: 'Xem 5 động tác', min: 3, xp: 10, ex: ['preshift'] },
      { id: 'n2b', k: 'order', t: 'Xếp thứ tự', min: 2, xp: 10,
        q: 'Xếp 5 động tác khởi động trước ca theo thứ tự.', sub: 'Chạm lần lượt từ động tác làm trước đến làm sau.',
        items: ['Cổ: nghiêng, cúi, ngửa', 'Vai: xoay khuỷu tay', 'Cổ tay: xoay, nắm – xòe', 'Hông: xoay vòng', 'Gối, cổ chân: xoay nhẹ'],
        hint: 'Gợi ý: đi từ trên đầu xuống dưới chân.',
        ok: 'Đi từ trên xuống thì không bỏ sót khớp nào. Dễ nhớ, làm ở đâu cũng được.' },
      { id: 'n2c', k: 'flow', t: 'Tập theo Shin 3 phút', min: 3, xp: 15, fx: 'preshift', sec: 30 }
    ],
    gtip: {
      xuong: 'Trước khi đứng máy: khởi động kỹ cổ tay, vai. Tay ấm thì cầm dụng cụ chắc hơn.',
      chuyen: 'Dây chuyền chạy là phải làm ngay: khởi động ở phòng thay đồ trước giờ vào ca.',
      troi: 'Sáng mùa đông ở công trường rất lạnh: khởi động lâu hơn, đến khi người ấm lên.',
      dv: 'Trước ca đỡ người, bưng bê: khởi động kỹ hông, gối.',
      vp: 'Ngồi máy tính cả ngày: khởi động cổ, vai, cổ tay trước giờ làm và sau giờ nghỉ trưa.' } },

  { id: 'n3', t: 'Nâng, bưng, đẩy đúng cách', ic: 'arm', sub: 'Hạ hông, ôm sát người, nặng quá thì nhờ người', min: 12,
    acts: [
      { id: 'n3a', k: 'how', t: 'Nâng vật đúng cách', min: 3, xp: 10, ex: ['lift'] },
      { id: 'n3b', k: 'spot', t: 'Tìm điểm chưa đúng', min: 4, xp: 10,
        rounds: [
          { p: 'liftBad', mk: 'boxBad', q: 'Bạn này nhấc thùng. Chạm 3 chỗ chưa đúng.',
            hs: [
              { x: 136, y: 80, r: 16, t: 'Lưng cong gập xuống', why: 'Cúi gập lưng để nhấc là cách dễ đau lưng nhất. Hạ hông xuống, giữ lưng thẳng.' },
              { x: 118, y: 128, r: 14, t: 'Chân thẳng, không hạ hông', why: 'Sức nâng phải đến từ chân. Gập gối, hạ hông như ngồi xuống ghế.' },
              { x: 184, y: 154, r: 18, t: 'Vật ở xa người', why: 'Vật càng xa người, lưng càng phải gánh nặng. Bước lại sát vật trước khi nhấc.' }
            ] },
          { p: 'carryHigh', mk: 'boxHigh', q: 'Bạn này bê thùng đi qua xưởng. Chạm 2 chỗ chưa ổn.',
            hs: [
              { x: 147, y: 24, r: 20, t: 'Thùng cao che mắt', why: 'Không nhìn thấy đường thì dễ vấp, dễ té. Bê thấp ngang bụng hoặc chia nhỏ ra.' },
              { x: 158, y: 170, r: 15, t: 'Sàn ướt trên lối đi', why: 'Sàn ướt rất dễ trượt khi đang bê đồ. Báo lau khô hoặc đi đường khác.' }
            ] }
        ] },
      { id: 'n3c', k: 'pick', t: 'Nặng quá thì làm sao?', min: 4, xp: 10, kg: 1,
        rounds: [
          { q: 'Một thùng hàng to, bạn chưa biết nặng bao nhiêu. Làm gì trước?',
            opts: [
              { t: 'Cúi xuống nhấc mạnh lên luôn cho nhanh, thấy nặng quá thì thả xuống', why: 'Nhấc mạnh bất ngờ khi chưa biết nặng nhẹ là lúc lưng dễ bị đau nhất.' },
              { t: 'Đẩy thử một góc xem nặng không, nhìn đường đi có vướng gì không', ok: 1, why: 'Đúng rồi! Biết vật nặng cỡ nào, đường đi có trống không rồi mới nhấc.' },
              { t: 'Nhờ bạn đưa lên vai mình rồi vác một mình cho nhanh', why: 'Chưa biết nặng nhẹ mà vác lên vai một mình rất dễ mất thăng bằng.' }
            ] },
          { q: 'Thùng này nặng 30 kg. [KG] Bạn làm gì?',
            opts: [
              { t: 'Cố bê một mình, mình còn trẻ khỏe mà, đừng làm phiền ai', why: 'Cố quá sức một lần có thể đau lưng cả tháng. Lúc đó mới thật sự làm phiền mọi người.' },
              { t: 'Bê một mình nhưng đi thật nhanh cho đỡ mỏi tay', why: 'Đi nhanh khi đang bê nặng dễ vấp, dễ té.' },
              { t: 'Nhờ người khiêng cùng hoặc dùng xe đẩy (台車)', ok: 1, why: 'Đúng rồi! Thấy nặng quá sức thì nhờ người, dùng xe đẩy. Đó là làm đúng, không phải yếu.' }
            ] },
          { q: 'Thùng chi tiết kim loại có cạnh sắc, khá nặng. Bạn bê thế nào?',
            opts: [
              { t: 'Bê bằng tay không cho dễ cầm, lúc đặt xuống thì buông tay thả rơi cho nhanh', why: 'Cạnh sắc dễ làm đứt tay; thả rơi dễ làm hỏng hàng, dập chân.' },
              { t: 'Kê lên đùi rồi xoay người đặt lên kệ bên cạnh', why: 'Vặn lưng khi đang bê nặng rất dễ đau lưng. Xoay bằng bước chân.' },
              { t: 'Đeo găng tay bảo hộ, hạ hông, ôm sát người; nặng quá thì dùng xe đẩy', ok: 1, why: 'Đúng rồi! Găng tay giữ tay khỏi cạnh sắc, ôm sát người giữ lưng khỏi đau.' }
            ] }
        ],
        byGroup: {
          chuyen: { q: 'Đồ nặng trên kệ cao ở kho của dây chuyền. Lấy thế nào?',
            opts: [
              { t: 'Dùng bục hoặc thang có người giữ; đồ nặng nên xếp ở ngăn thấp', ok: 1, why: 'Đúng rồi! Đồ nặng để ngăn thấp. Lấy trên cao thì đứng vững, có người giữ thang.' },
              { t: 'Kiễng chân, với tay kéo thùng xuống cho nhanh', why: 'Kéo đồ nặng từ trên cao xuống dễ rơi trúng người.' },
              { t: 'Trèo lên kệ hàng đứng lấy cho tiện, không cần làm phiền ai giữ thang', why: 'Kệ không phải chỗ đứng. Rất dễ té, dễ đổ kệ.' }
            ] },
          troi: { q: 'Bao xi măng 25 kg trên công trường. Bạn chuyển thế nào?',
            opts: [
              { t: 'Hạ hông, ôm sát, đứng lên bằng chân; nhiều bao thì dùng xe đẩy', ok: 1, why: 'Đúng rồi! Lực từ chân, vật sát người. Nhiều bao thì để xe làm thay lưng.' },
              { t: 'Cúi lưng nhấc bao lên, vác lên vai rồi xoay người đi tiếp cho nhanh', why: 'Cúi gập lưng và vặn người khi đang vác là hai điều dễ đau lưng nhất.' },
              { t: 'Kéo lê bao trên đất bằng một tay cho nhanh', why: 'Kéo một tay làm lệch người, dễ đau vai, đau lưng; bao dễ rách.' }
            ] },
          dv: { q: 'Xô nước lau sàn đầy, bạn cần mang xuống cầu thang. Làm thế nào?',
            opts: [
              { t: 'Xách xô đầy bằng một tay, chạy thật nhanh xuống cầu thang cho kịp giờ', why: 'Xô đầy làm lệch người; chạy trên cầu thang dễ trượt, té.' },
              { t: 'Đổ bớt nước, xách sát người, tay kia vịn tay vịn cầu thang', ok: 1, why: 'Đúng rồi! Nhẹ hơn, vững hơn. Xuống cầu thang luôn giữ một tay vịn.' },
              { t: 'Ôm xô trước bụng, không vịn, bước hai bậc một lần', why: 'Ôm trước bụng che mất bậc thang dưới chân. Rất dễ hụt chân.' }
            ] },
          vp: { q: 'Làm thêm ở kho, bạn chuyển nhiều thùng giấy nặng. Làm thế nào?',
            opts: [
              { t: 'Hạ hông, ôm sát, nhìn đường đi; nhiều thùng thì dùng xe đẩy', ok: 1, why: 'Đúng rồi! Ngồi nhiều thì lưng càng cần được bảo vệ khi bê.' },
              { t: 'Chồng ba thùng lên nhau rồi bê một lần cho nhanh', why: 'Thùng cao che mắt, quá nặng. Dễ té, dễ đau lưng.' },
              { t: 'Cúi gập lưng nhấc thùng, mình ngồi cả ngày nên cần vận động', why: 'Cúi gập lưng nhấc nặng dễ đau lưng, nhất là khi ít tập.' }
            ] }
        },
        byJob: {
          'dieu-duong': { q: 'Cần đỡ cụ ông từ giường sang xe lăn. Bạn làm thế nào?',
            opts: [
              { t: 'Bế bổng cụ lên một mình cho nhanh gọn, cụ đỡ phải chờ, đỡ ngại người khác', why: 'Bế người một mình rất dễ đau lưng cho bạn và nguy hiểm cho cụ.' },
              { t: 'Cúi gập lưng kéo tay cụ dậy thật nhanh cho xong việc', why: 'Kéo tay dễ làm cụ đau, cụ ngã; cúi gập lưng làm bạn đau lưng.' },
              { t: 'Dùng dụng cụ hỗ trợ theo hướng dẫn, nhờ thêm người, không tự bế một mình', ok: 1, why: 'Đúng rồi! Hướng dẫn phòng đau lưng của Nhật khuyên không bế người chỉ bằng sức mình, mà dùng dụng cụ hỗ trợ.' }
            ] },
          'thuc-pham': { q: 'Bao bột 25 kg cần đổ vào máy trộn. Bạn làm thế nào?',
            opts: [
              { t: 'Hai người cùng nâng hoặc dùng xe đẩy, giữ lưng thẳng khi đổ', ok: 1, why: 'Đúng rồi! Bao nặng thì chia sức hai người hoặc để máy làm thay.' },
              { t: 'Một mình vác bao lên vai rồi nghiêng người đổ vào máy cho nhanh', why: 'Vác nặng một mình rồi nghiêng người là dễ đau lưng nhất.' },
              { t: 'Cúi gập lưng ôm bao lên, cố một lần là xong', why: 'Cúi gập lưng nhấc nặng dễ đau lưng. Hạ hông, hoặc nhờ người.' }
            ] },
          'o-to': { q: 'Bạn cần đưa lốp xe từ kho ra xưởng. Làm thế nào?',
            opts: [
              { t: 'Ôm lốp lên ngang ngực rồi vặn người đặt luôn lên kệ cho nhanh gọn', why: 'Vặn người khi đang ôm vật nặng rất dễ đau lưng.' },
              { t: 'Kéo lê lốp trên sàn bằng một tay cho đỡ mỏi lưng', why: 'Kéo một tay làm lệch người, dễ đau vai, đau lưng.' },
              { t: 'Lăn lốp hoặc dùng xe đẩy; khi nhấc thì hạ hông, giữ sát người', ok: 1, why: 'Đúng rồi! Lốp nặng mà tròn: lăn hoặc dùng xe là nhẹ nhất cho lưng.' }
            ] }
        } }
    ],
    gtip: {
      xuong: 'Chi tiết kim loại vừa nặng vừa sắc: găng tay, hạ hông, ôm sát người.',
      chuyen: 'Kho của dây chuyền nhiều kệ cao: đồ nặng xếp ngăn thấp.',
      troi: 'Vật liệu công trường rất nặng: dùng xe, chia sức hai người.',
      dv: 'Đỡ người, xách xô nước: lưng thẳng, nhờ thêm người, dùng dụng cụ.',
      vp: 'Ít bê vác nên càng dễ đau lưng khi bất ngờ phải bê. Học tư thế ngay từ giờ.' } },

  { id: 'n4', t: 'Đứng lâu, ngồi lâu, làm lặp lại', ic: 'timer', sub: 'Giờ nào hay mỏi, giãn 2 phút giữa ca', min: 10,
    acts: [
      { id: 'n4a', k: 'ca', t: 'Một ca của nhóm mình', min: 4, xp: 10 },
      { id: 'n4b', k: 'flow', t: 'Giãn 2 phút giữa ca', min: 3, xp: 10, fx: 'midstretch', sec: 24 },
      { id: 'n4c', k: 'habit', t: 'Chọn 1 thói quen', min: 3, xp: 15 }
    ],
    gtip: {
      xuong: 'Đứng máy cả ca: đổi chân trụ, đi giày vừa chân, giãn bắp chân giờ nghỉ.',
      chuyen: 'Lặp một động tác cả ca: cổ tay, vai cần được giãn mỗi giờ nghỉ.',
      troi: 'Cúi, đào lâu: đứng thẳng, ưỡn nhẹ sau mỗi đoạn việc.',
      dv: 'Đi lại, cúi lau cả ngày: hạ hông khi cúi, tối về gác chân cao.',
      vp: 'Ngồi lâu: cứ 1 giờ đứng dậy, nhìn xa, giãn vai.' } },

  { id: 'n5', t: 'An toàn kiểu Nhật', ic: 'helmet', sub: 'Tìm nguy hiểm, vài từ tiếng Nhật, Senpai kể', min: 12,
    acts: [
      { id: 'n5a', k: 'spot', t: 'Tìm nguy hiểm trong kho', min: 4, xp: 10,
        rounds: [
          { art: 'kho', q: 'Đây là góc kho của một xưởng. Chạm 4 chỗ có thể gây tai nạn.',
            hs: [
              { x: 66, y: 22, r: 17, t: 'Thùng nặng để trên kệ cao', why: 'Đồ nặng trên cao dễ rơi trúng người. Đồ nặng xếp ngăn thấp.' },
              { x: 150, y: 50, r: 22, t: 'Xe đẩy chất thùng quá cao', why: 'Thùng cao che mắt người đẩy, dễ đổ khi xe rung.' },
              { x: 112, y: 164, r: 17, t: 'Dây điện vắt ngang lối đi', why: 'Dễ vấp ngã. Dây điện đi sát tường hoặc có nắp che.' },
              { x: 202, y: 168, r: 17, t: 'Vũng nước trên sàn', why: 'Sàn ướt dễ trượt. Thấy thì báo, lau khô hoặc đặt biển cảnh báo.' }
            ] }
        ] },
      { id: 'n5b', k: 'match', t: 'Vài từ an toàn bằng tiếng Nhật', min: 3, xp: 10,
        q: 'Ghép nghĩa tiếng Việt với chữ Nhật.', sub: 'Chạm một nghĩa, rồi chạm chữ Nhật hợp với nó.',
        sel: 'kwSel', no: 'kwNo', end: 'kwEnd',
        pairs: [
          { v: 'Nguy hiểm!', j: '危ない！', k: 'あぶない', r: 'abunai', why: 'Thấy nguy hiểm cho người khác thì nói to ngay.' },
          { v: 'Dừng lại!', j: '止めて！', k: 'とめて', r: 'tomete', why: 'Dùng khi cần ai đó dừng máy, dừng tay ngay.' },
          { v: 'Chú ý', j: '注意', k: 'ちゅうい', r: 'chūi', why: 'Hay gặp trên biển báo trong xưởng.' },
          { v: 'Cấm vào', j: '立入禁止', k: 'たちいりきんし', r: 'tachiiri kinshi', why: 'Thấy biển này thì không bước vào, kể cả khi đi tắt.' },
          { v: 'Đã kiểm tra, an toàn', j: 'ヨシ！', r: 'yoshi', why: 'Chỉ tay vào chỗ cần kiểm tra rồi nói to 「ヨシ！」 (指差し呼称).' },
          { v: 'Suýt xảy ra tai nạn', j: 'ヒヤリハット', r: 'hiyari hatto', why: 'Chuyện suýt xảy ra cũng phải báo, để lần sau không thành tai nạn thật.' }
        ] },
      { id: 'n5c', k: 'story', t: 'Senpai kể: đôi giày bảo hộ', min: 5, xp: 15,
        story: ['Anh T. sang Nhật làm xây dựng được 3 tháng.', 'Giày bảo hộ công ty phát nặng và cứng. Anh thấy đau chân, nhưng ngại nói với ai.', 'Anh ra cửa hàng mua đôi giày thể thao nhẹ, rẻ để đi làm. Anh nghĩ: “Mình cẩn thận là được.”', 'Một chiều cuối ca, mệt và vội, anh để vật nặng rơi trúng chân. Giày thường không đỡ được. Anh phải nghỉ làm gần hai tháng.', 'Quản lý của anh cũng bị công ty nhắc nhở vì đã không kiểm tra.'],
        end: 'Đồ bảo hộ không phải để đối phó khi có người kiểm tra. Nó giữ đôi chân, đôi tay để bạn làm trọn hợp đồng và về nhà lành lặn.',
        tips: ['Nếu là anh T., mình sẽ báo người phụ trách ngay khi giày làm đau chân để được đổi cỡ', 'Nếu là anh T., mình sẽ luôn đi giày bảo hộ, kể cả khi không ai kiểm tra'],
        rounds: [
          { q: 'Vì sao chân anh T. bị thương nặng như vậy?',
            opts: [
              { t: 'Vì vật rơi quá nặng, ai đi giày gì cũng sẽ bị như vậy thôi', why: 'Giày bảo hộ được làm ra chính để đỡ những lúc như vậy.' },
              { t: 'Vì công ty phát giày nặng nên anh mới phải đổi giày', why: 'Giày nặng là thật, nhưng chọn đổi giày mà không báo là quyết định của anh.' },
              { t: 'Vì anh không đi giày bảo hộ đúng chuẩn', ok: 1, why: 'Đúng rồi! Giày bảo hộ có mũi cứng để đỡ vật rơi. Giày thường thì không.' }
            ] },
          { q: 'Vì sao anh T. bỏ giày bảo hộ?',
            opts: [
              { t: 'Vì công ty không có quy định nào bắt phải đi giày bảo hộ khi làm việc', why: 'Công ty có quy định và đã phát giày. Anh biết điều đó.' },
              { t: 'Vì thấy đau, bất tiện mà không nói với ai, tự xử lý một mình', ok: 1, why: 'Đúng rồi! Gốc của chuyện là không báo. Có báo thì đã được đổi cỡ, lót thêm.' },
              { t: 'Vì giày bảo hộ chỉ cần khi có người kiểm tra thôi', why: 'Tai nạn không chờ lúc có người kiểm tra.' }
            ] },
          { q: 'Đáng lẽ anh T. nên làm gì khi giày làm đau chân?',
            opts: [
              { t: 'Chịu đau đi tiếp, không nói gì cho khỏi bị nghĩ là mình yếu', why: 'Chịu đau lâu ngày sẽ thành chấn thương khác. Báo sớm không phải là yếu.' },
              { t: 'Đi giày thường, khi nào có người kiểm tra thì đổi lại giày bảo hộ', why: 'Đó chính là điều đã dẫn đến tai nạn của anh T.' },
              { t: 'Báo người phụ trách để đổi cỡ hoặc lót thêm, vẫn đi giày bảo hộ', ok: 1, why: 'Đúng rồi! Đó là Hō-Ren-Sō: báo sớm, bàn cách, vẫn giữ an toàn.' }
            ] }
        ] }
    ],
    gtip: {
      xuong: 'Nhà xưởng nhiều máy chạy: không đeo trang sức, tóc dài buộc gọn, đủ kính và găng tay.',
      chuyen: 'Dây chuyền chạy liên tục: tay bị kẹt thì nói ngay 「止めて！」, không tự thò tay gỡ.',
      troi: 'Công trường: mũ bảo hộ, giày bảo hộ, làm trên cao thì móc dây an toàn.',
      dv: 'Sàn nhà hàng, nhà vệ sinh hay ướt: đi chậm, đặt biển cảnh báo khi lau.',
      vp: 'Làm thêm ở kho, ở bếp: đồ bảo hộ cũng quan trọng như nhân viên chính thức.' } },

  { id: 'n6', t: 'Bài bổ trợ cho nghề', ic: 'stretch', sub: '3 động tác của lớp Kiến thức nghề, lịch tập tuần', min: 13,
    acts: [
      { id: 'n6a', k: 'how', t: '3 động tác của nhóm mình', min: 4, xp: 10, exBy: N6_SET,
        more: 'Mỗi động tác: nam 20 cái × 2 hiệp, nữ 15 cái × 2 hiệp (yêu cầu của lớp Kiến thức nghề). Plank thì giữ theo sức.' },
      { id: 'n6b', k: 'try', t: 'Tập thử, ghi số', min: 5, xp: 15, exBy: N6_SET },
      { id: 'n6c', k: 'week', t: 'Lịch tập tuần của mình', min: 4, xp: 15 }
    ],
    gtip: {
      xuong: 'Nhà xưởng: tay sau khỏe để nhấc chi tiết, chân khỏe để đứng máy cả ca.',
      chuyen: 'Dây chuyền: lưng khỏe đỡ mỏi khi đứng lâu, chân linh hoạt khi đổi tư thế.',
      troi: 'Ngoài trời: gập hông lưng thẳng là nền của mọi lần nâng vật.',
      dv: 'Dịch vụ: bước ngang giống lúc đỡ người, lau sàn; bụng khỏe đỡ cho lưng.',
      vp: 'Văn phòng: tay, lưng, chân khỏe giúp ngồi thẳng, đỡ đau lưng.' } }
];

/* =========================================================
   PHÒNG Y TẾ · 301 FIRST AID (khu 'yte', TC01.1.1)
   Thầy chốt 18/11/2026: PA C "Ca trực của Shin". Mỗi bài = 1 ca trực (dạng sim) + 2 hoạt động củng cố.
   Đợt 1 (TC01.1.1): y1 Choáng, ngất · y2 Say nắng · y3 Cảm lạnh, cúm, sốt. Đợt 2 (TC01.1.2): y4 Bong gân, trầy xước · y5 Đau lưng, cổ, vai · y6 Không khỏe thì báo thế nào.
   Đợt 2 thêm: habit có `hl` (dùng YHABITS, lưu S.yte.habit) · pick có `scale` (hiện thẻ THANG khi xong) · write có `dyn: 'yte'` (không gợi ý theo bữa ăn).
   Dạng sim: scene {place, time, tag, ic} · intro (lời Shin, [Tên]) · steps[] { say (chuyện đang xảy ra), q, opts[] { t, ok, key (dòng phiếu sơ cứu), res (chuyện xảy ra tiếp), why } } · end.
   Không dùng từ Sổ tay sức khỏe Ch.8: tát má, giật tóc mai, cho ngửi amoniac/giấm, bấm huyệt. Hướng dẫn sơ cứu cơ bản, không thay lời bác sĩ.
   ========================================================= */
var YTE_TXT = {
  khuSay: 'Ở Phòng y tế, Shin đeo băng tay chữ thập xanh. Mỗi bài là một ca trực: bạn quyết định, Shin cho xem chuyện gì xảy ra tiếp.',
  simLab: 'CA TRỰC', simStart: 'Bắt đầu ca trực', simSteps: '[N] tình huống · chọn sai được chọn lại',
  meter: 'An toàn', meterLv: ['Cần cẩn thận', 'Tạm ổn', 'An toàn'],
  next: 'Tình huống tiếp theo', toFile: 'Xem phiếu sơ cứu', retry: 'Quay lại, chọn cách khác',
  resOk: 'Chuyện xảy ra tiếp', resNo: 'Nếu làm vậy thì…',
  fileH: 'Phiếu sơ cứu của bạn', first: 'Chọn đúng ngay lần đầu: [N]/[T] tình huống.',
  firstAll: 'Bạn xử lý chuẩn cả ca. Shin yên tâm giao ca trực cho bạn!', firstSome: 'Chọn lại để hiểu vì sao cũng là học. Lần sau bạn sẽ nhanh hơn.',
  note: 'Đây là hướng dẫn sơ cứu cơ bản, không thay lời bác sĩ.',
  y2End: 'Mùa hè, nhiều nơi ở Nhật có cảnh báo say nắng (熱中症警戒アラート). Nghe thấy 熱中症 là nhắc mình uống nước, nghỉ bóng mát.',
  storyW3: 'Nếu là M., mình sẽ…',
  storyW4: 'Trước ngày bay, mình sẽ…',
  nbHab: 'Thói quen giữ lưng, cổ, vai:',
  nbH: 'Phòng y tế của mình', nbNone: 'Chưa làm. Vào Phòng y tế (301) và nhận ca trực đầu tiên.', nbFiles: 'Phiếu sơ cứu đã có:'
};

/* Thẻ khẩn cấp (Sổ tay › Khẩn cấp). Ô tự ghi lưu ở S.kc, chỉ trên máy này, không gửi báo cáo. */
var KC = {
  h: 'Thẻ khẩn cấp ở Nhật',
  sub: 'Gọi được miễn phí từ điện thoại. Chụp màn hình thẻ này để dùng cả khi không mở được ứng dụng.',
  nums: [
    { n: '119', j: '救急・消防', v: 'Cấp cứu, cứu hỏa', d: 'Người ngất không tỉnh, khó thở, chảy máu nhiều, có cháy.' },
    { n: '110', j: '警察', v: 'Cảnh sát', d: 'Tai nạn giao thông, bị mất trộm, bị đe dọa.' },
    { n: '#7119', j: '救急安心センター', v: 'Hỏi có nên gọi xe cấp cứu không', d: 'Chỉ một số nơi có. Hỏi người hỗ trợ xem nơi bạn ở có không.' }
  ],
  sayH: 'Khi gọi 119',
  saySub: 'Người trực sẽ hỏi: 「火事ですか、救急ですか」 (Cháy hay cấp cứu?). Bạn trả lời:',
  say: [
    { j: '救急です。', k: 'きゅうきゅうです', r: 'kyūkyū desu', v: 'Tôi cần cấp cứu.' },
    { j: '友だちが倒れました。', k: 'ともだちがたおれました', r: 'tomodachi ga taoremashita', v: 'Bạn tôi bị ngã, ngất.' },
    { j: '住所は〇〇です。', k: 'じゅうしょは〇〇です', r: 'jūsho wa … desu', v: 'Địa chỉ là … (đọc ô bên dưới).' },
    { j: '日本語が少しわかります。', k: 'にほんごがすこしわかります', r: 'nihongo ga sukoshi wakarimasu', v: 'Tôi hiểu một chút tiếng Nhật.' }
  ],
  myH: 'Thông tin của mình',
  fields: [
    { k: 'addr', l: 'Địa chỉ chỗ ở (chữ Nhật)', ph: 'Ví dụ: 〇〇県〇〇市〇〇町1-2-3', big: 1 },
    { k: 'sup', l: 'Người hỗ trợ (tên, số điện thoại)', ph: 'Tên, số điện thoại' },
    { k: 'co', l: 'Công ty, nghiệp đoàn (số điện thoại)', ph: 'Tên, số điện thoại' }
  ],
  saved: 'Đã lưu trên máy này.', note: 'Chưa sang Nhật thì để trống, khi có địa chỉ hãy ghi vào. Thông tin chỉ lưu trên máy này, không gửi cho ai.'
};

/* Thang 5 mức khi không khỏe (lược từ bảng của Kokateam: bỏ ý uống thuốc mang từ Việt Nam, bỏ ý mang thai). Hiện ở cuối y6b và Sổ tay › Khẩn cấp. */
var THANG = {
  h: 'Thang 5 mức khi không khỏe', sub: 'Thang tham khảo. Không chắc mình ở mức nào: báo người hỗ trợ.',
  lv: [
    { t: 'Mệt mỏi thường', e: 'Mỏi người, đau lưng nhẹ, đau bụng nhẹ, dị ứng phấn hoa', d: 'Tự chăm: ngủ sớm, uống đủ nước, tắm nước ấm' },
    { t: 'Bệnh nhẹ', e: 'Sốt nhẹ 37–38°C, sổ mũi, ho khoảng 2 ngày; đau răng; đau lưng khó chịu', d: 'Báo người hỗ trợ biết; cần thì đi khám, nhờ dịch qua điện thoại' },
    { t: 'Nặng hơn', e: 'Sốt từ 39°C, bong gân, sưng bất thường ở tay chân, mặt', d: 'Báo người hỗ trợ, cùng xem có cần đi khám; nghỉ ở phòng, đeo khẩu trang' },
    { t: 'Bệnh cấp, dễ lây', e: 'Cúm, ngộ độc thực phẩm (nôn, tiêu chảy), thủy đậu', d: 'Báo ngay để được đưa đi khám; ở riêng, không dùng chung đồ' },
    { t: 'Tai nạn, bệnh nặng', e: 'Ngã, gãy tay chân, bác sĩ báo bệnh nặng', d: 'Báo ngay người phụ trách, người hỗ trợ; làm theo hướng dẫn. Nguy hiểm tính mạng: gọi 119' }
  ] };

/* Thói quen cho y5c (dạng habit có hl): all + 1 theo nhóm */
var YHABITS = {
  all: [
    { t: 'Nâng vật: gập gối, giữ vật sát người, không xoay vặn lưng', tip: 'Khi nhấc thùng, ba lô hay xô nước, mình sẽ gập gối, giữ vật sát người rồi mới đứng lên' },
    { t: 'Xem điện thoại: đưa máy lên ngang mắt, không cúi cổ lâu', tip: 'Khi xem điện thoại, mình sẽ đưa máy lên ngang mắt, cứ 20 phút ngẩng lên giãn cổ một lần' },
    { t: 'Trước khi ngủ: làm 3 động tác nhẹ cho cổ, vai, lưng', tip: 'Khi tắt đèn đi ngủ, mình sẽ làm 3 động tác nhẹ cho cổ, vai, lưng rồi mới nằm xuống' }
  ],
  xuong: { t: 'Cúi lấy đồ thấp: hạ hông, không gập lưng', tip: 'Khi cúi lấy đồ dưới thấp, mình sẽ hạ hông, gập gối thay vì gập lưng' },
  chuyen: { t: 'Ngồi, đứng lâu: thả lỏng vai, giờ nghỉ xoay vai', tip: 'Khi chuông giờ nghỉ reo, mình sẽ xoay vai ra sau 8 vòng và giãn cổ hai bên' },
  troi: { t: 'Vật quá nặng: nhờ người cùng bê', tip: 'Khi thấy vật nặng quá sức, mình sẽ nhờ một bạn cùng bê thay vì cố một mình' },
  dv: { t: 'Lau dọn, đỡ đồ: chân rộng bằng vai, hạ hông', tip: 'Khi lau dọn phòng ở, mình sẽ đứng chân rộng bằng vai, hạ hông thay vì cúi gập lưng' },
  vp: { t: 'Ngồi học: lưng tựa ghế, hai chân chạm sàn', tip: 'Khi ngồi vào bàn học, mình sẽ ngồi sát lưng ghế, hai chân chạm sàn, sách đặt ngang tầm mắt' }
};

var BAI_YTE = [
  { id: 'y1', t: 'Choáng, sắp ngất', ic: 'heart', sub: 'Ngồi, nằm xuống ngay; khi nào gọi 119', min: 12,
    acts: [
      { id: 'y1a', k: 'sim', t: 'Ca trực: Bạn H. choáng ở sân tập', min: 5, xp: 15,
        scene: { ic: 'dumbbell', place: 'Sân tập GDTC', time: '8:40', tag: 'Bạn H. chưa ăn sáng' },
        intro: '<b class="nm">[Tên]</b> ơi, Shin đang trực Phòng y tế. Ở sân tập có chuyện rồi, mình ra xem nhé!',
        steps: [
          { say: 'Đang chạy nâng cao đùi, bạn H. dừng lại, ôm đầu: “Mắt mình tối sầm, chóng mặt quá.”', q: 'Bạn làm gì đầu tiên?',
            opts: [
              { t: 'Đỡ bạn ngồi hoặc nằm xuống ngay tại chỗ, rồi gọi to thầy cô', ok: 1, key: 'Cho ngồi hoặc nằm xuống ngay, gọi người giúp',
                res: 'Bạn H. nằm xuống trước khi kịp ngã.', why: 'Sắp ngất mà còn đứng thì dễ ngã, đập đầu. Cho xuống thấp ngay là an toàn nhất.' },
              { t: 'Dìu bạn đi bộ ngay lên phòng y tế ở tầng trên để được nằm nghỉ', res: 'Mới đi vài bước, bạn H. khuỵu xuống ở bậc cầu thang.', why: 'Đi lại khi đang choáng rất dễ ngã. Cho nằm xuống tại chỗ trước.' },
              { t: 'Bảo bạn đứng yên hít thở sâu, rồi chạy nốt cho xong bài', res: 'Bạn H. lảo đảo, suýt ngã ra sân.', why: 'Choáng là cơ thể báo dừng. Tập tiếp lúc này rất nguy hiểm.' }
            ] },
          { say: 'Bạn H. đã nằm trên sân, mặt tái, vã mồ hôi lạnh.', q: 'Tiếp theo bạn làm gì?',
            opts: [
              { t: 'Kê hai chân bạn cao hơn tim, nới lỏng cổ áo, thắt lưng', ok: 1, key: 'Kê chân cao hơn tim, nới cổ áo, thắt lưng',
                res: 'Sắc mặt bạn H. hồng dần.', why: 'Kê chân cao giúp máu về tim, lên não. Nới đồ cho bạn dễ thở.' },
              { t: 'Kê một chiếc gối thật cao dưới đầu cho bạn nằm dễ chịu', res: 'Bạn H. vẫn tái mặt, còn chóng mặt hơn.', why: 'Kê cao đầu làm máu khó lên não. Cần kê chân, không kê đầu.' },
              { t: 'Tát nhẹ vào má, xoa dầu vào mũi để bạn mau tỉnh lại', res: 'Bạn H. nhăn mặt, vẫn chóng mặt.', why: 'Tát, xoa dầu không đưa máu lên não, còn làm bạn khó chịu. Kê chân cao mới giúp.' }
            ] },
          { say: 'Mọi người xúm lại rất đông. Bạn H. nhắm mắt, gọi không trả lời.', q: 'Bạn làm gì?',
            opts: [
              { t: 'Nhờ mọi người lùi ra cho thoáng, xem ngực bạn có phập phồng thở không', ok: 1, key: 'Cho thoáng, xem còn thở không. Không thở, hoặc 1 phút chưa tỉnh: gọi 119',
                res: 'Ngực bạn H. phập phồng đều. Vài giây sau bạn mở mắt.', why: 'Chỗ thoáng, có người theo dõi hơi thở. Không thở, hoặc quá 1 phút chưa tỉnh thì gọi 119 ngay.' },
              { t: 'Đổ nước vào miệng bạn cho bạn tỉnh lại nhanh hơn', res: 'Nước trào ra, bạn H. ho sặc.', why: 'Người chưa tỉnh không nuốt được, nước có thể vào phổi. Chỉ cho uống khi đã tỉnh hẳn.' },
              { t: 'Để mọi người đứng sát xung quanh, đông người thì nhiều tay giúp được bạn hơn', res: 'Chỗ nằm bí hẳn, không ai nhìn rõ bạn H. thở ra sao.', why: 'Đông người thì bí, khó theo dõi. Cần chỗ thoáng và một người theo dõi hơi thở.' }
            ] },
          { say: 'Bạn H. tỉnh lại, nói: “Mình ổn rồi, cho mình tập tiếp.”', q: 'Bạn nói gì với bạn H.?',
            opts: [
              { t: 'Nằm nghỉ thêm cho hết choáng, ngồi dậy từ từ. Mình báo thầy cô nhé', ok: 1, key: 'Tỉnh rồi vẫn nằm nghỉ, ngồi dậy từ từ, báo thầy cô',
                res: 'Mười lăm phút sau, bạn H. ngồi dậy, uống nước, nghỉ hết buổi tập.', why: 'Đứng dậy nhanh dễ choáng lại. Thầy cô cần biết để theo dõi.' },
              { t: 'Ổn rồi thì đứng dậy tập tiếp đi, nghỉ lâu kẻo bị trừ điểm chuyên cần', res: 'Vừa đứng dậy, bạn H. lại choáng.', why: 'Tập ngay dễ ngất lần nữa. Sức khỏe trước, điểm sau.' },
              { t: 'Chuyện nhỏ thôi, đừng nói với ai cho đỡ phiền', res: 'Không ai biết để để ý bạn H. trong những buổi sau.', why: 'Giấu đi thì lần sau không ai giúp kịp. Ngất có thể là dấu hiệu cần đi khám.' }
            ] },
          { say: 'Ra về, bạn H. kể: “Sáng nay mình không ăn gì, tối qua thức khuya xem điện thoại.”', q: 'Bạn nói gì để bạn H. không bị lại?',
            opts: [
              { t: 'Ăn sáng trước giờ tập, ngủ đủ. Ngất lại lần nữa thì báo để đi khám', ok: 1, key: 'Ăn sáng, ngủ đủ. Ngất lặp lại thì đi khám',
                res: 'Bạn H. hẹn mai ăn sáng và đi ngủ sớm hơn.', why: 'Bỏ bữa, thiếu ngủ là lý do hay gặp. Ngất lặp lại thì cần bác sĩ tìm nguyên nhân.' },
              { t: 'Mai uống một lon nước tăng lực trước giờ tập là sẽ đủ sức tập ngay', res: 'Bạn H. uống tăng lực, vẫn bỏ bữa sáng.', why: 'Nước tăng lực không thay được bữa sáng và giấc ngủ.' },
              { t: 'Bạn yếu quá, chắc không hợp với môn thể chất', res: 'Bạn H. buồn, không muốn đến lớp nữa.', why: 'Nói bạn “yếu” không giúp gì. Tìm nguyên nhân, sửa thói quen mới giúp được.' }
            ] }
        ],
        end: 'Sắp ngất: xuống thấp ngay, kê chân, cho thoáng, theo dõi hơi thở. Không thở, hoặc 1 phút chưa tỉnh: gọi 119.' },
      { id: 'y1b', k: 'order', t: 'Khi chính mình sắp ngất', min: 3, xp: 10,
        q: 'Bạn thấy mắt tối sầm, chóng mặt. Xếp 4 việc theo thứ tự.', sub: 'Chạm lần lượt từ việc làm đầu tiên.',
        items: ['Ngồi hoặc nằm xuống ngay, dựa tường hoặc vịn tay vịn', 'Nói với người bên cạnh: “Mình chóng mặt quá”', 'Nằm kê chân cao, thở chậm, nghỉ đến khi hết choáng', 'Ngồi dậy từ từ, uống nước, báo thầy cô hoặc người phụ trách'],
        ok: 'Xuống thấp trước để không ngã, rồi mới nhờ người giúp.', hint: 'Việc đầu tiên là làm sao để mình không ngã. Rồi mới đến nhờ người.' },
      { id: 'y1c', k: 'pick', t: 'Gọi 119 hay theo dõi?', min: 4, xp: 10,
        rounds: [
          { q: 'Bạn cùng lớp ngất, hơn 1 phút vẫn chưa tỉnh.',
            opts: [
              { t: 'Gọi 119 ngay, rồi báo thầy cô hoặc người hỗ trợ', ok: 1, why: 'Đúng rồi! Quá 1 phút chưa tỉnh là dấu hiệu nặng. Gọi 119 ngay.' },
              { t: 'Cho nằm nghỉ, theo dõi thêm, báo thầy cô hoặc người hỗ trợ', why: 'Quá 1 phút chưa tỉnh thì không chờ thêm. Gọi 119.' },
              { t: 'Để bạn tự về phòng ngủ một giấc, mai gặp lại thì hỏi thăm sau', why: 'Người chưa tỉnh không thể tự về. Cần gọi 119 ngay.' }
            ] },
          { q: 'Bạn ngất chừng 5 giây, tỉnh ngay, nói chuyện rõ, chỉ hơi mệt.',
            opts: [
              { t: 'Gọi 119 ngay, rồi báo thầy cô hoặc người hỗ trợ', why: 'Tỉnh nhanh, nói rõ thì thường chưa cần xe cấp cứu. Cho nằm nghỉ, có người theo dõi.' },
              { t: 'Cho nằm nghỉ, theo dõi thêm, báo thầy cô hoặc người hỗ trợ', ok: 1, why: 'Đúng rồi! Nằm nghỉ, có người theo dõi, báo người phụ trách. Ngất lại thì đi khám.' },
              { t: 'Để bạn tự về phòng ngủ một giấc, mai gặp lại thì hỏi thăm sau', why: 'Vừa ngất thì không để bạn đi một mình. Cần có người theo dõi.' }
            ] },
          { q: 'Bạn ngã khi ngất, đầu đập xuống sàn, có chảy máu.',
            opts: [
              { t: 'Gọi 119 ngay, rồi báo thầy cô hoặc người hỗ trợ', ok: 1, why: 'Đúng rồi! Đập đầu khi ngã có thể bị thương bên trong. Gọi 119.' },
              { t: 'Cho nằm nghỉ, theo dõi thêm, báo thầy cô hoặc người hỗ trợ', why: 'Đập đầu, chảy máu thì cần cấp cứu, không chỉ theo dõi.' },
              { t: 'Để bạn tự về phòng ngủ một giấc, mai gặp lại thì hỏi thăm sau', why: 'Đập đầu mà ngủ một mình thì không ai biết nếu bạn nặng lên.' }
            ] },
          { q: 'Trước khi ngất, bạn kêu đau ngực, khó thở.',
            opts: [
              { t: 'Gọi 119 ngay, rồi báo thầy cô hoặc người hỗ trợ', ok: 1, why: 'Đúng rồi! Đau ngực, khó thở trước khi ngất có thể là bệnh tim. Gọi 119.' },
              { t: 'Cho nằm nghỉ, theo dõi thêm, báo thầy cô hoặc người hỗ trợ', why: 'Đau ngực, khó thở là dấu hiệu nguy hiểm. Không chờ, gọi 119.' },
              { t: 'Để bạn tự về phòng ngủ một giấc, mai gặp lại thì hỏi thăm sau', why: 'Đây là dấu hiệu nguy hiểm, cần cấp cứu ngay.' }
            ] }
        ],
        end: 'Không chắc thì gọi. Ở Nhật có nơi có số #7119 để hỏi có nên gọi xe cấp cứu không. Xem Sổ tay › Khẩn cấp.' }
    ],
    gtip: {
      xuong: 'Xưởng nóng, đứng lâu dễ choáng: ăn sáng trước ca, thấy choáng thì ngồi xuống, báo ngay.',
      chuyen: 'Đứng một chỗ cả ca dễ choáng: thỉnh thoảng nhón gót, co duỗi chân cho máu lưu thông.',
      troi: 'Ngoài trời nắng nóng dễ choáng: nghỉ bóng mát, uống nước đều.',
      dv: 'Bưng bê, đi lại cả ca: đừng bỏ bữa trước giờ làm.',
      vp: 'Ngồi lâu rồi đứng dậy đột ngột dễ choáng: đứng dậy từ từ.' } },

  { id: 'y2', t: 'Say nắng (熱中症)', ic: 'sun', sub: 'Vào chỗ mát, làm mát, uống nước; lơ mơ thì gọi 119', min: 12,
    acts: [
      { id: 'y2a', k: 'sim', t: 'Ca trực: Buổi chiều nắng ở công trường', min: 5, xp: 15,
        scene: { ic: 'sun', place: 'Công trường ở Nhật', time: '14:00', tag: 'Tháng 8 · 35°C' },
        intro: '<b class="nm">[Tên]</b> ơi, mùa hè ở Nhật có ngày trên 35 độ, lại ẩm. Hôm nay mình đi cùng anh K. ra công trường nhé.',
        steps: [
          { say: 'Anh K. làm ngoài nắng từ trưa. Anh đổ mồ hôi nhiều, chóng mặt, bắp chân bị chuột rút.', q: 'Bạn làm gì trước?',
            opts: [
              { t: 'Bảo anh dừng việc, đưa vào chỗ râm mát, báo người phụ trách ngay', ok: 1, key: 'Dừng việc, vào chỗ mát, báo người phụ trách',
                res: 'Anh K. ngồi dưới mái che có quạt.', why: 'Chóng mặt, chuột rút giữa trời nóng là dấu hiệu say nắng. Rời chỗ nóng là việc đầu tiên.' },
              { t: 'Bảo anh cố làm nốt 30 phút cho xong việc rồi hãy vào nghỉ cho thoải mái', res: 'Anh K. càng lúc càng choáng, tay run.', why: 'Ở lại chỗ nóng thêm, say nắng nặng lên rất nhanh.' },
              { t: 'Đưa anh lon cà phê lạnh cho tỉnh táo rồi làm tiếp', res: 'Anh K. uống xong vẫn chóng mặt.', why: 'Cà phê không làm mát người. Cần dừng việc, vào chỗ mát.' }
            ] },
          { say: 'Anh K. đã ngồi chỗ mát, người vẫn nóng ran.', q: 'Làm mát cho anh thế nào?',
            opts: [
              { t: 'Nới quần áo, chườm lạnh ở cổ, nách, bẹn, quạt cho anh', ok: 1, key: 'Nới đồ, chườm lạnh cổ, nách, bẹn, quạt',
                res: 'Người anh K. bớt nóng dần.', why: 'Cổ, nách, bẹn có mạch máu lớn gần da. Chườm khăn lạnh, chai nước lạnh ở đó làm mát người nhanh.' },
              { t: 'Khoác thêm áo cho anh để khỏi bị cảm lạnh vì gió quạt thổi vào', res: 'Anh K. càng nóng, mồ hôi vã ra.', why: 'Mặc thêm làm nhiệt không thoát ra được.' },
              { t: 'Bảo anh đi tắm nước nóng cho ra mồ hôi, hết mệt', res: 'Anh K. choáng hơn khi đứng dậy.', why: 'Nước nóng làm người nóng thêm. Cần làm mát.' }
            ] },
          { say: 'Anh K. tỉnh táo, tự cầm chai được.', q: 'Cho anh uống gì?',
            opts: [
              { t: 'Nước bù muối khoáng (経口補水液) hoặc đồ uống thể thao, từng ngụm', ok: 1, key: 'Còn tỉnh, tự uống được: nước có muối khoáng, từng ngụm',
                res: 'Anh K. uống từng ngụm, đỡ chuột rút.', why: 'Đổ mồ hôi nhiều là mất cả nước và muối. Chỉ cho uống khi người đó tự uống được.' },
              { t: 'Một lon bia lạnh cho mát người, đỡ mệt nhanh', res: 'Anh K. thấy mệt hơn.', why: 'Rượu bia làm cơ thể mất thêm nước.' },
              { t: 'Một ly cà phê đá thật đậm cho anh tỉnh táo trở lại để làm tiếp', res: 'Anh K. vẫn chuột rút.', why: 'Cà phê không bù được muối khoáng đã mất theo mồ hôi.' }
            ] },
          { say: 'Một lúc sau, anh K. nói lẫn lộn, hỏi không trả lời rõ, không tự uống được nữa.', q: 'Bạn làm gì?',
            opts: [
              { t: 'Gọi 119 ngay, vẫn tiếp tục làm mát cho anh trong lúc chờ', ok: 1, key: 'Lơ mơ, không tự uống được: gọi 119, vẫn làm mát',
                res: 'Xe cấp cứu đến, anh K. được đưa đi viện kịp lúc.', why: 'Lơ mơ là say nắng nặng, nguy hiểm tính mạng. Gọi 119 và làm mát liên tục.' },
              { t: 'Đổ thật nhiều nước vào miệng cho anh tỉnh lại', res: 'Anh K. sặc nước, ho dữ dội.', why: 'Người lơ mơ dễ sặc. Không ép uống, gọi 119.' },
              { t: 'Để anh nằm ngủ một giấc ở chỗ mát, chiều mát trời sẽ tự khỏe lại', res: 'Anh K. lịm dần.', why: 'Say nắng nặng không tự khỏi. Chờ là mất thời gian quý.' }
            ] },
          { say: 'Hôm sau anh K. đã khỏe, hỏi: “Làm sao để không bị lại?”', q: 'Bạn nói gì với anh?',
            opts: [
              { t: 'Uống đều cả khi chưa khát, nghỉ bóng mát, ngủ đủ; thấy lạ thì báo ngay', ok: 1, key: 'Phòng say nắng: uống đều, nghỉ bóng mát, ngủ đủ, báo sớm',
                res: 'Anh K. để sẵn chai nước ở chỗ làm, đặt giờ nhắc uống.', why: 'Say nắng hay đến khi thiếu ngủ, bỏ bữa, ít uống. Báo sớm là cách giữ an toàn.' },
              { t: 'Khát mới uống, cho đỡ mất thời gian đi vệ sinh', res: 'Mấy hôm sau anh K. lại chóng mặt.', why: 'Thấy khát là cơ thể đã thiếu nước rồi.' },
              { t: 'Ráng chịu nắng vài tuần là người sẽ quen dần, không cần nghỉ thêm giờ nào', res: 'Anh K. bỏ giờ nghỉ, lại mệt lả.', why: 'Cơ thể có quen dần, nhưng vẫn cần nghỉ, uống nước. Ráng chịu là cách dẫn tới tai nạn.' }
            ] }
        ],
        end: 'Say nắng: dừng việc, vào chỗ mát, làm mát cổ, nách, bẹn, cho uống nếu còn tỉnh. Lơ mơ: gọi 119.' },
      { id: 'y2b', k: 'match', t: 'Từ tiếng Nhật ngày nắng', min: 3, xp: 10,
        q: 'Ghép nghĩa tiếng Việt với chữ Nhật.', sub: 'Chạm một nghĩa, rồi chạm chữ Nhật hợp với nó.',
        sel: 'kwSel', no: 'kwNo', end: 'y2End',
        pairs: [
          { v: 'Say nắng', j: '熱中症', k: 'ねっちゅうしょう', r: 'necchūshō', why: 'Mùa hè ở Nhật, từ này nghe rất nhiều ở chỗ làm, trên tivi.' },
          { v: 'Bổ sung nước', j: '水分補給', k: 'すいぶんほきゅう', r: 'suibun hokyū', why: 'Hay thấy trên biển nhắc ở công trường, nhà xưởng.' },
          { v: 'Nghỉ giải lao', j: '休憩', k: 'きゅうけい', r: 'kyūkei', why: 'Nghỉ đúng giờ là một phần của an toàn.' },
          { v: 'Tôi thấy không khỏe', j: '気分が悪いです', k: 'きぶんがわるいです', r: 'kibun ga warui desu', why: 'Nói ngay khi thấy chóng mặt, buồn nôn.' },
          { v: 'Tôi bị chóng mặt', j: 'めまいがします', r: 'memai ga shimasu', why: 'Nói rõ dấu hiệu để người khác giúp đúng.' },
          { v: 'Xe cấp cứu', j: '救急車', k: 'きゅうきゅうしゃ', r: 'kyūkyūsha', why: 'Gọi số 119.' }
        ] },
      { id: 'y2c', k: 'pick', t: 'Ngày nắng của nhóm mình', min: 4, xp: 10,
        rounds: [
          { q: 'Ở chỗ làm, bạn báo cho ai khi thấy mình hoặc bạn có dấu hiệu say nắng?',
            opts: [
              { t: 'Người phụ trách mà chỗ làm đã chỉ định, hỏi rõ ngay từ ngày đầu', ok: 1, why: 'Đúng rồi! Từ tháng 6/2025, luật Nhật yêu cầu chỗ làm nóng phải định sẵn người nhận báo say nắng. Hỏi trước: báo ai, bằng cách nào.' },
              { t: 'Không cần báo ai, tự nghỉ một lát rồi làm tiếp', why: 'Say nắng có thể nặng lên rất nhanh. Phải có người biết để theo dõi.' },
              { t: 'Đợi hết ca rồi kể với bạn cùng phòng để cả hai cùng rút kinh nghiệm', why: 'Đợi hết ca là quá muộn. Báo ngay cho người phụ trách.' }
            ] },
          { q: 'Làm ở chỗ nóng, lúc nào nên uống nước?',
            opts: [
              { t: 'Uống đều từng chút, khoảng 20–30 phút một lần, cả khi chưa khát', ok: 1, why: 'Đúng rồi! Uống đều, ít một. Đổ mồ hôi nhiều thì uống thêm nước có muối khoáng.' },
              { t: 'Chỉ uống khi thấy khát, uống thật nhiều một lần', why: 'Thấy khát là cơ thể đã thiếu nước. Uống đều trước khi khát.' },
              { t: 'Đợi đến giờ nghỉ trưa uống một lần cho đỡ phải đi vệ sinh giữa ca', why: 'Nhịn uống cả buổi sáng ở chỗ nóng rất dễ say nắng.' }
            ] },
          { q: 'Công trường giữa trưa hè, mái tôn hắt nóng. Bạn làm gì để không bị say nắng?',
            opts: [
              { t: 'Đội mũ, uống nước theo giờ, nghỉ bóng mát, thấy chóng mặt thì báo ngay', ok: 1, why: 'Đúng rồi! Mũ, nước, bóng mát, báo sớm: bốn việc giữ an toàn ngày nắng.' },
              { t: 'Cởi áo cho mát, làm liền một mạch cho xong hết việc rồi mới nghỉ luôn một thể', why: 'Cởi áo ngoài nắng làm da nóng hơn. Làm liền không nghỉ dễ say nắng.' },
              { t: 'Ráng chịu, vì ai cũng nóng như mình cả', why: 'Ai cũng nóng không có nghĩa là an toàn. Nghỉ, uống nước, báo sớm.' }
            ] }
        ],
        byGroup: {
          xuong: { q: 'Xưởng có lò, máy chạy nóng, mùa hè không có điều hòa. Bạn mặc đồ bảo hộ dài tay. Bạn làm gì?',
            opts: [
              { t: 'Để nước gần chỗ làm, uống theo giờ, nghỉ chỗ thoáng, chóng mặt thì báo', ok: 1, why: 'Đúng rồi! Đồ bảo hộ vẫn mặc đủ, còn nước và giờ nghỉ giúp bạn không say nắng.' },
              { t: 'Cởi bớt đồ bảo hộ cho mát, khi nào có người kiểm tra thì mặc lại cho đủ', why: 'Bỏ đồ bảo hộ là nguy cơ tai nạn. Giữ đồ bảo hộ, uống nước, nghỉ đúng giờ.' },
              { t: 'Làm liền một mạch cho xong việc rồi nghỉ', why: 'Làm liền ở chỗ nóng rất dễ say nắng. Nghỉ và uống theo giờ.' }
            ] },
          chuyen: { q: 'Khu nấu, hấp của dây chuyền thực phẩm nóng và ẩm. Bạn làm gì?',
            opts: [
              { t: 'Uống ở chỗ cho phép vào giờ nghỉ, ra chỗ mát, chóng mặt thì báo ngay', ok: 1, why: 'Đúng rồi! Khu thực phẩm có chỗ được uống riêng. Nghỉ ra chỗ mát và báo sớm.' },
              { t: 'Mang chai nước vào uống ngay trên dây chuyền cho tiện, khỏi phải đi ra ngoài', why: 'Khu thực phẩm thường cấm mang đồ uống vào để giữ vệ sinh. Uống ở chỗ cho phép.' },
              { t: 'Ráng chịu đến hết ca vì dây chuyền không được dừng', why: 'Chóng mặt thì phải báo, người phụ trách sẽ cho người thay.' }
            ] },
          troi: { q: 'Công trường giữa trưa hè, mái tôn hắt nóng. Bạn làm gì để không bị say nắng?',
            opts: [
              { t: 'Đội mũ, uống nước theo giờ, nghỉ bóng mát, thấy chóng mặt thì báo ngay', ok: 1, why: 'Đúng rồi! Mũ, nước, bóng mát, báo sớm: bốn việc giữ an toàn ngày nắng.' },
              { t: 'Cởi áo cho mát, làm liền một mạch cho xong hết việc rồi mới nghỉ luôn một thể', why: 'Cởi áo ngoài nắng làm da nóng hơn. Làm liền không nghỉ dễ say nắng.' },
              { t: 'Ráng chịu, vì ai cũng nóng như mình cả', why: 'Ai cũng nóng không có nghĩa là an toàn. Nghỉ, uống nước, báo sớm.' }
            ] },
          dv: { q: 'Bếp nhà hàng giờ cao điểm, lửa nóng, đi lại liên tục. Bạn làm gì?',
            opts: [
              { t: 'Uống nước giữa các lượt, ra chỗ mát khi được nghỉ, chóng mặt thì báo', ok: 1, why: 'Đúng rồi! Bếp nóng cũng gây say nắng. Uống đều, báo sớm.' },
              { t: 'Đông khách quá, nhịn uống đến khi hết giờ cao điểm', why: 'Nhịn uống ở bếp nóng rất dễ say nắng.' },
              { t: 'Ráng làm tiếp, chóng mặt một chút rồi sẽ hết, không cần nói với ai cả', why: 'Chóng mặt ở chỗ nóng là dấu hiệu say nắng. Báo ngay.' }
            ] },
          vp: { q: 'Bạn làm thêm giao hàng bằng xe đạp vào buổi trưa hè. Bạn làm gì?',
            opts: [
              { t: 'Mang nước, đội mũ, nghỉ chỗ râm giữa các đơn, thấy lạ thì dừng lại', ok: 1, why: 'Đúng rồi! Làm một mình càng cần tự chủ động nghỉ, uống nước.' },
              { t: 'Chạy liền một mạch cho nhanh xong để nhận thêm được nhiều đơn hơn nữa', why: 'Chạy liền giữa trưa nắng rất dễ say nắng, lại dễ tai nạn.' },
              { t: 'Uống một lon nước tăng lực trước khi đi là đủ', why: 'Nước tăng lực không thay được nước, mũ và giờ nghỉ.' }
            ] }
        },
        end: 'Ngày đầu ở chỗ làm, hỏi trước: say nắng thì báo ai, chỗ nghỉ mát ở đâu, nước để ở đâu.' }
    ],
    gtip: {
      xuong: 'Xưởng có lò, máy nóng: để nước gần chỗ làm, uống theo giờ.',
      chuyen: 'Khu nấu, hấp nóng ẩm: ra chỗ mát đúng giờ nghỉ, uống ở chỗ cho phép.',
      troi: 'Công trường mùa hè: đội mũ, nghỉ bóng mát, báo ngay khi thấy lạ.',
      dv: 'Bếp nhà hàng rất nóng giờ cao điểm: uống nước giữa các lượt.',
      vp: 'Làm thêm ngoài trời mùa hè: mang nước, đội mũ, nghỉ chỗ râm.' } },

  { id: 'y3', t: 'Cảm lạnh, cúm, sốt', ic: 'drop', sub: 'Báo sớm, không lây cho bạn, khi nào đi khám', min: 13,
    acts: [
      { id: 'y3a', k: 'sim', t: 'Ca trực: Sáng thức dậy bị sốt', min: 5, xp: 15,
        scene: { ic: 'timer', place: 'Phòng ký túc xá', time: '6:30', tag: 'Nhiệt kế: 38,5°C' },
        intro: '<b class="nm">[Tên]</b> ơi, ca này người bị ốm chính là bạn. Thử xem mình xử lý thế nào nhé.',
        steps: [
          { say: 'Sáng nay bạn thức dậy, người nóng, đau nhức. Nhiệt kế báo 38,5°C. 8 giờ có lớp.', q: 'Bạn làm gì trước?',
            opts: [
              { t: 'Báo thầy cô chủ nhiệm trước giờ học: sốt bao nhiêu độ, từ lúc nào', ok: 1, key: 'Báo trước giờ học: sốt bao nhiêu độ, từ lúc nào',
                res: 'Thầy cô biết, dặn bạn nghỉ ở phòng và theo dõi.', why: 'Báo sớm, nói rõ để thầy cô sắp xếp và giúp bạn. Đó là Hō-Ren-Sō.' },
              { t: 'Tắt điện thoại ngủ tiếp, chiều khỏe thì báo sau cũng được', res: 'Cả buổi sáng thầy cô gọi không được, rất lo.', why: 'Không báo thì không ai biết để giúp, lại bị tính là vắng không báo.' },
              { t: 'Uống thuốc hạ sốt rồi ráng đi học như thường, không cần nói với ai cả', res: 'Đến trưa bạn mệt lả, cả bàn ngồi cạnh bắt đầu ho.', why: 'Đi học khi sốt dễ lây cho cả lớp, lại mệt thêm.' }
            ] },
          { say: 'Bạn cùng phòng chuẩn bị đi học.', q: 'Bạn làm gì để không lây cho bạn?',
            opts: [
              { t: 'Đeo khẩu trang, dùng cốc, khăn riêng, mở cửa sổ cho thoáng', ok: 1, key: 'Khẩu trang, đồ dùng riêng, phòng thoáng',
                res: 'Bạn cùng phòng vẫn khỏe đi học.', why: 'Bệnh lây qua giọt bắn và đồ dùng chung. Vài việc nhỏ giữ cả phòng khỏe.' },
              { t: 'Nằm chung chăn với bạn cho ấm, đỡ lạnh run', res: 'Hai hôm sau bạn cùng phòng cũng sốt.', why: 'Nằm sát nhau là cách lây nhanh nhất.' },
              { t: 'Đóng kín hết cửa, bật máy sưởi thật nóng cho chóng ra mồ hôi', res: 'Phòng bí hơi, cả phòng thấy mệt.', why: 'Phòng bí làm bệnh lây dễ hơn. Ủ thật nóng không làm khỏi nhanh hơn.' }
            ] },
          { say: 'Chiều, bạn sốt 39,5°C, đau nhức khắp người, mệt rã rời.', q: 'Bạn làm gì?',
            opts: [
              { t: 'Báo người hỗ trợ để được đưa đi khám, vì có thể là cúm', ok: 1, key: 'Sốt cao, đau nhức khắp người: báo để đi khám',
                res: 'Người hỗ trợ đưa bạn đi khám ngay chiều đó.', why: 'Sốt cao, đau nhức toàn thân giống cúm. Cần bác sĩ khám sớm.' },
              { t: 'Chờ thêm 3–4 ngày xem có tự hết không rồi mới tính', res: 'Đêm đó bạn sốt cao hơn, mê mệt.', why: 'Sốt cao mà chờ lâu dễ nặng thêm, lây thêm người.' },
              { t: 'Nhờ bạn ra hiệu thuốc mua kháng sinh về uống cho mau khỏi', res: 'Uống xong bạn vẫn sốt, còn đau bụng.', why: 'Cảm, cúm do vi rút. Kháng sinh không chữa được, tự uống còn có hại.' }
            ] },
          { say: 'Bác sĩ nói bạn bị cúm (インフルエンザ), dặn nghỉ ở nhà.', q: 'Mấy ngày nghỉ, bạn làm gì?',
            opts: [
              { t: 'Nghỉ đủ ngày bác sĩ dặn, ở trong phòng, không sang phòng bạn chơi', ok: 1, key: 'Nghỉ đủ ngày bác sĩ dặn, không sang phòng khác',
                res: 'Không ai trong ký túc xá bị lây.', why: 'Hết sốt chưa chắc hết lây. Nghỉ đủ là giữ an toàn cho cả nhóm.' },
              { t: 'Hết sốt là đi làm thêm ngay hôm sau, đỡ phải mất thêm buổi lương nào', res: 'Hai người ở chỗ làm thêm bị sốt theo.', why: 'Đi sớm có thể lây cho cả chỗ làm. Làm theo lời bác sĩ.' },
              { t: 'Buồn quá, sang phòng bạn ngủ chung một đêm cho vui', res: 'Bạn phòng bên bắt đầu ho, sốt.', why: 'Đang lây mà sang phòng khác ngủ là đem bệnh cho bạn.' }
            ] },
          { say: 'Trong mấy ngày nghỉ, bạn tự chăm mình.', q: 'Cách nào đúng nhất?',
            opts: [
              { t: 'Uống đủ nước, ăn cháo, súp dễ tiêu, ngủ nhiều, đo nhiệt độ sáng tối', ok: 1, key: 'Uống đủ nước, ăn dễ tiêu, ngủ nhiều, đo nhiệt độ',
                res: 'Ba hôm sau bạn hết sốt, ăn ngon trở lại.', why: 'Nước, ăn dễ tiêu, ngủ giúp cơ thể hồi phục. Đo nhiệt độ để biết mình đỡ hay nặng lên.' },
              { t: 'Thức khuya xem phim cho đỡ buồn, ăn mì gói cho nhanh', res: 'Bạn mệt dai dẳng cả tuần.', why: 'Thiếu ngủ, ăn thiếu chất làm bệnh lâu khỏi.' },
              { t: 'Nhịn ăn cho nhẹ bụng, chỉ cần uống thuốc hạ sốt đúng giờ là đủ để khỏi', res: 'Bạn đuối sức, đứng dậy là choáng.', why: 'Đang ốm càng cần ăn, uống đủ để có sức.' }
            ] }
        ],
        end: 'Sốt: báo sớm, đeo khẩu trang, dùng đồ riêng. Sốt cao, đau nhức khắp người: đi khám. Nghỉ đủ ngày bác sĩ dặn.' },
      { id: 'y3b', k: 'pick', t: 'Nghỉ ở phòng hay đi khám?', min: 4, xp: 10,
        rounds: [
          { q: 'Hắt hơi, sổ mũi, đau họng nhẹ, không sốt.',
            opts: [
              { t: 'Nghỉ ngơi, uống đủ nước, đeo khẩu trang, tự theo dõi thêm', ok: 1, why: 'Đúng rồi! Giống cảm lạnh nhẹ. Giữ ấm, uống nước, ngủ đủ. Nặng lên thì báo.' },
              { t: 'Báo người hỗ trợ, nhờ đưa đi khám bệnh ngay trong hôm nay', why: 'Cảm lạnh nhẹ thường tự khỏi. Cứ báo cho người hỗ trợ biết, đi khám khi nặng lên.' },
              { t: 'Gọi 119 ngay', why: 'Đây không phải lúc cấp cứu. Số 119 để dành cho người nguy hiểm.' }
            ] },
          { q: 'Sốt cao 39°C đến nhanh, đau nhức khắp người, mệt rã rời.',
            opts: [
              { t: 'Nghỉ ngơi, uống đủ nước, đeo khẩu trang, tự theo dõi thêm', why: 'Sốt cao, đau nhức toàn thân giống cúm. Cần bác sĩ khám.' },
              { t: 'Báo người hỗ trợ, nhờ đưa đi khám bệnh ngay trong hôm nay', ok: 1, why: 'Đúng rồi! Có thể là cúm. Đi khám sớm, đeo khẩu trang để không lây.' },
              { t: 'Gọi 119 ngay', why: 'Còn tỉnh táo, thở được thì báo người hỗ trợ đưa đi khám.' }
            ] },
          { q: 'Sổ mũi đã 3 ngày, nay sốt 38°C và ho nhiều hơn.',
            opts: [
              { t: 'Nghỉ ngơi, uống đủ nước, đeo khẩu trang, tự theo dõi thêm', why: 'Bệnh đang nặng lên, không chỉ tự theo dõi nữa.' },
              { t: 'Báo người hỗ trợ, nhờ đưa đi khám bệnh ngay trong hôm nay', ok: 1, why: 'Đúng rồi! Bệnh kéo dài và nặng lên thì báo người hỗ trợ, đi khám.' },
              { t: 'Gọi 119 ngay', why: 'Chưa phải cấp cứu. Báo người hỗ trợ để đi khám.' }
            ] },
          { q: 'Sốt cao, khó thở, môi tái, hỏi chỉ trả lời lơ mơ.',
            opts: [
              { t: 'Nghỉ ngơi, uống đủ nước, đeo khẩu trang, tự theo dõi thêm', why: 'Khó thở, lơ mơ là dấu hiệu nguy hiểm. Gọi 119.' },
              { t: 'Báo người hỗ trợ, nhờ đưa đi khám bệnh ngay trong hôm nay', why: 'Không chờ người đưa đi. Khó thở, lơ mơ thì gọi 119 trước.' },
              { t: 'Gọi 119 ngay', ok: 1, why: 'Đúng rồi! Khó thở, môi tái, lơ mơ là cấp cứu. Gọi 119, rồi báo người hỗ trợ.' }
            ] }
        ],
        end: 'Không chắc nên làm gì: báo người hỗ trợ trước. Nói rõ dấu hiệu, từ khi nào, nhiệt độ bao nhiêu.' },
      { id: 'y3c', k: 'story', kl: 'Chuyện đã xảy ra', t: 'Chuyện bạn M. ở trung tâm đào tạo', min: 5, xp: 15, w: 'storyW3',
        story: ['Tháng đầu sang Nhật, bạn M. học tập trung ở trung tâm đào tạo. Trời lạnh, nhân viên nhắc nhiều lần: ra ngoài nhớ mặc ấm.', 'M. thấy mặc nhiều vướng víu, chỉ mặc áo mỏng. Ít hôm sau M. sốt, ho.', 'Nhân viên xếp M. ở một phòng riêng để nghỉ và không lây cho người khác.', 'Ở một mình buồn quá, tối đó M. sang phòng bạn chơi, rồi ngủ lại luôn.'],
        end: 'Giữ sức khỏe của mình cũng là giữ cho cả nhóm. Một người ốm lây cả phòng thì cả chỗ làm thiếu người.',
        tips: ['Nếu là M., mình sẽ mặc ấm ngay khi được nhắc, không đợi đến lúc ốm', 'Nếu là M., mình sẽ ở yên phòng riêng, buồn thì gọi điện cho bạn thay vì sang phòng'],
        rounds: [
          { q: 'Vì sao M. bị ốm?',
            opts: [
              { t: 'Vì ở Nhật lạnh hơn ở Việt Nam, ai mới sang cũng sẽ bị ốm', why: 'Trời lạnh là thật, nhưng mặc gì là M. chọn. Các bạn mặc ấm thì không ốm.' },
              { t: 'Vì M. không nghe lời nhắc mặc ấm, chủ quan với sức mình', ok: 1, why: 'Đúng rồi! Lời nhắc có sẵn, nhưng M. nghĩ mình chịu được.' },
              { t: 'Vì phòng riêng không ai chăm sóc M.', why: 'M. ốm trước, rồi mới được xếp phòng riêng.' }
            ] },
          { q: 'Vì sao nhân viên xếp M. ở phòng riêng?',
            opts: [
              { t: 'Để phạt M. vì không chịu nghe lời nhắc mặc ấm', why: 'Phòng riêng không phải để phạt. Đó là để giữ an toàn cho mọi người.' },
              { t: 'Vì phòng chung đã hết chỗ nên M. phải ở tạm một mình vài hôm', why: 'Phòng riêng là để M. được nghỉ và không lây cho người khác.' },
              { t: 'Để M. được nghỉ ngơi và không lây bệnh cho các bạn ở chung', ok: 1, why: 'Đúng rồi! Đó là cách bảo vệ cả M. và cả nhóm.' }
            ] },
          { q: 'Vì sao việc M. sang phòng bạn ngủ là không ổn?',
            opts: [
              { t: 'Vì M. có thể lây bệnh cho bạn, cả nhóm phải nghỉ học, nghỉ làm theo', ok: 1, why: 'Đúng rồi! Một người không giữ ý thì cả nhóm chịu hậu quả.' },
              { t: 'Vì ngủ chung phòng thì chật và ồn, làm phiền giờ ngủ, giờ học của bạn', why: 'Ồn là chuyện nhỏ. Điều đáng lo là lây bệnh.' },
              { t: 'Không sao cả, bạn thân ngủ chung mấy hôm cũng được', why: 'Đang ốm thì bạn càng thân càng nên giữ khoảng cách.' }
            ] }
        ] }
    ],
    gtip: {
      xuong: 'Mùa đông xưởng lạnh: mặc ấm bên trong đồ bảo hộ.',
      chuyen: 'Dây chuyền thực phẩm lạnh, ẩm: mặc đủ lớp. Sốt, tiêu chảy thì báo, không vào khu thực phẩm.',
      troi: 'Làm ngoài trời mùa đông: giữ ấm tay, chân, cổ.',
      dv: 'Kaigo, nhà hàng gặp nhiều người: ốm thì báo nghỉ để không lây cho người già, cho khách.',
      vp: 'Văn phòng, lớp học kín và đông người: ho thì đeo khẩu trang.' } },

  /* ---------- Đợt 2 (TC01.1.2) ---------- */
  { id: 'y4', t: 'Bong gân, trầy xước', ic: 'leg', sub: 'Chườm lạnh, băng ép, giữ vết thương sạch', min: 13,
    acts: [
      { id: 'y4a', k: 'sim', t: 'Ca trực: Trận bóng chiều chủ nhật', min: 5, xp: 15,
        scene: { ic: 'leg', place: 'Sân bóng gần ký túc xá', time: '16:30', tag: 'Còn 1 tháng nữa bay' },
        intro: '<b class="nm">[Tên]</b> ơi, chiều chủ nhật cả phòng rủ nhau đá bóng. Shin đi theo trực, mang sẵn túi sơ cứu nhé.',
        steps: [
          { say: 'Bạn T. bật lên đánh đầu, tiếp đất lệch chân. T. ngồi ôm cổ chân, đầu gối trầy rướm máu.', q: 'Bạn làm gì đầu tiên?',
            opts: [
              { t: 'Cho T. dừng chơi, ngồi yên, không cố đứng dậy đi tiếp', ok: 1, key: 'Dừng chơi ngay, ngồi yên, không cố đi',
                res: 'T. ngồi xuống mép sân, cổ chân được để yên.', why: 'Cố đi trên cổ chân vừa trẹo dễ làm dây chằng rách thêm. Dừng ngay là bước đầu tiên.' },
              { t: 'Bảo T. đứng dậy chạy thử vài vòng cho cổ chân giãn ra rồi đá tiếp', res: 'Mới chạy vài bước, T. khuỵu xuống, đau hơn lúc nãy.', why: 'Chạy trên chân vừa trẹo làm tổn thương nặng thêm.' },
              { t: 'Nắn, bóp mạnh cổ chân cho khớp về chỗ cũ', res: 'T. kêu đau, cổ chân sưng nhanh hơn.', why: 'Nắn bóp mạnh làm chỗ bị thương chảy máu bên trong nhiều hơn, sưng thêm.' }
            ] },
          { say: 'Mười phút sau, cổ chân T. bắt đầu sưng, chạm vào thấy đau.', q: 'Chườm thế nào?',
            opts: [
              { t: 'Chườm lạnh: đá bọc trong khăn, mỗi lần khoảng 15–20 phút', ok: 1, key: 'Chườm lạnh: đá bọc khăn, mỗi lần khoảng 15–20 phút',
                res: 'Cổ chân T. đỡ đau, sưng chậm lại.', why: 'Lạnh làm co mạch, bớt sưng, bớt đau. Bọc khăn để đá không làm bỏng lạnh da.' },
              { t: 'Chườm nóng, xoa dầu nóng thật kỹ cho máu lưu thông để mau tan sưng', res: 'Tối đó cổ chân T. sưng to hơn.', why: 'Mới bị thương mà chườm nóng, xoa dầu nóng thì sưng thêm. Lúc đầu cần lạnh.' },
              { t: 'Đắp lá giã nát theo cách người quen mách', res: 'Lá dính bẩn vào vết trầy ở đầu gối, cổ chân vẫn sưng.', why: 'Đắp lá không làm bớt sưng, còn dễ làm bẩn vết thương.' }
            ] },
          { say: 'Chườm xong, T. được dìu về phòng.', q: 'Tiếp theo làm gì cho cổ chân?',
            opts: [
              { t: 'Băng ép vừa chặt bằng băng thun, khi nằm kê chân cao hơn tim', ok: 1, key: 'Băng ép vừa chặt, kê chân cao hơn tim',
                res: 'Sáng hôm sau, cổ chân T. đỡ sưng nhiều.', why: 'Băng ép, kê cao giúp bớt sưng. Ngón chân tê, tím là băng quá chặt, cần nới ra.' },
              { t: 'Quấn băng thật chặt, càng chặt càng mau hết sưng, để nguyên đến sáng', res: 'Nửa đêm, ngón chân T. tê buốt, tím lại.', why: 'Băng quá chặt làm máu không lưu thông. Chỉ băng vừa chặt.' },
              { t: 'Để chân thõng xuống giường, đi lại bình thường', res: 'Cổ chân T. sưng căng, đi lại càng đau.', why: 'Để chân thấp, đi lại nhiều làm máu dồn xuống, sưng thêm.' }
            ] },
          { say: 'Giờ đến vết trầy ở đầu gối, còn dính đất cát.', q: 'Xử lý vết trầy thế nào?',
            opts: [
              { t: 'Rửa sạch bằng nước sạch cho hết đất cát, thấm khô, che băng sạch', ok: 1, key: 'Vết trầy: rửa nước sạch cho hết đất cát, thấm khô, che băng sạch',
                res: 'Vết trầy sạch sẽ, được che kín.', why: 'Đất cát còn trong vết thương là nguồn nhiễm trùng. Rửa nước sạch là việc quan trọng nhất.' },
              { t: 'Bôi kem đánh răng lên cho mát, mau khô vết thương', res: 'Vết trầy rát hơn, đất cát vẫn còn bên dưới lớp kem.', why: 'Kem đánh răng không làm sạch vết thương, còn gây rát, dễ nhiễm trùng.' },
              { t: 'Để nguyên như vậy, vết thương tự đóng vảy rồi sẽ khỏi, khỏi phải rửa', res: 'Đất cát bị đóng vảy bên trong vết thương.', why: 'Không rửa thì đất cát nằm lại bên trong, rất dễ nhiễm trùng.' }
            ] },
          { say: 'Hai hôm sau, đầu gối T. đỏ lan rộng, sưng nóng, có mủ. T. hơi sốt, sợ báo thầy cô sẽ ảnh hưởng ngày bay.', q: 'Bạn nói gì với T.?',
            opts: [
              { t: 'Báo thầy cô ngay để đi khám, vết thương đã có dấu hiệu nhiễm trùng', ok: 1, key: 'Đỏ lan, sưng nóng, có mủ, sốt, hoặc không đi được: báo, đi khám',
                res: 'T. đi khám, được rửa vết thương, uống thuốc theo đơn, một tuần sau lành.', why: 'Khám sớm thì khỏi sớm. Giấu đi, vết thương nặng thêm, mới thật sự ảnh hưởng ngày bay.' },
              { t: 'Giấu đi cho chắc, tự mua thuốc mỡ bôi thêm, chờ một tuần nữa xem sao', res: 'Vết thương lan rộng, T. sốt cao hơn.', why: 'Nhiễm trùng không tự hết khi chờ. Cần bác sĩ khám.' },
              { t: 'Tự nặn hết mủ ra là khỏi', res: 'Vết thương sưng đỏ thêm, đau hơn.', why: 'Tự nặn mủ đẩy vi khuẩn vào sâu hơn. Để bác sĩ xử lý.' }
            ] }
        ],
        end: 'Bong gân: dừng, chườm lạnh, băng ép, kê cao. Vết trầy: rửa nước sạch, che băng sạch. Đỏ lan, sưng nóng, mủ, sốt, hoặc không đi được: đi khám.' },
      { id: 'y4b', k: 'order', t: 'Bốn việc khi trẹo cổ chân', min: 3, xp: 10,
        q: 'Cổ chân vừa bị trẹo. Xếp 4 việc theo thứ tự.', sub: 'Chạm lần lượt từ việc làm đầu tiên.',
        items: ['Nghỉ: dừng chơi, ngồi yên, không cố đi', 'Lạnh: chườm đá bọc khăn khoảng 15–20 phút', 'Ép: băng thun vừa chặt quanh cổ chân', 'Kê cao: nằm kê chân cao hơn tim'],
        ok: 'Nghỉ – Lạnh – Ép – Kê cao. Nhớ 4 chữ này là sơ cứu được bong gân.', hint: 'Việc đầu tiên là để chân bị thương được yên. Việc cuối cùng làm khi đã nằm nghỉ.' },
      { id: 'y4c', k: 'story', kl: 'Chuyện đã xảy ra', t: 'Chuyện bạn Q. trước ngày bay', min: 5, xp: 15, w: 'storyW4',
        story: ['Còn ba tuần nữa bay, bạn Q. chạy xe máy đi chơi buổi tối. Trời mưa, đường trơn, Q. té xe, trầy tay và chân.', 'Q. sợ thầy cô biết sẽ ảnh hưởng ngày bay nên không báo. Q. không rửa vết thương, chỉ đắp thuốc theo lời người quen mách.', 'Mấy hôm sau, vết trầy ở chân sưng đỏ, có mủ, Q. bị sốt. Bạn cùng phòng thấy, báo thầy cô.', 'Q. phải nghỉ học đi điều trị, lo mãi không biết có kịp ngày bay không.'],
        end: 'Vết thương nhỏ báo sớm thì xử lý nhanh. Giấu đi mới làm chuyện nhỏ thành chuyện lớn.',
        tips: ['Trước ngày bay, mình sẽ hạn chế chạy xe buổi tối, trời mưa và các trò dễ chấn thương', 'Nếu bị thương, mình sẽ rửa sạch vết thương và báo thầy cô ngay, dù là vết nhỏ'],
        rounds: [
          { q: 'Vì sao vết trầy nhỏ của Q. thành nặng?',
            opts: [
              { t: 'Vì vết thương do té xe máy lúc nào cũng nặng, không ai tránh được', why: 'Lúc đầu chỉ là vết trầy. Nó nặng lên vì cách Q. xử lý sau đó.' },
              { t: 'Vì Q. không rửa sạch, đắp thuốc theo lời mách, lại không đi khám', ok: 1, why: 'Đúng rồi! Vết thương bẩn, để lâu không khám thì nhiễm trùng.' },
              { t: 'Vì trời mưa nên vết thương bị ướt', why: 'Ướt không phải lý do chính. Không rửa sạch, không khám mới là lý do.' }
            ] },
          { q: 'Vì sao Q. không báo thầy cô?',
            opts: [
              { t: 'Vì Q. sợ ảnh hưởng ngày bay, nghĩ giấu đi thì không ai biết', ok: 1, why: 'Đúng rồi! Nỗi sợ làm Q. chọn cách giấu.' },
              { t: 'Vì Q. không biết số điện thoại của thầy cô', why: 'Q. gặp thầy cô mỗi ngày ở trường. Q. chọn không báo.' },
              { t: 'Vì Q. nghĩ thầy cô bận, không muốn làm phiền thầy cô vì chuyện nhỏ của mình', why: 'Thầy cô cần biết để giúp. Điều Q. thật sự sợ là ảnh hưởng ngày bay.' }
            ] },
          { q: 'Vì sao giấu đi lại càng ảnh hưởng ngày bay hơn?',
            opts: [
              { t: 'Vì thầy cô sẽ phạt nặng khi phát hiện bạn giấu', why: 'Chuyện chính không phải bị phạt. Đó là vết thương nặng thêm.' },
              { t: 'Không đúng, giấu đi thì không ai biết nên không ảnh hưởng gì', why: 'Vết thương không tự biến mất khi giấu. Nó nặng thêm, rồi ai cũng biết.' },
              { t: 'Vì báo sớm thì khỏi sớm; giấu đi thì nặng thêm, lâu khỏi', ok: 1, why: 'Đúng rồi! Báo sớm là cách bảo vệ ngày bay tốt nhất.' }
            ] }
        ] }
    ],
    gtip: {
      xuong: 'Xưởng có nhiều cạnh sắc: vết cắt, trầy nhỏ cũng rửa sạch, báo người phụ trách.',
      chuyen: 'Khu thực phẩm: có vết thương ở tay phải báo trước khi vào làm, băng kín, đeo găng.',
      troi: 'Công trường mặt đất gồ ghề: mang giày bảo hộ đúng cỡ, buộc chặt dây.',
      dv: 'Sàn ướt dễ trượt: đi chậm, mang giày chống trơn.',
      vp: 'Làm thêm ở kho, giao hàng: đi đứng cẩn thận ở cầu thang, sàn trơn.' } },

  { id: 'y5', t: 'Đau lưng, cổ, vai', ic: 'core', sub: 'Mỏi thường hay cần đi khám?', min: 12,
    acts: [
      { id: 'y5a', k: 'sim', t: 'Ca trực: Sau ca bê hàng', min: 5, xp: 15,
        scene: { ic: 'core', place: 'Kho hàng ở Nhật', time: '17:30', tag: 'Hết ca bê thùng' },
        intro: '<b class="nm">[Tên]</b> ơi, đau lưng, mỏi cổ vai là chuyện nhiều anh chị ở Nhật hay gặp. Ca này mình đi cùng anh D. nhé.',
        steps: [
          { say: 'Hết ca bê thùng, anh D. kêu lưng mỏi, căng cứng. Anh vẫn đi lại, cúi người bình thường.', q: 'Bạn khuyên anh thế nào?',
            opts: [
              { t: 'Nghỉ ngơi, ngủ đủ, giãn nhẹ; mai nâng vật thì gập gối, lưng thẳng', ok: 1, key: 'Mỏi thường: nghỉ, ngủ đủ, giãn nhẹ, nâng vật đúng cách',
                res: 'Sáng hôm sau, lưng anh D. đỡ mỏi.', why: 'Mỏi sau một ngày làm nặng là bình thường. Nghỉ ngơi và nâng đúng cách giúp lưng hồi lại.' },
              { t: 'Tối nay ra phòng tập tạ nặng thêm cho lưng quen dần, mai sẽ hết mỏi', res: 'Hôm sau anh D. đau lưng hơn.', why: 'Lưng đang mỏi mà tập nặng thì dễ chấn thương. Cần nghỉ cho cơ hồi lại.' },
              { t: 'Nhờ bạn bẻ lưng cho kêu “rắc” là hết', res: 'Anh D. thấy nhói ở lưng.', why: 'Bẻ, vặn lưng mạnh có thể làm đau thêm. Không tự làm, không nhờ người không có chuyên môn.' }
            ] },
          { say: 'Sáng hôm sau, lưng anh D. đau nhiều hơn, cúi xuống buộc dây giày cũng khó. Ca hôm nay vẫn bê hàng.', q: 'Anh D. nên làm gì?',
            opts: [
              { t: 'Báo người phụ trách trước giờ làm, xin việc nhẹ hơn hôm nay', ok: 1, key: 'Đau nhiều: báo trước giờ làm, xin việc nhẹ hơn',
                res: 'Người phụ trách cho anh D. làm việc kiểm hàng, không bê nặng.', why: 'Báo sớm thì người phụ trách sắp xếp được. Bê nặng khi đang đau dễ chấn thương nặng hơn.' },
              { t: 'Không nói gì, cứ bê như thường để khỏi bị người phụ trách đánh giá là yếu', res: 'Giữa ca, anh D. đau nhói, phải ngồi xuống giữa kho.', why: 'Giấu đau rồi bị chấn thương thì cả nhóm thiếu người lâu hơn.' },
              { t: 'Tự nghỉ ở phòng, không báo ai', res: 'Người phụ trách gọi mãi không được, rất lo.', why: 'Nghỉ không báo là mất uy tín. Đau thì vẫn phải báo.' }
            ] },
          { say: 'Lưng vẫn đau nhiều. Anh D. định xem video trên mạng để tự tập.', q: 'Bạn nói gì?',
            opts: [
              { t: 'Đang đau nhiều thì chưa tự tập; chỉ cử động nhẹ trong mức không đau', ok: 1, key: 'Đang đau nhiều: chưa tự tập, cử động nhẹ trong mức không đau',
                res: 'Anh D. đi lại nhẹ nhàng, vài hôm sau đỡ dần.', why: 'Đang đau nhiều mà tập mạnh dễ đau thêm. Nằm im cả ngày cũng không tốt, cử động nhẹ là vừa.' },
              { t: 'Tập liền 30 phút các bài kéo giãn thật mạnh trong video cho mau hết đau', res: 'Tập xong, anh D. đau đến mức không đứng thẳng được.', why: 'Kéo giãn mạnh lúc đang đau nhiều làm đau thêm.' },
              { t: 'Nằm im trên giường cả tuần, không đứng dậy', res: 'Một tuần sau, người anh D. cứng đờ, càng khó cử động.', why: 'Nằm im quá lâu làm cơ cứng, yếu đi. Nên cử động nhẹ trong mức không đau.' }
            ] },
          { say: 'Hai hôm sau, anh D. kể: đau lan xuống mông, xuống chân, chân tê, bước đi thấy yếu.', q: 'Bạn làm gì?',
            opts: [
              { t: 'Đây là dấu hiệu cần đi khám: báo người hỗ trợ để được đưa đi khám', ok: 1, key: 'Tê lan xuống chân, yếu chân, đau sau té ngã: đi khám',
                res: 'Anh D. được khám, bác sĩ hướng dẫn điều trị và cách làm việc phù hợp.', why: 'Tê, yếu chân có thể là dây thần kinh bị chèn. Cần bác sĩ khám sớm.' },
              { t: 'Dán miếng dán giảm đau, chờ thêm vài tuần cho tự hết rồi tính sau', res: 'Chân anh D. tê nhiều hơn, đi lại khó.', why: 'Tê, yếu chân không nên chờ. Đi khám sớm.' },
              { t: 'Nhờ người quen nắn cột sống cho đỡ', res: 'Anh D. đau nhói, tê lan rộng hơn.', why: 'Nắn cột sống khi đang tê, yếu chân rất nguy hiểm. Để bác sĩ khám.' }
            ] },
          { say: 'Anh D. đã khỏe lại, hỏi: “Làm sao để không bị lại?”', q: 'Bạn nói gì với anh?',
            opts: [
              { t: 'Nâng vật sát người, gập gối; giãn cơ giữa ca; tập lưng bụng đều', ok: 1, key: 'Phòng đau lưng: nâng đúng cách, giãn giữa ca, tập lưng bụng đều',
                res: 'Anh D. giãn cơ mỗi giờ nghỉ, tập lưng bụng 3 buổi một tuần.', why: 'Nâng đúng cách, giãn cơ, cơ lưng bụng khỏe là ba việc giữ lưng lâu dài.' },
              { t: 'Đeo đai lưng thật chặt cả ngày là đủ, không cần đổi cách nâng hay tập gì thêm', res: 'Vài tháng sau anh D. lại đau lưng.', why: 'Đai lưng không thay được cách nâng đúng và cơ lưng bụng khỏe.' },
              { t: 'Né hết việc nặng, nhờ người khác bê hộ', res: 'Đồng nghiệp bắt đầu ngại làm cùng anh D.', why: 'Né việc không lâu dài được. Học cách nâng đúng và làm cơ khỏe lên.' }
            ] }
        ],
        end: 'Mỏi thường: nghỉ, giãn nhẹ, nâng đúng cách. Đau nhiều: báo, xin việc nhẹ. Tê, yếu chân, đau sau té ngã: đi khám.' },
      { id: 'y5b', k: 'how', t: 'Ba động tác nhẹ cho cổ, vai, lưng', min: 3, xp: 10, ex: ['backcare'],
        more: 'Chỉ làm khi mỏi thường. Đang đau nhiều, đau nhói, hoặc tê lan xuống tay chân thì không tự tập, báo để đi khám.' },
      { id: 'y5c', k: 'habit', t: 'Một thói quen giữ lưng, cổ, vai', min: 4, xp: 15, hl: 'YHABITS' }
    ],
    gtip: {
      xuong: 'Cúi lấy chi tiết thấp cả ca: hạ hông, gập gối, đừng gập lưng.',
      chuyen: 'Ngồi, đứng dây chuyền cả ca: giờ nghỉ xoay vai, giãn cổ.',
      troi: 'Bê vật nặng ở công trường: giữ vật sát người, nặng quá thì hai người cùng bê.',
      dv: 'Đỡ người, lau sàn: chân rộng bằng vai, hạ hông, không xoay vặn lưng.',
      vp: 'Ngồi máy tính lâu: màn hình ngang mắt, lưng tựa ghế, mỗi giờ đứng dậy.' } },

  { id: 'y6', t: 'Không khỏe thì báo thế nào', ic: 'pen', sub: 'Thang 5 mức, câu tiếng Nhật, tin nhắn báo ốm', min: 13,
    acts: [
      { id: 'y6a', k: 'sim', t: 'Ca trực: Báo ốm bằng tiếng Nhật', min: 5, xp: 15,
        scene: { ic: 'timer', place: 'Ký túc xá ở Nhật', time: '6:00', tag: 'Ca làm bắt đầu lúc 8:00' },
        intro: '<b class="nm">[Tên]</b> ơi, ở Nhật, ốm thì phải tự báo, báo đúng lúc, nói rõ ràng. Ca này người ốm là bạn nhé.',
        steps: [
          { say: 'Từ nửa đêm bạn đau bụng, nôn hai lần, đi ngoài nhiều lần. Bây giờ là 6 giờ sáng, 8 giờ vào ca.', q: 'Bạn báo lúc nào, báo ai?',
            opts: [
              { t: 'Gọi người phụ trách trước giờ vào ca, rồi nhắn người hỗ trợ', ok: 1, key: 'Báo trước giờ vào ca: gọi người phụ trách, nhắn người hỗ trợ',
                res: 'Người phụ trách biết sớm, kịp xếp người làm thay.', why: 'Báo trước giờ làm để chỗ làm kịp sắp xếp. Ốm nặng thì gọi điện, không chỉ nhắn tin.' },
              { t: 'Nhờ bạn cùng phòng nói giúp khi đến xưởng, mình ngủ tiếp cho khỏe', res: 'Bạn cùng phòng quên, đến trưa người phụ trách mới biết.', why: 'Nhờ nói lại dễ sót, dễ sai. Tự báo là phép lịch sự và trách nhiệm.' },
              { t: 'Đợi 9 giờ, khi đỡ mệt hơn thì nhắn tin', res: 'Đến giờ vào ca không thấy bạn, cả tổ phải chờ.', why: 'Báo sau giờ vào ca là quá muộn. Ở Nhật, báo trước giờ làm rất quan trọng.' }
            ] },
          { say: 'Người phụ trách nghe máy: 「はい、〇〇工場です。」', q: 'Bạn mở đầu thế nào?',
            opts: [
              { t: '「おはようございます。〇〇です。体調が悪いので、今日は休ませてください。」', ok: 1, key: 'Chào, nói tên, xin nghỉ: 「体調が悪いので、今日は休ませてください」',
                res: 'Người phụ trách hiểu ngay, hỏi thêm bạn bị sao.', why: 'Chào, nói tên, nói lý do, xin nghỉ: đủ ý, lịch sự.' },
              { t: '「休みます。」', res: 'Người phụ trách chưa hiểu bạn là ai, vì sao nghỉ.', why: 'Quá ngắn, thiếu tên, thiếu lý do. Nghe giống thông báo, không phải xin phép.' },
              { t: 'Nói tiếng Việt thật nhanh, mong người phụ trách đoán ra ý mình', res: 'Người phụ trách không hiểu, phải gọi người hỗ trợ.', why: 'Học sẵn vài câu tiếng Nhật đơn giản để tự báo được.' }
            ] },
          { say: 'Người phụ trách hỏi: 「どうしましたか。」 (Bạn bị sao vậy?)', q: 'Bạn trả lời thế nào?',
            opts: [
              { t: '「夜中からお腹が痛くて、2回吐きました。下痢もあります。」', ok: 1, key: 'Nói rõ dấu hiệu và từ khi nào',
                res: 'Người phụ trách dặn: 「病院に行ってください。」 (Hãy đi khám.)', why: 'Dấu hiệu, từ khi nào, nặng ra sao: người nghe mới biết cần làm gì.' },
              { t: '「ちょっと…」 rồi im lặng', res: 'Người phụ trách không biết bạn bị gì, rất lo.', why: 'Nói không rõ thì người khác không giúp đúng được.' },
              { t: 'Nói thật nặng thêm để chắc chắn được nghỉ, kể cả những dấu hiệu mình không có', res: 'Người phụ trách gọi xe cấp cứu, rồi biết bạn nói quá.', why: 'Nói quá làm mất lòng tin. Nói đúng điều mình đang bị.' }
            ] },
          { say: 'Bạn chưa biết bệnh viện nào gần, lo không đủ tiếng Nhật để nói với bác sĩ.', q: 'Bạn làm gì?',
            opts: [
              { t: 'Hỏi người hỗ trợ đi khám ở đâu; viết sẵn dấu hiệu bằng tiếng Nhật', ok: 1, key: 'Hỏi người hỗ trợ bệnh viện nào; viết sẵn dấu hiệu bằng tiếng Nhật',
                res: 'Bạn tự đi khám, đưa tờ giấy ghi dấu hiệu cho bác sĩ. Chỗ nào chưa rõ, người hỗ trợ dịch qua điện thoại.', why: 'Tự làm được phần mình là chủ động. Người hỗ trợ giúp đúng lúc cần.' },
              { t: 'Không đi khám, tự ra hiệu thuốc mua thuốc uống cho đỡ tốn thời gian chờ', res: 'Chiều đó bạn mệt lả vì mất nước.', why: 'Nôn, tiêu chảy nhiều dễ mất nước. Người phụ trách đã dặn đi khám.' },
              { t: 'Đòi người hỗ trợ đến đưa đi và ngồi cùng cả buổi', res: 'Người hỗ trợ phải bỏ việc của nhiều bạn khác để ngồi chờ cùng bạn.', why: 'Người hỗ trợ lo cho nhiều người. Học câu đơn giản, nhờ dịch qua điện thoại khi cần.' }
            ] },
          { say: 'Bác sĩ nói bạn bị ngộ độc thực phẩm (食中毒), dặn nghỉ 2 ngày.', q: 'Khám xong, bạn làm gì?',
            opts: [
              { t: 'Báo lại: bị gì, nghỉ mấy ngày, khi nào đi làm lại', ok: 1, key: 'Khám xong báo lại: bị gì, nghỉ mấy ngày, khi nào đi làm lại',
                res: 'Chỗ làm biết rõ, xếp lịch cho 2 ngày tới. Bạn yên tâm nghỉ.', why: 'Báo, liên lạc, bàn bạc (Hō-Ren-Sō) gồm cả báo lại kết quả. Chỗ làm cần biết để sắp xếp.' },
              { t: 'Sáng nay đã báo nghỉ rồi, không cần báo thêm gì nữa', res: 'Hôm sau người phụ trách lại phải gọi hỏi bạn có đi làm không.', why: 'Báo nghỉ mới là một nửa. Báo lại kết quả khám mới đủ.' },
              { t: 'Đăng lên mạng xã hội kể bệnh, ai cần biết sẽ tự đọc', res: 'Người phụ trách không đọc, vẫn không biết bạn nghỉ mấy ngày.', why: 'Mạng xã hội không phải kênh báo cáo. Báo trực tiếp người cần biết.' }
            ] }
        ],
        end: 'Báo ốm: báo trước giờ làm, tự mình báo, nói rõ dấu hiệu và từ khi nào. Khám xong báo lại kết quả.' },
      { id: 'y6b', k: 'pick', t: 'Thang 5 mức: mức nào, làm gì?', min: 4, xp: 10, scale: 1,
        rounds: [
          { q: 'Mỏi người, đau lưng nhẹ sau một ngày làm nhiều.',
            opts: [
              { t: 'Tự chăm: ngủ sớm, uống đủ nước, tắm nước ấm', ok: 1, why: 'Đúng rồi! Mức 1: mệt mỏi thường. Tự chăm, nghỉ sớm là đủ.' },
              { t: 'Xin nghỉ làm ngày mai, nhờ người hỗ trợ đưa đi bệnh viện khám ngay', why: 'Mỏi thường thì chưa cần đi viện. Tự chăm, nặng lên mới báo.' },
              { t: 'Gọi 119', why: 'Số 119 để dành cho người nguy hiểm tính mạng.' }
            ] },
          { q: 'Sốt nhẹ 37,5°C, sổ mũi, ho đã 2 ngày.',
            opts: [
              { t: 'Tự chăm thêm, không cần nói với ai', why: 'Bệnh đã kéo dài 2 ngày. Cần cho người hỗ trợ biết, phòng khi nặng lên.' },
              { t: 'Báo người hỗ trợ biết; cần thì đi khám, nhờ dịch qua điện thoại', ok: 1, why: 'Đúng rồi! Mức 2: bệnh nhẹ. Báo để có người biết, đi khám nếu cần.' },
              { t: 'Gọi 119 ngay, rồi báo người phụ trách ở công ty để người phụ trách biết', why: 'Sốt nhẹ, còn tỉnh táo thì không gọi 119.' }
            ] },
          { q: 'Trẹo cổ chân lúc đá bóng, sưng to, đi lại đau.',
            opts: [
              { t: 'Báo người hỗ trợ, cùng xem có cần đi khám; nghỉ, chườm lạnh, kê cao', ok: 1, why: 'Đúng rồi! Mức 3: nặng hơn. Báo người hỗ trợ để cùng quyết định có đi khám không.' },
              { t: 'Tự chăm, mai vẫn đi làm, cố đứng cả ca như thường cho khỏi bị đánh giá', why: 'Sưng to, đi lại đau thì cần báo, nghỉ, có thể phải đi khám.' },
              { t: 'Gọi 119', why: 'Bong gân thường không cần xe cấp cứu. Báo người hỗ trợ để đi khám.' }
            ] },
          { q: 'Sau bữa ăn chung, nôn nhiều lần, tiêu chảy, đau bụng.',
            opts: [
              { t: 'Uống nước, nằm nghỉ ở phòng, đợi sáng mai xem đỡ chưa rồi mới báo người hỗ trợ', why: 'Có thể là ngộ độc thực phẩm, còn lây được. Cần báo ngay, đi khám.' },
              { t: 'Gọi 119 ngay', why: 'Còn tỉnh táo, tự đi được thì báo người hỗ trợ đưa đi khám.' },
              { t: 'Báo ngay người hỗ trợ để đi khám; ở riêng, không dùng chung đồ', ok: 1, why: 'Đúng rồi! Mức 4: bệnh cấp, có thể lây (cúm, ngộ độc thực phẩm, thủy đậu). Báo ngay, đi khám, tránh lây.' }
            ] },
          { q: 'Ngã từ thang ở chỗ làm, tay đau dữ dội, cong lệch.',
            opts: [
              { t: 'Giữ yên tay, báo ngay người phụ trách để đi viện; nặng thì gọi 119', ok: 1, why: 'Đúng rồi! Mức 5: tai nạn, bệnh nặng. Báo ngay, làm theo hướng dẫn của công ty và người hỗ trợ.' },
              { t: 'Băng tạm, làm nốt ca rồi về phòng nghỉ', why: 'Tay cong lệch có thể gãy xương. Không làm tiếp, báo ngay.' },
              { t: 'Tự nắn tay cho thẳng lại rồi băng chặt, mai báo người hỗ trợ cũng được', why: 'Tự nắn làm tổn thương nặng thêm. Giữ yên, báo ngay.' }
            ] }
        ],
        end: 'Không chắc mình ở mức nào: báo người hỗ trợ. Thang 5 mức có trong Sổ tay › Khẩn cấp.' },
      { id: 'y6c', k: 'write', t: 'Tin nhắn báo ốm của mình', min: 4, xp: 15, dyn: 'yte',
        say: 'Viết sẵn một tin nhắn báo ốm. Lúc ốm thật, mệt lắm, chỉ cần sửa vài chữ là gửi được.',
        q: 'Viết tin nhắn báo ốm gửi người phụ trách (tiếng Nhật hoặc tiếng Việt)',
        sub: 'Đủ 4 ý: chào và tên · bị gì, từ khi nào · xin nghỉ hoặc đi muộn · khám xong sẽ báo lại.',
        tips: ['おはようございます。〇〇です。熱が38度あるので、今日は休ませてください。病院に行ってから、また連絡します。', 'Chào anh/chị, em là …. Em bị sốt 38 độ từ tối qua, em xin nghỉ hôm nay. Em đi khám xong sẽ báo lại ạ.'] }
    ],
    gtip: {
      xuong: 'Hỏi ngay ngày đầu: ốm thì gọi ai, số nào, trước mấy giờ.',
      chuyen: 'Dây chuyền thực phẩm: nôn, tiêu chảy, sốt thì phải báo, không vào khu thực phẩm.',
      troi: 'Công trường bắt đầu sớm: báo ốm trước giờ tập trung, không đợi đến giờ làm.',
      dv: 'Kaigo, nhà hàng: ốm thì báo sớm để có người thay, không lây cho người già, cho khách.',
      vp: 'Đi học, làm thêm: báo cả trường và chỗ làm thêm.' } }
];

/* =========================================================
   PHÒNG TEST (khu 'test', phòng 302) · đợt 1: t1–t3 (TC01.1.3) · đợt 2: t4–t6 (TC01.1.4)
   Theo bảng đánh giá lớp GDTC (Chương trình TTS 30 tiết, Bảng 3.2): Dinh dưỡng 20 câu, Sức khỏe & Bệnh lý 20 câu, Cuối khóa 30 câu.
   Mốc Đạt: từ 15/20, từ 25/30 (bảng gốc ghi ngược dấu < >, đã báo thầy).
   Ngân hàng câu Claude soạn từ bài TC01 (s = mã bài để ôn) và Sổ tay sức khỏe 2.0 (ghi chú cuối dòng: Ch. = chương).
   Quy ước: o[0] là đáp án đúng, máy xáo khi hiện. Mỗi câu có ít nhất 1 đáp án sai dài bằng hoặc hơn đáp án đúng.
   Rào chắn: không câu về giảm cân, calo mục tiêu, lịch "thải độc", 50/25/25, thuốc; số liệu chỉ để tham khảo.
   ========================================================= */
var TEST_TXT = {
  khuSay: 'Ở Phòng test, đề giống bài kiểm tra lý thuyết của lớp GDTC. Làm thử bao nhiêu lần cũng được, mỗi lần đề xáo khác. Câu nào chưa đúng, Shin chỉ bài để ôn.',
  qzInfo: '[N] câu · chọn 1 đáp án · không tính giờ', qzMark: 'Mốc Đạt của lớp GDTC: đúng từ [P]/[N] câu.',
  qzSay: 'Đọc kỹ từng câu. Chưa chắc thì chọn đáp án bạn thấy hợp nhất, cuối bài Shin giải thích hết.',
  qzStart: 'Bắt đầu làm bài', qzLast: 'Lần trước', qzBest: 'Tốt nhất', qzTries: 'Số lần làm',
  qzPrev: 'Câu trước', qzNext: 'Câu tiếp', qzSubmit: 'Nộp bài', qzLeft: 'Còn [N] câu chưa chọn. Chạm số câu để quay lại.',
  qzAll: 'Đã chọn đủ [N] câu. Xem lại rồi nộp bài nhé.',
  pass: 'Đạt mốc lớp', fail: 'Chưa đạt mốc lớp',
  passSay: 'Đạt mốc lớp rồi! Xem lại câu chưa đúng để lần sau chắc hơn.',
  failSay: 'Chưa đạt cũng không sao, đây là test thử. Xem lại câu chưa đúng, ôn bài Shin chỉ, rồi làm đề khác nhé.',
  allSay: 'Đúng hết! Bạn nắm bài rất chắc.',
  revH: 'Câu cần xem lại', revYou: 'Bạn chọn:', revOk: 'Đáp án:', revGo: 'Ôn:', again: 'Làm đề khác',
  tfQ: 'Câu này đúng hay sai?', tfYes: 'Đúng', tfNo: 'Sai', tfIs: 'Câu này [V].', tfNext: 'Câu tiếp', tfEnd: 'Xem kết quả',
  tfRes: 'Bạn trả lời đúng [N]/[T] câu.', tfSay: 'Khởi động xong rồi. Giờ làm Test thử để xem mình nắm bài đến đâu nhé.', tfAgain: 'Làm lượt khác',
  rdNone: 'Bạn chưa có câu nào cần ôn. Làm Test thử trước, hoặc ôn nhanh 10 câu ngẫu nhiên.',
  rdHave: 'Bạn có [N] câu từng chọn chưa đúng. Mỗi lượt ôn tối đa 10 câu. Chọn đúng ngay lần đầu thì câu đó rời khỏi danh sách.',
  rdGo: 'Ôn các câu này', rdRand: 'Ôn nhanh 10 câu ngẫu nhiên', rdRetry: 'Thử chọn lại một đáp án khác.',
  rdEnd: 'Đã ôn [N] câu. Đúng ngay lần đầu: [F] câu.', rdLeft: 'Còn [N] câu trong danh sách cần ôn.', rdClear: 'Danh sách câu cần ôn đã trống. Giỏi lắm!',
  nbH: 'Phòng test của mình', nbNone: 'Chưa làm. Vào Phòng test (302) và làm thử một đề.', nbWrong: 'Câu cần ôn'
};

/* Ngân hàng câu Dinh dưỡng (dd) · s = bài để ôn */
var QB = {
  dd: [
    { id: 'dd01', s: 'd1', q: 'Bốn nhóm cần có trong một ngày là gì?', o: ['Tinh bột, đạm, rau, trái cây và sữa', 'Tinh bột, đạm, nước ngọt và bánh kẹo các loại', 'Cơm, mì gói, cà phê, nước tăng lực'], why: 'Bữa chính có tinh bột, đạm, rau. Trái cây, sữa thì trong ngày.' },
    { id: 'dd02', s: 'd1', q: 'Nhóm nào nuôi cơ, giúp cơ thể phục hồi sau giờ làm, giờ tập?', o: ['Đạm: thịt, cá, trứng, đậu phụ', 'Tinh bột: cơm, bánh mì, mì', 'Đồ ngọt: bánh, kẹo, nước ngọt có ga'], why: 'Đạm nuôi cơ. Làm việc nặng, tập nhiều thì cần đủ đạm.' },
    { id: 'dd03', s: 'd1', q: 'Một bữa chính đủ chất cần có gì?', o: ['Tinh bột, đạm và rau', 'Chỉ cần thật nhiều cơm cho no lâu', 'Một ly trà sữa lớn và một cái bánh'], why: 'Nhìn đĩa cơm: có đủ tinh bột, đạm, rau chưa?' },
    { id: 'dd04', s: 'd1', q: 'Rau cho cơ thể điều gì?', o: ['Vitamin và chất xơ', 'Chủ yếu là chất béo', 'Nhiều năng lượng để làm việc nặng'], why: 'Rau cho vitamin, chất xơ. Bữa chính nào cũng nên có rau.' },
    { id: 'dd05', s: 'd1', q: 'Nước ngọt, trà sữa, snack là loại đồ ăn thế nào?', o: ['Nhiều đường hoặc dầu, ít chất: thỉnh thoảng thôi', 'Thuộc nhóm trái cây, sữa: uống mỗi ngày càng tốt', 'Thay được nước lọc và bữa phụ'], why: 'No nhanh, đói nhanh, ít chất. Để làm món thưởng thỉnh thoảng.' },
    { id: 'dd06', s: 'd4', q: 'Mì gói thiếu những gì nhất?', o: ['Đạm và rau', 'Tinh bột', 'Muối và dầu'], why: 'Mì gói chủ yếu là tinh bột và dầu. Thêm trứng, rau thì đủ chất hơn.' },
    { id: 'dd07', s: 'd2', q: 'Bạn nặng 55 kg. Theo cách tính “cân nặng × 0,04 lít”, mỗi ngày cần khoảng bao nhiêu nước?', o: ['Khoảng 2,2 lít', 'Khoảng 0,5 lít', 'Khoảng 5,5 lít'], why: '55 × 0,04 = 2,2 lít. Ngày nóng, ca nặng, giờ tập thì uống thêm.' },
    { id: 'dd08', s: 'd5', q: 'Uống nước thế nào là đúng?', o: ['Uống từng ngụm, chia đều trong ngày, cả khi chưa khát', 'Chờ đến lúc thật khát rồi uống một lần thật nhiều cho đã', 'Uống nước ngọt có ga thay nước lọc cho mát người'], why: 'Chờ khát mới uống là cơ thể đã thiếu nước. Uống dồn một lúc khó hấp thu.' },
    { id: 'dd09', s: 'd5', q: 'Làm ở xưởng lạnh, bạn ít thấy khát. Nên làm gì?', o: ['Vẫn uống nước đều trong giờ nghỉ', 'Không cần uống vì không đổ mồ hôi', 'Uống thật nhiều cà phê nóng cho ấm'], why: 'Trời lạnh vẫn mất nước qua hơi thở, đi vệ sinh. Ít khát không có nghĩa là đủ nước.' },
    { id: 'dd10', s: 'd5', q: 'Trời nóng, làm ngoài trời đổ nhiều mồ hôi. Cần bù gì?', o: ['Cả nước và muối khoáng', 'Chỉ cần nước ngọt có ga thật lạnh', 'Không cần bù, tối về uống một lần'], why: 'Mồ hôi mất cả nước lẫn muối, nên bù cả hai.' },
    { id: 'dd11', s: 'd2', q: 'Chỉ số BMI tính từ những số nào?', o: ['Cân nặng và chiều cao', 'Số giờ ngủ và số bữa ăn mỗi ngày', 'Tuổi và giới tính'], why: 'BMI = cân nặng (kg) chia bình phương chiều cao (m).' },
    { id: 'dd12', s: 'd2', q: 'Điều nào đúng về BMI?', o: ['Không phân biệt cơ và mỡ, chỉ để tham khảo', 'Càng thấp càng tốt cho sức khỏe', 'Cho biết chính xác cơ thể bạn đang khỏe hay yếu'], why: 'Người tập nhiều, cơ nhiều có thể có BMI cao hơn. So với chính mình là chính.' },
    { id: 'dd13', s: 'd4', q: 'Muốn giữ dáng, cách nào đúng?', o: ['Ăn đủ 3 bữa, bớt đồ chiên, nước ngọt, vận động đều', 'Bỏ bữa tối, chỉ uống nước cho nhẹ bụng', 'Uống trà giảm cân mua trên mạng, quảng cáo giảm 5 kg một tuần'], why: 'Nhịn ăn dễ choáng rồi lại ăn bù. Cần giảm cân thì hỏi thầy cô hoặc nhân viên y tế.' },
    { id: 'dd14', s: 'd4', q: 'Không kịp ăn sáng. Cách nào hợp nhất?', o: ['Ăn ổ bánh mì trứng hoặc hộp sữa trước giờ học', 'Uống một ly cà phê sữa đá thật đậm cho tỉnh, trưa ăn bù', 'Nhịn đến trưa, quen dần sẽ hết thấy đói'], why: 'Có chút tinh bột và đạm lót dạ. Cà phê để sau bữa ăn.' },
    { id: 'dd15', s: 'd4', q: 'Uống cà phê lúc bụng còn đói dễ bị gì?', o: ['Cồn cào, đau bụng', 'Ăn ngon miệng hơn', 'Có thêm sức làm việc'], why: 'Bụng rỗng gặp cà phê dễ cồn cào, đau bụng. Ăn trước, uống sau.' },
    { id: 'dd16', s: 'd4', q: 'Tập xong thấy mệt và khát. Uống gì tốt nhất?', o: ['Nước lọc', 'Một lon nước tăng lực', 'Một ly trà sữa thật lớn'], why: 'Sau giờ tập thông thường, nước lọc bù nước tốt nhất.' },
    { id: 'dd17', s: 'd5', q: 'Vì sao không dùng nước tăng lực thay bữa ăn khi làm ca?', o: ['Nhiều đường, caffeine, chỉ tỉnh một lúc', 'Vì nó làm no lâu, không ăn được bữa chính nữa', 'Vì giá đắt hơn một bữa cơm'], why: 'Nước tăng lực không cho đủ năng lượng và chất, còn làm khó ngủ sau ca.' },
    { id: 'dd18', s: 'd5', q: 'Ca đêm từ 22 giờ đến 7 giờ sáng. Ăn thế nào?', o: ['Bữa chính trước ca, giữa ca ăn nhẹ, về không ăn quá no', 'Nhịn cả ca cho tỉnh táo, về phòng ăn một bữa thật no rồi ngủ luôn', 'Uống cà phê, nước tăng lực suốt ca thay bữa'], why: 'Có năng lượng suốt ca. Về ăn nhẹ thì vẫn ngủ được.' },
    { id: 'dd19', s: 'd5', q: 'Ăn trưa quá no, chiều đứng máy buồn ngủ. Nên làm gì?', o: ['Ăn vừa no, đủ cơm, đạm, rau', 'Ăn thật nhiều cơm cho có sức cả chiều', 'Bỏ bữa trưa, ăn bánh ngọt với cà phê'], why: 'Ăn quá no làm người nặng nề. Vừa đủ thì chiều vẫn tỉnh.' },
    { id: 'dd20', s: 'd4', q: 'Ăn tối nên cách giờ đi ngủ bao lâu?', o: ['Ít nhất 3 tiếng', 'Khoảng 30 phút', 'Ăn ngay trước khi ngủ cho đỡ đói'], why: 'Ăn no sát giờ ngủ dễ khó tiêu, khó ngủ. (Sổ tay sức khỏe, Ch.1)' },
    { id: 'dd21', s: 'd5', q: 'Trời lạnh, làm ngoài công trường. Uống rượu cho ấm người trước ca được không?', o: ['Không: rượu làm phản xạ chậm, rất nguy hiểm', 'Được, chỉ một ly nhỏ thôi cho ấm người và tỉnh táo', 'Được, nếu uống cùng bữa sáng'], why: 'Không bao giờ uống rượu bia trước và trong ca làm.' },
    { id: 'dd22', s: 'd6', q: '消費期限 (shōhi kigen) trên bao bì là gì?', o: ['Hạn an toàn: qua ngày là không ăn', 'Hạn ngon nhất: qua vài ngày vẫn ăn được', 'Ngày sản xuất'], why: 'Đồ nhanh hỏng (cơm hộp, bánh mì kẹp, thịt cá tươi) ghi 消費期限.' },
    { id: 'dd23', s: 'd6', q: '賞味期限 (shōmi kigen) trên bao bì là gì?', o: ['Hạn ngon nhất của đồ để lâu', 'Hạn an toàn: qua một ngày là phải bỏ', 'Ngày nhập hàng vào cửa hàng'], why: 'Đồ để lâu (mì ly, đồ hộp). Chưa mở, cất đúng cách thì qua ít ngày vẫn ăn được.' },
    { id: 'dd24', s: 'd6', q: 'Cơm hộp còn hạn nhưng để ngoài tủ lạnh cả ngày. Ăn được không?', o: ['Không nên: hạn chỉ đúng khi cất đúng cách', 'Được, vì vẫn còn hạn ghi trên nắp hộp cơm', 'Được, nếu hâm nóng bằng lò vi sóng'], why: 'Hạn dùng chỉ đúng khi chưa mở và cất đúng cách. Không chắc thì đừng ăn.' },
    { id: 'dd25', s: 'd3', q: 'Trên nhãn Nhật, たんぱく質 là gì?', o: ['Đạm', 'Đường', 'Chất béo'], why: 'たんぱく質 (tanpakushitsu) là đạm.' },
    { id: 'dd26', s: 'd3', q: 'Trên nhãn Nhật, 食塩相当量 cho biết gì?', o: ['Lượng muối', 'Lượng đường', 'Lượng nước'], why: 'Mì ly, canh miso thường khá mặn. Xem dòng này để ăn vừa phải.' },
    { id: 'dd27', s: 'd3', q: 'Nhãn ghi 1個当たり. Các con số tính cho bao nhiêu?', o: ['Cho 1 cái', 'Cho 100 g', 'Cho cả hộp'], why: 'Ăn 2 cái thì nhân đôi các số.' },
    { id: 'dd28', s: 'd6', q: 'Cất thịt sống trong tủ lạnh chung thế nào?', o: ['Bọc kín, để ngăn dưới cùng', 'Để ngăn trên cùng cho dễ lấy', 'Để chung hộp với đồ đã nấu chín'], why: 'Nước thịt sống dễ nhỏ xuống đồ chín bên dưới.' },
    { id: 'dd29', s: 'd6', q: 'Đồ ăn để trong tủ lạnh chung cần ghi gì?', o: ['Tên và ngày cất', 'Chỉ cần ghi giá tiền', 'Không cần ghi gì cả'], why: 'Không biết để bao lâu thì đừng ăn.' },
    { id: 'dd30', s: 'd6', q: 'Vừa cắt thịt sống, giờ cắt đồ đã nấu chín. Dao thớt thế nào?', o: ['Dùng riêng, hoặc rửa sạch trước', 'Dùng luôn, lau sơ bằng khăn là được', 'Không sao, vì đồ chín đã nấu kỹ'], why: 'Vi khuẩn từ thịt sống dễ dính sang đồ chín. (Sổ tay sức khỏe, Ch.2)' },
    { id: 'dd31', s: 'd6', q: 'Thức ăn đã nấu, nhiều giờ sau mới ăn. Làm gì?', o: ['Cất tủ lạnh, đun sôi lại trước khi ăn', 'Để ngoài cả ngày, ăn nguội cho nhanh', 'Đậy nắp, để qua đêm trong phòng là được'], why: 'Để ở nhiệt độ phòng lâu, vi khuẩn phát triển. (Sổ tay sức khỏe, Ch.2)' },
    { id: 'dd32', s: 'd6', q: 'Rửa rau, trái cây thế nào?', o: ['Ngâm nước sạch, rửa kỹ dưới vòi nước chảy', 'Lau bằng khăn ẩm cho sạch đất, không cần nước', 'Rửa qua một lần nước là đủ'], why: 'Rửa kỹ với nước sạch để bớt đất cát, thuốc trừ sâu. (Sổ tay sức khỏe, Ch.2)' },
    { id: 'dd33', s: 'd6', q: 'Hộp cơm mang đi làm cần chú ý gì?', o: ['Nấu chín, để nguội rồi đậy, giữ mát, ăn trong buổi', 'Đậy nắp ngay khi còn nóng, để cạnh máy cho ấm đến trưa', 'Nấu từ hôm trước, để trong túi xách cả đêm'], why: 'Thấy mùi, vị lạ thì bỏ, đừng tiếc.' },
    { id: 'dd34', s: 'd6', q: 'Sáng nay đau bụng, đi ngoài 2 lần sau khi ăn hộp cơm để lâu. Việc đầu tiên?', o: ['Uống nước từng ngụm, nghỉ, báo ngay thầy cô hoặc quản lý', 'Cố đi học như thường, chờ cơn đau tự hết, không nói với ai cho khỏi phiền', 'Xin bạn cùng phòng vài viên thuốc đau bụng'], why: 'Đi ngoài nhiều dễ mất nước. Báo sớm để được hướng dẫn, đưa đi khám nếu cần.' },
    { id: 'dd35', s: 'd3', q: 'Bữa trưa ở konbini, chọn giỏ nào đủ chất?', o: ['Cơm nắm, trứng luộc, salad rau', 'Hai gói snack và một chai nước ngọt lớn', 'Một ly mì cay và bánh ngọt'], why: 'Đủ tinh bột (cơm nắm), đạm (trứng), rau (salad).' },
    { id: 'dd36', s: 'd2', q: 'Cùng 100 g khoai tây, món nào nhiều năng lượng hơn?', o: ['Khoai tây chiên', 'Khoai tây luộc', 'Như nhau, vì cùng là khoai tây'], why: 'Chiên qua dầu thì năng lượng cao hơn nhiều.' }
  ],
  /* Ngân hàng câu Sức khỏe & Bệnh lý (sk) */
  sk: [
    { id: 'sk01', s: 'y1', q: 'Bạn thấy mắt tối sầm, chóng mặt như sắp ngất. Việc đầu tiên?', o: ['Ngồi hoặc nằm xuống ngay tại chỗ', 'Cố đi về phòng y tế để nằm nghỉ', 'Đứng yên, hít thở sâu rồi làm tiếp'], why: 'Còn đứng thì dễ ngã, đập đầu. Xuống thấp ngay là an toàn nhất.' },
    { id: 'sk02', s: 'y1', q: 'Bạn cùng lớp ngất, đã nằm xuống. Tiếp theo làm gì?', o: ['Kê chân cao hơn tim, nới cổ áo, thắt lưng', 'Đỡ bạn ngồi dậy ngay cho mau tỉnh', 'Cho bạn uống thật nhiều nước ngay khi bạn chưa tỉnh hẳn'], why: 'Kê chân cao giúp máu về não. Chưa tỉnh hẳn thì không cho uống, dễ sặc.' },
    { id: 'sk03', s: 'y1', q: 'Người ngất cần gọi 119 khi nào?', o: ['Không thở, hoặc hơn 1 phút chưa tỉnh', 'Ngất 5 giây, tỉnh ngay, nói chuyện rõ', 'Chỉ khi người đó tự xin gọi xe cấp cứu'], why: 'Không chắc thì gọi. Ngã đập đầu chảy máu, đau ngực, khó thở cũng gọi 119.' },
    { id: 'sk04', s: 'y1', q: 'Bạn hay bị choáng, ngất lặp lại nhiều lần. Nên làm gì?', o: ['Báo thầy cô và đi khám', 'Uống cà phê mỗi sáng cho tỉnh', 'Tự khỏi thôi, không cần nói với ai'], why: 'Ăn sáng, ngủ đủ. Ngất lặp lại thì đi khám để biết nguyên nhân.' },
    { id: 'sk05', s: 'y2', q: '熱中症 (nechūshō) nghĩa là gì?', o: ['Say nắng, sốc nhiệt', 'Cảm cúm mùa đông', 'Ngộ độc thực phẩm mùa hè'], why: 'Mùa hè nhiều nơi ở Nhật có cảnh báo 熱中症. Nghe thấy là nhắc mình uống nước, nghỉ bóng mát.' },
    { id: 'sk06', s: 'y2', q: 'Đang làm, bạn thấy đau đầu, chóng mặt vì nóng. Việc đầu tiên?', o: ['Dừng việc, vào chỗ mát, báo người phụ trách', 'Cố làm cho xong phần việc còn lại rồi mới đi nghỉ ngơi', 'Uống một lon nước ngọt lạnh rồi làm tiếp'], why: 'Say nắng nặng lên rất nhanh. Dừng sớm, báo sớm.' },
    { id: 'sk07', s: 'y2', q: 'Làm mát người bị say nắng thế nào?', o: ['Nới đồ, chườm lạnh cổ, nách, bẹn, quạt', 'Đắp chăn kín cho người ra thật nhiều mồ hôi', 'Cho ngồi ngoài nắng, uống nước nóng'], why: 'Chườm lạnh ở cổ, nách, bẹn giúp hạ nhiệt nhanh.' },
    { id: 'sk08', s: 'y2', q: 'Người say nắng lơ mơ, không tự uống được. Làm gì?', o: ['Gọi 119, vẫn tiếp tục làm mát', 'Cố đổ nước vào miệng cho bằng được', 'Để nằm nghỉ một mình cho yên tĩnh'], why: 'Lơ mơ là say nắng nặng. Gọi 119, không ép uống vì dễ sặc.' },
    { id: 'sk09', s: 'y2', q: 'Say nắng có thể xảy ra ở đâu?', o: ['Cả trong xưởng nóng, bếp, nơi kín gió', 'Chỉ khi làm việc ngoài trời vào giữa trưa', 'Chỉ ở những nơi có nắng chiếu thẳng'], why: 'Nóng và ẩm, kín gió thì trong nhà cũng bị say nắng.' },
    { id: 'sk10', s: 'y3', q: 'Bạn bị sốt, sổ mũi. Làm gì để không lây cho bạn cùng phòng?', o: ['Đeo khẩu trang, dùng đồ riêng, mở phòng thoáng', 'Sang phòng bạn thân ngủ nhờ cho có người chăm sóc mình', 'Dùng chung cốc, khăn cho tiện'], why: 'Một người ốm lây cả phòng thì cả chỗ làm thiếu người.' },
    { id: 'sk11', s: 'y3', q: 'Sốt cao 39°C đến nhanh, đau nhức khắp người. Làm gì?', o: ['Báo người hỗ trợ để được đi khám', 'Uống thuốc của bạn rồi đi làm như thường', 'Chờ vài ngày xem có tự khỏi không'], why: 'Có thể là cúm, dễ lây. Báo sớm để đi khám.' },
    { id: 'sk12', s: 'y3', q: 'Sốt cao, khó thở, môi tái, hỏi chỉ trả lời lơ mơ. Làm gì?', o: ['Gọi 119 ngay', 'Nhắn hỏi bạn bè ở Việt Nam nên làm gì', 'Cho ngủ một giấc thật dài rồi tính tiếp'], why: 'Khó thở, lơ mơ là dấu hiệu nguy hiểm tính mạng.' },
    { id: 'sk13', s: 'y3', q: 'Bác sĩ dặn nghỉ 5 ngày. Ngày thứ 3 bạn thấy đỡ. Làm gì?', o: ['Nghỉ đủ ngày bác sĩ dặn', 'Đi làm lại ngay cho khỏi mất lòng công ty', 'Sang phòng khác chơi cho đỡ chán'], why: 'Thấy đỡ chưa chắc đã hết lây. Làm theo lời bác sĩ.' },
    { id: 'sk14', s: 'y3', q: 'Cách đơn giản nhất để phòng cảm cúm lây lan?', o: ['Rửa tay bằng xà phòng thường xuyên', 'Uống thật nhiều nước tăng lực mỗi ngày', 'Ngủ chung chăn cho ấm'], why: 'Rửa tay sạch là cách phòng lây đơn giản, hiệu quả. (Sổ tay sức khỏe, Ch.9)' },
    { id: 'sk15', s: 'y4', q: 'Đá bóng bị trẹo cổ chân. Việc đầu tiên?', o: ['Dừng chơi ngay, ngồi yên, không cố đi', 'Cố chạy tiếp cho đỡ đau', 'Xoa bóp thật mạnh chỗ sưng cho tan máu bầm'], why: 'Cố đi tiếp làm chấn thương nặng thêm.' },
    { id: 'sk16', s: 'y4', q: 'Chườm lạnh chỗ bong gân thế nào?', o: ['Đá bọc khăn, mỗi lần khoảng 15–20 phút', 'Áp đá trực tiếp lên da thật lâu, càng lạnh càng nhanh khỏi', 'Chườm nóng ngay cho máu lưu thông'], why: 'Bọc khăn để không bỏng lạnh. Chườm lạnh giúp đỡ sưng, đỡ đau.' },
    { id: 'sk17', s: 'y4', q: 'Xử lý bong gân theo thứ tự nào?', o: ['Nghỉ – Lạnh – Ép – Kê cao', 'Xoa bóp – Chườm nóng – Đi lại', 'Băng thật chặt – Chạy tiếp'], why: 'Dừng, chườm lạnh, băng ép vừa chặt, kê chân cao hơn tim.' },
    { id: 'sk18', s: 'y4', q: 'Băng ép xong, ngón chân tê và tím. Làm gì?', o: ['Nới băng ra', 'Băng chặt thêm cho chắc', 'Kệ, lát sẽ tự hết'], why: 'Băng quá chặt làm máu khó lưu thông. Băng ép vừa chặt thôi.' },
    { id: 'sk19', s: 'y4', q: 'Bị trầy chân, vết thương dính đất cát. Làm gì?', o: ['Rửa bằng nước sạch cho hết đất cát, che băng sạch', 'Để hở cho mau khô, không cần rửa vì rửa nước dễ nhiễm trùng', 'Bôi kem đánh răng lên cho mát'], why: 'Đất cát còn trong vết thương dễ làm nhiễm trùng.' },
    { id: 'sk20', s: 'y4', q: 'Dấu hiệu nào cho thấy vết thương cần đi khám?', o: ['Đỏ lan, sưng nóng, có mủ, sốt', 'Đóng vảy khô, hơi ngứa khi đang lành', 'Hơi đau trong ngày đầu'], why: 'Đây là dấu hiệu nhiễm trùng. Báo sớm, đi khám.' },
    { id: 'sk21', s: 'y5', q: 'Đau lưng kèm dấu hiệu nào thì cần đi khám?', o: ['Tê lan xuống chân, yếu chân, đau sau té ngã', 'Mỏi lưng nhẹ sau một ngày làm nhiều, nghỉ thì đỡ dần', 'Hơi cứng lưng lúc mới ngủ dậy'], why: 'Mỏi thường thì nghỉ, giãn nhẹ. Tê, yếu chân, đau sau té ngã thì đi khám.' },
    { id: 'sk22', s: 'y5', q: 'Lưng đang đau nhiều. Nên làm gì?', o: ['Chưa tự tập, cử động nhẹ trong mức không đau, báo người phụ trách', 'Tập thật nhiều động tác lưng bụng ngay hôm đó cho cơ lưng quen dần với cơn đau', 'Cố làm như thường, không nói với ai'], why: 'Đau nhiều thì báo trước giờ làm, xin việc nhẹ hơn.' },
    { id: 'sk23', s: 'n3', q: 'Nhấc thùng hàng từ dưới sàn lên thế nào?', o: ['Hạ hông, gập gối, giữ vật sát người', 'Đứng thẳng hai chân, cúi gập lưng rồi xoay người nhấc lên', 'Gập lưng cúi xuống, nhấc thật nhanh'], why: 'Dùng sức chân, giữ lưng thẳng, không xoay vặn lưng.' },
    { id: 'sk24', s: 'n3', q: 'Vật quá nặng so với sức mình. Làm gì?', o: ['Nhờ người cùng bê hoặc dùng xe đẩy', 'Cố bê một mình cho nhanh, khỏi làm phiền người khác', 'Kéo lê vật trên sàn'], why: 'Cố một mình dễ đau lưng, dễ tai nạn.' },
    { id: 'sk25', s: 'y5', q: 'Xem điện thoại thế nào để đỡ mỏi cổ?', o: ['Đưa máy lên ngang mắt, cứ 20 phút ngẩng lên giãn cổ', 'Cúi thấp đầu xuống xem cho đỡ mỏi tay, xem liền nhiều giờ', 'Nằm nghiêng xem cả tối'], why: 'Cúi cổ lâu làm cổ, vai mỏi.' },
    { id: 'sk26', s: 'y6', q: 'Ốm, không đi làm được. Báo lúc nào?', o: ['Trước giờ vào ca', 'Sau khi ca đã bắt đầu', 'Hôm sau đi làm lại mới báo'], why: 'Báo trước giờ làm để chỗ làm kịp sắp xếp người thay.' },
    { id: 'sk27', s: 'y6', q: 'Tin nhắn báo ốm cần có gì?', o: ['Bị gì, từ khi nào, xin nghỉ, khám xong báo lại', 'Một lời xin lỗi thật dài và lễ phép, không cần nói mình bị gì', 'Chỉ cần ghi “Em mệt, em nghỉ”'], why: 'Nói rõ thì người nhận biết bạn nặng hay nhẹ, giúp được gì.' },
    { id: 'sk28', s: 'y6', q: '「体調が悪いので、今日は休ませてください」 nghĩa là gì?', o: ['Tôi không khỏe, xin cho tôi nghỉ hôm nay', 'Tôi sẽ đến muộn khoảng 30 phút vào sáng hôm nay', 'Tôi muốn đổi ca làm vào ngày mai'], why: 'Câu xin nghỉ ốm lịch sự, dùng được khi gọi điện hoặc nhắn tin.' },
    { id: 'sk29', s: 'y1', q: 'Ở Nhật, số gọi xe cấp cứu là số nào?', o: ['119', '110', '113'], why: '119 là cấp cứu, cứu hỏa. 110 là cảnh sát.' },
    { id: 'sk30', s: 'y1', q: 'Gọi 119, người trực hỏi 「火事ですか、救急ですか」. Bạn cần xe cấp cứu thì trả lời gì?', o: ['救急です', '火事です', 'わかりません'], why: '救急です (kyūkyū desu): Tôi cần cấp cứu. Xem Sổ tay › Khẩn cấp.' },
    { id: 'sk31', s: 'y6', q: 'Nôn, tiêu chảy sau bữa ăn chung. Theo Thang 5 mức, đây là mức nào?', o: ['Bệnh cấp, dễ lây: báo ngay, ở riêng', 'Mệt mỏi thường: tự nghỉ ở phòng, không cần báo', 'Bệnh nhẹ: đợi vài ngày rồi báo'], why: 'Có thể là ngộ độc thực phẩm, còn lây được. Báo ngay để đi khám.' },
    { id: 'sk32', s: 'y6', q: 'Không chắc mình ốm ở mức nào. Làm gì?', o: ['Báo người hỗ trợ', 'Tự mua thuốc theo lời quảng cáo về uống', 'Chờ thêm vài ngày'], why: 'Báo sớm để có người cùng xem có cần đi khám không.' },
    { id: 'sk33', s: 'b1', q: 'Khởi động trước khi tập để làm gì?', o: ['Làm ấm khớp và tim, giảm chấn thương', 'Không cần thiết, vì người còn trẻ khỏe thì cơ đã sẵn sàng', 'Cho mệt trước để tập nhẹ hơn'], why: 'Không khởi động là nguyên nhân lớn gây đau cơ, chấn thương. (Sổ tay sức khỏe, Ch.7)' },
    { id: 'sk34', s: 'b2', q: 'Đang tập thử, bạn thấy đau (không phải mỏi). Làm gì?', o: ['Dừng lại, báo thầy cô', 'Cố thêm vài cái cho cơ quen dần', 'Uống thuốc giảm đau rồi tập tiếp'], why: 'Đau là tín hiệu cơ thể cần dừng. Mỏi thì nghỉ rồi tập tiếp.' },
    { id: 'sk35', s: 'b6', q: 'Dấu hiệu nào cho thấy đang tập quá sức?', o: ['Mệt suốt ngày, đau cơ dai dẳng, khó ngủ', 'Ngủ ngon hơn, ăn ngon hơn, người khỏe khoắn cả ngày', 'Hơi thở nhanh khi đang tập'], why: 'Tập quá sức thì cơ không kịp hồi phục. Giảm bớt, nghỉ đủ. (Sổ tay sức khỏe, Ch.7)' },
    { id: 'sk36', s: 'b6', q: 'Hôm sau buổi tập đầu tiên, cơ hơi đau nhức. Thường là sao?', o: ['Thường gặp, vài ngày sẽ đỡ; giãn cơ, tập nhẹ lại', 'Là đã bị chấn thương nặng, phải nghỉ tập hẳn cả tháng', 'Phải tập gấp đôi cho cơ quen'], why: 'Đau nhức nhẹ sau buổi tập mới thường tự đỡ. Đau nhiều, sưng thì báo thầy cô. (Sổ tay sức khỏe, Ch.7)' },
    { id: 'sk37', s: 'b6', q: 'Người trưởng thành nên ngủ khoảng bao lâu mỗi đêm?', o: ['7–8 tiếng', '4–5 tiếng là đủ nếu uống cà phê', '12 tiếng trở lên'], why: 'Ngủ đủ, ngủ sâu giúp cơ thể hồi sức. (Sổ tay sức khỏe, Ch.3)' },
    { id: 'sk38', s: 'b6', q: 'Làm gì để dễ ngủ sâu hơn?', o: ['Tắt đèn, cất điện thoại, tắm nước ấm trước khi ngủ', 'Nằm lướt điện thoại trong bóng tối đến khi thật buồn ngủ thì thôi', 'Uống cà phê buổi tối cho đỡ mệt'], why: 'Ánh sáng làm não khó nghỉ. (Sổ tay sức khỏe, Ch.3)' }
  ]
};

/* Câu Đúng/Sai (phản hồi ngay) · v: 1 đúng, 0 sai */
var QTF = {
  dd: [
    { id: 'td01', s: 'd5', t: 'Chờ khát rồi mới uống nước là đủ.', v: 0, why: 'Khát là cơ thể đã thiếu nước. Uống từng ngụm, đều trong ngày.' },
    { id: 'td02', s: 'd5', t: 'Làm ở nơi lạnh vẫn cần uống nước đều.', v: 1, why: 'Trời lạnh vẫn mất nước qua hơi thở, đi vệ sinh.' },
    { id: 'td03', s: 'd4', t: 'Nhịn ăn là cách giữ dáng an toàn.', v: 0, why: 'Nhịn ăn dễ choáng, rồi lại ăn bù nhiều hơn.' },
    { id: 'td04', s: 'd1', t: 'Bữa chính nên có tinh bột, đạm và rau.', v: 1, why: 'Đủ ba nhóm này là bữa chính tốt.' },
    { id: 'td05', s: 'd5', t: 'Làm ca đêm, nước tăng lực thay được bữa ăn.', v: 0, why: 'Chỉ tỉnh một lúc, cơ thể vẫn thiếu năng lượng.' },
    { id: 'td06', s: 'd6', t: '消費期限 đã qua 1 ngày, ngửi không có mùi lạ thì vẫn ăn được.', v: 0, why: '消費期限 là hạn an toàn. Qua ngày là không ăn.' },
    { id: 'td07', s: 'd6', t: '賞味期限 là hạn ngon nhất, không phải hạn an toàn.', v: 1, why: 'Chưa mở, cất đúng cách thì qua ít ngày vẫn ăn được.' },
    { id: 'td08', s: 'd6', t: 'Thịt sống nên bọc kín, để ngăn dưới cùng tủ lạnh.', v: 1, why: 'Để nước thịt không nhỏ xuống đồ khác.' },
    { id: 'td09', s: 'd4', t: 'Một gói mì là đủ chất cho một bữa chính.', v: 0, why: 'Mì gói ít đạm, ít rau. Thêm trứng, rau nhé.' },
    { id: 'td10', s: 'd4', t: 'Uống cà phê lúc bụng rỗng dễ cồn cào, đau bụng.', v: 1, why: 'Ăn trước, uống cà phê sau.' },
    { id: 'td11', s: 'd2', t: 'Đồ chiên nhiều năng lượng hơn đồ luộc cùng loại.', v: 1, why: 'Dầu chiên làm năng lượng tăng nhiều.' },
    { id: 'td12', s: 'd6', t: 'Thức ăn đã nấu, đậy nắp để ngoài cả ngày vẫn an toàn.', v: 0, why: 'Để lâu ở nhiệt độ phòng, vi khuẩn phát triển. Cất tủ lạnh.' },
    { id: 'td13', s: 'd2', t: 'BMI phân biệt được cơ và mỡ.', v: 0, why: 'BMI không phân biệt cơ và mỡ, chỉ để tham khảo.' },
    { id: 'td14', s: 'd5', t: 'Uống rượu trước ca làm giúp ấm người, an toàn hơn.', v: 0, why: 'Rượu làm phản xạ chậm, rất nguy hiểm khi làm việc.' },
    { id: 'td15', s: 'd4', t: 'Ăn thật no ngay trước khi ngủ giúp ngủ ngon hơn.', v: 0, why: 'Ăn no sát giờ ngủ dễ khó tiêu, khó ngủ.' },
    { id: 'td16', s: 'd6', t: 'Đồ ăn trong tủ lạnh chung nên ghi tên và ngày cất.', v: 1, why: 'Biết đã để bao lâu thì mới biết còn ăn được không.' }
  ],
  sk: [
    { id: 'ts01', s: 'y1', t: 'Sắp ngất thì nên cố đứng dậy đi lại cho tỉnh.', v: 0, why: 'Ngồi hoặc nằm xuống ngay để không ngã.' },
    { id: 'ts02', s: 'y1', t: 'Người ngất không thở: gọi 119 ngay.', v: 1, why: 'Không thở, hoặc hơn 1 phút chưa tỉnh: gọi 119.' },
    { id: 'ts03', s: 'y2', t: 'Say nắng chỉ xảy ra khi làm ngoài trời.', v: 0, why: 'Xưởng nóng, bếp, nơi kín gió cũng dễ bị.' },
    { id: 'ts04', s: 'y2', t: 'Say nắng mà lơ mơ, không tự uống được là dấu hiệu nặng.', v: 1, why: 'Gọi 119, vẫn tiếp tục làm mát.' },
    { id: 'ts05', s: 'y4', t: 'Bong gân thì chườm nóng ngay cho mau khỏi.', v: 0, why: 'Chườm lạnh: đá bọc khăn, mỗi lần khoảng 15–20 phút.' },
    { id: 'ts06', s: 'y4', t: 'Vết trầy nhỏ cũng nên rửa sạch và che băng.', v: 1, why: 'Giấu đi, để bẩn thì chuyện nhỏ thành chuyện lớn.' },
    { id: 'ts07', s: 'y3', t: 'Đang sốt nên sang phòng bạn ngủ cho có người chăm.', v: 0, why: 'Dễ lây cho bạn. Ở phòng mình, đeo khẩu trang, báo người hỗ trợ.' },
    { id: 'ts08', s: 'y5', t: 'Đau lưng kèm tê lan xuống chân thì nên đi khám.', v: 1, why: 'Tê, yếu chân, đau sau té ngã: đi khám.' },
    { id: 'ts09', s: 'n3', t: 'Nâng vật nặng: gập lưng đỡ tốn sức hơn gập gối.', v: 0, why: 'Hạ hông, gập gối, giữ lưng thẳng để bảo vệ lưng.' },
    { id: 'ts10', s: 'y6', t: 'Ốm không đi làm được thì báo trước giờ vào ca.', v: 1, why: 'Để chỗ làm kịp sắp xếp người thay.' },
    { id: 'ts11', s: 'y1', t: '110 là số gọi xe cấp cứu ở Nhật.', v: 0, why: '119 là cấp cứu, cứu hỏa. 110 là cảnh sát.' },
    { id: 'ts12', s: 'b1', t: 'Khởi động giúp giảm chấn thương khi tập.', v: 1, why: 'Làm ấm khớp và tim trước khi tập.' },
    { id: 'ts13', s: 'b2', t: 'Tập thấy đau (không phải mỏi) thì cố thêm cho quen.', v: 0, why: 'Đau thì dừng lại, báo thầy cô.' },
    { id: 'ts14', s: 'b6', t: 'Ngủ đủ giấc giúp cơ thể hồi sức sau ngày làm việc.', v: 1, why: 'Người trưởng thành nên ngủ khoảng 7–8 tiếng.' },
    { id: 'ts15', s: 'y6', t: 'Không chắc mình ốm ở mức nào thì cứ chờ thêm vài ngày.', v: 0, why: 'Báo người hỗ trợ để cùng xem có cần đi khám không.' },
    { id: 'ts16', s: 'y3', t: 'Rửa tay bằng xà phòng giúp phòng cảm cúm lây lan.', v: 1, why: 'Cách phòng lây đơn giản, làm được mỗi ngày.' }
  ]
};

/* ---------- tự test thể lực (t4, t5) · TC01.1.4 ----------
   Mốc Đạt theo Chương trình TTS 30 tiết, Bảng 3.1 (dòng "Đạt"; bảng gốc ghi ngược dấu "<=", app hiểu là "từ … trở lên"). Chờ GV GDTC xác nhận.
   Sức bền chưa có trong Bảng 3.1: dùng thang Yếu · Trung bình · Tốt của MOC (Sổ quản lý v10.1).
   ex: động tác trong EX (hình, 3 điểm chính); {nam, nu} nếu khác theo mốc · u: 'rep' đếm cái | 's' giây liên tục · dat: mốc Đạt · lad: dùng thang MOC */
var FT = {
  push:  { n: 'Hít đất', ex: { nam: 'pushup', nu: 'kneepush' }, u: 'rep', dat: { nam: 35, nu: 30 }, nuN: 'Hít đất khuỵu gối' },
  plank: { n: 'Plank', ex: 'plank', u: 's', dat: { nam: 180, nu: 90 } },
  squat: { n: 'Squat', ex: 'squat', u: 'rep', dat: { nam: 100, nu: 80 } },
  push2: { n: 'Hít đất (nâng cao)', ex: 'pushup', u: 'rep', dat: { nam: 40, nu: 25 } },
  abs2:  { n: 'Gập bụng nâng cao', ex: 'legraise', u: 'rep', dat: { nam: 50, nu: 40 } },
  sq1:   { n: 'Squat 1 chân', ex: '', u: 'rep', dat: { nam: 20, nu: 15 }, how: 'Làm và đếm theo đúng cách thầy cô GDTC dạy trên lớp. Chưa chắc cách làm thì bỏ qua bài này, hỏi thầy cô trước.' },
  sqw:   { n: 'Squat bình nước', ex: '', u: 'rep', dat: { nam: 80, nu: 50 }, how: 'Cầm bình nước theo cách thầy cô GDTC dạy trên lớp. Lưng thẳng, gối hướng theo mũi chân. Chưa chắc thì bỏ qua, hỏi thầy cô trước.' },
  knee:  { n: 'Nâng cao đùi', ex: 'kneehigh', u: 's', lad: 1 },
  jj:    { n: 'Jumping jack', ex: 'jj', u: 's', lad: 1 }
};
var FT_LV = { cb: 'Cơ bản', nc: 'Nâng cao', sb: 'Sức bền' };
var FT_TXT = {
  inSay: 'Khởi động xong chưa? Làm từng bài, mỗi bài làm liên tục đến khi hết sức hoặc sai tư thế. Giữa hai bài nghỉ khoảng 2 phút.',
  inSrc: 'Mốc Đạt của lớp GDTC (Bảng thành tích, mốc [S]). Chỉ để tham khảo, so với chính mình là chính.',
  ladSrc: 'Thang của Sổ quản lý học tập GDTC (mốc [S]). Chỉ để tham khảo, so với chính mình là chính.',
  go: 'Bắt đầu test', warm: 'Xem khởi động',
  rep: 'Mỗi cái đúng tư thế, chạm vào nút tròn. Hoặc nhập số ở dưới.', sec: 'Bấm Bắt đầu rồi vào tư thế. Chậm hẳn, sai tư thế hoặc phải dừng thì bấm Dừng.',
  sDone: 'Xong bài này', sSkip: 'Bỏ qua bài này',
  dat: 'Đạt mốc lớp', near: 'Còn [N] nữa tới mốc', last: 'Lần trước', skip: 'Đã bỏ qua',
  rest: 'Nghỉ khoảng 2 phút, đi lại nhẹ, uống vài ngụm nước.', restGo: 'Làm bài tiếp', toEnd: 'Xem kết quả',
  sumH: 'Kết quả buổi test', feelQ: 'Sau buổi test, bạn thấy thế nào?',
  sumSay: 'Kết quả đã vào Bảng thành tích (bài 6). Lần sau test lại để so với chính mình nhé.',
  again: 'Test lại từ đầu', noData: 'Bạn chưa làm bài nào. Thử ít nhất một bài, hoặc bỏ qua nếu thấy đau.',
  bdNone: 'Bạn chưa có kết quả test nào. Làm Test Cơ bản (bài 4) hoặc Test sức bền (bài 5) trước nhé.',
  bdSay: 'Đây là thẻ thành tích của <b class="nm">[Tên]</b>. Chụp màn hình thẻ này gửi thầy cô GDTC nhé.',
  bdShot: 'Chụp màn hình thẻ này để gửi thầy cô.', bdUp: 'Tăng so với lần trước', bdBest: 'Tốt nhất',
  bdH: 'Thẻ thành tích', bdGoal: 'Mục tiêu lần tới', bdTests: 'Số buổi test',
  nbH: 'Thể lực tự test', nbNone: 'Chưa test. Vào Phòng test › Tự test sức mạnh.'
};

/* 6 bài của Phòng test. quiz: bank, n câu, pass mốc Đạt · tf: bank, n câu · redo: ôn câu đã sai (S.test.w) */
var BAI_TEST = [
  { id: 't1', t: 'Test thử Dinh dưỡng', ic: 'bowl', sub: '20 câu như đề lớp GDTC, làm lại thoải mái', min: 14,
    acts: [
      { id: 't1a', k: 'tf', t: 'Khởi động: Đúng hay sai?', min: 3, xp: 10, bank: 'dd', n: 10 },
      { id: 't1b', k: 'quiz', t: 'Test thử Dinh dưỡng 20 câu', min: 10, xp: 20, bank: 'dd', n: 20, pass: 15 }
    ],
    gtip: {
      xuong: 'Xưởng nóng: câu về nước và muối khoáng là chuyện hằng ngày của bạn.',
      chuyen: 'Dây chuyền thực phẩm: để ý các câu về hạn dùng, tủ lạnh, dao thớt.',
      troi: 'Ngoài trời: để ý các câu về bù nước, ăn sáng trước ca sớm.',
      dv: 'Ca nhà hàng, kaigo hay lệch giờ ăn: để ý các câu về ăn theo ca.',
      vp: 'Ngồi nhiều: để ý các câu về đồ ngọt, nước ngọt, ăn vừa no.' } },
  { id: 't2', t: 'Test thử Sức khỏe & Bệnh lý', ic: 'cross', sub: '20 câu: sơ cứu, ốm đau, báo ốm, tập an toàn', min: 14,
    acts: [
      { id: 't2a', k: 'tf', t: 'Khởi động: Đúng hay sai?', min: 3, xp: 10, bank: 'sk', n: 10 },
      { id: 't2b', k: 'quiz', t: 'Test thử Sức khỏe & Bệnh lý 20 câu', min: 10, xp: 20, bank: 'sk', n: 20, pass: 15 }
    ],
    gtip: {
      xuong: 'Nhà xưởng: để ý các câu về say nắng trong xưởng, nâng vật đúng.',
      chuyen: 'Dây chuyền: để ý các câu về báo ốm, nôn, tiêu chảy (không vào khu thực phẩm).',
      troi: 'Ngoài trời: để ý các câu về say nắng, bong gân, trầy xước.',
      dv: 'Kaigo, nhà hàng: để ý các câu về không lây bệnh, đau lưng.',
      vp: 'Ngồi nhiều: để ý các câu về cổ, vai, giấc ngủ.' } },
  { id: 't3', t: 'Test tổng', ic: 'gauge', sub: '30 câu cả hai phần, ôn lại câu đã sai', min: 20,
    acts: [
      { id: 't3a', k: 'quiz', t: 'Test tổng 30 câu', min: 15, xp: 30, bank: 'mix', n: 30, pass: 25 },
      { id: 't3b', k: 'redo', t: 'Ôn lại câu đã sai', min: 5, xp: 15, n: 10 }
    ],
    gtip: {} },
  { id: 't4', t: 'Tự test sức mạnh', ic: 'arm', sub: 'Hít đất, plank, squat theo bảng lớp GDTC', min: 15,
    acts: [
      { id: 't4a', k: 'pick', t: 'Tự test sao cho đúng', min: 3, xp: 10,
        rounds: [
          { q: 'Sắp tự test hít đất, plank, squat. Việc đầu tiên bạn làm là gì?',
            opts: [
              { t: 'Làm ngay khi cơ còn khỏe để được số cao nhất', why: 'Cơ còn lạnh mà dồn hết sức ngay thì dễ chấn thương.' },
              { t: 'Khởi động khoảng 10 phút cho ấm khớp và tim', ok: 1, why: 'Đúng rồi! Cơ ấm thì làm được nhiều hơn và ít đau hơn.' },
              { t: 'Uống thật nhiều nước cho no rồi mới bắt đầu test', why: 'Uống vài ngụm là đủ. Bụng quá no thì khó thở khi tập.' }
            ] },
          { q: 'Đang hít đất, đến cái thứ 18 thì hông bắt đầu võng xuống. Bạn đếm thế nào?',
            opts: [
              { t: 'Dừng lại, chỉ tính những cái làm đúng tư thế', ok: 1, why: 'Đúng rồi! Số đúng tư thế mới là sức thật của bạn.' },
              { t: 'Cố làm tiếp cho đủ mốc, sai một chút cũng tính', why: 'Đếm cả cái sai thì số đẹp mà sức không tăng, lại dễ đau lưng.' },
              { t: 'Nằm nghỉ trên sàn một lúc rồi làm tiếp, cộng dồn', why: 'Test là làm liên tục. Nghỉ giữa chừng thì số không còn đúng.' }
            ] },
          { q: 'Đang plank thì thấy đau nhói ở lưng dưới. Bạn làm gì?',
            opts: [
              { t: 'Cắn răng giữ thêm cho bằng thời gian lần trước', why: 'Đau nhói là dấu hiệu phải dừng. Cố thêm dễ bị nặng hơn.' },
              { t: 'Dừng ngay, nghỉ, ghi lại và báo thầy cô GDTC', ok: 1, why: 'Đúng rồi! Kết quả để lần sau. Lưng của bạn quan trọng hơn.' },
              { t: 'Đổi sang squat để test tiếp cho xong buổi', why: 'Đang đau thì dừng cả buổi, hỏi thầy cô trước khi tập lại.' }
            ] }
        ],
        end: 'Ba điều nhớ khi tự test: khởi động trước, chỉ đếm cái đúng, đau thì dừng.' },
      { id: 't4b', k: 'ft', t: 'Test Cơ bản: hít đất, plank, squat', min: 6, xp: 20, lv: 'cb', items: ['push', 'plank', 'squat'] },
      { id: 't4c', k: 'ft', t: 'Test Nâng cao', min: 6, xp: 20, lv: 'nc', items: ['push2', 'abs2', 'sq1', 'sqw'], note: 'Nên làm khi đã gần đạt mốc Cơ bản. Squat 1 chân và squat bình nước: làm đúng cách thầy cô GDTC dạy trên lớp.' }
    ],
    gtip: {
      xuong: 'Nhà xưởng hay bê, đẩy hàng: tay, vai, lưng khỏe thì làm ca nhẹ hơn.',
      chuyen: 'Đứng dây chuyền cả ca: bụng và chân khỏe giúp đứng lâu ít mỏi.',
      troi: 'Ngoài trời mang vác nhiều: chân, lưng, bụng là ba chỗ cần khỏe nhất.',
      dv: 'Kaigo, nhà hàng: đỡ người, bưng bê cần chân và lưng khỏe.',
      vp: 'Ngồi nhiều: test để biết sức mình, rồi tập đều mỗi tuần.' } },
  { id: 't5', t: 'Tự test sức bền', ic: 'heart', sub: 'Nâng cao đùi, jumping jack', min: 9,
    acts: [
      { id: 't5a', k: 'ft', t: 'Test nâng cao đùi, jumping jack', min: 5, xp: 20, lv: 'sb', items: ['knee', 'jj'] },
      { id: 't5b', k: 'pick', t: 'Tăng sức bền an toàn', min: 3, xp: 10,
        rounds: [
          { q: 'Lần này bạn nâng cao đùi được 40 giây. Bạn muốn lên 60 giây. Bạn tập thế nào?',
            opts: [
              { t: 'Tập 3–4 buổi mỗi tuần, mỗi tuần thêm vài giây', ok: 1, why: 'Đúng rồi! Tăng chậm, đều đặn thì tim và chân quen dần.' },
              { t: 'Ngày nào cũng tập hết sức cho đến khi đủ 60 giây', why: 'Ngày nào cũng hết sức thì cơ không kịp hồi, dễ mệt, dễ đau.' },
              { t: 'Chờ hôm nào thấy khỏe thì thử lại một lần', why: 'Không tập thì sức bền không tăng. Cần tập đều mỗi tuần.' }
            ] },
          { q: 'Vừa test jumping jack xong, bạn thở dốc, tim đập nhanh. Bạn làm gì?',
            opts: [
              { t: 'Nằm xuống sàn ngay và uống một chai nước lạnh', why: 'Dừng đột ngột dễ choáng. Uống từng ngụm nhỏ thôi.' },
              { t: 'Đi bộ chậm, thở đều cho đến khi hơi thở dịu lại', ok: 1, why: 'Đúng rồi! Đi chậm vài phút giúp tim chậm lại từ từ.' },
              { t: 'Test ngay bài tiếp theo luôn để tim quen dần với mệt', why: 'Nghỉ đủ rồi mới làm bài tiếp. Mệt chồng mệt dễ chấn thương.' }
            ] },
          { q: 'Đang test, bạn thấy choáng, tức ngực, khó thở hơn bình thường. Bạn làm gì?',
            opts: [
              { t: 'Dừng ngay, ngồi xuống nghỉ và báo thầy cô hoặc bạn bên cạnh', ok: 1, why: 'Đúng rồi! Đây là dấu hiệu phải dừng. Xem lại bài Choáng, sắp ngất ở Phòng y tế.' },
              { t: 'Chậm lại một chút rồi cố làm cho hết thời gian của bài test', why: 'Choáng, tức ngực thì không cố. Dừng và báo người bên cạnh ngay.' },
              { t: 'Không nói với ai để khỏi làm mọi người lo lắng', why: 'Báo ngay để có người giúp. Đó là việc đúng, không phải làm phiền.' }
            ] }
        ],
        end: 'Sức bền tăng nhờ tập đều, tăng chậm. Mệt thì đi chậm, choáng thì dừng.' }
    ],
    gtip: {
      xuong: 'Ca 8 tiếng đứng máy: sức bền giúp cuối ca vẫn tỉnh táo, làm chắc tay.',
      chuyen: 'Dây chuyền chạy đều cả ca: sức bền giúp bạn theo kịp nhịp chuyền.',
      troi: 'Ngoài trời nóng, lạnh, đi lại nhiều: sức bền là thứ dùng hằng ngày.',
      dv: 'Đi lại, lên xuống cầu thang cả ngày: sức bền giúp ít mỏi chân.',
      vp: 'Đi học, làm thêm: sức bền giúp bạn khỏe cả ngày dài.' } },
  { id: 't6', t: 'Bảng thành tích', ic: 'stamp', sub: 'So với lần trước, gửi ảnh cho thầy cô', min: 6,
    acts: [
      { id: 't6a', k: 'board', t: 'Thẻ thành tích của mình', min: 3, xp: 10 },
      { id: 't6b', k: 'write', t: 'Mục tiêu lần test tới', min: 3, xp: 10, dyn: 'ft',
        say: 'Nhìn bảng thành tích rồi chọn một bài để cải thiện. Mục tiêu nhỏ, cụ thể là dễ đạt nhất.',
        q: 'Lần test tới, bạn muốn tăng bài nào, tăng bao nhiêu?',
        sub: 'Viết một câu cho chính bạn. Viết từ 10 chữ trở lên được thêm Insight.',
        tips: ['Lần tới mình sẽ hít đất thêm 3 cái, giữ lưng thẳng', 'Lần tới mình sẽ plank lâu hơn 15 giây', 'Mỗi tuần mình sẽ tập squat 3 buổi'] }
    ],
    gtip: {} }

];

/* ---------- bản demo giáo viên ---------- */
/* =========================================================
   RADIO TAISO DECK (TC01.1.5) · Radio Taiso số 1 (ラジオ体操第一), 13 động tác
   Tên 13 động tác theo Viện Khoa học Tuổi thọ Nhật Bản (tyojyu.or.jp). Hình nhìn thẳng, lật như soi gương.
   Nhạc thật: mở video TC_RADIO. Trong app chỉ có tiếng đếm nhịp (không nhúng nhạc vì bản quyền).
   n8 = số lần 8 nhịp mỗi động tác khi tập theo nhịp trong app (GV GDTC kiểm, sửa số ở đây).
   ========================================================= */
var RT = [
  { n: 'Vươn người', j: '伸びの運動', k: 'のびのうんどう', n8: 2, cue: 'Tay lên cao, vươn hết cỡ' },
  { n: 'Vung tay, nhún gối', j: '腕を振って脚を曲げ伸ばす運動', k: 'うでをふってあしをまげのばすうんどう', n8: 2, cue: 'Nhún gối, tay vung chéo rồi mở' },
  { n: 'Xoay tay', j: '腕を回す運動', k: 'うでをまわすうんどう', n8: 2, cue: 'Xoay vòng tay thật to' },
  { n: 'Ưỡn ngực', j: '胸を反らす運動', k: 'むねをそらすうんどう', n8: 2, cue: 'Mở tay, ưỡn ngực, nhìn lên' },
  { n: 'Nghiêng người sang bên', j: '体を横に曲げる運動', k: 'からだをよこにまげるうんどう', n8: 2, cue: 'Tay qua đầu, nghiêng người, đổi bên' },
  { n: 'Cúi trước, ngửa sau', j: '体を前後に曲げる運動', k: 'からだをぜんごにまげるうんどう', n8: 2, cue: 'Cúi thả lỏng, rồi chống hông ngửa nhẹ' },
  { n: 'Vặn người', j: '体をねじる運動', k: 'からだをねじるうんどう', n8: 2, cue: 'Vung tay, vặn eo sang hai bên' },
  { n: 'Duỗi tay lên xuống', j: '腕を上下に伸ばす運動', k: 'うでをじょうげにのばすうんどう', n8: 2, cue: 'Tay về vai, đẩy thẳng lên cao' },
  { n: 'Cúi chéo, ưỡn ngực', j: '体を斜め下に曲げ、胸を反らす運動', k: 'からだをななめしたにまげ、むねをそらすうんどう', n8: 2, cue: 'Cúi chéo về một chân, đứng lên ưỡn ngực' },
  { n: 'Xoay vòng cả thân mình', j: '体を回す運動', k: 'からだをまわすうんどう', n8: 2, cue: 'Tay cao, xoay thân thành vòng to' },
  { n: 'Bật nhảy tại chỗ', j: '両脚で跳ぶ運動', k: 'りょうあしでとぶうんどう', n8: 2, cue: 'Bật nhẹ, mở chân rồi khép chân' },
  { n: 'Vung tay, nhún gối', j: '腕を振って脚を曲げ伸ばす運動', k: 'うでをふってあしをまげのばすうんどう', n8: 2, cue: 'Giống động tác 2, hạ nhịp dần' },
  { n: 'Hít thở sâu', j: '深呼吸', k: 'しんこきゅう', n8: 2, cue: 'Tay lên, hít vào; tay xuống, thở ra' }
];
/* 13 động tác cho dạng how (Xem cách làm): 2 khung mỗi động tác, 3 điểm chính */
(function () {
  var F = [
    [{ p: 'rtStand', t: 'Đứng thẳng, hai tay xuôi theo người.' }, { p: 'rtUp', t: 'Đưa hai tay từ phía trước lên cao, vươn người hết cỡ. Rồi hạ tay sang hai bên xuống.', a: [[96, 6], [96, -14]] }],
    [{ p: 'rtBendCross', t: 'Nhún gối nhẹ, hai tay vung chéo trước bụng.' }, { p: 'rtSwingOpen', t: 'Duỗi gối, hai tay vung rộng sang hai bên. Làm đều theo nhịp.' }],
    [{ p: 'rtCrossLow', t: 'Hai tay bắt chéo trước người, gối hơi chùng.' }, { p: 'rtUp', t: 'Xoay hai tay thành vòng tròn to qua đầu. Xoay vòng ra ngoài, rồi vòng vào trong.', arc: [[84, 18, 12], [156, 18, 12]] }],
    [{ p: 'rtWideLow', t: 'Bước một chân sang ngang, rộng bằng vai. Hai tay thả trước người.' }, { p: 'rtArch', t: 'Mở hai tay chếch lên cao, ưỡn ngực, mắt nhìn chếch lên.' }],
    [{ p: 'rtSideL', t: 'Một tay đưa qua đầu, tay kia chống hông. Nghiêng người sang bên, nhún 2 nhịp.' }, { p: 'rtSideR', t: 'Đổi bên: nghiêng sang phía bên kia.' }],
    [{ p: 'rtFwd', t: 'Cúi người ra trước, thả lỏng tay về phía sàn, nhún nhẹ 3 nhịp.' }, { p: 'rtBack', t: 'Đứng lên, chống tay vào hông, ngửa người ra sau vừa sức.' }],
    [{ p: 'rtTwistL', t: 'Vung hai tay sang một bên, vặn eo theo tay. Hông giữ yên.', arc: [[120, 92, 14]] }, { p: 'rtTwistR', t: 'Vung tay, vặn eo sang bên kia.', arc: [[120, 92, 14]] }],
    [{ p: 'rtShoulder', t: 'Co tay, đặt các ngón tay lên vai.' }, { p: 'rtUp', t: 'Đẩy thẳng hai tay lên cao. Về vai, rồi duỗi tay xuống. Làm nhanh, gọn.' }],
    [{ p: 'rtDiag', t: 'Chân rộng. Cúi chéo xuống, hai tay chạm về phía một bàn chân, nhún 2 nhịp.' }, { p: 'rtArch', t: 'Đứng lên, mở tay, ưỡn ngực. Rồi cúi về phía chân bên kia.' }],
    [{ p: 'rtSideUpL', t: 'Hai tay đưa cao. Nghiêng người, bắt đầu xoay thân thành vòng tròn to.', arc: [[120, 40, 34]] }, { p: 'rtSideUpR', t: 'Xoay hết một vòng. Rồi xoay theo chiều ngược lại.', arc: [[120, 40, 34]] }],
    [{ p: 'rtJump', t: 'Bật nhảy nhẹ tại chỗ bằng hai chân, tiếp đất bằng mũi chân.' }, { p: 'rtJumpOpen', t: 'Bật mở chân, tay mở sang hai bên. Rồi bật khép chân lại.' }],
    [{ p: 'rtBendCross', t: 'Giống động tác 2: nhún gối, hai tay vung chéo trước bụng.' }, { p: 'rtSwingOpen', t: 'Duỗi gối, tay vung rộng. Làm chậm dần để hạ nhịp tim.' }],
    [{ p: 'rtBreathUp', t: 'Đưa hai tay từ hai bên lên cao, hít vào bằng mũi.' }, { p: 'rtStand', t: 'Hạ tay xuống chậm, thở ra từ từ.' }]
  ];
  var K = [
    ['Vươn đến tận đầu ngón tay', 'Hít vào khi đưa tay lên', 'Lưng thẳng, không ưỡn bụng'],
    ['Nhún gối nhẹ, gót không nhấc cao', 'Tay vung thả lỏng theo nhịp', 'Giữ lưng thẳng'],
    ['Vòng tay càng to càng tốt', 'Vai thả lỏng, không gồng', 'Gối nhún nhẹ theo nhịp'],
    ['Mở rộng ngực, hít vào', 'Nhìn chếch lên, không ngửa cổ quá', 'Đứng vững, gót sát sàn'],
    ['Nghiêng sang ngang, không cúi về trước', 'Căng lườn bên tay giơ cao', 'Hai chân đứng vững'],
    ['Cúi thả lỏng, không gồng', 'Ngửa vừa sức, tay đỡ hông', 'Đau lưng thì làm nhẹ, bỏ phần ngửa'],
    ['Vặn từ eo, hông giữ yên', 'Tay vung thả lỏng', 'Mắt nhìn theo tay'],
    ['Duỗi thẳng hết tay', 'Nhanh, gọn theo nhịp', 'Vai không nhún lên tai'],
    ['Cúi theo đường chéo về phía bàn chân', 'Hít vào khi đứng lên, ưỡn ngực', 'Làm đều hai bên'],
    ['Vòng xoay to, chậm và đều', 'Chân đứng vững, không nhấc gót', 'Chóng mặt thì xoay vòng nhỏ lại'],
    ['Nhảy thấp, nhẹ, tiếp đất bằng mũi chân', 'Gối hơi chùng khi chạm đất', 'Đau chân, có chấn thương: nhún gối tại chỗ thay bật nhảy'],
    ['Nhún gối nhẹ, tay vung thả lỏng', 'Làm chậm dần', 'Thở đều'],
    ['Hít vào khi đưa tay lên', 'Thở ra chậm khi hạ tay', 'Thả lỏng toàn thân']
  ];
  RT.forEach(function (r, i) {
    var id = 'rt' + (i < 9 ? '0' : '') + (i + 1);
    r.id = id;
    EX[id] = { n: (i + 1) + '. ' + r.n, s: (i + 1) + '. ' + r.n, who: r.j, yt: '', frames: F[i], keys: K[i] };
  });
})();
var RT_COUNT = ['いち', 'に', 'さん', 'し', 'ご', 'ろく', 'しち', 'はち'];
var RT_TEMPO = [{ n: 'Chậm', ms: 800 }, { n: 'Vừa', ms: 650 }];
var RT_TXT = {
  khuSay: 'Radio Taiso là 13 động tác người Nhật tập buổi sáng. Học từng cụm, rồi ráp lại cả bài nhé!',
  mirror: 'Hình như soi gương: hình nghiêng, vặn về bên nào thì bạn làm về bên đó.',
  kwSel: 'Bạn chọn [Món]. Giờ chạm chữ Nhật hợp với nó.',
  kwNo: 'Chưa khớp. Thử chữ khác nhé.',
  rtEnd: 'Nghe người hướng dẫn đếm いち、に、さん、し là bạn bắt nhịp được ngay.',
  /* bắt nhịp */
  btIntro: 'Shin đếm 8 nhịp mẫu. Sau đó, bạn chạm vòng tròn đúng lúc Shin đếm, 16 nhịp.',
  btSound: 'Bật âm thanh của máy để nghe tiếng đếm.',
  btGo: 'Bắt đầu',
  btListen: 'Nghe nhịp…',
  btTap: 'Chạm theo nhịp!',
  btHit: 'Đúng nhịp',
  btMiss: 'Lệch',
  btRes: ['Thử lại nhé. Nghe tiếng đếm rồi chạm cùng lúc.', 'Khá rồi! Thêm một lượt nữa sẽ đều hơn.', 'Nhịp rất đều! Tập theo nhạc sẽ dễ lắm đây.'],
  /* thẻ nhanh */
  qPic: 'Hình này là động tác nào?',
  qNext: 'Sau động tác “[Đ]” là động tác nào?',
  qOk: 'Đúng rồi!',
  qNo: 'Thử lại nhé.',
  qEnd: 'Bạn nhớ cụm này rồi đó. Tập theo nhịp để tay chân nhớ luôn nhé!',
  /* tập theo nhịp */
  flIntro: 'Đứng chỗ rộng, cách đồ vật một sải tay. Shin đếm nhịp, bạn làm theo hình.',
  flNote: 'Đây là nhịp đếm để tập. Nhạc thật nghe ở video.',
  flTempo: 'Tốc độ đếm',
  flStart: 'Bắt đầu cùng Shin',
  flSet: 'Lần [n]/[m]',
  flCheer: ['Làm to, rõ từng động tác.', 'Tốt lắm, giữ nhịp nhé.', 'Thở đều, đừng nín thở.', 'Tay duỗi thẳng hết cỡ.', 'Sắp xong rồi!'],
  flDone: 'Xong rồi! Người bạn thấy thế nào?',
  flFeel: ['Người ấm, tỉnh hơn', 'Còn lúng túng vài chỗ', 'Có chỗ bị đau'],
  flSay: ['Đúng vậy. Tập mỗi sáng vài phút là người tỉnh hẳn.', 'Bình thường thôi. Xem lại hình động tác đó rồi tập chậm vài lần.', 'Dừng động tác làm đau. Đau không đỡ thì báo thầy cô GDTC.'],
  vidBtn: 'Mở video Radio Taiso số 1',
  vidSub: 'Tập theo nhạc thật trên YouTube',
  /* tự chấm */
  sfQ: 'Tập theo video ít nhất một lần, rồi tự chấm theo 3 tiêu chí của lớp GDTC.',
  sfC: ['Thuộc 13 động tác', 'Nghe nhạc, làm đúng nhịp', 'Tập cùng nhóm, cả nhóm đều'],
  sfLv: ['Chưa được', 'Gần được', 'Được rồi'],
  sfLv3: 'Chưa tập nhóm',
  sfNeed: 'Động tác mình cần tập thêm (không bắt buộc)',
  sfSay: ['Chưa sao. Học lại từng cụm, mỗi ngày một cụm là thuộc.', 'Gần được rồi! Tập theo video vài buổi nữa nhé.', 'Giỏi lắm! Thử tập cùng các bạn trong lớp xem cả nhóm đã đều chưa.'],
  sfMark: 'Mốc Đạt của lớp: thuộc 13 động tác, nghe nhạc đi đúng, cả nhóm đều. Thầy cô GDTC chấm trên lớp.',
  /* hẹn 7 buổi sáng */
  s7Q: 'Bạn sẽ tập Radio Taiso vào lúc nào?',
  s7Slots: ['Sáng, trước khi đến lớp', 'Đầu giờ học GDTC', 'Trước ca làm thêm', 'Tối, sau khi học'],
  s7W: 'Viết lời hẹn: “Khi …, mình sẽ tập Radio Taiso.”',
  s7Sub: 'Viết cụ thể: lúc nào, ở đâu. Từ 10 chữ trở lên được thêm Insight.',
  s7Tips: ['Khi đánh răng xong buổi sáng, mình sẽ tập Radio Taiso ở hành lang', 'Khi đến lớp sớm 10 phút, mình sẽ rủ bạn tập Radio Taiso'],
  s7H: '7 buổi Radio Taiso',
  s7Btn: 'Hôm nay mình đã tập',
  s7Done: 'Hôm nay đã đóng dấu',
  s7Toast: 'Giỏi lắm! Thêm một buổi Radio Taiso.',
  s7Full: 'Đủ 7 buổi rồi! Cứ tập tiếp, Shin vẫn đếm cùng bạn.',
  nbH: 'Radio Taiso của mình'
};
var RT_GTIP = {
  xuong: 'Đứng máy cả ca: Radio Taiso làm ấm vai, hông, gối trước khi vào việc.',
  chuyen: 'Lặp một động tác cả ngày: Radio Taiso giúp vai, cổ tay, lưng linh hoạt hơn.',
  troi: 'Mang vác, cúi nhiều: làm ấm cơ thể trước để lưng đỡ mỏi.',
  dv: 'Đỡ người, bưng bê: tập đều giúp lưng, vai dẻo dai hơn.',
  vp: 'Ngồi lâu: Radio Taiso là cách nhanh để đứng dậy, vận động vài phút.'
};
var BAI_RT = [
  { id: 'r1', t: 'Radio Taiso là gì?', ic: 'radio', sub: 'Bài thể dục buổi sáng của người Nhật', min: 9, gtip: RT_GTIP,
    acts: [
      { id: 'r1a', k: 'pick', t: 'Radio Taiso ở Nhật', min: 3, xp: 10,
        rounds: [
          { q: 'Radio Taiso là gì?', opts: [
            { t: 'Bài thể dục ngắn theo nhạc, người Nhật hay tập buổi sáng', ok: 1, why: 'Đúng rồi! Có từ năm 1928. Đến nay đài và tivi NHK vẫn phát mỗi sáng.' },
            { t: 'Chương trình ca nhạc buổi sáng trên đài phát thanh Nhật Bản', why: 'Có nhạc và phát trên đài, nhưng đây là bài để tập theo.' },
            { t: 'Bài kiểm tra thể lực trước khi vào công ty', why: 'Không phải bài kiểm tra. Ai cũng tập được, tập để khỏe.' } ] },
          { q: 'Ở Nhật, bạn có thể gặp Radio Taiso ở đâu?', opts: [
            { t: 'Ở trường học, ngày hội thể thao, nhiều chỗ làm trước giờ vào ca', ok: 1, why: 'Đúng rồi! Nhiều công ty cho cả nhóm tập trước giờ làm để làm ấm cơ thể.' },
            { t: 'Chỉ ở phòng tập gym, phải đăng ký và trả phí mới được tập cùng mọi người', why: 'Radio Taiso không cần phòng tập. Đứng ở đâu cũng tập được.' },
            { t: 'Chỉ ở bệnh viện, dành cho người đang điều trị', why: 'Người khỏe, người lớn tuổi, học sinh đều tập.' } ] },
          { q: 'Vì sao nên thuộc Radio Taiso trước khi sang Nhật?', opts: [
            { t: 'Để tập cùng mọi người ngay từ ngày đầu, người ấm lên trước khi làm', ok: 1, why: 'Đúng rồi! Thuộc bài thì bạn hòa vào nhóm ngay, không bỡ ngỡ.' },
            { t: 'Để được miễn những việc nặng trong suốt thời gian thực tập ở công ty', why: 'Thuộc bài không thay đổi công việc. Bài giúp cơ thể sẵn sàng.' },
            { t: 'Vì thuộc bài thì được tăng lương ngay tháng đầu', why: 'Không liên quan đến lương. Lợi ích là sức khỏe và hòa nhập.' } ] }
        ] },
      { id: 'r1b', k: 'match', t: 'Từ tiếng Nhật của bài', min: 3, xp: 10,
        q: 'Ghép nghĩa tiếng Việt với chữ Nhật.', sub: 'Chạm một nghĩa, rồi chạm chữ Nhật hợp với nó.',
        sel: 'kwSel', no: 'kwNo', end: 'rtEnd',
        pairs: [
          { v: 'Thể dục theo đài', j: 'ラジオ体操', k: 'らじおたいそう', r: 'rajio taisō', why: 'Tên của bài. Nghe là biết sắp tập cùng nhau.' },
          { v: 'Một, hai, ba, bốn', j: 'いち、に、さん、し', r: 'ichi, ni, san, shi', why: 'Người hướng dẫn đếm nhịp như vậy.' },
          { v: 'Hít thở sâu', j: '深呼吸', k: 'しんこきゅう', r: 'shinkokyū', why: 'Động tác 13, cuối bài.' },
          { v: 'Cánh tay', j: '腕', k: 'うで', r: 'ude', why: 'Có trong tên động tác 2, 3, 8.' },
          { v: 'Ngực', j: '胸', k: 'むね', r: 'mune', why: 'Động tác 4 là 胸を反らす: ưỡn ngực.' },
          { v: 'Thân người', j: '体', k: 'からだ', r: 'karada', why: 'Có trong tên động tác 5, 6, 7, 9, 10.' }
        ] },
      { id: 'r1c', k: 'beat', t: 'Bắt nhịp 1–8', min: 3, xp: 15 }
    ] },
  { id: 'r2', t: 'Cụm 1: Động tác 1–3', ic: 'arm', sub: 'Vươn người · Vung tay, nhún gối · Xoay tay', min: 10, gtip: RT_GTIP,
    acts: [
      { id: 'r2a', k: 'how', t: 'Xem 3 động tác', min: 4, xp: 10, ex: ['rt01', 'rt02', 'rt03'], more: RT_TXT.mirror },
      { id: 'r2b', k: 'rtq', t: 'Thẻ nhanh', min: 3, xp: 10, mv: [1, 2, 3] },
      { id: 'r2c', k: 'rflow', t: 'Tập theo nhịp', min: 3, xp: 15, mv: [1, 2, 3] }
    ] },
  { id: 'r3', t: 'Cụm 2: Động tác 4–7', ic: 'core', sub: 'Ưỡn ngực · Nghiêng người · Cúi, ngửa · Vặn người', min: 11, gtip: RT_GTIP,
    acts: [
      { id: 'r3a', k: 'how', t: 'Xem 4 động tác', min: 4, xp: 10, ex: ['rt04', 'rt05', 'rt06', 'rt07'], more: RT_TXT.mirror },
      { id: 'r3b', k: 'rtq', t: 'Thẻ nhanh', min: 3, xp: 10, mv: [4, 5, 6, 7] },
      { id: 'r3c', k: 'rflow', t: 'Tập theo nhịp', min: 4, xp: 15, mv: [4, 5, 6, 7] }
    ] },
  { id: 'r4', t: 'Cụm 3: Động tác 8–10', ic: 'stretch', sub: 'Duỗi tay lên xuống · Cúi chéo, ưỡn ngực · Xoay thân', min: 10, gtip: RT_GTIP,
    acts: [
      { id: 'r4a', k: 'how', t: 'Xem 3 động tác', min: 4, xp: 10, ex: ['rt08', 'rt09', 'rt10'], more: RT_TXT.mirror },
      { id: 'r4b', k: 'rtq', t: 'Thẻ nhanh', min: 3, xp: 10, mv: [8, 9, 10] },
      { id: 'r4c', k: 'rflow', t: 'Tập theo nhịp', min: 3, xp: 15, mv: [8, 9, 10] }
    ] },
  { id: 'r5', t: 'Cụm 4: Động tác 11–13', ic: 'leg', sub: 'Bật nhảy · Vung tay, nhún gối · Hít thở sâu', min: 11, gtip: RT_GTIP,
    acts: [
      { id: 'r5a', k: 'how', t: 'Xem 3 động tác', min: 4, xp: 10, ex: ['rt11', 'rt12', 'rt13'], more: RT_TXT.mirror },
      { id: 'r5b', k: 'order', t: 'Xếp đủ 13 động tác', min: 4, xp: 15,
        q: 'Xếp 13 động tác Radio Taiso theo thứ tự.', sub: 'Chạm lần lượt từ động tác đầu đến động tác cuối.',
        items: ['Vươn người', 'Vung tay, nhún gối', 'Xoay tay', 'Ưỡn ngực', 'Nghiêng người sang bên', 'Cúi trước, ngửa sau', 'Vặn người', 'Duỗi tay lên xuống', 'Cúi chéo, ưỡn ngực', 'Xoay vòng cả thân mình', 'Bật nhảy tại chỗ', 'Vung tay, nhún gối (lặp lại)', 'Hít thở sâu'],
        hint: 'Gợi ý: mở đầu bằng vươn người, kết thúc bằng hít thở sâu. “Vung tay, nhún gối” có 2 lần: số 2 và số 12.',
        ok: 'Bạn thuộc thứ tự cả bài rồi! Giờ tập theo nhịp để tay chân nhớ luôn.' },
      { id: 'r5c', k: 'rflow', t: 'Tập theo nhịp', min: 3, xp: 15, mv: [11, 12, 13] }
    ] },
  { id: 'r6', t: 'Trọn bài 13 động tác', ic: 'stamp', sub: 'Tập theo nhịp, theo nhạc, tự chấm', min: 12, gtip: RT_GTIP,
    acts: [
      { id: 'r6a', k: 'rflow', t: 'Tập trọn bài theo nhịp', min: 4, xp: 15, mv: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
      { id: 'r6b', k: 'rself', t: 'Tập theo nhạc, tự chấm', min: 5, xp: 15 },
      { id: 'r6c', k: 'sang7', t: 'Hẹn 7 buổi Radio Taiso', min: 3, xp: 15 }
    ] }
];

/* =========================================================
   BUỔI TẬP 10 PHÚT CÙNG SHIN (TC01.1.5) · PA A: 3 bài cố định để chọn
   Khởi động 2 phút (preshift 5 × 24 giây) → bài chính 6 phút (6 động tác × làm 40 giây, nghỉ 20 giây) → giãn 2 phút (midstretch 5 × 24 giây).
   Nữ: pushup tự đổi thành kneepush. Không đục lỗ thẻ; thẻ ghi số buổi.
   ========================================================= */
var S10 = { warm: 'preshift', cool: 'midstretch', wSec: 24, work: 40, rest: 20 };
var S10_MENU = [
  { id: 'sang', n: 'Tỉnh táo buổi sáng', ic: 'warm', d: 'Tim đập nhanh hơn, người tỉnh táo', main: ['jj', 'squat', 'kneehigh', 'lunge', 'jj', 'kneehigh'] },
  { id: 'luc', n: 'Sức mạnh', ic: 'arm', d: 'Tay, bụng, lưng, chân', main: ['pushup', 'squat', 'plank', 'superman', 'lunge', 'legraise'] },
  { id: 'nghe', n: 'Chống mỏi nghề', ic: 'helmet', d: 'Lưng, hông, chân cho ca làm dài', main: ['hinge', 'sidelunge', 'superman', 'plank', 'crunch', 'squat'] }
];
var S10_TXT = {
  btn: 'Buổi tập 10 phút cùng Shin',
  btnSub: '3 bài để chọn',
  hi: 'Chọn một bài 10 phút. Shin đếm giờ, bạn làm theo hình.',
  inj: 'Bạn có chấn thương cũ: làm nhẹ, động tác nào đau thì bỏ qua.',
  plan: ['Khởi động', 'Bài chính', 'Giãn cơ'],
  planD: ['2 phút', '6 động tác · làm 40 giây, nghỉ 20 giây', '2 phút'],
  start: 'Bắt đầu buổi tập',
  ph: { warm: 'Khởi động', main: 'Bài chính', rest: 'Nghỉ', cool: 'Giãn cơ' },
  restNext: 'Tiếp theo: ',
  work: 'Làm đều, đúng tư thế. Mệt thì làm chậm lại.',
  pause: 'Tạm dừng', go: 'Tiếp tục', skip: 'Bỏ qua', stop: 'Dừng buổi tập', pain: 'Thấy đau? Dừng ngay',
  done: 'Xong buổi tập! Người bạn thấy thế nào?',
  doneShort: 'Bạn dừng sớm. Vẫn lưu lại nhé. Người bạn thấy thế nào?',
  feel: ['Nhẹ nhàng', 'Vừa sức', 'Mệt', 'Có chỗ bị đau'],
  say: ['Lần sau thử bài khác hoặc làm nhanh hơn một chút nhé.', 'Vừa sức là đúng nhịp. Tập đều mỗi ngày nhé.', 'Mệt là bình thường. Uống nước, nghỉ ngơi. Lần sau làm chậm hơn.', 'Dừng tập hôm nay. Đau kéo dài hoặc đau nhói thì báo thầy cô GDTC.'],
  save: 'Lưu buổi tập',
  toast: 'Đã lưu buổi tập thứ [n]. Giỏi lắm!',
  week: 'Tuần này',
  nbH: 'Buổi tập 10 phút',
  nbNone: 'Chưa có buổi nào. Ở trang chính, chạm “Buổi tập 10 phút cùng Shin”.'
};

var DEMO = {
  mem: { job: 'co-khi', g: 'xuong', sex: 'nam', inj: 0, goal: 'Chống đẩy được 30 cái liên tục trước khi bay', h: 168, w: 60, at: 0 },
  done: ['b1a', 'b1b', 'b1c', 'b2a', 'b2b', 'b2c', 'b4a'],
  log: { pushup: [{ n: 18, f: 2 }, { n: 22, f: 2 }], squat: [{ n: 30, f: 1 }] },
  refl: { b2c: 'Lần tới mình sẽ siết bụng, siết mông từ đầu đến cuối, không để hông võng xuống.',
    d1c: 'Bữa sáng mai mình sẽ ăn thêm một quả trứng và uống sữa thay cà phê.' },
  bepDone: ['d1a', 'd1b', 'd1c', 'd2a', 'd3a', 'd5b', 'n1a', 'n1b', 'n2a', 'n4a', 'y1a', 'y1b', 'y2b', 't1a', 't1b', 'r1a', 'r1b', 'r1c', 'r2a', 'r2b', 'r2c', 'r3a', 'r6b', 'r6c'],
  radio: { beat: 13, fl: { r2c: 2 }, self: { c: [2, 1, 0], need: [5, 8], at: 0 }, s7: { slot: 0, txt: 'Khi đánh răng xong buổi sáng, mình sẽ tập Radio Taiso ở hành lang', ago: 3, done: [0, 1, 3] } },
  s10: [{ ago: 6, m: 'luc', sec: 600, f: 1 }, { ago: 4, m: 'sang', sec: 600, f: 1 }, { ago: 2, m: 'nghe', sec: 420, f: 2 }, { ago: 1, m: 'luc', sec: 600, f: 1 }],
  yte: { sim: { y1a: { f: 4, n: 5 } } },
  test: { q: { t1b: { b: 16, l: 16, n: 20, k: 2 } }, w: { dd15: 1, dd20: 1, dd23: 1, sk16: 1 }, tf: { t1a: { b: 8, n: 10 } } },
  ft: [{ ago: 9, a: 't4b', lv: 'cb', r: { push: 24, plank: 110, squat: 60 }, f: 1 }, { ago: 2, a: 't4b', lv: 'cb', r: { push: 29, plank: 135, squat: 72 }, f: 1 }, { ago: 2, a: 't5a', lv: 'sb', r: { knee: 50, jj: 70 }, f: 1 }],
  nghe: { body: ['lung', 'tay', 'chan'], lad: { nvt: 1, bl: 2, ch: 1, tm: 2 }, ca: { g: 'xuong', sel: [3, 5], sch: 1 } },
  food: { meal: { sang: ['Bánh mì không'], trua: ['Cơm', 'Cá', 'Canh rau'], toi: ['Mì gói'], skip: {} },
    calc: { h: 168, w: 60, age: 20, sex: 'nam', lv: 2 },
    shift: { s: 8, l: 9, pre: 0 },
    commit: { h: 'Ăn sáng trước khi đến lớp', txt: 'Khi chuông báo thức reo, mình sẽ dậy sớm 10 phút để ăn sáng', ago: 4, done: [0, 1, 3] } }
};
