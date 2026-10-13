import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/adminAuthContext";
import { adminUser } from "../../data/adminData";

const DashboardIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ResearchersIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
  </svg>
);

const StudyCenterIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const PublicationsIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ProjectsIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const KeyIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const LogoutIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function AdminSidebar() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="ad-sidebar">
      <div className="ad-sidebar__brand">
        <img src="/logo-unib.png" alt="UNIB Logo" className="ad-sidebar__logo" />
        <span className="ad-brandtext">
          <span className="ad-brandtext__univ">UNIVERSITAS</span>
          <br />
          <span className="ad-brandtext__name">BENGKULU</span>
        </span>
      </div>

      <p className="ad-menu-label">Main Menu</p>

      <nav className="ad-menu">
        <NavLink to="/admin" end className="ad-menu__item">
          <DashboardIcon />
          Dashboard
        </NavLink>
        <NavLink to="/admin/researchers" className="ad-menu__item">
          <ResearchersIcon />
          Researchers
        </NavLink>
        <Link to="/study-center" className="ad-menu__item">
          <StudyCenterIcon />
          Study Center
        </Link>
        <Link to="/publications" className="ad-menu__item">
          <PublicationsIcon />
          Publications
        </Link>
        <button type="button" className="ad-menu__item">
          <ProjectsIcon />
          Projects
        </button>
        <button type="button" className="ad-menu__item">
          <KeyIcon />
          Change Password
        </button>
        <button type="button" className="ad-menu__item" onClick={handleLogout}>
          <LogoutIcon />
          Log Out
        </button>
      </nav>

      <div className="ad-sidebar__user">
        <div className="ad-userchip">
          <img src={adminUser.photo} alt={adminUser.name} />
          <div>
            <p className="ad-userchip__name">{adminUser.name}</p>
            <p className="ad-userchip__role">Logged in as Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
