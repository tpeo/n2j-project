import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals.js";
import Home from "./pages/home.js";
import Apts from "./pages/apts.js";
import Myapts from "./pages/myapts.js";
import Newapt from "./pages/newapt.js";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Layout from "./components/layout.js";
import AptDetail from "./pages/aptdetail.js";
import UserInfo from "./pages/userinfo.js";
//import { AuthContext } from "./context/auth.js";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import AuthContext, { useProvideAuth } from "./context/authentication.js";

function App() {
  return (
    <div>
      <AuthContext.Provider value={useProvideAuth()}>
      {/* <div class="everything" style={{ display: "flex" }}>
        <div style={{ flex: "1 auto", position: "fixed" }}>
          <Layout />
        </div> */}
        <div>
          <Layout/>
        <div class="mainpage">
          
            <BrowserRouter>
              <Routes>
                <Route index element={<Apts />} />
                <Route path="apts" element={<Apts />} />
                <Route path="apts/:aptid" element={<AptDetail />} />
                <Route path="user" element={<UserInfo />} />
                <Route path="newapt" element={<Newapt />} />
                <Route path="myapts" element={<Myapts />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="logout" element={<Apts />} />
              </Routes>
            </BrowserRouter>
          
        </div>
      </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
