import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BindAffinity from "./components/Analysis/BindingAffinity/BindAffinity";
import Layout from "./components/Layout/Layout";

function App() {
  const [isLogIn, setLogIn] = useState(false);
  const [authToken, setAuthToken] = useState(() => {
    const authToken = localStorage.getItem("authToken");
    return authToken !== null ? authToken : "";
  });
  useEffect(() => {
    if (authToken != "") {
      setLogIn(true);
    }
  }, [authToken, isLogIn]);

  return (
    <Router>
      <Layout auth={true}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/analysis/binddingaffinity" element={<BindAffinity />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
