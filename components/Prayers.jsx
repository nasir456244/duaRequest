import React, { useState, useContext } from "react";
import {
  limit,
} from "firebase/firestore";
import Prayer from "./Prayer";
import { PrayerRequestContext } from "@/context/PrayerRequest";
import PrayerSkeleton from './PrayerSkeleton';
import { useQuery } from "@tanstack/react-query";
import { getPrayers } from "queries/getAllPrayers";
import PostPrayerModal from "./PostPrayerModal";

const styles = {
  container: `w-full flex justify-center p-[12px] text-[srgb(192, 51, 51)] flex overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 max-w-[630px] sm:max-w-[700px] max-h-full`,
};

const Prayers = () => {
  const limit = 5;
  const [prayers, setPrayers] = useState([]);
  const { user } = useContext(PrayerRequestContext)
  const [lastDoc, setLastDoc] = useState();
  const [page, setPage] = useState(1);


  const { data, isLoading } = useQuery(
    ["Prayers", page],
    () => getPrayers(lastDoc, limit, user),
    {
      onSuccess(data) {
        const newData = data?.docs.map((doc) => ({
          id: doc?.id,
          ...doc?.data(),
        }));

        // filter exiting data
        const filteredData = prayers?.filter(
          (x) => !newData.find((y) => y.id === x.id)
        );

        setPrayers([...filteredData, ...newData]);
      },
      enabled: !!user,
      keepPreviousData: true,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const handleNextPage = () => {
    if (!data?.empty) {
      setPage(page + 1);
      setLastDoc(data?.docs[data?.docs?.length - 1]);
    }
  };

  const addClient = (doc) => {
    setPrayers((prev) => [doc, ...prev]);
  };

  const remClient = (id) => {
    return setPrayers((prev) => prev.filter((data) => data.id !== id));
  };

    return (
      <>
        {<PostPrayerModal addClient={addClient} />}
      <div className={styles.container}>
        {user ?
          <>

          { isLoading ?
              <PrayerSkeleton />
              :
              
              <div className={styles.listMainContainer}>
                  {prayers?.map((prayer) => (
                    <Prayer
                    image={prayer?.image}
                    name={prayer?.name}
                    id={prayer?.id}
                    key={prayer?.id}
                    uid={prayer?.uid}
                    prayer={prayer?.prayer}
                    remClient={remClient}
                    timestamp={prayer?.createdAt?.seconds ? prayer?.createdAt?.toDate() : null}
                    />
                    ))}
                <div className="flex m-4 gap-4">
                  <button
                    disabled={!!data?.empty}
                    className="middle none font-sans font-bold center uppercase transition-all  disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-cyan-500 px-4 text-white disabled:bg-gray-300"
                    onClick={handleNextPage}
                  >
                    Load More
                  </button>
                </div>
                
              </div>
              
            }
          
          
        </>
        :
        <PrayerSkeleton />        
        }    
      </div>
        </>
    );
        

};

export default Prayers;
