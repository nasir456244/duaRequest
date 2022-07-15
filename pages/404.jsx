import Link from 'next/link'
import React from 'react'

const styles = {
    container: `w-screen h-screen flex justify-center items-center select-none `,
    body: ` flex flex-col justify-around items-center h-[500px] `,
    goBack: `bg-[#ffe01a] p-7 rounded-2xl hover:shadow-2xl text-[2rem]`

}

const PageNotFound = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <p className='text-[10rem] text-[#fff] animate-[wiggle_1s_ease-in-out_infinite] shadow-2xl p-3'>404</p>
            <p className='text-[1.4rem]'>Oops the page your looking for not found</p>
            <Link href={'/'}><a className={styles.goBack}>Go back</a></Link>
            
        </div>
    </div>
  )
}

export default PageNotFound