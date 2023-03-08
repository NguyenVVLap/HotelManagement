import { Table } from "react-bootstrap";
import styled from "styled-components";

function TableData({ dsThietBi, thietBiSelected, setThietBiSelected }) {
  const onHandleSelect = (thietBi) => {
    if (thietBiSelected && thietBi.maThietBi === thietBiSelected.maThietBi) {
      setThietBiSelected(undefined);
    } else {
      setThietBiSelected(thietBi);
    }
  };
  return (
    <StyledContainer>
      <Table striped hover>
        <thead>
          <tr>
            <th>Mã thiết bị</th>
            <th>Tên thiết bị</th>
            <th>Giá (VND)</th>
          </tr>
        </thead>
        <tbody>
          {dsThietBi &&
            dsThietBi !== [] &&
            dsThietBi.map((thietBi, index) => {
              return (
                <tr
                  key={index}
                  className={`${
                    thietBiSelected &&
                    thietBiSelected.maThietBi === thietBi.maThietBi
                      ? "row-selected"
                      : ""
                  }`}
                  onClick={() => onHandleSelect(thietBi)}
                >
                  <td>{thietBi.maThietBi}</td>
                  <td>{thietBi.tenThietBi}</td>
                  <td>{thietBi.giaThietBi.toLocaleString()}</td>
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
  height: 65%;
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
