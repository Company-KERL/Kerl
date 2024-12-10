import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URI}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Include cookies in the request
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.message);
          logIn(data.user);
          navigate("/");
        } else {
          alert(data.message || "Login failed. Please try again.");
        }
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
          Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your credentials to access your account.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-full 
            hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 
            shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 text-center text-gray-600">
          <span>Don't have an account? </span>
          <Link
            to="/signup"
            className="text-green-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
