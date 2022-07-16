import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { PrayerRequestContext } from '../context/PrayerRequest'
import { RiMenu2Line } from 'react-icons/ri'
import { RiMenu3Fill } from 'react-icons/ri'
import Authenticate from './Authenticate'






const styles = {
    container: `w-full h-[150px] flex justify-around items-center overflow-hidden`,
    logo: `text-[1.8rem] text-[#fff]`,
    list: `md:flex hidden items-center justify-center xs:fixed xs:bottom-[20px]  lg:static`,
    listItem: `p-4 list-none hover:border-b-2 cursor-pointer text-[1.2rem] text-[#fff]`,
    disconnectWallet: `text-xl text-[#fff] bg-[#6b50c1] p-[5px] rounded-2xl h-[50px] hover:bg-[#f50018]`,
    menuContainer: `md:hidden flex text-white`,
    ListMenuContainer: `min-w-[30vw] min-h-[100vh] top-[0] items-center right-[0] flex fixed overflow-hidden z-40 bg-gradient-to-tr from-violet-700 via-cyan-600 to-green-300`,
    OpenMenuContainer: ` w-full h-full flex flex-col items-center justify-center`,
}

const Navbar = () => {
  const { logout, isAuthenticated } = useMoralis()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { userAddress, formattedAddress } = useContext(PrayerRequestContext)
 
    
   
  
    const disconnect = async () => {
        await logout()
    }
    
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
            <Link href='/'><a>Support</a></Link>

        </div>
        <div className={styles.list}>
                <li className={styles.listItem}>
                    <Link className={styles.item} href='/myprayers'><a>My Prayers</a></Link>
                </li>
                <li className={styles.listItem}>
                    <Link className={styles.item} href='/about'><a>About</a></Link>
                </li>
                <li className={styles.listItem}>
                    <Link className={styles.item} href='/report'><a>Report</a></Link>
                </li>
        </div>
       
        {isAuthenticated ? (
          <>
            {!userAddress ?          
              <p className='w-[133px] bg-[#6b50c1] flex items-center p-[2px] rounded-2xl h-[50px]'></p>
            : 
              <button className={styles.disconnectWallet} onClick={disconnect}>{formattedAddress && formattedAddress}</button>
            }
          </>
        )
        :
        (        
          <Authenticate />
        )}
        <div className={styles.menuContainer}>
          <RiMenu2Line onClick={() => {!isMenuOpen && setIsMenuOpen(true)}} size={30} className='cursor-pointer transition-all duration-500 hover:scale-110' />
        </div>
        {isMenuOpen && (
          <div className={styles.ListMenuContainer}>
              <RiMenu3Fill size={30} onClick={() => {isMenuOpen && setIsMenuOpen(false)}} className='text-white cursor-pointer transition-all duration-500 hover:scale-110 flex absolute left-[10px] top-[10px]' />
            <div className={styles.OpenMenuContainer}>
              <li className={styles.listItem}>
                  <Link className={styles.item} href='/myprayers'><a>My Prayers</a></Link>
              </li>
              <li className={styles.listItem}>
                  <Link className={styles.item} href='/about'><a>About</a></Link>
              </li>
              <li className={styles.listItem}>
                  <Link className={styles.item} href='/report'><a>Report</a></Link>
              </li>

            </div>
          </div>
        )}
    </div>
  )
}

export default Navbar