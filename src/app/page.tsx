import Image from "next/image";
import banner1 from "../../public/nature.jpg";
import banner2 from "../../public/7.jpg";
import banner3 from "../../public/pastorAndfamily.jpg";
import banner4 from "../../public/fullChoir.jpg";
import banner5 from "../../public/randomChurchPic.jpg";
import banner6 from "../../public/randomChurchPic2.jpg";
import { CarouselPlugin } from "@/components/Carousel";
import { EmblaOptionsType } from "embla-carousel";
import { FaCross } from "react-icons/fa6";
import { TfiVideoClapper } from "react-icons/tfi";
import { LiaPrayingHandsSolid } from "react-icons/lia";
import { GrAnnounce } from "react-icons/gr";

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
    <main className="flex flex-col items-center justify-between ">
      {/* Banner */}
      <section
        className="bg-gradient-to-tr from-purple-400 via-blue-400 
      to-purple-800 py-10 h-[250px] md:h-[600px] lg:h-[900px] flex items-center justify-center 
      relative overflow-hidden"
      >
        <CarouselPlugin slides={Items} options={OPTIONS} />
        <div className="flex items-center lg:p-20 bg-gradient-to-t from-zinc-800 via-slate-800 opacity-90 w-full h-full absolute z-30">
          <div className="flex flex-col text-white gap-5 font-bold lg:w-5/12 lg:pt-[50px]">
            <h1 className="lg:text-[50px]  ">
              Experience God&apos;s Love through worship and fellowship at our
              Church.{" "}
            </h1>
            <p className="lg:text-2xl text-zinc-400">
              Experience a welcoming community and uplifting sermons at our
              church. All are welcome. Visit us and reach out with any question
            </p>
            {/* buttons */}
            <div className="flex gap-4 mt-5">
              <button className="bg-rose-800 lg:py-3 lg:px-4 rounded-full">
                Connect with Us
              </button>
              <button className="border py-3 px-4 rounded-full">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* contents */}
      <div className="flex flex-col gap-20 lg:p-[50px]">
        {/* welcome */}
        <div className="flex flex-col gap-2 p-[20px] items-center justify-center ">
          <h1 className="text-xl font-bold ">Welcome to RCCG Beautiful Gate</h1>
          <p className="text-lg ">
            A place of worship, a place of love, a place of hope, a place of
            peace
          </p>
        </div>

        {/* About Us */}
        <div className=" flex flex-col lg:flex-warp gap-2 items-center justify-center w-full ">
          <p className=" text-lg lg:flex-1 p-[20px] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            nesciunt autem explicabo laboriosam culpa, quam id rem ea aliquid
            vel itaque minus dolores veniam ex. Rerum provident ipsa tempora
            deserunt. A place of worship, a place of love, a place of hope, a
            place of peace
          </p>
          <div className=" lg:flex-1 bg-zinc-800 h-[500px] w-full lg:w-[400px] "></div>
        </div>

        {/* CTA Cards */}
        <div className="flex flex-wrap gap-4 w-full justify-center items-center">
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
              The most important question you will ever ask that will affect you
              for eternity
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
              Need Prayer? Submit your requests to pastor to prayer with you
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
        </div>
      </div>
    </main>
  );
}
