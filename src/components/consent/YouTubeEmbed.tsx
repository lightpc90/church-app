"use client";

import ConsentGate from "./ConsentGate";
import { youtubeEmbedUrl } from "@/lib/youtube-embed";

/** Privacy-enhanced YouTube player that only loads after cookie consent (or a click on the placeholder). */
export default function YouTubeEmbed({ videoId, title, lazy }: { videoId: string; title: string; lazy?: boolean }) {
  return (
    <ConsentGate title={title}>
      {({ autoplay }) => (
        <iframe
          key={videoId}
          src={youtubeEmbedUrl(videoId, autoplay)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading={lazy ? "lazy" : undefined}
          className="aspect-video w-full rounded-[1.5rem] bg-black"
        />
      )}
    </ConsentGate>
  );
}
