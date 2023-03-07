package com.example.hotelserver.service;

import com.example.hotelserver.entity.NhanVien;

public interface NhanVienService {
	NhanVien findBySoDienThoai(String soDienThoai);
	NhanVien findByCccd(String cccd);
	
}
