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
    const res = await fetch('/api/user/fetchAUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: currentUserId })
    })
    const user = await res.json()

    // IF USER DATA FETCHING FAILED
    if (!user?.success) {
      console.log('error in context while trying to get user info', user.error)
      signOut()
      // PASS ERROR TO NOTIFICATION
      toast.error(user.eror)
    }
    else if(user?.success) {
      console.log(user.message)
      setUserData(user.data)
      console.log('data info got in context:', user.data)
    }
  }

  useEffect(() => {
    if (currentUserId && !userData) {
      console.log("fetching user data in context...")
      userInfo()
    }
  }, [currentUserId])

  return (
    <AuthContext.Provider value={{ accessToken, users, setUsers, currentUserId, setCurrentUserId, signIn, signOut, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

