'use client'

import React, { useEffect, useState } from "react";
import fetchFacebookLiveVideo from "../Utilities/fetchFacebookLiveVideo";

const FacebookLiveVideoPage = () => {
  const [liveVideoUrl, setLiveVideoUrl] = useState(null);
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  useEffect(() => {
    const getFacebookLiveVideo = async () => {
      const videoUrl = await fetchFacebookLiveVideo(accessToken, pageId);
      if (videoUrl) {
        setLiveVideoUrl(videoUrl);
      }
    };

    getFacebookLiveVideo();
  }, [accessToken, pageId]);

  return (
    <div>
      <h1>Facebook Live Video</h1>
      {liveVideoUrl ? (
        <iframe
          src={liveVideoUrl}
          width="560"
          height="315"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Facebook Live Video"
        ></iframe>
      ) : (
        <p>No live video available at the moment.</p>
      )}
    </div>
  );
};

export default FacebookLiveVideoPage;
