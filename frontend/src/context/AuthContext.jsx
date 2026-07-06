import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // 1. Axios ko import karna zaroori hai

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Environment variable access
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Auth Storage Error:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  } , []);

  // 2. Login Function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 3. Logout Function (FIXED: Ab ye backend ko bhi logout request bhejega)
  const logout = async () => {
    try {
      // Backend ke token/cookie clear karne ke liye request
      // API_URL = .../api hai, toh ye automatically .../api/logout banega
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Backend Logout Error:", error);
    } finally {
      // Kuch bhi error aaye ya na aaye, frontend se data clean hona hi chahiye:
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Login page par redirect
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook use karne ke liye
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};