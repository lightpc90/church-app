import Image from "next/image";
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

const Items = [
  banner1.src,
  banner2.src,
  banner3.src,
  banner4.src,
  banner5.src,
  banner6.src,
];
const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

export default function Home() {
  return (
    <main className="flex flex-col items-center ">
      {/* Banner */}
      <section
        className="bg-gradient-to-tr from-purple-400 via-blue-400 
      to-purple-800 flex items-center justify-center 
      relative overflow-hidden"
      >
        <HomeHeaderCarousel slides={Items} options={OPTIONS} />
        <div
          className="flex items-end p-5 lg:p-20 bg-gradient-to-t from-zinc-800 via-slate-800 
        opacity-90 absolute top-0 left-0 w-[100vw] h-full z-30"
        >
          <div className="flex flex-col text-white gap-1 lg:gap-5 font-bold w-10/12 lg:w-5/12 pt-[30px]">
            <h2 className=" lg:text-[50px]  ">
              Experience God&apos;s Love through worship and fellowship at our
              Church.
            </h2>
            <p className="lg:text-2xl text-zinc-400">
              Experience a welcoming community and uplifting sermons at our
              church. All are welcome. Visit us and reach out with any question
            </p>
            {/* buttons */}
            <div className="flex flex-wrap max-w-[400px] lg:max-w-[700px] gap-2  lg:gap-4 mt-5">
              <button className="bg-rose-800 w-[150px] lg:w-fit  p-2 lg:py-3 lg:px-4 rounded-md">
                Connect with Us
              </button>
              <button className="border w-[150px] lg:w-fit p-2 lg:py-3  lg:px-4 rounded-md">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* contents */}
      <div className="flex flex-col lg:p-[50px] items-center">
        {/* welcome */}
        <div className="flex flex-wrap gap-4 p-[20px] items-center justify-center my-10">
          <div className="w-full lg:w-[30%]">
            <div className="text-center">
              <h1 className="text-2xl text-center font-bold ">
                {ChurchWelcomeParagraph.title}
              </h1>
              <h4 className="font-bold text-slate-400">
                {ChurchWelcomeParagraph.description}
              </h4>
            </div>
            <p className="text-justify ">{ChurchWelcomeParagraph.paragraph}</p>
          </div>

          <div className="w-full lg:w-[30%] h-[400px] bg-slate-300">
            {/* Pastor Picture coming here */}
            hhhhh
          </div>
        </div>

        {/* CTA Cards */}
        <div className="flex flex-col gap-4 w-full lg:w-[70%] justify-center items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            What&apos;s Next?
          </h1>
          <div className="flex flex-wrap gap-5 w-full lg:w-[90%] items-center justify-center">
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
              <button className="border py-2 px-4 rounded-full w-fit ">
                Learn More
              </button>
            </div>

            {/* card 2 */}
            <div className="flex flex-col justify-evenly w-[300px] h-[310px] bg-slate-900 rounded-2xl shadow-lg p-4 text-white">
              {/* title */}
              <div className="flex gap-4 text-2xl items-center">
                {/* title icon */}
                <span>
                  <TfiVideoClapper size={70} />
                </span>
                <h2 className="font-bold">Watch Our Sermon & Services</h2>
              </div>
              {/* content */}
              <p className="font-bold text-zinc-400">
                Hear God&apos;s word delivered by our pastors in our sermon
                archives
              </p>
              {/* call to action */}
              <button className="border py-2 px-4 rounded-full w-fit ">
                See Messages
              </button>
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
              <button className="border py-2 px-4 rounded-full w-fit ">
                Request Prayer
              </button>
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
              <button className="border py-2 px-4 rounded-full w-fit ">
                Share Your Testimonies
              </button>
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
              <button className="border py-2 px-4 rounded-full w-fit ">
                Give Generously
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Our Weekly Services */}
      <div className="w-full bg-[#B9C4D4] mt-[20px] relative overflow-hidden">
        <WeeklyServices />
        <div className="w-[400px] h-[400px] z-10 rounded-full bg-[#9CBACA] absolute top-[-90px] left-[-50%] "></div>
      </div>
      {/* Our Monthy Services */}
      <div className="bg-[#02271C] w-full relative overflow-hidden ">
        <div className="w-[600px] h-[600px] rounded-full bg-[#022C13] absolute top-[-90px] right-[-80%] z-0 "></div>
        <MonthlyServices />
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
          <div className="w-[90vw] min-h-[250px] lg:w-[60vw] lg:h-[600px] bg-slate-800">
            <LiveProgram />
          </div>
        </div>
        {/* Explore media */}
        <div className="text-[#A11E1E] font-bold pl-5 pr-10 flex gap-4 items-center lg:justify-self-start z-10 lg:text-3xl">
          <span>
            <BsCollectionPlayFill size={30} />
          </span>
          <span>
            <p>Explore Our Video and Audio Messages</p>
            <div className="bg-[#A11E1E] w-[25%] h-[4px]"></div>
          </span>
        </div>
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
          <div className="w-[100%]">
            <InstagramFeed />
          </div>
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
