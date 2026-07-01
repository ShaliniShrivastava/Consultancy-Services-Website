import React, { useState } from "react";
import {
  LayoutDashboard,
  List,
  Briefcase,
  FileText,
  Mail,
  Lock,
  LogOut,
  ChevronDown, // Naya icon dropdown ke liye
  PlusCircle,
  Eye,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // State to handle which dropdown is open
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (menuName) => {
    if (openSubMenu === menuName) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(menuName);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Add Categories",
      icon: <List size={20} />,
      hasSub: true,
      subMenu: [
        {
          name: "Add Categories",
          icon: <PlusCircle size={16} />,
          path: "/admin/add-category",
        },
        {
          name: "Display Categories",
          icon: <Eye size={16} />,
          path: "/admin/add-category",
        },
      ],
    },
    {
      name: "Add Jobs",
      icon: <Briefcase size={20} />,
      hasSub: true,
      subMenu: [
        {
          name: "Add Jobs",
          icon: <PlusCircle size={16} />,
          path: "/admin/add-job",
        },
        {
          name: "Display Jobs",
          icon: <Eye size={16} />,
          path: "/admin/add-job",
        },
      ],
    },
    {
      name: "Recruiter Requirement",
      icon: <FileText size={20} />,
      path: "/admin/requirements",
    },
    {
      name: "Candidate Details",
      icon: <FileText size={20} />,
      path: "/admin/post-resume",
    },

    {
      name: "Resume Builder",
      icon: <FileText size={20} />,
      hasSub: true,
      subMenu: [
        {
          name: "Payments",
          icon: <Eye size={16} />,
          path: "/admin/resume-builder",
        },
      ],
    },
    { name: "Contact", icon: <Mail size={20} />, path: "/admin/contacts" },
    {
      name: "Change Password",
      icon: <Lock size={20} />,
      path: "/admin/change-password",
    },
    { name: "Feedbacks", icon: <Lock size={20} />, path: "/admin/feedbacks" },
  ];

  return (
    <div className="w-64 bg-[#015f41] text-white min-h-screen flex flex-col fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-green-800">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-yellow-400">🌱</span> SR Admin
        </h1>
      </div>

      <nav className="flex-1 mt-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* Main Menu Item */}
            <div
              onClick={() =>
                item.hasSub ? toggleSubMenu(item.name) : navigate(item.path)
              }
              className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-[#0a4d37] transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {item.hasSub && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openSubMenu === item.name ? "rotate-180" : ""}`}
                />
              )}
            </div>

            {/* Sub Menu Items */}
            {item.hasSub && openSubMenu === item.name && (
              <div className="bg-[#004b33] py-2">
                {item.subMenu.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    onClick={() => navigate(sub.path)}
                    className="flex items-center gap-3 pl-12 py-2 cursor-pointer hover:text-yellow-400 text-xs text-gray-300 transition-colors"
                  >
                    {sub.icon}
                    <span>{sub.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Section */}
      <div
        onClick={logout}
        className="p-6 border-t border-green-800 cursor-pointer hover:bg-red-700 flex items-center gap-3 transition-colors"
      >
        <LogOut size={20} />
        <span className="font-bold">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
