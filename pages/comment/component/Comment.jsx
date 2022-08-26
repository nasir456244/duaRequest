import React, { useEffect, useState, useContext, useRef } from "react";
import TimeAgo from "timeago-react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import { MdDelete } from "react-icons/md";
import { PrayerRequestContext } from "../../../context/PrayerRequest";
import { dislikeComment, likeComment, removeDisLike, removeLike } from "../../../lib/db";
import DeleteModal from "../../../components/DeleteModal";
import { AiFillLike } from 'react-icons/ai'

const styles = {
  commentBody: `tracking-2 flex flex-col w-full mt-[12px] overflow-hidden p-[4px] bg-[#ffffff] rounded-2xl break-words h-fit`,
  address: `flex items-center text-[14px] font-semibold text-[#000000] not-italic `,
  time: `flex justify-end w-full text-[14px] `,
  comment: `font-medium text-[15px] color-black mb-8 text-[#8C8C8C]`,
  buttons: `flex absolute right-[30px] bottom-[10px]   `
};

const Comment = ({ address, comment, createdAt, name, image, id,
  deleteConfirmation }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [owner, setOwner] = useState();
  const [deleteCommentID, setDeleteCommentID] = useState("");
  const { user } = useContext(PrayerRequestContext);
  const isPaidAccount = user?.stripeRole !== "free"
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState([]);
  const [hasdisliked, setHasDisLiked] = useState(false);

  useEffect(
    () => {
      const PrayerId = window.location.pathname.split("/")[2]

      const unsub = onSnapshot(collection(db, 'Prayers', PrayerId, 'comments', id, 'likes'), (snapshot) =>
        setLikes(snapshot?.docs)
      )
      return () => unsub();
    },
    [id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes?.findIndex((like) => like?.id === user?.uid) !== -1
      ),
    [likes, user]
  );


  useEffect(
    () => {
      const PrayerId = window.location.pathname.split("/")[2]

      const unsub = onSnapshot(collection(db, 'Prayers', PrayerId, 'comments', id, 'dislikes'), (snapshot) =>
        setDislikes(snapshot.docs)
      )
      return () => unsub();
    },
    [id]
  );

  useEffect(
    () =>
      setHasDisLiked(
        dislikes?.findIndex((like) => like?.id === user?.uid) !== -1
      ),
    [dislikes, user]
  );

  useEffect(() => {
    const PrayerId = window.location.pathname.split("/")[2]
    getDoc(doc(db, `Prayers/${PrayerId}`)).then((res) =>
      setOwner(res?.data()?.uid == user?.uid)
    );
  }, [user?.uid]);

  const likecomment = () => {
    const PrayerId = window.location.pathname.split("/")[2]
    if (!user) return;
    if (!isPaidAccount) return
    if (hasliked) return
    if (hasdisliked) {
      removeDisLike(PrayerId, id, user?.uid)
    }
    likeComment(PrayerId, id, user?.uid)
    return;
  };

  const dislikecomment = () => {
    const PrayerId = window.location.pathname.split("/")[2]

    if (!user) return;
    if (!isPaidAccount) return
    if (hasdisliked) return
    if (hasliked) {
      removeLike(PrayerId, id, user?.uid)
    }
    dislikeComment(PrayerId, id, user?.uid)
    return;
  };

  const deleteComment = (id) => {
    if (!user) return;
    if (owner && isPaidAccount) {
      setIsDeleteModalOpen(true);
      setDeleteCommentID(id);
    }
    return;
  };


  return (
    <div className="relative">
      {isDeleteModalOpen && (
        <DeleteModal
          setDeleteDua={(e) => deleteConfirmation(e, id)}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      <div className="flex flex-row m-1 ">
        <div
          className={`${address == user?.email
            ? "flex   w-full border border-l-[3px] m-1 rounded-md border-l-[#0ABEEE]	"
            : "flex w-full border border-l-[3px] m-1 rounded-md border-l-[#112EA0]"
            }`}
        >

          <div
            className={`flex flex-col  content-centers items-center p-1 ${address == user?.email && ""
              }`}
          >
            <img
              src={image}
              className="  rounded-[50%] w-[40px] h-[40px]  m-2"
            />

            {owner && isPaidAccount && (
              <MdDelete
                size={25}
                onClick={() => deleteComment(id)}
                className="text-[#f00] cursor-pointer"
              />
            )}
            <div className={styles.buttons}>
              <AiFillLike onClick={likecomment} className={`${user && isPaidAccount && hasliked ? 'text-[#0ABEEE]' : 'text-[#ADADAD]'} ${user && !hasliked && ' md:hover:scale-125 md:transition-all md:duration-150 md:ease-out cursor-pointer'} relative bottom-[3px]  `} size={25} />
              <p className="text-[13px] font-semibold bg-opacity-100 ml-1">
                {likes?.length > 0 ? Intl.NumberFormat("en", { notation: "compact" }).format(likes?.length) : '0'}
              </p>
              <AiFillLike onClick={dislikecomment} size={25} className={`${user && isPaidAccount && hasdisliked ? 'text-[#0ABEEE]' : 'text-[#ADADAD] cursor-pointer'}  rotate-180 relative left-[10px] mr-3 `} /> <p className="text-[13px] font-semibold bg-opacity-100 ml-1">
                {dislikes?.length > 0 ? Intl.NumberFormat("en", { notation: "compact" }).format(dislikes?.length) : '0'}
              </p>

            </div>
          </div>

          <div
            className={`${styles.commentBody} ${address == user?.email && "bg-[#ffffff] "
              }`}
          >
            <div className={styles.address}>
              <div
                className='text-[#000] w-full'
              >
                {address == user?.email ? <p>You</p> : name}
              </div>
              <div className={styles.time}>
                <p
                  className='text-[#000] font-medium text-[13px]'
                >
                  <TimeAgo datetime={createdAt?.toDate()} />
                </p>
              </div>
            </div>
            <p
              className={styles.comment}
            >
              {comment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
