import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import TimeAgo from 'timeago-react';
import { collection, deleteDoc, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { MdDelete } from 'react-icons/md'
import DeleteModal from './DeleteModal';
import { DeletePrayer } from '../lib/db';
const styles = {
    listContainer: ` tracking-2 hover:shadow-2xl flex flex-col p-[4px] bg-[#e4e6e8] rounded-2xl break-words overflow-hidden max-w-full h-fit `,
  };

const MyPrayers = ({ name, createdAt, image, prayer, id, setIsDeleteModalOpen,setDeleteDua ,deleteDua}) => {
    const auth = getAuth()
    const [likes, setLikes] = useState()

    useEffect(
        () =>
          onSnapshot(collection(db, "Prayers", id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
          ),
        [id]
      );


    const deletePrayer = (id) => {
        if(!auth?.currentUser) return;
        setIsDeleteModalOpen(true)
        if(deleteDua === true) {
          const prayertoDelete = id;
          DeletePrayer(prayertoDelete)
          setDeleteDua(false)
        }
        setDeleteDua(false)
        return  
    }

  return (
    <div className={styles?.listContainer}>
        <div className="flex w-full items-center relative">
        <img className="rounded-[50%]  w-[40px] h-[40px]" src={image} />
        <p className="text-[18px] p-2">{name}</p>
        <p className='absolute right-6'>Delete</p>
        <MdDelete onClick={() => deletePrayer(id)} size={24} className='cursor-pointer text-[#f9072b] absolute right-0' />
      </div>
      <p className="text-[20px] p-2">{prayer}</p>
      <div className="flex flex-row items-center ml-2 relative top-[34px]">
      </div>
      <div className="flex justify-between text-[16px] p-2">
        <p className="text-[14px] pl-4">
            {likes?.length > 0 &&
            Intl.NumberFormat("en", { notation: "compact" }).format(
                likes?.length
            ) + " Prayers"}
        </p>
        <TimeAgo datetime={createdAt} />
      </div>

      
    </div>
  )
}

export default MyPrayers