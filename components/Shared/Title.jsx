import React from "react";

const Title = (props) => {
  return (
    <h2 className="font-primary text-4xl md:text-5xl text-white font-bold leading-[2.5rem] md:leading-[3.5rem] mb-8 ">
      {props.children}
    </h2>
  );
};

export default Title;
