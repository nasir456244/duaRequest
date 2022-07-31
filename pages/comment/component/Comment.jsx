import React, { useRef, useEffect, useState, useContext } from "react";
import TimeAgo from "timeago-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import { AiFillDelete } from 'react-icons/ai'
import { DeleteComment } from "../../../lib/db";
import { PrayerRequestContext } from "@/context/PrayerRequest";


const styles = {
  commentBody: `bg-[#e8e8e8] w-contain p-3 rounded-2xl break-words max-w-[50%] min-w-[200px] overflow-hidden`,
  address: `text-[17px] w-full flex items-center justify-between `,
  time: `flex justify-end text-[14px] `,
  comment: `text-[22px] py-[2px] `,
};

const Comment = ({ address, comment, createdAt, name, image,id, deleteDua, setDeleteDua, setIsDeleteModalOpen }) => {
  const btnRef = useRef(null);
  const [owner, setOwner] = useState()
  const { user } = useContext(PrayerRequestContext)


  useEffect(() => btnRef?.current?.scrollIntoView(), []);

  // console.log(id)
  
  useEffect(
    () => {
      const queryId = window.location.pathname.split("/")[2];
      getDoc(doc(db, `Prayers/${queryId}`)).then((res) => 
      setOwner(res?.data()?.address == user.email))
  },[]
  );

  

  
  const deleteComment = (id) => {
    if(!user) return
    if(!owner) return
    setIsDeleteModalOpen(true)
    if(deleteDua === true) {
      const queryId = window.location.pathname.split("/")[2];
      const commentToDelete = id
      
      DeleteComment(queryId, commentToDelete)
      setDeleteDua(false)
    }
    return
  }

  return (
    <div>
      <div
        className={`${
          address == user.email
            ? "flex justify-end py-3 items-center w-full "
            : "flex items-center justify-start py-3 w-full"
        }`}
      >
        <div
          className={`${styles.commentBody} ${
            address == user.email && "bg-[#10c850]"
          }`}
        >
          <div className={styles.address}>
            <p
              className={`${
                address == user.mail
                  ? "text-[#434544]"
                  : "text-[#484949]"
              }`}
            >
              {name}
            </p>
            {owner && <AiFillDelete size={16} onClick={() => deleteComment(id)} className='text-[#f00] cursor-pointer '/>}
          </div>
          <p
            className={`${styles.comment}${
              address == user.email ? "text-[#fff]" : "text-black"
            }`}
          >
            {comment}
          </p>
          <div className={styles.time}>
            <p
              className={`${
                address == user.email
                  ? "text-[#434544]"
                  : "text-[#484949]"
              }`}
            >
              <TimeAgo datetime={createdAt?.toDate()} />
            </p>
          </div>
        </div>
        <div
          className={`flex mt-[55px]  order-first ${
            address == user.email ? "order-last ml-2" : "mr-2"
          }`}
        >
          <img src={image} className=" rounded-[50%] w-[40px] h-[40px]" />
        </div>
        <div ref={btnRef} />
      </div>
    </div>
  );
};

export default Comment;
