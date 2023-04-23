import { Box, Grid, Paper, TextField, Typography, Button, Radio, Chip, TableContainer, Stack, Autocomplete } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import dayjs from 'dayjs';
import { Toast, ToastContainer, FloatingLabel, Form, Table } from "react-bootstrap";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import axios from 'axios';
import { thongKeSoLanDatDichVu } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';

function FrmThongKeDichVu() {
    let ngayHienTai = new Date();
    const [toast, setToast] = useState(null);
    const [dsThongKeSoLanDatDichVu, setdsThongKeSoLanDatDichVu] = useState(undefined);
    const [tempdsHoaDon, setTempdsHoaDon] = useState(undefined);
    const [dsPhong, setDSPhong] = useState(undefined);
    // const [paramNgay, setParamNgay] = useState({
    //     tuNgay: dayjs(ngayHienTai),
    //     denNgay: dayjs(ngayHienTai),
    // })
    // useEffect(() => {
    //     loadAllRoomFromDB();
    // }, [])
    // const diff_hours = (dt2, dt1) => {
    //     var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    //     diff /= 60 * 60;
    //     return Math.abs(Math.round(diff));
    // };
    // const loadAllRoomFromDB = async () => {
    //     const { data } = await axios.get(getRoomsRoute, {
    //         headers: {
    //             "Content-Type": "application/json;charset=UTF-8",
    //             "Access-Control-Allow-Origin": "http://localhost:3000",
    //             "Access-Control-Allow-Credentials": "true",
    //         },
    //     });
    //     if (data) {
    //         setDSPhong(data)
    //     }
    // }

    const [search, setSearch] = useState({
        tuNgay: undefined,
        denNgay: dayjs(ngayHienTai),
        theo: ""
    });


    const handleOnchangeSelectedCombobox = (e, value) => {

        setSearch({ ...search, theo: value })
    }
    const handlOnChangeTuNgay = (date) => {
        setSearch({ ...search, tuNgay: date })
    }
    const handlOnChangeDenNgay = (date) => {
        setSearch({ ...search, denNgay: date })
    }

    const handleThongKePhongTheoSoLanDatDichVu = async () => {
        console.log("Thống kê theo :", search);
        const { data } = await axios.post(thongKeSoLanDatDichVu, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Data Thong Ke So Lan Dat Dich Vu :", data);
        if (data) {
            setdsThongKeSoLanDatDichVu(data);

        }
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
            {/* <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Thống kê dịch vụ</Typography>
            </Box> */}
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Số lần đặt dịch vụ']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Thống kê dịch vụ theo" disabled />}
                    />
                </Grid>

                <Grid item md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker

                                sx={{ width: '100%' }}
                                label="Từ ngày"
                                value={search && search.tuNgay ? search.tuNgay : ""}

                                onChange={(date) => { handlOnChangeTuNgay(date) }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>

                <Grid item md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker

                                sx={{ width: '100%' }}
                                label="Đến ngày"
                                value={search && search.denNgay ? search.denNgay : dayjs(ngayHienTai)}

                                onChange={(date) => { handlOnChangeDenNgay(date) }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>

                <Grid item md={4}>
                    {search.theo === "Số lần đặt dịch vụ" && <Button fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatDichVu() }} >Thống kê số lần đặt dịch vụ</Button>}

                </Grid>
                <Grid item md={4}>
                    <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { }} >Tải lại dữ liệu</Button>
                </Grid>
                <Grid item md={4}>
                    {search.theo === "Số lần đặt dịch vụ" && <Button fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatDichVu() }} >In thống kê số lần đặt dịch vụ</Button>}
                </Grid>



            </Grid>
            {/* Danh sách kết quả thống kê theo số lần đặt dịch vụ */}
            {dsThongKeSoLanDatDichVu && dsThongKeSoLanDatDichVu.length > 0 &&
                <StyledPaper elevation={10} >

                    <Table striped hover>
                        <thead >
                            <tr>
                                <th><>Mã dịch vụ</></th>
                                <th><>Tên dịch vụ</></th>
                                <th><>Giá dịch vụ</></th>
                                <th><>Số lượng tồn kho</></th>
                                <th><>Đơn vị tính</></th>
                                <th><>Tên loại dịch vụ</></th>
                                <th><>Tổng số lần đặt dịch vụ</></th>

                            </tr>
                        </thead>
                        <tbody>
                            {dsThongKeSoLanDatDichVu && dsThongKeSoLanDatDichVu.length > 0 ? dsThongKeSoLanDatDichVu.map((data) => (
                                <tr key={data.maPhong}  >
                                    <td >
                                        {data.maDichVu}
                                    </td>
                                    <td  >
                                        {data.tenDichVu}
                                    </td>
                                    <td  >
                                        {`${data.giaDichVu.toLocaleString()} VND`}
                                    </td>
                                    <td  >
                                        {data.soLuongTon}
                                    </td>
                                    <td  >
                                        {data.donViTinh}
                                    </td>
                                    <td  >
                                        {data.tenLoaiDichVu}
                                    </td>
                                    <td  >
                                        {data.tongSoLanDatDichVu}
                                    </td>
                                </tr>
                            )) :

                                <Box sx={{ display: 'flex', height: '420px', width: '100%' }}>
                                    <Typography variant='h3'>Chưa có dữ liệu</Typography>
                                </Box>
                            }
                        </tbody>
                    </Table>

                </StyledPaper>}




            {/* Toast Thông báo */}
            {toast && (
                <ToastContainer
                    position="bottom-end"
                    style={{ bottom: "1rem", right: "1rem" }}
                >
                    <Toast
                        onClose={() => setToast(null)}
                        show={toast !== null}
                        bg={toast.bg}
                        autohide={true}
                    >
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">{toast.header}</strong>
                            <small className="text-muted"></small>
                        </Toast.Header>

                    </Toast>
                </ToastContainer>
            )}

        </StyledContainer>
    )
}

export default FrmThongKeDichVu
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