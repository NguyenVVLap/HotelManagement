import { Button, FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";

function Inputs({
  loaiPhongMoi,
  setLoaiPhongMoi,
  onHandleAdd,
  onHandleUpdate,
  onHandleRefresh,
}) {
  const handleOnChange = (e) => {
    setLoaiPhongMoi({ ...loaiPhongMoi, [e.target.name]: e.target.value });
  };
  const onHandleClear = () => {
    setLoaiPhongMoi({
      maLoaiPhong: 0,
      tenLoaiPhong: "",
      sucChua: 0,
      soGiuong: 0,
    });
  };
  return (
    <StyledContainer>
      <div className="input-container">
        <FloatingLabel
          controlId="floatingInput"
          label="Mã loại phòng"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Mã loại phòng"
            name="maLoaiPhong"
            disabled={true}
            value={
              loaiPhongMoi && loaiPhongMoi.maLoaiPhong != 0
                ? loaiPhongMoi.maLoaiPhong
                : ""
            }
            onChange={(e) => handleOnChange(e)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Tên loại phòng"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Tên loại phòng"
            name="tenLoaiPhong"
            value={
              loaiPhongMoi && loaiPhongMoi.tenLoaiPhong
                ? loaiPhongMoi.tenLoaiPhong
                : ""
            }
            onChange={(e) => handleOnChange(e)}
          />
        </FloatingLabel>
      </div>
      <div className="btn-container">
        <Button variant="success" onClick={() => onHandleAdd()}>
          Thêm
        </Button>
        <Button variant="primary" onClick={() => onHandleUpdate()}>
          Cập nhật
        </Button>
        <Button variant="danger" onClick={() => onHandleClear()}>
          Xóa rỗng
        </Button>
        <Button variant="warning" onClick={() => onHandleRefresh()}>
          <BiRefresh />
        </Button>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  max-height: 45%;
  overflow-y: auto;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .input-container {
    display: flex;
    gap: 1rem;
  }
  .btn-container {
    display: flex;
    gap: 1.5rem;
    button {
      padding: 0.5rem 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Inputs;
