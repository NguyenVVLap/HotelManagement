use khachsan

select * from phong

select * from tai_khoan
select * from nhan_vien

select * from khach_hang

select * from phieu_dat_phong
select * from chi_tiet_phieu_dat_phong

select * from hoa_don
select * from chi_tiet_hoa_don 

select ma_phieu_dat_phong from phieu_dat_phong pdp where 
pdp.ngay_nhan_phong between '2023-03-19' and '2023-03-20'
or pdp.ngay_tra_phong between '2023-03-19' and '2023-03-20'

select * from phong p inner join chi_tiet_phieu_dat_phong ctpdp 
on p.ma_phong = ctpdp.ma_phong 
where ctpdp.ma_phieu_dat_phong = 52

select * from phieu_dat_phong pdb inner join khach_hang kh on pdb.ma_khach_hang=kh.ma_khach_hang where kh.cccd_khach_hang = '012345678900'
select * from phieu_dat_phong where trang_thai_dat_phong = 'MOI_DAT' and ma_khach_hang = '2' order by ngay_nhan_phong

select p.ma_phong, mo_ta_phong, ten_phong, trang_thai_phong, mang_thu_cung, gia_phong, duoc_hut_thuoc, ma_tang, ma_loai_phong 
from phong p inner join chi_tiet_phieu_dat_phong ctpdp on p.ma_phong = ctpdp.ma_phong 
where ctpdp.ma_phieu_dat_phong = 102 or ctpdp.ma_phieu_dat_phong = 103;
