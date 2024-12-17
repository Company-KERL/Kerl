import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);

  // State for handling form fields
  const [street, setStreet] = useState(user.address?.street || "");
  const [city, setCity] = useState(user.address?.city || "");
  const [state, setState] = useState(user.address?.state || "");
  const [zip, setZip] = useState(user.address?.zip || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [error, setError] = useState("");

  // Handle form submission (for saving changes)
  const handleSaveChanges = async () => {
    // Validation
    if (!street || !city || !state || !zip || !phone) {
      setError("All fields are required.");
      return;
    }
    setError(""); // Clear previous errors

    const updatedAddress = {
      street,
      city,
      state,
      zip,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: updatedAddress,
            phone,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEditMode(false); // Exit edit mode after saving
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      setError("Failed to update profile.");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setStreet(user.address?.street || "");
    setCity(user.address?.city || "");
    setState(user.address?.state || "");
    setZip(user.address?.zip || "");
    setPhone(user.phone || "");
    setError("");
    setEditMode(false);
  };

  return (
    <div className="container mx-auto px-6 py-10 md:px-16 mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Personal Information
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* User Details Form */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-lg font-medium text-gray-700 w-32">
              Name:
            </label>
            <input
              type="text"
              value={user.name}
              disabled={true}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-lg font-medium text-gray-700 w-32">
              Username:
            </label>
            <input
              type="text"
              value={user.username}
              disabled={true}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-lg font-medium text-gray-700 w-32">
              Email:
            </label>
            <input
              type="email"
              value={user.email}
              disabled={true}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Address Fields */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label
              htmlFor="streetAddress"
              className="text-lg font-medium text-gray-700 w-32"
            >
              Street Address:
            </label>
            <input
              id="streetAddress"
              type="text"
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={street}
              disabled={!editMode}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label
              htmlFor="city"
              className="text-lg font-medium text-gray-700 w-32"
            >
              City:
            </label>
            <input
              id="city"
              type="text"
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={city}
              disabled={!editMode}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label
              htmlFor="state"
              className="text-lg font-medium text-gray-700 w-32"
            >
              State:
            </label>
            <input
              id="state"
              type="text"
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={state}
              disabled={!editMode}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <label
              htmlFor="pincode"
              className="text-lg font-medium text-gray-700 w-32"
            >
              Pincode:
            </label>
            <input
              id="pincode"
              type="text"
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={zip}
              disabled={!editMode}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label className="text-lg font-medium text-gray-700 w-32">
              Phone:
            </label>
            <input
              type="text"
              value={phone}
              disabled={!editMode}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full md:w-2/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              onBlur={(e) => {
                const phone = e.target.value;
                if (!/^\d{10}$/.test(phone)) {
                  alert("Phone number must be 10 digits");
                  setPhone("");
                }
              }}
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
