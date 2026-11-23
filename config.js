/* =========================================================
   PROSKILLS · CẤU HÌNH CHUNG
   Đây là file thầy cô sửa nhiều nhất:
   - phiên bản gói (APP_VER)
   - danh sách thầy cô (dùng chung cho mọi module)
   - danh sách module hiển thị ở trang chủ, mật khẩu từng module
   Chỉ dùng cú pháp JavaScript kiểu cũ (var, function) để chạy trên iPhone đời cũ.
   ========================================================= */
var PS_CONFIG = {
  APP: 'Proskills',
  APP_VER: 'PS1.3.57',
  ORG: 'Khoa Kỹ năng · JPC · Proskills',

  /* Mật khẩu bản demo giáo viên, dùng chung cho MỌI module (phân biệt hoa thường).
     Mở demo: thêm ?demo vào link module (ví dụ .../Proskills/tk/?demo) rồi nhập mật khẩu.
     Lưu ý: website tĩnh nên ai mở mã nguồn vẫn đọc được; đây chỉ là khóa nhẹ để học viên không vào nhầm. */
  DEMO_PASS: 'Oden@123#',

  /* Diện đi Nhật: học viên chọn và có thể đổi */
  PATHS: ['Thực tập sinh', 'Ikusei Shuro', 'Kỹ năng đặc định', 'Chưa rõ'],

  /* Thầy cô hướng dẫn: [tên hiển thị, email Teams, lời giới thiệu ngắn]
     Lưu theo email nên đổi thứ tự không ảnh hưởng bài làm. */
  TEACHERS: [
    ['Cô Long Ngân', 'longngan@proskills.ac.vn', 'Cô Ngân nhiệt tình lắm! Có khó khăn gì, bạn cứ hỏi cô nha.'],
    ['Cô Kim Dung', 'dungndlk@jpc.edu.vn', 'Có gì khó, bạn cứ hỏi cô Dung nha. Cô sẽ góp ý thực tế để mình biết nên làm gì tiếp!'],
    ['Cô Lê Uyên', 'uyenlt@proskills.ac.vn', 'Lớp cô Uyên nhiều hoạt động lắm! Nhớ ăn uống đầy đủ để tham gia hết mình nha!'],
    ['Cô Trần Thi', 'tranthi@proskills.ac.vn', 'Chuyện sao đỏ, trực 5S hay nếp sinh hoạt ở ký túc xá, bạn có thể hỏi cô Thi nha!'],
    ['Thầy Đăng Khoa', 'Dangkhoa@proskills.ac.vn', 'Học với thầy Khoa nhớ đúng giờ nha! Có việc đột xuất thì nhắn xin phép thầy trước nhé.'],
    ['Cô Quỳnh Anh', 'quynhanh@proskills.ac.vn', 'Cô Quỳnh Anh tâm lý và nhẹ nhàng lắm. Có gì cần giúp đỡ, bạn cứ hỏi cô nha.'],
    ['Cô Nguyệt Quỳnh', 'quynhntn@proskills.ac.vn', 'Cô Nguyệt Quỳnh nghiêm lắm đó! Cô không nói nhiều, nhưng câu nào cũng thấm.']
  ],

  /* Danh sách module.
     id     : tên thư mục của module, cũng là tên vùng lưu bài (ps.mod.<id>)
     state  : 'ready' (học được) · 'soon' (sắp ra mắt, chỉ hiện thẻ) · 'hidden' (không hiện, dùng để thử)
     pass   : các câu trả lời đúng ở cổng, không phân biệt hoa thường, dấu, khoảng trắng.
              Giáo viên đọc mật khẩu cho học viên khi bắt đầu module tại lớp.
     gateQ  : câu hỏi hiện ở cổng
     color  : màu chủ đạo của module (chỉ dùng cho thẻ ở trang chủ)
     total  : số hoạt động chính để tính phần trăm (module tự báo lại khi chạy)
     ver    : phiên bản riêng của module
     kind   : 'routine' = Shin Routine (rèn luyện mỗi ngày): không nằm trong danh sách khóa học,
              trang chủ vẽ thẻ "Rèn luyện hôm nay" riêng ở trên cùng
     open   : 1 = không cần mật khẩu cổng */
  MODULES: [
    { id: 'routine', code: 'RÈN LUYỆN', title: 'Shin Routine', sub: 'Rèn luyện thói quen tốt mỗi ngày cùng Shin',
      icon: 'flame', color: '#2265C5', state: 'ready', kind: 'routine', open: 1, gateQ: '', pass: [], total: 0, ver: 'M.Claude.3.4.0',
      door: 0 /* PS1.3.28: tắt (thầy chốt 18/11). 1 = mở Proskills mà hôm nay chưa đóng dấu thì vào thẳng Shin Routine; 0 = tắt */ },
    { id: 'cd01', code: 'CD01', title: 'Career Design 1', sub: 'Hiểu mình, chọn nghề, kế hoạch JPC và 3 năm đầu ở Nhật',
      icon: 'rail', color: '#2C5BC4', state: 'ready', gateQ: 'Shin thích ăn món gì nhất?', pass: ['oden', 'おでん', 'オデン'], total: 18, ver: 'CD01.1.8' },
    { id: 'cd02', code: 'CD02', title: 'Career Design 2', sub: 'Hải Đồ La Bàn: những hướng đi sau 3 năm ở Nhật',
      icon: 'compass', color: '#C15F3C', state: 'ready', gateQ: 'Thuyền của Shin xuất phát từ cảng nào?', pass: ['cang 3 nam', 'cảng 3 năm', '3 nam', 'ba nam', 'cang ba nam'], total: 20, ver: 'CD02.3.13' },
    { id: 'tk', code: 'HP05', title: 'Nhật Bản Du Ký', sub: 'Kiến thức quy định: luật Nhật, luật cư trú, luật Việt Nam',
      icon: 'scroll', color: '#2F4BD8', state: 'ready', gateQ: 'Ngộ Không thích ăn quả gì nhất?', pass: ['dao'], total: 26, ver: 'TK16.3' },
    { id: 'tc01', code: 'TC01', title: 'Huấn luyện thể chất', sub: 'Phòng tập HLV Shin: động tác đúng, dinh dưỡng, sức khỏe theo nghề',
      icon: 'dumbbell', color: '#348A5F', state: 'ready', gateQ: 'Bài thể dục buổi sáng của người Nhật tên là gì?', pass: ['radio taiso', 'rajio taiso', 'radio taisou', 'rajio taisou', 'radiotaiso', 'ラジオ体操', 'radio'], total: 103, ver: 'TC01.1.7' },
    { id: 'mau', code: 'MẪU', title: 'Module mẫu', sub: 'Dùng để thử khung và làm mẫu cho module mới',
      icon: 'spark', color: '#E8834A', state: 'hidden', gateQ: 'Mật khẩu thử là gì?', pass: ['mau'], total: 3, ver: '1.0.1' }
  ],

  /* Thẻ thói quen của Shin Routine mà các khóa có thể gợi ý (mã thẻ → tên ngắn).
     Tên dự phòng khi học viên chưa mở Shin lần nào; khi đã mở, tên lấy từ chính Shin.
     Khóa gợi ý thẻ bằng PS.routineSugHTML([mã thẻ…], {from: id khóa, sub: lời dẫn}). */
  ROUTINE_LIB: {
    chao: 'Chào hỏi và cảm ơn', som: 'Đúng giờ, đúng hẹn', memo: 'Quan sát, hỏi và ghi lại', '5s': '5S - Gọn gàng và ngăn nắp',
    xinloi: 'Lắng nghe và sửa sai', '5phut': 'Tận dụng 05 phút', camxuc: 'Nhận biết và điều chỉnh cảm xúc', vandong: 'Vận động',
    anuong: 'Ăn uống dinh dưỡng, điều độ', ngu: 'Ngủ đủ giấc', chitieu: 'Chi tiêu có kế hoạch', viecko: 'Dám thử việc khó',
    horenso: 'Báo cáo và xác nhận', giup: 'Giúp đỡ một việc'
  },

  /* Thẻ hướng dẫn (cao bằng nửa thẻ khóa học), hiện dưới danh sách khóa ở trang chủ.
     state: 'soon' (Sắp có) · 'ready' (mở trang href) */
  GUIDES: [
    { id: 'nhom', code: 'HƯỚNG DẪN', title: 'Hoạt động nhóm gắn kết', sub: 'Cùng sang Nhật, cùng làm, cùng sống vài năm',
      icon: 'team', color: '#C8507E', state: 'soon', href: '' }
  ]
};
