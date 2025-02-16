import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the DarkMode context
const DarkModeContext = createContext();

// Provider to manage dark mode globally
export const DarkModeProvider = ({ children }) => {
  // Check localStorage for the saved dark mode preference
  const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';

  const [isDarkMode, setIsDarkMode] = useState(savedDarkMode);

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem('isDarkMode', newDarkModeState);  // Save the new state to localStorage
    
    if (newDarkModeState) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Use effect to initially set the mode based on localStorage when the component mounts
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use dark mode context
export const useDarkMode = () => useContext(DarkModeContext);
