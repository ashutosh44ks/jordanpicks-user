import { useCountdown } from "../../../components/utils/useCountdown";
import Button from "../../../components/common/Button";

const Banner = ({ loading, packageDetails, wallet }) => {

  const { diffTimeData } = useCountdown(packageDetails.endDate);
  return (
    <div className="flex">
      <iframe
        width="600"
        height="415"
        src="https://www.youtube.com/embed/2tR6eN--ieU"
        title="Welcome video"
      ></iframe>
      <div className="bg-blue2 text-white w-full p-16 flex flex-col justify-center">
        <h2 className="mb-4">
          {loading ? 0 : diffTimeData.diffDay} days{" "}
          {loading ? 0 : diffTimeData.diffHour} hours{" "}
          {loading ? 0 : diffTimeData.diffMin} mins{" "}
          {loading ? 0 : diffTimeData.diffSec} secs left
        </h2>
        <h3 className="mb-2">
          {loading ? "Package Name" : packageDetails.name}
        </h3>
        <h1>$ {loading ? 99.99 : packageDetails.price}</h1>
        <div className="my-4">
          <p>Your wallet balance is ${wallet.toFixed(2)}</p>
          <p>
            Pay remaining amount of just $
            {loading ? 99.99 - wallet : packageDetails.price}
          </p>
        </div>
        <div>
          <Button
            theme="pink"
            size="lg"
            className="w-48"
            rounded="none"
            onClick={() => {}}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
