import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import "./App.css";
import Main from "./screens/Main";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
