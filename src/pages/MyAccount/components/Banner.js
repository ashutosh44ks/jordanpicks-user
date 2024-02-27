import { useContext } from "react";
import { useWindowWidth } from "../../../components/utils/useWindowWidth";
import PassContext from "../../../components/utils/PassContext";

const Banner = () => {
  const width = useWindowWidth();
  const { loggedUser } = useContext(PassContext);
  
  if (loggedUser.defaultDiscount !== 0) 
    return null;

  if (width < 480) {
    return (
      <div className="transform -translate-y-10">
        <img
          src="/assets/slider1-mobile.jpg"
          alt="banner-mobile"
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="transform -translate-y-10">
      <img src="/assets/slider1.jpg" alt="banner-desktop" className="w-full" />
    </div>
  );
};

export default Banner;
