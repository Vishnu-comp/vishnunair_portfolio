import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (hash) => {
    const isOnHomePage = window.location.pathname === "/";
    if (!isOnHomePage) {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    closeMobileMenu(); // Close mobile menu after clicking a link
  };

  return (
    <nav className="bg-blue-500 text-white py-4 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu} className="hover:text-black-500">
          <img
            src="https://github.com/user-attachments/assets/7323e2bc-209b-4ddf-9983-62b6e31b2672"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <button onClick={() => handleNavigation("#hero")} className="hover:text-black">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#education")} className="hover:text-black">
              Education
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#internship")} className="hover:text-black">
              Internship
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#portfolio")} className="hover:text-black">
              Projects
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#achievements")} className="hover:text-black">
              Achievements
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#whyhireme")} className="hover:text-black">
              Contact Me
            </button>
          </li>
          <li>
            <Link to="/resume" className="hover:text-blue-500">
              Resume
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden bg-blue-500 text-white py-4 px-4 space-y-4 text-center absolute top-16 left-0 w-full z-40">
          <li>
            <button onClick={() => handleNavigation("#hero")} className="block hover:text-black-300">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#education")} className="block hover:text-black-300">
              Education
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#internship")} className="block hover:text-black-300">
              Internship
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#portfolio")} className="block hover:text-black-300">
              Projects
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#achievements")} className="block hover:text-black-300">
              Achievements
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("#whyhireme")} className="block hover:text-black-300">
              Contact Me
            </button>
          </li>
          <li>
            <Link to="/resume" onClick={closeMobileMenu} className="block hover:text-black-300">
              Resume
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
