import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  if (!isAuthenticated) {
    // Redirige a la página de login, manteniendo el estado previo para volver después
    return <Navigate to="/adminLogin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
