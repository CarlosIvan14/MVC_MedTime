// src/components/DarkModeToggle.jsx
import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext'; 
import { FiSun, FiMoon } from 'react-icons/fi';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-transparent p-2 focus:outline-none"
    >
      {darkMode ? <FiSun size={24} className="hover:text-blue-500" /> : <FiMoon size={24} className="hover:text-blue-500" />}
    </button>
  );
};

export default DarkModeToggle;
