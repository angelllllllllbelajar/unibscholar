import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/adminAuthContext";

/** Blocks non-admin visitors from admin-only routes. */
export default function RequireAdmin({ children }) {
  const { isAdmin } = useAdminAuth();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}
