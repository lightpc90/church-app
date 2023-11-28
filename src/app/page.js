import Image from "next/image";
import Layout from "@/components/Layout";
import Carousel from "@/components/carousel";
import Map from "@/components/Map";
import YoutubeLive from "@/components/YoutubeLive";
import SocialMedia from "@/components/SocialMedia";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import SpecialServices from "@/components/SpecialServices";
import WeeklyServices from "@/components/WeeklyServices";

export const metadata = {
  title: "Home",
  description: "RCCG Beautiful Gate, Lakowe website homepage ",
};

export default function Home() {
  const specialServices = SpecialServices();
  const weeklyServices = WeeklyServices();

  return (
    <>
      <Header />

      <main
        className={`flex flex-wrap justify-center min-h-screen items-center `}
      >
        <Carousel />
        {/* CHURCH WELCOME PARAGRAPH SECTION */}
        {/* <div className=" min-h-unit-24 p-8 m-5 "></div> */}

        {/* CHURCH SERVICES SECTION */}
        <div>{weeklyServices}</div>

        {/* Social media icons section */}
        <div id="socialMedia" className="mt-[50px]">
          <SocialMedia />
        </div>

        {/* WATCH US LIVE CONTAINER*/}
        <div
          id="live"
          className="w-screen gap-10 md:gap-10 flex flex-wrap justify-center my-9 md:my-[160px]"
        >
          <div className="w-screen">
            <h6 className="w-full text-center text-[#808081]">
              Follow Our Service Online
            </h6>
            <h1 className="w-full text-center font-bold text-2xl">
              Watch Us Live
            </h1>
          </div>
          <div className=" h-80 md:h-[500px] md:w-11/12 lg:w-5/12 w-full text-white  bg-slate-900">
            <YoutubeLive />
          </div>
          {/* <div className="flex justify-center items-center h-80 md:h-[500px] md:w-5/12 w-full text-white bg-slate-900">
            <h3>Facebook Live Video</h3>
          </div> */}
        </div>

        {/* SPECIAL PROGRAMMES */}
        <div className="flex flex-wrap w-screen justify-center content-center items-center gap-3 md:gap-10 my-9 md:my-[160px]">
          <div>
            <h6 className="w-screen text-center text-[#808081]">
              Special Programmes
            </h6>
            <h3 className="w-screen text-2xl text-center font-bold ">
              Join Us
            </h3>
          </div>
          {specialServices}
        </div>

        {/* CONTACT US */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-tr from-blue-800 to-purple-950 text-white md:my-10 py-20">
          <h3 className="py-5 w-screen text-center font-medium">Contact Us</h3>
          <div className="flex flex-col gap-3 px-5">
            <p className="font-medium">
              1-8 Redeem Way By Slot Bus Stop, Lakowe-Adeba, Km Lekki-Epe
              Express-Way Lakowe
            </p>
            <p className="font-medium">234(0)812 3456 789</p>
            <p className="font-medium">234(0)815 5658 657</p>
            <p className="font-medium">rccgbeautifulgate@gmail.com</p>
          </div>

          <div className="mt-10">
            <h6 className="w-screen text-center text-[#808081]">
              Locate Us on Map
            </h6>
            <h4 className="w-screen text-xl text-center font-bold ">
              Get Direction
            </h4>
          </div>
          <div className="h-[500px] w-full md:w-11/12 lg:w-6/12 bg-slate-900 py-3 my-5">
            <Map />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
