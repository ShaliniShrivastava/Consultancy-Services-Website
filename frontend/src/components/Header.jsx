import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX, HiUserCircle } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinkClass =
    "hover:text-gray-800 transition duration-300 cursor-pointer";

  // Naam nikaalne ka safe tareeka
  const getUserName = () => {
    if (!user) return "";
    // Agar backend se user object ke andar name hai
    const name = user.name || user.user?.name || "User";
    return name.split(" ")[0]; // Pehla naam
  };

  return (
    <header className="bg-[#8FB339] w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-13 py-1">
        {/* Logo */}
        <NavLink to="/">
          <img
            src={logo}
            alt="SR Web Consultancy"
            className="h-16 px-4 w-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
          />
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-white font-semibold uppercase text-[13px] tracking-wide">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/clients" className={navLinkClass}>
            Clients
          </NavLink>
          <NavLink to="/candidates" className={navLinkClass}>
            Candidates
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            Services
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/feedback" className={navLinkClass}>
            Feedback
          </NavLink>

          {/* --- Profile / Auth Logic --- */}
          <div className="flex items-center gap-3 ml-2">
            {user ? (
              <div className="flex items-center gap-4 bg-black/10 px-3 py-1.5 rounded-full border border-white/20">
                <div className="flex items-center gap-2">
                  <HiUserCircle className="text-2xl text-white" />
                  <span className="text-white normal-case font-medium tracking-normal">
                    Hi, {getUserName()}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="bg-white text-red-600 hover:bg-red-50 px-3 py-1 rounded-md text-[12px] font-bold transition duration-300 uppercase"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="border border-white text-white hover:bg-white hover:text-[#8FB339] px-4 py-1.5 rounded-lg text-[13px] font-semibold transition duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-white text-[#8FB339] hover:bg-gray-100 px-4 py-1.5 rounded-lg text-[13px] font-semibold transition duration-300"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden text-white text-3xl cursor-pointer">
          {isOpen ? (
            <HiX onClick={() => setIsOpen(false)} />
          ) : (
            <HiMenu onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#8FB339] px-6 pb-6 shadow-inner">
          <nav className="flex flex-col gap-4 text-white font-semibold uppercase text-sm">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/clients" className={navLinkClass}>
              Clients
            </NavLink>
            <NavLink to="/candidates" className={navLinkClass}>
              Candidates
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/feedback" className={navLinkClass}>
              Feedback
            </NavLink>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/30">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-white normal-case">
                    <HiUserCircle className="text-2xl" />
                    <span>{getUserName()}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-center bg-red-500 text-white py-2 rounded-lg text-sm font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center border border-white text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center bg-white text-[#8FB339] px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
