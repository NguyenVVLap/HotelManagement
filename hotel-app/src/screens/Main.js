import React from "react";
import styled from "styled-components";
import Menu from "../components/Menu";

function Main() {
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
    background-color: black;
  }
`;

export default Main;
