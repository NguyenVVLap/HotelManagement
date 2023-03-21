package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Builder
@Table(name = "loai_dich_vu")
public class LoaiDichVu {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_loai_dich_vu")
	private int maLoaiDichVu;
	
	@Column(name = "ten_loai_dich_vu")	
	private String tenLoaiDichVu;
	
	@Column(name = "don_vi_loai_dich_vu")
	private String donViLoaiDichVu;
}
