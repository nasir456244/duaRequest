import Image from "next/image";
import React from "react";

const PrayerCard = ({ data }) => {
  return (
    <div className="bg-[#fffbef] rounded-xl text-center flex flex-col justify-between min-w-[16rem] max-w-[22rem] cursor-pointer hover:translate-y-[10px] transform transition-all ease-in-out duration-500">
      <div className="flex justify-center items-center py-12">
        <Image src={data.img} alt="" />
      </div>
      <div className="bg-gradient-to-b from-[#00d6d8] to-[#00a9d5] rounded-xl pt-12 pb-16">
        <h6 className="text-2xl text-white font-primary font-bold mb-4">
          {data.name}
        </h6>
        <p className="text-[1rem] text-white opacity-80 font-primary font-medium mx-4">
          {data.desc}
        </p>
      </div>
    </div>
  );
};

export default PrayerCard;
