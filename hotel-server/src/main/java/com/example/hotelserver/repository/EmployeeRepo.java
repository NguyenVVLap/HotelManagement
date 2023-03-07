package com.example.hotelserver.repository;

import com.example.hotelserver.entity.Phong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.NhanVien;

import java.util.List;

@Repository
public interface EmployeeRepo extends JpaRepository<NhanVien, Long>{
    @Query(nativeQuery = true, value = ("select * from nhan_vien "))
    List<NhanVien> getAllNhanVien();
}
