package com.example.hotelserver.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "hoa_don")
public class HoaDon {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ma_hoa_don")
	private long maHoaDon;
	
	@Column(name = "ngay_lap")
	private Date ngayLap;
	
	@Column(name = "ngay_nhan_phong")
	private Date ngayNhanPhong;
	
	@Column(name = "ngay_tra_phong")
	private Date ngayTraPhong;
	
	@Column(name = "tien_nhan")
	private double tienNhan;
	
	@OneToMany(mappedBy = "hoaDon")
	private List<ChiTietHoaDon> dsChiTietHoaDon;
	
	@OneToMany(mappedBy = "hoaDon")
	private List<ChiTietDichVu> dsChiTietDichVu;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ma_phieu_dat_phong")
	private PhieuDatPhong phieuDatPhong;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "ma_khach_hang")
	private KhachHang khachHang;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "ma_nhan_vien")
	private NhanVien nhanVien;
	
	
	public double tinhTongTien() {
		if ((dsChiTietDichVu == null || dsChiTietDichVu.isEmpty()) 
				&& (dsChiTietHoaDon == null || dsChiTietHoaDon.isEmpty())) {
			return 0;
		}
		double result = 0;
		
		for (ChiTietDichVu chiTietDichVu : dsChiTietDichVu) {
			result += chiTietDichVu.getDichVu().getGiaDichVu() * chiTietDichVu.getSoLuong();
		}
		
		for (ChiTietHoaDon chiTietHoaDon : dsChiTietHoaDon) {
			result += chiTietHoaDon.getPhong().getGiaPhong();
		}
		
		return result;
	}
}
