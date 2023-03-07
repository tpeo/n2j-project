import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals.js";
import Home from "./pages/home.js";
import Apts from "./pages/apts.js";
import Newapt from "./pages/newapt.js";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Logout from "./pages/logout.js";
import Layout from "./components/layout.js";
import SearchBar from "./components/SearchBar.js";
//import { AuthContext } from "./context/auth.js";
import AuthContext, { useProvideAuth } from "./context/authentication.js";

function App() {
  return (
    <AuthContext.Provider value={useProvideAuth()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="SearchBar" element={<SearchBar />} />
            <Route index element={<Home />} />
            <Route path="apts" element={<Apts />} />
            <Route path="newapt" element={<Newapt />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="Logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
