package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.NhanVien;

@Repository
public interface NhanVienRepo extends JpaRepository<NhanVien, Long>{
	NhanVien findBySoDienThoai(String soDienThoai);
	NhanVien findByCccd(String cccd);
	
}
