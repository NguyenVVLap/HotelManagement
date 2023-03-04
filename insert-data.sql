use hotel

select * from rooms where room_name='Phòng 105';
select * from room_type where room_type_id=5

delete from users
delete from guests
delete from roles

delete from room_image_url;
delete from room_equipment;
delete from equipments;
delete from damages;
delete from rooms;
delete from floors;
delete from room_type;
delete from hotels;

select * from users


Insert into loai_phong(ma_loai_phong, duoc_hut_thuoc, gia_loai_phong,mang_thu_cung, so_giuong,suc_chua, ten_loai_phong) values
(1, 1, 1100000, 1, 1,1, 'Single Room'),
(2, 1, 1100000, 1, 2,2,'Double Room'),
(3, 1, 3100000, 1, 3,3, 'Triple Room'),
(4, 1, 2100000, 1, 4,4, 'Quad Room'),
(5, 1, 2100000, 1, 5,5, 'Twin Room');

Insert into khach_san(ma_khach_san,dia_chi_ks, email_khach_san, so_dien_thoai_ks, so_sao, ten_khach_san) values
(1, N'12 Trần Hưng Đạo', 'hotel@gmail.com','0123456789', 2 ,'Blue Sky Hotel' );

Insert into tang(ma_tang, ten_tang) values
(1, N'Tầng 1'),
(2, N'Tầng 2'),
(3, N'Tầng 3'),
(4, N'Tầng 4'),
(5, N'Tầng 5');

Insert into phong(ma_phong, mo_ta_phong, ten_phong, trang_thai_phong, ma_tang, ma_khach_san, ma_loai_phong) values
(1, N'Không có mô tả', N'Phòng 101', 1, 1, 1, 1),
(2, N'Không có mô tả', N'Phòng 102', 1, 1, 1, 2),
(3, N'Không có mô tả', N'Phòng 103', 0, 1, 1, 3),
(4, N'Không có mô tả', N'Phòng 104', 0, 1, 1, 4),
(5, N'Không có mô tả', N'Phòng 105', 1, 1, 1, 5),
(6, N'Không có mô tả', N'Phòng 106', 1, 1, 1, 1),

(7, N'Không có mô tả', N'Phòng 201', 1, 2, 1, 1),
(8, N'Không có mô tả', N'Phòng 202', 1, 2, 1, 2),
(9, N'Không có mô tả', N'Phòng 203', 0, 2, 1, 3),
(10, N'Không có mô tả', N'Phòng 204', 0, 2, 1, 4),
(11, N'Không có mô tả', N'Phòng 205', 0, 2, 1, 5),
(12, N'Không có mô tả', N'Phòng 206', 0, 2, 1, 1),

(13, N'Không có mô tả', N'Phòng 301', 0, 3, 1, 1),
(14, N'Không có mô tả', N'Phòng 302', 1, 3, 1, 2),
(15, N'Không có mô tả', N'Phòng 303', 0, 3, 1, 3),
(16, N'Không có mô tả', N'Phòng 304', 1, 3, 1, 4),
(17, N'Không có mô tả', N'Phòng 305', 0, 3, 1, 5),
(18, N'Không có mô tả', N'Phòng 306', 1, 3, 1, 1),

(19, N'Không có mô tả', N'Phòng 401', 0, 4, 1, 1),
(20, N'Không có mô tả', N'Phòng 402', 0, 4, 1, 2),
(21, N'Không có mô tả', N'Phòng 403', 0, 4, 1, 3),
(22, N'Không có mô tả', N'Phòng 404', 0, 4, 1, 4),
(23, N'Không có mô tả', N'Phòng 405', 0, 4, 1, 5),
(24, N'Không có mô tả', N'Phòng 406', 1, 4, 1, 1),

(25, N'Không có mô tả', N'Phòng 501', 0, 5, 1, 1),
(26, N'Không có mô tả', N'Phòng 502', 1, 5, 1, 2),
(27, N'Không có mô tả', N'Phòng 503', 1, 5, 1, 3),
(28, N'Không có mô tả', N'Phòng 504', 1, 5, 1, 4),
(29, N'Không có mô tả', N'Phòng 505', 1, 5, 1, 5),
(30, N'Không có mô tả', N'Phòng 506', 0, 5, 1, 1);


Insert into hinh_anh_phong(ma_phong, hinh_anh_phong) values
(1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW8OHFXYiMye-iZhQxLQdgO7n-cd-2o-aGJGFizObT8Mc88FeMHmBmnQzjXY8sAa3MUHA&usqp=CAU'),
(2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HGGkFWqa2Agtm6WpOwAuz16NEGdMTzu1sbdWFr24aeuw7QdFuoj7gBULAGJFbnsFvLE&usqp=CAU'),
(3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfLuJaAVHCnjqnwPmgXAkH-pZENovp48ZQkZpukUmFUreQZGXAHvGR7RonA5PB3GALKY&usqp=CAU'),
(4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGXdqAs3mfIj_PPhQNf2rRius1dMeLXjPQ3vmstWiZI_n6s9gf-eS2sR2o129E8-_0Ss&usqp=CAU'),
(5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzxUYI9dohyejsl0Gqpp-IsZwo47BkzkUI_D-fULeyw60gGpZTbyV9rxT68nENQbiTAw&usqp=CAU'),
(6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4M190ig71cH8eQdGN8oqmQCHczvwiY1AncNe7vOjz3RhM21Mij1yB2wm0XtoMvfm3D9g&usqp=CAU'),

(7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5e6i3lL0icEYvIuViRu_TiAr1AMOBRlKe1wlZqikvqCHQLeABl4uPHvP1XeqZZEamUjI&usqp=CAU'),
(8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkDCnX5NVxV86DOGs3K1S9XrRJu29x4TcDE4oI5-LFW-qBgCKROm4_flPxdOQw5YC3ek&usqp=CAU'),
(9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7svCPEzFZWJ72O5dw8B67zvI69Xx6WEY2Ojl2wSYvOM56V9t3PiPEfighSaPN9k4J9Yg&usqp=CAU'),
(10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWPnCuL3QmvmXUTw5EwZMR-uFWDZf8LuilHwPIjouKvpin44zCgGoMMwi_80yJU4p3iJw&usqp=CAU'),
(11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRp_xBq796b_0j772v_3TwQpFqYuzze7n5_yBhTnjMHEV3VNDnIRGZmfh_HTRnskZY_8&usqp=CAU'),
(12, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxxTNHft_VuE5Dlom23EA-mNi32jB--sC7Ag&usqp=CAU'),

(13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28zj14-yTsc98U9rpoptPCYIUdingXLjgLA&usqp=CAU'),
(14, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCt1y9SJOtR_Q0mGkodlXprmApW4I7ZayOA&usqp=CAU'),
(15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5x2r0lNLmf0CXpCTfK6QiJClHl_nxEDFag&usqp=CAU'),
(16, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAHQVkBwebZ9WVqBMtqNgAg4nJ_dmju1COg&usqp=CAU'),
(17, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ3a_HpPqY0w_kKpWhNSQm58xS_KWDyLyAVA&usqp=CAU'),
(18, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvH9GcR3soVPIwuduPdJj-1jNM4belfrhykg&usqp=CAU'),

(19, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHnKkgP-7Qn1HViior82LsOkoQQVLQy0OTA&usqp=CAU'),
(20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEh5IVwqerHVVYHx4BeiMv3dLxDNEOcrEMvQ&usqp=CAU'),
(21, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_rg9bj0tWA16z94VmbQB1B2yswBfVVzomg&usqp=CAU'),
(22, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdXvw3Ue6roTx78S4lPRxCjzC3fRXVZb8Gw&usqp=CAU'),
(23, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPh3-7SVe2op3GufdEate5f5yPvdR2J3_Hog&usqp=CAU'),
(24, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJG--0PmjRMIgT3JPzAiqIQjx_YqxDoHyElA&usqp=CAU'),

(25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcuwt434v5yZGlSWkUczLXNT4uecq3JYrM2A&usqp=CAU'),
(26, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDOQg-v1Rt6c1FkNf0upzFq8KBsQ8BVOUuw&usqp=CAU'),
(27, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAQuSW8Ti-RDYzt2eqv1LXV2Bm4UPx5tzbg&usqp=CAU'),
(28, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3xQ3tTwlI_RBrytr5hfdqkGPcZVpF7UgJg&usqp=CAU'),
(29, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx3Ywwxh17JOEIBcVjuOyYP5V7HWFGQ7pwrA&usqp=CAU'),
(30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6z03IpAuO5DSxn-2o-AxG7x2MRA4ShOPNA&usqp=CAU'),

(1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpt2-sXqe-aizMYMTXh4hCAgDOAxZ14lLNw&usqp=CAU'),
(2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDq7PEWI-Cp9kX9Q34rPIjI3FRnMnJp0BSVw&usqp=CAU'),
(3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1YZ_Sh70ojPOY4ZDEyW1KH0PDSEKJdoJLA&usqp=CAU'),
(4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvN_JWB0OHftMF31FBdW2aA1QNI6EEfR0Jsw&usqp=CAU'),
(5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJymAoO4KEm2r48Si5rCh4A8NvnprFlXtueA&usqp=CAU'),
(6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRihae9luY91rTcK756i7dW_KFnHPgdNY-ryw&usqp=CAU'),

(7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntjP-sEJNdX0jaQ8yOZEJS1eF0K0HYVYDMQ&usqp=CAU'),
(8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ67SirOlvby8EUk_7PrE353ymxBwT9LXrlKw&usqp=CAU'),
(9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Ndqryux2SizdvrKX3pl38y7iDf5UlFtsjw&usqp=CAU'),
(10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3Y708vap2CeA-iV3x9N0rTCzySf281RROA&usqp=CAU'),
(11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTBWOREq5vmINCNu1_BRh32en_z3i1DK_ww&usqp=CAU'),
(12, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Ot7w75oqSdZ7mB8ViqmCd79tOB2C_53_XA&usqp=CAU'),

(13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyfDnv5V883tleWEQUEwoY8N3i7QduFDxyA&usqp=CAU'),
(14, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBf0c3CMiEKqDjMPLheDHB54mkTZMAbxTf6w&usqp=CAU'),
(15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92mp0Boq3VcBxnqMePcAyPIPeW-c8ADj-bQ&usqp=CAU'),
(16, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch8N3VsO_-qxvjX7nWhZr3GjT65CSpFFGaQ&usqp=CAU'),
(17, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47nSfV_Evz3zyhq8KQacGf_FwmRXekieA3Q&usqp=CAU'),
(18, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbJ3uFxqmndQ9_U8wlOo0sv0MqujDNuBSZg&usqp=CAU'),

(19, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgUCEHhD9ClbUX0D7iRk8ilaYJStZx5RhSQ&usqp=CAU'),
(20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzzJvHeMceErxkC-pg-oRqBMk5uZHIaLEV1w&usqp=CAU'),
(21, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgo7f-lyNTgF-b_PhBoFIJveugv7uThZEezA&usqp=CAU'),
(22, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqMKPHUs_sSK5wsL_kxY5SmXKWM9s1PnBdw&usqp=CAU'),
(23, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9IAbM6eMznj5udZfj2ymZODAFpOXkurBDg&usqp=CAU'),
(24, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGZi2RSkbK7ABgCYVa4j05b71YQchL6r9Yw&usqp=CAU'),

(25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8TGu-S1gKqN8DIk87jE8V-V4B2e2stU1Jw&usqp=CAU'),
(26, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMfDcODJ3LHPawvuPTuI688A0Yue_mopFtvA&usqp=CAU'),
(27, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT88jBoK56h3c_wqanusF5z5yQ1TCMYPjp6RA&usqp=CAU'),
(28, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCtOk7iOLyRGqPVjqvEgYOzhFQOuc2LwQzqA&usqp=CAU'),
(29, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHyr1qEVwjci-odxRRSKeluS7oGKLd4rikw&usqp=CAU'),
(30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-gSljIcniHWOYEqZhcxCebSX5iN80B7Hl7g&usqp=CAU');


Insert into thiet_bi(ma_thiet_bi, ten_thiet_bi,gia_thiet_bi) values
(1, N'Tivi', 10000000),
(2, N'Remote TV', 50000),
(3, N'Tủ lạnh', 25000000),
(4, N'Máy lạnh', 20000000),
(5, N'Remote Máy lạnh', 100000),
(6, N'Bàn trang điểm', 5000000);


Insert into phong_thiet_bi(ma_thiet_bi, so_luong, ma_phong) values
(1, 1, 1), 
(2, 1, 1),
(3, 1, 1),
(4, 1, 1),
(5, 1, 1),
(6, 1, 1);

