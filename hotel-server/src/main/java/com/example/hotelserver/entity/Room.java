package com.example.hotelserver.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
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
	
	@Column(name = "room_image_url", columnDefinition = "varchar(8000)")
	@MapKeyColumn(columnDefinition="varchar(8000)")
	@ElementCollection(fetch = FetchType.EAGER)
	@JoinTable(name = "room_image_url", joinColumns = @JoinColumn(name = "room_id"))
	private List<String> roomImageUrl;
	
	@Column(name = "room_description", columnDefinition = "nvarchar(255)")
	private String roomDescription;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JsonIgnore
	@JoinColumn(name = "floor_id")
	private Floor floor;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JsonIgnore
	@JoinColumn(name = "room_type_id")
	private RoomType roomType;
	
	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "room")
	@JsonIgnore
	private List<RoomEquipment> roomEquipments;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JsonIgnore
	@JoinColumn(name = "hotel_id")
	private Hotel hotel;
	
	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.REMOVE, mappedBy = "room")
	@JsonIgnore
	private List<Damage> damages;

	@Override
	public String toString() {
		return "Room [roomId=" + roomId + ", roomName=" + roomName + ", roomState=" + roomState + ", roomImageUrl="
				+ roomImageUrl + ", roomDescription=" + roomDescription + "]";
	}

	
}
