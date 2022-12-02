import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Home/Banner";
import Service from "@/components/Home/Service";
import PrayerSection from "@/components/Home/PrayerSection";
import Features from "@/components/Home/Features";
import HowRequest from "@/components/Home/HowRequest";

const styles = {
  container: `max-h-full max-w-full flex flex-col overflow-hidden select-none mb-10`,
};

const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Banner />
      <Service />
      <PrayerSection />
      <Features />
      <HowRequest />
      <Footer />
    </div>
  );
};

export default Home;
