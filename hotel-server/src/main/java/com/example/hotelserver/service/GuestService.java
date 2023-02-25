package com.example.hotelserver.service;

import com.example.hotelserver.entity.KhachHang;

public interface GuestService {
	KhachHang findByGuestIdentification(String guestIdentification);
	KhachHang findByGuestPhoneNumber(String guestPhoneNumber);
}
