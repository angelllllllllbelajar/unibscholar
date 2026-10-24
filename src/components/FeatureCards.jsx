import React from "react";
import { Link } from "react-router-dom";

// Icons as inline SVG components
const ResearchersIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87v-2a4 4 0 00-2-3.46M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 13v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
  </svg>
);

const PublicationsIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StudyCenterIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.096.038a.75.75 0 01-.448 1.417l-.096-.038a3.75 3.75 0 01-2.259-3.434V4.5m4.5-1.396A24.308 24.308 0 0119.5 3m0 0v8.25M5 14.5l.673 1.41a2.25 2.25 0 002.25 1.34h7.854a2.25 2.25 0 002.228-1.949L19.5 11.25" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 21h18" />
  </svg>
);

const ProjectsIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const features = [
  {
    icon: <ResearchersIcon />,
    title: "Researchers",
    description: "Explore UNIB researchers, their expertise, and networks",
    to: "/researchers",
  },
  {
    icon: <PublicationsIcon />,
    title: "Publications",
    description: "Search journals, article, conference, paper, and more",
    to: "/publications",
  },
  {
    icon: <StudyCenterIcon />,
    title: "Study Center",
    description: "Browse faculties, schools, research centers, and groups.",
    to: "/study-center",
  },
  {
    icon: <ProjectsIcon />,
    title: "Projects",
    description: "Discover research projects, sponsor, and outcomes.",
    to: "/projects",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-gray-50 pb-16 pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.to}
              className="group flex items-center gap-4 bg-navy hover:bg-navy-dark rounded-2xl px-5 py-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Icon Box */}
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                {feature.icon}
              </div>
              {/* Text */}
              <div className="min-w-0">
                <h3 className="text-white font-bold text-base sm:text-lg leading-tight mb-1 truncate">
                  {feature.title}
                </h3>
                <p className="text-blue-200 text-xs sm:text-sm leading-snug line-clamp-2">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
