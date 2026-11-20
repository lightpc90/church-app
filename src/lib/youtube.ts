import "server-only";

// Server-side YouTube Data API helpers. Responses are cached by Next's fetch cache so the
// whole site makes a handful of quota-cheap calls per hour instead of one 100-unit
// `search` call per visitor.
//
// Prefer a server-only YOUTUBE_API_KEY; fall back to the existing shared key.
const API_KEY = process.env.YOUTUBE_API_KEY ?? process.env.NEXT_PUBLIC_API_KEY;
const BASE = "https://www.googleapis.com/youtube/v3";

export const CHANNEL_ID = "UC-AkcMjz8P7Q_yQC6iS_S2A";
export const SERMONS_PLAYLIST_ID = "PL3jUwf3qCxnwmTaDwDm3PKC3w5UDaSfIQ";

export type PlaylistVideo = {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail?: string;
};

export type FeaturedVideo = { videoId: string; title: string; isLive: boolean };

async function yt<T>(path: string, params: Record<string, string>, revalidate: number) {
  if (!API_KEY) return null;
  const url = `${BASE}/${path}?${new URLSearchParams({ ...params, key: API_KEY })}`;
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) {
      console.error(`[youtube] ${path} failed: ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.error(`[youtube] ${path} failed:`, e);
    return null;
  }
}

type PlaylistItemsResponse = {
  items: {
    snippet: {
      title: string;
      publishedAt: string;
      resourceId: { videoId: string };
      thumbnails?: { medium?: { url: string }; default?: { url: string } };
    };
  }[];
  nextPageToken?: string;
};

/** All videos in a playlist (1 quota unit per 50 videos), cached for an hour. */
export async function getPlaylistVideos(playlistId = SERMONS_PLAYLIST_ID, maxPages = 10) {
  const videos: PlaylistVideo[] = [];
  let pageToken = "";
  for (let page = 0; page < maxPages; page++) {
    const data = await yt<PlaylistItemsResponse>(
      "playlistItems",
      { part: "snippet", maxResults: "50", playlistId, ...(pageToken && { pageToken }) },
      3600
    );
    if (!data) return videos.length ? videos : null;
    for (const { snippet } of data.items) {
      // Deleted/private videos show up with these titles and can't be embedded.
      if (snippet.title === "Private video" || snippet.title === "Deleted video") continue;
      videos.push({
        videoId: snippet.resourceId.videoId,
        title: snippet.title,
        publishedAt: snippet.publishedAt,
        thumbnail: snippet.thumbnails?.medium?.url ?? snippet.thumbnails?.default?.url,
      });
    }
    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }
  return videos;
}

type VideosResponse = {
  items: { id: string; snippet: { title: string; liveBroadcastContent: "live" | "upcoming" | "none" } }[];
};

/**
 * The channel's live broadcast if one is running, otherwise its most recent video.
 * Costs 2 quota units per refresh (every 2 minutes at most).
 */
export async function getFeaturedVideo(channelId = CHANNEL_ID): Promise<FeaturedVideo | null> {
  const uploadsPlaylist = `UU${channelId.slice(2)}`;
  const recent = await yt<PlaylistItemsResponse>(
    "playlistItems",
    { part: "snippet", maxResults: "10", playlistId: uploadsPlaylist },
    120
  );
  const ids = recent?.items.map((i) => i.snippet.resourceId.videoId) ?? [];
  if (!ids.length) return null;

  const details = await yt<VideosResponse>("videos", { part: "snippet", id: ids.join(",") }, 120);
  const items = details?.items ?? [];

  const live = items.find((v) => v.snippet.liveBroadcastContent === "live");
  if (live) return { videoId: live.id, title: live.snippet.title, isLive: true };

  const latest = items.find((v) => v.snippet.liveBroadcastContent === "none");
  return latest
    ? { videoId: latest.id, title: latest.snippet.title, isLive: false }
    : { videoId: ids[0], title: recent!.items[0].snippet.title, isLive: false };
}
