package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "guests")
public class Guest {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "guest_id")
	private int guestId;
	
	@Column(columnDefinition = "nvarchar(255)")
	private String fullname;
	
	@Column(name = "guest_identification", columnDefinition = "nvarchar(255)")
	private String guestIdentification;

	@Column(name = "guest_phone_number", columnDefinition = "nvarchar(255)")
	private String guestPhoneNumber;
	
	@Column(name = "guest_address", columnDefinition = "nvarchar(255)")
	private String guestAddress;
	
	@Column(name = "guest_email", columnDefinition = "nvarchar(255)")
	private String guestEmail;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;
}
