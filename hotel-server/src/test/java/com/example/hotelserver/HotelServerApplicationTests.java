package com.example.hotelserver;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.hotelserver.entity.Room;
import com.example.hotelserver.repository.RoomRepo;
import com.example.hotelserver.repository.UserRepo;
import com.example.hotelserver.service.RoomService;
import com.example.hotelserver.service.RoomServiceImpl;

@SpringBootTest
class HotelServerApplicationTests {
	@Autowired
	public RoomService roomService = new RoomServiceImpl();
	
	@Autowired
	public RoomRepo roomRepo;
	
	@Autowired
	public UserRepo userRepo;
	@Test
	void testCau1() {
//		List<Room> results = roomService.getRoomsOrderByState();
//		List<Room> results = roomRepo.findAll();
		System.out.println(userRepo.findAll());
		System.out.println("!@34");
	}

}
