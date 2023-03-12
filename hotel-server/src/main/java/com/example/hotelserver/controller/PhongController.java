package com.example.hotelserver.controller;

import java.util.ArrayList;
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

import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.entity.PhongThietBi;
import com.example.hotelserver.entity.Tang;
import com.example.hotelserver.entity.ThietBi;
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
	
	@PostMapping
	public ResponseEntity<Boolean> savePhong(@RequestBody Map<String, Object> request) {
		try {
			
			Map<String, Object> phongRequestDto = (Map<String, Object>) request.get("phong");
			List<HashMap<String, Object>> dsPhongThietBi = (List<HashMap<String, Object>>) request.get("thietBi");
			System.out.println(phongRequestDto);
			System.out.println(dsPhongThietBi);
			if (!phongService.kiemTraPhongTonTaiTheoTen(phongRequestDto.get("tenPhong").toString()) 
					|| Long.parseLong(phongRequestDto.get("maPhong").toString()) != 0) {
				List<PhongThietBi> dsPhongEdited = new ArrayList<>();
				for (HashMap<String, Object> mapPhongThietBi: dsPhongThietBi) {
					HashMap<String, Object> mapThietBi = (HashMap<String, Object>) mapPhongThietBi.get("thietBi");
					PhongThietBi phongThietBi = new PhongThietBi(
							new ThietBi(Long.parseLong(mapThietBi.get("maThietBi").toString())
									, mapThietBi.get("tenThietBi").toString()
									, 0)
							, new Phong(Long.parseLong(phongRequestDto.get("maPhong").toString())
							, "", false, null, "", null, null, null)
							, Integer.parseInt(mapPhongThietBi.get("soLuong").toString()));
					dsPhongEdited.add(phongThietBi);
				}
				Phong phong = new Phong(Long.parseLong(phongRequestDto.get("maPhong").toString())
						, phongRequestDto.get("tenPhong").toString()
						, phongRequestDto.get("trangThaiPhong").toString().equals("true")
						, (List<String>) phongRequestDto.get("hinhAnhPhong")
						, phongRequestDto.get("moTaPhong").toString()
						, new Tang(Integer.parseInt(phongRequestDto.get("maTang").toString()), ""), 
						 new LoaiPhong(Long.parseLong(phongRequestDto.get("maLoaiPhong").toString()), "", 0, 0, false, false, 0)
						 , dsPhongEdited);
				
				if (phongService.themPhong(phong, dsPhongEdited)) {
					return new ResponseEntity<Boolean>(true, HttpStatus.OK);
				}
				 
			}
				
		} catch (Exception e) {
			System.out.println("Error at PhongController " + e);
			return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);

	}
	
	@PostMapping("/timKiemPhong")
	public ResponseEntity<List<Map<String, Object>>> timKiemPhong(@RequestBody Map<String, Object> request) {
		List<Map<String, Object>> results = new ArrayList<>();
		if (request.get("theo").toString().equals("Theo tên")) {
			results = phongService.timPhongTheoTenLike(request.get("keyword").toString());
		} else if (request.get("theo").toString().equals("Theo mã")) {
			try {
				results = (phongService.timPhongTheoMa(Long.parseLong(request.get("keyword").toString())));		
			} catch (Exception e) {
				System.out.println("Error when parse to long " + e);
			}
		} else if (request.get("theo").toString().equals("Theo tầng")) {
			results = phongService.timPhongTheoMaTang(Integer.parseInt(request.get("keyword").toString()));
		} else if (request.get("theo").toString().equals("Theo loại phòng")) {
			results = phongService.timPhongTheoMaLoaiPhong(Long.parseLong(request.get("keyword").toString()));
		}
		return new ResponseEntity<List<Map<String, Object>>>(results, HttpStatus.OK);
	}

}
