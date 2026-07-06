import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Ensure kijiye ye import sahi se ho

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
  }, []);

  // 2. Login Function (Aapka Purana Sahi Code)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 3. Logout Function (Bina kisi error ke pure frontend cleanup ke saath)
  const logout = async () => {
    try {
      // Backend par request bhejein, agar live par dikkat ho toh try-catch handle karega
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Backend Logout Error:", error);
    }

    // Frontend clean up hamesha chalega aur ye login par bhej dega
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
