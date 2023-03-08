package com.example.hotelserver.repository;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.entity.ThietBi;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hotelserver.entity.KhachHang;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KhachHangRepo extends JpaRepository<KhachHang, Integer> {
	KhachHang findByCccdKhachHang(String cccdKhachHang);
	KhachHang findBySoDienThoaiKH(String soDienThoaiKH);
	@Query(nativeQuery = true, value = ("select * from khach_hang "))
	List<KhachHang> layAllDanhSachKhachHang();
	@Query(nativeQuery = true, value = "select * from khach_hang kh where kh.cccd_khach_hang= :cccdKhachHang AND kh.so_dien_thoai_kh= :soDienThoaiKH")
	KhachHang timKhachHangBangCCCDVaSoDienThoai(@Param("cccdKhachHang") String cccdKhachHang, @Param("soDienThoaiKH") String soDienThoaiKH);
	@Query(nativeQuery = true, value = "select * from khach_hang kh where kh.ho_ten like %:ho_ten%")
	List<DichVu> findByTenKhachHang(@Param("ho_ten") String ho_ten);
}
