package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hotelserver.entity.KhachHang;

public interface GuestRepo extends JpaRepository<KhachHang, Long> {
	KhachHang findByCccdKhachHang(String cccdKhachHang);
	KhachHang findBySoDienThoaiKH(String soDienThoaiKH);
}
