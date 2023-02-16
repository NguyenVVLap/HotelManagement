package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.RoomType;

@Repository
public interface RoomTypeRepo extends JpaRepository<RoomType, Long>{
}
