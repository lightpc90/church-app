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
  videos: VideoSnippet[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos }) => {
    console.log("vide list: ", videos)
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (videos && videos.length > 0 && videos[0].resourceId?.videoId) {
      setSelectedVideoId(videos[0].resourceId.videoId);
      console.log("first video details: ", videos[0].resourceId.videoId);
    }
  }, [videos]);
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  return (
    <div className="w-full ">
      {/* video frame */}
      {selectedVideoId && (
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[300px]"
          ></iframe>
        </div>
      )}
      {/* Search component */}
      <div className="flex bg-[#FDF9F9] rounded-full relative overflow-hidden my-4">
        <input
          type="text"
          placeholder="Search Video Messages"
          className="w-[90%] px-5 py-2 bg-[#FDF9F9] outline-none"
        />
        {/* search icon */}
        <span className="absolute top-[50%] right-2 translate-y-[-50%] ">
          <FiSearch size={25} />
        </span>
      </div>

      <ul className="space-y-2">
        {videos?.map((video, index) => (
          <li key={index} className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
              <button
                className="flex gap-2 items-center overflow-clip "
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
