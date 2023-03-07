package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.NhanVien;

@Repository
public interface NhanVienRepo extends JpaRepository<NhanVien, Long>{
	NhanVien findBySoDienThoai(String soDienThoai);
	NhanVien findByCccd(String cccd);
	
	@Query(nativeQuery = true, value = ("select * from nhan_vien "))
    List<NhanVien> getAllNhanVien();
}
