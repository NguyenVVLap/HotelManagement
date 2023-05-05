package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.dto.BangPhanCongDto;

public interface BangPhanCongService {
	List<BangPhanCongDto> layHetBangPhanCong();
	BangPhanCongDto layHetBangPhanCongTheoMaNhanVien(long maNhanVien);
	BangPhanCongDto themBangPhanCong(BangPhanCongDto bangPhanCongDto);
}
