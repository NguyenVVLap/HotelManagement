import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { checkPhoneExistRoute, registerRoute } from "../utils/APIRoutes";
// import { toast, ToastContainer } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullname: "",
    identification: "",
    phoneNumber: "",
    address: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  // const [step, setStep] = useState("INPUT_PHONE_NUMBER");
  const [step, setStep] = useState("VERIFY_SUCCESS");
  const [result, setResult] = useState("");
  const [toast, setToast] = useState(null);
  const ref = useRef();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };

  const firebaseConfig = {
    apiKey: "AIzaSyCG3-eQmgLGHPPlefU_Ft7ohWbfH6mZYKA",
    authDomain: "hotel-management-4a379.firebaseapp.com",
    projectId: "hotel-management-4a379",
    storageBucket: "hotel-management-4a379.appspot.com",
    messagingSenderId: "590358523478",
    appId: "1:590358523478:web:75b11b80dc18f90bbe55f7",
    measurementId: "G-0HSHJ0L467",
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  const signin = async (event) => {
    event.preventDefault();
    const { phoneNumber } = values;
    if (phoneNumber === "") {
      // toast.error("Phone number is required", toastOptions);
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      const data = {
        phone: "+84" + phoneNumber,
      };
      const res = await axios.post(`${checkPhoneExistRoute}`, data, config);
      if (res.data) {
        let verify = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
        auth
          .signInWithPhoneNumber("+84" + phoneNumber, verify)
          .then((result) => {
            setResult(result);
            setStep("VERIFY_OTP");
          })
          .catch((err) => {
            alert(err);
          });
        // let verify = new firebase.auth.RecaptchaVerifier(
        //   "recaptcha-container",
        //   {
        //     size: "invisible",
        //   }
        // );
        // auth
        //   .signInWithPhoneNumber("+84" + phoneNumber, verify)
        //   .then((result) => {
        //     setResult(result);
        //     setStep("VERIFY_OTP");
        //   })
        //   .catch((err) => {
        //     alert(err);
        //   });
      } else {
        // toast.error("This phone number already exist", toastOptions);
      }
      // fetch(`${checkPhoneExistRoute}`, {
      //   body: JSON.stringify(data),
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   mode: "cors",
      // })
      // .then((response) => response.json())
      // .then((res) => {
      //   if (res) {
      //     let verify = new firebase.auth.RecaptchaVerifier(
      //       "recaptcha-container",
      //       {
      //         size: "invisible",
      //       }
      //     );
      //     auth
      //       .signInWithPhoneNumber("+84" + phoneNumber, verify)
      //       .then((result) => {
      //         setResult(result);
      //         setStep("VERIFY_OTP");
      //       })
      //       .catch((err) => {
      //         alert(err);
      //       });
      //   } else {
      //     toast.error("This phone number already exist", toastOptions);
      //   }
      // })
      // .catch((e) => {
      //   console.log("Delete order error: ", e);
      // });
    }
  };

  const ValidateOtp = (event) => {
    event.preventDefault();
    if (otp === null) return;

    result
      .confirm(otp)
      .then((result) => {
        setStep("VERIFY_SUCCESS");
      })
      .catch((err) => {
        // toast.error("Incorrect code", toastOptions);
      });
  };
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {
        fullname,
        identification,
        phoneNumber,
        address,
        email,
        username,
        password,
      } = values;
      const { data } = await axios.post(
        registerRoute,
        {
          fullname,
          identification,
          phoneNumber,
          address,
          email,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      // console.log(data);
      //   username,
      //   phone: "+84" + phone,
      //   email,
      //   password,
      //   // dayOfBirth: new Date(dayOfBirth),
      //   gender: gender === "male",
      // });
      // if (data.status === false) {
      //   toast.error(data.msg, toastOptions);
      // }
      if (data !== "Username or Identification already exist") {
        localStorage.setItem("token", JSON.stringify(data));
        navigate("/");
      }
    }
  };
  const handleValidation = () => {
    const {
      fullname,
      identification,
      phoneNumber,
      address,
      email,
      username,
      password,
      confirmPassword,
    } = values;
    if (fullname.length === 0) {
      setToast({
        header: "Họ và tên không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (identification.length != 12) {
      setToast({
        header: "CCCD gồm 12 ký tự",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (address.length === 0) {
      setToast({
        header: "Địa chỉ không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (email.length === 0) {
      // toast.error('Email không được trống', toastOptions);

      setToast({
        header: "Email không được trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (username.length < 3) {
      // toast.error('Username should be greater than 3 characters', toastOptions);
      setToast({
        header: "Tài khoản phải lớn hơn 3 ký tự",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (password.length < 8) {
      // toast.error('Password should be equal or greater than 8 characters', toastOptions);
      setToast({
        header: "Mật khẩu phải lớn hơn 8 ký tự",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    } else if (password != confirmPassword) {
      // toast.error(
      //   "Password and Confirm Password should be the same",
      //   toastOptions
      // );
      setToast({
        header: "Mật khẩu và Nhập lại mật khẩu phải giống nhau",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <Container>
        <div className="form-container">
          <div className="title">
            <h1>Đăng ký</h1>
          </div>
          {step === "INPUT_PHONE_NUMBER" && (
            <Form onSubmit={(e) => signin(e)}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">+84</InputGroup.Text>
                <Form.Control
                  placeholder="Phone number"
                  aria-label="Phone number"
                  aria-describedby="basic-addon1"
                  name="phoneNumber"
                  onChange={(e) => handleOnChange(e)}
                />
              </InputGroup>
              <div className="btn-container">
                <span>
                  Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
                </span>
                <Button variant="success" type="submit">
                  Gửi OTP
                </Button>
              </div>
            </Form>
          )}
          {step === "VERIFY_OTP" && (
            <Form onSubmit={(e) => ValidateOtp(e)}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>
              <div className="btn-container">
                <span>
                  Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
                </span>
                <Button variant="success" type="submit">
                  Xác thực
                </Button>
              </div>
            </Form>
          )}
          {step === "VERIFY_SUCCESS" && (
            <Form className="custom-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="custom-input">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Họ và tên"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Họ và tên"
                    name="fullname"
                    onChange={(e) => handleOnChange(e)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="CCCD"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Căn cước công dân"
                    name="identification"
                    onChange={(e) => handleOnChange(e)}
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
                    name="phoneNumber"
                    onChange={(e) => handleOnChange(e)}
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
                    name="address"
                    onChange={(e) => handleOnChange(e)}
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
                    name="email"
                    onChange={(e) => handleOnChange(e)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tài khoản"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Tài khoản"
                    name="username"
                    onChange={(e) => handleOnChange(e)}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Mật khẩu"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={(e) => handleOnChange(e)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nhập lại mật khẩu"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    onChange={(e) => handleOnChange(e)}
                  />
                </FloatingLabel>
              </div>
              <div className="btn-container">
                <span>
                  Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
                </span>
                <Button variant="success" type="submit">
                  Đăng ký
                </Button>
              </div>
            </Form>
          )}
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
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(#373b44, #1095c1);
  .form-container {
    height: 90%;
    /* overflow: scroll; */
    .custom-form {
      height: 90%;

      .custom-input {
        padding: 0.5rem 1rem;
        height: 90%;
        overflow: scroll;
        input {
          outline: none;
        }
        &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-image: linear-gradient(#373b44, #1095c1);
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
      }
    }

    .title {
      text-align: center;
      padding-bottom: 1rem;
    }
    .btn-container {
      display: flex;
      justify-content: space-between;
    }
    .btn-forgot-password {
      width: fit-content;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    text-align: left;
    width: 30%;
    background-color: #fff;
    padding: 2rem;
    border-radius: 5px;
  }
`;

export default Register;
