import React, { useRef, useEffect } from "react";
import TimeAgo from "timeago-react";
import { useSession } from "next-auth/react";

const styles = {
  commentBody: `bg-[#e8e8e8] w-contain p-3 rounded-2xl break-words max-w-[60%] min-w-[150px] overflow-hidden`,
  address: `text-[17px]`,
  time: `flex justify-end text-[14px] `,
  comment: `text-[22px] py-[2px] `,
};

const Comment = ({ address, comment, createdAt, name, image }) => {
  const btnRef = useRef(null);
  const { data: session } = useSession();

  useEffect(() => btnRef?.current?.scrollIntoView(), []);

  return (
    <div>
      <div
        className={`${
          address == session?.user?.email
            ? "flex justify-end py-3 items-center w-full "
            : "flex items-center justify-start py-3 w-full"
        }`}
      >
        <div
          className={`${styles.commentBody} ${
            address == session?.user?.email && "bg-[#10c850]"
          }`}
        >
          <div className={styles.address}>
            <p
              className={`${
                address == session?.user?.email
                  ? "text-[#434544]"
                  : "text-[#484949]"
              }`}
            >
              {name}
            </p>
          </div>
          <p
            className={`${styles.comment}${
              address == session?.user?.email ? "text-[#fff]" : "text-black"
            }`}
          >
            {comment}
          </p>
          <div className={styles.time}>
            <p
              className={`${
                address == session?.user?.email
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
            address == session?.user?.email ? "order-last ml-2" : "mr-2"
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
