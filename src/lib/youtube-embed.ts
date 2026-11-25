/** Privacy-enhanced YouTube embed URL. `autoplay` when the visitor has just clicked play on our placeholder. */
export const youtubeEmbedUrl = (videoId: string, autoplay = false) =>
  `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}${autoplay ? "?autoplay=1" : ""}`;
