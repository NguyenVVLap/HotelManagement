package com.example.hotelserver.controller;

import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.dto.RegisterRequest;
import com.example.hotelserver.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/nhanvien")
@RequiredArgsConstructor
public class NhanVienController {
    @Autowired
    private NhanVienService employeeService;
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getALLInfoNhanVien() {
        List<Map<String, Object>> dataFromQuery = employeeService.getAllInfoNhanVienWithAccount();
        if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
    }
    @PostMapping("/timKiemNhanVien")
    public ResponseEntity<List<Map<String, Object>>> timNhanVien(@RequestBody Map<String, Object> request) {
        List<Map<String, Object>> dataFromQuery = new ArrayList<>();
        if (request.get("theo").toString().equals("Theo họ tên")) {
             dataFromQuery = employeeService.getAllInfoNhanVienWithAccountByHoTen(request.get("keyword").toString());

        } else if (request.get("theo").toString().equals("Theo số điện thoại")) {
            try {
               dataFromQuery = employeeService.getAllInfoNhanVienWithAccountByPhone(request.get("keyword").toString());
            } catch (Exception e) {
                System.out.println("Error tim nhan vien " + e);
            }
        }
        return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);





    }
    @PostMapping
    public ResponseEntity<String> themMoiNhanVien(@RequestBody NhanVienDto request) {
        System.out.println("Request them nhan vien controller nhận vào : "+request);
        var a = employeeService.checkNhanVienExist(request.getSoDienThoai(),request.getCccd());
        if(a){
            String token = employeeService.themMoiNhanVien(request);
            if (token == null) {
                return ResponseEntity.ok("Username or Identification already exist");
            }
            else   return ResponseEntity.ok(token);
        }
        else {
            return ResponseEntity.ok("Nhân viên đã tồn tại trong hệ thống");
        }
    }
    @PutMapping
    public ResponseEntity<String> updateNhanVien(@RequestBody NhanVienDto request) {
        System.out.println("Request update nhan vien controller nhận vào : "+request);


            String result = employeeService.capnhatNhanVien(request);
            if (result != null) {
                return ResponseEntity.ok("Update Success");
            }
            else   return ResponseEntity.ok("Update Fail");


    }

}
