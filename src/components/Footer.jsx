import React from "react";

const footerLinks = ["Terms of Repository Access", "Privacy Architecture", "Institutional Support"];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left */}
        <p className="text-gray-400 text-xs text-center sm:text-left">
          © 2026 Universitas Bengkulu Research Portal. All scholarly rights reserved.
        </p>
        {/* Right */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-400 hover:text-navy text-xs transition-colors duration-150"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
