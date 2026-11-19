import Image from "next/image";
import { getInstagramPosts } from "@/lib/instagram";

const InstagramFeed = async () => {
  const posts = await getInstagramPosts(6);

  if (!posts?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-white/60 p-10 text-center text-stone">
        Instagram posts are unavailable right now. Follow us on Instagram to see the latest.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {posts.map((post) => (
        <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-2xl">
          <Image
            src={post.imageUrl}
            alt={post.caption?.slice(0, 120) || "Instagram post"}
            width={400}
            height={400}
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
};

export default InstagramFeed;
