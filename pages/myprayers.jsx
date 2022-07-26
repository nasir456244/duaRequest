import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { db } from '../lib/firebaseConfig';
import { getAuth } from 'firebase/auth';
import MyPrayers from '../components/MyPrayers';
import PrayerSkeleton from '../components/PrayerSkeleton'
import DeleteModal from '../components/DeleteModal';

const styles = {
  container: `w-full flex justify-center p-[12px] text-[#27425d]  overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 p-2 gap-[12px] max-w-full sm:max-w-[700px] max-h-full`,
};

const MyPrayers = () => {
    const [myprayers, setMyPrayers] = useState()
    const auth = getAuth()
    const [isMyPrayerLoading, setIsMyPrayerLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleteDua, setDeleteDua] = useState()



    useEffect(
        () =>
          onSnapshot(
            query(collection(db, "Prayers"), orderBy("createdAt", "desc")),
            (snapshot) => { setMyPrayers(snapshot?.docs?.filter((data) => 
              data?._document?.data?.value?.mapValue?.fields?.
              address?.stringValue == auth?.currentUser?.email));
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

                {myprayers?.map((item) => (
                  <MyPrayers key={item?.id}
                  address={item?.data()?.address}
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

export default My