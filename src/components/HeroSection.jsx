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
              <span className="text-scholar-blue">Scholar</span>
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
            <div className="relative rounded-2xl overflow-hidden shadow-x aspect-[4/3]">
              {/* Aerial photo placeholder — replace src with real image */}
              <img
                src="/rektorat-unib.jpg"
                alt="Gedung Rektorat Universitas Bengkulu"
                className="w-full h-full object-cover object-top rounded-2xl"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.classList.add("bg-gradient-to-br", "from-slate-200", "to-slate-400");
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/10 to-transparent pointer-events-none rounded-2xl"></div>
            </div>

            {/* Floating Card di Bagian Bawah */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 text-white p-2.5 rounded-lg">
                  <div className="bg-[#0b1b3d] text-white p-2.5 rounded-lg flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" 
                      />
                    </svg>
                </div>

                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">151,727+ Indexed Outputs</h4>
                  <p className="text-xs text-slate-500">Direct DOI allocation & ORCID sync</p>
                </div>
              </div>

              <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-200 font-medium flex items-center gap-1.5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Scopus & WoS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
