package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "loai_phong")
public class LoaiPhong{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_loai_phong")
	private long maLoaiPhong;
	
	@Column(name = "ten_loai_phong", columnDefinition = "nvarchar(255)")
	private String tenLoaiPhong;
	
	@Column(name = "gia_loai_phong")
	private double giaLoaiPhong;
	
	@Column(name = "suc_chua")
	private int sucChua;
	
	@Column(name = "duoc_hut_thuoc")
	private boolean duocHutThuoc;
	
	@Column(name = "mang_thu_cung")
	private boolean mangThuCung;
	
	@Column(name = "so_giuong")
	private int soGiuong;

	@Override
	public String toString() {
		return "LoaiPhong [maLoaiPhong=" + maLoaiPhong + ", tenLoaiPhong=" + tenLoaiPhong + ", giaLoaiPhong="
				+ giaLoaiPhong + ", sucChua=" + sucChua + ", duocHutThuoc=" + duocHutThuoc + ", mangThuCung="
				+ mangThuCung + ", soGiuong=" + soGiuong + "]";
	}

	
	
	
}
