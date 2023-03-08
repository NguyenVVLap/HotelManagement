package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.ThietBi;

@Repository
public interface ThietBiRepo extends JpaRepository<ThietBi, Long> {
	@Query(nativeQuery = true, value = "select * from thiet_bi tb where tb.ten_thiet_bi=:tenThietBi and tb.gia_thiet_bi=:giaThietBi")
	ThietBi findByTenAndGiaThietBi(@Param("tenThietBi") String tenThietBi, @Param("giaThietBi") double giaThietBi);
	
	@Query(nativeQuery = true, value = "select * from thiet_bi tb where tb.ten_thiet_bi like %:tenThietBi%")
	List<ThietBi> findByTenThietBiLike(@Param("tenThietBi") String tenThietBi);
}
