package com.example.hotelserver.controller;

import com.example.hotelserver.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(path= "/api/nhanvien")
@RequiredArgsConstructor
public class NhanVienController {
    @Autowired
    private EmployeeService employeeService;
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getALLInfoNhanVien() {
        List<Map<String, Object>> dataFromQuery = employeeService.getAllInfoNhanVienWithAccount();
        if (dataFromQuery == null ||dataFromQuery.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(dataFromQuery, HttpStatus.OK);
    }
}
