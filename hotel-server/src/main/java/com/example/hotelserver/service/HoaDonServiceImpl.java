package com.example.hotelserver.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hotelserver.dto.HoaDonDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.dto.TaoHoaDonRequestDto;
import com.example.hotelserver.entity.ChiTietHoaDon;
import com.example.hotelserver.entity.HoaDon;
import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.entity.PhieuDatPhong;
import com.example.hotelserver.entity.Phong;
import com.example.hotelserver.repository.ChiTietHoaDonRepo;
import com.example.hotelserver.repository.HoaDonRepo;
import com.example.hotelserver.repository.KhachHangRepo;
import com.example.hotelserver.repository.NhanVienRepo;
import com.example.hotelserver.repository.PhongRepo;

@Service
public class HoaDonServiceImpl implements HoaDonService{
	@Autowired
	private HoaDonRepo hoaDonRepo;

	@Autowired
	private ChiTietHoaDonRepo chiTietHoaDonRepo;
	
	@Autowired
	private NhanVienRepo nhanVienRepo;
	
	@Autowired
	private PhongRepo phongRepo;
	
	@Autowired
	private KhachHangRepo khachHangRepo;
	
	@Override
	public boolean themHoaDon(TaoHoaDonRequestDto hoaDonDto) {
		List<ChiTietHoaDon> dsChiTietHoaDon = new ArrayList<>();
		List<Long> dsMaPhong = hoaDonDto.getDsMaPhong();
		if (!dsMaPhong.isEmpty()) {
			for (Long ma : dsMaPhong) {
				ChiTietHoaDon ct = new ChiTietHoaDon(null, new Phong(ma
						, null, false, null, null, null, null, 0, false, false));
				if (hoaDonDto.getMaHoaDon() != 0) {
					ct.setHoaDon(new HoaDon(hoaDonDto.getMaHoaDon(), null, null, null, 0, null, null, null, null, null));
				}
				dsChiTietHoaDon.add(ct);
			}
		}
		NhanVien tempNV = nhanVienRepo.findById(hoaDonDto.getMaNhanVien()).get();
		KhachHang tempKH = khachHangRepo.findById(hoaDonDto.getMaKhachHang()).get();
		HoaDon hoaDon = new HoaDon(hoaDonDto.getMaHoaDon()
				, hoaDonDto.getNgayLap()
				, hoaDonDto.getNgayNhanPhong()
				, hoaDonDto.getNgayTraPhong()
				, hoaDonDto.getTienNhan()
				, dsChiTietHoaDon, null
				, new PhieuDatPhong(hoaDonDto.getMaPhieuDatPhong(), null, 0, null, null, null, null, null, null) 
				, tempKH
				, tempNV);
		HoaDon newHoaDon = hoaDonRepo.save(hoaDon);
		if (newHoaDon != null) {
			List<ChiTietHoaDon> dsChiTiet = newHoaDon.getDsChiTietHoaDon();
			if (!dsChiTiet.isEmpty()) {
				for (ChiTietHoaDon chiTietHoaDon : dsChiTiet) {
					chiTietHoaDonRepo.save(new ChiTietHoaDon(newHoaDon, chiTietHoaDon.getPhong()));
				}
			}
			return true;
		}
		return false;
	}

	@Override
	public List<HoaDonDto> layHoaDonTheoNgay() {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		try {
			List<HoaDon> dsHoaDon = hoaDonRepo.layHoaDonChuaThanhToanSapXepTheoNgay();
			for (HoaDon hoaDon : dsHoaDon) {
				KhachHang khachHang = khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get();
				System.out.println(khachHangRepo.findById(hoaDon.getKhachHang().getMaKhachHang()).get());
				HoaDonDto hoaDonDto = HoaDonDto.builder()
						.maHoaDon(hoaDon.getMaHoaDon())
						.ngayLap(hoaDon.getNgayLap())
						.ngayNhanPhong(hoaDon.getNgayNhanPhong())
						.ngayTraPhong(hoaDon.getNgayTraPhong())
						.tienNhan(hoaDon.getTienNhan())
						.phieuDatPhong(hoaDon.getPhieuDatPhong())
						.nhanVien(hoaDon.getNhanVien())
						.build();
				List<Phong> dsPhong = new ArrayList<>();
				List<Long> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
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
				hoaDonDto.setDsPhong(phongResponseDtos);
				hoaDonDto.setKhachHang(khachHang);
				System.out.println(khachHang);
				dsHoaDonDto.add(hoaDonDto);
			}
		} catch (Exception e) {
			System.out.println("Error at layPhieuDatPhong: " + e);
		}
		return dsHoaDonDto;
	}

	@Override
	public List<HoaDonDto> layHoaDonTheoNgayCCCD(String cccd) {
		List<HoaDonDto> dsHoaDonDto = new ArrayList<>();
		try {
			KhachHang khachHang = khachHangRepo.timKhachHangBangCCCD(cccd);
			if (khachHang != null) {
				List<HoaDon> dsHoaDon = hoaDonRepo.layHoaDonTheoKhachSapXepTheoNgay(khachHang.getMaKhachHang());
				for (HoaDon hoaDon : dsHoaDon) {
					HoaDonDto hoaDonDto = HoaDonDto.builder()
							.maHoaDon(hoaDon.getMaHoaDon())
							.ngayLap(hoaDon.getNgayLap())
							.ngayNhanPhong(hoaDon.getNgayNhanPhong())
							.ngayTraPhong(hoaDon.getNgayTraPhong())
							.tienNhan(hoaDon.getTienNhan())
							.phieuDatPhong(hoaDon.getPhieuDatPhong())
							.nhanVien(hoaDon.getNhanVien())
							.khachHang(hoaDon.getKhachHang())
							.build();
					List<Phong> dsPhong = new ArrayList<>();
					List<Long> dsMaPhong = hoaDonRepo.layMaPhongTuMaHoaDon(hoaDon.getMaHoaDon());
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
					hoaDonDto.setDsPhong(phongResponseDtos);
					dsHoaDonDto.add(hoaDonDto);
				}
			}
		} catch (Exception e) {
			System.out.println("Error at layPhieuDatPhong: " + e);
		}
		return dsHoaDonDto;
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
