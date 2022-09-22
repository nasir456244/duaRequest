import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Prayers from "../components/Prayers";
import PostPrayerModal from "../components/PostPrayerModal";
import { PrayerRequestContext } from "@/context/PrayerRequest";
import Footer from "@/components/Footer";
import Link from "next/link";

const styles = {
  container: `max-w-full flex flex-col overflow-x-hidden select-none`,
  setting: `w-[600px] bg-[#fff] sm:mb-[40px] md:mb-[100px] h-[220px] animate-pulse pb-4 shadow-2xl rounded-[4px] `,
  top: `w-full bg-[#F7FAFC] border-b-2 border-[#E2E8F0] flex items-center justify-between p-5 shadow-2xl rounded-[4px]`,
  buttons: `w-full flex items-center justify-end pr-3`,
};

const Home = () => {
  const { user } = useContext(PrayerRequestContext)
  const isPaidAccount = user?.stripeRole !== "free"

  return (
    <div className={styles.container}>
      <Navbar />
      {user && isPaidAccount ?
        <>
          <Toaster position="bottom-center" reverseOrder={false} />
          {<PostPrayerModal />}
          <Prayers />
        </>
        :
        <div className="w-full h-[85vh] flex items-center justify-center">
          <div className={styles.setting}>
              <div className={styles.top}>
                <p className='text-[#718096] font-semibold text-[14px] not-italic'>SETTINGS</p>
                <p className='bg-[#ceedff] text-[13px] not-italic px-1 font-semibold text-[#153e75] uppercase'></p>
              </div>

              <div>
                <p className='font-medium p-5'>{!user ? 'Login to see other duas and to request your dua.' : user && !isPaidAccount && 'one step away, get subscription to start requesting dua. go to dashboard'} </p>
              </div>

              <div className={styles.buttons}>
                <Link href={`${!user ? '/login' : user && !isPaidAccount && '/dashboard'}`} >
                  <a className='bg-[#EDF2F7] font-medium text-[15px] mr-1 rounded-[5px] py-[9px] px-4'>{!user ? 'Log in' : user && !isPaidAccount && 'dashboard'}</a>
                </Link>
              </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  );
};

export default Home;
