import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import "@fontsource/cormorant-garamond/700.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logOut, user } = useContext(UserContext);

  const username = isLoggedIn ? user.username : ""; // Mock username
  const [cartItemCount, setCartItemCount] = useState(); // Mock cart state

  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [showDropdown, setShowDropdown] = useState(false); // User dropdown toggle (desktop)
  const [showMobileDropdown, setShowMobileDropdown] = useState(false); // User dropdown toggle (mobile)

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileDropdown = () => setShowMobileDropdown(!showMobileDropdown);

  useEffect(() => {
    const fetchCartLength = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/cart/${user._id}/length`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart length");
        }

        const data = await response.json();
        setCartItemCount(data.cartLength); // Assuming 'cartLength' is returned
        console.log("Cart length: ", data.cartLength);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user && user._id) {
      fetchCartLength();
    }
  }, [user]);

  return (
    <header className="bg-white shadow-md fixed top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-16">
        {/* Logo */}
        <a className="flex items-center" href="/#ero">
          <img
            src="Logo.png"
            alt="Kerl Logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
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

        {/* Navigation and Buttons */}
        <div
          className={`absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full px-10 md:px-0 md:w-auto py-5 md:py-0 bg-white md:bg-transparent shadow-md md:shadow-none transition-transform duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:flex items-center`}
        >
          {/* Navigation Links */}
          <nav className="flex flex-col md:flex-row md:space-x-6 text-gray-700 px-4 md:p-0 justify-center items-center">
            <a
              href="/#about"
              className="block py-2 md:py-0 hover:text-gray-900"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="block py-2 md:py-0 hover:text-gray-900"
            >
              Contact
            </a>
            <a
              href="/explore"
              className="block py-2 md:py-0 hover:text-gray-900"
            >
              Products
            </a>

            {/* Mobile View: User Dropdown */}
            {isLoggedIn && (
              <div className="md:hidden w-full">
                <button
                  className="flex justify-center items-center w-full py-2 px-4 text-gray-800 font-bold focus:outline-none"
                  onClick={toggleMobileDropdown}
                >
                  <span>{username}</span>
                  {cartItemCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {showMobileDropdown && (
                  <ul className="bg-gray-100 w-full rounded-lg shadow-lg mt-2">
                    <li>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        href="/cart"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Cart
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logOut();
                          navigate("/");
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {/* Add Login and Signup buttons for mobile */}
            {!isLoggedIn && (
              <div className="md:hidden flex-col w-full">
                <a
                  href="/login"
                  className="block py-2 px-4 text-gray-800 font-bold hover:bg-gray-200 rounded-md text-center"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block py-2 px-4 text-gray-800 font-bold hover:bg-gray-200 rounded-md text-center"
                >
                  Sign Up
                </a>
              </div>
            )}
          </nav>

          {/* Desktop View: User Dropdown */}
          {isLoggedIn && (
            <div className="hidden md:flex md:items-center md:space-x-4 relative ml-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-800 hover:text-gray-900"
              >
                {username}
              </button>
              {showDropdown && (
                <ul className="absolute right-0 bg-gray-100 w-48 rounded-lg shadow-lg mt-64">
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="/cart"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Cart
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logOut();
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
              <a
                href="/cart"
                className="flex items-center text-gray-800 hover:text-gray-900 relative"
              >
                <FaShoppingCart className="mr-1" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </a>
            </div>
          )}

          {/* Add Login and Signup buttons for desktop */}
          {!isLoggedIn && (
            <div className="hidden md:flex space-x-2 ml-4">
              <a
                href="/signup"
                className="block py-2 px-6  bg-green-500 text-white font-semibold rounded-full 
            hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 
            shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="block py-2 px-6 border-2 border-green-500 text-green-800 
            font-semibold rounded-full hover:bg-green-50 transition duration-300 
            ease-in-out transform hover:-translate-y-1 shadow-md"
              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
