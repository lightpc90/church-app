import Image from "next/image";
import { Cards } from "@/components/data/Data";

import churchSide from "../../public/Ch1.jpg";
import churchFront from "../../public/churchFront1.png";
import banner1 from "../../public/nature.jpg";
import banner2 from "../../public/7.jpg";
import banner3 from "../../public/pastorAndfamily.jpg";
import banner4 from "../../public/fullChoir.jpg";
import banner5 from "../../public/randomChurchPic.jpg";
import banner6 from "../../public/randomChurchPic2.jpg";
import { HomeHeaderCarousel } from "@/components/carousels/HomeHeaderCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { BsCollectionPlayFill } from "react-icons/bs";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import Link from "next/link";
import WeeklyServices from "../components/weeklyService/WeeklyServices";
import MonthlyServices from "@/components/monthlyServices/MonthlyServices";
import SocialMedia from "@/components/social-media/SocialMedia";
import LiveProgram from "@/components/livestream/LiveProgram";
import MapComponent from "@/components/map/GoogleMap";

import HomeHeaderTitle from "@/components/home_resources/HomeHeaderTitle";

import PhoneAndEmail from "@/components/home_resources/PhoneAndEmail";
import WelcomeMessage from "@/components/home_resources/WelcomeMessage";
import WhatNextCardsLayout from "@/components/home_resources/WhatNextCardsLayout";
import InstagramFeed from "@/components/instagramFeed/InstagramFeed";
import InstagramPost from "@/components/instagramFeed/InstagramPosts";

import { PostType } from "@/components/instagramFeed/InstagramPosts";
import InstagramProfile from "@/components/instagramFeed/InstagramProfile";

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



// instagram data fetching
// async function getIGData() {
//   const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
//   console.log('accesss token: ', accessToken)
//   const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url&access_token=${accessToken}`;
//   console.log(url)
//    try {
//     const res = await fetch(url);
//     console.log("res at page", res)
//     const data = await res.json();
//     console.log("data at page", data)

//     if (!res.ok || data?.data.length < 1) {
//       throw new Error("Failed to fetch instagram posts");
//     }
//     // filter only the 9 most recent posts
//     const posts: PostType[] = data.data.slice(0, 9);
//     console.log("instagram data fetched...", posts);
//     return posts;
//   }catch(e){
//     console.log("error at page: ", e)
//   }
// }

export default async function Home() {
  // const recentPosts = await getIGData()
  return (
    <main className="flex flex-col items-center w-[100vw] overflow-x-hidden">
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
          <HomeHeaderTitle />
        </div>
      </section>
      <PhoneAndEmail />

      {/* contents */}
      <div className="flex flex-col lg:p-[50px] items-center">
        {/* welcome */}
        <WelcomeMessage />

        {/* CTA Cards */}
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            What&apos;s Next?
          </h1>
          <div className="flex flex-wrap gap-5 w-full lg:w-[1000px] items-center justify-center">
            {/* card 1 */}
            {Cards.map((card, i) => (
              <WhatNextCardsLayout key={i} cardData={card} />
            ))}
          </div>
        </div>
      </div>
      {/* Services */}
      <div className="flex flex-wrap lg:items-center lg:justify-center lg:mb-10 lg:w-[1400px]">
        {/* Our Weekly Services */}
        <div className="w-full bg-[#B9C4D4] lg:flex-1 mt-[20px] lg:mt-[0px] lg:h-[800px] relative overflow-hidden lg:flex lg:justify-center">
          <WeeklyServices />
          <div className="w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] z-10 rounded-full bg-[#9CBACA] absolute top-[-90px] lg:top-[-150px] left-[-50%] lg:left-[-30%] cycling"></div>
        </div>
        {/* Our Monthy Services */}
        <div className="bg-gray-900 w-full lg:h-[800px] lg:flex-1 relative overflow-hidden lg:mt-[200px]">
          <div className="w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] rounded-full bg-gra-700 absolute top-[-90px] right-[-80%] z-0 cyclingReverse"></div>
          <MonthlyServices />
        </div>
      </div>

      {/* Church live and media */}
      <div
        id="connect"
        className="bg-[#B1A4A4] py-16 w-full flex flex-col gap-7 items-center relative overflow-hidden "
      >
        <div className="w-[400px] h-[400px] lg:w-[1000px] lg:h-[1000px] rounded-full bg-[#A49999] absolute bottom-[-90px] right-[-50%] lg:right-[-20%] z-0 cycling"></div>
        <h2 className="font-bold text-xl z-10">
          Our Live Service and Messages
        </h2>

        {/* Watch us live */}
        <div className="text-zinc-950 lg:text-2xl font-bold flex flex-col items-center z-10">
          <h2>Watch Us Live</h2>
          <div className="w-[100%] flex items-center justify-center">
            <LiveProgram />
          </div>
        </div>
        {/* Explore media */}
        <Link
          href={`/online-church/#media`}
          className="text-[#A11E1E] md:text-2xl lg:w-[60%] font-bold pl-5 lg:p-0 pr-10 flex gap-4 items-center z-10 lg:text-3xl"
        >
          <span>
            <BsCollectionPlayFill size={30} />
          </span>
          <span>
            <p>Explore Our Video and Audio Messages</p>
            <div className="bg-[#A11E1E] w-[25%] h-[4px]"></div>
          </span>
        </Link>

        <div className="w-full lg:w-[60%] text-start pl-5 lg:p-0 z-10 md:flex md:flex-col md:w-full md:items-center md:text-2xl">
          <p className="text-[#A11E1E] font-bold">Follow us on:</p>
          <SocialMedia />
        </div>
      </div>

      {/* Instagram Posts */}
      <div className="w-full md:text-2xl flex flex-col py-6 gap-3 items-center bg-[#D9D9D9]">
        {/* Post Container */}
        <div className="w-[340px] md:w-[80%] lg:w-[50%] m-auto">
          <div className="w-full lg:w-[60%] py-5 text-start text-[#A11E1E] font-bold text-sm lg:text-xl ">
            <p className="md:text-2xl">Our Recent Instagram Posts</p>
            {/* <Link href={`/`} className="flex gap-2 items-center">
              <span>View More</span> <TbSquareRoundedArrowRightFilled />
            </Link> */}
          </div>
          <div className="h-full w-full">
            <InstagramProfile />
            <InstagramFeed />
          </div>
          {/* <InstagramPost posts={recentPosts}/> */}
        </div>
      </div>

      {/* locate us */}
      <div className="w-[100vw] py-6 gap-3 bg-[#FFF2F2] flex flex-col items-center font-bold">
        <div className="text-center">
          <p className="text-slate-400 text-sm">Visit Us</p>
          <p>Get Direction on Map</p>
        </div>
        {/* Google Map */}
        <div className="h-[600px] lg:h-[800px] md:w-[90%] lg:w-[60%] bg-slate-700">
          <MapComponent />
        </div>
      </div>
    </main>
  );
}
