import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Prayers from "../components/Prayers";
import Footer from "@/components/Footer";

const styles = {
  container: `max-w-full flex flex-col overflow-x-hidden select-none`,
  setting: `w-[600px] bg-[#fff] sm:mb-[40px] md:mb-[100px] h-[220px] animate-pulse pb-4 shadow-2xl rounded-[4px] `,
  top: `w-full bg-[#F7FAFC] border-b-2 border-[#E2E8F0] flex items-center justify-between p-5 shadow-2xl rounded-[4px]`,
  buttons: `w-full flex items-center justify-end pr-3`,
};

const Home = () => {
  
  return (
    <div className={styles.container}>
      <Navbar /> 
      <Prayers />
      <Footer />
    </div>
  );
};

export default Home;
