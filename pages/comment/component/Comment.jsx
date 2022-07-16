import React, { useContext, useRef, useEffect } from 'react'
import { PrayerRequestContext } from '../../../context/PrayerRequest'
import TimeAgo from 'timeago-react'




const styles = {
    commentBody: `bg-[#e8e8e8] w-contain p-3 rounded-2xl break-words max-w-[60%] min-w-[150px] overflow-hidden`,
    address: `text-[17px]`,
    time: `flex justify-end text-[14px] `,
    comment: `text-[22px] py-[2px] `,
}



const Comment = ({address, comment, createdAt}) => {
    const { userAddress } = useContext(PrayerRequestContext)
    const btnRef = useRef(null);

    
  useEffect( 
    () => btnRef.current?.scrollIntoView()
  ,[])

  return (
    <div>
    <div className={`${address == userAddress ? 'flex justify-end py-3 w-full ' : 'flex justify-start py-3 w-full'}`}>
        <div className={`${styles.commentBody} ${address == userAddress && 'bg-[#10c850]'}`}>
            <div className={styles.address}>
                <p className={`${address == userAddress ? 'text-[#434544]' : 'text-[#484949]'}`}>{`${address?.slice(0,4)}...${address?.slice(38,44)}`}</p>
            </div>
            <p className={`${styles.comment}${address == userAddress ? 'text-[#fff]' : 'text-black'}`}>{comment}</p>
            <div className={styles.time}>
                <p className={`${address == userAddress ? 'text-[#434544]' : 'text-[#484949]'}`}><TimeAgo datetime={createdAt?.toDate()} /></p>
            </div>

        </div>
        <div ref={btnRef} />
    </div>

    
    </div>
  )
}

export default Comment