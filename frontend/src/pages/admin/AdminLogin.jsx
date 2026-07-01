import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail } from "lucide-react"; // Icons add kiye hain design ke liye

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Environment variable access
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // FIXED: URL ko environment variable ke saath connect kiya
      // Backend route usually "/admin/login" hota hai
      const res = await axios.post(`${API_URL}/admin/login`, formData, {
        withCredentials: true,
      });

      if (res.data.success || res.status === 200) {
        // AuthContext ka login function call karein
        login(res.data.user);

        // Token save karein
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        alert(`✅ Admin Access Granted! Welcome ${res.data.user.name}`);

        // Seedha Admin Dashboard par redirect
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Admin Login Error:", err.response);
      alert(
        err.response?.data?.message || "Admin Login Failed. Check credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f0fdf4] px-4">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border-t-8 border-[#015f41] relative overflow-hidden"
      >
        {/* Background Subtle Design */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full blur-3xl"></div>

        <h2 className="text-3xl font-extrabold text-[#015f41] text-center mb-2 tracking-tight">
          Admin Portal
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8 font-medium">
          SR Web Consultancy Management
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-[#015f41] text-white py-4 rounded-xl font-bold mt-8 hover:bg-[#0a4d37] transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Login to Dashboard"
          )}
        </button>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-xs text-gray-400 hover:text-green-700 font-semibold transition"
          >
            Not an Admin? User Login here
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
