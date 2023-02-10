package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hotelserver.entity.Role;



public interface RoleRepo extends JpaRepository<Role, Long> {
	Role findByName(String name);
}
