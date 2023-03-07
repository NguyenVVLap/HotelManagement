package com.example.hotelserver.dto;

import jakarta.persistence.Entity;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class NhanVienDto {
    private long maNhanVien;
    private String hoTen;
    private String diaChi;
    private String email;
    private String soDienThoai;
    private String cccd;
    private Date ngaySinh;
    private double luongCoBan;
    private Date ngayVaoLam;
    private long maTaiKhoan;
    private String tenTaiKhoan;
    private String matKhau;
    private boolean daKichHoat;
}
