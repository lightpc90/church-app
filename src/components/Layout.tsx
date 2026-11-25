"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { ConsentProvider } from "./consent/ConsentProvider";
import ConsentBanner from "./consent/ConsentBanner";

// Top-level route segments that render their own chrome (no public navbar/footer).
const NO_CHROME_SEGMENTS = new Set(["admin"]);

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() ?? "/";
  const showChrome = !NO_CHROME_SEGMENTS.has(pathname.split("/")[1] ?? "");

  if (!showChrome) return <>{children}</>;

  return (
    <ConsentProvider>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <ConsentBanner />
    </ConsentProvider>
  );
};

export default ConditionalLayout;
