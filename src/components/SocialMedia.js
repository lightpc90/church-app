import React from 'react'

import { TfiYoutube } from 'react-icons/tfi'
import { ImFacebook2 } from 'react-icons/im'
import {FaInstagramSquare} from 'react-icons/fa'


const SocialMedia = () => {
  return (
    <div className='flex flex-col gap-3 justify-center'>
      <p>Connect With Us on Our Social Media</p>
      <div className="flex gap-5 md:gap-14 items-center justify-center">
        <h3 className="shadow-md md:text-6xl">
          <FaInstagramSquare />
        </h3>
        <h3 className="shadow-md md:text-6xl">
          <TfiYoutube />
        </h3>
        <h3 className="shadow-md md:text-6xl">
          <ImFacebook2 />
        </h3>
      </div>
    </div>
  );
}

export default SocialMedia