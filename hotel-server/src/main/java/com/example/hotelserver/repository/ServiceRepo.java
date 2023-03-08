package com.example.hotelserver.repository;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.entity.ThietBi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepo extends JpaRepository<DichVu, Long> {
    @Query(nativeQuery = true, value = ("select * from dich_vu "))
    List<DichVu>layAllDanhSachDichVu();
    @Query(nativeQuery = true,value = "select * from dich_vu dv where dv.ten_dich_vu= :tenDichVu and dv.gia_dich_vu= :giaDichVu")
    ThietBi findByTenAndGiaDichVu(@Param("tenDichVu") String tenDichVu ,@Param("giaDichVu") double giaDichVu);
    @Query(nativeQuery = true, value = "select * from dich_vu dv where dv.ten_dich_vu like %:tenDichVu%")
    List<DichVu> findByTenDichVuLike(@Param("tenDichVu") String tenDichVu);
}
