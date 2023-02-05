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
@Table(name = "equipments")
public class Equipment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "equipment_id")
	private long equipmentId;
	
	@Column(name = "equipment_name", columnDefinition = "nvarchar(255)")
	private String equipmentName;
	
	@Column(name = "equipment_price")
	private double equipmentPrice;
	
//	@OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.ALL, mappedBy = "equipment")
//	@Nullable
//	private List<RoomEquipment> roomEquipments;
}
