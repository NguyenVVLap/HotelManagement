package com.example.hotelserver.service;

import com.example.hotelserver.dto.DichVuRequest;
import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.repository.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DichVuServiceImpl implements DichVuService {
    @Autowired
    private ServiceRepo serviceRepo;
    @Override
    public List<DichVu> layAllDanhSachDichVu() {
        return serviceRepo.layAllDanhSachDichVu();
    }

    @Override
    public String addDichVu(DichVuRequest dichVuRequest) {
        double a = Double.parseDouble(dichVuRequest.getGiaDichVu());
       var dichvu = DichVu.builder()
               .tenDichVu(dichVuRequest.getTenDichVu())
               .giaDichVu(a).build();
       serviceRepo.save(dichvu);
       return "success";
    }
}
