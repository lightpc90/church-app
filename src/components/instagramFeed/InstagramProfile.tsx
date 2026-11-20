import Image from "next/image";
import { getInstagramProfile } from "@/lib/instagram";

const InstagramProfile = async () => {
  const profile = await getInstagramProfile();
  if (!profile) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-soft sm:p-5">
      {profile.profile_picture_url && (
        <Image src={profile.profile_picture_url} alt="" height={56} width={56} className="size-14 rounded-full" />
      )}
      <div className="mr-auto">
        <p className="font-semibold text-ink">@{profile.username}</p>
        <p className="text-sm text-stone">
          {profile.followers_count != null && <>{profile.followers_count.toLocaleString()} followers</>}
          {profile.follows_count != null && <> · {profile.follows_count.toLocaleString()} following</>}
        </p>
      </div>
      <a
        href={`https://www.instagram.com/${profile.username}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink-soft"
      >
        Follow
      </a>
    </div>
  );
};

export default InstagramProfile;
