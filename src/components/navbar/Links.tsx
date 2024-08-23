import React from 'react'
import Link from 'next/link'

const NavLinks = [ 
    {name: 'Sermons', link: '/sermon'},
    {name: 'Giving', link: '/giving'},
    {name: 'Contact Us', link: '/contact-us'},
    {name: 'About Us', link: '/about-us'}
]

const Links = () => {
  return (
    <div className='hidden lg:flex gap-2'>
      {NavLinks.map((navlink, i) => (
        <Link key={i} href={navlink.link} className='hover:text-blue-700'>{navlink.name}</Link>
      ))}
    </div>
  );
}

export default Links