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
        height="420"
        src={packageDetails.videoURL}
        title="Welcome video"
      ></iframe>
      <div className="bg-blue2 text-white w-full px-16 h-[420px] flex flex-col justify-center">
        <h3>{!loading && packageDetails.saleTitle}</h3>
        <h2 className="mb-2 pack-name">{!loading && packageDetails.name}</h2>
        <div className="flex gap-4 items-end">
          <h5 className="pack-price line-through relative top-[-1px]">
            $ {!loading && packageDetails.actPrice}
          </h5>
          <h3 className="pack-price">
            $ {!loading && packageDetails.discountedPrice}
          </h3>
        </div>
        <div className="my-4">
          <p>Your wallet balance is ${wallet.toFixed(2)}</p>
        </div>
        {isLive ? (
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
                    if (wallet >= packageDetails.discountedPrice)
                      setPaymentRoute("wallet");
                    else setPaymentRoute("stripe");
                  }}
                >
                  {wallet >= packageDetails.discountedPrice
                    ? "Buy with wallet"
                    : "Buy with Card"}
                </Button>
                {wallet < packageDetails.discountedPrice && wallet > 0 && (
                  <p className="my-4">
                    Pay ${Math.abs(packageDetails.discountedPrice - wallet).toFixed(2)} with wallet
                    and rest with card
                  </p>
                )}
              </>
            )}
          </div>
        ) : (
          <Button
            theme="pink"
            size="lg"
            className="w-48 cursor-default"
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
