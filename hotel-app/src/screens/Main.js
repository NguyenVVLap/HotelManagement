import React from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/Menu";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
    }
  };
  return (
    <Container>
      <Menu></Menu>
      <div className="wrapper"></div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  .wrapper {
    width: 100%;
    height: 100vh;
    /* background-color: black; */
  }
`;

export default Main;
