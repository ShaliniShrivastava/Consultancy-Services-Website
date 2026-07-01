import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Star, User, Mail } from "lucide-react";
import Sidebar from "./Sidebar";

const DisplayFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // 1. Backend se data fetch karna
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/feedbacks");
      setFeedbacks(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 2. Delete function
  const handleDelete = async (id) => {
    if (window.confirm("Bhai, delete kar dein?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/admin/feedback/delete/${id}`,
        );
        fetchFeedbacks(); // Refresh list
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    // Parent container ko flex banaya
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar apni jagah fix rahega */}
      <Sidebar />

      {/* Main Content Area: Margin-left (ml-64) add kiya taaki sidebar ke piche na chhupa jaye */}
      <div className="flex-1 p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-700 mb-8 flex items-center gap-3">
            User Feedbacks
            <span className="text-sm font-normal text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
              {feedbacks.length} Total
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#8FB339] relative hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-4 right-4 text-red-300 hover:text-red-600 p-1 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-bold text-[#8FB339] uppercase text-[10px] tracking-widest bg-[#8FB339]/10 w-fit px-2 py-1 rounded">
                    {item.userType}
                  </div>

                  <div className="flex items-center gap-2 text-gray-800 font-bold">
                    <User size={16} className="text-[#8FB339]" /> {item.name}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-xs border-b pb-2">
                    <Mail size={14} /> {item.email}
                  </div>

                  {/* Star Rating Display */}
                  <div className="flex gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < item.rating ? "#FFAD33" : "none"}
                        stroke={i < item.rating ? "#FFAD33" : "#D1D5DB"}
                      />
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="text-[10px] text-gray-400 mt-2 text-right">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {feedbacks.length === 0 && (
            <div className="text-center py-20 text-gray-400 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 mt-10">
              <p className="text-lg">No feedbacks available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayFeedbacks;
