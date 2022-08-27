import Link from 'next/link'
import React from 'react'

const styles = {
  container: `absolute text-[#fff] pt-10 font-medium bottom-0 w-full h-[100px] flex justify-center items-center gap-4`
}

const Footer = () => {
  return (
    <div className={styles.container}>
      <Link href={'/privacy'}><a className='hover:border-[#0ABEEE] hover:border-b-2 hover:text-[#0ABEEE] hover:cursor-pointer'>Privacy</a></Link>
      <Link href={'/terms'}><a className='hover:border-[#0ABEEE] hover:border-b-2 hover:text-[#0ABEEE] hover:cursor-pointer'>Terms</a></Link>
      <Link href={'/'}><a className='hover:border-[#0ABEEE] hover:text-[#0ABEEE] hover:border-b-2 hover:cursor-pointer'>Home</a></Link>

    </div>
  )
}

export default Footer