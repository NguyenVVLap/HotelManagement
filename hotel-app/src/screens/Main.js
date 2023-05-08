import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FrmDatPhong from "../components/FrmDatPhong";
import FrmTang from "../components/FrmTang";
import FrmDichVu from "../components/FrmDichVu";
import Menu from "../components/Menu";
import FrmKhachHang from "../components/FrmKhachHang";
import FrmNhanVien from "../components/FrmNhanVien";
import FrmQuanLyPhong from "../components/FrmQuanLyPhong";
import FrmTimKiemDichVu from "../components/FrmDichVu/TimKiemDichVu";
import FrmTimKiemKhachHang from "../components/FrmKhachHang/TimKiemKhachHang";
import FrmTimKiemNhanVien from "../components/FrmNhanVien/TimKiemNhanVien";
import FrmNhanPhong from "../components/FrmNhanPhong";
import FrmLapHoaDon from "../components/FrmLapHoaDon";
import FrmTimKiemLoaiPhong from "../components/FrmTimKiemLoaiPhong";
import FrmTimKiemTang from "../components/FrmTimKiemTang";
import FrmTimKiemPhong from "../components/FrmTimKiemPhong";
import FrmCapNhatCa from "../components/FrmCapNhatCa";

import FrmDatDichVu from "../components/FrmDatDichVu";

import FrmThongKePhong from "../components/FrmThongKe/FrmThongKePhong";
import FrmThongKeDoanhThu from "../components/FrmThongKe/FrmThongKeDoanhThu";
import FrmThongKeDichVu from "../components/FrmThongKe/FrmThongKeDichVu";
import TabThongKe from "../components/FrmThongKe/TabThongKe";
import FrmPhanCong from "../components/FrmPhanCong";
import FrmChamCong from "../components/FrmChamCong";

function Main() {
  const navigate = useNavigate();
  const [navSelected, setNavSelected] = useState({
    room: false,
    guest: true,
    staff: false,
    bill: false,
    roomType: false,
    floor: false,
    booking: false,
    service: false,
    report: false,
    shift: false,
  });
  const [subNavSelected, setSubNavSelected] = useState({
    nav: "guest",
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
          {subNavSelected.subnav === "update-room" && <FrmQuanLyPhong />}
          {subNavSelected.subnav === "search-room" && <FrmTimKiemPhong />}
          {subNavSelected.subnav === "check-in" && <FrmNhanPhong />}
          {subNavSelected.subnav === "add-bill" && <FrmLapHoaDon />}
          {subNavSelected.subnav === "update-floor" && <FrmTang />}
          {subNavSelected.subnav === "search-floor" && <FrmTimKiemTang />}
          {subNavSelected.subnav === "search-room-type" && (
            <FrmTimKiemLoaiPhong />
          )}
          {subNavSelected.subnav === "update-service" && <FrmDichVu />}
          {subNavSelected.subnav === "booking-service" && <FrmDatDichVu />}
          {subNavSelected.subnav === "update-guest" && <FrmKhachHang />}
          {subNavSelected.subnav === "update-staff" && <FrmNhanVien />}
          {subNavSelected.subnav === "search-service" && <FrmTimKiemDichVu />}
          {subNavSelected.subnav === "search-guest" && <FrmTimKiemKhachHang />}
          {subNavSelected.subnav === "search-staff" && <FrmTimKiemNhanVien />}
          {subNavSelected.subnav === "room-report" && <FrmThongKePhong />}
          {subNavSelected.subnav === "service-report" && <FrmThongKeDichVu />}
          {subNavSelected.subnav === "doanhthu-report" && (
            <FrmThongKeDoanhThu />
          )}
          {subNavSelected.subnav === "report-staff" && <TabThongKe />}
          {subNavSelected.subnav === "update-shift" && <FrmCapNhatCa />}
          {subNavSelected.subnav === "assign" && <FrmPhanCong />}
          {subNavSelected.subnav === "timekeeping" && <FrmChamCong />}
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
