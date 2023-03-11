package com.example.hotelserver.service;

import java.util.List;
import java.util.Map;

import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.entity.PhongThietBi;

public interface PhongService {
	List<Map<String, Object>> layTatCaPhongSapXepTheoTrangThai();
	List<Map<String, Object>> layTatCaPhong();
	boolean kiemTraPhongTonTaiTheoTen(String tenPhong);
	boolean themPhong(Phong phong, List<PhongThietBi> dsPhongThietBi);
}
