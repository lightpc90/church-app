// pages/api/subscribe.ts

import { NextApiRequest, NextApiResponse } from "next";

const HUB_URL = "https://pubsubhubbub.appspot.com/subscribe";
const YOUTUBE_TOPIC = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${process.env.CHANNEL_ID}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(HUB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "hub.mode": "subscribe",
        "hub.topic": YOUTUBE_TOPIC,
        "hub.callback": `${process.env.MY_DOMAIN}/api/youtube-webhook`, // Your webhook endpoint
        "hub.verify": "async",
      }),
    });

    if (response.ok) {
        console.log("sub successfully")
      res
        .status(200)
        .json({ message: "Successfully subscribed to YouTube notifications" });
    } else {
        console.error("Error subscribing to YouTube notifications:", response.statusText);
      res
        .status(500)
        .json({ message: "Failed to subscribe to YouTube notifications" });
    }
  } catch (error) {
    console.error("Subscription error:", error);
    res
      .status(500)
      .json({ message: "Error subscribing to YouTube notifications" });
  }
}
