import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResumeBuilder from "./Resumebuilder";


const CandidateHero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Login first!");
      navigate("/login");
      return;
    }
    if (!resumeFile) {
      alert("Please select a file!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", resumeData.name);
    formData.append("email", resumeData.email);
    formData.append("phone", resumeData.phone);
    formData.append("designation", resumeData.designation);
    formData.append("resume", resumeFile);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/submit-resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      if (res.data.success) {
        alert("✅ Resume uploaded!");
        setResumeData({ name: "", email: "", phone: "", designation: "" });
        setResumeFile(null);
        setShowForm(false);
      }
    } catch (err) {
      alert("❌ Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SECTION 1: HERO & FORM */}
      <section className="bg-white relative overflow-hidden min-h-[500px] md:min-h-[580px]">
        <div className="absolute left-0 top-0 hidden lg:block w-1/2">
          <img
            src="/C.png"
            alt="Candidate"
            className="w-min-full h-[580px] object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center min-h-[500px] md:min-h-[580px] relative z-10 px-4 md:px-6">
          <div className="hidden lg:block"></div>
          <div className="py-8 md:py-12 lg:pl-10">
            {!showForm ? (
              <div className="text-center lg:text-left transition-all duration-500">
                <h1 className="text-2xl md:text-4xl font-bold text-[#8FB339] leading-tight">
                  Move your career forward with expert support at every step.
                </h1>
                <p className="text-gray-600 mt-4 md:mt-6 max-w-xl mx-auto lg:mx-0 text-sm font-semibold">
                  Whether full-time, contract, or freelance — we’re here to
                  match you with what works best for you.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 mt-8">
                  <button className="bg-[#8FB339] text-white w-full sm:w-[220px] py-3 text-[12px] rounded-md font-bold hover:bg-[#7a9a30] transition shadow-md uppercase">
                    GROW YOUR CAREER WITH US
                  </button>
                  <button
                    onClick={() => setShowForm(true)}
                    className="border border-[#8FB339] text-[#8FB339] w-full sm:w-[220px] py-3 text-[12px] rounded-md font-bold hover:bg-[#8FB339] hover:text-white transition shadow-sm uppercase"
                  >
                    SEND US YOUR CV
                  </button>
                  <button
                    onClick={() => setShowResumeBuilder(true)}
                    className="bg-[#8FB339] text-white w-full max-w-[450px] py-3 text-[12px] rounded-md font-bold hover:bg-[#7a9a30] transition shadow-md flex items-center justify-center gap-2 uppercase"
                  >
                    ✨ BUILD MY RESUME ONLY 50 RS CHARGE
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-2xl relative w-full max-w-lg mx-auto border border-gray-100">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-[10px] font-black text-gray-400 hover:text-red-500 transition-colors"
                >
                  ✕ CLOSE
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-5">
                  Send Your <span className="text-[#8FB339]">CV</span>
                </h2>
                <form className="space-y-4" onSubmit={handleResumeSubmit}>
                  <input
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-[#8FB339] text-sm bg-gray-50"
                    type="text"
                    placeholder="Enter Your Name"
                    value={resumeData.name}
                    onChange={(e) =>
                      setResumeData({ ...resumeData, name: e.target.value })
                    }
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-[#8FB339] text-sm bg-gray-50"
                      type="email"
                      placeholder="Enter Your Email"
                      value={resumeData.email}
                      onChange={(e) =>
                        setResumeData({ ...resumeData, email: e.target.value })
                      }
                      required
                    />
                    <input
                      className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-[#8FB339] text-sm bg-gray-50"
                      type="tel"
                      placeholder="Phone Number"
                      value={resumeData.phone}
                      onChange={(e) =>
                        setResumeData({ ...resumeData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <input
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-[#8FB339] text-sm bg-gray-50"
                    placeholder="Designation"
                    value={resumeData.designation}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        designation: e.target.value,
                      })
                    }
                    required
                  />
                  <div className="border-2 border-dashed border-gray-200 p-3 rounded-lg bg-gray-50/50">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                      Upload Resume (PDF/DOC)
                    </label>
                    <input
                      className="w-full text-xs text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[#8FB339]"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-[#8FB339] text-white py-3 rounded-xl transition duration-300 font-bold w-full shadow-lg text-sm uppercase flex justify-center items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#7a9a30]"}`}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{" "}
                        Submitting...
                      </>
                    ) : user ? (
                      "Submit Application"
                    ) : (
                      "Login to Submit"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* SECTION 2: WORK PRO */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-teal-700 leading-snug">
              Whether you're aiming for flexibility or stability, we simplify
              your job search at every step.
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 text-justify leading-relaxed">
              Whether it’s a full-time position, a contract role, or freelance
              work... Wherever you are in your journey, we offer a seamless
              process, reliable opportunities, and access to leading employers
              across Europe.
            </p>
            <button className="mt-8 bg-[#8FB339] text-white px-6 py-3 rounded-md font-bold hover:bg-[#7da22f] transition w-full sm:w-auto">
              HOW DO YOU WANT TO WORK?
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src="c2.png"
              alt="Professionals"
              className="w-full max-w-[500px] rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
      {/* SECTION 3: OFFERINGS HEADINGS */}
      <section className="bg-white py-16 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-[48px] font-bold text-[#8BAE3F] mb-6 md:mb-8">
            What we offer
          </h2>
          <p className="text-sm md:text-[17px] leading-relaxed text-gray-600 mb-12 md:mb-20">
            At SR Web Consultancy, we don’t just connect clients with top talent
            — we also guide each candidate towards the ideal role. From finding
            opportunities to interview coaching, we become advocates for your
            career.
          </p>
          <h3 className="text-3xl md:text-[60px] font-light text-[#8BAE3F] mb-6 md:mb-8">
            How do you want to work?
          </h3>
          <p className="text-sm md:text-[17px] leading-relaxed text-gray-600 max-w-3xl mx-auto">
            Different clients prefer different engagement models: full-time,
            contract-based, or temporary. No matter your preferred approach,
            we're here to guide you.
          </p>
        </div>
      </section>
      {/* SECTION 4: ENGAGEMENT CARDS */}
      <section className="bg-[#f4f6f3] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* Permanent Card */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="w-14 h-14 bg-[#cfd8b5] rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0 text-2xl">
              ⭐
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-[28px] font-semibold text-[#8BAE3F] mb-4">
                Permanent Engagement
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Permanent roles are ideal for long-term stability — either
                full-time or fixed duration. You receive a steady salary and
                benefits like paid leave and medical coverage.
              </p>
              <button className="bg-[#8BAE3F] text-white px-6 py-2 rounded-md hover:bg-[#789c34] transition">
                Explore Permanent Roles
              </button>
            </div>
          </div>

          {/* Contract Card */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="w-14 h-14 bg-[#cfd8b5] rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0 text-2xl">
              📁
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-[28px] font-semibold text-[#8BAE3F] mb-4">
                Contract-Based Projects
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                If you're running your own business or starting one, our
                contract roles offer flexibility and premium exposure. We
                support you throughout the process.
              </p>
              <button className="bg-[#8BAE3F] text-white px-6 py-2 rounded-md hover:bg-[#789c34] transition">
                Explore Contract Options
              </button>
            </div>
          </div>

          {/* Temporary Card */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="w-14 h-14 bg-[#cfd8b5] rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0 text-2xl">
              🔬
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-[28px] font-semibold text-[#8BAE3F] mb-4">
                Temporary/Flexible Roles
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Looking for short-term flexibility? We manage the admin, tax,
                and payments — you just focus on your job and timesheets.
              </p>
              <button className="bg-[#8BAE3F] text-white px-6 py-2 rounded-md hover:bg-[#789c34] transition">
                Explore Temporary Roles
              </button>
            </div>
          </div>
        </div>
      </section>
    
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white">
        <img
          src="c3.png"
          alt="Office"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-3xl px-6">
          <h2 className="text-3xl md:text-[48px] font-semibold mb-8">
            Take the next bold step in career
          </h2>

          <Link to="/contact">
            <button className="bg-white text-[#0e5f53] px-10 py-3 rounded-md font-bold hover:bg-gray-100 transition uppercase tracking-widest">
              CONTACT US
            </button>
          </Link>
        </div>
      </section>
      {showResumeBuilder && (
        <ResumeBuilder onClose={() => setShowResumeBuilder(false)} />
      )}
    </>
  );
};

export default CandidateHero;
