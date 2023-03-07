package com.example.hotelserver.service;

import com.example.hotelserver.entity.NhanVien;

import java.util.List;
import java.util.Map;

public interface EmployeeService {
    List<Map<String, Object>> getAllInfoNhanVienWithAccount();
}
