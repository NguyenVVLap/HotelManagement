import axios from "axios";
import { useEffect, useState } from "react";
import { Button, CloseButton, Container, Table } from "react-bootstrap";
import styled from "styled-components";
import { GrRadial, GrRadialSelected } from "react-icons/gr";
import { getRoomsRoute } from "../../../utils/APIRoutes";
import RoomDetail from "./RoomDetail";

function Rooms({
  showRooms,
  setRoomChoosen,
  roomChoosen,
  setShowRooms,
  showDetail,
  setShowDetail,
}) {
  const [rooms, setRooms] = useState([]);
  const [roomsSelected, setRoomsSelected] = useState([]);

  useEffect(() => {
    loadRoomData();
  }, []);
  useEffect(() => {
    setRoomsSelected([...roomsSelected, ...roomChoosen]);
  }, [roomChoosen]);
  const loadRoomData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getRoomsRoute}`, {}, config);
    // console.log(data);
    setRooms(data);
  };
  const isSelected = (room) => {
    let result = false;
    roomsSelected.map((selected) => {
      if (selected.room.roomId === room.room.roomId) {
        result = true;
        return true;
      }
    });
    return result;
  };
  const onHandleSelected = (room) => {
    const temp = [...roomsSelected];

    for (var i = 0; i < temp.length; i++) {
      if (temp[i].room.roomId === room.room.roomId) {
        temp.splice(i, 1);
        setRoomsSelected(temp);
        return;
      }
    }
    setRoomsSelected([...temp, room]);
  };
  // console.log("roomChoosen", roomChoosen);
  // console.log(roomsSelected);

  return (
    <StyledContainer>
      <div className="container-styled">
        <div className="header">
          <h2 className="header-title">Chọn phòng</h2>
          <CloseButton onClick={() => setShowRooms(undefined)} />
        </div>
        <div className="filter-btn"></div>
        <div className="table-container">
          <Table striped hover>
            <thead>
              <tr>
                <th></th>
                <th>Phòng</th>
                <th>Trạng thái</th>
                <th>Loại phòng</th>
                <th>Số giường</th>
                <th>Sức chứa</th>
                <th>Tầng</th>
                <th>Giá (1 đêm)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms &&
                rooms !== [] &&
                rooms.map((room, index) => {
                  // console.log(isSelected(room));
                  return (
                    <tr
                      key={index}
                      className={`${isSelected(room) ? "row-selected" : ""}`}
                      s
                      onClick={() => onHandleSelected(room)}
                    >
                      <td>
                        {isSelected(room) ? <GrRadialSelected /> : <GrRadial />}
                      </td>
                      <td>{room.room.roomName}</td>
                      <td
                        className={`${
                          room.room.roomState ? "text-green" : "text-red"
                        }`}
                      >
                        {room.room.roomState ? "Còn trống" : "Đang thuê"}
                      </td>
                      <td>{room.room.roomTypeName}</td>
                      <td>{room.room.numberOfBeds}</td>
                      <td>{room.room.capacity}</td>
                      <td>{room.room.floorName}</td>
                      <td>{room.room.roomTypeCost.toLocaleString()}</td>
                      <td
                        style={{ cursor: "pointer", position: "relative" }}
                        onClick={() => setShowDetail(room)}
                      >
                        Xem chi tiết
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        <div className="btn-container">
          {roomsSelected.length > 0 ? (
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setRoomChoosen([...roomsSelected]);
                setShowRooms(undefined);
              }}
            >
              Chọn ({roomsSelected.length})
            </Button>
          ) : (
            <Button variant="secondary" type="submit">
              Chọn ({roomsSelected.length})
            </Button>
          )}
        </div>
        {showDetail && (
          <RoomDetail room={showDetail} setShowDetail={setShowDetail} />
        )}
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .container-styled {
    width: 75%;
    padding: 0.5rem;
    height: 95%;
    display: flex;
    flex-direction: column;
    text-align: start;
    background-color: #fff;
    position: relative;
    .header {
      display: flex;
      justify-content: space-between;
      .header-title {
      }
    }
    .table-container {
      width: 100%;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 1px;
        &-thumb {
          background-image: linear-gradient(#373b44, #1095c1);
          width: 1px;
          border-radius: 1rem;
        }
      }
      tbody {
        .row-selected {
          td {
            background-color: #9fbce7d1 !important;
          }
        }
      }
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
    }
  }
  .text-red {
    font-weight: bold;
    color: red !important;
  }
  .text-green {
    font-weight: bold;
    color: green !important;
  }
`;
export default Rooms;
