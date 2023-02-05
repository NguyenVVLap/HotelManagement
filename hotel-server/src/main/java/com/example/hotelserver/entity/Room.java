package com.example.hotelserver.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "rooms")
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "room_id")
	private long roomId;
	
	@Column(name = "room_name", columnDefinition = "nvarchar(255)")
	private String roomName;
	
	@Column(name = "room_state")
	private boolean roomState;
	
	@Column(name = "room_image_url")
	@ElementCollection(fetch = FetchType.EAGER)
	@JoinTable(name = "room_image_url", joinColumns = @JoinColumn(name = "room_id"))
	private List<String> roomImageUrl;
	
	@Column(name = "room_description", columnDefinition = "nvarchar(255)")
	private String roomDescription;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "floor_id")
	private Floor floor;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "room_type_id")
	private RoomType roomType;
	
	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "room")
	private List<RoomEquipment> roomEquipments;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "hotel_id")
	private Hotel hotel;
	
	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.REMOVE, mappedBy = "room")
	private List<Damage> damages;
}
