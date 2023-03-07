package com.example.hotelserver.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.repository.EmployeeRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hotelserver.config.JwtService;
import com.example.hotelserver.dto.AuthenticationRequest;
import com.example.hotelserver.dto.RegisterRequest;
import com.example.hotelserver.entity.TaiKhoan;
import com.example.hotelserver.entity.VaiTro;
import com.example.hotelserver.repository.GuestRepo;
import com.example.hotelserver.repository.RoleRepo;
import com.example.hotelserver.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepo repository;
	private final RoleRepo roleRepo;
	private final EmployeeRepo employeeRepo;
	private final GuestRepo guestRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public String register(RegisterRequest request) {
		if (checkUserExist(request.getUsername(), request.getIdentification())) {
			VaiTro role = roleRepo.findByTenVaiTro("ROLE_USER");
			if (role == null) {
				role = new VaiTro(0, "ROLE_USER");
				roleRepo.save(role);
			}
			var taikhoan = TaiKhoan.builder()
					.tenTaiKhoan(request.getUsername())
					.matKhau(passwordEncoder.encode(request.getPassword()))
					.daKichHoat(false)
					.vaiTro(role)
					.build();
			repository.save(taikhoan);
			Date currentDate = new Date();
			var newNhanVien = NhanVien.builder().hoTen(request.getFullname())
					.cccd(request.getIdentification())
					.email(request.getEmail())
					.diaChi(request.getAddress())
					.ngayVaoLam(currentDate).soDienThoai(request.getPhoneNumber()).taiKhoan(taikhoan).build();
			employeeRepo.save(newNhanVien);
//			TaiKhoan newUser = repository.findByTenTaiKhoan(request.getUsername()).get();
//			if (newUser != null) {
//				KhachHang guest = new KhachHang(0, request.getFullname()
//						, request.getIdentification(), request.getPhoneNumber()
//						, request.getAddress(), request.getEmail());
//				guestRepo.save(guest);
//			}
			String jwtToken = jwtService.generateToken(taikhoan);
			return jwtToken;
		} else {
			return null;
		}
		
		
		
	}
	
	public String changeRole(String username, String password, String roleName) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
			);
			var user = repository.findByTenTaiKhoan(username)
				.orElseThrow();
			VaiTro role = roleRepo.findByTenVaiTro(roleName);
			if (role == null) {
				role = new VaiTro(0, roleName);
				roleRepo.save(role);
			}
			Map<String, Object> map = new HashMap<>();
			map.put("role", roleName);
			user.setVaiTro(role);
			repository.save(user);
			var jwtToken = jwtService.generateToken(map, user);
			return jwtToken;
	}

	public String authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
		);
		var user = repository.findByTenTaiKhoan(request.getUsername())
			.orElseThrow();
		Map<String, Object> map = new HashMap<>();
		map.put("role", user.getVaiTro().getTenVaiTro());
		var jwtToken = jwtService.generateToken(map, user);
		return jwtToken;
	}
	
	public boolean checkUserExist(String username, String identification) {
		if (repository.findByTenTaiKhoan(username).isEmpty() && 
				guestRepo.findByCccdKhachHang(identification) == null) {
			return true;
		}
		return false;
	}


}
