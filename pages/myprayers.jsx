import {
  collection,
  orderBy,
  query,
  where,
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
import _ from "lodash";

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
    const queryParams = [
      collection(db, "Prayers"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(5),
    ];
    if (lastKey) {
      queryParams.push(startAfter(lastKey));
      const q = query(...queryParams);
      const data = await getDocs(q);
      const prayerDocs = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      // const sortedDocs = _.filter(prayerDocs, (doc) => doc.uid === user.uid)
      setPrayers([...prayers, ...prayerDocs]);
      setLastKey(data?.docs[data?.docs?.length - 1]);
      setIsPrayerLoading(false);
      setTotalSize(totalSize + prayerDocs.length)
    }
  };



  useEffect(() => {
    const fetchPrayers = async () => {
      const queryParams = [
        collection(db, "Prayers"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"), limit(5)
      ];
      const q = query(...queryParams);
      const data = await getDocs(q)
      const prayerDocs = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      // const sortedDocs = _.filter(prayerDocs, (doc) => doc.uid === user.uid)
      setPrayers(prayerDocs);
      setLastKey(data?.docs[data?.docs?.length - 1]);
      setIsPrayerLoading(false);
      setTotalSize(prayerDocs.length)
    };
    if (user?.uid) {
      fetchPrayers()
    }

  }, [user?.uid]);

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
    </>
  );
};

export default MyPrayer;
