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
function FrmTimKiemKhachHang() {
    const [toast, setToast] = useState(null);
    const [dsKhachHang, setDsKhachHang] = useState(undefined);
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo căn cước công dân"
    });

    useEffect(() => {
        loadKhachHangFromDB();
    }, [])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi

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

    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleChangeTextFieldSearch = (e) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, keyword: e.target.value })
    }
    Array.prototype.isNull = function () {
        return this.join().replace(/,/g, '').length === 0;
    };
    const handleSearchKhachHang = async () => {
        const { data } = await axios.post(timKiemKhachHang, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        console.log("data response", data);
        if (data.isNull()) {
            console.log("Mảng null");
            setDsKhachHang(undefined)
        }
        else {
            setDsKhachHang(data);

        }

    }
    const handleRefeshKhachHang = () => {
        loadKhachHangFromDB();
    }
    console.log("Search combobox :", search);



    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Tìm kiếm khách hàng</Typography>
            </Box>

            {/* Thanh Search */}
            <Box sx={{ display: 'flex', height: '100px', mt: '10px' }}>
                <Box sx={{ width: '30%', alignItems: 'center', display: 'flex' }}>
                    <TextField id="outlined-search" label="Nhập để tìm kiếm" type="search" fullWidth onChange={(e) => { handleChangeTextFieldSearch(e) }} />
                </Box>
                <Box sx={{ width: '20%', alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Theo căn cước công dân', 'Theo họ tên']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Tìm theo" disabled />}
                    />
                </Box>
                <Box sx={{ alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                    <Button variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleSearchKhachHang() }} >Tìm kiếm</Button>
                </Box>
                <Box sx={{ alignItems: 'center', display: 'flex', marginLeft: '5px' }}>
                    <Button size='medium' variant='contained' startIcon={<CachedOutlinedIcon />} onClick={() => { handleRefeshKhachHang() }}>Tải lại dữ liệu</Button>
                </Box>
            </Box>


            {/* Danh sách Dịch Vụ */}
            <Paper elevation={24} sx={{ maxHeight: '600px', mt: '11px', overflow: 'auto' }}>
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
                                <TableRow key={data.maKhachHang} >
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

export default FrmTimKiemKhachHang
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: red; */
  padding: 20px;
  
`;