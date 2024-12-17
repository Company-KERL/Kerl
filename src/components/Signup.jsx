import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InformationalModal from "./InfoModal";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState({});
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const openInfoModal = () => setInfoModalOpen(true);
  const closeInfoModal = () => {
    setInfoModalOpen(false);
    navigate("/login");
  };
  const [message1, setMessage] = useState(""); // Corrected state initialization

  const handleSignup = (e) => {
    setAddress({ street, city, state, zip });
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Add signup logic here
    fetch(`${process.env.REACT_APP_BACKEND_URI}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, address, phoneNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        openInfoModal();
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <section className="mt-16 min-h-[800px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 sm:p-10">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Sign Up
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Create your account to get started.
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="streetAddress"
              className="block text-gray-700 font-medium mb-2"
            >
              Street Address
            </label>
            <input
              id="streetAddress"
              type="text"
              placeholder="Enter your Street Address"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />

            <label
              htmlFor="city"
              className="block text-gray-700 font-medium mt-4 mb-2"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Enter your City"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <label
              htmlFor="state"
              className="block text-gray-700 font-medium mt-4 mb-2"
            >
              State
            </label>
            <input
              id="state"
              type="text"
              placeholder="Enter your State"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />

            <label
              htmlFor="pincode"
              className="block text-gray-700 font-medium mt-4 mb-2"
            >
              Pincode
            </label>
            <input
              id="pincode"
              type="text"
              placeholder="Enter your Pincode"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="number"
              placeholder="Enter your Phone Number"
              className="w-full px-4 py-2 border rounded-lg shadow-md focus:ring-2 focus:ring-green-500 transition-all duration-300"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              onBlur={(e) => {
                const phone = e.target.value;
                if (!/^\d{10}$/.test(phone)) {
                  alert("Phone number must be 10 digits");
                  setPhoneNumber("");
                }
              }}
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-full 
            hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 
            shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>

        {/* Modal */}
        {isInfoModalOpen && (
          <InformationalModal message={message1} onClose={closeInfoModal} />
        )}

        {/* Divider */}
        <div className="mt-6 text-center text-gray-600">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="text-green-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
