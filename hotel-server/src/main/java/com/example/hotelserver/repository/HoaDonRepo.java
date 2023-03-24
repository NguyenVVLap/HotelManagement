package com.example.hotelserver.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.HoaDon;

import jakarta.transaction.Transactional;

@Repository
public interface HoaDonRepo extends JpaRepository<HoaDon, Long>{
	@Query(nativeQuery = true, value = "select p.ma_phong "
			+ "from phong p inner join chi_tiet_hoa_don cthd "
			+ "on p.ma_phong = cthd.ma_phong "
			+ "where cthd.ma_hoa_don = :maHoaDon")
	List<String> layMaPhongTuMaHoaDon(@Param("maHoaDon") long maHoaDon);
	
	@Query(nativeQuery = true, value = "select ctdv.ma_dich_vu as maDichVu"
			+ ", dv.ten_dich_vu as tenDichVu, dv.gia_dich_vu as giaDichVu, ctdv.so_luong as soLuong "
			+ "from chi_tiet_dich_vu ctdv "
			+ "inner join dich_vu dv "
			+ "on ctdv.ma_dich_vu = dv.ma_dich_vu where ctdv.ma_hoa_don= :maHoaDon")
	List<Map<String, Object>> layChiTietDichVuTuMaHoaDon(@Param("maHoaDon") long maHoaDon);
	
	@Query(nativeQuery = true, value = "select * from hoa_don "
			+ "where tien_nhan = 0 "
			+ "order by ngay_tra_phong DESC")
	List<HoaDon> layHoaDonChuaThanhToanSapXepTheoNgay();
	
	@Query(nativeQuery = true, value = "select * from hoa_don "
			+ "where ma_khach_hang = :maKhachHang and tien_nhan = 0"
			+ "order by ngay_tra_phong DESC")
	List<HoaDon> layHoaDonTheoKhachSapXepTheoNgay(@Param("maKhachHang") int maKhachHang);
	
	@Modifying
    @Transactional
	@Query(nativeQuery = true, value = "update chi_tiet_dich_vu set so_luong = :soLuong  "
			+ "where ma_dich_vu = :maDichVu and "
			+ "ma_hoa_don = :maHoaDon")
    void updateSoLuongChiTietDichVu(@Param("maDichVu") long maDichVu
    		, @Param("maHoaDon") long maHoaDon
    		, @Param("soLuong") int soLuong);
}
