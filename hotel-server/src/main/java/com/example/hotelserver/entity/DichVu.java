package com.example.hotelserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Builder
@Table(name = "dich_vu")
public class DichVu {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_dich_vu")
	private long maDichVu;
	
	@Column(name = "ten_dich_vu", columnDefinition = "nvarchar(255)")
	private String tenDichVu;
	
	@Column(name = "giaDichVu")
	private double giaDichVu;
	
//	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
//	@Nullable
//	private Set<BookingProduct> bookingProducts;
}
