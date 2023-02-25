import { Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";

function RoomSelected({ roomChoosen, setShowDetail, setRoomChoosen }) {
  const onHandeRemoveRoomChosen = (room) => {
    const temp = [...roomChoosen];

    for (var i = 0; i < temp.length; i++) {
      if (temp[i].room.roomId === room.room.roomId) {
        temp.splice(i, 1);
        setRoomChoosen(temp);
        return;
      }
    }
  };

  return (
    <StyledContainer>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Phòng</th>
            <th>Loại phòng</th>
            <th>Tầng</th>
            <th>Giá (1 đêm)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roomChoosen && roomChoosen.length > 0 ? (
            roomChoosen.map((room, index) => {
              // console.log(isSelected(room));
              return (
                <tr key={index}>
                  <td
                    style={{
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => onHandeRemoveRoomChosen(room)}
                  >
                    <AiFillCloseCircle
                      style={{ color: "red", fontSize: "2rem" }}
                    />
                  </td>
                  <td>{room.room.roomName}</td>
                  <td>{room.room.roomTypeName}</td>
                  <td>{room.room.floorName}</td>
                  <td>{room.room.roomTypeCost.toLocaleString()}</td>
                  <td
                    style={{
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => setShowDetail(room)}
                  >
                    Xem chi tiết
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </Table>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  height: 300px;
  overflow-y: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  table {
    /* table-layout: fixed; */
    width: 100%;
  }
`;
export default RoomSelected;
