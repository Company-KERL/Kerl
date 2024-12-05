import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import "@fontsource/cormorant-garamond/700.css";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#f7f5ee] text-[#443030] py-10 px-4 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section: Logo and Brand */}
        <div className="flex flex-col items-center md:flex-row md:items-center justify-center gap-4 md:gap-10 mb-6 md:mb-0">
          <img src='./Logo_big.png' alt="KERL Logo" className="mb-4 md:mb-0 w-[100px] md:w-[120px]" /> {/* Adjust width as needed */}
          <p className="text-center md:text-left text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>KERL</p>
        </div>

        {/* Middle Section: Subscribe */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-auto">
          <p className="text-center md:text-left mb-4 text-sm md:text-base">
            Subscribe to stay tuned for new products and latest updates. Let's do it!
          </p>
          <div className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 px-4 rounded-l-md border border-gray-300 w-full"
            />
            <button className="bg-[#443030] text-white px-4 rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right Section: Contact Info and Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4 text-center md:text-left">
            <h3 className="font-bold">Contact Us</h3>
            <p>+91 9567072475</p>
            <p>+91 9947615755</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-center md:text-left">Follow us</h3>
            <div className="flex space-x-6 justify-center md:justify-start">
              <a href="https://www.instagram.com/kerl_company?igsh=MWVwOXppeHVzb3l2bA==" className="text-[#443030]"><FaInstagram size={24} /></a>
              <a href="/" className="text-[#443030]"><FaFacebook size={24} /></a>
              <a href="/" className="text-[#443030]"><FaTwitter size={24} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
        <p className="text-sm text-[#443030]">&copy; 2024 All Rights Reserved</p>
        <div className="flex justify-center space-x-4 md:space-x-8 mt-4">
          <a href="/" className="text-[#443030]">Privacy Policy</a>
          <a href="/" className="text-[#443030]">Terms of Use</a>
          <a href="/" className="text-[#443030]">Sales and Refunds</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
