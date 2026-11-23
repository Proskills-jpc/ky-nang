/* CD01 · Career Design 1 · cd01/content.js · CHỮ VÀ NỘI DUNG (sửa chữ ở đây, không đụng engine.js)
   Nguyên tắc của khóa:
   1. Career Design là thiết kế, không phải bài kiểm tra: không đúng/sai; lựa chọn nào cũng có được và mất;
      luôn có "Tùy hôm / Chưa chắc" và "Ý khác"; sau khi chọn là lời Senpai, câu hỏi tiếp hoặc link tìm hiểu. Shin không khen chê.
   2. Học viên học trên ĐIỆN THOẠI: câu ngắn, một ý một câu, tiếng Việt tự nhiên. Câu hỏi ≤ 1 dòng rưỡi; lời Shin ≤ 2 câu.
   - [Tên] được thay bằng tên học viên (in đậm).
   - Senpai có cờ draft:1 = LỜI KỂ MẪU do Claude viết, cần thay bằng chuyện thật (ẩn danh) trước khi phát hành.
   ES5. */
var CD_ID = 'cd01';
var CD_VER = 'CD01.1.8';
var CD_TOTAL = 18;            /* Xuất phát (1) + 7 ga (17 chặng). Ga Ước Mơ (3 chặng nghi thức, FIN_ORDER) không tính vào 18 */
var CD_XP_ACT = 30, CD_XP_WARM = 10, CD_INS_WORDS = 20, CD_INS_FIELD = 5;
var TIKME = 'https://tikme.com';

/* ---------- 7 ga + sân ga + Ga Ước Mơ ---------- */
var START = { id: 's0', n: 0, vn: 'Sân ga Xuất phát', k: '出発', kana: 'しゅっぱつ', ro: 'Shuppatsu · Xuất phát', lc: '#2C5BC4', ic: 'rail',
  sub: 'Hiểu chuyến tàu và viết mục tiêu của bạn', acts: ['x1'], card: 1,
  intro: 'Chào [Tên]! Cùng xem chuyến tàu này là gì, rồi viết điều bạn muốn mang về nhé.' };

var STATIONS = [
  { id: 's1', n: 1, vn: 'Ga Nhìn Xa', k: '未来', kana: 'みらい', ro: 'Mirai · Tương lai', lc: '#F07F1E', ic: 'mount', card: 2, ready: 1,
    sub: 'Nhìn mình của 5 năm sau', acts: ['a11', 'a13'], warm: 'w1',
    intro: '5 năm nữa, [Tên] đang ở đâu, làm gì? Cùng nhìn từ chính ngày thường của bạn nhé.',
    done: 'Ô số 2 đã có chữ của bạn.',
    word: { k: '未来', kana: 'みらい', ro: 'mirai', vn: 'tương lai' } },
  { id: 's2', n: 2, vn: 'Ga Biết Mình', k: '自分', kana: 'じぶん', ro: 'Jibun · Bản thân', lc: '#E0567F', ic: 'heart', card: 3, ready: 1,
    sub: 'Bạn thích gì, giỏi gì, coi trọng gì', acts: ['a21', 'a22', 'a23'],
    intro: 'Nghề hợp với [Tên] thường nằm ở chỗ gặp nhau của 3 vòng: <b>việc bạn thích</b>, <b>việc bạn giỏi</b> và <b>điều bạn coi trọng</b>.',
    done: 'Ba vòng tròn của bạn đã có ở ô số 3.',
    word: { k: '自分', kana: 'じぶん', ro: 'jibun', vn: 'bản thân' } },
  { id: 's3', n: 3, vn: 'Ga Tính Cách', k: '性格', kana: 'せいかく', ro: 'Seikaku · Tính cách', lc: '#7A55D3', ic: 'spark', card: 4, ready: 1,
    sub: 'Trắc nghiệm RIASEC, Tikme, chọn nghề', acts: ['a31', 'a32', 'a33'],
    intro: 'Hai bài trắc nghiệm giúp [Tên] nhìn mình từ hai phía. Kết quả chỉ là gợi ý, người chọn nghề vẫn là bạn.',
    done: 'Bạn đã chọn nghề cho chặng đường đầu. Ô số 4 đã điền.',
    word: { k: '性格', kana: 'せいかく', ro: 'seikaku', vn: 'tính cách' }, report: 1 },
  { id: 's4', n: 4, vn: 'Ga Ngành Nghề', k: '仕事', kana: 'しごと', ro: 'Shigoto · Công việc', lc: '#22A05E', ic: 'tool', card: 5, ready: 1,
    sub: 'Hiểu nghề và lộ trình của bạn', acts: ['a42', 'a44', 'a43'], warm: 'w4',
    intro: 'Nghề [Nghề] ngoài đời thật ra sao? [Tên] đoán trước, rồi xem Tikme và Senpai nói gì nhé.',
    done: 'Ô số 5 đã có nghề và lộ trình của bạn.',
    word: { k: '仕事', kana: 'しごと', ro: 'shigoto', vn: 'công việc' } },
  { id: 's5', n: 5, vn: 'Ga Chuyện Trò', k: '対話', kana: 'たいわ', ro: 'Taiwa · Chuyện trò', lc: '#2A74DB', ic: 'chat', card: 6, ready: 1,
    sub: 'Học từ Senpai, tìm người dẫn đường', acts: ['a51', 'a53'],
    intro: 'Người đi trước đã đi con đường [Tên] sắp đi. Cùng nghe họ kể, rồi tập hỏi cho hay nhé.',
    done: 'Ô số 6 đã có Senpai và người dẫn đường của bạn.',
    word: { k: '対話', kana: 'たいわ', ro: 'taiwa', vn: 'trò chuyện' } },
  { id: 's6', n: 6, vn: 'Ga Định Hướng', k: '道のり', kana: 'みちのり', ro: 'Michinori · Chặng đường', lc: '#0F9F98', ic: 'compass', card: 7, ready: 1,
    sub: 'Kế hoạch ở JPC và ở Nhật', acts: ['a62', 'a63'], warm: 'w6',
    intro: 'Bạn đã có nghề và lộ trình. Giờ [Tên] chia thành 2 chặng: ở JPC và ở Nhật, rồi biến thành việc làm mỗi ngày.',
    done: 'Ô số 7 đã có kế hoạch và 2 thói quen của bạn.',
    word: { k: '道のり', kana: 'みちのり', ro: 'michinori', vn: 'chặng đường' } },
  { id: 's7', n: 7, vn: 'Ga Thử Thách', k: '挑戦', kana: 'ちょうせん', ro: 'Chōsen · Thử thách', lc: '#DE3F35', ic: 'flag', card: 8, ready: 1,
    sub: 'Tập dượt tuần đầu, nhận một việc khó', acts: ['a71', 'a72'],
    intro: 'Tuần đầu ở Nhật, ai cũng gặp chuyện bất ngờ. [Tên] tập dượt trước, rồi nhận một việc khó để thử ngay nhé.',
    done: 'Ô số 8 đã điền. Bản Career Design của bạn đủ 8 ô rồi!',
    word: { k: '挑戦', kana: 'ちょうせん', ro: 'chōsen', vn: 'thử thách' } }
];
var FINAL = { id: 's8', n: 8, vn: 'Ga Ước Mơ', k: '夢', kana: 'ゆめ', ro: 'Yume · Ước mơ', lc: '#F2A20F', ic: 'star', ready: 1,
  sub: 'Soát vé, viết lời hứa, nhận Bản Career Design 1 trang', acts: ['a80', 'a81', 'a82'],
  intro: 'Chặng cuối rồi, [Tên]! Qua cổng soát vé, viết lời hứa với mình, rồi nhận Bản Career Design 1 trang nhé.',
  done: 'Bạn đã về đích Career Design 01!',
  word: { k: '夢', kana: 'ゆめ', ro: 'yume', vn: 'ước mơ' } };

/* ---------- Bản Career Design: 8 ô, mỗi ga điền một ô ---------- */
var CARDS = [
  { n: 1, t: 'Mục tiêu của tôi', st: 's0' },
  { n: 2, t: 'Tôi muốn trở thành', st: 's1' },
  { n: 3, t: 'Ba vòng tròn của tôi', st: 's2' },
  { n: 4, t: 'Tính cách và nghề tôi chọn', st: 's3' },
  { n: 5, t: 'Nghề và lộ trình của tôi', st: 's4' },
  { n: 6, t: 'Senpai và người dẫn đường', st: 's5' },
  { n: 7, t: 'Kế hoạch ở JPC và ở Nhật', st: 's6' },
  { n: 8, t: 'Thử thách và việc khó của tôi', st: 's7' }
];

/* ---------- 17 ngành trên Tikme (tikme.com/nganh-nghe/<s>) · r = nhóm RIASEC ngành thường cần (khóa học ước lượng, tham khảo) ---------- */
var INDS = [
  { s: 'co-khi', n: 'Cơ khí', d: 'Tiện, phay, CNC', r: 'RCI' },
  { s: 'dien-tu', n: 'Điện tử', d: 'Lắp ráp, kiểm tra linh kiện', r: 'RCI' },
  { s: 'han', n: 'Hàn', d: 'Hàn kim loại theo bản vẽ', r: 'RC' },
  { s: 'son', n: 'Sơn', d: 'Sơn phủ, hoàn thiện bề mặt', r: 'RCA' },
  { s: 'duc-nhua', n: 'Đúc nhựa', d: 'Vận hành máy ép nhựa', r: 'RC' },
  { s: 'dong-goi-cong-nghiep', n: 'Đóng gói công nghiệp', d: 'Lắp ráp, đóng gói, QC', r: 'CR' },
  { s: 'in-an', n: 'In ấn', d: 'Vận hành máy in', r: 'RCA' },
  { s: 'may-mac', n: 'May mặc', d: 'Cắt may công nghiệp', r: 'RAC' },
  { s: 'xay-dung', n: 'Xây dựng', d: 'Ván khuôn, cốt thép, thi công', r: 'RC' },
  { s: 'o-to', n: 'Ô tô', d: 'Lắp ráp, bảo dưỡng ô tô', r: 'RIC' },
  { s: 'nong-nghiep', n: 'Nông nghiệp', d: 'Nhà kính, trồng trọt', r: 'RC' },
  { s: 'thuy-san', n: 'Thủy sản', d: 'Chế biến hải sản', r: 'RC' },
  { s: 'thuc-pham', n: 'Thực phẩm', d: 'Bánh kẹo, bento, đồ hộp', r: 'RCA' },
  { s: 'dieu-duong', n: 'Kaigo · Chăm sóc', d: 'Chăm sóc người cao tuổi', r: 'SRC' },
  { s: 'nha-hang', n: 'Nhà hàng · Khách sạn', d: 'Phục vụ, bếp, lễ tân', r: 'SEA' },
  { s: 've-sinh-toa-nha', n: 'Vệ sinh tòa nhà', d: 'Giữ tòa nhà sạch chuẩn Nhật', r: 'RC' },
  { s: 'ky-su', n: 'Kỹ sư công nghệ', d: 'IT, tự động hóa (cần bằng ĐH)', r: 'IRC' }
];

/* ---------- CÁ NHÂN HÓA THEO NGHỀ (Ga 4 trở đi) · CD01.0.4 ----------
   Nguồn chính: trang ngành trên tikme.com/nganh-nghe/<mã> (đọc 16/11/2026). Tóm tắt tham khảo, viết gọn cho điện thoại.
   Khóa = mã ngành trong INDS. 'gen' dùng khi học viên chọn "Nghề khác" mà không có ngành gần.
   place: nơi làm (câu khởi động) · grp: nhóm câu khởi động (sx sản xuất, xd xây dựng, nn nông nghiệp, kg kaigo, dv dịch vụ, vs vệ sinh, ks kỹ sư, gen)
   first/firstOpt: tuần đầu (khởi động) · chips: 12 việc để đoán (có việc ít gặp) · real: người mới thường gặp (theo Tikme)
   ph: ví dụ cho 3 ô viết · day: 2 gợi ý "một ngày làm nghề" · r3: thẻ sẵn sàng riêng của nghề (thay thẻ số 4), Senpai = lời kể mẫu */
var INDP = {
  'co-khi': { place: 'xưởng cơ khí', grp: 'sx', firstOpt: 'Đo hàng, vệ sinh máy, xem quy trình',
    first: 'Tuần đầu thường là đo lường, vệ sinh máy, xem quy trình. Đứng máy CNC đến sau, có senpai kèm.',
    chips: ['Đứng máy tiện, phay, CNC', 'Đọc bản vẽ', 'Đo bằng thước cặp, panme', 'Vệ sinh máy, 5S', 'Họp đầu ca', 'Làm theo ca', 'Kiểm tra chất lượng', 'Làm ngoài trời', 'Giao tiếp với khách', 'Mang vác nặng', 'Dùng máy tính cả ngày', 'Tiếng Nhật chuyên ngành'],
    real: ['Đo lường, vệ sinh máy trước', 'Đứng máy CNC sau vài tháng', 'Họp đầu ca 10 phút về an toàn', 'Làm theo ca, 8–10 tiếng kể cả tăng ca'],
    ph: { wow: 'Ví dụ: tháng đầu chủ yếu đo hàng', like: 'Ví dụ: làm ra chi tiết chính xác', worry: 'Ví dụ: sợ đọc bản vẽ chưa hiểu' },
    day: ['Sáng 7 giờ 30, mình họp đầu ca, nhận bản vẽ rồi chỉnh máy CNC. Chiều mình đo kiểm hàng bằng panme.', 'Sáng 7 giờ 30, mình kèm em mới đo hàng, rồi tự gá phôi, chỉnh chương trình NC.'],
    r3: ['Đứng máy cả ca, có tiếng ồn, bụi kim loại', 'Anh khóa trước · ngành cơ khí', 'Tuần đầu về phòng mình mỏi chân lắm. Mình mang giày bảo hộ vừa chân, tối giãn cơ 10 phút. Tuần sau là quen.'] },
  'dien-tu': { place: 'xưởng điện tử', grp: 'sx', firstOpt: 'Gắn linh kiện, kiểm tra bằng mắt',
    first: 'Tuần đầu thường là gắn linh kiện lên bo mạch, hàn thiếc tay, kiểm tra bằng mắt. Đo kiểm chức năng đến sau.',
    chips: ['Gắn linh kiện lên bo mạch', 'Hàn thiếc bằng tay', 'Kiểm tra bằng mắt, kính lúp', 'Đo bằng đồng hồ vạn năng', 'Làm trong phòng sạch', 'Chống tĩnh điện', 'Làm theo ca, có ca đêm', 'Ghi kết quả kiểm tra', 'Làm ngoài trời', 'Mang vác nặng', 'Giao tiếp với khách', 'Tiếng Nhật chuyên ngành'],
    real: ['Gắn linh kiện, hàn tay trước', 'Làm trong phòng sạch, chống tĩnh điện', 'Ngồi hoặc đứng lâu, cần mắt tinh', 'Có thể làm ca đêm, ca luân phiên'],
    ph: { wow: 'Ví dụ: mặc đồ chống tĩnh điện cả ca', like: 'Ví dụ: việc tỉ mỉ, nơi làm sạch sẽ', worry: 'Ví dụ: sợ mỏi mắt vì linh kiện nhỏ' },
    day: ['Sáng 8 giờ, mình mặc đồ chống tĩnh điện, vào phòng sạch gắn linh kiện. Chiều mình đo kiểm, ghi kết quả.', 'Sáng 8 giờ, mình kiểm tra bo mạch trên máy, rồi chỉ em mới cách hàn tay.'],
    r3: ['Ngồi lâu, nhìn linh kiện nhỏ cả ca', 'Chị khóa trước · ngành điện tử', 'Cứ 2 tiếng mình nghỉ 10 phút, nhìn ra xa cho mắt nghỉ. Nhờ vậy cuối ca không còn mỏi mắt.'] },
  'han': { place: 'xưởng hàn', grp: 'sx', firstOpt: 'Gá phôi, mài, hàn tấm đơn giản',
    first: 'Tuần đầu thường là vát mép, gá phôi, mài mối hàn, hàn tấm đơn giản. Hàn TIG, tư thế khó đến sau.',
    chips: ['Hàn bán tự động', 'Gá phôi, vát mép', 'Mài mối hàn', 'Đọc ký hiệu hàn', 'Mặc đồ bảo hộ kín', 'Tự kiểm mối hàn', 'Làm theo ca, tăng ca', 'Có lúc làm ngoài trời', 'Mang vác phôi', 'Giao tiếp với khách', 'Dùng máy tính cả ngày', 'Thi chứng chỉ hàn'],
    real: ['Gá phôi, mài, hàn tấm trước', 'Hàn TIG, tư thế khó đến sau', 'Nóng, có khói và tia hồ quang', 'Đứng lâu, mang vác phôi'],
    ph: { wow: 'Ví dụ: phải tự kiểm mối hàn trước khi giao', like: 'Ví dụ: thấy mối hàn đẹp, chắc tay', worry: 'Ví dụ: sợ nóng và khói hàn' },
    day: ['Sáng 8 giờ, mình mặc đồ bảo hộ, gá phôi rồi hàn khung thép. Chiều mình mài mối hàn và tự kiểm.', 'Sáng 8 giờ, mình hàn TIG chi tiết inox, rồi chỉ em mới cách gá phôi cho thẳng.'],
    r3: ['Xưởng nóng, có khói và tia hồ quang', 'Anh khóa trước · ngành hàn', 'Mùa hè xưởng nóng thật. Mình uống nước đều, giữ đồ bảo hộ kín. Quen rồi thấy an tâm.'] },
  'son': { place: 'xưởng sơn', grp: 'sx', firstOpt: 'Chà nhám, che chắn, sơn lót',
    first: 'Tuần đầu thường là tẩy dầu, chà nhám, che chắn, sơn lót. Phun sơn chính đến sau.',
    chips: ['Chà nhám, tẩy dầu', 'Che chắn trước khi sơn', 'Phun sơn trong buồng', 'Pha màu', 'Đeo mặt nạ lọc', 'Đo độ dày lớp sơn', 'Làm trên giàn giáo', 'Làm theo ca', 'Đứng, cúi nhiều', 'Giao tiếp với khách', 'Dùng máy tính cả ngày', 'Tiếng Nhật chuyên ngành'],
    real: ['Chà nhám, che chắn, sơn lót trước', 'Phun sơn, sấy, đo lớp sơn sau', 'Đeo mặt nạ lọc, đồ bảo hộ kín', 'Sơn công trình thì làm ngoài trời, trên giàn giáo'],
    ph: { wow: 'Ví dụ: chuẩn bị bề mặt lâu hơn phun sơn', like: 'Ví dụ: thấy món đồ đẹp lên sau khi sơn', worry: 'Ví dụ: sợ mùi dung môi' },
    day: ['Sáng 8 giờ, mình chà nhám, che chắn khung xe. Chiều mình phun lớp lót trong buồng sơn.', 'Sáng 8 giờ, mình pha màu theo mẫu, phun lớp phủ rồi đo độ dày lớp sơn.'],
    r3: ['Mùi dung môi, đeo mặt nạ cả ca', 'Anh khóa trước · ngành sơn', 'Lúc đầu đeo mặt nạ thấy bí. Mình chỉnh dây cho vừa, đeo đúng cách. Giờ thấy nhờ nó mà khỏe.'] },
  'duc-nhua': { place: 'xưởng ép nhựa', grp: 'sx', firstOpt: 'Lấy hàng, cắt ba via, kiểm tra',
    first: 'Tuần đầu thường là lấy sản phẩm, cắt ba via, kiểm tra bằng mắt, đóng gói. Đứng máy đến sau.',
    chips: ['Lấy sản phẩm ra khỏi máy', 'Cắt ba via', 'Kiểm tra bằng mắt', 'Đóng gói', 'Vận hành máy ép', 'Ghi thông số máy', 'Thay khuôn', 'Làm theo ca, có ca đêm', 'Đứng suốt ca', 'Làm ngoài trời', 'Giao tiếp với khách', 'Dùng máy tính cả ngày'],
    real: ['Lấy hàng, cắt ba via, đóng gói trước', 'Đứng máy, ghi thông số sau', 'Xưởng sạch, việc nào cũng có quy trình', 'Đứng suốt ca, có thể ca đêm'],
    ph: { wow: 'Ví dụ: thao tác nào cũng có quy trình sẵn', like: 'Ví dụ: xưởng sạch, máy hiện đại', worry: 'Ví dụ: sợ đứng cả ca bị mỏi' },
    day: ['Sáng 8 giờ, mình lấy sản phẩm ở máy ép, cắt ba via và kiểm tra. Chiều mình đóng gói, ghi số lượng.', 'Sáng 8 giờ, mình theo dõi máy ép, ghi thông số, rồi cùng tổ thay khuôn.'],
    r3: ['Đứng máy suốt ca, việc lặp lại', 'Chị khóa trước · ngành đúc nhựa', 'Việc lặp lại thì mình đặt mục tiêu nhỏ: hôm nay ít lỗi hơn hôm qua. Thấy vui hơn nhiều.'] },
  'dong-goi-cong-nghiep': { place: 'xưởng đóng gói', grp: 'sx', firstOpt: 'Bọc hàng, dán nhãn, đóng đai',
    first: 'Tuần đầu thường là bọc hàng, dán nhãn, đóng đai theo mẫu, rồi học đo kiện.',
    chips: ['Bọc hàng, dán nhãn', 'Đo, cân kiện hàng', 'Đóng khung gỗ', 'Quấn màng pallet', 'Đóng đai', 'Kiểm đếm hàng', 'Lái xe nâng', 'Tăng ca mùa cao điểm', 'Làm bằng tay nhiều', 'Giao tiếp với khách', 'Dùng máy tính cả ngày', 'Tiếng Nhật chuyên ngành'],
    real: ['Bọc, dán nhãn, đóng đai trước', 'Đo kiện, đóng khung gỗ sau', 'Kho làm theo 5S, có xe nâng', 'Có ca đêm, bận nhất cuối năm'],
    ph: { wow: 'Ví dụ: đóng gói cũng phải đọc bản vẽ', like: 'Ví dụ: hàng gọn đẹp, chắc chắn', worry: 'Ví dụ: sợ mùa cao điểm tăng ca nhiều' },
    day: ['Sáng 8 giờ, mình bọc hàng, dán nhãn theo mẫu. Chiều mình đo kiện, quấn màng pallet.', 'Sáng 8 giờ, mình đóng khung gỗ cho máy lớn, rồi xếp hàng xuất kho.'],
    r3: ['Mùa cao điểm tăng ca nhiều', 'Anh khóa trước · ngành đóng gói', 'Cuối năm tăng ca nhiều. Mình ngủ đủ, ăn sáng đều, Chủ nhật nghỉ hẳn. Qua mùa thấy mình bền hơn.'] },
  'in-an': { place: 'nhà in', grp: 'sx', firstOpt: 'Chuẩn bị giấy, cắt, gấp, đóng gói',
    first: 'Tuần đầu thường là chuẩn bị giấy, pha mực, cắt, gấp, đóng gói. Vài tháng sau mới đứng máy cùng thợ chính.',
    chips: ['Chuẩn bị giấy, pha mực', 'Cắt, gấp, cán màng', 'Lắp bản kẽm', 'So màu tờ in', 'Đứng máy in', 'Kiểm tờ in suốt ca', 'Làm theo ca', 'Đứng lâu', 'Làm ngoài trời', 'Giao tiếp với khách', 'Thiết kế trên máy tính', 'Tiếng Nhật chuyên ngành'],
    real: ['Chuẩn bị giấy, làm sau in trước', 'Đứng máy, so màu sau vài tháng', 'Đứng lâu, cần mắt phân biệt màu', 'Xưởng bao bì có thể chạy hai ca'],
    ph: { wow: 'Ví dụ: phải so màu từng tờ với bài mẫu', like: 'Ví dụ: cầm sản phẩm in đẹp trên tay', worry: 'Ví dụ: sợ nhìn màu chưa chuẩn' },
    day: ['Sáng 8 giờ, mình chuẩn bị giấy, pha mực. Chiều mình đứng máy cùng anh thợ chính, học canh màu.', 'Sáng 8 giờ, mình lắp bản kẽm, chạy thử rồi so màu với bài mẫu.'],
    r3: ['Đứng lâu, nhìn màu cả ca', 'Chị khóa trước · ngành in ấn', 'Lúc đầu mình nhìn màu chưa ra. Anh thợ chính chỉ cách so dưới đèn chuẩn. Ba tháng sau mình tự so được.'] },
  'may-mac': { place: 'xưởng may', grp: 'sx', firstOpt: 'May một công đoạn, hoàn thiện',
    first: 'Tuần đầu thường là may một công đoạn trên máy công nghiệp, hoặc hoàn thiện, kiểm hàng, đóng gói.',
    chips: ['May một công đoạn', 'Là ủi, hoàn thiện', 'Cắt vải', 'Kiểm tra đường may', 'Đóng gói, phân loại', 'Đọc sơ đồ, rập', 'Ngồi máy cả ca', 'Làm giờ hành chính', 'Chạy theo năng suất', 'Làm ngoài trời', 'Giao tiếp với khách', 'Mang vác nặng'],
    real: ['May một công đoạn trước', 'Ngồi máy hoặc đứng chuyền cả ca', 'Cần theo kịp năng suất chuẩn', 'Thường giờ hành chính, ít ca đêm'],
    ph: { wow: 'Ví dụ: phải theo kịp năng suất chuẩn', like: 'Ví dụ: làm ra quần áo đẹp', worry: 'Ví dụ: sợ chưa theo kịp chuyền' },
    day: ['Sáng 8 giờ, mình may tay áo trên chuyền. Chiều mình kiểm đường may, rồi là ủi.', 'Sáng 8 giờ, mình kiểm hàng cuối chuyền, chỉ em mới chỗ còn lỗi.'],
    r3: ['Chạy theo năng suất của chuyền', 'Chị khóa trước · ngành may mặc', 'Mấy tuần đầu mình may chậm hơn chuyền. Chị tổ trưởng chỉ cách cầm vải. Tháng thứ hai mình theo kịp.'] },
  'xay-dung': { place: 'công trường', grp: 'xd', firstOpt: 'Phụ việc, học an toàn trước',
    first: 'Tuần đầu thường là phụ việc ở một nhánh: cốt thép, cốp pha hoặc giàn giáo. Sáng nào cũng khởi động, họp an toàn.',
    chips: ['Khởi động, họp an toàn', 'Buộc cốt thép', 'Dựng cốp pha', 'Lắp giàn giáo', 'Làm ngoài trời', 'Làm trên cao', 'Mang vác vật liệu', 'Đọc bản vẽ thi công', 'Làm theo nhóm', 'Tăng ca mùa cao điểm', 'Dùng máy tính cả ngày', 'Giao tiếp với khách'],
    real: ['Phụ việc ở một nhánh trước', 'Sáng nào cũng họp an toàn KY', 'Làm ngoài trời, trên cao', 'Tăng ca nhiều mùa cao điểm'],
    ph: { wow: 'Ví dụ: an toàn được nhắc mỗi sáng', like: 'Ví dụ: thấy công trình lên từng tầng', worry: 'Ví dụ: sợ nắng nóng, làm trên cao' },
    day: ['Sáng 8 giờ, mình khởi động, họp KY với tổ, rồi buộc cốt thép. Chiều mình dọn vật liệu, kiểm đồ bảo hộ.', 'Sáng 8 giờ, mình đọc bản vẽ, chia việc cho nhóm 3 người, rồi kiểm cốp pha.'],
    r3: ['Làm ngoài trời, nắng nóng, trên cao', 'Anh khóa trước · ngành xây dựng', 'Hè ở Nhật nóng lắm. Mình uống nước theo giờ nghỉ của tổ, đeo dây an toàn đúng cách. Không ai làm liều cả.'] },
  'o-to': { place: 'xưởng ô tô', grp: 'sx', firstOpt: 'Thay dầu, kiểm tra theo danh mục',
    first: 'Tuần đầu thường là kiểm tra theo danh mục, thay dầu, lọc, bugi, kiểm lốp, ghi báo cáo.',
    chips: ['Thay dầu, lọc, bugi', 'Kiểm tra lốp, phanh', 'Ghi báo cáo kỹ thuật', 'Chui gầm xe', 'Dùng máy chẩn đoán lỗi', 'Vệ sinh, di chuyển xe', 'Lắp ráp ở nhà máy', 'Tăng ca mùa đăng kiểm', 'Nâng phụ tùng nặng', 'Giao tiếp với khách', 'Làm ngoài trời cả ngày', 'Tiếng Nhật chuyên ngành'],
    real: ['Bảo dưỡng theo danh mục trước', 'Chẩn đoán lỗi điện tử sau', 'Đứng, cúi nhiều dưới gầm xe', 'Tăng ca nhiều vào mùa đăng kiểm'],
    ph: { wow: 'Ví dụ: sửa xe phải ghi báo cáo từng bước', like: 'Ví dụ: tìm ra lỗi rồi sửa được', worry: 'Ví dụ: sợ chưa hiểu xe hybrid' },
    day: ['Sáng 8 giờ 30, mình nhận xe, kiểm tra theo danh mục, thay dầu. Chiều mình kiểm phanh, ghi báo cáo.', 'Sáng 8 giờ 30, mình dùng máy chẩn đoán xe hybrid, tìm lỗi rồi báo anh tổ trưởng.'],
    r3: ['Chui gầm xe, nâng phụ tùng nặng', 'Anh khóa trước · ngành ô tô', 'Tuần đầu mình chỉ lau xe, đưa đồ nghề. Mình ghi lại từng bước. Tháng thứ hai được tự thay dầu.'] },
  'nong-nghiep': { place: 'trang trại', grp: 'nn', firstOpt: 'Gieo trồng, thu hoạch theo đội',
    first: 'Tuần đầu thường là gieo trồng, chăm cây, thu hoạch theo lịch mùa vụ. Lái máy, quản lý nhà màng đến sau.',
    chips: ['Gieo trồng, chăm cây', 'Thu hoạch, phân loại', 'Làm trong nhà màng', 'Làm ngoài đồng', 'Chăm bò, gà, lợn', 'Dậy sớm', 'Lái máy kéo', 'Ghi nhật ký cây trồng', 'Làm theo đội', 'Bận theo mùa vụ', 'Dùng máy tính cả ngày', 'Giao tiếp với khách'],
    real: ['Gieo, chăm, thu hoạch theo mùa trước', 'Lái máy, quản lý nhà màng sau', 'Ngoài trời: nắng hè, lạnh mùa đông', 'Chăn nuôi bắt đầu từ sáng sớm'],
    ph: { wow: 'Ví dụ: trang trại Nhật dùng cảm biến, drone', like: 'Ví dụ: thấy cây mình chăm ra trái', worry: 'Ví dụ: sợ lạnh ở vùng phía Bắc' },
    day: ['Sáng 6 giờ, mình vào nhà màng, xem cảm biến, tưới cây. Chiều mình thu hoạch cà chua cùng đội.', 'Sáng 5 giờ 30, mình vắt sữa bò, dọn chuồng. Chiều mình ghi nhật ký đàn bò.'],
    r3: ['Dậy sớm, làm ngoài trời theo mùa', 'Anh khóa trước · ngành nông nghiệp', 'Mùa đông ở đây lạnh thật. Mình mặc nhiều lớp mỏng, ngủ sớm để dậy sớm. Mùa thu hoạch cả đội vui lắm.'] },
  'thuy-san': { place: 'xưởng chế biến thủy sản', grp: 'sx', firstOpt: 'Sơ chế, bóc tôm, đóng gói',
    first: 'Tuần đầu thường là sơ chế, fillet cá, bóc tôm, đóng gói theo hướng dẫn. Làm trong xưởng lạnh, không làm trên tàu.',
    chips: ['Sơ chế, fillet cá', 'Bóc vỏ tôm', 'Làm trong xưởng lạnh', 'Mặc đồ chống lạnh', 'Đóng gói', 'Ghi sổ vệ sinh, số lô', 'Đứng gần cả ca', 'Tăng ca mùa cao điểm', 'Làm trên tàu cá', 'Giao tiếp với khách', 'Dùng máy tính cả ngày', 'Dùng dao nhiều'],
    real: ['Sơ chế, fillet, đóng gói trước', 'Làm trong xưởng lạnh, tay hay ướt', 'Đứng gần cả ca', 'Tăng ca nhiều khoảng tháng 9–11'],
    ph: { wow: 'Ví dụ: không làm trên tàu, làm trong xưởng lạnh', like: 'Ví dụ: tay dao ngày càng nhanh', worry: 'Ví dụ: sợ lạnh tay cả ca' },
    day: ['Sáng 7 giờ, mình mặc đồ chống lạnh vào xưởng, fillet cá. Chiều mình đóng gói, ghi số lô.', 'Sáng 7 giờ, mình đứng khâu cấp đông, kiểm hàng theo sổ vệ sinh.'],
    r3: ['Xưởng lạnh, tay ướt, đứng cả ca', 'Chị khóa trước · ngành thủy sản', 'Lúc đầu tay lạnh lắm. Mình đeo thêm găng lót, giờ nghỉ thì hơ tay. Vài tuần là quen.'] },
  'thuc-pham': { place: 'nhà máy thực phẩm', grp: 'sx', firstOpt: 'Sơ chế, rửa, cắt nguyên liệu',
    first: 'Tuần đầu thường là rửa, cắt, phân loại nguyên liệu. Vào xưởng phải rửa tay, qua buồng gió.',
    chips: ['Rửa tay, qua buồng gió', 'Mặc đồ bảo hộ kín', 'Sơ chế, cắt nguyên liệu', 'Cân theo công thức', 'Làm cơm hộp, bánh', 'Đóng gói, dán nhãn', 'Kiểm tra dị vật', 'Làm theo ca, có ca đêm', 'Đứng suốt ca', 'Giao tiếp với khách', 'Làm ngoài trời', 'Dùng máy tính cả ngày'],
    real: ['Sơ chế nguyên liệu trước', 'Vệ sinh rất kỹ trước khi vào xưởng', 'Đứng suốt ca, ca có thể xoay', 'Xưởng lạnh, hoặc nóng nếu gần lò'],
    ph: { wow: 'Ví dụ: vào xưởng phải qua buồng gió', like: 'Ví dụ: làm ra món ăn sạch, đẹp', worry: 'Ví dụ: sợ ca đêm khó ngủ' },
    day: ['Sáng 6 giờ, mình rửa tay, qua buồng gió, vào cắt rau. Chiều mình xếp cơm hộp, dán nhãn.', 'Sáng 6 giờ, mình kiểm dị vật cuối chuyền, ghi sổ vệ sinh, rồi chỉ em mới quy trình.'],
    r3: ['Vệ sinh nghiêm, đồ bảo hộ kín cả ca', 'Chị khóa trước · ngành thực phẩm', 'Ở JPC mình đã quen rửa tay đúng các bước. Sang đây làm theo thấy nhẹ nhàng, tổ trưởng còn khen.'] },
  'dieu-duong': { place: 'viện dưỡng lão', grp: 'kg', firstOpt: 'Học tên, quan sát cách chăm',
    first: 'Tuần đầu thường là quan sát, học tên và cách chăm từng người. Giúp ăn, tắm có người hướng dẫn bên cạnh.',
    chips: ['Chào hỏi, trò chuyện với cụ', 'Giúp cụ ăn uống', 'Giúp cụ tắm rửa', 'Dìu, đổi tư thế', 'Đo sức khỏe', 'Ghi hồ sơ, bàn giao ca', 'Dùng kính ngữ', 'Làm ca đêm', 'Sinh hoạt tập thể', 'Đứng máy', 'Làm ngoài trời', 'Mang vác hàng'],
    real: ['Quan sát, học tên từng người trước', 'Giúp ăn, tắm có người hướng dẫn', 'Ghi hồ sơ, bàn giao ca', 'Ca xoay; ca đêm khi đã quen việc'],
    ph: { wow: 'Ví dụ: phải ghi chép kỹ cho ca sau', like: 'Ví dụ: thấy các cụ vui khi mình đến', worry: 'Ví dụ: sợ nói kính ngữ chưa đúng' },
    day: ['Sáng 7 giờ, mình chào các cụ, giúp cụ ăn sáng. Chiều mình tổ chức trò chơi, rồi ghi hồ sơ bàn giao.', 'Sáng 7 giờ, mình nhận bàn giao ca đêm, đo sức khỏe các cụ, rồi kèm em mới.'],
    r3: ['Dìu đỡ người, có ngày mệt cả người lẫn lòng', 'Chị khóa trước · ngành kaigo', 'Có ngày cụ khó tính, mình buồn. Mình kể với chị tổ trưởng, chị chỉ cách nói chuyện. Giờ cụ quý mình lắm.'] },
  'nha-hang': { place: 'nhà hàng, khách sạn', grp: 'dv', firstOpt: 'Làm vị trí cơ bản theo quy trình',
    first: 'Tuần đầu thường là phục vụ bàn, dọn phòng, phụ bếp hoặc rửa bát, làm theo quy trình chuẩn.',
    chips: ['Chào khách bằng kính ngữ', 'Phục vụ bàn', 'Dọn phòng, làm giường', 'Phụ bếp, sơ chế', 'Rửa bát', 'Làm lễ tân', 'Đứng, đi lại nhiều', 'Xoay ca, làm cuối tuần', 'Làm theo sổ hướng dẫn', 'Đứng máy', 'Làm ngoài trời', 'Đọc bản vẽ'],
    real: ['Vị trí cơ bản theo quy trình trước', 'Dùng kính ngữ với khách', 'Đứng, đi lại nhiều cả ca', 'Đông khách cuối tuần, ngày lễ'],
    ph: { wow: 'Ví dụ: việc gì cũng có sổ hướng dẫn', like: 'Ví dụ: khách cảm ơn mình', worry: 'Ví dụ: sợ nói kính ngữ chưa đúng' },
    day: ['Sáng 9 giờ, mình chào khách, dọn bàn ăn sáng. Chiều mình dọn phòng, làm giường theo chuẩn.', 'Sáng 9 giờ, mình đứng quầy lễ tân, nhận phòng cho khách, rồi chỉ em mới cách chào.'],
    r3: ['Làm cuối tuần, ngày lễ, mùa du lịch', 'Chị khóa trước · ngành nhà hàng', 'Bạn bè nghỉ lễ thì mình đi làm. Mình nghỉ bù ngày thường, đi chơi lúc vắng người. Vậy cũng hay.'] },
  've-sinh-toa-nha': { place: 'tòa nhà', grp: 'vs', firstOpt: 'Lau dọn theo bảng phân công',
    first: 'Tuần đầu thường là lau sàn, tay vịn, gom rác theo bảng phân công. Máy chà sàn, phủ wax đến sau.',
    chips: ['Lau sàn, tay vịn', 'Gom, phân loại rác', 'Chạy máy chà sàn', 'Phủ wax', 'Lau kính', 'Pha hóa chất đúng loại', 'Dùng bảng kiểm', 'Làm sáng sớm hoặc tối', 'Đi nhiều tầng', 'Chào người trong tòa nhà', 'Đứng máy cả ca', 'Dùng máy tính cả ngày'],
    real: ['Lau dọn theo bảng phân công trước', 'Máy chà sàn, wax, kính sau', 'Giờ lệch: sáng sớm, tối, cuối tuần', 'Đi bộ nhiều tầng, đeo găng tay'],
    ph: { wow: 'Ví dụ: mỗi loại sàn dùng hóa chất khác', like: 'Ví dụ: thấy tòa nhà sạch bóng', worry: 'Ví dụ: sợ làm giờ lệch' },
    day: ['Sáng 6 giờ, mình lau sàn sảnh trước giờ mở cửa. Sau đó mình gom rác, đánh dấu bảng kiểm.', 'Sáng 6 giờ, mình chạy máy chà sàn, phủ wax, rồi kiểm tra bàn giao khu vực.'],
    r3: ['Làm giờ lệch, việc lặp lại', 'Anh khóa trước · ngành vệ sinh tòa nhà', 'Mình làm sáng sớm, chiều rảnh để học tiếng Nhật. Tính ra lại hợp với mình.'] },
  'ky-su': { place: 'công ty', grp: 'ks', firstOpt: 'Học quy trình, sản phẩm công ty',
    first: 'Tháng đầu thường là học quy trình và sản phẩm của công ty, làm cùng người hướng dẫn.',
    chips: ['Viết chương trình', 'Vẽ thiết kế CAD', 'Họp nhóm bằng tiếng Nhật', 'Báo cáo tiến độ', 'Làm trên máy tính', 'Xuống xưởng xem máy', 'Đọc tài liệu kỹ thuật', 'Lập trình robot', 'Đứng máy cả ca', 'Làm ngoài trời', 'Mang vác nặng', 'Giao tiếp với khách'],
    real: ['Cần bằng đại học đúng ngành', 'Tiếng Nhật thường từ N3', 'Làm ở văn phòng hoặc nhà máy', '10 năm hướng tới chuyên gia kỹ thuật'],
    ph: { wow: 'Ví dụ: nhiều công ty vừa và nhỏ tuyển kỹ sư', like: 'Ví dụ: được làm đúng chuyên ngành', worry: 'Ví dụ: sợ tiếng Nhật chưa đủ N3' },
    day: ['Sáng 9 giờ, mình họp nhóm, báo tiến độ. Sau đó mình vẽ CAD, chiều xuống xưởng xem máy chạy thử.', 'Sáng 9 giờ, mình viết chương trình cho robot hàn, rồi cùng anh senpai chạy thử.'],
    r3: ['Họp, báo cáo bằng tiếng Nhật mỗi ngày', 'Anh khóa trước · kỹ sư cơ khí', 'Lúc đầu họp mình nghe sót nhiều. Mình chuẩn bị trước 3 câu báo cáo, tối luyện lại. Nửa năm sau tự tin hơn hẳn.'] },
  gen: { place: 'nơi làm việc', grp: 'gen', firstOpt: 'Làm việc đơn giản, có người kèm',
    first: 'Phần lớn nơi làm ở Nhật cho người mới làm việc đơn giản trước, có senpai kèm. Việc khó đến sau vài tháng.',
    chips: ['Thao tác tay, đứng máy', 'Làm theo bản vẽ, quy trình', 'Đo, kiểm tra hàng', 'Dọn dẹp 5S', 'Làm ngoài trời', 'Làm theo ca', 'Giao tiếp với khách', 'Chăm sóc người', 'Dùng máy tính', 'Làm cùng nhóm', 'Mang vác nặng', 'Tiếng Nhật chuyên ngành'],
    real: [],
    ph: { wow: 'Ví dụ: người mới làm việc đơn giản trước', like: 'Ví dụ: làm ra sản phẩm thấy được', worry: 'Ví dụ: sợ đứng lâu bị mỏi' },
    day: ['Sáng 7 giờ 30, mình họp sáng với tổ, nhận việc trong ngày. Chiều mình kiểm tra lại, tối gọi về nhà.', 'Sáng 7 giờ 30, mình chuẩn bị đồ nghề, làm theo hướng dẫn của senpai, ghi lại điều mới học.'],
    r3: null }
};

/* Khởi động Ga 4 theo nghề: 3 câu Đoán thử. slot 0 = tuần đầu (theo INDP); slot 1, 2 theo nhóm nghề. Senpai = lời kể mẫu. */
var GUESS = {
  ky: { q: 'Sáng nào ở [Nơi] Nhật cũng có buổi “KY”. Để làm gì?', opts: ['Điểm danh', 'Cùng đoán trước chỗ nguy hiểm', 'Tập thể dục', 'Chia việc trong ngày'],
    fact: 'KY (危険予知 · kiken yochi) là cùng đoán trước chỗ nguy hiểm trước giờ làm. Buổi họp sáng thường có cả thể dục và chia việc.',
    senpai: { who: 'Anh khóa trước · ngành xây dựng', t: 'Mỗi sáng cả nhóm chỉ vào chỗ dễ trượt, dễ va rồi hô to. Lúc đầu thấy lạ, giờ thành quen.' } },
  omote: { q: '“Omotenashi” ở nhà hàng, khách sạn Nhật là gì?', opts: ['Phục vụ thật nhanh', 'Đoán trước điều khách cần', 'Cúi chào thật sâu', 'Chưa nghe bao giờ'],
    fact: 'Omotenashi (おもてなし) là tiếp khách tận tâm, lo cả điều khách chưa kịp nói. Ở Nhật gần như không có tiền tip.',
    senpai: { who: 'Chị khóa trước · ngành nhà hàng', t: 'Thấy khách dắt em bé, mình mang ghế trẻ em ra trước khi khách hỏi. Khách cảm ơn mãi.' } },
  kiroku: { q: 'Cuối ca, nhân viên kaigo thường làm gì?', opts: ['Về ngay khi hết giờ', 'Ghi hồ sơ, bàn giao ca', 'Dọn dẹp cả viện', 'Chưa biết'],
    fact: 'Ghi hồ sơ từng người và bàn giao ca là việc hằng ngày. Ca sau đọc để chăm sóc cho đúng.',
    senpai: { who: 'Chị khóa trước · ngành kaigo', t: 'Lúc đầu mình viết chậm lắm. Chị senpai cho mình mẫu câu hay dùng. Giờ 10 phút là xong.' } },
  hrs: { q: '“Hō-ren-sō” ở chỗ làm Nhật là gì?', opts: ['Một món ăn Nhật', 'Báo cáo, liên lạc, bàn bạc', 'Chào hỏi buổi sáng', 'Chưa nghe bao giờ'],
    fact: 'Hō-ren-sō (報連相) là báo cáo, liên lạc, bàn bạc. Có gì chưa rõ hay lỡ sai, báo sớm cho cấp trên.',
    senpai: { who: 'Anh khóa trước · ngành điện tử', t: 'Có lần mình làm hỏng một bo mạch mà chưa dám nói. Báo ra rồi mới thấy, được chỉ cách sửa chứ không bị la.' } },
  late: { q: 'Ở Nhật, sắp trễ giờ làm 5 phút thì nên làm gì?', opts: ['Cứ đến, trễ chút không sao', 'Gọi báo trước cho cấp trên', 'Nghỉ luôn hôm đó', 'Mỗi nơi một khác'],
    fact: 'Ở Nhật, đúng giờ là đến sớm 5–10 phút. Sắp trễ thì gọi báo trước, dù chỉ vài phút.',
    senpai: { who: 'Chị khóa trước · ngành thực phẩm', t: 'Hôm tàu trễ, mình gọi báo trước cho tổ trưởng. Chị cảm ơn vì mình báo sớm.' } }
};
var GUESS_GRP = { sx: ['ky', 'hrs'], xd: ['ky', 'hrs'], vs: ['ky', 'hrs'], dv: ['omote', 'hrs'], kg: ['kiroku', 'hrs'], nn: ['hrs', 'late'], ks: ['hrs', 'late'], gen: ['hrs', 'late'] };

/* ---------- RIASEC (John Holland): 6 nhóm sở thích nghề · bản nhanh 30 câu (RQ) · bản đầy đủ 60 câu = RQ + RQ2 (mỗi nhóm 10 câu) ---------- */
var RIA_ORDER = ['R', 'I', 'A', 'S', 'E', 'C'];
var RIA = {
  R: { n: 'Kỹ thuật', c: '#C2410C', d: 'Thích làm với máy móc, dụng cụ, cây cối, con vật. Thích thấy kết quả rõ ràng.', env: 'Xưởng, nhà máy, công trường, nông trại.' },
  I: { n: 'Nghiên cứu', c: '#2563EB', d: 'Tò mò, thích tìm nguyên nhân và giải quyết vấn đề.', env: 'Kỹ thuật, kiểm tra chất lượng, công nghệ.' },
  A: { n: 'Nghệ thuật', c: '#C026D3', d: 'Sáng tạo, nhạy với cái đẹp, thích thể hiện ý tưởng.', env: 'Thiết kế, may mặc, nấu ăn, in ấn.' },
  S: { n: 'Xã hội', c: '#16A34A', d: 'Thích giúp đỡ, lắng nghe, chăm sóc người khác.', env: 'Kaigo, nhà hàng, khách sạn, dịch vụ.' },
  E: { n: 'Quản lý', c: '#DC2626', d: 'Thích dẫn dắt, thuyết phục, dám nghĩ dám làm.', env: 'Trưởng nhóm, bán hàng, kinh doanh.' },
  C: { n: 'Nghiệp vụ', c: '#0891B2', d: 'Ngăn nắp, cẩn thận, thích làm theo quy trình rõ ràng.', env: 'Sản xuất theo quy trình, kho vận, văn phòng.' }
};
var RQ = [
  ['R', 'Sửa xe máy, quạt điện, đồ trong nhà'], ['I', 'Tìm hiểu vì sao một cái máy chạy được'], ['A', 'Vẽ, trang trí, thiết kế một món đồ'],
  ['S', 'Giúp bạn gỡ rối khi họ có chuyện buồn'], ['E', 'Đứng ra tổ chức một buổi đi chơi'], ['C', 'Sắp xếp đồ đạc, giấy tờ ngăn nắp'],
  ['S', 'Chỉ bài, hướng dẫn cho người khác'], ['C', 'Ghi chép chi tiêu, sổ sách rõ ràng'], ['R', 'Làm bằng tay với búa, cờ lê, máy khoan'],
  ['E', 'Thuyết phục người khác theo ý mình'], ['I', 'Giải một bài toán hay câu đố khó'], ['A', 'Hát, chơi nhạc cụ, nghe nhạc thật kỹ'],
  ['E', 'Buôn bán, kinh doanh nhỏ'], ['A', 'Nấu món mới và trình bày cho đẹp'], ['C', 'Làm theo hướng dẫn từng bước'],
  ['I', 'Xem video, đọc bài về khoa học, công nghệ'], ['R', 'Lắp ráp đồ vật theo bản hướng dẫn'], ['S', 'Chăm sóc ông bà, em nhỏ, người bệnh'],
  ['C', 'Kiểm tra lại việc mình làm cho hết lỗi'], ['R', 'Làm ngoài trời, vận động nhiều'], ['S', 'Làm việc nhóm, trò chuyện với nhiều người'],
  ['A', 'Chụp ảnh, quay và dựng video'], ['E', 'Làm lớp trưởng, nhóm trưởng'], ['I', 'Tìm ra nguyên nhân khi có sự cố'],
  ['A', 'Nghĩ cách làm mới, không thích làm giống ai'], ['E', 'Đặt mục tiêu lớn, thích thử thách'], ['I', 'Thử nhiều cách xem cách nào hiệu quả'],
  ['C', 'Lập kế hoạch, thời gian biểu, làm đúng giờ'], ['S', 'Tham gia tình nguyện, giúp cộng đồng'], ['R', 'Trồng cây, nuôi con vật']
];

/* 30 câu thêm cho bản đầy đủ (khóa học biên soạn theo mô hình Holland, mỗi nhóm 5 câu) */
var RQ2 = [
  ['R', 'Lái xe, điều khiển máy móc'], ['S', 'Lắng nghe người khác tâm sự'], ['C', 'Nhập số liệu, làm bảng tính'],
  ['I', 'Đọc kỹ thông số trước khi mua đồ'], ['A', 'Phối đồ, chọn màu cho đẹp'], ['E', 'Đứng nói trước đông người'],
  ['R', 'Đóng kệ, sửa bàn ghế bằng gỗ'], ['C', 'Để đồ dùng đúng chỗ quy định'], ['S', 'Đón tiếp khách đến nhà chu đáo'],
  ['A', 'Viết nhật ký, viết truyện, làm thơ'], ['E', 'Chia việc cho cả nhóm'], ['I', 'Tìm hiểu cơ thể người hoạt động thế nào'],
  ['C', 'Làm việc lặp lại mà không thấy chán'], ['R', 'Phụ sơn sửa, xây lại nhà cửa'], ['E', 'Rủ bạn bè cùng làm một việc'],
  ['S', 'Hòa giải khi bạn bè giận nhau'], ['I', 'Đo đạc, so sánh số liệu cho chính xác'], ['A', 'Trang trí phòng, góc học tập'],
  ['E', 'Mặc cả, thương lượng giá'], ['R', 'Tự thay bóng đèn, sửa ống nước'], ['C', 'Đọc kỹ quy định trước khi làm'],
  ['A', 'Làm đồ thủ công: may, đan, xếp giấy'], ['S', 'Hỏi han người mới để họ đỡ lạ'], ['I', 'Hỏi “tại sao” đến khi hiểu mới thôi'],
  ['R', 'Làm việc tay chân, thấy ngay kết quả'], ['E', 'Đi đầu khi cả nhóm còn ngại'], ['C', 'Đếm, kiểm kho, kiểm hàng'],
  ['I', 'Chơi cờ, game chiến thuật'], ['A', 'Diễn kịch, làm MC, kể chuyện'], ['S', 'Làm việc giúp người khác vui hơn']
];
var RQ_ALL = RQ.concat(RQ2);

/* ---------- Ga 4 · Diện đi Nhật (a44) · TÓM TẮT THAM KHẢO, đối chiếu 16/11/2026 ----------
   Nguồn: tikme.com/visa/* và Cơ quan Quản lý Xuất nhập cảnh Nhật (ISA). Quy định có thể thay đổi: soát lại trước mỗi đợt phát hành.
   p = khớp với hồ sơ (PS_CONFIG.PATHS) */
/* ---------- "Một ngày của bạn TTS" (a42 bước 1, PS1.3.15) · theo từng nghề ----------
   9 mốc: 6 việc thật (theo trang ngành Tikme, tóm gọn) + 3 việc lạc sang ngành khác (mức 1 dễ, 2 vừa, 3 khó).
   Mốc thật: [giờ, việc, "Việc này có thật: …"] · Mốc lạc: [giờ, việc, 0, mã ngành của việc đó, mức].
   pref: tỉnh nơi làm (MINH HỌA, không phải nơi tuyển thật) · who: diện của nhân vật. Giờ giấc là minh họa.
   Nhà hàng: TTS chỉ có ở nhánh khách sạn, ryokan (theo Tikme 17/11/2026) nên kể ngày ở khách sạn. Vệ sinh tòa nhà: có diện TTS (theo Tikme). Thầy soát. */
var DAYJOB = {
  'co-khi': { pref: 'Aichi', where: 'Xưởng cơ khí', items: [
    ['7:30', 'Họp đầu ca, nhắc an toàn', 'Ca nào cũng mở đầu bằng vài phút họp an toàn.'],
    ['8:00', 'Bón phân cho luống rau', 0, 'nong-nghiep', 1],
    ['9:30', 'Đọc bản vẽ, gá phôi lên máy', 'Đọc bản vẽ là việc hằng ngày của thợ cơ khí.'],
    ['10:00', 'Đo chi tiết bằng thước cặp, panme', 'Người mới thường đo hàng trước khi đứng máy.'],
    ['11:00', 'Chạy máy CNC theo chương trình', 'Đứng máy CNC thường đến sau, có senpai kèm.'],
    ['13:00', 'Hàn nối hai tấm thép', 0, 'han', 3],
    ['14:00', 'Kiểm tra chi tiết trước khi giao', 'Chi tiết đúng kích thước mới được chuyển đi.'],
    ['15:30', 'Phun sơn lớp phủ trong buồng sơn', 0, 'son', 2],
    ['16:45', 'Lau máy, dọn 5S cuối ca', 'Cuối ca lau máy, xếp dụng cụ đúng chỗ.']] },
  'dien-tu': { pref: 'Shizuoka', where: 'Xưởng điện tử', items: [
    ['8:00', 'Mặc đồ chống tĩnh điện', 'Tĩnh điện có thể làm hỏng linh kiện nhỏ.'],
    ['8:30', 'Gắn linh kiện lên bo mạch', 'Việc người mới thường làm trước.'],
    ['9:30', 'Giúp cụ ông tắm', 0, 'dieu-duong', 1],
    ['10:30', 'Hàn thiếc chân linh kiện', 'Hàn thiếc bằng tay là việc hay gặp.'],
    ['11:00', 'Gá phôi, hàn khung thép', 0, 'han', 3],
    ['13:00', 'Soi bo mạch bằng kính lúp', 'Cần mắt tinh, làm chậm mà chắc.'],
    ['14:00', 'Lấy sản phẩm ra khỏi máy ép nhựa', 0, 'duc-nhua', 2],
    ['15:00', 'Đo bằng đồng hồ vạn năng', 'Đo kiểm chức năng thường học sau.'],
    ['16:30', 'Ghi kết quả kiểm tra', 'Ghi đúng, đủ là một phần của chất lượng.']] },
  'han': { pref: 'Hiroshima', where: 'Xưởng hàn', items: [
    ['8:00', 'Mặc đồ bảo hộ, đeo mặt nạ hàn', 'Đồ kín giúp tránh tia hồ quang, xỉ nóng.'],
    ['8:30', 'Ghi món cho khách', 0, 'nha-hang', 1],
    ['9:30', 'Vát mép, gá phôi', 'Người mới thường làm việc chuẩn bị này trước.'],
    ['10:00', 'Chạy máy tiện CNC', 0, 'co-khi', 3],
    ['11:00', 'Hàn bán tự động khung thép', 'Việc chính hằng ngày của thợ hàn.'],
    ['13:00', 'Mài mối hàn cho phẳng', 'Mài, làm sạch mối hàn là việc hay gặp.'],
    ['14:00', 'Pha màu, phun sơn lót', 0, 'son', 2],
    ['15:00', 'Đọc ký hiệu hàn trên bản vẽ', 'Ký hiệu cho biết hàn chỗ nào, kiểu gì.'],
    ['16:30', 'Tự kiểm mối hàn', 'Thợ hàn tự kiểm rồi mới giao công đoạn sau.']] },
  'son': { pref: 'Gunma', where: 'Xưởng sơn', items: [
    ['8:00', 'Tẩy dầu, chà nhám bề mặt', 'Chuẩn bị bề mặt thường lâu hơn phun sơn.'],
    ['9:00', 'Dán băng che chỗ không sơn', 'Che kỹ thì đường sơn mới sắc nét.'],
    ['9:30', 'Đeo mặt nạ lọc, phun lớp lót', 'Phun trong buồng sơn, luôn đeo mặt nạ lọc.'],
    ['10:30', 'Thay ga giường phòng khách', 0, 'nha-hang', 1],
    ['11:30', 'Pha màu theo mẫu', 'Pha đúng màu cần mắt tinh, cẩn thận.'],
    ['13:00', 'Mài mối hàn cho phẳng', 0, 'han', 3],
    ['14:00', 'Phun lớp phủ, đưa vào sấy', 'Phun lớp phủ chính thường học sau.'],
    ['15:00', 'Cắt vải theo rập', 0, 'may-mac', 2],
    ['16:30', 'Đo độ dày lớp sơn', 'Đo để chắc lớp sơn đều, đủ dày.']] },
  'duc-nhua': { pref: 'Shiga', where: 'Xưởng ép nhựa', items: [
    ['8:00', 'Họp đầu ca, xem kế hoạch', 'Đầu ca nắm mã hàng, số lượng cần làm.'],
    ['8:30', 'Lấy sản phẩm ra khỏi máy ép', 'Việc người mới thường làm trước.'],
    ['9:30', 'Tỉa cành cà chua trong nhà kính', 0, 'nong-nghiep', 1],
    ['10:00', 'Cắt ba via, soi bằng mắt', 'Ba via là phần nhựa thừa ở mép sản phẩm.'],
    ['11:00', 'Ghi nhiệt độ, áp suất máy', 'Theo dõi thông số giúp ít hàng lỗi.'],
    ['13:00', 'Đóng khung gỗ cho kiện hàng', 0, 'dong-goi-cong-nghiep', 3],
    ['14:00', 'Gắn linh kiện lên bo mạch', 0, 'dien-tu', 2],
    ['15:00', 'Cùng tổ thay khuôn', 'Thay khuôn thường học sau, làm theo tổ.'],
    ['16:30', 'Đóng gói, ghi số lượng', 'Cuối ca đếm và ghi số hàng đạt.']] },
  'dong-goi-cong-nghiep': { pref: 'Ibaraki', where: 'Xưởng đóng gói', items: [
    ['8:00', 'Họp đầu ca, xem lịch xuất hàng', 'Đầu ca biết hôm nay phải xong kiện nào.'],
    ['8:30', 'Đo huyết áp cho cụ', 0, 'dieu-duong', 1],
    ['9:30', 'Bọc hàng, dán nhãn theo mẫu', 'Việc người mới thường làm trước.'],
    ['10:00', 'Đo, cân kiện hàng', 'Kích thước, cân nặng ghi lên phiếu xuất.'],
    ['11:00', 'Xếp cơm hộp vào khay', 0, 'thuc-pham', 3],
    ['13:00', 'Đóng khung gỗ cho hàng lớn', 'Máy móc lớn cần khung gỗ chắc chắn.'],
    ['14:00', 'Quấn màng pallet, đóng đai', 'Giữ hàng không xê dịch khi chở đi.'],
    ['15:00', 'Buộc cốt thép ở công trường', 0, 'xay-dung', 2],
    ['16:30', 'Kiểm đếm hàng trước khi xuất', 'Đếm khớp phiếu rồi mới giao xe.']] },
  'in-an': { pref: 'Saitama', where: 'Nhà in', items: [
    ['8:00', 'Chuẩn bị giấy, pha mực', 'Chuẩn bị đủ, đúng loại trước khi chạy máy.'],
    ['9:00', 'Lắp bản kẽm lên máy in', 'Bản kẽm mang hình cần in lên giấy.'],
    ['9:30', 'Thu hoạch dâu tây', 0, 'nong-nghiep', 1],
    ['10:30', 'Phun sơn khung xe', 0, 'son', 3],
    ['11:00', 'So màu tờ in với mẫu', 'Lệch màu một chút cũng phải chỉnh lại.'],
    ['13:00', 'Đứng máy, rút tờ in ra soi', 'Vừa chạy máy vừa soi lỗi từng xấp.'],
    ['14:00', 'Cắt, gấp, cán màng', 'Hoàn thiện thành sách, hộp, tờ rơi.'],
    ['15:00', 'May đường viền cổ áo', 0, 'may-mac', 2],
    ['16:30', 'Lau máy, cất bản kẽm', 'Máy sạch thì hôm sau in mới đẹp.']] },
  'may-mac': { pref: 'Gifu', where: 'Xưởng may', items: [
    ['8:00', 'Xem sơ đồ, nhận việc', 'Mỗi người nhận công đoạn của mình đầu ngày.'],
    ['8:30', 'Lắp giàn giáo', 0, 'xay-dung', 1],
    ['9:30', 'Cắt vải theo rập', 'Cắt đúng rập thì may mới khớp.'],
    ['10:00', 'May một công đoạn trên máy', 'Người mới thường may một công đoạn trước.'],
    ['11:00', 'Kiểm tra đường may', 'Đường may lệch thì tháo ra may lại.'],
    ['13:00', 'Cắt, gấp, cán màng tờ in', 0, 'in-an', 3],
    ['14:00', 'Bóc vỏ tôm trong xưởng lạnh', 0, 'thuy-san', 2],
    ['15:00', 'Là ủi, hoàn thiện', 'Áo phẳng, đẹp mới được đóng gói.'],
    ['16:30', 'Gấp, phân loại theo cỡ', 'Gấp gọn, đúng cỡ để giao hàng.']] },
  'xay-dung': { pref: 'Chiba', where: 'Công trường', items: [
    ['7:30', 'Tập thể dục, họp an toàn', 'Công trường nào cũng khởi động, họp an toàn.'],
    ['8:00', 'Đội mũ, móc dây an toàn', 'Làm trên cao bắt buộc móc dây an toàn.'],
    ['9:00', 'Mang vác vật liệu', 'Việc phụ người mới thường làm trước.'],
    ['9:30', 'Rửa bát trong bếp', 0, 'nha-hang', 1],
    ['10:30', 'Chạy máy chà sàn, phủ wax', 0, 've-sinh-toa-nha', 3],
    ['13:00', 'Buộc cốt thép', 'Cốt thép giữ cho bê tông chắc.'],
    ['14:00', 'Dựng cốp pha theo bản vẽ', 'Cốp pha là khuôn để đổ bê tông.'],
    ['15:00', 'Thay dầu cho xe khách', 0, 'o-to', 2],
    ['16:30', 'Dọn công trường, cất dụng cụ', 'Dọn sạch cuối ngày để hôm sau an toàn.']] },
  'o-to': { pref: 'Mie', where: 'Xưởng bảo dưỡng ô tô', items: [
    ['8:30', 'Họp sáng, nhận phiếu việc từng xe', 'Mỗi xe có phiếu ghi việc cần làm.'],
    ['9:00', 'Cho bò ăn', 0, 'nong-nghiep', 1],
    ['9:30', 'Thay dầu, lọc dầu', 'Việc người mới thường làm trước.'],
    ['10:30', 'Kiểm tra lốp, phanh', 'Làm theo danh mục, không bỏ bước nào.'],
    ['11:00', 'Nâng xe, kiểm tra gầm', 'Dùng cầu nâng, làm đúng quy trình an toàn.'],
    ['13:00', 'Chạy máy tiện CNC', 0, 'co-khi', 3],
    ['14:00', 'Dùng máy chẩn đoán lỗi', 'Máy đọc lỗi thường học sau.'],
    ['15:00', 'Sơ chế cá trong xưởng lạnh', 0, 'thuy-san', 2],
    ['16:30', 'Ghi báo cáo, rửa xe', 'Ghi rõ đã làm gì rồi mới giao xe.']] },
  'nong-nghiep': { pref: 'Kumamoto', where: 'Trang trại', items: [
    ['6:30', 'Vào nhà màng, xem cây', 'Nông nghiệp thường bắt đầu từ sáng sớm.'],
    ['7:30', 'Thu hoạch cà chua', 'Hái đúng độ chín theo hướng dẫn.'],
    ['9:00', 'Lau kính cửa sổ tòa nhà', 0, 've-sinh-toa-nha', 1],
    ['10:00', 'Phân loại, đóng thùng', 'Phân theo cỡ, theo loại rồi mới giao.'],
    ['11:00', 'Rửa, cắt rau làm cơm hộp', 0, 'thuc-pham', 3],
    ['13:00', 'Tỉa lá, buộc dây cho cây', 'Chăm cây mỗi ngày để cây sai quả.'],
    ['14:00', 'Hàn khung thép', 0, 'han', 2],
    ['15:00', 'Tưới nước, bón phân', 'Làm theo lịch của chủ trang trại.'],
    ['16:00', 'Ghi nhật ký cây trồng', 'Ghi lại để biết cây khỏe hay yếu.']] },
  'thuy-san': { pref: 'Miyagi', where: 'Xưởng chế biến thủy sản', items: [
    ['7:30', 'Rửa tay, mặc đồ chống lạnh', 'Xưởng lạnh và sạch, vào phải đúng quy trình.'],
    ['8:00', 'Lắp bản kẽm lên máy in', 0, 'in-an', 1],
    ['9:30', 'Sơ chế cá', 'Người mới làm công đoạn đơn giản trước.'],
    ['10:00', 'Rửa rau, nấu cơm hộp', 0, 'thuc-pham', 3],
    ['11:00', 'Bóc vỏ tôm', 'Làm nhanh mà vẫn sạch, đúng chuẩn.'],
    ['13:00', 'Fillet cá bằng dao', 'Dùng dao nhiều, học dần từ senpai.'],
    ['14:00', 'Kiểm tra lốp, phanh xe', 0, 'o-to', 2],
    ['15:00', 'Đóng gói, cấp đông', 'Đóng gói xong đưa vào kho lạnh ngay.'],
    ['16:30', 'Ghi số lô, sổ vệ sinh', 'Ghi để truy lại được hàng khi có lỗi.']] },
  'thuc-pham': { pref: 'Hokkaido', where: 'Nhà máy thực phẩm', items: [
    ['8:00', 'Rửa tay, qua buồng thổi bụi', 'Bụi, tóc không được vào khu sản xuất.'],
    ['8:30', 'Sơ chế, cắt nguyên liệu', 'Việc người mới thường làm trước.'],
    ['9:30', 'Cân nguyên liệu theo công thức', 'Sai vài gam là vị đã khác.'],
    ['10:00', 'Lắp giàn giáo', 0, 'xay-dung', 1],
    ['11:00', 'Xếp cơm hộp theo dây chuyền', 'Làm nhanh, đều tay theo dây chuyền.'],
    ['13:00', 'Fillet cá trong xưởng lạnh', 0, 'thuy-san', 3],
    ['14:00', 'Soi dị vật trước khi đóng gói', 'Kiểm để không lẫn vật lạ vào hàng.'],
    ['15:00', 'Hàn thiếc bo mạch', 0, 'dien-tu', 2],
    ['16:30', 'Đóng gói, dán nhãn hạn dùng', 'Nhãn đúng là an toàn cho người ăn.']] },
  'dieu-duong': { pref: 'Osaka', where: 'Viện dưỡng lão', items: [
    ['7:00', 'Nhận bàn giao từ ca đêm', 'Nghe ca trước kể sức khỏe từng cụ.'],
    ['7:30', 'Chào hỏi, giúp cụ ăn sáng', 'Chào bằng kính ngữ, gọi đúng tên cụ.'],
    ['9:00', 'Đứng máy ép nhựa', 0, 'duc-nhua', 1],
    ['10:00', 'Đo nhiệt độ, huyết áp', 'Đo mỗi ngày để biết cụ có khỏe không.'],
    ['11:00', 'Giúp cụ tắm', 'Giữ an toàn và sự riêng tư cho cụ.'],
    ['13:30', 'Phục vụ bàn ở nhà hàng', 0, 'nha-hang', 3],
    ['14:00', 'Lái máy kéo ngoài đồng', 0, 'nong-nghiep', 2],
    ['15:00', 'Cùng cụ tập thể dục, trò chuyện', 'Trò chuyện cũng là chăm sóc.'],
    ['16:30', 'Ghi hồ sơ chăm sóc', 'Ghi rõ để ca sau chăm cụ đúng.']] },
  'nha-hang': { pref: 'Nagano', where: 'Khách sạn', items: [
    ['7:00', 'Chào khách, phục vụ bữa sáng', 'Chào bằng kính ngữ là việc đầu tiên.'],
    ['9:00', 'Buộc cốt thép', 0, 'xay-dung', 1],
    ['9:30', 'Dọn bàn, rửa bát', 'Khu ăn phải sạch trước bữa sau.'],
    ['10:30', 'Dọn phòng, thay ga, khăn', 'Buồng phòng làm theo sổ hướng dẫn.'],
    ['11:00', 'Lau sàn sảnh tòa nhà văn phòng', 0, 've-sinh-toa-nha', 3],
    ['13:00', 'Kiểm tra phòng trước khi khách đến', 'Phòng phải sẵn sàng trước giờ nhận phòng.'],
    ['14:00', 'Đón khách nhận phòng', 'Đông nhất cuối tuần và mùa du lịch.'],
    ['15:00', 'Thay dầu xe', 0, 'o-to', 2],
    ['17:00', 'Phụ bếp, sơ chế cho bữa tối', 'Nhà hàng khách sạn bận nhất buổi tối.']] },
  've-sinh-toa-nha': { pref: 'Tokyo', where: 'Tòa nhà văn phòng', items: [
    ['6:00', 'Lau sàn sảnh trước giờ mở cửa', 'Hay làm sáng sớm, khi tòa nhà còn vắng.'],
    ['7:00', 'Lau tay vịn, nút thang máy', 'Chỗ nhiều người chạm thì lau kỹ hơn.'],
    ['8:00', 'Tưới rau trong nhà kính', 0, 'nong-nghiep', 1],
    ['9:00', 'Dọn phòng, thay ga cho khách', 0, 'nha-hang', 3],
    ['10:00', 'Dọn nhà vệ sinh, khu ướt', 'Khu ướt làm kỹ, dùng đúng hóa chất.'],
    ['11:00', 'Gom, phân loại rác', 'Phân đúng loại theo quy định của tòa nhà.'],
    ['13:00', 'Chạy máy chà sàn, phủ wax', 'Việc định kỳ, thường học sau.'],
    ['14:00', 'Cắt ba via sản phẩm nhựa', 0, 'duc-nhua', 2],
    ['15:00', 'Đánh dấu bảng kiểm, bàn giao', 'Ghi đã làm khu nào để bàn giao.']] },
  'ky-su': { pref: 'Kanagawa', where: 'Công ty', who: 'Kỹ sư', items: [
    ['9:00', 'Họp nhóm, báo tiến độ', 'Báo cáo bằng tiếng Nhật mỗi sáng.'],
    ['9:30', 'Giúp cụ ăn trưa', 0, 'dieu-duong', 1],
    ['10:00', 'Đọc tài liệu kỹ thuật', 'Tài liệu thường bằng tiếng Nhật.'],
    ['10:30', 'Vẽ thiết kế trên CAD', 'Việc hằng ngày của kỹ sư thiết kế.'],
    ['11:30', 'Viết chương trình cho robot', 'Lập trình robot, máy tự động.'],
    ['13:00', 'Đứng máy CNC cả ca', 0, 'co-khi', 3],
    ['14:00', 'Bóc vỏ tôm', 0, 'thuy-san', 2],
    ['15:00', 'Xuống xưởng xem máy chạy thử', 'Kỹ sư cũng xuống xưởng xem tận mắt.'],
    ['17:00', 'Viết báo cáo cuối ngày', 'Ghi việc đã làm, việc mai cần làm.']] }
};

var VISA = {
  tts: { n: 'Thực tập sinh', p: 'Thực tập sinh', u: '/visa/thuc-tap-sinh', road: 'Thường: học JPC 6–12 tháng → làm ở Nhật 1–3 năm.',
    f: ['Học ở JPC khoảng 6–12 tháng', 'Làm ở Nhật 1–3 năm, đúng ngành đã chọn', 'Kaigo cần N4. Ngành khác học từ đầu', 'Xong có thể về nước hoặc lên Kỹ năng đặc định 1'],
    note: 'Từ 1/4/2027, Ikusei Shuro thay chế độ Thực tập sinh. Lớp bạn theo diện nào, hỏi thầy cô nhé.' },
  iku: { n: 'Ikusei Shuro', p: 'Ikusei Shuro', u: '/visa/ikusei-shurou', road: 'Thường: học JPC → làm ở Nhật 3 năm → lên Kỹ năng đặc định 1.',
    f: ['Bắt đầu từ 1/4/2027', 'Nhập cảnh cần A1 (khoảng N5). Chưa đạt thì học thêm 100 giờ', 'Làm 3 năm. Đủ điều kiện thì được đổi chỗ làm cùng ngành', 'Đậu tay nghề cấp 3 + N4 → lên Kỹ năng đặc định 1'],
    note: 'Chế độ mới, chi tiết có thể còn cập nhật.' },
  ssw: { n: 'Kỹ năng đặc định', p: 'Kỹ năng đặc định', u: '/visa/ky-nang-dac-dinh-1', road: 'Thường: đậu thi tay nghề + N4 → làm ở Nhật tối đa 5 năm.',
    f: ['Cần đậu thi tay nghề + N4 (hoặc JFT-Basic A2)', 'Diện số 1 ở tối đa 5 năm', 'Được đổi chỗ làm cùng ngành', 'Số 1 chưa mang gia đình. Lên số 2 thì được'],
    note: 'Lên số 2 cần đậu kỳ thi tay nghề cao hơn, chỉ ở một số ngành.' },
  na: { n: 'Chưa rõ', p: 'Chưa rõ', u: '/visa/hanh-trinh', road: 'Chọn năm theo dự định của bạn. Chưa biết thì chọn “Chưa biết”.',
    f: ['Thực tập sinh: 1–3 năm, thay bằng Ikusei Shuro từ 4/2027', 'Ikusei Shuro: 3 năm → Kỹ năng đặc định 1', 'Kỹ năng đặc định 1: tối đa 5 năm, cần tay nghề + N4'],
    note: 'Làm bài chọn visa trên Tikme, rồi hỏi thầy cô chủ nhiệm.' }
};
var VISA_ORDER = ['tts', 'iku', 'ssw', 'na'];
var VISA_SRC = 'Tham khảo Tikme và Cơ quan Xuất nhập cảnh Nhật. Quy định có thể thay đổi.';
/* Mốc tự dựng dòng thời gian (a44). next: nhãn riêng theo diện */
var MILES = [
  ['n5', 'Đạt tiếng Nhật N5'], ['pv', 'Đậu phỏng vấn công việc ở Nhật'], ['fly', 'Bay sang Nhật'], ['n4', 'Đạt N4'],
  ['skill', 'Đậu thi tay nghề [Nghề]'], ['n3', 'Đạt N3'], ['next', 'Lên Kỹ năng đặc định 1'], ['back', 'Về nước hoặc ở lại tiếp']
];
var MILE_NEXT = { ssw: 'Lên Kỹ năng đặc định 2' };

/* ---------- Ga 4 · thẻ sẵn sàng (a43) · Senpai kể theo từng điều (lời kể mẫu) ---------- */
var READY = [
  ['Học tiếng Nhật mỗi ngày, kể cả khi đã sang Nhật', 'Anh khóa trước · ngành cơ khí', 'Sang Nhật mình vẫn học 20 phút mỗi tối. Năm thứ hai mình nghe hiểu tổ trưởng mà không phải hỏi lại.'],
  ['Xa gia đình 3–5 năm', 'Chị khóa trước · ngành thực phẩm', 'Tháng đầu mình nhớ nhà lắm. Mình hẹn gọi video với mẹ mỗi tối Chủ nhật, thấy đỡ hẳn.'],
  ['Làm theo ca, có khi ca đêm', 'Anh khóa trước · ngành điện tử', 'Tuần ca đêm, mình che kín cửa sổ, ngủ đủ buổi sáng. Quen nếp rồi thì không mệt như mình sợ.'],
  ['Đứng nhiều, việc lặp lại', 'Chị khóa trước · ngành đóng gói', 'Việc lặp lại thì mình tự đặt mục tiêu nhỏ: hôm nay ít lỗi hơn hôm qua. Thấy vui hơn nhiều.'],
  ['Giữ giờ giấc, 5S, an toàn', 'Anh khóa trước · ngành xây dựng', 'Ở JPC mình thấy 5S hơi khắt khe. Sang Nhật mới hiểu, nhờ quen từ trước mà mình được giao việc sớm.'],
  ['Bắt đầu từ việc đơn giản nhất', 'Anh khóa trước · ngành ô tô', 'Tuần đầu mình chỉ lau máy, xếp hàng. Mình ghi lại từng bước, tháng thứ hai được đứng máy.'],
  ['Tiêu ít để tích lũy', 'Chị khóa trước · ngành may mặc', 'Ngày nhận lương, mình chia ba phần ngay: gửi nhà, để dành, tiêu. Tiêu trước thì không bao giờ dư.'],
  ['Ở ký túc xá với nhiều người', 'Anh khóa trước · ngành nông nghiệp', 'Phòng bốn người, tụi mình cùng lập lịch trực và giờ tắt đèn. Có luật chung thì ít va chạm.']
];
var READY_OPTS = [['r', 'Sẵn sàng'], ['w', 'Còn lo'], ['u', 'Chưa biết']];

/* ---------- Ga 5 · Chuyện chị Thúy (a51) · TÓM TỪ TIKME, đối chiếu 16/11/2026 ----------
   Nguồn: tikme.com/cau-chuyen-thanh-cong/tran-thi-thuy (chuyện đã công khai, giữ tên thật theo chốt của thầy).
   Truyện tranh 3 khung: art = tên cảnh trong art.js (cdScene). Lời chị: chỉ dùng câu có trên Tikme. */
var THUY = {
  who: 'Chị Trần Thị Thúy · Lâm Đồng · từng là thực tập sinh ngành Thủy sản',
  url: '/cau-chuyen-thanh-cong/tran-thi-thuy', ytId: 'l79ZbJ8msWY', yt: 'https://www.youtube.com/watch?v=l79ZbJ8msWY',
  frames: [
    { art: 'home', y: '2011 · Ở quê', t: ['Chị tốt nghiệp Sư phạm Vật lý. Lương hơn 2 triệu một tháng.', 'Ba mẹ không ủng hộ. Chị vay tiền của cậu để đi, chưa biết tiếng Nhật.'] },
    { art: 'snow', y: '2012 · Nemuro, Hokkaido', t: ['Chị chế biến cá hồi, là thực tập sinh người Việt đầu tiên ở đây.', 'Thành phố nhỏ, mùa hè chỉ 15–20 độ. Ít chỗ vui chơi.'] },
    { art: 'office', y: '2015 · Về nước', t: ['Chị có N2. Phần lớn nơi chị xin việc chỉ phỏng vấn một lần.', 'Chị làm cầu nối Việt – Nhật. Nay chị là Giám đốc đại diện Marukoshi Seagull Việt Nam.'] }
  ],
  quote: 'Đi Nhật không chỉ cho mình một khoản tiền tiết kiệm, mà quan trọng hơn là cho mình một nền tảng…',
  qsrc: 'Chị Trần Thị Thúy · trích từ Tikme'
};
/* Chuyện Đổi đời gợi ý theo ngành (tikme.com/cau-chuyen-thanh-cong/<mã>), đọc từng trang 16/11/2026.
   Chỉ chọn anh chị đã đi Nhật (đã về nước hoặc đang ở lại làm lâu), có N1–N3 hoặc đang làm quản lý, giáo viên. KHÔNG chọn bạn còn N4, N5 (đang học, mới sang).
   Ưu tiên có video, có nam có nữ. [mã, tên, giới (m/f), việc hiện nay, JLPT, có video]. Ngành có dưới 2 chuyện: thêm từ STORY_GEN (ghi "ngành khác"). */
var STORY_IND = {
  'co-khi': [['hoang-van-thieu', 'Hoàng Văn Thiệu', 'm', 'Phó Giám đốc KATO MP Việt Nam', 'N2', 1], ['pham-ngoc-hoai', 'Phạm Ngọc Hoài', 'm', 'Xưởng trưởng KATZDEN Việt Nam', 'N2', 1], ['nguyen-ba-hoi', 'Nguyễn Bá Hợi', 'm', 'Giám đốc đại diện VMONO', '', 1]],
  'thuc-pham': [['nguyen-thi-cam-vinh', 'Nguyễn Thị Cẩm Vinh', 'f', 'Giám đốc DORIANNA TP.HCM', 'N2', 1], ['tran-thi-thu-thao', 'Trần Thị Thu Thảo', 'f', 'Chủ tiệm bánh và trà GonGon', 'N2', 1], ['nguyen-thanh-tin', 'Nguyễn Thành Tín', 'm', 'Cựu thực tập sinh', 'N2', 0]],
  'thuy-san': [['vo-thi-thanh-tuyen', 'Võ Thị Thanh Tuyền', 'f', 'Cựu thực tập sinh ở Hokkaido', 'N2', 0]],
  'xay-dung': [['dang-hoai-son', 'Đặng Hoài Sơn', 'm', 'Quản lý tổ cốt thép ở Nhật', 'N2', 0]],
  'han': [['kim-hoang-dung', 'Kim Hoàng Dũng', 'm', 'Cựu thực tập sinh ở Osaka', 'N2', 0]],
  'in-an': [['vo-trong-quy', 'Võ Trọng Quý', 'm', 'Giáo viên tiếng Nhật online', 'N1', 0]],
  'nong-nghiep': [['tran-nguyet-thu', 'Trần Nguyệt Thư', 'f', 'Cựu thực tập sinh', 'N2', 0]],
  'ky-su': [['nguyen-ngoc-trung-nguyen-ngoc-dung-nguyen-ngoc-hieu', 'Anh em Nguyễn Ngọc Trung, Dũng, Hiếu', 'm', 'Cùng làm giám đốc công ty', 'N1', 1], ['nguyen-thuy-nhung', 'Nguyễn Thùy Nhung', 'f', 'Kỹ sư ở Hokkaido', 'N3', 1], ['bui-dong-hai', 'Bùi Đông Hải', 'm', 'Kỹ sư ở Tokyo', 'N2', 0]]
};
var STORY_GEN = [ /* gợi ý chung khi ngành chưa đủ chuyện: một nam, một nữ, có video */
  ['hoang-van-thieu', 'Hoàng Văn Thiệu', 'm', 'Phó Giám đốc KATO MP Việt Nam', 'N2', 1, 'Cơ khí'],
  ['nguyen-thi-son', 'Nguyễn Thị Son', 'f', 'Giáo viên tiếng Nhật', 'N1', 1, 'Thực phẩm']
];
var STORY_LIST = '/cau-chuyen-thanh-cong/danh-sach';

/* ---------- Ga 5 · Trò chuyện với anh Minh (a53) · NHÂN VẬT GIẢ ĐỊNH, lời kể mẫu ----------
   Học viên chọn câu mình tò mò; không chấm câu hay/dở. '@hard' '@prep' theo nhóm nghề (grp trong INDP), '@day' lấy INDP.day[1]. */
var MINH = {
  hi: 'Chào em! Anh là Minh, làm ngành [Nghề] năm thứ 3 ở Nhật. Em muốn hỏi gì cứ hỏi nhé.',
  hiGen: 'Chào em! Anh là Minh, đang làm năm thứ 3 ở Nhật. Em muốn hỏi gì cứ hỏi nhé.',
  qs: [
    { q: 'Anh có vất vả không ạ?', a: 'Ừ… cũng có lúc vất vả em ạ.' },
    { q: 'Tháng đầu, điều gì khó nhất với anh? Anh vượt qua thế nào?', a: '@hard' },
    { q: 'Một ngày làm việc của anh thế nào?', a: '@day' },
    { q: 'Lương bên đó bao nhiêu vậy anh?', a: 'Mỗi công ty một khác em ạ. Số tham khảo có trên Tikme. Anh thấy quan trọng hơn là mình học được gì.' },
    { q: 'Nếu quay lại lúc còn ở trường, anh sẽ chuẩn bị gì thêm?', a: '@prep' },
    { q: 'Thói quen nào giúp anh được giao việc khó hơn?', a: 'Xong việc nào anh báo việc đó, sai cũng báo ngay. Người Nhật gọi là Hō-ren-sō đó em.' },
    { q: 'Anh nghĩ em có đi được không?', a: 'Cái đó tùy em thôi. Mà em muốn đi vì điều gì?' }
  ],
  grp: {
    sx: { hard: 'Khó nhất là nghe không kịp hướng dẫn ở xưởng. Anh ghi từ mới, tối hỏi senpai. Hai tháng sau là theo kịp.', prep: 'Anh sẽ học từ vựng chuyên ngành sớm hơn. Và tập đúng giờ, 5S ngay từ ký túc xá.' },
    xd: { hard: 'Khó nhất là trời nắng, việc nặng, lại nghe không kịp. Anh uống nước đều, chưa rõ là hỏi lại. Tháng thứ hai thì quen.', prep: 'Anh sẽ tập thể lực đều, học từ vựng an toàn lao động sớm hơn.' },
    nn: { hard: 'Khó nhất là dậy sớm, làm theo mùa vụ. Anh ngủ sớm, ghi lịch việc từng tuần. Qua một mùa là quen.', prep: 'Anh sẽ tập dậy sớm, học tên cây, tên dụng cụ bằng tiếng Nhật.' },
    kg: { hard: 'Khó nhất là nghe các cụ nói giọng địa phương. Anh ghi câu hay gặp, hỏi lại nhẹ nhàng. Các cụ thương lắm.', prep: 'Anh sẽ học kính ngữ và luyện nghe nhiều hơn.' },
    dv: { hard: 'Khó nhất là tiếp khách bằng kính ngữ. Anh học thuộc câu mẫu, tập trước gương. Một tháng sau tự tin hơn.', prep: 'Anh sẽ luyện nói, luyện chào hỏi cho chuẩn ngay từ ở trường.' },
    vs: { hard: 'Khó nhất là nhớ quy trình từng khu. Anh chụp ảnh, ghi chú từng bước. Hai tuần là nhớ.', prep: 'Anh sẽ tập làm kỹ từng việc nhỏ, đúng giờ ngay từ ký túc xá.' },
    ks: { hard: 'Khó nhất là họp bằng tiếng Nhật. Anh chuẩn bị trước 3 câu báo cáo, tối luyện lại. Nửa năm sau tự tin hơn.', prep: 'Anh sẽ học tiếng Nhật công việc và kính ngữ sớm hơn.' },
    gen: { hard: 'Khó nhất là nghe không kịp hướng dẫn. Anh ghi từ mới, tối hỏi senpai. Hai tháng sau là theo kịp.', prep: 'Anh sẽ học tiếng Nhật chuyên ngành sớm hơn, tập đúng giờ ngay từ ký túc xá.' }
  },
  note: 'Câu có/không thường chỉ nhận một câu ngắn. Hỏi cụ thể “lúc nào, việc gì, làm thế nào” thì người kia kể nhiều hơn.'
};

/* ---------- Ga 6 · Kế hoạch 2 chặng (a62) · gợi ý chung ----------
   Gợi ý theo TỪNG NGHỀ ở IND6 (bên dưới). jpcG/workG theo nhóm chỉ dùng dự phòng khi không có nghề.
   [Nghề] được thay bằng tên nghề chính. Mọi gợi ý đều chọn được, có "Ý khác". Tiền: số học viên tự đặt, chỉ tham khảo. */
var PLAN = {
  /* Chặng 1 · ở JPC: việc muốn làm được trước khi bay (2 ý theo nhóm nghề đứng đầu) */
  jpc: ['Tự giới thiệu, trả lời phỏng vấn bằng tiếng Nhật', 'Đúng giờ, 5S ở ký túc xá', 'Chưa hiểu là hỏi lại ngay', 'Tập thể lực 3 buổi mỗi tuần', 'Ngủ trước 23 giờ', 'Ghi chi tiêu mỗi tháng', 'Hỏi chuyện 1 anh chị đi trước'],
  jpcG: {
    sx: ['Học từ vựng chuyên ngành [Nghề]', 'Tập đọc bản vẽ, dùng thước đo'],
    xd: ['Học từ vựng an toàn công trường', 'Tập thể lực, quen làm ngoài trời'],
    nn: ['Tập dậy sớm 5 giờ 30', 'Học tên cây, dụng cụ bằng tiếng Nhật'],
    kg: ['Học kính ngữ, câu hay nói với các cụ', 'Học cách giúp ăn, dìu đỡ cơ bản'],
    dv: ['Luyện câu chào khách bằng kính ngữ', 'Tập làm theo quy trình, bảng kiểm'],
    vs: ['Học tên hóa chất, dụng cụ vệ sinh', 'Tập làm kỹ theo bảng kiểm'],
    ks: ['Ôn kiến thức chuyên ngành', 'Học tiếng Nhật công việc, kính ngữ'],
    gen: ['Học từ vựng chuyên ngành [Nghề]', 'Tập làm theo quy trình từng bước']
  },
  /* Chặng 2 · ở Nhật: điều muốn đạt trong công việc */
  work: ['Đậu thi tay nghề [Nghề]', 'Được giao việc khó hơn', 'Kèm, chỉ việc cho người mới', '@next'],
  workC: ['Kèm, chỉ việc cho người mới', '@next'], /* đi sau IND6[nghề].work */
  workG: {
    sx: ['Thành thợ chính, vững tay', 'Đứng được máy khó hơn'],
    xd: ['Thành thợ chính trong tổ', 'Đọc được bản vẽ thi công'],
    nn: ['Tự lo một khu nhà màng, chuồng trại', 'Lái được máy nông nghiệp'],
    kg: ['Tự chăm sóc các cụ, không cần kèm', 'Hướng tới chứng chỉ Kaigo Fukushishi'],
    dv: ['Phục vụ khách tự tin bằng kính ngữ', 'Làm được thêm vị trí khác'],
    vs: ['Chạy máy chà sàn, phủ wax thành thạo', 'Phụ trách một khu'],
    ks: ['Làm được dự án riêng', 'Họp, báo cáo tự tin bằng tiếng Nhật'],
    gen: ['Thành thợ chính, vững tay', 'Làm được việc khó hơn trong nghề']
  },
  joy: ['Du lịch các tỉnh của Nhật', 'Ngắm hoa anh đào, lá đỏ', 'Xem pháo hoa, lễ hội mùa hè', 'Kết bạn với người Nhật', 'Học nấu món Nhật', 'Chơi thể thao, câu lạc bộ', 'Chụp ảnh, quay video cuộc sống', 'Học thêm một kỹ năng'],
  /* trình độ tiếng Nhật: [giá trị, nhãn, lời Shin sau khi chọn] */
  lv1: [['N5', 'N5', 'Nhiều bạn bay với N5 rồi học tiếp ở Nhật. Sang đó vẫn cần học đều.'], ['N4', 'N4', 'N4 giúp bạn nghe hướng dẫn dễ hơn ngay tuần đầu.'],
    ['N3', 'N3', 'N3 trước khi bay là mục tiêu cao. Cần học đều mỗi ngày.'], ['u', 'Chưa chắc', 'Hỏi thầy cô diện của bạn cần trình độ nào nhé.']],
  lv2: [['N4', 'Giữ vững N4', 'Giữ vững cũng cần học đều. Nghe mỗi ngày ở chỗ làm sẽ giúp bạn.'], ['N3', 'N3', 'N3 giúp bạn hiểu chỉ thị, dễ được giao việc khó hơn.'],
    ['N2', 'N2', 'Nhiều anh chị trong chuyện Đổi đời về nước với N2.'], ['u', 'Chưa chắc', 'Không sao. Sang năm thứ hai xem lại cũng được.']],
  /* ghi chú theo diện (tóm từ VISA, tham khảo) */
  lvNote: { tts: 'Thực tập sinh: thường học khoảng N5–N4 trước khi bay.', iku: 'Ikusei Shuro: nhập cảnh cần khoảng N5 (A1).', ssw: 'Kỹ năng đặc định: cần N4 hoặc JFT-Basic.', na: '' },
  saveNote: 'Số bạn tự đặt, chỉ để tham khảo. Lương, chi phí mỗi nơi một khác. Số tham khảo có ở trang ngành trên Tikme.'
};

/* ---------- Ga 6 · Đo khoảng cách (a63) · [điều nghề cần, việc nhỏ gợi ý cho công thức “Khi… tôi sẽ…”] ---------- */
var GAP_COMMON = [
  ['Tiếng Nhật đủ nghe hướng dẫn, báo cáo', 'học 10 từ mới, nghe 1 bài 5 phút'],
  ['Đúng giờ, giữ 5S chỗ ở, chỗ học', 'dọn chỗ của mình 5 phút'],
  ['Sức khỏe để làm theo ca', 'tập thể dục 15 phút'],
  ['Tự lo chi tiêu, sinh hoạt', 'ghi chi tiêu trong ngày']
];
var GAP_GRP = {
  sx: [['Đọc bản vẽ, ký hiệu cơ bản', 'xem 1 bản vẽ mẫu, tra 3 ký hiệu'], ['Dùng dụng cụ đo', 'ôn cách đọc thước cặp 10 phút'], ['Ý thức an toàn trong xưởng', 'học 5 từ vựng an toàn lao động']],
  tp: [['Vệ sinh an toàn thực phẩm', 'rửa tay đủ các bước trước bữa ăn'], ['Làm nhanh, đều tay', 'tập một thao tác tay 10 phút'], ['Đứng lâu không mỏi', 'giãn cơ chân 10 phút']],
  xd: [['Làm ngoài trời, trên cao', 'tập thể lực 20 phút'], ['Đọc bản vẽ thi công cơ bản', 'tra 3 ký hiệu bản vẽ'], ['Ý thức an toàn công trường', 'học 5 từ vựng an toàn']],
  nn: [['Dậy sớm, làm theo mùa vụ', 'đặt báo thức 5 giờ 30'], ['Biết tên cây, dụng cụ bằng tiếng Nhật', 'học 5 tên cây, dụng cụ'], ['Sức bền làm ngoài trời', 'đi bộ nhanh 20 phút']],
  kg: [['Kính ngữ khi nói với các cụ', 'tập nói 3 câu kính ngữ'], ['Kiên nhẫn, nói nhẹ nhàng', 'hỏi thăm một người lớn tuổi trong nhà'], ['Biết các bước chăm sóc cơ bản', 'ôn 1 bước chăm sóc đã học']],
  dv: [['Chào khách bằng kính ngữ', 'luyện 3 câu chào khách'], ['Làm đúng quy trình', 'dọn phòng mình theo bảng kiểm'], ['Giữ nhịp lúc đông khách', 'làm nhanh một việc nhà 10 phút']],
  vs: [['Biết hóa chất, dụng cụ vệ sinh', 'học 5 tên dụng cụ, hóa chất'], ['Làm kỹ theo bảng kiểm', 'dọn phòng theo bảng kiểm 5 mục'], ['Quen làm sáng sớm', 'đặt báo thức 5 giờ 30']],
  ks: [['Kiến thức chuyên ngành vững', 'ôn 1 bài chuyên ngành 20 phút'], ['Tiếng Nhật khoảng N3', 'làm 1 đề N3 ngắn'], ['Họp, báo cáo bằng tiếng Nhật', 'tập nói 3 câu báo cáo']],
  gen: [['Làm theo quy trình từng bước', 'làm việc nhà theo danh sách'], ['Từ vựng chuyên ngành', 'học 5 từ chuyên ngành'], ['Ý thức an toàn lao động', 'học 5 từ vựng an toàn']]
};
var GAP_JOB = { 'thuc-pham': 'tp', 'thuy-san': 'tp' }; /* ngành dùng nhóm riêng thay nhóm grp */
var GAP_OPTS = [['h', 'Đã có'], ['p', 'Đang có dần'], ['n', 'Chưa có']];
/* ---------- Ga 6 · Biến điều còn thiếu thành thói quen (a63) → gợi ý thẻ Shin Routine (PS1.3.26) ----------
   RT_GAP: thẻ Shin cho từng điều chung GAP_COMMON (cùng thứ tự); điều nào học viên chọn "Chưa có"/"Đang có dần" thì gợi ý trước.
   RT_GRP: thẻ Shin hợp với nhóm nghề (sx, tp, xd, nn, kg, dv, vs, ks, gen). Lấy tối đa 3 thẻ, không trùng. Mã thẻ: PS_CONFIG.ROUTINE_LIB. */
var RT_GAP = ['5phut', '5s', 'vandong', 'chitieu'];
var RT_GRP = {
  sx: ['5s', 'horenso', 'som'], tp: ['5s', 'anuong', 'som'], xd: ['vandong', 'horenso', 'ngu'], nn: ['ngu', 'vandong', 'som'],
  kg: ['chao', 'camxuc', 'giup'], dv: ['chao', 'som', 'camxuc'], vs: ['5s', 'som', 'ngu'], ks: ['horenso', 'memo', '5phut'], gen: ['chao', '5s', 'horenso']
};
var RT_TXT = {
  sub: 'Công thức thành nếp khi bạn làm mỗi ngày. Shin gợi ý vài thẻ hợp với nghề [Nghề] và điều bạn còn thiếu.',
  subNoJob: 'Công thức thành nếp khi bạn làm mỗi ngày. Shin gợi ý vài thẻ hợp với điều bạn còn thiếu.'
};
var HABIT_WHEN = ['vừa thức dậy', 'đánh răng xong buổi sáng', 'trên đường đến lớp', 'học xong buổi chiều', 'ăn tối xong', 'trước khi ngủ'];

/* ---------- Ga 6 · CÁ NHÂN HÓA THEO TỪNG NGHỀ (CD01.0.8) ----------
   Tóm từ 17 trang ngành Tikme (tikme.com/nganh-nghe/<mã>), đối chiếu 16/11/2026. Tham khảo, viết gọn cho điện thoại.
   Khóa = mã ngành trong INDS (như INDP). Không có nghề (Nghề khác, không chọn ngành gần) → dùng PLAN.jpcG/workG, GAP_GRP theo nhóm.
   jpc: việc nên làm ở JPC (đứng đầu, rồi PLAN.jpc) · work: điều muốn đạt ở Nhật (đứng đầu, rồi PLAN.workC)
   gap: [điều nghề cần, việc nhỏ cho “Khi… tôi sẽ…”] (+ r3 của INDP + GAP_COMMON)
   lvs: câu theo nghề sau khi chọn trình độ tiếng Nhật trước khi bay · note: ghi chú trình độ (chuỗi, hoặc theo diện tts/iku/ssw/na)
   w6: Senpai khởi động · save: Senpai để dành · [ai, lời] · lời kể mẫu
   ivx: ví dụ trả lời phỏng vấn · ivt: 3 gợi ý cấu trúc · ivq: [câu hỏi thêm hay gặp, cách trả lời] */
var IND6 = {
  'co-khi': {
    jpc: ['Học từ vựng cơ khí, ký hiệu bản vẽ', 'Tập đọc thước cặp, panme', 'Học 5S, an toàn trong xưởng'],
    work: ['Đậu Ginou Kentei cơ khí cấp 3', 'Đứng máy CNC, gia công chính xác', 'Làm trưởng nhóm 5–10 người'],
    gap: [['Đọc bản vẽ, ký hiệu dung sai', 'tra 3 ký hiệu bản vẽ'], ['Đo bằng thước cặp, panme', 'tập đọc thước cặp 10 phút'], ['Tỉ mỉ, tự kiểm hàng', 'tự kiểm lại bài trước khi nộp'], ['An toàn trong xưởng', 'học 5 từ vựng an toàn']],
    lvs: 'Ở xưởng, bạn đọc bản vẽ và chỉ thị bằng tiếng Nhật.',
    w6: ['Anh khóa trước · ngành cơ khí', 'Hồi ở JPC mình chỉ nghĩ đến đứng máy. Sang Nhật mình thêm mốc thi tay nghề cấp 3, từ đó học có đích hơn.'],
    save: ['Anh khóa trước · ngành cơ khí', 'Năm đầu mình mua giày bảo hộ, đồ dùng nên để dành ít. Từ năm hai, tiền tăng ca mình để riêng.'],
    ivx: 'Ví dụ: Em chọn cơ khí vì em thích làm ra chi tiết chính xác. 5 năm sau, em muốn đứng máy CNC vững, làm trưởng nhóm.',
    ivt: ['Mở đầu: một lần bạn làm việc cần tỉ mỉ, chính xác.', 'Giữa: ở JPC bạn đang học bản vẽ, từ vựng cơ khí.', 'Cuối: 5 năm sau, thợ CNC vững tay hay trưởng nhóm?'],
    ivq: ['Em đọc được bản vẽ chưa?', 'Nói thật mức hiện tại, rồi nói bạn đang học thế nào.'] },
  'dien-tu': {
    jpc: ['Học từ vựng điện tử, tên linh kiện', 'Tìm hiểu chống tĩnh điện, phòng sạch', 'Tập ngồi đúng tư thế, nghỉ mắt'],
    work: ['Đậu Ginou Kentei lắp ráp điện tử cấp 3', 'Làm thợ chính, đo kiểm chức năng', 'Làm kỹ thuật viên kiểm tra'],
    gap: [['Mắt tinh, phân biệt màu', 'nhìn xa 1 phút sau mỗi giờ học'], ['Tỉ mỉ với việc nhỏ', 'xếp đồ nhỏ theo loại 10 phút'], ['Đọc sơ đồ, ghi phiếu kiểm', 'tập ghi 1 phiếu kiểm mẫu'], ['Kỷ luật phòng sạch', 'giữ bàn học sạch, gọn mỗi tối']],
    lvs: 'Ở xưởng điện tử, bạn đọc chỉ thị, ghi phiếu kiểm bằng tiếng Nhật.',
    w6: ['Chị khóa trước · ngành điện tử', 'Lúc đầu mình chỉ định làm 3 năm. Biết đậu cấp 3 là đi tiếp được, mình đổi kế hoạch, học thi sớm hơn.'],
    save: ['Chị khóa trước · ngành điện tử', 'Xưởng mình có ca đêm. Phụ cấp ca đêm mình để riêng, cuối năm thấy nhiều hơn mình nghĩ.'],
    ivx: 'Ví dụ: Em chọn điện tử vì em kiên nhẫn, thích việc tỉ mỉ. 5 năm sau, em muốn làm kỹ thuật viên kiểm tra.',
    ivt: ['Mở đầu: một việc tỉ mỉ bạn từng làm tốt.', 'Giữa: ở JPC bạn học tên linh kiện, tập nghỉ mắt.', 'Cuối: 5 năm sau, thợ chính hay kỹ thuật viên kiểm tra?'],
    ivq: ['Em có phân biệt màu tốt không?', 'Trả lời thật. Nói thêm bạn giữ mắt khỏe thế nào.'] },
  'han': {
    jpc: ['Học ký hiệu hàn, từ vựng nghề hàn', 'Tập hàn ở xưởng thực hành (nếu có)', 'Tập thể lực, quen đứng lâu'],
    work: ['Đậu thi kỹ năng hàn bậc chuyên môn', 'Hàn TIG, hàn mọi tư thế', 'Lấy chứng chỉ thợ hàn JIS'],
    gap: [['Đọc ký hiệu mối hàn', 'tra 3 ký hiệu hàn'], ['Tay vững, mắt tinh', 'kẻ đường thẳng không thước 5 phút'], ['Tự kiểm mối hàn trước khi giao', 'tự kiểm lại bài trước khi nộp'], ['An toàn khói hàn, đồ bảo hộ', 'học 5 từ vựng an toàn']],
    lvs: 'Ký hiệu, quy trình hàn đều bằng tiếng Nhật. Học sớm đỡ bỡ ngỡ.',
    w6: ['Anh khóa trước · ngành hàn', 'Ở JPC mình chỉ đặt mốc ngày bay. Sang Nhật, tổ trưởng chỉ mình thi chứng chỉ JIS, mình thêm mốc đó vào kế hoạch.'],
    save: ['Anh khóa trước · ngành hàn', 'Ngày nhận lương, mình chia luôn: gửi nhà, để dành, rồi mới tiêu. Tháng tăng ca nhiều thì để dành thêm.'],
    ivx: 'Ví dụ: Em chọn nghề hàn vì em thích làm ra thứ chắc chắn. 5 năm sau, em muốn có chứng chỉ JIS, kèm người mới.',
    ivt: ['Mở đầu: vì sao bạn hợp việc cần tay vững.', 'Giữa: ở JPC bạn học ký hiệu hàn, rèn thể lực.', 'Cuối: 5 năm sau, hàn TIG, chứng chỉ JIS hay tổ trưởng?'],
    ivq: ['Em đã thử hàn bao giờ chưa?', 'Nói thật. Nhiều nơi có thi hàn thử khi phỏng vấn, nên nói bạn sẽ tập thế nào.'] },
  'son': {
    jpc: ['Học từ vựng sơn, tên dụng cụ', 'Học an toàn hóa chất, đọc nhãn', 'Rèn tính kiên nhẫn, làm kỹ từng bước'],
    work: ['Đậu Ginou Kentei ngành sơn cấp 3', 'Phun sơn đều, làm thợ sơn chính', 'Pha màu, kiểm màng sơn'],
    gap: [['Kiên nhẫn ở khâu chuẩn bị bề mặt', 'làm kỹ 1 việc nhà từ đầu đến cuối'], ['Mắt nhìn màu, lỗi bề mặt', 'so 2 màu gần giống nhau'], ['Đọc nhãn sơn, công thức pha', 'học 5 từ trên nhãn hóa chất'], ['Đứng, cúi nhiều', 'giãn cơ lưng 10 phút']],
    lvs: 'Công thức, nhãn sơn đều bằng tiếng Nhật. Đọc được là an toàn hơn.',
    w6: ['Anh khóa trước · ngành sơn', 'Mình tưởng sơn là phun cho đẹp. Sang Nhật mới biết chuẩn bị bề mặt quan trọng nhất, nên mình học kỹ khâu đó trước.'],
    save: ['Anh khóa trước · ngành sơn', 'Năm đầu mình chưa quen chi tiêu nên để dành ít. Năm hai mình ghi chi tiêu mỗi tuần, để dành đều hẳn.'],
    ivx: 'Ví dụ: Em chọn nghề sơn vì em thích thấy món đồ đẹp lên. 5 năm sau, em muốn pha màu, kèm người mới.',
    ivt: ['Mở đầu: một lần bạn làm kỹ để có kết quả đẹp.', 'Giữa: ở JPC bạn học từ vựng, an toàn hóa chất.', 'Cuối: 5 năm sau, thợ sơn chính hay pha màu?'],
    ivq: ['Em có ngại mùi sơn, làm trên cao không?', 'Nói thật. Nói thêm bạn biết đồ bảo hộ giúp gì.'] },
  'duc-nhua': {
    jpc: ['Học từ vựng ép nhựa, tên lỗi sản phẩm', 'Tập ghi số liệu gọn, rõ', 'Học biển báo an toàn máy'],
    work: ['Đậu Ginou Kentei đúc nhựa cấp 3', 'Làm thợ chính đứng máy ép', 'Thay khuôn, chỉnh điều kiện đúc'],
    gap: [['Nhận ra ba via, bọt khí, cong vênh', 'soi kỹ 1 đồ nhựa trong nhà'], ['Ghi thông số máy cẩn thận', 'ghi 3 số liệu trong ngày vào sổ'], ['Quen làm ca đêm', 'giữ giờ ngủ cố định cả tuần'], ['An toàn khi máy chạy', 'học 5 biển báo an toàn']],
    lvs: 'Bảng thông số, chỉ dẫn an toàn đều bằng tiếng Nhật.',
    w6: ['Chị khóa trước · ngành đúc nhựa', 'Kế hoạch đầu của mình chỉ có đi làm, gửi tiền về. Sau một năm, mình thêm mốc học thay khuôn và thấy việc vui hơn.'],
    save: ['Chị khóa trước · ngành đúc nhựa', 'Ký túc xá gần xưởng nên mình đỡ tiền đi lại. Khoản đó mình để dành riêng.'],
    ivx: 'Ví dụ: Em chọn đúc nhựa vì em cẩn thận, chịu được việc lặp lại. 5 năm sau, em muốn tự thay khuôn, làm tổ trưởng.',
    ivt: ['Mở đầu: vì sao bạn hợp việc cẩn thận, đều tay.', 'Giữa: ở JPC bạn học từ vựng máy, tập ghi số liệu.', 'Cuối: 5 năm sau, thay khuôn hay làm tổ trưởng?'],
    ivq: ['Em làm ca đêm được không?', 'Nói thật. Kể bạn giữ giờ ngủ, sức khỏe thế nào.'] },
  'dong-goi-cong-nghiep': {
    jpc: ['Học từ vựng đóng gói, ký hiệu vận chuyển', 'Tập đo, ghi kích thước chính xác', 'Học an toàn khi nâng hạ'],
    work: ['Đậu Ginou Kentei đóng gói cấp 3', 'Lấy chứng chỉ lái xe nâng', 'Làm thợ chính khung gỗ, chống gỉ'],
    gap: [['Đo, cân, ghi kích thước chính xác', 'đo 3 đồ vật, ghi vào sổ'], ['Đọc phiếu đóng gói, ký hiệu', 'học 5 ký hiệu vận chuyển'], ['Nâng hạ đúng cách', 'tập thể lực 20 phút'], ['Làm đúng mẫu, không bỏ bước', 'làm việc nhà theo danh sách']],
    lvs: 'Phiếu đóng gói, ký hiệu vận chuyển đều bằng tiếng Nhật. Đọc được sẽ ít sai.',
    w6: ['Anh khóa trước · ngành đóng gói', 'Mình chưa từng nghĩ tới xe nâng. Xưởng hỗ trợ thi, mình thêm mốc đó và được giao việc mới.'],
    save: ['Anh khóa trước · ngành đóng gói', 'Cuối năm tăng ca nhiều, lương cũng nhiều hơn. Mình không tiêu thêm, để dành hết phần đó.'],
    ivx: 'Ví dụ: Em chọn đóng gói vì em cẩn thận, thích làm gọn gàng. 5 năm sau, em muốn làm tổ trưởng.',
    ivt: ['Mở đầu: một lần bạn sắp xếp, làm gọn gàng.', 'Giữa: ở JPC bạn học ký hiệu, tập đo và ghi.', 'Cuối: 5 năm sau, thợ chính hay tổ trưởng?'],
    ivq: ['Mùa cao điểm tăng ca nhiều, em thấy sao?', 'Nói thật. Kể bạn giữ sức khỏe thế nào.'] },
  'in-an': {
    jpc: ['Học từ vựng nghề in, tên màu', 'Tìm hiểu CMYK, cách đọc tệp in', 'Rèn làm đúng ngay từ đầu'],
    work: ['Đậu Ginou Kentei nghề in cấp 3', 'Đứng máy, tự so màu', 'Làm thợ in chính, phụ trách máy'],
    gap: [['Mắt phân biệt màu tốt', 'so 2 màu gần giống nhau'], ['Làm đúng ngay từ đầu', 'kiểm lại bài 1 lần trước khi nộp'], ['Hiểu màu cơ bản (CMYK)', 'tìm hiểu CMYK 10 phút'], ['Đọc phiếu lệnh, bảng thông số', 'học 5 từ vựng nghề in']],
    lvs: 'Phiếu lệnh, phiếu kiểm ở nhà in đều bằng tiếng Nhật.',
    w6: ['Chị khóa trước · ngành in ấn', 'Lúc đầu mình không biết in offset và in ống đồng có thời hạn khác nhau. Mình hỏi kỹ rồi sửa kế hoạch cho đúng.'],
    save: ['Chị khóa trước · ngành in ấn', 'Mình nấu ăn chung với bạn cùng phòng. Đỡ tiền ăn, mỗi tháng để dành thêm được một ít.'],
    ivx: 'Ví dụ: Em chọn nghề in vì em thích màu sắc, làm tỉ mỉ. 5 năm sau, em muốn là thợ in chính.',
    ivt: ['Mở đầu: vì sao bạn thích màu sắc, việc tỉ mỉ.', 'Giữa: ở JPC bạn học từ vựng, tìm hiểu CMYK.', 'Cuối: 5 năm sau, thợ in chính hay trưởng ca?'],
    ivq: ['Em có nhìn màu tốt không?', 'Trả lời thật. Nói thêm bạn rèn mắt nhìn màu thế nào.'] },
  'may-mac': {
    jpc: ['Học tên công đoạn may bằng tiếng Nhật', 'Tập may cơ bản nếu có máy', 'Tập ngồi thẳng lưng, nghỉ mắt'],
    work: ['Đậu Ginou Kentei nghề may cấp 3', 'Theo kịp năng suất chuẩn của chuyền', 'Làm QC hoặc kỹ thuật rập'],
    gap: [['Đường may thẳng, đều tay', 'tập một thao tác tay 10 phút'], ['Mắt soi lỗi đường chỉ', 'soi đường may 1 áo của mình'], ['Ngồi lâu, giữ lưng thẳng', 'giãn cơ lưng 10 phút'], ['Tên công đoạn, hiệu lệnh máy', 'học 5 từ công đoạn may']],
    lvs: 'Ở chuyền may, tên công đoạn, hiệu lệnh máy đều bằng tiếng Nhật.',
    w6: ['Chị khóa trước · ngành may mặc', 'Kế hoạch đầu của mình chỉ là may cho nhanh. Sang Nhật mình thêm mốc học kiểm hàng, giờ mình làm QC.'],
    save: ['Chị khóa trước · ngành may mặc', 'Xưởng làm giờ hành chính, tối mình rảnh. Mình tự nấu ăn, ít ra ngoài, để dành đều mỗi tháng.'],
    ivx: 'Ví dụ: Em chọn may mặc vì em khéo tay, kiên nhẫn. 5 năm sau, em muốn làm QC trong xưởng may.',
    ivt: ['Mở đầu: một món đồ bạn từng tự may, tự sửa.', 'Giữa: ở JPC bạn học tên công đoạn, tập ngồi đúng.', 'Cuối: 5 năm sau, thợ chính, QC hay kỹ thuật rập?'],
    ivq: ['Em đã may máy bao giờ chưa?', 'Nói thật. Chưa thì nói bạn sẽ tập thế nào.'] },
  'xay-dung': {
    jpc: ['Học hiệu lệnh, từ vựng an toàn công trường', 'Tập thể lực, quen làm ngoài trời', 'Học đọc bản vẽ thi công cơ bản'],
    work: ['Đậu Ginou Kentei xây dựng', 'Làm thợ chính một nhánh nghề', 'Làm trưởng nhóm 3–5 người'],
    gap: [['Sức bền, mang vác vật liệu', 'tập thể lực 20 phút'], ['Nghe hiệu lệnh an toàn', 'học 5 từ hiệu lệnh an toàn'], ['Đọc bản vẽ thi công', 'tra 3 ký hiệu bản vẽ'], ['Làm theo nhóm, báo lại việc', 'báo lại việc đã làm với bạn cùng phòng']],
    lvs: 'Ở công trường, hiệu lệnh an toàn bằng tiếng Nhật. Có N4 trở lên là lợi thế.',
    w6: ['Anh khóa trước · ngành xây dựng', 'Năm đầu mình chỉ phụ việc. Tổ trưởng hỏi muốn theo nhánh nào, mình chọn cốt thép và kế hoạch rõ hơn từ đó.'],
    save: ['Anh khóa trước · ngành xây dựng', 'Vùng mình có tuyết, mùa đông ít việc ngoài trời hơn. Mình để dành từ mùa hè để mùa đông vẫn yên tâm.'],
    ivx: 'Ví dụ: Em chọn xây dựng vì em khỏe, thích thấy công trình lên từng tầng. 5 năm sau, em muốn làm trưởng nhóm.',
    ivt: ['Mở đầu: một việc nặng, làm theo nhóm bạn từng làm.', 'Giữa: ở JPC bạn học hiệu lệnh an toàn, rèn thể lực.', 'Cuối: 5 năm sau, thợ chính hay trưởng nhóm?'],
    ivq: ['Em làm việc gì liên quan xây dựng chưa?', 'Có thì kể ngắn. Chưa thì kể việc nặng, làm nhóm bạn từng làm.'] },
  'o-to': {
    jpc: ['Học từ vựng ô tô, tên phụ tùng', 'Ôn nền cơ khí động lực, điện ô tô', 'Tập làm đúng danh mục, ghi báo cáo'],
    work: ['Đậu Ginou Kentei bảo dưỡng ô tô cấp 3', 'Chẩn đoán lỗi, làm hạng mục khó', 'Hướng tới chứng chỉ Seibishi'],
    gap: [['Hiểu động cơ, gầm, điện ô tô', 'ôn 1 bộ phận xe 15 phút'], ['Làm đúng danh mục, không bỏ bước', 'làm việc nhà theo danh sách'], ['Dùng dụng cụ đo, máy chẩn đoán', 'học tên 5 dụng cụ đo'], ['Ghi báo cáo kỹ thuật', 'ghi 3 dòng việc đã làm trong ngày']],
    lvs: 'Tài liệu hãng, báo cáo kỹ thuật bằng tiếng Nhật. Nhắm Kỹ năng đặc định thì nên có N4.',
    w6: ['Anh khóa trước · ngành ô tô', 'Mình định làm 3 năm rồi về. Biết đậu cấp 3 là đi tiếp được, mình thêm 2 năm để học chẩn đoán xe hybrid.'],
    save: ['Anh khóa trước · ngành ô tô', 'Mùa đăng kiểm tăng ca nhiều. Tiền tăng ca mùa đó mình để riêng, thành khoản để dành lớn nhất năm.'],
    ivx: 'Ví dụ: Em chọn ô tô vì em hay sửa xe máy cùng ba. 5 năm sau, em muốn tự chẩn đoán lỗi, làm tổ trưởng.',
    ivt: ['Mở đầu: một lần bạn sửa xe, tìm ra lỗi.', 'Giữa: ở JPC bạn học tên phụ tùng, ôn cơ khí.', 'Cuối: 5 năm sau, thợ chính, tổ trưởng hay Seibishi?'],
    ivq: ['Em có bằng lái xe chưa?', 'Có thì nói. Chưa thì nói bạn có định học không.'] },
  'nong-nghiep': {
    jpc: ['Chọn nhánh trồng trọt hoặc chăn nuôi', 'Học tên cây, con vật, dụng cụ tiếng Nhật', 'Tập dậy sớm 5 giờ 30'],
    work: ['Đậu thi kỹ năng nông nghiệp bậc chuyên môn', 'Thạo trọn vụ mùa, lái máy nông nghiệp', 'Phụ trách một khu nhà màng'],
    gap: [['Biết tên cây, con vật, dụng cụ', 'học 5 tên cây, dụng cụ'], ['Sức bền làm cả ngày', 'đi bộ nhanh 20 phút ngoài trời'], ['Ghi nhật ký cây trồng, vật nuôi', 'ghi 3 dòng nhật ký mỗi tối'], ['Đọc lịch thời vụ, nhãn phân thuốc', 'học 5 từ trên nhãn phân bón']],
    lvs: 'Trang trại nhỏ nói chuyện với chủ mỗi ngày. Tiếng Nhật lên nhanh, sống dễ hơn.',
    w6: ['Anh khóa trước · ngành nông nghiệp', 'Lúc đầu mình chưa biết trồng trọt và chăn nuôi thi hai đề khác. Hỏi kỹ rồi, mình chọn nhà màng và sửa kế hoạch.'],
    save: ['Anh khóa trước · ngành nông nghiệp', 'Ở quê Nhật ít chỗ tiêu tiền. Mình để dành đều, cuối tuần đạp xe quanh làng.'],
    ivx: 'Ví dụ: Em chọn nông nghiệp vì nhà em làm vườn. 5 năm sau, em muốn phụ trách một khu nhà màng.',
    ivt: ['Mở đầu: việc đồng áng, chăn nuôi bạn từng làm.', 'Giữa: ở JPC bạn học tên cây, tập dậy sớm.', 'Cuối: 5 năm sau, thạo vụ mùa hay phụ trách nhà màng?'],
    ivq: ['Em chịu lạnh, sống ở vùng quê được không?', 'Nói thật. Kể bạn chuẩn bị sức khỏe thế nào.'] },
  'thuy-san': {
    jpc: ['Học từ vựng thủy sản, tên các loại cá', 'Tìm hiểu vệ sinh HACCP cơ bản', 'Rèn sức bền, quen đứng lâu'],
    work: ['Đậu Ginou Kentei chế biến thủy sản', 'Làm thợ chính, vận hành dây chuyền', 'Làm trưởng ca, kiêm QC'],
    gap: [['Tay dao nhanh, đều', 'tập một thao tác tay 10 phút'], ['Vệ sinh theo HACCP', 'rửa tay đủ các bước trước bữa ăn'], ['Giữ nhịp nhanh mùa cao điểm', 'làm nhanh một việc nhà 10 phút'], ['Ghi chép số lô cẩn thận', 'ghi 3 dòng việc đã làm trong ngày']],
    lvs: 'Hiệu lệnh trong xưởng thủy sản dùng tiếng Nhật nhiều.',
    w6: ['Chị khóa trước · ngành thủy sản', 'Mình tưởng làm thủy sản là ra biển. Hỏi kỹ mới biết làm trong xưởng lạnh, nên mình chuẩn bị đồ giữ ấm từ sớm.'],
    save: ['Chị khóa trước · ngành thủy sản', 'Mùa cá hồi tăng ca nhiều. Mình để dành phần tăng ca, mùa ít việc vẫn yên tâm.'],
    ivx: 'Ví dụ: Em chọn thủy sản vì nhà em ở vùng biển, em quen làm cá. 5 năm sau, em muốn làm trưởng ca.',
    ivt: ['Mở đầu: lần bạn làm cá, làm bếp với gia đình.', 'Giữa: ở JPC bạn học từ vựng, tìm hiểu HACCP.', 'Cuối: 5 năm sau, thợ chính hay trưởng ca?'],
    ivq: ['Em làm trong xưởng lạnh cả ngày được không?', 'Nói thật. Kể bạn giữ sức khỏe, giữ ấm thế nào.'] },
  'thuc-pham': {
    jpc: ['Học từ vựng vệ sinh, nhiệt độ, ca làm', 'Rửa tay đủ bước, giữ vệ sinh cá nhân', 'Tập cân đong chính xác đến gam'],
    work: ['Đậu Ginou Kentei ngành thực phẩm', 'Làm thợ chính của chuyền', 'Làm trưởng ca sản xuất'],
    gap: [['Quen ca xoay, ca đêm', 'giữ giờ ngủ cố định cả tuần'], ['Cân đong chính xác', 'cân 3 món khi nấu ăn'], ['Tập trung lâu với việc lặp lại', 'học tập trung 25 phút không điện thoại'], ['Đọc nhãn nhiệt độ, bảng ca', 'học 5 từ vựng vệ sinh']],
    lvs: 'Hiệu lệnh vệ sinh, nhãn nhiệt độ, bảng ca đều bằng tiếng Nhật.',
    w6: ['Chị khóa trước · ngành thực phẩm', 'Mình chưa nghĩ tới ca xoay. Sang đó mình sửa giờ học tiếng Nhật theo ca, nhờ vậy vẫn học đều.'],
    save: ['Anh khóa trước · ngành thực phẩm', 'Năm đầu mình để dành ít vì còn mua đồ dùng. Từ năm hai, nhận lương là mình chia phần để dành trước.'],
    ivx: 'Ví dụ: Em chọn thực phẩm vì em thích nấu ăn, làm sạch sẽ. 5 năm sau, em muốn làm trưởng ca.',
    ivt: ['Mở đầu: một việc bếp núc, sạch sẽ bạn làm tốt.', 'Giữa: ở JPC bạn học từ vựng vệ sinh, tập cân đong.', 'Cuối: 5 năm sau, thợ chính hay trưởng ca?'],
    ivq: ['Em giữ vệ sinh cá nhân thế nào?', 'Kể việc cụ thể bạn làm mỗi ngày.'] },
  'dieu-duong': {
    jpc: ['Học kính ngữ, câu hay nói với các cụ', 'Học từ vựng chăm sóc, bộ phận cơ thể', 'Trò chuyện với người lớn tuổi mỗi tuần'],
    work: ['Tự chăm sóc các cụ, không cần kèm', 'Học khóa thực hành Jitsumusha Kenshu', 'Hướng tới chứng chỉ Kaigo Fukushishi'],
    gap: [['Kính ngữ khi nói với các cụ', 'tập nói 3 câu kính ngữ'], ['Kiên nhẫn, biết quan sát', 'hỏi thăm một người lớn tuổi trong nhà'], ['Biết các bước chăm sóc cơ bản', 'ôn 1 bước chăm sóc đã học'], ['Ghi hồ sơ, bàn giao ca', 'ghi 3 dòng việc trong ngày']],
    lvs: 'Kaigo nói chuyện với các cụ cả ngày. Tiếng Nhật càng tốt, các cụ càng tin bạn.',
    note: { tts: 'Thực tập sinh kaigo: cần N4 khi nhập cảnh.', ssw: 'Kỹ năng đặc định kaigo: N4 hoặc JFT-Basic, thêm bài thi tiếng Nhật kaigo.', na: 'Thực tập sinh kaigo cần N4 khi nhập cảnh.' },
    w6: ['Chị khóa trước · ngành kaigo', 'Hồi ở JPC mình nghĩ N4 là đủ. Sang Nhật mới thấy cần N3 để hiểu các cụ, nên mình dời mốc N3 lên sớm hơn.'],
    save: ['Chị khóa trước · ngành kaigo', 'Năm đầu mình tập trung học việc, để dành ít thôi. Từ năm hai mình để dành đều, còn dành tiền học khóa thực hành.'],
    ivx: 'Ví dụ: Em chọn kaigo vì em từng chăm bà nội. 5 năm sau, em muốn đậu Kaigo Fukushishi.',
    ivt: ['Mở đầu: một lần bạn chăm sóc người thân.', 'Giữa: ở JPC bạn học kính ngữ, từ vựng chăm sóc.', 'Cuối: 5 năm sau, chăm sóc chính hay Kaigo Fukushishi?'],
    ivq: ['Nếu cụ không chịu ăn, em sẽ làm gì?', 'Không có một đáp án. Nói cách bạn hỏi han, kiên nhẫn, báo người phụ trách.'] },
  'nha-hang': {
    jpc: ['Luyện câu chào khách bằng kính ngữ', 'Chọn nhánh nhà hàng hoặc khách sạn', 'Tập tác phong gọn gàng, đúng giờ'],
    work: ['Đậu thi kỹ năng nhà hàng hoặc khách sạn', 'Phục vụ khách tự tin bằng kính ngữ', 'Làm trưởng ca, phụ trách khu vực'],
    gap: [['Kính ngữ với khách', 'luyện 3 câu chào khách'], ['Làm đúng sổ hướng dẫn', 'dọn phòng mình theo bảng kiểm'], ['Tác phong gọn gàng, tươi tắn', 'chào mọi người trong lớp mỗi sáng'], ['Đứng, đi lại nhiều cả ca', 'đi bộ nhanh 20 phút']],
    lvs: 'Lễ tân, phục vụ dùng kính ngữ nhiều. Học sớm, bạn sẽ tự tin hơn.',
    w6: ['Chị khóa trước · ngành nhà hàng', 'Mình định làm phục vụ mãi. Sau một năm mình muốn thử lễ tân, nên thêm mốc học kính ngữ khó hơn.'],
    save: ['Chị khóa trước · ngành nhà hàng', 'Ở Nhật ít tiền tip, thu nhập chủ yếu là lương. Mình đặt số để dành trước, tiêu phần còn lại.'],
    ivx: 'Ví dụ: Em chọn nhà hàng vì em thích làm khách vui. 5 năm sau, em muốn làm trưởng ca.',
    ivt: ['Mở đầu: một lần bạn làm ai đó hài lòng.', 'Giữa: ở JPC bạn luyện kính ngữ, tác phong.', 'Cuối: 5 năm sau, nhân viên chính hay trưởng ca?'],
    ivq: ['Khách phàn nàn, em sẽ làm gì?', 'Không có một đáp án. Nói cách bạn lắng nghe, xin lỗi, báo người phụ trách.'] },
  've-sinh-toa-nha': {
    jpc: ['Học tên hóa chất, dụng cụ vệ sinh', 'Tập đúng giờ, ngăn nắp mỗi ngày', 'Học lễ nghi chào hỏi'],
    work: ['Đậu Ginou Kentei vệ sinh tòa nhà cấp 3', 'Chạy máy chà sàn, phủ wax, lau kính', 'Làm tổ trưởng ca, kiểm tra bàn giao'],
    gap: [['Chọn hóa chất đúng loại bề mặt', 'học 5 tên hóa chất, dụng cụ'], ['Làm kỹ theo bảng kiểm', 'dọn phòng theo bảng kiểm 5 mục'], ['Dùng thang, máy móc an toàn', 'học 5 biển báo an toàn'], ['Lễ nghi với người trong tòa nhà', 'chào mọi người trong lớp mỗi sáng']],
    lvs: 'Nhãn hóa chất, phiếu bàn giao bằng tiếng Nhật. Đọc sai dễ làm hỏng bề mặt.',
    w6: ['Anh khóa trước · ngành vệ sinh tòa nhà', 'Lúc đầu mình nghĩ việc này đơn giản. Học rồi mới biết mỗi sàn dùng hóa chất khác, nên mình thêm mốc thi tay nghề.'],
    save: ['Anh khóa trước · ngành vệ sinh tòa nhà', 'Mình làm sáng sớm, chiều học tiếng Nhật ở nhà. Ít đi chơi nên để dành được đều.'],
    ivx: 'Ví dụ: Em chọn vệ sinh tòa nhà vì em ngăn nắp, đúng giờ. 5 năm sau, em muốn làm tổ trưởng ca.',
    ivt: ['Mở đầu: thói quen ngăn nắp, đúng giờ của bạn.', 'Giữa: ở JPC bạn học tên hóa chất, lễ nghi.', 'Cuối: 5 năm sau, thợ chính hay tổ trưởng ca?'],
    ivq: ['Em làm sáng sớm hoặc buổi tối được không?', 'Nói thật. Kể bạn giữ giờ giấc thế nào.'] },
  'ky-su': {
    jpc: ['Học tiếng Nhật kỹ thuật chuyên ngành', 'Ôn kiến thức chuyên ngành đã học', 'Tập báo cáo công việc bằng tiếng Nhật'],
    work: ['Làm đúng chuyên ngành đã học', 'Họp, báo cáo tự tin bằng tiếng Nhật', 'Lên N2, làm được dự án riêng'],
    gap: [['Kiến thức chuyên ngành vững', 'ôn 1 bài chuyên ngành 20 phút'], ['Tiếng Nhật khoảng N3', 'làm 1 đề N3 ngắn'], ['Phần mềm, công cụ chuyên ngành', 'dùng 1 phần mềm chuyên ngành 20 phút'], ['Hiểu sản phẩm, thị trường', 'đọc 1 tin công nghệ Nhật']],
    lvs: 'Họp, báo cáo đều bằng tiếng Nhật. N3 là mức thường cần khi tuyển.',
    note: 'Kỹ sư: thường cần N3 trở lên và bằng đúng chuyên ngành.',
    w6: ['Anh khóa trước · kỹ sư cơ khí', 'Mình định học xong N3 rồi mới ôn chuyên ngành. Thầy cô khuyên làm song song, nhờ vậy mình phỏng vấn tự tin hơn.'],
    save: ['Anh khóa trước · kỹ sư cơ khí', 'Mình thuê nhà riêng nên chi nhiều hơn. Mình vẫn ghi chi tiêu và để dành trước mỗi tháng.'],
    ivx: 'Ví dụ: Em chọn ngành này vì em học cơ khí, thích thiết kế. 5 năm sau, em muốn làm dự án riêng.',
    ivt: ['Mở đầu: chuyên ngành bạn học, một đồ án bạn thích.', 'Giữa: ở JPC bạn học N3, ôn chuyên ngành.', 'Cuối: 5 năm sau, chuyên gia hay quản lý nhóm?'],
    ivq: ['Đồ án tốt nghiệp của em là gì?', 'Kể ngắn: làm gì, khó ở đâu, bạn học được gì.'] }
};

/* ---------- Ga 6 · Phỏng vấn 60 giây (a63) ---------- */
var IV6_GEN = { /* dự phòng khi không có nghề */
  w6: ['Senpai khóa trước', 'Hồi ở JPC, kế hoạch của mình rõ chừng 3 phần. Sang Nhật mình sửa mốc N3 hai lần. Có kế hoạch để sửa vẫn hơn không có.'],
  save: ['Anh khóa trước · ngành thực phẩm', 'Năm đầu mình để dành ít vì còn mua đồ dùng. Từ năm hai, nhận lương là mình chia phần để dành trước.'],
  ivt: ['Mở đầu: vì sao chọn nghề, kể một chuyện thật.', 'Giữa: ở JPC bạn đang chuẩn bị gì.', 'Cuối: 5 năm sau bạn muốn làm gì.']
};
var IV = {
  more: 'Người phỏng vấn ngành [Nghề] hay hỏi thêm',
  q: 'Vì sao em chọn nghề này? 5 năm sau em muốn làm gì?',
  secs: 60, wps: 2.5, /* tốc độ đọc to ước lượng: khoảng 2,5 từ mỗi giây */
  done: 'Hết 60 giây! Nói đủ ý chưa? Thiếu thì sửa bài rồi tập lại nhé.',
  stop: 'Bạn nói trong [s] giây. Tập thêm lần nữa cũng được.'
};

/* ---------- Ga 7 · THỬ THÁCH · TUẦN ĐẦU Ở NHẬT (a71) · THEO TỪNG NGHỀ (CD01.0.9) ----------
   Không đúng sai: 3 cách ứng xử đều hợp lý, mỗi cách có được/mất. Sau khi chọn: "Điều có thể xảy ra" + Senpai kể (lời kể mẫu).
   Khóa = mã ngành trong INDS. Không có nghề → IND7.gen. Hình cảnh: ART7[nhóm grp] hoặc sc.art.
   sc: tt tên ngắn (vào ô 8) · who người nói · msg tình huống · opts [{t, get, lose, may}] · sp [ai, lời]
   prep: 2 gợi ý chuẩn bị từ bây giờ · hard: 2 việc khó (vùng học hỏi) theo nghề */
var ART7 = { sx: 'factory', xd: 'site', nn: 'farm', kg: 'care', dv: 'shop', vs: 'clean', ks: 'office', gen: 'factory' };
var WEEK7 = ['T2', 'T3', 'T4', 'T5', 'T6'];
var IND7 = {
  'co-khi': {
    sc: { tt: 'Chưa nghe kịp chỉ thị', who: 'Tổ trưởng', msg: '“Kore, 0.05 made ne!” Tổ trưởng nói nhanh rồi đi. Bạn chưa chắc mình hiểu đúng.',
      opts: [
        { t: 'Chạy theo hỏi lại ngay', get: 'Hiểu đúng từ đầu', lose: 'Hơi ngại làm phiền', may: 'Tổ trưởng chỉ vào bản vẽ, nói chậm lại. Lần sau bạn hỏi dễ hơn.' },
        { t: 'Làm thử 1 cái, đưa tổ trưởng xem', get: 'Chủ động, có cái để hỏi', lose: 'Sai thì làm lại', may: 'Tổ trưởng đo thử, chỉ chỗ cần chỉnh. Bạn hiểu “0,05” là gì.' },
        { t: 'Hỏi bạn Việt đứng máy bên cạnh', get: 'Nhanh, dễ hỏi', lose: 'Bạn ấy cũng có thể nhầm', may: 'Bạn ấy giải thích được. Nhưng có lúc bạn ấy cũng không chắc.' }],
      sp: ['Anh khóa trước · ngành cơ khí', 'Tuần đầu mình ghi số dung sai ra giấy rồi hỏi lại. Hỏi vài lần là quen cách tổ trưởng nói.'] },
    prep: ['Học cách đọc số, dung sai bằng tiếng Nhật', 'Tập câu “Mō ichido onegaishimasu” (Xin nói lại)'],
    hard: ['Đọc 1 bản vẽ mẫu, giải thích cho bạn trong 2 phút', 'Đo 10 chi tiết bằng thước cặp, ghi kết quả'] },
  'dien-tu': {
    sc: { tt: 'Gắn ngược linh kiện', who: 'Senpai', msg: '“Kono buhin, gyaku da yo.” Senpai chỉ linh kiện bạn gắn ngược. Cả khay 20 bo mạch đã xong.',
      opts: [
        { t: 'Xin lỗi, tháo ra gắn lại ngay', get: 'Sửa liền, không để lâu', lose: 'Mất thời gian, hơi ngượng', may: 'Senpai gật đầu, chỉ dấu chấm trên linh kiện. Bạn nhớ luôn.' },
        { t: 'Hỏi cách nhận biết chiều linh kiện', get: 'Lần sau không nhầm', lose: 'Lộ ra mình chưa biết', may: 'Senpai chỉ ký hiệu chiều. Từ đó bạn tự kiểm trước khi gắn.' },
        { t: 'Báo tổ trưởng, ghi vào phiếu lỗi', get: 'Đúng quy trình, rõ ràng', lose: 'Sợ bị đánh giá', may: 'Tổ trưởng cảm ơn vì bạn báo sớm. Lỗi được chặn trước khi đi tiếp.' }],
      sp: ['Chị khóa trước · ngành điện tử', 'Tuần đầu mình gắn ngược cả khay. Mình báo ngay, tổ trưởng bảo báo sớm là tốt nhất.'] },
    prep: ['Học tên linh kiện, ký hiệu chiều', 'Tập câu báo lỗi: “Mondai ga arimasu”'],
    hard: ['Học 20 tên linh kiện bằng tiếng Nhật, nhờ bạn kiểm tra', 'Tự kiểm bài của mình theo bảng kiểm, 7 ngày liền'] },
  'han': {
    sc: { tt: 'Bị bảo hàn lại', who: 'Tổ trưởng', msg: '“Yarinaoshi.” Tổ trưởng chỉ mối hàn của bạn: làm lại. Không nói thêm gì.',
      opts: [
        { t: 'Hỏi lỗi ở đâu rồi mới làm lại', get: 'Biết sửa chỗ nào', lose: 'Sợ tổ trưởng đang bận', may: 'Tổ trưởng chỉ chỗ mối hàn chưa đều. Lần sau bạn tự thấy.' },
        { t: 'Làm lại ngay, so với mối hàn mẫu', get: 'Tự học, không chờ', lose: 'Có thể sai chỗ cũ', may: 'Lần hai khá hơn. Bạn vẫn cần hỏi thêm một chỗ.' },
        { t: 'Xin đứng xem senpai hàn', get: 'Học từ tay người giỏi', lose: 'Chậm hơn một chút', may: 'Senpai cho xem 5 phút. Bạn để ý tốc độ tay của anh.' }],
      sp: ['Anh khóa trước · ngành hàn', 'Nghe “làm lại” mình buồn lắm. Mình hỏi “Doko ga dame desu ka?”, rồi mới thấy tổ trưởng không giận.'] },
    prep: ['Tập câu “Doko ga dame desu ka?” (Chỗ nào chưa được?)', 'Xem video so mối hàn đạt và chưa đạt'],
    hard: ['Học 15 ký hiệu hàn, giải thích cho bạn nghe', 'Tập thể lực 20 phút mỗi ngày, 14 ngày liền'] },
  'son': {
    sc: { tt: 'Băng che bị hở', who: 'Senpai', msg: '“Masukingu, mō ikkai.” Băng che bị hở, sơn lem sang chỗ khác.',
      opts: [
        { t: 'Xin lỗi, che lại kỹ từng mép', get: 'Sửa đúng chỗ', lose: 'Chậm hơn người khác', may: 'Lần này kín hơn. Senpai bảo che kỹ là nửa phần việc.' },
        { t: 'Nhờ senpai làm mẫu một góc', get: 'Thấy cách làm chuẩn', lose: 'Làm phiền senpai', may: 'Senpai làm mẫu một góc, bạn làm các góc còn lại.' },
        { t: 'Hỏi có mẹo che nhanh hơn không', get: 'Học mẹo của nghề', lose: 'Dễ bị nhắc làm kỹ trước', may: 'Senpai bảo: kỹ trước, nhanh sau. Rồi chỉ bạn một mẹo dán băng.' }],
      sp: ['Anh khóa trước · ngành sơn', 'Tháng đầu mình chủ yếu che và chà nhám. Làm kỹ phần đó, mình được phun sơn sớm hơn.'] },
    prep: ['Tập dán băng che thật thẳng mép', 'Học 10 từ vựng ngành sơn'],
    hard: ['Học 15 từ vựng ngành sơn, nhờ bạn kiểm tra', 'Tìm hiểu cách đeo mặt nạ lọc, nói lại cho lớp 2 phút'] },
  'duc-nhua': {
    sc: { tt: 'Máy báo lỗi', who: 'Máy ép', msg: 'Máy ép báo đèn đỏ, kêu “pi pi”. Senpai đang ở đầu xưởng.',
      opts: [
        { t: 'Bấm dừng theo hướng dẫn, gọi senpai', get: 'An toàn trước', lose: 'Chuyền dừng một lúc', may: 'Senpai tới, cảm ơn bạn đã gọi. Rồi chỉ bạn đọc mã lỗi.' },
        { t: 'Đứng chờ, không đụng vào máy', get: 'Không làm sai thêm', lose: 'Chờ lâu nếu không ai thấy', may: 'Một lúc sau senpai thấy đèn. Senpai dặn lần sau gọi luôn.' },
        { t: 'Đọc bảng hướng dẫn cạnh máy', get: 'Tự tìm cách xử lý', lose: 'Đọc tiếng Nhật còn chậm', may: 'Bảng ghi: báo người phụ trách. Bạn đi gọi senpai.' }],
      sp: ['Chị khóa trước · ngành đúc nhựa', 'Tuần đầu máy báo lỗi, mình sợ lắm. Mình nhớ câu “Chotto ii desu ka?” và gọi senpai ngay.'] },
    prep: ['Học tên các nút, đèn báo trên máy', 'Tập câu gọi người: “Chotto ii desu ka?”'],
    hard: ['Học 15 từ vựng an toàn, đọc cho thầy cô nghe', 'Ghi một quy trình 5 bước, rồi dạy lại cho bạn'] },
  'dong-goi-cong-nghiep': {
    sc: { tt: 'Thùng hàng thiếu', who: 'Tổ trưởng', msg: '“Kazu ga chigau yo.” Thùng bạn đóng thiếu 1 hộp. Tổ trưởng đếm lại trước mặt bạn.',
      opts: [
        { t: 'Xin lỗi, đếm lại và bù ngay', get: 'Sửa liền', lose: 'Ngượng trước mọi người', may: 'Tổ trưởng gật đầu. Bạn bắt đầu đếm 2 lần trước khi đóng.' },
        { t: 'Hỏi cách đếm để không sót', get: 'Có cách làm lâu dài', lose: 'Mất thêm vài phút', may: 'Tổ trưởng chỉ cách xếp theo hàng 5. Từ đó bạn ít sót hơn.' },
        { t: 'Tự làm bảng kiểm nhỏ cho mình', get: 'Chủ động, nhớ lâu', lose: 'Lúc đầu làm chậm', may: 'Tuần sau bạn không sót hộp nào. Bảng kiểm thành thói quen.' }],
      sp: ['Chị khóa trước · ngành đóng gói', 'Mình bị nhắc thiếu hàng 2 lần. Sau đó mình đếm theo hàng 5, không sót nữa.'] },
    prep: ['Tập đọc số tiếng Nhật thật nhanh', 'Tập làm theo bảng kiểm khi dọn phòng'],
    hard: ['Đọc số tiếng Nhật từ 1 đến 1000 cho thầy cô nghe', 'Làm theo bảng kiểm 5 mục mỗi ngày, 14 ngày liền'] },
  'in-an': {
    sc: { tt: 'Bản in lệch màu', who: 'Thợ chính', msg: '“Iro ga chigau.” Màu bản in lệch so với mẫu. Đã chạy 200 tờ.',
      opts: [
        { t: 'Dừng máy, báo thợ chính ngay', get: 'Không in hỏng thêm', lose: 'Chuyền dừng một lúc', may: 'Thợ chính chỉnh mực. 200 tờ để riêng kiểm lại.' },
        { t: 'Hỏi cách so màu với mẫu', get: 'Lần sau tự thấy', lose: 'Lộ ra mình chưa biết', may: 'Anh chỉ cách so dưới đèn chuẩn. Bạn ghi vào sổ tay.' },
        { t: 'Tự so lại mẫu, tìm chỗ lệch', get: 'Tập mắt nhìn màu', lose: 'Chậm, có thể chưa thấy', may: 'Bạn thấy màu đỏ đậm hơn, báo lại cho thợ chính.' }],
      sp: ['Chị khóa trước · ngành in ấn', 'Lúc đầu mình chưa nhìn ra màu lệch. Mình mang sổ tay, mỗi lần sai ghi lại một dòng.'] },
    prep: ['Tập so màu: tìm 3 chỗ khác giữa 2 hình', 'Học tên màu, tên giấy bằng tiếng Nhật'],
    hard: ['Học 20 từ vựng ngành in, nhờ bạn kiểm tra', 'Ghi sổ lỗi của mình mỗi ngày, 14 ngày liền'] },
  'may-mac': {
    sc: { tt: 'Chưa theo kịp chuyền', who: 'Chị tổ trưởng', msg: '“Daijōbu?” Chuyền chạy nhanh. Hàng dồn ở chỗ bạn, người sau phải chờ.',
      opts: [
        { t: 'Nói thật: mình chưa theo kịp', get: 'Được giúp sớm', lose: 'Ngại nói mình chậm', may: 'Chị chia bớt việc, chỉ cách cầm vải. Một tuần sau bạn nhanh hơn.' },
        { t: 'Cố may nhanh hơn trong ca', get: 'Theo kịp trong ngày', lose: 'Mệt, dễ may lỗi', may: 'Hôm đó bạn theo kịp. Nhưng có vài đường may phải tháo lại.' },
        { t: 'Nhìn người bên cạnh cầm vải', get: 'Học mẹo của người giỏi', lose: 'Hàng vẫn dồn lúc đó', may: 'Bạn thấy chị bên cạnh gấp mép trước. Hôm sau bạn thử theo.' }],
      sp: ['Chị khóa trước · ngành may mặc', 'Mấy tuần đầu mình chậm hơn chuyền. Mình nói thật với chị tổ trưởng, chị chỉ cách cầm vải.'] },
    prep: ['Tập câu “Sumimasen, oshiete kudasai” (Xin chỉ giúp em)', 'Tập một thao tác tay mỗi ngày cho đều'],
    hard: ['Học 20 từ vựng ngành may, nhờ bạn kiểm tra', 'Bấm giờ một việc tay quen, làm nhanh hơn sau 7 ngày'] },
  'xay-dung': {
    sc: { tt: 'Họp an toàn nghe chưa kịp', who: 'Tổ trưởng', msg: 'Họp sáng, tổ trưởng nói nhanh về an toàn. Bạn chỉ nghe kịp chữ “abunai” (nguy hiểm).',
      opts: [
        { t: 'Hỏi lại tổ trưởng sau buổi họp', get: 'Hiểu điều an toàn', lose: 'Ngại vì ai cũng hiểu', may: 'Tổ trưởng nói chậm lại, chỉ chỗ cấm vào. Bạn ghi vào sổ.' },
        { t: 'Đi theo senpai, làm như senpai', get: 'Vào việc ngay', lose: 'Chưa hiểu lý do', may: 'Bạn làm được việc. Nhưng có chỗ senpai vào được, bạn chưa chắc.' },
        { t: 'Hỏi bạn Việt cùng tổ', get: 'Nhanh, dễ hỏi', lose: 'Bạn ấy có thể nghe sót', may: 'Bạn ấy kể được 2 ý. Ý thứ 3, hai bạn cùng đi hỏi lại.' }],
      sp: ['Anh khóa trước · ngành xây dựng', 'Điều an toàn thì mình luôn hỏi lại. Tổ trưởng bảo hỏi lại là an toàn, không ai cười.'] },
    prep: ['Học 10 hiệu lệnh an toàn công trường', 'Tập thể lực, quen làm ngoài trời'],
    hard: ['Học thuộc 10 hiệu lệnh an toàn, đọc cho thầy cô nghe', 'Tập thể lực 20 phút mỗi ngày, 14 ngày liền'] },
  'o-to': {
    sc: { tt: 'Đưa dụng cụ', who: 'Senpai', msg: '“Supana, jū-ni ban!” Senpai đang dưới gầm xe, gọi bạn đưa cờ lê.',
      opts: [
        { t: 'Hỏi lại: “Jū-ni ban desu ka?”', get: 'Đưa đúng món', lose: 'Chậm vài giây', may: 'Senpai nói “hai”. Bạn đưa đúng, việc chạy tiếp.' },
        { t: 'Tìm nhanh, đưa cái giống nhất', get: 'Nhanh, không để chờ', lose: 'Dễ đưa nhầm', may: 'Lần này nhầm cỡ 14. Senpai chỉ số khắc trên cán.' },
        { t: 'Mang 2–3 cái tới hỏi cái nào', get: 'Chắc chắn, nhớ tên', lose: 'Hơi lúng túng', may: 'Senpai chọn một cái, nói tên. Bạn nhớ thêm một từ.' }],
      sp: ['Anh khóa trước · ngành ô tô', 'Tuần đầu mình chủ yếu đưa đồ nghề. Mình học tên từng món, tháng sau được làm việc chính.'] },
    prep: ['Học tên 20 dụng cụ bằng tiếng Nhật', 'Tập đọc số, cỡ nhanh bằng tiếng Nhật'],
    hard: ['Học tên 20 dụng cụ bằng tiếng Nhật, nhờ bạn kiểm tra', 'Tìm hiểu các bước bảo dưỡng xe, kể cho lớp 2 phút'] },
  'nong-nghiep': {
    sc: { tt: 'Vào việc lúc 5 giờ sáng', who: 'Chủ trại', msg: '“Ashita, go-ji ni kite ne.” Mai vào lúc 5 giờ sáng. Tối nay cả phòng định thức xem phim.',
      opts: [
        { t: 'Ngủ sớm, xem phim dịp khác', get: 'Sáng mai tỉnh táo', lose: 'Lỡ một tối vui', may: 'Bạn tới đúng giờ, còn kịp nghe dặn việc.' },
        { t: 'Xem một chút rồi ngủ', get: 'Vẫn vui với bạn', lose: 'Dễ quá giờ', may: 'Phim hay, bạn ngủ lúc 12 giờ. Sáng hơi mệt nhưng vẫn kịp.' },
        { t: 'Rủ cả phòng xem tối thứ Bảy', get: 'Vui mà không lệch giờ', lose: 'Mọi người có thể không chịu', may: 'Cả phòng đồng ý. Thứ Bảy thành tối phim chung.' }],
      sp: ['Anh khóa trước · ngành nông nghiệp', 'Mùa thu hoạch mình ngủ lúc 9 giờ. Phim để dành tối thứ Bảy, xem vui hơn.'] },
    prep: ['Tập dậy sớm dần, mỗi tuần sớm 15 phút', 'Học tên rau, dụng cụ bằng tiếng Nhật'],
    hard: ['Dậy lúc 5 giờ 30 liên tục 7 ngày', 'Học tên 20 loại rau, cây bằng tiếng Nhật'] },
  'thuy-san': {
    sc: { tt: 'Tay lạnh, chuyền nhanh', art: 'food', who: 'Chị senpai', msg: '“Samui? Daijōbu?” Xưởng lạnh, cá chạy trên băng chuyền rất nhanh. Tay bạn lạnh cứng.',
      opts: [
        { t: 'Nói thật: tay em lạnh quá', get: 'Được chỉ cách giữ ấm', lose: 'Sợ bị nghĩ là yếu', may: 'Chị cho bạn găng lót, nhắc hơ tay giờ nghỉ.' },
        { t: 'Cố làm, đợi giờ nghỉ', get: 'Không làm chậm chuyền', lose: 'Tay cứng, dễ lỗi', may: 'Bạn qua được ca. Nhưng tối về tay còn đau.' },
        { t: 'Nhìn cách senpai cầm dao', get: 'Học mẹo đỡ mỏi', lose: 'Chưa đỡ lạnh ngay', may: 'Bạn thấy senpai co duỗi ngón tay giữa hai con cá. Bạn làm theo.' }],
      sp: ['Chị khóa trước · ngành thủy sản', 'Lúc đầu tay lạnh lắm. Mình nói với senpai, được chỉ đeo thêm găng lót, vài tuần là quen.'] },
    prep: ['Tập câu “Te ga tsumetai desu” (Tay em lạnh)', 'Rửa tay đủ các bước trước mỗi bữa ăn'],
    hard: ['Học 15 tên hải sản, dụng cụ bằng tiếng Nhật', 'Tập rửa tay đủ 6 bước, dạy lại cho 3 bạn'] },
  'thuc-pham': {
    sc: { tt: 'Quên lưới tóc', art: 'food', who: 'Tổ trưởng', msg: '“Chotto!” Bạn quên đeo lưới tóc, đã bước qua cửa phòng sạch.',
      opts: [
        { t: 'Xin lỗi, ra làm lại từ đầu', get: 'Đúng quy trình vệ sinh', lose: 'Mất vài phút', may: 'Tổ trưởng gật đầu. Bạn dán hình nhắc trên tủ đồ.' },
        { t: 'Hỏi lại các bước trước khi vào', get: 'Nhớ đủ các bước', lose: 'Ngại vì là tuần đầu', may: 'Tổ trưởng chỉ bảng các bước ở cửa. Bạn chép lại học thuộc.' },
        { t: 'Nhờ bạn cùng ca nhắc mỗi sáng', get: 'Có người nhắc', lose: 'Dựa vào người khác', may: 'Tuần đầu bạn ấy nhắc. Tuần sau bạn tự nhớ.' }],
      sp: ['Chị khóa trước · ngành thực phẩm', 'Tuần đầu mình quên lưới tóc một lần. Từ đó mình đọc thầm từng bước trước cửa, không quên nữa.'] },
    prep: ['Học các bước vệ sinh trước khi vào xưởng', 'Tập kiểm đồ trước khi ra khỏi phòng'],
    hard: ['Rửa tay đủ 6 bước mỗi lần, 14 ngày liền', 'Học 20 từ vựng ngành thực phẩm, nhờ bạn kiểm tra'] },
  'dieu-duong': {
    sc: { tt: 'Cụ không chịu ăn', who: 'Giờ ăn trưa', msg: 'Cụ bà không chịu ăn, đẩy thìa ra. Senpai đang giúp cụ khác.',
      opts: [
        { t: 'Ngồi xuống, hỏi chuyện cụ một lúc', get: 'Cụ thấy được quan tâm', lose: 'Chậm giờ ăn', may: 'Cụ kể chuyện quê. Rồi cụ ăn được nửa bát.' },
        { t: 'Để cụ nghỉ, lát quay lại mời', get: 'Không ép cụ', lose: 'Cụ có thể bỏ bữa', may: 'Lát sau cụ ăn được vài thìa. Bạn ghi lại vào sổ.' },
        { t: 'Hỏi senpai thói quen của cụ', get: 'Hiểu cụ hơn', lose: 'Senpai đang bận', may: 'Senpai bảo cụ thích ăn canh trước. Lần sau bạn đổi thứ tự.' }],
      sp: ['Chị khóa trước · ngành kaigo', 'Mỗi cụ một thói quen. Mình hỏi senpai và ghi sổ, tháng sau mình hiểu các cụ hơn.'] },
    prep: ['Tập 5 câu kính ngữ hay nói với các cụ', 'Hỏi chuyện một người lớn tuổi 10 phút'],
    hard: ['Trò chuyện 10 phút với người lớn tuổi, chủ yếu nghe', 'Học 10 câu kính ngữ kaigo, nói cho thầy cô nghe'] },
  'nha-hang': {
    sc: { tt: 'Nghe gọi món chưa kịp', who: 'Khách', msg: 'Giờ trưa đông khách. Một khách gọi món rất nhanh. Bạn chỉ nghe được một nửa.',
      opts: [
        { t: 'Lặp lại món để khách xác nhận', get: 'Ghi đúng món', lose: 'Khách chờ thêm chút', may: 'Khách sửa một món. Món ra đúng, khách cảm ơn.' },
        { t: 'Đưa thực đơn, nhờ khách chỉ món', get: 'Nhanh, rõ ràng', lose: 'Hơi ngại', may: 'Khách chỉ vào hình, bạn ghi lại. Không ai thấy phiền.' },
        { t: 'Nhờ senpai đứng cạnh giúp', get: 'Không sai món', lose: 'Senpai đang bận', may: 'Senpai giúp lần này, dặn bạn tập lặp lại món.' }],
      sp: ['Chị khóa trước · ngành nhà hàng', 'Tuần đầu mình luôn lặp lại món khách gọi. Chậm một chút mà không sai, khách vẫn vui.'] },
    prep: ['Luyện 5 câu chào, xác nhận món bằng kính ngữ', 'Học tên 20 món ăn Nhật phổ biến'],
    hard: ['Đóng vai phục vụ khách bằng tiếng Nhật 3 phút trước lớp', 'Học tên 20 món ăn Nhật, nhờ bạn kiểm tra'] },
  've-sinh-toa-nha': {
    sc: { tt: 'Góc tường chưa sạch', who: 'Senpai', msg: '“Mada kitanai ne.” Bạn lau xong hành lang. Senpai chỉ vào góc tường.',
      opts: [
        { t: 'Lau lại góc đó ngay', get: 'Sửa liền', lose: 'Chậm việc sau', may: 'Góc tường sạch. Senpai nói góc là chỗ khách hay nhìn.' },
        { t: 'Hỏi senpai thường lau góc thế nào', get: 'Học cách làm của nghề', lose: 'Hơi ngại hỏi', may: 'Senpai chỉ dụng cụ lau góc. Bạn làm nhanh hơn.' },
        { t: 'Tự ghi các góc hay sót', get: 'Lần sau tự kiểm', lose: 'Mất chút thời gian', may: 'Tuần sau bạn ít bị nhắc. Việc ghi thành thói quen.' }],
      sp: ['Anh khóa trước · ngành vệ sinh tòa nhà', 'Người Nhật để ý góc khuất lắm. Mình lau góc trước, rồi mới lau giữa.'] },
    prep: ['Tập dọn phòng theo bảng kiểm 5 mục', 'Học tên dụng cụ, hóa chất vệ sinh'],
    hard: ['Dọn phòng theo bảng kiểm, nhờ bạn kiểm 7 ngày liền', 'Dậy lúc 5 giờ 30 liên tục 7 ngày'] },
  'ky-su': {
    sc: { tt: 'Bị hỏi tiến độ bất ngờ', who: 'Trưởng nhóm', msg: '“Kinō no shinchoku wa?” (Tiến độ hôm qua?) Họp sáng, bạn chưa chuẩn bị.',
      opts: [
        { t: 'Nói ngắn việc đã làm, hẹn báo kỹ sau', get: 'Trả lời được ngay', lose: 'Chưa đủ ý', may: 'Trưởng nhóm gật đầu, hẹn chiều nghe chi tiết.' },
        { t: 'Xin 1 phút xem lại ghi chép', get: 'Báo cáo chính xác', lose: 'Cả nhóm phải chờ', may: 'Bạn báo cáo rõ. Từ hôm sau bạn ghi 3 ý trước giờ họp.' },
        { t: 'Thành thật: em chưa chuẩn bị', get: 'Thật thà', lose: 'Dễ bị nhắc', may: 'Trưởng nhóm nhắc nhẹ. Hôm sau bạn chuẩn bị 3 câu báo cáo.' }],
      sp: ['Anh khóa trước · kỹ sư', 'Trước giờ họp mình viết 3 dòng: đã làm, đang làm, vướng gì. Đỡ run hẳn.'] },
    prep: ['Tập báo cáo 3 câu: đã làm, đang làm, vướng gì', 'Học 20 từ tiếng Nhật công việc văn phòng'],
    hard: ['Báo cáo 1 phút bằng tiếng Nhật trước lớp', 'Làm 1 đề N3 ngắn, tự chấm, ghi lại chỗ sai'] },
  gen: {
    sc: { tt: 'Chưa hiểu việc được giao', who: 'Tổ trưởng', msg: 'Tổ trưởng giao việc bằng tiếng Nhật rất nhanh. Bạn chỉ hiểu một nửa.',
      opts: [
        { t: 'Hỏi lại ngay', get: 'Hiểu đúng từ đầu', lose: 'Hơi ngại làm phiền', may: 'Tổ trưởng nói chậm lại, làm mẫu một lần.' },
        { t: 'Làm thử, rồi nhờ kiểm tra', get: 'Chủ động', lose: 'Sai thì làm lại', may: 'Tổ trưởng chỉ chỗ cần sửa. Bạn hiểu việc rõ hơn.' },
        { t: 'Hỏi bạn Việt bên cạnh', get: 'Nhanh, dễ hỏi', lose: 'Bạn ấy cũng có thể nhầm', may: 'Bạn ấy giải thích được. Có lúc vẫn phải hỏi lại tổ trưởng.' }],
      sp: ['Anh khóa trước · Senpai', 'Tuần đầu mình hỏi lại rất nhiều. Tổ trưởng bảo hỏi lại còn hơn làm sai.'] },
    prep: ['Tập câu “Mō ichido onegaishimasu” (Xin nói lại)', 'Học 20 từ vựng chuyên ngành'],
    hard: ['Học 20 từ vựng chuyên ngành, nhờ bạn kiểm tra', 'Ghi một quy trình 5 bước, rồi dạy lại cho bạn'] }
};
/* Ngày 4 · tình huống từ điều lo nhất (a43.top). Chỉ số = thẻ sẵn sàng READY (thẻ 3 theo nghề: [R3] = điều vất vả riêng, Senpai lấy INDP.r3). */
var WORRY7 = [
  { art: 'dorm', who: 'Tối thứ Năm', msg: 'Tan ca về 7 giờ tối, mệt rã rời. Bài tiếng Nhật hôm nay chưa học.',
    opts: [
      { t: 'Học 10 phút rồi ngủ', get: 'Giữ nhịp mỗi ngày', lose: 'Phải cố lúc mệt', may: 'Chỉ 10 phút, nhưng bạn giữ được chuỗi ngày học.' },
      { t: 'Nghỉ hôm nay, mai học bù', get: 'Lấy lại sức', lose: 'Dễ thành thói quen hoãn', may: 'Mai bạn học bù được. Tuần sau mệt, bạn lại hẹn mai.' },
      { t: 'Nghe bài nghe lúc tắm, ăn tối', get: 'Học mà không thêm giờ', lose: 'Nhớ không sâu bằng', may: 'Bạn nghe được 2 bài. Tai quen dần tiếng Nhật ở xưởng.' }],
    sp: ['Anh khóa trước · ngành cơ khí', 'Hôm mệt mình chỉ học 10 phút, nhưng không bỏ ngày nào. Năm hai mình nghe hiểu tổ trưởng hơn hẳn.'],
    prep: ['Đặt giờ học tiếng Nhật cố định mỗi ngày', 'Tải sẵn bài nghe ngắn vào điện thoại'] },
  { art: 'dorm', who: 'Mẹ gọi video', msg: 'Tối thứ Năm, mẹ gọi. Thấy căn bếp ở nhà, bạn nhớ nhà, muốn khóc.',
    opts: [
      { t: 'Kể thật với mẹ là con nhớ nhà', get: 'Nhẹ lòng hơn', lose: 'Sợ mẹ lo', may: 'Mẹ cũng nhớ bạn. Hai mẹ con hẹn gọi tối Chủ nhật.' },
      { t: 'Cười nói vui, kể chuyện chỗ làm', get: 'Mẹ yên tâm', lose: 'Giữ buồn một mình', may: 'Mẹ yên tâm. Tắt máy, bạn buồn một lúc rồi đi ngủ.' },
      { t: 'Rủ cả phòng nấu một món quê', get: 'Có người chia sẻ', lose: 'Mất một buổi tối', may: 'Cả phòng nấu canh chua. Ai cũng kể chuyện nhà mình.' }],
    sp: ['Chị khóa trước · ngành thực phẩm', 'Tháng đầu mình nhớ nhà lắm. Mình hẹn gọi mẹ tối Chủ nhật, ngày thường nhắn tin ngắn.'],
    prep: ['Hẹn với gia đình giờ gọi cố định mỗi tuần', 'Tập nấu 2 món quê đơn giản'] },
  { art: 'dorm', who: 'Sau ca đêm', msg: 'Bạn vừa chuyển ca đêm. Sáng về phòng, trời sáng, ồn ào, bạn không ngủ được.',
    opts: [
      { t: 'Che kín cửa sổ, bịt mắt, ngủ ngay', get: 'Ngủ sâu hơn', lose: 'Phải chuẩn bị đồ', may: 'Đến ngày thứ ba, bạn ngủ được 6 tiếng.' },
      { t: 'Thức chơi, tối ngủ bù', get: 'Có thời gian riêng', lose: 'Dễ mệt khi vào ca', may: 'Ca đêm sau bạn buồn ngủ, làm chậm hơn.' },
      { t: 'Hỏi senpai cách quen ca đêm', get: 'Học từ người đi trước', lose: 'Ngại hỏi chuyện riêng', may: 'Senpai chỉ cách ăn nhẹ trước khi ngủ. Bạn thử thấy hợp.' }],
    sp: ['Anh khóa trước · ngành điện tử', 'Tuần ca đêm, mình che kín cửa sổ, ăn nhẹ rồi ngủ. Quen nếp thì không mệt như mình sợ.'],
    prep: ['Tập ngủ đúng giờ, kể cả cuối tuần', 'Tìm hiểu cách ngủ ngon khi làm ca'] },
  { art: '@job', who: 'Cuối tuần đầu', msg: 'Bạn mệt vì [R3]. Tối thứ Năm, bạn nằm dài trong phòng.',
    opts: [
      { t: 'Nghỉ kỹ, ngủ sớm', get: 'Hồi sức nhanh', lose: 'Bỏ việc riêng tối đó', may: 'Sáng hôm sau bạn thấy đỡ hơn nhiều.' },
      { t: 'Hỏi senpai cách họ đã quen', get: 'Có mẹo từ người đi trước', lose: 'Ngại kể mình mệt', may: 'Senpai kể tuần đầu cũng vậy, rồi chỉ bạn một mẹo nhỏ.' },
      { t: 'Viết ra chỗ mệt nhất, tìm cách đỡ', get: 'Hiểu mình hơn', lose: 'Mất thêm chút thời gian', may: 'Bạn thấy chỗ mệt nhất, thử một cách đỡ ngay hôm sau.' }],
    sp: '@r3',
    prep: ['Tập thể lực 20 phút mỗi ngày', 'Hỏi 1 anh chị đi trước cách họ đã quen'] },
  { art: '@job', who: 'Tổ trưởng', msg: 'Bạn tới đúng 8 giờ. Tổ trưởng nhắc: ở đây ai cũng tới trước 10 phút.',
    opts: [
      { t: 'Xin lỗi, mai tới sớm 15 phút', get: 'Sửa ngay', lose: 'Phải dậy sớm hơn', may: 'Hôm sau bạn có 10 phút thay đồ, nghe dặn việc.' },
      { t: 'Hỏi vì sao cần tới sớm', get: 'Hiểu lý do', lose: 'Sợ bị nghĩ là cãi', may: 'Tổ trưởng nói: để thay đồ, họp đầu ca. Bạn thấy hợp lý.' },
      { t: 'Hỏi senpai về giờ giấc ở đây', get: 'Biết thêm luật nhỏ', lose: 'Chưa thân senpai', may: 'Senpai kể thêm vài luật nhỏ. Bạn ghi lại.' }],
    sp: ['Anh khóa trước · ngành xây dựng', 'Ở JPC mình thấy giờ giấc hơi khắt khe. Sang Nhật mới hiểu, quen từ trước nên mình đỡ bị nhắc.'],
    prep: ['Tới lớp trước 10 phút, 14 ngày liền', 'Giữ chỗ ở, chỗ học gọn theo 5S'] },
  { art: '@job', who: 'Cả tuần đầu', msg: 'Cả tuần bạn chỉ lau máy, xếp đồ. Bạn muốn làm việc chính mà chưa được giao.',
    opts: [
      { t: 'Làm thật kỹ, ghi lại từng bước', get: 'Được tin dần', lose: 'Phải kiên nhẫn', may: 'Tổ trưởng để ý bạn làm kỹ. Tuần sau bạn được xem việc chính.' },
      { t: 'Hỏi khi nào được học việc chính', get: 'Biết lộ trình', lose: 'Sợ bị nghĩ là vội', may: 'Tổ trưởng nói khoảng một tháng. Bạn đỡ sốt ruột.' },
      { t: 'Xin đứng xem senpai lúc rảnh', get: 'Học trước việc sau', lose: 'Mất giờ nghỉ', may: 'Senpai cho xem, còn giải thích vài bước.' }],
    sp: ['Anh khóa trước · ngành ô tô', 'Tuần đầu mình chỉ lau máy, xếp đồ. Mình ghi lại từng bước, tháng thứ hai được làm việc chính.'],
    prep: ['Tập làm việc nhỏ thật kỹ, không vội', 'Tập ghi chép quy trình từng bước'] },
  { art: 'dorm', who: 'Bạn cùng phòng', msg: '“Cuối tuần đi mua sắm không?” Bạn chưa nhận lương tháng đầu, tiền còn ít.',
    opts: [
      { t: 'Đi cùng, chỉ mua đồ cần', get: 'Vui, vẫn giữ tiền', lose: 'Dễ mua thêm', may: 'Bạn mua đôi găng, còn lại giữ nguyên. Đi chơi vẫn vui.' },
      { t: 'Hẹn bạn sau ngày lương', get: 'Giữ được tiền', lose: 'Sợ bạn buồn', may: 'Bạn ấy hiểu, còn rủ bạn đi chợ rẻ tuần sau.' },
      { t: 'Rủ đi dạo công viên', get: 'Vui mà không tốn', lose: 'Bạn ấy có thể không thích', may: 'Hai bạn đi dạo, chụp ảnh lá đỏ. Không tốn đồng nào.' }],
    sp: ['Chị khóa trước · ngành may mặc', 'Tháng đầu mình chỉ mua đồ cần. Ngày lương mình chia ba phần: gửi nhà, để dành, tiêu.'],
    prep: ['Ghi chi tiêu mỗi ngày trong 1 tháng', 'Tập chia tiền 3 phần: gửi nhà, để dành, tiêu'] },
  { art: 'dorm', who: 'Bạn cùng phòng', msg: '11 giờ đêm, bạn cùng phòng vẫn gọi điện to. Mai bạn vào ca lúc 7 giờ.',
    opts: [
      { t: 'Nhẹ nhàng nhờ bạn nói nhỏ', get: 'Ngủ được', lose: 'Sợ mất lòng', may: 'Bạn ấy xin lỗi, ra ngoài nói tiếp.' },
      { t: 'Đeo tai nghe, cố ngủ', get: 'Tránh va chạm', lose: 'Ngủ không sâu', may: 'Bạn ngủ được. Nhưng tối sau chuyện lặp lại.' },
      { t: 'Rủ cả phòng đặt giờ yên lặng', get: 'Có luật chung', lose: 'Cần cả phòng đồng ý', may: 'Cả phòng chọn 22 giờ 30. Ai cũng dễ chịu hơn.' }],
    sp: ['Anh khóa trước · ngành nông nghiệp', 'Phòng bốn người, tụi mình cùng đặt giờ tắt đèn. Có luật chung thì ít va chạm.'],
    prep: ['Tập nói lời nhờ nhẹ nhàng, không trách', 'Cùng phòng đặt 3 quy tắc chung'] }
];
/* điều lo do học viên tự viết (a43.top = 'job' hoặc 'o'): [W] = lời học viên */
var WORRY7_OWN = { art: 'dorm', who: 'Tối thứ Năm', msg: 'Chuyện bạn từng lo đã đến: “[W]”. Tối đó bạn cứ nghĩ mãi.',
  opts: [
    { t: 'Tự tìm cách xoay xở trước', get: 'Chủ động', lose: 'Dễ ôm một mình', may: 'Bạn tìm được một cách. Chưa ổn thì bạn vẫn có thể hỏi.' },
    { t: 'Hỏi senpai hoặc tổ trưởng', get: 'Có người giúp sớm', lose: 'Ngại làm phiền', may: 'Senpai từng gặp chuyện giống vậy, chỉ bạn cách làm.' },
    { t: 'Nhắn người dẫn đường của bạn', get: 'Được người tin cậy nghe', lose: 'Họ ở xa, trả lời chậm', may: 'Họ trả lời tối đó, kèm một lời động viên.' }],
  sp: ['Chị khóa trước · ngành điện tử', 'Điều mình lo rồi cũng xảy ra. Nhờ đã nghĩ trước cách làm, mình bình tĩnh hơn mình tưởng.'],
  prep: ['Viết ra 3 cách xử lý nếu điều đó xảy ra', 'Hỏi 1 anh chị đi trước về điều này'] };

/* ---------- Ga 7 · VIỆC KHÓ ĐẦU TIÊN (a72): ba vùng, thẻ việc lấy từ chính hành trình ---------- */
var ZONES = [['a', 'An toàn', 'Quen, dễ làm'], ['h', 'Học hỏi', 'Hơi run, cố là làm được'], ['q', 'Quá sức', 'Lúc này còn quá xa']];
var HARD_LINK = { guide: 'Hỏi người dẫn đường 2 câu bạn soạn ở Ga 5', iv: 'Nói câu trả lời phỏng vấn 60 giây cho thầy cô nghe' };
var HARD_COMMON = ['Bắt chuyện tiếng Nhật 5 phút với thầy cô', 'Nhờ thầy cô góp ý thẳng 1 điểm yếu của mình'];
var DUE7 = [['7', '7 ngày'], ['14', '14 ngày'], ['d', 'Chọn ngày']];
var WHO7 = ['Người dẫn đường của bạn', 'Thầy cô chủ nhiệm', 'Bạn cùng lớp, cùng phòng', 'Gia đình', 'Mình tự làm, chưa kể ai'];
var RES7 = [['y', 'Làm được', 'Bạn vừa làm được một việc ở vùng học hỏi. Vùng an toàn của bạn rộng thêm rồi.'],
  ['p', 'Làm một phần', 'Làm một phần cũng là bước ra rồi. Phần còn lại, bạn muốn thử lại khi nào?'],
  ['n', 'Chưa làm', 'Chưa làm cũng không sao. Điều gì cản bạn? Chọn một việc nhỏ hơn cũng được.']];

/* ---------- GA ƯỚC MƠ (FINAL, s8) · CD01.1.0 ----------
   Không phải bài kiểm tra: cổng soát vé chỉ GỢI Ý bổ sung, luôn cho đi tiếp.
   GATE8: ô viết của từng ô Bản Career Design để soát [mã ô viết, tên ngắn, số từ tối thiểu].
   Ô "sơ sài" = ít hơn số từ tối thiểu (không tính câu mở sẵn) hoặc còn nguyên câu gợi ý chưa sửa. Lựa chọn "Chưa chắc" không tính là sơ sài. */
var GATE8 = {
  1: [['x1.goal', 'Mục tiêu khi lên tàu', 6]],
  2: [['a13.me', 'Bạn muốn trở thành ai', 6]],
  3: [['a21.flow', 'Lúc bạn quên cả giờ', 8], ['a22.praise', 'Lần bạn được khen', 8], ['a23.inter', 'Nghề bạn nghĩ tới', 4]],
  4: [['a33.why', 'Vì sao chọn nghề này', 8]],
  5: [['a42.like', 'Điều bạn thích ở nghề', 4], ['a43.why', 'Vì sao vẫn muốn đi', 6], ['a44.next', 'Cách bắt đầu mốc gần nhất', 6]],
  6: [['a51.bring', 'Ngoài tiền, muốn mang về', 5], ['a51.learn', 'Điều muốn học theo', 5]],
  7: [['a62.p1', 'Kế hoạch ở JPC', 8], ['a62.p2', 'Kế hoạch ở Nhật', 8], ['a63.iv', 'Trả lời phỏng vấn 60 giây', 25]],
  8: [['a71.note', 'Câu nhắn cho mình', 6], ['a72.if', 'Nếu ngại, mình sẽ…', 5]]
};
var GATE_TXT = {
  t: 'Trước khi về đích, mời [Tên] qua cổng soát vé. Máy soát 8 ô của bạn.',
  ok: '8 ô đều có chữ của bạn. Mời [Tên] qua cổng!',
  thin: '[Ô] còn ngắn. Muốn thêm chút cho trọn không?',
  keep: 'Giữ vậy cũng được. Bấm <b>Qua cổng</b> để đi tiếp.',
  short: 'còn ngắn', tip: 'còn nguyên câu gợi ý',
  fixing: 'Bạn đang bổ sung cho cổng soát vé. Chữ tự lưu.', back: 'Xong, quay lại cổng'
};
/* Nhìn lại: hỏi lại câu x1.now của Sân ga */
var NOW8 = {
  up: 'Bạn đi thêm [D] bậc rồi. Đó là nhờ chính bạn nghĩ kỹ ở 7 ga.',
  same: 'Vẫn mức cũ cũng không sao. Có khi bạn đã nghĩ kỹ hơn, chỉ chưa đổi mức.',
  down: 'Lùi một chút cũng là nghĩ kỹ hơn. Biết mình chưa rõ chỗ nào là bước đầu để rõ.',
  help: ['Trắc nghiệm RIASEC', 'Đọc ngành nghề trên Tikme', 'Chuyện Senpai, chị Thúy', 'Trò chuyện với anh Minh', 'Lên kế hoạch 2 chặng', 'Tập dượt tuần đầu ở Nhật', 'Nghĩ về điều mình coi trọng']
};
/* Thư gửi mình 5 năm sau: gợi ý ghép từ bài của học viên. Bỏ câu nào thiếu dữ liệu.
   [Me] a13.me · [Hard] việc khó a72 · [Habit] thói quen a63 · [Why] a43.why · [Dream] 5 năm sau theo nghề (IND6.ivx) · [Note] a71.note */
var LETTER8 = [
  'Gửi mình 5 năm sau, mong là giờ bạn đã là người [Me] Mình bắt đầu từ việc khó “[Hard]”. Nhớ giữ thói quen: [Habit]',
  'Gửi mình 5 năm sau, chắc giờ bạn đã quen nghề [Nghề]. Đừng quên lý do mình đi: [Why] Hôm nay mình hứa: [Habit]',
  'Gửi mình 5 năm sau, mong là giờ bạn đã [Dream]. Lúc mệt, nhớ câu này: “[Note]”'
];
var SEAL8 = { hint: 'Nhấn giữ con dấu 2 giây để đóng dấu lời hứa', done: 'Lời hứa đã đóng dấu. Shin cất giữ giúp bạn nhé.', redo: 'Bạn vừa sửa thư. Nhấn giữ để đóng dấu lại nhé.' };

/* Hướng đi sau 5 năm theo TỪNG NGHỀ (gợi ý để nghĩ tiếp ở CD02, không phải cam kết tuyển dụng) + lời chúc Senpai (lời kể mẫu).
   Khóa = mã ngành trong INDS. Không có nghề → gen. */
var IND8 = {
  'co-khi': { far: ['Thợ CNC chính, tự lập trình máy', 'Tổ trưởng, kèm người mới', 'Về Việt Nam làm kỹ thuật cho công ty Nhật'],
    sp: ['Anh khóa trước · ngành cơ khí', 'Lời hứa hồi ở JPC của mình là mỗi tối 10 từ vựng. Năm thứ ba, mình đọc bản vẽ không cần hỏi ai.'] },
  'dien-tu': { far: ['Kỹ thuật viên kiểm tra chất lượng', 'Tổ trưởng chuyền lắp ráp', 'Về Việt Nam làm QC cho nhà máy Nhật'],
    sp: ['Chị khóa trước · ngành điện tử', 'Mình dán lời hứa ở đầu giường ký túc xá. Tháng nào mệt, đọc lại là có sức đi tiếp.'] },
  'han': { far: ['Thợ hàn chính có chứng chỉ JIS', 'Phụ trách tổ hàn, kèm người mới', 'Về Việt Nam làm thợ hàn kỹ thuật cao'],
    sp: ['Anh khóa trước · ngành hàn', 'Năm đầu mình bị bảo hàn lại nhiều lắm. Nhớ lời hứa “không bỏ cuộc”, năm ba mình đậu thi tay nghề.'] },
  'son': { far: ['Thợ sơn chính, phụ trách pha màu', 'Kiểm tra chất lượng màng sơn', 'Về Việt Nam làm sơn cho xưởng ô tô, cơ khí'],
    sp: ['Anh khóa trước · ngành sơn', 'Mình hứa tự kiểm từng góc trước khi giao. Giữ được vậy, tổ trưởng giao mình pha màu.'] },
  'duc-nhua': { far: ['Tự thay khuôn, chỉnh máy ép', 'Tổ trưởng ca, kèm người mới', 'Về Việt Nam làm kỹ thuật máy ép nhựa'],
    sp: ['Chị khóa trước · ngành đúc nhựa', 'Lời hứa của mình rất nhỏ: chưa chắc thì hỏi ngay. Nhờ vậy năm hai mình được dạy thay khuôn.'] },
  'dong-goi-cong-nghiep': { far: ['Tổ trưởng khu đóng gói', 'Lái xe nâng, phụ trách kho', 'Về Việt Nam làm quản lý kho, xuất hàng'],
    sp: ['Anh khóa trước · ngành đóng gói', 'Mình hứa đếm lại hàng trước khi đóng thùng. Thói quen nhỏ đó giúp mình được tin tưởng hơn.'] },
  'in-an': { far: ['Thợ in chính, phụ trách máy', 'Chuyên so màu, kiểm bản in', 'Về Việt Nam làm cho xưởng in, bao bì'],
    sp: ['Anh khóa trước · ngành in ấn', 'Mình hứa mỗi tuần học 10 từ về màu, về máy in. Năm hai mình tự so màu được.'] },
  'may-mac': { far: ['QC xưởng may', 'Kỹ thuật rập, làm mẫu', 'Về Việt Nam làm chuyền trưởng, QC'],
    sp: ['Chị khóa trước · ngành may mặc', 'Lúc chưa theo kịp chuyền, mình đọc lại lời hứa ở JPC. Mình tập thêm 15 phút mỗi tối, rồi cũng theo kịp.'] },
  'xay-dung': { far: ['Thợ chính, rồi trưởng nhóm', 'Học đọc bản vẽ, phụ giám sát', 'Về Việt Nam làm cho công trình vốn Nhật'],
    sp: ['Anh khóa trước · ngành xây dựng', 'Mùa hè công trường nóng, có lúc mình muốn về. Mình nhớ lời hứa với ba mẹ và đi đủ chặng đã định.'] },
  'o-to': { far: ['Thợ chính, tự chẩn đoán lỗi', 'Thi chứng chỉ Seibishi', 'Về Việt Nam làm cho gara, hãng xe Nhật'],
    sp: ['Anh khóa trước · ngành ô tô', 'Mình hứa ghi sổ mỗi lỗi xe gặp được. Năm ba, cuốn sổ đó giúp mình tự chẩn đoán lỗi.'] },
  'nong-nghiep': { far: ['Phụ trách một khu nhà màng', 'Thạo máy, thạo trọn vụ mùa', 'Về Việt Nam làm nông nghiệp công nghệ cao'],
    sp: ['Chị khóa trước · ngành nông nghiệp', 'Mình hứa để dành đều và học cách trồng của người Nhật. Giờ mình đang làm vườn rau ở quê.'] },
  'thuy-san': { far: ['Trưởng ca, kiêm QC', 'Thợ chính, vận hành dây chuyền', 'Về Việt Nam làm QC cho nhà máy xuất khẩu'],
    sp: ['Chị khóa trước · ngành thủy sản', 'Xưởng lạnh, việc lặp lại, có lúc mình nản. Lời hứa học tiếng Nhật mỗi tối giúp mình đi tiếp.'] },
  'thuc-pham': { far: ['Trưởng ca sản xuất', 'Phụ trách vệ sinh, an toàn thực phẩm', 'Về Việt Nam mở tiệm hoặc làm QC thực phẩm'],
    sp: ['Chị khóa trước · ngành thực phẩm', 'Mình hứa giữ sạch như người Nhật, cả ở ký túc xá. Năm hai, mình được giao kiểm vệ sinh của chuyền.'] },
  'dieu-duong': { far: ['Đậu Kaigo Fukushishi, làm lâu dài', 'Trưởng nhóm chăm sóc ở cơ sở', 'Về Việt Nam làm dưỡng lão, đào tạo kaigo'],
    sp: ['Chị khóa trước · ngành kaigo', 'Mình hứa mỗi ngày học 5 từ kaigo. Nhờ vậy mình viết được sổ ghi chép, các cụ cũng tin mình hơn.'] },
  'nha-hang': { far: ['Trưởng ca, phụ trách khu vực', 'Bếp chính, hoặc lễ tân giỏi kính ngữ', 'Về Việt Nam làm nhà hàng, khách sạn Nhật'],
    sp: ['Anh khóa trước · ngành nhà hàng', 'Mình hứa mỗi ngày tập một câu kính ngữ. Giờ khách quen gọi tên mình khi đến quán.'] },
  've-sinh-toa-nha': { far: ['Tổ trưởng ca, kiểm tra bàn giao', 'Thạo chà sàn, phủ wax, lau kính', 'Về Việt Nam làm quản lý vệ sinh tòa nhà'],
    sp: ['Chị khóa trước · ngành vệ sinh tòa nhà', 'Mình hứa đến sớm 10 phút mỗi ca. Tổ trưởng thấy vậy, giao mình kiểm tra bàn giao.'] },
  'ky-su': { far: ['Làm dự án riêng, lên N2–N1', 'Làm cầu nối Nhật – Việt', 'Về Việt Nam làm cho công ty Nhật'],
    sp: ['Anh khóa trước · kỹ sư', 'Mình hứa mỗi tuần báo cáo một lần bằng tiếng Nhật, dù còn sai. Năm ba mình được giao dự án riêng.'] },
  gen: { far: ['Thợ chính, vững tay nghề', 'Trưởng nhóm, kèm người mới', 'Về Việt Nam dùng nghề và tiếng Nhật'],
    sp: ['Anh khóa trước', 'Lời hứa của mình rất nhỏ: mỗi ngày một việc. Nhỏ nhưng đều, 5 năm sau nhìn lại mới thấy xa.'] }
};
var STAMP8 = ['出発', '未来', '自分', '性格', '仕事', '対話', '道のり', '挑戦']; /* con dấu 8 ga trên vé hoàn thành */

/* ---------- Lời Shin, chữ giao diện ---------- */
var SHIN_NAMES = ['Shin trứng', 'Shin gà con', 'Shin gà rừng', 'Shin đại bàng'];
var TXT = {
  introKicker: 'Career Design 01',
  intro: 'Chào [Tên]! Mình là <b>Shin</b>. Ở đây không có đúng sai, chỉ có câu trả lời thật của bạn. Đi hết 7 ga, bạn có <b>Bản Career Design</b> của riêng mình.',
  introBtn: 'Chào Shin! Mình bắt đầu nhé',
  printAsk: 'Chào [Tên]! Trước khi lên tàu, Shin in vé hành trình cho bạn nhé.',
  printBtn: 'In vé hành trình',
  printing: 'Máy đang in vé của [Tên]…',
  printAgain: 'In lại vé',
  /* hướng dẫn học lần đầu (4 bước, bước 4 bắt chạm thử nút Sổ tay) */
  tour1: 'Đây là Vé hành trình. Mỗi chặng xong, tàu nhỏ chạy gần hơn về Ga Ước Mơ.',
  tour2: 'Bản Career Design của bạn có 8 ô. Qua mỗi ga, bạn điền thêm một ô.',
  tour3: 'Đây là Sơ đồ tuyến. Bắt đầu từ Sân ga Xuất phát, chạm vào ga để vào học.',
  tour4: 'Giờ bạn thử nhé: chạm nút Sổ tay (quyển sách, góc trên) để xem điểm và bài làm.',
  tourDone: 'Giỏi lắm! Sổ tay luôn ở đây. Giờ bắt đầu từ Sân ga Xuất phát nhé.',
  tourAgain: 'Xem lại hướng dẫn',
  gateToast: 'Chính xác! Shin mê Oden lắm. Lên tàu thôi!',
  homeHi: ['Chào [Tên]! Hôm nay đi tiếp một ga nhé.', 'Chào [Tên]! Mỗi ga chỉ khoảng 15 phút thôi.', 'Chào [Tên]! Bản Career Design của bạn đang lớn dần đó.'],
  homeWait: '[Tên] đã đủ 8 ô rồi! Ga Ước Mơ đang chờ bạn về đích.',
  homeDone: '[Tên] đã về đích! Giữ lời hứa và việc khó nhé. Hẹn gặp ở CD02.',
  finThanks: '[Tên] ơi, cảm ơn bạn đã đi cùng Shin hết chuyến tàu. Chuyến tàu khép lại, hành trình của bạn mới bắt đầu.',
  sheetBtn: 'Xem Bản Career Design 1 trang',
  warmT: 'Khởi động 30 giây', warmSub: 'Không bắt buộc · +10 XP',
  stampBtn: 'Đóng dấu',
  redo: 'Bạn đang xem lại bài đã làm. Sửa chỗ nào cũng được.',
  redoNew: 'Bạn đang làm lại từ đầu. Bài cũ vẫn giữ đến khi bạn đóng dấu.',
  noScore: 'Không có đúng sai',
  senpaiDraft: 'lời kể mẫu',
  reportT: 'Báo cáo tiến độ',
  reportSub: 'Gửi thầy cô 4 ô đầu của bạn. Thầy cô đọc để hiểu bạn, không chấm điểm.',
  reportEndT: 'Báo cáo về đích',
  reportEndSub: 'Gửi thầy cô Bản Career Design của bạn. Thầy cô đọc để hiểu bạn, không chấm điểm.'
};

/* ---------- HOẠT ĐỘNG ---------- */
var ACTS = {
  /* ===== SÂN GA XUẤT PHÁT ===== */
  x1: { t: 'Lên tàu', mins: 5, st: 's0', d: 'Chuyến tàu là gì, bạn đang ở đâu, muốn mang về gì.',
    steps: [
      { k: 'say', mood: 'hi', t: 'Career Design là tự vẽ hướng đi nghề nghiệp của bạn: <b>hiểu mình</b>, <b>hiểu nghề</b>, biết <b>bắt đầu từ đâu</b>.',
        rules: [
          ['check', 'Không có đúng sai', 'Chỉ cần thật với mình.'],
          ['info', '“Chưa chắc” cũng là câu trả lời', 'Các ga sau giúp bạn nghĩ tiếp.'],
          ['people', 'Thầy cô đọc để hiểu bạn', 'Không chấm điểm bài viết.'],
          ['book', 'Xong 7 ga, có Bản Career Design', 'Mỗi ga điền một ô.']
        ] },
      { k: 'pick', key: 'x1.now', scale: 1, q: 'Bạn đã rõ nghề mình muốn làm chưa?', sub: 'Cuối khóa, Shin hỏi lại câu này.',
        opts: [
          { v: '1', t: 'Chưa nghĩ nhiều', rep: 'Không sao. Chuyến tàu này giúp bạn nghĩ.' },
          { v: '2', t: 'Có vài ý, còn mơ hồ', rep: 'Khởi đầu tốt rồi. Mình cùng lọc xem ý nào là của bạn.' },
          { v: '3', t: 'Có hướng, muốn rõ hơn', rep: 'Các ga sau sẽ giúp hướng đó rõ hơn.' },
          { v: '4', t: 'Khá rõ, muốn lên kế hoạch', rep: 'Vậy mình cùng kiểm tra lại và lên kế hoạch nhé.' }
        ] },
      { k: 'video', yt: 'PrgsXcJ_yGc', start: 10, url: 'https://www.youtube.com/watch?v=PrgsXcJ_yGc&t=10s', title: 'Gương anh chị học viên Esuhai',
        hint: 'Để ý: họ bắt đầu từ đâu, chọn gì, nhờ đâu đi xa.',
        key: 'x1.notice', q: 'Bạn để ý điều gì nhất?', sub: 'Chọn 1 hoặc vài ý.', min: 1, own: 'Ý khác',
        opts: ['Hoàn cảnh giống mình', 'Dám chọn khác số đông', 'Học tiếng Nhật bền bỉ', 'Có người dẫn đường', 'Vượt qua lúc khó', 'Chưa xem hết, xem sau'] },
      { k: 'write', q: 'Mục tiêu của bạn', sub: 'Viết ngắn, thật là được.',
        fields: [{ key: 'x1.goal', l: 'Học xong khóa này, bạn muốn có được gì?', starter: 'Mình muốn ', ph: 'Ví dụ: biết mình hợp nghề gì', min: 12, rows: 3 }],
        tips: ['Mình muốn biết mình hợp nghề nào.', 'Mình muốn trả lời được “Vì sao chọn nghề này?” khi phỏng vấn.', 'Mình muốn có kế hoạch học tiếng Nhật rõ ràng.'] },
      { k: 'say', mood: 'cheer', card: 1, t: 'Vé đã in! Ô số 1 đã có chữ của bạn. Bấm <b>Đóng dấu</b> để lên tàu nhé.' }
    ] },

  /* ===== GA 1 · NHÌN XA ===== */
  w1: { t: 'Khởi động · 5 năm nữa', mins: 1, st: 's1', warm: 1,
    steps: [
      { k: 'age', key: 'w1.where', q: 'Lúc đó, bạn đang ở đâu?',
        opts: [{ v: 'jp', t: 'Làm việc ở Nhật' }, { v: 'vn', t: 'Về Việt Nam, đi làm' }, { v: 'other', t: 'Ở nơi khác' }, { v: 'na', t: 'Chưa hình dung được' }],
        rep: 'Đi Nhật thường 3–5 năm. Vậy 5 năm tới gần trùng chuyến đi của bạn đó.' }
    ] },
  a11: { t: 'Mình thật sự hay làm gì?', mins: 5, st: 's1', d: '5 tình huống. Chọn điều bạn hay làm thật.',
    steps: [
      { k: 'say', mood: 'think', t: 'Không có bên đúng sai. Bên nào cũng có <b>được</b> có <b>mất</b>. Chọn điều bạn <b>hay làm thật</b> nhé.' },
      { k: 'dil', key: 'a11.p1', q: 'Có lương hoặc tiền làm thêm, bạn thường…',
        a: { t: 'Mua ngay món thích từ lâu', get: 'Vui, tự thưởng mình', lose: 'Cuối tháng dễ hụt tiền' },
        b: { t: 'Gửi nhà, để dành rồi mới tiêu', get: 'Yên tâm khi có việc gấp', lose: 'Chờ lâu mới mua được' },
        senpai: { who: 'Anh khóa trước · ngành cơ khí', draft: 1, t: 'Tháng lương đầu, mình mua điện thoại ngay. Tháng sau mình chia tiền làm ba phần: gửi nhà, để dành, tiêu.' } },
      { k: 'dil', key: 'a11.p2', q: 'Tối rảnh, bạn thường…', calc: 1,
        a: { t: 'Lướt TikTok, xem phim', get: 'Thư giãn, có khi học được điều hay', lose: 'Dễ quá giờ, sáng mệt' },
        b: { t: 'Học thêm chút rồi ngủ sớm', get: 'Mỗi ngày một ít, cộng dồn', lose: 'Phải cố lúc mệt' },
        senpai: { who: 'Chị khóa trước · ngành điều dưỡng', draft: 1, t: 'Mình vẫn xem TikTok, nhưng hẹn giờ 20 phút. Hết giờ thì học 15 phút từ vựng.' } },
      { k: 'dil', key: 'a11.p3', q: 'Chưa hiểu bài, bạn thường…',
        a: { t: 'Để đó, cần thì học lại', get: 'Đỡ áp lực lúc đó', lose: 'Chỗ hổng lớn dần' },
        b: { t: 'Hỏi thầy cô, bạn bè ngay', get: 'Hiểu chắc từ đầu', lose: 'Hơi ngại' },
        senpai: { who: 'Anh khóa trước · ngành xây dựng', draft: 1, t: 'Mình ngại hỏi trước lớp, nên nhắn riêng cô sau giờ học. Sang Nhật, mình chờ lúc senpai rảnh mới hỏi.' } },
      { k: 'dil', key: 'a11.p4', q: 'Sáng cuối tuần, bạn thường…',
        a: { t: 'Ngủ bù cho đã', get: 'Lấy lại sức', lose: 'Dễ lệch giờ ngủ' },
        b: { t: 'Dậy như thường, vận động, dọn phòng', get: 'Giữ nhịp, phòng gọn', lose: 'Ít được nghỉ' },
        senpai: { who: 'Chị khóa trước · ngành thực phẩm', draft: 1, t: 'Ở Nhật, ca làm luôn đúng giờ. Cuối tuần mình chỉ ngủ thêm khoảng 1 tiếng.' } },
      { k: 'dil', key: 'a11.p5', q: 'Bạn thân rủ nghỉ học đi chơi, bạn thường…',
        a: { t: 'Đi luôn, lâu lâu mới một lần', get: 'Vui, thân bạn hơn', lose: 'Lỡ bài, có thể bị nhắc' },
        b: { t: 'Hẹn bạn dịp khác', get: 'Không lỡ bài, vẫn giữ bạn', lose: 'Sợ bạn buồn' },
        senpai: { who: 'Anh khóa trước · ngành nông nghiệp', draft: 1, t: 'Mình từng đi vài lần, chép bài lại rất cực. Giờ mình rủ cả nhóm đi chơi chiều Chủ nhật.' } },
      { k: 'recap', from: ['a11.p1', 'a11.p2', 'a11.p3', 'a11.p4', 'a11.p5'], labels: ['Tiền lương', 'Buổi tối', 'Chưa hiểu bài', 'Cuối tuần', 'Bạn rủ đi chơi'],
        key: 'a11.try', q: 'Tuần này, bạn muốn thử đổi tình huống nào?', sub: 'Chạm một tình huống, hoặc giữ như hiện tại.', keepT: 'Giữ như hiện tại',
        fields: [{ key: 'a11.why', l: 'Vì sao?', ph: 'Viết ngắn thôi', min: 12, rows: 2 }],
        tips: ['Mình muốn hẹn giờ lướt điện thoại, vì sáng nào cũng buồn ngủ.', 'Mình giữ như cũ, vì thấy cách tiêu tiền của mình đang ổn.'] }
    ] },
  a13: { t: 'Hai phiên bản của tôi', mins: 5, st: 's1', d: 'Bạn mong gì, và ngày thường đang đưa bạn tới đâu.',
    steps: [
      { k: 'multi', key: 'a13.hope', q: '5 năm sau, bạn mong mình thế nào?', sub: 'Chọn tối đa 3.', min: 1, max: 3, own: 'Ý khác',
        opts: ['Có nghề vững tay', 'Nói tiếng Nhật tự tin', 'Khỏe mạnh', 'Lo được cho gia đình', 'Có tiền để dành', 'Có bạn bè tốt', 'Dám thử việc mới', 'Được người khác tin'] },
      { k: 'multi', key: 'a13.day', q: 'Ngày thường của bạn có những việc nào?', sub: 'Chọn ít nhất 3, đúng như thật.', min: 3, own: 'Việc khác',
        opts: ['Dậy trước 6 giờ', 'Thức sau 12 giờ đêm', 'Lướt mạng xã hội', 'Chơi game', 'Học tiếng Nhật thêm', 'Tập thể dục', 'Đi làm thêm', 'Nấu ăn', 'Gọi điện về nhà', 'Dọn phòng', 'Đến lớp sát giờ', 'Ăn vặt, trà sữa', 'Ghi chép chi tiêu', 'Đi chơi với bạn'] },
      { k: 'tag', key: 'a13.tag', from: 'a13.day', hope: 'a13.hope',
        q: 'Mỗi việc kéo bạn lại gần hay ra xa điều bạn mong?', sub: 'Mỗi người xếp một khác. Bạn tự quyết.',
        opts: [['g', 'Lại gần'], ['x', 'Ra xa'], ['u', 'Chưa biết']] },
      { k: 'write', twin: 1, from: 'a13.tag', q: 'Hai phiên bản của bạn', sub: 'Dựa vào cách bạn vừa xếp.',
        fields: [
          { key: 'a13.keep', l: 'Nếu mọi thứ giữ như bây giờ', starter: 'Mình sẽ ', ph: 'Ví dụ: vẫn làm được việc, nhưng…', min: 12, rows: 3, tag: 'Giữ nguyên' },
          { key: 'a13.change', l: 'Nếu đổi 1–2 việc nhỏ', starter: 'Mình sẽ ', ph: 'Ví dụ: nói tiếng Nhật tự tin hơn…', min: 12, rows: 3, tag: 'Đổi 1–2 việc' }
        ],
        tips: ['Giữ nguyên: vẫn làm được việc, nhưng tiếng Nhật chỉ đủ dùng, hay mệt vì thức khuya.', 'Đổi 1–2 việc: nói chuyện công việc bằng tiếng Nhật, khỏe hơn, có tiền gửi nhà.'] },
      { k: 'write', q: 'Bạn muốn trở thành ai?', sub: 'Câu này vào ô số 2.',
        fields: [
          { key: 'a13.me', l: 'Viết một câu', starter: '5 năm sau, mình muốn là người ', ph: 'Ví dụ: có nghề vững tay, lo được cho ba mẹ', min: 12, rows: 2 },
          { key: 'a13.first', l: 'Việc nhỏ bạn thử từ tuần này', ph: 'Ví dụ: tắt điện thoại lúc 23 giờ', min: 6, rows: 2, noIns: 1 }
        ] }
    ] },

  /* ===== GA 2 · BIẾT MÌNH ===== */
  a21: { t: 'Tôi thích làm gì?', mins: 4, st: 's2', d: 'Vòng 1: việc làm bạn thấy vui.',
    steps: [
      { k: 'multi', key: 'a21.sel', q: 'Việc nào làm bạn thấy vui?', sub: 'Chọn ít nhất 3. Chọn theo cảm nhận.', min: 3, own: 'Việc khác',
        opts: ['Sửa chữa đồ đạc', 'Lắp ráp, tháo lắp', 'Nấu ăn', 'Trồng cây, nuôi con vật', 'Chăm sóc người khác', 'Trò chuyện, kết bạn', 'Vẽ, trang trí', 'May vá, làm đồ thủ công', 'Dọn dẹp, sắp xếp', 'Thể thao, vận động', 'Máy tính, công nghệ', 'Lái xe, vận hành máy', 'Bán hàng, phục vụ khách', 'Chỉ dạy người khác', 'Tìm hiểu cái mới', 'Làm một mình, yên tĩnh'] },
      { k: 'write', q: 'Lần gần nhất bạn quên cả thời gian?', sub: 'Lúc đó bạn đang làm gì?',
        fields: [{ key: 'a21.flow', l: 'Kể ngắn', ph: 'Ví dụ: cùng ba sửa xe, mải làm hết buổi chiều', min: 12, rows: 3 }] }
    ] },
  a22: { t: 'Tôi giỏi gì?', mins: 4, st: 's2', d: 'Vòng 2: điểm mạnh của bạn.',
    steps: [
      { k: 'multi', key: 'a22.sel', q: 'Bạn mạnh ở những điểm nào?', sub: 'Chọn ít nhất 3. Không chắc thì hỏi người thân.', min: 3, own: 'Điểm mạnh khác',
        groups: [
          ['Tâm · thái độ', ['Kiên nhẫn', 'Biết lắng nghe', 'Biết ơn', 'Chân thành', 'Có trách nhiệm', 'Hay giúp người']],
          ['Thân · sức khỏe, thói quen', ['Khỏe, chịu khó', 'Khéo tay', 'Đúng giờ', 'Gọn gàng', 'Cẩn thận, tỉ mỉ', 'Chịu được áp lực']],
          ['Trí · cách nghĩ, cách học', ['Học nhanh', 'Nhớ tốt', 'Tính toán', 'Quan sát tốt', 'Sáng tạo', 'Hay hỏi “tại sao”']],
          ['Kỹ năng', ['Giao tiếp', 'Làm việc nhóm', 'Tiếng Nhật', 'Dẫn dắt nhóm', 'Dùng máy tính', 'Sửa chữa, lắp ráp']]
        ] },
      { k: 'write', q: 'Ai từng khen bạn, khen gì?', sub: 'Lời khen thật thường chỉ ra điểm mạnh thật.',
        fields: [{ key: 'a22.praise', l: 'Kể ngắn', ph: 'Ví dụ: cô chủ nhiệm khen mình ghi chép kỹ', min: 12, rows: 3 }] }
    ] },
  a23: { t: 'Điều gì quan trọng với tôi?', mins: 5, st: 's2', d: 'Vòng 3, rồi tìm chỗ 3 vòng gặp nhau.',
    steps: [
      { k: 'multi', key: 'a23.rank', q: 'Điều gì quan trọng nhất với bạn?', sub: 'Chọn đúng 3 điều.', min: 3, max: 3, own: 'Điều khác',
        opts: ['Thu nhập tốt', 'Gia đình', 'Học hỏi, phát triển', 'Ổn định lâu dài', 'Sức khỏe', 'Tự do, tự chủ', 'Giúp đỡ người khác', 'Được tôn trọng', 'Khám phá, trải nghiệm', 'Làm chủ, kinh doanh'] },
      { k: 'venn', q: 'Nghề nào nằm ở giữa 3 vòng?', sub: 'Gợi ý 1–3 nghề. Chưa chắc cũng không sao.',
        fields: [{ key: 'a23.inter', l: 'Nghề bạn nghĩ tới', starter: 'Mình nghĩ tới ', ph: 'Ví dụ: sửa ô tô, vì thích sửa xe, khéo tay', min: 8, rows: 3 }] }
    ] },

  /* ===== GA 3 · TÍNH CÁCH ===== */
  a31: { t: 'Trắc nghiệm RIASEC', mins: 5, st: 's3', d: '30 hoặc 60 câu Thích / Không hẳn, tìm 3 nhóm sở thích nghề.',
    steps: [
      { k: 'riamode', key: 'a31.n', t: 'RIASEC chia sở thích nghề thành <b>6 nhóm</b>. Chọn theo cảm nhận, đừng nghĩ lâu nhé.',
        opts: [{ v: 60, t: 'Bản đầy đủ · 60 câu', d: 'Khoảng 8 phút · kết quả rõ hơn', rec: 1 }, { v: 30, t: 'Bản nhanh · 30 câu', d: 'Khoảng 4 phút · làm thêm 30 câu sau cũng được' }] },
      { k: 'ria', key: 'a31.rq', q: 'Bạn có thích việc này không?' },
      { k: 'riares', key: 'a31.rq' }
    ] },
  a32: { t: 'Trắc nghiệm ngành Tikme', mins: 5, st: 's3', d: 'Làm bài trên Tikme, rồi so với RIASEC.',
    steps: [
      { k: 'tik', key: 'a32.open', url: TIKME + '/nganh-nghe', btn: 'Mở trang Ngành nghề trên Tikme',
        t: 'Tikme có <b>17 ngành</b> đi Nhật. Mở trang Ngành nghề, làm bài trắc nghiệm ngành, rồi quay lại đây.',
        tips: ['Tikme mở ở thẻ mới. Làm xong, quay lại thẻ này để đi tiếp.', 'Chưa làm kịp? Bước sau bạn chọn ngành theo cảm nhận cũng được.'] },
      { k: 'inds', key: 'a32.t', multi: 1, max: 3, q: 'Tikme gợi ý cho bạn ngành nào?', sub: 'Chọn tối đa 3. Chưa làm được thì chọn ngành bạn thấy thích.' },
      { k: 'cmp', key: 'a32.feel', q: 'Hai kết quả có khớp nhau không?',
        opts: [{ v: 'y', t: 'Khá khớp' }, { v: 'p', t: 'Khớp một phần' }, { v: 'n', t: 'Khác nhau' }, { v: 'u', t: 'Chưa chắc' }],
        rep: 'Khớp hay không đều có ích. Khác nhau nghĩa là bạn có nhiều hướng để cân nhắc.' }
    ] },
  a33: { t: 'Chọn ga đích', mins: 5, st: 's3', d: 'Xem 3 đoạn video về dấu hiệu chọn nghề, chọn nghề chính và phương án 2.',
    steps: [
      /* video chia 3 đoạn (PS1.3.15): mỗi đoạn chọn ý chạm bạn nhất + 1 dòng "Ở bạn…". Ý viết là diễn giải của khóa, không trích nguyên văn. */
      { k: 'vseg', yt: 'gndJToZz76M', url: 'https://www.youtube.com/watch?v=gndJToZz76M', title: 'Thầy Lê Long Sơn · Dấu hiệu chọn nghề',
        hint: 'Video chia 3 đoạn ngắn. Xem từng đoạn, rồi nói về chính bạn.',
        segs: [
          { s: 0, e: 30, lbl: 'Năng khiếu', key: 'a33.v1',
            opts: ['Năng khiếu là việc mình làm tốt và thích làm', 'Thích giao tiếp thì hợp nghề làm việc với người', 'Thích vẽ thì hợp nghề cần mắt tinh, tay khéo'] },
          { s: 30, e: 60, lbl: 'Ước mơ từ nhỏ', tab: 'Ước mơ', key: 'a33.v2',
            opts: ['Ước mơ từ nhỏ mà đến giờ vẫn còn', 'Muốn làm được thật, không chỉ để mơ', 'Xem mình có hợp với nghề đó không'] },
          { s: 60, e: 118, lbl: 'Hình mẫu', key: 'a33.v3',
            opts: ['Có một người mình muốn giống', 'Có thể là thần tượng, hay người thân', 'Tìm đường học để thành người như họ'] }
        ],
        none: 'Chưa thấy ở mình',
        fields: [
          { key: 'a33.l1', l: 'Ở bạn, năng khiếu đó là gì?', lN: 'Bạn sẽ hỏi ai, thử gì để tìm ra?', ph: 'Ví dụ: mình khéo tay, sửa xe đạp cho cả xóm', min: 4, rows: 2 },
          { key: 'a33.l2', l: 'Ở bạn, ước mơ đó là gì?', lN: 'Bạn sẽ hỏi ai, thử gì để tìm ra?', ph: 'Ví dụ: từ nhỏ mình đã muốn làm thợ máy như bố', min: 4, rows: 2 },
          { key: 'a33.l3', l: 'Ở bạn, hình mẫu đó là ai?', lN: 'Bạn sẽ hỏi ai, thử gì để tìm ra?', ph: 'Ví dụ: chú mình, thợ hàn 20 năm, ai cũng nể', min: 4, rows: 2 }
        ] },
      { k: 'inds', key: 'a33.main', q: 'Nghề chính bạn chọn là gì?', sub: 'Đây là ga đích của chặng đầu. Sau này vẫn đổi được.', other: 1 },
      { k: 'inds', key: 'a33.b', q: 'Phương án 2 của bạn?', sub: 'Có phương án 2 không phải là thiếu quyết tâm.', other: 1, none: 'Chưa nghĩ ra', exclude: 'a33.main' },
      { k: 'write', q: 'Vì sao bạn chọn nghề chính này?', sub: 'Câu này giúp bạn trả lời khi phỏng vấn.',
        fields: [{ key: 'a33.why', l: 'Viết 1–2 câu', starter: 'Mình chọn nghề này vì ', ph: 'Ví dụ: mình khéo tay, thích máy móc', min: 12, rows: 3 }],
        tips: ['Mình chọn nghề này vì mình khéo tay và thích máy móc từ nhỏ.', 'Mình chọn nghề này vì muốn giỏi như chú mình, thợ máy 20 năm.'] }
    ] },
  /* ===== GA 4 · NGÀNH NGHỀ ===== */
  w4: { t: 'Khởi động · Đoán thử', mins: 1, st: 's4', warm: 1,
    steps: [ /* câu hỏi lấy theo nghề: xem INDP, GUESS, GUESS_GRP */
      { k: 'guess', key: 'w4.g1', slot: 0 },
      { k: 'guess', key: 'w4.g2', slot: 1 },
      { k: 'guess', key: 'w4.g3', slot: 2 }
    ] },
  a42: { t: 'Nghề của tôi', mins: 5, st: 's4', d: 'Tìm việc lạc nghề, xem Tikme, rồi viết một ngày làm nghề.',
    steps: [
      { k: 'jobguess', key: 'a42.guess', dl: 'a42.dl', q: 'Bạn đoán một ngày làm [Nghề] có những gì?', sub: 'Chọn ít nhất 2. Đoán thôi, chưa cần chắc.', min: 2, own: 'Việc khác' }, /* có DAYJOB thì thành "Một ngày của bạn TTS"; không có ngành thì vẫn đoán chip */
      { k: 'tik', key: 'a42.open', dyn: 'job', btn: 'Xem ngành [Nghề] trên Tikme',
        t: 'Giờ xem Tikme nói gì về [Nghề]. Đọc phần <b>công việc hằng ngày</b> và <b>lộ trình</b>, rồi quay lại nhé.',
        tNear: 'Nghề của bạn chưa có trang riêng trên Tikme. Xem ngành gần nhất bạn đã chọn, rồi quay lại nhé.',
        tNone: 'Nghề của bạn chưa có trang riêng trên Tikme. Xem danh sách 17 ngành, rồi hỏi thầy cô thêm nhé.',
        tips: ['Tikme mở ở thẻ mới. Đọc xong, quay lại thẻ này.', 'Để ý chỗ nào khác với điều bạn vừa đoán.'] },
      { k: 'write', real: 1, q: 'Sau khi xem Tikme, bạn thấy gì?', sub: 'Viết ngắn, mỗi ô một ý.',
        fields: [
          { key: 'a42.wow', l: 'Điều làm bạn bất ngờ', ph: '@wow', min: 6, rows: 2 },
          { key: 'a42.like', l: 'Điều bạn thích ở nghề này', ph: '@like', min: 6, rows: 2 },
          { key: 'a42.worry', l: 'Điều bạn còn lo', ph: '@worry', min: 4, rows: 2, noIns: 1 }
        ] },
      { k: 'write', q: 'Một ngày làm nghề của bạn, 5 năm sau', sub: 'Tưởng tượng như kể lại cho bạn thân nghe.',
        fields: [{ key: 'a42.day', l: 'Kể từ sáng đến tối', starter: 'Buổi sáng, mình ', ph: '@dayph', min: 20, rows: 4 }],
        tips: '@day' }
    ] },
  a44: { t: 'Lộ trình của tôi', mins: 5, st: 's4', d: 'Xem diện đi Nhật, rồi tự vẽ các mốc của bạn.',
    steps: [
      { k: 'visa', key: 'a44.path', q: 'Bạn dự định đi Nhật theo diện nào?', sub: 'Chưa chắc thì chọn “Chưa rõ”.' },
      { k: 'tik', key: 'a44.open', dyn: 'visa', btn: 'Xem diện [Diện] trên Tikme',
        t: 'Mở Tikme xem kỹ <b>điều kiện</b> và <b>thời gian</b> của diện này nhé.',
        more: { u: '/visa/hanh-trinh', t: 'Làm bài chọn visa trên Tikme' },
        tips: ['Mốc tiếng Nhật và tay nghề là chỗ cần nhớ nhất.', 'Thông tin trên Tikme là tham khảo. Hỏi thầy cô khi chưa rõ.'] },
      { k: 'tl', key: 'a44.tl', q: 'Mỗi mốc, bạn dự định khi nào?', sub: 'Chọn năm. Tháng thì chọn nếu muốn. “Đã xong”, “Chưa biết” cũng được.' },
      { k: 'tlview', key: 'a44.tl', q: 'Lộ trình bạn vừa vẽ',
        fields: [{ key: 'a44.next', l: 'Mốc gần nhất, bạn bắt đầu thế nào?', starter: 'Mốc gần nhất của mình là ', ph: 'Ví dụ: đạt N5, mỗi tối học 20 từ', min: 10, rows: 3 }],
        tips: ['Mốc gần nhất của mình là N5 vào tháng 6. Mỗi tối mình học 20 từ, Chủ nhật làm 1 đề.', 'Mốc gần nhất của mình là đậu phỏng vấn ngành [Nghề]. Mình tập trả lời “Vì sao chọn nghề này?” mỗi tuần.'] }
    ] },
  a43: { t: 'Sẵn sàng đến đâu?', mins: 4, st: 's4', d: 'Xem 8 thẻ đời sống ở Nhật. Còn lo là bình thường.',
    steps: [
      { k: 'swipe', key: 'a43.r', q: 'Với điều này, bạn thấy mình…' },
      { k: 'worry', key: 'a43.top', q: 'Điều bạn lo nhất là gì?', sub: 'Chọn một. Ga 7, Shin cùng bạn chuẩn bị cho điều này.' },
      { k: 'write', q: 'Dù còn lo, vì sao bạn vẫn muốn đi?', sub: 'Lý do của chính bạn, không cần hay.',
        fields: [{ key: 'a43.why', l: 'Viết 1–2 câu', starter: 'Mình vẫn muốn đi vì ', ph: 'Ví dụ: muốn sửa lại nhà cho ba mẹ', min: 12, rows: 3 }],
        tips: ['Mình vẫn muốn đi vì muốn có nghề vững và sửa lại nhà cho ba mẹ.', 'Mình vẫn muốn đi vì muốn thử sống tự lập, xem mình làm được tới đâu.'] }
    ] },

  /* ===== GA 5 · CHUYỆN TRÒ ===== */
  a51: { t: 'Chuyện chị Thúy', mins: 5, st: 's5', d: 'Truyện tranh 3 khung, rồi đọc một chuyện cùng ngành.',
    steps: [
      { k: 'comic', key: 'a51.c1', fr: [0, 1], q: 'Chuyện thật trên Tikme', sub: 'Chạm “Xem tiếp” để mở từng khung.' },
      { k: 'guess', key: 'a51.free', q: 'Ít chỗ chơi. Theo bạn, chị Thúy dùng thời gian rảnh thế nào?',
        opts: ['Làm thêm thật nhiều', 'Học tiếng Nhật', 'Nghỉ ngơi cho khỏe', 'Mỗi người một khác'],
        fact: 'Chị dồn thời gian để học. Khoảng 1,5–2 năm sau, chị đạt N2.', src: 'Theo Tikme' },
      { k: 'comic', key: 'a51.c2', fr: [2], q: 'Ba năm sau', sub: 'Khung cuối.' },
      { k: 'persp', key: 'a51.help', q: 'Theo bạn, điều gì giúp chị đi xa như vậy?', sub: 'Chọn 1–3 ý. Ý nào cũng là một góc nhìn.', min: 1, max: 3, own: 'Ý khác',
        opts: ['Tiếng Nhật đến N2', 'Dám đi dù chưa được ủng hộ', 'Tác phong làm việc kiểu Nhật', 'Dùng giờ rảnh để học', 'Được công ty tin', 'Gặp may'],
        fields: [{ key: 'a51.bring', l: 'Ngoài tiền, 3–5 năm ở Nhật bạn muốn mang về gì?', starter: 'Ngoài tiền, mình muốn mang về ', ph: 'Ví dụ: tay nghề [Nghề] vững, tiếng Nhật N3', min: 10, rows: 3 }] },
      { k: 'tik', key: 'a51.open', dyn: 'story', btn: 'Xem thêm chuyện trên Tikme',
        t: 'Chọn một anh chị đi trước, nhất là ngành [Nghề]. Đọc hoặc xem video, rồi quay lại nhé.',
        tips: ['Để ý họ bắt đầu thế nào và lúc khó nhất.', 'Muốn tìm thêm? Mở danh sách, chọn anh chị có N3 trở lên.'] },
      { k: 'write', q: 'Chuyện bạn vừa đọc', sub: 'Viết ngắn, mỗi ô một ý.',
        fields: [
          { key: 'a51.who', l: 'Chuyện của ai, ngành gì?', ph: '@who', min: 4, rows: 1, noIns: 1 },
          { key: 'a51.turn', l: 'Bước ngoặt của họ là gì?', ph: 'Ví dụ: dám đi dù gia đình chưa ủng hộ', min: 8, rows: 2 },
          { key: 'a51.learn', l: 'Điều bạn muốn học theo', starter: 'Mình muốn học theo ', ph: 'Ví dụ: cách anh tự học sau giờ làm', min: 8, rows: 3 }
        ] }
    ] },
  a53: { t: 'Trò chuyện với anh Minh', mins: 5, st: 's5', d: 'Hỏi điều bạn tò mò, rồi soạn câu hỏi cho người thật.',
    steps: [
      { k: 'chat', key: 'a53.ask', min: 3, q: 'Bạn muốn hỏi anh Minh điều gì?', sub: 'Chạm ít nhất 3 câu. Không có câu đúng sai.' },
      { k: 'chatpick', key: 'a53.best', q: 'Câu nào cho bạn câu trả lời dùng được nhất?' },
      { k: 'write', q: 'Người dẫn đường của bạn', sub: 'Tuần này, hỏi họ 2 câu bạn soạn nhé.',
        fields: [
          { key: 'a53.guide', l: 'Ngoài đời, ai có thể dẫn đường cho bạn?', ph: 'Ví dụ: anh họ đang làm ở Nhật, thầy chủ nhiệm', min: 4, rows: 2, noIns: 1 },
          { key: 'a53.q1', l: 'Câu hỏi 1', ph: 'Ví dụ: Tháng đầu làm [Nghề], điều gì khó nhất?', min: 10, rows: 2, noIns: 1 },
          { key: 'a53.q2', l: 'Câu hỏi 2', ph: 'Ví dụ: Em nên luyện thói quen nào từ bây giờ?', min: 10, rows: 2, noIns: 1 }
        ],
        tips: ['Hỏi cụ thể: lúc nào, việc gì, làm thế nào.', 'Tránh câu chỉ trả lời có hoặc không.', 'Hỏi để biết mình nên làm gì từ hôm nay.'] }
    ] },

  /* ===== GA 6 · ĐỊNH HƯỚNG (gợi ý theo từng nghề: IND6; dự phòng PLAN, GAP_GRP, IV6_GEN) ===== */
  w6: { t: 'Khởi động · Rõ mấy phần?', mins: 1, st: 's6', warm: 1,
    steps: [
      { k: 'slide', sl: { key: 'w6.clear', min: 0, max: 10, step: 1, def: 5, unit: 'part', lo: 'Chưa có gì', hi: 'Rõ từng tháng' },
        q: 'Kế hoạch đi Nhật của bạn rõ được mấy phần?', sub: 'Kéo thanh trượt. Không có đúng sai.',
        senpai: '@w6' }
    ] },
  a62: { t: 'Kế hoạch 2 chặng', mins: 5, st: 's6', d: 'Chia lộ trình thành 2 chặng: ở JPC và ở Nhật.',
    steps: [
      { k: 'bridge', q: 'Cây cầu của bạn', sub: 'Các mốc bạn vẽ ở Ga 4, chia làm 2 chặng.' },
      { k: 'plan', lv: { key: 'a62.jp1', q: 'Trước khi bay, bạn muốn tiếng Nhật đến đâu?', opts: 'lv1', note: 1 },
        key: 'a62.do1', dyn: 'jpc', q: 'Ở JPC, bạn muốn làm được gì?', sub: 'Chọn 2–4 việc.', min: 2, max: 4, own: 'Việc khác' },
      { k: 'plan', lv: { key: 'a62.jp2', q: 'Ở Nhật, tiếng Nhật của bạn đến đâu?', opts: 'lv2' },
        key: 'a62.work', dyn: 'work', q: 'Trong công việc, bạn muốn đạt gì?', sub: 'Chọn 1–3 điều.', min: 1, max: 3, own: 'Điều khác' },
      { k: 'slide', sl: { key: 'a62.save', min: 0, max: 400, step: 10, def: 100, unit: 'money', lo: '0', hi: '400 triệu', skip: 'Mình chưa tính được' },
        q: 'Mỗi năm ở Nhật, bạn muốn để dành khoảng bao nhiêu?', sub: 'Kéo để đặt số của bạn.', note: PLAN.saveNote,
        senpai: '@save',
        key: 'a62.joy', opts: PLAN.joy, cq: 'Ngoài giờ làm, bạn muốn trải nghiệm gì?', csub: 'Chọn 1–3. Vui cũng là một phần kế hoạch.', min: 1, max: 3, own: 'Ý khác' },
      { k: 'write', q: 'Kế hoạch của bạn', sub: 'Mỗi chặng một câu. Gợi ý nhỏ ghép từ lựa chọn của bạn.',
        fields: [
          { key: 'a62.p1', l: 'Chặng 1 · Ở JPC', starter: 'Ở JPC, mình sẽ ', ph: 'Ví dụ: đạt N4, học từ vựng [Nghề] mỗi tuần', min: 12, rows: 3 },
          { key: 'a62.p2', l: 'Chặng 2 · Ở Nhật', starter: 'Ở Nhật, mình sẽ ', ph: 'Ví dụ: đậu thi tay nghề, lên N3', min: 12, rows: 3 }
        ],
        tips: '@plan' }
    ] },
  a63: { t: 'Đo khoảng cách', mins: 5, st: 's6', d: 'Nghề cần gì, bạn có gì. Rồi tập trả lời phỏng vấn 60 giây.',
    steps: [
      { k: 'gap', key: 'a63.gap', q: 'Nghề [Nghề] cần những điều này. Bạn có đến đâu?', sub: 'Chọn thật. Chưa có là bình thường.' },
      { k: 'habit', q: 'Biến điều còn thiếu thành thói quen', sub: 'Viết 2 công thức “Khi… tôi sẽ…”. Bắt đầu từ tuần này.' },
      { k: 'iv', q: IV.q, sub: 'Viết như đang nói. Khoảng 4–6 câu là vừa 60 giây.',
        fields: [{ key: 'a63.iv', l: 'Câu trả lời của bạn', starter: 'Em chọn nghề này vì ', ph: '@iv', min: 40, rows: 6 }],
        tips: '@ivt' },
      { k: 'say', mood: 'cheer', card: 7, t: 'Ô số 7 sắp có chữ của bạn. Bấm <b>Đóng dấu</b> nhé.' }
    ] },

  /* ===== GA 7 · THỬ THÁCH (theo từng nghề: IND7, WORRY7; thẻ việc khó lấy từ hành trình) ===== */
  a71: { t: 'Tuần đầu ở Nhật', mins: 5, st: 's7', d: 'Tập dượt 2 ngày: một chuyện của nghề, một điều bạn lo.',
    steps: [
      { k: 'week', t: 'Tuần đầu ở Nhật, ai cũng gặp chuyện bất ngờ. Mình mở 2 ngày, xem [Tên] sẽ làm gì nhé.' },
      { k: 'sc', key: 'a71.s1', slot: 'job', day: 1 },
      { k: 'sc', key: 'a71.s2', slot: 'worry', day: 3 },
      { k: 'prep7', key: 'a71.prep', q: 'Từ bây giờ, bạn muốn chuẩn bị gì?', sub: 'Chọn 1–2 việc. Gợi ý từ 2 ngày vừa rồi.', min: 1, max: 2, own: 'Việc khác',
        fields: [{ key: 'a71.note', l: 'Một câu nhắn cho bạn của tuần đầu ở Nhật', ph: 'Ví dụ: Chưa hiểu thì hỏi lại, không ai cười đâu.', min: 8, rows: 2 }],
        tips: ['Chưa hiểu thì hỏi lại. Hỏi lại là cẩn thận, không phải kém.', 'Tuần đầu ai cũng chậm. Mình chỉ cần hơn hôm qua một chút.', 'Nhớ lý do mình sang đây, rồi ngủ một giấc thật ngon.'] }
    ] },
  a72: { t: 'Việc khó đầu tiên', mins: 5, st: 's7', d: 'Xếp việc vào 3 vùng, nhận 1 việc ở vùng học hỏi.',
    steps: [
      { k: 'zones', t: 'Việc ở <b>vùng học hỏi</b> làm bạn hơi run, nhưng cố là làm được. Mỗi người một vùng khác nhau.' },
      { k: 'zsort', key: 'a72.z', q: 'Với bạn, mỗi việc ở vùng nào?', sub: 'Chạm để xếp. Không có đúng sai.' },
      { k: 'hard', key: 'a72.sel', q: 'Bạn nhận việc nào?', sub: 'Chọn 1 việc, tối đa 2. Làm trong 2 tuần tới.', max: 2 },
      { k: 'write', q: 'Nếu ngại thì sao?', sub: 'Ai cũng có lúc ngại. Nghĩ trước cách vượt qua nhé.',
        fields: [{ key: 'a72.if', l: 'Lúc ngại, bạn sẽ làm gì?', starter: 'Nếu ngại, mình sẽ ', ph: 'Ví dụ: làm thử 5 phút trước, rồi tính tiếp', min: 10, rows: 3 }],
        tips: ['Nếu ngại, mình sẽ làm thử 5 phút trước, rồi tính tiếp.', 'Nếu ngại, mình sẽ nhắn người cùng biết để có người nhắc.', 'Nếu ngại, mình sẽ nhớ lý do mình muốn đi Nhật.'] },
      { k: 'say', mood: 'cheer', card: 8, t: 'Ô số 8 sắp có chữ của bạn. Hết hạn, Shin sẽ hỏi bạn làm thế nào nhé. Bấm <b>Đóng dấu</b>!' }
    ] },

  /* ===== GA ƯỚC MƠ (FINAL) · nghi thức về đích: soát vé → lời hứa → Bản Career Design 1 trang ===== */
  a80: { t: 'Cổng soát vé', mins: 2, st: 's8', d: 'Máy soát 8 ô. Ô nào còn ngắn, bạn bổ sung nếu muốn.', btn: 'Qua cổng',
    steps: [
      { k: 'gate' }
    ] },
  a81: { t: 'Lời hứa với mình', mins: 5, st: 's8', d: 'Nhìn lại chuyến tàu, viết thư cho mình 5 năm sau.', btn: 'Cất lời hứa',
    steps: [
      { k: 'now8', key: 'a81.now', q: 'Bây giờ, bạn đã rõ nghề mình muốn làm chưa?', sub: 'Lúc lên tàu, bạn cũng trả lời câu này.',
        hkey: 'a81.help', hq: 'Điều gì giúp bạn nhiều nhất?', hsub: 'Chọn 1–2 điều.', max: 2, own: 'Ý khác' },
      { k: 'write', q: 'Thư gửi mình năm [Năm5]', sub: 'Viết như đang nói với chính mình. 3–5 câu là đủ.',
        fields: [
          { key: 'a81.letter', l: 'Thư của bạn', starter: 'Gửi mình 5 năm sau, ', ph: '@lx', min: 30, rows: 6 },
          { key: 'a81.motto', l: 'Gói lời hứa trong 1 câu ngắn', ph: 'Ví dụ: Chậm mà chắc, đi là tới.', min: 4, rows: 2, noIns: 1 }
        ],
        tips: '@letter' },
      { k: 'seal8', key: 'a81.seal' }
    ] },
  a82: { t: 'Bản Career Design 1 trang', mins: 4, st: 's8', d: 'Lưu bản 1 trang, gửi thầy cô, xem bước tiếp theo.', btn: 'Về đích',
    steps: [
      { k: 'sheet8' },
      { k: 'send8' },
      { k: 'next8', key: 'a82.far', q: '5 năm nữa, bạn tò mò hướng nào nhất?', sub: 'Gợi ý theo nghề [Nghề]. CD02 sẽ cùng bạn nghĩ tiếp.' }
    ] }
};

/* Thứ tự học (chặng chính). Ga chưa có hoạt động (ready:0) hiện "Đang xây". */
var ORDER = ['x1', 'a11', 'a13', 'a21', 'a22', 'a23', 'a31', 'a32', 'a33', 'a42', 'a44', 'a43', 'a51', 'a53', 'a62', 'a63', 'a71', 'a72'];
/* Ga Ước Mơ: mở khi xong 18 chặng trên, đi lần lượt */
var FIN_ORDER = ['a80', 'a81', 'a82'];

/* ---------- Bản demo giáo viên: học viên giả đã xong Sân ga đến Ga 7, Ga Ước Mơ đang chờ (hạn việc khó đặt là hôm qua để thấy lời Shin hỏi kết quả; ô 3 cố ý ngắn để thấy cổng soát vé) ---------- */
var DEMO_DATA = {
  prof: { name: 'Nguyễn Văn An', by: '2005', sid: 'HV2026-0123', cls: 'E696', path: 'Ikusei Shuro' },
  intro: 1,
  done: { x1: 1763260000000, w1: 1763260000000, a11: 1763260000000, a13: 1763260000000, a21: 1763260000000, a22: 1763260000000, a23: 1763260000000, a31: 1763260000000, a32: 1763260000000, a33: 1763260000000, w4: 1763260000000, a42: 1763260000000, a44: 1763260000000, a43: 1763260000000, a51: 1763260000000, a53: 1763260000000, w6: 1763260000000, a62: 1763260000000, a63: 1763260000000, a71: 1763260000000, a72: 1763260000000 },
  d: {
    'x1.now': '2', 'x1.notice': ['Hoàn cảnh giống mình', 'Học tiếng Nhật bền bỉ'],
    'x1.goal': 'Mình muốn biết mình hợp nghề cơ khí hay nghề hàn hơn, và có kế hoạch học tiếng Nhật rõ ràng.',
    'w1.where': 'jp',
    'a11.p1': 'b', 'a11.p2': 'a', 'a11.p3': 'm', 'a11.p4': 'a', 'a11.p5': 'b', 'a11.mins': 15,
    'a11.try': 'a11.p2', 'a11.why': 'Mình muốn hẹn giờ lướt điện thoại 20 phút, vì sáng nào lên lớp cũng buồn ngủ.',
    'a13.hope': ['Có nghề vững tay', 'Lo được cho gia đình', 'Nói tiếng Nhật tự tin'],
    'a13.day': ['Thức sau 12 giờ đêm', 'Lướt mạng xã hội', 'Đi làm thêm', 'Gọi điện về nhà', 'Học tiếng Nhật thêm'],
    'a13.tag': { 'Thức sau 12 giờ đêm': 'x', 'Lướt mạng xã hội': 'u', 'Đi làm thêm': 'g', 'Gọi điện về nhà': 'g', 'Học tiếng Nhật thêm': 'g' },
    'a13.keep': 'Mình sẽ vẫn làm được việc, nhưng tiếng Nhật chỉ đủ dùng và hay mệt vì thức khuya.',
    'a13.change': 'Mình sẽ nói chuyện công việc bằng tiếng Nhật, khỏe hơn và có tiền sửa nhà cho ba mẹ.',
    'a13.me': '5 năm sau, mình muốn là người thợ cơ khí vững tay, nói tiếng Nhật tự tin và lo được cho ba mẹ.',
    'a13.first': 'Tắt điện thoại lúc 23 giờ, trước đó học 10 từ vựng.',
    'a21.sel': ['Sửa chữa đồ đạc', 'Lắp ráp, tháo lắp', 'Nấu ăn', 'Thể thao, vận động'],
    'a21.flow': 'Sửa quạt cả buổi chiều.', /* cố ý ngắn: để demo thấy cổng soát vé gợi ý bổ sung ô 3 */
    'a22.sel': ['Kiên nhẫn', 'Khéo tay', 'Cẩn thận, tỉ mỉ', 'Sửa chữa, lắp ráp'],
    'a22.praise': 'Thầy chủ nhiệm khen mình lắp lại xe đạp cho bạn mà không sót con ốc nào.',
    'a23.rank': ['Gia đình', 'Học hỏi, phát triển', 'Thu nhập tốt'],
    'a23.inter': 'Mình nghĩ tới thợ cơ khí CNC hoặc sửa ô tô, vì mình khéo tay và thích máy móc.',
    'a31.n': 60, 'a31.rq': [1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0],
    'a32.open': 1, 'a32.t': ['co-khi', 'o-to'], 'a32.feel': 'y',
    'a33.signs': ['Năng khiếu', 'Hình mẫu'], 'a33.v1': '0', 'a33.l1': 'Mình khéo tay, sửa xe đạp cho cả xóm.', 'a33.v2': 'n', 'a33.l2': 'Mình sẽ hỏi mẹ hồi nhỏ mình hay nói muốn làm gì.', 'a33.v3': '2', 'a33.l3': 'Chú Ba, thợ cơ khí 20 năm ở quê.', 'a33.vs': { seg: 2, w: [1, 1, 1] }, 'a33.main': 'co-khi', 'a33.b': 'han',
    'a33.why': 'Mình chọn nghề này vì mình khéo tay, thích máy móc và muốn giỏi như chú mình, thợ máy 20 năm.',
    'w4.g1': 1, 'w4.g2': 0, 'w4.g3': 1,
    'a42.guess': ['Đứng máy tiện, phay, CNC', 'Đọc bản vẽ', 'Làm theo ca'], 'a42.dl': { f: [5, 1, 7], r: [0, 3] }, 'a42.open': 1, 'a42.for': 'co-khi',
    'a42.wow': 'Người mới phải đo hàng bằng thước kẹp rất nhiều, chưa đứng máy ngay.',
    'a42.like': 'Làm ra chi tiết máy chính xác, nhìn thấy kết quả.',
    'a42.worry': 'Sợ đọc bản vẽ tiếng Nhật chưa hiểu.',
    'a42.day': 'Sáng 7 giờ 30, mình họp sáng với tổ, nhận bản vẽ rồi chỉnh máy CNC. Chiều mình đo kiểm hàng, ghi sổ. Tối mình học 20 phút tiếng Nhật rồi gọi về nhà.',
    'a44.path': 'iku', 'a44.open': 1,
    'a44.tl': { n5: '2026', n5_m: '12', pv: '2027', pv_m: '6', fly: '2027', fly_m: '12', n4: '2028', skill: '2030', n3: '2030', next: '2030', back: 'u', own: '2029' },
    'a44.ownt': 'Đậu tay nghề cấp 3 ngành cơ khí',
    'a44.next': 'Mốc gần nhất của mình là N5 vào cuối năm nay. Mỗi tối mình học 20 từ và Chủ nhật làm một đề.',
    'a43.r': { 0: 'r', 1: 'w', 2: 'u', 3: 'r', 4: 'r', 5: 'r', 6: 'w', 7: 'u' }, 'a43.top': '1',
    'a43.why': 'Mình vẫn muốn đi vì muốn có nghề cơ khí vững tay và sửa lại nhà cho ba mẹ.',
    'a51.c1': 2, 'a51.free': '1', 'a51.c2': 1, 'a51.vid': 1, 'a51.help': ['Tiếng Nhật đến N2', 'Dùng giờ rảnh để học', 'Tác phong làm việc kiểu Nhật'],
    'a51.bring': 'Ngoài tiền, mình muốn mang về tay nghề CNC vững, tiếng Nhật N3 và thói quen báo cáo đúng giờ.',
    'a51.open': 1, 'a51.who': 'Anh Hoàng Văn Thiệu, ngành cơ khí',
    'a51.turn': 'Anh làm 5 năm ở Toyama, về nước với N2 rồi lên Phó Giám đốc.',
    'a51.learn': 'Mình muốn học theo cách anh vừa đi làm vừa học tiếng Nhật đến N2.',
    'a53.ask': [1, 2, 0, 4], 'a53.best': '1',
    'a53.guide': 'Anh họ mình đang làm cơ khí ở Nhật năm thứ 2.',
    'a53.q1': 'Tháng đầu làm cơ khí ở Nhật, anh thấy khó nhất là gì?',
    'a53.q2': 'Em nên luyện thói quen nào từ bây giờ để sang đó đỡ bỡ ngỡ?',
    'w6.clear': 4,
    'a62.jp1': 'N4', 'a62.do1': ['Học từ vựng cơ khí, ký hiệu bản vẽ', 'Tập đọc thước cặp, panme', 'Ngủ trước 23 giờ'],
    'a62.jp2': 'N3', 'a62.work': ['Đậu Ginou Kentei cơ khí cấp 3', 'Đứng máy CNC, gia công chính xác', 'Lên Kỹ năng đặc định 1'],
    'a62.save': 120, 'a62.joy': ['Du lịch các tỉnh của Nhật', 'Kết bạn với người Nhật'],
    'a62.p1': 'Ở JPC, mình sẽ đạt N4 trước khi bay, học 20 từ chuyên ngành cơ khí mỗi tuần và ngủ trước 23 giờ.',
    'a62.p2': 'Ở Nhật, mình sẽ đậu Ginou Kentei cơ khí cấp 3, đứng máy CNC vững, lên N3 và để dành đều mỗi tháng.',
    'a63.gap': { 'Đọc bản vẽ, ký hiệu dung sai': 'n', 'Đo bằng thước cặp, panme': 'p', 'Tỉ mỉ, tự kiểm hàng': 'p', 'An toàn trong xưởng': 'h', 'Quen với: đứng máy cả ca, có tiếng ồn, bụi kim loại': 'n',
      'Tiếng Nhật đủ nghe hướng dẫn, báo cáo': 'p', 'Đúng giờ, giữ 5S chỗ ở, chỗ học': 'h', 'Sức khỏe để làm theo ca': 'h', 'Tự lo chi tiêu, sinh hoạt': 'n' },
    'a63.h1w': '4', 'a63.h1d': 'tra 3 ký hiệu bản vẽ', 'a63.h2w': '5', 'a63.h2d': 'ghi chi tiêu trong ngày',
    'a63.iv': 'Em chọn nghề này vì từ nhỏ em hay cùng chú sửa máy, em thích làm ra chi tiết chính xác. Ở JPC em đang học N4 và tập đọc bản vẽ mỗi tuần. Sang Nhật, em muốn đậu Ginou Kentei cấp 3 và lên N3. 5 năm sau, em muốn là thợ CNC vững tay, kèm được người mới và lo cho ba mẹ.',
    'a63.ivn': 2,
    'a71.s1': '1', 'a71.s2': '0', 'a71.prep': ['Tập câu “Mō ichido onegaishimasu” (Xin nói lại)', 'Hẹn với gia đình giờ gọi cố định mỗi tuần'],
    'a71.note': 'Chưa hiểu thì hỏi lại, không ai cười đâu. Nhớ gọi cho mẹ tối Chủ nhật.',
    'a72.z': { 'Tập câu “Mō ichido onegaishimasu” (Xin nói lại)': 'a', 'Hẹn với gia đình giờ gọi cố định mỗi tuần': 'a', 'Hỏi người dẫn đường 2 câu bạn soạn ở Ga 5': 'h',
      'Nói câu trả lời phỏng vấn 60 giây cho thầy cô nghe': 'h', 'Đọc 1 bản vẽ mẫu, giải thích cho bạn trong 2 phút': 'h', 'Đo 10 chi tiết bằng thước cặp, ghi kết quả': 'a',
      'Bắt chuyện tiếng Nhật 5 phút với thầy cô': 'q', 'Nhờ thầy cô góp ý thẳng 1 điểm yếu của mình': 'h' },
    'a72.sel': ['Nói câu trả lời phỏng vấn 60 giây cho thầy cô nghe'], 'a72.due': '14', 'a72.who': '1',
    'a72.if': 'Nếu ngại, mình sẽ tập nói trước gương 2 lần, rồi nhờ bạn cùng phòng nghe thử trước khi gặp cô.'
  }
};

/* ---------- Từ khóa của ga (bài học khi chạm chip từ khóa trên banner ga) ----------
   Nội dung giữ nguyên bản CD49 của thầy: chữ Nhật, phát âm, nghĩa, biểu tượng của ga (hình vẽ), câu ví dụ,
   Bài học Oden (2 ý), Hành động ngay, Shin gửi bạn (haiku). Ga 1–7 theo số ga; 8 = Ga Ước Mơ. ---------- */
var KW = {
  1: {"w": "未来", "r": "みらい", "ro": "mirai", "m": "Tương lai", "ex": ["五年後の自分を想像します。", "Gonen-go no jibun o sōzō shimasu.", "Tôi hình dung bản thân 5 năm sau."], "oden": [["Nghĩ xa để biết hôm nay cần làm gì", "Bạn thử hình dung 5 năm nữa: mình làm được nghề gì, sống ra sao, giúp được gì cho gia đình? Khi có một hình ảnh rõ hơn về tương lai thì việc học tiếng Nhật, học nghề hay những gì phải đánh đổi hôm nay cũng trở nên có ý nghĩa hơn."], ["Việc học cần sự tích lũy lâu dài", "Một ngày học chưa thấy mình giỏi ngay, nhưng mỗi điều hiểu thêm, mỗi việc làm thành thạo đều giúp bản thân tiến bộ hơn từng ngày."]], "act": ["Tối nay viết 1 mục tiêu 5 năm, dán ở bàn học.", "目標を書きます。", "mokuhyō o kakimasu", "Tôi viết mục tiêu."], "hk": ["種をまく", "五年後に咲く", "夢の花"], "hro": "tane o maku / go-nen go ni saku / yume no hana", "hvn": "Gieo hạt hôm nay / năm năm sau nở thành / đóa hoa ước mơ", "sym": {"t": "Cây sầu riêng", "d": "Trồng 5–7 năm mới gặt hái thành quả. Nghĩ dài hạn là đầu tư cho tương lai ngay từ việc làm hôm nay.", "svg": "<circle cx=\"32\" cy=\"40\" r=\"14\" fill=\"#9BCB5B\"/><path d=\"M32 26v-8\" stroke=\"#6B8E23\" stroke-width=\"3\" stroke-linecap=\"round\"/><g fill=\"#6B8E23\"><path d=\"M47.0 40.0 l5.0 0.0\" stroke=\"#6B8E23\" stroke-width=\"2.5\"/><path d=\"M42.6 50.6 l3.5 3.5\" stroke=\"#6B8E23\" stroke-width=\"2.5\"/><path d=\"M32.0 55.0 l0.0 5.0\" stroke=\"#6B8E23\" stroke-width=\"2.5\"/><path d=\"M21.4 50.6 l-3.5 3.5\" stroke=\"#6B8E23\" stroke-width=\"2.5\"/><path d=\"M17.0 40.0 l-5.0 0.0\" stroke=\"#6B8E23\" stroke-width=\"2.5\"/><path d=\"M21.4 29.4 l-3.5 -3.5\" stroke=\"#6B8E23\" stroke-width=\"2.5\"/><path d=\"M32.0 25.0 l-0.0 -5.0\" stroke=\"#6B8E23\" stroke-width=\"2.5\"/><path d=\"M42.6 29.4 l3.5 -3.5\" stroke=\"#6B8E23\" stroke-width=\"2.5\"/></g><path d=\"M24 12 Q32 6 40 12\" stroke=\"#16B97B\" stroke-width=\"3\" fill=\"none\"/>"}},
  2: {"w": "自分", "r": "じぶん", "ro": "jibun", "m": "Bản thân", "ex": ["自分の強みを知ります。", "Jibun no tsuyomi o shirimasu.", "Tôi biết thế mạnh của mình."], "oden": [["Bắt đầu từ điều mình thật sự muốn", "Thay vì chỉ nghĩ “đi Nhật”, bạn hãy hỏi: mình muốn học được gì, làm được gì và trở thành người như thế nào? Khi biết mình MUỐN gì, bạn sẽ có lý do để chủ động học, chủ động hỏi và theo đuổi điều đã chọn."], ["Hiểu mình hơn qua những việc đã làm", "Bạn thích việc gì, từng được tin giao việc gì, điều gì khiến bạn thấy mình có ích? Hãy tìm câu trả lời từ những TRẢI NGHIỆM của mình."]], "act": ["Hỏi 2 người thân: “Mình làm tốt việc gì nhất?”", "私の強みは何ですか。", "watashi no tsuyomi wa nan desu ka", "Thế mạnh của tôi là gì?"], "hk": ["好きなこと", "得意なことを", "胸に書く"], "hro": "suki na koto / tokui na koto o / mune ni kaku", "hvn": "Điều mình yêu thích / điều mình làm giỏi / khắc ghi trong lòng", "sym": {"t": "Hạt giống", "d": "Ai cũng mang hạt giống tiềm năng trong mình. Được tưới đúng cách, hạt sẽ nảy mầm, lên cây.", "svg": "<path d=\"M14 50 H50\" stroke=\"#A16207\" stroke-width=\"4\" stroke-linecap=\"round\"/><ellipse cx=\"32\" cy=\"46\" rx=\"7\" ry=\"5\" fill=\"#A16207\"/><path d=\"M32 42 V26\" stroke=\"#16B97B\" stroke-width=\"3\"/><path d=\"M32 30 Q22 28 20 18 Q30 18 32 28\" fill=\"#3DD39A\"/><path d=\"M32 26 Q42 22 44 12 Q34 12 32 24\" fill=\"#16B97B\"/>"}},
  3: {"w": "性格", "r": "せいかく", "ro": "seikaku", "m": "Tính cách", "ex": ["自分に合う仕事を選びます。", "Jibun ni au shigoto o erabimasu.", "Tôi chọn công việc hợp với mình."], "oden": [["Biết mình để tìm cách phát huy", "Bạn thích làm với máy móc, chăm sóc người khác hay sắp xếp công việc? Kết quả trắc nghiệm chỉ giúp bạn có thêm gợi ý để tìm hiểu nghề. Hãy đối chiếu với những việc mình đã làm và hỏi thêm những người bạn nghĩ họ hiểu bạn nhé."], ["Muốn theo nghề, cần thấy cả những điều cần rèn luyện", "Mỗi nghề đều cần thái độ, sức khỏe, kiến thức và kỹ năng phù hợp. Ngoài câu hỏi “Mình có hợp không?”, hãy hỏi thêm: “Để làm tốt nghề này, mình cần học gì và sửa thói quen nào?”. Hãy bắt đầu rèn từ hôm nay."]], "act": ["Kể với một người bạn về ga đích bạn vừa chọn.", "この仕事が好きです。", "kono shigoto ga suki desu", "Tôi thích công việc này."], "hk": ["川の水", "自分の道を", "流れゆく"], "hro": "kawa no mizu / jibun no michi o / nagare yuku", "hvn": "Nước dòng sông / chảy theo con đường / của riêng mình", "sym": {"t": "Dòng sông", "d": "Mỗi dòng sông có đường riêng ra biển. Hiểu tính cách để chọn con đường hợp với mình.", "svg": "<path d=\"M8 14 Q24 20 20 32 Q16 44 34 48 Q48 51 56 46\" stroke=\"#2F9BFF\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M8 14 Q24 20 20 32 Q16 44 34 48 Q48 51 56 46\" stroke=\"#BFE2FF\" stroke-width=\"2\" fill=\"none\" stroke-dasharray=\"3 5\"/>"}},
  4: {"w": "仕事", "r": "しごと", "ro": "shigoto", "m": "Công việc, nghề", "ex": ["この仕事について調べます。", "Kono shigoto ni tsuite shirabemasu.", "Tôi tìm hiểu về nghề này."], "oden": [["Tìm hiểu nghề bằng công việc thực tế", "Đừng dừng ở tên nghề hay hình ảnh đẹp về nghề. Hãy tìm hiểu một ngày người làm nghề ấy phải làm gì, dùng công cụ nào, cần cẩn thận ở đâu và mất bao lâu để thạo việc. Hiểu việc rồi, bạn mới có cơ sở để chọn và chuẩn bị."], ["Chọn nơi giúp mình phát triển nghề", "Khi tìm hiểu một công ty, hãy quan tâm không chỉ thu nhập mà còn điều kiện làm việc và cơ hội được hướng dẫn, học thêm cái mới. Sau vài năm, bạn muốn mình làm được những việc gì? Câu trả lời ấy sẽ giúp bạn nhìn rõ giá trị của chặng đường sắp đi."]], "act": ["Xem một video về một ngày làm việc của nghề bạn chọn.", "一日の仕事を見ます。", "ichinichi no shigoto o mimasu", "Tôi xem một ngày làm việc."], "hk": ["技一つ", "毎日みがく", "職人に"], "hro": "waza hitotsu / mainichi migaku / shokunin ni", "hvn": "Một tay nghề / mài giũa mỗi ngày / thành người thợ giỏi", "sym": {"t": "Người thợ shokunin", "d": "Người thợ Nhật mài một tay nghề cả đời. Nghề giỏi là nghề được mài mỗi ngày.", "svg": "<rect x=\"14\" y=\"40\" width=\"36\" height=\"8\" rx=\"2\" fill=\"#64748B\"/><path d=\"M22 40 L30 22 L36 22 L34 40Z\" fill=\"#94A3B8\"/><rect x=\"38\" y=\"12\" width=\"6\" height=\"22\" rx=\"2\" fill=\"#A16207\" transform=\"rotate(30 41 23)\"/><rect x=\"34\" y=\"8\" width=\"14\" height=\"8\" rx=\"2\" fill=\"#475569\" transform=\"rotate(30 41 12)\"/><circle cx=\"20\" cy=\"18\" r=\"2\" fill=\"#FFC93C\"/><circle cx=\"16\" cy=\"24\" r=\"1.5\" fill=\"#FFC93C\"/>"}},
  5: {"w": "先輩", "r": "せんぱい", "ro": "senpai", "m": "Người đi trước", "ex": ["先輩に質問してもいいですか。", "Senpai ni shitsumon shite mo ii desu ka.", "Em hỏi anh/chị một câu được không ạ?"], "oden": [["Chủ động tìm người để học hỏi", "Một anh chị đi trước, một thầy cô hay một người giỏi nghề có thể giúp bạn hiểu điều mình chưa từng trải qua. Hãy bắt đầu bằng một câu hỏi cụ thể: “Lúc mới vào nghề, anh chị gặp khó khăn gì và đã học cách làm như thế nào?”"], ["Học được điều hay, hãy thử làm theo", "Nghe một câu chuyện rồi thấy có động lực là bước đầu. Bạn hãy chọn một điều phù hợp để thực hiện ngay: ghi chép kỹ hơn, hỏi lại khi chưa hiểu hoặc học đều đặn mỗi tối."]], "act": ["Hỏi một senpai hoặc thầy cô một câu cụ thể về nghề.", "教えてください。", "oshiete kudasai", "Xin hãy chỉ cho em."], "hk": ["先輩の", "背中に学ぶ", "春の道"], "hro": "senpai no / senaka ni manabu / haru no michi", "hvn": "Học từ bóng lưng / của người đi trước / con đường mùa xuân", "sym": {"t": "Bông lúa chín", "d": "Lúa càng chín càng cúi đầu. Người giỏi luôn khiêm tốn học hỏi từ những người đi trước.", "svg": "<path d=\"M20 56 Q22 30 40 14\" stroke=\"#6B8E23\" stroke-width=\"3\" fill=\"none\"/><ellipse cx=\"30\" cy=\"24\" rx=\"3.4\" ry=\"2\" fill=\"#F5B700\" transform=\"rotate(40 30 24)\"/><ellipse cx=\"36\" cy=\"20\" rx=\"3.4\" ry=\"2\" fill=\"#E5A100\" transform=\"rotate(40 36 20)\"/><ellipse cx=\"32.4\" cy=\"28.2\" rx=\"3.4\" ry=\"2\" fill=\"#F5B700\" transform=\"rotate(40 32.4 28.2)\"/><ellipse cx=\"38.4\" cy=\"24.2\" rx=\"3.4\" ry=\"2\" fill=\"#E5A100\" transform=\"rotate(40 38.4 24.2)\"/><ellipse cx=\"34.8\" cy=\"32.4\" rx=\"3.4\" ry=\"2\" fill=\"#F5B700\" transform=\"rotate(40 34.8 32.4)\"/><ellipse cx=\"40.8\" cy=\"28.4\" rx=\"3.4\" ry=\"2\" fill=\"#E5A100\" transform=\"rotate(40 40.8 28.4)\"/><ellipse cx=\"37.2\" cy=\"36.6\" rx=\"3.4\" ry=\"2\" fill=\"#F5B700\" transform=\"rotate(40 37.2 36.6)\"/><ellipse cx=\"43.2\" cy=\"32.6\" rx=\"3.4\" ry=\"2\" fill=\"#E5A100\" transform=\"rotate(40 43.2 32.6)\"/><ellipse cx=\"39.6\" cy=\"40.8\" rx=\"3.4\" ry=\"2\" fill=\"#F5B700\" transform=\"rotate(40 39.6 40.8)\"/><ellipse cx=\"45.6\" cy=\"36.8\" rx=\"3.4\" ry=\"2\" fill=\"#E5A100\" transform=\"rotate(40 45.6 36.8)\"/><ellipse cx=\"42\" cy=\"45\" rx=\"3.4\" ry=\"2\" fill=\"#F5B700\" transform=\"rotate(40 42 45)\"/><ellipse cx=\"48\" cy=\"41\" rx=\"3.4\" ry=\"2\" fill=\"#E5A100\" transform=\"rotate(40 48 41)\"/>"}},
  6: {"w": "道のり", "r": "みちのり", "ro": "michinori", "m": "Chặng đường", "ex": ["毎日少しずつ進みます。", "Mainichi sukoshi zutsu susumimasu.", "Mỗi ngày tôi tiến lên một chút."], "oden": [["Lấy ngắn nuôi dài", "Chặng học tại JPC chuẩn bị cho giai đoạn làm việc ở Nhật; những năm tháng ở Nhật tiếp tục tạo nền tảng vững chắc cho hướng đi sau đó. Với mỗi chặng, bạn cần xác định mình cần tích lũy gì: tiếng Nhật, tay nghề, tiền vốn, kinh nghiệm hay những mối quan hệ tốt đẹp nhé."], ["Kế hoạch phải bắt đầu từ việc làm hôm nay", "Muốn sau này trở thành một người kỹ sư giỏi, quản lý hay kinh doanh riêng, bạn cần biết bước tiếp theo là gì. Hãy chọn một việc có thể bắt đầu ngay và có thời gian thực hiện."]], "act": ["Bắt đầu thói quen nhỏ bạn vừa tạo ngay tối nay.", "毎日続けます。", "mainichi tsuzukemasu", "Tôi sẽ duy trì mỗi ngày."], "hk": ["一歩ずつ", "レールをつなぐ", "夢の駅"], "hro": "ippo zutsu / rēru o tsunagu / yume no eki", "hvn": "Từng bước một / nối dài đường ray / tới ga ước mơ", "sym": {"t": "Thanh tà vẹt", "d": "Đường ray dài cả trăm cây số được ghép từ từng thanh tà vẹt nhỏ. Mỗi thói quen là một thanh tà vẹt như vậy.", "svg": "<path d=\"M10 22 H54 M10 42 H54\" stroke=\"#64748B\" stroke-width=\"3\"/><rect x=\"12\" y=\"16\" width=\"5\" height=\"32\" rx=\"1.5\" fill=\"#A16207\"/><rect x=\"21\" y=\"16\" width=\"5\" height=\"32\" rx=\"1.5\" fill=\"#A16207\"/><rect x=\"30\" y=\"16\" width=\"5\" height=\"32\" rx=\"1.5\" fill=\"#A16207\"/><rect x=\"39\" y=\"16\" width=\"5\" height=\"32\" rx=\"1.5\" fill=\"#A16207\"/><rect x=\"48\" y=\"16\" width=\"5\" height=\"32\" rx=\"1.5\" fill=\"#A16207\"/>"}},
  7: {"w": "挑戦", "r": "ちょうせん", "ro": "chōsen", "m": "Thử thách", "ex": ["失敗を恐れずに挑戦します。", "Shippai o osorezu ni chōsen shimasu.", "Tôi dám thử, không sợ thất bại."], "oden": [["Làm việc khó để hiểu mình hơn", "Lần đầu nói tiếng Nhật, xin góp ý hay nhận một việc chưa quen, bạn có thể thấy run. Nhưng cứ thử làm đi, rồi việc đó sẽ không quá đáng sợ, quá khó như bạn hình dung trước đó."], ["Vượt qua chính mình bằng một việc làm cụ thể.", "Nếu bạn hay ngại hỏi, hãy chuẩn bị một câu để hỏi. Nếu hay bỏ dở, hãy hoàn thành một việc nhỏ đã hứa. Mỗi lần như vậy, bạn lại tiến bộ hơn một tí."]], "act": ["Làm việc khó đầu tiên trước ngày đã hẹn.", "やってみます！", "yatte mimasu", "Tôi sẽ thử làm!"], "hk": ["向かい風", "翼をひろげ", "空高く"], "hro": "mukaikaze / tsubasa o hiroge / sora takaku", "hvn": "Gió ngược chiều / dang rộng đôi cánh / bay lên trời cao", "sym": {"t": "Cá hồi", "d": "Cá hồi bơi ngược dòng để trở về. Thử thách là dòng nước giúp bạn mạnh hơn.", "svg": "<path d=\"M8 48 Q20 40 32 48 Q44 56 56 48\" stroke=\"#2F9BFF\" stroke-width=\"3\" fill=\"none\"/><path d=\"M14 30 Q30 16 46 28 L54 22 L52 32 L56 40 L46 34 Q30 44 14 30Z\" fill=\"#F2784B\"/><circle cx=\"20\" cy=\"29\" r=\"1.8\" fill=\"#1E293B\"/><path d=\"M26 26 Q32 30 26 34\" stroke=\"#FFD1BC\" stroke-width=\"1.5\" fill=\"none\"/>"}},
  8: {"w": "夢", "r": "ゆめ", "ro": "yume", "m": "Ước mơ", "ex": ["夢に向かって進みます。", "Yume ni mukatte susumimasu.", "Tôi tiến về phía ước mơ."], "oden": [["Đi xa để trưởng thành và mang điều tốt đẹp trở về", "Hình ảnh cá hồi gợi nhắc một hành trình có hướng đi và ý nghĩa trở về. Những điều học được ở Nhật sẽ giúp bạn xây dựng cuộc sống, chăm lo gia đình và đóng góp cho quê hương như thế nào?"], ["Bản thiết kế nghề nghiệp này chỉ là điểm khởi đầu", "Có 1 định hướng đầu tiên là rất quan trọng, như hải đăng ấy soi đường cho mình đi. Trong hành trình ấy, sẽ có những điều bất ngờ và thay đổi làm bạn muốn điều chỉnh hướng đi, không sao cả vì khi đó bạn đã hiểu bản thân hơn rồi, biết điều gì là hợp với mình. Chúc bạn thành công."]], "act": ["Đọc lại lời cam kết mỗi sáng thứ Hai.", "がんばります！", "ganbarimasu", "Tôi sẽ cố gắng!"], "hk": ["朝日さす", "旅のはじまり", "ここからだ"], "hro": "asahi sasu / tabi no hajimari / koko kara da", "hvn": "Nắng mai chiếu rọi / hành trình bắt đầu / từ chính nơi này", "sym": {"t": "Mặt trời mọc", "d": "Nhật Bản được mệnh danh là đất nước mặt trời mọc. Về đích hôm nay là bình minh của một hành trình mới.", "svg": "<path d=\"M8 44 H56\" stroke=\"#E5602F\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M16 44 A16 16 0 0 1 48 44Z\" fill=\"#FFC93C\"/><path d=\"M14.7 34.0 L8.6 30.5\" stroke=\"#F5A300\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M22.0 26.7 L18.5 20.6\" stroke=\"#F5A300\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M32.0 24.0 L32.0 17.0\" stroke=\"#F5A300\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M42.0 26.7 L45.5 20.6\" stroke=\"#F5A300\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M49.3 34.0 L55.4 30.5\" stroke=\"#F5A300\" stroke-width=\"3\" stroke-linecap=\"round\"/>"}}
};

/* ---------- Màn hình tàu vào ga (lần đầu vào mỗi ga) ----------
   Chỉ 1 câu, lấy từ CD49 (ARRIVE). Lời Shin mở ga (st.intro) hiện sẵn ở trang ga lần đầu. Ga 8: câu mới, chờ thầy duyệt. ---------- */
var ARRIVE = {
 "1": "Ga Nhìn Xa là nơi bạn tập hình dung “tôi của 5 năm sau”, vì những việc nhỏ hôm nay đang vẽ nên con người tương lai ấy của bạn.",
 "2": "Ga Biết Mình giúp bạn suy nghĩ về những câu hỏi có tính cá nhân của riêng mỗi người: Bạn thích gì, giỏi làm gì và điều gì quan trọng với bạn?",
 "3": "Ga Tính Cách là nơi bạn khám phá thiên hướng tính cách của mình để thử chọn “Ga đích” (nghề muốn làm) cho chuyến tàu.",
 "4": "Ở Ga Ngành Nghề bạn sẽ tìm hiểu về nghề mình chọn bằng thông tin thật, không phải “nghe đồn” đâu đấy!",
 "5": "Ga Chuyện Trò là nơi bạn học từ những Senpai đi trước và tập cách đặt những câu hỏi có ý nghĩa.",
 "6": "Ga Định Hướng cần bạn suy nghĩ nghiêm túc, vì đây là lúc phải “tự lắp” con đường 3 chặng của chính mình.",
 "7": "Ga Thử Thách giúp bạn chuẩn bị cho những lúc điều không đúng ý mình xảy ra và chủ động bước ra khỏi vùng an toàn của mình.",
 "8": "Ga Ước Mơ là nơi bạn nhìn lại cả hành trình và hứa với chính mình."
};
