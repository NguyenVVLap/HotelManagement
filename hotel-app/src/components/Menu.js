import React, { useState } from "react";
import styled from "styled-components";
import { BsDoorOpen } from "react-icons/bs";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Logo from "../assets/logo.png";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DiningOutlinedIcon from "@mui/icons-material/DiningOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
import { Chip, IconButton, Tooltip, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";
function Menu({
  navSelected,
  setNavSelected,
  subNavSelected,
  setSubNavSelected,
}) {
  const onHandleSelectedNav = (nav, value) => {
    setNavSelected({
      room: false,
      guest: false,
      staff: false,
      bill: false,
      roomType: false,
      floor: false,
      booking: false,
      service: false,
      [nav]: value,
    });
  };
  const onHandleSelectedSubNav = (subnav, nav) => {
    setSubNavSelected({ subnav: subnav, nav: nav });
    setNavSelected({
      room: false,
      guest: false,
      staff: false,
      bill: false,
      roomType: false,
      floor: false,
      booking: false,
      service: false,
      [nav]: true,
    });
  };
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const thongTinNhanVien = localStorage.getItem("nhanVien")
  const nhanVien = JSON.parse(thongTinNhanVien)
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpenUserInfo(true);
  };
  const onClose = () => {
    setOpenUserInfo(false);
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  // console.log('Thong Tin Nhan Vien Menu:', nhanVien);
  // console.log('Vai Tro Menu:', nhanVien.taiKhoan.vaiTro.tenVaiTro);
  // console.log('length Name', nhanVien.hoTen.split(' ').length);
  // console.log('full Name', `${nhanVien.hoTen.split(' ')[nhanVien.hoTen.split(' ').length - 2]} ${nhanVien.hoTen.split(' ')[nhanVien.hoTen.split(' ').length - 1]} `);
  return (
    <>
      <Container>
        <div className="header">
          <div className="img-container">
            <img
              className="logo-img"
              src="/logo1.png"
              alt="logo"
              style={{
                width: "60px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>
          <p className="title" style={{ marginLeft: "5px" }}>
            Khách Sạn Sama
          </p>
        </div>
        <div className="wrapper_btn_container">
          <div className="btn-container">
            <button className={`btn ${navSelected.room && "btn-selected"}`}>
              <div
                className="menu-content"
                onClick={() => onHandleSelectedNav("room", !navSelected.room)}
              >
                <BsDoorOpen />
                <p className="btn-title">Phòng</p>
              </div>

              {navSelected.room && (
                <div className="sub-menu-container">
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "update-room" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("update-room", "room")}
                  >
                    <BsDoorOpen />
                    <p className="btn-sub-title">Cập nhật</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "search-room" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("search-room", "room")}
                  >
                    <BsDoorOpen />
                    <p className="btn-sub-title">Tìm kiếm</p>
                  </button>
                </div>
              )}
            </button>
            <button className={`btn ${navSelected.floor && "btn-selected"}`}>
              <div
                className="menu-content"
                onClick={() => {
                  onHandleSelectedNav("floor", !navSelected.floor);
                  setSubNavSelected({ nav: "", subnav: "" });
                }}
              >
                <BsDoorOpen />
                <p className="btn-title">Tầng</p>
              </div>
              {navSelected.floor && (
                <div className="sub-menu-container">
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "update-floor" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("update-floor", "floor")}
                  >
                    <ManageAccountsOutlinedIcon />
                    <p className="btn-sub-title">Cập nhật</p>
                  </button>
                  {/* Tìm kiếm khách hàng */}
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "search-floor" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("search-floor", "floor")}
                  >
                    <SearchIcon />
                    <p className="btn-sub-title">Tìm kiếm</p>
                  </button>
                </div>
              )}
            </button>
            {/* Khách hàng */}
            <button className={`btn ${navSelected.guest && "btn-selected"}`}>
              <div
                className="menu-content"
                onClick={() => {
                  onHandleSelectedNav("guest", !navSelected.guest);
                  setSubNavSelected({ nav: "", subnav: "" });
                }}
              >
                <PermContactCalendarOutlinedIcon />
                <p className="btn-title">Khách hàng</p>
              </div>
              {navSelected.guest && (
                <div className="sub-menu-container">
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "book" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("book", "guest")}
                  >
                    <BsDoorOpen />
                    <p className="btn-sub-title">Đặt phòng</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "check-in" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("check-in", "guest")}
                  >
                    <BsDoorOpen />
                    <p className="btn-sub-title">Nhận phòng</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "update-guest" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("update-guest", "guest")}
                  >
                    <ManageAccountsOutlinedIcon />
                    <p className="btn-sub-title">Cập nhật</p>
                  </button>
                  {/* Tìm kiếm khách hàng */}
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "search-guest" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("search-guest", "guest")}
                  >
                    <SearchIcon />
                    <p className="btn-sub-title">Tìm kiếm</p>
                  </button>
                </div>
              )}
            </button>
            {/* Nhân viên */}
            <button className={`btn ${navSelected.staff && "btn-selected"}`}>
              <div
                className="menu-content"
                onClick={() => {
                  onHandleSelectedNav("staff", !navSelected.staff);
                  setSubNavSelected("");
                }}
              >
                <BadgeOutlinedIcon />
                <p className="btn-title">Nhân viên</p>
              </div>
              {navSelected.staff && (
                <div className="sub-menu-container">
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "update-staff" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("update-staff", "staff")}
                  >
                    <GroupAddOutlinedIcon />
                    <p className="btn-sub-title">Cập nhật</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "search-staff" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("search-staff", "staff")}
                  >
                    <SearchIcon />
                    <p className="btn-sub-title">Tìm kiếm</p>
                  </button>

                  <button
                    className={`btn-sub ${subNavSelected.subnav === "report-staff" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("report-staff", "staff")}
                  >
                    <AssessmentOutlinedIcon />
                    <p className="btn-sub-title">Thống kê</p>
                  </button>
                </div>
              )}
            </button>
            <button className={`btn ${navSelected.bill && "btn-selected"}`}>
              <div
                className="menu-content"
                onClick={() => onHandleSelectedNav("bill", !navSelected.bill)}
              >
                <ReceiptLongIcon />
                <p className="btn-title">Hóa đơn</p>
              </div>
              {navSelected.bill && (
                <div className="sub-menu-container">
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "add-bill" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("add-bill", "bill")}
                  >
                    <BsDoorOpen />
                    <p className="btn-sub-title">Lập hóa đơn</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "manage-booking" &&
                      "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("manage-booking", "bill")}
                  >
                    <BsDoorOpen />
                    <p className="btn-sub-title">Cập nhật</p>
                  </button>

                  {/* <button
                    className={`btn-sub ${subNavSelected.subnav === "record" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("record", "bill")}
                  >
                    <BsDoorOpen />
                    <p className="btn-sub-title">Thống kê</p>
                  </button> */}
                </div>
              )}
            </button>
            {/* Dịch Vụ */}
            <button className={`btn ${navSelected.service && "btn-selected"}`}>
              <div
                className="menu-content"
                onClick={() => onHandleSelectedNav("service", !navSelected.service)}
              >
                <FastfoodOutlinedIcon />
                <p className="btn-title">Dịch vụ</p>
              </div>
              {navSelected.service && (
                <div className="sub-menu-container">
                  {/* <button
                 className={`btn-sub ${subNavSelected.subnav === "update-type-service" &&
                   "btn-sub-selected"
                   }`}
                 onClick={() =>
                   onHandleSelectedSubNav("update-type-service", "service")
                 }
               >
                 <DiningOutlinedIcon />
                 <p className="btn-sub-title">Loại dịch vụ</p>
               </button> */}
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "booking-service" &&
                      "btn-sub-selected"
                      }`}
                    onClick={() =>
                      onHandleSelectedSubNav("booking-service", "service")
                    }
                  >
                    <ManageAccountsOutlinedIcon />
                    <p className="btn-sub-title">Đặt dịch vụ</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "update-service" &&
                      "btn-sub-selected"
                      }`}
                    onClick={() =>
                      onHandleSelectedSubNav("update-service", "service")
                    }
                  >
                    <ManageAccountsOutlinedIcon />
                    <p className="btn-sub-title">Cập nhật</p>
                  </button>
                  {/* Search Dich Vu */}
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "search-service" &&
                      "btn-sub-selected"
                      }`}
                    onClick={() =>
                      onHandleSelectedSubNav("search-service", "service")
                    }
                  >
                    <SearchIcon />
                    <p className="btn-sub-title">Tìm kiếm</p>
                  </button>
                </div>
              )}
            </button>

            {/* Thống Kê */}
            {/* <button className={`btn ${navSelected.report && "btn-selected"}`}>
              <div
                className="menu-content"
                onClick={() => onHandleSelectedNav("report", !navSelected.report)}
              >
                <AssessmentOutlinedIcon />
                <p className="btn-title">Thống kê</p>
              </div>
              {navSelected.report && (
                <div className="sub-menu-container">
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "room-report" && "btn-sub-selected"
                      }`}
                    onClick={() => onHandleSelectedSubNav("room-report", "report")}
                  >
                    <MeetingRoomOutlinedIcon />
                    <p className="btn-sub-title">Phòng</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "doanhthu-report" &&
                      "btn-sub-selected"
                      }`}
                    onClick={() =>
                      onHandleSelectedSubNav("doanhthu-report", "report")
                    }
                  >
                    <MonetizationOnOutlinedIcon />
                    <p className="btn-sub-title">Doanh thu</p>
                  </button>
                  <button
                    className={`btn-sub ${subNavSelected.subnav === "service-report" &&
                      "btn-sub-selected"
                      }`}
                    onClick={() =>
                      onHandleSelectedSubNav("service-report", "report")
                    }
                  >
                    <FastfoodOutlinedIcon />
                    <p className="btn-sub-title">Dịch vụ</p>
                  </button>
                </div>
              )}
            </button> */}
          </div>
          <div style={{ width: '100%', padding: '16px', height: '18%', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
            <div style={{ width: '100%', height: '90%', borderRadius: '10px', padding: '10px', border: '1px solid white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexGrow: '2' }}>
                <Tooltip title='Xem thông tin cá nhân' placement="bottom-end">
                  <IconButton onClick={() => { showDrawer() }}>
                    <Avatar size={50} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  </IconButton>
                </Tooltip>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '2', marginLeft: '5px' }}>
                  <Typography variant="h6" >
                    {nhanVien &&
                      `${nhanVien.hoTen.split(' ')[nhanVien.hoTen.split(' ').length - 2]} ${nhanVien.hoTen.split(' ')[nhanVien.hoTen.split(' ').length - 1]} `
                    }
                  </Typography>
                  {nhanVien && nhanVien.taiKhoan.vaiTro.tenVaiTro === 'ROLE_MANAGEMENT' ? <Chip color="error" size="small" label='Quản lý' sx={{ width: '90px' }} /> : <Chip color="primary" size="small" label='Nhân viên' sx={{ width: '90px' }} />}

                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => { handleLogOut() }} >
                  <LogoutIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <StyleDrawer width={640} placement="right" onClose={onClose} open={openUserInfo}>
        <p className="site-description-item-profile-p"> Thông tin cá nhân</p>
        <Row>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Họ tên:</p>
              {nhanVien && nhanVien.hoTen}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Căn cước công dân:</p>
              {nhanVien && nhanVien.cccd}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Ngày sinh:</p>
              {moment(nhanVien && nhanVien.ngaySinh).format("DD/MM/YYYY")}

            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Quốc gia</p>
              Việt Nam
            </div>
          </Col>
        </Row>

        <Divider />
        <p className="site-description-item-profile-p">Thông tin liên lạc</p>
        <Row>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Số điện thoại</p>
              {nhanVien && nhanVien.soDienThoai}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Địa chỉ:</p>
              {nhanVien && nhanVien.diaChi}
            </div>
          </Col>

        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Công ty</p>
        <Row>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Tên tài khoản:</p>
              {nhanVien && nhanVien.soDienThoai}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Tình trạng tài khoản:</p>
              {nhanVien && nhanVien.taiKhoan.daKichHoat === true ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Chức vụ:</p>
              {nhanVien && nhanVien.taiKhoan.vaiTro.tenVaiTro === 'ROLE_MANAGEMENT' ? 'nhân viên quản lý' : 'nhân viên lễ tân'}
            </div>
          </Col>
          <Col span={12}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Ngày vào làm:</p>
              {moment(nhanVien && nhanVien.ngayVaoLam).format("DD/MM/YYYY")}
            </div>
          </Col>
        </Row>
        <Row >
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="danger" style={{ padding: '0.5rem 1.5rem' }} onClick={() => handleLogOut()}>
              Đăng Xuất
            </Button>
          </Col>
        </Row>

      </StyleDrawer>
    </>

  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: linear-gradient(to bottom, #4776e6, #8e54e9);
  height: 100vh;
  button {
    &:focus {
      outline: none !important;
      outline-offset: none !important;
    }
  }
  .header {
    width: 100%;
    padding: 0.8rem;
    margin-left: 0.5rem;
    display: flex;
    /* align-items: center;
    justify-content: center; */
    gap: 0.4rem;
    height: 9%;
    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      .logo-img {
        width: 100%;
      }
    }

    .title {
      color: #fff;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
  .wrapper_btn_container{
    display: flex;
    flex-direction: column;
   justify-content: space-between;
    width: 100%;
    height: 93%;
    /* background-color:red; */
    overflow:hidden;
  }
  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 75%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-image: linear-gradient(#373b44, #1095c1);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    button {
    }
    .btn {
      /* background-color: red; */
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: transparent;
      border: none;
      cursor: pointer;
      .menu-content {
        display: flex;
        /* border-start-end-radius: 50%; */
        padding: 1rem;
        gap: 0.5rem;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        background-color: transparent;
        background-image: linear-gradient(#1095c1, #1095c1);
        background-size: 0 100%;
        background-repeat: no-repeat;
        transition: 0.4s;
        &:hover {
          /* border-bottom: 1px solid #ccc; */
          /* opacity: 0.5; */
          background-size: 100% 100%;
          background: rgba(0, 0, 0, 0.2);
        }
        .btn-title {
          color: #fff;
          font-size: 1rem;
          margin: 0;
        }
        svg {
          color: #fff;
          font-size: 1.5rem;
        }
      }
    }
    .btn-selected {
      .menu-content {
        background-color: #1095c1;
        background-image: linear-gradient(#1095c1, #1095c1);
        .btn-title {
          font-weight: bold;
        }
      }
      .sub-menu-container {
        padding-left: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        .btn-sub {
          /* border-start-end-radius: 50%; */
          padding: 0.8rem 1rem;
          width: 100%;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          background-color: transparent;
          background-image: linear-gradient(#1095c1, #1095c1);
          background-size: 0 100%;
          background-repeat: no-repeat;
          transition: 0.4s;
          border: none;
          cursor: pointer;
          &:hover {
            /* border-bottom: 1px solid #ccc; */
            /* opacity: 0.5; */
            background-size: 100% 100%;
            background: rgba(0, 0, 0, 0.2);
          }
          .btn-sub-title {
            color: #fff;
            font-size: 0.8rem;
            margin: 0;
          }
          svg {
            color: #fff;
            font-size: 1rem;
          }
        }
        .btn-sub-selected {
          background-color: #1095c1;
          .btn-sub-title {
            font-weight: bold;
          }
        }
      }
    }
  }
`;
const StyleDrawer = styled(Drawer)`
.site-description-item-profile-wrapper {
  margin-bottom: 7px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
}

.ant-drawer-body p.site-description-item-profile-p {
  display: block;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  line-height: 1.5715;
}

.site-description-item-profile-p-label {
  display: inline-block;
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.85);
}
`;
export default Menu;
