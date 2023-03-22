package com.example.hotelserver.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.hotelserver.dto.DichVuResponseDto;
import com.example.hotelserver.dto.PhongResponseDto;
import com.example.hotelserver.entity.LoaiDichVu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.service.DichVuService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/dichvu")
@RequiredArgsConstructor
public class DichVuController {
    @Autowired
    private DichVuService dichvuService;
    @GetMapping
   public List<DichVu>getAllDichVu(){
        return dichvuService.layAllDanhSachDichVu();
    }
    @PostMapping
  public ResponseEntity<List<DichVuResponseDto>> themDichVu(@RequestBody DichVuResponseDto dichVu){
        System.out.println("Request Loai Dich Vu nhan :"+dichVu.getMaLoaiDichVu());
        System.out.println("Request Dich vu Dto nhan :"+dichVu);
        //Nếu dịch vụ đó chưa tồn tại
        if(!dichvuService.kiemtraDichVuTonTai(dichVu.getTenDichVu(),dichVu.getGiaDichVu())){
            LoaiDichVu ldv = new LoaiDichVu(dichVu.getMaLoaiDichVu(),"","");
            var dv = DichVu.builder().
                    maDichVu(dichVu.getMaDichVu())
                    .tenDichVu(dichVu.getTenDichVu())
                    .giaDichVu(dichVu.getGiaDichVu())
                    .soLuong(dichVu.getSoLuong())
                    .loaiDichVu(ldv)
                    .build();
            if(dichvuService.themDichVu(dv)){
                return new ResponseEntity<List<DichVuResponseDto>>(dichvuService.layTatCaDichVuAndLoaiDichVu(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<List<DichVuResponseDto>>(dichvuService.layTatCaDichVuAndLoaiDichVu(), HttpStatus.OK);
    }
    @PostMapping("/timKiemDichVu")
    public ResponseEntity<List<DichVu>> timKiemDichVu(@RequestBody Map<String, Object> request) {
        List<DichVu> results = new ArrayList<>();
        if (request.get("theo").toString().equals("Theo tên dịch vụ")) {
            results = dichvuService.timDichVuTheoTen(request.get("keyword").toString());
        } else if (request.get("theo").toString().equals("Theo mã dịch vụ")) {
            try {
                results.add(dichvuService.timDichVuTheoMa(Integer.parseInt(request.get("keyword").toString())));
            } catch (Exception e) {
                System.out.println("Error when parse to int " + e);
            }
        }
        return new ResponseEntity<List<DichVu>>(results, HttpStatus.OK);
    }
    @GetMapping("/layAllDichVuAndLoaiDichVu")
    public ResponseEntity<List<DichVuResponseDto>> getAllDichVuAndLoaiDichVu() {
        List<DichVuResponseDto> dataFromQuery = dichvuService.layTatCaDichVuAndLoaiDichVu();
        if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
    }
}
