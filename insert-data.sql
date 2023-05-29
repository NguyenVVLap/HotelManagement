use khachsan

delete from chi_tiet_dich_vu;
delete from chi_tiet_hoa_don;
delete from hoa_don;

delete from chi_tiet_phieu_dat_phong;
delete from phieu_dat_phong;

delete from dich_vu
delete from nhan_vien

delete from tai_khoan
delete from khach_hang
delete from vai_tro

delete from hinh_anh_phong;
delete from phong;
delete from tang;
delete from loai_phong;

delete from ca_lam_viec;


Insert into loai_phong(ten_loai_phong, mo_ta_loai_phong) values
(N'Phòng STD', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ'),
(N'Phòng SUP', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình'),
(N'Phòng DLX', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp'),
(N'Phòng SUT', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn');

Insert into tang(ten_tang) values
(N'Tầng 1'),
(N'Tầng 2'),
(N'Tầng 3'),
(N'Tầng 4'),
(N'Tầng 5');

Insert into phong(ma_phong, mo_ta_phong, ten_phong, trang_thai_phong, mang_thu_cung, gia_phong, duoc_hut_thuoc, suc_chua, so_giuong, ma_tang, ma_loai_phong) values
('0101', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 1', 1, 0, 200000, 0, 1, 1, 1, 1),
('0102', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 2', 1, 0, 200000, 0, 1, 1, 1, 1),
('0103', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 3', 1, 0, 200000, 0, 1, 1, 1, 1),
('0104', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 4', 1, 0, 200000, 1, 1, 1, 1, 1),
('0105', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 5', 1, 0, 200000, 0, 1, 1, 1, 1),
('0106', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 6', 1, 0, 200000, 1, 1, 1, 1, 1),
('0107', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 7', 1, 0, 200000, 1, 1, 1, 1, 1),
('0108', N'Phòng đơn giản với những trang bị tối thiểu, có diện tích nhỏ', N'Phòng 8', 1, 0, 200000, 1, 1, 1, 1, 1),
('0109', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 9', 1, 1, 250000, 1, 1, 1, 1, 2),


('0201', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 1', 1, 1, 300000, 1, 2, 1, 2, 2),
('0202', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 2', 1, 1, 300000, 1, 2, 1, 2, 2),
('0203', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 3', 1, 1, 300000, 1, 2, 1, 2, 2),
('0204', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 4', 1, 1, 300000, 1, 2, 1, 2, 2),
('0205', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 5', 1, 1, 300000, 1, 2, 1, 2, 2),
('0206', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 6', 1, 1, 300000, 1, 2, 1, 2, 2),
('0207', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 7', 1, 1, 300000, 1, 2, 1, 2, 2),
('0208', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 8', 1, 1, 300000, 1, 2, 1, 2, 2),

('0301', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 1', 1, 1, 350000, 1, 2, 1, 3, 2),
('0302', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 2', 1, 1, 350000, 1, 2, 1, 3, 2),
('0303', N'Trang bị nhiều trang thiết bị tiện nghi, có view đẹp, diện tích trung bình', N'Phòng 3', 1, 1, 350000, 1, 2, 1, 3, 2),
('0304', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 4', 1, 1, 400000, 1, 3, 2, 3, 3),
('0305', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 5', 1, 1, 400000, 1, 3, 2, 3, 3),
('0306', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 6', 1, 1, 400000, 1, 3, 2, 3, 3),

('0401', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 1', 1, 1, 450000, 1, 3, 2, 4, 3),
('0402', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 2', 1, 1, 450000, 1, 3, 2, 4, 3),
('0403', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 3', 1, 1, 450000, 1, 3, 2, 4, 3),
('0404', N'Diện tích rộng, có tầm nhìn đẹp với các trang thiết bị cao cấp', N'Phòng 4', 1, 1, 450000, 1, 3, 2, 4, 3),

('0501', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 1', 1, 1, 600000, 1, 6, 3, 5, 4),
('0502', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 2', 1, 1, 600000, 1, 6, 3, 5, 4),
('0503', N'Có phòng khách và phòng ngủ riêng biệt, có ban công với view đẹp nhất khách sạn', N'Phòng 3', 1, 1, 600000, 1, 6, 3, 5, 4);


Insert into hinh_anh_phong(ma_phong, hinh_anh_phong) values
('0101', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW8OHFXYiMye-iZhQxLQdgO7n-cd-2o-aGJGFizObT8Mc88FeMHmBmnQzjXY8sAa3MUHA&usqp=CAU'),
('0102', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HGGkFWqa2Agtm6WpOwAuz16NEGdMTzu1sbdWFr24aeuw7QdFuoj7gBULAGJFbnsFvLE&usqp=CAU'),
('0103', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfLuJaAVHCnjqnwPmgXAkH-pZENovp48ZQkZpukUmFUreQZGXAHvGR7RonA5PB3GALKY&usqp=CAU'),
('0104', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGXdqAs3mfIj_PPhQNf2rRius1dMeLXjPQ3vmstWiZI_n6s9gf-eS2sR2o129E8-_0Ss&usqp=CAU'),
('0105', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzxUYI9dohyejsl0Gqpp-IsZwo47BkzkUI_D-fULeyw60gGpZTbyV9rxT68nENQbiTAw&usqp=CAU'),
('0106', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4M190ig71cH8eQdGN8oqmQCHczvwiY1AncNe7vOjz3RhM21Mij1yB2wm0XtoMvfm3D9g&usqp=CAU'),
('0107', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCtOk7iOLyRGqPVjqvEgYOzhFQOuc2LwQzqA&usqp=CAU'),
('0108', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHyr1qEVwjci-odxRRSKeluS7oGKLd4rikw&usqp=CAU'),
('0109', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gSljIcniHWOYEqZhcxCebSX5iN80B7Hl7g&usqp=CAU'),

('0201', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5e6i3lL0icEYvIuViRu_TiAr1AMOBRlKe1wlZqikvqCHQLeABl4uPHvP1XeqZZEamUjI&usqp=CAU'),
('0202', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkDCnX5NVxV86DOGs3K1S9XrRJu29x4TcDE4oI5-LFW-qBgCKROm4_flPxdOQw5YC3ek&usqp=CAU'),
('0203', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7svCPEzFZWJ72O5dw8B67zvI69Xx6WEY2Ojl2wSYvOM56V9t3PiPEfighSaPN9k4J9Yg&usqp=CAU'),
('0204', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWPnCuL3QmvmXUTw5EwZMR-uFWDZf8LuilHwPIjouKvpin44zCgGoMMwi_80yJU4p3iJw&usqp=CAU'),
('0205', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRp_xBq796b_0j772v_3TwQpFqYuzze7n5_yBhTnjMHEV3VNDnIRGZmfh_HTRnskZY_8&usqp=CAU'),
('0206', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxxTNHft_VuE5Dlom23EA-mNi32jB--sC7Ag&usqp=CAU'),
('0207', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPh3-7SVe2op3GufdEate5f5yPvdR2J3_Hog&usqp=CAU'),
('0208', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJG--0PmjRMIgT3JPzAiqIQjx_YqxDoHyElA&usqp=CAU'),

('0301', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28zj14-yTsc98U9rpoptPCYIUdingXLjgLA&usqp=CAU'),
('0302', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCt1y9SJOtR_Q0mGkodlXprmApW4I7ZayOA&usqp=CAU'),
('0303', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5x2r0lNLmf0CXpCTfK6QiJClHl_nxEDFag&usqp=CAU'),
('0304', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAHQVkBwebZ9WVqBMtqNgAg4nJ_dmju1COg&usqp=CAU'),
('0305', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ3a_HpPqY0w_kKpWhNSQm58xS_KWDyLyAVA&usqp=CAU'),
('0306', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvH9GcR3soVPIwuduPdJj-1jNM4belfrhykg&usqp=CAU'),

('0401', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHnKkgP-7Qn1HViior82LsOkoQQVLQy0OTA&usqp=CAU'),
('0402', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEh5IVwqerHVVYHx4BeiMv3dLxDNEOcrEMvQ&usqp=CAU'),
('0403', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_rg9bj0tWA16z94VmbQB1B2yswBfVVzomg&usqp=CAU'),
('0404', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdXvw3Ue6roTx78S4lPRxCjzC3fRXVZb8Gw&usqp=CAU'),

('0501', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcuwt434v5yZGlSWkUczLXNT4uecq3JYrM2A&usqp=CAU'),
('0502', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDOQg-v1Rt6c1FkNf0upzFq8KBsQ8BVOUuw&usqp=CAU'),
('0503', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAQuSW8Ti-RDYzt2eqv1LXV2Bm4UPx5tzbg&usqp=CAU'),

('0101', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpt2-sXqe-aizMYMTXh4hCAgDOAxZ14lLNw&usqp=CAU'),
('0102', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDq7PEWI-Cp9kX9Q34rPIjI3FRnMnJp0BSVw&usqp=CAU'),
('0103', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1YZ_Sh70ojPOY4ZDEyW1KH0PDSEKJdoJLA&usqp=CAU'),
('0104', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvN_JWB0OHftMF31FBdW2aA1QNI6EEfR0Jsw&usqp=CAU'),
('0105', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJymAoO4KEm2r48Si5rCh4A8NvnprFlXtueA&usqp=CAU'),
('0106', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRihae9luY91rTcK756i7dW_KFnHPgdNY-ryw&usqp=CAU'),
('0107', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3xQ3tTwlI_RBrytr5hfdqkGPcZVpF7UgJg&usqp=CAU'),
('0108', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx3Ywwxh17JOEIBcVjuOyYP5V7HWFGQ7pwrA&usqp=CAU'),
('0109', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6z03IpAuO5DSxn-2o-AxG7x2MRA4ShOPNA&usqp=CAU'),

('0201', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntjP-sEJNdX0jaQ8yOZEJS1eF0K0HYVYDMQ&usqp=CAU'),
('0202', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ67SirOlvby8EUk_7PrE353ymxBwT9LXrlKw&usqp=CAU'),
('0203', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Ndqryux2SizdvrKX3pl38y7iDf5UlFtsjw&usqp=CAU'),
('0204', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3Y708vap2CeA-iV3x9N0rTCzySf281RROA&usqp=CAU'),
('0205', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTBWOREq5vmINCNu1_BRh32en_z3i1DK_ww&usqp=CAU'),
('0206', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Ot7w75oqSdZ7mB8ViqmCd79tOB2C_53_XA&usqp=CAU'),
('0207', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9IAbM6eMznj5udZfj2ymZODAFpOXkurBDg&usqp=CAU'),
('0208', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGZi2RSkbK7ABgCYVa4j05b71YQchL6r9Yw&usqp=CAU'),

('0301', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyfDnv5V883tleWEQUEwoY8N3i7QduFDxyA&usqp=CAU'),
('0302', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBf0c3CMiEKqDjMPLheDHB54mkTZMAbxTf6w&usqp=CAU'),
('0303', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92mp0Boq3VcBxnqMePcAyPIPeW-c8ADj-bQ&usqp=CAU'),
('0304', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch8N3VsO_-qxvjX7nWhZr3GjT65CSpFFGaQ&usqp=CAU'),
('0305', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47nSfV_Evz3zyhq8KQacGf_FwmRXekieA3Q&usqp=CAU'),
('0306', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbJ3uFxqmndQ9_U8wlOo0sv0MqujDNuBSZg&usqp=CAU'),

('0401', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgUCEHhD9ClbUX0D7iRk8ilaYJStZx5RhSQ&usqp=CAU'),
('0402', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzJvHeMceErxkC-pg-oRqBMk5uZHIaLEV1w&usqp=CAU'),
('0403', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgo7f-lyNTgF-b_PhBoFIJveugv7uThZEezA&usqp=CAU'),
('0404', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqMKPHUs_sSK5wsL_kxY5SmXKWM9s1PnBdw&usqp=CAU'),

('0501', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8TGu-S1gKqN8DIk87jE8V-V4B2e2stU1Jw&usqp=CAU'),
('0502', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMfDcODJ3LHPawvuPTuI688A0Yue_mopFtvA&usqp=CAU'),
('0503', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT88jBoK56h3c_wqanusF5z5yQ1TCMYPjp6RA&usqp=CAU');


insert into loai_dich_vu (don_vi_loai_dich_vu, ten_loai_dich_vu) values 
(N'chai', N'nước(chai)'),
(N'lon', N'nước(lon)'),
(N'thùng', N'nước(thùng)'),
(N'suất', N'thức ăn(suất)'),
(N'phần', N'thức ăn(phần)'),
(N'thùng', N'thức ăn(thùng)'),
(N'hộp', N'thức ăn(hộp)'),
(N'gói', N'thức ăn(gói)'),
(N'cái', N'thức ăn(cái)'),
(N'bịch', N'thức ăn(bịch)'),
(N'ly', N'thức ăn(ly)');

insert into dich_vu (gia_dich_vu, so_luong, ten_dich_vu, ma_loai_dich_vu) values
(20000, 100, N'Nước suối Aqua', 1),
(30000, 50, N'Bia Heniken', 2),
(30000, 50, N'Bia Tiger', 2),
(300000, 50, N'Bia Heniken', 3),
(30000, 50, N'Pizza thập cẩm', 5),
(30000, 50, N'Mì hảo hảo', 6),
(30000, 50, N'Bánh oreo', 7),
(15000, 150, N'Soda chanh', 2),
(15000, 250, N'String dâu', 1),
(10000, 150, N'Bò cụng', 2),
(9000, 50, N'Trà chanh hạt chia Fuze Tea', 1),
(41000, 150, N'Nước gạo hàn quốc OKF', 1),
(270000, 350, N'Cà phê sữa đá NesCafe', 3),
(128000, 50, N'Mì Kokomi chua cay', 6),
(18000, 150, N'Mì khoai tây cung đình', 11),
(25000, 150, N'Mì khoai tây Omachi sốt thái', 11),
(30000, 50, N'Kẹo dẻo', 10);

INSERT INTO vai_tro(ten_vai_tro) values('ROLE_EMPLOYEE'),('ROLE_MANAGEMENT');
INSERT INTO tai_khoan(da_kich_hoat,mat_khau,ten_tai_khoan,ma_vai_tro) values 
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84392589774',1),
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84523564371',2),
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84111111111',1),
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+82222222222',1),
(1,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84333333333',1);

/*
INSERT INTO tai_khoan(da_kich_hoat,mat_khau,ten_tai_khoan,ma_vai_tro) values 
(0,'$2a$10$ggqnnTxpQEg2jqu9MGU5QeeK1X78pLukgyzlRA1opIqdnMuUa/Oli','+84392589772',1);
insert into nhan_vien(cccd, dia_chi, email, ho_ten, luong_co_ban, ngay_sinh,ngay_vao_lam, so_dien_thoai,ma_tai_khoan) values 
('012345678905', N'12 Trần Hưng Đạo','lap@gmail.com', N'Nguyễn Võ Vươn Lập',100000, '2001-03-19T10:00:56.117+00:00','2022-03-19T10:00:56.117+00:00', '+84392589772', 6);
*/

insert into nhan_vien(cccd, dia_chi, email, ho_ten, luong_co_ban, ngay_sinh,ngay_vao_lam, so_dien_thoai,ma_tai_khoan) values 
('012345678900', N'12 Trần Hưng Đạo','lap@gmail.com', N'Nguyễn Võ Vươn Lập',100000, '2001-03-19T10:00:56.117+00:00','2022-03-19T10:00:56.117+00:00', '+84392589774',1),
('012345678901', N'19 Trần Hưng Đạo','minh@gmail.com',N'Nguyễn Lâm Nhật Minh',300000, '2001-04-19T10:00:56.117+00:00','2023-03-19T10:00:56.117+00:00', '+84523564371',2),
('012345678902', N'12 Lê Lợi','nam@gmail.com', N'Lê Công Nam',200000, '2000-03-30T10:00:56.117+00:00','2022-12-20T10:00:56.117+00:00', '+84111111111',3),
('012345678903', N'141 Lê Duẩn','huong@gmail.com', N'Trần Thanh Hương',150000, '2001-02-12T10:00:56.117+00:00','2022-04-22T10:00:56.117+00:00', '+82222222222',4),
('012345678904', N'515 Trường Chinh','long@gmail.com', N'Lê Thành Long',120000, '2001-06-20T10:00:56.117+00:00','2022-05-21T10:00:56.117+00:00', '+84333333333',5);

Insert into khach_hang(cccd_khach_hang, dia_chi_kh, email_kh, ho_ten, so_dien_thoai_kh) values 
('123456789000', N'12 Lê Lợi', 'test@gmail.com', N'Trần Quang Linh', '0123456789'),
('123456789001', N'12 Lê Lai', 'test1@gmail.com', N'Trần Quang Thái', '0123456788'),
('123456789002', N'12 Huy Giáp', 'test2@gmail.com', N'Thái Anh Văn', '0123456787'),
('123456789003', N'12 Ánh Thủ', 'test3@gmail.com', N'Phùng Anh Tú', '0123456786'),
('123456789004', N'12 Lê Lai', 'test4@gmail.com', N'Bùi Xuân Nhàn', '0123456785'),
('123456789005', N'12 Hưng Đạo', 'test5@gmail.com', N'Đỗ Anh Dũng', '0123456784'),
('123456789006', N'12 Quốc Nghĩa', 'test6@gmail.com', N'Nguyễn Cửu Quang', '0123456783'),
('123456789007', N'12 Lê Quốc', 'test7@gmail.com', N'Đỗ Thị Diệu', '0123456782'),
('123456789008', N'12 Lê Gia Định', 'test8@gmail.com', N'Đỗ Xuân Cường', '0123456781'),
('123456789009', N'12 Lê Công Định', 'test9@gmail.com', N'Nguyễn Ánh Thủ', '0123456780'),
('123456789111', N'12 Lê Công Thành', 'test10@gmail.com', N'Đỗ Xuân Kiên', '0123456100'),
('123456789112', N'12 Tân Xuân', 'test11@gmail.com', N'Lưu Bá Trạc', '0123456101'),
('123456789113', N'12 Lê Tấn', 'test12@gmail.com', N'Bùi Tiến Dũng', '0123456102'),
('123456789114', N'12 Lê Lai', 'test13@gmail.com', N'Đỗ Bá Lam', '0123456103'),
('123456789115', N'12 Lê Công', 'test14@gmail.com', N'Mai Anh Tài', '0123456104');

Insert into phieu_dat_phong(ghi_chu_dat_phong,giam_gia,ngay_dat_phong,ngay_nhan_phong,ngay_tra_phong,trang_thai_dat_phong,ma_khach_hang)
values 
(null,0,'2022-01-10 15:53:55.874000','2022-01-10 00:00:00','2022-01-11 00:00:00','HOAN_TAT',1),
(null,0,'2022-02-10 15:56:19.482000','2022-02-10 00:00:00','2022-02-11 00:00:00','HOAN_TAT',2),
(null,0,'2022-03-10 15:57:09.818000','2022-03-10 00:00:00','2022-03-11 00:00:00','HOAN_TAT',3),
(null,0,'2022-04-10 15:57:36.363000','2022-04-10 00:00:00','2022-04-12 00:00:00','HOAN_TAT',4),
(null,0,'2022-05-10 15:58:01.906000','2022-05-10 00:00:00','2022-05-14 00:00:00','HOAN_TAT',5),
(null,0,'2022-06-10 15:58:24.035000','2022-06-10 00:00:00','2022-06-11 00:00:00','HOAN_TAT',6),
(null,0,'2022-07-10 15:58:46.514000','2022-07-10 00:00:00','2022-07-12 00:00:00','HOAN_TAT',7),
(null,0,'2022-08-10 15:59:23.002000','2022-08-10 00:00:00','2022-08-13 00:00:00','HOAN_TAT',8),
(null,0,'2022-09-10 16:00:18.786000','2022-09-10 00:00:00','2022-09-12 00:00:00','HOAN_TAT',9),
(null,0,'2022-10-10 16:00:51.514000','2022-10-11 00:00:00','2022-10-11 00:00:00','HOAN_TAT',10),
(null,0,'2022-11-10 16:01:16.106000','2022-11-11 00:00:00','2022-11-12 00:00:00','HOAN_TAT',11),
(null,0,'2022-12-10 16:01:36.979000','2022-12-11 00:00:00','2022-12-13 00:00:00','HOAN_TAT',12),

(null,0,'2022-04-05 00:41:20.526000','2022-04-05 00:00:00','2022-04-07 00:00:00','HOAN_TAT',1),
(null,0,'2022-04-07 00:41:20.526000','2022-04-07 00:00:00','2022-04-10 00:00:00','HOAN_TAT',3),
(null,0,'2022-04-09 00:41:20.526000','2022-04-09 00:00:00','2022-04-10 00:00:00','HOAN_TAT',4),
(null,0,'2022-04-10 15:57:36.363000','2022-04-10 00:00:00','2022-04-12 00:00:00','HOAN_TAT',2),
(null,0,'2022-04-11 00:41:20.526000','2022-04-11 00:00:00','2022-04-12 00:00:00','HOAN_TAT',5),
(null,0,'2022-04-15 00:41:20.526000','2022-04-15 00:00:00','2022-04-16 00:00:00','HOAN_TAT',6),
(null,0,'2022-04-18 00:41:20.526000','2022-04-18 00:00:00','2022-04-20 00:00:00','HOAN_TAT',7),
(null,0,'2022-04-20 00:41:20.526000','2022-04-20 00:00:00','2022-04-21 00:00:00','HOAN_TAT',8),
(null,0,'2022-04-23 00:41:20.526000','2022-04-23 00:00:00','2022-04-26 00:00:00','HOAN_TAT',9),
(null,0,'2022-04-27 00:41:20.526000','2022-04-27 00:00:00','2022-04-29 00:00:00','HOAN_TAT',10);


INSERT INTO chi_tiet_phieu_dat_phong (ma_phieu_dat_phong,ma_phong) values 
(1,'0105'),
(1,'0106'),
(2,'0102'),
(3,'0304'),
(4,'0404'),
(5,'0101'),
(6,'0302'),
(7,'0207'),
(7,'0206'),
(8,'0201'),
(8,'0302'),
(9,'0502'),
(9,'0503'),
(10,'0107'),
(10,'0108'),
(11,'0302'),
(11,'0304'),
(12,'0502'),
(12,'0503'),

(13,'0105'),
(14,'0106'),
(15,'0102'),
(16,'0304'),
(17,'0208'),
(18,'0208'),
(19,'0208'),
(20,'0208'),
(21,'0208'),
(22,'0208');

INSERT INTO hoa_don (ngay_lap,ngay_nhan_phong,ngay_tra_phong,tien_nhan, tong_tien_dich_vu, tong_tien_phong, tong_tien, ma_khach_hang, ma_nhan_vien, ma_phieu_dat_phong) values 
('2022-01-11 11:00:00','2022-01-10 00:00:00','2022-01-11 11:00:00',600000, 190000, 400000, 590000,1,1,1),
('2022-02-11 13:00:00','2022-02-10 00:00:00','2022-02-11 13:00:00',350000, 90000, 260000, 350000,1,2,2),
('2022-03-11 16:00:00','2022-03-10 00:00:00','2022-03-11 16:00:00',1800000, 1200000, 600000, 1800000,1,1,3),
('2022-04-12 19:00:00','2022-04-10 00:00:00','2022-04-12 19:00:00',1550000, 180000, 1350000, 1530000,1,2,4),
('2022-05-14 11:00:00','2022-05-10 00:00:00','2022-05-14 11:00:00',850000, 30000, 800000, 830000,1,1,5),
('2022-06-11 11:00:00','2022-06-10 00:00:00','2022-06-11 11:00:00',450000, 90000, 350000, 440000,1,2,6),
('2022-07-12 11:00:00','2022-07-10 00:00:00','2022-07-12 11:00:00',1275000, 75000, 1200000, 1275000,1,1,7),
('2022-08-13 08:00:00','2022-08-10 00:00:00','2022-08-13 08:00:00',2000000, 47000, 1950000, 1997000,1,2,8),
('2022-09-12 09:00:00','2022-09-10 00:00:00','2022-09-12 09:00:00',2650000, 230000, 2400000, 2630000,1,1,9),
('2022-10-11 10:00:00','2022-10-11 00:00:00','2022-10-11 10:00:00',1360000, 960000, 400000, 1360000,1,2,10),
('2022-11-12 14:00:00','2022-11-11 00:00:00','2022-11-12 14:00:00',1160000, 180000, 975000, 1155000,1,1,11),
('2022-12-13 20:00:00','2022-12-11 00:00:00','2022-12-13 20:00:00',3710000, 105000, 3600000, 3705000,1,2,12),

('2022-04-07 11:00:00','2022-04-05 00:00:00','2022-04-07 11:00:00',400000, 0, 400000, 400000,1,2,13),
('2022-04-10 11:00:00','2022-04-07 00:00:00','2022-04-10 11:00:00',600000, 0, 600000, 600000,1,2,14),
('2022-04-10 11:00:00','2022-04-09 00:00:00','2022-04-10 11:00:00',200000, 0, 200000, 200000,1,2,15),
('2022-04-12 11:00:00','2022-04-10 00:00:00','2022-04-12 11:00:00',800000, 0, 800000, 800000,1,2,16),
('2022-04-12 11:00:00','2022-04-11 00:00:00','2022-04-12 11:00:00',300000, 0, 300000, 300000,1,2,17),
('2022-04-16 11:00:00','2022-04-15 00:00:00','2022-04-16 11:00:00',300000, 0, 300000, 300000,1,2,18),
('2022-04-20 11:00:00','2022-04-18 00:00:00','2022-04-20 11:00:00',600000, 0, 600000, 600000,1,2,19),
('2022-04-21 11:00:00','2022-04-20 00:00:00','2022-04-21 11:00:00',300000, 0, 300000, 300000,1,2,20),
('2022-04-26 11:00:00','2022-04-23 00:00:00','2022-04-26 11:00:00',900000, 0, 900000, 900000,1,2,21),
('2022-04-26 11:00:00','2022-04-27 00:00:00','2022-04-29 11:00:00',600000, 0, 600000, 600000,1,2,22);


INSERT INTO chi_tiet_hoa_don(ma_hoa_don,ma_phong) values 
(1,'0105'),
(1,'0106'),
(2,'0102'),
(3,'0304'),
(4,'0404'),
(5,'0101'),
(6,'0302'),
(7,'0207'),
(7,'0206'),
(8,'0201'),
(8,'0302'),
(9,'0502'),
(9,'0503'),
(10,'0107'),
(10,'0108'),
(11,'0302'),
(11,'0304'),
(12,'0502'),
(12,'0503'),

(13,'0105'),
(14,'0106'),
(15,'0102'),
(16,'0304'),
(17,'0208'),
(18,'0208'),
(19,'0208'),
(20,'0208'),
(21,'0208'),
(22,'0208');

INSERT INTO chi_tiet_dich_vu(ma_dich_vu,ma_hoa_don,so_luong,ma_phong) values 
(1,1,2,'0105'),
(2,1,5,'0106'),
(3,2,3,'0102'),
(4,3,4,'0304'),
(5,4,6,'0404'),
(6,5,1,'0101'),
(7,6,3,'0302'),
(8,7,4,'0207'),
(9,7,1,'0206'),
(10,8,2,'0201'),
(11,8,3,'0302'),
(1,9,4,'0502'),
(2,9,5,'0503'),
(3,10,2,'0107'),
(4,10,3,'0108'),
(5,11,4,'0304'),
(6,11,2,'0304'),
(7,12,1,'0502'),
(8,12,5,'0503');
/*
insert into ca_lam_viec (ten_ca, gio_bat_dau, so_gio, gio_ket_thuc) values
(N'Ca ngày', '06:00:00', 8, '14:00:00'),
(N'Ca chiều', '14:00:00', 8, '22:00:00'),
(N'Ca tối', '22:00:00', 8, '6:00:00');

/*
insert into bang_phan_cong (ngay_chinh_sua, ngay_phan_cong, ma_nhan_vien) values
('2023-04-13 00:41:20.526000', '2023-04-13 00:41:20.526000', 1),
('2023-04-13 00:41:20.526000', '2023-04-13 00:41:20.526000', 2);

insert into chi_tiet_phan_cong (ma_ca, ma_bang_phan_cong) values
(1, 1),
(2, 1),
(4, 1),
(1, 2),
(3, 2),
(5, 2);

insert into thu (ma_chi_tiet_phan_cong, thu) values
(1, 0),
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 0),
(2, 2),
(2, 4),
(2, 6),
(3, 5),
(3, 6),
(4, 1),
(4, 3),
(4, 5),
(5, 0),
(5, 2),
(5, 4),
(6, 6);
*/

insert into bang_phan_cong (ngay_chinh_sua, ngay_phan_cong, ngay_bat_dau, ma_nhan_vien) values
('2023-04-13 00:00:00.000000', '2023-04-13 00:00:00.000000', '2023-04-15 00:00:00', 1);

insert into chi_tiet_phan_cong (ma_ca, ma_bang_phan_cong) values
(1, 1),
(2, 1),
(3, 1);

insert into thu (ma_chi_tiet_phan_cong, thu) values
(1, 0),
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 0),
(2, 2),
(2, 4),
(2, 6),
(3, 5),
(3, 6);

insert into bang_cham_cong (ma_chi_tiet_phan_cong, thu, ma_nhan_vien, ngay_cham_cong) values
(1, 0, 1, '2023-04-08 00:00:00'),
(2, 0, 1, '2023-04-08 00:00:00');

insert into bang_luong (ma_bang_luong, thang, nam, ma_nhan_vien) values
('042023NV1', 4, 2023, 1);

insert into chi_tiet_bang_luong (ma_bang_cham_cong, ma_bang_luong) values
(1, '042023NV1'),
(2, '042023NV1');
*/


/*
update hoa_don set ngay_lap ='2023-01-04 00:41:20.526000' where ma_hoa_don=4
update hoa_don set ngay_lap ='2023-02-04 00:41:20.526000' where ma_hoa_don=5
update hoa_don set ngay_lap ='2023-03-04 00:41:20.526000' where ma_hoa_don=6
update hoa_don set ngay_lap ='2023-04-04 00:41:20.526000' where ma_hoa_don=7
update hoa_don set ngay_lap ='2023-05-04 00:41:20.526000' where ma_hoa_don=8
update hoa_don set ngay_lap ='2023-06-04 00:41:20.526000' where ma_hoa_don=9
update hoa_don set ngay_lap ='2023-08-04 00:41:20.526000' where ma_hoa_don=10
update hoa_don set ngay_lap ='2023-07-04 00:41:20.526000' where ma_hoa_don=11
update hoa_don set ngay_lap ='2023-09-04 00:41:20.526000' where ma_hoa_don=12
update hoa_don set ngay_lap ='2023-10-04 00:41:20.526000' where ma_hoa_don=13
update hoa_don set ngay_lap ='2023-11-04 00:41:20.526000' where ma_hoa_don=14
update hoa_don set ngay_lap ='2023-12-04 00:41:20.526000' where ma_hoa_don=15
*/




