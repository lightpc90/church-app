import React from "react";
import logo from "../../../public/rrcg-mylogo.png";
import Image from "next/image";
import { url } from "inspector";
import SocialMedia from "../social-media/SocialMedia";

const Footer = () => {
  return (
    <div className="mt-auto bg-blue-950 w-full text-white p-5 lg:p-10">
      {/* Church Name*/}
      <div className="lg:w-[30%] mb-[90px] flex items-center gap-2">
        <div
          className="w-[60px] h-[60px] lg:w-[120px] lg:h-[120px]
         rounded-full bg-cover bg-center bg- relative overflow-hidden"
        >
          <Image
            src={logo.src}
            placeholder="blur"
            blurDataURL={logo.blurDataURL}
            width={1000}
            height={1000}
            priority
            alt="logo"
            className="absolute bg-cover object-cover"
          />
        </div>
        <h2 className="font-bold lg:text-lg">RCCG BEAUTIFUL GATE, LAKOWE</h2>
      </div>
      {/* About Us */}
      <div className="lg:w-[30%] mb-10">
        <h2 className="font-bold text-lg mb-3">About Us</h2>
        RCCG Beautiful Gate Lakowe, we are a branch of Redeemed Christian Church
        of God, Lagos Province 114, Zone 5, located at Lakowe. We&apos;re a
        diverse and welcoming community devoted to faith, fellowship, and love.
        Our vibrant worship services, engaging programs, and outreach
        initiatives are designed to nurture spiritual growth and foster
        connections with God and fellow believers. With a commitment to
        inclusivity, we embrace everyone, encouraging a deeper relationship with
        God and a sense of belonging. Join us on this journey of faith, love,
        and grace.
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
            1-8 Redeem Way By Slot Bus Stop, Lakowe-Adeba, Km Lekki-Epe
            Express-Way Lakowe
          </p>
          <p>Phone: 234(0)812 3456 789, 234(0)812 6543 789</p>
          <p>Email: rccgbeautifulgate@gmail.com</p>
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
      <div className="my-10">
        <SocialMedia />
      </div>
    </div>
  );
};

export default Footer;
