import { useState, useEffect } from "react";
import { TbCircleFilled } from "react-icons/tb";

const BtnGrp = ({ activeIndex }) => {
  return (
    <div className="flex items-center justify-center gap-2 my-4 text-xs">
      <TbCircleFilled
        className={activeIndex === 0 ? "text-pink" : "text-white"}
      />
      <TbCircleFilled
        className={activeIndex === 1 ? "text-pink" : "text-white"}
      />
    </div>
  );
};

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (!hover) setActiveIndex(activeIndex === 0 ? 1 : 0);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [activeIndex]);

  const commonStyle = "transform transition-transform duration-500 ease-in-out";

  return (
    <div className="transform -translate-y-16">
      <div
        className="overflow-hidden flex items-center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src="/assets/slider0.png"
          alt="banner0"
          className={`${commonStyle} ${
            activeIndex === 0 ? "-translate-x-full" : "translate-x-0"
          }`}
        />
        <img
          src="/assets/slider1.png"
          alt="banner1"
          className={`${commonStyle} ${
            activeIndex === 1 ? "translate-x-0" : "-translate-x-full"
          }`}
        />
      </div>
      <BtnGrp activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
  );
};

export default Banner;
