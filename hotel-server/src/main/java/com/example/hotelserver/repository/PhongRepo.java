package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.Phong;

@Repository
public interface PhongRepo extends JpaRepository<Phong, Long>{
	@Query(nativeQuery = true, value = ("select * from phong order by trang_thai_phong desc;"))
	List<Phong> getRoomsOrderByState();
}
