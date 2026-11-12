import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-sm btn-pocket-outline rounded-circle p-2 d-inline-flex align-items-center justify-content-center ${className}`}
      style={{ width: '38px', height: '38px' }}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode (Press T)`}
      aria-label="Toggle Dark and Light theme"
    >
      {isDark ? (
        <FiSun className="text-warning" size={18} />
      ) : (
        <FiMoon className="text-secondary" size={18} />
      )}
    </button>
  );
}

