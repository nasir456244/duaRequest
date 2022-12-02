import React, { useState, useContext } from "react";
import CommentSkeleton from "./CommentSkeleton";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaCommentAlt, FaSmileWink } from "react-icons/fa";
import {
  serverTimestamp,
} from "firebase/firestore";
import Comment from "./Comment";
import { HiPaperAirplane } from "react-icons/hi";
import { PrayerRequestContext } from "../context/PrayerRequest";
import { addComment } from "../lib/db";
import { useForm } from "react-hook-form";
import { getComments } from "queries/getAllComments";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const styles = {
  mainContainer: ` p-3 w-screen h-screen fixed left-0 top-0 z-40 flex items-center justify-center`,
  modalContainer: `flex flex-col z-50 overflow-auto sm:max-h-[77vh] md:max-h-[800px] bg-white w-[580px]  overflow-hidden `,
  title: `text-[20px] text-black font-bold	leading-7 flex justify-center`,
  body: `border overflow-auto mt-[15px] mb-[5px] p-[10px] rounded-xl h-[700px] `,
  input: `w-full p-2 text-[15px] resize-none break-all bg-[#F2F2F2] outline-0 text-[#000000] mr-2 rounded-[12px] overflow-hidden`,
  footer: `flex flex-row items-center justify-center content-center w-full p-4  `,
  postButton: `rounded-[50%] p-2 flex items-center justify-center text-[#fff] `,
};

const CommentPage = ({ id }) => {
  const [chat, setChat] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useContext(PrayerRequestContext);
  const { register, handleSubmit, formState:{errors}, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false)
  const [lastDoc, setLastDoc] = useState();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useQuery(
    [id, page],
    () => getComments(id, lastDoc, limit, user),
    {
      onSuccess(data) {
        const newData = data?.docs.map((doc) => ({
          id: doc?.id,
          ...doc?.data(),
        }));

        // filter exiting data
        const filteredData = comments?.filter(
          (x) => !newData.find((y) => y.id === x.id)
        );

        setComments([...filteredData, ...newData]);
      },
      enabled: !!user,
      keepPreviousData: true,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const addClient = (doc) => {
    setComments((prev) => [doc, ...prev]);
  };

   
  const handleNextPage = () => {
    if (!data?.empty) {
      setPage(page + 1);
      setLastDoc(data?.docs[data?.docs?.length - 1]);
    }
  };

  const addClientMutation = useMutation(addComment, {
    onSuccess: (doc) => {
      addClient(doc);
    },
  });
  
  


  const sendComment = () => {
    try {
      if (!user || !chat) return;
      const commentToSend = chat.replace(/\s+/g, " ").trim();
      if(commentToSend.length < 2 || commentToSend.length > 200) return;
      setChat("")
      reset({chat: ''});
      const newComment = {
        address: user?.email,
        comment: commentToSend?.slice(0, 250),
        createdAt: serverTimestamp(),
        image: user?.image,
        name: user?.name,
        uid: user?.uid,
      };
      addClientMutation.mutate({CommentId: id, newComment});
      return;
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: { background: "#04111d", color: "#fff" },
      });
    }
  };


  return (
    <div>
        <div onClick={() => setIsOpen(true)} className="flex overflow-hidden justify-start items-center h-12 ">
            <FaCommentAlt
            alt="comment"
            className="cursor-pointer mx-2 mt-[2px] text-[22px]  sm:text-[29px] text-[#ADADAD]"                   
            />
            <p className=" mt-[2px] cursor-pointer text-[#8C8C8C] sm:hidden">Comments</p>
        </div>
      {isOpen &&
        <div className={styles.mainContainer}>
          <div className={styles.modalContainer}>
            <div className="flex justify-between p-3 ml-[16px] ">
              <div className={styles.title}>
                <h1>Add a comment</h1>
              </div>
              <div
                onClick={() => setIsOpen(false)}
                className="flex flex-row justify-center content-center items-center cursor-pointer  text-black  "
              >
                <p className="font-semibold text-sm px-2">go back to prayers</p>
                <BsFillArrowLeftCircleFill className="items-center" size={22} />
              </div>
            </div>
            <div className="relative">
            </div>
            {isLoading ? (
              <CommentSkeleton />
            ) : (
              <div
                className={styles.body} >

                  {comments?.map((comment) => (
                    <Comment
                      image={comment?.image}
                      name={comment?.name}
                      key={comment?.id}
                      address={comment?.address}
                      comment={comment?.comment}
                      createdAt={comment?.createdAt?.seconds ? comment?.createdAt : null}
                    />
                  ))}
              </div>
            )}
            <div className="flex ml-4 gap-4">
                  <button
                    disabled={!!data?.empty}
                    className="middle none font-sans font-bold center uppercase transition-all  disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-cyan-500 px-4 text-white disabled:bg-gray-300"
                    onClick={handleNextPage}
                  >
                    Load More
                  </button>
                </div>


            <form onSubmit={handleSubmit(sendComment)}>
            {errors?.chat && <span className="w-full flex items-center justify-center font-medium text-[#f00]">This is required</span>}
              <div className={styles.footer}>
                

                <div className="flex bg-[#F2F2F2] rounded-xl w-full items-center ">
                  <FaSmileWink className="  text-[#8C8C8C] m-2 " size={25} />
                  <input
                      {...register('chat', {required: true, minLength: 2 ,maxLength: 200})}

                    type="text"
                    required
                    disabled={!user}
                    value={chat}
                    className={styles.input}
                    onChange={(e) =>setChat(e.target?.value)}
                    minLength={2}
                    maxLength={200}
                    placeholder={`${!user ? "Login to comment" : "Write a comment..."
                      }`}
                  />
                  <button
                    disabled={!chat?.trim() || chat.length < 2 || chat.length > 200}
                    type="submit"
                    className={`${styles.postButton} disabled:bg-[#F2F2F2] disabled:cursor-not-allowed bg-[#F2F2F2] cursor-pointer hover:shadow-2xl text-xl transition-all duration-300 hover:scale-105 rotate-90`}
                  >
                    <HiPaperAirplane className={` ${!user || !chat || chat.length < 2 || !chat.trim() ? 'text-[#8C8C8C]' : 'text-[#112EA0]'}`} size={22} />
                  </button>
                </div>
              </div>

            </form>
          </div>
            <div className="w-screen h-screen fixed z-40 bg-[#000] opacity-50 left-0 top-0 p-6" />
        </div>
      }
    </div>
  );
};

export default CommentPage;
