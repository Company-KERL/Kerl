import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const logIn = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setLoading(false); // Set loading to false
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    setLoading(false); // Set loading to false
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, user, logIn, logOut, loading, setLoading, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
