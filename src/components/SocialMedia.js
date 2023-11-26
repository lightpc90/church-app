import React from 'react'
import Link from 'next/link'

import { TfiYoutube } from 'react-icons/tfi'
import { ImFacebook2 } from 'react-icons/im'
import { FaInstagramSquare } from 'react-icons/fa'




const SocialMedia = () => {
  return (
    <div className="flex flex-col gap-3 justify-center">
      <p className='text-center md:font-medium'>Connect With Us on Our Social Media</p>
      <div className="flex gap-10 md:gap-14 items-center justify-center">
        <Link
          href={
            "https://www.instagram.com/rccgbglakowe/?igshid=MzNlNGNkZWQ4Mg%3D%3D"
          }
          target="_blank"
        >
          <h2 className="shadow-md md:text-6xl bg-white hover:bg-gray-400 p-3 md:p-5 rounded-full">
            <FaInstagramSquare />
          </h2>
        </Link>
        <Link href={`https://www.youtube.com/@rccgbglakowe`} target="_blank">
          <h2 className="shadow-md md:text-6xl bg-white hover:bg-gray-400 p-3 md:p-5 rounded-full">
            <TfiYoutube />
          </h2>
        </Link>

        <Link
          href={"https://web.facebook.com/rccgbglakowepage/?_rdc=1&_rdr"}
          target="_blank"
        >
          <h2 className="shadow-md md:text-6xl bg-white p-3 md:p-5 hover:bg-gray-400 rounded-full">
            <ImFacebook2 />
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default SocialMedia