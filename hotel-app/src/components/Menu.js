import React from "react";
import styled from "styled-components";
import { BsDoorOpen } from "react-icons/bs";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Logo from "../assets/logo.png";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

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
      equipment: false,
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
      equipment: false,
      floor: false,
      booking: false,
      service: false,
      [nav]: true,
    });
  };
  return (
    <Container>
      <div className="header">
        <div className="img-container">
          <img className="logo-img" src={Logo} alt="logo" />
        </div>
        <p className="title">Khách Sạn Sama</p>
      </div>
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
                className={`btn-sub ${
                  subNavSelected.subnav === "book" && "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("book", "room")}
              >
                <BsDoorOpen />
                <p className="btn-sub-title">Đặt phòng</p>
              </button>
              <button
                className={`btn-sub ${
                  subNavSelected.subnav === "check-in" && "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("check-in", "room")}
              >
                <BsDoorOpen />
                <p className="btn-sub-title">Nhận phòng</p>
              </button>
              <button
                className={`btn-sub ${
                  subNavSelected.subnav === "cancel" && "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("cancel", "room")}
              >
                <BsDoorOpen />
                <p className="btn-sub-title">Hủy đặt phòng</p>
              </button>
              <button
                className={`btn-sub ${
                  subNavSelected.subnav === "manage-room" && "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("manage-room", "room")}
              >
                <BsDoorOpen />
                <p className="btn-sub-title">Quản lý</p>
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
        </button>
        <button className={`btn ${navSelected.equipment && "btn-selected"}`}>
          <div
            className="menu-content"
            onClick={() => {
              onHandleSelectedNav("equipment", !navSelected.equipment);
              setSubNavSelected({ nav: "", subnav: "" });
            }}
          >
            <BsDoorOpen />
            <p className="btn-title">Thiết bị</p>
          </div>
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
                className={`btn-sub ${
                  subNavSelected.subnav === "manager-guest" &&
                  "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("manager-guest", "guest")}
              >
                <ManageAccountsOutlinedIcon />
                <p className="btn-sub-title">Quản lý Khách hàng</p>
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
                className={`btn-sub ${
                  subNavSelected.subnav === "manager-staff" &&
                  "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("manager-staff", "staff")}
              >
                <GroupAddOutlinedIcon />
                <p className="btn-sub-title">Quản lý nhân viên</p>
              </button>
            </div>
          )}
        </button>
        <button className={`btn ${navSelected.bill && "btn-selected"}`}>
          <div
            className="menu-content"
            onClick={() => onHandleSelectedNav("bill", !navSelected.bill)}
          >
            <BsDoorOpen />
            <p className="btn-title">Hóa đơn</p>
          </div>
          {navSelected.bill && (
            <div className="sub-menu-container">
              <button
                className={`btn-sub ${
                  subNavSelected.subnav === "add-bill" && "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("add-bill", "bill")}
              >
                <BsDoorOpen />
                <p className="btn-sub-title">Lập hóa đơn</p>
              </button>
              <button
                className={`btn-sub ${
                  subNavSelected.subnav === "manage-booking" &&
                  "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("manage-booking", "bill")}
              >
                <BsDoorOpen />
                <p className="btn-sub-title">Quản lý</p>
              </button>
              <button
                className={`btn-sub ${
                  subNavSelected.subnav === "record" && "btn-sub-selected"
                }`}
                onClick={() => onHandleSelectedSubNav("record", "bill")}
              >
                <BsDoorOpen />
                <p className="btn-sub-title">Thống kê</p>
              </button>
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
              <button
                className={`btn-sub ${
                  subNavSelected.subnav === "manager-service" &&
                  "btn-sub-selected"
                }`}
                onClick={() =>
                  onHandleSelectedSubNav("manager-service", "service")
                }
              >
                <ManageAccountsOutlinedIcon />
                <p className="btn-sub-title">Quản lý dịch vụ</p>
              </button>
            </div>
          )}
        </button>
      </div>
    </Container>
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
  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 93%;
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

export default Menu;
