package com.example.hotelserver.service;

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
    public boolean themDichVu(DichVu dv) {
       try{
            serviceRepo.save(dv);
            return  true;
       }
       catch (Exception e){
           System.out.println("Error at Dich Vu : "+e);
           return false;
       }
    }

    @Override
    public boolean kiemtraDichVuTonTai(String tenDichVu, double giaDichVu) {
        if(serviceRepo.findByTenAndGiaDichVu(tenDichVu,giaDichVu) !=null){
            return true;
        }
        return false;
    }

    @Override
    public List<DichVu> timDichVuTheoTen(String tenDichVu) {
        return serviceRepo.findByTenDichVuLike(tenDichVu);
    }

    @Override
    public DichVu timDichVuTheoMa(long maDichVu) {
        return serviceRepo.findById(maDichVu).get();
    }
}
