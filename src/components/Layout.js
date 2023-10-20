import React from "react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>RCCG Beautiful Gate</title>
      </Head>
      <div className="flex flex-col min-h-screen justify-between">
        <Nav />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
