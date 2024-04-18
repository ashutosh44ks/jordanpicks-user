import { useWindowWidth } from "../../../components/utils/useWindowWidth";

const Banner2 = () => {
  const width = useWindowWidth();

  if (width < 480) {
    return (
      <div>
        <img
          src="/assets/slider3-mobile.jpg"
          alt="schedule-mobile"
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div>
      <img
        src="/assets/slider3.jpg"
        alt="schedule-desktop"
        className="w-full"
      />
    </div>
  );
};

export default Banner2;
