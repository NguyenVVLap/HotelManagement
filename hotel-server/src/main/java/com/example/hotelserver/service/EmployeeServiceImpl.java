package com.example.hotelserver.service;

import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public List<Map<String, Object>> getAllInfoNhanVienWithAccount() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<NhanVien>  listNhanVien = employeeRepo.getAllNhanVien();
        for(NhanVien nv : listNhanVien){
            Map<String, Object> map = new HashMap<>();
           var nhanvienDTO = NhanVienDto.builder().maNhanVien(nv.getMaNhanVien())
                   .hoTen(nv.getHoTen())
                   .diaChi(nv.getDiaChi())
                   .email(nv.getEmail())
                   .soDienThoai(nv.getSoDienThoai())
                   .cccd(nv.getCccd())
                   .ngaySinh(nv.getNgaySinh())
                   .luongCoBan(nv.getLuongCoBan())
                   .ngayVaoLam(nv.getNgayVaoLam())
                   .maTaiKhoan(nv.getTaiKhoan().getMaTaiKhoan())
                   .tenTaiKhoan(nv.getTaiKhoan().getTenTaiKhoan())
                   .matKhau(nv.getTaiKhoan().getMatKhau())
                   .daKichHoat(nv.getTaiKhoan().isDaKichHoat())
                   .build();
            map.put("nhanvien", nhanvienDTO);
            result.add(map);
        }
        return result;
    }


}
