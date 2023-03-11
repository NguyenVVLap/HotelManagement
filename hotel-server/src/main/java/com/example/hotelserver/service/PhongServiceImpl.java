package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.entity.PhongThietBi;
import com.example.hotelserver.repository.PhongRepo;
import com.example.hotelserver.repository.PhongThietBiRepo;

@Service
public class PhongServiceImpl implements PhongService{
	@Autowired
	private PhongRepo phongRepo;
	
	@Autowired
	private PhongThietBiRepo phongThietBiRepo;
	
	@Override
	public List<Map<String, Object>> layTatCaPhongSapXepTheoTrangThai() {
		List<Phong> rooms = phongRepo.getRoomsOrderByState();
		List<Map<String, Object>> result = new ArrayList<>();
		for (Phong room : rooms) {
			Map<String, Object> map = new HashMap<>();
			List<PhongThietBi> dsThietBiPhong = new ArrayList<>();
			for (PhongThietBi thietBiPhong : room.getPhongThietBi()) {
				thietBiPhong.setPhong(null);
				dsThietBiPhong.add(thietBiPhong);
			}
			
			PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getLoaiPhong().getGiaLoaiPhong(), room.getLoaiPhong().getSucChua()
					, room.getLoaiPhong().isDuocHutThuoc(), room.getLoaiPhong().isMangThuCung()
					, room.getLoaiPhong().getSoGiuong());
			map.put("phong", phongResponseDto);
			map.put("dsThietBiPhong", dsThietBiPhong);
			result.add(map);
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> layTatCaPhong() {
		List<Phong> rooms = phongRepo.findAll();
		List<Map<String, Object>> result = new ArrayList<>();
		for (Phong room : rooms) {
			Map<String, Object> map = new HashMap<>();
			List<PhongThietBi> dsThietBiPhong = phongThietBiRepo.findByMaPhong(room.getMaPhong());
			List<PhongThietBi> dsThietBiPhongEdited = phongThietBiRepo.findByMaPhong(room.getMaPhong());
			
			for (PhongThietBi thietBiPhong : dsThietBiPhong) {
				thietBiPhong.setPhong(null);
				dsThietBiPhongEdited.add(thietBiPhong);
			}
			
			PhongResponseDto phongResponseDto = new PhongResponseDto(room.getMaPhong()
					, room.getTenPhong(), room.isTrangThaiPhong(), room.getHinhAnhPhong()
					, room.getMoTaPhong()
					, room.getTang().getMaTang(), room.getTang().getTenTang()
					, room.getLoaiPhong().getMaLoaiPhong(), room.getLoaiPhong().getTenLoaiPhong()
					, room.getLoaiPhong().getGiaLoaiPhong(), room.getLoaiPhong().getSucChua()
					, room.getLoaiPhong().isDuocHutThuoc(), room.getLoaiPhong().isMangThuCung()
					, room.getLoaiPhong().getSoGiuong());
			map.put("phong", phongResponseDto);
			map.put("dsThietBiPhong", dsThietBiPhongEdited);
			result.add(map);
		}
		return result;
	}

	@Override
	public boolean themPhong(Phong phong, List<PhongThietBi> dsPhongThietBi) {
		try {
			phong.setPhongThietBi(null);
			phongRepo.save(phong);
			Phong savedPhong = phongRepo.findByTenPhong(phong.getTenPhong());
			if (savedPhong != null) {
				if (dsPhongThietBi != null && !dsPhongThietBi.isEmpty()) {
					for (PhongThietBi phongThietBi : dsPhongThietBi) {
						phongThietBi.setPhong(new Phong(savedPhong.getMaPhong()
								, "", false, null, "", null, null, null));
						phongThietBiRepo.save(phongThietBi);
					}
				}
			}
		} catch (Exception e) {
			System.out.println("Error at PhongServiceImpl" + e);
			return false;
		}
		
		return true;
	}

	@Override
	public boolean kiemTraPhongTonTaiTheoTen(String tenPhong) {
		if (phongRepo.findByTenPhongLike(tenPhong) != null && !phongRepo.findByTenPhongLike(tenPhong).isEmpty()) {
			return true;
		}
		return false;
	}
}
