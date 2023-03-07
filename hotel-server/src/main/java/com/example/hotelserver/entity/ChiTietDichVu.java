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
@Table(name = "chi_tiet_dich_vu")
public class ChiTietDichVu {
	@Id
	@ManyToOne
	@JoinColumn(name="ma_hoa_don")
	private HoaDon hoaDon;
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="ma_dich_vu")
	private DichVu dichVu;
	
	@Column(name = "so_luong")
	private int soLuong;
	
	
}
