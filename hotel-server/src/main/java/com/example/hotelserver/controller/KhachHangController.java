package com.example.hotelserver.controller;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.entity.KhachHang;
import com.example.hotelserver.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/khachhang")
@RequiredArgsConstructor
public class KhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @GetMapping
    public List<KhachHang> getAllKhachHang() {
        return khachHangService.layAllDanhSachKhachHang();
    }

    @PostMapping
    public ResponseEntity<List<KhachHang>> themKhachHang(@RequestBody KhachHang khachHang) {
        System.out.println("Request Khach Hang nhan :" + khachHang);
        //Nếu khách hàng đó chưa tồn tại
        var a = khachHangService.kiemtraKhachHangTonTai(khachHang.getCccdKhachHang());

        if (!a) {
            if (khachHangService.themKhachHang(khachHang)) {
                return new ResponseEntity<List<KhachHang>>(khachHangService.layAllDanhSachKhachHang(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<List<KhachHang>>(new ArrayList<>(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<List<KhachHang>> capnhatKhachHang(@RequestBody KhachHang khachHang) {
        if (khachHangService.themKhachHang(khachHang)) {
            return new ResponseEntity<List<KhachHang>>(khachHangService.layAllDanhSachKhachHang(), HttpStatus.OK);
        }
        return new ResponseEntity<List<KhachHang>>(khachHangService.layAllDanhSachKhachHang(), HttpStatus.OK);


    }
}

