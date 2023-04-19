import { Autocomplete, Box, Button, Chip, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { Toast, ToastContainer, Table } from "react-bootstrap";
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                    <Button sx={{
                        backgroundColor: '#0D6EFD', '&:hover': {
                            backgroundColor: '#0D6EFD',
                        }
                    }} variant='contained' endIcon={<SearchOutlinedIcon />} size='medium' onClick={() => { handleSearchKhachHang() }} >Tìm kiếm</Button>
                </Box>
                <Box sx={{ alignItems: 'center', display: 'flex', marginLeft: '5px' }}>
                    <Button sx={{
                        backgroundColor: '#FFC107', '&:hover': {
                            backgroundColor: '#FFC107',
                        }
                    }} size='medium' variant='contained' startIcon={<CachedOutlinedIcon />} onClick={() => { handleRefeshKhachHang() }}>Tải lại dữ liệu</Button>
                </Box>
            </Box>


            {/* Danh sách Khách hàng */}
            <StyledPaper elevation={10}>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Mã khách hàng</th>
                            <th >Tên khách hàng</th>
                            <th>Căn cước</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsKhachHang && dsKhachHang.length > 0 ? dsKhachHang.map((data) => (
                            <tr key={data.maKhachHang}>
                                <td component="th" scope="row">
                                    {data.maKhachHang}
                                </td>
                                <td>{data.hoTen}</td>
                                <td>{data.cccdKhachHang}</td>
                                <td>{data.soDienThoaiKH}</td>
                                <td>{data.emailKH}</td>
                                <td>{data.diaChiKH}</td>
                            </tr>
                        )) :

                            <Box sx={{ display: 'flex', height: '420px', width: '100%' }}>
                                <Typography variant='h3'>Chưa có dữ liệu</Typography>
                            </Box>
                        }
                    </tbody>
                </Table>
            </StyledPaper>




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
const StyledPaper = styled(Paper)`
height: 595px;
overflow: auto;
margin-top: 15px;
&::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`