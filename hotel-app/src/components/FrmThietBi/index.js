import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import {
  addRoomTypeRoute,
  findRoomTypeRoute,
  getRoomTypesRoute,
} from "../../utils/APIRoutes";
import Inputs from "./components/Inputs";
import Search from "./components/Search";
import TableData from "./components/TableData";

function FrmLoaiPhong() {
  const [loaiPhongSelected, setLoaiPhongSelected] = useState(undefined);
  const [dsLoaiPhong, setDsLoaiPhong] = useState(undefined);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [loaiPhongMoi, setLoaiPhongMoi] = useState({
    maLoaiPhong: 0,
    tenLoaiPhong: "",
    sucChua: 0,
    soGiuong: 0,
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (loaiPhongSelected) {
      setLoaiPhongMoi(loaiPhongSelected);
    } else {
      setLoaiPhongMoi({
        maLoaiPhong: 0,
        tenLoaiPhong: "",
        sucChua: 0,
        soGiuong: 0,
      });
    }
  }, [loaiPhongSelected]);

  const onHandleAdd = async () => {
    if (loaiPhongMoi.maLoaiPhong === 0 && validate()) {
      console.log(loaiPhongMoi);
      const { data } = await axios.post(addRoomTypeRoute, loaiPhongMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsLoaiPhong(data);
        setLoaiPhongSelected(undefined);
      }
    }
  };
  const onHandleUpdate = async () => {
    if (loaiPhongMoi.maLoaiPhong !== 0 && validateUpdate()) {
      const { data } = await axios.post(addRoomTypeRoute, loaiPhongMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsLoaiPhong(data);
        setLoaiPhongSelected(undefined);
      }
    }
  };

  const validateUpdate = () => {
    const { tenLoaiPhong, soGiuong, sucChua, maLoaiPhong } = loaiPhongMoi;
    if (soGiuong < 0) {
      setToast({
        header: "Số giường không được < 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    if (sucChua < 0) {
      setToast({
        header: "Sức chứa không được < 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsLoaiPhong.length; i++) {
      if (
        tenLoaiPhong === dsLoaiPhong[i].tenLoaiPhong &&
        maLoaiPhong === dsLoaiPhong[i].maLoaiPhong
      ) {
        setToast({
          header: "Tên loại phòng đã tồn tại",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return false;
      }
    }
    return true;
  };
  const validate = () => {
    const { tenLoaiPhong, soGiuong, sucChua } = loaiPhongMoi;
    if (soGiuong < 0) {
      setToast({
        header: "Số giường không được < 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    if (sucChua < 0) {
      setToast({
        header: "Sức chứa không được < 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsLoaiPhong.length; i++) {
      if (tenLoaiPhong === dsLoaiPhong[i].tenLoaiPhong) {
        setToast({
          header: "Tên loại phòng đã tồn tại",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return false;
      }
    }
    return true;
  };
  const onHandleSearch = async () => {
    const { data } = await axios.post(findRoomTypeRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (data) {
      setDsLoaiPhong(data);
      setLoaiPhongSelected(undefined);
    }
  };

  const onHandleRefresh = () => {
    loadLoaiPhongFromDB();
  };

  useEffect(() => {
    loadLoaiPhongFromDB();
  }, []);
  const loadLoaiPhongFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getRoomTypesRoute}`, {}, config);
    setDsLoaiPhong(data);
  };

  return (
    <StyleContainer>
      <h1>Cập nhật loại phòng</h1>
      <div className="container">
        <Inputs
          loaiPhongMoi={loaiPhongMoi}
          setLoaiPhongMoi={setLoaiPhongMoi}
          onHandleAdd={onHandleAdd}
          onHandleUpdate={onHandleUpdate}
          onHandleRefresh={onHandleRefresh}
        />
        <Search
          search={search}
          setSearch={setSearch}
          onHandleSearch={onHandleSearch}
        />
        <TableData
          loaiPhongSelected={loaiPhongSelected}
          setLoaiPhongSelected={setLoaiPhongSelected}
          dsLoaiPhong={dsLoaiPhong}
        />
      </div>
      {toast && (
        <ToastContainer
          position="bottom-end"
          style={{ bottom: "1rem", right: "1rem" }}
        >
          <Toast
            onClose={() => setToast(null)}
            show={toast !== null}
            bg={toast.bg}
            autohide={true}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{toast.header}</strong>
              <small className="text-muted"></small>
            </Toast.Header>
            {/* <Toast.Body style={{ color: `${toast.textColor}` }}>
                {toast.content}
              </Toast.Body> */}
          </Toast>
        </ToastContainer>
      )}
    </StyleContainer>
  );
}

const StyleContainer = styled.div`
  height: 100%;
  h1 {
    height: 8%;
    margin: 0;
    text-align: center;
  }
  .container {
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;

export default FrmLoaiPhong;
