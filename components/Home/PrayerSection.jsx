import React from "react";
import Img1 from "@/public/prayer1.png";
import Img2 from "@/public/prayer2.png";
import Img from "@/public/prayer3.png";
import Title from "../Shared/Title";
import PrayerCard from "./PrayerCard";
import Image from "next/image";
const list = [
  {
    img: Img1,
    name: "Call to Prayer",
    desc: "Dua is the essence of ibadah. A person engaged in dua affirms his belief in Tawheed (monotheism) and shuns belief in all false gods.",
  },
  {
    img: Img2,
    name: "Thanks be to Allah",
    desc: "Dua is an expression of gratitude to Allah. Allah has given us so many blessings for which we should be thankful to Allah",
  },
];

const PrayerSection = () => {
  return (
    <section className="flex justify-center sm:px-5 items-center gap-12 min-h-screen py-12 flex-wrap">
      <div>
        <Image src={Img} alt="" className="custom-animation w-full" />
      </div>
      <div className="w-full md:w-1/2 custom1105:text-left text-center">
        <Title>Every Muslim Should Pray/ Dua to Allah</Title>
        <p className="font-primary text-[1rem] text-white font-normal mb-8 opacity-80">
          Allah Almighty says in the Qur’an: “When my servants ask you
          concerning me, (tell them) I am indeed close (to them). I listen to
          the prayer of every suppliant when he calls on me (make Dua).”{" "}
          <span className="text-[#fff] opacity-100 font-bold">
            [Quran 2:186]
          </span>
        </p>
        <div className="flex justify-center custom1105:justify-start gap-6 flex-wrap custom1105:flex-nowrap">
          {list.map((data, index) => (
            <PrayerCard data={data} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrayerSection;
