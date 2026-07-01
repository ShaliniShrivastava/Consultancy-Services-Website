import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X, Edit, Trash2, Briefcase } from "lucide-react";
import Sidebar from "./Sidebar";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    designation: "",
    experience: "",
    location: "",
  });

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:3000/api/get-jobs");
    if (res.data.success) setJobs(res.data.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/api/update-job/${editId}`,
          formData,
        );
      } else {
        await axios.post("http://localhost:3000/api/add-job", formData);
      }
      setIsModalOpen(false);
      setEditId(null);
      setFormData({ designation: "", experience: "", location: "" });
      fetchJobs();
    } catch (err) {
      alert("Error!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete job?")) {
      await axios.delete(`http://localhost:3000/api/delete-job/${id}`);
      fetchJobs();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            👨‍💼💼 Manage Job Openings
          </h2>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditId(null);
            }}
            className="bg-[#8FB339] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
          >
            <Plus size={18} /> Add Job
          </button>
        </div>

        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b text-gray-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Designation</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobs.map((job, index) => (
                <tr key={job._id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium uppercase">
                    {job.designation}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{job.experience}</td>
                  <td className="px-6 py-4 text-gray-500 capitalize">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(job._id);
                        setFormData(job);
                        setIsModalOpen(true);
                      }}
                      className="bg-yellow-400 text-white p-1.5 rounded"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-500 text-white p-1.5 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popup Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold flex items-center gap-2">
                  <Plus /> {editId ? "Edit Job" : "Add Job"}
                </h3>
                <X
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Designation"
                  className="w-full border p-2 rounded"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Experience"
                  className="w-full border p-2 rounded"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border p-2 rounded"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#015f41] text-white rounded"
                  >
                    {editId ? "Update" : "Add Job"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageJobs;
