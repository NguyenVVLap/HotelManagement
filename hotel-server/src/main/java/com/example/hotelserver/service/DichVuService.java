package com.example.hotelserver.service;

import com.example.hotelserver.entity.DichVu;
import com.example.hotelserver.entity.ThietBi;

import java.util.List;

public interface DichVuService {
    List<DichVu> layAllDanhSachDichVu();
    boolean themDichVu(DichVu dichVu);
    boolean kiemtraDichVuTonTai(String tenDichVu,double giaDichVu);
    List<DichVu> timDichVuTheoTen(String tenDichVu);
    DichVu timDichVuTheoMa(long maDichVu);
}
