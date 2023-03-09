package com.example.hotelserver.controller;

import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.dto.RegisterRequest;
import com.example.hotelserver.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping
    public ResponseEntity<String> themMoiNhanVien(@RequestBody NhanVienDto request) {
        System.out.println("Request them nhan vien controller nhận vào : "+request);
        String token = employeeService.themMoiNhanVien(request);
        if (token == null) {
            return ResponseEntity.ok("Username or Identification already exist");
        }
        return ResponseEntity.ok(token);
    }
}
