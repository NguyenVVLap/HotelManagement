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
import PopupPrintHoaDonTheoPhong from './PopupPrintHoaDonTheoPhong';

function FrmThongKeDoanhThu() {
    let ngayHienTai = new Date();

    const [openPopupPrint, setOpenPopupPrint] = useState(false);
    const [toast, setToast] = useState(null);
    const [dsHoaDonDaThanhToanDeThongKe, setDSHoaDonDaThanhToanDeThongKe] = useState(undefined);
    const [dsTongTien, setDSTongTien] = useState([]);
    const [currentTongTien, setCurrentTongTien] = useState(0);
    const dsTongTienTemp = [];
    const dsTongTienPhongTempThang4 = [];
    const dsTongTienPhongTempThang3 = [];
    const [dsHoaDonChartTheoThang, setDSHoaDonChartTheoThang] = useState([]);
    const [dsHoaDonChartTheoThang4, setDSHoaDonChartTheoThang4] = useState(undefined);
    const [dsHoaDonChartTheoThang3, setDSHoaDonChartTheoThang3] = useState(undefined);





    const tinhTongTienPhong = (data) => {
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
        return prices;
    }

    const tinhTongTienDichVu = (data) => {
        let priceDichVu = 0;
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )

        // dsTongTienTemp.push(priceDichVu)


        return priceDichVu;
    }
    const tinhTongTienPhongVaDichVu = (data) => {
        let pricePhong = 0;
        let priceDichVu = 0;
        let priceTong = 0
        data.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(data.ngayNhanPhong)
            let ngayTra = new Date(data.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            pricePhong = Number(pricePhong) + Number(tongTien)

        }
        )
        data.dsChiTietDichVuDto.map((dv, index) => {
            let soLuong = dv.soLuong;
            let giaDichVu = dv.giaDichVu;
            let tongTien = soLuong * giaDichVu;
            priceDichVu = Number(priceDichVu) + Number(tongTien)

        }
        )
        priceTong = pricePhong + priceDichVu
        dsTongTienTemp.push(priceTong)
        return priceTong;
    }
    useEffect(() => {
        if (tinhTongTienPhong) {
            if (dsTongTienTemp.length > 0) {
                // console.log("Tong Tien Reduce:", dsTongTienTemp.reduce((preValue, currentValue) => preValue + currentValue));
                setCurrentTongTien(dsTongTienTemp.reduce((preValue, currentValue) => preValue + currentValue))
            }
        }
    }, [dsHoaDonDaThanhToanDeThongKe])

    useEffect(() => {
        createObjectHoaDonTheoThang();
        if (dsHoaDonChartTheoThang3 && dsHoaDonChartTheoThang3.length > 0) {
            setDSHoaDonChartTheoThang([...dsHoaDonChartTheoThang, dsHoaDonChartTheoThang3])
        }
        if (dsHoaDonChartTheoThang4 && dsHoaDonChartTheoThang4.length > 0) {
            setDSHoaDonChartTheoThang([...dsHoaDonChartTheoThang, dsHoaDonChartTheoThang4])
        }
    }, [dsHoaDonDaThanhToanDeThongKe])
    useEffect(() => {

        if (dsHoaDonChartTheoThang3 && dsHoaDonChartTheoThang3.length > 0) {
            console.log("UseEffcet tháng 3");
        }
        if (dsHoaDonChartTheoThang4 && dsHoaDonChartTheoThang4.length > 0) {
            console.log("UseEffcet tháng 4");
        }
    }, [dsHoaDonDaThanhToanDeThongKe])
    const [search, setSearch] = useState({
        tuNgay: undefined,
        denNgay: dayjs(ngayHienTai),
        theo: "",
        ngayHienTai: dayjs(ngayHienTai)
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

    const handleThongKeDoanhThuTheoPhong = async () => {
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
            setDSHoaDonDaThanhToanDeThongKe(data);

        }
    }
    const handlePrint = () => {

        setOpenPopupPrint(true);
    }
    const tinhTongTienPhongThang4 = (hoadon, month) => {
        console.log("month:", month);

        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang4.push(prices);
        return prices;
    }
    const tinhTongTienPhongThang3 = (hoadon, month) => {
        // console.log("month:", month);
        let prices = 0;
        hoadon.dsPhong.map((phong, index) => {
            let giaPhong = phong.giaPhong;
            let ngayNhan = new Date(hoadon.ngayNhanPhong)
            let ngayTra = new Date(hoadon.ngayTraPhong);
            let totalHour = diff_hours(ngayNhan, ngayTra)

            let tongTien = giaPhong * totalHour;

            prices = Number(prices) + Number(tongTien)

        }
        )
        dsTongTienPhongTempThang3.push(prices);
        return prices;
    }
    const createObjectHoaDonTheoThang = () => {

        dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 && dsHoaDonDaThanhToanDeThongKe.map((hoadon, index) => {
            let stringDate = moment(hoadon.ngayLap).format("DD/MM/YYYY");
            let [day, month, year] = stringDate.split("/");


            if (month === 4) {
                console.log("Chạy tháng 4");
                tinhTongTienPhongThang4(hoadon, month)
                if (tinhTongTienPhongThang4) {
                    if (dsTongTienPhongTempThang4.length > 0) {
                        console.log("Tong Tien Tháng Tư Reduce:", dsTongTienPhongTempThang4.reduce((preValue, currentValue) => preValue + currentValue));
                        setDSHoaDonChartTheoThang4({
                            name: 'Tháng 4',
                            tienPhong: dsTongTienPhongTempThang4.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }

            }
            else if (month === 3) {
                console.log("Chạy tháng 3");
                tinhTongTienPhongThang3(hoadon, month)
                if (tinhTongTienPhongThang3) {
                    if (dsTongTienPhongTempThang3.length > 0) {
                        console.log("Tong Tien Tháng ba Reduce:", dsTongTienPhongTempThang3.reduce((preValue, currentValue) => preValue + currentValue));
                        setDSHoaDonChartTheoThang3({
                            name: 'Tháng 3',
                            tienPhong: dsTongTienPhongTempThang3.reduce((preValue, currentValue) => preValue + currentValue)
                        })

                    }
                }
            }

            // if (month === "03") {
            //     console.log("Chạy tháng 3");
            //     setDSHoaDonChartTheoThang([...dsHoaDonChartTheoThang, {
            //         name: 'Tháng 3'
            //     }])
            // }
            tinhTongTienPhongThang4(hoadon, month)
            if (tinhTongTienPhongThang4) {
                if (dsTongTienPhongTempThang4.length > 0) {
                    console.log("Tong Tien Tháng Tư Reduce:", dsTongTienPhongTempThang4.reduce((preValue, currentValue) => preValue + currentValue));
                    setDSHoaDonChartTheoThang([...dsHoaDonChartTheoThang, {
                        name: 'Tháng 4',
                        tienPhong: dsTongTienPhongTempThang4.reduce((preValue, currentValue) => preValue + currentValue)

                    }])

                }
            }


            // if (month === "03") {
            //     tinhTongTienPhongThang3(hoadon, month)
            //     if (tinhTongTienPhongThang3) {
            //         if (dsTongTienPhongTempThang3.length > 0) {
            //             console.log("Tong Tien Tháng Ba Reduce:", dsTongTienPhongTempThang3.reduce((preValue, currentValue) => preValue + currentValue));
            //             setDSHoaDonChartTheoThang([{
            //                 name: 'Tháng 3',
            //                 tienPhong: dsTongTienPhongTempThang3.reduce((preValue, currentValue) => preValue + currentValue)

            //             }])

            //         }
            //     }

            // }

        })

    }
    // console.log("State Tong Tien  : ", currentTongTien);
    console.log("DSThanhToanDeThongKe:", dsHoaDonDaThanhToanDeThongKe);
    console.log("dsChartThang:", dsHoaDonChartTheoThang);
    console.log("dsChartThang4:", dsHoaDonChartTheoThang4);
    console.log("dsChartThang3:", dsHoaDonChartTheoThang3);
    console.log("dsTongTienTempThang4:", dsTongTienPhongTempThang4);
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
                    {search.theo === "Theo phòng" && <Button fullWidth variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleThongKeDoanhThuTheoPhong() }} >Thống kê doanh thu theo phòng</Button>}
                </Grid>
                <Grid item md={4}>
                    <Button fullWidth variant='contained' startIcon={<CachedOutlinedIcon />} size='medium' onClick={() => { }} >Tải lại dữ liệu</Button>
                </Grid>
                <Grid item md={4}>
                    {search.theo === "Theo phòng" && <Button fullWidth variant='contained' endIcon={<LocalPrintshopOutlinedIcon />} size='medium' onClick={() => { handlePrint() }} >In thống kê doanh thu theo phòng</Button>}
                </Grid>



            </Grid>
            {/* Danh sách kết quả thống kê theo doanh thu theo phòng và dịch vụ */}
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
                                    <TableCell align="center"><Typography>Các dịch vụ đã sử dụng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tiền nhận</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tiền phòng</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tiền dịch vụ</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tổng Tiền</Typography></TableCell>

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
                                            {data.dsPhong.map((phong, index) => {
                                                if (index === data.dsPhong.length - 1) {
                                                    return `${phong.tenPhong}`
                                                }
                                                else {
                                                    return `${phong.tenPhong},`
                                                }

                                            })}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.dsChiTietDichVuDto.length > 0 ? data.dsChiTietDichVuDto.map((dv, index) => {
                                                if (index === data.dsChiTietDichVuDto.length - 1) {
                                                    return `${dv.soLuong} ${dv.tenDichVu}(${dv.tenLoaiDichVu})`
                                                }
                                                else {
                                                    return ` ${dv.soLuong} ${dv.tenDichVu}(${dv.tenLoaiDichVu}),`
                                                }

                                            }) : 'Không có'}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.tienNhan}
                                        </TableCell>

                                        <TableCell component="th" scope="row" align='center'>

                                            {
                                                tinhTongTienPhong(data)
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>

                                            {


                                                tinhTongTienDichVu(data)

                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>

                                            {


                                                tinhTongTienPhongVaDichVu(data)

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
            <PopupPrintHoaDonTheoPhong openPopupPrint={openPopupPrint} setOpenPopupPrint={setOpenPopupPrint} dsHoaDonDaThanhToanDeThongKe={dsHoaDonDaThanhToanDeThongKe} currentTongTien={currentTongTien} search={search} />
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