import { BrowserRouter, Route, Routes } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Main from "./screens/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/setAvatar" element={<SetAvatar />} /> */}
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
