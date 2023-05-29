package com.example.hotelserver.dto;

import java.util.Date;
import java.util.List;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.entity.PhieuDatPhong;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@ToString
@Builder
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class HoaDonPhongDichVuDto {
	private long maHoaDon;
	private Date ngayLap;
	private Date ngayNhanPhong;
	private Date ngayTraPhong;
	private double tienNhan;
	private PhieuDatPhong phieuDatPhong;
	private KhachHang khachHang;
	private NhanVien nhanVien;
	private List<ChiTietPhongDichVuDto> dsChiTietDichVuDto;
	private List<PhongResponseDto> dsPhong;
	private double tongTienDichVu;
	private double tongTienPhong;
	private double tongTien;}
