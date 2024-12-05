import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const response = await fetch("https://tu-backend.com/api/login", {
        //Cambiar esto por la url real
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      /* const response = { ok: true }; */ //Esto hay que borrar

      if (response.ok) {
        const data = response.json();
        const { token } = data;
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        return true;
      } else {
        const errorData = await response.json();
        console.error("Error al iniciar sesión:", errorData.message);
        return false;
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await fetch(
            "https://tu-backend.com/api/verify-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Enviar el token en el header
              },
            }
          );

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Error al verificar el token:", error);
          logout();
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
