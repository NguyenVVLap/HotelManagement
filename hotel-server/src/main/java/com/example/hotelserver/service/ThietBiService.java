package com.example.hotelserver.service;

import java.util.List;

import com.example.hotelserver.entity.ThietBi;

public interface ThietBiService {
	boolean themThietBi(ThietBi thietBi);
	List<ThietBi> layTatCaThietBi();
	boolean kiemTraThietBiTonTai(String tenThietBi, double giaThietBi);
	List<ThietBi> timThietBiTheoTen(String tenThietBi);
	ThietBi timThietBiTheoMa(long maThietBi);
}
