package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.PhieuDatPhong;

@Repository
public interface BookingRepo extends JpaRepository<PhieuDatPhong, Long>{

}
