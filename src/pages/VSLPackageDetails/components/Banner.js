import Button from "../../../components/common/Button";

const Banner = ({
  loading,
  packageDetails,
  wallet,
  setPaymentRoute,
  isLive,
}) => {
  return (
    <div className="package-details-banner">
      <iframe
        height="360"
        src={packageDetails.videoURL}
        title="Welcome video"
      ></iframe>
      <div className="w-full py-4">
        <p className="font-medium">{!loading && packageDetails.saleTitle}</p>
        <h3 className="mb-2 pack-name">{!loading && packageDetails.name}</h3>
        <div className="flex gap-4 items-end">
          <h2 className="pack-price line-through relative top-[-1px]">
            $ {!loading && packageDetails.actPrice}
          </h2>
          <h1 className="pack-price">
            $ {!loading && packageDetails.discountedPrice}
          </h1>
        </div>
        <p className="mt-4 mb-8 text-lightgrey2 text-sm">
          (After using your wallet balance ${wallet.toFixed(2)})
        </p>
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
