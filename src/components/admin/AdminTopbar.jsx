import React from "react";
import { useAdminAuth } from "../../context/adminAuthContext";

const SearchIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDown = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/** Shared admin top bar — global search plus the signed-in account and role. */
export default function AdminTopbar() {
  const { user } = useAdminAuth();
  if (!user) return null;
  return (
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
        <img src={user.photo} alt={user.name} />
        <div className="ad-topbar__meta">
          <p className="ad-topbar__name">{user.name}</p>
          <p className="ad-topbar__role">{user.role}</p>
        </div>
        <span className="ad-topbar__chev">
          <ChevronDown />
        </span>
      </div>
    </div>
  );
}
