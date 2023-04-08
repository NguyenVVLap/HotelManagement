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
function FrmTimKiemDichVu() {
    const [toast, setToast] = useState(null);
    const [dichVuSelected, setDichVuSelected] = useState(undefined);

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

    const handleOnchangeSelectedCombobox = (e, value) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, theo: value })
    }
    const handleChangeTextFieldSearch = (e) => {
        // console.log("Selected combobox: ", value);
        setSearch({ ...search, keyword: e.target.value })
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
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Tìm dịch vụ</Typography>
            </Box>

            {/* Thanh Search */}
            <Box sx={{ display: 'flex', height: '100px', mt: '10px' }}>
                <Box sx={{ width: '30%', alignItems: 'center', display: 'flex' }}>
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
                <Box sx={{ alignItems: 'center', display: 'flex', marginLeft: '20px' }}>
                    <Button variant='contained' size='medium' endIcon={<SearchOutlinedIcon />} onClick={() => { handleSearchDichVu() }} >Tìm kiếm</Button>
                </Box>
                <Box sx={{ alignItems: 'center', display: 'flex', marginLeft: '5px' }}>
                    <Button size='medium' variant='contained' startIcon={<CachedOutlinedIcon />} onClick={() => { handleRefeshDichVu() }}>Tải lại dữ liệu</Button>
                </Box>

            </Box>


            {/* Danh sách Dịch Vụ */}
            <Paper elevation={24} sx={{ height: '600px', mt: '11px', overflow: 'auto' }}>
                <TableContainer component={Paper} elevation={15}>
                    <Table aria-label="user table">
                        <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                            <TableRow>
                                <TableCell><Typography>Mã dịch vụ</Typography></TableCell>
                                <TableCell align="center"><Typography>Tên dịch vụ</Typography></TableCell>
                                <TableCell align="center"><Typography>Mô tả dịch vụ</Typography></TableCell>
                                <TableCell align="center"><Typography>Đơn vị tính</Typography></TableCell>
                                <TableCell align="right"><Typography>Giá dịch vụ</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dsDichVu && dsDichVu.length > 0 ? dsDichVu.map((data) => (
                                <TableRow key={data.maDichVu} >
                                    <TableCell component="th" scope="row">
                                        {data.maDichVu}
                                    </TableCell>
                                    <TableCell align="center">{data.tenDichVu}</TableCell>
                                    <TableCell align="center">{data.motaDichVu}</TableCell>
                                    <TableCell align="center">{data.donviTinh}</TableCell>
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

export default FrmTimKiemDichVu
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: red; */
  padding: 20px;
 
`;