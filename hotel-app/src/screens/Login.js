import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const openRegisterScreen = () => {
    navigate("/register");
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = values;

    if (username === "") {
      setToast({
        header: "Tài khoản không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
    } else if (password === "") {
      setToast({
        header: "Mật khẩu không được bỏ trống",
        content: "",
        bg: "danger",
        textColor: "#fff",
      });
    } else {
      await axios
        .post(
          `${loginRoute}`,
          { username, password },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data));
          navigate("/");
        })
        .catch((e) => {
          if (e.code === "ERR_BAD_REQUEST") {
            setToast({
              header: "Tài khoản hoặc mật khẩu không đúng",
              content: "",
              bg: "danger",
              textColor: "#fff",
            });
          }
        });
    }
  };
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <div className="form-container">
        <div className="title">
          <h1>Đăng nhập</h1>
        </div>
        <Form onSubmit={(e) => onHandleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={(e) => handleOnChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleOnChange(e)}
            />
          </Form.Group>
          <p className="btn-forgot-password">Quên mật khẩu ?</p>
          <div className="btn-container">
            <Button variant="primary" type="submit">
              Đăng nhập
            </Button>
            <Button variant="success" onClick={openRegisterScreen}>
              Đăng ký
            </Button>
          </div>
        </Form>
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

export default Login;
