import { useWindowWidth } from "../../../components/utils/useWindowWidth";
import { useUserContext } from "../../../components/utils/useUserContext";

const Banner = () => {
  const width = useWindowWidth();
  const { loggedUser } = useUserContext();

  if (loggedUser.defaultDiscount !== 0) {
    if (width < 480) {
      return (
        <div className="transform -translate-y-10">
          <img
            src="/assets/slider2-mobile.jpg"
            alt="banner-mobile"
            className="w-full"
          />
        </div>
      );
    }
    return (
      <div className="transform -translate-y-10">
        <img
          src="/assets/slider2.jpg"
          alt="banner-desktop"
          className="w-full"
        />
      </div>
    );
  }

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
