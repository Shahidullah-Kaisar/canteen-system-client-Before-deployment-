import React from "react";
import Navbar from "../pages/header/Navbar";
import Footer from "../pages/footer/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div className="">
        <Navbar></Navbar>
      </div>

      <Outlet></Outlet>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Root;
