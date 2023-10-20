import axios from "axios";

const fetchFacebookLiveVideo = async (accessToken, pageId) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v12.0/${pageId}?fields=live_videos.limit(1){permalink_url}&access_token=${accessToken}`
    );

    const liveVideoUrl = response.data.live_videos.data[0].permalink_url;
    return liveVideoUrl;
  } catch (error) {
    console.error("Error fetching Facebook live video:", error);
    return null;
  }
};

export default fetchFacebookLiveVideo;
