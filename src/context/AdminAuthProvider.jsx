import React, { useCallback, useMemo, useState } from "react";
import { AdminAuthContext } from "./adminAuthContext";
import { adminAccounts } from "../data/adminData";

const STORAGE_KEY = "unib_admin_auth";

const readRole = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "operator" || stored === "admin" ? stored : null;
};

export default function AdminAuthProvider({ children }) {
  const [role, setRole] = useState(readRole);

  const login = useCallback((nextRole) => {
    if (nextRole !== "operator" && nextRole !== "admin") return;
    localStorage.setItem(STORAGE_KEY, nextRole);
    setRole(nextRole);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRole(null);
  }, []);

  const value = useMemo(
    () => ({
      role,
      user: role ? adminAccounts[role] : null,
      isAuthed: !!role,
      isOperator: role === "operator",
      isAdmin: role === "admin",
      login,
      logout,
    }),
    [role, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
