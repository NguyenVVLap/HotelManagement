import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FrmDatPhong from "../components/FrmDatPhong";
import FrmTang from "../components/FrmTang";
import FrmDichVu from "../components/FrmDichVu";
import Menu from "../components/Menu";
import FrmThietBi from "../components/FrmThietBi";
import FrmKhachHang from "../components/FrmKhachHang";

function Main() {
  const navigate = useNavigate();
  const [navSelected, setNavSelected] = useState({
    room: true,
    guest: false,
    staff: false,
    bill: false,
    equipment: false,
    floor: false,
    booking: false,
    service: false,
  });
  const [subNavSelected, setSubNavSelected] = useState({
    nav: "room",
    subnav: "book",
  });

  useEffect(() => {
    checkLogin();
  });
  const checkLogin = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
    }
  };
  return (
    <Container>
      <Menu
        navSelected={navSelected}
        setNavSelected={setNavSelected}
        subNavSelected={subNavSelected}
        setSubNavSelected={setSubNavSelected}
      ></Menu>
      <div className="big-container">
        {/* <TitleBar /> */}
        <div className="wrapper">
          {subNavSelected.subnav === "book" && <FrmDatPhong />}
          {navSelected.floor && <FrmTang />}
          {navSelected.equipment && <FrmThietBi />}
          {subNavSelected.subnav === "manager-service" && <FrmDichVu />}
          {subNavSelected.subnav === "manager-guest" && <FrmKhachHang />}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 20% 80%;
  .big-container {
    display: flex;
    flex-direction: column;
    .wrapper {
      width: 100%;
      height: 100vh;
      /* background-color: black; */
    }
  }
`;

export default Main;
