import { Autocomplete, Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FloatingLabel, Form, Toast, ToastContainer } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LoupeOutlinedIcon from '@mui/icons-material/LoupeOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import { addDichVu, getAllLoaiDichVuRoute, getAllServiceRoute, timKiemDichVu, updateDichVu } from '../../utils/APIRoutes';
import axios from 'axios';
import PopupLoaiDichVu from '../FrmLoaiDichVu/PopupLoaiDichVu';
function FrmDichVu() {
    const [toast, setToast] = useState(null);
    const [dichVuSelected, setDichVuSelected] = useState(undefined);
    const [maDichVuCu, setMaDichVuCu] = useState(undefined);
    const [temoLoaiDichVu, setTempLoaiDichVu] = useState([]);
    const [dsDichVu, setDsDichVu] = useState(undefined);
    const [dichvuMoi, setDichVuMoi] = useState({

    });
    const [openPopup, setOpenPopup] = useState(false);
    const [search, setSearch] = useState({
        keyword: "",
        theo: "Theo mã dịch vụ"
    });

    useEffect(() => {
        loadDichVuFromDB();
    }, [])
    useEffect(() => {
        loadDichVuFromDB();
    }, [openPopup])
    // useEffect để hiển thị selected data mỗi khi dichvuSelected bị thay đổi
    useEffect(() => {
        if (dichVuSelected) {
            setDichVuMoi(dichVuSelected)
        }
        else {
            setDichVuMoi({
                maDichVu: 0,
                tenDichVu: "",
                giaDichVu: "",
                soLuong: ""
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
        console.log("data dich vu load from database", data);
        setDsDichVu(data);
        const dataLoaiDichVu = await axios.get(`${getAllLoaiDichVuRoute}`, {}, config);
        setTempLoaiDichVu(dataLoaiDichVu.data);
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
        const { tenDichVu, giaDichVu, soLuong } = dichvuMoi;
        if (tenDichVu === "") {
            setToast({
                header: "Tên dịch vụ không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        if (soLuong === "") {
            setToast({
                header: "Số lượng không được bỏ trống",
                content: "",
                bg: "danger",
                textColor: "#fff",
            });
            return false;
        }
        if (giaDichVu === "") {
            setToast({
                header: "Giá dịch vụ không được bỏ trống",
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

        return true;
    };
    const handleAddDichVu = async (e) => {
        e.preventDefault();
        console.log("Dich Vu moi : ", dichvuMoi);
        const dichVuTemp = {
            ...dichvuMoi,
            maDichVu: 0,
            maLoaiDichVu: dichvuMoi.maLoaiDichVu || 1,

        }
        console.log("Dich vu temp: ", dichVuTemp);
        if (dichvuMoi.maDichVu === 0 && validate()) {
            const { data } = await axios.post(addDichVu, dichVuTemp, {}, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            if (data && data.length !== []) {
                loadDichVuFromDB();
                setDichVuMoi({
                    ...dichvuMoi, maDichVu: 0,
                    tenDichVu: "",
                    giaDichVu: "",
                    soLuong: ""
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
                loadDichVuFromDB();
                setDichVuSelected(undefined);
            }
        }
    }

    const handleRefeshDichVu = () => {
        loadDichVuFromDB();
    }
    const handleOnSelect = (name, e) => {
        // console.log("select loaiDichVu ID :", e.target.value);
        setDichVuMoi({
            ...dichvuMoi,
            [name]: e.target.value,
        });

    };
    // console.log("Search combobox :", search);
    // console.log("Temp loai DichVu :", temoLoaiDichVu);
    // console.log("Dich vu moi :", dichvuMoi);
    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Quản lý dịch vụ</Typography>
            </Box>
            <Paper elevation={15} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', flexDirection: 'column', minHeight: '30%' }}>
                <Box component='form' onSubmit={(e) => handleAddDichVu(e)} sx={{ width: '50%' }}>
                    <TextField id="ma_dich_vu" name='ma_dich_vu' label="" variant="outlined" fullWidth disabled value={dichvuMoi && dichvuMoi.maDichVu && dichvuMoi.maDichVu !== 0 ? dichvuMoi.maDichVu : "Mã dịch vụ"} />
                    <TextField id="ten_dich_vu" name='tenDichVu' label="Tên dịch vụ" variant="outlined" fullWidth sx={{ marginTop: '15px' }} onChange={(e) => handleOnChange(e)} value={dichvuMoi && dichvuMoi.tenDichVu ? dichvuMoi.tenDichVu : ""} />
                    {/* Loai dich Vu */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Loại dịch vụ"
                            className="mb-3"
                            style={{ marginTop: '15px', flexGrow: '2' }}
                        >
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => handleOnSelect("maLoaiDichVu", e)}
                            >
                                {temoLoaiDichVu &&
                                    temoLoaiDichVu.length !== 0 &&
                                    temoLoaiDichVu.map((loaiDichVu, index) => {
                                        return (
                                            <option
                                                value={`${loaiDichVu.maLoaiDichVu}`}
                                                key={index}
                                                selected={
                                                    dichvuMoi.maLoaiDichVu &&
                                                    dichvuMoi.maLoaiDichVu == loaiDichVu.maLoaiDichVu
                                                }
                                            >
                                                {loaiDichVu.tenLoaiDichVu}
                                            </option>
                                        );
                                    })}

                            </Form.Select>
                        </FloatingLabel>
                        <IconButton color="success" aria-label="add to shopping cart" onClick={() => setOpenPopup(true)}>
                            <LoupeOutlinedIcon />
                        </IconButton>
                    </Box>

                    <TextField id="gia_dich_vu" name='giaDichVu' label="Giá dịch vụ" variant="outlined" fullWidth sx={{ marginTop: '5px' }} onChange={(e) => handleOnChange(e)} value={dichvuMoi && dichvuMoi.giaDichVu ? dichvuMoi.giaDichVu : ""} />
                    <TextField type='number' id="soLuong" name='soLuong' label="Số lượng" variant="outlined" fullWidth sx={{ marginTop: '15px' }} onChange={(e) => handleOnChange(e)} value={dichvuMoi && dichvuMoi.soLuong ? dichvuMoi.soLuong : ""} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', height: '50px' }}>
                        <Button type='submit' variant='contained' size='medium' startIcon={<AddCircleOutlineOutlinedIcon />}>Thêm dịch vụ</Button>
                        <Button variant='contained' size='medium' startIcon={<SystemUpdateAltOutlinedIcon />} onClick={() => handleUpdateDichVu()}>Cập nhật dịch vụ</Button>
                        <Button variant='contained' size='medium' startIcon={<CachedOutlinedIcon />} onClick={() => handleRefeshDichVu()}>Tải lại dữ liệu</Button>
                    </Box>
                </Box>

            </Paper>



            {/* Danh sách Dịch Vụ */}
            <Paper elevation={24} sx={{ maxHeight: '30%', mt: '11px', overflow: 'auto' }}>
                <TableContainer component={Paper} elevation={15}>
                    <Table aria-label="user table">
                        <TableHead sx={{ background: 'linear-gradient(to right, #ffe259, #ffa751)' }}>
                            <TableRow>
                                <TableCell><Typography>Mã dịch vụ</Typography></TableCell>
                                <TableCell align="center"><Typography>Tên dịch vụ</Typography></TableCell>
                                <TableCell align="center"><Typography>Tên loại dịch vụ</Typography></TableCell>
                                <TableCell align="center"><Typography>Đơn vị tính</Typography></TableCell>
                                <TableCell align="center"><Typography>Giá dịch vụ</Typography></TableCell>
                                <TableCell align="right"><Typography>Số lượng</Typography></TableCell>
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
                                    <TableCell align="center">{data.tenLoaiDichVu}</TableCell>
                                    <TableCell align="center">{data.donViLoaiDichVu}</TableCell>
                                    <TableCell align="center">{data.giaDichVu}</TableCell>
                                    <TableCell align="right">{data.soLuong}</TableCell>
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
            <PopupLoaiDichVu openPopup={openPopup} setOpenPopup={setOpenPopup} />
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