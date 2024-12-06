import {
  ClerkProvider,
} from "@clerk/nextjs";

import type { Metadata, Viewport } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/Layout";
import { ThemeProvider } from "@/components/context-providers/theme-provider";
import ServiceWorkerRegisterer from "@/components/clearSWcache/clearSWcache";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "RCCG Beautiful Gate Progressive Web App"
const APP_DEFAULT_TITLE = "Beautiful Gate Parish"
const APP_TITLE_TEMPLATE = "%s - Progressive Web App"
const APP_DESCRIPTION = "A Progressive Web App for RCCG Beautiful Gate"
const siteURL = "https://beautiful-gate.vercel.app/"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,

  openGraph: {
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: siteURL,
    siteName: APP_NAME,
    images: ["/icons/icon192x192.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    creator: "@_lightpc_",
    images: ["/icons/icon192x192.png"],
    site: siteURL,
  },
  category: 'church',
  appLinks: {
    // ios: {
    //   url: 'https://nextjs.org/ios',
    //   app_store_id: 'app_store_id',
    // },
    // android: {
    //   package: 'com.example.android/package',
    //   app_name: 'app_name_android',
    // },
    web: {
      url: siteURL,
      should_fallback: true,
    },
  },
 
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen overflow-x-hidden `}>
          <ServiceWorkerRegisterer/>
          <ThemeProvider>
            <ConditionalLayout>
            {children}
            </ConditionalLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
