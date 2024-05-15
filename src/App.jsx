import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Admin/auth/Login";
import { ValidarToken } from "./components/Admin/auth/ValToken";
import Home from "./components/Home";
import Admin from "./components/Admin/Admin";
import FormsAdmin from "./components/Admin/FormsAdmin";
import ListProducts from "./components/Admin/Productos/ListProducts";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);

  // Function to verify admin authentication
  const isAdminAuthenticated = async () => {
    // Send token to backend for validation
    const token = localStorage.getItem("token");
    //console.log("Token from localStorage:", token); // Agrega este registro de consola

    if (token) {
      try {
        const response = await ValidarToken(token);
        //console.log("Response status:", response.status); // Agrega este registro de consola

        if (response.ok) {
          // Token is valid
          setIsAdminLoggedIn(true);
          //console.log("Logged in successfully"); // Confirmación
        } else {
          // Token is invalid or expired
          setIsAdminLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        //console.error("Error validating token:", error);
        setIsAdminLoggedIn(false);
      }
    } else {
      // No token found
      setIsAdminLoggedIn(false);
    }
  };

  // Check admin authentication on component mount
  useEffect(() => {
    isAdminAuthenticated();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Root path */}
        <Route path="/" element={<Home />} />

        {/* Admin routes (nested within Routes) */}
        <Route
          path="/admin"
          element={isAdminLoggedIn ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/CrearProducto"
          element={isAdminLoggedIn ? <FormsAdmin /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/ListaProductos"
          element={
            isAdminLoggedIn ? <ListProducts /> : <Navigate to="/login" />
          }
        />

        {/* Login path */}
        <Route
          path="/login"
          element={
            isAdminLoggedIn ? (
              <Navigate to="/admin" />
            ) : (
              <Login setIsAdminLoggedIn={setIsAdminLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
