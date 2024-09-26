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
    <div className="w-[100%] h-[100%] flex flex-col justify-center">
      {liveVideoId ? (
        <iframe
          width="100%"
          height="100vh"
          src={`https://www.youtube.com/embed/${liveVideoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Live Video"
        ></iframe>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h3>Youtube</h3>
          <p>No live video available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default YoutubeLive;
