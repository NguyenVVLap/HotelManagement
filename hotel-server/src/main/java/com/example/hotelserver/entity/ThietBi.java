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
@Table(name = "thiet_bi")
public class ThietBi {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_thiet_bi")
	private long maThietBi;
	
	@Column(name = "ten_thiet_bi", columnDefinition = "nvarchar(255)")
	private String tenThietBi;
	
	@Column(name = "gia_thiet_bi")
	private double giaThietBi;
	
//	@OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.ALL, mappedBy = "equipment")
//	@Nullable
//	private List<RoomEquipment> roomEquipments;
}
