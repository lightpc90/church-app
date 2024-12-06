'use client'

import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import { usePathname } from 'next/navigation'

const ConditionalLayout = ({children}:{children: React.ReactNode}) => {
    const noNavAndFooterRoutes = [
      "/admin", "/workers/to", "/workers" ,
      "/workers/create-account", "/workers/login"
    ];
    const pathname = usePathname();
    console.log("pathname: ", pathname);
    const isNavAndFooterRoute = !noNavAndFooterRoutes.includes(pathname);
  return (
    <div className=''>
        {isNavAndFooterRoute &&  <Navbar/>}
        {children}
       {isNavAndFooterRoute && <Footer/>}
    </div>
  )
}

export default ConditionalLayout