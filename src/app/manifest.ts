import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Makes the site installable ("Add to Home screen") as an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: "Beautiful Gate",
    description: "RCCG Beautiful Gate Parish, Lakowe: services, events, prayer requests, giving and the workers' portal.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#faf7f1",
    theme_color: "#0f1633",
    categories: ["lifestyle", "education"],
    icons: [
      { src: "/icons/icon192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon384x384.png", sizes: "384x384", type: "image/png" },
      { src: "/icons/icon512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcuts: [
      { name: "Prayer request", url: "/prayer-request" },
      { name: "Workers' portal", url: "/workers" },
      { name: "Online church", url: "/online-church" },
    ],
  };
}
