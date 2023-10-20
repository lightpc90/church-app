'use client'

import React, { useEffect, useState } from "react";
import fetchYoutubeLive from "../utilities/fetchYoutubeLive";

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
          height="100%"
          src={`https://www.youtube.com/embed/${liveVideoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Live Video"
        ></iframe>
      ) : (
        <p className="self-center py-2">
          No live video available at the moment.
        </p>
      )}
    </div>
  );
};

export default YoutubeLive;
