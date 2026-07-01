// Footer.jsx
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-14 pb-6 px-6 md:px-20">
      <div className="grid md:grid-cols-3 gap-10">
        
        {/* Company Info */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            SR Web Services
          </h2>
          <p className="text-sm mb-4">
            It is a well-known fact that a visitor will focus on the look of a
            page rather than its full content.
          </p>

          <h4 className="text-white font-medium mb-2">Follow Us on:</h4>
          <div className="flex gap-3">
            <div className="p-2 border border-gray-500 rounded-full hover:bg-green-600 hover:border-green-600 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="p-2 border border-gray-500 rounded-full hover:bg-green-600 hover:border-green-600 cursor-pointer">
              <FaLinkedinIn />
            </div>
            <div className="p-2 border border-gray-500 rounded-full hover:bg-green-600 hover:border-green-600 cursor-pointer">
              <FaGoogle />
            </div>
            <div className="p-2 border border-gray-500 rounded-full hover:bg-green-600 hover:border-green-600 cursor-pointer">
              <FaTwitter />
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-500 cursor-pointer">Home</li>
            <li className="hover:text-green-500 cursor-pointer">About</li>
            <li className="hover:text-green-500 cursor-pointer">Services</li>
            <li className="hover:text-green-500 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-500 cursor-pointer">Clients</li>
            <li className="hover:text-green-500 cursor-pointer">Candidates</li>
            <li className="hover:text-green-500 cursor-pointer">FAQ's</li>
            <li className="hover:text-green-500 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        Copyright © 2025-2026 | SR Web Consultancy Services | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
