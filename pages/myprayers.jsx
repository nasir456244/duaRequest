import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  limit,
  getDocs,
  startAfter
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../lib/firebaseConfig";
import MyPrayers from "../components/MyPrayers";
import PrayerSkeleton from "../components/PrayerSkeleton";
import { PrayerRequestContext } from "../context/PrayerRequest";
import InfiniteScroll from "react-infinite-scroller";

const styles = {
  container: `w-full flex justify-center p-[12px] text-[#27425d]  overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 p-2 gap-[12px] max-w-full sm:max-w-[700px] max-h-full`,
};

const MyPrayer = () => {
  const [totalSize, setTotalSize] = useState(0);
  const [prayers, setPrayers] = useState([]);
  const [lastKey, setLastKey] = useState("");
  const [isPrayerLoading, setIsPrayerLoading] = useState(true);
  const { user } = useContext(PrayerRequestContext);

 


  const fetchMoreData = async () => {
    const queryParams = user?.uid && [
      collection(db, "Prayers"),
      where('uid', '==', user?.uid),
      orderBy("createdAt", "desc"),
      limit(5),
    ];
    if (lastKey) {
      queryParams.push(startAfter(lastKey));
      const q = query(...queryParams);
      const data = await getDocs(q);
      setPrayers([...prayers, ...data?.docs]);
      setLastKey(data?.docs?.length && data?.docs[data?.docs?.length - 1]);
      setIsPrayerLoading(false);
    }
  };

  const FetchPrayers = async (key) => {
    const queryParams = user?.uid && [
      collection(db, "Prayers"),
      where('uid', '==', user?.uid),
      orderBy("createdAt", "desc"),
      limit(5),
    ];
    const q = queryParams && query(...queryParams);
    const data = q && await getDocs(q);
    data?.docs && setPrayers([...prayers, ...data?.docs]);
    setLastKey(data?.docs[data?.docs?.length - 1]);
    setIsPrayerLoading(false);
  };

  useEffect( () => {
    const unsub = onSnapshot(query(collection(db, "Prayers")), (snapshot) => {
      setTotalSize(snapshot?.size);
      FetchPrayers();
    });
    return () => unsub();
    
  },[user?.uid]);

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {isPrayerLoading ? (
          <PrayerSkeleton />
        ) : (
          <div className={styles?.listMainContainer}>
            <InfiniteScroll
            loadMore={fetchMoreData}
            hasMore={prayers?.length <= totalSize}
          >
            {prayers?.map((prayer, index) => (
              <MyPrayers
                image={prayer?.data()?.image}
                name={prayer?.data()?.name}
                id={prayer?.id}
                key={prayer?.id + "" + index}
                address={prayer?.data()?.address}
                prayer={prayer?.data()?.prayer}
                createdAt={prayer?.data()?.createdAt?.toDate()}
              />
            ))}
          </InfiniteScroll>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPrayer;
