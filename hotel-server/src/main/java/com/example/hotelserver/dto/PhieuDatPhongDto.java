package com.example.hotelserver.dto;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.TrangThaiDatPhong;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
public class PhieuDatPhongDto {
	private long maPhieuDatPhong;
	private Date ngayDatPhong;
	private double giamGia;
	private String ghiChuDatPhong;
	private Date ngayNhanPhong;
	private Date ngayTraPhong;
	private TrangThaiDatPhong trangThaiDatPhong;
	private KhachHang khachHang;
	private List<PhongResponseDto> dsPhong;

}
