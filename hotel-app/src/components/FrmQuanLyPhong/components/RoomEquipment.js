import { useEffect } from "react";
import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import { GrRadial, GrRadialSelected } from "react-icons/gr";
import styled from "styled-components";

function RoomEquipment({
  tempThietBi,
  thietBiAll,
  thietBiMoi,
  setThietBiMoi,
  setTempThietBi,
}) {
  // const [quantity, setQuantity] = useState([{maThietBi: 0, soLuong: 0}]);
  useEffect(() => {
    let thietBi = [];
    if (tempThietBi.length === 0 || !tempThietBi) {
      for (let i = 0; i < thietBiAll.length; i++) {
        thietBi = [
          ...thietBi,
          {
            maThietBi: thietBiAll[i].maThietBi,
            tenThietBi: thietBiAll[i].tenThietBi,
            soLuong: 0,
          },
        ];
      }
    } else {
      for (let i = 0; i < thietBiAll.length; i++) {
        for (let j = 0; j < tempThietBi.length; j++) {
          if (thietBiAll[i].maThietBi === tempThietBi[j].thietBi.maThietBi) {
            thietBi = [
              ...thietBi,
              {
                maThietBi: thietBiAll[i].maThietBi,
                tenThietBi: thietBiAll[i].tenThietBi,
                soLuong: tempThietBi[j].soLuong,
              },
            ];
            break;
          }
          if (
            thietBiAll[i].maThietBi !== tempThietBi[j].thietBi.maThietBi &&
            j === tempThietBi.length - 1
          ) {
            thietBi = [
              ...thietBi,
              {
                maThietBi: thietBiAll[i].maThietBi,
                tenThietBi: thietBiAll[i].tenThietBi,
                soLuong: 0,
              },
            ];
          }
        }
      }
    }
    setThietBiMoi(thietBi);
    if (!tempThietBi || tempThietBi.length === 0) {
      for (let i = 0; i < thietBiAll.length; i++) {
        tempThietBi = [
          ...tempThietBi,
          {
            thietBi: {
              maThietBi: thietBiAll[i].maThietBi,
              tenThietBi: thietBiAll[i].tenThietBi,
            },
            soLuong: 0,
          },
        ];
      }
      setTempThietBi([...tempThietBi]);
    }
  }, [tempThietBi]);
  /* tempTheitBi = [{thietBi:{maThietBi: 0, tenThietBi:"", giaThietBi:""}}, soLuong: 0}, {}] */
  const onHandleChangeQuantity = (e) => {
    if (thietBiAll && thietBiAll.length && thietBiAll.length > 0) {
      for (let i = 0; i < thietBiAll.length; i++) {
        if (thietBiAll[i].maThietBi == e.target.name) {
          let newTempThietBi = {
            thietBi: {
              maThietBi: thietBiAll[i].maThietBi,
              tenThietBi: thietBiAll[i].tenThietBi,
              giaThietBi: thietBiAll[i].giaThietBi,
            },
            soLuong: e.target.value,
          };
          if (tempThietBi && tempThietBi.length && tempThietBi.length > 0) {
            for (let j = 0; j < tempThietBi.length; j++) {
              if (
                tempThietBi[j].thietBi.maThietBi ==
                newTempThietBi.thietBi.maThietBi
              ) {
                tempThietBi[j] = {
                  ...tempThietBi[j],
                  soLuong: newTempThietBi.soLuong,
                };
                setTempThietBi([...tempThietBi]);
              } else if (j === tempThietBi.length - 1) {
                setTempThietBi([...tempThietBi, newTempThietBi]);
              }
            }
          } else {
            setTempThietBi([newTempThietBi]);
          }
        }
      }
    }
  };
  return (
    <StyledContainer>
      <Table striped hover>
        <thead>
          <tr>
            <th>Mã thiết bị</th>
            <th>Tên thiết bị</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {thietBiMoi &&
            thietBiMoi !== [] &&
            thietBiMoi.map((thietBi, index) => {
              return (
                <tr key={index}>
                  <td>{thietBi.maThietBi}</td>
                  <td>{thietBi.tenThietBi}</td>
                  <td>
                    <Form.Control
                      type="number"
                      name={thietBi.maThietBi}
                      min={0}
                      value={thietBi.soLuong}
                      onChange={(e) => onHandleChangeQuantity(e)}
                    />
                  </td>
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
  height: 200px;
  width: 100%;
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
    height: 200px;
    .row-selected {
      td {
        background-color: #9fbce7d1 !important;
      }
    }
  }
`;
export default RoomEquipment;
