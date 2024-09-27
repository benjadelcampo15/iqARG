import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      {/*       <ScrollRestoration> */}
      <Outlet />
      <Footer />
      {/*       </ScrollRestoration> */}
    </>
  );
};

export default Layout;
