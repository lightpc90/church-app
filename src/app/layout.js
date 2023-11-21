import "./globals.css";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import AuthProvider from "@/context/globalState";
import ToasterContext from "@/context/toasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beautiful Gate App",
  description: "Church Website and Data Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Layout>
            <ToasterContext />
            {children}
          </Layout>
        </body>
      </AuthProvider>
    </html>
  );
}
