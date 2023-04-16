import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'

import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import moment from 'moment/moment';

const PopupPrintHoaDonTheoPhong = (props) => {

    const { setOpenPopupPrint, openPopupPrint, dsHoaDonDaThanhToanDeThongKe,dsHoaDonDaThanhToanDeThongKeTheoThang, search, currentTongTienNam,isPrinHoaDonTheoNam ,currentTongTienThang} = props;
    const thongTinNhanVien = localStorage.getItem("nhanVien")
    const nhanVien = JSON.parse(thongTinNhanVien)
    const componentRef = useRef();
    const handlePrint = () => {
        window.print();
    }
    //Hàm tính giờ
    const diff_hours = (dt2, dt1) => {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60 * 60;
        return Math.abs(Math.round(diff));
    };
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




        return priceTong;
    }
    // console.log("Thong tin hoa don theo tháng :", dsHoaDonDaThanhToanDeThongKeTheoThang);
    return (
        <Dialog open={openPopupPrint} fullScreen>
            <DialogTitle>
                <Stack flexDirection='row' justifyContent='space-between'>
                    <Box flexGrow={1}>
                        In báo cáo
                    </Box>
                    <IconButton color="inherit" aria-label="close" onClick={() => {
                        setOpenPopupPrint(false)

                    }}>
                        <CloseIcon />
                    </IconButton>

                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Box ref={componentRef}>
                    <img src="/logo.png" style={{ width: '100px', height: '90px' }} alt="error" />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h3' color='red'>Khách Sạn Sama</Typography>
                    </Box>
                    <Stack flexDirection='column' >
                        <Stack flexDirection='row' >
                            <Typography variant='h5' color='red'>Điện thoại:</Typography>
                            <Typography variant='h5' ml='10px'>+84999555111</Typography>
                        </Stack>
                        <Stack flexDirection='row' >
                            <Typography variant='h5' color='red'>Địa chỉ:</Typography>
                            <Typography variant='h5'>45 Nguyễn Văn Bảo - Quận Gò Vấp - TP Hồ Chí Minh</Typography>
                        </Stack>
                        <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Ngày lập báo cáo:</Typography>
                            <Typography variant='h5' ml='10px'>{search.ngayHienTai.format('DD/MM/YYYY')}</Typography>
                        </Stack>

                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
                        <Typography variant='h4' color='dodgerblue'>Báo cáo doanh thu khách sạn Sama</Typography>
                    </Box>
                    <Stack flexDirection='row' justifyContent='space-between'  >

                        {isPrinHoaDonTheoNam===true ? <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Doanh thu năm:</Typography>
                            <Typography variant='h5' ml='10px'>{search.tuNgay && search.tuNgay.format('YYYY')}</Typography>
                        </Stack> :
                         <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Doanh thu tháng:</Typography>
                            <Typography variant='h5' ml='10px'>{search.tuNgay && search.tuNgay.format('MM/YYYY')}</Typography>
                        </Stack>}

                        {/* <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Đến ngày:</Typography>
                            <Typography variant='h5' ml='10px'>{search.denNgay.format('DD/MM/YYYY')}</Typography>
                        </Stack> */}

                    </Stack>
                    <Paper variant='outlined' sx={{ mt: '11px' }}>
                        <Stack flexDirection='column'>
                            <Stack flexDirection='row' >
                                <Typography variant='h5' color='red'>Họ tên nhân viên:</Typography>
                                <Typography variant='h5' ml='10px'>{nhanVien.hoTen}</Typography>
                            </Stack>
                            <Stack flexDirection='row' >
                                <Typography variant='h5' color='red'>Email:</Typography>
                                <Typography variant='h5' ml='10px'>{nhanVien.email}</Typography>
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'  >

                                <Stack flexDirection='row'>
                                    <Typography variant='h5' color='red'>Địa chỉ:</Typography>
                                    <Typography variant='h5' ml='10px'>{nhanVien.diaChi}</Typography>
                                </Stack>

                                <Stack flexDirection='row'>
                                    <Typography variant='h5' color='red'>Số điện thoại:</Typography>
                                    <Typography variant='h5' ml='10px'>{nhanVien.soDienThoai}</Typography>
                                </Stack>
                            </Stack>

                        </Stack>
                    </Paper>

                    {isPrinHoaDonTheoNam===true && dsHoaDonDaThanhToanDeThongKe && dsHoaDonDaThanhToanDeThongKe.length > 0 &&
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
                                            <TableCell align="center"><Typography>Các phòng đã thuê</Typography></TableCell>
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
                                                            return `Phòng ${phong.maPhong}`
                                                        }
                                                        else {
                                                            return `Phòng ${phong.maPhong},`
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
                        {/* Ds Hóa Đơn Tháng */}
                        {isPrinHoaDonTheoNam===false && dsHoaDonDaThanhToanDeThongKeTheoThang && dsHoaDonDaThanhToanDeThongKeTheoThang.length > 0 &&
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
                                            <TableCell align="center"><Typography>Các phòng đã thuê</Typography></TableCell>
                                            <TableCell align="center"><Typography>Các dịch vụ đã sử dụng</Typography></TableCell>
                                            <TableCell align="center"><Typography>Tiền nhận</Typography></TableCell>
                                            <TableCell align="center"><Typography>Tiền phòng</Typography></TableCell>
                                            <TableCell align="center"><Typography>Tiền dịch vụ</Typography></TableCell>
                                            <TableCell align="center"><Typography>Tổng Tiền</Typography></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dsHoaDonDaThanhToanDeThongKeTheoThang && dsHoaDonDaThanhToanDeThongKeTheoThang.length > 0 ? dsHoaDonDaThanhToanDeThongKeTheoThang.map((data) => (
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
                                                            return `Phòng ${phong.maPhong}`
                                                        }
                                                        else {
                                                            return `Phòng ${phong.maPhong},`
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
                        
                    <Box sx={{ mt: '20px' }}>
                        <Stack flexDirection='row' justifyContent='space-between'  >

                            <Stack flexDirection='row'>

                            </Stack>

                            <Stack flexDirection='row' mt='20px'>
                                <Typography variant='h5' color='red'>Tổng doanh thu của khách sạn:</Typography>
                               {isPrinHoaDonTheoNam===true ?  <Typography variant='h5' ml='10px'>{currentTongTienNam} VND</Typography> :  <Typography variant='h5' ml='10px'>{currentTongTienThang} VND</Typography>}
                            </Stack>
                        </Stack>
                        <Stack flexDirection='row' justifyContent='space-between'  >

                            <Stack flexDirection='row'>

                            </Stack>

                            {/* <Stack flexDirection='row'>

                                <Typography variant='h5'>Tiền nhận : 100 <Divider sx={{ backgroundColor: 'black' }} /> </Typography>
                            </Stack> */}


                        </Stack>
                        <Stack flexDirection='row' justifyContent='space-between'  >

                            <Stack flexDirection='row'>

                            </Stack>

                            {/* <Stack flexDirection='row'>

                                <Typography variant='h5'>Tiền thối lại : 100  </Typography>
                            </Stack> */}


                        </Stack>
                        <Box>
                            <Typography variant='h5' align='center' >
                                Khách sạn Sama Gò Vấp
                            </Typography>
                            <Divider sx={{ backgroundColor: 'black' }} variant='fullWidth' ></Divider>
                        </Box>

                    </Box>
                    <Box>

                    </Box>




                </Box>
                <ReactToPrint trigger={() => (
                    <Button variant='contained' onClick={() => handlePrint()}>Xuất báo cáo</Button>
                )}
                    content={() => componentRef.current}
                />

            </DialogContent>
        </Dialog>
    )
}

export default PopupPrintHoaDonTheoPhong
