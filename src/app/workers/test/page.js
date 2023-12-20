import LocationRestrictedPage from '@/components/LocationRestrictedPage'
import React from 'react'
import Footer from '@/components/Footer'
const Page = () => {
  return (
      <div className='mt-80 min-h-screen'>
          <LocationRestrictedPage />
          <Footer/>
    </div>
  )
}

export default Page