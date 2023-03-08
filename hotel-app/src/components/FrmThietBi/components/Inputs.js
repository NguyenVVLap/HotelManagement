import { Button, FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";

function Inputs({
  thietBiMoi,
  setThietBiMoi,
  onHandleAdd,
  onHandleUpdate,
  onHandleRefresh,
}) {
  const handleOnChange = (e) => {
    setThietBiMoi({ ...thietBiMoi, [e.target.name]: e.target.value });
  };
  return (
    <StyledContainer>
      <div className="input-container">
        <FloatingLabel
          controlId="floatingInput"
          label="Mã thiết bị"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Mã thiết bị"
            name="maThietBi"
            disabled={true}
            value={
              thietBiMoi && thietBiMoi.maThietBi != 0
                ? thietBiMoi.maThietBi
                : ""
            }
            onChange={(e) => handleOnChange(e)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Tên thiết bị"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Tên thiết bị"
            name="tenThietBi"
            value={
              thietBiMoi && thietBiMoi.tenThietBi ? thietBiMoi.tenThietBi : ""
            }
            onChange={(e) => handleOnChange(e)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Giá thiết bị (VND)"
          className="mb-3"
        >
          <Form.Control
            type="number"
            placeholder="Giá thiết bị (VND)"
            name="giaThietBi"
            value={
              thietBiMoi && thietBiMoi.giaThietBi ? thietBiMoi.giaThietBi : 0
            }
            min={0}
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
