package com.example.hotelserver.controller;

import com.example.hotelserver.dto.DichVuRequest;
import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.service.DichVuService;
import com.example.hotelserver.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> addDichVu(@RequestBody DichVuRequest dichVuRequest){
        System.out.println("Request Service nhan dc:"+dichVuRequest);
        String result = dichvuService.addDichVu(dichVuRequest);
        if(result==null){
            return ResponseEntity.ok("Fail");
        }
        else{
            return ResponseEntity.ok(result);
        }


    }
}
