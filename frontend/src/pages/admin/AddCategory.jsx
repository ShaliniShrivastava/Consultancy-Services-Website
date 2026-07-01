import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  X,
  Plus,
  Search,
  Edit,
  Trash2,
  FolderOpen,
} from "lucide-react";
import Sidebar from "./Sidebar";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 1. Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      if (res.data.success) setCategories(res.data.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 3. Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image); // Nayi image hai toh hi bhejni hai

    try {
      let res;
      if (editId) {
        // Edit mode
        res = await axios.put(
          `http://localhost:3000/api/update-category/${editId}`,
          formData,
        );
      } else {
        // Add mode
        res = await axios.post(
          "http://localhost:3000/api/add-category",
          formData,
        );
      }

      if (res.data.success) {
        alert(editId ? "Updated successfully!" : "Added successfully!");
        setIsModalOpen(false);
        setEditId(null); // Reset
        setTitle("");
        setDescription("");
        setImage(null);
        setPreview(null);
        fetchCategories();
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Delete Category
  const handleDelete = async (id) => {
    if (window.confirm("Delete karna hai?")) {
      await axios.delete(`http://localhost:3000/api/delete-category/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-700">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Top Search Bar Style */}
        <div className="flex justify-between items-center mb-10 bg-white p-4 rounded-lg shadow-sm border">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-2 border rounded-md outline-none"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <div className="text-[#015f41] font-bold text-xs uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Admin
          </div>
        </div>

        {/* Heading & Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FolderOpen className="text-yellow-500" /> Manage Categories
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#8FB339] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#7aa12f] transition-all"
          >
            <Plus size={18} /> Add Category
          </button>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white border-b text-[11px] uppercase font-bold text-gray-400">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Jobs Count</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {categories.map((cat, index) => (
                <tr
                  key={cat._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-[#eef5df] rounded-lg p-2">
                      <img
                        src={cat.image}
                        className="w-full h-full object-contain"
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">{cat.title}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {cat.description.slice(0, 50)}...{" "}
                    <span className="text-blue-500 cursor-pointer">
                      Read More
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {cat.jobsCount || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditId(cat._id);
                          setTitle(cat.title);
                          setDescription(cat.description);
                          setPreview(cat.image);
                          setIsModalOpen(true);
                        }}
                        className="bg-yellow-400 text-white px-3 py-1 rounded font-bold text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded font-bold text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-right text-xs text-gray-400 border-t">
            Rows per page: 10 | 1-{categories.length} of {categories.length}
          </div>
        </div>

        {/* Modal Popup (Screenshot 2 ke hisab se) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-bold text-gray-700">
                  Add Category
                </h3>
                <X
                  className="cursor-pointer text-gray-400 hover:text-red-500"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded outline-none focus:border-[#8FB339]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded outline-none focus:border-[#8FB339]"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">
                    Image
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="text-xs border p-2 flex-1 rounded"
                      required
                    />
                    {preview && (
                      <img
                        src={preview}
                        className="w-10 h-10 rounded border object-contain"
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 bg-slate-500 text-white rounded font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-[#8FB339] text-white rounded font-bold"
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <p className="text-center text-[10px] text-gray-400 mt-20">
          © 2026 SR | Web Consultancy Servicess. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
};

export default Category;
