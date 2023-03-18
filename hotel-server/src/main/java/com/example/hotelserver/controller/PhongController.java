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

import com.example.hotelserver.dto.PhongGetRequestOrderDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.entity.Tang;
import com.example.hotelserver.service.PhongService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/phong")
public class PhongController {
	@Autowired
	private PhongService phongService;

	@PostMapping("/sapXepTrangThai")
	public ResponseEntity<List<PhongResponseDto>> getAllPhongOrderByTrangThai(@RequestBody PhongGetRequestOrderDto request) {
		List<PhongResponseDto> dataFromQuery = phongService
				.layTatCaPhongSapXepTheoTrangThai(request.getNgayNhanPhong()
						, request.getNgayTraPhong());
		if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<PhongResponseDto>> getAllPhong() {
		List<PhongResponseDto> dataFromQuery = phongService.layTatCaPhong();
		if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
		return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Boolean> savePhong(@RequestBody Map<String, Object> request) {
		try {
			Map<String, Object> phongRequestDto = (Map<String, Object>) request.get("phong");

			if (!phongService.kiemTraPhongTonTaiTheoTen(phongRequestDto.get("tenPhong").toString()) 
					|| Long.parseLong(phongRequestDto.get("maPhong").toString()) != 0) {
				Phong phong = new Phong(Long.parseLong(phongRequestDto.get("maPhong").toString())
						, phongRequestDto.get("tenPhong").toString()
						, phongRequestDto.get("trangThaiPhong").toString().equals("true")
						, (List<String>) phongRequestDto.get("hinhAnhPhong")
						, phongRequestDto.get("moTaPhong").toString()
						, new Tang(Integer.parseInt(phongRequestDto.get("maTang").toString()), ""), 
						new LoaiPhong(Long.parseLong(phongRequestDto.get("maLoaiPhong").toString()), "", 0, 0)
						, Double.parseDouble(phongRequestDto.get("giaPhong").toString())
						, phongRequestDto.get("duocHutThuoc").toString().equals("true")
						, phongRequestDto.get("mangThuCung").toString().equals("true")
						);
				if (phongService.themPhong(phong)) {
					return new ResponseEntity<Boolean>(true, HttpStatus.OK);
				}
			}
		} catch (Exception e) {
			System.out.println("Error at savePhong " + e);
			return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);

	}

	@PostMapping("/timKiemPhong")
	public ResponseEntity<List<PhongResponseDto>> timKiemPhong(@RequestBody Map<String, Object> request) {
		List<PhongResponseDto> results = new ArrayList<>();
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
		return new ResponseEntity<List<PhongResponseDto>>(results, HttpStatus.OK);
	}

}
