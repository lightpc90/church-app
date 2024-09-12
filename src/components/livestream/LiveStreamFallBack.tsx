import { useEffect, useState } from "react";

const LiveStreamFallback = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkLiveStream = async () => {
      try {
        console.log('channel_ID', process.env.NEXT_PUBLIC_CHANNEL_ID)
        console.log('api_key', process.env.NEXT_PUBLIC_API_KEY)
        setLoading(true)
        // 1. Check if there is a current live stream
        const liveResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.NEXT_PUBLIC_CHANNEL_ID}&eventType=live&type=video&key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const liveData = await liveResponse.json();

        if (liveData.items && liveData.items.length > 0) {
            console.log('live video found')
          // Live stream is active
          setIsLive(true);
          setVideoId(liveData.items[0].id.videoId);
        } else {
            console.log('launching fallback')
          // 2. No live stream, get the last uploaded video
          const recentResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.NEXT_PUBLIC_CHANNEL_ID}&order=date&type=video&key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const recentData = await recentResponse.json();

          if (recentData.items && recentData.items.length > 0) {
            console.log('recent video found')
            setIsLive(false);
            setVideoId(recentData.items[0].id.videoId); // Set last video ID
          }
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error("Error fetching video data:", error);
      }
    };

    checkLiveStream();
  }, []);

  return (
    <div className="w-[100%] h-[100%]">
      {!videoId && loading ? (<p className="text-white text-center ">Loading...</p>
      ) : videoId ? (
        <iframe
          className="h-[100%] w-[100%]"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : !videoId && !loading && (
        <p className="text-white text-center">No video available</p>
      )}
    </div>
  );
};

export default LiveStreamFallback;
