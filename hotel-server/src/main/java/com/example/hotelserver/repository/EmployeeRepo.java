package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.NhanVien;

@Repository
public interface EmployeeRepo extends JpaRepository<NhanVien, Long>{

}
