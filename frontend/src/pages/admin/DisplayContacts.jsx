import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, User, Mail, BookOpen } from "lucide-react";
import Sidebar from "./Sidebar";

const DisplayContacts = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/contacts");
      setContacts(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bhai, pakka delete kar dein?")) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/contact/delete/${id}`);
        getContacts(); 
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* 2. Sidebar component */}
      <Sidebar />

      <div className="flex-1 p-8 ml-0 md:ml-64"> 
        
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#4A4A4A] mb-8 flex items-center gap-2">
            Contact Inquiries 
            <span className="text-sm font-normal text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
              {contacts.length}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((item) => (
              <div
                key={item._id}
                className="bg-white border-l-4 border-[#8FB339] shadow-sm rounded-xl p-5 relative hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-4 right-4 text-red-300 hover:text-red-600 p-1 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </button>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-800 uppercase tracking-tight">
                    <User size={16} className="text-[#8FB339]" /> {item.name}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail size={14} /> {item.email}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8FB339] bg-[#8FB339]/10 w-fit px-2 py-1 rounded">
                    <BookOpen size={14} /> {item.subject}
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      "{item.message}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>No contact inquiries available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayContacts;