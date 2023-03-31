package com.example.hotelserver.controller;

import com.example.hotelserver.dto.HoaDonDto;
import com.example.hotelserver.dto.NhanVienDto;
import com.example.hotelserver.dto.ThongKeSoLanDatDichVuDto;
import com.example.hotelserver.dto.ThongKeSoLanDatPhongDto;
import com.example.hotelserver.entity.HoaDon;
import com.example.hotelserver.repository.*;
import com.example.hotelserver.service.HoaDonService;
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
    @Autowired
    private ChiTietDichVuRepo chiTietDichVuRepo;
    @Autowired
    private HoaDonService hoaDonService;
    @Autowired
    private HoaDonRepo hoaDonRepo;
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
    @PostMapping("/thongKeSoLanDatDichVu")
    public ResponseEntity<List<ThongKeSoLanDatDichVuDto>> thongKeSoLanDatDichVu(@RequestBody Map<String, Object> request) {
        System.out.println("Request Thong Ke Dich Vu Nhan :"+request);
        List<ThongKeSoLanDatDichVuDto> dataFromQuery = new ArrayList<>();
        if (request.get("theo").toString().equals("Số lần đặt dịch vụ")) {
            Instant tuNgay = Instant.parse(request.get("tuNgay").toString());
            Instant denNgay = Instant.parse(request.get("denNgay").toString());
            Date start = Date.from(tuNgay);
            Date end = Date.from(denNgay);
            dataFromQuery = chiTietDichVuRepo.getThongKeSoLanDatDichVu(start,end);
        }
        return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
    }
    @PostMapping("/thongKeDoanhThuTheoPhong")
    public ResponseEntity<List<HoaDonDto>> layThongKeHoaDonTheoNgay(@RequestBody Map<String, Object> request) {
        List<HoaDonDto> hoaDonDtoList = new ArrayList<>();
        hoaDonDtoList=hoaDonService.layDanhSachHoaDonDeThongKeTheoPhong(request);


        return new ResponseEntity<List<HoaDonDto>>(hoaDonDtoList, HttpStatus.OK);

    }

}

