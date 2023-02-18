package com.example.hotelserver.controller;

import java.util.HashMap;
import java.util.Map;

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
import com.example.hotelserver.service.AuthenticationService;
import com.example.hotelserver.service.GuestService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/auth")
@RequiredArgsConstructor
public class UserController {
	private final AuthenticationService service;
	private final GuestService guestService;
	
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
		System.out.println(request.getFullname());
		String token = service.register(request);
		if (token == null) {
			return ResponseEntity.ok("Username or Identification already exist");
		}
		return ResponseEntity.ok(token);
	}
	
	@PutMapping("/changeRole")
	public ResponseEntity<String> changeRole(@RequestBody HashMap<String, Object> request) {
		String roleValue = request.get("roleName").toString();
		return ResponseEntity.ok(service.changeRole(request.get("username").toString()
				, request.get("password").toString()
				, roleValue ));
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request) {
//		System.out.println(Role.USER.name() + " " + Role.USER.getAuthority());
		return ResponseEntity.ok(service.authenticate(request));
	}
	
	@PostMapping("/checkPhoneExist")
	public ResponseEntity<Boolean> checkPhoneExist(@RequestBody Map<String, Object> request) {
		boolean result = false;
		if (guestService.findByGuestPhoneNumber(request.get("phone").toString()) == null) {
			result = true;
		}
//		System.out.println(request.get("phone").toString());
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
}