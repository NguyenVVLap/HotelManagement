package com.example.hotelserver.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.service.LoaiPhongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/loaiPhong")
public class LoaiPhongController {
	@Autowired
	private LoaiPhongService loaiPhongService;

	@GetMapping
	public ResponseEntity<List<LoaiPhong>> layHetLoaiPhong() {
		List<LoaiPhong> results = loaiPhongService.layTatCaLoaiPhong();
		if (results.isEmpty() || results == null) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
		}
		System.out.println(results);
		return new ResponseEntity<>(results, HttpStatus.OK);
	}
}
