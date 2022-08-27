import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Nofound from "../public/404.png"
import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'

const styles = {
    container: `flex justify-center items-center select-none mt-20 `,
    body: ` flex flex-col  items-center`,
    goBack: `flex justify-center items-center bg-[#ffffff] w-[140px] h-[45px] rounded-md text-[#112EA0] font-semibold hover:shadow-2xl text-[17px]`

}

const PageNotFound = () => {
  return (
    <div>
       <Navbar />
    <div className={styles.container}>
        <div className={styles.body}>
            <div>
              <Image src={Nofound} alt="404" />
            </div>
            <p className='absolute mt-60 font-medium text-[20px] text-white'>Oops! This page is not available right now. try again later </p>
            <Link href={'/'}><a className={styles.goBack}>Go back</a></Link>
            
        </div>
    </div>
    <Footer />
    </div>
  )
}

export default PageNotFound