import { NextApiRequest, NextApiResponse } from "next";
import { broadcast } from "./sse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Handle the webhook verification (YouTube does a challenge to confirm the webhook is valid)
    const challenge = req.query["hub.challenge"];
    if (challenge) {
      res.status(200).send(challenge);
    } else {
      res.status(400).send("Missing challenge parameter");
    }
  } else if (req.method === "POST") {
    // Handle the actual webhook notification
    const notification = req.body;

    if (notification) {
      // Process notification, e.g., check if it's a live event and update the app state
      console.log("Received YouTube live notification:", notification);
      // TODO: Update your state or trigger a re-fetch of live video details
      broadcast(notification);
    }

    res.status(204).end(); // Respond to YouTube with 204 No Content
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
