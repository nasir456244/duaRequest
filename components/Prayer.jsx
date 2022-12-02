import React, { useState, useEffect, useContext } from "react";
import TimeAgo from "timeago-react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { db } from "../lib/firebaseConfig";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { PrayerRequestContext } from "@/context/PrayerRequest";
import { DeletePrayer, likePrayer } from "@/lib/db";
import Image from "next/image";
import CommentsModal from './CommentsModal'
import { ImBin2 } from "react-icons/im";
import DeleteModal from "./DeleteModal";
import { useMutation } from "@tanstack/react-query";

const styles = {
  listContainer: `hover:shadow-2xl my-[6px] max-w-full flex flex-col bg-[#ffffff] rounded-2xl break-words overflow-hidden max-h-full`,
};

const Prayer = ({ uid, id, prayer, timestamp, name, image, remClient }) => {
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasLiked] = useState(false);
  const { user } = useContext(PrayerRequestContext)
  const [isdeleteprayerId, setDeletePrayerID] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    useEffect(
      () =>
        {user && setHasLiked(
          likes?.findIndex((like) => like?.id === user?.uid) !== -1
        )},
      [likes, user]
    );
    


    const showLikes = async () => {
      if(!user) return;
      getDocs(collection(db, "Prayers", id, "likes")).then(data => {
        setLikes([...data.docs.map(doc => ({ id: doc.id, ...doc.data() }))]);
      });
      return;
    }


    useEffect(() => {
      if(!user) return;
        showLikes();      
    },[])


  const likepost = () => {
    if(!user) return;
    if (hasliked) return;
    likePrayer(id, user?.uid);
    setLikes([...likes, {id:user?.uid, uid: user?.uid}]);
    const check = parseInt(localStorage.getItem(user?.uid));
    if(check && check <= 5) localStorage.setItem(user?.uid, check - 1);
    if(check && check == 1) localStorage.removeItem(user?.uid);
    return;
  };


  const deletePrayer = (id) => {
    if (!user) return;
    setIsDeleteModalOpen(true);
    setDeletePrayerID(id);
    return;
  };

  const removeClientMutation = useMutation(DeletePrayer, {
    onSuccess: () => {
      remClient(id);
    },
  });

  const deleteConfirmation = (event, id) => {
    if(!user) return;
    if (event) {
      return removeClientMutation.mutate(id)
    }

  };


  return (
        <div className={styles.listContainer}>
          {user &&
            <>
            {isDeleteModalOpen && (
              <DeleteModal
                setDeleteDua={(e) => deleteConfirmation(e, id)}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            )}
              <div className="flex justify-start px-3 py-2 gap-3 max-w-full overflow-hidden">
                <div className="rounded-[50%] h-max w-max">
                  <Image layout="fixed"  height={42} alt='profile' width={42} className="flex rounded-[50%]" src={image} />
                </div>
                
                <div className="flex flex-col w-full overflow-hidden ">
                  <div className="flex justify-between items-center ">
                    <p className="font-semibold text-[14px] text-[#000000] not-italic ">{name}</p>
                    <TimeAgo datetime={timestamp} className="font-medium text-xs pr-[4px]" />
                  </div>
                  <p className="font-medium text-[#8C8C8C] pr-[4px]  overflow-hidden w-full " >{prayer}</p>
                  <div className="flex mt-4 rounded-lg justify-between ">
                    <div className="flex overflow-hidden justify-start px-2 items-center h-12  ">
                      {user && hasliked ? (
                        <BsFillSuitHeartFill
                          className={` flex text-[25px] sm:mr-1  sm:text-[45px] text-[#0ABEEE] ${!user && "cursor-not-allowed "
                            }`}
                          disabled={!user}
                          onClick={likepost}
                        />
                      ) : (
                        <BsFillSuitHeartFill
                          disabled={!user}
                          onClick={likepost}
                          className={`${!user
                            ? "cursor-not-allowed text-[25px] sm:mr-1 text-[#ADADAD] sm:text-[45px] "
                            : "hover:scale-125 text-[25px] sm:mr-1 sm:text-[45px] cursor-pointer text-[#ADADAD] transition-all duration-150 ease-out cursor-pointer"
                            } mt-[2px]`}
                        />
                      )}
                      {user && hasliked ? (
                        <p  className="mt-[2px] mx-[8px] text-[#0ABEEE] sm:hidden">Prayed</p>
                      ) : (
                        <p className="mt-[2px]  mx-[8px] text-[#8C8C8C] sm:hidden">Pray</p>
                      )}
                      <CommentsModal id={id} uid={uid} />

                    </div>
                    {uid === user?.uid && (

                      <div
                      className="flex items-center cursor-pointer"
                      onClick={() => deletePrayer(id)}
                      >
                        <ImBin2 className=" w-[15.75px] h-[18px] text-[#f9072b] " />
                        <p className="font-semibold text-[14px] leading-5 text-[#f9072b] ml-2">
                          Delete
                        </p>
                      </div>
                    )}
                    
                  </div>
                </div>
              </div>
              
              {likes?.length > 0 ? 
                <p className="text-[13px] font-semibold pl-5 pb-3 pt-3 bg-opacity-100 bg-[#f1f1f1] w-full">
                  {likes?.length > 0 &&
                    Intl.NumberFormat("en", { notation: "compact" }).format(
                      likes?.length
                      ) + ' Prayers'}
                </p>
                :
                <p className="text-[13px] font-semibold pl-5 pb-3 pt-3 bg-opacity-100 bg-[#f1f1f1] w-full">
                  0 Prayers
                </p>
              }     
             
            </>
          }
        </div>
  );
};

export default Prayer;
