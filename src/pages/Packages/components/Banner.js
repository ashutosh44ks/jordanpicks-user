import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../../components/utils/useWindowWidth";
import { useUserContext } from "../../../components/utils/useUserContext";
// import { TbCircleFilled } from "react-icons/tb";

// const BtnGrp = ({ activeIndex }) => {
//   return (
//     <div className="flex items-center justify-center gap-2 my-4 text-xs">
//       <TbCircleFilled
//         className={activeIndex === 0 ? "text-yellow" : "text-white"}
//       />
//       <TbCircleFilled
//         className={activeIndex === 1 ? "text-yellow" : "text-white"}
//       />
//     </div>
//   );
// };

const Banner = () => {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const { loggedUser } = useUserContext();

  // const [activeIndex, setActiveIndex] = useState(0);
  // const [hover, setHover] = useState(false);
  // useEffect(() => {
  //   const myInterval = setInterval(() => {
  //     if (!hover) setActiveIndex(activeIndex === 0 ? 1 : 0);
  //   }, 4000);
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // }, [activeIndex]);

  // const commonStyle = "transform transition-transform duration-500 ease-in-out";

  const handleClick = () => {
    if (loggedUser && document.querySelector("#special"))
      document.querySelector("#special").scrollIntoView();
    else navigate("/auth/register");
  };

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (loggedUser._id !== "") {
      if (loggedUser.defaultDiscount > 0) setActiveIndex(2);
      else setActiveIndex(1);
    } else setActiveIndex(0);
  }, [loggedUser._id, loggedUser.defaultDiscount]);

  if (width < 480) {
    return (
      <div className="transform -translate-y-10">
        <img
          src={`/assets/slider${activeIndex}-mobile.jpg`}
          alt="banner-mobile"
          className="cursor-pointer w-full"
          onClick={handleClick}
        />
      </div>
    );
  }

  return (
    <div className="transform -translate-y-10">
      <img
        src={`/assets/slider${activeIndex}.jpg`}
        alt="banner-desktop"
        className="cursor-pointer w-full"
        onClick={handleClick}
      />
    </div>
  );
  // return (
  //   <div className="transform -translate-y-16">
  //     <div
  //       className="overflow-hidden flex items-center"
  //       onMouseEnter={() => setHover(true)}
  //       onMouseLeave={() => setHover(false)}
  //     >
  //       <img
  //         src="/assets/slider0.png"
  //         alt="banner0"
  //         className={`${commonStyle} cursor-pointer ${
  //           activeIndex === 0 ? "translate-x-0" : "-translate-x-full"
  //         }`}
  //         onClick={() => navigate("/auth/register")}
  //       />
  //       <img
  //         src="/assets/slider1.png"
  //         alt="banner1"
  //         className={`${commonStyle} ${
  //           activeIndex === 1 ? "-translate-x-full" : "translate-x-0"
  //         }`}
  //       />
  //     </div>
  //     <BtnGrp activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
  //   </div>
  // );
};

export default Banner;
