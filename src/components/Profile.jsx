import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ProfilePage = () => {
  const { user, updateUser } = useContext(UserContext); // Assuming you have an updateUser function to handle updates
  const [editMode, setEditMode] = useState(false);

  // State for handling form fields
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [error, setError] = useState('');

  // Handle form submission (for saving changes)



  const handleSaveChanges = async () => {
    // Validate passwords if changing password
    if (newPassword && newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    if (newPassword && !currentPassword) {
      setError('Please enter your current password.');
      return;
    }

    const updatedUser = {
      username,
      email,
      password: newPassword || password, // Use new password if provided
      address,
      phone,
    };

    // Call API or context function to update the user details
    
    try {
        const response = await fetch('/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
          credentials: 'include', // Ensure cookies are sent with the request
        });
    
        if (response.ok) {
          const data = await response.json();
          updateUser(updatedUser); // Update user in context
          setEditMode(false); // Exit edit mode after saving
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to update profile.');
        }
      } catch (error) {
        console.error("Error updating user details:", error);
        alert("Failed to update profile.");
      }
  };

  // Handle cancel
  const handleCancel = () => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
    setAddress(user.address);
    setPhone(user.phone);
    setError('');
    setEditMode(false);
  };

  return (
    <div className="container mx-auto px-6 py-10 md:px-16 mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {/* User Details Form */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-lg font-medium text-gray-700 w-32">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!editMode}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-lg font-medium text-gray-700 w-32">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editMode}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Current Password (only visible in edit mode if changing password) */}
          {editMode && (
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="text-lg font-medium text-gray-700 w-32">Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* New Password */}
          {editMode && (
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="text-lg font-medium text-gray-700 w-32">New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Confirm New Password */}
          {editMode && (
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="text-lg font-medium text-gray-700 w-32">Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-lg font-medium text-gray-700 w-32">Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!editMode}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-lg font-medium text-gray-700 w-32">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editMode}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Save Changes Button */}
        {editMode && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
