import React, { useState, useRef, useContext, useEffect } from 'react'
import CommentSkeleton from '../../components/CommentSkeleton'
import { useMoralis } from 'react-moralis'
import TimeAgo from 'timeago-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { PrayerRequestContext } from '../../context/PrayerRequest'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const styles = {
    modalContainer: `overflow-hidden max-w-screen h-screen flex flex-col px-[8px] py-[20px]`,
    title: `inline-block text-center mt-[10px] mb-[40px] text-2xl text-[#fff]`,
    input: `w-full sm:w-[50%] lg:w-[40%] p-4 text-xl resize-none break-all bg-[#334493] outline-[#fff] text-[#fff] mr-2 rounded-[40px] overflow-hidden`,
    footer: `flex flex-row items-center justify-center w-full`,
    body: `w-full h-screen overflow-auto mb-[25px] p-[10px] py-[20px] border-[#334493] border-2 rounded-xl`,
    commentBody: `bg-[#e8e8e8] w-contain p-3 rounded-2xl break-words max-w-[60%] min-w-[150px] overflow-hidden`,
    address: `text-[17px]`,
    time: `flex justify-end text-[14px] `,
    comment: `text-[22px] py-[2px] `,

}





const CommentPage = ({comment, id}) => {
    const [commentsLoading, setCommentsLoding] = useState(true)
    const {user} = useMoralis()
    const btnRef = useRef(null);
    const form = useRef(null)
    const [chat, setChat] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { onlySpaces , userAddress } = useContext(PrayerRequestContext)
    const router = useRouter();
    const refreshData = () => router.replace(`/comment/${id}`);



    // Post Comment
   const postComment = async () => {
    if(!chat || !userAddress || onlySpaces(chat)) return
    const CmDoc = {
      _type: 'comments',
      address: userAddress,
      comment: chat,
      commentId: id
    }
    setChat('')
    form.current.reset();          
    await client.create(CmDoc).then((result) => {
      btnRef.current?.scrollIntoView()
      refreshData()
    }),
    (err) => console.log(err)
  
  }

  useEffect( () => {
    btnRef.current?.scrollIntoView()
    setTimeout(() => {setCommentsLoding(false)},800)
  },[])

  useEffect(() => {
    btnRef.current?.scrollIntoView()
  },[refreshData])

  return (
      <div className={styles.modalContainer}>
        <div className='text-[#fff] text-lg flex items-center underline'>
          <AiOutlineArrowLeft className='mr-1' size={25} />
          <Link href='/'> Go back to Prayers</Link>

        </div>
        <div className={styles.title}>
          <h1>Add a comment</h1>
        </div>
        {commentsLoading ? (
          <CommentSkeleton />
        ):(
          <div className={styles.body}>

            {comment?.map((comm, index) => (
              <div key={index} className={`${comm?.address == userAddress ? 'flex justify-end py-3 w-full ' : 'flex justify-start py-3 w-full'}`}>
                <div className={`${styles.commentBody} ${comm?.address == userAddress && 'bg-[#10c850]'}`}>
                  <div className={styles.address}>
                    <p className={`${comm?.address == userAddress ? 'text-[#434544]' : 'text-[#484949]'}`}>{`${comm?.address.slice(0,4)}...${comm?.address.slice(38,44)}`}</p>

                  </div>
                  <p className={`${styles.comment}${comm?.address == userAddress ? 'text-[#fff]' : 'text-black'}`}>{comm?.comment}</p>
                  <div className={styles.time}>
                    <p className={`${comm?.address == userAddress ? 'text-[#434544]' : 'text-[#484949]'}`}><TimeAgo datetime={comm._createdAt} /></p>
                  </div>
                </div>
              
              </div>
            ))}
            <div ref={btnRef} />       

          </div>  
            )}
        <form ref={form} onSubmit={handleSubmit(postComment)}>
          {errors.chat && <p className='flex justify-center relative bottom-2 text-[#f00]'>- comment field is required please</p>}
          <div className={styles.footer}>
            <textarea {...register("chat", { required: true })} disabled={!userAddress} className={styles.input} rows={1} minLength={1} onChange={(e) => { setChat(e.target.value)}} maxLength={250} placeholder={`${!userAddress ? 'you need to login to comment' : 'add a comment...'}`} />
            {chat && !onlySpaces(chat)? 
            <button type='submit' className='bg-[#16bafb] rounded-[50%] p-2 flex items-center justify-center cursor-pointer hover:shadow-2xl text-xl transition-all duration-300 hover:scale-105'>
                <RiSendPlane2Fill className=' z-50 text-white ' size={30} />
            </button>
              :
              <button disabled className='bg-[#888] cursor-not-allowed rounded-[50%] p-2 flex items-center justify-center text-xl'>
                <RiSendPlane2Fill className=' z-50 text-white ' size={30} />
            </button>
            }
          </div>
        </form>
      </div>
  )
}

export default CommentPage;


// export const getStaticPaths = async () => {
//     const query = `*[_type == "prayers"]{_id}`;
//     const prayers = await client.fetch(query);
//     const paths = prayers?.map((prayer) => ({

//             params: {
//                 id: prayer?._id,
//                 fallback: false
//             }
    
//     }));
//     return {
//         paths,
//         fallback: false
//     };
// };


// export const getStaticProps = async ({params}) => {
//     console.log(params?.id, 'params')
//     const query = `*[_type == 'comments' && commentId == $commentid]
//     {
//          _createdAt, 
//         address,
//         comment,
//     } | order(_createdAt asc)`; 
//     const response = client.fetch(query, {
//         commentid: params?.id
//     });
//     if(!response) {
//         return {
//             notFound: true
//         }
//     }

//     return {
//         props: {
//             comment: response,
//             commentID: commentid,
//         }
//     }
// }

export async function getServerSideProps(context) {
    const { id } = context.query;
    const checkIdExists = `*[_type == 'prayers' && _id == '${id}']{
      _id
    }`  
          
    const result = await client.fetch(checkIdExists)    
    if(result.length == 0) {
        return {
            notFound: true,
        }
    }

    const query = `*[_type == 'comments' && commentId == "${id}"]
          {
            _createdAt,
            address,
            comment,
            commentId
        } | order(_createdAt asc)`;
        const response = await client.fetch(query)

    return {
        props: {
            comment: response,
            id,
        },
        
    }

}