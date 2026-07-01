import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Clients from "./pages/Clients";
import Footer from "./components/Footer";
import CandidateHero from "./pages/Candidates";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/AdminDashboard";
import AddCategory from "./pages/admin/AddCategory";
import ManageJobs from "./pages/admin/ManageJobs";
import DisplayRequirements from "./pages/admin/DisplayRequirements";
import DisplayResumes from "./pages/admin/DisplayResumes";
import DisplayContacts from "./pages/admin/DisplayContacts";
import ChangePassword from "./pages/admin/ChangePassword";
import Feedback from "./pages/Feedback";
import DisplayFeedbacks from "./pages/admin/DisplayFeedbacks";
import ResumeBuilderAdmin from "./pages/admin/ResumeBuilderAdmin";



// Admin Pages Import


function App() {
  const location = useLocation();

  // Check karein ki kya path admin se shuru ho raha hai
  // Isse Dashboard par Header/Footer hide ho jayenge
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      
      {!isAdminPath && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/candidates" element={<CandidateHero />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* --- Admin Routes --- */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/add-category" element={<AddCategory/>} />
        <Route path="/admin/add-job" element={<ManageJobs />} />
        <Route path="/admin/requirements" element={<DisplayRequirements />} />
        <Route path="/admin/post-resume" element={<DisplayResumes />} />
        <Route path="/admin/contacts" element={<DisplayContacts />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />
        <Route path="/admin/feedbacks" element={<DisplayFeedbacks />} />
        <Route path="/admin/resume-builder" element={<ResumeBuilderAdmin />} />
        

      </Routes>


      {!isAdminPath && <Footer />}
    </AuthProvider>
  );
}

export default App;