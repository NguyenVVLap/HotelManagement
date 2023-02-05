import React, { useState } from "react";
import styled from "styled-components";
import { BsDoorOpen } from "react-icons/bs";

import Logo from "../assets/logo.png";

function Menu() {
  const [openSubMenu, setOpenSubMenu] = useState([
    { titleName: "Phòng", isOpen: true },
  ]);
  const isOpening = (name) => {
    let result = false;
    openSubMenu.forEach((item) => {
      if (name === item.titleName && item.isOpen) {
        result = true;
      }
    });
    return result;
  };
  return (
    <Container>
      <div className="header">
        <div className="img-container">
          <img className="logo-img" src={Logo} />
        </div>
        <p className="title">Tên khách sạn</p>
      </div>
      <div className="btn-container">
        <button className={`btn ${isOpening("Phòng") && "btn-selected"}`}>
          <div className="menu-content">
            <BsDoorOpen />
            <p className="btn-title">Phòng</p>
          </div>

          {isOpening("Phòng") && (
            <div className="sub-menu-container">
              <button className="btn-sub">
                <BsDoorOpen />
                <p className="btn-sub-title">Đặt phòng</p>
              </button>
              <button className="btn-sub">
                <BsDoorOpen />
                <p className="btn-sub-title">Hủy phòng</p>
              </button>
              <button className="btn-sub">
                <BsDoorOpen />
                <p className="btn-sub-title">Xem danh sách phòng</p>
              </button>
            </div>
          )}
        </button>
        <button className="btn">
          <div className="menu-content">
            <BsDoorOpen />
            <p className="btn-title">Khách hàng</p>
          </div>
        </button>
        <button className="btn">
          <div className="menu-content">
            <BsDoorOpen />
            <p className="btn-title">Nhân viên</p>
          </div>
        </button>
        <button className="btn">
          <div className="menu-content">
            <BsDoorOpen />
            <p className="btn-title">Hóa đơn</p>
          </div>
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
  background-image: linear-gradient(#4286f4, #373b44);
  .header {
    width: 100%;
    padding: 0.5rem;
    margin-left: 0.5rem;
    display: flex;
    gap: 1rem;
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
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
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
        border-start-end-radius: 50%;
        padding: 0.5rem 1rem;
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
        }
        .btn-title {
          color: #fff;
          font-size: 1rem;
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
          border-start-end-radius: 50%;
          padding: 0.5rem 1rem;
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
          }
          .btn-sub-title {
            color: #fff;
            font-size: 0.8rem;
          }
          svg {
            color: #fff;
            font-size: 1rem;
          }
        }
      }
    }
  }
`;

export default Menu;
