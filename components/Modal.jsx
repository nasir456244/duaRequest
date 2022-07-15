import React, { useState, useEffect, useContext } from 'react'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { useMoralis } from 'react-moralis'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PrayerRequestContext } from '../context/PrayerRequest'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router';
import { requestPrayerCoinAddress, requestPrayerAbi } from '../lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { app, db } from '../lib/firebaseConfig'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const styles = {
  modalBackground: `w-screen z-50 h-screen fixed flex justify-center items-center overflow-hidden `,
  modalContainer: `overflow-hidden sm:w-[490px] min-w-[390px] max-h-[600px] transitio-all rounded-[12px] bg-[#fff] shadow-2xl flex flex-col p-[25px]`,
  title: `inline-block text-center mt-[10px] mb-[40px] text-2xl`,
  input: `w-full p-2 text-xl resize-none break-all border-2 rounded-lg`,
  footer: `flex justify-around pt-6 `,
  cancel: `bg-[#ff0e0e] px-6 py-3 text-white text-xl rounded-lg hover:shadow-2xl transition-all duration-300  hover:scale-105`,
  post: ` px-9 py-3 hover:shadow-2xl text-xl rounded-lg `,
  transactLink: `flex max-w-fit mt-10 text-xl flex-col items-center justify-center`

}


const Modal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { userAddress, setModalOpen, onlySpaces } = useContext(PrayerRequestContext)
  const [prayer, setPrayer] = useState('')
  const router = useRouter();
  const { isAuthenticated, isWeb3Enabled, authenticate, enableWeb3, Moralis } = useMoralis()
  const [isprayerPostLoading, setIsPrayerPostLoading] = useState(false)
  const [prayerEthersScanlink, setprayerEthersScanLink] = useState('')
  const databaseref = collection(db, 'Prayers')

  const refreshData = () => router.replace("/");
  
//Pay and Post Prayer 
const postPrayer = async () => {
  try {
    if(!isAuthenticated) return
    if(!isWeb3Enabled) {
      await enableWeb3()
    }
    // setprayerEthersScanLink('')
    // setIsPrayerPostLoading(true)
    // let price = '0xA';
    // let initialVaue = 0;

    // if(!prayer || !userAddress || onlySpaces(prayer) || price !== '0xA' || initialVaue !== 0) return 

    // const web3 = Moralis.web3;
    // const options = {
    //   type: 'erc20',
    //   amount: price,
    //   receiver: requestPrayerCoinAddress,
    //   contractAddress: requestPrayerCoinAddress,
    // }

    // let transaction = await Moralis.transfer(options)
    // const receipt = await transaction.wait()
    // if(receipt) {
      addDoc(databaseref, {
        address: userAddress,
        prayer: prayer,
        createdAt: serverTimestamp()
      }).then( () => {
        setPrayer('')
        console.log('posted')
        setIsPrayerPostLoading(false)
        toast.success('Prayer Posted!',{style: {background: '#04111d',color: '#fff',},}) 
        // setprayerEthersScanLink(`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`)
      })      
    // }
  }
  catch(error) {
    console.log(error)
    setIsPrayerPostLoading(false)
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
      {isprayerPostLoading ? (
          <>
          <div className='flex items-center justify-center'>

            <Image width={300} height={300} className='object-contain' alt='loader' src='https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif' />
          </div>
            <p className='text-[#f45eb3] flex items-center relative bottom-[10px] justify-center text-lg'>Posting...</p>
          </>
      ) :(
        <>
          <form onSubmit={handleSubmit(postPrayer)}>
            <div className={styles.body}>
                <textarea {...register("prayer", { required: true })} className={styles.input} rows={8} onChange={(e) => { setPrayer(e.target.value)}} minLength={50} maxLength={250} placeholder='Your prayer...' />
            </div>
            {errors.prayer && <p className='flex justify-center text-[#f00]'>- The prayer field is required Please</p>}
            <div className={styles.footer}>
                <button className={styles.cancel} type='submit' onClick={() => {setModalOpen(false)}}>Cancel</button>
                <button type='submit' disabled={!prayer || onlySpaces(prayer)} className={`${styles.post} ${!prayer || onlySpaces(prayer) ? 'cursor-not-allowed bg-[#9d9d9d] text-white' : 'bg-[#0bbe20] transition-all duration-300  hover:scale-105'}`} >Post</button>
            </div>
          </form>
          </>
          )}
          {prayerEthersScanlink && (
            <>
              <div className={styles.transactLink}>
                Transaction Successful! check out your receipt:
                <Link href={`${prayerEthersScanlink}`}>
                <a target='_blank' className=' text-[#52e663] text-lg underline'>Transaction Receipt</a>
                </Link>
              </div>
            </>
        )}
    </div>
  </div>
  )
}

export default Modal