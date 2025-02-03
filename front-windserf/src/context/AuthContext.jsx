import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        username,
        password,
      });
      console.log(response);

      if (response) {
        const { token } = response.data;
        console.log(token);
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        return navigate("/admin/dashboard");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        console.error("Error al iniciar sesión:", errorData.message);
        alert("Credenciales incorrectas");
        return false;
      }
    } catch (error) {
      console.log("Error al conectar con el servidor:", error);
      alert("Credenciales incorrectas");
      return false;
    }
  };

  const logOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:3000/admin/verify-token",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.valid) {
            console.log("Token is valid");
            setIsAuthenticated(true);
          } else {
            console.warn("Token is invalid");
            logOut();
          }
        } catch (error) {
          console.error(
            "Error al verificar el token:",
            error.response?.data || error.message
          );
          logOut();
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Mostrar algo mientras se verifica el token
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
