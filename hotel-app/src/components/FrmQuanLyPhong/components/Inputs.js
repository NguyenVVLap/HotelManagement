import { Button, Carousel, FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";
import { useEffect, useState } from "react";
import { getFloorsRoute, getRoomTypesRoute } from "../../../utils/APIRoutes";
import axios from "axios";

function Inputs({
  tempPhong,
  tempTang,
  tempLoaiPhong,
  setTempPhong,
  setTempTang,
  setTempLoaiPhong,
  setShowImageSelect,
  onHandleAdd,
  onHandleUpdate,
  onHandleRefresh,
}) {
  useEffect(() => {
    loadRelateData();
  }, [setTempPhong]);
  const loadRelateData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const dataTang = await axios.get(`${getFloorsRoute}`, {}, config);
    setTempTang(dataTang.data);
    const dataLoaiPhong = await axios.get(`${getRoomTypesRoute}`, {}, config);
    setTempLoaiPhong(dataLoaiPhong.data);
  };

  const handleOnChangePhong = (e) => {
    setTempPhong({ ...tempPhong, [e.target.name]: e.target.value });
  };

  const handleOnSelect = (name, e) => {
    setTempPhong({ ...tempPhong, [name]: e.target.value });
  };

  const onHandleClear = () => {
    setTempPhong({});
  };
  return (
    <StyledContainer>
      <div className="field-container">
        <FloatingLabel
          controlId="floatingInput"
          label="Mã phòng"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Mã phòng"
            name="maPhong"
            disabled={true}
            value={
              tempPhong && tempPhong.maPhong && tempPhong.maPhong != 0
                ? tempPhong.maPhong
                : ""
            }
            onChange={(e) => handleOnChangePhong(e)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Tên phòng"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Tên phòng"
            name="tenPhong"
            value={tempPhong && tempPhong.tenPhong ? tempPhong.tenPhong : ""}
            onChange={(e) => handleOnChangePhong(e)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Mô tả phòng"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Mô tả phòng"
            name="moTaPhong"
            value={tempPhong && tempPhong.moTaPhong ? tempPhong.moTaPhong : ""}
            onChange={(e) => handleOnChangePhong(e)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Giá phòng (1 đêm)"
          className="mb-3"
        >
          <Form.Control
            type="number"
            placeholder="Giá phòng (1 đêm)"
            name="giaPhong"
            min={0}
            value={tempPhong && tempPhong.giaPhong ? tempPhong.giaPhong : ""}
            onChange={(e) => handleOnChangePhong(e)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Được hút thuốc"
          className="mb-3"
        >
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => handleOnSelect("duocHutThuoc", e)}
          >
            <option value={true} selected={tempPhong.duocHutThuoc}>
              Có
            </option>
            <option value={false} selected={!tempPhong.duocHutThuoc}>
              Không
            </option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Mang thú cưng"
          className="mb-3"
        >
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => handleOnSelect("mangThuCung", e)}
          >
            <option value={true} selected={tempPhong.mangThuCung}>
              Có
            </option>
            <option value={false} selected={!tempPhong.mangThuCung}>
              Không
            </option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Loại phòng"
          className="mb-3"
        >
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => handleOnSelect("maLoaiPhong", e)}
          >
            {tempLoaiPhong &&
              tempLoaiPhong.length !== 0 &&
              tempLoaiPhong.map((loaiPhong, index) => {
                return (
                  <option
                    value={`${loaiPhong.maLoaiPhong}`}
                    key={index}
                    selected={
                      tempPhong.maLoaiPhong &&
                      tempPhong.maLoaiPhong == loaiPhong.maLoaiPhong
                    }
                  >
                    {loaiPhong.tenLoaiPhong}
                  </option>
                );
              })}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Tầng" className="mb-3">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => handleOnSelect("maTang", e)}
          >
            {tempTang &&
              tempTang.length !== 0 &&
              tempTang.map((tang, index) => {
                return (
                  <option
                    value={`${tang.maTang}`}
                    key={index}
                    selected={
                      tempPhong.maTang && tempPhong.maTang == tang.maTang
                    }
                  >
                    {tang.tenTang}
                  </option>
                );
              })}
          </Form.Select>
        </FloatingLabel>
        <Button variant="success" onClick={() => setShowImageSelect(true)}>
          Xem hình (
          {tempPhong.hinhAnhPhong && tempPhong.hinhAnhPhong.length
            ? tempPhong.hinhAnhPhong.length
            : 0}
          )
        </Button>
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
  display: flex;
  flex-direction: column;
  height: 37%;
  overflow-y: auto;
  justify-content: space-between;
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
  .field-container {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
    button {
      height: 40px;
      /* padding-inline: 2rem; */
      width: 150px;
    }
    input {
      min-width: 150px;
    }
    select {
      min-width: 150px;
    }
  }
  .btn-container {
    display: flex;
    gap: 1.5rem;
    margin-top: 20px;
    button {
      padding: 0.5rem 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Inputs;
