import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

function Search({ search, setSearch, onHandleSearch }) {
  const onHandleChangeSelect = (e) => {
    setSearch({ ...search, theo: e.target.value });
  };
  const onHandleChangeText = (e) => {
    setSearch({ ...search, keyword: e.target.value });
  };
  return (
    <StyledContainer>
      <Form.Control
        type="text"
        placeholder="tìm kiếm"
        onChange={(e) => onHandleChangeText(e)}
      />
      <Form.Select onChange={(e) => onHandleChangeSelect(e)}>
        <option value="Theo mã">Theo mã</option>
        <option value="Theo tên">Theo tên</option>
      </Form.Select>
      <Button variant="primary" onClick={() => onHandleSearch()}>
        Tìm
      </Button>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  height: 5%;
  margin: 1rem 0;
  display: flex;
  width: 60%;
  input {
    width: 50%;
  }
  select {
    width: 30%;
  }
  button {
    width: 10%;
  }
`;
export default Search;