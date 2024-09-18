import React from "react";
import TermsAndPrivacy from "@/components/UILayouts/TermsAndPrivacy";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen-dynamic px-5 pb-10 pt-[150px]">
      {/* CTA */}
      <div className="flex flex-col items-center w-full gap-6">
        <Link href={`/workers`} className="relative px-[58px] text-center flex">
          <div className="absolute top-0 left-0">
            <IoMdArrowRoundBack size={25} />
          </div>
          <p className="text-[#EE7575] font-bold">Log into account</p>
        </Link>
        <div className="w-full text-center">
          <h4 className="font-bold text-blue-950">Welcome Back!</h4>
          <p>Let&apos;s continue working</p>
        </div>
        <button className="py-2 px-10 bg-blue-950 text-white font-bold shadow-lg rounded-md z-30">
          Continue With Gmail
        </button>
      </div>
      {/* terms and privacy footer */}
      <div>
        <TermsAndPrivacy />
      </div>
    </div>
  );
};

export default Page;
