import Link from 'next/link'
import React from 'react'

const styles = {
  container: `text-[#fff] max-h-screen relative bottom-[2px] font-medium overflow-hidden w-full flex justify-center items-center gap-4`,
}

const Footer = () => {
  return (
    <div className={styles.container}>

      <Link href={'/privacy'}><a className='hover:border-[#0ABEEE] mb-[20px] hover:border-b-2 hover:text-[#0ABEEE] hover:cursor-pointer'>Privacy</a></Link>
      <Link href={'/terms'}><a className='hover:border-[#0ABEEE] mb-[20px] hover:border-b-2 hover:text-[#0ABEEE] hover:cursor-pointer'>Terms</a></Link>
      <Link href={'/'}><a className='hover:border-[#0ABEEE] mb-[20px] hover:text-[#0ABEEE] hover:border-b-2 hover:cursor-pointer'>Home</a></Link>

    </div>
  )
}

export default Footer