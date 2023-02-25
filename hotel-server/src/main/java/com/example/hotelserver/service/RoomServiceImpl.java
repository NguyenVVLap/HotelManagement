package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.RoomsResponseDto;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.entity.PhongThietBi;
import com.example.hotelserver.repository.RoomRepo;

@Service
public class RoomServiceImpl implements RoomService{
	@Autowired
	private RoomRepo roomRepo;
	
	@Override
	public List<Map<String, Object>> getRoomsOrderByState() {
		List<Phong> rooms = roomRepo.getRoomsOrderByState();
		List<Map<String, Object>> result = new ArrayList<>();
		for (Phong room : rooms) {
			Map<String, Object> map = new HashMap<>();
			List<PhongThietBi> roomEquipments = new ArrayList<>();
			for (PhongThietBi roomEquipment : room.getPhongThietBi()) {
				roomEquipment.setPhong(null);
				roomEquipments.add(roomEquipment);
			}
			
			RoomsResponseDto roomsResponseDto = new RoomsResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getLoaiPhong().getGiaLoaiPhong(), room.getLoaiPhong().getSucChua()
					, room.getLoaiPhong().isDuocHutThuoc(), room.getLoaiPhong().isMangThuCung()
					, room.getLoaiPhong().getSoGiuong());
			map.put("room", roomsResponseDto);
//			map.put("roomType", roomTypeRepo.findById(room.getRoomType().getRoomTypeId()).get());
//			map.put("floor", floorRepo.findById(room.getFloor().getFloorId()).get());
			map.put("roomEquipment", roomEquipments);
			result.add(map);
		}
		return result;
	}
}
