package com.example.hotelserver.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.service.PhongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/phong")
public class PhongController {
	@Autowired
	private PhongService phongService;

	@GetMapping("/sapXepTrangThai")
	public ResponseEntity<List<Map<String, Object>>> getAllPhongOrderByTrangThai() {
		List<Map<String, Object>> dataFromQuery = phongService.layTatCaPhongSapXepTheoTrangThai();
		if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<Map<String, Object>>> getAllPhong() {
		List<Map<String, Object>> dataFromQuery = phongService.layTatCaPhong();
		if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
	}
}
