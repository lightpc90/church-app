'use client'

import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import { usePathname } from 'next/navigation'

const ConditionalLayout = ({children}:{children: React.ReactNode}) => {
    const noNavAndFooterRoutes = ["/admin", "/worker"];
    const pathname = usePathname();
    console.log("pathname: ", pathname);
    const isNoNavAndFooterRoute = !noNavAndFooterRoutes.includes(pathname);
  return (
    <div>
        {isNoNavAndFooterRoute &&  <Navbar/>}
        {children}
       {isNoNavAndFooterRoute && <Footer/>}
    </div>
  )
}

export default ConditionalLayout