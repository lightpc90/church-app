

import { Dispatch, FC } from "react";
import { FaVideoSlash } from "react-icons/fa";
import ReactPlayer from 'react-player'
import { useYoutubeLiveStream } from "@/customHook/useYoutubeLiveStream";

type propsType = {
  setFallback: Dispatch<React.SetStateAction<boolean>>;
}

const LiveStream: FC<propsType>  = ({ setFallback }) => {

  const channelId = process.env.NEXT_PUBLIC_CHANNEL_ID
  const liveStreamUrl = useYoutubeLiveStream(channelId)

  return (
    <div className="w-[100%] h-[100%]">
      {liveStreamUrl ? (
        <div>
          <ReactPlayer url={liveStreamUrl} controls />
        </div>
      ) : (
        <div className="h-[100%] flex flex-col items-center justify-center text-center py-5 text-white">
          <FaVideoSlash size={50} />
          <p>No live stream is currently available.</p>
          {/* Next service countdown timer comes here */}
          {/* option to watch the last service comes here */}
          <button onClick={() => setFallback(true)} className="text-blue-300">
            Watch Our Last Service
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveStream;
