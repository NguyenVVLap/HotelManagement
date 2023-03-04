package com.example.hotelserver.entity;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
	
	@Column(name = "tong_tien")
	private double tongTien;
	
	@Column(name = "tien_nha")
	private double tienNhan;
	
	@Column(name = "tien_thoi")
	private double tienThoi;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ma_phieu_dat_phong")
	private PhieuDatPhong phieuDatPhong;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "ma_nhan_vien")
	private NhanVien nhanVien;
}
