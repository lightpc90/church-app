import axios from "axios";

const fetchYoutubeLive = async (apiKey, channelId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date`
    );
    const liveVideoId = response.data?.items[0]?.id.videoId;
    console.log("live video id", liveVideoId);
    return liveVideoId;
  } catch (error) {
    console.error("Error fetching live video:", error);
    return null;
  }
};

export default fetchYoutubeLive;
