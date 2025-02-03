import NavBar from "../NavBar/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom"; //analicar tema ScrollRestoration
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <body className="overflow-x-auto m-0 p-0 box-border">
      <ScrollRestoration />
      <NavBar />
      <Outlet />
      <Footer />
    </body>
  );
};

export default Layout;
