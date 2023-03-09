import { Box, Typography } from '@mui/material';
import React from 'react'
import styled from 'styled-components';

function FrmNhanVien() {
    return (
        <StyledContainer>
            <Box sx={{ background: 'linear-gradient(to left, #77a1d3, #79cbca, #e684ae)', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Quản lý nhân viên</Typography>
            </Box>

        </StyledContainer>
    )
}

export default FrmNhanVien
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