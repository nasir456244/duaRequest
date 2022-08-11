import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Prayers from "../components/Prayers";
import PostPrayerModal from "../components/PostPrayerModal";
import { PrayerRequestContext } from "../context/PrayerRequest";
import Head from "next/head";

const styles = {
  container: `max-h-full max-w-full flex flex-col overflow-x-hidden select-none`,
  empty: "hidden",
  show: `flex`,
  buyRPCContainer: `bg-[#044895e0] z-50 fixed bottom-[40px] left-[40px] flex justify-center items-center text-white rounded-2xl `,
  BuyRPCButton: `text-[1.2rem] bg-[#1a0a83e0] flex items-center p-[15px] rounded-2xl h-[50px] hover:bg-[#08a645e0] hover:text-[#fff]`,
};

const Home = () => {
  const { user } = useContext(PrayerRequestContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Support</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      {<PostPrayerModal />}
      <Prayers />
    </div>
  );
};

export default Home;
