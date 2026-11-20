// Single source of truth for church details used across the site
// (hero, footer, contact, visit section, service times).

export const site = {
  name: "RCCG Beautiful Gate",
  fullName: "RCCG Beautiful Gate Parish",
  tagline: "Lagos Province 114 Headquarters",
  url: "https://beautiful-gate.vercel.app",
  address: "1-8 Redeemed Close, Km 34 Lekki-Epe Expressway, Lakowe, Lagos",
  coordinates: { lat: 6.471756086450086, lng: 3.728822906746889 },
  phones: ["+234 812 345 6789", "+234 812 654 3789"],
  email: "ctlbeautifulgate@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/rccgbgplagos/",
    facebook: "https://www.facebook.com/rccgbglagos",
    youtube: "https://www.youtube.com/@rccgbgplagos",
    handle: "@rccgbgplagos",
  },
} as const;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.coordinates.lat},${site.coordinates.lng}`;

export type ServiceItem = { name: string; time: string; note?: string };
export type WeeklyService = { day: string; image: string; items: ServiceItem[] };

export const weeklyServices: WeeklyService[] = [
  {
    day: "Sunday",
    image: "/guitar.jpg",
    items: [
      { name: "Early Risers Service", time: "8:00 – 9:30 AM" },
      {
        name: "Sunday School",
        time: "9:30 – 10:00 AM",
        note: "8:00 – 8:45 AM on Thanksgiving Sundays",
      },
      { name: "Family Service", time: "10:00 – 11:30 AM" },
      { name: "House Fellowship", time: "5:00 – 6:00 PM" },
    ],
  },
  {
    day: "Tuesday",
    image: "/digging deep.jpg",
    items: [{ name: "Digging Deep", time: "6:00 – 7:00 PM", note: "Bible study" }],
  },
  {
    day: "Thursday",
    image: "/faith clinic.png",
    items: [{ name: "Faith Clinic", time: "6:00 – 7:00 PM", note: "Prayer meeting" }],
  },
];

export const monthlyPrograms = [
  {
    name: "Good Morning Holy Spirit",
    when: "1st day of every month",
    time: "6:00 – 7:00 AM",
    image: "/goodMorningHolySpirit.png",
  },
  {
    name: "Thanksgiving Sunday",
    when: "1st Sunday of every month",
    time: "8:00 – 11:30 AM",
    image: "/thanksgiving.png",
  },
  {
    name: "Youth Sunday",
    when: "3rd Sunday of every month",
    time: "10:00 AM · Second service",
    image: "/randomChurchPic.jpg",
  },
] as const;

export type NavLink = { label: string; href: string; description?: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Online Church", href: "/online-church" },
  { label: "Events", href: "/events" },
];

export const connectNav: NavLink[] = [
  { label: "How Can I Be Saved?", href: "/how-can-i-be-saved", description: "Begin a relationship with Jesus" },
  { label: "Prayer Request", href: "/prayer-request", description: "Let us pray with you" },
  { label: "Share a Testimony", href: "/testimony", description: "Tell us what God has done" },
  { label: "Groups & Ministries", href: "/groups-and-ministries", description: "Find your people" },
  { label: "House Fellowships", href: "/house-fellowship-centers", description: "Meet near you on Sundays" },
  { label: "Workers", href: "/workers", description: "The workers' portal" },
];

export const footerNav = {
  explore: [
    { label: "About Us", href: "/about-us" },
    { label: "Online Church", href: "/online-church" },
    { label: "Sermons", href: "/online-church#sermons" },
    { label: "Events", href: "/events" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  connect: [
    { label: "How Can I Be Saved?", href: "/how-can-i-be-saved" },
    { label: "Prayer Request", href: "/prayer-request" },
    { label: "Share a Testimony", href: "/testimony" },
    { label: "Giving & Partnership", href: "/online-giving" },
  ],
  community: [
    { label: "Groups & Ministries", href: "/groups-and-ministries" },
    { label: "House Fellowships", href: "/house-fellowship-centers" },
    { label: "Workers", href: "/workers" },
  ],
} satisfies Record<string, NavLink[]>;
