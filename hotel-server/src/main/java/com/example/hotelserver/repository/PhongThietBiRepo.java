package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.PhongThietBi;
import com.example.hotelserver.entity.PhongThietBiPK;

@Repository
public interface PhongThietBiRepo extends JpaRepository<PhongThietBi, PhongThietBiPK>{

}
