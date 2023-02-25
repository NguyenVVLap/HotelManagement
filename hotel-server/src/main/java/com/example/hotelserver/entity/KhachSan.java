package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "khach_san")
public class KhachSan {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_khach_san")
	private int maKhachSan;
	
	@Column(name = "ten_khach_san", columnDefinition = "nvarchar(255)")
	private String tenKhachSan;
	
	@Column(name = "dia_chi_ks", columnDefinition = "nvarchar(255)")
	private String diaChiKS;
	
	@Column(name = "email_khach_san", columnDefinition = "nvarchar(255)")
	private String emailKhachSan;
	
	@Column(name = "so_dien_thoai_ks", columnDefinition = "nvarchar(255)")
	private String soDienThoaiKS;
	
	@Column(name = "so_sao")
	private int soSao;
	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
//	private List<User> users;
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
//	private List<Room> rooms;
}
