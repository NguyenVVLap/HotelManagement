package com.example.hotelserver.repository;

import com.example.hotelserver.entity.DichVu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepo extends JpaRepository<DichVu, Long> {
    @Query(nativeQuery = true, value = ("select * from dich_vu "))
    List<DichVu>layAllDanhSachDichVu();
}
