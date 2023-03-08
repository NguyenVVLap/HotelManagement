package com.example.hotelserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.entity.ThietBi;
import com.example.hotelserver.repository.ThietBiRepo;

@Service
public class ThietBiServiceImpl implements ThietBiService{
	@Autowired
	private ThietBiRepo thietBiRepo;

	@Override
	public boolean themThietBi(ThietBi thietBi) {
		try {
			thietBiRepo.save(thietBi);
			return true;
		} catch (Exception e) {
			System.out.println("Error at ThietBiServiceImpl: " + e);
			return false;
		}
	}

	@Override
	public List<ThietBi> layTatCaThietBi() {
		return thietBiRepo.findAll();
	}

	@Override
	public boolean kiemTraThietBiTonTai(String tenThietBi, double giaThietBi) {
		// TODO Auto-generated method stub
		if (thietBiRepo.findByTenAndGiaThietBi(tenThietBi, giaThietBi) != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<ThietBi> timThietBiTheoTen(String tenThietBi) {
		return thietBiRepo.findByTenThietBiLike(tenThietBi);
	}

	@Override
	public ThietBi timThietBiTheoMa(long maThietBi) {
		return thietBiRepo.findById(maThietBi).get();
	}
	
	
	
	
}
