import React from 'react'
import Image from "next/image"
import emptyEvent from "../../../public/empty-event.png"

type EmptyEventPropsType={
    text?:string
}

const EmptyEvent: React.FC<EmptyEventPropsType> = ({text}) => {
  return (
    <div className="text-center">
      <p className="text-[#EE7575]">{text}</p>
      <Image src={emptyEvent} alt="" width={200} className="" />
    </div>
  );
}

export default EmptyEvent