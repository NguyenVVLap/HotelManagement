package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hotelserver.entity.Guest;

public interface GuestRepo extends JpaRepository<Guest, Long> {
	Guest findByGuestIdentification(String guestIdentification);
	Guest findByGuestPhoneNumber(String guestPhoneNumber);
}
