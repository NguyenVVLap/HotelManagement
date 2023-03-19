import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import { findRoomRoute, getRoomsRoute } from "../../utils/APIRoutes";
import Search from "../FrmQuanLyPhong/components/Search";
import TableData from "../FrmQuanLyPhong/components/TableData";

function FrmTimKiemPhong() {
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
      <h1>Tìm kiếm phòng</h1>
      <div className="container">
        <Search
          search={search}
          setSearch={setSearch}
          onHandleSearch={onHandleSearch}
          tempTang={tempTang}
          tempLoaiPhong={tempLoaiPhong}
          onHandleRefresh={onHandleRefresh}
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

export default FrmTimKiemPhong;
