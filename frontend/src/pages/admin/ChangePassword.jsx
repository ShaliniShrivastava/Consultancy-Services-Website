import React, { useState } from "react";
import axios from "axios";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import Sidebar from "./Sidebar";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return alert("New password and confirm password do not match!");
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      const res = await axios.put(
        "http://localhost:3000/api/auth/change-password",
        {
          userId,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
      );

      if (res.data.success) {
        alert("Success: Password has been changed!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Parent Div
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area: Margin Left (ml-64)*/}
      <div className="flex-1 p-6 md:ml-64 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border-t-4 border-[#8FB339]">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#8FB339]/10 p-2 rounded-lg text-[#8FB339]">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-700">
              Change Password
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Old Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8FB339] outline-none transition"
                  placeholder="Enter current password"
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                New Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8FB339] outline-none transition"
                placeholder="Enter new password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm New Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8FB339] outline-none transition"
                placeholder="Re-enter new password"
                required
              />
            </div>

            {/* Show Password Toggle */}
            <div
              className="flex items-center gap-2 cursor-pointer w-fit"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <EyeOff size={16} className="text-gray-500" />
              ) : (
                <Eye size={16} className="text-gray-500" />
              )}
              <span className="text-xs text-gray-500 select-none hover:text-gray-700">
                Show Passwords
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8FB339] text-white py-3 rounded-lg font-bold hover:bg-[#7aa12f] transition shadow-md flex justify-center items-center gap-2 disabled:bg-gray-400"
            >
              {loading ? (
                "Updating..."
              ) : (
                <>
                  <CheckCircle size={18} /> Update Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
