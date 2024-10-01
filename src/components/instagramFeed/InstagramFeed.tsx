import Image from "next/image";
import Link from "next/link";
import React from "react";

type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
};
const InstagramFeed = async () => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url&access_token=${accessToken}`;
    try{

        const res = await fetch(url);
        const data = await res.json();

        if(!res.ok || data?.data.length < 1){
            throw new Error('Failed to fetch instagram posts')
        }
        // filter only the 9 most recent posts
        const posts: InstagramPost[] = data.data.slice(0, 9);
        return (
            <div className="grid grid-cols-3 gap-2">
      {posts.map((post) => (
          <Link
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          >
          <Image
            src={post.media_url}
            alt={post.caption || `Instagram post`}
            className="w-full h-auto"
            />
        </Link>
      ))}
    </div>
  );
}catch(e){
    console.error(e)
    return(
        <div className="flex h-full items-center justify-center lg:text-xl font-bold">
            <p>Failed to load Instagram Posts. Please try again later</p>
        </div>
    )
}
};

export default InstagramFeed;
