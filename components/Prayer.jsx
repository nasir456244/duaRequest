import React, { useState, useEffect } from 'react'
import TimeAgo from 'timeago-react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { useMoralis } from 'react-moralis'
import { app, db } from '../lib/firebaseConfig'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, limitToLast } from 'firebase/firestore'
import { BsEmojiSmile } from 'react-icons/bs'
import { RiSendPlane2Fill } from 'react-icons/ri'

const styles = {
    listContainer: ` tracking-2 hover:shadow-2xl flex flex-col p-[4px] bg-[#e4e6e8] rounded-2xl break-words overflow-hidden max-w-full h-fit `,
}
const Prayer = ({address, id, prayer, timestamp, blockBUtton}) => {
    const [likes, setLikes] = useState([])
    const [hasliked, setHasLiked] = useState(false)
    const { isAuthenticated, user } = useMoralis()
    let userAddress = user?.get("ethAddress")
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])


    useEffect( 
        () => 
            onSnapshot(collection(db, 'Prayers', id, 'likes'), (snapshot) =>
                setLikes(snapshot.docs)
            ),
    [db, id])

    useEffect( 
        () => 
        setHasLiked(
            likes.findIndex((like) => like.id === userAddress) !== -1
        ),
    [likes])
    
    const likepost = async () => {
        if(!isAuthenticated) return
        if(hasliked) {
            await deleteDoc(doc(db, 'Prayers', id, 'likes', userAddress))
        } else {

            await setDoc(doc(db, 'Prayers', id, 'likes', userAddress), {
                address: userAddress
            })
        }
    }

    useEffect( 
        () => 
        onSnapshot(
            query(collection(db, 'Prayers', id, 'comments'),
             orderBy('createdAt', 'asc'), limitToLast(3)),
            snapshot => setComments(snapshot.docs)) 

    [db])

    const sendComment = async (e) => {
        e.preventDefault()
        if(!isAuthenticated) return
        const commentToSend = comment;
        setComment('')

        await addDoc(collection(db, 'Prayers', id, 'comments'), {
            address: userAddress,
            comment: commentToSend,
            createdAt: serverTimestamp()
        })
    }

    
  return (
    <div className={styles.listContainer}>
        <p className='text-[18px] p-2'>{`${address.slice(0,6)}...${address.slice(36,42)}`}</p>
        <p className='text-[20px] p-2'>{prayer}</p>
        <div className='flex flex-row items-center ml-2 relative top-[34px]'>
            {hasliked ?
                <BsHeartFill className={`cursor-pointer text-[#f00] ${!isAuthenticated && 'cursor-not-allowed'}`} disabled={!isAuthenticated} onClick={likepost} size={30} />    
                :
                <BsHeart disabled={!isAuthenticated} onClick={likepost} className={`${!isAuthenticated ? 'cursor-not-allowed' : 'hover:scale-125 transition-all duration-150 ease-out cursor-pointer'}`} size={30} /> 
            }
                
            <BiCommentDetail size={30} className='cursor-pointer ml-5' onClick={() => {router.push(`/comment/${item?._id}`)}} />
        
        </div>
        <p className='flex justify-end text-[16px] p-2'><TimeAgo datetime={timestamp} /></p>
        <p className='text-sm px-5 py-2'>
                {likes.length > 0 && Intl.NumberFormat('en', { notation: 'compact' }).format(likes.length) + ' Likes'}
            </p>
        <div className='flex flex-col'>

            {comments.map((comment) => (
                <div key={comment.id} className='flex ml-5 mt-2 items-center overflow-hidden break-words '>
                    <img
                        src={`https://avatars.dicebear.com/api/pixel-art/${comment?.data().address}.svg`}
                        alt='profile'
                        height={30}
                        width={30}
                        className='rounded-[50%] '
                    />
                    <p className=' mr-10  ml-[1px] text-sm'>{`${comment.data().address.slice(0,3)}...${comment.data().address.slice(36,39)}`}</p>
                    <p className='flex-1 text-sm w-[40%]'>{comment.data().comment}</p>
                    <p className='flex mr-2 w-full text-xs justify-end'><TimeAgo datetime={comment.data().createdAt?.toDate()} /></p>
                </div>        
            ))}

            <div className='flex items-center p-1'>
                <BsEmojiSmile size={25} />
                <input required maxLength={100} minLength={1} type='text' value={comment} onChange={(e) => {setComment(e.target.value)}} placeholder={` ${isAuthenticated ? 'Add a comment...' : 'login to comment'}`} className='bg-[#e4e6e8] p-2 w-full border-none flex-1 focus:ring-0 outline-none' />
                <button type='submit' disabled={!comment.trim()} onClick={sendComment} className={`${comment && isAuthenticated ? ' text-white bg-[#16bafb] cursor-pointer transition-all ease-out duration-300 hover:scale-105' : 'bg-[#888] text-[#fff] cursor-not-allowed' } rounded-[50%] p-[5px] flex  `}>
                    <RiSendPlane2Fill  size={25} />
                </button>            
            </div>
        </div>
    </div>
        
  )
}

export default Prayer