import React from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Prayers from "../components/Prayers";
import PostPrayerModal from "../components/PostPrayerModal";
import Head from "next/head";

const styles = {
  container: `max-h-full max-w-full flex flex-col overflow-x-hidden select-none`,
};

const Home = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Support</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
      </Head>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />

      {<PostPrayerModal />}
      <Prayers />
    </div>
  );
};

export default Home;
