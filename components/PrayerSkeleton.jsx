import React from 'react'


const styles = {
    loadingMainContainer: `grid grid-cols-1 mt-[34px] gap-2 w-[620px] animate-pulses`,
    loadingListContainer: `flex flex-col p-[20px] rounded-2xl break-all overflow-hidden max-h-full
    max-w-full bg-white`,
}




const Skeleton = () => {
  return (
    <div className={styles.loadingMainContainer}>
                 <div className={styles.loadingListContainer}>
                    <div className='flex flex-col w-full h-full'>
                        <p className='w-[220px] mr-[40px] h-[30px] bg-gray-300 rounded-2xl'></p>
                        <p className='max-w-full rounded-2xl h-[130px] mt-[10px] bg-gray-300'></p>
                        <div className='w-full flex flex-row justify-end'>
                        <p className='w-[220px] mt-[10px] ml-[85px] text-right h-[30px] bg-gray-300 rounded-2xl'></p>
                        </div>
                    </div>
                </div>
                <div className={styles.loadingListContainer}>
                    <div className='flex flex-col w-full h-full'>
                        <p className='w-[220px] mr-[40px] h-[30px] bg-gray-300 rounded-2xl'></p>
                        <p className='max-w-full rounded-2xl h-[130px] mt-[10px] bg-gray-300'></p>
                        <div className='w-full flex flex-row justify-end'>

                        <p className='w-[220px] mt-[10px] ml-[85px] text-right h-[30px] bg-gray-300 rounded-2xl'></p>
                        </div>
                    </div>
                </div>
                <div className={styles.loadingListContainer}>
                    <div className='flex flex-col w-full h-full'>
                        <p className='w-[220px] mr-[40px] h-[30px] bg-gray-300 rounded-2xl'></p>
                        <p className='max-w-full rounded-2xl h-[130px] mt-[10px] bg-gray-300'></p>
                        <div className='w-full flex flex-row justify-end'>

                        <p className='w-[220px] mt-[10px] ml-[85px] text-right h-[30px] bg-gray-300 rounded-2xl'></p>
                        </div>
                    </div>
                </div>
                <div className={styles.loadingListContainer}>
                    <div className='flex flex-col w-full h-full'>
                        <p className='w-[220px] mr-[40px] h-[30px] bg-gray-300 rounded-2xl'></p>
                        <p className='max-w-full rounded-2xl h-[130px] mt-[10px] bg-gray-300'></p>
                        <div className='w-full flex flex-row justify-end'>

                        <p className='w-[220px] mt-[10px] ml-[85px] text-right h-[30px] bg-gray-300 rounded-2xl'></p>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default Skeleton