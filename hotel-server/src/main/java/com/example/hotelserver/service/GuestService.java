package com.example.hotelserver.service;

import com.example.hotelserver.entity.Guest;

public interface GuestService {
	Guest findByGuestIdentification(String guestIdentification);
	Guest findByGuestPhoneNumber(String guestPhoneNumber);
}
