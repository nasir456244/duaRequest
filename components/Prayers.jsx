import React, { useEffect, useState } from "react";
import PrayerSkeleton from "./PrayerSkeleton";
import { db } from "../lib/firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Prayer from "./Prayer";

const styles = {
  container: `w-full flex justify-center p-[12px] text-[#27425d] flex overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 p-2 gap-[12px] max-w-full sm:max-w-[700px] max-h-full`,
};

const Prayers = () => {
  const [prayers, setPrayers] = useState([]);
  const [isPrayerLoading, setIsPrayerLoading] = useState(true);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Prayers"), orderBy("createdAt", "desc")),
        (snapshot) => {
          setPrayers(snapshot.docs.filter((data) => data.id !== "defaultDoc"));
          setIsPrayerLoading(false);
        }
      ),
    []
  );

  return (
    <div className={styles.container}>
      {isPrayerLoading ? (
        <>
          <PrayerSkeleton />
        </>
      ) : (
        <div className={styles.listMainContainer}>
          {prayers?.map((prayer) => (
            <Prayer
              image={prayer?.data()?.image}
              name={prayer?.data()?.name}
              id={prayer.id}
              key={prayer.id}
              address={prayer.data().address}
              prayer={prayer.data().prayer}
              timestamp={prayer.data().createdAt?.toDate()}

              
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Prayers;
