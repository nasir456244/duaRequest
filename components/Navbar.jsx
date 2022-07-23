import Link from "next/link";
import React, { useState } from "react";
import { PrayerRequestContext } from "../context/PrayerRequest";
import { RiMenu2Line } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const styles = {
  container: `w-full h-[150px] flex justify-around items-center overflow-hidden`,
  logo: `text-[1.8rem] text-[#fff]`,
  list: `md:flex hidden items-center justify-center xs:fixed xs:bottom-[20px]  lg:static`,
  listItem: `p-4 list-none hover:border-b-2 cursor-pointer text-[1.2rem] text-[#fff]`,
  disconnectWallet: `text-xl text-[#fff] bg-[#6b50c1] p-[5px] rounded-2xl h-[50px] hover:bg-[#f50018]`,
  menuContainer: `md:hidden flex text-white`,
  ListMenuContainer: `min-w-[30vw] min-h-[100vh] top-[0] items-center right-[0] flex fixed overflow-hidden z-40 bg-gradient-to-tr from-violet-700 via-cyan-600 to-green-300`,
  OpenMenuContainer: ` w-full h-full flex flex-col items-center justify-center`,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const disconnect = async () => {
    await logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Support</a>
        </Link>
      </div>
      <div className={styles.list}>
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

      {session && (
        <div className="flex items-center justify-center text-[#fff]">
          <p className="mr-2 text-md">{session?.user?.name}</p>
          <img
            onClick={() => signOut()}
            className="cursor-pointer rounded-[50%] w-[50px] h-[50px]"
            src={
              session?.user?.image ||
              "https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg"
            }
          />
        </div>
      )}
      {status === "loading" && (
        <div className="flex items-center justify-center text-[#fff]">
          <img
            onClick={() => signOut()}
            className="cursor-pointer rounded-[50%] w-[50px] h-[50px] animate-pulse"
            src={
              "https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg"
            }
          />
        </div>
      )}
      {status === "unauthenticated" && (
        <button
          onClick={() => router.push("/login")}
          className="text-[#000] bg-[#f3f2f5] py-2 px-5 rounded-[2px]"
        >
          Login
        </button>
      )}

      <div className={styles.menuContainer}>
        <RiMenu2Line
          onClick={() => {
            !isMenuOpen && setIsMenuOpen(true);
          }}
          size={30}
          className="cursor-pointer transition-all duration-500 hover:scale-110"
        />
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
