import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Prayers from "../components/Prayers";
import PostPrayerModal from "../components/PostPrayerModal";
import Head from "next/head";
import { PrayerRequestContext } from "@/context/PrayerRequest";
import Footer from "@/components/Footer";

const styles = {
  container: `max-h-full max-w-full flex flex-col overflow-x-hidden select-none`,
};

const Home = () => {
  const { user } = useContext(PrayerRequestContext)
  const isPaidAccount = user?.stripeRole !== "free"


  return (
    <div className={styles.container}>
      <Head>
        <title>Prayer request</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
      </Head>
      {user && isPaidAccount &&
        <>
          <Toaster position="bottom-center" reverseOrder={false} />
          <Navbar />
          {<PostPrayerModal />}
          <Prayers />
          <Footer />
        </>
      }
    </div>
  );
};

export default Home;
