import { useCountdown } from "../../../components/utils/useCountdown";
import Button from "../../../components/common/Button";

const Banner = ({ loading, packageDetails, wallet, setPaymentRoute }) => {
  const { diffTimeData } = useCountdown(packageDetails.endDate);

  return (
    <div className="package-details-banner">
      <iframe
        height="360"
        src={packageDetails.videoURL}
        title="Welcome video"
      ></iframe>
      <div className="w-full py-4">
        <h4 className="font-medium text-yellow">
          {!loading && diffTimeData.diffDay} days{" "}
          {!loading && diffTimeData.diffHour} hours{" "}
          {!loading && diffTimeData.diffMin} mins{" "}
          {!loading && diffTimeData.diffSec} secs left
        </h4>
        <h3 className="my-8">{!loading && packageDetails.name}</h3>
        <div className="flex gap-4 items-end">
          {wallet > 0 && wallet < packageDetails.price && (
            <div className="flex items-start line-through">
              <h6 className="mt-1">$</h6>
              <h2>{!loading && packageDetails.price}</h2>
            </div>
          )}
          <div className="flex items-start">
            <h4 className="mt-1">$</h4>
            <h1 className="text-yellow">
              {!loading &&
                (packageDetails.price - wallet <= 0
                  ? packageDetails.price
                  : packageDetails.price - wallet
                ).toFixed(2)}
            </h1>
          </div>
        </div>
        <p className="mt-4 mb-8 text-lightgrey2 text-sm">
          (After using your wallet balance ${wallet.toFixed(2)})
        </p>
        <div>
          {packageDetails.isBought ? (
            <Button
              theme="lightgrey"
              size="lg"
              className="w-full font-semibold cursor-default"
              rounded="md"
            >
              Already Purchased
            </Button>
          ) : (
            <Button
              theme="yellow"
              size="md"
              className="w-full font-semibold"
              rounded="md"
              onClick={() => {
                if (wallet >= packageDetails.price) setPaymentRoute("wallet");
                else setPaymentRoute("stripe");
              }}
            >
              {wallet >= packageDetails.price
                ? "Buy Now with Wallet"
                : "Buy Now with Card"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
