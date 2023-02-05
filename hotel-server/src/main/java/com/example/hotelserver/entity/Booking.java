package com.example.hotelserver.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "booking_id")
	private long bookingId;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "guest_id")
	private Guest guest;
	
	@Column(name = "booking_date")
	private Date bookingDate;
	
	@Column(name = "total_price")
	private double totalPrice;
	
	@Column(name = "discount_rate")
	private double discountRate;
	
	@Column(name = "booking_note", columnDefinition = "nvarchar(255)")
	private String bookingNote;
	
	@OneToMany(mappedBy = "booking")
	private List<BookingDetail> bookingDetails;
	
	@OneToMany(mappedBy = "booking")
	private List<BookingProduct> bookingProducts;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "employee_id")
	private Employee employee;
}
