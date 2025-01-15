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
    <nav className="bg-white/80 backdrop-blur-md text-gray-800 py-4 shadow-lg fixed w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={closeMobileMenu} 
          className="transition-transform duration-300 hover:scale-105"
        >
          <img
            src="https://github.com/user-attachments/assets/7323e2bc-209b-4ddf-9983-62b6e31b2672"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          {[
            { href: "#hero", label: "Home" },
            { href: "#education", label: "Education" },
            { href: "#internship", label: "Internship" },
            { href: "#portfolio", label: "Projects" },
            { href: "#achievements", label: "Achievements" },
            { href: "#whyhireme", label: "Contact Me" },
          ].map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavigation(item.href)}
                className="relative px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors duration-300
                  after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
                  after:bg-blue-600 after:left-0 after:bottom-0 after:origin-right
                  after:transition-transform after:duration-300
                  hover:after:scale-x-100 hover:after:origin-left"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              to="/resume"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Resume
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full
            hover:bg-gray-100 transition-colors duration-300" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full">
          <ul className="bg-white/95 backdrop-blur-md shadow-lg py-4 px-4 space-y-4 text-center
            animate-slideDown border-t border-gray-100">
            {[
              { href: "#hero", label: "Home" },
              { href: "#education", label: "Education" },
              { href: "#internship", label: "Internship" },
              { href: "#portfolio", label: "Projects" },
              { href: "#achievements", label: "Achievements" },
              { href: "#whyhireme", label: "Contact Me" },
            ].map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className="w-full px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50
                    rounded-lg transition-colors duration-300"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/resume"
                onClick={closeMobileMenu}
                className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg
                  hover:bg-blue-700 transition-all duration-300"
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
