// components/ThemeToggle.tsx
"use client";

import React from "react";
import { useTheme } from "../context-providers/theme-provider";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M6.364 6.364l-1.06 1.06M4.5 12H3M6.364 17.636l-1.06-1.06M12 19.5v1.5M17.636 17.636l-1.06-1.06M19.5 12h1.5M17.636 6.364l-1.06 1.06M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.75 9.75 0 0112 3a9.718 9.718 0 019.752 12.002z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
