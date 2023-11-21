"use client";

import jwt from 'jsonwebtoken'
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [accessToken, setAccessToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
  );
  const [users, setUsers] = useState(null);

  const signIn = (token) => {
    localStorage.setItem('accessToken', token)
    setAccessToken(token)
  }

  const signOut = () => {
    localStorage.removeItem('accessToken')
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider value={{ accessToken, users, setUsers, currentUser, setCurrentUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

