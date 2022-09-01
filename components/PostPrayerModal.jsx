import React, { useState, useContext } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useForm } from "react-hook-form";
import { PrayerRequestContext } from "../context/PrayerRequest";
import toast from "react-hot-toast";
import {
  serverTimestamp,
} from "firebase/firestore";
import { createPrayer } from "../lib/db";
import { FaRegEdit } from "react-icons/fa";
import useStateValue from "hooks/useStateValue";

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
  const { register, handleSubmit, formState:{errors}, reset } = useForm();
  const { user } = useContext(PrayerRequestContext);
  const [prayer, setPrayer] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { changeState, setChangeState } = useStateValue()
  const isPaidAccount = user?.stripeRole !== "free"


  //Post Prayer
  const postPrayer = () => {
    try {
      if (!user || !isPaidAccount || !prayer) return;
      const prayerToPost = prayer.replace(/\s+/g, " ").trim();
      if(prayerToPost.length < 50 || prayerToPost.length > 500) return;
      setPrayer("");
      setModalOpen(false);
      const newPrayer = {
        address: user?.email,
        prayer: prayerToPost?.slice(0,500),
        createdAt: serverTimestamp(),
        image: user?.image,
        name: user?.name,
        uid: user?.uid,
      };
      createPrayer(newPrayer);
      setChangeState({ ...changeState, prayer: !changeState.prayer })
      return;
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: { background: "#04111d", color: "#fff" },
      });
    }
  };

  return (
    <>
      {user && isPaidAccount && (
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
                  reset({prayer: ''});
                  setPrayer('')
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
              <form onSubmit={handleSubmit(postPrayer)}>
                <div className={styles.body}>
                  <textarea
                  {...register('prayer', {required: true, minLength: 50 ,maxLength: 500})}
                    className={styles.input}
                    rows={8}
                    onChange={(e) => {
                      setPrayer(e.target.value);
                    }}
                    minLength={50}
                    value={prayer}
                    maxLength={500}
                    placeholder="Your prayer..."
                  />
                </div>
                <p className="font-medium w-full flex justify-end relative bottom-[8px] pr-2 text-[#8C8C8C] w-full"> {`${prayer?.length + '/500'}`}</p>
                {errors?.prayer && <span className="font-medium text-[#f00]">This is required</span>}
                <div className={styles.footer}>
                  <button
                    className={styles.cancel}
                    type="button"
                    onClick={() => {
                      reset({prayer: ''});
                      setPrayer("");
                      setModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!prayer.trim() || prayer.length < 50 || prayer.length > 500}
                    className={`${styles.post
                      } ${`disabled:cursor-not-allowed disabled:bg-[#9d9d9d] disabled:text-white bg-[#0bbe20] `}`}
                  >
                    Post
                  </button>
                </div>
              </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPrayerModal;
