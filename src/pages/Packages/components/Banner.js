// import { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../../components/utils/useWindowWidth";
import PassContext from "../../../components/utils/PassContext";
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
  const { loggedUser } = useContext(PassContext);

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

  if (width < 480) {
    return (
      <div className="transform -translate-y-10">
        <img
          src={
            loggedUser
              ? "/assets/slider1-mobile.jpg"
              : "/assets/slider0-mobile.jpg"
          }
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
        src={loggedUser ? "/assets/slider1.jpg" : "/assets/slider0.jpg"}
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
