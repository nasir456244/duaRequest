import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { db } from '../lib/firebaseConfig';
import MyPrayers from '../components/MyPrayers';
import PrayerSkeleton from '../components/PrayerSkeleton'
import DeleteModal from '../components/DeleteModal';
import { PrayerRequestContext } from '../context/PrayerRequest';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const styles = {
  container: `w-full flex justify-center p-[12px] text-[#27425d]  overflow-x-hidden`,
  listMainContainer: `grid mb-[65px] grid-cols-1 p-2 gap-[12px] max-w-full sm:max-w-[700px] max-h-full`,
};

const MyPrayer = () => {
    const [prayers, setPrayers] = useState()
    const [isMyPrayerLoading, setIsMyPrayerLoading] = useState(true);
    const { isDeleteModalOpen, user, setIsDeleteModalOpen, deleteDua, setDeleteDua} = useContext(PrayerRequestContext)


    const { data, error } = useSWR(user ? ['/api/MyPrayers', user.token] : null , fetcher)

    console.log(error)
    // console.log(data?.map((item) => item.createdAt))


    // useEffect(
    //     () =>
    //       onSnapshot(
    //         query(collection(db, "Prayers"), where('uid', '==', user?.uid), orderBy("createdAt", "desc")),
    //         (snapshot) => { setPrayers(snapshot?.docs)
    //           // ?.filter((data) => 
    //           // data?._document?.data?.value?.mapValue?.fields?.
    //           // address?.stringValue == user.email
    //           // ));
    //           setIsMyPrayerLoading(false)
    //         }
    //       ),
    //     []
    //   );

  return (
    <>
    {isDeleteModalOpen && 
      <DeleteModal setDeleteDua={setDeleteDua} setIsDeleteModalOpen={setIsDeleteModalOpen} />
    }

      <Navbar />
      
      
        <h2>My Prayers </h2>
        <div className={styles.container}>
          {/* {!data ? 
            <PrayerSkeleton />
        
            :
      
            <div className={styles?.listMainContainer}>

                {data?.map((item) => (
                  <MyPrayers key={item?.id}
                  name={item?.name}
                  prayer={item?.prayer}
                  createdAt={item?.createdAt}
                  image={item?.image}
                  id={item?.id}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  deleteDua={deleteDua}
                  setDeleteDua={setDeleteDua}
        
                  />
                  ))}
            </div>
          } */}

        </div>
     
    </>
  )
}

export default MyPrayer