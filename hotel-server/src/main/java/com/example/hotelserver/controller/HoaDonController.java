package com.example.hotelserver.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.dto.DatDichVuDto;
import com.example.hotelserver.dto.DatDichVuRequestDto;
import com.example.hotelserver.dto.HoaDonDto;
import com.example.hotelserver.dto.TaoHoaDonRequestDto;
import com.example.hotelserver.service.HoaDonService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/hoaDon")
public class HoaDonController {
	@Autowired
	private HoaDonService hoaDonService;
	
	@PostMapping
	public ResponseEntity<Boolean> themHoaDon(@RequestBody TaoHoaDonRequestDto hoaDonDto) {
		if (hoaDonService.themHoaDon(hoaDonDto)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
	
	@GetMapping("/orderDate")
	public ResponseEntity<List<HoaDonDto>> layHoaDonTheoNgay() {
//		List<PhieuDatPhongDto> results = phieuDatPhongService.layPhieuDatPhongTheoNgay();
		return new ResponseEntity<List<HoaDonDto>>(hoaDonService.layHoaDonTheoNgay(), HttpStatus.OK);
	}
	
	@PostMapping("/searchByCCCD")
	public ResponseEntity<List<HoaDonDto>> layHoaDonTheoCCCD(@RequestBody Map<String, Object> request) {
//		List<PhieuDatPhongDto> results = phieuDatPhongService.layPhieuDatPhongTheoNgay();
		return new ResponseEntity<List<HoaDonDto>>(hoaDonService.layHoaDonTheoNgayCCCD(request.get("cccd").toString()), HttpStatus.OK);
	}
	
	@PostMapping("/datDichVu")
	public ResponseEntity<HoaDonDto> datDichVu(@RequestBody DatDichVuRequestDto request) {
		System.out.println(request.getMaHoaDon());
		System.out.println(request.getDsDichVu());
		HoaDonDto hoaDonDto = hoaDonService.datDichVu(request.getMaHoaDon()
				, request.getDsDichVu());
		if (hoaDonDto != null) {
			return new ResponseEntity<HoaDonDto>(hoaDonDto, HttpStatus.OK);
		}
		return new ResponseEntity<HoaDonDto>(new HoaDonDto(), HttpStatus.OK);
	}
	
	@PostMapping("/searchHoaDonForDichVu")
	public ResponseEntity<List<HoaDonDto>> layHoaDonTheoCCCDVaTenPhong(@RequestBody Map<String, Object> request) {
		List<HoaDonDto> hoaDonDto = hoaDonService.layHoaDonTheoNgayCCCD(request.get("keyword").toString());
		
		
		
		return new ResponseEntity<List<HoaDonDto>>(hoaDonService.layHoaDonTheoNgayCCCD(request.get("cccd").toString()), HttpStatus.OK);
	}
}
