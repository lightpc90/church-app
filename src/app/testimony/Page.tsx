import Header from '@/components/UILayouts/Header'
import React from 'react'
import TestimonyForm from '@/components/UILayouts/TestimonyForm'

const Page = () => {
  return (
    <div>
        <Header imageUrl='' title=''/>
        {/* content */}
        <div>
            <h3></h3>
        </div>
        {/* Testimony Form */}
        <div>
            <TestimonyForm/>
        </div>
    </div>
  )
}

export default Page