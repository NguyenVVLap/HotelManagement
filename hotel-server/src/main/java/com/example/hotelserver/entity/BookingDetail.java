package com.example.hotelserver.entity;

import java.util.Date;

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
@IdClass(BookingDetailPK.class)
@Table(name="booking_detail")
public class BookingDetail {
	@Id
	@ManyToOne
	@JoinColumn(name="booking_id")
	private Booking booking;
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="room_id")
	private Room room;
	
	@Column(name = "check_in_date")
	private Date checkInDate;
	
	@Column(name = "check_out_date")
	private Date checkOutDate;
	
	@Column(name = "duration_of_stay")
	private int durationOfStay;
	
}
