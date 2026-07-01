import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    gender: "",
    city: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // .env file se API URL lene ke liye (Backup ke liye localhost:3000 rakha hai)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Final URL will be: http://localhost:3000/api/register
      const res = await axios.post(`${API_URL}/register`, formData);

      if (res.data.success || res.status === 201) {
        alert("✅ Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration Error Details:", err.response);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your backend connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f1] py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8FB339]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#8FB339]/10 rounded-full blur-3xl"></div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create <span className="text-[#8FB339]">Account</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Join SR Web Consultancy
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl text-center font-semibold border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4 text-sm">
            {/* Full Name */}
            <div className="relative group">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#8FB339]" />
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8FB339] outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#8FB339]" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8FB339] outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Phone */}
              <div className="relative group">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#8FB339]" />
                <input
                  name="number"
                  type="text"
                  placeholder="Phone"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8FB339] outline-none transition-all"
                />
              </div>

              {/* Gender Dropdown */}
              <div className="relative group">
                <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#8FB339]" />
                <select
                  name="gender"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8FB339] outline-none transition-all appearance-none text-gray-600"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* City */}
            <div className="relative group">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#8FB339]" />
              <input
                name="city"
                type="text"
                placeholder="City"
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
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8FB339] outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#8FB339] hover:bg-[#7a9a30] text-white py-3.5 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Sign Up <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#8FB339] font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
