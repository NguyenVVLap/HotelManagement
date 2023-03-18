package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.PhieuDatPhongDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.dto.ThemPhieuDto;
import com.example.hotelserver.entity.ChiTietPhieuDatPhong;
import com.example.hotelserver.entity.PhieuDatPhong;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.repository.ChiTietPhieuDatPhongRepo;
import com.example.hotelserver.repository.PhieuDatPhongRepo;
import com.example.hotelserver.repository.PhongRepo;

@Service
public class PhieuDatPhongServiceImpl implements PhieuDatPhongService {
	@Autowired
	private PhieuDatPhongRepo phieuDatPhongRepo;

	@Autowired
	private ChiTietPhieuDatPhongRepo chiTietPhieuDatPhongRepo;

	@Autowired
	private PhongRepo phongRepo;

	@Override
	public boolean themPhieuDatPhong(ThemPhieuDto phieuDatPhongDto) {
		List<ChiTietPhieuDatPhong> chiTietPhieuDatPhongs = new ArrayList<>();
		
		List<Long> dsMaPhong = phieuDatPhongDto.getDsMaPhong();
		if (!dsMaPhong.isEmpty()) {
			for (Long ma : dsMaPhong) {
				ChiTietPhieuDatPhong ct = new ChiTietPhieuDatPhong(null, new Phong(ma
						, null, false, null, null, null, null, 0, false, false));
				chiTietPhieuDatPhongs.add(ct);
			}
		}
		
		PhieuDatPhong phieuDatPhong = new PhieuDatPhong(phieuDatPhongDto.getMaPhieuDatPhong()
				, phieuDatPhongDto.getNgayDatPhong()
				, phieuDatPhongDto.getGiamGia()
				, phieuDatPhongDto.getGhiChuDatPhong()
				, phieuDatPhongDto.getNgayNhanPhong()
				, phieuDatPhongDto.getNgayTraPhong()
				, phieuDatPhongDto.getTrangThaiDatPhong()
				, chiTietPhieuDatPhongs
				, phieuDatPhongDto.getKhachHang());
		PhieuDatPhong newPhieuDatPhong = phieuDatPhongRepo.save(phieuDatPhong);
		if (newPhieuDatPhong != null) {
			List<ChiTietPhieuDatPhong> dsChiTiet = newPhieuDatPhong.getDsChiTietPhieuDatPhong();
			if (!dsChiTiet.isEmpty()) {
				for (ChiTietPhieuDatPhong chiTietPhieuDatPhong : dsChiTiet) {
					chiTietPhieuDatPhongRepo.save(new ChiTietPhieuDatPhong(newPhieuDatPhong, chiTietPhieuDatPhong.getPhong()));
				}
			}
			return true;
		}
//		if (!dsChiTietPhieuDatPhong.isEmpty()) {
//			PhieuDatPhong newPhieuDatPhong = phieuDatPhongRepo.save(phieuDatPhong);
//			if (newPhieuDatPhong != null) {
//				for (ChiTietPhieuDatPhong chiTietPhieuDatPhong : dsChiTietPhieuDatPhong) {
//					chiTietPhieuDatPhongRepo.save(chiTietPhieuDatPhong);
//				}
//				return true;
//			}
//		}
		return false;
	}

	@Override
	public List<PhieuDatPhongDto> layPhieuDatPhong() {
		// TODO Auto-generated method stub
		List<PhieuDatPhongDto> dsPhieuDatPhongDto = new ArrayList<>();
		try {
			List<PhieuDatPhong> dsPhieuDatPhong = phieuDatPhongRepo.findAll();
			for (PhieuDatPhong phieuDatPhong : dsPhieuDatPhong) {
				PhieuDatPhongDto phieuDatPhongDto = PhieuDatPhongDto.builder()
						.maPhieuDatPhong(phieuDatPhong.getMaPhieuDatPhong())
						.ngayDatPhong(phieuDatPhong.getNgayDatPhong())
						.giamGia(phieuDatPhong.getGiamGia())
						.ghiChuDatPhong(phieuDatPhong.getGhiChuDatPhong())
						.ngayNhanPhong(phieuDatPhong.getNgayNhanPhong())
						.ngayTraPhong(phieuDatPhong.getNgayTraPhong())
						.trangThaiDatPhong(phieuDatPhong.getTrangThaiDatPhong())
						.khachHang(phieuDatPhong.getKhachHang())
						.build();
				List<Phong> dsPhong = new ArrayList<>();
				List<Long> dsMaPhong = phieuDatPhongRepo.layMaPhongTuMaPhieu(phieuDatPhong.getMaPhieuDatPhong());
				if (!dsMaPhong.isEmpty()) {
					for (long maPhong : dsMaPhong) {
						Phong phong = phongRepo.findById(maPhong).get();
						dsPhong.add(phong);
					}
				}
				List<PhongResponseDto> phongResponseDtos = new ArrayList<>();
				if (!dsPhong.isEmpty()) {
					for (Phong phong : dsPhong) {
						phongResponseDtos.add(convertPhongToPhongDto(phong));
					}
				}
				phieuDatPhongDto.setDsPhong(phongResponseDtos);
				dsPhieuDatPhongDto.add(phieuDatPhongDto);
			}
		} catch (Exception e) {
			System.out.println("Error at layPhieuDatPhong: " + e);
		}
		return dsPhieuDatPhongDto;
	}

	public PhongResponseDto convertPhongToPhongDto(Phong phong) {
		PhongResponseDto phongResponseDto = new PhongResponseDto(phong.getMaPhong()
				, phong.getTenPhong(), phong.isTrangThaiPhong(), phong.getHinhAnhPhong()
				, phong.getMoTaPhong()
				, phong.getTang().getMaTang(), phong.getTang().getTenTang()
				, phong.getLoaiPhong().getMaLoaiPhong(), phong.getLoaiPhong().getTenLoaiPhong()
				, phong.getGiaPhong(), phong.getLoaiPhong().getSucChua()
				, phong.isDuocHutThuoc(), phong.isMangThuCung()
				, phong.getLoaiPhong().getSoGiuong());
		return phongResponseDto;
	}
}
