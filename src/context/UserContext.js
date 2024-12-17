import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);

  // Persist login state to localStorage on change
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isLoggedIn, user]);

  const logIn = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setLoading(false);
  };

  const logOut = async () => {
    try {
      // Call the backend API to clear the cookie
      await fetch(`${process.env.REACT_APP_BACKEND_URI}/logout`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });
      // Clear the frontend state
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        user,
        logIn,
        logOut,
        loading,
        setLoading,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
