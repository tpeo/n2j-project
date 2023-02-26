import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import Home from "./home.js";
import Apts from "./apts.js";
import Newapt from "./newapt.js";
import Layout from "./layout.js";
import SearchBar from "./SearchBar.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route path="SearchBar" element={<SearchBar />} />
          <Route index element={<Home />} />
          <Route path="apts" element={<Apts />} />
          <Route path="newapt" element={<Newapt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
