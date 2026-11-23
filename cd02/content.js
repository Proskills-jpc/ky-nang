/* CD02 · Career Design 2 · Hải Đồ La Bàn · cd02/content.js · CHỮ VÀ NỘI DUNG (sửa chữ ở đây).
   Câu chuyện: Shin (gà lớn, đã xong 3 năm ở Nhật) làm thuyền trưởng dẫn đường ở CẢNG 3 NĂM.
   Học viên nhận một con thuyền nhỏ và hải đồ phủ sương mù: sương = các hướng đi chưa biết.
   Ghé bến, gặp Senpai, sương tan, đảo hiện ra. Không tuyến tính: bến trong cùng một vòng đi thứ tự nào cũng được.
   Nguyên tắc (thầy chốt 16–18/11/2026):
   - CD là Design, KHÔNG chấm đúng/sai. Mọi lựa chọn đều có thật, có cái được, cái mất. Luôn có “Chưa chắc” hoặc ô viết riêng.
   - Chữ cho điện thoại: câu ngắn, một ý một câu, không giảng giải dài.
   - Không dùng chữ “hải tặc”, không cờ đầu lâu, không lệnh truy nã. Thế giới, tàu, bản đồ là của khóa (không mượn hình truyện nào).
   - Biển và đảo hư cấu, không phải bản đồ thật.
   - Senpai: người thật, chuyện đã đăng công khai trên Tikme / esuhai.vn, JLPT N3 trở lên (2 người chưa ghi JLPT: anh Hợi, chị Kim Thanh, đã xong 3 năm).
     Câu trong ngoặc kép là nguyên văn trong bài đăng. Ba khung Khởi đầu · Bước ngoặt · Hôm nay là khóa học tóm lại, có link bài gốc.
     Không kể chi tiết chuyện buồn riêng tư của người thật.
   - Ý của thầy Lê Long Sơn nói gián tiếp: “thầy của Shin”. Không ghi tên Thầy trên giao diện CD02.
   - Không dùng từ “đơn hàng”. ES5. */
var CD2_ID = 'cd02';
var CD2_VER = 'CD02.3.13';
var CD2_XP_ACT = 30, CD2_INS_WORDS = 15, CD2_INS_FIELD = 5, CD2_XP_CARD = 2;
var CD2_TOTAL = 20; /* PS1.3.50 (bản 4 đợt 2): thêm b53 Đứng giữa ngã rẽ, b73 Học từ chính mình → 20 chặng. */ var CD2_TOTAL_OLD = 18; /* PS1.3.42 (bản 2, PA A): Xuất phát 1 + 7 bến (2·3·3·2·2·3·2 chặng) = 18. Cảng Khởi Hành (f1, f2) không tính. */

/* ---------- 8 ĐẢO = 8 HƯỚNG ĐI SAU 3 NĂM ----------
   side: 'jp' ở Nhật · 'vn' về Việt Nam · 'both' cả hai. x, y: vị trí trên hải đồ (hệ 360 × 460). */
var ISLES = [
  { id: 'len', n: 'Ở lại, lên bậc nghề', ic: 'stairs', side: 'jp', x: 298, y: 118,
    sub: 'Ở lại Nhật, lên nấc mới trong nghề',
    what: 'Ở lại công ty hoặc cùng nghề. Thi lên diện Kỹ năng đặc định để làm lâu hơn, nhận việc khó hơn, kèm người mới.',
    need: ['Tay nghề vững, được công ty tin', 'Tiếng Nhật đủ dùng trong công việc', 'Đậu kỳ thi tay nghề và tiếng Nhật của diện mới'],
    gain: 'Vị trí, thu nhập tăng dần. Có diện cho làm lâu dài và đưa gia đình sang (theo điều kiện từng diện).',
    cost: 'Xa quê lâu hơn. Phải tự học, tự thi liên tục.',
    who: ['sy', 'taih', 'ngat'] },
  { id: 're', n: 'Rẽ nghề khác', ic: 'turn', side: 'jp', x: 298, y: 338,
    sub: 'Ở lại Nhật, rẽ sang việc khác',
    what: 'Thi chứng chỉ ngành khác, hoặc nhờ tiếng Nhật tốt mà chuyển sang việc văn phòng, thông dịch.',
    need: ['Tiếng Nhật cao hơn mức dùng ở xưởng', 'Học và thi chứng chỉ của ngành mới', 'Tìm hiểu kỹ ngành mới trước khi chọn'],
    gain: 'Thử một nghề hợp mình hơn mà vẫn ở Nhật.',
    cost: 'Bắt đầu lại ở chỗ mới. Giai đoạn đầu vất vả.',
    who: ['linh', 'long', 'ploan'] },
  { id: 'hoc', n: 'Học tiếp', ic: 'cap', side: 'both', x: 180, y: 88,
    sub: 'Học lên: du học, liên thông, học nghề mới',
    what: 'Dùng tiếng Nhật và tiền tích lũy để học lên, rồi đi tiếp bằng con đường mới.',
    need: ['Tiếng Nhật N2 trở lên nếu học ở Nhật', 'Kế hoạch tiền học và chi tiêu', 'Biết rõ mình học để làm gì'],
    gain: 'Bằng cấp, nghề mới, mở thêm nhiều cửa.',
    cost: 'Mất thời gian. Thu nhập giảm trong lúc học.',
    who: ['tait', 'tan'] },
  { id: 'gio', n: 'Về rồi lại sang Nhật', ic: 'cycle', side: 'both', x: 180, y: 318,
    sub: 'Đi rồi về, rồi lại đi',
    what: 'Về nước một thời gian, rồi quay lại Nhật bằng diện khác, công việc khác.',
    need: ['Hồ sơ đẹp, giữ chữ tín với công ty', 'Tiếp tục học tiếng Nhật khi ở nhà', 'Tìm hiểu kỹ điều kiện của diện mới'],
    gain: 'Thử cả hai nơi. Mỗi lần đi lên thêm một nấc.',
    cost: 'Nhiều lần chia xa. Giấy tờ mỗi lần một khác.',
    who: ['dung', 'hoa'] },
  { id: 'chu', n: 'Làm nghề tiếng Nhật', ic: 'speech', side: 'both', x: 180, y: 408,
    sub: 'Đổi nghề nhờ tiếng Nhật',
    what: 'Tiếng Nhật thành nghề chính: giáo viên, phiên dịch, kỹ sư cầu nối, nhân sự.',
    need: ['Tiếng Nhật N2 đến N1', 'Học thêm kỹ năng của nghề mới (dạy học, lập trình…)', 'Kiên trì thi nhiều lần'],
    gain: 'Một nghề dùng chính tiếng Nhật. Giúp được nhiều người.',
    cost: 'Phải học rất bền. Thu nhập lúc đầu có thể chưa cao.',
    who: ['mai', 'xuan', 'son', 'quy', 'lich'] },
  { id: 'lap', n: 'Về làm chủ', ic: 'shop', side: 'vn', x: 62, y: 250,
    sub: 'Về Việt Nam tự làm chủ',
    what: 'Mang tay nghề, cách làm việc kiểu Nhật về mở cửa hàng, xưởng, công ty riêng.',
    need: ['Tay nghề và quy trình học được ở Nhật', 'Vốn tích lũy và kế hoạch rõ ràng', 'Mối quan hệ, khách hàng đầu tiên'],
    gain: 'Tự quyết. Tạo việc làm cho người khác.',
    cost: 'Rủi ro cao. Có lúc thất bại phải làm lại.',
    who: ['hoi', 'thao', 'vinh', 'ngoc3'] },
  { id: 'cau', n: 'Về làm công ty Nhật', ic: 'bridge', side: 'vn', x: 62, y: 404,
    sub: 'Về Việt Nam làm cho công ty Nhật',
    what: 'Làm ở công ty Nhật tại Việt Nam, hoặc chi nhánh của chính công ty mình từng làm.',
    need: ['Tiếng Nhật N2 là lợi thế lớn', 'Hiểu cách làm việc kiểu Nhật', 'Giữ liên lạc tốt với công ty cũ'],
    gain: 'Vị trí tốt, có thể lên quản lý. Gần gia đình.',
    cost: 'Thu nhập lúc đầu có thể thấp hơn ở Nhật. Phải học thêm cách quản lý.',
    who: ['thuy', 'hoai', 'hien', 'hang', 'kthanh'] },
  { id: 'que', n: 'Về gần gia đình', ic: 'home', side: 'vn', x: 62, y: 92,
    sub: 'Gia đình là ưu tiên',
    what: 'Chọn việc, chọn nơi sống theo điều gia đình cần nhất, ngay bây giờ hoặc sau vài năm.',
    need: ['Kế hoạch tiết kiệm rõ ràng', 'Một nghề, một kỹ năng mang về dùng được', 'Tìm hiểu việc gần nhà trước khi về'],
    gain: 'Gần người thân. Góp sức cho gia đình, cho quê.',
    cost: 'Ít cơ hội hơn thành phố lớn. Phải tự tạo cơ hội.',
    who: ['huan', 'hung'] }
];
/* PS1.3.42 · “Các bước thường gặp” trên mỗi đảo (Lộ trình thật). Chỉ là đường hay gặp, không phải điều kiện pháp lý đầy đủ.
   Điều kiện thay đổi theo ngành và theo thời gian: luôn dẫn về trang chính thức. Đối chiếu: trang Kỹ năng đặc định và visa Kỹ thuật – Nhân văn – Quốc tế
   của Cục Quản lý xuất nhập cảnh Nhật Bản (ISA), tra ngày 20/11/2026. */
var ISA_SSW = ['Trang Kỹ năng đặc định (Cục Xuất nhập cảnh Nhật Bản)', 'https://www.moj.go.jp/isa/applications/ssw/index.html'];
var ISA_GJK = ['Trang visa Kỹ thuật – Nhân văn – Quốc tế (Cục Xuất nhập cảnh Nhật Bản)', 'https://www.moj.go.jp/isa/applications/status/gijinkoku.html'];
var IKUSEI = { t: 'Từ 1/4/2027 có diện mới “Việc làm để phát triển kỹ năng” (Ikusei Shuro): làm và học 3 năm để lên Kỹ năng đặc định 1. Bạn đi diện nào, đường lên bậc nghề vẫn mở.',
  src: ['Báo Nhân Dân, theo Cục Quản lý lao động ngoài nước', 'https://nhandan.vn/ocop/thong-tin-ve-viec-chuyen-tiep-cua-chuong-trinh-thuc-tap-sinh-tai-nhat-ban-post936159.html'] };
var ISLE_PATH = {
  len: { L: [['Thực tập sinh 3 năm', 'Làm tốt, giữ chữ tín, lên N3.'], ['Kỹ năng đặc định 1, cùng ngành', 'Xong tốt thực tập sinh số 2 cùng nghề thường được miễn thi. Ở tối đa 5 năm.'],
    ['Kỹ năng đặc định 2', 'Đậu kỳ thi bậc 2, có kinh nghiệm làm tổ trưởng (tùy ngành). Gia hạn không giới hạn số lần, được đưa vợ hoặc chồng, con sang.']], src: [ISA_SSW], ik: 1 },
  re: { L: [['Thực tập sinh 3 năm', 'Lên N3, N2 trong lúc làm.'], ['Kỹ năng đặc định 1, ngành khác', 'Thi tay nghề của ngành mới và thi tiếng Nhật.'],
    ['Hoặc visa Kỹ thuật – Nhân văn – Quốc tế', 'Làm thông dịch, văn phòng, kỹ sư. Thường cần bằng cao đẳng, đại học hợp với việc.']], src: [ISA_SSW, ISA_GJK], ik: 1 },
  hoc: { L: [['Trong 3 năm', 'Lên N2, để dành tiền học.'], ['Học tiếp', 'Học trường nghề, đại học ở Nhật. Hoặc về Việt Nam học liên thông.'],
    ['Đi làm bằng nghề mới', 'Ở Nhật, việc hợp ngành học thì xin visa Kỹ thuật – Nhân văn – Quốc tế.']], src: [ISA_GJK] },
  gio: { L: [['Về nước, giữ liên lạc', 'Giữ chữ tín với công ty cũ, hồ sơ đẹp.'], ['Ở nhà học thêm', 'Tiếng Nhật, chứng chỉ, kỹ năng mới.'],
    ['Quay lại Nhật bằng diện khác', 'Kỹ năng đặc định, hoặc visa Kỹ sư nếu có bằng phù hợp.']], src: [ISA_SSW] },
  chu: { L: [['Trong 3 năm', 'Lên N2, tập dùng tiếng Nhật mỗi ngày.'], ['Học thêm nghề mới', 'Dạy học, phiên dịch, lập trình…'],
    ['Đi làm bằng tiếng Nhật', 'Ở Việt Nam, hoặc ở Nhật với visa Kỹ thuật – Nhân văn – Quốc tế (thường cần bằng cấp).']], src: [ISA_GJK] },
  lap: { L: [['Ở Nhật', 'Học quy trình, cách tính chi phí. Để dành đều.'], ['Về nước, làm thuê một thời gian', 'Hiểu khách ở Việt Nam cần gì.'],
    ['Bắt đầu nhỏ', 'Có khách đầu tiên, giữ tiền dự phòng.'], ['Mở rộng dần', 'Khách quen giới thiệu khách mới.']], src: [] },
  cau: { L: [['Năm 2', 'Nói mong muốn với công ty, lên N2.'], ['Trước khi về', 'Xin cấp trên giới thiệu, ghi lại việc mình làm giỏi.'],
    ['Về Việt Nam', 'Vào chi nhánh của chính công ty mình, hoặc một công ty Nhật khác.'], ['Lên trưởng nhóm, quản lý', 'Học thêm cách quản lý.']], src: [] },
  que: { L: [['Từ năm 1', 'Nói rõ kế hoạch với gia đình.'], ['Trong 3 năm', 'Để dành, học một nghề mang về dùng được.'],
    ['Về gần nhà', 'Tìm việc dùng tay nghề, tiếng Nhật ở quê.']], src: [] }
};
/* nghề (mã giống CD01 · INDS) dùng khi học viên chưa học CD01 */
var INDS2 = [['co-khi', 'Cơ khí'], ['dien-tu', 'Điện tử'], ['han', 'Hàn'], ['son', 'Sơn'], ['duc-nhua', 'Đúc nhựa'], ['dong-goi-cong-nghiep', 'Đóng gói công nghiệp'],
  ['in-an', 'In ấn'], ['may-mac', 'May mặc'], ['xay-dung', 'Xây dựng'], ['o-to', 'Ô tô'], ['nong-nghiep', 'Nông nghiệp'], ['thuy-san', 'Thủy sản'],
  ['thuc-pham', 'Thực phẩm'], ['dieu-duong', 'Kaigo · Chăm sóc'], ['nha-hang', 'Nhà hàng · Khách sạn'], ['ve-sinh-toa-nha', 'Vệ sinh tòa nhà'], ['ky-su', 'Kỹ sư công nghệ']];
var ISLE_SIDE ={ jp: 'Ở Nhật', vn: 'Về Việt Nam', both: 'Cả hai nơi' };

/* ---------- THẺ SENPAI (người thật, chuyện đã công khai) ----------
   ind: mã ngành như CD01 (INDS) để lọc “cùng nghề”. q: câu nguyên văn trong bài (để trống nếu không trích).
   f: điểm chung (CD2_F) khóa học thấy trong bài, dùng ở Bến Senpai. */
var TIK = 'https://tikme.com/cau-chuyen-thanh-cong/';
var ESU = 'https://esuhai.vn/news/';
var SENPAI = [
  { id: 'sy', n: 'Thân Quốc Sỹ', a: 'Anh Sỹ', jl: 'N2', job: 'Đóng gói công nghiệp', ind: 'dong-goi-cong-nghiep', from: 'Đồng Nai', jp: 'Gifu', isl: 'len',
    tag: 'Thực tập sinh → Kỹ năng đặc định 1 → Kỹ năng đặc định 2, 8 năm một công ty',
    kd: 'Năm 2017, anh sang Gifu làm đóng gói. Ngày đầu lạc lõng, anh quan sát và học từ đồng nghiệp.',
    bn: 'Anh đạt N2. Hết 3 năm đúng dịp dịch bệnh, công ty giúp anh thi lên Kỹ năng đặc định 1.',
    nay: 'Anh lên Kỹ năng đặc định 2, 8 năm gắn bó một công ty.',
    q: 'Khi công ty thấy bạn thật sự cố gắng và chủ động phát triển bản thân, họ sẽ sẵn sàng tạo điều kiện để bạn tiến xa hơn.',
    url: TIK + 'than-quoc-sy', src: 'Tikme', f: ['jp', 'rel'] },
  { id: 'taih', n: 'Nguyễn Hữu Tài', a: 'Anh Hữu Tài', jl: 'N1', job: 'Hàn (đóng tàu)', ind: 'han', from: 'Vĩnh Long', jp: 'Hiroshima', isl: 'len',
    tag: 'Thợ hàn đóng tàu → Kỹ năng đặc định 2',
    kd: 'Học ở Esuhai từ 4/2018, anh sang Nhật làm hàn bán tự động trong ngành đóng tàu.',
    bn: 'Anh vừa làm vừa học tiếng Nhật đến N1, luyện tay nghề để thi lên diện cao hơn.',
    nay: 'Tháng 10/2023 anh đậu Kỹ năng đặc định 2 ngành Đóng tàu, một trong 3 người nước ngoài đầu tiên đậu (theo bài viết).',
    q: 'Nhật Bản mang đến một cơ hội, Esuhai chính là một bệ phóng. Phần còn lại là sự cố gắng không ngừng của chính bản thân để biến cơ hội thành thành công.',
    url: TIK + 'nguyen-huu-tai', src: 'Tikme', f: ['jp'] },
  { id: 'ngat', n: 'Dương Thị Hồng Ngát', a: 'Chị Ngát', jl: 'N2', job: 'Thực phẩm', ind: 'thuc-pham', from: 'TP.HCM', jp: 'Nhật Bản', isl: 'len',
    tag: 'Sản xuất mì → được mời lên làm văn phòng',
    kd: 'Khi còn học Đại học Công nghiệp Thực phẩm, chị biết Esuhai và chọn sang Nhật làm việc, học tập.',
    bn: 'Chị làm ở công ty sản xuất mì. Nhóm 13 bạn cùng đi giúp nhau, chị đạt N2.',
    nay: 'Gần hết hạn, công ty mời chị ở lại, chuyển lên làm văn phòng.',
    q: 'Kinh nghiệm của mình là hãy cố gắng tiếp xúc với người Nhật càng nhiều càng tốt, khi đó chúng ta sẽ thấy những cuộc nói chuyện có rất nhiều niềm vui, những điều thú vị chứ không phải là một cái gì đó áp lực.',
    url: ESU + '3EEF6/nghe-podcast-duong-thi-hong-ngat-minh-duoc-quay-lai-nhat-ban-o-vi-tri-cong-viec-cao-hon.html', src: 'Esuhai', f: ['jp', 'rel'] },
  { id: 'linh', n: 'Nguyễn Thị Thùy Linh', a: 'Chị Linh', jl: 'N1', job: 'Thủy sản', ind: 'thuy-san', from: 'TP.HCM', jp: 'Hokkaido', isl: 're',
    tag: 'Thực tập sinh chế biến thủy sản → thông dịch viên ở nghiệp đoàn',
    kd: 'Thời đại học chị chỉ học thử tiếng Nhật. Năm 2017, chị sang Hokkaido làm chế biến thủy sản.',
    bn: 'Nhiều người không tin chị làm nổi. Chị dốc sức, đạt N1 sau gần 4 năm.',
    nay: 'Chị được nghiệp đoàn nhận làm thông dịch viên và quản lý thực tập sinh tại Nhật.',
    q: '…dù người ta không tin vào mình thì mình cũng phải dốc toàn lực, khi ấy mình sẽ được đền đáp xứng đáng.',
    url: ESU + '3EDB6/nghe-podcast-nguyen-thi-thuy-linh-minh-may-man-dat-n1-va-duoc-nghiep-doan-nhan-vao-lam-tai-nhat.html', src: 'Esuhai', f: ['jp', 'learn', 'change'] },
  { id: 'long', n: 'Vũ Hoàng Long', a: 'Anh Long', jl: 'N1', job: 'Đóng gói công nghiệp', ind: 'dong-goi-cong-nghiep', from: 'Đồng Nai', jp: 'Shizuoka', isl: 're',
    tag: 'Bộ đội → thực tập sinh đóng gói → N1 + chứng chỉ Kaigo',
    kd: 'Tốt nghiệp cao đẳng, anh nhập ngũ 2 năm để rèn ý chí, rồi tìm đến Esuhai vì thích Nhật Bản.',
    bn: 'Ở Shizuoka, anh tự học mỗi ngày sau giờ làm, lần lượt đậu N4, N3, N2.',
    nay: 'Xong 3 năm (2/2026), anh có N1 và chứng chỉ Kỹ năng đặc định ngành Kaigo, mở cả hai đường: về Việt Nam hoặc quay lại Nhật.',
    q: 'Nền tảng và phương pháp học từ Esuhai là bước đệm quan trọng. Nhưng để đạt được thành công cần có sự kiên trì, kỷ luật và tinh thần tự học mỗi ngày.',
    url: TIK + 'vu-hoang-long', src: 'Tikme', f: ['jp', 'learn', 'change'] },
  { id: 'ploan', n: 'Vũ Ngọc Phương Loan', a: 'Chị Phương Loan', jl: 'N2', job: 'Thực phẩm', ind: 'thuc-pham', from: '', jp: 'Tochigi', isl: 're',
    tag: 'Chọn 5 năm, rồi chuyển sang ngành Nhà hàng',
    kd: 'Được một chị Senpai giới thiệu, chị chọn Esuhai và sang Tochigi làm chế biến thực phẩm cho siêu thị.',
    bn: 'Tiếng Nhật đời sống khác sách vở, chị vẫn học đến N2 và chọn ở 5 năm.',
    nay: 'Chị đang chuyển sang Kỹ năng đặc định ngành Nhà hàng để tiếp tục phát triển ở Nhật.',
    q: 'Việc định cư ở Nhật sẽ là tùy duyên, nhưng trước mắt mình muốn sẽ tiếp tục ở Nhật để phát triển.',
    url: ESU + '3EDE1/nghe-podcast-vu-ngoc-phuong-loan-minh-chon-5-nam-thay-vi-3-nam.html', src: 'Esuhai', f: ['jp', 'change'] },
  { id: 'tait', n: 'Nguyễn Tấn Tài', a: 'Anh Tấn Tài', jl: 'N1', job: 'Sơn', ind: 'son', from: 'Vĩnh Long', jp: 'Kagawa', isl: 'hoc',
    tag: 'Đi Nhật để giỏi tiếng → N1 → dự định du học',
    kd: 'Học Du lịch, đi làm thấy không đúng đam mê, anh thuyết phục gia đình cho sang Nhật.',
    bn: 'Biết việc ở Nhật là việc tay chân, anh dùng 3 năm để học tiếng thật giỏi và đậu N1.',
    nay: 'Anh dự định đi du học, và ấp ủ cùng bạn bè mở trung tâm tư vấn du học.',
    q: 'Khi sống và làm việc tại một đất nước mới, việc giỏi ngôn ngữ là điều bắt buộc nếu muốn tiến xa hơn.',
    url: TIK + 'nguyen-tan-tai', src: 'Tikme', f: ['jp', 'learn', 'goal', 'change'] },
  { id: 'tan', n: 'Trần Tư Tân', a: 'Anh Tân', jl: 'N2', job: 'Thủy sản', ind: 'thuy-san', from: 'Đồng Nai', jp: 'Nhật Bản', isl: 'hoc',
    tag: 'Thực tập sinh thủy sản → liên thông đại học → quay lại Nhật ngành Nhà hàng',
    kd: 'Anh từng làm thực tập sinh thủy sản 3 năm ở Nhật và muốn quay lại để phát triển lâu dài.',
    bn: 'Về nước, anh học liên thông đại học tại Trường Đại học Lạc Hồng.',
    nay: 'Anh trúng tuyển chương trình Nhân sự cao cấp ngành Nhà hàng – Khách sạn để quay lại Nhật.',
    q: 'Nỗi sợ lớn nhất không phải là bắt đầu lại, mà là để cuộc đời trôi vô định. Đừng chờ cơ hội gõ cửa, hãy tự mở cánh cửa tương lai.',
    url: TIK + 'tran-tu-tan', src: 'Tikme', f: ['jp', 'change'] },
  { id: 'dung', n: 'Kim Hoàng Dũng', a: 'Anh Dũng', jl: 'N2', job: 'Hàn', ind: 'han', from: 'Đồng Tháp', jp: 'Osaka', isl: 'gio',
    tag: 'Pha chế → thợ hàn ở Osaka → về rồi định quay lại',
    kd: 'Học xong lớp 12, anh làm pha chế mà chưa có mục tiêu. Được gia đình ủng hộ, anh đi Nhật.',
    bn: 'Anh làm hàn 3 năm ở Osaka. Anh thi N2 bốn lần mới đậu.',
    nay: 'Về nước, anh dự định quay lại Nhật thêm 3–4 năm để tích lũy, rồi học về tài chính, đầu tư.',
    q: '',
    url: TIK + 'kim-hoang-dung', src: 'Tikme', f: ['jp', 'retry', 'fam'] },
  { id: 'hoa', n: 'Hồ Vĩnh Hòa', a: 'Anh Hòa', jl: 'N3', job: 'Xây dựng', ind: 'xay-dung', from: '', jp: 'Nhật Bản', isl: 'gio',
    tag: 'Xây dựng → về nước → định quay lại làm chăm sóc',
    kd: 'Năm 2019 anh sang Nhật làm xây dựng. Lúc đầu anh còn e dè khi nói chuyện với người Nhật.',
    bn: 'Anh học sau giờ làm, học cả từ bảng thông tin ở ga tàu, và đạt N3.',
    nay: 'Về nước tháng 7/2022, anh định quay lại Nhật lần nữa, làm công việc chăm sóc.',
    q: 'Chỉ cần cố gắng giao tiếp hoặc bắt chuyện cùng người Nhật tại công ty, bạn sẽ cải thiện được phát âm của mình.',
    url: ESU + '3EDB7/my-way--con-duong-toi-chon-ho-vinh-hoa-hoc-tieng-nhat-tu-viec-quan-sat-thong-tin-tren-ga-tau-dien.html', src: 'Esuhai', f: ['learn', 'change'] },
  { id: 'mai', n: 'Đào Thị Mai', a: 'Chị Mai', jl: 'N1', job: 'Điện tử', ind: 'dien-tu', from: 'Quảng Ngãi', jp: 'Osaka', isl: 'chu',
    tag: 'Thực tập sinh điện tử → N1 → giáo viên tiếng Nhật',
    kd: 'Chị từng sống không mục tiêu. Đến Esuhai, được thầy cô động viên, chị bắt đầu lại.',
    bn: 'Ở Nhật, chị ôn tiếng Nhật 2 giờ mỗi sáng trước khi đi làm.',
    nay: 'Về nước với N1, chị dạy tiếng Nhật tại Esuhai.',
    q: 'Cho dù thất bại cũng được, sai cũng được, nhưng bạn đừng bỏ cuộc, hãy học tập tích cực.',
    url: TIK + 'dao-thi-mai', src: 'Tikme', f: ['jp', 'learn'] },
  { id: 'xuan', n: 'Bùi Thị Hoa Xuân', a: 'Chị Xuân', jl: 'N1', job: 'Thủy sản', ind: 'thuy-san', from: 'TP.HCM', jp: 'Hokkaido', isl: 'chu',
    tag: 'Thực tập sinh thủy sản Hokkaido → giáo viên tiếng Nhật',
    kd: 'Lúc đầu chị chưa rõ sang Nhật để làm gì. Học ở Esuhai hơn 10 tháng, chị yêu tiếng Nhật hơn.',
    bn: 'Ở Hokkaido, đồng nghiệp chăm sóc chị như người nhà. Chị đạt N1.',
    nay: 'Về nước tháng 2/2022, chị quay lại Esuhai làm giáo viên tiếng Nhật.',
    q: 'Nếu có cơ hội được chọn lại, mình vẫn chọn vùng đất Hokkaido - tuy lạnh nhưng ấm áp tình người ấy!',
    url: TIK + 'bui-thi-hoa-xuan', src: 'Tikme', f: ['jp', 'rel'] },
  { id: 'son', n: 'Nguyễn Thị Son', a: 'Chị Son', jl: 'N1', job: 'Thực phẩm', ind: 'thuc-pham', from: 'Vĩnh Long', jp: 'Ehime', isl: 'chu',
    tag: 'Đi Nhật để giúp gia đình → giáo viên',
    kd: 'Tốt nghiệp đại học, chị đổi nhiều việc mà thu nhập vẫn bấp bênh. Chị sang Nhật để phụ giúp gia đình.',
    bn: 'Ở Ehime, chị vừa làm vừa học đến N1.',
    nay: 'Từ người đi Nhật để kiếm tiền, chị trở thành giáo viên, truyền cảm hứng cho các bạn trẻ.',
    q: 'Khó khăn không phải là điểm dừng, mà là cơ hội để mỗi người khám phá sức mạnh của chính mình.',
    url: TIK + 'nguyen-thi-son', src: 'Tikme', f: ['jp', 'fam', 'change'] },
  { id: 'quy', n: 'Võ Trọng Quý', a: 'Anh Quý', jl: 'N1', job: 'In ấn', ind: 'in-an', from: 'Vĩnh Long', jp: 'Kagawa', isl: 'chu',
    tag: 'Thực tập sinh in ấn → N1 → dạy tiếng Nhật online',
    kd: 'Học xong cấp 3, anh mê tiếng Nhật và đăng ký thực tập sinh ngành In ấn.',
    bn: 'Ở Kagawa, anh học bền bỉ và đậu N1.',
    nay: 'Về nước năm 2022, anh dạy tiếng Nhật online.',
    q: 'Hơn cả 1 ngôn ngữ, tiếng Nhật chính là công việc và đam mê của mình.',
    url: TIK + 'vo-trong-quy', src: 'Tikme', f: ['jp', 'fam'] },
  { id: 'lich', n: 'Hồ Thanh Lịch', a: 'Anh Lịch', jl: 'N1', job: 'Đúc nhựa', ind: 'duc-nhua', from: '', jp: 'Nara', isl: 'chu',
    tag: 'Học tiếng Nhật từ số 0 năm 26 tuổi → N1 → lập trình viên',
    kd: 'Tốt nghiệp đại học chưa tìm được việc, năm 26 tuổi anh học tiếng Nhật từ con số 0.',
    bn: 'Tiếng Nhật khá lên, anh được giao việc mới. Trượt N2 hai lần, N1 một lần, rồi anh đậu N1.',
    nay: 'Về nước, anh học lập trình 8 tháng để theo nghề kỹ sư cầu nối (BrSE).',
    q: 'Với mình, hành trang đến Nhật Bản mà không tốn một kilogram nào đó là tiếng Nhật và tác phong.',
    url: ESU + '3EE21/nghe-podcast-ho-thanh-lich-chang-thuc-tap-sinh-tu-so-0-den-jlpt-n1-va-tro-thanh-lap-trinh-vien.html', src: 'Esuhai', f: ['jp', 'learn', 'retry', 'change'] },
  { id: 'hoi', n: 'Nguyễn Bá Hợi', a: 'Anh Hợi', jl: '', job: 'Cơ khí', ind: 'co-khi', from: 'Nghệ An', jp: 'Tokyo', isl: 'lap',
    tag: 'Thực tập sinh cơ khí → được sếp Nhật giới thiệu việc → mở công ty',
    kd: 'Muốn học đại học nhưng chưa đủ điều kiện, anh sang Nhật để vừa giúp gia đình vừa học nghề.',
    bn: 'Công ty cũ chưa có chi nhánh ở Việt Nam, Tổng Giám đốc giới thiệu anh sang công ty bạn.',
    nay: 'Anh mở công ty cơ khí theo kỹ thuật Nhật, là Giám đốc đại diện Công ty TNHH Kỹ thuật VMONO.',
    q: 'Vào Esuhai mới có cơ hội đi Nhật. Đi Nhật mới thay đổi vận mệnh của anh.',
    url: TIK + 'nguyen-ba-hoi', src: 'Tikme', f: ['rel', 'fam'] },
  { id: 'thao', n: 'Trần Thị Thu Thảo', a: 'Chị Thu Thảo', jl: 'N2', job: 'Thực phẩm (làm bánh)', ind: 'thuc-pham', from: 'Đồng Nai', jp: 'Chiba', isl: 'lap',
    tag: 'Xe bánh nhỏ → 3 năm ở Chiba → tiệm bánh của riêng mình',
    kd: 'Yêu nghề làm bánh từ nhỏ, chị từng bán một xe bánh nhỏ và muốn lên tay nghề.',
    bn: 'Chị sang Chiba làm thực phẩm 3 năm, học công nghệ và hương vị bánh Nhật, đạt N2.',
    nay: 'Chị mở tiệm bánh ngọt và trà GonGon ở Đồng Nai, từ người thợ thành người quản lý đội ngũ.',
    q: 'Mỗi lựa chọn đều có những thử thách và rủi ro riêng, nhưng chính những trải nghiệm gian nan ấy mới giúp người trẻ hiểu rõ mình thực sự muốn gì.',
    url: TIK + 'tran-thi-thu-thao', src: 'Tikme', f: ['jp', 'goal'] },
  { id: 'vinh', n: 'Nguyễn Thị Cẩm Vinh', a: 'Chị Cẩm Vinh', jl: 'N2', job: 'Thực phẩm', ind: 'thuc-pham', from: 'Vĩnh Long', jp: 'Tochigi', isl: 'lap',
    tag: 'Giảng viên đại học → thực tập sinh thực phẩm → giám đốc công ty F&B',
    kd: 'Từng là giảng viên Ngôn ngữ Anh, chị bước ra khỏi vùng an toàn để học tiếng Nhật ở Esuhai.',
    bn: 'Chị làm chế biến thực phẩm ở Tochigi. Về nước, dự án đầu tay của chị dừng lại vì dịch bệnh.',
    nay: 'Chị kiên trì gần 8 năm, nay là Giám đốc Công ty DORIANNA.',
    q: 'Khi sang Nhật, đừng nghĩ mình chỉ đến đó để kiếm tiền, mà hãy nhớ mình đang đại diện cho hình ảnh của người trẻ Việt Nam.',
    url: TIK + 'nguyen-thi-cam-vinh', src: 'Tikme', f: ['jp', 'retry', 'change'] },
  { id: 'ngoc3', n: 'Ba anh em Nguyễn Ngọc Trung, Dũng, Hiếu', a: 'Ba anh em Trung, Dũng, Hiếu', jl: 'N1', job: 'Cơ khí', ind: 'co-khi', from: 'TP.HCM', jp: 'Nhật Bản', isl: 'lap',
    tag: 'Ba người, ba diện đi Nhật → ba công ty cơ khí ở Việt Nam',
    kd: 'Ba anh em cùng học kỹ thuật ở Trường ĐH Sư phạm Kỹ thuật TP.HCM, rồi sang Nhật theo ba diện: tu nghiệp sinh, kỹ sư, thực tập sinh.',
    bn: 'Công ty Nhật tin anh Trung, giao anh quản lý nhà máy ở Việt Nam. Đối tác Nhật giúp anh Hiếu về nước lập công ty.',
    nay: 'Anh Trung có O.N Precision (linh kiện chính xác), anh Dũng là Giám đốc Cơ khí Công nghiệp VNP, anh Hiếu có V.N.T Việt Nam.',
    q: 'Thành công chỉ mỉm cười với ai nhìn thấy cơ hội ẩn sau rủi ro.', qBy: 'Anh Nguyễn Ngọc Dũng',
    url: TIK + 'nguyen-ngoc-trung-nguyen-ngoc-dung-nguyen-ngoc-hieu', src: 'Tikme', f: ['rel', 'learn'] },
  { id: 'thuy', n: 'Trần Thị Thúy', a: 'Chị Thúy', jl: 'N2', job: 'Thủy sản', ind: 'thuy-san', from: 'Lâm Đồng', jp: 'Hokkaido', isl: 'cau',
    tag: 'Sư phạm Vật lý → thực tập sinh thủy sản → giám đốc đại diện công ty Nhật',
    kd: 'Tốt nghiệp Sư phạm Vật lý, định theo nghề giáo, chị chọn một hướng khác: sang Nhật làm việc.',
    bn: '3 năm ở Hokkaido cho chị kinh nghiệm, tiếng Nhật N2 và tác phong làm việc kiểu Nhật.',
    nay: 'Chị là Giám đốc đại diện Công ty Marukoshi Seagull Việt Nam.',
    q: 'Đi Nhật không chỉ cho mình một khoản tiền tiết kiệm, mà quan trọng hơn là cho mình một nền tảng để phát triển sự nghiệp và cuộc sống sau này.',
    url: TIK + 'tran-thi-thuy', src: 'Tikme', f: ['jp', 'change'] },
  { id: 'hoai', n: 'Phạm Ngọc Hoài', a: 'Anh Hoài', jl: 'N2', job: 'Cơ khí', ind: 'co-khi', from: 'Cà Mau', jp: 'Saitama', isl: 'cau',
    tag: 'Bỏ dở IT → thực tập sinh cơ khí → quản lý sản xuất công ty Nhật',
    kd: 'Học IT gần 2 năm chưa thấy hướng đi, anh chọn đường mới vì mê chất lượng hàng Nhật.',
    bn: 'Xong 3 năm về nước, chỉ 2 tuần sau anh vào làm KATZDEN Việt Nam.',
    nay: 'Anh được giao quản lý bộ phận sản xuất, vừa làm vừa học cách quản lý.',
    q: 'Đừng vội chọn việc nhẹ lương cao để tìm kiếm sự an nhàn trước mắt. Hãy tích lũy năng lực, học hỏi từ những việc nhỏ nhất và tìm thấy niềm tự hào trong từng sản phẩm mình làm ra.',
    url: TIK + 'pham-ngoc-hoai', src: 'Tikme', f: ['jp', 'rel', 'change'] },
  { id: 'hien', n: 'Ngô Thị Thu Hiền', a: 'Chị Thu Hiền', jl: 'N1', job: 'Nông nghiệp', ind: 'nong-nghiep', from: '', jp: 'Hokkaido', isl: 'cau',
    tag: 'Nông nghiệp Hokkaido → N1 → Hiệp hội Nhật Bản tại Việt Nam',
    kd: 'Thích tiếng Nhật từ nhỏ, chị bắt đầu hành trình học tiếng Nhật năm 2018.',
    bn: 'Chị làm nông nghiệp ở Hokkaido và học bền bỉ đến khi đậu N1.',
    nay: 'Chị chuyển sang làm việc tại Hiệp hội Nhật Bản ở Việt Nam.',
    q: 'Mình không tin vào thành công đến từ may mắn. Mình tin rằng mỗi trang sách đã đọc, mỗi giờ luyện nghe và mỗi lần không bỏ cuộc đều là những viên gạch nhỏ xây nên kết quả của ngày hôm nay.',
    url: TIK + 'ngo-thi-thu-hien', src: 'Tikme', f: ['jp', 'learn', 'goal'] },
  { id: 'hang', n: 'Lê Thị Lệ Hằng', a: 'Chị Lệ Hằng', jl: 'N2', job: 'Nông nghiệp', ind: 'nong-nghiep', from: 'Hà Tĩnh', jp: 'Ehime', isl: 'cau',
    tag: 'Cử nhân kế toán → 7 năm nông nghiệp ở Nhật → doanh nghiệp Nhật',
    kd: 'Tốt nghiệp Kế toán, chị muốn tìm hiểu nông nghiệp hiện đại của Nhật và lên đường năm 2018.',
    bn: 'Chị làm việc ở Nhật gần 7 năm, tiếng Nhật đạt N2.',
    nay: 'Chị về nước, làm việc tại một doanh nghiệp Nhật ở Việt Nam.',
    q: 'Ngôn ngữ là rào cản lớn nhất nhưng cũng là cơ hội lớn nhất. Khi có nền tảng tiếng Nhật tốt, bạn sẽ có nhiều cơ hội phát triển, không chỉ tại Nhật mà cả sau khi trở về Việt Nam.',
    url: TIK + 'le-thi-le-hang', src: 'Tikme', f: ['jp', 'goal', 'change'] },
  { id: 'kthanh', n: 'Nguyễn Thị Kim Thanh', a: 'Chị Kim Thanh', jl: '', job: 'Thủy sản', ind: 'thuy-san', from: '', jp: 'Hokkaido', isl: 'cau',
    tag: 'Kỹ sư thủy sản → thực tập sinh ở Hokkaido → trưởng phòng kinh doanh',
    kd: 'Tốt nghiệp ngành Thủy sản nhưng thiếu kinh nghiệm, chị sang Nhật để lên tay nghề trong ngành.',
    bn: 'Chị làm thực tập sinh 3 năm ở Hokkaido, học cách làm việc và tạo quan hệ với người Nhật.',
    nay: 'Chị là Trưởng phòng Kinh doanh Công ty Cổ phần Sài Gòn Food, đúng ngành mình học.',
    q: 'Thay vì chỉ đặt mục tiêu về tài chính mà hãy đặt mục tiêu dài hạn hơn, là ngoại ngữ và cơ hội nghề nghiệp sau 30 tuổi.',
    url: TIK + 'nguyen-thi-kim-thanh', src: 'Tikme', f: ['goal', 'rel'] },
  { id: 'huan', n: 'Lương Ngọc Huân', a: 'Anh Huân', jl: 'N1', job: 'Xây dựng', ind: 'xay-dung', from: '', jp: 'Nhật Bản', isl: 'que',
    tag: '30 tuổi mới sang Nhật → trượt N2 sáu lần → N1 → về gần nhà',
    kd: 'Có bằng trung cấp nông nghiệp và việc ổn định, 30 tuổi anh mới sang Nhật để lo cho con nhỏ.',
    bn: 'Anh tự hứa có N1 mới về. Trượt N2 sáu lần, lần thứ bảy anh đậu, một năm sau đậu N1.',
    nay: 'Xong 5 năm, anh về nước, tìm việc dùng tiếng Nhật gần nhà để tiện chăm con và mẹ.',
    q: '',
    url: TIK + 'luong-ngoc-huan', src: 'Tikme', f: ['jp', 'learn', 'retry', 'goal', 'fam'] },
  { id: 'hung', n: 'Tiết Quý Hưng', a: 'Chị Hưng', jl: 'N2', job: 'Thực phẩm', ind: 'thuc-pham', from: 'TP.HCM', jp: 'Saitama, Gunma', isl: 'que',
    tag: 'Văn phòng → thực tập sinh thực phẩm → ở thêm, rồi về bên gia đình',
    kd: 'Tốt nghiệp Ngôn ngữ Trung Quốc, chị làm văn phòng rồi muốn thử môi trường mới.',
    bn: 'Hơn 3 năm làm thực phẩm ở Saitama và Gunma, chị đạt N2.',
    nay: 'Chị muốn ở lại Nhật học hỏi, khám phá thêm, rồi mới trở về bên gia đình.',
    q: 'Khi có mục tiêu rõ ràng và không ngừng học hỏi, mỗi trải nghiệm đều sẽ giúp chúng ta trưởng thành hơn.',
    url: TIK + 'tiet-quy-hung', src: 'Tikme', f: ['jp', 'change'] }
];

/* PS1.3.48 (bản 3 · đợt 5) hình thẻ Senpai: [cảnh nơi làm việc hôm nay, đồ vật lúc khởi đầu / điểm riêng] (vẽ ở art.js: CD2_SPSC, CD2_PROP).
   Không vẽ mặt người thật. Nền tranh theo phía của đảo: Ở Nhật xanh lá nhạt · Về Việt Nam hồng đất · Cả hai tím nhạt. */
var SP_ART = {
  sy: ['pack', 'cal8'], taih: ['weld', 'medal'], ngat: ['office', 'noodle'], linh: ['talk', 'fish'], long: ['cross', 'box'], ploan: ['resto', 'basket'],
  tait: ['uni', 'brush'], tan: ['uni', 'fish'], dung: ['plane', 'torch'], hoa: ['care', 'helmet'],
  mai: ['class', 'chip'], xuan: ['class', 'fish'], son: ['class', 'heart'], quy: ['online', 'print'], lich: ['code', 'mold'],
  hoi: ['company', 'gear'], thao: ['bakery', 'cart'], vinh: ['resto', 'cap'], ngoc3: ['cnc', 'gear3'],
  thuy: ['company', 'fish'], hoai: ['cnc', 'clip'], hien: ['office', 'leaf'], hang: ['farm', 'calc'], kthanh: ['chart', 'fish'],
  huan: ['home', 'helmet'], hung: ['home', 'basket']
};
/* điểm chung khóa học tìm thấy trong các chuyện (Bến Senpai, chặng 2). rich: không ai có, để so sánh. */
var CD2_F = [
  ['jp', 'Tiếng Nhật từ N2 trở lên'],
  ['change', 'Đổi hướng ít nhất một lần'],
  ['learn', 'Tự học thêm ngoài giờ làm'],
  ['goal', 'Có mục tiêu riêng ngay từ đầu'],
  ['rel', 'Được công ty, cấp trên tin và giúp'],
  ['fam', 'Gia đình là động lực'],
  ['retry', 'Từng thất bại, thi lại nhiều lần']
]; /* PS1.3.45: bỏ thẻ “có sẵn nhiều tiền”, bỏ đếm (bài không kể ≠ không có) */

/* nền chung: “Mọi hải trình đều xuất phát từ Cảng 3 Năm”. rt: thẻ Shin Routine gợi ý (PS_CONFIG.ROUTINE_LIB). */
var BASE5 = [
  { id: 'jp', n: 'Tiếng Nhật', d: 'Từ N3 lên N2 trong 3 năm', ic: 'speech', act: ['Mỗi ngày 10 từ mới', 'Nói với thầy cô người Nhật mỗi ngày 1 câu', 'Ôn 15 phút trước khi ngủ'], rt: ['5phut', 'memo'] },
  { id: 'skill', n: 'Tay nghề thật', d: 'Làm kỹ, làm đúng, làm nhanh dần', ic: 'tool', act: ['Ghi lại cách làm mỗi việc mới', 'Hỏi lại khi chưa chắc', 'Tập một kỹ năng của nghề mỗi tuần'], rt: ['memo', 'viecko'] },
  { id: 'tin', n: 'Chữ tín', d: 'Đúng giờ, giữ lời, báo cáo đều', ic: 'shield', act: ['Đến lớp sớm 5 phút', 'Hứa gì làm nấy, dù việc nhỏ', 'Có việc thì báo trước'], rt: ['som', 'horenso'] },
  { id: 'tien', n: 'Tiết kiệm có kế hoạch', d: 'Biết tiền đi đâu, để dành cho việc gì', ic: 'coin', act: ['Ghi chi tiêu mỗi ngày', 'Đặt một khoản để dành mỗi tháng', 'Viết rõ để dành cho mục tiêu nào'], rt: ['chitieu'] },
  { id: 'qh', n: 'Mối quan hệ tốt', d: 'Bạn bè, thầy cô, Senpai, cấp trên', ic: 'people', act: ['Chào hỏi, cảm ơn mỗi ngày', 'Hỏi thăm một Senpai', 'Giúp bạn cùng lớp một việc'], rt: ['chao', 'giup'] }
];

/* ---------- CHỊ HẠNH: nhân vật của khóa, ghép từ nhiều chuyện thật (KHÔNG phải người thật) ---------- */
var HANH_NOTE = 'Chị Hạnh là nhân vật của khóa, ghép từ nhiều chuyện thật của các anh chị đi trước.';
var HANH = [
  ['Sau 3 năm, làm sao biết nên ở lại hay về?', 'Chị không chọn ngay từ đầu. Năm thứ hai chị mới ngồi viết ra: tuổi 30 mình muốn có gì, gia đình cần gì, tiếng Nhật mình tới đâu. Viết ra rồi, hướng đi rõ dần.'],
  ['Lỡ chọn sai hướng thì sao?', 'Có lúc hướng cũ không còn hợp nữa. Nhưng 3 năm ở Nhật không mất đi đâu. Tiếng Nhật, tác phong, người quen vẫn đi theo mình sang hướng mới.'],
  ['Tiếng Nhật cần tới đâu?', 'Nhiều anh chị mà chị biết có N2 khi về. Không phải vì tấm bằng. N2 giúp mình hiểu cấp trên, được giao việc khó hơn, và có thêm lựa chọn sau này.'],
  ['Làm sao để công ty muốn giữ mình?', 'Đúng giờ. Làm kỹ. Chưa chắc thì hỏi lại. Báo cáo đều. Mấy việc nhỏ đó làm liền 3 năm thì người ta nhớ mình.'],
  ['Về Việt Nam có khó tìm việc không?', 'Dễ hơn nhiều khi có tiếng Nhật và giữ liên lạc với công ty cũ. Có anh về 2 tuần đã có việc. Có anh được chính sếp Nhật giới thiệu chỗ làm.'],
  ['Lúc nản muốn bỏ thì làm sao?', 'Chị mở lại mục tiêu đã viết, gọi cho một bạn cùng đi. Và chị nhớ có anh trượt N2 sáu lần, lần thứ bảy mới đậu.']
];

/* PS1.3.42: Phỏng vấn anh chị đi trước (b23). Ba người đều là NHÂN VẬT CỦA KHÓA, ghép từ nhiều chuyện thật (không phải người thật).
   read: mã Senpai (người thật) để học viên đọc chuyện gốc. */
var PEER_NOTE = 'Ba anh chị này là nhân vật của khóa, ghép từ nhiều chuyện thật. Muốn đọc chuyện thật, chạm thẻ bên dưới.';
var PEERS = [
  { id: 'hanh', n: 'Chị Hạnh', av: 'H', role: 'Về làm công ty Nhật ở Việt Nam', hi: 'Chào [Tên]! Chị từng là thực tập sinh 3 năm, giờ làm ở một công ty Nhật tại Việt Nam. Em muốn hỏi gì?',
    qa: HANH, read: ['hoai', 'thuy', 'hien'] },
  { id: 'phuc', n: 'Anh Phúc', av: 'P', role: 'Về quê làm chủ một xưởng nhỏ', hi: 'Chào [Tên]! Anh làm cơ khí ở Nhật 3 năm, giờ có xưởng bảo trì máy ở quê. Em hỏi đi.',
    qa: [
      ['Anh bắt đầu làm chủ từ khi nào?', 'Không phải ngay khi về. Anh đi làm thuê gần một năm để hiểu khách ở Việt Nam cần gì, rồi mới mở xưởng nhỏ.'],
      ['Ở Nhật anh chuẩn bị gì cho việc làm chủ?', 'Anh ghi sổ mọi quy trình, để ý cách cấp trên tính chi phí. Mỗi tháng để dành đều, không đụng vào.'],
      ['Tiền vốn lấy ở đâu?', 'Tiền để dành 3 năm, thêm gia đình góp. Anh luôn giữ một khoản dự phòng cho lúc ít việc.'],
      ['Khách hàng đầu tiên là ai?', 'Một xưởng Nhật nhỏ gần nhà. Họ chọn anh vì anh báo cáo được bằng tiếng Nhật và làm đúng hẹn.'],
      ['Có lúc nào anh muốn bỏ không?', 'Có. Năm đầu có tháng không đủ trả lương thợ. Anh làm nhỏ lại, làm kỹ cho vài khách quen, rồi khách giới thiệu thêm khách.'],
      ['Về làm chủ có cần tiếng Nhật không?', 'Cần, nếu khách là công ty Nhật. Tiếng Nhật giúp anh hiểu khách muốn gì, và được khách tin.']
    ], read: ['hoi', 'thao', 'vinh'] },
  { id: 'ngan', n: 'Chị Ngân', av: 'N', role: 'Ở lại Nhật, lên Kỹ năng đặc định 2', hi: 'Chào [Tên]! Chị ở lại công ty cũ, giờ là tổ trưởng diện Kỹ năng đặc định 2. Em muốn biết gì?',
    qa: [
      ['Làm sao chị được công ty giữ lại?', 'Chị đi làm đúng giờ, ít nghỉ, làm kỹ. Năm thứ hai chị nói với tổ trưởng là chị muốn làm lâu dài.'],
      ['Thi Kỹ năng đặc định 2 có khó không?', 'Khó. Ngoài thi tay nghề, chị cần kinh nghiệm làm tổ trưởng. Chị tập chỉ việc cho người mới từ năm thứ ba.'],
      ['Tiếng Nhật cần tới đâu?', 'Đủ để kèm người mới và đọc hướng dẫn công việc. Chị lên N2 trong lúc đi làm, mỗi tối học một chút.'],
      ['Ở lâu có nhớ nhà không?', 'Có. Nhưng lên diện mới, chị được đón chồng con sang. Mỗi năm chị cũng về thăm nhà.'],
      ['Chị học được gì từ cấp trên người Nhật?', 'Báo cáo sớm, kể cả tin không vui. Cấp trên tin chị hơn khi chị báo lỗi ngay, không giấu.'],
      ['Nếu công ty không giữ thì sao?', 'Vẫn có công ty khác cùng ngành. Tay nghề và tiếng Nhật là của mình, đi đâu cũng mang theo được.']
    ], read: ['sy', 'taih', 'ngat'] }
];

/* ---------- NỐI CD01 → CD02 (PS1.3.41) ----------
   Mọi chỗ dùng lại bài CD01 có nhãn “Từ CD01”. Bước có c1: [mã] tự hiện nhãn ở đầu bước (engine c1HTML).
   Chưa xong CD01: khuyên học CD01 trước; vẫn vào thì trả lời nhanh nghề, 5 năm sau, điều quan trọng, điểm mạnh. */
var C1_LAB = { main: 'Nghề chính', me: '5 năm sau, bạn muốn là người', value: 'Điều quan trọng nhất', good: 'Điểm mạnh', like: 'Việc làm bạn thấy vui',
  far: 'Hướng 5 năm bạn quan tâm', p2: 'Kế hoạch ở Nhật', jp2: 'Tiếng Nhật ở Nhật', work: 'Điều bạn muốn làm được ở Nhật', senpai: 'Anh chị bạn muốn học theo',
  learn: 'Điều bạn muốn học theo', qs: 'Câu bạn từng muốn hỏi anh chị', worry: 'Điều bạn lo nhất', b: 'Nghề phương án 2', first: 'Việc nhỏ bạn hứa thử',
  guide: 'Người dẫn đường bạn nghĩ tới', habits: 'Thói quen bạn đặt ra', motto: 'Lời hứa của bạn', letter: 'Thư gửi mình 5 năm sau',
  iv: 'Câu bạn trả lời phỏng vấn 60 giây ở CD01' };
var C1_CARRY = ['main', 'me', 'value', 'good', 'far', 'jp2', 'motto', 'letter']; /* thẻ chọn mang lên thuyền (chọn 3) */
var C1_VALS = ['Thu nhập tốt', 'Gia đình', 'Học hỏi, phát triển', 'Ổn định lâu dài', 'Sức khỏe', 'Tự do, tự chủ', 'Giúp đỡ người khác', 'Được tôn trọng', 'Khám phá, trải nghiệm', 'Làm chủ, kinh doanh'];
var C1_GOOD = ['Kiên nhẫn', 'Có trách nhiệm', 'Khỏe, chịu khó', 'Khéo tay', 'Đúng giờ', 'Cẩn thận, tỉ mỉ', 'Học nhanh', 'Quan sát tốt', 'Giao tiếp', 'Làm việc nhóm'];

/* ---------- XUẤT PHÁT ---------- */
var FLAG_SYM = [
  ['compass', 'La bàn'], ['star', 'Ngôi sao'], ['sun', 'Mặt trời'], ['whale', 'Cá voi'],
  ['wing', 'Cánh chim'], ['flame', 'Ngọn lửa'], ['sakura', 'Hoa anh đào'], ['leaf', 'Lá non']
];
/* PS1.3.39: 6 tông dịu hợp giao diện mới (màu cũ tự đổi, xem FLAG_OLD trong art.js) */
var FLAG_COL = [['#D97757', 'Cam đất'], ['#6E9E94', 'Xanh ngọc'], ['#5E7FA8', 'Xanh biển'], ['#D9A84E', 'Vàng nắng'], ['#8C82B4', 'Tím oải hương'], ['#3D3D3A', 'Than chì']];
var MOTTO_TIPS = ['Đi chậm mà chắc', 'Học mỗi ngày một chút', 'Dám thử, dám sửa', 'Vì gia đình, vì mình', 'Không bỏ cuộc giữa biển'];
var OPEN_N = [['1', '1 hướng'], ['2', '2 hướng'], ['3', '3 hướng'], ['4', '4 hướng'], ['5', '5 hướng'], ['6', '6 hướng trở lên']];
var GOAL_TIPS = ['Biết thêm các hướng đi sau 3 năm', 'Hiểu mình hợp với hướng nào', 'Chuẩn bị từ bây giờ cho hướng mình chọn', 'Có thêm động lực học tiếng Nhật'];

/* ---------- BẾN 1 · ĐÀI VỌNG BIỂN: đoán hải trình ---------- */
var FLIP = ['thuy', 'lich', 'linh', 'hoi', 'sy', 'mai']; /* 6 thẻ lật, hải trình bất ngờ */
var FLIP_OPTS = { /* 4 đảo để đoán (đảo thật luôn có trong danh sách, máy xáo) */
  thuy: ['cau', 'chu', 'que', 'lap'], lich: ['chu', 'len', 'cau', 'lap'], linh: ['re', 'cau', 'chu', 'que'],
  hoi: ['lap', 'cau', 'len', 'gio'], sy: ['len', 'gio', 'cau', 'que'], mai: ['chu', 'cau', 'len', 're']
};
/* PS1.3.45: nhóm sở thích RIASEC (từ CD01) → đảo hợp, và Senpai “đi đường khác” gợi ý ở b21. Chỉ là gợi ý tham khảo. */
var RIA_N = { R: 'Kỹ thuật', I: 'Nghiên cứu', A: 'Sáng tạo', S: 'Xã hội', E: 'Quản lý, kinh doanh', C: 'Nghiệp vụ' };
var RIA_ISLE = { R: ['len', 'gio'], I: ['hoc', 're'], A: ['lap', 're'], S: ['chu', 'que'], E: ['lap', 'cau'], C: ['cau', 'len'] };
var RIA_SP = { S: ['mai', 'xuan', 'son', 'quy'], E: ['vinh', 'thuy', 'hoi'], I: ['lich', 'tait'], A: ['thao', 'ploan'], C: ['hoai', 'hang', 'ngat'], R: ['sy', 'taih', 'dung'] };
var TAG3 = [['cur', 'Tò mò', 'spark'], ['new', 'Chưa từng nghĩ', 'bulb'], ['no', 'Chưa hợp lúc này', 'clock']];

/* ---------- BẾN 3 · XƯỞNG LA BÀN ---------- */
var PAIRS = [ /* [trái, phải, mã]: cả hai bên đều tốt */
  ['Gần gia đình', 'Trải nghiệm xa nhà', 'fam'],
  ['Ổn định', 'Thử thách mới', 'stab'],
  ['Thu nhập cao', 'Thời gian tự do', 'money'],
  ['Đi sâu một nghề', 'Thử nghề mới', 'deep'],
  ['Làm cho tổ chức', 'Tự làm chủ', 'own'],
  ['Sống ở Nhật lâu', 'Về Việt Nam sớm', 'stay']
];
var WINDS = [ /* điều có thể làm đổi kế hoạch */
  'Gia đình cần mình về', 'Sức khỏe', 'Tiếng Nhật chưa đạt mục tiêu', 'Công ty thay đổi, ít việc',
  'Quy định về diện cư trú thay đổi', 'Mình đổi ý, thích nghề khác', 'Lập gia đình', 'Tiền để dành chưa đủ'
];
var WIND_TIPS = ['Mình sẽ nói chuyện thẳng thắn với gia đình', 'Mình sẽ để dành một khoản phòng thân', 'Mình sẽ học thêm một kỹ năng mang về Việt Nam dùng được', 'Mình sẽ hỏi Senpai đã gặp chuyện này'];
var LIFE = [ /* đường đời thầy của Shin hay vẽ lên bảng (ý của thầy Lê Long Sơn, nói gián tiếp) */
  [18, 22, 'Rèn sức khỏe, tinh thần'], [22, 30, 'Chọn một nghề, làm liên tục ít nhất 5 năm'], [30, 35, 'Tạo dựng sự nghiệp'], [35, 40, 'Gánh thêm trách nhiệm']
];
var WORK_TIPS = ['Với mình, đi làm là để lo cho gia đình', 'Với mình, đi làm là để giỏi một nghề', 'Với mình, đi làm là để được tôn trọng', 'Với mình, đi làm là để giúp được người khác'];
var LIFE_TIPS = ['10 năm nữa, một cuộc sống tốt với mình là có nghề vững', '10 năm nữa, một cuộc sống tốt với mình là gần ba mẹ', '10 năm nữa, một cuộc sống tốt với mình là có nhà riêng', '10 năm nữa, một cuộc sống tốt với mình là được làm việc mình thích'];

/* ---------- BẾN 4 · PHÒNG HẢI ĐỒ: 3 hải trình 5 năm ----------
   Ý tưởng tham khảo: “Odyssey Plan” trong sách Designing Your Life (Burnett, Evans · Stanford). Khóa học viết lại cho học viên JPC. */
var VOY = [ /* [mã chặng, chữ, tên, câu hỏi phụ] */
  ['b41', 'A', 'Hướng đang nghĩ tới', 'Hướng bạn đang nghĩ tới lúc này'],
  ['b42', 'B', 'Nếu A khó thực hiện', 'Bạn sẽ làm gì tiếp theo?'], /* PS1.3.56 (góp ý 6) */
  ['b43', 'C', 'Nếu không phải lo nghĩ về tiền', 'Bạn sẽ chọn làm điều gì mình thực sự mong muốn?']
];
/* gợi ý mốc theo đảo (chạm để điền vào mốc còn trống, rồi sửa theo ý mình) */
var MS_TIPS = {
  len: ['Đậu kỳ thi tay nghề, lên diện mới', 'Kèm 2 bạn mới vào công ty', 'Làm tổ trưởng', 'Đón gia đình sang thăm'],
  re: ['Thi chứng chỉ ngành mới', 'Chuyển sang công ty mới', 'Làm vững việc mới', 'Lên N2 để làm văn phòng'],
  hoc: ['Để dành đủ tiền học', 'Đậu N2', 'Vào trường mình chọn', 'Ra trường, làm nghề mới'],
  gio: ['Về nhà nghỉ, học thêm', 'Quay lại Nhật bằng diện mới', 'Lên vị trí cao hơn lần trước', 'Về hẳn khi đủ vốn'],
  chu: ['Đậu N2', 'Đậu N1', 'Học nghề dạy học hoặc phiên dịch', 'Đi làm bằng tiếng Nhật'],
  lap: ['Để dành vốn đầu tiên', 'Làm thuê 1 năm để học việc', 'Mở cửa hàng, xưởng nhỏ', 'Có 3 khách hàng quen'],
  cau: ['Giữ liên lạc với công ty cũ', 'Vào công ty Nhật ở Việt Nam', 'Lên trưởng nhóm', 'Học thêm cách quản lý'],
  que: ['Về gần nhà', 'Tìm việc dùng tay nghề ở quê', 'Phụ gia đình làm ăn', 'Sửa lại nhà cho ba mẹ'],
  o: ['Học thêm một kỹ năng', 'Để dành một khoản', 'Đậu N2', 'Làm vững một nghề']
};
/* PS1.3.57 (góp ý 7): hình biểu tượng cho kế hoạch A/B/C (vẽ trong art.js PLAN_ART). [nhóm, [[mã, tên], …]] */
var PLAN_IC = [
  ['Nghề và việc làm', [['p_tool', 'Tay nghề vững'], ['p_chef', 'Bếp, nhà hàng'], ['p_care', 'Chăm sóc người'], ['p_team', 'Dẫn dắt nhóm'], ['p_desk', 'Văn phòng']]],
  ['Học và lên trình độ', [['p_book', 'Học tiếng Nhật'], ['p_grad', 'Đi học tiếp'], ['p_talk', 'Phiên dịch, cầu nối'], ['p_stair', 'Lên bậc nghề'], ['p_seed', 'Lớn lên từng ngày']]],
  ['Nơi chốn và cuộc sống', [['p_jp', 'Sống ở Nhật'], ['p_vn', 'Về quê'], ['p_work', 'Xưởng, tiệm của mình'], ['p_bridge', 'Hai đầu Việt – Nhật'], ['p_home', 'Gia đình']]]
];
var JL_OPTS = [['N3', 'N3'], ['N2', 'N2'], ['N1', 'N1'], ['x', 'Không cần nhiều']];
var METERS = [ /* PS1.3.56 (góp ý 5, 8): 3 đồng hồ tự chấm, bỏ “Khả thi”. [mã, tên, câu phụ, tên ngắn] */
  ['like', 'Yêu thích', 'Bạn thích kế hoạch này cỡ nào?', 'Yêu thích'],
  ['conf', 'Tự tin có thể làm được', 'Bạn tin mình làm được cỡ nào?', 'Tự tin'],
  ['fit', 'Phù hợp với mình', 'Hợp điều bạn coi trọng cỡ nào?', 'Phù hợp']
];
var METER_COL = ['#F6DDD3', '#E9B7A3', '#D68A6E', '#B65A3E', '#8C3A27']; /* PS1.3.56 (góp ý 4): dải nâu đỏ 1 → 5 */
var TRIO_TIPS = ['Cả 3 hải trình đều cần tiếng Nhật tốt', 'Hải trình C làm mình thích nhất, nhưng còn xa', 'Mình có nhiều đường hơn mình nghĩ', 'Hải trình B cũng không tệ như mình tưởng'];

/* ---------- BẾN 5 · VỊNH NGÃ RẼ ---------- */
var WEIGHT = [['1', 'Nhẹ'], ['2', 'Vừa'], ['3', 'Nặng']];
var FEEL3 = [['same', 'Giống'], ['diff', 'Khác'], ['unsure', 'Phân vân']];
var WHY3 = ['Ở cách làm của mình', 'Ở thông tin mình còn thiếu', 'Ở người giúp, mối quan hệ', 'Ở hoàn cảnh bên ngoài'];
/* Khi đường bị chặn: tình huống lấy từ chuyện thật đã công khai (sp: mã Senpai, engine hiện khung Bước ngoặt + Hôm nay) */
var BLOCKS = [
  { id: 'n2', ic: 'speech', t: 'Thi N2 trượt lần thứ ba', ctx: 'Bạn ôn nhiều mà lần thứ ba vẫn chưa đậu. Mục tiêu N2 trong 3 năm có vẻ xa.',
    w1: ['Phần nghe còn yếu', 'Học dồn sát ngày thi', 'Đi làm về mệt, học không đều', 'Chưa biết mình hổng phần nào'],
    w2: ['Chưa có giờ học cố định mỗi ngày', 'Học một mình, không ai nhắc', 'Chưa xem lại bài thi cũ', 'Ngại hỏi người đã đậu'],
    ways: ['Học 20 phút mỗi sáng trước giờ làm', 'Rủ một bạn cùng học, nhắc nhau mỗi tối', 'Nghe tiếng Nhật trên đường đi làm', 'Hỏi anh chị đã đậu cách ôn', 'Đăng ký kỳ thi sau ngay, đặt mốc rõ', 'Mỗi ngày nói chuyện với đồng nghiệp người Nhật'],
    rt: ['5phut', 'camxuc'], rtf: 'Khi đứng chờ xe hay giờ nghỉ, tôi sẽ ôn 5 từ mới, để trở thành người đậu N2.',
    sp: ['huan', 'dung'] },
  { id: 'chi', ic: 'bridge', t: 'Về nước, công ty cũ chưa có chi nhánh ở Việt Nam', ctx: 'Bạn định về làm cho chính công ty mình, nhưng công ty chưa có chi nhánh ở Việt Nam.',
    w1: ['Mình chỉ tính một đường là công ty cũ', 'Chưa tìm hiểu công ty Nhật nào ở Việt Nam', 'Chưa hỏi cấp trên có quen ai không', 'Chưa ghi lại mình làm được gì'],
    w2: ['Chưa có kế hoạch B', 'Ít quen biết ngoài công ty', 'Ngại nhờ người khác', 'Chưa biết cách giới thiệu bản thân'],
    ways: ['Xin cấp trên lời giới thiệu trước khi về', 'Lập danh sách công ty Nhật cùng ngành ở Việt Nam', 'Ghi lại các việc mình làm giỏi ở Nhật', 'Hỏi thầy cô JPC, Senpai đã về nước', 'Giữ liên lạc với công ty cũ sau khi về', 'Học lên N2 để có thêm lựa chọn'],
    rt: ['memo', 'chao'], rtf: 'Khi gặp anh chị đi trước, tôi sẽ hỏi một câu và ghi lại, để trở thành người có nhiều đường đi.',
    sp: ['hoi', 'hoai'] },
  { id: 'dich', ic: 'wave', t: 'Hết hạn đúng lúc có dịch bệnh', ctx: 'Chuyện lớn ngoài ý muốn. Kế hoạch về nước, thi cử, công việc đều đảo lộn.',
    w1: ['Không về nước được như dự định', 'Công ty ít việc hơn', 'Kỳ thi bị hoãn', 'Gia đình ở nhà lo lắng'],
    w2: ['Chuyện lớn, ngoài sức mình', 'Chưa có kế hoạch dự phòng', 'Chưa có khoản tiền phòng thân', 'Chưa biết hỏi ai về giấy tờ'],
    ways: ['Hỏi công ty có cách nào để làm tiếp', 'Dùng thời gian này học tiếng Nhật, thi tay nghề', 'Để dành một khoản phòng thân', 'Gọi về nhà đều để gia đình yên tâm', 'Hỏi tổ chức hỗ trợ về giấy tờ', 'Lùi mốc, không bỏ mục tiêu'],
    rt: ['chitieu', 'camxuc'], rtf: 'Khi nhận lương, tôi sẽ để riêng một khoản phòng thân trước, để trở thành người vững vàng khi có chuyện.',
    sp: ['sy', 'vinh'] },
  { id: 'nha', ic: 'home', t: 'Gia đình cần bạn ở gần', ctx: 'Gia đình cần bạn về gần hơn, sớm hơn bạn tính.',
    w1: ['Ba mẹ lớn tuổi, cần người bên cạnh', 'Có con nhỏ cần chăm', 'Nhà cần người phụ việc', 'Ba mẹ nhớ, muốn mình về'],
    w2: ['Chưa nói rõ kế hoạch với gia đình', 'Chưa biết việc gần nhà dùng được tay nghề', 'Chưa có nghề mang về dùng được', 'Chưa tính chuyện tiền lúc mới về'],
    ways: ['Nói rõ với gia đình về mốc thời gian', 'Tìm việc gần nhà dùng tiếng Nhật, tay nghề', 'Học thêm một kỹ năng mang về dùng được', 'Để dành một khoản cho lúc mới về', 'Gọi video về nhà mỗi tuần', 'Hỏi anh chị đã về quê làm gì'],
    rt: ['chitieu', '5phut'], rtf: 'Khi gọi về nhà mỗi tuần, tôi sẽ kể một việc mình đã làm cho kế hoạch, để trở thành người con gia đình yên tâm.',
    sp: ['huan', 'hung'] }
];
var TRIALS = ['Hỏi 1 anh chị đi trước về hướng này', 'Đọc 2 chuyện trên Tikme về hướng này', 'Học thêm 15 phút tiếng Nhật mỗi tối', 'Ghi chi tiêu mỗi ngày', 'Nói chuyện với gia đình về kế hoạch mình nghiêng', 'Hỏi thầy cô JPC: hướng này cần chuẩn bị gì'];
var TRY_ISLE = { len: 'Tìm hiểu kỳ thi tay nghề của nghề [Nghề]', re: 'Tìm hiểu 1 ngành khác ở Nhật mình thấy thích', hoc: 'Tìm hiểu 1 trường, 1 chương trình học lên',
  gio: 'Tìm hiểu điều kiện quay lại Nhật bằng diện khác', chu: 'Mỗi ngày học 5 từ chuyên ngành, tập dịch 1 câu', lap: 'Mỗi ngày ghi 1 điều về cách một cửa hàng, xưởng nhỏ làm ăn',
  cau: 'Lập danh sách 5 công ty Nhật cùng nghề ở Việt Nam', que: 'Hỏi gia đình: ở quê có việc gì cần tiếng Nhật, tay nghề' };
var WHEN3 = [['0', 'Hôm nay'], ['1', 'Ngày mai'], ['7', 'Thứ Hai tới']];
var WITH3 = [['me', 'Một mình'], ['ban', 'Rủ một bạn cùng lớp'], ['gv', 'Báo thầy cô để được nhắc']];
var LEARN_TIPS = ['Hướng này có hợp với mình không', 'Mình có giữ được thói quen không', 'Mình cần chuẩn bị thêm gì', 'Gia đình nghĩ sao về hướng này'];

/* ---------- BẾN 7 · NGỌN HẢI ĐĂNG (PS1.3.42: trước là Bến 6) ---------- */
var RING_P = [['fam', 'Gia đình', 'home'], ['ban', 'Bạn cùng lớp', 'people'], ['gv', 'Thầy cô JPC', 'cap'], ['sp', 'Senpai đi trước', 'card'],
  ['boss', 'Cấp trên người Nhật', 'shield'], ['dn', 'Đồng nghiệp ở Nhật', 'tool'], ['cd', 'Bạn cùng công ty trúng tuyển', 'speech'], ['tc', 'Anh chị Nghiệp đoàn, tổ chức hỗ trợ', 'anchor']];
var RING_L = [['3', 'Chưa quen'], ['2', 'Quen sơ'], ['1', 'Thân thiết']]; /* PS1.3.56 (góp ý 13): hiện Chưa quen → Thân thiết, giữ mã cũ */ /* PS1.3.45 (thầy góp ý 29b) */
var RING_STORY = [['hoi', 'Tổng Giám đốc giới thiệu anh Hợi sang công ty của một người bạn.'], ['ngat', 'Công ty mời chị Ngát ở lại, chuyển lên văn phòng.'], ['linh', 'Nghiệp đoàn nhận chị Linh làm thông dịch viên.'], ['ngoc3', 'Công ty Nhật giao anh Trung quản lý nhà máy; đối tác Nhật giúp anh Hiếu lập công ty.']];
var MSG_TO = ['Anh chị Senpai', 'Thầy cô chủ nhiệm', 'Một người quen đã đi Nhật'];
var MSG_Q = ['Mình nên chuẩn bị gì từ bây giờ cho hướng này?', 'Năm đầu ở Nhật, điều gì khó nhất?', 'Lúc muốn bỏ cuộc, mình nên làm gì?', 'Hướng này cần tiếng Nhật tới đâu?', 'Làm sao để công ty tin và giao việc mới?'];
var ASK_TIP = 'Câu hỏi đã sẵn sàng. Giờ cất điện thoại, gặp trực tiếp người đó và hỏi nhé. Gặp xong, quay lại đây ghi lời khuyên.';
var WORKS = [ /* 3 tình huống ở chỗ làm. Không có đáp án sai: mỗi cách có cái được và một lưu ý. (PS1.3.41: rút gọn chữ) */
  { t: 'Cấp trên chỉ việc rất nhanh. Bạn chưa hiểu hết.', ic: 'speech', opts: [
    ['Hỏi lại ngay, nhắc lại để xác nhận', 'Hiểu đúng từ đầu.', 'Hỏi ngắn, đúng chỗ chưa rõ.'],
    ['Ghi vào sổ, hết giờ hỏi lại', 'Không làm gián đoạn, có sổ để ôn.', 'Việc gấp thì hỏi ngay.'],
    ['Nhìn người bên cạnh rồi làm theo', 'Học được cách làm thật.', 'Người bên cạnh cũng có thể sai.'],
    ['Cứ làm thử, sai thì sửa', 'Dám làm, học nhanh.', 'Sai một lần có thể tốn nhiều. Hỏi trước an toàn hơn.']] },
  { t: 'Có anh đồng nghiệp làm nhanh và đẹp hơn hẳn.', ic: 'tool', opts: [
    ['Quan sát kỹ anh ấy làm', 'Thấy mẹo mà sách không có.', 'Quan sát xong nhớ ghi lại.'],
    ['Xin anh ấy chỉ một mẹo', 'Học nhanh, thêm người quen tốt.', 'Chọn lúc anh ấy rảnh, nhớ cảm ơn.'],
    ['Ghi các bước vào sổ', 'Có bản để tập lại.', 'Ghi xong phải tập mới lên tay.'],
    ['Tự tập thêm lúc rảnh', 'Tay nghề lên dần.', 'Tập sai cách thì khó sửa. Hỏi trước một lần.']] },
  { t: 'Bạn bị nhắc lỗi trước mọi người.', ic: 'shield', opts: [
    ['Xin lỗi, hỏi cách làm đúng', 'Biết ngay cách sửa, giữ chữ tín.', 'Nói ngắn, không cần giải thích dài.'],
    ['Ghi lỗi vào sổ để không lặp lại', 'Lần sau tránh được.', 'Chưa rõ vì sao sai thì hỏi lại.'],
    ['Im lặng làm tiếp cho xong', 'Giữ bình tĩnh.', 'Im lặng mà chưa hiểu thì dễ sai lại.'],
    ['Sửa xong thì báo lại cấp trên', 'Cấp trên yên tâm, tin bạn hơn.', 'Báo ngắn: đã sửa gì, khi nào.']] }
];
var WORK_STORY = [['sy', 'Những ngày đầu thấy lạc lõng, anh Sỹ chọn quan sát và học từ đồng nghiệp.'], ['hoai', 'Anh Hoài: “Hãy tích lũy năng lực, học hỏi từ những việc nhỏ nhất.”'], ['lich', 'Tiếng Nhật khá lên, anh Lịch được giao việc mới.']];
var LEARN_H = ['Hỏi lại và nhắc lại để xác nhận', 'Ghi sổ mỗi việc mới', 'Quan sát người giỏi rồi làm theo', 'Làm xong thì báo cáo'];
var HOW_TIPS = ['Mỗi buổi học kỹ năng, mình ghi 3 điều mới vào sổ', 'Chưa hiểu bài, mình hỏi lại thầy cô ngay trong giờ', 'Mỗi ngày mình báo cáo nhóm trưởng việc đã xong'];

/* ---------- CẢNG KHỞI HÀNH ---------- */
var CHANGE_TIPS = ['Mình biết thêm nhiều hướng mình chưa từng nghĩ', 'Mình chắc hơn về hướng mình đang đi', 'Mình bớt chắc, nhưng mình biết phải tìm hiểu gì', 'Mình thấy 3 năm sắp tới quan trọng hơn'];
var TIKME_HOME = 'https://tikme.com/cau-chuyen-thanh-cong/danh-sach';

/* ---------- PS1.3.47 (bản 3 · đợt 4) CLIP MYROAD · loạt phim 20 năm Esuhai trên YouTube ----------
   Ý chính viết lại bằng lời khóa học; KHÔNG dán transcript tự động (máy nghe sai nhiều). Câu trích chỉ thêm khi thầy đã nghe xác nhận.
   yt: mã video · at: giây bắt đầu “đoạn đáng xem” · seg: nhãn đoạn · len: độ dài cả clip · sp: mã thẻ Senpai (nếu có).
   CLIP_AT[chặng] = {kt: nhóm Kỹ thuật, sản xuất, xây dựng · dv: nhóm Thực phẩm, dịch vụ, chăm sóc}. Nhóm lấy theo nhóm ngành ở b61 (adGrp). */
var CLIP_SRC = 'MyRoad · loạt phim 20 năm Esuhai (YouTube)';
var CLIPS = {
  hoai: { sp: 'hoai', n: 'Anh Phạm Ngọc Hoài', role: 'Thực tập sinh cơ khí → quản lý sản xuất ở công ty Nhật', yt: 'hVNR8dOspI8', at: 519, seg: '8:39–11:06', len: '11 phút',
    ideas: ['Chọn nghề không vì việc nhẹ, mà vì thấy quý sản phẩm mình làm ra.', 'Ở Nhật, anh học tiếng từ các anh, các bác ở chỗ làm, học nghề qua từng việc.', 'Ba năm ấy là hành trang. Đừng vội, bước cho vững rồi mới đi xa.'] },
  thao: { sp: 'thao', n: 'Chị Trần Thị Thu Thảo', role: 'Thực tập sinh làm bánh → chủ tiệm bánh, trà', yt: 'TKB6IDsjQCc', at: 245, seg: '4:05–5:40', len: '7 phút',
    ideas: ['Chị chia 3 năm thành 3 chặng học: nướng bánh, làm bột, rồi bánh mì.', 'Về nước 6 tháng, thấy chưa ổn, chị quay lại Nhật làm nhà hàng để học quản lý, vận hành.', 'Chị dám mở tiệm, dù nhiều người khuyên để tiền mua nhà, mua xe.'] },
  hoi: { sp: 'hoi', n: 'Anh Nguyễn Bá Hợi', role: 'Thực tập sinh cơ khí → giám đốc công ty cơ khí', yt: '3jJjO-Fxi90', at: 216, seg: '3:36–5:26', len: '7 phút',
    ideas: ['Anh đặt mục tiêu cho từng năm: năm 1 học gia công, năm 2 xin học thêm máy chấn, máy cắt laser.', 'Công ty cũ chưa có chi nhánh ở Việt Nam, sếp người Nhật giới thiệu anh sang công ty bạn.', 'Chỗ làm sau đó phá sản. Anh lập công ty riêng thì gặp dịch, gần 1 năm mới vượt qua.'] },
  vinh: { sp: 'vinh', n: 'Chị Nguyễn Thị Cẩm Vinh', role: 'Thực tập sinh thực phẩm → giám đốc công ty nhà hàng', yt: 'SOpqDIkgcI0', at: 384, seg: '6:24–9:07', len: '12 phút',
    ideas: ['Năm thứ hai, chị muốn bỏ về. Chị nhắn cho thầy ở trường cũ, được động viên, và ở lại.', 'Về nước, nhà hàng đầu tiên chị mở cùng đối tác Nhật phải dừng vì dịch.', 'Chị làm quản lý, tư vấn nhà hàng Nhật gần 8 năm, rồi mở lại nhà hàng của riêng mình.'] },
  thieu: { sp: '', n: 'Anh Hoàng Văn Thiệu', role: 'Kỹ sư cơ khí → Phó Giám đốc một công ty cơ khí', yt: 'pkCX1Z-8Oxs', at: 50, seg: '0:50–2:06', len: '9 phút',
    ideas: ['Ra trường điểm cao, anh đòi lương cao và trượt hầu hết các buổi phỏng vấn.', 'Anh viết lại CV, nhìn lại mình, rồi vào được một công ty Nhật.', 'Lúc khó nhất, bạn cùng lớp góp tiền giúp anh. Phỏng vấn đi Nhật, anh giữ tâm thế thoải mái và đậu.'] },
  son: { sp: 'son', n: 'Chị Nguyễn Thị Son', role: 'Thực tập sinh thực phẩm → giáo viên tiếng Nhật', yt: 'SBOEknkExd8', at: 553, seg: '9:13–11:50', len: '19 phút',
    ideas: ['Mới sang, nghiệp đoàn lo cho chị chu đáo; cô ở nghiệp đoàn chỉ dẫn rất nhiều.', 'Chưa quen tiếng địa phương, chị chủ động chào các cụ ở công viên, nói chuyện nhiều hơn.', 'Trước khi đi, thầy cô cho chị chuyển lớp để vừa làm thêm vừa học.'] }
};
var CLIP_AT = { b22: { kt: 'hoai', dv: 'thao' }, b52: { kt: 'hoi', dv: 'vinh' }, b62: { kt: 'thieu', dv: 'thieu' }, b71: { kt: 'son', dv: 'son' } };
var CLIP_SAY = {
  b22: 'Nghe một anh chị kể khoảng 2 phút nhé. Không xem được thì đọc 3 ý bên dưới.',
  b52: 'Anh chị này cũng từng bị chặn đường. Nghe cách họ gỡ.',
  b62: 'Phỏng vấn trượt cũng là chuyện thường. Nghe anh Thiệu kể nhé.',
  b71: 'Nhiều anh chị có bước ngoặt nhờ một người giúp. Nghe chị Son kể, rồi mình xem ai đang ở gần bạn.'
};

/* ---------- PS1.3.47 · nối Shin routine ----------
   BLOCKS[].rt: thẻ gợi ý khi đường bị chặn (b52), rtf: công thức gợi ý “Khi…, tôi sẽ…, để trở thành…”.
   TRIAL_RT: việc thử nhỏ 2 tuần (b63) → 1 thẻ Shin routine; việc tự viết hoặc theo đảo → TRIAL_RT_DEF. */
var TRIAL_RT = { 'Hỏi 1 anh chị đi trước về hướng này': 'memo', 'Đọc 2 chuyện trên Tikme về hướng này': '5phut', 'Học thêm 15 phút tiếng Nhật mỗi tối': '5phut',
  'Ghi chi tiêu mỗi ngày': 'chitieu', 'Nói chuyện với gia đình về kế hoạch mình nghiêng': 'horenso', 'Hỏi thầy cô JPC: hướng này cần chuẩn bị gì': 'memo' };
var TRIAL_RT_DEF = 'viecko';

/* ---------- BẾN 6 · PHÒNG TUYỂN DỤNG (PS1.3.46, bản 3 đợt 3) ----------
   Tin GIẢ ĐỊNH, ghép từ tin tuyển dụng thật năm 2026 (JobsGO, CareerLink, 123job, Joboko, Indeed Nhật, en-gage) và thống kê lương 2025 của Bộ Y tế, Lao động và Phúc lợi Nhật Bản.
   Tên công ty là tên giả định. Lương = tham khảo. gr: nhóm ngành (AD_GRP) hoặc 'all'. iv: mã người phỏng vấn (IV_WHO).
   req: [nhóm yêu cầu (AD_RG), yêu cầu, vì sao nhà tuyển dụng cần]. Mỗi tin đủ 5 nhóm, mỗi nhóm 1 yêu cầu. */
var AD_KIND = [['vn', 'Tin ở Việt Nam', 'bridge'], ['jp', 'Tin ở Nhật', 'stairs'], ['plan', 'Kế hoạch kinh doanh', 'shop']];
var AD_GRP = [
  ['sx', 'Sản xuất, kỹ thuật', ['co-khi', 'dien-tu', 'han', 'son', 'duc-nhua', 'dong-goi-cong-nghiep', 'in-an', 'may-mac', 'o-to', 'ky-su']],
  ['xd', 'Xây dựng', ['xay-dung']],
  ['tp', 'Thực phẩm, nông nghiệp', ['thuc-pham', 'nong-nghiep', 'thuy-san']],
  ['kg', 'Kaigo', ['dieu-duong']],
  ['dv', 'Nhà hàng, khách sạn', ['nha-hang', 've-sinh-toa-nha']]
];
var AD_RG = [['jp', 'Tiếng Nhật'], ['cm', 'Chuyên môn'], ['kn', 'Kỹ năng'], ['kg', 'Kinh nghiệm'], ['td', 'Thái độ']];
var ADS = [
  /* Sản xuất, kỹ thuật */
  { id: 'qc', k: 'vn', gr: 'sx', co: 'Công ty TNHH Hải Âu Denshi', ng: 'Linh kiện điện tử', vt: 'Nhân viên QC, tiếng Nhật N3', at: 'KCN Long Đức, Đồng Nai', lu: '11–15 triệu đồng/tháng', iv: 'vn',
    job: 'Kiểm tra hàng trên chuyền, ghi lỗi, báo cáo quản lý người Nhật.',
    req: [['jp', 'JLPT N3 trở lên', 'Để đọc hướng dẫn, báo lỗi với quản lý người Nhật mà không cần người dịch.'],
      ['cm', 'Đọc được bản vẽ, dùng dụng cụ đo', 'QC phải đo đúng mới biết hàng đạt hay lỗi.'],
      ['kn', 'Ghi số liệu bằng Excel', 'Số liệu lỗi rõ ràng giúp cả xưởng tìm ra chỗ cần sửa.'],
      ['kg', '1–2 năm làm ở nhà máy', 'Người từng đứng chuyền hiểu lỗi sinh ra từ đâu.'],
      ['td', 'Cẩn thận, thấy lỗi là báo ngay', 'Một lỗi bị giấu có thể làm cả lô hàng bị trả về.']] },
  { id: 'baotri', k: 'vn', gr: 'sx', co: 'Công ty TNHH Mỏ Neo Kikai', ng: 'Cơ khí chế tạo', vt: 'Nhân viên bảo trì máy, N3', at: 'KCN Long Thành, Đồng Nai', lu: '12–15 triệu đồng/tháng', iv: 'vn',
    job: 'Bảo trì máy theo lịch, sửa khi máy dừng, ghi sổ bảo trì.',
    req: [['jp', 'JLPT N3', 'Tài liệu máy và quản lý đều dùng tiếng Nhật.'],
      ['cm', 'Đọc được sơ đồ điện, cơ khí', 'Hiểu máy chạy thế nào mới tìm ra chỗ hỏng nhanh.'],
      ['kn', 'Tìm nguyên nhân khi máy hỏng', 'Sửa đúng gốc thì máy không hỏng lại.'],
      ['kg', '1–2 năm bảo trì hoặc đứng máy', 'Công ty cần người đã quen tay với máy thật.'],
      ['td', 'Giữ 5S, sẵn sàng làm ca đêm', 'Máy dừng lúc nào cũng phải có người xử lý.']] },
  { id: 'kumi', k: 'jp', gr: 'sx', co: 'Umikaze Seisakusho', ng: 'Linh kiện ô tô', vt: 'Tổ trưởng chuyền · Kỹ năng đặc định 2', at: 'Tỉnh Aichi, Nhật Bản', lu: '250.000–320.000 yên/tháng', iv: 'xuong',
    job: 'Chia việc cho tổ, kèm người mới, báo cáo trưởng xưởng.',
    req: [['jp', 'Đủ tiếng Nhật để kèm người mới (khoảng N3)', 'Tổ trưởng phải giải thích việc cho người mới và báo cáo cấp trên.'],
      ['cm', 'Đậu kỳ thi Kỹ năng đặc định 2 ngành sản xuất', 'Có diện số 2, bạn được ở lâu dài và đưa vợ hoặc chồng, con sang.'],
      ['kn', 'Chia việc theo kế hoạch sản xuất trong ngày', 'Tổ chạy đều thì cả chuyền mới kịp tiến độ.'],
      ['kg', 'Nhiều năm ở xưởng, từng chỉ dẫn người khác', 'Diện số 2 cần kinh nghiệm thật, không chỉ điểm thi.'],
      ['td', 'Đi làm đều, giữ an toàn cho cả tổ', 'Tổ trưởng là người cả tổ nhìn vào để làm theo.']] },
  { id: 'kikai', k: 'jp', gr: 'sx', co: 'Minato Kogyo', ng: 'Gia công kim loại', vt: 'Nhân viên đứng máy · Kỹ năng đặc định 1', at: 'Tỉnh Gifu, Nhật Bản', lu: '200.000–240.000 yên/tháng', iv: 'hr',
    job: 'Đứng máy gia công, kiểm tra hàng, giữ khu làm việc sạch.',
    req: [['jp', 'JLPT N4 trở lên (hoặc JFT-Basic)', 'Đây là mức tối thiểu của diện số 1. Giỏi hơn thì làm việc dễ hơn.'],
      ['cm', 'Đậu thi tay nghề, hoặc xong thực tập kỹ năng số 2 đúng nghề', 'Công ty cần biết bạn làm được việc ngay.'],
      ['kn', 'Đọc bảng chỉ thị công việc', 'Làm sai một bước trên bảng là sai cả lô hàng.'],
      ['kg', 'Từng làm ở xưởng Nhật là lợi thế', 'Bạn đã quen quy trình, công ty tốn ít thời gian dạy.'],
      ['td', 'Làm đúng quy trình, không tự bỏ bước', 'Ở xưởng Nhật, an toàn và chất lượng đến từ làm đúng từng bước.']] },
  /* Xây dựng */
  { id: 'ct', k: 'vn', gr: 'xd', co: 'Công ty Cánh Buồm Kensetsu', ng: 'Xây dựng nhà xưởng', vt: 'Kỹ thuật viên hỗ trợ công trường, N3', at: 'Hà Nội', lu: 'Đến 20 triệu đồng/tháng', iv: 'vn',
    job: 'Theo dõi công trường, báo cáo tiến độ cho kỹ sư người Nhật.',
    req: [['jp', 'JLPT N3, có chứng chỉ', 'Bạn trao đổi với kỹ sư Nhật mỗi ngày.'],
      ['cm', 'Đọc bản vẽ, dùng AutoCAD cơ bản', 'Bản vẽ là ngôn ngữ chung của công trường.'],
      ['kn', 'Báo cáo tiến độ mỗi ngày', 'Công trình trễ một ngày là tốn tiền của cả dự án.'],
      ['kg', 'Ít nhất 1 năm ở công trường Nhật', 'Công ty muốn người đã quen an toàn và nhịp làm kiểu Nhật.'],
      ['td', 'Giữ an toàn tuyệt đối, họp đầu ca đầy đủ', 'Ở công trường, một lần chủ quan có thể gây tai nạn.']] },
  { id: 'ksxd', k: 'vn', gr: 'xd', co: 'Công ty TNHH Hải Đăng Sekkei', ng: 'Thiết kế, thi công', vt: 'Kỹ sư hỗ trợ thiết kế, quản lý thi công, N3', at: 'TP.HCM, Hà Nội, Đà Nẵng', lu: '28–35 triệu đồng/tháng', iv: 'vn',
    job: 'Vẽ, sửa bản vẽ, theo dõi thi công cho dự án của khách Nhật.',
    req: [['jp', 'JLPT N3 trở lên', 'Bạn họp với khách Nhật, đọc tài liệu kỹ thuật.'],
      ['cm', 'Bằng cao đẳng, đại học ngành xây dựng', 'Vị trí kỹ sư cần nền kiến thức học bài bản.'],
      ['kn', 'Dùng thành thạo AutoCAD', 'Bản vẽ đúng giúp thợ làm đúng ngay từ đầu.'],
      ['kg', 'Từng làm ở công trường Nhật', 'Bạn hiểu tiêu chuẩn của khách Nhật.'],
      ['td', 'Đúng hẹn, báo trước khi có vấn đề', 'Khách Nhật rất coi trọng lời hứa về thời gian.']] },
  { id: 'xd1', k: 'jp', gr: 'xd', co: 'Kaigan Kensetsu', ng: 'Xây dựng', vt: 'Thợ xây dựng · Kỹ năng đặc định 1', at: 'Tỉnh Saitama, Nhật Bản', lu: 'Từ 220.000 yên/tháng', iv: 'hr',
    job: 'Làm ở nhiều công trình theo tổ: lắp dựng, hoàn thiện.',
    req: [['jp', 'JLPT N4 trở lên (hoặc JFT-Basic)', 'Nghe hiểu chỉ dẫn an toàn trên công trường.'],
      ['cm', 'Đậu thi tay nghề, hoặc xong thực tập kỹ năng số 2', 'Công ty cần biết bạn làm được việc ngay.'],
      ['kn', 'Dùng đúng dụng cụ, đồ bảo hộ', 'Dùng sai một dụng cụ có thể gây tai nạn.'],
      ['kg', 'Từng làm ở công trường Nhật là lợi thế', 'Bạn đã quen họp sáng, kiểm tra an toàn đầu ca.'],
      ['td', 'Đúng giờ, làm ăn ý với cả tổ', 'Công trình chạy được nhờ cả tổ cùng nhịp.']] },
  { id: 'xd2', k: 'jp', gr: 'xd', co: 'Kaigan Kensetsu', ng: 'Xây dựng', vt: 'Trưởng nhóm thợ · Kỹ năng đặc định 2', at: 'Tỉnh Saitama, Nhật Bản', lu: '250.000–320.000 yên/tháng', iv: 'xuong',
    job: 'Dẫn một nhóm thợ, chia việc, giữ tiến độ và an toàn.',
    req: [['jp', 'Đủ tiếng Nhật để họp, chỉ dẫn thợ (khoảng N3)', 'Trưởng nhóm là cầu nối giữa quản lý và thợ.'],
      ['cm', 'Đậu thi Kỹ năng đặc định 2 hoặc tay nghề bậc 1', 'Đây là điều kiện để lên diện số 2.'],
      ['kn', 'Lập lịch làm việc cho nhóm', 'Nhóm làm đúng lịch thì công trình không trễ.'],
      ['kg', 'Từng làm trưởng nhóm (班長) ở công trường', 'Diện số 2 ngành xây dựng yêu cầu kinh nghiệm này.'],
      ['td', 'Nhắc an toàn, quan tâm người mới', 'Người mới là người dễ gặp tai nạn nhất.']] },
  /* Thực phẩm, nông nghiệp */
  { id: 'qatp', k: 'vn', gr: 'tp', co: 'Công ty Sao Biển Foods', ng: 'Chế biến thực phẩm', vt: 'Nhân viên QA/QC thực phẩm, N3', at: 'KCN Nhơn Trạch, Đồng Nai', lu: 'Khoảng 12 triệu đồng/tháng', iv: 'vn',
    job: 'Kiểm tra nguyên liệu, vệ sinh xưởng, ghi kết quả kiểm tra.',
    req: [['jp', 'JLPT N3 đến N2', 'Quy trình và khách hàng đều dùng tiếng Nhật.'],
      ['cm', 'Hiểu vệ sinh an toàn thực phẩm (HACCP)', 'Một sai sót vệ sinh có thể làm cả lô hàng bị hủy.'],
      ['kn', 'Ghi chép, kiểm tra theo bảng', 'Ghi đủ, đúng thì khi có lỗi mới truy lại được.'],
      ['kg', 'Từng làm ở nhà máy thực phẩm', 'Bạn đã quen quy định ra vào khu sạch.'],
      ['td', 'Trung thực khi ghi kết quả', 'Người mua tin vào con số bạn ghi.']] },
  { id: 'nn', k: 'vn', gr: 'tp', co: 'Nông trại Sóng Xanh (vốn Nhật)', ng: 'Nông nghiệp', vt: 'Kỹ thuật viên nông trại', at: 'Đồng Nai', lu: '11–13 triệu đồng/tháng', iv: 'vn',
    job: 'Lên lịch trồng, chăm cây, theo dõi nước, phân, ghi nhật ký vườn.',
    req: [['jp', 'Tiếng Nhật N3 là lợi thế', 'Bạn làm việc cùng chuyên gia nông nghiệp người Nhật.'],
      ['cm', 'Hiểu cách chăm cây, đất, nước', 'Mỗi loại cây cần cách chăm khác nhau.'],
      ['kn', 'Ghi nhật ký vườn, lập kế hoạch trồng', 'Ghi lại giúp mùa sau trồng tốt hơn.'],
      ['kg', 'Từng làm nông trại ở Nhật hoặc 1 năm ở trang trại', 'Bạn biết trồng sạch, đều, đúng lịch.'],
      ['td', 'Chịu nắng mưa, làm đều mỗi ngày', 'Cây không chờ người, ngày nào cũng cần chăm.']] },
  { id: 'tp1', k: 'jp', gr: 'tp', co: 'Hamakaze Foods', ng: 'Chế biến thực phẩm', vt: 'Nhân viên xưởng cơm hộp · Kỹ năng đặc định 1', at: 'Tỉnh Saitama, Nhật Bản', lu: '200.000–240.000 yên/tháng', iv: 'hr',
    job: 'Chế biến, xếp cơm hộp theo ca, giữ vệ sinh khu làm.',
    req: [['jp', 'JLPT N4 trở lên (hoặc JFT-Basic)', 'Đọc biển báo, quy định vệ sinh trong xưởng.'],
      ['cm', 'Đậu thi tay nghề ngành Thực phẩm, hoặc xong thực tập kỹ năng số 2', 'Công ty cần biết bạn làm được việc ngay.'],
      ['kn', 'Làm nhanh mà vẫn đúng định lượng', 'Mỗi hộp phải giống nhau, giao đúng giờ.'],
      ['kg', 'Từng làm xưởng thực phẩm là lợi thế', 'Bạn đã quen rửa tay, mặc đồ sạch đúng cách.'],
      ['td', 'Giữ vệ sinh tuyệt đối', 'Một sơ suất có thể làm nhiều người bị ngộ độc.']] },
  { id: 'nn1', k: 'jp', gr: 'tp', co: 'Nông trại Midori', ng: 'Trồng rau', vt: 'Nhân viên nông trại · Kỹ năng đặc định 1', at: 'Tỉnh Kumamoto, Nhật Bản', lu: '190.000–230.000 yên/tháng', iv: 'hr',
    job: 'Trồng, thu hoạch, đóng gói rau. Việc nhiều ít theo mùa.',
    req: [['jp', 'JLPT N4 trở lên (hoặc JFT-Basic)', 'Hiểu chỉ dẫn của chủ nông trại.'],
      ['cm', 'Đậu thi tay nghề ngành Nông nghiệp, hoặc xong thực tập kỹ năng số 2', 'Công ty cần biết bạn làm được việc ngay.'],
      ['kn', 'Dùng máy nông nghiệp nhỏ', 'Nông trại Nhật dùng máy để làm nhanh, ít người.'],
      ['kg', 'Từng làm nông trại', 'Bạn biết việc theo mùa: lúc rất bận, lúc rảnh hơn.'],
      ['td', 'Dậy sớm, chịu nắng mưa', 'Việc nông trại bắt đầu từ sáng sớm.']] },
  /* Kaigo */
  { id: 'gvkg', k: 'vn', gr: 'kg', co: 'Học viện Kaigo Hải Đăng', ng: 'Đào tạo', vt: 'Giáo viên Kaigo', at: 'TP.HCM', lu: 'Khoảng 20 triệu đồng/tháng', iv: 'gv',
    job: 'Dạy kỹ năng chăm sóc và tiếng Nhật cho học viên sắp sang Nhật.',
    req: [['jp', 'JLPT N3 trở lên', 'Bạn dạy cả từ ngữ chăm sóc bằng tiếng Nhật.'],
      ['cm', 'Nắm quy trình chăm sóc kiểu Nhật', 'Học viên cần học đúng ngay từ đầu.'],
      ['kn', 'Soạn bài, đứng lớp, chấm bài', 'Dạy dễ hiểu thì học viên mới tự tin sang Nhật.'],
      ['kg', 'Đã làm Kaigo ở Nhật', 'Chuyện thật của bạn giúp học viên hiểu việc hơn sách.'],
      ['td', 'Kiên nhẫn, làm gương cho học viên', 'Học viên học cả cách bạn làm việc.']] },
  { id: 'pk', k: 'vn', gr: 'kg', co: 'Phòng khám Bến Cảng (vốn Nhật)', ng: 'Y tế', vt: 'Nhân viên hỗ trợ khách Nhật', at: 'Hà Nội', lu: '10–15 triệu đồng/tháng', iv: 'vn',
    job: 'Đón khách Nhật, đặt lịch, đi cùng và dịch khi khám.',
    req: [['jp', 'Tiếng Nhật giao tiếp (khoảng N3)', 'Khách Nhật lo lắng khi bệnh, cần người nói được tiếng mình.'],
      ['cm', 'Biết từ ngữ y tế, chăm sóc cơ bản', 'Dịch sai một triệu chứng có thể ảnh hưởng tới việc khám.'],
      ['kn', 'Hướng dẫn, đặt lịch, ghi hồ sơ', 'Khách đi đúng chỗ, đúng giờ thì đỡ mệt.'],
      ['kg', 'Từng chăm sóc người già, người bệnh', 'Bạn biết cách nói nhẹ nhàng, kiên nhẫn.'],
      ['td', 'Ân cần, giữ bí mật thông tin của khách', 'Thông tin sức khỏe là chuyện riêng của khách.']] },
  { id: 'kg1', k: 'jp', gr: 'kg', co: 'Viện dưỡng lão Hidamari', ng: 'Chăm sóc người cao tuổi', vt: 'Nhân viên Kaigo · Kỹ năng đặc định 1', at: 'Tỉnh Osaka, Nhật Bản', lu: '200.000–240.000 yên/tháng', iv: 'hr',
    job: 'Giúp người già ăn, tắm, đi lại. Làm theo ca, có ca đêm.',
    req: [['jp', 'Đậu thi tiếng Nhật ngành Kaigo và N4 (hoặc JFT-Basic)', 'Bạn nói chuyện với người già mỗi ngày.'],
      ['cm', 'Đậu thi kỹ năng Kaigo, hoặc xong thực tập kỹ năng số 2 ngành Kaigo', 'Chăm sóc sai cách có thể làm người già bị đau, bị ngã.'],
      ['kn', 'Ghi sổ theo dõi sau mỗi ca', 'Ca sau biết hôm nay người già ra sao.'],
      ['kg', 'Từng chăm sóc người già, người bệnh', 'Bạn đã quen việc vừa nặng vừa cần nhẹ tay.'],
      ['td', 'Tôn trọng, giữ thể diện cho người già', 'Người già cần được đối xử như người lớn, không như trẻ con.']] },
  { id: 'kg2', k: 'jp', gr: 'kg', co: 'Viện dưỡng lão Hidamari', ng: 'Chăm sóc người cao tuổi', vt: 'Hộ lý có bằng quốc gia · visa Kaigo', at: 'Tỉnh Osaka, Nhật Bản', lu: '240.000–300.000 yên/tháng', iv: 'hr',
    job: 'Chăm sóc, lập kế hoạch chăm sóc, kèm nhân viên mới.',
    req: [['jp', 'JLPT N2 trở lên', 'Bạn đọc, viết hồ sơ chăm sóc, nói chuyện với gia đình người già.'],
      ['cm', 'Đậu kỳ thi quốc gia Hộ lý (介護福祉士)', 'Có bằng này, bạn được visa Kaigo, ở lâu dài, đưa gia đình sang.'],
      ['kn', 'Lập kế hoạch chăm sóc, kèm người mới', 'Bạn là người giữ chất lượng cho cả nhóm.'],
      ['kg', 'Ít nhất 3 năm làm Kaigo, học thêm khóa thực hành', 'Đây là điều kiện để được dự thi quốc gia.'],
      ['td', 'Lắng nghe người già và gia đình họ', 'Chăm sóc tốt bắt đầu từ hiểu người mình chăm.']] },
  /* Nhà hàng, khách sạn, vệ sinh tòa nhà */
  { id: 'nh', k: 'vn', gr: 'dv', co: 'Nhà hàng Washoku La Bàn', ng: 'Nhà hàng Nhật', vt: 'Quản lý nhà hàng, N3', at: 'TP.HCM', lu: '18–20 triệu đồng/tháng', iv: 'vn',
    job: 'Quản lý ca, nhân viên phục vụ, chăm sóc khách Nhật.',
    req: [['jp', 'JLPT N3, giao tiếp tốt', 'Nhiều khách và chủ nhà hàng là người Nhật.'],
      ['cm', 'Hiểu món ăn, cách phục vụ kiểu Nhật', 'Khách Nhật để ý từng chi tiết nhỏ.'],
      ['kn', 'Xếp ca, kèm nhân viên mới', 'Nhà hàng đông khách cần đủ người đúng giờ.'],
      ['kg', 'Từng làm nhà hàng Nhật', 'Bạn đã quen nhịp làm và yêu cầu của khách Nhật.'],
      ['td', 'Đón khách chu đáo (omotenashi)', 'Khách hài lòng sẽ quay lại và giới thiệu thêm.']] },
  { id: 'ks', k: 'vn', gr: 'dv', co: 'Khách sạn Sakura Bến Cảng', ng: 'Khách sạn', vt: 'Lễ tân tiếng Nhật', at: 'Đà Nẵng', lu: '8–12 triệu đồng/tháng', iv: 'vn',
    job: 'Đón khách, nhận, trả phòng, giải đáp thắc mắc của khách Nhật.',
    req: [['jp', 'Nói chuyện với khách Nhật (khoảng N3)', 'Khách Nhật yên tâm hơn khi được nói tiếng mình.'],
      ['cm', 'Biết đặt phòng, thanh toán', 'Sai một đặt phòng là khách mất chỗ ngủ.'],
      ['kn', 'Tiếng Anh giao tiếp cơ bản', 'Khách sạn có khách nhiều nước.'],
      ['kg', 'Từng làm khách sạn, nhà hàng ở Nhật là lợi thế', 'Bạn hiểu cách người Nhật phục vụ khách.'],
      ['td', 'Mỉm cười, bình tĩnh khi khách phàn nàn', 'Cách bạn xử lý phàn nàn quyết định khách có quay lại không.']] },
  { id: 'hotel', k: 'jp', gr: 'dv', co: 'Khách sạn suối nóng Yamabiko', ng: 'Khách sạn', vt: 'Nhân viên khách sạn · Kỹ năng đặc định 1 ngành Lưu trú', at: 'Tỉnh Nagano, Nhật Bản', lu: '200.000–240.000 yên/tháng', iv: 'hr',
    job: 'Đón khách, phục vụ bữa ăn, dọn phòng. Làm theo ca.',
    req: [['jp', 'JLPT N4 trở lên (hoặc JFT-Basic)', 'Bạn nói chuyện với khách mỗi ngày.'],
      ['cm', 'Đậu thi tay nghề ngành Lưu trú', 'Đây là điều kiện của diện này.'],
      ['kn', 'Phục vụ bàn, dọn phòng đúng chuẩn', 'Khách Nhật để ý từng chi tiết nhỏ.'],
      ['kg', 'Từng làm nhà hàng, khách sạn', 'Bạn đã quen làm theo ca, cả ngày lễ.'],
      ['td', 'Lễ phép, chu đáo với khách', 'Khách sạn sống nhờ khách quay lại.']] },
  { id: 'clean', k: 'jp', gr: 'dv', co: 'Kirei Building Service', ng: 'Vệ sinh tòa nhà', vt: 'Nhân viên vệ sinh tòa nhà · Kỹ năng đặc định 1', at: 'Tokyo, Nhật Bản', lu: '190.000–230.000 yên/tháng', iv: 'hr',
    job: 'Làm sạch văn phòng, khách sạn, bệnh viện bằng máy và hóa chất đúng cách.',
    req: [['jp', 'JLPT N4 trở lên (hoặc JFT-Basic)', 'Hiểu cách dùng hóa chất, biển báo an toàn.'],
      ['cm', 'Đậu thi tay nghề, hoặc xong thực tập kỹ năng số 2 ngành này', 'Công ty cần biết bạn làm được việc ngay.'],
      ['kn', 'Dùng máy, hóa chất đúng loại', 'Dùng sai hóa chất có thể làm hỏng sàn, hại sức khỏe.'],
      ['kg', 'Từng làm vệ sinh tòa nhà là lợi thế', 'Bạn đã quen quy trình của từng loại phòng.'],
      ['td', 'Kỹ lưỡng cả ở chỗ khuất', 'Khách đánh giá công ty qua những góc nhỏ.']] },
  /* Mọi ngành */
  { id: 'tv', k: 'vn', gr: 'all', co: 'Công ty TNHH Hải Âu Denshi', ng: 'Sản xuất', vt: 'Phiên dịch tiếng Nhật tại xưởng, N2', at: 'Bình Dương', lu: '13–22 triệu đồng/tháng', iv: 'vn',
    job: 'Dịch cho quản lý người Nhật trong họp, đào tạo, xử lý lỗi.',
    req: [['jp', 'JLPT N2 trở lên', 'Bạn phải nghe kịp người Nhật nói nhanh, dịch đúng ý.'],
      ['cm', 'Hiểu từ chuyên ngành của xưởng', 'Dịch sai một từ kỹ thuật có thể làm hỏng cả lô hàng.'],
      ['kn', 'Dịch giấy tờ, dùng Word, Excel', 'Ngoài nói, bạn còn dịch quy trình, báo cáo.'],
      ['kg', 'Từng làm việc ở Nhật là lợi thế', 'Bạn hiểu cách người Nhật nghĩ, nên dịch được cả ý.'],
      ['td', 'Bình tĩnh, giữ trung lập', 'Khi hai bên bất đồng, bạn là cầu nối.']] },
  { id: 'kanri', k: 'jp', gr: 'all', co: 'Hiệp hội hỗ trợ Asahi', ng: 'Hỗ trợ người lao động nước ngoài', vt: 'Thông dịch, hỗ trợ thực tập sinh', at: 'Tokyo, Nhật Bản', lu: '230.000–300.000 yên/tháng', iv: 'hr',
    job: 'Đi thăm các công ty, giúp người lao động Việt, dịch giấy tờ.',
    req: [['jp', 'JLPT N2 trở lên', 'Bạn dịch giấy tờ, họp với công ty và cơ quan nhà nước.'],
      ['cm', 'Thường cần bằng đại học', 'Đây là điều kiện thường gặp của visa Kỹ thuật, Tri thức nhân văn, Nghiệp vụ quốc tế.'],
      ['kn', 'Lái xe ở Nhật, dùng máy tính', 'Bạn đi thăm nhiều công ty ở xa ga tàu.'],
      ['kg', 'Từng là thực tập sinh là lợi thế', 'Bạn hiểu nỗi lo của người mới sang.'],
      ['td', 'Công bằng, giữ bí mật cho cả hai bên', 'Người lao động và công ty đều phải tin bạn.']] }
];
var AD_SRC = 'Tin giả định, ghép từ tin tuyển dụng thật năm 2026. Tên công ty là tên giả định. Lương chỉ để tham khảo, mỗi nơi mỗi khác.';
var AD_SRC_JP = 'Lương ở Nhật tính trước thuế, bảo hiểm. Năm 2025, người diện Kỹ năng đặc định nhận trung bình khoảng 221.000 yên/tháng (Bộ Y tế, Lao động và Phúc lợi Nhật Bản).';
/* ghi chú theo nhóm ngành, chỉ hiện với Tin ở Nhật (nguồn: Cục Quản lý Xuất nhập cảnh Nhật Bản, 27/3/2026) */
var AD_NOTE = { dv: 'Lưu ý: từ 13/4/2026, Nhật tạm dừng cấp mới diện Kỹ năng đặc định 1 ngành Nhà hàng cho người ở nước ngoài, vì đã gần đủ số người. Hãy theo dõi tin mới.' };
/* Kế hoạch kinh doanh 1 trang của một người về nước · NHÂN VẬT GHÉP (không phải người thật). Không ghi số tiền. */
var PLANS = [
  { id: 'baotri', n: 'Dịch vụ bảo trì máy cho nhà xưởng', who: 'Anh Phúc · 3 năm làm cơ khí ở Nhật', g: ['co-khi', 'dien-tu', 'o-to', 'han', 'duc-nhua', 'dong-goi-cong-nghiep', 'in-an', 'son'],
    L: { kh: 'Xưởng Nhật nhỏ trong khu công nghiệp gần nhà, cần sửa máy nhanh.', tm: 'Quen bảo trì kiểu Nhật, báo cáo được bằng tiếng Nhật.', von: 'Tiền để dành 3 năm và gia đình góp. Giữ tiền dự phòng 6 tháng.', rr: 'Chưa ghi.', thu: 'Làm thêm cuối tuần cho 2 xưởng quen trước khi mở.' } },
  { id: 'banh', n: 'Tiệm bánh nhỏ kiểu Nhật', who: 'Chị Mai Anh · 3 năm làm bánh ở Nhật', g: ['thuc-pham', 'nha-hang', 'thuy-san', 'nong-nghiep'],
    L: { kh: 'Học sinh, người đi làm quanh khu chợ.', tm: 'Bánh sạch, đều tay, giao đúng giờ.', von: 'Thuê mặt bằng nhỏ, mua lò cũ. Chưa tính tiền dự phòng.', rr: 'Nhiều tiệm gần đó, giá bột có thể tăng.', thu: 'Bán online ở nhà 2 tháng trước khi thuê mặt bằng.' } },
  { id: 'noithat', n: 'Đội thi công nội thất nhỏ', who: 'Anh Tuấn · 3 năm làm xây dựng ở Nhật', g: ['xay-dung', 'son', 'may-mac', 've-sinh-toa-nha'],
    L: { kh: 'Ai cần sửa nhà cũng được.', tm: 'Làm đúng hẹn, gọn, an toàn như ở Nhật.', von: 'Dụng cụ mang từ Nhật về, tiền để dành. Dự phòng 3 tháng.', rr: 'Lúc nhiều việc thì thiếu thợ giỏi.', thu: 'Chưa có.' } }
];
var PLAN_ROW = [['kh', 'Khách hàng'], ['tm', 'Thế mạnh mang từ Nhật'], ['von', 'Vốn và tiền dự phòng'], ['rr', 'Rủi ro'], ['thu', 'Thử nhỏ trước']];
var PLAN_MARK = [['r', 'Rõ'], ['m', 'Mơ hồ'], ['t', 'Thiếu']];
var PLAN_INV = [['co', 'Có'], ['chua', 'Chưa, cần rõ hơn'], ['khong', 'Không']];
var PLAN_PREP = ['Để dành vốn và tiền dự phòng', 'Học quy trình, cách quản lý ở công ty', 'Tìm hiểu khách hàng ở quê', 'Lên N2 để làm với khách Nhật', 'Ghi sổ chi phí, tập tính lời lỗ'];
var PLAN_SP = [['hoi', 'Làm ở công ty bạn của sếp 6–7 tháng rồi mới lập công ty.'], ['thao', 'Bắt đầu từ một xe bánh nhỏ.'], ['vinh', 'Dự án đầu dừng vì dịch, chị làm lại.']];

/* Phỏng vấn 3 năm sau: người phỏng vấn theo hướng đi (isl = mã đảo), q = 3 câu gợi ý sẵn (đổi được) */
var IV_WHO = [
  { id: 'xuong', n: 'Trưởng xưởng người Nhật', ctx: 'Bạn xin ở lại, thi lên Kỹ năng đặc định 2.', isl: ['len'], q: ['kaizen', 'kohai', 'long'] },
  { id: 'hr', n: 'Nhân sự công ty mới ở Nhật', ctx: 'Bạn xin vào một công ty mới ở Nhật.', isl: ['re', 'gio'], q: ['why', 'jp', 'hard'] },
  { id: 'vn', n: 'Giám đốc người Nhật và chị nhân sự', ctx: 'Công ty Nhật ở Việt Nam tuyển người từng làm ở Nhật.', isl: ['cau', 'que'], q: ['kaizen', 'jp', 'long'] },
  { id: 'gv', n: 'Thầy cô tuyển sinh', ctx: 'Bạn xin vào học ở một trường.', isl: ['hoc', 'chu'], q: ['school', 'jp', 'why'] },
  { id: 'kh', n: 'Giám đốc xưởng Nhật', ctx: 'Bạn tới chào dịch vụ của xưởng mình.', isl: ['lap'], q: ['client', 'kaizen', 'why'] }
];
/* jp: câu tiếng Nhật (nút Nghe đọc bằng giọng máy) · ev: bằng chứng cần có · more: người phỏng vấn hay hỏi thêm */
var IV_Q = [
  { id: 'kaizen', jp: '3年間で、どんな改善をしましたか。', vi: '3 năm ở Nhật, bạn đã cải tiến được gì?', ev: 'Một cải tiến có kết quả, ghi lại được', more: 'Nếu làm lại, bạn cải tiến thêm gì?' },
  { id: 'jp', jp: '日本語はどのくらいできますか。資格はありますか。', vi: 'Tiếng Nhật của bạn tới đâu? Có chứng chỉ gì?', ev: 'Chứng chỉ tiếng Nhật (N3, N2…)', more: 'Bạn đọc được hướng dẫn công việc bằng tiếng Nhật không?' },
  { id: 'why', jp: 'どうしてこの道を選びましたか。', vi: 'Vì sao bạn chọn hướng này?', ev: 'Lý do rõ ràng, gia đình đồng ý', more: 'Gia đình bạn nghĩ sao?' },
  { id: 'long', jp: 'ここでどのくらい働くつもりですか。', vi: 'Bạn định làm ở đây bao lâu?', ev: 'Kế hoạch 5 năm rõ ràng', more: '5 năm sau bạn muốn làm vị trí nào?' },
  { id: 'hard', jp: '仕事で一番大変だったことは何ですか。', vi: 'Ở chỗ làm, việc khó nhất là gì? Bạn vượt qua thế nào?', ev: 'Một lần vượt khó, có người biết', more: 'Ai đã giúp bạn lúc đó?' },
  { id: 'kohai', jp: '後輩に仕事を教えたことはありますか。', vi: 'Bạn đã từng kèm người mới chưa?', ev: 'Kinh nghiệm kèm người mới', more: 'Người mới hay sai ở đâu?' },
  { id: 'school', jp: 'どうしてこの学校で勉強したいのですか。', vi: 'Vì sao bạn muốn học ở trường này?', ev: 'Đủ tiền học, biết rõ học để làm gì', more: 'Học xong bạn sẽ làm gì?' },
  { id: 'whyjob', jp: 'どうしてこの仕事を希望しましたか。', vi: 'Vì sao bạn muốn làm công việc này?', ev: 'Lý do rõ ràng, gắn với 3 năm ở Nhật', more: 'Làm việc này, 5 năm sau bạn muốn ở vị trí nào?' },
  { id: 'client', jp: 'どうしてあなたの会社に仕事を頼むといいですか。', vi: 'Vì sao tôi nên chọn dịch vụ của bạn?', ev: 'Khách hàng đầu tiên, dù nhỏ', more: 'Bạn đã làm cho khách nào chưa?' }
];
var IV_BOX = [['do', 'Việc mình đã làm'], ['res', 'Kết quả, con số'], ['learn', 'Mình học được gì']];
var IV_EV = [['co', 'Có'], ['se', 'Sẽ có nếu cố'], ['chua', 'Chưa']];
var IV_SAY = [['ok', 'Được'], ['part', 'Một phần'], ['no', 'Chưa']];
/* PS1.3.46: câu hỏi phỏng vấn bám yêu cầu của tin (theo nhóm AD_RG). {r} = yêu cầu trong tin. */
var IV_RQ = {
  jp: { jp: '日本語はどのくらいできますか。資格はありますか。', vi: 'Tin cần “{r}”. Tiếng Nhật của bạn tới đâu? Có chứng chỉ gì?', more: 'Bạn đọc được hướng dẫn công việc bằng tiếng Nhật không?' },
  cm: { jp: 'この仕事に必要な技能は、どうやって身につけましたか。', vi: 'Tin cần “{r}”. Bạn có được điều này bằng cách nào?', more: 'Bạn có giấy tờ, chứng chỉ nào chứng minh không?' },
  kn: { jp: 'その技能を使った経験を、具体的に教えてください。', vi: 'Tin cần “{r}”. Kể một lần bạn đã làm việc này.', more: 'Lần đó kết quả thế nào? Có con số không?' },
  kg: { jp: '日本では、どんな仕事をしてきましたか。', vi: 'Tin cần “{r}”. Ở Nhật, bạn đã làm những việc gì?', more: 'Việc khó nhất ở đó là gì? Bạn vượt qua thế nào?' },
  td: { jp: '仕事で大切にしていることは何ですか。', vi: 'Tin cần “{r}”. Kể một lần bạn đã làm như vậy.', more: 'Nếu cấp trên không có mặt, bạn sẽ làm gì?' }
};
/* timeline dọc ở b63 (PS1.3.46): 0 = bây giờ ở JPC, 4 = sau 3 năm */
var PLAN3_Y = [['0', 'Bây giờ', 'Ở JPC'], ['1', 'Năm 1', 'Ở Nhật'], ['2', 'Năm 2', 'Ở Nhật'], ['3', 'Năm 3', 'Ở Nhật'], ['4', 'Sau 3 năm', 'Ứng tuyển']];

/* ---------- BẾN, VÒNG, CHẶNG ----------
   r: vòng (1 Khám phá: đi thứ tự tùy ý · 2 Thiết kế: lần lượt · 3 Ra khơi: tùy ý). ready: đã mở trong bản này.
   PS1.3.42 (bản 2, PA A): gộp b13 vào b12, b43 vào b42, b53 vào b63; thêm Bến 6 Phòng Tuyển Dụng (b61–b63); Ngọn Hải Đăng thành Bến 7 (b71–b72).
   Khóa dữ liệu cũ giữ nguyên tên (b13.*, b43.*, b53.*), xem ACT_KEYS trong engine. ship: vị trí thuyền so với bến [dx, dy].
   room: 1 = nơi trong nhà (Xưởng, Phòng): vào nghe chuông cửa + cửa trượt mở trên banner; còn lại là cảng, bến ngoài trời: chuông thuyền (PS1.3.43). */
var PORT = { id: 'p0', n: 'Cảng 3 Năm', ic: 'anchor', x: 180, y: 232, acts: ['x1'],
  intro: 'Chào [Tên]! Mọi hướng đi đều bắt đầu từ 3 năm ở Nhật.',
  why: ['Lúc này bạn nghĩ gì về 3 năm sau', 'Nhận thuyền, thiết kế cờ, viết mục tiêu', 'Điểm xuất phát của bạn'], aim: 'bạn đã có điểm xuất phát' };
var BEN = [
  { id: 'b1', n: 'Đài Vọng Biển', ic: 'scope', r: 1, x: 98, y: 100, ready: 1, acts: ['b11', 'b12'],
    sub: 'Sau 3 năm có những hướng nào?', intro: '[Tên] ơi, mình xem các anh chị đã đi những hướng nào nhé.',
    why: ['Sau 3 năm, người ta đi những hướng nào', 'Lật thẻ đoán, xem 8 hướng đi', 'Hướng bạn quan tâm nhất'], aim: 'bạn biết sau 3 năm có 8 hướng đi' },
  { id: 'b2', n: 'Bến Gặp Gỡ', ic: 'people', r: 1, x: 262, y: 92, ready: 1, acts: ['b21', 'b22', 'b23'],
    sub: 'Đọc · Xem · Hỏi anh chị đi trước', intro: 'Ở đây là chuyện thật của người thật. Nghe xong, bạn tự rút ra điều cho mình.',
    why: ['Các anh chị đi trước đã làm gì', 'Đọc chuyện, xem điểm chung, hỏi anh chị', 'Điều bạn muốn học theo, câu bạn muốn hỏi'], aim: 'bạn biết các anh chị đi trước đã xây nền thế nào' },
  { id: 'b3', n: 'Xưởng La Bàn', ic: 'compass', r: 2, room: 1, x: 286, y: 222, ready: 1, acts: ['b31', 'b32', 'b33'],
    sub: 'Điều gì quan trọng với mình?', intro: 'Trước khi vẽ kế hoạch, mình xem điều gì quan trọng nhất với bạn.',
    why: ['Điều gì quan trọng nhất với bạn', 'Kéo 6 cặp giá trị, xếp điều có thể làm đổi kế hoạch', 'La bàn của bạn'], aim: 'bạn biết điều mình coi trọng' },
  { id: 'b4', n: 'Phòng Hải Đồ', ic: 'map', r: 2, room: 1, x: 256, y: 340, ready: 1, acts: ['b41', 'b42'], sub: 'Vẽ 3 kế hoạch 5 năm',
    intro: 'Ở đây bạn vẽ 3 kế hoạch 5 năm. Chưa cần chọn, cứ vẽ cả ba.',
    why: ['5 năm sau khi xong 3 năm ở Nhật', 'Vẽ kế hoạch A, B, C và tự chấm', '3 kế hoạch 5 năm của bạn'], aim: 'bạn có 3 kế hoạch 5 năm' },
  { id: 'b5', n: 'Vịnh Ngã Rẽ', ic: 'wave', r: 3, x: 176, y: 408, ready: 1, acts: ['b51', 'b52', 'b53'], sub: 'Cân nhắc, gỡ khó, đứng giữa ngã rẽ',
    intro: 'Ở đây bạn tập cân nhắc giữa các kế hoạch, tập gỡ khi gặp khó, và thử chọn khi đứng giữa ngã rẽ.',
    why: ['Khi phải chọn, bạn giữ điều gì, buông điều gì', 'Cân 3 kế hoạch, gỡ một chuyện khó, chọn ở 4 ngã rẽ', 'Kế hoạch bạn nghiêng về, điều bạn nhận ra về mình'], aim: 'bạn biết mình hay giữ điều gì khi phải chọn' },
  { id: 'b6', n: 'Phòng Tuyển Dụng', ic: 'doc', r: 3, room: 1, x: 90, y: 338, ready: 1, acts: ['b61', 'b62', 'b63'], sub: 'Tin tuyển dụng, phỏng vấn 3 năm sau',
    intro: 'Giờ là 3 năm sau. Bạn đọc tin tuyển dụng, tập trả lời phỏng vấn, rồi lên kế hoạch 3 năm ở Nhật.',
    why: ['3 năm sau, nhà tuyển dụng cần gì ở bạn, và vì sao', 'Đọc 1 tin, tập phỏng vấn đúng tin đó, xếp dòng thời gian', 'Dòng thời gian từ JPC tới lúc ứng tuyển'], aim: 'bạn biết 3 năm ở Nhật cần chuẩn bị gì' },
  { id: 'b7', n: 'Ngọn Hải Đăng', ic: 'light', r: 3, x: 74, y: 218, ready: 1, acts: ['b71', 'b72', 'b73'], sub: 'Học từ người, công việc và chính mình',
    intro: 'Không ai đi một mình. Ở đây mình học từ người giúp mình, từ công việc, và từ chính mình.',
    why: ['Học từ người, từ công việc, từ chính mình thế nào', 'Vẽ vòng người giúp, đi một vòng chỗ làm, nhận việc khó, làm việc thử nhỏ', 'Người bạn sẽ gặp, câu “Tại sao?” bạn sẽ hỏi, việc thử nhỏ của bạn'], aim: 'bạn biết học từ người, từ việc và từ chính mình' }
];
/* Cảng Khởi Hành: mở khi đủ 7 con dấu bến. Không tính vào CD2_TOTAL (giống Ga Ước Mơ của CD01). */
var GOAL_PORT = { id: 'fin', n: 'Đảo Kho Báu', ic: 'flag', ready: 1, acts: ['f1', 'f2'], sub: 'Nhận Bằng Thuyền Trưởng Vững Vàng',
  intro: 'Bạn đã ghé đủ 7 bến! Kho báu ở đây chính là hướng đi bạn tự vẽ. Mình nhìn lại rồi nhận bằng nhé.',
  why: ['Bạn đã gom được gì qua 7 bến, 10 năm nữa bạn mong có gì', 'Mở rương kho báu, dán Bảng ước mơ, chọn việc trên bờ, xem bản Hướng đi của tôi', 'Món quý nhất trong rương, Bảng ước mơ, Hướng đi của tôi, Bằng Thuyền Trưởng Vững Vàng'], aim: 'bạn đã có hướng đi của riêng mình' };
var ROUNDS = { 1: 'Khám phá bản đồ · đi bến nào trước cũng được', 2: 'Thiết kế hải trình · đi lần lượt', 3: 'Dong buồm ra khơi · đi bến nào trước cũng được', 4: 'Vững tay về đích · nhận Bằng Thuyền Trưởng Vững Vàng' }; /* PS1.3.44: bỏ chữ “Vòng” (thầy chốt 21/11) */

/* Chặng: k = dạng bước (xem engine.js). Mỗi chặng 3–6 phút. */
var ACTS = {
  x1: { st: 'p0', t: 'Nhận thuyền', d: 'Cờ của bạn, bài CD01, điểm xuất phát', mins: 5, btn: 'Nhổ neo!',
    steps: [
      { k: 'say', mood: 'welcome', t: 'Chào [Tên]! Shin vừa xong 3 năm ở Nhật. Giờ Shin dẫn bạn đi xem các hướng đi sau 3 năm.' },
      { k: 'from' },
      { k: 'flag', q: 'Mỗi thuyền trưởng có một lá cờ. Thiết kế cờ của bạn nhé!' },
      { k: 'open1', q: 'Theo bạn, sau 3 năm ở Nhật, người ta có thể đi mấy hướng?', q2: 'Hướng đi sau 3 năm của bạn đã rõ mấy phần?', q3: 'Lúc này, bạn nghĩ sau 3 năm mình sẽ…', ph: 'Ví dụ: ở lại thêm 2 năm rồi về quê mở xưởng. Hoặc: chưa nghĩ tới.' },
      { k: 'write', key: 'x1.goal', q: 'Học xong CD02, bạn muốn mình có được điều gì?' },
      { k: 'card', t: 'Đây là Sổ Thuyền Trưởng. Mỗi bến ghé qua sẽ có một con dấu.' }
    ] },
  b11: { st: 'b1', t: 'Họ đi đâu sau 3 năm?', d: 'Lật 6 thẻ, đoán hướng đi của anh chị', mins: 4,
    steps: [
      { k: 'say', mood: 'curious', t: '6 anh chị này từng là học viên như bạn. Đoán xem sau 3 năm họ đi đâu. Trúng hay trật đều được.' },
      { k: 'flip' },
      { k: 'flipsum' }
    ] },
  b12: { st: 'b1', t: '8 hướng đi sau 3 năm', d: 'Xem từng hướng, chọn hướng bạn quan tâm nhất', mins: 6,
    steps: [
      { k: 'say', mood: 'think', t: 'Mỗi đảo là một hướng đi các anh chị đã chọn sau 3 năm. Chạm xem từng hướng rồi gắn nhãn theo cảm nhận của bạn.' },
      { k: 'isles' },
      { k: 'pickisle', key: 'b13.isl', q: 'Hướng nào làm bạn quan tâm nhất lúc này?', c1: ['far'] },
      { k: 'write', key: 'b13.why', q: 'Vì sao bạn quan tâm hướng [Đảo]?' }
    ] },
  b21: { st: 'b2', t: 'Đọc · chuyện 2 anh chị', d: '1 người cùng nghề, 1 người đi đường khác', mins: 5,
    steps: [
      { k: 'say', mood: 'hi', t: 'Bạn đọc chuyện 2 anh chị: 1 người cùng nghề với bạn, 1 người đi đường khác hẳn.' },
      { k: 'book', n: 1, same: 1, q: 'Người 1 · Cùng nghề [Nghề]', c1: ['senpai'] },
      { k: 'book', n: 2, same: 0, q: 'Người 2 · Đi đường khác' },
      { k: 'write', key: 'b21.take', q: 'Từ 2 câu chuyện này, bạn muốn mang theo điều gì?', c1: ['learn'] }
    ] },
  b22: { st: 'b2', t: 'Xem · điểm chung của anh chị', d: 'Chọn điều bạn thấy, xem ai đã kể', mins: 4,
    steps: [
      { k: 'clip', w: 'b22', mood: 'think' },
      { k: 'common' },
      { k: 'base', c1: ['work'] }
    ] },
  b23: { st: 'b2', t: 'Hỏi · phỏng vấn anh chị đi trước', d: 'Chọn 1 anh chị, hỏi 3 câu bạn tò mò', mins: 5,
    steps: [
      { k: 'chat', c1: ['qs'] },
      { k: 'write', key: 'b23.q', min: 8, q: 'Nếu được gặp một anh chị đi trước thật, bạn sẽ hỏi câu gì?', sub: 'Thầy cô sẽ gom câu hỏi của lớp cho buổi giao lưu.', ph: 'Ví dụ: Anh chị học tiếng Nhật thế nào sau giờ làm mệt?', shore: 's2' }
    ] },
  b31: { st: 'b3', t: 'Điều bạn coi trọng', d: '6 cặp, bên nào cũng tốt', mins: 4,
    steps: [
      { k: 'say', mood: 'think', t: 'Mỗi cặp, hai bên đều tốt. Kéo về phía bạn coi trọng hơn. Chưa chắc thì để giữa.' },
      { k: 'pairs' },
      { k: 'write', key: 'b31.why', q: 'Bạn nghiêng rõ nhất về “[Lệch]”. Vì sao?', c1: ['value'] }
    ] },
  b32: { st: 'b3', t: 'Điều có thể làm đổi kế hoạch', d: 'Tự viết, rồi đặt vào 2 vòng tròn', mins: 4,
    steps: [
      { k: 'say', mood: 'worry', t: 'Kế hoạch có thể đổi vì nhiều chuyện. Bạn tự viết 2–3 điều bạn lo, rồi xem điều nào mình giải quyết được.' },
      { k: 'winds', c1: ['worry'] },
      { k: 'winds2' }
    ] },
  b33: { st: 'b3', t: 'Lời thầy của Shin', d: 'Đường đời thầy vẽ, thành công với bạn là gì', mins: 5,
    steps: [
      { k: 'life' },
      { k: 'success' }, /* PS1.3.50: thay ô viết “Với bạn, đi làm là để…” (b33.work) */
      { k: 'write', key: 'b33.life', q: '10 năm nữa, một cuộc sống tốt với bạn là…', ph: 'Ví dụ: có nghề vững, ở gần ba mẹ.', c1: ['me'] },
      { k: 'compass', shore: 's3' }
    ] },
  b41: { st: 'b4', t: 'Kế hoạch A · Hướng đang nghĩ tới', d: 'Chưa chắc cũng được, cứ vẽ ra', mins: 4,
    steps: [
      { k: 'say', mood: 'think', t: 'Kế hoạch A là hướng bạn đang nghĩ tới. Mỗi kế hoạch dài 5 năm, tính từ lúc xong 3 năm ở Nhật.' },
      { k: 'voy', v: 'b41', c1: ['far', 'p2'] },
      { k: 'need', v: 'b41' },
      { k: 'tline', v: 'b41' },
      { k: 'meters', v: 'b41' }
    ] },
  b42: { st: 'b4', t: 'Kế hoạch B và C', d: 'B: nếu A khó thực hiện · C: nếu không phải lo nghĩ về tiền', mins: 6,
    steps: [
      { k: 'say', mood: 'worry', t: 'Giả sử kế hoạch A khó thực hiện, ví dụ: “[Gió]”. Bạn sẽ làm gì tiếp theo? B không phải đường kém hơn, chỉ là đường khác.' },
      { k: 'voy', v: 'b42', c1: ['b'] },
      { k: 'tline', v: 'b42' },
      { k: 'meters', v: 'b42' },
      { k: 'voy', v: 'b43', c1: ['like'], say: 'Giờ tưởng tượng: không phải lo nghĩ về tiền, không ai chê cười. Cứ mơ thoải mái.' },
      { k: 'tline', v: 'b43', short: 1 },
      { k: 'meters', v: 'b43', trio: 1 }
    ] },
  b51: { st: 'b5', t: 'Chọn kế hoạch nghiêng về', d: 'Cân 3 kế hoạch theo điều bạn coi trọng', mins: 4,
    steps: [
      { k: 'say', mood: 'think', t: 'Mình cân 3 kế hoạch nhé. Kết quả chỉ là gợi ý, không giống cảm giác của bạn cũng không sao.' },
      { k: 'weigh' },
      { k: 'leanpick' },
      { k: 'write', key: 'b51.why', q: 'Điều gì làm bạn nghiêng như vậy?' }
    ] },
  b52: { st: 'b5', t: 'Khi đường bị chặn', d: 'Tìm gốc rễ, nghĩ nhiều cách gỡ', mins: 5,
    steps: [
      { k: 'block' },
      { k: 'why3' },
      { k: 'ways' },
      { k: 'real' }
    ] },
  b53: { st: 'b5', t: 'Đứng giữa ngã rẽ', d: '4 ngã rẽ, bên nào cũng tốt. Bạn giữ gì, buông gì?', mins: 5,
    steps: [
      { k: 'say', mood: 'think', t: 'Ở mỗi ngã rẽ, hai bên đều tốt. Chọn bên nào thì cũng phải buông một thứ. Không có đáp án đúng.' },
      { k: 'cross', n: 0 },
      { k: 'cross', n: 1 },
      { k: 'cross', n: 2 },
      { k: 'cross', n: 3 },
      { k: 'crosssum' },
      { k: 'write', key: 'b53n.me', q: 'Điều mình nhận ra về bản thân khi phải chọn', ph: 'Ví dụ: mình hay giữ gia đình, kể cả khi phải bỏ một việc mới thú vị.', shore: 's5' }
    ] },
  b61: { st: 'b6', t: 'Đọc tin tuyển dụng 3 năm sau', d: 'Chọn 1 trong 3 tin hợp nghề, xem họ cần gì', mins: 5,
    steps: [
      { k: 'say', mood: 'curious', t: 'Giả sử bạn vừa xong 3 năm. Mình đọc một tin tuyển dụng, xem họ cần gì nhé.' },
      { k: 'adpick' },
      { k: 'adread' },
      { k: 'write', key: 'b61.why', q: 'Đọc xong, bạn thấy mình cần chuẩn bị gì nhất?' }
    ] },
  b62: { st: 'b6', t: 'Phỏng vấn 3 năm sau', d: 'Đúng công việc bạn vừa chọn: 1 câu chung, 2 câu theo yêu cầu', mins: 6,
    steps: [
      { k: 'ivset', c1: ['iv'] },
      { k: 'iva', n: 0 },
      { k: 'iva', n: 1 },
      { k: 'iva', n: 2 },
      { k: 'ivend', shore: 's6' }
    ] },
  b63: { st: 'b6', t: 'Kế hoạch 3 năm ở Nhật', d: 'Xếp từng điều cần có lên dòng thời gian', mins: 4,
    steps: [
      { k: 'plan3', c1: ['habits'] } /* PS1.3.50: bỏ bước Thử nhỏ 2 tuần, chuyển thành “Thử để biết” ở b73 */
    ] },
  b71: { st: 'b7', t: 'Người giúp bạn', d: 'Ai giúp được bạn? Chuẩn bị câu hỏi, gặp trực tiếp', mins: 5,
    steps: [
      { k: 'clip', w: 'b71', mood: 'hi' },
      { k: 'ring', c1: ['guide'] },
      { k: 'askprep', shore: 's7a' }
    ] },
  b72: { st: 'b7', t: 'Học từ công việc', d: 'Đi một vòng chỗ làm, nhận việc khó', mins: 6,
    steps: [
      { k: 'say', mood: 'focused', t: 'Ở Nhật, chỗ làm là lớp học lớn nhất. Mình đi một vòng xưởng, hỏi “Tại sao?” ở mỗi chỗ nhé.' },
      { k: 'tour' },
      { k: 'write', key: 'b72.why', q: 'Câu “Tại sao?” bạn sẽ hỏi ở JPC hoặc KTX tuần này', ph: 'Ví dụ: Tại sao lớp mình xếp dép theo một hàng?' },
      { k: 'hard', shore: 's7b' }
    ] },
  b73: { st: 'b7', t: 'Học từ chính mình', d: 'Bài học từ trải nghiệm, thử để biết', mins: 5,
    steps: [
      { k: 'say', mood: 'think', t: 'Người giỏi không phải người không sai. Họ học được từ chính lần sai của mình, và dám thử trước khi chọn.' },
      { k: 'lesson' },
      { k: 'proto' },
      { k: 'proto2', shore: 's7c' }
    ] },
  f1: { st: 'fin', t: 'Nhìn lại chặng đường', d: 'Mở rương kho báu, so với lúc bắt đầu', mins: 5,
    steps: [
      { k: 'say', mood: 'moved', t: '[Tên] đã ghé đủ 7 bến! Shin hỏi lại 2 câu lúc đầu nhé. Rõ hơn hay bớt chắc đều tốt.' },
      { k: 'open2' },
      { k: 'chest' }, /* PS1.3.51: Rương kho báu thay ô viết f1.change (bài cũ vẫn hiện nếu đã viết) */
      { k: 'ps' }
    ] },
  f2: { st: 'fin', t: 'Hướng đi của tôi', d: 'Bảng ước mơ, việc trên bờ, bản 1 trang, gửi thầy cô, nhận bằng', mins: 5, btn: 'Nhận Bằng Thuyền Trưởng Vững Vàng',
    steps: [
      { k: 'dream' }, /* PS1.3.48 */
      { k: 'shore' }, /* PS1.3.50: Việc trên bờ của tôi */
      { k: 'sheet' },
      { k: 'send' },
      { k: 'cert' }
    ] }
};
var ORDER = ['x1', 'b11', 'b12', 'b21', 'b22', 'b23', 'b31', 'b32', 'b33', 'b41', 'b42', 'b51', 'b52', 'b53', 'b61', 'b62', 'b63', 'b71', 'b72', 'b73'];
var FIN_ORDER = ['f1', 'f2'];
/* PS1.3.48 · Bảng ước mơ 10 năm nữa (Đảo Kho Báu, f2 bước 1). Lưới 3×3, ô giữa là cờ của bạn. Sticker vẽ ở art.js (CD2_PROP). */
var DREAM_T = 'Bảng ước mơ · 10 năm nữa';
var DREAM_GRP = [
  ['Công việc', [['gear', 'Tay nghề vững'], ['helmet', 'Công trình'], ['noodle', 'Nghề thực phẩm'], ['care', 'Chăm sóc người khác'], ['leaf', 'Nông nghiệp'], ['laptop', 'Văn phòng, IT'],
    ['board', 'Dạy tiếng Nhật'], ['talk', 'Phiên dịch, cầu nối'], ['shop', 'Cửa hàng của mình'], ['office', 'Công ty Nhật'], ['clip', 'Quản lý, kèm người mới'], ['eshop', 'Kinh doanh online']]],
  ['Học', [['jl', 'Tiếng Nhật'], ['cap', 'Học tiếp'], ['cert', 'Chứng chỉ nghề'], ['book', 'Đọc sách mỗi ngày'], ['elearn', 'Học online']]],
  ['Nơi sống', [['fuji', 'Sống ở Nhật'], ['homevn', 'Nhà ở quê'], ['city', 'Sống ở thành phố'], ['plane', 'Qua lại hai nước']]],
  ['Cuộc sống', [['family', 'Gia đình bên nhau'], ['heart', 'Người thương'], ['friends', 'Bạn bè tốt'], ['piggy', 'Có tích lũy'], ['car', 'Xe hơi riêng'], ['apt', 'Căn hộ view đẹp'], ['rings', 'Đám cưới'], ['shoe', 'Khỏe mạnh'], ['suitcase', 'Đi du lịch'], ['sun', 'Bình yên']]],
  /* PS1.3.51 (bản 4 · đợt 3, góp ý 22–23): nhóm Sở thích, niềm vui + hình gần gũi bạn trẻ */
  ['Sở thích, niềm vui', [['sakura', 'Ngắm hoa anh đào'], ['firework', 'Lễ hội pháo hoa'], ['concert', 'Đi xem concert'], ['gym', 'Tập gym'], ['ball', 'Chơi thể thao'], ['tent', 'Cắm trại thiên nhiên'],
    ['moto', 'Đi phượt'], ['camera', 'Chụp ảnh'], ['vlog', 'Làm vlog'], ['palette', 'Vẽ'], ['guitar', 'Chơi nhạc'], ['pan', 'Nấu ăn'], ['coffee', 'Cà phê cùng bạn'], ['pet', 'Nuôi thú cưng']]]
];
/* Shin gợi ý sẵn tối đa 4 ô từ bài đã làm: hướng của kế hoạch A, phía (Nhật / Việt Nam), nhóm ngành, điều coi trọng ở CD01, mức tiếng Nhật */
var DREAM_ISLE = { len: 'gear', re: 'cert', hoc: 'cap', gio: 'plane', chu: 'talk', lap: 'shop', cau: 'office', que: 'family' };
var DREAM_SIDE = { jp: 'fuji', vn: 'homevn' };
var DREAM_GRPJOB = { sx: 'gear', xd: 'helmet', tp: 'noodle', kg: 'care', dv: 'noodle' };
var DREAM_VAL = [['Gia đình', 'family'], ['Thu nhập', 'piggy'], ['Học hỏi', 'book'], ['Ổn định', 'homevn'], ['Sức khỏe', 'shoe'], ['Giúp', 'care'], ['Tự do', 'sun'], ['Khám phá', 'suitcase'], ['Làm chủ', 'shop'], ['tôn trọng', 'cert']];
var DREAM_MIN = 6; /* dán ít nhất 6/8 ô */

/* ---------- CHỮ CHUNG ---------- */
/* =========================================================
   PS1.3.50 · CD02.3.6 · BẢN 4 ĐỢT 2: hoạt động mới (thầy chốt 22/11/2026)
   ========================================================= */
/* b33 · Dây ảnh “Với bạn, thành công về nghề nghiệp là gì?” · 3 tấm polaroid. Hình vẽ ở art.js (CD2_PROP), mã 'o' = Ý khác (tự đặt tên). */
var SUCC_T = 'Thành công về nghề nghiệp, với tôi là';
var SUCC_GRP = [
  ['Giỏi nghề', [['gear', 'Tay nghề giỏi'], ['cert', 'Có chứng chỉ nghề'], ['box', 'Làm ra sản phẩm tốt'], ['jl', 'Giỏi tiếng Nhật'], ['cap', 'Học lên cao hơn'], ['heart', 'Làm việc mình thích']]],
  ['Được ghi nhận', [['key', 'Được tin giao việc lớn'], ['clip', 'Kèm cặp người mới'], ['medal', 'Được khen thưởng'], ['up', 'Lên chức, lên bậc'], ['talk', 'Được hỏi ý kiến'], ['friends', 'Đồng nghiệp quý mến']]],
  ['Cuộc sống quanh nghề', [['piggy', 'Thu nhập tốt'], ['clock', 'Giờ giấc cân bằng'], ['family', 'Gần gia đình'], ['care', 'Giúp được người khác'], ['shop', 'Làm chủ'], ['sun', 'Vui mỗi ngày đi làm']]]
];
var SUCC_MIN = 1, SUCC_N = 3;

/* b53 · Đứng giữa ngã rẽ (PS1.3.56, góp ý 9 + 10): 4 ngã rẽ, mỗi bên 2 giá trị (mã CROSS_TAG). 10 giá trị, “Thu nhập” chỉ ở 1/8 lựa chọn,
   mỗi giá trị gặp nhiều đối thủ khác nhau → “hay giữ / hay buông” rõ hơn. Không con số lương. Khóa b53x.c<n> (bên chọn), b53x.r<n> (điều làm đổi ý). */
var CROSS_TAG = { on: 'Ổn định, quen việc', sau: 'Giỏi sâu một nghề', moi: 'Thử thách mới', giup: 'Giúp được người khác', nha: 'Gần gia đình',
  tg: 'Thời gian cho bản thân', xa: 'Trải nghiệm xa nhà', hoc: 'Học lên cao hơn', luong: 'Thu nhập tốt', tudo: 'Tự làm chủ' };
/* nối với la bàn b31 (PAIRS): mã cặp + bên (0 trái, 1 phải) */
var CROSS_CMP = { nha: ['fam', 0], xa: ['fam', 1], on: ['stab', 0], moi: ['stab', 1], luong: ['money', 0], tg: ['money', 1], sau: ['deep', 0], tudo: ['own', 1] };
var CROSS = [
  { id: 0, real: 1, t: 'Hết 3 năm, bạn có 2 lời mời',
    a: { n: 'Ở lại công ty, làm tổ trưởng', d: 'Việc quen, đồng nghiệp quen, được kèm các bạn mới', g: ['on', 'sau'], ic: 'helmet' },
    b: { n: 'Sang nghiệp đoàn, làm quản lý thực tập sinh', d: 'Việc mới, phải học lại từ đầu, giúp các bạn mới sang', g: ['moi', 'giup'], ic: 'talk' } },
  { id: 1, t: 'Bạn chọn sống ở đâu?',
    a: { n: 'Về Việt Nam, làm công ty Nhật gần nhà', d: 'Ở với gia đình, cuối tuần có thời gian cho mình', g: ['nha', 'tg'], ic: 'homevn' },
    b: { n: 'Ở lại Nhật, diện Kỹ năng đặc định', d: 'Xa nhà, mỗi năm về một lần, tay nghề lên bậc', g: ['xa', 'sau'], ic: 'fuji' } },
  { id: 2, t: 'Học lên hay đi làm ngay?',
    a: { n: 'Học lên 2 năm trường chuyên môn', d: 'Tốn học phí, 2 năm chưa gửi tiền về được', g: ['hoc', 'moi'], ic: 'cap' },
    b: { n: 'Đi làm ngay', d: 'Gửi tiền về đều mỗi tháng, việc đã quen tay', g: ['luong', 'on'], ic: 'piggy' } },
  { id: 3, t: 'Về Việt Nam, bạn làm gì?',
    a: { n: 'Mở tiệm nhỏ ở quê', d: 'Tự quyết mọi việc, gần ba mẹ, lúc đầu còn chật vật', g: ['tudo', 'nha'], ic: 'shop' },
    b: { n: 'Làm cầu nối, hướng dẫn các bạn sắp sang Nhật', d: 'Dùng tiếng Nhật mỗi ngày, hay đi lại giữa hai nước', g: ['giup', 'xa'], ic: 'plane' } }
];
var CROSS_WHY_Q = 'Điều gì có thể làm bạn đổi sang bên kia?';
var CROSS_WHY = [['nguoi', 'Có người giỏi dẫn dắt mình'], ['nha', 'Gần gia đình hơn'], ['hoc', 'Được học thêm'], ['can', 'Gia đình cần mình'], ['thu', 'Được làm thử 1 tháng trước'], ['x', 'Không gì cả, mình chắc rồi']];

/* b72 · Đi một vòng chỗ làm. Cảnh 360×220, điểm “?” [x, y]. o[0] là ý đúng (máy xáo), o[1] là ý chưa đúng (dài bằng hoặc hơn). */
var TOUR = {
  kt: { n: 'Xưởng sản xuất', spots: [
    { x: 98, y: 92, t: 'Bảng dụng cụ có vẽ bóng', q: 'Vì sao bảng treo dụng cụ lại vẽ hình từng món?', o: ['Nhìn là biết món nào đang thiếu, ai cũng trả đúng chỗ', 'Để bảng trông đẹp và gọn hơn mỗi khi khách đến thăm xưởng'],
      les: '5S: đồ nào có chỗ nấy. Thiếu một món là thấy ngay, không ai mất công đi tìm.', jpc: 'Ở KTX, vẽ chỗ để giày, ly, sạc điện thoại. Dùng xong trả về đúng chỗ.' },
    { x: 182, y: 196, t: 'Vạch kẻ vàng dưới sàn', q: 'Vì sao sàn xưởng kẻ vạch vàng?', o: ['Chia lối đi an toàn và chỗ để hàng, xe nâng không đụng người', 'Để công nhân biết mình phải đứng yên ở đúng chỗ nào suốt cả ca'],
      les: 'Vạch kẻ giữ an toàn. Đi đúng lối, để đúng ô, tai nạn giảm hẳn.', jpc: 'Ở lớp, để cặp, dép đúng chỗ, lối đi luôn trống.' },
    { x: 334, y: 20, t: 'Bảng đầu ca', q: 'Vì sao đầu ca cả nhóm đứng họp 5 phút trước bảng?', o: ['Cả nhóm cùng biết việc hôm nay, ai có vấn đề thì báo sớm', 'Để tổ trưởng điểm danh và nhắc ai hay đi trễ trước mọi người'],
      les: 'Họp đầu ca (chorei) giúp mọi người cùng hiểu một kế hoạch. Báo sớm thì sửa sớm.', jpc: 'Đầu giờ học, nói 1 câu: hôm nay mình sẽ làm gì.' },
    { x: 268, y: 108, t: 'Mẫu đạt và không đạt cạnh máy', q: 'Vì sao đặt sẵn mẫu đạt và không đạt ngay cạnh máy?', o: ['Nhìn là so được ngay, không phải dựa vào trí nhớ', 'Để người mới không dám chạm vào máy khi chưa được dạy'],
      les: 'Người Nhật làm cho việc “nhìn là biết”. Ai cũng kiểm được, ít sai.', jpc: 'Dán mẫu bài làm đẹp lên bàn học, so bài mình với mẫu.' },
    { x: 160, y: 128, t: 'Senpai cầm sổ ghi', q: 'Vì sao senpai luôn cầm sổ khi được chỉ việc?', o: ['Ghi lại để không hỏi lại lần hai, lần sau tự làm được', 'Vì ở Nhật bắt buộc phải nộp sổ ghi chép cho cấp trên mỗi ngày'],
      les: 'Ghi chép là tôn trọng người chỉ việc. Hỏi một lần, nhớ mãi.', jpc: 'Mang sổ nhỏ trong giờ thực hành. Mỗi buổi ghi 3 điều mới.' }
  ] },
  dv: { n: 'Bếp và khu chăm sóc', spots: [
    { x: 80, y: 30, t: 'Tranh rửa tay cạnh bồn', q: 'Vì sao cạnh bồn rửa có tranh các bước rửa tay?', o: ['Ai cũng rửa đủ bước như nhau, giữ an toàn cho khách', 'Để người mới tập đọc tiếng Nhật trong lúc đứng rửa tay'],
      les: 'Vệ sinh là trên hết. Làm đủ bước, không bỏ bước nào, kể cả lúc vội.', jpc: 'Rửa tay đủ bước trước giờ ăn ở KTX.' },
    { x: 196, y: 60, t: 'Nhãn ngày trên hộp', q: 'Vì sao hộp nào cũng dán nhãn ngày giờ?', o: ['Biết món nào làm trước dùng trước, quá hạn thì bỏ', 'Để cuối tháng quản lý đếm xem nhân viên đã làm bao nhiêu hộp'],
      les: 'Trước vào trước ra. Nhãn rõ thì ai cũng biết, không phải đoán.', jpc: 'Dán tên, ngày lên đồ ăn để chung trong tủ lạnh KTX.' },
    { x: 340, y: 132, t: 'Xe đẩy xếp theo thứ tự', q: 'Vì sao đồ trên xe đẩy xếp theo đúng thứ tự?', o: ['Lấy nhanh, không quên món nào, ai thay ca cũng làm được', 'Vì mỗi nhân viên được giao riêng một chiếc xe không ai được đụng'],
      les: 'Chuẩn hóa: ai làm cũng giống nhau. Đổi người, việc vẫn trôi.', jpc: 'Xếp đồ dùng học tập theo một thứ tự cố định mỗi ngày.' },
    { x: 334, y: 20, t: 'Bảng đầu ca', q: 'Vì sao đầu ca cả nhóm đứng họp 5 phút trước bảng?', o: ['Cả nhóm cùng biết việc hôm nay, ai có vấn đề thì báo sớm', 'Để tổ trưởng điểm danh và nhắc ai hay đi trễ trước mọi người'],
      les: 'Họp đầu ca giúp mọi người cùng hiểu một kế hoạch. Báo sớm thì sửa sớm.', jpc: 'Đầu giờ học, nói 1 câu: hôm nay mình sẽ làm gì.' },
    { x: 228, y: 128, t: 'Senpai cầm sổ ghi', q: 'Vì sao senpai luôn cầm sổ khi được chỉ việc?', o: ['Ghi lại để không hỏi lại lần hai, lần sau tự làm được', 'Vì ở Nhật bắt buộc phải nộp sổ ghi chép cho cấp trên mỗi ngày'],
      les: 'Ghi chép là tôn trọng người chỉ việc. Hỏi một lần, nhớ mãi.', jpc: 'Mang sổ nhỏ trong giờ thực hành. Mỗi buổi ghi 3 điều mới.' }
  ] }
};
var TOUR_DK = 'Mình chưa biết';

/* b72 · Được giao việc khó: 3 tin nhắn của cấp trên. Không có cách sai: mỗi cách có cái được và cái phải chịu. */
var HARD_BOSS = 'Tổ trưởng Tanaka';
var HARD = [
  { m: 'Thứ Bảy này máy số 3 bảo trì. Em lên phụ anh kỹ thuật được không?', jp: '土曜日、3番の機械のメンテナンスを手伝ってくれる？', gain: 'Học sửa máy, hiểu máy từ bên trong',
    r: [['Nhận ngay', 'Học được nhiều, cấp trên nhớ bạn là người dám nhận.', 'Mất một ngày nghỉ.'],
      ['Nhận và hỏi thêm', 'Biết trước giờ giấc, cần mang gì. Cấp trên thấy bạn chu đáo.', 'Phải hỏi bằng tiếng Nhật, hơi ngại lúc đầu.'],
      ['Xin hẹn lần sau', 'Giữ được ngày nghỉ.', 'Cơ hội học sửa máy có khi chưa quay lại sớm.']] },
  { m: 'Tuần sau có bạn mới vào. Em kèm bạn ấy 2 tuần nhé.', jp: '来週新人が入るから、2週間教えてあげて。', gain: 'Tập làm trưởng nhóm, chỉ việc cho người khác',
    r: [['Nhận ngay', 'Tập chỉ việc, hiểu nghề chắc hơn khi phải giải thích.', 'Việc của mình chậm lại vài ngày.'],
      ['Nhận và hỏi thêm', 'Hỏi rõ cần dạy gì trước, dạy có thứ tự, bạn mới tiến bộ nhanh.', 'Phải chuẩn bị thêm, tốn chút thời gian.'],
      ['Xin hẹn lần sau', 'Tập trung việc của mình.', 'Cấp trên có thể nghĩ bạn chưa sẵn sàng lên tổ trưởng.']] },
  { m: 'Đây là tài liệu máy mới. Em đọc rồi hướng dẫn lại cho các bạn mới nhé.', jp: '新しい機械の資料だよ。読んで、新人に説明してね。', gain: 'Học tiếng Nhật chuyên ngành',
    r: [['Nhận ngay', 'Tiếng Nhật chuyên ngành lên nhanh, được tin hơn.', 'Đọc khó, có thể phải thức khuya tra từ.'],
      ['Nhận và hỏi thêm', 'Hỏi chỗ chưa hiểu trước khi dạy lại, không truyền sai cho người khác.', 'Phải chịu nói thật: mình chưa hiểu chỗ này.'],
      ['Xin hẹn lần sau', 'Không lo dạy sai.', 'Bỏ lỡ dịp lên trình độ tiếng Nhật.']] }
];
var HARD_NOTE = 'Ở Nhật, việc khó thường là <b>phép thử tinh thần</b> và cũng là <b>cơ hội học</b>. Thấy quá sức thì <b>sodan</b> (相談): nói thật và hỏi cách làm. Đừng im lặng từ chối, cũng đừng nhận rồi bỏ dở.';
var HARD_SHIN = 'Shin nhớ thầy của Shin hay nói: thử thách là người thầy lớn. Mỗi lần vượt qua, mình vững thêm một bậc.';

/* b73 · Bài học từ trải nghiệm: thẻ sai lầm hay gặp (ph = ví dụ mờ cho 3 dòng). Mã 'o' = chuyện khác của mình. */
var MISTAKES = [
  ['hieu', 'Nói “hiểu rồi” khi chưa hiểu', ['Cô chỉ bài, mình gật đầu cho qua. Lúc làm thì sai.', 'Gật cho qua làm mình mất nhiều thời gian hơn.', 'Chưa hiểu thì nhắc lại để hỏi: “Ý cô là… phải không ạ?”']],
  ['im', 'Im lặng, không hỏi khi bí', ['Bài khó, mình ngồi im cả buổi, không dám hỏi.', 'Hỏi sớm thì đỡ mất công.', 'Bí quá 10 phút thì hỏi bạn hoặc thầy cô.']],
  ['bo', 'Bỏ học tiếng Nhật sau giờ mệt', ['Tuần trước mình mệt nên bỏ học từ mới 4 tối.', 'Mỗi ngày một ít dễ giữ hơn học dồn.', 'Mệt thì học 5 phút thôi, không bỏ hẳn.']],
  ['bao', 'Làm theo ý mình, không báo cáo', ['Mình đổi cách làm mà không báo nhóm trưởng.', 'Không báo thì người khác không biết để giúp.', 'Đổi gì cũng báo trước một câu.']],
  ['tre', 'Đi trễ vì ngủ quên', ['Mình thức khuya xem điện thoại, sáng đi trễ.', 'Đúng giờ bắt đầu từ tối hôm trước.', 'Tắt điện thoại lúc 23 giờ, để báo thức xa giường.']],
  ['gian', 'Giận rồi nói lời làm mất lòng', ['Bạn cùng phòng nói mình bừa, mình cãi lại to tiếng.', 'Giận quá thì lời nói làm hỏng việc.', 'Giận thì im 1 phút, nói sau khi bình tĩnh.']]
];
var MISTAKE_Q = ['Chuyện gì đã xảy ra?', 'Mình rút ra điều gì?', 'Lần sau mình sẽ…'];

/* b73 · Thử để biết (mẫu thử: nhỏ, rẻ, nhanh ≤ 2 tuần, trả lời 1 câu hỏi rõ) */
var PROTO_K = [
  ['hoi', 'Hỏi', 'Trò chuyện 15 phút với người đang làm việc đó', 'speech', ['Muốn làm phiên dịch: hỏi một anh chị đang làm phiên dịch, một ngày họ làm gì, khó nhất là gì', 'Muốn về quê mở xưởng: hỏi chú, bác đang có xưởng nhỏ ở quê']],
  ['xem', 'Xem', 'Xem một ngày làm việc thật: video thật hoặc đến tận nơi', 'scope', ['Muốn làm Kaigo: xem trọn một video “một ngày làm điều dưỡng ở Nhật”, ghi 3 điều bất ngờ', 'Muốn làm công ty Nhật ở Việt Nam: đến xem một khu công nghiệp gần nhà']],
  ['lam', 'Làm thử', 'Làm một bản nhỏ của việc đó', 'tool', ['Muốn làm giáo viên: dạy bạn cùng phòng 15 phút tiếng Nhật', 'Muốn mở tiệm: nấu 1 món, mời 3 người ăn thử và góp ý', 'Muốn làm quản lý: kèm 1 bạn học chậm hơn trong 1 tuần']]
];
var PROTO_RULE = [['Nhỏ', 'Làm trong 15–60 phút'], ['Rẻ', 'Gần như không tốn tiền'], ['Nhanh', 'Xong trong 2 tuần'], ['Rõ', 'Trả lời được 1 câu hỏi']];
var PROTO_WHEN = [['7', 'Trong 1 tuần'], ['10', 'Trong 10 ngày'], ['14', 'Trong 2 tuần']];
var PROTO_RT = { hoi: 'memo', xem: 'memo', lam: 'viecko' };
var LIKE5 = ['', 'Không thích', 'Hơi ngại', 'Bình thường', 'Thích', 'Rất thích'];

/* Nhiệm vụ lên bờ: việc làm ngoài ứng dụng. b = bến, at = chặng hiện thẻ. Cuối khóa (f2) học viên chọn ít nhất 3 việc, đặt ngày. */
var SHORE = [
  { id: 's2', b: 'b2', at: 'b23', ic: 'people', t: 'Hỏi một anh chị đi trước thật câu bạn đã soạn' },
  { id: 's3', b: 'b3', at: 'b33', ic: 'home', t: 'Hỏi ba mẹ: “10 năm nữa ba mẹ mong con thế nào?”, rồi so với la bàn của bạn' },
  { id: 's5', b: 'b5', at: 'b53', ic: 'speech', t: 'Kể kế hoạch A và B cho một người bạn tin, nghe họ góp ý' },
  { id: 's6', b: 'b6', at: 'b62', ic: 'speech', t: 'Nói câu trả lời phỏng vấn trước thầy cô hoặc bạn (hoặc tự ghi âm 60 giây)' },
  { id: 's7a', b: 'b7', at: 'b71', ic: 'light', t: 'Gặp trực tiếp người bạn chọn ở Ngọn Hải Đăng' },
  { id: 's7b', b: 'b7', at: 'b72', ic: 'tool', t: 'Xung phong nhận một việc khó ở JPC hoặc KTX tuần này' },
  { id: 's7c', b: 'b7', at: 'b73', ic: 'compass', t: 'Làm việc thử nhỏ “Thử để biết” của bạn' }
];
var SHORE_T = 'Nhiệm vụ lên bờ';
var SHORE_SAY = 'Thuyền cập bến thì thuyền trưởng lên bờ làm việc thật. Việc này làm ngoài ứng dụng nhé.';
var SHORE_MIN = 3, SHORE_XP = 5;
var SHORE_WHEN = [['3', '3 ngày nữa'], ['7', '1 tuần nữa'], ['14', '2 tuần nữa']];
var SHORE_ST = [['chua', 'Chưa làm'], ['dang', 'Đang làm'], ['da', 'Đã làm']];

var SHIN_TALK = {
  home: ['Biển hôm nay lặng. Đi tiếp một chặng nhé [Tên]!', 'Mỗi bến ghé qua, hải đồ của bạn rõ thêm một chút.', 'Đi chậm mà chắc. Shin ở đây với bạn.'],
  homeNew: 'Chào [Tên]! Shin là thuyền trưởng dẫn đường. Nhận thuyền ở Cảng 3 Năm rồi mình ra khơi nhé!',
  homeWait: 'Bạn đã đi hết các bến đang mở. Các bến sau đang được dựng, sắp mở rồi!',
  homeFin: 'Bạn đã nhận Bằng Thuyền Trưởng Vững Vàng! Hải đồ vẫn ở đây, ghé lại đảo và Senpai lúc nào cũng được.',
  lockFin6: 'Ghé đủ 7 bến (có đủ 7 con dấu) để tới Đảo Kho Báu.',
  bottle: 'Lời anh chị hôm nay', /* PS1.3.53: tránh trùng tên Thư trong chai 7 bến */
  bottleSub: 'Một câu của anh chị đi trước trôi vào bờ',
  fogT: 'Đảo mới hiện ra',
  stampT: 'Con dấu bến',
  doneAct: 'Xong chặng!',
  soon: 'Bến này đang được dựng. Sắp mở!',
  lockR2: 'Ghé xong Đài Vọng Biển và Bến Gặp Gỡ để mở bến này.',
  lockR2b: 'Xong Xưởng La Bàn để mở bến này.',
  lockR3: 'Xong Xưởng La Bàn và Phòng Hải Đồ để mở bến này.',
  lockFin: 'Ghé đủ 7 bến để tới Đảo Kho Báu.',
  lockP: 'Nhận thuyền ở Cảng 3 Năm trước nhé.',
  redo: 'Bạn đang xem lại chặng đã xong. Sửa chỗ nào cũng được, bài tự lưu.',
  redoNew: 'Bạn đang làm lại chặng này. Bài cũ vẫn giữ tạm cho đến khi đóng dấu lại.',
  cardNew: 'Thẻ Senpai mới',
  insT: 'Viết thật, viết đủ ý thì được Insight'
};

/* =========================================================
   PS1.3.51 · CD02.3.7 · BẢN 4 ĐỢT 3: Rương kho báu, Thư trong chai, Thư gửi thuyền trưởng tương lai (thầy chốt 22/11/2026)
   ========================================================= */
/* Rương kho báu (f1): mỗi bến cho 1 món [mã bến, hình (CD2_PROP), tên, ý nghĩa]. Chạm món → xem lại bài ở bến đó. */
var CHEST = [
  ['p0', 'anchor', 'Mỏ neo', '3 năm ở Nhật là nền móng'],
  ['b1', 'scope', 'Ống nhòm', 'Nhìn xa, thấy nhiều hướng'],
  ['b2', 'storybk', 'Sổ chuyện anh chị', 'Học từ người đi trước'],
  ['b3', 'compass', 'La bàn', 'Điều mình coi trọng'],
  ['b4', 'chart', 'Hải đồ', '3 kế hoạch 5 năm'],
  ['b5', 'vest', 'Áo phao', 'Phương án dự phòng'],
  ['b6', 'key', 'Chìa khóa', 'Điều nhà tuyển dụng cần'],
  ['b7', 'lantern', 'Đèn lồng', 'Người soi đường']
];
var CHEST_T = 'Rương kho báu', CHEST_MY = 'Kho báu của tôi', CHEST_MAX = 3;
var CHEST_Q = 'Món này giúp mình hiểu hơn về…';
var CHEST_PH = 'Ví dụ: mình coi trọng gia đình hơn mình nghĩ.';
/* Thư trong chai: sau con dấu mỗi bến, vớt 1 chai có câu nguyên văn của 1 Senpai (N3+, đã có trong khóa) */
var BOTTLE = { b1: 'tan', b2: 'ngat', b3: 'thuy', b4: 'thao', b5: 'hoai', b6: 'lich', b7: 'mai' };
var BOTTLE_T = 'Thư trong chai';
/* Thư gửi thuyền trưởng tương lai (sau khi nhận bằng). Không có máy chủ: thư không tự đến học viên khác, thầy cô nhận qua báo cáo. */
var FUT = {
  t: 'Thư gửi thuyền trưởng tương lai',
  ask: 'Một ngày nào đó, sẽ có một thuyền trưởng mới đi khóa này như bạn. Bạn muốn viết cho họ một lá thư bỏ chai không?',
  q: 'Bạn muốn nói gì với thuyền trưởng đó?',
  ph: 'Ví dụ: Đừng sợ chọn sai. Cứ đi hết 7 bến, bạn sẽ thấy nhiều đường hơn bạn nghĩ.',
  max: 300, anon: 'Một thuyền trưởng',
  ok: 'Đồng ý cho thầy cô dùng thư này (ẩn tên) cho các khóa sau',
  end: 'Chai đã trôi về phía chân trời. Chúc thuyền trưởng [Tên] thuận buồm xuôi gió!'
};
SHIN_TALK.btlNew = 'Thuyền vừa vớt được một Thư trong chai!';
SHIN_TALK.btlTap = 'Chạm để mở thư';
SHIN_TALK.btlAgain = 'Đọc lại Thư trong chai';
SHIN_TALK.chestHi = 'Mỗi bến bạn ghé đã cho bạn một món. Tất cả nằm trong rương này.';
SHIN_TALK.futHi = 'Viết ngắn thôi, tối đa 300 ký tự. Điều bạn ước mình biết sớm hơn là quý nhất.';

/* PS1.3.52 · CD02.3.8 · BẢN 4 ĐỢT 4: thuyền nâng cấp theo bến đã xong. [tên món, ý nghĩa ngắn] */
var SHIP_ITEM = {
  b1: ['Chòi canh và ống nhòm', 'Bạn nhìn xa hơn, thấy nhiều hướng đi.'],
  b2: ['Một thủy thủ Senpai', 'Bạn có anh chị đi trước đồng hành.'],
  b3: ['Bánh lái', 'Bạn cầm lái theo điều mình coi trọng.'],
  b4: ['Buồm mũi', 'Thêm sức gió: bạn đã có 3 kế hoạch.'],
  b5: ['Phao và xuồng dự phòng', 'Gặp sóng, bạn có phương án dự phòng.'],
  b6: ['Cột buồm phụ và rương hành trang', 'Bạn biết nhà tuyển dụng cần gì ở mình.'],
  b7: ['Đèn lồng và thủy thủ thứ ba', 'Bạn biết học từ người, từ việc và từ chính mình.'],
  fin: ['Cờ dài, buồm viền vàng, rương báu', 'Thuyền đã sẵn sàng cho hành trình của bạn.']
};
var SHIP_PORT = 'Mỗi bến xong, thuyền có thêm một món mới.';
