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
import { addNhanVien, getAllNhanVienRoute, thongKeDoanhThuTheoPhong, thongKeSoLanDatPhong, timNhanVien, updateNhanVien } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment/moment';
import { DatePicker, MobileDateTimePicker } from '@mui/x-date-pickers';

function FrmThongKeDoanhThu() {
    let ngayHienTai = new Date();


    const [toast, setToast] = useState(null);
    const [dsHoaDonDaThanhToanDeThongKe, setDSHoaDonDaThanhToanDeThongKe] = useState(undefined);

    const dsTongTienTemp = [];


    // console.log("Arrray Tong Tien Temp :", arrayTongTienTemp);
    const tinhTongTien = (data, dsTongTienTemp) => {
        let prices = 0;
        data.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(data.ngayNhanPhong)
            let ngayTra = new Date(data.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )



        dsTongTienTemp.push(Number(prices))
        return prices;

    }

    const [search, setSearch] = useState({
        tuNgay: undefined,
        denNgay: dayjs(ngayHienTai),
        theo: ""
    });
    //Hàm tính giờ
    const diff_hours = (dt2, dt1) => {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60 * 60;
        return Math.abs(Math.round(diff));
    };

    const handleOnchangeSelectedCombobox = (e, value) => {

        setSearch({ ...search, theo: value })
    }
    const handlOnChangeTuNgay = (date) => {
        setSearch({ ...search, tuNgay: date })
    }
    const handlOnChangeDenNgay = (date) => {
        setSearch({ ...search, denNgay: date })
    }

    const handleThongKePhongTheoSoLanDatPhong = async () => {
        console.log("Thống kê theo :", search);
        const { data } = await axios.post(thongKeDoanhThuTheoPhong, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Data Thong Ke Doanh Thu :", data);
        if (data) {
            setDSHoaDonDaThanhToanDeThongKe(data);

        }
    }
    console.log("DSTongTien Temp : ", dsTongTienTemp);
    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Thống kê doanh thu</Typography>
            </Box>
            <Grid container spacing={6} sx={{ mt: '40px' }}>
                <Grid item md={12}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Theo phòng']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Thống kê doanh thu" disabled />}
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
                    {search.theo === "Theo phòng" && <Button fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatPhong() }} >Thống kê doanh thu theo phòng</Button>}
                </Grid>
                <Grid item md={4}>
                    <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { }} >Tải lại dữ liệu</Button>
                </Grid>
                <Grid item md={4}>
                    {search.theo === "Theo phòng" && <Button fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatPhong() }} >In thống kê doanh thu</Button>}
                </Grid>



            </Grid>
            {/* Danh sách kết quả thống kê theo số lần đặt phòng */}
            {dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 &&
                <Paper elevation={10} sx={{ maxHeight: '100%', mt: '30px', overflow: 'auto' }}>
                    <TableContainer component={Paper} elevation={15}>
                        <Table aria-label="user table">
                            <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                                <TableRow>
                                    <TableCell><Typography>Mã hoá đơn</Typography></TableCell>
                                    <TableCell align="center"><Typography>Ngày lập hoá đơn</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tên khách hàng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Nhân viên lập hoá đơn</Typography></TableCell>
                                    <TableCell align="center"><Typography>Ngày nhận phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Ngày trả phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Các phòng khách thuê</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tiền nhận</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tổng tiền</Typography></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 ? dsHoaDonDaThanhToanDeThongKe.map((data) => (
                                    <TableRow key={data.maHoaDon}  >
                                        <TableCell component="th" scope="row">
                                            {data.maHoaDon}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {moment(data.ngayLap).format(
                                                "DD/MM/YYYY HH:MM"
                                            )}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.khachHang.hoTen}
                                        </TableCell>

                                        <TableCell component="th" scope="row" align='center'>
                                            {data.nhanVien.hoTen}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {moment(data.ngayNhanPhong).format(
                                                "DD/MM/YYYY HH:MM"
                                            )}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {moment(data.ngayTraPhong).format(
                                                "DD/MM/YYYY HH:MM"
                                            )}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.dsPhong.map((phong) => {
                                                return `${phong.tenPhong},`
                                            })}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tienNhan}
                                        </TableCell>

                                        <TableCell component="th" scope="row" align='center'>

                                            {

                                                tinhTongTien(data, dsTongTienTemp)

                                            }
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

export default FrmThongKeDoanhThu
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