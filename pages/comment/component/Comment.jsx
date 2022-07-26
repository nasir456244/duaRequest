import React, { useRef, useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import { getAuth } from 'firebase/auth'
import { collection, deleteDoc, doc, getDoc,query, onSnapshot,orderBy, where } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import { AiFillDelete } from 'react-icons/ai'
const styles = {
  commentBody: `bg-[#e8e8e8] w-contain p-3 rounded-2xl break-words max-w-[50%] min-w-[200px] overflow-hidden`,
  address: `text-[17px] w-full flex items-center justify-between `,
  time: `flex justify-end text-[14px] `,
  comment: `text-[22px] py-[2px] `,
};

const Comment = ({ address, comment, createdAt, name, image,id, deleteDua, setDeleteDua, setIsDeleteModalOpen }) => {
  const btnRef = useRef(null);
  const auth = getAuth()
  const [owner, setOwner] = useState()

  useEffect(() => btnRef?.current?.scrollIntoView(), []);

  // console.log(id)
  
  const queryId = window.location.pathname.split("/")[2];
  useEffect(
    () => {
      getDoc(doc(db, `Prayers/${queryId}`)).then((res) => 
      setOwner(res?.data()?.address == auth?.currentUser?.email))
  },[]
  );

  


  const deleteComment = (id) => {
    if(!auth?.currentUser) return
    if(!owner) return
    setIsDeleteModalOpen(true)
    if(deleteDua === true) {

      const commentToDelete = id
      deleteDoc(doc(db,'Prayers', queryId, 'comments', commentToDelete))
      setDeleteDua(false)
    }
    return
  }

  return (
    <div>
      <div
        className={`${
          address == auth?.currentUser?.email
            ? "flex justify-end py-3 items-center w-full "
            : "flex items-center justify-start py-3 w-full"
        }`}
      >
        <div
          className={`${styles.commentBody} ${
            address == auth?.currentUser?.email && "bg-[#10c850]"
          }`}
        >
          <div className={styles.address}>
            <p
              className={`${
                address == auth?.currentUser?.email
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
              address == auth?.currentUser?.email ? "text-[#fff]" : "text-black"
            }`}
          >
            {comment}
          </p>
          <div className={styles.time}>
            <p
              className={`${
                address == auth?.currentUser?.email
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
            address == auth?.currentUser?.email ? "order-last ml-2" : "mr-2"
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
