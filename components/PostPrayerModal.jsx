import React, { useState, useContext, useEffect } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useForm } from "react-hook-form";
import { PrayerRequestContext } from "../context/PrayerRequest";
import toast from "react-hot-toast";
import { db } from "../lib/firebaseConfig";
import {
  doc,
  increment,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Countdown from "react-countdown";
import { createPrayer, createTimeOutDoc, UpdateTimeOutDoc } from "../lib/db";
import { FaRegEdit } from "react-icons/fa";

const styles = {
  modalBackground: `w-screen z-50 sm:p-3 h-screen fixed sm:p-1 flex justify-center items-center overflow-hidden `,
  modalContainer: `overflow-hidden sm:w-full w-[460px] max-h-[600px] transitio-all rounded-[12px] bg-[#fff] shadow-2xl flex flex-col p-[25px]`,
  title: `inline-block text-center mt-[10px] mb-[40px] text-2xl`,
  input: `w-full h-full p-2 z-50 text-xl resize-none break-all border-2 rounded-lg`,
  footer: `flex justify-around pt-6 `,
  cancel: `bg-[#ff0e0e] px-6 py-3 text-white text-xl rounded-lg hover:shadow-2xl transition-all duration-300  hover:scale-105`,
  post: ` px-9 py-3 hover:shadow-2xl text-xl rounded-lg `,
};

const PostPrayerModal = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(PrayerRequestContext);
  const [prayer, setPrayer] = useState("");
  const [postNumber, setpostNumber] = useState(0);
  const [postTimer, setpostTimer] = useState(0);
  const [isTimeGone, setisTimeGone] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const isPaidAccount = user?.stripeRole !== 'free'

  useEffect(() => {
    user && !isPaidAccount &&
      onSnapshot(
        doc(db, "TimeOut", "TimeOutUsers", "users", user?.uid),
        (snapshot) => {
          const postNumber = snapshot?.data()?.postNumber || 0;
          const postTimer = snapshot?.data()?.postTimer;
          const isTimeGone = postTimer
            ? Date.now() >
              new Date(postTimer.seconds * 1000 + 24 * 60 * 60 * 1000)
              ? true
              : false
            : true;
          setisTimeGone(isTimeGone);
          postNumber === 3 && isTimeGone
            ? setpostNumber(0)
            : setpostNumber(postNumber);
          postTimer
            ? setpostTimer(postTimer.seconds * 1000 + 24 * 60 * 60 * 1000)
            : setpostTimer(0);
        }
      );
  }, [user]);

  //Post Prayer
  const postPrayer = () => {
    try {
      if (!user) return;
      if (!prayer) return;
      if (!isTimeGone || postNumber === 3) {
        toast.error("You have reached max post number");
        return;
      }

      const prayerToPost = prayer;
      setPrayer("");
      setModalOpen(false);

      const newPrayer = {
        address: user?.email,
        prayer: prayerToPost?.slice(0, !isPaidAccount ? 250 : 1500),
        createdAt: serverTimestamp(),
        image: user?.image,
        name: user?.name,
        uid: user?.uid,
      };

      createPrayer(newPrayer);

      if(isPaidAccount) return

      else {

      

        if (postNumber === 0) {
          const timeOutDoc = {
            postNumber: 1,
            postTimer: 0,
          };
          createTimeOutDoc(user.uid, timeOutDoc);
        } else {
          const updatetimeoutdoc = {
            postNumber: increment(1),
            postTimer: postNumber === 2 ? serverTimestamp() : 0,
          };
          UpdateTimeOutDoc(user.uid, updatetimeoutdoc);
        }
        toast.success("Prayer Posted!", {
          style: { background: "#04111d", color: "#fff" },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: { background: "#04111d", color: "#fff" },
      });
    }
  };

  const renderer = ({ hours, minutes, seconds }) => (
    <h2 className="tracking-widest	">
      {hours}:{minutes}:{seconds}
    </h2>
  );

  return (
    <>
      {user && (
        <div className={`${modalOpen ? styles.empty : styles.show}`}>
          <button
            className="fixed bottom-[60px] right-[60px] z-20 text-[#000] transition-all duration-500 hover:text-white hover:scale-125"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <FaRegEdit size={28} />
          </button>
        </div>
      )}
      {modalOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
            <div className={styles.titleCloseBtn}>
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                {" "}
                <MdOutlineCancelPresentation size={28} />{" "}
              </button>
            </div>
            <div className={styles.title}>
              <h1>Request prayer</h1>
            </div>
            {!isTimeGone && postTimer && (
              <div className="flex h-full relative top-[60px] w-full flex-col justify-center items-center">
                <div className="flex items-center justify-center z-50 flex-col p-5 text-xl">
                  Time Left to request prayer:{" "}
                  <Countdown date={postTimer} renderer={renderer} />
                </div>
                <img
                  className="object-contain relative bottom-[80px] h-80 w-80"
                  src="https://miro.medium.com/max/1400/0*4Gzjgh9Y7Gu8KEtZ.gif"
                />
              </div>
            )}
            {isTimeGone && (
              <form onSubmit={handleSubmit(postPrayer)}>
                <div className={styles.body}>
                  <textarea
                    className={styles.input}
                    rows={8}
                    onChange={(e) => {
                      setPrayer(e.target.value);
                    }}
                    minLength={50}
                    maxLength={!isPaidAccount ? 250 : 1500}
                    placeholder="Your prayer..."
                  />
                  {!isPaidAccount &&
                    <p className="flex w-full justify-end pr-3">
                      Post Count: {postNumber}
                    </p>
                  }
                </div>
                <div className={styles.footer}>
                  <button
                    className={styles.cancel}
                    type="submit"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isTimeGone || !prayer.trim()}
                    className={`${
                      styles.post
                    } ${`disabled:cursor-not-allowed disabled:bg-[#9d9d9d] disabled:text-white bg-[#0bbe20] `}`}
                  >
                    Post
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostPrayerModal;
