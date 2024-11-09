import LiveProgram from "@/components/livestream/LiveProgram";
import Header from "@/components/UILayouts/Header";
import React, { Suspense } from "react";
import onlineChurch from "../../../public/headers/online-church.png";
import { FiSearch } from "react-icons/fi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { HiMiniPlayCircle } from "react-icons/hi2";
import VideoPlayer from "./VideoPlayer";

// Define types for the API response
interface VideoSnippet {
  title: string;
  resourceId: {
    videoId: string;
  };
  thumbnails: {
    default: {
      url: string;
    };
  };
}

interface YouTubeApiResponse {
  items: { snippet: VideoSnippet }[];
  nextPageToken?: string;
}
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Replace with your actual API key
const PLAYLIST_ID = "PL3jUwf3qCxnwmTaDwDm3PKC3w5UDaSfIQ"; // Replace with your playlist ID
const MAX_RESULTS = 50; // Maximum is 50 per request

const playlistVideos = async () => {
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
  let videos: VideoSnippet[] = [];
  let nextPageToken = "";
  try {
    do {
      let response = await fetch(`${url}&pageToken=${nextPageToken}`, {
        next: { revalidate: 36000 },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      let data: YouTubeApiResponse = await response.json();
      const fetchedVideos = data.items.map((item) => item.snippet);
      videos = [...videos, ...fetchedVideos];
      console.log("videos fetched: ", videos);
      nextPageToken = data.nextPageToken || "";
    } while (nextPageToken);

    return videos;
  } catch (e) {
    console.log("failed! ", e);
  }
};

const page = async () => {
  const videoMessages = await playlistVideos();
  return (
    <div className="bg-[#D9D9D9] flex flex-col items-center justify-center gap-5 mb-10">
      <Header
        title="Watch us Live, Explore Our Messages"
        imageUrl={onlineChurch.src}
      />
      <p className="font-bold text-2xl">Watch Us Live</p>
      <div className="w-full md:w-[70%]">
        <LiveProgram />
      </div>

      {/* Audio and Video Messages */}
      <div
        id="media"
        className="flex flex-col md:mt-[60px] items-center justify-center bg-white w-full lg:px-[230px]"
      >
        {/* Audio  Messages */}
        <div
          id="audio"
          className="flex flex-col items-center md:py-10 gap-3 mb-10 w-full"
        >
          <h2 className="font-bold md:text-2xl">Our Audio Messages</h2>
          <div className="flex bg-[#FDF9F9] rounded-full relative overflow-hidden">
            <input
              type="text"
              placeholder="Search Audio Messages"
              className="w-[90%] px-5 py-2 bg-[#FDF9F9] outline-none"
            />
            {/* search icon */}
            <span className="absolute top-[50%] right-2 translate-y-[-50%] ">
              <FiSearch size={25} />
            </span>
          </div>
          {/* list of Audios */}
          <div className="w-full md:w-[70%] lg:w-[60%]">
            <ul className="space-y-2">
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <HiMiniPlayCircle size={25} />
                </span>
                1
              </li>
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <HiMiniPlayCircle size={25} />
                </span>
                2
              </li>
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <HiMiniPlayCircle size={25} />
                </span>
                3
              </li>
            </ul>
          </div>
        </div>
        {/*  Video Messages */}
        <div id="video" className="flex flex-col md:text-2xl items-center gap-3 w-full md:w-[70%] lg:w-[90%]">
          <h2 className="font-bold lg:text-2xl pt-10 pb-5">Our Video Messages</h2>
          <VideoPlayer videos={videoMessages} />
        </div>
      </div>
    </div>
  );
};

export default page;
