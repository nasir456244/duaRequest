import React from "react";
import Img1 from "@/public/assets/1.png";
import Img2 from "@/public/assets/2.png";
import Img3 from "@/public/assets/3.png";
import Img4 from "@/public/assets/4.png";
import Img from "@/public/assets/feature.png";
import Title from "../Shared/Title";
import FeatureCard from "./FeatureCard";
import Image from "next/image";

const Features = () => {
  return (
    <section className="flex justify-center items-center gap-8 min-h-screen custom1160:flex-nowrap flex-wrap-reverse">
      <div className="w-full md:w-1/2 text-center custom1160:text-left sm:px-3">
        <Title>Conditions for acceptance of prayers</Title>
        <p className="font-primary text-[1rem] text-white font-normal mb-8 opacity-80">
          Every Muslim should know what are the conditions for acceptance of
          prayers, Otherwise our prayers will fail.
        </p>
        <div className="flex items-center justify-center gap-6 mb-6 custom1160:flex-nowrap flex-wrap">
          <FeatureCard
            id="1"
            title="belief in one Allah"
            img={Img1}
            color="#836afa"
          />
          <FeatureCard
            id="2"
            title="connect with allah"
            img={Img2}
            color="#222f5d"
          />
        </div>
        <div className="flex items-center justify-center gap-6 mb-6 2xl:flex-nowrap flex-wrap">
          <FeatureCard
            id="3"
            title="Pure intention and hope"
            img={Img3}
            color="#1cd1b5"
          />
          <FeatureCard
            id="4"
            title="Patience is beautiful"
            img={Img4}
            color="#fc4468"
          />
        </div>
      </div>
      <div className="">
        <Image src={Img} alt="" className="w-full custom-animation" />
      </div>
    </section>
  );
};

export default Features;
