import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Add signup logic here
    console.log('Signing up with:', { name, email, password });
  };

  return (
    <section className="mt-16 min-h-[800px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 sm:p-10">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Sign Up</h2>
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
