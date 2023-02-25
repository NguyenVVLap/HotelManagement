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
@Table(name = "phong_ban")
public class PhongBan {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_phong_ban")
	private long maPhongBan;
	
	@Column(name = "ten_phong_Ban", columnDefinition = "nvarchar(255)")
	private String tenPhongBan;
	
	@Column(name = "mo_ta_pb", columnDefinition = "nvarchar(255)")
	private String moTaPB;
}
