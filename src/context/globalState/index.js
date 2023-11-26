"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(
    typeof window !== "undefined" ? localStorage.getItem("currentUserId") : null
  );
  const [accessToken, setAccessToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
  );
  const [users, setUsers] = useState(null);

  const signIn = (token, userId) => {
    localStorage.setItem('accessToken', token)
    localStorage.setItem("currentUserId", userId);
    setAccessToken(token)
    setCurrentUserId(userId)
  }

  const signOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem("currentUserId");
    setAccessToken(null)
    setCurrentUserId(null);
    router.push('/')
  }

  const userInfo = async () => {
    const res = await fetch('api/fetchAUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: currentUserId })
    })
    const user = await res.json()

    // IF USER DATA FETCHING FAILED
    if (!user.success) {
      signOut()
      // PASS ERROR TO NOTIFICATION
      toast.error(user.eror)
    }
    else {
      setUserData(user.data._doc)
    }
  }

  useEffect(() => {
    if (currentUserId && !userData) {
      userInfo()
    }
  }, [currentUserId])

  return (
    <AuthContext.Provider value={{ accessToken, users, setUsers, currentUserId, setCurrentUserId, signIn, signOut, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

