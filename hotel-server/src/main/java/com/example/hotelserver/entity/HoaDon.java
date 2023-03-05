package com.example.hotelserver.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "hoa_don")
public class HoaDon {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_hoa_don")
	private long maHoaDon;
	
	@Column(name = "ngay_lap")
	private Date ngayLap;
	
	@Column(name = "ngay_nhan_phong")
	private Date ngayNhanPhong;
	
	@Column(name = "ngay_tra_phong")
	private Date ngayTraPhong;
	
	@Column(name = "tong_tien")
	private double tongTien;
	
	@Column(name = "tien_nhan")
	private double tienNhan;
	
	@Column(name = "tien_thoi")
	private double tienThoi;
	
	@OneToMany(mappedBy = "hoaDon")
	private List<ChiTietDichVu> dsChiTietHoaDon;
	
	@OneToMany(mappedBy = "hoaDon")
	private List<ChiTietDichVu> dsChiTietDichVu;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "ma_khach_hang")
	private KhachHang khachHang;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "ma_nhan_vien")
	private NhanVien nhanVien;
}
