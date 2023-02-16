import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Rooms from "./components/Rooms";

function FrmDatPhong() {
  const [showRooms, setShowRooms] = useState(false);
  const [roomChoosen, setRoomChoosen] = useState([]);
  // console.log(showRooms);
  return (
    <StyledContainer>
      <div className="container">
        <h1>Đặt phòng</h1>
        <div className="option-container">
          <Button variant="primary" onClick={() => setShowRooms(true)}>
            Chọn phòng
          </Button>

          <h2>Thông tin khách hàng</h2>
        </div>
      </div>
      {showRooms && (
        <Rooms
          showRooms={showRooms}
          setShowRooms={setShowRooms}
          roomChoosen={roomChoosen}
          setRoomChoosen={setRoomChoosen}
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
    height: 100%;
    .option-container {
      height: 40%;
      display: grid;
      grid-template-columns: 60% 40%;
    }
  }
`;
export default FrmDatPhong;
