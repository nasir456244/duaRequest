import {
  collection,
  orderBy,
  query,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../lib/firebaseConfig";
import MyPrayers from "../components/MyPrayers";
import PrayerSkeleton from "../components/PrayerSkeleton";
import { PrayerRequestContext } from "../context/PrayerRequest";
import InfiniteScroll from "react-infinite-scroller";
import _, { delay } from "lodash";
import { DeletePrayer } from "@/lib/db";
import Footer from "@/components/Footer";
import Link from "next/link";

const styles = {
  container: `w-full flex justify-center p-[12px] text-[#27425d]  overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 p-2 gap-[12px] max-w-full sm:max-w-[700px] max-h-full`,
  setting: `w-[600px] bg-[#fff] sm:mb-[40px] md:mb-[100px] h-[220px] animate-pulse pb-4 shadow-2xl rounded-[4px] `,
  top: `w-full bg-[#F7FAFC] border-b-2 border-[#E2E8F0] flex items-center justify-between p-5 shadow-2xl rounded-[4px]`,
  buttons: `w-full relative top-9 flex items-center justify-end pr-3`,
};

const MyPrayer = () => {
  const [totalSize, setTotalSize] = useState(0);
  const [prayers, setPrayers] = useState([]);
  const [lastKey, setLastKey] = useState("");
  const [isPrayerLoading, setIsPrayerLoading] = useState(true);
  const { user } = useContext(PrayerRequestContext);
  const isPaidAccount = user?.stripeRole !== "free"



  const fetchMoreData = async () => {
    if(!user) return;
    if(!isPaidAccount) return;
    const queryParams = [
      collection(db, "Prayers"),
      orderBy("createdAt", "desc"),
      limit(2),
    ];
    if (lastKey) {
      queryParams.push(startAfter(lastKey));
      const q = query(...queryParams);
      const data = await getDocs(q);
      const prayerDocs = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const sortedDocs = _.filter(prayerDocs, (doc) => doc.uid === user.uid)
      setTimeout(() => {

        setPrayers([...prayers, ...sortedDocs]);
        setIsPrayerLoading(false);
        setLastKey(data?.docs[data?.docs?.length - 1]);
        setTotalSize(totalSize + sortedDocs.length)
      },500)
    }
  };


  
    useEffect(() => {
      if(!user) return;
      if(!isPaidAccount) return;
      const fetchPrayers = async () => {
        const queryParams = [
          collection(db, "Prayers"),
          orderBy("createdAt", "desc"), limit(5)
        ];
        const q = query(...queryParams);
        const data = await getDocs(q)
        const prayerDocs = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const sortedDocs = _.filter(prayerDocs, (doc) => doc.uid === user.uid)
        setPrayers(sortedDocs);
        setLastKey(data?.docs[data?.docs?.length - 1]);
        delay(() => setIsPrayerLoading(false),160);
        setTotalSize(sortedDocs.length)
      };
      if (user?.uid && isPaidAccount) {
        fetchPrayers()
      }

    }, [user?.uid]);
  
  const deleteConfirmation = async (event, deletePrayerID) => {
    if(!user) return;
    if(!isPaidAccount) return;
    if (event) {
      await DeletePrayer(deletePrayerID)
      setPrayers(prayers.filter(prayer => prayer.id !== deletePrayerID))
    }

  };

  return (
    <>
      <Navbar />
      {user && isPaidAccount ?
        <div className={styles.container}>
          {isPrayerLoading ? (
            <PrayerSkeleton />
          ) : (
            <div className={styles?.listMainContainer}>
              <InfiniteScroll
                loadMore={fetchMoreData}
                hasMore={prayers?.length <= totalSize}
                threshold={10}
              >
                {prayers?.map((prayer, index) => (
                  <MyPrayers
                    deleteConfirmation={deleteConfirmation}
                    image={prayer?.image}
                    name={prayer?.name}
                    id={prayer?.id}
                    key={prayer?.id + "" + index}
                    address={prayer?.address}
                    prayer={prayer?.prayer}
                    createdAt={prayer?.createdAt?.toDate()}
                  />
                ))}
              </InfiniteScroll>
            </div>
          )}
        </div>
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

    </>
  );
};

export default MyPrayer;
