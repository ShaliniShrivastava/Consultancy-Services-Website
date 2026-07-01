import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Environment variable access
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // FIXED: URL ko environment variable ke saath connect kiya
      // Final URL: http://localhost:3000/api/login
      const res = await axios.post(`${API_URL}/login`, form, {
        withCredentials: true, // Cookies/Session support ke liye
      });

      if (res.data.success || res.status === 200) {
        const userData = res.data.user;

        // Context Update
        login(userData);

        alert(`✅ Welcome back, ${userData.name}!`);

        // Redirect logic: Agar Admin hai toh dashboard, varna Home
        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Login Error Details:", err.response);
      setError(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8FB339]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#8FB339]/10 rounded-full blur-3xl"></div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome <span className="text-[#8FB339]">Back</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center font-semibold italic">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#8FB339]" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8FB339] outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#8FB339]" />
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8FB339] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3.5 text-[10px] font-bold text-gray-400 hover:text-[#8FB339]"
              >
                {showPass ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#8FB339] hover:bg-[#7a9a30] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#8FB339]/20 transition-all active:scale-95"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <LogIn className="h-5 w-5" /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#8FB339] font-bold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
