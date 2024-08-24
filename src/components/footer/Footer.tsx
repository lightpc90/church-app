import React from "react";
import logo from "../../../public/rrcg-mylogo.png";
import Image from "next/image";
import { url } from "inspector";

const Footer = () => {
  return (
    <div className="mt-auto bg-blue-950 w-full text-white p-5 lg:p-10">
      {/* Church Name*/}
      <div className="lg:w-[30%] mb-[90px] flex items-center gap-2">
        <div
          className="w-[60px] h-[60px] lg:w-[120px] lg:h-[120px]
         rounded-full bg-cover bg-center bg- relative overflow-hidden"
        >
          <Image src={logo.src} layout="fill" objectFit="cover" placeholder="blur" blurDataURL={logo.blurDataURL} priority alt='logo' className="absolute" />
        </div>
        <h2 className="font-bold lg:text-lg">RCCG BEAUTIFUL GATE, LAKOWE</h2>
      </div>
      {/* About Us */}
      <div className="lg:w-[30%] mb-10">
        <h2 className="font-bold text-lg mb-3">About Us</h2>
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, totam
          esse! Distinctio eos vero fuga commodi, magnam temporibus perferendis
          corporis illum nam neque reprehenderit est consectetur rerum quas
          error libero!{" "}
        </p>
        ipsum dolor sit amet consectetur adipisicing elit. Sint, totam esse!
        Distinctio eos vero fuga commodi, magnam temporibus perferendis corporis
        illum nam neque reprehenderit est
      </div>

      <div className="flex gap-[30px] flex-wrap">
        {/* Vision */}
        <div className="lg:flex-1 ">
          <h2 className="font-bold text-lg mb-3">Vision</h2>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, totam
            esse! Distinctio eos vero fuga commodi, magnam temporibus
            perferendis corporis illum nam neque reprehenderit est consectetur
            rerum quas error libero!{" "}
          </p>
          <p>
            {" "}
            ipsum dolor sit amet consectetur adipisicing elit. Sint, totam esse!
            Distinctio eos vero fuga commodi, magnam temporibus perferendis
            corporis illum nam neque reprehenderit est ipsum dolor sit amet
            consectetur adipisicing elit. Sint, totam esse! Distinctio eos vero
            fuga commodi, magnam temporibus perferendis corporis illum nam neque
            reprehenderit est
          </p>
        </div>

        {/* Contact Us */}
        <div className="lg:flex-1">
          <h2 className="font-bold text-lg mb-3">Contact Us</h2>
          <p>
            ipsum dolor sit amet consectetur adipisicing elit. Sint, totam esse!
            Distinctio eos vero fuga commodi, magnam temporibus perferendis
            corporis illum nam neque reprehenderit est ipsum dolor sit amet
            consectetur adipisicing elit. Sint, totam esse! Distinctio eos vero
            fuga commodi, magnam temporibus perferendis corporis illum nam neque
            reprehenderit est
          </p>
        </div>

        {/* Contact Us */}
        <div className="lg:flex-1">
          <h2 className="font-bold text-lg mb-3">Quick Links</h2>
          <p>
            ipsum dolor sit amet consectetur adipisicing elit. Sint, totam esse!
            Distinctio eos vero fuga commodi, magnam temporibus perferendis
            corporis illum nam neque reprehenderit est ipsum dolor sit amet
            consectetur adipisicing elit. Sint, totam esse! Distinctio eos vero
            fuga commodi, magnam temporibus perferendis corporis illum nam neque
            reprehenderit est
          </p>
        </div>
      </div>

      {/* social media */}
      <div className="lg:w-[30%] my-10 flex items-center gap-2 ">
        <div className="bg-white h-[30px] w-[30px] rounded-full "></div>
        <div className="bg-white h-[30px] w-[30px] rounded-full "></div>
        <div className="bg-white h-[30px] w-[30px] rounded-full "></div>
        <span className="font-bold ">rccgbglakowe</span>
      </div>
    </div>
  );
};

export default Footer;
