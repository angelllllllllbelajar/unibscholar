import React, { useCallback, useState } from "react";
import { AdminAuthContext } from "./adminAuthContext";

const STORAGE_KEY = "unib_admin_auth";

export default function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(STORAGE_KEY) === "1");

  const login = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setIsAdmin(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
