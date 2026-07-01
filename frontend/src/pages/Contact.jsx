import React, { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import axios from "axios";

const Contact = () => {
  // 1. Form State Management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // 2. Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aapka naya backend route
      const res = await axios.post(
        "http://localhost:3000/api/contact/add",
        formData,
      );
      if (res.data.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Form reset
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-[#8FB339] text-white">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-16 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">
            Contact Us
          </h1>
          <div className="flex justify-center items-center gap-2 text-[11px] md:text-xs uppercase tracking-wider text-white/90">
            <span className="hover:text-white cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-white cursor-pointer">Contact</span>
            <span>›</span>
            <span className="text-white">Contact Us</span>
          </div>
        </div>

        <div className="w-full overflow-hidden leading-none -mb-1">
          <svg
            viewBox="0 0 1440 100"
            className="w-full h-12 md:h-14"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      <section className="bg-white py-12 ">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Left Side - Form */}
          <div>
            <h2 className="text-[38px] font-semibold text-gray-700 mb-1 tracking-tight">
              Get in touch
            </h2>

            <p className="text-gray-500 mb-6">
              Start growing with{" "}
              <span className="text-[#8BAE3F] font-medium">
                SR Consultancy{" "}
              </span>
              that offers every tool you need to boost reach, attract traffic,
              and connect.
            </p>

            <form className="space-y-2" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mb-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAE3F]"
                />
              </div>

              {/* Email & Subject */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mb-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAE3F]"
                  />
                </div>

                <div>
                  <label className="block text-gray-600">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mb-2 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#8BAE3F]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-600">Your Message</label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mb-1 w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#8BAE3F]"
                ></textarea>
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 bg-[#8BAE3F] text-white px-7 py-3 rounded-md hover:bg-[#7a9d35] transition disabled:bg-gray-400"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4 rotate-45 transform group-hover:translate-x-1 transition" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Contact Info */}
          <div className="flex flex-col justify-center space-y-6 text-gray-600">
            <div className="flex items-start gap-4">
              <MapPin className="text-[#8BAE3F] w-5 h-5 mt-1" />
              <p>1. Sector 16 B, Greater Noida, Uttar Pradesh 201306</p>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-[#8BAE3F] w-5 h-5 mt-1" />
              <p>2. Vikaspuri, New Delhi, 110059</p>
            </div>

            <div className="flex items-start gap-4 text-wrap break-all">
              <Mail className="text-[#8BAE3F] w-5 h-5 mt-1" />
              <p>admin@srwebconsultancy.in</p>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-[#8BAE3F] w-5 h-5 mt-1" />
              <p>+91 8700832603</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
