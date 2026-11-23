# Hướng dẫn đưa Proskills lên GitHub (kéo thả trên web)

## Lần đầu
1. Đăng nhập GitHub → **New repository**. Tên đã chốt: **`Proskills`** (giữ mãi, không đổi). Chọn **Public** → **Create repository**.
2. Trong repository mới: **Add file → Upload files**.
3. Mở thư mục phiên bản mới nhất (ví dụ `PS1.2.2`) trên máy, chọn **toàn bộ nội dung bên trong** (Ctrl+A), kéo vào vùng tải lên.
   - Kéo cả các thư mục `core`, `hub`, `icons`, `mau`, `tk` (gồm cả `tk/game`). Trình duyệt Chrome/Edge giữ nguyên cấu trúc thư mục.
   - `index.html` phải nằm ngay ở gốc repository, không nằm trong thư mục `PS1.2.2`.
   - Mỗi lần kéo tối đa 100 tệp. Proskills hiện có khoảng 118 tệp nên **lần đầu kéo 2 lần**:
     lần 1 kéo riêng thư mục `routine` (Shin Routine, 62 tệp), lần 2 kéo phần còn lại (Ctrl+A rồi bỏ chọn `routine`).
4. Bấm **Commit changes**.
5. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main, /(root) → Save.**
6. Chờ 1–3 phút, mở link dạng `https://TEN-TAI-KHOAN.github.io/Proskills/`. Đây là link duy nhất gửi học viên.
   Đường link phân biệt chữ hoa: gửi đúng `Proskills` (P hoa) như tên repository.

Đổi tên repository hoặc tài khoản là đổi link: học viên sẽ không thấy bài đã làm. Giữ cố định từ đầu.

## Khi có bản mới
1. Add file → Upload files → kéo các tệp, thư mục có thay đổi (CHANGELOG ghi "Tệp đổi") → Commit. File trùng tên được thay.
   Thư mục `routine` chỉ cần kéo lại khi CHANGELOG ghi có đổi tệp trong `routine/`.
2. Xem CHANGELOG.md mục "File cần xóa trên GitHub": tải lên trên web **không tự xóa** file cũ. Nếu có, mở file đó trên GitHub → biểu tượng thùng rác → Commit.
3. Học viên đang mở ứng dụng sẽ thấy "Có phiên bản mới · Cập nhật".

## Thử module mẫu
Mở `link/?thu=1` để thấy thẻ Module mẫu (mật khẩu: `mau`). Học viên mở link thường sẽ không thấy thẻ này.

## Demo giáo viên (mọi khóa)
Thêm `?demo` vào link của khóa, ví dụ `link/tk/?demo`, rồi nhập mật khẩu demo **`Oden@123#`** (chữ O viết hoa).
Một mật khẩu dùng cho mọi khóa hiện tại và sau này; đổi ở `config.js` (dòng `DEMO_PASS`).
Demo là một học viên giả định đã hoàn thành khóa, không đụng bài làm thật trên máy, không cần nhập thông tin.
Thoát bằng nút "Thoát demo" ở góc màn hình.
