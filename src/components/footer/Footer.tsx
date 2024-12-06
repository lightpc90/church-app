import React from "react";
import logo from "../../../public/rrcg-mylogo.png";
import Image from "next/image";
import SocialMedia from "../social-media/SocialMedia";
import Link from "next/link";
import { AboutUs } from "../data/Data";
import { QuickLinks } from "../data/Data";
import ContactInfo from "../contactInfo/ContactInfo";
// import ScrollLink from "./ScrollLink";

const Footer = () => {
  const quicklinks = QuickLinks.filter((link) => link.category === "Quicklink");
  const workerlinks = QuickLinks.filter((link) => link.category === "Worker");
  const naturalGroups = QuickLinks.filter(
    (link) => link.category === "Natural Groups"
  );
  const ministries = QuickLinks.filter(
    (link) => link.category === "Ministries"
  );
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

      <div className="flex gap-[30px] lg:gap-[60px] flex-wrap">
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
            href="/how-can-i-be-saved/#meet-pastor"
            className="my-5 bg-blue-700 p-2 inline-block rounded-md hover:bg-white hover:text-blue-700"
          >
            Meet Our Pastor
          </Link>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-bold py-3 text-lg">Contact</h3>
          <ContactInfo />
        </div>

        {/* Quicklinks */}
        <div className="lg:flex-1">
          <h2 className="font-bold text-lg mb-3 text-blue-300">Quick Links</h2>
          <div className="flex flex-col">
            {quicklinks.map((link, i) => (
              <Link
              // <ScrollLink
                href={link.link}
                key={i}
                className="my-1 hover:text
                blue-700"
              >
                {link.name}
                {/* </ScrollLink> */}
              </Link>
            ))}
          </div>
          <h2 className="font-bold text-lg my-3 text-blue-300">
            Natural Groups
          </h2>
          <div className="flex flex-col">
            {naturalGroups.map((group, i) => (
              <Link key={i} href={group.link}>
                {group.name}
              </Link>
            ))}
          </div>
          <h2 className="font-bold text-lg my-3 text-blue-300">Ministries</h2>
          <div className="flex flex-col">
            {ministries.map((minstry, i) => (
              <Link key={i} href={minstry.link}>
                {minstry.name}
              </Link>
            ))}
          </div>
          <h2 className="font-bold text-lg my-3 text-blue-300">Workers</h2>
          <div className="flex flex-col">
            {workerlinks.map((workerlink, i) => (
              <Link
                // <ScrollLink
                key={i}
                href={workerlink.link}
              >
                {workerlink.name}
                {/* </ScrollLink> */}
              </Link>
            ))}
          </div>
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
