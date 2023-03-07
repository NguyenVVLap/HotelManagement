package com.example.hotelserver.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Builder
@Table(name = "nhan_vien")
public class NhanVien {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_nhan_vien")
	private long maNhanVien;
	
	@Column(name = "ho_ten", columnDefinition = "nvarchar(255)")
	private String hoTen;
	
	@Column(name = "dia_chi", columnDefinition = "nvarchar(255)")
	private String diaChi;
	
	@Column(name = "email", columnDefinition = "nvarchar(255)")
	private String email;

	@Column(name = "so_dien_thoai", columnDefinition = "nvarchar(255)")
	private String soDienThoai;
	
	private String cccd;
	
	@Column(name = "ngay_sinh")
	private Date ngaySinh;
	
	@Column(name = "luong_co_Ban")
	private double luongCoBan;
	
	@Column(name = "ngay_vao_lam")
	private Date ngayVaoLam;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ma_tai_khoan")
	private TaiKhoan taiKhoan;
}
