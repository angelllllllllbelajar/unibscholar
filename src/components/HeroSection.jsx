import React, { useState } from "react";

// SVG Icons
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const popularSearches = ["Machine Learning", "Molecular Biology", "Clean Energy", "Astrophysics"];

export default function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="bg-gray-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ─── Left Column ─── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight mb-5">
              <span className="text-navy">UNIB</span>{" "}
              <span className="text-blue-500">Scholar</span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Access open research, publications, and academic achievements from
              Universitas Bengkulu. Explore profiles of our researchers, published
              papers, innovative projects, and research units driving scientific
              contributions and community impact.
            </p>

            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-4">
              <div className="flex items-center pl-4 pr-2">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search researchers, paper, projects..."
                className="flex-1 py-3.5 px-2 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-navy font-bold text-sm px-5 py-3.5 transition-colors duration-150 flex-shrink-0">
                Search
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
              <span className="text-gray-500 font-medium">Popular searches:</span>
              {popularSearches.map((term, i) => (
                <React.Fragment key={term}>
                  <a href="#" className="text-blue-400 hover:text-blue-600 hover:underline transition-colors">
                    {term}
                  </a>
                  {i < popularSearches.length - 1 && (
                    <span className="text-gray-300">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ─── Right Column ─── */}
          <div className="relative order-1 lg:order-2">
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              {/* Aerial photo placeholder — replace src with real image */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Gedung_Rektorat_Universitas_Bengkulu.jpg/1280px-Gedung_Rektorat_Universitas_Bengkulu.jpg"
                alt="Gedung Rektorat Universitas Bengkulu"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.classList.add("bg-gradient-to-br", "from-slate-200", "to-slate-400");
                }}
              />

              {/* Logo overlay top-left */}
              <div className="absolute top-4 left-4 z-10">
                <img
                  src="/logo-unib.png"
                  alt="Logo UNIB"
                  className="w-14 h-14 object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Badge Overlay Card */}
            <div className="absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-6 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-4">
              {/* Left: icon + text */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                  {/* Document icon */}
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-navy font-bold text-sm sm:text-base truncate">151,727+ Indexed Outputs</p>
                  <p className="text-gray-500 text-xs truncate">Direct DOI allocation &amp; ORCID sync</p>
                </div>
              </div>

              {/* Right: Scopus badge */}
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 font-semibold text-xs sm:text-sm rounded-full px-3 py-1.5 flex-shrink-0">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Scopus &amp; WoS
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
