import Image from "next/image";
import React from "react";

const FeatureCard = ({ title, img, color, id }) => {
  return (
    <div
      className={`
      ${id === "1" && "bg-[#836afa] border-[#836afa]"} 
      ${id === "2" && "bg-[#222f5d] border-[#222f5d]"}
      ${id === "3" && "bg-[#1cd1b5] border-[#1cd1b5]"} 
      ${id === "4" && "bg-[#fc4468] border-[#fc4468]"} 
      border flex justify-center items-center px-6 py-4 rounded-3xl gap-6 hover:scale-110 transform transition-all ease-in-out duration-500 cursor-pointer custom1160:min-w-[15rem] min-w-[21rem]`}
    >
      <div>
        <Image src={img} alt="" className="w-full" />
      </div>
      <h6 className="text-xl text-white font-primary font-medium capitalize text-left">
        {title}
      </h6>
    </div>
  );
};

export default FeatureCard;
