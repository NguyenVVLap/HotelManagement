package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.RoomsResponseDto;
import com.example.hotelserver.entity.Damage;
import com.example.hotelserver.entity.Equipment;
import com.example.hotelserver.entity.Room;
import com.example.hotelserver.entity.RoomEquipment;
import com.example.hotelserver.repository.FloorRepo;
import com.example.hotelserver.repository.RoomRepo;
import com.example.hotelserver.repository.RoomTypeRepo;

@Service
public class RoomServiceImpl implements RoomService{
	@Autowired
	private RoomRepo roomRepo;
	
	@Autowired
	private RoomTypeRepo roomTypeRepo;

	@Autowired
	private FloorRepo floorRepo;
	
	@Override
	public List<Map<String, Object>> getRoomsOrderByState() {
		List<Room> rooms = roomRepo.getRoomsOrderByState();
		List<Map<String, Object>> result = new ArrayList<>();
		for (Room room : rooms) {
			Map<String, Object> map = new HashMap<>();
			List<RoomEquipment> roomEquipments = new ArrayList<>();
			for (RoomEquipment roomEquipment : room.getRoomEquipments()) {
				roomEquipment.setRoom(null);
				roomEquipments.add(roomEquipment);
			}
			
			List<Damage> damages = new ArrayList<>();
			for (Damage damage : room.getDamages()) {
				damages.add(damage);
			}
			RoomsResponseDto roomsResponseDto = new RoomsResponseDto(room.getRoomId()
					, room.getRoomName(), room.isRoomState(), room.getRoomImageUrl()
					, room.getRoomDescription()
					, room.getFloor().getFloorId(), room.getFloor().getFloorName()
					, room.getRoomType().getRoomTypeId(), room.getRoomType().getRoomTypeName()
					, room.getRoomType().getRoomTypeCost(), room.getRoomType().getCapacity()
					, room.getRoomType().isSmokeFriendly(), room.getRoomType().isPetFriendly()
					, room.getRoomType().getNumberOfBeds());
			map.put("room", roomsResponseDto);
//			map.put("roomType", roomTypeRepo.findById(room.getRoomType().getRoomTypeId()).get());
//			map.put("floor", floorRepo.findById(room.getFloor().getFloorId()).get());
			map.put("damages", damages);
			map.put("roomEquipment", roomEquipments);
			result.add(map);
		}
		return result;
	}
}
