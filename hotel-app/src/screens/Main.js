import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FrmDatPhong from "../components/FrmDatPhong";
import Menu from "../components/Menu";

function Main() {
  const navigate = useNavigate();
  const [navSelected, setNavSelected] = useState({
    room: true,
    guest: false,
    staff: false,
    booking: false,
  });
  const [subNavSelected, setSubNavSelected] = useState("book");

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
      <div className="wrapper">
        {subNavSelected === "book" && <FrmDatPhong />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 20% 80%;
  .wrapper {
    width: 100%;
    height: 100vh;
    /* background-color: black; */
  }
`;

export default Main;
