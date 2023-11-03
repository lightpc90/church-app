'use client'

import { sessionProvider } from 'next-auth/react'

const NextAuthProvider = ({ children }) => {
    return <sessionProvider>{ children}</sessionProvider>
}

export default NextAuthProvider