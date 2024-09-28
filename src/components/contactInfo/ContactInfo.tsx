import React from 'react'
import { FaLocationArrow, FaSquarePhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-3 lg:h-[20%] font-medium text-sm">
      <div className="flex gap-2 items-center">
        <div>
          <FaLocationArrow size={25} />
        </div>
        <p>1-8 Redeemed Close, Km 34 Lekki-Epe Express-Way, Lakowe, Lagos.</p>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <FaSquarePhone size={25} />
        </div>
        <p>234(0)812 3456 789, 234(0)812 6543 789</p>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <MdEmail size={25} />
        </div>
        <p>ctlbeautifulgate@gmail.com</p>
      </div>
    </div>
  );
}

export default ContactInfo