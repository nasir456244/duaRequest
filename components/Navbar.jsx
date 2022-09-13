import Link from "next/link";
import React, { useContext, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { PrayerRequestContext } from "../context/PrayerRequest";
import Image from "next/image";
import Icon from '@/public/icon.png';
import { MdAccountCircle } from "react-icons/md";

const styles = {
  container: `w-full h-[100px] sm:justify-between flex justify-around items-center p-[12px] overflow-hidden`,
  logo: `lg:text-[1.8rem] md:text-[1.4rem] text-[#fff] flex items-center justify-center `,
  item: `sm:border-b-2 sm:border-[#0ABEEE]`,
  list: `md:flex hidden items-center justify-center xs:fixed xs:bottom-[20px] lg:static`,
  listItem: `p-3 list-none md:hover:border-b-2 cursor-pointer text-[16px] font-medium text-[#fff]`,
  activeItem: `p-3 list-none border-[#0ABEEE] md:border-b-2 cursor-pointer text-[16px] font-medium text-[#0ABEEE]`,
  menuContainer: `md:hidden flex text-white`,
  ListMenuContainer: `min-w-[30vw] min-h-[100vh] top-[0] items-center right-[0] flex fixed overflow-hidden z-40 bg-gradient-to-tr from-violet-700 via-cyan-600 to-green-300`,
  OpenMenuContainer: ` w-full h-full flex flex-col items-center justify-center`,
  trial: `fixed top-0 font-medium text-[#000] text-[20px] z-50 bg-[#ffcc00] w-full flex justify-center p-3`,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useContext(PrayerRequestContext)
  const isPaidAccount = user?.stripeRole !== "free"
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className="flex items-center justify-center">
          <Image width={90} height={70} alt='logo' src={Icon} />
        </div>
        <Link href="/">
          <a className="sm:hidden">Dua Request</a>
        </Link>
      </div>
      <div className={styles.list}>
      {user && isPaidAccount &&
          <>
            <li className={router.pathname == "/" ? styles.activeItem : styles.listItem}>
              <Link href="/">
                <a className={styles.item}>Home</a>
              </Link>
            </li>
        
            <li className={router.pathname == "/community" ? styles.activeItem : styles.listItem}>
              <Link href="/community">
                <a className={styles.item}>Community</a>
              </Link>
            </li>
            <li className={router.pathname == "/myprayers" ? styles.activeItem : styles.listItem}>
              <Link href="/myprayers">
                <a className={styles.item}>My Prayers</a>
              </Link>
            </li>
          </>
        }
      </div>

        <div className="flex items-center justify-center sm:hidden w-[100px] text-[#fff]">
      {user?.image ?

          <Image 
            alt="profile"
            onClick={() => router.push('/dashboard')}
            className="cursor-pointer rounded-[50%]"
            src={user?.image}
            height={50}
            width={50}

          />
          :
          <MdAccountCircle className="cursor-pointer w-[45px] h-[45px]" onClick={() => router.push("/login")} />
        }
        </div>
      

      <div className={styles.menuContainer}>
        <div className="flex justify-end  w-[100px]  ">
          <RiMenu2Line
            onClick={() => {
              !isMenuOpen && setIsMenuOpen(true);
            }}
            size={30}
            className="cursor-pointertransition-all duration-500 hover:scale-110"
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className= {styles.ListMenuContainer}>
          <RiMenu3Fill
            size={30}
            onClick={() => {
              isMenuOpen && setIsMenuOpen(false);
            }}
            className='text-white cursor-pointer transition-all duration-500 hover:scale-110 flex absolute left-[10px] top-[10px]'
          />
          <div className={styles.OpenMenuContainer}>

            <div className="flex items-center justify-center md:hidden relative bottom-[50px] w-[100px] text-[#fff]">
              {user ?
                <Image 
                  alt="profile"
                  onClick={() => router.push('/dashboard')}
                  className="cursor-pointer rounded-[50%]"
                  src={user?.image}
                  height={50}
                  width={50}
                />
              :
              <MdAccountCircle className="cursor-pointer w-[45px] h-[45px]" onClick={() => router.push("/login")} />
              }
            </div>   
            <li className={styles.listItem}>
              <Link href="/">
                <a className={styles.item}>Home</a>
              </Link>
            </li>
            {user && isPaidAccount &&
              <>
                <li className={styles.listItem}>
                  <Link href="/community">
                    <a className={styles.item}>Community</a>
                  </Link>
                </li>
                <li className={styles.listItem}>
                  <Link href="/myprayers">
                    <a className={styles.item}>My Prayers</a>
                  </Link>
                </li>
              </>
            }

          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
