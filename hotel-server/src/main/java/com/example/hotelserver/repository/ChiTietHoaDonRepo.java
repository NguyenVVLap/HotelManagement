package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.ChiTietHoaDon;
import com.example.hotelserver.entity.ChiTietHoaDonPK;

@Repository
public interface ChiTietHoaDonRepo extends JpaRepository<ChiTietHoaDon, ChiTietHoaDonPK> {
	
}
