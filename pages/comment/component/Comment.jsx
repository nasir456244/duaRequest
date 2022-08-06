import React, { useRef, useEffect, useState, useContext } from "react";
import TimeAgo from "timeago-react";
import { getAuth } from 'firebase/auth'
import { collection, deleteDoc, doc, getDoc, query, onSnapshot, orderBy, where } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import { MdDelete } from 'react-icons/md'
import { PrayerRequestContext } from "../../../context/PrayerRequest";
import { DeleteComment } from "../../../lib/db";
const styles = {
  commentBody: `tracking-2 flex flex-col w-full mt-[12px] overflow-hidden p-[4px] bg-[#ffffff] rounded-2xl break-words h-fit`,
  address: `flex items-center text-[14px] font-semibold text-[#000000] not-italic `,
  time: `flex justify-end w-full text-[14px]`,
  comment: `font-medium text-[12px] color-black `,
};

const Comment = ({ address, comment, createdAt, name, image, id, deleteDua, setDeleteDua, setIsDeleteModalOpen }) => {
  const btnRef = useRef(null);
  const [owner, setOwner] = useState()
  const { user } = useContext(PrayerRequestContext)

  useEffect(() => btnRef?.current?.scrollIntoView(), []);

  // console.log(id)
  
  useEffect(
    () => {
      const queryId = window.location.pathname.split("/")[2];
      getDoc(doc(db, `Prayers/${queryId}`)).then((res) => 
      setOwner(res?.data()?.address == user?.email))
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
      <div className="flex flex-row m-1">
        <div
          className={`${address == user?.email
            ? "flex   w-full border border-l-[3px] m-1 rounded-md border-l-[#0ABEEE]	"
            : "flex w-full border border-l-[3px] m-1 rounded-md border-l-[#112EA0]"
            }`}>
          <div
            className={`flex flex-col  content-centers items-center p-1  ${address == user?.email ? "" : ""
              }`}
          >
            <img src={image} className="  rounded-[50%] w-[40px] h-[40px]  m-2" />
           <MdDelete size={25} onClick={() => deleteComment(id)} className='text-[#f00] cursor-pointer' />
          </div>
          
          <div
            className={`${styles.commentBody} ${address == user?.email && "bg-[#ffffff] "
              }`}
          >
            <div className={styles.address}>
              <p
                className={`${address == user?.email
                  ? "text-[#000000]"
                  : "text-[#000000]"
                  } w-full`}
              >
                {address == user?.email ? <p>You</p> : name}
              </p>
              <div className={styles.time}>
                <p
                  className={`${address == user?.email
                    ? "text-[#000000]"
                    : "text-[#000000]"
                    } font-medium text-[12px]`}
                >
                  <TimeAgo datetime={createdAt?.toDate()} />
                </p>
              </div>
            </div>
            <p
              className={`${styles.comment}${address == user?.email ? "text-[#8C8C8C]" : "text-[#8C8C8C]"
                }`}
            >
              {comment}
            </p>

          </div>
          <div ref={btnRef} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
