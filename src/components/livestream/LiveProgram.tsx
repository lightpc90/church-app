import { getFeaturedVideo } from "@/lib/youtube";

const LiveProgram = async () => {
  const video = await getFeaturedVideo();

  if (!video) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-ink-soft p-6 text-center text-white">
        <p className="font-display text-2xl">We&apos;ll be live soon</p>
        <p className="max-w-sm text-white/60">No video is available right now. Please check back during service times.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <p className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur">
        {video.isLive ? (
          <>
            <span className="size-2 animate-pulse rounded-full bg-ember" aria-hidden />
            Live now
          </>
        ) : (
          "Latest service"
        )}
      </p>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        className="aspect-video w-full rounded-[1.5rem] bg-black"
      />
    </div>
  );
};

export default LiveProgram;
