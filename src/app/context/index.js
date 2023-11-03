'use client'

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [users, setUsers] = useState(null);

  return (
    <GlobalContext.Provider value={{users, setUsers}}>{children}</GlobalContext.Provider>
  );
}
