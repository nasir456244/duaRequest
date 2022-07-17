import React, { useState, useContext } from 'react'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { useMoralis } from 'react-moralis'
import { useForm } from 'react-hook-form'
import { PrayerRequestContext } from '../context/PrayerRequest'
import toast from 'react-hot-toast'
import { db } from '../lib/firebaseConfig'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'

const styles = {
  modalBackground: `w-screen z-50 h-screen fixed flex justify-center items-center overflow-hidden `,
  modalContainer: `overflow-hidden sm:w-[490px] min-w-[390px] max-h-[600px] transitio-all rounded-[12px] bg-[#fff] shadow-2xl flex flex-col p-[25px]`,
  title: `inline-block text-center mt-[10px] mb-[40px] text-2xl`,
  input: `w-full p-2 text-xl resize-none break-all border-2 rounded-lg`,
  footer: `flex justify-around pt-6 `,
  cancel: `bg-[#ff0e0e] px-6 py-3 text-white text-xl rounded-lg hover:shadow-2xl transition-all duration-300  hover:scale-105`,
  post: ` px-9 py-3 hover:shadow-2xl text-xl rounded-lg `,

}


const Modal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { userAddress, setModalOpen } = useContext(PrayerRequestContext)
  const [prayer, setPrayer] = useState('')
  const { isAuthenticated} = useMoralis()
  const databaseref = collection(db, 'Prayers')
  const { data: session } = useSession()


  
  //Pay and Post Prayer 
  const postPrayer = async () => {
    try {
      if(!isAuthenticated) return
      if(!prayer || !userAddress) return 

      const prayerToPost = prayer;
      setPrayer('')

      addDoc(databaseref, {
        address: userAddress || session?.user?.email,
        prayer: prayerToPost.slice(0,250),
        createdAt: serverTimestamp()
      }).then( () => {
        setModalOpen(false)
        toast.success('Prayer Posted!',{style: {background: '#04111d',color: '#fff',},}) 
      
      })      
      
    }
    catch(error) {
      console.log(error)
      toast.error(error.message,{style: {background: '#04111d',color: '#fff',},}) 

    }

  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => {setModalOpen(false)}}> <MdOutlineCancelPresentation size={28}/> </button>
        </div>
        <div className={styles.title}>
          <h1>Request prayer</h1>
        </div>
    
        <form onSubmit={handleSubmit(postPrayer)}>
          <div className={styles.body}>
              <textarea {...register("prayer", { required: true })} className={styles.input} rows={8} onChange={(e) => { setPrayer(e.target.value)}} minLength={50} maxLength={250} placeholder='Your prayer...' />
          </div>
          <div className={styles.footer}>
              <button className={styles.cancel} type='submit' onClick={() => {setModalOpen(false)}}>Cancel</button>
              <button type='submit' disabled={!prayer.trim()} className={`${styles.post} ${!prayer ? 'cursor-not-allowed bg-[#9d9d9d] text-white' : 'bg-[#0bbe20] transition-all duration-300  hover:scale-105'}`} >Post</button>
          </div>
        </form>   
      </div>
    </div>
  )
}

export default Modal