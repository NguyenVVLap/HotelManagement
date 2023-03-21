use khachsan

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



Insert into loai_phong(ma_loai_phong, ten_loai_phong) values
(1, N'Phòng đơn'),
(2, N'Phòng đôi'),
(3, N'Phòng gia đình'),
(4, N'Phòng VIP'),
(5, N'Phòng tập thể');

Insert into tang(ma_tang, ten_tang) values
(1, N'Tầng 1'),
(2, N'Tầng 2'),
(3, N'Tầng 3'),
(4, N'Tầng 4'),
(5, N'Tầng 5');

Insert into phong(ma_phong, mo_ta_phong, ten_phong, trang_thai_phong, mang_thu_cung, gia_phong, duoc_hut_thuoc, suc_chua, so_giuong, ma_tang, ma_loai_phong) values
('T01P101', N'Không có mô tả', N'Phòng 101', 1, 1, 100000, 1, 4, 2, 1, 1),
('T01P102', N'Không có mô tả', N'Phòng 102', 1, 1, 200000, 0, 2, 1, 1, 2),
('T01P103', N'Không có mô tả', N'Phòng 103', 0, 0, 300000, 0, 1, 1, 1, 3),
('T01P104', N'Không có mô tả', N'Phòng 104', 0, 1, 500000, 1, 5, 4, 1, 4),
('T01P105', N'Không có mô tả', N'Phòng 105', 1, 1, 200000, 0, 4, 3, 1, 5),
('T01P106', N'Không có mô tả', N'Phòng 106', 1, 0, 100000, 1, 6, 6, 1, 1),

('T02P201', N'Không có mô tả', N'Phòng 201', 1, 0, 50000, 0, 3, 2, 2, 1),
('T02P202', N'Không có mô tả', N'Phòng 202', 1, 1, 100000, 1, 5, 5, 2, 2),
('T02P203', N'Không có mô tả', N'Phòng 203', 0, 0, 150000, 0, 7, 6, 2, 3),
('T02P204', N'Không có mô tả', N'Phòng 204', 0, 1, 200000, 1, 7, 7, 2, 4),
('T02P205', N'Không có mô tả', N'Phòng 205', 0, 0, 300000, 1, 8, 8, 2, 5),
('T02P206', N'Không có mô tả', N'Phòng 206', 0, 1, 200000, 0, 1, 1, 2, 1),

('T03P301', N'Không có mô tả', N'Phòng 301', 0, 1, 120000, 1, 2, 2, 3, 1),
('T03P302', N'Không có mô tả', N'Phòng 302', 1, 1, 400000, 1, 2, 1, 3, 2),
('T03P303', N'Không có mô tả', N'Phòng 303', 0, 1, 120000, 1, 3, 3, 3, 3),
('T03P304', N'Không có mô tả', N'Phòng 304', 1, 1, 500000, 1, 4, 4, 3, 4),
('T03P305', N'Không có mô tả', N'Phòng 305', 0, 1, 350000, 1, 4, 3, 3, 5),
('T03P306', N'Không có mô tả', N'Phòng 306', 1, 0, 100000, 0, 1, 1, 3, 1),

('T04P401', N'Không có mô tả', N'Phòng 401', 0, 1, 100000, 1, 2, 1, 4, 1),
('T04P402', N'Không có mô tả', N'Phòng 402', 0, 1, 200000, 0, 3, 2, 4, 2),
('T04P403', N'Không có mô tả', N'Phòng 403', 0, 0, 300000, 1, 4, 3, 4, 3),
('T04P404', N'Không có mô tả', N'Phòng 404', 0, 1, 50000, 1, 4, 4, 4, 4),
('T04P405', N'Không có mô tả', N'Phòng 405', 0, 1, 120000, 0, 5, 5, 4, 5),
('T04P406', N'Không có mô tả', N'Phòng 406', 1, 1, 130000, 1, 6, 5, 4, 1),

('T05P501', N'Không có mô tả', N'Phòng 501', 0, 1, 300000, 1, 7, 7, 5, 1),
('T05P502', N'Không có mô tả', N'Phòng 502', 1, 0, 100000, 1, 1, 1, 5, 2),
('T05P503', N'Không có mô tả', N'Phòng 503', 1, 0, 40000, 1, 2, 1, 5, 3),
('T05P504', N'Không có mô tả', N'Phòng 504', 1, 1, 80000, 1, 3, 2, 5, 4),
('T05P505', N'Không có mô tả', N'Phòng 505', 1, 1, 90000, 0, 3, 3, 5, 5),
('T05P506', N'Không có mô tả', N'Phòng 506', 0, 1, 550000, 0, 4, 3, 5, 1);


Insert into hinh_anh_phong(ma_phong, hinh_anh_phong) values
('T01P101', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW8OHFXYiMye-iZhQxLQdgO7n-cd-2o-aGJGFizObT8Mc88FeMHmBmnQzjXY8sAa3MUHA&usqp=CAU'),
('T01P102', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HGGkFWqa2Agtm6WpOwAuz16NEGdMTzu1sbdWFr24aeuw7QdFuoj7gBULAGJFbnsFvLE&usqp=CAU'),
('T01P103', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfLuJaAVHCnjqnwPmgXAkH-pZENovp48ZQkZpukUmFUreQZGXAHvGR7RonA5PB3GALKY&usqp=CAU'),
('T01P104', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGXdqAs3mfIj_PPhQNf2rRius1dMeLXjPQ3vmstWiZI_n6s9gf-eS2sR2o129E8-_0Ss&usqp=CAU'),
('T01P105', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzxUYI9dohyejsl0Gqpp-IsZwo47BkzkUI_D-fULeyw60gGpZTbyV9rxT68nENQbiTAw&usqp=CAU'),
('T01P106', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4M190ig71cH8eQdGN8oqmQCHczvwiY1AncNe7vOjz3RhM21Mij1yB2wm0XtoMvfm3D9g&usqp=CAU'),

('T02P201', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5e6i3lL0icEYvIuViRu_TiAr1AMOBRlKe1wlZqikvqCHQLeABl4uPHvP1XeqZZEamUjI&usqp=CAU'),
('T02P202', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkDCnX5NVxV86DOGs3K1S9XrRJu29x4TcDE4oI5-LFW-qBgCKROm4_flPxdOQw5YC3ek&usqp=CAU'),
('T02P203', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7svCPEzFZWJ72O5dw8B67zvI69Xx6WEY2Ojl2wSYvOM56V9t3PiPEfighSaPN9k4J9Yg&usqp=CAU'),
('T02P204', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWPnCuL3QmvmXUTw5EwZMR-uFWDZf8LuilHwPIjouKvpin44zCgGoMMwi_80yJU4p3iJw&usqp=CAU'),
('T02P205', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRp_xBq796b_0j772v_3TwQpFqYuzze7n5_yBhTnjMHEV3VNDnIRGZmfh_HTRnskZY_8&usqp=CAU'),
('T02P206', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxxTNHft_VuE5Dlom23EA-mNi32jB--sC7Ag&usqp=CAU'),

('T03P301', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28zj14-yTsc98U9rpoptPCYIUdingXLjgLA&usqp=CAU'),
('T03P302', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCt1y9SJOtR_Q0mGkodlXprmApW4I7ZayOA&usqp=CAU'),
('T03P303', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5x2r0lNLmf0CXpCTfK6QiJClHl_nxEDFag&usqp=CAU'),
('T03P304', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAHQVkBwebZ9WVqBMtqNgAg4nJ_dmju1COg&usqp=CAU'),
('T03P305', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ3a_HpPqY0w_kKpWhNSQm58xS_KWDyLyAVA&usqp=CAU'),
('T03P306', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvH9GcR3soVPIwuduPdJj-1jNM4belfrhykg&usqp=CAU'),

('T04P401', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHnKkgP-7Qn1HViior82LsOkoQQVLQy0OTA&usqp=CAU'),
('T04P402', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEh5IVwqerHVVYHx4BeiMv3dLxDNEOcrEMvQ&usqp=CAU'),
('T04P403', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_rg9bj0tWA16z94VmbQB1B2yswBfVVzomg&usqp=CAU'),
('T04P404', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdXvw3Ue6roTx78S4lPRxCjzC3fRXVZb8Gw&usqp=CAU'),
('T04P405', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPh3-7SVe2op3GufdEate5f5yPvdR2J3_Hog&usqp=CAU'),
('T04P406', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJG--0PmjRMIgT3JPzAiqIQjx_YqxDoHyElA&usqp=CAU'),

('T05P501', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcuwt434v5yZGlSWkUczLXNT4uecq3JYrM2A&usqp=CAU'),
('T05P502', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDOQg-v1Rt6c1FkNf0upzFq8KBsQ8BVOUuw&usqp=CAU'),
('T05P503', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAQuSW8Ti-RDYzt2eqv1LXV2Bm4UPx5tzbg&usqp=CAU'),
('T05P504', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3xQ3tTwlI_RBrytr5hfdqkGPcZVpF7UgJg&usqp=CAU'),
('T05P505', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx3Ywwxh17JOEIBcVjuOyYP5V7HWFGQ7pwrA&usqp=CAU'),
('T05P506', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6z03IpAuO5DSxn-2o-AxG7x2MRA4ShOPNA&usqp=CAU'),

('T01P101', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpt2-sXqe-aizMYMTXh4hCAgDOAxZ14lLNw&usqp=CAU'),
('T01P102', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDq7PEWI-Cp9kX9Q34rPIjI3FRnMnJp0BSVw&usqp=CAU'),
('T01P103', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1YZ_Sh70ojPOY4ZDEyW1KH0PDSEKJdoJLA&usqp=CAU'),
('T01P104', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvN_JWB0OHftMF31FBdW2aA1QNI6EEfR0Jsw&usqp=CAU'),
('T01P105', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJymAoO4KEm2r48Si5rCh4A8NvnprFlXtueA&usqp=CAU'),
('T01P106', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRihae9luY91rTcK756i7dW_KFnHPgdNY-ryw&usqp=CAU'),

('T02P201', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntjP-sEJNdX0jaQ8yOZEJS1eF0K0HYVYDMQ&usqp=CAU'),
('T02P202', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ67SirOlvby8EUk_7PrE353ymxBwT9LXrlKw&usqp=CAU'),
('T02P203', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Ndqryux2SizdvrKX3pl38y7iDf5UlFtsjw&usqp=CAU'),
('T02P204', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3Y708vap2CeA-iV3x9N0rTCzySf281RROA&usqp=CAU'),
('T02P205', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTBWOREq5vmINCNu1_BRh32en_z3i1DK_ww&usqp=CAU'),
('T02P206', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Ot7w75oqSdZ7mB8ViqmCd79tOB2C_53_XA&usqp=CAU'),

('T03P301', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyfDnv5V883tleWEQUEwoY8N3i7QduFDxyA&usqp=CAU'),
('T03P302', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBf0c3CMiEKqDjMPLheDHB54mkTZMAbxTf6w&usqp=CAU'),
('T03P303', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92mp0Boq3VcBxnqMePcAyPIPeW-c8ADj-bQ&usqp=CAU'),
('T03P304', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch8N3VsO_-qxvjX7nWhZr3GjT65CSpFFGaQ&usqp=CAU'),
('T03P305', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47nSfV_Evz3zyhq8KQacGf_FwmRXekieA3Q&usqp=CAU'),
('T03P306', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbJ3uFxqmndQ9_U8wlOo0sv0MqujDNuBSZg&usqp=CAU'),

('T04P401', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgUCEHhD9ClbUX0D7iRk8ilaYJStZx5RhSQ&usqp=CAU'),
('T04P402', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzJvHeMceErxkC-pg-oRqBMk5uZHIaLEV1w&usqp=CAU'),
('T04P403', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgo7f-lyNTgF-b_PhBoFIJveugv7uThZEezA&usqp=CAU'),
('T04P404', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqMKPHUs_sSK5wsL_kxY5SmXKWM9s1PnBdw&usqp=CAU'),
('T04P405', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9IAbM6eMznj5udZfj2ymZODAFpOXkurBDg&usqp=CAU'),
('T04P406', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGZi2RSkbK7ABgCYVa4j05b71YQchL6r9Yw&usqp=CAU'),

('T05P501', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8TGu-S1gKqN8DIk87jE8V-V4B2e2stU1Jw&usqp=CAU'),
('T05P502', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMfDcODJ3LHPawvuPTuI688A0Yue_mopFtvA&usqp=CAU'),
('T05P503', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT88jBoK56h3c_wqanusF5z5yQ1TCMYPjp6RA&usqp=CAU'),
('T05P504', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCtOk7iOLyRGqPVjqvEgYOzhFQOuc2LwQzqA&usqp=CAU'),
('T05P505', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHyr1qEVwjci-odxRRSKeluS7oGKLd4rikw&usqp=CAU'),
('T05P506', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gSljIcniHWOYEqZhcxCebSX5iN80B7Hl7g&usqp=CAU');

/*
Insert into khach_hang(ma_khach_hang, cccd_khach_hang, dia_chi_kh, email_kh, ho_ten, so_dien_thoai_kh) values 
(1, '123456789000', N'12 Lê Lợi', 'test@gmail.com', N'Trần Quang Linh', '0123456789');

Insert into phieu_dat_phong(ma_phieu_dat_phong, ghi_chu_dat_phong, giam_gia, ngay_dat_phong, ngay_nhan_phong, ngay_tra_phong, trang_thai_dat_phong, ma_khach_hang) values
(1, N'không có', 0, '2022-12-17', '2023-01-19', '2023-01-21', 'HOAN_TAT', 1);



Insert into chi_tiet_phieu_dat_phong(ma_phieu_dat_phong, ma_phong) values 
(1, 1),
(1, 2),
(1, 3);

*/



