package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.LoaiPhong;

@Repository
public interface LoaiPhongRepo extends JpaRepository<LoaiPhong, Long>{
}
