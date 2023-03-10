import { Table } from "react-bootstrap";
import styled from "styled-components";

function TableData({ dsPhong, phongSelected, setPhongSelected }) {
  const onHandleSelect = (phong) => {
    if (phongSelected && phong.phong.maPhong === phongSelected.phong.maPhong) {
      setPhongSelected(undefined);
    } else {
      setPhongSelected(phong);
    }
  };
  return (
    <StyledContainer>
      <Table striped hover>
        <thead>
          <tr>
            <th>Mã phòng</th>
            <th>Tên phòng</th>
            <th>Mô tả phòng</th>
            <th>Loại phòng</th>
            <th>Tầng</th>
            <th>Giá (1 đêm)</th>
          </tr>
        </thead>
        <tbody>
          {dsPhong &&
            dsPhong !== [] &&
            dsPhong.map((phongDto, index) => {
              // console.log(isSelected(room));
              return (
                <tr
                  key={index}
                  className={`${
                    phongSelected &&
                    phongSelected.phong &&
                    phongSelected.phong.maPhong === phongDto.phong.maPhong
                      ? "row-selected"
                      : ""
                  }`}
                  onClick={() => onHandleSelect(phongDto)}
                >
                  <td>{phongDto.phong.maPhong}</td>
                  <td>{phongDto.phong.tenPhong}</td>
                  <td>{phongDto.phong.moTaPhong}</td>
                  <td>{phongDto.phong.tenLoaiPhong}</td>
                  <td>{phongDto.phong.tenTang}</td>
                  <td>{phongDto.phong.giaLoaiPhong.toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  height: 40%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  table {
    .row-selected {
      td {
        background-color: #9fbce7d1 !important;
      }
    }
  }
`;
export default TableData;
