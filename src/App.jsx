import React from "react";
import useTheme from "./useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-vh-100 d-flex flex-column justify-content-center align-items-center bg-${theme} text-${theme === "light" ? "dark" : "light"} animate__animated animate__fadeIn`}>
      <div className="card shadow-lg p-4 text-center animate__animated animate__zoomIn" style={{ background: theme === 'light' ? '#fff' : '#23272f', color: theme === 'light' ? '#222' : '#f8f9fa' }}>
        <h1 className="mb-4">Hello World</h1>
        <button
          className={`btn btn-${theme === "light" ? "dark" : "light"} d-flex align-items-center gap-2`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <><i className="bi bi-moon-fill"></i> Dark Mode</>
          ) : (
            <><i className="bi bi-sun-fill"></i> Light Mode</>
          )}
        </button>
      </div>
    </div>
  );
}
