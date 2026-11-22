import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AdminDataContext } from "./adminDataContext";
import { managedPublications } from "../data/adminPublicationsData";
import { managedProjects } from "../data/adminProjectsData";
import { managedIpr } from "../data/adminIprData";
import { seedApprovalRequests, seedApprovalResolved } from "../data/adminApprovalData";

const STORE_KEY = "unib_admin_store_v2";

const seed = () => ({
  publications: managedPublications,
  projects: managedProjects,
  ipr: managedIpr,
  requests: seedApprovalRequests(),
  resolved: seedApprovalResolved(),
});

const load = () => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw);
    const base = seed();
    return {
      publications: parsed.publications ?? base.publications,
      projects: parsed.projects ?? base.projects,
      ipr: parsed.ipr ?? base.ipr,
      requests: parsed.requests ?? base.requests,
      resolved: parsed.resolved ?? base.resolved,
    };
  } catch {
    return seed();
  }
};

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function AdminDataProvider({ children }) {
  const [store, setStore] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }, [store]);

  /** Operator action: queue an add/edit/delete for admin approval. */
  const submit = useCallback(
    (entity, action, { targetId = null, payload = null, label = "", by = "" } = {}) => {
      setStore((prev) => ({
        ...prev,
        requests: [
          ...prev.requests,
          { id: makeId(), entity, action, targetId, payload, label, by, createdAt: Date.now() },
        ],
      }));
    },
    []
  );

  /** Admin action: apply the queued change to the committed records. */
  const approve = useCallback((requestId) => {
    setStore((prev) => {
      const req = prev.requests.find((r) => r.id === requestId);
      if (!req) return prev;
      const decided = { ...req, decision: "approved", decidedAt: Date.now() };
      if (req.mock) {
        return {
          ...prev,
          requests: prev.requests.filter((r) => r.id !== requestId),
          resolved: [decided, ...prev.resolved],
        };
      }
      const list = prev[req.entity] ?? [];
      let next;
      if (req.action === "add") {
        next = [{ id: Date.now(), ...req.payload }, ...list];
      } else if (req.action === "edit") {
        next = list.map((row) => (row.id === req.targetId ? { ...row, ...req.payload } : row));
      } else {
        next = list.filter((row) => row.id !== req.targetId);
      }
      return {
        ...prev,
        [req.entity]: next,
        requests: prev.requests.filter((r) => r.id !== requestId),
        resolved: [decided, ...prev.resolved],
      };
    });
  }, []);

  /** Admin action: discard the queued change. */
  const reject = useCallback((requestId) => {
    setStore((prev) => {
      const req = prev.requests.find((r) => r.id === requestId);
      if (!req) return prev;
      return {
        ...prev,
        requests: prev.requests.filter((r) => r.id !== requestId),
        resolved: [{ ...req, decision: "rejected", decidedAt: Date.now() }, ...prev.resolved],
      };
    });
  }, []);

  const resetStore = useCallback(() => setStore(seed()), []);

  const pendingFor = useCallback(
    (entity) => store.requests.filter((r) => r.entity === entity),
    [store.requests]
  );

  const value = useMemo(
    () => ({
      records: {
        publications: store.publications,
        projects: store.projects,
        ipr: store.ipr,
      },
      requests: store.requests,
      resolved: store.resolved,
      pendingFor,
      submit,
      approve,
      reject,
      resetStore,
    }),
    [store, pendingFor, submit, approve, reject, resetStore]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}
