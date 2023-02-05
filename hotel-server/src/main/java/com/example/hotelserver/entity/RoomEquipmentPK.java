package com.example.hotelserver.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Embeddable
public class RoomEquipmentPK implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long equipment;
	private long room;
}
