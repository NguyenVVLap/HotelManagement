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
@Table(name = "floors")
public class Floor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "floor_id")
	private int floorId;
	
	@Column(name = "floor_name", columnDefinition = "nvarchar(255)")
	private String floorName;

	@Override
	public String toString() {
		return "Floor [floorId=" + floorId + ", floorName=" + floorName + "]";
	}
	
	
}
