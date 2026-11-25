"use client";

import { createContext, useContext, type ReactNode } from "react";
import { can, type Action, type Resource, type Role } from "@/lib/roles";

// Lets client components hide buttons the signed-in role can't use. The API re-checks every action.
const StaffContext = createContext<Role | null>(null);

export function StaffProvider({ role, children }: { role: Role; children: ReactNode }) {
  return <StaffContext.Provider value={role}>{children}</StaffContext.Provider>;
}

export function useCan() {
  const role = useContext(StaffContext);
  return (action: Action, resource: Resource | null) => !!resource && can(role, action, resource);
}
