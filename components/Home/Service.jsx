import React from "react";
import Img1 from "@/public/icon1.png";
import Img2 from "@/public/icon2.png";
import Img3 from "@/public/icon3.png";
import Title from "../Shared/Title";
import Image from "next/image";

const list = [
  {
    img: Img1,
    name: "Prayer for others",
    tag: "You can read different people's prayers and pray for them. You can also see why they request prayer.",
  },
  {
    img: Img2,
    name: "Request Prayer",
    tag: "You can request a prayer for your welfare. You can also request prayer for your family, friends.",
  },
  {
    img: Img3,
    name: "Comment Prayer",
    tag: "You can comment another requested prayer. Other people will comment on your prayer request",
  },
];

const Service = () => {
  return (
    <section className="text-center sm:py-20 lg:bottom-[80px] ">
      <Title>Our Service Feature</Title>
      <p className="font-primary text-[1rem] text-white font-normal mb-8 opacity-80">
        We provide the following services
      </p>
      <div className="flex justify-center gap-4 custom1105:flex-nowrap flex-wrap">
        {list.map((data, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center shadow-xl  ${
              index === 1
                ? "bg-gradient-to-t from-[#00d6d8] to-[#00a9d5]"
                : "bg-[#ffffff6a]"
            } hover:bg-gradient-to-t from-[#00d6d8] to-[#00a9d5] w-[18rem]  gap-3 rounded-lg cursor-pointer hover:translate-y-[10px] transform transition-all ease-in-out duration-500 px-6 py-10`}
          >
            <div className="flex justify-center h-[100px] w-[100px]  ">
              <Image src={data.img} alt="" />
            </div>
            <h6 className="text-white font-primary text-2xl capitalize font-semibold">
              {data.name}
            </h6>
            <p className="text-white font-primary text-sm capitalize font-medium tracking-wide">
              {data.tag}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
