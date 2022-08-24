import React, { useState, useEffect, useContext } from "react";
import TimeAgo from "timeago-react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { FaCommentAlt, FaSmileWink } from "react-icons/fa";
import { db } from "../lib/firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  limitToLast,
} from "firebase/firestore";
import { HiPaperAirplane } from "react-icons/hi";
import { useRouter } from "next/router";
import { PrayerRequestContext } from "@/context/PrayerRequest";
import { addComment, likePrayer } from "@/lib/db";

const styles = {
  listContainer: `hover:shadow-2xl my-[6px] flex flex-col bg-[#ffffff] rounded-2xl break-words overflow-hidden h-fit`,
};
const Prayer = ({ address, id, prayer, timestamp, name, image }) => {
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { user } = useContext(PrayerRequestContext)


  useEffect(
    () =>
      onSnapshot(collection(db, "Prayers", id, "likes"), (snapshot) =>
        setLikes(snapshot?.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes?.findIndex((like) => like?.id === user?.uid) !== -1
      ),
    [likes, user]
  );

  const likepost = () => {
    if (!user) return;
    if (!hasliked)  likePrayer(id, user?.uid);
    return;
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "Prayers", id, "comments"),
          orderBy("createdAt", "asc"),
          limitToLast(3)
        ),
        (snapshot) => setComments(snapshot?.docs)
      ),
    []
  );

  const sendComment = (e) => {
    e.preventDefault();
    if (!user) return;

    const commentToSend = comment;
    setComment("");

    const newComment = {
      address: user?.email,
      name: user?.name,
      comment: commentToSend?.slice(0, 250),
      createdAt: serverTimestamp(),
      image: user?.image,
      uid: user?.uid

    }
    addComment(id, newComment)

    return;
  };

  return (
    <div className={styles.listContainer}>
      <div className="flex  justify-center p-4 mx-4">
    
        <img className="flex rounded-[50%] w-[42px] h-[42px]" src={image} />
        
        <div className="flex flex-col w-full ml-2 ">
          <div className="flex justify-between items-center ">
            <p className="font-semibold text-[14px] text-[#000000] not-italic ">{name}</p>
            <TimeAgo datetime={timestamp} className="font-medium text-xs pr-[4px]" />
          </div>
          <p className="font-medium text-[#8C8C8C] pr-[4px] " >{prayer}</p>
          <div className="flex mt-4 rounded-lg ">
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
                <p  className="mt-[2px] mx-[8px] text-[#0ABEEE] sm:hidden">Pray</p>
              ) : (
                <p className="mt-[2px]  mx-[8px] text-[#8C8C8C] sm:hidden">Pray</p>
              )}

              <FaCommentAlt
                src={image}
                atl="comment"
                className="cursor-pointer mx-2 mt-[2px] text-[22px] sm:text-[35px] text-[#ADADAD]"
                onClick={() => {
                  router.push(`/comment/${id}`);
                }}
              />
              <p onClick={() => {
                  router.push(`/comment/${id}`);
                }} className=" mt-[2px] cursor-pointer text-[#8C8C8C] sm:hidden">Comments</p>
            </div>
            <div className="flex w-[333px] relative  top-1 overflow-hidden justify-between items-center bg-[#F2F2F2] p-3 h-[38px] rounded-md">
              <FaSmileWink className="text-[#8C8C8C] text-[25px] sm:text-[42px]" />
              <input
                disabled={!user}
                required
                maxLength={60}
                minLength={1}
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target?.value);
                }}
                placeholder={` ${user ? "Write a comment" : "Login to comment"
                  }`}
                className="w-[344px] bg-[#f2f2f2] border-nonfocus:ring-0 outline-none m-[15px] overflow-hidden	"
              />
              <button
                type="submit"
                size={25}
                disabled={!comment?.trim()}
                onClick={sendComment}
                className={`${!comment || !user
                  ? "flex text-[#8C8C8C]"
                  : "flex text-[#112EA0] cursor-pointer transition-all ease-out duration-300 hover:scale-105"
                  }  rotate-90  `}
              >
                <HiPaperAirplane size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {likes?.length > 0 ? 
        <p className="text-[13px] font-semibold pl-5 pb-3 pt-3 bg-opacity-100 bg-[#f1f1f1] w-full">
          {likes?.length > 0 &&
            Intl.NumberFormat("en", { notation: "compact" }).format(
              likes?.length
              ) + " Prayers"}
        </p>
        :
        <p className="text-[13px] font-semibold pl-5 pb-3 pt-3 bg-opacity-100 bg-[#f1f1f1] w-full">
          0 Prayers
        </p>
      }

      <div className=" bg-opacity-100 bg-[#f1f1f1] flex flex-col max-w-full max-h-full">

      {comments?.map((comment) => (
        <div
          key={comment?.id}
          className="flex p-4 pt-4 max-h-full  overflow-hidden max-w-full"
          >
          <img
            src={`${comment?.data()?.image}`}
            alt="profile"
            className="rounded-[50%] ml-1 h-[40px] w-[40px]"  
            />
          
          <div className="flex-1 flex-row w-64 ml-2">
            <p className="font-semibold text-[14px] text-[#000000] not-italic">{comment?.data()?.name}</p>
            <p className="text-[14px] text-[#8C8C8C] sm:w-[180px] text-ellipsis whitespace-nowrap overflow-hidden w-full">
              {comment?.data()?.comment}
            </p>
          </div>

          <div className="flex w-max h-max overflow-hidden">
            <p className="font-medium w-max h-max flex justify-end text-xs leading-4	drop-shadow-3xl">
              <TimeAgo datetime={comment?.data()?.createdAt?.toDate()} />
            </p>
          </div>
        </div>
      ))}
      </div>
      

    </div>
  );
};

export default Prayer;
