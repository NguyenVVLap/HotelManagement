import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import styled from "styled-components";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
function FrmDichVu() {
    const [madichvu, setMaDichVu] = useState(undefined);

    const handleAddDichVu = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const addDichVu = {
            ma_dich_vu: data.get('ma_dich_vu'),
            tenDichVu: data.get('ten_dich_vu'),
            giaDichVu: data.get('gia_dich_vu')
        }
        console.log("Data:", addDichVu);
    }
    return (
        <StyledContainer>
            <Box sx={{ backgroundColor: 'yellow', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Dịch Vụ</Typography>
            </Box>
            <Paper elevation={15} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px', flexDirection: 'column', minHeight: '40%' }}>
                <Box component='form' onSubmit={(e) => handleAddDichVu(e)} sx={{ width: '50%' }}>
                    <TextField id="ma_dich_vu" name='ma_dich_vu' label="Mã dịch vụ" variant="outlined" fullWidth InputProps={{ readOnly: true }} value={madichvu ? madichvu : ""} />
                    <TextField id="ten_dich_vu" name='ten_dich_vu' label="Tên dịch vụ" variant="outlined" fullWidth sx={{ marginTop: '15px' }} />
                    <TextField id="gia_dich_vu" type={'number'} name='gia_dich_vu' label="Giá dịch vụ" variant="outlined" fullWidth sx={{ marginTop: '15px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', height: '50px' }}>
                        <Button type='submit' variant='contained' startIcon={<AddCircleOutlineOutlinedIcon />}>Thêm dịch vụ</Button>
                        <Button variant='contained' startIcon={<AddCircleOutlineOutlinedIcon />}>Cập nhật dịch vụ</Button>
                    </Box>
                </Box>

            </Paper>
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

`;