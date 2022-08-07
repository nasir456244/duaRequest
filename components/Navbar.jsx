import Link from "next/link";
import React, { useContext, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { PrayerRequestContext } from "../context/PrayerRequest";

const styles = {
  container: `w-full h-[100px] flex justify-around items-center p-[12px] overflow-hidden`,
  logo: `text-[1.8rem] text-[#fff]`,
  list: `md:flex hidden items-center justify-center xs:fixed xs:bottom-[20px]  lg:static`,
  listItem: `p-3 list-none hover:border-b-2 cursor-pointer text-[16px] font-medium text-[#fff]`,
  activeItem: `p-3 list-none border-[#0ABEEE] border-b-2 cursor-pointer text-[16px] font-medium text-[#0ABEEE]`,
  menuContainer: `md:hidden flex text-white`,
  ListMenuContainer: `min-w-[30vw] min-h-[100vh] top-[0] items-center right-[0] flex fixed overflow-hidden z-40 bg-gradient-to-tr from-violet-700 via-cyan-600 to-green-300`,
  OpenMenuContainer: ` w-full h-full flex flex-col items-center justify-center`,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useContext(PrayerRequestContext)







  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Support</a>
        </Link>
      </div>
      <div className={styles.list}>
        <li className={router.pathname == "/" ? styles.activeItem : styles.listItem}>
          <Link className={styles.item} href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className={router.pathname == "/myprayers" ? styles.activeItem : styles.listItem}>
          <Link className={styles.item} href="/myprayers">
            <a>My Prayers</a>
          </Link>
        </li>
        <li className={router.pathname == "/about" ? styles.activeItem : styles.listItem}>
          <Link className={styles.item} href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className={router.pathname == "/report" ? styles.activeItem : styles.listItem}>
          <Link className={styles.item} href="/report">
            <a>Report</a>
          </Link>
        </li>
      </div>

      {user &&
        <div className="flex items-center justify-center w-[100px] text-[#fff]">
          <img
            onClick={logout}
            className="cursor-pointer rounded-[50%] sm:ml-12 w-[50px] h-[50px]"
            src={
              user?.image
            }
          />
        </div>
      }
      {!user &&
        <button
          onClick={() => router.push("/login")}
          className="text-[#112EA0] bg-[#FFFFFF] relative left-7  w-[110px] py-2 px-5 rounded-[7px]"
        >
          Login
        </button>
      }

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
        <div className={styles.ListMenuContainer}>
          <RiMenu3Fill
            size={30}
            onClick={() => {
              isMenuOpen && setIsMenuOpen(false);
            }}
            className="text-white cursor-pointer transition-all duration-500 hover:scale-110 flex absolute left-[10px] top-[10px]"
          />
          <div className={styles.OpenMenuContainer}>
            <li className={styles.listItem}>
              <Link className={styles.item} href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.item} href="/myprayers">
                <a>My Prayers</a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.item} href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.item} href="/report">
                <a>Report</a>
              </Link>
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
