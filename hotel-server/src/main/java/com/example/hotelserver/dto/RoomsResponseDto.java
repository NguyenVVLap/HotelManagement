package com.example.hotelserver.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
public class RoomsResponseDto {
	private long roomId;
	private String roomName;
	private boolean roomState;
	private List<String> roomImageUrl;
	private String roomDescription;
	private int floorId;
	private String floorName;
	private long roomTypeId;
	private String roomTypeName;
	private double roomTypeCost;
	private int capacity;
	private boolean smokeFriendly;
	private boolean petFriendly;
	private int numberOfBeds;


}
