import { createBrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Home from "../pages/Home/Home";
import Layout from "../components/Layout/Layout";
import Products from "../pages/Products/Products";
import ProductDetail from "../components/ProductDetail/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":category",
        element: <Products />,
        children: [
          {
            path: ":subCategory",
            element: <Products />,
          },
        ],
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);
export default router;
