import React, { useState, useEffect, useContext } from "react";
import TimeAgo from "timeago-react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { db } from "../lib/firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  limitToLast,
} from "firebase/firestore";
import { BsEmojiSmile } from "react-icons/bs";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { addComment, dislikePrayer, likePrayer } from "../lib/db";
import { PrayerRequestContext } from "@/context/PrayerRequest";

const styles = {
  listContainer: ` tracking-2 hover:shadow-2xl flex flex-col p-[4px] bg-[#e4e6e8] rounded-2xl break-words overflow-hidden max-w-full h-fit `,
};

const Prayer = ({ id, prayer, timestamp, name, image }) => {
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { user } = useContext(PrayerRequestContext)


  useEffect(
    () =>
      onSnapshot(collection(db, "Prayers", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes?.findIndex((like) => like?.id === user.uid) !== -1
      ),
    [likes]
  );

  const likepost = () => {
    if (!user) return;

    if (hasliked) {
      dislikePrayer(id, user.uid)
    } else {
      likePrayer(id, user.uid)
    }
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
      address: user.email,
      name: user.name,
      comment: commentToSend?.slice(0, 250),
      createdAt: serverTimestamp(),
      image: user.image,
      uid: user.uid

    }
    addComment(id, newComment)

    return;
  };

  return (
    <div className={styles.listContainer}>
      <div className="flex w-full items-center">
        <img className="rounded-[50%]  w-[40px] h-[40px]" src={image} />
        <p className="text-[18px] p-2">{name}</p>
      </div>
      <p className="text-[20px] p-2">{prayer}</p>
      <div className="flex flex-row items-center ml-2 relative top-[34px]">
        {user && hasliked ? (
          <BsHeartFill
            className={`cursor-pointer text-[#f00] ${
              !user && "cursor-not-allowed"
            }`}
            disabled={!user}
            onClick={likepost}
            size={30}
          />
        ) : (
          <BsHeart
            disabled={!user}
            onClick={likepost}
            className={`${
              !user
                ? "cursor-not-allowed"
                : "hover:scale-125 transition-all duration-150 ease-out cursor-pointer"
            }`}
            size={30}
          />
        )}

        <BiCommentDetail
          size={30}
          className="cursor-pointer ml-5"
          onClick={() => {
            router.push(`/comment/${id}`);
          }}
        />
      </div>
      <p className="flex justify-end text-[16px] p-2">
        <TimeAgo datetime={timestamp} />
      </p>
      <p className="text-sm px-5 py-2">
        {likes?.length > 0 &&
          Intl.NumberFormat("en", { notation: "compact" }).format(
            likes?.length
          ) + " Prayers"}
      </p>
      <div className="flex flex-col max-w-full max-h-full gap-[5px] ">
        {comments?.map((comment) => (
          <div
            key={comment?.id}
            className="max-h-full overflow-hidden flex ml-5 items-center max-w-full"
          >
            <img
              src={`${comment?.data()?.image}`}
              alt="profile"
              height={33}
              width={33}
              className="rounded-[50%]  "
            />
            <p className="pl-1 text-[12px] w-full">{comment?.data()?.name}</p>
            <p className="text-[14px] text-ellipsis whitespace-nowrap overflow-hidden w-full">
              {comment?.data()?.comment}
            </p>
            <p className="flex w-full mr-[10px] text-[10.89px] justify-end">
              <TimeAgo datetime={comment?.data()?.createdAt?.toDate()} />
            </p>
          </div>
        ))}

        <div className="flex items-center p-1">
          <BsEmojiSmile size={25} />
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
            placeholder={` ${
              user ? "Add a comment..." : "login to comment"
            }`}
            className="bg-[#e4e6e8] p-2 w-full border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment?.trim()}
            onClick={sendComment}
            className={`${
              !comment || !user
                ? "bg-[#888] text-[#fff] cursor-not-allowed"
                : " text-white bg-[#16bafb] cursor-pointer transition-all ease-out duration-300 hover:scale-105"
            } rounded-[50%] p-[5px] flex  `}
          >
            <RiSendPlane2Fill size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prayer;
