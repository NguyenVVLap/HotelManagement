package com.example.hotelserver.entity;

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
@IdClass(BookingProductPK.class)
@Table(name="booking_product")
public class BookingProduct {
	@Id
	@ManyToOne
	@JoinColumn(name="booking_id")
	private Booking booking;
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="product_id")
	private Product product;
	
	private int quantity;
	
	@Column(name = "total_price")
	private double totalPrice;
	
}
