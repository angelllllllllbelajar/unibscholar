import { createContext, useContext } from "react";

export const AdminDataContext = createContext(null);

export function useAdminData() {
  return useContext(AdminDataContext);
}
