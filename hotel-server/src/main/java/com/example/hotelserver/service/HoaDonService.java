package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.dto.DatDichVuDto;
import com.example.hotelserver.dto.HoaDonDto;
import com.example.hotelserver.dto.TaoHoaDonRequestDto;

public interface HoaDonService {
	boolean themHoaDon(TaoHoaDonRequestDto hoaDonDto);
//	List<PhieuDatPhongDto> layHoaDon();
	List<HoaDonDto> layHoaDonTheoNgay();
	List<HoaDonDto> layHoaDonTheoNgayCCCD(String cccd);
	List<HoaDonDto> layHoaDonTheoTenPhong(String tenPhong);
	HoaDonDto datDichVu(long maHoaDon, List<DatDichVuDto> datDichVuDtos);
}	
