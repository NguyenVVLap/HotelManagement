package com.example.hotelserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hotelserver.entity.RoomEquipment;
import com.example.hotelserver.entity.RoomEquipmentPK;

@Repository
public interface RoomEquipmentRepo extends JpaRepository<RoomEquipment, RoomEquipmentPK>{

}
