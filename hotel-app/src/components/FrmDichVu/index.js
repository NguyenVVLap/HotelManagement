import { Autocomplete, Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
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
import { addDichVu, getAllServiceRoute, timKiemDichVu, updateDichVu } from '../../utils/APIRoutes';
import axios from 'axios';
function FrmDichVu() {
    const [toast, setToast] = useState(null);
    const [dichVuSelected, setDichVuSelected] = useState(undefined);
    const [madichvu, setMaDichVu] = useState(undefined);
    const [dsDichVu, setDsDichVu] = useState(undefined);
    const [dichvuMoi, setDichVuMoi] = useState({
        maDichVu: 0,
        tenDichVu: "",
        giaDichVu: ""
    });
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo mã dịch vụ"
    });

    useEffect(() => {
        loadDichVuFromDB();
    }, [])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi
    useEffect(() => {
        if (dichVuSelected) {
            setDichVuMoi(dichVuSelected)
        }
        else {
            setDichVuMoi({
                maDichVu: 0,
                tenDichVu: "",
                giaDichVu: ""
            })
        }
    }, [dichVuSelected])
    const loadDichVuFromDB = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        const { data } = await axios.get(`${getAllServiceRoute}`, {}, config);
        // console.log("data dich vu load from database", data);
        setDsDichVu(data);
    }
    const handleSelected = (dichVu) => {
        if (dichVuSelected && dichVu.maDichVu === dichVuSelected.maDichVu) {
            setDichVuSelected(undefined);
        }
        else {
            setDichVuSelected(dichVu)
        }
    }
    const handleOnChange = (e) => {
        setDichVuMoi({ ...dichvuMoi, [e.target.name]: e.target.value });
    }
    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleChangeTextFieldSearch = (e) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, keyword: e.target.value })
    }

    const validate = () => {
        const { tenDichVu, giaDichVu } = dichvuMoi;
        if (tenDichVu === "") {
            setToast({
                header: "Tên dịch vụ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        for (var i = 0; i < dsDichVu.length; i++) {
            if (tenDichVu == dsDichVu[i].tenDichVu || giaDichVu === dsDichVu[i].giaDichVu) {
                setToast({
                    header: "Tên và giá dịch vụ không được trùng",
                    content: "",
                    bg: "danger",
                    textColor: "#fff",
                });
                return false;
            }
        }
        if (giaDichVu <= 0) {
            setToast({
                header: "Giá dịch vụ phải lớn hơn 0",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        return true;
    };
    const handleAddDichVu = async (e) => {
        e.preventDefault();
        if (dichvuMoi.maDichVu === 0 && validate()) {
            const { data } = await axios.post(addDichVu, dichvuMoi, {}, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            if (data && data.length !== []) {
                setDsDichVu(data);
                setDichVuMoi({
                    ...dichvuMoi, maDichVu: 0,
                    tenDichVu: "",
                    giaDichVu: ""
                })
                setToast({
                    header: "Thêm dịch vụ mới thành công",
                    content: "",
                    bg: "success",
                    textColor: "#fff",
                });
            }
        }
    }
    const handleUpdateDichVu = async () => {
        if (dichvuMoi.maDichVu !== 0 && validate()) {
            const { data } = await axios.post(updateDichVu, dichvuMoi, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            setToast({
                header: "Cập nhật dịch vụ thành công",
                content: "",
                bg: "success",
                textColor: "#fff",
            });
            if (data && data.length !== []) {
                setDsDichVu(data);
                setDichVuSelected(undefined);
            }
        }
    }
    const handleSearchDichVu = async () => {
        const { data } = await axios.post(timKiemDichVu, search, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
            },
        });
        if (data) {
            setDsDichVu(data);
            setDichVuSelected(undefined);
        }
    }
    const handleRefeshDichVu = () => {
        loadDichVuFromDB();
    }
    // console.log("Search combobox :", search);
    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to bottom, #1fa2ff, #12d8fa, #a6ffcb)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Quản lý dịch vụ</Typography>
            </Box>
            <Paper elevation={15} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', flexDirection: 'column', minHeight: '30%' }}>
                <Box component='form' onSubmit={(e) => handleAddDichVu(e)} sx={{ width: '50%' }}>
                    <TextField id="ma_dich_vu" name='ma_dich_vu' label="Mã dịch vụ" variant="outlined" fullWidth disabled value={dichvuMoi && dichvuMoi.maDichVu != 0 ? dichvuMoi.maDichVu : ""} />
                    <TextField id="ten_dich_vu" name='tenDichVu' label="Tên dịch vụ" variant="outlined" fullWidth sx={{ marginTop: '15px' }} onChange={(e) => handleOnChange(e)} value={dichvuMoi && dichvuMoi.tenDichVu ? dichvuMoi.tenDichVu : ""} />
                    <TextField id="gia_dich_vu" name='giaDichVu' label="Giá dịch vụ" variant="outlined" fullWidth sx={{ marginTop: '15px' }} onChange={(e) => handleOnChange(e)} value={dichvuMoi && dichvuMoi.giaDichVu ? dichvuMoi.giaDichVu : ""} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', height: '50px' }}>
                        <Button type='submit' variant='contained' startIcon={<AddCircleOutlineOutlinedIcon />}>Thêm dịch vụ</Button>
                        <Button variant='contained' startIcon={<SystemUpdateAltOutlinedIcon />} onClick={() => handleUpdateDichVu()}>Cập nhật dịch vụ</Button>
                        <Button variant='contained' startIcon={<CachedOutlinedIcon />} onClick={() => handleRefeshDichVu()}>Tải lại dữ liệu</Button>
                    </Box>
                </Box>

            </Paper>
            {/* Thanh Search */}
            <Box sx={{ display: 'flex', height: '100px', mt: '10px' }}>
                <Box sx={{ width: '50%', alignItems: 'center', display: 'flex' }}>
                    <TextField id="outlined-search" label="Nhập để tìm kiếm" type="search" fullWidth onChange={(e) => { handleChangeTextFieldSearch(e) }} />
                </Box>
                <Box sx={{ width: '30%', alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                    <Autocomplete
                        onChange={(e, value) => { handleOnchangeSelectedCombobox(e, value) }}
                        disablePortal
                        id="combo-box-demo"
                        options={['Theo mã dịch vụ', 'Theo tên dịch vụ']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField  {...params} label="Tìm theo" disabled />}
                    />
                </Box>
                <Box sx={{ width: '20%', alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                    <Button variant='contained' endIcon={<SearchOutlinedIcon />} size={'large'} onClick={() => { handleSearchDichVu() }} >Tìm kiếm</Button>
                </Box>
            </Box>


            {/* Danh sách Dịch Vụ */}
            <Paper elevation={24} sx={{ maxHeight: '50%', mt: '11px', overflow: 'auto' }}>
                <TableContainer component={Paper} elevation={15}>
                    <Table aria-label="user table">
                        <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                            <TableRow>
                                <TableCell><Typography>Mã dịch vụ</Typography></TableCell>
                                <TableCell align="center"><Typography>Tên dịch vụ</Typography></TableCell>
                                <TableCell align="right"><Typography>Giá dịch vụ</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dsDichVu && dsDichVu.length > 0 ? dsDichVu.map((data) => (
                                <TableRow key={data.maDichVu} onClick={() => handleSelected(data)} className={dichVuSelected && dichVuSelected.maDichVu === data.maDichVu
                                    ? "row-selected"
                                    : ""}>
                                    <TableCell component="th" scope="row">
                                        {data.maDichVu}
                                    </TableCell>
                                    <TableCell align="center">{data.tenDichVu}</TableCell>
                                    <TableCell align="right">{data.giaDichVu}</TableCell>
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

export default FrmDichVu
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