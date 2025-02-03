import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/User/Home/Home";
import Layout from "../components/Layout/Layout";
import Products from "../pages/User/Products/Products";
import ProductDetail from "../pages/User/ProductDetail/ProductDetail";
import ProtectedRoute from "../utils/ProtectedRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import CreateProduct from "./../pages/Admin/CreateProduct/CreateProduct";
import SearchProducts from "./../pages/Admin/SearchProducts/SearchProducts";
import AdminCategories from "./../pages/Admin/AdminCategories/AdminCategories";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import { AuthProvider } from "../context/AuthContext";
import AdminLogin from "./../pages/Admin/AdminLogin/AdminLogin";

const router = createBrowserRouter([
  {
    path: "/adminLogin",
    element: (
      <AuthProvider>
        <AdminLogin />
      </AuthProvider>
    ),
  },
  {
    path: "/admin", // Ruta "/admin" que redirige a "/admin/dashboard"
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/admin",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
      {
        path: "searchProducts",
        element: <SearchProducts />,
      },
      {
        path: "categories",
        element: <AdminCategories />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
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
    ],
  },
]);
export default router;
