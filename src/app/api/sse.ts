
import { NextApiRequest, NextApiResponse } from "next";



let clients: any = [];

const Sse = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Add this client to the list
  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((client:any) => client !== res);
  });
};

// Function to send updates to all connected clients
export const broadcast = (message: any) => {
    console.log("broadcasting", message)
  clients.forEach((client: any) => {
    client.write(`data: ${JSON.stringify(message)}\n\n`);
  });
};

export default Sse
