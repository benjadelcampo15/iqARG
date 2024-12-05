import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom"; //analicar tema ScrollRestoration
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
