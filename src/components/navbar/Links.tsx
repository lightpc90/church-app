import React from 'react'
import Link from 'next/link'

const NavLinks = [ 
    {name: 'Home', link: '/'},
    {name: 'Online Church', link: '/online-church'},
    {name: 'Contact Us', link: '/contact-us'},
    {name: 'Giving & Partnership', link: '/about-us'},
]

const Links = () => {
  return (
    <div className='hidden lg:flex gap-5'>
      {NavLinks.map((navlink, i) => (
        <Link key={i} href={navlink.link} className='font-bold hover:text-rose-600'>{navlink.name}</Link>
      ))}
    </div>
  );
}

export default Links