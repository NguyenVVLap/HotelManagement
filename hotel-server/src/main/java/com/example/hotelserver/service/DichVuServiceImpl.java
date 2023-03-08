package com.example.hotelserver.service;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.repository.DichVuRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DichVuServiceImpl implements DichVuService {
    @Autowired
    private DichVuRepo dichVuRepo;
    @Override
    public List<DichVu> layAllDanhSachDichVu() {
        return dichVuRepo.layAllDanhSachDichVu();
    }

    @Override
    public boolean themDichVu(DichVu dv) {
       try{
            dichVuRepo.save(dv);
            return  true;
       }
       catch (Exception e){
           System.out.println("Error at Dich Vu : "+e);
           return false;
       }
    }

    @Override
    public boolean kiemtraDichVuTonTai(String tenDichVu, double giaDichVu) {
        if(dichVuRepo.findByTenAndGiaDichVu(tenDichVu,giaDichVu) !=null){
            return true;
        }
        return false;
    }

    @Override
    public List<DichVu> timDichVuTheoTen(String tenDichVu) {
        return dichVuRepo.findByTenDichVuLike(tenDichVu);
    }

    @Override
    public DichVu timDichVuTheoMa(long maDichVu) {
        return dichVuRepo.findById(maDichVu).get();
    }
}
