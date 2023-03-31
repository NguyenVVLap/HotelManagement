package com.example.hotelserver.entity;

import com.example.hotelserver.dto.ThongKeSoLanDatDichVuDto;
import com.example.hotelserver.dto.ThongKeSoLanDatPhongDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NamedNativeQuery(
		name = "thongKeDichVuWithSoLuongDichVu",
		query = "select dv.ma_dich_vu as maDichVu,dv.ten_dich_vu as tenDichVu,dv.gia_dich_vu as giaDichVu,dv.so_luong as soLuongTon,ldv.don_vi_loai_dich_vu as donViTinh,ldv.ten_loai_dich_vu as tenLoaiDichVu,COUNT(*) as tongSoLanDatDichVu from chi_tiet_dich_vu ctdv JOIN hoa_don hd on ctdv.ma_hoa_don=hd.ma_hoa_don JOIN dich_vu dv on dv.ma_dich_vu = ctdv.ma_dich_vu JOIN loai_dich_vu ldv on ldv.ma_loai_dich_vu = dv.ma_loai_dich_vu WHERE hd.ngay_lap BETWEEN :start AND :end GROUP BY dv.ma_dich_vu,dv.ten_dich_vu,dv.gia_dich_vu,dv.so_luong,ldv.don_vi_loai_dich_vu,ldv.ten_loai_dich_vu",
		resultSetMapping = "thong_ke_so_lan_dat_dich_vu_dto"
)
@SqlResultSetMapping(
		name = "thong_ke_so_lan_dat_dich_vu_dto",
		classes = @ConstructorResult(
				targetClass = ThongKeSoLanDatDichVuDto.class,
				columns = {
						@ColumnResult(name = "maDichVu",type = Long.class),
						@ColumnResult(name = "tenDichVu",type = String.class),
						@ColumnResult(name = "giaDichVu",type = Double.class),
						@ColumnResult(name = "soLuongTon",type = Integer.class),
						@ColumnResult(name = "donViTinh",type = String.class),
						@ColumnResult(name = "tenLoaiDichVu",type = String.class),
						@ColumnResult(name = "tongSoLanDatDichVu",type = Double.class),

				}
		)
)
@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@IdClass(ChiTietDichVuPK.class)
@Table(name = "chi_tiet_dich_vu")
public class ChiTietDichVu {
	@Id
	@ManyToOne
	@JoinColumn(name="ma_hoa_don")
	private HoaDon hoaDon;
	
	@Id
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="ma_dich_vu")
	private DichVu dichVu;
	
	@Column(name = "so_luong")
	private int soLuong;
	
	
}
