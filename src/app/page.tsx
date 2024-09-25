import Image from "next/image";

import churchSide from "../../public/Ch1.jpg";
import churchFront from "../../public/churchFront1.png";
import banner1 from "../../public/nature.jpg";
import banner2 from "../../public/7.jpg";
import banner3 from "../../public/pastorAndfamily.jpg";
import banner4 from "../../public/fullChoir.jpg";
import banner5 from "../../public/randomChurchPic.jpg";
import banner6 from "../../public/randomChurchPic2.jpg";

import { HomeHeaderCarousel } from "@/components/carousels/HomeHeaderCarousel";
import { MonthlyProgramsCarousel } from "@/components/carousels/MonthlyProgramsCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { FaCross } from "react-icons/fa6";
import { TfiVideoClapper } from "react-icons/tfi";
import { LiaPrayingHandsSolid } from "react-icons/lia";
import { GrAnnounce } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BsCollectionPlayFill } from "react-icons/bs";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";

import Link from "next/link";
import { ChurchWelcomeParagraph } from "../components/data/Data";
import WeeklyServices from "../components/weeklyService/WeeklyServices";
import classNames from "classnames";
import MonthlyServices from "@/components/monthlyServices/MonthlyServices";
import SocialMedia from "@/components/social-media/SocialMedia";
import LiveStream from "@/components/livestream/LiveStream";
import LiveProgram from "@/components/livestream/LiveProgram";
import MapComponent from "@/components/map/GoogleMap";
import InstagramFeed from "@/components/instagramFeed/InstagramFeed";

import HomeHeaderTitle from "@/components/home_header_title/HomeHeaderTitle";

import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import PastorImage from "../../public/pastor.png";

const Items = [
  churchSide.src,
  churchFront.src,
  banner2.src,
  banner3.src,
  banner4.src,
  banner5.src,
  banner6.src,
];
const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

export default function Home() {
  return (
    <main className="flex flex-col items-center w-[100vw] ">
      {/* Banner */}
      <section
        className="bg-gradient-to-tr from-purple-400 via-blue-400 
      to-purple-800 flex items-center justify-center w-full 
      relative overflow-hidden"
      >
        <HomeHeaderCarousel slides={Items} options={OPTIONS} />
        <div
          className="flex items-end p-5 lg:p-20 bg-gradient-to-t from-zinc-800 via-slate-800 
        opacity-90 absolute top-0 left-0 w-full h-full z-30"
        >
         <HomeHeaderTitle/>
        </div>
      </section>
      <div className="bg-slate-950 text-white opacity-90 w-[100%] px-5 lg:px-10 py-1 flex flex-col gap-1 items-end">
        <div className="flex gap-2 items-center">
          <FaSquarePhone />
          <span>08112345678</span>
        </div>
        <div className="flex gap-2 items-center">
          <MdEmail />
          <span>ctlbeautifulgate@gmail.com</span>
        </div>
      </div>

      {/* contents */}
      <div className="flex flex-col lg:p-[50px] items-center">
        {/* welcome */}
        <div className="flex flex-wrap gap-4 lg:gap-10 w-[100vw] overflow-hidden p-[20px] items-center justify-center my-10 ">
          {/* paragraph */}
          <div className="w-full lg:w-[30%]">
            <div className="text-center">
              <h1 className="text-2xl text-center font-bold ">
                {ChurchWelcomeParagraph.title}
              </h1>
              <h4 className="font-bold text-slate-700">
                {ChurchWelcomeParagraph.description}
              </h4>
            </div>
            <p className="text-justify ">{ChurchWelcomeParagraph.paragraph}</p>
          </div>
          {/* welcome image */}
          <div className="w-full lg:w-[40%] rounded-md overflow-hidden shadow-md h-[400px] bg-slate-300">
            {/* Pastor Picture coming here */}
            <Image
              src={PastorImage}
              alt="pastor picture"
              loading="eager"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* CTA Cards */}
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            What&apos;s Next?
          </h1>
          <div className="flex flex-wrap gap-5 w-full lg:w-[1000px] items-center justify-center">
            {/* card 1 */}
            <div className="flex flex-col justify-evenly w-[300px] h-[310px] bg-rose-800 rounded-2xl shadow-lg p-4 text-white">
              {/* title */}
              <div className="flex gap-4 text-2xl items-center">
                {/* title icon */}
                <span>
                  <FaCross size={70} />
                </span>
                <h2 className="font-bold">How Can I Be Saved?</h2>
              </div>
              {/* content */}
              <p className="font-bold text-zinc-400">
                The most important question you will ever ask that will affect
                you for eternity
              </p>
              {/* call to action */}
              <Link href={`/how-can-i-be-saved`} className="border py-2 px-4 rounded-full w-fit ">
                Learn More
              </Link>
            </div>

            {/* card 2 */}
            <div className="flex flex-col justify-evenly w-[300px] h-[310px] bg-slate-900 rounded-2xl shadow-lg p-4 text-white">
              {/* title */}
              <div className="flex gap-4 text-2xl items-center">
                {/* title icon */}
                <span>
                  <TfiVideoClapper size={70} />
                </span>
                <h2 className="font-bold">Our Online Church and Media</h2>
              </div>
              {/* content */}
              <p className="font-bold text-zinc-400">
                Hear God&apos;s word delivered by our pastors in our sermon
                archives
              </p>
              {/* call to action */}
              <Link href={`online-church`} className="border py-2 px-4 rounded-full w-fit ">
                See Messages
              </Link>
            </div>

            {/* card 3 */}
            <div className="flex flex-col justify-evenly w-[300px] h-[310px] bg-green-900 rounded-2xl shadow-lg p-4 text-white">
              {/* title */}
              <div className="flex gap-4 text-2xl items-center">
                {/* title icon */}
                <span>
                  <LiaPrayingHandsSolid size={70} />
                </span>
                <h2 className="font-bold">Submit a Prayer Request</h2>
              </div>
              {/* content */}
              <p className="font-bold text-zinc-400">
                Need Prayer? Submit your requests to pastor to pray with you
              </p>
              {/* call to action */}
              <Link href={`/prayer-request`} className="border py-2 px-4 rounded-full w-fit ">
                Request Prayer
              </Link>
            </div>

            {/* card 4 */}
            <div className="flex flex-col justify-evenly w-[300px] h-[310px] bg-purple-900 rounded-2xl shadow-lg p-4 text-white">
              {/* title */}
              <div className="flex gap-4 text-2xl items-center">
                {/* title icon */}
                <span>
                  <GrAnnounce size={70} />
                </span>
                <h2 className="font-bold">Share Your Testimonies</h2>
              </div>
              {/* content */}
              <p className="font-bold text-zinc-400">
                Share with us what the Lord has done for you
              </p>
              {/* call to action */}
              <Link href={`/testimony`} className="border py-2 px-4 rounded-full w-fit ">
                Share Your Testimonies
              </Link>
            </div>

            {/* card 5 */}
            <div
              className="flex flex-col justify-evenly w-[300px] h-[310px] 
          bg-sky-950 rounded-2xl shadow-lg p-4 text-white"
            >
              {/* title */}
              <div className="flex gap-4 text-2xl items-center">
                {/* title icon */}
                <span>
                  <FaMoneyBillTransfer size={70} />
                </span>
                <h2 className="font-bold">Giving & Partnership</h2>
              </div>
              {/* content */}
              <p className="font-bold text-zinc-400 text-sm">
                &quot;Give, and it will be given to you. A good measure, pressed
                down, shaken together and running over, will be poured into your
                lap. For with the measure you use, it will be measured to
                you.&quot; Luke 6:38
              </p>
              {/* call to action */}
              <Link href={`/online-giving`} className="border py-2 px-4 rounded-full w-fit ">
                Give Generously
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Services */}
      <div className="flex flex-wrap lg:items-center lg:justify-center">
        {/* Our Weekly Services */}
        <div className="w-full bg-[#B9C4D4] lg:flex-1 mt-[20px] lg:mt-[0px] lg:h-[800px] relative overflow-hidden">
          <WeeklyServices />
          <div className="w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] z-10 rounded-full bg-[#9CBACA] absolute top-[-90px] lg:top-[-150px] left-[-50%] lg:left-[-30%] "></div>
        </div>
        {/* Our Monthy Services */}
        <div className="bg-[#02271C] w-full lg:h-[800px] lg:flex-1 relative overflow-hidden lg:mt-[200px]">
          <div className="w-[600px] h-[600px] rounded-full bg-[#022C13] absolute top-[-90px] right-[-80%] z-0 "></div>
          <MonthlyServices />
        </div>
      </div>

      {/* Church live and media */}
      <div className="bg-[#B1A4A4] py-16 w-full flex flex-col gap-7 items-center relative overflow-hidden ">
        <div className="w-[400px] h-[400px] rounded-full bg-[#A49999] absolute bottom-[-90px] right-[-50%] z-0 "></div>
        <h2 className="font-bold text-xl z-10">
          Our Live Service and Messages 
        </h2>
        <div className="w-full lg:w-[60%] text-start pl-5 lg:p-0 z-10">
          <p className="text-[#A11E1E] font-bold">Follow us on:</p>
          <SocialMedia />
        </div>
        {/* Watch us live */}
        <div className="text-zinc-950 lg:text-2xl font-bold flex flex-col items-center z-10">
          <h2>Watch Us Live</h2>
          <div className="w-[90vw] min-h-[250px] lg:w-[60vw] lg:h-[500px] bg-slate-800">
            {/* <LiveProgram /> */}
          </div>
        </div>
        {/* Explore media */}
        <Link href={`/online-church/#media`} className="text-[#A11E1E] font-bold pl-5 pr-10 flex gap-4 items-center lg:justify-self-start z-10 lg:text-3xl">
          <span>
            <BsCollectionPlayFill size={30} />
          </span>
          <span>
            <p>Explore Our Video and Audio Messages</p>
            <div className="bg-[#A11E1E] w-[25%] h-[4px]"></div>
          </span>
        </Link>
      </div>

      {/* Instagram Posts */}
      <div className="w-full flex flex-col py-6 gap-3 items-center bg-[#D9D9D9]">
        <div className="w-full lg:w-[60%] px-5 text-start text-[#A11E1E] font-bold text-sm lg:text-xl ">
          <p>Our Recent Instagram Posts</p>
          <Link href={`/`} className="flex gap-2 items-center">
            <span>View More</span> <TbSquareRoundedArrowRightFilled />
          </Link>
        </div>
        {/* Post Container */}
        <div className="w-[300px] lg:w-[60%] min-h-[300px] bg-slate-100">
          <div className="w-[100%]">{/* <InstagramFeed /> */}</div>
        </div>
      </div>

      {/* locate us */}
      <div className="w-[100vw] py-6 gap-3 bg-[#FFF2F2] flex flex-col items-center font-bold">
        <div className="text-center">
          <p className="text-slate-400 text-sm">Visit Us</p>
          <p>Get Direction on Map</p>
        </div>
        {/* Google Map */}
        <div className="h-[600px] lg:h-[800px] lg:w-[60%] bg-slate-700 ">
          <MapComponent />
        </div>
      </div>
    </main>
  );
}
