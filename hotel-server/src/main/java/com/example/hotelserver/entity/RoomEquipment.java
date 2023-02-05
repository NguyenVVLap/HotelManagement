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
@IdClass(RoomEquipmentPK.class)
@Table(name="room_equipment")
public class RoomEquipment {
	@Id
	@ManyToOne
	@JoinColumn(name="equipment_id")
	private Equipment equipment;
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="room_id")
	private Room room;
	
	@Column(name = "quantity")
	private int quantity;
	
}
