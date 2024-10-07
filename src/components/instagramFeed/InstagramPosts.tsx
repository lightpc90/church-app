import Image from "next/image";
import Link from "next/link";
import React from "react";

export type PostType = {
  id: string;
  caption: string;
  media_url: string;
  thumbnail_url: string;
  permalink: string;
};

type InstagramPostPropsType = {
  posts: PostType[] | undefined
};

const InstagramPost: React.FC<InstagramPostPropsType> = async ({posts}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {posts?.map((post) => (
        <Link
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={post.thumbnail_url}
            alt={post.caption || `Instagram post`}
            width={400}
            height={400}
            className="w-full h-auto rounded-md shadow-md"
          />
        </Link>
      ))}
    </div>
  );
};
export default InstagramPost;
