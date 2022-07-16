import React, { useState, useEffect } from 'react'
import CommentSkeleton from '../../components/CommentSkeleton'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { db } from '../../lib/firebaseConfig'
import { query, onSnapshot, orderBy, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Comment from './component/Comment'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { useMoralis } from 'react-moralis'

const styles = {
    modalContainer: `overflow-hidden max-w-screen h-screen flex flex-col px-[8px] py-[20px]`,
    title: `inline-block text-center mt-[10px] mb-[40px] text-2xl text-[#fff]`,
    body: `w-full h-screen overflow-auto mb-[25px] p-[10px] py-[20px] border-[#334493] border-2 rounded-xl`,
    input: `w-full sm:w-[50%] lg:w-[40%] p-4 text-xl resize-none break-all bg-[#334493] outline-[#fff] text-[#fff] mr-2 rounded-[40px] overflow-hidden`,
    footer: `flex flex-row items-center justify-center w-full`,
    postButton: `rounded-[50%] p-2 flex items-center justify-center text-[#fff] `
  }





const CommentPage = () => {
    const [commentsLoading, setCommentsLoding] = useState(true)
    const [chat, setChat] = useState('')
    const router = useRouter();
    const refreshData = () => router.replace(`/comment/${id}`);
    const [comments, setComments] = useState([])
    const { isAuthenticated, user } = useMoralis()
    let userAddress = user?.get("ethAddress")


    useEffect( 
      () => 
      onSnapshot(
          query(collection(db, 'Prayers', router.query.id, 'comments'),
           orderBy('createdAt', 'asc')),
          snapshot => setComments(snapshot.docs)) 

    [db])

  const sendComment = async (e) => {
    e.preventDefault()
    if(!isAuthenticated || !chat) return
    const commentToSend = chat;
    setChat('')

    await addDoc(collection(db, 'Prayers', router.query.id, 'comments'), {
        address: userAddress,
        comment: commentToSend.trim(),
        createdAt: serverTimestamp()
    })

  }

  useEffect( () => {
    setTimeout(() => {setCommentsLoding(false)},800)
  },[])



  return (
      <div className={styles.modalContainer}>
        <div onClick={() => router.replace('/')} className='cursor-pointer text-[#fff] text-lg flex items-center underline'>
          <AiOutlineArrowLeft className='mr-1' size={25} />
          <p>Go back to Prayers</p>

        </div>
        <div className={styles.title}>
          <h1>Add a comment</h1>
        </div>
        {commentsLoading ? (
          <CommentSkeleton />
        ):(
          <div className={styles.body}>

            {comments?.map((comment, index) => (
              <Comment key={index} address={comment.data().address} 
              comment={comment.data().comment} 
              createdAt={comment.data().createdAt}/>   
            ))}

            
          </div>  
        )}
        <div className={styles.footer}>
          <input type='text' required disabled={!isAuthenticated} className={styles.input} onChange={(e) => setChat(e.target.value)} minLength={1} maxLength={250} placeholder={`${!isAuthenticated ? 'you need to login to comment' : 'add a comment...'}`} />
          <button onClick={sendComment} disabled={!chat.trim()} type='submit' className={`${styles.postButton} ${!chat ? 'bg-[#888] cursor-not-allowed' : 'bg-[#16bafb] cursor-pointer hover:shadow-2xl text-xl transition-all duration-300 hover:scale-105'}`}>
            <RiSendPlane2Fill size={30} />
          </button>       
        </div>
      </div>
  )
}

export default CommentPage;


