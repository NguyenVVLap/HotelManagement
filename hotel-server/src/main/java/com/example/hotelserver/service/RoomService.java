package com.example.hotelserver.service;

import java.util.List;
import java.util.Map;

public interface RoomService {
	List<Map<String, Object>> getRoomsOrderByState();
}
