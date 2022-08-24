import React, { useEffect, useState, useRef } from "react";
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
import useStateValue from "hooks/useStateValue";

const styles = {
  container: `w-full flex justify-center p-[12px] text-[srgb(192, 51, 51)] flex overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 max-w-[630px] sm:max-w-[700px] max-h-full`,
};

const Prayers = () => {
  const [totalSize, setTotalSize] = useState(0);
  const [prayers, setPrayers] = useState([]);
  const [lastKey, setLastKey] = useState("");
  const [isPrayerLoading, setIsPrayerLoading] = useState(true);
  const ref = useRef(true)
  const { changeState } = useStateValue()

  useEffect(() => {
    const firstRender = ref.current
    if (firstRender) {
      ref.current = false
      fetchData()
      return
    }
    getDocs(query(collection(db, "Prayers"),
      orderBy("createdAt", "desc"), limit(1))).then(data => {
        if (data.docs[0].id === prayers[0].id) return
        setPrayers([...data.docs.map(doc => ({ id: doc.id, ...doc.data() })), ...prayers]);
        setIsPrayerLoading(false);
        setTotalSize(totalSize + data?.docs.length);
      })

  }, [changeState.prayer]);

  const fetchData = async () => {
    const data = await getDocs(query(collection(db, "Prayers"),
      orderBy("createdAt", "desc"), limit(5)))
    setPrayers(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setIsPrayerLoading(false);
    setLastKey(data?.docs[data?.docs?.length - 1]);
    setTotalSize(data?.docs.length);

  }

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
      setPrayers([...prayers, ...data?.docs.map(doc => ({ id: doc.id, ...doc.data() }))]);
      setIsPrayerLoading(false);
      setLastKey(data?.docs?.length && data?.docs[data?.docs?.length - 1]);
      setTotalSize(totalSize + data?.docs.length);
    }
  };





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
            hasMore={prayers?.length <= totalSize}
          >
            {prayers?.map((prayer, index) => (
              <Prayer
                image={prayer?.image}
                name={prayer?.name}
                id={prayer?.id}
                key={prayer?.id + "" + index}
                address={prayer?.address}
                prayer={prayer?.prayer}
                timestamp={prayer?.createdAt?.toDate()}
              />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Prayers;
