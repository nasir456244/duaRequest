import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import Landing from "@/components/Landing";

const styles = {
  container: `max-h-full max-w-full flex flex-col overflow-hidden select-none`,
};

const Home = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Prayer request</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
      </Head>
      <Navbar />
      <Landing />
      <Footer />

    </div>
  );
};

export default Home;
