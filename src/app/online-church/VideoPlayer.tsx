"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Play, Search } from "lucide-react";
import type { PlaylistVideo } from "@/lib/youtube";
import { fieldClass } from "@/components/forms/fields";
import { cn } from "@/lib/utils";
import YouTubeEmbed from "@/components/consent/YouTubeEmbed";

const dateFmt = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric" });

const VideoPlayer = ({ videos }: { videos: PlaylistVideo[] }) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(videos[0]?.videoId ?? null);
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? videos.filter((v) => v.title.toLowerCase().includes(q)) : videos;
  }, [videos, search]);

  const selected = videos.find((v) => v.videoId === selectedVideoId);

  if (!videos.length) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-white/60 p-10 text-center text-stone">
        Video messages are unavailable right now. Please check our YouTube channel.
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        {selected && (
          <div className="overflow-hidden rounded-[2rem] bg-ink p-2 shadow-lift sm:p-3">
            <YouTubeEmbed videoId={selected.videoId} title={selected.title} />
          </div>
        )}
        {selected && (
          <div className="mt-6">
            <h3 className="font-display text-2xl font-medium text-ink sm:text-3xl">{selected.title}</h3>
            <p className="mt-1 text-sm text-stone">{dateFmt.format(new Date(selected.publishedAt))}</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-4">
        <div className="relative">
          <label htmlFor="video-search" className="sr-only">
            Search video messages
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone" aria-hidden />
          <input
            id="video-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${videos.length} messages`}
            className={cn(fieldClass, "pl-11")}
          />
        </div>
        {results.length === 0 ? (
          <p className="mt-6 text-stone">No messages match “{search}”.</p>
        ) : (
          <ul className="mt-4 max-h-[34rem] space-y-1 overflow-y-auto pr-1">
            {results.map((video) => {
              const active = video.videoId === selectedVideoId;
              return (
                <li key={video.videoId}>
                  <button
                    type="button"
                    aria-current={active || undefined}
                    onClick={() => setSelectedVideoId(video.videoId)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl p-2 text-start transition-colors",
                      active ? "bg-ink text-white" : "hover:bg-sand"
                    )}
                  >
                    <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-sand">
                      {video.thumbnail && (
                        <Image src={video.thumbnail} alt="" fill sizes="112px" className="object-cover" />
                      )}
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/20">
                        <Play className="size-5 fill-white text-white" aria-hidden />
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="line-clamp-2 text-sm font-semibold">{video.title}</span>
                      <span className={cn("mt-0.5 block text-xs", active ? "text-white/60" : "text-stone")}>
                        {dateFmt.format(new Date(video.publishedAt))}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
