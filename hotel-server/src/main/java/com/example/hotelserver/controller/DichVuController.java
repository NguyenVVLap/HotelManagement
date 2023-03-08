package com.example.hotelserver.controller;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.entity.ThietBi;
import com.example.hotelserver.service.DichVuService;
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
  public ResponseEntity<List<DichVu>> themDichVu(@RequestBody DichVu dichVu){
        System.out.println("Request Dich vu nhan :"+dichVu);
        //Nếu dịch vụ đó chưa tồn tại
        if(!dichvuService.kiemtraDichVuTonTai(dichVu.getTenDichVu(),dichVu.getGiaDichVu())){
            if(dichvuService.themDichVu(dichVu)){
                return new ResponseEntity<List<DichVu>>(dichvuService.layAllDanhSachDichVu(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<List<DichVu>>(dichvuService.layAllDanhSachDichVu(), HttpStatus.OK);
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
}
