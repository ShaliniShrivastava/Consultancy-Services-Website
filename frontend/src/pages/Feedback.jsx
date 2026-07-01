import React, { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "Candidate",
    rating: 0,
    comment: "",
  });

  const [hover, setHover] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.rating === 0) return alert("Please provide a rating!");
    
    try {
      const res = await axios.post("http://localhost:3000/api/feedback/add", formData);
      if (res.data.success) {
        alert("Thank you for your feedback!");
        setFormData({ name: "", email: "", userType: "Candidate", rating: 0, comment: "" });
      }
    } catch (err) { alert("Error sending feedback!"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-[#8FB339] p-8 text-white text-center">
          <h2 className="text-3xl font-bold">Share Your Experience</h2>
          <p className="text-sm opacity-90 mt-2">Please Share Your Feedback With Us.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input type="text" required name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#8FB339]" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input type="email" required name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#8FB339]" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">User Type</label>
            <select value={formData.userType} onChange={(e) => setFormData({...formData, userType: e.target.value})} className="w-full border rounded-lg p-3">
              <option value="Candidate">Candidate (Job Seeker)</option>
              <option value="Client">Client (Recruiter)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className="cursor-pointer transition-colors"
                  fill={(hover || formData.rating) >= star ? "#FFAD33" : "none"}
                  stroke={(hover || formData.rating) >= star ? "#FFAD33" : "#D1D5DB"}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setFormData({ ...formData, rating: star })}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Feedback</label>
            <textarea rows="4" required value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#8FB339]" placeholder="Tell us about your experience..."></textarea>
          </div>

          <button type="submit" className="w-full bg-[#8FB339] text-white font-bold py-4 rounded-lg hover:bg-[#7aa12f] transition-all shadow-lg">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;