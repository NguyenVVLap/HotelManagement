package com.example.hotelserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@IdClass(ChiTietPhieuDatPhongPK.class)
@Table(name = "chi_tiet_phieu_dat_phong")
public class ChiTietPhieuDatPhong {
	@Id
	@ManyToOne
	@JoinColumn(name="ma_phieu_dat_phong")
	private PhieuDatPhong phieuDatPhong;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name="ma_phong")
	private Phong phong;
}
