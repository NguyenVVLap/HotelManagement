package com.example.hotelserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.HoaDon;

@Repository
public interface HoaDonRepo extends JpaRepository<HoaDon, Long>{
	@Query(nativeQuery = true, value = "select p.ma_phong "
			+ "from phong p inner join chi_tiet_hoa_don cthd "
			+ "on p.ma_phong = cthd.ma_phong "
			+ "where cthd.ma_hoa_don = :maHoaDon")
	List<Long> layMaPhongTuMaHoaDon(@Param("maHoaDon") long maHoaDon);
	
	@Query(nativeQuery = true, value = "select * from hoa_don "
			+ "where tien_nhan = 0 "
			+ "order by ngay_tra_phong DESC")
	List<HoaDon> layHoaDonChuaThanhToanSapXepTheoNgay();
	
	@Query(nativeQuery = true, value = "select * from hoa_don "
			+ "where ma_khach_hang = :maKhachHang and tien_nhan = 0"
			+ "order by ngay_tra_phong DESC")
	List<HoaDon> layHoaDonTheoKhachSapXepTheoNgay(@Param("maKhachHang") int maKhachHang);
}
