import React from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";

const styles = {
  container: `max-h-full max-w-full flex flex-col overflow-x-hidden select-none`,
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

    </div>
  );
};

export default Home;
