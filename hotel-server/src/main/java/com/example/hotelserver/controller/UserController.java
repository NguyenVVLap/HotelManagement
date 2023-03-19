package com.example.hotelserver.controller;

import java.util.HashMap;
import java.util.Map;

import com.example.hotelserver.service.NhanVienService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.dto.AuthenticationRequest;
import com.example.hotelserver.dto.RegisterRequest;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/auth")
@RequiredArgsConstructor
public class UserController {
	private final AuthenticationService service;
	private final NhanVienService nhanVienService;
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
		String token = service.register(request);
		if (token == null) {
			return ResponseEntity.ok(new HashMap<>());
		}
		NhanVien nhanVien = nhanVienService.findByCCCD(request.getCccd());
		Map<String, Object> results = new HashMap<>();
		results.put("token", token);
		results.put("nhanVien", nhanVien);
		return ResponseEntity.ok(results);
	}
	
	@PutMapping("/changeRole")
	public ResponseEntity<String> changeRole(@RequestBody HashMap<String, Object> request) {
		String roleValue = request.get("roleName").toString();
		return ResponseEntity.ok(service.changeRole(request.get("username").toString()
				, request.get("password").toString()
				, roleValue ));
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<Map<String, Object>> authenticate(@RequestBody AuthenticationRequest request) {
//		System.out.println(Role.USER.name() + " " + Role.USER.getAuthority());
		String token = service.authenticate(request);
		if (token == null) {
			return ResponseEntity.ok(new HashMap<>());
		}
		NhanVien nhanVien = nhanVienService.findBySoDienThoai(request.getUsername());
		Map<String, Object> results = new HashMap<>();
		results.put("token", token);
		results.put("nhanVien", nhanVien);
		return ResponseEntity.ok(results);
	}
	
	@PostMapping("/checkPhoneExist")
	public ResponseEntity<Boolean> checkPhoneExist(@RequestBody Map<String, Object> request) {
//				System.out.println(request);
		boolean result = false;
		if (nhanVienService.findBySoDienThoai(request.get("phone").toString()) == null) {
			result = true;
		}
//		System.out.println(request.get("phone").toString());
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
}
