import { Box, Grid, Paper, TextField, Typography, Button, Radio, Chip, TableContainer, Stack, Autocomplete } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Buffer } from 'buffer';
function FrmTestQR() {
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "pay with MoMo";
    var redirectUrl = "https://momo.vn/return";
    var ipnUrl = "https://callback.url/notify";
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = "50000";
    var requestType = "captureWallet"
    var extraData = ""; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
    //puts raw signature
    // console.log("--------------------RAW SIGNATURE----------------")
    // console.log(rawSignature)
    //signature
    const signature = CryptoJS.HmacSHA256(rawSignature, secretkey).toString(CryptoJS.enc.Hex);
    // console.log("--------------------SIGNATURE----------------")
    // console.log(signature)
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en'
    });






    const handleQRMOMO = () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        }
        axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, options)
            .then(response => {
                console.log(`Status: ${response.status}`);
                console.log(`Headers: ${JSON.stringify(response.headers)}`);
                console.log('Body: ');
                console.log(response.data);
                console.log('payUrl: ');
                console.log(response.data.payUrl);
            })
            .catch(error => {
                console.log(`problem with request: ${error.message}`);
            });

    }
    // const handleThongKeTongDoanhThuTheoTungPhong = async () => {
    //     console.log("Thống kê theo :", search);
    //     const { data } = await axios.post(thongKeDoanhThuTheoPhong, search, {
    //         headers: {
    //             "Content-Type": "application/json;charset=UTF-8",
    //             "Access-Control-Allow-Origin": "http://localhost:3000",
    //             "Access-Control-Allow-Credentials": "true",
    //         },
    //     });
    //     // console.log("Data Thong Ke Doanh Thu :", data);
    //     if (data) {
    //         setTempdsHoaDon(data);
    //     }
    // }

    // const tinhTongTienCuaMoiPhongMangLai = (phong) => {
    //     let price = 0;
    //     tempdsHoaDon.map((hoadon) => {
    //         hoadon.dsPhong.map((phongofHoaDon) => {
    //             if (phongofHoaDon.maPhong === phong.maPhong) {
    //                 let giaPhong = phongofHoaDon.giaPhong;
    //                 let ngayNhan = new Date(hoadon.ngayNhanPhong)
    //                 let ngayTra = new Date(hoadon.ngayTraPhong);
    //                 let totalHour = diff_hours(ngayNhan, ngayTra)
    //                 let tongTien = giaPhong * totalHour;
    //                 price = Number(price) + Number(tongTien)
    //                 // price = price + 2;
    //             }
    //         })
    //     })

    //     return price;
    // }
    // console.log("DSTEMPHOADON:", tempdsHoaDon);
    // console.log("DSPhong:", dsPhong);

    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Test QR</Typography>

            </Box>
            <Box>
                <Button variant='contained' onClick={() => handleQRMOMO()}>Click QR</Button>
            </Box>







            {/* Toast Thông báo */}


        </StyledContainer>
    )
}

export default FrmTestQR
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: red; */
  padding: 20px;
  table {
    .row-selected {
      
        background: linear-gradient(to bottom, #ee0979, #ff6a00);
      
    }
  }
`;
const StyledPaper = styled(Paper)`
height: 495px;
overflow: auto;
margin-top: 12px;
&::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`