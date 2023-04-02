import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'

import ReactToPrint from 'react-to-print';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import moment from 'moment/moment';

const PopupPrintHoaDonTheoPhong = (props) => {

    const { setOpenPopupPrint, openPopupPrint, dsHoaDonDaThanhToanDeThongKe, search, currentTongTien } = props;
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
    const tinhTongTien = (data) => {
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
    console.log("Thong tin nhan Vien :", JSON.parse(thongTinNhanVien));
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
                        <Typography variant='h4' color='dodgerblue'>Báo cáo doanh thu khách sạn theo phòng</Typography>
                    </Box>
                    <Stack flexDirection='row' justifyContent='space-between'  >

                        <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Từ ngày:</Typography>
                            <Typography variant='h5' ml='10px'>{search.tuNgay && search.tuNgay.format('DD/MM/YYYY')}</Typography>
                        </Stack>

                        <Stack flexDirection='row'>
                            <Typography variant='h5' color='red'>Đến ngày:</Typography>
                            <Typography variant='h5' ml='10px'>{search.denNgay.format('DD/MM/YYYY')}</Typography>
                        </Stack>

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


                                                        tinhTongTien(data)

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

                            <Stack flexDirection='row'>
                                <Typography variant='h5' color='red'>Tổng doanh thu phòng:</Typography>
                                <Typography variant='h5' ml='10px'>{currentTongTien} VND</Typography>
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
                                Cám ơn quý khách và hẹn gặp lại
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
