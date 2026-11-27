import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/Layout";
import ServiceWorker from "@/components/pwa/ServiceWorker";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const DESCRIPTION =
  "RCCG Beautiful Gate Parish, Lakowe: Lagos Province 114 Headquarters. A vibrant community devoted to the Word, worship and prayer. All are welcome.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.fullName,
  title: { default: `${site.fullName} · Lakowe, Lagos`, template: `%s · ${site.name}` },
  description: DESCRIPTION,
  openGraph: {
    title: { default: site.fullName, template: `%s · ${site.name}` },
    description: DESCRIPTION,
    url: site.url,
    siteName: site.fullName,
    images: ["/images/church-front.jpg"],
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: site.fullName,
    description: DESCRIPTION,
    images: ["/images/church-front.jpg"],
  },
  icons: { icon: "/icons/icon192x192.png", apple: "/icons/icon192x192.png" },
  category: "church",
  appleWebApp: { capable: true, title: "Beautiful Gate", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#0f1633",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#0f1633",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        },
      }}
    >
      <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${fraunces.variable}`}>
        <body className="min-h-dvh">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-lift"
          >
            Skip to content
          </a>
          <ConditionalLayout>{children}</ConditionalLayout>
          <ServiceWorker />
        </body>
      </html>
    </ClerkProvider>
  );
}
