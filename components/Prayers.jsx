import React, { useEffect, useState, useContext } from 'react'
import Skeleton from './Skeleton'
import { PrayerRequestContext } from '../context/PrayerRequest'
import {debounce} from "lodash";
import { useMoralis } from 'react-moralis'
import { app, db } from '../lib/firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Prayer from './Prayer'

const styles = {
    container: `w-full p-[12px] text-[#27425d] flex overflow-x-hidden`,
    listMainContainer: `grid mb-[65px] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-2 gap-[12px] max-w-full max-h-full`,
}


const Prayers = () => {
    const [prayers, setPrayers] = useState([])
    const [isPrayerLoading, setIsPrayerLoading] = useState(true)
    const { userAddress } = useContext(PrayerRequestContext)
    const [ blockBUtton, setBlockButton] = useState(false)
    const { isAuthenticated } = useMoralis()

 

    useEffect( 
        () => 
            onSnapshot(query(collection(db, 'Prayers'), orderBy('createdAt', 'desc')),
             (snapshot) => {
                setPrayers(snapshot.docs)
                setIsPrayerLoading(false)
             }
            )    
    ,[db])
   

    // const likePost = debounce(async (item) => {
    //     // console.log("Called likePost")
    //     if(!isAuthenticated || !userAddress) return
    //     setBlockButton(true)
    //     const id = item?._id
    //     const likecount = item?.likecount
    //     const liker = item?.likerAddress

    //     if(!(liker?.includes(userAddress))){
    //         // console.log("Called likePost 2")
    //         await client
    //         .patch(id)
    //         .inc({likecount: 1})
    //         .insert('after', 'likerAddress[-1]',[userAddress])
    //         .commit().then(() => {
    //         refreshData()
    //         setBlockButton(false)
    //                 // console.log("Called likePost 3")
    //         })
    //     }
    //     console.log(item)
    // },800)
    
  return (
    <div className={styles.container}>
        {isPrayerLoading ? (
            <>
            <Skeleton />
            </>
        ):(

            <div className={styles.listMainContainer}>

                {prayers?.map((prayer) => (
                    <Prayer id={prayer.id} blockBUtton={blockBUtton} key={prayer.id} address={prayer.data().address} prayer={prayer.data().prayer} timestamp={prayer.data().createdAt?.toDate()} />
                ))}
            </div>
        )}
    </div>
  )
}

export default Prayers
