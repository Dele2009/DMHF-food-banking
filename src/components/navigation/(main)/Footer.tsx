import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-yellow-700 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-sm text-gray-300">
            Divine Mandate Humanitarian Foundation (DMHF) is dedicated to
            eradicating poverty, providing food security, and supporting
            sustainable development initiatives across communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:underline">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p>
            Email:{" "}
            <a href="mailto:support@dmhf.org" className="hover:underline">
              support@dmhf.org
            </a>
          </p>
          <p>Phone: +234 123 456 7890</p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a href="#" className="text-white hover:text-gray-300 text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-white hover:text-gray-300 text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-gray-300 text-xl">
              <FaInstagram />
            </a>
            <a
              href="mailto:support@dmhf.org"
              className="text-white hover:text-gray-300 text-xl"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Divine Mandate Humanitarian
        Foundation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
