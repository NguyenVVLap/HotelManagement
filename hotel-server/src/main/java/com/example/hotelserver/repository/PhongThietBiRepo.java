package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.PhongThietBi;
import com.example.hotelserver.entity.PhongThietBiPK;

@Repository
public interface PhongThietBiRepo extends JpaRepository<PhongThietBi, PhongThietBiPK>{
	@Query(nativeQuery = true, value = "select * from phong_thiet_bi ptb where ptb.ma_phong = :maPhong")
	List<PhongThietBi> findByMaPhong(@Param("maPhong") Long maPhong);
}
