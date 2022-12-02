import React, { useContext } from "react";
import TimeAgo from "timeago-react";
import { PrayerRequestContext } from "../context/PrayerRequest";
import Image from "next/image";

const styles = {
  commentBody: `tracking-2 flex flex-col w-full mt-[12px] overflow-hidden p-[4px] bg-[#ffffff] rounded-2xl break-words h-fit`,
  address: `flex items-center text-[14px] font-semibold text-[#000000] not-italic `,
  time: `flex justify-end w-full text-[14px] `,
  comment: `font-medium text-[15px] color-black mb-8 text-[#8C8C8C] relative top-1`,
  buttons: `flex absolute right-[30px] bottom-[10px]   `
};

const Comment = ({ address, comment, createdAt, name, image }) => {
  const { user } = useContext(PrayerRequestContext);

  return (
    <div className="relative">
      {user &&
        <>
          <div className="flex flex-row m-1 ">
            <div
              className={`${address == user?.email
                ? "flex w-full border border-l-[3px] m-1 rounded-md border-l-[#0ABEEE]	"
                : "flex w-full border border-l-[3px] m-1 rounded-md border-l-[#112EA0]"
                }`}
            >

              <div
                className={`flex flex-col h-full justify-center items-center p-1`}
              >
                <Image
                  src={image}
                  className="  rounded-[50%] "
                  height={41}
                  width={41}
                />

              </div>

              <div
                className={`${styles.commentBody} ${address == user?.email && "bg-[#ffffff] "
                  }`}
              >
                <div className={styles.address}>
                  <div
                    className='text-[#000] w-full relative top-1'
                  >
                    {address == user?.email ? <p>You</p> : name}
                  </div>
                  <div className={styles.time}>
                    <p
                      className='text-[#000] font-medium text-[13px] relative top-1'
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
        </>
      }
    </div>
  );
};

export default Comment;
