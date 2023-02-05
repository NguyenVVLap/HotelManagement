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
@Table(name = "positions")
public class Position {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "position_id")
	private long positionId;
	
	@Column(name = "position_name", columnDefinition = "nvarchar(255)")
	private String positionName;
	
	@Column(name = "position_description", columnDefinition = "nvarchar(255)")
	private String positionDescription;
}
