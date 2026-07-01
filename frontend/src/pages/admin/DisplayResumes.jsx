import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  Trash2,
  FileText,
  Download,
  User,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const DisplayResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/resumes");
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

  // --- NEW: Handle Approve/Reject Logic ---
  const handleAction = async (id, status, email, name) => {
    const actionText = status === "approved" ? "Shortlist (Approve)" : "Reject";
    if (!window.confirm(`Are you sure you want to ${actionText} ${name}?`))
      return;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/application-status",
        {
          id,
          status,
          email,
          name,
        },
      );

      if (res.data.success) {
        alert(`Email sent successfully! Status: ${status}`);
        fetchResumes();
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while sending email.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      await axios.delete(`http://localhost:3000/api/delete-resume/${id}`);
      fetchResumes();
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(resumes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Candidates");
    XLSX.writeFile(wb, "Candidates_Applications.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Candidate Applications Report", 14, 15);
    const tableData = resumes.map((r, i) => [
      i + 1,
      r.name,
      r.email,
      r.phone,
      r.designation,
    ]);

    autoTable(doc, {
      head: [["#", "Name", "Email", "Phone", "Designation"]],
      body: tableData,
      startY: 20,
      headStyles: { fillColor: [143, 179, 57] },
    });
    doc.save("Candidates_Report.pdf");
  };

  const filteredResumes = resumes.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.designation.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleShortlist = async (name, email) => {
    if (window.confirm(`Do you want to shortlist ${name}?`)) {
      try {
        await axios.post("http://localhost:3000/api/candidate/shortlist", {
          name,
          email,
        });
        alert(`✅ ${name} shortlisted!`);
      } catch (err) {
        alert("Email bhejne mein error!");
      }
    }
  };

  const handleReject = async (name, email) => {
    if (window.confirm(`${name} you want to reject?`)) {
      try {
        await axios.post("http://localhost:3000/api/candidate/reject", {
          name,
          email,
        });
        alert(`❌ ${name} rejected!`);
      } catch (err) {
        alert("Error sending rejection email!");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search candidates..."
              className="w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-[#015f41] font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Admin
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2 mb-8">
            📂 Job Applications (Resumes)
          </h2>

          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <button
                onClick={exportToExcel}
                className="bg-[#00b67a] text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 hover:opacity-90"
              >
                <Download size={16} /> Excel
              </button>
              <button
                onClick={exportToPDF}
                className="bg-[#d94e4e] text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 hover:opacity-90"
              >
                <FileText size={16} /> PDF
              </button>
            </div>
          </div>

          {loading && (
            <p className="text-center text-gray-400 text-sm mt-10">
              Loading...
            </p>
          )}

          {!loading && filteredResumes.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-10">
              No candidate applications available.
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((res) => (
              <div
                key={res._id}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#eef5df] p-2 rounded-full text-[#8FB339]">
                      <User size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 capitalize">
                      {res.name}
                    </h3>
                  </div>

                  <div className="space-y-2 text-[13px]">
                    <p className="text-gray-600 font-bold text-xs uppercase tracking-wide">
                      Applied For:
                    </p>
                    <p className="text-blue-600 font-bold text-[14px] bg-blue-50 px-2 py-1 rounded inline-block mb-2 italic">
                      {res.designation}
                    </p>

                    <div className="pt-2 space-y-1">
                      <p className="text-gray-600 font-bold">
                        Email:{" "}
                        <span className="text-gray-500 font-medium">
                          {res.email}
                        </span>
                      </p>
                      <p className="text-gray-600 font-bold">
                        Phone:{" "}
                        <span className="text-gray-500 font-medium">
                          {res.phone}
                        </span>
                      </p>
                      <p className="text-gray-600 font-bold">
                        Date:{" "}
                        <span className="text-gray-400 font-medium">
                          {new Date(res.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* --- Action Section --- */}

                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                  {/* View Resume */}
                  <button
                    onClick={() =>
                      window.open(
                        `https://docs.google.com/viewer?url=${encodeURIComponent(res.resumeUrl)}&embedded=false`,
                        "_blank",
                      )
                    }
                    className="text-[#8FB339] font-bold text-xs flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink size={13} /> View Resume
                  </button>

                  <div className="flex items-center gap-3">
                    {/* Shortlist Button */}
                    <button
                      onClick={() => handleShortlist(res.name, res.email)}
                      className="bg-[#8FB339] text-white text-xs px-2 py-1 rounded font-semibold hover:bg-[#7a9a30] transition"
                    >
                      ✅ Shortlist
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => handleReject(res.name, res.email)}
                      className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded font-semibold hover:bg-red-200 transition"
                    >
                      ❌ Reject
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(res._id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Total: {filteredResumes.length} applications found
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayResumes;
