import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  User,
  Briefcase,
  FileCheck,
  Search,
  Download,
  Eye,
  FileText,
  Trash2,
} from "lucide-react";
import Sidebar from "./Sidebar";

const StatsCard = ({ title, count, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md">
    <div>
      <p className="text-gray-500 text-sm font-semibold uppercase">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
    </div>
    <div className="text-green-600 bg-green-50 p-3 rounded-lg">{icon}</div>
  </div>
);

const Dashboard = () => {
  const { user: adminUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Stats Call (Users, Jobs, Apps count ke liye)
        const resStats = await axios.get(`${API_URL}/admin/stats`, {
          withCredentials: true,
        });

        if (resStats.data.success) {
          // FIX: Direct numbers assign karein
          setTotalUsers(resStats.data.stats.totalUsers || 0);
          setActiveJobsCount(resStats.data.stats.activeJobs || 0);
        }

        // 2. Table Call (Applications ki list ke liye)
        const resTable = await axios.get(`${API_URL}/admin/applications`, {
          withCredentials: true,
        });
        if (resTable.data.success) {
          setApplications(resTable.data.data || []);
        }
      } catch (error) {
        console.error(
          "Dashboard Fetch Error:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  // Dynamic Stats array
  const stats = [
    {
      title: "Total Users",
      // FIX: totalUsers ab direct number hai, .length nahi chahiye
      count: loading ? "..." : totalUsers,
      icon: <User size={24} />,
    },
    {
      title: "Active Jobs",
      count: loading ? "..." : activeJobsCount,
      icon: <Briefcase size={24} />,
    },
    {
      title: "Total Application",
      // FIX: applications ek array hai, isliye iska .length sahi hai
      count: loading ? "..." : applications.length,
      icon: <FileCheck size={24} />,
    },
  ];

  // 1. EXCEL DOWNLOAD LOGIC
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(applications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UsersList");
    XLSX.writeFile(workbook, "Users_List.xlsx");
  };

  // 2. PDF DOWNLOAD LOGIC
  const downloadPDF = () => {
    try {
      const doc = new jsPDF();

      // Title Section
      doc.setFontSize(18);
      doc.setTextColor(1, 95, 65); // Aapka Dark Green Color
      doc.text("SR Admin - Users List", 14, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

      // Table Data taiyar karein
      const tableColumn = ["#", "Name", "Email"];
      const tableRows = applications.map((app, index) => [
        index + 1,
        app.name ? app.name.toUpperCase() : "N/A",
        app.email || "N/A",
      ]);

      // FIX: doc.autoTable ki jagah autoTable(doc, ...) use karein
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: "grid",
        headStyles: { fillColor: [1, 95, 65], halign: "center" }, // Green Header
        styles: { fontSize: 9, cellPadding: 3 },
        columnStyles: {
          0: { cellWidth: 20, halign: "center" },
          1: { fontStyle: "bold" },
        },
      });

      // Save the PDF
      doc.save("Users_Report_SR_Admin.pdf");
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("PDF generate nahi ho paya. Console check karein.");
    }
  };


  const filteredData = applications.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative w-1/3">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2 text-green-800 font-bold uppercase tracking-wider">
            <span className="bg-green-100 p-1 rounded-full">
              <User size={20} />
            </span>
            {adminUser?.role || "ADMIN"}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#015f41] mb-6 capitalize">
          Welcome, {adminUser?.name || "Admin"}
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((s, idx) => (
            <StatsCard
              key={idx}
              title={s.title}
              count={s.count}
              icon={s.icon}
            />
          ))}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-white">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <FileCheck size={20} className="text-blue-500" /> Users List
            </h3>
            <div className="flex gap-2">
              {/* Excel Button */}
              <button
                onClick={downloadExcel}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm transition"
              >
                <Download size={16} /> Excel
              </button>

              {/* PDF Button */}
              <button
                onClick={downloadPDF}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm transition"
              >
                <FileText size={16} /> PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10 italic">
                      Loading applications...
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((app, index) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition-colors group">

                      <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 uppercase">
                        {app.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{app.email}</td>
                      <td className="px-6 py-4 text-gray-600">{app.city}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
