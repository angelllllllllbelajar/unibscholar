import React from "react";
import Footer from "../components/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
import PendingTable from "../components/admin/PendingTable";
import { adminStats, adminUser } from "../data/adminData";
import "../styles/pages/admin-dashboard.css";

const SearchIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDown = () => (
  <svg className="ad-topbar__chev" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const DownloadIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ResearchersIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
  </svg>
);

const BookIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const RocketIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function AdminDashboardPage() {
  return (
    <div className="ad-root">
      <div className="ad-shell">
        <AdminSidebar />

        <div className="ad-main">
          {/* Top bar */}
          <div className="ad-topbar">
            <div className="ad-topbar__search">
              <div className="ad-searchfield">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search researchers, study center, publications and more..."
                />
              </div>
              <button type="button" className="ad-searchbtn">Search</button>
            </div>

            <div className="ad-topbar__user">
              <img src={adminUser.photo} alt={adminUser.name} />
              <div className="ad-topbar__meta">
                <p className="ad-topbar__name">{adminUser.name}</p>
                <p className="ad-topbar__role">{adminUser.role}</p>
              </div>
              <ChevronDown />
            </div>
          </div>

          {/* Content */}
          <div className="ad-content">
            <div className="ad-head">
              <div>
                <h1 className="ad-head__title">Admin Dashboard</h1>
                <p className="ad-head__sub">
                  Overview of institutional research outputs, verification queues, and system activity.
                </p>
              </div>
              <button type="button" className="ad-export">
                <DownloadIcon />
                Export Report (XLS)
              </button>
            </div>

            <div className="ad-stats">
              <div className="ad-stat">
                <p className="ad-stat__label">Total Active Researchers</p>
                <span className="ad-stat__icon ad-stat__icon--blue">
                  <ResearchersIcon />
                </span>
                <p className="ad-stat__value">{adminStats.researchers.toLocaleString()}</p>
              </div>

              <div className="ad-stat">
                <p className="ad-stat__label">Publications (2026)</p>
                <span className="ad-stat__icon ad-stat__icon--green">
                  <BookIcon />
                </span>
                <p className="ad-stat__value">{adminStats.publications}</p>
              </div>

              <div className="ad-stat">
                <p className="ad-stat__label">Active Research Grants</p>
                <span className="ad-stat__icon ad-stat__icon--amber">
                  <RocketIcon />
                </span>
                <p className="ad-stat__value">{adminStats.grants}</p>
                <div className="ad-stat__foot">
                  <span className="ad-stat__footlabel">Allocated Funds</span>
                  <span className="ad-stat__footvalue">{adminStats.funds}</span>
                </div>
              </div>
            </div>

            <PendingTable />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
