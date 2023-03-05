package com.example.hotelserver.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "phieu_dat_phong")
public class PhieuDatPhong {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_phieu_dat_phong")
	private long maPhieuDatPhong;
	
	@Column(name = "ngay_dat_phong")
	private Date ngayDatPhong;
	
	@Column(name = "giam_gia")
	private double giamGia;
	
	@Column(name = "ghi_chu_dat_phong", columnDefinition = "nvarchar(255)")
	private String ghiChuDatPhong;
	
	@Column(name = "ngay_nhan_phong")
	private Date ngayNhanPhong;
	
	@Column(name = "ngay_tra_phong")
	private Date ngayTraPhong;
	
	@Column(name = "da_nhan_phong")
	private boolean daNhanPhong;
	
	@Column(name = "tong_tien")
	private double tongTien;
	
	@Enumerated(EnumType.STRING)
	private TrangThaiDatPhong trangThaiDatPhong;
	
	@ManyToMany
	private List<Phong> phong;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "ma_khach_hang")
	private KhachHang khachHang;
}
