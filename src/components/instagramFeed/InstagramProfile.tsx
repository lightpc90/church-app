import Image from "next/image";
import Link from "next/link";

interface InstagramAccountInfo {
  id: string;
  username: string;
  profile_picture_url: string;
  followers_count: number;
  follows_count: number;
}

const InstagramProfile: React.FC = async () => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN; // Replace with your valid access token
  const url = `https://graph.instagram.com/me?fields=id,username,profile_picture_url,followers_count,follows_count&access_token=${accessToken}`;

  // Fetch account information
  try {
    const response = await fetch(url);
    const data: InstagramAccountInfo = await response.json();
    return (
      <div className="w-full bg-zinc-950 text-white flex flex-col p-4 rounded-md shadow-md mb-2 overflow-hidden relative">
        <div className="absolute h-[300px] w-[300px] rounded-full top-[-70%] lg:top-[-70%] right-[-50%] lg:right-[-10%] bg-zinc-900 z-[1] " ></div>
        <div className="flex gap-2 items-center z-[3]">
          <Image
            src={data.profile_picture_url}
            alt={`${data.username}'s profile`}
            height={200}
            width={200}
            style={{ borderRadius: "50%", width: "40px", height: "40px" }}
          />
          <h2>{data.username}</h2>
        </div>
        <div className="flex gap-4 items-center my-3 z-[3]">
          <p>
            Followers: <span className="font-bold">{data.followers_count}</span>
          </p>
          <p>
            Following: <span className="font-bold">{data.follows_count}</span>
          </p>
        </div>

        {/* Follow Button */}
        <Link
          href={`https://www.instagram.com/${data.username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit font-bold bg-blue-800 shadow-md z-[3] "
          style={{
            padding: "10px 50px",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            display: "inline-block",
            marginTop: "10px",
          }}
        >
          Follow
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Error fetching Instagram account info:", error);
    return <div>Error fetching Instagram account info</div>;
  }
};

export default InstagramProfile;
