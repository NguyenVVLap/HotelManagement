package com.example.hotelserver.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hotelserver.config.JwtService;
import com.example.hotelserver.dto.AuthenticationRequest;
import com.example.hotelserver.dto.RegisterRequest;
import com.example.hotelserver.entity.Guest;
import com.example.hotelserver.entity.Role;
import com.example.hotelserver.entity.User;
import com.example.hotelserver.repository.GuestRepo;
import com.example.hotelserver.repository.RoleRepo;
import com.example.hotelserver.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepo repository;
	private final RoleRepo roleRepo;
	private final GuestRepo guestRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public String register(RegisterRequest request) {
		if (checkUserExist(request.getUsername(), request.getIdentification())) {
			Role role = roleRepo.findByName("ROLE_USER");
			if (role == null) {
				role = new Role(0, "ROLE_USER");
				roleRepo.save(role);
			}
			var user = User.builder()
					.username(request.getUsername())
					.password(passwordEncoder.encode(request.getPassword()))
					.role(role)
					.build();
			repository.save(user);
			User newUser = repository.findByUsername(request.getUsername()).get();
			if (newUser != null) {
				Guest guest = new Guest(0, request.getFullname()
						, request.getIdentification(), request.getPhoneNumber()
						, request.getAddress(), request.getEmail()
						, newUser);
				guestRepo.save(guest);
			}
			String jwtToken = jwtService.generateToken(user);
			return jwtToken;
		} else {
			return null;
		}
		
		
		
	}
	
	public String changeRole(String username, String password, String roleName) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
			);
			var user = repository.findByUsername(username)
				.orElseThrow();
			Role role = roleRepo.findByName(roleName);
			if (role == null) {
				role = new Role(0, roleName);
				roleRepo.save(role);
			}
			Map<String, Object> map = new HashMap<>();
			map.put("role", roleName);
			user.setRole(role);
			repository.save(user);
			var jwtToken = jwtService.generateToken(map, user);
			return jwtToken;
	}

	public String authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
		);
		var user = repository.findByUsername(request.getUsername())
			.orElseThrow();
		Map<String, Object> map = new HashMap<>();
		map.put("role", user.getRole().getName());
		var jwtToken = jwtService.generateToken(map, user);
		return jwtToken;
	}
	
	public boolean checkUserExist(String username, String identification) {
		if (repository.findByUsername(username).isEmpty() && 
				guestRepo.findByGuestIdentification(identification) == null) {
			return true;
		}
		return false;
	}


}
