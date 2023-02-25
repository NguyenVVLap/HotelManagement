import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import styled from "styled-components";
import Rooms from "./components/Rooms";
import { AiFillCloseSquare } from "react-icons/ai";
import RoomDetail from "./components/RoomDetail";
import RoomSelected from "./components/RoomSelected";

function FrmDatPhong() {
  const [showRooms, setShowRooms] = useState(false);
  const [roomChoosen, setRoomChoosen] = useState([]);
  const [showDetail, setShowDetail] = useState(undefined);
  // console.log(showRooms);
  return (
    <StyledContainer>
      <div className="container">
        <h1>Đặt phòng</h1>
        <div className="content">
          <div className="select-container">
            <div className="room-select-container">
              <Button variant="primary" onClick={() => setShowRooms(true)}>
                Chọn phòng
              </Button>

              <div className="table-container">
                <RoomSelected
                  roomChoosen={roomChoosen}
                  setRoomChoosen={setRoomChoosen}
                  setShowDetail={setShowDetail}
                />
              </div>
            </div>
          </div>
          <div className="input-info">
            <div className="customer-info">
              <h2>Thông tin khách hàng</h2>
            </div>
            <div className="booking-info">
              <h2>Thông tin đặt phòng</h2>
            </div>
          </div>
        </div>
      </div>
      {(showRooms || showDetail) && (
        <Rooms
          showRooms={showRooms}
          setShowRooms={setShowRooms}
          roomChoosen={roomChoosen}
          setRoomChoosen={setRoomChoosen}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
        />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
    h1 {
      padding: 0.5rem;
    }
    .content {
      width: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
      padding-bottom: 0.5rem;
      .select-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .room-select-container {
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
          padding: 0.5rem;
          border-radius: 10px;
          gap: 0.5rem;
          .table-container {
            width: 100%;
          }
        }
      }
      .input-info {
      }
    }
  }
`;
export default FrmDatPhong;
