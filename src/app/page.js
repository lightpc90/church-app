import Image from "next/image";
import Layout from "@/components/Layout";
import Carousel from "@/components/carousel";
import Map from "@/components/Map";
import YoutubeLive from "@/components/YoutubeLive";
import SocialMedia from "@/components/SocialMedia";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Home",
  description: "RCCG Beautiful Gate, Lakowe website homepage ",
};

export default function Home() {
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
        <div className="flex flex-wrap justify-center content-center items-center gap-3 lg:gap-10 my-9">
          <div>
            <h6 className="w-screen text-center text-[#808081]">
              Fellowship With Us
            </h6>
            <h1 className="w-screen text-center text-2xl font-bold">
              Our Weekly Services
            </h1>
          </div>

          {/* Sunday service container */}
          <div
            className="flex flex-col py-10 h-80 md:h-[500px] md:w-5/12 w-10/12 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/sunday_worship.jpg')" }}
          >
            <h1 className="text-2xl font-bold font-mono">SUNDAY SERVICE</h1>
            <div className="flex flex-col font-bold">
              <h1 className="text-xl font-mono">
                1st Service: <span className="text-[yellow]">7:45am</span>
              </h1>
              <h1 className="text-xl font-mono">
                2nd Service: <span className="text-[yellow]">9:45am</span>
              </h1>
            </div>
          </div>

          <div
            className="h-80 md:h-[500px] md:w-5/12 w-10/12 border-r-1-2 p-5  text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/word.jpg')" }}
          >
            <h1 className="text-2xl font-bold font-mono">DIGGING DEEP</h1>
            <div className="flex flex-col font-bold md:gap-6">
              <h1 className="text-xl font-mono">
                Every Tuesday: <span className="text-[yellow]">6pm</span>
              </h1>
            </div>
          </div>
          <div
            className="h-80 md:h-[500px] md:w-5/12 w-10/12 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/man_praying.jpg')" }}
          >
            <h1 className="text-2xl font-bold font-mono">FAITH CLINIC</h1>
            <div className="flex flex-col font-bold md:gap-6">
              <h1 className="text-xl font-mono">
                Every Thursday: <span className="text-[yellow]">6pm</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Social media icons section */}
        <div id="socialMedia" className="mt-[50px]">
          <SocialMedia />
        </div>

        {/* WATCH US LIVE CONTAINER*/}
        <div className="w-screen gap-10 md:gap-10 flex flex-wrap justify-center my-9 md:my-[160px]">
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
          <div
            className="h-80 md:h-[500px] md:w-5/12 w-10/12 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/youth_sunday.jpg')" }}
          >
            <div className="flex flex-col gap-5 md:p-10 font-mono">
              <h3>YOUTH SUNDAY EVERY 3RD SUNDAY OF THE MONTH</h3>
              <h4>SECOND SERVICE</h4>
            </div>
          </div>
          <div
            className="h-80 md:h-[500px] md:w-5/12 w-10/12 border-r-1-2 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/good_morning_holy_spirit1.jpg')" }}
          >
            <div className="flex flex-col gap-5 md:p-10 font-mono">
              <h3>GOOD MORNIG HOLY SPIRIT EVERY 1ST DAY OF THE MONTH</h3>
              <h4>6AM</h4>
            </div>
          </div>
          <div
            className="h-80 md:h-[500px] md:w-5/12 w-10/12 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/holy_communion_bg.jpg')" }}
          >
            <div className="flex flex-col gap-5 md:p-10 font-mono">
              <h3>HOLY COMMUNION SERVICE EVERY 1ST SUNDAY OF THE MONTH</h3>
              <h4>4PM</h4>
            </div>
          </div>
        </div>

        {/* CONTACT US */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-tr from-blue-800 to-purple-950 text-white md:my-10 py-20">
          <h3 className="py-5 w-screen text-center font-medium">Contact Us</h3>
          <div className="flex flex-col gap-3 px-5">
            <p className="font-medium">
              By Slot Bus Stop, Lakowe-Adeba, Km Lekki-Epe Express-Way Lakowe
            </p>
            <p className="font-medium">
              234(0)812 3456 789, 234(0)812 6543 789
            </p>
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
