package com.example.hotelserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.Guest;
import com.example.hotelserver.repository.GuestRepo;

@Service
public class GuestServiceImpl implements GuestService{
	@Autowired
	private GuestRepo guestRepo;
	
	
	@Override
	public Guest findByGuestIdentification(String guestIdentification) {
		return guestRepo.findByGuestIdentification(guestIdentification);
	}


	@Override
	public Guest findByGuestPhoneNumber(String guestPhoneNumber) {
		return guestRepo.findByGuestPhoneNumber(guestPhoneNumber);
	}

}
