package com.example.hotelserver.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@ToString
public class TaoHoaDonRequestDto {
	private long maHoaDon;
	
//	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayLap;
	
//	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayNhanPhong;
	
//	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	private Date ngayTraPhong;
	private double tienNhan;
	private List<Long> dsMaPhong;
	private long maPhieuDatPhong;
	private int maKhachHang;
	private long maNhanVien;
}
