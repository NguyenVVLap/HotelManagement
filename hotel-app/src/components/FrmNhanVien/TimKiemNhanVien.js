import { Box, Grid, Paper, TextField, Typography, Button, Radio, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, Autocomplete } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import axios from 'axios';
import { addNhanVien, getAllNhanVienRoute, timNhanVien, updateNhanVien } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment/moment';
import { parse } from 'date-fns';
function FrmTimKiemNhanVien() {
    // const [dateNgaySinh, setDateNgaySinh] = useState(dayjs('2001-04-30'))
    const [toast, setToast] = useState(null);
    const [dsNhanVien, setDsNhanVien] = useState(undefined);
    const [checkBoxKichHoat, setCheckBoxKichHoat] = useState("true");
    const [nhanVienSelected, setNhanVienSelected] = useState(undefined);
    const [nhanVienMoi, setNhanVienMoi] = useState({
        maNhanVien: 0,
        hoTen: "",
        diaChi: "",
        email: "",
        soDienThoai: "",
        cccd: "",
        ngaySinh: "",
        luongCoBan: 0,
        ngayVaoLam: "",
        matKhau: "",
        daKichHoat: true
    })
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo họ tên"
    });
    const handleChangeTextFieldSearch = (e) => {

        setSearch({ ...search, keyword: e.target.value })
    }
    const handleChangePhoneSearch = (e) => {

        setSearch({ ...search, keyword: "+84" + e.target.value })
    }
    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleRefeshNhanVien = () => {
        loadNhanVienFromDB();
    }
    const handleSearchNhanVien = async () => {
        // console.log("Search tìm kiếm :", search);
        const { data } = await axios.post(timNhanVien, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data) {
            setDsNhanVien(data);
            setNhanVienSelected(undefined);
        }
    }
    useEffect(() => {
        // setNhanVienMoi({ ...nhanVienMoi, daKichHoat: checkBoxKichHoat })
        setNhanVienMoi({ ...nhanVienMoi, daKichHoat: checkBoxKichHoat === "false" ? false : true })
    }, [checkBoxKichHoat])
    const handleOnChange = (e) => {
        setNhanVienMoi({ ...nhanVienMoi, [e.target.name]: e.target.value });
    }
    const handlOnChangeNgayVaoLam = (date) => {
        console.log("Ngày vào làm :", date);
        console.log("Dayjs:", dayjs('2001-04-30'));
        setNhanVienMoi({ ...nhanVienMoi, ngayVaoLam: date })
    }
    const handlOnChangeNgaySinh = (date) => {

        setNhanVienMoi({ ...nhanVienMoi, ngaySinh: date })
    }
    const handlOnChangeDaKichHoat = (e) => {
        setCheckBoxKichHoat(e.target.value);


    }
    const validateAddNhanVien = () => {
        const { diaChi, email, soDienThoai, cccd, matKhau, hoTen } = nhanVienMoi;
        if (hoTen === "") {
            setToast({
                header: "Họ tên không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (email === "") {
            setToast({
                header: "Email không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (diaChi === "") {
            setToast({
                header: "Địa chỉ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (cccd === "") {
            setToast({
                header: "Căn cước không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (soDienThoai === "") {
            setToast({
                header: "Số điện thoại không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (matKhau === "") {
            setToast({
                header: "Mật khẩu không được không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        for (var i = 0; i < dsNhanVien.length; i++) {
            if (soDienThoai === dsNhanVien[i].nhanvien.soDienThoai || cccd === dsNhanVien[i].nhanvien.cccd) {
                setToast({
                    header: "Số điện thoại hoặc căn cước công dân đã tồn tại trên hệ thống !",
                    content: "",
                    bg: "danger",
                    textColor: "#fff",
                });
                return false;
            }
        }

        return true;
    };
    const handleAddNhanVienMoi = async () => {
        const { maNhanVien, hoTen, diaChi, email, soDienThoai, cccd, ngaySinh, luongCoBan, ngayVaoLam, matKhau, daKichHoat } = nhanVienMoi;
        const objectDataADD = {
            maNhanVien, hoTen, diaChi, email, soDienThoai: "+84" + soDienThoai, cccd, ngaySinh, luongCoBan, ngayVaoLam, matKhau, daKichHoat
        }
        console.log("Nhan Vien Moi dc add :", objectDataADD);
        if (nhanVienMoi.maNhanVien === 0 && validateAddNhanVien()) {
            const { data } = await axios.post(addNhanVien, objectDataADD, {}, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            console.log("Response data :", data);
            console.log("messsage data :", data === "Nhân viên đã tồn tại trong hệ thống");
            if (data === "Nhân viên đã tồn tại trong hệ thống") {
                setToast({
                    header: "Thêm nhân viên mới không thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
            else {
                loadNhanVienFromDB();
                setNhanVienMoi(
                    {
                        ...nhanVienMoi,
                        maNhanVien: 0,
                        hoTen: "",
                        diaChi: "",
                        email: "",
                        soDienThoai: "",
                        cccd: "",
                        ngaySinh: "",
                        luongCoBan: 0,
                        ngayVaoLam: "",
                        matKhau: "",
                        daKichHoat: true
                    }
                )
                setToast({
                    header: "Thêm nhân viên mới  thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }


    }

    useEffect(() => {
        loadNhanVienFromDB();
    }, [])
    const loadNhanVienFromDB = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        const { data } = await axios.get(`${getAllNhanVienRoute}`, {}, config);
        // console.log("data nhân viên load from database", data[0].nhanvien.ngayVaoLam);

        setDsNhanVien(data);
    }
    const handleSelected = (nhanvien) => {
        // console.log("Nhan Vien Selected :", nhanvien.nhanvien);
        if (nhanVienSelected && nhanvien.nhanvien.maNhanVien === nhanVienSelected.nhanvien.maNhanVien) {
            setNhanVienSelected(undefined);
        }
        else {
            setNhanVienSelected(nhanvien)
        }
        console.log("Nhan Vien Selected :", nhanvien.nhanvien);

    }
    useEffect(() => {
        if (nhanVienSelected) {
            // console.log("Nhan vien selected ngay vao lam : ", nhanVienSelected.nhanvien.ngayVaoLam);
            // dayjs('2001-04-30')
            const tempNgayVaoLam = moment(nhanVienSelected.nhanvien.ngayVaoLam).format("YYYY-MM-DD");
            const tempNgaySinh = moment(nhanVienSelected.nhanvien.ngayVaoLam).format("YYYY-MM-DD");
            const dateObjetNgayVaoLam = dayjs(tempNgayVaoLam);
            const dateObjetNgaySinh = dayjs(tempNgaySinh);
            // console.log("convert date to Object :", dateObjet);

            setNhanVienMoi({ ...nhanVienSelected.nhanvien, ngayVaoLam: dateObjetNgayVaoLam, ngaySinh: dateObjetNgaySinh, })
            // setNhanVienMoi({ ...nhanVienSelected.nhanvien, ngayVaoLam: dateObjetNgayVaoLam, ngaySinh: dateObjetNgaySinh })
        }
        else {
            setNhanVienMoi({
                maNhanVien: 0,
                hoTen: "",
                diaChi: "",
                email: "",
                soDienThoai: "",
                cccd: "",
                ngaySinh: "",
                luongCoBan: 0,
                ngayVaoLam: "",
                matKhau: "",
                daKichHoat: true
            })
        }
    }, [nhanVienSelected])

    const validateUpdateNhanVien = () => {
        const { diaChi, email, soDienThoai, cccd, matKhau, hoTen } = nhanVienMoi;
        if (hoTen === "") {
            setToast({
                header: "Họ tên không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (email === "") {
            setToast({
                header: "Email không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (diaChi === "") {
            setToast({
                header: "Địa chỉ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (cccd === "") {
            setToast({
                header: "Căn cước không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        return true;
    };
    const handleUpdateNhanVien = async () => {

        if (nhanVienMoi.maNhanVien !== 0 && validateUpdateNhanVien()) {
            // console.log("Data update :", nhanVienMoi);
            const { data } = await axios.put(updateNhanVien, nhanVienMoi, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            if (data === "Update Success") {
                loadNhanVienFromDB();
                setNhanVienSelected(undefined);
                setToast({
                    header: "Cập nhật thông tin nhân viên thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }
    }
    const handleKichHoatTaiKhoan = async (nhanvien) => {
        const dataKichHoat = {
            ...nhanvien, daKichHoat: true
        }
        const { data } = await axios.put(updateNhanVien, dataKichHoat, {}, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },

        })
        if (data === "Update Success") {
            loadNhanVienFromDB();
            setNhanVienSelected(undefined);
            setToast({
                header: "Kích hoạt tài khoản thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
        }

    }
    const handlehuyKichHoatTaiKhoan = async (nhanvien) => {
        const dataHuyKichHoat = {
            ...nhanvien, daKichHoat: false
        }
        const { data } = await axios.put(updateNhanVien, dataHuyKichHoat, {}, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },

        })
        if (data === "Update Success") {
            loadNhanVienFromDB();
            setNhanVienSelected(undefined);
            setToast({
                header: "Khóa tài khoản thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
        }

    }
    // console.log("Nhan vien selected ghi đè nhân viên mới", nhanVienMoi);
    // console.log("checkbox true :", nhanVienMoi.daKichHoat === true);
    // console.log("Nhan vien seledted:", );
    // console.log(" Date khi picker:", nhanVienMoi.ngayVaoLam);
    // console.log("Kiểu dữ liệu Date khi picker:", typeof nhanVienMoi.ngayVaoLam);
    // console.log(" Date load từ database :", dsNhanVien && dsNhanVien[0].nhanvien.ngayVaoLam);
    // console.log("Kiểu dữ liệu Date load từ database :", dsNhanVien && typeof dsNhanVien[0].nhanvien.ngayVaoLam);
    // console.log("Nhan vien moi  :", nhanVienMoi);

    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Tìm nhân viên</Typography>
            </Box>
            <Box sx={{ display: 'flex', height: '100px', mt: '10px' }}>
                {search.theo === "Theo số điện thoại" ?
                    <Box sx={{ width: '50%', alignItems: 'center', display: 'flex' }}>
                        <Chip color="info" label="+84" sx={{ height: '50px', width: '71px', borderRadius: '100px' }} />
                        <TextField id="outlined-search" label="Nhập số điện thoại" type="search" fullWidth onChange={(e) => { handleChangePhoneSearch(e) }} />
                    </Box>
                    : <Box sx={{ width: '50%', alignItems: 'center', display: 'flex' }}>
                        <TextField id="outlined-search" label="Nhập họ tên" type="search" fullWidth onChange={(e) => { handleChangeTextFieldSearch(e) }} />
                    </Box>}

                <Box sx={{ width: '30%', alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Theo số điện thoại', 'Theo họ tên']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Tìm theo" disabled />}
                    />
                </Box>
                <Box sx={{ width: '30%', alignItems: 'center', display: 'flex', marginLeft: '20px', justifyContent: 'space-between' }}>
                    <Button variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleSearchNhanVien() }} >Tìm kiếm</Button>
                    <Button size='medium' variant='contained' startIcon={<CachedOutlinedIcon />} onClick={() => { handleRefeshNhanVien() }}>Tải lại dữ liệu</Button>
                </Box>
            </Box>
            {/* Danh sách Nhân Viên */}
            <Paper elevation={10} sx={{ maxHeight: '100%', mt: '11px', overflow: 'auto' }}>
                <TableContainer component={Paper} elevation={15}>
                    <Table aria-label="user table">
                        <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                            <TableRow>
                                <TableCell><Typography>Mã nhân viên</Typography></TableCell>
                                <TableCell align="center"><Typography>Họ Tên</Typography></TableCell>
                                <TableCell align="center"><Typography>Địa chỉ</Typography></TableCell>
                                <TableCell align="center"><Typography>Căn cước</Typography></TableCell>
                                <TableCell align="center"><Typography>Email</Typography></TableCell>
                                <TableCell align="center"><Typography>Số điện thoại</Typography></TableCell>
                                <TableCell align="center"><Typography>Lương cơ bản</Typography></TableCell>
                                <TableCell align="center"><Typography>Ngày sinh</Typography></TableCell>
                                <TableCell align="center"><Typography>Ngày vào làm</Typography></TableCell>
                                <TableCell align="center"><Typography>Tình trạng</Typography></TableCell>
                                <TableCell align="center"><Typography>Hành động</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dsNhanVien && dsNhanVien.length > 0 ? dsNhanVien.map((data) => (
                                <TableRow key={data.nhanvien.maNhanVien} onClick={() => handleSelected(data)} className={nhanVienSelected && nhanVienSelected.nhanvien.maNhanVien === data.nhanvien.maNhanVien
                                    ? "row-selected"
                                    : ""} >
                                    <TableCell component="th" scope="row">
                                        {data.nhanvien.maNhanVien}
                                    </TableCell>
                                    <TableCell align="center">{data.nhanvien.hoTen}</TableCell>
                                    <TableCell align="center">{data.nhanvien.diaChi}</TableCell>
                                    <TableCell align="center">{data.nhanvien.cccd}</TableCell>
                                    <TableCell align="center">{data.nhanvien.email}</TableCell>
                                    <TableCell align="center">{data.nhanvien.soDienThoai}</TableCell>
                                    <TableCell align="center">{data.nhanvien.luongCoBan}</TableCell>
                                    <TableCell align="center">{data.nhanvien.ngaySinh ? moment(data.nhanvien.ngaySinh).format("DD/MM/YYYY") : "Chưa có dữ liệu "}</TableCell>
                                    <TableCell align="center">{data.nhanvien.ngayVaoLam ? moment(data.nhanvien.ngayVaoLam).format("DD/MM/YYYY") : "Chưa có dữ liệu "}</TableCell>
                                    <TableCell align="center">
                                        {data.nhanvien.daKichHoat ? <Typography variant='h6'>Đã kích hoạt</Typography> : <Typography variant='h6'>Chưa kích hoạt</Typography>}
                                    </TableCell>
                                    <TableCell align="center">{data.nhanvien.daKichHoat ? <Button variant='contained' size='small' sx={{ backgroundColor: 'red' }} onClick={() => { handlehuyKichHoatTaiKhoan(data.nhanvien) }}>Khóa</Button> : <Button onClick={() => { handleKichHoatTaiKhoan(data.nhanvien) }} variant='contained' size='small' sx={{ backgroundColor: 'green' }}>Kích hoạt</Button>}
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
            </Paper>



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

export default FrmTimKiemNhanVien
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