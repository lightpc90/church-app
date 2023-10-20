// pages/api/live.js
import axios from "axios";

export default async (req, res) => {
  const CHANNEL_ID = process.env.CHANNEL_ID;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${CHANNEL_ID}&eventType=live&type=video&part=snippet`
    );

    const liveVideo = response.data.items[0];
    if (liveVideo) {
      res.status(200).json({ status:'live video', videoId: liveVideo.id.videoId });
    } else {
      // If no live video, fetch the latest video from uploads
      const latestVideoResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${CHANNEL_ID}&type=video&part=snippet&order=date`
      );
      const latestVideo = latestVideoResponse.data.items[0];
      res.status(200).json({status: 'latest video', videoId: latestVideo.id.videoId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
