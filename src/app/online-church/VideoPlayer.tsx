"use client"; // This marks it as a client-side component

import React, { useEffect, useState } from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

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

interface VideoPlayerProps {
  videos: VideoSnippet[] | undefined;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos }) => {
  console.log("vide list: ", videos);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<VideoSnippet[] | undefined>([]);

  useEffect(() => {
    if (videos && videos.length > 0 && videos[0].resourceId?.videoId) {
      setSelectedVideoId(videos[0].resourceId.videoId);
      console.log("first video details: ", videos[0].resourceId.videoId);
    }
  }, [videos]);

  useEffect(() => {
    handleSearchVideos();
  }, [videos, search]);
  //   handle videos onclick event
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  //   handleSearchEvent
  const handleSearchVideos = () => {
    const list = videos?.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchList(list);
  };

  return (
    <div className="w-full flex flex-col items-center ">
      {/* video frame */}
      {selectedVideoId && (
        <div className="w-full lg:w-[70%]">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[300px] lg:h-[700px] aspect-video"
          ></iframe>
        </div>
      )}
      {/* Search component */}
      <div className="flex lg:w-[700px] bg-[#FDF9F9] lg:mt-10 rounded-full relative overflow-hidden my-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Video Messages"
          className="w-[90%] px-5 py-2 lg:py-4 bg-[#FDF9F9] outline-none"
        />
        {/* search icon */}
        <span className="absolute top-[50%] right-2 translate-y-[-50%]">
          <FiSearch size={25} />
        </span>
      </div>
      <ul className="space-y-2">
        {searchList
          ? searchList.length > 0 &&
            searchList.map((video, index) => (
              <li
                key={index}
                className={`p-2 flex gap-2 items-center${
                  selectedVideoId === video.resourceId.videoId
                    ? `bg-gray-950 text-rose-800 shadow-md rounded-lg`
                    : `bg-[#FDF9F9]`
                }`}
              >
                <button
                  className="flex gap-2 items-center overflow-clip"
                  onClick={() => handleVideoSelect(video.resourceId.videoId)}
                >
                  <span>
                    <BiSolidMoviePlay size={25} />
                  </span>
                  {1 + index}
                  <span className="flex text-start">{video.title}</span>
                </button>
              </li>
            ))
          : videos?.map((video, index) => (
              <li
                key={index}
                className={`p-2 flex gap-2 items-center${
                  selectedVideoId === video.resourceId.videoId
                    ? `bg-gray-950 text-rose-800 shadow-md rounded-lg`
                    : `bg-[#FDF9F9]`
                }`}
              >
                <button
                  className="flex gap-2 items-center overflow-clip"
                  onClick={() => handleVideoSelect(video.resourceId.videoId)}
                >
                  <span>
                    <BiSolidMoviePlay size={25} />
                  </span>
                  {1 + index}
                  <span className="flex text-start">{video.title}</span>
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default VideoPlayer;
