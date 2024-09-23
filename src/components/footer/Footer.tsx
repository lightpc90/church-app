import React from "react";
import logo from "../../../public/rrcg-mylogo.png";
import Image from "next/image";
import { url } from "inspector";
import SocialMedia from "../social-media/SocialMedia";
import Button from "../customeUI/Button";
import Link from "next/link";
import { AboutUs } from "../data/Data";
import { QuickLinks } from "../data/Data";

const Footer = () => {
  const quicklinks = QuickLinks.filter((link) => link.category === "Quicklink");
  const workers = QuickLinks.filter((link) => link.category === "Worker");
  return (
    <footer className="mt-auto bg-blue-950 w-full text-white p-5 lg:p-10">
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
        <h2 className="font-bold text-lg mb-3">{AboutUs.title}</h2>
        {AboutUs.body}
      </div>

      <div className="flex gap-[30px] flex-wrap">
        {/* Vision */}
        <div className="lg:flex-1 ">
          <h2 className="font-bold text-lg mb-3">How Can I Be Saved?</h2>
          <p>
            Salvation is God&apos;s gift of grace to all who seek Him with a
            sincere heart. If you&apos;re wondering how to be saved, the Bible
            provides a clear path. First, acknowledge that we are all sinners in
            need of God&apos;s mercy (Romans 3:23). Turn away from sin, and
            repent—this means a heartfelt change of mind and direction (Acts
            3:19). Believe in Jesus Christ as the Son of God, who died for your
            sins and rose again to give you new life (John 3:16). Confess Him as
            your Lord and Savior, surrendering your life to His will (Romans
            10:9-10). Finally, trust that through His grace, you are forgiven,
            redeemed, and welcomed into God&apos;s family. Salvation is not
            earned by works, but received by faith in Christ alone (Ephesians
            2:8-9). Take this step today and experience the transformative love
            of God in your life!
          </p>
          <Link
            href="/"
            className="my-5 bg-blue-700 p-2 inline-block rounded-md hover:bg-white hover:text-blue-700"
          >
            Meet Our Pastor
          </Link>
        </div>

        {/* Contact Us */}
        <div className="lg:flex-1">
          <h2 className="font-bold text-lg mb-3">Contact Us</h2>
          <p>
            1-8 Redeem Way By Slot Bus Stop, Lakowe-Adeba, Km Lekki-Epe
            Express-Way Lakowe
          </p>
          <p>Phone: 234(0)812 3456 789, 234(0)812 6543 789</p>
          <p>Email: ctlbeautifulgate@gmail.com</p>
        </div>

        {/* Contact Us */}
        <div className="lg:flex-1">
          <h2 className="font-bold text-lg mb-3">Quick Links</h2>
          <div>
            {quicklinks.map((link, i) => (
              <Link
                href={link.link}
                key={i}
                className="my-2 hover:text
            blue-700"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <h2 className="font-bold text-lg mb-3">Wrokers</h2>
        </div>
      </div>

      {/* social media */}
      <div className="my-10">
        <SocialMedia />
      </div>
    </footer>
  );
};

export default Footer;
