package com.example.hotelserver.service;

import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.entity.NhanVien;

import java.util.List;
import java.util.Map;

public interface NhanVienService {
    List<Map<String, Object>> getAllInfoNhanVienWithAccount();
    NhanVien findBySoDienThoai (String phone);
    public String themMoiNhanVien(NhanVienDto request);
    public boolean checkNhanVienExist(String sdt, String cccd);
}
