import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../lib/firebaseConfig";
import MyPrayers from "../components/MyPrayers";
import PrayerSkeleton from "../components/PrayerSkeleton";
import { PrayerRequestContext } from "../context/PrayerRequest";

const styles = {
  container: `w-full flex justify-center p-[12px] text-[#27425d]  overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 p-2 gap-[12px] max-w-full sm:max-w-[700px] max-h-full`,
};

const MyPrayer = () => {
  const [prayers, setPrayers] = useState();
  const [isMyPrayerLoading, setIsMyPrayerLoading] = useState(true);
  const { user } = useContext(PrayerRequestContext);

  // const { data, error } = useSWR(user ? ['/api/MyPrayers', user.token] : null , fetcher)

  // console.log(error)
  // // console.log(data?.map((item) => item.createdAt))

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Prayers"), orderBy("createdAt", "desc")),
        (snapshot) => {
          const data = snapshot?.docs?.filter(
            (data) => data.data().address === user?.email
          );
          setPrayers(data);
          setIsMyPrayerLoading(false);
        }
      ),
    [user]
  );

  return (
    <>
      <Navbar />

      <h2>My Prayers </h2>
      <div className={styles.container}>
        {isMyPrayerLoading ? (
          <PrayerSkeleton />
        ) : (
          <div className={styles?.listMainContainer}>
            {prayers?.map((item) => (
              <MyPrayers
                key={item?.id}
                name={item?.data()?.name}
                prayer={item?.data()?.prayer}
                createdAt={item?.data()?.createdAt?.toDate()}
                image={item?.data()?.image}
                id={item?.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyPrayer;
