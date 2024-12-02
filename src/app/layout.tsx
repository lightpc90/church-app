import {
  ClerkProvider,
} from "@clerk/nextjs";

import type { Metadata, Viewport } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/Layout";
import { ThemeProvider } from "@/components/context-providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "RCCG Beautiful Gate Progressive Web App"
const APP_DEFAULT_TITLE = "Beautiful Gate Parish"
const APP_TITLE_TEMPLATE = "%s - Progressive Web App"
const APP_DESCRIPTION = "A Progressive Web App for RCCG Beautiful Gate"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,

  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    creator: "@_lightpc_",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
          <ThemeProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
