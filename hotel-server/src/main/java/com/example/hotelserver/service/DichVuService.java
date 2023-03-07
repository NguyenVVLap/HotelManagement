package com.example.hotelserver.service;

import com.example.hotelserver.dto.DichVuRequest;
import com.example.hotelserver.entity.DichVu;

import java.util.List;

public interface DichVuService {
    List<DichVu> layAllDanhSachDichVu();
    String addDichVu(DichVuRequest dichVuRequest);
}
