import React, { useState, useEffect, useContext } from "react";
import CommentSkeleton from "../../components/CommentSkeleton";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaSmileWink } from "react-icons/fa";
import { db } from "../../lib/firebaseConfig";
import DeleteModal from "../../components/DeleteModal";
import Navbar from "../../components/Navbar"
import {
  query,
  onSnapshot,
  orderBy,
  addDoc,
  doc,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import Comment from "./component/Comment";
import { HiPaperAirplane } from "react-icons/hi";
import { getAuth } from 'firebase/auth'
import { PrayerRequestContext } from "../../context/PrayerRequest";
import { addComment } from "../../lib/db";

const styles = {
  mainContainer: ` flex justify-center sm:px-3`,
  modalContainer: `flex  flex-col overflow-auto bg-white w-[580px] h-[780px] overflow-hidden `,
  title: `text-[20px] text-black font-bold	leading-7 flex justify-center`,
  body: ` h-screen  overflow-auto mt-[15px] mb-[5px] p-[10px] rounded-xl `,
  input: `w-full  p-2 text-xl resize-none break-all bg-[#F2F2F2] outline-0 text-[#000000] mr-2 rounded-[12px] overflow-hidden`,
  footer: `flex flex-row items-center justify-center content-center w-full p-4 shadow-black	shadow-4xl `,
  postButton: `rounded-[50%] p-2 flex items-center justify-center text-[#fff] `,
};

const CommentPage = () => {
  const [commentsLoading, setCommentsLoding] = useState(true);
  const [chat, setChat] = useState("");
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [queryId, setqueryId] = useState("");
  const auth = getAuth()
  const { isDeleteModalOpen, user, setIsDeleteModalOpen, deleteDua, setDeleteDua} = useContext(PrayerRequestContext)




  useEffect(() => {
    const queryId = window.location.pathname.split("/")[2];
    getDoc(doc(db, `Prayers/${queryId}`))
      .then((res) => {
        if (!res.data()) router.push("/404");
      })
      .catch((error) => console.log(error));
    setqueryId(queryId);
    const unsub = onSnapshot(
      query(
        collection(db, "Prayers", queryId, "comments"),
        orderBy("createdAt", "asc")
      ),
      (snapshot) => setComments(snapshot?.docs)
    );
    return () => unsub();
  }, []);

  const sendComment = (e) => {
    e.preventDefault();
    if (!user) return;
    if(!chat) return;
    const commentToSend = chat;
    setChat("");

    const newComment = {
      address: user?.email,
      comment: commentToSend?.slice(0, 250),
      createdAt: serverTimestamp(),
      image: user?.image,
      name: user?.name,
      uid: user?.uid
    }
    addComment(queryId, newComment)

  };

  useEffect(() => {
    setTimeout(() => {
      setCommentsLoding(false);
    }, 800);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.modalContainer}>
          <div className="flex justify-between p-3 ml-[16px] ">
            <div className={styles.title}>
              <h1>Add a comment</h1>
            </div>
            <div
              onClick={() => router?.replace("/")}
              className="flex flex-row justify-center content-center items-center cursor-pointer  text-black  "
            >
               <p className="font-semibold text-sm px-2">go back to prayers</p> 
              <BsFillArrowLeftCircleFill className="items-center" size={22} />
            </div>
          </div>
          {isDeleteModalOpen && <DeleteModal setDeleteDua={setDeleteDua} setIsDeleteModalOpen={setIsDeleteModalOpen} />}

          {commentsLoading ? (
            <CommentSkeleton />
          ) : (
            <div className={styles.body}>
              {comments?.map((comment) => (
                <Comment
                  image={comment?.data()?.image}
                  name={comment?.data()?.name}
                  key={comment?.id}
                  address={comment?.data()?.address}
                  comment={comment?.data()?.comment}
                  createdAt={comment?.data()?.createdAt}
                  id={comment?.id}
                  deleteDua={deleteDua}
                  setDeleteDua={setDeleteDua}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
              ))}
            </div>
          )}
          <div className={styles.footer}>
            <div className="flex bg-[#F2F2F2] rounded-xl w-full items-center ">
              <FaSmileWink className="  text-[#8C8C8C] m-2 " size={25}  />
            <input
              type="text"
              required
              disabled={!user}
              value={chat}
              className={styles.input}
              onChange={(e) => setChat(e.target?.value)}
              minLength={1}
              maxLength={250}
              placeholder={`${!user ? "Login to comment" : "Write a comment..."
                }`}
            />
              <button
                onClick={sendComment}
                disabled={!chat?.trim()}
                type="submit"
                className={`${styles.postButton} ${!chat
                  ? "bg-[#F2F2F2] cursor-not-allowed rotate-90"
                  : "bg-[#F2F2F2] cursor-pointer hover:shadow-2xl text-xl transition-all duration-300 hover:scale-105 rotate-90"
                  }`}
              >
                <HiPaperAirplane className="text-[#112EA0]" size={22} />
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
