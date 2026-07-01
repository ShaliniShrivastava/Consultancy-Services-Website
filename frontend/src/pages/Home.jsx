import React, { useState, useEffect } from "react"; // 1. Hooks import kiye
import axios from "axios"; // 2. Axios import kiya
import faa from "../assets/7.png";
import design from "../assets/2.png";
import telecom from "../assets/3.png";
import construction from "../assets/4.png";
import finance from "../assets/5.png";
import government from "../assets/6.png";
import technology from "../assets/7.png";
import it from "../assets/3.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaBullhorn,
  FaPaperPlane,
  FaDesktop,
  FaRocket,
  FaHeadset,
  FaBookmark,
  FaLayerGroup,
  FaAnchor,
  FaChartBar,
} from "react-icons/fa";

// Static array ko abhi bhi rakha hai fallback ke liye agar DB khali ho
const staticCategories = [
  { title: "Human Resources", image: faa },
  { title: "Design & Multimedia", image: design },
  { title: "Tele-Communication", image: telecom },
  { title: "Construction / Facilities", image: construction },
  { title: "Accounting / Finance", image: finance },
  { title: "Government", image: government },
  { title: "Technology", image: technology },
  { title: "IT & Software", image: it },
];

const services = [
  {
    icon: <FaBullhorn />,
    title: "Manage Job Ads",
    desc: "We quickly learn to fear and thus automatically avoid potentially stressful situations of all kinds.",
  },
  {
    icon: <FaPaperPlane />,
    title: "Temp Search",
    desc: "It seems that only fragments of the original text remain in the Lorem Ipsum texts used fragments today.",
  },
  {
    icon: <FaDesktop />,
    title: "Display Jobs",
    desc: "Intrinsically incubate intuitive opportunities and real-time potentialities.",
  },
  {
    icon: <FaRocket />,
    title: "For Agencies",
    desc: "At missed advice my it no sister. Miss told ham dull knew see she spot near can.",
  },
  {
    icon: <FaHeadset />,
    title: "Quick Support",
    desc: "Designers have a lot of tools to make a story more interesting.",
  },
  {
    icon: <FaBookmark />,
    title: "Bookmark Jobs",
    desc: "Becomes an interactive story that can engage users.",
  },
  {
    icon: <FaLayerGroup />,
    title: "Creative Design",
    desc: "It seems that only fragments of the original text remain.",
  },
  {
    icon: <FaAnchor />,
    title: "Strategy & Research",
    desc: "The most important aspect of beauty was, therefore, an inherent part.",
  },
  {
    icon: <FaChartBar />,
    title: "Real-time Analytics",
    desc: "This response is important for our ability to understand.",
  },
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- DYNAMIC DATA LOGIC START ---
  const [dbCategories, setDbCategories] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Recruiter Form State
  const [reqData, setReqData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    message: "",
    experience: "",
    gstNumber: "",
  });

  // 2. Candidate Form Text State
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });

  // 3. Actual File State
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Categories Fetch karein
        const catRes = await axios.get("http://localhost:3000/api/categories");
        if (catRes.data.success) {
          setDbCategories(catRes.data.data);
        }

        // 2. Jobs Fetch karein (Jo humne naya route banaya tha)
        const jobRes = await axios.get("http://localhost:3000/api/get-jobs");
        if (jobRes.data.success) {
          setAllJobs(jobRes.data.data); // Jobs state mein save karein
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // --- DYNAMIC DATA LOGIC END ---

  // 1. Recruiter Form Logic (Left Form)
  const handleReqSubmit = async (e) => {
    e.preventDefault();

    // Login Check
    if (!user) {
      alert("⚠️ Please Login first to submit your requirement!");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/submit-requirement",
        reqData,
      );
      if (res.data.success) {
        alert("✅ Requirement submitted successfully!");
        setReqData({
          name: "",
          businessName: "",
          email: "",
          phone: "",
          message: "",
          experience: "",
        }); // Form clear karo
      }
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed! Backend check here.");
    }
  };

  // 2. Candidate Form Logic (Right Form)
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

    // 2. Request shuru hone se pehle loading TRUE karein
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
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (res.data.success) {
        alert("✅ Resume uploaded!");
        setResumeData({ name: "", email: "", phone: "", designation: "" });
        setResumeFile(null);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed!");
    } finally {
      // 3. Chahe success ho ya error, loading ko FALSE kar dein
      setLoading(false);
    }
  };

  const scrollToJobs = () => {
    const element = document.getElementById("jobs-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-10">
        {/* --- Original HD Video Background --- */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/herov.mp4" type="video/mp4" />
          <div className="absolute inset-0 bg-[url('/bg-pattern.jpg')] bg-cover bg-center opacity-30"></div>
        </video>

        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-black/30 z-1"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10 lg:px-13 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-[50px] font-bold leading-tight tracking-tight flex flex-col gap-3 md:gap-4 lg:gap-5">
              <span>We Believe in You.</span>
              <span>We Work With You.</span>
              <span>We Get You Hired.</span>
            </h1>

            <div className="w-16 h-1 bg-[#8FB339] my-5 mx-auto md:mx-0"></div>

            <p className="text-gray-200 mb-8 leading-[1.5] text-xs sm:text-sm md:text-base max-w-lg mx-auto md:mx-0 text-justify">
              We believe great results come from great relationships. That's why
              we focus on understanding both our clients' needs and our
              candidates' goals. With years of experience across diverse
              industries, we bring talent and businesses together in ways that
              create lasting value.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={scrollToJobs}
                className="bg-[#8FB339] hover:text-gray-600 text-white px-7 py-2.5 rounded-sm text-[13px] font-semibold transition duration-300 w-full sm:w-auto uppercase tracking-wide"
              >
                Looking to hire
              </button>
              <button
                onClick={scrollToJobs}
                className="bg-[#8FB339] hover:text-gray-600 text-white px-7 py-2.5 rounded-sm text-[13px] font-semibold transition duration-300 w-full sm:w-auto uppercase tracking-wide"
              >
                Looking for a job
              </button>
            </div>
          </div>

          {/* Right Content - Stats & Trust Grid */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-sm flex flex-col items-center text-center group hover:border-[#8FB339] transition-all">
                <span className="text-2xl mb-2">🤝</span>
                <h3 className="text-[#8FB339] font-bold text-sm uppercase tracking-wider">
                  Expert Guidance
                </h3>
                <p className="text-[10px] text-gray-300 mt-1">
                  Personalized Support
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-sm flex flex-col items-center text-center group hover:border-[#8FB339] transition-all">
                <span className="text-2xl mb-2">💼</span>
                <h3 className="text-[#8FB339] font-bold text-sm uppercase tracking-wider">
                  Top Companies
                </h3>
                <p className="text-[10px] text-gray-300 mt-1">Direct Tie-ups</p>
              </div>

              {/* Card 3 - Stats */}
              <div className="bg-[#8FB339]/20 backdrop-blur-md border border-[#8FB339]/30 p-5 rounded-sm flex flex-col items-center text-center">
                <span className="text-3xl font-black text-white">500+</span>
                <span className="text-[10px] text-[#8FB339] font-bold uppercase tracking-tighter">
                  Hired Last Month
                </span>
              </div>

              {/* Card 4 - Stats */}
              <div className="bg-[#8FB339]/20 backdrop-blur-md border border-[#8FB339]/30 p-5 rounded-sm flex flex-col items-center text-center">
                <span className="text-3xl font-black text-white">200+</span>
                <span className="text-[10px] text-[#8FB339] font-bold uppercase tracking-tighter">
                  Active Clients
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-700">
            Browse Job Categories
          </h2>

          <p className="mx-auto max-w-2xl mt-3 text-gray-600">
            Post a job to tell us about your project. We'll quickly match you
            with the right freelancers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
            {loading ? (
              <p className="col-span-full py-10 text-gray-400">
                Loading Categories...
              </p>
            ) : (
              (dbCategories.length > 0 ? dbCategories : staticCategories).map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg text-[17px] py-6 px-4 flex flex-col items-center transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-md hover:shadow-xl border border-transparent hover:border-gray-100"
                  >
                    {/* Icon/Image Box */}
                    <div className="bg-[#eef5df] rounded-lg p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-12 w-12 object-contain"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 font-bold text-gray-700 text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-gray-500 text-[13px] text-center leading-relaxed line-clamp-2">
                      {item.description ||
                        "Explore various opportunities in this field and grow your career."}
                    </p>
                  </div>
                ),
              )
            )}
          </div>

          <button className="mt-14 bg-[#8FB339] hover:bg-[#7aa12f] text-white px-8 py-3 rounded-md duration-600 hover:-translate-y-2 font-medium transition">
            Browse All Categories
          </button>
        </div>
      </section>

      {/* New & Random Job Section */}
      <section id="jobs-section" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
            New & Random Jobs
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl font-sans mx-auto">
            Post a job to tell us about your project. We'll quickly match you
            with the right freelancers.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16 ">
            {/* LEFT FORM */}
            <div className="bg-gray-50 p-5 rounded border border-gray-100">
              <h3 className="bg-[#8FB339] text-white py-1 font-semibold mb-6 text-center">
                Post Your Requirement
              </h3>

              <form
                className="space-y-1 text-left h-[350px]"
                onSubmit={handleReqSubmit}
              >
                {/* Name Input */}
                <input
                  className="w-full px-4 p-2 bg-white border-gray-200 border text-xs rounded outline-none focus:border-[#8FB339]"
                  placeholder="Enter Your Name"
                  value={reqData.name}
                  onChange={(e) =>
                    setReqData({ ...reqData, name: e.target.value })
                  }
                  required
                />

                {/* Business Name Input */}
                <input
                  className="w-full bg-white px-4 p-2 text-xs border border-gray-200 rounded outline-none focus:border-[#8FB339]"
                  placeholder="Enter Your Business Name"
                  value={reqData.businessName}
                  onChange={(e) =>
                    setReqData({ ...reqData, businessName: e.target.value })
                  }
                  required
                />

                {/* Email Input */}
                <input
                  className="w-full bg-white px-4 p-2 text-xs border border-gray-200 rounded outline-none focus:border-[#8FB339]"
                  placeholder="Enter Your Email Address"
                  type="email"
                  value={reqData.email}
                  onChange={(e) =>
                    setReqData({ ...reqData, email: e.target.value })
                  }
                  required
                />

                {/* Phone Input */}
                <input
                  className="w-full bg-white px-4 p-2 text-xs border border-gray-200 rounded outline-none focus:border-[#8FB339]"
                  placeholder="+91 0000000000"
                  type="tel"
                  value={reqData.phone}
                  onChange={(e) =>
                    setReqData({ ...reqData, phone: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 p-2 text-xs bg-white border-gray-200 border rounded outline-none focus:border-[#8FB339]"
                  placeholder="Enter Years of Experience"
                  value={reqData.experience}
                  onChange={(e) =>
                    setReqData({ ...reqData, experience: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  maxLength="15"
                  className="w-full px-4 p-2 text-xs bg-white border-gray-200 border rounded outline-none focus:border-[#8FB339] uppercase"
                  placeholder="Enter Company GST Number"
                  value={reqData.gstNumber}
                  onChange={(e) =>
                    setReqData({
                      ...reqData,
                      gstNumber: e.target.value.toUpperCase(),
                    })
                  }
                  // GST 15 characters ka hota hai, optional rakhna hai toh required hata dena
                  required
                />

                {/* Message Input */}
                <textarea
                  className="w-full bg-white px-4 p-2 text-xs border border-gray-200 rounded outline-none focus:border-[#8FB339]"
                  rows="3"
                  placeholder="Message"
                  value={reqData.message}
                  onChange={(e) =>
                    setReqData({ ...reqData, message: e.target.value })
                  }
                  required
                ></textarea>

                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    className="bg-[#8FB339] text-white px-4 py-2 rounded font-bold hover:bg-[#7aa12f] transition-all"
                  >
                    {user ? "Submit" : "Login"}
                  </button>
                  <button
                    type="reset"
                    onClick={() =>
                      setReqData({
                        name: "",
                        businessName: "",
                        email: "",
                        phone: "",
                        message: "",
                      })
                    }
                    className="bg-gray-400 text-white px-4 py-2 rounded font-bold"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* CENTER SLIDING JOBS */}
            <div className="bg-gray-50 p-6 rounded h-[320px] flex flex-col">
              <h3 className="bg-[#8FB339] text-white py-2 mb-4 text-center font-bold">
                Current Openings
              </h3>

              <div className="relative overflow-hidden flex-1">
                <div className="slide-animation space-y-4 text-[15px] text-left absolute w-full">
                  {allJobs.length > 0 ? (
                    allJobs.map((job, index) => (
                      <div key={job._id || index}>
                        <p>
                          <strong>Designation:</strong>{" "}
                          <span className="uppercase">{job.designation}</span>
                        </p>
                        <p>
                          <strong>Experience:</strong> {job.experience}
                        </p>
                        <p>
                          <strong>Location:</strong>{" "}
                          <span className="capitalize">{job.location}</span>
                        </p>
                        <hr className="my-4 border-dashed" />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-10 text-sm">
                      No current openings available.
                    </p>
                  )}

                  {allJobs.length > 0 &&
                    allJobs.length < 4 &&
                    allJobs.map((job, index) => (
                      <div key={`dup-${index}`}>
                        <p>
                          <strong>Designation:</strong>{" "}
                          <span className="uppercase">{job.designation}</span>
                        </p>
                        <p>
                          <strong>Experience:</strong> {job.experience}
                        </p>
                        <p>
                          <strong>Location:</strong>{" "}
                          <span className="capitalize">{job.location}</span>
                        </p>
                        <hr className="my-4 border-dashed" />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-gray-50 p-6 rounded border border-gray-100">
              <h3 className="bg-[#8FB339] text-white py-1 font-semibold mb-4 text-center">
                Apply For Jobs
              </h3>

              <form
                className="space-y-1 text-left"
                onSubmit={handleResumeSubmit}
              >
                {/* Name Input */}
                <input
                  type="text"
                  className="w-full bg-white px-4 p-2 text-xs  border border-gray-200 rounded outline-none focus:border-[#8FB339]"
                  placeholder="Enter Your Name"
                  value={resumeData.name}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, name: e.target.value })
                  }
                  required
                />

                {/* Email Input */}
                <input
                  type="email"
                  className="w-full bg-white px-4 p-2 text-xs border border-gray-200 rounded outline-none focus:border-[#8FB339]"
                  placeholder="Enter Your Email"
                  value={resumeData.email}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, email: e.target.value })
                  }
                  required
                />

                {/* Phone Input */}
                <input
                  type="tel"
                  className="w-full bg-white px-4 p-2 text-xs border border-gray-200 rounded outline-none focus:border-[#8FB339]"
                  placeholder="+91 0000000000"
                  value={resumeData.phone}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, phone: e.target.value })
                  }
                  required
                />

                {/* Designation Input */}
                <textarea
                  className="w-full bg-white px-4 p-2 text-xs border border-gray-200 rounded outline-none focus:border-[#8FB339]"
                  rows="3"
                  placeholder="Designation"
                  value={resumeData.designation}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      designation: e.target.value,
                    })
                  }
                  required
                ></textarea>

                <input
                  type="file"
                  className="w-full bg-white px-4 p-2 text-xs border border-gray-200 rounded"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  required
                />

                <button
                  type="submit"
                  disabled={loading} // Jab loading ho raha ho, button disable ho jaye
                  className={`bg-[#8FB339] text-white px-6 py-2  rounded transition duration-300 hover:text-gray-600 font-bold w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      {/* Ek chota sa spinner icon */}
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </div>
                  ) : user ? (
                    "Submit"
                  ) : (
                    "Login to Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                How It Work
              </h2>

              <p className="text-gray-500 text-[16px] mb-10 max-w-md">
                Post a job to tell us about your project. We'll quickly match
                you with the right freelancers.
              </p>

              <div className="space-y-9 relative">
                {/* LINE FIXED: top aur bottom ko adjust kiya hai taaki 3 pe ruk jaye */}
                <div className="absolute left-5 top-5 bottom-5 w-0 border-l-2 border-dashed border-gray-300 z-0"></div>

                {/* Step 1 */}
                <div className="flex items-start text-xl gap-6 relative">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#8FB339] text-white font-semibold z-10">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-md text-[#8FB339]">
                      Post Your Requirement
                    </h4>
                    <p className="text-gray-500 text-[15px] mt-2 max-w-md">
                      Due to its widespread use as filler text for layouts,
                      non-readability is of great importance.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-6 text-xl relative">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold z-10">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-gray-700">
                      Check Current Opening
                    </h4>
                    <p className="text-gray-500 text-[15px] mt-2 max-w-md">
                      There are many variations of passages of available
                      bookmark-label, but the majority alteration in some form.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start text-xl gap-6 relative">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold z-10">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-md text-gray-700">
                      Post Your Details
                    </h4>
                    <p className="text-gray-500 text-[15px] mt-2 max-w-md">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center">
              <img src="8.png" alt="How It Work" className="w-full max-w-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto py-6 px-4 text-center">
          <h2 className="text-2xl md:text-2xl font-semibold text-gray-700">
            Providing our trusted{" "}
            <span className="text-[#f7c319]">Services</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl text-[13px] mx-auto">
            It is a long established fact that a reader will be of a page when
            established fact looking at its layout.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 ">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg
                             transition-all duration-600 ease-in-out 
                             transform hover:-translate-y-2"
              >
                <div className="text-[#8FB339] text-2xl mb-4">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-md mb-3 text-gray-700">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-4 text-[#8FB339] text-[12px] font-semibold cursor-pointer hover:underline">
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
