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
  const [phongMoi, setPhongMoi] = useState({});
  const [tempPhong, setTempPhong] = useState({});
  const [tempTang, setTempTang] = useState([]);
  const [tempLoaiPhong, setTempLoaiPhong] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTempPhong(phongMoi);
  }, [phongMoi]);

  useEffect(() => {
    if (phongSelected) {
      setPhongMoi(phongSelected);
    } else {
      setPhongMoi({});
    }
  }, [phongSelected]);

  const onHandleAdd = async () => {
    if (!tempPhong.maPhong && validate()) {
      let phongMoiTemp = {
        phong: {
          maPhong: tempPhong.maPhong || 0,
          tenPhong: tempPhong.tenPhong,
          moTaPhong: tempPhong.moTaPhong ? tempPhong.moTaPhong : "",
          maLoaiPhong: tempPhong.maLoaiPhong || 1,
          maTang: tempPhong.maTang || 1,
          giaPhong: tempPhong.giaPhong || 0,
          duocHutThuoc: tempPhong.duocHutThuoc ? true : false,
          mangThuCung: tempPhong.mangThuCung ? true : false,
          trangThaiPhong: true,
          hinhAnhPhong: tempPhong.hinhAnhPhong || [],
        },
      };
      const res = await axios.post(addRoomRoute, phongMoiTemp, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (res.data) {
        loadPhongFromDB();
        setPhongSelected(undefined);
      }
    }
  };
  const onHandleUpdate = async () => {
    if (
      tempPhong &&
      tempPhong.maPhong &&
      tempPhong.maPhong !== 0 &&
      validateUpdate()
    ) {
      let phongMoiTemp = {
        phong: {
          maPhong: tempPhong.maPhong,
          tenPhong: tempPhong.tenPhong,
          moTaPhong: tempPhong.moTaPhong ? tempPhong.moTaPhong : "",
          maLoaiPhong: tempPhong.maLoaiPhong || 1,
          maTang: tempPhong.maTang || 1,
          giaPhong: tempPhong.giaPhong || 0,
          duocHutThuoc: tempPhong.duocHutThuoc ? true : false,
          mangThuCung: tempPhong.mangThuCung ? true : false,
          trangThaiPhong: true,
          hinhAnhPhong: tempPhong.hinhAnhPhong || [],
        },
      };
      const { data } = await axios.post(addRoomRoute, phongMoiTemp, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data) {
        loadPhongFromDB();
        setPhongSelected(undefined);
      }
    }
  };

  const validate = () => {
    const { tenPhong, giaPhong } = tempPhong;
    if (tenPhong === "") {
      setToast({
        header: "Tên phòng không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsPhong.length; i++) {
      if (tenPhong === dsPhong[i].tenPhong) {
        setToast({
          header: "Tên phòng không được trùng",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return false;
      }
    }
    if (giaPhong <= 0) {
      setToast({
        header: "Giá phòng phải >= 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    return true;
  };
  const validateUpdate = () => {
    const { tenPhong, maPhong } = tempPhong;
    if (tenPhong === "") {
      setToast({
        header: "Tên phòng không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsPhong.length; i++) {
      if (tenPhong === dsPhong[i].tenPhong && maPhong !== dsPhong[i].maPhong) {
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
  const onHandleChangeHinhAnhPhongFromTempPhong = (downloadURL) => {
    if (
      tempPhong &&
      tempPhong.hinhAnhPhong &&
      tempPhong.hinhAnhPhong.length > 0
    ) {
      setTempPhong({
        ...tempPhong,
        hinhAnhPhong: [...tempPhong.hinhAnhPhong, downloadURL],
      });
    } else {
      setTempPhong({ ...tempPhong, hinhAnhPhong: [downloadURL] });
    }
  };
  return (
    <StyleContainer>
      <h1>Quản lý phòng</h1>
      <div className="container">
        <Inputs
          tempPhong={tempPhong}
          tempTang={tempTang}
          tempLoaiPhong={tempLoaiPhong}
          setTempPhong={setTempPhong}
          setShowImageSelect={setShowImageSelect}
          setTempTang={setTempTang}
          setTempLoaiPhong={setTempLoaiPhong}
          setPhongMoi={setPhongMoi}
          onHandleAdd={onHandleAdd}
          onHandleUpdate={onHandleUpdate}
          onHandleRefresh={onHandleRefresh}
        />
        <Search
          search={search}
          setSearch={setSearch}
          onHandleSearch={onHandleSearch}
          tempTang={tempTang}
          tempLoaiPhong={tempLoaiPhong}
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
          setTempPhong={setTempPhong}
          onHandleChangeHinhAnhPhongFromTempPhong={
            onHandleChangeHinhAnhPhongFromTempPhong
          }
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
