import React from 'react'

const styles = {
    body: `max-w-screen h-screen p-[20px]  overflow-auto mb-[25px]  py-[20px] border-2 rounded-xl`,
    commentBody: `bg-white animate-pulse  w-contain p-2 rounded-2xl break-words sm:w-[250px] w-[180px] overflow-hidden`,
    address: `text-[13px]`,
    time: `flex justify-end text-[13px] `,
    comment: `text-[17px] py-[2px] `,
}

const CommentSkeleton = () => {
  return (
    <div className={styles.body}>
            <div className='flex justify-start w-full'>
              <div className= ' flex justify-start py-3 '>
                <div className= {styles.commentBody}>
                  <div className={styles.address}>
                    <p className= 'w-[50%] rounded-xl h-[22px] bg-gray-300'></p>

                  </div>
                  <p className='w-[100%] rounded-xl my-2 h-[70px] bg-gray-300'></p>
                  <div className={styles.time}>
                    <p className='w-[100px] rounded-xl  h-[20px] bg-gray-300'></p>
                  </div>
                </div>
              </div>
              </div>

          
              <div className= ' flex justify-end py-3  w-full'>
              <div className= {styles.commentBody}>
                  <div className={styles.address}>
                    <p className= 'w-[50%] rounded-xl h-[22px] bg-gray-300'></p>

                  </div>
                  <p className='w-[100%] rounded-xl my-2 h-[70px] bg-gray-300'></p>
                  <div className={styles.time}>
                    <p className='w-[100px] rounded-xl  h-[20px] bg-gray-300'></p>
                  </div>
                </div>
              </div>
              
              <div className='flex justify-start w-full'>
              <div className= ' flex justify-start py-3 '>
                <div className= {styles.commentBody}>
                  <div className={styles.address}>
                    <p className= 'w-[50%] rounded-xl h-[22px] bg-gray-300'></p>

                  </div>
                  <p className='w-[100%] rounded-xl my-2 h-[70px] bg-gray-300'></p>
                  <div className={styles.time}>
                    <p className='w-[100px] rounded-xl  h-[20px] bg-gray-300'></p>
                  </div>
                </div>
              </div>
              </div>

          
              <div className= ' flex justify-end py-3  w-full'>
              <div className= {styles.commentBody}>
                  <div className={styles.address}>
                    <p className= 'w-[50%] rounded-xl h-[22px] bg-gray-300'></p>

                  </div>
                  <p className='w-[100%] rounded-xl my-2 h-[70px] bg-gray-300'></p>
                  <div className={styles.time}>
                    <p className='w-[100px] rounded-xl  h-[20px] bg-gray-300'></p>
                  </div>
                </div>
              </div>
              
              
            
            

          </div> 
  )
}

export default CommentSkeleton