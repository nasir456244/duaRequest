import React from "react";
import Img from "@/public/header.png";
import Title from "../Shared/Title";
import Image from "next/image";
import Link from "next/link";
const list = [
  { id: 1, text: "Login to your account" },
  { id: 2, text: "Get subscription" },
  { id: 3, text: "Request your prayer" },
  { id: 4, text: "Pray for others" },
  { id: 5, text: "Leave the rest to Allah" },
];

const HowRequest = () => {
  return (
    <div className="flex justify-center w-full lg:ml-20 items-center gap-12 min-h-screen flex-wrap xl:flex-nowrap my-12">
      <div className="">
        <Image src={Img} alt="" className="w-[85%] custom-animation" />
      </div>
      <div className="w-full md:w-[60%] text-left xl:text-left sm:px-3">
        <Title>
          Can&apos;t Understand
          <br /> How to Request Prayer?
        </Title>
        <p className="font-primary text-[1rem] lg:w-[70%] text-left text-white font-normal mb-8 opacity-80 lg:mr-10 tracking-wider">
          As-salaamu alaikum and welcome <br />
          Thank you for your confidence in our website, steps bellow are how to get going and request prayer.
        </p>

        <div>
          {list.map((data, index) => (
            <div
              key={index}
              className="flex ml-12 custom1329:ml-0 justify-start items-center gap-6 mb-6 text-lg font-primary font-semibold"
            >
              <div className="relative before:absolute before:w-[2rem] before:h-[2rem] before:border-[#06c6a8] before:border-[2px] before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full hover:scale-[1.3] transform transition-all ease-in-out duration-300">
                <p className="text-[#06c6a8] ">{data.id}</p>
              </div>

              <p className="text-white text-left">{data.text}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center cursor-pointer xl:justify-start items-center mt-12">
          <div className="border border-[#1cd1b5] px-6 py-3 rounded-3xl bg-gradient-to-r from-[#00d6d8] to-[#00a9d5] hover:scale-110 transform transition-all ease-in-out duration-500 custom-btn-animation">
            <Link href='/login'>
              <a
                className="text-white font-primary text-[1rem] tracking-wider"
                >
                Request Prayer
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowRequest;
