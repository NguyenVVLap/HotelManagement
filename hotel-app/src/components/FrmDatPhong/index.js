import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Grid, Stack } from '@mui/material';
import styled from "styled-components";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Toast, ToastContainer } from "react-bootstrap";

import RoomSelected from "./components/RoomSelected";
import Rooms from "./components/Rooms";
import {
  addBookingsRoute,
  getBookingsRoute,
  timKiemKhachHang,
} from "../../utils/APIRoutes";
import axios from "axios";


function FrmDatPhong() {
  const [showRooms, setShowRooms] = useState(false);
  const [roomChoosen, setRoomChoosen] = useState([]);
  const [showDetail, setShowDetail] = useState(undefined);
  const [guestInfo, setGuestInfo] = useState({});
  const [bookingInfo, setBookingInfo] = useState({});
  const [toast, setToast] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    let ngayNhan = new Date().getTime();
    let ngayTra = new Date().getTime();
    if (bookingInfo.ngayNhanPhong) {
      ngayNhan = bookingInfo.ngayNhanPhong.toDate().getTime();
    }
    if (bookingInfo.ngayTraPhong) {
      ngayTra = bookingInfo.ngayTraPhong.toDate().getTime();
    }
    let difference = ngayTra - ngayNhan;
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    for (let i = 0; i < roomChoosen.length; i++) {
      price += roomChoosen[i].giaPhong * totalDays;
    }
    setTotalPrice(price);
  }, [roomChoosen]);

  useEffect(() => {
    let price = 0;
    let ngayNhan = new Date().getTime();
    let ngayTra = new Date().getTime();
    if (bookingInfo.ngayNhanPhong) {
      ngayNhan = bookingInfo.ngayNhanPhong.toDate().getTime();
    }
    if (bookingInfo.ngayTraPhong) {
      ngayTra = bookingInfo.ngayTraPhong.toDate().getTime();
    }
    let difference = ngayTra - ngayNhan;
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    console.log(totalDays);
    for (let i = 0; i < roomChoosen.length; i++) {
      price += roomChoosen[i].giaPhong * totalDays;
    }
    setTotalPrice(price);
  }, [bookingInfo]);

  const handleOnChangeGuestInfo = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };
  const onHandleChangeDateBooking = (date, name) => {
    setBookingInfo({ ...bookingInfo, [name]: date });
  };
  const onHandleChangeBooking = (e) => {
    setBookingInfo({ ...bookingInfo, [e.target.name]: e.target.value });
  };
  const onHandeOpenSelectRoom = () => {
    if (validateDate()) {
      setShowRooms(true);
    }
  };

  const validateDate = () => {
    const { ngayNhanPhong, ngayTraPhong } = bookingInfo;
    if (dayjs(ngayNhanPhong).isAfter(dayjs(ngayTraPhong))) {
      setToast({
        header: "Ngày nhận phòng phải trước ngày trả phòng",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    // if (dayjs(new Date()).isAfter(dayjs(ngayNhanPhong))) {
    //   setToast({
    //     header: "Ngày nhận phòng không được trước ngày hiện tại",
    //     content: "",
    //     bg: "danger",
    //     textColor: "#fff",
    //   });
    //   return false;
    // }
    return true;
  };

  const onHandleBooking = async () => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    // };
    // const { data } = await axios.get(`${getBookingsRoute}`, {}, config);
    // console.log(data);
    if (validateBooking()) {
      let dsMaPhong = [];
      for (let i = 0; i < roomChoosen.length; i++) {
        dsMaPhong = [...dsMaPhong, roomChoosen[i].maPhong];
      }
      const requestData = {
        maPhieuDatPhong: 0,
        ngayDatPhong: new Date(),
        giamGia: 0,
        ghiChuDatPhong: bookingInfo.ghiChuDatPhong,
        ngayNhanPhong: bookingInfo.ngayNhanPhong || new Date(),
        ngayTraPhong: bookingInfo.ngayTraPhong || new Date(),
        trangThaiDatPhong: "MOI_DAT",
        dsMaPhong,
        khachHang: guestInfo,
      };
      const { data } = await axios.post(addBookingsRoute, requestData, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      if (data) {
        setToast({
          header: "Đặt phòng thành công",
          content: "",
          bg: "success",
          textColor: "#fff",
        });
        setRoomChoosen([]);
        setGuestInfo({});
        setBookingInfo({});
        setTotalPrice(0);
      }
    }
  };

  const validateBooking = () => {
    // const {} = roomChoosen;
    const { cccdKhachHang, hoTen, soDienThoaiKH, emailKH, diaChiKH } =
      guestInfo;
    if (!roomChoosen || roomChoosen.length === 0) {
      setToast({
        header: "Bạn chưa chọn phòng",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    if (!validateDate()) {
      return false;
    }
    if (!cccdKhachHang || cccdKhachHang === "") {
      setToast({
        header: "CCCD không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    if (!hoTen || hoTen === "") {
      setToast({
        header: "Họ tên không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    if (!soDienThoaiKH || soDienThoaiKH === "") {
      setToast({
        header: "Số điện thoại không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    if (!emailKH || emailKH === "") {
      setToast({
        header: "Email không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    if (!diaChiKH || diaChiKH === "") {
      setToast({
        header: "Địa chỉ không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }
    return true;
  };

  const onHandleSearchGuest = async () => {
    const { data } = await axios.post(
      timKiemKhachHang,
      { theo: "Theo căn cước công dân", keyword: guestInfo.cccdKhachHang },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
    if (data && data.length > 0 && data[0] != null) {
      setGuestInfo(data[0]);
    } else {
      setToast({
        header: "Không tìm thấy khách hàng",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
    }
  };
  const onHandleClearGuest = () => {
    setGuestInfo({});
  };
  return (
    <StyledContainer>
      <div className="container">
        <h1>Đặt phòng</h1>
        <div className="content">
          <div className="select-container">
            <div className="room-select-container">
              <Grid container   >
                <Stack flexDirection='row' alignItems='center' justifyContent='space-around'>
                  <Grid item md={3}>
                    <Button
                      variant="primary"
                      onClick={() => onHandeOpenSelectRoom()}
                    >
                      Chọn phòng
                    </Button>
                  </Grid >
                  <Grid item md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          sx={{ width: "100%" }}
                          label="Ngày nhận phòng"
                          value={
                            bookingInfo.ngayNhanPhong
                              ? bookingInfo.ngayNhanPhong
                              : dayjs(new Date())
                          }
                          onChange={(date) => {
                            onHandleChangeDateBooking(date, "ngayNhanPhong");
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>

                  <Grid item md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          sx={{ width: "100%" }}
                          label="Ngày trả phòng"
                          value={
                            bookingInfo.ngayTraPhong
                              ? bookingInfo.ngayTraPhong
                              : dayjs(new Date())
                          }
                          onChange={(date) => {
                            onHandleChangeDateBooking(date, "ngayTraPhong");
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Stack >
              </Grid>
              <div className="table-container">
                <RoomSelected
                  roomChoosen={roomChoosen}
                  setRoomChoosen={setRoomChoosen}
                  setShowDetail={setShowDetail}
                />
              </div>
            </div>
          </div>
          <div className="input-info">
            <div className="customer-info">
              <h2>Thông tin khách hàng</h2>

              <div className="form-guest-container">
                <div className="cccd-container">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="CCCD"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="CCCD"
                      name="cccdKhachHang"
                      min={0}
                      value={
                        guestInfo && guestInfo.cccdKhachHang
                          ? guestInfo.cccdKhachHang
                          : ""
                      }
                      onChange={(e) => handleOnChangeGuestInfo(e)}
                    />
                  </FloatingLabel>
                  <Button
                    variant="success"
                    onClick={() => onHandleSearchGuest()}
                  >
                    <AiOutlineSearch />
                  </Button>
                  <Button variant="danger" onClick={() => onHandleClearGuest()}>
                    <AiOutlineClose />
                  </Button>
                </div>
                <div className="customer-common-info">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Họ tên"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Họ tên"
                      name="hoTen"
                      min={0}
                      value={
                        guestInfo && guestInfo.hoTen ? guestInfo.hoTen : ""
                      }
                      onChange={(e) => handleOnChangeGuestInfo(e)}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Số điện thoại"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Số điện thoại"
                      name="soDienThoaiKH"
                      min={0}
                      value={
                        guestInfo && guestInfo.soDienThoaiKH
                          ? guestInfo.soDienThoaiKH
                          : ""
                      }
                      onChange={(e) => handleOnChangeGuestInfo(e)}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="emailKH"
                      min={0}
                      value={
                        guestInfo && guestInfo.emailKH ? guestInfo.emailKH : ""
                      }
                      onChange={(e) => handleOnChangeGuestInfo(e)}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Địa chỉ"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Địa chỉ"
                      name="diaChiKH"
                      min={0}
                      value={
                        guestInfo && guestInfo.diaChiKH
                          ? guestInfo.diaChiKH
                          : ""
                      }
                      onChange={(e) => handleOnChangeGuestInfo(e)}
                    />
                  </FloatingLabel>
                </div>
              </div>
            </div>
            <div className="booking-info">
              <h2>Thông tin đặt phòng</h2>

              <FloatingLabel
                controlId="floatingInput"
                label="Ghi chú"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Ghi chú"
                  name="ghiChuDatPhong"
                  min={0}
                  value={
                    bookingInfo && bookingInfo.ghiChuDatPhong
                      ? bookingInfo.ghiChuDatPhong
                      : ""
                  }
                  onChange={(e) => onHandleChangeBooking(e)}
                />
              </FloatingLabel>
            </div>
            <div className="footer-info">
              <p>{totalPrice.toLocaleString()} VND</p>
              <div className="btn-function-footer">
                <Button
                  variant="success"
                  type="submit"
                  onClick={() => onHandleBooking()}
                >
                  Đặt phòng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(showRooms || showDetail) && (
        <Rooms
          showRooms={showRooms}
          setShowRooms={setShowRooms}
          roomChoosen={roomChoosen}
          setRoomChoosen={setRoomChoosen}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          bookingInfo={bookingInfo}
        />
      )}
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
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
    h1 {
      padding: 0.5rem;
    }
    .content {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 55% 45%;
      padding-bottom: 0.5rem;
      .select-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        height: 100%;

        .room-select-container {
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
          padding: 0.5rem;
          border-radius: 10px;
          gap: 0.5rem;
          height: 97%;
          .btn-function {
            display: flex;
            justify-content: space-between;
            gap: 0.5rem;
            align-items: center;
            button {
              width: 155px;
              height: 50px;
            }
          }
          .table-container {
            width: 100%;
          }
        }
      }
      .input-info {
        height: 97%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .customer-info {
          padding: 0.5rem 1rem 0.5rem 1.5rem;
          h2 {
          }
          .form-guest-container {
            .cccd-container {
              display: flex;
              gap: 0.5rem;
              align-items: center;
              margin-bottom: 1rem;
              input {
              }
              .form-floating {
                margin: 0 !important;
              }
              button {
                height: 50px;
                svg {
                  font-size: 1.1rem;
                  font-weight: bold;
                }
              }
            }
            .customer-common-info {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
              input {
                width: 210px;
              }
            }
          }
        }
        .booking-info {
          padding: 0.5rem 1rem 0.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .footer-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 1rem;
          p {
            font-size: 1.3rem;
            color: red;
            font-weight: bold;
            margin-right: 1rem;
          }
          button {
            padding: 1rem 1.5rem;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
`;
export default FrmDatPhong;
