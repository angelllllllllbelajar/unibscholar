import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/adminAuthContext";

/** Blocks unauthenticated visitors from admin-only routes. */
export default function RequireAdmin({ children }) {
  const { isAuthed } = useAdminAuth();
  if (!isAuthed) return <Navigate to="/admin/login" replace />;
  return children;
}
