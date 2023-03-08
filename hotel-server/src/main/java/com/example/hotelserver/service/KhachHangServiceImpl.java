package com.example.hotelserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.repository.KhachHangRepo;

import java.util.List;

@Service
public class KhachHangServiceImpl implements KhachHangService {
	@Autowired
	private KhachHangRepo khachHangRepo;
	
	
	@Override
	public KhachHang findByGuestIdentification(String guestIdentification) {
		return khachHangRepo.findByCccdKhachHang(guestIdentification);
	}


	@Override
	public KhachHang findByGuestPhoneNumber(String guestPhoneNumber) {
		return khachHangRepo.findBySoDienThoaiKH(guestPhoneNumber);
	}

	@Override
	public List<KhachHang> layAllDanhSachKhachHang() {
		return khachHangRepo.layAllDanhSachKhachHang();
	}

	@Override
	public boolean themKhachHang(KhachHang kh) {
		try{
			khachHangRepo.save(kh);
			return  true;
		}
		catch (Exception e){
			System.out.println("Error at Khach Hang : "+e);
			return false;
		}

	}

	@Override
	public boolean kiemtraKhachHangTonTai(String cccdKhachHang) {
		if(khachHangRepo.findByCccdKhachHang(cccdKhachHang)!=null){
			return true;
		}

		return false;
	}

	@Override
	public List<KhachHang> timKhachHangTheoTen(String tenKhachHang) {
		return null;
	}

	@Override
	public KhachHang timKhachHangTheoCCCD(String cccdKhachHang) {
		return null;
	}

	@Override
	public KhachHang timKhachHangTheoPhone(String phoneKhachHang) {
		return null;
	}

}