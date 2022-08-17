import React, { useEffect, useState } from "react";
import PrayerSkeleton from "./PrayerSkeleton";
import { db } from "../lib/firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  query,
  startAfter,
  getDocs,
} from "firebase/firestore";
import Prayer from "./Prayer";
import InfiniteScroll from "react-infinite-scroller";

const styles = {
  container: `w-full flex justify-center p-[12px] text-[srgb(192, 51, 51)] flex overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 max-w-[630px] sm:max-w-[700px] max-h-full`,
};

const Prayers = () => {
  const [totalSize, setTotalSize] = useState(0);
  const [prayers, setPrayers] = useState([]);
  const [lastKey, setLastKey] = useState("");
  const [isPrayerLoading, setIsPrayerLoading] = useState(true);

  const fetchMoreData = async () => {
    const queryParams = [
      collection(db, "Prayers"),
      orderBy("createdAt", "desc"),
      limit(5),
    ];
    if (lastKey) {
      queryParams.push(startAfter(lastKey));
      const q = query(...queryParams);
      const data = await getDocs(q);
      setPrayers([...prayers, ...data.docs]);
      setIsPrayerLoading(false);
      setLastKey(data.docs.length && data.docs[data.docs.length - 1]);
    }
  };

  const FetchPrayers = async (key) => {
    const queryParams = [
      collection(db, "Prayers"),
      orderBy("createdAt", "desc"),
      limit(5),
    ];
    const q = query(...queryParams);
    const data = await getDocs(q);
    setPrayers([...prayers, ...data.docs]);
    setIsPrayerLoading(false);
    setLastKey(data.docs[data.docs.length - 1]);
  };

  useEffect( () => {
    const unsub = onSnapshot(query(collection(db, "Prayers")), (snapshot) => {
      setTotalSize(snapshot.size);
      FetchPrayers();
    });
    return () => unsub();
    
  },[]);

  return (
    <div className={styles.container}>
      {isPrayerLoading ? (
        <>
          <PrayerSkeleton />
        </>
      ) : (
        <div className={styles.listMainContainer}>
          <InfiniteScroll
            loadMore={fetchMoreData}
            hasMore={prayers.length <= totalSize}
          >
            {prayers?.map((prayer, index) => (
              <Prayer
                image={prayer?.data()?.image}
                name={prayer?.data()?.name}
                id={prayer.id}
                key={prayer.id + "" + index}
                address={prayer.data().address}
                prayer={prayer.data().prayer}
                timestamp={prayer.data().createdAt?.toDate()}
              />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Prayers;
