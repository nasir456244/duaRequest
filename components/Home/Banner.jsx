import React from "react";
import Img from "@/public/banner.png";
import Title from "../Shared/Title";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="flex justify-center items-center sm:px-4 min-h-screen gap-2 md:relative md:bottom-[85px] flex-wrap-reverse">
      <div className="w-full md:w-1/2 text-center relative md:left-[10px] lg:text-left">
        <Title>Request Prayer Here for ALLAH&apos;s Pleasure</Title>

        <p className="font-primary text-[1rem] text-left text-white font-normal mb-8 opacity-80 tracking-wide">
          Dua is like a conversation with Allah Almighty in which we put our
          needs before Him and ask His help in the resolution of our
          problems.You can request prayer for you and your family. There are
          many people here to pray for you. And we will pray for you.
        </p>
        <div className="flex items-center gap-8 flex-wrap lg:justify-start justify-center">
          <div className="border cursor-pointer border-[#1cd1b5] px-6 py-3 rounded-3xl bg-gradient-to-r from-[#00d6d8] to-[#00a9d5] hover:scale-110 transform transition-all ease-in-out duration-500 custom-btn-animation">
            <Link href={'/login'}>

              <a
                href="#!"
                className="text-white font-primary text-[1rem] tracking-wider"
                >
                Request Prayer
              </a>
            </Link>
          </div>
          <div className="border cursor-pointer border-[#1cd1b5] px-6 py-3 rounded-3xl hover:scale-110 transform transition-all ease-in-out duration-500">
            <Link href={'/login'}>
              <a
                href="#!"
                className="text-white font-primary text-[1rem] tracking-wider"
              >
                Get Started
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <Image src={Img} alt="" className="w-full custom-animation" />
      </div>
    </section>
  );
};

export default Banner;
