package com.example.hotelserver.controller;

import java.util.ArrayList;
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

import com.example.hotelserver.entity.ThietBi;
import com.example.hotelserver.service.ThietBiService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/thietbi")
public class ThietBiController {
	@Autowired
	private ThietBiService thietBiService;
	
	@GetMapping
	public List<ThietBi> layTatCaThietBi() {
		return thietBiService.layTatCaThietBi();
	}
	
	@PostMapping
	public ResponseEntity<List<ThietBi>> themThietBi(@RequestBody ThietBi thietBi) {
		if (!thietBiService.kiemTraThietBiTonTai(thietBi.getTenThietBi(), thietBi.getGiaThietBi())) {
			if(thietBiService.themThietBi(thietBi)) {
				return new ResponseEntity<List<ThietBi>>(thietBiService.layTatCaThietBi(), HttpStatus.OK);
			}		
		}
		return new ResponseEntity<List<ThietBi>>(new ArrayList<>(), HttpStatus.OK);
	}
	
	@PostMapping("/timKiemThietBi")
	public ResponseEntity<List<ThietBi>> timKiemTang(@RequestBody Map<String, Object> request) {
		List<ThietBi> results = new ArrayList<>();
		if (request.get("theo").toString().equals("Theo tên")) {
			results = thietBiService.timThietBiTheoTen(request.get("keyword").toString());
		} else if (request.get("theo").toString().equals("Theo mã")) {
			try {
				results.add(thietBiService.timThietBiTheoMa(Integer.parseInt(request.get("keyword").toString())));		
			} catch (Exception e) {
				System.out.println("Error when parse to int " + e);
			}
		}
		return new ResponseEntity<List<ThietBi>>(results, HttpStatus.OK);
	}
	
}
