package com.example.hotelserver.service;

import java.util.List;
import java.util.Map;

import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.entity.PhongThietBi;

public interface PhongService {
	List<Map<String, Object>> layTatCaPhongSapXepTheoTrangThai();
	List<Map<String, Object>> layTatCaPhong();
	boolean kiemTraPhongTonTaiTheoTen(String tenPhong);
	List<Map<String, Object>> timPhongTheoTenLike(String tenPhong);
	List<Map<String, Object>> timPhongTheoMa(long maPhong);
	boolean themPhong(Phong phong, List<PhongThietBi> dsPhongThietBi);
	List<Map<String, Object>> timPhongTheoMaTang(int maTang);
	List<Map<String, Object>> timPhongTheoMaLoaiPhong(long maLoaiPhong);
}
