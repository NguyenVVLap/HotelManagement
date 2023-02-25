package com.example.hotelserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.PhieuDatPhong;
import com.example.hotelserver.repository.BookingRepo;

@Service
public class BookingServiceImpl implements BookingService{
	@Autowired
	private BookingRepo bookingRepo;

	@Override
	public void save(PhieuDatPhong booking) {
		bookingRepo.save(booking);
	}
}
