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
import { addNhanVien, getAllNhanVienRoute, thongKeSoLanDatPhong, timNhanVien, updateNhanVien } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment/moment';
import { DatePicker, MobileDateTimePicker } from '@mui/x-date-pickers';

function FrmThongKePhong() {
    let ngayHienTai = new Date();
    const [toast, setToast] = useState(null);
    const [dsThongKeSoLanDatPhong, setdsThongKeSoLanDatPhong] = useState(undefined);

    // const [paramNgay, setParamNgay] = useState({
    //     tuNgay: dayjs(ngayHienTai),
    //     denNgay: dayjs(ngayHienTai),
    // })
    const [search, setSearch] = useState({
        tuNgay: undefined,
        denNgay: dayjs(ngayHienTai),
        theo: "Số lần đặt phòng"
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

    const handleThongKePhongTheoSoLanDatPhong = async () => {
        console.log("Thống kê theo :", search);
        const { data } = await axios.post(thongKeSoLanDatPhong, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("Data Thong Ke So Lan Dat Phong :", data);
        if (data) {
            setdsThongKeSoLanDatPhong(data);

        }
    }

    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Thống kê phòng</Typography>
            </Box>
            <Grid container spacing={6} sx={{ mt: '40px' }}>
                <Grid item md={12}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Số lần đặt phòng']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Thống kê phòng theo" disabled />}
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
                    <Button fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatPhong() }} >Thống kê</Button>
                </Grid>
                <Grid item md={4}>
                    <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { }} >Tải lại dữ liệu</Button>
                </Grid>
                <Grid item md={4}>
                    <Button fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatPhong() }} >In thống kê</Button>
                </Grid>



            </Grid>
            {/* Danh sách kết quả thống kê theo số lần đặt phòng */}
            {dsThongKeSoLanDatPhong && dsThongKeSoLanDatPhong.length > 0 &&
                <Paper elevation={10} sx={{ maxHeight: '100%', mt: '30px', overflow: 'auto' }}>
                    <TableContainer component={Paper} elevation={15}>
                        <Table aria-label="user table">
                            <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                                <TableRow>
                                    <TableCell><Typography>Mã phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tên phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Giá phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tầng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Loại phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tổng số lần đặt phòng</Typography></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dsThongKeSoLanDatPhong && dsThongKeSoLanDatPhong.length > 0 ? dsThongKeSoLanDatPhong.map((data) => (
                                    <TableRow key={data.maPhong}  >
                                        <TableCell component="th" scope="row">
                                            {data.maPhong}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tenPhong}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {`${data.giaPhong} VND/giờ`}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tenTang}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tenLoaiPhong}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tongSoLanDat}
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

export default FrmThongKePhong
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