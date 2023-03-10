import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import {
  addRoomRoute,
  findRoomRoute,
  getRoomsRoute,
} from "../../utils/APIRoutes";
import ImageSelect from "./components/ImageSelect";
import Inputs from "./components/Inputs";
import Search from "./components/Search";
import TableData from "./components/TableData";

function FrmQuanLyPhong() {
  const [phongSelected, setPhongSelected] = useState(undefined);
  const [showImageSelect, setShowImageSelect] = useState(undefined);
  const [dsPhong, setDsPhong] = useState(undefined);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [phongMoi, setPhongMoi] = useState({
    phong: {},
    dsThietBiPhong: [],
  });
  const [tempPhong, setTempPhong] = useState({});
  const [tempThietBi, setTempThietBi] = useState([]);
  const [thietBiMoi, setThietBiMoi] = useState([]);
  const [tempTang, setTempTang] = useState([]);
  const [tempLoaiPhong, setTempLoaiPhong] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTempPhong(phongMoi.phong);
    setTempThietBi(phongMoi.dsThietBiPhong);
  }, [phongMoi]);

  useEffect(() => {
    if (phongSelected) {
      setPhongMoi(phongSelected);
    } else {
      setPhongMoi({
        phong: {},
        dsThietBiPhong: [],
      });
    }
  }, [phongSelected]);

  const onHandleAdd = async () => {
    if (phongMoi.phong.maPhong === 0 && validate()) {
      const { data } = await axios.post(addRoomRoute, phongMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsPhong(data);
        setPhongSelected(undefined);
      }
    }
  };
  const onHandleUpdate = async () => {
    if (phongMoi.phong.maPhong !== 0 && validate()) {
      const { data } = await axios.post(addRoomRoute, phongMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsPhong(data);
        setPhongSelected(undefined);
      }
    }
  };

  const validate = () => {
    const { phong } = phongMoi;
    if (phong.tenPhong === "") {
      setToast({
        header: "Tên phòng không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsPhong.length; i++) {
      if (phong.tenPhong === dsPhong[i].phong.tenPhong) {
        setToast({
          header: "Tên phòng không được trùng",
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
    const { data } = await axios.post(findRoomRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (data) {
      setDsPhong(data);
      setPhongSelected(undefined);
    }
  };

  const onHandleRefresh = () => {
    loadPhongFromDB();
  };

  useEffect(() => {
    loadPhongFromDB();
  }, []);
  const loadPhongFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getRoomsRoute}`, {}, config);
    setDsPhong(data);
  };
  return (
    <StyleContainer>
      <h1>Quản lý phòng</h1>
      <div className="container">
        <Inputs
          tempPhong={tempPhong}
          tempThietBi={tempThietBi}
          tempTang={tempTang}
          tempLoaiPhong={tempLoaiPhong}
          setTempPhong={setTempPhong}
          setShowImageSelect={setShowImageSelect}
          setTempThietBi={setTempThietBi}
          setTempTang={setTempTang}
          setTempLoaiPhong={setTempLoaiPhong}
          thietBiMoi={thietBiMoi}
          setThietBiMoi={setThietBiMoi}
          setPhongMoi={setPhongMoi}
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
          dsPhong={dsPhong}
          phongSelected={phongSelected}
          setPhongSelected={setPhongSelected}
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
      {showImageSelect && (
        <ImageSelect
          tempPhong={tempPhong}
          setShowImageSelect={setShowImageSelect}
        />
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

export default FrmQuanLyPhong;
