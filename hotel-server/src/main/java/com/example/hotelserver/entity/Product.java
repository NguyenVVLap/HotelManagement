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
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "product_id")
	private long productId;
	
	@Column(name = "product_name", columnDefinition = "nvarchar(255)")
	private String productName;
	
	@Column(name = "product_price")
	private double productPrice;
	
//	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
//	@Nullable
//	private Set<BookingProduct> bookingProducts;
}
