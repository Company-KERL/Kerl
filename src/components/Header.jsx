import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "@fontsource/cormorant-garamond/700.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-16">
        {/* Logo and Brand */}
        <a className="flex items-center" href="/#ero">
          <img src="Logo.png" alt="Kerl Logo" className="w-10 h-10 md:w-12 md:h-12" />
          <h1
            className="ml-2 text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            KERL
          </h1>
        </a>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links (hidden on small screens, visible on medium and larger) */}
        <nav className={`md:flex ${isOpen ? "block" : "hidden"} absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 text-gray-700 p-4 md:p-0">
            <li>
              <a
                href="/#about"
                className="block py-2 md:py-0 hover:text-gray-900"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 md:py-0 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/#products"
                className="block py-2 md:py-0 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Products
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
