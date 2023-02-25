package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@IdClass(ChiTietDichVuPK.class)
@Table(name = "phieu_dich_vu")
public class ChiTietDichVu {
	@Id
	@ManyToOne
	@JoinColumn(name="ma_phieu_dat_phong")
	private PhieuDatPhong phieuDatPhong;
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="ma_dich_vu")
	private DichVu dichVu;
	
	@Column(name = "so_luong")
	private int soLuong;
	
	@Column(name = "tong_tien_dich_vu")
	private double tongTienDichVu;
	
	
}
