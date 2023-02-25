package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hotelserver.entity.VaiTro;



public interface RoleRepo extends JpaRepository<VaiTro, Long> {
	VaiTro findByTenVaiTro(String tenVaiTro);
}
