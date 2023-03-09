package com.example.hotelserver.service;

import com.example.hotelserver.config.JwtService;
import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.entity.NhanVien;
import com.example.hotelserver.entity.TaiKhoan;
import com.example.hotelserver.entity.VaiTro;
import com.example.hotelserver.repository.NhanVienRepo;
import com.example.hotelserver.repository.TaiKhoanRepo;
import com.example.hotelserver.repository.VaiTroRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private NhanVienRepo employeeRepo;
    private final PasswordEncoder passwordEncoder;
    private final VaiTroRepo vaiTroRepo;
    private final TaiKhoanRepo taiKhoanRepo;
    private final JwtService jwtService;
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

    @Override
    public NhanVien findBySoDienThoai(String phone) {
        return employeeRepo.findBySoDienThoai(phone);
    }

    @Override
    public String themMoiNhanVien(NhanVienDto request) {
        System.out.println("Request thêm mới nhân viên nhận vào : "+request);
        if(checkNhanVienExist(request.getSoDienThoai(),request.getCccd())){
            VaiTro role = vaiTroRepo.findByTenVaiTro("ROLE_EMPLOYEE");
            if (role == null) {
                role = new VaiTro(0, "ROLE_EMPLOYEE");
                vaiTroRepo.save(role);
            }
            var taikhoan = TaiKhoan.builder()
                    .tenTaiKhoan(request.getSoDienThoai())
                    .matKhau(passwordEncoder.encode(request.getMatKhau()))
                    .daKichHoat(true)
                    .vaiTro(role)
                    .build();
            taiKhoanRepo.save(taikhoan);
            Date ngayVaoLam = new Date();
            var newNhanVien = NhanVien.builder().hoTen(request.getHoTen())
                    .cccd(request.getCccd())
                    .email(request.getEmail())
                    .diaChi(request.getDiaChi())
                    .luongCoBan(request.getLuongCoBan())
                    .ngaySinh(request.getNgaySinh())
                    .ngayVaoLam(ngayVaoLam).soDienThoai(request.getSoDienThoai()).taiKhoan(taikhoan).build();
            employeeRepo.save(newNhanVien);
            String jwtToken = jwtService.generateToken(taikhoan);
            return jwtToken;
        }
        else {
            return null;
        }


    }
    @Override
    public boolean checkNhanVienExist(String sdt, String cccd) {
        if (taiKhoanRepo.findByTenTaiKhoan(sdt).isEmpty() &&
                employeeRepo.findByCccd(cccd) == null) {
            return true;
        }
        return false;
    }


}
