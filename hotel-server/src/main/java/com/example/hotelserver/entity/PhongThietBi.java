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
@IdClass(PhongThietBiPK.class)
@Table(name="phong_thiet_bi")
public class PhongThietBi {

	@Id
	@ManyToOne
	@JoinColumn(name="ma_thiet_bi")
	private ThietBi thietBi;
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="ma_phong")
	private Phong phong;
	
	@Column(name = "so_luong")
	private int soLuong;
	
}
