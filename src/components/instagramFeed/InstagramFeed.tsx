import Image from "next/image";
import Link from "next/link";
import React from "react";

type MediaItem = {
  id: string;
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  thumbnail_url?: string;
};

type InstagramPost = {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  children?: { data: MediaItem[] };
};
const InstagramFeed = async () => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,media_type&access_token=${accessToken}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (!res.ok || data?.data.length < 1) {
      throw new Error("Failed to fetch instagram posts");
    }
    // filter only the 9 most recent posts
    const posts: InstagramPost[] = data.data.slice(0, 9);
    // console.log("instagram data fetched...", posts);
    // Helper function to get the media to display
    const getDisplayMedia = (post: InstagramPost) => {
      if (post.media_type === "CAROUSEL_ALBUM") {
        if (post.media_url) {
          return post.media_url;
        }
        // If it's a carousel, use the first item's thumbnail_url or media_url
        if (post.thumbnail_url) {
          return post.thumbnail_url;
        }
        else return ''
      }

      // For single video posts, use the thumbnail_url
      if (post.media_type === "VIDEO" && post.thumbnail_url) {
        return post.thumbnail_url;
      }

      // For image posts, use the media_url
      if (post.media_type === "IMAGE") {
        return post.media_url;
      }

      // Default fallback if no media is found
      return "";
    };
    return (
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => {
          const mediaUrl = getDisplayMedia(post);
          return (
            <Link
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={mediaUrl || ""}
                alt={post.caption || `Instagram post`}
                width={400}
                height={400}
                className="w-full h-full rounded-md shadow-md"
              />
            </Link>
          );
        })}
      </div>
    );
  } catch (e) {
    console.error(e);
    return (
      <div className="flex flex-col w-full h-full items-center justify-center lg:text-xl font-bold p-6">
        <p>Failed to load Instagram Posts. Please try again later</p>
        <div className="grid grid-cols-3 gap-2 w-full">
          {Array(9)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="w-full h-[90px] lg:h-[260px] bg-gray-600 rounded-md
        hover:shadow-lg hover:ring ring-rose-800 cursor-pointer 
        "
              ></div>
            ))}
        </div>
      </div>
    );
  }
};

export default InstagramFeed;
