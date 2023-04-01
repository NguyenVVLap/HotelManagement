import { Box, Grid, Paper, TextField, Typography, Button, Radio, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, Autocomplete } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import dayjs from 'dayjs';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import axios from 'axios';
import { thongKeSoLanDatDichVu } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

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
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Thống kê dịch vụ</Typography>
            </Box>
            <Grid container spacing={6} sx={{ mt: '40px' }}>
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
                <Paper elevation={10} sx={{ maxHeight: '100%', mt: '30px', overflow: 'auto' }}>
                    <TableContainer component={Paper} elevation={15}>
                        <Table aria-label="user table">
                            <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                                <TableRow>
                                    <TableCell><Typography>Mã dịch vụ</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tên dịch vụ</Typography></TableCell>
                                    <TableCell align="center"><Typography>Giá dịch vụ</Typography></TableCell>
                                    <TableCell align="center"><Typography>Số lượng tồn kho</Typography></TableCell>
                                    <TableCell align="center"><Typography>Đơn vị tính</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tên loại dịch vụ</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tổng số lần đặt dịch vụ</Typography></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dsThongKeSoLanDatDichVu && dsThongKeSoLanDatDichVu.length > 0 ? dsThongKeSoLanDatDichVu.map((data) => (
                                    <TableRow key={data.maPhong}  >
                                        <TableCell component="th" scope="row">
                                            {data.maDichVu}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tenDichVu}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {`${data.giaDichVu} VND`}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.soLuongTon}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.donViTinh}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tenLoaiDichVu}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tongSoLanDatDichVu}
                                        </TableCell>
                                    </TableRow>
                                )) :

                                    <Box sx={{ display: 'flex', height: '420px', width: '100%' }}>
                                        <Typography variant='h3'>Chưa có dữ liệu</Typography>
                                    </Box>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>}




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