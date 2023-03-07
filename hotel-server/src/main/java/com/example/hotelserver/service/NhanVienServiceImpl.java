package com.example.hotelserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.repository.NhanVienRepo;

@Service
public class NhanVienServiceImpl implements NhanVienService {
	@Autowired
	private NhanVienRepo nhanVienRepo;

	@Override
	public NhanVien findBySoDienThoai(String soDienThoai) {
		// TODO Auto-generated method stub
		return nhanVienRepo.findBySoDienThoai(soDienThoai);
	}

	@Override
	public NhanVien findByCccd(String cccd) {
		// TODO Auto-generated method stub
		return nhanVienRepo.findByCccd(cccd);
	}
	
}
