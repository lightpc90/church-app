'use client'

import Link from 'next/link'
import {useState} from 'react'

const Menu = () => {
  return (
    <div className='font-bold relative'>
      <div>Menu</div>
      <div className='absolute bottom-0 right-0'>
        <Link href ='/'>How Can I Be Saved?</Link>
        <Link href ='/'>Prayer Request</Link>
        <Link href ='/'>Share Testimony</Link>
        <Link href ='/'>Workers</Link>
        <Link href ='/'>Natural Groups & Ministries</Link>
        <Link href ='/'>House Fellowship Centers</Link>
        <Link href ='/'>Events</Link>
        <Link href ='/'>About Us</Link>
      </div>
    </div>
  )
}

export default Menu