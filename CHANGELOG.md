# CHANGELOG · Proskills

Quy ước số phiên bản: **PS a.b.c**
- a: thế hệ lớn của ứng dụng
- b: giai đoạn / thêm module hoặc tính năng lớn
- c: sửa nhỏ trong giai đoạn đó

## PS1.3.57 · 23/11/2026 · CD02 bản 5 đợt 2: cờ ảnh đại diện, hình kế hoạch, popup thuyền nâng cấp, vẽ lại người
Theo `claude/cd02-ban5-de-xuat.md` (thầy chốt 23/11: 1 tùy chọn, 2 ok, 3 làm luôn, 4 không cần, 5 cả bếp và xưởng, 6 ok, 7 ok). CD02.3.13.
- Ý 2 · Cờ dùng ảnh đại diện (tùy chọn): ô đầu lưới biểu tượng “Ảnh của tôi” (mã 'av'), dòng “Đổi ảnh đại diện” mở bảng chọn như Cài đặt trang chủ (`avOv`, lưu `PS.prefs().av`). `flagSym('av')` vẽ ảnh lúc hiển thị (art.js `avSym`, clipPath id riêng) nên cờ ở hải đồ, buồm thuyền, Sổ tay, Bảng ước mơ, phiếu, Bằng đổi theo khi đổi ảnh. cd02/index.html nạp `../hub/avatar.js`; avatar.js xuất thêm `cur, cols, letter, map, body`.
- Ý 7 · 15 hình biểu tượng kế hoạch vẽ mới (art.js `PLAN_ART`, `planArt`; content.js `PLAN_IC` 3 nhóm × 5). Bước đặt tên kế hoạch có ô “Chọn hình cho kế hoạch” (bắt buộc, không chọn sẵn), bảng chọn 5 cột (`planPicker`, khóa `<b41|b42|b43>.ic`). Hình hiện ở băng kế hoạch, thẻ kế hoạch (`voyCard`, cả Sổ tay › Bài làm), lời Shin “Đây là 3 kế hoạch của…” (`.trio3`), cân Bến 5, phiếu Hướng đi (HTML + ảnh: `plImg`).
- Ý 12 · Popup “Chúc mừng {Tên}, thuyền của bạn vừa được nâng cấp” (`shipOv`, kiểu Thư trong chai: thuyền trôi vào, món mới hiện dần, lá thư món + ý nghĩa, “Thuyền cấp x/8”, nút “Vào Bến …”). Bỏ thuyền khỏi popup con dấu và popup Bằng. Hiện 1 lần mỗi bến khi bấm Tiếp theo / Đi tiếp / chạm bến mới trên hải đồ (`shipGate`); bấm “Về hải đồ” thì bỏ qua (`shipSkip`). Cuối khóa: đóng Bằng → popup thuyền đủ 8 món. `S.shipSeen`; bài cũ: bến đã có dấu coi như đã xem.
- Ý 14 · “Đi một vòng chỗ làm”: vẽ lại người ở cả bếp và xưởng (art.js `tourMan`): Senpai mũ đầu bếp/mũ bảo hộ cầm sổ (đúng chỗ dấu “?” Senpai cầm sổ ghi), bạn mới đội mũ, đeo khẩu trang rửa tay (bếp), mặc áo phản quang (xưởng).
- Sửa chữ Bến 5 “chọn ở 3 ngã rẽ” → “4 ngã rẽ” (sót ở PS1.3.56).
- Kiểm 390 + 1280: cờ + đổi ảnh, đặt tên + chọn hình, 3 kế hoạch, cân, popup thuyền, Đi một vòng, xuất ảnh phiếu (1080×2216, có hình kế hoạch). Không lỗi JS.

Tệp đổi: config.js, sw.js, mọi index.html (?v=), hub/avatar.js, cd02/(index.html, art.js, content.js, engine.js, cd02.css).
File cần xóa trên GitHub: không có.

## PS1.3.56 · 23/11/2026 · CD02 bản 5 đợt 1: chữ, tự chấm 3 yếu tố, dải màu 1–5, Bến 5 bốn ngã rẽ
Theo `claude/cd02-ban5-de-xuat.md` (thầy chốt 23/11). CD02.3.12.
- Ý 1: bỏ nút “Sao chép link” và câu “Trang Tikme chưa mở được…” (`tikCopy` trả rỗng), chỉ giữ “Đọc bài gốc trên Tikme”.
- Ý 3: Bến 3, bước la bàn: ô “Thành công là” thành dây ảnh 3 tấm (`sucRope(0)`, lớp `.cmpsum__suc`); ít ảnh thì căn giữa (`.rope__ps--1/--2`).
- Ý 4: nút 1–5 tô dải nâu đỏ `METER_COL` (#F6DDD3 → #8C3A27; chữ mực 1–3, chữ trắng 4–5; lớp `.mn1`–`.mn5`). Đồng hồ bán nguyệt tô chuyển dần từ màu 1 tới màu mức đang chọn (`gaugeSVG`, linearGradient riêng mỗi đồng hồ). Thanh nhỏ trong thẻ kế hoạch tô theo mức.
- Ý 5, 8: `METERS` còn 3: Yêu thích · Tự tin có thể làm được · Phù hợp với mình (thêm tên ngắn m[3]). Bỏ “Khả thi” ở Bến 4 và cân Bến 5. Bài cũ có `feas` thì bỏ qua.
- Ý 6: băng giải thích kế hoạch `voyHead(v)` (lớp `.vhd`): dải A·B·C, chữ cái to, câu hỏi đậm. Chữ B: “Nếu A khó thực hiện / Bạn sẽ làm gì tiếp theo?”; C: “Nếu không phải lo nghĩ về tiền / Bạn sẽ chọn làm điều gì mình thực sự mong muốn?”. Đồng bộ mô tả b42 và lời Shin.
- Ý 9, 10: Bến 5 “Đứng giữa ngã rẽ” làm lại: 4 ngã rẽ (thêm “Về Việt Nam, bạn làm gì?”), 10 giá trị `CROSS_TAG`, mỗi bên 2 giá trị, “Thu nhập tốt” chỉ ở 1/8 lựa chọn, không con số lương. Bỏ “Điểm đổi ý” (thanh kéo tiền) → chọn 1 trong `CROSS_WHY` (“Điều gì có thể làm bạn đổi sang bên kia?”). Tổng kết: hay giữ / hay buông / chắc chắn x/4 / điều hay làm đổi ý. Khóa mới `b53x.c<n>`, `b53x.r<n>` (bài b53 cũ vẫn “đã xong”, mở lại làm theo bản mới). `CROSS_CMP` nối 5/6 cặp la bàn.
- Ý 11: bỏ viền trái `.ptl__x.have` ở dòng thời gian Bến 6.
- Ý 13: Bến 7 thứ tự Chưa quen · Quen sơ · Thân thiết (`RING_L` giữ mã cũ).
- Ý 15: “Bài học xương máu” → “Bài học từ trải nghiệm” (mô tả, bước, phiếu, Sổ tay).
- Ý 16: Shin “Mình thử làm một việc nhỏ hướng đến mục tiêu nhé!”; “mẫu thử” → “việc thử nhỏ” ở b73, Nhiệm vụ lên bờ, mô tả Bến 7.
- Kiểm 390: b33 la bàn, b41/b42 kế hoạch + tự chấm + 3 kế hoạch, b51 cân, b53 ngã rẽ + tổng kết, b71, b73. Không lỗi JS.

Tệp đổi: config.js, sw.js, mọi index.html (?v=), cd02/(content.js, engine.js, cd02.css).
File cần xóa trên GitHub: không có.

## PS1.3.55 · 22/11/2026 · Học tiếp vào thẳng hoạt động, điều hướng chung trong mọi khóa
Đợt 2/2 của bản xem trước PS1.3.54 (ý 24, 25). Thay quyết định 18/11 “chỉ có nút về Proskills trong Cài đặt”.
- **Thanh trên chung** (core.js `PS.navHTML`, core.css `.psnav`): góc trái “‹ <nơi về>” (Proskills / Sơ đồ tuyến / Hải đồ / Bản đồ / Sơ đồ phòng tập / tên ga, bến, ải, bài), giữa là tên màn (trong hoạt động: “2/3”), góc phải luôn Sổ tay (TK thêm nút Hỏi nhanh Chú Tanaka bên trái Sổ tay). Thanh ẩn khi cuộn xuống, hiện khi cuộn lên (làm chung ở core.js). Bỏ nút “‹ Proskills”, “‹ Hải đồ”… nằm trong nội dung và nút bản đồ ở thanh trên (CD01: vòng tiến độ hôm nay; TK: vòng nhịp học đi cùng nút bản đồ, nay không còn).
- **Nút ‹ và Back Android đi giống nhau: “về một cấp”** (core.js `PS.nav`): hoạt động → ga/bến/ải/bài → bản đồ khóa → trang chủ Proskills. Back đóng hộp thoại, Sổ tay, Hỏi nhanh trước. Về trang chủ bằng lịch sử khi khóa được mở từ trang chủ (Back ở trang chủ không quay lại khóa); mở khóa trực tiếp thì thay trang. Nút “Về trang chính” trong Cài đặt dùng cùng cách (`PS.home`). Shin Routine: “‹ Proskills” và nút về trang chủ trong Cài đặt cũng về bằng lịch sử.
- **Cuối hoạt động có Tiếp theo + Về ga/bến/ải/bài**: CD01 (hộp “Đã đóng dấu!”), CD02 (hộp mới “Xong chặng!”), TK (hộp “Chặng tiếp theo”, khi ải còn chặng), TC01 (hộp “Xong hoạt động!”, khi bài còn hoạt động). Hộp con dấu, hộp hoàn thành ga, đục lỗ thẻ, nhận bằng giữ như cũ.
- **Học tiếp mở thẳng hoạt động** (ý 24): mỗi khóa báo `extra.next = {t, go}` (CD01, CD02: chặng kế tiếp; TK: chặng chưa làm đầu tiên; TC01: hoạt động chưa làm đầu tiên của “Gợi ý hôm nay”). Trang chủ: thẻ Học tiếp (khóa đang học dở) mở `<khóa>/?go=<mã>` (`PS.open(id, q)`); khóa mở thẳng hoạt động và dựng sẵn các cấp phía trên để nút ‹ / Back đi đúng. Dòng chữ hoạt động kế tiếp được thoát ký tự (esc).
- Module mẫu (mau 1.0.1) dùng thanh trên chung.
- Phiên bản khóa: CD01.1.8, CD02.3.11, TK16.3, TC01.1.7.
- Kiểm 390 + 1280 + 360: 4 khóa × trang khóa / cấp giữa / hoạt động, Học tiếp từ trang chủ (CD02, TC01) và `?go=` (CD01, TK), ‹ và Back đến trang chủ rồi Back thêm không quay lại khóa, Back đóng menu/Sổ tay, Cài đặt › Về trang chính, ‹ Proskills của Shin, hộp cuối hoạt động (CD01, CD02, TC01, TK), thanh ẩn/hiện khi cuộn; không lỗi JS, không tràn ngang; ES5 (acorn).

Tệp đổi: config.js, sw.js, index.html, core/core.js, core/core.css, hub/hub.js, routine/index.html, routine/proskills.js, cd01/(index.html, engine.js, content.js), cd02/(index.html, engine.js, content.js), tk/(index.html, engine.js, notebook.js, report.js, game-entry.js, content.js, tk.css), tc01/(index.html, engine.js, content.js), mau/(index.html, mau.js, mau.css), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.54 · 22/11/2026 · Trang chủ 3 thẻ, cảm giác app (PWA), chấm lưu bài
Theo bản xem trước `PS1.3.54-xem-truoc-giao-dien.html` (thầy chốt 22/11). Đợt 1/2: giao diện + PWA; đợt 2 (PS1.3.55): Học tiếp đúng hoạt động và điều hướng trong từng khóa.
- **Trang chủ 3 thẻ ở thanh đáy** (hub.js `TAB`, `navHTML`, `setTab`; hub.css khối cuối PS1.3.54): **Hôm nay** (lời chào, khối Shin, Học tiếp; vừa 1 màn hình 390×844) · **Khóa học** (nhắc sao lưu, 3 ô số, băng chuyền, Hướng dẫn, chân trang) · **Lịch học** (thẻ lịch + nút Sửa ở đầu). Thẻ đang xem nhớ trong phiên (`sessionStorage ps.tab`); `?lich=1` mở thẻ Lịch học; nút Back Android ở thẻ 2, 3 về Hôm nay.
- **Học tiếp** (`contHTML`, `contMods`): khóa vừa học (`lastMod`) hoặc khóa đang học dở, rồi khóa mới; tranh thẻ, tiến độ, nút màu khóa; dòng nhỏ “Cũng đang học” khi có khóa thứ hai. Đã đọc sẵn `extra.next.t` (khóa báo hoạt động kế tiếp, làm ở PS1.3.55).
- Lời chào 26 → 23px (bằng “Khóa học của bạn”, “Lịch học”). Khối Shin: “RÈN LUYỆN CÙNG SHIN” + tiêu đề **“Giữ lửa hôm nay”** (đã check-in: “Lửa vẫn cháy!”), dãn khoảng cách tiêu đề, lời Shin, thói quen, nút.
- Tranh thẻ CD02: thuyền buồm + la bàn, nền đất nung (`ART.cd02`, `ART_BG.cd02`).
- Lịch học (lich.js `MON`): Kỹ năng xanh lá #348A5F (trước xanh dương), Kiến thức nghề tím dịu #7E68B0 (trước xanh ngọc). Tấm Đặt lịch / Sửa lịch dùng xanh lá (`.sheet--lc`, trước xanh dương đậm).
- **Xoay màn hình**: bỏ `"orientation": "any"` trong manifest (Android đang xoay theo cảm biến, bỏ qua khóa xoay). App nay theo cài đặt xoay của điện thoại. Android cập nhật cho app đã cài trong khoảng 1 ngày hoặc khi cài lại.
- **Cập nhật** (pwa.js): mở app mà chưa làm gì thì tự cập nhật không hỏi (trang chủ: chưa gõ, chưa mở tấm nào; trong khóa/Shin: chưa chạm); đang làm bài thì thẻ “Proskills có bản mới · Cập nhật ngay / Để sau” (`.ps-upd`). Quay lại app từ nền: kiểm bản mới (≤ 1 lần/30 phút). Sau cập nhật: báo “Đã cập nhật Proskills PSx” (`ps.lastVer`). Dải cập nhật riêng của Shin tắt (proskills.js).
- **Học được khi không có internet**: tải sẵn mọi khóa chuyển từ hub.js sang `PS.warmAll` (pwa.js): trang khóa + tệp `?v=` + `OFFLINE_EXTRA` (phông Lora CD02, game TK, matter TC01). Trạng thái `ps.offline`; Cài đặt mọi khóa có mục “Học được khi không có internet” (thanh tiến độ, nút “Tải về máy ngay”). sw.js: tệp `?v=` mất mạng mà chưa có đúng bản thì dùng bản cùng tên đã lưu.
- **Chấm lưu bài** (`PS.saveMark`, core.css): chấm xanh nhỏ (8px, không chớp) ở góc nút Sổ tay mọi khóa, ảnh đại diện trang chủ, nút Sổ tay Shin; đỏ khi máy chặn lưu / lưu lỗi. `PS.savedHTML(id)`: hộp “Bài làm đã lưu trên máy này · lần lưu gần nhất · sao lưu gần nhất” cuối Tổng quan CD01, CD02, TK, TC01 (không hiện ở demo) và trong Cài đặt Shin.
- **Shin Routine** (routine/proskills.js, routine/index.html nạp thêm `../hub/avatar.js`): nút “‹ Proskills” xám mờ trước ngày; ngày gọn “CN, 22/11” (vừa 1 dòng ở 360px); nút ⋮ thành ảnh đại diện học viên (đổi ở trang chủ thì Shin đổi theo); Cài đặt: nút “Về trang chính Proskills” to, đủ chiều ngang (`.pshome`).
- Phiên bản khóa: CD01.1.7, CD02.3.10, TK16.2, TC01.1.6 (chỉ thêm hộp Đã lưu ở Tổng quan).
- Kiểm 390 + 1280 + 360 (Shin): 3 thẻ trang chủ, Back Android, tấm lịch, Tổng quan 4 khóa, Cài đặt Shin; service worker thật: tải sẵn 4/4 khóa, mở CD02 khi mất mạng, tự cập nhật ở trang chủ khi chưa làm gì, hiện thẻ cập nhật khi đang làm bài ở TK; ES5 (acorn).

Tệp đổi: index.html, manifest.webmanifest, config.js, sw.js, core/core.js, core/core.css, core/pwa.js, hub/hub.js, hub/hub.css, hub/lich.js, routine/index.html, routine/proskills.js, cd01/(index.html, engine.js, content.js), cd02/(index.html, engine.js, content.js), tk/(index.html, notebook.js, content.js), tc01/(index.html, engine.js, content.js), mau/index.html, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.53 · 22/11/2026 · CD02.3.9 Sửa nhỏ theo thầy chốt sau PS1.3.52
- Thẻ cuối trang chủ khóa đổi tên “Thư trong chai hôm nay” → **“Lời anh chị hôm nay”** (`SHIN_TALK.bottle`), tránh trùng với Thư trong chai 7 bến.
- Nhận bằng: bỏ thông báo “Bằng Thuyền Trưởng Vững Vàng! +30 XP” (che nút “Để sau” và dòng “Thuyền vừa có thêm…”); điểm hiện ngay trong popup bằng dưới tấm bằng (`certOv(first, pts)`), giống popup con dấu.
- 8 món thuyền (`SHIP_ITEM`): thầy tạm chốt chữ, sẽ chỉnh sau.
- Kiểm 390 + 1280 (demo): popup con dấu Bến 3, nhận bằng (f2) → popup bằng có “+30 XP”, không còn thông báo che; thẻ trang chủ đúng tên; ES5 (acorn).

Tệp đổi: cd02/engine.js, cd02/content.js, config.js, sw.js, ?v= ở mọi trang html, CHANGELOG.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.52 · 22/11/2026 · CD02.3.8 (bản 4 · đợt 4) Thuyền nâng cấp theo bến
Theo `claude/cd02-ban4-de-xuat.md` mục 5 và bảng 9 mốc thầy duyệt 22/11 (`cd02-ban4-nhap/ship2.js`). Chỉ sửa CD02 (+ số phiên bản).
- **`shipSVG2(P, sym, col, w, ghost)`** (art.js) thay `shipSVG` ở mọi nơi: màn mở đầu, thẻ nhận thuyền (x1), hải đồ, popup con dấu, bằng (f2), popup bằng. `P` = bến đã có dấu (`shipP()`: b1–b7 + `fin` khi nhận bằng); đi bến nào trước cũng được. `ghost = 1`: món chưa có vẽ mờ. Vùng nước dưới thuyền đổi thành vệt bo tròn, viewBox 160×108 (không lộ khung trong hộp có nền biển). `shipSVG` cũ giữ lại, không còn gọi.
- **Popup con dấu Bến 1–7 lần đầu** (`shipUpHTML`): thuyền cũ → món mới hiện dần (1 s), 3 tia lấp lánh ở chỗ món mới (`SHIP_AT`, `shipSpk`) + “Thuyền vừa có thêm: **…**” và 1 dòng ý nghĩa. Mở lại popup: “Món của bến này: …”, không hiệu ứng. Cảng 3 Năm: “Mỗi bến xong, thuyền có thêm một món mới.” Popup bằng (lần đầu) cũng có hiệu ứng món của Đảo Kho Báu.
- **Sổ tay › Bài làm › Sổ Thuyền Trưởng**: mục mới “Thuyền của bạn · cấp x / 8” (`shipSec`): thuyền đủ món, món chưa có vẽ mờ; danh sách 8 món theo bến (✓ đã có, vòng nét đứt chưa có).
- Chữ ở `SHIP_ITEM`, `SHIP_PORT` (cuối content.js). Hải đồ: thuyền rộng 70 (trước 58).
- Mọi hiệu ứng tắt khi máy bật “giảm chuyển động” (thuyền mới hiện ngay).
- Kiểm 390 + 1280 (demo): 194 màn (mọi bước mọi chặng, 9 trang bến), không lỗi JS, không tràn ngang; popup con dấu Bến 3 lần đầu và mở lại; nhận bằng (f2) → popup bằng; Sổ Thuyền Trưởng cấp 3/8 và 8/8; hải đồ; ES5 (acorn) cho cd02/*.js.

Tệp đổi: cd02/art.js, cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.52), config.js, sw.js, ?v= ở mọi trang html, CHANGELOG.md, AGENTS.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.51 · 22/11/2026 · CD02.3.7 (bản 4 · đợt 3) Rương kho báu, Bảng ước mơ thêm hình, Thư trong chai, Thư gửi thuyền trưởng tương lai
Theo `claude/cd02-ban4-de-xuat.md` mục 4 (thầy chốt 22/11). Chỉ sửa CD02 (+ số phiên bản).
- **Rương kho báu (góp ý 21)** · f1 bước 3, dạng `chest` (thay ô viết `f1.change`; bài cũ vẫn hiện trong khung “Bài cũ” nếu đã viết). Rương đóng lắc nhẹ → “Mở rương” → nắp bật, vầng sáng, 8 món bay lên (`CHEST` trong content.js: Mỏ neo p0, Ống nhòm b1, Sổ chuyện anh chị b2, La bàn b3, Hải đồ b4, Áo phao b5, Chìa khóa b6, Đèn lồng b7). Chạm món → thẻ “Bạn đã làm ở bến này” (lấy từ `sheetData` theo mã bến). Chọn 1–3 món quý nhất, mỗi món 1 dòng “Món này giúp mình hiểu hơn về…” (bắt buộc). Khóa `f1.tro`, `f1.tr` [mã bến], `f1.trw.<mã bến>`. Insight theo từng dòng. Hiện ở đầu bản Hướng đi (`chestStrip`), ảnh lưu (`trSVG`, nạp ảnh tuần tự bằng `ld()` trong `sheetImg`), Sổ tay › Bài làm, tin nhắn gửi thầy cô, `extra.chest`.
- **Bảng ước mơ (22, 23)**: nhóm mới **Sở thích, niềm vui** (14 hình: hoa anh đào, pháo hoa, concert, gym, thể thao, cắm trại, đi phượt, chụp ảnh, vlog, vẽ, chơi nhạc, nấu ăn, cà phê cùng bạn, thú cưng) + Kinh doanh online (Công việc), Học online (Học), Căn hộ view đẹp, Đám cưới (Cuộc sống). “Xe riêng” đổi tên “Xe hơi riêng”. Hình mới trong `CD2_PROP` cùng nét tay.
- **Thư trong chai 7 bến (24)**: popup con dấu Bến 1–7 có thẻ “Thuyền vừa vớt được một Thư trong chai!” (`btlCard`) → `btlOv`: chai dập dềnh, nút bần bật ra, lá thư mở ra, câu **nguyên văn** của Senpai theo `BOTTLE` (b1 Tân, b2 Ngát, b3 Thúy, b4 Thu Thảo, b5 Hoài, b6 Lịch, b7 Mai) + “Đọc chuyện của anh/chị” + Tiếp theo. Lưu `S.btl[mã bến]` (trường trạng thái mới). Sổ Thuyền Trưởng thêm hàng “Thư trong chai x/7” (`btlRow`): chai của bến đã có dấu chạm mở được, chai chưa đọc có chấm cam. Học viên cũ đã có dấu vẫn vớt được. `extra.btl`.
- **Thư gửi thuyền trưởng tương lai (25)**: popup bằng lần đầu hỏi “Có, mình viết thư / Để sau” (`futAsk`); trang Đảo Kho Báu có thẻ `futCard`; Sổ tay › Bài làm có hộp thư. `futOv`: ≤ 300 ký tự, ký tên (tên gọi / “Một thuyền trưởng”), ô đồng ý cho thầy cô dùng ẩn tên. `futSend`: hiệu ứng thư cuộn vào chai, đóng nút, chai trôi về chân trời (`dropArt`). Khóa `fut.t`, `fut.sig` (me/anon), `fut.ok`, `fut.at`. Thầy cô nhận qua `extra.fut` và dòng cuối tin nhắn gửi thầy cô (nếu học viên gửi lại).
- Âm `sfx('pop')` nhẹ khi mở rương, mở chai. Mọi hiệu ứng tắt khi máy bật “giảm chuyển động”.
- Kiểm 390 + 1280 (demo): 97 màn (mọi bước mọi chặng, 9 trang bến), không lỗi JS, không tràn ngang; mở rương, chọn món, ảnh lưu 1080 px có Kho báu + Bảng ước mơ; popup con dấu Bến 7 → thư; Sổ Thuyền Trưởng mở lại chai; nhận bằng → viết thư → thả chai; ES5 (acorn) cho cd02/*.js.

Tệp đổi: cd02/art.js, cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.51), config.js, sw.js, ?v= ở mọi trang html, CHANGELOG.md, AGENTS.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.50 · 22/11/2026 · CD02.3.6 (bản 4 · đợt 2) Hoạt động mới: dây ảnh thành công, ngã rẽ, đi một vòng chỗ làm, việc khó, học từ chính mình, nhiệm vụ lên bờ
Theo `claude/cd02-ban4-de-xuat.md` mục 3 (thầy chốt 22/11). Chỉ sửa CD02 (+ số phiên bản). CD02 nay **20 chặng** (`CD2_TOTAL` 20, config total 20).
- **b33 · Dây ảnh “Với bạn, thành công về nghề nghiệp là gì?”** (dạng `success`, thay ô viết b33.work): 3 polaroid kẹp dây, 18 hình / 3 nhóm (`SUCC_GRP`) + Ý khác; mỗi ảnh 1 dòng “vì sao” bắt buộc; ≥ 1 ảnh. Khóa `b33.sc` [3], `b33.sco<i>` (tên ý khác), `b33.scw<i>`. Hình mới `CD2_PROP.key/up/clock`. La bàn tổng kết hiện “Thành công là”. Bài cũ (b33.work) vẫn hiện nếu chưa làm lại.
- **b53 · Đứng giữa ngã rẽ** (Bến 5, dạng `cross` ×3 + `crosssum` + write): `CROSS` (ngã 1 gắn nhãn “Dựa trên chuyện đã từng xảy ra”, số liệu minh họa, để mở), chọn bên → chip điều đã buông → thanh “điểm đổi ý” (`lv`) → tổng kết giữ/buông (`CROSS_TAG`) so với la bàn b31 (`CROSS_CMP`). Khóa **`b53n.*`** (c0–2, p0–2, me); `b53.*` vẫn là thử nhỏ cũ (ACT_KEYS.b53 = b53n.).
- **b72 làm lại**: `tour` Đi một vòng chỗ làm (2 cảnh `TOUR.kt/dv` theo `clipGrp()`, 5 điểm “?”, đoán → “Thử lại nhé.” / “Đúng rồi!” / Mình chưa biết → bài học + áp dụng ở JPC, KTX; hình `tourArt(k)` 360×220; khóa `b72.t`) · write `b72.why` (câu “Tại sao?” tuần này) · `hard` Được giao việc khó (3 tin nhắn `HARD` có tiếng Nhật + nút Nghe; Nhận ngay / Nhận và hỏi thêm / Xin hẹn lần sau; được – phải chịu – cơ hội; `HARD_NOTE` sodan, `HARD_SHIN` ý thầy nói gián tiếp, TD 16.12.2013; khóa `b72.hd`). Bỏ WORKS và bước habit (mã cũ còn, không dùng).
- **b73 · Học từ chính mình** (mới): `lesson` Bài học xương máu (`MISTAKES` 6 thẻ + chuyện riêng; 3 dòng `b73.m1–m3`) · `proto` Thử để biết (nguồn từ b13, kế hoạch A/C, ảnh thành công; Hỏi / Xem / Làm thử `PROTO_K`; quy tắc `PROTO_RULE`; khóa `b73.src/.pk/.pw/.pq`) · `proto2` (đoán thích /5 `b73.pg`, hạn `b73.pdl`, thẻ `protoCard`, Shin routine `PROTO_RT`). Chấm thật sau khi thử: `b73.real`, `b73.surp` (trong cửa sổ nhiệm vụ s7c).
- **b63** bỏ bước Thử nhỏ 2 tuần (thẻ thử nhỏ cũ vẫn hiện ở Sổ tay nếu học viên đã làm và chưa có mẫu thử).
- **Nhiệm vụ lên bờ** (`SHORE` s2, s3, s5, s6, s7a, s7b, s7c): thẻ `shoreCard` cuối chặng b23, b33, b53, b62, b71, b72, b73 (bước có `shore:`), nút “Mình sẽ làm việc này”. f2 thêm bước `shore` “Việc trên bờ của tôi”: chọn ≥ 3, đặt hạn. Cập nhật Chưa / Đang / Đã làm + 1 dòng học được (`shoreOv`, +5 XP `S.xp['shore.<id>']`). Trang chủ khóa nhắc việc tới hạn (`shoreHome`), Sổ tay › Bài làm có danh sách. Khóa `shore.sel` {id: ngày}, `shore.st`, `shore.l.<id>`. Không chặn bằng.
- Bản Hướng đi, tin nhắn gửi thầy cô (sheetData) và `extra` báo cáo thêm: success, cross, tourWhy, hard, lesson, proto, shore.
- Sửa `refreshBar()` không chạy khi không ở trang chặng (lỗi khi gõ trong cửa sổ ở Sổ tay).
- Kiểm 390 + 1280 (demo): đủ 97 màn (mọi bước mọi chặng, 9 trang bến, Sổ tay), không lỗi, không tràn ngang; đáp án sai ở `TOUR` dài bằng hoặc hơn đáp án đúng (kiểm bằng mã).

Tệp đổi: cd02/art.js, cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.50), cd02/index.html, config.js, sw.js, index.html, ?v= ở mọi trang, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.49 · 22/11/2026 · CD02.3.5 (bản 4 · đợt 1) Hải đồ cân đối, nút đi tiếp, con dấu xem lại, b32, la bàn, link Tikme
Theo `claude/cd02-ban4-de-xuat.md` mục 2 (thầy chốt 22/11: “Ok bạn triển khai”). Chỉ sửa CD02 (+ số phiên bản).
- **Hải đồ cân đối (góp ý 1)**: Cảng 3 Năm ở giữa, 7 bến xếp vòng quanh theo chiều kim đồng hồ: Bến 1 trên trái → 2 trên phải → 3 phải → 4 dưới phải → 5 dưới → 6 dưới trái → 7 trái (content.js `BEN[].x, y`; bỏ `ship` riêng của Bến 6). Mặt Đảo giữ nguyên.
- **Bỏ thẻ “Thử nhỏ 2 tuần” ở trang chủ khóa (2)**; vẫn có ở Sổ tay, Hướng đi.
- **Nút đi tiếp (3, 4)**: popup con dấu xếp lại: con dấu → điểm XP/Insight (không còn thông báo che nút) → Shin → “Bạn vừa thêm vào Hướng đi” → **Tiếp theo** / Về hải đồ → thuyền. Trang bến đã xong: hộp con dấu **chạm để xem lại** (`data-act="stampAgain"` → `showStamp(b, 1)`), ngay dưới có nút **Đi tiếp: Bến x**.
- **Phòng Hải Đồ (13)**: popup hiện đủ 3 dòng (A, B, C) thay vì tối đa 2.
- **b32 (8, 9)**: “Mình giải quyết được” / “Ngoài khả năng”; nhãn vòng ngoài “Mình quan tâm nhưng khó thay đổi được”. Vòng trong viền cam đất liền 2,5px, vòng ngoài viền xanh xám nét đứt 2,5px, nền khác nhau.
- **La bàn (11)**: chỉ hiện ý học viên nghiêng về (ý không chọn ẩn hẳn) ở mọi nơi có la bàn (b33, Hướng đi, ảnh lưu). Chưa nghiêng ý nào thì vẫn hiện đủ nhãn.
- **Đảo “Về rồi lại sang Nhật” (12)**: biểu tượng 2 mũi tên vòng tròn (`CD2_IC.cycle`).
- **Link Tikme (6)**: 22/11 tikme.com lỗi 522 (máy chủ Tikme), link trong khóa đúng. Thêm nút “Sao chép link” + dòng “Trang Tikme chưa mở được thì thử lại sau nhé” dưới mọi link Tikme (`tikCopy`, `copyTxt`).
- Kiểm 390 (demo): hải đồ, trang bến xong, popup xem lại, b32, b33; ES5 (acorn) cho cd02/*.js.

Tệp đổi: cd02/art.js, cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.49), cd02/index.html, config.js, sw.js, ?v= ở mọi trang, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.48 · 21/11/2026 · CD02.3.4 (bản 3 · đợt 5) Hình 26 thẻ Senpai, Bảng ước mơ 10 năm nữa, rà banner
Theo `claude/cd02-ban3-de-xuat.md` mục 1 (dreamboard) và mục 5 (hình thẻ Senpai). Thầy bỏ checklist THT ở đợt này. Chỉ sửa CD02 (+ số phiên bản).
- **Hình 26 thẻ Senpai** (art.js `CD2_SPSC` 19 cảnh nơi làm việc, `CD2_PROP` ~40 đồ vật, `spArt(sp, 'thumb' | 'banner')`; content.js `SP_ART {mã: [cảnh hôm nay, đồ vật]}`). Nét tay mượt như CD02, vẽ nơi làm việc và đồ vật, không vẽ mặt người thật. Nền theo phía của đảo (Ở Nhật xanh lá nhạt · Về Việt Nam hồng đất · Cả hai tím nhạt).
  - Thẻ nhỏ: ô vuông 56px = cảnh hôm nay + huy hiệu đồ vật riêng (vd. anh Sỹ: dây chuyền đóng gói + lịch “8” năm; chị Thu Thảo: tiệm bánh + xe bánh). Dùng ở trang đảo, Sổ tay › Thẻ Senpai, b21 chọn người, b11 thẻ đã lật, b52 chuyện thật. Thẻ b11 chưa lật vẫn giữ chữ viết tắt (để khỏi lộ đáp án).
  - Trang chuyện: banner “Khởi đầu → Hôm nay” (đồ vật lúc khởi đầu, mũi tên, cảnh hôm nay, biểu tượng phía Nhật / Việt Nam / máy bay).
- **Bảng ước mơ · 10 năm nữa** (bước đầu của f2 ở Đảo Kho Báu, dạng bước `dream`): lưới 3×3, ô giữa là cờ của bạn. Chạm ô → chọn 1 trong 27 sticker (4 nhóm Công việc · Học · Nơi sống · Cuộc sống) + 1 dòng ghi chú (không bắt buộc). Shin dán sẵn tối đa 4 ô từ bài đã làm (hướng kế hoạch A, phía Nhật/Việt Nam, nhóm ngành, điều coi trọng ở CD01, mức tiếng Nhật), nhãn “Shin gợi ý”. Cần dán ít nhất 6/8 ô. Khóa: `f2.db` (9 mã), `f2.dbt<i>` (ghi chú), `f2.dbs` (ô Shin gợi ý).
  - Hiện ở bản Hướng đi của tôi (dưới la bàn), ảnh lưu (vẽ lưới 3×3 vào ảnh), Sổ tay › Tổng quan, tin nhắn gửi thầy cô (dòng “Bảng ước mơ”), báo cáo `extra.db`.
- **Rà banner**: thêm rương kho báu trên cầu tàu ở banner Đảo Kho Báu. Các banner khác kiểm ở 390 + 1280, giữ nguyên.
- Kiểm 390 + 1280 (demo, mở hết bến): đi trọn 78 bước của 20 chặng, 26 trang chuyện, 8 đảo, 9 bến, 4 tab Sổ tay: không lỗi JS, không tràn ngang; chọn sticker, ghi chú, bỏ hình, Lưu ảnh (1080 px, có Bảng ước mơ); ES5 (acorn) cho cd02/*.js. Máy iPhone cũ không có aspect-ratio: có chiều cao dự phòng.

Tệp đổi: cd02/art.js, cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.48), cd02/index.html, config.js, sw.js, ?v= ở mọi trang, CHANGELOG.md, AGENTS.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.47 · 21/11/2026 · CD02.3.3 (bản 3 · đợt 4) Clip MyRoad, ba anh em Trung – Dũng – Hiếu, nối Shin routine
Theo `claude/cd02-ban3-de-xuat.md` mục 5. Chỉ sửa CD02 (+ 1 dòng báo cáo ở routine/proskills.js, số phiên bản).
- **Clip MyRoad (loạt phim 20 năm Esuhai, YouTube)**: dữ liệu `CLIPS` (6 người: Hoài, Thu Thảo, Hợi, Cẩm Vinh, Thiệu, Son), `CLIP_AT`, `CLIP_SAY` trong content.js. Mỗi clip: ảnh bìa → chạm mới nhúng YouTube (youtube-nocookie, nhảy thẳng tới **đoạn đáng xem**), 3 ý chính viết lại bằng lời khóa học (không dán transcript), “Ý nào chạm bạn nhất?” **không bắt buộc**, nút Mở trên YouTube. Cần mạng; không xem được vẫn đọc 3 ý.
- Theo nhóm ngành (lấy từ nhóm ngành ở b61): Kỹ thuật, sản xuất, xây dựng → b22 anh Hoài, b52 anh Hợi · Thực phẩm, dịch vụ, chăm sóc → b22 chị Thu Thảo, b52 chị Cẩm Vinh. Mọi học viên: b62 anh Thiệu (trượt phỏng vấn, làm lại CV), b71 chị Son (người giúp, chủ động chào hỏi). Ở b22, b52 có nút “Xem thêm clip nhóm ngành khác”.
- Chỗ đặt: b22 bước 1 (thay câu nói của Shin) · b52 cuối bước “Anh chị đã làm” · b62 cuối bước tổng kết phỏng vấn · b71 bước 1 (thay câu nói của Shin). Số chặng, số bước không đổi. Thẻ Senpai có clip hiện khối “Nghe … kể”.
- **Ba anh em Nguyễn Ngọc Trung, Dũng, Hiếu** (Tikme): thẻ Senpai mới `ngoc3` (đảo Về làm chủ, f: rel, learn), dòng mới ở “Người giúp trong chuyện thật” (b71). Câu trích của anh Dũng ghi người nói (`qBy`). Tổng thẻ Senpai 26.
- **Nối Shin routine** (dùng `PS.routineSugHTML` sẵn có, Shin tự mở thẻ hoặc màn đặt công thức, có thanh Quay lại CD02): b52 gợi ý 2 thẻ theo tình huống bị chặn (`BLOCKS[].rt`) + công thức gợi ý “Khi…, tôi sẽ…, để trở thành…” (`rtf`); b63 Thử nhỏ 2 tuần gợi ý 1 thẻ “Mang sang Shin routine” (`TRIAL_RT`, mặc định `viecko`). Thẻ thử nhỏ, Hướng đi của tôi hiện “Shin routine: tên thẻ · x/14 ngày ghi nhận” khi học viên đang rèn thẻ đó. Demo: hiện khung mẫu, không có đường dẫn.
- routine/proskills.js: báo thêm `extra.dn {mã thẻ: số ngày đã ghi nhận}`.
- Báo về trang chủ thêm `extra.clip` (ai đã xem, ý chọn) và `extra.rt` (thẻ thử nhỏ, trạng thái, số ngày).
- Kiểm 390 + 1280 (demo): b22, b52, b62, b63, b71, thẻ Senpai Hợi và ba anh em, chạm xem clip (iframe), chọn ý, xem clip nhóm khác; không lỗi JS (chỉ lỗi mạng do máy kiểm không vào được YouTube); ES5 (acorn) cho cd02/*.js, config.js, routine/proskills.js.

Tệp đổi: cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.47), cd02/index.html, config.js, sw.js, routine/proskills.js, ?v= ở mọi trang, CHANGELOG.md, AGENTS.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.46 · 21/11/2026 · CD02.3.2 (bản 3 · đợt 3) Phòng Tuyển Dụng: tin dạng tờ báo, phỏng vấn theo tin, dòng thời gian dọc
Theo `claude/cd02-ban3-de-xuat.md` mục 4 (thầy chốt 21/11: công ty giả định + lương tham khảo). Chỉ sửa CD02 (+ số phiên bản).
- **b61 tin dạng tờ báo trên giấy memo**: dấu 求人, tên công ty (giả định), vị trí, ngành, nơi làm, **lương tham khảo**, việc chính, 5 yêu cầu chia nhóm **Tiếng Nhật · Chuyên môn · Kỹ năng · Kinh nghiệm · Thái độ**. Tick điều “3 năm sau mình sẽ có” → mở “Vì sao nhà tuyển dụng cần”; cần mở ít nhất 3 lý do. Bỏ tô 3 màu và thẻ AD_MORE (thái độ nằm trong từng tin).
- **Tin theo nhóm ngành**: 5 nhóm (Sản xuất, kỹ thuật · Xây dựng · Thực phẩm, nông nghiệp · Kaigo · Nhà hàng, khách sạn), Shin chọn theo nghề CD01/x1.job, đổi được. Mỗi loại (Việt Nam / Nhật) hiện 3 tin = 2 tin của nhóm + 1 tin mọi ngành (Phiên dịch xưởng / Hỗ trợ thực tập sinh). 21 tin, ghép từ tin thật 2026 (JobsGO, CareerLink, 123job, Joboko, Indeed Nhật, en-gage) và thống kê lương 2025 của Bộ Y tế, Lao động và Phúc lợi Nhật (Kỹ năng đặc định trung bình ~221.000 yên/tháng). Nhánh Kế hoạch kinh doanh giữ nguyên.
- Ghi chú thật ở Tin ở Nhật, nhóm Nhà hàng: từ 13/4/2026 Nhật tạm dừng cấp mới Kỹ năng đặc định 1 ngành Nhà hàng (外食) cho người ở nước ngoài (Cục Quản lý XNC, 27/3/2026).
- **b62 phỏng vấn đúng tin đã chọn**: người phỏng vấn theo tin (`ADS[].iv`); câu 1 chung “Vì sao bạn muốn làm công việc này?” (`whyjob`), câu 2–3 do học viên chọn 2 trong 5 yêu cầu (Shin chọn sẵn điều chưa tick; `b62.rq`). Câu hỏi theo nhóm yêu cầu ở `IV_RQ` (tiếng Nhật + câu Việt có trích yêu cầu). Chưa đọc tin hoặc đọc kế hoạch kinh doanh: chọn như bản 2.
- **b63 dòng thời gian dọc**: Bây giờ (JPC) · Năm 1 · Năm 2 · Năm 3 · Sau 3 năm. Tự đưa vào: cả 5 yêu cầu của tin (điều đã tick có dấu ✓), “Còn thiếu” ở Kế hoạch A, bằng chứng còn thiếu ở phỏng vấn, điều tự thêm. Chạm một điều → chạm mốc; chạm điều đã xếp để đổi mốc hoặc bỏ ra. Cần xếp ít nhất 4 điều. Sổ tay và Hướng đi của tôi hiện đủ 5 mốc.
- Kiểm 390 + 1280 (demo): b61 (đổi loại, nhóm ngành, ghi chú Nhà hàng, tick, Vì sao), b62 (chọn yêu cầu, 3 câu), ivend, b63 (xếp, đổi mốc), thử nhỏ, popup con dấu Bến 6, Sổ tay; không lỗi JS; ES5 (acorn) cho cd02/*.js, config.js.
- Lưu ý dữ liệu cũ: ai đã làm b61 ở bản trước, nếu mở lại phải tick/mở lý do lại; các mốc năm đã xếp ở b63 vẫn giữ nếu chữ trùng.

Tệp đổi: cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.46), cd02/index.html, config.js, sw.js, ?v= ở mọi trang, CHANGELOG.md, AGENTS.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.45 · 21/11/2026 · CD02.3.1 (bản 3 · đợt 2) Giới thiệu bến, con dấu, Hướng đi đủ mảnh, làm lại b22, b32, b71, RIASEC
Theo `claude/cd02-ban3-de-xuat.md` (thầy chốt 21/11). Chỉ sửa CD02 (+ số phiên bản).
- **Giới thiệu bến (29)**: lần đầu vào bến, Shin nói 3 dòng **Nghĩ về · Làm · Mang về** (dữ liệu `why` ở PORT, BEN, GOAL_PORT). Sau đó thu thành nút “Bến này để làm gì?” (i).
- **Popup con dấu (14)**: “Bạn đã xong [bến]. Giờ [mục đích]” (`aim`) · “Bạn vừa thêm vào Hướng đi của tôi” (2 mục của bến đó) · nút **Tiếp theo: [bến gợi ý]** (`nextBen`) + Về hải đồ.
- **Hướng đi của tôi đủ mảnh (2)**: mỗi mục gắn mã bến, xếp theo bến, có biểu tượng bến. Thêm: Điểm xuất phát, Hướng quan tâm nhất (b12), Điều mang theo (b21), Câu muốn hỏi (b23), Điều có thể làm đổi kế hoạch + cách ứng phó (b32), Thuận lợi/Thách thức kế hoạch A, câu hỏi và lời khuyên ở b71. Tin nhắn gửi thầy cô không còn dòng trùng.
- **Thuận lợi, thách thức ở Kế hoạch A (3)**: bước mới `need` trong b41: chạm từng điều “Cần gì” của hướng A → Mình đã có / Còn thiếu + 1 dòng tự viết (`b41.nh`, `b41.nd`). “Còn thiếu” chảy sang danh sách xếp năm ở b63 (nguồn “Kế hoạch A”).
- **Bến Gặp Gỡ = Đọc · Xem · Hỏi (12)**: b21 “Đọc · chuyện 2 anh chị”, b22 “Xem · điểm chung của anh chị”, b23 “Hỏi · phỏng vấn anh chị đi trước”. b22 bỏ đếm 5/25 và thẻ “có sẵn nhiều tiền”: chọn 2–3 điều bạn thấy → hiện những anh chị **có kể** về điều đó (chạm đọc chuyện), ghi chú “bài không kể không có nghĩa là không có” (`b22.sel`). Giữ bước Nền tôi xây ở JPC. Chỗ chèn clip MyRoad để đợt 4.
- **b32 hai vòng tròn (18)**: học viên tự viết 2–3 điều (≥2; ví dụ mờ) → đặt vào “Mình tác động được” / “Khó tác động”, hình 2 vòng tròn cập nhật ngay → bước 2: vòng trong “Nếu … xảy ra, mình sẽ…”, vòng ngoài “Phần nhỏ nào mình vẫn làm được?” (`b32.w0–2`, `b32.z`, `b32.a0–2`). [Gió] ở b42 lấy điều học viên viết (ưu tiên điều khó tác động). Không ghi tên sách.
- **b71 (29b)**: mức thân **Thân thiết · Quen sơ · Chưa quen**; “Bạn cùng công ty trúng tuyển”; “Anh chị Nghiệp đoàn, tổ chức hỗ trợ”. Bỏ soạn tin nhắn → **Chuẩn bị câu hỏi** (chọn 1–2 gợi ý, sửa tự do, `b71.ask`) + Shin khuyên cất điện thoại, gặp trực tiếp; ô “Mình đã gặp ai, họ khuyên gì” (`b71.met`) để trống được, không chặn con dấu; Sổ tay có nút “Gặp rồi? Ghi lại lời khuyên”. GV thấy trong báo cáo (`extra.ask`, `extra.met`).
- **RIASEC từ CD01 (23)**: đọc `extra.ria` của CD01. b12: nhãn “Hợp sở thích của bạn” ở tối đa 3 đảo (`RIA_ISLE`, 2 nhóm đầu). b21 Người 2: xếp trước và gắn nhãn tối đa 4 anh chị hợp 2 nhóm đầu (`RIA_SP`). Dòng “chỉ là gợi ý tham khảo”. Chưa làm CD01 thì ẩn.
- Demo: thêm `ria: 'RCS'`, dữ liệu b22, b32 mới.
- Kiểm 390 + 1280 (demo): giới thiệu bến, nút (i), b12, b21 Người 2, b22, b32 (2 bước), b41 need, popup con dấu Bến 4, b71, f2 Hướng đi + Lưu ảnh (1080×4770), đi trọn b41→f2 không kẹt, không lỗi JS; ES5 (acorn) cho cd02/*.js, config.js.

Tệp đổi: cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.45), cd02/index.html, config.js, sw.js, ?v= ở mọi trang, CHANGELOG.md, AGENTS.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.44 · 21/11/2026 · CD02.3.0 (bản 3 · đợt 1) Sửa nhanh giao diện, chữ theo 32 góp ý của thầy
Theo `claude/cd02-ban3-de-xuat.md` (thầy chốt 21/11). Chỉ sửa CD02 (+ số phiên bản, câu nhắc trang phục ở routine/proskills.js).
- **Bỏ chữ “Vòng”**: 4 giai đoạn tên **Khám phá bản đồ · Thiết kế hải trình · Dong buồm ra khơi · Vững tay về đích**; câu trên danh sách “Chọn một giai đoạn để xem các bến”; nhãn banner “Bến 4 · Thiết kế hải trình”; thông báo khóa bến nói rõ cần xong bến nào.
- **Đổi tên**: Bến Senpai → **Bến Gặp Gỡ** · Cảng Khởi Hành → **Đảo Kho Báu** (“Kho báu ở đây chính là hướng đi bạn tự vẽ”) · Bằng Thuyền Trưởng → **Bằng Thuyền Trưởng Vững Vàng** · trang đảo “Phải chịu” → **Thách thức** · b12 “Hướng nào làm bạn **quan tâm** nhất lúc này?”.
- **Bỏ số phút** ở thẻ bến, banner bến, từng chặng (giữ số chặng); chữ mờ dưới chặng, dưới bến 12px (bằng dòng “đi bến nào trước cũng được”).
- **Bến, chặng đang học tô cam đất** (viền, nền rất nhạt, số chặng, tên).
- **Hải đồ to hơn**: khung tràn gần sát lề (viền trắng 3px), viewBox 360×510 (toạ độ y × 1,085), tên bến 12px, nhãn cao 23px. Đảo “Về rồi lại sang Nhật” dời xuống (y 318) cho khỏi sát Cảng 3 Năm.
- **Mặt Đảo**: chỉ giữ Cảng 3 Năm (hình + tên); ẩn bến, tuyến, thuyền.
- **Thuyền không che tên**: `shipSpot()` thử 10 vị trí quanh bến, chọn chỗ không đè nhãn tên nào (điểm phạt ×100), ít đè hình bến nhất. Kiểm đủ 8 vị trí (cảng + 7 bến).
- **La bàn to, có chú thích** (`compassSVG`, viewBox 400×330): tên 12 đầu trục; đầu bạn nghiêng về in đậm cam đất + chấm mức 1–5; áp mọi chỗ (b31, b33, bản 1 trang, ảnh lưu, Sổ tay).
- **b33**: “Ở tuổi 30…” → “**10 năm nữa**, một cuộc sống tốt với bạn là…” (bài cũ vẫn đọc đúng); dòng tuổi: “10 năm nữa, bạn khoảng …”. Khối Senpai đổi thành “**Các anh chị vận dụng điều thầy dặn thế nào?**”: anh Sỹ (chọn một nghề, làm liên tục), chị Thu Thảo (lấy ngắn nuôi dài), anh Huân (đi theo nhịp của mình).
- **b42**: chấm kế hoạch B ngay sau B, chấm C ngay sau C, rồi mới đặt 3 kế hoạch cạnh nhau.
- **Bớt đậm, bớt đen**: `--ink` #141413 → #2B2A27 (cả màu đen viết thẳng trong cd02.css, khung hải đồ), độ đậm 800→700, 700→600, bóng nút 3px → 2px. Không thêm màu. Hình minh họa giữ nguyên.
- Kiểm 390 + 1280 (demo): trang chủ, 2 mặt hải đồ, 8 vị trí thuyền, giai đoạn, trang bến, trang đảo, b31, b33; không lỗi JS; ES5 (acorn) cho cd02/*.js, config.js.

Tệp đổi: cd02/content.js, cd02/engine.js, cd02/art.js, cd02/cd02.css (đầu file + khối cuối PS1.3.44), cd02/index.html, config.js, sw.js, routine/proskills.js (1 câu), ?v= ở mọi trang, CHANGELOG.md, AGENTS.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.43 · 20/11/2026 · CD02.2.2 (phiên 3) Âm thanh ra/vào bến, banner Phòng Tuyển Dụng, người phỏng vấn
Theo “Việc tiếp theo · Phiên 3” trong cd02-tiep-tuc.md (bản 2 thầy chốt 20/11). Chỉ sửa CD02. Không đổi chữ, chặng, cách chấm, bài làm.
- **Âm thanh nhẹ khi ra/vào** (tự soạn bằng Web Audio, không tải tệp, theo công tắc âm thanh chung, không tiếng sóng): vào cảng, bến ngoài trời (Cảng 3 Năm, Đài Vọng Biển, Bến Senpai, Vịnh Ngã Rẽ, Ngọn Hải Đăng, Cảng Khởi Hành) nghe chuông thuyền 2 tiếng; vào nơi trong nhà (Xưởng La Bàn, Phòng Hải Đồ, Phòng Tuyển Dụng) nghe tiếng cửa + chuông “pin-pon”; về Hải đồ (cả nút Back điện thoại) nghe 2 nốt nhẹ đi xuống, ra khỏi phòng nghe tiếng cửa khép. Quay từ chặng về trang bến thì im lặng.
- **Cửa trượt khi vào phòng**: banner của 3 nơi trong nhà mở bằng 2 cánh cửa giấy kiểu Nhật trượt sang hai bên (0,75 giây). Giảm chuyển động: không có cửa.
- **Banner Phòng Tuyển Dụng vẽ lại**: bên trong phòng, cửa sổ nhìn biển, bảng tin 求人 có tin tô 3 màu như ở b61, lịch “+3” (3 năm sau), cây xanh, ghế ứng viên, bàn phỏng vấn có bảng 面接; người ngồi sau bàn là người phỏng vấn hợp hướng bạn nghiêng (hoặc người bạn đã chọn ở b62).
- **5 nhân vật người phỏng vấn** (vẽ chung, không phải người thật): Trưởng xưởng (mũ, đồng phục) · Nhân sự công ty ở Nhật (vest, thẻ tên) · Giám đốc người Nhật và chị nhân sự (2 người) · Thầy cô tuyển sinh (tóc búi, kính tròn) · Giám đốc xưởng Nhật (áo khoác xưởng). Hiện ở bước chọn người phỏng vấn, đầu mỗi câu hỏi (phòng phỏng vấn nhỏ: cửa sổ, lịch +3, người sau bàn) và ở “Người phỏng vấn hay hỏi thêm”.
- Đo chữ nhìn thấy khi đi trọn 20 chặng ở demo (390px, chữ trên màn đầu của mỗi bước, tính cả tiêu đề và thanh nút): 7.064 chữ, bằng PS1.3.42 (phiên 3 không thêm chữ). Nhiều nhất: f2 Hướng đi của tôi 1.383 chữ, b62 Phỏng vấn 471 chữ.
- Kiểm 390 + 1280: đi trọn 20 chặng ở demo không kẹt, không lỗi JS; âm thanh đúng từng loại nơi; Back điện thoại; giảm chuyển động; trang chủ, 1 service worker; ES5 (acorn) cho config.js, core/*.js, hub/*.js, cd02/*.js.

Tệp đổi: cd02/art.js, cd02/engine.js, cd02/content.js (room: 1, số phiên bản), cd02/cd02.css (khối cuối PS1.3.43), cd02/index.html, config.js, sw.js, ?v= ở mọi trang (index.html, cd01, cd02, tk, tc01, mau, routine/index.html), CHANGELOG.md, AGENTS.md, cd02-tiep-tuc.md.
File cần xóa trên GitHub: không có.

## PS1.3.42 · 20/11/2026 · CD02.2.1 (phiên 2) Bến Phòng Tuyển Dụng, phỏng vấn anh chị đi trước, Các bước thường gặp
Theo bản 2 thầy chốt (PA A, 20/11). Chỉ sửa CD02. Vẫn 18 chặng, 7 bến.
- **Gộp chặng**: “Hướng làm bạn tò mò” vào “8 hướng đi sau 3 năm” (b12) · Kế hoạch B và C chung một chặng (b42; C gọn: chỉ mốc năm 5, chấm B và C trên một màn, rồi đặt 3 kế hoạch cạnh nhau) · “Thử nhỏ 2 tuần” vào “Kế hoạch 3 năm ở Nhật” (b63). Vịnh Ngã Rẽ còn 2 chặng.
- **Bến 6 mới · Phòng Tuyển Dụng** (b61–b63, Vòng Ra khơi, giữa đáy hải đồ):
  - b61 Đọc tin tuyển dụng 3 năm sau: chọn Tin ở Việt Nam · Tin ở Nhật · Kế hoạch kinh doanh (Shin chọn sẵn theo hướng bạn nghiêng, tin gần nghề lên trước). 8 tin mô phỏng từ tin thật 2026 (bỏ tên công ty, không ghi lương); chạm tô màu từng yêu cầu: Chắc có sau 3 năm · Phải cố mới có · Cần đi đường khác; rồi thẻ “Điều nhà tuyển dụng hay để ý thêm” (theo Sổ tay tìm việc của JASSO). Kế hoạch kinh doanh 1 trang của 3 nhân vật ghép: chấm 5 dòng Rõ · Mơ hồ · Thiếu, “Nếu là người góp vốn, bạn có góp không?”, chọn điều cần chuẩn bị, xem anh Hợi, chị Thu Thảo, chị Cẩm Vinh đã bắt đầu thế nào.
  - b62 Phỏng vấn 3 năm sau: nhãn “Từ CD01” hiện câu trả lời phỏng vấn 60 giây. Chọn người phỏng vấn (5 người theo hướng đi) và 3 câu (8 câu, có tiếng Nhật, nút Nghe đọc giọng máy ja-JP theo công tắc âm thanh). Mỗi câu 3 ô ngắn Việc · Kết quả · Học được gì, tự soát “Có bằng chứng thật chưa?” và “Nói được bằng tiếng Nhật chưa?”, người phỏng vấn hỏi thêm 1 câu. Kết thúc: Thẻ bằng chứng còn thiếu.
  - b63 Kế hoạch 3 năm ở Nhật: xếp từng bằng chứng còn thiếu (từ tin tuyển dụng, kế hoạch kinh doanh, phỏng vấn, hoặc tự thêm) vào Năm 1 · 2 · 3, rồi chọn việc thử nhỏ 2 tuần (giữ cơ chế cũ). Vào bản Hướng đi của tôi, Sổ tay, báo cáo GV.
- **Ngọn Hải Đăng thành Bến 7** (b71–b72). Bài làm cũ tự chuyển (`migrate()`: b61/b62 → b71/b72, dấu b6 → b7, bỏ dấu xong riêng của b13, b43, b53).
- **b23 Phỏng vấn anh chị đi trước**: học viên là phóng viên nhỏ của lớp, chọn chị Hạnh (về làm công ty Nhật) · anh Phúc (về làm chủ) · chị Ngân (ở lại, lên Kỹ năng đặc định 2), hỏi ít nhất 3 câu, rồi đọc chuyện thật cùng hướng. Ba người là nhân vật ghép, có ghi chú.
- **Các bước thường gặp** trên 8 đảo (trang đảo mở sẵn, ở b12 gấp lại): 3–4 bậc, điều kiện chung, ghi chú Ikusei Shuro từ 1/4/2027 ở 2 đảo ở Nhật, link trang chính thức ISA (Kỹ năng đặc định; visa Kỹ thuật – Nhân văn – Quốc tế).
- Hình: biểu tượng `doc`, nơi chốn `office` (hình nhỏ và banner Phòng Tuyển Dụng). Sổ Thuyền Trưởng 8 ô dấu; chữ “6 bến” → 7 bến; con cá trên hải đồ dời sang trái.
- Kiểm 390 + 1280: đi trọn 20 chặng ở demo (cả nhánh tin tuyển dụng và kế hoạch kinh doanh), không lỗi JS, ES5 đạt; thử chuyển bài cũ.

Tệp đổi: cd02/content.js, cd02/engine.js, cd02/art.js, cd02/cd02.css (khối cuối PS1.3.42), cd02/index.html, config.js, sw.js, ?v= ở mọi trang, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.41 · 20/11/2026 · CD02.2.0 (phiên 1) Chữ dễ hiểu hơn, nối CD01, Xem và sửa, lò xo
Thầy chốt bản đề xuất 2 (20/11, `claude/cd02-ban2-de-xuat.md`). Phiên 1: chữ, nối CD01, Xem và sửa, lò xo. Chỉ sửa CD02.
- **Chữ nói thẳng, ít ẩn dụ**: thế giới biển chỉ còn ở tên nơi chốn và hình. “Hải trình A/B/C” → “Kế hoạch A/B/C”; “Đoán hải trình” → “Họ đi đâu sau 3 năm?”; “Mượn 2 cuốn sách người” → “Đọc chuyện 2 anh chị”; “Cán cân” → “Điều bạn coi trọng”; “Gió ngoài khơi” → “Điều có thể làm đổi kế hoạch”; “Ngọn hải đăng của bạn” → “Người giúp bạn”; “Hải trình của tôi” → “Hướng đi của tôi”; tab Sổ tay “Hải trình” → “Bài làm”. “TTS” viết đủ “thực tập sinh”. Shin nói 1 câu mỗi lần (bỏ câu thứ hai), bỏ phần lớn dòng chữ mờ dưới câu hỏi, rút gọn chuyện Senpai, tình huống ở chỗ làm, tình huống bị chặn đường.
- **Ẩn hết chip gợi ý** (`tipsHTML` trả rỗng, bật lại bằng `window.CD2_TIPS_ON = 1` nếu cần); giữ ví dụ mờ trong ô ở các câu khó: điều nghĩ sau 3 năm, câu hỏi Senpai, nếu điều khó xảy ra, đi làm là để, tuổi 30, 3 kế hoạch cạnh nhau, khác đi điều gì.
- **Dòng Insight dưới ô viết** chỉ hiện khi đã được điểm (“+5 Insight”).
- **Nối CD01**: nhãn “Từ CD01” tự hiện ở đầu bước có `c1: [...]` (b13 hướng 5 năm · b21 anh chị muốn học theo, điều muốn học · b22 điều muốn làm được ở Nhật · b23 câu từng muốn hỏi · b31 điều quan trọng nhất · b32 điều lo nhất · b33 5 năm sau muốn là người · b41 hướng 5 năm, kế hoạch ở Nhật · b42 nghề phương án 2 · b43 việc làm thấy vui · b53 việc nhỏ hứa thử · b61 người dẫn đường · b62 thói quen). Xuất phát: xong CD01 thì chọn 3 thẻ “mang lên thuyền” (`x1.carry`); chưa xong (hoặc đang dở) thì Shin khuyên học CD01 trước, có nút “Sang học CD01” và “Vẫn vào CD02”; vẫn vào thì trả lời nhanh nghề, 5 năm sau muốn là người thế nào, điều quan trọng nhất, điểm mạnh (`x1.me`, `x1.val`, `x1.good`, tối đa 2). Cảng Khởi Hành f1 thêm bước **tái bút cho thư CD01** (`f1.ps`). Bản 1 trang có mục “Từ CD01”; báo cáo thêm cd1, carry, quick, ps.
- **Xem và sửa / Làm lại từ đầu** như CD01: chặng đã xong mở bảng chọn; làm lại giữ bài cũ trong `S.bak` đến khi đóng dấu lại, có “Khôi phục bài cũ”.
- **Lò xo mảnh xám nhạt** bên trái Sổ Thuyền Trưởng (thay đường may).
- Đo chữ nhìn thấy khi đi trọn 20 chặng (390px): 8.334 → 7.109 chữ (−15%; riêng phần nội dung khoảng −18%) (tính cả thanh nút, tiêu đề cố định); phiên 2 gộp b13, b42–b43, b53 sẽ giảm thêm.
- Kiểm 390 + 1280: đi trọn 20 chặng qua “Xem và sửa”, Xuất phát ở 3 trạng thái CD01 (chưa học · dở · xong), không lỗi JS.

Tệp đổi: cd02/content.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.41), cd02/index.html, config.js, sw.js, ?v= ở mọi trang module, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.40 · 19/11/2026 · CD02.1.2 Hải đồ 2 mặt, vòng gấp, sổ gọn, thuyền buồm kiểu Nhật
Theo góp ý của thầy (19/11). Chỉ sửa CD02; nội dung, bài làm giữ nguyên.
- **Hải đồ 2 mặt**: nút gạt Bến | Đảo cạnh tiêu đề. Mặc định mặt Bến (ẩn 8 đảo). Bật mặt Đảo: đảo hiện ra, các bến và tuyến mờ đi, nhãn tên bến và Cảng 3 Năm ẩn hết; thanh “Sương đã tan” chỉ hiện ở mặt Đảo. Đổi mặt không vẽ lại trang (giữ vị trí cuộn).
- **Các vòng dưới hải đồ mặc định đóng**: mỗi vòng (Khám phá · Thiết kế · Ra khơi · Đích) là một hàng gấp, có số bến đã có dấu và nhãn “Đang đi” ở vòng có chặng kế tiếp; chạm để mở các bến. Vòng đã mở giữ nguyên khi quay lại trang chủ trong cùng lần học.
- **Thuyền một kiểu xuyên suốt**: thuyền buồm kiểu Nhật (thân cong, mũi vút, đuôi cao có lầu lái, buồm vuông ghép dải dọc). Biểu tượng cờ của học viên là huy hiệu tròn giữa buồm, màu cờ ở cờ đuôi nheo; Shin đứng ở mũi. Không còn lớn dần theo bến (tham số lv giữ để tương thích). Sửa câu ở bước nhận thuyền.
- **Sổ Thuyền Trưởng gọn**: bỏ chuỗi ngày, XP, Insight và % sương tan; còn tên, nghề, cảng nhà, khẩu hiệu, con dấu, số Thẻ Senpai. Các số điểm vẫn ở Sổ tay (tab Tổng quan) và thông báo điểm.
- **Nét bút sổ tay mượt** (bổ sung cùng ngày, thầy chọn PA B): bỏ bộ lọc `cd2rough` (xô lệch điểm ảnh nên nét gãy thành bậc thang, nặng trên máy yếu). Thay bằng `hand()` trong art.js: mỗi đoạn thẳng của hình (path, rect, line) uốn thành đường cong rất nhẹ, độ cong theo độ dài đoạn, điểm đầu cuối giữ nguyên; tính một lần khi vẽ, có bộ nhớ đệm (khoảng 10 ms cho cả 9 cảnh và 8 hình nhỏ), không tốn gì khi cuộn. Áp cho banner, hình nhỏ ở bến, hải đồ (cả khung và nhãn). Không áp cho thuyền (vector tô màu), cờ, la bàn (còn xuất ảnh), Shin, chữ.
- **Tên đảo gọi thẳng con đường** (thầy chốt PA A): Ở lại, lên bậc nghề · Rẽ nghề khác (Nhật Bản) · Học tiếp · Về rồi lại sang Nhật · Làm nghề tiếng Nhật (Cả hai nơi) · Về gần gia đình · Về làm chủ · Về làm công ty Nhật (Việt Nam). Bỏ chữ “Đảo” trước tên; nhãn phía “Cả hai nơi”. Mã đảo giữ nguyên nên bài làm cũ không mất.
- **Hải đồ mặt Đảo chia 3 vùng**: Việt Nam (trái, tông đào) · Cả hai nơi (giữa, oải hương) · Nhật Bản (phải, rêu), có tên vùng và vạch chia; tên đảo dài xuống 2 dòng; hoa gió, cá, thuyền mờ/ẩn ở mặt Đảo cho thoáng.
- **Mỗi đảo một hình riêng** (`isleDraw`): xưởng + bậc thang đi lên · biển chỉ đường hai nhánh · trường có tháp chuông và chồng sách · bến nhỏ + mũi tên đi về · bảng chữ あ và bong bóng Ă · tòa văn phòng nối cầu · cửa hàng mái hiên sọc · nhà có khói bếp, ruộng lúa. Dấu hiệu phía: đảo Nhật có núi đỉnh tuyết, đảo Việt Nam có cây dừa. Trang đảo dùng cùng hình, bỏ cột biển biểu tượng.
- **Thuyền vẽ vector tô màu cùng kiểu Shin** (viền nâu đậm, gỗ ấm, buồm kem, mái lầu lái đỏ, nước xanh nhạt), không qua nét phác; trên hải đồ to hơn (58px) cho nổi bật.
- Kiểm 390 + 1280 (demo): hải đồ 2 mặt, so trước/sau banner Xưởng La Bàn, mở/đóng vòng, thuyền ở hải đồ và cỡ lớn; ES5 (acorn) cho cd02/*.js; không tràn ngang.

Tệp đổi: cd02/art.js, cd02/engine.js, cd02/cd02.css (khối cuối PS1.3.40), cd02/content.js (số phiên bản), cd02/index.html, config.js, sw.js, ?v= ở mọi trang module, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.39 · 19/11/2026 · CD02.1.1 Giao diện sổ tay cho Hải Đồ La Bàn
Thầy chốt (19/11): 4 tông nhạt theo vòng, tiêu đề chữ có chân như bản phác, hải đồ PA B (biển tô xanh xám), Sổ Thuyền Trưởng PA A nhưng bỏ lò xo, banner PA A (tranh trên, chữ dưới), cờ học viên chọn tông dịu, chỉ sửa CD02. Không đổi nội dung chữ, chặng, cách chấm của CD02; không đổi CD01, TK, TC01, Shin Routine, trang chủ.
- **Hệ màu mới** (kiểu trang claude.ai): nền ngà, chữ mực đen, cam đất chỉ ở nút, tiêu đề, banner, dây đánh dấu; bỏ teal và vàng. Thẻ viền mảnh thay bóng đổ; nút cam đất nổi khối nhẹ; ô chọn đang chọn viền đen nền cam nhạt.
- **Chữ tiêu đề Lora** (có chân, đủ dấu tiếng Việt), kèm tệp phông trong `cd02/fonts/` để chạy cả khi mất mạng; nội dung giữ Be Vietnam Pro.
- **Hải đồ mới**: giấy biển xanh xám, viền đôi có vạch tọa độ, sóng và hoa gió nét mực, đảo tô theo phía (Ở Nhật rêu · Về VN đào · Cả hai oải hương), đảo còn sương là mây tô chấm (không lộ màu đảo), mỗi bến là hình vẽ nhỏ của nơi chốn + nhãn; tuyến đang đi nét cam, bến đã có dấu có dấu tích đen, bến chưa mở mờ + khóa. Đảo Quê Nhà, Gió Hai Chiều, Cầu Nối, Tự Lập dời vào trong khung.
- **Sổ Thuyền Trưởng mới**: sổ bìa da bò, giấy kẻ dòng có lề đỏ, đường may thay lò xo, dây đánh dấu cam đất, ảnh polaroid lá cờ dán băng keo, chữ điền kiểu viết tay, khẩu hiệu gạch chân lượn sóng, 7 con dấu kiểu hộ chiếu (tròn, vuông, bát giác; mực cam đất hoặc xanh than; có ngày đóng) + ô Cảng Khởi Hành, thanh sương tan, thẻ Senpai, Streak · XP · Insight.
- **Banner 8 nơi chốn** (tranh nét mực, tô chấm, nền tông vòng): Cảng 3 Năm, Đài Vọng Biển, Bến Senpai, Xưởng La Bàn, Phòng Hải Đồ, Vịnh Ngã Rẽ, Ngọn Hải Đăng, Cảng Khởi Hành; trang đảo có cảnh đảo riêng.
- **Danh sách bến**: thẻ hàng ngang, ô tranh nơi chốn theo tông vòng, số chặng · phút, trạng thái (Có dấu / số chặng / Chưa mở).
- **Sổ tay**: bìa da bò, 4 tab giấy (Tổng quan · Hải trình · **Thẻ Senpai** (mới, tách khỏi Hải trình) · Cài đặt); mỗi đầu ra là một tờ ghi chú dán băng keo. Vẫn mở tab Cài đặt trước.
- **Cờ học viên**: 6 tông dịu (Cam đất, Xanh ngọc, Xanh biển, Vàng nắng, Tím oải hương, Than chì). Cờ đã chọn màu cũ tự đổi sang tông dịu gần nhất, không mất bài làm.
- Shin thuyền trưởng trong CD02 quàng khăn cam đất (core/shin.js không đổi nên Tủ đồ Shin Routine vẫn khăn teal).
- La bàn, đồng hồ tự chấm, vòng tròn ngọn hải đăng, Hải trình của tôi (cả ảnh xuất), Bằng Thuyền Trưởng, con dấu: đổi sang hệ màu mới. Thẻ CD02 ở trang chủ đổi màu cam đất (config.js).
- Kiểm 390 + 1280: demo đi trọn Bến 4 → Cảng Khởi Hành (tự điền), hải đồ, trang đảo, Sổ tay 4 tab, bằng; ES5 (acorn) cho cd02/*.js; không lỗi console; không tràn ngang.

Tệp đổi: cd02/art.js, cd02/engine.js, cd02/content.js, cd02/cd02.css, cd02/index.html, **cd02/fonts/ (mới: Lora-Variable.ttf, Lora-Italic-Variable.ttf, LORA-OFL.txt)**, config.js, sw.js, index.html và ?v= ở mọi trang module (cd01, tc01, tk, mau, routine/index.html), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.38 · 18/11/2026 · CD02.1.0 Hải Đồ La Bàn: Bến 4–6 + Cảng Khởi Hành (đủ khóa)
Làm tiếp theo khung thầy đã chốt (PA A, Hải Đồ La Bàn, không Excel duyệt chữ). Không đổi nội dung CD01, TK, TC01, Shin Routine; Xuất phát và Bến 1–3 giữ nguyên.
- **CD02 đủ 18 chặng** (Xuất phát 1 + Bến 1–5 × 3 + Bến 6 × 2) + Cảng Khởi Hành 2 chặng (không tính vào tổng, như Ga Ước Mơ CD01). config.js: total 18, ver CD02.1.0.
- **Bến 4 Phòng Hải Đồ** (Vòng Thiết kế, mở sau Xưởng La Bàn): b41 Hải trình A · Đường đang đi (gợi lại hướng 5 năm CD01 và câu viết lúc nhận thuyền) · b42 Hải trình B · Nếu đường A đóng lại (dùng cơn gió khó ở b32) · b43 Hải trình C · Nếu không lo tiền, không lo ai nghĩ gì + đặt 3 hải trình cạnh nhau (vuốt ngang) + viết điều nhận ra. Mỗi hải trình: chọn đảo (hoặc đảo riêng), đặt tên, dòng thời gian 5 năm sau 3 năm ở Nhật (năm 1, 3, 5 kèm tuổi; gợi ý mốc theo đảo), tiếng Nhật cần đạt, 4 đồng hồ tự chấm Thích · Tự tin · Hợp la bàn · Khả thi.
- **Bến 5 Vịnh Ngã Rẽ**: b51 Bàn cân nhắc (học viên tự đặt nặng/nhẹ cho 4 đồng hồ → điểm 3 hải trình; chọn hải trình đang nghiêng; kết quả cân giống/khác cảm giác) · b52 Khi đường bị chặn (4 tình huống từ chuyện thật đã công khai: trượt N2, công ty chưa có chi nhánh ở VN, dịch bệnh, gia đình cần → hỏi vì sao 3 tầng → chọn 2–3 cách gỡ + bước nhỏ đầu tiên → xem Senpai thật đã làm gì: anh Huân, anh Dũng, anh Hợi, anh Hoài, anh Sỹ, chị Cẩm Vinh, chị Hưng) · b53 Thử nhỏ 2 tuần (gợi ý theo đảo của hải trình nghiêng; thẻ 14 ngày đánh dấu ở Hải đồ và Sổ tay).
- **Bến 6 Ngọn Hải Đăng**: b61 Ngọn hải đăng của bạn (8 nhóm người xếp vào 3 vòng Đã gần · Có quen · Cần tìm, vẽ thành vòng tròn; chọn người giúp nhiều nhất; chuyện thật anh Hợi, chị Ngát, chị Linh) + soạn tin nhắn xin lời khuyên (mẫu tự điền, sửa được, chép) · b62 Học từ công việc (3 tình huống ở chỗ làm, mỗi cách có cái được và lưu ý, không đúng/sai; chọn cách học + gợi ý thẻ Shin Routine; viết cách tập ở JPC).
- **Cảng Khởi Hành** (mở khi đủ 6 con dấu bến): f1 Nhìn lại hải trình (đo độ mở lần 2, so với lúc nhận thuyền) · f2 Hải trình của tôi (bản 1 trang: la bàn, 3 hải trình, nền, khi đường bị chặn, thử nhỏ, người soi đường, độ mở; Lưu ảnh canvas + In/PDF) → báo cáo thầy cô (chép / mở Teams) → Bằng Thuyền Trưởng. Xong: `S.fin`, nút Xem bằng ở Hải đồ và Sổ tay.
- **Tủ đồ của Shin** (core/shin.js, routine/proskills.js): thêm trang phục **Thuyền trưởng** vào `FITS` với khóa `cd02`; chỉ mặc được khi `PS.summary('cd02').extra.fin` (học viên nhận Bằng Thuyền Trưởng). `PSShin.earned(f)`. Demo GV Shin Routine vẫn thử được.
- Sổ tay › Hải trình thêm: 3 hải trình, thẻ thử nhỏ, khi đường bị chặn, ngọn hải đăng, cách học, Bằng Thuyền Trưởng.
- **Demo giáo viên** `cd02/?demo`: học viên giả định đã xong Xuất phát + Bến 1–3 để thầy cô thử ngay Bến 4–6 và Cảng Khởi Hành.
- Báo về trang chủ `extra` thêm: voy (3 hải trình: đảo, tên, JLPT, mốc, đồng hồ, điểm), trio, leanVoy, leanFeel, leanWhy5, block, blockRoot, ways, firstStep, trial, trialStart, trialDays, trialLearn, ring, guide, msgTo, work6, learnH, learnHow, open2, change, fin.
- Kiểm 390 + 1280: đi trọn Bến 4 → Cảng Khởi Hành, ảnh Hải trình của tôi, Sổ tay; Tủ đồ mở Thuyền trưởng sau khi xong; ES5 (acorn) cho cd02/*.js, core/shin.js, routine/proskills.js; không lỗi console; không tràn ngang.

Tệp đổi: cd02/content.js, cd02/engine.js, cd02/cd02.css, cd02/index.html, core/shin.js, routine/proskills.js, config.js, sw.js, index.html và ?v= ở mọi trang module, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.37 · 18/11/2026 · CD02.0.1 Hải Đồ La Bàn: Xuất phát + 3 bến đầu
Thầy chốt: PA A (6 bến, không tuyến tính), câu chuyện Hải Đồ La Bàn (thủy thủ đoàn, không dùng chữ hải tặc, thế giới riêng của khóa), góc nhìn THT nói gián tiếp “thầy của Shin”, không qua Excel duyệt chữ. Không đổi nội dung CD01, TK, TC01, Shin Routine.
- **Module mới `cd02/`** (art.js → content.js → engine.js, cd02.css): mở ở trang chủ (`state: 'ready'`, cổng “Thuyền của Shin xuất phát từ cảng nào?” → Cảng 3 Năm), total 16 chặng (bản này mở 10).
- **Hải đồ** (trang chủ module): Sổ Thuyền Trưởng (cờ, tên, nghề, cảng nhà, 7 con dấu, % sương tan, thẻ Senpai) · bản đồ SVG: Cảng 3 Năm ở giữa, 6 bến, 8 đảo phủ sương (sương tan khi ghé đảo, lật thẻ, gắn nhãn) · thuyền lớn dần theo số bến có dấu · danh sách bến theo 3 vòng · Thư trong chai (câu nguyên văn Senpai, đổi mỗi ngày).
- **Mở khóa**: Xuất phát → Vòng Khám phá (Bến 1, Bến 2 đi thứ tự tùy ý) → Xưởng La Bàn → (Phòng Hải Đồ, Vịnh Ngã Rẽ, Ngọn Hải Đăng, Cảng Khởi Hành: Sắp mở). Đảo ghé tự do sau khi nhận thuyền.
- **Xuất phát · Nhận thuyền (x1)**: Shin chào · dữ liệu CD01 (nghề, hướng 5 năm, thư) hoặc chọn nghề nhanh · thiết kế cờ (8 biểu tượng, 6 màu, khẩu hiệu) · đo độ mở lần 1 (số hướng, rõ mấy phần, nghĩ gì) · mục tiêu khóa · Sổ Thuyền Trưởng.
- **Bến 1 Đài Vọng Biển**: b11 Đoán hải trình (lật 6 thẻ Senpai) · b12 Bản đồ 8 đảo (cần gì, được gì, đánh đổi, ai đã đi; gắn nhãn Tò mò / Chưa từng nghĩ / Chưa hợp) · b13 Đảo làm bạn tò mò.
- **Bến 2 Bến Senpai**: b21 Mượn 2 cuốn sách người (cùng nghề, khác đường) · b22 Tìm điểm chung (đoán rồi xem Shin đếm từ 25 chuyện) + “Mọi hải trình đều xuất phát từ Cảng 3 Năm” (5 nền, việc nhỏ, gợi ý thẻ Shin Routine) · b23 Hỏi chị Hạnh (nhân vật ghép) + câu hỏi gửi Senpai thật.
- **Bến 3 Xưởng La Bàn**: b31 Cán cân (6 cặp thanh trượt → la bàn) · b32 Gió ngoài khơi (8 điều có thể đổi kế hoạch) · b33 Shin nhớ thầy dặn (đường đời 18–40, “lấy ngắn nuôi dài”, Senpai đi khác đường) + đi làm là để…, tuổi 30 tốt là….
- **25 thẻ Senpai** người thật (Tikme, esuhai.vn, JLPT N3 trở lên; anh Hợi, chị Kim Thanh chưa ghi JLPT), câu nguyên văn + link bài gốc. Sổ tay: Tổng quan | Hải trình (sổ, la bàn, nền, câu hỏi, bộ thẻ) | Cài đặt.
- **core/shin.js**: thêm trang phục riêng `captain` (mũ thuyền trưởng, khăn teal) dùng cho CD02; không nằm trong Tủ đồ.
- Demo giáo viên `cd02/?demo`: học viên giả định đã nhận thuyền.
- Báo về trang chủ `extra`: job, flag, goal, open1, fog, cards, curious, isl, books, base, askSenpai, compass, lean, windHard, adapt, work, life30, stamps.
- Kiểm 390 + 1280: đi trọn Xuất phát → Bến 3, đảo, thẻ Senpai, Sổ tay, demo; ES5 (acorn); không lỗi console.

Tệp đổi: cd02/ (mới: index.html, cd02.css, art.js, content.js, engine.js), core/shin.js, config.js, sw.js, index.html và ?v= ở mọi trang module, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.36 · 18/11/2026 · (gộp PS1.3.35 + PS1.3.36) Ảnh đại diện · Cỡ chữ Vừa/Lớn · Gà Shin lớn dần thay mèo Shin
Thầy chốt: ảnh đại diện khoảng 12 hình tự vẽ (không cần duyệt), làm gộp hai bước. Không đổi nội dung CD01, TK, TC01.
- **Ảnh đại diện** (Cài đặt trang chủ › Ảnh đại diện, tệp mới `hub/avatar.js`): 12 hình vẽ phẳng, nền tròn màu nhạt (Cáo, Gấu trúc, Cá voi, Cú, Ếch, Bạch tuộc, Núi Phú Sĩ, Tên lửa, Xương rồng, Cơm nắm, Âm nhạc, Bóng đá) hoặc chữ cái đầu tên với 8 màu (màu vàng cũ là mặc định). Lưu `PS.prefs().av` ('i:mã' / 'c:số'), có trong tệp sao lưu. Hiện ở góc phải thanh trên.
- **Cỡ chữ Vừa / Lớn** (Cài đặt chuẩn của mọi khóa, ngay dưới Âm thanh; `PS.prefs().fs`): Lớn = chữ đến 24px × 1,12, 24–40px × 1,05, chữ to hơn giữ nguyên; áp cho trang chủ, CD01, TK, TC01, Shin Routine (core.js đọc các quy tắc CSS và nhân cỡ chữ; không đụng chữ trong hình SVG). Đổi ở đâu cũng áp cho mọi khóa.
- **Gà Shin** (tệp mới `core/shin.js`, `PSShin`): Shin Routine bỏ mèo, dùng gà theo nét vẽ CD01, lớn dần theo số ngày đã ghi nhận: Trứng (0–2 ngày, vỏ nứt dần) → Gà con (3) → Gà choai (14) → Gà lớn (30, có mào, đuôi). 18 biểu cảm (hi, still, cheer, think, curious, wow, worry, sleep, yawn, moved, comfort, proud, focused, determined, waiting, pout, wink, welcome), cánh cử động theo biểu cảm, mắt chớp, đuôi vẫy, tôn trọng giảm chuyển động.
- **Tủ đồ của Shin** (Shin Routine › Sổ tay › Cài đặt › nhóm Proskills): 8 trang phục mở dần theo giai đoạn: Khăn HLV (mặc định), Mũ JPC, Tự nhiên · Gà con: Mùa đông Nhật, Nơ lịch sự · Gà choai: Thể thao, Đi làm · Gà lớn: Tốt nghiệp. Có thanh tiến độ tới giai đoạn sau. Lưu `PS.prefs().shinFit`. Demo GV: Shin đã lớn, thay đồ chỉ thử tạm.
- **Màn "Shin đã lớn"**: khi số ngày ghi nhận vừa qua mốc, hiện một lần, kèm trang phục mới mở.
- Trang chủ: khối Shin Routine vẽ gà Shin đúng giai đoạn, trang phục, biểu cảm theo hôm nay (chờ check-in, đã check-in, chưa có thẻ). Biểu tượng Shin `routine/icon-192.png`, `icon-512.png` đổi sang gà (cũng dùng ở khối gợi ý thẻ Shin trong CD01, TC01).
- Shin Routine M.Claude.3.4.0: `shin(mood)` trong routine/scripts/core.js gọi `PSShin.now()`; interaction.js chỉ gắn lớp chuyển động; how-visual.js sửa cách gắn lớp `hv-shin`.
- Kiểm 390 + 1280: trang chủ, Cài đặt (đổi ảnh, chữ cái màu, cỡ chữ Lớn/Vừa), CD01, TK, TC01, Shin Routine (học viên mới, demo GV, Tủ đồ, Cách làm có Shin, màn Shin đã lớn) với chữ Lớn: không tràn ngang; ES5 (acorn) cho core.js, shin.js, avatar.js, hub.js, proskills.js; không lỗi console.

Tệp đổi: core/shin.js (mới), hub/avatar.js (mới), core/core.js, core/core.css, hub/hub.js, hub/hub.css, index.html, sw.js, config.js, cd01/index.html, tk/index.html, tc01/index.html, mau/index.html, routine/index.html, routine/habit-game.html, routine/proskills.js, routine/icon-192.png, routine/icon-512.png, routine/scripts/core.js, routine/scripts/interaction.js, routine/scripts/how-visual.js, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.34 · 18/11/2026 · Logo chữ O nảy mầm · intro · dùng như app thật · mở khóa nhanh hơn · Shin bỏ màn chào
Thầy chốt: cặp logo V1 (hình app, nền xanh) + V2 (logo trang chủ, nền trắng); chữ Proskills màu xanh dương của logo, nhỏ hơn một chút; intro lần mở đầu trong ngày; bỏ intro Shin Routine; đồng ý mọi đề xuất PWA. Không đổi nội dung CD01, TK, TC01.
- **Logo mới** (3 màu JPC: xanh dương #0F4D98, xanh lá #199F5A, đỏ #EE1D23): `icons/logo.svg` = V2; `app-192/512.png` = V1; `maskable-512.png` (nền tràn, logo trong vùng an toàn 80%); `apple-touch-icon.png` (nền tràn, iPhone tự bo góc). Bản gốc SVG ở `Logo-Proskills/PS1.3.33-logo-PA2-bien-the/` trên máy thầy.
- **Thanh trên**: chữ "Proskills" 22 → 20px, màu #0F4D98; tiêu đề màn Chào mừng cùng màu.
- **Intro "chữ O nảy mầm"** (hub.js `intro()`, hub.css `.pi*`): vòng O tự vẽ → lá đỏ, lá xanh nảy ra → chữ Proskills → logo thu nhỏ bay về góc trái thanh trên (khoảng 1,8 giây). Chỉ lần mở đầu tiên trong ngày (`ps.intro`), không chạy khi mở bằng liên kết sâu (?lich, ?go, ?m, ?thu). Chạm để bỏ qua. Giảm chuyển động: hiện tĩnh rồi mờ đi. index.html tô nền xanh trước (html.ps-intro) để không chớp trang chủ; manifest `background_color` #0F4D98 để màn chờ Android nối liền intro.
- **Dùng như app thật** (core.css cuối tệp + pwa.js, áp cho mọi trang): không bôi đen chữ/nút (ô nhập vẫn chọn được; lớp `.ps-sel` để cho phép chỗ cần), không kéo để tải lại (`overscroll-behavior:none`), không phóng to (viewport `maximum-scale=1, user-scalable=no` ở mọi trang + `touch-action: pan-x pan-y` + chặn `gesturestart` và chạm 2 ngón cho iPhone), không lướt ngang cả trang (`html{overflow-x:hidden}`, `body{overflow-x:clip}`), không hiện menu nhấn giữ trên màn hình cảm ứng (trừ ô nhập). routine/habit-game.html có khối kiểu riêng tương tự.
- **Nút Back** (Android, cử chỉ vuốt về): đóng tấm Cài đặt / Lịch học thay vì thoát app (`W.PSSheetPush/PSSheetDone`, lich.js `close(fromBack)`, `PSLich.close`).
- **Mở khóa học nhanh hơn** (sw.js): trang HTML mạng trước nhưng chỉ chờ 2 giây (trước 3,5 giây); tệp có `?v=` lấy từ bộ nhớ ngay; hình, phông, âm thanh mở bản đã lưu ngay và cập nhật ngầm. Trang chủ tải sẵn các khóa chạy ngầm 4 giây sau khi mở (`warm()`, mỗi phiên bản một lần, bỏ qua khi tiết kiệm dữ liệu/2G). Chạm thẻ khóa hiện ngay màn "ĐANG MỞ <tên khóa>" theo màu khóa (`.ps-going`).
- **Lối tắt khi nhấn giữ biểu tượng app** (manifest `shortcuts`, Android): Check-in hôm nay · Lịch học · Học tiếp (`?go=last` mở khóa gần nhất, lưu ở `PS.prefs().lastMod`). Biểu tượng `icons/sc-*.png`.
- **Shin Routine M.Claude.3.3.42**: bỏ màn chào (cả lần đầu) và nền xanh chờ (`growth-starting`) trong routine/index.html, proskills.js không gọi `splashBoot` gốc; lời Shin hỏi khi mở app hiện sau 0,9 giây (boot.js, trước 2,8 giây).
- Kiểm 390 + 1280: intro (lần đầu, mở lại cùng ngày, giảm chuyển động, màn Chào mừng), Cài đặt và Lịch học đóng bằng Back và bằng nút, màn Đang mở, ?go=last, cuộn ngang bị khóa ở trang chủ, CD01, TK, TC01, Shin; service worker tải sẵn khóa; ES5 (acorn) cho hub.js, lich.js, pwa.js, proskills.js; không lỗi console.

Tệp đổi: icons/logo.svg, icons/app-192.png, icons/app-512.png, icons/maskable-512.png, icons/apple-touch-icon.png, icons/sc-checkin.png (mới), icons/sc-lich.png (mới), icons/sc-hoctiep.png (mới), manifest.webmanifest, index.html, hub/hub.js, hub/hub.css, hub/lich.js, core/core.css, core/pwa.js, sw.js, config.js, offline.html, cd01/index.html, tk/index.html, tc01/index.html, mau/index.html, routine/index.html, routine/habit-game.html, routine/boot.js, routine/proskills.js, routine/scripts/core.js (APP_VER), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.33 · 18/11/2026 · TC01.1.5: mở Radio Taiso Deck (6 bài) + Buổi tập 10 phút cùng Shin
Thầy chốt: Radio Taiso PA1 (học theo cụm, ráp dần), Buổi 10 phút PA A (3 bài cố định), đồng ý cả 8 đề xuất. Không đổi trang chủ, CD01, TK, Shin Routine, các khu khác.
- **Radio Taiso Deck mở** (`KHU.radio.ready`), 6 bài, 18 hoạt động: **r1 Radio Taiso là gì?** (3 câu: bài là gì, gặp ở đâu, vì sao nên thuộc · ghép 6 từ tiếng Nhật · mini-game Bắt nhịp 1–8) · **r2–r5 bốn cụm** 1–3, 4–7, 8–10, 11–13 (xem cách làm 2 khung/động tác + 3 điểm chính · thẻ nhanh "hình này là động tác nào / sau X là gì" · tập theo nhịp; r5 thay thẻ nhanh bằng xếp đủ 13 động tác) · **r6 Trọn bài** (tập 13 động tác theo nhịp · mở video có nhạc + tự chấm 3 tiêu chí Bảng 3.3 · hẹn 7 buổi Radio Taiso, có thẻ đóng dấu mỗi ngày ở khu và Sổ tay).
- Tên 13 động tác (tiếng Việt + tiếng Nhật nhỏ) theo Viện Khoa học Tuổi thọ Nhật Bản. 21 tư thế mới, nhìn thẳng, **lật như soi gương** (có ghi chú). Trong app chỉ có tiếng đếm nhịp (いち…はち), nhạc thật mở video YouTube (không nhúng nhạc vì bản quyền). Học viên có chấn thương: động tác 11 gợi ý nhún gối tại chỗ.
- **Buổi tập 10 phút cùng Shin** (nút dưới "Gợi ý hôm nay"): chọn 1 trong 3 bài (Tỉnh táo buổi sáng · Sức mạnh · Chống mỏi nghề) → khởi động 2 phút → 6 động tác × (làm 40 giây, nghỉ 20 giây) → giãn 2 phút → cảm nhận (Nhẹ nhàng / Vừa sức / Mệt / Có chỗ bị đau). Có Tạm dừng, Bỏ qua, Dừng buổi tập, "Thấy đau? Dừng ngay". Không đục lỗ thẻ; mặt sau thẻ ghi số buổi. Nữ: chống đẩy tự đổi sang khuỵu gối.
- Thẻ hội viên thêm dòng đục lỗ **DECK** (đủ 36 lỗ = CHAMPION). Gợi ý hôm nay có Radio Taiso. Sổ tay: ô "Dấu Radio Taiso", "Buổi tập 10 phút"; mục "Buổi tập 10 phút", "Radio Taiso của mình". Báo trang chủ `extra.radio`, `extra.s10`. Demo GV có dữ liệu mẫu cho cả hai. config.js: TC01 `total` 103, `ver` TC01.1.5.
- Kiểm 390 (Nhà xưởng nam, Dịch vụ nữ có chấn thương) + 1280 (Dây chuyền nam): làm trọn 18 hoạt động, buổi 10 phút (xong trọn và dừng vì đau), Sổ tay, thẻ hội viên, demo GV; hồi quy Góc nghề n2c, Sàn tập b2c, Phòng test t4b; độ dài đáp án (r1a + 10 vòng thẻ nhanh: 0 lỗi); ES5; không lỗi console.

Tệp đổi: tc01/content.js, tc01/engine.js, tc01/art.js, tc01/tc01.css, tc01/index.html, config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html, routine/index.html (số phiên bản), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.32 · 18/11/2026 · TC01.1.4: Phòng test đợt 2 · t4 Tự test sức mạnh, t5 Tự test sức bền, t6 Bảng thành tích
Theo kế hoạch 302 đã chốt (PA 1). Không đổi trang chủ, CD01, TK, Shin Routine, các khu khác, bài t1–t3.
- **t4 Tự test sức mạnh**: Tự test sao cho đúng (3 câu: khởi động trước, chỉ đếm cái đúng tư thế, đau thì dừng) · Test Cơ bản (hít đất, plank, squat) · Test Nâng cao (hít đất, gập bụng nâng cao, squat 1 chân, squat bình nước). Mốc Đạt theo Chương trình TTS 30 tiết, Bảng 3.1, dòng "Đạt" (bảng gốc ghi "<=", app hiểu "từ … trở lên"). Nữ: Cơ bản dùng hít đất khuỵu gối (khớp mốc 30 của Sổ quản lý v10.1), Nâng cao dùng hít đất thường. Gập bụng nâng cao = gập bụng nâng chân (`legraise`). Squat 1 chân, squat bình nước chưa có hình: ghi "làm theo cách thầy cô GDTC dạy".
- **t5 Tự test sức bền**: Test nâng cao đùi + jumping jack (bấm giờ, thang Yếu · Trung bình · Tốt của Sổ quản lý v10.1) · Tăng sức bền an toàn (3 câu: tăng dần, hạ nhịp bằng đi chậm, choáng/tức ngực thì dừng và báo).
- **t6 Bảng thành tích**: Thẻ thành tích (tên, lớp, ngày, mỗi bài: lần này, lần trước, mốc, ▲▼, Đạt; mục tiêu lần tới; chữ ký Shin) để chụp màn hình gửi GV · Mục tiêu lần test tới (viết, gợi ý theo bài chưa đạt mốc).
- Dạng mới **ft**: giới thiệu (danh sách bài, mốc, kỷ lục) → từng bài (hình + 3 điểm chính, đếm chạm/nhập số hoặc bấm giờ; "Bỏ qua bài này") → kết quả bài (mốc, so lần trước) + đồng hồ nghỉ 2 phút → tổng kết (bảng, ± so lần trước, cảm nhận bắt buộc). Không cho lưu buổi test bỏ qua hết. Dạng **board**.
- Lưu `S.ft.h`; số test cũng vào Kỷ lục cá nhân (ô "Lần tập thử" không tính test). Báo trang chủ `extra.test.ft`. Sổ tay › Thẻ hội viên: mục "Thể lực tự test". Demo GV có 3 buổi test mẫu. config.js: TC01 `total` 85, `ver` TC01.1.4.
- Kiểm 390 (Nhà xưởng nam, Dịch vụ nữ, Ngoài trời nữ) + 1280 (Văn phòng nam): làm trọn 7 hoạt động mới, test lại để thấy ± và ▲▼, bỏ qua bài, Sổ tay, demo GV, trang chủ; hồi quy Tập thử Sàn tập và t1b; độ dài đáp án (t4a, t5b: 0 lỗi); ES5; không lỗi console.

Tệp đổi: tc01/content.js, tc01/engine.js, tc01/tc01.css, tc01/index.html, config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html, routine/index.html (số phiên bản), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.31 · 18/11/2026 · TC01.1.3: mở Phòng test (302 Test Lab) đợt 1 · t1–t3 · ngân hàng câu
Theo PA 1 đã chốt (bảng đánh giá lớp GDTC, Chương trình TTS 30 tiết, Bảng 3.2). Không đổi trang chủ, CD01, TK, Shin Routine, các khu khác.
- **Phòng test mở** (`KHU.test.ready`), 6 bài (`BAI_TEST`); đợt 1 xong 3 bài, 6 hoạt động; t4 Tự test sức mạnh, t5 Tự test sức bền, t6 Bảng thành tích hiện "Sắp mở".
- **t1 Test thử Dinh dưỡng**: Đúng hay sai 10 câu (khởi động) · Test thử 20 câu, mốc Đạt từ 15/20. **t2 Sức khỏe & Bệnh lý**: tương tự. **t3 Test tổng**: 30 câu (15 + 15), mốc Đạt từ 25/30 · Ôn lại câu đã sai (tối đa 10 câu/lượt; chưa có câu sai thì ôn nhanh 10 câu ngẫu nhiên).
- **Ngân hàng câu** (content.js): `QB.dd` 36 câu, `QB.sk` 38 câu (3 đáp án, `o[0]` đúng, máy xáo), `QTF` 16 + 16 câu Đúng/Sai. Mỗi câu có `s` = bài để ôn; kết quả hiện nút "Ôn: Khu › Bài". Soạn từ bài TC01 + Sổ tay sức khỏe 2.0 (Ch.1, 2, 3, 7, 9). Kiểm độ dài đáp án: 0 lỗi.
- Dạng mới: **quiz** (làm như đề thật: chọn đáp án trung tính, đi lại giữa các câu, lưới số câu, nộp khi đủ; kết quả: điểm, Đạt/Chưa đạt mốc lớp, thanh mốc, Kỷ lục, câu cần xem lại + giải thích) · **tf** (Đúng/Sai, phản hồi ngay) · **redo** (ôn câu sai, chọn lại đến khi đúng; đúng ngay lần đầu thì câu rời danh sách).
- Lưu `S.test` {q: tốt nhất/lần cuối/số lần, w: câu cần ôn, tf}; báo trang chủ `extra.test`. Sổ tay: ô "Dấu Phòng test", "Câu cần ôn", mục "Phòng test của mình". Thẻ hội viên thêm dòng đục lỗ **TEST**. config.js: TC01 `total` 78, `ver` TC01.1.3.
- Không dùng từ Sổ tay: lịch "thải độc" theo giờ, tỷ lệ 50/25/25, "tập trước bữa sáng đốt mỡ hơn 20%". Bảng 3.2 gốc ghi ngược dấu (Đạt "<15/20"), app dùng "từ 15/20".
- Kiểm 390 (Nhà xưởng nam, Ngoài trời nữ) + 1280 (Dịch vụ nữ): làm trọn t1a, t1b (thử nộp thiếu câu), t2a, t2b, t3a, t3b; Sổ tay; demo GV; trang chủ phòng tập; ES5; không lỗi console.

Tệp đổi: tc01/content.js, tc01/engine.js, tc01/tc01.css, tc01/index.html, config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html, routine/index.html (số phiên bản), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.30 · 18/11/2026 · TC01.1.2: Phòng y tế đợt 2 (y4–y6) · Thang 5 mức khi không khỏe
Làm theo dàn bài đã duyệt. Không đổi trang chủ, CD01, TK, Shin Routine, các bài y1–y3.
- **y4 Bong gân, trầy xước**: ca trực "Trận bóng chiều chủ nhật" (dừng, chườm lạnh 15–20 phút, băng ép vừa chặt, kê cao; rửa vết trầy bằng nước sạch; đỏ lan, sưng nóng, mủ, sốt → đi khám) · xếp 4 việc Nghỉ – Lạnh – Ép – Kê cao · chuyện bạn Q. té xe trước ngày bay (hỏi dồn 3 "vì sao" + viết "Trước ngày bay, mình sẽ…").
- **y5 Đau lưng, cổ, vai**: ca trực "Sau ca bê hàng" (mỏi thường / đau nhiều thì báo, xin việc nhẹ / đang đau không tự tập mạnh / tê, yếu chân → đi khám / phòng lại) · xem cách làm 3 động tác nhẹ (EX `backcare`: nghiêng cổ, xoay vai, chống tay ưỡn lưng) · chọn 1 thói quen giữ lưng, cổ, vai (`YHABITS`, 3 chung + 1 theo nhóm, lưu `S.yte.habit`, không đè thói quen Góc nghề).
- **y6 Không khỏe thì báo thế nào**: ca trực "Báo ốm bằng tiếng Nhật" (báo trước giờ vào ca, câu 体調が悪いので、今日は休ませてください, nói rõ dấu hiệu, tự đi khám + nhờ dịch qua điện thoại, khám xong báo lại) · Thang 5 mức: mức nào, làm gì? (5 câu, xong hiện thẻ thang) · viết tin nhắn báo ốm (gợi ý mẫu tiếng Nhật và tiếng Việt).
- **Thang 5 mức** (`THANG`, lược từ bảng Kokateam: bỏ ý uống thuốc mang từ Việt Nam, bỏ ý mang thai) hiện ở cuối y6b và trong Sổ tay › Khẩn cấp.
- Dạng mở rộng: habit nhận `hl` (dùng `YHABITS`) · pick nhận `scale: 1` · write nhận `dyn: 'yte'` (không chèn gợi ý bữa ăn). `words()` đếm cả chữ Nhật (3 ký tự ≈ 1 chữ) để tin nhắn tiếng Nhật lưu được. Báo cáo `extra.yte` thêm `habit`. Sổ tay › Tổng quan hiện thói quen giữ lưng đã chọn.
- Kiểm 390 + 1280: làm trọn 9 hoạt động mới, Sổ tay › Khẩn cấp, y1a, y3c, Góc nghề n4c (thói quen cũ không đổi), trang chủ; độ dài đáp án (BAI_YTE: 0 lỗi); ES5; không lỗi console.

Tệp đổi: tc01/content.js, tc01/engine.js, tc01/tc01.css, tc01/index.html, config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html, routine/index.html (số phiên bản), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.29 · 18/11/2026 · TC01.1.1: mở Phòng y tế (301 First Aid) đợt 1 · dạng Ca trực · Thẻ khẩn cấp
Thầy chốt: 301 theo PA C "Ca trực của Shin"; 302 Test Lab theo PA 1 (làm sau); thêm Thẻ khẩn cấp vào Sổ tay. Không đổi trang chủ, CD01, TK, Shin Routine.
- **Phòng y tế mở** (`KHU.yte.ready`), 6 bài (y1–y6); đợt 1 làm xong 3 bài, 9 hoạt động: **y1 Choáng, sắp ngất** (ca trực bạn H. ở sân tập · xếp 4 việc khi chính mình sắp ngất · gọi 119 hay theo dõi, 4 câu) · **y2 Say nắng (熱中症)** (ca trực anh K. ở công trường · ghép 6 từ tiếng Nhật · ngày nắng của nhóm mình, câu cuối theo 5 nhóm) · **y3 Cảm lạnh, cúm, sốt** (ca trực "sáng thức dậy bị sốt" · nghỉ ở phòng hay đi khám, 4 câu · chuyện bạn M. ở trung tâm đào tạo, hỏi dồn vì sao + viết). y4 Bong gân, trầy xước · y5 Đau lưng, cổ, vai · y6 Không khỏe thì báo thế nào: "Sắp mở".
- **Dạng mới `sim` (Ca trực)**: màn mở đầu (cảnh, giờ, lời Shin) → 5 tình huống; mỗi lựa chọn có "chuyện xảy ra tiếp" riêng; chọn chưa đúng thì xem hậu quả + lý do rồi "Quay lại, chọn cách khác" (lựa chọn đã thử mờ đi); đồng hồ "An toàn" 3 mức; cuối ca: số tình huống đúng ngay lần đầu + **Phiếu sơ cứu** (5 dòng). Lưu `S.yte.sim[id] = {f, n, at}`, báo GV `extra.yte`.
- **Thẻ khẩn cấp** (Sổ tay › thẻ mới "Khẩn cấp"): 119, 110, #7119 (ghi rõ chỉ một số nơi có), 4 câu tiếng Nhật khi gọi 119, 3 ô tự ghi (địa chỉ chữ Nhật, người hỗ trợ, công ty) lưu `S.kc`, chỉ trên máy này, không gửi báo cáo.
- Shin ở Phòng y tế (`SHIN_OUTFIT = 'aid'`): giữ băng đô, bỏ còi, băng tay trắng chữ thập xanh (không dùng chữ thập đỏ). Thẻ hội viên thêm dòng đục lỗ **AID**; Sổ tay › Tổng quan thêm ô "Dấu Phòng y tế", Thẻ hội viên thêm mục "Phòng y tế của mình". Sân khối: mẹo "aid" đổi thành câu từ bài y1.
- Hoạt động nhận `kl` (nhãn dạng riêng, vd y3c "Chuyện đã xảy ra"); story nhận `w` (câu viết riêng); match tra chữ ở `YTE_TXT` trước rồi `NGHE_TXT`.
- **Sửa lỗi cũ**: kiểu `.cnt` của cửa phòng tập (TC01.0.7) làm thẻ đếm ở Sàn tập › Tập thử và màn hình "Tập theo Shin" (Góc nghề) bị đặt `position:absolute`. Nay chỉ áp cho `.door .cnt`.
- Không dùng từ Sổ tay sức khỏe Ch.8: tát má, giật tóc mai, cho ngửi amoniac/giấm, bấm huyệt.
- Kiểm 390 (nhóm Ngoài trời nữ, Dây chuyền nữ, Dịch vụ, Văn phòng) + 1280 (Nhà xưởng nam): làm trọn 9 hoạt động, đục lỗ, Sổ tay 4 thẻ, nhập Thẻ khẩn cấp, mặt sau thẻ, trang chủ phòng tập, demo GV; độ dài đáp án (34 câu); ES5; không lỗi console. Hồi quy n5b, n5c, d3a, b2b.

Tệp đổi: tc01/content.js, tc01/engine.js, tc01/art.js, tc01/tc01.css, tc01/index.html, config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html, routine/index.html (số phiên bản), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.28 · 18/11/2026 · Trang chủ mới: Shin Routine đứng đầu, nút Check-in, khóa học kiểu thẻ Labs
Thầy chốt PA1. Chỉ đổi trang chủ và cầu nối Shin; không đổi bài học, dữ liệu học viên.
- **Phong cách** (cảm hứng tabletop.google, labs.google): nền kem #F6F4EE, tiêu đề phông Nunito (lấy từ `routine/assets/fonts`, chạy cả khi mất mạng; trang chủ bỏ phông Google), hình mờ trang trí trôi nhẹ ở mép, thẻ trắng bo tròn.
- **Thanh trên**: logo · Cài ứng dụng · chuỗi ngày ("12 ngày") · ảnh đại diện chữ cái đầu (chạm = Cài đặt). Bỏ banner xanh cũ.
- **Lời chào một dòng**: "Chào buổi tối, Quỳnh Anh" (2 chữ cuối của họ tên; họ tên 2 chữ thì lấy chữ cuối). Không hiện lớp, diện, thầy cô. Shin Routine dùng cùng cách gọi tên cho học viên mới.
- **Khối Shin Routine** đứng đầu: "RÈN LUYỆN HẰNG NGÀY CÙNG" / "Shin Routine" (gạch chân xanh vẽ dần), Shin + lời nhắn có tên in đậm, các thẻ đang rèn kèm dấu hôm nay. Bỏ dòng "… thẻ đang rèn · Lửa …". Hai tấm màu nghiêng phía sau.
  - **Nút Check-in** (vàng #F2B21B như nút của Shin, nổi khối nhẹ 3px, kèm giờ check-in của Shin, ví dụ 21:30) → `routine/index.html?ci=1#checkin` mở thẳng check-in hôm nay. Chưa có thẻ nào: Shin báo "Thêm ít nhất một thẻ để bắt đầu nhé." và về trang Hôm nay. Check-in xong: thanh "Đã check-in hôm nay · Vào học"; trang chủ đổi nút xanh nhạt "Đã check-in hôm nay". Chạm phần còn lại của khối = mở Shin.
- **Không tự chuyển vào Shin** khi mở trang chủ nữa (`door: 0` ở config.js).
- **Khóa học**: dưới tiêu đề là 3 ô chỉ có số + chữ: Tổng XP · Insight · "25 phút / Hôm nay" (số có dấu chấm nghìn). Thẻ khóa học thành **băng chuyền thẻ dọc có tranh** (vé JPC → 日本, núi Phú Sĩ, tạ, la bàn), xếp quạt nghiêng, hai mảng màu lớn xanh dương, xanh lá phía sau. Vuốt ngang (thẻ chạy theo ngón tay), bấm ‹ › bên dưới, chạm thẻ bên cạnh để đưa vào giữa, phím mũi tên trên máy tính; chuyển động 0,6 giây, vòng tròn khi có từ 4 thẻ; giảm chuyển động thì không trượt. Khóa sắp ra mắt xếp cuối. Mở đầu ở khóa đang học dở; nhớ thẻ đang xem trong phiên.
- Lịch học, nhắc sao lưu, thẻ Hướng dẫn giữ nội dung, đổi kiểu cho hợp nền mới.
- Cầu nối Shin (`routine/proskills.js`): báo thêm `extra.ci` (đã check-in hôm nay), `extra.ciTime`; `?ci=1` hiện thanh sau khi check-in (không hiện lời nhắc đóng dấu).
- Kiểm 360, 390, 1280: học viên mới; có thẻ Shin → Check-in → lưu → thanh "Vào học" → trang chủ "Đã check-in"; chưa có thẻ → lời báo của Shin; băng chuyền (bấm, kéo, chạm thẻ bên, mở khóa giữa); Cài đặt từ ảnh đại diện; giảm chuyển động; 1 service worker; ES5; không lỗi console.

Tệp đổi: hub/hub.js, hub/hub.css, routine/proskills.js, config.js, index.html, cd01/index.html, tk/index.html, tc01/index.html, mau/index.html, routine/index.html, sw.js (số phiên bản), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.27 · 17/11/2026 · Trang chủ: chữ, banner gọn, Lịch học tông xanh lá
Chỉ sửa giao diện trang chủ, không đổi dữ liệu, khóa học.
- **Chữ**: "RÈN LUYỆN MỖI NGÀY" → "CHECK-IN RÈN LUYỆN"; bỏ dòng "Chọn một việc nhỏ để bắt đầu rèn luyện cùng Shin." (thẻ Shin khi chưa có thẻ nào chỉ còn tên + nút Bắt đầu); tiêu đề hộp "Lịch học trên lớp" / "Lịch học" → "LỊCH HỌC"; "Đặt giờ tự học e-learning mỗi ngày" → "Đặt giờ tự học mỗi ngày" (đã đặt: "Tự học 20:00 · …"); "Xem lịch học tuần này trên oden.vn" → "Xem lịch học trên oden.vn" (cả trong tấm Lịch của tôi). Câu "Lưu lịch Kỹ năng, Kiến thức nghề, Thể chất. Proskills nhắc bạn đi học." giữ nguyên.
- **Banner trên điện thoại (< 700px)**: thấp hơn khoảng 1/3 (lề, cỡ tên, khoảng cách nhỏ lại). Ba ô Chuỗi ngày, Tổng XP, Insight thành hộp chữ nhật thấp (biểu tượng + số một dòng, nhãn dòng dưới), dùng cho mọi màn hình; số dài quá thì có dấu "…".
- **Hộp Lịch học**: nút, biểu tượng, ngày đang chọn, dòng nhắc, link oden.vn dùng tông xanh lá của TC01 (#348A5F) thay xanh đậm. Màu từng môn (Kỹ năng, Nghề, Thể chất) giữ nguyên. Tấm "Lịch học của tôi" không đổi.
- Kiểm 360, 390, 1280: học viên mới, đã có lịch + giờ tự học, XP 5 chữ số; không lỗi console.

Tệp đổi: hub/hub.js, hub/lich.js, hub/hub.css, config.js, sw.js, index.html, cd01/index.html, tk/index.html, tc01/index.html, mau/index.html, routine/index.html (số phiên bản), CHANGELOG.md.
File cần xóa trên GitHub: không có.

## PS1.3.26 · 17/11/2026 · Shin Routine nối với CD01, TC01 · chỉ còn sao lưu chung · Shin M.Claude.3.3.41
- **Sao lưu**: Shin Routine bỏ sao lưu riêng. Sổ tay › Cài đặt › "Sao lưu và khôi phục" của Shin dùng tập tin chung của Proskills (Tải sao lưu → `PS.backup`, Khôi phục → `PS.restorePick`); nhắc "Đã … ngày chưa sao lưu" và chấm đỏ tính theo lần sao lưu chung. Bản sao lưu chung gồm `ps.mod.routine` (+ phút rèn luyện).
- **Khóa gợi ý thẻ Shin** (`PS.routineSugHTML`, core): khối "Rèn mỗi ngày cùng Shin" với 1–3 thẻ; thẻ đang rèn có dấu ✓ "Đang rèn" + "Xem thẻ", thẻ chưa có "Rèn thẻ này". Chạm → Shin Routine mở thẻ (nếu đã có) hoặc màn đặt công thức (đủ 5 thẻ thì Shin hỏi cất thẻ nào); xong hiện thanh "Xong rồi? Quay lại <khóa>". Một chiều: khóa chỉ đọc tóm tắt của Shin, không tự thêm thẻ. Không hiện ở bản demo giáo viên.
  - **CD01 (CD01.1.6)**: Ga 6 · "Biến điều còn thiếu thành thói quen", dưới 2 công thức. Thứ tự gợi ý: điều chung học viên chọn "Chưa có/Đang có dần" (`RT_GAP`: tiếng Nhật → Tận dụng 05 phút, Đúng giờ/5S → 5S, Sức khỏe → Vận động, Chi tiêu → Chi tiêu có kế hoạch), rồi theo nhóm nghề (`RT_GRP`).
  - **TC01 (TC01.1.0)**: cuối trang 5 bài (`RT_BAI`): b6 Giãn cơ và lịch tập, d4 Lỗi ăn uống hay gặp, n4 Đứng lâu ngồi lâu, n5 An toàn kiểu Nhật (Báo cáo và xác nhận), n6 Bài bổ trợ.
- Shin báo thêm `extra.mine` (trạng thái từng thẻ) và `extra.lib` (tên thẻ). Danh mục tên dự phòng `ROUTINE_LIB` trong config.js.
- Shin trong Proskills đánh số tiếp **M.Claude.3.3.41** (đổi `routine/scripts/core.js`), sw.js tải lại bộ nhớ Shin theo số mới.
- Kiểm 390: CD01 Ga 6 (nghề Cơ khí) → khối gợi ý → Shin mở màn đặt công thức; TC01 n5 → Shin → "Quay lại" về TC01; thẻ đã có → mở thẻ; Tải sao lưu từ Shin (tập tin chung gồm routine), Khôi phục mở chọn tệp; 1 service worker, mất mạng; ES5; không lỗi console.

Tệp đổi: config.js, sw.js, index.html, core/core.js, core/core.css, cd01/index.html, cd01/content.js, cd01/engine.js, tc01/index.html, tc01/content.js, tc01/engine.js, tk/index.html, mau/index.html, routine/index.html, routine/habit-game.html, routine/proskills.js, routine/scripts/core.js, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.25 · 17/11/2026 · Tích hợp Shin Routine (M.Claude.3.3.40) · cửa Rèn luyện · Sổ tay mở Cài đặt trước
Shin Routine vào chung ứng dụng Proskills, thư mục `routine/` (thầy chốt: một app, một biểu tượng, mở thẳng vào rèn luyện nếu hôm nay chưa đóng dấu). Giao diện, luật rèn luyện của Shin giữ nguyên.
- **Trang chủ**: thứ tự mới Lời chào + số liệu → **Rèn luyện hôm nay** (thẻ Shin Routine: đã/chưa đóng dấu, các thẻ đang rèn kèm dấu hôm nay, Lửa) → Lịch học → Khóa học. Shin Routine không nằm trong danh sách khóa học, không cần mật khẩu cổng. Dòng "Hôm nay bạn đã học và rèn luyện … phút" cộng cả phút rèn luyện.
- **Cửa Rèn luyện**: mở Proskills mà hôm nay chưa đóng dấu (và còn thẻ đang rèn, hoặc chưa có thẻ nào) thì vào thẳng Shin Routine, mỗi phiên một lần (`sessionStorage ps.door`); về trang chủ không bị chuyển lại. Shin nhắc "Ghi nhận thói quen hôm nay, rồi vào học tiếp nhé."; đóng dấu xong hiện thanh "Đã đóng dấu hôm nay · Vào học". Tắt: `door: 0` ở module routine trong config.js.
- **Về trang chủ Proskills**: không thêm nút trên trang Hôm nay của Shin; nút nằm ở nhóm đầu tiên "Proskills" trong Sổ tay › Cài đặt.
- **Sổ tay mở thẻ Cài đặt trước** (có nút về trang chính): CD01 (CD01.1.5), HP05 (TK16), TC01 (TC01.0.9) và nút ⋯ của Shin Routine. Các nút mở Sổ tay với thẻ riêng (Bản Career Design, Lobby → Thẻ hội viên…) giữ như cũ.
- **Dữ liệu dùng chung**: Shin lưu ở `ps.mod.routine` (demo `ps.demo.routine`), nên có trong bản sao lưu chung của Proskills. Lớp, thầy cô lấy từ hồ sơ Proskills (đổi trong Shin thì ghi ngược về hồ sơ); Shin chỉ còn hỏi tên gọi (tự điền tên của học viên). Danh sách thầy cô của Shin lấy từ config.js.
- **Báo về trang chủ** `PS.report('routine')`: `extra` = day, rec (đã đóng dấu hôm nay), need, cards (tên + dấu hôm nay), active, fire (Lửa), recDays, mastered, habits; `days` = phút rèn luyện thật (đang mở và có thao tác) theo ngày → tính vào chuỗi ngày chung. Các khóa khác đọc bằng `PS.summary('routine').extra`.
- **Lần đầu mở Shin**: giữ màn chào "Mỗi ngày, một chút." rồi mời chọn "Việc nhỏ đầu tiên"; những lần sau vào thẳng, không chờ màn chào.
- **Một service worker** (sw.js gốc): bỏ `sw.js`, `manifest.webmanifest` riêng của Shin; Shin đăng ký `../sw.js`. Tải sẵn 51 tệp Shin chạy ngầm khi cài service worker (bộ nhớ riêng `routine-M.Claude.3.3.40`, chỉ tải lại khi đổi phiên bản Shin) → đóng dấu được cả khi mất mạng. Nút "Cập nhật" của Shin dùng chung cơ chế cập nhật Proskills.
- **Demo giáo viên**: `routine/?demo` với mật khẩu chung; "Thoát Demo" về lại bài thật.
- Kiểm 390 và 1280: học viên mới (trang chủ không chuyển), có hồ sơ → cửa Rèn luyện → Việc nhỏ đầu tiên; có thẻ → đóng dấu → thanh "Vào học" → trang chủ thẻ "Đã đóng dấu"; Sổ tay 3 khóa + Shin mở Cài đặt; demo Shin; 1 service worker, mất mạng mở trang chủ và Shin; ES5 cho mã Proskills; không lỗi console.

Tệp đổi: config.js, sw.js, index.html, core/core.js, hub/hub.js, hub/hub.css, cd01/index.html, cd01/content.js, cd01/engine.js, tk/index.html, tk/content.js, tk/actions.js, tc01/index.html, tc01/content.js, tc01/engine.js, mau/index.html, CHANGELOG.md, AGENTS.md, HUONG-DAN-UPLOAD.md, README.md.
**Thư mục mới:** `routine/` (62 tệp, gồm tệp mới `routine/proskills.js`; sửa `routine/index.html`, `routine/boot.js`, `routine/scripts/core.js` so với Shin M.Claude.3.3.40).
File cần xóa trên GitHub: không có.

## PS1.3.24 · 17/11/2026 · TC01 giao diện "Shin Fitness Center", phần 2 · TC01.0.8
TC01 · tòa nhà phòng tập, bảng tên phòng, sân trước (thầy duyệt bản phác) + chỉnh thẻ hội viên. Không đổi bài, hoạt động.
- **Sơ đồ phòng tập = tòa nhà nhìn mặt cắt** (thay 6 ô): bảng hiệu SHIN FITNESS CENTER trên nóc; R Radio Taiso Deck (sân thượng) · 3F 301 First Aid, 302 Test Lab · 2F 201 Kitchen, 202 Work-fit · 1F 101 Workout Floor + Lobby.
  Phòng sáng dần theo bài xong (đèn trần = số bài), phòng chưa mở kéo cửa cuốn COMING SOON (sân thượng: băng dây), nhãn "Hôm nay" có Shin ở phòng của bài gợi ý. Chạm Lobby = mở Sổ tay › Thẻ hội viên. Nút "Gợi ý hôm nay" giữ nguyên.
- **Bảng tên phòng** thay banner khu: dải màu trái (ROOM + số phòng + biểu tượng), MỖI PHÒNG MỘT MÀU dịu (101 xanh lá, 201 đất nung, 202 xanh xám, 301 xanh ngọc, 302 tím nhạt, R vàng đất), tên tiếng Anh, tên Việt, mô tả, thanh tiến độ cùng màu phòng, "x/6 bài xong · Chọn bài nào trước cũng được", biển treo OPEN/CLOSED đung đưa, ốc vít. Bỏ chữ Nhật ở tên khu.
- **Sân trước phòng tập**: 12 khối (tạ đơn, đĩa tạ, tạ ấm, bình nước, onigiri, cơm hộp, mũ bảo hộ, đồng hồ, thảm, radio, hộp sơ cứu, Shin) rơi theo trọng lực. Chạm khối: nảy lên + 1 mẹo (`YARD_TIPS`); vuốt: kéo ném; chạm chỗ trống vẫn cuộn trang. Nút Xếp lại / Tung lên. Thư viện Matter.js chỉ tải khi cuộn gần tới sân; sân dừng khi khuất màn hình; giảm chuyển động thì khối xếp sẵn.
- **Âm thanh mới**: "pop" khi chạm khối, "vút" khi tung lên, chuông cửa khi chạm Lobby.
- **Thẻ hội viên (chỉnh theo góp ý)**: xanh lá tươi hơn (#30A06A → #1D774D); hoa văn nhẹ tạ đơn nằm xéo + đĩa tạ ở góc dưới phải; vệt sáng dày như nút "Gợi ý hôm nay"; tên to hơn (23px) và cả khối tên + thông tin hạ thấp xuống cho cân; chữ ký mặt sau là chữ "Shin" viết tay thanh thoát (đường vẽ từ phông Great Vibes, SIL OFL) + gạch dưới.
- **Trao thẻ**: lớp phủ nền đặc; trang chính chỉ hiện sau khi bấm "Đeo thẻ, vào tập" (trước đó thấy cả thẻ và nút gợi ý phía dưới).
- Sửa: biến màu `--bg`, `--mut` chưa khai báo (nền lớp phủ bị trong suốt).
- Kiểm 390 (demo: trang chính, chạm khối, Bếp, Phòng y tế, Lobby, lật thẻ; học viên mới: phiếu → trao thẻ → trang chính) và 1280; ES5; không lỗi console.

Tệp đổi: config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), tc01/index.html, tc01/art.js, tc01/content.js, tc01/engine.js, tc01/tc01.css, CHANGELOG.md, AGENTS.md.
**Tệp mới:** tc01/yard.js, tc01/matter-0.19.0.min.js, tc01/MATTER-LICENSE.txt.

## PS1.3.23 · 17/11/2026 · TC01 giao diện "Shin Fitness Center", phần 1 · TC01.0.7
TC01 · mạch chuyện phòng tập (thầy duyệt bản phác `TC01-y-tuong-giao-dien-v1.html`). Không đổi bài, hoạt động.
- **Cửa phòng tập** (lần đầu vào): biển hiệu SHIN FITNESS CENTER có viền bóng đèn, mái hiên sọc, Shin tập Radio Taiso sau cửa kính (giơ tay, nghiêng lườn, nhún nhảy) và đếm 1-2-3-4; chạm Shin thì Shin thổi còi, nhảy lên. Nút "Vào phòng tập".
- **Phiếu đăng ký hội viên**: 4 bước làm thẻ có đầu phiếu kiểu bìa kẹp (RECEPTION). Nút cuối "Nhận thẻ hội viên" (sửa thẻ: "Lưu thẻ hội viên").
- **Shin trao thẻ** qua quầy lễ tân (thẻ trượt ra, xoay thẳng), thay hộp thoại thẻ cũ. Nút "Đeo thẻ, vào tập".
- **Thẻ hội viên mới** (thẻ nhựa phòng gym, treo trên móc ở trang chính, chạm để lật + đung đưa; trong Sổ tay không có móc):
  mặt trước: SHIN FITNESS CENTER nhỏ, MEMBER + hạng, HỌ TÊN, lớp · nhóm · nghề, MEMBER NO. (số trong tên lớp + ngày, tháng cấp), SINCE, một vệt sáng mảnh lướt qua mỗi 7 giây; bỏ 会員証, bỏ hoa văn chéo, không mã vạch.
  mặt sau: dải từ, PUNCH CARD 3 hàng FLOOR / KITCHEN / WORK (bài xong = lỗ đục), mục tiêu, Streak/XP/Insight, chữ ký HLV Shin.
  Hạng theo số bài đã đục lỗ: STARTER 0–5 · REGULAR 6–17 · ATHLETE 18–29 · CHAMPION 36 (thẻ kem cát).
- **Xong bài = đục lỗ**: hộp "Đục lỗ thẻ hội viên!" hiện hàng lỗ của khu, lỗ mới đục vào; nhãn bài "Đã đục lỗ".
- **Âm thanh mới** (tự soạn WebAudio, theo công tắc âm thanh chung): chuông cửa khi vào phòng tập, tiếng bút khi qua bước phiếu, tiếng trượt + "ting" khi trao thẻ, còi khi đeo thẻ vào tập và khi chạm Shin, tiếng lật thẻ, tiếng đục lỗ.
- Chữ đổi: `TXT.joinHi`, `joinHi2`, `cardSay`, thêm `cardGo`, `baiDone` ("đục một lỗ").
- Kiểm 390 (học viên mới: cửa → phiếu 4 bước → trao thẻ → trang chính → lật thẻ; demo: Sổ tay › Thẻ hội viên, xong bài n1 → hộp đục lỗ) và 1280; ES5; không lỗi console.

Tệp đổi: config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), tc01/index.html, tc01/content.js, tc01/engine.js, tc01/tc01.css, CHANGELOG.md, AGENTS.md.

## PS1.3.22 · 17/11/2026 · TC01 Góc nghề, đợt 2 (Phiên 3, phần 2) · TC01.0.6
TC01 · Góc nghề đủ 6 bài (thầy đã duyệt dàn bài). Đợt 2 dựng 3 bài × 3 hoạt động:
- **Khởi động trước ca**: Xem 5 động tác (cổ · vai · cổ tay · hông · gối – cổ chân; hình mới) · Xếp thứ tự (từ trên xuống) · **Tập theo Shin 3 phút** (dạng mới flow: Shin đếm 30 giây mỗi động tác, có Tạm dừng, Động tác tiếp; xong hỏi "Người bạn thấy thế nào?", chọn "Có chỗ bị đau" thì Shin nhắc dừng và báo thầy cô).
- **Đứng lâu, ngồi lâu, làm lặp lại**: **Một ca của nhóm mình** (dạng mới ca: ca 8–17 giờ minh họa theo 5 nhóm, chạm 2 giờ nghĩ là hay mỏi rồi xem giờ hay mỏi + mẹo; sau đó chọn tiết ngồi lâu nhất trong **ngày học ở trường 8–17 giờ**: tiết 1–2, 3–4, 5–6, 7–8) · Giãn 2 phút giữa ca (flow, 5 động tác × 24 giây: cổ, vai, cổ tay, lưng, bắp chân) · **Chọn 1 thói quen** (dạng mới habit: 3 thói quen chung + 1 theo nhóm, hoặc tự đặt; viết lời hẹn "Khi…, mình sẽ…").
- **Bài bổ trợ cho nghề**: 3 động tác của nhóm mình (mỗi nhóm cơ một động tác, theo lớp Kiến thức nghề: nam 20 cái × 2 hiệp, nữ 15 cái × 2 hiệp) · Tập thử, ghi số · **Lịch tập tuần** (dạng mới week: chọn 2–3 ngày, giờ tập, hiện lịch Sàn tập để xen kẽ; nút video thầy cô GDTC).
- Động tác mới (EX): preshift, midstretch, dip (hít đất ngược trên ghế), crunch (gập bụng trên), sidelunge (bước ngang), hinge (gập hông lưng thẳng). 14 tư thế mới trong POSES; ghế vẽ dưới người tập (`TC_MARK.chair`, khung hình nhận `mu`, `fig()` nhận `under`). Hoạt động how/try nhận `exBy` (bộ động tác theo nhóm, nữ tự đổi chống đẩy → khuỵu gối). EX có `s` = tên ngắn cho nút chọn; hàng nút động tác tự xuống dòng.
- Lưu `S.nghe.fl`, `ca`, `habit`, `week`; báo về trang chủ `extra.nghe` (flow, school, habit, week). Sổ tay "Góc nghề của mình" thêm số lần tập theo Shin, tiết ngồi lâu nhất, lịch bài bổ trợ, thói quen chống mỏi. Demo GV có sẵn n2a, n4a.
- Mẫu "Ngày học ở trường 8–17 giờ" ở Bếp (giờ ăn theo ca) giữ nguyên (thầy xác nhận đúng).
- Tổng hoạt động TC01: 54. Kiểm 390 (Nhà xưởng/Cơ khí, Dịch vụ/Kaigo nữ, Dây chuyền/Thực phẩm nữ, Văn phòng/Kỹ sư) và 1280 (Ngoài trời/Xây dựng), demo, trang chủ, ES5; không lỗi console.

Tệp đổi: config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), tc01/index.html, tc01/content.js, tc01/engine.js, tc01/art.js, tc01/tc01.css, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.21 · 17/11/2026 · TC01 Góc nghề, đợt 1 (Phiên 3, phần 1) · TC01.0.5
TC01 · khu Góc nghề mở (Phương án A "Một ca làm của mình", thầy đã duyệt). 6 bài; đợt 1 dựng 3 bài × 3 hoạt động, 3 bài còn lại "Sắp mở" (Khởi động trước ca · Đứng lâu, ngồi lâu, làm lặp lại · Bài bổ trợ cho nghề).
- **Cơ thể của nghề mình**: Bản đồ cơ thể (chạm 3 chỗ nghề mình dùng nhiều, rồi so với nghề/nhóm; không chấm đúng sai) · Mình đang ở mức nào? (tự xếp 4 nhóm cơ theo 4 mức, hiện kỷ lục Sàn tập nếu có; nghề cần nhóm nào còn yếu thì có nút mở bài Sàn tập tương ứng) · Trước khi bay, mình cần… (viết; câu gợi ý theo kết quả của chính học viên).
- **Nâng, bưng, đẩy đúng cách**: Xem 3 bước nâng vật (hình mới: hạ hông nâng thùng, ôm sát người) · Tìm điểm chưa đúng (2 hình: cúi gập lưng nhấc thùng; bê thùng che mắt qua sàn ướt) · Nặng quá thì làm sao? (thẻ "Mức nâng tham khảo của bạn" tính từ cân nặng ở thẻ hội viên: nam khoảng 40% cân nặng, nữ khoảng 60% mức của nam, ghi nguồn 職場における腰痛予防対策指針 2013; 3 câu, câu 3 riêng theo nhóm và theo nghề Kaigo, Thực phẩm, Ô tô).
- **An toàn kiểu Nhật**: Tìm 4 nguy hiểm trong kho (hình vẽ mới) · Ghép 6 từ an toàn tiếng Nhật (危ない, 止めて, 注意, 立入禁止, ヨシ, ヒヤリハット) · Senpai kể: đôi giày bảo hộ (dựa trên chuyện đã từng xảy ra, gộp và ẩn danh; 3 câu hỏi dồn "vì sao"; viết "Nếu là anh T., mình sẽ…").
- HLV Shin ở Góc nghề đội mũ bảo hộ kem cát. Thẻ hội viên có dải dấu thứ 3 "Nghề"; Gợi ý hôm nay xoay 3 khu; Sổ tay thêm ô Dấu Góc nghề và mục "Góc nghề của mình". Báo về trang chủ `extra.nghe` (body, lad).
- Dạng hoạt động mới: body, ladder, story. pick: `rounds` + `byGroup`/`byJob` thay câu cuối, `kg` hiện thẻ mức nâng, `[KG]` trong câu hỏi. match: `sel`, `no`, `end` lấy chữ từ NGHE_TXT. spot và how nhận `mk` (vật vẽ thêm trong TC_MARK).
- Tổng hoạt động TC01: 45. Kiểm 390 (Nhà xưởng/Cơ khí, Dịch vụ/Kaigo, Dây chuyền/Thực phẩm, Văn phòng/Kỹ sư) và 1280 (Ngoài trời/Xây dựng), demo, ES5; không lỗi console. Đáp án đúng có vị trí xáo; mỗi câu có đáp án sai dài bằng hoặc hơn đáp án đúng.

Tệp đổi: config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), tc01/index.html, tc01/content.js, tc01/engine.js, tc01/art.js, tc01/tc01.css, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.20 · 17/11/2026 · Mở TC01 trên trang chủ để thử trên GitHub · TC01.0.4
- **TC01 · Huấn luyện thể chất hiện trên trang chủ** cho mọi người (config.js `state: 'ready'`), không cần `?thu=1`. Vào khóa vẫn qua cổng mật khẩu: câu hỏi "Bài thể dục buổi sáng của người Nhật tên là gì?", mật khẩu **Radio Taiso** (gõ "rajio taiso", "ラジオ体操" cũng được).
- Nội dung TC01 không đổi so với PS1.3.19 (Sàn tập 6 bài, Bếp dinh dưỡng 6 bài; 4 khu còn lại hiện "Sắp mở").

Tệp đổi: config.js (APP_VER, state tc01), sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html, tc01/index.html (số phiên bản), CHANGELOG.md.
File cần xóa trên GitHub: không có.

## PS1.3.19 · 17/11/2026 · TC01 khu Bếp dinh dưỡng, đợt 2 (Phiên 2, phần 3) · TC01.0.4
TC01 · Bếp dinh dưỡng đủ 6 bài (vẫn ẩn với học viên; thử như PS1.3.16)
- **Món Việt, món Nhật**: Ghép cặp (6 món Việt ↔ món Nhật gần giống, chữ Nhật + cách đọc; ghép sai "Thử lại nhé.") · Giỏ konbini 600 yên (12 món có tên tiếng Nhật, giá minh họa; thanh ngân sách, 3 nhóm tinh bột/đạm/rau; vượt ngân sách thì nhắc bỏ bớt; xong thì tính thử tiền một tháng = giá × 22 ngày, ghi "giá minh họa") · Đọc nhãn 栄養成分表示 (4 câu: năng lượng, đạm, muối, "tính cho bao nhiêu"; chạm sai thì hiện nghĩa dòng vừa chạm; số liệu minh họa).
- **Ăn theo ca và nghề**: Tình huống của nhóm mình (2 câu riêng cho mỗi nhóm trong 5 nhóm: tăng ca, đứng máy, xưởng lạnh, đổi ca, công trường sáng sớm, mùa đông, kaigo ca sớm/ca đêm, ngồi lâu, làm thêm ca đêm) · Giờ ăn theo ca (6 mẫu ca + chỉnh giờ bắt đầu, số giờ; thanh 24 giờ và lịch: trước ca, giữa ca, sau ca, nước) · Hộp cơm mang đi (4 ngăn, mỗi ngăn có 1 món chưa hợp mang đi kèm lý do; xong hiện 3 điều mang đi an toàn + câu riêng của nhóm).
- **An toàn thực phẩm ở ký túc xá**: Tủ lạnh chung (hình vẽ mới, tìm 3 chỗ chưa ổn: thịt sống không bọc ở ngăn trên, hộp không tên/ngày, bát canh không đậy) · Hạn dùng (消費期限 / 賞味期限, cách đọc ngày năm.tháng.ngày; 5 món: quá hạn an toàn, quá hạn ngon nhất chưa mở, ngày cuối, còn hạn nhưng để ngoài tủ cả ngày, còn hạn lâu) · Đau bụng sau ăn (4 câu: việc đầu tiên, báo ai ở Nhật, dấu hiệu cần đi khám ngay, nhắn Hō-Ren-Sō cho rõ).
- Dạng hoạt động mới: match, basket, label, shift, bento, date. pick nhận `byGroup[nhóm].rounds` (nhiều câu theo nhóm) và `end` (lời Shin cuối). Bài tìm điểm nhận `art` (hình cảnh trong `TC_ART`, art.js) thay cho tư thế người tập.
- Lưu thêm `S.food.konbini`, `S.food.shift`, `S.food.bento`; báo về trang chủ `extra.food.shift/bento/konbini`. Sổ tay "Bếp của mình" thêm giờ ăn theo ca, hộp cơm mang đi. Demo GV có sẵn bài Ghép cặp và giờ ăn ca ngày.
- Tổng hoạt động TC01: 36 (config.js total 36). Kiểm 390 (5 nhóm) / 1280, demo + học viên mới, ES5; không lỗi console. Câu chọn cách đúng: mỗi câu có đáp án sai dài bằng hoặc hơn đáp án đúng, vị trí đáp án đúng đã xáo.

Tệp đổi: config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), tc01/index.html, tc01/content.js, tc01/engine.js, tc01/art.js, tc01/tc01.css, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.18 · 17/11/2026 · TC01 khu Bếp dinh dưỡng, đợt 1 (Phiên 2, phần 2) · TC01.0.3
TC01 · Bếp dinh dưỡng mở (vẫn ẩn với học viên; thử như PS1.3.16)
- **Khu Bếp 6 bài** (Phương án A, thầy đã duyệt). Đợt 1 dựng 3 bài × 3 hoạt động; 3 bài còn lại hiện "Sắp mở" (Món Việt, món Nhật · Ăn theo ca và nghề · An toàn thực phẩm ở ký túc xá).
  - **Đĩa cơm của mình**: Xếp đĩa (chạm món rồi chạm nhóm; đĩa 4 nhóm đậm dần theo số món đã xếp; chọn sai thì "Thử lại nhé." kèm gợi ý) · Bữa hôm qua (chọn món từng bữa hoặc "Mình bỏ bữa này" → bảng 4 nhóm + Shin nói bữa nào thiếu gì, không chấm điểm) · Bữa mai mình thêm… (viết, câu gợi ý lấy theo chỗ thiếu của chính học viên).
  - **Năng lượng của mình**: Máy tính (BMI ngưỡng 23, năng lượng khi nghỉ, năng lượng cả ngày theo 5 mức vận động, nước = cân nặng × 0,04 L; lấy sẵn chiều cao, cân nặng ở thẻ hội viên, tuổi từ năm sinh; ghi rõ chỉ để tham khảo, không ăn kiêng) · Cao hay thấp (5 cặp món cùng 100 g, số từ bảng calo Sổ quản lý) · Ca làm của mình cần gì (1 tình huống riêng cho từng nhóm môi trường).
  - **Lỗi ăn uống hay gặp**: Một ngày của bạn cùng lớp (8 mốc giờ, tìm 4 việc chưa ổn: bỏ sáng + cà phê lúc đói, nước tăng lực, nhịn ăn tối vì sợ mập, mì gói khuya; trượt 2 lần nhấp nháy gợi ý, 3 lần có "Xem đáp án") · Đổi món (4 câu) · Cam kết 21 ngày (chọn 1 thói quen hoặc tự viết, lời hẹn "Khi…, mình sẽ…").
- **Cam kết 21 ngày**: thẻ 21 chấm ở đầu khu Bếp và Sổ tay; mỗi ngày chạm "Hôm nay mình đã làm được". Báo về trang chủ số ngày giữ cam kết.
- **Thẻ hội viên**: 2 dải dấu Sàn tập và Bếp; dòng "Dấu: Sàn tập x/6 · Bếp y/6". "Gợi ý hôm nay" xoay giữa bài tiếp theo của hai khu.
- **Sổ tay**: thêm ô Dấu Bếp, Ngày giữ cam kết; thẻ "Bếp của mình" (BMI, năng lượng, nước, bữa đã ghi, cam kết).
- **HLV Shin ở Bếp** đeo tạp dề kem cát (không băng đô, không còi).
- Tổng hoạt động TC01: 27 (config.js total 27). Demo GV có sẵn bài Đĩa cơm, máy tính, cam kết đang ở ngày 5.
- Kiểm 390/1280, demo + học viên mới (làm thẻ → Bếp → máy tính), ES5; không lỗi console. Đáp án đúng có vị trí xáo; mỗi câu có đáp án sai dài bằng hoặc hơn đáp án đúng.

Tệp đổi: config.js, sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), tc01/index.html, tc01/content.js, tc01/engine.js, tc01/art.js, tc01/tc01.css, CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.17 · 17/11/2026 · TC01 đổi màu (Phiên 2, phần 1) · TC01.0.2
TC01 · màu (theo `claude/tc01-mau-phuong-an.md`, đã chốt)
- **Màu chủ đạo M4 Xanh JPC dịu #348A5F** thay cam đất #D36C3C: nút, thẻ hội viên, banner khu, nút tròn đếm, băng đô HLV Shin, dấu "?" của Shin, áo người tập trên hình động tác; dây còi Shin đổi xanh đậm #2A714D cho hợp băng đô. Thẻ TC01 ở trang chủ đổi theo.
- **Màu phụ Kem cát #E6D3A8** thay toàn bộ vàng: nút mời gọi (Gợi ý hôm nay, Hoàn thành, Bắt đầu…), dải dấu thẻ hội viên, nhãn thẻ và banner, thanh tiến độ khu, ô chữ Nhật banner, khung gợi ý theo nhóm, bước hiện tại, nhãn Kỷ lục, nút Thoát demo, viền dấu mới, mũi tên và vòng xoay trên hình (#B8964F), gợi ý nhấp nháy và đáp án ở bài tìm điểm, vạch mốc Yếu/Trung bình.
- `--ok` đổi xanh ngọc #2B8A86 (Đúng rồi!, Xong, vòng tìm đúng, đường gióng đúng) để không trùng màu chủ đạo. Nền trang và Sổ tay #F4F7F5, viền #E3EAE5; các xám ấm cũ đổi sang xám ánh xanh. Biểu tượng Streak/XP/Insight giữ như mọi khóa.
- Không đổi chữ, bài, tính năng. Kiểm 390/1280, demo, bài tìm điểm (gợi ý + xem đáp án); không lỗi console; không còn mã vàng cũ trong tc01.css, art.js.

Tệp đổi: config.js (APP_VER, màu và ver thẻ tc01), sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), tc01/index.html, tc01/tc01.css, tc01/art.js, tc01/content.js (TC_VER), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.16 · 17/11/2026 · TC01 Huấn luyện thể chất (Phiên 1, bản ẩn) · TC01.0.1
TC01 · module mới (ẩn với học viên, mở thử ở trang chủ `index.html?thu=1` rồi chạm thẻ TC01; mật khẩu cổng: **Radio Taiso**)
- **Phòng tập của HLV Shin**: không đi tuần tự, học viên chọn khu nào trước cũng được. Trang chủ khóa: Shin nói · **Thẻ hội viên** (tên, lớp, nhóm, nghề, ngày cấp, mục tiêu, 6 ô dấu Sàn tập, chuỗi ngày/XP/Insight) · nút vàng "Gợi ý hôm nay" · **Sơ đồ phòng tập 6 khu**: Sàn tập (mở), Radio Taiso, Bếp dinh dưỡng, Góc nghề, Phòng y tế, Phòng test (Sắp mở).
- **Làm thẻ hội viên lần đầu** (4 bước, ~2 phút): chọn nghề (17 nghề + Du học sinh + Nghề khác; đã học CD01 thì tự chọn sẵn Ga đích) → nhóm môi trường (Nhà xưởng, Dây chuyền, Ngoài trời, Dịch vụ, Văn phòng; Du học sinh = Văn phòng + nhóm việc làm thêm; Nghề khác chọn nơi làm) → mốc nam/nữ + câu chấn thương (chỉ lưu Có/Không, không hỏi chi tiết) → mục tiêu tự viết (bắt buộc) + chiều cao, cân nặng, BMI (không bắt buộc). Sửa lại ở Sổ tay.
- **Sàn tập · 6 bài × 3 hoạt động**: Khởi động đúng cách · Ngực – Vai – Tay · Bụng – Lưng · Chân – Hông · Tim mạch · Giãn cơ và lịch tập. Mỗi bài có một câu riêng cho nhóm của học viên (`gtip`).
  - Xem cách làm: hình người tập vẽ trên khung xương (đúng độ dài xương), 3 bước mỗi động tác, đường gióng, mũi tên, 3 điểm chính, nút video của thầy cô GDTC.
  - Tìm điểm chưa đúng: chạm vào chỗ sai trên hình; trượt 2 lần thì nhấp nháy gợi ý, 3 lần thì có "Xem đáp án".
  - Tập thử cùng Shin: chọn động tác → nhắc khởi động (và nhắc chấn thương) → đếm bằng nút tròn hoặc bấm giờ → so với mốc lớp (Sổ quản lý học tập v10.1) và kỷ lục của chính mình → cảm nhận (Thấy đau → Shin bảo dừng) → viết một câu cho lần sau (bắt buộc).
  - Xếp thứ tự (chuỗi khởi động), Chọn cách đúng ("Đúng rồi!"/"Thử lại nhé."), Lịch tập (kế hoạch A/B của Sổ quản lý, ngày, giờ, lời hẹn "Khi…, mình sẽ…").
- XP khi xong hoạt động; Insight khi tự viết từ 10 chữ (câu gợi ý chưa sửa thì không tính). Xong 3 hoạt động = dấu trên thẻ hội viên.
- Sổ tay: Tổng quan | Thẻ hội viên (thông tin tập luyện, lịch tập, kỷ lục, ghi chú sau khi tập) | Cài đặt chung. Demo GV: `tc01/?demo`.
- Màu chủ đạo TC01: cam đất dịu #D36C3C (thẻ ở trang chủ đổi theo). HLV Shin = dáng gà rừng của CD01 + băng đô + còi.
- Kiểm 390/1280, demo, ES5 đạt; không lỗi console.

Tệp đổi: config.js (APP_VER, thẻ tc01 ẩn + mật khẩu), sw.js, index.html, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), CHANGELOG.md, AGENTS.md. **Tệp mới:** tc01/index.html, tc01/art.js, tc01/content.js, tc01/engine.js, tc01/tc01.css.
File cần xóa trên GitHub: không có.

## PS1.3.15 · 17/11/2026 · CD01 bài mới (Đợt 3) + Bản Career Design kiểu biển ga · CD01.1.4
CD01 · bài mới
- **Ga 3 · Chặng 3 · video chia 3 đoạn** (gndJToZz76M): Năng khiếu 0:00–0:30 · Ước mơ từ nhỏ 0:30–1:00 · Hình mẫu 1:00–1:58. Mỗi đoạn: bấm xem (video tự dừng cuối đoạn, có link mở YouTube đúng mốc) → “Mình xem xong rồi” → chọn ý chạm bạn nhất (3 ý, ý nào cũng đúng, + “Chưa thấy ở mình”) → 1 dòng “Ở bạn, … là gì?” (chọn “Chưa thấy” thì hỏi “Bạn sẽ hỏi ai, thử gì để tìm ra?”). Thay câu “Bạn đã thấy dấu hiệu nào ở mình?”; `a33.signs` tự ghi theo đoạn đã chọn ý. Ý trong khóa là diễn giải, không trích nguyên văn. Ô viết tính Insight như các ô khác.
- **Ga 4 · Chặng 1 · “Một ngày của bạn TTS ngành [Nghề]”** (thay bước đoán chip): dòng thời gian 9 mốc, có 3 việc lạc sang ngành khác (dễ, vừa, khó). Chạm việc lạc: đánh số + “Việc này của ngành …”; chạm việc thật: “Việc này có thật: …”. Đếm x/3; chạm 4 việc thật chưa đủ thì Shin gợi ý. Đủ 17 nghề (`DAYJOB` trong content.js), nơi làm theo tỉnh ghi “minh họa”; Kỹ sư = “bạn Kỹ sư công nghệ”; Nhà hàng kể ngày ở khách sạn (TTS chỉ có nhánh khách sạn, ryokan theo Tikme). Nghề khác không có ngành gần: vẫn đoán chip như cũ. Đổi ngành thì tự tìm lại. Bước “Sau khi xem Tikme” bỏ ô “Lúc nãy bạn đoán”.
CD01 · giao diện
- **Sổ tay › Bản Career Design** thiết kế lại theo **biển tên ga Nhật (駅名標)**: ô số kiểu số hiệu ga, chữ Hán + kana + tên ga, dải màu chủ đạo có vạch vàng ghi ga trước, ga sau; nội dung ô bên dưới; **con dấu ga (駅スタンプ)** màu coban đóng ở góc ô đã điền (chữ Hán ga, chữ cong CAREER DESIGN, ngày đóng dấu). Ô của ga tiếp theo viền vàng “Ga tiếp theo của bạn”. Đầu tab: **thẻ tuyến** (tên, x/8 ô, 8 ô trên đường ray, Ga đích); về đích thì thay bằng Vé hoàn thành vàng.
- **Hộp “Hoàn thành ga”** đồng bộ: con dấu ga lớn đóng xuống (giảm chuyển động: hiện ngay), nhãn “Con dấu ga mới · x/8”, biển ga + ô vừa điền, loa đọc chữ Nhật nằm trên biển ga (bỏ ô từ riêng). Xem trước ô ở bước cuối chặng cũng dùng kiểu biển ga.
- **Banner ga:** giữ hoa văn chấm bi, chấm mờ hơn (.12 → .075). Bỏ chế độ xem thử `?pat=` (máy nào đã thử tự về chấm bi).
- Kiểm 390/1280, demo, 4 nghề (Cơ khí, Nhà hàng, Kỹ sư, Kaigo); ES5 đạt; không lỗi console.

Tệp đổi: config.js, sw.js, index.html, cd01/index.html, cd01/engine.js, cd01/content.js, cd01/cd01.css, tk/index.html, mau/index.html (số phiên bản), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.14 · 17/11/2026 · Logo B + CD01 giao diện (Đợt 2) · CD01.1.3
Logo và trang chủ
- **Logo chốt kiểu B** (đầu tàu chính diện, to): thay `icons/logo.svg` + 4 ảnh PNG (192, 512, apple-touch 180, maskable 512).
- Thẻ Lịch học: dòng link đổi thành “Xem lịch học tuần này trên oden.vn” (vẫn mở thẻ mới). Ô buổi học hôm nay phẳng, bỏ vạch màu bên trái.
- Nút “‹ Proskills” (về trang chủ) ở CD01 và TK: nền màu chủ đạo của khóa, chữ trắng, đậm, nổi khối 2px.
CD01
- **Mở CD01 lần đầu: màn in vé.** Shin mời in vé → học viên chạm “In vé hành trình” → vé chui ra từ máy in (đèn xanh, tiếng mô-tơ + kim in lách tách + xoẹt), các dòng thông tin hiện dần kèm tiếng “ting” → lời chào của Shin → “Chào Shin! Mình bắt đầu nhé”. Cần chạm để điện thoại cho phát âm thanh. Giảm chuyển động: vé hiện ngay.
- **Hướng dẫn học lần đầu kiểu TK** (4 bước): Vé hành trình → Bản Career Design → Sơ đồ tuyến (Sân ga) → bắt chạm thử nút Sổ tay. Học viên cũ chưa xem cũng được hướng dẫn một lần. Sổ tay › Tổng quan có “Xem lại hướng dẫn” và “In lại vé” (dùng được cả trong demo).
- Bỏ khung trích dẫn đầu Ga 1. Lời Shin mở ga **hiện sẵn lần đầu** (sửa lỗi bị thu gọn), từ lần 2 thu gọn. Màn tàu vào ga chỉ còn câu 1 (`ARRIVE`).
- **Âm thanh tàu vào ga mới** (tự soạn bằng Web Audio): bánh xe chậm dần theo tàu, xì phanh, chuông ga 6 nốt Đô Mi Son Mi La Son. Giảm chuyển động: chỉ chuông.
- Banner ga: ô chữ Nhật có viền vàng + nét trong mảnh, nghiêng nhẹ (như ô chữ ở banner TK); chấm bi mờ hơn (.12).
- **4 hoa văn banner xem thử**: mở `cd01/?pat=a` (chấm bi mờ, mặc định) · `?pat=b` (lưới ô vé) · `?pat=c` (tuyến tàu + chấm ga) · `?pat=d` (Asanoha nét mảnh). Máy nhớ lựa chọn; `?pat=0` về mặc định. Chờ thầy chọn.
- Kiểm 390/1280, giảm chuyển động, demo; ES5 đạt; không lỗi console.

Tệp đổi: config.js, sw.js, index.html, icons/* (5 tệp), hub/lich.js, hub/hub.css, cd01/index.html, cd01/engine.js, cd01/content.js, cd01/cd01.css, tk/index.html, tk/tk.css, mau/index.html (số phiên bản), CHANGELOG.md, AGENTS.md.
File cần xóa trên GitHub: không có.

## PS1.3.13 · 17/11/2026 · Trang chủ: Lịch học, nhắc tự học chung, thẻ Hướng dẫn
- **Lịch học trên lớp** (thẻ ngay dưới banner chào): học viên chạm lưới T2–T6 × 6 ca (1-2 08:00 · 3-4 10:00 · 5-6 13:15 · 7-8 15:15 · 9-10 17:45 · 11-12 19:45) để chọn môn (Kỹ năng · Kiến thức nghề · Thể chất) và cơ sở (Âu Cơ · Ấp Bắc 1 · Ấp Bắc 2).
  - Trang chủ hiện dải tuần T2–T6 (chấm màu theo môn) + danh sách buổi học của ngày đang chọn, trạng thái "Còn … phút / Đang học / Đã xong" tự cập nhật mỗi phút.
  - Lần đầu đặt xong, hỏi "Thêm vào lịch điện thoại?": tệp lịch lặp hằng tuần, nhắc trước 15 phút, dừng ở ngày kết thúc (mặc định 3 tháng, sửa được). Có thêm link Google Calendar từng môn. Đổi lịch thì thẻ nhắc "cập nhật lịch điện thoại".
  - Nút sang **oden.vn** xem lịch Kỹ năng, Thể chất, Oden (THT).
- **Giờ tự học e-learning chung** cho mọi khóa (giờ + ngày), nằm trong tấm Lịch học và cùng tệp lịch. TK bỏ phần nhắc riêng trong Cài đặt, thay bằng nút "Đặt giờ tự học ở trang chủ" (`index.html?lich=nhac`).
- **Thẻ Hướng dẫn · Hoạt động nhóm gắn kết** dưới danh sách khóa, cao bằng nửa thẻ khóa, "Sắp có" (cấu hình `GUIDES` trong config.js, màu #C8507E, biểu tượng nhóm khoác vai).
- Lõi: thêm biểu tượng calendar, bell, ext, team. Dữ liệu lịch lưu trong `ps.settings` nên đi theo bản sao lưu.
- Logo: 4 kiểu tàu để chọn ở thư mục `Logo-Proskills/PS1.3.13-4-kieu-tau` (chưa thay icon ứng dụng).

Tệp đổi: config.js, index.html, sw.js, core/core.js, hub/hub.js, hub/hub.css, **hub/lich.js (mới)**, tk/extras.js, cd01/index.html, tk/index.html, mau/index.html (số phiên bản), CHANGELOG.md.
File cần xóa trên GitHub: không có.

## PS1.3.12 · 16/11/2026 · CD01: màu coban dịu + tàu vào ga vẽ lại · CD01.1.2
- Màu chủ đạo CD01 chốt **Xanh coban dịu #2C5BC4** (sáng #4472D6, đậm #2149A6, đậm hơn #1A3A85, nhạt #E9F0FC). Đổi cả thẻ CD01 ở trang chủ, nhãn Sân ga, hình minh họa, Lưu ảnh. Bỏ chế độ thử màu `?mau=` (máy nào đã thử cũng tự về màu mới).
- Màn hình tàu vào ga vẽ lại kỹ hơn:
  - Biển tên ga treo kiểu biển ga Nhật: 2 thanh treo, bảng trắng bo tròn, chữ kana dưới tên ga, dải màu ở chân có vạch vàng giữa; khi hiện thì đung đưa nhẹ rồi đứng yên.
  - Tàu (dáng tàu trên Vé hành trình) vẽ chi tiết: thân một nét liền, mũi thuôn bo tròn, kính có vệt phản sáng, cửa, cần lấy điện, sọc vàng chạy theo thân, gầm tối, đèn pha có quầng sáng, đèn hậu đỏ. Bánh xe quay rồi chậm dần khi tàu dừng, có vệt gió phía sau, tàu nhún nhẹ khi đỗ.
  - Đường ray liền, tà vẹt bo tròn, mép sân ga có hàng chấm vàng.
  - Giảm chuyển động: hiện ngay, không chạy.
- Giữ: câu tàu vào Ga Ước Mơ (đã duyệt); Ga 5 thẻ từ khóa 先輩 như CD49.

File cần xóa trên GitHub: không có.

## PS1.3.11 · 16/11/2026 · Trang chủ mới + CD01 nhẹ mắt hơn · CD01.1.1
Trang chủ Proskills
- Thẻ khóa học: bỏ thanh màu bên trái; thiết kế lại có chiều sâu nhẹ (nền loang màu khóa ở góc, biểu tượng lớn mờ làm nền, ô biểu tượng có độ sáng, nút nổi mảnh 2px, mã khóa dạng nhãn).
- Thanh trên (Cài ứng dụng · Cài đặt): nền trong suốt, hết khung chữ nhật; chỉ hiện nền mờ khi cuộn xuống.
- Banner chào: bỏ quầng vàng ở góc, thay bằng hoa văn mảnh từ biểu tượng các khóa (tàu, la bàn, cuộn giấy, tạ); một vệt sáng nhẹ lướt qua khoảng 9 giây một lần (tắt khi “giảm chuyển động”).
- Thêm thẻ TC01 · Huấn luyện thể chất (Sức khỏe, luyện tập, thao tác vận động an toàn), trạng thái Sắp ra mắt. Lõi thêm biểu tượng `dumbbell`.
CD01
- Đưa lại **Thẻ Từ khóa của ga** (bản CD49): chip từ khóa trên banner mỗi ga (Ga 1–7 và Ga Ước Mơ), chạm mở thẻ: chữ Nhật + loa, phát âm, nghĩa, Biểu tượng của ga (hình vẽ), câu ví dụ, Bài học Oden (2 ý), Hành động ngay, Shin gửi bạn (haiku). Nội dung giữ nguyên CD49 (`KW` trong content.js); chỉ sửa lỗi gõ “gioir” → “giỏi”.
- Đưa lại **màn hình tàu vào ga** lần đầu vào mỗi ga (không có ở Sân ga): biển ga rơi xuống, tàu trên Vé hành trình chạy vào, 2 lời Shin (câu giới thiệu ga từ CD49 `ARRIVE` + lời mở ga hiện tại), nút “Vào ga thôi!”. Ga 7 sửa lỗi gõ “không không”. Ga Ước Mơ: câu mới, chờ thầy duyệt.
- Nút và viền: nổi khối 2px (trước 3–5px), bóng mờ nhẹ, viền 1px; nút “Soft” phẳng; nút “Đi tiếp” thay quầng sáng tỏa ra (gây chồng màu trên vé) bằng vệt sáng mảnh chạy bên trong. Vé: nền xanh chuyển vào thân vé, bóng trung tính, hết viền xanh dưới cuống vàng.
- Vé hành trình: vệt sáng mảnh hơn (12%), mờ hơn, 10 giây một lần; thanh tiến độ 6px, ánh vàng chậm và dịu.
- Thanh điều hướng theo kiểu TK: viên thuốc trong, 2 nút tròn đồng tâm với viền. Vòng quanh nút Sơ đồ tuyến = tiến độ hôm nay: vàng tăng theo từng chặng xong của ga đang học (tính từ đầu ngày), xong cả ga thì xanh.
- Chữ đậm 3 mức: 700 (tiêu đề), 600 (nhấn, nút, nhãn), 500 (phụ); chữ thường 400. Trước đây 600–800.
- Nút Back của điện thoại: về trang trước trong khóa (chặng → ga → sơ đồ tuyến → trang chủ Proskills), không hoạt cảnh, giữ chỗ cuộn; đang mở thẻ/Sổ tay thì Back chỉ đóng thẻ.
- Màu chủ đạo thành biến (`--c-l`, `--c-rgb`…), Lưu ảnh đọc màu từ CSS. Thử 4 màu: mở `cd01/?mau=1` (Chàm Proskills), `?mau=2` (Xanh coban dịu), `?mau=3` (Xanh denim), `?mau=4` (Xanh cổ vịt đậm), `?mau=0` về màu cũ. Máy nhớ lựa chọn. Chờ thầy chọn rồi đặt làm mặc định.
- Kiểm 390/360/1280, giảm chuyển động; ES5 đạt; không lỗi console; không tràn ngang.

File cần xóa trên GitHub: không có.

## PS1.3.10 · 16/11/2026 · CD01: Ga Ước Mơ (Ga 8, về đích) · CD01.1.0
- Ga Ước Mơ mở khi xong 18 chặng. 3 chặng nghi thức (`FIN_ORDER`: a80, a81, a82), không tính vào 18. Đi liền một mạch: xong chặng nào mở luôn chặng sau.
- a80 Cổng soát vé: máy soát 8 ô (tia quét, ô sáng lần lượt). Ô sơ sài (ít từ hơn mức trong `GATE8`, hoặc còn nguyên câu gợi ý) hiện vàng + Shin “Ô 3 còn ngắn. Muốn thêm chút cho trọn không?”. Nút **Bổ sung** mở đúng ô viết (thanh “Xong, quay lại cổng”, Insight tính lại). Luôn qua cổng được. Lưu `a80.thin`.
- a81 Lời hứa với mình: hỏi lại câu “rõ nghề chưa” của Sân ga, hình lúc lên tàu → bây giờ (lùi cũng có lời Shin tích cực) + chọn điều giúp mình nhiều nhất · thư gửi “mình năm [năm nay + 5]” (3 gợi ý ghép từ bài của học viên: câu ô 2, việc khó, thói quen, lý do đi, 5 năm sau theo nghề, câu nhắn tuần đầu) + 1 câu ngắn làm chữ ký · **nhấn giữ 2 giây để đóng dấu** 約束 (sửa thư thì đóng dấu lại).
- a82 Bản Career Design 1 trang: 8 ô + câu trả lời phỏng vấn 60 giây + lời hứa và chữ ký có con dấu · **Lưu ảnh** (vẽ bằng canvas, không cần mạng, ảnh 1080px) · **In / Lưu PDF** (chỉ in bản 1 trang, khổ A4) · Báo cáo về đích gửi thầy cô (Teams, chép tin nhắn) · Tikme đọc thêm theo nghề (trang ngành, diện, chuyện cùng ngành) · chọn hướng 5 năm tới theo TỪNG NGHỀ (`IND8.far`, 17 nghề + gen) + Senpai chúc (lời kể mẫu) + hẹn CD02.
- Vé hoàn thành (vàng, 8 con dấu ga, câu chữ ký) khi về đích; mở lại ở trang Ga Ước Mơ. Trang chủ: nút “Xem Bản Career Design 1 trang”, cuống vé ghi “Về đích + ngày”. Sổ tay có nút mở bản 1 trang.
- Dữ liệu cho CD02 thêm: thin, now2, help8, letter, motto, sealAt, far, endAt.
- Demo giáo viên: vẫn xong đến Ga 7, Ga Ước Mơ đang chờ; ô 3 (a21.flow) cố ý ngắn để thấy cổng soát vé gợi ý bổ sung.
- Kiểm 390/360/1280, giảm chuyển động; đủ 17 nghề + Nghề khác (có/không ngành gần); ES5 đạt; không lỗi console; không tràn ngang; lưu bài thật báo về trang chủ đúng.
- config: cd01 `ver: 'CD01.1.0'`.

File cần xóa trên GitHub: không có.

## PS1.3.9 · 16/11/2026 · CD01: Ga 7 Thử Thách (2 chặng, theo TỪNG NGHỀ)
- Ga 7 còn 2 chặng (bỏ a73). Toàn khóa: Sân ga + 17 chặng = 18. Lời cam kết và soát vé chuyển sang Ga Ước Mơ.
- a71 Tuần đầu ở Nhật: lịch tuần mini, mở 2 ngày. Thứ Ba: tình huống riêng nghề (`IND7[mã ngành].sc`, 17 nghề + `gen`). Thứ Năm: tình huống từ điều lo nhất ở Ga 4 (`WORRY7`, 8 thẻ; thẻ 4 dùng điều vất vả riêng nghề; điều tự viết dùng `WORRY7_OWN`). 3 cách đều có được/mất + “Mình làm khác” → “Điều có thể xảy ra” + Senpai kể. Cuối: chọn 1–2 việc chuẩn bị + một câu nhắn cho mình của tuần đầu.
- a72 Việc khó đầu tiên: ba vùng (An toàn · Học hỏi · Quá sức), học viên tự xếp thẻ việc lấy từ chính hành trình (việc chuẩn bị ở a71, hỏi người dẫn đường 2 câu ở Ga 5, nói câu phỏng vấn 60 giây, 2 việc khó theo nghề `IND7.hard`, 2 việc chung, việc tự thêm). Nhận 1–2 việc, hạn chót (7 / 14 ngày / chọn ngày), ai cùng biết, “Nếu ngại, mình sẽ…”.
- Sau hạn chót: trang chủ có lời Shin “kể Shin nghe”, chọn Làm được / Làm một phần / Chưa làm + 1 dòng (+10 XP lần đầu, không phán xét). Trang Ga 7 có nút “Kết quả việc khó” để kể bất cứ lúc nào.
- Ô 8 đổi tên “Thử thách và việc khó của tôi”. Hình mới: `cdBoy`, `cdWork` (9 cảnh: xưởng, công trường, nông trại, kaigo, nhà hàng, xưởng thực phẩm, vệ sinh, văn phòng, ký túc xá), `cdZones`.
- Demo giáo viên: học viên giả định xong đến Ga 7, hạn việc khó là hôm qua để thấy lời Shin hỏi kết quả.
- File cần xóa: không có.

## PS1.3.8 · 16/11/2026 · CD01: Ga 6 cá nhân hóa theo TỪNG NGHỀ (17 nghề)
- Đọc lại 17 trang ngành Tikme (16/11/2026), tóm vào `IND6[mã ngành]` (content.js). Ga 6 không còn chung theo nhóm: cơ khí, may mặc, đóng gói… mỗi nghề một bộ gợi ý riêng.
- Khởi động “Rõ mấy phần?”: Senpai kể theo nghề (kế hoạch từng đổi trong nghề đó).
- a62: việc ở JPC (3 gợi ý riêng nghề đứng đầu, rồi gợi ý chung); điều muốn đạt ở Nhật (tên kỳ thi, máy, vị trí đúng nghề, vd. Ginou Kentei cơ khí cấp 3, lái xe nâng, Kaigo Fukushishi); Senpai để dành theo nghề.
- Ghi chú trình độ tiếng Nhật theo diện + nghề: “kaigo cần N4” chỉ hiện khi nghề là kaigo (Thực tập sinh); kaigo Kỹ năng đặc định thêm bài thi tiếng Nhật kaigo; kỹ sư: N3 trở lên. Thực tập sinh nghề khác: “thường học khoảng N5–N4 trước khi bay”.
- Sau khi chọn trình độ trước khi bay: thêm 1 câu theo nghề (vd. kaigo, nhà hàng cần giao tiếp nhiều).
- a63 Đo khoảng cách: 4 điều riêng nghề + điều vất vả của nghề (r3) + 4 điều chung; việc nhỏ gợi ý cho “Khi… tôi sẽ…” theo nghề. Đã bỏ các ý trùng với r3.
- Phỏng vấn 60 giây: ví dụ + 3 gợi ý cấu trúc theo nghề; thẻ mới “Người phỏng vấn ngành … hay hỏi thêm” (1 câu + cách trả lời, không bắt buộc viết).
- Nghề khác không có ngành gần: giữ gợi ý theo nhóm (dự phòng `PLAN.jpcG/workG`, `GAP_GRP`, `IV6_GEN`).
- Demo giáo viên (cơ khí) cập nhật theo gợi ý mới. Kiểm 390/1280: cơ khí, may mặc, kaigo, nhà hàng, kỹ sư, Nghề khác; lướt đủ 17 nghề; ES5 đạt; không lỗi console.
- config: cd01 `ver: 'CD01.0.8'`.

File cần xóa trên GitHub: không có.

## PS1.3.7 · 16/11/2026 · CD01: Ga 6 Định Hướng
- Ga 6 Định Hướng mở (`ready: 1`), khởi động + 2 chặng, điền ô số 7. Câu hỏi, gợi ý theo nghề chính (nhóm nghề trong INDP; thực phẩm, thủy sản có nhóm riêng).
- Khởi động “Rõ mấy phần?”: thanh trượt 0–10, kéo xong hiện Senpai kể (lời kể mẫu).
- a62 Kế hoạch 2 chặng: cây cầu mốc (lấy các mốc ở Ga 4, chia Chặng 1 · Ở JPC / Chặng 2 · Ở Nhật theo mốc bay) → trình độ tiếng Nhật trước khi bay (ghi chú theo diện) + 2–4 việc ở JPC → trình độ ở Nhật + 1–3 điều trong công việc → thanh trượt để dành mỗi năm (số tự đặt, tham khảo, có “Mình chưa tính được”, link trang ngành Tikme) + trải nghiệm ngoài giờ → viết 2 câu kế hoạch (gợi ý ghép từ lựa chọn, chạm để dùng; câu gợi ý chưa sửa thì chưa tính Insight).
- a63 Đo khoảng cách: “Nghề cần − Bạn đã có = Việc cần rèn”, 8 điều theo nghề, chọn Đã có / Đang có dần / Chưa có (không đúng sai) → 2 công thức “Khi… tôi sẽ…” (chạm việc nhỏ gợi ý từ điều còn thiếu, có “Lúc khác”) → trả lời phỏng vấn 60 giây: xem lại ý đã viết ở các ga trước, ước lượng số giây đọc to, đồng hồ 60 giây tập nói (không bắt buộc, đếm số lần tập).
- Dạng bước mới: slide, bridge, plan, gap, habit, iv. Hình mới: `cdBridge()` (art.js).
- Dữ liệu cho CD02 thêm: clear, jp1, do1, p1, jp2, work, save, joy, p2, gapNeed, habits, iv, ivn. Demo giáo viên: xong đến Ga 6.
- config: cd01 `ver: 'CD01.0.7'`.

File cần xóa trên GitHub: không có.

## PS1.3.6 · 16/11/2026 · CD01: chỉnh Ga 5 + banner theo góp ý
- Banner trang ga: bỏ hình tàu; nền chấm bi mờ như CD49, đậm dần về bên phải. Không có chữ Hán mờ trên nền.
- Truyện tranh chị Thúy: vẽ lại nhân vật (nửa người, không vẽ bàn tay, có tóc mái, cổ, vai, mũ tốt nghiệp ở khung 1), bỏ vật cầm tay.
- Video chị Thúy nhúng ngay trong chặng 1 (bấm mới tải, có link mở YouTube dự phòng).
- Gợi ý chuyện Đổi đời theo ngành: chỉ chọn anh chị đã đi Nhật, đạt N1–N3 hoặc đang làm quản lý, giáo viên; bỏ các bạn N4, N5. Ưu tiên có video, có nam có nữ. Ngành dưới 2 chuyện thì thêm chuyện chung (anh Hoàng Văn Thiệu, chị Nguyễn Thị Son). Thẻ ghi JLPT, việc hiện nay, nhãn "Có video".
- config: cd01 `ver: 'CD01.0.6'`.

File cần xóa trên GitHub: không có.

## PS1.3.5 · 16/11/2026 · CD01: Ga Chuyện Trò + banner mới
- Banner trang ga: bỏ họa tiết sóng và đường ray; nền trơn, thêm con tàu cách điệu mờ ở góc phải dưới.
- Ga 5 Chuyện Trò mở (`ready: 1`), 2 chặng, điền ô số 6. Shin lên đại bàng sau ga này.
- a51 Chuyện chị Thúy: truyện tranh 3 khung (mở từng khung, có hình) → đoán thử “chị dùng giờ rảnh thế nào” → khung cuối → chọn 1–3 góc nhìn “điều gì giúp chị” (không đúng sai) → lời chị trích Tikme + link đọc trọn chuyện + video → viết “ngoài tiền, mình muốn mang về gì” → mở danh sách Đổi đời trên Tikme (bắt buộc mở), có thẻ chuyện cùng ngành (cơ khí, thực phẩm, thủy sản, in ấn, kỹ sư) → ghi chuyện của ai, bước ngoặt, điều muốn học theo.
- a53 Trò chuyện với anh Minh (nhân vật giả định): giao diện chat, chạm câu mình tò mò (ít nhất 3/7), anh Minh trả lời theo nhóm nghề và “một ngày làm việc” theo nghề → chọn câu cho câu trả lời dùng được nhất (Shin nhắc: câu có/không nhận câu ngắn) → viết người dẫn đường ngoài đời + 2 câu hỏi.
- Dạng bước mới: comic, persp, chat, chatpick; `guess` có `src`, không bắt buộc Senpai; `tik` có `dyn: 'story'`. Ví dụ ô viết `@who` theo nghề.
- Dữ liệu cho CD02 thêm: senpai, turn, learn, bring, guide, qs. Demo giáo viên: xong đến Ga 5.
- config: cd01 `ver: 'CD01.0.5'`.

File cần xóa trên GitHub: không có.

## PS1.3.4 · 16/11/2026 · CD01: chỉnh theo góp ý thầy (22 ý) + cá nhân hóa theo nghề
- Thanh trên chỉ còn Sơ đồ tuyến và Sổ tay. Chuỗi ngày, XP, Insight chuyển lên vé (dòng nhỏ). Nút "Proskills" chỉ ở đầu trang chủ CD (như TK); trong Cài đặt vẫn có "Về trang chính".
- Vé: tàu chạy từ đầu đến chỗ đang học rồi lắc lư; thanh vàng chạy lên rồi ánh nhẹ; vệt sáng lướt qua vé; chạm vé thì vé nghiêng theo chỗ chạm. "Đi tiếp" và ga đang học nháy sáng nhẹ. Các ga hiện dần khi lướt. Bản Career Design: ô đã điền xanh đậm, số trắng. Máy bật giảm chuyển động thì tắt hiệu ứng.
- Banner ga: họa tiết sóng Nhật mờ + đường ray mảnh; chữ Hán nháy sáng nhẹ.
- RIASEC: chọn Bản đầy đủ 60 câu (khuyên dùng) hoặc Bản nhanh 30 câu; 60 = 30 câu cũ + 30 câu mới (RQ2). Ai làm 30 câu có nút "Làm thêm 30 câu".
- Chặng đã xong: chạm vào hiện "Xem và sửa" / "Làm lại từ đầu" (hỏi xác nhận, nhắc tải sao lưu; bài cũ giữ đến khi đóng dấu lại, bỏ dở thì "Khôi phục bài cũ"; không cộng, không trừ XP).
- Đổi nghề chính ở Ga 3 khi Ga 4 đã làm: hộp thoại xác nhận, nhắc sao lưu; bài cũ lưu vào lịch sử (a42.hist); chặng "Nghề của tôi" hiện "Cần làm lại theo nghề mới", ô 5 có ghi chú.
- Cá nhân hóa Ga 4 theo nghề (17 ngành, tóm từ trang ngành Tikme): 3 câu khởi động, 12 việc để đoán, phần "thực tế theo Tikme" sau khi xem Tikme, ví dụ 3 ô viết, gợi ý "một ngày làm nghề", mốc "Đậu thi tay nghề [Nghề]", thẻ sẵn sàng số 4 + Senpai theo nghề. Nghề khác: chọn ngành gần nhất (hoặc không có) để lấy gợi ý và link Tikme.
- Link Tikme ở bước chọn nghề chính, phương án 2 thành thẻ nổi bật.
- Lộ trình: tháng không bắt buộc cho mỗi mốc; tối đa 3 mốc riêng. Bỏ vuốt thẻ ở chặng Sẵn sàng (chỉ bấm 3 nút), bỏ dòng hướng dẫn vuốt.
- Đổi "Báo cáo giữa đường" thành "Báo cáo tiến độ". Bỏ từ "đơn hàng" (mốc: "Đậu phỏng vấn công việc ở Nhật"); ghi quy tắc vào AGENTS.md.
- Gợi ý nhỏ luôn căn trái. Demo: RIASEC 60 câu, có tháng và mốc riêng.
- config: cd01 `ver: 'CD01.0.4'`.

File cần xóa trên GitHub: không có.

## PS1.3.3 · 16/11/2026 · CD01: Ga Ngành Nghề
- Ga 4 Ngành Nghề mở (`ready: 1`), 3 chặng + khởi động, điền ô số 5.
- Khởi động “Đoán thử” 3 câu (người mới làm gì, KY, Omotenashi): đoán xong hiện “Thực tế thường là” + Senpai kể. Không đúng sai.
- a42 Nghề của tôi: đoán một ngày làm nghề → mở trang ngành của mình trên Tikme (bắt buộc bấm) → bất ngờ / thích / còn lo → kể một ngày làm nghề 5 năm sau.
- a44 Lộ trình của tôi: chọn diện (gợi ý theo hồ sơ), xem tóm tắt diện (nguồn: Tikme, ISA; ghi mốc Ikusei Shuro 1/4/2027) → mở trang diện trên Tikme (+ link bài chọn visa) → chọn năm cho 8 mốc + 1 mốc riêng → xem dòng thời gian tự vẽ → viết cách bắt đầu mốc gần nhất.
- a43 Sẵn sàng đến đâu?: 8 thẻ đời sống ở Nhật, vuốt hoặc bấm Sẵn sàng / Còn lo / Chưa biết → điều lo nhất (có cả điều ghi ở a42) + Senpai kể → vì sao vẫn muốn đi.
- Dạng bước mới: guess, visa, tl, tlview, swipe, worry. Chữ dùng được [Nghề], [Diện].
- Dữ liệu cho CD02 thêm: visa, tl, day, worry, ready, goWhy. Demo giáo viên: xong đến Ga 4.
- config: cd01 `ver: 'CD01.0.3'`.

File cần xóa trên GitHub: không có.

## PS1.3.2 · 16/11/2026 · CD01: biên tập gọn chữ + Ga Biết Mình + Ga Tính Cách
- Biên tập lại toàn bộ chữ Sân ga và Ga Nhìn Xa cho điện thoại: câu ngắn, một ý một câu (câu hỏi ≤ 1 dòng rưỡi, lời Shin ≤ 2 câu). Ý giữ nguyên.
- Ga 2 Biết Mình: a21 việc thích (+ lần quên cả thời gian) · a22 điểm mạnh chia 4 nhóm Tâm, Thân, Trí, Kỹ năng (+ lời khen) · a23 chọn 3 điều coi trọng → 3 vòng tròn tự vẽ từ lựa chọn → nghề ở giữa 3 vòng. Điền ô số 3.
- Ga 3 Tính Cách: a31 RIASEC 30 câu, mỗi màn một câu (Thích / Không hẳn, có Câu trước) → 3 nhóm nổi bật + biểu đồ 6 nhóm · a32 mở Tikme Ngành nghề (bắt buộc bấm mở), chọn tối đa 3 ngành Tikme gợi ý, so với RIASEC · a33 video 3 dấu hiệu chọn nghề → nghề chính, phương án 2 (có Nghề khác, Chưa nghĩ ra), link trang ngành trên Tikme, vì sao chọn. Điền ô số 4.
- Báo cáo giữa đường sau Ga 3: chọn thầy cô (nếu chưa có) → tin nhắn soạn sẵn 4 ô đầu → Chép tin nhắn / Mở Teams. Có ở hộp hoàn thành Ga 3 và trang Ga 3.
- Shin lớn thêm sau Ga 3 (gà rừng). Demo giáo viên: học viên giả đã xong Sân ga đến Ga 3.
- Dữ liệu cho CD02 thêm: like, good, value, ria, main/mainName, b/bName, why.
- config: cd01 `ver: 'CD01.0.2'`.

File cần xóa trên GitHub: không có.

## PS1.3.1 · 16/11/2026 · CD01 bản xem thử: Sân ga Xuất phát + Ga Nhìn Xa
- Module mới `cd01/` (Career Design 1, bản CD01.0.1), mở cho học viên trong config (`state: 'ready'`, `total: 19`). Mật khẩu cổng như cũ (Oden).
- Nguyên tắc nội dung: Career Design là thiết kế, không phải bài kiểm tra. Không chấm đúng/sai; mọi lựa chọn có "được" và "mất", luôn có "Tùy hôm" và "Mình làm khác"; sau khi chọn hiện lời Senpai kể. XP thưởng khi làm xong, Insight thưởng khi tự viết ≥ 20 từ.
- Luồng theo TK: Sơ đồ tuyến → trang ga (lời Shin, câu mở ga, khởi động 30 giây, chặng, ô Bản Career Design) → trang chặng mỗi bước một màn (thanh bước, thanh trạng thái bấm được, Xem lại bước trước) → đóng dấu → hoàn thành ga.
- Giao diện theo CD49: vé hành trình, Shin (trứng → gà con → … lớn dần theo số ga), nền xanh sáng, nút nổi khối, thanh trên tự ẩn khi cuộn.
- Đầu ra chính: "Bản Career Design của tôi" 8 ô, mỗi ga điền một ô (xem ở trang chủ module và Sổ tay › Bản Career Design).
- Có: Sân ga Xuất phát (1 chặng: luật chơi, tự định vị, video gương học viên, mục tiêu) · Ga Nhìn Xa (khởi động 5 năm nữa; chặng 1 "Mình thật sự hay làm gì?" 5 tình huống; chặng 2 "Hai phiên bản của tôi 5 năm sau"). Ga 2–7 và Ga Ước Mơ hiện "Đang xây".
- Lời Senpai kể ở chặng 1 là **lời kể mẫu** (có nhãn trên màn hình), cần thay bằng chuyện thật ẩn danh trước khi phát hành.
- Demo giáo viên: `cd01/?demo` + mật khẩu chung; học viên giả định đã xong Sân ga và Ga Nhìn Xa; lưu ở `ps.demo.cd01`.
- Dữ liệu cho CD02: `PS.report('cd01', {extra: {goal, now, me, hope, first}})`.
- Tệp: `cd01/index.html`, `cd01/cd01.css`, `cd01/art.js` (Shin, biểu tượng), `cd01/content.js` (chữ: sửa ở đây), `cd01/engine.js` (bộ máy).

File cần xóa trên GitHub: không có.

## PS1.2.2 · 16/11/2026 · Mật khẩu demo chung
- Một mật khẩu demo giáo viên cho mọi khóa: `Oden@123#` (phân biệt hoa thường), đặt ở `config.js` (`DEMO_PASS`).
- Mở demo: thêm `?demo` vào link khóa (ví dụ `tk/?demo`), hộp nhập mật khẩu hiện ra. Bỏ mã cũ `HP05@PHUTANG`.
- Lõi: thêm `PS.checkDemo`, `PS.demoParam`, `PS.demoAsk`; hộp thoại có `onClose`. AGENTS.md mục 3.9 ghi quy tắc cho module mới.
- TK15: dùng mật khẩu demo chung; bước "Giữ bài làm an toàn" đổi thành "Thêm ứng dụng Proskills vào màn hình chính".

File cần xóa trên GitHub: không có.

## PS1.2.1 · 16/11/2026 · Đưa Nhật Bản Du Ký (TK) vào khung
- Module `tk/` (HP05 · Nhật Bản Du Ký, bản TK14) mở cho học viên; mật khẩu như cũ (Đào). Nội dung, cách chấm, XP, Insight, con dấu giữ nguyên TK13.
- Tách cơ học tệp TK13 (một index.html 468 KB) thành: `tk/index.html`, `tk/tk.css`, `tk/art.js` (hình), `tk/content.js` (chữ, sửa nội dung ở đây), `tk/engine.js`, `tk/steps.js`, `tk/report.js`, `tk/extras.js`, `tk/notebook.js`, `tk/actions.js`, `tk/game-entry.js`; game ải 05 ở `tk/game/`.
- Gắn lõi: bỏ màn nhập thông tin và câu hỏi qua cổng riêng của TK (trang chủ làm); họ tên, lớp, diện, thầy cô đọc từ hồ sơ chung; Cài đặt dùng thẻ chuẩn (thêm Nhịp học và lời nhắc, Túi cứu viện); sao lưu, khôi phục, xóa bài làm dùng lõi; âm thanh dùng công tắc chung; chuỗi ngày tính chung.
- Bài làm lưu ở `ps.mod.tk`, demo giáo viên ở `ps.demo.tk` (mở bằng `tk/?demo=HP05@PHUTANG`). Không chuyển dữ liệu TK13 cũ (chưa phát hành).
- Lần đầu vào TK sau khi qua cổng: vẫn có màn mở văn điệp như TK13.
- Trang bản đồ TK có nút nhỏ "‹ Proskills" để về trang chính.
- Sửa lỗi nhỏ có từ TK13: trang ghi chép luôn hiện "Chưa điền" ở ô thầy cô, nay hiện đúng tên.
- Bỏ các tệp riêng của TK13: pwa.js, pwa.css, sw.js, manifest, offline.html, icons (dùng chung của Proskills).
- config.js: module tk `state: 'ready'`, `ver: 'TK14'`, `total: 26` (26 chặng chính, không tính 7 phần khởi động).

File cần xóa trên GitHub: không có (repository Proskills chưa có tệp TK cũ).

## PS1.1.2 · 16/11/2026 · Logo và tên repository
- Logo Proskills mới: đầu tàu tiến về bình minh trên đường ray (ý nghĩa hành trình Career Design). File gốc `icons/logo.svg`; các icon PNG dựng lại từ file này.
- Trang chủ và trang mất mạng dùng logo mới.
- Tên repository chốt: `Proskills`; hướng dẫn tải lên cập nhật link.
- Mã học viên không bắt buộc khi nhập lần đầu (giữ như PS1.1.1).

File cần xóa trên GitHub: không có. Các file icon trùng tên sẽ được thay.

## PS1.1.1 · 16/11/2026 · Khung và lõi chung
Đã làm:
- Trang chủ Proskills: chào mừng + nhập thông tin một lần (họ tên, năm sinh, mã học viên, lớp, diện, thầy cô), tổng chuỗi ngày, tổng XP, Insight, thẻ các module.
- Cổng mật khẩu từng module (CD = Oden, TK = Đào), không phân biệt hoa thường, dấu.
- Lõi chung `core/`: hồ sơ chung, lưu bài theo module, sao lưu một tập tin cho mọi module, khôi phục có chọn phần, xóa làm lại một module (giữ hồ sơ, giữ module khác, giữ chuỗi ngày), Cài đặt chuẩn.
- Một ứng dụng PWA Proskills cho mọi module; học được khi mất mạng sau lần mở đầu.
- Module mẫu `mau/` (ẩn, mở bằng `?thu=1`) để thử khung.
- CD01, CD02, HP05 đang ở trạng thái "Sắp ra mắt".

File cần xóa trên GitHub: không có (bản đầu).
