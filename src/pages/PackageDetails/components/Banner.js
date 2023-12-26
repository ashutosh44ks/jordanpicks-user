import { useCountdown } from "../../../components/utils/useCountdown";
import Button from "../../../components/common/Button";

const Banner = ({ loading, packageDetails, wallet, setPaymentRoute }) => {
  const { diffTimeData } = useCountdown(packageDetails.endDate);
  
  return (
    <div className="package-details-banner">
      <iframe
        height="420"
        src={packageDetails.videoURL}
        title="Welcome video"
      ></iframe>
      <div className="bg-blue2 text-white w-full px-16 h-[420px] flex flex-col justify-center">
        <h2 className="mb-4 pack-countdown">
          {!loading && diffTimeData.diffDay} days{" "}
          {!loading && diffTimeData.diffHour} hours{" "}
          {!loading && diffTimeData.diffMin} mins{" "}
          {!loading && diffTimeData.diffSec} secs left
        </h2>
        <h3 className="mb-2 pack-name">{!loading && packageDetails.name}</h3>
        <h1 className="pack-price">$ {!loading && packageDetails.price}</h1>
        <div className="my-4">
          <p>Your wallet balance is ${wallet.toFixed(2)}</p>
        </div>
        <div>
          {packageDetails.isBought ? (
            <Button
              theme="pink"
              size="lg"
              className="w-48 cursor-default"
              rounded="none"
            >
              Already Purchased
            </Button>
          ) : (
            <>
              <Button
                theme="pink"
                size="lg"
                className="w-48"
                rounded="none"
                onClick={() => {
                  if (wallet >= packageDetails.price) setPaymentRoute("wallet");
                  else setPaymentRoute("stripe");
                }}
              >
                {wallet >= packageDetails.price
                  ? "Buy with wallet"
                  : "Buy with Card"}
              </Button>
              <div className="my-4">
                <p>
                  Pay ${Math.abs(packageDetails.price - wallet)} with wallet and
                  rest with card
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
