import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import {
  addEquipmentRoute,
  findEquipmentRoute,
  getEquipmentsRoute,
} from "../../utils/APIRoutes";
import Inputs from "./components/Inputs";
import Search from "./components/Search";
import TableData from "./components/TableData";

function FrmThietBi() {
  const [thietBiSelected, setThietBiSelected] = useState(undefined);
  const [dsThietBi, setDsThietBi] = useState(undefined);
  const [search, setSearch] = useState({ keyword: "", theo: "Theo mã" });
  const [thietBiMoi, setThietBiMoi] = useState({
    maThietBi: 0,
    tenThietBi: "",
    giaThietBi: 0,
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (thietBiSelected) {
      setThietBiMoi(thietBiSelected);
    } else {
      setThietBiMoi({
        maThietBi: 0,
        tenThietBi: "",
        giaThietBi: 0,
      });
    }
  }, [thietBiSelected]);

  const onHandleAdd = async () => {
    if (thietBiMoi.maThietBi === 0 && validate()) {
      const { data } = await axios.post(addEquipmentRoute, thietBiMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsThietBi(data);
        setThietBiSelected(undefined);
      }
    }
  };
  const onHandleUpdate = async () => {
    if (thietBiMoi.maThietBi !== 0 && validateUpdate()) {
      const { data } = await axios.post(addEquipmentRoute, thietBiMoi, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data && data.length !== []) {
        setDsThietBi(data);
        setThietBiSelected(undefined);
      }
    }
  };

  const validateUpdate = () => {
    const { giaThietBi } = thietBiMoi;
    if (giaThietBi < 0) {
      setToast({
        header: "Giá thiết bị không được < 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    return true;
  };
  const validate = () => {
    const { tenThietBi, giaThietBi } = thietBiMoi;
    if (tenThietBi === "") {
      setToast({
        header: "Tên thiết bị không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    for (var i = 0; i < dsThietBi.length; i++) {
      if (tenThietBi === dsThietBi[i].tenThietBi) {
        setToast({
          header: "Tên và giá thiết bị không được trùng",
          content: "",
          bg: "danger",
          textColor: "#fff",
        });
        return false;
      }
    }
    if (giaThietBi < 0) {
      setToast({
        header: "Giá thiết bị không được < 0",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    return true;
  };
  const onHandleSearch = async () => {
    const { data } = await axios.post(findEquipmentRoute, search, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (data) {
      setDsThietBi(data);
      setThietBiSelected(undefined);
    }
  };

  const onHandleRefresh = () => {
    loadThietFromDB();
  };

  useEffect(() => {
    loadThietFromDB();
  }, []);
  const loadThietFromDB = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const { data } = await axios.get(`${getEquipmentsRoute}`, {}, config);
    setDsThietBi(data);
  };

  return (
    <StyleContainer>
      <h1>Quản lý thiết bị</h1>
      <div className="container">
        <Inputs
          thietBiMoi={thietBiMoi}
          setThietBiMoi={setThietBiMoi}
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
          dsThietBi={dsThietBi}
          thietBiSelected={thietBiSelected}
          setThietBiSelected={setThietBiSelected}
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

export default FrmThietBi;
