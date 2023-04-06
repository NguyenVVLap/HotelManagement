import { Box, Grid, Paper, TextField, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, Autocomplete, IconButton } from '@mui/material';
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
import { getRoomsRoute, thongKeDoanhThuTheoPhong, thongKeSoLanDatPhong } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';

import { DatePicker } from '@mui/x-date-pickers';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PopupPrintThongKeSoLanDatPhong from './PopupPrintThongKeSoLanDatPhong';

function FrmThongKePhong() {
    let ngayHienTai = new Date();
    const [toast, setToast] = useState(null);
    const [dsThongKeSoLanDatPhong, setdsThongKeSoLanDatPhong] = useState(undefined);
    const [detailReportSoLanDatPhong, setDetailReportSoLanDatPhong] = useState(false);
    const [dsThongKeSoLanDatPhongCustome, setdsThongKeSoLanDatPhongCustome] = useState(undefined);
    const [tempdsHoaDon, setTempdsHoaDon] = useState(undefined);
    const [dsPhong, setDSPhong] = useState(undefined);
    const [openPopupPrintSoLanDatPhong, setOpenPopupPrintSoLanDatPhong] = useState(false);



    useEffect(() => {
        if (dsThongKeSoLanDatPhong) {
            const newDsThongKeSoLanDatPhong = dsThongKeSoLanDatPhong.map((obj) => {
                return {
                    ...obj,
                    số_lần_đặt_phòng: obj.tongSoLanDat
                }
            })
            setdsThongKeSoLanDatPhongCustome(newDsThongKeSoLanDatPhong)
        }

    }, [dsThongKeSoLanDatPhong])
    const diff_hours = (dt2, dt1) => {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60 * 60;
        return Math.abs(Math.round(diff));
    };
    const loadAllRoomFromDB = async () => {
        const { data } = await axios.get(getRoomsRoute, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data) {
            setDSPhong(data)
        }
    }
    const [search, setSearch] = useState({
        tuNgay: undefined,
        denNgay: dayjs(ngayHienTai),
        theo: "",
        ngayHienTai: dayjs(ngayHienTai)
    });
    useEffect(() => {
        handleRefesh();
    }, [search])
    useEffect(() => {
        loadAllRoomFromDB();
    }, [search])
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
    const handleThongKeTongDoanhThuTheoTungPhong = async () => {
        console.log("Thống kê theo :", search);
        const { data } = await axios.post(thongKeDoanhThuTheoPhong, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        // console.log("Data Thong Ke Doanh Thu :", data);
        if (data) {
            setTempdsHoaDon(data);
        }
    }
    const tinhTongTienCuaMoiPhongMangLai = (phong) => {
        let price = 0;
        tempdsHoaDon.map((hoadon) => {
            hoadon.dsPhong.map((phongofHoaDon) => {
                if (phongofHoaDon.maPhong === phong.maPhong) {
                    let giaPhong = phongofHoaDon.giaPhong;
                    let ngayNhan = new Date(hoadon.ngayNhanPhong)
                    let ngayTra = new Date(hoadon.ngayTraPhong);
                    let totalHour = diff_hours(ngayNhan, ngayTra)
                    let tongTien = giaPhong * totalHour;
                    price = Number(price) + Number(tongTien)
                    // price = price + 2;
                }
            })
        })

        return price;
    }
    const handleRefesh = () => {
        setdsThongKeSoLanDatPhong(undefined);
        setdsThongKeSoLanDatPhongCustome(undefined);
        setTempdsHoaDon(undefined);
        setDSPhong(undefined);
    }
    const handleDetailReport = () => {
        setDetailReportSoLanDatPhong(true);
    }
    const handlePrintThongKeSoLanDatPhong = () => {
        setOpenPopupPrintSoLanDatPhong(true);
    }
    // console.log("DSTEMPHOADON:", tempdsHoaDon);
    // console.log("DSPhong:", dsPhong);
    // console.log("SoLanDatPhongCustome:", dsThongKeSoLanDatPhongCustome);
    console.log("DetailReport:", detailReportSoLanDatPhong);
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
                        options={['Số lần đặt phòng', 'Tổng doanh thu theo từng phòng']}
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
                    {search.theo === "Số lần đặt phòng" && <Button fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKePhongTheoSoLanDatPhong() }} >Thống kê số lần đặt phòng</Button>}
                    {search.theo === "Tổng doanh thu theo từng phòng" && <Button fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKeTongDoanhThuTheoTungPhong() }} >Thống kê tổng doanh thu theo từng phòng</Button>}
                </Grid>
                <Grid item md={4}>
                    {search.theo === "Số lần đặt phòng" && <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { handleDetailReport() }} >Xem chi tiết báo cáo</Button>}

                </Grid>
                <Grid item md={4}>
                    {search.theo === "Số lần đặt phòng" && <Button fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrintThongKeSoLanDatPhong() }} >In thống kê số lần đặt phòng</Button>}
                </Grid>



            </Grid>
            {/* Danh sách kết quả thống kê theo số lần đặt phòng */}
            {dsThongKeSoLanDatPhong && dsThongKeSoLanDatPhong.length > 0 && detailReportSoLanDatPhong === true &&
                <Paper elevation={10} sx={{ height: '700px', mt: '30px', overflow: 'auto' }}>
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <Box flexGrow={1}>

                        </Box>
                        <IconButton color="inherit" aria-label="close" onClick={() => {
                            setDetailReportSoLanDatPhong(false);

                        }}>
                            <CloseIcon />
                        </IconButton>

                    </Stack>
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
            {/* Char thống kê số lần đặt phòng */}
            {
                dsThongKeSoLanDatPhong && dsThongKeSoLanDatPhong.length > 0 && detailReportSoLanDatPhong === false &&
                <Stack mt='35px' overflow='auto' >
                    <ResponsiveContainer width="100%" height={700}>
                        <BarChart width={1300} height={500} data={dsThongKeSoLanDatPhongCustome}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tenPhong" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="số_lần_đặt_phòng" fill="#f45c43" />
                        </BarChart>
                    </ResponsiveContainer>
                </Stack>
            }

            {/* Danh Sách Thống kê tổng tiền của từng phòng mang lại cho khách sạn */}
            {dsPhong && dsPhong.length > 0 && tempdsHoaDon && tempdsHoaDon.length > 0 &&
                <Paper elevation={10} sx={{ height: '54%', mt: '30px', overflow: 'auto' }}>
                    <TableContainer component={Paper} elevation={15}>
                        <Table aria-label="user table">
                            <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                                <TableRow>
                                    <TableCell><Typography>Mã phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tên phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Giá phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tầng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Loại phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tổng tiền</Typography></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dsPhong && dsPhong.length > 0 ? dsPhong.map((phong) => (
                                    <TableRow key={phong.maPhong}  >
                                        <TableCell component="th" scope="row">
                                            {phong.maPhong}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {phong.tenPhong}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {`${phong.giaPhong} VND/giờ`}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {phong.tenTang}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {phong.tenLoaiPhong}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {`${tinhTongTienCuaMoiPhongMangLai(phong)} VND`}
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
            <PopupPrintThongKeSoLanDatPhong openPopupPrintSoLanDatPhong={openPopupPrintSoLanDatPhong} setOpenPopupPrintSoLanDatPhong={setOpenPopupPrintSoLanDatPhong} dsThongKeSoLanDatPhong={dsThongKeSoLanDatPhong} search={search} />
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