import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Trash2, FileText, Download, Search } from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const DisplayRequirements = () => {
  const [requirements, setRequirements] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search ke liye
  const [loading, setLoading] = useState(true);

  const fetchRequirements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/requirements",
      );
      if (res.data.success) setRequirements(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  // --- DELETE LOGIC ---
  const handleDelete = async (id) => {
    if (window.confirm("Bhai, pakka delete karna hai?")) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/delete-requirement/${id}`,
        );
        if (res.data.success) {
          alert("Requirement deleted!");
          fetchRequirements();
        }
      } catch (err) {
        alert("Delete nahi ho paya!");
      }
    }
  };

  // --- EXCEL EXPORT ---
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(requirements);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requirements");
    XLSX.writeFile(workbook, "Requirements_Report.xlsx");
  };

  // --- PDF EXPORT ---
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text("SR Web Consultancy - Requirements Report", 14, 20);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

      // Table Data Taiyar karna
      const tableColumn = ["#", "Name", "Business", "Email", "Phone"];
      const tableRows = requirements.map((req, index) => [
        index + 1,
        req.name,
        req.businessName,
        req.experience,
        req.email,
        req.phone,
        req.gstNumber
      ]);

      // PDF Table Generate karna
      // doc.autoTable({...}) ko replace karke ye likho:
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: "grid",
        headStyles: { fillColor: [143, 179, 57] },
        styles: { fontSize: 9 },
      });

      // Download Trigger
      doc.save("Requirements_Report.pdf");
    } catch (error) {
      console.error("PDF Error:", error);
      alert("PDF generate karne mein dikat aa rahi hai. Console check karein!");
    }
  };

  // --- SEARCH FILTER ---
  const filteredData = requirements.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm),
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={16}
            />
          </div>
          <div className="flex items-center gap-2 text-[#015f41] font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Admin
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2 mb-8">
            📋 All Requirements
          </h2>

          {/* Search & Action Buttons */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search by name, email, phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-green-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="bg-[#7c8394] text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-1">
                Sort: Newest
              </button>
              <button
                onClick={exportToExcel}
                className="bg-[#00b67a] text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 hover:bg-[#009664] transition-all"
              >
                <Download size={16} /> Excel
              </button>
              <button
                onClick={exportToPDF}
                className="bg-[#d94e4e] text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 hover:bg-[#b83d3d] transition-all"
              >
                <FileText size={16} /> PDF
              </button>
            </div>
          </div>

          {/* Requirements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="col-span-full text-center py-10 text-gray-400">
                Loading data...
              </p>
            ) : filteredData.length > 0 ? (
              filteredData.map((req) => (
                <div
                  key={req._id}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm relative group hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-bold text-gray-800 capitalize mb-3">
                    {req.name}
                  </h3>
                  <div className="space-y-1.5 text-[13px]">
                    <p className="text-gray-600 font-bold">
                      Business Name:{" "}
                      <span className="text-blue-500 font-medium">
                        {req.businessName}
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold">
                      Experience years:{" "}
                      <span className="text-blue-500 font-medium">
                        {req.experience} years
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold">
                      GST Numbers:{" "}
                      <span className="text-blue-500 font-medium">
                        {req.gstNumber} 
                      </span>
                    </p>

                    <p className="text-gray-600 font-bold">
                      Email:{" "}
                      <span className="text-blue-500 font-medium">
                        {req.email}
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold">
                      Phone:{" "}
                      <span className="text-blue-500 font-medium">
                        {req.phone}
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold">
                      Message:{" "}
                      <span className="text-gray-500 font-medium">
                        {req.message}
                      </span>
                    </p>
                    <p className="text-gray-600 font-bold">
                      Submitted:{" "}
                      <span className="text-gray-400 font-medium">
                        {new Date(req.createdAt).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="bg-[#d94e4e] text-white px-4 py-1.5 rounded flex items-center gap-2 text-xs font-bold hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-gray-400">
                No requirements found matching your search.
              </p>
            )}
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Total: {filteredData.length} requirements found
          </p>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-6 border-t border-gray-50 flex justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
          <p>
            © 2026{" "}
            <span className="text-[#015f41]">
              SR | Web Consultancy Service
            </span>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayRequirements;
