/* TK · Nhật Bản Du Ký · tk/content.js · NỘI DUNG KHÓA HỌC: ải, chặng, bước, câu hỏi, Hỏi nhanh. Sửa chữ ở đây.
   Tách từ TK13 (một tệp) sang Proskills PS1.2.1. ES5, biến toàn cục dùng chung giữa các tệp tk/*.js; thứ tự nạp xem tk/index.html. */
/* =========================================================
   PHẦN 2 · NỘI DUNG KHÓA HỌC
   Nguồn ưu tiên: Bài giảng "Quy định pháp lý TTS cần quan tâm" (09.2026),
   Tikme, Casestudy TTS Esuhai (chỉ dùng để xây tình huống), Sổ tay TTS của OTIT (bản tiếng Việt),
   Sổ tay hướng dẫn cư trú và lao động 2024 (Cơ quan Quản lý XNC & cư trú Nhật Bản).
   ========================================================= */
var VERSION = 'TK16.3';
var COURSE = 'HP05 · Kiến thức quy định';
/* Câu hỏi qua cổng và mật khẩu: nằm ở config.js của Proskills (module 'tk'). */
var BUILT = {start:1, 1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1};   /* TK04: đủ 7 ải và Phù Tang */

var START = {n:0, haiku:['Sáng ngày lên đường','điều giữ trong lòng','là đường trở về'], k:'出発', kana:'しゅっぱつ', ro:'Shuppatsu · Lên đường', vn:'Lên đường', d:'Gặp đoàn lữ hành và năm tầng quy định', ic:'start', col:'#2F4BD8',
  intro:'Trước khi qua ải, [Tên] làm quen với cả đoàn nhé, chia sẻ với Ngộ Không mục tiêu của bạn trong 1-2 câu và cùng xem qua những quy định nào sẽ bảo vệ [Tên] khi sang Nhật nhé.',
  acts:['s1','s2']};
var AIS = [
  {n:1, haiku:['Giọng nói ngọt ngào','ngay nơi cổng làng','cẩn thận cáo rình'], k:'門', kana:'もん', ro:'Mon · Cổng', vn:'Ải Cổng Làng', d:'Chọn đúng đường đi, tránh cò mồi', ic:'gate', col:'#E8834A', boss:'ho',
    intro:'Cửa ải đầu tiên nằm ngay ở Việt Nam, trước khi [Tên] sang Nhật. Chọn sai đường từ cổng làng thì mọi chặng sau đều lung lay.',
    shield:'Luật Việt Nam buộc doanh nghiệp phái cử công khai mọi khoản phí và cấm dùng cò: bạn có quyền hỏi, có quyền xem kỹ trước khi ký.',
    bossLine:'Ở cổng làng, Hồ Ly đội lốt "người quen có đường dây": hứa đi nhanh, bao đậu, chỉ cần đóng tiền riêng cho nó.',
    acts:['a11','a12','a13'], warm:'w1',
    badge:{k:'道', n:'Chính Đạo', d:'Bạn chọn đúng đường ngay từ cổng làng.'},
    kinh:{t:'Bí kíp số 1 · Chính Đạo', p:[
      'Chỉ đi qua doanh nghiệp phái cử có giấy phép còn hạn. Tra cứu trên trang chính thức của DOLAB.',
      'Đọc kỹ hợp đồng. Mọi khoản phí phải ghi rõ trong hợp đồng, đóng cho doanh nghiệp và có phiếu thu.',
      'Ai hứa "bao đậu, đi nhanh" và đòi tiền riêng: báo thầy cô hoặc anh chị Esuhai.'],
      jp:'急がば回れ', ro:'Isogaba maware', vi:'Càng vội, càng nên đi đường chắc chắn.'}},
  {n:2, haiku:['Tấm thẻ mang tên','đem người khác mượn','hóa thành hư không'], k:'札', kana:'ふだ', ro:'Fuda · Thẻ bài', vn:'Ải Thẻ Bài', d:'Thẻ cư trú và những việc được phép làm', ic:'card', col:'#14A874', boss:'yeu',
    intro:'Thẻ cư trú là tấm thẻ bài giữ cho [Tên] được ở Nhật hợp pháp. Giữ thẻ an toàn, và đọc kỹ để hiểu trên thẻ ghi những gì.',
    shield:'Không ai được giữ thẻ cư trú, hộ chiếu của bạn, kể cả công ty: tấm thẻ bài ấy luôn nằm trong tay bạn.',
    bossLine:'Yêu "Chắc Không Sao" hay thì thầm: "quên thẻ một hôm chắc không sao", "cho bạn mượn tí thôi", "bật kiếm tiền TikTok/Youtube ai biết".',
    acts:['a21','a22','a23'], warm:'w2',
    badge:{k:'証', n:'Giữ Thẻ', d:'Bạn biết giữ và đọc thẻ cư trú đúng cách.'},
    kinh:{t:'Bí kíp số 2 · Giữ Thẻ', p:[
      'Thẻ cư trú luôn mang theo người. Không cho mượn, không gửi ai giữ hộ, không đăng ảnh thẻ lên mạng.',
      'Thẻ ghi rõ bạn được làm gì: chỉ làm ở nơi đã đăng ký (Công ty tiếp nhận) và không được kiếm thêm thu nhập nào khác.',
      'Số My Number chỉ khai cho cơ quan có thẩm quyền. Mất thẻ: báo cảnh sát và xin cấp lại trong 14 ngày.'],
      jp:'備えあれば憂いなし', ro:'Sonae areba urei nashi', vi:'Chuẩn bị sẵn thì không phải lo.'}},
  {n:3, haiku:['Đêm khuya thanh vắng','khẽ mở cửa phòng','bóng tối lẻn vào'], k:'寮', kana:'りょう', ro:'Ryō · Ký túc xá', vn:'Ải Động Ký Túc', d:'Sống chung đúng nội quy', ic:'house', col:'#7C5CE0', boss:'yeu',
    intro:'KTX là nhà của [Tên] suốt những năm ở Nhật, và cũng là nhà của các em Kohai sau này. Sống đúng nội quy là giữ nhà cho cả người đi sau.',
    shield:'Hợp đồng thuê nhà và nội quy giúp bạn có chỗ ở ổn định, yên tĩnh, và giữ chỗ ở cho các em Kohai sau này.',
    bossLine:'Ở KTX, Yêu "Chắc Không Sao" sống ngay trong phòng: "ngủ nhờ một đêm chắc không sao", "ai cũng vứt rác vậy mà".',
    acts:['a31','a32','a33'], warm:'w3',
    badge:{k:'和', n:'Hòa Khí', d:'Bạn giữ được nhà chung yên ổn cho mình và cho Kohai.'},
    kinh:{t:'Bí kíp số 3 · Hòa Khí', p:[
      'Không đưa người ngoài vào ở KTX. Đi xa, trọ ở ngoài cần xin phép Công ty và Hiệp hội trước.',
      'Giữ yên lặng sau 10 giờ tối, phân loại rác đúng ngày, giữ chỗ ở sạch sẽ.',
      'Đủ 20 tuổi mới được hút thuốc, uống rượu. Có mâu thuẫn thì nói chuyện và nhờ người hướng dẫn, không gắn camera, không "động thủ".'],
      jp:'郷に入っては郷に従え', ro:'Gō ni itte wa gō ni shitagae', vi:'Nhập gia tùy tục.'}},
  {n:4, haiku:['Búa nện vào thép','vang tiếng ngay thẳng','dối trá lùi xa'], k:'職場', kana:'しょくば', ro:'Shokuba · Nơi làm việc', vn:'Ải Xưởng Rèn', d:'Hợp đồng, lương và quyền lợi của bạn', ic:'gear', col:'#0E9F9E', boss:'yeu',
    intro:'Xưởng là nơi [Tên] làm việc mỗi ngày. Ở đây cần bạn lưu ý 2 điều: Làm việc nghiêm túc, trung thực và biết tìm đến đúng người để lên tiếng khi quyền lợi của mình bị xâm phạm.',
    shield:'Luật lao động Nhật bảo vệ giờ làm, tiền tăng ca, ngày phép của bạn. Bị đối xử sai, bạn được tố cáo mà không bị đối xử bất lợi.',
    bossLine:'Trong xưởng, Yêu "Chắc Không Sao" nói hai giọng: "ăn gian năm phút ai biết", và "bị bắt nạt thì cứ chịu, nói ra mất việc".',
    acts:['a41','a42','a43'], warm:'w4',
    badge:{k:'誠', n:'Ngay Thẳng', d:'Bạn trung thực với công ty và biết bảo vệ quyền lợi đúng cách.'},
    kinh:{t:'Bí kíp số 4 · Ngay Thẳng', p:[
      'Đọc hiểu phiếu lương: tổng thu nhập trừ thuế, bảo hiểm, tiền nhà mới ra thực lĩnh. Tiền hưu trí được nhận lại một phần khi về nước.',
      'Trung thực từng phút chấm công, từng món đồ của công ty. Lỗi của mình thì nhận và sửa.',
      'Bị bắt nạt, bị giữ giấy tờ, không được trả tăng ca: ghi lại, báo người hướng dẫn, Hiệp hội, OTIT. Không im lặng, không bỏ trốn.'],
      jp:'正直は一生の宝', ro:'Shōjiki wa isshō no takara', vi:'Trung thực là báu vật cả đời.'}},
  {n:5, haiku:['Phố phường về đêm','bước chân lơ là','thành ngay cạm bẫy'], k:'街', kana:'まち', ro:'Machi · Phố phường', vn:'Ải Phố Phường', d:'Giao thông và luật nơi công cộng', ic:'bike', col:'#E0558E', boss:'yeu',
    intro:'Ra khỏi Công ty và KTX là phố phường Nhật Bản: sạch sẽ, yên tĩnh, nhưng quy định thì có ở từng góc phố. [Tên] đi một vòng cùng Ngộ Không nhé.',
    shield:'Luật giao thông và quy định nơi công cộng giữ an toàn cho chính bạn trên đường, ngoài biển, giữa phố.',
    bossLine:'Ngoài phố, Yêu "Chắc Không Sao" thì thầm: "đồ bỏ đi mà", "ai cũng đi vỉa hè", "biển cấm chỉ để dọa thôi".',
    acts:['a51','a52','a53'], warm:'w5',
    badge:{k:'慎', n:'Cẩn Trọng', d:'Bạn đi giữa phố Nhật mà không "vấp" luật nào.'},
    kinh:{t:'Bí kíp số 5 · Cẩn Trọng', p:[
      'Không lấy thứ không phải của mình: xe đạp bỏ đi, đồ ở điểm rác, rau quả nhà người khác, sò ốc ở vùng cấm.',
      'Xe đạp: đi bên trái lòng đường, bật đèn, không điện thoại, không tai nghe, không chở người. Xe tự chạy bằng ga thì cần bằng lái.',
      'Tôn trọng người khác: không làm ồn, không đeo bám, không đụng chạm, không đùa quá trớn. Biển cấm là để giữ bạn an toàn.'],
      jp:'君子危うきに近寄らず', ro:'Kunshi ayauki ni chikayorazu', vi:'Người khôn không đến gần chỗ nguy hiểm.'}},
  {n:6, haiku:['Cổng đỏ nối dài','ngoảnh lại lần nữa','mắt cáo vẫn nhìn'], k:'詐欺', kana:'さぎ', ro:'Sagi · Lừa đảo', vn:'Ải Hang Hồ Ly', d:'Nhận diện lừa đảo, không thành đồng phạm', ic:'fox', col:'#F07A3E', boss:'ho',
    intro:'Hồ Ly không đáng sợ ở bộ mặt thật, mà ở những lốt mà nó đội: người quen, người tốt, bạn đồng hương, thậm chí người yêu. [Tên] cùng Ngộ Không luyện mắt nhìn thấu nhé!',
    shield:'Luật Nhật trừng phạt kẻ lừa đảo. Bị lừa mà báo sớm, cảnh sát và Hiệp hội đứng về phía bạn.',
    bossLine:'Kẻ lừa đảo đội lốt người tốt. Hắn không bảo bạn làm điều xấu, chỉ nhờ bạn "giúp một chút", "thử một lần xem"…',
    acts:['a61','a62','a63'], warm:'w6',
    badge:{k:'眼', n:'Hỏa Nhãn', d:'Bạn đã nhìn thấu ba lốt của Hồ Ly.'},
    kinh:{t:'Bí kíp số 6 · Hỏa Nhãn', p:[
      'Tài khoản, thẻ, điện thoại, địa chỉ đứng tên mình: không bán, không cho thuê, không cho mượn.',
      'Chỉ làm việc ở nơi đã đăng ký. Việc nhẹ lương cao, dặn bạn giấu công ty là bẫy.',
      'Nghi ngờ thì hỏi người hướng dẫn, Hiệp hội, Esuhai. Bị đe dọa thì gọi 110.'],
      jp:'うまい話には裏がある', ro:'Umai hanashi ni wa ura ga aru', vi:'Chuyện ngon ăn luôn có mặt trái.'}},
  {n:7, haiku:['Đêm vừa thắng bạc','quỷ dữ cười khẩy','xích sắt khua vang'], k:'誘惑', kana:'ゆうわく', ro:'Yūwaku · Cám dỗ', vn:'Ải Sòng Đỏ Đen', d:'Cờ bạc, vay mượn và tiền bạc', ic:'dice', col:'#C8457A', boss:'ngu',
    intro:'Ải cuối cùng có hai yêu quái bắt tay nhau. Lão Đỏ Đen kéo [Tên] vào nợ, Hồ Ly đứng chờ sẵn với "việc làm thêm" để trả nợ. Vào Phòng chiếu Kōban xem một câu chuyện có thật như thế nhé.',
    shield:'Luật Nhật giới hạn lãi suất và trừng phạt kẻ đòi nợ bằng đe dọa: bị đòi nợ, bạn được cảnh sát bảo vệ.',
    bossLine:'Lúc đầu cho bạn thắng, rồi giữ chặt bạn bằng nợ. Khi bạn cùng đường, Hồ Ly bước ra: "Muốn trả nợ không? Có việc này kiếm được tiền…"',
    acts:['a71','a72','a73'], warm:'w7',
    badge:{k:'克', n:'Tự Chủ', d:'Bạn làm chủ được đồng tiền và thời gian của mình.'},
    kinh:{t:'Bí kíp số 7 · Tự Chủ', p:[
      'Không đánh bạc ăn tiền dưới mọi hình thức: lô đề, cá độ, bài qua mạng.',
      'Không vay nóng; không nên cho vay mượn, chơi hụi. Bị đòi nợ, đe dọa: báo cảnh sát, Hiệp hội, Esuhai.',
      'Giải trí có giới hạn: tự đặt luật chơi game, ngủ đủ, giữ mục tiêu ban đầu.'],
      jp:'身から出た錆', ro:'Mi kara deta sabi', vi:'Gỉ sét sinh ra từ chính thân mình: họa do mình tự chuốc.'}}
];
var FINAL = {n:8, haiku:['Nắng mai rọi chiếu','nơi cuối hành trình','trang giấy trắng tinh'], k:'扶桑', kana:'ふそう', ro:'Fusō · Phù Tang', vn:'Phù Tang', d:'Về đích trọn vẹn: đi đến nơi, về đến chốn', ic:'peak', col:'#C98A12',
  intro:'[Tên] đã qua đủ 7 ải. Chặng cuối không còn yêu quái, chỉ còn những việc cần làm cho trọn vẹn: thu xếp chu toàn trước khi về nước, mang theo túi cứu viện, và viết trang bí kíp của riêng mình.',
  acts:['f1','f2','f3'],
  badge:{k:'志', n:'Bí Kíp Trọn Bộ', d:'Bạn đã đến xứ Phù Tang: đi đến nơi, về đến chốn.'},
  kinh:{t:'Bí kíp trọn bộ · Trang cuối không chữ', p:[
    'Bảy bí kíp là luật. Trang cuối không chữ là lời hứa bạn tự viết.',
    'Thu xếp chu toàn trước khi về nước: đóng tài khoản, hủy điện thoại, trả hết nợ, làm thủ tục Nenkin.',
    'Túi cứu viện luôn mang theo: 110, 119, #9110, OTIT, Hiệp hội, Esuhai.'],
    jp:'石の上にも三年', ro:'Ishi no ue ni mo sannen', vi:'Ngồi trên đá ba năm, đá cũng ấm: kiên trì thì thành.'}};
var TOTAL_ACTS = 2 + 7*3 + 3;

/* Thang hậu quả: càng lên cao càng nặng (Bài giảng 09.2026, slide 33–35) */
var LADDER = [
  'Bị nhắc nhở bằng lời',
  'Bị lập biên bản nhắc nhở, cảnh cáo',
  'Dừng chương trình, về nước trước hạn',
  'Cảnh sát điều tra, có thể bị phạt',
  'Bị trục xuất khỏi Nhật Bản',
  'Bị cấm quay lại Nhật từ 5 đến 10 năm'
];
var SRC_SOTAY = 'Sổ tay Thực tập sinh kỹ năng của OTIT (bản tiếng Việt)';
var L_XNC = 'Luật Quản lý xuất nhập cảnh Nhật Bản (入管法)';
var L_TTKN = 'Luật Thực tập kỹ năng (技能実習法)';
var L_IKU = 'Luật Ikusei Shuro (育成就労法, hiệu lực từ 1/4/2027)';
var L_LD = 'Luật Tiêu chuẩn lao động Nhật Bản (労働基準法)';
var L_HS = 'Bộ luật Hình sự Nhật Bản (刑法)';
var L_69 = 'Luật số 69/2020/QH14 (Luật Người lao động Việt Nam đi làm việc ở nước ngoài theo hợp đồng)';
var SOTAY24 = 'Sổ tay hướng dẫn cư trú và lao động 2024 (Cơ quan Quản lý xuất nhập cảnh Nhật Bản)';
var NOIQUY = 'Quy định của công ty, Hiệp hội (tùy nơi)';

var CAST = [
  {id:'hau', role:'Bạn đồng hành', bg:'#ECF0FF', fg:'#1D2F9E', d:'Có đôi mắt nhìn thấu lòng người. Ngộ Không sẽ nhắc bạn soi kỹ trước mỗi ngã rẽ.'},
  {id:'tan', role:'Cảnh sát ở đồn Kōban', bg:'#E7ECF8', fg:'#23306B', d:'Giải thích luật pháp của Nhật và cho bạn biết điều gì xảy ra sau mỗi lựa chọn. Chú ấy nghiêm, nhưng rất tử tế.'},
  {id:'ho', role:'Yêu quái lừa đảo', bg:'#FFF0E6', fg:'#A84A16', d:'Đội lốt người quen, người tốt, người đồng hương. Không bảo bạn làm điều xấu ngay, chỉ nhờ bạn "giúp một chút".'},
  {id:'ngu', role:'Yêu quái cám dỗ', bg:'#FBEAEC', fg:'#8E2433', d:'Mời gọi bạn chơi cờ bạc, cá độ, vay nóng. Lúc đầu cho bạn thắng, rồi giữ chặt bạn bằng nợ.'},
  {id:'yeu', role:'Con yêu bên trong mỗi người', bg:'#EAF6E2', fg:'#3F7A22', d:'Hay thì thầm: "ai cũng làm mà", "chắc không sao đâu", "em không biết", "chỉ một lần này thôi". Bạn có thấy quen?'}
];

/* ---------------- CÁC CHẶNG ---------------- */
var ACTS = {
/* ===== LÊN ĐƯỜNG ===== */
s1:{ai:0, t:'Gặp đoàn lữ hành', d:'Làm quen 5 nhân vật, viết mục tiêu của bạn', mins:4, steps:[
  {k:'say', who:'hau', mood:'cheer', text:'Trong Tây du ký, thầy trò Đường Tăng phải qua 81 kiếp nạn mới đến nơi. Hành trình sang xứ Phù Tang của [Tên] cũng có nhiều "yêu quái" đội lốt người tốt. Cùng làm quen với cả đoàn nào!'},
  {k:'cast', note:'Nhiều tình huống trong khóa dựa trên chuyện đã từng xảy ra, tên nhân vật đã được thay đổi. Nếu trùng tên bạn vui lòng tha thứ cho Ngộ Không nhé.'},
  {k:'goal'},
  {k:'safe'}
]},
s2:{ai:0, t:'Năm tầng quy định', d:'Sang Nhật, bạn giữ 5 tầng quy định cùng lúc', mins:4, steps:[
  {k:'layers'},
  {k:'classify', intro:'Mỗi quy định dưới đây thuộc tầng nào? Chạm vào ô để chọn.',
    cats:['Luật Nhật Bản','Luật cư trú cho người nước ngoài','Luật Việt Nam','Hiệp hội','Công ty và KTX'],
    items:[
      {t:'Không được lấy xe đạp bỏ ngoài đường, kể cả xe cũ hỏng.', a:0, why:'Lấy đồ không phải của mình là trộm cắp theo luật Nhật, áp dụng cho mọi người.', src:L_HS},
      {t:'Chỉ được làm việc ở nơi đã đăng ký, không làm thêm chỗ khác.', a:1, why:'Luật Quản lý xuất nhập cảnh chỉ cho bạn làm đúng hoạt động ghi trên tư cách lưu trú.', src:L_XNC+' · '+SRC_SOTAY+', mục 9'},
      {t:'Doanh nghiệp phái cử không được dùng "cò" trung gian để tuyển người.', a:2, why:'Đây là quy định của Luật Người lao động Việt Nam đi làm việc ở nước ngoài theo hợp đồng (Luật số 69/2020/QH14).', src:L_69},
      {t:'Không nên cho vay mượn tiền, chơi hụi.', a:3, why:'Nhiều Hiệp hội có quy định này để TTS không vướng vào nợ nần, mâu thuẫn. Hiệp hội quản lý bạn có thể có thêm quy định khác.', src:NOIQUY},
      {t:'Sau 10 giờ tối nên giữ yên lặng.', a:4, why:'Nội quy của nhiều nơi ở. Hàng xóm phàn nàn nhiều lần thì công ty khó thuê nhà cho các em Kohai sau này.', src:NOIQUY}
    ]},
  {k:'ladder'}
]},

/* ===== ẢI 1 · CỔNG LÀNG ===== */
w1:{ai:1, warm:1, t:'Khởi động 30 giây', d:'Đúng hay sai? Ba câu nhanh', mins:1, steps:[
  {k:'tf', items:[
    {t:'Đi Nhật qua người quen "có đường dây" sẽ nhanh và rẻ hơn.', a:false, why:'Người không thuộc doanh nghiệp có giấy phép thì không đưa bạn đi hợp pháp được. Luật Việt Nam cấm doanh nghiệp dùng "cò" để tuyển người.'},
    {t:'Bạn có quyền được xem đầy đủ các khoản phí trước khi ký hợp đồng.', a:true, why:'Doanh nghiệp phái cử phải công khai, minh bạch các khoản phí trước khi bạn ký.'},
    {t:'Sang Nhật rồi thì Hiệp hội và OTIT không liên quan gì đến Thực tập sinh.', a:false, why:'Hiệp hội quản lý, hỗ trợ bạn. OTIT kiểm tra công ty và Hiệp hội, có đường dây tư vấn tiếng Việt.'}
  ]}
]},
a11:{ai:1, t:'Ai là ai trên đường đi?', d:'Biết đúng người lo đúng việc cho mình', mins:4, steps:[
  {k:'say', who:'hau', mood:'hi', text:'Trong Tây du ký, qua mỗi nước đều có người đóng dấu vào văn điệp cho thầy trò. Đường sang Nhật của [Tên] cũng có nhiều bên cùng lo. Biết ai làm gì thì khi cần, bạn tìm đúng người.'},
  {k:'classify', intro:'Mỗi mô tả dưới đây là việc của bên (tổ chức) nào? Chạm vào tên đúng.',
    cats:['Esuhai và JPC','DOLAB','Hiệp hội','OTIT','Công ty tiếp nhận'],
    items:[
      {t:'Đào tạo tiếng Nhật, kỹ năng trước khi đi và phái cử bạn sang Nhật.', a:0, why:'Bạn học ở JPC, Esuhai là doanh nghiệp phái cử có người đại diện ở Nhật để hỗ trợ bạn.', src:''},
      {t:'Cơ quan Việt Nam cấp phép, kiểm tra doanh nghiệp phái cử. Bạn tra cứu được giấy phép trên trang web chính thức.', a:1, why:'DOLAB là Cục Quản lý lao động ngoài nước, nay thuộc Bộ Nội vụ.', src:L_69},
      {t:'Quản lý, hỗ trợ bạn trong công việc, cuộc sống. Bạn nên liên hệ khi công ty chưa giải quyết được lo lắng của mình.', a:2, why:'Hiệp hội (Nghiệp đoàn) là đơn vị quản lý bạn tại địa phương.', src:L_TTKN},
      {t:'Cơ quan của Nhật giám sát hoạt động của công ty và Hiệp hội, có line tư vấn tiếng Việt.', a:3, why:'OTIT là Tổ chức Thực tập kỹ năng quốc tế. Khi Ikusei Shuro bắt đầu, cơ quan này dự kiến được tổ chức lại, vai trò bảo vệ người lao động vẫn còn.', src:L_TTKN},
      {t:'Nơi bạn làm việc và rèn tay nghề mỗi ngày và thường sắp xếp cả chỗ ở cho bạn cùng Hiệp hội.', a:4, why:'Công ty tiếp nhận là nơi bạn gắn bó nhiều nhất, người hướng dẫn ở đây là người gần bạn nhất.', src:''}
    ]}
]},
a12:{ai:1, t:'Lời mời ở cổng làng', d:'Ba lốt của Hồ Ly trước ngày bay', mins:7, steps:[
  {k:'branch', title:'Lốt 1 · Người quen có đường dây',
    ctx:'Bạn đang tìm hiểu đi Nhật. Chú Tư hàng xóm ở quê nhắn qua Zalo:',
    from:'Chú Tư', sub:'Hàng xóm ở quê',
    msgs:['Chú quen công ty này, đi Nhật bao đậu đi nhanh, 3 tháng là bay.','Con đóng trước 50 triệu tiền giữ suất cho chú, còn lại chú lo hết.','Đừng hỏi bên trung tâm, họ chỉ làm chậm thôi.'],
    flags:['Hứa "bao đậu đi nhanh": không ai hứa được kết quả phỏng vấn ngoài Nhà tuyển dụng','Đóng tiền cho cá nhân, không qua doanh nghiệp, không phiếu thu','Ngăn bạn hỏi nơi chính thức'],
    opts:[
      {t:'Đóng tiền cho chú, lại hứa có giấy tờ đầy đủ nên yên tâm.', ok:0, out:{t:'Ba tháng, rồi sáu tháng…', p:'Chú Tư hẹn hết lần này đến lần khác rồi không nghe máy. Khoản tiền không có hợp đồng, không có phiếu thu nên rất khó đòi lại. Bạn mất tiền và mất cả thời gian dài đòi lại tiền.'}},
      {t:'Hỏi lại trung tâm, kiểm tra giấy phép doanh nghiệp trên trang của DOLAB.', ok:1, out:{t:'Bạn đi đúng cửa', p:'Doanh nghiệp có giấy phép cho bạn xem đầy đủ các khoản phí trước khi ký, và có người đại diện ở Nhật để hỗ trợ bạn sau này.'}},
      {t:'Đóng trước một nửa cho chú, đợi có kết quả phỏng vấn rồi mới đóng nốt phần còn lại.', ok:0, out:{t:'Một nửa vẫn là mất', p:'Đóng ít hơn không làm con đường này hợp pháp hơn. Một nửa số tiền vẫn nằm trong tay người không có giấy phép, không có trách nhiệm gì với bạn.'}}
    ],
    law:{by:'hau', t:'Luật Việt Nam bảo vệ bạn ngay từ cổng làng.', p:[
      'Doanh nghiệp phái cử phải có giấy phép còn hạn. Bạn tra cứu được trên trang chính thức của DOLAB.',
      'Doanh nghiệp phải công khai, minh bạch các khoản phí trước khi bạn ký hợp đồng. Mức trần tiền dịch vụ do Nhà nước quy định.',
      'Doanh nghiệp không được thuê "cò" trung gian để tuyển người.'],
      src:L_69},
    fix:'Giữ lại mọi tin nhắn, giấy tờ, biên nhận. Báo ngay thầy cô hoặc anh chị Esuhai, và trình báo công an nơi bạn ở.'},
  {k:'branch', title:'Lốt 2 · Người "hỗ trợ" giục ký',
    ctx:'Đến buổi ký hợp đồng. Một người tự giới thiệu là "nhân viên hỗ trợ" gọi điện hẹn bạn café:',
    from:'Anh Long', sub:'Tự giới thiệu là "hỗ trợ hồ sơ"',
    msgs:['Ký nhanh đi em, đọc làm gì cho mất thời gian.','Khoản "phí ưu tiên" này em chuyển khoản riêng cho anh nhé, không ghi vào hợp đồng.','Ai hỏi thì bảo là em tự nguyện.'],
    flags:['Giục ký, ngăn bạn đọc hợp đồng','Khoản tiền nằm ngoài hợp đồng, chuyển vào tài khoản cá nhân','Dặn nói dối nếu có ai hỏi'],
    opts:[
      {t:'Ký luôn, chuyển khoản luôn, không muốn bị cho là khó tính.', ok:0, out:{t:'Ký mà không biết mình ký gì', p:'Bạn không biết mình đã đồng ý điều kiện dừng hợp đồng, bồi thường, giải quyết tranh chấp ra sao. Khoản "phí ưu tiên" thì không ai bảo đảm. Khi có chuyện, bạn không biết dựa vào đâu để bảo vệ mình.'}},
      {t:'Chuyển khoản riêng, nhưng xin anh ấy một tin nhắn xác nhận để làm bằng chứng.', ok:0, out:{t:'Tin nhắn không thay được hợp đồng', p:'Khoản tiền ngoài hợp đồng là khoản không ai chịu trách nhiệm với bạn. Và "nhân viên hỗ trợ" kia có thể không hề là người của doanh nghiệp.'}},
      {t:'Đọc kỹ hợp đồng; khoản tiền ngoài hợp đồng thì hỏi thẳng phòng tư vấn.', ok:1, out:{t:'Cò lộ mặt', p:'Phòng tư vấn xác nhận: không có khoản phí nào ngoài hợp đồng. Người kia không phải nhân viên, sự việc đã được báo lên để cảnh báo các bạn khác.'}}
    ],
    law:{by:'hau', t:'Hợp đồng là tấm khiên quyền lợi đi cùng nghĩa vụ của bạn. Đọc kỹ trước khi ký.', p:[
      'Bạn có quyền xem rõ hợp đồng: điều kiện dừng hợp đồng, giải quyết tranh chấp, bồi thường phải ghi đầy đủ.',
      'Esuhai không thu tiền đặt cọc. Các khoản phí được liệt kê rõ trong hợp đồng phái cử, học viên không phải đóng khoản nào khác.',
      'Thấy dấu hiệu cò mồi, môi giới: báo thầy cô chủ nhiệm hoặc MS tư vấn, anh chị nhân viên Esuhai.'],
      src:L_69},
    fix:'Lỡ chuyển khoản ngoài hợp đồng: chụp lại giao dịch, báo ngay thầy cô và phòng tư vấn Esuhai để kiểm tra.'},
  {k:'branch', title:'Lốt 3 · Giấy tờ "làm nhanh"', real:1,
    ctx:'Công việc bạn thích yêu cầu bằng tốt nghiệp THPT, mà bạn chưa có. Một người trong nhóm Zalo nhắn riêng:',
    from:'Anh Phong', sub:'Nhóm Zalo "Lo hồ sơ đi Nhật"',
    msgs:['Anh làm được bằng cấp 3 y như thật, 5 triệu, 3 ngày có.','Bao nhiêu bạn anh giúp rồi, không ai kiểm tra đâu.'],
    flags:['Giấy tờ "y như thật" nghĩa là giấy tờ giả','"Không ai kiểm tra" là lời của người bán, không phải sự thật','Hồ sơ đi Nhật được xác minh nhiều vòng'],
    opts:[
      {t:'Nói thật với thầy cô, hỏi công việc khác phù hợp hơn hoặc hỏi cần học gì, thời gian học bổ sung.', ok:1, out:{t:'Nói thật để đi đường dài', p:'Thầy cô cùng bạn tìm công việc không yêu cầu bằng đó, hoặc lộ trình học để đủ điều kiện. Chậm hơn một chút, nhưng hồ sơ của bạn là trung thực.'}},
      {t:'Mượn bằng của anh trai rồi sửa lại tên, vì đằng nào mình cũng học hết lớp 12.', ok:0, out:{t:'Sửa giấy tờ cũng là làm giả', p:'Sửa tên trên văn bằng của người khác cũng là làm giả giấy tờ. Khi bị xác minh, bạn mất hồ sơ, còn anh trai cũng bị liên lụy.'}},
      {t:'Làm bằng luôn, chỉ là tờ giấy để đủ hồ sơ; sang Nhật làm việc rồi thì đâu còn ai hỏi lại bằng cấp nữa.', ok:0, out:{t:'Hồ sơ dừng lại', p:'Năm 2025, có một học viên dùng bằng giả. Khi cần xác minh, bạn hẹn lần này lần khác, cuối cùng phải thừa nhận chưa tốt nghiệp. Hồ sơ đi Nhật bị dừng lại. Khai gian trong hồ sơ xin visa còn có thể khiến bạn bị từ chối vào Nhật sau này.'}}
    ],
    law:{by:'hau', t:'Hồ sơ thật mới đưa bạn đi xa.', p:[
      'Làm giả, sửa chữa hay sử dụng giấy tờ, văn bằng giả là hành vi vi phạm pháp luật Việt Nam.',
      'Khai gian trong hồ sơ có thể làm hồ sơ bị dừng, visa bị từ chối, ảnh hưởng cả những lần xin sau.',
      'Chưa đủ điều kiện thì nói thật: thầy cô sẽ cùng bạn tìm con đường phù hợp.'],
      src:'Bộ luật Hình sự Việt Nam 2015, Điều 341 (tội làm giả và sử dụng tài liệu giả của cơ quan, tổ chức)'},
    fix:'Lỡ nộp rồi: nói thật ngay với thầy cô và phòng hồ sơ. Tự nhận sớm luôn nhẹ hơn để bị phát hiện.'}
]},
a13:{ai:1, t:'Kiểm tra giấy biên nhận', d:'Nhìn ra 5 dấu hiệu của tiền đóng sai chỗ', mins:4, steps:[
  {k:'flags', doc:1, intro:'Một bạn học viên khóa trước đưa cho bạn xem tờ giấy này. Có 5 dấu hiệu cho thấy tiền đã đóng sai chỗ. Chạm vào từng dòng đáng ngờ.',
    from:'Giấy biên nhận', sub:'Viết tay',
    segs:[
      {t:'Tôi tên Long, làm hỗ trợ hồ sơ đi Nhật.', f:1, why:'Người nhận là một cá nhân, không phải doanh nghiệp có giấy phép.'},
      {t:'Có nhận của học viên số tiền 50.000.000 đồng.'},
      {t:'Lý do: tiền giữ suất, bao đậu đơn, bay trong 3 tháng.', f:1, why:'Không có khoản phí hợp pháp nào tên là "giữ suất" hay "bao đậu".'},
      {t:'Chuyển khoản vào tài khoản cá nhân của Long.', f:1, why:'Tiền đi Nhật chỉ đóng cho doanh nghiệp phái cử, theo hợp đồng.'},
      {t:'Không hoàn lại trong mọi trường hợp.', f:1, why:'Khoản phí hợp pháp có quy định rõ trong hợp đồng, kể cả khi nào được hoàn trả.'},
      {t:'Ngày 05 tháng 10 năm 2026.'},
      {t:'Ký tên: Long (không cần đóng dấu).', f:1, why:'Không tên doanh nghiệp, không con dấu: bạn không có gì để đòi lại.'}
    ],
    law:{by:'hau', img:'rec', t:'Tiền đi Nhật: đóng cho ai, đóng thế nào?', p:[
      'Chỉ đóng cho doanh nghiệp phái cử có giấy phép, theo đúng các khoản ghi trong hợp đồng.',
      'Luôn nhận phiếu thu có tên và dấu của doanh nghiệp.',
      'Không đóng vào tài khoản cá nhân, không đóng "tiền giữ suất", "tiền bao đậu".'],
      src:L_69}},
  {k:'write', intro:'Viết câu "hộ thân" cho chính mình ở cổng làng: điều bạn muốn luôn nhớ.',
    fields:[{key:'cong', label:'Khi có người hứa "bao đậu, đi nhanh" và đòi tiền trước, tôi sẽ…', ph:'Ví dụ: …không đóng đồng nào, báo ngay cho thầy cô và kiểm tra trên trang DOLAB.', req:1, min:4}],
    opt:{key:'bome', label:'Nếu người đó là họ hàng, bạn sẽ nói gì với bố mẹ?', ph:'Ví dụ: Con biết chú muốn giúp, nhưng con chỉ đóng tiền cho công ty có giấy phép, có hợp đồng và phiếu thu.'}}
]},

/* ===== ẢI 2 · THẺ BÙA ===== */
w2:{ai:2, warm:1, t:'Khởi động 30 giây', d:'Đúng hay sai? Ba câu nhanh', mins:1, steps:[
  {k:'tf', items:[
    {t:'Đi siêu thị gần KTX thì không cần mang thẻ cư trú.', a:false, why:'Bạn có nghĩa vụ luôn mang thẻ cư trú theo người, đi gần hay xa đều vậy.'},
    {t:'Công ty có thể "giữ hộ" thẻ cư trú để bạn khỏi làm mất.', a:false, why:'Không được gửi ai giữ hộ, kể cả công ty hay Hiệp hội. Giữ hộ chiếu, thẻ cư trú của TTS là hành vi vi phạm của đơn vị đó.'},
    {t:'Số My Number cần phải khai báo khi cơ quan có thẩm quyền yêu cầu.', a:true, why:'My Number dùng cho thuế, an sinh xã hội, thiên tai. Không cho người khác biết số này.'}
  ]}
]},
a21:{ai:2, t:'Đọc thẻ cư trú', d:'Mỗi dòng trên thẻ cư trú nói gì với bạn', mins:4, steps:[
  {k:'rcard', intro:'Chạm vào từng ô trên thẻ để đọc ý nghĩa. Có 6 ô, kể cả mặt sau.'},
  {k:'say', who:'tan', mood:'', text:'Ngoài thẻ cư trú, cháu còn có thẻ My Number dùng cho thuế, an sinh xã hội và khi có thiên tai. Từ 14/6/2026, cháu có thể đăng ký "Thẻ cư trú đặc định" gộp hai thẻ làm một. Việc này là tự nguyện, giữ hai thẻ riêng như cũ vẫn được.'}
]},
a22:{ai:2, t:'Ba lời thì thầm', d:'Yêu "Chắc Không Sao" rủ rê ba lần', mins:6, steps:[
  {k:'say', who:'hau', mood:'think', text:'Con yêu này không đội lốt ai cả. Nó nói bằng chính giọng của [Tên] trong đầu. Nghe thấy câu "chắc không sao", hãy dừng lại một nhịp.'},
  {k:'branch', title:'Lời thì thầm 1 · Quên thẻ ở nhà', real:1, foe:'yeu',
    ctx:'Sáng Chủ nhật, bạn đạp xe ra siêu thị cách KTX 10 phút. Ra đến cổng mới nhớ ví để quên trên bàn.',
    whisper:'Gần mà, quay về mất công. Chắc không sao đâu.',
    flags:['Thẻ cư trú phải mang theo người mọi lúc','Cảnh sát hay kiểm tra người đi xe đạp','Mất 20 phút còn hơn mất cả buổi ở đồn cảnh sát'],
    opts:[
      {t:'Đi tiếp, mua nhanh rồi về, chắc không ai hỏi.', ok:0, out:{t:'Cảnh sát hỏi giấy tờ', p:'Ở bãi xe, cảnh sát kiểm tra xe đạp và hỏi giấy tờ. Bạn không có thẻ cư trú. Bạn được đưa về đồn chờ người công ty đến xác nhận. Mất hết một ngày Chủ nhật cuối tuần, công ty phải giải trình nữa.', r:3}},
      {t:'Nhờ bạn cùng phòng chụp ảnh thẻ gửi qua Zalo.', ok:0, out:{t:'Ảnh chụp không phải là thẻ', p:'Luật yêu cầu mang theo thẻ thật. Ảnh chụp không thay được, còn để lộ thông tin cá nhân của bạn trên mạng.', r:3}},
      {t:'Quay về lấy ví rồi mới đi tiếp.', ok:1, out:{t:'Mất thêm 20 phút, yên tâm cả ngày', p:'Bạn đến siêu thị muộn một chút nhưng thoải mái suốt đường đi. Bạn nên để thẻ cư trú, thẻ bảo hiểm, thẻ ngân hàng riêng một ví nhỏ, ra ngoài là mang theo và nhớ giữ cẩn thận.'}}
    ],
    law:{t:'Thẻ cư trú: luôn mang theo người.', p:[
      'Người nước ngoài lưu trú trung, dài hạn phải luôn mang thẻ cư trú và xuất trình khi cảnh sát hoặc nhân viên có thẩm quyền yêu cầu.',
      'Không mang theo thẻ có thể bị phạt tiền đến 200.000 yên.',
      'Không gửi ai giữ hộ, kể cả công ty hay Hiệp hội.'],
      src:L_XNC+', Điều 23 (mang theo thẻ cư trú) và Điều 75-3 (phạt tiền) · '+SRC_SOTAY+', mục 10'},
    fix:'Bị hỏi khi không mang thẻ cư trú theo bên mình: bình tĩnh, nói thật họ tên, tên công ty và số điện thoại người hướng dẫn. Đừng bỏ chạy, đừng khai sai.'},
  {k:'branch', title:'Lời thì thầm 2 · Cho mượn thẻ', real:1, foe:'yeu',
    ctx:'Bạn cùng phòng muốn làm hợp đồng điện thoại trả góp, nhưng thẻ của bạn ấy đang chờ gia hạn. Bạn ấy nhắn:',
    from:'Minh', sub:'Bạn cùng phòng',
    msgs:['Cho tớ mượn thẻ cư trú đi làm hợp đồng điện thoại nhé, mai trả liền.'],
    whisper:'Bạn cùng phòng mà, giúp một lần chắc không sao.',
    flags:['Thẻ mang tên bạn, hợp đồng sẽ đứng tên bạn','Không ai được dùng thẻ cư trú của người khác','Có cách hợp lệ: hỏi người hướng dẫn'],
    opts:[
      {t:'Không cho mượn thẻ; cùng bạn đi hỏi người hướng dẫn cách làm.', ok:1, out:{t:'Người hướng dẫn có cách', p:'Người hướng dẫn giải thích thủ tục, giúp bạn ấy chờ gia hạn xong rồi làm hợp đồng bằng thẻ của chính mình.'}},
      {t:'Cho mượn một buổi thôi, bạn cùng phòng sống chung nên tin được.', ok:0, out:{t:'Thẻ của bạn, hợp đồng của người khác', p:'Hợp đồng điện thoại đứng tên bạn. Vài tháng sau bạn ấy về nước, để lại hóa đơn chưa trả và một số điện thoại đã bị dùng để lừa đảo. Người bị gọi lên làm việc là bạn.', r:3}},
      {t:'Đi cùng bạn ra cửa hàng, đứng tên mình làm hợp đồng giúp.', ok:0, out:{t:'Đứng tên giúp cũng như cho mượn', p:'Bạn là chủ hợp đồng. Mọi khoản nợ, mọi việc số điện thoại đó gây ra đều gắn với tên bạn. Nhượng điện thoại đứng tên mình cho người khác còn là vi phạm luật.', r:3}}
    ],
    law:{t:'Thẻ của ai, người nấy giữ.', p:[
      'Cho người khác mượn thẻ cư trú có thể bị phạt tù đến 1 năm hoặc phạt tiền đến 200.000 yên, và có thể bị trục xuất.',
      'Nhượng điện thoại đứng tên mình cho người khác vi phạm Luật phòng chống sử dụng trái phép điện thoại di động.',
      'Mua điện thoại nên báo trước người chỉ đạo hoặc Hiệp hội (một số Hiệp hội bắt buộc).'],
      src:L_XNC+' · Luật phòng chống sử dụng trái phép điện thoại di động · '+SRC_SOTAY+', mục 9(2) và 10'},
    fix:'Lỡ cho mượn: lấy lại thẻ ngay. Nếu đã làm hợp đồng, báo người hướng dẫn để cùng ra nhà mạng xử lý.'},
  {k:'branch', title:'Lời thì thầm 3 · Việc không được phép làm', real:1, foe:'yeu',
    ctx:'Video nấu món Việt của bạn trên TikTok được 10.000 lượt xem. Một người lạ nhắn:',
    from:'Người lạ', sub:'Tin nhắn TikTok',
    msgs:['Kênh em hay quá, bật chế độ kiếm tiền đi, tháng được vài man đó!'],
    whisper:'Chỉ là quay video thôi, đâu phải đi làm thêm bên ngoài. Chắc không sao.',
    flags:['Tiền từ mạng xã hội là thu nhập','Thẻ cư trú của bạn ghi rõ hạn chế làm việc','Đã có TTS phải về nước vì việc này'],
    opts:[
      {t:'Bật kiếm tiền, chỉ là video vui thôi mà.', ok:0, out:{t:'Thu nhập ngoài tư cách lưu trú', p:'Tiền từ TikTok là thu nhập ngoài công việc thực tập. Đã có bạn TTS phải về nước vì việc này.', r:2}},
      {t:'Không bật kiếm tiền, vẫn đăng video vui như bình thường.', ok:1, out:{t:'Vui vẫn được vui', p:'Bạn vẫn chia sẻ MXH cuộc sống ở Nhật, chỉ không được bật chế độ kiếm tiền. Nhớ thêm điều này nữa: không chụp ảnh, quay phim trong xưởng khi chưa được công ty cho phép.'}},
      {t:'Bật kiếm tiền, nhưng tự đăng ký đóng thuế đầy đủ cho đúng luật.', ok:0, out:{t:'Đóng thuế không làm việc này hợp pháp', p:'Đây đúng là câu một học viên từng hỏi. Câu trả lời: vấn đề không nằm ở thuế, mà ở thẻ cư trú chỉ cho bạn làm một việc. Có đóng thuế cũng không được bật kiếm tiền.', r:2}}
    ],
    law:{t:'Thẻ cư trú ghi rõ: không được làm việc khác ngoài việc đã đăng ký.', p:[
      'Thu nhập ngoài công việc đã đăng ký có thể bị xem là làm việc ngoài tư cách lưu trú: bán hàng online, bật kiếm tiền mạng xã hội, làm thêm.',
      'Thực tập sinh không được tham gia hoạt động buôn bán kiếm lợi nhuận trong thời gian thực tập.',
      'Ikusei Shuro cũng chỉ được làm việc ở nơi đã đăng ký.'],
      src:L_XNC+', Điều 19 (hoạt động ngoài tư cách lưu trú) · '+SRC_SOTAY+', mục 10'},
    fix:'Lỡ bật rồi: tắt ngay, báo người hướng dẫn để được tư vấn cách xử lý. Nói thật sớm luôn tốt hơn để bị phát hiện.'}
]},
a23:{ai:2, t:'Giữ thẻ đúng cách', d:'Mất thẻ thì làm gì, việc nào nên và không nên', mins:4, steps:[
  {k:'order', intro:'Lỡ làm mất thẻ cư trú. Chạm vào các việc theo đúng thứ tự cần làm.',
    items:['Báo ngay người hướng dẫn ở công ty','Đến đồn cảnh sát khai báo mất đồ, nhận giấy xác nhận','Chuẩn bị hộ chiếu, 1 ảnh thẻ 4×3 và giấy xác nhận mất','Nộp đơn xin cấp lại tại Cục Quản lý xuất nhập cảnh, trong 14 ngày kể từ khi phát hiện mất'],
    done:'Giấy xác nhận của cảnh sát là một trong những giấy tờ cần nộp khi xin cấp lại. Người hướng dẫn thường sẽ đi cùng bạn.',
    src:L_XNC+' · '+SOTAY24},
  {k:'swipe', labels:{trap:'Không nên', safe:'Nên'}, intro:'Mỗi thẻ là một việc với thẻ cư trú hay My Number. Chọn "Nên" hoặc "Không nên".',
    cards:[
      {t:'Chụp thẻ cư trú gửi cho một trang "Giảm giá siêu thị" để nhận phiếu ưu đãi.', a:'trap', why:'Người lạ tốt bụng quá mức, xin ảnh thẻ cư trú: đây là cách lấy thông tin để làm giấy tờ giả.'},
      {t:'Đọc số My Number cho nhân viên tòa hành chính khi làm thủ tục thuế.', a:'safe', why:'Cơ quan có thẩm quyền yêu cầu thì bạn khai. Ngoài ra không cho ai biết số này.'},
      {t:'Đăng ảnh thẻ cư trú lên Facebook để khoe đã sang Nhật.', a:'trap', why:'Ảnh thẻ trên mạng có thể bị lấy để làm giả, mở tài khoản, ký hợp đồng mang tên bạn.'},
      {t:'Để thẻ cư trú, thẻ bảo hiểm, thẻ ngân hàng chung một ví nhỏ, luôn mang theo và giữ cẩn thận.', a:'safe', why:'Bạn nên ít tiền mặt, đủ giấy tờ và bảo quản cẩn thận.'},
      {t:'Nhờ chị quen trong nhóm đồng hương giữ hộ thẻ cho khỏi mất.', a:'trap', why:'Không được gửi thẻ cho ai giữ hộ, kể cả người quen, công ty hay Hiệp hội.'},
      {t:'Chuyển chỗ ở mới thì khai báo địa chỉ ở tòa hành chính trong 14 ngày.', a:'safe', why:'Địa chỉ mới sẽ được ghi vào mặt sau thẻ cư trú.'}
    ], src:L_XNC+' · '+SRC_SOTAY+', mục 10 · '+SOTAY24},
  {k:'write', intro:'Một lời nhắc nhở với chính mình về tấm thẻ bài.',
    fields:[{key:'bua2', label:'Mỗi sáng trước khi ra khỏi KTX, tôi sẽ…', ph:'Ví dụ: …kiểm tra ví nhỏ có đủ thẻ cư trú, thẻ bảo hiểm và thẻ ngân hàng.', req:1, min:4}],
    opt:{key:'tiktok', label:'Bạn muốn chia sẻ gì về cuộc sống ở Nhật trên mạng mà vẫn đúng quy định?', ph:'Ví dụ: Món ăn mình tự nấu, cảnh mùa thu ở gần KTX, mẹo học tiếng Nhật… không quay trong xưởng, không bật kiếm tiền.'}}
]},

/* ===== ẢI 3 · ĐỘNG KÝ TÚC ===== */
w3:{ai:3, warm:1, t:'Khởi động 30 giây', d:'Đúng hay sai? Ba câu nhanh', mins:1, steps:[
  {k:'tf', items:[
    {t:'Bố mẹ sang Nhật thăm thì được ngủ lại KTX vài đêm.', a:false, why:'Người ngoài không được vào ở trong KTX. Hợp đồng thuê nhà ghi rõ số người ở, muốn đón người thân phải theo quy định của công ty.'},
    {t:'Ở Nhật, đủ 18 tuổi là được hút thuốc, uống rượu.', a:false, why:'Ở Nhật phải đủ 20 tuổi. Đã có TTS 18 tuổi bị nhắc nhở vì hút thuốc.'},
    {t:'Phân loại rác sai không đến mức bị phạt nặng, nhưng vẫn có thể bị chủ nhà không cho phép tiếp tục thuê ở.', a:true, why:'Đã có TTS mới sang 1 tháng bị chủ nhà không cho phép tiếp tục ở vì vứt rác sai nhiều lần, trước đó đã ghi rõ trong hợp đồng thuê.'}
  ]}
]},
a31:{ai:3, t:'Ba đêm ở ký túc xá', d:'Ba lần Yêu "Chắc Không Sao" gõ cửa phòng', mins:7, steps:[
  {k:'branch', title:'Đêm 1 · Ngủ nhờ một đêm', real:1, foe:'yeu',
    ctx:'Bạn thân từ tỉnh khác đến thăm, lỡ chuyến tàu cuối lúc 23 giờ. Bạn ấy nhắn:',
    from:'Tuấn', sub:'Bạn thân, làm ở tỉnh khác',
    msgs:['Lỡ tàu rồi, cho tớ ngủ nhờ một đêm nhé, sáng sớm tớ về.'],
    whisper:'Một đêm thôi, ai biết đâu. Chắc không sao.',
    flags:['KTX là nhà công ty thuê, hợp đồng ghi rõ số người ở','Người ngoài không được vào ở','Có thể gọi hỏi người hướng dẫn ngay'],
    opts:[
      {t:'Cho ngủ nhờ, sáng sớm bạn về là được.', ok:0, out:{t:'Chủ nhà biết chuyện', p:'Hàng xóm thấy người lạ ra vào lúc nửa đêm và báo chủ nhà. Hợp đồng thuê nhà ghi rõ bao nhiêu người ở. Công ty bị chủ nhà gọi làm việc, bạn nhận biên bản nhắc nhở.', r:1}},
      {t:'Gọi hỏi người hướng dẫn, rồi giúp bạn tìm chỗ nghỉ gần ga.', ok:1, out:{t:'Bạn vẫn có chỗ ngủ, mình vẫn giữ quy tắc', p:'Người hướng dẫn chỉ một nhà nghỉ nhỏ gần ga. Bạn thân có chỗ ngủ an toàn, còn bạn giữ được lòng tin của công ty.'}},
      {t:'Cho ngủ nhờ nhưng dặn bạn đi nhẹ, nói khẽ và về thật sớm trước 6 giờ.', ok:0, out:{t:'Nói khẽ không đổi được hợp đồng', p:'Dù không ai phàn nàn, việc cho người ngoài ở lại vẫn là vi phạm nội quy và hợp đồng thuê nhà. Lần sau công ty sẽ khó tin bạn.', r:1}}
    ],
    law:{t:'KTX là nhà công ty thuê cho bạn, không phải nhà riêng.', p:[
      'Người ngoài, kể cả người cùng công ty phái cử, không được vào ở trong KTX.',
      'Hợp đồng thuê nhà ghi rõ số người ở. Vi phạm làm công ty khó thuê nhà cho các em Kohai sau này.',
      'Muốn mời người quen đến chơi, phải theo quy định của công ty.'],
      src:NOIQUY+' · hợp đồng thuê nhà'},
    fix:'Lỡ cho ở rồi: báo người hướng dẫn ngay sáng hôm sau, nói thật và xin lỗi. Giấu đi dễ thành chuyện lớn khi bị phát hiện.'},
  {k:'branch', title:'Đêm 2 · Đi chơi xa dịp lễ', real:1, foe:'yeu',
    ctx:'Kỳ nghỉ lễ Obon 5 ngày. Nhóm đồng hương rủ đi Osaka, ngủ lại nhà một người bạn.',
    from:'Nhóm Đi Chơi Obon', sub:'Nhóm chat 6 người',
    msgs:['Đi 3 ngày thôi, nộp giấy xin phép làm gì cho phiền.'],
    whisper:'Nghỉ lễ là thời gian của mình. Chắc không sao.',
    flags:['Ngủ lại ở bên ngoài phải xin phép trước','Công ty, Hiệp hội cần biết bạn ở đâu khi có chuyện','Đi xa không báo, mọi người sẽ lo lắng nếu không liên lạc được'],
    opts:[
      {t:'Đi, nhưng gửi bạn cùng phòng địa chỉ, số điện thoại để có chuyện gì còn liên lạc được ngay.', ok:0, out:{t:'Bạn cùng phòng không phải công ty', p:'Công ty và Hiệp hội vẫn không biết bạn ở đâu. Có anh chị đi chơi bị tai nạn, phải tự trả gần 50 triệu viện phí vì đã vi phạm quy định đi chơi không xin phép.', r:1}},
      {t:'Đi luôn, nghỉ lễ là thời gian riêng của mình.', ok:0, out:{t:'Không ai liên lạc được', p:'Điện thoại hết pin. Công ty và Hiệp hội tìm bạn suốt 3 ngày, lo không biết đi đâu. Ngày về, bạn được mời lên gặp quản lý và nhận biên bản cảnh cáo.', r:1}},
      {t:'Nộp giấy xin phép hoặc nói trước cho công ty và Hiệp hội, ghi rõ địa chỉ, số điện thoại.', ok:1, out:{t:'Đi chơi mà công ty vẫn yên tâm', p:'Công ty dặn vài lưu ý, lưu số điện thoại của bạn. Bạn đi chơi vui và về cũng đúng hẹn.'}}
    ],
    law:{t:'Đi xa, trọ bên ngoài: xin phép trước.', p:[
      'Cần xin phép công ty và Hiệp hội trước khi trọ ở bên ngoài nộp giấy ghi địa chỉ, số điện thoại, lý do.',
      'Không nên ngủ lại phòng của người khác giới.',
      'Đi xa không báo, không ai liên lạc được: Công ty và Hiệp hội rất lo lắng.'],
      src:NOIQUY},
    fix:'Lỡ đi rồi mới nhớ: gọi ngay cho người hướng dẫn, báo bạn đang ở đâu và ngày nào về.'},
  {k:'branch', title:'Đêm 3 · Camera trong phòng', real:1, foe:'yeu',
    ctx:'Bạn nghi bạn cùng phòng hay lục đồ của mình. Trên mạng bán loại camera mini rất rẻ.',
    whisper:'Gắn lén một cái camera, có bằng chứng là xong. Chắc không sao.',
    flags:['Phòng là nơi người khác sinh hoạt riêng tư','Gắn camera phải xin phép công ty và người ở chung','Mâu thuẫn có người hướng dẫn hỗ trợ'],
    opts:[
      {t:'Đối chất thẳng trước mặt cả phòng cho bạn ấy xấu hổ.', ok:0, out:{t:'Từ nghi ngờ thành đánh nhau', p:'Cuộc đối chất thành cãi nhau rồi xô xát. Gây thương tích hay cầm đến dao là bị cho về nước ngay.', r:2}},
      {t:'Cất đồ có giá trị vào tủ có khóa và báo người hướng dẫn để được hỗ trợ.', ok:1, out:{t:'Chuyện được giải quyết đúng cách', p:'Người hướng dẫn nói chuyện riêng với hai bạn và cả phòng thống nhất lại quy tắc. Đồ của bạn an toàn, tình cảm trong phòng không vỡ.'}},
      {t:'Gắn lén camera nhỏ trong phòng để có bằng chứng rõ ràng trước khi nói chuyện.', ok:0, out:{t:'Bằng chứng quay lại chống bạn', p:'Camera có thể ghi cả những hình ảnh nhạy cảm. Gắn camera không xin phép là xâm phạm quyền riêng tư, người bị truy cứu trách nhiệm lại là bạn.', r:3}}
    ],
    law:{t:'Sống chung: tôn trọng riêng tư, giải quyết bằng lời nói.', p:[
      'Tự ý gắn camera nơi người khác sinh hoạt là xâm phạm quyền riêng tư, có thể bị truy cứu trách nhiệm.',
      'Gắn camera phải xin phép công ty và người ở chung, và chỉ đặt ở khu vực sinh hoạt chung.',
      'Cãi nhau, đánh nhau, gây thương tích hay cầm dao: bị cho về nước ngay.'],
      src:NOIQUY},
    fix:'Lỡ gắn rồi: tháo ngay, xóa dữ liệu, báo người hướng dẫn và xin lỗi bạn cùng phòng.'}
]},
a32:{ai:3, t:'Nội quy nhà chung', d:'Căn phòng KTX, việc nên và không nên làm', mins:6, steps:[
  {k:'scene', intro:'Chạm vào từng góc trong căn phòng KTX để xem những nội quy hay gặp.',
    spots:[
      {k:'gen', name:'Lối vào', x:12, y:66, why:'Tháo giày ở lối vào (genkan), xếp gọn. Không đi giày dép vào phòng.'},
      {k:'bep', name:'Bếp', x:37, y:40, why:'Nấu xong tắt bếp ga; ra khỏi phòng kiểm tra lại lần nữa. Hỏa hoạn ở KTX là chuyện rất nghiêm trọng.'},
      {k:'dh', name:'Điều hòa', x:65, y:22, why:'Bật điều hòa thì đóng cửa sổ. Tiền điện hằng tháng chia đều, lãng phí rất dễ thành mâu thuẫn.'},
      {k:'bc', name:'Ban công', x:89, y:34, why:'Phơi đồ gọn gàng, mặc áo đàng hoàng khi ra ban công, nói nhỏ sau 10 giờ tối.'},
      {k:'rac', name:'Góc rác', x:75, y:70, why:'Phân loại rác theo lịch của khu: rác cháy được, không cháy được, chai lọ… Bỏ đúng ngày giờ quy định.'}
    ], src:NOIQUY+' · hợp đồng thuê nhà'},
  {k:'swipe', labels:{trap:'Không nên', safe:'Nên'}, intro:'Mỗi thẻ là một việc ở KTX. Chọn "Nên" hoặc "Không nên".',
    cards:[
      {t:'Đi giày dép vào trong phòng cho nhanh.', a:'trap', why:'Ở Nhật, tháo giày ở lối vào (Genkan) trước khi vào nhà.'},
      {t:'Nuôi một chú mèo nhỏ trong phòng cho đỡ buồn.', a:'trap', why:'Không được nuôi thú vật trong KTX.'},
      {t:'Kiểm tra bếp ga và tàn thuốc trước khi ra khỏi phòng.', a:'safe', why:'Một đốm lửa quên tắt có thể cháy cả dãy nhà. Chú ý nhìn lại bếp đã tắt chưa trước khi khóa cửa.'},
      {t:'Vừa bật điều hòa vừa mở cửa sổ cho thoáng.', a:'trap', why:'Tiền điện, nước, gas bạn tự trả. Đã có hai bạn TTS mâu thuẫn với nhau chỉ vì chuyện tiết kiệm điện.'},
      {t:'Gọi video với gia đình thật to lúc 23 giờ.', a:'trap', why:'Sau 10 giờ tối nên giữ yên lặng. Tiếng ồn là lý do hàng xóm phàn nàn nhiều nhất.'},
      {t:'Tự lắp internet trong phòng cho tiện.', a:'trap', why:'Lắp internet hay truyền hình cáp phải được công ty đồng ý.'},
      {t:'Dọn sạch phòng và phân loại rác trước ngày về nước.', a:'safe', why:'Chi phí dọn dẹp, vứt rác khi về nước TTS phải tự chịu. Để lại phòng sạch cũng là giữ chỗ ở cho Kohai.'}
    ], src:NOIQUY+' · hợp đồng thuê nhà'},
  {k:'age'}
]},
a33:{ai:3, t:'Nhập gia tùy tục', d:'Đọc bài Tikme và viết quy tắc phòng của bạn', mins:7, steps:[
  {k:'tikme', url:'https://tikme.com/kien-thuc/10-dieu-can-biet-truoc-khi-sang-nhat', title:'Văn hóa Nhật Bản: 10 điều cần biết trước khi đi để tránh "sốc văn hóa"', cat:'Tikme · Cuộc sống tại Nhật', mins:9,
    intro:'Đọc kỹ mục 3 (giữ im lặng) và mục 4 (rác), rồi quay lại đây trả lời 3 câu hỏi.',
    qs:[
      {t:'Theo bài viết, nếu phân loại rác sai hoặc bỏ rác sai ngày, chuyện gì thường xảy ra?', o:['Bị phạt tù ngay','Túi rác bị để lại tại chỗ, dán nhãn nhắc nhở','Không ai để ý, miễn là bỏ đúng điểm tập kết rác'], a:1, why:'Đây chủ yếu là chuyện ý thức cộng đồng. Nhưng tái phạm nhiều lần sẽ bị hàng xóm, chủ nhà nhắc nhở.'},
      {t:'Hành vi nào về rác mới thực sự phạm pháp, có thể bị phạt rất nặng?', o:['Bỏ rác sai ngày','Phân loại sai chai nhựa và lon, bị dán nhãn nhắc nhở','Đổ trộm rác, vứt rác bừa bãi nơi công cộng'], a:2, why:'Bài viết nêu mức phạt có thể đến 5 năm tù và/hoặc 10 triệu yên.'},
      {t:'Trên tàu điện, xe buýt, bạn nên làm gì với điện thoại?', o:['Chuyển sang chế độ im lặng, không nghe gọi','Nghe gọi bình thường nhưng nói nhỏ, che miệng lại','Mở loa ngoài xem video'], a:0, why:'Gây ồn nơi công cộng bị xem là thiếu tôn trọng người xung quanh.'}
    ],
    after:'Chuyện rác không chỉ là luật. Có bạn TTS mới sang một tháng đã bị chủ nhà không cho tiếp tục thuê ở vì vứt rác sai. Từ đó, khu nhà ấy ngại cho người nước ngoài thuê luôn.',
    src:'Luật xử lý chất thải Nhật Bản (廃棄物処理法) · '+NOIQUY},
  {k:'write', intro:'Các anh chị đi trước khuyên: ngay những ngày đầu, cả phòng nên thống nhất quy tắc chung để tránh mâu thuẫn.',
    fields:[{key:'phong', label:'Ba quy tắc tôi muốn cả phòng thống nhất ngay tuần đầu là…', ph:'Ví dụ: chia lịch dọn dẹp, giữ yên lặng sau 22 giờ, ai dùng đồ của người khác phải hỏi trước.', req:1, min:6}],
    opt:{key:'mauthuan', label:'Khi có mâu thuẫn với bạn cùng phòng, bạn sẽ mở lời thế nào để không thành cãi nhau?', ph:'Ví dụ: Mình nói chuyện một chút được không? Mình thấy hơi khó chịu khi… Bạn thấy mình nên làm thế nào?'}}
]},

/* ===== ẢI 4 · XƯỞNG RÈN ===== */
w4:{ai:4, warm:1, t:'Khởi động 30 giây', d:'Đúng hay sai? Ba câu nhanh', mins:1, steps:[
  {k:'tf', items:[
    {t:'Thời gian đi đường từ KTX đến xưởng được tính vào giờ làm.', a:false, why:'Thời gian đi đường không tính là giờ làm việc. Giờ làm tiêu chuẩn không quá 8 tiếng/ngày, 40 tiếng/tuần.'},
    {t:'Ngày phép năm có thể đổi thành tiền hoặc bán lại cho bạn.', a:false, why:'Không được quy đổi ngày phép thành lương, không được mua bán ngày phép.'},
    {t:'Bị trưởng ca nhắc vì làm sai quy trình nghĩa là mình đang bị bắt nạt.', a:false, why:'Nhắc nhở về công việc là để bạn tiến bộ: lắng nghe và sửa. Bắt nạt là chuyện khác, phần sau sẽ nói rõ.'}
  ]}
]},
a41:{ai:4, t:'Đọc phiếu lương', d:'Từ tổng thu nhập đến số tiền thực lĩnh', mins:7, steps:[
  {k:'explore', style:'payslip', intro:'Đây là phiếu lương mẫu của một TTS trên Tikme. Chạm vào từng dòng có dấu chấm để hiểu tiền của bạn đi đâu.',
    items:[
      {k:'kb', jp:'基本給', lbl:'Lương cơ bản', val:'170,000', why:'Lương theo hợp đồng, tính từ lương tối thiểu vùng nhân số giờ làm.'},
      {k:'zg', jp:'残業手当', lbl:'Phụ cấp tăng ca', val:'+30,000', why:'Làm quá 8 tiếng/ngày hoặc 40 tiếng/tuần được trả tăng ca, ít nhất 1,25 lần lương giờ.'},
      {k:'pc', jp:'諸手当', lbl:'Phụ cấp khác', val:'+10,000', sub:1},
      {k:'tg', jp:'総支給額', lbl:'Tổng thu nhập', val:'210,000', tot:1, sub:1},
      {k:'st', jp:'所得税', lbl:'Thuế thu nhập', val:'−6,500', why:'Công ty trừ tạm hằng tháng. Cuối năm quyết toán, có người phụ thuộc thì có thể được hoàn lại.'},
      {k:'jm', jp:'住民税', lbl:'Thuế cư trú', val:'−8,500', why:'Tính trên thu nhập năm trước, nên năm đầu thường chưa phải đóng. Từ năm thứ 2 lương thực lĩnh sẽ giảm, hãy chuẩn bị trước.'},
      {k:'kk', jp:'健康保険', lbl:'Bảo hiểm y tế', val:'−10,500', why:'Nhờ khoản này, khi khám chữa bệnh bạn chỉ trả 30% chi phí.'},
      {k:'nk', jp:'厚生年金', lbl:'Bảo hiểm hưu trí (Nenkin)', val:'−18,900', why:'Khoản lớn nhất nhưng không mất: khi về nước được làm thủ tục nhận lại một phần (tính tối đa 5 năm đóng), nộp đơn trong 2 năm sau khi rời Nhật.'},
      {k:'ky', jp:'雇用保険', lbl:'Bảo hiểm thất nghiệp', val:'−1,260', sub:1},
      {k:'ry', jp:'寮費', lbl:'Tiền nhà (KTX)', val:'−20,000', why:'Tiền KTX trừ thẳng vào lương. Điện, nước, gas thường bạn tự trả thêm.'},
      {k:'td', jp:'手取り', lbl:'Thực lĩnh', val:'≈144,340', tot:1, sub:1}
    ],
    done:'Từ 210.000 yên tổng thu nhập, bạn thực lĩnh khoảng 144.340 yên. Hãy tìm hiểu trước cách tính để không bị bất ngờ hay nghĩ mình bị "trừ oan" nhé.',
    src:L_LD+', Điều 32 (giờ làm) và Điều 37 (tiền tăng ca)'},
  {k:'tikme', url:'https://tikme.com/kien-thuc/thue-bao-hiem', title:'Pháp luật & Bảo hiểm tại Nhật: Nắm vững kiến thức, làm chủ cuộc sống', cat:'Tikme · Quy định & Bảo hiểm', mins:8,
    intro:'Đọc mục "Thuế & Bảo hiểm" và "Những điều tuyệt đối KHÔNG được làm", rồi quay lại trả lời 3 câu hỏi.',
    qs:[
      {t:'Trong các khoản bị trừ, khoản nào năm đầu thường chưa phải đóng?', o:['Bảo hiểm y tế','Thuế cư trú (住民税)','Bảo hiểm hưu trí (厚生年金)'], a:1, why:'Thuế cư trú tính trên thu nhập năm trước nên thường bắt đầu trừ từ năm thứ 2.'},
      {t:'Theo bài viết, khi bị công ty đối xử không tốt hoặc nợ lương, sai lầm phổ biến là gì?', o:['Báo OTIT hoặc Hiệp hội','Bỏ trốn vì nghĩ mình không có quyền phản kháng','Ghi chép lại sự việc rồi hỏi người hướng dẫn trước'], a:1, why:'Bỏ trốn làm bạn mất tư cách lưu trú, mất luôn cả sự bảo vệ của pháp luật. Điều nên làm là báo đến đúng kênh.'},
      {t:'Làm "phục vụ quán nhậu" ban đêm ở quán Bar, dù chỉ rửa bát, thì sao?', o:['Được, vì chỉ rửa bát','Được nếu chỉ làm ngày nghỉ và quán trả lương đủ','Vi phạm nghiêm trọng, có thể bị trục xuất'], a:2, why:'TTS không được làm thêm ở bất kỳ đâu, càng không được làm ở quán bar hay nơi giải trí về đêm, kể cả việc phụ như rửa bát.'}
    ],
    after:'Phiếu lương là của bạn. Giữ lại từng tháng để đối chiếu, làm quyết toán thuế và thủ tục nhận lại Nenkin khi về nước.',
    src:L_LD+' · '+L_XNC}
]},
a42:{ai:4, t:'Ba ngã rẽ ở xưởng', d:'Trung thực với công ty, lên tiếng khi bị xâm phạm', mins:7, steps:[
  {k:'branch', img:'clock', title:'Ngã rẽ 1 · Năm phút giờ nghỉ', real:1, foe:'yeu',
    ctx:'Giờ nghỉ trưa, ai ra khỏi xưởng phải chấm công. Bạn đang buồn ngủ, nghĩ: nếu đi vòng qua chỗ hâm đồ ăn trước rồi mới quay lại chấm công sau, mình sẽ có thêm vài phút để ăn và nghỉ trưa.',
    whisper:'Có năm phút thôi, ai mà để ý. Chắc không sao.',
    flags:['Chấm công là lời hứa về thời gian của bạn với công ty','Đồng nghiệp người Nhật để ý rất kỹ','Lòng tin mất rồi rất khó lấy lại'],
    opts:[
      {t:'Chấm công đúng giờ, tranh thủ ngủ trưa trong giờ nghỉ.', ok:1, out:{t:'Giờ nào việc nấy', p:'Bạn nghỉ đủ, vào ca đúng giờ với đồ bảo hộ chỉnh tề. Đồng nghiệp tin bạn, công ty dễ giao việc mới cho bạn.'}},
      {t:'Đi vòng một lần thôi, mai không làm nữa.', ok:0, out:{t:'Một lần thành nhiều lần', p:'Một bạn TTS từng làm đúng như vậy, bị nhắc nhở rồi vẫn tái phạm. Đồng nghiệp bức xúc báo lên công ty, bạn phải viết cam kết không tái phạm.', r:1}},
      {t:'Lấy thêm một gói đồ ăn của công ty, coi như bù cho buổi làm mệt.', ok:0, out:{t:'Từ ăn gian đến mất việc', p:'Một bạn đã lên Kỹ năng đặc định lấy hai gói đồ ăn nhưng chỉ trả tiền gói rẻ. Camera ghi lại, bạn ấy bị giảm lòng tin.', r:0}}
    ],
    law:{t:'Trung thực trong việc nhỏ giữ được việc lớn.', p:[
      'Giờ nghỉ trưa thường 45 đến 60 phút, đủ để ăn và nghỉ. Ngoài giờ đó là giờ làm.',
      'Lấy đồ của công ty, của đồng nghiệp khi chưa được phép là trộm cắp, dù món nhỏ.',
      'Bị sa thải vì hành vi sai trái thì TTS tự trả tiền vé về nước.'],
      src:L_LD+', Điều 34 (giờ nghỉ) · '+L_HS+' (tội trộm cắp)'},
    fix:'Lỡ làm rồi: chủ động xin lỗi người hướng dẫn, nói rõ và hứa không tái phạm. Tự nhận còn hơn để đợi check lại camera.'},
  {k:'branch', title:'Ngã rẽ 2 · Câu nói của Senpai', real:1, foe:'yeu',
    ctx:'Mấy tuần nay, một Senpai trong tổ ngày nào cũng nói trước mặt mọi người: "Chậm thế. Không cho tăng ca nữa. Về nước đi." Bạn thấy rất nặng nề.',
    whisper:'Cứ chịu đựng đi, nói ra lại mất việc. Chắc rồi sẽ qua.',
    flags:['Lời đe dọa lặp lại, dọa cắt tăng ca, đuổi về nước','Khác với nhắc nhở về cách làm việc','Người thực lòng muốn giúp bạn tiến bộ sẽ không đe dọa vậy'],
    opts:[
      {t:'Im lặng chịu đựng, cố làm nhanh hơn.', ok:0, out:{t:'Một năm rưỡi im lặng', p:'Một bạn TTS đã chịu đựng như vậy suốt một năm rưỡi, đến khi không chịu nổi thì đòi chuyển vị trí hoặc về nước. Lúc đó mọi chuyện đã khó gỡ hơn rất nhiều.', r:2}},
      {t:'Đăng bài lên Facebook kể tội công ty để mọi người biết và lên tiếng giúp mình.', ok:0, out:{t:'Chuyện riêng thành chuyện lớn', p:'Bài đăng lan đi, công ty và Hiệp hội biết qua mạng thay vì nghe bạn nói. Chuyện chưa được giải quyết mà bạn còn bị đánh giá thiếu chuyên nghiệp.', r:1}},
      {t:'Báo người hướng dẫn, Hiệp hội hoặc Esuhai.', ok:1, out:{t:'Nói ra đúng người, đúng lúc', p:'Hiệp hội và công ty vào cuộc, xác nhận lời nói đó là không phù hợp và nói chuyện với Senpai. Bạn được lắng nghe, công việc ổn định lại.'}}
    ],
    law:{t:'Không im lặng chịu bị bắt nạt.', p:[
      'Lời nói đe dọa, hạ nhục lặp đi lặp lại như "không cho tăng ca, về nước đi" là lúc Hiệp hội và công ty cần vào cuộc.',
      'Bị nhắc vì làm sai thì lắng nghe và sửa. Bị bắt nạt thì báo cáo sớm, kèm ghi chép cụ thể.',
      'Thấy bạn mình bị bắt nạt, đừng nói "em không làm cùng nên không rõ". Hãy cùng bạn báo cáo vấn đề.'],
      src:'Luật phòng chống quấy rối quyền lực nơi làm việc (パワハラ防止法) · '+L_TTKN+', Điều 49 (quyền tố cáo)'},
    fix:'Nếu đã chịu đựng lâu rồi: vẫn chưa muộn. Kể với anh chị Esuhai, mang theo những gì bạn đã ghi lại.'},
  {k:'branch', title:'Ngã rẽ 3 · Giữ hộ hộ chiếu', real:1, foe:'yeu',
    ctx:'Một buổi sáng, quản lý thu hộ chiếu và thẻ cư trú của cả nhóm TTS, nói là "giữ hộ cho khỏi mất".',
    whisper:'Công ty giữ hộ thì càng an toàn. Chắc không sao.',
    flags:['Thẻ cư trú phải luôn mang theo người','Giữ hộ chiếu, thẻ cư trú của TTS là vi phạm','Có kênh báo cáo, không cần làm căng'],
    opts:[
      {t:'Cả nhóm cùng tự ý nghỉ làm một ngày để công ty thấy mình phản đối việc này.', ok:0, out:{t:'Đúng ý, sai cách', p:'Nghỉ làm không báo là vi phạm nội quy, chuyện giấy tờ chưa được giải quyết mà cả nhóm còn bị nhắc nhở.', r:0}},
      {t:'Lễ phép xin giữ lại thẻ cư trú; nếu không được, báo Hiệp hội hoặc OTIT.', ok:1, out:{t:'Giấy tờ về đúng chủ', p:'Hiệp hội trao đổi với công ty, hộ chiếu và thẻ cư trú được trả lại cho từng người. Bạn không bị đối xử bất lợi vì đã báo cáo.'}},
      {t:'Đưa luôn, công ty bảo gì thì làm nấy.', ok:0, out:{t:'Giấy tờ không còn trong tay bạn', p:'Khi cần đi khám bệnh, bị cảnh sát hỏi giấy tờ hay muốn đổi chỗ thực tập, bạn không có gì trong tay. Giữ giấy tờ của TTS là dấu hiệu nơi làm việc có vấn đề.', r:0}}
    ],
    law:{t:'Hộ chiếu và thẻ cư trú phải ở trong tay bạn.', p:[
      'Lấy hộ chiếu, thẻ cư trú của TTS với lý do giữ hộ là vi phạm Luật thực tập kỹ năng.',
      'TTS được quyền tố cáo vi phạm lên cơ quan chức năng. Công ty, Hiệp hội không được dừng thực tập hay đối xử bất lợi vì việc tố cáo.',
      'Các vi phạm khác cũng cần báo: không trả lương đúng hợp đồng, không trả tăng ca, hạn chế đi lại.'],
      src:L_TTKN+', Điều 48 (cấm giữ hộ chiếu, thẻ cư trú) và Điều 49 (quyền tố cáo); '+L_IKU+' có quy định tương tự · '+SRC_SOTAY+', mục 14'},
    fix:'Lỡ đã nộp rồi: lễ phép xin lại thẻ cư trú để mang theo người, rồi gọi Hiệp hội, Esuhai hoặc đường dây tiếng Việt của OTIT 0120-250-168.'}
]},
a43:{ai:4, t:'Phải trái phân minh', d:'Lỗi của mình, vi phạm của công ty, hay chuyện bình thường?', mins:5, steps:[
  {k:'classify', intro:'Gặp chuyện ở xưởng, hãy tự hỏi: đây là việc mình cần điều chỉnh, việc cần trao đổi lại với công ty, hay chuyện bình thường ở Nhật? Chạm vào nhóm đúng.',
    cats:['Mình cần điều chỉnh','Cần trao đổi lại với công ty','Bình thường ở Nhật'],
    items:[
      {t:'Bị nhắc nhiều lần vì đến muộn 5 phút.', a:0, why:'Đúng giờ là tác phong cơ bản. Lắng nghe và sửa.', src:''},
      {t:'Làm thêm giờ nhưng phiếu lương không tính tiền tăng ca.', a:1, why:'Hỏi lại công ty trước, có thể do nhầm lẫn. Nếu đúng là không trả, đó là vi phạm Luật Tiêu chuẩn lao động: báo Hiệp hội.', src:L_LD+', Điều 37'},
      {t:'Sau một năm, công ty chuyển bạn sang công đoạn khác.', a:2, why:'Công ty thuyên chuyển để bạn học thêm kỹ năng và hỗ trợ Kohai sau này, hãy hợp tác.', src:''},
      {t:'Trêu đồng nghiệp nữ người Nhật chuyện yêu đương dù chị ấy không vui.', a:0, why:'Đây là quấy rối. Đã có trường hợp một đồng nghiệp nữ phải nghỉ làm một tuần vì tinh thần hoảng loạn.', src:''},
      {t:'Công ty cho sang làm ở một công ty khác, cùng công việc thực tập, rồi trả thù lao trực tiếp.', a:1, why:'TTS chỉ được thực tập ở nơi ghi trong kế hoạch thực tập đã được duyệt. Sang chỗ khác dù cùng việc là sai quy định: hãy trao đổi lại với công ty và hỏi Hiệp hội.', src:L_TTKN},
      {t:'Mùa cao điểm, công việc thời vụ có ngày làm hơn 8 tiếng theo lịch đã thông báo.', a:2, why:'Với công việc thời vụ, luật cho phép công ty điều chỉnh giờ làm vào mùa cao điểm.', src:L_LD},
      {t:'Làm hỏng dụng cụ vì không làm theo hướng dẫn.', a:0, why:'Làm hỏng đồ của công ty có thể phải bồi thường. Không hiểu thì hỏi người chỉ đạo đến khi hiểu.', src:''}
    ]},
  {k:'say', who:'tan', mood:'', src:L_TTKN+' · '+L_IKU,
    text:'Có chuyện ở xưởng, cháu hỏi người hướng dẫn trước để chắc mình không hiểu nhầm. Còn chuyện đổi chỗ làm: TTS chỉ chuyển nơi thực tập khi công ty khó khăn hoặc có lý do bất khả kháng, qua Hiệp hội. Với Ikusei Shuro, được chuyển việc theo nguyện vọng khi đã làm ít nhất 1 năm ở nơi đầu tiên, đậu kỳ thi kỹ năng và đạt trình độ tiếng Nhật theo quy định (khoảng A2). Chuyển việc chỉ có lợi khi cháu có định hướng rõ, không phải cứ đổi là lương cao hơn.'},
  {k:'write', intro:'Viết câu hộ thân cho những ngày ở xưởng.',
    fields:[{key:'xuong', label:'Khi gặp chuyện ở xưởng mà chưa rõ lỗi của ai, tôi sẽ…', ph:'Ví dụ: …ghi lại sự việc, hỏi người hướng dẫn trước, nếu là vi phạm thì báo Hiệp hội hoặc Esuhai.', req:1, min:5}],
    opt:{key:'bannat', label:'Nếu thấy một bạn cùng nhóm bị bắt nạt, bạn sẽ làm gì?', ph:'Ví dụ: Mình sẽ hỏi chuyện bạn, đi cùng bạn đến gặp người hướng dẫn, không nói "mình không biết".'}}
]},

/* ===== ẢI 5 · PHỐ PHƯỜNG ===== */
w5:{ai:5, warm:1, t:'Khởi động 30 giây', d:'Đúng hay sai? Ba câu nhanh', mins:1, steps:[
  {k:'tf', items:[
    {t:'Xe đạp bị vứt ở điểm rác thì được mang về dùng.', a:false, why:'Dù xe bị bỏ đi, mang về vẫn bị xem là trộm cắp. Đồ ở điểm rác cũng không được lấy.'},
    {t:'Từ 4/2026, vừa đạp xe vừa dùng điện thoại có thể bị phạt 12.000 yên.', a:true, why:'Từ 1/4/2026, xe đạp áp dụng "vé xanh" với người từ 16 tuổi.'},
    {t:'Xe có tay ga, không cần đạp vẫn chạy thì không cần bằng lái.', a:false, why:'Xe tự chạy bằng ga thường được xếp là xe gắn máy: cần bằng lái, biển số, bảo hiểm.'}
  ]}
]},
a51:{ai:5, t:'Bản đồ phố', d:'Sáu góc phố và bốn biển báo', mins:9, steps:[
  {k:'street', intro:'Chạm vào từng điểm trên bản đồ. Mỗi điểm là một tình huống dựa trên chuyện đã từng xảy ra.',
    spots:[
      {k:'ga', name:'Ga tàu', jp:'駅', x:16, y:30,
        q:'Đi chơi xa, vé tàu đắt. Bạn cùng nhóm rủ đi sát sau người khác để qua cửa soát vé.',
        o:['Đi theo, một lần thôi mà','Mua vé hoặc nạp đủ tiền vào thẻ IC','Mua vé chặng ngắn nhất rồi đi xa hơn'], a:1,
        why:'Trốn vé hay mua vé thiếu đều là gian lận, bị thu tiền phạt nhiều lần giá vé và có thể bị xử lý. Chuyện trốn vé từng khiến người Nhật có định kiến với người Việt.',
        src:'Luật Kinh doanh đường sắt Nhật Bản (鉄道営業法) · '+L_HS+' (tội lừa đảo)'},
      {k:'st', name:'Siêu thị', jp:'スーパー', x:44, y:27,
        q:'Hộp kem dưỡng da 800 yên, quầy đang đông. Yêu thì thầm: "Cho vào túi, ai mà biết."',
        o:['Cho vào túi, lỡ bị hỏi thì nói là mình quên chưa trả','Bóc ra dùng thử rồi đặt lại kệ','Không lấy. Muốn mua thì xếp hàng trả tiền'], a:2,
        why:'Một bạn TTS từng lấy hộp kem ở siêu thị, hai hôm sau cảnh sát đến vì camera ghi lại. Bạn còn bao biện "em lỡ" nên càng bị đánh giá nặng. Trộm cắp thì sẽ bị sa thải và chi phí mua vé về nước phải tự chi trả.',
        src:L_HS+' (tội trộm cắp)'},
      {k:'vu', name:'Ruộng khoai', jp:'畑', x:76, y:24,
        q:'Ruộng khoai bên đường vừa thu hoạch, còn sót nhiều củ. Bạn cùng phòng rủ nhặt về nấu.',
        o:['Nhặt thôi, ruộng thu hoạch xong rồi','Không nhặt; muốn thì hỏi xin chủ ruộng','Nhặt ít thôi, vài củ sót lại thì chủ cũng bỏ đi'], a:1,
        why:'Hai bạn nữ TTS từng bị bắt vì lấy 25 củ khoai trong vườn. Trong tiếng Nhật, "hái trộm" và "ăn cắp" là cùng một chữ: 盗む.',
        src:L_HS+' (tội trộm cắp)'},
      {k:'bien', name:'Bãi biển', jp:'浜', x:60, y:80,
        q:'Bãi biển có nhiều sò, nhiều người đang cào. Bạn cũng muốn bắt một ít.',
        o:['Tìm biển báo, hỏi người địa phương; không chắc thì không bắt','Cào luôn, vì nhiều người địa phương cũng đang cào ngay bên cạnh','Cào một ít ăn tại chỗ'], a:0,
        why:'Ba bạn TTS ở Aichi từng bị cơ quan quản lý giữ vì bắt sò, công ty phải đến bảo lãnh. Nơi đó có biển cấm nhưng các bạn không để ý, lại thấy nhiều người bắt. Nhiều vùng biển có quyền đánh bắt riêng.',
        src:'Luật Thủy sản Nhật Bản (漁業法) và quy định về quyền đánh bắt của địa phương'},
      {k:'de', name:'Đê chắn sóng', jp:'防波堤', x:84, y:66,
        q:'Đầu đê có biển "Cấm vào", nhưng cuối đê câu được cá to. Tuần trước nhóm bạn vào câu vẫn không sao.',
        o:['Vào câu, tuần trước có sao đâu','Vào nhưng mặc áo phao cho chắc','Câu ở khu vực được phép'], a:2,
        why:'Từng có một bạn TTS đi câu ở khu vực cấm bị sóng cuốn và may mắn sống sót. Khu vực bị cấm nghĩa là đã từng có tai nạn. Vào nơi cấm là phạm luật, và có thể rất nguy hiểm.',
        src:'Biển cấm của cơ quan quản lý cảng và chính quyền địa phương'},
      {k:'cv', name:'Công viên', jp:'公園', x:30, y:68,
        q:'Một bé gái khoảng 5 tuổi đứng khóc một mình. Trong túi bạn có kẹo.',
        o:['Cho bé kẹo cho nín khóc, rồi nắm tay dắt bé đi quanh công viên tìm bố mẹ','Đứng gần trông chừng, báo nhân viên hoặc đồn Kōban, không chạm vào bé','Chụp ảnh bé đăng nhóm hỏi ai biết'], a:1,
        why:'Ở Nhật, người lạ cho kẹo, dắt trẻ đi có thể bị xem là đáng ngờ, dù bạn có ý tốt. Cách đúng là báo người có trách nhiệm hoặc cảnh sát. Đăng ảnh trẻ em lên mạng cũng không được.',
        src:''}
    ]},
  {k:'signs', intro:'Bốn biển báo bạn sẽ gặp ngay tuần đầu ở Nhật. Bấm nút loa để nghe cách đọc.',
    items:[
      {k:'tomare', jp:'止まれ', ro:'Tomare', o:['Đi chậm lại, nhường đường cho xe khác','Dừng hẳn lại, kể cả xe đạp, rồi mới đi tiếp','Chỉ ô tô phải dừng hẳn, còn xe đạp thì được đi tiếp'], a:1, why:'Biển tam giác đỏ ngược 止まれ yêu cầu dừng hẳn. Xe đạp cũng phải dừng; không dừng là lỗi vi phạm, có thể bị phạt.'},
      {k:'hodo', jp:'自転車通行可', ro:'Jitensha tsūkō ka', o:['Cấm xe đạp đi vào vỉa hè này','Xe đạp được đi trên vỉa hè này, nhưng phải nhường người đi bộ','Đường dành riêng cho xe đạp, người đi bộ phải tránh sang lề khác'], a:1, why:'Chỉ ở vỉa hè có biển này xe đạp mới được đi, và phải đi chậm, nhường người đi bộ.'},
      {k:'kinshi', jp:'立入禁止', ro:'Tachiiri kinshi', o:['Cấm vào khu vực này','Khu vực đang sửa chữa, vào thì đi nhẹ nhàng','Chỉ cấm vào ban đêm, ban ngày vẫn vào được'], a:0, why:'Biển cấm vào thường đặt ở đê chắn sóng, công trường, ruộng vườn. Vào là vi phạm, và có thể nguy hiểm đến tính mạng.'},
      {k:'churin', jp:'駐輪禁止', ro:'Chūrin kinshi', o:['Cấm đi xe đạp qua đây, phải dắt bộ cho đến hết đoạn','Bãi đỗ xe đạp miễn phí','Cấm đỗ xe đạp ở đây, xe có thể bị thu giữ'], a:2, why:'Đỗ xe đạp ở nơi cấm, xe có thể bị chính quyền thu giữ và bạn phải trả phí để lấy lại.'}
    ], src:'Luật Giao thông đường bộ Nhật Bản (道路交通法) · quy định về đỗ xe đạp của địa phương'}
]},
a52:{ai:5, t:'Hai bánh xe', d:'Xe đạp ở Nhật: tiện, nhưng có luật', mins:8, steps:[
  {k:'vehicles'},
  {k:'branch', title:'Chiếc "xe đạp điện" của anh họ', real:1, foe:'yeu',
    ctx:'Anh họ ở tỉnh bên sắp về nước, bán lại chiếc "xe đạp điện" giá 2 man. Xe có tay ga, không cần đạp vẫn chạy được 30 km/h.',
    from:'Anh họ', sub:'Sắp về nước',
    msgs:['Xe đạp điện thôi em, ở đây ai cũng đi được, không cần bằng lái đâu.'],
    whisper:'Anh họ ở Nhật lâu rồi, chắc không sao.',
    flags:['Xe tự chạy bằng ga, không cần đạp','"Ai cũng đi được" chưa chắc là điều đó đúng luật','Hỏi Hiệp hội trước khi mua chỉ mất có một tin nhắn'],
    opts:[
      {t:'Mua, nhưng chỉ đi đường làng vắng, không đi qua chỗ đông người.', ok:0, out:{t:'Đường vắng vẫn là đường', p:'Cảnh sát tuần tra dừng xe. Đường vắng hay đông thì xe máy không bằng lái vẫn là vi phạm.', r:3}},
      {t:'Mua luôn, rẻ mà tiện.', ok:0, out:{t:'Hơn một tháng lên đồn', p:'Năm 2026, một bạn TTS đi loại xe này bị cảnh sát yêu cầu dừng lại. Bạn bị gọi lên đồn lấy lời khai suốt hơn một tháng, công ty đình chỉ làm việc 5 ngày, ảnh hưởng nhiều đến công việc.', r:3}},
      {t:'Hỏi người hướng dẫn hoặc Hiệp hội trước khi mua.', ok:1, out:{t:'Một tin nhắn, tránh cả tháng rắc rối', p:'Người hướng dẫn giải thích: xe đạp trợ lực phải đạp mới chạy thì không cần bằng; xe tự chạy bằng ga là xe máy. Bạn không mua chiếc xe đó.'}}
    ],
    law:{img:'veh', t:'Xe trợ lực và xe có ga: nhìn giống nhau, luật khác nhau.', p:[
      'Xe đạp trợ lực điện: phải đạp mới chạy, mô tơ chỉ hỗ trợ. Không cần bằng lái.',
      'Xe tự chạy bằng ga, kể cả loại có bàn đạp, thường được xếp là xe gắn máy: cần bằng lái, biển số, bảo hiểm bắt buộc, mũ bảo hiểm.',
      'TTS không được lái xe máy, ô tô khi chưa có bằng lái Nhật. Bằng lái Việt Nam không dùng trực tiếp ở Nhật được.'],
      src:'Luật Giao thông đường bộ Nhật Bản (道路交通法) · Luật Bảo đảm bồi thường tai nạn xe cơ giới (自賠法)'},
    fix:'Lỡ mua rồi: đừng đi, cất xe lại và hỏi ngay người hướng dẫn hoặc Hiệp hội cách xử lý.'},
  {k:'swipe', labels:{trap:'Không nên', safe:'Nên'}, intro:'Luật hai bánh. Chọn "Nên" hoặc "Không nên". Mức phạt là "vé xanh" áp dụng từ 1/4/2026 cho người từ 16 tuổi.',
    cards:[
      {t:'Vừa đạp xe vừa nhắn tin.', a:'trap', why:'Vé xanh 12.000 yên. Gây nguy hiểm còn có thể bị xử lý nặng hơn.'},
      {t:'Đeo tai nghe nghe nhạc khi đạp xe.', a:'trap', why:'Vé xanh 5.000 yên. Bạn không nghe được còi xe và tiếng người xung quanh.'},
      {t:'Chở bạn ngồi phía sau.', a:'trap', why:'Vé xanh 3.000 yên. Xe đạp ở Nhật chỉ dành cho một người.'},
      {t:'Đi trên vỉa hè cho an toàn.', a:'trap', why:'Về nguyên tắc, xe đạp đi dưới lòng đường, phía bên trái. Chỉ đi vỉa hè khi có biển cho phép và phải nhường người đi bộ.'},
      {t:'Đội mũ bảo hiểm khi đi xe đạp.', a:'safe', why:'Luật Nhật yêu cầu người đi xe đạp cố gắng đội mũ bảo hiểm. Nhiều công ty bắt buộc và phát mũ sẵn.'},
      {t:'Đăng ký chống trộm (防犯登録) khi mua hoặc được cho xe.', a:'safe', why:'Đi xe chưa đăng ký tên mình, cảnh sát kiểm tra sẽ nghi là xe trộm. Đăng ký ở cửa hàng khoảng 500 yên.'},
      {t:'Mua bảo hiểm xe đạp.', a:'safe', why:'Nhiều địa phương bắt buộc. Gây tai nạn có thể phải bồi thường số tiền rất lớn.'},
      {t:'Mất xe nhưng không báo, mượn tạm xe bạn đi.', a:'trap', why:'Có bạn mất xe rồi im lặng cho qua, đến khi cảnh sát đối chiếu mới lộ ra, rắc rối hơn nhiều. Báo cảnh sát ngay là cách tự bảo vệ mình.'}
    ], src:'Luật Giao thông đường bộ Nhật Bản (道路交通法; vé xanh cho xe đạp từ 1/4/2026) · Luật về sử dụng xe đạp an toàn (đăng ký chống trộm)'},
  {k:'say', who:'tan', mood:'',
    text:'Xe đạp ở Nhật đều có số khung, đăng ký theo tên người dùng. Năm 2026, một chiếc xe đứng tên Hiệp hội bị người khác dùng để trộm đồ trong siêu thị, vì nhóm TTS hay đổi xe cho nhau mà không báo. Nhớ nhé: Mất xe thì báo cảnh sát ngay. Còn nếu cho, bán hay đổi xe thì báo Hiệp hội.'}
]},
a53:{ai:5, t:'Phép lịch sự nơi công cộng', d:'Bốn từ tiếng Nhật bạn sẽ gặp trên áp phích', mins:5, steps:[
  {k:'classify', intro:'Mỗi hành vi dưới đây thuộc loại nào? Đây là những từ bạn sẽ gặp trên áp phích ở ga tàu và nơi làm việc.',
    cats:['迷惑行為 · Gây phiền nhiễu','ストーカー · Đeo bám','痴漢 · Sàm sỡ','セクハラ · Quấy rối nơi làm việc'],
    items:[
      {t:'Gọi điện, cười đùa ồn ào trên tàu điện.', a:0, why:'Làm phiền người khác nơi công cộng.'},
      {t:'Thích một chị đồng nghiệp, ngày nào cũng chờ ở cổng, nhắn tin liên tục đến tối khuya dù chị không trả lời.', a:1, why:'Theo dõi, chờ đợi, liên lạc liên tục khi người kia không muốn là hành vi đeo bám, có thể bị xử lý theo luật.'},
      {t:'Lợi dụng tàu đông để chạm vào người lạ.', a:2, why:'Chạm vào cơ thể người khác trái ý muốn là tội phạm ở Nhật.'},
      {t:'Ở xưởng, trêu chọc đồng nghiệp nữ chuyện yêu đương dù chị ấy khó chịu.', a:3, why:'Lời nói, yêu cầu mang tính tình dục ở nơi làm việc là quấy rối, dù mình nghĩ chỉ là đùa.'},
      {t:'Chụp lén người khác bằng điện thoại.', a:0, why:'Quay/chụp lén người khác là hành vi bị cấm, có thể bị xử lý hình sự.'}
    ]},
  {k:'say', who:'tan', mood:'serious', src:'Luật quy định về hành vi đeo bám (ストーカー規制法) · Luật Bình đẳng cơ hội việc làm nam nữ (phòng chống quấy rối tình dục nơi làm việc)',
    text:'Ở Nhật, thước đo không phải là "mình chỉ đùa", mà là người kia cảm thấy thế nào. Có bạn TTS trêu một đồng nghiệp nữ lớn tuổi đến mức chị ấy hoảng loạn phải nghỉ một tuần, các Kohai còn cười theo. Cả nhóm bị nhắc nhở, riêng bạn ấy tái phạm và phải về nước. Ở nhà cũng vậy: mặc áo đàng hoàng, đừng cởi trần ngoài ban công.'},
  {k:'write', intro:'Câu "hộ thân" cho những lúc vui quá trớn.',
    fields:[{key:'pho', label:'Khi thấy bạn mình đùa quá trớn với người khác, tôi sẽ…', ph:'Ví dụ: …không cười theo, kéo bạn ra và nhắc nhẹ "người ta không vui đâu".', req:1, min:5}],
    opt:{key:'pho2', label:'Ở phố Nhật, điều gì khiến bạn thấy khác Việt Nam nhất, và bạn sẽ thay đổi thói quen nào?', ph:'Ví dụ: Ở Việt Nam mình hay đi xe trên vỉa hè. Sang Nhật mình sẽ đi dưới lòng đường bên trái và không đeo tai nghe.'}}
]},

/* ===== ẢI 7 · SÒNG ĐỎ ĐEN ===== */
w7:{ai:7, warm:1, t:'Khởi động 30 giây', d:'Đúng hay sai? Ba câu nhanh', mins:1, steps:[
  {k:'tf', items:[
    {t:'Đánh bài ăn tiền với bạn bè qua mạng thì không sao, vì không ở sòng bạc.', a:false, why:'Ở Nhật, đánh bạc ăn tiền là phạm luật, dù qua mạng hay giữa bạn bè, trừ các hình thức Nhà nước cho phép.'},
    {t:'Hiệp hội có thể cấm TTS cho vay mượn tiền và chơi hụi.', a:true, why:'Đây là quy định hoặc nhắc nhở có thể gặp ở các Hiệp hội, vì đã có nhiều TTS vướng vào nợ nần, mâu thuẫn.'},
    {t:'Vay nóng để trả nợ cũ là cách nhanh nhất để thoát nợ.', a:false, why:'Vay nóng chồng thêm lãi lên nợ cũ, đó lại là cách nhanh nhất để nợ không bao giờ hết.'}
  ]}
]},
a71:{ai:7, t:'Vòng xoáy trượt dần', d:'Xem phim của Cảnh sát Tokyo, dừng lại và chọn', mins:22, steps:[
  {k:'video', vid:'ppPxUuyRwSo', title:'Downward Spiral · Vòng xoáy đi xuống',
    intro:'Chú mời cháu xem bộ phim Cảnh sát Thủ đô Tokyo làm cho người nước ngoài. Phim nói tiếng Nhật, có phụ đề tiếng Việt. Xem từng đoạn, rồi chọn xem nhân vật nên làm gì.',
    who:'Minh là du học sinh muốn thành kỹ sư. Dũng là thực tập sinh, bạn cùng quê. Thảo là bạn cùng lớp của Minh.',
    segs:[
      {s:0, e:216, lbl:'Đoạn 1 · Người bạn cùng quê',
        q:'Dũng nói đã bỏ khỏi nơi thực tập, visa hết hạn, xin ở chung với Minh và chia tiền nhà. Minh nên làm gì?',
        o:['Cho ở chung, giúp đồng hương lúc khó khăn','Cho ở tạm vài hôm, đến khi Dũng tìm được việc làm mới thì bảo Dũng chuyển đi','Không cho ở chung; khuyên Dũng liên hệ cơ quan chức năng, và kể với thầy cô'], a:2,
        why:'Trong phim, Minh đồng ý vì thấy Dũng đáng thương. Cho người cư trú bất hợp pháp ở cùng, che giấu họ, cũng là vi phạm Luật Quản lý xuất nhập cảnh. Với TTS, KTX còn không được cho người ngoài vào ở.'},
      {s:216, e:408, lbl:'Đoạn 2 · Thẻ cư trú giả và ván bài',
        q:'Dũng khoe đồ đắt tiền, rủ Minh chơi bài cá cược với nhóm tìm được qua mạng xã hội. Minh nên làm gì?',
        o:['Không chơi, dù chỉ một ván','Chơi thử một ván cho biết','Chỉ ngồi xem, không đặt tiền'], a:0,
        why:'Đánh bạc ăn tiền là phạm luật ở Nhật. Còn thẻ cư trú giả của Dũng bị phát hiện ngay khi nhà tuyển dụng kiểm tra bằng ứng dụng: giấy tờ giả không qua được.'},
      {s:408, e:497, lbl:'Đoạn 3 · Món nợ 50 man',
        q:'Hai người nợ 50 man, bị dọa sẽ bắt bố mẹ trả. Dũng nói có "việc làm thêm kiếm được tiền". Minh nên làm gì?',
        o:['Nghe thử xem là việc gì đã','Vay nóng chỗ khác để trả cho xong, rồi từ từ trả dần','Báo cảnh sát về việc bị đe dọa, kể với thầy cô'], a:2,
        why:'Bị đe dọa đòi nợ là lúc phải gọi cảnh sát. "Việc làm thêm" xuất hiện đúng lúc bạn cùng đường gần như luôn là bẫy. Vay nóng để trả chỉ làm nợ dày thêm.'},
      {s:497, e:548, lbl:'Đoạn 4 · "Bán tài khoản đi"',
        q:'Dũng bảo Minh bán tài khoản ngân hàng vì Minh còn visa hợp lệ, mở được nhiều tài khoản. Minh nghĩ "bán tài khoản là tội phạm" nhưng chỉ nói "để em suy nghĩ". Bạn sẽ nói gì?',
        o:['Từ chối dứt khoát, không bàn thêm','"Để em suy nghĩ" là đủ lịch sự rồi','Bán một tài khoản ít dùng thôi'], a:0,
        why:'Bán, cho mượn tài khoản ngân hàng là phạm luật. Câu "để em suy nghĩ" để ngỏ cửa cho lần rủ sau. Với cái sai đã biết rõ, từ chối ngay mới là tự bảo vệ mình.'},
      {s:548, e:658, lbl:'Đoạn 5 · Lời của Thảo',
        q:'Thảo phát hiện Minh làm thêm quá giờ và gặp chuyện nguy hiểm. Thảo nói sẽ đi cùng Minh đến gặp thầy cô hoặc cảnh sát. Nếu bạn là Minh?',
        o:['"Kệ tớ, không liên quan đến cậu"','Hứa để mai tính','Nhận lời, đi cùng Thảo ngay'], a:2,
        why:'Trong phim, Minh gạt Thảo đi. Minh không hiểu người dám can ngăn mình mới là bạn thật sự. Du học sinh chỉ được làm thêm tối đa 28 giờ/tuần; TTS thì không được làm thêm chỗ nào khác.'},
      {s:658, e:990, lbl:'Đoạn 6 · Kết cục và "Giá như…"', q:''}
    ],
    src:'Video "Downward Spiral" (Phụ đề tiếng Việt), kênh chính thức Cảnh sát Thủ đô Tokyo (警視庁), 2023'}
]},
a72:{ai:7, t:'Giá như lúc đó', d:'Mỗi lần gật đầu là một nấc trượt', mins:5, steps:[
  {k:'order', spiral:1, intro:'Sắp xếp các bước trượt của Minh và Dũng theo đúng thứ tự trong phim.',
    items:['Dũng bỏ nơi thực tập, ở quá hạn visa','Cho người cư trú bất hợp pháp ở chung','Dùng thẻ cư trú giả đi xin việc','Chơi bài ăn tiền qua mạng xã hội','Nợ 50 man, bị dọa bắt bố mẹ trả','Bán tài khoản ngân hàng, đi nhận "tiền bẩn"'],
    done:'Không bước nào trông như một vi phạm lớn. Mỗi lần chỉ là một cái gật đầu nhỏ. Chính vì vậy nó mới là vòng xoáy.',
    src:''},
  {k:'law', law:{t:'Những tội danh nằm trong một bộ phim 16 phút.', p:[
      'Ở quá hạn visa và che giấu người cư trú bất hợp pháp: vi phạm Luật Quản lý xuất nhập cảnh.',
      'Đánh bạc ăn tiền: Phạm tội đánh bạc, còn dùng thẻ cư trú giả: Tội nặng, bị trục xuất.',
      'Bán tài khoản, đi nhận tiền của người bị lừa: Đồng phạm lừa đảo, dù chỉ "đi lấy hộ một gói đồ".'],
      src:L_XNC+' · '+L_HS+' (tội đánh bạc, tội lừa đảo) · Luật phòng chống chuyển giao tiền do phạm tội'}},
  {k:'write', intro:'Phim kết thúc bằng những câu "giá như lúc đó…". Đến lượt bạn.',
    fields:[{key:'gianhu', label:'Giá như lúc đó Minh…', ph:'Ví dụ: …nghe lời Thảo, đi cùng bạn đến gặp thầy cô ngay hôm đó.', req:1, min:5}],
    opt:{key:'gianhu2', label:'Còn bạn thì sao? Điều mà bạn nhất quyết sẽ không làm, không để xảy ra với mình ở Nhật là gì?', ph:'Ví dụ: Mình sẽ không bao giờ phải nói "giá như mình đã từ chối ván bài đầu tiên".'}}
]},
a73:{ai:7, t:'Lão Đỏ Đen', d:'Lô đề, vay nóng và chuyện chơi game', mins:7, steps:[
  {k:'branch', title:'Lô đề trong nhóm đồng hương', real:1, foe:'ngu',
    ctx:'Nhóm chat đồng hương mở "lô đề online". Ai cũng đánh, hôm qua có người trúng 20 man.',
    from:'Nhóm "Anh Em Xa Xứ"', sub:'Nhóm chat 40 người',
    msgs:['Đánh nhỏ cho vui thôi, 1 man có khi về 20 man.','Chuyển khoản cho admin là xong, kín lắm.'],
    flags:['"Đánh nhỏ cho vui" là cách mọi con nợ bắt đầu','Chuyển tiền cho người lạ, không ai bảo đảm','Đánh bạc ăn tiền là phạm luật ở Nhật'],
    opts:[
      {t:'Không tham gia, rời nhóm và báo người hướng dẫn.', ok:1, out:{t:'Lão Đỏ Đen mất một con mồi', p:'Bạn rời nhóm. Vài tháng sau nghe tin admin nhóm bị bắt, nhiều người trong nhóm bị gọi lên làm việc.'}},
      {t:'Đánh thử 1 man, thua thì thôi.', ok:0, out:{t:'"Thua thì thôi" không bao giờ dừng ở 1 man', p:'Năm 2025 một bạn Kỹ năng đặc định mê lô đề, vướng vào tổ chức cờ bạc, phải vay tiền, kể cả dùng giấy tờ cá nhân để vay. Bạn bị cho về nước, gia đình phải gửi một số tiền lớn để giải quyết và lấy lại giấy tờ.', r:4}},
      {t:'Nhờ người khác đánh hộ để mình không phải đứng tên chuyển khoản.', ok:0, out:{t:'Không đứng tên vẫn là đánh bạc', p:'Tiền là của bạn, người hưởng lợi là bạn. Nhờ đánh hộ chỉ kéo thêm một người nữa vào vòng nguy hiểm.', r:3}}
    ],
    law:{t:'Cờ bạc ăn tiền: phát hiện là về nước.', p:[
      'Đánh bạc ăn tiền, kể cả lô đề, cá độ online, là phạm luật ở Nhật. Tổ chức đánh bạc còn bị xử nặng hơn.',
      'TTS chơi cờ bạc lô đề, khi bị phát hiện thì gần như chắc chắn bị cho về nước.',
      'Nợ cờ bạc kéo theo vay nóng, cầm cố giấy tờ, rồi đến lời rủ bán tài khoản.'],
      src:L_HS+', Điều 185 và 186 (tội đánh bạc)'},
    fix:'Lỡ đánh rồi: dừng ngay, không vay mượn thêm tiền đánh "gỡ". Nếu đã nợ hoặc bị đòi tiền, kể ngay với Hiệp hội hoặc Esuhai trước khi nợ lớn thêm.'},
  {k:'calc'},
  {k:'check'}
]},

/* ===== TÂY TRÚC ===== */
f1:{ai:8, t:'Trước ngày về', d:'Thu xếp chu toàn để cửa quay lại luôn mở', mins:4, steps:[
  {k:'swipe', suitcase:1, labels:{trap:'Không nên', safe:'Nên'}, intro:'Còn một tháng nữa là về nước. Việc nào nên làm, việc nào không?',
    cards:[
      {it:'bank', ic:'bank', t:'Ra ngân hàng làm thủ tục đóng tài khoản.', a:'safe', why:'Tài khoản đã đóng thì không ai lợi dụng tên bạn được.'},
      {t:'Bán lại điện thoại kèm SIM đứng tên mình cho đồng hương.', a:'trap', why:'Nhượng điện thoại, SIM đứng tên mình là vi phạm luật. Hãy báo nhà mạng hủy hợp đồng.'},
      {it:'credit', ic:'credit', t:'Trả hết nợ thẻ tín dụng, tiền mua trả góp trước khi bay.', a:'safe', why:'Có TTS về nước còn nợ thẻ 12 man và cố tình không trả. Nợ xấu có thể ảnh hưởng nghiêm trọng đến cơ hội quay lại Nhật.'},
      {t:'Để lại hóa đơn điện, nước chưa trả vì đằng nào cũng về.', a:'trap', why:'Thanh toán đủ mọi khoản trước khi về. Để lại nợ là để lại tiếng xấu cho Kohai và chính mình.'},
      {it:'broom', ic:'broom', t:'Dọn sạch phòng KTX, vứt rác đúng ngày.', a:'safe', why:'Phí dọn dẹp, vứt rác khi về nước TTS tự chịu. Phòng sạch là món quà cho Kohai.'},
      {it:'idcard', ic:'idcard', t:'Nộp lại thẻ cư trú tại sân bay khi rời Nhật hẳn.', a:'safe', why:'Khi rời Nhật mà không quay lại, thẻ cư trú được nộp lại tại cửa khẩu.'},
      {it:'coin', ic:'coin', t:'Làm thủ tục nhận lại tiền hưu trí (Nenkin) trong 2 năm sau khi rời Nhật.', a:'safe', why:'Đây là quyền lợi của bạn: nhận lại một phần tiền hưu trí đã đóng.'},
      {t:'Muốn về sớm thì tự đặt vé bay, không cần báo ai.', a:'trap', why:'Đã có TTS nhận lương tháng đầu rồi tự đặt vé bỏ về, khiến công ty và các bên rất khó xử. Muốn dừng chương trình, hãy nói thẳng với công ty và Esuhai.'}
    ], src:L_XNC+' (nộp lại thẻ cư trú khi rời Nhật) · Luật Bảo hiểm hưu trí phúc lợi (khoản nhận lại một lần) · Luật phòng chống chuyển giao tiền do phạm tội · '+SRC_SOTAY+', mục 9(2)'},
  {k:'say', who:'tan', mood:'', text:'Thu xếp chu toàn trước khi về nước không chỉ là xong một chương trình. Đó là để cánh cửa quay lại Nhật luôn mở cho cháu: Kỹ năng đặc định, Kỹ sư, hay đơn giản là một chuyến du lịch thăm lại công ty cũ.'}
]},
f2:{ai:8, t:'Túi cứu viện', d:'Một tấm thẻ mang theo suốt những năm ở Nhật', mins:4, steps:[
  {k:'sos'}
]},
f3:{ai:8, t:'Trang bí kíp không chữ', d:'Trang cuối cùng do chính bạn viết', mins:5, steps:[
  {k:'say', who:'hau', mood:'think', text:'Trong truyện Tây du ký, khi Thầy trò Đường Tăng mở những quyển kinh mang về, thấy toàn giấy trắng. Trang cuối cùng này phải do chính bạn tự viết, nhắc nhở chính mình…'},
  {k:'write', intro:'Viết trang bí kíp của riêng bạn. Trang này sẽ in trên vé hoàn thành.',
    fields:[{key:'kinh', label:'Ba điều tôi hứa giữ suốt những năm ở Nhật là…', ph:'Ví dụ: Không bao giờ cho mượn thẻ, tài khoản, điện thoại. Nghi ngờ thì hỏi người hướng dẫn trước. Đi đến nơi, về đến chốn để bố mẹ yên lòng.', req:1, min:10}],
    opt:{key:'tang', label:'Ngày về, bạn muốn mang thành quả về tặng ai, và vì sao?', ph:'Ví dụ: Tặng mẹ, vì mẹ đã vay tiền cho mình đi học và chưa từng than một câu.'}}
]},

/* ===== ẢI 6 · HANG HỒ LY ===== */
w6:{ai:6, warm:1, t:'Khởi động 30 giây', d:'Đúng hay sai? Ba câu nhanh', mins:1, steps:[
  {k:'tf', items:[
    {t:'Kẻ lừa đảo thường là người lạ, mình không quen.', a:false, why:'Nhiều vụ anh chị TTS bị lừa bắt đầu từ người quen: bạn học cũ, đồng hương, người yêu qua mạng.'},
    {t:'Nhật Bản an toàn nên không cần cảnh giác như ở Việt Nam.', a:false, why:'Kẻ xấu nhắm vào người mới sang, chưa rành tiếng và luật. An toàn là khi mình biết tự bảo vệ.'},
    {t:'Lời mời càng gấp, càng dặn mình giữ bí mật thì càng đáng ngờ.', a:true, why:'Gấp để bạn không kịp hỏi ai, bí mật để không ai kịp can ngăn.'}
  ]}
]},
a61:{ai:6, t:'Ba lần biến hình', d:'Hồ Ly đội 3 lốt, và cái giá thật của 3 man', mins:9, steps:[
  {k:'say', who:'hau', mood:'think', text:'Trong truyện, Bạch Cốt Tinh hóa thành ba người khác nhau để lừa Đường Tăng. Hồ Ly cũng vậy. Mỗi ngã rẽ, [Tên] hãy chọn một lối. Chọn sai cũng không sao, bạn sẽ thấy hậu quả xảy ra, rồi quay lại chọn tiếp cho đúng.'},
  {k:'branch', title:'Lốt 1 · Người đồng hương tốt bụng', real:1,
    ctx:'Còn 2 tuần nữa là bạn hết thời hạn làm việc và về nước. Anh Hải- quen qua nhóm Facebook "Người Việt xa xứ", từng chở bạn đi mua đồ, nhắn tin:',
    from:'Anh Hải', sub:'Đồng hương · quen 8 tháng',
    msgs:['Em sắp về rồi hả?','Tài khoản ngân hàng với cái điện thoại cũ, em để lại cho anh nhé. Anh trả em 3 man.','Đằng nào em về cũng bỏ. Để lại vừa có tiền, vừa giúp anh.'],
    flags:['Trả tiền cao cho thứ "đằng nào cũng bỏ"','Thứ anh ấy cần là tài khoản và số điện thoại đứng tên bạn','Dùng tình cảm để ép: "Giúp anh"'],
    opts:[
      {t:'Đồng ý. Sắp về rồi, có thêm 3 man mua quà cho bố mẹ cũng tốt.', ok:0, out:{t:'4 tháng sau…', p:'Bạn về Việt Nam với 3 man. Tài khoản đứng tên bạn bị dùng để nhận tiền của một vụ lừa đảo. Cảnh sát Nhật lần theo tên chủ tài khoản. Khi bạn muốn quay lại Nhật để làm việc, hồ sơ không được duyệt.', r:3}},
      {t:'Hỏi anh ấy dùng vào việc gì. Nếu nghe hợp lý thì để lại cho anh ấy.', ok:0, out:{t:'Lý do nào nghe cũng hợp lý', p:'"Anh cần tài khoản để nhận tiền làm thêm thôi." Bạn tin và đưa. Nhưng vấn đề không nằm ở lý do: Cho người khác dùng tài khoản đứng tên mình đã là phạm luật, dù họ dùng vào việc gì.', r:3}},
      {t:'Từ chối. Trước khi về, đóng tài khoản và hủy hợp đồng điện thoại.', ok:1, out:{t:'Bạn về nước nhẹ nhàng', p:'Tài khoản đã đóng, hợp đồng điện thoại đã hủy. Không ai dùng được tên bạn ở Nhật nữa. Cánh cửa quay lại Nhật vẫn rộng mở.'}}
    ],
    law:{t:'Tài khoản, thẻ ngân hàng và điện thoại đứng tên bạn chỉ dành cho bạn.', p:[
      'Bán, cho thuê, cho mượn tài khoản hay thẻ rút tiền là vi phạm Luật phòng chống chuyển giao tiền do phạm tội.',
      'Nhượng điện thoại, SIM đứng tên mình cho người khác là vi phạm Luật phòng chống sử dụng trái phép điện thoại di động.',
      'Sắp về nước? Đóng tài khoản ngân hàng và hủy hợp đồng điện thoại trước khi đi.',
      'Năm 2026, có hai bạn TTS năm thứ hai phải kết thúc thực tập, về nước trước hạn vì cho mượn tài khoản, thế chấp hộ chiếu. Ngay lúc cho mượn là đã vi phạm luật Nhật Bản.'],
      src:'Luật phòng chống chuyển giao tiền do phạm tội (犯罪収益移転防止法), Điều 28 · Luật phòng chống sử dụng trái phép điện thoại di động · '+SRC_SOTAY+', mục 9(2)'},
    fix:'Báo ngay ngân hàng để khóa tài khoản, báo Hiệp hội hoặc Esuhai, rồi đến đồn cảnh sát trình báo. Báo càng sớm, càng dễ chứng minh bạn là người bị lợi dụng.'},
  {k:'branch', title:'Lốt 2 · Người yêu qua mạng', real:1,
    ctx:'Bạn quen Linh qua một ứng dụng hẹn hò được hơn 1 tháng. Hai người nói chuyện mỗi tối, rất hợp nhau. Một hôm Linh nhắn:',
    from:'Linh', sub:'Quen qua ứng dụng hẹn hò',
    msgs:['[Tên] ơi, tớ đặt ít đồ online mà hôm nay có việc bận không ở nhà.','Cho tớ gửi về địa chỉ KTX của cậu nhé. Cậu nhận rồi gửi tiếp giúp tớ.','Tớ gửi cậu 5.000 yên tiền công nha ❤️'],
    flags:['Chưa gặp ngoài đời đã nhờ việc liên quan đến hàng hóa, địa chỉ','Trả tiền công cho một việc quá dễ','Hàng không gửi thẳng cho người đặt mà phải qua tay bạn'],
    opts:[
      {t:'Từ chối nhẹ nhàng, rồi kể chuyện với người hướng dẫn hoặc Esuhai.', ok:1, out:{t:'Hồ Ly lộ mặt', p:'Bị từ chối, Linh giận dỗi rồi biến mất. Người hướng dẫn kể cho bạn: chiêu "quen qua mạng, nhờ nhận hàng" này nhiều anh chị TTS đã gặp.'}},
      {t:'Nhận giúp. Người yêu nhờ mà, lại còn có tiền công nữa.', ok:0, out:{t:'2 tuần sau…', p:'Thùng hàng là đồ mua bằng thẻ tín dụng bị đánh cắp. Cảnh sát đến KTX vì địa chỉ nhận hàng là của bạn. Bạn bị đưa về đồn làm rõ, công ty phải đến bảo lãnh. Còn Linh thì xóa tài khoản.', r:3}},
      {t:'Nhận giúp lần này thôi, và nhất định không lấy tiền công cho đỡ ngại.', ok:0, out:{t:'Một lần là đủ', p:'Không lấy tiền công vẫn là nhận và chuyển hàng giúp một người bạn chưa từng gặp. Chỉ một lần, địa chỉ KTX và tên bạn đã nằm trong hồ sơ vụ việc.', r:3}}
    ],
    law:{t:'Nhận hàng hộ người lạ có thể biến bạn thành đồng phạm.', p:[
      'Giả làm người khác để ký nhận bưu kiện là làm giả chữ ký.',
      'Nhận rồi chuyển tiếp hàng lừa được của người khác có thể bị xem là đồng lõa lừa đảo.',
      'Nói "em không biết bên trong có gì" không giúp bạn thoát trách nhiệm.'],
      src:L_HS+' (tội lừa đảo, tội làm giả văn bản) · '+SRC_SOTAY+', mục 9(2)'},
    fix:'Đừng mở, đừng gửi tiếp. Giữ nguyên tin nhắn và gói hàng, báo ngay công ty hoặc Hiệp hội. Có thể gọi đường dây tư vấn của cảnh sát #9110 (khi chưa khẩn cấp).'},
  {k:'branch', title:'Lốt 3 · Anh làm dịch vụ', real:1,
    ctx:'Bạn đang ở năm thứ nhất, lương chưa nhiều. Trong nhóm Facebook người Việt ở tỉnh, có tài khoản "Việc Thơm" nhắn riêng:',
    from:'Việc Thơm', sub:'Nhắn từ nhóm Facebook',
    msgs:['Cuối tuần rảnh không em? Chạy xe đạp giao hàng quanh ga thôi.','3 man một ngày, trả tiền mặt ngay cuối buổi.','Không cần thẻ cư trú, em nhớ đừng nói với công ty nha.'],
    flags:['Tiền nhiều bất thường cho việc rất nhẹ','Không cần giấy tờ, trả tiền mặt: không có gì để chứng minh','Dặn giấu công ty'],
    opts:[
      {t:'Đi thử một buổi cuối tuần cho biết, không ai biết đâu.', ok:0, out:{t:'Buổi đầu tiên…', p:'Bạn được giao chở mấy thùng hàng. Cảnh sát dừng xe kiểm tra: hàng không rõ nguồn gốc, bạn không giải thích được. Bạn vừa làm việc ngoài tư cách lưu trú, vừa có thể bị xem là đồng phạm.', r:4}},
      {t:'Từ chối, chụp màn hình gửi người hướng dẫn hoặc Esuhai.', ok:1, out:{t:'Một tin nhắn giúp cho cả nhóm phòng tránh', p:'Người hướng dẫn cảm ơn bạn và nhắc cả nhóm TTS trong công ty. Không ai trong nhóm bị kéo vào.'}},
      {t:'Nhận, nhưng chỉ làm ngày nghỉ để không ảnh hưởng công ty.', ok:0, out:{t:'Ngày nghỉ cũng không được', p:'Thẻ cư trú của bạn ghi rõ: không được làm việc ngoài hoạt động đã đăng ký. Ngày làm hay ngày nghỉ đều như nhau. Bật kiếm tiền TikTok hay bán hàng online cũng bị tính là thu nhập ngoài.', r:2}}
    ],
    law:{t:'Thẻ cư trú cho phép bạn làm việc ở đúng một nơi: nơi đã đăng ký.', p:[
      'Làm thêm ở nơi khác là làm việc ngoài tư cách lưu trú: có thể bị phạt tiền đến 2 triệu yên; trường hợp nặng có thể bị phạt tù.',
      'Bỏ nơi làm việc rồi ở lại quá hạn là cư trú bất hợp pháp: có thể bị phạt tù đến 3 năm hoặc phạt tiền đến 3 triệu yên, rồi bị trục xuất.',
      'Quy định này áp dụng cho cả Thực tập sinh và Ikusei Shuro.'],
      src:L_XNC+', Điều 70 (cư trú bất hợp pháp) và Điều 73 (hoạt động ngoài tư cách lưu trú) · '+SRC_SOTAY+', mục 6 và 9'},
    fix:'Lỡ nhận lời rồi thì dừng ngay, chưa đi buổi nào càng tốt. Kể lại thành thật với người hướng dẫn hoặc Esuhai. Nói ra sớm giúp mọi người kịp bảo vệ bạn.'},
  {k:'cost'},
  {k:'say', who:'hau', mood:'cheer', text:'Bạn để ý không? Cả ba lần, Hồ Ly đều không bảo bạn làm việc xấu. Nó chỉ nhờ "giúp một chút", "làm thử một lần"... bằng thứ đứng tên bạn: tài khoản, địa chỉ, sức lao động. Nhớ mẹo này là [Tên] nhìn thấu được nhiều lốt khác nữa!'}
]},
a62:{ai:6, t:'Hỏa nhãn kim tinh', d:'Soi một bài đăng tuyển người, phân biệt bẫy và việc an toàn', mins:5, steps:[
  {k:'flags', intro:'Bài đăng này xuất hiện trong một nhóm Facebook người Việt ở Nhật. Có 5 dấu hiệu bẫy. Chạm vào từng câu đáng ngờ.',
    from:'Hội Việc Làm Người Việt Kansai', sub:'Bài đăng trong nhóm · 2 giờ trước',
    segs:[
      {t:'TUYỂN GẤP', f:1, why:'Ép bạn quyết nhanh, không kịp hỏi ai.'},
      {t:' 5 bạn làm nhà máy thực phẩm ở Osaka.'},
      {t:'Lương 35 man/tháng, việc nhẹ nhàng.', f:1, why:'Gần gấp đôi lương thường mà việc lại "nhẹ". Việc nhẹ lương cao gần như luôn là bẫy.'},
      {t:' Có phòng ở gần ga.'},
      {t:' Không cần thẻ cư trú, không cần hộ chiếu.', f:1, why:'Nơi làm việc hợp pháp luôn phải kiểm tra giấy tờ. Không cần giấy tờ nghĩa là làm chui.'},
      {t:' TTS đang làm ở công ty cũ vẫn nhận.', f:1, why:'Mời TTS bỏ công ty đang làm, tức là rủ bỏ trốn.'},
      {t:' Làm từ thứ Hai đến thứ Sáu.'},
      {t:' Xe đón tận nơi trong đêm, nhắn riêng, không nói với ai.', f:1, why:'Lén lút, giữ bí mật: dấu hiệu của đường dây môi giới bất hợp pháp.'}
    ],
    law:{t:'Đây là lời rủ bỏ trốn, dù không dùng chữ "bỏ trốn".', p:[
      'Bỏ nơi thực tập để làm chỗ khác là vi phạm luật cư trú, sẽ bị cưỡng chế trục xuất.',
      'Lời giới thiệu "việc nhẹ, lương cao" thường không hợp đồng, không bảo hiểm, công việc nguy hiểm.'],
      src:L_XNC+' · '+SRC_SOTAY+', mục 6'}},
  {k:'swipe', intro:'Mỗi thẻ là một việc. Chọn "Bẫy" hoặc "An toàn". Trên điện thoại, bạn có thể quẹt trái (bẫy) hoặc phải (an toàn).',
    cards:[
      {ic:'remit', t:'Gửi tiền về nhà qua công ty chuyển tiền có giấy phép (như DCOM, SBI Remit), có hóa đơn.', a:'safe', why:'Ở Nhật, chỉ ngân hàng và công ty chuyển tiền được cấp phép mới được nhận chuyển tiền ra nước ngoài. Phí cao hơn chút nhưng được pháp luật bảo vệ.'},
      {ic:'cash', t:'Đưa tiền mặt cho người quen chuyển về Việt Nam giúp, tỷ giá cao hơn ngân hàng.', a:'trap', why:'Đây là "chuyển tiền tay ba" qua dịch vụ không phép. Tiền mất thì bạn không đòi được, còn có thể dính vào đường dây rửa tiền.'},
      {ic:'tiktok', t:'Bật chế độ kiếm tiền trên TikTok, Facebook để có thêm thu nhập.', a:'trap', why:'Đó là thu nhập ngoài công việc đã đăng ký. Đã có bạn TTS phải về nước vì việc này.'},
      {ic:'iphone', t:'Mua iPhone giá chỉ một nửa trên Facebook, người bán yêu cầu chuyển khoản trước.', a:'trap', why:'Chiêu bán hàng qua mạng hay gặp: nhận tiền rồi biến mất. Tài khoản nhận tiền thường là tài khoản mua lại của người đã về nước.'},
      {ic:'bank', t:'Trước ngày về nước, ra ngân hàng làm thủ tục đóng tài khoản.', a:'safe', why:'Đúng như Sổ tay TTS của OTIT hướng dẫn. Tài khoản đã đóng thì không ai lợi dụng được.'},
      {ic:'quake', t:'Chia sẻ ngay bài "Động đất lớn, sắp có sóng thần" từ một trang lạ trên Facebook.', a:'trap', why:'Năm nào cũng có tin động đất giật tít, dùng ảnh cũ để câu like. Tin quan trọng hãy kiểm tra với Hiệp hội hoặc trang chính thức trước khi tin và chia sẻ.'},
      {ic:'idcard', t:'Cho bạn cùng phòng mượn thẻ cư trú để đi làm hợp đồng điện thoại.', a:'trap', why:'Tấm thẻ mang tên bạn: rơi vào tay người khác, nó có thể bị dùng làm giấy tờ giả. Vì vậy luật yêu cầu luôn mang theo thẻ cư trú bên người, không cho mượn, không gửi ai giữ hộ.'}
    ], src:'Luật Ngân hàng và Luật Dịch vụ thanh toán Nhật Bản (chuyển tiền chỉ qua đơn vị được cấp phép) · '+L_XNC+' · '+SRC_SOTAY+', mục 9(2) và 10'}
]},
a63:{ai:6, t:'Kế hộ thân', d:'Biết gọi ai khi Hồ Ly tìm đến', mins:4, steps:[
  {k:'channels'},
  {k:'sits', intro:'Mỗi tình huống, chọn những người bạn sẽ liên hệ rồi bấm "Kiểm tra".',
    chips:['Người hướng dẫn ở công ty','Hiệp hội','Esuhai tại Nhật','OTIT 0120-250-168','Cảnh sát 110','Cảnh sát tư vấn #9110','Hỏi nhóm Facebook đồng hương','Im lặng, tự xử lý'],
    sits:[
      {t:'Một người lạ nhắn tin, trả 3 man để mua tài khoản ngân hàng của bạn.', good:[0,1,2], ok:[3,5], bad:[4,6,7], must:[],
        why:'Báo người hướng dẫn, Hiệp hội hoặc Esuhai để họ cảnh báo cả nhóm. Chưa có nguy hiểm trước mắt nên chưa cần gọi 110.'},
      {t:'Bạn lỡ nhận giúp một thùng hàng lạ. Người gửi đang giục bạn gửi tiếp.', good:[0,1,2,5], ok:[3], bad:[6,7], must:[],
        why:'Đừng mở, đừng gửi tiếp. Báo công ty hoặc Hiệp hội ngay, có thể gọi #9110 để cảnh sát tư vấn.'},
      {t:'Một nhóm người đến trước cửa KTX đòi nợ người bạn cùng phòng và dọa đánh.', good:[4,0,1,2], ok:[3,5], bad:[6,7], must:[4],
        why:'Bị đe dọa là khẩn cấp: gọi 110 trước. Sau đó báo công ty, Hiệp hội hoặc Esuhai.'}
    ]},
  {k:'write', intro:'Viết câu "hộ thân" cho chính mình: một điều bạn muốn luôn nhớ. Một câu ngắn là đủ.',
    fields:[{key:'bua', label:'Khi có người nhờ mình "giúp một chút" bằng tài khoản, địa chỉ hay giấy tờ của mình, thì tôi sẽ…', ph:'Ví dụ: …từ chối ngay và nhắn cho người hướng dẫn ở công ty.', req:1, min:4}],
    opt:{key:'tuchoi', label:'Nếu người rủ rê là bạn thân, bạn học cùng lớp cũ thì bạn sẽ nói gì để từ chối mà vẫn giữ tình bạn?', ph:'Ví dụ: Tớ quý cậu, nhưng thứ gì đứng tên tớ thì tớ không đưa ai được. Mình cùng hỏi chị Hiệp hội nhé.'}}
]}
};

/* =========================================================
   PHẦN 2b · HỎI NHANH CHÚ TANAKA (trình bày theo kiểu sổ tay hỏi–đáp)
   ========================================================= */
var QA_CH = [
  {k:'the', t:'Thẻ cư trú và giấy tờ', ic:'card'},
  {k:'viec', t:'Công việc và tiền lương', ic:'gear'},
  {k:'ktx', t:'Ký túc xá và sinh hoạt', ic:'house'},
  {k:'pho', t:'Giao thông và nơi công cộng', ic:'bike'},
  {k:'tien', t:'Tiền bạc, lừa đảo, cờ bạc', ic:'fox'},
  {k:'ve', t:'Đi lại và về nước', ic:'peak'},
  {k:'goi', t:'Gặp chuyện: gọi ai?', ic:'phone'}
];
var QA = [
  {c:'the', q:'Đi gần KTX thôi có cần mang thẻ cư trú không?', a:'Có. Ra khỏi nhà là phải mang theo thẻ cư trú, đi gần hay xa đều vậy. Không mang theo có thể bị phạt đến 200.000 yên.', s:'Luật Quản lý xuất nhập cảnh, Điều 23 và Điều 75-3', ai:2},
  {c:'the', q:'Chụp ảnh thẻ cư trú trong điện thoại có thay được thẻ không?', a:'Không. Ảnh chỉ để dự phòng khi lỡ mất thẻ. Ra ngoài phải mang thẻ thật. Đừng gửi ảnh thẻ cho người lạ hay đăng lên mạng.', s:'Luật Quản lý xuất nhập cảnh, Điều 23', ai:2},
  {c:'the', q:'Công ty muốn giữ hộ hộ chiếu, thẻ cư trú thì sao?', a:'Không ai được giữ hộ, kể cả công ty hay Hiệp hội. Lễ phép xin giữ lại; nếu không được, báo Hiệp hội, Esuhai hoặc OTIT. Bạn không bị đối xử bất lợi vì đã báo.', s:'Luật Thực tập kỹ năng, Điều 48 · Luật Ikusei Shuro (quy định tương tự)', ai:4},
  {c:'the', q:'Mất thẻ cư trú phải làm gì?', a:'Báo người hướng dẫn, khai báo mất đồ ở đồn cảnh sát để lấy giấy xác nhận, rồi xin cấp lại tại Cục Quản lý xuất nhập cảnh trong 14 ngày kể từ khi phát hiện mất.', s:'Luật Quản lý xuất nhập cảnh · Sổ tay hướng dẫn cư trú và lao động 2024', ai:2},
  {c:'the', q:'Chuyển chỗ ở có phải khai báo không?', a:'Có, trong 14 ngày tại tòa hành chính nơi ở mới. Đổi số phòng trong cùng tòa nhà cũng phải cập nhật.', s:'Luật Quản lý xuất nhập cảnh (khai báo địa chỉ trong 14 ngày)', ai:2},
  {c:'the', q:'Thẻ cư trú gộp My Number có bắt buộc không?', a:'Không. Từ 14/6/2026 có thể đăng ký thẻ gộp, nhưng việc này là tự nguyện. Giữ hai thẻ riêng như cũ vẫn được.', s:'Luật Quản lý xuất nhập cảnh sửa đổi năm 2024 (hiệu lực 14/6/2026)', ai:2},
  {c:'viec', q:'Bật kiếm tiền TikTok nhưng tự đăng ký đóng thuế thì có được không?', a:'Không. Vấn đề không nằm ở thuế mà ở thẻ cư trú: bạn chỉ được làm việc đã đăng ký. Chia sẻ cuộc sống thì được, bật kiếm tiền thì không.', s:'Luật Quản lý xuất nhập cảnh, Điều 19', ai:2},
  {c:'viec', q:'Cuối tuần làm thêm ở chỗ khác có được không?', a:'Không. TTS và Ikusei Shuro chỉ làm ở nơi đã đăng ký. Làm thêm chỗ khác là làm việc ngoài tư cách lưu trú, có thể bị phạt tù đến 1 năm hoặc phạt tiền đến 2 triệu yên.', s:'Luật Quản lý xuất nhập cảnh, Điều 19 và Điều 73', ai:6},
  {c:'viec', q:'Vì sao sang năm thứ 2 tiền thực lĩnh lại giảm?', a:'Vì thuế cư trú bắt đầu được trừ. Thuế này tính trên thu nhập năm trước nên năm đầu thường chưa phải đóng.', s:'Luật Thuế địa phương Nhật Bản (地方税法)', ai:4},
  {c:'viec', q:'Tiền hưu trí (Nenkin) bị trừ hằng tháng có mất không?', a:'Không mất hết. Khi về nước, bạn làm thủ tục nhận lại một phần (tính tối đa 5 năm đóng), nộp trong 2 năm sau khi rời Nhật.', s:'Luật Bảo hiểm hưu trí phúc lợi (khoản nhận lại một lần khi rời Nhật)', ai:4},
  {c:'viec', q:'Làm thêm giờ mà không được trả tiền tăng ca thì làm sao?', a:'Ghi lại ngày giờ làm, hỏi người hướng dẫn trước để chắc không hiểu nhầm. Nếu đúng là không được trả, báo Hiệp hội, Esuhai hoặc OTIT.', s:'Luật Tiêu chuẩn lao động, Điều 37', ai:4},
  {c:'viec', q:'Ikusei Shuro có được chuyển việc không?', a:'Được, theo nguyện vọng, khi đã làm ít nhất 1 năm ở nơi đầu tiên, đậu kỳ thi kỹ năng và đạt trình độ tiếng Nhật theo quy định (khoảng A2). TTS thì chỉ chuyển nơi thực tập khi công ty khó khăn hoặc bất khả kháng, qua Hiệp hội.', s:'Luật Ikusei Shuro (hiệu lực 1/4/2027) · Luật Thực tập kỹ năng', ai:4},
  {c:'viec', q:'Bị Senpai nói "về nước đi" nhiều lần, có nên chịu đựng?', a:'Không. Ghi lại cụ thể và báo sớm cho người hướng dẫn, Hiệp hội hoặc Esuhai. Bị nhắc vì làm sai thì lắng nghe và sửa; bị bắt nạt thì không im lặng.', s:'Luật phòng chống quấy rối quyền lực nơi làm việc (パワハラ防止法)', ai:4},
  {c:'ktx', q:'Bố mẹ sang thăm có ngủ lại KTX được không?', a:'Không. Người ngoài không được vào ở trong KTX, hợp đồng thuê nhà ghi rõ số người ở. Muốn đón người thân, hỏi trước quy định của công ty.', s:'Quy định của công ty, Hiệp hội (tùy nơi) · hợp đồng thuê nhà', ai:3},
  {c:'ktx', q:'Đi chơi xa 7 ngày dịp lễ mà không báo có bị coi là bỏ trốn không?', a:'Công ty và Hiệp hội sẽ rất lo vì không liên lạc được với bạn, và đó là vi phạm quy định. Đi xa, trọ ở ngoài cần nộp giấy xin phép trước cho công ty và Hiệp hội.', s:'Quy định của công ty, Hiệp hội (tùy nơi)', ai:3},
  {c:'ktx', q:'18, 19 tuổi có được hút thuốc, uống rượu ở Nhật không?', a:'Không. Ở Nhật phải đủ 20 tuổi mới được hút thuốc (kể cả thuốc lá điện tử) và uống rượu bia.', s:'Luật cấm người dưới 20 tuổi hút thuốc, uống rượu', ai:3},
  {c:'ktx', q:'Nghi bạn cùng phòng lục đồ, có được gắn camera không?', a:'Không tự ý gắn. Camera trong nơi người khác sinh hoạt là xâm phạm quyền riêng tư. Khóa đồ quý và báo người hướng dẫn.', s:'Quy định của công ty, Hiệp hội (tùy nơi)', ai:3},
  {c:'ktx', q:'Vứt rác sai có bị phạt không?', a:'Thường túi rác bị để lại kèm nhãn nhắc nhở. Tái phạm nhiều lần có thể bị chủ nhà không cho tiếp tục thuê ở. Đổ trộm rác, vứt bừa nơi công cộng mới là phạm pháp và bị phạt rất nặng.', s:'Luật xử lý chất thải Nhật Bản (廃棄物処理法)', ai:3},
  {c:'pho', q:'Xe đạp điện có cần bằng lái không?', a:'Xe đạp trợ lực (phải đạp mới chạy) thì không cần. Xe tự chạy bằng ga, không cần đạp, thường là xe gắn máy: cần bằng lái, biển số, bảo hiểm. Không chắc thì hỏi Hiệp hội trước khi mua.', s:'Luật Giao thông đường bộ Nhật Bản', ai:5},
  {c:'pho', q:'Vừa đạp xe vừa dùng điện thoại bị phạt bao nhiêu?', a:'Từ 1/4/2026, phạt "vé xanh" 12.000 yên với người từ 16 tuổi. Đeo tai nghe 5.000 yên, không đèn 5.000 yên, chở người 3.000 yên.', s:'Luật Giao thông đường bộ Nhật Bản (vé xanh từ 1/4/2026)', ai:5},
  {c:'pho', q:'Xe đạp hay đồ người ta bỏ đi có được lấy không?', a:'Không. Lấy xe đạp bỏ đi, đồ ở điểm rác, quả hay rau nhà người khác đều có thể bị xem là trộm cắp.', s:'Bộ luật Hình sự Nhật Bản (tội trộm cắp)', ai:5},
  {c:'pho', q:'Thấy trẻ lạc có nên cho kẹo, dắt đi tìm bố mẹ?', a:'Không nên. Đứng gần trông chừng và báo nhân viên hoặc đồn Kōban. Người lạ cho kẹo, dắt trẻ đi dễ bị xem là đáng ngờ.', s:'', ai:5},
  {c:'pho', q:'Bằng lái xe Việt Nam có dùng được ở Nhật không?', a:'Không dùng trực tiếp được. TTS không được lái xe máy, ô tô khi chưa có bằng lái Nhật.', s:'Luật Giao thông đường bộ Nhật Bản', ai:5},
  {c:'tien', q:'Sắp về nước, có được bán tài khoản ngân hàng, điện thoại không?', a:'Không. Bán, cho mượn tài khoản, nhượng điện thoại đứng tên mình đều phạm luật. Trước khi về hãy đóng tài khoản và hủy hợp đồng điện thoại.', s:'Luật phòng chống chuyển giao tiền do phạm tội, Điều 28', ai:6},
  {c:'tien', q:'Gửi tiền về nhà qua người quen cho tỷ giá tốt có sao không?', a:'Có. Đó là chuyển tiền qua kênh không phép, tiền mất thì không đòi được, còn có thể dính vào rửa tiền. Hãy dùng ngân hàng hoặc công ty chuyển tiền có giấy phép.', s:'Luật Ngân hàng và Luật Dịch vụ thanh toán Nhật Bản', ai:6},
  {c:'tien', q:'Người yêu quen qua mạng nhờ nhận hàng hộ thì sao?', a:'Từ chối. Nhận rồi chuyển tiếp hàng lừa được có thể bị xem là đồng lõa lừa đảo, dù bạn không biết bên trong có gì.', s:'Bộ luật Hình sự Nhật Bản (tội lừa đảo)', ai:6},
  {c:'tien', q:'Chơi bài ăn tiền qua mạng với bạn bè có sao không?', a:'Có. Đánh bạc ăn tiền là phạm luật ở Nhật, kể cả lô đề, cá độ online. TTS bị phát hiện thì gần như chắc chắn về nước.', s:'Bộ luật Hình sự Nhật Bản, Điều 185 (tội đánh bạc)', ai:7},
  {c:'tien', q:'Bị đòi nợ, bị đe dọa thì làm gì?', a:'Bị đe dọa thì gọi 110. Sau đó báo Hiệp hội hoặc Esuhai. Đừng vay nóng để trả nợ, đừng cầm cố giấy tờ.', s:'Luật hạn chế lãi suất Nhật Bản · Bộ luật Hình sự (tội cưỡng đoạt)', ai:7},
  {c:'ve', q:'Có được về nước tạm thời để làm đám cưới không?', a:'Về nước tạm thời chỉ được xét trong một số trường hợp như người thân mất hoặc nguy kịch, tối đa 7 ngày. Việc riêng khác phải trao đổi trước với công ty, Hiệp hội và Esuhai.', s:'Quy định của chương trình thực tập (tùy Hiệp hội, công ty)', ai:3},
  {c:'ve', q:'Đi du lịch nước ngoài trong kỳ nghỉ dài được không?', a:'Phải báo trước với công ty. Công ty có thể từ chối dùng ngày phép theo quy định đã thông báo. Sắp xếp sao cho không ảnh hưởng công việc.', s:'Luật Tiêu chuẩn lao động, Điều 39 (ngày phép năm)', ai:3},
  {c:'ve', q:'Trước khi về nước cần làm những gì?', a:'Đóng tài khoản ngân hàng, hủy hợp đồng điện thoại, trả hết nợ thẻ tín dụng và hóa đơn, dọn sạch phòng, nộp lại thẻ cư trú ở sân bay, làm thủ tục nhận lại Nenkin trong 2 năm.', s:'Luật Quản lý xuất nhập cảnh (nộp lại thẻ cư trú) · Luật phòng chống chuyển giao tiền do phạm tội', ai:8},
  {c:'goi', q:'Báo cáo vượt cấp có bị phạt không?', a:'Thường thì báo từng bước, từ người gần mình nhất. Nhưng bị bạo lực, đe dọa, bị giữ giấy tờ thì bạn được gọi thẳng cảnh sát hoặc OTIT, và không ai được đối xử bất lợi với bạn vì đã báo.', s:'Luật Thực tập kỹ năng, Điều 49 · Luật Ikusei Shuro (quy định tương tự)', ai:6},
  {c:'goi', q:'Đường dây tiếng Việt của OTIT là số nào?', a:'0120-250-168, miễn phí. Thứ Hai đến Thứ Sáu 11:00–19:00, Thứ Bảy 9:00–17:00. Khẩn cấp: nghe hướng dẫn rồi bấm phím 1.', s:'OTIT (Tổ chức Thực tập kỹ năng quốc tế)', ai:6},
  {c:'goi', q:'Muốn hỏi cảnh sát mà chưa khẩn cấp thì gọi số nào?', a:'Gọi #9110 (đường dây tư vấn của cảnh sát). Khẩn cấp thì gọi 110, cấp cứu và cứu hỏa gọi 119.', s:'Cảnh sát Nhật Bản', ai:6}
];

