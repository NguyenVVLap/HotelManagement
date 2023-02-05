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
@Table(name = "hotels")
public class Hotel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "hotel_id")
	private int hotelId;
	
	@Column(name = "hotel_name", columnDefinition = "nvarchar(255)")
	private String hotelName;
	
	@Column(name = "hotel_address", columnDefinition = "nvarchar(255)")
	private String hotelAddress;
	
	@Column(name = "hotel_email", columnDefinition = "nvarchar(255)")
	private String hotelEmail;
	
	@Column(name = "hotel_phone_number", columnDefinition = "nvarchar(255)")
	private String hotelPhoneNumber;
	
	@Column(name = "star_rating")
	private int starRating;
	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
//	private List<User> users;
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
//	private List<Room> rooms;
}
