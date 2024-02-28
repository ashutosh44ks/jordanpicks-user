import Button from "../../../components/common/Button";

const RenderBannerPrice = ({ loading, packageDetails, showModal }) => {
  if (packageDetails.isBought) {
    return (
      <Button
        theme="lightgrey"
        size="lg"
        className="w-full font-semibold cursor-default"
        rounded="md"
        disabled={true}
      >
        Already Purchased
      </Button>
    );
  }
  return (
    <>
      <div>
        <div className="flex items-end gap-2 mb-2">
          <div className="flex items-start">
            <h4 className="mt-1">$</h4>
            <h1 className="text-yellow">
              {!loading && packageDetails?.monthlyPrice?.toFixed(2)}
            </h1>
          </div>
          <p className="text-sm">/month</p>
        </div>
        <Button
          theme="yellow"
          size="md-rect"
          className="w-full font-semibold"
          rounded="md"
          onClick={() => {
            showModal("monthly");
          }}
        >
          Buy Subscription
        </Button>
      </div>
      <div className="mt-8 mb-6 flex justify-center items-center flex-col relative text-lightgrey2">
        <hr className="w-full border-lightgrey2" />
        <span className="absolute left-1/2 -top-2 bg-darkblack px-2 -translate-x-1/2 text-sm">
          OR
        </span>
      </div>
      <div>
        <div className="flex items-end gap-2 mb-2">
          <div className="flex items-start">
            <h4 className="mt-1">$</h4>
            <h1 className="text-yellow">
              {!loading && packageDetails?.yearlyPrice?.toFixed(2)}
            </h1>
          </div>
          <p className="text-sm">/year</p>
        </div>
        <Button
          theme="yellow"
          size="md-rect"
          className="w-full font-semibold"
          rounded="md"
          onClick={() => {
            showModal("yearly");
          }}
        >
          Buy Subscription
        </Button>
      </div>
    </>
  );
};

const Banner = ({ loading, packageDetails, showModal }) => {
  return (
    <div className="package-details-banner">
      <iframe
        height="360"
        src={packageDetails.videoURL}
        title="Welcome video"
      ></iframe>
      <div className="w-full">
        <h3>{!loading && packageDetails.name}</h3>
        <p className="mt-2 mb-8 text-lightgrey2 text-sm">
          {packageDetails.gamePreview}
        </p>
        <RenderBannerPrice
          loading={loading}
          packageDetails={packageDetails}
          showModal={showModal}
        />
      </div>
    </div>
  );
};

export default Banner;
