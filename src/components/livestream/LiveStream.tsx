"use client";

import { useEffect, useState, Dispatch, FC } from "react";
import { FaVideoSlash } from "react-icons/fa";

type propsType = {
  setFallback: Dispatch<React.SetStateAction<boolean>>;
}

const LiveStream: FC<propsType>  = ({ setFallback }) => {
  const [isLive, setIsLive] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setIsLive(data.isLive);
      setLiveVideoId(data.videoId);
    };

    return () => {
      eventSource.close(); // Clean up SSE connection
    };
  }, []);

  return (
    <div className="w-[100%] h-[100%]">
      {isLive && liveVideoId ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="h-[100%] flex flex-col items-center justify-center text-center py-5 text-white">
          <FaVideoSlash size={50} />
          <p>No live stream is currently available.</p>
          {/* Next service countdown timer comes here */}
          {/* option to watch the last service comes here */}
          <button onClick={()=>setFallback(true)} className="text-blue-300">Watch Our Last Service</button>
        </div>
      )}
    </div>
  );
};

export default LiveStream;
