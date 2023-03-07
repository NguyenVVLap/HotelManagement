package com.example.hotelserver.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DichVuRequest {
    private String tenDichVu;
    private String giaDichVu;
}
