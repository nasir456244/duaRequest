import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { PrayerRequestContext } from '../context/PrayerRequest'
import Link from 'next/link'
import Image from 'next/image'

const styles = {
    modalBackground: `w-screen z-50 h-screen fixed flex justify-center items-center overflow-hidden `,
    modalContainer: `overflow-hidden sm:w-[490px] min-w-[390px] max-h-[600px] transitio-all rounded-[12px] bg-[#fff] shadow-2xl flex flex-col p-[25px]`,
    title: `inline-block text-center mt-[10px] mb-[40px] text-2xl`,
    input: `w-full h-[70px] mt-[50px] p-2 text-xl resize-none break-all border-2 rounded-lg`,
    footer: `flex justify-around pt-6 `,
    post: `mt-[50px] w-[200px] px-9 text-2xl py-3 hover:shadow-2xl text-xl rounded-lg`,
    transactLink: `flex max-w-fit mt-10 text-xl flex-col items-center justify-center`

}

const BuyModal = ({setOpenBuyModal}) => {
  const { onlySpaces, buyTokens,  isBuyModalLoading, setIsBuyModalLoading, ethersScanlink, setEthersScanLink,tokenAmount, setTokenAmount } = useContext(PrayerRequestContext)
  const [amountDue, setAmountDue] = useState('')
  
  const calculatePrice = () => {
    if(tokenAmount) {

      const price = parseFloat(tokenAmount * 0.0001)
      price = price.toFixed(4)
      setAmountDue(price)
    }
    return
  }

  useEffect(() => {
    calculatePrice()
  },[tokenAmount, calculatePrice])

  return (
    <div className={styles.modalBackground}>
    <div className={styles.modalContainer}>
      <div className={styles.titleCloseBtn}>
        <button onClick={() => {setOpenBuyModal(false);setAmountDue('');setTokenAmount('');setEthersScanLink('')}}> <MdOutlineCancelPresentation size={28}/> </button>
      </div>
      <div className={styles.title}>
        <h1>Buy RequestPrayer Coins</h1>
      </div>
      { isBuyModalLoading ?
        (
          <>
          <div className='flex items-center justify-center'>
            <Image width={300} height={300} className='object-contain' alt='loader' src='https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif' />
          </div>
            <p className='text-[#f45eb3] flex items-center relative bottom-[10px] justify-center text-lg'>Purchasing...</p>
          </>
          ):
      
      (
        

        
        <>
        <div className={styles.body}>
            <input pattern='^[0-9]*[.,]?[0-9]*$' value={tokenAmount} onChange={(e) => {setTokenAmount(e.target.value)}} className={styles.input} required />
        </div>
        <p className='flex justify-center relative top-[40px] text-xl'>Total due: {''} {amountDue && tokenAmount > 0 ? amountDue + 'ETH' : '0 ETH' }</p>
        
        <div className={styles.footer}>
            <button onClick={() => {setIsBuyModalLoading(true); buyTokens(); setTokenAmount('');setEthersScanLink('')}} disabled={!tokenAmount || tokenAmount <= 0 } className={`${styles.post} ${!tokenAmount || tokenAmount <= 0 || isNaN(tokenAmount) ? 'cursor-not-allowed bg-[#fa060a] text-white' : 'bg-[#0dc907] transition-all duration-300 hover:scale-105'}`} type='submit' >Buy</button>
        </div>
        </>
          )}
        {ethersScanlink && (
          <>
          <div className={styles.transactLink}>
          Transaction Successful! check out your receipt:
          <Link href={`${ethersScanlink}`}>
              <a target='_blank' className=' text-[#52e663] text-lg underline'>Transaction Receipt</a>
            </Link>
          </div>
          </>
      
          )}
     
    </div>
  </div>
        
      
  )
}

export default BuyModal