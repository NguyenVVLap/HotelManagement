package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.Tang;

@Repository
public interface FloorRepo extends JpaRepository<Tang, Integer>{ 

}
