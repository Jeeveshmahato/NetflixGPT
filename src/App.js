import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignIn from "./Components/test";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
