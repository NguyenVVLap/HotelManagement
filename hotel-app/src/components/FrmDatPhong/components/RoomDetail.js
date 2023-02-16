import styled from "styled-components";
import { SlArrowLeft } from "react-icons/sl";
import { Card, Carousel, Table } from "react-bootstrap";

function RoomDetail({ room, setShowDetail }) {
  return (
    <StyledContainer>
      <div className="header">
        <SlArrowLeft onClick={() => setShowDetail(undefined)} />
        <h2>
          {room.room.roomName} - {room.room.roomTypeName} -{" "}
          {room.room.floorName}
        </h2>
      </div>
      <div className="content">
        <div className="images">
          <Carousel slide={true}>
            {room.room.roomImageUrl.map((img, index) => {
              return (
                <Carousel.Item>
                  <img
                    key={index}
                    className="d-block w-100"
                    src={img}
                    alt={`Hình ${index}`}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="cost">{room.room.roomTypeCost.toLocaleString()}VND</div>
        <div className="detail-info">
          <div className="common-info">
            <Card>
              <Card.Header>Thông tin chung</Card.Header>
              <Card.Body>
                <Table striped>
                  <tbody>
                    <tr>
                      <td>Số người tối đa</td>
                      <td>{room.room.capacity}</td>
                    </tr>
                    <tr>
                      <td>Số giường</td>
                      <td>{room.room.numberOfBeds}</td>
                    </tr>
                    <tr>
                      <td>Được hút thuốc</td>
                      <td>{room.room.smokeFriendly ? "Có" : "Không"}</td>
                    </tr>
                    <tr>
                      <td>Được mang thú cưng</td>
                      <td>{room.room.petFriendly ? "Có" : "Không"}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
              <p>
                - Trang thiết bị:{" "}
                {room.roomEquipment.length > 0
                  ? room.roomEquipment.map((equipment, index) =>
                      index === room.roomEquipment.length - 1
                        ? equipment.equipment.equipmentName + "."
                        : equipment.equipment.equipmentName + ", "
                    )
                  : "Không có dữ liệu"}
              </p>
              <p>
                - Hư hại hiện có:{" "}
                {room.damages.length > 0
                  ? room.damages.map((damage, index) =>
                      index === room.damages.length - 1
                        ? damage.damageName + "."
                        : damage.damageName + ", "
                    )
                  : "Không có dữ liệu"}
              </p>
            </Card>
          </div>
          <div className="decription">
            <p className="title">Mô tả</p>
            <p className="content">
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}

              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
              {room.room.roomDescription}
            </p>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .header {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-bottom: 1rem;
    /* width: 100%; */
    svg {
      font-size: 1.3rem;
      cursor: pointer;
    }
    h2 {
      margin: 0;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    .images {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      img {
        width: 100%;
        height: 300px;
        max-height: 100%;
        min-width: 100%;
        object-fit: contain;
        vertical-align: bottom;
      }
    }
    .cost {
      font-size: 1.3rem;
      font-weight: bold;
      padding: 0.5rem;
    }
    .detail-info {
      display: flex;
      gap: 2rem;
      .common-info {
        height: 250px;
        width: 35%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-image: linear-gradient(#373b44, #1095c1);
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
      }
      .decription {
        width: 65%;
        height: 200px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-image: linear-gradient(#373b44, #1095c1);
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
        .title {
          font-weight: bold;
        }
      }
    }
  }
`;

export default RoomDetail;
