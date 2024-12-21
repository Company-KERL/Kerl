import React, { createContext, useState, useEffect } from 'react';

// Create the context
const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Check if session ID exists in localStorage
    const storedSessionId = localStorage.getItem('sessionId');
    
    if (!storedSessionId) {
      const newSessionId = generateSessionId();
      localStorage.setItem('sessionId', newSessionId); // Store session ID in localStorage
      setSessionId(newSessionId);
    } else {
      setSessionId(storedSessionId);
    }
  }, []);

  const generateSessionId = () => {
    return 'session-' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <SessionContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
