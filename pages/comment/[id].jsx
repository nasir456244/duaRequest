import React, { useState, useEffect, useContext, useRef } from "react";
import CommentSkeleton from "../../components/CommentSkeleton";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaSmileWink } from "react-icons/fa";
import { db } from "../../lib/firebaseConfig";
import DeleteModal from "../../components/DeleteModal";
import Navbar from "../../components/Navbar";
import {
  query,
  orderBy,
  doc,
  collection,
  serverTimestamp,
  getDoc,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import Comment from "./component/Comment";
import { HiPaperAirplane } from "react-icons/hi";
import { PrayerRequestContext } from "../../context/PrayerRequest";
import { addComment, DeleteComment } from "../../lib/db";
import InfiniteScroll from "react-infinite-scroller";
import useStateValue from "hooks/useStateValue";
import { useForm } from "react-hook-form";
import Footer from "@/components/Footer";

const styles = {
  mainContainer: ` flex justify-center p-3 `,
  modalContainer: `flex flex-col overflow-auto sm:max-h-[77vh] md:max-h-[800px] bg-white w-[580px]  overflow-hidden `,
  title: `text-[20px] text-black font-bold	leading-7 flex justify-center`,
  body: `border overflow-auto mt-[15px] mb-[5px] p-[10px] rounded-xl h-[700px] `,
  input: `w-full p-2 text-[15px] resize-none break-all bg-[#F2F2F2] outline-0 text-[#000000] mr-2 rounded-[12px] overflow-hidden`,
  footer: `flex flex-row items-center justify-center content-center w-full p-4  `,
  postButton: `rounded-[50%] p-2 flex items-center justify-center text-[#fff] `,
};

const CommentPage = () => {
  const [commentsLoading, setCommentsLoding] = useState(true);
  const [chat, setChat] = useState("");
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteDua, setDeleteDua] = useState(false)
  const { user } = useContext(PrayerRequestContext);
  const [owner, setOwner] = useState();
  const [totalSize, setTotalSize] = useState(0);
  const [queryId, setqueryId] = useState("")
  const [lastKey, setLastKey] = useState("");
  const { changeState, setChangeState } = useStateValue()
  const ref = useRef(true)
  const { register, handleSubmit, formState:{errors} } = useForm();
  const isPaidAccount = user?.stripeRole !== "free"

    useEffect(() => {
      if(!user || !isPaidAccount) return;
      const firstRender = ref.current
      if (firstRender) {
        const queryId = window.location.pathname.split("/")[2]
        ref.current = false
        setCommentsLoding(true)
        getOwner();
        setqueryId(queryId)
        getDoc(doc(db, `Prayers/${queryId}`))
          .then((res) => {
            if (!res.data()) return router.push("/404");
            fetchComments(queryId)
          })
          .catch((error) => console.log(error));
        return
      }

      getDocs(query(collection(db, "Prayers", queryId, "comments"),
        orderBy("createdAt", "desc"), limit(1))).then(data => {
          if (data.docs[0]?.id === comments[comments.length - 1]?.id) return
          setComments([...data.docs.map(doc => ({ id: doc.id, ...doc.data() })), ...comments]);
          setCommentsLoding(false);
          setTotalSize(totalSize + data?.docs.length)
        })
    }, [changeState.comment, user]);

  
  const fetchComments = async (queryId) => {
    if(!user || !isPaidAccount) return;
    const queryParams = [
      collection(db, "Prayers", queryId, "comments"),
      orderBy("createdAt", "desc"),
      limit(7),
    ];
      const q = query(...queryParams);
      const data = await getDocs(q);
      setComments([...data?.docs.map(doc => ({ id: doc.id, ...doc.data() }))]);
      setCommentsLoding(false);
      setTotalSize(data?.docs.length)
      setLastKey(data?.docs[data?.docs?.length - 1]);
  };


  const fetchMoreData = async () => {
    if(!user) return;
    if(!isPaidAccount) return;
    const queryParams = [
      collection(db, "Prayers", queryId, "comments"),
      orderBy("createdAt", "desc"),
      limit(5),
    ];
    if (lastKey) {
      
      queryParams.push(startAfter(lastKey));
      const q = query(...queryParams);
      const data = await getDocs(q);
      setTimeout( () => {
        setComments([...comments, ...data?.docs.map(doc => ({ id: doc.id, ...doc.data() }))]);
        setCommentsLoding(false);
        setTotalSize(totalSize + data?.docs.length)
        setLastKey(data?.docs?.length && data?.docs[data?.docs?.length - 1]);
      },500)
    }
  };


  const sendComment = (e) => {
    try {

      if (!user || !isPaidAccount || !chat) return;
      
      const commentToSend = chat.replace(/\s+/g, " ").trim();
      if(commentToSend.length < 4 || commentToSend.length > 250) return;
      setChat("")
      
      const newComment = {
        address: user?.email,
        comment: commentToSend?.slice(0, 250),
        createdAt: serverTimestamp(),
        image: user?.image,
        name: user?.name,
        uid: user?.uid,
      };
      addComment(queryId, newComment)
      setChangeState({ ...changeState, comment: !changeState.comment })
      return;
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: { background: "#04111d", color: "#fff" },
      });
    }
  };

  const deleteConfirmation = async (event, deleteCommentID) => {
    if(!user) return;
    if(!isPaidAccount) return;
    const PrayerId = window.location.pathname.split("/")[2]

    if (event) {
      await DeleteComment(PrayerId, deleteCommentID);
      setComments(comments.filter(comment => comment.id !== deleteCommentID))
    }
    return
  };

  const getOwner = () => {
    if(!user || !isPaidAccount) return;
    const PrayerId = window.location.pathname.split("/")[2]
    getDoc(doc(db, `Prayers/${PrayerId}`)).then((res) =>
      setOwner(res?.data()?.uid == user?.uid)
    );
    return;
  }

  return (
    <div>
      <Navbar />
      {user && isPaidAccount &&
        <div className={styles.mainContainer}>
          <div className={styles.modalContainer}>
            <div className="flex justify-between p-3 ml-[16px] ">
              <div className={styles.title}>
                <h1>Add a comment</h1>
              </div>
              <div
                onClick={() => router?.replace("/community")}
                className="flex flex-row justify-center content-center items-center cursor-pointer  text-black  "
              >
                <p className="font-semibold text-sm px-2">go back to prayers</p>
                <BsFillArrowLeftCircleFill className="items-center" size={22} />
              </div>
            </div>
            <div className="relative">
              {isDeleteModalOpen && (
                <DeleteModal
                  setDeleteDua={setDeleteDua}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
              )}
            </div>
            {commentsLoading ? (
              <CommentSkeleton />
            ) : (
              <div
                className={styles.body} >
                <InfiniteScroll
                  isReverse={false}
                  loadMore={fetchMoreData}
                  hasMore={comments?.length <= totalSize}
                  useWindow={false}
                  threshold={10}
                >
                  {comments?.map((comment, index) => (
                    <Comment
                      deleteConfirmation={deleteConfirmation}
                      image={comment?.image}
                      name={comment?.name}
                      key={comment?.id + "" + index}
                      address={comment?.address}
                      comment={comment?.comment}
                      createdAt={comment?.createdAt}
                      id={comment?.id}
                      owner={owner}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            )}
            <form onSubmit={handleSubmit(sendComment)}>
            {errors?.chat && <span className="w-full flex items-center justify-center font-medium text-[#f00]">This is required</span>}
              <div className={styles.footer}>
                

                <div className="flex bg-[#F2F2F2] rounded-xl w-full items-center ">
                  <FaSmileWink className="  text-[#8C8C8C] m-2 " size={25} />
                  <input
                      {...register('chat', {required: true, minLength: 4 ,maxLength: 250})}

                    type="text"
                    required
                    disabled={!user}
                    value={chat}
                    className={styles.input}
                    onChange={(e) =>setChat(e.target?.value)}
                    minLength={4}
                    maxLength={250}
                    placeholder={`${!user ? "Login to comment" : "Write a comment..."
                      }`}
                  />
                  <button
                    disabled={!chat?.trim() || chat.length < 4 || chat.length > 250}
                    type="submit"
                    className={`${styles.postButton} disabled:bg-[#F2F2F2] disabled:cursor-not-allowed bg-[#F2F2F2] cursor-pointer hover:shadow-2xl text-xl transition-all duration-300 hover:scale-105 rotate-90`}
                  >
                    <HiPaperAirplane className={` ${!user || !chat || chat.length < 4 || !chat.trim() ? 'text-[#8C8C8C]' : 'text-[#112EA0]'}`} size={22} />
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      }
      <Footer />
    </div>
  );
};

export default CommentPage;
