package com.example.hotelserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.repository.GuestRepo;

@Service
public class GuestServiceImpl implements GuestService{
	@Autowired
	private GuestRepo guestRepo;
	
	
	@Override
	public KhachHang findByGuestIdentification(String guestIdentification) {
		return guestRepo.findByCccdKhachHang(guestIdentification);
	}


	@Override
	public KhachHang findByGuestPhoneNumber(String guestPhoneNumber) {
		return guestRepo.findBySoDienThoaiKH(guestPhoneNumber);
	}

}
