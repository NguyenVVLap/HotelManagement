package com.example.hotelserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.dto.PhieuDatPhongDto;
import com.example.hotelserver.dto.ThemPhieuDto;
import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.service.KhachHangService;
import com.example.hotelserver.service.PhieuDatPhongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/phieuDatPhong")
public class PhieuDatHangController {
	@Autowired
	private PhieuDatPhongService phieuDatPhongService;
	
	@Autowired
	private KhachHangService khachHangService;
	
	@GetMapping
	public ResponseEntity<List<PhieuDatPhongDto>> layPhieuDatPhong() {
		return new ResponseEntity<List<PhieuDatPhongDto>>(phieuDatPhongService.layPhieuDatPhong(), HttpStatus.OK);
	}
	
	@PostMapping("/themPhieu")
	public ResponseEntity<Boolean> themPhieu(@RequestBody ThemPhieuDto request) {
		try {
			KhachHang khachHang = khachHangService.timKhachHangTheoCCCD(request.getKhachHang().getCccdKhachHang());
			if (khachHang == null) {
				if (khachHangService.themKhachHang(request.getKhachHang())) {
					khachHang = khachHangService.timKhachHangTheoCCCD(request.getKhachHang().getCccdKhachHang());
					request.setKhachHang(khachHang);
					if (phieuDatPhongService.themPhieuDatPhong(request)) {
						return new ResponseEntity<Boolean>(true, HttpStatus.OK);
					}
				}
			} else {
				request.setKhachHang(khachHang);
				if (phieuDatPhongService.themPhieuDatPhong(request)) {
					return new ResponseEntity<Boolean>(true, HttpStatus.OK);
				}
			}
		} catch (Exception e) {
			System.out.println("Error at themPhieu: " + e);
			return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}

}
