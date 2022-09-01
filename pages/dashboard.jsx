import React, { useContext, useState } from 'react'
import Navbar from '@/components/Navbar'
import { PrayerRequestContext } from '@/context/PrayerRequest'
import { createCheckoutSession, goToBillingPortal } from '@/lib/checkout'
import Image from 'next/image'
import { MoonLoader } from 'react-spinners';
import Link from 'next/link'
import Footer from '@/components/Footer'



const styles = {
  container: `w-full h-screen `,
  body: ` flex items-center w-full justify-center h-[85vh] shadow-2xl sm:px-2 `,
  content: `flex flex-col w-full h-full items-center justify-center mb-16`,
  user: ` w-full flex items-center justify-center flex-col h-max`,
  setting: `max-w-[600px] bg-[#fff] sm:mb-[40px] md:mb-[100px] h-max pb-4 shadow-2xl rounded-[4px] `,
  top: `w-full bg-[#F7FAFC] border-b-2 border-[#E2E8F0] flex items-center justify-between p-5 shadow-2xl rounded-[4px]`,
  buttons: `w-full flex items-center justify-end pr-5`,
  stripeButton: `font-semibold text-[16px] hover:bg-[#2d3748] w-max h-max ml-1 rounded-[5px] 
  text-[#fff] bg-[#000] py-2 px-4`,
}

const Dashboard = () => {
  const { user, logout } = useContext(PrayerRequestContext)
  const [loading, setLoading] = useState(false)
  const isPaidAccount = user?.stripeRole !== "free"



  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.body} >
        {user ?
          <div className={styles.content}>
            <div className={styles.user}>
              {user?.image && <Image className='rounded-[50%]' src={user?.image} width={100} height={100} alt='profile' />}
              <h3 className=' mt-3 font-semibold text-[16px] text-[#fff] not-italic'>{user?.name}</h3>
              <p className='font-medium text-[#DDD] mb-5'>{user?.email}</p>

            </div>
            <div className={styles.setting}>
              <div className={styles.top}>
                <p className='text-[#718096] font-semibold text-[14px] not-italic'>SETTINGS</p>
                <p className='bg-[#ceedff] text-[13px] not-italic px-1 font-semibold text-[#153e75] uppercase'>{isPaidAccount ? 'Premium' : 'free'}</p>
              </div>

              <div className={styles.middle}>

                <p className='font-medium p-5'>Prayer Request uses Stripe to update, change, or cancel your subscription. You can also update card information and billing addresses through the secure portal.</p>
              </div>

              <div className={styles.buttons}>
                <button onClick={logout} className=' hover:bg-[#EDF2F7] font-medium text-[15px] mr-1 rounded-[5px] py-[9px] px-4'> Log Out</button>
                {isPaidAccount ?
                  <button
                    onClick={() => { setLoading(true); goToBillingPortal() }}
                    className={`${styles.stripeButton} ${loading && 'flex justify-center w-[150px] h-[40px] bg-[#2d3748] cursor-auto'} `}>
                    {loading ? <MoonLoader color='#fff' loading={loading} size={20} /> : 'Manage Billing'}

                  </button>

                  :

                  <button
                    onClick={() => { setLoading(true); createCheckoutSession(user?.uid) }}
                    className={`${styles.stripeButton} ${loading && 'flex justify-center w-[150px] h-[40px] bg-[#2d3748] cursor-auto'} `}>
                    {loading ? <MoonLoader color='#fff' loading={loading} size={20} /> : 'Buy Premium'}

                  </button>

                }
              </div>

            </div>


          </div>

          :
          <div className={styles.setting}>
            <div className={styles.top}>
              <p className='text-[#718096] font-semibold text-[14px] not-italic'>SETTINGS</p>
              <p className='bg-[#ceedff] text-[13px] not-italic px-1 font-semibold text-[#153e75] uppercase'></p>
            </div>

            <div className={styles.middle}>

              <p className='font-medium p-5'>Prayer Request uses Stripe to update, change, or cancel your subscription. You can also update card information and billing addresses through the secure portal.</p>
            </div>

            <div className={styles.buttons}>
              <Link href='/login'>
                <a className='bg-[#EDF2F7] font-medium text-[15px] mr-1 rounded-[5px] py-[9px] px-4'>Log in</a>
              </Link>
            </div>

          </div>

        }
      </div>
    <Footer />

    </div>
  )
}

export default Dashboard