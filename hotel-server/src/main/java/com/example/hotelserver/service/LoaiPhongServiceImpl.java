package com.example.hotelserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.LoaiPhong;
import com.example.hotelserver.repository.LoaiPhongRepo;

@Service
public class LoaiPhongServiceImpl implements LoaiPhongService {
	@Autowired
	private LoaiPhongRepo loaiPhongRepo;

	@Override
	public List<LoaiPhong> layTatCaLoaiPhong() {
		return loaiPhongRepo.findAll();
	}
	
	
}
