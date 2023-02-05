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
@Table(name = "room_type")
public class RoomType {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "room_type_id")
	private long roomTypeId;
	
	@Column(name = "room_type_name", columnDefinition = "nvarchar(255)")
	private String roomTypeName;
	
	@Column(name = "room_type_cost")
	private double roomTypeCost;
	
	private int capacity;
	
	@Column(name = "smoke_friendly")
	private boolean smokeFriendly;
	
	@Column(name = "pet_friendly")
	private boolean petFriendly;
	
	@Column(name = "number_of_beds")
	private int numberOfBeds;
	
}
