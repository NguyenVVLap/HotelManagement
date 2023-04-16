import { Autocomplete, Box, Button, Chip, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Toast, ToastContainer } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import { addKhachHang, getAllKhachHangRoute, timKiemKhachHang, updateKhachHang } from '../../utils/APIRoutes';
import axios from 'axios';
function FrmKhachHang() {
    const [toast, setToast] = useState(null);
    const [khachHangSelected, setKhachHangSelected] = useState(undefined);
    const [dsKhachHang, setDsKhachHang] = useState(undefined);
    const [khachHangMoi, setKhachHangMoi] = useState({
        maKhachHang: 0,
        hoTen: "",
        cccdKhachHang: "",
        soDienThoaiKH: "",
        diaChiKH: "",
        emailKH: "",
    });
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo căn cước công dân"
    });

    useEffect(() => {
        loadKhachHangFromDB();
    }, [])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi
    useEffect(() => {
        if (khachHangSelected) {
            setKhachHangMoi(khachHangSelected)
        }
        else {
            setKhachHangMoi({
                maKhachHang: 0,
                hoTen: "",
                cccdKhachHang: "",
                soDienThoaiKH: "",
                diaChiKH: "",
                emailKH: "",
            })
        }
    }, [khachHangSelected])
    const loadKhachHangFromDB = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        const { data } = await axios.get(`${getAllKhachHangRoute}`, {}, config);
        // console.log("data khach hang load from database", data);
        setDsKhachHang(data);
    }
    const handleSelected = (khachhang) => {
        // console.log("Khach Hang :", khachhang);
        if (khachHangSelected && khachhang.maKhachHang === khachHangSelected.maKhachHang) {
            setKhachHangSelected(undefined);
        }
        else {
            setKhachHangSelected(khachhang)
        }

    }
    const handleOnChange = (e) => {
        setKhachHangMoi({ ...khachHangMoi, [e.target.name]: e.target.value });
    }
    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleChangeTextFieldSearch = (e) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, keyword: e.target.value })
    }

    const validateAdd = () => {
        const { cccdKhachHang, diaChiKH, emailKH, hoTen, soDienThoaiKH } = khachHangMoi;
        if (hoTen === "") {
            setToast({
                header: "Họ tên không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (emailKH === "") {
            setToast({
                header: "Email không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (diaChiKH === "") {
            setToast({
                header: "Địa chỉ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (cccdKhachHang === "") {
            setToast({
                header: "Căn cước không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (soDienThoaiKH === "") {
            setToast({
                header: "Số điện thoại không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        for (var i = 0; i < dsKhachHang.length; i++) {
            if (cccdKhachHang === dsKhachHang[i].cccdKhachHang) {
                setToast({
                    header: "Căn cước công dân khách hàng đã tồn tại trong hệ thống",
                    content: "",
                    bg: "danger",
                    textColor: "#fff",
                });
                return false;
            }
        }

        return true;
    };
    const validateUpdate = () => {
        const { cccdKhachHang, diaChiKH, emailKH, hoTen, soDienThoaiKH } = khachHangMoi;
        if (hoTen === "") {
            setToast({
                header: "Họ tên không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (emailKH === "") {
            setToast({
                header: "Email không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (diaChiKH === "") {
            setToast({
                header: "Địa chỉ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (cccdKhachHang === "") {
            setToast({
                header: "Căn cước không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        else if (soDienThoaiKH === "") {
            setToast({
                header: "Số điện thoại không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }


        return true;
    };
    const handleAddKhachHang = async (e) => {
        e.preventDefault();
        const { cccdKhachHang, diaChiKH, emailKH, hoTen, soDienThoaiKH, maKhachHang } = khachHangMoi
        const objectData = {
            maKhachHang,
            cccdKhachHang,
            diaChiKH,
            emailKH,
            hoTen,
            soDienThoaiKH: "+84" + soDienThoaiKH

        }
        if (khachHangMoi.maKhachHang === 0 && validateAdd()) {
            const { data } = await axios.post(addKhachHang, objectData, {}, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            if (data && data.length !== []) {
                setDsKhachHang(data);
                setKhachHangMoi({
                    ...khachHangMoi, maKhachHang: 0,
                    hoTen: "",
                    cccdKhachHang: "",
                    soDienThoaiKH: "",
                    diaChiKH: "",
                    emailKH: "",
                })
                setToast({
                    header: "Thêm khách hàng mới thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }
    }
    const handleUpdateKhachHang = async () => {
        if (khachHangMoi.maKhachHang !== 0 && validateUpdate()) {
            const { data } = await axios.put(updateKhachHang, khachHangMoi, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            setToast({
                header: "Cập nhật thông tin khách hàng thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
            if (data && data.length !== []) {
                setDsKhachHang(data);
                setKhachHangSelected(undefined);
            }
        }
    }
    const handleSearchKhachHang = async () => {
        const { data } = await axios.post(timKiemKhachHang, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data) {
            setDsKhachHang(data);
            setKhachHangSelected(undefined);
        }
    }
    const handleRefeshKhachHang = () => {
        loadKhachHangFromDB();
    }
    console.log("Search combobox :", search);

    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Quản lý khách hàng</Typography>
            </Box>
            <Paper elevation={15} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', flexDirection: 'column', maxHeight: '40%', overflow: 'auto', paddingTop: '200px' }}>
                <Box component='form' onSubmit={(e) => handleAddKhachHang(e)} sx={{ width: '60%' }}>
                    <TextField id="ma_khach_hang" name='maKhachHang' label="Mã khách hàng" variant="outlined" fullWidth disabled value={khachHangMoi && khachHangMoi.maKhachHang != 0 ? khachHangMoi.maKhachHang : ""} />
                    <TextField id="hoTen" name='hoTen' label="Tên khách hàng" variant="outlined" fullWidth sx={{ marginTop: '15px' }} onChange={(e) => handleOnChange(e)} value={khachHangMoi && khachHangMoi.hoTen ? khachHangMoi.hoTen : ""} />
                    <TextField id="cccdKhachHang" name='cccdKhachHang' label="Căn cước công dân" variant="outlined" fullWidth sx={{ marginTop: '15px' }} onChange={(e) => handleOnChange(e)} value={khachHangMoi && khachHangMoi.cccdKhachHang ? khachHangMoi.cccdKhachHang : ""} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                        <Chip color="info" label="+84" sx={{ height: '50px', width: '71px', borderRadius: '100px' }} />
                        <TextField id="soDienThoaiKH" name='soDienThoaiKH' label="Số điện thoại(+84)" variant="outlined" fullWidth sx={{}} onChange={(e) => handleOnChange(e)} value={khachHangMoi && khachHangMoi.soDienThoaiKH ? khachHangMoi.soDienThoaiKH : ""} />
                    </Box>
                    <TextField id="emailKH" name='emailKH' label="Email" variant="outlined" fullWidth sx={{ marginTop: '15px' }} onChange={(e) => handleOnChange(e)} value={khachHangMoi && khachHangMoi.emailKH ? khachHangMoi.emailKH : ""} />
                    <TextField id="diaChiKH" name='diaChiKH' label="Địa chỉ" variant="outlined" fullWidth sx={{ marginTop: '15px' }} onChange={(e) => handleOnChange(e)} value={khachHangMoi && khachHangMoi.diaChiKH ? khachHangMoi.diaChiKH : ""} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', height: '50px' }}>
                        <Button type='submit' variant='contained' size='small' sx={{
                            backgroundColor: '#198754', '&:hover': {
                                backgroundColor: '#198754'
                            }
                        }} startIcon={<AddCircleOutlineOutlinedIcon />}>Thêm khách hàng</Button>
                        <Button sx={{
                            backgroundColor: '#0D6EFD', '&:hover': {
                                backgroundColor: '#0D6EFD',
                            }
                        }} size='small' variant='contained' startIcon={<SystemUpdateAltOutlinedIcon />} onClick={() => handleUpdateKhachHang()}>Cập nhật khách hàng</Button>
                        <Button sx={{
                            backgroundColor: '#FFC107', '&:hover': {
                                backgroundColor: '#FFC107',
                            }
                        }} size='small' variant='contained' startIcon={<CachedOutlinedIcon />} onClick={() => handleRefeshKhachHang()}>Tải lại dữ liệu</Button>
                    </Box>
                </Box>

            </Paper>



            {/* Danh sách Dịch Vụ */}
            <Paper elevation={24} sx={{ maxHeight: '50%', mt: '11px', overflow: 'auto' }}>
                <TableContainer component={Paper} elevation={15}>
                    <Table aria-label="user table">
                        <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                            <TableRow>
                                <TableCell><Typography>Mã khách hàng</Typography></TableCell>
                                <TableCell align="center"><Typography>Tên khách hàng</Typography></TableCell>
                                <TableCell align="center"><Typography>Căn cước</Typography></TableCell>
                                <TableCell align="center"><Typography>Số điện thoại</Typography></TableCell>
                                <TableCell align="center"><Typography>Email</Typography></TableCell>
                                <TableCell align="center"><Typography>Địa chỉ</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dsKhachHang && dsKhachHang.length > 0 ? dsKhachHang.map((data) => (
                                <TableRow key={data.maKhachHang} onClick={() => handleSelected(data)} className={khachHangSelected && khachHangSelected.maKhachHang === data.maKhachHang
                                    ? "row-selected"
                                    : ""}>
                                    <TableCell component="th" scope="row">
                                        {data.maKhachHang}
                                    </TableCell>
                                    <TableCell align="center">{data.hoTen}</TableCell>
                                    <TableCell align="center">{data.cccdKhachHang}</TableCell>
                                    <TableCell align="center">{data.soDienThoaiKH}</TableCell>
                                    <TableCell align="center">{data.emailKH}</TableCell>
                                    <TableCell align="center">{data.diaChiKH}</TableCell>
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

export default FrmKhachHang
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