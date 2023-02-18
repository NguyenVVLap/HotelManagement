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
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]; // Khởi tạo mảng refs để lưu trữ ô nhập mã OTP
  const handleChangeOTP = (event, index) => {
    const { value } = event.target;

    setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);


    if (value !== "") { // Nếu người dùng đã nhập giá trị vào ô hiện tại
      if (index < otp.length - 1) { // Và ô đó không phải là ô cuối cùng
        otpInputRefs[index + 1].current.focus(); // Di chuyển focus đến ô tiếp theo
      }
    }
  };
  // const [step, setStep] = useState("INPUT_PHONE_NUMBER");
  // const [step, setStep] = useState("VERIFY_SUCCESS");
  const [step, setStep] = useState("VERIFY_OTP");
  const [result, setResult] = useState("");
  const [toast, setToast] = useState(null);




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
    console.log("phone number input: ", phoneNumber)
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
  console.log("OTP[]", otp);
  return (
    <>
      <Container>
        <div className="form-container">

          {/* Bước nhập số điện thoại để nhận OTP */}
          {step === "INPUT_PHONE_NUMBER" && (
            <div className="wrapper">
              <div className="grid-container">
                <div className="item-grid-login">
                  <div className="box-login">
                    <div className="header_login">
                      <span className="title_header">Nhận mã OTP</span>
                      <header></header>
                    </div>
                    <div className="form-container">
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
                            Nhận OTP
                          </Button>
                        </div>
                      </Form>


                    </div>
                  </div>
                </div>
                <div className="item-grid-slider">
                  <div className='grid-slider-container-input-phonenumber'></div>
                </div>
              </div>
            </div>
          )}
          {/* Bước nhập mã otp gửi đến số điện thoại */}
          {step === "VERIFY_OTP" && (
            <div className="wrapper">
              <div className="grid-container">
                <div className="item-grid-login">
                  <div className="box-login">
                    <div className="header_login">
                      <span className="title_header">Xác thực OTP</span>
                      <header>Nhập mã otp gồm 6 số</header>
                    </div>
                    <div className="otp-container">
                      {otp.map((item, index) => (
                        <input type="text" className="otp" maxLength='1' key={index} value={item} onChange={(event) => handleChangeOTP(event, index)}
                          onKeyDown={(event) => {
                            if (event.key === "Backspace" && index > 0) { // Nếu người dùng nhấn phím Backspace và không phải ô đầu tiên


                              setOtp([...otp.slice(0, index), "", ...otp.slice(index + 1)]);
                              otpInputRefs[index - 1].current.focus(); // Di chuyển focus đến ô trước đó
                            }
                          }}

                          ref={otpInputRefs[index]} // Gán ref cho ô nhập hiện tại
                        />
                      ))

                      }


                    </div>
                    <div className="btn-container">
                      <span>
                        Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
                      </span>
                      <Button variant="success" onClick={() => {
                        let result = '';
                        otp.map((item) => {
                          result += item;

                        })
                        alert(result);
                      }}>
                        Xác thực
                      </Button>
                    </div>

                  </div>
                </div>
                <div className="item-grid-slider">
                  <div className='grid-slider-container-input-phonenumber'></div>
                </div>
              </div>
            </div>
          )}

          {/* Bước Verify success */}
          {step === "VERIFY_SUCCESS" && (
            <div className="wrapper">
              <div className="grid-container">
                <div className="item-grid-login">
                  <div className="box-login">
                    <div className="header_login">
                      <span className="title_header">Điền thông tin</span>
                      <header>Đăng Ký</header>
                    </div>
                    <div className="form-container">
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


                    </div>
                  </div>
                </div>
                <div className="item-grid-slider">
                  <div className='grid-slider-container-verifysuccess'></div>
                </div>
              </div>
            </div>
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
  .wrapper {
    height: 100vh;
    background: linear-gradient(55deg, #d2001a, #7462ff, #f48e21, #23d5ab);
    background-size: 300% 300%;
    animation: color 11s ease-in-out infinite;
    padding: 100px 50px 100px 50px;
    box-sizing: border-box;

}
@keyframes color {
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}
.grid-container {
    /* background-color: yellowgreen; */
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
}

.item-grid-login {
    background-color: rgba(240, 247, 247, 0.493);
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100%;
    overflow:auto;
    /* background-color: #d2001a; */
    &::-webkit-scrollbar {
          width: 0.2rem;
          &-thumb {
            background-image: linear-gradient(#373b44, #1095c1);
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
}

.item-grid-slider {
    background-color: rgba(32, 35, 35, 0.493);
    width: 100%;
    height: 100%;
  
}
.wrapper-slide{
    background-color:red;
    width:100%;
    height:90%;
}
.load-wrap{
    width: 100%;
    height: 100vh;
    background: linear-gradient(55deg, #d2001a, #7462ff, #f48e21, #23d5ab);
    display: flex;
    justify-content:center;
    align-items:center;
   
}
.grid-slider-container-verifysuccess{
    background-image: url("https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?w=740&t=st=1676724421~exp=1676725021~hmac=40d402a5dc6b284720197c8559260b926b25cf5f1675dab7f267298b61df37c1");
   background-size:cover;
   background-repeat:no-repeat;
    height: 100%;
    background-position:center;
}
.grid-slider-container-input-phonenumber{
    background-image: url("https://img.freepik.com/premium-vector/authentication-code-illustration-isometric-style-illustration_108061-562.jpg?w=740");
   background-size:cover;
   background-repeat:no-repeat;
    height: 100%;
    background-position:center;

}
.grid-slider-container-verify-otp{
  background-image: url("https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7897.jpg?w=740&t=st=1676728797~exp=1676729397~hmac=16e28cda1d191945535f94d0e6c4c75f3c8cb103c8150e69d5489276a67e9e08");
   background-size:cover;
   background-repeat:no-repeat;
    height: 100%;
    background-position:center;
}

.box-login {
    /* background-color: #f48e21; */
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 15px;
    max-height:100%;
    .header_login {
    /* background-color: #d2001a; */
    margin-bottom: 20px;
    padding: 15px 5px 15px 5px;
    .title_header {
      color: rgb(3, 3, 3);
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 10px 0;
    }
}
}


header {
    color: rgb(3, 3, 3);
    font-size: 30px;
    display: flex;
    justify-content: center;
    padding: 10px 0 10px 0;
}
  /* --------------------- */
  .form-container {
    text-align: left;
    .custom-form {
      height: 90%;

      .custom-input {
        padding: 0.5rem 1rem;
        height: 90%;
        overflow: auto;
        input {
          outline: none;
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
      margin-bottom:21px;
    }
    .btn-forgot-password {
      width: fit-content;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .otp-container{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0;
      .otp{
        background-color: rgba(255,255,255,0.6);
        border-radius: 10px;
        border: 1px solid #eee;
        font-size: 30px;
        width: 75px;
        height: 80px;
        margin: 10px;
        text-align: center;
        font-weight: 300;
      &:valid{
        border-color: #9861c2;
        box-shadow: 0 10px 10px -5px rgba(0,0,0,0.25);
      }
      }
    }
    
  }
`;

export default Register;
