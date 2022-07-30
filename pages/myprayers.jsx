import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { db } from '../lib/firebaseConfig';
import MyPrayers from '../components/MyPrayers';
import PrayerSkeleton from '../components/PrayerSkeleton'
import DeleteModal from '../components/DeleteModal';
import { PrayerRequestContext } from '../context/PrayerRequest';

const styles = {
  container: `w-full flex justify-center p-[12px] text-[#27425d]  overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 p-2 gap-[12px] max-w-full sm:max-w-[700px] max-h-full`,
};

const MyPrayer = () => {
    const [prayers, setPrayers] = useState()
    const [isMyPrayerLoading, setIsMyPrayerLoading] = useState(true);
    const { isDeleteModalOpen, user, setIsDeleteModalOpen, deleteDua, setDeleteDua} = useContext(PrayerRequestContext)



    useEffect(
        () =>
          onSnapshot(
            query(collection(db, "Prayers"), orderBy("createdAt", "desc")),
            (snapshot) => { setPrayers(snapshot?.docs?.filter((data) => 
              data?._document?.data?.value?.mapValue?.fields?.
              address?.stringValue == user.email));
              setIsMyPrayerLoading(false)
            }
          ),
        []
      );

  return (
    <>
    {isDeleteModalOpen && 
      <DeleteModal setDeleteDua={setDeleteDua} setIsDeleteModalOpen={setIsDeleteModalOpen} />
    }

      <Navbar />
      
      
        <h2>My Prayers </h2>
        <div className={styles.container}>
          {isMyPrayerLoading ? 
            <PrayerSkeleton />
        
            :
      
            <div className={styles?.listMainContainer}>

                {prayers?.map((item) => (
                  <MyPrayers key={item?.id}
                  name={item?.data()?.name}
                  prayer={item?.data()?.prayer}
                  createdAt={item?.data()?.createdAt?.toDate()}
                  image={item?.data()?.image}
                  id={item?.id}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  deleteDua={deleteDua}
                  setDeleteDua={setDeleteDua}
        
                  />
                  ))}
            </div>
          }

        </div>
     
    </>
  )
}

export default MyPrayer