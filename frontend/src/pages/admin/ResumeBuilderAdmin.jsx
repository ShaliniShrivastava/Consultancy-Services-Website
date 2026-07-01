import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Trash2, User, Download } from "lucide-react";
import * as XLSX from "xlsx";

const ResumeBuilderAdmin = () => {
  const [resumes, setResumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/resume-builder",
      );
      if (res.data.success) setResumes(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Is record ko delete karna hai?")) {
      await axios.delete(
        `http://localhost:3000/api/admin/resume-builder/${id}`,
      );
      fetchResumes();
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      resumes.map((r) => ({
        Name: r.name,
        Email: r.email,
        Phone: r.phone,
        Designation: r.designation,
        Payment: r.paymentStatus,
        Date: new Date(r.createdAt).toLocaleDateString(),
      })),
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ResumeBuilder");
    XLSX.writeFile(wb, "ResumeBuilder_Payments.xlsx");
  };

  const filteredResumes = resumes.filter(
    (r) =>
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.designation?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search by name, email..."
              className="w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-[#015f41] font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Admin
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2 mb-2">
            💳 Resume Builder — Payments
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            list of all payments received from candidates using the resume builder tool.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-[#eef5df] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#8FB339]">
                {resumes.length}
              </p>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                Total Resumes
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {resumes.filter((r) => r.paymentStatus === "paid").length}
              </p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Paid</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                ₹{resumes.filter((r) => r.paymentStatus === "paid").length * 50}
              </p>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                Total Revenue
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={exportToExcel}
              className="bg-[#00b67a] text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 hover:opacity-90"
            >
              <Download size={16} /> Export Excel
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-400 text-sm mt-10">
              Loading...
            </p>
          )}

          {/* Empty */}
          {!loading && filteredResumes.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-10">
              No resumes found.
            </p>
          )}

          {/* Table */}
          {!loading && filteredResumes.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-[#eef5df] text-[#8FB339] text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Designation</th>
                    <th className="px-4 py-3 text-left">Payment</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResumes.map((r, i) => (
                    <tr
                      key={r._id}
                      className="border-t border-gray-50 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800 flex items-center gap-2">
                        <div className="bg-[#eef5df] p-1 rounded-full">
                          <User size={14} className="text-[#8FB339]" />
                        </div>
                        {r.name}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{r.email}</td>
                      <td className="px-4 py-3 text-gray-500">{r.phone}</td>
                      <td className="px-4 py-3 text-blue-600 font-medium italic">
                        {r.designation}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            r.paymentStatus === "paid"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {r.paymentStatus === "paid"
                            ? "✅ Paid"
                            : "⏳ Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="text-red-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-6 text-sm text-gray-400">
            Total: {filteredResumes.length} records found
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderAdmin;
