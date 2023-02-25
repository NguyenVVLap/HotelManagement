package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.ChiTietDichVu;
import com.example.hotelserver.entity.ChiTietDichVuPK;

@Repository
public interface BookingProductRepo extends JpaRepository<ChiTietDichVu, ChiTietDichVuPK> {
	
}
