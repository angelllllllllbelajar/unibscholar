import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home",         to: "/"             },
  { label: "Researchers",  to: "/researchers"  },
  { label: "Publications", to: "/publications" },
  { label: "Study Center", to: "/study-center" },
  { label: "Projects",     to: "/projects"     },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="/logo-unib.png"
            alt="UNIB Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-lg font-extrabold tracking-wide leading-tight">
            <span className="text-navy">UNIVERSITAS</span>{" "}
            <span className="text-yellow-400">BENGKULU</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold transition-colors duration-150 relative
                ${isActive ? "text-navy" : "text-gray-500 hover:text-navy"}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-navy rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-navy"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-2.5 text-sm font-semibold rounded-md mt-1
                ${isActive
                  ? "text-navy bg-blue-50 border-l-4 border-navy"
                  : "text-gray-600 hover:text-navy hover:bg-gray-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}