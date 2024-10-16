"use client";

import React, { useEffect, useState } from "react";
import fetchYoutubeLive from "./fetchYoutubeVid";

const YoutubeLive = () => {
  const [liveVideoId, setLiveVideoId] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const channelId = "UC-AkcMjz8P7Q_yQC6iS_S2A";
  useEffect(() => {
    const getLiveVideo = async () => {
      const videoId = await fetchYoutubeLive(apiKey, channelId);
      if (videoId) {
        setLiveVideoId(videoId);
      }
    };

    getLiveVideo();
  }, [apiKey, channelId]);

  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center">
      {liveVideoId ? (
        <div className="w-full lg:w-[100%]">
          <iframe
            src={`https://www.youtube.com/embed/${liveVideoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Live Video"
            className="w-full h-[300px] lg:h-[700px] aspect-video"
            // style={{height: "250px", width: "350px", margin: "0px", padding: "0px"}}
          ></iframe>
        </div>
      ) : (
        <div className="flex flex-col items-center text-white justify-center h-[340px] w-[500px] bg-slate-900">
          <h3>Youtube</h3>
          <p>No live video available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default YoutubeLive;
