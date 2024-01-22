import { useCountdown } from "../../../components/utils/useCountdown";
import Button from "../../../components/common/Button";

const Banner = ({
  loading,
  packageDetails,
  wallet,
  setPaymentRoute,
  isLive,
}) => {
  const startTimer = useCountdown(packageDetails.startDate);
  const endTimer = useCountdown(packageDetails.endDate);
  return (
    <div className="package-details-banner">
      <iframe
        height="360"
        src={packageDetails.videoURL}
        title="Welcome video"
      ></iframe>
      <div className="w-full py-4">
        <p className="font-medium text-pink mb-2">
          {!loading && packageDetails.saleTitle}
        </p>
        <h3 className="mb-2 pack-name">{!loading && packageDetails.name}</h3>
        <div className="flex gap-4 items-end">
          <div className="flex items-start line-through">
            <h6 className="mt-1">$</h6>
            <h2>{!loading && packageDetails.actPrice}</h2>
          </div>
          <div className="flex items-start">
            <h4 className="mt-1">$</h4>
            <h1 className="text-pink">
              {!loading && (packageDetails.discountedPrice - wallet).toFixed(2)}
            </h1>
          </div>
        </div>
        <p className="my-4 text-lightgrey2 text-sm">
          (After using your wallet balance ${wallet.toFixed(2)})
        </p>
        <h4 className="font-medium mb-8">
          {isLive ? (
            <h4>
              Offer ends in{" "}
              <span className="text-pink">
                {!loading && endTimer?.diffTimeData?.diffDay} days{" "}
                {!loading && endTimer?.diffTimeData?.diffHour} hours{" "}
                {!loading && endTimer?.diffTimeData?.diffMin} mins{" "}
                {!loading && endTimer?.diffTimeData?.diffSec} secs
              </span>
            </h4>
          ) : (
            <h4>
              Offer starts in{" "}
              <span className="text-pink">
                {!loading && startTimer?.diffTimeData?.diffDay} days{" "}
                {!loading && startTimer?.diffTimeData?.diffHour} hours{" "}
                {!loading && startTimer?.diffTimeData?.diffMin} mins{" "}
                {!loading && startTimer?.diffTimeData?.diffSec} secs
              </span>
            </h4>
          )}
        </h4>
        {isLive ? (
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
                theme="pink"
                size="md"
                className="w-full font-semibold"
                rounded="md"
                onClick={() => {
                  if (wallet >= packageDetails.discountedPrice)
                    setPaymentRoute("wallet");
                  else setPaymentRoute("stripe");
                }}
              >
                {wallet >= packageDetails.discountedPrice
                  ? "Buy Now with Wallet"
                  : "Buy Now with Card"}
              </Button>
            )}
          </div>
        ) : (
          <Button
            theme="pink"
            size="lg"
            className="w-full cursor-default font-semibold"
            rounded="none"
          >
            Coming soon...
          </Button>
        )}
      </div>
    </div>
  );
};

export default Banner;
