package com.example.hotelserver.controller;

import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.dto.ThongKeSoLanDatPhongDto;
import com.example.hotelserver.repository.ChiTietPhieuDatPhongRepo;
import com.example.hotelserver.repository.NhanVienRepo;
import com.example.hotelserver.repository.TaiKhoanRepo;
import com.example.hotelserver.repository.VaiTroRepo;
import com.example.hotelserver.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/thongke")
@RequiredArgsConstructor
public class ThongKeController {
    @Autowired
    private ChiTietPhieuDatPhongRepo chiTietPhieuDatPhongRepo;

    @PostMapping("/thongKeSoLanDatPhong")
    public ResponseEntity<List<ThongKeSoLanDatPhongDto>> thongKeSoLanDatPhong(@RequestBody Map<String, Object> request) {
        System.out.println("Request Nhận Thống Kế Số lần dặt phòng : "+request);
        List<ThongKeSoLanDatPhongDto> dataFromQuery = new ArrayList<>();
        if (request.get("theo").toString().equals("Số lần đặt phòng")) {
            Instant tuNgay = Instant.parse(request.get("tuNgay").toString());
            Instant denNgay = Instant.parse(request.get("denNgay").toString());
            Date start = Date.from(tuNgay);
            Date end = Date.from(denNgay);
            System.out.println("Data From Query:"+chiTietPhieuDatPhongRepo.getThongKeSoLanDatPhong(start,end));

            dataFromQuery = chiTietPhieuDatPhongRepo.getThongKeSoLanDatPhong(start,end);
        }
        return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
    }



}
